import {AfterViewChecked, AfterViewInit, Component, ElementRef, Input, NgZone, OnDestroy, ViewChild} from "@angular/core";
import {LhcDataService} from '../../lib/lhc-data.service';
import {WindowService} from '../../lib/window.service';

@Component({
  selector: 'lhc-group-tabs',
  templateUrl: './lhc-group-tabs.component.html',
  styleUrls: ['./lhc-group-tabs.component.css'],
  standalone: false
})
export class LhcGroupTabsComponent implements AfterViewInit, AfterViewChecked, OnDestroy {
  @Input() item;
  @ViewChild('tabset', {read: ElementRef}) tabset: ElementRef<HTMLElement>;

  private contentWidth: number | null = null;

  /**
   * Get half of the last usable tab content width for content-aligned answers.
   * @returns A CSS pixel width, or null before a positive width is measured.
   */
  get contentAnswerWidth(): string | null {
    return this.contentWidth === null ? null : `${this.contentWidth / 2}px`;
  }

  /**
   * Determine whether form-aligned vertical tab questions need a stacked layout.
   * @returns True when measured content is at most 600px wide or leaves at most
   *  200px beside the form-wide answer column; false for other layouts or before measurement.
   */
  get stackQuestions(): boolean {
    // Use the existing medium-view breakpoint within this tabset, and reserve
    // 200px for question text and indentation beside the form's answer column.
    const minimumContentWidth = Math.max(600, this.winService.getWindowWidth() / 2 + 200);
    return this.lhcDataService.getTabPosition() === 'left' &&
      this.lhcDataService.getTabAnswerAlignment() === 'form' &&
      this.contentWidth !== null && this.contentWidth <= minimumContentWidth;
  }

  private viewInitialized = false;
  private selectedGroup: any = null;
  private pendingScrollFrame: number | null = null;
  private pendingResizeFrame: number | null = null;
  private contentResizeObserver: ResizeObserver | null = null;

  /**
   * Provide the form services used to render tabs and measure their content.
   * @param lhcDataService Form data and template-option access.
   * @param zone Angular zone used to publish deferred content measurements.
   * @param winService Shared form-width and view-mode service.
   */
  constructor(public lhcDataService: LhcDataService, private zone: NgZone, private winService: WindowService) {
  }

  /**
   * Observe tab content width and defer usable measurements to the next animation
   * frame, retaining the last measurement while the content is hidden.
   */
  ngAfterViewInit(): void {
    this.viewInitialized = true;
    this.selectedGroup = this.item?.items?.find(group => !group._isHiddenFromView) || null;

    // Cache the content width even in form alignment mode so changing the option
    // does not depend on another resize notification.
    const tabset = this.tabset?.nativeElement;
    const contentHolder = Array.from(tabset?.children || []).find(element =>
      element.classList.contains('ant-tabs-content-holder')) as HTMLElement | undefined;
    if (contentHolder) {
      this.contentResizeObserver = new ResizeObserver(entries => {
        const contentWidth = entries[0]?.contentRect.width;
        // Hidden nested tabsets can report zero. Retain the last usable width,
        // or inherit an outer tabset's width until the first positive measurement.
        if (contentWidth > 0) {
          if (this.pendingResizeFrame !== null) {
            cancelAnimationFrame(this.pendingResizeFrame);
            this.pendingResizeFrame = null;
          }
          if (contentWidth !== this.contentWidth) {
            // Updating answer widths can change the observed content's height.
            // Apply them next frame to avoid a ResizeObserver feedback loop.
            this.pendingResizeFrame = requestAnimationFrame(() => {
              this.pendingResizeFrame = null;
              this.zone.run(() => {
                this.contentWidth = contentWidth;
              });
            });
          }
        }
      });
      this.contentResizeObserver.observe(contentHolder);
    }
  }

  /**
   * Synchronize this tabset's generated tablist ARIA orientation after rendering,
   * including when options change or navigation is created lazily.
   */
  ngAfterViewChecked(): void {
    // NG-ZORRO does not expose an orientation input for its generated tablist.
    // Scope the lookup to this tabset's navigation, excluding nested tabsets.
    const tablist = this.tabset?.nativeElement.querySelector(':scope > .ant-tabs-nav [role="tablist"]');
    const orientation = this.lhcDataService.getTabPosition() === 'left' ? 'vertical' : 'horizontal';
    if (tablist && tablist.getAttribute('aria-orientation') !== orientation) {
      tablist.setAttribute('aria-orientation', orientation);
    }
  }

  /** Disconnect content observation and cancel pending resize and scroll frames. */
  ngOnDestroy(): void {
    this.contentResizeObserver?.disconnect();
    if (this.pendingResizeFrame !== null) {
      cancelAnimationFrame(this.pendingResizeFrame);
    }
    if (this.pendingScrollFrame !== null) {
      cancelAnimationFrame(this.pendingScrollFrame);
    }
  }

  /**
   * Reveal the selected tab's start when its tabset has scrolled above its sticky
   * boundary. Reset the nearest scroll container, or the viewport, on the next
   * frame only when the selected group changes and this navigation is sticky.
   * @param index Selected index among the currently visible tab groups.
   */
  onSelectedIndexChange(index: number): void {
    if (this.pendingScrollFrame !== null) {
      cancelAnimationFrame(this.pendingScrollFrame);
      this.pendingScrollFrame = null;
    }

    const group = this.item?.items?.filter(group => !group._isHiddenFromView)[index];
    const previousGroup = this.selectedGroup;
    this.selectedGroup = group;
    // Hiding an earlier tab can change the selected index without changing the
    // selected group. It must not move the user away from their current answer.
    if (!this.viewInitialized || !group || group === previousGroup ||
        !this.lhcDataService.getStickyTabs()) {
      return;
    }

    const tabset = this.tabset?.nativeElement;
    const navigation = tabset?.querySelector(':scope > .ant-tabs-nav');
    // Nested horizontal navigation is static even when stickyTabs is enabled.
    if (!navigation || getComputedStyle(navigation).position !== 'sticky') {
      return;
    }

    const scrollContainer = this.getScrollContainer(tabset);
    const stickyOffset = parseFloat(getComputedStyle(tabset).scrollMarginTop) || 0;
    /**
     * Measure the sticky boundary again so deferred scrolling uses current geometry.
     * @returns The scroll container's inner top plus the sticky offset, in viewport pixels.
     */
    const stickyBoundary = () => stickyOffset + (scrollContainer ?
      scrollContainer.getBoundingClientRect().top + scrollContainer.clientTop : 0);
    if (tabset.getBoundingClientRect().top >= stickyBoundary()) {
      return;
    }

    this.pendingScrollFrame = requestAnimationFrame(() => {
      this.pendingScrollFrame = null;
      if (scrollContainer) {
        // Reset this scrollport without moving the page or outer scrollports.
        // Measure again after the selected tab's content has been rendered.
        scrollContainer.scrollTop += tabset.getBoundingClientRect().top - stickyBoundary();
      }
      else {
        tabset.scrollIntoView({block: 'start', inline: 'nearest'});
      }
    });
  }

  /**
   * Find the nearest ancestor whose vertical overflow establishes the sticky
   * scroll container, including hidden overflow and containers without scrollbars.
   * @param element Element whose ancestors are searched.
   * @returns The overflow ancestor, or null when scrolling belongs to the viewport.
   */
  private getScrollContainer(element: HTMLElement): HTMLElement | null {
    for (let parent = element.parentElement; parent; parent = parent.parentElement) {
      // Root overflow is handled by the viewport, including body overflow
      // propagated to the root and documents without a scrollingElement.
      if (parent === document.body || parent === document.documentElement) {
        return null;
      }
      // Sticky positioning uses the nearest overflow ancestor, even when it
      // currently has no scrollbar. overflow: clip does not create a scrollport.
      if (/^(auto|scroll|hidden|overlay)$/.test(getComputedStyle(parent).overflowY)) {
        return parent;
      }
    }
    return null;
  }
}

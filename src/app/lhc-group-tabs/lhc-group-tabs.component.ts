import {AfterViewInit, Component, ElementRef, Input, OnDestroy, ViewChild} from "@angular/core";
import {LhcDataService} from '../../lib/lhc-data.service';

@Component({
  selector: 'lhc-group-tabs',
  templateUrl: './lhc-group-tabs.component.html',
  styleUrls: ['./lhc-group-tabs.component.css'],
  standalone: false
})
export class LhcGroupTabsComponent implements AfterViewInit, OnDestroy {
  @Input() item;
  @ViewChild('tabset', {read: ElementRef}) tabset: ElementRef<HTMLElement>;

  private viewInitialized = false;
  private pendingScrollFrame: number | null = null;
  private contentResizeObserver: ResizeObserver | null = null;

  constructor(public lhcDataService: LhcDataService) {
  }

  ngAfterViewInit(): void {
    this.viewInitialized = true;

    // When tabs are positioned on the left, base the answer width on the tab content
    // holder rather than its parent container, whose width includes the vertical tab list.
    const tabset = this.tabset?.nativeElement;
    const contentHolder = Array.from(tabset?.children || []).find(element =>
      element.classList.contains('ant-tabs-content-holder')) as HTMLElement | undefined;
    if (contentHolder) {
      this.contentResizeObserver = new ResizeObserver(entries => {
        const contentWidth = entries[0]?.contentRect.width;
        if (this.lhcDataService.getTabPosition() !== 'left') {
          contentHolder.style.removeProperty('--lhc-tab-content-answer-width');
          return;
        }
        // An inactive nested tabset can temporarily report a zero width. Keep
        // the inherited outer value until the nested content becomes visible.
        if (contentWidth > 0) {
          contentHolder.style.setProperty(
            '--lhc-tab-content-answer-width', `${contentWidth / 2}px`
          );
        }
      });
      this.contentResizeObserver.observe(contentHolder);
    }
  }

  ngOnDestroy(): void {
    this.contentResizeObserver?.disconnect();
    if (this.pendingScrollFrame !== null) {
      cancelAnimationFrame(this.pendingScrollFrame);
    }
  }

  // If the user selects a tab in sticky mode, scroll to the top of the new page
  onSelectedIndexChange(): void {
    // Ignore the selection that NG-ZORRO emits when initializing the tabset
    if (!this.viewInitialized || !this.lhcDataService.getStickyTabs()) {
      return;
    }

    if (this.pendingScrollFrame !== null) {
      cancelAnimationFrame(this.pendingScrollFrame);
      this.pendingScrollFrame = null;
    }

    const tabset = this.tabset?.nativeElement;
    if (!tabset) {
      return;
    }

    const stickyBoundary = parseFloat(getComputedStyle(tabset).scrollMarginTop) || 0;
    if (tabset.getBoundingClientRect().top >= stickyBoundary) {
      return;
    }

    this.pendingScrollFrame = requestAnimationFrame(() => {
      this.pendingScrollFrame = null;
      tabset.scrollIntoView({block: 'start', inline: 'nearest'});
    });
  }
}

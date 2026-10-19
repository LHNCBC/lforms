import {AfterViewInit, Component, ElementRef, Input, NgZone, OnDestroy, ViewChild} from "@angular/core";
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

  contentAnswerWidth: string | null = null;

  private viewInitialized = false;
  private pendingScrollFrame: number | null = null;
  private pendingResizeFrame: number | null = null;
  private contentResizeObserver: ResizeObserver | null = null;

  constructor(public lhcDataService: LhcDataService, private zone: NgZone) {
  }

  ngAfterViewInit(): void {
    this.viewInitialized = true;

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
          const answerWidth = `${contentWidth / 2}px`;
          if (answerWidth !== this.contentAnswerWidth) {
            // Updating answer widths can change the observed content's height.
            // Apply them next frame to avoid a ResizeObserver feedback loop.
            this.pendingResizeFrame = requestAnimationFrame(() => {
              this.pendingResizeFrame = null;
              this.zone.run(() => {
                this.contentAnswerWidth = answerWidth;
              });
            });
          }
        }
      });
      this.contentResizeObserver.observe(contentHolder);
    }
  }

  ngOnDestroy(): void {
    this.contentResizeObserver?.disconnect();
    if (this.pendingResizeFrame !== null) {
      cancelAnimationFrame(this.pendingResizeFrame);
    }
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

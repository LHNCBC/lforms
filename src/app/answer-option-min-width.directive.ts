import { AfterViewInit, Directive, ElementRef, Input, NgZone, OnDestroy } from '@angular/core';

/**
 * Sets a shared width for answer options based on their rendered content plus
 * 1.5rem of spacing. The width is capped at 12rem so long answers wrap instead
 * of forcing excessively wide columns.
 */
@Directive({
  selector: '[lhcAnswerOptionMinWidth]',
  standalone: false
})
export class AnswerOptionMinWidthDirective implements AfterViewInit, OnDestroy {
  private enabled = false;
  private columnCount = 0;
  private animationFrame: number | null = null;
  private mutationObserver: MutationObserver | null = null;
  private resizeObserver: ResizeObserver | null = null;

  /**
   * Enable content measurement and set the number of columns in the answer group.
   * @param columnCount the effective number of rendered answer columns, or null to disable measurement
   */
  @Input()
  set lhcAnswerOptionMinWidth(columnCount: number | null) {
    this.columnCount = typeof columnCount === 'number' && Number.isInteger(columnCount) && columnCount > 0 ?
      columnCount : 0;
    this.enabled = this.columnCount > 0;
    if (this.enabled) {
      this.scheduleMeasurement();
    }
    else {
      this.host.nativeElement.style.removeProperty('--lhc-answer-option-width');
      this.host.nativeElement.style.removeProperty('--lhc-answer-group-width');
    }
  }

  constructor(
    private host: ElementRef<HTMLElement>,
    private ngZone: NgZone
  ) {}

  /**
   * Start observing rendered answers and schedule the initial measurement.
   */
  ngAfterViewInit(): void {
    this.ngZone.runOutsideAngular(() => {
      this.mutationObserver = new MutationObserver(() => this.scheduleMeasurement());
      this.observeMutations();
      this.resizeObserver = new ResizeObserver(() => this.scheduleMeasurement());
      this.resizeObserver.observe(this.host.nativeElement);

      this.scheduleMeasurement();
      document.fonts?.ready.then(() => this.scheduleMeasurement());
    });
  }

  /**
   * Stop observing the answer group and cancel any pending measurement.
   */
  ngOnDestroy(): void {
    this.enabled = false;
    this.mutationObserver?.disconnect();
    this.resizeObserver?.disconnect();
    if (this.animationFrame !== null) {
      cancelAnimationFrame(this.animationFrame);
    }
  }

  /**
   * Schedule one answer measurement for the next animation frame.
   */
  private scheduleMeasurement(): void {
    if (!this.enabled || this.animationFrame !== null) {
      return;
    }

    this.ngZone.runOutsideAngular(() => {
      this.animationFrame = requestAnimationFrame(() => {
        this.animationFrame = null;
        this.measureAnswerOptions();
      });
    });
  }

  /**
   * Measure the widest rendered answer and update the option and group width variables.
   */
  private measureAnswerOptions(): void {
    if (!this.enabled) {
      return;
    }

    const answerOptions = Array.from(
      this.host.nativeElement.querySelectorAll<HTMLElement>(':scope > .lhc-answer')
    );
    if (!answerOptions.length) {
      this.host.nativeElement.style.removeProperty('--lhc-answer-option-width');
      this.host.nativeElement.style.removeProperty('--lhc-answer-group-width');
      return;
    }

    const measurementContainer = document.createElement('div');
    measurementContainer.setAttribute('aria-hidden', 'true');
    Object.assign(measurementContainer.style, {
      display: 'flex',
      flexDirection: 'column',
      left: '-100000px',
      position: 'fixed',
      top: '0',
      visibility: 'hidden',
      width: 'max-content'
    });
    // Keep the clones under the component host so they inherit the same fonts
    // and ancestor-dependent styles as the rendered answers.
    this.mutationObserver?.disconnect();
    this.host.nativeElement.appendChild(measurementContainer);

    let widestAnswer = 0;
    for (const answerOption of answerOptions) {
      const clone = answerOption.cloneNode(true) as HTMLElement;
      clone.style.setProperty('flex', 'none', 'important');
      clone.style.setProperty('max-width', 'none', 'important');
      clone.style.setProperty('min-width', '0', 'important');
      clone.style.setProperty('width', 'max-content', 'important');
      clone.style.setProperty('white-space', 'nowrap', 'important');
      // A checked radio clone with the same name would uncheck the rendered
      // radio when inserted into the document.
      clone.querySelectorAll<HTMLInputElement>('input[type="radio"]').forEach(input => {
        input.removeAttribute('name');
      });
      clone.querySelectorAll<HTMLElement>('*').forEach(element => {
        element.style.setProperty('max-width', 'none', 'important');
        element.style.setProperty('white-space', 'nowrap', 'important');
      });
      measurementContainer.appendChild(clone);
      widestAnswer = Math.max(widestAnswer, clone.getBoundingClientRect().width);
    }

    measurementContainer.remove();
    this.observeMutations();

    if (widestAnswer <= 0) {
      this.host.nativeElement.style.removeProperty('--lhc-answer-option-width');
      this.host.nativeElement.style.removeProperty('--lhc-answer-group-width');
      return;
    }

    const rootFontSize = parseFloat(getComputedStyle(document.documentElement).fontSize);
    const remSize = Number.isFinite(rootFontSize) ? rootFontSize : 16;
    const optionWidth = Math.min(Math.ceil(widestAnswer + remSize * 1.5), remSize * 12);
    this.host.nativeElement.style.setProperty('--lhc-answer-option-width', `${optionWidth}px`);
    this.host.nativeElement.style.setProperty('--lhc-answer-group-width', `${optionWidth * this.columnCount}px`);
  }

  /**
   * Observe answer additions, removals, and text changes that require remeasurement.
   */
  private observeMutations(): void {
    this.mutationObserver?.observe(this.host.nativeElement, {
      childList: true,
      characterData: true,
      subtree: true
    });
  }
}

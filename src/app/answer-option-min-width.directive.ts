import { AfterViewInit, Directive, ElementRef, Input, NgZone, OnDestroy } from '@angular/core';

/**
 * Sets a shared width for answer options based on their rendered content plus
 * 1.5rem of spacing. For vertical layouts, it also reduces the column count
 * when the requested columns do not fit and updates answer positions.
 */
@Directive({
  selector: '[lhcAnswerOptionMinWidth]',
  standalone: false
})
export class AnswerOptionMinWidthDirective implements AfterViewInit, OnDestroy {
  private enabled = false;
  private columnCount = 0;
  private vertical = false;
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
      this.clearLayoutStyles();
    }
  }

  /**
   * Set whether answers should fill each column from top to bottom.
   * @param vertical true for vertical ordering, otherwise false
   */
  @Input()
  set lhcAnswerOptionVertical(vertical: boolean) {
    this.vertical = vertical;
    if (this.enabled) {
      this.scheduleMeasurement();
    }
  }

  constructor(
    private host: ElementRef<HTMLElement>,
    private ngZone: NgZone
  ) {}

  /**
   * Start observing rendered answers and available layout width, then schedule
   * the initial measurement.
   */
  ngAfterViewInit(): void {
    this.ngZone.runOutsideAngular(() => {
      this.mutationObserver = new MutationObserver(() => this.scheduleMeasurement());
      this.observeMutations();
      this.resizeObserver = new ResizeObserver(() => this.scheduleMeasurement());
      this.resizeObserver.observe(this.host.nativeElement);
      if (this.host.nativeElement.parentElement) {
        this.resizeObserver.observe(this.host.nativeElement.parentElement);
      }

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
    this.clearLayoutStyles();
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
      this.clearLayoutStyles();
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
      this.clearLayoutStyles();
      return;
    }

    const rootFontSize = parseFloat(getComputedStyle(document.documentElement).fontSize);
    const remSize = Number.isFinite(rootFontSize) ? rootFontSize : 16;
    const availableWidth = this.host.nativeElement.parentElement?.getBoundingClientRect().width ||
      this.host.nativeElement.getBoundingClientRect().width;
    const compactOptionWidth = Math.ceil(widestAnswer + remSize * 1.5);
    const readableOptionWidth = Math.min(compactOptionWidth, remSize * 12);
    const fittingColumnCount = Math.max(1, Math.floor(availableWidth / readableOptionWidth));
    const effectiveColumnCount = this.vertical ?
      Math.min(this.columnCount, fittingColumnCount) : this.columnCount;
    const maximumOptionWidth = Math.max(remSize * 12, availableWidth / effectiveColumnCount);
    const optionWidth = Math.min(compactOptionWidth, maximumOptionWidth);
    this.host.nativeElement.style.setProperty('--lhc-answer-option-width', `${optionWidth}px`);
    this.host.nativeElement.style.setProperty('--lhc-answer-group-width', `${optionWidth * effectiveColumnCount}px`);

    if (this.vertical) {
      this.host.nativeElement.style.setProperty(
        '--lhc-answer-effective-column-count', effectiveColumnCount.toString()
      );
      this.setVerticalAnswerPositions(answerOptions, effectiveColumnCount);
    }
    else {
      this.host.nativeElement.style.removeProperty('--lhc-answer-effective-column-count');
      this.clearAnswerPositions(answerOptions);
    }
  }

  /**
   * Position answers down each column using the responsive column count.
   * @param answerOptions the rendered answer elements
   * @param columnCount the number of columns that currently fit
   */
  private setVerticalAnswerPositions(answerOptions: HTMLElement[], columnCount: number): void {
    const rowCount = Math.ceil(answerOptions.length / columnCount);
    answerOptions.forEach((answerOption, index) => {
      answerOption.style.gridRow = `${(index % rowCount) + 1}`;
      answerOption.style.gridColumn = `${Math.floor(index / rowCount) + 1}`;
    });
  }

  /**
   * Remove grid positions assigned by the directive.
   * @param answerOptions the rendered answer elements
   */
  private clearAnswerPositions(answerOptions: HTMLElement[]): void {
    answerOptions.forEach(answerOption => {
      answerOption.style.removeProperty('grid-row');
      answerOption.style.removeProperty('grid-column');
    });
  }

  /**
   * Remove all layout styles assigned by the directive.
   */
  private clearLayoutStyles(): void {
    this.host.nativeElement.style.removeProperty('--lhc-answer-option-width');
    this.host.nativeElement.style.removeProperty('--lhc-answer-group-width');
    this.host.nativeElement.style.removeProperty('--lhc-answer-effective-column-count');
    this.clearAnswerPositions(Array.from(
      this.host.nativeElement.querySelectorAll<HTMLElement>(':scope > .lhc-answer')
    ));
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

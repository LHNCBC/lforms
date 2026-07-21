import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AnswerOptionMinWidthDirective } from './answer-option-min-width.directive';

@Component({
  template: `
    <section style="width: 720px">
      <div [lhcAnswerOptionMinWidth]="enabled">
        <label class="lhc-answer">
          <input type="radio" name="answer" checked>
          A very long answer option whose intrinsic width exceeds the maximum allowed width
        </label>
        <label class="lhc-answer"><input type="radio" name="answer">Yes</label>
      </div>
    </section>
  `,
  standalone: false
})
class TestHostComponent {
  enabled: number | null = 3;
}

describe('AnswerOptionMinWidthDirective', () => {
  let fixture: ComponentFixture<TestHostComponent>;
  let host: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AnswerOptionMinWidthDirective, TestHostComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(TestHostComponent);
    host = fixture.nativeElement.querySelector('div');
    fixture.detectChanges();
  });

  it('lets long answers use an equal share of the available width', async () => {
    await nextAnimationFrame();

    const rootFontSize = parseFloat(getComputedStyle(document.documentElement).fontSize);
    const availableWidth = host.parentElement.getBoundingClientRect().width;
    const expectedWidth = Math.max(rootFontSize * 12, availableWidth / 3);
    expect(host.style.getPropertyValue('--lhc-answer-option-width')).toBe(`${expectedWidth}px`);
    expect(host.style.getPropertyValue('--lhc-answer-group-width')).toBe(`${expectedWidth * 3}px`);
  });

  it('does not change the selected radio while measuring it', async () => {
    const selectedRadio = host.querySelector<HTMLInputElement>('input[checked]');
    expect(selectedRadio.checked).toBeTrue();

    await nextAnimationFrame();

    expect(selectedRadio.checked).toBeTrue();
  });

  it('uses the widest rendered option when the answers are short', async () => {
    host.querySelectorAll('.lhc-answer').forEach(answer => answer.textContent = 'Yes');
    await nextAnimationFrame();
    await nextAnimationFrame();

    const measuredWidth = parseFloat(host.style.getPropertyValue('--lhc-answer-option-width'));
    const rootFontSize = parseFloat(getComputedStyle(document.documentElement).fontSize);
    expect(measuredWidth).toBeGreaterThan(0);
    expect(measuredWidth).toBeLessThan(rootFontSize * 12);
    expect(parseFloat(host.style.getPropertyValue('--lhc-answer-group-width'))).toBe(measuredWidth * 3);
  });

  it('keeps columns compact when a long answer is narrower than its equal share', async () => {
    fixture.componentInstance.enabled = 2;
    host.querySelectorAll('.lhc-answer').forEach(answer =>
      answer.textContent = 'WWWWWWWWWWWWWWWWWWWWWW'
    );
    fixture.detectChanges();
    await nextAnimationFrame();
    await nextAnimationFrame();

    const availableWidth = host.parentElement.getBoundingClientRect().width;
    const optionWidth = parseFloat(host.style.getPropertyValue('--lhc-answer-option-width'));
    expect(optionWidth).toBeLessThan(availableWidth / 2);
    expect(parseFloat(host.style.getPropertyValue('--lhc-answer-group-width'))).toBe(optionWidth * 2);
  });

  it('remeasures when the available parent width changes', async () => {
    fixture.componentInstance.enabled = 2;
    host.querySelectorAll('.lhc-answer').forEach(answer =>
      answer.textContent = 'WWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWW'
    );
    fixture.detectChanges();
    await nextAnimationFrame();
    await nextAnimationFrame();

    host.parentElement.style.width = '900px';
    await nextAnimationFrame();
    await nextAnimationFrame();

    expect(host.style.getPropertyValue('--lhc-answer-option-width')).toBe('450px');
    expect(host.style.getPropertyValue('--lhc-answer-group-width')).toBe('900px');
  });

  it('removes the measured width when disabled', async () => {
    await nextAnimationFrame();
    fixture.componentInstance.enabled = null;
    fixture.detectChanges();

    expect(host.style.getPropertyValue('--lhc-answer-option-width')).toBe('');
    expect(host.style.getPropertyValue('--lhc-answer-group-width')).toBe('');
  });
});

/**
 * Wait for the browser's next animation frame.
 * @returns a promise resolved by the next animation frame
 */
function nextAnimationFrame(): Promise<void> {
  return new Promise(resolve => requestAnimationFrame(() => resolve()));
}

import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AnswerOptionMinWidthDirective } from './answer-option-min-width.directive';

@Component({
  template: `
    <div [lhcAnswerOptionMinWidth]="enabled">
      <label class="lhc-answer">
        <input type="radio" name="answer" checked>
        A very long answer option whose intrinsic width exceeds the maximum allowed width
      </label>
      <label class="lhc-answer"><input type="radio" name="answer">Yes</label>
    </div>
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

  it('caps the shared answer minimum width at 12rem', async () => {
    await nextAnimationFrame();

    const rootFontSize = parseFloat(getComputedStyle(document.documentElement).fontSize);
    expect(host.style.getPropertyValue('--lhc-answer-option-width')).toBe(`${rootFontSize * 12}px`);
    expect(host.style.getPropertyValue('--lhc-answer-group-width')).toBe(`${rootFontSize * 12 * 3}px`);
  });

  it('does not change the selected radio while measuring it', async () => {
    const selectedRadio = host.querySelector<HTMLInputElement>('input[checked]');
    expect(selectedRadio.checked).toBeTrue();

    await nextAnimationFrame();

    expect(selectedRadio.checked).toBeTrue();
  });

  it('uses the widest rendered option when it is narrower than 12rem', async () => {
    host.querySelectorAll('.lhc-answer').forEach(answer => answer.textContent = 'Yes');
    await nextAnimationFrame();
    await nextAnimationFrame();

    const measuredWidth = parseFloat(host.style.getPropertyValue('--lhc-answer-option-width'));
    const rootFontSize = parseFloat(getComputedStyle(document.documentElement).fontSize);
    expect(measuredWidth).toBeGreaterThan(0);
    expect(measuredWidth).toBeLessThan(rootFontSize * 12);
    expect(parseFloat(host.style.getPropertyValue('--lhc-answer-group-width'))).toBe(measuredWidth * 3);
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

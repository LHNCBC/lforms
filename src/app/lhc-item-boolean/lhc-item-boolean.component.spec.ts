import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LhcItemBooleanComponent } from './lhc-item-boolean.component';
import { LhcDataService} from '../../lib/lhc-data.service';
import { NzRadioModule } from 'ng-zorro-antd/radio'
import { FormsModule } from '@angular/forms';
import language from '../../../language-config.json';

describe('LhcItemBooleanComponent', () => {
  let component: LhcItemBooleanComponent;
  let fixture: ComponentFixture<LhcItemBooleanComponent>;
  let lhcDataService: LhcDataService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LhcItemBooleanComponent ],
      imports: [NzRadioModule, FormsModule],
      providers: [LhcDataService]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LhcItemBooleanComponent);
    component = fixture.componentInstance;
    lhcDataService = TestBed.inject(LhcDataService);
    component.item = {
      _elementId: "1",
      question: 'question'
    };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should continue to render radio buttons for a normal boolean item', () => {
    expect(fixture.nativeElement.querySelectorAll('input[type="radio"]').length).toBe(3);
    expect(fixture.nativeElement.querySelector('[role="checkbox"]')).toBeNull();
  });

  it('should render and cycle a localized three-state checkbox', () => {
    component.item = {
      _elementId: 'checkbox/1',
      question: 'Do you agree?',
      displayControl: {answerLayout: {type: 'CHECK_BOX'}}
    };
    const changeSpy = spyOn(lhcDataService, 'onItemValueChange');
    fixture.detectChanges();

    const checkbox: HTMLButtonElement = fixture.nativeElement.querySelector('[role="checkbox"]');
    const status = () => fixture.nativeElement.querySelector('.lhc-boolean-checkbox-status').textContent.trim();

    expect(checkbox).not.toBeNull();
    expect(fixture.nativeElement.querySelectorAll('input[type="radio"]').length).toBe(0);
    expect(checkbox.getAttribute('aria-checked')).toBe('mixed');
    expect(checkbox.title).toBe(language.booleanCheckboxHint);
    expect(status()).toBe(language.booleanNotAnswered);

    checkbox.click();
    fixture.detectChanges();
    expect(component.item.value).toBe(true);
    expect(checkbox.getAttribute('aria-checked')).toBe('true');
    expect(checkbox.classList).toContain('lhc-boolean-checkbox-positive');
    expect(status()).toBe(language.booleanYes);
    expect(changeSpy).toHaveBeenCalledWith(component.item, true, undefined);

    checkbox.click();
    fixture.detectChanges();
    expect(component.item.value).toBe(false);
    expect(checkbox.getAttribute('aria-checked')).toBe('false');
    expect(checkbox.classList).toContain('lhc-boolean-checkbox-negative');
    expect(status()).toBe(language.booleanNo);
    expect(changeSpy).toHaveBeenCalledWith(component.item, false, true);

    checkbox.click();
    fixture.detectChanges();
    expect(component.item.value).toBeNull();
    expect(checkbox.getAttribute('aria-checked')).toBe('mixed');
    expect(checkbox.classList).toContain('lhc-boolean-checkbox-unanswered');
    expect(status()).toBe(language.booleanNotAnswered);
    expect(changeSpy).toHaveBeenCalledWith(component.item, null, false);
  });

  it('should disable the checkbox for a read-only item', () => {
    component.item = {
      _elementId: 'checkbox/1',
      question: 'Do you agree?',
      value: false,
      _readOnly: true,
      displayControl: {answerLayout: {type: 'CHECK_BOX'}}
    };
    const changeSpy = spyOn(lhcDataService, 'onItemValueChange');
    fixture.detectChanges();

    const checkbox: HTMLButtonElement = fixture.nativeElement.querySelector('[role="checkbox"]');
    expect(checkbox.disabled).toBeTrue();
    checkbox.click();
    expect(component.item.value).toBe(false);
    expect(changeSpy).not.toHaveBeenCalled();
  });
});

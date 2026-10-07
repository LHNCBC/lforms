import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LhcItemBooleanComponent } from './lhc-item-boolean.component';
import { LhcDataService} from '../../lib/lhc-data.service';
import { NzRadioModule } from 'ng-zorro-antd/radio'
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { FormsModule } from '@angular/forms';
import language from '../../../language-config.json';

describe('LhcItemBooleanComponent', () => {
  let component: LhcItemBooleanComponent;
  let fixture: ComponentFixture<LhcItemBooleanComponent>;
  let lhcDataService: LhcDataService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LhcItemBooleanComponent ],
      imports: [NzRadioModule, NzCheckboxModule, FormsModule],
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
    expect(fixture.nativeElement.querySelector('input[type="checkbox"]')).toBeNull();
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
    expect(fixture.nativeElement.querySelector('input[type="checkbox"]')).toBeNull();
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

  it('should disable the three-state checkbox for a read-only item', () => {
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

  it('should render a two-state checkbox when it is required, initialized, and requested', () => {
    component.item = {
      _elementId: 'checkbox/1',
      question: 'Do you agree?',
      dataType: 'BL',
      value: false,
      defaultAnswer: false,
      _answerRequired: true,
      displayControl: {answerLayout: {type: 'CHECK_BOX'}}
    };
    component.value = false;
    const changeSpy = spyOn(lhcDataService, 'onItemValueChange');
    fixture.detectChanges();

    const checkbox: HTMLInputElement = fixture.nativeElement.querySelector('input[type="checkbox"]');

    expect(checkbox).not.toBeNull();
    expect(fixture.nativeElement.querySelectorAll('input[type="radio"]').length).toBe(0);
    expect(fixture.nativeElement.querySelector('[role="checkbox"]')).toBeNull();
    expect(checkbox.checked).toBeFalse();

    checkbox.click();
    fixture.detectChanges();
    expect(component.item.value).toBe(true);
    expect(changeSpy).toHaveBeenCalledWith(component.item, true, false);

    checkbox.click();
    fixture.detectChanges();
    expect(component.item.value).toBe(false);
    expect(changeSpy).toHaveBeenCalledWith(component.item, false, true);
  });

  [
    {
      description: 'is not required',
      properties: {defaultAnswer: false, _answerRequired: false,
        displayControl: {answerLayout: {type: 'CHECK_BOX'}}}
    },
    {
      description: 'has no initial value',
      properties: {_answerRequired: true,
        displayControl: {answerLayout: {type: 'CHECK_BOX'}}}
    }
  ].forEach(({description, properties}) => {
    it(`should render a three-state checkbox when the check-box item ${description}`, () => {
      component.item = {
        _elementId: 'boolean/1',
        question: 'Do you agree?',
        dataType: 'BL',
        ...properties
      };
      fixture.detectChanges();

      expect(fixture.nativeElement.querySelector('[role="checkbox"]')).not.toBeNull();
      expect(fixture.nativeElement.querySelector('input[type="checkbox"]')).toBeNull();
      expect(fixture.nativeElement.querySelectorAll('input[type="radio"]').length).toBe(0);
    });
  });

  it('should render three radio buttons when a required, initialized item does not request the check-box item control', () => {
    component.item = {
      _elementId: 'boolean/1',
      question: 'Do you agree?',
      dataType: 'BL',
      defaultAnswer: false,
      _answerRequired: true
    };
    fixture.detectChanges();

    expect(fixture.nativeElement.querySelectorAll('input[type="radio"]').length).toBe(3);
    expect(fixture.nativeElement.querySelector('input[type="checkbox"]')).toBeNull();
    expect(fixture.nativeElement.querySelector('[role="checkbox"]')).toBeNull();
  });

  it('should disable the two-state checkbox for a read-only item', async () => {
    component.item = {
      _elementId: 'checkbox/1',
      question: 'Do you agree?',
      dataType: 'BL',
      value: false,
      defaultAnswer: false,
      _answerRequired: true,
      _readOnly: true,
      displayControl: {answerLayout: {type: 'CHECK_BOX'}}
    };
    component.value = false;
    const changeSpy = spyOn(lhcDataService, 'onItemValueChange');
    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();

    const checkbox: HTMLInputElement = fixture.nativeElement.querySelector('input[type="checkbox"]');
    expect(checkbox.disabled).toBeTrue();
    checkbox.click();
    expect(component.item.value).toBe(false);
    expect(changeSpy).not.toHaveBeenCalled();
  });

  describe('aria-required', () => {
    const ariaRequired = (selector: string) =>
      fixture.nativeElement.querySelector(selector).getAttribute('aria-required');

    // unchecked (false) already satisfies the requirement, so "required" would mislead
    it('should not mark the two-state checkbox input as required', () => {
      component.item = {
        _elementId: 'checkbox/1',
        question: 'Do you agree?',
        dataType: 'BL',
        value: false,
        defaultAnswer: false,
        _answerRequired: true,
        displayControl: {answerLayout: {type: 'CHECK_BOX'}}
      };
      component.value = false;
      fixture.detectChanges();

      expect(ariaRequired('input[type="checkbox"]')).toBeNull();
    });

    [true, false].forEach(required => {
      it(`should ${required ? '' : 'not '}mark a three-state checkbox as required when _answerRequired is ${required}`, () => {
        component.item = {
          _elementId: 'checkbox/1',
          question: 'Do you agree?',
          _answerRequired: required,
          displayControl: {answerLayout: {type: 'CHECK_BOX'}}
        };
        fixture.detectChanges();

        expect(ariaRequired('[role="checkbox"]')).toBe(required ? 'true' : null);
      });

      it(`should ${required ? '' : 'not '}mark the radio group as required when _answerRequired is ${required}`, () => {
        component.item = {
          _elementId: 'boolean/1',
          question: 'Do you agree?',
          _answerRequired: required
        };
        fixture.detectChanges();

        expect(ariaRequired('[role="radiogroup"]')).toBe(required ? 'true' : null);
      });
    });
  });
});

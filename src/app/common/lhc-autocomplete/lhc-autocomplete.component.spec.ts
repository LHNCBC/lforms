import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LhcAutocompleteComponent } from './lhc-autocomplete.component';
import { LhcDataService} from '../../../lib/lhc-data.service';

describe('LhcAutocompleteComponent', () => {
  let component: LhcAutocompleteComponent;
  let fixture: ComponentFixture<LhcAutocompleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [LhcDataService],
      declarations: [ LhcAutocompleteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LhcAutocompleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show validation when adding an autocomplete invalid value error', () => {
    component.item = { _validationErrors: ['existing error'] };

    component.addAutocompleteValidationError();

    expect(component.item._hasValidation).toBeTrue();
    expect(component.item._showValidation).toBeTrue();
    expect(component.item._validationErrors).toEqual([
      'existing error',
      component.autocompleteInvalidError
    ]);
  });

  it('should remove only the autocomplete invalid value error and clear input state', () => {
    const input = document.createElement('input');
    input.classList.add('invalid', 'no_match');
    input.setAttribute('invalid', 'true');
    component.ac = { nativeElement: input };
    component.item = {
      _validationErrors: ['existing error', component.autocompleteInvalidError]
    };

    component.removeAutocompleteValidationError();

    expect(component.item._validationErrors).toEqual(['existing error']);
    expect(input.classList.contains('invalid')).toBeFalse();
    expect(input.classList.contains('no_match')).toBeFalse();
    expect(input.hasAttribute('invalid')).toBeFalse();
  });

  it('should not restore an invalid value cleared by autocomplete on blur', () => {
    const input = document.createElement('input');
    input.classList.add('invalid', 'no_match');
    input.setAttribute('invalid', 'true');
    component.ac = { nativeElement: input };
    component.item = {
      _validationErrors: [component.autocompleteInvalidError]
    };

    component.updateAutocompleteValidationError();

    expect(input.value).toBe('');
    expect(component.item._validationErrors).toBeUndefined();
    expect(input.classList.contains('invalid')).toBeFalse();
    expect(input.classList.contains('no_match')).toBeFalse();
    expect(input.hasAttribute('invalid')).toBeFalse();
  });

  it('should clear a non-empty invalid value when autocomplete blurs', () => {
    const input = document.createElement('input');
    input.value = 'bad value';
    input.classList.add('invalid', 'no_match');
    input.setAttribute('invalid', 'true');
    component.ac = { nativeElement: input };
    component.acInstance = {
      clearInvalidFieldVal: jasmine.createSpy('clearInvalidFieldVal').and.callFake(() => {
        input.value = '';
      }),
      setFieldVal: jasmine.createSpy('setFieldVal'),
      destroy: jasmine.createSpy('destroy')
    };
    component.item = {
      _validationErrors: [component.autocompleteInvalidError]
    };

    component.updateAutocompleteValidationError(true);

    expect(component.acInstance.clearInvalidFieldVal).toHaveBeenCalled();
    expect(input.value).toBe('');
    expect(component.item._validationErrors).toBeUndefined();
    expect(input.classList.contains('invalid')).toBeFalse();
    expect(input.classList.contains('no_match')).toBeFalse();
    expect(input.hasAttribute('invalid')).toBeFalse();
  });

  it('should normalize a case-insensitive prefetch match before updating the model', () => {
    component.item = {};
    component.options = { acOptions: { matchListValue: true } };
    component.acType = 'prefetch';
    component.prefetchTextToItem = { B: { text: 'B', code: 'b-code' } };
    component.acInstance = {
      setFieldVal: jasmine.createSpy('setFieldVal'),
      storeSelectedItem: jasmine.createSpy('storeSelectedItem'),
      getSelectedItems: jasmine.createSpy('getSelectedItems').and.returnValue(['B']),
      destroy: jasmine.createSpy('destroy')
    };

    component.onSelectionHandler({
      final_val: 'b',
      on_list: false,
      removed: false
    });

    expect(component.acInstance.setFieldVal).toHaveBeenCalledWith('B', false);
    expect(component.acInstance.storeSelectedItem).toHaveBeenCalledWith('B', 'b-code');
    expect(component.dataModel).toEqual({ text: 'B', code: 'b-code' });
    expect(component.item._validationErrors).toBeUndefined();
  });

});

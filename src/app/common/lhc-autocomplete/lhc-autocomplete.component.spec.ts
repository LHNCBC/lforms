import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
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
    component.item = { _hasValidation: true, _validationErrors: ['existing error'] };

    component.addAutocompleteValidationError();

    expect(component.item._hasValidation).toBeTrue();
    expect(component.item._showValidation).toBeTrue();
    expect(component.item._hasAutocompleteValidationError).toBeTrue();
    expect(component.item._validationErrors).toEqual([
      'existing error',
      component.autocompleteInvalidError
    ]);
  });

  it('should not set the item validation flag when adding an autocomplete invalid value error', () => {
    component.item = {};

    component.addAutocompleteValidationError();

    expect(component.item._hasValidation).toBeUndefined();
    expect(component.item._showValidation).toBeTrue();
    expect(component.item._hasAutocompleteValidationError).toBeTrue();
    expect(component.item._validationErrors).toEqual([
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
    expect(component.item._hasAutocompleteValidationError).toBeUndefined();
    expect(input.classList.contains('invalid')).toBeFalse();
    expect(input.classList.contains('no_match')).toBeFalse();
    expect(input.hasAttribute('invalid')).toBeFalse();
  });

  it('should clear stale autocomplete validation when the model updates', () => {
    const input = document.createElement('input');
    input.value = 'invalid value';
    input.classList.add('invalid', 'no_match');
    input.setAttribute('invalid', 'true');
    component.ac = { nativeElement: input };
    component.item = {
      _hasAutocompleteValidationError: true,
      _validationErrors: ['existing error', component.autocompleteInvalidError]
    };
    component.acType = 'prefetch';
    component.acInstance = {
      setFieldVal: jasmine.createSpy('setFieldVal'),
      destroy: jasmine.createSpy('destroy')
    };
    spyOn(component, 'updateAutocompSelectionModel').and.returnValue('Valid answer');

    component.updateDisplayedValue({ text: 'Valid answer' });

    expect(component.acInstance.setFieldVal).toHaveBeenCalledWith('Valid answer', false);
    expect(component.item._hasAutocompleteValidationError).toBeUndefined();
    expect(component.item._validationErrors).toEqual(['existing error']);
    expect(input.classList.contains('invalid')).toBeFalse();
    expect(input.classList.contains('no_match')).toBeFalse();
    expect(input.hasAttribute('invalid')).toBeFalse();
  });

  it('should clear stale autocomplete validation when the answer list rebuilds', () => {
    const input = document.createElement('input');
    input.value = 'invalid value';
    input.classList.add('invalid', 'no_match');
    input.setAttribute('invalid', 'true');
    component.ac = { nativeElement: input };
    component.item = {
      _hasAutocompleteValidationError: true,
      _validationErrors: ['existing error', component.autocompleteInvalidError]
    };
    component.acInstance = {
      setFieldVal: jasmine.createSpy('setFieldVal'),
      destroy: jasmine.createSpy('destroy')
    };

    component.cleanupAutocomplete(true);

    expect(component.acInstance.setFieldVal).toHaveBeenCalledWith('', false);
    expect(component.acInstance.destroy).toHaveBeenCalled();
    expect(component.item._hasAutocompleteValidationError).toBeUndefined();
    expect(component.item._validationErrors).toEqual(['existing error']);
    expect(input.classList.contains('invalid')).toBeFalse();
    expect(input.classList.contains('no_match')).toBeFalse();
    expect(input.hasAttribute('invalid')).toBeFalse();
  });

  it('should remove autocomplete validation when the field is empty', () => {
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

  it('should retain a non-empty invalid value and its validation error', () => {
    const input = document.createElement('input');
    input.value = 'bad value';
    input.classList.add('invalid', 'no_match');
    input.setAttribute('invalid', 'true');
    component.ac = { nativeElement: input };
    component.item = {};

    component.updateAutocompleteValidationError();

    expect(input.value).toBe('bad value');
    expect(component.item._validationErrors).toEqual([component.autocompleteInvalidError]);
    expect(input.classList.contains('invalid')).toBeTrue();
    expect(input.classList.contains('no_match')).toBeTrue();
    expect(input.getAttribute('invalid')).toBe('true');
  });

  it('should suppress autocomplete-lhc automatic clearing of invalid text', () => {
    const clearInvalidFieldVal = jasmine.createSpy('clearInvalidFieldVal');
    const acInstance: any = {
      clearInvalidFieldVal,
      setFieldVal: jasmine.createSpy('setFieldVal'),
      destroy: jasmine.createSpy('destroy')
    };
    component.acInstance = acInstance;

    component.retainInvalidValueOnBlur();
    acInstance.clearInvalidFieldVal();

    expect(clearInvalidFieldVal).not.toHaveBeenCalled();
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

  it('should not treat inherited object keys as prefetch answers', () => {
    component.acType = 'prefetch';
    component.options = { acOptions: { matchListValue: true } };
    component.prefetchTextToItem = { b: { text: 'b' } };
    component.allowNotOnList = false;

    expect(component.getCanonicalPrefetchText('toString')).toBeNull();
    expect(component.getCanonicalPrefetchText('constructor')).toBeNull();

    component.dataModel = { text: 'previous answer' };
    component.setItemValueForPrefetchAC(['toString']);

    expect(component.dataModel).toBeNull();
  });

  it('should accept an Object.prototype key when it is an actual prefetch answer', () => {
    const answer = { text: 'toString', code: 'to-string-code' };
    component.acType = 'prefetch';
    component.options = { acOptions: { matchListValue: true } };
    component.prefetchTextToItem = Object.create(null);
    component.prefetchTextToItem['toString'] = answer;
    component.allowNotOnList = false;

    expect(component.getCanonicalPrefetchText('toString')).toBe('toString');

    component.setItemValueForPrefetchAC(['toString']);

    expect(component.dataModel).toBe(answer);
  });

  it('should safely map __proto__ as an actual prefetch answer', () => {
    const answer = { text: '__proto__' };
    component.acType = 'prefetch';
    component.options = { acOptions: { matchListValue: true } };
    component.prefetchTextToItem = Object.create(null);
    component.prefetchTextToItem['__proto__'] = answer;

    expect(Object.getPrototypeOf(component.prefetchTextToItem)).toBeNull();
    expect(component.getCanonicalPrefetchText('__proto__')).toBe('__proto__');
  });

  it('should clear a previous single-select answer while retaining invalid input text', fakeAsync(() => {
    const input = document.createElement('input');
    input.value = 'invalid value';
    input.classList.add('invalid', 'no_match');
    input.setAttribute('invalid', 'true');
    component.ac = { nativeElement: input };
    component.item = {};
    component.options = { acOptions: { matchListValue: true } };
    component.acType = 'prefetch';
    component.prefetchTextToItem = { b: { text: 'b' } };
    component.dataModel = { text: 'b' };
    component.multipleSelections = false;
    component.acInstance = {
      setFieldVal: jasmine.createSpy('setFieldVal'),
      destroy: jasmine.createSpy('destroy')
    };
    spyOn(component.dataModelChange, 'emit');
    spyOn(component.lhcDataService, 'onItemValueChange');

    component.onSelectionHandler({
      final_val: 'invalid value',
      on_list: false,
      removed: false
    });

    expect(component.dataModel).toBeNull();
    expect(component.dataModelChange.emit).toHaveBeenCalledOnceWith(null);
    expect(component.lhcDataService.onItemValueChange)
      .toHaveBeenCalledOnceWith(component.item, null, null, true);

    tick();

    expect(component.acInstance.setFieldVal).toHaveBeenCalledWith('invalid value', false);
    expect(component.item._validationErrors).toEqual([component.autocompleteInvalidError]);
  }));

  it('should retain invalid pending text validation when a multi-select tag is removed', fakeAsync(() => {
    const input = document.createElement('input');
    input.value = 'invalid value';
    input.classList.add('invalid', 'no_match');
    input.setAttribute('invalid', 'true');
    component.ac = { nativeElement: input };
    component.item = {};
    component.options = { acOptions: { matchListValue: true } };
    component.acType = 'prefetch';
    component.prefetchTextToItem = { a: { text: 'a' } };
    component.dataModel = [{ text: 'a' }];
    component.multipleSelections = true;
    component.acInstance = {
      getSelectedItems: jasmine.createSpy('getSelectedItems').and.returnValue([]),
      setFieldVal: jasmine.createSpy('setFieldVal'),
      destroy: jasmine.createSpy('destroy')
    };

    component.onSelectionHandler({
      final_val: 'a',
      on_list: true,
      removed: true
    });
    tick();

    expect(input.value).toBe('invalid value');
    expect(input.classList.contains('invalid')).toBeTrue();
    expect(input.classList.contains('no_match')).toBeTrue();
    expect(input.getAttribute('invalid')).toBe('true');
    expect(component.item._hasAutocompleteValidationError).toBeTrue();
    expect(component.item._validationErrors).toEqual([component.autocompleteInvalidError]);
  }));

});

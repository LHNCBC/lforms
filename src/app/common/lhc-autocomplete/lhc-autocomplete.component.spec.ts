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

  it('should retain invalid pending text when a multi-select model updates', () => {
    const input = document.createElement('input');
    input.value = 'invalid value';
    input.classList.add('invalid', 'no_match');
    input.setAttribute('invalid', 'true');
    component.ac = { nativeElement: input };
    component.item = {
      _hasAutocompleteValidationError: true,
      _validationErrors: [component.autocompleteInvalidError]
    };
    component.multipleSelections = true;
    component.acInstance = {
      clearStoredSelection: jasmine.createSpy('clearStoredSelection'),
      addToSelectedArea: jasmine.createSpy('addToSelectedArea'),
      setFieldVal: jasmine.createSpy('setFieldVal'),
      storeSelectedItem: jasmine.createSpy('storeSelectedItem'),
      destroy: jasmine.createSpy('destroy')
    };
    spyOn(component, 'updateAutocompSelectionModel').and.returnValue('Updated answer');

    component.updateDisplayedValue([{ text: 'Updated answer' }]);

    expect(component.acInstance.clearStoredSelection).toHaveBeenCalled();
    expect(component.acInstance.addToSelectedArea).toHaveBeenCalledWith('Updated answer');
    expect(input.value).toBe('invalid value');
    expect(input.classList.contains('invalid')).toBeTrue();
    expect(input.classList.contains('no_match')).toBeTrue();
    expect(input.getAttribute('invalid')).toBe('true');
    expect(component.item._hasAutocompleteValidationError).toBeTrue();
    expect(component.item._validationErrors).toEqual([component.autocompleteInvalidError]);
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

  it('should clear the pending field after normalizing a multi-select prefetch match', fakeAsync(() => {
    const input = document.createElement('input');
    input.value = 'b';
    component.ac = { nativeElement: input };
    component.item = {};
    component.options = { acOptions: { matchListValue: true } };
    component.acType = 'prefetch';
    component.multipleSelections = true;
    component.prefetchTextToItem = { B: { text: 'B', code: 'b-code' } };
    const acInstance: any = {
      element: input,
      processedFieldVal_: 'b',
      fieldValIsListVal_: false,
      setFieldVal: jasmine.createSpy('setFieldVal').and.callFake(value => input.value = value),
      storeSelectedItem: jasmine.createSpy('storeSelectedItem'),
      addToSelectedArea: jasmine.createSpy('addToSelectedArea'),
      getSelectedItems: jasmine.createSpy('getSelectedItems').and.returnValue(['B']),
      setInvalidValIndicator: jasmine.createSpy('setInvalidValIndicator'),
      setMatchStatusIndicator: jasmine.createSpy('setMatchStatusIndicator'),
      destroy: jasmine.createSpy('destroy')
    };
    component.acInstance = acInstance;

    component.onSelectionHandler({
      final_val: 'b',
      on_list: false,
      removed: false
    });

    expect(acInstance.addToSelectedArea).toHaveBeenCalledOnceWith('B');
    expect(input.value).toBe('B');
    expect(component.dataModel).toEqual([{ text: 'B', code: 'b-code' }]);

    // autocomplete-lhc marks the original off-list event invalid after the
    // LForms selection observer returns.
    input.classList.add('invalid', 'no_match');
    input.setAttribute('invalid', 'true');
    acInstance.processedFieldVal_ = 'b';
    acInstance.fieldValIsListVal_ = false;

    tick();

    expect(input.value).toBe('');
    expect(acInstance.processedFieldVal_).toBe('');
    expect(acInstance.fieldValIsListVal_).toBeTrue();
    expect(acInstance.setInvalidValIndicator).toHaveBeenCalledWith(false);
    expect(acInstance.setMatchStatusIndicator).toHaveBeenCalledWith(true);
    expect(input.classList.contains('invalid')).toBeFalse();
    expect(input.classList.contains('no_match')).toBeFalse();
    expect(input.hasAttribute('invalid')).toBeFalse();
    expect(component.item._validationErrors).toBeUndefined();
  }));

  it('should not add a duplicate tag for a canonical multi-select match', fakeAsync(() => {
    const input = document.createElement('input');
    input.value = 'b';
    component.ac = { nativeElement: input };
    component.item = {};
    component.options = { acOptions: { matchListValue: true } };
    component.acType = 'prefetch';
    component.multipleSelections = true;
    component.dataModel = [{ text: 'B', code: 'b-code' }];
    component.prefetchTextToItem = { B: { text: 'B', code: 'b-code' } };
    const acInstance: any = {
      element: input,
      processedFieldVal_: 'b',
      fieldValIsListVal_: false,
      isSelected: jasmine.createSpy('isSelected').and.returnValue(true),
      setFieldVal: jasmine.createSpy('setFieldVal').and.callFake(value => input.value = value),
      storeSelectedItem: jasmine.createSpy('storeSelectedItem'),
      addToSelectedArea: jasmine.createSpy('addToSelectedArea'),
      getSelectedItems: jasmine.createSpy('getSelectedItems').and.returnValue(['B']),
      setInvalidValIndicator: jasmine.createSpy('setInvalidValIndicator'),
      setMatchStatusIndicator: jasmine.createSpy('setMatchStatusIndicator'),
      destroy: jasmine.createSpy('destroy')
    };
    component.acInstance = acInstance;
    spyOn(component.dataModelChange, 'emit');

    component.onSelectionHandler({
      final_val: 'b',
      on_list: false,
      removed: false
    });

    expect(acInstance.isSelected).toHaveBeenCalledOnceWith('B');
    expect(acInstance.storeSelectedItem).not.toHaveBeenCalled();
    expect(acInstance.addToSelectedArea).not.toHaveBeenCalled();
    expect(component.dataModel).toEqual([{ text: 'B', code: 'b-code' }]);
    expect(component.dataModelChange.emit).not.toHaveBeenCalled();

    tick();

    expect(input.value).toBe('');
  }));

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

  it('should not restore invalid text into a rebuilt autocomplete', fakeAsync(() => {
    const input = document.createElement('input');
    input.value = 'invalid value';
    component.ac = { nativeElement: input };
    component.item = {};
    component.options = { acOptions: { matchListValue: true } };
    component.acType = 'prefetch';
    component.prefetchTextToItem = {};
    component.dataModel = { text: 'previous answer' };
    component.multipleSelections = false;
    const oldInstance = {
      setFieldVal: jasmine.createSpy('oldSetFieldVal'),
      destroy: jasmine.createSpy('oldDestroy')
    };
    const newInstance = {
      setFieldVal: jasmine.createSpy('newSetFieldVal'),
      destroy: jasmine.createSpy('newDestroy')
    };
    component.acInstance = oldInstance;
    spyOn(component.dataModelChange, 'emit').and.callFake(() => {
      component.cleanupAutocomplete(true);
      component.acInstance = newInstance;
    });
    spyOn(component.lhcDataService, 'onItemValueChange');

    component.onSelectionHandler({
      final_val: 'invalid value',
      on_list: false,
      removed: false
    });
    tick();

    expect(oldInstance.setFieldVal).toHaveBeenCalledOnceWith('', false);
    expect(oldInstance.destroy).toHaveBeenCalled();
    expect(newInstance.setFieldVal).not.toHaveBeenCalled();
    expect(component.item._hasAutocompleteValidationError).toBeUndefined();
  }));

  it('should not restore invalid text after the component is destroyed', fakeAsync(() => {
    const input = document.createElement('input');
    input.value = 'invalid value';
    component.ac = { nativeElement: input };
    component.item = {};
    component.options = { acOptions: { matchListValue: true } };
    component.acType = 'prefetch';
    component.prefetchTextToItem = {};
    component.dataModel = { text: 'previous answer' };
    component.multipleSelections = false;
    let destroyed = false;
    const setFieldVal = jasmine.createSpy('setFieldVal').and.callFake(() => {
      if (destroyed) {
        throw new Error('setFieldVal called after destroy');
      }
    });
    component.acInstance = {
      setFieldVal,
      destroy: jasmine.createSpy('destroy').and.callFake(() => destroyed = true)
    };
    spyOn(component.dataModelChange, 'emit');
    spyOn(component.lhcDataService, 'onItemValueChange');

    component.onSelectionHandler({
      final_val: 'invalid value',
      on_list: false,
      removed: false
    });
    fixture.destroy();

    expect(() => tick()).not.toThrow();
    expect(setFieldVal).toHaveBeenCalledOnceWith('', false);
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

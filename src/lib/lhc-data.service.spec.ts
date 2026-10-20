import { TestBed } from '@angular/core/testing';

import { LhcDataService } from './lhc-data.service';

describe('LhcDataService', () => {
  let service: LhcDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [],
      providers: [LhcDataService]
    });
    service = TestBed.inject(LhcDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should have default template classes', () => {
    service.setLhcFormData({
      templateOptions: {
        hideTreeLine: false,
        hideIndentation: false,
        hideRepetitionNumber: false
      }
    });
    expect(service.getTreeLineClass()).toBe('lhc-tree-line');
    expect(service.getIndentationClass()).toBe('lhc-indentation');
    expect(service.isHideRepetitionNumber()).toBeFalse();
  });

  it('should hide tree lines', () => {
    service.setLhcFormData({
      templateOptions: {
        hideTreeLine: true
      }
    });
    expect(service.getTreeLineClass()).toBe('');
  });

  it('should hide indentation', () => {
    service.setLhcFormData({
      templateOptions: {
        hideIndentation: true
      }
    });
    expect(service.getIndentationClass()).toBe('');
    expect(service.getTreeLineClass()).toBe('');
  });

  it('should hide repetition number', () => {
    service.setLhcFormData({
      templateOptions: {
        hideRepetitionNumber: true
      }
    });
    expect(service.isHideRepetitionNumber()).toBeTrue();
  });

  it('should show a multi-select subgroup only when one of its sub items is shown', () => {
    service.setLhcFormData({});
    const subGroup = (subItems) => ({isSubGroupForMultiSelect: true, items: subItems});
    const visible = {linkId: 'visible'};
    const hidden = {linkId: 'hidden', _isHiddenFromView: true};
    const disabled = {linkId: 'disabled', _enableWhenExpVal: false};
    const disabledProtected = {linkId: 'protected', _enableWhenExpVal: false, _disabledDisplayStatus: 'protected'};

    expect(service.multiSelectSubGroupShown(subGroup([visible]))).toBeTrue();
    expect(service.multiSelectSubGroupShown(subGroup([hidden, visible]))).toBeTrue();
    expect(service.multiSelectSubGroupShown(subGroup([disabledProtected]))).toBeTrue();
    expect(service.multiSelectSubGroupShown(subGroup([hidden]))).toBeFalse();
    expect(service.multiSelectSubGroupShown(subGroup([disabled]))).toBeFalse();
    expect(service.multiSelectSubGroupShown(subGroup([hidden, disabled]))).toBeFalse();
    expect(service.multiSelectSubGroupShown(subGroup([]))).toBeFalse();
    // Other items, including groups whose sub items are all hidden, are not affected.
    expect(service.multiSelectSubGroupShown({items: [hidden]})).toBeTrue();
    expect(service.multiSelectSubGroupShown(visible)).toBeTrue();
  });
});

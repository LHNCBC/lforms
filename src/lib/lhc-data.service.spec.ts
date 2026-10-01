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

  it('should use top tabs without headers or sticky navigation by default', () => {
    service.setLhcFormData({templateOptions: {}});

    expect(service.getTabPosition()).toBe('top');
    expect(service.getShowTabHeader()).toBeFalse();
    expect(service.getStickyTabs()).toBeFalse();
  });

  it('should resolve vertical tabs, content headers, and sticky navigation', () => {
    service.setLhcFormData({
      templateOptions: {tabLayout: 'vertical', showTabHeader: true, stickyTabs: true}
    });

    expect(service.getTabPosition()).toBe('left');
    expect(service.getShowTabHeader()).toBeTrue();
    expect(service.getStickyTabs()).toBeTrue();
  });

  it('should reject invalid tab layouts and non-boolean tab flags', () => {
    service.setLhcFormData({
      templateOptions: {tabLayout: 'right', showTabHeader: 'true', stickyTabs: 'true'}
    });

    expect(service.getTabPosition()).toBe('top');
    expect(service.getShowTabHeader()).toBeFalse();
    expect(service.getStickyTabs()).toBeFalse();
  });
});

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

  [
    {hideTreeLine: false, hideIndentation: false, depth: 3, lines: true},
    {hideTreeLine: true, hideIndentation: false, depth: 4, lines: false},
    {hideTreeLine: 'true', hideIndentation: false, depth: 4, lines: false},
    {hideTreeLine: 'auto', hideIndentation: false, depth: 3, lines: false},
    {hideTreeLine: 'auto', hideIndentation: false, depth: 4, lines: true},
    {hideTreeLine: false, hideIndentation: true, depth: 4, lines: false}
  ].forEach(({hideTreeLine, hideIndentation, depth, lines}) => {
    it(`should preserve descendant layout and suppress tab-root decoration with ${JSON.stringify({hideTreeLine, hideIndentation, depth})}`, () => {
      service.setLhcFormData({
        templateOptions: {hideTreeLine, hideIndentation}, _totalLevelsOfHierarchy: depth
      });
      const item = {dataType: 'ST', question: 'Question', _firstSibling: true, _lastSibling: true};
      const descendantClasses = service.getItemClassList(item, 'lg').split(/\s+/);
      expect(descendantClasses.includes('lhc-tree-line')).toBe(lines);
      expect(descendantClasses.includes('lhc-indentation')).toBe(!hideIndentation);

      const tabRootClasses = service.getItemClassList(item, 'lg', true).split(/\s+/);
      expect(tabRootClasses).not.toContain('lhc-tree-line');
      expect(tabRootClasses).not.toContain('lhc-indentation');
      expect(tabRootClasses).toContain('lhc-item-view-lg');
      expect(tabRootClasses).toContain('lhc-first-item');
      expect(tabRootClasses).toContain('lhc-last-item');
    });
  });

  it('should show a multi-select subgroup only when one of its sub items is shown', () => {
    service.setLhcFormData({});
    /**
     * Build a minimal subgroup for visibility assertions.
     * @param subItems Child items whose visibility is evaluated.
     * @returns A multi-select subgroup fixture containing the supplied children.
     */
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

  it('should use top tabs without headers or sticky navigation by default', () => {
    service.setLhcFormData({templateOptions: {}});

    expect(service.getTabPosition()).toBe('top');
    expect(service.getTabAnswerAlignment()).toBe('form');
    expect(service.getShowTabHeader()).toBeFalse();
    expect(service.getShowTabContainerText()).toBeFalse();
    expect(service.getStickyTabs()).toBeFalse();
  });

  it('should resolve vertical tabs, content headers, and sticky navigation', () => {
    service.setLhcFormData({
      templateOptions: {
        tabLayout: 'vertical', tabAnswerAlignment: 'content', showTabHeader: true,
        showTabContainerText: true, stickyTabs: true
      }
    });

    expect(service.getTabPosition()).toBe('left');
    expect(service.getTabAnswerAlignment()).toBe('content');
    expect(service.getShowTabHeader()).toBeTrue();
    expect(service.getShowTabContainerText()).toBeTrue();
    expect(service.getStickyTabs()).toBeTrue();
  });

  it('should reject invalid tab layouts and non-boolean tab flags', () => {
    service.setLhcFormData({
      templateOptions: {tabLayout: 'right', showTabHeader: 'true', showTabContainerText: 'true', stickyTabs: 'true'}
    });

    expect(service.getTabPosition()).toBe('top');
    expect(service.getShowTabHeader()).toBeFalse();
    expect(service.getShowTabContainerText()).toBeFalse();
    expect(service.getStickyTabs()).toBeFalse();
  });

  [undefined, null, 'form', 'invalid', true].forEach(tabAnswerAlignment => {
    it(`should use form alignment for ${tabAnswerAlignment}`, () => {
      service.setLhcFormData({templateOptions: {tabAnswerAlignment}});

      expect(service.getTabAnswerAlignment()).toBe('form');
    });
  });
});

import {ElementRef} from '@angular/core';
import {LhcDataService} from '../../lib/lhc-data.service';
import {LhcGroupTabsComponent} from './lhc-group-tabs.component';

describe('LhcGroupTabsComponent', () => {
  let component: LhcGroupTabsComponent;
  let lhcDataService: jasmine.SpyObj<LhcDataService>;
  let tabset: HTMLElement;
  let contentHolder: HTMLElement;
  let tabsetTop: number;
  let scrollIntoViewSpy: jasmine.Spy;
  let requestAnimationFrameSpy: jasmine.Spy;
  let cancelAnimationFrameSpy: jasmine.Spy;
  let resizeObserverCallback: ResizeObserverCallback;
  let originalResizeObserver: typeof ResizeObserver;
  let nextFrameId: number;
  let pendingFrames: Map<number, FrameRequestCallback>;

  beforeEach(() => {
    lhcDataService = jasmine.createSpyObj<LhcDataService>(
      'LhcDataService', ['getStickyTabs', 'getTabPosition']
    );
    component = new LhcGroupTabsComponent(lhcDataService);
    tabset = document.createElement('div');
    contentHolder = document.createElement('div');
    contentHolder.className = 'ant-tabs-content-holder';
    tabset.appendChild(contentHolder);
    document.body.appendChild(tabset);
    component.tabset = new ElementRef(tabset);

    originalResizeObserver = window.ResizeObserver;
    window.ResizeObserver = class {
      constructor(callback: ResizeObserverCallback) {
        resizeObserverCallback = callback;
      }
      observe(): void {}
      unobserve(): void {}
      disconnect(): void {}
    } as unknown as typeof ResizeObserver;

    tabsetTop = 0;
    spyOn(tabset, 'getBoundingClientRect').and.callFake(() => ({top: tabsetTop}) as DOMRect);
    scrollIntoViewSpy = spyOn(tabset, 'scrollIntoView');

    nextFrameId = 1;
    pendingFrames = new Map();
    requestAnimationFrameSpy = spyOn(window, 'requestAnimationFrame').and.callFake(callback => {
      const frameId = nextFrameId++;
      pendingFrames.set(frameId, callback);
      return frameId;
    });
    cancelAnimationFrameSpy = spyOn(window, 'cancelAnimationFrame').and.callFake(frameId => {
      pendingFrames.delete(frameId);
    });
  });

  afterEach(() => {
    window.ResizeObserver = originalResizeObserver;
    tabset.remove();
  });

  function runFrame(frameId: number): void {
    const callback = pendingFrames.get(frameId);
    expect(callback).toBeDefined();
    pendingFrames.delete(frameId);
    callback(0);
  }

  function initializeStickyTabs(stickyBoundary = '0px'): void {
    lhcDataService.getStickyTabs.and.returnValue(true);
    tabset.style.scrollMarginTop = stickyBoundary;
    component.ngAfterViewInit();
  }

  function reportContentWidth(width: number): void {
    resizeObserverCallback([{
      contentRect: {width}
    } as ResizeObserverEntry], {} as ResizeObserver);
  }

  it('should publish half of the vertical tab content width for descendant questions', () => {
    lhcDataService.getTabPosition.and.returnValue('left');
    component.ngAfterViewInit();

    reportContentWidth(640);

    expect(contentHolder.style.getPropertyValue('--lhc-tab-content-answer-width')).toBe('320px');
  });

  it('should retain the last usable vertical tab content width while content is hidden', () => {
    lhcDataService.getTabPosition.and.returnValue('left');
    component.ngAfterViewInit();
    reportContentWidth(640);

    reportContentWidth(0);

    expect(contentHolder.style.getPropertyValue('--lhc-tab-content-answer-width')).toBe('320px');
  });

  it('should leave horizontal tabs on the existing form-width fallback', () => {
    component.ngAfterViewInit();
    reportContentWidth(800);

    expect(contentHolder.style.getPropertyValue('--lhc-tab-content-answer-width')).toBe('');
  });

  it('should ignore the initial tab selection', () => {
    lhcDataService.getStickyTabs.and.returnValue(true);
    tabsetTop = -1;

    component.onSelectedIndexChange();

    expect(requestAnimationFrameSpy).not.toHaveBeenCalled();
    expect(scrollIntoViewSpy).not.toHaveBeenCalled();
  });

  it('should not scroll when sticky tabs are disabled', () => {
    lhcDataService.getStickyTabs.and.returnValue(false);
    component.ngAfterViewInit();
    tabsetTop = -1;

    component.onSelectedIndexChange();

    expect(requestAnimationFrameSpy).not.toHaveBeenCalled();
    expect(scrollIntoViewSpy).not.toHaveBeenCalled();
  });

  [
    {position: 'below', top: 41},
    {position: 'at', top: 40}
  ].forEach(({position, top}) => {
    it(`should not scroll when the tabset is ${position} the sticky boundary`, () => {
      initializeStickyTabs('40px');
      tabsetTop = top;

      component.onSelectedIndexChange();

      expect(requestAnimationFrameSpy).not.toHaveBeenCalled();
      expect(scrollIntoViewSpy).not.toHaveBeenCalled();
    });
  });

  it('should scroll on the next frame when the tabset is above the sticky boundary', () => {
    initializeStickyTabs('40px');
    tabsetTop = 39;

    component.onSelectedIndexChange();

    expect(requestAnimationFrameSpy).toHaveBeenCalledTimes(1);
    expect(scrollIntoViewSpy).not.toHaveBeenCalled();

    runFrame(1);

    expect(scrollIntoViewSpy).toHaveBeenCalledOnceWith({block: 'start', inline: 'nearest'});
  });

  it('should use the resolved computed scroll margin as the sticky boundary', () => {
    initializeStickyTabs('calc(2rem + 3px)');
    const stickyBoundary = parseFloat(getComputedStyle(tabset).scrollMarginTop);
    expect(stickyBoundary).toBeGreaterThan(3);
    tabsetTop = stickyBoundary - 1;

    component.onSelectedIndexChange();

    expect(requestAnimationFrameSpy).toHaveBeenCalledTimes(1);
  });

  it('should cancel a pending frame when another selection needs to scroll', () => {
    initializeStickyTabs();
    tabsetTop = -1;

    component.onSelectedIndexChange();
    component.onSelectedIndexChange();

    expect(cancelAnimationFrameSpy).toHaveBeenCalledOnceWith(1);
    expect(requestAnimationFrameSpy).toHaveBeenCalledTimes(2);
    expect(pendingFrames.has(1)).toBeFalse();

    runFrame(2);

    expect(scrollIntoViewSpy).toHaveBeenCalledTimes(1);
  });

  it('should cancel a pending frame when the latest selection does not need to scroll', () => {
    initializeStickyTabs();
    tabsetTop = -1;
    component.onSelectedIndexChange();

    tabsetTop = 0;
    component.onSelectedIndexChange();

    expect(cancelAnimationFrameSpy).toHaveBeenCalledOnceWith(1);
    expect(requestAnimationFrameSpy).toHaveBeenCalledTimes(1);
    expect(pendingFrames.size).toBe(0);
    expect(scrollIntoViewSpy).not.toHaveBeenCalled();
  });

  it('should cancel a pending frame when destroyed', () => {
    initializeStickyTabs();
    tabsetTop = -1;
    component.onSelectedIndexChange();

    component.ngOnDestroy();

    expect(cancelAnimationFrameSpy).toHaveBeenCalledOnceWith(1);
  });
});

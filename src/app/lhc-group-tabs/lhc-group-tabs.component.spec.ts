import {ElementRef, NgZone} from '@angular/core';
import {LhcDataService} from '../../lib/lhc-data.service';
import {WindowService} from '../../lib/window.service';
import {LhcGroupTabsComponent} from './lhc-group-tabs.component';

describe('LhcGroupTabsComponent', () => {
  let component: LhcGroupTabsComponent;
  let lhcDataService: jasmine.SpyObj<LhcDataService>;
  let windowService: jasmine.SpyObj<WindowService>;
  let tabset: HTMLElement;
  let contentHolder: HTMLElement;
  let tabsetTop: number;
  let scrollIntoViewSpy: jasmine.Spy;
  let requestAnimationFrameSpy: jasmine.Spy;
  let cancelAnimationFrameSpy: jasmine.Spy;
  let resizeObserverCallback: ResizeObserverCallback;
  let originalResizeObserver: typeof ResizeObserver;
  let disconnectObserverSpy: jasmine.Spy;
  let nextFrameId: number;
  let pendingFrames: Map<number, FrameRequestCallback>;
  let scrollHost: HTMLElement;

  beforeEach(() => {
    lhcDataService = jasmine.createSpyObj<LhcDataService>(
      'LhcDataService', ['getStickyTabs', 'getTabPosition', 'getTabAnswerAlignment']
    );
    windowService = jasmine.createSpyObj<WindowService>('WindowService', ['getWindowWidth']);
    windowService.getWindowWidth.and.returnValue(800);
    component = new LhcGroupTabsComponent(lhcDataService, new NgZone({enableLongStackTrace: false}), windowService);
    tabset = document.createElement('div');
    contentHolder = document.createElement('div');
    contentHolder.className = 'ant-tabs-content-holder';
    tabset.appendChild(contentHolder);
    document.body.appendChild(tabset);
    component.tabset = new ElementRef(tabset);

    originalResizeObserver = window.ResizeObserver;
    disconnectObserverSpy = jasmine.createSpy('disconnect');
    window.ResizeObserver = class {
      constructor(callback: ResizeObserverCallback) {
        resizeObserverCallback = callback;
      }
      observe(): void {}
      unobserve(): void {}
      disconnect = disconnectObserverSpy;
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
    scrollHost?.remove();
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

  it('should cache half of the content width regardless of the current alignment', () => {
    component.ngAfterViewInit();

    reportContentWidth(640);

    expect(component.contentAnswerWidth).toBeNull();
    runFrame(1);
    expect(component.contentAnswerWidth).toBe('320px');
  });

  it('should retain the last usable vertical tab content width while content is hidden', () => {
    component.ngAfterViewInit();
    reportContentWidth(640);
    runFrame(1);

    reportContentWidth(0);

    expect(component.contentAnswerWidth).toBe('320px');
  });

  it('should leave the width unset until the content becomes visible', () => {
    component.ngAfterViewInit();
    reportContentWidth(0);

    expect(component.contentAnswerWidth).toBeNull();
  });

  it('should use the latest content measurement on the next frame', () => {
    component.ngAfterViewInit();
    reportContentWidth(640);
    reportContentWidth(600);

    expect(cancelAnimationFrameSpy).toHaveBeenCalledOnceWith(1);
    runFrame(2);

    expect(component.contentAnswerWidth).toBe('300px');
  });

  it('should disconnect the observer and cancel pending measurement updates when destroyed', () => {
    component.ngAfterViewInit();
    reportContentWidth(640);

    component.ngOnDestroy();

    expect(disconnectObserverSpy).toHaveBeenCalledTimes(1);
    expect(cancelAnimationFrameSpy).toHaveBeenCalledOnceWith(1);
  });

  it('should stack narrow form-aligned vertical tabs and restore the layout as width or options change', () => {
    lhcDataService.getTabPosition.and.returnValue('left');
    lhcDataService.getTabAnswerAlignment.and.returnValue('form');
    component.ngAfterViewInit();

    reportContentWidth(601);
    runFrame(1);
    expect(component.stackQuestions).toBeFalse();

    reportContentWidth(600);
    runFrame(2);
    expect(component.stackQuestions).toBeTrue();

    lhcDataService.getTabAnswerAlignment.and.returnValue('content');
    expect(component.stackQuestions).toBeFalse();
    lhcDataService.getTabAnswerAlignment.and.returnValue('form');
    lhcDataService.getTabPosition.and.returnValue('top');
    expect(component.stackQuestions).toBeFalse();

    lhcDataService.getTabPosition.and.returnValue('left');
    reportContentWidth(900);
    runFrame(3);
    expect(component.stackQuestions).toBeFalse();

    // A wider form also needs room for its wider aligned answer column, even
    // when this tab's content is above the normal responsive breakpoint.
    windowService.getWindowWidth.and.returnValue(1600);
    expect(component.stackQuestions).toBeTrue();
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

  it('should reset only the nearest scrolling host using its border and sticky offset', () => {
    scrollHost = document.createElement('div');
    scrollHost.style.cssText = 'overflow:auto; height:10px';
    const innerHost = document.createElement('div');
    innerHost.style.cssText = 'overflow:auto; height:20px; border:3px solid black';
    document.body.appendChild(scrollHost);
    scrollHost.appendChild(innerHost);
    innerHost.appendChild(tabset);
    tabset.style.height = '200px';
    innerHost.scrollTop = 100;
    scrollHost.scrollTop = 5;
    spyOn(innerHost, 'getBoundingClientRect').and.returnValue({top: 200} as DOMRect);
    initializeStickyTabs('40px');
    tabsetTop = 240; // Above the inner host's sticky boundary at 200 + 3 + 40.

    component.onSelectedIndexChange();
    runFrame(1);

    expect(innerHost.scrollTop).toBe(97);
    expect(scrollHost.scrollTop).toBe(5);
    expect(scrollIntoViewSpy).not.toHaveBeenCalled();
  });

  it('should keep the scroll position when the tabset starts below the host sticky boundary', () => {
    scrollHost = document.createElement('div');
    scrollHost.style.overflowY = 'auto';
    document.body.appendChild(scrollHost);
    scrollHost.appendChild(tabset);
    spyOn(scrollHost, 'getBoundingClientRect').and.returnValue({top: 200} as DOMRect);
    initializeStickyTabs('40px');
    tabsetTop = 241;

    component.onSelectedIndexChange();

    expect(requestAnimationFrameSpy).not.toHaveBeenCalled();
    expect(scrollIntoViewSpy).not.toHaveBeenCalled();
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

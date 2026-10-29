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
  let resizeObservations: {callback: ResizeObserverCallback; targets: Element[]}[];
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
    component.item = {items: [{_isHiddenFromView: false}, {_isHiddenFromView: false}]};
    tabset = document.createElement('div');
    const navigation = document.createElement('div');
    navigation.className = 'ant-tabs-nav';
    navigation.style.position = 'sticky';
    tabset.appendChild(navigation);
    contentHolder = document.createElement('div');
    contentHolder.className = 'ant-tabs-content-holder';
    tabset.appendChild(contentHolder);
    document.body.appendChild(tabset);
    component.tabset = new ElementRef(tabset);

    originalResizeObserver = window.ResizeObserver;
    resizeObservations = [];
    disconnectObserverSpy = jasmine.createSpy('disconnect');
    window.ResizeObserver = class {
      private targets: Element[] = [];
      /**
       * Capture the observer callback so tests can deliver measurements explicitly.
       * @param callback Callback supplied by the component under test.
       */
      constructor(callback: ResizeObserverCallback) {
        resizeObserverCallback = callback;
        resizeObservations.push({callback, targets: this.targets});
      }
      /**
       * Record observation targets without subscribing to browser layout updates.
       * @param target Element whose size the component wants to observe.
       */
      observe(target: Element): void { this.targets.push(target); }
      /** Accept unobserve requests without browser-side effects. */
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

  /**
   * Run and remove a queued animation-frame callback in the test scheduler.
   * @param frameId ID returned by the mocked requestAnimationFrame call.
   */
  function runFrame(frameId: number): void {
    const callback = pendingFrames.get(frameId);
    expect(callback).toBeDefined();
    pendingFrames.delete(frameId);
    callback(0);
  }

  /**
   * Enable sticky tabs and initialize the component with the specified scroll margin.
   * @param stickyBoundary CSS scroll-margin-top value representing the sticky offset.
   */
  function initializeStickyTabs(stickyBoundary = '0px'): void {
    lhcDataService.getStickyTabs.and.returnValue(true);
    tabset.style.scrollMarginTop = stickyBoundary;
    component.ngAfterViewInit();
  }

  /**
   * Deliver a synthetic content-width measurement to the captured resize observer.
   * @param width Observed content width in CSS pixels; zero represents hidden content.
   */
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

  it('should measure the nearest scroll container and refresh its height after resizing', () => {
    scrollHost = document.createElement('div');
    scrollHost.style.cssText = 'height:700px; overflow:auto';
    const innerHost = document.createElement('div');
    innerHost.style.cssText = 'height:350px; overflow:auto; border:3px solid black';
    document.body.appendChild(scrollHost);
    scrollHost.appendChild(innerHost);
    innerHost.appendChild(tabset);
    component.ngAfterViewInit();
    const observation = resizeObservations.find(observation => observation.targets.includes(innerHost));
    expect(observation).toBeDefined();

    const entry: ResizeObserverEntry = {
      target: innerHost, contentRect: innerHost.getBoundingClientRect(),
      borderBoxSize: [], contentBoxSize: [], devicePixelContentBoxSize: []
    };
    observation.callback([entry], {} as ResizeObserver);
    expect(tabset.style.getPropertyValue('--lhc-tab-scroll-container-height')).toBe('350px');

    innerHost.style.height = '250px';
    observation.callback([{...entry, contentRect: innerHost.getBoundingClientRect()}], {} as ResizeObserver);
    expect(tabset.style.getPropertyValue('--lhc-tab-scroll-container-height')).toBe('250px');
  });

  it('should disconnect both content and scroll-container observations on destruction', () => {
    scrollHost = document.createElement('div');
    scrollHost.style.cssText = 'height:350px; overflow:auto';
    document.body.appendChild(scrollHost);
    scrollHost.appendChild(tabset);
    component.ngAfterViewInit();

    component.ngOnDestroy();

    expect(disconnectObserverSpy).toHaveBeenCalledTimes(2);
  });

  it('should ignore the initial tab selection', () => {
    lhcDataService.getStickyTabs.and.returnValue(true);
    tabsetTop = -1;

    component.onSelectedIndexChange(1);

    expect(requestAnimationFrameSpy).not.toHaveBeenCalled();
    expect(scrollIntoViewSpy).not.toHaveBeenCalled();
  });

  it('should not scroll when sticky tabs are disabled', () => {
    lhcDataService.getStickyTabs.and.returnValue(false);
    component.ngAfterViewInit();
    tabsetTop = -1;

    component.onSelectedIndexChange(1);

    expect(requestAnimationFrameSpy).not.toHaveBeenCalled();
    expect(scrollIntoViewSpy).not.toHaveBeenCalled();
  });

  it('should keep the current answer in view when hiding an earlier tab changes only its index', () => {
    initializeStickyTabs();
    component.onSelectedIndexChange(1);
    component.item.items[0]._isHiddenFromView = true;
    tabsetTop = -100;

    component.onSelectedIndexChange(0);

    expect(requestAnimationFrameSpy).not.toHaveBeenCalled();
    expect(scrollIntoViewSpy).not.toHaveBeenCalled();
  });

  it('should not reset scrolling for nonsticky nested horizontal navigation', () => {
    initializeStickyTabs();
    tabset.querySelector<HTMLElement>('.ant-tabs-nav').style.position = 'static';
    tabsetTop = -100;

    component.onSelectedIndexChange(1);

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

      component.onSelectedIndexChange(1);

      expect(requestAnimationFrameSpy).not.toHaveBeenCalled();
      expect(scrollIntoViewSpy).not.toHaveBeenCalled();
    });
  });

  it('should scroll on the next frame when the tabset is above the sticky boundary', () => {
    initializeStickyTabs('40px');
    tabsetTop = 39;

    component.onSelectedIndexChange(1);

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

    component.onSelectedIndexChange(1);

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

    component.onSelectedIndexChange(1);
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

    component.onSelectedIndexChange(1);

    expect(requestAnimationFrameSpy).not.toHaveBeenCalled();
    expect(scrollIntoViewSpy).not.toHaveBeenCalled();
  });

  it('should cancel a pending frame when another selection needs to scroll', () => {
    initializeStickyTabs();
    tabsetTop = -1;

    component.onSelectedIndexChange(1);
    component.onSelectedIndexChange(0);

    expect(cancelAnimationFrameSpy).toHaveBeenCalledOnceWith(1);
    expect(requestAnimationFrameSpy).toHaveBeenCalledTimes(2);
    expect(pendingFrames.has(1)).toBeFalse();

    runFrame(2);

    expect(scrollIntoViewSpy).toHaveBeenCalledTimes(1);
  });

  it('should cancel a pending frame when the latest selection does not need to scroll', () => {
    initializeStickyTabs();
    tabsetTop = -1;
    component.onSelectedIndexChange(1);

    tabsetTop = 0;
    component.onSelectedIndexChange(0);

    expect(cancelAnimationFrameSpy).toHaveBeenCalledOnceWith(1);
    expect(requestAnimationFrameSpy).toHaveBeenCalledTimes(1);
    expect(pendingFrames.size).toBe(0);
    expect(scrollIntoViewSpy).not.toHaveBeenCalled();
  });

  it('should cancel a pending frame when destroyed', () => {
    initializeStickyTabs();
    tabsetTop = -1;
    component.onSelectedIndexChange(1);

    component.ngOnDestroy();

    expect(cancelAnimationFrameSpy).toHaveBeenCalledOnceWith(1);
  });
});

import { TestBed } from '@angular/core/testing';

import { WindowService } from './window.service';

describe('WindowService', () => {
  let service: WindowService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WindowService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should set a window width and class', () => {
    // there is an initial value of the window width (i.e. 1250)
    // that should be ignored
    
    // service.windowWidth.subscribe(updatedWidth => {
    //   console.log("*********")
    //   console.log(updatedWidth)
    //   if (updatedWidth === 100 ) {
    //     //service.getViewModeClass()) gets the previous value, because this._windowWidth$.next(width) is called before this._viewModeClass$.next(viewClass);
    //     expect(service.getViewModeClass()).toBe('lhc-view-sm'); 
    //   }
    //   else if (updatedWidth === 500) {
    //     expect(service.getViewModeClass()).toBe('lhc-view-md');
    //   }
    //   else if (updatedWidth === 900){
    //     expect(service.getViewModeClass()).toBe('lhc-view-lg');
    //   }
    // });  
    
    
    service.setWindowWidth(100);
    expect(service.getWindowWidth()).toBe(100);
    expect(service.getViewModeClass()).toBe('lhc-view-sm');

    service.setWindowWidth(500);
    expect(service.getWindowWidth()).toBe(500);
    expect(service.getViewModeClass()).toBe('lhc-view-md');

    service.setWindowWidth(900);
    expect(service.getWindowWidth()).toBe(900);
    expect(service.getViewModeClass()).toBe('lhc-view-lg');
 
  })

});

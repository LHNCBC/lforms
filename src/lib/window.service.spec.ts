import { TestBed } from '@angular/core/testing';
import { WindowService } from './window.service';

describe('WindowService', () => {
  let service: WindowService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [],
      providers: [WindowService]
    });
    service = TestBed.inject(WindowService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should set a window width and class', () => {
    
    service.setWindowWidth(100);
    expect(service.getWindowWidth()).toBe(100);
    expect(service.getViewMode()).toBe('sm');

    service.setWindowWidth(500);
    expect(service.getWindowWidth()).toBe(500);
    expect(service.getViewMode()).toBe('md');

    service.setWindowWidth(900);
    expect(service.getWindowWidth()).toBe(900);
    expect(service.getViewMode()).toBe('lg');
 
  })

});

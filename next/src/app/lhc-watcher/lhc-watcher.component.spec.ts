import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LhcWatcherComponent } from './lhc-watcher.component';

describe('LhcWatcherComponent', () => {
  let component: LhcWatcherComponent;
  let fixture: ComponentFixture<LhcWatcherComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LhcWatcherComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LhcWatcherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

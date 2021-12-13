import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LhcChangeDetectionComponent } from './lhc-change-detection.component';

describe('LhcChangeDetectionComponent', () => {
  let component: LhcChangeDetectionComponent;
  let fixture: ComponentFixture<LhcChangeDetectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LhcChangeDetectionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LhcChangeDetectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

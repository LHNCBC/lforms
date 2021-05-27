import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LhcItemTimeComponent } from './lhc-item-time.component';

describe('LhcItemTimeComponent', () => {
  let component: LhcItemTimeComponent;
  let fixture: ComponentFixture<LhcItemTimeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LhcItemTimeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LhcItemTimeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

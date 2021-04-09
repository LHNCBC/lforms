import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LhcItemDateComponent } from './lhc-item-date.component';

describe('LhcItemDateComponent', () => {
  let component: LhcItemDateComponent;
  let fixture: ComponentFixture<LhcItemDateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LhcItemDateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LhcItemDateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

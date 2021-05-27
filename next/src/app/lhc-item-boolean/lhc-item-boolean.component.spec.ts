import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LhcItemBooleanComponent } from './lhc-item-boolean.component';

describe('LhcItemBooleanComponent', () => {
  let component: LhcItemBooleanComponent;
  let fixture: ComponentFixture<LhcItemBooleanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LhcItemBooleanComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LhcItemBooleanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LhcItemQuantityComponent } from './lhc-item-quantity.component';

describe('LhcItemQuanityComponent', () => {
  let component: LhcItemQuantityComponent;
  let fixture: ComponentFixture<LhcItemQuantityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LhcItemQuantityComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LhcItemQuantityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LhcItemDisplayComponent } from './lhc-item-display.component';

describe('LhcItemDisplayComponent', () => {
  let component: LhcItemDisplayComponent;
  let fixture: ComponentFixture<LhcItemDisplayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LhcItemDisplayComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LhcItemDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

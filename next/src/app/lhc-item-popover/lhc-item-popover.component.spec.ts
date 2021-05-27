import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LhcItemPopoverComponent } from './lhc-item-popover.component';

describe('LhcItemPopoverComponent', () => {
  let component: LhcItemPopoverComponent;
  let fixture: ComponentFixture<LhcItemPopoverComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LhcItemPopoverComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LhcItemPopoverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

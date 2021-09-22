import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LhcPopoverComponent } from './lhc-popover.component';

describe('LhcPopoverComponent', () => {
  let component: LhcPopoverComponent;
  let fixture: ComponentFixture<LhcPopoverComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LhcPopoverComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LhcPopoverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

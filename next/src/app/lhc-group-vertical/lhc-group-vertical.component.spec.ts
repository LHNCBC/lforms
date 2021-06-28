import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LhcGroupVerticalComponent } from './lhc-group-vertical.component';

describe('LhcGroupVerticalComponent', () => {
  let component: LhcGroupVerticalComponent;
  let fixture: ComponentFixture<LhcGroupVerticalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LhcGroupVerticalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LhcGroupVerticalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

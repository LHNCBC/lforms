import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LhcInputComponent } from './lhc-input.component';

describe('LhcInputComponent', () => {
  let component: LhcInputComponent;
  let fixture: ComponentFixture<LhcInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LhcInputComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LhcInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

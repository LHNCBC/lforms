import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LhcValidateComponent } from './lhc-validate.component';

describe('LhcValidateComponent', () => {
  let component: LhcValidateComponent;
  let fixture: ComponentFixture<LhcValidateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LhcValidateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LhcValidateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

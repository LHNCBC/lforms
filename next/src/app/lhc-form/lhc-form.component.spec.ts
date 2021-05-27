import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LhcFormComponent } from './lhc-form.component';

describe('LhcFormComponent', () => {
  let component: LhcFormComponent;
  let fixture: ComponentFixture<LhcFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LhcFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LhcFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LhcItemQuestionComponent } from './lhc-item-question.component';

describe('LhcItemQuestionComponent', () => {
  let component: LhcItemQuestionComponent;
  let fixture: ComponentFixture<LhcItemQuestionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LhcItemQuestionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LhcItemQuestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

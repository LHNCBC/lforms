import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LhcItemSimpleTypeComponent } from './lhc-item-simple-type.component';

describe('LhcItemSimpleTypeComponent', () => {
  let component: LhcItemSimpleTypeComponent;
  let fixture: ComponentFixture<LhcItemSimpleTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LhcItemSimpleTypeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LhcItemSimpleTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

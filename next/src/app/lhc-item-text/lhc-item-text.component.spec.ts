import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LhcItemTextComponent } from './lhc-item-text.component';

describe('LhcItemTextComponent', () => {
  let component: LhcItemTextComponent;
  let fixture: ComponentFixture<LhcItemTextComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LhcItemTextComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LhcItemTextComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

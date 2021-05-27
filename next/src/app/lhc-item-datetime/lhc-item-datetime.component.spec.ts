import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LhcItemDatetimeComponent } from './lhc-item-datetime.component';

describe('LhcItemDatetimeComponent', () => {
  let component: LhcItemDatetimeComponent;
  let fixture: ComponentFixture<LhcItemDatetimeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LhcItemDatetimeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LhcItemDatetimeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

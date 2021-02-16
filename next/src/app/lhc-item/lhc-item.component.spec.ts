import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LhcItemComponent } from './lhc-item.component';

describe('LhcItemComponent', () => {
  let component: LhcItemComponent;
  let fixture: ComponentFixture<LhcItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LhcItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LhcItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

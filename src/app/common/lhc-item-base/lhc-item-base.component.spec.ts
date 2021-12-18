import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LhcItemBaseComponent } from './lhc-item-base.component';

describe('LhcItemBaseComponent', () => {
  let component: LhcItemBaseComponent;
  let fixture: ComponentFixture<LhcItemBaseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LhcItemBaseComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LhcItemBaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

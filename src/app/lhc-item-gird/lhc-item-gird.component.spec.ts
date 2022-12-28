import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LhcItemGirdComponent } from './lhc-item-gird.component';

describe('LhcItemGirdComponent', () => {
  let component: LhcItemGirdComponent;
  let fixture: ComponentFixture<LhcItemGirdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LhcItemGirdComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LhcItemGirdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

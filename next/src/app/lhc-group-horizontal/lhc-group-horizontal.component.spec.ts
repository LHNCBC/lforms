import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LhcGroupHorizontalComponent } from './lhc-group-horizontal.component';

describe('LhcGroupHorizontalComponent', () => {
  let component: LhcGroupHorizontalComponent;
  let fixture: ComponentFixture<LhcGroupHorizontalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LhcGroupHorizontalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LhcGroupHorizontalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

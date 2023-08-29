import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LhcGroupGridComponent } from './lhc-group-grid.component';

describe('LhcGroupGridComponent', () => {
  let component: LhcGroupGridComponent;
  let fixture: ComponentFixture<LhcGroupGridComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LhcGroupGridComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LhcGroupGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

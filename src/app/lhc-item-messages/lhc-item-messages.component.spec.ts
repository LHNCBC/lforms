import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LhcItemMessagesComponent } from './lhc-item-messages.component';

describe('LhcItemMessagesComponent', () => {
  let component: LhcItemMessagesComponent;
  let fixture: ComponentFixture<LhcItemMessagesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LhcItemMessagesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LhcItemMessagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

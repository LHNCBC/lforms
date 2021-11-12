import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LhcItemAttachmentComponent } from './lhc-item-attachment.component';

describe('LhcItemAttachmentComponent', () => {
  let component: LhcItemAttachmentComponent;
  let fixture: ComponentFixture<LhcItemAttachmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LhcItemAttachmentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LhcItemAttachmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

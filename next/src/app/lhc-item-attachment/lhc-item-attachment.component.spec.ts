import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LhcItemAttachmentComponent } from './lhc-item-attachment.component';
import { LhcDataService } from '../../lib/lhc-data.service';

describe('LhcItemAttachmentComponent', () => {
  let component: LhcItemAttachmentComponent;
  let fixture: ComponentFixture<LhcItemAttachmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LhcItemAttachmentComponent ],
      providers: [ LhcDataService ]
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

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LhcItemDateComponent } from './lhc-item-date.component';
import { LhcDataService} from '../../lib/lhc-data.service';
import {NzDatePickerModule} from "ng-zorro-antd/date-picker";
import { FormsModule } from '@angular/forms';

describe('LhcItemDateComponent', () => {
  let component: LhcItemDateComponent;
  let fixture: ComponentFixture<LhcItemDateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LhcItemDateComponent ],
      imports: [NzDatePickerModule, FormsModule],
      providers: [LhcDataService]
    })
    .compileComponents()

  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LhcItemDateComponent);
    component = fixture.componentInstance;
    component.item = {
      _elementId: 1,
      question: 'question'
    };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

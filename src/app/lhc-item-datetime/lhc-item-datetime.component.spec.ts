import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LhcItemDatetimeComponent } from './lhc-item-datetime.component';
import { LhcDataService} from '../../lib/lhc-data.service';
import {NzDatePickerModule} from "ng-zorro-antd/date-picker";
import {CommonUtilsService} from "../../lib/common-utils.service";
import { registerLocaleData } from '@angular/common';
import zh from '@angular/common/locales/zh';
import { FormsModule } from '@angular/forms';

registerLocaleData(zh);

describe('LhcItemDatetimeComponent', () => {
  let component: LhcItemDatetimeComponent;
  let fixture: ComponentFixture<LhcItemDatetimeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LhcItemDatetimeComponent ],
      imports: [NzDatePickerModule, FormsModule],
      providers: [LhcDataService, CommonUtilsService]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LhcItemDatetimeComponent);
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

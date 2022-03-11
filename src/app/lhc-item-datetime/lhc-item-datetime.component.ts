import {AfterViewInit, Component, Input, OnInit, ViewChild} from '@angular/core';
import {LhcDataService} from '../../lib/lhc-data.service';
import {NzDatePickerComponent} from "ng-zorro-antd/date-picker";
import {CommonUtilsService} from "../../lib/common-utils.service";

@Component({
  selector: 'lhc-item-datetime',
  templateUrl: './lhc-item-datetime.component.html',
  styleUrls: ['./lhc-item-datetime.component.css'],
})
export class LhcItemDatetimeComponent implements AfterViewInit {
  @Input() item: any;

  @ViewChild('nzDatePickerComponent')
  nzDatePickerComponent: NzDatePickerComponent;

  constructor(
    public lhcDataService: LhcDataService,
    private commonUtilsService: CommonUtilsService
  ) {}

  
  ngAfterViewInit() {
    // Set aria-label attribute of the actual <input> element.
    this.nzDatePickerComponent.pickerInput.nativeElement.setAttribute(
      'aria-label',
      this.commonUtilsService.getAriaLabel(this.item)
    );
  }


  /**
   * Ok button click event handler
   * @param result the selected date
   */
  onOk(result: Date | Date[] | null): void {
    
  }


  /**
   * Calendar change event handler
   * @param result the selected date
   */
  onCalendarChange(result: Array<Date | null>): void {
    
  }
}

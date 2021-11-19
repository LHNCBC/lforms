import {AfterViewInit, Component, Input, OnInit, ViewChild} from '@angular/core';
import {LhcDataService} from '../../lib/lhc-data.service';
import {NzDatePickerComponent} from "ng-zorro-antd/date-picker";

@Component({
  selector: 'lhc-item-datetime',
  templateUrl: './lhc-item-datetime.component.html',
  styleUrls: ['./lhc-item-datetime.component.css']
})
export class LhcItemDatetimeComponent implements OnInit, AfterViewInit {

  @Input() item: any;

  @ViewChild('nzDatePickerComponent') nzDatePickerComponent: NzDatePickerComponent;

  constructor(public lhcDataService: LhcDataService) { }

  ngOnInit(): void {
  }

  onChange(result: Date): void {
    //console.log('Selected DateTime: ', result);
  }

  ngAfterViewInit() {
    // Set id attribute of the actual <input> element, so that it is associated with the
    // label in corresponding question text component and the label will be announced.
    this.nzDatePickerComponent.picker.pickerInput.nativeElement.id = this.item._elementId;
  }

  onOk(result: Date | Date[] | null): void {
    //console.log('onOk', result);
  }

  onCalendarChange(result: Array<Date | null>): void {
    //console.log('onCalendarChange', result);
  }

}

import {AfterViewInit, Component, Input, OnInit, ViewChild} from '@angular/core';
import { LhcDataService} from '../../lib/lhc-data.service';
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
    this.nzDatePickerComponent.picker.pickerInput.nativeElement.id = this.item._elementId;
  }

  onOk(result: Date | Date[] | null): void {
    //console.log('onOk', result);
  }

  onCalendarChange(result: Array<Date | null>): void {
    //console.log('onCalendarChange', result);
  }

}

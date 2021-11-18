import {Component, Input, OnInit, AfterViewInit, ViewChild} from '@angular/core';
import {LhcDataService} from '../../lib/lhc-data.service';
import {NzDatePickerComponent} from "ng-zorro-antd/date-picker";

@Component({
  selector: 'lhc-item-date',
  templateUrl: './lhc-item-date.component.html',
  styleUrls: ['./lhc-item-date.component.css']
})
export class LhcItemDateComponent implements OnInit, AfterViewInit {

  @Input() item: any;

  @ViewChild('nzDatePickerComponent') nzDatePickerComponent: NzDatePickerComponent;

  constructor(public lhcDataService: LhcDataService) { }

  ngOnInit(): void {
  }

  onChange(result: Date): void {
    //console.log('Selected Date: ', result);
  }

  ngAfterViewInit() {
    // Set id attribute of the actual <input> element, so that it is associated with the
    // label in corresponding question text component and the label will be announced.
    // It should have just worked by passing [nzId] into <nz-date-picker>, but the library
    // (which we have no control of) creates another wrapper element with same id which
    // messes with the aria label association.
    this.nzDatePickerComponent.picker.pickerInput.nativeElement.id = this.item._elementId;
  }
}

import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'lhc-item-datetime',
  templateUrl: './lhc-item-datetime.component.html',
  styleUrls: ['./lhc-item-datetime.component.css']
})
export class LhcItemDatetimeComponent implements OnInit {
  
  @Input() item: any;

  constructor() { }

  ngOnInit(): void {
  }

  onChange(result: Date): void {
    //console.log('Selected DateTime: ', result);
  }

  onOk(result: Date | Date[] | null): void {
    //console.log('onOk', result);
  }

  onCalendarChange(result: Array<Date | null>): void {
    //console.log('onCalendarChange', result);
  }
  
}

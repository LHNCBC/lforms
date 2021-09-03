import { Component, Input, OnInit, OnChanges } from '@angular/core';
import { LhcDataService} from '../../lib/lhc-data.service';

@Component({
  selector: 'lhc-item-time',
  templateUrl: './lhc-item-time.component.html',
  styleUrls: ['./lhc-item-time.component.css']
})
export class LhcItemTimeComponent implements OnInit, OnChanges {

  @Input() item: any;
  time: Date | null = null;

  constructor(public lhcDataService: LhcDataService) { }

  ngOnInit(): void {
    console.log("*lhc-item-time, ngOnInit")
    console.log(this.item)
  }

  ngOnChanges(): void {
    console.log("*lhc-item-time, ngOnChange")
    console.log(this.item)

    if (this.item.value) {
      let tempDate:any = new Date('1970-01-01 ' + this.item.value)
      if (!isNaN(tempDate)) {
        this.time = tempDate;
      }
    }
  }


  onChange(result: Date): void {

    console.log('Selected Time: ', result);
    console.log(this.time)
    if (this.time) {
      let strTime = this.time.toTimeString();
      if (strTime) {
        this.item.value = strTime.slice(0,8); // "hh:mm:ss"
      }
    }

  }

}

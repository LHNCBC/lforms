import {Component, Input, OnInit, OnChanges, ElementRef} from '@angular/core';
import { LhcDataService} from '../../lib/lhc-data.service';
import {CommonUtilsService} from "../../lib/common-utils.service";

@Component({
  selector: 'lhc-item-time',
  templateUrl: './lhc-item-time.component.html',
  styleUrls: ['./lhc-item-time.component.css']
})
export class LhcItemTimeComponent implements OnInit, OnChanges {

  @Input() item: any;
  time: Date | null = null;

  constructor(public lhcDataService: LhcDataService,
              private elRef:ElementRef,
              private commonUtilsService: CommonUtilsService) { }

  ngOnInit(): void {
    // console.log("*lhc-item-time, ngOnInit")
    // console.log(this.item)
  }

  ngOnChanges(): void {
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

  ngAfterViewInit() {
    // Set aria-label attribute of the actual <input> element.
    const input = this.elRef.nativeElement.querySelector('input');
    if (input) {
      input.setAttribute('aria-label', this.commonUtilsService.getAriaLabel(this.item));
    }
  }

}

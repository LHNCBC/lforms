import {Component, Input, OnInit, OnChanges, ElementRef, AfterViewInit} from '@angular/core';
import { LhcDataService} from '../../lib/lhc-data.service';
import {CommonUtilsService} from "../../lib/common-utils.service";
import language from "../../../language-config.json";

@Component({
    selector: 'lhc-item-time',
    templateUrl: './lhc-item-time.component.html',
    styleUrls: ['./lhc-item-time.component.css'],
    standalone: false
})
export class LhcItemTimeComponent implements OnChanges, AfterViewInit {

  @Input() item: any;
  time: Date | null = null;

  constructor(public lhcDataService: LhcDataService,
              private elRef:ElementRef,
              private commonUtilsService: CommonUtilsService) { }


  ngOnChanges(): void {
    if (this.item.value) {
      const tempDate:any = new Date('1970-01-01 ' + this.item.value)
      if (!isNaN(tempDate)) {
        this.time = tempDate;
      }
    }
  }

  /**
   * model change event handler
   * @param value the new date/time
   * Note: It is triggered twice. One when the "OK" button is clicked, the other when the input field loses focus.
   */
  onModelChange(value: Date): void {
    const prevValue = this.item.value;
    if (value) {
      const strTime = value.toTimeString();
      if (strTime) {
        this.item.value = strTime.slice(0,8); // "hh:mm:ss"
        this.lhcDataService.onItemValueChange(this.item, this.item.value, prevValue);
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

    protected readonly language = language;
}

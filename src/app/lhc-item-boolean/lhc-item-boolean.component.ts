import {AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {LhcDataService} from '../../lib/lhc-data.service';
import {NzSwitchComponent} from "ng-zorro-antd/switch";
import { LiveAnnouncer } from '@angular/cdk/a11y';
import {CommonUtilsService} from "../../lib/common-utils.service";

@Component({
  selector: 'lhc-item-boolean',
  templateUrl: './lhc-item-boolean.component.html',
  styleUrls: ['./lhc-item-boolean.component.css']
})
export class LhcItemBooleanComponent implements AfterViewInit {
  @Input() item: any;

  @ViewChild('nzSwitchComponent') nzSwitchComponent: NzSwitchComponent;

  constructor(public lhcDataService: LhcDataService,
              private elRef:ElementRef,
              private liveAnnouncer: LiveAnnouncer,
              private commonUtilsService: CommonUtilsService) { }


  ngAfterViewInit() {
    // Set aria-label attribute of the actual <button> element.
    const button = this.elRef.nativeElement.querySelector('button[nz-wave]');
    if (button) {
      button.setAttribute('aria-label', this.commonUtilsService.getAriaLabel(this.item));
      button.addEventListener('focus', () => {
        const currentValue = this.item.value || false;
        this.liveAnnouncer.announce(currentValue.toString());
      });
    }
  }


  /**
   * onModelChange handler
   * @param value the new value in model
   */
  onModelChange(value) {
    this.liveAnnouncer.announce(value);
  }

}

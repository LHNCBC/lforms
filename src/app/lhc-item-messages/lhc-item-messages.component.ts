import { Component, OnInit, Input, ViewChild, ElementRef} from '@angular/core';
import { LhcDataService} from '../../lib/lhc-data.service';

@Component({
    selector: 'lhc-item-messages',
    templateUrl: './lhc-item-messages.component.html',
    styleUrls: ['./lhc-item-messages.component.css'],
    standalone: false
})
export class LhcItemMessagesComponent implements OnInit {

  @Input() item;
//  JSON;  // for debugging

  constructor(public lhcDataService: LhcDataService) {
//    this.JSON = JSON; // for debugging
  }


  ngOnInit(): void {
  }

  /**
   *  Returns a boolean that controls whether or not error messages are shown.
   */
  public showErrors() {
    return this.lhcDataService.getLhcFormData()._showErrors;
  }

  /**
   *  Returns a boolean that controls whether or not warning messages are shown.
   */
  public showWarnings() {
    return this.lhcDataService.getLhcFormData()._showWarnings;
  }

  /**
   *  Returns a boolean that controls whether or not info messages are shown.
   */
  public showInfo() {
    return this.lhcDataService.getLhcFormData()._showInfo;
  }

}

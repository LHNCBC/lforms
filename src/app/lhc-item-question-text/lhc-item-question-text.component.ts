import { Component, OnInit, Input } from '@angular/core';
import { LhcDataService} from '../../lib/lhc-data.service';

@Component({
  selector: 'lhc-item-question-text',
  templateUrl: './lhc-item-question-text.component.html',
  styleUrls: ['./lhc-item-question-text.component.css'],
})
export class LhcItemQuestionTextComponent implements OnInit {
  @Input() item: any;
  JSON;  // for debugging

  constructor(public lhcDataService: LhcDataService) {
    this.JSON = JSON; // for debugging
  }

  ngOnInit(): void {}

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

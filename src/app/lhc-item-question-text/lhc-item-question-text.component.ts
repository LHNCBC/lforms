import { Component, OnInit, Input } from '@angular/core';
import { LhcDataService} from '../../lib/lhc-data.service';

@Component({
    selector: 'lhc-item-question-text',
    templateUrl: './lhc-item-question-text.component.html',
    styleUrls: ['./lhc-item-question-text.component.css'],
    standalone: false
})
export class LhcItemQuestionTextComponent implements OnInit {
  @Input() item: any;

  constructor(public lhcDataService: LhcDataService) {}

  ngOnInit(): void {
    // For backward compatability, move item.copyrightNotice to item.legal when found.
    if (this.item && this.item.copyrightNotice && !this.item.legal) {
      this.item.legal = this.item.copyrightNotice;
    }
  }

}

import { Component, OnInit, Input } from '@angular/core';
import { LhcDataService} from '../../lib/lhc-data.service';
//import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
@Component({
  selector: 'lhc-item-question-text',
  templateUrl: './lhc-item-question-text.component.html',
  styleUrls: ['./lhc-item-question-text.component.css']
})
export class LhcItemQuestionTextComponent implements OnInit {

  @Input() item: any;

  constructor(
    public lhcDataService: LhcDataService,
  //  private sanitizer: DomSanitizer
  ) { 
  }

  ngOnInit(): void {
  }

  // Note: if this is done here, the function is called endlessly. Moving it to a pipe works fine, with just one call.
  // trustedHtml(value: string): any { 
  //   return this.sanitizer.bypassSecurityTrustHtml(value);
  // }

}

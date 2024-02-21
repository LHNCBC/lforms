import { Component, OnInit, Input } from '@angular/core';
import { LhcDataService} from '../../lib/lhc-data.service';

@Component({
  selector: 'lhc-button-popover',
  templateUrl: './lhc-button-popover.component.html',
  styleUrls: ['./lhc-button-popover.component.css']
})
export class LhcButtonPopoverComponent implements OnInit {

  @Input() item: any;
  @Input() popoverType: string;
  @Input() formLevel: boolean = false;
  @Input() buttonLabel: string = null;
  @Input() append: boolean = false;
  popoverIdentifier: string = null;

  constructor(private lhcDataService: LhcDataService) { 
  }


  /**
   * Set a popover identifier
   */
  ngOnInit(): void {
    //Get a unique identifer for the popover
    if (this.formLevel && this.item) {
      this.popoverIdentifier = (this.item.code || this.item.name || this.item.shortName).replaceAll(/[\/\s]/g,'-')
    }
  }

  /**
   * Send the popover content to screen reader log when the popover button is clicked
   */
  onShowingPopver(): void {
    let title = this.popoverType === "copyright-string" ? "Copyright notice:" : "Instruction:"
    let content, contentId;

    if (this.popoverType === "copyright-string") {
      title = "Copyright notice:"
      contentId = "copyright-content-" + (this.formLevel ? this.item.code : this.item._elementId);
    }
    else {
      title = "Instruction:"
      contentId = "help-content-" + (this.formLevel ? this.item.code : this.item._elementId);
    }

    setTimeout(() => {
      // get the displayed text instead of possible HTML content
      let content = document.getElementById(contentId).textContent;
      this.lhcDataService.sendMsgToScreenReader(`${title} ${content}`)
    }, 10)
  }
}

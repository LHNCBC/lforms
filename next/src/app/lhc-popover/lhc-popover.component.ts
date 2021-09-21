import { Component, OnInit, Input } from '@angular/core';
import { LhcDataService} from '../../lib/lhc-data.service';

@Component({
  selector: 'lhc-popover',
  templateUrl: './lhc-popover.component.html',
  styleUrls: ['./lhc-popover.component.css']
})
export class LhcPopoverComponent implements OnInit {

  @Input() item: any;
  @Input() popoverType: string;
  @Input() formLevel: boolean = false;

  constructor(private lhcDataService: LhcDataService) { }

  ngOnInit(): void {}

  /**
   * Send the popover content to screen reader log when the popover button is clicked
   */
  onShowingPopver(): void {
    let title = this.popoverType === "copyright-string" ? "Copyright notice:" : "Instruction:"
    let content 

    if (this.popoverType === "copyright-string") {
      title = "Copyright notice:"
      content = this.item.copyrightNotice;
    }
    else {
      title = "Instruction:"
      content = this.item.codingInstructions;
    }
    this.lhcDataService.sendMsgToScreenReader(`${title} ${content}`)
  }
}

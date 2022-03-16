import { Component, Input, OnInit } from '@angular/core';
import { LhcDataService} from '../../lib/lhc-data.service';
import { WindowService} from '../../lib/window.service';

@Component({
  selector: 'lhc-group-vertical',
  templateUrl: './lhc-group-vertical.component.html',
  styleUrls: ['./lhc-group-vertical.component.css']
})
export class LhcGroupVerticalComponent {

  @Input() item: any;

  viewMode = "";

  constructor(
    private winService: WindowService,
    public lhcDataService: LhcDataService,
  ) {
    winService.windowWidth.subscribe(updatedWidth => {
      this.viewMode = winService.getViewMode();
    });
  }

  /**
   * get CSS class of view mode for an item
   * @param item an item in a form
   * @returns
   */
  getItemViewModeClass(item) {
    return this.lhcDataService.getItemViewModeClass(item, this.viewMode)
  }

  /**
   * get CSS class list for an item
   * @param item an item in a form
   */
  getItemClassList(item) {
    const classList = [
      'lhc-item',
      this.getItemViewModeClass(item),
      this.lhcDataService.getTreeLineClass(),
      this.lhcDataService.getIndentationClass(),
      this.lhcDataService.getSiblingStatus(item),
      this.lhcDataService.getRowClass(item),
      this.lhcDataService.getActiveRowClass(item)
    ];
    return classList.join(' ');
  }

}

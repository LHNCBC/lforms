import { Component, OnInit, Input, ViewEncapsulation, ViewChild, ElementRef } from '@angular/core';
import { LhcDataService} from '../../lib/lhc-data.service';
import { WindowService} from '../../lib/window.service';

@Component({
  selector: 'lhc-item',
  templateUrl: './lhc-item.component.html',
  styleUrls: ['./lhc-item.component.css'],
})
export class LhcItemComponent {

  @Input() item;

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

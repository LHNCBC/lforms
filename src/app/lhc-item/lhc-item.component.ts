import { Component, OnInit, Input, ViewEncapsulation, ViewChild, ElementRef } from '@angular/core';
import { LhcDataService} from '../../lib/lhc-data.service';
import { WindowService} from '../../lib/window.service';
import language from '../../../language-config.json';

@Component({
    selector: 'lhc-item',
    templateUrl: './lhc-item.component.html',
    styleUrls: ['./lhc-item.component.css'],
    standalone: false
})
export class LhcItemComponent {

  @Input() item;

  viewMode = "";
  language = language;

  constructor(
    private winService: WindowService,
    public lhcDataService: LhcDataService,
  ) {
    winService.windowWidth.subscribe(updatedWidth => {
      this.viewMode = winService.getViewMode();
    });
  }

}

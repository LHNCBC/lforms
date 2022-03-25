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

}

import { Component, Input, OnInit } from '@angular/core';
import { LhcDataService} from '../../lib/lhc-data.service';
import { WindowService} from '../../lib/window.service';
import language from "../../../language-config.json";

@Component({
    selector: 'lhc-group-vertical',
    templateUrl: './lhc-group-vertical.component.html',
    styleUrls: ['./lhc-group-vertical.component.css'],
    standalone: false
})
export class LhcGroupVerticalComponent {

  @Input() item: any;
  @Input() hideGrouptTitle = false;
  @Input() isTabContent = false;

  viewMode = "";

  /**
   * Track the shared view mode when form width changes and expose form data to the template.
   * @param winService Shared form-width and view-mode service.
   * @param lhcDataService Form data and item rendering helpers.
   */
  constructor(
    private winService: WindowService,
    public lhcDataService: LhcDataService,
  ) {
    winService.windowWidth.subscribe(updatedWidth => {
      this.viewMode = winService.getViewMode();
    });
  }

  protected readonly language = language;
}

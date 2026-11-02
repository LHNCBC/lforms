import { Component, OnInit, Input, ViewChild, ElementRef} from '@angular/core';
import { WindowService } from '../../lib/window.service';
import { LhcDataService} from '../../lib/lhc-data.service';

@Component({
    selector: 'lhc-item-question',
    templateUrl: './lhc-item-question.component.html',
    styleUrls: ['./lhc-item-question.component.css'],
    standalone: false
})
export class LhcItemQuestionComponent implements OnInit {

  @Input() item;
  @Input() options;
  @ViewChild("deInput") deInputElement: ElementRef<any>; 

  eleStyle: object = null;
   
  constructor(
    private winService: WindowService,
    public lhcDataService: LhcDataService,
  ) {}
  

  /**
   * Subscribe to form-width changes. Large-view answers use an inherited tab
   * width override or half the form width; other view modes clear the inline width.
   */
  ngOnInit(): void {
    this.winService.windowWidth.subscribe(updatedWidth => {
      const viewMode = this.winService.getViewMode();
      const viewModeClass = this.lhcDataService.getItemViewModeClass(this.item, viewMode)
      this.eleStyle = viewModeClass === "lhc-item-view-lg" ? {
        "width": `var(--lhc-tab-content-answer-width, ${updatedWidth / 2}px)`
      } : null;
    });  
  }
}

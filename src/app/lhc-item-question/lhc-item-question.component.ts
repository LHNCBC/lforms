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
   * Set up the window width observer when the component is initialized/reinitialized
   */
  ngOnInit(): void {
    this.winService.windowWidth.subscribe(updatedWidth => {
      let viewMode = this.winService.getViewMode();
      let viewModeClass = this.lhcDataService.getItemViewModeClass(this.item, viewMode)
      this.eleStyle = viewModeClass === "lhc-item-view-lg" ? {"width": updatedWidth/2 + "px"} : null;
    });  
  }
}


import { Component, DoCheck, OnInit, Input, ViewChild, ElementRef} from '@angular/core';
import { WindowService } from '../../lib/window.service';
import { LhcDataService} from '../../lib/lhc-data.service';
import {InternalUtil} from '../../lib/lforms/internal-utils.js';

@Component({
    selector: 'lhc-item-question',
    templateUrl: './lhc-item-question.component.html',
    styleUrls: ['./lhc-item-question.component.css'],
    standalone: false
})
export class LhcItemQuestionComponent implements OnInit, DoCheck {

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
      const viewMode = this.winService.getViewMode();
      const viewModeClass = this.lhcDataService.getItemViewModeClass(this.item, viewMode)
      this.eleStyle = viewModeClass === "lhc-item-view-lg" ? {"width": updatedWidth/2 + "px"} : null;
    });  
  }


  /**
   * Keep the stored value aligned with the unchecked state rendered by a
   * two-state checkbox, including after direct programmatic item updates.
   */
  ngDoCheck(): void {
    const item = this.item;
    const prevValue = item?.value;
    if (InternalUtil.normalizeTwoStateCheckboxValue(item)) {
      // Safety net for direct item.value writes; notify dependents outside this change-detection pass.
      setTimeout(() => this.lhcDataService.onItemValueChange(item, item.value, prevValue));
    }
  }
}

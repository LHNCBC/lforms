import { Component, OnInit, OnChanges, Input, ViewEncapsulation} from '@angular/core';

/**
 * A hidden {display: none} that contains all the necessary item.value and 
 * other attributes in lhcFormData to catch the change event on them.
 */
@Component({
  selector: 'lhc-change-detection',
  templateUrl: './lhc-change-detection.component.html',
  styleUrls: ['./lhc-change-detection.component.css']
  //encapsulation: ViewEncapsulation.ShadowDom
})
export class LhcChangeDetectionComponent{

  @Input() lhcFormData: any;

}

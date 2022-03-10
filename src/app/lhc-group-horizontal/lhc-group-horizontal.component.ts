import { Component, OnInit, OnChanges, Input } from '@angular/core';
import { LhcDataService} from '../../lib/lhc-data.service';

@Component({
  selector: 'lhc-group-horizontal',
  templateUrl: './lhc-group-horizontal.component.html',
  styleUrls: ['./lhc-group-horizontal.component.css']
})
export class LhcGroupHorizontalComponent {

  @Input() item;
  @Input() formLevel: boolean = false;
  
  constructor(public lhcDataService: LhcDataService) {
  }


}

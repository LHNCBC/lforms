import { Component, Input } from '@angular/core';
import { LhcDataService} from '../../lib/lhc-data.service';

@Component({
  selector: 'lhc-item-gird',
  templateUrl: './lhc-item-gird.component.html',
  styleUrls: ['./lhc-item-gird.component.css']
})
export class LhcItemGirdComponent  {


  @Input() item;
  @Input() formLevel: boolean = false;
  
  constructor(public lhcDataService: LhcDataService) {
  }

}

import { Component, Input, OnInit } from '@angular/core';
import { LhcDataService} from '../../lib/lhc-data.service';

@Component({
  selector: 'lhc-item-text',
  templateUrl: './lhc-item-text.component.html',
  styleUrls: ['./lhc-item-text.component.css']
})
export class LhcItemTextComponent {
  @Input() item: any;
  
  constructor(public lhcDataService: LhcDataService) { }

}

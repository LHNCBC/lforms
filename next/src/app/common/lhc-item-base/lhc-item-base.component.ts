import { Component, OnInit, Input } from '@angular/core';
import { LhcDataService} from '../../../lib/lhc-data.service';

@Component({
  selector: 'lhc-item-base',
  templateUrl: './lhc-item-base.component.html',
  styleUrls: ['./lhc-item-base.component.css']
})
export class LhcItemBaseComponent implements OnInit {

  @Input() item: any;

  /**
   * Component class constructor
   */
  constructor(
    // public lhcDataService: LhcDataService
    ) {
    
  }

  /**
   * Initialize the component
   */
  ngOnInit(): void {
  }

}

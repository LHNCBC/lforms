import { Component, Input, OnInit } from '@angular/core';
import { LhcDataService} from '../../lib/lhc-data.service';

@Component({
  selector: 'lhc-item-group',
  templateUrl: './lhc-item-group.component.html',
  styleUrls: ['./lhc-item-group.component.css']
})
export class LhcItemGroupComponent implements OnInit {

  @Input() item: any;

  constructor(public lhcDataService: LhcDataService) {
  }

  ngOnInit(): void {
  }

}

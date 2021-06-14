import { Component, OnInit, Input, ViewEncapsulation } from '@angular/core';
import { LhcItemBaseComponent} from "../common/lhc-item-base/lhc-item-base.component";
import { LhcDataService} from '../../lib/lhc-data.service';

@Component({
  selector: 'lhc-item',
  templateUrl: './lhc-item.component.html',
  styleUrls: ['./lhc-item.component.css']
})
export class LhcItemComponent extends LhcItemBaseComponent implements OnInit {

  @Input() item;

  constructor(
    public lhcDataService: LhcDataService
  ) {
    super()
  }

  ngOnInit(): void {
  }

}

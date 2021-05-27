import { Component, Input, OnInit } from '@angular/core';
import { LhcItemBaseComponent} from "../common/lhc-item-base/lhc-item-base.component";

@Component({
  selector: 'lhc-item-group',
  templateUrl: './lhc-item-group.component.html',
  styleUrls: ['./lhc-item-group.component.css']
})
export class LhcItemGroupComponent extends LhcItemBaseComponent implements OnInit {

  @Input() item: any;

  constructor() {
    super();
   }

  ngOnInit(): void {
  }

}

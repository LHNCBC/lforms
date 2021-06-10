import { Component, Input, OnInit } from '@angular/core';
import { LhcDataService} from '../../lib/lhc-data.service';

@Component({
  selector: 'lhc-item-boolean',
  templateUrl: './lhc-item-boolean.component.html',
  styleUrls: ['./lhc-item-boolean.component.css']
})
export class LhcItemBooleanComponent implements OnInit {
  @Input() item: any;

  status: boolean = false;
  constructor(public lhcDataService: LhcDataService) { }

  ngOnInit(): void {
  }

  ngOnDestroy() : void {
    console.log('lhc-item-boolean, ngOnDestroy')
  }

}

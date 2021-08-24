import { Component, OnInit, OnChanges, Input } from '@angular/core';
import { LhcDataService} from '../../lib/lhc-data.service';

@Component({
  selector: 'lhc-group-horizontal',
  templateUrl: './lhc-group-horizontal.component.html',
  styleUrls: ['./lhc-group-horizontal.component.css']
})
export class LhcGroupHorizontalComponent implements OnInit, OnChanges {

  @Input() item;

  // horizontalTableInfo: object = null;

  constructor(public lhcDataService: LhcDataService) {
  }

  ngOnInit(): void {
    // console.log("lhc-group-horizontal, ngOnInit")
    // console.log(this.horizontalTableInfo)
    // console.log(this.lhcDataService.getHorizontalTableInfo())
    // console.log(this.item)
  }

  ngOnChanges(): void {
    // console.log("lhc-group-horizontal, ngOnChange")
    // console.log(this.lhcDataService.getHorizontalTableInfo())
    // console.log(this.item)
  }

}

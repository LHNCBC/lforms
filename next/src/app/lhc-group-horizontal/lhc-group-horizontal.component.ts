import { Component, OnInit, Input } from '@angular/core';
import { LhcDataService} from '../../lib/lhc-data.service';

@Component({
  selector: 'lhc-group-horizontal',
  templateUrl: './lhc-group-horizontal.component.html',
  styleUrls: ['./lhc-group-horizontal.component.css']
})
export class LhcGroupHorizontalComponent implements OnInit {

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

  ngOnChange(): void {
    // console.log("lhc-group-horizontal, ngOnChange")
    // console.log(this.lhcDataService.getHorizontalTableInfo())
    // console.log(this.item)
  }

}

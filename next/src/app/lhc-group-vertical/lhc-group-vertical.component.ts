import { Component, Input, OnInit } from '@angular/core';
import { LhcDataService} from '../../lib/lhc-data.service';

@Component({
  selector: 'lhc-group-vertical',
  templateUrl: './lhc-group-vertical.component.html',
  styleUrls: ['./lhc-group-vertical.component.css']
})
export class LhcGroupVerticalComponent implements OnInit {

  @Input() item: any;

  constructor(public lhcDataService: LhcDataService) {}

  ngOnInit(): void {
    console.log("lhc-group-vertical")
    console.log(this.item)
  }

}

import { Component, Input, OnInit } from '@angular/core';
import { LhcDataService} from '../../lib/lhc-data.service';

@Component({
  selector: 'lhc-item-time',
  templateUrl: './lhc-item-time.component.html',
  styleUrls: ['./lhc-item-time.component.css']
})
export class LhcItemTimeComponent implements OnInit {

  @Input() item: any;
  time: Date | null = null;

  constructor(public lhcDataService: LhcDataService) { }

  ngOnInit(): void {
  }

  onChange(result: Date): void {
    //console.log('Selected Time: ', result);
  }

}

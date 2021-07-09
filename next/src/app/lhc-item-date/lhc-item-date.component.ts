import { Component, Input, OnInit } from '@angular/core';
import { LhcDataService} from '../../lib/lhc-data.service';

@Component({
  selector: 'lhc-item-date',
  templateUrl: './lhc-item-date.component.html',
  styleUrls: ['./lhc-item-date.component.css']
})
export class LhcItemDateComponent implements OnInit {

  @Input() item: any;

  constructor(public lhcDataService: LhcDataService) { }

  ngOnInit(): void {
  }

  onChange(result: Date): void {
    //console.log('Selected Date: ', result);
  }
} 

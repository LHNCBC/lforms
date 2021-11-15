import { Component, OnInit, Input, ViewEncapsulation, ViewChild, ElementRef } from '@angular/core';
import { LhcDataService} from '../../lib/lhc-data.service';

@Component({
  selector: 'lhc-item',
  templateUrl: './lhc-item.component.html',
  styleUrls: ['./lhc-item.component.css'],
})
export class LhcItemComponent implements OnInit {

  @Input() item;

  //@ViewChild("deInput") deInput: ElementRef<any>; 

  constructor(
    public lhcDataService: LhcDataService
  ) {
  }

  ngOnInit(): void {
  }

}

import { Component, OnInit, Input, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'lhc-item',
  templateUrl: './lhc-item.component.html',
  styleUrls: ['./lhc-item.component.css']
})
export class LhcItemComponent implements OnInit {

  @Input() item;

  constructor() { }

  ngOnInit(): void {
  }

}

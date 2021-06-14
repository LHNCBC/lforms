import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'lhc-item-boolean',
  templateUrl: './lhc-item-boolean.component.html',
  styleUrls: ['./lhc-item-boolean.component.css']
})
export class LhcItemBooleanComponent implements OnInit {
  @Input() item: any;

  constructor() { }

  ngOnInit(): void {
  }

  ngOnDestroy() : void {
    console.log('lhc-item-boolean, ngOnDestroy')
  }

}

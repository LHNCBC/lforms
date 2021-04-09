import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'lhc-item-text',
  templateUrl: './lhc-item-text.component.html',
  styleUrls: ['./lhc-item-text.component.css']
})
export class LhcItemTextComponent implements OnInit {
  @Input() item: any;
  constructor() { }

  ngOnInit(): void {
  }

}

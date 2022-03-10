import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'lhc-item-display',
  templateUrl: './lhc-item-display.component.html',
  styleUrls: ['./lhc-item-display.component.css']
})
export class LhcItemDisplayComponent{

  @Input() item;

}

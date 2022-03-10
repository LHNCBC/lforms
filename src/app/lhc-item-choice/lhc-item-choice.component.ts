import { Component, Input, OnInit, OnChanges } from '@angular/core';

@Component({
  selector: 'lhc-item-choice',
  templateUrl: './lhc-item-choice.component.html',
  styleUrls: ['./lhc-item-choice.component.css']
})
export class LhcItemChoiceComponent {

  @Input() item;

}

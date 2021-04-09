import { Component, OnInit, Input } from '@angular/core';
import { LhcItemBaseComponent} from "../common/lhc-item-base/lhc-item-base.component";
@Component({
  selector: 'lhc-item-question-text',
  templateUrl: './lhc-item-question-text.component.html',
  styleUrls: ['./lhc-item-question-text.component.css']
})
export class LhcItemQuestionTextComponent extends LhcItemBaseComponent implements OnInit {

  @Input() item: any;

  constructor() { 
    super();
  }

  ngOnInit(): void {
  }

}

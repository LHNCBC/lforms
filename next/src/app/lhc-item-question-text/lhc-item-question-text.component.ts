import { Component, OnInit, Input } from '@angular/core';
import { LhcItemBaseComponent} from "../common/lhc-item-base/lhc-item-base.component";
import { LhcDataService} from '../../lib/lhc-data.service';

@Component({
  selector: 'lhc-item-question-text',
  templateUrl: './lhc-item-question-text.component.html',
  styleUrls: ['./lhc-item-question-text.component.css']
})
export class LhcItemQuestionTextComponent extends LhcItemBaseComponent implements OnInit {

  @Input() item: any;

  constructor(
    public lhcDataService: LhcDataService
  ) { 
    super();
  }

  ngOnInit(): void {
  }

}

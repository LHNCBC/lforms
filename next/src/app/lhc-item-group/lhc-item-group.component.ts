import { Component, Input, OnInit } from '@angular/core';
import { LhcItemBaseComponent} from "../common/lhc-item-base/lhc-item-base.component";
import { LhcDataService} from '../../lib/lhc-data.service';

@Component({
  selector: 'lhc-item-group',
  templateUrl: './lhc-item-group.component.html',
  styleUrls: ['./lhc-item-group.component.css']
})
export class LhcItemGroupComponent extends LhcItemBaseComponent implements OnInit {

  @Input() item: any;

  constructor(public lhcDataService: LhcDataService) {
    super();
   }

  ngOnInit(): void {
  }

  test(): void {
    console.log("ground, in test")
    console.log(this.item)
    this.item.items.push(
      {
        answerCardinality: {min: "0", max: "1"},
        dataType: "TX",
        linkId: "/horizontalTable/colBttt",
        question: "A TX - newly added",
        questionCardinality: {min: "1", max: "1"},
        questionCode: "colBttt",
        _answerRequired: false,
        _displayLevel: 2,
        _elementId: "/horizontalTable/colBttt/1/1",
        _firstSibling: false,
        _id: 1,
        _idPath: "/1/1",
        _inHorizontalTable: true,
        _lastRepeatingItem: false,
        _lastSibling: false,
        _multipleAnswers: false,
        _questionRepeatable: false,
        _readOnly: false,
        _repeatingSectionList: null,
        _text: "A TX",
        _toolTip: "Type a value"
      }

    )
  }
}

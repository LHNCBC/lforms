import { Component, OnInit, Input} from '@angular/core';
import { WindowService } from '../../lib/window.service';
import { LhcDataService} from '../../lib/lhc-data.service';

@Component({
  selector: 'lhc-item-question',
  templateUrl: './lhc-item-question.component.html',
  styleUrls: ['./lhc-item-question.component.css']
})
export class LhcItemQuestionComponent implements OnInit {


  @Input() item;
  @Input() options;

  eleStyle: object = null;

  constructor(
    private winService: WindowService,
    public lhcDataService: LhcDataService,
  ) {     
    winService.windowWidth.subscribe(updatedWidth => {
      let viewClass = winService.getViewModeClass();
      this.eleStyle = viewClass === "lhc-view-lg" ? {"width": updatedWidth/2 + "px"} : null;
    });  

  }

  ngOnInit(): void {
    // console.log("in lhc-item-question")
    // console.log(this.item.question)
    // console.log(this.options)
  }

  test(): void {
    console.log("in test")
    this.item.question += "TESTING: "
  }

  // hasOneRepeatingItem(item): boolean {
  //   return this.lhcDataService.hasOneRepeatingItem(item);
  // }

  // removeOneRepeatingItem(item): void {
  //   this.lhcDataService.removeOneRepeatingItem(item)
  // }

}


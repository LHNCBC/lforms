import { Component, OnInit, Input} from '@angular/core';
import { WindowService } from '../../lib/window.service';

@Component({
  selector: 'lhc-item-question',
  templateUrl: './lhc-item-question.component.html',
  styleUrls: ['./lhc-item-question.component.css']
})
export class LhcItemQuestionComponent implements OnInit {


  @Input() item;

  eleStyle: object = null;

  constructor(
    private winService: WindowService
  ) {     
    winService.windowWidth.subscribe(updatedWidth => {
      let viewClass = winService.getViewModeClass();
      this.eleStyle = viewClass === "lhc-view-lg" ? {"width": updatedWidth/2 + "px"} : null;
    });  
  }

  ngOnInit(): void {
  }

}


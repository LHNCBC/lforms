import { Component, Input } from '@angular/core';
import { LhcDataService} from '../../lib/lhc-data.service';
import * as _ from "lodash";

@Component({
  selector: 'lhc-item-gird',
  templateUrl: './lhc-item-gird.component.html',
  styleUrls: ['./lhc-item-gird.component.css']
})
export class LhcItemGirdComponent  {


  @Input() item;
  @Input() formLevel: boolean = false;
  uniqueGridHeaders: any[] = [];
  constructor(public lhcDataService: LhcDataService) {
  }

  ngOnInit(): void {
    this.createCustomHeaders(this.item);
  }
 
  createCustomHeaders(item): void{
    _.forEach(item.items, (questionItems, key) => {
      _.forEach(questionItems.items, (subItems,key) => {  
        if(!_.includes(this.uniqueGridHeaders, subItems.question)){
          this.uniqueGridHeaders.push(subItems.question);
        }
      });
    });
  }

}

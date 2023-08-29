import { Component, Input } from '@angular/core';
import { LhcDataService} from '../../lib/lhc-data.service';

@Component({
  selector: 'lhc-group-grid',
  templateUrl: './lhc-group-grid.component.html',
  styleUrls: ['./lhc-group-grid.component.css']
})
export class LhcGroupGridComponent  {


  @Input() item;
  @Input() formLevel: boolean = false;
  uniqueGridHeaders: any[] = [];
  constructor(public lhcDataService: LhcDataService) {
  }

  ngOnInit(): void {
    this.createCustomHeaders(this.item);
  }
 
  createCustomHeaders(item):void{
    item.items.forEach(questionItems => {
      questionItems.items.forEach(subItems => {
        if(!this.uniqueGridHeaders.includes(subItems.question)  && subItems.skipLogic?.conditions[0]?.trigger?.value != 'alwaysHide'){
          this.uniqueGridHeaders.push(subItems.question);
        }   
    });
    });
  }
}

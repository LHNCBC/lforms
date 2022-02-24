import { Component, OnInit, OnChanges, Input } from '@angular/core';
import { LhcDataService} from '../../lib/lhc-data.service';
import equal from "fast-deep-equal";
//let LForms:any = (global as any).LForms;

declare var LForms: any;

@Component({
  selector: 'lhc-watcher',
  templateUrl: './lhc-watcher.component.html',
  styleUrls: ['./lhc-watcher.component.css']
})
export class LhcWatcherComponent implements OnInit, OnChanges {

  @Input() value: any;
  @Input() item: any;

  constructor(private lhcDataService: LhcDataService) { }

  ngOnInit(): void {
  }


  // the event is trigger when data changes on 
  // primitive data types (int, real, string)
  // and boolean, date, datetime, time 
  // for answer list with radio/checkboxes, all worked including cwe user typed values.
  // for answer list with ac (single choice, mulitple choice), prefect or search field. all worked finally.
  ngOnChanges(changes) {
    if (!changes.value.firstChange && !equal(changes.value.currentValue, changes.value.previousValue)) {
      // if (!changes.value.firstChange) {
      let lfData = this.lhcDataService.getLhcFormData()
      lfData.updateOnSourceItemChange(this.item)
      this.lhcDataService.sendActionsToScreenReader();
      
      // run FHIRPATH expression when there is a data change
      if (LForms.FHIR && lfData) {
        if (lfData._hasResponsiveExpr) {
          lfData._expressionProcessor.runCalculations(false).then(()=>{
            console.log('fhir path run with false')
          }); // pick up asynchronous model changes
        }
      }
    }

    // fhir expression (converting to fhir q/qr and run functions on them)
    // other functions that were handled in $watch in angularjs version of lforms.

    //TODO: since lhc-validate is also detecting changes on the item.value, it might be efficient 
    // to run some functions that need to be executed only when an item's value changes.


  }

}

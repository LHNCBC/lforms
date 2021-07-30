import { Component, OnInit, Input } from '@angular/core';
import { LhcDataService} from '../../lib/lhc-data.service';

//let LForms:any = (global as any).LForms;

declare var LForms: any;

@Component({
  selector: 'lhc-watcher',
  templateUrl: './lhc-watcher.component.html',
  styleUrls: ['./lhc-watcher.component.css']
})
export class LhcWatcherComponent implements OnInit {

  @Input() value: any;

  constructor(private lhcDataService: LhcDataService) { }

  ngOnInit(): void {
  }


  // the event is trigger when data changes on 
  // primitive data types (int, real, string)
  // and boolean, date, datetime, time 
  // for answer list with radio/checkboxes, all worked including cwe user typed values.
  // for answer list with ac (single choice, mulitple choice), prefect or search field. all worked finally.
  ngOnChanges(changes) {
    
    if (!changes.value.firstChange) {
      let lfData = this.lhcDataService.getLhcFormData()
      lfData._checkFormControls();

      // FHIR
      // Only when lfData changes as a whole do we check whether the new
      // form has FHIRPath or not.  This is to avoid the expensive (for
      // large forms) check on the whole of the form data for the need to
      // run FHIRPath.
      if (LForms.FHIR) {
        if (lfData) { // sometimes set to null to clear the page
          if (lfData._hasResponsiveExpr || lfData._hasInitialExpr) {
            lfData._expressionProcessor.runCalculations(false).then(()=>{
              console.log('fhir path run with false')
            }); // pick up asynchronous model changes
          }
          if (!lfData._controllerInit && (lfData._hasResponsiveExpr || lfData._hasInitialExpr)) {
            lfData._expressionProcessor.runCalculations(true).then(() => {
              console.log('fhir path run with true')
            });
          }
          // Note:  For some reason the watches still need to be set up both times.
          lfData._controllerInit = true;
        }        
      }

    }

    // fhir expression (converting to fhir q/qr and run functions on them)
    // other functions that were handled in $watch in angularjs version of lforms.

    //TODO: since lhc-validate is also detecting changes on the item.value, it might be efficient 
    // to run some functions that need to be executed only when an item's value changes.


  }

}

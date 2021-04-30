import { Component, OnInit, Input } from '@angular/core';
import { LhcDataService} from '../../lib/lhc-data.service';

@Component({
  selector: 'lhc-watcher',
  templateUrl: './lhc-watcher.component.html',
  styleUrls: ['./lhc-watcher.component.css']
})
export class LhcWatcherComponent implements OnInit {

  @Input() value: any;
  @Input() _skipLogicStatus: string;

  constructor(private lhcDataService: LhcDataService) { }

  ngOnInit(): void {
  }


  // the event is trigger when data changes on 
  // primitive data types (int, real, string)
  // and boolean, date, datetime, time 
  // for answer list with radio/checkboxes, all worked including cwe user typed values.
  // for answer list with ac (single choise, mulitple choice), cne
  //     for cwe, user typed value didn't trigger this event when it is a SEARCH field. it works when it is a prefetch list.
  
  ngOnChanges(changes) {

    console.log("in lhc-watcher: on changes")
    // if (!changes.value.firstChange) {
    //   console.log(changes);
    // }
    
   if (!changes.value.firstChange) {
      let lfData = this.lhcDataService.getLhcData()
      lfData._checkFormControls();
   }

    // todo: run form controls here in one place
    // skip logic
    // fhir expression (converting to fhir q/qr and run functions on them)
    // other functions that were handled in $watch in angularjs version of lforms.
  }

}

import { Component, Input, OnInit, OnChanges, OnDestroy, ElementRef, NgZone, Output, EventEmitter} from '@angular/core';
import { Subject } from 'rxjs';
import { debounceTime} from 'rxjs/operators';
import { WindowService } from '../../lib/window.service';
import { LhcDataService} from '../../lib/lhc-data.service';

import LhcFormData from '../../lib/lforms/lhc-form-data';
import CommonUtils from "../../lib/lforms/lhc-common-utils.js";

declare var LForms: any;
declare var ResizeObserver;

@Component({
  selector: 'lhc-form',
  //encapsulation: ViewEncapsulation.ShadowDom,
  //changeDetection:ChangeDetectionStrategy.OnPush,
  templateUrl: './lhc-form.component.html',
  styleUrls: ['./lhc-form.component.css'],
  providers: [WindowService, LhcDataService] // These two services are not provided in root.
})
export class LhcFormComponent implements OnInit, OnChanges, OnDestroy {

  @Input() lfData: any;  // questionnaire
  @Input() lfOptions: any;  //options
  @Input() prepop: boolean=false;  //
  @Input() fhirVersion: string;  //
  // contain the object of LhcFormData, could be used outside of the form component, formElement.lhcFormData
  @Input() lhcFormData: any; // not to publish
  // emit an event when the form's view and data are initially rendered
  @Output() onFormReady: EventEmitter<any> = new EventEmitter<any>();

  //lhcFormData: any;
  viewModeClass = "";
  viewMode = "";
  _inputFieldWidth = null

  private changeSize = new Subject();
  private observer: any;

  constructor(private winService: WindowService, 
    public lhcDataService: LhcDataService,
    private host: ElementRef, 
    private zone: NgZone) { 

    this.changeSize
      .asObservable()
      .pipe(
        debounceTime(100)
      )
      .subscribe((eleWidth:number) => {
        //console.log('after debounce:', eleWidth)
        this.winService.setWindowWidth(eleWidth);
    });

    winService.viewMode.subscribe(updatedMode => {      
      this.viewModeClass = this.lhcDataService.getViewModeClass(updatedMode);
      this.viewMode = updatedMode;
    });  

  }

  /**
   * get CSS class of view mode for an item
   * @param item an item in a form
   * @returns 
   */
   getItemViewModeClass(item) {
    return this.lhcDataService.getItemViewModeClass(item, this.viewMode)
  }

  ngOnInit(): void {
    // if (this.lfData) {
    //   this.lhcFormData = new LhcFormData(this.lfData)
    //   this.lhcDataService.setLhcFormData(this.lhcFormData);
    // }

    //console.log(this.host)
    this.observer = new ResizeObserver(entries => {
      //console.log(entries)
      
      this.zone.run(() => {
        let width = entries[0].contentRect.width;
        this.changeSize.next(width);
        // console.log("in Resize observer:", width);
      });
      
    });

    this.observer.observe(this.host.nativeElement);

  }

  ngOnDestroy() {
    this.observer.unobserve(this.host.nativeElement);    
  }

  ngOnChanges(changes) {
    // console.log("in lhc-form's ngOnChange")
    // form data changes
    if (changes.lfData) {      
      // form data changes, clean up the previous data before loading the new form data
      this.lhcFormData = null;
      this.lhcDataService.setLhcFormData(null);
      
      if (this.lfData) {
        const self = this;        
        // reset the data after this thread is done
        setTimeout(()=> {
          let lfData = CommonUtils.deepCopy(self.lfData);
          // check if lfData is a FHIR Questionnaire
          if (lfData.resourceType === "Questionnaire") {
            let fhirVer = self.fhirVersion || LForms.Util.guessFHIRVersion(lfData) || "R4";
            if (LForms.FHIR[fhirVer] && LForms.FHIR[fhirVer].SDC) {
              // convert it to a lforms form data
              lfData = LForms.FHIR[fhirVer].SDC.convertQuestionnaireToLForms(lfData);
            }
          }
          self.lhcFormData = new LhcFormData(lfData)
          // and options change
          if (changes.lfOptions && self.lfOptions) {
            // self.lhcFormData.setTemplateOptions(CommonUtils.deepCopy(self.lfOptions));  
            self.lhcFormData.setTemplateOptions(self.lfOptions);  
          }      
          self.lhcDataService.setLhcFormData(self.lhcFormData);  

          if (LForms.FHIR) {
            self.lhcFormData.loadFHIRResources(self.prepop).then(()=> {
              // when a new form is loaded, run all FHIR Expressions including the initial expresions
              if (self.lhcFormData) { // sometimes set to null to clear the page
                if (self.lhcFormData._hasResponsiveExpr || self.lhcFormData._hasInitialExpr) {
                  self.lhcFormData._expressionProcessor.runCalculations(true).then(() => {
                    console.log('fhir path run with true')
                  });
                }
              }        
              // emit an event when the form's view and data are initially rendered
              self.onFormReady.emit();
            })            
          }
          else {
            // emit an event when the form's view and data are initially rendered
            self.onFormReady.emit();
          }
        },1)
      }
      else {
        // clean up the previous data 
        this.lhcFormData = null;
        this.lhcDataService.setLhcFormData(null);
      }
    }
    // only options changes
    else if (changes.lfOptions) {
      let lhcFD = this.lhcDataService.getLhcFormData();
      if (lhcFD) {
        lhcFD.setTemplateOptions(this.lfOptions);
        console.log("in lhc-form's ngOnChange: set templateOptions, alone")
      }    
    }
    
    // if (this.lfData) {
    //   this.lhcFormData = new LhcFormData(this.lfData)

    //   this.lhcDataService.setLhcFormData(this.lhcFormData);
    //   //console.log(this.lhcFormData)
    // }
  }

  // // called too many times. being called continuously even nothing is touched on the form
  // ngDoCheck() {
  //   console.log("in lhc-form's ngDoCheck")
  // }


  // @HostListener('window:resize', ['$event'])
  // onResize(event) {
  //   //console.log(this.lhcFormContainer)
  //   if (this.lhcFormContainer) {
  //     let width = this.lhcFormContainer.nativeElement.offsetWidth;
  //     this.changeSize.next(width);
  //     console.log("in lhc-form onReszie: " + width)
  
  //   }
    
  // }

 

    
}

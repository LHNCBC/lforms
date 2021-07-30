import { Component, Input, OnInit, OnDestroy, ElementRef, NgZone, HostListener, ChangeDetectionStrategy} from '@angular/core';
import { Subject } from 'rxjs';
import { throttleTime, debounceTime} from 'rxjs/operators';
import { WindowService } from '../../lib/window.service';
import { LhcDataService} from '../../lib/lhc-data.service';

import LhcFormData from '../../lib/lforms/lhc-form';


declare var ResizeObserver;

@Component({
  selector: 'lhc-form',
  //changeDetection:ChangeDetectionStrategy.OnPush,
  templateUrl: './lhc-form.component.html',
  styleUrls: ['./lhc-form.component.css']
})
export class LhcFormComponent implements OnInit, OnDestroy {

  @Input() lfData: any;
  @Input() lfOptions: any;
  // contain the object of LhcFormData, could be used outside of the form component, formElement.lhcFormData
  @Input() lhcFormData: any; 

  //lhcFormData: any;
  viewModeClass = "";
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

    winService.viewModeClass.subscribe(updatedClass => {      
      this.viewModeClass = updatedClass;
    });  


   }

  ngOnInit(): void {
    // if (this.lfData) {
    //   this.lhcFormData = new LhcFormData(this.lfData)
    //   this.lhcDataService.setLhcFormData(this.lhcFormData);
    // }

    //console.log(this.host)
    this.observer = new ResizeObserver(entries => {
      //console.log(entries)

      // entries.forEach(entry => {
      //   console.log("width", entry.contentRect.width);
      //   console.log("height", entry.contentRect.height);
      // });
      
      this.zone.run(() => {
        let width = entries[0].contentRect.width;
        this.changeSize.next(width);
        //console.log("in Resize observer:", width);
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
        let that = this;
        // reset the data after this thread is done
        setTimeout(()=> {
          that.lhcFormData = new LhcFormData(that.lfData)
          // and options change
          if (changes.lfOptions) {
            if (that.lfOptions) {
              that.lhcFormData.setTemplateOptions(that.lfOptions);  
            }
          }      
          that.lhcDataService.setLhcFormData(that.lhcFormData);  
        },1)
      }
    }
    // only options changes
    else if (changes.lfOptions) {
      let lhcFD = this.lhcDataService.getLhcFormData();
      if (lhcFD) {
        lhcFD.setTemplateOptions(this.lfOptions);
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

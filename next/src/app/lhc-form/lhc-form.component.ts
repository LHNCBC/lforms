import { Component, Input, OnInit, OnDestroy, ElementRef, NgZone, HostListener} from '@angular/core';
import { Subject } from 'rxjs';
import { throttleTime, debounceTime} from 'rxjs/operators';
import { WindowService } from '../../lib/window.service';

//import LFormsData from '../../lib/lhc-form.js';
import LhcFormData from '../../lib/lforms/lhc-form';

declare var ResizeObserver;

@Component({
  selector: 'lhc-form',
  templateUrl: './lhc-form.component.html',
  styleUrls: ['./lhc-form.component.css']
})
export class LhcFormComponent implements OnInit, OnDestroy {

  @Input() lfData: any;
  @Input() lfOptions: any;

  lhcFormData: any;
  viewModeClass = "";
  _inputFieldWidth = null

  private changeSize = new Subject();
  private observer: any;

  constructor(private winService: WindowService, private host: ElementRef, private zone: NgZone) { 

    this.changeSize
      .asObservable()
      .pipe(
        debounceTime(100)
      )
      .subscribe((eleWidth:number) => {
        console.log('after debounce:', eleWidth)
        this.winService.setWindowWidth(eleWidth);
    });

    winService.viewModeClass.subscribe(updatedClass => {      
      this.viewModeClass = updatedClass;
    });  

   }

  ngOnInit(): void {
    if (this.lfData) {
      this.lhcFormData = new LhcFormData(this.lfData)
    }

    console.log(this.host)
    this.observer = new ResizeObserver(entries => {
      //console.log(entries)

      // entries.forEach(entry => {
      //   console.log("width", entry.contentRect.width);
      //   console.log("height", entry.contentRect.height);
      // });
      
      this.zone.run(() => {
        let width = entries[0].contentRect.width;
        this.changeSize.next(width);
        console.log("in Resize observer:", width);
      });
      
    });

    this.observer.observe(this.host.nativeElement);

  }

  ngOnDestroy() {
    this.observer.unobserve(this.host.nativeElement);
  }

  ngOnChanges(changes) {
    console.log(changes)
    if (this.lfData) {
      this.lhcFormData = new LhcFormData(this.lfData)
      console.log(this.lhcFormData)
    }
  }


  // @HostListener('window:resize', ['$event'])
  // onResize(event) {
  //   //console.log(this.lhcFormContainer)
  //   if (this.lhcFormContainer) {
  //     let width = this.lhcFormContainer.nativeElement.offsetWidth;
  //     this.changeSize.next(width);
  //     console.log("in lhc-form onReszie: " + width)
  
  //   }
    
  // }



  /**
   * Set the active row in table
   * @param index index of an item in the lforms form items array
   */
  setActiveRow(item) {
    this.lhcFormData.setActiveRow(item);
  }

  /**
   * Get the css class for the active row
   * @param item an item
   * @returns {string}
   */
  getActiveRowClass(item) {
    return this.lhcFormData.getActiveRowClass(item);
  }

  /**
   * Get an item's skip logic status
   * @param item an item
   * @returns {*|string}
   */
  getSkipLogicClass(item) {
    return this.lhcFormData.getSkipLogicClass(item);
  }

  /**
   * Get the CSS styles on a table column
   * @param col a column in a HTML table
   * @returns {{}} CSS style object
   */
  getTableColumnStyle(col) {
    var ret = {};
    if (col.displayControl && Array.isArray(col.displayControl.colCSS)) {
      var colCSS = col.displayControl.colCSS;
      for (var i= 0, iLen= colCSS.length; i<iLen; i++) {
        var css = colCSS[i];
        ret[ css.name ] = css.value;
      }
    }
    return ret;
  }


  /**
   * Get the CSS styles on an item itself
   * @param item an item in a form
   * @returns {{}} CSS style object
   */
  getItemStyle(item) {
    var ret = {};
    if (item.displayControl && Array.isArray(item.displayControl.css)) {
      for (var i= 0, iLen= item.displayControl.css.length; i<iLen; i++) {
        var css = item.displayControl.css[i];
        ret[ css.name ] = css.value;
      }
    }
    return ret;
  }


  


 /**
   * Get CSS classes for the sibling status (whether it is the first or the last sibling)
   * @param item a form item
   * @returns {string}
   */
  getSiblingStatus(item) {
    var status = "";
    if (item._lastSibling)
      status += 'lf-last-item';
    if (item._firstSibling)
      status += ' lf-first-item'
    return status;
  }


  /**
   * Get the indentation style of the form
   * @returns {string}
   */
  getIndentationStyle() {
    return this.lhcFormData.templateOptions.useTreeLineStyle ? "lf-indentation-tree" : "lf-indentation-bar";
  }
  

  /**
   * Get the CSS class on each item row
   * @param item an item in the lforms form items array
   * @returns {string}
   */
   getRowClass(item) {
    //var eleClass = 'level' + item._displayLevel;
    var eleClass = ' lf-datatype-' + item.dataType;
    if (item._answerRequired) {
      eleClass += ' lf-answer-required';
    }

    if (item.header) {
      eleClass += ' lhc-item-group';
    }
    else {
      eleClass += ' lhc-item-question';
    }
    if (item.dataType === 'TITLE') {
      eleClass += ' lhc-item-display';
    }

    if (!item.question || item.question.length === 0) {
      eleClass += ' lf-empty-question';
    }
    if (item._visitedBefore) {
      eleClass += ' lf-visited-before';
    }
    if (item._showValidation) {
      eleClass += ' lf-show-validation';
    }
    if (item._isHiddenFromView) {
      eleClass += ' lf-hidden-from-view';
    }
    
    return eleClass;
  }


  /**
   * Check if there's only one repeating item in a group
   * (so that the 'remove' button won't show on this item)
   * @param item an item in the lforms form items array
   * @returns {boolean}
   */
  hasOneRepeatingItem(item) {
    var recCount = this.lhcFormData.getRepeatingItemCount(item);
    return recCount > 1 ? false : true;
  }


  /**
   * Check the display type of the coding instructions
   * @param item an item in the lforms form items array
   * @returns {string}
   */
  getCodingInstructionsDisplayType(item) {
    var ret ='';
    if (item.codingInstructions && item.codingInstructions.length > 0) {
      var position = this.lhcFormData.templateOptions.showCodingInstruction ? "inline" : "popover";
      if (this.lhcFormData.templateOptions.allowHTMLInInstructions && item.codingInstructionsFormat === "html") {
        var format = "html";
      }
      else {
        format = "escaped";
      }
      ret = position + "-" + format;
    }
    return ret;
  }
  
}

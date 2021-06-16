import { Component, OnInit, Input, Output, ViewEncapsulation, EventEmitter, ElementRef, ViewChild } from '@angular/core';
import Def from 'autocomplete-lhc'; // see docs at http://lhncbc.github.io/autocomplete-lhc/docs.html

@Component({
  selector: 'lhc-autocomplete',
  templateUrl: './lhc-autocomplete.component.html',
  styleUrls: ['./lhc-autocomplete.component.css'],
  encapsulation: ViewEncapsulation.Emulated
})
export class LhcAutocompleteComponent implements OnInit {

  // options
  //   .elementId
  //   .readOnly
  //   .toolTip
  //   .acOptions
  @Input() options: any;
  // two-way data binding for dataModel
  @Input() dataModel: any;
  @Output() dataModelChange = new EventEmitter<any>();

  @ViewChild("ac") ac: ElementRef<any>;

  selectedItems: any[] = [];
  multipleSelections: boolean = false;
  allowNotOnList: boolean = false;
  acType: string = null;
  acInstance: any = null;
  prefetchTextToItem: {};

  viewInitialized = false;

  /**
   * Component class constructor
   */
  constructor() {

  }


  /**
   * Initialize the component
   */
  ngOnInit(): void {
    //console.log("lhc-autocomplete, ngOnInit")
  }


  /**
   * Invokded when the properties change
   * Reset the defualt settings
   * @param changes changes.prop contains the old and the new value
   */
  ngOnChanges(changes) {

    //console.log("lhc-autocomplete, ngOnChange")

    // reset autocomplete when 'options' changes
    // ignore changes on 'dataModel'
    if (changes.options) {
      this.selectedItems = [];
      this.multipleSelections = false;
      this.acType = null;
      this.acInstance = false;
      this.allowNotOnList = null;
      this.prefetchTextToItem = {};
      if (this.viewInitialized) {
        this.setupAutocomplete();
      }
    }

  }


  /**
   * Initialize the autocomplete-lhc
   * Cannot be done in ngOnInit because the DOM elements that autocomplete-lhc depends on are
   * not ready yet on ngOnInit
   */
  ngAfterViewInit() {
    console.log("lhc-autocomplete, ngAfterViewInit")
    this.setupAutocomplete();
    this.viewInitialized = true;
  }


  /**
   * Clean up the autocomplete instance
   */
  ngOnDestroy() {
    //console.log("lhc-autocomplete, ngOnDestroy")
    // if there's an autocomp
    if (this.acInstance) {
      // Destroy the existing autocomp
      this.acInstance.destroy();
    }

  }


  /**
   * Set up the autocompleter
   */
  setupAutocomplete(): void {
    // if there's an autocomp already
    
    if (this.acInstance) {
      // Destroy the existing autocomp
      this.acInstance.destroy();
    }

    // if there are options for autocomplete
    if (this.options && this.options.acOptions) {

      let acOptions = this.options.acOptions;
      if (acOptions.maxSelect && (acOptions.maxSelect === "*" || parseInt(acOptions.maxSelect) > 1)) {
        this.multipleSelections = true;
      }
      this.allowNotOnList = !acOptions.matchListValue;

      // get a list of display text, code and create a answer text to answer item mapping.
      // (autocomplete-lhc requires answer text to be unique)
      if (acOptions.listItems && !acOptions.url) {
        let listItemsText = [], listItemsCode = [];
        acOptions.listItems.forEach(item => {
          let displayText = acOptions.display;
          listItemsText.push(item[displayText]);
          listItemsCode.push(item.code);
          this.prefetchTextToItem[item[displayText]] = item;
        }, this);

        acOptions.codes = listItemsCode;

        this.acType = 'prefetch';
        // acOptions has matchListValue, maxSelected, codes
        // Using this.options.elementId causes the autocomplete to be refreshed without an autocomplete created in a horizontal table. 
        // (where the rows lists are created as a new array, instead of keeping the same reference. Not confirmed, but I suspect this is the reason.)
        // It works with vertical layout though.
        // Using this.ac.nativeElement works in both cases.
        //   this.acInstance = new Def.Autocompleter.Prefetch(this.options.elementId, listItemsText, acOptions);
        this.acInstance = new Def.Autocompleter.Prefetch(this.ac.nativeElement, listItemsText, acOptions);
      }
      else {
        this.acType = 'search'
        this.acInstance = new Def.Autocompleter.Search(this.ac.nativeElement, acOptions.url, acOptions);
      }

      let defaultItem =  this.prefetchTextToItem[acOptions.defaultValue];

      // set up initial values if there is value
      let savedValue = this.dataModel || defaultItem;
      if (savedValue) {
        if (this.multipleSelections && Array.isArray(savedValue)) {
          for (var i=0, len=savedValue.length; i<len; ++i) {
            let dispVal = this.acType === "prefetch" ? savedValue[i]._notOnList ?
              savedValue[i].text : savedValue[i][acOptions.display] : savedValue[i].text;
            this.acInstance.storeSelectedItem(dispVal, savedValue[i].code);
            this.acInstance.addToSelectedArea(dispVal);
          }
          // Clear the field value for multi-select lists
          this.acInstance.setFieldVal('', false);

          this.selectedItems = savedValue;
        }
        else {
          let dispVal = this.acType === "prefetch" ? savedValue._notOnList ?
            savedValue.text : savedValue[acOptions.display] : savedValue.text;
          if (typeof dispVal === 'string') {
            this.acInstance.storeSelectedItem(dispVal, savedValue.code);
            this.acInstance.setFieldVal(dispVal, false);
          }
          else {// handle the case of an empty object as a model
            this.acInstance.setFieldVal('', false);
          }

          this.dataModel = savedValue;
          // to avoid the error of ExpressionChangedAfterItHasBeenCheckedError ??
          let that = this;
          setInterval(function(){ that.dataModelChange.emit(that.dataModel); }, 5);
        }
      }

      // add event handler
      Def.Autocompleter.Event.observeListSelections(this.options.elementId, this.onSelectionHandler.bind(this));
    }
  }


  /**
   *
   * @param event item selection handler
   */
  onSelectionHandler(event) {

    if (this.acType === 'prefetch') {
      let selectedTexts = this.acInstance.getSelectedItems()
      this.setItemValueForPrefetchAC(selectedTexts);
    }
    else if (this.acType === 'search') {
      this.setItemValueForSearchAC(event);
    }

    this.dataModelChange.emit(this.dataModel);
  }


  /**
   * Set up an item's value when an answer is selected from a 'prefect' autocompleter
   * @param selectedTexts the selected answer's text
   */
  setItemValueForPrefetchAC(selectedTexts: string[]): void {
    if (selectedTexts) {
      if (selectedTexts.length === 0) {
        this.dataModel = null;
      }
      else {
        let items = selectedTexts.map(text => {
          let answerItem = this.prefetchTextToItem[text];
          if (answerItem) {
            return answerItem;
          }
          else if (this.allowNotOnList) {
            return {"text" : text, "_notOnList": true}
          }
          else {
            // do nothing. this should not happen?
          }
        });
        // mulitple selection
        if (this.multipleSelections) {
          this.dataModel = items;
        }
        // single selection
        else if (items.length >=0 && items[0]) {
          this.dataModel = items[0]
        }
        else {
          this.dataModel = null;
        }
      }
    }
    else {
      this.dataModel = null;
    }
  }


  /**
   * Get the selected answer object from a 'search' autocompleter
   * @param itemText answers' text
   * @param onList whether the answer's text matches the answers texts on the list
   */
  getSearchItemModelData(itemText, onList) {
    var rtn;
    if (itemText === '')
      rtn = null;
    else {
      let item = this.acInstance.getItemData(itemText);
      if (onList) {
        rtn = item;
      }
      else if (!onList && this.allowNotOnList) {
        rtn = item;
        rtn._notOnList = true;
      }
    }
    return rtn;
  }


  /**
   * Set up an item's value when an answer is selected from a 'search' autocompleter
   * @param selectedTexts the selected answer's text
   */
  setItemValueForSearchAC(eventData) {
    var itemText = eventData.final_val;
    var onList = eventData.on_list;
    if (this.acType === 'search') {
      // single selection
      if (!this.multipleSelections) {
        this.selectedItems = this.getSearchItemModelData(itemText, onList);
      }
      // multiple selection
      else {
        // remove the item
        if (eventData.removed) {
          // (create a new array so that change detection is triggered)
          this.selectedItems = this.selectedItems.filter(item => itemText !==item.text)
        }
        // new item, in the search result
        else {
          let newItem = this.getSearchItemModelData(itemText, onList);
          if (newItem) {
              // add the new item
              // (create a new array so that change detection is triggered)
              this.selectedItems = [...this.selectedItems, newItem];
          }
        }
      }
    }
    this.dataModel = this.selectedItems;
  }
}

import { Component, OnInit, OnChanges, Input, Output, ViewEncapsulation, EventEmitter, ElementRef, ViewChild } from '@angular/core';
import Def from 'autocomplete-lhc'; // see docs at http://lhncbc.github.io/autocomplete-lhc/docs.html

@Component({
  selector: 'lhc-autocomplete',
  templateUrl: './lhc-autocomplete.component.html',
  styleUrls: ['./lhc-autocomplete.component.css'],
  encapsulation: ViewEncapsulation.Emulated
})
export class LhcAutocompleteComponent implements OnInit, OnChanges {

  // options
  //   .elementId
  //   .readOnly
  //   .toolTip
  //   .acOptions
  @Input() options: any;
  // two-way data binding for dataModel
  @Input() dataModel: any;
  @Input() isFormReady: boolean;
  @Output() dataModelChange: EventEmitter<any>  = new EventEmitter<any>();

  // emit the 'focus' and 'blur' events on the input fields
  @Output() onFocusFn: EventEmitter<any> = new EventEmitter<any>();
  @Output() onBlurFn: EventEmitter<any> = new EventEmitter<any>();

  @ViewChild("ac") ac: ElementRef<any>;

  selectedItems: any[] = [];
  multipleSelections: boolean = false;
  allowNotOnList: boolean = false;
  acType: string = null;
  acInstance: any = null;
  prefetchTextToItem: {};
  displayProp: string = '';

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

    if (this.viewInitialized) {
      // reset autocompleter when 'options' changes
      if (changes.options) {
        // need to keep the dataModel while cleaning up the previous autocomplete, when the form is initially rendered
        // with the FHIR resoruce data loaded, asynchronously. At this moment the saved the user data are already in the data model
        // and the autocomplete is already set up, with potentially an empty list if the answer list is loaded (asynchronously)
        // by FHIRPath expressions or data controls.

        let keepDataModel = changes.isFormReady?.currentValue;  //this.isFormReady might be a different value;
        keepDataModel = keepDataModel && !changes.value?.currentValue;
        this.cleanupAutocomplete(keepDataModel);

        this.setupAutocomplete();
      }
      // item.value changed by data control or fhirpath express after the autocompleter is initialized
      // Need to find way to distinguish the two different changes:
      // 1) emitted by ac itself, which does not need to run updateDisplayedValue,
      // 2) from outside of ac
      else if (changes.dataModel) {
        this.updateDisplayedValue(this.dataModel)
      }
    }

  }

  /**
   * Update the display value of the autocomplte when the item.value is changed
   * changed by data control or fhirpath expression after the autocompleter is initialized
   * @param value the new data in item.value
   */
  updateDisplayedValue(itemValue:any) {
    if (itemValue) {
      if (!this.multipleSelections) {
        let dispVal = this.acType === "prefetch" ? itemValue._notOnList ?
        itemValue.text : itemValue[this.options.acOptions.display] : itemValue.text;
        if (typeof dispVal === 'string') {
          this.acInstance.storeSelectedItem(dispVal, itemValue.code);
          let fieldVal = this.acType === "prefetch" ? dispVal.trim() : dispVal;
          this.acInstance.setFieldVal(fieldVal, false);
        }
        else {// handle the case of an empty object as a model
          this.acInstance.setFieldVal('', false);
        }
      }
    }
  }

  /**
   * Initialize the autocomplete-lhc
   * Cannot be done in ngOnInit because the DOM elements that autocomplete-lhc depends on are
   * not ready yet on ngOnInit
   */
  ngAfterViewInit() {
    // console.log("lhc-autocomplete, ngAfterViewInit")
    this.setupAutocomplete();
    this.viewInitialized = true;
  }


  /**
   * Clean up the autocompleter instance
   */
  ngOnDestroy() {
    // console.log("lhc-autocomplete, ngOnDestroy")
    // if there's an autocomp
    this.cleanupAutocomplete();

  }


  onInputBlur() {
    this.onBlurFn.emit();
  }

  onInputFocus() {
    this.onFocusFn.emit();
  }

  /**
   * Clean up the autocompleter if there is one
   * @param keepDataModel whether to keep the data model value on the autocompleter. default is false.
   */
  cleanupAutocomplete(keepDataModel:boolean=false): void {
    if (this.acInstance) {
      // reset the field value
      this.acInstance.setFieldVal('', false);
      // reset the data model value
      if (!keepDataModel) {
        this.dataModel = null;
      }
      this.acInstance.destroy();
    }
  }

  /**
   * Set up the autocompleter
   */
  setupAutocomplete(): void {
    // if there's an autocomp already
    // console.log("lhc-autocomplete, setupAutocomplete")

    // reset ac status
    this.selectedItems = [];
    this.multipleSelections = false;
    this.acType = null;
    this.acInstance = false;
    this.allowNotOnList = null;
    this.prefetchTextToItem = {};
    this.displayProp = "";

    // if there are options for the autocompleter
    if (this.options && this.options.acOptions) {

      let acOptions = this.options.acOptions;
      if (acOptions.maxSelect && (acOptions.maxSelect === "*" || parseInt(acOptions.maxSelect) > 1)) {
        this.multipleSelections = true;
      }
      this.allowNotOnList = !acOptions.matchListValue;
      this.displayProp = acOptions.display || "text";

      // search autocomplete
      if (acOptions.hasOwnProperty('url') || (acOptions.fhir && acOptions.fhir.search)) {
        this.acType = 'search'
        this.acInstance = new Def.Autocompleter.Search(this.ac.nativeElement, acOptions.url, acOptions);
      }
      // prefectch autocomplete
      else if (acOptions.listItems) {
        this.acType = 'prefetch';
        let listItemsText = [], listItemsCode = [];
        // get a list of display text, code and create a answer text to answer item mapping.
        // (autocomplete-lhc requires answer text to be unique)
        acOptions.listItems.forEach(item => {
          listItemsText.push(item[this.displayProp]);
          listItemsCode.push(item.code);
          this.prefetchTextToItem[item[this.displayProp].trim()] = item;
        }, this);

        acOptions.codes = listItemsCode;

        // acOptions has matchListValue, maxSelected, codes
        // Using this.options.elementId causes the autocompleter to be refreshed without an autocompleter created in a horizontal table.
        // (where the rows lists are created as a new array, instead of keeping the same reference. Not confirmed, but I suspect this is the reason.)
        // It works with vertical layout though.
        // Using this.ac.nativeElement works in both cases.
        //   this.acInstance = new Def.Autocompleter.Prefetch(this.options.elementId, listItemsText, acOptions);
        this.acInstance = new Def.Autocompleter.Prefetch(this.ac.nativeElement, listItemsText, acOptions);
      }

      let defaultItem =  acOptions.defaultValue
      // set up initial values if there is value
      let savedValue = this.dataModel || defaultItem;
      this.setItemInitValue(savedValue)

      // add event handler
      Def.Autocompleter.Event.observeListSelections(this.options.elementId, this.onSelectionHandler.bind(this));

      // to avoid the error of ExpressionChangedAfterItHasBeenCheckedError ??
      let that = this;
      // setInterval(function(){ that.dataModelChange.emit(that.dataModel); }, 5);
      setTimeout(function(){ that.dataModelChange.emit(that.dataModel); }, 1);

    }
  }

  /**
   * Set the initial item.value to the autocompleter when the autocompleter is being set up or
   * the item.value is changed later
   * @param itemValue
   */
  setItemInitValue(itemValue) {
    if (itemValue) {
      if (this.multipleSelections && Array.isArray(itemValue)) {
        for (var i=0, len=itemValue.length; i<len; ++i) {
          let dispVal = this.acType === "prefetch" && !itemValue[i]._notOnList ?
            itemValue[i][this.displayProp] : itemValue[i].text;
          this.acInstance.storeSelectedItem(dispVal, itemValue[i].code);
          this.acInstance.addToSelectedArea(dispVal);
        }
        // Clear the field value for multi-select lists
        this.acInstance.setFieldVal('', false);

        this.selectedItems = itemValue;
      }
      else {
        let dispVal = this.acType === "prefetch" ? itemValue._notOnList ?
        itemValue.text : itemValue[this.displayProp] : itemValue.text;
        if (typeof dispVal === 'string') {
          this.acInstance.storeSelectedItem(dispVal, itemValue.code);
          let fieldVal = this.acType === "prefetch" ? dispVal.trim() : dispVal;
          this.acInstance.setFieldVal(fieldVal, false);
        }
        else {// handle the case of an empty object as a model
          this.acInstance.setFieldVal('', false);
        }
        this.dataModel = itemValue;
      }
    }
  }


  /**
   * Event handler for when an answer item is selected
   * @param event the event emitted from an autocompleter
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

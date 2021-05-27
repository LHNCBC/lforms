import { Component, OnInit, Input, Output, ViewEncapsulation, EventEmitter } from '@angular/core';

@Component({
  selector: 'lhc-item-base',
  templateUrl: './lhc-item-base.component.html',
  styleUrls: ['./lhc-item-base.component.css'],
  encapsulation: ViewEncapsulation.Emulated
})
export class LhcItemBaseComponent implements OnInit {

  @Input() item: any;

  /**
   * Component class constructor
   */
  constructor() {

  }

  /**
   * Initialize the component
   */
  ngOnInit(): void {
  }


  /**
   * Get the sequence number for the current repeating item
   * @param item an item in the lforms form items array
   * @returns {string}
   */
  getRepeatingSN(item) {
    var ret = '';
    if (item._questionRepeatable) {
      var sn = item._idPath.slice(1);
      ret = sn.replace(/\//g, '.');
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

  




}

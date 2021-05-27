import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

/**
 * A data service for the form data object that is used by various components
 */
export class LhcDataService {

  constructor() { }

  /**
    * Get the css class for the active row
    * @param item an item
    * @returns {string}
    */
  // getActiveRowClass(item) {
  //   var ret = "";
  //   if (this._activeItem && this._activeItem._elementId === item._elementId) {
  //     ret = "active-row";
  //   }
  //   return ret;
  // }
}

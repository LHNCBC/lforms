// R4-specific export code common to DiagnosticReport and SDC.

import commonExport from '../export-common.js';

let self = Object.create(commonExport); // copies properties to self.prototype
Object.assign(self, {
  /**
   *  Creates a structure for use by _createObservation() in constructing an
   *  Observation value for the given integer value.
   * @param item an LForms item with the integer value to be represented in an Observation.
   *  It is assumed that the caller has already checked the data type.
   * @return an object with a "key" property that will be the property name for
   *  the value in the Observation object, and a "val" property that holds the
   *  value (formatted for the Observation).
   */
  _createObsIntValue: function(item) {
    // R4 added valueInteger to Observation, so we use that unless the item has
    // a unit, in which case we use valueQuantity.
    // valueQuantity.
    let rtn;
    if (item.unit) {
      let quantity = {value: item.value};
      this._setFHIRQuantityUnit(quantity, item.unit);
      rtn = {key: 'valueQuantity', val: quantity};
    }
    else
      rtn = {key: 'valueInteger', val: item.value};

    return rtn;
  }
});

export default self;

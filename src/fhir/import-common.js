/*
 *  Defines import functions that are the same across the different FHIR
 *  versions and that are used by both the SDC and DiagnosticReport imports.
 */


/**
 *  Converts a FHIR Quantity to the an an LForms equivalent-- essentially, the
 *  unit object plus 'value' and 'comparator' fields.
 * @param quantity the quantity to be converted.
 * @return the quantity data with field labels appropriate for LForms.
 */
export function importFHIRQuantity(quantity) {
  const rtn = {_type: 'Quantity',
    value: quantity.value
  };
  if (quantity.comparator)
    rtn.comparator = quantity.comparator
  const unitOrCode = quantity.unit || quantity.code;
  if (unitOrCode) {
    rtn.name = unitOrCode; // in some data 'unit' is undefined
    if (quantity.code)
      rtn.code = unitOrCode;
    if (quantity.system)
      rtn.system = quantity.system;
  }
  return rtn;
}


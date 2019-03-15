/**
 *  Returns a mock for a FHIR context, as one gets for a SMART on FHIR app.
 * @param fhirVersion the FHIR version number (string) that should be reported for this
 * fake "server".
 * @param weightQuantity the quantity to return from a search for a weight.
 */
module.exports = function mockFHIRContext(fhirVersion, weightQuantity) {
  if (!weightQuantity) {
    weightQuantity = {
      "value": 95,
      "unit": "kg",
      "system": "http://unitsofmeasure.org",
      "code": "kg"
    };
  }

  return {
    getCurrent:  function(typeList, callback) {
      var rtn = null;
      if (typeList.indexOf('Patient') >= 0) {
        rtn = {resourceType: "Patient",
          name: [{
            family: "Smith",
            given: ["John", "Adam"]
          }],
          birthDate: "1990-12-10",
          gender: "male"
        }
      }
      callback(rtn);
    },

    getFHIRAPI: function() {
      return {
        conformance: function() {
          return {
            then: function(callback) {
              callback({data: {fhirVersion: fhirVersion}});
            }
          }
        },
        search: function(queryParams) {
          // For now, we just have one test.
          return {
            then: function(callback) {
              callback({
                "data": {
                  "resourceType": "Bundle",
                  "type": "searchset",
                  "entry": [
                    {
                      "fullUrl": "https://launch.smarthealthit.org/v/r3/fhir/Observation/8919e529-7c56-41e0-a696-2b974d4c95ae",
                      "resource": {
                        "code": {
                          "coding": [
                            {
                              "system": "http://loinc.org",
                              "code": "29463-7",
                              "display": "Body Weight"
                            }
                          ],
                          "text": "Body Weight"
                        },
                        "effectiveDateTime": "2016-06-29T19:14:57-04:00",
                        "issued": "2016-06-29T19:14:57-04:00",
                        "valueQuantity": weightQuantity,
                      }
                    }
                  ]
                }
              });
            }
          };
        }
      }
    }
  }
}

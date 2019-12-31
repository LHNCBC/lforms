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
              setTimeout(function() { // preserve expected async behavior
                callback({data: {fhirVersion: fhirVersion}});
              });
            }
          }
        },
        search: function(queryParams) {
          var entry = {
            "resource": {
              "status": "final",
              "effectiveDateTime": "2016-06-29T19:14:57-04:00",
              "issued": "2016-06-29T19:14:57-04:00",
            }
          };
          switch(queryParams.query.code) {
            case 'http://loinc.org|29463-7':
              entry.resource.code = {
                "coding": [
                  {
                    "system": "http://loinc.org",
                    "code": "29463-7",
                    "display": "Body Weight"
                  }
                ],
                "text": "Body Weight"
              };
              entry.resource.valueQuantity = weightQuantity;
              break;
            case 'http://loinc.org|44250-9':
              entry.resource.code = {
                "coding": [
                  {
                    "system": "http://loinc.org",
                    "code": "44250-9",
                    "display": "Little interest or pleasure in doing things?"
                  }
                ],
                "text": "Little interest or pleasure in doing things?"
              };
              entry.resource.valueCodeableConcept = {
                "coding": [
                  {
                    "system": "http://loinc.org",
                    "code": "LA6568-5",
                    "display": "Not at all"
                  }
                ],
                "text": "Not at all"
              };
              break;
            default:
              entry = null;
              break;
          }

          return {
            then: function(callback) {
              var data = {
                "resourceType": "Bundle",
                "type": "searchset",
              };
              if (entry)
                data.entry = [entry];
              setTimeout(function() { // preserve expected async behavior
                callback({data: data});
              });
            }
          };
        }
      }
    }
  }
};

/**
 *  Defines an object with a function that returns a mock FHIR context, and also
 *  a structure of mock FHIR data.
 */
const fhirMock = {
  /**
   *  Returns a mock for a FHIR context, as one gets for a SMART on FHIR app.
   * @param fhirVersion the FHIR version number (string) that should be reported for this
   * fake "server".
   * @param weightQuantity the quantity to return from a search for a weight.
   * @param resources A hash from resource type to hashes of resource ID to resource.
   */
  mockFHIRContext: function(fhirVersion, weightQuantity, resources) {
    if (!weightQuantity) {
      weightQuantity = {
        "value": 95,
        "unit": "kg",
        "system": "http://unitsofmeasure.org",
        "code": "kg"
      };
    }

    // Mock needed functions from the fhirclient API
    // http://docs.smarthealthit.org/client-js/client
    return {
      getFhirVersion: function() {
        return Promise.resolve(fhirVersion);
      },

      request: function(relativeURL) {
        let rtnData, md;
        if (relativeURL.startsWith('ValueSet')) {
          if (md = relativeURL.match(/ValueSet\/([^/]+)\/\$expand/)) {
            let vsID = md[1];
            rtnData = resources.ValueSet[vsID];
          }
        }
        return new Promise((resolve, reject)=>{
          setTimeout(function() { // preserve expected async behavior
            if (rtnData)
              resolve(rtnData);
            else
              reject('Not found');
          });
        });
      },

      patient: {
        id: 5,
        read:  function() {
          return new Promise((resolve, reject)=>{
            setTimeout(function() { // preserve expected async behavior
              resolve({resourceType: "Patient",
                name: [{
                  family: "Smith",
                  given: ["John", "Adam"]
                }],
                birthDate: "1990-12-10",
                gender: "male"
              });
            });
          });
        },

        request: function(relativeURL) {
          let url = new URL(relativeURL, 'https://example.com');
          let params = url.searchParams;

          var entry:any = {
            "resource": {
              "status": "final",
              "effectiveDateTime": "2016-06-29T19:14:57-04:00",
              "issued": "2016-06-29T19:14:57-04:00",
            }
          };
          let entries = [];

          switch(params.get('code')) {
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
              // Include a more recent entry that does not have a value
              entries.push(entry);
              entry = JSON.parse(JSON.stringify(entry));
              entry.effectiveDateTime = "2015-06-29T19:14:57-04:00";
              entry.resource.valueQuantity = weightQuantity;
              entries.push(entry);
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
              entries.push(entry);
              break;
            case 'http://example.org|example,http://loinc.org|29463-7':
              entry.resource.code = {
                "coding": [
                  {
                    "system": "http://example.org",
                    "code": "example",
                    "display": "Example"
                  }
                ],
                "text": "Example"
              };
              entry.resource.valueQuantity = weightQuantity;
              entry.resource.valueQuantity.value = 96;
              entry.resource.effectiveDateTime = "2020-06-29T19:14:57-04:00";
              entry.resource.issued = "2020-06-29T19:14:57-04:00";
              entries.push(entry);
              // Need a deep copy of the data
              entry = JSON.parse(JSON.stringify(entry));
              entry.resource.valueQuantity.value = 95;
              entry.resource.effectiveDateTime = "2016-06-29T19:14:57-04:00";
              entry.resource.issued = "2016-06-29T19:14:57-04:00";
              entries.push(entry);
              break;
            default:
              entry = null;
              break;
          }

          return {
            then: function(callback) {
              var data:any = {
                "resourceType": "Bundle",
                "type": "searchset",
              };
              if (entries.length)
                data.entry = entries;
              setTimeout(function() { // preserve expected async behavior
                callback(data);
              });
            }
          };
        }
      }
    }
  },

  mockData: {
    ValueSet: {
    }
  }
};

// Populate ValueSet expansions
let vsID = 'language-preference-type';
fhirMock.mockData.ValueSet[vsID] = require('../../../../src/test-data/e2e/R4/ValueSet/'+vsID+'.json');


module.exports = fhirMock;

/**
 *  A mock FHIR context for Playwright tests, mirroring the Cypress version.
 *  The mockFHIRContext property is a stringified function so it can be
 *  evaluated inside the browser via page.evaluate().
 */
import * as fs from 'fs';
import * as path from 'path';

const vsLanguagePref = JSON.parse(
  fs.readFileSync(path.resolve('test/data/R4/ValueSet/language-preference-type.json'), 'utf-8')
);
const vsYesNoDontKnow = JSON.parse(
  fs.readFileSync(path.resolve('test/data/R4/ValueSet/yesnodontknow.json'), 'utf-8')
);

export const mockData = {
  ValueSet: {
    'language-preference-type': vsLanguagePref,
    'yesnodontknow': vsYesNoDontKnow
  }
};

/**
 * The mock FHIR context function as a string.  It will be injected into the
 * page and called with `new Function('return ' + mockFHIRContext)()`.
 */
export const mockFHIRContext = `function(fhirVersion, weightQuantity, resources) {
  if (!weightQuantity) {
    weightQuantity = {
      "value": 95,
      "unit": "kg",
      "system": "http://unitsofmeasure.org",
      "code": "kg"
    };
  }
  return {
    getFhirVersion: function() {
      return Promise.resolve(fhirVersion);
    },
    request: function(relativeURL) {
      var rtnData, md;
      if (typeof relativeURL === 'object' && relativeURL.method === 'POST' && relativeURL.url.startsWith('ValueSet/\$expand')) {
        rtnData = resources.ValueSet['yesnodontknow'];
      } else {
        relativeURL = decodeURIComponent(relativeURL.url ? relativeURL.url : relativeURL);
        if (relativeURL.startsWith('ValueSet')) {
          md = relativeURL.match(/ValueSet\\/([^/]+)\\/\\$expand/);
          if (md) {
            rtnData = resources.ValueSet[md[1]];
          } else {
            md = relativeURL.match(/ValueSet\\/\\$expand\\?url=http\\:\\/\\/hl7\\.org\\/fhir\\/ValueSet\\/(.+)&_format=json/);
            if (md) {
              rtnData = resources.ValueSet[md[1]];
            }
          }
        }
      }
      return new Promise(function(resolve, reject) {
        setTimeout(function() {
          if (rtnData) resolve(rtnData);
          else reject('Not found');
        });
      });
    },
    patient: {
      id: 5,
      read: function() {
        return new Promise(function(resolve) {
          setTimeout(function() {
            resolve({
              resourceType: "Patient",
              name: [{ family: "Smith", given: ["John", "Adam"] }],
              birthDate: "1990-12-10",
              gender: "male"
            });
          });
        });
      },
      request: function(relativeURL) {
        var url = new URL(relativeURL, 'https://example.com');
        var params = url.searchParams;
        var entry = {
          "resource": {
            "status": "final",
            "effectiveDateTime": "2016-06-29T19:14:57-04:00",
            "issued": "2016-06-29T19:14:57-04:00"
          }
        };
        var entries = [];
        switch(params.get('code')) {
          case 'http://loinc.org|29463-7':
            entry.resource.code = {
              "coding": [{"system": "http://loinc.org", "code": "29463-7", "display": "Body Weight"}],
              "text": "Body Weight"
            };
            entries.push(entry);
            entry = JSON.parse(JSON.stringify(entry));
            entry.effectiveDateTime = "2015-06-29T19:14:57-04:00";
            entry.resource.valueQuantity = weightQuantity;
            entries.push(entry);
            break;
          case 'http://loinc.org|44250-9':
            entry.resource.code = {
              "coding": [{"system": "http://loinc.org", "code": "44250-9", "display": "Little interest or pleasure in doing things?"}],
              "text": "Little interest or pleasure in doing things?"
            };
            entry.resource.valueCodeableConcept = {
              "coding": [{"system": "http://loinc.org", "code": "LA6568-5", "display": "Not at all"}],
              "text": "Not at all"
            };
            entries.push(entry);
            break;
          case 'http://example.org|example,http://loinc.org|29463-7':
            entry.resource.code = {
              "coding": [{"system": "http://example.org", "code": "example", "display": "Example"}],
              "text": "Example"
            };
            entry.resource.valueQuantity = weightQuantity;
            entry.resource.valueQuantity.value = 96;
            entry.resource.effectiveDateTime = "2020-06-29T19:14:57-04:00";
            entry.resource.issued = "2020-06-29T19:14:57-04:00";
            entries.push(entry);
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
            var data = { "resourceType": "Bundle", "type": "searchset" };
            if (entries.length) data.entry = entries;
            setTimeout(function() { callback(data); });
          }
        };
      }
    }
  };
}`;

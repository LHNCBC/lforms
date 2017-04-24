// USSG-FHT user data in FHIR SDC QuestionnaireResponse format
// Used for a test that merges it back to the USSG-FHT LForms form
var qr =
    {
      "resourceType": "QuestionnaireResponse",
      "identifier": {
        "system": "http://loinc.org",
        "value": "54127-6N"
      },
      "status": "completed",
      "authored": "2017-04-24T13:37:22-04:00",
      "questionnaire": {
        "reference": "Questionnaire/{{questionnaireId}}"
      },
      "meta": {
        "profile": [
          "http://hl7.org/fhir/us/sdc/StructureDefinition/sdc-response"
        ]
      },
      "item": [
        {
          "linkId": "/54126-8/1",
          "text": "Your health information",
          "item": [
            {
              "linkId": "/54126-8/54125-0/1/1",
              "text": "Name",
              "answer": [
                {
                  "valueString": "name 1"
                }
              ]
            },
            {
              "linkId": "/54126-8/54125-0/1/2",
              "text": "Name",
              "answer": [
                {
                  "valueString": "name 2"
                }
              ]
            },
            {
              "linkId": "/54126-8/54131-8/1/1",
              "text": "Gender",
              "answer": [
                {
                  "valueCoding": {
                    "system": "http://loinc.org",
                    "code": "LA2-8",
                    "display": "Male"
                  }
                }
              ]
            },
            {
              "linkId": "/54126-8/21112-8/1/1",
              "text": "Date of Birth",
              "answer": [
                {
                  "valueDateTime": "2016-10-27T00:00:00-04:00"
                }
              ]
            },
            {
              "linkId": "/54126-8/8302-2/1/1",
              "text": "Height",
              "answer": [
                {
                  "valueQuantity": {
                    "value": 70,
                    "unit": "inches",
                    "system": "http://unitsofmeasure.org",
                    "code": "inches"
                  }
                }
              ]
            },
            {
              "linkId": "/54126-8/29463-7/1/1",
              "text": "Weight",
              "answer": [
                {
                  "valueQuantity": {
                    "value": 170,
                    "unit": "lbs",
                    "system": "http://unitsofmeasure.org",
                    "code": "lbs"
                  }
                }
              ]
            },
            {
              "linkId": "/54126-8/39156-5/1/1",
              "text": "Mock-up item: Body mass index (BMI) [Ratio]",
              "answer": [
                {
                  "valueString": "24.39"
                }
              ]
            },
            {
              "linkId": "/54126-8/54134-2/1/1",
              "text": "Race",
              "answer": [
                {
                  "valueCoding": {
                    "system": "http://loinc.org",
                    "code": "LA10608-0",
                    "display": "American Indian or Alaska Native"
                  }
                },
                {
                  "valueCoding": {
                    "system": "http://loinc.org",
                    "code": "LA6156-9",
                    "display": "Asian"
                  }
                }
              ]
            },
            {
              "linkId": "/54126-8/54137-5/1/1",
              "text": "Your diseases history",
              "item": [
                {
                  "linkId": "/54126-8/54137-5/54140-9/1/1/1",
                  "text": "Disease or Condition",
                  "answer": [
                    {
                      "valueCoding": {
                        "system": "http://loinc.org",
                        "code": "LA10533-0",
                        "display": "Blood Clots"
                      }
                    }
                  ]
                },
                {
                  "linkId": "/54126-8/54137-5/54130-0/1/1/1",
                  "text": "Age at Diagnosis",
                  "answer": [
                    {
                      "valueCoding": {
                        "system": "http://loinc.org",
                        "code": "LA10403-6",
                        "display": "Newborn"
                      }
                    }
                  ]
                }
              ]
            },
            {
              "linkId": "/54126-8/54137-5/1/2",
              "text": "Your diseases history",
              "item": [
                {
                  "linkId": "/54126-8/54137-5/54140-9/1/2/1",
                  "text": "Disease or Condition",
                  "answer": [
                    {
                      "valueCoding": {
                        "system": "http://loinc.org",
                        "code": "LA10572-8",
                        "display": "-- Blood Clot in Leg"
                      }
                    }
                  ]
                },
                {
                  "linkId": "/54126-8/54137-5/54130-0/1/2/1",
                  "text": "Age at Diagnosis",
                  "answer": [
                    {
                      "valueCoding": {
                        "system": "http://loinc.org",
                        "code": "LA10394-7",
                        "display": "Infancy"
                      }
                    }
                  ]
                }
              ]
            }
          ]
        }
      ]
    };
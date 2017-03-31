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
      "source": {
        "reference": "LHC-LForms"
      },
      "author": {
        "reference": "LHC-LForms"
      },
      "authored": "2017-03-16T16:36:17-04:00",
      "questionnaire": {
        "reference": "http://hl7.org/fhir/us/sdc/Questionnaire/54127-6N"
      },
      "meta": {
        "profile": [
          "http://hl7.org/fhir/us/sdc/StructureDefinition/sdc-response"
        ],
        "title": "USSG-FHT, (with mock-up items for skip logic demo)"
      },
      "item": [
        {
          "linkId": "/54126-8/1",
          "text": "Your health information",
          "header": true,
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
                    "code": "LA3-6",
                    "display": "Female"
                  }
                }
              ]
            },
            {
              "linkId": "/54126-8/21112-8/1/1",
              "text": "Date of Birth",
              "answer": [
                {
                  "valueDate": "2014-06-20T00:00:00-04:00"
                }
              ]
            },
            {
              "linkId": "/54126-8/54132-6/1/1",
              "text": "Were you born a twin?",
              "answer": [
                {
                  "valueCoding": {
                    "code": "LA10428-3",
                    "display": "Yes - Fraternal (Different)"
                  }
                }
              ]
            },
            {
              "linkId": "/54126-8/54135-9/1/1",
              "text": "Are your parents related to each other in any way other than marriage?",
              "answer": [
                {
                  "valueCoding": {
                    "code": "LA32-8",
                    "display": "No"
                  }
                }
              ]
            },
            {
              "linkId": "/54126-8/8302-2/1/1",
              "text": "Height",
              "answer": [
                {
                  "valueQuantity": {
                    "value": 170,
                    "unit": "centimeters",
                    "system": "http://unitsofmeasure.org",
                    "code": "centimeters"
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
                    "value": 140,
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
                  "valueString": "21.97"
                }
              ]
            },
            {
              "linkId": "/54126-8/54134-2/1/1",
              "text": "Race",
              "answer": [
                {
                  "valueCoding": {
                    "code": "LA10608-0",
                    "display": "American Indian or Alaska Native"
                  }
                },
                {
                  "valueCoding": {
                    "code": "LA6156-9",
                    "display": "Asian"
                  }
                }
              ]
            },
            {
              "linkId": "/54126-8/54133-4/1/1",
              "text": "Ethnicity",
              "answer": [
                {
                  "valueCoding": {
                    "code": "LA6214-6",
                    "display": "Hispanic or Latino"
                  }
                },
                {
                  "valueCoding": {
                    "code": "LA10599-1",
                    "display": "-- Central American"
                  }
                },
                {
                  "valueCoding": {
                    "code": "LA10600-7",
                    "display": "-- Cuban"
                  }
                }
              ]
            },
            {
              "linkId": "/54126-8/54137-5/1/1",
              "text": "Your diseases history",
              "header": true,
              "item": [
                {
                  "linkId": "/54126-8/54137-5/54140-9/1/1/1",
                  "text": "Disease or Condition",
                  "answer": [
                    {
                      "valueCoding": {
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
                        "code": "LA10394-7",
                        "display": "Infancy"
                      }
                    }
                  ]
                }
              ]
            },
            {
              "linkId": "/54126-8/54137-5/1/2",
              "text": "Your diseases history",
              "header": true,
              "item": [
                {
                  "linkId": "/54126-8/54137-5/54140-9/1/2/1",
                  "text": "Disease or Condition",
                  "answer": [
                    {
                      "valueCoding": {
                        "code": "LA10524-9",
                        "display": "Cancer"
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
                        "code": "LA10398-8",
                        "display": "40-49"
                      }
                    }
                  ]
                }
              ]
            }
          ]
        },
        {
          "linkId": "/54114-4/1",
          "text": "Family member health information",
          "header": true,
          "item": [
            {
              "linkId": "/54114-4/54136-7/1/1",
              "text": "Relationship to you",
              "answer": [
                {
                  "valueCoding": {
                    "code": "LA10408-5",
                    "display": "Half-brother"
                  }
                }
              ]
            },
            {
              "linkId": "/54114-4/54123-5/1/1",
              "text": "Gender",
              "answer": [
                {
                  "valueCoding": {
                    "code": "LA3-6",
                    "display": "Female"
                  }
                }
              ]
            },
            {
              "linkId": "/54114-4/54119-3/1/1",
              "text": "Race",
              "answer": [
                {
                  "valueCoding": {
                    "code": "LA10608-0",
                    "display": "American Indian or Alaska Native"
                  }
                },
                {
                  "valueCoding": {
                    "code": "LA6156-9",
                    "display": "Asian"
                  }
                }
              ]
            },
            {
              "linkId": "/54114-4/54120-1/1/1",
              "text": "Ethnicity",
              "answer": [
                {
                  "valueCoding": {
                    "code": "LA10599-1",
                    "display": "-- Central American"
                  }
                },
                {
                  "valueCoding": {
                    "code": "LA10600-7",
                    "display": "-- Cuban"
                  }
                },
                {
                  "valueCoding": {
                    "code": "LA10602-3",
                    "display": "-- Mexican"
                  }
                }
              ]
            },
            {
              "linkId": "/54114-4/54117-7/1/1",
              "text": "This family member's history of disease",
              "header": true,
              "item": [
                {
                  "linkId": "/54114-4/54117-7/54116-9/1/1/1",
                  "text": "Disease or Condition",
                  "answer": [
                    {
                      "valueCoding": {
                        "code": "LA10533-0",
                        "display": "Blood Clots"
                      }
                    }
                  ]
                }
              ]
            },
            {
              "linkId": "/54114-4/54117-7/1/2",
              "text": "This family member's history of disease",
              "header": true,
              "item": [
                {
                  "linkId": "/54114-4/54117-7/54116-9/1/2/1",
                  "text": "Disease or Condition",
                  "answer": [
                    {
                      "valueCoding": {
                        "code": "LA10572-8",
                        "display": "-- Blood Clot in Leg"
                      }
                    }
                  ]
                }
              ]
            }
          ]
        },
        {
          "linkId": "/54114-4/2",
          "text": "Family member health information",
          "header": true,
          "item": [
            {
              "linkId": "/54114-4/54136-7/2/1",
              "text": "Relationship to you",
              "answer": [
                {
                  "valueCoding": {
                    "code": "LA10409-3",
                    "display": "Half-sister"
                  }
                }
              ]
            },
            {
              "linkId": "/54114-4/54119-3/2/1",
              "text": "Race",
              "answer": [
                {
                  "valueCoding": {
                    "code": "LA10608-0",
                    "display": "American Indian or Alaska Native"
                  }
                }
              ]
            },
            {
              "linkId": "/54114-4/54120-1/2/1",
              "text": "Ethnicity",
              "answer": [
                {
                  "valueCoding": {
                    "code": "LA6214-6",
                    "display": "Hispanic or Latino"
                  }
                }
              ]
            },
            {
              "linkId": "/54114-4/54117-7/2/1",
              "text": "This family member's history of disease",
              "header": true,
              "item": [
                {
                  "linkId": "/54114-4/54117-7/54116-9/2/1/1",
                  "text": "Disease or Condition",
                  "answer": [
                    {
                      "valueCoding": {
                        "code": "LA10524-9",
                        "display": "Cancer"
                      }
                    }
                  ]
                },
                {
                  "linkId": "/54114-4/54117-7/8302-2/2/1/1",
                  "text": "Mock-up item: Height",
                  "answer": [
                    {
                      "valueQuantity": {
                        "value": 12,
                        "unit": "inches",
                        "system": "http://unitsofmeasure.org",
                        "code": "inches"
                      }
                    }
                  ]
                },
                {
                  "linkId": "/54114-4/54117-7/29463-7/2/1/1",
                  "text": "Mock-up item: Weight",
                  "answer": [
                    {
                      "valueQuantity": {
                        "value": 23,
                        "unit": "kgs",
                        "system": "http://unitsofmeasure.org",
                        "code": "kgs"
                      }
                    }
                  ]
                },
                {
                  "linkId": "/54114-4/54117-7/39156-5/2/1/1",
                  "text": "Mock-up item: Body mass index (BMI) [Ratio]",
                  "answer": [
                    {
                      "valueString": "247.57"
                    }
                  ]
                }
              ]
            },
            {
              "linkId": "/54114-4/54117-7/2/2",
              "text": "This family member's history of disease",
              "header": true,
              "item": [
                {
                  "linkId": "/54114-4/54117-7/54116-9/2/2/1",
                  "text": "Disease or Condition",
                  "answer": [
                    {
                      "valueCoding": {
                        "code": "LA10549-6",
                        "display": "-- Bone"
                      }
                    }
                  ]
                },
                {
                  "linkId": "/54114-4/54117-7/8302-2/2/2/1",
                  "text": "Mock-up item: Height",
                  "answer": [
                    {
                      "valueQuantity": {
                        "value": 170,
                        "unit": "centimeters",
                        "system": "http://unitsofmeasure.org",
                        "code": "centimeters"
                      }
                    }
                  ]
                },
                {
                  "linkId": "/54114-4/54117-7/29463-7/2/2/1",
                  "text": "Mock-up item: Weight",
                  "answer": [
                    {
                      "valueQuantity": {
                        "value": 46,
                        "unit": "lbs",
                        "system": "http://unitsofmeasure.org",
                        "code": "lbs"
                      }
                    }
                  ]
                },
                {
                  "linkId": "/54114-4/54117-7/39156-5/2/2/1",
                  "text": "Mock-up item: Body mass index (BMI) [Ratio]",
                  "answer": [
                    {
                      "valueString": "7.22"
                    }
                  ]
                }
              ]
            },
            {
              "linkId": "/54114-4/54117-7/2/3",
              "text": "This family member's history of disease",
              "header": true,
              "item": [
                {
                  "linkId": "/54114-4/54117-7/54116-9/2/3/1",
                  "text": "Disease or Condition",
                  "answer": [
                    {
                      "valueCoding": {
                        "code": "LA10537-1",
                        "display": "-- Colon Cancer"
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
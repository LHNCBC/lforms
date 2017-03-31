// Existing sample data from FHIR
// Not used
var sdcUSSGFHT=
{
  "resourceType": "Bundle",
  "id": "questionnaire-sdc-profile-example-ussg-fht",
  "type": "transaction",
  "entry": [
    {
      "fullUrl": "http://hl7.org/fhir/us/sdc/ConceptMap/ussgfht-loincde",
      "resource": {
        "resourceType": "ConceptMap",
        "id": "ussgfht-loincde",
        "status": "active",
        "sourceUri": "http://hl7.org/fhir/us/sdc/Questionnaire/54127-6",
        "targetUri": "http://hl7.org/fhir/us/sdc/DataElement",
        "group": [
          {
            "source": "http://hl7.org/fhir",
            "target": "http://loinc.org",
            "element": [
              {
                "code": "1.1.1",
                "target": [
                  {
                    "code": "54125-0"
                  }
                ]
              },
              {
                "code": "1.1.2",
                "target": [
                  {
                    "code": "54131-8"
                  }
                ]
              },
              {
                "code": "1.1.3",
                "target": [
                  {
                    "code": "21112-8"
                  }
                ]
              },
              {
                "code": "1.1.4",
                "target": [
                  {
                    "code": "54132-6"
                  }
                ]
              },
              {
                "code": "1.1.5",
                "target": [
                  {
                    "code": "54128-4"
                  }
                ]
              },
              {
                "code": "1.1.6",
                "target": [
                  {
                    "code": "54135-9"
                  }
                ]
              },
              {
                "code": "1.1.7",
                "target": [
                  {
                    "code": "8302-2"
                  }
                ]
              },
              {
                "code": "1.1.8",
                "target": [
                  {
                    "code": "29463-7"
                  }
                ]
              },
              {
                "code": "1.1.10",
                "target": [
                  {
                    "code": "54134-2"
                  }
                ]
              },
              {
                "code": "1.1.11",
                "target": [
                  {
                    "code": "54133-4"
                  }
                ]
              },
              {
                "code": "1.2.1",
                "target": [
                  {
                    "code": "54140-9"
                  }
                ]
              },
              {
                "code": "1.2.2",
                "target": [
                  {
                    "code": "54130-0"
                  }
                ]
              },
              {
                "code": "2.1.1.1",
                "target": [
                  {
                    "code": "54136-7"
                  }
                ]
              },
              {
                "code": "2.1.1.2",
                "target": [
                  {
                    "code": "54138-3"
                  }
                ]
              },
              {
                "code": "2.1.1.3",
                "target": [
                  {
                    "code": "54123-5"
                  }
                ]
              },
              {
                "code": "2.1.1.4",
                "target": [
                  {
                    "code": "54139-1"
                  }
                ]
              },
              {
                "code": "2.1.1.4.1.1",
                "target": [
                  {
                    "code": "54112-8"
                  }
                ]
              },
              {
                "code": "2.1.1.4.1.2",
                "target": [
                  {
                    "code": "54113-6"
                  }
                ]
              },
              {
                "code": "2.1.1.4.2.1",
                "target": [
                  {
                    "code": "54124-3"
                  }
                ]
              },
              {
                "code": "2.1.1.4.2.2",
                "target": [
                  {
                    "code": "54141-7"
                  }
                ]
              },
              {
                "code": "2.1.1.5",
                "target": [
                  {
                    "code": "54121-9"
                  }
                ]
              },
              {
                "code": "2.1.1.6",
                "target": [
                  {
                    "code": "54122-7"
                  }
                ]
              },
              {
                "code": "2.1.1.7",
                "target": [
                  {
                    "code": "54119-3"
                  }
                ]
              },
              {
                "code": "2.1.1.8",
                "target": [
                  {
                    "code": "54120-1"
                  }
                ]
              },
              {
                "code": "2.1.2.1",
                "target": [
                  {
                    "code": "54116-9"
                  }
                ]
              },
              {
                "code": "2.1.2.2",
                "target": [
                  {
                    "code": "54115-1"
                  }
                ]
              }
            ]
          }
        ]
      },
      "request": {
        "method": "PUT",
        "url": "http://hl7.org/fhir/us/sdc/ConceptMap/ussgfht-loincde"
      }
    },
    {
      "fullUrl": "http://hl7.org/fhir/us/sdc/Questionnaire/54127-6",
      "resource": {
        "resourceType": "Questionnaire",
        "id": "54127-6",
        "meta": {
          "profile": [
            "http://hl7.org/fhir/us/sdc/StructureDefinition/sdc-questionnaire"
          ]
        },
        "contained": [
          {
            "resourceType": "ValueSet",
            "id": "length",
            "meta": {
              "profile": [
                "http://hl7.org/fhir/us/sdc/StructureDefinition/sdc-valueset"
              ]
            },
            "name": "Length Units",
            "status": "active",
            "description": "Length units",
            "immutable": true,
            "extensible": false,
            "compose": {
              "include": [
                {
                  "system": "http://unitsofmeasure.org",
                  "concept": [
                    {
                      "code": "[in_i]",
                      "display": "inches"
                    },
                    {
                      "code": "cm",
                      "display": "centimeters"
                    }
                  ]
                }
              ]
            }
          },
          {
            "resourceType": "ValueSet",
            "id": "weight",
            "meta": {
              "profile": [
                "http://hl7.org/fhir/us/sdc/StructureDefinition/sdc-valueset"
              ]
            },
            "name": "Weight Units",
            "status": "active",
            "description": "Weight units",
            "immutable": true,
            "extensible": false,
            "compose": {
              "include": [
                {
                  "system": "http://unitsofmeasure.org",
                  "concept": [
                    {
                      "code": "[lb_i]",
                      "display": "pounds"
                    },
                    {
                      "code": "km",
                      "display": "kilograms"
                    }
                  ]
                }
              ]
            }
          }
        ],
        "url": "http://hl7.org/fhir/us/sdc/Questionnaire/54127-6",
        "identifier": [
          {
            "system": "http://example.org/panel-id",
            "value": "54127-6"
          }
        ],
        "status": "published",
        "date": "2015",
        "publisher": "Regenstrief Institute, Inc and the LOINC Committee",
        "title": "US Surgeon General - Family Health Portrait",
        "concept": [
          {
            "code": "54127-6H",
            "display": "US Surgeon General family health portrait [USSG-FHT]"
          }
        ],
        "subjectType": [
          "Patient"
        ],
        "item": [
          {
            "linkId": "0",
            "type": "group",
            "item": [
              {
                "linkId": "0.1",
                "text": "Date Done",
                "type": "date"
              },
              {
                "linkId": "0.2",
                "text": "Time Done",
                "type": "time"
              },
              {
                "linkId": "0.3",
                "text": "Where Done",
                "type": "string"
              },
              {
                "linkId": "0.4",
                "text": "Comment",
                "type": "string"
              }
            ]
          },
          {
            "linkId": "1",
            "concept": [
              {
                "system": "http://loinc.org",
                "code": "54126-8",
                "display": "My health history [USSG-FHT]"
              }
            ],
            "text": "Your health information",
            "type": "group",
            "required": true,
            "item": [
              {
                "linkId": "1.1",
                "type": "group",
                "item": [
                  {
                    "linkId": "1.1.1",
                    "concept": [
                      {
                        "system": "http://loinc.org",
                        "code": "54125-0",
                        "display": "Name"
                      }
                    ],
                    "text": "Name",
                    "type": "string"
                  },
                  {
                    "linkId": "1.1.2",
                    "concept": [
                      {
                        "system": "http://loinc.org",
                        "code": "54131-8",
                        "display": "Sex [USSG-FHT]"
                      }
                    ],
                    "text": "Gender",
                    "type": "choice",
                    "required": true,
                    "options": {
                      "reference": "http://hl7.org/fhir/us/sdc/ValueSet/LL1-9",
                      "display": "Gender_M/F"
                    },
                    "item": [
                      {
                        "linkId": "1.1.2.1.1",
                        "text": "Please specify",
                        "type": "string",
                        "required": true
                      }
                    ]
                  },
                  {
                    "linkId": "1.1.3",
                    "concept": [
                      {
                        "system": "http://loinc.org",
                        "code": "21112-8",
                        "display": "Birth Date"
                      }
                    ],
                    "text": "Date of Birth",
                    "type": "date"
                  },
                  {
                    "linkId": "1.1.4",
                    "concept": [
                      {
                        "system": "http://loinc.org",
                        "code": "54132-6",
                        "display": "Twin"
                      }
                    ],
                    "text": "Were you born a twin?",
                    "type": "choice",
                    "options": {
                      "reference": "http://hl7.org/fhir/us/sdc/ValueSet/LL623-0",
                      "display": "USSG-FHT twin"
                    }
                  },
                  {
                    "linkId": "1.1.5",
                    "concept": [
                      {
                        "system": "http://loinc.org",
                        "code": "54128-4"
                      }
                    ],
                    "text": "Were you adopted?",
                    "type": "choice",
                    "options": {
                      "reference": "http://hl7.org/fhir/us/sdc/ValueSet/LL361-7",
                      "display": "Y/N1"
                    }
                  },
                  {
                    "linkId": "1.1.6",
                    "concept": [
                      {
                        "system": "http://loinc.org",
                        "code": "54135-9",
                        "display": "Parents related [USSG-FHT]"
                      }
                    ],
                    "text": "Are your parents related to each other in any way other than marriage?",
                    "type": "choice",
                    "options": {
                      "reference": "http://hl7.org/fhir/us/sdc/ValueSet/LL361-7",
                      "display": "Y/N1"
                    }
                  },
                  {
                    "linkId": "1.1.7",
                    "concept": [
                      {
                        "system": "http://loinc.org",
                        "code": "8302-2",
                        "display": "Body height"
                      }
                    ],
                    "text": "Height",
                    "type": "decimal",
                    "required": true,
                    "item": [
                      {
                        "linkId": "1.1.7.1.1",
                        "text": "Units",
                        "type": "choice",
                        "options": {
                          "reference": "#length"
                        }
                      },
                      {
                        "linkId": "1.1.7.2.1",
                        "concept": [
                          {
                            "system": "http://loinc.org",
                            "code": "8302-2"
                          }
                        ],
                        "text": "Mock-up item: Shown when Height >= 10",
                        "type": "string"
                      }
                    ]
                  },
                  {
                    "linkId": "1.1.8",
                    "concept": [
                      {
                        "system": "http://loinc.org",
                        "code": "29463-7",
                        "display": "Body weight"
                      }
                    ],
                    "text": "Weight",
                    "type": "decimal",
                    "item": [
                      {
                        "linkId": "1.1.8.1.1",
                        "text": "Units",
                        "type": "choice",
                        "options": {
                          "reference": "#weight"
                        }
                      }
                    ]
                  },
                  {
                    "linkId": "1.1.9",
                    "concept": [
                      {
                        "system": "http://loinc.org",
                        "code": "39156-5",
                        "display": "Body mass index (BMI) [Ratio]"
                      }
                    ],
                    "text": "Body mass index (BMI) [Ratio]",
                    "type": "decimal"
                  },
                  {
                    "linkId": "1.1.10",
                    "concept": [
                      {
                        "system": "http://loinc.org",
                        "code": "54134-2",
                        "display": "Race [USSG-FHT]"
                      }
                    ],
                    "text": "Race",
                    "type": "choice",
                    "required": true,
                    "options": {
                      "reference": "http://hl7.org/fhir/us/sdc/ValueSet/LL629-7",
                      "display": "USSG-FHT race"
                    }
                  },
                  {
                    "linkId": "1.1.11",
                    "concept": [
                      {
                        "system": "http://loinc.org",
                        "code": "54133-4",
                        "display": "Ethnicity [USSG-FHT]"
                      }
                    ],
                    "text": "Ethnicity",
                    "type": "choice",
                    "repeats": true,
                    "options": {
                      "reference": "http://hl7.org/fhir/us/sdc/ValueSet/LL628-9",
                      "display": "USSG-FHT ethnicity"
                    }
                  }
                ]
              },
              {
                "linkId": "1.2",
                "concept": [
                  {
                    "system": "http://loinc.org",
                    "code": "54137-5",
                    "display": "Diseases history panel [USSG-FHT]"
                  }
                ],
                "text": "Your diseases history",
                "type": "group",
                "repeats": true,
                "item": [
                  {
                    "linkId": "1.2.1",
                    "concept": [
                      {
                        "system": "http://loinc.org",
                        "code": "54140-9",
                        "display": "History of diseases [USSG-FHT]"
                      }
                    ],
                    "text": "Disease or Condition",
                    "type": "choice",
                    "options": {
                      "reference": "http://hl7.org/fhir/us/sdc/ValueSet/LL626-3",
                      "display": "USSG-FHT diseases"
                    }
                  },
                  {
                    "linkId": "1.2.2",
                    "concept": [
                      {
                        "system": "http://loinc.org",
                        "code": "54130-0",
                        "display": "Age range at onset of disease [USSG-FHT]"
                      }
                    ],
                    "text": "Age at Diagnosis",
                    "type": "choice",
                    "options": {
                      "reference": "http://hl7.org/fhir/us/sdc/ValueSet/LL619-8",
                      "display": "USSG-FHT age"
                    }
                  }
                ]
              }
            ]
          },
          {
            "linkId": "2",
            "concept": [
              {
                "system": "http://loinc.org",
                "code": "54114-4",
                "display": "Family member health history [USSG-FHT] family member"
              }
            ],
            "text": "Family member health information",
            "type": "group",
            "repeats": true,
            "item": [
              {
                "linkId": "2.1",
                "type": "group",
                "item": [
                  {
                    "linkId": "2.1.1",
                    "type": "group",
                    "item": [
                      {
                        "linkId": "2.1.1.1",
                        "concept": [
                          {
                            "system": "http://loinc.org",
                            "code": "54136-7",
                            "display": "Relationship to patient family member [USSG-FHT]"
                          }
                        ],
                        "text": "Relationship to you",
                        "type": "choice",
                        "options": {
                          "reference": "http://hl7.org/fhir/us/sdc/ValueSet/LL621-4",
                          "display": "USSG-FHT relationship"
                        }
                      },
                      {
                        "linkId": "2.1.1.2",
                        "concept": [
                          {
                            "system": "http://loinc.org",
                            "code": "54138-3",
                            "display": "Name family member"
                          }
                        ],
                        "text": "Name",
                        "type": "string"
                      },
                      {
                        "linkId": "2.1.1.3",
                        "concept": [
                          {
                            "system": "http://loinc.org",
                            "code": "54123-5",
                            "display": "Sex family member [USSG-FHT]"
                          }
                        ],
                        "text": "Gender",
                        "type": "choice",
                        "options": {
                          "reference": "http://hl7.org/fhir/us/sdc/ValueSet/LL1-9",
                          "display": "Gender_M/F"
                        },
                        "item": [
                          {
                            "linkId": "2.1.1.3.1.1",
                            "text": "Please specify",
                            "type": "string",
                            "required": true
                          }
                        ]
                      },
                      {
                        "linkId": "2.1.1.4",
                        "concept": [
                          {
                            "system": "http://loinc.org",
                            "code": "54139-1",
                            "display": "Living family member"
                          }
                        ],
                        "text": "Living?",
                        "type": "choice",
                        "options": {
                          "reference": "LL361-7",
                          "display": "Y/N1"
                        },
                        "item": [
                          {
                            "linkId": "2.1.1.4.1",
                            "type": "group",
                            "item": [
                              {
                                "linkId": "2.1.1.4.1.1",
                                "concept": [
                                  {
                                    "system": "http://loinc.org",
                                    "code": "54112-8",
                                    "display": "Cause of death family member [USSG-FHT]"
                                  }
                                ],
                                "text": "Cause of Death",
                                "type": "choice",
                                "options": {
                                  "reference": "http://hl7.org/fhir/us/sdc/ValueSet/LL627-1"
                                },
                                "item": [
                                  {
                                    "linkId": "2.1.1.4.1.1.1",
                                    "text": "Please specify",
                                    "type": "string"
                                  }
                                ]
                              },
                              {
                                "linkId": "2.1.1.4.1.2",
                                "concept": [
                                  {
                                    "system": "http://loinc.org",
                                    "code": "54113-6",
                                    "display": "Age range at death family member [USSG-FHT]"
                                  }
                                ],
                                "text": "Age at Death",
                                "type": "choice",
                                "options": {
                                  "reference": "http://hl7.org/fhir/us/sdc/ValueSet/LL619-8",
                                  "display": "USSG-FHT age"
                                }
                              }
                            ]
                          },
                          {
                            "linkId": "2.1.1.4.2",
                            "type": "group",
                            "item": [
                              {
                                "linkId": "2.1.1.4.2.1",
                                "concept": [
                                  {
                                    "system": "http://loinc.org",
                                    "code": "54124-3",
                                    "display": "Birth date family member"
                                  }
                                ],
                                "text": "Date of Birth",
                                "type": "date"
                              },
                              {
                                "linkId": "2.1.1.4.2.2",
                                "concept": [
                                  {
                                    "system": "http://loinc.org",
                                    "code": "54141-7",
                                    "display": "Current age family member [USSG-FHT]"
                                  }
                                ],
                                "text": "Age",
                                "type": "decimal"
                              }
                            ]
                          }
                        ]
                      },
                      {
                        "linkId": "2.1.1.5",
                        "concept": [
                          {
                            "system": "http://loinc.org",
                            "code": "54121-9",
                            "display": "Twin family member"
                          }
                        ],
                        "text": "Was this person born a twin?",
                        "type": "choice",
                        "options": {
                          "reference": "http://hl7.org/fhir/us/sdc/ValueSet/LL623-0"
                        }
                      },
                      {
                        "linkId": "2.1.1.6",
                        "concept": [
                          {
                            "system": "http://loinc.org",
                            "code": "54122-7",
                            "display": "Adopted family member"
                          }
                        ],
                        "text": "Was this person adopted?",
                        "type": "choice",
                        "options": {
                          "reference": "http://hl7.org/fhir/us/sdc/ValueSet/LL623-0"
                        }
                      },
                      {
                        "linkId": "2.1.1.7",
                        "concept": [
                          {
                            "system": "http://loinc.org",
                            "code": "54119-3",
                            "display": "Race family member [USSG-FHT]"
                          }
                        ],
                        "text": "Race",
                        "type": "choice",
                        "repeats": true,
                        "options": {
                          "reference": "http://hl7.org/fhir/us/sdc/ValueSet/LL629-7",
                          "display": "USSG-FHT race"
                        }
                      },
                      {
                        "linkId": "2.1.1.8",
                        "concept": [
                          {
                            "system": "http://loinc.org",
                            "code": "54120-1",
                            "display": "Ethnicity family member [USSG-FHT]"
                          }
                        ],
                        "text": "Ethnicity",
                        "type": "choice",
                        "repeats": true,
                        "options": {
                          "reference": "http://hl7.org/fhir/us/sdc/ValueSet/LL628-9",
                          "display": "USSG-FHT ethnicity"
                        }
                      }
                    ]
                  },
                  {
                    "linkId": "2.1.2",
                    "concept": [
                      {
                        "system": "http://loinc.org",
                        "code": "54117-7",
                        "display": "Diseases history panel [USSG-FHT] family member"
                      }
                    ],
                    "text": "This family member's history of disease",
                    "type": "group",
                    "repeats": true,
                    "item": [
                      {
                        "linkId": "2.1.2.1",
                        "concept": [
                          {
                            "system": "http://loinc.org",
                            "code": "54116-9",
                            "display": "History of diseases family member [USSG-FHT]"
                          }
                        ],
                        "text": "Disease or Condition",
                        "type": "choice",
                        "required": true,
                        "options": {
                          "reference": "http://hl7.org/fhir/us/sdc/ValueSet/LL626-3",
                          "display": "USSG-FHT diseases"
                        }
                      },
                      {
                        "linkId": "2.1.2.2",
                        "concept": [
                          {
                            "system": "http://loinc.org",
                            "code": "54115-1",
                            "display": "Age range at onset of disease family member [USSG-FHT]"
                          }
                        ],
                        "text": "Age at Diagnosis",
                        "type": "choice",
                        "options": {
                          "reference": "http://hl7.org/fhir/us/sdc/ValueSet/LL619-8",
                          "display": "USSG-FHT age"
                        }
                      },
                      {
                        "linkId": "2.1.2.3",
                        "text": "Mock-up item: Height",
                        "type": "decimal"
                      },
                      {
                        "linkId": "2.1.2.4",
                        "text": "Mock-up item: Weight",
                        "type": "decimal"
                      },
                      {
                        "linkId": "2.1.2.5",
                        "text": "Mock-up item: BMI",
                        "type": "decimal"
                      }
                    ]
                  }
                ]
              }
            ]
          }
        ]
      },
      "request": {
        "method": "PUT",
        "url": "http://hl7.org/fhir/us/sdc/Questionnaire/54127-6"
      }
    },
    {
      "fullUrl": "http://hl7.org/fhir/us/sdc/ValueSet/LL1-9",
      "resource": {
        "resourceType": "ValueSet",
        "id": "LL1-9",
        "meta": {
          "profile": [
            "http://hl7.org/fhir/us/sdc/StructureDefinition/sdc-valueset"
          ]
        },
        "url": "http://details.loinc.org/AnswerList/LL1-9",
        "name": "Gender_M/F",
        "status": "active",
        "publisher": "Regenstrief Institute, Inc and the LOINC Committee",
        "description": "Male=1, Female=2",
        "immutable": true,
        "copyright": "Refer to https://loinc.org/terms-of-use",
        "extensible": false,
        "compose": {
          "include": [
            {
              "system": "http://loinc.org",
              "concept": [
                {
                  "code": "LA2-8",
                  "display": "Male"
                },
                {
                  "code": "LA3-6",
                  "display": "Female"
                },
                {
                  "code": "LA46-8",
                  "display": "Other"
                }
              ]
            }
          ]
        }
      },
      "request": {
        "method": "PUT",
        "url": "http://hl7.org/fhir/us/sdc/ValueSet/LL1-9"
      }
    },
    {
      "fullUrl": "http://hl7.org/fhir/us/sdc/ValueSet/LL623-0",
      "resource": {
        "resourceType": "ValueSet",
        "id": "LL623-0",
        "meta": {
          "profile": [
            "http://hl7.org/fhir/us/sdc/StructureDefinition/sdc-valueset"
          ]
        },
        "url": "http://details.loinc.org/AnswerList/LL623-0",
        "name": "USSG-FHT twin",
        "status": "active",
        "publisher": "Regenstrief Institute, Inc and the LOINC Committee",
        "description": "Family history tool twin",
        "immutable": true,
        "copyright": "Refer to https://loinc.org/terms-of-use",
        "extensible": false,
        "compose": {
          "include": [
            {
              "system": "http://loinc.org",
              "concept": [
                {
                  "code": "LA10427-5",
                  "display": "Yes - Identical (Same)"
                },
                {
                  "code": "LA10428-3",
                  "display": "Yes - Fraternal (Different)"
                },
                {
                  "code": "LA32-8",
                  "display": "No"
                }
              ]
            }
          ]
        }
      },
      "request": {
        "method": "PUT",
        "url": "http://hl7.org/fhir/us/sdc/ValueSet/LL623-0"
      }
    },
    {
      "fullUrl": "http://hl7.org/fhir/us/sdc/ValueSet/LL361-7",
      "resource": {
        "resourceType": "ValueSet",
        "id": "LL361-7",
        "meta": {
          "profile": [
            "http://hl7.org/fhir/us/sdc/StructureDefinition/sdc-valueset"
          ]
        },
        "url": "http://details.loinc.org/AnswerList/LL361-7",
        "name": "Y/N1",
        "status": "active",
        "publisher": "Regenstrief Institute, Inc and the LOINC Committee",
        "description": "Yes/No",
        "immutable": true,
        "copyright": "Refer to https://loinc.org/terms-of-use",
        "extensible": false,
        "compose": {
          "include": [
            {
              "system": "http://loinc.org",
              "concept": [
                {
                  "code": "LA33-6",
                  "display": "Yes"
                },
                {
                  "code": "LA32-8",
                  "display": "No"
                }
              ]
            }
          ]
        }
      },
      "request": {
        "method": "PUT",
        "url": "http://hl7.org/fhir/us/sdc/ValueSet/LL361-7"
      }
    },
    {
      "fullUrl": "http://hl7.org/fhir/us/sdc/ValueSet/LL629-7",
      "resource": {
        "resourceType": "ValueSet",
        "id": "LL629-7",
        "meta": {
          "profile": [
            "http://hl7.org/fhir/us/sdc/StructureDefinition/sdc-valueset"
          ]
        },
        "url": "http://details.loinc.org/AnswerList/LL629-7",
        "name": "USSG-FHT race",
        "status": "active",
        "publisher": "Regenstrief Institute, Inc and the LOINC Committee",
        "description": "Family history tool race",
        "immutable": true,
        "copyright": "Refer to https://loinc.org/terms-of-use",
        "extensible": false,
        "compose": {
          "include": [
            {
              "system": "http://loinc.org",
              "concept": [
                {
                  "code": "LA10608-0",
                  "display": "American  Indian or Alaska Native"
                },
                {
                  "code": "LA6156-9",
                  "display": "Asian"
                },
                {
                  "code": "LA10614-8",
                  "display": "-- Asian Indian"
                },
                {
                  "code": "LA10615-5",
                  "display": "-- Chinese"
                },
                {
                  "code": "LA10616-3",
                  "display": "-- Filipino"
                },
                {
                  "code": "LA10617-1",
                  "display": "-- Japanese"
                },
                {
                  "code": "LA10618-9",
                  "display": "-- Korean"
                },
                {
                  "code": "LA10620-5",
                  "display": "-- Vietnamese"
                },
                {
                  "code": "LA10619-7",
                  "display": "-- Other Asian"
                },
                {
                  "code": "LA10610-6",
                  "display": "Black or African American"
                },
                {
                  "code": "LA10611-4",
                  "display": "Native Hawaiian or Other Pacific Islander"
                },
                {
                  "code": "LA10623-9",
                  "display": "-- Native Hawaiian"
                },
                {
                  "code": "LA10622-1",
                  "display": "-- Guamanian"
                },
                {
                  "code": "LA10621-3",
                  "display": "-- Chamorro"
                },
                {
                  "code": "LA10625-4",
                  "display": "-- Samoan"
                },
                {
                  "code": "LA10624-7",
                  "display": "-- Other Pacific Islander"
                },
                {
                  "code": "LA4457-3",
                  "display": "White"
                },
                {
                  "code": "LA10613-0",
                  "display": "Other/Unknown/Refuse To Answer"
                }
              ]
            }
          ]
        }
      },
      "request": {
        "method": "PUT",
        "url": "http://hl7.org/fhir/us/sdc/ValueSet/LL629-7"
      }
    },
    {
      "fullUrl": "http://hl7.org/fhir/us/sdc/ValueSet/LL628-9",
      "resource": {
        "resourceType": "ValueSet",
        "id": "LL628-9",
        "meta": {
          "profile": [
            "http://hl7.org/fhir/us/sdc/StructureDefinition/sdc-valueset"
          ]
        },
        "url": "http://details.loinc.org/AnswerList/LL628-9",
        "name": "USSG-FHT ethnicity",
        "status": "active",
        "publisher": "Regenstrief Institute, Inc and the LOINC Committee",
        "description": "Family history tool ethnicity",
        "immutable": true,
        "copyright": "Refer to https://loinc.org/terms-of-use",
        "extensible": false,
        "compose": {
          "include": [
            {
              "system": "http://loinc.org",
              "concept": [
                {
                  "code": "LA6214-6",
                  "display": "Hispanic or Latino"
                },
                {
                  "code": "LA10599-1",
                  "display": "-- Central American"
                },
                {
                  "code": "LA10600-7",
                  "display": "-- Cuban"
                },
                {
                  "code": "LA10601-5",
                  "display": "-- Dominican(Republic)"
                },
                {
                  "code": "LA10602-3",
                  "display": "-- Mexican"
                },
                {
                  "code": "LA10605-6",
                  "display": "-- Puerto Rican"
                },
                {
                  "code": "LA10606-4",
                  "display": "-- South American"
                },
                {
                  "code": "LA10604-9",
                  "display": "-- Other Latin American"
                },
                {
                  "code": "LA10603-1",
                  "display": "-- Other Hispanic/Latino/Spanish"
                },
                {
                  "code": "LA10597-5",
                  "display": "Non-Hispanic or Latino"
                },
                {
                  "code": "LA10598-3",
                  "display": "Ashkenazi Jewish"
                },
                {
                  "code": "LA10607-2",
                  "display": "Unknown/No answer"
                }
              ]
            }
          ]
        }
      },
      "request": {
        "method": "PUT",
        "url": "http://hl7.org/fhir/us/sdc/ValueSet/LL628-9"
      }
    },
    {
      "fullUrl": "http://hl7.org/fhir/us/sdc/ValueSet/LL626-3",
      "resource": {
        "resourceType": "ValueSet",
        "id": "LL626-3",
        "meta": {
          "profile": [
            "http://hl7.org/fhir/us/sdc/StructureDefinition/sdc-valueset"
          ]
        },
        "url": "http://details.loinc.org/AnswerList/LL626-3",
        "name": "USSG-FHT diseases",
        "status": "active",
        "publisher": "Regenstrief Institute, Inc and the LOINC Committee",
        "description": "Family history tool diseases",
        "immutable": true,
        "copyright": "Refer to https://loinc.org/terms-of-use",
        "extensible": false,
        "compose": {
          "include": [
            {
              "system": "http://loinc.org",
              "concept": [
                {
                  "code": "LA10533-0",
                  "display": "Blood Clots"
                },
                {
                  "code": "LA10572-8",
                  "display": "-- Blood Clot in Leg"
                },
                {
                  "code": "LA10573-6",
                  "display": "-- Blood Clot in Lungs"
                },
                {
                  "code": "LA10524-9",
                  "display": "Cancer"
                },
                {
                  "code": "LA10549-6",
                  "display": "-- Bone"
                },
                {
                  "code": "LA10536-3",
                  "display": "-- Breast Cancer"
                },
                {
                  "code": "LA10537-1",
                  "display": "-- Colon Cancer"
                },
                {
                  "code": "LA10548-8",
                  "display": "-- Esophageal Cancer"
                },
                {
                  "code": "LA10547-0",
                  "display": "-- Gastric Cancer"
                },
                {
                  "code": "LA10541-3",
                  "display": "-- Kidney Cancer"
                },
                {
                  "code": "LA10545-4",
                  "display": "-- Leukemia"
                },
                {
                  "code": "LA10542-1",
                  "display": "-- Lung Cancer"
                },
                {
                  "code": "LA10546-2",
                  "display": "-- Muscle Cancer"
                },
                {
                  "code": "LA10539-7",
                  "display": "-- Ovarian Cancer"
                },
                {
                  "code": "LA10538-9",
                  "display": "-- Prostate Cancer"
                },
                {
                  "code": "LA10543-9",
                  "display": "-- Skin Cancer"
                },
                {
                  "code": "LA10540-5",
                  "display": "-- Thyroid Cancer"
                },
                {
                  "code": "LA10544-7",
                  "display": "-- Uterine Cancer"
                },
                {
                  "code": "LA10550-4",
                  "display": "-- Other Cancer"
                },
                {
                  "code": "LA10529-8",
                  "display": "Diabetes"
                },
                {
                  "code": "LA10551-2",
                  "display": "-- Diabetes Type 1"
                },
                {
                  "code": "LA10552-0",
                  "display": "-- Diabetes Type 2"
                },
                {
                  "code": "LA10553-8",
                  "display": "-- Gestational Diabetes"
                },
                {
                  "code": "LA10532-2",
                  "display": "Gastrointestinal Disease"
                },
                {
                  "code": "LA10554-6",
                  "display": "-- Crohn's Disease"
                },
                {
                  "code": "LA10555-3",
                  "display": "-- Irritable Bowel Syndrome"
                },
                {
                  "code": "LA10556-1",
                  "display": "-- Ulceritive Colitis"
                },
                {
                  "code": "LA10557-9",
                  "display": "-- Colon Polyps"
                },
                {
                  "code": "LA10523-1",
                  "display": "Heart Disease"
                },
                {
                  "code": "LA10558-7",
                  "display": "-- Heart Attack"
                },
                {
                  "code": "LA10526-4",
                  "display": "High Cholesterol/Hyperlipidemia"
                },
                {
                  "code": "LA7444-8",
                  "display": "Hypertension"
                },
                {
                  "code": "LA10528-0",
                  "display": "Kidney Disease"
                },
                {
                  "code": "LA10565-2",
                  "display": "-- Cystic Kidney Disease"
                },
                {
                  "code": "LA10566-0",
                  "display": "-- Kidney Disease Present From Birth"
                },
                {
                  "code": "LA10567-8",
                  "display": "-- Nephrosis"
                },
                {
                  "code": "LA10568-6",
                  "display": "-- Nephritis"
                },
                {
                  "code": "LA10569-4",
                  "display": "-- Nephrotic Syndrome"
                },
                {
                  "code": "LA10570-2",
                  "display": "-- Diabetic Kidney Disease"
                },
                {
                  "code": "LA10571-0",
                  "display": "-- Other/Unknown"
                },
                {
                  "code": "LA10531-4",
                  "display": "Lung Disease"
                },
                {
                  "code": "LA10559-5",
                  "display": "-- COPD"
                },
                {
                  "code": "LA10560-3",
                  "display": "-- Chronic Bronchitis"
                },
                {
                  "code": "LA10561-1",
                  "display": "-- Emphysema"
                },
                {
                  "code": "LA10562-9",
                  "display": "-- Chronic Lower Respiratory Disease"
                },
                {
                  "code": "LA10563-7",
                  "display": "-- Influenza/Pneumonia"
                },
                {
                  "code": "LA10564-5",
                  "display": "-- Asthma"
                },
                {
                  "code": "LA10590-0",
                  "display": "Neurological Disorders"
                },
                {
                  "code": "LA10527-2",
                  "display": "Osteoporosis"
                },
                {
                  "code": "LA10535-5",
                  "display": "Psychological Disorders"
                },
                {
                  "code": "LA10574-4",
                  "display": "-- Anxiety"
                },
                {
                  "code": "LA10575-1",
                  "display": "-- Bipolar/Manic Depressive Disorder"
                },
                {
                  "code": "LA10576-9",
                  "display": "-- Depression"
                },
                {
                  "code": "LA10577-7",
                  "display": "-- Attention Deficit Hyper Activity"
                },
                {
                  "code": "LA10578-5",
                  "display": "-- Autism"
                },
                {
                  "code": "LA10579-3",
                  "display": "-- Personality Disorder"
                },
                {
                  "code": "LA10580-1",
                  "display": "-- Eating Disorder"
                },
                {
                  "code": "LA10581-9",
                  "display": "-- Obsessive Compulsive Disorder"
                },
                {
                  "code": "LA10582-7",
                  "display": "-- Panic Disorder"
                },
                {
                  "code": "LA10583-5",
                  "display": "-- Post Traumatic Stress Disorder"
                },
                {
                  "code": "LA10584-3",
                  "display": "-- Schizophrenia"
                },
                {
                  "code": "LA10585-0",
                  "display": "-- Social Phobia"
                },
                {
                  "code": "LA10586-8",
                  "display": "-- Dementia"
                },
                {
                  "code": "LA10591-8",
                  "display": "Septicemia"
                },
                {
                  "code": "LA10522-3",
                  "display": "Stroke/Brain Attack"
                },
                {
                  "code": "LA10530-6",
                  "display": "Sudden Infant Death Syndrome"
                }
              ]
            }
          ]
        }
      },
      "request": {
        "method": "PUT",
        "url": "http://hl7.org/fhir/us/sdc/ValueSet/LL626-3"
      }
    },
    {
      "fullUrl": "http://hl7.org/fhir/us/sdc/ValueSet/LL619-8",
      "resource": {
        "resourceType": "ValueSet",
        "id": "LL619-8",
        "meta": {
          "profile": [
            "http://hl7.org/fhir/us/sdc/StructureDefinition/sdc-valueset"
          ]
        },
        "url": "http://details.loinc.org/AnswerList/LL619-8",
        "name": "USSG-FHT age",
        "status": "active",
        "publisher": "Regenstrief Institute, Inc and the LOINC Committee",
        "description": "Family history tool age range",
        "immutable": true,
        "copyright": "Refer to https://loinc.org/terms-of-use",
        "extensible": false,
        "compose": {
          "include": [
            {
              "system": "http://loinc.org",
              "concept": [
                {
                  "code": "LA10402-8",
                  "display": "Pre-Birth"
                },
                {
                  "code": "LA10403-6",
                  "display": "Newborn"
                },
                {
                  "code": "LA10394-7",
                  "display": "Infancy"
                },
                {
                  "code": "LA10395-4",
                  "display": "Childhood"
                },
                {
                  "code": "LA10404-4",
                  "display": "Adolescence"
                },
                {
                  "code": "LA10396-2",
                  "display": "20-29"
                },
                {
                  "code": "LA10397-0",
                  "display": "30-39"
                },
                {
                  "code": "LA10398-8",
                  "display": "40-49"
                },
                {
                  "code": "LA10399-6",
                  "display": "50-59"
                },
                {
                  "code": "LA10400-2",
                  "display": "OVER 60"
                },
                {
                  "code": "LA4489-6",
                  "display": "Unknown"
                }
              ]
            }
          ]
        }
      },
      "request": {
        "method": "PUT",
        "url": "http://hl7.org/fhir/us/sdc/ValueSet/LL619-8"
      }
    },
    {
      "fullUrl": "http://hl7.org/fhir/us/sdc/ValueSet/LL621-4",
      "resource": {
        "resourceType": "ValueSet",
        "id": "LL621-4",
        "meta": {
          "profile": [
            "http://hl7.org/fhir/us/sdc/StructureDefinition/sdc-valueset"
          ]
        },
        "url": "http://details.loinc.org/AnswerList/LL621-4",
        "name": "USSG-FHT relationship",
        "status": "active",
        "publisher": "Regenstrief Institute, Inc and the LOINC Committee",
        "description": "Family history tool relationship to patient",
        "immutable": true,
        "copyright": "Refer to https://loinc.org/terms-of-use",
        "extensible": false,
        "compose": {
          "include": [
            {
              "system": "http://loinc.org",
              "concept": [
                {
                  "code": "LA10405-1",
                  "display": "Daughter"
                },
                {
                  "code": "LA10406-9",
                  "display": "Granddaughter"
                },
                {
                  "code": "LA10407-7",
                  "display": "Grandson"
                },
                {
                  "code": "LA10408-5",
                  "display": "Half-brother"
                },
                {
                  "code": "LA10409-3",
                  "display": "Half-sister"
                },
                {
                  "code": "LA10410-1",
                  "display": "Maternal Aunt"
                },
                {
                  "code": "LA10411-9",
                  "display": "Maternal Cousin"
                },
                {
                  "code": "LA10412-7",
                  "display": "Maternal Grandfather"
                },
                {
                  "code": "LA10413-5",
                  "display": "Maternal Grandmother"
                },
                {
                  "code": "LA10414-3",
                  "display": "Maternal Uncle"
                },
                {
                  "code": "LA10415-0",
                  "display": "Brother"
                },
                {
                  "code": "LA10416-8",
                  "display": "Father"
                },
                {
                  "code": "LA10417-6",
                  "display": "Mother"
                },
                {
                  "code": "LA10418-4",
                  "display": "Sister"
                },
                {
                  "code": "LA10419-2",
                  "display": "Nephew"
                },
                {
                  "code": "LA10420-0",
                  "display": "Niece"
                },
                {
                  "code": "LA10421-8",
                  "display": "Paternal Aunt"
                },
                {
                  "code": "LA10422-6",
                  "display": "Paternal Cousin"
                },
                {
                  "code": "LA10423-4",
                  "display": "Paternal Grandfather"
                },
                {
                  "code": "LA10424-2",
                  "display": "Paternal Grandmother"
                },
                {
                  "code": "LA10425-9",
                  "display": "Paternal Uncle"
                },
                {
                  "code": "LA10426-7",
                  "display": "Son"
                }
              ]
            }
          ]
        }
      },
      "request": {
        "method": "PUT",
        "url": "http://hl7.org/fhir/us/sdc/ValueSet/LL621-4"
      }
    },
    {
      "fullUrl": "http://hl7.org/fhir/us/sdc/ValueSet/LL624-8",
      "resource": {
        "resourceType": "ValueSet",
        "id": "LL624-8",
        "meta": {
          "profile": [
            "http://hl7.org/fhir/us/sdc/StructureDefinition/sdc-valueset"
          ]
        },
        "url": "http://details.loinc.org/AnswerList/LL624-8",
        "name": "USSG-FHT living",
        "status": "active",
        "publisher": "Regenstrief Institute, Inc and the LOINC Committee",
        "description": "Family history tool living",
        "immutable": true,
        "copyright": "Refer to https://loinc.org/terms-of-use",
        "extensible": false,
        "compose": {
          "include": [
            {
              "system": "http://loinc.org",
              "concept": [
                {
                  "code": "LA33-6",
                  "display": "Yes"
                },
                {
                  "code": "LA32-8",
                  "display": "No"
                },
                {
                  "code": "LA4489-6",
                  "display": "Unknown"
                }
              ]
            }
          ]
        }
      },
      "request": {
        "method": "PUT",
        "url": "http://hl7.org/fhir/us/sdc/ValueSet/LL624-8"
      }
    },
    {
      "fullUrl": "http://hl7.org/fhir/us/sdc/ValueSet/LL627-1",
      "resource": {
        "resourceType": "ValueSet",
        "id": "LL627-1",
        "meta": {
          "profile": [
            "http://hl7.org/fhir/us/sdc/StructureDefinition/sdc-valueset"
          ]
        },
        "url": "http://details.loinc.org/AnswerList/LL627-1",
        "name": "USSG-FHT diseases & cause of death",
        "status": "active",
        "publisher": "Regenstrief Institute, Inc and the LOINC Committee",
        "description": "Family history tool diseases and cause of death",
        "immutable": true,
        "copyright": "Refer to https://loinc.org/terms-of-use",
        "extensible": false,
        "compose": {
          "include": [
            {
              "system": "http://loinc.org",
              "concept": [
                {
                  "code": "LA10533-0",
                  "display": "Blood Clots"
                },
                {
                  "code": "LA10572-8",
                  "display": "-- Blood Clot in Leg"
                },
                {
                  "code": "LA10573-6",
                  "display": "-- Blood Clot in Lungs"
                },
                {
                  "code": "LA10524-9",
                  "display": "Cancer"
                },
                {
                  "code": "LA10549-6",
                  "display": "-- Bone"
                },
                {
                  "code": "LA10536-3",
                  "display": "-- Breast Cancer"
                },
                {
                  "code": "LA10537-1",
                  "display": "-- Colon Cancer"
                },
                {
                  "code": "LA10548-8",
                  "display": "-- Esophageal Cancer"
                },
                {
                  "code": "LA10547-0",
                  "display": "-- Gastric Cancer"
                },
                {
                  "code": "LA10541-3",
                  "display": "-- Kidney Cancer"
                },
                {
                  "code": "LA10545-4",
                  "display": "-- Leukemia"
                },
                {
                  "code": "LA10542-1",
                  "display": "-- Lung Cancer"
                },
                {
                  "code": "LA10546-2",
                  "display": "-- Muscle Cancer"
                },
                {
                  "code": "LA10539-7",
                  "display": "-- Ovarian Cancer"
                },
                {
                  "code": "LA10538-9",
                  "display": "-- Prostate Cancer"
                },
                {
                  "code": "LA10543-9",
                  "display": "-- Skin Cancer"
                },
                {
                  "code": "LA10540-5",
                  "display": "-- Thyroid Cancer"
                },
                {
                  "code": "LA10544-7",
                  "display": "-- Uterine Cancer"
                },
                {
                  "code": "LA10550-4",
                  "display": "-- Other Cancer"
                },
                {
                  "code": "LA10529-8",
                  "display": "Diabetes"
                },
                {
                  "code": "LA10551-2",
                  "display": "-- Diabetes Type 1"
                },
                {
                  "code": "LA10552-0",
                  "display": "-- Diabetes Type 2"
                },
                {
                  "code": "LA10553-8",
                  "display": "-- Gestational Diabetes"
                },
                {
                  "code": "LA10532-2",
                  "display": "Gastrointestinal Disease"
                },
                {
                  "code": "LA10554-6",
                  "display": "-- Crohn's Disease"
                },
                {
                  "code": "LA10555-3",
                  "display": "-- Irritable Bowel Syndrome"
                },
                {
                  "code": "LA10556-1",
                  "display": "-- Ulceritive Colitis"
                },
                {
                  "code": "LA10557-9",
                  "display": "-- Colon Polyps"
                },
                {
                  "code": "LA10523-1",
                  "display": "Heart Disease"
                },
                {
                  "code": "LA10558-7",
                  "display": "-- Heart Attack"
                },
                {
                  "code": "LA10526-4",
                  "display": "High Cholesterol/Hyperlipidemia"
                },
                {
                  "code": "LA7444-8",
                  "display": "Hypertension"
                },
                {
                  "code": "LA10528-0",
                  "display": "Kidney Disease"
                },
                {
                  "code": "LA10565-2",
                  "display": "-- Cystic Kidney Disease"
                },
                {
                  "code": "LA10566-0",
                  "display": "-- Kidney Disease Present From Birth"
                },
                {
                  "code": "LA10567-8",
                  "display": "-- Nephrosis"
                },
                {
                  "code": "LA10568-6",
                  "display": "-- Nephritis"
                },
                {
                  "code": "LA10569-4",
                  "display": "-- Nephrotic Syndrome"
                },
                {
                  "code": "LA10570-2",
                  "display": "-- Diabetic Kidney Disease"
                },
                {
                  "code": "LA10571-0",
                  "display": "-- Other/Unknown"
                },
                {
                  "code": "LA10531-4",
                  "display": "Lung Disease"
                },
                {
                  "code": "LA10559-5",
                  "display": "-- COPD"
                },
                {
                  "code": "LA10560-3",
                  "display": "-- Chronic Bronchitis"
                },
                {
                  "code": "LA10561-1",
                  "display": "-- Emphysema"
                },
                {
                  "code": "LA10562-9",
                  "display": "-- Chronic Lower Respiratory Disease"
                },
                {
                  "code": "LA10563-7",
                  "display": "-- Influenza/Pneumonia"
                },
                {
                  "code": "LA10564-5",
                  "display": "-- Asthma"
                },
                {
                  "code": "LA10590-0",
                  "display": "Neurological Disorders"
                },
                {
                  "code": "LA10527-2",
                  "display": "Osteoporosis"
                },
                {
                  "code": "LA10535-5",
                  "display": "Psychological Disorders"
                },
                {
                  "code": "LA10574-4",
                  "display": "-- Anxiety"
                },
                {
                  "code": "LA10575-1",
                  "display": "-- Bipolar/Manic Depressive Disorder"
                },
                {
                  "code": "LA10576-9",
                  "display": "-- Depression"
                },
                {
                  "code": "LA10577-7",
                  "display": "-- Attention Deficit Hyper Activity"
                },
                {
                  "code": "LA10578-5",
                  "display": "-- Autism"
                },
                {
                  "code": "LA10579-3",
                  "display": "-- Personality Disorder"
                },
                {
                  "code": "LA10580-1",
                  "display": "-- Eating Disorder"
                },
                {
                  "code": "LA10581-9",
                  "display": "-- Obsessive Compulsive Disorder"
                },
                {
                  "code": "LA10582-7",
                  "display": "-- Panic Disorder"
                },
                {
                  "code": "LA10583-5",
                  "display": "-- Post Traumatic Stress Disorder"
                },
                {
                  "code": "LA10584-3",
                  "display": "-- Schizophrenia"
                },
                {
                  "code": "LA10585-0",
                  "display": "-- Social Phobia"
                },
                {
                  "code": "LA10586-8",
                  "display": "-- Dementia"
                },
                {
                  "code": "LA10591-8",
                  "display": "Septicemia"
                },
                {
                  "code": "LA10522-3",
                  "display": "Stroke/Brain Attack"
                },
                {
                  "code": "LA10530-6",
                  "display": "Sudden Infant Death Syndrome"
                },
                {
                  "code": "LA10595-9",
                  "display": "Cause of Death"
                },
                {
                  "code": "LA10587-6",
                  "display": "-- Suicide"
                },
                {
                  "code": "LA10588-4",
                  "display": "-- Accidental Death"
                },
                {
                  "code": "LA10589-2",
                  "display": "-- Other/Unexpected"
                }
              ]
            }
          ]
        }
      },
      "request": {
        "method": "PUT",
        "url": "http://hl7.org/fhir/us/sdc/ValueSet/LL627-1"
      }
    },
    {
      "fullUrl": "http://hl7.org/fhir/us/sdc/DataElement/54125-0",
      "resource": {
        "resourceType": "DataElement",
        "id": "54125-0",
        "meta": {
          "profile": [
            "http://hl7.org/fhir/us/sdc/StructureDefinition/sdc-element"
          ]
        },
        "url": "http://details.loinc.org/LOINC/54125-0",
        "identifier": [
          {
            "system": "http://details.loinc.org",
            "value": "54125-0"
          }
        ],
        "status": "active",
        "date": "2008-11-25",
        "name": "Name",
        "useContext": [
          {
            "coding": [
              {
                "system": "http://loinc.org/class",
                "display": "PANEL.SURVEY.USSGFHT"
              }
            ]
          },
          {
            "coding": [
              {
                "system": "http://loinc.org/type",
                "display": "Survey"
              }
            ]
          }
        ],
        "stringency": "fully-specified",
        "mapping": [
          {
            "identity": "v2",
            "uri": "http://hl7.org/v2"
          },
          {
            "identity": "cda",
            "uri": "http://hl7.org/cda"
          }
        ],
        "element": [
          {
            "extension": [
              {
                "url": "http://hl7.org/fhir/StructureDefinition/elementdefinition-question",
                "valueString": "Name"
              }
            ],
            "path": "54125-0",
            "code": [
              {
                "system": "http://loinc.org",
                "code": "54125-0"
              }
            ],
            "definition": "???",
            "alias": [
              "Person name"
            ],
            "type": [
              {
                "code": "string"
              }
            ],
            "mapping": [
              {
                "identity": "v2",
                "map": "PID-5"
              },
              {
                "identity": "cda",
                "language": "application/xquery",
                "map": "return string-join(/ClinicalDocument/recordTarget/patientRole/patient/name/*, ' ')"
              }
            ]
          }
        ]
      },
      "request": {
        "method": "PUT",
        "url": "http://hl7.org/fhir/us/sdc/DataElement/54125-0"
      }
    },
    {
      "fullUrl": "http://hl7.org/fhir/us/sdc/DataElement/54131-8",
      "resource": {
        "resourceType": "DataElement",
        "id": "54131-8",
        "meta": {
          "profile": [
            "http://hl7.org/fhir/us/sdc/StructureDefinition/sdc-element"
          ]
        },
        "url": "http://details.loinc.org/LOINC/54131-8",
        "identifier": [
          {
            "system": "http://details.loinc.org",
            "value": "54131-8"
          }
        ],
        "status": "active",
        "date": "2008-11-25",
        "name": "54131-8",
        "useContext": [
          {
            "coding": [
              {
                "system": "http://loinc.org/class",
                "display": "SURVEY.USSGFHT"
              }
            ]
          },
          {
            "coding": [
              {
                "system": "http://loinc.org/type",
                "display": "Survey"
              }
            ]
          }
        ],
        "stringency": "fully-specified",
        "mapping": [
          {
            "identity": "v2",
            "uri": "http://hl7.org/v2"
          },
          {
            "identity": "cda",
            "uri": "http://hl7.org/cda"
          }
        ],
        "element": [
          {
            "extension": [
              {
                "url": "http://hl7.org/fhir/StructureDefinition/elementdefinition-question",
                "valueString": "Sex"
              }
            ],
            "path": "54131-8",
            "code": [
              {
                "system": "http://loinc.org",
                "code": "54131-8"
              }
            ],
            "definition": "???",
            "alias": [
              "Sex"
            ],
            "type": [
              {
                "code": "Coding"
              }
            ],
            "binding": {
              "strength": "required",
              "valueSetReference": {
                "reference": "http://hl7.org/fhir/us/sdc/ValueSet/LL1-9",
                "display": "Gender_M/F"
              }
            },
            "mapping": [
              {
                "identity": "v2",
                "map": "PID-8"
              },
              {
                "identity": "cda",
                "language": "application/xquery",
                "map": "for $gender in /ClinicalDocument/recordTarget/patientRole/patient/administrativeGenderCode/@code[.=('F', 'M')] return if ($gender='F') then 'LA3-6' else if ($gender='M') then 'LA2-8' else 'LA46-8'"
              }
            ]
          }
        ]
      },
      "request": {
        "method": "PUT",
        "url": "http://hl7.org/fhir/us/sdc/DataElement/54131-8"
      }
    },
    {
      "fullUrl": "http://hl7.org/fhir/us/sdc/DataElement/21112-8",
      "resource": {
        "resourceType": "DataElement",
        "id": "21112-8",
        "meta": {
          "profile": [
            "http://hl7.org/fhir/us/sdc/StructureDefinition/sdc-element"
          ]
        },
        "url": "http://details.loinc.org/LOINC/21112-8",
        "identifier": [
          {
            "system": "http://details.loinc.org",
            "value": "21112-8"
          }
        ],
        "status": "active",
        "date": "2008-08-25",
        "name": "21112-8",
        "useContext": [
          {
            "coding": [
              {
                "system": "http://loinc.org/class",
                "display": "MISC"
              }
            ]
          },
          {
            "coding": [
              {
                "system": "http://loinc.org/type",
                "display": "Lab"
              }
            ]
          }
        ],
        "stringency": "fully-specified",
        "mapping": [
          {
            "identity": "v2",
            "uri": "http://hl7.org/v2"
          },
          {
            "identity": "cda",
            "uri": "http://hl7.org/cda"
          }
        ],
        "element": [
          {
            "extension": [
              {
                "url": "http://hl7.org/fhir/StructureDefinition/entryFormat",
                "valueString": "mm/dd/yyyy"
              },
              {
                "url": "http://hl7.org/fhir/StructureDefinition/elementdefinition-question",
                "valueString": "Date of Birth"
              }
            ],
            "path": "21112-8",
            "code": [
              {
                "system": "http://loinc.org",
                "code": "21112-8"
              }
            ],
            "definition": "???",
            "alias": [
              "Birthdate",
              "Date of birth",
              "DOB"
            ],
            "type": [
              {
                "code": "date"
              }
            ],
            "mapping": [
              {
                "identity": "v2",
                "map": "PID-7.1"
              },
              {
                "identity": "cda",
                "language": "application/xquery",
                "map": "for $time in /ClinicalDocument/recordTarget/patientRole/patient/birthTime/@value return if (string-length($time)=4) then $time else if (string-length($time)=6) then concat(substring($time,1,4), '-', substring($time, 5)) else concat(substring($time,1,4), '-', substring($time, 5,2), '-', substring($time,7))"
              }
            ]
          }
        ]
      },
      "request": {
        "method": "PUT",
        "url": "http://hl7.org/fhir/us/sdc/DataElement/21112-8"
      }
    },
    {
      "fullUrl": "http://hl7.org/fhir/us/sdc/DataElement/54132-6",
      "resource": {
        "resourceType": "DataElement",
        "id": "54132-6",
        "meta": {
          "profile": [
            "http://hl7.org/fhir/us/sdc/StructureDefinition/sdc-element"
          ]
        },
        "url": "http://details.loinc.org/LOINC/54132-6",
        "identifier": [
          {
            "system": "http://details.loinc.org",
            "value": "54132-6"
          }
        ],
        "status": "active",
        "date": "2008-11-25",
        "name": "Twin",
        "useContext": [
          {
            "coding": [
              {
                "system": "http://loinc.org/class",
                "display": "SURVEY.USSGFHT"
              }
            ]
          },
          {
            "coding": [
              {
                "system": "http://loinc.org/type",
                "display": "Survey"
              }
            ]
          }
        ],
        "stringency": "fully-specified",
        "mapping": [
          {
            "identity": "v2",
            "uri": "http://hl7.org/v2"
          },
          {
            "identity": "cda",
            "uri": "http://hl7.org/cda"
          }
        ],
        "element": [
          {
            "extension": [
              {
                "url": "http://hl7.org/fhir/StructureDefinition/elementdefinition-question",
                "valueString": "Were you born a twin?"
              }
            ],
            "path": "54132-6",
            "code": [
              {
                "system": "http://loinc.org",
                "code": "54132-6"
              }
            ],
            "definition": "???",
            "type": [
              {
                "code": "Coding"
              }
            ],
            "binding": {
              "strength": "required",
              "valueSetReference": {
                "reference": "http://hl7.org/fhir/us/sdc/ValueSet/LL623-0",
                "display": "USSG-FHT twin"
              }
            },
            "mapping": [
              {
                "identity": "v2",
                "map": "PID-24"
              }
            ]
          }
        ]
      },
      "request": {
        "method": "PUT",
        "url": "http://hl7.org/fhir/us/sdc/DataElement/54132-6"
      }
    },
    {
      "fullUrl": "http://hl7.org/fhir/us/sdc/DataElement/54128-4",
      "resource": {
        "resourceType": "DataElement",
        "id": "54128-4",
        "meta": {
          "profile": [
            "http://hl7.org/fhir/us/sdc/StructureDefinition/sdc-element"
          ]
        },
        "url": "http://details.loinc.org/LOINC/54128-4",
        "identifier": [
          {
            "system": "http://details.loinc.org",
            "value": "54128-4"
          }
        ],
        "status": "active",
        "date": "2008-11-25",
        "name": "Adopted",
        "useContext": [
          {
            "coding": [
              {
                "system": "http://loinc.org/class",
                "display": "SURVEY.USSGFHT"
              }
            ]
          },
          {
            "coding": [
              {
                "system": "http://loinc.org/type",
                "display": "Survey"
              }
            ]
          }
        ],
        "stringency": "fully-specified",
        "mapping": [
          {
            "identity": "v2",
            "uri": "http://hl7.org/v2"
          },
          {
            "identity": "cda",
            "uri": "http://hl7.org/cda"
          }
        ],
        "element": [
          {
            "extension": [
              {
                "url": "http://hl7.org/fhir/StructureDefinition/elementdefinition-question",
                "valueString": "Were you adopted?"
              }
            ],
            "path": "54128-4",
            "code": [
              {
                "system": "http://loinc.org",
                "code": "54128-4"
              }
            ],
            "definition": "???",
            "type": [
              {
                "code": "Coding"
              }
            ],
            "binding": {
              "strength": "required",
              "valueSetReference": {
                "reference": "http://hl7.org/fhir/us/sdc/ValueSet/LL361-7",
                "display": "Y/N1"
              }
            }
          }
        ]
      },
      "request": {
        "method": "PUT",
        "url": "http://hl7.org/fhir/us/sdc/DataElement/54128-4"
      }
    },
    {
      "fullUrl": "http://hl7.org/fhir/us/sdc/DataElement/54135-9",
      "resource": {
        "resourceType": "DataElement",
        "id": "54135-9",
        "meta": {
          "profile": [
            "http://hl7.org/fhir/us/sdc/StructureDefinition/sdc-element"
          ]
        },
        "url": "http://details.loinc.org/LOINC/54135-9",
        "identifier": [
          {
            "system": "http://details.loinc.org",
            "value": "54135-9"
          }
        ],
        "status": "active",
        "date": "2008-11-25",
        "name": "Parents related",
        "useContext": [
          {
            "coding": [
              {
                "system": "http://loinc.org/class",
                "display": "SURVEY.USSGFHT"
              }
            ]
          },
          {
            "coding": [
              {
                "system": "http://loinc.org/type",
                "display": "Survey"
              }
            ]
          }
        ],
        "stringency": "fully-specified",
        "mapping": [
          {
            "identity": "v2"
          }
        ],
        "element": [
          {
            "extension": [
              {
                "url": "http://hl7.org/fhir/StructureDefinition/elementdefinition-question",
                "valueString": "Are your parents related to each other in any way other than marriage?"
              }
            ],
            "path": "Parents-related",
            "code": [
              {
                "system": "http://loinc.org",
                "code": "54135-9"
              }
            ],
            "definition": "???",
            "type": [
              {
                "code": "Coding"
              }
            ],
            "binding": {
              "strength": "required",
              "valueSetReference": {
                "reference": "http://hl7.org/fhir/us/sdc/ValueSet/LL361-7",
                "display": "Y/N1"
              }
            }
          }
        ]
      },
      "request": {
        "method": "PUT",
        "url": "http://hl7.org/fhir/us/sdc/DataElement/54135-9"
      }
    },
    {
      "fullUrl": "http://hl7.org/fhir/us/sdc/DataElement/54134-2",
      "resource": {
        "resourceType": "DataElement",
        "id": "54134-2",
        "meta": {
          "profile": [
            "http://hl7.org/fhir/us/sdc/StructureDefinition/sdc-element"
          ]
        },
        "url": "http://details.loinc.org/LOINC/54134-2",
        "identifier": [
          {
            "system": "http://details.loinc.org",
            "value": "54134-2"
          }
        ],
        "status": "active",
        "date": "2008-11-25",
        "name": "Race",
        "useContext": [
          {
            "coding": [
              {
                "system": "http://loinc.org/class",
                "display": "SURVEY.USSGFHT"
              }
            ]
          },
          {
            "coding": [
              {
                "system": "http://loinc.org/type",
                "display": "Survey"
              }
            ]
          }
        ],
        "stringency": "fully-specified",
        "mapping": [
          {
            "identity": "v2",
            "uri": "http://hl7.org/v2"
          },
          {
            "identity": "cda",
            "uri": "http://hl7.org/cda"
          }
        ],
        "element": [
          {
            "extension": [
              {
                "url": "http://hl7.org/fhir/StructureDefinition/elementdefinition-question",
                "valueString": "Race"
              }
            ],
            "path": "Race",
            "code": [
              {
                "system": "http://loinc.org",
                "code": "54134-2"
              }
            ],
            "definition": "???",
            "alias": [
              "Ethnicity"
            ],
            "type": [
              {
                "code": "Coding"
              }
            ],
            "binding": {
              "strength": "required",
              "valueSetReference": {
                "reference": "http://hl7.org/fhir/us/sdc/ValueSet/LL629-7",
                "display": "USSG-FHT race"
              }
            },
            "mapping": [
              {
                "identity": "v2",
                "map": "PID-10"
              }
            ]
          }
        ]
      },
      "request": {
        "method": "PUT",
        "url": "http://hl7.org/fhir/us/sdc/DataElement/54134-2"
      }
    },
    {
      "fullUrl": "http://hl7.org/fhir/us/sdc/DataElement/54123-4",
      "resource": {
        "resourceType": "DataElement",
        "id": "54133-4",
        "meta": {
          "profile": [
            "http://hl7.org/fhir/us/sdc/StructureDefinition/sdc-element"
          ]
        },
        "url": "http://details.loinc.org/LOINC/54133-4",
        "identifier": [
          {
            "system": "http://details.loinc.org",
            "value": "54133-4"
          }
        ],
        "status": "active",
        "date": "2008-11-25",
        "name": "Ethnicity",
        "useContext": [
          {
            "coding": [
              {
                "system": "http://loinc.org/class",
                "display": "SURVEY.USSGFHT"
              }
            ]
          },
          {
            "coding": [
              {
                "system": "http://loinc.org/type",
                "display": "Survey"
              }
            ]
          }
        ],
        "stringency": "fully-specified",
        "mapping": [
          {
            "identity": "v2",
            "uri": "http://hl7.org/v2"
          },
          {
            "identity": "cda",
            "uri": "http://hl7.org/cda"
          }
        ],
        "element": [
          {
            "extension": [
              {
                "url": "http://hl7.org/fhir/StructureDefinition/elementdefinition-question",
                "valueString": "Ethnicity"
              }
            ],
            "path": "Ethnicity",
            "code": [
              {
                "system": "http://loinc.org",
                "code": "54133-4"
              }
            ],
            "definition": "???",
            "type": [
              {
                "code": "Coding"
              }
            ],
            "binding": {
              "strength": "required",
              "valueSetReference": {
                "reference": "http://hl7.org/fhir/us/sdc/ValueSet/LL628-9",
                "display": "USSG-FHT ethnicity"
              }
            },
            "mapping": [
              {
                "identity": "v2",
                "map": "PID-22"
              }
            ]
          }
        ]
      },
      "request": {
        "method": "PUT",
        "url": "http://hl7.org/fhir/us/sdc/DataElement/54123-4"
      }
    },
    {
      "fullUrl": "http://hl7.org/fhir/us/sdc/DataElement/54140-9",
      "resource": {
        "resourceType": "DataElement",
        "id": "54140-9",
        "meta": {
          "profile": [
            "http://hl7.org/fhir/us/sdc/StructureDefinition/sdc-element"
          ]
        },
        "url": "http://details.loinc.org/LOINC/54140-9",
        "identifier": [
          {
            "system": "http://details.loinc.org",
            "value": "54140-9"
          }
        ],
        "status": "active",
        "date": "2008-11-26",
        "name": "History of diseases [USSG-FHT]",
        "useContext": [
          {
            "coding": [
              {
                "system": "http://loinc.org/class",
                "display": "SURVEY.USSGFHT"
              }
            ]
          },
          {
            "coding": [
              {
                "system": "http://loinc.org/type",
                "display": "Survey"
              }
            ]
          }
        ],
        "stringency": "fully-specified",
        "mapping": [
          {
            "identity": "v2",
            "uri": "http://hl7.org/v2"
          },
          {
            "identity": "cda",
            "uri": "http://hl7.org/cda"
          }
        ],
        "element": [
          {
            "extension": [
              {
                "url": "http://hl7.org/fhir/StructureDefinition/elementdefinition-question",
                "valueString": "Disease or Condition"
              }
            ],
            "path": "History-of-diseases",
            "code": [
              {
                "system": "http://loinc.org",
                "code": "54140-9"
              }
            ],
            "definition": "???",
            "alias": [
              "Diseases Hx"
            ],
            "type": [
              {
                "code": "Coding"
              }
            ],
            "binding": {
              "strength": "required",
              "valueSetReference": {
                "reference": "http://hl7.org/fhir/us/sdc/ValueSet/LL626-3",
                "display": "USSG-FHT diseases"
              }
            }
          }
        ]
      },
      "request": {
        "method": "PUT",
        "url": "http://hl7.org/fhir/us/sdc/DataElement/54140-9"
      }
    },
    {
      "fullUrl": "http://hl7.org/fhir/us/sdc/DataElement/54130-0",
      "resource": {
        "resourceType": "DataElement",
        "id": "54130-0",
        "meta": {
          "profile": [
            "http://hl7.org/fhir/us/sdc/StructureDefinition/sdc-element"
          ]
        },
        "url": "http://details.loinc.org/LOINC/54130-0",
        "identifier": [
          {
            "system": "http://details.loinc.org",
            "value": "54130-0"
          }
        ],
        "status": "active",
        "date": "2008-11-25",
        "name": "Age at Diagnosis",
        "useContext": [
          {
            "coding": [
              {
                "system": "http://loinc.org/class",
                "display": "SURVEY.USSGFHT"
              }
            ]
          },
          {
            "coding": [
              {
                "system": "http://loinc.org/type",
                "display": "Survey"
              }
            ]
          }
        ],
        "stringency": "fully-specified",
        "mapping": [
          {
            "identity": "v2",
            "uri": "http://hl7.org/v2"
          },
          {
            "identity": "cda",
            "uri": "http://hl7.org/cda"
          }
        ],
        "element": [
          {
            "extension": [
              {
                "url": "http://hl7.org/fhir/StructureDefinition/elementdefinition-question",
                "valueString": "Age at Diagnosis"
              }
            ],
            "path": "Age-at-diagnosis",
            "code": [
              {
                "system": "http://loinc.org",
                "code": "54130-0"
              }
            ],
            "definition": "???",
            "type": [
              {
                "code": "Coding"
              }
            ],
            "binding": {
              "strength": "required",
              "valueSetReference": {
                "reference": "http://hl7.org/fhir/us/sdc/ValueSet/LL619-8",
                "display": "USSG-FHT age"
              }
            }
          }
        ]
      },
      "request": {
        "method": "PUT",
        "url": "http://hl7.org/fhir/us/sdc/DataElement/54130-0"
      }
    },
    {
      "fullUrl": "http://hl7.org/fhir/us/sdc/DataElement/54136-7",
      "resource": {
        "resourceType": "DataElement",
        "id": "54136-7",
        "meta": {
          "profile": [
            "http://hl7.org/fhir/us/sdc/StructureDefinition/sdc-element"
          ]
        },
        "url": "http://details.loinc.org/LOINC/54136-7",
        "identifier": [
          {
            "system": "http://details.loinc.org",
            "value": "54136-7"
          }
        ],
        "status": "active",
        "date": "2011-09-26",
        "name": "Relationship to patient family member [USSG-FHT]",
        "useContext": [
          {
            "coding": [
              {
                "system": "http://loinc.org/class",
                "display": "SURVEY.USSGFHT"
              }
            ]
          },
          {
            "coding": [
              {
                "system": "http://loinc.org/type",
                "display": "Survey"
              }
            ]
          }
        ],
        "stringency": "fully-specified",
        "mapping": [
          {
            "identity": "v2",
            "uri": "http://hl7.org/v2"
          },
          {
            "identity": "cda",
            "uri": "http://hl7.org/cda"
          }
        ],
        "element": [
          {
            "extension": [
              {
                "url": "http://hl7.org/fhir/StructureDefinition/elementdefinition-question",
                "valueString": "Relationship to you"
              }
            ],
            "path": "Relationship to patient family member",
            "code": [
              {
                "system": "http://loinc.org",
                "code": "54136-7"
              }
            ],
            "definition": "???",
            "alias": [
              "Fam Mem",
              "Relationship to pt"
            ],
            "type": [
              {
                "code": "Coding"
              }
            ],
            "binding": {
              "strength": "required",
              "valueSetReference": {
                "reference": "http://hl7.org/fhir/us/sdc/ValueSet/LL621-4",
                "display": "USSG-FHT relationship"
              }
            }
          }
        ]
      },
      "request": {
        "method": "PUT",
        "url": "http://hl7.org/fhir/us/sdc/DataElement/54136-7"
      }
    },
    {
      "fullUrl": "http://hl7.org/fhir/us/sdc/DataElement/54138-3",
      "resource": {
        "resourceType": "DataElement",
        "id": "54138-3",
        "meta": {
          "profile": [
            "http://hl7.org/fhir/us/sdc/StructureDefinition/sdc-element"
          ]
        },
        "url": "http://details.loinc.org/LOINC/54138-3",
        "identifier": [
          {
            "system": "http://details.loinc.org",
            "value": "54138-3"
          }
        ],
        "status": "active",
        "date": "2008-11-25",
        "name": "Name family member",
        "useContext": [
          {
            "coding": [
              {
                "system": "http://loinc.org/class",
                "display": "SURVEY.USSGFHT"
              }
            ]
          },
          {
            "coding": [
              {
                "system": "http://loinc.org/type",
                "display": "Survey"
              }
            ]
          }
        ],
        "stringency": "fully-specified",
        "mapping": [
          {
            "identity": "v2",
            "uri": "http://hl7.org/v2"
          },
          {
            "identity": "cda",
            "uri": "http://hl7.org/cda"
          }
        ],
        "element": [
          {
            "extension": [
              {
                "url": "http://hl7.org/fhir/StructureDefinition/elementdefinition-question",
                "valueString": "Name"
              }
            ],
            "path": "Name-family-member",
            "code": [
              {
                "system": "http://loinc.org",
                "code": "54138-3"
              }
            ],
            "definition": "???",
            "alias": [
              "Fam Mem",
              "Person name"
            ],
            "type": [
              {
                "code": "string"
              }
            ]
          }
        ]
      },
      "request": {
        "method": "PUT",
        "url": "http://hl7.org/fhir/us/sdc/DataElement/54138-3"
      }
    },
    {
      "fullUrl": "http://hl7.org/fhir/us/sdc/DataElement/54123-5",
      "resource": {
        "resourceType": "DataElement",
        "id": "54123-5",
        "meta": {
          "profile": [
            "http://hl7.org/fhir/us/sdc/StructureDefinition/sdc-element"
          ]
        },
        "url": "http://details.loinc.org/LOINC/54123-5",
        "identifier": [
          {
            "system": "http://details.loinc.org",
            "value": "54123-5"
          }
        ],
        "status": "active",
        "date": "2008-11-25",
        "name": "Gender family member [USSG=FHT]",
        "useContext": [
          {
            "coding": [
              {
                "system": "http://loinc.org/class",
                "display": "SURVEY.USSGFHT/Survey"
              }
            ]
          },
          {
            "coding": [
              {
                "system": "http://loinc.org/type",
                "display": "Survey"
              }
            ]
          }
        ],
        "stringency": "fully-specified",
        "mapping": [
          {
            "identity": "v2",
            "uri": "http://hl7.org/v2"
          },
          {
            "identity": "cda",
            "uri": "http://hl7.org/cda"
          }
        ],
        "element": [
          {
            "extension": [
              {
                "url": "http://hl7.org/fhir/StructureDefinition/elementdefinition-question",
                "valueString": "Gender"
              }
            ],
            "path": "Gender-family-member",
            "code": [
              {
                "system": "http://loinc.org",
                "code": "54123-5"
              }
            ],
            "definition": "???",
            "alias": [
              "Sex"
            ],
            "type": [
              {
                "code": "Coding"
              }
            ],
            "binding": {
              "strength": "required",
              "valueSetReference": {
                "reference": "http://hl7.org/fhir/us/sdc/ValueSet/LL1-9",
                "display": "Gender_M/F"
              }
            }
          }
        ]
      },
      "request": {
        "method": "PUT",
        "url": "http://hl7.org/fhir/us/sdc/DataElement/54123-5"
      }
    },
    {
      "fullUrl": "http://hl7.org/fhir/us/sdc/DataElement/54139-1",
      "resource": {
        "resourceType": "DataElement",
        "id": "54139-1",
        "meta": {
          "profile": [
            "http://hl7.org/fhir/us/sdc/StructureDefinition/sdc-element"
          ]
        },
        "url": "http://details.loinc.org/LOINC/54139-1",
        "identifier": [
          {
            "system": "http://details.loinc.org",
            "value": "54139-1"
          }
        ],
        "status": "active",
        "date": "2008-11-25",
        "name": "Living?",
        "useContext": [
          {
            "coding": [
              {
                "system": "http://loinc.org/class",
                "display": "SURVEY.USSGFHT"
              }
            ]
          },
          {
            "coding": [
              {
                "system": "http://loinc.org/type",
                "display": "Survey"
              }
            ]
          }
        ],
        "stringency": "fully-specified",
        "mapping": [
          {
            "identity": "v2",
            "uri": "http://hl7.org/v2"
          },
          {
            "identity": "cda",
            "uri": "http://hl7.org/cda"
          }
        ],
        "element": [
          {
            "extension": [
              {
                "url": "http://hl7.org/fhir/StructureDefinition/elementdefinition-question",
                "valueString": "Living?"
              }
            ],
            "path": "Living",
            "code": [
              {
                "system": "http://loinc.org",
                "code": "54139-1"
              }
            ],
            "definition": "???",
            "type": [
              {
                "code": "Coding"
              }
            ],
            "binding": {
              "strength": "required",
              "valueSetReference": {
                "reference": "LL361-7",
                "display": "Y/N1"
              }
            }
          }
        ]
      },
      "request": {
        "method": "PUT",
        "url": "http://hl7.org/fhir/us/sdc/DataElement/54139-1"
      }
    },
    {
      "fullUrl": "http://hl7.org/fhir/us/sdc/DataElement/54112-8",
      "resource": {
        "resourceType": "DataElement",
        "id": "54112-8",
        "meta": {
          "profile": [
            "http://hl7.org/fhir/us/sdc/StructureDefinition/sdc-element"
          ]
        },
        "url": "http://details.loinc.org/LOINC/54112-8",
        "identifier": [
          {
            "system": "http://details.loinc.org",
            "value": "54112-8"
          }
        ],
        "status": "active",
        "date": "2008-11-25",
        "name": "Cause of death family member [USSG-FHT]",
        "useContext": [
          {
            "coding": [
              {
                "system": "http://loinc.org/class",
                "display": "SURVEY.USSGFHT"
              }
            ]
          },
          {
            "coding": [
              {
                "system": "http://loinc.org/type",
                "display": "Survey"
              }
            ]
          }
        ],
        "stringency": "fully-specified",
        "mapping": [
          {
            "identity": "v2",
            "uri": "http://hl7.org/v2"
          },
          {
            "identity": "cda",
            "uri": "http://hl7.org/cda"
          }
        ],
        "element": [
          {
            "extension": [
              {
                "url": "http://hl7.org/fhir/StructureDefinition/elementdefinition-question",
                "valueString": "Cause of Death"
              }
            ],
            "path": "Cause-of-death-family-member",
            "code": [
              {
                "system": "http://loinc.org",
                "code": "54112-8"
              }
            ],
            "definition": "???",
            "type": [
              {
                "code": "Coding"
              }
            ],
            "binding": {
              "strength": "required",
              "valueSetReference": {
                "reference": "http://hl7.org/fhir/us/sdc/ValueSet/LL627-1"
              }
            }
          }
        ]
      },
      "request": {
        "method": "PUT",
        "url": "http://hl7.org/fhir/us/sdc/DataElement/54112-8"
      }
    },
    {
      "fullUrl": "http://hl7.org/fhir/us/sdc/DataElement/54113-6",
      "resource": {
        "resourceType": "DataElement",
        "id": "54113-6",
        "meta": {
          "profile": [
            "http://hl7.org/fhir/us/sdc/StructureDefinition/sdc-element"
          ]
        },
        "url": "http://details.loinc.org/LOINC/54113-6",
        "identifier": [
          {
            "system": "http://details.loinc.org",
            "value": "54113-6"
          }
        ],
        "status": "active",
        "date": "2008-11-25",
        "name": "Age range at death family member [USSG-FHT]",
        "useContext": [
          {
            "coding": [
              {
                "system": "http://loinc.org/class",
                "display": "SURVEY.USSGFHT"
              }
            ]
          },
          {
            "coding": [
              {
                "system": "http://loinc.org/type",
                "display": "Survey"
              }
            ]
          }
        ],
        "stringency": "fully-specified",
        "mapping": [
          {
            "identity": "v2",
            "uri": "http://hl7.org/v2"
          },
          {
            "identity": "cda",
            "uri": "http://hl7.org/cda"
          }
        ],
        "element": [
          {
            "extension": [
              {
                "url": "http://hl7.org/fhir/StructureDefinition/elementdefinition-question",
                "valueString": "Age at Death"
              }
            ],
            "path": "Age-range-at-death-family-member",
            "code": [
              {
                "system": "http://loinc.org",
                "code": "54113-6"
              }
            ],
            "definition": "???",
            "type": [
              {
                "code": "Coding"
              }
            ],
            "binding": {
              "strength": "required",
              "valueSetReference": {
                "reference": "http://hl7.org/fhir/us/sdc/ValueSet/LL619-8",
                "display": "USSG-FHT age"
              }
            }
          }
        ]
      },
      "request": {
        "method": "PUT",
        "url": "http://hl7.org/fhir/us/sdc/DataElement/54113-6"
      }
    },
    {
      "fullUrl": "http://hl7.org/fhir/us/sdc/DataElement/54124-3",
      "resource": {
        "resourceType": "DataElement",
        "id": "54124-3",
        "meta": {
          "profile": [
            "http://hl7.org/fhir/us/sdc/StructureDefinition/sdc-element"
          ]
        },
        "url": "http://details.loinc.org/LOINC/54124-3",
        "identifier": [
          {
            "system": "http://details.loinc.org",
            "value": "54124-3"
          }
        ],
        "status": "active",
        "date": "2008-11-25",
        "name": "Birth date family member",
        "useContext": [
          {
            "coding": [
              {
                "system": "http://loinc.org/class",
                "display": "SURVEY.USSGFHT"
              }
            ]
          },
          {
            "coding": [
              {
                "system": "http://loinc.org/type",
                "display": "Survey"
              }
            ]
          }
        ],
        "stringency": "fully-specified",
        "mapping": [
          {
            "identity": "v2",
            "uri": "http://hl7.org/v2"
          },
          {
            "identity": "cda",
            "uri": "http://hl7.org/cda"
          }
        ],
        "element": [
          {
            "extension": [
              {
                "url": "http://hl7.org/fhir/StructureDefinition/elementdefinition-question",
                "valueString": "Date of birth"
              }
            ],
            "path": "Birth-date-familiy-member",
            "code": [
              {
                "system": "http://loinc.org",
                "code": "54124-3"
              }
            ],
            "definition": "???",
            "type": [
              {
                "code": "date"
              }
            ]
          }
        ]
      },
      "request": {
        "method": "PUT",
        "url": "http://hl7.org/fhir/us/sdc/DataElement/54124-3"
      }
    },
    {
      "fullUrl": "http://hl7.org/fhir/us/sdc/DataElement/54141-7",
      "resource": {
        "resourceType": "DataElement",
        "id": "54141-7",
        "meta": {
          "profile": [
            "http://hl7.org/fhir/us/sdc/StructureDefinition/sdc-element"
          ]
        },
        "url": "http://details.loinc.org/LOINC/54141-7",
        "identifier": [
          {
            "system": "http://details.loinc.org",
            "value": "54141-7"
          }
        ],
        "status": "active",
        "date": "2008-11-26",
        "name": "Current age family member [USSG-FHT]",
        "useContext": [
          {
            "coding": [
              {
                "system": "http://loinc.org/class",
                "display": "SURVEY.USSGFHT"
              }
            ]
          },
          {
            "coding": [
              {
                "system": "http://loinc.org/type",
                "display": "Survey"
              }
            ]
          }
        ],
        "stringency": "fully-specified",
        "mapping": [
          {
            "identity": "v2",
            "uri": "http://hl7.org/v2"
          },
          {
            "identity": "cda",
            "uri": "http://hl7.org/cda"
          }
        ],
        "element": [
          {
            "extension": [
              {
                "url": "http://hl7.org/fhir/StructureDefinition/elementdefinition-question",
                "valueString": "Age"
              },
              {
                "url": "http://hl7.org/fhir/StructureDefinition/elementdefinition-allowedUnits",
                "valueCodeableConcept": {
                  "coding": [
                    {
                      "system": "http://unitsofmeasure.org",
                      "code": "a"
                    }
                  ]
                }
              }
            ],
            "path": "Current-age-family-member",
            "code": [
              {
                "system": "http://loinc.org",
                "code": "54141-7"
              }
            ],
            "definition": "???",
            "type": [
              {
                "code": "decimal"
              }
            ]
          }
        ]
      },
      "request": {
        "method": "PUT",
        "url": "http://hl7.org/fhir/us/sdc/DataElement/54141-7"
      }
    },
    {
      "fullUrl": "http://hl7.org/fhir/us/sdc/DataElement/54121-9",
      "resource": {
        "resourceType": "DataElement",
        "id": "54121-9",
        "meta": {
          "profile": [
            "http://hl7.org/fhir/us/sdc/StructureDefinition/sdc-element"
          ]
        },
        "url": "http://details.loinc.org/LOINC/54121-9",
        "identifier": [
          {
            "system": "http://details.loinc.org",
            "value": "54121-9"
          }
        ],
        "status": "active",
        "date": "2008-11-25",
        "name": "Twin family member",
        "useContext": [
          {
            "coding": [
              {
                "system": "http://loinc.org/class",
                "display": "SURVEY.USSGFHT"
              }
            ]
          },
          {
            "coding": [
              {
                "system": "http://loinc.org/type",
                "display": "Survey"
              }
            ]
          }
        ],
        "stringency": "fully-specified",
        "mapping": [
          {
            "identity": "v2",
            "uri": "http://hl7.org/v2"
          },
          {
            "identity": "cda",
            "uri": "http://hl7.org/cda"
          }
        ],
        "element": [
          {
            "extension": [
              {
                "url": "http://hl7.org/fhir/StructureDefinition/elementdefinition-question",
                "valueString": "Was this person born a twin?"
              }
            ],
            "path": "Twin-family-member",
            "code": [
              {
                "system": "http://loinc.org",
                "code": "54121-9"
              }
            ],
            "definition": "???",
            "type": [
              {
                "code": "Coding"
              }
            ],
            "binding": {
              "strength": "required",
              "valueSetReference": {
                "reference": "http://hl7.org/fhir/us/sdc/ValueSet/LL623-0"
              }
            },
            "mapping": [
              {
                "identity": "v2",
                "map": "PID-24"
              }
            ]
          }
        ]
      },
      "request": {
        "method": "PUT",
        "url": "http://hl7.org/fhir/us/sdc/DataElement/54121-9"
      }
    },
    {
      "fullUrl": "http://hl7.org/fhir/us/sdc/DataElement/54122-7",
      "resource": {
        "resourceType": "DataElement",
        "id": "54122-7",
        "meta": {
          "profile": [
            "http://hl7.org/fhir/us/sdc/StructureDefinition/sdc-element"
          ]
        },
        "url": "http://details.loinc.org/LOINC/54122-7",
        "identifier": [
          {
            "system": "http://details.loinc.org",
            "value": "54122-7"
          }
        ],
        "status": "active",
        "date": "2008-11-25",
        "name": "Adopted family member",
        "useContext": [
          {
            "coding": [
              {
                "system": "http://loinc.org/class",
                "display": "SURVEY.USSGFHT"
              }
            ]
          },
          {
            "coding": [
              {
                "system": "http://loinc.org/type",
                "display": "Survey"
              }
            ]
          }
        ],
        "stringency": "fully-specified",
        "mapping": [
          {
            "identity": "v2",
            "uri": "http://hl7.org/v2"
          },
          {
            "identity": "cda",
            "uri": "http://hl7.org/cda"
          }
        ],
        "element": [
          {
            "extension": [
              {
                "url": "http://hl7.org/fhir/StructureDefinition/elementdefinition-question",
                "valueString": "Was this person adopted?"
              }
            ],
            "path": "Adopted-family-member",
            "code": [
              {
                "system": "http://loinc.org",
                "code": "54122-7"
              }
            ],
            "definition": "???",
            "type": [
              {
                "code": "Coding"
              }
            ],
            "binding": {
              "strength": "required",
              "valueSetReference": {
                "reference": "http://hl7.org/fhir/us/sdc/ValueSet/LL623-0"
              }
            }
          }
        ]
      },
      "request": {
        "method": "PUT",
        "url": "http://hl7.org/fhir/us/sdc/DataElement/54122-7"
      }
    },
    {
      "fullUrl": "http://hl7.org/fhir/us/sdc/DataElement/54119-3",
      "resource": {
        "resourceType": "DataElement",
        "id": "54119-3",
        "meta": {
          "profile": [
            "http://hl7.org/fhir/us/sdc/StructureDefinition/sdc-element"
          ]
        },
        "url": "http://details.loinc.org/LOINC/54119-3",
        "identifier": [
          {
            "system": "http://details.loinc.org",
            "value": "54119-3"
          }
        ],
        "status": "active",
        "date": "2012-12-11",
        "name": "Race family member [USSG-FHT]",
        "useContext": [
          {
            "coding": [
              {
                "system": "http://loinc.org/class",
                "display": "SURVEY.USSGFHT"
              }
            ]
          },
          {
            "coding": [
              {
                "system": "http://loinc.org/type",
                "display": "Survey"
              }
            ]
          }
        ],
        "stringency": "fully-specified",
        "mapping": [
          {
            "identity": "v2",
            "uri": "http://hl7.org/v2"
          },
          {
            "identity": "cda",
            "uri": "http://hl7.org/cda"
          }
        ],
        "element": [
          {
            "extension": [
              {
                "url": "http://hl7.org/fhir/StructureDefinition/elementdefinition-question",
                "valueString": "Race"
              }
            ],
            "path": "Race-family-member",
            "code": [
              {
                "system": "http://loinc.org",
                "code": "54119-3"
              }
            ],
            "definition": "???",
            "alias": [
              "Ethnicity"
            ],
            "type": [
              {
                "code": "Coding"
              }
            ],
            "binding": {
              "strength": "required",
              "valueSetReference": {
                "reference": "http://hl7.org/fhir/us/sdc/ValueSet/LL629-7",
                "display": "USSG-FHT race"
              }
            },
            "mapping": [
              {
                "identity": "v2",
                "map": "PID-10"
              }
            ]
          }
        ]
      },
      "request": {
        "method": "PUT",
        "url": "http://hl7.org/fhir/us/sdc/DataElement/54119-3"
      }
    },
    {
      "fullUrl": "http://hl7.org/fhir/us/sdc/DataElement/54120-1",
      "resource": {
        "resourceType": "DataElement",
        "id": "54120-1",
        "meta": {
          "profile": [
            "http://hl7.org/fhir/us/sdc/StructureDefinition/sdc-element"
          ]
        },
        "url": "http://details.loinc.org/LOINC/54120-1",
        "identifier": [
          {
            "system": "http://details.loinc.org",
            "value": "54120-1"
          }
        ],
        "status": "active",
        "date": "2012-12-11",
        "name": "Ethnicity family member [USSG-FHT]",
        "useContext": [
          {
            "coding": [
              {
                "system": "http://loinc.org/class",
                "display": "SURVEY.USSGFHT"
              }
            ]
          },
          {
            "coding": [
              {
                "system": "http://loinc.org/type",
                "display": "Survey"
              }
            ]
          }
        ],
        "stringency": "fully-specified",
        "mapping": [
          {
            "identity": "v2",
            "uri": "http://hl7.org/v2"
          },
          {
            "identity": "cda",
            "uri": "http://hl7.org/cda"
          }
        ],
        "element": [
          {
            "extension": [
              {
                "url": "http://hl7.org/fhir/StructureDefinition/elementdefinition-question",
                "valueString": "Ethnicity"
              }
            ],
            "path": "Ethnicity-family-member",
            "code": [
              {
                "system": "http://loinc.org",
                "code": "54120-1"
              }
            ],
            "definition": "???",
            "type": [
              {
                "code": "Coding"
              }
            ],
            "binding": {
              "strength": "required",
              "valueSetReference": {
                "reference": "http://hl7.org/fhir/us/sdc/ValueSet/LL628-9",
                "display": "USSG-FHT ethnicity"
              }
            },
            "mapping": [
              {
                "identity": "v2",
                "map": "PID-22"
              }
            ]
          }
        ]
      },
      "request": {
        "method": "PUT",
        "url": "http://hl7.org/fhir/us/sdc/DataElement/54120-1"
      }
    },
    {
      "fullUrl": "http://hl7.org/fhir/us/sdc/DataElement/54116-9",
      "resource": {
        "resourceType": "DataElement",
        "id": "54116-9",
        "meta": {
          "profile": [
            "http://hl7.org/fhir/us/sdc/StructureDefinition/sdc-element"
          ]
        },
        "url": "http://details.loinc.org/LOINC/54116-9",
        "identifier": [
          {
            "system": "http://details.loinc.org",
            "value": "54116-9"
          }
        ],
        "status": "active",
        "date": "2008-11-25",
        "name": "History of diseases family member [USSG-FHT]",
        "useContext": [
          {
            "coding": [
              {
                "system": "http://loinc.org/class",
                "display": "SURVEY.USSGFHT"
              }
            ]
          },
          {
            "coding": [
              {
                "system": "http://loinc.org/type",
                "display": "Survey"
              }
            ]
          }
        ],
        "stringency": "fully-specified",
        "mapping": [
          {
            "identity": "v2",
            "uri": "http://hl7.org/v2"
          },
          {
            "identity": "cda",
            "uri": "http://hl7.org/cda"
          }
        ],
        "element": [
          {
            "extension": [
              {
                "url": "http://hl7.org/fhir/StructureDefinition/elementdefinition-question",
                "valueString": "Disease or Condition"
              }
            ],
            "path": "History-of-diseases-family-member",
            "code": [
              {
                "system": "http://loinc.org",
                "code": "54116-9"
              }
            ],
            "definition": "???",
            "alias": [
              "Diseases Hx"
            ],
            "type": [
              {
                "code": "Coding"
              }
            ],
            "binding": {
              "strength": "required",
              "valueSetReference": {
                "reference": "http://hl7.org/fhir/us/sdc/ValueSet/LL626-3",
                "display": "USSG-FHT diseases"
              }
            }
          }
        ]
      },
      "request": {
        "method": "PUT",
        "url": "http://hl7.org/fhir/us/sdc/DataElement/54116-9"
      }
    },
    {
      "fullUrl": "http://hl7.org/fhir/us/sdc/DataElement/54115-1",
      "resource": {
        "resourceType": "DataElement",
        "id": "54115-1",
        "meta": {
          "profile": [
            "http://hl7.org/fhir/us/sdc/StructureDefinition/sdc-element"
          ]
        },
        "url": "http://details.loinc.org/LOINC/54115-1",
        "identifier": [
          {
            "system": "http://details.loinc.org",
            "value": "54115-1"
          }
        ],
        "status": "active",
        "date": "2008-11-25",
        "name": "Age range at onset of disease family member [USSG-FHT]",
        "useContext": [
          {
            "coding": [
              {
                "system": "http://loinc.org/class",
                "display": "SURVEY.USSGFHT"
              }
            ]
          },
          {
            "coding": [
              {
                "system": "http://loinc.org/type",
                "display": "Survey"
              }
            ]
          }
        ],
        "stringency": "fully-specified",
        "mapping": [
          {
            "identity": "v2",
            "uri": "http://hl7.org/v2"
          },
          {
            "identity": "cda",
            "uri": "http://hl7.org/cda"
          }
        ],
        "element": [
          {
            "extension": [
              {
                "url": "http://hl7.org/fhir/StructureDefinition/elementdefinition-question",
                "valueString": "Age at Diagnosis"
              }
            ],
            "path": "Age-range-at-onset-of-disease-family-member",
            "code": [
              {
                "system": "http://loinc.org",
                "code": "54115-1"
              }
            ],
            "definition": "???",
            "alias": [
              "Dz",
              "Ds"
            ],
            "type": [
              {
                "code": "Coding"
              }
            ],
            "binding": {
              "strength": "required",
              "valueSetReference": {
                "reference": "http://hl7.org/fhir/us/sdc/ValueSet/LL619-8",
                "display": "USSG-FHT age"
              }
            }
          }
        ]
      },
      "request": {
        "method": "PUT",
        "url": "http://hl7.org/fhir/us/sdc/DataElement/54115-1"
      }
    }
  ]
}

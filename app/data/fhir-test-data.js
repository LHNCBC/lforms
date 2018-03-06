var searchsetBundleDr = {
  "resourceType": "Bundle",
  "id": "6ed7ea2e-dac7-4563-98af-b6612d5d9947",
  "meta": {
    "lastUpdated": "2018-01-17T17:19:14.462+00:00"
  },
  "type": "searchset",
  "total": 1,
  "link": [
    {
      "relation": "self",
      "url": "http://lhc-docker.nlm.nih.gov:8080/baseDstu3/DiagnosticReport?_id=178952&_include=DiagnosticReport%3Aresult&_include%3Arecurse=Observation%3Arelated-target&_pretty=true"
    }
  ],
  "entry": [
    {
      "fullUrl": "http://lhc-docker.nlm.nih.gov:8080/baseDstu3/DiagnosticReport/178952",
      "resource": {
        "resourceType": "DiagnosticReport",
        "id": "178952",
        "meta": {
          "versionId": "1",
          "lastUpdated": "2018-01-12T18:39:00.806+00:00"
        },
        "text": {
          "status": "generated",
          "div": "<div xmlns=\"http://www.w3.org/1999/xhtml\"><div class=\"hapiHeaderText\"> US Surgeon General family health portrait </div><table class=\"hapiPropertyTable\"><tbody><tr><td>Status</td><td>FINAL</td></tr><tr><td>Issued</td><td>10 January 2018 22:21:30</td></tr></tbody></table></div>"
        },
        "status": "final",
        "code": {
          "coding": [
            {
              "system": "http://loinc.org",
              "code": "54127-6",
              "display": "US Surgeon General family health portrait"
            }
          ],
          "text": "US Surgeon General family health portrait"
        },
        "issued": "2018-01-10T17:21:30-05:00",
        "result": [
          {
            "reference": "Observation/178961"
          }
        ]
      },
      "search": {
        "mode": "match"
      }
    },
    {
      "fullUrl": "http://lhc-docker.nlm.nih.gov:8080/baseDstu3/Observation/178961",
      "resource": {
        "resourceType": "Observation",
        "id": "178961",
        "meta": {
          "versionId": "1",
          "lastUpdated": "2018-01-12T18:39:00.806+00:00"
        },
        "status": "final",
        "code": {
          "coding": [
            {
              "system": "http://loinc.org",
              "code": "54126-8"
            }
          ],
          "text": "My health history"
        },
        "related": [
          {
            "type": "has-member",
            "target": {
              "reference": "Observation/178953"
            }
          },
          {
            "type": "has-member",
            "target": {
              "reference": "Observation/178954"
            }
          },
          {
            "type": "has-member",
            "target": {
              "reference": "Observation/178955"
            }
          },
          {
            "type": "has-member",
            "target": {
              "reference": "Observation/178956"
            }
          },
          {
            "type": "has-member",
            "target": {
              "reference": "Observation/178957"
            }
          },
          {
            "type": "has-member",
            "target": {
              "reference": "Observation/178960"
            }
          }
        ]
      },
      "search": {
        "mode": "include"
      }
    },
    {
      "fullUrl": "http://lhc-docker.nlm.nih.gov:8080/baseDstu3/Observation/178960",
      "resource": {
        "resourceType": "Observation",
        "id": "178960",
        "meta": {
          "versionId": "1",
          "lastUpdated": "2018-01-12T18:39:00.806+00:00"
        },
        "status": "final",
        "code": {
          "coding": [
            {
              "system": "http://loinc.org",
              "code": "54137-5"
            }
          ],
          "text": "Diseases history panel"
        },
        "related": [
          {
            "type": "has-member",
            "target": {
              "reference": "Observation/178958"
            }
          },
          {
            "type": "has-member",
            "target": {
              "reference": "Observation/178959"
            }
          }
        ]
      },
      "search": {
        "mode": "include"
      }
    },
    {
      "fullUrl": "http://lhc-docker.nlm.nih.gov:8080/baseDstu3/Observation/178954",
      "resource": {
        "resourceType": "Observation",
        "id": "178954",
        "meta": {
          "versionId": "1",
          "lastUpdated": "2018-01-12T18:39:00.806+00:00"
        },
        "status": "final",
        "code": {
          "coding": [
            {
              "system": "http://loinc.org",
              "code": "54131-8"
            }
          ],
          "text": "Gender"
        },
        "valueCodeableConcept": {
          "coding": [
            {
              "system": "http://loinc.org",
              "code": "LA2-8",
              "display": "Male"
            }
          ],
          "text": "Male"
        }
      },
      "search": {
        "mode": "include"
      }
    },
    {
      "fullUrl": "http://lhc-docker.nlm.nih.gov:8080/baseDstu3/Observation/178955",
      "resource": {
        "resourceType": "Observation",
        "id": "178955",
        "meta": {
          "versionId": "1",
          "lastUpdated": "2018-01-12T18:39:00.806+00:00"
        },
        "status": "final",
        "code": {
          "coding": [
            {
              "system": "http://loinc.org",
              "code": "21112-8"
            }
          ],
          "text": "Birth Date"
        },
        "valueDateTime": "2018-01-10T00:00:00-05:00"
      },
      "search": {
        "mode": "include"
      }
    },
    {
      "fullUrl": "http://lhc-docker.nlm.nih.gov:8080/baseDstu3/Observation/178953",
      "resource": {
        "resourceType": "Observation",
        "id": "178953",
        "meta": {
          "versionId": "1",
          "lastUpdated": "2018-01-12T18:39:00.806+00:00"
        },
        "status": "final",
        "code": {
          "coding": [
            {
              "system": "http://loinc.org",
              "code": "54125-0"
            }
          ],
          "text": "Name"
        },
        "valueString": "12"
      },
      "search": {
        "mode": "include"
      }
    },
    {
      "fullUrl": "http://lhc-docker.nlm.nih.gov:8080/baseDstu3/Observation/178956",
      "resource": {
        "resourceType": "Observation",
        "id": "178956",
        "meta": {
          "versionId": "1",
          "lastUpdated": "2018-01-12T18:39:00.806+00:00"
        },
        "status": "final",
        "code": {
          "coding": [
            {
              "system": "http://loinc.org",
              "code": "54132-6"
            }
          ],
          "text": "Twin"
        },
        "valueCodeableConcept": {
          "coding": [
            {
              "system": "http://loinc.org",
              "code": "LA10427-5",
              "display": "Yes - Identical (Same)"
            }
          ],
          "text": "Yes - Identical (Same)"
        }
      },
      "search": {
        "mode": "include"
      }
    },
    {
      "fullUrl": "http://lhc-docker.nlm.nih.gov:8080/baseDstu3/Observation/178957",
      "resource": {
        "resourceType": "Observation",
        "id": "178957",
        "meta": {
          "versionId": "1",
          "lastUpdated": "2018-01-12T18:39:00.806+00:00"
        },
        "status": "final",
        "code": {
          "coding": [
            {
              "system": "http://loinc.org",
              "code": "54134-2"
            }
          ],
          "text": "Race"
        },
        "valueCodeableConcept": {
          "coding": [
            {
              "system": "http://loinc.org",
              "code": "LA10608-0",
              "display": "American Indian or Alaska Native"
            },
            {
              "system": "http://loinc.org",
              "code": "LA6156-9",
              "display": "Asian"
            }
          ]
        }
      },
      "search": {
        "mode": "include"
      }
    },
    {
      "fullUrl": "http://lhc-docker.nlm.nih.gov:8080/baseDstu3/Observation/178958",
      "resource": {
        "resourceType": "Observation",
        "id": "178958",
        "meta": {
          "versionId": "1",
          "lastUpdated": "2018-01-12T18:39:00.806+00:00"
        },
        "status": "final",
        "code": {
          "coding": [
            {
              "system": "http://loinc.org",
              "code": "54140-9"
            }
          ],
          "text": "History of diseases"
        },
        "valueCodeableConcept": {
          "coding": [
            {
              "system": "http://loinc.org",
              "code": "10724",
              "display": "Hemolytic-uremic syndrome (HUS)"
            }
          ],
          "text": "Hemolytic-uremic syndrome (HUS)"
        }
      },
      "search": {
        "mode": "include"
      }
    },
    {
      "fullUrl": "http://lhc-docker.nlm.nih.gov:8080/baseDstu3/Observation/178959",
      "resource": {
        "resourceType": "Observation",
        "id": "178959",
        "meta": {
          "versionId": "1",
          "lastUpdated": "2018-01-12T18:39:00.806+00:00"
        },
        "status": "final",
        "code": {
          "coding": [
            {
              "system": "http://loinc.org",
              "code": "54130-0"
            }
          ],
          "text": "Age range at onset of disease"
        },
        "valueCodeableConcept": {
          "coding": [
            {
              "system": "http://loinc.org",
              "code": "LA10403-6",
              "display": "Newborn"
            }
          ],
          "text": "Newborn"
        }
      },
      "search": {
        "mode": "include"
      }
    }
  ]
};

var containedDr = {
  "resourceType": "DiagnosticReport",
  "id": "54127-6N-160970",
  "status": "final",
  "code": {
    "coding": [{
      "system": "http://loinc.org",
      "code": "54127-6N",
      "display": "USSG-FHT, (with mock-up items for skip logic demo)"
    }], "text": "USSG-FHT, (with mock-up items for skip logic demo)"
  },
  "result": [{"reference": "#54126-8-330542"}],
  "contained": [{
    "resourceType": "Observation",
    "id": "54125-0-83713",
    "status": "final",
    "code": {"coding": [{"system": "http://loinc.org", "code": "54125-0"}], "text": "Name"},
    "valueString": "name 1"
  }, {
    "resourceType": "Observation",
    "id": "54125-0-496426",
    "status": "final",
    "code": {"coding": [{"system": "http://loinc.org", "code": "54125-0"}], "text": "Name"},
    "valueString": "name 2"
  }, {
    "resourceType": "Observation",
    "id": "54131-8-695810",
    "status": "final",
    "code": {"coding": [{"system": "http://loinc.org", "code": "54131-8"}], "text": "Gender"},
    "valueCodeableConcept": {
      "coding": [{"system": "http://loinc.org", "code": "LA2-8", "display": "Male"}],
      "text": "Male"
    }
  }, {
    "resourceType": "Observation",
    "id": "21112-8-485677",
    "status": "final",
    "code": {"coding": [{"system": "http://loinc.org", "code": "21112-8"}], "text": "Date of Birth"},
    "valueDateTime": "2016-10-27T00:00:00-04:00"
  }, {
    "resourceType": "Observation",
    "id": "8302-2-245473",
    "status": "final",
    "code": {"coding": [{"system": "http://loinc.org", "code": "8302-2"}], "text": "Height"},
    "valueQuantity": {"value": 70, "unit": "inches", "system": "http://unitsofmeasure.org", "code": "inches"}
  }, {
    "resourceType": "Observation",
    "id": "29463-7-371462",
    "status": "final",
    "code": {"coding": [{"system": "http://loinc.org", "code": "29463-7"}], "text": "Weight"},
    "valueQuantity": {"value": 170, "unit": "lbs", "system": "http://unitsofmeasure.org", "code": "lbs"}
  }, {
    "resourceType": "Observation",
    "id": "39156-5-909830",
    "status": "final",
    "code": {
      "coding": [{"system": "http://loinc.org", "code": "39156-5"}],
      "text": "Mock-up item: Body mass index (BMI) [Ratio]"
    },
    "valueString": "24.39"
  }, {
    "resourceType": "Observation",
    "id": "54134-2-867048",
    "status": "final",
    "code": {"coding": [{"system": "http://loinc.org", "code": "54134-2"}], "text": "Race"},
    "valueCodeableConcept": {
      "coding": [{
        "system": "http://loinc.org",
        "code": "LA10608-0",
        "display": "American Indian or Alaska Native"
      }, {"system": "http://loinc.org", "code": "LA6156-9", "display": "Asian"}]
    }
  }, {
    "resourceType": "Observation",
    "id": "54140-9-345437",
    "status": "final",
    "code": {"coding": [{"system": "http://loinc.org", "code": "54140-9"}], "text": "Disease or Condition"},
    "valueCodeableConcept": {
      "coding": [{"system": "http://loinc.org", "code": "LA10533-0", "display": "Blood Clots"}],
      "text": "Blood Clots"
    }
  }, {
    "resourceType": "Observation",
    "id": "54130-0-984913",
    "status": "final",
    "code": {"coding": [{"system": "http://loinc.org", "code": "54130-0"}], "text": "Age at Diagnosis"},
    "valueCodeableConcept": {
      "coding": [{"system": "http://loinc.org", "code": "LA10403-6", "display": "Newborn"}],
      "text": "Newborn"
    }
  }, {
    "resourceType": "Observation",
    "id": "54137-5-580928",
    "status": "final",
    "code": {"coding": [{"system": "http://loinc.org", "code": "54137-5"}], "text": "Your diseases history"},
    "related": [{"type": "has-member", "target": {"reference": "#54140-9-345437"}}, {
      "type": "has-member",
      "target": {"reference": "#54130-0-984913"}
    }]
  }, {
    "resourceType": "Observation",
    "id": "54140-9-469817",
    "status": "final",
    "code": {"coding": [{"system": "http://loinc.org", "code": "54140-9"}], "text": "Disease or Condition"},
    "valueCodeableConcept": {
      "coding": [{
        "system": "http://loinc.org",
        "code": "LA10572-8",
        "display": "-- Blood Clot in Leg"
      }], "text": "-- Blood Clot in Leg"
    }
  }, {
    "resourceType": "Observation",
    "id": "54130-0-758834",
    "status": "final",
    "code": {"coding": [{"system": "http://loinc.org", "code": "54130-0"}], "text": "Age at Diagnosis"},
    "valueCodeableConcept": {
      "coding": [{"system": "http://loinc.org", "code": "LA10394-7", "display": "Infancy"}],
      "text": "Infancy"
    }
  }, {
    "resourceType": "Observation",
    "id": "54137-5-976637",
    "status": "final",
    "code": {"coding": [{"system": "http://loinc.org", "code": "54137-5"}], "text": "Your diseases history"},
    "related": [{"type": "has-member", "target": {"reference": "#54140-9-469817"}}, {
      "type": "has-member",
      "target": {"reference": "#54130-0-758834"}
    }]
  }, {
    "resourceType": "Observation",
    "id": "54126-8-330542",
    "status": "final",
    "code": {"coding": [{"system": "http://loinc.org", "code": "54126-8"}], "text": "Your health information"},
    "related": [{"type": "has-member", "target": {"reference": "#54125-0-83713"}}, {
      "type": "has-member",
      "target": {"reference": "#54125-0-496426"}
    }, {"type": "has-member", "target": {"reference": "#54131-8-695810"}}, {
      "type": "has-member",
      "target": {"reference": "#21112-8-485677"}
    }, {"type": "has-member", "target": {"reference": "#8302-2-245473"}}, {
      "type": "has-member",
      "target": {"reference": "#29463-7-371462"}
    }, {"type": "has-member", "target": {"reference": "#39156-5-909830"}}, {
      "type": "has-member",
      "target": {"reference": "#54134-2-867048"}
    }, {"type": "has-member", "target": {"reference": "#54137-5-580928"}}, {
      "type": "has-member",
      "target": {"reference": "#54137-5-976637"}
    }]
  }],
  "issued": "2016-10-27T16:46:10-04:00"
};


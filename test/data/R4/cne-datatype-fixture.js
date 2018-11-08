var R4_cneDataTypeFixtureFixture = {
  
  input: {
    "questionCode": "54131-8",
    "questionCardinality": {"min": "1","max": "1"},
    "question": "Gender",
    "answers": [
      {"text": "Male","code": "LA2-8"},
      {"text": "Female","code": "LA3-6"},
      {"text": "Other","code": "LA46-8","other": "Please Specify"}
    ],
    "answerCardinality": {"min": "1","max": "1"},
    "dataType": "CNE",
    "questionCodeSystem": "LOINC",
    "_codePath": "/54126-8/54131-8",
    "_idPath": "/1/1"
  },
  
  output: {
    required: undefined,
    linkId: "/54126-8/54131-8",
    text: "Gender",
    type: "choice",
    code: [
      {
        system: "http://loinc.org",
        code: "54131-8",
        display: "Gender"
      }
    ],
    answerOption: [
      {
        valueCoding: {code: "LA2-8",display: "Male"}
      },
      {
        valueCoding: {code: "LA3-6",display: "Female"}
      },
      {
        valueCoding: {code: "LA46-8",display: "Other"}
      }
    ]
    
  }
};

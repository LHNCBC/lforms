var defaultAnswers = [
  {
    question: 'should convert multiple defaults - int type',
    questionCode: 'defAns',
    dataType: 'INT',
    defaultAnswer: [1,2,3],
    answerCardinality: {
      min: '0',
      max: '*'
    },
  },
  {
    question: 'should convert single default - int type',
    questionCode: 'defAns',
    dataType: 'INT',
    defaultAnswer: 1
  },
  {
    question: 'should convert single default - coding type',
    questionCode: 'defAns',
    dataType: 'CNE',
    answers: [{code: 'ac1'}, {code: 'ac2', text: 'AC2'}, {code: 'ac3'}],
    defaultAnswer: {code: 'ac2', text: 'AC2'}
  },
  {
    question: 'should convert multiple defaults - coding type',
    questionCode: 'defAns',
    dataType: 'CNE',
    answerCardinality: {
      min: '0',
      max: '*'
    },

    answers: [{code: 'ac1'}, {code: 'ac2', text: 'AC2'}, {code: 'ac3', text: 'AC3'}],
    defaultAnswer: [
      {code: 'ac2', text: 'AC2'},
      {code: 'ac3', text: 'AC3'}
    ]
  }
];

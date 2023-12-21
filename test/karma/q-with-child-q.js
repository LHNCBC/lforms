// Tests for a Questionnaire that has a question with a child question.
describe('Unanswered question with an answered child question', ()=>{
  let lfData;
  before(()=>{
    lfData = new LForms.LFormsData({fhirVersion: 'R4', items: [{
      linkId: 'parentQ', dataType: 'ST', items: [{
        linkId: 'childQ', dataType: 'ST', value: "green",
        extension: [{  // this is in case we later disable expressions for such cases; not used yet
          "url": LForms.FHIR.R4.SDC.fhirExtCalculatedExp,
          "valueExpression": {
            "language": "text/fhirpath",
            "expression": "'blue'"
          }
        }]
      }]
    }]});
  });

  it('should not export the child question answers', ()=>{
    let qr = LForms.Util.getFormFHIRData('QuestionnaireResponse', 'R4', lfData);
    assert.equal(qr.item, undefined);
  });

  // Confirm that if we answer the parent questions, then the child question is
  // handled.
  describe('After the parent question is answered', ()=>{
    before(()=>{
      lfData.items[0].value = 'two';
      lfData.items[0].items[0].value = 'green'; // reset to initial value
    });

    it('should export the child question answers', ()=>{
      let qr = LForms.Util.getFormFHIRData('QuestionnaireResponse', 'R4', lfData);
      assert.equal(lfData.items[0].value, 'two');
      assert.equal(qr.item[0].answer[0].valueString, 'two');
      assert.equal(qr.item[0].answer[0].item[0].answer[0].valueString, 'green');
    });
  });
});

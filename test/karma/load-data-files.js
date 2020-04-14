describe('test $.get', function() {
  it('should get a json file from /app/data', function(done) {
    $.get('/base/app/data/FHTData.json', function(FHTData) {
      assert.equal(FHTData.code, '54127-6N');
      done();
    });
  });

  it('should get a json file from /test/data', function(done) {
    $.get('/test/data/R4/phq9.json', function(phq9) {
      assert.equal(phq9.title, "PHQ-9 quick depression assessment panel");
      done();
    });
  });

});


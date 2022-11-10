describe('test $.get', function() {
  it('should get a json file from /test/data', function(done) {
    $.get('/test/data/R4/phq9.json', function(phq9) {
      assert.equal(phq9.title, "PHQ-9 quick depression assessment panel");
      done();
    });
  });

});


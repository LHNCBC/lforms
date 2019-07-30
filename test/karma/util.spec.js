// Tests for the HL7 generation library
describe('Util library', function() {
  describe('getNextLetter', function() {
    it('should return correct letters', function() {
      assert.equal(LForms.Util.getNextLetter(-100), "");
      assert.equal(LForms.Util.getNextLetter(-1), "");
      assert.equal(LForms.Util.getNextLetter(0), "");
      assert.equal(LForms.Util.getNextLetter(1), "a");
      assert.equal(LForms.Util.getNextLetter(2), "b");
      assert.equal(LForms.Util.getNextLetter(3), "c");
      assert.equal(LForms.Util.getNextLetter(25), "y");
      assert.equal(LForms.Util.getNextLetter(26), "z");
      assert.equal(LForms.Util.getNextLetter(26+1), "aa");
      assert.equal(LForms.Util.getNextLetter(26+2), "ab");
      assert.equal(LForms.Util.getNextLetter(26*2-1), "ay");
      assert.equal(LForms.Util.getNextLetter(26*2), "az");
      assert.equal(LForms.Util.getNextLetter(26*2+1), "ba");
      assert.equal(LForms.Util.getNextLetter(26*2+2), "bb");
      assert.equal(LForms.Util.getNextLetter(26*26), "yz");
      assert.equal(LForms.Util.getNextLetter(26*26+1), "za");
      assert.equal(LForms.Util.getNextLetter(26*26+26), "zz");
      assert.equal(LForms.Util.getNextLetter(26*26+26+1), "aaa");
      assert.equal(LForms.Util.getNextLetter(1000), "all");
    });
  });

  describe('isItemValueEmpty', function() {
    it('should check all kinds of empty values', function() {
      var value = "";
      assert.equal(LForms.Util.isItemValueEmpty(value), true);
      value = [];
      assert.equal(LForms.Util.isItemValueEmpty(value), true);
      value = {};
      assert.equal(LForms.Util.isItemValueEmpty(value), true);
      value = {"code": null};
      assert.equal(LForms.Util.isItemValueEmpty(value), true);
      value = {"code": ""};
      assert.equal(LForms.Util.isItemValueEmpty(value), true);

      value = true;
      assert.equal(LForms.Util.isItemValueEmpty(value), false);
      value = false;
      assert.equal(LForms.Util.isItemValueEmpty(value), false);
      value = 0;
      assert.equal(LForms.Util.isItemValueEmpty(value), false);
      value = "a";
      assert.equal(LForms.Util.isItemValueEmpty(value), false);
      value = [1];
      assert.equal(LForms.Util.isItemValueEmpty(value), false);
      value = {"code": "1"};
      assert.equal(LForms.Util.isItemValueEmpty(value), false);


    });
  });

  describe('pruneNulls', function() {
    it('should remove elements with null and undefined values from an object/array', function () {
      var target    = {a: [null, undefined, 1, 'str', true, {}], b: true, s: 'str', n: null, u: undefined, child: {a: [null, undefined, 1, 'str', true, {}], num: 10.1, s: 'str', b: false, n: null, u: undefined, e: [], o: {}}};
      var expected  = {a: [                 1, 'str', true, {}], b: true, s: 'str',                        child: {a: [                 1, 'str', true, {}], num: 10.1, s: 'str', b: false,                        e: [], o: {}}};
      LForms.Util.pruneNulls(target);
      assert.deepEqual(target, expected);
    });
  });

  describe('findItem', function() {
    var items = [{linkId: 'aa'}, {linkId: 'bb', items:[{linkId: 'bb1'}, {linkId:'bb2'}]}, {linkId:'ccc'}];
    it('should find item by linkId', function () {
      var item = LForms.Util.findItem(items, 'linkId', 'aa');
      assert.equal(item.linkId, 'aa');
    });
    it('should find item by linkId recursively', function () {
      var item = LForms.Util.findItem(items, 'linkId', 'bb1');
      assert.equal(item.linkId, 'bb1');
    });
  });
  
  describe('Date conversions', function () {
    
    
    it('stringToDate()', function () {
  
      var dt_format = 'YYYY-MM-DD';
      // Date type
      assert.equal(LForms.Util.formatDate(LForms.Util.stringToDate('01/02/2018'), dt_format), '2018-01-02');
      assert.equal(LForms.Util.formatDate(LForms.Util.stringToDate('3/4/2018'), dt_format), '2018-03-04');
      assert.equal(LForms.Util.formatDate(LForms.Util.stringToDate('05-6-2018'), dt_format), '2018-05-06');
      assert.equal(LForms.Util.formatDate(LForms.Util.stringToDate('07-08-2018'), dt_format), '2018-07-08');
      assert.equal(LForms.Util.formatDate(LForms.Util.stringToDate('2018-09-10'), dt_format), '2018-09-10');
      assert.equal(LForms.Util.formatDate(LForms.Util.stringToDate('2018/11/12'), dt_format), '2018-11-12');
      // Without year, should default to current year
      assert.equal(LForms.Util.formatDate(LForms.Util.stringToDate('05/06'), dt_format), new Date().getFullYear()+'-05-06');
      assert.equal(LForms.Util.formatDate(LForms.Util.stringToDate('5/6'), dt_format), new Date().getFullYear()+'-05-06');
      assert.equal(LForms.Util.formatDate(LForms.Util.stringToDate('05-06'), dt_format), new Date().getFullYear()+'-05-06');
      assert.equal(LForms.Util.formatDate(LForms.Util.stringToDate('5-6'), dt_format), new Date().getFullYear()+'-05-06');
      // Only  year, should default to Jan 1st.
      assert.equal(LForms.Util.formatDate(LForms.Util.stringToDate('2018'), dt_format), '2018-01-01');
  
      // DateTime type
      // ISO parsing
      assert.equal(LForms.Util.stringToDate('2018-01-02T12:34:56.789').toISOString(), '2018-01-02T17:34:56.789Z');
      assert.equal(LForms.Util.stringToDate('2018-03-04T12:34:56.789Z').toISOString(), '2018-03-04T12:34:56.789Z');
      assert.equal(LForms.Util.stringToDate('2018-05-06T12:34:56').toISOString(), '2018-05-06T16:34:56.000Z');
      assert.equal(LForms.Util.stringToDate('2018-07-08T12').toISOString(), '2018-07-08T16:00:00.000Z');
      assert.equal(LForms.Util.stringToDate('2018-09-10 12:34').toISOString(), '2018-09-10T16:34:00.000Z');
      // US datetime
      assert.equal(LForms.Util.stringToDate('10/11/2018 12:34').toISOString(), '2018-10-11T16:34:00.000Z');
      assert.equal(LForms.Util.stringToDate('12-13-2018 12:34').toISOString(), '2018-12-13T17:34:00.000Z');
      assert.equal(LForms.Util.stringToDate('1/3 12:34').toISOString(), new Date().getFullYear()+'-01-03T17:34:00.000Z');
      assert.equal(LForms.Util.stringToDate('02/04 12:34').toISOString(), new Date().getFullYear()+'-02-04T17:34:00.000Z');
      assert.equal(LForms.Util.stringToDate('3-5 12:34').toISOString(), new Date().getFullYear()+'-03-05T17:34:00.000Z');
    });

    it('formatDate()', function () {
      var str = '2019-05-06T03:00:00.000Z';
      var dt = LForms.Util.stringToDate(str);
      assert.equal(LForms.Util.formatDate(dt, LForms.HL7._DTM_FMT), '20190505230000');
      assert.equal(LForms.Util.formatDate(dt, LForms.HL7._DT_FMT), '20190505');
      assert.equal(LForms.Util.formatDate(dt, 'HHmmssZZ'), '230000-0400');
    });
    
    it('dateToDTMString()', function () {
      var str = '2019-05-06T03:00:00.000Z';
      var dt = LForms.Util.dateToDTMString(str);
      assert.equal(dt, str);
      assert.equal(LForms.Util.dateToDTMString(new Date(str)), str);
    });
  })
});


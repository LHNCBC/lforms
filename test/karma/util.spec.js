// Tests for LForms.Util
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

    it('should prune from nested array elements', function () {
      var target   = [undefined, [null, undefined, 1, 'str', true,{a: {x: {m: null, n: undefined, o: false}, y: null, z: undefined}, b: null,c: undefined,d: [{f: null, g: undefined, h:1}]}], null];
      var expected = [           [                 1, 'str', true,{a: {x: {                       o: false}                       },                      d: [{                       h:1}]}]      ];
      LForms.Util.pruneNulls(target);
      assert.deepEqual(target, expected);
    });
  });

  describe('removeObjectsFromArray', function () {
    [
      {
        message: 'should only remove first matching object',
        // arguments
        target: [{a: 1, id: 1}, {b: "true", id: 2}, {b: "true", id: 3}],
        key: 'b',
        value: "true",
        startIndex: 0,
        all: false,
        removed: {b: "true", id: 2},
        expected: [{a: 1, id: 1}, {b: "true", id: 3}]
      },
      {
        message: 'should remove all matching objects',
        // arguments
        target: [{a: 1, id: 1}, {b: "true", id: 2}, {b: "true", id: 3}],
        key: 'b',
        value: "true",
        startIndex: 0,
        all: true,
        removed: [{b: "true", id: 2}, {b: "true", id: 3}],
        expected: [{a: 1, id: 1}]
      },
      {
        message: 'should remove all matching objects starting from start index',
        // arguments
        target: [{a: 1, id: 1}, {b: "true", id: 2}, {b: "true", id: 3}],
        key: 'b',
        value: "true",
        startIndex: 2,
        all: true,
        removed: [{b: "true", id: 3}],
        expected: [{a: 1, id: 1},{b: "true", id: 2}]
      },
      {
        message: 'should remove first matching object starting from start index',
        // arguments
        target: [{a: 1, id: 1}, {b: "true", id: 2}, {b: "true", id: 3}],
        key: 'b',
        value: "true",
        startIndex: 1,
        all: false,
        removed: {b: "true", id: 2},
        expected: [{a: 1, id: 1},{b: "true", id: 3}]
      },
      {
        message: 'should return null when matching no object and all is false',
        // arguments
        target: [{a: 1, id: 1}, {b: "true", id: 2}, {b: "true", id: 3}],
        key: 'c',
        value: "true",
        startIndex: 0,
        all: false,
        removed: null,
        expected: [{a: 1, id: 1}, {b: "true", id: 2}, {b: "true", id: 3}]
      },
      {
        message: 'should return empty array when matching no objects and all is true',
        // arguments
        target: [{a: 1, id: 1}, {b: "true", id: 2}, {b: "true", id: 3}],
        key: 'c',
        value: "true",
        startIndex: 0,
        all: true,
        removed: [],
        expected: [{a: 1, id: 1}, {b: "true", id: 2}, {b: "true", id: 3}]
      },
    ].forEach(function (test) {
      it(test.message, function () {
        var removed = LForms.Util.removeObjectsFromArray(test.target, test.key, test.value, test.startIndex, test.all);
        assert.deepEqual(removed, test.removed);
        assert.deepEqual(test.target, test.expected);
      });
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

  describe('getFormData', ()=>{
    let fhirQ = {
      "resourceType": "Questionnaire",
      "status": "draft",
      "version": "2.56",
      "meta": {
        "profile": [
          "http://hl7.org/fhir/uv/sdc/StructureDefinition/sdc-questionnaire|2.7"
        ]
      },
      "extension": [
        {
          "url" : "http://hl7.org/fhir/StructureDefinition/variable",
          "valueExpression" : {
            "name": "flv1",
            "language": "text/fhirpath",
            "expression": "1"
          }
        },
        {
          "url" : "http://hl7.org/fhir/StructureDefinition/variable",
          "valueExpression" : {
            "name": "flv2",
            "language": "text/fhirpath",
            "expression": "2"
          }
        },
        {
          "url" : "http://example.com/formlevel-extension1",
          "valueExpression" : {
            "name": "flext1",
            "language": "text/fhirpath",
            "expression": "1"
          }
        },
        {
          "url" : "http://example.com/formlevel-extension2",
          "valueExpression" : {
            "name": "flext2",
            "language": "text/fhirpath",
            "expression": "1"
          }
        }
      ],
      item: [
        {
          "extension": [
            {
              "url": "http://hl7.org/fhir/StructureDefinition/questionnaire-unit",
              "valueCoding": {
                "system": "http://unitsofmeasure.org",
                "code": "kg/m2"
              }
            },
            {
              "url": "http://hl7.org/fhir/uv/sdc/StructureDefinition/sdc-questionnaire-calculatedExpression",
              "valueExpression": {
                "description": "BMI calculation",
                "language" : "text/fhirpath",
                "expression": "((%weight/%height/%height*10) div 1)/10"
              }
            },
            {
              "url": "http://hl7.org/fhir/uv/sdc/StructureDefinition/sdc-questionnaire-initialExpression",
              "valueExpression": {
                "description": "BMI calculation",
                "language" : "text/fhirpath",
                "expression": "((%weight/%height/%height*10) div 1)/10"
              }
            },
            {
              "url" : "http://hl7.org/fhir/StructureDefinition/variable",
              "valueExpression" : {
                "name": "height",
                "language": "text/fhirpath",
                "expression": "5.5"
              }
            },
            {
              "url" : "http://hl7.org/fhir/StructureDefinition/variable",
              "valueExpression" : {
                "name": "weight",
                "language": "text/fhirpath",
                "expression": "150"
              }
            },
            {
              "url": "http://hl7.org/fhir/uv/sdc/StructureDefinition/sdc-questionnaire-observationLinkPeriod",
              "valueDuration": {
                "value": "1",
                "unit": "year",
                "system": "http://unitsofmeasure.org",
                "code": "a"
              }
            },
            {
              url: 'http://example1.com',
              valueDecimal: 0
            },
            {
              url: 'http://example2.com',
              valueDecimal: 200
            }
          ],
          "required": false,
          "linkId": "testId",
          "text": "Test item",
          "type": "decimal"
        }
      ]
    };

    /**
     * Collects array of extensions based on extension url.
     *
     * @param {object} acc - Object with extension url as key and array of
     *  corresponding extensions as value.
     * @param {object} e - Extension
     */
    const extReducer = (acc, e) => {
      let eList = acc[e.url];
      if (!eList) {
        eList = [];
        acc[e.url] = eList;
      }
      eList.push(e);
      return acc;
    };

    it('should include lformsVersion', ()=>{
      var lfData = new LForms.LFormsData({name: 'test form', items: []});
      var formData = lfData.getFormData();
      assert(typeof formData.lformsVersion === 'string');
      assert(formData.lformsVersion.length > 0);
    });

    it('should convert and retain extension array in lforms format at form level', function() {
      let lfData = LForms.FHIR.R4.SDC.convertQuestionnaireToLForms(fhirQ);
      lfData = new LForms.LFormsData(lfData);
      const formData = lfData.getFormData();
      const fhirExts = fhirQ.extension.reduce(extReducer, {});
      const lformsExts = formData.extension.reduce(extReducer, {});

      assert(formData.extension.length === 4);
      Object.keys(fhirExts).forEach((url) => {
        assert.deepEqual(lformsExts[url], fhirExts[url]);
      });
    });

    it('should convert and retain extension array in lforms format at item level', function() {
      let lfData = LForms.FHIR.R4.SDC.convertQuestionnaireToLForms(fhirQ);
      lfData = new LForms.LFormsData(lfData);
      let formData = lfData.getFormData();
      const fhirExts = fhirQ.item[0].extension.reduce(extReducer, {});
      const lformsExts = formData.items[0].extension.reduce(extReducer, {});

      assert(formData.items[0].extension.length === 7);
      Object.keys(fhirExts).forEach((url) => {
        const lfExt = lformsExts[url];
        if(url === 'http://hl7.org/fhir/StructureDefinition/questionnaire-unit') {
          assert(!lfExt);
          assert(formData.items[0].unit);
          assert.deepEqual(formData.items[0].units.length, fhirExts[url].length);
        } else {
          assert.deepEqual(lfExt, fhirExts[url]);
        }
      });
    });
  });

  describe('Questionnaire.meta.profile', () => {
    const defaultProfiles = {
      R4B: 'http://hl7.org/fhir/4.3/StructureDefinition/Questionnaire',
      R4: 'http://hl7.org/fhir/4.0/StructureDefinition/Questionnaire',
      STU3: 'http://hl7.org/fhir/3.0/StructureDefinition/Questionnaire'
    }
    const questionnairesSamples = {
      sdc: {R4: {
          resourceType: 'Questionnaire', name: 'SDCR4', status: 'draft', item: [],
          meta: {profile: ["http://hl7.org/fhir/uv/sdc/StructureDefinition/sdc-questionnaire|2.5"]}
        },
        STU3: {
          resourceType: 'Questionnaire', name: 'SDCSTU3', status: 'draft', item: [],
          meta: {profile: ["http://hl7.org/fhir/us/sdc/StructureDefinition/sdc-questionnaire|2.0"]}
        }},
      std: {
         R4B: {
          resourceType: 'Questionnaire', name: 'STDR4B', status: 'draft', item: [],
          meta: {profile: ["http://hl7.org/fhir/4.3/StructureDefinition/Questionnaire"]}
        },
        R4: {
          resourceType: 'Questionnaire', name: 'STDR4', status: 'draft', item: [],
          meta: {profile: ["http://hl7.org/fhir/3.1/StructureDefinition/Questionnaire"]}
        },
        STU3: {
          resourceType: 'Questionnaire', name: 'STDSTU3', status: 'draft', item: [],
          meta: {profile: ["http://hl7.org/fhir/2.9/StructureDefinition/Questionnaire"]}
        }}
    };
    let modifiedQ;

    const convertQ = (q, targetVersion) => {
      return LForms.Util.getFormFHIRData(q.resourceType, targetVersion,
        LForms.Util.convertFHIRQuestionnaireToLForms(q));
    };

    it('should convert meta.profiles', () => {
      // Conversion to STU3
      // A recognized profile, same version and same profile type, should leave it unchanged and add standard profile.
      const qPart = {meta: {profile: ['http://hl7.org/fhir/2.9/StructureDefinition/Questionnaire']}}
      LForms.FHIR.STU3.SDC._handleMeta(qPart);
      assert.deepEqual(qPart.meta.profile, ['http://hl7.org/fhir/2.9/StructureDefinition/Questionnaire', defaultProfiles.STU3]);

      // Unrecognized profile. Keep it and add STU3 standard profile.
      qPart.meta.profile = ['ftp://a.b.c'];
      LForms.FHIR.STU3.SDC._handleMeta(qPart);
      assert.deepEqual(qPart.meta.profile, ['ftp://a.b.c', defaultProfiles.STU3]);

      // Different version, should remove it and set default STU3.
      qPart.meta.profile = ['http://hl7.org/fhir/4.0/StructureDefinition/Questionnaire'];
      LForms.FHIR.STU3.SDC._handleMeta(qPart);
      assert.deepEqual(qPart.meta.profile, [defaultProfiles.STU3]);

      // A recognized SDC profile with same version, should append default STU3.
      qPart.meta.profile = ['http://hl7.org/fhir/uv/sdc/StructureDefinition/sdc-questionnaire|2.0'];
      LForms.FHIR.STU3.SDC._handleMeta(qPart);
      assert.deepEqual(qPart.meta.profile, ['http://hl7.org/fhir/uv/sdc/StructureDefinition/sdc-questionnaire|2.0', defaultProfiles.STU3]);

      // Conversion to R4
      // A recognized profile, same version and same profile type, should leave it unchanged and add standard profile.
      qPart.meta.profile = ['http://hl7.org/fhir/3.1/StructureDefinition/Questionnaire'];
      LForms.FHIR.R4.SDC._handleMeta(qPart);
      assert.deepEqual(qPart.meta.profile, ['http://hl7.org/fhir/3.1/StructureDefinition/Questionnaire', defaultProfiles.R4]);

      // Different version, Replace with default R4.
      qPart.meta.profile = ['http://hl7.org/fhir/3.0/StructureDefinition/Questionnaire'];
      LForms.FHIR.R4.SDC._handleMeta(qPart, true);
      assert.deepEqual(qPart.meta.profile, [defaultProfiles.R4]);

      // Different profile type, should set default R4.
      qPart.meta.profile = ['http://hl7.org/fhir/uv/sdc/StructureDefinition/sdc-questionnaire|2.7'];
      LForms.FHIR.R4.SDC._handleMeta(qPart, true);
      assert.deepEqual(qPart.meta.profile, ['http://hl7.org/fhir/uv/sdc/StructureDefinition/sdc-questionnaire|2.7', defaultProfiles.R4]);
      
      // Conversion to R4B
      qPart.meta.profile = ['http://hl7.org/fhir/4.3/StructureDefinition/Questionnaire'];
      LForms.FHIR.R4B.SDC._handleMeta(qPart);
      assert.deepEqual(qPart.meta.profile, [ defaultProfiles.R4B]);

      qPart.meta.profile = ['http://hl7.org/fhir/4.1/StructureDefinition/Questionnaire'];
      LForms.FHIR.R4B.SDC._handleMeta(qPart);
      assert.deepEqual(qPart.meta.profile, [ 'http://hl7.org/fhir/4.1/StructureDefinition/Questionnaire', defaultProfiles.R4B]);

    });


    it('should append STU3 default profile to questionnaire with STU3/SDC profile', () => {
      modifiedQ = convertQ(questionnairesSamples.sdc.STU3, 'STU3');
      assert.deepEqual(modifiedQ.meta.profile, [questionnairesSamples.sdc.STU3.meta.profile[0], defaultProfiles.STU3]);
    });

    it('should append STU3 default profile to questionnaire having STU3/Standard but not matching default profile.', () => {
      modifiedQ = convertQ(questionnairesSamples.std.STU3, 'STU3');
      assert.deepEqual(modifiedQ.meta.profile, [questionnairesSamples.std.STU3.meta.profile[0], defaultProfiles.STU3]);
    });

    it('should convert to STU3 replacing with default STU3 profile to questionnaire with R4/SDC profile', () => {
      modifiedQ = convertQ(questionnairesSamples.sdc.R4, 'STU3');
      assert.deepEqual(modifiedQ.meta.profile, [defaultProfiles.STU3]); // Different version, replace
    });

    it('should convert to STU3 replacing with default STU3 profile to questionnaire with R4/Standard profile', () => {
      modifiedQ = convertQ(questionnairesSamples.std.R4, 'STU3');
      assert.deepEqual(modifiedQ.meta.profile, [defaultProfiles.STU3]); // Different version, replace
    });

    it('should convert to R4 replacing with default R4 profile to questionnaire having STU3/SDC profile', () => {
      modifiedQ = convertQ(questionnairesSamples.sdc.STU3, 'R4');
      assert.deepEqual(modifiedQ.meta.profile, [defaultProfiles.R4]);
    });

    it('should convert to R4 replacing with default R4 profile to questionnaire having STU3/Standard profile', () => {
      modifiedQ = convertQ(questionnairesSamples.std.STU3, 'R4');
      assert.deepEqual(modifiedQ.meta.profile, [defaultProfiles.R4]);
    });

    it('should append R4 default profile to questionnaire having R4/SDC profile', () => {
      modifiedQ = convertQ(questionnairesSamples.sdc.R4, 'R4');
      assert.deepEqual(modifiedQ.meta.profile, [questionnairesSamples.sdc.R4.meta.profile[0], defaultProfiles.R4]);
    });

    it('should append R4 default profile to questionnaire having R4/Standard but not matching default profile', () => {
      modifiedQ = convertQ(questionnairesSamples.std.R4, 'R4');
      assert.deepEqual(modifiedQ.meta.profile, [questionnairesSamples.std.R4.meta.profile[0], defaultProfiles.R4]);
    });
  });

  describe('_testValues', function() {
    it('should handle nested structures', function () {
      function itemTest(item) {
        return !! item.options;
      }
      var q = { 'item': [{'item': {'options': 'someURI'}}] };
      var rtn = LForms.Util._testValues(q, 'item', itemTest);
      assert(rtn);
      // Also try a case where it should not find it
      q = { 'item': [{'item': {'type': 'text'}}] };
      rtn = LForms.Util._testValues(q, 'item', itemTest);
      assert(!rtn);
    });
  });

  describe('check numeric values', function() {
    it('should check inteters', function() {
      assert.equal(LForms.Util.isInteger('123'), true);
      assert.equal(LForms.Util.isInteger(' 123'), true);
      assert.equal(LForms.Util.isInteger('123 '), true);
      assert.equal(LForms.Util.isInteger(' 123 '), true);
      assert.equal(LForms.Util.isInteger('+123'), true);
      assert.equal(LForms.Util.isInteger('-123'), true);
      assert.equal(LForms.Util.isInteger(123), true);
      assert.equal(LForms.Util.isInteger(123e2), true);
      assert.equal(LForms.Util.isInteger(123.45e10), true);

      assert.equal(LForms.Util.isInteger(123e-10), false);
      assert.equal(LForms.Util.isInteger(123.45e-10), false);
      assert.equal(LForms.Util.isInteger('123abc'), false);
      assert.equal(LForms.Util.isInteger('abc123'), false);
      assert.equal(LForms.Util.isInteger('123.45'), false);
      assert.equal(LForms.Util.isInteger('+ 123'), false);
      assert.equal(LForms.Util.isInteger('- 123'), false);
      assert.equal(LForms.Util.isInteger('.123'), false);
      assert.equal(LForms.Util.isInteger('123.'), false);
      assert.equal(LForms.Util.isInteger(123.45), false);
    });
  });

  it('should check decimals', function() {
    assert.equal(LForms.Util.isDecimal(123), true);
    assert.equal(LForms.Util.isDecimal(123.45), true);
    assert.equal(LForms.Util.isDecimal(123.45e10), true);
    assert.equal(LForms.Util.isDecimal(123.45e-10), true);
    assert.equal(LForms.Util.isDecimal(+123.45e10), true);
    assert.equal(LForms.Util.isDecimal(-123.45e-10), true);
    assert.equal(LForms.Util.isDecimal(123.45E10), true);
    assert.equal(LForms.Util.isDecimal(123.45E-10), true);
    assert.equal(LForms.Util.isDecimal(+123.45E10), true);
    assert.equal(LForms.Util.isDecimal(-123.45E-10), true);

    assert.equal(LForms.Util.isDecimal('123'), true);
    assert.equal(LForms.Util.isDecimal(' 123'), true);
    assert.equal(LForms.Util.isDecimal('123 '), true);
    assert.equal(LForms.Util.isDecimal(' 123 '), true);
    assert.equal(LForms.Util.isDecimal('+123'), true);
    assert.equal(LForms.Util.isDecimal('-123'), true);
    assert.equal(LForms.Util.isDecimal('123.'), true);
    assert.equal(LForms.Util.isDecimal('.123'), true);

    assert.equal(LForms.Util.isDecimal('123.45'), true);
    assert.equal(LForms.Util.isDecimal(' 123.45'), true);
    assert.equal(LForms.Util.isDecimal('123.45 '), true);
    assert.equal(LForms.Util.isDecimal(' 123.'), true);
    assert.equal(LForms.Util.isDecimal(' .123'), true);
    assert.equal(LForms.Util.isDecimal('123. '), true);
    assert.equal(LForms.Util.isDecimal('.123 '), true);

    assert.equal(LForms.Util.isDecimal('123e10'), true);
    assert.equal(LForms.Util.isDecimal('123e+10'), true);
    assert.equal(LForms.Util.isDecimal('123e-10'), true);
    assert.equal(LForms.Util.isDecimal('123.12e10'), true);
    assert.equal(LForms.Util.isDecimal('123.12e+10'), true);
    assert.equal(LForms.Util.isDecimal('123.12e-10'), true);
    assert.equal(LForms.Util.isDecimal('-1234.12e+10'), true);
    assert.equal(LForms.Util.isDecimal('-123.12e-10'), true);
    assert.equal(LForms.Util.isDecimal(' 123.12e-10'), true);
    assert.equal(LForms.Util.isDecimal('-1234.12e+10 '), true);

    assert.equal(LForms.Util.isDecimal('123E10'), true);
    assert.equal(LForms.Util.isDecimal('123E+10'), true);
    assert.equal(LForms.Util.isDecimal('123E-10'), true);
    assert.equal(LForms.Util.isDecimal('123.12E10'), true);
    assert.equal(LForms.Util.isDecimal('1234.12E+10'), true);
    assert.equal(LForms.Util.isDecimal('123.12E-10'), true);
    assert.equal(LForms.Util.isDecimal('-123.12E+10'), true);
    assert.equal(LForms.Util.isDecimal('-123.12E-10'), true);
    assert.equal(LForms.Util.isDecimal(' 123.12E-10'), true);
    assert.equal(LForms.Util.isDecimal('-123.12E+10 '), true);

    assert.equal(LForms.Util.isDecimal('123abc'), false);
    assert.equal(LForms.Util.isDecimal('abc123'), false);
    assert.equal(LForms.Util.isDecimal('123.45abc'), false);
    assert.equal(LForms.Util.isDecimal('abc123.45'), false);
    assert.equal(LForms.Util.isDecimal('+ 123'), false);
    assert.equal(LForms.Util.isDecimal('- 123'), false);
    assert.equal(LForms.Util.isDecimal('+ 123.45'), false);
    assert.equal(LForms.Util.isDecimal('- 123.45'), false);
    assert.equal(LForms.Util.isDecimal('1.1.2'), false);
    assert.equal(LForms.Util.isDecimal('.'), false);

    assert.equal(LForms.Util.isDecimal('123e 10'), false);
    assert.equal(LForms.Util.isDecimal('123 e10'), false);
    assert.equal(LForms.Util.isDecimal('123e +10'), false);
    assert.equal(LForms.Util.isDecimal('123e -10'), false);
    assert.equal(LForms.Util.isDecimal('123+e10'), false);
    assert.equal(LForms.Util.isDecimal('123-e10'), false);
    assert.equal(LForms.Util.isDecimal('123.12e10.1'), false);
    assert.equal(LForms.Util.isDecimal('123.12e+.'), false);
    assert.equal(LForms.Util.isDecimal('123.12f-10'), false);

    assert.equal(LForms.Util.isDecimal('123E 10'), false);
    assert.equal(LForms.Util.isDecimal('123 E10'), false);
    assert.equal(LForms.Util.isDecimal('123E +10'), false);
    assert.equal(LForms.Util.isDecimal('123E -10'), false);
    assert.equal(LForms.Util.isDecimal('123+E10'), false);
    assert.equal(LForms.Util.isDecimal('123-E10'), false);
    assert.equal(LForms.Util.isDecimal('123.12E10.1'), false);
    assert.equal(LForms.Util.isDecimal('123.12+E+.'), false);
    assert.equal(LForms.Util.isDecimal('123.12F-10'), false);

  });

  describe('LForms.Util.guessFHIRVersion()', () => {
    const q = {
      resourceType: 'Questionnaire',
      status: 'draft',
      item: [
        {
          text: 'Item 1',
          linkId: '1'
        }
      ]
    };

    const stu3InitialValues = {
      string: 'a',
      boolean: true,
      decimal: 1.1,
      integer: 1,
      date: '2020-02-02',
      dateTime: '2020-02-02T02:02:02.222Z',
      time: '02:02:02.222',
      uri: 'http://hl7.org',
      quantity: {
        value: 1.2,
        unit: 'meter',
        system: 'http://unitsofmeasure.org',
        code: 'm'
      },
      reference: 'Patient',
      attachment: {
        mimeType: 'text/plain',
        language: 'en'
      }
    };
    const stu3OptionValues = {
      option: [],
      options: 'http://hl7.org/ValueSet/conditions'
    }


    it('should guess STU3 version using initial fields', () => {
      Object.keys(stu3InitialValues).forEach((type) => {
        const initialField = 'initial'+type.charAt(0).toUpperCase() + type.slice(1);
        const item = q.item[0];
        item.type = type;
        item[initialField] = stu3InitialValues[type]; // Add the field to test.
        assert.equal(LForms.Util.guessFHIRVersion(q), 'STU3');
        delete item[initialField]; // Clear for next field.
      });
    });

    it('should guess STU3 version using other than initial fields', () => {
      const item = q.item[0];
      item.type = 'choice';
      Object.keys(stu3OptionValues).forEach((field) => {
        item[field] = stu3OptionValues[field]; // Add the field to test.
        assert.equal(LForms.Util.guessFHIRVersion(q), 'STU3');
        delete item[field]; // Clear for next field.
      });

      item.type = 'string'; // item[0] has no initial fields and set type to string.
      // Add a second item with enableWhen.
      q.item.push({
        text: 'Item 2',
        type: 'string',
        linkId: '2',
        enableWhen: [{
          question: '1',
          hasAnswer: false, // STU3 specific field.
          answerString: 'A'
        }]
      });

      assert.equal(LForms.Util.guessFHIRVersion(q), 'STU3');
    });
  });

  describe('LForms.Util._checkForInvalidHtmlTags()', () => {
    let notAllowedTags = ['html', 'head', 'body', 'ref', 'script', 'form', 'base', 'link', 'xlink', 'iframe', 'object'];
    let deprecatedTags = ['acronym', 'applet', 'basefont', 'big', 'blink', 'center', 'dir', 'embed', 'font', 
        'frame', 'frameset', 'isindex', 'noframes', 'marquee', 'menu', 'plaintext', 's', 'strike', 'tt', 'u'];
    let TAGS_WITH_URL = {
      "a": ["href"],
      "area": ["href"],
      "blockquote": ["cite"],
      "del": ["cite"],
      "img": ["langdesc","src","usemap"],
      "input": ["src","usemap"],
      "ins": ["cite"],
      "q": ["cite"],
      "audio": ["src"],
      "button": ["formaction"],
      "input": ["formaction"],
      "source": ["src"],
      "tract": ["src"],
      "video": ["poster","src"]
    }
    let TAGS_WITH_MULTIPLE_URLS_IN_ONE_ATTR = {
      "img": "srcset",
      "source": "srcset" 
    }
    
    // test forbid tags
    notAllowedTags.forEach(tag => {
      it('should find the not allowed tags and attributes - ' + tag, () => {
        let sourceHTML = `<${tag}>A not allowed tag</${tag}>`;
        let invalidTagsAttributes = LForms.Util._checkForInvalidHtmlTags(sourceHTML);
        assert.equal(invalidTagsAttributes[0].tag, tag );
      })      
    });
    // test deprecated tags
    deprecatedTags.forEach(tag => {
      it('should find the deprecated tags and attributes - ' + tag, () => {
        let sourceHTML = `<${tag}>A deprecated tag</${tag}>`;
        let invalidTagsAttributes  = LForms.Util._checkForInvalidHtmlTags(sourceHTML);
        assert.equal(invalidTagsAttributes[0].tag, tag); 
      })      
    });
    // test tags with an attribute that has an url
    for (const [tag, urlAttrs] of Object.entries(TAGS_WITH_URL)) {
      urlAttrs.forEach(urlAttr => {
        it('should find an attribute with an invalid url - ' + tag + ':' + urlAttr, () => {
          let sourceHTML = `<${tag} ${urlAttr}='https://a_url'>A tag with an attribute whose value is an invalid url.</${tag}>`;
          let invalidTagsAttributes = LForms.Util._checkForInvalidHtmlTags(sourceHTML);
          assert.equal(invalidTagsAttributes[0].tag, tag); 
          assert.equal(invalidTagsAttributes[0].attribute, urlAttr);
        })
        it('should find an attribute with a local url as valid - ' + tag + ':' + urlAttr, () => {
          let sourceHTML = `<${tag} ${urlAttr}='/a_url'>A tag with an attribute whose value is a local url.</${tag}>`;
          let invalidTagsAttributes = LForms.Util._checkForInvalidHtmlTags(sourceHTML);
          assert.equal(invalidTagsAttributes.length, 0); 
        })
        it('should find an attribute with a local ID as valid - ' + tag + ':' + urlAttr, () => {
          let sourceHTML = `<${tag} ${urlAttr}='#a_id'>A tag with an attribute whose value is a local id.</${tag}>`;
          let invalidTagsAttributes = LForms.Util._checkForInvalidHtmlTags(sourceHTML);
          assert.equal(invalidTagsAttributes.length, 0); 
        })
      })
    };
    // test tags with an attribute that has multiple URL values
    for (const [tag, urlAttr] of Object.entries(TAGS_WITH_MULTIPLE_URLS_IN_ONE_ATTR)) {
      it('should find an attribute with multiple urls, where one or more urls are invalid - ' + tag + ':' + urlAttr, () => {
        let sourceHTML = `<${tag} ${urlAttr}='https://a_url, https://b_url'>A tag with an attribute that has one or more invalid urls.</${tag}>`;
        let invalidTagsAttributes = LForms.Util._checkForInvalidHtmlTags(sourceHTML);
        assert.equal(invalidTagsAttributes[0].tag, tag); 
        assert.equal(invalidTagsAttributes[0].attribute, urlAttr);
      })
      it('should find an attribute with a local url as valid - ' + tag + ':' + urlAttr, () => {
        let sourceHTML = `<${tag} ${urlAttr}='/a_url', '/b_url>A tag with an attribute whose value are a local url.</${tag}>`;
        let invalidTagsAttributes = LForms.Util._checkForInvalidHtmlTags(sourceHTML);
        assert.equal(invalidTagsAttributes.length, 0); 
      })
      it('should find an attribute with a local ID as valid - ' + tag + ':' + urlAttr, () => {
        let sourceHTML = `<${tag} ${urlAttr}='#a_id, #a_id'>A tag with an attribute whose value are a local id.</${tag}>`;
        let invalidTagsAttributes = LForms.Util._checkForInvalidHtmlTags(sourceHTML);
        assert.equal(invalidTagsAttributes.length, 0); 
      })
    };

    it('should find the invalid style attribute', () => {
      let sourceHTML = "<div style='some styles'></div";
      let invalidTagsAttributes = LForms.Util._checkForInvalidHtmlTags(sourceHTML);
      assert.equal(invalidTagsAttributes[0].attribute, 'style');
    })
  })


});


import { TestBed } from '@angular/core/testing';

import { CommonUtilsService } from './common-utils.service';

describe('CommonUtilsService', () => {
  let service: CommonUtilsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CommonUtilsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should be able to compare two answers', () => {
    let completeAnswerWithSystem =  {
      "code": "c1",
      "text": "Answer X",
      "_displayText": "Answer X",
      "system": "loinc",
      "score": 1
    },
    completeAnswerWithoutSystem =  {
      "code": "c1",
      "text": "Answer X",
      "_displayText": "Answer X",
      "score": 1
    },
    a = {
      "code": "c1",
    },
    b = {
      "text": "Answer X",
    },
    c = {
      "code": "c1",
      "text": "Answer X",
      "_displayText": "Answer X"
    },
    d = {
      "code": "c1",
      "text": "Answer X",
      "_displayText": "Answer X",
      "system": "loinc"
    },
    e = {
      "code": "c1",
      "text": "Answer X",
      "_displayText": "Answer X",
      "system": "diff system"
    };


    let itemWithAnswerCodeSystem = {"answerCodeSystem": "loinc"};

    // a code
    expect(service.areTwoAnswersSame(a, completeAnswerWithSystem, {})).toBeFalsy();
    expect(service.areTwoAnswersSame(a, completeAnswerWithSystem, itemWithAnswerCodeSystem)).toBeFalsy();
    expect(service.areTwoAnswersSame(a, completeAnswerWithoutSystem, {})).toBeTruthy();
    expect(service.areTwoAnswersSame(a, completeAnswerWithoutSystem, itemWithAnswerCodeSystem)).toBeTruthy();

    // a text
    expect(service.areTwoAnswersSame(b, completeAnswerWithSystem, {})).toBeFalsy();
    expect(service.areTwoAnswersSame(b, completeAnswerWithSystem, itemWithAnswerCodeSystem)).toBeFalsy();
    expect(service.areTwoAnswersSame(b, completeAnswerWithoutSystem, {})).toBeTruthy();
    expect(service.areTwoAnswersSame(b, completeAnswerWithoutSystem, itemWithAnswerCodeSystem)).toBeTruthy();


    // multiple attributes without system
    expect(service.areTwoAnswersSame(c, completeAnswerWithSystem, {})).toBeFalsy();
    expect(service.areTwoAnswersSame(c, completeAnswerWithSystem, itemWithAnswerCodeSystem)).toBeFalsy();
    expect(service.areTwoAnswersSame(c, completeAnswerWithoutSystem, {})).toBeTruthy();
    expect(service.areTwoAnswersSame(c, completeAnswerWithoutSystem, itemWithAnswerCodeSystem)).toBeTruthy();

    // multiple attributes with system
    expect(service.areTwoAnswersSame(d, completeAnswerWithSystem, {})).toBeTruthy();
    expect(service.areTwoAnswersSame(d, completeAnswerWithSystem, itemWithAnswerCodeSystem)).toBeTruthy();
    expect(service.areTwoAnswersSame(d, completeAnswerWithoutSystem, {})).toBeFalsy();
    expect(service.areTwoAnswersSame(d, completeAnswerWithoutSystem, itemWithAnswerCodeSystem)).toBeTruthy();

    // multiple attributes with different systems
    expect(service.areTwoAnswersSame(e, completeAnswerWithSystem, {})).toBeFalsy();
    expect(service.areTwoAnswersSame(e, completeAnswerWithSystem, itemWithAnswerCodeSystem)).toBeFalsy();
    expect(service.areTwoAnswersSame(e, completeAnswerWithoutSystem, {})).toBeFalsy();
    expect(service.areTwoAnswersSame(e, completeAnswerWithoutSystem, itemWithAnswerCodeSystem)).toBeFalsy();

  })
});

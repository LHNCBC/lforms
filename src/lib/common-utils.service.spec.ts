import { TestBed } from '@angular/core/testing';

import { CommonUtilsService, DisplayControl } from './common-utils.service';

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
    const completeAnswerWithSystem =  {
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


    const itemWithAnswerCodeSystem = {"answerCodeSystem": "loinc"};

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

  it('should keep one column vertical, honor other explicit orientations, and default positive columns to vertical', () => {
    expect(service.getDisplayControlIsVertical({
      answerLayout: {
        columns: '1'
      }
    })).toBeTrue();

    expect(service.getDisplayControlIsVertical({
      answerLayout: {
        columns: 1
      }
    })).toBeTrue();

    expect(service.getDisplayControlIsVertical({
      answerLayout: {
        columns: '0'
      }
    })).toBeFalse();

    expect(service.getDisplayControlIsVertical({
      answerLayout: {
        columns: 0
      }
    })).toBeFalse();

    expect(service.getDisplayControlIsVertical({
      answerLayout: {
        columns: '3'
      }
    })).toBeTrue();

    expect(service.getDisplayControlIsVertical({
      answerLayout: {
        columns: '3',
        orientation: 'vertical'
      }
    })).toBeTrue();

    expect(service.getDisplayControlIsVertical({
      answerLayout: {
        columns: '3',
        orientation: 'horizontal'
      }
    })).toBeFalse();

    expect(service.getDisplayControlIsVertical({
      answerLayout: {
        columns: '1',
        orientation: 'horizontal'
      }
    })).toBeTrue();

    expect(service.getDisplayControlIsVertical({
      answerLayout: {
        columns: 1,
        orientation: 'horizontal'
      }
    })).toBeTrue();
  });

  it('should detect grid layout for answer layout columns greater than one', () => {
    const displayControl = {
      answerLayout: {
        columns: '3'
      }
    };

    expect(service.getDisplayControlIsGrid(displayControl)).toBeTrue();
    expect(service.getDisplayControlColumnCount(displayControl)).toBe(3);
  });

  it('should not reserve more columns than there are answers', () => {
    const displayControl = {
      answerLayout: {
        columns: '10'
      }
    };

    expect(service.getDisplayControlEffectiveColumnCount(displayControl, 5)).toBe(5);
    expect(service.getDisplayControlEffectiveColumnCount(displayControl, 12)).toBe(10);
  });

});

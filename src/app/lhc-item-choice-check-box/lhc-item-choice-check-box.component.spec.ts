import { ComponentFixture, TestBed, tick } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { LhcItemChoiceCheckBoxComponent } from './lhc-item-choice-check-box.component';
import { LhcDataService} from '../../lib/lhc-data.service';

describe('LhcItemChoiceCheckBoxComponent', () => {
  let component: LhcItemChoiceCheckBoxComponent;
  let fixture: ComponentFixture<LhcItemChoiceCheckBoxComponent>;
  let element: HTMLElement;

  let itemCheckboxCNE:any =  {
    "questionCode": "q1a",
    "question": "Answer RADIO_CHECKBOX layout --CNE, --1 column",
    "copyrightNotice": "a notice",
    "codingInstructions": "coding instructions",
    "dataType": "CNE",
    "displayControl": {
      "answerLayout": {
        "type": "RADIO_CHECKBOX",
        "columns": "1"
      }
    },
    "_elementId": "checkbox-cne",
    "_multipleAnswers": true,
    "_choiceOrientation": 'horizional',
    "answers": [
      {
        "code": "c1",
        "text": "Answer X"
      },
      {
        "code": "c2",
        "text": "Answer Y"
      },
      {
        "code": "c3",
        "text": "Answer Z"
      },
      {
        "code": "c4",
        "text": "Extra long answer text 1234 Answer X1"
      },
      {
        "code": "c5",
        "text": "Extra long answer text 12345 Answer X2"
      }
    ],
    "_modifiedAnswers": [
      {
        "code": "c1",
        "text": "Answer X",
        "_displayText": "Answer X"
      },
      {
        "code": "c2",
        "text": "Answer Y",
        "_displayText": "Answer Y"
      },
      {
        "code": "c3",
        "text": "Answer Z",
        "_displayText": "Answer Z"
      },
      {
        "code": "c4",
        "text": "Extra long answer text 1234 Answer X1",
        "_displayText": "Extra long answer text 1234 Answer X1"
      },
      {
        "code": "c5",
        "text": "Extra long answer text 12345 Answer X2",
        "_displayText": "Extra long answer text 12345 Answer X2"
      }
    ],
    "linkId": "/q1a"
  };

  let itemCheckboxCWE:any =  {
    "questionCode": "q1a",
    "question": "Answer RADIO_CHECKBOX layout --CNE, --0 columns",
    "copyrightNotice": "a notice",
    "codingInstructions": "coding instructions",
    "dataType": "CWE",
    "displayControl": {
      "answerLayout": {
        "type": "RADIO_CHECKBOX",
        "columns": "0"
      }
    },
    "_elementId": "checkbox-cwe",
    "_multipleAnswers": true,
    "_choiceOrientation": 'vertical',
    "answers": [
      {
        "code": "c1",
        "text": "Answer X"
      },
      {
        "code": "c2",
        "text": "Answer Y"
      },
      {
        "code": "c3",
        "text": "Answer Z"
      },
      {
        "code": "c4",
        "text": "Extra long answer text 1234 Answer X1"
      },
      {
        "code": "c5",
        "text": "Extra long answer text 12345 Answer X2"
      }
    ],
    "_modifiedAnswers": [
      {
        "code": "c1",
        "text": "Answer X",
        "_displayText": "Answer X"
      },
      {
        "code": "c2",
        "text": "Answer Y",
        "_displayText": "Answer Y"
      },
      {
        "code": "c3",
        "text": "Answer Z",
        "_displayText": "Answer Z"
      },
      {
        "code": "c4",
        "text": "Extra long answer text 1234 Answer X1",
        "_displayText": "Extra long answer text 1234 Answer X1"
      },
      {
        "code": "c5",
        "text": "Extra long answer text 12345 Answer X2",
        "_displayText": "Extra long answer text 12345 Answer X2"
      }
    ],
    "linkId": "/q1a"
  };


  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LhcItemChoiceCheckBoxComponent ],
      imports: [FormsModule, NzCheckboxModule, NzGridModule],
      providers: [LhcDataService]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LhcItemChoiceCheckBoxComponent);
    component = fixture.componentInstance;
    element = fixture.nativeElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


  it('should render a list of checkboxes', () => {
    component.item = itemCheckboxCNE;
    fixture.detectChanges();

    const checkboxes = element.querySelectorAll('input[type="checkbox"]')
    expect(checkboxes.length).toBe(5)

    itemCheckboxCNE.answers.forEach(answer => {
      const radio = element.querySelector('#' + itemCheckboxCNE._elementId + answer.code)
      expect(radio.textContent).toContain(answer.text)
    })

  })

  it('should render a list of checkboxes, with other', () => {
    component.item = itemCheckboxCWE;
    fixture.detectChanges();

    const checkboxes = element.querySelectorAll('input[type="checkbox"]')
    expect(checkboxes.length).toBe(6)

    itemCheckboxCWE.answers.forEach(answer => {
      const radio = element.querySelector('#' + itemCheckboxCWE._elementId + answer.code)
      expect(radio.textContent).toContain(answer.text)
    })

    const radio = element.querySelector('#' + itemCheckboxCWE._elementId + '_other')
    expect(radio.textContent).toContain('Other')

  })

  it('should set item.value', () => {
    component.item = itemCheckboxCNE;
    fixture.detectChanges();

    let radio:HTMLElement = element.querySelector('#' + itemCheckboxCNE._elementId + itemCheckboxCNE.answers[0].code)
    radio.click();
    expect(component.item.value).toEqual([{
      "code": "c1",
      "text": "Answer X",
      "_displayText": "Answer X"
    }])

    //item.value should change, when a different checkbox is clicked
    radio = element.querySelector('#' + itemCheckboxCNE._elementId + itemCheckboxCNE.answers[1].code)
    radio.click();
    expect(component.item.value).toEqual([{
      "code": "c1",
      "text": "Answer X",
      "_displayText": "Answer X"
    },{
      "code": "c2",
      "text": "Answer Y",
      "_displayText": "Answer Y"
    }])

  })

  it('should set item.value, when the "other" checkbox is selected', () => {
    component.item = itemCheckboxCWE;
    fixture.detectChanges();

    let radio:HTMLElement = element.querySelector('#' + itemCheckboxCWE._elementId + itemCheckboxCWE.answers[2].code)
    radio.click();
    expect(component.item.value).toEqual([{
      "code": "c3",
      "text": "Answer Z",
      "_displayText": "Answer Z"
    }])

    //item.value should change, when the "other" checkbox is clicked
    radio = element.querySelector('#' + itemCheckboxCWE._elementId + '_other')
    radio.click();
    fixture.detectChanges();
    expect(component.item.value).toEqual([{
      "code": "c3",
      "text": "Answer Z",
      "_displayText": "Answer Z"
    },{
      "text": null,
      "_notOnList": true
    }])

    let otherInput:HTMLInputElement = element.querySelector('#' + itemCheckboxCWE._elementId + '_otherValue')
    otherInput.value = 'some value';
    otherInput.dispatchEvent(new Event('input'));
    otherInput.dispatchEvent(new KeyboardEvent('keyup', {
      bubbles : true, cancelable : true, shiftKey : false
    }))
    fixture.detectChanges();
//    fixture.whenStable().then(() => {
      expect(component.item.value).toEqual([{
        "code": "c3",
        "text": "Answer Z",
        "_displayText": "Answer Z"
      },{
        "text": "some value",
        "_notOnList": true
      }])

//    })

  })

  it('should have lhc-vertical class with column 1', () => {
    component.item = itemCheckboxCNE;
    fixture.detectChanges();
    const containerDiv = element.querySelector('div[nz-row]');
    expect(containerDiv.classList).toContain('lhc-vertical');
  });

  it('should not have lhc-vertical class with column 0', () => {
    component.item = itemCheckboxCWE;
    fixture.detectChanges();
    const containerDiv = element.querySelector('div[nz-row]');
    expect(containerDiv.classList).not.toContain('lhc-vertical');
  });


});

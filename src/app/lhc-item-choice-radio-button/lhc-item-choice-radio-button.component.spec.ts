import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { NzRadioModule } from 'ng-zorro-antd/radio';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { LhcItemChoiceRadioButtonComponent } from './lhc-item-choice-radio-button.component';
import { EventEmitter } from 'events';
import { LhcDataService} from '../../lib/lhc-data.service';

describe('LhcItemChoiceRadioButtonComponent', () => {
  let component: LhcItemChoiceRadioButtonComponent;
  let fixture: ComponentFixture<LhcItemChoiceRadioButtonComponent>;
  let element: HTMLElement;

  let itemRadioCNE: any =  {
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
    "_elementId": "radio-cne",
    "_multipleAnswers": false,
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

  let itemRadioCWE:any =  {
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
    "_elementId": "radio-cwe",
    "_multipleAnswers": false,
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
      declarations: [ LhcItemChoiceRadioButtonComponent ],
      imports: [FormsModule, NzRadioModule, NzGridModule],
      providers: [LhcDataService]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LhcItemChoiceRadioButtonComponent);
    component = fixture.componentInstance;
    element = fixture.nativeElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


  it('should render a list of radio buttons', () => {
    component.item = itemRadioCNE;
    fixture.detectChanges();

    const radios = element.querySelectorAll('input[type="radio"]')
    expect(radios.length).toBe(5)

    itemRadioCNE.answers.forEach(answer => {
      const radio = element.querySelector('#' + itemRadioCNE._elementId + answer.code)
      expect(radio.textContent).toContain(answer.text)
    })

  })

  it('should render a list of radio buttons, with other', () => {
    component.item = itemRadioCWE;
    fixture.detectChanges();

    const radios = element.querySelectorAll('input[type="radio"]')
    expect(radios.length).toBe(6)

    itemRadioCWE.answers.forEach(answer => {
      const radio = element.querySelector('#' + itemRadioCWE._elementId + answer.code)
      expect(radio.textContent).toContain(answer.text)
    })

    const radio = element.querySelector('#' + itemRadioCWE._elementId + '_other')
    expect(radio.textContent).toContain('Other')

  })

  it('should set item.value', () => {
    component.item = itemRadioCNE;
    fixture.detectChanges();

    let radio:HTMLElement = element.querySelector('#' + itemRadioCNE._elementId + itemRadioCNE.answers[0].code)
    radio.click();
    expect(component.item.value).toEqual({
      "code": "c1",
      "text": "Answer X",
      "_displayText": "Answer X"
    })

    //item.value should change, when a different radio button is clicked
    radio = element.querySelector('#' + itemRadioCNE._elementId + itemRadioCNE.answers[1].code)
    radio.click();
    expect(component.item.value).toEqual({
      "code": "c2",
      "text": "Answer Y",
      "_displayText": "Answer Y"
    })

  })

  it('should set item.value, when the "other" radio button is selected', () => {
    component.item = itemRadioCWE;
    fixture.detectChanges();

    let radio:HTMLElement = element.querySelector('#' + itemRadioCWE._elementId + itemRadioCWE.answers[2].code)
    radio.click();
    expect(component.item.value).toEqual({
      "code": "c3",
      "text": "Answer Z",
      "_displayText": "Answer Z"
    })

    //item.value should change, when the "other" radio button is clicked
    radio = element.querySelector('#' + itemRadioCWE._elementId + '_other')
    radio.click();
    fixture.detectChanges();
    expect(component.item.value).toEqual({
      "text": null,
      "_notOnList": true
    })

    let otherInput:HTMLInputElement = element.querySelector('#' + itemRadioCWE._elementId + '_otherValue')
    otherInput.value = 'some value';
    otherInput.dispatchEvent(new Event('input'));
    otherInput.dispatchEvent(new KeyboardEvent('keyup', {
      bubbles : true, cancelable : true, shiftKey : false
    }))
    fixture.detectChanges();
//    fixture.whenStable().then(() => {
      expect(component.item.value).toEqual({
        "text": "some value",
        "_notOnList": true
      })
//    })

  })

  it('should set the radio button, when the item has an initial value', () => {
    itemRadioCNE.value = {
      "code": "c1",
      "text": "Answer X"
    }
    component.item = itemRadioCNE;
    component.ngOnChanges(null); // manually invoke ngOnChange, but why above tests do not need to??

    fixture.detectChanges();

    expect(component.item.value).toEqual({
      "code": "c1",
      "text": "Answer X"
    })

    // radio button is selected
    let radio:HTMLInputElement = element.querySelector('#' + itemRadioCNE._elementId + itemRadioCNE.answers[0].code + ' input[type="radio"]')

    //TODO: radio.checked should be set to true as it is the case in non-test env
//      expect(radio.checked).toBeTruthy();

    //item.value should change, when a different radio button is clicked
    radio = element.querySelector('#' + itemRadioCNE._elementId + itemRadioCNE.answers[1].code)
    radio.click();
    expect(component.item.value).toEqual({
      "code": "c2",
      "text": "Answer Y",
      "_displayText": "Answer Y"
    })


  })

  it('should set the radio button, when the item has an initial value that is not on the list', () => {
    itemRadioCWE.value = {
      "_notOnList": true,
      "text": "Some Value"
    }
    component.item = itemRadioCWE;
    component.ngOnChanges(null); // manually invoke ngOnChange, but why above tests do not need to??
    fixture.detectChanges();

    expect(component.item.value).toEqual({
      "_notOnList": true,
      "text": "Some Value"
    })

    // radio button is selected
    let radio:HTMLInputElement = element.querySelector('#' + itemRadioCWE._elementId + '_other' + ' input[type="radio"]')

    //TODO: radio.checked should be set to true as it is the case in non-test env
//      expect(radio.checked).toBeTruthy();

    //item.value should change, when a different radio button is clicked
    radio = element.querySelector('#' + itemRadioCWE._elementId + itemRadioCWE.answers[1].code)
    radio.click();
    expect(component.item.value).toEqual({
      "code": "c2",
      "text": "Answer Y",
      "_displayText": "Answer Y"
    })
  })

  it('should have lhc-vertical class with column 1', () => {
    component.item = itemRadioCNE;
    fixture.detectChanges();
    const containerDiv = element.querySelector('nz-radio-group');
    expect(containerDiv.classList).toContain('lhc-vertical');
  });

  it('should not have lhc-vertical class with column 0', () => {
    component.item = itemRadioCWE;
    fixture.detectChanges();
    const containerDiv = element.querySelector('nz-radio-group');
    expect(containerDiv.classList).not.toContain('lhc-vertical');
  });



});

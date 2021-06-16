import { ComponentFixture, TestBed, tick } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { LhcItemChoiceCheckBoxComponent } from './lhc-item-choice-check-box.component';


describe('LhcItemChoiceCheckBoxComponent', () => {
  let component: LhcItemChoiceCheckBoxComponent;
  let fixture: ComponentFixture<LhcItemChoiceCheckBoxComponent>;
  let element: HTMLElement;

  let itemCheckboxCNE:any =  {
    "questionCode": "q1a",
    "question": "Answer RADIO_CHECKBOX layout --CNE, --2 columns",
    "copyrightNotice": "a notice",
    "codingInstructions": "coding instructions",
    "dataType": "CNE",
    "displayControl": {
      "answerLayout": {
        "type": "RADIO_CHECKBOX",
        "columns": "2"
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
    "question": "Answer RADIO_CHECKBOX layout --CNE, --2 columns",
    "copyrightNotice": "a notice",
    "codingInstructions": "coding instructions",
    "dataType": "CWE",
    "displayControl": {
      "answerLayout": {
        "type": "RADIO_CHECKBOX",
        "columns": "2"
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
      imports: [FormsModule, NzCheckboxModule, NzGridModule]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LhcItemChoiceCheckBoxComponent);
    component = fixture.componentInstance;
    element = fixture.nativeElement;
    fixture.detectChanges();
  })

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

//   it('should set the checkbox, when the item has an initial value', () => {
//     itemCheckboxCNE.value = [{
//       "code": "c1",
//       "text": "Answer X"
//     }]
//     component.item = itemCheckboxCNE;
//     component.ngOnChanges(null); // manually invoke ngOnChange, but why above tests do not need to??
    
//     fixture.detectChanges();

//     expect(component.item.value).toEqual([{
//       "code": "c1",
//       "text": "Answer X"
//     }])

//     // checkbox is selected
//     let checkbox:HTMLInputElement = element.querySelector('#' + itemCheckboxCNE._elementId + itemCheckboxCNE.answers[0].code + ' input[type="checkbox"]')
//     console.log(checkbox)
//     console.log(checkbox.checked)
    
//     //TODO: checkbox.checked should be set to true as it is the case in non-test env
// //      expect(checkbox.checked).toBeTruthy();

//     //item.value should change, when a different checkbox is clicked
//     checkbox = element.querySelector('#' + itemCheckboxCNE._elementId + itemCheckboxCNE.answers[1].code)
//     checkbox.click();
//     console.log(component.item.value) // it has only answers[1], no initial value of answers[0]. but it works in non-test env.

//     expect(component.item.value).toEqual([{
//       "code": "c2",
//       "text": "Answer Y",
//       "_displayText": "Answer Y"
//     },{
//       "code": "c1",
//       "text": "Answer X"
//     }])


//   })

//   it('should set the checkbox, when the item has an initial value that is not on the list', () => {
//     itemCheckboxCWE.value = [{
//       "_notOnList": true,
//       "text": "Some Value"
//     }]
//     component.item = itemCheckboxCWE;
//     component.ngOnChanges(null); // manually invoke ngOnChange, but why above tests do not need to??
//     fixture.detectChanges();

//     expect(component.item.value).toEqual([{
//       "_notOnList": true,
//       "text": "Some Value"
//     }])

//     // checkbox is selected
//     let checkbox:HTMLInputElement = element.querySelector('#' + itemCheckboxCWE._elementId + '_other' + ' input[type="checkbox"]')
//     console.log(checkbox)
//     console.log(checkbox.checked)
    
//     //TODO: checkbox.checked should be set to true as it is the case in non-test env
// //      expect(checkbox.checked).toBeTruthy();

//     //item.value should change, when a different checkbox is clicked
//     checkbox = element.querySelector('#' + itemCheckboxCWE._elementId + itemCheckboxCWE.answers[1].code)
//     checkbox.click();
//     expect(component.item.value).toEqual([{
//       "_notOnList": true,
//       "text": "Some Value"
//     },{
//       "code": "c2",
//       "text": "Answer Y",
//       "_displayText": "Answer Y"
//     }])  
//   })

});

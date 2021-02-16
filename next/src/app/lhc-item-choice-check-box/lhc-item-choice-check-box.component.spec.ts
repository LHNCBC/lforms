import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { LhcItemChoiceCheckBoxComponent } from './lhc-item-choice-check-box.component';


describe('LhcItemChoiceCheckBoxComponent', () => {
  let component: LhcItemChoiceCheckBoxComponent;
  let fixture: ComponentFixture<LhcItemChoiceCheckBoxComponent>;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      declarations: [ LhcItemChoiceCheckBoxComponent ],
      imports: [FormsModule, NzCheckboxModule, NzGridModule]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LhcItemChoiceCheckBoxComponent);
    component = fixture.componentInstance;
    component.item = {
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

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('initial status should be all null', () => {
    expect(component.otherValue).toBeNull();
    expect(component.checkboxModels).toEqual([]);
    expect(component.otherCheckboxModel).toBeNull();
  });
});

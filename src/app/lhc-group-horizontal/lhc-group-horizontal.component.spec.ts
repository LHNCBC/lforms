import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LhcGroupHorizontalComponent } from './lhc-group-horizontal.component';
import { LhcDataService} from '../../lib/lhc-data.service';

describe('LhcGroupHorizontalComponent', () => {
  let component: LhcGroupHorizontalComponent;
  let fixture: ComponentFixture<LhcGroupHorizontalComponent>;
  let element: HTMLElement;

  let horizontalItem =  {
    "questionCode": "horizontalTable",
    "linkId":"/horizontalTable",
    "question": "A horizontal table",
    "questionCardinality": {
      "min": "1",
      "max": "*"
    },
    "dataType": "SECTION",
    "displayControl": {
      "questionLayout": "horizontal"
    },
    "items": [
      {
        "questionCode": "colA",
        "question": "A ST",
        "dataType": "ST",
        "displayControl": {
          "colCSS": [
            {
              "name": "width",
              "value": "25%"
            },
            {
              "name": "min-width",
              "value": "10%"
            }
          ]
        },
        "linkId": "/horizontalTable/colA"
      },
      {
        "questionCode": "readonlyCNE-sb",
        "linkId":"/horizontalTable/readonlyCNE-sb",
        "dataType": "CNE",
        "question": "radio button",
        "answerCardinality": {
          "min": "0",
          "max": "1"
        },
        "value": {
          "code": "c2",
          "text": "Answer 2",
          "other": null
        },
        "displayControl": {
          "answerLayout": {
            "type": "RADIO_CHECKBOX",
            "columns": "1"
          }
        },
        "answers": [
          {
            "code": "c1",
            "text": "Answer 1",
            "other": null
          },
          {
            "code": "c2",
            "text": "Answer 2",
            "other": null
          }
        ]
        
      },
      {
        "questionCode": "colC",
        "linkId": "/horizontalTable/colC",
        "question": "A CNE",
        "dataType": "CNE",
        "answers": [
          {
            "code": "c1",
            "text": "Answer 1",
            "other": null
          },
          {
            "code": "c2",
            "text": "Answer 2",
            "other": null
          },
          {
            "code": "c3",
            "text": "Answer 3",
            "other": null
          }
        ]
        
      },
      {
        "questionCode": "required_dt",
        "question": "Required DT field",
        "dataType": "DT",
        "linkId": "/horizontalTable/required_dt",
        "answerCardinality": {
          "min": "1",
          "max": "1"
        }
      }
    ]
  };
 
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LhcGroupHorizontalComponent ],
      providers: [LhcDataService]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LhcGroupHorizontalComponent);
    component = fixture.componentInstance;
    element = fixture.nativeElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LhcGroupHorizontalComponent } from './lhc-group-horizontal.component';

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
      declarations: [ LhcGroupHorizontalComponent ]
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

  // ** horizontal table is not readered without going through lhcFormData initialization **
  // it('should render a horizontal table', () => {
  //   console.log(horizontalItem)
  //   component.item = horizontalItem;
  //   fixture.detectChanges();
  //   const horizontal = element.querySelector('.lhc-layout-horizontal')
  //   expect(horizontal).toBeTruthy();
  //   const title = element.querySelector('.lhc-layout-horizontal .lhc-form-horizontal-table-title')
  //   expect(title.textContent).toBe("A horizontal table")

  //   const headers = element.querySelectorAll('.lhc-layout-horizontal th.lhc-form-horizontal-table-header')
  //   expect(headers.length).toBe(4);
  //   expect(headers[0].textContent).toBe("A ST")
  //   expect(headers[1].textContent).toBe("radio button")
  //   expect(headers[2].textContent).toBe("A CNE")
  //   expect(headers[3].textContent).toBe("Required DT field  *")
    
  //   let rows = element.querySelectorAll('.lhc-layout-horizontal tr.lhc-data-row')
  //   expect(rows.length).toBe(1);

  //   const btnAdd:HTMLElement = element.querySelector('#add-/horizontalTable/1')
  //   btnAdd.click()
  //   rows = element.querySelectorAll('.lhc-layout-horizontal tr.lhc-data-row')
  //   expect(rows.length).toBe(2);

  // })

});

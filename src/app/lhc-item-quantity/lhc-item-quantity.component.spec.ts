import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DebugElement } from "@angular/core";
import { By } from "@angular/platform-browser";

import { LhcItemQuantityComponent } from './lhc-item-quantity.component';
import { LForms as lforms} from '../lforms';
import LhcFormData from '../../lib/lforms/lhc-form-data';
window.LForms = lforms;
require('../../fhir/R4/fhirRequire.js');

describe('LhcItemQuanityComponent', () => {
  let component: LhcItemQuantityComponent;
  let fixture: ComponentFixture<LhcItemQuantityComponent>;
  let lfData;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LhcItemQuantityComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LhcItemQuantityComponent);
    component = fixture.componentInstance;
    var questionnaire = {
      "resourceType": "Questionnaire",
      "item": [{
        "text": "q1",
        "type": "quantity"
      }]
    }
    let form = window.LForms.FHIR.R4.SDC.convertQuestionnaireToLForms(questionnaire);
    lfData = new LhcFormData(form);
    component.item = lfData.items[0];
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


  it('should not have a unit field for a quantity without units or unit-open', ()=>{
    const componentDe: DebugElement = fixture.debugElement;
    const errorDe = componentDe.query(By.css('.lhc-item-error'));

  });
});

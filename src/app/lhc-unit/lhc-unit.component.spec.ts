import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DebugElement } from "@angular/core";
import { By } from "@angular/platform-browser";

import { LhcUnitComponent } from './lhc-unit.component';
import { LhcAutocompleteComponent } from '../common/lhc-autocomplete/lhc-autocomplete.component';
import { LhcDataService} from '../../lib/lhc-data.service';
import { LForms as lforms} from '../lforms';
import LhcFormData from '../../lib/lforms/lhc-form-data';
window.LForms = lforms;
require('../../fhir/R4/fhirRequire.js');

describe('LhcUnitComponent', () => {
  let component: LhcUnitComponent;
  let fixture: ComponentFixture<LhcUnitComponent>;
  let lfData;
  let questionnaire;

  beforeAll(async () => {
    var file = 'base/test/data/R4/quantity-units.json';
    questionnaire = await fetch(file);
    questionnaire = await questionnaire.json();
  });

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LhcUnitComponent, LhcAutocompleteComponent ],
      providers: [LhcDataService]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LhcUnitComponent);
    let lhcDataService = TestBed.inject(LhcDataService);
    component = fixture.componentInstance;
    fixture.detectChanges();
    let form = window.LForms.FHIR.R4.SDC.convertQuestionnaireToLForms(questionnaire);
    lfData = new LhcFormData(form);
    lhcDataService.setLhcFormData(lfData);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have a unit field for a quantity without units or unit-open', ()=>{
    component.item = lfData.items[0];
    component.ngOnChanges({}); // Not clear why detectChanges doesn't call this
    fixture.detectChanges();
    const componentDe: DebugElement = fixture.debugElement;
    const unitDe = componentDe.query(By.css('#unit_q1\\/1'));
    expect(unitDe).not.toBeNull();

    // Confirm we can type a value into it
    unitDe.nativeElement.value = 'kg';
    unitDe.nativeElement.dispatchEvent(new Event('change'));
    fixture.detectChanges();
    expect(component.item.unit).toEqual({name: 'kg'});
  });

  it('should have a unit field for a quantity without units but with unit-open=optionsOrString', ()=>{
    component.item = lfData.items[1];
    component.ngOnChanges({}); // Not clear why detectChanges doesn't call this
    fixture.detectChanges();
    const componentDe: DebugElement = fixture.debugElement;
    const unitDe = componentDe.query(By.css('#unit_q2\\/1'));
    expect(unitDe).not.toBeNull();

    // Confirm we can type a value into it
    unitDe.nativeElement.value = 'kg';
    unitDe.nativeElement.dispatchEvent(new Event('change'));
    fixture.detectChanges();
    expect(component.item.unit).toEqual({name: 'kg'});
  });

  it('should have a read-only unit field for a quantity without units but with unit-open=optionsOrType', ()=>{
    component.item = lfData.items[2];
    component.ngOnChanges({}); // Not clear why detectChanges doesn't call this
    fixture.detectChanges();
    const componentDe: DebugElement = fixture.debugElement;
    const unitDe = componentDe.query(By.css('#unit_q3\\/1'));
    expect(unitDe).not.toBeNull();
    // Also check that the field is read-only (at least until we provide a units
    // list for certain systems).
    expect(unitDe.nativeElement.readOnly).toBe(true);
  });

  it('should have a read-only unit field for a quantity without units and unit-open=optionsOnly', ()=>{
    component.item = lfData.items[3];
    component.ngOnChanges({}); // Not clear why detectChanges doesn't call this
    fixture.detectChanges();
    const componentDe: DebugElement = fixture.debugElement;
    const unitDe = componentDe.query(By.css('#unit_q4\\/1'));
    expect(unitDe).not.toBeNull();
    expect(unitDe.nativeElement.readOnly).toBe(true);
  });

// Could not do this part in Karma.  (For example, I could not simulate a tab
// key press, or wait between two blur events.) Switched to Cypress.
/*
  fit('should have a CNE list for a quantity with units list but without unit-open', ()=>{
    component.item = lfData.items[4];
    component.ngOnChanges({}); // Not clear why detectChanges doesn't call this
    fixture.detectChanges();
    const componentDe: DebugElement = fixture.debugElement;
    const unitDe = componentDe.query(By.css('#unit_q5\\/1'));
    expect(unitDe).not.toBeNull();

    // Confirm we cannot type a value into it
    unitDe.nativeElement.dispatchEvent(new Event('click')); // focus element first
    unitDe.nativeElement.value = 'meters';
    unitDe.nativeElement.dispatchEvent(new Event('change'));
  //  fixture.detectChanges();
    unitDe.nativeElement.dispatchEvent(new Event('blur'));
    unitDe.nativeElement.blur();
    window.document.body.click();

    let div = document.createElement('div');
    div.innerHTML = '<input id=unfocus type=text>'
    document.body.appendChild(div);
    document.getElementById('unfocus').click();
    //document.querySelector('#unfocus').click();
   // componentDe.nativeElement.click();
   // componentDe.nativeElement.dispatchEvent(new Event('click')); // focus element first
    fixture.detectChanges();
    document.getElementById('unfocus').click();
    expect(unitDe.nativeElement.value).toBe(undefined);
    expect(component.item.unit).toBe(undefined);
  });

  it('should have a CWE list for a quantity with units list and with unit-open=optionsOrString', ()=>{
    component.item = lfData.items[5];
    component.ngOnChanges({}); // Not clear why detectChanges doesn't call this
    fixture.detectChanges();
    const componentDe: DebugElement = fixture.debugElement;
    const unitDe = componentDe.query(By.css('#unit_q6\\/1'));
    expect(unitDe).not.toBeNull();

    // Confirm we can type a value into it
    unitDe.nativeElement.dispatchEvent(new Event('click')); // focus element first
    unitDe.nativeElement.value = 'meters';
    unitDe.nativeElement.dispatchEvent(new Event('change'));
    fixture.detectChanges();
    unitDe.nativeElement.dispatchEvent(new Event('blur'));
    fixture.detectChanges();
    expect(component.item.unit).toEqual({name: 'meters'});
  });
*/
});

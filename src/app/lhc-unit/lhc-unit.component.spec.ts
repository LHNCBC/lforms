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
    const file = 'base/test/data/R4/quantity-units.json';
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
    const lhcDataService = TestBed.inject(LhcDataService);
    component = fixture.componentInstance;
    fixture.detectChanges();
    const form = window.LForms.FHIR.R4.SDC.convertQuestionnaireToLForms(questionnaire);
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

// Certain tests could not be done in Karma.  (For example, I could not simulate a tab
// key press, or wait between two blur events.) Switched to Cypress for those
// tests, in test/cypress/integration/quantity-cases.spec.js
});

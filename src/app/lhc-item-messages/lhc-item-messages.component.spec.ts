import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DebugElement } from "@angular/core";
import { By } from "@angular/platform-browser";

import { LhcDataService } from '../../lib/lhc-data.service';
import LhcFormData from '../../lib/lforms/lhc-form-data';
import { LForms as lforms} from '../lforms';

import { LhcItemMessagesComponent } from './lhc-item-messages.component';

declare global {
  interface Window { LForms: any; }
}

describe('LhcItemMessagesComponent', () => {
  let component: LhcItemMessagesComponent;
  let fixture: ComponentFixture<LhcItemMessagesComponent>;
  let lfData;

  /**
   *   Initializes the a new value for lfData, used by the tests below.
   */
  function initLFData() {
    lfData = new LhcFormData({"name": "testing",
      "items": [{"linkId": "q1", "question": "question 1", "dataType": "ST"}]});
    lfData.items[0].messages = {'source1': {'errors': {e1: 'An error message', e2: 'Another error message'},
      'warnings': {w1: 'First warning'}}, 'source2': {'warnings': {w2: 'Final warning'}}}
  }


  beforeAll(() => {
    window.LForms = lforms;
  });

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LhcItemMessagesComponent ],
      providers: [LhcDataService]
    })
    .compileComponents();

    let lhcDataService = TestBed.inject(LhcDataService);
    initLFData();
    lhcDataService.setLhcFormData(lfData);
    fixture = TestBed.createComponent(LhcItemMessagesComponent);
    component = fixture.componentInstance;
    component.item = lfData.items[0];
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should not show messages if the level is set to null', ()=>{
    lfData.setMessageLevel(null);
    fixture.detectChanges();
    const componentDe: DebugElement = fixture.debugElement;
    const errorDe = componentDe.query(By.css('.lhc-item-error'));
    expect(errorDe).toBeNull();
    expect(component.showErrors()).toBe(false);
    const warningDe = componentDe.query(By.css('.lhc-item-warning'));
    expect(warningDe).toBeNull();
    expect(component.showWarnings()).toBe(false);
    expect(component.showInfo()).toBe(false);
  });

  it('should show error messages by default', ()=>{
    const componentDe: DebugElement = fixture.debugElement;
    const errorDe = componentDe.query(By.css('.lhc-item-error'));
    expect(errorDe.nativeElement).toBeTruthy();
    expect(component.showErrors()).toBe(true);
    const warningDe = componentDe.query(By.css('.lhc-item-warning'));
    expect(warningDe).toBeNull();
    expect(component.showWarnings()).toBe(false);
    expect(component.showInfo()).toBe(false);
  });

  it('should show only error messages if the level is set to "error"', ()=>{
    lfData.setMessageLevel('error');
    fixture.detectChanges();
    const componentDe: DebugElement = fixture.debugElement;
    const errorDe = componentDe.query(By.css('.lhc-item-error'));
    expect(errorDe.nativeElement).toBeTruthy();
    expect(component.showErrors()).toBe(true);
    const warningDe = componentDe.query(By.css('.lhc-item-warning'));
    expect(warningDe).toBeNull();
    expect(component.showWarnings()).toBe(false);
    expect(component.showInfo()).toBe(false);
  });


  it('should show only errors and warnings if the level is set to "warning"', ()=>{
    lfData.setMessageLevel('warning');
    fixture.detectChanges();
    const componentDe: DebugElement = fixture.debugElement;
    const errorDe = componentDe.query(By.css('.lhc-item-error'));
    expect(errorDe).toBeTruthy();
    expect(component.showErrors()).toBe(true);
    const warningDe = componentDe.query(By.css('.lhc-item-warning'));
    expect(warningDe).toBeTruthy();
    expect(component.showWarnings()).toBe(true);
    expect(component.showInfo()).toBe(false);
  });


  it('should show errors, warnings, and info messages if the level is set to "info"', ()=>{
    lfData.setMessageLevel('info');
    fixture.detectChanges();
    const componentDe: DebugElement = fixture.debugElement;
    const errorDe = componentDe.query(By.css('.lhc-item-error'));
    expect(errorDe).toBeTruthy();
    expect(component.showErrors()).toBe(true);
    const warningDe = componentDe.query(By.css('.lhc-item-warning'));
    expect(warningDe).toBeTruthy();
    expect(component.showWarnings()).toBe(true);
    expect(component.showInfo()).toBe(true);
  });


  describe('messsage structure', ()=> {
    beforeEach(()=>{
      lfData.setMessageLevel('info');
      fixture.detectChanges();
    });

    it('should show multiple messages from one source', ()=>{
      const componentDe: DebugElement = fixture.debugElement;
      const errorDes = componentDe.queryAll(By.css('.lhc-item-error'));
      expect(errorDes.length).toBe(2);
      expect(errorDes[0].nativeElement.textContent).toContain('An error message');
      expect(errorDes[1].nativeElement.textContent).toContain('Another error message');
    });


    it('should show messages from multiple sources', ()=> {
      const componentDe: DebugElement = fixture.debugElement;
      const warningDes = componentDe.queryAll(By.css('.lhc-item-warning'));
      expect(warningDes.length).toBe(2);
      expect(warningDes[0].nativeElement.textContent).toContain('First warning');
      expect(warningDes[1].nativeElement.textContent).toContain('Final warning');
    });
  });
});

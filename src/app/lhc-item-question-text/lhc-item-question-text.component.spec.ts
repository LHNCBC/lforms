import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LhcItemQuestionTextComponent } from './lhc-item-question-text.component';
import { LhcDataService } from '../../lib/lhc-data.service';
import LhcFormData from '../../lib/lforms/lhc-form-data';
import { internalUtil } from "../../lib/lforms/internal-utils.js";
import { DebugElement } from "@angular/core";
import { By } from "@angular/platform-browser";
import { LForms as lforms} from '../lforms';
import {ErrorMessages} from '../../lib/lforms/error-messages.js';
ErrorMessages.setLanguage('en');

declare global {
  interface Window { LForms: any; }
}

describe('LhcItemQuestionTextComponent', () => {
  let component: LhcItemQuestionTextComponent;
  let fixture: ComponentFixture<LhcItemQuestionTextComponent>;
  beforeAll(() => {
    window.LForms = lforms;
  });

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LhcItemQuestionTextComponent ],
      providers: [LhcDataService]
    })
    .compileComponents();

    let lhcDataService = TestBed.inject(LhcDataService);
    let lfData = new LhcFormData({"name": "testing", "items": [{"linkId": "q1", "question": "question 1"}]});
    lhcDataService.setLhcFormData(lfData);
    fixture = TestBed.createComponent(LhcItemQuestionTextComponent);
    component = fixture.componentInstance;
    component.item = lfData.items[0];
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  fit('should not show a warning when warnings have not been added', ()=> {
    const componentDe: DebugElement = fixture.debugElement;
    const warningDe = componentDe.query(By.css('.lf-item-warning'));
    expect(warningDe).toBeNull();
  });

  fit('should show a warning when warnings have not been added', ()=> {
    const componentDe: DebugElement = fixture.debugElement;
    const itemDe = componentDe.query(By.css('#label-q1\\/1'));
    expect(itemDe).toBeTruthy();
    //const item = itemDe.nativeElement;
    internalUtil.addItemWarning(component.item, 'comparatorInQuantity');
component.item.question += 'testing';
    fixture.detectChanges();
    const warningDe = componentDe.query(By.css('.lf-item-warning'));
    expect(warningDe).toBeTruthy();
  });
});

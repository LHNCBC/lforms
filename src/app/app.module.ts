import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Injector,  CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import  { createCustomElement } from '@angular/elements';

import { LhcItemChoiceComponent } from './lhc-item-choice/lhc-item-choice.component';
import { LhcItemChoiceCheckBoxComponent } from './lhc-item-choice-check-box/lhc-item-choice-check-box.component';
import { LhcItemChoiceRadioButtonComponent } from './lhc-item-choice-radio-button/lhc-item-choice-radio-button.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { en_US } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';

import * as ucumPkg from '@lhncbc/ucum-lhc';
import LhcFormUtils from '../lib/lforms/lhc-form-utils.js';
import LhcFormData  from '../lib/lforms/lhc-form-data';
import LhcHL7 from '../lib/lforms/lhc-hl7.js';
import Def from 'autocomplete-lhc'; // see docs at http://lhncbc.github.io/autocomplete-lhc/docs.html
import Validation from '../lib/lforms/lhc-form-validation.js';

import { NzRadioModule } from 'ng-zorro-antd/radio';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzTimePickerModule } from 'ng-zorro-antd/time-picker';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzPopoverModule } from 'ng-zorro-antd/popover';
import { NzSwitchModule } from 'ng-zorro-antd/switch';


import { CopyrightCircleFill, QuestionCircleFill, CopyrightCircleOutline } from '@ant-design/icons-angular/icons';
import { IconDefinition } from '@ant-design/icons-angular';
const icons: IconDefinition[] = [ CopyrightCircleFill, QuestionCircleFill, CopyrightCircleOutline ];

import { LhcItemChoiceAutocompleteComponent } from './lhc-item-choice-autocomplete/lhc-item-choice-autocomplete.component';
import { LhcItemComponent } from './lhc-item/lhc-item.component';
import { LhcUnitComponent } from './lhc-unit/lhc-unit.component';
import { LhcInputComponent } from './lhc-input/lhc-input.component';
import { LhcItemSimpleTypeComponent } from './lhc-item-simple-type/lhc-item-simple-type.component';
import { LhcItemQuantityComponent } from './lhc-item-quantity/lhc-item-quantity.component';
import { LhcAutocompleteComponent } from './common/lhc-autocomplete/lhc-autocomplete.component';
import { LhcValidateComponent } from './lhc-validate/lhc-validate.component';
import { LhcFormComponent } from './lhc-form/lhc-form.component';
import { LhcItemGroupComponent } from './lhc-item-group/lhc-item-group.component';
import { LhcItemBooleanComponent } from './lhc-item-boolean/lhc-item-boolean.component';
import { LhcItemDateComponent } from './lhc-item-date/lhc-item-date.component';
import { LhcItemTimeComponent } from './lhc-item-time/lhc-item-time.component';
import { LhcItemDatetimeComponent } from './lhc-item-datetime/lhc-item-datetime.component';
import { LhcItemTextComponent } from './lhc-item-text/lhc-item-text.component';
import { LhcItemQuestionTextComponent } from './lhc-item-question-text/lhc-item-question-text.component';
import { LhcItemQuestionComponent } from './lhc-item-question/lhc-item-question.component';
import { LhcItemDisplayComponent } from './lhc-item-display/lhc-item-display.component';
import { LhcChangeDetectionComponent } from './lhc-change-detection/lhc-change-detection.component';
import { LhcWatcherComponent} from './lhc-watcher/lhc-watcher.component';
import { LhcGroupVerticalComponent } from './lhc-group-vertical/lhc-group-vertical.component';
import { LhcGroupHorizontalComponent } from './lhc-group-horizontal/lhc-group-horizontal.component';
import { LhcGroupMatrixComponent } from './lhc-group-matrix/lhc-group-matrix.component';
import { SafeHtmlPipe } from './safe-html.pipe';
import { LhcButtonPopoverComponent } from './lhc-button-popover/lhc-button-popover.component';
import { LhcItemAttachmentComponent } from './lhc-item-attachment/lhc-item-attachment.component';

import version from '../version.json';
import * as FHIRSupport from '../fhir/versions.js';

registerLocaleData(en);

@NgModule({
  declarations: [
    LhcItemChoiceComponent,
    LhcItemChoiceCheckBoxComponent,
    LhcItemChoiceRadioButtonComponent,
    LhcItemChoiceAutocompleteComponent,
    LhcItemComponent,
    LhcUnitComponent,
    LhcItemSimpleTypeComponent,
    LhcInputComponent,
    LhcItemQuantityComponent,
    LhcAutocompleteComponent,
    LhcValidateComponent,
    LhcFormComponent,
    LhcItemGroupComponent,
    LhcItemBooleanComponent,
    LhcItemDateComponent,
    LhcItemTimeComponent,
    LhcItemDatetimeComponent,
    LhcItemTextComponent,
    LhcItemQuestionTextComponent,
    LhcItemQuestionComponent,
    LhcItemDisplayComponent,
    LhcChangeDetectionComponent,
    LhcWatcherComponent,
    LhcGroupVerticalComponent,
    LhcGroupHorizontalComponent,
    LhcGroupMatrixComponent,
    SafeHtmlPipe,
    LhcButtonPopoverComponent,
    LhcItemAttachmentComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    NzRadioModule,
    NzCheckboxModule,
    NzDatePickerModule,
    NzTimePickerModule,
    NzGridModule,
    NzPopoverModule,
    NzIconModule.forRoot(icons),
    NzSwitchModule
  ],
  providers: [
    { provide: NZ_I18N, useValue: en_US }
  ],
  bootstrap: [],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
    // NO_ERRORS_SCHEMA
  ],
})


export class AppModule {
  constructor(private injector: Injector) {

    let lforms = {
      LFormsData: LhcFormData,
      HL7: LhcHL7,
      ucumPkg: ucumPkg,
      Util: LhcFormUtils,
      Def: Def,
      Validations: Validation,
      lformsVersion: version.lformsVersion
    }
    lforms.Util.FHIRSupport = FHIRSupport;
    
    window['LForms'] = lforms;
        
    // define the web component
    customElements.define('wc-lhc-form', createCustomElement(LhcFormComponent, { injector: this.injector }));

  }
  
  ngDoBootstrap() {}
}


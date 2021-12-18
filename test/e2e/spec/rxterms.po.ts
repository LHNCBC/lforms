import { element, by } from 'protractor';
// Objects on the RxTerms Demo form
export class RxTerms {
  strengthAndFormID ='/X-002/strengthAndForm/1/1';
  drugName = element(by.id('/X-002/nameAndRoute/1/1'));
  strengthAndForm =  element(by.id(this.strengthAndFormID));
  rxcui = element(by.id('/X-002/RxCUI/1/1'));
}

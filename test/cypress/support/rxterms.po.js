import {protractor, by, element} from "./protractorFacade.js";
// Objects on the RxTerms Demo form
export class RxTerms {
  strengthAndFormID ='/X-002/strengthAndForm/1/1';
  drugName = element(by.id('/X-002/nameAndRoute/1/1'));
  strengthAndForm =  element(by.id(this.strengthAndFormID));
  rxcui = element(by.id('/X-002/RxCUI/1/1'));
}

// Object containing control IDs of the RxTerms Demo form
export const rxtermsControls = {
  strengthAndForm: '/X-002/strengthAndForm/1/1',
  drugName: '/X-002/nameAndRoute/1/1',
  rxcui: '/X-002/RxCUI/1/1'
};

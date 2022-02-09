import {facadeExpect as expect, protractor, by, element} from "../protractorFacade.js";

function assertFHTQuestionnaire(fhirData) {
  expect(fhirData.resourceType).toBe("Questionnaire");
  expect(fhirData.title).toBe("USSG-FHT, (with mock-up items for skip logic demo)");
  expect(fhirData.meta.profile[0]).toBe("http://hl7.org/fhir/uv/sdc/StructureDefinition/sdc-questionnaire|2.7");
  // No URL conversion for now. -Ajay
  //expect(fhirData.url).toBe("http://hl7.org/fhir/us/sdc/Questionnaire/54127-6N");
  expect(fhirData.code[0].code).toBe("54127-6N");
  expect(fhirData.code[0].display).toBe("USSG-FHT, (with mock-up items for skip logic demo)");
  expect(fhirData.code[0].system).toBe("http://loinc.org");
  //expect(fhirData.identifier[0].value).toBe("54127-6N");
  //expect(fhirData.identifier[0].system).toBe("http://loinc.org");

  expect(fhirData.item.length).toBe(2);
  expect(fhirData.item[0].code[0].code).toBe("54126-8");
  expect(fhirData.item[0].code[0].display).toBe("Your health information");
  expect(fhirData.item[0].code[0].system).toBe(undefined);
  expect(fhirData.item[0].text).toBe("Your health information");
  expect(fhirData.item[0].required).toBe(false);
  expect(fhirData.item[0].linkId).toBe("/54126-8");
  expect(fhirData.item[0].type).toBe("group");

  expect(fhirData.item[0].item.length).toBe(13);

  expect(fhirData.item[0].item[0].text).toBe("Name");
  expect(fhirData.item[0].item[0].type).toBe("text");
  expect(fhirData.item[0].item[0].required).toBe(false);
  expect(fhirData.item[0].item[0].repeats).toBe(true);
  expect(fhirData.item[0].item[0].linkId).toBe("/54126-8/54125-0");
  expect(fhirData.item[0].item[0].code[0].code).toBe("54125-0");
  expect(fhirData.item[0].item[0].code[0].display).toBe("Name");
  expect(fhirData.item[0].item[0].code[0].system).toBe(undefined);

  expect(fhirData.item[0].item[12].text).toBe("Your diseases history");
  expect(fhirData.item[0].item[12].type).toBe("group");
  expect(fhirData.item[0].item[12].required).toBe(false);
  expect(fhirData.item[0].item[12].repeats).toBe(true);
  expect(fhirData.item[0].item[12].linkId).toBe("/54126-8/54137-5");
  expect(fhirData.item[0].item[12].code[0].code).toBe("54137-5");
  expect(fhirData.item[0].item[12].code[0].display).toBe("Your diseases history");
  expect(fhirData.item[0].item[12].code[0].system).toBe("http://loinc.org");
  expect(fhirData.item[0].item[12].item.length).toBe(3);

  expect(fhirData.item[0].item[12].item[0].text).toBe("Disease or Condition");
  expect(fhirData.item[0].item[12].item[0].type).toBe("choice");
  expect(fhirData.item[0].item[12].item[0].required).toBe(false);
  expect(fhirData.item[0].item[12].item[0].repeats).toBeFalsy();
  expect(fhirData.item[0].item[12].item[0].linkId).toBe("/54126-8/54137-5/54140-9");
  expect(fhirData.item[0].item[12].item[0].code[0].code).toBe("54140-9");
  expect(fhirData.item[0].item[12].item[0].code[0].display).toBe("Disease or Condition");
  expect(fhirData.item[0].item[12].item[0].code[0].system).toBe("http://loinc.org");
  expect(fhirData.item[0].item[12].item[0].answerOption.length).toBe(66);
  expect(fhirData.item[0].item[12].item[0].answerOption[0].valueCoding.code).toBe("LA10533-0");
  expect(fhirData.item[0].item[12].item[0].answerOption[0].valueCoding.display).toBe("Blood Clots");
  expect(fhirData.item[0].item[12].item[0].answerOption[65].valueCoding.code).toBe("LA10530-6");
  expect(fhirData.item[0].item[12].item[0].answerOption[65].valueCoding.display).toBe("Sudden Infant Death Syndrome");

  expect(fhirData.item[1].item.length).toBe(9);
  expect(fhirData.item[1].code[0].code).toBe("54114-4");
  expect(fhirData.item[1].code[0].display).toBe("Family member health information");
  expect(fhirData.item[1].code[0].system).toBe(undefined);
  expect(fhirData.item[1].text).toBe("Family member health information");
  expect(fhirData.item[1].required).toBe(false);
  expect(fhirData.item[1].linkId).toBe("/54114-4");
  expect(fhirData.item[1].type).toBe("group");
}


module.exports = {
  assertFHTQuestionnaire: assertFHTQuestionnaire
};

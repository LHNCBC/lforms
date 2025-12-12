/**
 *  Defines SDC export functions that deal with template-based extraction.
 */
function addCommonSDCExportTemplateExtractionFns(ns) {
  "use strict";

  var self = ns;


  /**
   *  Convert LForms captured data to a bundle consisting of a FHIR SDC
   *  QuestionnaireResponse and perform template-based extraction.
   *  This technique is called "template-based" because it uses a template resource(s)
   *  to provide all the "boiler-plate" content for the resource that is to be extracted.
   *  These templated resources are contained within the Questionnaire resource and referred to
   *  by either the sdc-questionnaire-templateExtract or sdc-questionnaire-templateExtractBundle extensions.
   * @param lfData a LForms form object
   * @param qr a QuestionnaireResponse object. It is already made available from the Observation based extraction.
   * @returns a transaction Bundle containing all the resources that were extracted from the QuestionnaireResponse.
   */
  self._extractFHIRDataByTemplate = function (lfData, qr) {
    lfData._expressionProcessor._regenerateFhirVariableQ();
    lfData._expressionProcessor._regenerateQuestionnaireResp(qr);
    const templateExtractBundleResult = this._processLFormsDataForTemplateExtractBundle(lfData);
    const bundleResult = templateExtractBundleResult || {
      resourceType: 'Bundle',
      type: 'transaction',
      entry: []
    };
    this._processLFormsItemForTemplateExtract(lfData, bundleResult, lfData.contained, lfData._expressionProcessor);
    // Return null if no resource is extracted, otherwise return the bundle containing the extracted resources.
    if (bundleResult.entry.length) {
      return bundleResult;
    } else {
      return null;
    }
  };


  /**
   * Template-based extraction based on a contained transaction bundle resource template, if exists.
   * The templateExtractBundle extension can only be at the root level.
   * @param lfData a LForms form object
   */
  self._processLFormsDataForTemplateExtractBundle = function (lfData) {
    if (lfData._fhirExt && lfData._fhirExt[this.fhirExtTemplateExtractBundle]) {
      let templateName = lfData._fhirExt[this.fhirExtTemplateExtractBundle][0].valueReference?.reference;
      if (templateName) {
        templateName = templateName.substring(1); // Remove the leading '#'.
        let template = lfData.contained?.find(c => c.id === templateName);
        if (template) {
          template = LForms.Util.deepCopy(template);
          // Pass _fhirVariables into the template as a base for FHIR variables of the template's children.
          // It includes LFormsData level variables (%resource, %questionnaire).
          template._fhirVariables = lfData._fhirVariables;
          // Pass the QR resource as the default context for FHIRPath evaluation for the template.
          return this._processExtractionTemplate(template, lfData._expressionProcessor, lfData._fhirVariables.resource);
        }
      }
    }
    // Return null if the templateExtractBundle extension or template is not found.
    return null;
  };


  /**
   * Recursively, process the LForms item and its children for template-based extraction.
   * @param lfItem a LForms item object
   * @param bundleResult the temporary Bundle object to which the extracted resources will be added by the templateExtract extension.
   * @param contained lfData.contained, which contains the extraction templates.
   * @param expressionProcessor an ExpressionProcessor object that is used to evaluate FHIRPath expressions in the template.
   */
  self._processLFormsItemForTemplateExtract = function(lfItem, bundleResult, contained, expressionProcessor) {
    this._processExtractAllocateId(lfItem, expressionProcessor);
    if (lfItem._fhirExt && lfItem._fhirExt[this.fhirExtTemplateExtract]) {
      const templateExtractSubExtensions = lfItem._fhirExt[this.fhirExtTemplateExtract][0].extension;
      let templateName = templateExtractSubExtensions.find(e => e.url === 'template')?.valueReference.reference;
      if (templateName) {
        templateName = templateName.substring(1); // Remove the leading '#'.
        let template = contained?.find(c => c.id === templateName);
        if (template) {
          template = LForms.Util.deepCopy(template);
          // Pass _fhirVariables into the template as a base for FHIR variables of the template's children.
          // It includes LFormsData level variables (%resource, %questionnaire) and any variables from AllocateId extension.
          template._fhirVariables = expressionProcessor._itemWithVars(lfItem)._fhirVariables;
          // Pass the template's corresponding lfItem as the default context for FHIRPath evaluation for the template.
          const processedTemplate = this._processExtractionTemplate(template, expressionProcessor, lfItem);
          if (processedTemplate) {
            // This template is now processed. Push it to the extracted bundle.
            bundleResult.entry.push(this._getBundleEntryForProcessedTemplate(processedTemplate, templateExtractSubExtensions, expressionProcessor, lfItem));
          }
        }
      }
    }
    if (lfItem.items && Array.isArray(lfItem.items)) {
      lfItem.items.forEach((childItem) => {
        this._processLFormsItemForTemplateExtract(childItem, bundleResult, contained, expressionProcessor);
      });
    }
  };


  /**
   * Assign Bundle.entry properties based on templateExtract sub extensions, and return the Bundle entry.
   * See https://build.fhir.org/ig/HL7/sdc/StructureDefinition-sdc-questionnaire-templateExtract.html#populating-the-transaction-bundle-entry.
   * @param processedTemplate the processed template resource.
   * @param templateExtractSubExtensions sub extensions of the sdc-questionnaire-templateExtract extension.
   * @param expressionProcessor an ExpressionProcessor object that is used to evaluate FHIRPath expressions in the template.
   * @param lfItem the LForms item that has _fhirVariables in its parent tree.
   */
  self._getBundleEntryForProcessedTemplate = function (processedTemplate, templateExtractSubExtensions, expressionProcessor, lfItem) {
    const entry = {
      resource: processedTemplate,
      request: {}
    };
    // Remove the "id" property which only made sense for the contained template.
    delete processedTemplate.id;
    // resourceId
    let resourceId;
    const resourceIdExpression = templateExtractSubExtensions.find(e => e.url === 'resourceId')?.valueString;
    if (resourceIdExpression) {
      resourceId = expressionProcessor._evaluateFHIRPathAgainstContext(processedTemplate, resourceIdExpression, lfItem);
    }
    if (resourceId) {
      processedTemplate.id = resourceId;
      entry.request.method = 'PUT';
      entry.request.url = processedTemplate.resourceType + '/' + resourceId;
    } else {
      entry.request.method = 'POST';
      entry.request.url = processedTemplate.resourceType;
    }
    // fullUrl
    const fullUrlExpression = templateExtractSubExtensions.find(e => e.url === 'fullUrl')?.valueString;
    if (fullUrlExpression) {
      entry.fullUrl =
        expressionProcessor._evaluateFHIRPathAgainstContext(processedTemplate, fullUrlExpression, lfItem) ||
        // Generate a new value if the fullUrl expression evaluates to no result.
        this._commonExport._getUniqueId(fullUrlExpression);
    }
    // request.ifNoneMatch
    const ifNonMatchExpression = templateExtractSubExtensions.find(e => e.url === 'ifNoneMatch')?.valueString;
    if (ifNonMatchExpression) {
      entry.request.ifNoneMatch =
        expressionProcessor._evaluateFHIRPathAgainstContext(processedTemplate, ifNonMatchExpression, lfItem);
    }
    // request.ifModifiedSince
    const ifModifiedSinceExpression = templateExtractSubExtensions.find(e => e.url === 'ifModifiedSince')?.valueString;
    if (ifModifiedSinceExpression) {
      entry.request.ifModifiedSince =
        expressionProcessor._evaluateFHIRPathAgainstContext(processedTemplate, ifModifiedSinceExpression, lfItem);
    }
    // request.ifMatch
    const ifMatchExpression = templateExtractSubExtensions.find(e => e.url === 'ifMatch')?.valueString;
    if (ifMatchExpression) {
      entry.request.ifMatch =
        expressionProcessor._evaluateFHIRPathAgainstContext(processedTemplate, ifMatchExpression, lfItem);
    }
    // request.ifNoneExist
    const ifNoneExistExpression = templateExtractSubExtensions.find(e => e.url === 'ifNoneExist')?.valueString;
    if (ifNoneExistExpression) {
      entry.request.ifNoneExist =
        expressionProcessor._evaluateFHIRPathAgainstContext(processedTemplate, ifNoneExistExpression, lfItem);
    }
    return entry;
  };


  /**
   * Process the sdc-questionnaire-extractAllocateId extension on the item, if any.
   * @param item a LForms item object
   * @param expressionProcessor an ExpressionProcessor object that is used to evaluate FHIRPath expressions in the template.
   */
  self._processExtractAllocateId = function (item, expressionProcessor) {
    if (item._fhirExt && item._fhirExt[this.fhirExtExtractAllocateId]) {
      const fhirPathVariableName = item._fhirExt[this.fhirExtExtractAllocateId][0].valueString;
      item._fhirVariables = expressionProcessor._itemWithVars(item)._fhirVariables;
      item._fhirVariables[fhirPathVariableName] = this._commonExport._getUniqueId(fhirPathVariableName);
    }
  };


  /**
   * Scan the contained template and fill the FHIRPath expressions with user-entered data
   * from the lForms item.
   * @param template a template resource or its child item
   * @param expressionProcessor an ExpressionProcessor object that is used to evaluate FHIRPath expressions in the template.
   * @param fhirPathContext the context for FHIRPath evaluation. It could be a lfItem or an evaluated FHIRPath expression.
   * @returns an extracted resource, or an array of resources if the templateExtractContext evaluates to multiple results.
   */
  self._processExtractionTemplate = function (template, expressionProcessor, fhirPathContext) {
    const templateExtractContextExt = LForms.Util.findObjectInArray(template.extension, 'url', this.fhirExtTemplateExtractContext);
    if (templateExtractContextExt) {
      const templateExtractContext = expressionProcessor._evaluateFHIRPathAgainstContext(fhirPathContext, templateExtractContextExt.valueString, template);
      if (Array.isArray(templateExtractContext) && templateExtractContext.length === 0) {
        // If the context evaluates to no result, this templated property will be removed from the extracted resource.
        return null;
      } else {
        // Remove the templateExtractContext extension from the extracted output after it is processed.
        LForms.Util.removeObjectsFromArray(template.extension, 'url', this.fhirExtTemplateExtractContext, 0, true);
        if (template.extension.length === 0) {
          delete template.extension;
        }
        if (!Array.isArray(templateExtractContext)) {
          fhirPathContext = templateExtractContext;
        } else {
          // If the context evaluates to multiple results, process the template for each context and return an array.
          const processedValue = [];
          templateExtractContext.forEach((v) => {
            if (typeof v === 'object' && v !== null) {
              const templateCopy = LForms.Util.deepCopy(template);
              const valueInArray = this._processExtractionTemplate(templateCopy, expressionProcessor, v);
              if (valueInArray) {
                processedValue.push(valueInArray);
              }
            }
          });
          return processedValue;
        }
      }
    }
    const templateExtractValueExt = LForms.Util.findObjectInArray(template.extension, 'url', this.fhirExtTemplateExtractValue);
    if (templateExtractValueExt) {
      return expressionProcessor._evaluateFHIRPathAgainstContext(fhirPathContext, templateExtractValueExt.valueString, template);
    }
    // Recursively process the template for child properties.
    for (const [key, value] of Object.entries(template)) {
      if (key === '_fhirVariables') {
        continue;
      }
      let processedValue;
      if (Array.isArray(value)) {
        processedValue = [];
        value.forEach((v) => {
          if (typeof v === 'object' && v !== null) {
            v._fhirVariables = template._fhirVariables;
            const valueInArray = this._processExtractionTemplate(v, expressionProcessor, fhirPathContext);
            // If the template property is in a collection, simply remove the templated value from the collection, don't clear the entire collection.
            if (valueInArray) {
              if (Array.isArray(valueInArray)) {
                processedValue.push(...valueInArray);
              } else {
                processedValue.push(valueInArray);
              }
            }
          }
        });
      } else if (typeof value === 'object' && value !== null) {
        value._fhirVariables = template._fhirVariables;
        processedValue = this._processExtractionTemplate(value, expressionProcessor, fhirPathContext);
      } else {
        // Simple properties in the template that are preserved as-is.
        processedValue = value;
      }
      if (processedValue && processedValue !== []) {
        // Update the processed value on the key.
        // If the key starts with "_", e.g. "_key", set the value to property "key" and remove the property "_key".
        // For primitive properties in json the _key and key represent the same FHIR property and must be considered the same property.
        if (key.startsWith('_')) {
          template[key.substring(1)] = processedValue;
          delete template[key];
        } else {
          template[key] = processedValue;
        }
      } else {
        // If it evaluates to no result, this templated property will be removed from the extracted resource.
        delete template[key];
      }
    }
    delete template._fhirVariables;
    return template;
  };


}

export default addCommonSDCExportTemplateExtractionFns;

var extURL = 'http://hl7.org/fhir/uv/sdc/StructureDefinition/sdc-questionnaire-answerExpression';

/**
 *  A generic API for processing an extension found on some node in the
 *  Questionnaire structure being imported.
 *  (The parameter list will likely get more complicated in the future.)
 * @param lfNode the node in the LFormsData structure on which the information
 *  from the extension will be stored.  (In this case, it should be the item).
 * @param fieldName the field name  on which the extension was found (e.g.
 *  'item' or 'title').  This forms part of the field name on lfNode where the
 *  data from the extension will be stored.  (For this extension, this parameter
 *  is not used, because the extension is on the item.)
 * @param extNode the extension's structure with its data.
 */
function processExtension(lfNode, fieldName, extNode) {
  var expr= extNode.valueString;
  if (expr)
    lfNode['_answerExpression'] = expr;
}

export default {
  extURL: extURL,
  processExtension: processExtension
};

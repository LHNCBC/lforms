var extURL = 'http://hl7.org/fhir/StructureDefinition/rendering-style';

/**
 *  A generic API for processing an extension found on some node in the
 *  Questionnaire structure being imported.
 *  (The parameter list will likely get more complicated in the future.)
 * @param lfNode the node in the LFormsData structure on which the information
 *  from the extension will be stored.
 * @param fieldName the field name  on which the extension was found (e.g.
 *  'item' or 'title').  This forms part of the field name on lfNode where the
 *  data from the extension will be stored.
 * @param extNode the extension's structure with its data.
 */
function processExtension(lfNode, fieldName, extNode) {
  var css = extNode.valueString;
  if (css)
    lfNode['_'+fieldName+'CSS'] = css;
}

export default {
  extURL: extURL,
  processExtension: processExtension
};

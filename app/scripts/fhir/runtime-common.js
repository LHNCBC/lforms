import renderingStyle from './extensions/rendering-style';
var extProcessors = {};
extProcessors[renderingStyle.extURL] = renderingStyle.processExtension;

export function addCommonRuntimeFns(ns) {
  var self = ns;

  /**
   *  Processes the extensions on either lfNode, or lfNode[lfFieldName], if
   *  lfFieldName is provided.  Only the extensions for which processors
   *  are written (in the "extensions" sub-directory) are considered.
   * @param lfNode the node in the LFormsData structure on which the information
   *  from the extension will be stored.
   * @param lfFieldName (optional).  Sometimes the extension information is on a
   *  sub-node, (e.g. 'obj_text') in which case this should be the field for
   *  retrieving that sub-node.
   */
  self.processExtensions = function(lfNode, lfFieldName) {
    var fieldData = lfFieldName ? lfNode[lfFieldName] : lfNode;
    if (fieldData) {
      var extensions = fieldData.extension;
      if (extensions) {
        for (var i=0, len=extensions.length; i<len; ++i) {
          var extData = extensions[i];
          var extURL = extData.url;
          var processor = extProcessors[extURL];
          if (processor)
            processor(lfNode, lfFieldName, extData);
        }
      }
    }
  };
}

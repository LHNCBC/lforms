import renderingStyle from './extensions/rendering-style';
var extProcessors = {};
extProcessors[renderingStyle.extURL] = renderingStyle.processExtension;

export function addCommonRuntimeFns(ns) {
  var self = ns;

  self.processExtensions = function(lfNode, lfFieldName) {
    var fieldData = lfNode[lfFieldName]; // could be item or _text
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

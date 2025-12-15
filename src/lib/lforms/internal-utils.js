// Utility functions for files in the lforms project, not intended to be called
// by application code.
import {ErrorMessages} from "./error-messages.js";
import CommonUtils from "../lforms/lhc-common-utils.js";
import CONSTANTS from "./lhc-form-datatypes.js";
import * as htmlparser2 from "htmlparser2";
import parse from "style-to-object";
/**
 *  A default message source identifier (for when the messageSource parameter
 *  below is optional and not provided.
 */
const defaultMsgSource = 'Other message source';

export const InternalUtil = {

  /**
   *  Sets the value of the item, which is the case of a quantity, involves more
   *  than one field (at present -- that might change.)
   * @param item the item receiving the value.
   * @param val the new value, which if it its origin was FHIR, should have
   *  already been processed and converted.  A quantity value is expected to be an Object with
   *  a _type key set to Quantity but with the LForms fields for units ('name',
   *  'code', and 'system'), plus a "value" field.
   * @param type (optional) the type of the value, e.g. 'Quantity'.  If this is
   *  set, then val._type will not be checked.
   * @return {boolean} whether the item.value or item.unit has changed.
   */
  assignValueToItem: function(item, val, type) {
    var changed = false;
    type = type || val && val._type;
    if (val && type === 'Quantity') {
      if (item.value !== val.value) {
        item.value = val.value;
        changed = true;
      }

      var newUnit = {name: val.name};
      if (val.code) {
        newUnit.code = val.code;
        if (val.system) newUnit.system = val.system;
      }
      if (!CommonUtils.deepEqual(item.unit, newUnit)) {
        item.unit = newUnit;
        changed = true;
      }
    }
    else if (!CommonUtils.deepEqual(item.value, val)) {
      item.value = val;
      changed = true;
    }

    return changed;
  },


  /**
   *  Constructs a model object for an off-list unit.
   * @param unitText the text the user typed for the off-list unit
   * @return an object suitable for item.unit.
   */
  modelForOffListUnit: function(text) {
    return text ? {"name": text, "_displayUnit": text} : undefined;
  },


  /**
   * Sets answer.textHTML from the rendering-xhtml extension.
   * @param answer an answer object in Lforms item.
   * @param xhtmlFormat the "rendering-xhtml" extension from Questionnaire.
   * @param allowHTML widget option of whether to allow HTML in forms.
   * @param containedImages contained images info, see buildContainedImageMap() for details.
   * @param item an item from lforms form definition
   */
  setAnswerTextHTML: function(answer, xhtmlFormat, allowHTML, containedImages, item) {
    answer.textHTML = xhtmlFormat.valueString;
    if (allowHTML) {
      // process contained images
      if (containedImages &&
        xhtmlFormat.valueString.match(/img/) &&
        xhtmlFormat.valueString.match(/src/)) {
        answer.textHTML = this._getHtmlStringWithContainedImages(containedImages, xhtmlFormat.valueString) || answer.textHTML;
      }
      let invalidTagsAttributes = this.checkForInvalidHtmlTags(answer.textHTML);
      if (invalidTagsAttributes && invalidTagsAttributes.length > 0) {
        answer._hasInvalidHTMLTagInText = true;
        let errors = {};
        this.errorMessages.addMsg(errors, 'invalidTagInAnswerOptionHTMLContent');
        let messages = [{errors}];
        this.printInvalidHtmlToConsole(invalidTagsAttributes);
        this.setItemMessagesArray(item, messages, 'setAnswerTextHTML');
      }
    }
  },


  /**
   * Check and return not allowed tags within the HTML version of the help text.
   * See https://build.fhir.org/ig/HL7/sdc/rendering.html and
   * https://hl7.org/fhir/R4/narrative.html for allowed subset of the HTML tags.
   * @param {*} htmlNarrative
   * @return [{array}] an array of invalid tags and attributes
   */
  checkForInvalidHtmlTags: function(htmlNarrative, allowExternalURL = false) {
    let invalidTagsAttributes=[];
    let forbiddenTags = ['html','head', 'body', 'ref', 'script', 'form', 'base', 'link', 'xlink', 'iframe', 'object'];
    let deprecatedTags = ['applet', 'basefont', 'blink', 'center', 'dir', 'embed', 'font',
      'frame', 'frameset', 'isindex', 'noframes', 'marquee', 'menu', 'plaintext', 's', 'strike', 'u'];
    const FORBIDDEN_TAGS = forbiddenTags.concat(deprecatedTags);
    const ALLOWED_URI_REGEXP = /^(?:data:|#|\/)/i;
    const FORBIDDEN_ATTR = [];
    // https://developer.mozilla.org/en-US/docs/Web/CSS/url_function
    const CSS_PROPERTIES_WITH_URL = [
      "background",
      "background-image",
      "border",
      "border-image",
      "border-image-source",
      "content",
      "cursor",
      "filter",
      "list-style",
      "list-style-image",
      "mask",
      "mask-image",
      "offset-path",
      "clip-path"
    ];

    // Tags (not in the FORBIDDEN_TAGS list above) that could have a URL value.
    // See https://stackoverflow.com/questions/2725156/complete-list-of-html-tag-attributes-which-have-a-url-value
    // TBD: A full url in 'cite' might not be invalid.
    const TAGS_WITH_URL = {
      "a": ["href"],
      "area": ["href"],
      "blockquote": ["cite"],
      "del": ["cite"],
      "img": ["langdesc","src","usemap"],
      "input": ["src","usemap"],
      "ins": ["cite"],
      "q": ["cite"],
      "audio": ["src"],
      "button": ["formaction"],
      "input": ["formaction"],
      "source": ["src"],
      "tract": ["src"],
      "video": ["poster","src"]
    }
    // Some tags have multiple URL values in an attributes. For example:
    // <img srcset="/image4x.jpg 4x, /image3x.jpg 3x, /image2x.jpg 2x, /image1x.jpg 1x"
    //      src="/image.jpg">
    const TAGS_WITH_MULTIPLE_URLS_IN_ONE_ATTR = {
      "img": "srcset",
      "source": "srcset"  //'srcset' has one URL when <source> is included in <picture> and <video> (where multiple <source> tags are used instead).
    }

    let that = this;
    const parser = new htmlparser2.Parser({
      onopentag(name, attributes) {
        // check tags
        FORBIDDEN_TAGS.forEach(tag => {
          if (name.toLocaleLowerCase() === tag) {
            invalidTagsAttributes.push({"tag": tag});
          }
        });
        // check attributes with one URL value
        for (const [tag, urlAttrs] of Object.entries(TAGS_WITH_URL)) {
          if (name.toLocaleLowerCase() === tag) {
            for (const [attr, value] of Object.entries(attributes)) {
              urlAttrs.forEach(urlAttr => {
                if(attr === urlAttr && !value.match(ALLOWED_URI_REGEXP) &&
                  (urlAttr !== 'href' || !allowExternalURL)) {
                  invalidTagsAttributes.push({"tag": tag, "attribute": urlAttr});
                }
              })
            }
          }
        };
        // check attributes that could have multiple URL values
        for (const [tag, urlAttr] of Object.entries(TAGS_WITH_MULTIPLE_URLS_IN_ONE_ATTR)) {
          if (name.toLocaleLowerCase() === tag) {
            for (const [attr, value] of Object.entries(attributes)) {
              if(attr === urlAttr) {
                let urlValues = value.split(",");
                urlValues.forEach(urlValue => {
                  if (!urlValue.trim().match(ALLOWED_URI_REGEXP)) {
                    invalidTagsAttributes.push({"tag": tag, "attribute": urlAttr});
                  }
                })
              }
            }
          }
        };
        // check attributes (not FORBIDDEN_ATTR for now)
        // for (const [attr, value] of Object.entries(attributes)) {
        //   FORBIDDEN_ATTR.forEach(forbiddenAttr => {
        //     if(attr === forbiddenAttr) {
        //       invalidTagsAttributes.push({"tag": name.toLocaleLowerCase(), "attribute": forbiddenAttr });
        //     }
        //   });
        // }

        // check "style" attribute for URLs
        for (const [attr, value] of Object.entries(attributes)) {
          if(attr === "style") {
            // parse the CSS string
            let cssObj = parse(value);
            for (const [cssProp, cssValue] of Object.entries(cssObj)) {
              CSS_PROPERTIES_WITH_URL.forEach(styleProp => {
                if (cssProp.toLocaleLowerCase() === styleProp) {
                  let forbiddenURLs = that._hasForbiddenCssUrl(cssValue);
                  forbiddenURLs.forEach(urlString => {
                    invalidTagsAttributes.push({"tag": name.toLocaleLowerCase(),
                      "attribute": "style", "cssPropertyValue": styleProp + " : " + urlString });

                  })
                }
              })
            }
          }
        }
      }
      // Do nothing on onclosetag(name, attributes) {}
    });

    parser.write(htmlNarrative);
    parser.end();

    return invalidTagsAttributes;
  },


  /** Check if URLs in CSS have values that are not allowed by FHIR specs
   * (Remote URLs are not allowed)
   * @param {*} cssValue CSS value on the 'style' attribute of a DOM element
   * @returns A array of URLs that are not allowed.
   */
  _hasForbiddenCssUrl: function(cssValue) {
    // possible usage of url() in the cssValue
    // Note: css property name is case-sensitive.
    //
    // //No url(\'https://example.com/images/myImg.jpg\');
    // url("https://example.com/images/myImg.jpg");
    // url(\"https://example.com/images/myImg.jpg\");
    // url('https://example.com/images/myImg.jpg');
    // url(https://example.com/images/myImg.jpg);
    // url("data:image/jpg;base64,iRxVB0…");
    // url(\"data:image/jpg;base64,iRxVB0…\");
    // url('data:image/jpg;base64,iRxVB0…');
    // url(data:image/jpg;base64,iRxVB0…);
    // url(myImg.jpg);
    // url(#IDofSVGpath);

    // Any external URLs are not allowed, including http, https, file
    // or other protocols.
    // url("https://...");
    // url(\"https://...");
    // url('https://...');
    // url(https://...);
    // url("http://...");
    // url(\"http://...");
    // url('http://...');
    // url(http://...);
    // url("file://...");
    // url(\"file://...");
    // url('file://...');
    // url(file://...);

    // sample output:
    //  css= "url(\"img_tree.gif\"), url('file://local.jpg'),url('paper.gif'),url(http://google.com), url(\"example_with_url_inside.gif\"),url('url(123.png)')"
    //  [
    //   "url(\"img_tree.gif\")",
    //   "url('paper.gif')",
    //   "url('file://local.jpg')",
    //   "url(http://google.com)",
    //   "url(\"example_with_url_inside.gif\")",
    //   "url('url(123.png)"
    //  ]

    let forbiddenURLs = [];
    const CSS_URL_REGEXP = /url\(\s*["']?(.*?)["']?\s*\)/g;
    let matched = cssValue.match(CSS_URL_REGEXP)

    const URL_PARAM_REGEXP = /^url\(\s*[\\"']?[A-Za-z0-9]*\:\/\//
    if (matched) {
      for(let i=0; i<matched.length; i++) {
        let urlString = matched[i];
        if (urlString.match(URL_PARAM_REGEXP)) {
          forbiddenURLs.push(urlString)
        }
      }
    }

    return forbiddenURLs;
  },


  /**
   * Prints detailed errors about invalid HTML in console.
   * @param invalidTagsAttributes object of invalid HTML tag and attributes
   * returned from checkForInvalidHtmlTags().
   */
  printInvalidHtmlToConsole: function(invalidTagsAttributes) {
    console.log("Possible invalid HTML tags/attributes:");
    invalidTagsAttributes.forEach(ele => {
      if (ele.attributeValue) {
        console.log("  - Attribute value: " + ele.attributeValue +
          " of " + ele.attribute + " in " + ele.tag);
      }
      else if (ele.attribute)
        console.log("  - Attribute: " + ele.attribute + " in " + ele.tag);
      else if (ele.tag)
        console.log("  - Element: " + ele.tag);
    });
  },


  /**
   *  Sets the "messages" attribute of the given item.  If the given array of
   *  messages object only consists of nulls (no messages), then the messages
   *  attribute will be removed from the item.
   * @param item an item from and lforms form definition
   * @param messages an array of message objects (see _convertFHIRValues for
   * details)
   * @param messageSource a string indentifier for the source of these messages,
   *  to distinguish them from messages from other sources.
   */
  setItemMessagesArray: function(item, messages, messageSource) {
    // Consolidate the array of message objects into one object for this item.
    // The code below is optimized for the usual case where there are no messages.
    let itemMsg, msgTypes;
    for (let m of messages) {
      if (m) {
        if (!itemMsg) {
          itemMsg = {errors: {}, warnings: {}, info: {}};
          msgTypes = Object.keys(itemMsg);
        }
        for (let t of msgTypes) {
          if (m[t]) {
            Object.assign(itemMsg[t], m[t]);
          }
        }
      }
    }
    this.setItemMessages(item, itemMsg, messageSource);
  },


  /**
   *  Updates the "messages" attribute of the given item.  Any extisting
   *  messages are preserved, and new messages are added.  Note that these
   *  messages are statements about things that happened, not validation.
   * @param item an item from and lforms form definition
   * @param messages a message object (see _convertFHIRValues for
   *  details).  May be null or undefined to remove the messages for
   *  messageSource.
   * @param messageSource a string indentifier for the source of these messages,
   *  to distinguish them from messages from other sources.
   */
  setItemMessages: function(item, messages, messageSource) {
    if (messages) {
      if (!item.messages)
        item.messages = {};
      item.messages[messageSource] = messages;
    }
    else if (item.messages) {
      delete item.messages[messageSource];
      if (!Object.keys(item.messages).length)
        delete item.messages;
    }
  },


  /**
   *  Adds a warning message to the given item.
   * @param item the item which should get the warning.
   * @param messageID the ID of the warning message
   * @param messageSource (optional) a string indentifier for the source of these messages,
   *  to distinguish them from messages from other sources.  If not provided a
   *  default source identifier will be used
   */
  addItemWarning: function(item, messageID, messageSource) {
    if (!messageSource)
      messageSource = 'Other message source';
    let msgObj = item.messages;
    if (!msgObj)
      msgObj = item.messages = {};
    let msgsFromSource = msgObj[messageSource];
    if (!msgsFromSource)
      msgsFromSource = msgObj[messageSource] = {};
    let warnings = msgsFromSource.warnings;
    if (!warnings)
      warnings = msgsFromSource.warnings = {};
    warnings[messageID] = ErrorMessages.getMsg(messageID);
    console.log(JSON.stringify(item.messages));
  },


  /**
   *  Removes a warning message from the given item.
   * @param item the item which has the warning.
   * @param messageID the ID of the warning message
   * @param messageSource (optional) a string indentifier for the source of these messages,
   *  to distinguish them from messages from other sources.  If not provided a
   *  default source identifier will be used
   */
  removeItemWarning: function(item, messageID, messageSource) {
    if (!messageSource)
      messageSource = 'Other message source';
    let msgs, msgsFromSource, warnings;
    if ((msgs=item.messages) && (msgsFromSource=msgs[messageSource])
        && (warnings=msgsFromSource.warnings)) {
      delete warnings[messageID];
    }
  },


  /**
   *  Check if the lforms item has an answer list
   * @param {*} item
   * @returns
   */
  hasAnswerList: function(item) {
    return item.dataType === "CODING" || item.answers &&
      (item.dataType === "ST" || item.dataType === "INT" || item.dataType === "DT" || item.dataType === "TM")
  },


  /**
   * Get the rendering-xhtml string, replacing local ids in the 'src' attributes of
   * the 'img' tags if the local ids are in the 'contained' with image data,
   * @param containedImages a hashmap of image data from the "contained" in FHIR questionnaire
   * @param value an HTML string
   */
  _getHtmlStringWithContainedImages: function(containedImages, value) {
    if (containedImages) {
      // go though each image in the html string and replace local ids in image source
      // with contained data
      let parser = new DOMParser();
      let doc = parser.parseFromString(value, "text/html");

      let imgs = doc.getElementsByTagName("img");
      for (let i = 0; i < imgs.length; i++) {
        let urlValue = imgs[i].getAttribute("src");
        if (urlValue && urlValue.match(/^#/)) {
          let localId = urlValue.substring(1);
          let imageData = containedImages[localId];
          if (imageData) {
            imgs[i].setAttribute("src", imageData);
          }
        }
      }
      return doc.body.innerHTML;
    } else {
      return '';
    }
  },


  /**
   * Check an item's skip logic status to decide if the item is enabled
   * @param item an item
   * @returns {boolean}
   */
  targetEnabled: function(item) {
    return item._enableWhenExpVal !== false &&
        item._skipLogicStatus !== CONSTANTS.SKIP_LOGIC.STATUS_DISABLED;
  },


  /**
   * Check an item's skip logic status to decide if the item is disabled and
   * protected.
   * @param item an item
   * @returns {boolean}
   */
  targetDisabledAndProtected: function(item) {
    return item._disabledDisplayStatus === 'protected' &&
        !this.targetEnabled(item);

  },


  /**
   * Check if the item should be displayed.
   * @param item an item
   * @return {boolean}
  */
  targetShown: function(item) {
    return item._disabledDisplayStatus === 'protected' ||
        this.targetEnabled(item);
  },


  /**
   * Construct an id for an answer when it is rendered as a radio button
   * or a checkbox.
   * @param item an item in lhc-forms
   * @param answer an answer in the item's answer list.  If this is a
   *  string  an id for an "Other" option element is created.
   * @returns the constructed id
   */
  getItemAnswerId(item, answer) {
    // A code can contain spaces, but an id cannot.
    // Replace spaces with %20, but first replace % with %25.
    // We have to do the same replacement with answer.text if the code is
    // missing.
    // Also, combine the system with the code as a token (using |).  We will need to
    // escape the | and \ characters .  (See
    // https://www.hl7.org/fhir/R4/search.html#escaping)
    // We should not need to escape the | characters in _elementId for an
    // answer ID, because, the goal is just to make the IDs unique.  However,
    // since the format for an "other" element ID is similar (missing the system
    // component) we do need to escape the | in the element ID in that case.
    let rtn;
    const elemId = item._elementId
    if (typeof answer != 'string') {
      const system = answer.system ? answer.system.replaceAll('\\', '\\\\').replaceAll('|', '\\|') : '';
      const answerCodeOrText = (answer.code || answer.text.toString()).replaceAll('%', '%25')
        .replaceAll(' ', '%20').replaceAll('\\', '\\\\').replaceAll('|', '\\|');
      rtn = elemId + '|'+ system + '|' + answerCodeOrText;
    }
    else
      rtn = elemId.replaceAll('\\', '\\\\').replaceAll('|', '\\|') + '|' + answer;

    return rtn;
  }

}


InternalUtil.errorMessages = ErrorMessages;
// Set the default language for error messages.  Apps can call this with a
// different language code, if error-messages.js has messages in that language.
InternalUtil.errorMessages.setLanguage('en');

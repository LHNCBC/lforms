angular.module('lformsWidget').run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('field-answers.html',
    "<div class=\"lf-field-answers\" ng-switch on=\"item.displayControl.answerLayout.type\">\n" +
    "  <!--list style-->\n" +
    "  <div ng-switch-when=\"RADIO_CHECKBOX\" class=\"lf-answer-type-list\"\n" +
    "   role=\"radiogroup\" aria-labeledby=\"label-{{ item._elementId }}\"\n" +
    "   aria-describedby=\"help-{{ item._elementId }}\">\n" +
    "    <span ng-repeat=\"answer in item._modifiedAnswers track by $index\" class=\"lf-answer {{getAnswerLayoutColumnClass(item)}}\">\n" +
    "      <!--checkboxes for multiple selections-->\n" +
    "      <div ng-if=\"item._multipleAnswers\">\n" +
    "        <input class=\"lf-answer-button\" type=\"checkbox\" id=\"{{item._elementId + answer.code}}\"\n" +
    "               ng-click=\"updateCheckboxList(item, answer)\" ng-disabled=\"item._readOnly\"\n" +
    "               ng-checked=\"checkAnswer(item,answer)\">\n" +
    "        <label class=\"lf-answer-label\" for=\"{{item._elementId + answer.code}}\">{{answer._displayText}}</label>\n" +
    "      </div>\n" +
    "      <!--radio buttons for single selection-->\n" +
    "      <div ng-if=\"!item._multipleAnswers\">\n" +
    "        <input class=\"lf-answer-button\" type=\"radio\" id=\"{{item._elementId + answer.code}}\"\n" +
    "               ng-model=\"item.value\" ng-value=\"answer\" name=\"{{item._elementId}}\"\n" +
    "               ng-click=\"updateRadioList(item)\" ng-disabled=\"item._readOnly\" >\n" +
    "        <label class=\"lf-answer-label\" for=\"{{item._elementId + answer.code}}\">{{answer._displayText}}</label>\n" +
    "      </div>\n" +
    "    </span>\n" +
    "    <!--extra OTHER field-->\n" +
    "    <!--<div class=\"lf-answer-type-list-other\">-->\n" +
    "    <span ng-if=\"item.dataType==='CWE'\" class=\"lf-answer lf-answer-cwe-other {{getAnswerLayoutColumnClass(item)}}\">\n" +
    "      <!--checkboxes for multiple selections-->\n" +
    "      <div ng-if=\"item._multipleAnswers\" class=\"\">\n" +
    "          <input class=\"lf-answer-button\" type=\"checkbox\" ng-model=\"item._otherValueChecked\"\n" +
    "                 id=\"{{item._elementId + '_other'}}\" ng-disabled=\"item._readOnly\"\n" +
    "                 ng-click=\"updateCheckboxListForOther(item, {'code':item.valueOther,'text':item.valueOther})\"\n" +
    "                 ng-checked=\"checkAnswer(item,{'code':item.valueOther,'text':item.valueOther})\">\n" +
    "          <label class=\"lf-answer-label\" for=\"{{item._elementId + '_other'}}\">OTHER:</label>\n" +
    "          <input ng-if=\"item._otherValueChecked\" class=\"lf-answer-other\" type=\"text\" ng-model=\"item.valueOther\"\n" +
    "                 id=\"{{item._elementId + '_otherValue'}}\" ng-disabled=\"item._readOnly\"\n" +
    "                 ng-change=\"updateCheckboxListForOther(item, {'code':item.valueOther,'text':item.valueOther})\">\n" +
    "      </div>\n" +
    "\n" +
    "      <!--radio buttons for single selection-->\n" +
    "      <div ng-if=\"!item._multipleAnswers\" class=\"\">\n" +
    "          <input class=\"lf-answer-button\" type=\"radio\" id=\"{{item._elementId + '_other'}}\"\n" +
    "                 ng-model=\"item._otherValueChecked\" ng-value=\"true\"\n" +
    "                 name=\"{{item._elementId}}\" ng-disabled=\"item._readOnly\"\n" +
    "                 ng-click=\"updateRadioListForOther(item, {'code':item.valueOther,'text':item.valueOther})\">\n" +
    "          <label class=\"lf-answer-label\" for=\"{{item._elementId + '_other'}}\">OTHER:</label>\n" +
    "          <input ng-if=\"item._otherValueChecked\" class=\"lf-answer-other\" type=\"text\"\n" +
    "                 id=\"{{item._elementId + '_otherValue'}}\" ng-model=\"item.valueOther\"\n" +
    "                 ng-change=\"updateRadioListForOther(item, {'code':item.valueOther,'text':item.valueOther})\"\n" +
    "                 ng-disabled=\"item._readOnly\">\n" +
    "      </div>\n" +
    "    </span>\n" +
    "    <!--</div>-->\n" +
    "  </div>\n" +
    "\n" +
    "  <!--COMBO_BOX style (default is 'COMBO_BOX')-->\n" +
    "  <div ng-switch-default class=\"lf-answer-type-combo\">\n" +
    "    <input name=\"{{item.question +'_'+ $id}}\" type=\"text\"\n" +
    "           ng-model=\"item.value\" autocomplete-lhc=\"item._autocompOptions\"\n" +
    "           ng-disabled=\"item._readOnly\" placeholder=\"{{item._toolTip}}\"\n" +
    "           id=\"{{item._elementId}}\"\n" +
    "           ng-focus=\"setActiveRow(item)\" ng-blur=\"activeRowOnBlur(item)\">\n" +
    "  </div>\n" +
    "</div>\n"
  );


  $templateCache.put('field-units.html',
    "<div class=\"lf-field-units\" ng-switch on=\"item.displayControl.unitLayout\">\n" +
    "  <!--list style-->\n" +
    "  <div ng-switch-when=\"RADIO_CHECKBOX\">\n" +
    "    <span ng-repeat=\"unit in item.units\">\n" +
    "      <label>\n" +
    "        <input type=\"radio\" ng-model=\"item.unit\" ng-value=\"unit\" >{{unit.name}}\n" +
    "      </label>\n" +
    "    </span>\n" +
    "  </div>\n" +
    "\n" +
    "  <!--COMBO_BOX style (default is 'COMBO_BOX')-->\n" +
    "  <div ng-switch-default>\n" +
    "    <input class=\"units\" type=\"text\" ng-disabled=\"item._readOnly\"\n" +
    "           ng-model=\"item.unit\" autocomplete-lhc=\"item._unitAutocompOptions\"\n" +
    "           placeholder=\"Select one\" id=\"unit_{{item._elementId}}\" aria-labelledby=\"th_Units\">\n" +
    "  </div>\n" +
    "\n" +
    "</div>\n" +
    "\n"
  );


  $templateCache.put('form-controls.html',
    "<div class=\"stopped\" ng-show=\"isFormDone()\">\n" +
    "  <img ng-src=\"{{::blankGifDataUrl}}\" class=\"stop-sign\">\n" +
    "  <span>This form is complete.</span>\n" +
    "</div>\n" +
    "<div class=\"lf-form-controls\" ng-if=\"!lfData.templateOptions.hideFormControls\">\n" +
    "  <div class=\"lf-form-control\">\n" +
    "    <label><input type=\"checkbox\" value=\"\" ng-model=\"lfData.templateOptions.showQuestionCode\"> Display Question Code</label>\n" +
    "  </div>\n" +
    "\n" +
    "  <div class=\"lf-form-control\">\n" +
    "    <label><input type=\"checkbox\" value=\"\" ng-model=\"lfData.templateOptions.showCodingInstruction\"> Show Help/Description</label>\n" +
    "  </div>\n" +
    "  <div class=\"lf-form-control\">\n" +
    "    <label><input type=\"checkbox\" value=\"\" ng-model=\"lfData.templateOptions.tabOnInputFieldsOnly\"> Keyboard Navigation On Input Fields</label>\n" +
    "  </div>\n" +
    "  <div class=\"lf-form-control\">\n" +
    "    <div class=\"text-info\" >Total # of Questions: {{getNumberOfQuestions()}}</div>\n" +
    "  </div>\n" +
    "</div>\n"
  );


  $templateCache.put('form-header.html',
    "  <div class=\"lf-form-header\" ng-if=\"lfData.templateOptions.showFormHeader\">\n" +
    "    <div class=\"lf-header-de\" ng-style=\"getHeaderItemStyle(item)\"\n" +
    "         ng-repeat=\"item in lfData.templateOptions.formHeaderItems\">\n" +
    "      <div class=\"lf-header-de-label\">\n" +
    "        <span class=\"lf-question\"><label for=\"{{item.questionCode}}\">{{item.question}}</label></span>\n" +
    "      </div>\n" +
    "      <div class=\"lf-header-de-input\" ng-switch on=\"item.dataType\">\n" +
    "        <ng-form name=\"innerForm\">\n" +
    "          <div class=\"lf-form-item-data tooltipContainer\">\n" +
    "            <div class=\"tooltipContent\" lf-validate=\"item\" ng-model=\"item.value\"></div>\n" +
    "            <input ng-switch-when=\"CWE\" name=\"{{item.question}}\" type=\"text\"\n" +
    "                   placeholder=\"Select or type a value\"\n" +
    "                   ng-model=\"item.value\"\n" +
    "                   autocomplete-lhc=\"item._autocompOptions\"\n" +
    "                   id=\"{{item.questionCode}}\"\n" +
    "                   ng-blur=\"activeRowOnBlur(item)\">\n" +
    "            <input ng-switch-when=\"DT\" name=\"{{item.question}}\" type=\"text\"\n" +
    "                   ng-model=\"item.value\" lf-date=\"dateOptions\"\n" +
    "                   placeholder=\"MM/DD/YYYY\"\n" +
    "                   id=\"{{item.questionCode}}\"\n" +
    "                   ng-blur=\"activeRowOnBlur(item)\">\n" +
    "            <input ng-switch-default name=\"{{item.question}}\" type=\"text\"\n" +
    "                   ng-model=\"item.value\" placeholder=\"Type a value\"\n" +
    "                   id=\"{{item.questionCode}}\"\n" +
    "                   ng-blur=\"activeRowOnBlur(item)\">\n" +
    "            <textarea ng-switch-when=\"TX\" name=\"{{item.question}}\"\n" +
    "                      ng-model=\"item.value\" placeholder=\"Type a value\"\n" +
    "                      id=\"{{item.questionCode}}\" ng-keyup=\"autoExpand($event)\" ng-blur=\"autoExpand($event)\" rows=\"1\"\n" +
    "                      ng-blur=\"activeRowOnBlur(item)\">\n" +
    "                      </textarea>\n" +
    "          </div>\n" +
    "        </ng-form>\n" +
    "      </div>\n" +
    "    </div>\n" +
    "  </div>\n"
  );


  $templateCache.put('form-options.html',
    "<div class=\"lf-form-options\" ng-if=\"lfData.templateOptions.showFormOptionPanel\">\n" +
    "\n" +
    "  <div class=\"lf-form-option\">\n" +
    "    <label><input type=\"checkbox\" value=\"\" ng-model=\"lfData.templateOptions.showQuestionCode\">Display question code</label>\n" +
    "  </div>\n" +
    "  <div class=\"lf-form-option\">\n" +
    "    <label><input type=\"checkbox\" value=\"\" ng-model=\"lfData.templateOptions.showCodingInstruction\">Show help/description</label>\n" +
    "  </div>\n" +
    "  <div class=\"lf-form-option\">\n" +
    "    <label><input type=\"checkbox\" value=\"\" ng-model=\"lfData.templateOptions.hideFormControls\">Hide form controls</label>\n" +
    "  </div>\n" +
    "  <div class=\"lf-form-option\">\n" +
    "    <label><input type=\"checkbox\" value=\"\" ng-model=\"lfData.templateOptions.showFormOptionPanelButton\">Display form's option button</label>\n" +
    "  </div>\n" +
    "  <div class=\"lf-form-option\">\n" +
    "    <label><input type=\"checkbox\" value=\"\" ng-model=\"lfData.templateOptions.showFormOptionPanel\">Display form's option panel</label>\n" +
    "  </div>\n" +
    "  <div class=\"lf-form-option\">\n" +
    "    <label><input type=\"checkbox\" value=\"\" ng-model=\"lfData.templateOptions.showItemOptionPanelButton\">Display item's option button</label>\n" +
    "  </div>\n" +
    "  <div class=\"lf-form-option\">\n" +
    "    <label><input type=\"checkbox\" value=\"\" ng-model=\"lfData.templateOptions.hideUnits\">Hide units</label>\n" +
    "  </div>\n" +
    "  <div class=\"lf-form-option\">\n" +
    "    <label><input type=\"checkbox\" value=\"\" ng-model=\"lfData.templateOptions.allowMultipleEmptyRepeatingItems\">Allow multiple empty repeating questions/sections</label>\n" +
    "  </div>\n" +
    "  <div class=\"lf-form-option\">\n" +
    "    <label><input type=\"checkbox\" value=\"\" ng-model=\"lfData.templateOptions.allowHTMLInInstructions\">Allow HTML content in instructions</label>\n" +
    "  </div>\n" +
    "  <div class=\"lf-form-option\">\n" +
    "    <label><input type=\"checkbox\" value=\"\" ng-model=\"lfData.templateOptions.showFormHeader\">Display form header questions</label>\n" +
    "  </div>\n" +
    "  <div class=\"lf-form-option\">\n" +
    "    <label><input type=\"checkbox\" value=\"\" ng-model=\"lfData.templateOptions.showColumnHeaders\">Display column headers</label>\n" +
    "  </div>\n" +
    "  <div class=\"lf-form-option\">\n" +
    "    <label><input type=\"checkbox\" value=\"\" ng-model=\"lfData.templateOptions.useTreeLineStyle\">Tree line style</label>\n" +
    "  </div>\n" +
    "  <div class=\"lf-form-option\">\n" +
    "    <label for=\"viewMode\">View mode</label>\n" +
    "    <select name=\"viewMode\" ng-model=\"lfData.templateOptions.viewMode\">\n" +
    "      <option value=\"auto\">Responsive [auto]</option>\n" +
    "      <option value=\"lg\">For large screen [lg]</option>\n" +
    "      <option value=\"md\">For medium screen [md]</option>\n" +
    "      <option value=\"sm\">For small screen [sm]</option>\n" +
    "    </select>\n" +
    "\n" +
    "  </div>\n" +
    "\n" +
    "</div>\n"
  );


  $templateCache.put('form-title.html',
    "<div class=\"lf-form-title\" role=\"heading\" aria-level=1>\n" +
    "  <span id=\"label-{{ lfData.code }}\" class=\"lf-question\">{{lfData.name}}</span>\n" +
    "  <span class=\"lf-item-code\" ng-if=\"lfData.templateOptions.showQuestionCode\">\n" +
    "        <a ng-if=\"lfData._linkToDef\" href=\"{{ lfData._linkToDef }}\" target=\"_blank\">[{{ lfData.code }}]</a>\n" +
    "        <span ng-if=\"!lfData._linkToDef\">[{{ lfData.code }}]</span>\n" +
    "      </span>\n" +
    "  <button ng-if=\"lfData.copyrightNotice\" id=\"copyright-{{lfData.code}}\" type=\"button\"\n" +
    "          class=\"lf-copyright-button btn-sm\" uib-popover=\"{{lfData.copyrightNotice}}\"\n" +
    "          popover-trigger=\"focus\" popover-placement=\"right\"\n" +
    "          popover-title=\"Copyright\" aria-label=\"Copyright notice\"\n" +
    "          aria-describedby=\"label-{{ lfData.code }}\">\n" +
    "    <span class=\"glyphicon glyphicon-copyright-mark\" aria-hidden=\"true\"></span>\n" +
    "  </button>\n" +
    "  <button ng-if=\"lfData.templateOptions.showFormOptionPanelButton\" type=\"button\" class=\"lf-control-button btn-sm\"\n" +
    "          ng-click=\"hideShowFormOptionPanel()\" aria-label=\"Form Option Panel\">\n" +
    "    <span class=\"glyphicon glyphicon-cog\" aria-hidden=\"true\"></span>\n" +
    "  </button>\n" +
    "\n" +
    "</div>\n"
  );


  $templateCache.put('form-view.html',
    "<div class=\"lf-form-view {{getViewModeClass()}}\" ng-controller=\"LFormsCtrl\" ng-switch on=\"lfData.template\">\n" +
    "  <div ng-switch-when=\"table\">\n" +
    "    <div ng-include=\"'template-table.html'\"></div>\n" +
    "  </div>\n" +
    "  <!-- default is 'table' -->\n" +
    "  <div ng-switch-default>\n" +
    "    <div ng-include=\"'template-table.html'\"></div>\n" +
    "  </div>\n" +
    "\n" +
    "  <!--debugging-->\n" +
    "  <button type=\"button\" ng-if=\"debug\" ng-click=\"onclick()\">Click to debug Panel Controller</button>\n" +
    "\n" +
    "</div>\n"
  );


  $templateCache.put('item-options.html',
    "<div ng-if=\"item._showItemOptionPanel\">\n" +
    "\n" +
    "  <div class=\"lf-item-options lf-section-options\"  ng-if=\"item.dataType==='SECTION'\">\n" +
    "    <div class=\"lf-item-option\">\n" +
    "      <input class=\"lf-answer-button\" type=\"radio\" id=\"{{item._elementId + 'vertical'}}\"\n" +
    "             ng-model=\"item.displayControl.questionLayout\" value=\"vertical\" name=\"{{item._elementId}} +'option'\">\n" +
    "      <label class=\"lf-answer-label\" for=\"{{item._elementId + 'vertical'}}\">Vertical</label>\n" +
    "    </div>\n" +
    "    <div class=\"lf-item-option\" ng-if=\"isQuestionLayoutAllowed(item, 'horizontal')\">\n" +
    "      <input class=\"lf-answer-button\" type=\"radio\" id=\"{{item._elementId + 'horizontal'}}\"\n" +
    "             ng-model=\"item.displayControl.questionLayout\" value=\"horizontal\" name=\"{{item._elementId}} +'option'\">\n" +
    "      <label class=\"lf-answer-label\" for=\"{{item._elementId + 'horizontal'}}\">Horizontal</label>\n" +
    "    </div>\n" +
    "    <div class=\"lf-item-option\" ng-if=\"isQuestionLayoutAllowed(item, 'matrix')\">\n" +
    "      <input class=\"lf-answer-button\" type=\"radio\" id=\"{{item._elementId + 'matrix'}}\"\n" +
    "             ng-model=\"item.displayControl.questionLayout\" value=\"matrix\" name=\"{{item._elementId}} +'option'\">\n" +
    "      <label class=\"lf-answer-label\" for=\"{{item._elementId + 'matrix'}}\">Matrix</label>\n" +
    "    </div>\n" +
    "\n" +
    "  </div>\n" +
    "\n" +
    "  <div class=\"lf-item-options\" ng-if=\"item.answers && (item.dataType==='CWE' || item.dataType==='CNE')\">\n" +
    "    <div class=\"lf-item-option\">\n" +
    "      <input class=\"lf-answer-button\" type=\"radio\" id=\"{{item._elementId + 'combo'}}\"\n" +
    "             ng-model=\"item.displayControl.answerLayout.type\" value=\"COMBO_BOX\" name=\"{{item._elementId}} +'option'\">\n" +
    "      <label class=\"lf-answer-label\" for=\"{{item._elementId + 'combo'}}\">Combo box</label>\n" +
    "    </div>\n" +
    "    <div class=\"lf-item-option\">\n" +
    "      <input class=\"lf-answer-button\" type=\"radio\" id=\"{{item._elementId + 'list'}}\"\n" +
    "             ng-model=\"item.displayControl.answerLayout.type\" value=\"RADIO_CHECKBOX\" name=\"{{item._elementId}} +'option'\">\n" +
    "      <label class=\"lf-answer-label\" for=\"{{item._elementId + 'list'}}\">{{item._multipleAnswers ? \"Checkboxes\" : \"Radio buttons\"}}</label>\n" +
    "    </div>\n" +
    "    <div class=\"lf-item-option\" ng-if=\"item.displayControl.answerLayout.type==='RADIO_CHECKBOX'\">\n" +
    "      <label for=\"{{item._elementId + 'columns'}}\"> Display format:</label>\n" +
    "      <select name=\"{{item._elementId + 'columns'}}\" id=\"{{item._elementId + 'columns'}}\" ng-model=\"item.displayControl.answerLayout.columns\">\n" +
    "        <option value=\"\">---Please select---</option> <!-- not selected / blank option -->\n" +
    "        <option value=\"0\">Compact</option>\n" +
    "        <option value=\"1\">In 1 column</option>\n" +
    "        <option value=\"2\">In 2 columns</option>\n" +
    "        <option value=\"3\">In 3 columns</option>\n" +
    "        <option value=\"4\">In 4 columns</option>\n" +
    "        <option value=\"5\">In 5 columns</option>\n" +
    "        <option value=\"6\">In 6 columns</option>\n" +
    "      </select>\n" +
    "    </div>\n" +
    "  </div>\n" +
    "\n" +
    "</div>\n"
  );


  $templateCache.put('item.html',
    "<div ng-attr-role=\"{{item.header ? 'heading' : undefined}}\"\n" +
    " ng-attr-aria-level=\"{{item.header ? item._displayLevel+1 : undefined}}\"\n" +
    " class=\"lf-form-table-row lf-de {{getSiblingStatus(item)}} {{getRowClass(item)}}\n" +
    "    {{getSkipLogicClass(item)}} {{getActiveRowClass(item)}}\" ng-click=\"setActiveRow(item)\">\n" +
    "  <div class=\"lf-de-label-button\">\n" +
    "    <!-- label -->\n" +
    "    <div class=\"lf-de-label\">\n" +
    "      <span ng-show=\"item._questionRepeatable\" class=\"lf-sn\">{{getRepeatingSN(item) }}</span>\n" +
    "      <span class=\"lf-question\"><label id=\"label-{{ item._elementId }}\" for=\"{{item._elementId}}\">{{item.question}}</label></span>\n" +
    "      <span class=\"lf-item-code\" ng-show=\"lfData.templateOptions.showQuestionCode\">\n" +
    "        <a ng-if=\"item._linkToDef\" href=\"{{ item._linkToDef }}\" target=\"_blank\">[{{ item.questionCode }}]</a>\n" +
    "        <span ng-if=\"!item._linkToDef\">[{{ item.questionCode }}]</span>\n" +
    "      </span>\n" +
    "      <span ng-switch on=\"getCodingInstructionsDisplayType(item)\" ng-if=\"item.codingInstructions\">\n" +
    "        <span ng-switch-when=\"inline-html\" id=\"help-{{ item._elementId }}\"\n" +
    "         class=\"lf-prompt\" ng-bind-html=\"getTrustedCodingInstructions(item)\"></span>\n" +
    "        <span ng-switch-when=\"inline-escaped\" id=\"help-{{ item._elementId }}\"\n" +
    "         class=\"lf-prompt\" ng-bind=\"item.codingInstructions\"></span>\n" +
    "        <button ng-switch-when=\"popover-html\" id=\"helpButton-{{ item._elementId }}\"\n" +
    "                class=\"lf-help-button btn-sm\" uib-popover-template=\"'popover-content.html'\"\n" +
    "                popover-trigger=\"focus\" popover-placement=\"right\"  popover-title=\"Instruction\"\n" +
    "                type=\"button\" aria-label=\"Help\"\n" +
    "                aria-describedby=\"label-{{ item._elementId }}\">\n" +
    "          <span class=\"glyphicon glyphicon-question-sign\" aria-hidden=\"true\"></span>\n" +
    "        </button>\n" +
    "        <button ng-switch-when=\"popover-escaped\" id=\"helpButton-{{ item._elementId }}\"\n" +
    "                class=\"lf-help-button btn-sm\" uib-popover=\"{{item.codingInstructions}}\"\n" +
    "                popover-trigger=\"focus\" popover-placement=\"right\"  popover-title=\"Instruction\"\n" +
    "                type=\"button\" aria-label=\"Help\"\n" +
    "                aria-describedby=\"label-{{ item._elementId }}\">\n" +
    "          <span class=\"glyphicon glyphicon-question-sign\" aria-hidden=\"true\"></span>\n" +
    "        </button>\n" +
    "      </span>\n" +
    "      <button ng-if=\"item.copyrightNotice\" id=\"copyright-{{item._elementId}}\" type=\"button\"\n" +
    "              class=\"lf-copyright-button btn-sm\" uib-popover=\"{{item.copyrightNotice}}\"\n" +
    "              popover-trigger=\"focus\" popover-placement=\"right\" popover-title=\"Copyright\"\n" +
    "              aria-label=\"Copyright notice\" aria-describedby=\"label-{{ item._elementId }}\">\n" +
    "        <span class=\"glyphicon glyphicon-copyright-mark\" aria-hidden=\"true\"></span>\n" +
    "      </button>\n" +
    "      <button ng-if=\"isItemOptionPanelButtonShown(item)\" type=\"button\" class=\"lf-control-button btn-sm\"\n" +
    "              ng-click=\"hideShowItemOptionPanel(item)\" aria-label=\"Item controls\"\n" +
    "              aria-describedby=\"label-{{ item._elementId }}\">\n" +
    "        <span class=\"glyphicon glyphicon-cog\" aria-hidden=\"true\"></span>\n" +
    "      </button>\n" +
    "      <!-- TBD -->\n" +
    "      <lf-item-options></lf-item-options>\n" +
    "    </div>\n" +
    "\n" +
    "    <!-- button -->\n" +
    "    <div class=\"lf-de-button\">\n" +
    "      <button ng-if=\"!hasOneRepeatingItem(item)\" class=\"lf-float-button\" type=\"button\"\n" +
    "              ng-click=\"removeOneRepeatingItem(item)\" id=\"del-{{item._elementId}}\"\n" +
    "              title='Remove this \"{{ item.question }}\"'>-</button>\n" +
    "    </div>\n" +
    "  </div>\n" +
    "\n" +
    "  <div ng-if=\"!item.header\" class=\"lf-de-input-unit\" ng-style=\"getFieldWidth(item)\">\n" +
    "    <!-- input field -->\n" +
    "    <div ng-switch on=\"item.dataType\" class=\"lf-de-input values hasTooltip\">\n" +
    "      <ng-form name=\"innerForm2\">\n" +
    "        <div class=\"lf-form-item-data tooltipContainer\">\n" +
    "          <div class=\"tooltipContent\" lf-validate=\"item\" ng-model=\"item.value\" ng-if=\"item._hasValidation\"></div>\n" +
    "          <div ng-switch-when=\"CNE\">\n" +
    "            <lf-answers item=\"item\"></lf-answers>\n" +
    "          </div>\n" +
    "          <div ng-switch-when=\"CWE\">\n" +
    "            <lf-answers item=\"item\"></lf-answers>\n" +
    "          </div>\n" +
    "\n" +
    "          <input ng-switch-when=\"DT\" name=\"{{item.question}}\" type=\"text\"\n" +
    "                 ng-model=\"item.value\" lf-date=\"dateOptions\" placeholder=\"{{item._toolTip}}\"\n" +
    "                 ng-disabled=\"item._readOnly\" id=\"{{item._elementId}}\" ng-focus=\"setActiveRow(item)\"\n" +
    "                 ng-blur=\"activeRowOnBlur(item)\" aria-describedby=\"help-{{ item._elementId }}\">\n" +
    "          <textarea ng-switch-when=\"TX\" name=\"{{item.question}}\"\n" +
    "                    ng-model=\"item.value\" placeholder=\"{{item._toolTip}}\" ng-disabled=\"item._readOnly\"\n" +
    "                    id=\"{{item._elementId}}\" ng-keyup=\"autoExpand($event)\" ng-blur=\"activeRowOnBlur(item);autoExpand($event)\" rows=\"1\"\n" +
    "                    ng-focus=\"setActiveRow(item)\" aria-describedby=\"help-{{ item._elementId }}\">\n" +
    "          </textarea>\n" +
    "          <textarea ng-switch-when=\"ST\" name=\"{{item.question}}\"\n" +
    "                    ng-model=\"item.value\" placeholder=\"{{item._toolTip}}\" ng-disabled=\"item._readOnly\"\n" +
    "                    id=\"{{item._elementId}}\" ng-keyup=\"autoExpand($event)\" ng-blur=\"activeRowOnBlur(item);autoExpand($event)\" rows=\"1\"\n" +
    "                    ng-focus=\"setActiveRow(item)\" aria-describedby=\"help-{{ item._elementId }}\">\n" +
    "          </textarea>\n" +
    "          <input ng-switch-when=\"BL\" name=\"{{item.question}}\" type=\"checkbox\"\n" +
    "                 ng-model=\"item.value\" placeholder=\"{{item._toolTip}}\" ng-disabled=\"item._readOnly\"\n" +
    "                 id=\"{{item._elementId}}\" ng-focus=\"setActiveRow(item)\"\n" +
    "                 ng-true-value=\"true\" ng-false-value=\"false\"\n" +
    "                 ng-blur=\"activeRowOnBlur(item)\" aria-describedby=\"help-{{ item._elementId }}\">\n" +
    "          <input ng-switch-default name=\"{{item.question}}\" type=\"text\"\n" +
    "                 ng-model=\"item.value\" placeholder=\"{{item._toolTip}}\" ng-disabled=\"item._readOnly\"\n" +
    "                 id=\"{{item._elementId}}\" ng-focus=\"setActiveRow(item)\"\n" +
    "                 ng-blur=\"activeRowOnBlur(item)\" aria-describedby=\"help-{{ item._elementId }}\">\n" +
    "        </div>\n" +
    "      </ng-form>\n" +
    "    </div>\n" +
    "\n" +
    "    <!--unit-->\n" +
    "    <div ng-if=\"!lfData.templateOptions.hideUnits && checkUnits(item)\" class=\"lf-de-unit\">\n" +
    "      <lf-units item=\"item\"></lf-units>\n" +
    "    </div>\n" +
    "\n" +
    "    <!-- extra question -->\n" +
    "    <div ng-if=\"needExtra(item)\" class=\"lf-de-unit\">\n" +
    "      <input class=\"lf-extra-field\" ng-model=\"item.valueOther\" placeholder=\"Please specify\"\n" +
    "             ng-disabled=\"item._readOnly\" type=\"text\" ng-focus=\"setActiveRow(item)\">\n" +
    "    </div>\n" +
    "  </div>\n" +
    "\n" +
    "\n" +
    "</div>\n" +
    "\n"
  );


  $templateCache.put('layout-horizontal.html',
    "<div class=\"lf-layout-horizontal lf-table-item {{getSiblingStatus(item)}} \" ng-if=\"item._horizontalTableHeader && lfData._horizontalTableInfo[item._horizontalTableId]\">\n" +
    "  <div ng-attr-role=\"{{item.header ? 'heading' : undefined}}\"\n" +
    "       ng-attr-aria-level=\"{{item.header ? item._displayLevel+1 : undefined}}\"\n" +
    "       class=\"lf-form-horizontal-table-title lf-de-label\">\n" +
    "    <span class=\"lf-question\"><label id=\"label-{{ item._elementId }}\">{{item.question}}</label></span>\n" +
    "    <span class=\"lf-item-code\" ng-show=\"lfData.templateOptions.showQuestionCode\">\n" +
    "        <a ng-if=\"item._linkToDef\" href=\"{{ item._linkToDef }}\" target=\"_blank\">[{{ item.questionCode }}]</a>\n" +
    "        <span ng-if=\"!item._linkToDef\">[{{ item.questionCode }}]</span>\n" +
    "      </span>\n" +
    "    <span ng-switch on=\"getCodingInstructionsDisplayType(item)\" ng-if=\"item.codingInstructions\">\n" +
    "        <span ng-switch-when=\"inline-html\" class=\"lf-prompt\" ng-bind-html=\"getTrustedCodingInstructions(item)\"></span>\n" +
    "        <span ng-switch-when=\"inline-escaped\" class=\"lf-prompt\" ng-bind=\"item.codingInstructions\"></span>\n" +
    "        <button ng-switch-when=\"popover-html\" class=\"lf-help-button btn-sm\" uib-popover-template=\"'popover.html'\"\n" +
    "                popover-trigger=\"focus\" popover-placement=\"right\"  popover-title=\"Instruction\"\n" +
    "                type=\"button\" id=\"help-{{item._elementId}}\" aria-label=\"Help\"\n" +
    "                aria-describedby=\"label-{{ item._elementId }}\">\n" +
    "          <span class=\"glyphicon glyphicon-question-sign\" aria-hidden=\"true\"></span>\n" +
    "        </button>\n" +
    "        <button ng-switch-when=\"popover-escaped\" class=\"lf-help-button btn-sm\" uib-popover=\"{{item.codingInstructions}}\"\n" +
    "                popover-trigger=\"focus\" popover-placement=\"right\"  popover-title=\"Instruction\"\n" +
    "                type=\"button\" id=\"help-{{item._elementId}}\" aria-label=\"Help\"\n" +
    "                aria-describedby=\"label-{{ item._elementId }}\">\n" +
    "          <span class=\"glyphicon glyphicon-question-sign\" aria-hidden=\"true\"></span>\n" +
    "        </button>\n" +
    "      </span>\n" +
    "    <button ng-if=\"item.copyrightNotice\" id=\"copyright-{{item._elementId}}\" type=\"button\"\n" +
    "            class=\"lf-copyright-button btn-sm\" uib-popover=\"{{item.copyrightNotice}}\"\n" +
    "            popover-trigger=\"focus\" popover-placement=\"right\" popover-title=\"Copyright\"\n" +
    "            aria-label=\"Copyright notice\" aria-describedby=\"label-{{ item._elementId }}\">\n" +
    "      <span class=\"glyphicon glyphicon-copyright-mark\" aria-hidden=\"true\"></span>\n" +
    "    </button>\n" +
    "    <button ng-if=\"isItemOptionPanelButtonShown(item)\" type=\"button\" class=\"lf-control-button btn-sm\"\n" +
    "            ng-click=\"hideShowItemOptionPanel(item)\" aria-label=\"Item controls\"\n" +
    "            aria-describedby=\"label-{{ item._elementId }}\">\n" +
    "      <span class=\"glyphicon glyphicon-cog\" aria-hidden=\"true\"></span>\n" +
    "    </button>\n" +
    "    <!-- TBD -->\n" +
    "    <lf-item-options></lf-item-options>\n" +
    "  </div>\n" +
    "\n" +
    "  <table class=\"lf-form-horizontal-table\">\n" +
    "    <colgroup>\n" +
    "      <col class=\"lf-de-button\" ng-if=\"item._questionRepeatable && lfData._horizontalTableInfo[item._horizontalTableId].tableRows.length>1\">\n" +
    "      <col ng-repeat=\"col in lfData._horizontalTableInfo[item._horizontalTableId].columnHeaders\"\n" +
    "           ng-style=\"getTableColumnStyle(col)\">\n" +
    "    </colgroup>\n" +
    "    <thead>\n" +
    "    <tr>\n" +
    "      <th class=\"lf-form-horizontal-table-header\" ng-if=\"item._questionRepeatable && lfData._horizontalTableInfo[item._horizontalTableId].tableRows.length>1\"></th>\n" +
    "      <th ng-repeat=\"col in lfData._horizontalTableInfo[item._horizontalTableId].columnHeaders\"\n" +
    "          class=\"lf-form-horizontal-table-header\"\n" +
    "          id=\"{{col.id}}\">{{col.label}}</th>\n" +
    "    </tr>\n" +
    "    </thead>\n" +
    "    <tbody id=\"\" class=\"\">\n" +
    "    <tr ng-repeat=\"row in lfData._horizontalTableInfo[item._horizontalTableId].tableRows track by $index\"\n" +
    "        class=\"data-row has-ng-animate\">\n" +
    "      <td class=\"lf-de-button\" ng-if=\"item._questionRepeatable && lfData._horizontalTableInfo[item._horizontalTableId].tableRows.length>1\">\n" +
    "        <button ng-if=\"!hasOneRepeatingItem(item)\" type=\"button\"\n" +
    "                id=\"del-{{row.header._elementId}}\"\n" +
    "                class=\"lf-float-button\" ng-click=\"removeOneRepeatingItem(row.header)\"\n" +
    "                title='Remove this row of \"{{ row.header.question }}\"'>-</button>\n" +
    "      </td>\n" +
    "\n" +
    "      <td ng-repeat=\"cell in row.cells\"\n" +
    "          class=\"hasTooltip {{getRowClass(cell)}} {{getSkipLogicClass(cell)}} {{getActiveRowClass(cell)}}\"\n" +
    "          ng-switch on=\"cell.dataType\">\n" +
    "        <ng-form name=\"innerForm2\">\n" +
    "          <div class=\"lf-form-item-data tooltipContainer\">\n" +
    "            <div class=\"tooltipContent\" lf-validate=\"cell\" ng-model=\"cell.value\" ng-if=\"cell._hasValidation\"></div>\n" +
    "            <span ng-switch-when=\"\" > </span>\n" +
    "            <input ng-switch-when=\"CNE\" name=\"{{cell.question + '_' + $id}}\" type=\"text\"\n" +
    "                   ng-model=\"cell.value\"\n" +
    "                   autocomplete-lhc=\"cell._autocompOptions\"\n" +
    "                   ng-disabled=\"cell._readOnly\" placeholder=\"{{cell._toolTip}}\"\n" +
    "                   id=\"{{cell._elementId}}\"\n" +
    "                   aria-labelledby=\"{{lfData._horizontalTableInfo[item._horizontalTableId].columnHeaders[$index].id}}\"\n" +
    "                   ng-focus=\"setActiveRow(cell)\" ng-blur=\"activeRowOnBlur(cell)\">\n" +
    "            <input ng-switch-when=\"CWE\" name=\"{{cell.question + '_' + $id}}\" type=\"text\"\n" +
    "                   ng-model=\"cell.value\"\n" +
    "                   autocomplete-lhc=\"cell._autocompOptions\"\n" +
    "                   ng-disabled=\"cell._readOnly\" placeholder=\"{{cell._toolTip}}\"\n" +
    "                   id=\"{{cell._elementId}}\"\n" +
    "                   aria-labelledby=\"{{lfData._horizontalTableInfo[item._horizontalTableId].columnHeaders[$index].id}}\"\n" +
    "                   ng-focus=\"setActiveRow(cell)\" ng-blur=\"activeRowOnBlur(cell)\">\n" +
    "            <input ng-switch-when=\"REAL\" name=\"{{cell.question}}\" type=\"text\"\n" +
    "                   ng-model=\"cell.value\"\n" +
    "                   placeholder=\"{{cell._toolTip}}\" ng-disabled=\"cell._readOnly\"\n" +
    "                   id=\"{{cell._elementId}}\"\n" +
    "                   aria-labelledby=\"{{lfData._horizontalTableInfo[item._horizontalTableId].columnHeaders[$index].id}}\"\n" +
    "                   ng-focus=\"setActiveRow(cell)\" ng-blur=\"activeRowOnBlur(cell)\">\n" +
    "            <input ng-switch-when=\"INT\" name=\"{{cell.question}}\" type=\"text\"\n" +
    "                   ng-model=\"cell.value\"\n" +
    "                   placeholder=\"{{cell._toolTip}}\" ng-disabled=\"cell._readOnly\"\n" +
    "                   id=\"{{cell._elementId}}\"\n" +
    "                   aria-labelledby=\"{{lfData._horizontalTableInfo[item._horizontalTableId].columnHeaders[$index].id}}\"\n" +
    "                   ng-focus=\"setActiveRow(cell)\" ng-blur=\"activeRowOnBlur(cell)\">\n" +
    "            <input ng-switch-when=\"DT\" name=\"{{cell.question}}\" type=\"text\"\n" +
    "                   ng-model=\"cell.value\"\n" +
    "                   lf-date=\"dateOptions\" placeholder=\"{{cell._toolTip}}\" ng-disabled=\"cell._readOnly\"\n" +
    "                   id=\"{{cell._elementId}}\"\n" +
    "                   aria-labelledby=\"{{lfData._horizontalTableInfo[item._horizontalTableId].columnHeaders[$index].id}}\"\n" +
    "                   ng-focus=\"setActiveRow(cell)\" ng-blur=\"activeRowOnBlur(cell)\">\n" +
    "            <textarea ng-switch-when=\"TX\" name=\"{{cell.question}}\"\n" +
    "                      ng-model=\"cell.value\" placeholder=\"{{cell._toolTip}}\" ng-disabled=\"cell._readOnly\"\n" +
    "                      id=\"{{cell._elementId}}\"\n" +
    "                      aria-labelledby=\"{{lfData._horizontalTableInfo[item._horizontalTableId].columnHeaders[$index].id}}\"\n" +
    "                      ng-keyup=\"autoExpand($event)\" rows=\"1\"\n" +
    "                      ng-focus=\"setActiveRow(cell)\" ng-blur=\"activeRowOnBlur(cell)\"></textarea>\n" +
    "            <input ng-switch-default name=\"{{cell.question}}\" type=\"text\"\n" +
    "                   ng-model=\"cell.value\" placeholder=\"{{cell._toolTip}}\" ng-disabled=\"cell._readOnly\"\n" +
    "                   id=\"{{cell._elementId}}\"\n" +
    "                   aria-labelledby=\"{{lfData._horizontalTableInfo[item._horizontalTableId].columnHeaders[$index].id}}\"\n" +
    "                   ng-focus=\"setActiveRow(cell)\" ng-blur=\"activeRowOnBlur(cell)\">\n" +
    "          </div>\n" +
    "        </ng-form>\n" +
    "      </td>\n" +
    "    </tr>\n" +
    "    </tbody>\n" +
    "  </table>\n" +
    "\n" +
    "  <div ng-if=\"item._questionRepeatable && targetShown(item) \"\n" +
    "       class=\"lf-form-table-row button-row {{getSkipLogicClass(item)}}\">\n" +
    "    <div class=\"has-popover-warning\">\n" +
    "      <button type=\"button\"\n" +
    "              class=\"lf-float-button\" id=\"add-{{item._elementId}}\"\n" +
    "              ng-click=\"addOneRepeatingItem(item, true)\"\n" +
    "              ng-blur=\"hideUnusedItemWarning(item)\"\n" +
    "              uib-popover='Please enter info in the blank \"{{ item.question }}\".'\n" +
    "              popover-placement=\"top-left\"\n" +
    "              popover-trigger=\"none\"\n" +
    "              popover-is-open=\"item._showUnusedItemWarning\">\n" +
    "        + Add another \"{{item.question}}\"\n" +
    "      </button>\n" +
    "    </div>\n" +
    "  </div>\n" +
    "</div>\n" +
    "\n"
  );


  $templateCache.put('layout-matrix.html',
    "<div class=\"lf-layout-matrix lf-table-item {{getSiblingStatus(item)}}\">\n" +
    "  <div ng-attr-role=\"{{item.header ? 'heading' : undefined}}\"\n" +
    "       ng-attr-aria-level=\"{{item.header ? item._displayLevel+1 : undefined}}\"\n" +
    "       class=\"lf-form-matrix-table-title lf-de-label\">\n" +
    "    <span class=\"lf-question\"><label id=\"label-{{ item._elementId }}\">{{item.question}}</label></span>\n" +
    "    <span class=\"lf-item-code\" ng-show=\"lfData.templateOptions.showQuestionCode\">\n" +
    "      <a ng-if=\"item._linkToDef\" href=\"{{ item._linkToDef }}\" target=\"_blank\">[{{ item.questionCode }}]</a>\n" +
    "      <span ng-if=\"!item._linkToDef\">[{{ item.questionCode }}]</span>\n" +
    "    </span>\n" +
    "    <span ng-switch on=\"getCodingInstructionsDisplayType(item)\" ng-if=\"item.codingInstructions\">\n" +
    "      <span ng-switch-when=\"inline-html\" class=\"lf-prompt\" ng-bind-html=\"getTrustedCodingInstructions(item)\"\n" +
    "       id=\"help-{{ item._elementId }}\"></span>\n" +
    "      <span ng-switch-when=\"inline-escaped\" class=\"lf-prompt\" ng-bind=\"item.codingInstructions\"\n" +
    "       id=\"help-{{ item._elementId }}\"></span>\n" +
    "      <button ng-switch-when=\"popover-html\" class=\"lf-help-button btn-sm\" uib-popover-template=\"'popover.html'\"\n" +
    "              popover-trigger=\"focus\" popover-placement=\"right\"  popover-title=\"Instruction\"\n" +
    "              type=\"button\" id=\"helpButton-{{item._elementId}}\" aria-label=\"Help\"\n" +
    "              aria-describedby=\"label-{{ item._elementId }}\">\n" +
    "        <span class=\"glyphicon glyphicon-question-sign\" aria-hidden=\"true\"></span>\n" +
    "      </button>\n" +
    "      <button ng-switch-when=\"popover-escaped\" class=\"lf-help-button btn-sm\" uib-popover=\"{{item.codingInstructions}}\"\n" +
    "              popover-trigger=\"focus\" popover-placement=\"right\"  popover-title=\"Instruction\"\n" +
    "              type=\"button\" id=\"helpButton-{{item._elementId}}\" aria-label=\"Help\"\n" +
    "              aria-describedby=\"label-{{ item._elementId }}\">\n" +
    "        <span class=\"glyphicon glyphicon-question-sign\" aria-hidden=\"true\"></span>\n" +
    "      </button>\n" +
    "    </span>\n" +
    "    <button ng-if=\"item.copyrightNotice\" id=\"copyright-{{item._elementId}}\" type=\"button\"\n" +
    "            class=\"lf-copyright-button btn-sm\" uib-popover=\"{{item.copyrightNotice}}\"\n" +
    "            popover-trigger=\"focus\" popover-placement=\"right\" popover-title=\"Copyright\"\n" +
    "            aria-label=\"Copyright notice\" aria-describedby=\"label-{{ item._elementId }}\">\n" +
    "      <span class=\"glyphicon glyphicon-copyright-mark\" aria-hidden=\"true\"></span>\n" +
    "    </button>\n" +
    "    <button ng-if=\"isItemOptionPanelButtonShown(item)\" type=\"button\" class=\"lf-control-button btn-sm\"\n" +
    "            ng-click=\"hideShowItemOptionPanel(item)\" aria-label=\"Item controls\"\n" +
    "            aria-describedby=\"label-{{item._elementId}}\">\n" +
    "      <span class=\"glyphicon glyphicon-cog\" aria-hidden=\"true\"></span>\n" +
    "    </button>\n" +
    "    <!-- TBD -->\n" +
    "    <lf-item-options></lf-item-options>\n" +
    "  </div>\n" +
    "  <table class=\"lf-form-matrix-table lf-form-table\">\n" +
    "      <colgroup>\n" +
    "        <col class=\"lf-question\">\n" +
    "        <col ng-repeat=\"answer in item.items[0].answers\">\n" +
    "        <col class=\"other-answer\" ng-if=\"item.items[0].dataType ==='CWE'\">\n" +
    "      </colgroup>\n" +
    "      <thead>\n" +
    "      <tr class=\"lf-\">\n" +
    "        <th class=\"lf-question lf-form-table-header\"></th>\n" +
    "        <th ng-repeat=\"answer in item.items[0].answers\"\n" +
    "            class=\"lf-form-matrix-cell lf-form-table-header\"\n" +
    "            id=\"answer-{{$index}}\">{{answer.text}}</th>\n" +
    "        <th class=\"lf-form-matrix-cell-other lf-form-table-header\" ng-if=\"item.items[0].dataType ==='CWE'\"\n" +
    "         id=\"otherAnswer\">Other</th>\n" +
    "      </tr>\n" +
    "      </thead>\n" +
    "      <tbody>\n" +
    "      <tr ng-repeat=\"subItem in item.items\" role=\"radiogroup\"\n" +
    "         aria-labeledby=\"label-{{subItem._elementId }}\"\n" +
    "         aria-describedby=\"help-{{ subItem._parentItem._elementId }} help-{{ subItem._elementId }}\">\n" +
    "        <td class=\"lf-question\">\n" +
    "          <div class=\"lf-de-label\">\n" +
    "            <span class=\"lf-question\"><label id=\"label-{{ subItem._elementId }}\"\n" +
    "             for=\"{{subItem._elementId}}\">{{subItem.question}}</label></span>\n" +
    "            <span class=\"lf-item-code\" ng-show=\"lfData.templateOptions.showQuestionCode\">\n" +
    "              <a ng-if=\"subItem._linkToDef\" href=\"{{ subItem._linkToDef }}\" target=\"_blank\">[{{ subItem.questionCode }}]</a>\n" +
    "              <span ng-if=\"!subItem._linkToDef\">[{{ subItem.questionCode }}]</span>\n" +
    "            </span>\n" +
    "            <span ng-switch on=\"getCodingInstructionsDisplayType(subItem)\" ng-if=\"subItem.codingInstructions\">\n" +
    "              <span ng-switch-when=\"inline-html\" id=\"help-{{subItem._elementId}}\"\n" +
    "               class=\"lf-prompt\" ng-bind-html=\"getTrustedCodingInstructions(subItem)\"></span>\n" +
    "              <span ng-switch-when=\"inline-escaped\" id=\"help-{{subItem._elementId}}\"\n" +
    "               class=\"lf-prompt\" ng-bind=\"subItem.codingInstructions\"></span>\n" +
    "              <button ng-switch-when=\"popover-html\" class=\"lf-help-button btn-sm\" uib-popover-template=\"'popover.html'\"\n" +
    "                      popover-trigger=\"focus\" popover-placement=\"right\"  popover-title=\"Instruction\"\n" +
    "                      type=\"button\" id=\"helpButton-{{subItem._elementId}}\"\n" +
    "                      aria-label=\"Help\" aria-describedby=\"label-{{ subItem._elementId }}\">\n" +
    "                <span class=\"glyphicon glyphicon-question-sign\" aria-hidden=\"true\"></span>\n" +
    "              </button>\n" +
    "              <button ng-switch-when=\"popover-escaped\" class=\"lf-help-button btn-sm\" uib-popover=\"{{subItem.codingInstructions}}\"\n" +
    "                      popover-trigger=\"focus\" popover-placement=\"right\"  popover-title=\"Instruction\"\n" +
    "                      type=\"button\" id=\"helpButton-{{subItem._elementId}}\" aria-label=\"Help\"\n" +
    "                      aria-describedby=\"label-{{ subItem._elementId }}\">\n" +
    "                <span class=\"glyphicon glyphicon-question-sign\" aria-hidden=\"true\"></span>\n" +
    "              </button>\n" +
    "            </span>\n" +
    "            <button ng-if=\"subItem.copyrightNotice\" id=\"copyright-{{subItem._elementId}}\" type=\"button\"\n" +
    "                    class=\"lf-copyright-button btn-sm\" uib-popover=\"{{subItem.copyrightNotice}}\"\n" +
    "                    popover-trigger=\"focus\" popover-placement=\"right\" popover-title=\"Copyright\"\n" +
    "                    aria-label=\"Copyright notice\"\n" +
    "                    aria-describedby=\"label-{{ subItem._elementId }}\">\n" +
    "              <span class=\"glyphicon glyphicon-copyright-mark\" aria-hidden=\"true\"></span>\n" +
    "            </button>\n" +
    "          </div>\n" +
    "        </td>\n" +
    "        <td ng-repeat=\"answer in item.items[0].answers\"\n" +
    "         class=\"lf-form-matrix-cell\">\n" +
    "          <span class=\"lf-form-matrix-answer\">\n" +
    "            <label ng-if=\"subItem._multipleAnswers\">\n" +
    "              <input type=\"checkbox\" id=\"{{subItem._elementId + answer.code}}\"\n" +
    "               ng-click=\"updateCheckboxList(subItem, answer)\" aria-labeledby=\"answer-{{$index}}\">\n" +
    "            </label>\n" +
    "            <label ng-if=\"!subItem._multipleAnswers\">\n" +
    "              <input type=\"radio\" id=\"{{subItem._elementId + answer.code}}\"\n" +
    "               aria-labeledby=\"answer-{{$index}}\" ng-model=\"subItem.value\" ng-value=\"answer\"\n" +
    "                     name=\"{{subItem._elementId}}\" ng-click=\"updateRadioList(subItem)\">\n" +
    "            </label>\n" +
    "          </span>\n" +
    "        </td>\n" +
    "        <td class=\"lf-form-matrix-cell-other\" ng-if=\"subItem.dataType ==='CWE'\"\n" +
    "         aria-labeledby=otherAnswer>\n" +
    "          <!--for multiple answers-->\n" +
    "          <span ng-if=\"subItem._multipleAnswers\" class=\"lf-form-matrix-answer\">\n" +
    "            <label>\n" +
    "              <input type=\"checkbox\" ng-model=\"subItem._otherValueChecked\"\n" +
    "                     id=\"{{subItem._elementId + '_other'}}\"\n" +
    "                     ng-click=\"updateCheckboxListForOther(subItem, {'code':subItem.valueOther,'text':subItem.valueOther})\">\n" +
    "            </label>\n" +
    "            <label>\n" +
    "              <input type=\"text\" ng-model=\"subItem.valueOther\"\n" +
    "                     id=\"{{subItem._elementId + '_otherValue'}}\"\n" +
    "                     ng-change=\"updateCheckboxListForOther(subItem, {'code':subItem.valueOther,'text':subItem.valueOther})\">\n" +
    "            </label>\n" +
    "          </span>\n" +
    "          <!--for single answer-->\n" +
    "          <span ng-if=\"!subItem._multipleAnswers\" class=\"lf-form-matrix-answer\">\n" +
    "            <label>\n" +
    "              <input type=\"radio\" id=\"{{subItem._elementId + '_other'}}\" ng-model=\"subItem._otherValueChecked\"\n" +
    "                     ng-value=\"true\" name=\"{{subItem._elementId}}\"\n" +
    "                     ng-click=\"updateRadioListForOther(subItem, {'code':subItem.valueOther,'text':subItem.valueOther})\">\n" +
    "            </label>\n" +
    "            <label>\n" +
    "              <input type=\"text\" id=\"{{subItem._elementId + '_otherValue'}}\" ng-model=\"subItem.valueOther\"\n" +
    "                     ng-change=\"updateRadioListForOther(subItem, {'code':subItem.valueOther,'text':subItem.valueOther})\">\n" +
    "            </label>\n" +
    "          </span>\n" +
    "        </td>\n" +
    "      </tr>\n" +
    "      </tbody>\n" +
    "    </table>\n" +
    "  <lf-repeating-button></lf-repeating-button>\n" +
    "</div>\n" +
    "\n"
  );


  $templateCache.put('popover-content.html',
    "<div class=\"lf-popover\" ng-bind-html=\"getTrustedCodingInstructions(item)\"></div>\n"
  );


  $templateCache.put('repeating-button.html',
    "<!--a button at the end of each repeating section-->\n" +
    "<div ng-if=\"item._lastRepeatingItem && targetShown(item) \"\n" +
    "     class=\"lf-form-table-row button-row {{getSkipLogicClass(item)}}\">\n" +
    "  <div class=\"has-popover-warning\">\n" +
    "    <button type=\"button\"\n" +
    "            class=\"lf-float-button\" id=\"add-{{item._elementId}}\"\n" +
    "            ng-click=\"addOneRepeatingItem(item)\"\n" +
    "            ng-blur=\"hideUnusedItemWarning(item)\"\n" +
    "            uib-popover='{{item._unusedItemWarning}}'\n" +
    "            popover-placement=\"top-left\"\n" +
    "            popover-trigger=\"none\"\n" +
    "            popover-is-open=\"item._showUnusedItemWarning\">\n" +
    "      + Add another \"{{item.question}}\"\n" +
    "    </button>\n" +
    "  </div>\n" +
    "</div>\n"
  );


  $templateCache.put('table-item.html',
    "<div class=\"lf-table-item {{getSiblingStatus(item)}}\">\n" +
    "  <!-- question -->\n" +
    "  <lf-item ng-style=\"getItemStyle(item)\"></lf-item>\n" +
    "\n" +
    "  <!--sub sections, check each item's layout -->\n" +
    "  <div ng-if=\"item.items\" class=\"section\">\n" +
    "    <div ng-repeat=\"item in item.items\" ng-if=\"targetShown(item)\"\n" +
    "         class=\"data-row has-ng-animate {{getRowClass(item)}} {{getSkipLogicClass(item)}}\n" +
    "         {{getActiveRowClass(item)}} {{getItemViewModeClass(item)}}\">\n" +
    "      <div ng-if=\"item.header\" ng-switch on=\"item.displayControl.questionLayout\">\n" +
    "        <div ng-switch-when=\"horizontal\">\n" +
    "          <lf-section-horizontal></lf-section-horizontal>\n" +
    "        </div>\n" +
    "        <div ng-switch-when=\"matrix\">\n" +
    "          <lf-section-matrix></lf-section-matrix>\n" +
    "        </div>\n" +
    "        <div ng-switch-when=\"vertical\">\n" +
    "          <lf-table-item></lf-table-item>\n" +
    "        </div>\n" +
    "        <div ng-switch-default>\n" +
    "          <lf-table-item></lf-table-item>\n" +
    "        </div>\n" +
    "      </div>\n" +
    "      <div ng-if=\"!item.header\">\n" +
    "        <lf-table-item></lf-table-item>\n" +
    "      </div>\n" +
    "    </div>\n" +
    "  </div>\n" +
    "  <lf-repeating-button></lf-repeating-button>\n" +
    "</div>"
  );


  $templateCache.put('template-table.html',
    "<form ng-if=\"lfData\" class=\"lf-form lf-template-table {{getIndentationStyle()}}\" novalidate autocomplete=\"false\"\n" +
    "      ng-keydown=\"handleNavigationKeyEventByTab($event)\">\n" +
    "    <!--form controls-->\n" +
    "    <lf-form-controls></lf-form-controls>\n" +
    "    <!--form title-->\n" +
    "    <lf-form-title></lf-form-title>\n" +
    "    <!-- form options -->\n" +
    "    <lf-form-options></lf-form-options>\n" +
    "    <!--form header-->\n" +
    "    <lf-form-header></lf-form-header>\n" +
    "    <!--form body-->\n" +
    "    <div class=\"lf-form-body\">\n" +
    "      <!--check form level questionLayout for matrix and horizontal layouts-->\n" +
    "      <div ng-switch on=\"lfData.templateOptions.displayControl.questionLayout\">\n" +
    "        <!--horizontal-->\n" +
    "        <div ng-switch-when=\"horizontal\" class=\"lf-top-section\">\n" +
    "          <lf-section-horizontal></lf-section-horizontal>\n" +
    "        </div>\n" +
    "        <!--matrix-->\n" +
    "        <div ng-switch-when=\"matrix\" class=\"lf-top-section\">\n" +
    "          <lf-section-matrix></lf-section-matrix>\n" +
    "        </div>\n" +
    "        <!--vertical-->\n" +
    "        <div ng-switch-default>\n" +
    "          <!-- data row, column header -->\n" +
    "          <div class=\"lf-column-header\" ng-if=\"lfData.templateOptions.showColumnHeaders\">\n" +
    "            <div class=\"lf-column-label-button\" id=\"th_Name\">\n" +
    "              {{lfData.templateOptions.columnHeaders[0].name}}\n" +
    "            </div>\n" +
    "            <div class=\"lf-column-input-unit\" ng-style=\"getFieldWidth(item)\">\n" +
    "              <div class=\"lf-column-input\" id=\"th_Value\">\n" +
    "                {{lfData.templateOptions.columnHeaders[1].name}}\n" +
    "              </div>\n" +
    "              <div ng-if=\"!lfData.templateOptions.hideUnits\" class=\"lf-column-unit\" id=\"th_Units\">\n" +
    "                {{lfData.templateOptions.columnHeaders[2].name}}\n" +
    "              </div>\n" +
    "            </div>\n" +
    "          </div>\n" +
    "          <!-- data row, for each item -->\n" +
    "          <!-- check each top level item's questionLayout -->\n" +
    "          <div ng-if=\"lfData.items\" class=\"lf-form-table\">\n" +
    "            <div ng-repeat=\"item in lfData.items\" ng-if=\"targetShown(item)\"\n" +
    "                 class=\"data-row has-ng-animate {{getRowClass(item)}} {{getSkipLogicClass(item)}}\n" +
    "                 {{getActiveRowClass(item)}} {{getItemViewModeClass(item)}}\">\n" +
    "              <!--header item-->\n" +
    "              <div ng-if=\"item.header\" ng-switch on=\"item.displayControl.questionLayout\">\n" +
    "                <div ng-switch-when=\"horizontal\">\n" +
    "                  <lf-section-horizontal></lf-section-horizontal>\n" +
    "                </div>\n" +
    "                <div ng-switch-when=\"matrix\">\n" +
    "                  <lf-section-matrix></lf-section-matrix>\n" +
    "                </div>\n" +
    "                <div ng-switch-when=\"vertical\">\n" +
    "                  <lf-table-item></lf-table-item>\n" +
    "                </div>\n" +
    "                <div ng-switch-default>\n" +
    "                  <lf-table-item></lf-table-item>\n" +
    "                </div>\n" +
    "              </div>\n" +
    "              <!--non-header data item-->\n" +
    "              <div ng-if=\"!item.header\">\n" +
    "                <lf-table-item></lf-table-item>\n" +
    "              </div>\n" +
    "            </div>\n" +
    "          </div>\n" +
    "        </div>\n" +
    "      </div>\n" +
    "    </div>\n" +
    "</form>\n"
  );


  $templateCache.put('uib-popover-templates/uib-popover-template.html',
    "<div class=\"popover\"\n" +
    "  tooltip-animation-class=\"fade\"\n" +
    "  uib-tooltip-classes\n" +
    "  ng-class=\"{ in: isOpen() }\">\n" +
    "  <div class=\"arrow\"></div>\n" +
    "\n" +
    "  <div aria-live=polite class=\"popover-inner\">\n" +
    "      <h3 class=\"popover-title\" ng-bind=\"uibTitle\" ng-if=\"uibTitle\"></h3>\n" +
    "      <div class=\"popover-content\"\n" +
    "        uib-tooltip-template-transclude=\"contentExp()\"\n" +
    "        tooltip-template-transclude-scope=\"originScope()\"></div>\n" +
    "  </div>\n" +
    "</div>\n"
  );


  $templateCache.put('uib-popover-templates/uib-popover.html',
    "<div class=\"popover\"\n" +
    "  tooltip-animation-class=\"fade\"\n" +
    "  uib-tooltip-classes\n" +
    "  ng-class=\"{ in: isOpen() }\">\n" +
    "  <div class=\"arrow\"></div>\n" +
    "\n" +
    "  <div aria-live=polite class=\"popover-inner\">\n" +
    "      <h3 class=\"popover-title\" ng-bind=\"uibTitle\" ng-if=\"uibTitle\"></h3>\n" +
    "      <div class=\"popover-content\" ng-bind=\"content\" ng-if=\"content\"></div>\n" +
    "  </div>\n" +
    "</div>\n"
  );

}]);

angular.module('lformsWidget').run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('field-answers.html',
    "<div class=\"lf-field-answers\" ng-switch on=\"getAnswerLayoutType(item)\">\n" +
    "  <!--list style-->\n" +
    "  <div ng-switch-when=\"list\" class=\"lf-answer-type-list\">\n" +
    "    <span ng-repeat=\"answer in item.answers track by $index\" class=\"lf-answer {{getAnswerLayoutColumnClass(item)}}\">\n" +
    "      <!--checkboxes for multiple selections-->\n" +
    "      <div ng-if=\"item._multipleAnswers\">\n" +
    "        <input class=\"lf-answer-button\" type=\"checkbox\" id=\"{{item._elementId + answer.code}}\"\n" +
    "               ng-click=\"updateCheckboxList(item, answer)\">\n" +
    "        <label class=\"lf-answer-label\" for=\"{{item._elementId + answer.code}}\">{{answer.text}}</label>\n" +
    "      </div>\n" +
    "      <!--radio buttons for single selection-->\n" +
    "      <div ng-if=\"!item._multipleAnswers\">\n" +
    "        <input class=\"lf-answer-button\" type=\"radio\" id=\"{{item._elementId + answer.code}}\"\n" +
    "               ng-model=\"item.value\" ng-value=\"answer\" name=\"{{item._elementId}}\"\n" +
    "               ng-click=\"updateRadioList(item)\">\n" +
    "        <label class=\"lf-answer-label\" for=\"{{item._elementId + answer.code}}\">{{answer.text}}</label>\n" +
    "      </div>\n" +
    "    </span>\n" +
    "    <!--extra OTHER field-->\n" +
    "    <span ng-if=\"item.dataType==='CWE'\" class=\"lf-answer {{getAnswerLayoutColumnClass(item)}}\">\n" +
    "      <!--checkboxes for multiple selections-->\n" +
    "      <div ng-if=\"item._multipleAnswers\" class=\"\">\n" +
    "          <input class=\"lf-answer-button\" type=\"checkbox\" ng-model=\"item._otherValueChecked\"\n" +
    "                 id=\"{{item._elementId + '_other'}}\"\n" +
    "                 ng-click=\"updateCheckboxListForOther(item, {'code':item.valueOther,'text':item.valueOther})\">\n" +
    "          <label class=\"lf-answer-label\" for=\"{{item._elementId + '_other'}}\">OTHER:</label>\n" +
    "          <input class=\"lf-answer-other\" type=\"text\" ng-model=\"item.valueOther\"\n" +
    "                 id=\"{{item._elementId + '_otherValue'}}\"\n" +
    "                 ng-change=\"updateCheckboxListForOther(item, {'code':item.valueOther,'text':item.valueOther})\">\n" +
    "      </div>\n" +
    "\n" +
    "      <!--radio buttons for single selection-->\n" +
    "      <div ng-if=\"!item._multipleAnswers\" class=\"\">\n" +
    "          <input class=\"lf-answer-button\" type=\"radio\" id=\"{{item._elementId + '_other'}}\" ng-model=\"item._otherValueChecked\" ng-value=\"true\"\n" +
    "                 name=\"{{item._elementId}}\"\n" +
    "                 ng-click=\"updateRadioListForOther(item, {'code':item.valueOther,'text':item.valueOther})\">\n" +
    "          <label class=\"lf-answer-label\" for=\"{{item._elementId + '_other'}}\">OTHER:</label>\n" +
    "          <input class=\"lf-answer-other\" type=\"text\" id=\"{{item._elementId + '_otherValue'}}\" ng-model=\"item.valueOther\"\n" +
    "                 ng-change=\"updateRadioListForOther(item, {'code':item.valueOther,'text':item.valueOther})\">\n" +
    "      </div>\n" +
    "    </span>\n" +
    "  </div>\n" +
    "\n" +
    "  <!--combo style (default is 'combo')-->\n" +
    "  <div ng-switch-default class=\"lf-answer-type-combo\">\n" +
    "    <input name=\"{{item.question +'_'+ $id}}\" type=\"text\"\n" +
    "           ng-model=\"item.value\" autocomplete-lhc=\"item._autocompOptions\"\n" +
    "           ng-readonly=\"item._readOnly\" placeholder=\"{{item._toolTip}}\"\n" +
    "           id=\"{{item._elementId}}\"\n" +
    "           ng-focus=\"setActiveRow(item)\" ng-blur=\"activeRowOnBlur(item)\">\n" +
    "  </div>\n" +
    "</div>\n"
  );


  $templateCache.put('field-units.html',
    "<div class=\"lf-field-units\" ng-switch on=\"item.displayControl.unitLayout\">\n" +
    "  <!--list style-->\n" +
    "  <div ng-switch-when=\"list\">\n" +
    "    <span ng-repeat=\"unit in item.units\">\n" +
    "      <label>\n" +
    "        <input type=\"radio\" ng-model=\"item.unit\" ng-value=\"unit\" >{{unit.name}}\n" +
    "      </label>\n" +
    "    </span>\n" +
    "  </div>\n" +
    "\n" +
    "  <!--combo style (default is 'combo')-->\n" +
    "  <div ng-switch-default>\n" +
    "    <input class=\"units\" type=\"text\" ng-readonly=\"item._readOnly\"\n" +
    "           ng-model=\"item.unit\" autocomplete-lhc=\"item._unitAutocompOptions\"\n" +
    "           placeholder=\"Select one\" id=\"unit_{{item._elementId}}\" aria-labelledby=\"th_Units\">\n" +
    "  </div>\n" +
    "\n" +
    "</div>\n" +
    "\n"
  );


  $templateCache.put('form-controls.html',
    "<div class=\"lf-form-controls\">\n" +
    "  <div class=\"stopped\" ng-show=\"isFormDone()\"><img ng-src=\"{{::blankGifDataUrl}}\" class=\"stop-sign\"><span>This form is complete.</span></div>\n" +
    "  <div class=\"row\" ng-if=\"!lfData.templateOptions.hideHeader\">\n" +
    "    <div class=\"col-xs-3\">\n" +
    "      <div ng-hide=\"lfData.templateOptions.hideCheckBoxes\" class=\"checkbox\">\n" +
    "        <label><input type=\"checkbox\" value=\"\" ng-model=\"lfData.templateOptions.showQuestionCode\">Display Question Code</label>\n" +
    "      </div>\n" +
    "    </div>\n" +
    "    <div class=\"col-xs-3\">\n" +
    "      <div ng-hide=\"lfData.templateOptions.hideCheckBoxes\" class=\"checkbox\">\n" +
    "        <label><input type=\"checkbox\" value=\"\" ng-model=\"lfData.templateOptions.showCodingInstruction\">Show Help/Description</label>\n" +
    "      </div>\n" +
    "    </div>\n" +
    "    <div class=\"col-xs-3\">\n" +
    "      <div ng-hide=\"lfData.templateOptions.hideCheckBoxes\" class=\"checkbox\">\n" +
    "        <label><input type=\"checkbox\" value=\"\" ng-model=\"lfData.templateOptions.tabOnInputFieldsOnly\">Keyboard Navigation On Input Fields</label>\n" +
    "      </div>\n" +
    "    </div>\n" +
    "    <div class=\"col-xs-3 text-right\">\n" +
    "      <div class=\"text-info\" >Total # of Questions: {{getNumberOfQuestions()}}</div>\n" +
    "    </div>\n" +
    "  </div>\n" +
    "</div>\n"
  );


  $templateCache.put('form-header.html',
    "  <div class=\"lf-form-header\" ng-if=\"lfData.templateOptions.obrHeader\">\n" +
    "    <div class=\"lf-header-de\" ng-repeat=\"item in lfData.templateOptions.obrItems\">\n" +
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
    "          </div>\n" +
    "        </ng-form>\n" +
    "      </div>\n" +
    "    </div>\n" +
    "  </div>\n"
  );


  $templateCache.put('form-view.html',
    "<div class=\"lf-form-view\" ng-controller=\"LFormsCtrl\" ng-switch on=\"lfData.template\">\n" +
    "  <div ng-switch-when=\"table\">\n" +
    "    <div ng-include=\"'template-table.html'\"></div>\n" +
    "  </div>\n" +
    "  <div ng-switch-when=\"list\">\n" +
    "    <div ng-include=\"'template-list.html'\"></div>\n" +
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


  $templateCache.put('item.html',
    "<div class=\"lf-form-table-row lf-de {{getSiblingStatus(item)}} {{getRowClass(item)}}\n" +
    "    {{getSkipLogicClass(item)}} {{getActiveRowClass(item)}}\" ng-click=\"setActiveRow(item)\">\n" +
    "  <div class=\"lf-de-label-button\">\n" +
    "    <!-- label -->\n" +
    "    <div class=\"lf-de-label\">\n" +
    "      <span ng-show=\"item._questionRepeatable\" class=\"lf-sn\">{{getRepeatingSN(item) }}</span>\n" +
    "      <span class=\"lf-question\"><label for=\"{{item._elementId}}\">{{item.question}}</label></span>\n" +
    "      <span class=\"item-code\" ng-show=\"lfData.templateOptions.showQuestionCode\">\n" +
    "                      <a ng-if=\"item._linkToDef\" href=\"{{ item._linkToDef }}\" target=\"_blank\">[{{ item.questionCode }}]</a>\n" +
    "                      <span ng-if=\"!item._linkToDef\">[{{ item.questionCode }}]</span>\n" +
    "                    </span>\n" +
    "      <span ng-switch on=\"getCodingInstructionsDisplayType(item)\" ng-if=\"item.codingInstructions\">\n" +
    "                      <span ng-switch-when=\"inline-html\" class=\"prompt\" ng-bind-html=\"getTrustedCodingInstructions(item)\"></span>\n" +
    "                      <span ng-switch-when=\"inline-escaped\" class=\"prompt\" ng-bind=\"item.codingInstructions\"></span>\n" +
    "                      <button ng-switch-when=\"popover-html\" class=\"help-button\" uib-popover-template=\"'popover.html'\"\n" +
    "                              popover-trigger=\"focus\" popover-placement=\"right\"  popover-title=\"Instruction\"\n" +
    "                              type=\"button\" id=\"help-{{item._elementId}}\">?</button>\n" +
    "                      <button ng-switch-when=\"popover-escaped\" class=\"help-button\" uib-popover=\"{{item.codingInstructions}}\"\n" +
    "                              popover-trigger=\"focus\" popover-placement=\"right\"  popover-title=\"Instruction\"\n" +
    "                              type=\"button\" id=\"help-{{item._elementId}}\">?</button>\n" +
    "                    </span>\n" +
    "      <button ng-if=\"item.copyrightNotice\" id=\"copyright-{{item._elementId}}\" type=\"button\"\n" +
    "              class=\"copyright-button\" uib-popover=\"{{item.copyrightNotice}}\"\n" +
    "              popover-trigger=\"focus\" popover-placement=\"right\" popover-title=\"Copyright\">&#9400;</button>\n" +
    "    </div>\n" +
    "\n" +
    "    <!-- button -->\n" +
    "    <div class=\"lf-de-button\">\n" +
    "      <button ng-if=\"!hasOneRepeatingItem(item)\" class=\"float-button\" type=\"button\"\n" +
    "              ng-click=\"removeOneRepeatingItem(item)\" id=\"del-{{item._elementId}}\"\n" +
    "              title=\"Remove this '{{ item.question }}'\">-</button>\n" +
    "    </div>\n" +
    "  </div>\n" +
    "\n" +
    "  <div ng-if=\"!item.header\" class=\"lf-de-input-unit\" ng-style=\"getScreenWidth()\">\n" +
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
    "          <!--<input ng-switch-when=\"CNE\" name=\"{{item.question +'_'+ $id}}\" type=\"text\"-->\n" +
    "                 <!--ng-model=\"item.value\" autocomplete-lhc=\"item._autocompOptions\"-->\n" +
    "                 <!--ng-readonly=\"item._readOnly\" placeholder=\"{{item._toolTip}}\"-->\n" +
    "                 <!--id=\"{{item._elementId}}\" ng-focus=\"setActiveRow(item)\"-->\n" +
    "                 <!--ng-blur=\"activeRowOnBlur(item)\">-->\n" +
    "          <!--<input ng-switch-when=\"CWE\" name=\"{{item.question +'_'+ $id}}\" type=\"text\"-->\n" +
    "                 <!--ng-model=\"item.value\" autocomplete-lhc=\"item._autocompOptions\"-->\n" +
    "                 <!--ng-readonly=\"item._readOnly\" placeholder=\"{{item._toolTip}}\"-->\n" +
    "                 <!--id=\"{{item._elementId}}\" ng-focus=\"setActiveRow(item)\"-->\n" +
    "                 <!--ng-blur=\"activeRowOnBlur(item)\">-->\n" +
    "          <input ng-switch-when=\"REAL\" name=\"{{item.question}}\" type=\"text\"\n" +
    "                 ng-model=\"item.value\" placeholder=\"{{item._toolTip}}\"\n" +
    "                 ng-readonly=\"item._readOnly\" id=\"{{item._elementId}}\" ng-focus=\"setActiveRow(item)\"\n" +
    "                 ng-blur=\"activeRowOnBlur(item)\">\n" +
    "          <input ng-switch-when=\"INT\" name=\"{{item.question}}\" type=\"text\"\n" +
    "                 ng-model=\"item.value\" placeholder=\"{{item._toolTip}}\"\n" +
    "                 ng-readonly=\"item._readOnly\" id=\"{{item._elementId}}\" ng-focus=\"setActiveRow(item)\"\n" +
    "                 ng-blur=\"activeRowOnBlur(item)\">\n" +
    "          <input ng-switch-when=\"DT\" name=\"{{item.question}}\" type=\"text\"\n" +
    "                 ng-model=\"item.value\" lf-date=\"dateOptions\" placeholder=\"{{item._toolTip}}\"\n" +
    "                 ng-readonly=\"item._readOnly\" id=\"{{item._elementId}}\" ng-focus=\"setActiveRow(item)\"\n" +
    "                 ng-blur=\"activeRowOnBlur(item)\">\n" +
    "          <textarea ng-switch-when=\"TX\" name=\"{{item.question}}\"\n" +
    "                    ng-model=\"item.value\" placeholder=\"{{item._toolTip}}\" ng-readonly=\"item._readOnly\"\n" +
    "                    id=\"{{item._elementId}}\" ng-keyup=\"autoExpand($event)\" ng-blur=\"autoExpand($event)\" rows=\"1\"\n" +
    "                    ng-focus=\"setActiveRow(item)\"\n" +
    "                    ng-blur=\"activeRowOnBlur(item)\">\n" +
    "                      </textarea>\n" +
    "          <input ng-switch-default name=\"{{item.question}}\" type=\"text\"\n" +
    "                 ng-model=\"item.value\" placeholder=\"{{item._toolTip}}\" ng-readonly=\"item._readOnly\"\n" +
    "                 id=\"{{item._elementId}}\" ng-focus=\"setActiveRow(item)\"\n" +
    "                 ng-blur=\"activeRowOnBlur(item)\">\n" +
    "        </div>\n" +
    "      </ng-form>\n" +
    "    </div>\n" +
    "\n" +
    "    <!--&lt;!&ndash;units&ndash;&gt;-->\n" +
    "    <!--<div ng-if=\"!lfData.templateOptions.hideUnits && checkUnits(item)\" class=\"lf-de-unit\">-->\n" +
    "      <!--<input class=\"units\" type=\"text\"-->\n" +
    "             <!--ng-model=\"item.unit\" autocomplete-lhc=\"item._unitAutocompOptions\"-->\n" +
    "             <!--placeholder=\"Select one\" aria-labelledby=\"th_Units\">-->\n" +
    "    <!--</div>-->\n" +
    "    <!--unit-->\n" +
    "    <div ng-if=\"!lfData.templateOptions.hideUnits && checkUnits(item)\" class=\"lf-de-unit\">\n" +
    "      <lf-units item=\"item\"></lf-units>\n" +
    "    </div>\n" +
    "\n" +
    "    <!-- extra question -->\n" +
    "    <div ng-if=\"needExtra(item)\" class=\"lf-de-unit\">\n" +
    "      <input class=\"lf-extra-field\" ng-model=\"item.valueOther\" placeholder=\"Please specify\"\n" +
    "             ng-readonly=\"item._readOnly\" type=\"text\" ng-focus=\"setActiveRow(item)\">\n" +
    "    </div>\n" +
    "  </div>\n" +
    "\n" +
    "</div>\n" +
    "\n"
  );


  $templateCache.put('layout-horizontal.html',
    "<div class=\"lf-layout-horizontal lf-table-item {{getSiblingStatus(item)}} \" ng-if=\"item._horizontalTableHeader && lfData._horizontalTableInfo[item._horizontalTableId]\">\n" +
    "  <div class=\"lf-form-horizontal-table-title lf-de-label\">\n" +
    "    <span class=\"lf-question\">{{item.question}}</span>\n" +
    "  </div>\n" +
    "\n" +
    "  <table class=\"lf-form-horizontal-table\">\n" +
    "    <colgroup>\n" +
    "      <col class=\"lf-de-button\" ng-if=\"item._questionRepeatable && lfData._horizontalTableInfo[item._horizontalTableId].tableRows.length>1\">\n" +
    "      <col ng-repeat=\"col in lfData._horizontalTableInfo[item._horizontalTableId].columnHeaders\"\n" +
    "           ng-style=\"{{getTableColumnStyle(col)}}\">\n" +
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
    "                class=\"float-button\" ng-click=\"removeOneRepeatingItem(row.header)\"\n" +
    "                title=\"Remove this row of '{{ row.header.question }}'\">-</button>\n" +
    "      </td>\n" +
    "\n" +
    "      <td ng-repeat=\"cell in row.cells\"\n" +
    "          class=\"hasTooltip\"\n" +
    "          ng-switch on=\"cell.dataType\">\n" +
    "        <ng-form name=\"innerForm2\">\n" +
    "          <div class=\"lf-form-item-data tooltipContainer\">\n" +
    "            <div class=\"tooltipContent\" lf-validate=\"cell\" ng-model=\"cell.value\" ng-if=\"cell._hasValidation\"></div>\n" +
    "            <span ng-switch-when=\"\" > </span>\n" +
    "            <input ng-switch-when=\"CNE\" name=\"{{cell.question + '_' + $id}}\" type=\"text\"\n" +
    "                   ng-model=\"cell.value\"\n" +
    "                   autocomplete-lhc=\"cell._autocompOptions\"\n" +
    "                   ng-readonly=\"cell._readOnly\" placeholder=\"{{cell._toolTip}}\"\n" +
    "                   id=\"{{cell._elementId}}\"\n" +
    "                   aria-labelledby=\"{{lfData._horizontalTableInfo[item._horizontalTableId].columnHeaders[$index].id}}\"\n" +
    "                   ng-focus=\"setActiveRow(cell)\" ng-blur=\"activeRowOnBlur(cell)\">\n" +
    "            <input ng-switch-when=\"CWE\" name=\"{{cell.question + '_' + $id}}\" type=\"text\"\n" +
    "                   ng-model=\"cell.value\"\n" +
    "                   autocomplete-lhc=\"cell._autocompOptions\"\n" +
    "                   ng-readonly=\"cell._readOnly\" placeholder=\"{{cell._toolTip}}\"\n" +
    "                   id=\"{{cell._elementId}}\"\n" +
    "                   aria-labelledby=\"{{lfData._horizontalTableInfo[item._horizontalTableId].columnHeaders[$index].id}}\"\n" +
    "                   ng-focus=\"setActiveRow(cell)\" ng-blur=\"activeRowOnBlur(cell)\">\n" +
    "            <input ng-switch-when=\"REAL\" name=\"{{cell.question}}\" type=\"text\"\n" +
    "                   ng-model=\"cell.value\"\n" +
    "                   placeholder=\"{{cell._toolTip}}\" ng-readonly=\"cell._readOnly\"\n" +
    "                   id=\"{{cell._elementId}}\"\n" +
    "                   aria-labelledby=\"{{lfData._horizontalTableInfo[item._horizontalTableId].columnHeaders[$index].id}}\"\n" +
    "                   ng-focus=\"setActiveRow(cell)\" ng-blur=\"activeRowOnBlur(cell)\">\n" +
    "            <input ng-switch-when=\"INT\" name=\"{{cell.question}}\" type=\"text\"\n" +
    "                   ng-model=\"cell.value\"\n" +
    "                   placeholder=\"{{cell._toolTip}}\" ng-readonly=\"cell._readOnly\"\n" +
    "                   id=\"{{cell._elementId}}\"\n" +
    "                   aria-labelledby=\"{{lfData._horizontalTableInfo[item._horizontalTableId].columnHeaders[$index].id}}\"\n" +
    "                   ng-focus=\"setActiveRow(cell)\" ng-blur=\"activeRowOnBlur(cell)\">\n" +
    "            <input ng-switch-when=\"DT\" name=\"{{cell.question}}\" type=\"text\"\n" +
    "                   ng-model=\"cell.value\"\n" +
    "                   lf-date=\"dateOptions\" placeholder=\"{{cell._toolTip}}\" ng-readonly=\"cell._readOnly\"\n" +
    "                   id=\"{{cell._elementId}}\"\n" +
    "                   aria-labelledby=\"{{lfData._horizontalTableInfo[item._horizontalTableId].columnHeaders[$index].id}}\"\n" +
    "                   ng-focus=\"setActiveRow(cell)\" ng-blur=\"activeRowOnBlur(cell)\">\n" +
    "            <textarea ng-switch-when=\"TX\" name=\"{{cell.question}}\"\n" +
    "                      ng-model=\"cell.value\" placeholder=\"{{cell._toolTip}}\" ng-readonly=\"cell._readOnly\"\n" +
    "                      id=\"{{cell._elementId}}\"\n" +
    "                      aria-labelledby=\"{{lfData._horizontalTableInfo[item._horizontalTableId].columnHeaders[$index].id}}\"\n" +
    "                      ng-keyup=\"autoExpand($event)\" rows=\"1\"\n" +
    "                      ng-focus=\"setActiveRow(cell)\" ng-blur=\"activeRowOnBlur(cell)\"></textarea>\n" +
    "            <input ng-switch-default name=\"{{cell.question}}\" type=\"text\"\n" +
    "                   ng-model=\"cell.value\" placeholder=\"{{cell._toolTip}}\" ng-readonly=\"cell._readOnly\"\n" +
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
    "              class=\"float-button\" id=\"add-{{item._elementId}}\"\n" +
    "              title=\"Add another '{{ item.question }}'\"\n" +
    "              ng-click=\"addOneRepeatingItem(item, true)\"\n" +
    "              ng-blur=\"hideUnusedItemWarning(item)\"\n" +
    "              uib-popover='Please enter info in the blank \"{{ item.question }}\".'\n" +
    "              popover-placement=\"top-left\"\n" +
    "              popover-trigger=\"none\"\n" +
    "              popover-is-open=\"item._showUnusedItemWarning\">\n" +
    "        Add another '{{item.question}}'\n" +
    "      </button>\n" +
    "    </div>\n" +
    "  </div>\n" +
    "</div>\n" +
    "\n"
  );


  $templateCache.put('layout-matrix.html',
    "<div class=\"lf-layout-matrix lf-table-item {{getSiblingStatus(item)}}\">\n" +
    "  <div class=\"lf-form-matrix-table-title lf-de-label\">\n" +
    "    <span class=\"lf-question\">{{item.question}}</span>\n" +
    "  </div>\n" +
    "  <table class=\"lf-form-matrix-table lf-form-table\">\n" +
    "      <colgroup>\n" +
    "        <col class=\"name\">\n" +
    "        <col ng-repeat=\"answer in item.items[0].answers\">\n" +
    "        <col class=\"other-answer\" ng-if=\"item.items[0].dataType ==='CWE'\">\n" +
    "      </colgroup>\n" +
    "      <thead>\n" +
    "      <tr>\n" +
    "        <th class=\"name\"></th>\n" +
    "        <th ng-repeat=\"answer in item.items[0].answers\"\n" +
    "            class=\"lf-form-matrix-cell lf-form-table-header\">{{answer.text}}</th>\n" +
    "        <th class=\"lf-form-matrix-cell-other lf-form-table-header\" ng-if=\"item.items[0].dataType ==='CWE'\">Other</th>\n" +
    "      </tr>\n" +
    "      </thead>\n" +
    "      <tbody>\n" +
    "      <tr ng-repeat=\"subItem in item.items\">\n" +
    "        <td class=\"name\">\n" +
    "          <div class=\"lf-de-label\">\n" +
    "            <span><label for=\"{{subItem._elementId}}\">{{subItem.question}}</label></span>\n" +
    "            <span class=\"item-code\" ng-show=\"lfData.templateOptions.showQuestionCode\">\n" +
    "              <a ng-if=\"subItem._linkToDef\" href=\"{{ subItem._linkToDef }}\" target=\"_blank\">[{{ subItem.questionCode }}]</a>\n" +
    "              <span ng-if=\"!subItem._linkToDef\">[{{ subItem.questionCode }}]</span>\n" +
    "            </span>\n" +
    "            <span ng-switch on=\"getCodingInstructionsDisplayType(subItem)\" ng-if=\"subItem.codingInstructions\">\n" +
    "              <span ng-switch-when=\"inline-html\" class=\"prompt\" ng-bind-html=\"getTrustedCodingInstructions(subItem)\"></span>\n" +
    "              <span ng-switch-when=\"inline-escaped\" class=\"prompt\" ng-bind=\"subItem.codingInstructions\"></span>\n" +
    "              <button ng-switch-when=\"popover-html\" class=\"help-button\" uib-popover-template=\"'popover.html'\"\n" +
    "                      popover-trigger=\"focus\" popover-placement=\"right\"  popover-title=\"Instruction\"\n" +
    "                      type=\"button\" id=\"help-{{subItem._elementId}}\">?</button>\n" +
    "              <button ng-switch-when=\"popover-escaped\" class=\"help-button\" uib-popover=\"{{subItem.codingInstructions}}\"\n" +
    "                      popover-trigger=\"focus\" popover-placement=\"right\"  popover-title=\"Instruction\"\n" +
    "                      type=\"button\" id=\"help-{{subItem._elementId}}\">?</button>\n" +
    "            </span>\n" +
    "            <button ng-if=\"subItem.copyrightNotice\" id=\"copyright-{{subItem._elementId}}\" type=\"button\"\n" +
    "                    class=\"copyright-button\" uib-popover=\"{{subItem.copyrightNotice}}\"\n" +
    "                    popover-trigger=\"focus\" popover-placement=\"right\" popover-title=\"Copyright\">&#9400;</button>\n" +
    "          </div>\n" +
    "        </td>\n" +
    "        <td ng-repeat=\"answer in item.items[0].answers\" class=\"lf-form-matrix-cell\">\n" +
    "          <span class=\"lf-form-matrix-answer\">\n" +
    "            <label ng-if=\"subItem._multipleAnswers\">\n" +
    "              <input type=\"checkbox\" id=\"{{subItem._elementId + answer.code}}\" ng-click=\"updateCheckboxList(subItem, answer)\">\n" +
    "            </label>\n" +
    "            <label ng-if=\"!subItem._multipleAnswers\">\n" +
    "              <input type=\"radio\" id=\"{{subItem._elementId + answer.code}}\" ng-model=\"subItem.value\" ng-value=\"answer\"\n" +
    "                     name=\"{{subItem._elementId}}\" ng-click=\"updateRadioList(subItem)\">\n" +
    "            </label>\n" +
    "          </span>\n" +
    "        </td>\n" +
    "        <td class=\"lf-form-matrix-cell-other\" ng-if=\"subItem.dataType ==='CWE'\">\n" +
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


  $templateCache.put('list-item.html',
    "<div class=\"lf-list-item\">\n" +
    "  <!--question-->\n" +
    "  <div class=\"lf-de-label\" >\n" +
    "    <span ng-show=\"item._questionRepeatable\" class=\"sn\">{{getRepeatingSN(item) }}</span>\n" +
    "    <span><label for=\"{{item._elementId}}\">{{item.question}}</label></span>\n" +
    "    <span class=\"item-code\" ng-show=\"lfData.templateOptions.showQuestionCode\">\n" +
    "      <a ng-if=\"item._linkToDef\" href=\"{{ item._linkToDef }}\" target=\"_blank\">[{{ item.questionCode }}]</a>\n" +
    "      <span ng-if=\"!item._linkToDef\">[{{ item.questionCode }}]</span>\n" +
    "    </span>\n" +
    "    <span ng-switch on=\"getCodingInstructionsDisplayType(item)\" ng-if=\"item.codingInstructions\">\n" +
    "      <span ng-switch-when=\"inline-html\" class=\"prompt\" ng-bind-html=\"getTrustedCodingInstructions(item)\"></span>\n" +
    "      <span ng-switch-when=\"inline-escaped\" class=\"prompt\" ng-bind=\"item.codingInstructions\"></span>\n" +
    "      <button ng-switch-when=\"popover-html\" class=\"help-button\" uib-popover-template=\"'popover.html'\"\n" +
    "              popover-trigger=\"focus\" popover-placement=\"right\"  popover-title=\"Instruction\"\n" +
    "              type=\"button\" id=\"help-{{item._elementId}}\">?</button>\n" +
    "      <button ng-switch-when=\"popover-escaped\" class=\"help-button\" uib-popover=\"{{item.codingInstructions}}\"\n" +
    "              popover-trigger=\"focus\" popover-placement=\"right\"  popover-title=\"Instruction\"\n" +
    "              type=\"button\" id=\"help-{{item._elementId}}\">?</button>\n" +
    "    </span>\n" +
    "    <button ng-if=\"item.copyrightNotice\" id=\"copyright-{{item._elementId}}\" type=\"button\"\n" +
    "            class=\"copyright-button\" uib-popover=\"{{item.copyrightNotice}}\"\n" +
    "            popover-trigger=\"focus\" popover-placement=\"right\" popover-title=\"Copyright\">&#9400;</button>\n" +
    "    <!--buttons-->\n" +
    "    <!--<div class=\"lf-de-button\">-->\n" +
    "    <button ng-if=\"!hasOneRepeatingItem(item)\" class=\"float-button\"\n" +
    "            ng-click=\"removeOneRepeatingItem(item)\" id=\"del-{{item._elementId}}\"\n" +
    "            type=\"button\" title=\"Remove this '{{ item.question }}'\">-</button>\n" +
    "    <!--</div>-->\n" +
    "  </div>\n" +
    "  <!--input field-->\n" +
    "  <ng-form name=\"innerForm2\" class=\"hasTooltip\">\n" +
    "    <div class=\"lf-form-item-data tooltipContainer\" ng-switch on=\"item.dataType\">\n" +
    "      <div class=\"tooltipContent\" lf-validate=\"item\" ng-model=\"item.value\" ng-if=\"item._hasValidation\"></div>\n" +
    "      <span ng-switch-when=\"SECTION\" id=\"{{item._elementId}}\"> </span>\n" +
    "      <span ng-switch-when=\"TTILE\" id=\"{{item._elementId}}\"> </span>\n" +
    "      <div ng-switch-when=\"CNE\">\n" +
    "        <lf-answers item=\"item\"></lf-answers>\n" +
    "      </div>\n" +
    "      <div ng-switch-when=\"CWE\">\n" +
    "        <lf-answers item=\"item\"></lf-answers>\n" +
    "      </div>\n" +
    "      <input ng-switch-when=\"REAL\" name=\"{{item.question}}\" type=\"text\"\n" +
    "             ng-model=\"item.value\" placeholder=\"{{item._toolTip}}\"\n" +
    "             ng-readonly=\"item._readOnly\" id=\"{{item._elementId}}\"\n" +
    "             ng-focus=\"setActiveRow(item)\"\n" +
    "             ng-blur=\"activeRowOnBlur(item)\">\n" +
    "      <input ng-switch-when=\"INT\" name=\"{{item.question}}\" type=\"text\"\n" +
    "             ng-model=\"item.value\" placeholder=\"{{item._toolTip}}\"\n" +
    "             ng-readonly=\"item._readOnly\" id=\"{{item._elementId}}\"\n" +
    "             ng-focus=\"setActiveRow(item)\"\n" +
    "             ng-blur=\"activeRowOnBlur(item)\">\n" +
    "      <input ng-switch-when=\"DT\" name=\"{{item.question}}\" type=\"text\"\n" +
    "             ng-model=\"item.value\" lf-date=\"dateOptions\" placeholder=\"{{item._toolTip}}\"\n" +
    "             ng-readonly=\"item._readOnly\" id=\"{{item._elementId}}\"\n" +
    "             ng-focus=\"setActiveRow(item)\"\n" +
    "             ng-blur=\"activeRowOnBlur(item)\">\n" +
    "      <textarea ng-switch-when=\"TX\" name=\"{{item.question}}\"\n" +
    "                ng-model=\"item.value\" placeholder=\"{{item._toolTip}}\" ng-readonly=\"item._readOnly\"\n" +
    "                id=\"{{item._elementId}}\" ng-keyup=\"autoExpand($event)\" ng-blur=\"autoExpand($event)\" rows=\"1\"\n" +
    "                ng-focus=\"setActiveRow(item)\"\n" +
    "                ng-blur=\"activeRowOnBlur(item)\">\n" +
    "      </textarea>\n" +
    "      <input ng-switch-default name=\"{{item.question}}\" type=\"text\"\n" +
    "             ng-model=\"item.value\" placeholder=\"{{item._toolTip}}\" ng-readonly=\"item._readOnly\"\n" +
    "             id=\"{{item._elementId}}\"\n" +
    "             ng-focus=\"setActiveRow(item)\"\n" +
    "             ng-blur=\"activeRowOnBlur(item)\">\n" +
    "    </div>\n" +
    "  </ng-form>\n" +
    "  <!--unit-->\n" +
    "  <div ng-if=\"!lfData.templateOptions.hideUnits && checkUnits(item)\">\n" +
    "    <lf-units item=\"item\"></lf-units>\n" +
    "  </div>\n" +
    "  <!--extra question-->\n" +
    "  <div ng-if=\"needExtra(item) && targetShown(item)\" ng-click=\"setActiveRow(item)\"\n" +
    "       class=\"extra-row {{getRowClass(item)}} {{getSkipLogicClass(item)}} {{getActiveRowClass(item)}}\">\n" +
    "    <input ng-model=\"item.valueOther\" placeholder=\"Please specify\" ng-readonly=\"item._readOnly\"\n" +
    "           ng-focus=\"setActiveRow(item)\">\n" +
    "  </div>\n" +
    "  <!--sub sections, check each item's layout -->\n" +
    "  <div ng-if=\"item.items\" class=\"section\">\n" +
    "    <div ng-repeat=\"item in item.items\" ng-if=\"targetShown(item)\"\n" +
    "         class=\"data-row has-ng-animate {{getRowClass(item)}} {{getSkipLogicClass(item)}} {{getActiveRowClass(item)}}\"\n" +
    "         ng-click=\"setActiveRow(item)\">\n" +
    "      <div ng-if=\"item.header\" ng-switch on=\"item.displayControl.questionLayout\">\n" +
    "        <div ng-switch-when=\"horizontal\">\n" +
    "          <lf-section-horizontal></lf-section-horizontal>\n" +
    "        </div>\n" +
    "        <div ng-switch-when=\"matrix\">\n" +
    "          <lf-section-matrix></lf-section-matrix>\n" +
    "        </div>\n" +
    "        <div ng-switch-when=\"vertical\">\n" +
    "          <lf-list-item></lf-list-item>\n" +
    "        </div>\n" +
    "        <div ng-switch-default>\n" +
    "          <lf-list-item></lf-list-item>\n" +
    "        </div>\n" +
    "      </div>\n" +
    "      <div ng-if=\"!item.header\">\n" +
    "        <lf-list-item></lf-list-item>\n" +
    "      </div>\n" +
    "    </div>\n" +
    "  </div>\n" +
    "  <!--'add' buttons-->\n" +
    "  <lf-repeating-button></lf-repeating-button>\n" +
    "</div>"
  );


  $templateCache.put('popover.html',
    "<div class=\"lf-popover\" ng-bind-html=\"getTrustedCodingInstructions(item)\"></div>\n"
  );


  $templateCache.put('repeating-button.html',
    "<!--a button at the end of each repeating section-->\n" +
    "<div ng-if=\"item._lastRepeatingItem && targetShown(item) \"\n" +
    "     class=\"lf-form-table-row button-row {{getSkipLogicClass(item)}}\">\n" +
    "  <div class=\"has-popover-warning\">\n" +
    "    <button type=\"button\"\n" +
    "            class=\"float-button\" id=\"add-{{item._elementId}}\"\n" +
    "            title=\"Add another '{{ item.question }}'\"\n" +
    "            ng-click=\"addOneRepeatingItem(item)\"\n" +
    "            ng-blur=\"hideUnusedItemWarning(item)\"\n" +
    "            uib-popover='Please enter info in the blank \"{{ item.question }}\".'\n" +
    "            popover-placement=\"top-left\"\n" +
    "            popover-trigger=\"none\"\n" +
    "            popover-is-open=\"item._showUnusedItemWarning\">\n" +
    "      Add another '{{item.question}}'\n" +
    "    </button>\n" +
    "  </div>\n" +
    "</div>"
  );


  $templateCache.put('table-item.html',
    "<div class=\"lf-table-item {{getSiblingStatus(item)}}\">\n" +
    "  <!-- question -->\n" +
    "  <lf-item></lf-item>\n" +
    "\n" +
    "  <!--sub sections, check each item's layout -->\n" +
    "  <div ng-if=\"item.items\" class=\"section\">\n" +
    "    <div ng-repeat=\"item in item.items\" ng-if=\"targetShown(item)\"\n" +
    "         class=\"data-row has-ng-animate {{getRowClass(item)}} {{getSkipLogicClass(item)}} {{getActiveRowClass(item)}}\">\n" +
    "      <div ng-if=\"item.header\" ng-switch on=\"item.displayControl.questionLayout\">\n" +
    "        <div ng-switch-when=\"horizontal\">\n" +
    "          <lf-section-horizontal></lf-section-horizontal>\n" +
    "        </div>\n" +
    "\n" +
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


  $templateCache.put('template-list.html',
    "<form ng-if=\"lfData\" class=\"lf-form lf-template-list\" novalidate autocomplete=\"false\">\n" +
    "    <!--form options-->\n" +
    "    <lf-form-controls></lf-form-controls>\n" +
    "    <!--form title-->\n" +
    "    <h3 class=\"lf-form-title\">\n" +
    "      <span>{{lfData.name}}</span>\n" +
    "      <span class=\"item-code\" ng-if=\"lfData.templateOptions.showQuestionCode\">\n" +
    "        <a ng-if=\"lfData._linkToDef\" href=\"{{ lfData._linkToDef }}\" target=\"_blank\">[{{ lfData.code }}]</a>\n" +
    "        <span ng-if=\"!lfData._linkToDef\">[{{ lfData.code }}]</span>\n" +
    "      </span>\n" +
    "      <button ng-if=\"lfData.copyrightNotice\" id=\"copyright-{{lfData.code}}\" type=\"button\"\n" +
    "              class=\"copyright-button\" uib-popover=\"{{lfData.copyrightNotice}}\"\n" +
    "              popover-trigger=\"focus\" popover-placement=\"right\" popover-title=\"Copyright\">&#9400;</button>\n" +
    "    </h3>\n" +
    "    <!--form header-->\n" +
    "    <lf-form-header></lf-form-header>\n" +
    "    <!--form body-->\n" +
    "    <div class=\"lf-form-body\">\n" +
    "\n" +
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
    "          <!-- check each top level item's layout -->\n" +
    "          <div ng-if=\"lfData.items\">\n" +
    "            <div ng-repeat=\"item in lfData.items\" ng-if=\"targetShown(item)\"\n" +
    "                 class=\"data-row has-ng-animate {{getRowClass(item)}} {{getSkipLogicClass(item)}} {{getActiveRowClass(item)}}\"\n" +
    "                 ng-click=\"setActiveRow(item)\">\n" +
    "              <div ng-if=\"item.header\" ng-switch on=\"item.displayControl.questionLayout\">\n" +
    "                <div ng-switch-when=\"horizontal\">\n" +
    "                  <lf-section-horizontal></lf-section-horizontal>\n" +
    "                </div>\n" +
    "                <div ng-switch-when=\"matrix\">\n" +
    "                  <lf-section-matrix></lf-section-matrix>\n" +
    "                </div>\n" +
    "                <div ng-switch-when=\"vertical\">\n" +
    "                  <lf-list-item></lf-list-item>\n" +
    "                </div>\n" +
    "                <div ng-switch-default>\n" +
    "                  <lf-list-item></lf-list-item>\n" +
    "                </div>\n" +
    "              </div>\n" +
    "              <div ng-if=\"!item.header\">\n" +
    "                <lf-list-item></lf-list-item>\n" +
    "              </div>\n" +
    "            </div>\n" +
    "          </div>\n" +
    "        </div>\n" +
    "      </div>\n" +
    "    </div>\n" +
    "</form>\n"
  );


  $templateCache.put('template-table.html',
    "<form ng-if=\"lfData\" class=\"lf-form lf-template-table\" novalidate autocomplete=\"false\"\n" +
    "      ng-keydown=\"handleNavigationKeyEventByTab($event)\">\n" +
    "    <!--form options-->\n" +
    "    <lf-form-controls></lf-form-controls>\n" +
    "    <!--form title-->\n" +
    "    <h3 class=\"lf-form-title\">\n" +
    "      <span>{{lfData.name}}</span>\n" +
    "      <span class=\"item-code\" ng-if=\"lfData.templateOptions.showQuestionCode\">\n" +
    "        <a ng-if=\"lfData._linkToDef\" href=\"{{ lfData._linkToDef }}\" target=\"_blank\">[{{ lfData.code }}]</a>\n" +
    "        <span ng-if=\"!lfData._linkToDef\">[{{ lfData.code }}]</span>\n" +
    "      </span>\n" +
    "      <button ng-if=\"lfData.copyrightNotice\" id=\"copyright-{{lfData.code}}\" type=\"button\"\n" +
    "              class=\"copyright-button\" uib-popover=\"{{lfData.copyrightNotice}}\"\n" +
    "              popover-trigger=\"focus\" popover-placement=\"right\" popover-title=\"Copyright\">&#9400;</button>\n" +
    "    </h3>\n" +
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
    "          <div class=\"lf-column-header\">\n" +
    "            <div class=\"lf-column-label-button\" id=\"th_Name\">\n" +
    "              Name\n" +
    "            </div>\n" +
    "            <div class=\"lf-column-input-unit\" ng-style=\"getScreenWidth()\">\n" +
    "              <div class=\"lf-column-input\" id=\"th_Value\">\n" +
    "                Value\n" +
    "              </div>\n" +
    "              <div ng-if=\"!lfData.templateOptions.hideUnits\" class=\"lf-column-unit\" id=\"th_Units\">\n" +
    "                Units\n" +
    "              </div>\n" +
    "            </div>\n" +
    "          </div>\n" +
    "          <!-- data row, for each item -->\n" +
    "          <!-- check each top level item's questionLayout -->\n" +
    "          <div ng-if=\"lfData.items\" class=\"lf-form-table\">\n" +
    "            <div ng-repeat=\"item in lfData.items\" ng-if=\"targetShown(item)\"\n" +
    "                 class=\"data-row has-ng-animate {{getRowClass(item)}} {{getSkipLogicClass(item)}} {{getActiveRowClass(item)}}\">\n" +
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

}]);

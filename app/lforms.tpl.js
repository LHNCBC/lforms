angular.module('lformsWidget').run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('field-answers.html',
    "<div class=\"lf-field-answers\" ng-switch on=\"item.displayControl.answerLayout\">\n" +
    "  <!--list style-->\n" +
    "  <div ng-switch-when=\"list\">\n" +
    "    <span ng-repeat=\"answer in item.answers track by $index\" class=\"lf-list-answer\">\n" +
    "      <!--for multiple answers-->\n" +
    "      <label ng-if=\"item._multipleAnswers\">\n" +
    "        <input type=\"checkbox\" id=\"{{item._elementId + answer.code}}\" ng-click=\"updateCheckboxList(item, answer)\">{{answer.text}}\n" +
    "      </label>\n" +
    "      <!--for single answer-->\n" +
    "      <label ng-if=\"!item._multipleAnswers\">\n" +
    "        <input type=\"radio\" id=\"{{item._elementId + answer.code}}\" ng-model=\"item.value\"\n" +
    "               ng-value=\"answer\" name=\"{{item._elementId}}\"\n" +
    "               ng-click=\"updateRadioList(item)\">{{answer.text}}\n" +
    "      </label>\n" +
    "    </span>\n" +
    "    <!--extra OTHER field-->\n" +
    "    <span ng-if=\"item.dataType==='CWE'\">\n" +
    "      <!--for multiple answers-->\n" +
    "      <span ng-if=\"item._multipleAnswers\" class=\"lf-list-answer\">\n" +
    "        <label>\n" +
    "          <input type=\"checkbox\" ng-model=\"item._otherValueChecked\"\n" +
    "                 id=\"{{item._elementId + '_other'}}\"\n" +
    "                 ng-click=\"updateCheckboxListForOther(item, {'code':item.valueOther,'text':item.valueOther})\">OTHER:\n" +
    "        </label>\n" +
    "        <label>\n" +
    "          <input type=\"text\" ng-model=\"item.valueOther\"\n" +
    "                 id=\"{{item._elementId + '_otherValue'}}\"\n" +
    "                 ng-change=\"updateCheckboxListForOther(item, {'code':item.valueOther,'text':item.valueOther})\">\n" +
    "        </label>\n" +
    "      </span>\n" +
    "\n" +
    "      <!--for single answer-->\n" +
    "      <span ng-if=\"!item._multipleAnswers\" class=\"lf-list-answer\">\n" +
    "        <label>\n" +
    "          <input type=\"radio\" id=\"{{item._elementId + '_other'}}\" ng-model=\"item._otherValueChecked\" ng-value=\"true\"\n" +
    "                 name=\"{{item._elementId}}\"\n" +
    "                 ng-click=\"updateRadioListForOther(item, {'code':item.valueOther,'text':item.valueOther})\">\n" +
    "          OTHER:\n" +
    "        </label>\n" +
    "        <label>\n" +
    "          <input type=\"text\" id=\"{{item._elementId + '_otherValue'}}\" ng-model=\"item.valueOther\"\n" +
    "                 ng-change=\"updateRadioListForOther(item, {'code':item.valueOther,'text':item.valueOther})\">\n" +
    "        </label>\n" +
    "      </span>\n" +
    "    </span>\n" +
    "  </div>\n" +
    "\n" +
    "  <!--combo style (default is 'combo')-->\n" +
    "  <div ng-switch-default class=\"lf-combo-answer\">\n" +
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
    "</div>\n" +
    "\n"
  );


  $templateCache.put('form-header.html',
    "<div class=\"lf-form-header\">\n" +
    "  <div class=\"stopped\" ng-show=\"isFormDone()\"><img ng-src=\"{{::blankGifDataUrl}}\" class=\"stop-sign\"><span>This form is complete.</span></div>\n" +
    "  <div class=\"row\" ng-if=\"!lfData.templateOptions.hideHeader\">\n" +
    "    <div class=\"col-md-3 col-xs-3\">\n" +
    "      <div ng-hide=\"lfData.templateOptions.hideCheckBoxes\" class=\"checkbox\">\n" +
    "        <label><input type=\"checkbox\" value=\"\" ng-model=\"lfData.templateOptions.showQuestionCode\">Display Question Code</label>\n" +
    "      </div>\n" +
    "    </div>\n" +
    "    <div class=\"col-md-3 col-xs-3\">\n" +
    "      <div ng-hide=\"lfData.templateOptions.hideCheckBoxes\" class=\"checkbox\">\n" +
    "        <label><input type=\"checkbox\" value=\"\" ng-model=\"lfData.templateOptions.showCodingInstruction\">Show Help/Description</label>\n" +
    "      </div>\n" +
    "    </div>\n" +
    "    <div class=\"col-md-3 col-xs-3\">\n" +
    "      <div ng-hide=\"lfData.templateOptions.hideCheckBoxes\" class=\"checkbox\">\n" +
    "        <label><input type=\"checkbox\" value=\"\" ng-model=\"lfData.templateOptions.tabOnInputFieldsOnly\">Keyboard Navigation On Input Fields</label>\n" +
    "      </div>\n" +
    "    </div>\n" +
    "    <div class=\"col-md-3 col-xs-3 text-right\">\n" +
    "      <div class=\"text-info\" >Total # of Questions: {{getNumberOfQuestions()}}</div>\n" +
    "    </div>\n" +
    "  </div>\n" +
    "</div>\n"
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
    "</div>\n"
  );


  $templateCache.put('horizontal-table.html',
    "  <table class=\"t-treeline-field\" >\n" +
    "    <tr>\n" +
    "      <td ng-repeat=\"lastStatus in item._lastSiblingList track by $index\"\n" +
    "          class=\"t-treeline \"\n" +
    "          ng-class=\"getTreeLevelClass($index, item._lastSiblingList)\" > &nbsp; </td>\n" +
    "      <td>\n" +
    "        <div class=\"name-label\">\n" +
    "          <div class=\"lf-form-horizontal-table-title\">\n" +
    "            {{item.question}}\n" +
    "          </div>\n" +
    "\n" +
    "          <table class=\"lf-form-table lf-form-horizontal-table\">\n" +
    "            <colgroup>\n" +
    "              <col class=\"button-col\">\n" +
    "              <col ng-repeat=\"col in lfData._horizontalTableInfo[item._horizontalTableId].columnHeaders\"\n" +
    "                   ng-style=\"{{getTableColumnStyle(col)}}\">\n" +
    "            </colgroup>\n" +
    "            <thead>\n" +
    "            <tr>\n" +
    "              <th class=\"lf-form-table-header\"></th>\n" +
    "              <th ng-repeat=\"col in lfData._horizontalTableInfo[item._horizontalTableId].columnHeaders\"\n" +
    "                  class=\"lf-form-table-header\"\n" +
    "                  id=\"{{col.id}}\">{{col.label}}</th>\n" +
    "            </tr>\n" +
    "            </thead>\n" +
    "            <tbody id=\"\" class=\"\">\n" +
    "            <tr ng-repeat=\"row in lfData._horizontalTableInfo[item._horizontalTableId].tableRows track by $index\"\n" +
    "                class=\"data-row has-ng-animate\">\n" +
    "              <td class=\"button-col\">\n" +
    "                <button ng-if=\"!hasOneRepeatingItem(item)\" type=\"button\"\n" +
    "                        id=\"del-{{row.header._elementId}}\"\n" +
    "                        class=\"float-button\" ng-click=\"removeOneRepeatingItem(row.header)\"\n" +
    "                        title=\"Remove this row of '{{ row.header.question }}'\">-</button>\n" +
    "              </td>\n" +
    "\n" +
    "              <td ng-repeat=\"cell in row.cells\"\n" +
    "                  class=\"hasTooltip\"\n" +
    "                  ng-switch on=\"cell.dataType\">\n" +
    "                <ng-form name=\"innerForm2\">\n" +
    "                  <div class=\"lf-form-item-data tooltipContainer\">\n" +
    "                    <div class=\"tooltipContent\" lf-validate=\"cell\" ng-model=\"cell.value\" ng-if=\"cell._hasValidation\"></div>\n" +
    "                    <span ng-switch-when=\"\" > </span>\n" +
    "                    <input ng-switch-when=\"CNE\" name=\"{{cell.question + '_' + $id}}\" type=\"text\"\n" +
    "                           ng-model=\"cell.value\"\n" +
    "                           autocomplete-lhc=\"cell._autocompOptions\"\n" +
    "                           ng-readonly=\"cell._readOnly\" placeholder=\"{{cell._toolTip}}\"\n" +
    "                           id=\"{{cell._elementId}}\"\n" +
    "                           aria-labelledby=\"{{lfData._horizontalTableInfo[item._horizontalTableId].columnHeaders[$index].id}}\"\n" +
    "                           ng-focus=\"setActiveRow(cell)\" ng-blur=\"activeRowOnBlur(cell)\">\n" +
    "                    <input ng-switch-when=\"CWE\" name=\"{{cell.question + '_' + $id}}\" type=\"text\"\n" +
    "                           ng-model=\"cell.value\"\n" +
    "                           autocomplete-lhc=\"cell._autocompOptions\"\n" +
    "                           ng-readonly=\"cell._readOnly\" placeholder=\"{{cell._toolTip}}\"\n" +
    "                           id=\"{{cell._elementId}}\"\n" +
    "                           aria-labelledby=\"{{lfData._horizontalTableInfo[item._horizontalTableId].columnHeaders[$index].id}}\"\n" +
    "                           ng-focus=\"setActiveRow(cell)\" ng-blur=\"activeRowOnBlur(cell)\">\n" +
    "                    <input ng-switch-when=\"REAL\" name=\"{{cell.question}}\" type=\"text\"\n" +
    "                           ng-model=\"cell.value\"\n" +
    "                           placeholder=\"{{cell._toolTip}}\" ng-readonly=\"cell._readOnly\"\n" +
    "                           id=\"{{cell._elementId}}\"\n" +
    "                           aria-labelledby=\"{{lfData._horizontalTableInfo[item._horizontalTableId].columnHeaders[$index].id}}\"\n" +
    "                           ng-focus=\"setActiveRow(cell)\" ng-blur=\"activeRowOnBlur(cell)\">\n" +
    "                    <input ng-switch-when=\"INT\" name=\"{{cell.question}}\" type=\"text\"\n" +
    "                           ng-model=\"cell.value\"\n" +
    "                           placeholder=\"{{cell._toolTip}}\" ng-readonly=\"cell._readOnly\"\n" +
    "                           id=\"{{cell._elementId}}\"\n" +
    "                           aria-labelledby=\"{{lfData._horizontalTableInfo[item._horizontalTableId].columnHeaders[$index].id}}\"\n" +
    "                           ng-focus=\"setActiveRow(cell)\" ng-blur=\"activeRowOnBlur(cell)\">\n" +
    "                    <input ng-switch-when=\"DT\" name=\"{{cell.question}}\" type=\"text\"\n" +
    "                           ng-model=\"cell.value\"\n" +
    "                           lf-date=\"dateOptions\" placeholder=\"{{cell._toolTip}}\" ng-readonly=\"cell._readOnly\"\n" +
    "                           id=\"{{cell._elementId}}\"\n" +
    "                           aria-labelledby=\"{{lfData._horizontalTableInfo[item._horizontalTableId].columnHeaders[$index].id}}\"\n" +
    "                           ng-focus=\"setActiveRow(cell)\" ng-blur=\"activeRowOnBlur(cell)\">\n" +
    "                    <textarea ng-switch-when=\"TX\" name=\"{{cell.question}}\"\n" +
    "                              ng-model=\"cell.value\" placeholder=\"{{cell._toolTip}}\" ng-readonly=\"cell._readOnly\"\n" +
    "                              id=\"{{cell._elementId}}\"\n" +
    "                              aria-labelledby=\"{{lfData._horizontalTableInfo[item._horizontalTableId].columnHeaders[$index].id}}\"\n" +
    "                              ng-keyup=\"autoExpand($event)\" rows=\"1\"\n" +
    "                              ng-focus=\"setActiveRow(cell)\" ng-blur=\"activeRowOnBlur(cell)\"></textarea>\n" +
    "                    <input ng-switch-default name=\"{{cell.question}}\" type=\"text\"\n" +
    "                           ng-model=\"cell.value\" placeholder=\"{{cell._toolTip}}\" ng-readonly=\"cell._readOnly\"\n" +
    "                           id=\"{{cell._elementId}}\"\n" +
    "                           aria-labelledby=\"{{lfData._horizontalTableInfo[item._horizontalTableId].columnHeaders[$index].id}}\"\n" +
    "                           ng-focus=\"setActiveRow(cell)\" ng-blur=\"activeRowOnBlur(cell)\">\n" +
    "                  </div>\n" +
    "                </ng-form>\n" +
    "              </td>\n" +
    "            </tr>\n" +
    "            </tbody>\n" +
    "          </table>\n" +
    "        </div>\n" +
    "      </td>\n" +
    "    </tr>\n" +
    "  </table>\n"
  );


  $templateCache.put('layout-horizontal.html',
    "<div class=\"lf-layout-horizontal\" ng-if=\"lfData._horizontalTableInfo[item._horizontalTableId]\">\n" +
    "  <table class=\"t-treeline-field\">\n" +
    "    <tr>\n" +
    "      <td ng-repeat=\"lastStatus in item._lastSiblingList track by $index\" ng-if=\"lfData.template ==='table'\"\n" +
    "          class=\"t-treeline \"\n" +
    "          ng-class=\"getTreeLevelClass($index, item._lastSiblingList)\" > &nbsp; </td>\n" +
    "      <td>\n" +
    "        <div class=\"lf-form-table-title name-label\">\n" +
    "          {{item.question}}\n" +
    "        </div>\n" +
    "\n" +
    "        <table class=\"lf-form-table lf-form-horizontal-table\">\n" +
    "          <colgroup>\n" +
    "            <col class=\"button-col\" ng-if=\"item._questionRepeatable\">\n" +
    "            <col ng-repeat=\"col in lfData._horizontalTableInfo[item._horizontalTableId].columnHeaders\"\n" +
    "                 ng-style=\"{{getTableColumnStyle(col)}}\">\n" +
    "          </colgroup>\n" +
    "          <thead>\n" +
    "          <tr>\n" +
    "            <th class=\"lf-form-table-header\" ng-if=\"item._questionRepeatable\"></th>\n" +
    "            <th ng-repeat=\"col in lfData._horizontalTableInfo[item._horizontalTableId].columnHeaders\"\n" +
    "                class=\"lf-form-table-header\"\n" +
    "                id=\"{{col.id}}\">{{col.label}}</th>\n" +
    "          </tr>\n" +
    "          </thead>\n" +
    "          <tbody id=\"\" class=\"\">\n" +
    "          <tr ng-repeat=\"row in lfData._horizontalTableInfo[item._horizontalTableId].tableRows track by $index\"\n" +
    "              class=\"data-row has-ng-animate\">\n" +
    "            <td class=\"button-col\" ng-if=\"item._questionRepeatable\">\n" +
    "              <button ng-if=\"!hasOneRepeatingItem(item)\" type=\"button\"\n" +
    "                      id=\"del-{{row.header._elementId}}\"\n" +
    "                      class=\"float-button\" ng-click=\"removeOneRepeatingItem(row.header)\"\n" +
    "                      title=\"Remove this row of '{{ row.header.question }}'\">-</button>\n" +
    "            </td>\n" +
    "\n" +
    "            <td ng-repeat=\"cell in row.cells\"\n" +
    "                class=\"hasTooltip\"\n" +
    "                ng-switch on=\"cell.dataType\">\n" +
    "              <ng-form name=\"innerForm2\">\n" +
    "                <div class=\"lf-form-item-data tooltipContainer\">\n" +
    "                  <div class=\"tooltipContent\" lf-validate=\"cell\" ng-model=\"cell.value\" ng-if=\"cell._hasValidation\"></div>\n" +
    "                  <span ng-switch-when=\"\" > </span>\n" +
    "                  <input ng-switch-when=\"CNE\" name=\"{{cell.question + '_' + $id}}\" type=\"text\"\n" +
    "                         ng-model=\"cell.value\"\n" +
    "                         autocomplete-lhc=\"cell._autocompOptions\"\n" +
    "                         ng-readonly=\"cell._readOnly\" placeholder=\"{{cell._toolTip}}\"\n" +
    "                         id=\"{{cell._elementId}}\"\n" +
    "                         aria-labelledby=\"{{lfData._horizontalTableInfo[item._horizontalTableId].columnHeaders[$index].id}}\"\n" +
    "                         ng-focus=\"setActiveRow(cell)\" ng-blur=\"activeRowOnBlur(cell)\">\n" +
    "                  <input ng-switch-when=\"CWE\" name=\"{{cell.question + '_' + $id}}\" type=\"text\"\n" +
    "                         ng-model=\"cell.value\"\n" +
    "                         autocomplete-lhc=\"cell._autocompOptions\"\n" +
    "                         ng-readonly=\"cell._readOnly\" placeholder=\"{{cell._toolTip}}\"\n" +
    "                         id=\"{{cell._elementId}}\"\n" +
    "                         aria-labelledby=\"{{lfData._horizontalTableInfo[item._horizontalTableId].columnHeaders[$index].id}}\"\n" +
    "                         ng-focus=\"setActiveRow(cell)\" ng-blur=\"activeRowOnBlur(cell)\">\n" +
    "                  <input ng-switch-when=\"REAL\" name=\"{{cell.question}}\" type=\"text\"\n" +
    "                         ng-model=\"cell.value\"\n" +
    "                         placeholder=\"{{cell._toolTip}}\" ng-readonly=\"cell._readOnly\"\n" +
    "                         id=\"{{cell._elementId}}\"\n" +
    "                         aria-labelledby=\"{{lfData._horizontalTableInfo[item._horizontalTableId].columnHeaders[$index].id}}\"\n" +
    "                         ng-focus=\"setActiveRow(cell)\" ng-blur=\"activeRowOnBlur(cell)\">\n" +
    "                  <input ng-switch-when=\"INT\" name=\"{{cell.question}}\" type=\"text\"\n" +
    "                         ng-model=\"cell.value\"\n" +
    "                         placeholder=\"{{cell._toolTip}}\" ng-readonly=\"cell._readOnly\"\n" +
    "                         id=\"{{cell._elementId}}\"\n" +
    "                         aria-labelledby=\"{{lfData._horizontalTableInfo[item._horizontalTableId].columnHeaders[$index].id}}\"\n" +
    "                         ng-focus=\"setActiveRow(cell)\" ng-blur=\"activeRowOnBlur(cell)\">\n" +
    "                  <input ng-switch-when=\"DT\" name=\"{{cell.question}}\" type=\"text\"\n" +
    "                         ng-model=\"cell.value\"\n" +
    "                         lf-date=\"dateOptions\" placeholder=\"{{cell._toolTip}}\" ng-readonly=\"cell._readOnly\"\n" +
    "                         id=\"{{cell._elementId}}\"\n" +
    "                         aria-labelledby=\"{{lfData._horizontalTableInfo[item._horizontalTableId].columnHeaders[$index].id}}\"\n" +
    "                         ng-focus=\"setActiveRow(cell)\" ng-blur=\"activeRowOnBlur(cell)\">\n" +
    "                  <textarea ng-switch-when=\"TX\" name=\"{{cell.question}}\"\n" +
    "                            ng-model=\"cell.value\" placeholder=\"{{cell._toolTip}}\" ng-readonly=\"cell._readOnly\"\n" +
    "                            id=\"{{cell._elementId}}\"\n" +
    "                            aria-labelledby=\"{{lfData._horizontalTableInfo[item._horizontalTableId].columnHeaders[$index].id}}\"\n" +
    "                            ng-keyup=\"autoExpand($event)\" rows=\"1\"\n" +
    "                            ng-focus=\"setActiveRow(cell)\" ng-blur=\"activeRowOnBlur(cell)\"></textarea>\n" +
    "                  <input ng-switch-default name=\"{{cell.question}}\" type=\"text\"\n" +
    "                         ng-model=\"cell.value\" placeholder=\"{{cell._toolTip}}\" ng-readonly=\"cell._readOnly\"\n" +
    "                         id=\"{{cell._elementId}}\"\n" +
    "                         aria-labelledby=\"{{lfData._horizontalTableInfo[item._horizontalTableId].columnHeaders[$index].id}}\"\n" +
    "                         ng-focus=\"setActiveRow(cell)\" ng-blur=\"activeRowOnBlur(cell)\">\n" +
    "                </div>\n" +
    "              </ng-form>\n" +
    "            </td>\n" +
    "          </tr>\n" +
    "          </tbody>\n" +
    "        </table>\n" +
    "      </td>\n" +
    "    </tr>\n" +
    "  </table>\n" +
    "  <!--a button at the end of each repeating section-->\n" +
    "  <div ng-if=\"item._questionRepeatable && targetShown(item)\"\n" +
    "       class=\"button-row {{getRowClass(item)}} {{getSkipLogicClass(item)}}\">\n" +
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
    "</div>\n"
  );


  $templateCache.put('layout-matrix.html',
    "<div class=\"lf-layout-matrix\">\n" +
    "  <div class=\"lf-form-table-title name-label\">\n" +
    "    {{item.question}}\n" +
    "  </div>\n" +
    "  <table class=\"lf-form-matrix-table lf-form-table\">\n" +
    "      <colgroup>\n" +
    "        <col class=\"name-label\">\n" +
    "        <col ng-repeat=\"answer in item.items[0].answers\">\n" +
    "        <col class=\"other-answer\" ng-if=\"item.items[0].dataType ==='CWE'\">\n" +
    "      </colgroup>\n" +
    "      <thead>\n" +
    "      <tr>\n" +
    "        <th class=\"name-label\"></th>\n" +
    "        <th ng-repeat=\"answer in item.items[0].answers\"\n" +
    "            class=\"lf-form-matrix-column lf-form-table-header\">{{answer.text}}</th>\n" +
    "        <th class=\"lf-form-matrix-column-other lf-form-table-header\" ng-if=\"item.items[0].dataType ==='CWE'\">Other</th>\n" +
    "      </tr>\n" +
    "      </thead>\n" +
    "      <tbody>\n" +
    "      <tr ng-repeat=\"subItem in item.items\">\n" +
    "        <td class=\"name\">\n" +
    "          <div class=\"name-label\">\n" +
    "            <span><label for=\"{{subItem._elementId}}\">{{subItem.question}}</label></span>\n" +
    "            <span class=\"item-code\" ng-show=\"lfData.templateOptions.showQuestionCode\">\n" +
    "              <a ng-if=\"subItem._linkToDef\" href=\"{{ subItem._linkToDef }}\" target=\"_blank\">[{{ subItem.questionCode }}]</a>\n" +
    "              <span ng-if=\"!subItem._linkToDef\">[{{ subItem.questionCode }}]</span>\n" +
    "            </span>\n" +
    "            <span ng-switch on=\"getCodingInstructionsDisplayType(subItem)\">\n" +
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
    "        <td ng-repeat=\"answer in item.items[0].answers\">\n" +
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
    "        <td class=\"lf-form-matrix-column-other\" ng-if=\"subItem.dataType ==='CWE'\">\n" +
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
    "</div>\n" +
    "\n"
  );


  $templateCache.put('list-item.html',
    "<div class=\"lf-list-item\">\n" +
    "  <!--question-->\n" +
    "  <div class=\"name-label\" >\n" +
    "    <span ng-show=\"item._questionRepeatable\" class=\"sn\">{{getRepeatingSN(item) }}</span>\n" +
    "    <span><label for=\"{{item._elementId}}\">{{item.question}}</label></span>\n" +
    "    <span class=\"item-code\" ng-show=\"lfData.templateOptions.showQuestionCode\">\n" +
    "      <a ng-if=\"item._linkToDef\" href=\"{{ item._linkToDef }}\" target=\"_blank\">[{{ item.questionCode }}]</a>\n" +
    "      <span ng-if=\"!item._linkToDef\">[{{ item.questionCode }}]</span>\n" +
    "    </span>\n" +
    "    <span ng-switch on=\"getCodingInstructionsDisplayType(item)\">\n" +
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
    "    <!--<div class=\"button-col\">-->\n" +
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
    "  <div ng-switch on=\"checkUnits(item)\">\n" +
    "    <div ng-switch-when=\"list\">\n" +
    "      <lf-units item=\"item\"></lf-units>\n" +
    "    </div>\n" +
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
    "\n" +
    "  <!--a button at the end of each repeating section-->\n" +
    "  <div ng-if=\"item._lastRepeatingItem && targetShown(item)\"\n" +
    "       class=\"button-row {{getRowClass(item)}} {{getSkipLogicClass(item)}}\">\n" +
    "    <div class=\"has-popover-warning\">\n" +
    "      <button type=\"button\"\n" +
    "              class=\"float-button\" id=\"add-{{item._elementId}}\"\n" +
    "              title=\"Add another '{{ item.question }}'\"\n" +
    "              ng-click=\"addOneRepeatingItem(item)\"\n" +
    "              ng-blur=\"hideUnusedItemWarning(item)\"\n" +
    "              uib-popover='Please enter info in the blank \"{{ item.question }}\".'\n" +
    "              popover-placement=\"top-left\"\n" +
    "              popover-trigger=\"none\"\n" +
    "              popover-is-open=\"item._showUnusedItemWarning\">\n" +
    "        Add another '{{item.question}}'\n" +
    "      </button>\n" +
    "    </div>\n" +
    "  </div>\n" +
    "</div>"
  );


  $templateCache.put('popover.html',
    "<div class=\"lf-popover\" ng-bind-html=\"getTrustedCodingInstructions(item)\"></div>\n"
  );


  $templateCache.put('template-list.html',
    "<form class=\"lf-form lf-template-list\" novalidate autocomplete=\"false\">\n" +
    "  <div class=\"lf-form-view\" ng-if=\"lfData\">\n" +
    "    <!--header options-->\n" +
    "    <div class=\"lf-form-header\" ng-include=\"'form-header.html'\"></div>\n" +
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
    "    <!--form body-->\n" +
    "    <div class=\"lf-form-body\">\n" +
    "\n" +
    "      <!--when the entire form is in horizontal or matrix layouts-->\n" +
    "      <div ng-switch on=\"lfData.templateOptions.displayControl.questionLayout\">\n" +
    "        <div ng-switch-when=\"horizontal\" class=\"top-section\">\n" +
    "          <lf-section-horizontal></lf-section-horizontal>\n" +
    "        </div>\n" +
    "        <div ng-switch-when=\"matrix\" class=\"top-section\">\n" +
    "          <lf-section-matrix></lf-section-matrix>\n" +
    "        </div>\n" +
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
    "  </div>\n" +
    "</form>\n" +
    "\n" +
    "\n" +
    "\n" +
    "<button type=\"button\" ng-if=\"debug\" ng-click=\"onclick()\">Click to debug Panel Controller</button>\n"
  );


  $templateCache.put('template-table.html',
    "<form class=\"lf-form lf-template-table\" novalidate autocomplete=\"false\" ng-keydown=\"handleNavigationKeyEventByTab($event)\">\n" +
    "  <div class=\"lf-form-view\" ng-if=\"lfData\" >\n" +
    "    <div ng-include=\"'form-header.html'\"></div>\n" +
    "\n" +
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
    "    <div class=\"lf-form-body\">\n" +
    "      <table cellspacing=\"0\" cellpadding=\"0\" class=\"lf-form-table\">\n" +
    "        <colgroup ng-if=\"lfData.templateOptions.obrHeader\">\n" +
    "          <col ng-repeat=\"item in lfData.templateOptions.obrItems\" ng-style=\"{{getTableColumnStyle(item)}}\">\n" +
    "        </colgroup>\n" +
    "        <thead ng-if=\"lfData.templateOptions.obrHeader\">\n" +
    "        <tr>\n" +
    "          <th class=\"lf-form-table-header\"\n" +
    "              ng-repeat=\"item in lfData.templateOptions.obrItems\">\n" +
    "            <label for=\"{{item.questionCode}}\">{{item.question}}</label></th>\n" +
    "        </tr>\n" +
    "        </thead>\n" +
    "        <tbody>\n" +
    "        <tr class=\"lf-form-table-row\" ng-if=\"lfData.templateOptions.obrHeader\" ng-click=\"setActiveRow(null)\">\n" +
    "          <td class=\"rowEditText hasTooltip\" ng-repeat=\"item in lfData.templateOptions.obrItems\"\n" +
    "              ng-switch on=\"item.dataType\">\n" +
    "            <ng-form name=\"innerForm\">\n" +
    "              <div class=\"lf-form-item-data tooltipContainer\">\n" +
    "                <div class=\"tooltipContent\" lf-validate=\"item\" ng-model=\"item.value\"></div>\n" +
    "                <input ng-switch-when=\"CWE\" name=\"{{item.question}}\" type=\"text\"\n" +
    "                       placeholder=\"Select or type a value\"\n" +
    "                       ng-model=\"item.value\"\n" +
    "                       autocomplete-lhc=\"item._autocompOptions\"\n" +
    "                       id=\"{{item.questionCode}}\"\n" +
    "                       ng-blur=\"activeRowOnBlur(item)\">\n" +
    "                <input ng-switch-when=\"DT\" name=\"{{item.question}}\" type=\"text\"\n" +
    "                       ng-model=\"item.value\" lf-date=\"dateOptions\"\n" +
    "                       placeholder=\"MM/DD/YYYY\"\n" +
    "                       id=\"{{item.questionCode}}\"\n" +
    "                       ng-blur=\"activeRowOnBlur(item)\">\n" +
    "                <input ng-switch-default name=\"{{item.question}}\" type=\"text\"\n" +
    "                       ng-model=\"item.value\" placeholder=\"Type a value\"\n" +
    "                       id=\"{{item.questionCode}}\"\n" +
    "                       ng-blur=\"activeRowOnBlur(item)\">\n" +
    "              </div>\n" +
    "            </ng-form>\n" +
    "          </td>\n" +
    "        </tr>\n" +
    "        <tr class=\"lf-form-table-row lf-form-body\">\n" +
    "          <td colspan=\"{{lfData.templateOptions.obrItems.length}}\">\n" +
    "            <div>\n" +
    "              <table cellspacing=\"0\" cellpadding=\"0\" class=\"lf-form-table\">\n" +
    "                <colgroup>\n" +
    "                  <col ng-repeat=\"obxCol in lfData.templateOptions.obxTableColumns\"\n" +
    "                       ng-style=\"{{getTableColumnStyle(obxCol)}}\"\n" +
    "                       ng-if=\"!isUnitsColHidden(obxCol)\">\n" +
    "                </colgroup>\n" +
    "                <thead>\n" +
    "                <tr>\n" +
    "                  <th class=\"lf-form-table-header\"\n" +
    "                      ng-repeat=\"obxCol in lfData.templateOptions.obxTableColumns\"\n" +
    "                      ng-if=\"!isUnitsColHidden(obxCol)\"\n" +
    "                      id=\"th_{{obxCol.name}}\">{{obxCol.name}}</th>\n" +
    "                </tr>\n" +
    "                </thead>\n" +
    "                <tbody class=\"\">\n" +
    "                <!-- data row -->\n" +
    "                <tr ng-repeat-start=\"item in lfData.itemList \"\n" +
    "                    ng-if=\"!item._inHorizontalTable && item.dataType!=='TITLE' && targetShown(item)\"\n" +
    "                    class=\"data-row has-ng-animate lf-form-table-row {{getRowClass(item)}} {{getSkipLogicClass(item)}} {{getActiveRowClass(item)}}\"\n" +
    "                    ng-click=\"setActiveRow(item)\">\n" +
    "                  <td class=\"name has-treeline\">\n" +
    "                    <table class=\"t-treeline-field\" >\n" +
    "                      <tr>\n" +
    "                        <td class=\"t-treeline \" ng-class=\"getTreeLevelClass($index, item._lastSiblingList)\" ng-repeat=\"lastStatus in item._lastSiblingList track by $index\"> &nbsp; </td>\n" +
    "                        <td>\n" +
    "                          <div class=\"name-label\">\n" +
    "                            <span ng-show=\"item._questionRepeatable\" class=\"sn\">{{getRepeatingSN(item) }}</span>\n" +
    "                            <span><label for=\"{{item._elementId}}\">{{item.question}}</label></span>\n" +
    "                            <span class=\"item-code\" ng-show=\"lfData.templateOptions.showQuestionCode\">\n" +
    "                              <a ng-if=\"item._linkToDef\" href=\"{{ item._linkToDef }}\" target=\"_blank\">[{{ item.questionCode }}]</a>\n" +
    "                              <span ng-if=\"!item._linkToDef\">[{{ item.questionCode }}]</span>\n" +
    "                            </span>\n" +
    "                            <span ng-switch on=\"getCodingInstructionsDisplayType(item)\">\n" +
    "                              <span ng-switch-when=\"inline-html\" class=\"prompt\" ng-bind-html=\"getTrustedCodingInstructions(item)\"></span>\n" +
    "                              <span ng-switch-when=\"inline-escaped\" class=\"prompt\" ng-bind=\"item.codingInstructions\"></span>\n" +
    "                              <button ng-switch-when=\"popover-html\" class=\"help-button\" uib-popover-template=\"'popover.html'\"\n" +
    "                                      popover-trigger=\"focus\" popover-placement=\"right\"  popover-title=\"Instruction\"\n" +
    "                                      type=\"button\" id=\"help-{{item._elementId}}\">?</button>\n" +
    "                              <button ng-switch-when=\"popover-escaped\" class=\"help-button\" uib-popover=\"{{item.codingInstructions}}\"\n" +
    "                                      popover-trigger=\"focus\" popover-placement=\"right\"  popover-title=\"Instruction\"\n" +
    "                                      type=\"button\" id=\"help-{{item._elementId}}\">?</button>\n" +
    "                            </span>\n" +
    "                            <button ng-if=\"item.copyrightNotice\" id=\"copyright-{{item._elementId}}\" type=\"button\"\n" +
    "                                    class=\"copyright-button\" uib-popover=\"{{item.copyrightNotice}}\"\n" +
    "                                    popover-trigger=\"focus\" popover-placement=\"right\" popover-title=\"Copyright\">&#9400;</button>\n" +
    "                          </div>\n" +
    "                        </td>\n" +
    "                      </tr>\n" +
    "                    </table>\n" +
    "                  </td>\n" +
    "                  <td class=\"button-col\">\n" +
    "                    <button ng-if=\"!hasOneRepeatingItem(item)\" class=\"float-button\" type=\"button\"\n" +
    "                            ng-click=\"removeOneRepeatingItem(item)\" id=\"del-{{item._elementId}}\"\n" +
    "                            title=\"Remove this '{{ item.question }}'\">-</button>\n" +
    "                  </td>\n" +
    "                  <td ng-switch on=\"item.dataType\" class=\"hasTooltip\">\n" +
    "                    <ng-form name=\"innerForm2\">\n" +
    "                      <div class=\"lf-form-item-data tooltipContainer\">\n" +
    "                        <div class=\"tooltipContent\" lf-validate=\"item\" ng-model=\"item.value\" ng-if=\"item._hasValidation\"></div>\n" +
    "                        <span ng-switch-when=\"SECTION\" id=\"{{item._elementId}}\"> </span>\n" +
    "                        <input ng-switch-when=\"CNE\" name=\"{{item.question +'_'+ $id}}\" type=\"text\"\n" +
    "                               ng-model=\"item.value\" autocomplete-lhc=\"item._autocompOptions\"\n" +
    "                               ng-readonly=\"item._readOnly\" placeholder=\"{{item._toolTip}}\"\n" +
    "                               id=\"{{item._elementId}}\" ng-focus=\"setActiveRow(item)\"\n" +
    "                               ng-blur=\"activeRowOnBlur(item)\">\n" +
    "                        <input ng-switch-when=\"CWE\" name=\"{{item.question +'_'+ $id}}\" type=\"text\"\n" +
    "                               ng-model=\"item.value\" autocomplete-lhc=\"item._autocompOptions\"\n" +
    "                               ng-readonly=\"item._readOnly\" placeholder=\"{{item._toolTip}}\"\n" +
    "                               id=\"{{item._elementId}}\" ng-focus=\"setActiveRow(item)\"\n" +
    "                               ng-blur=\"activeRowOnBlur(item)\">\n" +
    "                        <input ng-switch-when=\"REAL\" name=\"{{item.question}}\" type=\"text\"\n" +
    "                               ng-model=\"item.value\" placeholder=\"{{item._toolTip}}\"\n" +
    "                               ng-readonly=\"item._readOnly\" id=\"{{item._elementId}}\" ng-focus=\"setActiveRow(item)\"\n" +
    "                               ng-blur=\"activeRowOnBlur(item)\">\n" +
    "                        <input ng-switch-when=\"INT\" name=\"{{item.question}}\" type=\"text\"\n" +
    "                               ng-model=\"item.value\" placeholder=\"{{item._toolTip}}\"\n" +
    "                               ng-readonly=\"item._readOnly\" id=\"{{item._elementId}}\" ng-focus=\"setActiveRow(item)\"\n" +
    "                               ng-blur=\"activeRowOnBlur(item)\">\n" +
    "                        <input ng-switch-when=\"DT\" name=\"{{item.question}}\" type=\"text\"\n" +
    "                               ng-model=\"item.value\" lf-date=\"dateOptions\" placeholder=\"{{item._toolTip}}\"\n" +
    "                               ng-readonly=\"item._readOnly\" id=\"{{item._elementId}}\" ng-focus=\"setActiveRow(item)\"\n" +
    "                               ng-blur=\"activeRowOnBlur(item)\">\n" +
    "                        <textarea ng-switch-when=\"TX\" name=\"{{item.question}}\"\n" +
    "                                  ng-model=\"item.value\" placeholder=\"{{item._toolTip}}\" ng-readonly=\"item._readOnly\"\n" +
    "                                  id=\"{{item._elementId}}\" ng-keyup=\"autoExpand($event)\" ng-blur=\"autoExpand($event)\" rows=\"1\"\n" +
    "                                  ng-focus=\"setActiveRow(item)\"\n" +
    "                                  ng-blur=\"activeRowOnBlur(item)\">\n" +
    "                        </textarea>\n" +
    "                        <input ng-switch-default name=\"{{item.question}}\" type=\"text\"\n" +
    "                               ng-model=\"item.value\" placeholder=\"{{item._toolTip}}\" ng-readonly=\"item._readOnly\"\n" +
    "                               id=\"{{item._elementId}}\" ng-focus=\"setActiveRow(item)\"\n" +
    "                               ng-blur=\"activeRowOnBlur(item)\">\n" +
    "                      </div>\n" +
    "                    </ng-form>\n" +
    "                  </td>\n" +
    "                  <!--units-->\n" +
    "                  <td ng-switch on=\"checkUnits(item)\" ng-if=\"!isUnitsColHidden()\">\n" +
    "                    <input class=\"units\" ng-switch-when=\"list\" type=\"text\"\n" +
    "                           ng-model=\"item.unit\" autocomplete-lhc=\"item._unitAutocompOptions\"\n" +
    "                           placeholder=\"Select one\" aria-labelledby=\"th_Units\">\n" +
    "                    <span ng-switch-when=\"none\" > </span>\n" +
    "                  </td>\n" +
    "                  <!--<td>{{item.range}}</td>-->\n" +
    "                </tr>\n" +
    "                <!-- horizontal table -->\n" +
    "                <tr ng-if=\"item._horizontalTableHeader && item.dataType!=='TITLE' && targetShown(item)\"\n" +
    "                    class=\"data-row has-ng-animate lf-form-table-row {{getRowClass(item)}} {{getSkipLogicClass(item)}} {{getActiveRowClass(item)}}\">\n" +
    "                  <td class=\"horizontal has-treeline\" colspan=\"{{getVisibleObxColNumber()}}\"\n" +
    "                      ng-include=\"'horizontal-table.html'\"></td>\n" +
    "                </tr>\n" +
    "                <!-- title row -->\n" +
    "                <tr ng-if=\"!item._inHorizontalTable && item.dataType==='TITLE' && targetShown(item)\"\n" +
    "                    class=\"title-row data-row has-ng-animate lf-form-table-row {{getRowClass(item)}} {{getSkipLogicClass(item)}} {{getActiveRowClass(item)}}\">\n" +
    "                  <td class=\"name has-treeline\" colspan=\"{{getVisibleObxColNumber()}}\">\n" +
    "                    <table class=\"t-treeline-field\" >\n" +
    "                      <tr>\n" +
    "                        <td ng-repeat=\"lastStatus in item._lastSiblingList track by $index\"\n" +
    "                            class=\"t-treeline \" ng-class=\"getTreeLevelClass($index, item._lastSiblingList)\"> &nbsp; </td>\n" +
    "                        <td>\n" +
    "                          <div class=\"name-label\">\n" +
    "                            <span><label for=\"{{item._elementId}}\">{{item.question}}</label></span>\n" +
    "                            <span ng-switch on=\"getCodingInstructionsDisplayType(item)\">\n" +
    "                              <span ng-switch-when=\"inline-html\" class=\"prompt\" ng-bind-html=\"getTrustedCodingInstructions(item)\"></span>\n" +
    "                              <span ng-switch-when=\"inline-escaped\" class=\"prompt\" ng-bind=\"item.codingInstructions\"></span>\n" +
    "                              <button ng-switch-when=\"popover-html\" class=\"help-button\" uib-popover-template=\"'popover.html'\"\n" +
    "                                      popover-trigger=\"focus\" popover-placement=\"right\"  popover-title=\"Instruction\"\n" +
    "                                      type=\"button\" id=\"help-{{item._elementId}}\">?</button>\n" +
    "                              <button ng-switch-when=\"popover-escaped\" class=\"help-button\" uib-popover=\"{{item.codingInstructions}}\"\n" +
    "                                      popover-trigger=\"focus\" popover-placement=\"right\"  popover-title=\"Instruction\"\n" +
    "                                      type=\"button\" id=\"help-{{item._elementId}}\">?</button>\n" +
    "                            </span>\n" +
    "                            <button ng-if=\"item.copyrightNotice\" id=\"copyright-{{item._elementId}}\" type=\"button\"\n" +
    "                                    class=\"copyright-button\" uib-popover=\"{{item.copyrightNotice}}\"\n" +
    "                                    popover-trigger=\"focus\" popover-placement=\"right\" popover-title=\"Copyright\">&#9400;</button>\n" +
    "                          </div>\n" +
    "                        </td>\n" +
    "                      </tr>\n" +
    "                    </table>\n" +
    "                  </td>\n" +
    "                </tr>\n" +
    "                <!-- extra question -->\n" +
    "                <tr ng-if=\"!item._inHorizontalTable && needExtra(item) && targetShown(item)\"\n" +
    "                    class=\"extra-row lf-form-table-row {{getRowClass(item)}} {{getSkipLogicClass(item)}} {{getActiveRowClass(item)}}\"\n" +
    "                    ng-click=\"setActiveRow(item)\">\n" +
    "                  <td class=\"name has-treeline\">\n" +
    "                    <table class=\"t-treeline-field\" >\n" +
    "                      <tr>\n" +
    "                        <td ng-repeat=\"lastStatus in item._lastSiblingList track by $index\"\n" +
    "                            class=\"t-treeline \" ng-class=\"getExtraRowTreeLevelClass($index, item._lastSiblingList)\"> &nbsp; </td>\n" +
    "                        <td>\n" +
    "                          <div class=\"name-label\">\n" +
    "                            <span>&nbsp;</span>\n" +
    "                          </div>\n" +
    "                        </td>\n" +
    "                      </tr>\n" +
    "                    </table>\n" +
    "                  </td>\n" +
    "                  <td class=\"button-col\"></td>\n" +
    "                  <td colspan=\"{{getVisibleObxColNumber()-2}}\" class=\"extra-field\">\n" +
    "                    <input ng-model=\"item.valueOther\" placeholder=\"Please specify\" ng-readonly=\"item._readOnly\" type=\"text\" ng-focus=\"setActiveRow(item)\">\n" +
    "                  </td>\n" +
    "                </tr>\n" +
    "                <!--a button row at the end of each repeating section-->\n" +
    "                <tr ng-repeat-end ng-if=\"item._repeatingSectionList && targetShown(item)\"\n" +
    "                    class=\"button-row lf-form-table-row {{getRowClass(item)}} {{getSkipLogicClass(item)}}\">\n" +
    "                  <td colspan=\"{{getVisibleObxColNumber()}}\" class=\"name has-treeline\" >\n" +
    "                    <table class=\"t-treeline-field\" >\n" +
    "                      <tr>\n" +
    "                        <td ng-repeat=\"lastStatus in item._lastSiblingList track by $index\"\n" +
    "                            class=\"t-treeline \" ng-class=\"getExtraRowTreeLevelClass($index, item._lastSiblingList)\"> &nbsp; </td>\n" +
    "                        <td>\n" +
    "                          <div class=\"name-label has-popover-warning\">\n" +
    "                            <button ng-repeat=\"repeatingItem in item._repeatingSectionList\" type=\"button\"\n" +
    "                                    class=\"float-button\" id=\"add-{{repeatingItem._elementId}}\"\n" +
    "                                    title=\"Add another '{{ repeatingItem.question }}'\"\n" +
    "                                    ng-click=\"addOneRepeatingItem(repeatingItem)\"\n" +
    "                                    ng-blur=\"hideUnusedItemWarning(repeatingItem)\"\n" +
    "                                    uib-popover='Please enter info in the blank \"{{ repeatingItem.question }}\".'\n" +
    "                                    popover-placement=\"top-left\"\n" +
    "                                    popover-trigger=\"none\"\n" +
    "                                    popover-is-open=\"repeatingItem._showUnusedItemWarning\">\n" +
    "                              Add another '{{repeatingItem.question}}'\n" +
    "                            </button>\n" +
    "                          </div>\n" +
    "                        </td>\n" +
    "                      </tr>\n" +
    "                    </table>\n" +
    "                  </td>\n" +
    "                </tr>\n" +
    "                </tbody>\n" +
    "              </table>\n" +
    "            </div>\n" +
    "          </td>\n" +
    "        </tr>\n" +
    "        </tbody>\n" +
    "      </table>\n" +
    "    </div>\n" +
    "  </div>\n" +
    "</form>\n" +
    "<button type=\"button\" ng-if=\"debug\" ng-click=\"onclick()\">Click to debug Panel Controller</button>\n"
  );

}]);

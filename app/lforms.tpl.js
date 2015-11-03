angular.module('lformsWidget').run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('form-header.html',
    "<div class=\"stopped\" ng-show=\"isFormDone()\"><img ng-src=\"{{::blankGifDataUrl}}\" class=\"stop-sign\"><span>This form is complete.</span></div>\n" +
    "<div class=\"row\">\n" +
    "  <div class=\"col-md-3 col-xs-3\">\n" +
    "    <div ng-hide=\"{{hideCheckBoxes}}\" class=\"checkbox\">\n" +
    "      <label><input type=\"checkbox\" value=\"\" ng-model=\"formConfig.showQuestionCode\">Display Question Code</label>\n" +
    "    </div>\n" +
    "  </div>\n" +
    "  <div class=\"col-md-3 col-xs-3\">\n" +
    "    <div ng-hide=\"{{hideCheckBoxes}}\" class=\"checkbox\">\n" +
    "      <label><input type=\"checkbox\" value=\"\" ng-model=\"formConfig.showCodingInstruction\">Show Help/Description</label>\n" +
    "    </div>\n" +
    "  </div>\n" +
    "  <div class=\"col-md-3 col-xs-3\">\n" +
    "    <div ng-hide=\"{{hideCheckBoxes}}\" class=\"checkbox\">\n" +
    "      <label><input type=\"checkbox\" value=\"\" ng-model=\"formConfig.tabOnInputFieldsOnly\">Keyboard Navigation On Input Fields</label>\n" +
    "    </div>\n" +
    "  </div>\n" +
    "  <div class=\"col-md-3 col-xs-3\">\n" +
    "    <div class=\"text-info\" >Total # of Questions: {{lfData.itemList.length}}</div>\n" +
    "  </div>\n" +
    "\n" +
    "</div>\n"
  );


  $templateCache.put('form-view-a.html',
    "<div class=\"lf-form\" ng-controller=\"PanelTableCtrl\" ng-keydown=\"handleNavigationKeyEventByTab($event)\">\n" +
    "  <form novalidate autocomplete=\"false\">\n" +
    "    <div class=\"lf-form-view\" ng-if=\"lfData\">\n" +
    "      <div class=\"lf-form-header\" ng-include=\"'form-header.html'\"></div>\n" +
    "\n" +
    "      <h3 class=\"lf-form-title\">\n" +
    "        <span>{{lfData.name}}</span>\n" +
    "        <span ng-if=\"formConfig.showQuestionCode\">\n" +
    "          <a href=\"http://s.details.loinc.org/LOINC/{{ lfData.code }}.html\" target=\"_blank\">[{{ lfData.code }}]</a></span>\n" +
    "      </h3>\n" +
    "      <div class=\"lf-form-body\">\n" +
    "        <table cellspacing=\"0\" cellpadding=\"0\" class=\"lf-form-table\">\n" +
    "          <colgroup>\n" +
    "            <col ng-repeat=\"item in ::lfData.templateOption.obrItems\"\n" +
    "                 ng-style=\"{'width': '{{::item.formatting.width}}',\n" +
    "                            'min-width': '{{::item.formatting['min-width']}}'}\">\n" +
    "          </colgroup>\n" +
    "          <thead>\n" +
    "          <tr>\n" +
    "            <th class=\"lf-form-table-header\"\n" +
    "                ng-repeat=\"item in ::lfData.templateOption.obrItems\"><label\n" +
    "              for=\"obr_{{::item.question}}\">{{::item.question}}</label></th>\n" +
    "          </tr>\n" +
    "          </thead>\n" +
    "          <tbody>\n" +
    "          <tr class=\"lf-form-table-row\">\n" +
    "            <td class=\"rowEditText hasTooltip\" ng-repeat=\"item in lfData.templateOption.obrItems\"\n" +
    "                ng-switch on=\"item.dataType\">\n" +
    "              <ng-form name=\"innerForm\">\n" +
    "                <div class=\"lf-form-item-data tooltipContainer\">\n" +
    "                  <span class=\"tooltipContent\" ng-include=\"'validation.html'\"></span>  <!-- validation error messages -->\n" +
    "                  <input ng-switch-when=\"CWE\" name=\"{{::item.question}}\"\n" +
    "                         ng-required=\"::item._answerRequired\" placeholder=\"Select or type a value\"\n" +
    "                         ng-model=\"item.value\"\n" +
    "                         autocomplete-lhc=\"::autocompLhcOpt(item)\"\n" +
    "                         id=\"obr_{{::item.question}}\">\n" +
    "                  <input ng-switch-when=\"DT\" name=\"{{::item.question}}\"\n" +
    "                         ng-required=\"::item._answerRequired\"\n" +
    "                         ng-model=\"item.value\" lf-date=\"::dateOptions\"\n" +
    "                         placeholder=\"MM/DD/YYYY\"\n" +
    "                         id=\"obr_{{::item.question}}\">\n" +
    "                  <input ng-switch-default name=\"{{::item.question}}\"\n" +
    "                         ng-required=\"::item._answerRequired\"\n" +
    "                         ng-model=\"item.value\" placeholder=\"Type a value\"\n" +
    "                         id=\"obr_{{::item.question}}\">\n" +
    "                </div>\n" +
    "              </ng-form>\n" +
    "            </td>\n" +
    "          </tr>\n" +
    "          <tr class=\"lf-form-table-row lf-form-body\">\n" +
    "            <td colspan=\"5\">\n" +
    "              <div>\n" +
    "                <table cellspacing=\"0\" cellpadding=\"0\" class=\"lf-form-table\">\n" +
    "                  <colgroup>\n" +
    "                    <col ng-repeat=\"obxCol in ::lfData.templateOption.obxTableColumns\"\n" +
    "                         ng-style=\"{'width': '{{::obxCol.formatting.width}}',\n" +
    "                                    'min-width': '{{::obxCol.formatting['min-width']}}'}\">\n" +
    "                  </colgroup>\n" +
    "                  <thead>\n" +
    "                  <tr>\n" +
    "                    <th class=\"lf-form-table-header\" ng-repeat=\"obxCol in ::lfData.templateOption.obxTableColumns\"\n" +
    "                        id=\"th_{{obxCol.name}}\">{{::obxCol.name}}</th>\n" +
    "                  </tr>\n" +
    "                  </thead>\n" +
    "                  <tbody class=\"\">\n" +
    "                  <tr class=\"dataRow lf-form-table-row {{getRowClass(item)}} {{getSkipLogicClass(item)}} {{getActiveRowClass(item)}}\" ng-if=\"targetShown(item)\"\n" +
    "                      ng-repeat-start=\"item in lfData.itemList \" ng-click=\"setActiveRow(item)\">\n" +
    "                    <td class=\"name has-treeline\">\n" +
    "                      <table class=\"t-treeline-field\" >\n" +
    "                        <tr>\n" +
    "                          <td class=\"t-treeline \" ng-class=\"getTreeLevelClass($index, item._lastSiblingList)\" ng-repeat=\"lastStatus in item._lastSiblingList track by $index\"> &nbsp; </td>\n" +
    "                          <td>\n" +
    "                            <div class=\"name-label\">\n" +
    "                              <span ng-show=\"::item._questionRepeatable\" class=\"sn\">{{::getRepeatingSN(item) }}</span>\n" +
    "                              <span><label for=\"{{::item._elementId}}\">{{::item.question}}</label></span>\n" +
    "                              <span ng-show=\"formConfig.showQuestionCode\">\n" +
    "                                <a href=\"http://s.details.loinc.org/LOINC/{{ item.questionCode }}.html\"\n" +
    "                                   target=\"_blank\">[{{ item.questionCode }}]</a></span>\n" +
    "                              <span ng-show=\"formConfig.showCodingInstruction\"\n" +
    "                                    class=\"prompt\">{{ ::getCodingInstructions(item) }}</span>\n" +
    "                              <button ng-show=\"!formConfig.showCodingInstruction\" ng-if=\"::hasCodingInstructions(item)\"\n" +
    "                                      class=\"help-button\" bs-popover=\"::item.codingInstructions\"\n" +
    "                                      data-auto-close=\"true\" data-placement=\"right\"  title=\"Instruction\">?</button>\n" +
    "                            </div>\n" +
    "                          </td>\n" +
    "                        </tr>\n" +
    "                      </table>\n" +
    "                    </td>\n" +
    "                    <td class=\"button-col\">\n" +
    "                      <button ng-if=\"!hasOneRepeatingItem(item)\" class=\"float-button\"\n" +
    "                              ng-click=\"removeOneRepeatingItem(item)\" id=\"del-{{item._elementId}}\"\n" +
    "                              title=\"Remove this '{{ ::item.question }}'\">-</button>\n" +
    "                    </td>\n" +
    "                    <td ng-switch on=\"item.dataType\" class=\"hasTooltip\">\n" +
    "                      <ng-form name=\"innerForm2\">\n" +
    "                        <div class=\"lf-form-item-data tooltipContainer\">\n" +
    "                          <span class=\"tooltipContent\" ng-include=\"'validation.html'\"></span>  <!-- validation error messages -->\n" +
    "                          <span ng-switch-when=\"\" id=\"{{::item._elementId}}\"> </span>\n" +
    "                          <input ng-switch-when=\"CNE\" name=\"{{::item.question +'_'+ $id}}\"\n" +
    "                                 ng-required=\"::item._answerRequired\"\n" +
    "                                 ng-model=\"item.value\" autocomplete-lhc=\"::autocompLhcOpt(item)\"\n" +
    "                                 ng-readonly=\"::item._readOnly\" placeholder=\"{{::item._toolTip}}\"\n" +
    "                                 id=\"{{::item._elementId}}\">\n" +
    "                          <input ng-switch-when=\"CWE\" name=\"{{::item.question +'_'+ $id}}\"\n" +
    "                                 ng-required=\"::item._answerRequired\"\n" +
    "                                 ng-model=\"item.value\" autocomplete-lhc=\"::autocompLhcOpt(item)\"\n" +
    "                                 ng-readonly=\"::item._readOnly\" placeholder=\"{{::item._toolTip}}\"\n" +
    "                                 id=\"{{::item._elementId}}\">\n" +
    "                          <input ng-switch-when=\"REAL\" name=\"{{::item.question}}\" type=\"number\"\n" +
    "                                 ng-required=\"::item._answerRequired\"\n" +
    "                                 ng-model=\"item.value\" placeholder=\"{{::item._toolTip}}\"\n" +
    "                                 ng-readonly=\"::item._readOnly\" id=\"{{::item._elementId}}\">\n" +
    "                          <input ng-switch-when=\"INT\" name=\"{{::item.question}}\" type=\"number\"\n" +
    "                                 ng-required=\"::item._answerRequired\"\n" +
    "                                 ng-model=\"item.value\" placeholder=\"{{::item._toolTip}}\"\n" +
    "                                 ng-readonly=\"::item._readOnly\" id=\"{{::item._elementId}}\">\n" +
    "                          <input ng-switch-when=\"DT\" name=\"{{::item.question}}\" ng-required=\"::item._answerRequired\"\n" +
    "                                 ng-model=\"item.value\" lf-date=\"::dateOptions\" placeholder=\"{{::item._toolTip}}\"\n" +
    "                                 ng-readonly=\"::item._readOnly\" id=\"{{::item._elementId}}\">\n" +
    "                          <input ng-switch-default name=\"{{::item.question}}\" ng-required=\"::item._answerRequired\"\n" +
    "                                 ng-model=\"item.value\" placeholder=\"{{::item._toolTip}}\" ng-readonly=\"::item._readOnly\"\n" +
    "                                 ng-value=\"runFormula(item)\" id=\"{{::item._elementId}}\">\n" +
    "                        </div>\n" +
    "                      </ng-form>\n" +
    "                    </td>\n" +
    "                    <td ng-switch on=\"::checkUnits(item)\">\n" +
    "                      <input class=\"units\" ng-switch-when=\"list\"\n" +
    "                             ng-model=\"item.unit\" autocomplete-lhc=\"::unitsAutocompLhcOpt(item)\"\n" +
    "                             placeholder=\"Select one\" aria-labelledby=\"th_Units\">\n" +
    "                      <span ng-switch-when=\"none\" > </span>\n" +
    "                    </td>\n" +
    "                    <!--<td>{{item.range}}</td>-->\n" +
    "                  </tr>\n" +
    "                  <!-- extra question -->\n" +
    "                  <tr ng-if=\"needExtra(item)\" class=\"extra-row lf-form-table-row {{getRowClass(item)}} {{getSkipLogicClass(item)}} {{getActiveRowClass(item)}}\" ng-if=\"targetShown(item)\" ng-click=\"setActiveRow(item)\">\n" +
    "                    <td class=\"name has-treeline\">\n" +
    "                      <table class=\"t-treeline-field\" >\n" +
    "                        <tr>\n" +
    "                          <td class=\"t-treeline \" ng-class=\"getExtraRowTreeLevelClass($index, item._lastSiblingList)\"\n" +
    "                              ng-repeat=\"lastStatus in item._lastSiblingList track by $index\"> &nbsp; </td>\n" +
    "                          <td>\n" +
    "                            <div class=\"name-label\">\n" +
    "                              <span>&nbsp;</span>\n" +
    "                            </div>\n" +
    "                          </td>\n" +
    "                        </tr>\n" +
    "                      </table>\n" +
    "                    </td>\n" +
    "                    <td class=\"button-col\"></td>\n" +
    "                    <td colspan=\"5\" class=\"extra-field\">\n" +
    "                      <input ng-model=\"item.valueOther\" placeholder=\"Please specify\" ng-readonly=\"::item._readOnly\">\n" +
    "                    </td>\n" +
    "                  </tr>\n" +
    "                  <!--a button row at the end of each repeating section-->\n" +
    "                  <tr ng-repeat-end ng-if=\"item._repeatingSectionList\"\n" +
    "                      class=\"buttonRow lf-form-table-row {{getRowClass(item)}} {{getSkipLogicClass(item)}}\" ng-if=\"targetShown(item)\">\n" +
    "                    <td colspan=\"6\" class=\"name has-treeline\" >\n" +
    "                      <table class=\"t-treeline-field\" >\n" +
    "                        <tr>\n" +
    "                          <td class=\"t-treeline \" ng-class=\"getExtraRowTreeLevelClass($index, item._lastSiblingList)\"\n" +
    "                              ng-repeat=\"lastStatus in item._lastSiblingList track by $index\"> &nbsp; </td>\n" +
    "                          <td>\n" +
    "                            <div class=\"name-label\">\n" +
    "                              <button ng-repeat=\"repeatingItem in item._repeatingSectionList\"\n" +
    "                                      class=\"float-button\" id=\"add-{{repeatingItem._elementId}}\"\n" +
    "                                      ng-click=\"addOneRepeatingItem(repeatingItem)\"\n" +
    "                                      title=\"Add another '{{ ::repeatingItem.question }}'\">\n" +
    "                                Add another '{{::repeatingItem.question}}'</button>\n" +
    "                            </div>\n" +
    "                          </td>\n" +
    "                        </tr>\n" +
    "                      </table>\n" +
    "                    </td>\n" +
    "                  </tr>\n" +
    "                  </tbody>\n" +
    "                </table>\n" +
    "              </div>\n" +
    "            </td>\n" +
    "          </tr>\n" +
    "          </tbody>\n" +
    "        </table>\n" +
    "      </div>\n" +
    "    </div>\n" +
    "  </form>\n" +
    "  <button ng-if=\"debug\" ng-click=\"onclick()\">Click to debug Panel Controller</button>\n" +
    "  <button ng-if=\"debug\" ng-click=\"getFormData()\">Click to get form data</button>\n" +
    "</div>\n"
  );


  $templateCache.put('form-view-b.html',
    "<div ng-controller=\"PanelTableCtrl\" ng-keydown=\"handleNavigationKeyEventByTab($event)\">\n" +
    "  <form class=\"lf-form\" novalidate autocomplete=\"false\">\n" +
    "    <div class=\"lf-form-view\" ng-if=\"lfData\" >\n" +
    "      <div ng-include=\"'form-header.html'\"></div>\n" +
    "\n" +
    "      <h3 class=\"lf-form-title\">\n" +
    "        <span>{{lfData.name}}</span>\n" +
    "        <span ng-if=\"formConfig.showQuestionCode\">\n" +
    "          <a href=\"http://s.details.loinc.org/LOINC/{{ lfData.code }}.html\" target=\"_blank\">[{{ lfData.code }}]</a></span>\n" +
    "      </h3>\n" +
    "      <div class=\"lf-form-body\">\n" +
    "        <table cellspacing=\"0\" cellpadding=\"0\" class=\"lf-form-table\">\n" +
    "          <colgroup>\n" +
    "            <col ng-repeat=\"item in ::lfData.templateOption.obrItems\"\n" +
    "                 ng-style=\"{'width': '{{::item.formatting.width}}',\n" +
    "                            'min-width': '{{::item.formatting['min-width']}}'}\">\n" +
    "          </colgroup>\n" +
    "          <thead>\n" +
    "          <tr>\n" +
    "            <th class=\"lf-form-table-header\"\n" +
    "                ng-repeat=\"item in ::lfData.templateOption.obrItems\"><label\n" +
    "              for=\"obr_{{::item.question}}\">{{::item.question}}</label></th>\n" +
    "          </tr>\n" +
    "          </thead>\n" +
    "          <tbody>\n" +
    "          <tr class=\"lf-form-table-row\">\n" +
    "            <td class=\"rowEditText hasTooltip\" ng-repeat=\"item in lfData.templateOption.obrItems\"\n" +
    "                ng-switch on=\"item.dataType\">\n" +
    "              <ng-form name=\"innerForm\">\n" +
    "                <div class=\"lf-form-item-data tooltipContainer\">\n" +
    "                  <span class=\"tooltipContent\" ng-include=\"'validation.html'\"></span>  <!-- validation error messages -->\n" +
    "                  <input ng-switch-when=\"CWE\" name=\"{{::item.question}}\"\n" +
    "                         ng-required=\"::item._answerRequired\" placeholder=\"Select or type a value\"\n" +
    "                         ng-model=\"item.value\"\n" +
    "                         autocomplete-lhc=\"::autocompLhcOpt(item)\"\n" +
    "                         id=\"obr_{{::item.question}}\">\n" +
    "                  <input ng-switch-when=\"DT\" name=\"{{::item.question}}\"\n" +
    "                         ng-required=\"::item._answerRequired\"\n" +
    "                         ng-model=\"item.value\" lf-date=\"::dateOptions\"\n" +
    "                         placeholder=\"MM/DD/YYYY\"\n" +
    "                         id=\"obr_{{::item.question}}\">\n" +
    "                  <input ng-switch-default name=\"{{::item.question}}\"\n" +
    "                         ng-required=\"::item._answerRequired\"\n" +
    "                         ng-model=\"item.value\" placeholder=\"Type a value\"\n" +
    "                         id=\"obr_{{::item.question}}\">\n" +
    "                </div>\n" +
    "              </ng-form>\n" +
    "            </td>\n" +
    "          </tr>\n" +
    "          <tr class=\"lf-form-table-row lf-form-body\">\n" +
    "            <td colspan=\"5\">\n" +
    "              <div>\n" +
    "                <table cellspacing=\"0\" cellpadding=\"0\" class=\"lf-form-table\">\n" +
    "                  <colgroup>\n" +
    "                    <col ng-repeat=\"obxCol in ::lfData.templateOption.obxTableColumns\"\n" +
    "                         ng-style=\"{'width': '{{::obxCol.formatting.width}}',\n" +
    "                                    'min-width': '{{::obxCol.formatting['min-width']}}'}\">\n" +
    "                  </colgroup>\n" +
    "                  <thead>\n" +
    "                  <tr>\n" +
    "                    <th class=\"lf-form-table-header\" ng-repeat=\"obxCol in ::lfData.templateOption.obxTableColumns\"\n" +
    "                        id=\"th_{{obxCol.name}}\">{{::obxCol.name}}</th>\n" +
    "                  </tr>\n" +
    "                  </thead>\n" +
    "                  <tbody class=\"\">\n" +
    "                  <tr class=\"dataRow lf-form-table-row {{getRowClass(item)}} {{getSkipLogicClass(item)}} {{getActiveRowClass(item)}}\" ng-if=\"targetShown(item)\"\n" +
    "                      ng-repeat-start=\"item in lfData.itemList \" ng-click=\"setActiveRow(item)\">\n" +
    "                    <td ng-if=\"::!item._inHorizontalTable\" class=\"name has-treeline\">\n" +
    "                      <table class=\"t-treeline-field\" >\n" +
    "                        <tr>\n" +
    "                          <td class=\"t-treeline \" ng-class=\"getTreeLevelClass($index, item._lastSiblingList)\" ng-repeat=\"lastStatus in item._lastSiblingList track by $index\"> &nbsp; </td>\n" +
    "                          <td>\n" +
    "                            <div class=\"name-label\">\n" +
    "                              <span ng-show=\"::item._questionRepeatable\" class=\"sn\">{{::getRepeatingSN(item) }}</span>\n" +
    "                              <span><label for=\"{{::item._elementId}}\">{{::item.question}}</label></span>\n" +
    "                              <span ng-show=\"formConfig.showQuestionCode\">\n" +
    "                                <a href=\"http://s.details.loinc.org/LOINC/{{ item.questionCode }}.html\"\n" +
    "                                   target=\"_blank\">[{{ item.questionCode }}]</a></span>\n" +
    "                              <span ng-show=\"formConfig.showCodingInstruction\"\n" +
    "                                    class=\"prompt\">{{ ::getCodingInstructions(item) }}</span>\n" +
    "                              <button ng-show=\"!formConfig.showCodingInstruction\" ng-if=\"::hasCodingInstructions(item)\"\n" +
    "                                      class=\"help-button\" bs-popover=\"::item.codingInstructions\"\n" +
    "                                      data-auto-close=\"true\" data-placement=\"right\"  title=\"Instruction\">?</button>\n" +
    "                            </div>\n" +
    "                          </td>\n" +
    "                        </tr>\n" +
    "                      </table>\n" +
    "                    </td>\n" +
    "                    <td ng-if=\"::!item._inHorizontalTable\" class=\"button-col\">\n" +
    "                      <button ng-if=\"!hasOneRepeatingItem(item)\" class=\"float-button\"\n" +
    "                              ng-click=\"removeOneRepeatingItem(item)\" id=\"del-{{item._elementId}}\"\n" +
    "                              title=\"Remove this '{{ ::item.question }}'\">-</button>\n" +
    "                    </td>\n" +
    "                    <td ng-if=\"::!item._inHorizontalTable\" ng-switch on=\"item.dataType\" class=\"hasTooltip\">\n" +
    "                      <ng-form name=\"innerForm2\">\n" +
    "                        <div class=\"lf-form-item-data tooltipContainer\">\n" +
    "                          <span class=\"tooltipContent\" ng-include=\"'validation.html'\"></span>  <!-- validation error messages -->\n" +
    "                          <span ng-switch-when=\"\" id=\"{{::item._elementId}}\"> </span>\n" +
    "                          <input ng-switch-when=\"CNE\" name=\"{{::item.question +'_'+ $id}}\"\n" +
    "                                 ng-required=\"::item._answerRequired\"\n" +
    "                                 ng-model=\"item.value\" autocomplete-lhc=\"::autocompLhcOpt(item)\"\n" +
    "                                 ng-readonly=\"::item._readOnly\" placeholder=\"{{::item._toolTip}}\"\n" +
    "                                 id=\"{{::item._elementId}}\">\n" +
    "                          <input ng-switch-when=\"CWE\" name=\"{{::item.question +'_'+ $id}}\"\n" +
    "                                 ng-required=\"::item._answerRequired\"\n" +
    "                                 ng-model=\"item.value\" autocomplete-lhc=\"::autocompLhcOpt(item)\"\n" +
    "                                 ng-readonly=\"::item._readOnly\" placeholder=\"{{::item._toolTip}}\"\n" +
    "                                 id=\"{{::item._elementId}}\">\n" +
    "                          <input ng-switch-when=\"REAL\" name=\"{{::item.question}}\" type=\"number\"\n" +
    "                                 ng-required=\"::item._answerRequired\"\n" +
    "                                 ng-model=\"item.value\" placeholder=\"{{::item._toolTip}}\"\n" +
    "                                 ng-readonly=\"::item._readOnly\" id=\"{{::item._elementId}}\">\n" +
    "                          <input ng-switch-when=\"INT\" name=\"{{::item.question}}\" type=\"number\"\n" +
    "                                 ng-required=\"::item._answerRequired\"\n" +
    "                                 ng-model=\"item.value\" placeholder=\"{{::item._toolTip}}\"\n" +
    "                                 ng-readonly=\"::item._readOnly\" id=\"{{::item._elementId}}\">\n" +
    "                          <input ng-switch-when=\"DT\" name=\"{{::item.question}}\" ng-required=\"::item._answerRequired\"\n" +
    "                                 ng-model=\"item.value\" lf-date=\"::dateOptions\" placeholder=\"{{::item._toolTip}}\"\n" +
    "                                 ng-readonly=\"::item._readOnly\" id=\"{{::item._elementId}}\">\n" +
    "                          <input ng-switch-default name=\"{{::item.question}}\" ng-required=\"::item._answerRequired\"\n" +
    "                                 ng-model=\"item.value\" placeholder=\"{{::item._toolTip}}\" ng-readonly=\"::item._readOnly\"\n" +
    "                                 ng-value=\"runFormula(item)\" id=\"{{::item._elementId}}\">\n" +
    "                        </div>\n" +
    "                      </ng-form>\n" +
    "                    </td>\n" +
    "                    <td ng-if=\"::!item._inHorizontalTable\" ng-switch on=\"::checkUnits(item)\">\n" +
    "                      <input class=\"units\" ng-switch-when=\"list\"\n" +
    "                             ng-model=\"item.unit\" autocomplete-lhc=\"::unitsAutocompLhcOpt(item)\"\n" +
    "                             placeholder=\"Select one\" aria-labelledby=\"th_Units\">\n" +
    "                      <span ng-switch-when=\"none\" > </span>\n" +
    "                    </td>\n" +
    "                    <!--<td>{{item.range}}</td>-->\n" +
    "                    <td ng-if=\"::item._horizontalTableHeader\" class=\"horizontal has-treeline\" colspan=\"5\"\n" +
    "                        ng-include=\"'h-table.html'\"></td>\n" +
    "\n" +
    "                  </tr>\n" +
    "                  <!-- extra question -->\n" +
    "                  <tr ng-if=\"::!item._inHorizontalTable && needExtra(item)\"\n" +
    "                      class=\"extra-row lf-form-table-row {{getRowClass(item)}} {{getSkipLogicClass(item)}} {{getActiveRowClass(item)}}\" ng-if=\"targetShown(item)\" ng-click=\"setActiveRow(item)\">\n" +
    "                    <td class=\"name has-treeline\">\n" +
    "                      <table class=\"t-treeline-field\" >\n" +
    "                        <tr>\n" +
    "                          <td class=\"t-treeline \" ng-class=\"getExtraRowTreeLevelClass($index, item._lastSiblingList)\"\n" +
    "                              ng-repeat=\"lastStatus in item._lastSiblingList track by $index\"> &nbsp; </td>\n" +
    "                          <td>\n" +
    "                            <div class=\"name-label\">\n" +
    "                              <span>&nbsp;</span>\n" +
    "                            </div>\n" +
    "                          </td>\n" +
    "                        </tr>\n" +
    "                      </table>\n" +
    "                    </td>\n" +
    "                    <td class=\"button-col\"></td>\n" +
    "                    <td colspan=\"5\" class=\"extra-field\">\n" +
    "                      <input ng-model=\"item.valueOther\" placeholder=\"Please specify\" ng-readonly=\"::item._readOnly\">\n" +
    "                    </td>\n" +
    "                  </tr>\n" +
    "                  <!--a button row at the end of each repeating section-->\n" +
    "                  <tr ng-repeat-end ng-if=\"item._repeatingSectionList\"\n" +
    "                      class=\"buttonRow lf-form-table-row {{getRowClass(item)}} {{getSkipLogicClass(item)}}\" ng-if=\"targetShown(item)\">\n" +
    "                    <td colspan=\"6\" class=\"name has-treeline\" >\n" +
    "                      <table class=\"t-treeline-field\" >\n" +
    "                        <tr>\n" +
    "                          <td class=\"t-treeline \" ng-class=\"getExtraRowTreeLevelClass($index, item._lastSiblingList)\"\n" +
    "                              ng-repeat=\"lastStatus in item._lastSiblingList track by $index\"> &nbsp; </td>\n" +
    "                          <td>\n" +
    "                            <div class=\"name-label\">\n" +
    "                              <button ng-repeat=\"repeatingItem in item._repeatingSectionList\"\n" +
    "                                      class=\"float-button\" id=\"add-{{repeatingItem._elementId}}\"\n" +
    "                                      ng-click=\"addOneRepeatingItem(repeatingItem)\"\n" +
    "                                      title=\"Add another '{{ ::repeatingItem.question }}'\">\n" +
    "                                Add another '{{::repeatingItem.question}}'</button>\n" +
    "                            </div>\n" +
    "                          </td>\n" +
    "                        </tr>\n" +
    "                      </table>\n" +
    "                    </td>\n" +
    "                  </tr>\n" +
    "                  </tbody>\n" +
    "                </table>\n" +
    "              </div>\n" +
    "            </td>\n" +
    "          </tr>\n" +
    "          </tbody>\n" +
    "        </table>\n" +
    "      </div>\n" +
    "    </div>\n" +
    "  </form>\n" +
    "  <button ng-if=\"debug\" ng-click=\"onclick()\">Click to debug Panel Controller</button>\n" +
    "</div>\n"
  );


  $templateCache.put('h-table.html',
    "  <table class=\"t-treeline-field\" >\n" +
    "    <tr>\n" +
    "      <td class=\"t-treeline \" ng-class=\"getTreeLevelClass($index, item._lastSiblingList)\" ng-repeat=\"lastStatus in item._lastSiblingList track by $index\"> &nbsp; </td>\n" +
    "      <td>\n" +
    "        <div class=\"name-label\">\n" +
    "          <div class=\"lf-form-horizontal-table-title\">\n" +
    "            {{item.question}}\n" +
    "          </div>\n" +
    "\n" +
    "          <table class=\"lf-form-table lf-form-horizontal-table\">\n" +
    "            <colgroup>\n" +
    "              <col class=\"button-col\"\">\n" +
    "              <col ng-repeat=\"col in lfData._horizontalTableInfo[item._horizontalTableId].columnHeaders\">\n" +
    "            </colgroup>\n" +
    "            <thead>\n" +
    "            <tr>\n" +
    "              <th class=\"lf-form-table-header\"></th>\n" +
    "              <th class=\"lf-form-table-header\" ng-repeat=\"col in lfData._horizontalTableInfo[item._horizontalTableId].columnHeaders\"\n" +
    "                  id=\"{{col.id}}\">{{col.label}}</th>\n" +
    "            </tr>\n" +
    "            </thead>\n" +
    "            <tbody id=\"\" class=\"\">\n" +
    "            <tr class=\"tableRow\" ng-repeat=\"row in lfData._horizontalTableInfo[item._horizontalTableId].tableRows\">\n" +
    "              <td class=\"button-col\">\n" +
    "                <button ng-if=\"!hasOneRepeatingItem(item)\" id=\"del-{{row.header._elementId}}\"\n" +
    "                        class=\"float-button\" ng-click=\"removeOneRepeatingItem(row.header)\"\n" +
    "                        title=\"Remove this row of '{{ row.header.question }}'\">-</button>\n" +
    "              </td>\n" +
    "\n" +
    "              <td ng-repeat=\"cell in row.cells\" ng-switch on=\"cell.dataType\" class=\"hasTooltip\">\n" +
    "                <ng-form name=\"innerForm2\">\n" +
    "                  <div class=\"lf-form-item-data tooltipContainer\">\n" +
    "                    <span class=\"tooltipContent\">\n" +
    "                      <div class=\"errorMsg errorRequired\">\"{{ cell.question }}\" requires a value.</div>\n" +
    "                      <div class=\"errorMsg errorPattern\">\"{{ cell.question }}\" requires a text pattern.</div>\n" +
    "                      <div class=\"errorMsg errorMax\">\"{{ cell.question }}\" requires a maximum value of ??.</div>\n" +
    "                      <div class=\"errorMsg errorMin\">\"{{ cell.question }}\" requires a minimum value of ??.</div>\n" +
    "                      <div class=\"errorMsg errorMaxlength\">\"{{ cell.question }}\" requires a maximum length of ??.</div>\n" +
    "                      <div class=\"errorMsg errorMinlength\">\"{{ cell.question }}\" requires a minimum length of ??.</div>\n" +
    "                      <div class=\"errorMsg errorURL\">\"{{ cell.question }}\" requires a url.</div>\n" +
    "                      <div class=\"errorMsg errorEmail\">\"{{ cell.question }}\" requires an email.</div>\n" +
    "                      <div class=\"errorMsg errorNumber\">\"{{ cell.question }}\" requires a numeric value.</div>\n" +
    "                      <div class=\"errorMsg errorREAL\">\"{{ cell.question }}\" requires a decimal value.</div>\n" +
    "                      <div class=\"errorMsg errorINT\">\"{{ cell.question }}\" requires a integer value.</div>\n" +
    "                      <div class=\"errorMsg errorTM\">\"{{ cell.question }}\" requires a time value.</div>\n" +
    "                      <div class=\"errorMsg errorDT\">\"{{ cell.question }}\" requires a date value.</div>\n" +
    "                    </span>  <!-- validation error messages -->\n" +
    "                    <span ng-switch-when=\"\" > </span>\n" +
    "                    <input ng-switch-when=\"CNE\" name=\"{{::cell.question + '_' + $id}}\"\n" +
    "                           ng-required=\"cell._answerRequired\" ng-model=\"cell.value\"\n" +
    "                           autocomplete-lhc=\"autocompLhcOpt(cell)\"\n" +
    "                           ng-readonly=\"::cell._readOnly\" placeholder=\"{{::cell._toolTip}}\"\n" +
    "                           id=\"{{::cell._elementId}}\"\n" +
    "                           aria-labelledby=\"{{lfData._horizontalTableInfo[item._horizontalTableId].columnHeaders[$index].id}}\">\n" +
    "                    <input ng-switch-when=\"CWE\" name=\"{{::cell.question + '_' + $id}}\"\n" +
    "                           ng-required=\"cell._answerRequired\" ng-model=\"cell.value\"\n" +
    "                           autocomplete-lhc=\"autocompLhcOpt(cell)\"\n" +
    "                           ng-readonly=\"::cell._readOnly\" placeholder=\"{{::cell._toolTip}}\"\n" +
    "                           id=\"{{::cell._elementId}}\"\n" +
    "                           aria-labelledby=\"{{lfData._horizontalTableInfo[item._horizontalTableId].columnHeaders[$index].id}}\">\n" +
    "                    <input ng-switch-when=\"REAL\" name=\"{{::cell.question}}\" type=\"number\"\n" +
    "                           ng-required=\"cell._answerRequired\" ng-model=\"cell.value\"\n" +
    "                           placeholder=\"{{::cell._toolTip}}\" ng-readonly=\"::cell._readOnly\"\n" +
    "                           id=\"{{::cell._elementId}}\"\n" +
    "                           aria-labelledby=\"{{lfData._horizontalTableInfo[item._horizontalTableId].columnHeaders[$index].id}}\">\n" +
    "                    <input ng-switch-when=\"INT\" name=\"{{::cell.question}}\" type=\"number\"\n" +
    "                           ng-required=\"cell._answerRequired\" ng-model=\"cell.value\"\n" +
    "                           placeholder=\"{{::cell._toolTip}}\" ng-readonly=\"::cell._readOnly\"\n" +
    "                           id=\"{{::cell._elementId}}\"\n" +
    "                           aria-labelledby=\"{{lfData._horizontalTableInfo[item._horizontalTableId].columnHeaders[$index].id}}\">\n" +
    "                    <input ng-switch-when=\"DT\" name=\"{{::cell.question}}\"\n" +
    "                           ng-required=\"cell._answerRequired\" ng-model=\"cell.value\"\n" +
    "                           lf-date=\"dateOptions\" placeholder=\"{{::cell._toolTip}}\" ng-readonly=\"::cell._readOnly\"\n" +
    "                           id=\"{{::cell._elementId}}\"\n" +
    "                           aria-labelledby=\"{{lfData._horizontalTableInfo[item._horizontalTableId].columnHeaders[$index].id}}\">\n" +
    "                    <input ng-switch-default name=\"{{::cell.question}}\"\n" +
    "                           ng-required=\"cell._answerRequired\" ng-model=\"cell.value\"\n" +
    "                           placeholder=\"{{::cell._toolTip}}\" ng-readonly=\"::cell._readOnly\"\n" +
    "                           id=\"{{::cell._elementId}}\" ng-value=\"runFormula(cell)\"\n" +
    "                           aria-labelledby=\"{{lfData._horizontalTableInfo[item._horizontalTableId].columnHeaders[$index].id}}\">\n" +
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


  $templateCache.put('panel-search.html',
    "<div ng-controller=\"PanelSearchCtrl\">\n" +
    "  <tabset>\n" +
    "    <tab heading=\"Modified LOINC Panels and Sample Forms\">\n" +
    "      <div class=\"panel\">\n" +
    "        <div class=\"panel-heading\">A list of modified LOINC panels and sample forms.</div>\n" +
    "        <div class=\"panel-body\">\n" +
    "          <input id=\"loinc_num1\" ng-model=\"selectedPanel[0]\" ui-select2=\"panelListOpt()\">\n" +
    "          <br><br>\n" +
    "          <button type=\"button\" class=\"btn btn-primary\" ng-click=\"addMoreWidget(0)\"><span>Show Form</span></button>\n" +
    "        </div>\n" +
    "      </div>\n" +
    "    </tab>\n" +
    "  </tabset>\n" +
    "</div>\n" +
    "\n" +
    "\n"
  );


  $templateCache.put('validation.html',
    "<div class=\"errorMsg errorRequired\">\"{{ ::item.question }}\" requires a value.</div>\n" +
    "<div class=\"errorMsg errorPattern\">\"{{ ::item.question }}\" requires a text pattern.</div>\n" +
    "<div class=\"errorMsg errorMax\">\"{{ ::item.question }}\" requires a maximum value of ??.</div>\n" +
    "<div class=\"errorMsg errorMin\">\"{{ ::item.question }}\" requires a minimum value of ??.</div>\n" +
    "<div class=\"errorMsg errorMaxlength\">\"{{ ::item.question }}\" requires a maximum length of ??.</div>\n" +
    "<div class=\"errorMsg errorMinlength\">\"{{ ::item.question }}\" requires a minimum length of ??.</div>\n" +
    "<div class=\"errorMsg errorURL\">\"{{ ::item.question }}\" requires a url.</div>\n" +
    "<div class=\"errorMsg errorEmail\">\"{{ ::item.question }}\" requires an email.</div>\n" +
    "<div class=\"errorMsg errorNumber\">\"{{ ::item.question }}\" requires a numeric value.</div>\n" +
    "<div class=\"errorMsg errorREAL\">\"{{ ::item.question }}\" requires a decimal value.</div>\n" +
    "<div class=\"errorMsg errorINT\">\"{{ ::item.question }}\" requires a integer value.</div>\n" +
    "<div class=\"errorMsg errorTM\">\"{{ ::item.question }}\" requires a time value.</div>\n" +
    "<div class=\"errorMsg errorDT\">\"{{ ::item.question }}\" requires a date value.</div>\n" +
    "<div class=\"errorMsg errorInvalidParse\">\"{{ ::item.question }}\" requires a selection from the list.</div>\n"
  );

}]);

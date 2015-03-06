angular.module('lformsWidget').run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('form-header.html',
    "<div class=\"stopped\" ng-show=\"isFormDone()\"><img src=\"../images/blank.gif\" class=\"stop-sign\"><span>This form is complete.</span></div>\n" +
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
    "  <div class=\"col-md-3 col-xs-3 col-md-offset-3 col-xs-offset-3 \">\n" +
    "    <div style=\"margin: 10px\">Total # of Questions: {{lfData.items.length}}</div>\n" +
    "  </div>\n" +
    "\n" +
    "</div>\n"
  );


  $templateCache.put('horizontal-table.html',
    "  <table class=\"t-treeline-field\" >\n" +
    "    <tr>\n" +
    "      <td class=\"t-treeline \" ng-class=\"getHorizontalLayoutTreeLevelClass(5, $index) \"> &nbsp; </td>\n" +
    "      <td class=\"t-treeline \" ng-class=\"getHorizontalLayoutTreeLevelClass(4, $index) \"> &nbsp; </td>\n" +
    "      <td class=\"t-treeline \" ng-class=\"getHorizontalLayoutTreeLevelClass(3, $index) \"> &nbsp; </td>\n" +
    "      <td class=\"t-treeline \" ng-class=\"getHorizontalLayoutTreeLevelClass(2, $index) \"> &nbsp; </td>\n" +
    "      <td class=\"t-treeline \" ng-class=\"getHorizontalLayoutTreeLevelClass(1, $index) \"> &nbsp; </td>\n" +
    "      <td class=\"t-treeline \" ng-class=\"getHorizontalLayoutTreeLevelClass(0, $index) \"> &nbsp; </td>\n" +
    "\n" +
    "      <td>\n" +
    "        <div class=\"name_label\">\n" +
    "          <div class=\"hTableTitle\">\n" +
    "            {{item.question}}\n" +
    "          </div>\n" +
    "\n" +
    "          <table class=\"fieldsTable horizontal-table\">\n" +
    "            <colgroup>\n" +
    "              <col style=\"width:5em; min-width: 5em;\">\n" +
    "              <col ng-repeat=\"colName in lfData._horizontalTableInfo[item._codePath + item._parentIdPath_].columnNames\">\n" +
    "            </colgroup>\n" +
    "            <thead>\n" +
    "            <tr>\n" +
    "              <th class=\"fieldsTableHeader\"></th>\n" +
    "              <th class=\"fieldsTableHeader\" ng-repeat=\"colName in lfData._horizontalTableInfo[item._codePath + item._parentIdPath_].columnNames\">{{colName}}</th>\n" +
    "            </tr>\n" +
    "            </thead>\n" +
    "            <tbody id=\"\" class=\"\">\n" +
    "            <tr ng-repeat=\"row in lfData._horizontalTableInfo[item._codePath + item._parentIdPath_].tableRows\">\n" +
    "              <td class=\"button-col\">\n" +
    "                <button ng-if=\"!hasOneRepeatingRow(item)\" class=\"float-button\"  ng-click=\"removeOneRepeatingItem(lfData.items[row.header])\" title=\"Remove this row of '{{ item.question }}'\">-</button>\n" +
    "                <button ng-if=\"row.header == lfData._horizontalTableInfo[item._codePath + item._parentIdPath_].lastHeaderIndex\" class=\"float-button\"  id=\"{{lfData.items[row.header]._codePath+lfData.items[row.header]._idPath}}\" ng-click=\"addOneRepeatingItem(lfData.items[row.header])\" title=\"Add another row of '{{ item.question }}'\">+</button>\n" +
    "              </td>\n" +
    "\n" +
    "              <td ng-repeat=\"cell in row.cells\" ng-switch on=\"getFieldType(lfData.items[cell])\" class=\"hasTooltip\">\n" +
    "                <ng-form name=\"innerForm2\">\n" +
    "                  <div class=\"cellData tooltipContainer\">\n" +
    "                    <span class=\"tooltipContent\">\n" +
    "                      <div class=\"errorMsg errorRequired\">\"{{ lfData.items[cell].question }}\" requires a value.</div>\n" +
    "                      <div class=\"errorMsg errorPattern\">\"{{ lfData.items[cell].question }}\" requires a text pattern.</div>\n" +
    "                      <div class=\"errorMsg errorMax\">\"{{ lfData.items[cell].question }}\" requires a maximum value of ??.</div>\n" +
    "                      <div class=\"errorMsg errorMin\">\"{{ lfData.items[cell].question }}\" requires a minimum value of ??.</div>\n" +
    "                      <div class=\"errorMsg errorMaxlength\">\"{{ lfData.items[cell].question }}\" requires a maximum length of ??.</div>\n" +
    "                      <div class=\"errorMsg errorMinlength\">\"{{ lfData.items[cell].question }}\" requires a minimum length of ??.</div>\n" +
    "                      <div class=\"errorMsg errorURL\">\"{{ lfData.items[cell].question }}\" requires a url.</div>\n" +
    "                      <div class=\"errorMsg errorEmail\">\"{{ lfData.items[cell].question }}\" requires an email.</div>\n" +
    "                      <div class=\"errorMsg errorNumber\">\"{{ lfData.items[cell].question }}\" requires a numeric value.</div>\n" +
    "                      <div class=\"errorMsg errorREAL\">\"{{ lfData.items[cell].question }}\" requires a decimal value.</div>\n" +
    "                      <div class=\"errorMsg errorINT\">\"{{ lfData.items[cell].question }}\" requires a integer value.</div>\n" +
    "                      <div class=\"errorMsg errorTM\">\"{{ lfData.items[cell].question }}\" requires a time value.</div>\n" +
    "                      <div class=\"errorMsg errorDT\">\"{{ lfData.items[cell].question }}\" requires a date value.</div>\n" +
    "                    </span>  <!-- validation error messages -->\n" +
    "                    <span ng-switch-when=\"\" > </span>\n" +
    "                    <input ng-switch-when=\"CNE-1\" name=\"{{lfData.items[cell].question + '_' + $id}}\"\n" +
    "                     ng-required=\"isAnswerRequired2(lfData.items[cell])\" ng-model=\"lfData.items[cell]._value\"\n" +
    "                     phr-autocomplete=\"phrAutocompOpt(lfData.items[cell])\" ng-model-options=\"{updateOn: 'change'}\"\n" +
    "                     ng-readonly=\"isReadOnly(lfData.items[cell])\" placeholder=\"Select one or more\" id=\"{{::lfData.items[cell]._elementId_}}\"></input>\n" +
    "                    <input ng-switch-when=\"REAL1\" name=\"{{lfData.items[cell].question}}\" type=\"number\" ng-required=\"isAnswerRequired(lfData.items[cell])\" ng-model=\"lfData.items[cell]._value\" placeholder=\"Type a value\" ng-readonly=\"isReadOnly(lfData.items[cell])\" id=\"{{::lfData.items[cell]._elementId_}}\">\n" +
    "                    <input ng-switch-when=\"CNE1\" name=\"{{lfData.items[cell].question + '_' + $id}}\"\n" +
    "                     ng-required=\"isAnswerRequired(lfData.items[cell])\" placeholder=\"Select one\"\n" +
    "                     ng-model=\"lfData.items[cell]._value\" phr-autocomplete=\"phrAutocompOpt(lfData.items[cell])\"\n" +
    "                     ng-readonly=\"isReadOnly(lfData.items[cell])\" ng-model-options=\"{updateOn: 'change'}\" id=\"{{::lfData.items[cell]._elementId_}}\">\n" +
    "                    <input ng-switch-when=\"DT1\" name=\"{{lfData.items[cell].question}}\" ng-required=\"isAnswerRequired(lfData.items[cell])\" ng-model=\"lfData.items[cell]._value\" lf-date=\"dateOptions\" placeholder=\"MM/DD/YYYY\" ng-readonly=\"isReadOnly(lfData.items[cell])\" id=\"{{::lfData.items[cell]._elementId_}}\">\n" +
    "                    <input ng-switch-default name=\"{{lfData.items[cell].question}}\" ng-required=\"isAnswerRequired(lfData.items[cell])\" ng-model=\"lfData.items[cell]._value\" placeholder=\"Type a value\" ng-readonly=\"isReadOnly(lfData.items[cell])\" id=\"{{::lfData.items[cell]._elementId_}}\">\n" +
    "                  </div>\n" +
    "                </ng-form>\n" +
    "              </td>\n" +
    "            </tr>\n" +
    "            </tbody>\n" +
    "          </table>\n" +
    "        </div>\n" +
    "\n" +
    "      </td>\n" +
    "    </tr>\n" +
    "  </table>\n"
  );


  $templateCache.put('initial.html',
    "<div class=\"loading initial\">\n" +
    "  <span>Please select a LOINC Panel from left side.<span>\n" +
    "</div>\n"
  );


  $templateCache.put('loading.html',
    "<div class=\"loading\">\n" +
    "  <span>Loading...</span>\n" +
    "</div>"
  );


  $templateCache.put('panel-search.html',
    "<div ng-controller=\"PanelSearchCtrl\">\n" +
    "  <tabset>\n" +
    "    <tab heading=\"LOINC Panels\">\n" +
    "      <div class=\"panel\">\n" +
    "        <div class=\"panel-heading\">A list of modified LOINC panels.</div>\n" +
    "        <div class=\"panel-body\">\n" +
    "          <input id=\"loinc_num1\" ng-model=\"selectedPanel[0]\" ui-select2=\"panelListOpt()\">\n" +
    "          <br><br>\n" +
    "          <button type=\"button\" class=\"btn btn-primary\" ng-click=\"addMoreWidget(0)\"><span>Show Panel</span></button>\n" +
    "        </div>\n" +
    "      </div>\n" +
    "    </tab>\n" +
    "  </tabset>\n" +
    "</div>\n" +
    "\n" +
    "\n"
  );


  $templateCache.put('panel-table-h.html',
    "<div ng-controller=\"PanelTableCtrl\" ng-keypress=\"handleNavigationKeyEvent($event)\">\n" +
    "  <form name=\"panel\" novalidate>\n" +
    "    <div class=\"panelGroup fieldGroup\" ng-if=\"lfData\" >\n" +
    "      <div ng-include=\"'form-header.html'\"></div>\n" +
    "\n" +
    "      <h3 class=\"groupHeader\">\n" +
    "        <span>{{::lfData.name}}</span>\n" +
    "        <span ng-if=\"formConfig.showQuestionCode\"><a href=\"http://s.details.loinc.org/LOINC/{{ lfData.code }}.html\" target=\"_blank\">[{{ lfData.code }}]</a></span>\n" +
    "      </h3>\n" +
    "      <div class=\"fieldExpColDiv\">\n" +
    "        <table cellspacing=\"0\" cellpadding=\"0\" class=\"fieldsTable\">\n" +
    "          <colgroup>\n" +
    "            <col ng-repeat=\"item in ::lfData.templateOption.obrItems\"\n" +
    "                 ng-style=\"{'width': '{{::item.formatting.width}}',\n" +
    "                            'min-width': '{{::item.formatting['min-width']}}' }\">\n" +
    "          </colgroup>\n" +
    "          <thead>\n" +
    "          <tr>\n" +
    "            <th class=\"fieldsTableHeader\" ng-repeat=\"item in ::lfData.templateOption.obrItems\">{{::item.question}}</th>\n" +
    "          </tr>\n" +
    "          </thead>\n" +
    "          <tbody>\n" +
    "          <tr class=\"repeatingLine\">\n" +
    "            <td class=\"rowEditText hasTooltip\" ng-repeat=\"item in lfData.templateOption.obrItems\" ng-switch on=\"item.dataType\">\n" +
    "              <ng-form name=\"innerForm\">\n" +
    "                  <div class=\"cellData tooltipContainer\">\n" +
    "                    <span class=\"tooltipContent\" ng-include=\"'validation.html'\"></span>  <!-- validation error messages -->\n" +
    "                    <input ng-switch-when=\"CWE\" name=\"{{::item.question}}\" ng-required=\"::isAnswerRequired(item)\"\n" +
    "                     placeholder=\"Select or type a value\" ng-model-options=\"{updateOn: 'change'}\"\n" +
    "                     ng-model=\"item._value\" phr-autocomplete=\"::phrAutocompOpt(item)\"\n" +
    "                     ng-readonly=\"::isReadOnly(item)\">\n" +
    "                    <input ng-switch-when=\"DT\" name=\"{{::item.question}}\"  ng-required=\"::isAnswerRequired(item)\" ng-model-options=\"{ updateOn: 'default' }\" ng-model=\"item._value\" lf-date=\"::dateOptions\" placeholder=\"MM/DD/YYYY\" ng-readonly=\"::isReadOnly(item)\">\n" +
    "                    <input ng-switch-default name=\"{{::item.question}}\" ng-required=\"::isAnswerRequired(item)\" ng-model-options=\"{ updateOn: 'default' }\" ng-model=\"item._value\" placeholder=\"Type a value\" ng-readonly=\"::isReadOnly(item)\">\n" +
    "                  </div>\n" +
    "              </ng-form>\n" +
    "            </td>\n" +
    "          </tr>\n" +
    "          <tr class=\"embeddedRow\">\n" +
    "            <td colspan=\"5\">\n" +
    "              <div>\n" +
    "                <table cellspacing=\"0\" cellpadding=\"0\" class=\"fieldsTable\">\n" +
    "                  <colgroup>\n" +
    "                    <col ng-repeat=\"obxCol in ::lfData.templateOption.obxTableColumns\"\n" +
    "                         ng-style=\"{'width': '{{::obxCol.formatting.width}}',\n" +
    "                                    'min-width': '{{::obxCol.formatting['min-width']}}' }\">\n" +
    "                  </colgroup>\n" +
    "                  <thead>\n" +
    "                  <tr>\n" +
    "                    <th class=\"fieldsTableHeader\" ng-repeat=\"obxCol in ::lfData.templateOption.obxTableColumns\">{{::obxCol.name}}</th>\n" +
    "                  </tr>\n" +
    "                  </thead>\n" +
    "                  <tbody id=\"obx_table\" class=\"fieldExpColDiv\">\n" +
    "                  <tr style=\"width: 99%\" class=\"repeatingLine {{ getSkipLogicTargetClass(item) }} {{getRowClass(item)}} {{getActiveRowClass($index)}}\" ng-repeat-start=\"item in lfData.items track by $id(item)\" ng-click=\"setActiveRow($index)\">\n" +
    "                    <td ng-if=\"::!item._inHorizontalTable\" class=\"name has_treeline\">\n" +
    "                      <table class=\"t-treeline-field\" >\n" +
    "                        <tr>\n" +
    "                          <td class=\"t-treeline \" ng-class=\"getTreeLevelClass(5, $index) \"> &nbsp; </td>\n" +
    "                          <td class=\"t-treeline \" ng-class=\"getTreeLevelClass(4, $index) \"> &nbsp; </td>\n" +
    "                          <td class=\"t-treeline \" ng-class=\"getTreeLevelClass(3, $index) \"> &nbsp; </td>\n" +
    "                          <td class=\"t-treeline \" ng-class=\"getTreeLevelClass(2, $index) \"> &nbsp; </td>\n" +
    "                          <td class=\"t-treeline \" ng-class=\"getTreeLevelClass(1, $index) \"> &nbsp; </td>\n" +
    "                          <td class=\"t-treeline \" ng-class=\"getTreeLevelClass(0, $index) \"> &nbsp; </td>\n" +
    "                          <td>\n" +
    "                            <div class=\"name_label\">\n" +
    "                              <span ng-show=\"::isRepeatable(item)\" class=\"sn\">{{::getRepeatingSN(item) }}</span>\n" +
    "                              <span><label for=\"{{::item._elementId_}}\">{{::item.question}}</label></span>\n" +
    "                              <span ng-show=\"formConfig.showQuestionCode\"><a href=\"http://s.details.loinc.org/LOINC/{{ item.questionCode }}.html\" target=\"_blank\">[{{ item.questionCode }}]</a></span>\n" +
    "                              <span ng-show=\"formConfig.showCodingInstruction\" class=\"prompt\">{{ ::getCodingInstructions(item) }}</span>\n" +
    "                              <button ng-show=\"!formConfig.showCodingInstruction\" ng-if=\"::hasCodingInstructions(item)\" class=\"help-button\" bs-popover=\"::item.codingInstructions\" data-auto-close=\"true\" data-placement=\"right\"  title=\"Instruction\">?</button>\n" +
    "                              </button>\n" +
    "                            </div>\n" +
    "                          </td>\n" +
    "                        </tr>\n" +
    "                      </table>\n" +
    "                    </td>\n" +
    "                    <td ng-if=\"::!item._inHorizontalTable\" class=\"button-col\">\n" +
    "                      <button ng-if=\"!hasOneRepeatingItem(item)\" class=\"float-button\"  ng-click=\"removeOneRepeatingItem(item)\" title=\"Remove this '{{ ::item.question }}'\">-</button>\n" +
    "                    </td>\n" +
    "                    <td ng-if=\"::!item._inHorizontalTable\" ng-switch on=\"::getFieldType(item)\" class=\"hasTooltip\">\n" +
    "                      <ng-form name=\"innerForm2\">\n" +
    "                        <div class=\"cellData tooltipContainer\">\n" +
    "                          <span class=\"tooltipContent\" ng-include=\"'validation.html'\"></span>  <!-- validation error messages -->\n" +
    "                          <span ng-switch-when=\"\" > </span>\n" +
    "                          <input ng-switch-when=\"CNE-1\" name=\"{{::item.question + '_' + $id}}\"\n" +
    "                           ng-required=\"::isAnswerRequired(item)\" ng-model-options=\"{updateOn: 'change'}\"\n" +
    "                           ng-model=\"item._value\" phr-autocomplete=\"::phrAutocompOpt(item)\"\n" +
    "                           ng-readonly=\"::isReadOnly(item)\" placeholder=\"Select one or more\" id=\"{{::item._elementId_}}\">\n" +
    "                          <input ng-switch-when=\"REAL1\" name=\"{{::item.question}}\" type=\"number\" ng-required=\"::isAnswerRequired(item)\" ng-model-options=\"{ updateOn: 'default' }\" ng-model=\"item._value\" placeholder=\"Type a value\" ng-readonly=\"::isReadOnly(item )\" id=\"{{::item._elementId_}}\"></input>\n" +
    "                          <input ng-switch-when=\"CNE1\" name=\"{{::item.question + '_' + $id}}\"\n" +
    "                           ng-required=\"::isAnswerRequired(item)\"\n" +
    "                           placeholder=\"Select one\" ng-model-options=\"{updateOn: 'change'}\"\n" +
    "                           ng-model=\"item._value\" phr-autocomplete=\"::phrAutocompOpt(item)\"\n" +
    "                           ng-readonly=\"::isReadOnly(item)\" id=\"{{::item._elementId_}}\">\n" +
    "                          <input ng-switch-when=\"DT1\" name=\"{{::item.question}}\" ng-required=\"::isAnswerRequired(item)\" ng-model-options=\"{ updateOn: 'default' }\" ng-model=\"item._value\" lf-date=\"::dateOptions\" placeholder=\"MM/DD/YYYY\" ng-readonly=\"::isReadOnly(item)\" id=\"{{::item._elementId_}}\"></input>\n" +
    "                          <input ng-switch-default name=\"{{::item.question}}\" ng-required=\"::isAnswerRequired(item)\" ng-model-options=\"{ updateOn: 'default' }\" ng-model=\"item._value\" placeholder=\"Type a value\" ng-readonly=\"::isReadOnly(item)\" id=\"{{::item._elementId_}}\"></input>\n" +
    "                        </div>\n" +
    "                      </ng-form>\n" +
    "                    </td>\n" +
    "                    <td ng-if=\"::!item._inHorizontalTable\" ng-switch on=\"::checkUnits(item)\">\n" +
    "                      <input class=\"units\" ng-switch-when=\"list\" ng-model-options=\"{updateOn: 'change'}\"\n" +
    "                       ng-model=\"item._unit\" phr-autocomplete=\"phrUnitsAutocompOpt(item)\" placeholder=\"Select one\"></input>\n" +
    "                      <span ng-switch-when=\"none\" > </span>\n" +
    "                    </td>\n" +
    "                    <!--<td ng-if=\"!inHorizontalTable($index)\">{{item.range}}</td>-->\n" +
    "                    <td ng-if=\"::item._horizontalTableHeader\" class=\"horizontal has_treeline\" colspan=\"5\" ng-include=\"'horizontal-table.html'\"></td>\n" +
    "                  </tr>\n" +
    "                  <!-- extra question -->\n" +
    "                  <tr ng-if=\"::!item._inHorizontalTable && needExtra(item)\" style=\"width: 99%\" class=\"extra-row repeatingLine {{ getSkipLogicTargetClass(item) }} {{getRowClass(item)}}\">\n" +
    "                    <td class=\"name has_treeline\">\n" +
    "                      <table class=\"t-treeline-field\" >\n" +
    "                        <tr>\n" +
    "                          <td class=\"t-treeline \" ng-class=\"getExtraRowTreeLevelClass(5, $index) \"> &nbsp; </td>\n" +
    "                          <td class=\"t-treeline \" ng-class=\"getExtraRowTreeLevelClass(4, $index) \"> &nbsp; </td>\n" +
    "                          <td class=\"t-treeline \" ng-class=\"getExtraRowTreeLevelClass(3, $index) \"> &nbsp; </td>\n" +
    "                          <td class=\"t-treeline \" ng-class=\"getExtraRowTreeLevelClass(2, $index) \"> &nbsp; </td>\n" +
    "                          <td class=\"t-treeline \" ng-class=\"getExtraRowTreeLevelClass(1, $index) \"> &nbsp; </td>\n" +
    "                          <td class=\"t-treeline \" ng-class=\"getExtraRowTreeLevelClass(0, $index) \"> &nbsp; </td>\n" +
    "                          <td>\n" +
    "                            <div class=\"name_label\">\n" +
    "                              <span>&nbsp;</span>\n" +
    "                            </div>\n" +
    "                          </td>\n" +
    "                        </tr>\n" +
    "                      </table>\n" +
    "                    </td>\n" +
    "                    <td class=\"button-col\"></td>\n" +
    "                    <td colspan=\"5\" class=\"extra-field\">\n" +
    "                      <input ng-model=\"item._valueOther\" placeholder=\"Please specify\" ng-readonly=\"::isReadOnly(item)\"></input>\n" +
    "                    </td>\n" +
    "                  </tr>\n" +
    "                  <!--a button row at the end of each repeating section-->\n" +
    "                  <tr ng-repeat-end ng-if=\"isLastItemInRepeatingItems($index)\" class=\"buttonRow repeatingLine {{ getSkipLogicTargetClass(item) }} {{getRowClass(item)}}\" >\n" +
    "                    <td colspan=\"6\" class=\"name has_treeline\" >\n" +
    "                      <table class=\"t-treeline-field\" >\n" +
    "                        <tr>\n" +
    "                          <td class=\"t-treeline \" ng-class=\"getExtraRowTreeLevelClass(5, $index) \"> &nbsp; </td>\n" +
    "                          <td class=\"t-treeline \" ng-class=\"getExtraRowTreeLevelClass(4, $index) \"> &nbsp; </td>\n" +
    "                          <td class=\"t-treeline \" ng-class=\"getExtraRowTreeLevelClass(3, $index) \"> &nbsp; </td>\n" +
    "                          <td class=\"t-treeline \" ng-class=\"getExtraRowTreeLevelClass(2, $index) \"> &nbsp; </td>\n" +
    "                          <td class=\"t-treeline \" ng-class=\"getExtraRowTreeLevelClass(1, $index) \"> &nbsp; </td>\n" +
    "                          <td class=\"t-treeline \" ng-class=\"getExtraRowTreeLevelClass(0, $index) \"> &nbsp; </td>\n" +
    "                          <td>\n" +
    "                            <div class=\"name_label\">\n" +
    "                              <button ng-repeat=\"repeatingItem in getParentRepeatingItemsOfLastItem($index)\" class=\"float-button\"  id=\"{{repeatingItem._codePath+repeatingItem._idPath}}\" ng-click=\"addOneRepeatingItem(repeatingItem)\" title=\"Add another '{{ ::repeatingItem.question }}'\">Add another '{{::repeatingItem.question}}'</button>\n" +
    "                            </div>\n" +
    "                          </td>\n" +
    "                        </tr>\n" +
    "                      </table>\n" +
    "                    </td>\n" +
    "                  </tr>\n" +
    "\n" +
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
    "  <button ng-click=\"onclick()\">Click to debug Panel Table controller</button>\n" +
    "</div>\n"
  );


  $templateCache.put('panel-table-v.html',
    "<div ng-controller=\"PanelTableCtrl\" ng-keypress=\"handleNavigationKeyEvent($event)\">\n" +
    "  <form name=\"panel\" novalidate>\n" +
    "    <div class=\"panelGroup fieldGroup\" ng-if=\"lfData\" >\n" +
    "      <div ng-include=\"'form-header.html'\"></div>\n" +
    "\n" +
    "      <h3 class=\"groupHeader\">\n" +
    "        <span>{{::lfData.name}}</span>\n" +
    "        <span ng-if=\"formConfig.showQuestionCode\"><a href=\"http://s.details.loinc.org/LOINC/{{ lfData.code }}.html\" target=\"_blank\">[{{ lfData.code }}]</a></span>\n" +
    "      </h3>\n" +
    "      <div class=\"fieldExpColDiv\">\n" +
    "        <table cellspacing=\"0\" cellpadding=\"0\" class=\"fieldsTable\">\n" +
    "          <colgroup>\n" +
    "            <col ng-repeat=\"item in ::lfData.templateOption.obrItems\"\n" +
    "                 ng-style=\"{'width': '{{::item.formatting.width}}',\n" +
    "                            'min-width': '{{::item.formatting['min-width']}}'}\">\n" +
    "          </colgroup>\n" +
    "          <thead>\n" +
    "          <tr>\n" +
    "            <th class=\"fieldsTableHeader\" ng-repeat=\"item in ::lfData.templateOption.obrItems\">{{::item.question}}</th>\n" +
    "          </tr>\n" +
    "          </thead>\n" +
    "          <tbody>\n" +
    "          <tr class=\"repeatingLine\">\n" +
    "            <td class=\"rowEditText hasTooltip\" ng-repeat=\"item in lfData.templateOption.obrItems\" ng-switch on=\"item.dataType\">\n" +
    "              <ng-form name=\"innerForm\">\n" +
    "                  <div class=\"cellData tooltipContainer\">\n" +
    "                    <span class=\"tooltipContent\" ng-include=\"'validation.html'\"></span>  <!-- validation error messages -->\n" +
    "                    <input ng-switch-when=\"CWE\" name=\"{{::item.question}}\"\n" +
    "                     ng-required=\"::isAnswerRequired(item)\" placeholder=\"Select or type a value\"\n" +
    "                     ng-model-options=\"{updateOn: 'change'}\" ng-model=\"item._value\"\n" +
    "                     phr-autocomplete=\"::phrAutocompOpt(item)\" ng-readonly=\"::isReadOnly(item)\">\n" +
    "                    <input ng-switch-when=\"DT\" name=\"{{::item.question}}\"  ng-required=\"::isAnswerRequired(item)\" ng-model-options=\"{ updateOn: 'default' }\" ng-model=\"item._value\" lf-date=\"::dateOptions\" placeholder=\"MM/DD/YYYY\" ng-readonly=\"::isReadOnly(item)\">\n" +
    "                    <input ng-switch-default name=\"{{::item.question}}\" ng-required=\"::isAnswerRequired(item)\" ng-model-options=\"{ updateOn: 'default' }\" ng-model=\"item._value\" placeholder=\"Type a value\" ng-readonly=\"::isReadOnly(item)\">\n" +
    "                  </div>\n" +
    "              </ng-form>\n" +
    "            </td>\n" +
    "          </tr>\n" +
    "          <tr class=\"embeddedRow\">\n" +
    "            <td colspan=\"5\">\n" +
    "              <div>\n" +
    "                <table cellspacing=\"0\" cellpadding=\"0\" class=\"fieldsTable\">\n" +
    "                  <colgroup>\n" +
    "                    <col ng-repeat=\"obxCol in ::lfData.templateOption.obxTableColumns\"\n" +
    "                         ng-style=\"{'width': '{{::obxCol.formatting.width}}',\n" +
    "                                    'min-width': '{{::obxCol.formatting['min-width']}}'}\">\n" +
    "                  </colgroup>\n" +
    "                  <thead>\n" +
    "                  <tr>\n" +
    "                    <th class=\"fieldsTableHeader\" ng-repeat=\"obxCol in ::lfData.templateOption.obxTableColumns\">{{::obxCol.name}}</th>\n" +
    "                  </tr>\n" +
    "                  </thead>\n" +
    "                  <tbody id=\"obx_table\" class=\"fieldExpColDiv\">\n" +
    "                  <tr style=\"width: 99%\" class=\"repeatingLine {{ getSkipLogicTargetClass(item) }} {{getRowClass(item)}} {{getActiveRowClass($index)}}\" ng-repeat-start=\"item in lfData.items track by $id(item)\" ng-click=\"setActiveRow($index)\">\n" +
    "                    <td class=\"name has_treeline\">\n" +
    "                      <table class=\"t-treeline-field\" >\n" +
    "                        <tr>\n" +
    "                          <td class=\"t-treeline \" ng-class=\"getTreeLevelClass(5, $index) \"> &nbsp; </td>\n" +
    "                          <td class=\"t-treeline \" ng-class=\"getTreeLevelClass(4, $index) \"> &nbsp; </td>\n" +
    "                          <td class=\"t-treeline \" ng-class=\"getTreeLevelClass(3, $index) \"> &nbsp; </td>\n" +
    "                          <td class=\"t-treeline \" ng-class=\"getTreeLevelClass(2, $index) \"> &nbsp; </td>\n" +
    "                          <td class=\"t-treeline \" ng-class=\"getTreeLevelClass(1, $index) \"> &nbsp; </td>\n" +
    "                          <td class=\"t-treeline \" ng-class=\"getTreeLevelClass(0, $index) \"> &nbsp; </td>\n" +
    "                          <td>\n" +
    "                            <div class=\"name_label\">\n" +
    "                              <span ng-show=\"::isRepeatable(item)\" class=\"sn\">{{::getRepeatingSN(item) }}</span>\n" +
    "                              <span><label for=\"{{::item._elementId_}}\">{{::item.question}}</label></span>\n" +
    "                              <span ng-show=\"formConfig.showQuestionCode\"><a href=\"http://s.details.loinc.org/LOINC/{{ item.questionCode }}.html\" target=\"_blank\">[{{ item.questionCode }}]</a></span>\n" +
    "                              <span ng-show=\"formConfig.showCodingInstruction\" class=\"prompt\">{{ ::getCodingInstructions(item) }}</span>\n" +
    "                              <button ng-show=\"!formConfig.showCodingInstruction\" ng-if=\"::hasCodingInstructions(item)\" class=\"help-button\" bs-popover=\"::item.codingInstructions\" data-auto-close=\"true\" data-placement=\"right\"  title=\"Instruction\">?</button>\n" +
    "                              </button>\n" +
    "                            </div>\n" +
    "                          </td>\n" +
    "                        </tr>\n" +
    "                      </table>\n" +
    "                    </td>\n" +
    "                    <td class=\"button-col\">\n" +
    "                      <button ng-if=\"!hasOneRepeatingItem(item)\" class=\"float-button\"  ng-click=\"removeOneRepeatingItem(item)\" title=\"Remove this '{{ ::item.question }}'\">-</button>\n" +
    "                    </td>\n" +
    "                    <td ng-switch on=\"::getFieldType(item)\" class=\"hasTooltip\">\n" +
    "                      <ng-form name=\"innerForm2\">\n" +
    "                        <div class=\"cellData tooltipContainer\">\n" +
    "                          <span class=\"tooltipContent\" ng-include=\"'validation.html'\"></span>  <!-- validation error messages -->\n" +
    "                          <span ng-switch-when=\"\" > </span>\n" +
    "                          <input ng-switch-when=\"CNE-1\" name=\"{{::item.question +'_'+ $id}}\"\n" +
    "                           ng-required=\"::isAnswerRequired(item)\" ng-model-options=\"{updateOn: 'change'}\"\n" +
    "                           ng-model=\"item._value\" phr-autocomplete=\"::phrAutocompOpt(item)\"\n" +
    "                           ng-readonly=\"::isReadOnly(item)\" placeholder=\"Select one or more\" id=\"{{::item._elementId_}}\"></input>\n" +
    "                          <input ng-switch-when=\"REAL1\" name=\"{{::item.question}}\" type=\"number\" ng-required=\"::isAnswerRequired(item)\" ng-model-options=\"{ updateOn: 'default' }\" ng-model=\"item._value\" placeholder=\"Type a value\" ng-readonly=\"::isReadOnly(item )\" id=\"{{::item._elementId_}}\"></input>\n" +
    "                          <input ng-switch-when=\"CNE1\" name=\"{{::item.question + '_'+ $id}}\"\n" +
    "                           ng-required=\"::isAnswerRequired(item)\"\n" +
    "                           placeholder=\"Select one\" ng-model-options=\"{updateOn: 'change'}\" ng-model=\"item._value\"\n" +
    "                           phr-autocomplete=\"::phrAutocompOpt(item)\" ng-readonly=\"::isReadOnly(item)\" id=\"{{::item._elementId_}}\"></input>\n" +
    "                          <input ng-switch-when=\"DT1\" name=\"{{::item.question}}\" ng-required=\"::isAnswerRequired(item)\" ng-model-options=\"{ updateOn: 'default' }\" ng-model=\"item._value\" lf-date=\"::dateOptions\" placeholder=\"MM/DD/YYYY\" ng-readonly=\"::isReadOnly(item)\" id=\"{{::item._elementId_}}\"></input>\n" +
    "                          <input ng-switch-default name=\"{{::item.question}}\" ng-required=\"::isAnswerRequired(item)\" ng-model-options=\"{ updateOn: 'default' }\" ng-model=\"item._value\" placeholder=\"Type a value\" ng-readonly=\"::isReadOnly(item)\" id=\"{{::item._elementId_}}\"></input>\n" +
    "                        </div>\n" +
    "                      </ng-form>\n" +
    "                    </td>\n" +
    "                    <td ng-switch on=\"::checkUnits(item)\">\n" +
    "                      <input class=\"units\" ng-switch-when=\"list\" ng-model-options=\"{updateOn: 'change'}\"\n" +
    "                       ng-model=\"item._unit\" phr-autocomplete=\"phrUnitsAutocompOpt(item)\" placeholder=\"Select one\"></input>\n" +
    "                      <span ng-switch-when=\"none\" > </span>\n" +
    "                    </td>\n" +
    "                    <!--<td>{{item.range}}</td>-->\n" +
    "                  </tr>\n" +
    "                  <!-- extra question -->\n" +
    "                  <tr ng-if=\"needExtra(item)\" style=\"width: 99%\" class=\"extra-row repeatingLine {{ getSkipLogicTargetClass(item) }} {{getRowClass(item)}}\">\n" +
    "                    <td class=\"name has_treeline\">\n" +
    "                      <table class=\"t-treeline-field\" >\n" +
    "                        <tr>\n" +
    "                          <td class=\"t-treeline \" ng-class=\"getExtraRowTreeLevelClass(5, $index) \"> &nbsp; </td>\n" +
    "                          <td class=\"t-treeline \" ng-class=\"getExtraRowTreeLevelClass(4, $index) \"> &nbsp; </td>\n" +
    "                          <td class=\"t-treeline \" ng-class=\"getExtraRowTreeLevelClass(3, $index) \"> &nbsp; </td>\n" +
    "                          <td class=\"t-treeline \" ng-class=\"getExtraRowTreeLevelClass(2, $index) \"> &nbsp; </td>\n" +
    "                          <td class=\"t-treeline \" ng-class=\"getExtraRowTreeLevelClass(1, $index) \"> &nbsp; </td>\n" +
    "                          <td class=\"t-treeline \" ng-class=\"getExtraRowTreeLevelClass(0, $index) \"> &nbsp; </td>\n" +
    "                          <td>\n" +
    "                            <div class=\"name_label\">\n" +
    "                              <span>&nbsp;</span>\n" +
    "                            </div>\n" +
    "                          </td>\n" +
    "                        </tr>\n" +
    "                      </table>\n" +
    "                    </td>\n" +
    "                    <td class=\"button-col\"></td>\n" +
    "                    <td colspan=\"5\" class=\"extra-field\">\n" +
    "                      <input ng-model=\"item._valueOther\" placeholder=\"Please specify\" ng-readonly=\"::isReadOnly(item)\"></input>\n" +
    "                    </td>\n" +
    "                  </tr>\n" +
    "                  <!--a button row at the end of each repeating section-->\n" +
    "                  <tr ng-repeat-end ng-if=\"isLastItemInRepeatingItems($index)\" class=\"buttonRow repeatingLine {{ getSkipLogicTargetClass(item) }} {{getRowClass(item)}}\" >\n" +
    "                    <td colspan=\"6\" class=\"name has_treeline\" >\n" +
    "                      <table class=\"t-treeline-field\" >\n" +
    "                        <tr>\n" +
    "                          <td class=\"t-treeline \" ng-class=\"getExtraRowTreeLevelClass(5, $index) \"> &nbsp; </td>\n" +
    "                          <td class=\"t-treeline \" ng-class=\"getExtraRowTreeLevelClass(4, $index) \"> &nbsp; </td>\n" +
    "                          <td class=\"t-treeline \" ng-class=\"getExtraRowTreeLevelClass(3, $index) \"> &nbsp; </td>\n" +
    "                          <td class=\"t-treeline \" ng-class=\"getExtraRowTreeLevelClass(2, $index) \"> &nbsp; </td>\n" +
    "                          <td class=\"t-treeline \" ng-class=\"getExtraRowTreeLevelClass(1, $index) \"> &nbsp; </td>\n" +
    "                          <td class=\"t-treeline \" ng-class=\"getExtraRowTreeLevelClass(0, $index) \"> &nbsp; </td>\n" +
    "                          <td>\n" +
    "                            <div class=\"name_label\">\n" +
    "                              <button ng-repeat=\"repeatingItem in getParentRepeatingItemsOfLastItem($index)\" class=\"float-button\"  id=\"{{repeatingItem._elementId_}}\" ng-click=\"addOneRepeatingItem(repeatingItem)\" title=\"Add another '{{ ::repeatingItem.question }}'\">Add another '{{::repeatingItem.question}}'</button>\n" +
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
    "  <button ng-click=\"onclick()\">Click to debug Panel Controller</button>\n" +
    "</div>\n"
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

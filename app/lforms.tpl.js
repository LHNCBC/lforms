angular.module('lformsWidget').run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('horizontal-table.html',
    "<div class=\"t-treeline-field\">\n" +
    "  <div class=\"t-treeline-wrapper\" ng-include=\"'views/partials/tree.html'\">  <!-- tree lines -->\n" +
    "  </div>\n" +
    "  <div class=\"name_label\">\n" +
    "    <div ng-if=\"firstOneRepeatingItem(item)\" class=\"hTableTitle\">\n" +
    "      {{::item.question}}\n" +
    "    </div>\n" +
    "\n" +
    "    <table class=\"fieldsTable horizontal-table\">\n" +
    "      <colgroup>\n" +
    "        <col style=\"width:5em; min-width: 5em;\">\n" +
    "        <col ng-repeat=\"colName in getHorizontalTableColumns($index)\">\n" +
    "      </colgroup>\n" +
    "      <thead ng-if=\"firstOneRepeatingItem(item)\">\n" +
    "      <tr>\n" +
    "        <th class=\"fieldsTableHeader\"></th>\n" +
    "        <th class=\"fieldsTableHeader\" ng-repeat=\"colName in getHorizontalTableColumns($index)\">{{colName}}</th>\n" +
    "      </tr>\n" +
    "      </thead>\n" +
    "      <tbody id=\"\" class=\"\">\n" +
    "      <tr ng-repeat=\"row in getHorizontalTableRows($index)\">\n" +
    "        <td class=\"button-col\">\n" +
    "          <button ng-show=\"isRepeatable(item)\" ng-if=\"!hasOneRepeatingItem(item)\" class=\"float-button\"  ng-click=\"removeOneRepeatingItem(item)\" title=\"Remove this row of '{{ item.question }}'\">-</button>\n" +
    "          <button ng-show=\"isRepeatable(item)\" ng-if=\"lastOneRepeatingItem(item)\" class=\"float-button\"  id=\"{{item._codePath+item._idPath}}\" ng-click=\"addOneRepeatingItem(item)\" title=\"Add another row of '{{ item.question }}'\">+</button>\n" +
    "        </td>\n" +
    "\n" +
    "        <td ng-repeat=\"cell in getHorizontalTableCellsInRow(row)\" ng-switch on=\"getFieldType(cell)\" class=\"hasTooltip\">\n" +
    "          <ng-form name=\"innerForm2\">\n" +
    "            <div class=\"cellData tooltipContainer\">\n" +
    "            <span class=\"tooltipContent\">\n" +
    "              <div class=\"errorMsg errorRequired\">\"{{ cell.question }}\" requires a value.</div>\n" +
    "              <div class=\"errorMsg errorPattern\">\"{{ cell.question }}\" requires a text pattern.</div>\n" +
    "              <div class=\"errorMsg errorMax\">\"{{ cell.question }}\" requires a maximum value of ??.</div>\n" +
    "              <div class=\"errorMsg errorMin\">\"{{ cell.question }}\" requires a minimum value of ??.</div>\n" +
    "              <div class=\"errorMsg errorMaxlength\">\"{{ cell.question }}\" requires a maximum length of ??.</div>\n" +
    "              <div class=\"errorMsg errorMinlength\">\"{{ cell.question }}\" requires a minimum length of ??.</div>\n" +
    "              <div class=\"errorMsg errorURL\">\"{{ cell.question }}\" requires a url.</div>\n" +
    "              <div class=\"errorMsg errorEmail\">\"{{ cell.question }}\" requires an email.</div>\n" +
    "              <div class=\"errorMsg errorNumber\">\"{{ cell.question }}\" requires a numeric value.</div>\n" +
    "              <div class=\"errorMsg errorREAL\">\"{{ cell.question }}\" requires a decimal value.</div>\n" +
    "              <div class=\"errorMsg errorINT\">\"{{ cell.question }}\" requires a integer value.</div>\n" +
    "              <div class=\"errorMsg errorTM\">\"{{ cell.question }}\" requires a time value.</div>\n" +
    "              <div class=\"errorMsg errorDT\">\"{{ cell.question }}\" requires a date value.</div>\n" +
    "            </span>  <!-- validation error messages -->\n" +
    "              <span ng-switch-when=\"\" > </span>\n" +
    "              <div ng-switch-when=\"CNE-1\" name=\"{{cell.question}}\" ng-required=\"isAnswerRequired2(cell)\" ng-model=\"cell._value\" ui-select2=\"select2Opt(cell)\" ng-readonly=\"isReadOnly(cell)\"></div>\n" +
    "              <input ng-switch-when=\"REAL1\" name=\"{{cell.question}}\" type=\"number\" ng-required=\"isAnswerRequired(cell)\" ng-model=\"cell._value\" placeholder=\"Type a value\" ng-readonly=\"isReadOnly(cell )\">\n" +
    "              <input ng-switch-when=\"CNE1\" name=\"{{cell.question}}\" ng-required=\"isAnswerRequired(cell)\" placeholder=\"Select one\" ng-model=\"cell._value\" phr-autocomplete=\"lfListOpt(cell )\" ng-readonly=\"isReadOnly(cell)\">\n" +
    "              <input ng-switch-when=\"DT1\" name=\"{{cell.question}}\" ng-required=\"isAnswerRequired(cell)\" ng-model=\"cell._value\" lf-date=\"dateOptions\" placeholder=\"MM/DD/YYYY\" ng-readonly=\"isReadOnly(cell)\">\n" +
    "              <input ng-switch-default name=\"{{cell.question}}\" ng-required=\"isAnswerRequired(cell)\" ng-model=\"cell._value\" placeholder=\"Type a value\" ng-readonly=\"isReadOnly(cell)\">\n" +
    "            </div>\n" +
    "          </ng-form>\n" +
    "        </td>\n" +
    "      </tr>\n" +
    "      </tbody>\n" +
    "    </table>\n" +
    "  </div>\n" +
    "</div>\n"
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
    "<div ng-controller=\"PanelTableCtrl\">\n" +
    "  <form name=\"panel\" novalidate>\n" +
    "    <div class=\"panelGroup fieldGroup\" ng-if=\"lfData\" >\n" +
    "      <div class=\"stopped\" ng-show=\"isFormDone()\"><img src=\"/images/blank.gif\" class=\"stop-sign\"><span>This form is complete.</span></div>\n" +
    "      <div class=\"row\">\n" +
    "        <div class=\"col-md-3 col-xs-3\">\n" +
    "          <div class=\"checkbox\">\n" +
    "            <label><input type=\"checkbox\" value=\"\" ng-model=\"formConfig.showQuestionCode\">Display Question Code</label>\n" +
    "          </div>\n" +
    "        </div>\n" +
    "        <div class=\"col-md-3 col-xs-3\">\n" +
    "          <div class=\"checkbox\">\n" +
    "            <label><input type=\"checkbox\" value=\"\" ng-model=\"formConfig.showCodingInstruction\">Show Help/Description</label>\n" +
    "          </div>\n" +
    "        </div>\n" +
    "        <div class=\"col-md-3 col-xs-3\">\n" +
    "          <div class=\"checkbox\">\n" +
    "            <label><input type=\"checkbox\" value=\"\" ng-model=\"formConfig.useSpecialKeyNavi\">Keyboard Navigation on Data Fields Only</label>\n" +
    "          </div>\n" +
    "        </div>\n" +
    "        <div class=\"col-md-3 col-xs-3 \">\n" +
    "          <div style=\"margin: 10px\">Total # of Questions: {{lfData.items.length}}</div>\n" +
    "        </div>\n" +
    "\n" +
    "      </div>\n" +
    "\n" +
    "      <h3 class=\"groupHeader\">\n" +
    "        <span>{{::lfData.name}}</span>\n" +
    "        <span ng-if=\"formConfig.showQuestionCode\"><a tabindex=\"{{ formConfig.useSpecialKeyNavi ? '-1' : '' }}\" href=\"http://s.details.loinc.org/LOINC/{{ lfData.code }}.html\" target=\"_blank\">[{{ lfData.code }}]</a></span>\n" +
    "      </h3>\n" +
    "      <div class=\"fieldExpColDiv\">\n" +
    "        <table cellspacing=\"0\" cellpadding=\"0\" class=\"fieldsTable\">\n" +
    "          <colgroup>\n" +
    "            <col ng-repeat=\"item in ::lfData.templateOption.obrItems\" style=\"width: {{::item.formatting.width}}; min-width: {{::item.formatting['min-width']}}\">\n" +
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
    "                    <span class=\"tooltipContent\" ng-include=\"'views/partials/validation.html'\"></span>  <!-- validation error messages -->\n" +
    "                    <input ng-switch-when=\"CWE\" name=\"{{::item.question}}\" ng-required=\"::isAnswerRequired(item)\" placeholder=\"Select or type a value\" ng-model-options=\"{ updateOn: 'default' }\" ng-model=\"item._value\" phr-autocomplete=\"::lfComboOpt(item)\" ng-readonly=\"::isReadOnly(item)\">\n" +
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
    "                    <col ng-repeat=\"obxCol in ::lfData.templateOption.obxTableColumns\" style=\"width: {{::obxCol.formatting.width}}; min-width: {{::obxCol.formatting['min-width']}}\">\n" +
    "                  </colgroup>\n" +
    "                  <thead>\n" +
    "                  <tr>\n" +
    "                    <th class=\"fieldsTableHeader\" ng-repeat=\"obxCol in ::lfData.templateOption.obxTableColumns\">{{::obxCol.name}}</th>\n" +
    "                  </tr>\n" +
    "                  </thead>\n" +
    "                  <tbody id=\"obx_table\" class=\"fieldExpColDiv\">\n" +
    "                  <tr style=\"width: 99%\" class=\"repeatingLine {{ getSkipLogicTargetClass(item) }} {{getRowClass(item)}} {{getActiveRowClass($index)}}\" ng-repeat-start=\"item in lfData.items track by $id(item)\" ng-click=\"setActiveRow($index)\">\n" +
    "                    <td ng-if=\"::!inHorizontalTable($index)\" class=\"name has_treeline\">\n" +
    "                      <div class=\"t-treeline-field\">\n" +
    "                        <div class=\"t-treeline-wrapper\" ng-include=\"'views/partials/tree.html'\">  <!-- tree lines -->\n" +
    "                        </div>\n" +
    "                        <div class=\"name_label\">\n" +
    "                          <span ng-show=\"::isRepeatable(item)\" class=\"sn\">{{::getRepeatingSN(item) }}</span>\n" +
    "                          <span>{{::item.question}} </span>\n" +
    "                          <span ng-show=\"formConfig.showQuestionCode\"><a tabindex=\"{{ formConfig.useSpecialKeyNavi ? '-1' : '' }}\" href=\"http://s.details.loinc.org/LOINC/{{ item.questionCode }}.html\" target=\"_blank\">[{{ item.questionCode }}]</a></span>\n" +
    "                          <span ng-show=\"formConfig.showCodingInstruction\" class=\"prompt\">{{ ::getCodingInstructions(item) }}</span>\n" +
    "                          <button ng-show=\"!formConfig.showCodingInstruction\" ng-if=\"::hasCodingInstructions(item)\" tabindex=\"{{ formConfig.useSpecialKeyNavi ? '-1' : '' }}\" class=\"help-button\" bs-popover=\"::item.codingInstructions\" data-auto-close=\"true\" data-placement=\"right\"  title=\"Instruction\">?</button>\n" +
    "                          </button>\n" +
    "                        </div>\n" +
    "                      </div>\n" +
    "                    </td>\n" +
    "                    <td ng-if=\"::!inHorizontalTable($index)\" class=\"button-col\">\n" +
    "                      <button ng-show=\"::isRepeatable(item)\" tabindex=\"{{ formConfig.useSpecialKeyNavi ? '-1' : '' }}\" ng-if=\"::!hasOneRepeatingItem(item)\" class=\"float-button\"  ng-click=\"::removeOneRepeatingItem(item)\" title=\"Remove this'{{ ::item.question }}'\">-</button>\n" +
    "                    </td>\n" +
    "                    <td ng-if=\"::!inHorizontalTable($index)\" ng-switch on=\"::getFieldType(item)\" class=\"hasTooltip\">\n" +
    "                      <ng-form name=\"innerForm2\">\n" +
    "                        <div class=\"cellData tooltipContainer\">\n" +
    "                          <span class=\"tooltipContent\" ng-include=\"'views/partials/validation.html'\"></span>  <!-- validation error messages -->\n" +
    "                          <span ng-switch-when=\"\" > </span>\n" +
    "                          <div ng-switch-when=\"CNE-1\" name=\"{{::item.question}}\" ng-required=\"::isAnswerRequired(item)\" ng-model-options=\"{ updateOn: 'default' }\" ng-model=\"item._value\" ui-select2=\"::select2Opt(item)\" ng-readonly=\"::isReadOnly(item)\"></div>\n" +
    "                          <input ng-switch-when=\"REAL1\" name=\"{{::item.question}}\" type=\"number\" ng-required=\"::isAnswerRequired(item)\" ng-model-options=\"{ updateOn: 'default' }\" ng-model=\"item._value\" placeholder=\"Type a value\" ng-readonly=\"::isReadOnly(item )\"></input>\n" +
    "                          <input ng-switch-when=\"CNE1\" name=\"{{::item.question}}\" ng-required=\"::isAnswerRequired(item)\" placeholder=\"Select one\" ng-model-options=\"{ updateOn: 'default' }\" ng-model=\"item._value\" phr-autocomplete=\"::lfListOpt(item )\" ng-readonly=\"::isReadOnly(item)\"></input>\n" +
    "                          <input ng-switch-when=\"DT1\" name=\"{{::item.question}}\" ng-required=\"::isAnswerRequired(item)\" ng-model-options=\"{ updateOn: 'default' }\" ng-model=\"item._value\" lf-date=\"::dateOptions\" placeholder=\"MM/DD/YYYY\" ng-readonly=\"::isReadOnly(item)\"></input>\n" +
    "                          <input ng-switch-default name=\"{{::item.question}}\" ng-required=\"::isAnswerRequired(item)\" ng-model-options=\"{ updateOn: 'default' }\" ng-model=\"item._value\" placeholder=\"Type a value\" ng-readonly=\"::isReadOnly(item)\"></input>\n" +
    "                        </div>\n" +
    "                      </ng-form>\n" +
    "                    </td>\n" +
    "                    <td ng-if=\"::!inHorizontalTable($index)\" ng-switch on=\"::checkUnits(item)\">\n" +
    "                      <input class=\"units\" ng-switch-when=\"list\" ng-model-options=\"{ updateOn: 'default' }\" ng-model=\"item._unit\" phr-autocomplete=\"lfUnitsListOpt(item )\" ></input>\n" +
    "                      <span ng-switch-when=\"none\" > </span>\n" +
    "                    </td>\n" +
    "                    <!--<td ng-if=\"!inHorizontalTable($index)\">{{item.range}}</td>-->\n" +
    "                    <td ng-if=\"::isHorizontalTableTitle($index)\" class=\"horizontal has_treeline\" colspan=\"5\" ng-include=\"'views/partials/horizontal-table.html'\"></td>\n" +
    "                  </tr>\n" +
    "                  <!-- extra question -->\n" +
    "                  <tr ng-if=\"::!inHorizontalTable($index) && needExtra(item)\" style=\"width: 99%\" class=\"extra-row repeatingLine {{ getSkipLogicTargetClass(item) }} {{getRowClass(item)}}\">\n" +
    "                    <td class=\"name has_treeline\">\n" +
    "                      <div class=\"t-treeline-field\">\n" +
    "                        <div class=\"t-treeline-wrapper\" ng-include=\"'views/partials/tree-extra.html'\">  <!-- tree lines -->\n" +
    "                        </div>\n" +
    "                        <div class=\"name_label\">\n" +
    "                          <span>&nbsp;</span>\n" +
    "                        </div>\n" +
    "                      </div>\n" +
    "                    </td>\n" +
    "                    <td class=\"button-col\"></td>\n" +
    "                    <td colspan=\"5\" class=\"extra-field\">\n" +
    "                      <input ng-model=\"item._valueOther\" placeholder=\"Please specify\" ng-readonly=\"::isReadOnly(item)\"></input>\n" +
    "                    </td>\n" +
    "                  </tr>\n" +
    "                  <!--a button row at the end of each repeating section-->\n" +
    "                  <tr ng-repeat-end ng-if=\"isLastItemInRepeatingItems($index)\" class=\"buttonRow repeatingLine {{ getSkipLogicTargetClass(item) }} {{getRowClass(item)}}\" >\n" +
    "                    <td colspan=\"6\" class=\"name has_treeline\" >\n" +
    "                      <div class=\"t-treeline-field\">\n" +
    "                        <div class=\"t-treeline-wrapper\" ng-include=\"'views/partials/tree-extra.html'\">  <!-- tree lines -->\n" +
    "                        </div>\n" +
    "                        <div class=\"name_label\">\n" +
    "                          <button tabindex=\"{{ formConfig.useSpecialKeyNavi ? '-1' : '' }}\" ng-repeat=\"repeatingItem in getParentRepeatingItemsOfLastItem($index)\" class=\"float-button\"  id=\"{{::repeatingItem._codePath+repeatingItem._idPath}}\" ng-click=\"::addOneRepeatingItem(repeatingItem)\" title=\"Add another '{{ ::repeatingItem.question }}'\">Add another '{{::repeatingItem.question}}'</button>\n" +
    "                        </div>\n" +
    "                      </div>\n" +
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
    "</div>\n"
  );


  $templateCache.put('panel-table-v-flat.html',
    "<div ng-controller=\"PanelTableCtrl\">\n" +
    "  <form name=\"panel\" novalidate>\n" +
    "    <div class=\"panelGroup fieldGroup\" ng-if=\"lfData\" >\n" +
    "      <div class=\"row\">\n" +
    "        <div class=\"col-md-3 col-xs-3\">\n" +
    "          <div class=\"checkbox\">\n" +
    "            <label><input type=\"checkbox\" value=\"\" ng-model=\"formConfig.showQuestionCode\">Display Question Code</label>\n" +
    "          </div>\n" +
    "        </div>\n" +
    "        <div class=\"col-md-3 col-xs-3\">\n" +
    "          <div class=\"checkbox\">\n" +
    "            <label><input type=\"checkbox\" value=\"\" ng-model=\"formConfig.showCodingInstruction\">Show Help/Description</label>\n" +
    "          </div>\n" +
    "        </div>\n" +
    "        <div class=\"col-md-3 col-xs-3\">\n" +
    "          <div class=\"checkbox\">\n" +
    "            <label><input type=\"checkbox\" value=\"\" ng-model=\"formConfig.useSpecialKeyNavi\">Keyboard Navigation on Data Fields Only</label>\n" +
    "          </div>\n" +
    "        </div>\n" +
    "        <div class=\"col-md-3 col-xs-3 \">\n" +
    "          <div style=\"margin: 10px\">Total # of Questions: {{lfData.items.length}}</div>\n" +
    "        </div>\n" +
    "\n" +
    "      </div>\n" +
    "      <div class=\"stopped\" ng-show=\"isFormDone()\"><img src=\"/images/blank.gif\" class=\"stop-sign\"><span>This form is complete.</span></div>\n" +
    "      <h3 class=\"groupHeader\">\n" +
    "        <span>{{::lfData.name}}</span>\n" +
    "        <span ng-if=\"formConfig.showQuestionCode\"><a tabindex=\"{{ formConfig.useSpecialKeyNavi ? '-1' : '' }}\" href=\"http://s.details.loinc.org/LOINC/{{ lfData.code }}.html\" target=\"_blank\">[{{ lfData.code }}]</a></span>\n" +
    "      </h3>\n" +
    "      <div class=\"fieldExpColDiv\">\n" +
    "        <table cellspacing=\"0\" cellpadding=\"0\" class=\"fieldsTable\">\n" +
    "          <colgroup>\n" +
    "            <col ng-repeat=\"item in ::lfData.templateOption.obrItems\" style=\"width: {{::item.formatting.width}}; min-width: {{::item.formatting['min-width']}}\">\n" +
    "          </colgroup>\n" +
    "          <thead>\n" +
    "          <tr>\n" +
    "            <th class=\"fieldsTableHeader\" ng-repeat=\"item in ::lfData.templateOption.obrItems\">{{::item.question}}</th>\n" +
    "          </tr>\n" +
    "          </thead>\n" +
    "          <tbody>\n" +
    "          <tr class=\"repeatingLine\">\n" +
    "            <td class=\"rowEditText hasTooltip\" ng-repeat=\"item in ::lfData.templateOption.obrItems\" ng-switch on=\"::item.dataType\">\n" +
    "              <ng-form name=\"innerForm\">\n" +
    "                <div class=\"cellData tooltipContainer\">\n" +
    "                    <span class=\"tooltipContent\">\n" +
    "                      <div class=\"errorMsg errorRequired\">\"{{ ::item.question }}\" requires a value.</div>\n" +
    "                      <div class=\"errorMsg errorPattern\">\"{{ ::item.question }}\" requires a text pattern.</div>\n" +
    "                      <div class=\"errorMsg errorMax\">\"{{ ::item.question }}\" requires a maximum value of ??.</div>\n" +
    "                      <div class=\"errorMsg errorMin\">\"{{ ::item.question }}\" requires a minimum value of ??.</div>\n" +
    "                      <div class=\"errorMsg errorMaxlength\">\"{{ ::item.question }}\" requires a maximum length of ??.</div>\n" +
    "                      <div class=\"errorMsg errorMinlength\">\"{{ ::item.question }}\" requires a minimum length of ??.</div>\n" +
    "                      <div class=\"errorMsg errorURL\">\"{{ ::item.question }}\" requires a url.</div>\n" +
    "                      <div class=\"errorMsg errorEmail\">\"{{ ::item.question }}\" requires an email.</div>\n" +
    "                      <div class=\"errorMsg errorNumber\">\"{{ ::item.question }}\" requires a numeric value.</div>\n" +
    "                      <div class=\"errorMsg errorREAL\">\"{{ ::item.question }}\" requires a decimal value.</div>\n" +
    "                      <div class=\"errorMsg errorINT\">\"{{ ::item.question }}\" requires a integer value.</div>\n" +
    "                      <div class=\"errorMsg errorTM\">\"{{ ::item.question }}\" requires a time value.</div>\n" +
    "                      <div class=\"errorMsg errorDT\">\"{{ ::item.question }}\" requires a date value.</div>\n" +
    "                    </span>  <!-- validation error messages -->\n" +
    "                  <input ng-switch-when=\"CWE\" name=\"{{::item.question}}\" ng-required=\"::isAnswerRequired(item)\" placeholder=\"Select or type a value\" ng-model-options=\"{ updateOn: 'default' }\" ng-model=\"item._value\" phr-autocomplete=\"::lfComboOpt(item)\" ng-readonly=\"::isReadOnly(item)\">\n" +
    "                  <input ng-switch-when=\"DT\" name=\"{{::item.question}}\"  ng-required=\"::isAnswerRequired(item)\" ng-model-options=\"{ updateOn: 'default' }\" ng-model=\"item._value\" lf-date=\"::dateOptions\" placeholder=\"MM/DD/YYYY\" ng-readonly=\"::isReadOnly(item)\">\n" +
    "                  <input ng-switch-default name=\"{{::item.question}}\" ng-required=\"::isAnswerRequired(item)\" ng-model-options=\"{ updateOn: 'default' }\" ng-model=\"item._value\" placeholder=\"Type a value\" ng-readonly=\"::isReadOnly(item)\">\n" +
    "                </div>\n" +
    "              </ng-form>\n" +
    "            </td>\n" +
    "          </tr>\n" +
    "          <tr class=\"embeddedRow\">\n" +
    "            <td colspan=\"5\">\n" +
    "              <div>\n" +
    "                <table cellspacing=\"0\" cellpadding=\"0\" class=\"fieldsTable\">\n" +
    "                  <colgroup>\n" +
    "                    <col ng-repeat=\"obxCol in ::lfData.templateOption.obxTableColumns\" style=\"width: {{::obxCol.formatting.width}}; min-width: {{::obxCol.formatting['min-width']}}\">\n" +
    "                  </colgroup>\n" +
    "                  <thead>\n" +
    "                  <tr>\n" +
    "                    <th class=\"fieldsTableHeader\" ng-repeat=\"obxCol in ::lfData.templateOption.obxTableColumns\">{{::obxCol.name}}</th>\n" +
    "                  </tr>\n" +
    "                  </thead>\n" +
    "                  <tbody id=\"obx_table\" class=\"fieldExpColDiv\">\n" +
    "                  <tr style=\"width: 99%\" class=\"repeatingLine {{ getSkipLogicTargetClass(item) }} {{getRowClass(item)}} {{getActiveRowClass($index)}}\" ng-repeat-start=\"item in lfData.items track by $id(item)\" ng-click=\"setActiveRow($index)\">\n" +
    "                    <td class=\"name has_treeline\">\n" +
    "                      <div class=\"t-treeline-field\">\n" +
    "                        <div class=\"t-treeline-wrapper\">  <!-- tree lines -->\n" +
    "                          <div class=\"t-treeline t-level-5 {{ getTreeLevelClass(5, $index) }}\"> &nbsp; </div>\n" +
    "                          <div class=\"t-treeline t-level-4 {{ getTreeLevelClass(4, $index) }}\"> &nbsp; </div>\n" +
    "                          <div class=\"t-treeline t-level-3 {{ getTreeLevelClass(3, $index) }}\"> &nbsp; </div>\n" +
    "                          <div class=\"t-treeline t-level-2 {{ getTreeLevelClass(2, $index) }}\"> &nbsp; </div>\n" +
    "                          <div class=\"t-treeline t-level-1 {{ getTreeLevelClass(1, $index) }}\"> &nbsp; </div>\n" +
    "                          <div class=\"t-treeline t-level-0 {{ getTreeLevelClass(0, $index) }}\"> &nbsp; </div>\n" +
    "                        </div>\n" +
    "                        <div class=\"name_label\">\n" +
    "                          <span ng-show=\"::isRepeatable(item)\" class=\"sn\">{{::getRepeatingSN(item) }}</span>\n" +
    "                          <span>{{::item.question}} </span>\n" +
    "                          <span ng-show=\"formConfig.showQuestionCode\"><a tabindex=\"{{ formConfig.useSpecialKeyNavi ? '-1' : '' }}\" href=\"http://s.details.loinc.org/LOINC/{{ item.questionCode }}.html\" target=\"_blank\">[{{ item.questionCode }}]</a></span>\n" +
    "                          <span ng-show=\"formConfig.showCodingInstruction\" class=\"prompt\">{{ ::getCodingInstructions(item) }}</span>\n" +
    "                          <button ng-show=\"!formConfig.showCodingInstruction\" ng-if=\"::hasCodingInstructions(item)\" tabindex=\"{{ formConfig.useSpecialKeyNavi ? '-1' : '' }}\" class=\"help-button\" bs-popover=\"::item.codingInstructions\" data-auto-close=\"true\" data-placement=\"right\"  title=\"Instruction\">?</button>\n" +
    "                          <!--<button type=\"button\" class=\"btn btn-lg btn-primary\" bs-popover=\"test\">popover-->\n" +
    "                          </button>\n" +
    "\n" +
    "                        </div>\n" +
    "                      </div>\n" +
    "                    </td>\n" +
    "                    <td class=\"button-col\">\n" +
    "                      <button ng-show=\"::isRepeatable(item)\" tabindex=\"{{ formConfig.useSpecialKeyNavi ? '-1' : '' }}\" ng-if=\"::!hasOneRepeatingItem(item)\" class=\"float-button\"  ng-click=\"::removeOneRepeatingItem(item)\" title=\"Remove this'{{ ::item.question }}'\">-</button>\n" +
    "                      <!--<button ng-show=\"isRepeatable(item)\" ng-if=\"lastOneRepeatingItem(item)\" class=\"float-button\"  id=\"{{item._codePath+item._idPath}}\" ng-click=\"addOneRepeatingItem(item)\" title=\"Add another'{{ item.question }}'\">+</button>-->\n" +
    "                    </td>\n" +
    "                    <td ng-switch on=\"::getFieldType(item)\" class=\"hasTooltip\">\n" +
    "                      <ng-form name=\"innerForm2\">\n" +
    "                        <div class=\"cellData tooltipContainer\">\n" +
    "                          <span class=\"tooltipContent\">\n" +
    "                            <div class=\"errorMsg errorRequired\">\"{{ ::item.question }}\" requires a value.</div>\n" +
    "                            <div class=\"errorMsg errorPattern\">\"{{ ::item.question }}\" requires a text pattern.</div>\n" +
    "                            <div class=\"errorMsg errorMax\">\"{{ ::item.question }}\" requires a maximum value of ??.</div>\n" +
    "                            <div class=\"errorMsg errorMin\">\"{{ ::item.question }}\" requires a minimum value of ??.</div>\n" +
    "                            <div class=\"errorMsg errorMaxlength\">\"{{ ::item.question }}\" requires a maximum length of ??.</div>\n" +
    "                            <div class=\"errorMsg errorMinlength\">\"{{ ::item.question }}\" requires a minimum length of ??.</div>\n" +
    "                            <div class=\"errorMsg errorURL\">\"{{ ::item.question }}\" requires a url.</div>\n" +
    "                            <div class=\"errorMsg errorEmail\">\"{{ ::item.question }}\" requires an email.</div>\n" +
    "                            <div class=\"errorMsg errorNumber\">\"{{ ::item.question }}\" requires a numeric value.</div>\n" +
    "                            <div class=\"errorMsg errorREAL\">\"{{ ::item.question }}\" requires a decimal value.</div>\n" +
    "                            <div class=\"errorMsg errorINT\">\"{{ ::item.question }}\" requires a integer value.</div>\n" +
    "                            <div class=\"errorMsg errorTM\">\"{{ ::item.question }}\" requires a time value.</div>\n" +
    "                            <div class=\"errorMsg errorDT\">\"{{ ::item.question }}\" requires a date value.</div>\n" +
    "                          </span>  <!-- validation error messages -->\n" +
    "                          <span ng-switch-when=\"\" > </span>\n" +
    "                          <div ng-switch-when=\"CNE-1\" name=\"{{::item.question}}\" ng-required=\"::isAnswerRequired(item)\" ng-model-options=\"{ updateOn: 'default' }\" ng-model=\"item._value\" ui-select2=\"::select2Opt(item)\" ng-readonly=\"::isReadOnly(item)\"></div>\n" +
    "                          <input ng-switch-when=\"REAL1\" name=\"{{::item.question}}\" type=\"number\" ng-required=\"::isAnswerRequired(item)\" ng-model-options=\"{ updateOn: 'default' }\" ng-model=\"item._value\" placeholder=\"Type a value\" ng-readonly=\"::isReadOnly(item )\"></input>\n" +
    "                          <input ng-switch-when=\"CNE1\" name=\"{{::item.question}}\" ng-required=\"::isAnswerRequired(item)\" placeholder=\"Select one\" ng-model-options=\"{ updateOn: 'default' }\" ng-model=\"item._value\" phr-autocomplete=\"::lfListOpt(item )\" ng-readonly=\"::isReadOnly(item)\"></input>\n" +
    "                          <input ng-switch-when=\"DT1\" name=\"{{::item.question}}\" ng-required=\"::isAnswerRequired(item)\" ng-model-options=\"{ updateOn: 'default' }\" ng-model=\"item._value\" lf-date=\"::dateOptions\" placeholder=\"MM/DD/YYYY\" ng-readonly=\"::isReadOnly(item)\"></input>\n" +
    "                          <input ng-switch-default name=\"{{::item.question}}\" ng-required=\"::isAnswerRequired(item)\" ng-model-options=\"{ updateOn: 'default' }\" ng-model=\"item._value\" placeholder=\"Type a value\" ng-readonly=\"::isReadOnly(item)\"></input>\n" +
    "                        </div>\n" +
    "                      </ng-form>\n" +
    "                    </td>\n" +
    "                    <td ng-switch on=\"checkUnits(item)\">\n" +
    "                      <input class=\"units\" ng-switch-when=\"list\" ng-model-options=\"{ updateOn: 'default' }\" ng-model=\"item._unit\" phr-autocomplete=\"lfUnitsListOpt(item )\" ></input>\n" +
    "                      <span ng-switch-when=\"none\" > </span>\n" +
    "                    </td>\n" +
    "                    <!--<td>{{::item.range}}</td>-->\n" +
    "                  </tr>\n" +
    "                  <!--a button row at the end of each repeating section-->\n" +
    "                  <tr ng-if=\"isLastItemInRepeatingItems($index)\" class=\"buttonRow repeatingLine {{ getSkipLogicTargetClass(item) }} {{getRowClass(item)}}\" >\n" +
    "                    <td colspan=\"6\" class=\"name has_treeline\" >\n" +
    "                      <div class=\"t-treeline-field\">\n" +
    "                        <div class=\"t-treeline-wrapper\">  <!-- tree lines -->\n" +
    "                          <div class=\"t-treeline t-level-5 {{ getExtraRowTreeLevelClass(5, $index) }}\"> &nbsp; </div>\n" +
    "                          <div class=\"t-treeline t-level-4 {{ getExtraRowTreeLevelClass(4, $index) }}\"> &nbsp; </div>\n" +
    "                          <div class=\"t-treeline t-level-3 {{ getExtraRowTreeLevelClass(3, $index) }}\"> &nbsp; </div>\n" +
    "                          <div class=\"t-treeline t-level-2 {{ getExtraRowTreeLevelClass(2, $index) }}\"> &nbsp; </div>\n" +
    "                          <div class=\"t-treeline t-level-1 {{ getExtraRowTreeLevelClass(1, $index) }}\"> &nbsp; </div>\n" +
    "                          <div class=\"t-treeline t-level-0 {{ getExtraRowTreeLevelClass(0, $index) }}\"> &nbsp; </div>\n" +
    "                        </div>\n" +
    "                        <div class=\"name_label\">\n" +
    "                          <button tabindex=\"{{ formConfig.useSpecialKeyNavi ? '-1' : '' }}\" ng-repeat=\"repeatingItem in getParentRepeatingItemsOfLastItem($index)\" class=\"float-button\"  id=\"{{::repeatingItem._codePath+repeatingItem._idPath}}\" ng-click=\"::addOneRepeatingItem(repeatingItem)\" title=\"Add another '{{ ::repeatingItem.question }}'\">Add another '{{::repeatingItem.question}}'</button>\n" +
    "                        </div>\n" +
    "                      </div>\n" +
    "                    </td>\n" +
    "\n" +
    "                  </tr>\n" +
    "\n" +
    "                  <tr ng-repeat-end ng-if=\"needExtra(item)\" style=\"width: 99%\" class=\"extra-row repeatingLine {{ getSkipLogicTargetClass(item) }} {{getRowClass(item)}}\">\n" +
    "                    <td class=\"name has_treeline\">\n" +
    "                      <div class=\"t-treeline-field\">\n" +
    "                        <div class=\"t-treeline-wrapper\">  <!-- tree lines -->\n" +
    "                          <div class=\"t-treeline t-level-5 {{ getExtraRowTreeLevelClass(5, $index) }}\"> &nbsp; </div>\n" +
    "                          <div class=\"t-treeline t-level-4 {{ getExtraRowTreeLevelClass(4, $index) }}\"> &nbsp; </div>\n" +
    "                          <div class=\"t-treeline t-level-3 {{ getExtraRowTreeLevelClass(3, $index) }}\"> &nbsp; </div>\n" +
    "                          <div class=\"t-treeline t-level-2 {{ getExtraRowTreeLevelClass(2, $index) }}\"> &nbsp; </div>\n" +
    "                          <div class=\"t-treeline t-level-1 {{ getExtraRowTreeLevelClass(1, $index) }}\"> &nbsp; </div>\n" +
    "                          <div class=\"t-treeline t-level-0 {{ getExtraRowTreeLevelClass(0, $index) }}\"> &nbsp; </div>\n" +
    "                        </div>\n" +
    "                        <div class=\"name_label\">\n" +
    "                          <span>&nbsp;</span>\n" +
    "                        </div>\n" +
    "                      </div>\n" +
    "\n" +
    "                    </td>\n" +
    "                    <td class=\"button-col\"></td>\n" +
    "                    <td colspan=\"5\" class=\"extra-field\">\n" +
    "                      <input ng-model=\"item._valueOther\" placeholder=\"Please specify\" ng-readonly=\"::isReadOnly(item)\"></input>\n" +
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
    "\n" +
    "  </form>\n" +
    "\n" +
    "  <!--<button class=\"btn btn-primary\" ng-click=\"resetPanelWidgetData()\">Update</button>-->\n" +
    "\n" +
    "  <!--<button ng-click=\"onclick()\">Click to debug Panel Controller</button>-->\n" +
    "</div>\n"
  );


  $templateCache.put('panel-table-v.html',
    "<div ng-controller=\"PanelTableCtrl\">\n" +
    "  <form name=\"panel\" novalidate>\n" +
    "    <div class=\"panelGroup fieldGroup\" ng-if=\"lfData\" >\n" +
    "      <div class=\"stopped\" ng-show=\"isFormDone()\"><img src=\"/images/blank.gif\" class=\"stop-sign\"><span>This form is complete.</span></div>\n" +
    "      <div class=\"row\">\n" +
    "        <div class=\"col-md-3 col-xs-3\">\n" +
    "          <div class=\"checkbox\">\n" +
    "            <label><input type=\"checkbox\" value=\"\" ng-model=\"formConfig.showQuestionCode\">Display Question Code</label>\n" +
    "          </div>\n" +
    "        </div>\n" +
    "        <div class=\"col-md-3 col-xs-3\">\n" +
    "          <div class=\"checkbox\">\n" +
    "            <label><input type=\"checkbox\" value=\"\" ng-model=\"formConfig.showCodingInstruction\">Show Help/Description</label>\n" +
    "          </div>\n" +
    "        </div>\n" +
    "        <div class=\"col-md-3 col-xs-3\">\n" +
    "          <div class=\"checkbox\">\n" +
    "            <label><input type=\"checkbox\" value=\"\" ng-model=\"formConfig.useSpecialKeyNavi\">Keyboard Navigation on Data Fields Only</label>\n" +
    "          </div>\n" +
    "        </div>\n" +
    "        <div class=\"col-md-3 col-xs-3 \">\n" +
    "          <div style=\"margin: 10px\">Total # of Questions: {{lfData.items.length}}</div>\n" +
    "        </div>\n" +
    "      </div>\n" +
    "      <h3 class=\"groupHeader\">\n" +
    "        <span>{{::lfData.name}}</span>\n" +
    "        <span ng-if=\"formConfig.showQuestionCode\"><a tabindex=\"{{ formConfig.useSpecialKeyNavi ? '-1' : '' }}\" href=\"http://s.details.loinc.org/LOINC/{{ lfData.code }}.html\" target=\"_blank\">[{{ lfData.code }}]</a></span>\n" +
    "      </h3>\n" +
    "      <div class=\"fieldExpColDiv\">\n" +
    "        <table cellspacing=\"0\" cellpadding=\"0\" class=\"fieldsTable\">\n" +
    "          <colgroup>\n" +
    "            <col ng-repeat=\"item in ::lfData.templateOption.obrItems\" style=\"width: {{::item.formatting.width}}; min-width: {{::item.formatting['min-width']}}\">\n" +
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
    "                    <span class=\"tooltipContent\" ng-include=\"'views/partials/validation.html'\"></span>  <!-- validation error messages -->\n" +
    "                    <input ng-switch-when=\"CWE\" name=\"{{::item.question}}\" ng-required=\"::isAnswerRequired(item)\" placeholder=\"Select or type a value\" ng-model-options=\"{ updateOn: 'default' }\" ng-model=\"item._value\" phr-autocomplete=\"::lfComboOpt(item)\" ng-readonly=\"::isReadOnly(item)\">\n" +
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
    "                    <col ng-repeat=\"obxCol in ::lfData.templateOption.obxTableColumns\" style=\"width: {{::obxCol.formatting.width}}; min-width: {{::obxCol.formatting['min-width']}}\">\n" +
    "                  </colgroup>\n" +
    "                  <thead>\n" +
    "                  <tr>\n" +
    "                    <th class=\"fieldsTableHeader\" ng-repeat=\"obxCol in ::lfData.templateOption.obxTableColumns\">{{::obxCol.name}}</th>\n" +
    "                  </tr>\n" +
    "                  </thead>\n" +
    "                  <tbody id=\"obx_table\" class=\"fieldExpColDiv\">\n" +
    "                  <tr style=\"width: 99%\" class=\"repeatingLine {{ getSkipLogicTargetClass(item) }} {{getRowClass(item)}} {{getActiveRowClass($index)}}\" ng-repeat-start=\"item in lfData.items track by $id(item)\" ng-click=\"setActiveRow($index)\">\n" +
    "                    <td class=\"name has_treeline\">\n" +
    "                      <div class=\"t-treeline-field\">\n" +
    "                        <div class=\"t-treeline-wrapper\" ng-include=\"'views/partials/tree.html'\">  <!-- tree lines -->\n" +
    "                        </div>\n" +
    "                        <div class=\"name_label\">\n" +
    "                          <span ng-show=\"::isRepeatable(item)\" class=\"sn\">{{::getRepeatingSN(item) }}</span>\n" +
    "                          <span>{{::item.question}} </span>\n" +
    "                          <span ng-show=\"formConfig.showQuestionCode\"><a tabindex=\"{{ formConfig.useSpecialKeyNavi ? '-1' : '' }}\" href=\"http://s.details.loinc.org/LOINC/{{ item.questionCode }}.html\" target=\"_blank\">[{{ item.questionCode }}]</a></span>\n" +
    "                          <span ng-show=\"formConfig.showCodingInstruction\" class=\"prompt\">{{ ::getCodingInstructions(item) }}</span>\n" +
    "                          <button ng-show=\"!formConfig.showCodingInstruction\" ng-if=\"::hasCodingInstructions(item)\" tabindex=\"{{ formConfig.useSpecialKeyNavi ? '-1' : '' }}\" class=\"help-button\" bs-popover=\"::item.codingInstructions\" data-auto-close=\"true\" data-placement=\"right\"  title=\"Instruction\">?</button>\n" +
    "                          </button>\n" +
    "                        </div>\n" +
    "                      </div>\n" +
    "                    </td>\n" +
    "                    <td class=\"button-col\">\n" +
    "                      <button ng-show=\"::isRepeatable(item)\" tabindex=\"{{ formConfig.useSpecialKeyNavi ? '-1' : '' }}\" ng-if=\"::!hasOneRepeatingItem(item)\" class=\"float-button\"  ng-click=\"::removeOneRepeatingItem(item)\" title=\"Remove this'{{ ::item.question }}'\">-</button>\n" +
    "                    </td>\n" +
    "                    <td ng-switch on=\"::getFieldType(item)\" class=\"hasTooltip\">\n" +
    "                      <ng-form name=\"innerForm2\">\n" +
    "                        <div class=\"cellData tooltipContainer\">\n" +
    "                          <span class=\"tooltipContent\" ng-include=\"'views/partials/validation.html'\"></span>  <!-- validation error messages -->\n" +
    "                          <span ng-switch-when=\"\" > </span>\n" +
    "                          <div ng-switch-when=\"CNE-1\" name=\"{{::item.question}}\" ng-required=\"::isAnswerRequired(item)\" ng-model-options=\"{ updateOn: 'default' }\" ng-model=\"item._value\" ui-select2=\"::select2Opt(item)\" ng-readonly=\"::isReadOnly(item)\"></div>\n" +
    "                          <input ng-switch-when=\"REAL1\" name=\"{{::item.question}}\" type=\"number\" ng-required=\"::isAnswerRequired(item)\" ng-model-options=\"{ updateOn: 'default' }\" ng-model=\"item._value\" placeholder=\"Type a value\" ng-readonly=\"::isReadOnly(item )\"></input>\n" +
    "                          <input ng-switch-when=\"CNE1\" name=\"{{::item.question}}\" ng-required=\"::isAnswerRequired(item)\" placeholder=\"Select one\" ng-model-options=\"{ updateOn: 'default' }\" ng-model=\"item._value\" phr-autocomplete=\"::lfListOpt(item )\" ng-readonly=\"::isReadOnly(item)\"></input>\n" +
    "                          <input ng-switch-when=\"DT1\" name=\"{{::item.question}}\" ng-required=\"::isAnswerRequired(item)\" ng-model-options=\"{ updateOn: 'default' }\" ng-model=\"item._value\" lf-date=\"::dateOptions\" placeholder=\"MM/DD/YYYY\" ng-readonly=\"::isReadOnly(item)\"></input>\n" +
    "                          <input ng-switch-default name=\"{{::item.question}}\" ng-required=\"::isAnswerRequired(item)\" ng-model-options=\"{ updateOn: 'default' }\" ng-model=\"item._value\" placeholder=\"Type a value\" ng-readonly=\"::isReadOnly(item)\"></input>\n" +
    "                        </div>\n" +
    "                      </ng-form>\n" +
    "                    </td>\n" +
    "                    <td ng-switch on=\"::checkUnits(item)\">\n" +
    "                      <input class=\"units\" ng-switch-when=\"list\" ng-model-options=\"{ updateOn: 'default' }\" ng-model=\"item._unit\" phr-autocomplete=\"lfUnitsListOpt(item )\" ></input>\n" +
    "                      <span ng-switch-when=\"none\" > </span>\n" +
    "                    </td>\n" +
    "                    <!--<td>{{item.range}}</td>-->\n" +
    "                  </tr>\n" +
    "                  <!-- extra question -->\n" +
    "                  <tr ng-if=\"needExtra(item)\" style=\"width: 99%\" class=\"extra-row repeatingLine {{ getSkipLogicTargetClass(item) }} {{getRowClass(item)}}\">\n" +
    "                    <td class=\"name has_treeline\">\n" +
    "                      <div class=\"t-treeline-field\">\n" +
    "                        <div class=\"t-treeline-wrapper\" ng-include=\"'views/partials/tree-extra.html'\">  <!-- tree lines -->\n" +
    "                        </div>\n" +
    "                        <div class=\"name_label\">\n" +
    "                          <span>&nbsp;</span>\n" +
    "                        </div>\n" +
    "                      </div>\n" +
    "                    </td>\n" +
    "                    <td class=\"button-col\"></td>\n" +
    "                    <td colspan=\"5\" class=\"extra-field\">\n" +
    "                      <input ng-model=\"item._valueOther\" placeholder=\"Please specify\" ng-readonly=\"::isReadOnly(item)\"></input>\n" +
    "                    </td>\n" +
    "                  </tr>\n" +
    "                  <!--a button row at the end of each repeating section-->\n" +
    "                  <tr ng-repeat-end ng-if=\"isLastItemInRepeatingItems($index)\" class=\"buttonRow repeatingLine {{ getSkipLogicTargetClass(item) }} {{getRowClass(item)}}\" >\n" +
    "                    <td colspan=\"6\" class=\"name has_treeline\" >\n" +
    "                      <div class=\"t-treeline-field\">\n" +
    "                        <div class=\"t-treeline-wrapper\" ng-include=\"'views/partials/tree-extra.html'\">  <!-- tree lines -->\n" +
    "                        </div>\n" +
    "                        <div class=\"name_label\">\n" +
    "                          <button tabindex=\"{{ formConfig.useSpecialKeyNavi ? '-1' : '' }}\" ng-repeat=\"repeatingItem in getParentRepeatingItemsOfLastItem($index)\" class=\"float-button\"  id=\"{{::repeatingItem._codePath+repeatingItem._idPath}}\" ng-click=\"::addOneRepeatingItem(repeatingItem)\" title=\"Add another '{{ ::repeatingItem.question }}'\">Add another '{{::repeatingItem.question}}'</button>\n" +
    "                        </div>\n" +
    "                      </div>\n" +
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
    "  <!--<button ng-click=\"onclick()\">Click to debug Panel Controller</button>-->\n" +
    "</div>\n"
  );


  $templateCache.put('tree-extra.html',
    "<div class=\"t-treeline t-level-5 {{ getExtraRowTreeLevelClass(5, $index) }}\"> &nbsp; </div>\n" +
    "<div class=\"t-treeline t-level-4 {{ getExtraRowTreeLevelClass(4, $index) }}\"> &nbsp; </div>\n" +
    "<div class=\"t-treeline t-level-3 {{ getExtraRowTreeLevelClass(3, $index) }}\"> &nbsp; </div>\n" +
    "<div class=\"t-treeline t-level-2 {{ getExtraRowTreeLevelClass(2, $index) }}\"> &nbsp; </div>\n" +
    "<div class=\"t-treeline t-level-1 {{ getExtraRowTreeLevelClass(1, $index) }}\"> &nbsp; </div>\n" +
    "<div class=\"t-treeline t-level-0 {{ getExtraRowTreeLevelClass(0, $index) }}\"> &nbsp; </div>\n"
  );


  $templateCache.put('tree.html',
    "<div class=\"t-treeline t-level-5 {{ getTreeLevelClass(5, $index) }}\"> &nbsp; </div>\n" +
    "<div class=\"t-treeline t-level-4 {{ getTreeLevelClass(4, $index) }}\"> &nbsp; </div>\n" +
    "<div class=\"t-treeline t-level-3 {{ getTreeLevelClass(3, $index) }}\"> &nbsp; </div>\n" +
    "<div class=\"t-treeline t-level-2 {{ getTreeLevelClass(2, $index) }}\"> &nbsp; </div>\n" +
    "<div class=\"t-treeline t-level-1 {{ getTreeLevelClass(1, $index) }}\"> &nbsp; </div>\n" +
    "<div class=\"t-treeline t-level-0 {{ getTreeLevelClass(0, $index) }}\"> &nbsp; </div>\n"
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
    "<div class=\"errorMsg errorDT\">\"{{ ::item.question }}\" requires a date value.</div>\n"
  );

}]);

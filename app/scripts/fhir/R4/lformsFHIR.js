/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _fhir_common__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);
/* harmony import */ var _diagnostic_report_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(86);
/* harmony import */ var _export_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(88);
/* harmony import */ var _sdc_export_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(90);
/* harmony import */ var _sdc_export_common_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(91);
/* harmony import */ var _sdc_import_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(92);
/* harmony import */ var _sdc_common_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(93);
/* harmony import */ var _sdc_import_common_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(95);
/* harmony import */ var _runtime_common_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(96);
/* harmony import */ var _expression_processor_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(98);
// Initializes the FHIR structure for R4
var fhirVersion = 'R4';
if (!LForms.FHIR) LForms.FHIR = {};

var fhir = LForms.FHIR[fhirVersion] = {
  LOINC_URI: _fhir_common__WEBPACK_IMPORTED_MODULE_0__["LOINC_URI"]
};
fhir.fhirpath = __webpack_require__(2);
fhir.fhirpathModel = __webpack_require__(83);

fhir.DiagnosticReport = _diagnostic_report_js__WEBPACK_IMPORTED_MODULE_1__["default"];

fhir.DiagnosticReport._commonExport = _export_js__WEBPACK_IMPORTED_MODULE_2__["default"];

fhir.SDC = _sdc_export_js__WEBPACK_IMPORTED_MODULE_3__["default"];
fhir.SDC._commonExport = _export_js__WEBPACK_IMPORTED_MODULE_2__["default"];

Object(_sdc_export_common_js__WEBPACK_IMPORTED_MODULE_4__["default"])(fhir.SDC);

Object(_sdc_import_js__WEBPACK_IMPORTED_MODULE_5__["default"])(fhir.SDC);

Object(_sdc_common_js__WEBPACK_IMPORTED_MODULE_6__["default"])(fhir.SDC);

Object(_sdc_import_common_js__WEBPACK_IMPORTED_MODULE_7__["default"])(fhir.SDC);

Object(_runtime_common_js__WEBPACK_IMPORTED_MODULE_8__["addCommonRuntimeFns"])(fhir.SDC);

fhir.SDC.ExpressionProcessor = _expression_processor_js__WEBPACK_IMPORTED_MODULE_9__["ExpressionProcessor"];
fhir.SDC.fhirVersion = fhirVersion; // Needed by lfData for fhirpath, etc.

fhir.reservedVarNames = {};
['context', 'resource'].forEach(function (name) {
  fhir.reservedVarNames[name] = true;
});

/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LOINC_URI", function() { return LOINC_URI; });
// Definitions for things needed by both importing and exporting.
var LOINC_URI = 'http://loinc.org';

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e2) { throw _e2; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e3) { didErr = true; err = _e3; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

// This is fhirpath interpreter
// everything starts at evaluate function,
// which is passed  fhirpath AST and resource.
//
// We reduce/eval recursively each node in AST
// passing the context and current data
//
// each AST node has eval function, which should be registered in evalTable
// and named after node type
// if node needs to eval father it's children it has to call `doEval` function
//
// most of nodes do function or operator invocation at the end
//
// For invocation's and operator's there is one lookup table -
// invocationTable and two helper functions doInvoke and infixInvoke for
// operators
// 1. operator or function is looked up in table
// 2. using signature (in  .arity property) unpack parameters
// 3. check params types
// 4. do call function
// 5. wrap result by util.arraify
//
// if function is nullable
// and one of parameters is empty/null - function will not be invoked and empty
// result returned
//
// Not solved problem is overloading functions by types - for example + operator defined
// for strings and numbers
// we can make dispatching params type dependent - let see
var parser = __webpack_require__(3);

var util = __webpack_require__(52);

__webpack_require__(68);

var constants = __webpack_require__(69);

var engine = {}; // the object with all FHIRPath functions and operations

var existence = __webpack_require__(70);

var filtering = __webpack_require__(71);

var aggregate = __webpack_require__(73);

var combining = __webpack_require__(74);

var misc = __webpack_require__(72);

var equality = __webpack_require__(75);

var collections = __webpack_require__(77);

var math = __webpack_require__(78);

var strings = __webpack_require__(79);

var navigation = __webpack_require__(80);

var datetime = __webpack_require__(81);

var logic = __webpack_require__(82);

var types = __webpack_require__(53);

var FP_DateTime = types.FP_DateTime,
    FP_Time = types.FP_Time,
    FP_Quantity = types.FP_Quantity,
    FP_Type = types.FP_Type,
    ResourceNode = types.ResourceNode,
    TypeInfo = types.TypeInfo;
var makeResNode = ResourceNode.makeResNode; // * fn: handler
// * arity: is index map with type signature
//   if type is in array (like [Boolean]) - this means
//   function accepts value of this type or empty value {}
// * nullable - means propagate empty result, i.e. instead
//   calling function if one of params is  empty return empty

engine.invocationTable = {
  empty: {
    fn: existence.emptyFn
  },
  not: {
    fn: existence.notFn
  },
  exists: {
    fn: existence.existsMacro,
    arity: {
      0: [],
      1: ["Expr"]
    }
  },
  all: {
    fn: existence.allMacro,
    arity: {
      1: ["Expr"]
    }
  },
  allTrue: {
    fn: existence.allTrueFn
  },
  anyTrue: {
    fn: existence.anyTrueFn
  },
  allFalse: {
    fn: existence.allFalseFn
  },
  anyFalse: {
    fn: existence.anyFalseFn
  },
  subsetOf: {
    fn: existence.subsetOfFn,
    arity: {
      1: ["AnyAtRoot"]
    }
  },
  supersetOf: {
    fn: existence.supersetOfFn,
    arity: {
      1: ["AnyAtRoot"]
    }
  },
  isDistinct: {
    fn: existence.isDistinctFn
  },
  distinct: {
    fn: existence.distinctFn
  },
  count: {
    fn: existence.countFn
  },
  where: {
    fn: filtering.whereMacro,
    arity: {
      1: ["Expr"]
    }
  },
  extension: {
    fn: filtering.extension,
    arity: {
      1: ["String"]
    }
  },
  select: {
    fn: filtering.selectMacro,
    arity: {
      1: ["Expr"]
    }
  },
  aggregate: {
    fn: aggregate.aggregateMacro,
    arity: {
      1: ["Expr"],
      2: ["Expr", "Integer"]
    }
  },
  single: {
    fn: filtering.singleFn
  },
  first: {
    fn: filtering.firstFn
  },
  last: {
    fn: filtering.lastFn
  },
  type: {
    fn: types.typeFn,
    arity: {
      0: []
    }
  },
  ofType: {
    fn: filtering.ofTypeFn,
    arity: {
      1: ["TypeSpecifier"]
    }
  },
  is: {
    fn: types.isFn,
    arity: {
      1: ["TypeSpecifier"]
    }
  },
  tail: {
    fn: filtering.tailFn
  },
  take: {
    fn: filtering.takeFn,
    arity: {
      1: ["Integer"]
    }
  },
  skip: {
    fn: filtering.skipFn,
    arity: {
      1: ["Integer"]
    }
  },
  combine: {
    fn: combining.combineFn,
    arity: {
      1: ["AnyAtRoot"]
    }
  },
  union: {
    fn: combining.union,
    arity: {
      1: ["AnyAtRoot"]
    }
  },
  iif: {
    fn: misc.iifMacro,
    arity: {
      2: ["Expr", "Expr"],
      3: ["Expr", "Expr", "Expr"]
    }
  },
  trace: {
    fn: misc.traceFn,
    arity: {
      0: [],
      1: ["String"]
    }
  },
  toInteger: {
    fn: misc.toInteger
  },
  toDecimal: {
    fn: misc.toDecimal
  },
  toString: {
    fn: misc.toString
  },
  toDateTime: {
    fn: misc.toDateTime
  },
  toTime: {
    fn: misc.toTime
  },
  toBoolean: {
    fn: misc.toBoolean
  },
  toQuantity: {
    fn: misc.toQuantity,
    arity: {
      0: [],
      1: ["String"]
    }
  },
  convertsToBoolean: {
    fn: misc.createConvertsToFn(misc.toBoolean, 'boolean')
  },
  convertsToInteger: {
    fn: misc.createConvertsToFn(misc.toInteger, 'number')
  },
  convertsToDecimal: {
    fn: misc.createConvertsToFn(misc.toDecimal, 'number')
  },
  convertsToString: {
    fn: misc.createConvertsToFn(misc.toString, 'string')
  },
  convertsToDateTime: {
    fn: misc.createConvertsToFn(misc.toDateTime, FP_DateTime)
  },
  convertsToTime: {
    fn: misc.createConvertsToFn(misc.toTime, FP_Time)
  },
  convertsToQuantity: {
    fn: misc.createConvertsToFn(misc.toQuantity, FP_Quantity)
  },
  indexOf: {
    fn: strings.indexOf,
    arity: {
      1: ["String"]
    }
  },
  substring: {
    fn: strings.substring,
    arity: {
      1: ["Integer"],
      2: ["Integer", "Integer"]
    }
  },
  startsWith: {
    fn: strings.startsWith,
    arity: {
      1: ["String"]
    }
  },
  endsWith: {
    fn: strings.endsWith,
    arity: {
      1: ["String"]
    }
  },
  contains: {
    fn: strings.containsFn,
    arity: {
      1: ["String"]
    }
  },
  upper: {
    fn: strings.upper
  },
  lower: {
    fn: strings.lower
  },
  replace: {
    fn: strings.replace,
    arity: {
      2: ["String", "String"]
    }
  },
  matches: {
    fn: strings.matches,
    arity: {
      1: ["String"]
    }
  },
  replaceMatches: {
    fn: strings.replaceMatches,
    arity: {
      2: ["String", "String"]
    }
  },
  length: {
    fn: strings.length
  },
  toChars: {
    fn: strings.toChars
  },
  abs: {
    fn: math.abs
  },
  ceiling: {
    fn: math.ceiling
  },
  exp: {
    fn: math.exp
  },
  floor: {
    fn: math.floor
  },
  ln: {
    fn: math.ln
  },
  log: {
    fn: math.log,
    arity: {
      1: ["Number"]
    },
    nullable: true
  },
  power: {
    fn: math.power,
    arity: {
      1: ["Number"]
    },
    nullable: true
  },
  round: {
    fn: math.round,
    arity: {
      1: ["Number"]
    }
  },
  sqrt: {
    fn: math.sqrt
  },
  truncate: {
    fn: math.truncate
  },
  now: {
    fn: datetime.now
  },
  today: {
    fn: datetime.today
  },
  repeat: {
    fn: filtering.repeatMacro,
    arity: {
      1: ["Expr"]
    }
  },
  children: {
    fn: navigation.children
  },
  descendants: {
    fn: navigation.descendants
  },
  "|": {
    fn: combining.union,
    arity: {
      2: ["Any", "Any"]
    }
  },
  "=": {
    fn: equality.equal,
    arity: {
      2: ["Any", "Any"]
    },
    nullable: true
  },
  "!=": {
    fn: equality.unequal,
    arity: {
      2: ["Any", "Any"]
    },
    nullable: true
  },
  "~": {
    fn: equality.equival,
    arity: {
      2: ["Any", "Any"]
    }
  },
  "!~": {
    fn: equality.unequival,
    arity: {
      2: ["Any", "Any"]
    }
  },
  "<": {
    fn: equality.lt,
    arity: {
      2: ["Any", "Any"]
    },
    nullable: true
  },
  ">": {
    fn: equality.gt,
    arity: {
      2: ["Any", "Any"]
    },
    nullable: true
  },
  "<=": {
    fn: equality.lte,
    arity: {
      2: ["Any", "Any"]
    },
    nullable: true
  },
  ">=": {
    fn: equality.gte,
    arity: {
      2: ["Any", "Any"]
    },
    nullable: true
  },
  "containsOp": {
    fn: collections.contains,
    arity: {
      2: ["Any", "Any"]
    }
  },
  "inOp": {
    fn: collections.in,
    arity: {
      2: ["Any", "Any"]
    }
  },
  "isOp": {
    fn: types.isFn,
    arity: {
      2: ["Any", "TypeSpecifier"]
    }
  },
  "&": {
    fn: math.amp,
    arity: {
      2: ["String", "String"]
    }
  },
  "+": {
    fn: math.plus,
    arity: {
      2: ["Any", "Any"]
    },
    nullable: true
  },
  "-": {
    fn: math.minus,
    arity: {
      2: ["Any", "Any"]
    },
    nullable: true
  },
  "*": {
    fn: math.mul,
    arity: {
      2: ["Number", "Number"]
    },
    nullable: true
  },
  "/": {
    fn: math.div,
    arity: {
      2: ["Number", "Number"]
    },
    nullable: true
  },
  "mod": {
    fn: math.mod,
    arity: {
      2: ["Number", "Number"]
    },
    nullable: true
  },
  "div": {
    fn: math.intdiv,
    arity: {
      2: ["Number", "Number"]
    },
    nullable: true
  },
  "or": {
    fn: logic.orOp,
    arity: {
      2: [["Boolean"], ["Boolean"]]
    }
  },
  "and": {
    fn: logic.andOp,
    arity: {
      2: [["Boolean"], ["Boolean"]]
    }
  },
  "xor": {
    fn: logic.xorOp,
    arity: {
      2: [["Boolean"], ["Boolean"]]
    }
  },
  "implies": {
    fn: logic.impliesOp,
    arity: {
      2: [["Boolean"], ["Boolean"]]
    }
  }
};

engine.InvocationExpression = function (ctx, parentData, node) {
  return node.children.reduce(function (acc, ch) {
    return engine.doEval(ctx, acc, ch);
  }, parentData);
};

engine.TermExpression = function (ctx, parentData, node) {
  if (parentData) {
    parentData = parentData.map(function (x) {
      if (x instanceof Object && x.resourceType) {
        return makeResNode(x, x.resourceType);
      }

      return x;
    });
  }

  return engine.doEval(ctx, parentData, node.children[0]);
};

engine.PolarityExpression = function (ctx, parentData, node) {
  var sign = node.terminalNodeText[0]; // either - or + per grammar

  var rtn = engine.doEval(ctx, parentData, node.children[0]);

  if (rtn.length != 1) {
    // not yet in spec, but per Bryn Rhodes
    throw new Error('Unary ' + sign + ' can only be applied to an individual number.');
  }

  if (typeof rtn[0] != 'number' || isNaN(rtn[0])) throw new Error('Unary ' + sign + ' can only be applied to a number.');
  if (sign === '-') rtn[0] = -rtn[0];
  return rtn;
};

engine.TypeSpecifier = function (ctx, parentData, node) {
  var namespace, name;
  var identifiers = node.text.split('.').map(function (i) {
    return i.replace(/(^`|`$)/g, "");
  });

  switch (identifiers.length) {
    case 2:
      var _identifiers = _slicedToArray(identifiers, 2);

      namespace = _identifiers[0];
      name = _identifiers[1];
      break;

    case 1:
      var _identifiers2 = _slicedToArray(identifiers, 1);

      name = _identifiers2[0];
      break;

    default:
      throw new Error("Expected TypeSpecifier node, got " + JSON.stringify(node));
  }

  return new TypeInfo({
    namespace: namespace,
    name: name
  });
};

engine.ExternalConstantTerm = function (ctx, parentData, node) {
  var extConstant = node.children[0];
  var identifier = extConstant.children[0];
  var varName = engine.Identifier(ctx, parentData, identifier)[0];
  var value = ctx.vars[varName];

  if (!(varName in ctx.vars)) {
    throw new Error("Attempting to access an undefined environment variable: " + varName);
  } // For convenience, we all variable values to be passed in without their array
  // wrapper.  However, when evaluating, we need to put the array back in.


  return value === undefined || value === null ? [] : value instanceof Array ? value : [value];
};

engine.LiteralTerm = function (ctx, parentData, node) {
  var term = node.children[0];

  if (term) {
    return engine.doEval(ctx, parentData, term);
  } else {
    return [node.text];
  }
};

engine.StringLiteral = function (ctx, parentData, node) {
  // Remove the beginning and ending quotes.
  var rtn = node.text.replace(/(^'|'$)/g, "");
  rtn = rtn.replace(/\\(u\d{4}|.)/g, function (match, submatch) {
    switch (match) {
      case '\\r':
        return '\r';

      case '\\n':
        return "\n";

      case '\\t':
        return '\t';

      case '\\f':
        return '\f';

      default:
        if (submatch.length > 1) return String.fromCharCode('0x' + submatch.slice(1));else return submatch;
    }
  });
  return [rtn];
};

engine.BooleanLiteral = function (ctx, parentData, node) {
  if (node.text === "true") {
    return [true];
  } else {
    return [false];
  }
};

engine.QuantityLiteral = function (ctx, parentData, node) {
  var valueNode = node.children[0];
  var value = Number(valueNode.terminalNodeText[0]);
  var unitNode = valueNode.children[0];
  var unit = unitNode.terminalNodeText[0]; // Sometimes the unit is in a child node of the child

  if (!unit && unitNode.children) unit = unitNode.children[0].terminalNodeText[0];
  return [new FP_Quantity(value, unit)];
};

engine.DateTimeLiteral = function (ctx, parentData, node) {
  var dateStr = node.text.slice(1); // Remove the @

  return [new FP_DateTime(dateStr)];
};

engine.TimeLiteral = function (ctx, parentData, node) {
  var timeStr = node.text.slice(1); // Remove the @

  return [new FP_Time(timeStr)];
};

engine.NumberLiteral = function (ctx, parentData, node) {
  return [Number(node.text)];
};

engine.Identifier = function (ctx, parentData, node) {
  return [node.text.replace(/(^`|`$)/g, "")];
};

engine.InvocationTerm = function (ctx, parentData, node) {
  return engine.doEval(ctx, parentData, node.children[0]);
};

engine.MemberInvocation = function (ctx, parentData, node) {
  var key = engine.doEval(ctx, parentData, node.children[0])[0];
  var model = ctx.model;

  if (parentData) {
    if (util.isCapitalized(key)) {
      return parentData.filter(function (x) {
        return x instanceof ResourceNode && x.path === key;
      });
    } else {
      return parentData.reduce(function (acc, res) {
        res = makeResNode(res);
        var childPath = res.path + '.' + key;

        if (model) {
          var defPath = model.pathsDefinedElsewhere[childPath];
          if (defPath) childPath = defPath;
        }

        var toAdd, _toAdd;

        var actualTypes = model && model.choiceTypePaths[childPath];

        if (actualTypes) {
          // Use actualTypes to find the field's value
          var _iterator = _createForOfIteratorHelper(actualTypes),
              _step;

          try {
            for (_iterator.s(); !(_step = _iterator.n()).done;) {
              var t = _step.value;
              var field = key + t;
              toAdd = res.data[field];

              if (toAdd !== undefined) {
                childPath = t;
                _toAdd = res.data['_' + key];
                break;
              } else {
                toAdd = res._data[key];
              }
            }
          } catch (err) {
            _iterator.e(err);
          } finally {
            _iterator.f();
          }
        } else {
          toAdd = res.data[key];

          if (toAdd !== undefined) {
            _toAdd = res.data['_' + key];
          } else {
            toAdd = res._data[key];
          }

          if (key === 'extension') {
            childPath = 'Extension';
          }
        }

        if (util.isSome(toAdd)) {
          if (Array.isArray(toAdd)) {
            acc = acc.concat(toAdd.map(function (x, i) {
              return makeResNode(x, childPath, _toAdd && _toAdd[i]);
            }));
          } else {
            acc.push(makeResNode(toAdd, childPath, _toAdd));
          }

          return acc;
        } else {
          return acc;
        }
      }, []);
    }
  } else {
    return [];
  }
};

engine.IndexerExpression = function (ctx, parentData, node) {
  var coll_node = node.children[0];
  var idx_node = node.children[1];
  var coll = engine.doEval(ctx, parentData, coll_node);
  var idx = engine.doEval(ctx, parentData, idx_node);

  if (util.isEmpty(idx)) {
    return [];
  }

  var idxNum = parseInt(idx[0]);

  if (coll && util.isSome(idxNum) && coll.length > idxNum && idxNum >= 0) {
    return [coll[idxNum]];
  } else {
    return [];
  }
};

engine.Functn = function (ctx, parentData, node) {
  return node.children.map(function (x) {
    return engine.doEval(ctx, parentData, x);
  });
};

engine.realizeParams = function (ctx, parentData, args) {
  if (args && args[0] && args[0].children) {
    return args[0].children.map(function (x) {
      return engine.doEval(ctx, parentData, x);
    });
  } else {
    return [];
  }
};

function makeParam(ctx, parentData, type, param) {
  if (type === "Expr") {
    return function (data) {
      ctx.$this = data;
      return engine.doEval(ctx, util.arraify(data), param);
    };
  }

  if (type === "AnyAtRoot") {
    ctx.$this = ctx.dataRoot;
    return engine.doEval(ctx, ctx.dataRoot, param);
  }

  if (type === "Identifier") {
    if (param.type == "TermExpression") {
      return param.text;
    } else {
      throw new Error("Expected identifier node, got " + JSON.stringify(param));
    }
  }

  if (type === "TypeSpecifier") {
    return engine.TypeSpecifier(ctx, parentData, param);
  }

  ctx.$this = parentData;
  var res = engine.doEval(ctx, parentData, param);

  if (type === "Any") {
    return res;
  }

  if (Array.isArray(type)) {
    if (res.length == 0) {
      return [];
    } else {
      type = type[0];
    }
  }

  return misc.singleton(res, type);
}

function doInvoke(ctx, fnName, data, rawParams) {
  var invoc = engine.invocationTable[fnName];
  var res;

  if (invoc) {
    if (!invoc.arity) {
      if (!rawParams) {
        res = invoc.fn.call(ctx, util.arraify(data));
        return util.arraify(res);
      } else {
        throw new Error(fnName + " expects no params");
      }
    } else {
      var paramsNumber = rawParams ? rawParams.length : 0;
      var argTypes = invoc.arity[paramsNumber];

      if (argTypes) {
        var params = [];

        for (var i = 0; i < paramsNumber; i++) {
          var tp = argTypes[i];
          var pr = rawParams[i];
          params.push(makeParam(ctx, data, tp, pr));
        }

        params.unshift(data);

        if (invoc.nullable) {
          if (params.some(isNullable)) {
            return [];
          }
        }

        res = invoc.fn.apply(ctx, params);
        return util.arraify(res);
      } else {
        console.log(fnName + " wrong arity: got " + paramsNumber);
        return [];
      }
    }
  } else {
    throw new Error("Not implemented: " + fnName);
  }
}

function isNullable(x) {
  var res = x === null || x === undefined || util.isEmpty(x);
  return res;
}

function infixInvoke(ctx, fnName, data, rawParams) {
  var invoc = engine.invocationTable[fnName];

  if (invoc && invoc.fn) {
    var paramsNumber = rawParams ? rawParams.length : 0;

    if (paramsNumber != 2) {
      throw new Error("Infix invoke should have arity 2");
    }

    var argTypes = invoc.arity[paramsNumber];

    if (argTypes) {
      var params = [];

      for (var i = 0; i < paramsNumber; i++) {
        var tp = argTypes[i];
        var pr = rawParams[i];
        params.push(makeParam(ctx, data, tp, pr));
      }

      if (invoc.nullable) {
        if (params.some(isNullable)) {
          return [];
        }
      }

      var res = invoc.fn.apply(ctx, params);
      return util.arraify(res);
    } else {
      console.log(fnName + " wrong arity: got " + paramsNumber);
      return [];
    }
  } else {
    throw new Error("Not impl " + fnName);
  }
}

engine.FunctionInvocation = function (ctx, parentData, node) {
  var args = engine.doEval(ctx, parentData, node.children[0]);
  var fnName = args[0];
  args.shift();
  var rawParams = args && args[0] && args[0].children;
  return doInvoke(ctx, fnName, parentData, rawParams);
};

engine.ParamList = function (ctx, parentData, node) {
  // we do not eval param list because sometimes it should be passed as
  // lambda/macro (for example in case of where(...)
  return node;
};

engine.UnionExpression = function (ctx, parentData, node) {
  return infixInvoke(ctx, '|', parentData, node.children);
};

engine.ThisInvocation = function (ctx) {
  return util.arraify(ctx.$this);
};

engine.TotalInvocation = function (ctx) {
  return util.arraify(ctx.$total);
};

engine.IndexInvocation = function (ctx) {
  return util.arraify(ctx.$index);
};

engine.OpExpression = function (ctx, parentData, node) {
  var op = node.terminalNodeText[0];
  return infixInvoke(ctx, op, parentData, node.children);
};

engine.AliasOpExpression = function (map) {
  return function (ctx, parentData, node) {
    var op = node.terminalNodeText[0];
    var alias = map[op];

    if (!alias) {
      throw new Error("Do not know how to alias " + op + " by " + JSON.stringify(map));
    }

    return infixInvoke(ctx, alias, parentData, node.children);
  };
};

engine.NullLiteral = function () {
  return [];
};

engine.ParenthesizedTerm = function (ctx, parentData, node) {
  return engine.doEval(ctx, parentData, node.children[0]);
};

engine.evalTable = {
  // not every evaluator is listed if they are defined on engine
  BooleanLiteral: engine.BooleanLiteral,
  EqualityExpression: engine.OpExpression,
  FunctionInvocation: engine.FunctionInvocation,
  Functn: engine.Functn,
  Identifier: engine.Identifier,
  IndexerExpression: engine.IndexerExpression,
  InequalityExpression: engine.OpExpression,
  InvocationExpression: engine.InvocationExpression,
  AdditiveExpression: engine.OpExpression,
  MultiplicativeExpression: engine.OpExpression,
  TypeExpression: engine.AliasOpExpression({
    "is": "isOp"
  }),
  MembershipExpression: engine.AliasOpExpression({
    "contains": "containsOp",
    "in": "inOp"
  }),
  NullLiteral: engine.NullLiteral,
  EntireExpression: engine.InvocationTerm,
  InvocationTerm: engine.InvocationTerm,
  LiteralTerm: engine.LiteralTerm,
  MemberInvocation: engine.MemberInvocation,
  NumberLiteral: engine.NumberLiteral,
  ParamList: engine.ParamList,
  ParenthesizedTerm: engine.ParenthesizedTerm,
  StringLiteral: engine.StringLiteral,
  TermExpression: engine.TermExpression,
  ThisInvocation: engine.ThisInvocation,
  TotalInvocation: engine.TotalInvocation,
  IndexInvocation: engine.IndexInvocation,
  UnionExpression: engine.UnionExpression,
  OrExpression: engine.OpExpression,
  ImpliesExpression: engine.OpExpression,
  AndExpression: engine.OpExpression,
  XorExpression: engine.OpExpression
};

engine.doEval = function (ctx, parentData, node) {
  var evaluator = engine.evalTable[node.type] || engine[node.type];

  if (evaluator) {
    return evaluator.call(engine, ctx, parentData, node);
  } else {
    throw new Error("No " + node.type + " evaluator ");
  }
};

var parse = function parse(path) {
  return parser.parse(path);
};
/**
 *  Applies the given parsed FHIRPath expression to the given resource,
 *  returning the result of doEval.
 * @param {(object|object[])} resource -  FHIR resource, bundle as js object or array of resources
 *  This resource will be modified by this function to add type information.
 * @param {string} parsedPath - fhirpath expression, sample 'Patient.name.given'
 * @param {object} context - a hash of variable name/value pairs.
 * @param {object} model - The "model" data object specific to a domain, e.g. R4.
 *  For example, you could pass in the result of require("fhirpath/fhir-context/r4");
 */


function applyParsedPath(resource, parsedPath, context, model) {
  constants.reset();
  var dataRoot = util.arraify(resource); // doEval takes a "ctx" object, and we store things in that as we parse, so we
  // need to put user-provided variable data in a sub-object, ctx.vars.
  // Set up default standard variables, and allow override from the variables.
  // However, we'll keep our own copy of dataRoot for internal processing.

  var vars = {
    context: resource,
    ucum: 'http://unitsofmeasure.org'
  };
  var ctx = {
    dataRoot: dataRoot,
    vars: Object.assign(vars, context),
    model: model
  };
  var rtn = engine.doEval(ctx, dataRoot, parsedPath.children[0]); // Resolve any internal "ResourceNode" instances.  Continue to let FP_Type
  // subclasses through.

  rtn = function visit(n) {
    n = util.valData(n);

    if (Array.isArray(n)) {
      for (var i = 0, len = n.length; i < len; ++i) {
        n[i] = visit(n[i]);
      }
    } else if (_typeof(n) === 'object' && !(n instanceof FP_Type)) {
      for (var _i2 = 0, _Object$keys = Object.keys(n); _i2 < _Object$keys.length; _i2++) {
        var k = _Object$keys[_i2];
        n[k] = visit(n[k]);
      }
    }

    return n;
  }(rtn);

  return rtn;
}
/**
 *  Evaluates the "path" FHIRPath expression on the given resource or part of the resource,
 *  using data from "context" for variables mentioned in the "path" expression.
 * @param {(object|object[])} fhirData -  FHIR resource, part of a resource (in this case
 *  path.base should be provided), bundle as js object or array of resources.
 *  This object/array will be modified by this function to add type information.
 * @param {string|object} path - string with fhirpath expression, sample 'Patient.name.given',
 *  or object, if fhirData represents the part of the FHIR resource:
 * @param {string} path.base - base path in resource from which fhirData was extracted
 * @param {string} path.expression - fhirpath expression relative to path.base
 * @param {object} context - a hash of variable name/value pairs.
 * @param {object} model - The "model" data object specific to a domain, e.g. R4.
 *  For example, you could pass in the result of require("fhirpath/fhir-context/r4");
 */


var evaluate = function evaluate(fhirData, path, context, model) {
  var pathIsObject = _typeof(path) === 'object';
  var resource = pathIsObject ? makeResNode(fhirData, path.base) : fhirData;
  var node = parser.parse(pathIsObject ? path.expression : path);
  return applyParsedPath(resource, node, context, model);
};
/**
 *  Returns a function that takes a resource and an optional context hash (see
 *  "evaluate"), and returns the result of evaluating the given FHIRPath
 *  expression on that resource.  The advantage of this function over "evaluate"
 *  is that if you have multiple resources, the given FHIRPath expression will
 *  only be parsed once.
 * @param path the FHIRPath expression to be parsed.
 * @param {object} model - The "model" data object specific to a domain, e.g. R4.
 *  For example, you could pass in the result of require("fhirpath/fhir-context/r4");
 */


var compile = function compile(path, model) {
  var node = parse(path);
  return function (resource, context) {
    return applyParsedPath(resource, node, context, model);
  };
};

module.exports = {
  parse: parse,
  compile: compile,
  evaluate: evaluate,
  // Might as well export the UCUM library, since we are using it.
  ucumUtils: __webpack_require__(59).UcumLhcUtils.getInstance()
};

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

var antlr4 = __webpack_require__(4);

var Lexer = __webpack_require__(49).FHIRPathLexer;

var Parser = __webpack_require__(50).FHIRPathParser;

var Listener = __webpack_require__(51).FHIRPathListener;

var ErrorListener = function ErrorListener(errors) {
  antlr4.error.ErrorListener.call(this);
  this.errors = errors;
  return this;
};

ErrorListener.prototype = Object.create(antlr4.error.ErrorListener.prototype);
ErrorListener.prototype.constructor = ErrorListener;

ErrorListener.prototype.syntaxError = function (rec, sym, line, col, msg, e) {
  this.errors.push([rec, sym, line, col, msg, e]);
};

var parse = function parse(path) {
  var chars = new antlr4.InputStream(path);
  var lexer = new Lexer(chars);
  var tokens = new antlr4.CommonTokenStream(lexer);
  var parser = new Parser(tokens);
  parser.buildParseTrees = true;
  var errors = [];
  var listener = new ErrorListener(errors);
  lexer.removeErrorListeners();
  lexer.addErrorListener(listener);
  parser.removeErrorListeners();
  parser.addErrorListener(listener);
  var tree = parser.entireExpression();

  function PathListener() {
    Listener.call(this); // inherit default listener

    return this;
  } // inherit default listener


  PathListener.prototype = Object.create(Listener.prototype);
  PathListener.prototype.constructor = PathListener;
  var ast = {};
  var node;
  var parentStack = [ast];

  var _loop = function _loop() {
    var p = _Object$keys[_i];

    if (p.startsWith("enter")) {
      PathListener.prototype[p] = function (ctx) {
        var parentNode = parentStack[parentStack.length - 1];
        var nodeType = p.slice(5); // remove "enter"

        node = {
          type: nodeType
        };
        node.text = ctx.getText();
        if (!parentNode.children) parentNode.children = [];
        parentNode.children.push(node);
        parentStack.push(node); // Also collect this node's terminal nodes, if any.  Terminal nodes are
        // not walked with the rest of the tree, but include things like "+" and
        // "-", which we need.

        node.terminalNodeText = [];

        var _iterator = _createForOfIteratorHelper(ctx.children),
            _step;

        try {
          for (_iterator.s(); !(_step = _iterator.n()).done;) {
            var c = _step.value;
            // Test for node type "TerminalNodeImpl".  Minimized code no longer
            // has the original function names, so we can't rely on
            // c.constructor.name.  It appears the TerminalNodeImpl is the only
            // node with a "symbol" property, so test for that.
            if (c.symbol) node.terminalNodeText.push(c.getText());
          }
        } catch (err) {
          _iterator.e(err);
        } finally {
          _iterator.f();
        }
      };
    } else if (p.startsWith("exit")) {
      PathListener.prototype[p] = function () {
        parentStack.pop();
      };
    }
  };

  for (var _i = 0, _Object$keys = Object.keys(Listener.prototype); _i < _Object$keys.length; _i++) {
    _loop();
  }

  var printer = new PathListener();
  antlr4.tree.ParseTreeWalker.DEFAULT.walk(printer, tree);

  if (errors.length > 0) {
    var errMsgs = [];

    for (var i = 0, len = errors.length; i < len; ++i) {
      var _err = errors[i];
      var msg = "line: " + _err[2] + "; column: " + _err[3] + "; message: " + _err[4];
      errMsgs.push(msg);
    }

    var e = new Error(errMsgs.join("\n"));
    e.errors = errors;
    throw e;
  }

  return ast;
};

module.exports = {
  parse: parse
};

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

// This is a modified version of antr4's index.js, in which
// the "require" statements of two unused classes are commented out
// to avoid introducing a dependency on Node.js' "fs" package.

/* Copyright (c) 2012-2017 The ANTLR Project. All rights reserved.
 * Use of this file is governed by the BSD 3-clause license that
 * can be found in the LICENSE.txt file in the project root.
 */
exports.atn = __webpack_require__(5);
exports.codepointat = __webpack_require__(36);
exports.dfa = __webpack_require__(37);
exports.fromcodepoint = __webpack_require__(40);
exports.tree = __webpack_require__(41);
exports.error = __webpack_require__(42);
exports.Token = __webpack_require__(9).Token; // Commented out to avoid the problem with 'fs' during the webpack build
// exports.CharStreams = require('antlr4/CharStreams').CharStreams;

exports.CommonToken = __webpack_require__(9).CommonToken;
exports.InputStream = __webpack_require__(45).InputStream; // Commented out to avoid the problem with 'fs' during the webpack build
// exports.FileStream = require('antlr4/FileStream').FileStream;

exports.CommonTokenStream = __webpack_require__(46).CommonTokenStream;
exports.Lexer = __webpack_require__(25).Lexer;
exports.Parser = __webpack_require__(48).Parser;

var pc = __webpack_require__(15);

exports.PredictionContextCache = pc.PredictionContextCache;
exports.ParserRuleContext = __webpack_require__(19).ParserRuleContext;
exports.Interval = __webpack_require__(13).Interval;
exports.Utils = __webpack_require__(8);

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

/* Copyright (c) 2012-2017 The ANTLR Project. All rights reserved.
 * Use of this file is governed by the BSD 3-clause license that
 * can be found in the LICENSE.txt file in the project root.
 */
exports.ATN = __webpack_require__(6).ATN;
exports.ATNDeserializer = __webpack_require__(20).ATNDeserializer;
exports.LexerATNSimulator = __webpack_require__(24).LexerATNSimulator;
exports.ParserATNSimulator = __webpack_require__(34).ParserATNSimulator;
exports.PredictionMode = __webpack_require__(35).PredictionMode;

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

/* Copyright (c) 2012-2017 The ANTLR Project. All rights reserved.
 * Use of this file is governed by the BSD 3-clause license that
 * can be found in the LICENSE.txt file in the project root.
 */
var LL1Analyzer = __webpack_require__(7).LL1Analyzer;

var IntervalSet = __webpack_require__(13).IntervalSet;

function ATN(grammarType, maxTokenType) {
  // Used for runtime deserialization of ATNs from strings///
  // The type of the ATN.
  this.grammarType = grammarType; // The maximum value for any symbol recognized by a transition in the ATN.

  this.maxTokenType = maxTokenType;
  this.states = []; // Each subrule/rule is a decision point and we must track them so we
  //  can go back later and build DFA predictors for them.  This includes
  //  all the rules, subrules, optional blocks, ()+, ()* etc...

  this.decisionToState = []; // Maps from rule index to starting state number.

  this.ruleToStartState = []; // Maps from rule index to stop state number.

  this.ruleToStopState = null;
  this.modeNameToStartState = {}; // For lexer ATNs, this maps the rule index to the resulting token type.
  // For parser ATNs, this maps the rule index to the generated bypass token
  // type if the
  // {@link ATNDeserializationOptions//isGenerateRuleBypassTransitions}
  // deserialization option was specified; otherwise, this is {@code null}.

  this.ruleToTokenType = null; // For lexer ATNs, this is an array of {@link LexerAction} objects which may
  // be referenced by action transitions in the ATN.

  this.lexerActions = null;
  this.modeToStartState = [];
  return this;
} // Compute the set of valid tokens that can occur starting in state {@code s}.
//  If {@code ctx} is null, the set of tokens will not include what can follow
//  the rule surrounding {@code s}. In other words, the set will be
//  restricted to tokens reachable staying within {@code s}'s rule.


ATN.prototype.nextTokensInContext = function (s, ctx) {
  var anal = new LL1Analyzer(this);
  return anal.LOOK(s, null, ctx);
}; // Compute the set of valid tokens that can occur starting in {@code s} and
// staying in same rule. {@link Token//EPSILON} is in set if we reach end of
// rule.


ATN.prototype.nextTokensNoContext = function (s) {
  if (s.nextTokenWithinRule !== null) {
    return s.nextTokenWithinRule;
  }

  s.nextTokenWithinRule = this.nextTokensInContext(s, null);
  s.nextTokenWithinRule.readOnly = true;
  return s.nextTokenWithinRule;
};

ATN.prototype.nextTokens = function (s, ctx) {
  if (ctx === undefined) {
    return this.nextTokensNoContext(s);
  } else {
    return this.nextTokensInContext(s, ctx);
  }
};

ATN.prototype.addState = function (state) {
  if (state !== null) {
    state.atn = this;
    state.stateNumber = this.states.length;
  }

  this.states.push(state);
};

ATN.prototype.removeState = function (state) {
  this.states[state.stateNumber] = null; // just free mem, don't shift states in list
};

ATN.prototype.defineDecisionState = function (s) {
  this.decisionToState.push(s);
  s.decision = this.decisionToState.length - 1;
  return s.decision;
};

ATN.prototype.getDecisionState = function (decision) {
  if (this.decisionToState.length === 0) {
    return null;
  } else {
    return this.decisionToState[decision];
  }
}; // Computes the set of input symbols which could follow ATN state number
// {@code stateNumber} in the specified full {@code context}. This method
// considers the complete parser context, but does not evaluate semantic
// predicates (i.e. all predicates encountered during the calculation are
// assumed true). If a path in the ATN exists from the starting state to the
// {@link RuleStopState} of the outermost context without matching any
// symbols, {@link Token//EOF} is added to the returned set.
//
// <p>If {@code context} is {@code null}, it is treated as
// {@link ParserRuleContext//EMPTY}.</p>
//
// @param stateNumber the ATN state number
// @param context the full parse context
// @return The set of potentially valid input symbols which could follow the
// specified state in the specified context.
// @throws IllegalArgumentException if the ATN does not contain a state with
// number {@code stateNumber}


var Token = __webpack_require__(9).Token;

ATN.prototype.getExpectedTokens = function (stateNumber, ctx) {
  if (stateNumber < 0 || stateNumber >= this.states.length) {
    throw "Invalid state number.";
  }

  var s = this.states[stateNumber];
  var following = this.nextTokens(s);

  if (!following.contains(Token.EPSILON)) {
    return following;
  }

  var expected = new IntervalSet();
  expected.addSet(following);
  expected.removeOne(Token.EPSILON);

  while (ctx !== null && ctx.invokingState >= 0 && following.contains(Token.EPSILON)) {
    var invokingState = this.states[ctx.invokingState];
    var rt = invokingState.transitions[0];
    following = this.nextTokens(rt.followState);
    expected.addSet(following);
    expected.removeOne(Token.EPSILON);
    ctx = ctx.parentCtx;
  }

  if (following.contains(Token.EPSILON)) {
    expected.addOne(Token.EOF);
  }

  return expected;
};

ATN.INVALID_ALT_NUMBER = 0;
exports.ATN = ATN;

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

//

/* Copyright (c) 2012-2017 The ANTLR Project. All rights reserved.
 * Use of this file is governed by the BSD 3-clause license that
 * can be found in the LICENSE.txt file in the project root.
 */
///
var Set = __webpack_require__(8).Set;

var BitSet = __webpack_require__(8).BitSet;

var Token = __webpack_require__(9).Token;

var ATNConfig = __webpack_require__(10).ATNConfig;

var Interval = __webpack_require__(13).Interval;

var IntervalSet = __webpack_require__(13).IntervalSet;

var RuleStopState = __webpack_require__(11).RuleStopState;

var RuleTransition = __webpack_require__(14).RuleTransition;

var NotSetTransition = __webpack_require__(14).NotSetTransition;

var WildcardTransition = __webpack_require__(14).WildcardTransition;

var AbstractPredicateTransition = __webpack_require__(14).AbstractPredicateTransition;

var pc = __webpack_require__(15);

var predictionContextFromRuleContext = pc.predictionContextFromRuleContext;
var PredictionContext = pc.PredictionContext;
var SingletonPredictionContext = pc.SingletonPredictionContext;

function LL1Analyzer(atn) {
  this.atn = atn;
} //* Special value added to the lookahead sets to indicate that we hit
//  a predicate during analysis if {@code seeThruPreds==false}.
///


LL1Analyzer.HIT_PRED = Token.INVALID_TYPE; //*
// Calculates the SLL(1) expected lookahead set for each outgoing transition
// of an {@link ATNState}. The returned array has one element for each
// outgoing transition in {@code s}. If the closure from transition
// <em>i</em> leads to a semantic predicate before matching a symbol, the
// element at index <em>i</em> of the result will be {@code null}.
//
// @param s the ATN state
// @return the expected symbols for each outgoing transition of {@code s}.
///

LL1Analyzer.prototype.getDecisionLookahead = function (s) {
  if (s === null) {
    return null;
  }

  var count = s.transitions.length;
  var look = [];

  for (var alt = 0; alt < count; alt++) {
    look[alt] = new IntervalSet();
    var lookBusy = new Set();
    var seeThruPreds = false; // fail to get lookahead upon pred

    this._LOOK(s.transition(alt).target, null, PredictionContext.EMPTY, look[alt], lookBusy, new BitSet(), seeThruPreds, false); // Wipe out lookahead for this alternative if we found nothing
    // or we had a predicate when we !seeThruPreds


    if (look[alt].length === 0 || look[alt].contains(LL1Analyzer.HIT_PRED)) {
      look[alt] = null;
    }
  }

  return look;
}; //*
// Compute set of tokens that can follow {@code s} in the ATN in the
// specified {@code ctx}.
//
// <p>If {@code ctx} is {@code null} and the end of the rule containing
// {@code s} is reached, {@link Token//EPSILON} is added to the result set.
// If {@code ctx} is not {@code null} and the end of the outermost rule is
// reached, {@link Token//EOF} is added to the result set.</p>
//
// @param s the ATN state
// @param stopState the ATN state to stop at. This can be a
// {@link BlockEndState} to detect epsilon paths through a closure.
// @param ctx the complete parser context, or {@code null} if the context
// should be ignored
//
// @return The set of tokens that can follow {@code s} in the ATN in the
// specified {@code ctx}.
///


LL1Analyzer.prototype.LOOK = function (s, stopState, ctx) {
  var r = new IntervalSet();
  var seeThruPreds = true; // ignore preds; get all lookahead

  ctx = ctx || null;
  var lookContext = ctx !== null ? predictionContextFromRuleContext(s.atn, ctx) : null;

  this._LOOK(s, stopState, lookContext, r, new Set(), new BitSet(), seeThruPreds, true);

  return r;
}; //*
// Compute set of tokens that can follow {@code s} in the ATN in the
// specified {@code ctx}.
//
// <p>If {@code ctx} is {@code null} and {@code stopState} or the end of the
// rule containing {@code s} is reached, {@link Token//EPSILON} is added to
// the result set. If {@code ctx} is not {@code null} and {@code addEOF} is
// {@code true} and {@code stopState} or the end of the outermost rule is
// reached, {@link Token//EOF} is added to the result set.</p>
//
// @param s the ATN state.
// @param stopState the ATN state to stop at. This can be a
// {@link BlockEndState} to detect epsilon paths through a closure.
// @param ctx The outer context, or {@code null} if the outer context should
// not be used.
// @param look The result lookahead set.
// @param lookBusy A set used for preventing epsilon closures in the ATN
// from causing a stack overflow. Outside code should pass
// {@code new Set<ATNConfig>} for this argument.
// @param calledRuleStack A set used for preventing left recursion in the
// ATN from causing a stack overflow. Outside code should pass
// {@code new BitSet()} for this argument.
// @param seeThruPreds {@code true} to true semantic predicates as
// implicitly {@code true} and "see through them", otherwise {@code false}
// to treat semantic predicates as opaque and add {@link //HIT_PRED} to the
// result if one is encountered.
// @param addEOF Add {@link Token//EOF} to the result if the end of the
// outermost context is reached. This parameter has no effect if {@code ctx}
// is {@code null}.
///


LL1Analyzer.prototype._LOOK = function (s, stopState, ctx, look, lookBusy, calledRuleStack, seeThruPreds, addEOF) {
  var c = new ATNConfig({
    state: s,
    alt: 0,
    context: ctx
  }, null);

  if (lookBusy.contains(c)) {
    return;
  }

  lookBusy.add(c);

  if (s === stopState) {
    if (ctx === null) {
      look.addOne(Token.EPSILON);
      return;
    } else if (ctx.isEmpty() && addEOF) {
      look.addOne(Token.EOF);
      return;
    }
  }

  if (s instanceof RuleStopState) {
    if (ctx === null) {
      look.addOne(Token.EPSILON);
      return;
    } else if (ctx.isEmpty() && addEOF) {
      look.addOne(Token.EOF);
      return;
    }

    if (ctx !== PredictionContext.EMPTY) {
      // run thru all possible stack tops in ctx
      for (var i = 0; i < ctx.length; i++) {
        var returnState = this.atn.states[ctx.getReturnState(i)];
        var removed = calledRuleStack.contains(returnState.ruleIndex);

        try {
          calledRuleStack.remove(returnState.ruleIndex);

          this._LOOK(returnState, stopState, ctx.getParent(i), look, lookBusy, calledRuleStack, seeThruPreds, addEOF);
        } finally {
          if (removed) {
            calledRuleStack.add(returnState.ruleIndex);
          }
        }
      }

      return;
    }
  }

  for (var j = 0; j < s.transitions.length; j++) {
    var t = s.transitions[j];

    if (t.constructor === RuleTransition) {
      if (calledRuleStack.contains(t.target.ruleIndex)) {
        continue;
      }

      var newContext = SingletonPredictionContext.create(ctx, t.followState.stateNumber);

      try {
        calledRuleStack.add(t.target.ruleIndex);

        this._LOOK(t.target, stopState, newContext, look, lookBusy, calledRuleStack, seeThruPreds, addEOF);
      } finally {
        calledRuleStack.remove(t.target.ruleIndex);
      }
    } else if (t instanceof AbstractPredicateTransition) {
      if (seeThruPreds) {
        this._LOOK(t.target, stopState, ctx, look, lookBusy, calledRuleStack, seeThruPreds, addEOF);
      } else {
        look.addOne(LL1Analyzer.HIT_PRED);
      }
    } else if (t.isEpsilon) {
      this._LOOK(t.target, stopState, ctx, look, lookBusy, calledRuleStack, seeThruPreds, addEOF);
    } else if (t.constructor === WildcardTransition) {
      look.addRange(Token.MIN_USER_TOKEN_TYPE, this.atn.maxTokenType);
    } else {
      var set = t.label;

      if (set !== null) {
        if (t instanceof NotSetTransition) {
          set = set.complement(Token.MIN_USER_TOKEN_TYPE, this.atn.maxTokenType);
        }

        look.addSet(set);
      }
    }
  }
};

exports.LL1Analyzer = LL1Analyzer;

/***/ }),
/* 8 */
/***/ (function(module, exports) {

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

/* Copyright (c) 2012-2017 The ANTLR Project. All rights reserved.
 * Use of this file is governed by the BSD 3-clause license that
 * can be found in the LICENSE.txt file in the project root.
 */
function arrayToString(a) {
  return "[" + a.join(", ") + "]";
}

String.prototype.seed = String.prototype.seed || Math.round(Math.random() * Math.pow(2, 32));

String.prototype.hashCode = function () {
  var remainder,
      bytes,
      h1,
      h1b,
      c1,
      c1b,
      c2,
      c2b,
      k1,
      i,
      key = this.toString();
  remainder = key.length & 3; // key.length % 4

  bytes = key.length - remainder;
  h1 = String.prototype.seed;
  c1 = 0xcc9e2d51;
  c2 = 0x1b873593;
  i = 0;

  while (i < bytes) {
    k1 = key.charCodeAt(i) & 0xff | (key.charCodeAt(++i) & 0xff) << 8 | (key.charCodeAt(++i) & 0xff) << 16 | (key.charCodeAt(++i) & 0xff) << 24;
    ++i;
    k1 = (k1 & 0xffff) * c1 + (((k1 >>> 16) * c1 & 0xffff) << 16) & 0xffffffff;
    k1 = k1 << 15 | k1 >>> 17;
    k1 = (k1 & 0xffff) * c2 + (((k1 >>> 16) * c2 & 0xffff) << 16) & 0xffffffff;
    h1 ^= k1;
    h1 = h1 << 13 | h1 >>> 19;
    h1b = (h1 & 0xffff) * 5 + (((h1 >>> 16) * 5 & 0xffff) << 16) & 0xffffffff;
    h1 = (h1b & 0xffff) + 0x6b64 + (((h1b >>> 16) + 0xe654 & 0xffff) << 16);
  }

  k1 = 0;

  switch (remainder) {
    case 3:
      k1 ^= (key.charCodeAt(i + 2) & 0xff) << 16;

    case 2:
      k1 ^= (key.charCodeAt(i + 1) & 0xff) << 8;

    case 1:
      k1 ^= key.charCodeAt(i) & 0xff;
      k1 = (k1 & 0xffff) * c1 + (((k1 >>> 16) * c1 & 0xffff) << 16) & 0xffffffff;
      k1 = k1 << 15 | k1 >>> 17;
      k1 = (k1 & 0xffff) * c2 + (((k1 >>> 16) * c2 & 0xffff) << 16) & 0xffffffff;
      h1 ^= k1;
  }

  h1 ^= key.length;
  h1 ^= h1 >>> 16;
  h1 = (h1 & 0xffff) * 0x85ebca6b + (((h1 >>> 16) * 0x85ebca6b & 0xffff) << 16) & 0xffffffff;
  h1 ^= h1 >>> 13;
  h1 = (h1 & 0xffff) * 0xc2b2ae35 + (((h1 >>> 16) * 0xc2b2ae35 & 0xffff) << 16) & 0xffffffff;
  h1 ^= h1 >>> 16;
  return h1 >>> 0;
};

function standardEqualsFunction(a, b) {
  return a.equals(b);
}

function standardHashCodeFunction(a) {
  return a.hashCode();
}

function Set(hashFunction, equalsFunction) {
  this.data = {};
  this.hashFunction = hashFunction || standardHashCodeFunction;
  this.equalsFunction = equalsFunction || standardEqualsFunction;
  return this;
}

Object.defineProperty(Set.prototype, "length", {
  get: function get() {
    var l = 0;

    for (var key in this.data) {
      if (key.indexOf("hash_") === 0) {
        l = l + this.data[key].length;
      }
    }

    return l;
  }
});

Set.prototype.add = function (value) {
  var hash = this.hashFunction(value);
  var key = "hash_" + hash;

  if (key in this.data) {
    var values = this.data[key];

    for (var i = 0; i < values.length; i++) {
      if (this.equalsFunction(value, values[i])) {
        return values[i];
      }
    }

    values.push(value);
    return value;
  } else {
    this.data[key] = [value];
    return value;
  }
};

Set.prototype.contains = function (value) {
  return this.get(value) != null;
};

Set.prototype.get = function (value) {
  var hash = this.hashFunction(value);
  var key = "hash_" + hash;

  if (key in this.data) {
    var values = this.data[key];

    for (var i = 0; i < values.length; i++) {
      if (this.equalsFunction(value, values[i])) {
        return values[i];
      }
    }
  }

  return null;
};

Set.prototype.values = function () {
  var l = [];

  for (var key in this.data) {
    if (key.indexOf("hash_") === 0) {
      l = l.concat(this.data[key]);
    }
  }

  return l;
};

Set.prototype.toString = function () {
  return arrayToString(this.values());
};

function BitSet() {
  this.data = [];
  return this;
}

BitSet.prototype.add = function (value) {
  this.data[value] = true;
};

BitSet.prototype.or = function (set) {
  var bits = this;
  Object.keys(set.data).map(function (alt) {
    bits.add(alt);
  });
};

BitSet.prototype.remove = function (value) {
  delete this.data[value];
};

BitSet.prototype.contains = function (value) {
  return this.data[value] === true;
};

BitSet.prototype.values = function () {
  return Object.keys(this.data);
};

BitSet.prototype.minValue = function () {
  return Math.min.apply(null, this.values());
};

BitSet.prototype.hashCode = function () {
  var hash = new Hash();
  hash.update(this.values());
  return hash.finish();
};

BitSet.prototype.equals = function (other) {
  if (!(other instanceof BitSet)) {
    return false;
  }

  return this.hashCode() === other.hashCode();
};

Object.defineProperty(BitSet.prototype, "length", {
  get: function get() {
    return this.values().length;
  }
});

BitSet.prototype.toString = function () {
  return "{" + this.values().join(", ") + "}";
};

function Map(hashFunction, equalsFunction) {
  this.data = {};
  this.hashFunction = hashFunction || standardHashCodeFunction;
  this.equalsFunction = equalsFunction || standardEqualsFunction;
  return this;
}

Object.defineProperty(Map.prototype, "length", {
  get: function get() {
    var l = 0;

    for (var hashKey in this.data) {
      if (hashKey.indexOf("hash_") === 0) {
        l = l + this.data[hashKey].length;
      }
    }

    return l;
  }
});

Map.prototype.put = function (key, value) {
  var hashKey = "hash_" + this.hashFunction(key);

  if (hashKey in this.data) {
    var entries = this.data[hashKey];

    for (var i = 0; i < entries.length; i++) {
      var entry = entries[i];

      if (this.equalsFunction(key, entry.key)) {
        var oldValue = entry.value;
        entry.value = value;
        return oldValue;
      }
    }

    entries.push({
      key: key,
      value: value
    });
    return value;
  } else {
    this.data[hashKey] = [{
      key: key,
      value: value
    }];
    return value;
  }
};

Map.prototype.containsKey = function (key) {
  var hashKey = "hash_" + this.hashFunction(key);

  if (hashKey in this.data) {
    var entries = this.data[hashKey];

    for (var i = 0; i < entries.length; i++) {
      var entry = entries[i];
      if (this.equalsFunction(key, entry.key)) return true;
    }
  }

  return false;
};

Map.prototype.get = function (key) {
  var hashKey = "hash_" + this.hashFunction(key);

  if (hashKey in this.data) {
    var entries = this.data[hashKey];

    for (var i = 0; i < entries.length; i++) {
      var entry = entries[i];
      if (this.equalsFunction(key, entry.key)) return entry.value;
    }
  }

  return null;
};

Map.prototype.entries = function () {
  var l = [];

  for (var key in this.data) {
    if (key.indexOf("hash_") === 0) {
      l = l.concat(this.data[key]);
    }
  }

  return l;
};

Map.prototype.getKeys = function () {
  return this.entries().map(function (e) {
    return e.key;
  });
};

Map.prototype.getValues = function () {
  return this.entries().map(function (e) {
    return e.value;
  });
};

Map.prototype.toString = function () {
  var ss = this.entries().map(function (entry) {
    return '{' + entry.key + ':' + entry.value + '}';
  });
  return '[' + ss.join(", ") + ']';
};

function AltDict() {
  this.data = {};
  return this;
}

AltDict.prototype.get = function (key) {
  key = "k-" + key;

  if (key in this.data) {
    return this.data[key];
  } else {
    return null;
  }
};

AltDict.prototype.put = function (key, value) {
  key = "k-" + key;
  this.data[key] = value;
};

AltDict.prototype.values = function () {
  var data = this.data;
  var keys = Object.keys(this.data);
  return keys.map(function (key) {
    return data[key];
  });
};

function DoubleDict(defaultMapCtor) {
  this.defaultMapCtor = defaultMapCtor || Map;
  this.cacheMap = new this.defaultMapCtor();
  return this;
}

function Hash() {
  this.count = 0;
  this.hash = 0;
  return this;
}

Hash.prototype.update = function () {
  for (var i = 0; i < arguments.length; i++) {
    var value = arguments[i];
    if (value == null) continue;
    if (Array.isArray(value)) this.update.apply(this, value);else {
      var k = 0;

      switch (_typeof(value)) {
        case 'undefined':
        case 'function':
          continue;

        case 'number':
        case 'boolean':
          k = value;
          break;

        case 'string':
          k = value.hashCode();
          break;

        default:
          if (value.updateHashCode) value.updateHashCode(this);else console.log("No updateHashCode for " + value.toString());
          continue;
      }

      k = k * 0xCC9E2D51;
      k = k << 15 | k >>> 32 - 15;
      k = k * 0x1B873593;
      this.count = this.count + 1;
      var hash = this.hash ^ k;
      hash = hash << 13 | hash >>> 32 - 13;
      hash = hash * 5 + 0xE6546B64;
      this.hash = hash;
    }
  }
};

Hash.prototype.finish = function () {
  var hash = this.hash ^ this.count * 4;
  hash = hash ^ hash >>> 16;
  hash = hash * 0x85EBCA6B;
  hash = hash ^ hash >>> 13;
  hash = hash * 0xC2B2AE35;
  hash = hash ^ hash >>> 16;
  return hash;
};

function hashStuff() {
  var hash = new Hash();
  hash.update.apply(hash, arguments);
  return hash.finish();
}

DoubleDict.prototype.get = function (a, b) {
  var d = this.cacheMap.get(a) || null;
  return d === null ? null : d.get(b) || null;
};

DoubleDict.prototype.set = function (a, b, o) {
  var d = this.cacheMap.get(a) || null;

  if (d === null) {
    d = new this.defaultMapCtor();
    this.cacheMap.put(a, d);
  }

  d.put(b, o);
};

function escapeWhitespace(s, escapeSpaces) {
  s = s.replace(/\t/g, "\\t").replace(/\n/g, "\\n").replace(/\r/g, "\\r");

  if (escapeSpaces) {
    s = s.replace(/ /g, "\xB7");
  }

  return s;
}

function titleCase(str) {
  return str.replace(/\w\S*/g, function (txt) {
    return txt.charAt(0).toUpperCase() + txt.substr(1);
  });
}

;

function equalArrays(a, b) {
  if (!Array.isArray(a) || !Array.isArray(b)) return false;
  if (a == b) return true;
  if (a.length != b.length) return false;

  for (var i = 0; i < a.length; i++) {
    if (a[i] == b[i]) continue;
    if (!a[i].equals(b[i])) return false;
  }

  return true;
}

;
exports.Hash = Hash;
exports.Set = Set;
exports.Map = Map;
exports.BitSet = BitSet;
exports.AltDict = AltDict;
exports.DoubleDict = DoubleDict;
exports.hashStuff = hashStuff;
exports.escapeWhitespace = escapeWhitespace;
exports.arrayToString = arrayToString;
exports.titleCase = titleCase;
exports.equalArrays = equalArrays;

/***/ }),
/* 9 */
/***/ (function(module, exports) {

/* Copyright (c) 2012-2017 The ANTLR Project. All rights reserved.
 * Use of this file is governed by the BSD 3-clause license that
 * can be found in the LICENSE.txt file in the project root.
 */
//
// A token has properties: text, type, line, character position in the line
// (so we can ignore tabs), token channel, index, and source from which
// we obtained this token.
function Token() {
  this.source = null;
  this.type = null; // token type of the token

  this.channel = null; // The parser ignores everything not on DEFAULT_CHANNEL

  this.start = null; // optional; return -1 if not implemented.

  this.stop = null; // optional; return -1 if not implemented.

  this.tokenIndex = null; // from 0..n-1 of the token object in the input stream

  this.line = null; // line=1..n of the 1st character

  this.column = null; // beginning of the line at which it occurs, 0..n-1

  this._text = null; // text of the token.

  return this;
}

Token.INVALID_TYPE = 0; // During lookahead operations, this "token" signifies we hit rule end ATN state
// and did not follow it despite needing to.

Token.EPSILON = -2;
Token.MIN_USER_TOKEN_TYPE = 1;
Token.EOF = -1; // All tokens go to the parser (unless skip() is called in that rule)
// on a particular "channel". The parser tunes to a particular channel
// so that whitespace etc... can go to the parser on a "hidden" channel.

Token.DEFAULT_CHANNEL = 0; // Anything on different channel than DEFAULT_CHANNEL is not parsed
// by parser.

Token.HIDDEN_CHANNEL = 1; // Explicitly set the text for this token. If {code text} is not
// {@code null}, then {@link //getText} will return this value rather than
// extracting the text from the input.
//
// @param text The explicit text of the token, or {@code null} if the text
// should be obtained from the input along with the start and stop indexes
// of the token.

Object.defineProperty(Token.prototype, "text", {
  get: function get() {
    return this._text;
  },
  set: function set(text) {
    this._text = text;
  }
});

Token.prototype.getTokenSource = function () {
  return this.source[0];
};

Token.prototype.getInputStream = function () {
  return this.source[1];
};

function CommonToken(source, type, channel, start, stop) {
  Token.call(this);
  this.source = source !== undefined ? source : CommonToken.EMPTY_SOURCE;
  this.type = type !== undefined ? type : null;
  this.channel = channel !== undefined ? channel : Token.DEFAULT_CHANNEL;
  this.start = start !== undefined ? start : -1;
  this.stop = stop !== undefined ? stop : -1;
  this.tokenIndex = -1;

  if (this.source[0] !== null) {
    this.line = source[0].line;
    this.column = source[0].column;
  } else {
    this.column = -1;
  }

  return this;
}

CommonToken.prototype = Object.create(Token.prototype);
CommonToken.prototype.constructor = CommonToken; // An empty {@link Pair} which is used as the default value of
// {@link //source} for tokens that do not have a source.

CommonToken.EMPTY_SOURCE = [null, null]; // Constructs a new {@link CommonToken} as a copy of another {@link Token}.
//
// <p>
// If {@code oldToken} is also a {@link CommonToken} instance, the newly
// constructed token will share a reference to the {@link //text} field and
// the {@link Pair} stored in {@link //source}. Otherwise, {@link //text} will
// be assigned the result of calling {@link //getText}, and {@link //source}
// will be constructed from the result of {@link Token//getTokenSource} and
// {@link Token//getInputStream}.</p>
//
// @param oldToken The token to copy.
//

CommonToken.prototype.clone = function () {
  var t = new CommonToken(this.source, this.type, this.channel, this.start, this.stop);
  t.tokenIndex = this.tokenIndex;
  t.line = this.line;
  t.column = this.column;
  t.text = this.text;
  return t;
};

Object.defineProperty(CommonToken.prototype, "text", {
  get: function get() {
    if (this._text !== null) {
      return this._text;
    }

    var input = this.getInputStream();

    if (input === null) {
      return null;
    }

    var n = input.size;

    if (this.start < n && this.stop < n) {
      return input.getText(this.start, this.stop);
    } else {
      return "<EOF>";
    }
  },
  set: function set(text) {
    this._text = text;
  }
});

CommonToken.prototype.toString = function () {
  var txt = this.text;

  if (txt !== null) {
    txt = txt.replace(/\n/g, "\\n").replace(/\r/g, "\\r").replace(/\t/g, "\\t");
  } else {
    txt = "<no text>";
  }

  return "[@" + this.tokenIndex + "," + this.start + ":" + this.stop + "='" + txt + "',<" + this.type + ">" + (this.channel > 0 ? ",channel=" + this.channel : "") + "," + this.line + ":" + this.column + "]";
};

exports.Token = Token;
exports.CommonToken = CommonToken;

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

//

/* Copyright (c) 2012-2017 The ANTLR Project. All rights reserved.
 * Use of this file is governed by the BSD 3-clause license that
 * can be found in the LICENSE.txt file in the project root.
 */
///
// A tuple: (ATN state, predicted alt, syntactic, semantic context).
//  The syntactic context is a graph-structured stack node whose
//  path(s) to the root is the rule invocation(s)
//  chain used to arrive at the state.  The semantic context is
//  the tree of semantic predicates encountered before reaching
//  an ATN state.
///
var DecisionState = __webpack_require__(11).DecisionState;

var SemanticContext = __webpack_require__(12).SemanticContext;

var Hash = __webpack_require__(8).Hash;

function checkParams(params, isCfg) {
  if (params === null) {
    var result = {
      state: null,
      alt: null,
      context: null,
      semanticContext: null
    };

    if (isCfg) {
      result.reachesIntoOuterContext = 0;
    }

    return result;
  } else {
    var props = {};
    props.state = params.state || null;
    props.alt = params.alt === undefined ? null : params.alt;
    props.context = params.context || null;
    props.semanticContext = params.semanticContext || null;

    if (isCfg) {
      props.reachesIntoOuterContext = params.reachesIntoOuterContext || 0;
      props.precedenceFilterSuppressed = params.precedenceFilterSuppressed || false;
    }

    return props;
  }
}

function ATNConfig(params, config) {
  this.checkContext(params, config);
  params = checkParams(params);
  config = checkParams(config, true); // The ATN state associated with this configuration///

  this.state = params.state !== null ? params.state : config.state; // What alt (or lexer rule) is predicted by this configuration///

  this.alt = params.alt !== null ? params.alt : config.alt; // The stack of invoking states leading to the rule/states associated
  //  with this config.  We track only those contexts pushed during
  //  execution of the ATN simulator.

  this.context = params.context !== null ? params.context : config.context;
  this.semanticContext = params.semanticContext !== null ? params.semanticContext : config.semanticContext !== null ? config.semanticContext : SemanticContext.NONE; // We cannot execute predicates dependent upon local context unless
  // we know for sure we are in the correct context. Because there is
  // no way to do this efficiently, we simply cannot evaluate
  // dependent predicates unless we are in the rule that initially
  // invokes the ATN simulator.
  //
  // closure() tracks the depth of how far we dip into the
  // outer context: depth &gt; 0.  Note that it may not be totally
  // accurate depth since I don't ever decrement. TODO: make it a boolean then

  this.reachesIntoOuterContext = config.reachesIntoOuterContext;
  this.precedenceFilterSuppressed = config.precedenceFilterSuppressed;
  return this;
}

ATNConfig.prototype.checkContext = function (params, config) {
  if ((params.context === null || params.context === undefined) && (config === null || config.context === null || config.context === undefined)) {
    this.context = null;
  }
};

ATNConfig.prototype.hashCode = function () {
  var hash = new Hash();
  this.updateHashCode(hash);
  return hash.finish();
};

ATNConfig.prototype.updateHashCode = function (hash) {
  hash.update(this.state.stateNumber, this.alt, this.context, this.semanticContext);
}; // An ATN configuration is equal to another if both have
//  the same state, they predict the same alternative, and
//  syntactic/semantic contexts are the same.


ATNConfig.prototype.equals = function (other) {
  if (this === other) {
    return true;
  } else if (!(other instanceof ATNConfig)) {
    return false;
  } else {
    return this.state.stateNumber === other.state.stateNumber && this.alt === other.alt && (this.context === null ? other.context === null : this.context.equals(other.context)) && this.semanticContext.equals(other.semanticContext) && this.precedenceFilterSuppressed === other.precedenceFilterSuppressed;
  }
};

ATNConfig.prototype.hashCodeForConfigSet = function () {
  var hash = new Hash();
  hash.update(this.state.stateNumber, this.alt, this.semanticContext);
  return hash.finish();
};

ATNConfig.prototype.equalsForConfigSet = function (other) {
  if (this === other) {
    return true;
  } else if (!(other instanceof ATNConfig)) {
    return false;
  } else {
    return this.state.stateNumber === other.state.stateNumber && this.alt === other.alt && this.semanticContext.equals(other.semanticContext);
  }
};

ATNConfig.prototype.toString = function () {
  return "(" + this.state + "," + this.alt + (this.context !== null ? ",[" + this.context.toString() + "]" : "") + (this.semanticContext !== SemanticContext.NONE ? "," + this.semanticContext.toString() : "") + (this.reachesIntoOuterContext > 0 ? ",up=" + this.reachesIntoOuterContext : "") + ")";
};

function LexerATNConfig(params, config) {
  ATNConfig.call(this, params, config); // This is the backing field for {@link //getLexerActionExecutor}.

  var lexerActionExecutor = params.lexerActionExecutor || null;
  this.lexerActionExecutor = lexerActionExecutor || (config !== null ? config.lexerActionExecutor : null);
  this.passedThroughNonGreedyDecision = config !== null ? this.checkNonGreedyDecision(config, this.state) : false;
  return this;
}

LexerATNConfig.prototype = Object.create(ATNConfig.prototype);
LexerATNConfig.prototype.constructor = LexerATNConfig;

LexerATNConfig.prototype.updateHashCode = function (hash) {
  hash.update(this.state.stateNumber, this.alt, this.context, this.semanticContext, this.passedThroughNonGreedyDecision, this.lexerActionExecutor);
};

LexerATNConfig.prototype.equals = function (other) {
  return this === other || other instanceof LexerATNConfig && this.passedThroughNonGreedyDecision == other.passedThroughNonGreedyDecision && (this.lexerActionExecutor ? this.lexerActionExecutor.equals(other.lexerActionExecutor) : !other.lexerActionExecutor) && ATNConfig.prototype.equals.call(this, other);
};

LexerATNConfig.prototype.hashCodeForConfigSet = LexerATNConfig.prototype.hashCode;
LexerATNConfig.prototype.equalsForConfigSet = LexerATNConfig.prototype.equals;

LexerATNConfig.prototype.checkNonGreedyDecision = function (source, target) {
  return source.passedThroughNonGreedyDecision || target instanceof DecisionState && target.nonGreedy;
};

exports.ATNConfig = ATNConfig;
exports.LexerATNConfig = LexerATNConfig;

/***/ }),
/* 11 */
/***/ (function(module, exports) {

//

/* Copyright (c) 2012-2017 The ANTLR Project. All rights reserved.
 * Use of this file is governed by the BSD 3-clause license that
 * can be found in the LICENSE.txt file in the project root.
 */
//
// The following images show the relation of states and
// {@link ATNState//transitions} for various grammar constructs.
//
// <ul>
//
// <li>Solid edges marked with an &//0949; indicate a required
// {@link EpsilonTransition}.</li>
//
// <li>Dashed edges indicate locations where any transition derived from
// {@link Transition} might appear.</li>
//
// <li>Dashed nodes are place holders for either a sequence of linked
// {@link BasicState} states or the inclusion of a block representing a nested
// construct in one of the forms below.</li>
//
// <li>Nodes showing multiple outgoing alternatives with a {@code ...} support
// any number of alternatives (one or more). Nodes without the {@code ...} only
// support the exact number of alternatives shown in the diagram.</li>
//
// </ul>
//
// <h2>Basic Blocks</h2>
//
// <h3>Rule</h3>
//
// <embed src="images/Rule.svg" type="image/svg+xml"/>
//
// <h3>Block of 1 or more alternatives</h3>
//
// <embed src="images/Block.svg" type="image/svg+xml"/>
//
// <h2>Greedy Loops</h2>
//
// <h3>Greedy Closure: {@code (...)*}</h3>
//
// <embed src="images/ClosureGreedy.svg" type="image/svg+xml"/>
//
// <h3>Greedy Positive Closure: {@code (...)+}</h3>
//
// <embed src="images/PositiveClosureGreedy.svg" type="image/svg+xml"/>
//
// <h3>Greedy Optional: {@code (...)?}</h3>
//
// <embed src="images/OptionalGreedy.svg" type="image/svg+xml"/>
//
// <h2>Non-Greedy Loops</h2>
//
// <h3>Non-Greedy Closure: {@code (...)*?}</h3>
//
// <embed src="images/ClosureNonGreedy.svg" type="image/svg+xml"/>
//
// <h3>Non-Greedy Positive Closure: {@code (...)+?}</h3>
//
// <embed src="images/PositiveClosureNonGreedy.svg" type="image/svg+xml"/>
//
// <h3>Non-Greedy Optional: {@code (...)??}</h3>
//
// <embed src="images/OptionalNonGreedy.svg" type="image/svg+xml"/>
//
var INITIAL_NUM_TRANSITIONS = 4;

function ATNState() {
  // Which ATN are we in?
  this.atn = null;
  this.stateNumber = ATNState.INVALID_STATE_NUMBER;
  this.stateType = null;
  this.ruleIndex = 0; // at runtime, we don't have Rule objects

  this.epsilonOnlyTransitions = false; // Track the transitions emanating from this ATN state.

  this.transitions = []; // Used to cache lookahead during parsing, not used during construction

  this.nextTokenWithinRule = null;
  return this;
} // constants for serialization


ATNState.INVALID_TYPE = 0;
ATNState.BASIC = 1;
ATNState.RULE_START = 2;
ATNState.BLOCK_START = 3;
ATNState.PLUS_BLOCK_START = 4;
ATNState.STAR_BLOCK_START = 5;
ATNState.TOKEN_START = 6;
ATNState.RULE_STOP = 7;
ATNState.BLOCK_END = 8;
ATNState.STAR_LOOP_BACK = 9;
ATNState.STAR_LOOP_ENTRY = 10;
ATNState.PLUS_LOOP_BACK = 11;
ATNState.LOOP_END = 12;
ATNState.serializationNames = ["INVALID", "BASIC", "RULE_START", "BLOCK_START", "PLUS_BLOCK_START", "STAR_BLOCK_START", "TOKEN_START", "RULE_STOP", "BLOCK_END", "STAR_LOOP_BACK", "STAR_LOOP_ENTRY", "PLUS_LOOP_BACK", "LOOP_END"];
ATNState.INVALID_STATE_NUMBER = -1;

ATNState.prototype.toString = function () {
  return this.stateNumber;
};

ATNState.prototype.equals = function (other) {
  if (other instanceof ATNState) {
    return this.stateNumber === other.stateNumber;
  } else {
    return false;
  }
};

ATNState.prototype.isNonGreedyExitState = function () {
  return false;
};

ATNState.prototype.addTransition = function (trans, index) {
  if (index === undefined) {
    index = -1;
  }

  if (this.transitions.length === 0) {
    this.epsilonOnlyTransitions = trans.isEpsilon;
  } else if (this.epsilonOnlyTransitions !== trans.isEpsilon) {
    this.epsilonOnlyTransitions = false;
  }

  if (index === -1) {
    this.transitions.push(trans);
  } else {
    this.transitions.splice(index, 1, trans);
  }
};

function BasicState() {
  ATNState.call(this);
  this.stateType = ATNState.BASIC;
  return this;
}

BasicState.prototype = Object.create(ATNState.prototype);
BasicState.prototype.constructor = BasicState;

function DecisionState() {
  ATNState.call(this);
  this.decision = -1;
  this.nonGreedy = false;
  return this;
}

DecisionState.prototype = Object.create(ATNState.prototype);
DecisionState.prototype.constructor = DecisionState; //  The start of a regular {@code (...)} block.

function BlockStartState() {
  DecisionState.call(this);
  this.endState = null;
  return this;
}

BlockStartState.prototype = Object.create(DecisionState.prototype);
BlockStartState.prototype.constructor = BlockStartState;

function BasicBlockStartState() {
  BlockStartState.call(this);
  this.stateType = ATNState.BLOCK_START;
  return this;
}

BasicBlockStartState.prototype = Object.create(BlockStartState.prototype);
BasicBlockStartState.prototype.constructor = BasicBlockStartState; // Terminal node of a simple {@code (a|b|c)} block.

function BlockEndState() {
  ATNState.call(this);
  this.stateType = ATNState.BLOCK_END;
  this.startState = null;
  return this;
}

BlockEndState.prototype = Object.create(ATNState.prototype);
BlockEndState.prototype.constructor = BlockEndState; // The last node in the ATN for a rule, unless that rule is the start symbol.
//  In that case, there is one transition to EOF. Later, we might encode
//  references to all calls to this rule to compute FOLLOW sets for
//  error handling.
//

function RuleStopState() {
  ATNState.call(this);
  this.stateType = ATNState.RULE_STOP;
  return this;
}

RuleStopState.prototype = Object.create(ATNState.prototype);
RuleStopState.prototype.constructor = RuleStopState;

function RuleStartState() {
  ATNState.call(this);
  this.stateType = ATNState.RULE_START;
  this.stopState = null;
  this.isPrecedenceRule = false;
  return this;
}

RuleStartState.prototype = Object.create(ATNState.prototype);
RuleStartState.prototype.constructor = RuleStartState; // Decision state for {@code A+} and {@code (A|B)+}.  It has two transitions:
//  one to the loop back to start of the block and one to exit.
//

function PlusLoopbackState() {
  DecisionState.call(this);
  this.stateType = ATNState.PLUS_LOOP_BACK;
  return this;
}

PlusLoopbackState.prototype = Object.create(DecisionState.prototype);
PlusLoopbackState.prototype.constructor = PlusLoopbackState; // Start of {@code (A|B|...)+} loop. Technically a decision state, but
//  we don't use for code generation; somebody might need it, so I'm defining
//  it for completeness. In reality, the {@link PlusLoopbackState} node is the
//  real decision-making note for {@code A+}.
//

function PlusBlockStartState() {
  BlockStartState.call(this);
  this.stateType = ATNState.PLUS_BLOCK_START;
  this.loopBackState = null;
  return this;
}

PlusBlockStartState.prototype = Object.create(BlockStartState.prototype);
PlusBlockStartState.prototype.constructor = PlusBlockStartState; // The block that begins a closure loop.

function StarBlockStartState() {
  BlockStartState.call(this);
  this.stateType = ATNState.STAR_BLOCK_START;
  return this;
}

StarBlockStartState.prototype = Object.create(BlockStartState.prototype);
StarBlockStartState.prototype.constructor = StarBlockStartState;

function StarLoopbackState() {
  ATNState.call(this);
  this.stateType = ATNState.STAR_LOOP_BACK;
  return this;
}

StarLoopbackState.prototype = Object.create(ATNState.prototype);
StarLoopbackState.prototype.constructor = StarLoopbackState;

function StarLoopEntryState() {
  DecisionState.call(this);
  this.stateType = ATNState.STAR_LOOP_ENTRY;
  this.loopBackState = null; // Indicates whether this state can benefit from a precedence DFA during SLL decision making.

  this.isPrecedenceDecision = null;
  return this;
}

StarLoopEntryState.prototype = Object.create(DecisionState.prototype);
StarLoopEntryState.prototype.constructor = StarLoopEntryState; // Mark the end of a * or + loop.

function LoopEndState() {
  ATNState.call(this);
  this.stateType = ATNState.LOOP_END;
  this.loopBackState = null;
  return this;
}

LoopEndState.prototype = Object.create(ATNState.prototype);
LoopEndState.prototype.constructor = LoopEndState; // The Tokens rule start state linking to each lexer rule start state */

function TokensStartState() {
  DecisionState.call(this);
  this.stateType = ATNState.TOKEN_START;
  return this;
}

TokensStartState.prototype = Object.create(DecisionState.prototype);
TokensStartState.prototype.constructor = TokensStartState;
exports.ATNState = ATNState;
exports.BasicState = BasicState;
exports.DecisionState = DecisionState;
exports.BlockStartState = BlockStartState;
exports.BlockEndState = BlockEndState;
exports.LoopEndState = LoopEndState;
exports.RuleStartState = RuleStartState;
exports.RuleStopState = RuleStopState;
exports.TokensStartState = TokensStartState;
exports.PlusLoopbackState = PlusLoopbackState;
exports.StarLoopbackState = StarLoopbackState;
exports.StarLoopEntryState = StarLoopEntryState;
exports.PlusBlockStartState = PlusBlockStartState;
exports.StarBlockStartState = StarBlockStartState;
exports.BasicBlockStartState = BasicBlockStartState;

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

//

/* Copyright (c) 2012-2017 The ANTLR Project. All rights reserved.
 * Use of this file is governed by the BSD 3-clause license that
 * can be found in the LICENSE.txt file in the project root.
 */
//
// A tree structure used to record the semantic context in which
//  an ATN configuration is valid.  It's either a single predicate,
//  a conjunction {@code p1&&p2}, or a sum of products {@code p1||p2}.
//
//  <p>I have scoped the {@link AND}, {@link OR}, and {@link Predicate} subclasses of
//  {@link SemanticContext} within the scope of this outer class.</p>
//
var Set = __webpack_require__(8).Set;

var Hash = __webpack_require__(8).Hash;

function SemanticContext() {
  return this;
}

SemanticContext.prototype.hashCode = function () {
  var hash = new Hash();
  this.updateHashCode(hash);
  return hash.finish();
}; // For context independent predicates, we evaluate them without a local
// context (i.e., null context). That way, we can evaluate them without
// having to create proper rule-specific context during prediction (as
// opposed to the parser, which creates them naturally). In a practical
// sense, this avoids a cast exception from RuleContext to myruleContext.
//
// <p>For context dependent predicates, we must pass in a local context so that
// references such as $arg evaluate properly as _localctx.arg. We only
// capture context dependent predicates in the context in which we begin
// prediction, so we passed in the outer context here in case of context
// dependent predicate evaluation.</p>
//


SemanticContext.prototype.evaluate = function (parser, outerContext) {}; //
// Evaluate the precedence predicates for the context and reduce the result.
//
// @param parser The parser instance.
// @param outerContext The current parser context object.
// @return The simplified semantic context after precedence predicates are
// evaluated, which will be one of the following values.
// <ul>
// <li>{@link //NONE}: if the predicate simplifies to {@code true} after
// precedence predicates are evaluated.</li>
// <li>{@code null}: if the predicate simplifies to {@code false} after
// precedence predicates are evaluated.</li>
// <li>{@code this}: if the semantic context is not changed as a result of
// precedence predicate evaluation.</li>
// <li>A non-{@code null} {@link SemanticContext}: the new simplified
// semantic context after precedence predicates are evaluated.</li>
// </ul>
//


SemanticContext.prototype.evalPrecedence = function (parser, outerContext) {
  return this;
};

SemanticContext.andContext = function (a, b) {
  if (a === null || a === SemanticContext.NONE) {
    return b;
  }

  if (b === null || b === SemanticContext.NONE) {
    return a;
  }

  var result = new AND(a, b);

  if (result.opnds.length === 1) {
    return result.opnds[0];
  } else {
    return result;
  }
};

SemanticContext.orContext = function (a, b) {
  if (a === null) {
    return b;
  }

  if (b === null) {
    return a;
  }

  if (a === SemanticContext.NONE || b === SemanticContext.NONE) {
    return SemanticContext.NONE;
  }

  var result = new OR(a, b);

  if (result.opnds.length === 1) {
    return result.opnds[0];
  } else {
    return result;
  }
};

function Predicate(ruleIndex, predIndex, isCtxDependent) {
  SemanticContext.call(this);
  this.ruleIndex = ruleIndex === undefined ? -1 : ruleIndex;
  this.predIndex = predIndex === undefined ? -1 : predIndex;
  this.isCtxDependent = isCtxDependent === undefined ? false : isCtxDependent; // e.g., $i ref in pred

  return this;
}

Predicate.prototype = Object.create(SemanticContext.prototype);
Predicate.prototype.constructor = Predicate; //The default {@link SemanticContext}, which is semantically equivalent to
//a predicate of the form {@code {true}?}.
//

SemanticContext.NONE = new Predicate();

Predicate.prototype.evaluate = function (parser, outerContext) {
  var localctx = this.isCtxDependent ? outerContext : null;
  return parser.sempred(localctx, this.ruleIndex, this.predIndex);
};

Predicate.prototype.updateHashCode = function (hash) {
  hash.update(this.ruleIndex, this.predIndex, this.isCtxDependent);
};

Predicate.prototype.equals = function (other) {
  if (this === other) {
    return true;
  } else if (!(other instanceof Predicate)) {
    return false;
  } else {
    return this.ruleIndex === other.ruleIndex && this.predIndex === other.predIndex && this.isCtxDependent === other.isCtxDependent;
  }
};

Predicate.prototype.toString = function () {
  return "{" + this.ruleIndex + ":" + this.predIndex + "}?";
};

function PrecedencePredicate(precedence) {
  SemanticContext.call(this);
  this.precedence = precedence === undefined ? 0 : precedence;
}

PrecedencePredicate.prototype = Object.create(SemanticContext.prototype);
PrecedencePredicate.prototype.constructor = PrecedencePredicate;

PrecedencePredicate.prototype.evaluate = function (parser, outerContext) {
  return parser.precpred(outerContext, this.precedence);
};

PrecedencePredicate.prototype.evalPrecedence = function (parser, outerContext) {
  if (parser.precpred(outerContext, this.precedence)) {
    return SemanticContext.NONE;
  } else {
    return null;
  }
};

PrecedencePredicate.prototype.compareTo = function (other) {
  return this.precedence - other.precedence;
};

PrecedencePredicate.prototype.updateHashCode = function (hash) {
  hash.update(31);
};

PrecedencePredicate.prototype.equals = function (other) {
  if (this === other) {
    return true;
  } else if (!(other instanceof PrecedencePredicate)) {
    return false;
  } else {
    return this.precedence === other.precedence;
  }
};

PrecedencePredicate.prototype.toString = function () {
  return "{" + this.precedence + ">=prec}?";
};

PrecedencePredicate.filterPrecedencePredicates = function (set) {
  var result = [];
  set.values().map(function (context) {
    if (context instanceof PrecedencePredicate) {
      result.push(context);
    }
  });
  return result;
}; // A semantic context which is true whenever none of the contained contexts
// is false.
//


function AND(a, b) {
  SemanticContext.call(this);
  var operands = new Set();

  if (a instanceof AND) {
    a.opnds.map(function (o) {
      operands.add(o);
    });
  } else {
    operands.add(a);
  }

  if (b instanceof AND) {
    b.opnds.map(function (o) {
      operands.add(o);
    });
  } else {
    operands.add(b);
  }

  var precedencePredicates = PrecedencePredicate.filterPrecedencePredicates(operands);

  if (precedencePredicates.length > 0) {
    // interested in the transition with the lowest precedence
    var reduced = null;
    precedencePredicates.map(function (p) {
      if (reduced === null || p.precedence < reduced.precedence) {
        reduced = p;
      }
    });
    operands.add(reduced);
  }

  this.opnds = operands.values();
  return this;
}

AND.prototype = Object.create(SemanticContext.prototype);
AND.prototype.constructor = AND;

AND.prototype.equals = function (other) {
  if (this === other) {
    return true;
  } else if (!(other instanceof AND)) {
    return false;
  } else {
    return this.opnds === other.opnds;
  }
};

AND.prototype.updateHashCode = function (hash) {
  hash.update(this.opnds, "AND");
}; //
// {@inheritDoc}
//
// <p>
// The evaluation of predicates by this context is short-circuiting, but
// unordered.</p>
//


AND.prototype.evaluate = function (parser, outerContext) {
  for (var i = 0; i < this.opnds.length; i++) {
    if (!this.opnds[i].evaluate(parser, outerContext)) {
      return false;
    }
  }

  return true;
};

AND.prototype.evalPrecedence = function (parser, outerContext) {
  var differs = false;
  var operands = [];

  for (var i = 0; i < this.opnds.length; i++) {
    var context = this.opnds[i];
    var evaluated = context.evalPrecedence(parser, outerContext);
    differs |= evaluated !== context;

    if (evaluated === null) {
      // The AND context is false if any element is false
      return null;
    } else if (evaluated !== SemanticContext.NONE) {
      // Reduce the result by skipping true elements
      operands.push(evaluated);
    }
  }

  if (!differs) {
    return this;
  }

  if (operands.length === 0) {
    // all elements were true, so the AND context is true
    return SemanticContext.NONE;
  }

  var result = null;
  operands.map(function (o) {
    result = result === null ? o : SemanticContext.andContext(result, o);
  });
  return result;
};

AND.prototype.toString = function () {
  var s = "";
  this.opnds.map(function (o) {
    s += "&& " + o.toString();
  });
  return s.length > 3 ? s.slice(3) : s;
}; //
// A semantic context which is true whenever at least one of the contained
// contexts is true.
//


function OR(a, b) {
  SemanticContext.call(this);
  var operands = new Set();

  if (a instanceof OR) {
    a.opnds.map(function (o) {
      operands.add(o);
    });
  } else {
    operands.add(a);
  }

  if (b instanceof OR) {
    b.opnds.map(function (o) {
      operands.add(o);
    });
  } else {
    operands.add(b);
  }

  var precedencePredicates = PrecedencePredicate.filterPrecedencePredicates(operands);

  if (precedencePredicates.length > 0) {
    // interested in the transition with the highest precedence
    var s = precedencePredicates.sort(function (a, b) {
      return a.compareTo(b);
    });
    var reduced = s[s.length - 1];
    operands.add(reduced);
  }

  this.opnds = operands.values();
  return this;
}

OR.prototype = Object.create(SemanticContext.prototype);
OR.prototype.constructor = OR;

OR.prototype.constructor = function (other) {
  if (this === other) {
    return true;
  } else if (!(other instanceof OR)) {
    return false;
  } else {
    return this.opnds === other.opnds;
  }
};

OR.prototype.updateHashCode = function (hash) {
  hash.update(this.opnds, "OR");
}; // <p>
// The evaluation of predicates by this context is short-circuiting, but
// unordered.</p>
//


OR.prototype.evaluate = function (parser, outerContext) {
  for (var i = 0; i < this.opnds.length; i++) {
    if (this.opnds[i].evaluate(parser, outerContext)) {
      return true;
    }
  }

  return false;
};

OR.prototype.evalPrecedence = function (parser, outerContext) {
  var differs = false;
  var operands = [];

  for (var i = 0; i < this.opnds.length; i++) {
    var context = this.opnds[i];
    var evaluated = context.evalPrecedence(parser, outerContext);
    differs |= evaluated !== context;

    if (evaluated === SemanticContext.NONE) {
      // The OR context is true if any element is true
      return SemanticContext.NONE;
    } else if (evaluated !== null) {
      // Reduce the result by skipping false elements
      operands.push(evaluated);
    }
  }

  if (!differs) {
    return this;
  }

  if (operands.length === 0) {
    // all elements were false, so the OR context is false
    return null;
  }

  var result = null;
  operands.map(function (o) {
    return result === null ? o : SemanticContext.orContext(result, o);
  });
  return result;
};

OR.prototype.toString = function () {
  var s = "";
  this.opnds.map(function (o) {
    s += "|| " + o.toString();
  });
  return s.length > 3 ? s.slice(3) : s;
};

exports.SemanticContext = SemanticContext;
exports.PrecedencePredicate = PrecedencePredicate;
exports.Predicate = Predicate;

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

/* Copyright (c) 2012-2017 The ANTLR Project. All rights reserved.
 * Use of this file is governed by the BSD 3-clause license that
 * can be found in the LICENSE.txt file in the project root.
 */

/*jslint smarttabs:true */
var Token = __webpack_require__(9).Token;
/* stop is not included! */


function Interval(start, stop) {
  this.start = start;
  this.stop = stop;
  return this;
}

Interval.prototype.contains = function (item) {
  return item >= this.start && item < this.stop;
};

Interval.prototype.toString = function () {
  if (this.start === this.stop - 1) {
    return this.start.toString();
  } else {
    return this.start.toString() + ".." + (this.stop - 1).toString();
  }
};

Object.defineProperty(Interval.prototype, "length", {
  get: function get() {
    return this.stop - this.start;
  }
});

function IntervalSet() {
  this.intervals = null;
  this.readOnly = false;
}

IntervalSet.prototype.first = function (v) {
  if (this.intervals === null || this.intervals.length === 0) {
    return Token.INVALID_TYPE;
  } else {
    return this.intervals[0].start;
  }
};

IntervalSet.prototype.addOne = function (v) {
  this.addInterval(new Interval(v, v + 1));
};

IntervalSet.prototype.addRange = function (l, h) {
  this.addInterval(new Interval(l, h + 1));
};

IntervalSet.prototype.addInterval = function (v) {
  if (this.intervals === null) {
    this.intervals = [];
    this.intervals.push(v);
  } else {
    // find insert pos
    for (var k = 0; k < this.intervals.length; k++) {
      var i = this.intervals[k]; // distinct range -> insert

      if (v.stop < i.start) {
        this.intervals.splice(k, 0, v);
        return;
      } // contiguous range -> adjust
      else if (v.stop === i.start) {
          this.intervals[k].start = v.start;
          return;
        } // overlapping range -> adjust and reduce
        else if (v.start <= i.stop) {
            this.intervals[k] = new Interval(Math.min(i.start, v.start), Math.max(i.stop, v.stop));
            this.reduce(k);
            return;
          }
    } // greater than any existing


    this.intervals.push(v);
  }
};

IntervalSet.prototype.addSet = function (other) {
  if (other.intervals !== null) {
    for (var k = 0; k < other.intervals.length; k++) {
      var i = other.intervals[k];
      this.addInterval(new Interval(i.start, i.stop));
    }
  }

  return this;
};

IntervalSet.prototype.reduce = function (k) {
  // only need to reduce if k is not the last
  if (k < this.intervalslength - 1) {
    var l = this.intervals[k];
    var r = this.intervals[k + 1]; // if r contained in l

    if (l.stop >= r.stop) {
      this.intervals.pop(k + 1);
      this.reduce(k);
    } else if (l.stop >= r.start) {
      this.intervals[k] = new Interval(l.start, r.stop);
      this.intervals.pop(k + 1);
    }
  }
};

IntervalSet.prototype.complement = function (start, stop) {
  var result = new IntervalSet();
  result.addInterval(new Interval(start, stop + 1));

  for (var i = 0; i < this.intervals.length; i++) {
    result.removeRange(this.intervals[i]);
  }

  return result;
};

IntervalSet.prototype.contains = function (item) {
  if (this.intervals === null) {
    return false;
  } else {
    for (var k = 0; k < this.intervals.length; k++) {
      if (this.intervals[k].contains(item)) {
        return true;
      }
    }

    return false;
  }
};

Object.defineProperty(IntervalSet.prototype, "length", {
  get: function get() {
    var len = 0;
    this.intervals.map(function (i) {
      len += i.length;
    });
    return len;
  }
});

IntervalSet.prototype.removeRange = function (v) {
  if (v.start === v.stop - 1) {
    this.removeOne(v.start);
  } else if (this.intervals !== null) {
    var k = 0;

    for (var n = 0; n < this.intervals.length; n++) {
      var i = this.intervals[k]; // intervals are ordered

      if (v.stop <= i.start) {
        return;
      } // check for including range, split it
      else if (v.start > i.start && v.stop < i.stop) {
          this.intervals[k] = new Interval(i.start, v.start);
          var x = new Interval(v.stop, i.stop);
          this.intervals.splice(k, 0, x);
          return;
        } // check for included range, remove it
        else if (v.start <= i.start && v.stop >= i.stop) {
            this.intervals.splice(k, 1);
            k = k - 1; // need another pass
          } // check for lower boundary
          else if (v.start < i.stop) {
              this.intervals[k] = new Interval(i.start, v.start);
            } // check for upper boundary
            else if (v.stop < i.stop) {
                this.intervals[k] = new Interval(v.stop, i.stop);
              }

      k += 1;
    }
  }
};

IntervalSet.prototype.removeOne = function (v) {
  if (this.intervals !== null) {
    for (var k = 0; k < this.intervals.length; k++) {
      var i = this.intervals[k]; // intervals is ordered

      if (v < i.start) {
        return;
      } // check for single value range
      else if (v === i.start && v === i.stop - 1) {
          this.intervals.splice(k, 1);
          return;
        } // check for lower boundary
        else if (v === i.start) {
            this.intervals[k] = new Interval(i.start + 1, i.stop);
            return;
          } // check for upper boundary
          else if (v === i.stop - 1) {
              this.intervals[k] = new Interval(i.start, i.stop - 1);
              return;
            } // split existing range
            else if (v < i.stop - 1) {
                var x = new Interval(i.start, v);
                i.start = v + 1;
                this.intervals.splice(k, 0, x);
                return;
              }
    }
  }
};

IntervalSet.prototype.toString = function (literalNames, symbolicNames, elemsAreChar) {
  literalNames = literalNames || null;
  symbolicNames = symbolicNames || null;
  elemsAreChar = elemsAreChar || false;

  if (this.intervals === null) {
    return "{}";
  } else if (literalNames !== null || symbolicNames !== null) {
    return this.toTokenString(literalNames, symbolicNames);
  } else if (elemsAreChar) {
    return this.toCharString();
  } else {
    return this.toIndexString();
  }
};

IntervalSet.prototype.toCharString = function () {
  var names = [];

  for (var i = 0; i < this.intervals.length; i++) {
    var v = this.intervals[i];

    if (v.stop === v.start + 1) {
      if (v.start === Token.EOF) {
        names.push("<EOF>");
      } else {
        names.push("'" + String.fromCharCode(v.start) + "'");
      }
    } else {
      names.push("'" + String.fromCharCode(v.start) + "'..'" + String.fromCharCode(v.stop - 1) + "'");
    }
  }

  if (names.length > 1) {
    return "{" + names.join(", ") + "}";
  } else {
    return names[0];
  }
};

IntervalSet.prototype.toIndexString = function () {
  var names = [];

  for (var i = 0; i < this.intervals.length; i++) {
    var v = this.intervals[i];

    if (v.stop === v.start + 1) {
      if (v.start === Token.EOF) {
        names.push("<EOF>");
      } else {
        names.push(v.start.toString());
      }
    } else {
      names.push(v.start.toString() + ".." + (v.stop - 1).toString());
    }
  }

  if (names.length > 1) {
    return "{" + names.join(", ") + "}";
  } else {
    return names[0];
  }
};

IntervalSet.prototype.toTokenString = function (literalNames, symbolicNames) {
  var names = [];

  for (var i = 0; i < this.intervals.length; i++) {
    var v = this.intervals[i];

    for (var j = v.start; j < v.stop; j++) {
      names.push(this.elementName(literalNames, symbolicNames, j));
    }
  }

  if (names.length > 1) {
    return "{" + names.join(", ") + "}";
  } else {
    return names[0];
  }
};

IntervalSet.prototype.elementName = function (literalNames, symbolicNames, a) {
  if (a === Token.EOF) {
    return "<EOF>";
  } else if (a === Token.EPSILON) {
    return "<EPSILON>";
  } else {
    return literalNames[a] || symbolicNames[a];
  }
};

exports.Interval = Interval;
exports.IntervalSet = IntervalSet;

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

/* Copyright (c) 2012-2017 The ANTLR Project. All rights reserved.
 * Use of this file is governed by the BSD 3-clause license that
 * can be found in the LICENSE.txt file in the project root.
 */
//
//  An ATN transition between any two ATN states.  Subclasses define
//  atom, set, epsilon, action, predicate, rule transitions.
//
//  <p>This is a one way link.  It emanates from a state (usually via a list of
//  transitions) and has a target state.</p>
//
//  <p>Since we never have to change the ATN transitions once we construct it,
//  we can fix these transitions as specific classes. The DFA transitions
//  on the other hand need to update the labels as it adds transitions to
//  the states. We'll use the term Edge for the DFA to distinguish them from
//  ATN transitions.</p>
var Token = __webpack_require__(9).Token;

var Interval = __webpack_require__(13).Interval;

var IntervalSet = __webpack_require__(13).IntervalSet;

var Predicate = __webpack_require__(12).Predicate;

var PrecedencePredicate = __webpack_require__(12).PrecedencePredicate;

function Transition(target) {
  // The target of this transition.
  if (target === undefined || target === null) {
    throw "target cannot be null.";
  }

  this.target = target; // Are we epsilon, action, sempred?

  this.isEpsilon = false;
  this.label = null;
  return this;
} // constants for serialization


Transition.EPSILON = 1;
Transition.RANGE = 2;
Transition.RULE = 3;
Transition.PREDICATE = 4; // e.g., {isType(input.LT(1))}?

Transition.ATOM = 5;
Transition.ACTION = 6;
Transition.SET = 7; // ~(A|B) or ~atom, wildcard, which convert to next 2

Transition.NOT_SET = 8;
Transition.WILDCARD = 9;
Transition.PRECEDENCE = 10;
Transition.serializationNames = ["INVALID", "EPSILON", "RANGE", "RULE", "PREDICATE", "ATOM", "ACTION", "SET", "NOT_SET", "WILDCARD", "PRECEDENCE"];
Transition.serializationTypes = {
  EpsilonTransition: Transition.EPSILON,
  RangeTransition: Transition.RANGE,
  RuleTransition: Transition.RULE,
  PredicateTransition: Transition.PREDICATE,
  AtomTransition: Transition.ATOM,
  ActionTransition: Transition.ACTION,
  SetTransition: Transition.SET,
  NotSetTransition: Transition.NOT_SET,
  WildcardTransition: Transition.WILDCARD,
  PrecedencePredicateTransition: Transition.PRECEDENCE
}; // TODO: make all transitions sets? no, should remove set edges

function AtomTransition(target, label) {
  Transition.call(this, target);
  this.label_ = label; // The token type or character value; or, signifies special label.

  this.label = this.makeLabel();
  this.serializationType = Transition.ATOM;
  return this;
}

AtomTransition.prototype = Object.create(Transition.prototype);
AtomTransition.prototype.constructor = AtomTransition;

AtomTransition.prototype.makeLabel = function () {
  var s = new IntervalSet();
  s.addOne(this.label_);
  return s;
};

AtomTransition.prototype.matches = function (symbol, minVocabSymbol, maxVocabSymbol) {
  return this.label_ === symbol;
};

AtomTransition.prototype.toString = function () {
  return this.label_;
};

function RuleTransition(ruleStart, ruleIndex, precedence, followState) {
  Transition.call(this, ruleStart);
  this.ruleIndex = ruleIndex; // ptr to the rule definition object for this rule ref

  this.precedence = precedence;
  this.followState = followState; // what node to begin computations following ref to rule

  this.serializationType = Transition.RULE;
  this.isEpsilon = true;
  return this;
}

RuleTransition.prototype = Object.create(Transition.prototype);
RuleTransition.prototype.constructor = RuleTransition;

RuleTransition.prototype.matches = function (symbol, minVocabSymbol, maxVocabSymbol) {
  return false;
};

function EpsilonTransition(target, outermostPrecedenceReturn) {
  Transition.call(this, target);
  this.serializationType = Transition.EPSILON;
  this.isEpsilon = true;
  this.outermostPrecedenceReturn = outermostPrecedenceReturn;
  return this;
}

EpsilonTransition.prototype = Object.create(Transition.prototype);
EpsilonTransition.prototype.constructor = EpsilonTransition;

EpsilonTransition.prototype.matches = function (symbol, minVocabSymbol, maxVocabSymbol) {
  return false;
};

EpsilonTransition.prototype.toString = function () {
  return "epsilon";
};

function RangeTransition(target, start, stop) {
  Transition.call(this, target);
  this.serializationType = Transition.RANGE;
  this.start = start;
  this.stop = stop;
  this.label = this.makeLabel();
  return this;
}

RangeTransition.prototype = Object.create(Transition.prototype);
RangeTransition.prototype.constructor = RangeTransition;

RangeTransition.prototype.makeLabel = function () {
  var s = new IntervalSet();
  s.addRange(this.start, this.stop);
  return s;
};

RangeTransition.prototype.matches = function (symbol, minVocabSymbol, maxVocabSymbol) {
  return symbol >= this.start && symbol <= this.stop;
};

RangeTransition.prototype.toString = function () {
  return "'" + String.fromCharCode(this.start) + "'..'" + String.fromCharCode(this.stop) + "'";
};

function AbstractPredicateTransition(target) {
  Transition.call(this, target);
  return this;
}

AbstractPredicateTransition.prototype = Object.create(Transition.prototype);
AbstractPredicateTransition.prototype.constructor = AbstractPredicateTransition;

function PredicateTransition(target, ruleIndex, predIndex, isCtxDependent) {
  AbstractPredicateTransition.call(this, target);
  this.serializationType = Transition.PREDICATE;
  this.ruleIndex = ruleIndex;
  this.predIndex = predIndex;
  this.isCtxDependent = isCtxDependent; // e.g., $i ref in pred

  this.isEpsilon = true;
  return this;
}

PredicateTransition.prototype = Object.create(AbstractPredicateTransition.prototype);
PredicateTransition.prototype.constructor = PredicateTransition;

PredicateTransition.prototype.matches = function (symbol, minVocabSymbol, maxVocabSymbol) {
  return false;
};

PredicateTransition.prototype.getPredicate = function () {
  return new Predicate(this.ruleIndex, this.predIndex, this.isCtxDependent);
};

PredicateTransition.prototype.toString = function () {
  return "pred_" + this.ruleIndex + ":" + this.predIndex;
};

function ActionTransition(target, ruleIndex, actionIndex, isCtxDependent) {
  Transition.call(this, target);
  this.serializationType = Transition.ACTION;
  this.ruleIndex = ruleIndex;
  this.actionIndex = actionIndex === undefined ? -1 : actionIndex;
  this.isCtxDependent = isCtxDependent === undefined ? false : isCtxDependent; // e.g., $i ref in pred

  this.isEpsilon = true;
  return this;
}

ActionTransition.prototype = Object.create(Transition.prototype);
ActionTransition.prototype.constructor = ActionTransition;

ActionTransition.prototype.matches = function (symbol, minVocabSymbol, maxVocabSymbol) {
  return false;
};

ActionTransition.prototype.toString = function () {
  return "action_" + this.ruleIndex + ":" + this.actionIndex;
}; // A transition containing a set of values.


function SetTransition(target, set) {
  Transition.call(this, target);
  this.serializationType = Transition.SET;

  if (set !== undefined && set !== null) {
    this.label = set;
  } else {
    this.label = new IntervalSet();
    this.label.addOne(Token.INVALID_TYPE);
  }

  return this;
}

SetTransition.prototype = Object.create(Transition.prototype);
SetTransition.prototype.constructor = SetTransition;

SetTransition.prototype.matches = function (symbol, minVocabSymbol, maxVocabSymbol) {
  return this.label.contains(symbol);
};

SetTransition.prototype.toString = function () {
  return this.label.toString();
};

function NotSetTransition(target, set) {
  SetTransition.call(this, target, set);
  this.serializationType = Transition.NOT_SET;
  return this;
}

NotSetTransition.prototype = Object.create(SetTransition.prototype);
NotSetTransition.prototype.constructor = NotSetTransition;

NotSetTransition.prototype.matches = function (symbol, minVocabSymbol, maxVocabSymbol) {
  return symbol >= minVocabSymbol && symbol <= maxVocabSymbol && !SetTransition.prototype.matches.call(this, symbol, minVocabSymbol, maxVocabSymbol);
};

NotSetTransition.prototype.toString = function () {
  return '~' + SetTransition.prototype.toString.call(this);
};

function WildcardTransition(target) {
  Transition.call(this, target);
  this.serializationType = Transition.WILDCARD;
  return this;
}

WildcardTransition.prototype = Object.create(Transition.prototype);
WildcardTransition.prototype.constructor = WildcardTransition;

WildcardTransition.prototype.matches = function (symbol, minVocabSymbol, maxVocabSymbol) {
  return symbol >= minVocabSymbol && symbol <= maxVocabSymbol;
};

WildcardTransition.prototype.toString = function () {
  return ".";
};

function PrecedencePredicateTransition(target, precedence) {
  AbstractPredicateTransition.call(this, target);
  this.serializationType = Transition.PRECEDENCE;
  this.precedence = precedence;
  this.isEpsilon = true;
  return this;
}

PrecedencePredicateTransition.prototype = Object.create(AbstractPredicateTransition.prototype);
PrecedencePredicateTransition.prototype.constructor = PrecedencePredicateTransition;

PrecedencePredicateTransition.prototype.matches = function (symbol, minVocabSymbol, maxVocabSymbol) {
  return false;
};

PrecedencePredicateTransition.prototype.getPredicate = function () {
  return new PrecedencePredicate(this.precedence);
};

PrecedencePredicateTransition.prototype.toString = function () {
  return this.precedence + " >= _p";
};

exports.Transition = Transition;
exports.AtomTransition = AtomTransition;
exports.SetTransition = SetTransition;
exports.NotSetTransition = NotSetTransition;
exports.RuleTransition = RuleTransition;
exports.ActionTransition = ActionTransition;
exports.EpsilonTransition = EpsilonTransition;
exports.RangeTransition = RangeTransition;
exports.WildcardTransition = WildcardTransition;
exports.PredicateTransition = PredicateTransition;
exports.PrecedencePredicateTransition = PrecedencePredicateTransition;
exports.AbstractPredicateTransition = AbstractPredicateTransition;

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

//

/* Copyright (c) 2012-2017 The ANTLR Project. All rights reserved.
 * Use of this file is governed by the BSD 3-clause license that
 * can be found in the LICENSE.txt file in the project root.
 */
///
var RuleContext = __webpack_require__(16).RuleContext;

var Hash = __webpack_require__(8).Hash;

var Map = __webpack_require__(8).Map;

function PredictionContext(cachedHashCode) {
  this.cachedHashCode = cachedHashCode;
} // Represents {@code $} in local context prediction, which means wildcard.
// {@code//+x =//}.
// /


PredictionContext.EMPTY = null; // Represents {@code $} in an array in full context mode, when {@code $}
// doesn't mean wildcard: {@code $ + x = [$,x]}. Here,
// {@code $} = {@link //EMPTY_RETURN_STATE}.
// /

PredictionContext.EMPTY_RETURN_STATE = 0x7FFFFFFF;
PredictionContext.globalNodeCount = 1;
PredictionContext.id = PredictionContext.globalNodeCount; // Stores the computed hash code of this {@link PredictionContext}. The hash
// code is computed in parts to match the following reference algorithm.
//
// <pre>
// private int referenceHashCode() {
// int hash = {@link MurmurHash//initialize MurmurHash.initialize}({@link
// //INITIAL_HASH});
//
// for (int i = 0; i &lt; {@link //size()}; i++) {
// hash = {@link MurmurHash//update MurmurHash.update}(hash, {@link //getParent
// getParent}(i));
// }
//
// for (int i = 0; i &lt; {@link //size()}; i++) {
// hash = {@link MurmurHash//update MurmurHash.update}(hash, {@link
// //getReturnState getReturnState}(i));
// }
//
// hash = {@link MurmurHash//finish MurmurHash.finish}(hash, 2// {@link
// //size()});
// return hash;
// }
// </pre>
// /
// This means only the {@link //EMPTY} context is in set.

PredictionContext.prototype.isEmpty = function () {
  return this === PredictionContext.EMPTY;
};

PredictionContext.prototype.hasEmptyPath = function () {
  return this.getReturnState(this.length - 1) === PredictionContext.EMPTY_RETURN_STATE;
};

PredictionContext.prototype.hashCode = function () {
  return this.cachedHashCode;
};

PredictionContext.prototype.updateHashCode = function (hash) {
  hash.update(this.cachedHashCode);
};
/*
function calculateHashString(parent, returnState) {
	return "" + parent + returnState;
}
*/
// Used to cache {@link PredictionContext} objects. Its used for the shared
// context cash associated with contexts in DFA states. This cache
// can be used for both lexers and parsers.


function PredictionContextCache() {
  this.cache = new Map();
  return this;
} // Add a context to the cache and return it. If the context already exists,
// return that one instead and do not add a new context to the cache.
// Protect shared cache from unsafe thread access.
//


PredictionContextCache.prototype.add = function (ctx) {
  if (ctx === PredictionContext.EMPTY) {
    return PredictionContext.EMPTY;
  }

  var existing = this.cache.get(ctx) || null;

  if (existing !== null) {
    return existing;
  }

  this.cache.put(ctx, ctx);
  return ctx;
};

PredictionContextCache.prototype.get = function (ctx) {
  return this.cache.get(ctx) || null;
};

Object.defineProperty(PredictionContextCache.prototype, "length", {
  get: function get() {
    return this.cache.length;
  }
});

function SingletonPredictionContext(parent, returnState) {
  var hashCode = 0;
  var hash = new Hash();

  if (parent !== null) {
    hash.update(parent, returnState);
  } else {
    hash.update(1);
  }

  hashCode = hash.finish();
  PredictionContext.call(this, hashCode);
  this.parentCtx = parent;
  this.returnState = returnState;
}

SingletonPredictionContext.prototype = Object.create(PredictionContext.prototype);
SingletonPredictionContext.prototype.contructor = SingletonPredictionContext;

SingletonPredictionContext.create = function (parent, returnState) {
  if (returnState === PredictionContext.EMPTY_RETURN_STATE && parent === null) {
    // someone can pass in the bits of an array ctx that mean $
    return PredictionContext.EMPTY;
  } else {
    return new SingletonPredictionContext(parent, returnState);
  }
};

Object.defineProperty(SingletonPredictionContext.prototype, "length", {
  get: function get() {
    return 1;
  }
});

SingletonPredictionContext.prototype.getParent = function (index) {
  return this.parentCtx;
};

SingletonPredictionContext.prototype.getReturnState = function (index) {
  return this.returnState;
};

SingletonPredictionContext.prototype.equals = function (other) {
  if (this === other) {
    return true;
  } else if (!(other instanceof SingletonPredictionContext)) {
    return false;
  } else if (this.hashCode() !== other.hashCode()) {
    return false; // can't be same if hash is different
  } else {
    if (this.returnState !== other.returnState) return false;else if (this.parentCtx == null) return other.parentCtx == null;else return this.parentCtx.equals(other.parentCtx);
  }
};

SingletonPredictionContext.prototype.toString = function () {
  var up = this.parentCtx === null ? "" : this.parentCtx.toString();

  if (up.length === 0) {
    if (this.returnState === PredictionContext.EMPTY_RETURN_STATE) {
      return "$";
    } else {
      return "" + this.returnState;
    }
  } else {
    return "" + this.returnState + " " + up;
  }
};

function EmptyPredictionContext() {
  SingletonPredictionContext.call(this, null, PredictionContext.EMPTY_RETURN_STATE);
  return this;
}

EmptyPredictionContext.prototype = Object.create(SingletonPredictionContext.prototype);
EmptyPredictionContext.prototype.constructor = EmptyPredictionContext;

EmptyPredictionContext.prototype.isEmpty = function () {
  return true;
};

EmptyPredictionContext.prototype.getParent = function (index) {
  return null;
};

EmptyPredictionContext.prototype.getReturnState = function (index) {
  return this.returnState;
};

EmptyPredictionContext.prototype.equals = function (other) {
  return this === other;
};

EmptyPredictionContext.prototype.toString = function () {
  return "$";
};

PredictionContext.EMPTY = new EmptyPredictionContext();

function ArrayPredictionContext(parents, returnStates) {
  // Parent can be null only if full ctx mode and we make an array
  // from {@link //EMPTY} and non-empty. We merge {@link //EMPTY} by using
  // null parent and
  // returnState == {@link //EMPTY_RETURN_STATE}.
  var h = new Hash();
  h.update(parents, returnStates);
  var hashCode = h.finish();
  PredictionContext.call(this, hashCode);
  this.parents = parents;
  this.returnStates = returnStates;
  return this;
}

ArrayPredictionContext.prototype = Object.create(PredictionContext.prototype);
ArrayPredictionContext.prototype.constructor = ArrayPredictionContext;

ArrayPredictionContext.prototype.isEmpty = function () {
  // since EMPTY_RETURN_STATE can only appear in the last position, we
  // don't need to verify that size==1
  return this.returnStates[0] === PredictionContext.EMPTY_RETURN_STATE;
};

Object.defineProperty(ArrayPredictionContext.prototype, "length", {
  get: function get() {
    return this.returnStates.length;
  }
});

ArrayPredictionContext.prototype.getParent = function (index) {
  return this.parents[index];
};

ArrayPredictionContext.prototype.getReturnState = function (index) {
  return this.returnStates[index];
};

ArrayPredictionContext.prototype.equals = function (other) {
  if (this === other) {
    return true;
  } else if (!(other instanceof ArrayPredictionContext)) {
    return false;
  } else if (this.hashCode() !== other.hashCode()) {
    return false; // can't be same if hash is different
  } else {
    return this.returnStates === other.returnStates && this.parents === other.parents;
  }
};

ArrayPredictionContext.prototype.toString = function () {
  if (this.isEmpty()) {
    return "[]";
  } else {
    var s = "[";

    for (var i = 0; i < this.returnStates.length; i++) {
      if (i > 0) {
        s = s + ", ";
      }

      if (this.returnStates[i] === PredictionContext.EMPTY_RETURN_STATE) {
        s = s + "$";
        continue;
      }

      s = s + this.returnStates[i];

      if (this.parents[i] !== null) {
        s = s + " " + this.parents[i];
      } else {
        s = s + "null";
      }
    }

    return s + "]";
  }
}; // Convert a {@link RuleContext} tree to a {@link PredictionContext} graph.
// Return {@link //EMPTY} if {@code outerContext} is empty or null.
// /


function predictionContextFromRuleContext(atn, outerContext) {
  if (outerContext === undefined || outerContext === null) {
    outerContext = RuleContext.EMPTY;
  } // if we are in RuleContext of start rule, s, then PredictionContext
  // is EMPTY. Nobody called us. (if we are empty, return empty)


  if (outerContext.parentCtx === null || outerContext === RuleContext.EMPTY) {
    return PredictionContext.EMPTY;
  } // If we have a parent, convert it to a PredictionContext graph


  var parent = predictionContextFromRuleContext(atn, outerContext.parentCtx);
  var state = atn.states[outerContext.invokingState];
  var transition = state.transitions[0];
  return SingletonPredictionContext.create(parent, transition.followState.stateNumber);
}
/*
function calculateListsHashString(parents, returnStates) {
	var s = "";
	parents.map(function(p) {
		s = s + p;
	});
	returnStates.map(function(r) {
		s = s + r;
	});
	return s;
}
*/


function merge(a, b, rootIsWildcard, mergeCache) {
  // share same graph if both same
  if (a === b) {
    return a;
  }

  if (a instanceof SingletonPredictionContext && b instanceof SingletonPredictionContext) {
    return mergeSingletons(a, b, rootIsWildcard, mergeCache);
  } // At least one of a or b is array
  // If one is $ and rootIsWildcard, return $ as// wildcard


  if (rootIsWildcard) {
    if (a instanceof EmptyPredictionContext) {
      return a;
    }

    if (b instanceof EmptyPredictionContext) {
      return b;
    }
  } // convert singleton so both are arrays to normalize


  if (a instanceof SingletonPredictionContext) {
    a = new ArrayPredictionContext([a.getParent()], [a.returnState]);
  }

  if (b instanceof SingletonPredictionContext) {
    b = new ArrayPredictionContext([b.getParent()], [b.returnState]);
  }

  return mergeArrays(a, b, rootIsWildcard, mergeCache);
} //
// Merge two {@link SingletonPredictionContext} instances.
//
// <p>Stack tops equal, parents merge is same; return left graph.<br>
// <embed src="images/SingletonMerge_SameRootSamePar.svg"
// type="image/svg+xml"/></p>
//
// <p>Same stack top, parents differ; merge parents giving array node, then
// remainders of those graphs. A new root node is created to point to the
// merged parents.<br>
// <embed src="images/SingletonMerge_SameRootDiffPar.svg"
// type="image/svg+xml"/></p>
//
// <p>Different stack tops pointing to same parent. Make array node for the
// root where both element in the root point to the same (original)
// parent.<br>
// <embed src="images/SingletonMerge_DiffRootSamePar.svg"
// type="image/svg+xml"/></p>
//
// <p>Different stack tops pointing to different parents. Make array node for
// the root where each element points to the corresponding original
// parent.<br>
// <embed src="images/SingletonMerge_DiffRootDiffPar.svg"
// type="image/svg+xml"/></p>
//
// @param a the first {@link SingletonPredictionContext}
// @param b the second {@link SingletonPredictionContext}
// @param rootIsWildcard {@code true} if this is a local-context merge,
// otherwise false to indicate a full-context merge
// @param mergeCache
// /


function mergeSingletons(a, b, rootIsWildcard, mergeCache) {
  if (mergeCache !== null) {
    var previous = mergeCache.get(a, b);

    if (previous !== null) {
      return previous;
    }

    previous = mergeCache.get(b, a);

    if (previous !== null) {
      return previous;
    }
  }

  var rootMerge = mergeRoot(a, b, rootIsWildcard);

  if (rootMerge !== null) {
    if (mergeCache !== null) {
      mergeCache.set(a, b, rootMerge);
    }

    return rootMerge;
  }

  if (a.returnState === b.returnState) {
    var parent = merge(a.parentCtx, b.parentCtx, rootIsWildcard, mergeCache); // if parent is same as existing a or b parent or reduced to a parent,
    // return it

    if (parent === a.parentCtx) {
      return a; // ax + bx = ax, if a=b
    }

    if (parent === b.parentCtx) {
      return b; // ax + bx = bx, if a=b
    } // else: ax + ay = a'[x,y]
    // merge parents x and y, giving array node with x,y then remainders
    // of those graphs. dup a, a' points at merged array
    // new joined parent so create new singleton pointing to it, a'


    var spc = SingletonPredictionContext.create(parent, a.returnState);

    if (mergeCache !== null) {
      mergeCache.set(a, b, spc);
    }

    return spc;
  } else {
    // a != b payloads differ
    // see if we can collapse parents due to $+x parents if local ctx
    var singleParent = null;

    if (a === b || a.parentCtx !== null && a.parentCtx === b.parentCtx) {
      // ax +
      // bx =
      // [a,b]x
      singleParent = a.parentCtx;
    }

    if (singleParent !== null) {
      // parents are same
      // sort payloads and use same parent
      var payloads = [a.returnState, b.returnState];

      if (a.returnState > b.returnState) {
        payloads[0] = b.returnState;
        payloads[1] = a.returnState;
      }

      var parents = [singleParent, singleParent];
      var apc = new ArrayPredictionContext(parents, payloads);

      if (mergeCache !== null) {
        mergeCache.set(a, b, apc);
      }

      return apc;
    } // parents differ and can't merge them. Just pack together
    // into array; can't merge.
    // ax + by = [ax,by]


    var payloads = [a.returnState, b.returnState];
    var parents = [a.parentCtx, b.parentCtx];

    if (a.returnState > b.returnState) {
      // sort by payload
      payloads[0] = b.returnState;
      payloads[1] = a.returnState;
      parents = [b.parentCtx, a.parentCtx];
    }

    var a_ = new ArrayPredictionContext(parents, payloads);

    if (mergeCache !== null) {
      mergeCache.set(a, b, a_);
    }

    return a_;
  }
} //
// Handle case where at least one of {@code a} or {@code b} is
// {@link //EMPTY}. In the following diagrams, the symbol {@code $} is used
// to represent {@link //EMPTY}.
//
// <h2>Local-Context Merges</h2>
//
// <p>These local-context merge operations are used when {@code rootIsWildcard}
// is true.</p>
//
// <p>{@link //EMPTY} is superset of any graph; return {@link //EMPTY}.<br>
// <embed src="images/LocalMerge_EmptyRoot.svg" type="image/svg+xml"/></p>
//
// <p>{@link //EMPTY} and anything is {@code //EMPTY}, so merged parent is
// {@code //EMPTY}; return left graph.<br>
// <embed src="images/LocalMerge_EmptyParent.svg" type="image/svg+xml"/></p>
//
// <p>Special case of last merge if local context.<br>
// <embed src="images/LocalMerge_DiffRoots.svg" type="image/svg+xml"/></p>
//
// <h2>Full-Context Merges</h2>
//
// <p>These full-context merge operations are used when {@code rootIsWildcard}
// is false.</p>
//
// <p><embed src="images/FullMerge_EmptyRoots.svg" type="image/svg+xml"/></p>
//
// <p>Must keep all contexts; {@link //EMPTY} in array is a special value (and
// null parent).<br>
// <embed src="images/FullMerge_EmptyRoot.svg" type="image/svg+xml"/></p>
//
// <p><embed src="images/FullMerge_SameRoot.svg" type="image/svg+xml"/></p>
//
// @param a the first {@link SingletonPredictionContext}
// @param b the second {@link SingletonPredictionContext}
// @param rootIsWildcard {@code true} if this is a local-context merge,
// otherwise false to indicate a full-context merge
// /


function mergeRoot(a, b, rootIsWildcard) {
  if (rootIsWildcard) {
    if (a === PredictionContext.EMPTY) {
      return PredictionContext.EMPTY; // // + b =//
    }

    if (b === PredictionContext.EMPTY) {
      return PredictionContext.EMPTY; // a +// =//
    }
  } else {
    if (a === PredictionContext.EMPTY && b === PredictionContext.EMPTY) {
      return PredictionContext.EMPTY; // $ + $ = $
    } else if (a === PredictionContext.EMPTY) {
      // $ + x = [$,x]
      var payloads = [b.returnState, PredictionContext.EMPTY_RETURN_STATE];
      var parents = [b.parentCtx, null];
      return new ArrayPredictionContext(parents, payloads);
    } else if (b === PredictionContext.EMPTY) {
      // x + $ = [$,x] ($ is always first if present)
      var payloads = [a.returnState, PredictionContext.EMPTY_RETURN_STATE];
      var parents = [a.parentCtx, null];
      return new ArrayPredictionContext(parents, payloads);
    }
  }

  return null;
} //
// Merge two {@link ArrayPredictionContext} instances.
//
// <p>Different tops, different parents.<br>
// <embed src="images/ArrayMerge_DiffTopDiffPar.svg" type="image/svg+xml"/></p>
//
// <p>Shared top, same parents.<br>
// <embed src="images/ArrayMerge_ShareTopSamePar.svg" type="image/svg+xml"/></p>
//
// <p>Shared top, different parents.<br>
// <embed src="images/ArrayMerge_ShareTopDiffPar.svg" type="image/svg+xml"/></p>
//
// <p>Shared top, all shared parents.<br>
// <embed src="images/ArrayMerge_ShareTopSharePar.svg"
// type="image/svg+xml"/></p>
//
// <p>Equal tops, merge parents and reduce top to
// {@link SingletonPredictionContext}.<br>
// <embed src="images/ArrayMerge_EqualTop.svg" type="image/svg+xml"/></p>
// /


function mergeArrays(a, b, rootIsWildcard, mergeCache) {
  if (mergeCache !== null) {
    var previous = mergeCache.get(a, b);

    if (previous !== null) {
      return previous;
    }

    previous = mergeCache.get(b, a);

    if (previous !== null) {
      return previous;
    }
  } // merge sorted payloads a + b => M


  var i = 0; // walks a

  var j = 0; // walks b

  var k = 0; // walks target M array

  var mergedReturnStates = [];
  var mergedParents = []; // walk and merge to yield mergedParents, mergedReturnStates

  while (i < a.returnStates.length && j < b.returnStates.length) {
    var a_parent = a.parents[i];
    var b_parent = b.parents[j];

    if (a.returnStates[i] === b.returnStates[j]) {
      // same payload (stack tops are equal), must yield merged singleton
      var payload = a.returnStates[i]; // $+$ = $

      var bothDollars = payload === PredictionContext.EMPTY_RETURN_STATE && a_parent === null && b_parent === null;
      var ax_ax = a_parent !== null && b_parent !== null && a_parent === b_parent; // ax+ax
      // ->
      // ax

      if (bothDollars || ax_ax) {
        mergedParents[k] = a_parent; // choose left

        mergedReturnStates[k] = payload;
      } else {
        // ax+ay -> a'[x,y]
        var mergedParent = merge(a_parent, b_parent, rootIsWildcard, mergeCache);
        mergedParents[k] = mergedParent;
        mergedReturnStates[k] = payload;
      }

      i += 1; // hop over left one as usual

      j += 1; // but also skip one in right side since we merge
    } else if (a.returnStates[i] < b.returnStates[j]) {
      // copy a[i] to M
      mergedParents[k] = a_parent;
      mergedReturnStates[k] = a.returnStates[i];
      i += 1;
    } else {
      // b > a, copy b[j] to M
      mergedParents[k] = b_parent;
      mergedReturnStates[k] = b.returnStates[j];
      j += 1;
    }

    k += 1;
  } // copy over any payloads remaining in either array


  if (i < a.returnStates.length) {
    for (var p = i; p < a.returnStates.length; p++) {
      mergedParents[k] = a.parents[p];
      mergedReturnStates[k] = a.returnStates[p];
      k += 1;
    }
  } else {
    for (var p = j; p < b.returnStates.length; p++) {
      mergedParents[k] = b.parents[p];
      mergedReturnStates[k] = b.returnStates[p];
      k += 1;
    }
  } // trim merged if we combined a few that had same stack tops


  if (k < mergedParents.length) {
    // write index < last position; trim
    if (k === 1) {
      // for just one merged element, return singleton top
      var a_ = SingletonPredictionContext.create(mergedParents[0], mergedReturnStates[0]);

      if (mergeCache !== null) {
        mergeCache.set(a, b, a_);
      }

      return a_;
    }

    mergedParents = mergedParents.slice(0, k);
    mergedReturnStates = mergedReturnStates.slice(0, k);
  }

  var M = new ArrayPredictionContext(mergedParents, mergedReturnStates); // if we created same array as a or b, return that instead
  // TODO: track whether this is possible above during merge sort for speed

  if (M === a) {
    if (mergeCache !== null) {
      mergeCache.set(a, b, a);
    }

    return a;
  }

  if (M === b) {
    if (mergeCache !== null) {
      mergeCache.set(a, b, b);
    }

    return b;
  }

  combineCommonParents(mergedParents);

  if (mergeCache !== null) {
    mergeCache.set(a, b, M);
  }

  return M;
} //
// Make pass over all <em>M</em> {@code parents}; merge any {@code equals()}
// ones.
// /


function combineCommonParents(parents) {
  var uniqueParents = new Map();

  for (var p = 0; p < parents.length; p++) {
    var parent = parents[p];

    if (!uniqueParents.containsKey(parent)) {
      uniqueParents.put(parent, parent);
    }
  }

  for (var q = 0; q < parents.length; q++) {
    parents[q] = uniqueParents.get(parents[q]);
  }
}

function getCachedPredictionContext(context, contextCache, visited) {
  if (context.isEmpty()) {
    return context;
  }

  var existing = visited.get(context) || null;

  if (existing !== null) {
    return existing;
  }

  existing = contextCache.get(context);

  if (existing !== null) {
    visited.put(context, existing);
    return existing;
  }

  var changed = false;
  var parents = [];

  for (var i = 0; i < parents.length; i++) {
    var parent = getCachedPredictionContext(context.getParent(i), contextCache, visited);

    if (changed || parent !== context.getParent(i)) {
      if (!changed) {
        parents = [];

        for (var j = 0; j < context.length; j++) {
          parents[j] = context.getParent(j);
        }

        changed = true;
      }

      parents[i] = parent;
    }
  }

  if (!changed) {
    contextCache.add(context);
    visited.put(context, context);
    return context;
  }

  var updated = null;

  if (parents.length === 0) {
    updated = PredictionContext.EMPTY;
  } else if (parents.length === 1) {
    updated = SingletonPredictionContext.create(parents[0], context.getReturnState(0));
  } else {
    updated = new ArrayPredictionContext(parents, context.returnStates);
  }

  contextCache.add(updated);
  visited.put(updated, updated);
  visited.put(context, updated);
  return updated;
} // ter's recursive version of Sam's getAllNodes()


function getAllContextNodes(context, nodes, visited) {
  if (nodes === null) {
    nodes = [];
    return getAllContextNodes(context, nodes, visited);
  } else if (visited === null) {
    visited = new Map();
    return getAllContextNodes(context, nodes, visited);
  } else {
    if (context === null || visited.containsKey(context)) {
      return nodes;
    }

    visited.put(context, context);
    nodes.push(context);

    for (var i = 0; i < context.length; i++) {
      getAllContextNodes(context.getParent(i), nodes, visited);
    }

    return nodes;
  }
}

exports.merge = merge;
exports.PredictionContext = PredictionContext;
exports.PredictionContextCache = PredictionContextCache;
exports.SingletonPredictionContext = SingletonPredictionContext;
exports.predictionContextFromRuleContext = predictionContextFromRuleContext;
exports.getCachedPredictionContext = getCachedPredictionContext;

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

/* Copyright (c) 2012-2017 The ANTLR Project. All rights reserved.
 * Use of this file is governed by the BSD 3-clause license that
 * can be found in the LICENSE.txt file in the project root.
 */
///
//  A rule context is a record of a single rule invocation. It knows
//  which context invoked it, if any. If there is no parent context, then
//  naturally the invoking state is not valid.  The parent link
//  provides a chain upwards from the current rule invocation to the root
//  of the invocation tree, forming a stack. We actually carry no
//  information about the rule associated with this context (except
//  when parsing). We keep only the state number of the invoking state from
//  the ATN submachine that invoked this. Contrast this with the s
//  pointer inside ParserRuleContext that tracks the current state
//  being "executed" for the current rule.
//
//  The parent contexts are useful for computing lookahead sets and
//  getting error information.
//
//  These objects are used during parsing and prediction.
//  For the special case of parsers, we use the subclass
//  ParserRuleContext.
//
//  @see ParserRuleContext
///
var RuleNode = __webpack_require__(17).RuleNode;

var INVALID_INTERVAL = __webpack_require__(17).INVALID_INTERVAL;

var INVALID_ALT_NUMBER = __webpack_require__(6).INVALID_ALT_NUMBER;

function RuleContext(parent, invokingState) {
  RuleNode.call(this); // What context invoked this rule?

  this.parentCtx = parent || null; // What state invoked the rule associated with this context?
  // The "return address" is the followState of invokingState
  // If parent is null, this should be -1.

  this.invokingState = invokingState || -1;
  return this;
}

RuleContext.prototype = Object.create(RuleNode.prototype);
RuleContext.prototype.constructor = RuleContext;

RuleContext.prototype.depth = function () {
  var n = 0;
  var p = this;

  while (p !== null) {
    p = p.parentCtx;
    n += 1;
  }

  return n;
}; // A context is empty if there is no invoking state; meaning nobody call
// current context.


RuleContext.prototype.isEmpty = function () {
  return this.invokingState === -1;
}; // satisfy the ParseTree / SyntaxTree interface


RuleContext.prototype.getSourceInterval = function () {
  return INVALID_INTERVAL;
};

RuleContext.prototype.getRuleContext = function () {
  return this;
};

RuleContext.prototype.getPayload = function () {
  return this;
}; // Return the combined text of all child nodes. This method only considers
// tokens which have been added to the parse tree.
// <p>
// Since tokens on hidden channels (e.g. whitespace or comments) are not
// added to the parse trees, they will not appear in the output of this
// method.
// /


RuleContext.prototype.getText = function () {
  if (this.getChildCount() === 0) {
    return "";
  } else {
    return this.children.map(function (child) {
      return child.getText();
    }).join("");
  }
}; // For rule associated with this parse tree internal node, return
// the outer alternative number used to match the input. Default
// implementation does not compute nor store this alt num. Create
// a subclass of ParserRuleContext with backing field and set
// option contextSuperClass.
// to set it.


RuleContext.prototype.getAltNumber = function () {
  return INVALID_ALT_NUMBER;
}; // Set the outer alternative number for this context node. Default
// implementation does nothing to avoid backing field overhead for
// trees that don't need it.  Create
// a subclass of ParserRuleContext with backing field and set
// option contextSuperClass.


RuleContext.prototype.setAltNumber = function (altNumber) {};

RuleContext.prototype.getChild = function (i) {
  return null;
};

RuleContext.prototype.getChildCount = function () {
  return 0;
};

RuleContext.prototype.accept = function (visitor) {
  return visitor.visitChildren(this);
}; //need to manage circular dependencies, so export now


exports.RuleContext = RuleContext;

var Trees = __webpack_require__(18).Trees; // Print out a whole tree, not just a node, in LISP format
// (root child1 .. childN). Print just a node if this is a leaf.
//


RuleContext.prototype.toStringTree = function (ruleNames, recog) {
  return Trees.toStringTree(this, ruleNames, recog);
};

RuleContext.prototype.toString = function (ruleNames, stop) {
  ruleNames = ruleNames || null;
  stop = stop || null;
  var p = this;
  var s = "[";

  while (p !== null && p !== stop) {
    if (ruleNames === null) {
      if (!p.isEmpty()) {
        s += p.invokingState;
      }
    } else {
      var ri = p.ruleIndex;
      var ruleName = ri >= 0 && ri < ruleNames.length ? ruleNames[ri] : "" + ri;
      s += ruleName;
    }

    if (p.parentCtx !== null && (ruleNames !== null || !p.parentCtx.isEmpty())) {
      s += " ";
    }

    p = p.parentCtx;
  }

  s += "]";
  return s;
};

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

/* Copyright (c) 2012-2017 The ANTLR Project. All rights reserved.
 * Use of this file is governed by the BSD 3-clause license that
 * can be found in the LICENSE.txt file in the project root.
 */
///
// The basic notion of a tree has a parent, a payload, and a list of children.
//  It is the most abstract interface for all the trees used by ANTLR.
///
var Token = __webpack_require__(9).Token;

var Interval = __webpack_require__(13).Interval;

var INVALID_INTERVAL = new Interval(-1, -2);

var Utils = __webpack_require__(8);

function Tree() {
  return this;
}

function SyntaxTree() {
  Tree.call(this);
  return this;
}

SyntaxTree.prototype = Object.create(Tree.prototype);
SyntaxTree.prototype.constructor = SyntaxTree;

function ParseTree() {
  SyntaxTree.call(this);
  return this;
}

ParseTree.prototype = Object.create(SyntaxTree.prototype);
ParseTree.prototype.constructor = ParseTree;

function RuleNode() {
  ParseTree.call(this);
  return this;
}

RuleNode.prototype = Object.create(ParseTree.prototype);
RuleNode.prototype.constructor = RuleNode;

function TerminalNode() {
  ParseTree.call(this);
  return this;
}

TerminalNode.prototype = Object.create(ParseTree.prototype);
TerminalNode.prototype.constructor = TerminalNode;

function ErrorNode() {
  TerminalNode.call(this);
  return this;
}

ErrorNode.prototype = Object.create(TerminalNode.prototype);
ErrorNode.prototype.constructor = ErrorNode;

function ParseTreeVisitor() {
  return this;
}

ParseTreeVisitor.prototype.visit = function (ctx) {
  if (Array.isArray(ctx)) {
    return ctx.map(function (child) {
      return child.accept(this);
    }, this);
  } else {
    return ctx.accept(this);
  }
};

ParseTreeVisitor.prototype.visitChildren = function (ctx) {
  if (ctx.children) {
    return this.visit(ctx.children);
  } else {
    return null;
  }
};

ParseTreeVisitor.prototype.visitTerminal = function (node) {};

ParseTreeVisitor.prototype.visitErrorNode = function (node) {};

function ParseTreeListener() {
  return this;
}

ParseTreeListener.prototype.visitTerminal = function (node) {};

ParseTreeListener.prototype.visitErrorNode = function (node) {};

ParseTreeListener.prototype.enterEveryRule = function (node) {};

ParseTreeListener.prototype.exitEveryRule = function (node) {};

function TerminalNodeImpl(symbol) {
  TerminalNode.call(this);
  this.parentCtx = null;
  this.symbol = symbol;
  return this;
}

TerminalNodeImpl.prototype = Object.create(TerminalNode.prototype);
TerminalNodeImpl.prototype.constructor = TerminalNodeImpl;

TerminalNodeImpl.prototype.getChild = function (i) {
  return null;
};

TerminalNodeImpl.prototype.getSymbol = function () {
  return this.symbol;
};

TerminalNodeImpl.prototype.getParent = function () {
  return this.parentCtx;
};

TerminalNodeImpl.prototype.getPayload = function () {
  return this.symbol;
};

TerminalNodeImpl.prototype.getSourceInterval = function () {
  if (this.symbol === null) {
    return INVALID_INTERVAL;
  }

  var tokenIndex = this.symbol.tokenIndex;
  return new Interval(tokenIndex, tokenIndex);
};

TerminalNodeImpl.prototype.getChildCount = function () {
  return 0;
};

TerminalNodeImpl.prototype.accept = function (visitor) {
  return visitor.visitTerminal(this);
};

TerminalNodeImpl.prototype.getText = function () {
  return this.symbol.text;
};

TerminalNodeImpl.prototype.toString = function () {
  if (this.symbol.type === Token.EOF) {
    return "<EOF>";
  } else {
    return this.symbol.text;
  }
}; // Represents a token that was consumed during resynchronization
// rather than during a valid match operation. For example,
// we will create this kind of a node during single token insertion
// and deletion as well as during "consume until error recovery set"
// upon no viable alternative exceptions.


function ErrorNodeImpl(token) {
  TerminalNodeImpl.call(this, token);
  return this;
}

ErrorNodeImpl.prototype = Object.create(TerminalNodeImpl.prototype);
ErrorNodeImpl.prototype.constructor = ErrorNodeImpl;

ErrorNodeImpl.prototype.isErrorNode = function () {
  return true;
};

ErrorNodeImpl.prototype.accept = function (visitor) {
  return visitor.visitErrorNode(this);
};

function ParseTreeWalker() {
  return this;
}

ParseTreeWalker.prototype.walk = function (listener, t) {
  var errorNode = t instanceof ErrorNode || t.isErrorNode !== undefined && t.isErrorNode();

  if (errorNode) {
    listener.visitErrorNode(t);
  } else if (t instanceof TerminalNode) {
    listener.visitTerminal(t);
  } else {
    this.enterRule(listener, t);

    for (var i = 0; i < t.getChildCount(); i++) {
      var child = t.getChild(i);
      this.walk(listener, child);
    }

    this.exitRule(listener, t);
  }
}; //
// The discovery of a rule node, involves sending two events: the generic
// {@link ParseTreeListener//enterEveryRule} and a
// {@link RuleContext}-specific event. First we trigger the generic and then
// the rule specific. We to them in reverse order upon finishing the node.
//


ParseTreeWalker.prototype.enterRule = function (listener, r) {
  var ctx = r.getRuleContext();
  listener.enterEveryRule(ctx);
  ctx.enterRule(listener);
};

ParseTreeWalker.prototype.exitRule = function (listener, r) {
  var ctx = r.getRuleContext();
  ctx.exitRule(listener);
  listener.exitEveryRule(ctx);
};

ParseTreeWalker.DEFAULT = new ParseTreeWalker();
exports.RuleNode = RuleNode;
exports.ErrorNode = ErrorNode;
exports.TerminalNode = TerminalNode;
exports.ErrorNodeImpl = ErrorNodeImpl;
exports.TerminalNodeImpl = TerminalNodeImpl;
exports.ParseTreeListener = ParseTreeListener;
exports.ParseTreeVisitor = ParseTreeVisitor;
exports.ParseTreeWalker = ParseTreeWalker;
exports.INVALID_INTERVAL = INVALID_INTERVAL;

/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

/* Copyright (c) 2012-2017 The ANTLR Project. All rights reserved.
 * Use of this file is governed by the BSD 3-clause license that
 * can be found in the LICENSE.txt file in the project root.
 */
var Utils = __webpack_require__(8);

var Token = __webpack_require__(9).Token;

var RuleNode = __webpack_require__(17).RuleNode;

var ErrorNode = __webpack_require__(17).ErrorNode;

var TerminalNode = __webpack_require__(17).TerminalNode;

var ParserRuleContext = __webpack_require__(19).ParserRuleContext;

var RuleContext = __webpack_require__(16).RuleContext;

var INVALID_ALT_NUMBER = __webpack_require__(6).INVALID_ALT_NUMBER;
/** A set of utility routines useful for all kinds of ANTLR trees. */


function Trees() {} // Print out a whole tree in LISP form. {@link //getNodeText} is used on the
//  node payloads to get the text for the nodes.  Detect
//  parse trees and extract data appropriately.


Trees.toStringTree = function (tree, ruleNames, recog) {
  ruleNames = ruleNames || null;
  recog = recog || null;

  if (recog !== null) {
    ruleNames = recog.ruleNames;
  }

  var s = Trees.getNodeText(tree, ruleNames);
  s = Utils.escapeWhitespace(s, false);
  var c = tree.getChildCount();

  if (c === 0) {
    return s;
  }

  var res = "(" + s + ' ';

  if (c > 0) {
    s = Trees.toStringTree(tree.getChild(0), ruleNames);
    res = res.concat(s);
  }

  for (var i = 1; i < c; i++) {
    s = Trees.toStringTree(tree.getChild(i), ruleNames);
    res = res.concat(' ' + s);
  }

  res = res.concat(")");
  return res;
};

Trees.getNodeText = function (t, ruleNames, recog) {
  ruleNames = ruleNames || null;
  recog = recog || null;

  if (recog !== null) {
    ruleNames = recog.ruleNames;
  }

  if (ruleNames !== null) {
    if (t instanceof RuleContext) {
      var altNumber = t.getAltNumber();

      if (altNumber != INVALID_ALT_NUMBER) {
        return ruleNames[t.ruleIndex] + ":" + altNumber;
      }

      return ruleNames[t.ruleIndex];
    } else if (t instanceof ErrorNode) {
      return t.toString();
    } else if (t instanceof TerminalNode) {
      if (t.symbol !== null) {
        return t.symbol.text;
      }
    }
  } // no recog for rule names


  var payload = t.getPayload();

  if (payload instanceof Token) {
    return payload.text;
  }

  return t.getPayload().toString();
}; // Return ordered list of all children of this node


Trees.getChildren = function (t) {
  var list = [];

  for (var i = 0; i < t.getChildCount(); i++) {
    list.push(t.getChild(i));
  }

  return list;
}; // Return a list of all ancestors of this node.  The first node of
//  list is the root and the last is the parent of this node.
//


Trees.getAncestors = function (t) {
  var ancestors = [];
  t = t.getParent();

  while (t !== null) {
    ancestors = [t].concat(ancestors);
    t = t.getParent();
  }

  return ancestors;
};

Trees.findAllTokenNodes = function (t, ttype) {
  return Trees.findAllNodes(t, ttype, true);
};

Trees.findAllRuleNodes = function (t, ruleIndex) {
  return Trees.findAllNodes(t, ruleIndex, false);
};

Trees.findAllNodes = function (t, index, findTokens) {
  var nodes = [];

  Trees._findAllNodes(t, index, findTokens, nodes);

  return nodes;
};

Trees._findAllNodes = function (t, index, findTokens, nodes) {
  // check this node (the root) first
  if (findTokens && t instanceof TerminalNode) {
    if (t.symbol.type === index) {
      nodes.push(t);
    }
  } else if (!findTokens && t instanceof ParserRuleContext) {
    if (t.ruleIndex === index) {
      nodes.push(t);
    }
  } // check children


  for (var i = 0; i < t.getChildCount(); i++) {
    Trees._findAllNodes(t.getChild(i), index, findTokens, nodes);
  }
};

Trees.descendants = function (t) {
  var nodes = [t];

  for (var i = 0; i < t.getChildCount(); i++) {
    nodes = nodes.concat(Trees.descendants(t.getChild(i)));
  }

  return nodes;
};

exports.Trees = Trees;

/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

/* Copyright (c) 2012-2017 The ANTLR Project. All rights reserved.
 * Use of this file is governed by the BSD 3-clause license that
 * can be found in the LICENSE.txt file in the project root.
 */
//* A rule invocation record for parsing.
//
//  Contains all of the information about the current rule not stored in the
//  RuleContext. It handles parse tree children list, Any ATN state
//  tracing, and the default values available for rule indications:
//  start, stop, rule index, current alt number, current
//  ATN state.
//
//  Subclasses made for each rule and grammar track the parameters,
//  return values, locals, and labels specific to that rule. These
//  are the objects that are returned from rules.
//
//  Note text is not an actual field of a rule return value; it is computed
//  from start and stop using the input stream's toString() method.  I
//  could add a ctor to this so that we can pass in and store the input
//  stream, but I'm not sure we want to do that.  It would seem to be undefined
//  to get the .text property anyway if the rule matches tokens from multiple
//  input streams.
//
//  I do not use getters for fields of objects that are used simply to
//  group values such as this aggregate.  The getters/setters are there to
//  satisfy the superclass interface.
var RuleContext = __webpack_require__(16).RuleContext;

var Tree = __webpack_require__(17);

var INVALID_INTERVAL = Tree.INVALID_INTERVAL;
var TerminalNode = Tree.TerminalNode;
var TerminalNodeImpl = Tree.TerminalNodeImpl;
var ErrorNodeImpl = Tree.ErrorNodeImpl;

var Interval = __webpack_require__(13).Interval;

function ParserRuleContext(parent, invokingStateNumber) {
  parent = parent || null;
  invokingStateNumber = invokingStateNumber || null;
  RuleContext.call(this, parent, invokingStateNumber);
  this.ruleIndex = -1; // * If we are debugging or building a parse tree for a visitor,
  // we need to track all of the tokens and rule invocations associated
  // with this rule's context. This is empty for parsing w/o tree constr.
  // operation because we don't the need to track the details about
  // how we parse this rule.
  // /

  this.children = null;
  this.start = null;
  this.stop = null; // The exception that forced this rule to return. If the rule successfully
  // completed, this is {@code null}.

  this.exception = null;
}

ParserRuleContext.prototype = Object.create(RuleContext.prototype);
ParserRuleContext.prototype.constructor = ParserRuleContext; // * COPY a ctx (I'm deliberately not using copy constructor)///

ParserRuleContext.prototype.copyFrom = function (ctx) {
  // from RuleContext
  this.parentCtx = ctx.parentCtx;
  this.invokingState = ctx.invokingState;
  this.children = null;
  this.start = ctx.start;
  this.stop = ctx.stop; // copy any error nodes to alt label node

  if (ctx.children) {
    this.children = []; // reset parent pointer for any error nodes

    ctx.children.map(function (child) {
      if (child instanceof ErrorNodeImpl) {
        this.children.push(child);
        child.parentCtx = this;
      }
    }, this);
  }
}; // Double dispatch methods for listeners


ParserRuleContext.prototype.enterRule = function (listener) {};

ParserRuleContext.prototype.exitRule = function (listener) {}; // * Does not set parent link; other add methods do that///


ParserRuleContext.prototype.addChild = function (child) {
  if (this.children === null) {
    this.children = [];
  }

  this.children.push(child);
  return child;
}; // * Used by enterOuterAlt to toss out a RuleContext previously added as
// we entered a rule. If we have // label, we will need to remove
// generic ruleContext object.
// /


ParserRuleContext.prototype.removeLastChild = function () {
  if (this.children !== null) {
    this.children.pop();
  }
};

ParserRuleContext.prototype.addTokenNode = function (token) {
  var node = new TerminalNodeImpl(token);
  this.addChild(node);
  node.parentCtx = this;
  return node;
};

ParserRuleContext.prototype.addErrorNode = function (badToken) {
  var node = new ErrorNodeImpl(badToken);
  this.addChild(node);
  node.parentCtx = this;
  return node;
};

ParserRuleContext.prototype.getChild = function (i, type) {
  type = type || null;

  if (this.children === null || i < 0 || i >= this.children.length) {
    return null;
  }

  if (type === null) {
    return this.children[i];
  } else {
    for (var j = 0; j < this.children.length; j++) {
      var child = this.children[j];

      if (child instanceof type) {
        if (i === 0) {
          return child;
        } else {
          i -= 1;
        }
      }
    }

    return null;
  }
};

ParserRuleContext.prototype.getToken = function (ttype, i) {
  if (this.children === null || i < 0 || i >= this.children.length) {
    return null;
  }

  for (var j = 0; j < this.children.length; j++) {
    var child = this.children[j];

    if (child instanceof TerminalNode) {
      if (child.symbol.type === ttype) {
        if (i === 0) {
          return child;
        } else {
          i -= 1;
        }
      }
    }
  }

  return null;
};

ParserRuleContext.prototype.getTokens = function (ttype) {
  if (this.children === null) {
    return [];
  } else {
    var tokens = [];

    for (var j = 0; j < this.children.length; j++) {
      var child = this.children[j];

      if (child instanceof TerminalNode) {
        if (child.symbol.type === ttype) {
          tokens.push(child);
        }
      }
    }

    return tokens;
  }
};

ParserRuleContext.prototype.getTypedRuleContext = function (ctxType, i) {
  return this.getChild(i, ctxType);
};

ParserRuleContext.prototype.getTypedRuleContexts = function (ctxType) {
  if (this.children === null) {
    return [];
  } else {
    var contexts = [];

    for (var j = 0; j < this.children.length; j++) {
      var child = this.children[j];

      if (child instanceof ctxType) {
        contexts.push(child);
      }
    }

    return contexts;
  }
};

ParserRuleContext.prototype.getChildCount = function () {
  if (this.children === null) {
    return 0;
  } else {
    return this.children.length;
  }
};

ParserRuleContext.prototype.getSourceInterval = function () {
  if (this.start === null || this.stop === null) {
    return INVALID_INTERVAL;
  } else {
    return new Interval(this.start.tokenIndex, this.stop.tokenIndex);
  }
};

RuleContext.EMPTY = new ParserRuleContext();

function InterpreterRuleContext(parent, invokingStateNumber, ruleIndex) {
  ParserRuleContext.call(parent, invokingStateNumber);
  this.ruleIndex = ruleIndex;
  return this;
}

InterpreterRuleContext.prototype = Object.create(ParserRuleContext.prototype);
InterpreterRuleContext.prototype.constructor = InterpreterRuleContext;
exports.ParserRuleContext = ParserRuleContext;

/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

/* Copyright (c) 2012-2017 The ANTLR Project. All rights reserved.
 * Use of this file is governed by the BSD 3-clause license that
 * can be found in the LICENSE.txt file in the project root.
 */
var Token = __webpack_require__(9).Token;

var ATN = __webpack_require__(6).ATN;

var ATNType = __webpack_require__(21).ATNType;

var ATNStates = __webpack_require__(11);

var ATNState = ATNStates.ATNState;
var BasicState = ATNStates.BasicState;
var DecisionState = ATNStates.DecisionState;
var BlockStartState = ATNStates.BlockStartState;
var BlockEndState = ATNStates.BlockEndState;
var LoopEndState = ATNStates.LoopEndState;
var RuleStartState = ATNStates.RuleStartState;
var RuleStopState = ATNStates.RuleStopState;
var TokensStartState = ATNStates.TokensStartState;
var PlusLoopbackState = ATNStates.PlusLoopbackState;
var StarLoopbackState = ATNStates.StarLoopbackState;
var StarLoopEntryState = ATNStates.StarLoopEntryState;
var PlusBlockStartState = ATNStates.PlusBlockStartState;
var StarBlockStartState = ATNStates.StarBlockStartState;
var BasicBlockStartState = ATNStates.BasicBlockStartState;

var Transitions = __webpack_require__(14);

var Transition = Transitions.Transition;
var AtomTransition = Transitions.AtomTransition;
var SetTransition = Transitions.SetTransition;
var NotSetTransition = Transitions.NotSetTransition;
var RuleTransition = Transitions.RuleTransition;
var RangeTransition = Transitions.RangeTransition;
var ActionTransition = Transitions.ActionTransition;
var EpsilonTransition = Transitions.EpsilonTransition;
var WildcardTransition = Transitions.WildcardTransition;
var PredicateTransition = Transitions.PredicateTransition;
var PrecedencePredicateTransition = Transitions.PrecedencePredicateTransition;

var IntervalSet = __webpack_require__(13).IntervalSet;

var Interval = __webpack_require__(13).Interval;

var ATNDeserializationOptions = __webpack_require__(22).ATNDeserializationOptions;

var LexerActions = __webpack_require__(23);

var LexerActionType = LexerActions.LexerActionType;
var LexerSkipAction = LexerActions.LexerSkipAction;
var LexerChannelAction = LexerActions.LexerChannelAction;
var LexerCustomAction = LexerActions.LexerCustomAction;
var LexerMoreAction = LexerActions.LexerMoreAction;
var LexerTypeAction = LexerActions.LexerTypeAction;
var LexerPushModeAction = LexerActions.LexerPushModeAction;
var LexerPopModeAction = LexerActions.LexerPopModeAction;
var LexerModeAction = LexerActions.LexerModeAction; // This is the earliest supported serialized UUID.
// stick to serialized version for now, we don't need a UUID instance

var BASE_SERIALIZED_UUID = "AADB8D7E-AEEF-4415-AD2B-8204D6CF042E"; //
// This UUID indicates the serialized ATN contains two sets of
// IntervalSets, where the second set's values are encoded as
// 32-bit integers to support the full Unicode SMP range up to U+10FFFF.
//

var ADDED_UNICODE_SMP = "59627784-3BE5-417A-B9EB-8131A7286089"; // This list contains all of the currently supported UUIDs, ordered by when
// the feature first appeared in this branch.

var SUPPORTED_UUIDS = [BASE_SERIALIZED_UUID, ADDED_UNICODE_SMP];
var SERIALIZED_VERSION = 3; // This is the current serialized UUID.

var SERIALIZED_UUID = ADDED_UNICODE_SMP;

function initArray(length, value) {
  var tmp = [];
  tmp[length - 1] = value;
  return tmp.map(function (i) {
    return value;
  });
}

function ATNDeserializer(options) {
  if (options === undefined || options === null) {
    options = ATNDeserializationOptions.defaultOptions;
  }

  this.deserializationOptions = options;
  this.stateFactories = null;
  this.actionFactories = null;
  return this;
} // Determines if a particular serialized representation of an ATN supports
// a particular feature, identified by the {@link UUID} used for serializing
// the ATN at the time the feature was first introduced.
//
// @param feature The {@link UUID} marking the first time the feature was
// supported in the serialized ATN.
// @param actualUuid The {@link UUID} of the actual serialized ATN which is
// currently being deserialized.
// @return {@code true} if the {@code actualUuid} value represents a
// serialized ATN at or after the feature identified by {@code feature} was
// introduced; otherwise, {@code false}.


ATNDeserializer.prototype.isFeatureSupported = function (feature, actualUuid) {
  var idx1 = SUPPORTED_UUIDS.indexOf(feature);

  if (idx1 < 0) {
    return false;
  }

  var idx2 = SUPPORTED_UUIDS.indexOf(actualUuid);
  return idx2 >= idx1;
};

ATNDeserializer.prototype.deserialize = function (data) {
  this.reset(data);
  this.checkVersion();
  this.checkUUID();
  var atn = this.readATN();
  this.readStates(atn);
  this.readRules(atn);
  this.readModes(atn);
  var sets = []; // First, deserialize sets with 16-bit arguments <= U+FFFF.

  this.readSets(atn, sets, this.readInt.bind(this)); // Next, if the ATN was serialized with the Unicode SMP feature,
  // deserialize sets with 32-bit arguments <= U+10FFFF.

  if (this.isFeatureSupported(ADDED_UNICODE_SMP, this.uuid)) {
    this.readSets(atn, sets, this.readInt32.bind(this));
  }

  this.readEdges(atn, sets);
  this.readDecisions(atn);
  this.readLexerActions(atn);
  this.markPrecedenceDecisions(atn);
  this.verifyATN(atn);

  if (this.deserializationOptions.generateRuleBypassTransitions && atn.grammarType === ATNType.PARSER) {
    this.generateRuleBypassTransitions(atn); // re-verify after modification

    this.verifyATN(atn);
  }

  return atn;
};

ATNDeserializer.prototype.reset = function (data) {
  var adjust = function adjust(c) {
    var v = c.charCodeAt(0);
    return v > 1 ? v - 2 : v + 65534;
  };

  var temp = data.split("").map(adjust); // don't adjust the first value since that's the version number

  temp[0] = data.charCodeAt(0);
  this.data = temp;
  this.pos = 0;
};

ATNDeserializer.prototype.checkVersion = function () {
  var version = this.readInt();

  if (version !== SERIALIZED_VERSION) {
    throw "Could not deserialize ATN with version " + version + " (expected " + SERIALIZED_VERSION + ").";
  }
};

ATNDeserializer.prototype.checkUUID = function () {
  var uuid = this.readUUID();

  if (SUPPORTED_UUIDS.indexOf(uuid) < 0) {
    throw "Could not deserialize ATN with UUID: " + uuid + " (expected " + SERIALIZED_UUID + " or a legacy UUID).", uuid, SERIALIZED_UUID;
  }

  this.uuid = uuid;
};

ATNDeserializer.prototype.readATN = function () {
  var grammarType = this.readInt();
  var maxTokenType = this.readInt();
  return new ATN(grammarType, maxTokenType);
};

ATNDeserializer.prototype.readStates = function (atn) {
  var j, pair, stateNumber;
  var loopBackStateNumbers = [];
  var endStateNumbers = [];
  var nstates = this.readInt();

  for (var i = 0; i < nstates; i++) {
    var stype = this.readInt(); // ignore bad type of states

    if (stype === ATNState.INVALID_TYPE) {
      atn.addState(null);
      continue;
    }

    var ruleIndex = this.readInt();

    if (ruleIndex === 0xFFFF) {
      ruleIndex = -1;
    }

    var s = this.stateFactory(stype, ruleIndex);

    if (stype === ATNState.LOOP_END) {
      // special case
      var loopBackStateNumber = this.readInt();
      loopBackStateNumbers.push([s, loopBackStateNumber]);
    } else if (s instanceof BlockStartState) {
      var endStateNumber = this.readInt();
      endStateNumbers.push([s, endStateNumber]);
    }

    atn.addState(s);
  } // delay the assignment of loop back and end states until we know all the
  // state instances have been initialized


  for (j = 0; j < loopBackStateNumbers.length; j++) {
    pair = loopBackStateNumbers[j];
    pair[0].loopBackState = atn.states[pair[1]];
  }

  for (j = 0; j < endStateNumbers.length; j++) {
    pair = endStateNumbers[j];
    pair[0].endState = atn.states[pair[1]];
  }

  var numNonGreedyStates = this.readInt();

  for (j = 0; j < numNonGreedyStates; j++) {
    stateNumber = this.readInt();
    atn.states[stateNumber].nonGreedy = true;
  }

  var numPrecedenceStates = this.readInt();

  for (j = 0; j < numPrecedenceStates; j++) {
    stateNumber = this.readInt();
    atn.states[stateNumber].isPrecedenceRule = true;
  }
};

ATNDeserializer.prototype.readRules = function (atn) {
  var i;
  var nrules = this.readInt();

  if (atn.grammarType === ATNType.LEXER) {
    atn.ruleToTokenType = initArray(nrules, 0);
  }

  atn.ruleToStartState = initArray(nrules, 0);

  for (i = 0; i < nrules; i++) {
    var s = this.readInt();
    var startState = atn.states[s];
    atn.ruleToStartState[i] = startState;

    if (atn.grammarType === ATNType.LEXER) {
      var tokenType = this.readInt();

      if (tokenType === 0xFFFF) {
        tokenType = Token.EOF;
      }

      atn.ruleToTokenType[i] = tokenType;
    }
  }

  atn.ruleToStopState = initArray(nrules, 0);

  for (i = 0; i < atn.states.length; i++) {
    var state = atn.states[i];

    if (!(state instanceof RuleStopState)) {
      continue;
    }

    atn.ruleToStopState[state.ruleIndex] = state;
    atn.ruleToStartState[state.ruleIndex].stopState = state;
  }
};

ATNDeserializer.prototype.readModes = function (atn) {
  var nmodes = this.readInt();

  for (var i = 0; i < nmodes; i++) {
    var s = this.readInt();
    atn.modeToStartState.push(atn.states[s]);
  }
};

ATNDeserializer.prototype.readSets = function (atn, sets, readUnicode) {
  var m = this.readInt();

  for (var i = 0; i < m; i++) {
    var iset = new IntervalSet();
    sets.push(iset);
    var n = this.readInt();
    var containsEof = this.readInt();

    if (containsEof !== 0) {
      iset.addOne(-1);
    }

    for (var j = 0; j < n; j++) {
      var i1 = readUnicode();
      var i2 = readUnicode();
      iset.addRange(i1, i2);
    }
  }
};

ATNDeserializer.prototype.readEdges = function (atn, sets) {
  var i, j, state, trans, target;
  var nedges = this.readInt();

  for (i = 0; i < nedges; i++) {
    var src = this.readInt();
    var trg = this.readInt();
    var ttype = this.readInt();
    var arg1 = this.readInt();
    var arg2 = this.readInt();
    var arg3 = this.readInt();
    trans = this.edgeFactory(atn, ttype, src, trg, arg1, arg2, arg3, sets);
    var srcState = atn.states[src];
    srcState.addTransition(trans);
  } // edges for rule stop states can be derived, so they aren't serialized


  for (i = 0; i < atn.states.length; i++) {
    state = atn.states[i];

    for (j = 0; j < state.transitions.length; j++) {
      var t = state.transitions[j];

      if (!(t instanceof RuleTransition)) {
        continue;
      }

      var outermostPrecedenceReturn = -1;

      if (atn.ruleToStartState[t.target.ruleIndex].isPrecedenceRule) {
        if (t.precedence === 0) {
          outermostPrecedenceReturn = t.target.ruleIndex;
        }
      }

      trans = new EpsilonTransition(t.followState, outermostPrecedenceReturn);
      atn.ruleToStopState[t.target.ruleIndex].addTransition(trans);
    }
  }

  for (i = 0; i < atn.states.length; i++) {
    state = atn.states[i];

    if (state instanceof BlockStartState) {
      // we need to know the end state to set its start state
      if (state.endState === null) {
        throw "IllegalState";
      } // block end states can only be associated to a single block start
      // state


      if (state.endState.startState !== null) {
        throw "IllegalState";
      }

      state.endState.startState = state;
    }

    if (state instanceof PlusLoopbackState) {
      for (j = 0; j < state.transitions.length; j++) {
        target = state.transitions[j].target;

        if (target instanceof PlusBlockStartState) {
          target.loopBackState = state;
        }
      }
    } else if (state instanceof StarLoopbackState) {
      for (j = 0; j < state.transitions.length; j++) {
        target = state.transitions[j].target;

        if (target instanceof StarLoopEntryState) {
          target.loopBackState = state;
        }
      }
    }
  }
};

ATNDeserializer.prototype.readDecisions = function (atn) {
  var ndecisions = this.readInt();

  for (var i = 0; i < ndecisions; i++) {
    var s = this.readInt();
    var decState = atn.states[s];
    atn.decisionToState.push(decState);
    decState.decision = i;
  }
};

ATNDeserializer.prototype.readLexerActions = function (atn) {
  if (atn.grammarType === ATNType.LEXER) {
    var count = this.readInt();
    atn.lexerActions = initArray(count, null);

    for (var i = 0; i < count; i++) {
      var actionType = this.readInt();
      var data1 = this.readInt();

      if (data1 === 0xFFFF) {
        data1 = -1;
      }

      var data2 = this.readInt();

      if (data2 === 0xFFFF) {
        data2 = -1;
      }

      var lexerAction = this.lexerActionFactory(actionType, data1, data2);
      atn.lexerActions[i] = lexerAction;
    }
  }
};

ATNDeserializer.prototype.generateRuleBypassTransitions = function (atn) {
  var i;
  var count = atn.ruleToStartState.length;

  for (i = 0; i < count; i++) {
    atn.ruleToTokenType[i] = atn.maxTokenType + i + 1;
  }

  for (i = 0; i < count; i++) {
    this.generateRuleBypassTransition(atn, i);
  }
};

ATNDeserializer.prototype.generateRuleBypassTransition = function (atn, idx) {
  var i, state;
  var bypassStart = new BasicBlockStartState();
  bypassStart.ruleIndex = idx;
  atn.addState(bypassStart);
  var bypassStop = new BlockEndState();
  bypassStop.ruleIndex = idx;
  atn.addState(bypassStop);
  bypassStart.endState = bypassStop;
  atn.defineDecisionState(bypassStart);
  bypassStop.startState = bypassStart;
  var excludeTransition = null;
  var endState = null;

  if (atn.ruleToStartState[idx].isPrecedenceRule) {
    // wrap from the beginning of the rule to the StarLoopEntryState
    endState = null;

    for (i = 0; i < atn.states.length; i++) {
      state = atn.states[i];

      if (this.stateIsEndStateFor(state, idx)) {
        endState = state;
        excludeTransition = state.loopBackState.transitions[0];
        break;
      }
    }

    if (excludeTransition === null) {
      throw "Couldn't identify final state of the precedence rule prefix section.";
    }
  } else {
    endState = atn.ruleToStopState[idx];
  } // all non-excluded transitions that currently target end state need to
  // target blockEnd instead


  for (i = 0; i < atn.states.length; i++) {
    state = atn.states[i];

    for (var j = 0; j < state.transitions.length; j++) {
      var transition = state.transitions[j];

      if (transition === excludeTransition) {
        continue;
      }

      if (transition.target === endState) {
        transition.target = bypassStop;
      }
    }
  } // all transitions leaving the rule start state need to leave blockStart
  // instead


  var ruleToStartState = atn.ruleToStartState[idx];
  var count = ruleToStartState.transitions.length;

  while (count > 0) {
    bypassStart.addTransition(ruleToStartState.transitions[count - 1]);
    ruleToStartState.transitions = ruleToStartState.transitions.slice(-1);
  } // link the new states


  atn.ruleToStartState[idx].addTransition(new EpsilonTransition(bypassStart));
  bypassStop.addTransition(new EpsilonTransition(endState));
  var matchState = new BasicState();
  atn.addState(matchState);
  matchState.addTransition(new AtomTransition(bypassStop, atn.ruleToTokenType[idx]));
  bypassStart.addTransition(new EpsilonTransition(matchState));
};

ATNDeserializer.prototype.stateIsEndStateFor = function (state, idx) {
  if (state.ruleIndex !== idx) {
    return null;
  }

  if (!(state instanceof StarLoopEntryState)) {
    return null;
  }

  var maybeLoopEndState = state.transitions[state.transitions.length - 1].target;

  if (!(maybeLoopEndState instanceof LoopEndState)) {
    return null;
  }

  if (maybeLoopEndState.epsilonOnlyTransitions && maybeLoopEndState.transitions[0].target instanceof RuleStopState) {
    return state;
  } else {
    return null;
  }
}; //
// Analyze the {@link StarLoopEntryState} states in the specified ATN to set
// the {@link StarLoopEntryState//isPrecedenceDecision} field to the
// correct value.
//
// @param atn The ATN.
//


ATNDeserializer.prototype.markPrecedenceDecisions = function (atn) {
  for (var i = 0; i < atn.states.length; i++) {
    var state = atn.states[i];

    if (!(state instanceof StarLoopEntryState)) {
      continue;
    } // We analyze the ATN to determine if this ATN decision state is the
    // decision for the closure block that determines whether a
    // precedence rule should continue or complete.
    //


    if (atn.ruleToStartState[state.ruleIndex].isPrecedenceRule) {
      var maybeLoopEndState = state.transitions[state.transitions.length - 1].target;

      if (maybeLoopEndState instanceof LoopEndState) {
        if (maybeLoopEndState.epsilonOnlyTransitions && maybeLoopEndState.transitions[0].target instanceof RuleStopState) {
          state.isPrecedenceDecision = true;
        }
      }
    }
  }
};

ATNDeserializer.prototype.verifyATN = function (atn) {
  if (!this.deserializationOptions.verifyATN) {
    return;
  } // verify assumptions


  for (var i = 0; i < atn.states.length; i++) {
    var state = atn.states[i];

    if (state === null) {
      continue;
    }

    this.checkCondition(state.epsilonOnlyTransitions || state.transitions.length <= 1);

    if (state instanceof PlusBlockStartState) {
      this.checkCondition(state.loopBackState !== null);
    } else if (state instanceof StarLoopEntryState) {
      this.checkCondition(state.loopBackState !== null);
      this.checkCondition(state.transitions.length === 2);

      if (state.transitions[0].target instanceof StarBlockStartState) {
        this.checkCondition(state.transitions[1].target instanceof LoopEndState);
        this.checkCondition(!state.nonGreedy);
      } else if (state.transitions[0].target instanceof LoopEndState) {
        this.checkCondition(state.transitions[1].target instanceof StarBlockStartState);
        this.checkCondition(state.nonGreedy);
      } else {
        throw "IllegalState";
      }
    } else if (state instanceof StarLoopbackState) {
      this.checkCondition(state.transitions.length === 1);
      this.checkCondition(state.transitions[0].target instanceof StarLoopEntryState);
    } else if (state instanceof LoopEndState) {
      this.checkCondition(state.loopBackState !== null);
    } else if (state instanceof RuleStartState) {
      this.checkCondition(state.stopState !== null);
    } else if (state instanceof BlockStartState) {
      this.checkCondition(state.endState !== null);
    } else if (state instanceof BlockEndState) {
      this.checkCondition(state.startState !== null);
    } else if (state instanceof DecisionState) {
      this.checkCondition(state.transitions.length <= 1 || state.decision >= 0);
    } else {
      this.checkCondition(state.transitions.length <= 1 || state instanceof RuleStopState);
    }
  }
};

ATNDeserializer.prototype.checkCondition = function (condition, message) {
  if (!condition) {
    if (message === undefined || message === null) {
      message = "IllegalState";
    }

    throw message;
  }
};

ATNDeserializer.prototype.readInt = function () {
  return this.data[this.pos++];
};

ATNDeserializer.prototype.readInt32 = function () {
  var low = this.readInt();
  var high = this.readInt();
  return low | high << 16;
};

ATNDeserializer.prototype.readLong = function () {
  var low = this.readInt32();
  var high = this.readInt32();
  return low & 0x00000000FFFFFFFF | high << 32;
};

function createByteToHex() {
  var bth = [];

  for (var i = 0; i < 256; i++) {
    bth[i] = (i + 0x100).toString(16).substr(1).toUpperCase();
  }

  return bth;
}

var byteToHex = createByteToHex();

ATNDeserializer.prototype.readUUID = function () {
  var bb = [];

  for (var i = 7; i >= 0; i--) {
    var int = this.readInt();
    /* jshint bitwise: false */

    bb[2 * i + 1] = int & 0xFF;
    bb[2 * i] = int >> 8 & 0xFF;
  }

  return byteToHex[bb[0]] + byteToHex[bb[1]] + byteToHex[bb[2]] + byteToHex[bb[3]] + '-' + byteToHex[bb[4]] + byteToHex[bb[5]] + '-' + byteToHex[bb[6]] + byteToHex[bb[7]] + '-' + byteToHex[bb[8]] + byteToHex[bb[9]] + '-' + byteToHex[bb[10]] + byteToHex[bb[11]] + byteToHex[bb[12]] + byteToHex[bb[13]] + byteToHex[bb[14]] + byteToHex[bb[15]];
};

ATNDeserializer.prototype.edgeFactory = function (atn, type, src, trg, arg1, arg2, arg3, sets) {
  var target = atn.states[trg];

  switch (type) {
    case Transition.EPSILON:
      return new EpsilonTransition(target);

    case Transition.RANGE:
      return arg3 !== 0 ? new RangeTransition(target, Token.EOF, arg2) : new RangeTransition(target, arg1, arg2);

    case Transition.RULE:
      return new RuleTransition(atn.states[arg1], arg2, arg3, target);

    case Transition.PREDICATE:
      return new PredicateTransition(target, arg1, arg2, arg3 !== 0);

    case Transition.PRECEDENCE:
      return new PrecedencePredicateTransition(target, arg1);

    case Transition.ATOM:
      return arg3 !== 0 ? new AtomTransition(target, Token.EOF) : new AtomTransition(target, arg1);

    case Transition.ACTION:
      return new ActionTransition(target, arg1, arg2, arg3 !== 0);

    case Transition.SET:
      return new SetTransition(target, sets[arg1]);

    case Transition.NOT_SET:
      return new NotSetTransition(target, sets[arg1]);

    case Transition.WILDCARD:
      return new WildcardTransition(target);

    default:
      throw "The specified transition type: " + type + " is not valid.";
  }
};

ATNDeserializer.prototype.stateFactory = function (type, ruleIndex) {
  if (this.stateFactories === null) {
    var sf = [];
    sf[ATNState.INVALID_TYPE] = null;

    sf[ATNState.BASIC] = function () {
      return new BasicState();
    };

    sf[ATNState.RULE_START] = function () {
      return new RuleStartState();
    };

    sf[ATNState.BLOCK_START] = function () {
      return new BasicBlockStartState();
    };

    sf[ATNState.PLUS_BLOCK_START] = function () {
      return new PlusBlockStartState();
    };

    sf[ATNState.STAR_BLOCK_START] = function () {
      return new StarBlockStartState();
    };

    sf[ATNState.TOKEN_START] = function () {
      return new TokensStartState();
    };

    sf[ATNState.RULE_STOP] = function () {
      return new RuleStopState();
    };

    sf[ATNState.BLOCK_END] = function () {
      return new BlockEndState();
    };

    sf[ATNState.STAR_LOOP_BACK] = function () {
      return new StarLoopbackState();
    };

    sf[ATNState.STAR_LOOP_ENTRY] = function () {
      return new StarLoopEntryState();
    };

    sf[ATNState.PLUS_LOOP_BACK] = function () {
      return new PlusLoopbackState();
    };

    sf[ATNState.LOOP_END] = function () {
      return new LoopEndState();
    };

    this.stateFactories = sf;
  }

  if (type > this.stateFactories.length || this.stateFactories[type] === null) {
    throw "The specified state type " + type + " is not valid.";
  } else {
    var s = this.stateFactories[type]();

    if (s !== null) {
      s.ruleIndex = ruleIndex;
      return s;
    }
  }
};

ATNDeserializer.prototype.lexerActionFactory = function (type, data1, data2) {
  if (this.actionFactories === null) {
    var af = [];

    af[LexerActionType.CHANNEL] = function (data1, data2) {
      return new LexerChannelAction(data1);
    };

    af[LexerActionType.CUSTOM] = function (data1, data2) {
      return new LexerCustomAction(data1, data2);
    };

    af[LexerActionType.MODE] = function (data1, data2) {
      return new LexerModeAction(data1);
    };

    af[LexerActionType.MORE] = function (data1, data2) {
      return LexerMoreAction.INSTANCE;
    };

    af[LexerActionType.POP_MODE] = function (data1, data2) {
      return LexerPopModeAction.INSTANCE;
    };

    af[LexerActionType.PUSH_MODE] = function (data1, data2) {
      return new LexerPushModeAction(data1);
    };

    af[LexerActionType.SKIP] = function (data1, data2) {
      return LexerSkipAction.INSTANCE;
    };

    af[LexerActionType.TYPE] = function (data1, data2) {
      return new LexerTypeAction(data1);
    };

    this.actionFactories = af;
  }

  if (type > this.actionFactories.length || this.actionFactories[type] === null) {
    throw "The specified lexer action type " + type + " is not valid.";
  } else {
    return this.actionFactories[type](data1, data2);
  }
};

exports.ATNDeserializer = ATNDeserializer;

/***/ }),
/* 21 */
/***/ (function(module, exports) {

/* Copyright (c) 2012-2017 The ANTLR Project. All rights reserved.
 * Use of this file is governed by the BSD 3-clause license that
 * can be found in the LICENSE.txt file in the project root.
 */
///
// Represents the type of recognizer an ATN applies to.
function ATNType() {}

ATNType.LEXER = 0;
ATNType.PARSER = 1;
exports.ATNType = ATNType;

/***/ }),
/* 22 */
/***/ (function(module, exports) {

/* Copyright (c) 2012-2017 The ANTLR Project. All rights reserved.
 * Use of this file is governed by the BSD 3-clause license that
 * can be found in the LICENSE.txt file in the project root.
 */
function ATNDeserializationOptions(copyFrom) {
  if (copyFrom === undefined) {
    copyFrom = null;
  }

  this.readOnly = false;
  this.verifyATN = copyFrom === null ? true : copyFrom.verifyATN;
  this.generateRuleBypassTransitions = copyFrom === null ? false : copyFrom.generateRuleBypassTransitions;
  return this;
}

ATNDeserializationOptions.defaultOptions = new ATNDeserializationOptions();
ATNDeserializationOptions.defaultOptions.readOnly = true; //    def __setattr__(self, key, value):
//        if key!="readOnly" and self.readOnly:
//            raise Exception("The object is read only.")
//        super(type(self), self).__setattr__(key,value)

exports.ATNDeserializationOptions = ATNDeserializationOptions;

/***/ }),
/* 23 */
/***/ (function(module, exports) {

//

/* Copyright (c) 2012-2017 The ANTLR Project. All rights reserved.
 * Use of this file is governed by the BSD 3-clause license that
 * can be found in the LICENSE.txt file in the project root.
 */
//
function LexerActionType() {}

LexerActionType.CHANNEL = 0; //The type of a {@link LexerChannelAction} action.

LexerActionType.CUSTOM = 1; //The type of a {@link LexerCustomAction} action.

LexerActionType.MODE = 2; //The type of a {@link LexerModeAction} action.

LexerActionType.MORE = 3; //The type of a {@link LexerMoreAction} action.

LexerActionType.POP_MODE = 4; //The type of a {@link LexerPopModeAction} action.

LexerActionType.PUSH_MODE = 5; //The type of a {@link LexerPushModeAction} action.

LexerActionType.SKIP = 6; //The type of a {@link LexerSkipAction} action.

LexerActionType.TYPE = 7; //The type of a {@link LexerTypeAction} action.

function LexerAction(action) {
  this.actionType = action;
  this.isPositionDependent = false;
  return this;
}

LexerAction.prototype.hashCode = function () {
  var hash = new Hash();
  this.updateHashCode(hash);
  return hash.finish();
};

LexerAction.prototype.updateHashCode = function (hash) {
  hash.update(this.actionType);
};

LexerAction.prototype.equals = function (other) {
  return this === other;
}; //
// Implements the {@code skip} lexer action by calling {@link Lexer//skip}.
//
// <p>The {@code skip} command does not have any parameters, so this action is
// implemented as a singleton instance exposed by {@link //INSTANCE}.</p>


function LexerSkipAction() {
  LexerAction.call(this, LexerActionType.SKIP);
  return this;
}

LexerSkipAction.prototype = Object.create(LexerAction.prototype);
LexerSkipAction.prototype.constructor = LexerSkipAction; // Provides a singleton instance of this parameterless lexer action.

LexerSkipAction.INSTANCE = new LexerSkipAction();

LexerSkipAction.prototype.execute = function (lexer) {
  lexer.skip();
};

LexerSkipAction.prototype.toString = function () {
  return "skip";
}; //  Implements the {@code type} lexer action by calling {@link Lexer//setType}
// with the assigned type.


function LexerTypeAction(type) {
  LexerAction.call(this, LexerActionType.TYPE);
  this.type = type;
  return this;
}

LexerTypeAction.prototype = Object.create(LexerAction.prototype);
LexerTypeAction.prototype.constructor = LexerTypeAction;

LexerTypeAction.prototype.execute = function (lexer) {
  lexer.type = this.type;
};

LexerTypeAction.prototype.updateHashCode = function (hash) {
  hash.update(this.actionType, this.type);
};

LexerTypeAction.prototype.equals = function (other) {
  if (this === other) {
    return true;
  } else if (!(other instanceof LexerTypeAction)) {
    return false;
  } else {
    return this.type === other.type;
  }
};

LexerTypeAction.prototype.toString = function () {
  return "type(" + this.type + ")";
}; // Implements the {@code pushMode} lexer action by calling
// {@link Lexer//pushMode} with the assigned mode.


function LexerPushModeAction(mode) {
  LexerAction.call(this, LexerActionType.PUSH_MODE);
  this.mode = mode;
  return this;
}

LexerPushModeAction.prototype = Object.create(LexerAction.prototype);
LexerPushModeAction.prototype.constructor = LexerPushModeAction; // <p>This action is implemented by calling {@link Lexer//pushMode} with the
// value provided by {@link //getMode}.</p>

LexerPushModeAction.prototype.execute = function (lexer) {
  lexer.pushMode(this.mode);
};

LexerPushModeAction.prototype.updateHashCode = function (hash) {
  hash.update(this.actionType, this.mode);
};

LexerPushModeAction.prototype.equals = function (other) {
  if (this === other) {
    return true;
  } else if (!(other instanceof LexerPushModeAction)) {
    return false;
  } else {
    return this.mode === other.mode;
  }
};

LexerPushModeAction.prototype.toString = function () {
  return "pushMode(" + this.mode + ")";
}; // Implements the {@code popMode} lexer action by calling {@link Lexer//popMode}.
//
// <p>The {@code popMode} command does not have any parameters, so this action is
// implemented as a singleton instance exposed by {@link //INSTANCE}.</p>


function LexerPopModeAction() {
  LexerAction.call(this, LexerActionType.POP_MODE);
  return this;
}

LexerPopModeAction.prototype = Object.create(LexerAction.prototype);
LexerPopModeAction.prototype.constructor = LexerPopModeAction;
LexerPopModeAction.INSTANCE = new LexerPopModeAction(); // <p>This action is implemented by calling {@link Lexer//popMode}.</p>

LexerPopModeAction.prototype.execute = function (lexer) {
  lexer.popMode();
};

LexerPopModeAction.prototype.toString = function () {
  return "popMode";
}; // Implements the {@code more} lexer action by calling {@link Lexer//more}.
//
// <p>The {@code more} command does not have any parameters, so this action is
// implemented as a singleton instance exposed by {@link //INSTANCE}.</p>


function LexerMoreAction() {
  LexerAction.call(this, LexerActionType.MORE);
  return this;
}

LexerMoreAction.prototype = Object.create(LexerAction.prototype);
LexerMoreAction.prototype.constructor = LexerMoreAction;
LexerMoreAction.INSTANCE = new LexerMoreAction(); // <p>This action is implemented by calling {@link Lexer//popMode}.</p>

LexerMoreAction.prototype.execute = function (lexer) {
  lexer.more();
};

LexerMoreAction.prototype.toString = function () {
  return "more";
}; // Implements the {@code mode} lexer action by calling {@link Lexer//mode} with
// the assigned mode.


function LexerModeAction(mode) {
  LexerAction.call(this, LexerActionType.MODE);
  this.mode = mode;
  return this;
}

LexerModeAction.prototype = Object.create(LexerAction.prototype);
LexerModeAction.prototype.constructor = LexerModeAction; // <p>This action is implemented by calling {@link Lexer//mode} with the
// value provided by {@link //getMode}.</p>

LexerModeAction.prototype.execute = function (lexer) {
  lexer.mode(this.mode);
};

LexerModeAction.prototype.updateHashCode = function (hash) {
  hash.update(this.actionType, this.mode);
};

LexerModeAction.prototype.equals = function (other) {
  if (this === other) {
    return true;
  } else if (!(other instanceof LexerModeAction)) {
    return false;
  } else {
    return this.mode === other.mode;
  }
};

LexerModeAction.prototype.toString = function () {
  return "mode(" + this.mode + ")";
}; // Executes a custom lexer action by calling {@link Recognizer//action} with the
// rule and action indexes assigned to the custom action. The implementation of
// a custom action is added to the generated code for the lexer in an override
// of {@link Recognizer//action} when the grammar is compiled.
//
// <p>This class may represent embedded actions created with the <code>{...}</code>
// syntax in ANTLR 4, as well as actions created for lexer commands where the
// command argument could not be evaluated when the grammar was compiled.</p>
// Constructs a custom lexer action with the specified rule and action
// indexes.
//
// @param ruleIndex The rule index to use for calls to
// {@link Recognizer//action}.
// @param actionIndex The action index to use for calls to
// {@link Recognizer//action}.


function LexerCustomAction(ruleIndex, actionIndex) {
  LexerAction.call(this, LexerActionType.CUSTOM);
  this.ruleIndex = ruleIndex;
  this.actionIndex = actionIndex;
  this.isPositionDependent = true;
  return this;
}

LexerCustomAction.prototype = Object.create(LexerAction.prototype);
LexerCustomAction.prototype.constructor = LexerCustomAction; // <p>Custom actions are implemented by calling {@link Lexer//action} with the
// appropriate rule and action indexes.</p>

LexerCustomAction.prototype.execute = function (lexer) {
  lexer.action(null, this.ruleIndex, this.actionIndex);
};

LexerCustomAction.prototype.updateHashCode = function (hash) {
  hash.update(this.actionType, this.ruleIndex, this.actionIndex);
};

LexerCustomAction.prototype.equals = function (other) {
  if (this === other) {
    return true;
  } else if (!(other instanceof LexerCustomAction)) {
    return false;
  } else {
    return this.ruleIndex === other.ruleIndex && this.actionIndex === other.actionIndex;
  }
}; // Implements the {@code channel} lexer action by calling
// {@link Lexer//setChannel} with the assigned channel.
// Constructs a new {@code channel} action with the specified channel value.
// @param channel The channel value to pass to {@link Lexer//setChannel}.


function LexerChannelAction(channel) {
  LexerAction.call(this, LexerActionType.CHANNEL);
  this.channel = channel;
  return this;
}

LexerChannelAction.prototype = Object.create(LexerAction.prototype);
LexerChannelAction.prototype.constructor = LexerChannelAction; // <p>This action is implemented by calling {@link Lexer//setChannel} with the
// value provided by {@link //getChannel}.</p>

LexerChannelAction.prototype.execute = function (lexer) {
  lexer._channel = this.channel;
};

LexerChannelAction.prototype.updateHashCode = function (hash) {
  hash.update(this.actionType, this.channel);
};

LexerChannelAction.prototype.equals = function (other) {
  if (this === other) {
    return true;
  } else if (!(other instanceof LexerChannelAction)) {
    return false;
  } else {
    return this.channel === other.channel;
  }
};

LexerChannelAction.prototype.toString = function () {
  return "channel(" + this.channel + ")";
}; // This implementation of {@link LexerAction} is used for tracking input offsets
// for position-dependent actions within a {@link LexerActionExecutor}.
//
// <p>This action is not serialized as part of the ATN, and is only required for
// position-dependent lexer actions which appear at a location other than the
// end of a rule. For more information about DFA optimizations employed for
// lexer actions, see {@link LexerActionExecutor//append} and
// {@link LexerActionExecutor//fixOffsetBeforeMatch}.</p>
// Constructs a new indexed custom action by associating a character offset
// with a {@link LexerAction}.
//
// <p>Note: This class is only required for lexer actions for which
// {@link LexerAction//isPositionDependent} returns {@code true}.</p>
//
// @param offset The offset into the input {@link CharStream}, relative to
// the token start index, at which the specified lexer action should be
// executed.
// @param action The lexer action to execute at a particular offset in the
// input {@link CharStream}.


function LexerIndexedCustomAction(offset, action) {
  LexerAction.call(this, action.actionType);
  this.offset = offset;
  this.action = action;
  this.isPositionDependent = true;
  return this;
}

LexerIndexedCustomAction.prototype = Object.create(LexerAction.prototype);
LexerIndexedCustomAction.prototype.constructor = LexerIndexedCustomAction; // <p>This method calls {@link //execute} on the result of {@link //getAction}
// using the provided {@code lexer}.</p>

LexerIndexedCustomAction.prototype.execute = function (lexer) {
  // assume the input stream position was properly set by the calling code
  this.action.execute(lexer);
};

LexerIndexedCustomAction.prototype.updateHashCode = function (hash) {
  hash.update(this.actionType, this.offset, this.action);
};

LexerIndexedCustomAction.prototype.equals = function (other) {
  if (this === other) {
    return true;
  } else if (!(other instanceof LexerIndexedCustomAction)) {
    return false;
  } else {
    return this.offset === other.offset && this.action === other.action;
  }
};

exports.LexerActionType = LexerActionType;
exports.LexerSkipAction = LexerSkipAction;
exports.LexerChannelAction = LexerChannelAction;
exports.LexerCustomAction = LexerCustomAction;
exports.LexerIndexedCustomAction = LexerIndexedCustomAction;
exports.LexerMoreAction = LexerMoreAction;
exports.LexerTypeAction = LexerTypeAction;
exports.LexerPushModeAction = LexerPushModeAction;
exports.LexerPopModeAction = LexerPopModeAction;
exports.LexerModeAction = LexerModeAction;

/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

//

/* Copyright (c) 2012-2017 The ANTLR Project. All rights reserved.
 * Use of this file is governed by the BSD 3-clause license that
 * can be found in the LICENSE.txt file in the project root.
 */
///
// When we hit an accept state in either the DFA or the ATN, we
//  have to notify the character stream to start buffering characters
//  via {@link IntStream//mark} and record the current state. The current sim state
//  includes the current index into the input, the current line,
//  and current character position in that line. Note that the Lexer is
//  tracking the starting line and characterization of the token. These
//  variables track the "state" of the simulator when it hits an accept state.
//
//  <p>We track these variables separately for the DFA and ATN simulation
//  because the DFA simulation often has to fail over to the ATN
//  simulation. If the ATN simulation fails, we need the DFA to fall
//  back to its previously accepted state, if any. If the ATN succeeds,
//  then the ATN does the accept and the DFA simulator that invoked it
//  can simply return the predicted token type.</p>
///
var Token = __webpack_require__(9).Token;

var Lexer = __webpack_require__(25).Lexer;

var ATN = __webpack_require__(6).ATN;

var ATNSimulator = __webpack_require__(30).ATNSimulator;

var DFAState = __webpack_require__(31).DFAState;

var ATNConfigSet = __webpack_require__(32).ATNConfigSet;

var OrderedATNConfigSet = __webpack_require__(32).OrderedATNConfigSet;

var PredictionContext = __webpack_require__(15).PredictionContext;

var SingletonPredictionContext = __webpack_require__(15).SingletonPredictionContext;

var RuleStopState = __webpack_require__(11).RuleStopState;

var LexerATNConfig = __webpack_require__(10).LexerATNConfig;

var Transition = __webpack_require__(14).Transition;

var LexerActionExecutor = __webpack_require__(33).LexerActionExecutor;

var LexerNoViableAltException = __webpack_require__(29).LexerNoViableAltException;

function resetSimState(sim) {
  sim.index = -1;
  sim.line = 0;
  sim.column = -1;
  sim.dfaState = null;
}

function SimState() {
  resetSimState(this);
  return this;
}

SimState.prototype.reset = function () {
  resetSimState(this);
};

function LexerATNSimulator(recog, atn, decisionToDFA, sharedContextCache) {
  ATNSimulator.call(this, atn, sharedContextCache);
  this.decisionToDFA = decisionToDFA;
  this.recog = recog; // The current token's starting index into the character stream.
  // Shared across DFA to ATN simulation in case the ATN fails and the
  // DFA did not have a previous accept state. In this case, we use the
  // ATN-generated exception object.

  this.startIndex = -1; // line number 1..n within the input///

  this.line = 1; // The index of the character relative to the beginning of the line
  // 0..n-1///

  this.column = 0;
  this.mode = Lexer.DEFAULT_MODE; // Used during DFA/ATN exec to record the most recent accept configuration
  // info

  this.prevAccept = new SimState(); // done

  return this;
}

LexerATNSimulator.prototype = Object.create(ATNSimulator.prototype);
LexerATNSimulator.prototype.constructor = LexerATNSimulator;
LexerATNSimulator.debug = false;
LexerATNSimulator.dfa_debug = false;
LexerATNSimulator.MIN_DFA_EDGE = 0;
LexerATNSimulator.MAX_DFA_EDGE = 127; // forces unicode to stay in ATN

LexerATNSimulator.match_calls = 0;

LexerATNSimulator.prototype.copyState = function (simulator) {
  this.column = simulator.column;
  this.line = simulator.line;
  this.mode = simulator.mode;
  this.startIndex = simulator.startIndex;
};

LexerATNSimulator.prototype.match = function (input, mode) {
  this.match_calls += 1;
  this.mode = mode;
  var mark = input.mark();

  try {
    this.startIndex = input.index;
    this.prevAccept.reset();
    var dfa = this.decisionToDFA[mode];

    if (dfa.s0 === null) {
      return this.matchATN(input);
    } else {
      return this.execATN(input, dfa.s0);
    }
  } finally {
    input.release(mark);
  }
};

LexerATNSimulator.prototype.reset = function () {
  this.prevAccept.reset();
  this.startIndex = -1;
  this.line = 1;
  this.column = 0;
  this.mode = Lexer.DEFAULT_MODE;
};

LexerATNSimulator.prototype.matchATN = function (input) {
  var startState = this.atn.modeToStartState[this.mode];

  if (LexerATNSimulator.debug) {
    console.log("matchATN mode " + this.mode + " start: " + startState);
  }

  var old_mode = this.mode;
  var s0_closure = this.computeStartState(input, startState);
  var suppressEdge = s0_closure.hasSemanticContext;
  s0_closure.hasSemanticContext = false;
  var next = this.addDFAState(s0_closure);

  if (!suppressEdge) {
    this.decisionToDFA[this.mode].s0 = next;
  }

  var predict = this.execATN(input, next);

  if (LexerATNSimulator.debug) {
    console.log("DFA after matchATN: " + this.decisionToDFA[old_mode].toLexerString());
  }

  return predict;
};

LexerATNSimulator.prototype.execATN = function (input, ds0) {
  if (LexerATNSimulator.debug) {
    console.log("start state closure=" + ds0.configs);
  }

  if (ds0.isAcceptState) {
    // allow zero-length tokens
    this.captureSimState(this.prevAccept, input, ds0);
  }

  var t = input.LA(1);
  var s = ds0; // s is current/from DFA state

  while (true) {
    // while more work
    if (LexerATNSimulator.debug) {
      console.log("execATN loop starting closure: " + s.configs);
    } // As we move src->trg, src->trg, we keep track of the previous trg to
    // avoid looking up the DFA state again, which is expensive.
    // If the previous target was already part of the DFA, we might
    // be able to avoid doing a reach operation upon t. If s!=null,
    // it means that semantic predicates didn't prevent us from
    // creating a DFA state. Once we know s!=null, we check to see if
    // the DFA state has an edge already for t. If so, we can just reuse
    // it's configuration set; there's no point in re-computing it.
    // This is kind of like doing DFA simulation within the ATN
    // simulation because DFA simulation is really just a way to avoid
    // computing reach/closure sets. Technically, once we know that
    // we have a previously added DFA state, we could jump over to
    // the DFA simulator. But, that would mean popping back and forth
    // a lot and making things more complicated algorithmically.
    // This optimization makes a lot of sense for loops within DFA.
    // A character will take us back to an existing DFA state
    // that already has lots of edges out of it. e.g., .* in comments.
    // print("Target for:" + str(s) + " and:" + str(t))


    var target = this.getExistingTargetState(s, t); // print("Existing:" + str(target))

    if (target === null) {
      target = this.computeTargetState(input, s, t); // print("Computed:" + str(target))
    }

    if (target === ATNSimulator.ERROR) {
      break;
    } // If this is a consumable input element, make sure to consume before
    // capturing the accept state so the input index, line, and char
    // position accurately reflect the state of the interpreter at the
    // end of the token.


    if (t !== Token.EOF) {
      this.consume(input);
    }

    if (target.isAcceptState) {
      this.captureSimState(this.prevAccept, input, target);

      if (t === Token.EOF) {
        break;
      }
    }

    t = input.LA(1);
    s = target; // flip; current DFA target becomes new src/from state
  }

  return this.failOrAccept(this.prevAccept, input, s.configs, t);
}; // Get an existing target state for an edge in the DFA. If the target state
// for the edge has not yet been computed or is otherwise not available,
// this method returns {@code null}.
//
// @param s The current DFA state
// @param t The next input symbol
// @return The existing target DFA state for the given input symbol
// {@code t}, or {@code null} if the target state for this edge is not
// already cached


LexerATNSimulator.prototype.getExistingTargetState = function (s, t) {
  if (s.edges === null || t < LexerATNSimulator.MIN_DFA_EDGE || t > LexerATNSimulator.MAX_DFA_EDGE) {
    return null;
  }

  var target = s.edges[t - LexerATNSimulator.MIN_DFA_EDGE];

  if (target === undefined) {
    target = null;
  }

  if (LexerATNSimulator.debug && target !== null) {
    console.log("reuse state " + s.stateNumber + " edge to " + target.stateNumber);
  }

  return target;
}; // Compute a target state for an edge in the DFA, and attempt to add the
// computed state and corresponding edge to the DFA.
//
// @param input The input stream
// @param s The current DFA state
// @param t The next input symbol
//
// @return The computed target DFA state for the given input symbol
// {@code t}. If {@code t} does not lead to a valid DFA state, this method
// returns {@link //ERROR}.


LexerATNSimulator.prototype.computeTargetState = function (input, s, t) {
  var reach = new OrderedATNConfigSet(); // if we don't find an existing DFA state
  // Fill reach starting from closure, following t transitions

  this.getReachableConfigSet(input, s.configs, reach, t);

  if (reach.items.length === 0) {
    // we got nowhere on t from s
    if (!reach.hasSemanticContext) {
      // we got nowhere on t, don't throw out this knowledge; it'd
      // cause a failover from DFA later.
      this.addDFAEdge(s, t, ATNSimulator.ERROR);
    } // stop when we can't match any more char


    return ATNSimulator.ERROR;
  } // Add an edge from s to target DFA found/created for reach


  return this.addDFAEdge(s, t, null, reach);
};

LexerATNSimulator.prototype.failOrAccept = function (prevAccept, input, reach, t) {
  if (this.prevAccept.dfaState !== null) {
    var lexerActionExecutor = prevAccept.dfaState.lexerActionExecutor;
    this.accept(input, lexerActionExecutor, this.startIndex, prevAccept.index, prevAccept.line, prevAccept.column);
    return prevAccept.dfaState.prediction;
  } else {
    // if no accept and EOF is first char, return EOF
    if (t === Token.EOF && input.index === this.startIndex) {
      return Token.EOF;
    }

    throw new LexerNoViableAltException(this.recog, input, this.startIndex, reach);
  }
}; // Given a starting configuration set, figure out all ATN configurations
// we can reach upon input {@code t}. Parameter {@code reach} is a return
// parameter.


LexerATNSimulator.prototype.getReachableConfigSet = function (input, closure, reach, t) {
  // this is used to skip processing for configs which have a lower priority
  // than a config that already reached an accept state for the same rule
  var skipAlt = ATN.INVALID_ALT_NUMBER;

  for (var i = 0; i < closure.items.length; i++) {
    var cfg = closure.items[i];
    var currentAltReachedAcceptState = cfg.alt === skipAlt;

    if (currentAltReachedAcceptState && cfg.passedThroughNonGreedyDecision) {
      continue;
    }

    if (LexerATNSimulator.debug) {
      console.log("testing %s at %s\n", this.getTokenName(t), cfg.toString(this.recog, true));
    }

    for (var j = 0; j < cfg.state.transitions.length; j++) {
      var trans = cfg.state.transitions[j]; // for each transition

      var target = this.getReachableTarget(trans, t);

      if (target !== null) {
        var lexerActionExecutor = cfg.lexerActionExecutor;

        if (lexerActionExecutor !== null) {
          lexerActionExecutor = lexerActionExecutor.fixOffsetBeforeMatch(input.index - this.startIndex);
        }

        var treatEofAsEpsilon = t === Token.EOF;
        var config = new LexerATNConfig({
          state: target,
          lexerActionExecutor: lexerActionExecutor
        }, cfg);

        if (this.closure(input, config, reach, currentAltReachedAcceptState, true, treatEofAsEpsilon)) {
          // any remaining configs for this alt have a lower priority
          // than the one that just reached an accept state.
          skipAlt = cfg.alt;
        }
      }
    }
  }
};

LexerATNSimulator.prototype.accept = function (input, lexerActionExecutor, startIndex, index, line, charPos) {
  if (LexerATNSimulator.debug) {
    console.log("ACTION %s\n", lexerActionExecutor);
  } // seek to after last char in token


  input.seek(index);
  this.line = line;
  this.column = charPos;

  if (lexerActionExecutor !== null && this.recog !== null) {
    lexerActionExecutor.execute(this.recog, input, startIndex);
  }
};

LexerATNSimulator.prototype.getReachableTarget = function (trans, t) {
  if (trans.matches(t, 0, Lexer.MAX_CHAR_VALUE)) {
    return trans.target;
  } else {
    return null;
  }
};

LexerATNSimulator.prototype.computeStartState = function (input, p) {
  var initialContext = PredictionContext.EMPTY;
  var configs = new OrderedATNConfigSet();

  for (var i = 0; i < p.transitions.length; i++) {
    var target = p.transitions[i].target;
    var cfg = new LexerATNConfig({
      state: target,
      alt: i + 1,
      context: initialContext
    }, null);
    this.closure(input, cfg, configs, false, false, false);
  }

  return configs;
}; // Since the alternatives within any lexer decision are ordered by
// preference, this method stops pursuing the closure as soon as an accept
// state is reached. After the first accept state is reached by depth-first
// search from {@code config}, all other (potentially reachable) states for
// this rule would have a lower priority.
//
// @return {@code true} if an accept state is reached, otherwise
// {@code false}.


LexerATNSimulator.prototype.closure = function (input, config, configs, currentAltReachedAcceptState, speculative, treatEofAsEpsilon) {
  var cfg = null;

  if (LexerATNSimulator.debug) {
    console.log("closure(" + config.toString(this.recog, true) + ")");
  }

  if (config.state instanceof RuleStopState) {
    if (LexerATNSimulator.debug) {
      if (this.recog !== null) {
        console.log("closure at %s rule stop %s\n", this.recog.ruleNames[config.state.ruleIndex], config);
      } else {
        console.log("closure at rule stop %s\n", config);
      }
    }

    if (config.context === null || config.context.hasEmptyPath()) {
      if (config.context === null || config.context.isEmpty()) {
        configs.add(config);
        return true;
      } else {
        configs.add(new LexerATNConfig({
          state: config.state,
          context: PredictionContext.EMPTY
        }, config));
        currentAltReachedAcceptState = true;
      }
    }

    if (config.context !== null && !config.context.isEmpty()) {
      for (var i = 0; i < config.context.length; i++) {
        if (config.context.getReturnState(i) !== PredictionContext.EMPTY_RETURN_STATE) {
          var newContext = config.context.getParent(i); // "pop" return state

          var returnState = this.atn.states[config.context.getReturnState(i)];
          cfg = new LexerATNConfig({
            state: returnState,
            context: newContext
          }, config);
          currentAltReachedAcceptState = this.closure(input, cfg, configs, currentAltReachedAcceptState, speculative, treatEofAsEpsilon);
        }
      }
    }

    return currentAltReachedAcceptState;
  } // optimization


  if (!config.state.epsilonOnlyTransitions) {
    if (!currentAltReachedAcceptState || !config.passedThroughNonGreedyDecision) {
      configs.add(config);
    }
  }

  for (var j = 0; j < config.state.transitions.length; j++) {
    var trans = config.state.transitions[j];
    cfg = this.getEpsilonTarget(input, config, trans, configs, speculative, treatEofAsEpsilon);

    if (cfg !== null) {
      currentAltReachedAcceptState = this.closure(input, cfg, configs, currentAltReachedAcceptState, speculative, treatEofAsEpsilon);
    }
  }

  return currentAltReachedAcceptState;
}; // side-effect: can alter configs.hasSemanticContext


LexerATNSimulator.prototype.getEpsilonTarget = function (input, config, trans, configs, speculative, treatEofAsEpsilon) {
  var cfg = null;

  if (trans.serializationType === Transition.RULE) {
    var newContext = SingletonPredictionContext.create(config.context, trans.followState.stateNumber);
    cfg = new LexerATNConfig({
      state: trans.target,
      context: newContext
    }, config);
  } else if (trans.serializationType === Transition.PRECEDENCE) {
    throw "Precedence predicates are not supported in lexers.";
  } else if (trans.serializationType === Transition.PREDICATE) {
    // Track traversing semantic predicates. If we traverse,
    // we cannot add a DFA state for this "reach" computation
    // because the DFA would not test the predicate again in the
    // future. Rather than creating collections of semantic predicates
    // like v3 and testing them on prediction, v4 will test them on the
    // fly all the time using the ATN not the DFA. This is slower but
    // semantically it's not used that often. One of the key elements to
    // this predicate mechanism is not adding DFA states that see
    // predicates immediately afterwards in the ATN. For example,
    // a : ID {p1}? | ID {p2}? ;
    // should create the start state for rule 'a' (to save start state
    // competition), but should not create target of ID state. The
    // collection of ATN states the following ID references includes
    // states reached by traversing predicates. Since this is when we
    // test them, we cannot cash the DFA state target of ID.
    if (LexerATNSimulator.debug) {
      console.log("EVAL rule " + trans.ruleIndex + ":" + trans.predIndex);
    }

    configs.hasSemanticContext = true;

    if (this.evaluatePredicate(input, trans.ruleIndex, trans.predIndex, speculative)) {
      cfg = new LexerATNConfig({
        state: trans.target
      }, config);
    }
  } else if (trans.serializationType === Transition.ACTION) {
    if (config.context === null || config.context.hasEmptyPath()) {
      // execute actions anywhere in the start rule for a token.
      //
      // TODO: if the entry rule is invoked recursively, some
      // actions may be executed during the recursive call. The
      // problem can appear when hasEmptyPath() is true but
      // isEmpty() is false. In this case, the config needs to be
      // split into two contexts - one with just the empty path
      // and another with everything but the empty path.
      // Unfortunately, the current algorithm does not allow
      // getEpsilonTarget to return two configurations, so
      // additional modifications are needed before we can support
      // the split operation.
      var lexerActionExecutor = LexerActionExecutor.append(config.lexerActionExecutor, this.atn.lexerActions[trans.actionIndex]);
      cfg = new LexerATNConfig({
        state: trans.target,
        lexerActionExecutor: lexerActionExecutor
      }, config);
    } else {
      // ignore actions in referenced rules
      cfg = new LexerATNConfig({
        state: trans.target
      }, config);
    }
  } else if (trans.serializationType === Transition.EPSILON) {
    cfg = new LexerATNConfig({
      state: trans.target
    }, config);
  } else if (trans.serializationType === Transition.ATOM || trans.serializationType === Transition.RANGE || trans.serializationType === Transition.SET) {
    if (treatEofAsEpsilon) {
      if (trans.matches(Token.EOF, 0, Lexer.MAX_CHAR_VALUE)) {
        cfg = new LexerATNConfig({
          state: trans.target
        }, config);
      }
    }
  }

  return cfg;
}; // Evaluate a predicate specified in the lexer.
//
// <p>If {@code speculative} is {@code true}, this method was called before
// {@link //consume} for the matched character. This method should call
// {@link //consume} before evaluating the predicate to ensure position
// sensitive values, including {@link Lexer//getText}, {@link Lexer//getLine},
// and {@link Lexer//getcolumn}, properly reflect the current
// lexer state. This method should restore {@code input} and the simulator
// to the original state before returning (i.e. undo the actions made by the
// call to {@link //consume}.</p>
//
// @param input The input stream.
// @param ruleIndex The rule containing the predicate.
// @param predIndex The index of the predicate within the rule.
// @param speculative {@code true} if the current index in {@code input} is
// one character before the predicate's location.
//
// @return {@code true} if the specified predicate evaluates to
// {@code true}.
// /


LexerATNSimulator.prototype.evaluatePredicate = function (input, ruleIndex, predIndex, speculative) {
  // assume true if no recognizer was provided
  if (this.recog === null) {
    return true;
  }

  if (!speculative) {
    return this.recog.sempred(null, ruleIndex, predIndex);
  }

  var savedcolumn = this.column;
  var savedLine = this.line;
  var index = input.index;
  var marker = input.mark();

  try {
    this.consume(input);
    return this.recog.sempred(null, ruleIndex, predIndex);
  } finally {
    this.column = savedcolumn;
    this.line = savedLine;
    input.seek(index);
    input.release(marker);
  }
};

LexerATNSimulator.prototype.captureSimState = function (settings, input, dfaState) {
  settings.index = input.index;
  settings.line = this.line;
  settings.column = this.column;
  settings.dfaState = dfaState;
};

LexerATNSimulator.prototype.addDFAEdge = function (from_, tk, to, cfgs) {
  if (to === undefined) {
    to = null;
  }

  if (cfgs === undefined) {
    cfgs = null;
  }

  if (to === null && cfgs !== null) {
    // leading to this call, ATNConfigSet.hasSemanticContext is used as a
    // marker indicating dynamic predicate evaluation makes this edge
    // dependent on the specific input sequence, so the static edge in the
    // DFA should be omitted. The target DFAState is still created since
    // execATN has the ability to resynchronize with the DFA state cache
    // following the predicate evaluation step.
    //
    // TJP notes: next time through the DFA, we see a pred again and eval.
    // If that gets us to a previously created (but dangling) DFA
    // state, we can continue in pure DFA mode from there.
    // /
    var suppressEdge = cfgs.hasSemanticContext;
    cfgs.hasSemanticContext = false;
    to = this.addDFAState(cfgs);

    if (suppressEdge) {
      return to;
    }
  } // add the edge


  if (tk < LexerATNSimulator.MIN_DFA_EDGE || tk > LexerATNSimulator.MAX_DFA_EDGE) {
    // Only track edges within the DFA bounds
    return to;
  }

  if (LexerATNSimulator.debug) {
    console.log("EDGE " + from_ + " -> " + to + " upon " + tk);
  }

  if (from_.edges === null) {
    // make room for tokens 1..n and -1 masquerading as index 0
    from_.edges = [];
  }

  from_.edges[tk - LexerATNSimulator.MIN_DFA_EDGE] = to; // connect

  return to;
}; // Add a new DFA state if there isn't one with this set of
// configurations already. This method also detects the first
// configuration containing an ATN rule stop state. Later, when
// traversing the DFA, we will know which rule to accept.


LexerATNSimulator.prototype.addDFAState = function (configs) {
  var proposed = new DFAState(null, configs);
  var firstConfigWithRuleStopState = null;

  for (var i = 0; i < configs.items.length; i++) {
    var cfg = configs.items[i];

    if (cfg.state instanceof RuleStopState) {
      firstConfigWithRuleStopState = cfg;
      break;
    }
  }

  if (firstConfigWithRuleStopState !== null) {
    proposed.isAcceptState = true;
    proposed.lexerActionExecutor = firstConfigWithRuleStopState.lexerActionExecutor;
    proposed.prediction = this.atn.ruleToTokenType[firstConfigWithRuleStopState.state.ruleIndex];
  }

  var dfa = this.decisionToDFA[this.mode];
  var existing = dfa.states.get(proposed);

  if (existing !== null) {
    return existing;
  }

  var newState = proposed;
  newState.stateNumber = dfa.states.length;
  configs.setReadonly(true);
  newState.configs = configs;
  dfa.states.add(newState);
  return newState;
};

LexerATNSimulator.prototype.getDFA = function (mode) {
  return this.decisionToDFA[mode];
}; // Get the text matched so far for the current token.


LexerATNSimulator.prototype.getText = function (input) {
  // index is first lookahead char, don't include.
  return input.getText(this.startIndex, input.index - 1);
};

LexerATNSimulator.prototype.consume = function (input) {
  var curChar = input.LA(1);

  if (curChar === "\n".charCodeAt(0)) {
    this.line += 1;
    this.column = 0;
  } else {
    this.column += 1;
  }

  input.consume();
};

LexerATNSimulator.prototype.getTokenName = function (tt) {
  if (tt === -1) {
    return "EOF";
  } else {
    return "'" + String.fromCharCode(tt) + "'";
  }
};

exports.LexerATNSimulator = LexerATNSimulator;

/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

/* Copyright (c) 2012-2017 The ANTLR Project. All rights reserved.
 * Use of this file is governed by the BSD 3-clause license that
 * can be found in the LICENSE.txt file in the project root.
 */
///
// A lexer is recognizer that draws input symbols from a character stream.
//  lexer grammars result in a subclass of this object. A Lexer object
//  uses simplified match() and error recovery mechanisms in the interest of speed.
var Token = __webpack_require__(9).Token;

var Recognizer = __webpack_require__(26).Recognizer;

var CommonTokenFactory = __webpack_require__(28).CommonTokenFactory;

var RecognitionException = __webpack_require__(29).RecognitionException;

var LexerNoViableAltException = __webpack_require__(29).LexerNoViableAltException;

function TokenSource() {
  return this;
}

function Lexer(input) {
  Recognizer.call(this);
  this._input = input;
  this._factory = CommonTokenFactory.DEFAULT;
  this._tokenFactorySourcePair = [this, input];
  this._interp = null; // child classes must populate this
  // The goal of all lexer rules/methods is to create a token object.
  // this is an instance variable as multiple rules may collaborate to
  // create a single token. nextToken will return this object after
  // matching lexer rule(s). If you subclass to allow multiple token
  // emissions, then set this to the last token to be matched or
  // something nonnull so that the auto token emit mechanism will not
  // emit another token.

  this._token = null; // What character index in the stream did the current token start at?
  // Needed, for example, to get the text for current token. Set at
  // the start of nextToken.

  this._tokenStartCharIndex = -1; // The line on which the first character of the token resides///

  this._tokenStartLine = -1; // The character position of first character within the line///

  this._tokenStartColumn = -1; // Once we see EOF on char stream, next token will be EOF.
  // If you have DONE : EOF ; then you see DONE EOF.

  this._hitEOF = false; // The channel number for the current token///

  this._channel = Token.DEFAULT_CHANNEL; // The token type for the current token///

  this._type = Token.INVALID_TYPE;
  this._modeStack = [];
  this._mode = Lexer.DEFAULT_MODE; // You can set the text for the current token to override what is in
  // the input char buffer. Use setText() or can set this instance var.
  // /

  this._text = null;
  return this;
}

Lexer.prototype = Object.create(Recognizer.prototype);
Lexer.prototype.constructor = Lexer;
Lexer.DEFAULT_MODE = 0;
Lexer.MORE = -2;
Lexer.SKIP = -3;
Lexer.DEFAULT_TOKEN_CHANNEL = Token.DEFAULT_CHANNEL;
Lexer.HIDDEN = Token.HIDDEN_CHANNEL;
Lexer.MIN_CHAR_VALUE = 0x0000;
Lexer.MAX_CHAR_VALUE = 0x10FFFF;

Lexer.prototype.reset = function () {
  // wack Lexer state variables
  if (this._input !== null) {
    this._input.seek(0); // rewind the input

  }

  this._token = null;
  this._type = Token.INVALID_TYPE;
  this._channel = Token.DEFAULT_CHANNEL;
  this._tokenStartCharIndex = -1;
  this._tokenStartColumn = -1;
  this._tokenStartLine = -1;
  this._text = null;
  this._hitEOF = false;
  this._mode = Lexer.DEFAULT_MODE;
  this._modeStack = [];

  this._interp.reset();
}; // Return a token from this source; i.e., match a token on the char stream.


Lexer.prototype.nextToken = function () {
  if (this._input === null) {
    throw "nextToken requires a non-null input stream.";
  } // Mark start location in char stream so unbuffered streams are
  // guaranteed at least have text of current token


  var tokenStartMarker = this._input.mark();

  try {
    while (true) {
      if (this._hitEOF) {
        this.emitEOF();
        return this._token;
      }

      this._token = null;
      this._channel = Token.DEFAULT_CHANNEL;
      this._tokenStartCharIndex = this._input.index;
      this._tokenStartColumn = this._interp.column;
      this._tokenStartLine = this._interp.line;
      this._text = null;
      var continueOuter = false;

      while (true) {
        this._type = Token.INVALID_TYPE;
        var ttype = Lexer.SKIP;

        try {
          ttype = this._interp.match(this._input, this._mode);
        } catch (e) {
          if (e instanceof RecognitionException) {
            this.notifyListeners(e); // report error

            this.recover(e);
          } else {
            console.log(e.stack);
            throw e;
          }
        }

        if (this._input.LA(1) === Token.EOF) {
          this._hitEOF = true;
        }

        if (this._type === Token.INVALID_TYPE) {
          this._type = ttype;
        }

        if (this._type === Lexer.SKIP) {
          continueOuter = true;
          break;
        }

        if (this._type !== Lexer.MORE) {
          break;
        }
      }

      if (continueOuter) {
        continue;
      }

      if (this._token === null) {
        this.emit();
      }

      return this._token;
    }
  } finally {
    // make sure we release marker after match or
    // unbuffered char stream will keep buffering
    this._input.release(tokenStartMarker);
  }
}; // Instruct the lexer to skip creating a token for current lexer rule
// and look for another token. nextToken() knows to keep looking when
// a lexer rule finishes with token set to SKIP_TOKEN. Recall that
// if token==null at end of any token rule, it creates one for you
// and emits it.
// /


Lexer.prototype.skip = function () {
  this._type = Lexer.SKIP;
};

Lexer.prototype.more = function () {
  this._type = Lexer.MORE;
};

Lexer.prototype.mode = function (m) {
  this._mode = m;
};

Lexer.prototype.pushMode = function (m) {
  if (this._interp.debug) {
    console.log("pushMode " + m);
  }

  this._modeStack.push(this._mode);

  this.mode(m);
};

Lexer.prototype.popMode = function () {
  if (this._modeStack.length === 0) {
    throw "Empty Stack";
  }

  if (this._interp.debug) {
    console.log("popMode back to " + this._modeStack.slice(0, -1));
  }

  this.mode(this._modeStack.pop());
  return this._mode;
}; // Set the char stream and reset the lexer


Object.defineProperty(Lexer.prototype, "inputStream", {
  get: function get() {
    return this._input;
  },
  set: function set(input) {
    this._input = null;
    this._tokenFactorySourcePair = [this, this._input];
    this.reset();
    this._input = input;
    this._tokenFactorySourcePair = [this, this._input];
  }
});
Object.defineProperty(Lexer.prototype, "sourceName", {
  get: function sourceName() {
    return this._input.sourceName;
  }
}); // By default does not support multiple emits per nextToken invocation
// for efficiency reasons. Subclass and override this method, nextToken,
// and getToken (to push tokens into a list and pull from that list
// rather than a single variable as this implementation does).
// /

Lexer.prototype.emitToken = function (token) {
  this._token = token;
}; // The standard method called to automatically emit a token at the
// outermost lexical rule. The token object should point into the
// char buffer start..stop. If there is a text override in 'text',
// use that to set the token's text. Override this method to emit
// custom Token objects or provide a new factory.
// /


Lexer.prototype.emit = function () {
  var t = this._factory.create(this._tokenFactorySourcePair, this._type, this._text, this._channel, this._tokenStartCharIndex, this.getCharIndex() - 1, this._tokenStartLine, this._tokenStartColumn);

  this.emitToken(t);
  return t;
};

Lexer.prototype.emitEOF = function () {
  var cpos = this.column;
  var lpos = this.line;

  var eof = this._factory.create(this._tokenFactorySourcePair, Token.EOF, null, Token.DEFAULT_CHANNEL, this._input.index, this._input.index - 1, lpos, cpos);

  this.emitToken(eof);
  return eof;
};

Object.defineProperty(Lexer.prototype, "type", {
  get: function get() {
    return this.type;
  },
  set: function set(type) {
    this._type = type;
  }
});
Object.defineProperty(Lexer.prototype, "line", {
  get: function get() {
    return this._interp.line;
  },
  set: function set(line) {
    this._interp.line = line;
  }
});
Object.defineProperty(Lexer.prototype, "column", {
  get: function get() {
    return this._interp.column;
  },
  set: function set(column) {
    this._interp.column = column;
  }
}); // What is the index of the current character of lookahead?///

Lexer.prototype.getCharIndex = function () {
  return this._input.index;
}; // Return the text matched so far for the current token or any text override.
//Set the complete text of this token; it wipes any previous changes to the text.


Object.defineProperty(Lexer.prototype, "text", {
  get: function get() {
    if (this._text !== null) {
      return this._text;
    } else {
      return this._interp.getText(this._input);
    }
  },
  set: function set(text) {
    this._text = text;
  }
}); // Return a list of all Token objects in input char stream.
// Forces load of all tokens. Does not include EOF token.
// /

Lexer.prototype.getAllTokens = function () {
  var tokens = [];
  var t = this.nextToken();

  while (t.type !== Token.EOF) {
    tokens.push(t);
    t = this.nextToken();
  }

  return tokens;
};

Lexer.prototype.notifyListeners = function (e) {
  var start = this._tokenStartCharIndex;
  var stop = this._input.index;

  var text = this._input.getText(start, stop);

  var msg = "token recognition error at: '" + this.getErrorDisplay(text) + "'";
  var listener = this.getErrorListenerDispatch();
  listener.syntaxError(this, null, this._tokenStartLine, this._tokenStartColumn, msg, e);
};

Lexer.prototype.getErrorDisplay = function (s) {
  var d = [];

  for (var i = 0; i < s.length; i++) {
    d.push(s[i]);
  }

  return d.join('');
};

Lexer.prototype.getErrorDisplayForChar = function (c) {
  if (c.charCodeAt(0) === Token.EOF) {
    return "<EOF>";
  } else if (c === '\n') {
    return "\\n";
  } else if (c === '\t') {
    return "\\t";
  } else if (c === '\r') {
    return "\\r";
  } else {
    return c;
  }
};

Lexer.prototype.getCharErrorDisplay = function (c) {
  return "'" + this.getErrorDisplayForChar(c) + "'";
}; // Lexers can normally match any char in it's vocabulary after matching
// a token, so do the easy thing and just kill a character and hope
// it all works out. You can instead use the rule invocation stack
// to do sophisticated error recovery if you are in a fragment rule.
// /


Lexer.prototype.recover = function (re) {
  if (this._input.LA(1) !== Token.EOF) {
    if (re instanceof LexerNoViableAltException) {
      // skip a char and try again
      this._interp.consume(this._input);
    } else {
      // TODO: Do we lose character or line position information?
      this._input.consume();
    }
  }
};

exports.Lexer = Lexer;

/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

//

/* Copyright (c) 2012-2017 The ANTLR Project. All rights reserved.
 * Use of this file is governed by the BSD 3-clause license that
 * can be found in the LICENSE.txt file in the project root.
 */
//
var Token = __webpack_require__(9).Token;

var ConsoleErrorListener = __webpack_require__(27).ConsoleErrorListener;

var ProxyErrorListener = __webpack_require__(27).ProxyErrorListener;

function Recognizer() {
  this._listeners = [ConsoleErrorListener.INSTANCE];
  this._interp = null;
  this._stateNumber = -1;
  return this;
}

Recognizer.tokenTypeMapCache = {};
Recognizer.ruleIndexMapCache = {};

Recognizer.prototype.checkVersion = function (toolVersion) {
  var runtimeVersion = "4.8";

  if (runtimeVersion !== toolVersion) {
    console.log("ANTLR runtime and generated code versions disagree: " + runtimeVersion + "!=" + toolVersion);
  }
};

Recognizer.prototype.addErrorListener = function (listener) {
  this._listeners.push(listener);
};

Recognizer.prototype.removeErrorListeners = function () {
  this._listeners = [];
};

Recognizer.prototype.getTokenTypeMap = function () {
  var tokenNames = this.getTokenNames();

  if (tokenNames === null) {
    throw "The current recognizer does not provide a list of token names.";
  }

  var result = this.tokenTypeMapCache[tokenNames];

  if (result === undefined) {
    result = tokenNames.reduce(function (o, k, i) {
      o[k] = i;
    });
    result.EOF = Token.EOF;
    this.tokenTypeMapCache[tokenNames] = result;
  }

  return result;
}; // Get a map from rule names to rule indexes.
//
// <p>Used for XPath and tree pattern compilation.</p>
//


Recognizer.prototype.getRuleIndexMap = function () {
  var ruleNames = this.ruleNames;

  if (ruleNames === null) {
    throw "The current recognizer does not provide a list of rule names.";
  }

  var result = this.ruleIndexMapCache[ruleNames];

  if (result === undefined) {
    result = ruleNames.reduce(function (o, k, i) {
      o[k] = i;
    });
    this.ruleIndexMapCache[ruleNames] = result;
  }

  return result;
};

Recognizer.prototype.getTokenType = function (tokenName) {
  var ttype = this.getTokenTypeMap()[tokenName];

  if (ttype !== undefined) {
    return ttype;
  } else {
    return Token.INVALID_TYPE;
  }
}; // What is the error header, normally line/character position information?//


Recognizer.prototype.getErrorHeader = function (e) {
  var line = e.getOffendingToken().line;
  var column = e.getOffendingToken().column;
  return "line " + line + ":" + column;
}; // How should a token be displayed in an error message? The default
//  is to display just the text, but during development you might
//  want to have a lot of information spit out.  Override in that case
//  to use t.toString() (which, for CommonToken, dumps everything about
//  the token). This is better than forcing you to override a method in
//  your token objects because you don't have to go modify your lexer
//  so that it creates a new Java type.
//
// @deprecated This method is not called by the ANTLR 4 Runtime. Specific
// implementations of {@link ANTLRErrorStrategy} may provide a similar
// feature when necessary. For example, see
// {@link DefaultErrorStrategy//getTokenErrorDisplay}.
//


Recognizer.prototype.getTokenErrorDisplay = function (t) {
  if (t === null) {
    return "<no token>";
  }

  var s = t.text;

  if (s === null) {
    if (t.type === Token.EOF) {
      s = "<EOF>";
    } else {
      s = "<" + t.type + ">";
    }
  }

  s = s.replace("\n", "\\n").replace("\r", "\\r").replace("\t", "\\t");
  return "'" + s + "'";
};

Recognizer.prototype.getErrorListenerDispatch = function () {
  return new ProxyErrorListener(this._listeners);
}; // subclass needs to override these if there are sempreds or actions
// that the ATN interp needs to execute


Recognizer.prototype.sempred = function (localctx, ruleIndex, actionIndex) {
  return true;
};

Recognizer.prototype.precpred = function (localctx, precedence) {
  return true;
}; //Indicate that the recognizer has changed internal state that is
//consistent with the ATN state passed in.  This way we always know
//where we are in the ATN as the parser goes along. The rule
//context objects form a stack that lets us see the stack of
//invoking rules. Combine this and we have complete ATN
//configuration information.


Object.defineProperty(Recognizer.prototype, "state", {
  get: function get() {
    return this._stateNumber;
  },
  set: function set(state) {
    this._stateNumber = state;
  }
});
exports.Recognizer = Recognizer;

/***/ }),
/* 27 */
/***/ (function(module, exports) {

//

/* Copyright (c) 2012-2017 The ANTLR Project. All rights reserved.
 * Use of this file is governed by the BSD 3-clause license that
 * can be found in the LICENSE.txt file in the project root.
 */
// Provides an empty default implementation of {@link ANTLRErrorListener}. The
// default implementation of each method does nothing, but can be overridden as
// necessary.
function ErrorListener() {
  return this;
}

ErrorListener.prototype.syntaxError = function (recognizer, offendingSymbol, line, column, msg, e) {};

ErrorListener.prototype.reportAmbiguity = function (recognizer, dfa, startIndex, stopIndex, exact, ambigAlts, configs) {};

ErrorListener.prototype.reportAttemptingFullContext = function (recognizer, dfa, startIndex, stopIndex, conflictingAlts, configs) {};

ErrorListener.prototype.reportContextSensitivity = function (recognizer, dfa, startIndex, stopIndex, prediction, configs) {};

function ConsoleErrorListener() {
  ErrorListener.call(this);
  return this;
}

ConsoleErrorListener.prototype = Object.create(ErrorListener.prototype);
ConsoleErrorListener.prototype.constructor = ConsoleErrorListener; //
// Provides a default instance of {@link ConsoleErrorListener}.
//

ConsoleErrorListener.INSTANCE = new ConsoleErrorListener(); //
// {@inheritDoc}
//
// <p>
// This implementation prints messages to {@link System//err} containing the
// values of {@code line}, {@code charPositionInLine}, and {@code msg} using
// the following format.</p>
//
// <pre>
// line <em>line</em>:<em>charPositionInLine</em> <em>msg</em>
// </pre>
//

ConsoleErrorListener.prototype.syntaxError = function (recognizer, offendingSymbol, line, column, msg, e) {
  console.error("line " + line + ":" + column + " " + msg);
};

function ProxyErrorListener(delegates) {
  ErrorListener.call(this);

  if (delegates === null) {
    throw "delegates";
  }

  this.delegates = delegates;
  return this;
}

ProxyErrorListener.prototype = Object.create(ErrorListener.prototype);
ProxyErrorListener.prototype.constructor = ProxyErrorListener;

ProxyErrorListener.prototype.syntaxError = function (recognizer, offendingSymbol, line, column, msg, e) {
  this.delegates.map(function (d) {
    d.syntaxError(recognizer, offendingSymbol, line, column, msg, e);
  });
};

ProxyErrorListener.prototype.reportAmbiguity = function (recognizer, dfa, startIndex, stopIndex, exact, ambigAlts, configs) {
  this.delegates.map(function (d) {
    d.reportAmbiguity(recognizer, dfa, startIndex, stopIndex, exact, ambigAlts, configs);
  });
};

ProxyErrorListener.prototype.reportAttemptingFullContext = function (recognizer, dfa, startIndex, stopIndex, conflictingAlts, configs) {
  this.delegates.map(function (d) {
    d.reportAttemptingFullContext(recognizer, dfa, startIndex, stopIndex, conflictingAlts, configs);
  });
};

ProxyErrorListener.prototype.reportContextSensitivity = function (recognizer, dfa, startIndex, stopIndex, prediction, configs) {
  this.delegates.map(function (d) {
    d.reportContextSensitivity(recognizer, dfa, startIndex, stopIndex, prediction, configs);
  });
};

exports.ErrorListener = ErrorListener;
exports.ConsoleErrorListener = ConsoleErrorListener;
exports.ProxyErrorListener = ProxyErrorListener;

/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

//

/* Copyright (c) 2012-2017 The ANTLR Project. All rights reserved.
 * Use of this file is governed by the BSD 3-clause license that
 * can be found in the LICENSE.txt file in the project root.
 */
//
//
// This default implementation of {@link TokenFactory} creates
// {@link CommonToken} objects.
//
var CommonToken = __webpack_require__(9).CommonToken;

function TokenFactory() {
  return this;
}

function CommonTokenFactory(copyText) {
  TokenFactory.call(this); // Indicates whether {@link CommonToken//setText} should be called after
  // constructing tokens to explicitly set the text. This is useful for cases
  // where the input stream might not be able to provide arbitrary substrings
  // of text from the input after the lexer creates a token (e.g. the
  // implementation of {@link CharStream//getText} in
  // {@link UnbufferedCharStream} throws an
  // {@link UnsupportedOperationException}). Explicitly setting the token text
  // allows {@link Token//getText} to be called at any time regardless of the
  // input stream implementation.
  //
  // <p>
  // The default value is {@code false} to avoid the performance and memory
  // overhead of copying text for every token unless explicitly requested.</p>
  //

  this.copyText = copyText === undefined ? false : copyText;
  return this;
}

CommonTokenFactory.prototype = Object.create(TokenFactory.prototype);
CommonTokenFactory.prototype.constructor = CommonTokenFactory; //
// The default {@link CommonTokenFactory} instance.
//
// <p>
// This token factory does not explicitly copy token text when constructing
// tokens.</p>
//

CommonTokenFactory.DEFAULT = new CommonTokenFactory();

CommonTokenFactory.prototype.create = function (source, type, text, channel, start, stop, line, column) {
  var t = new CommonToken(source, type, channel, start, stop);
  t.line = line;
  t.column = column;

  if (text !== null) {
    t.text = text;
  } else if (this.copyText && source[1] !== null) {
    t.text = source[1].getText(start, stop);
  }

  return t;
};

CommonTokenFactory.prototype.createThin = function (type, text) {
  var t = new CommonToken(null, type);
  t.text = text;
  return t;
};

exports.CommonTokenFactory = CommonTokenFactory;

/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

/* Copyright (c) 2012-2017 The ANTLR Project. All rights reserved.
 * Use of this file is governed by the BSD 3-clause license that
 * can be found in the LICENSE.txt file in the project root.
 */
// The root of the ANTLR exception hierarchy. In general, ANTLR tracks just
//  3 kinds of errors: prediction errors, failed predicate errors, and
//  mismatched input errors. In each case, the parser knows where it is
//  in the input, where it is in the ATN, the rule invocation stack,
//  and what kind of problem occurred.
var PredicateTransition = __webpack_require__(14).PredicateTransition;

function RecognitionException(params) {
  Error.call(this);

  if (!!Error.captureStackTrace) {
    Error.captureStackTrace(this, RecognitionException);
  } else {
    var stack = new Error().stack;
  }

  this.message = params.message;
  this.recognizer = params.recognizer;
  this.input = params.input;
  this.ctx = params.ctx; // The current {@link Token} when an error occurred. Since not all streams
  // support accessing symbols by index, we have to track the {@link Token}
  // instance itself.

  this.offendingToken = null; // Get the ATN state number the parser was in at the time the error
  // occurred. For {@link NoViableAltException} and
  // {@link LexerNoViableAltException} exceptions, this is the
  // {@link DecisionState} number. For others, it is the state whose outgoing
  // edge we couldn't match.

  this.offendingState = -1;

  if (this.recognizer !== null) {
    this.offendingState = this.recognizer.state;
  }

  return this;
}

RecognitionException.prototype = Object.create(Error.prototype);
RecognitionException.prototype.constructor = RecognitionException; // <p>If the state number is not known, this method returns -1.</p>
//
// Gets the set of input symbols which could potentially follow the
// previously matched symbol at the time this exception was thrown.
//
// <p>If the set of expected tokens is not known and could not be computed,
// this method returns {@code null}.</p>
//
// @return The set of token types that could potentially follow the current
// state in the ATN, or {@code null} if the information is not available.
// /

RecognitionException.prototype.getExpectedTokens = function () {
  if (this.recognizer !== null) {
    return this.recognizer.atn.getExpectedTokens(this.offendingState, this.ctx);
  } else {
    return null;
  }
};

RecognitionException.prototype.toString = function () {
  return this.message;
};

function LexerNoViableAltException(lexer, input, startIndex, deadEndConfigs) {
  RecognitionException.call(this, {
    message: "",
    recognizer: lexer,
    input: input,
    ctx: null
  });
  this.startIndex = startIndex;
  this.deadEndConfigs = deadEndConfigs;
  return this;
}

LexerNoViableAltException.prototype = Object.create(RecognitionException.prototype);
LexerNoViableAltException.prototype.constructor = LexerNoViableAltException;

LexerNoViableAltException.prototype.toString = function () {
  var symbol = "";

  if (this.startIndex >= 0 && this.startIndex < this.input.size) {
    symbol = this.input.getText((this.startIndex, this.startIndex));
  }

  return "LexerNoViableAltException" + symbol;
}; // Indicates that the parser could not decide which of two or more paths
// to take based upon the remaining input. It tracks the starting token
// of the offending input and also knows where the parser was
// in the various paths when the error. Reported by reportNoViableAlternative()
//


function NoViableAltException(recognizer, input, startToken, offendingToken, deadEndConfigs, ctx) {
  ctx = ctx || recognizer._ctx;
  offendingToken = offendingToken || recognizer.getCurrentToken();
  startToken = startToken || recognizer.getCurrentToken();
  input = input || recognizer.getInputStream();
  RecognitionException.call(this, {
    message: "",
    recognizer: recognizer,
    input: input,
    ctx: ctx
  }); // Which configurations did we try at input.index() that couldn't match
  // input.LT(1)?//

  this.deadEndConfigs = deadEndConfigs; // The token object at the start index; the input stream might
  // not be buffering tokens so get a reference to it. (At the
  // time the error occurred, of course the stream needs to keep a
  // buffer all of the tokens but later we might not have access to those.)

  this.startToken = startToken;
  this.offendingToken = offendingToken;
}

NoViableAltException.prototype = Object.create(RecognitionException.prototype);
NoViableAltException.prototype.constructor = NoViableAltException; // This signifies any kind of mismatched input exceptions such as
// when the current input does not match the expected token.
//

function InputMismatchException(recognizer) {
  RecognitionException.call(this, {
    message: "",
    recognizer: recognizer,
    input: recognizer.getInputStream(),
    ctx: recognizer._ctx
  });
  this.offendingToken = recognizer.getCurrentToken();
}

InputMismatchException.prototype = Object.create(RecognitionException.prototype);
InputMismatchException.prototype.constructor = InputMismatchException; // A semantic predicate failed during validation. Validation of predicates
// occurs when normally parsing the alternative just like matching a token.
// Disambiguating predicate evaluation occurs when we test a predicate during
// prediction.

function FailedPredicateException(recognizer, predicate, message) {
  RecognitionException.call(this, {
    message: this.formatMessage(predicate, message || null),
    recognizer: recognizer,
    input: recognizer.getInputStream(),
    ctx: recognizer._ctx
  });
  var s = recognizer._interp.atn.states[recognizer.state];
  var trans = s.transitions[0];

  if (trans instanceof PredicateTransition) {
    this.ruleIndex = trans.ruleIndex;
    this.predicateIndex = trans.predIndex;
  } else {
    this.ruleIndex = 0;
    this.predicateIndex = 0;
  }

  this.predicate = predicate;
  this.offendingToken = recognizer.getCurrentToken();
  return this;
}

FailedPredicateException.prototype = Object.create(RecognitionException.prototype);
FailedPredicateException.prototype.constructor = FailedPredicateException;

FailedPredicateException.prototype.formatMessage = function (predicate, message) {
  if (message !== null) {
    return message;
  } else {
    return "failed predicate: {" + predicate + "}?";
  }
};

function ParseCancellationException() {
  Error.call(this);
  Error.captureStackTrace(this, ParseCancellationException);
  return this;
}

ParseCancellationException.prototype = Object.create(Error.prototype);
ParseCancellationException.prototype.constructor = ParseCancellationException;
exports.RecognitionException = RecognitionException;
exports.NoViableAltException = NoViableAltException;
exports.LexerNoViableAltException = LexerNoViableAltException;
exports.InputMismatchException = InputMismatchException;
exports.FailedPredicateException = FailedPredicateException;
exports.ParseCancellationException = ParseCancellationException;

/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

//

/* Copyright (c) 2012-2017 The ANTLR Project. All rights reserved.
 * Use of this file is governed by the BSD 3-clause license that
 * can be found in the LICENSE.txt file in the project root.
 */
///
var DFAState = __webpack_require__(31).DFAState;

var ATNConfigSet = __webpack_require__(32).ATNConfigSet;

var getCachedPredictionContext = __webpack_require__(15).getCachedPredictionContext;

var Map = __webpack_require__(8).Map;

function ATNSimulator(atn, sharedContextCache) {
  // The context cache maps all PredictionContext objects that are ==
  //  to a single cached copy. This cache is shared across all contexts
  //  in all ATNConfigs in all DFA states.  We rebuild each ATNConfigSet
  //  to use only cached nodes/graphs in addDFAState(). We don't want to
  //  fill this during closure() since there are lots of contexts that
  //  pop up but are not used ever again. It also greatly slows down closure().
  //
  //  <p>This cache makes a huge difference in memory and a little bit in speed.
  //  For the Java grammar on java.*, it dropped the memory requirements
  //  at the end from 25M to 16M. We don't store any of the full context
  //  graphs in the DFA because they are limited to local context only,
  //  but apparently there's a lot of repetition there as well. We optimize
  //  the config contexts before storing the config set in the DFA states
  //  by literally rebuilding them with cached subgraphs only.</p>
  //
  //  <p>I tried a cache for use during closure operations, that was
  //  whacked after each adaptivePredict(). It cost a little bit
  //  more time I think and doesn't save on the overall footprint
  //  so it's not worth the complexity.</p>
  ///
  this.atn = atn;
  this.sharedContextCache = sharedContextCache;
  return this;
} // Must distinguish between missing edge and edge we know leads nowhere///


ATNSimulator.ERROR = new DFAState(0x7FFFFFFF, new ATNConfigSet());

ATNSimulator.prototype.getCachedContext = function (context) {
  if (this.sharedContextCache === null) {
    return context;
  }

  var visited = new Map();
  return getCachedPredictionContext(context, this.sharedContextCache, visited);
};

exports.ATNSimulator = ATNSimulator;

/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

//

/* Copyright (c) 2012-2017 The ANTLR Project. All rights reserved.
 * Use of this file is governed by the BSD 3-clause license that
 * can be found in the LICENSE.txt file in the project root.
 */
///
var ATNConfigSet = __webpack_require__(32).ATNConfigSet;

var Utils = __webpack_require__(8);

var Hash = Utils.Hash;
var Set = Utils.Set; // Map a predicate to a predicted alternative.///

function PredPrediction(pred, alt) {
  this.alt = alt;
  this.pred = pred;
  return this;
}

PredPrediction.prototype.toString = function () {
  return "(" + this.pred + ", " + this.alt + ")";
}; // A DFA state represents a set of possible ATN configurations.
// As Aho, Sethi, Ullman p. 117 says "The DFA uses its state
// to keep track of all possible states the ATN can be in after
// reading each input symbol. That is to say, after reading
// input a1a2..an, the DFA is in a state that represents the
// subset T of the states of the ATN that are reachable from the
// ATN's start state along some path labeled a1a2..an."
// In conventional NFA&rarr;DFA conversion, therefore, the subset T
// would be a bitset representing the set of states the
// ATN could be in. We need to track the alt predicted by each
// state as well, however. More importantly, we need to maintain
// a stack of states, tracking the closure operations as they
// jump from rule to rule, emulating rule invocations (method calls).
// I have to add a stack to simulate the proper lookahead sequences for
// the underlying LL grammar from which the ATN was derived.
//
// <p>I use a set of ATNConfig objects not simple states. An ATNConfig
// is both a state (ala normal conversion) and a RuleContext describing
// the chain of rules (if any) followed to arrive at that state.</p>
//
// <p>A DFA state may have multiple references to a particular state,
// but with different ATN contexts (with same or different alts)
// meaning that state was reached via a different set of rule invocations.</p>
// /


function DFAState(stateNumber, configs) {
  if (stateNumber === null) {
    stateNumber = -1;
  }

  if (configs === null) {
    configs = new ATNConfigSet();
  }

  this.stateNumber = stateNumber;
  this.configs = configs; // {@code edges[symbol]} points to target of symbol. Shift up by 1 so (-1)
  // {@link Token//EOF} maps to {@code edges[0]}.

  this.edges = null;
  this.isAcceptState = false; // if accept state, what ttype do we match or alt do we predict?
  // This is set to {@link ATN//INVALID_ALT_NUMBER} when {@link
  // //predicates}{@code !=null} or
  // {@link //requiresFullContext}.

  this.prediction = 0;
  this.lexerActionExecutor = null; // Indicates that this state was created during SLL prediction that
  // discovered a conflict between the configurations in the state. Future
  // {@link ParserATNSimulator//execATN} invocations immediately jumped doing
  // full context prediction if this field is true.

  this.requiresFullContext = false; // During SLL parsing, this is a list of predicates associated with the
  // ATN configurations of the DFA state. When we have predicates,
  // {@link //requiresFullContext} is {@code false} since full context
  // prediction evaluates predicates
  // on-the-fly. If this is not null, then {@link //prediction} is
  // {@link ATN//INVALID_ALT_NUMBER}.
  //
  // <p>We only use these for non-{@link //requiresFullContext} but
  // conflicting states. That
  // means we know from the context (it's $ or we don't dip into outer
  // context) that it's an ambiguity not a conflict.</p>
  //
  // <p>This list is computed by {@link
  // ParserATNSimulator//predicateDFAState}.</p>

  this.predicates = null;
  return this;
} // Get the set of all alts mentioned by all ATN configurations in this
// DFA state.


DFAState.prototype.getAltSet = function () {
  var alts = new Set();

  if (this.configs !== null) {
    for (var i = 0; i < this.configs.length; i++) {
      var c = this.configs[i];
      alts.add(c.alt);
    }
  }

  if (alts.length === 0) {
    return null;
  } else {
    return alts;
  }
}; // Two {@link DFAState} instances are equal if their ATN configuration sets
// are the same. This method is used to see if a state already exists.
//
// <p>Because the number of alternatives and number of ATN configurations are
// finite, there is a finite number of DFA states that can be processed.
// This is necessary to show that the algorithm terminates.</p>
//
// <p>Cannot test the DFA state numbers here because in
// {@link ParserATNSimulator//addDFAState} we need to know if any other state
// exists that has this exact set of ATN configurations. The
// {@link //stateNumber} is irrelevant.</p>


DFAState.prototype.equals = function (other) {
  // compare set of ATN configurations in this set with other
  return this === other || other instanceof DFAState && this.configs.equals(other.configs);
};

DFAState.prototype.toString = function () {
  var s = "" + this.stateNumber + ":" + this.configs;

  if (this.isAcceptState) {
    s = s + "=>";
    if (this.predicates !== null) s = s + this.predicates;else s = s + this.prediction;
  }

  return s;
};

DFAState.prototype.hashCode = function () {
  var hash = new Hash();
  hash.update(this.configs);
  return hash.finish();
};

exports.DFAState = DFAState;
exports.PredPrediction = PredPrediction;

/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

//

/* Copyright (c) 2012-2017 The ANTLR Project. All rights reserved.
 * Use of this file is governed by the BSD 3-clause license that
 * can be found in the LICENSE.txt file in the project root.
 */
//
// Specialized {@link Set}{@code <}{@link ATNConfig}{@code >} that can track
// info about the set, with support for combining similar configurations using a
// graph-structured stack.
///
var ATN = __webpack_require__(6).ATN;

var Utils = __webpack_require__(8);

var Hash = Utils.Hash;
var Set = Utils.Set;

var SemanticContext = __webpack_require__(12).SemanticContext;

var merge = __webpack_require__(15).merge;

function hashATNConfig(c) {
  return c.hashCodeForConfigSet();
}

function equalATNConfigs(a, b) {
  if (a === b) {
    return true;
  } else if (a === null || b === null) {
    return false;
  } else return a.equalsForConfigSet(b);
}

function ATNConfigSet(fullCtx) {
  //
  // The reason that we need this is because we don't want the hash map to use
  // the standard hash code and equals. We need all configurations with the
  // same
  // {@code (s,i,_,semctx)} to be equal. Unfortunately, this key effectively
  // doubles
  // the number of objects associated with ATNConfigs. The other solution is
  // to
  // use a hash table that lets us specify the equals/hashcode operation.
  // All configs but hashed by (s, i, _, pi) not including context. Wiped out
  // when we go readonly as this set becomes a DFA state.
  this.configLookup = new Set(hashATNConfig, equalATNConfigs); // Indicates that this configuration set is part of a full context
  // LL prediction. It will be used to determine how to merge $. With SLL
  // it's a wildcard whereas it is not for LL context merge.

  this.fullCtx = fullCtx === undefined ? true : fullCtx; // Indicates that the set of configurations is read-only. Do not
  // allow any code to manipulate the set; DFA states will point at
  // the sets and they must not change. This does not protect the other
  // fields; in particular, conflictingAlts is set after
  // we've made this readonly.

  this.readOnly = false; // Track the elements as they are added to the set; supports get(i)///

  this.configs = []; // TODO: these fields make me pretty uncomfortable but nice to pack up info
  // together, saves recomputation
  // TODO: can we track conflicts as they are added to save scanning configs
  // later?

  this.uniqueAlt = 0;
  this.conflictingAlts = null; // Used in parser and lexer. In lexer, it indicates we hit a pred
  // while computing a closure operation. Don't make a DFA state from this.

  this.hasSemanticContext = false;
  this.dipsIntoOuterContext = false;
  this.cachedHashCode = -1;
  return this;
} // Adding a new config means merging contexts with existing configs for
// {@code (s, i, pi, _)}, where {@code s} is the
// {@link ATNConfig//state}, {@code i} is the {@link ATNConfig//alt}, and
// {@code pi} is the {@link ATNConfig//semanticContext}. We use
// {@code (s,i,pi)} as key.
//
// <p>This method updates {@link //dipsIntoOuterContext} and
// {@link //hasSemanticContext} when necessary.</p>
// /


ATNConfigSet.prototype.add = function (config, mergeCache) {
  if (mergeCache === undefined) {
    mergeCache = null;
  }

  if (this.readOnly) {
    throw "This set is readonly";
  }

  if (config.semanticContext !== SemanticContext.NONE) {
    this.hasSemanticContext = true;
  }

  if (config.reachesIntoOuterContext > 0) {
    this.dipsIntoOuterContext = true;
  }

  var existing = this.configLookup.add(config);

  if (existing === config) {
    this.cachedHashCode = -1;
    this.configs.push(config); // track order here

    return true;
  } // a previous (s,i,pi,_), merge with it and save result


  var rootIsWildcard = !this.fullCtx;
  var merged = merge(existing.context, config.context, rootIsWildcard, mergeCache); // no need to check for existing.context, config.context in cache
  // since only way to create new graphs is "call rule" and here. We
  // cache at both places.

  existing.reachesIntoOuterContext = Math.max(existing.reachesIntoOuterContext, config.reachesIntoOuterContext); // make sure to preserve the precedence filter suppression during the merge

  if (config.precedenceFilterSuppressed) {
    existing.precedenceFilterSuppressed = true;
  }

  existing.context = merged; // replace context; no need to alt mapping

  return true;
};

ATNConfigSet.prototype.getStates = function () {
  var states = new Set();

  for (var i = 0; i < this.configs.length; i++) {
    states.add(this.configs[i].state);
  }

  return states;
};

ATNConfigSet.prototype.getPredicates = function () {
  var preds = [];

  for (var i = 0; i < this.configs.length; i++) {
    var c = this.configs[i].semanticContext;

    if (c !== SemanticContext.NONE) {
      preds.push(c.semanticContext);
    }
  }

  return preds;
};

Object.defineProperty(ATNConfigSet.prototype, "items", {
  get: function get() {
    return this.configs;
  }
});

ATNConfigSet.prototype.optimizeConfigs = function (interpreter) {
  if (this.readOnly) {
    throw "This set is readonly";
  }

  if (this.configLookup.length === 0) {
    return;
  }

  for (var i = 0; i < this.configs.length; i++) {
    var config = this.configs[i];
    config.context = interpreter.getCachedContext(config.context);
  }
};

ATNConfigSet.prototype.addAll = function (coll) {
  for (var i = 0; i < coll.length; i++) {
    this.add(coll[i]);
  }

  return false;
};

ATNConfigSet.prototype.equals = function (other) {
  return this === other || other instanceof ATNConfigSet && Utils.equalArrays(this.configs, other.configs) && this.fullCtx === other.fullCtx && this.uniqueAlt === other.uniqueAlt && this.conflictingAlts === other.conflictingAlts && this.hasSemanticContext === other.hasSemanticContext && this.dipsIntoOuterContext === other.dipsIntoOuterContext;
};

ATNConfigSet.prototype.hashCode = function () {
  var hash = new Hash();
  hash.update(this.configs);
  return hash.finish();
};

ATNConfigSet.prototype.updateHashCode = function (hash) {
  if (this.readOnly) {
    if (this.cachedHashCode === -1) {
      this.cachedHashCode = this.hashCode();
    }

    hash.update(this.cachedHashCode);
  } else {
    hash.update(this.hashCode());
  }
};

Object.defineProperty(ATNConfigSet.prototype, "length", {
  get: function get() {
    return this.configs.length;
  }
});

ATNConfigSet.prototype.isEmpty = function () {
  return this.configs.length === 0;
};

ATNConfigSet.prototype.contains = function (item) {
  if (this.configLookup === null) {
    throw "This method is not implemented for readonly sets.";
  }

  return this.configLookup.contains(item);
};

ATNConfigSet.prototype.containsFast = function (item) {
  if (this.configLookup === null) {
    throw "This method is not implemented for readonly sets.";
  }

  return this.configLookup.containsFast(item);
};

ATNConfigSet.prototype.clear = function () {
  if (this.readOnly) {
    throw "This set is readonly";
  }

  this.configs = [];
  this.cachedHashCode = -1;
  this.configLookup = new Set();
};

ATNConfigSet.prototype.setReadonly = function (readOnly) {
  this.readOnly = readOnly;

  if (readOnly) {
    this.configLookup = null; // can't mod, no need for lookup cache
  }
};

ATNConfigSet.prototype.toString = function () {
  return Utils.arrayToString(this.configs) + (this.hasSemanticContext ? ",hasSemanticContext=" + this.hasSemanticContext : "") + (this.uniqueAlt !== ATN.INVALID_ALT_NUMBER ? ",uniqueAlt=" + this.uniqueAlt : "") + (this.conflictingAlts !== null ? ",conflictingAlts=" + this.conflictingAlts : "") + (this.dipsIntoOuterContext ? ",dipsIntoOuterContext" : "");
};

function OrderedATNConfigSet() {
  ATNConfigSet.call(this);
  this.configLookup = new Set();
  return this;
}

OrderedATNConfigSet.prototype = Object.create(ATNConfigSet.prototype);
OrderedATNConfigSet.prototype.constructor = OrderedATNConfigSet;
exports.ATNConfigSet = ATNConfigSet;
exports.OrderedATNConfigSet = OrderedATNConfigSet;

/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

//

/* Copyright (c) 2012-2017 The ANTLR Project. All rights reserved.
 * Use of this file is governed by the BSD 3-clause license that
 * can be found in the LICENSE.txt file in the project root.
 */
///
// Represents an executor for a sequence of lexer actions which traversed during
// the matching operation of a lexer rule (token).
//
// <p>The executor tracks position information for position-dependent lexer actions
// efficiently, ensuring that actions appearing only at the end of the rule do
// not cause bloating of the {@link DFA} created for the lexer.</p>
var hashStuff = __webpack_require__(8).hashStuff;

var LexerIndexedCustomAction = __webpack_require__(23).LexerIndexedCustomAction;

function LexerActionExecutor(lexerActions) {
  this.lexerActions = lexerActions === null ? [] : lexerActions; // Caches the result of {@link //hashCode} since the hash code is an element
  // of the performance-critical {@link LexerATNConfig//hashCode} operation.

  this.cachedHashCode = hashStuff(lexerActions); // "".join([str(la) for la in
  // lexerActions]))

  return this;
} // Creates a {@link LexerActionExecutor} which executes the actions for
// the input {@code lexerActionExecutor} followed by a specified
// {@code lexerAction}.
//
// @param lexerActionExecutor The executor for actions already traversed by
// the lexer while matching a token within a particular
// {@link LexerATNConfig}. If this is {@code null}, the method behaves as
// though it were an empty executor.
// @param lexerAction The lexer action to execute after the actions
// specified in {@code lexerActionExecutor}.
//
// @return A {@link LexerActionExecutor} for executing the combine actions
// of {@code lexerActionExecutor} and {@code lexerAction}.


LexerActionExecutor.append = function (lexerActionExecutor, lexerAction) {
  if (lexerActionExecutor === null) {
    return new LexerActionExecutor([lexerAction]);
  }

  var lexerActions = lexerActionExecutor.lexerActions.concat([lexerAction]);
  return new LexerActionExecutor(lexerActions);
}; // Creates a {@link LexerActionExecutor} which encodes the current offset
// for position-dependent lexer actions.
//
// <p>Normally, when the executor encounters lexer actions where
// {@link LexerAction//isPositionDependent} returns {@code true}, it calls
// {@link IntStream//seek} on the input {@link CharStream} to set the input
// position to the <em>end</em> of the current token. This behavior provides
// for efficient DFA representation of lexer actions which appear at the end
// of a lexer rule, even when the lexer rule matches a variable number of
// characters.</p>
//
// <p>Prior to traversing a match transition in the ATN, the current offset
// from the token start index is assigned to all position-dependent lexer
// actions which have not already been assigned a fixed offset. By storing
// the offsets relative to the token start index, the DFA representation of
// lexer actions which appear in the middle of tokens remains efficient due
// to sharing among tokens of the same length, regardless of their absolute
// position in the input stream.</p>
//
// <p>If the current executor already has offsets assigned to all
// position-dependent lexer actions, the method returns {@code this}.</p>
//
// @param offset The current offset to assign to all position-dependent
// lexer actions which do not already have offsets assigned.
//
// @return A {@link LexerActionExecutor} which stores input stream offsets
// for all position-dependent lexer actions.
// /


LexerActionExecutor.prototype.fixOffsetBeforeMatch = function (offset) {
  var updatedLexerActions = null;

  for (var i = 0; i < this.lexerActions.length; i++) {
    if (this.lexerActions[i].isPositionDependent && !(this.lexerActions[i] instanceof LexerIndexedCustomAction)) {
      if (updatedLexerActions === null) {
        updatedLexerActions = this.lexerActions.concat([]);
      }

      updatedLexerActions[i] = new LexerIndexedCustomAction(offset, this.lexerActions[i]);
    }
  }

  if (updatedLexerActions === null) {
    return this;
  } else {
    return new LexerActionExecutor(updatedLexerActions);
  }
}; // Execute the actions encapsulated by this executor within the context of a
// particular {@link Lexer}.
//
// <p>This method calls {@link IntStream//seek} to set the position of the
// {@code input} {@link CharStream} prior to calling
// {@link LexerAction//execute} on a position-dependent action. Before the
// method returns, the input position will be restored to the same position
// it was in when the method was invoked.</p>
//
// @param lexer The lexer instance.
// @param input The input stream which is the source for the current token.
// When this method is called, the current {@link IntStream//index} for
// {@code input} should be the start of the following token, i.e. 1
// character past the end of the current token.
// @param startIndex The token start index. This value may be passed to
// {@link IntStream//seek} to set the {@code input} position to the beginning
// of the token.
// /


LexerActionExecutor.prototype.execute = function (lexer, input, startIndex) {
  var requiresSeek = false;
  var stopIndex = input.index;

  try {
    for (var i = 0; i < this.lexerActions.length; i++) {
      var lexerAction = this.lexerActions[i];

      if (lexerAction instanceof LexerIndexedCustomAction) {
        var offset = lexerAction.offset;
        input.seek(startIndex + offset);
        lexerAction = lexerAction.action;
        requiresSeek = startIndex + offset !== stopIndex;
      } else if (lexerAction.isPositionDependent) {
        input.seek(stopIndex);
        requiresSeek = false;
      }

      lexerAction.execute(lexer);
    }
  } finally {
    if (requiresSeek) {
      input.seek(stopIndex);
    }
  }
};

LexerActionExecutor.prototype.hashCode = function () {
  return this.cachedHashCode;
};

LexerActionExecutor.prototype.updateHashCode = function (hash) {
  hash.update(this.cachedHashCode);
};

LexerActionExecutor.prototype.equals = function (other) {
  if (this === other) {
    return true;
  } else if (!(other instanceof LexerActionExecutor)) {
    return false;
  } else if (this.cachedHashCode != other.cachedHashCode) {
    return false;
  } else if (this.lexerActions.length != other.lexerActions.length) {
    return false;
  } else {
    var numActions = this.lexerActions.length;

    for (var idx = 0; idx < numActions; ++idx) {
      if (!this.lexerActions[idx].equals(other.lexerActions[idx])) {
        return false;
      }
    }

    return true;
  }
};

exports.LexerActionExecutor = LexerActionExecutor;

/***/ }),
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

//

/* Copyright (c) 2012-2017 The ANTLR Project. All rights reserved.
 * Use of this file is governed by the BSD 3-clause license that
 * can be found in the LICENSE.txt file in the project root.
 */
//
//
// The embodiment of the adaptive LL(*), ALL(*), parsing strategy.
//
// <p>
// The basic complexity of the adaptive strategy makes it harder to understand.
// We begin with ATN simulation to build paths in a DFA. Subsequent prediction
// requests go through the DFA first. If they reach a state without an edge for
// the current symbol, the algorithm fails over to the ATN simulation to
// complete the DFA path for the current input (until it finds a conflict state
// or uniquely predicting state).</p>
//
// <p>
// All of that is done without using the outer context because we want to create
// a DFA that is not dependent upon the rule invocation stack when we do a
// prediction. One DFA works in all contexts. We avoid using context not
// necessarily because it's slower, although it can be, but because of the DFA
// caching problem. The closure routine only considers the rule invocation stack
// created during prediction beginning in the decision rule. For example, if
// prediction occurs without invoking another rule's ATN, there are no context
// stacks in the configurations. When lack of context leads to a conflict, we
// don't know if it's an ambiguity or a weakness in the strong LL(*) parsing
// strategy (versus full LL(*)).</p>
//
// <p>
// When SLL yields a configuration set with conflict, we rewind the input and
// retry the ATN simulation, this time using full outer context without adding
// to the DFA. Configuration context stacks will be the full invocation stacks
// from the start rule. If we get a conflict using full context, then we can
// definitively say we have a true ambiguity for that input sequence. If we
// don't get a conflict, it implies that the decision is sensitive to the outer
// context. (It is not context-sensitive in the sense of context-sensitive
// grammars.)</p>
//
// <p>
// The next time we reach this DFA state with an SLL conflict, through DFA
// simulation, we will again retry the ATN simulation using full context mode.
// This is slow because we can't save the results and have to "interpret" the
// ATN each time we get that input.</p>
//
// <p>
// <strong>CACHING FULL CONTEXT PREDICTIONS</strong></p>
//
// <p>
// We could cache results from full context to predicted alternative easily and
// that saves a lot of time but doesn't work in presence of predicates. The set
// of visible predicates from the ATN start state changes depending on the
// context, because closure can fall off the end of a rule. I tried to cache
// tuples (stack context, semantic context, predicted alt) but it was slower
// than interpreting and much more complicated. Also required a huge amount of
// memory. The goal is not to create the world's fastest parser anyway. I'd like
// to keep this algorithm simple. By launching multiple threads, we can improve
// the speed of parsing across a large number of files.</p>
//
// <p>
// There is no strict ordering between the amount of input used by SLL vs LL,
// which makes it really hard to build a cache for full context. Let's say that
// we have input A B C that leads to an SLL conflict with full context X. That
// implies that using X we might only use A B but we could also use A B C D to
// resolve conflict. Input A B C D could predict alternative 1 in one position
// in the input and A B C E could predict alternative 2 in another position in
// input. The conflicting SLL configurations could still be non-unique in the
// full context prediction, which would lead us to requiring more input than the
// original A B C.	To make a	prediction cache work, we have to track	the exact
// input	used during the previous prediction. That amounts to a cache that maps
// X to a specific DFA for that context.</p>
//
// <p>
// Something should be done for left-recursive expression predictions. They are
// likely LL(1) + pred eval. Easier to do the whole SLL unless error and retry
// with full LL thing Sam does.</p>
//
// <p>
// <strong>AVOIDING FULL CONTEXT PREDICTION</strong></p>
//
// <p>
// We avoid doing full context retry when the outer context is empty, we did not
// dip into the outer context by falling off the end of the decision state rule,
// or when we force SLL mode.</p>
//
// <p>
// As an example of the not dip into outer context case, consider as super
// constructor calls versus function calls. One grammar might look like
// this:</p>
//
// <pre>
// ctorBody
//   : '{' superCall? stat* '}'
//   ;
// </pre>
//
// <p>
// Or, you might see something like</p>
//
// <pre>
// stat
//   : superCall ';'
//   | expression ';'
//   | ...
//   ;
// </pre>
//
// <p>
// In both cases I believe that no closure operations will dip into the outer
// context. In the first case ctorBody in the worst case will stop at the '}'.
// In the 2nd case it should stop at the ';'. Both cases should stay within the
// entry rule and not dip into the outer context.</p>
//
// <p>
// <strong>PREDICATES</strong></p>
//
// <p>
// Predicates are always evaluated if present in either SLL or LL both. SLL and
// LL simulation deals with predicates differently. SLL collects predicates as
// it performs closure operations like ANTLR v3 did. It delays predicate
// evaluation until it reaches and accept state. This allows us to cache the SLL
// ATN simulation whereas, if we had evaluated predicates on-the-fly during
// closure, the DFA state configuration sets would be different and we couldn't
// build up a suitable DFA.</p>
//
// <p>
// When building a DFA accept state during ATN simulation, we evaluate any
// predicates and return the sole semantically valid alternative. If there is
// more than 1 alternative, we report an ambiguity. If there are 0 alternatives,
// we throw an exception. Alternatives without predicates act like they have
// true predicates. The simple way to think about it is to strip away all
// alternatives with false predicates and choose the minimum alternative that
// remains.</p>
//
// <p>
// When we start in the DFA and reach an accept state that's predicated, we test
// those and return the minimum semantically viable alternative. If no
// alternatives are viable, we throw an exception.</p>
//
// <p>
// During full LL ATN simulation, closure always evaluates predicates and
// on-the-fly. This is crucial to reducing the configuration set size during
// closure. It hits a landmine when parsing with the Java grammar, for example,
// without this on-the-fly evaluation.</p>
//
// <p>
// <strong>SHARING DFA</strong></p>
//
// <p>
// All instances of the same parser share the same decision DFAs through a
// static field. Each instance gets its own ATN simulator but they share the
// same {@link //decisionToDFA} field. They also share a
// {@link PredictionContextCache} object that makes sure that all
// {@link PredictionContext} objects are shared among the DFA states. This makes
// a big size difference.</p>
//
// <p>
// <strong>THREAD SAFETY</strong></p>
//
// <p>
// The {@link ParserATNSimulator} locks on the {@link //decisionToDFA} field when
// it adds a new DFA object to that array. {@link //addDFAEdge}
// locks on the DFA for the current decision when setting the
// {@link DFAState//edges} field. {@link //addDFAState} locks on
// the DFA for the current decision when looking up a DFA state to see if it
// already exists. We must make sure that all requests to add DFA states that
// are equivalent result in the same shared DFA object. This is because lots of
// threads will be trying to update the DFA at once. The
// {@link //addDFAState} method also locks inside the DFA lock
// but this time on the shared context cache when it rebuilds the
// configurations' {@link PredictionContext} objects using cached
// subgraphs/nodes. No other locking occurs, even during DFA simulation. This is
// safe as long as we can guarantee that all threads referencing
// {@code s.edge[t]} get the same physical target {@link DFAState}, or
// {@code null}. Once into the DFA, the DFA simulation does not reference the
// {@link DFA//states} map. It follows the {@link DFAState//edges} field to new
// targets. The DFA simulator will either find {@link DFAState//edges} to be
// {@code null}, to be non-{@code null} and {@code dfa.edges[t]} null, or
// {@code dfa.edges[t]} to be non-null. The
// {@link //addDFAEdge} method could be racing to set the field
// but in either case the DFA simulator works; if {@code null}, and requests ATN
// simulation. It could also race trying to get {@code dfa.edges[t]}, but either
// way it will work because it's not doing a test and set operation.</p>
//
// <p>
// <strong>Starting with SLL then failing to combined SLL/LL (Two-Stage
// Parsing)</strong></p>
//
// <p>
// Sam pointed out that if SLL does not give a syntax error, then there is no
// point in doing full LL, which is slower. We only have to try LL if we get a
// syntax error. For maximum speed, Sam starts the parser set to pure SLL
// mode with the {@link BailErrorStrategy}:</p>
//
// <pre>
// parser.{@link Parser//getInterpreter() getInterpreter()}.{@link //setPredictionMode setPredictionMode}{@code (}{@link PredictionMode//SLL}{@code )};
// parser.{@link Parser//setErrorHandler setErrorHandler}(new {@link BailErrorStrategy}());
// </pre>
//
// <p>
// If it does not get a syntax error, then we're done. If it does get a syntax
// error, we need to retry with the combined SLL/LL strategy.</p>
//
// <p>
// The reason this works is as follows. If there are no SLL conflicts, then the
// grammar is SLL (at least for that input set). If there is an SLL conflict,
// the full LL analysis must yield a set of viable alternatives which is a
// subset of the alternatives reported by SLL. If the LL set is a singleton,
// then the grammar is LL but not SLL. If the LL set is the same size as the SLL
// set, the decision is SLL. If the LL set has size &gt; 1, then that decision
// is truly ambiguous on the current input. If the LL set is smaller, then the
// SLL conflict resolution might choose an alternative that the full LL would
// rule out as a possibility based upon better context information. If that's
// the case, then the SLL parse will definitely get an error because the full LL
// analysis says it's not viable. If SLL conflict resolution chooses an
// alternative within the LL set, them both SLL and LL would choose the same
// alternative because they both choose the minimum of multiple conflicting
// alternatives.</p>
//
// <p>
// Let's say we have a set of SLL conflicting alternatives {@code {1, 2, 3}} and
// a smaller LL set called <em>s</em>. If <em>s</em> is {@code {2, 3}}, then SLL
// parsing will get an error because SLL will pursue alternative 1. If
// <em>s</em> is {@code {1, 2}} or {@code {1, 3}} then both SLL and LL will
// choose the same alternative because alternative one is the minimum of either
// set. If <em>s</em> is {@code {2}} or {@code {3}} then SLL will get a syntax
// error. If <em>s</em> is {@code {1}} then SLL will succeed.</p>
//
// <p>
// Of course, if the input is invalid, then we will get an error for sure in
// both SLL and LL parsing. Erroneous input will therefore require 2 passes over
// the input.</p>
//
var Utils = __webpack_require__(8);

var Set = Utils.Set;
var BitSet = Utils.BitSet;
var DoubleDict = Utils.DoubleDict;

var ATN = __webpack_require__(6).ATN;

var ATNState = __webpack_require__(11).ATNState;

var ATNConfig = __webpack_require__(10).ATNConfig;

var ATNConfigSet = __webpack_require__(32).ATNConfigSet;

var Token = __webpack_require__(9).Token;

var DFAState = __webpack_require__(31).DFAState;

var PredPrediction = __webpack_require__(31).PredPrediction;

var ATNSimulator = __webpack_require__(30).ATNSimulator;

var PredictionMode = __webpack_require__(35).PredictionMode;

var RuleContext = __webpack_require__(16).RuleContext;

var ParserRuleContext = __webpack_require__(19).ParserRuleContext;

var SemanticContext = __webpack_require__(12).SemanticContext;

var StarLoopEntryState = __webpack_require__(11).StarLoopEntryState;

var RuleStopState = __webpack_require__(11).RuleStopState;

var PredictionContext = __webpack_require__(15).PredictionContext;

var Interval = __webpack_require__(13).Interval;

var Transitions = __webpack_require__(14);

var Transition = Transitions.Transition;
var SetTransition = Transitions.SetTransition;
var NotSetTransition = Transitions.NotSetTransition;
var RuleTransition = Transitions.RuleTransition;
var ActionTransition = Transitions.ActionTransition;

var NoViableAltException = __webpack_require__(29).NoViableAltException;

var SingletonPredictionContext = __webpack_require__(15).SingletonPredictionContext;

var predictionContextFromRuleContext = __webpack_require__(15).predictionContextFromRuleContext;

function ParserATNSimulator(parser, atn, decisionToDFA, sharedContextCache) {
  ATNSimulator.call(this, atn, sharedContextCache);
  this.parser = parser;
  this.decisionToDFA = decisionToDFA; // SLL, LL, or LL + exact ambig detection?//

  this.predictionMode = PredictionMode.LL; // LAME globals to avoid parameters!!!!! I need these down deep in predTransition

  this._input = null;
  this._startIndex = 0;
  this._outerContext = null;
  this._dfa = null; // Each prediction operation uses a cache for merge of prediction contexts.
  //  Don't keep around as it wastes huge amounts of memory. DoubleKeyMap
  //  isn't synchronized but we're ok since two threads shouldn't reuse same
  //  parser/atnsim object because it can only handle one input at a time.
  //  This maps graphs a and b to merged result c. (a,b)&rarr;c. We can avoid
  //  the merge if we ever see a and b again.  Note that (b,a)&rarr;c should
  //  also be examined during cache lookup.
  //

  this.mergeCache = null;
  return this;
}

ParserATNSimulator.prototype = Object.create(ATNSimulator.prototype);
ParserATNSimulator.prototype.constructor = ParserATNSimulator;
ParserATNSimulator.prototype.debug = false;
ParserATNSimulator.prototype.debug_closure = false;
ParserATNSimulator.prototype.debug_add = false;
ParserATNSimulator.prototype.debug_list_atn_decisions = false;
ParserATNSimulator.prototype.dfa_debug = false;
ParserATNSimulator.prototype.retry_debug = false;

ParserATNSimulator.prototype.reset = function () {};

ParserATNSimulator.prototype.adaptivePredict = function (input, decision, outerContext) {
  if (this.debug || this.debug_list_atn_decisions) {
    console.log("adaptivePredict decision " + decision + " exec LA(1)==" + this.getLookaheadName(input) + " line " + input.LT(1).line + ":" + input.LT(1).column);
  }

  this._input = input;
  this._startIndex = input.index;
  this._outerContext = outerContext;
  var dfa = this.decisionToDFA[decision];
  this._dfa = dfa;
  var m = input.mark();
  var index = input.index; // Now we are certain to have a specific decision's DFA
  // But, do we still need an initial state?

  try {
    var s0;

    if (dfa.precedenceDfa) {
      // the start state for a precedence DFA depends on the current
      // parser precedence, and is provided by a DFA method.
      s0 = dfa.getPrecedenceStartState(this.parser.getPrecedence());
    } else {
      // the start state for a "regular" DFA is just s0
      s0 = dfa.s0;
    }

    if (s0 === null) {
      if (outerContext === null) {
        outerContext = RuleContext.EMPTY;
      }

      if (this.debug || this.debug_list_atn_decisions) {
        console.log("predictATN decision " + dfa.decision + " exec LA(1)==" + this.getLookaheadName(input) + ", outerContext=" + outerContext.toString(this.parser.ruleNames));
      }

      var fullCtx = false;
      var s0_closure = this.computeStartState(dfa.atnStartState, RuleContext.EMPTY, fullCtx);

      if (dfa.precedenceDfa) {
        // If this is a precedence DFA, we use applyPrecedenceFilter
        // to convert the computed start state to a precedence start
        // state. We then use DFA.setPrecedenceStartState to set the
        // appropriate start state for the precedence level rather
        // than simply setting DFA.s0.
        //
        dfa.s0.configs = s0_closure; // not used for prediction but useful to know start configs anyway

        s0_closure = this.applyPrecedenceFilter(s0_closure);
        s0 = this.addDFAState(dfa, new DFAState(null, s0_closure));
        dfa.setPrecedenceStartState(this.parser.getPrecedence(), s0);
      } else {
        s0 = this.addDFAState(dfa, new DFAState(null, s0_closure));
        dfa.s0 = s0;
      }
    }

    var alt = this.execATN(dfa, s0, input, index, outerContext);

    if (this.debug) {
      console.log("DFA after predictATN: " + dfa.toString(this.parser.literalNames));
    }

    return alt;
  } finally {
    this._dfa = null;
    this.mergeCache = null; // wack cache after each prediction

    input.seek(index);
    input.release(m);
  }
}; // Performs ATN simulation to compute a predicted alternative based
//  upon the remaining input, but also updates the DFA cache to avoid
//  having to traverse the ATN again for the same input sequence.
// There are some key conditions we're looking for after computing a new
// set of ATN configs (proposed DFA state):
// if the set is empty, there is no viable alternative for current symbol
// does the state uniquely predict an alternative?
// does the state have a conflict that would prevent us from
//   putting it on the work list?
// We also have some key operations to do:
// add an edge from previous DFA state to potentially new DFA state, D,
//   upon current symbol but only if adding to work list, which means in all
//   cases except no viable alternative (and possibly non-greedy decisions?)
// collecting predicates and adding semantic context to DFA accept states
// adding rule context to context-sensitive DFA accept states
// consuming an input symbol
// reporting a conflict
// reporting an ambiguity
// reporting a context sensitivity
// reporting insufficient predicates
// cover these cases:
//    dead end
//    single alt
//    single alt + preds
//    conflict
//    conflict + preds
//


ParserATNSimulator.prototype.execATN = function (dfa, s0, input, startIndex, outerContext) {
  if (this.debug || this.debug_list_atn_decisions) {
    console.log("execATN decision " + dfa.decision + " exec LA(1)==" + this.getLookaheadName(input) + " line " + input.LT(1).line + ":" + input.LT(1).column);
  }

  var alt;
  var previousD = s0;

  if (this.debug) {
    console.log("s0 = " + s0);
  }

  var t = input.LA(1);

  while (true) {
    // while more work
    var D = this.getExistingTargetState(previousD, t);

    if (D === null) {
      D = this.computeTargetState(dfa, previousD, t);
    }

    if (D === ATNSimulator.ERROR) {
      // if any configs in previous dipped into outer context, that
      // means that input up to t actually finished entry rule
      // at least for SLL decision. Full LL doesn't dip into outer
      // so don't need special case.
      // We will get an error no matter what so delay until after
      // decision; better error message. Also, no reachable target
      // ATN states in SLL implies LL will also get nowhere.
      // If conflict in states that dip out, choose min since we
      // will get error no matter what.
      var e = this.noViableAlt(input, outerContext, previousD.configs, startIndex);
      input.seek(startIndex);
      alt = this.getSynValidOrSemInvalidAltThatFinishedDecisionEntryRule(previousD.configs, outerContext);

      if (alt !== ATN.INVALID_ALT_NUMBER) {
        return alt;
      } else {
        throw e;
      }
    }

    if (D.requiresFullContext && this.predictionMode !== PredictionMode.SLL) {
      // IF PREDS, MIGHT RESOLVE TO SINGLE ALT => SLL (or syntax error)
      var conflictingAlts = null;

      if (D.predicates !== null) {
        if (this.debug) {
          console.log("DFA state has preds in DFA sim LL failover");
        }

        var conflictIndex = input.index;

        if (conflictIndex !== startIndex) {
          input.seek(startIndex);
        }

        conflictingAlts = this.evalSemanticContext(D.predicates, outerContext, true);

        if (conflictingAlts.length === 1) {
          if (this.debug) {
            console.log("Full LL avoided");
          }

          return conflictingAlts.minValue();
        }

        if (conflictIndex !== startIndex) {
          // restore the index so reporting the fallback to full
          // context occurs with the index at the correct spot
          input.seek(conflictIndex);
        }
      }

      if (this.dfa_debug) {
        console.log("ctx sensitive state " + outerContext + " in " + D);
      }

      var fullCtx = true;
      var s0_closure = this.computeStartState(dfa.atnStartState, outerContext, fullCtx);
      this.reportAttemptingFullContext(dfa, conflictingAlts, D.configs, startIndex, input.index);
      alt = this.execATNWithFullContext(dfa, D, s0_closure, input, startIndex, outerContext);
      return alt;
    }

    if (D.isAcceptState) {
      if (D.predicates === null) {
        return D.prediction;
      }

      var stopIndex = input.index;
      input.seek(startIndex);
      var alts = this.evalSemanticContext(D.predicates, outerContext, true);

      if (alts.length === 0) {
        throw this.noViableAlt(input, outerContext, D.configs, startIndex);
      } else if (alts.length === 1) {
        return alts.minValue();
      } else {
        // report ambiguity after predicate evaluation to make sure the correct set of ambig alts is reported.
        this.reportAmbiguity(dfa, D, startIndex, stopIndex, false, alts, D.configs);
        return alts.minValue();
      }
    }

    previousD = D;

    if (t !== Token.EOF) {
      input.consume();
      t = input.LA(1);
    }
  }
}; //
// Get an existing target state for an edge in the DFA. If the target state
// for the edge has not yet been computed or is otherwise not available,
// this method returns {@code null}.
//
// @param previousD The current DFA state
// @param t The next input symbol
// @return The existing target DFA state for the given input symbol
// {@code t}, or {@code null} if the target state for this edge is not
// already cached
//


ParserATNSimulator.prototype.getExistingTargetState = function (previousD, t) {
  var edges = previousD.edges;

  if (edges === null) {
    return null;
  } else {
    return edges[t + 1] || null;
  }
}; //
// Compute a target state for an edge in the DFA, and attempt to add the
// computed state and corresponding edge to the DFA.
//
// @param dfa The DFA
// @param previousD The current DFA state
// @param t The next input symbol
//
// @return The computed target DFA state for the given input symbol
// {@code t}. If {@code t} does not lead to a valid DFA state, this method
// returns {@link //ERROR}.
//


ParserATNSimulator.prototype.computeTargetState = function (dfa, previousD, t) {
  var reach = this.computeReachSet(previousD.configs, t, false);

  if (reach === null) {
    this.addDFAEdge(dfa, previousD, t, ATNSimulator.ERROR);
    return ATNSimulator.ERROR;
  } // create new target state; we'll add to DFA after it's complete


  var D = new DFAState(null, reach);
  var predictedAlt = this.getUniqueAlt(reach);

  if (this.debug) {
    var altSubSets = PredictionMode.getConflictingAltSubsets(reach);
    console.log("SLL altSubSets=" + Utils.arrayToString(altSubSets) + ", previous=" + previousD.configs + ", configs=" + reach + ", predict=" + predictedAlt + ", allSubsetsConflict=" + PredictionMode.allSubsetsConflict(altSubSets) + ", conflictingAlts=" + this.getConflictingAlts(reach));
  }

  if (predictedAlt !== ATN.INVALID_ALT_NUMBER) {
    // NO CONFLICT, UNIQUELY PREDICTED ALT
    D.isAcceptState = true;
    D.configs.uniqueAlt = predictedAlt;
    D.prediction = predictedAlt;
  } else if (PredictionMode.hasSLLConflictTerminatingPrediction(this.predictionMode, reach)) {
    // MORE THAN ONE VIABLE ALTERNATIVE
    D.configs.conflictingAlts = this.getConflictingAlts(reach);
    D.requiresFullContext = true; // in SLL-only mode, we will stop at this state and return the minimum alt

    D.isAcceptState = true;
    D.prediction = D.configs.conflictingAlts.minValue();
  }

  if (D.isAcceptState && D.configs.hasSemanticContext) {
    this.predicateDFAState(D, this.atn.getDecisionState(dfa.decision));

    if (D.predicates !== null) {
      D.prediction = ATN.INVALID_ALT_NUMBER;
    }
  } // all adds to dfa are done after we've created full D state


  D = this.addDFAEdge(dfa, previousD, t, D);
  return D;
};

ParserATNSimulator.prototype.predicateDFAState = function (dfaState, decisionState) {
  // We need to test all predicates, even in DFA states that
  // uniquely predict alternative.
  var nalts = decisionState.transitions.length; // Update DFA so reach becomes accept state with (predicate,alt)
  // pairs if preds found for conflicting alts

  var altsToCollectPredsFrom = this.getConflictingAltsOrUniqueAlt(dfaState.configs);
  var altToPred = this.getPredsForAmbigAlts(altsToCollectPredsFrom, dfaState.configs, nalts);

  if (altToPred !== null) {
    dfaState.predicates = this.getPredicatePredictions(altsToCollectPredsFrom, altToPred);
    dfaState.prediction = ATN.INVALID_ALT_NUMBER; // make sure we use preds
  } else {
    // There are preds in configs but they might go away
    // when OR'd together like {p}? || NONE == NONE. If neither
    // alt has preds, resolve to min alt
    dfaState.prediction = altsToCollectPredsFrom.minValue();
  }
}; // comes back with reach.uniqueAlt set to a valid alt


ParserATNSimulator.prototype.execATNWithFullContext = function (dfa, D, // how far we got before failing over
s0, input, startIndex, outerContext) {
  if (this.debug || this.debug_list_atn_decisions) {
    console.log("execATNWithFullContext " + s0);
  }

  var fullCtx = true;
  var foundExactAmbig = false;
  var reach = null;
  var previous = s0;
  input.seek(startIndex);
  var t = input.LA(1);
  var predictedAlt = -1;

  while (true) {
    // while more work
    reach = this.computeReachSet(previous, t, fullCtx);

    if (reach === null) {
      // if any configs in previous dipped into outer context, that
      // means that input up to t actually finished entry rule
      // at least for LL decision. Full LL doesn't dip into outer
      // so don't need special case.
      // We will get an error no matter what so delay until after
      // decision; better error message. Also, no reachable target
      // ATN states in SLL implies LL will also get nowhere.
      // If conflict in states that dip out, choose min since we
      // will get error no matter what.
      var e = this.noViableAlt(input, outerContext, previous, startIndex);
      input.seek(startIndex);
      var alt = this.getSynValidOrSemInvalidAltThatFinishedDecisionEntryRule(previous, outerContext);

      if (alt !== ATN.INVALID_ALT_NUMBER) {
        return alt;
      } else {
        throw e;
      }
    }

    var altSubSets = PredictionMode.getConflictingAltSubsets(reach);

    if (this.debug) {
      console.log("LL altSubSets=" + altSubSets + ", predict=" + PredictionMode.getUniqueAlt(altSubSets) + ", resolvesToJustOneViableAlt=" + PredictionMode.resolvesToJustOneViableAlt(altSubSets));
    }

    reach.uniqueAlt = this.getUniqueAlt(reach); // unique prediction?

    if (reach.uniqueAlt !== ATN.INVALID_ALT_NUMBER) {
      predictedAlt = reach.uniqueAlt;
      break;
    } else if (this.predictionMode !== PredictionMode.LL_EXACT_AMBIG_DETECTION) {
      predictedAlt = PredictionMode.resolvesToJustOneViableAlt(altSubSets);

      if (predictedAlt !== ATN.INVALID_ALT_NUMBER) {
        break;
      }
    } else {
      // In exact ambiguity mode, we never try to terminate early.
      // Just keeps scarfing until we know what the conflict is
      if (PredictionMode.allSubsetsConflict(altSubSets) && PredictionMode.allSubsetsEqual(altSubSets)) {
        foundExactAmbig = true;
        predictedAlt = PredictionMode.getSingleViableAlt(altSubSets);
        break;
      } // else there are multiple non-conflicting subsets or
      // we're not sure what the ambiguity is yet.
      // So, keep going.

    }

    previous = reach;

    if (t !== Token.EOF) {
      input.consume();
      t = input.LA(1);
    }
  } // If the configuration set uniquely predicts an alternative,
  // without conflict, then we know that it's a full LL decision
  // not SLL.


  if (reach.uniqueAlt !== ATN.INVALID_ALT_NUMBER) {
    this.reportContextSensitivity(dfa, predictedAlt, reach, startIndex, input.index);
    return predictedAlt;
  } // We do not check predicates here because we have checked them
  // on-the-fly when doing full context prediction.
  //
  // In non-exact ambiguity detection mode, we might	actually be able to
  // detect an exact ambiguity, but I'm not going to spend the cycles
  // needed to check. We only emit ambiguity warnings in exact ambiguity
  // mode.
  //
  // For example, we might know that we have conflicting configurations.
  // But, that does not mean that there is no way forward without a
  // conflict. It's possible to have nonconflicting alt subsets as in:
  // altSubSets=[{1, 2}, {1, 2}, {1}, {1, 2}]
  // from
  //
  //    [(17,1,[5 $]), (13,1,[5 10 $]), (21,1,[5 10 $]), (11,1,[$]),
  //     (13,2,[5 10 $]), (21,2,[5 10 $]), (11,2,[$])]
  //
  // In this case, (17,1,[5 $]) indicates there is some next sequence that
  // would resolve this without conflict to alternative 1. Any other viable
  // next sequence, however, is associated with a conflict.  We stop
  // looking for input because no amount of further lookahead will alter
  // the fact that we should predict alternative 1.  We just can't say for
  // sure that there is an ambiguity without looking further.


  this.reportAmbiguity(dfa, D, startIndex, input.index, foundExactAmbig, null, reach);
  return predictedAlt;
};

ParserATNSimulator.prototype.computeReachSet = function (closure, t, fullCtx) {
  if (this.debug) {
    console.log("in computeReachSet, starting closure: " + closure);
  }

  if (this.mergeCache === null) {
    this.mergeCache = new DoubleDict();
  }

  var intermediate = new ATNConfigSet(fullCtx); // Configurations already in a rule stop state indicate reaching the end
  // of the decision rule (local context) or end of the start rule (full
  // context). Once reached, these configurations are never updated by a
  // closure operation, so they are handled separately for the performance
  // advantage of having a smaller intermediate set when calling closure.
  //
  // For full-context reach operations, separate handling is required to
  // ensure that the alternative matching the longest overall sequence is
  // chosen when multiple such configurations can match the input.

  var skippedStopStates = null; // First figure out where we can reach on input t

  for (var i = 0; i < closure.items.length; i++) {
    var c = closure.items[i];

    if (this.debug_add) {
      console.log("testing " + this.getTokenName(t) + " at " + c);
    }

    if (c.state instanceof RuleStopState) {
      if (fullCtx || t === Token.EOF) {
        if (skippedStopStates === null) {
          skippedStopStates = [];
        }

        skippedStopStates.push(c);

        if (this.debug_add) {
          console.log("added " + c + " to skippedStopStates");
        }
      }

      continue;
    }

    for (var j = 0; j < c.state.transitions.length; j++) {
      var trans = c.state.transitions[j];
      var target = this.getReachableTarget(trans, t);

      if (target !== null) {
        var cfg = new ATNConfig({
          state: target
        }, c);
        intermediate.add(cfg, this.mergeCache);

        if (this.debug_add) {
          console.log("added " + cfg + " to intermediate");
        }
      }
    }
  } // Now figure out where the reach operation can take us...


  var reach = null; // This block optimizes the reach operation for intermediate sets which
  // trivially indicate a termination state for the overall
  // adaptivePredict operation.
  //
  // The conditions assume that intermediate
  // contains all configurations relevant to the reach set, but this
  // condition is not true when one or more configurations have been
  // withheld in skippedStopStates, or when the current symbol is EOF.
  //

  if (skippedStopStates === null && t !== Token.EOF) {
    if (intermediate.items.length === 1) {
      // Don't pursue the closure if there is just one state.
      // It can only have one alternative; just add to result
      // Also don't pursue the closure if there is unique alternative
      // among the configurations.
      reach = intermediate;
    } else if (this.getUniqueAlt(intermediate) !== ATN.INVALID_ALT_NUMBER) {
      // Also don't pursue the closure if there is unique alternative
      // among the configurations.
      reach = intermediate;
    }
  } // If the reach set could not be trivially determined, perform a closure
  // operation on the intermediate set to compute its initial value.
  //


  if (reach === null) {
    reach = new ATNConfigSet(fullCtx);
    var closureBusy = new Set();
    var treatEofAsEpsilon = t === Token.EOF;

    for (var k = 0; k < intermediate.items.length; k++) {
      this.closure(intermediate.items[k], reach, closureBusy, false, fullCtx, treatEofAsEpsilon);
    }
  }

  if (t === Token.EOF) {
    // After consuming EOF no additional input is possible, so we are
    // only interested in configurations which reached the end of the
    // decision rule (local context) or end of the start rule (full
    // context). Update reach to contain only these configurations. This
    // handles both explicit EOF transitions in the grammar and implicit
    // EOF transitions following the end of the decision or start rule.
    //
    // When reach==intermediate, no closure operation was performed. In
    // this case, removeAllConfigsNotInRuleStopState needs to check for
    // reachable rule stop states as well as configurations already in
    // a rule stop state.
    //
    // This is handled before the configurations in skippedStopStates,
    // because any configurations potentially added from that list are
    // already guaranteed to meet this condition whether or not it's
    // required.
    //
    reach = this.removeAllConfigsNotInRuleStopState(reach, reach === intermediate);
  } // If skippedStopStates!==null, then it contains at least one
  // configuration. For full-context reach operations, these
  // configurations reached the end of the start rule, in which case we
  // only add them back to reach if no configuration during the current
  // closure operation reached such a state. This ensures adaptivePredict
  // chooses an alternative matching the longest overall sequence when
  // multiple alternatives are viable.
  //


  if (skippedStopStates !== null && (!fullCtx || !PredictionMode.hasConfigInRuleStopState(reach))) {
    for (var l = 0; l < skippedStopStates.length; l++) {
      reach.add(skippedStopStates[l], this.mergeCache);
    }
  }

  if (reach.items.length === 0) {
    return null;
  } else {
    return reach;
  }
}; //
// Return a configuration set containing only the configurations from
// {@code configs} which are in a {@link RuleStopState}. If all
// configurations in {@code configs} are already in a rule stop state, this
// method simply returns {@code configs}.
//
// <p>When {@code lookToEndOfRule} is true, this method uses
// {@link ATN//nextTokens} for each configuration in {@code configs} which is
// not already in a rule stop state to see if a rule stop state is reachable
// from the configuration via epsilon-only transitions.</p>
//
// @param configs the configuration set to update
// @param lookToEndOfRule when true, this method checks for rule stop states
// reachable by epsilon-only transitions from each configuration in
// {@code configs}.
//
// @return {@code configs} if all configurations in {@code configs} are in a
// rule stop state, otherwise return a new configuration set containing only
// the configurations from {@code configs} which are in a rule stop state
//


ParserATNSimulator.prototype.removeAllConfigsNotInRuleStopState = function (configs, lookToEndOfRule) {
  if (PredictionMode.allConfigsInRuleStopStates(configs)) {
    return configs;
  }

  var result = new ATNConfigSet(configs.fullCtx);

  for (var i = 0; i < configs.items.length; i++) {
    var config = configs.items[i];

    if (config.state instanceof RuleStopState) {
      result.add(config, this.mergeCache);
      continue;
    }

    if (lookToEndOfRule && config.state.epsilonOnlyTransitions) {
      var nextTokens = this.atn.nextTokens(config.state);

      if (nextTokens.contains(Token.EPSILON)) {
        var endOfRuleState = this.atn.ruleToStopState[config.state.ruleIndex];
        result.add(new ATNConfig({
          state: endOfRuleState
        }, config), this.mergeCache);
      }
    }
  }

  return result;
};

ParserATNSimulator.prototype.computeStartState = function (p, ctx, fullCtx) {
  // always at least the implicit call to start rule
  var initialContext = predictionContextFromRuleContext(this.atn, ctx);
  var configs = new ATNConfigSet(fullCtx);

  for (var i = 0; i < p.transitions.length; i++) {
    var target = p.transitions[i].target;
    var c = new ATNConfig({
      state: target,
      alt: i + 1,
      context: initialContext
    }, null);
    var closureBusy = new Set();
    this.closure(c, configs, closureBusy, true, fullCtx, false);
  }

  return configs;
}; //
// This method transforms the start state computed by
// {@link //computeStartState} to the special start state used by a
// precedence DFA for a particular precedence value. The transformation
// process applies the following changes to the start state's configuration
// set.
//
// <ol>
// <li>Evaluate the precedence predicates for each configuration using
// {@link SemanticContext//evalPrecedence}.</li>
// <li>Remove all configurations which predict an alternative greater than
// 1, for which another configuration that predicts alternative 1 is in the
// same ATN state with the same prediction context. This transformation is
// valid for the following reasons:
// <ul>
// <li>The closure block cannot contain any epsilon transitions which bypass
// the body of the closure, so all states reachable via alternative 1 are
// part of the precedence alternatives of the transformed left-recursive
// rule.</li>
// <li>The "primary" portion of a left recursive rule cannot contain an
// epsilon transition, so the only way an alternative other than 1 can exist
// in a state that is also reachable via alternative 1 is by nesting calls
// to the left-recursive rule, with the outer calls not being at the
// preferred precedence level.</li>
// </ul>
// </li>
// </ol>
//
// <p>
// The prediction context must be considered by this filter to address
// situations like the following.
// </p>
// <code>
// <pre>
// grammar TA;
// prog: statement* EOF;
// statement: letterA | statement letterA 'b' ;
// letterA: 'a';
// </pre>
// </code>
// <p>
// If the above grammar, the ATN state immediately before the token
// reference {@code 'a'} in {@code letterA} is reachable from the left edge
// of both the primary and closure blocks of the left-recursive rule
// {@code statement}. The prediction context associated with each of these
// configurations distinguishes between them, and prevents the alternative
// which stepped out to {@code prog} (and then back in to {@code statement}
// from being eliminated by the filter.
// </p>
//
// @param configs The configuration set computed by
// {@link //computeStartState} as the start state for the DFA.
// @return The transformed configuration set representing the start state
// for a precedence DFA at a particular precedence level (determined by
// calling {@link Parser//getPrecedence}).
//


ParserATNSimulator.prototype.applyPrecedenceFilter = function (configs) {
  var config;
  var statesFromAlt1 = [];
  var configSet = new ATNConfigSet(configs.fullCtx);

  for (var i = 0; i < configs.items.length; i++) {
    config = configs.items[i]; // handle alt 1 first

    if (config.alt !== 1) {
      continue;
    }

    var updatedContext = config.semanticContext.evalPrecedence(this.parser, this._outerContext);

    if (updatedContext === null) {
      // the configuration was eliminated
      continue;
    }

    statesFromAlt1[config.state.stateNumber] = config.context;

    if (updatedContext !== config.semanticContext) {
      configSet.add(new ATNConfig({
        semanticContext: updatedContext
      }, config), this.mergeCache);
    } else {
      configSet.add(config, this.mergeCache);
    }
  }

  for (i = 0; i < configs.items.length; i++) {
    config = configs.items[i];

    if (config.alt === 1) {
      // already handled
      continue;
    } // In the future, this elimination step could be updated to also
    // filter the prediction context for alternatives predicting alt>1
    // (basically a graph subtraction algorithm).


    if (!config.precedenceFilterSuppressed) {
      var context = statesFromAlt1[config.state.stateNumber] || null;

      if (context !== null && context.equals(config.context)) {
        // eliminated
        continue;
      }
    }

    configSet.add(config, this.mergeCache);
  }

  return configSet;
};

ParserATNSimulator.prototype.getReachableTarget = function (trans, ttype) {
  if (trans.matches(ttype, 0, this.atn.maxTokenType)) {
    return trans.target;
  } else {
    return null;
  }
};

ParserATNSimulator.prototype.getPredsForAmbigAlts = function (ambigAlts, configs, nalts) {
  // REACH=[1|1|[]|0:0, 1|2|[]|0:1]
  // altToPred starts as an array of all null contexts. The entry at index i
  // corresponds to alternative i. altToPred[i] may have one of three values:
  //   1. null: no ATNConfig c is found such that c.alt==i
  //   2. SemanticContext.NONE: At least one ATNConfig c exists such that
  //      c.alt==i and c.semanticContext==SemanticContext.NONE. In other words,
  //      alt i has at least one unpredicated config.
  //   3. Non-NONE Semantic Context: There exists at least one, and for all
  //      ATNConfig c such that c.alt==i, c.semanticContext!=SemanticContext.NONE.
  //
  // From this, it is clear that NONE||anything==NONE.
  //
  var altToPred = [];

  for (var i = 0; i < configs.items.length; i++) {
    var c = configs.items[i];

    if (ambigAlts.contains(c.alt)) {
      altToPred[c.alt] = SemanticContext.orContext(altToPred[c.alt] || null, c.semanticContext);
    }
  }

  var nPredAlts = 0;

  for (i = 1; i < nalts + 1; i++) {
    var pred = altToPred[i] || null;

    if (pred === null) {
      altToPred[i] = SemanticContext.NONE;
    } else if (pred !== SemanticContext.NONE) {
      nPredAlts += 1;
    }
  } // nonambig alts are null in altToPred


  if (nPredAlts === 0) {
    altToPred = null;
  }

  if (this.debug) {
    console.log("getPredsForAmbigAlts result " + Utils.arrayToString(altToPred));
  }

  return altToPred;
};

ParserATNSimulator.prototype.getPredicatePredictions = function (ambigAlts, altToPred) {
  var pairs = [];
  var containsPredicate = false;

  for (var i = 1; i < altToPred.length; i++) {
    var pred = altToPred[i]; // unpredicated is indicated by SemanticContext.NONE

    if (ambigAlts !== null && ambigAlts.contains(i)) {
      pairs.push(new PredPrediction(pred, i));
    }

    if (pred !== SemanticContext.NONE) {
      containsPredicate = true;
    }
  }

  if (!containsPredicate) {
    return null;
  }

  return pairs;
}; //
// This method is used to improve the localization of error messages by
// choosing an alternative rather than throwing a
// {@link NoViableAltException} in particular prediction scenarios where the
// {@link //ERROR} state was reached during ATN simulation.
//
// <p>
// The default implementation of this method uses the following
// algorithm to identify an ATN configuration which successfully parsed the
// decision entry rule. Choosing such an alternative ensures that the
// {@link ParserRuleContext} returned by the calling rule will be complete
// and valid, and the syntax error will be reported later at a more
// localized location.</p>
//
// <ul>
// <li>If a syntactically valid path or paths reach the end of the decision rule and
// they are semantically valid if predicated, return the min associated alt.</li>
// <li>Else, if a semantically invalid but syntactically valid path exist
// or paths exist, return the minimum associated alt.
// </li>
// <li>Otherwise, return {@link ATN//INVALID_ALT_NUMBER}.</li>
// </ul>
//
// <p>
// In some scenarios, the algorithm described above could predict an
// alternative which will result in a {@link FailedPredicateException} in
// the parser. Specifically, this could occur if the <em>only</em> configuration
// capable of successfully parsing to the end of the decision rule is
// blocked by a semantic predicate. By choosing this alternative within
// {@link //adaptivePredict} instead of throwing a
// {@link NoViableAltException}, the resulting
// {@link FailedPredicateException} in the parser will identify the specific
// predicate which is preventing the parser from successfully parsing the
// decision rule, which helps developers identify and correct logic errors
// in semantic predicates.
// </p>
//
// @param configs The ATN configurations which were valid immediately before
// the {@link //ERROR} state was reached
// @param outerContext The is the \gamma_0 initial parser context from the paper
// or the parser stack at the instant before prediction commences.
//
// @return The value to return from {@link //adaptivePredict}, or
// {@link ATN//INVALID_ALT_NUMBER} if a suitable alternative was not
// identified and {@link //adaptivePredict} should report an error instead.
//


ParserATNSimulator.prototype.getSynValidOrSemInvalidAltThatFinishedDecisionEntryRule = function (configs, outerContext) {
  var cfgs = this.splitAccordingToSemanticValidity(configs, outerContext);
  var semValidConfigs = cfgs[0];
  var semInvalidConfigs = cfgs[1];
  var alt = this.getAltThatFinishedDecisionEntryRule(semValidConfigs);

  if (alt !== ATN.INVALID_ALT_NUMBER) {
    // semantically/syntactically viable path exists
    return alt;
  } // Is there a syntactically valid path with a failed pred?


  if (semInvalidConfigs.items.length > 0) {
    alt = this.getAltThatFinishedDecisionEntryRule(semInvalidConfigs);

    if (alt !== ATN.INVALID_ALT_NUMBER) {
      // syntactically viable path exists
      return alt;
    }
  }

  return ATN.INVALID_ALT_NUMBER;
};

ParserATNSimulator.prototype.getAltThatFinishedDecisionEntryRule = function (configs) {
  var alts = [];

  for (var i = 0; i < configs.items.length; i++) {
    var c = configs.items[i];

    if (c.reachesIntoOuterContext > 0 || c.state instanceof RuleStopState && c.context.hasEmptyPath()) {
      if (alts.indexOf(c.alt) < 0) {
        alts.push(c.alt);
      }
    }
  }

  if (alts.length === 0) {
    return ATN.INVALID_ALT_NUMBER;
  } else {
    return Math.min.apply(null, alts);
  }
}; // Walk the list of configurations and split them according to
//  those that have preds evaluating to true/false.  If no pred, assume
//  true pred and include in succeeded set.  Returns Pair of sets.
//
//  Create a new set so as not to alter the incoming parameter.
//
//  Assumption: the input stream has been restored to the starting point
//  prediction, which is where predicates need to evaluate.
//


ParserATNSimulator.prototype.splitAccordingToSemanticValidity = function (configs, outerContext) {
  var succeeded = new ATNConfigSet(configs.fullCtx);
  var failed = new ATNConfigSet(configs.fullCtx);

  for (var i = 0; i < configs.items.length; i++) {
    var c = configs.items[i];

    if (c.semanticContext !== SemanticContext.NONE) {
      var predicateEvaluationResult = c.semanticContext.evaluate(this.parser, outerContext);

      if (predicateEvaluationResult) {
        succeeded.add(c);
      } else {
        failed.add(c);
      }
    } else {
      succeeded.add(c);
    }
  }

  return [succeeded, failed];
}; // Look through a list of predicate/alt pairs, returning alts for the
//  pairs that win. A {@code NONE} predicate indicates an alt containing an
//  unpredicated config which behaves as "always true." If !complete
//  then we stop at the first predicate that evaluates to true. This
//  includes pairs with null predicates.
//


ParserATNSimulator.prototype.evalSemanticContext = function (predPredictions, outerContext, complete) {
  var predictions = new BitSet();

  for (var i = 0; i < predPredictions.length; i++) {
    var pair = predPredictions[i];

    if (pair.pred === SemanticContext.NONE) {
      predictions.add(pair.alt);

      if (!complete) {
        break;
      }

      continue;
    }

    var predicateEvaluationResult = pair.pred.evaluate(this.parser, outerContext);

    if (this.debug || this.dfa_debug) {
      console.log("eval pred " + pair + "=" + predicateEvaluationResult);
    }

    if (predicateEvaluationResult) {
      if (this.debug || this.dfa_debug) {
        console.log("PREDICT " + pair.alt);
      }

      predictions.add(pair.alt);

      if (!complete) {
        break;
      }
    }
  }

  return predictions;
}; // TODO: If we are doing predicates, there is no point in pursuing
//     closure operations if we reach a DFA state that uniquely predicts
//     alternative. We will not be caching that DFA state and it is a
//     waste to pursue the closure. Might have to advance when we do
//     ambig detection thought :(
//


ParserATNSimulator.prototype.closure = function (config, configs, closureBusy, collectPredicates, fullCtx, treatEofAsEpsilon) {
  var initialDepth = 0;
  this.closureCheckingStopState(config, configs, closureBusy, collectPredicates, fullCtx, initialDepth, treatEofAsEpsilon);
};

ParserATNSimulator.prototype.closureCheckingStopState = function (config, configs, closureBusy, collectPredicates, fullCtx, depth, treatEofAsEpsilon) {
  if (this.debug || this.debug_closure) {
    console.log("closure(" + config.toString(this.parser, true) + ")"); // console.log("configs(" + configs.toString() + ")");

    if (config.reachesIntoOuterContext > 50) {
      throw "problem";
    }
  }

  if (config.state instanceof RuleStopState) {
    // We hit rule end. If we have context info, use it
    // run thru all possible stack tops in ctx
    if (!config.context.isEmpty()) {
      for (var i = 0; i < config.context.length; i++) {
        if (config.context.getReturnState(i) === PredictionContext.EMPTY_RETURN_STATE) {
          if (fullCtx) {
            configs.add(new ATNConfig({
              state: config.state,
              context: PredictionContext.EMPTY
            }, config), this.mergeCache);
            continue;
          } else {
            // we have no context info, just chase follow links (if greedy)
            if (this.debug) {
              console.log("FALLING off rule " + this.getRuleName(config.state.ruleIndex));
            }

            this.closure_(config, configs, closureBusy, collectPredicates, fullCtx, depth, treatEofAsEpsilon);
          }

          continue;
        }

        var returnState = this.atn.states[config.context.getReturnState(i)];
        var newContext = config.context.getParent(i); // "pop" return state

        var parms = {
          state: returnState,
          alt: config.alt,
          context: newContext,
          semanticContext: config.semanticContext
        };
        var c = new ATNConfig(parms, null); // While we have context to pop back from, we may have
        // gotten that context AFTER having falling off a rule.
        // Make sure we track that we are now out of context.

        c.reachesIntoOuterContext = config.reachesIntoOuterContext;
        this.closureCheckingStopState(c, configs, closureBusy, collectPredicates, fullCtx, depth - 1, treatEofAsEpsilon);
      }

      return;
    } else if (fullCtx) {
      // reached end of start rule
      configs.add(config, this.mergeCache);
      return;
    } else {
      // else if we have no context info, just chase follow links (if greedy)
      if (this.debug) {
        console.log("FALLING off rule " + this.getRuleName(config.state.ruleIndex));
      }
    }
  }

  this.closure_(config, configs, closureBusy, collectPredicates, fullCtx, depth, treatEofAsEpsilon);
}; // Do the actual work of walking epsilon edges//


ParserATNSimulator.prototype.closure_ = function (config, configs, closureBusy, collectPredicates, fullCtx, depth, treatEofAsEpsilon) {
  var p = config.state; // optimization

  if (!p.epsilonOnlyTransitions) {
    configs.add(config, this.mergeCache); // make sure to not return here, because EOF transitions can act as
    // both epsilon transitions and non-epsilon transitions.
  }

  for (var i = 0; i < p.transitions.length; i++) {
    if (i == 0 && this.canDropLoopEntryEdgeInLeftRecursiveRule(config)) continue;
    var t = p.transitions[i];
    var continueCollecting = collectPredicates && !(t instanceof ActionTransition);
    var c = this.getEpsilonTarget(config, t, continueCollecting, depth === 0, fullCtx, treatEofAsEpsilon);

    if (c !== null) {
      var newDepth = depth;

      if (config.state instanceof RuleStopState) {
        // target fell off end of rule; mark resulting c as having dipped into outer context
        // We can't get here if incoming config was rule stop and we had context
        // track how far we dip into outer context.  Might
        // come in handy and we avoid evaluating context dependent
        // preds if this is > 0.
        if (this._dfa !== null && this._dfa.precedenceDfa) {
          if (t.outermostPrecedenceReturn === this._dfa.atnStartState.ruleIndex) {
            c.precedenceFilterSuppressed = true;
          }
        }

        c.reachesIntoOuterContext += 1;

        if (closureBusy.add(c) !== c) {
          // avoid infinite recursion for right-recursive rules
          continue;
        }

        configs.dipsIntoOuterContext = true; // TODO: can remove? only care when we add to set per middle of this method

        newDepth -= 1;

        if (this.debug) {
          console.log("dips into outer ctx: " + c);
        }
      } else {
        if (!t.isEpsilon && closureBusy.add(c) !== c) {
          // avoid infinite recursion for EOF* and EOF+
          continue;
        }

        if (t instanceof RuleTransition) {
          // latch when newDepth goes negative - once we step out of the entry context we can't return
          if (newDepth >= 0) {
            newDepth += 1;
          }
        }
      }

      this.closureCheckingStopState(c, configs, closureBusy, continueCollecting, fullCtx, newDepth, treatEofAsEpsilon);
    }
  }
};

ParserATNSimulator.prototype.canDropLoopEntryEdgeInLeftRecursiveRule = function (config) {
  // return False
  var p = config.state; // First check to see if we are in StarLoopEntryState generated during
  // left-recursion elimination. For efficiency, also check if
  // the context has an empty stack case. If so, it would mean
  // global FOLLOW so we can't perform optimization
  // Are we the special loop entry/exit state? or SLL wildcard

  if (p.stateType != ATNState.STAR_LOOP_ENTRY) return false;
  if (p.stateType != ATNState.STAR_LOOP_ENTRY || !p.isPrecedenceDecision || config.context.isEmpty() || config.context.hasEmptyPath()) return false; // Require all return states to return back to the same rule that p is in.

  var numCtxs = config.context.length;

  for (var i = 0; i < numCtxs; i++) {
    // for each stack context
    var returnState = this.atn.states[config.context.getReturnState(i)];
    if (returnState.ruleIndex != p.ruleIndex) return false;
  }

  var decisionStartState = p.transitions[0].target;
  var blockEndStateNum = decisionStartState.endState.stateNumber;
  var blockEndState = this.atn.states[blockEndStateNum]; // Verify that the top of each stack context leads to loop entry/exit
  // state through epsilon edges and w/o leaving rule.

  for (var i = 0; i < numCtxs; i++) {
    // for each stack context
    var returnStateNumber = config.context.getReturnState(i);
    var returnState = this.atn.states[returnStateNumber]; // all states must have single outgoing epsilon edge

    if (returnState.transitions.length != 1 || !returnState.transitions[0].isEpsilon) return false; // Look for prefix op case like 'not expr', (' type ')' expr

    var returnStateTarget = returnState.transitions[0].target;
    if (returnState.stateType == ATNState.BLOCK_END && returnStateTarget == p) continue; // Look for 'expr op expr' or case where expr's return state is block end
    // of (...)* internal block; the block end points to loop back
    // which points to p but we don't need to check that

    if (returnState == blockEndState) continue; // Look for ternary expr ? expr : expr. The return state points at block end,
    // which points at loop entry state

    if (returnStateTarget == blockEndState) continue; // Look for complex prefix 'between expr and expr' case where 2nd expr's
    // return state points at block end state of (...)* internal block

    if (returnStateTarget.stateType == ATNState.BLOCK_END && returnStateTarget.transitions.length == 1 && returnStateTarget.transitions[0].isEpsilon && returnStateTarget.transitions[0].target == p) continue; // anything else ain't conforming

    return false;
  }

  return true;
};

ParserATNSimulator.prototype.getRuleName = function (index) {
  if (this.parser !== null && index >= 0) {
    return this.parser.ruleNames[index];
  } else {
    return "<rule " + index + ">";
  }
};

ParserATNSimulator.prototype.getEpsilonTarget = function (config, t, collectPredicates, inContext, fullCtx, treatEofAsEpsilon) {
  switch (t.serializationType) {
    case Transition.RULE:
      return this.ruleTransition(config, t);

    case Transition.PRECEDENCE:
      return this.precedenceTransition(config, t, collectPredicates, inContext, fullCtx);

    case Transition.PREDICATE:
      return this.predTransition(config, t, collectPredicates, inContext, fullCtx);

    case Transition.ACTION:
      return this.actionTransition(config, t);

    case Transition.EPSILON:
      return new ATNConfig({
        state: t.target
      }, config);

    case Transition.ATOM:
    case Transition.RANGE:
    case Transition.SET:
      // EOF transitions act like epsilon transitions after the first EOF
      // transition is traversed
      if (treatEofAsEpsilon) {
        if (t.matches(Token.EOF, 0, 1)) {
          return new ATNConfig({
            state: t.target
          }, config);
        }
      }

      return null;

    default:
      return null;
  }
};

ParserATNSimulator.prototype.actionTransition = function (config, t) {
  if (this.debug) {
    var index = t.actionIndex == -1 ? 65535 : t.actionIndex;
    console.log("ACTION edge " + t.ruleIndex + ":" + index);
  }

  return new ATNConfig({
    state: t.target
  }, config);
};

ParserATNSimulator.prototype.precedenceTransition = function (config, pt, collectPredicates, inContext, fullCtx) {
  if (this.debug) {
    console.log("PRED (collectPredicates=" + collectPredicates + ") " + pt.precedence + ">=_p, ctx dependent=true");

    if (this.parser !== null) {
      console.log("context surrounding pred is " + Utils.arrayToString(this.parser.getRuleInvocationStack()));
    }
  }

  var c = null;

  if (collectPredicates && inContext) {
    if (fullCtx) {
      // In full context mode, we can evaluate predicates on-the-fly
      // during closure, which dramatically reduces the size of
      // the config sets. It also obviates the need to test predicates
      // later during conflict resolution.
      var currentPosition = this._input.index;

      this._input.seek(this._startIndex);

      var predSucceeds = pt.getPredicate().evaluate(this.parser, this._outerContext);

      this._input.seek(currentPosition);

      if (predSucceeds) {
        c = new ATNConfig({
          state: pt.target
        }, config); // no pred context
      }
    } else {
      var newSemCtx = SemanticContext.andContext(config.semanticContext, pt.getPredicate());
      c = new ATNConfig({
        state: pt.target,
        semanticContext: newSemCtx
      }, config);
    }
  } else {
    c = new ATNConfig({
      state: pt.target
    }, config);
  }

  if (this.debug) {
    console.log("config from pred transition=" + c);
  }

  return c;
};

ParserATNSimulator.prototype.predTransition = function (config, pt, collectPredicates, inContext, fullCtx) {
  if (this.debug) {
    console.log("PRED (collectPredicates=" + collectPredicates + ") " + pt.ruleIndex + ":" + pt.predIndex + ", ctx dependent=" + pt.isCtxDependent);

    if (this.parser !== null) {
      console.log("context surrounding pred is " + Utils.arrayToString(this.parser.getRuleInvocationStack()));
    }
  }

  var c = null;

  if (collectPredicates && (pt.isCtxDependent && inContext || !pt.isCtxDependent)) {
    if (fullCtx) {
      // In full context mode, we can evaluate predicates on-the-fly
      // during closure, which dramatically reduces the size of
      // the config sets. It also obviates the need to test predicates
      // later during conflict resolution.
      var currentPosition = this._input.index;

      this._input.seek(this._startIndex);

      var predSucceeds = pt.getPredicate().evaluate(this.parser, this._outerContext);

      this._input.seek(currentPosition);

      if (predSucceeds) {
        c = new ATNConfig({
          state: pt.target
        }, config); // no pred context
      }
    } else {
      var newSemCtx = SemanticContext.andContext(config.semanticContext, pt.getPredicate());
      c = new ATNConfig({
        state: pt.target,
        semanticContext: newSemCtx
      }, config);
    }
  } else {
    c = new ATNConfig({
      state: pt.target
    }, config);
  }

  if (this.debug) {
    console.log("config from pred transition=" + c);
  }

  return c;
};

ParserATNSimulator.prototype.ruleTransition = function (config, t) {
  if (this.debug) {
    console.log("CALL rule " + this.getRuleName(t.target.ruleIndex) + ", ctx=" + config.context);
  }

  var returnState = t.followState;
  var newContext = SingletonPredictionContext.create(config.context, returnState.stateNumber);
  return new ATNConfig({
    state: t.target,
    context: newContext
  }, config);
};

ParserATNSimulator.prototype.getConflictingAlts = function (configs) {
  var altsets = PredictionMode.getConflictingAltSubsets(configs);
  return PredictionMode.getAlts(altsets);
}; // Sam pointed out a problem with the previous definition, v3, of
// ambiguous states. If we have another state associated with conflicting
// alternatives, we should keep going. For example, the following grammar
//
// s : (ID | ID ID?) ';' ;
//
// When the ATN simulation reaches the state before ';', it has a DFA
// state that looks like: [12|1|[], 6|2|[], 12|2|[]]. Naturally
// 12|1|[] and 12|2|[] conflict, but we cannot stop processing this node
// because alternative to has another way to continue, via [6|2|[]].
// The key is that we have a single state that has config's only associated
// with a single alternative, 2, and crucially the state transitions
// among the configurations are all non-epsilon transitions. That means
// we don't consider any conflicts that include alternative 2. So, we
// ignore the conflict between alts 1 and 2. We ignore a set of
// conflicting alts when there is an intersection with an alternative
// associated with a single alt state in the state&rarr;config-list map.
//
// It's also the case that we might have two conflicting configurations but
// also a 3rd nonconflicting configuration for a different alternative:
// [1|1|[], 1|2|[], 8|3|[]]. This can come about from grammar:
//
// a : A | A | A B ;
//
// After matching input A, we reach the stop state for rule A, state 1.
// State 8 is the state right before B. Clearly alternatives 1 and 2
// conflict and no amount of further lookahead will separate the two.
// However, alternative 3 will be able to continue and so we do not
// stop working on this state. In the previous example, we're concerned
// with states associated with the conflicting alternatives. Here alt
// 3 is not associated with the conflicting configs, but since we can continue
// looking for input reasonably, I don't declare the state done. We
// ignore a set of conflicting alts when we have an alternative
// that we still need to pursue.
//


ParserATNSimulator.prototype.getConflictingAltsOrUniqueAlt = function (configs) {
  var conflictingAlts = null;

  if (configs.uniqueAlt !== ATN.INVALID_ALT_NUMBER) {
    conflictingAlts = new BitSet();
    conflictingAlts.add(configs.uniqueAlt);
  } else {
    conflictingAlts = configs.conflictingAlts;
  }

  return conflictingAlts;
};

ParserATNSimulator.prototype.getTokenName = function (t) {
  if (t === Token.EOF) {
    return "EOF";
  }

  if (this.parser !== null && this.parser.literalNames !== null) {
    if (t >= this.parser.literalNames.length && t >= this.parser.symbolicNames.length) {
      console.log("" + t + " ttype out of range: " + this.parser.literalNames);
      console.log("" + this.parser.getInputStream().getTokens());
    } else {
      var name = this.parser.literalNames[t] || this.parser.symbolicNames[t];
      return name + "<" + t + ">";
    }
  }

  return "" + t;
};

ParserATNSimulator.prototype.getLookaheadName = function (input) {
  return this.getTokenName(input.LA(1));
}; // Used for debugging in adaptivePredict around execATN but I cut
//  it out for clarity now that alg. works well. We can leave this
//  "dead" code for a bit.
//


ParserATNSimulator.prototype.dumpDeadEndConfigs = function (nvae) {
  console.log("dead end configs: ");
  var decs = nvae.getDeadEndConfigs();

  for (var i = 0; i < decs.length; i++) {
    var c = decs[i];
    var trans = "no edges";

    if (c.state.transitions.length > 0) {
      var t = c.state.transitions[0];

      if (t instanceof AtomTransition) {
        trans = "Atom " + this.getTokenName(t.label);
      } else if (t instanceof SetTransition) {
        var neg = t instanceof NotSetTransition;
        trans = (neg ? "~" : "") + "Set " + t.set;
      }
    }

    console.error(c.toString(this.parser, true) + ":" + trans);
  }
};

ParserATNSimulator.prototype.noViableAlt = function (input, outerContext, configs, startIndex) {
  return new NoViableAltException(this.parser, input, input.get(startIndex), input.LT(1), configs, outerContext);
};

ParserATNSimulator.prototype.getUniqueAlt = function (configs) {
  var alt = ATN.INVALID_ALT_NUMBER;

  for (var i = 0; i < configs.items.length; i++) {
    var c = configs.items[i];

    if (alt === ATN.INVALID_ALT_NUMBER) {
      alt = c.alt; // found first alt
    } else if (c.alt !== alt) {
      return ATN.INVALID_ALT_NUMBER;
    }
  }

  return alt;
}; //
// Add an edge to the DFA, if possible. This method calls
// {@link //addDFAState} to ensure the {@code to} state is present in the
// DFA. If {@code from} is {@code null}, or if {@code t} is outside the
// range of edges that can be represented in the DFA tables, this method
// returns without adding the edge to the DFA.
//
// <p>If {@code to} is {@code null}, this method returns {@code null}.
// Otherwise, this method returns the {@link DFAState} returned by calling
// {@link //addDFAState} for the {@code to} state.</p>
//
// @param dfa The DFA
// @param from The source state for the edge
// @param t The input symbol
// @param to The target state for the edge
//
// @return If {@code to} is {@code null}, this method returns {@code null};
// otherwise this method returns the result of calling {@link //addDFAState}
// on {@code to}
//


ParserATNSimulator.prototype.addDFAEdge = function (dfa, from_, t, to) {
  if (this.debug) {
    console.log("EDGE " + from_ + " -> " + to + " upon " + this.getTokenName(t));
  }

  if (to === null) {
    return null;
  }

  to = this.addDFAState(dfa, to); // used existing if possible not incoming

  if (from_ === null || t < -1 || t > this.atn.maxTokenType) {
    return to;
  }

  if (from_.edges === null) {
    from_.edges = [];
  }

  from_.edges[t + 1] = to; // connect

  if (this.debug) {
    var literalNames = this.parser === null ? null : this.parser.literalNames;
    var symbolicNames = this.parser === null ? null : this.parser.symbolicNames;
    console.log("DFA=\n" + dfa.toString(literalNames, symbolicNames));
  }

  return to;
}; //
// Add state {@code D} to the DFA if it is not already present, and return
// the actual instance stored in the DFA. If a state equivalent to {@code D}
// is already in the DFA, the existing state is returned. Otherwise this
// method returns {@code D} after adding it to the DFA.
//
// <p>If {@code D} is {@link //ERROR}, this method returns {@link //ERROR} and
// does not change the DFA.</p>
//
// @param dfa The dfa
// @param D The DFA state to add
// @return The state stored in the DFA. This will be either the existing
// state if {@code D} is already in the DFA, or {@code D} itself if the
// state was not already present.
//


ParserATNSimulator.prototype.addDFAState = function (dfa, D) {
  if (D == ATNSimulator.ERROR) {
    return D;
  }

  var existing = dfa.states.get(D);

  if (existing !== null) {
    return existing;
  }

  D.stateNumber = dfa.states.length;

  if (!D.configs.readOnly) {
    D.configs.optimizeConfigs(this);
    D.configs.setReadonly(true);
  }

  dfa.states.add(D);

  if (this.debug) {
    console.log("adding new DFA state: " + D);
  }

  return D;
};

ParserATNSimulator.prototype.reportAttemptingFullContext = function (dfa, conflictingAlts, configs, startIndex, stopIndex) {
  if (this.debug || this.retry_debug) {
    var interval = new Interval(startIndex, stopIndex + 1);
    console.log("reportAttemptingFullContext decision=" + dfa.decision + ":" + configs + ", input=" + this.parser.getTokenStream().getText(interval));
  }

  if (this.parser !== null) {
    this.parser.getErrorListenerDispatch().reportAttemptingFullContext(this.parser, dfa, startIndex, stopIndex, conflictingAlts, configs);
  }
};

ParserATNSimulator.prototype.reportContextSensitivity = function (dfa, prediction, configs, startIndex, stopIndex) {
  if (this.debug || this.retry_debug) {
    var interval = new Interval(startIndex, stopIndex + 1);
    console.log("reportContextSensitivity decision=" + dfa.decision + ":" + configs + ", input=" + this.parser.getTokenStream().getText(interval));
  }

  if (this.parser !== null) {
    this.parser.getErrorListenerDispatch().reportContextSensitivity(this.parser, dfa, startIndex, stopIndex, prediction, configs);
  }
}; // If context sensitive parsing, we know it's ambiguity not conflict//


ParserATNSimulator.prototype.reportAmbiguity = function (dfa, D, startIndex, stopIndex, exact, ambigAlts, configs) {
  if (this.debug || this.retry_debug) {
    var interval = new Interval(startIndex, stopIndex + 1);
    console.log("reportAmbiguity " + ambigAlts + ":" + configs + ", input=" + this.parser.getTokenStream().getText(interval));
  }

  if (this.parser !== null) {
    this.parser.getErrorListenerDispatch().reportAmbiguity(this.parser, dfa, startIndex, stopIndex, exact, ambigAlts, configs);
  }
};

exports.ParserATNSimulator = ParserATNSimulator;

/***/ }),
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

//

/* Copyright (c) 2012-2017 The ANTLR Project. All rights reserved.
 * Use of this file is governed by the BSD 3-clause license that
 * can be found in the LICENSE.txt file in the project root.
 */
//
//
// This enumeration defines the prediction modes available in ANTLR 4 along with
// utility methods for analyzing configuration sets for conflicts and/or
// ambiguities.
var Set = __webpack_require__(8).Set;

var Map = __webpack_require__(8).Map;

var BitSet = __webpack_require__(8).BitSet;

var AltDict = __webpack_require__(8).AltDict;

var ATN = __webpack_require__(6).ATN;

var RuleStopState = __webpack_require__(11).RuleStopState;

var ATNConfigSet = __webpack_require__(32).ATNConfigSet;

var ATNConfig = __webpack_require__(10).ATNConfig;

var SemanticContext = __webpack_require__(12).SemanticContext;

var Hash = __webpack_require__(8).Hash;

var hashStuff = __webpack_require__(8).hashStuff;

var equalArrays = __webpack_require__(8).equalArrays;

function PredictionMode() {
  return this;
} //
// The SLL(*) prediction mode. This prediction mode ignores the current
// parser context when making predictions. This is the fastest prediction
// mode, and provides correct results for many grammars. This prediction
// mode is more powerful than the prediction mode provided by ANTLR 3, but
// may result in syntax errors for grammar and input combinations which are
// not SLL.
//
// <p>
// When using this prediction mode, the parser will either return a correct
// parse tree (i.e. the same parse tree that would be returned with the
// {@link //LL} prediction mode), or it will report a syntax error. If a
// syntax error is encountered when using the {@link //SLL} prediction mode,
// it may be due to either an actual syntax error in the input or indicate
// that the particular combination of grammar and input requires the more
// powerful {@link //LL} prediction abilities to complete successfully.</p>
//
// <p>
// This prediction mode does not provide any guarantees for prediction
// behavior for syntactically-incorrect inputs.</p>
//


PredictionMode.SLL = 0; //
// The LL(*) prediction mode. This prediction mode allows the current parser
// context to be used for resolving SLL conflicts that occur during
// prediction. This is the fastest prediction mode that guarantees correct
// parse results for all combinations of grammars with syntactically correct
// inputs.
//
// <p>
// When using this prediction mode, the parser will make correct decisions
// for all syntactically-correct grammar and input combinations. However, in
// cases where the grammar is truly ambiguous this prediction mode might not
// report a precise answer for <em>exactly which</em> alternatives are
// ambiguous.</p>
//
// <p>
// This prediction mode does not provide any guarantees for prediction
// behavior for syntactically-incorrect inputs.</p>
//

PredictionMode.LL = 1; //
// The LL(*) prediction mode with exact ambiguity detection. In addition to
// the correctness guarantees provided by the {@link //LL} prediction mode,
// this prediction mode instructs the prediction algorithm to determine the
// complete and exact set of ambiguous alternatives for every ambiguous
// decision encountered while parsing.
//
// <p>
// This prediction mode may be used for diagnosing ambiguities during
// grammar development. Due to the performance overhead of calculating sets
// of ambiguous alternatives, this prediction mode should be avoided when
// the exact results are not necessary.</p>
//
// <p>
// This prediction mode does not provide any guarantees for prediction
// behavior for syntactically-incorrect inputs.</p>
//

PredictionMode.LL_EXACT_AMBIG_DETECTION = 2; //
// Computes the SLL prediction termination condition.
//
// <p>
// This method computes the SLL prediction termination condition for both of
// the following cases.</p>
//
// <ul>
// <li>The usual SLL+LL fallback upon SLL conflict</li>
// <li>Pure SLL without LL fallback</li>
// </ul>
//
// <p><strong>COMBINED SLL+LL PARSING</strong></p>
//
// <p>When LL-fallback is enabled upon SLL conflict, correct predictions are
// ensured regardless of how the termination condition is computed by this
// method. Due to the substantially higher cost of LL prediction, the
// prediction should only fall back to LL when the additional lookahead
// cannot lead to a unique SLL prediction.</p>
//
// <p>Assuming combined SLL+LL parsing, an SLL configuration set with only
// conflicting subsets should fall back to full LL, even if the
// configuration sets don't resolve to the same alternative (e.g.
// {@code {1,2}} and {@code {3,4}}. If there is at least one non-conflicting
// configuration, SLL could continue with the hopes that more lookahead will
// resolve via one of those non-conflicting configurations.</p>
//
// <p>Here's the prediction termination rule them: SLL (for SLL+LL parsing)
// stops when it sees only conflicting configuration subsets. In contrast,
// full LL keeps going when there is uncertainty.</p>
//
// <p><strong>HEURISTIC</strong></p>
//
// <p>As a heuristic, we stop prediction when we see any conflicting subset
// unless we see a state that only has one alternative associated with it.
// The single-alt-state thing lets prediction continue upon rules like
// (otherwise, it would admit defeat too soon):</p>
//
// <p>{@code [12|1|[], 6|2|[], 12|2|[]]. s : (ID | ID ID?) ';' ;}</p>
//
// <p>When the ATN simulation reaches the state before {@code ';'}, it has a
// DFA state that looks like: {@code [12|1|[], 6|2|[], 12|2|[]]}. Naturally
// {@code 12|1|[]} and {@code 12|2|[]} conflict, but we cannot stop
// processing this node because alternative to has another way to continue,
// via {@code [6|2|[]]}.</p>
//
// <p>It also let's us continue for this rule:</p>
//
// <p>{@code [1|1|[], 1|2|[], 8|3|[]] a : A | A | A B ;}</p>
//
// <p>After matching input A, we reach the stop state for rule A, state 1.
// State 8 is the state right before B. Clearly alternatives 1 and 2
// conflict and no amount of further lookahead will separate the two.
// However, alternative 3 will be able to continue and so we do not stop
// working on this state. In the previous example, we're concerned with
// states associated with the conflicting alternatives. Here alt 3 is not
// associated with the conflicting configs, but since we can continue
// looking for input reasonably, don't declare the state done.</p>
//
// <p><strong>PURE SLL PARSING</strong></p>
//
// <p>To handle pure SLL parsing, all we have to do is make sure that we
// combine stack contexts for configurations that differ only by semantic
// predicate. From there, we can do the usual SLL termination heuristic.</p>
//
// <p><strong>PREDICATES IN SLL+LL PARSING</strong></p>
//
// <p>SLL decisions don't evaluate predicates until after they reach DFA stop
// states because they need to create the DFA cache that works in all
// semantic situations. In contrast, full LL evaluates predicates collected
// during start state computation so it can ignore predicates thereafter.
// This means that SLL termination detection can totally ignore semantic
// predicates.</p>
//
// <p>Implementation-wise, {@link ATNConfigSet} combines stack contexts but not
// semantic predicate contexts so we might see two configurations like the
// following.</p>
//
// <p>{@code (s, 1, x, {}), (s, 1, x', {p})}</p>
//
// <p>Before testing these configurations against others, we have to merge
// {@code x} and {@code x'} (without modifying the existing configurations).
// For example, we test {@code (x+x')==x''} when looking for conflicts in
// the following configurations.</p>
//
// <p>{@code (s, 1, x, {}), (s, 1, x', {p}), (s, 2, x'', {})}</p>
//
// <p>If the configuration set has predicates (as indicated by
// {@link ATNConfigSet//hasSemanticContext}), this algorithm makes a copy of
// the configurations to strip out all of the predicates so that a standard
// {@link ATNConfigSet} will merge everything ignoring predicates.</p>
//

PredictionMode.hasSLLConflictTerminatingPrediction = function (mode, configs) {
  // Configs in rule stop states indicate reaching the end of the decision
  // rule (local context) or end of start rule (full context). If all
  // configs meet this condition, then none of the configurations is able
  // to match additional input so we terminate prediction.
  //
  if (PredictionMode.allConfigsInRuleStopStates(configs)) {
    return true;
  } // pure SLL mode parsing


  if (mode === PredictionMode.SLL) {
    // Don't bother with combining configs from different semantic
    // contexts if we can fail over to full LL; costs more time
    // since we'll often fail over anyway.
    if (configs.hasSemanticContext) {
      // dup configs, tossing out semantic predicates
      var dup = new ATNConfigSet();

      for (var i = 0; i < configs.items.length; i++) {
        var c = configs.items[i];
        c = new ATNConfig({
          semanticContext: SemanticContext.NONE
        }, c);
        dup.add(c);
      }

      configs = dup;
    } // now we have combined contexts for configs with dissimilar preds

  } // pure SLL or combined SLL+LL mode parsing


  var altsets = PredictionMode.getConflictingAltSubsets(configs);
  return PredictionMode.hasConflictingAltSet(altsets) && !PredictionMode.hasStateAssociatedWithOneAlt(configs);
}; // Checks if any configuration in {@code configs} is in a
// {@link RuleStopState}. Configurations meeting this condition have reached
// the end of the decision rule (local context) or end of start rule (full
// context).
//
// @param configs the configuration set to test
// @return {@code true} if any configuration in {@code configs} is in a
// {@link RuleStopState}, otherwise {@code false}


PredictionMode.hasConfigInRuleStopState = function (configs) {
  for (var i = 0; i < configs.items.length; i++) {
    var c = configs.items[i];

    if (c.state instanceof RuleStopState) {
      return true;
    }
  }

  return false;
}; // Checks if all configurations in {@code configs} are in a
// {@link RuleStopState}. Configurations meeting this condition have reached
// the end of the decision rule (local context) or end of start rule (full
// context).
//
// @param configs the configuration set to test
// @return {@code true} if all configurations in {@code configs} are in a
// {@link RuleStopState}, otherwise {@code false}


PredictionMode.allConfigsInRuleStopStates = function (configs) {
  for (var i = 0; i < configs.items.length; i++) {
    var c = configs.items[i];

    if (!(c.state instanceof RuleStopState)) {
      return false;
    }
  }

  return true;
}; //
// Full LL prediction termination.
//
// <p>Can we stop looking ahead during ATN simulation or is there some
// uncertainty as to which alternative we will ultimately pick, after
// consuming more input? Even if there are partial conflicts, we might know
// that everything is going to resolve to the same minimum alternative. That
// means we can stop since no more lookahead will change that fact. On the
// other hand, there might be multiple conflicts that resolve to different
// minimums. That means we need more look ahead to decide which of those
// alternatives we should predict.</p>
//
// <p>The basic idea is to split the set of configurations {@code C}, into
// conflicting subsets {@code (s, _, ctx, _)} and singleton subsets with
// non-conflicting configurations. Two configurations conflict if they have
// identical {@link ATNConfig//state} and {@link ATNConfig//context} values
// but different {@link ATNConfig//alt} value, e.g. {@code (s, i, ctx, _)}
// and {@code (s, j, ctx, _)} for {@code i!=j}.</p>
//
// <p>Reduce these configuration subsets to the set of possible alternatives.
// You can compute the alternative subsets in one pass as follows:</p>
//
// <p>{@code A_s,ctx = {i | (s, i, ctx, _)}} for each configuration in
// {@code C} holding {@code s} and {@code ctx} fixed.</p>
//
// <p>Or in pseudo-code, for each configuration {@code c} in {@code C}:</p>
//
// <pre>
// map[c] U= c.{@link ATNConfig//alt alt} // map hash/equals uses s and x, not
// alt and not pred
// </pre>
//
// <p>The values in {@code map} are the set of {@code A_s,ctx} sets.</p>
//
// <p>If {@code |A_s,ctx|=1} then there is no conflict associated with
// {@code s} and {@code ctx}.</p>
//
// <p>Reduce the subsets to singletons by choosing a minimum of each subset. If
// the union of these alternative subsets is a singleton, then no amount of
// more lookahead will help us. We will always pick that alternative. If,
// however, there is more than one alternative, then we are uncertain which
// alternative to predict and must continue looking for resolution. We may
// or may not discover an ambiguity in the future, even if there are no
// conflicting subsets this round.</p>
//
// <p>The biggest sin is to terminate early because it means we've made a
// decision but were uncertain as to the eventual outcome. We haven't used
// enough lookahead. On the other hand, announcing a conflict too late is no
// big deal; you will still have the conflict. It's just inefficient. It
// might even look until the end of file.</p>
//
// <p>No special consideration for semantic predicates is required because
// predicates are evaluated on-the-fly for full LL prediction, ensuring that
// no configuration contains a semantic context during the termination
// check.</p>
//
// <p><strong>CONFLICTING CONFIGS</strong></p>
//
// <p>Two configurations {@code (s, i, x)} and {@code (s, j, x')}, conflict
// when {@code i!=j} but {@code x=x'}. Because we merge all
// {@code (s, i, _)} configurations together, that means that there are at
// most {@code n} configurations associated with state {@code s} for
// {@code n} possible alternatives in the decision. The merged stacks
// complicate the comparison of configuration contexts {@code x} and
// {@code x'}. Sam checks to see if one is a subset of the other by calling
// merge and checking to see if the merged result is either {@code x} or
// {@code x'}. If the {@code x} associated with lowest alternative {@code i}
// is the superset, then {@code i} is the only possible prediction since the
// others resolve to {@code min(i)} as well. However, if {@code x} is
// associated with {@code j>i} then at least one stack configuration for
// {@code j} is not in conflict with alternative {@code i}. The algorithm
// should keep going, looking for more lookahead due to the uncertainty.</p>
//
// <p>For simplicity, I'm doing a equality check between {@code x} and
// {@code x'} that lets the algorithm continue to consume lookahead longer
// than necessary. The reason I like the equality is of course the
// simplicity but also because that is the test you need to detect the
// alternatives that are actually in conflict.</p>
//
// <p><strong>CONTINUE/STOP RULE</strong></p>
//
// <p>Continue if union of resolved alternative sets from non-conflicting and
// conflicting alternative subsets has more than one alternative. We are
// uncertain about which alternative to predict.</p>
//
// <p>The complete set of alternatives, {@code [i for (_,i,_)]}, tells us which
// alternatives are still in the running for the amount of input we've
// consumed at this point. The conflicting sets let us to strip away
// configurations that won't lead to more states because we resolve
// conflicts to the configuration with a minimum alternate for the
// conflicting set.</p>
//
// <p><strong>CASES</strong></p>
//
// <ul>
//
// <li>no conflicts and more than 1 alternative in set =&gt; continue</li>
//
// <li> {@code (s, 1, x)}, {@code (s, 2, x)}, {@code (s, 3, z)},
// {@code (s', 1, y)}, {@code (s', 2, y)} yields non-conflicting set
// {@code {3}} U conflicting sets {@code min({1,2})} U {@code min({1,2})} =
// {@code {1,3}} =&gt; continue
// </li>
//
// <li>{@code (s, 1, x)}, {@code (s, 2, x)}, {@code (s', 1, y)},
// {@code (s', 2, y)}, {@code (s'', 1, z)} yields non-conflicting set
// {@code {1}} U conflicting sets {@code min({1,2})} U {@code min({1,2})} =
// {@code {1}} =&gt; stop and predict 1</li>
//
// <li>{@code (s, 1, x)}, {@code (s, 2, x)}, {@code (s', 1, y)},
// {@code (s', 2, y)} yields conflicting, reduced sets {@code {1}} U
// {@code {1}} = {@code {1}} =&gt; stop and predict 1, can announce
// ambiguity {@code {1,2}}</li>
//
// <li>{@code (s, 1, x)}, {@code (s, 2, x)}, {@code (s', 2, y)},
// {@code (s', 3, y)} yields conflicting, reduced sets {@code {1}} U
// {@code {2}} = {@code {1,2}} =&gt; continue</li>
//
// <li>{@code (s, 1, x)}, {@code (s, 2, x)}, {@code (s', 3, y)},
// {@code (s', 4, y)} yields conflicting, reduced sets {@code {1}} U
// {@code {3}} = {@code {1,3}} =&gt; continue</li>
//
// </ul>
//
// <p><strong>EXACT AMBIGUITY DETECTION</strong></p>
//
// <p>If all states report the same conflicting set of alternatives, then we
// know we have the exact ambiguity set.</p>
//
// <p><code>|A_<em>i</em>|&gt;1</code> and
// <code>A_<em>i</em> = A_<em>j</em></code> for all <em>i</em>, <em>j</em>.</p>
//
// <p>In other words, we continue examining lookahead until all {@code A_i}
// have more than one alternative and all {@code A_i} are the same. If
// {@code A={{1,2}, {1,3}}}, then regular LL prediction would terminate
// because the resolved set is {@code {1}}. To determine what the real
// ambiguity is, we have to know whether the ambiguity is between one and
// two or one and three so we keep going. We can only stop prediction when
// we need exact ambiguity detection when the sets look like
// {@code A={{1,2}}} or {@code {{1,2},{1,2}}}, etc...</p>
//


PredictionMode.resolvesToJustOneViableAlt = function (altsets) {
  return PredictionMode.getSingleViableAlt(altsets);
}; //
// Determines if every alternative subset in {@code altsets} contains more
// than one alternative.
//
// @param altsets a collection of alternative subsets
// @return {@code true} if every {@link BitSet} in {@code altsets} has
// {@link BitSet//cardinality cardinality} &gt; 1, otherwise {@code false}
//


PredictionMode.allSubsetsConflict = function (altsets) {
  return !PredictionMode.hasNonConflictingAltSet(altsets);
}; //
// Determines if any single alternative subset in {@code altsets} contains
// exactly one alternative.
//
// @param altsets a collection of alternative subsets
// @return {@code true} if {@code altsets} contains a {@link BitSet} with
// {@link BitSet//cardinality cardinality} 1, otherwise {@code false}
//


PredictionMode.hasNonConflictingAltSet = function (altsets) {
  for (var i = 0; i < altsets.length; i++) {
    var alts = altsets[i];

    if (alts.length === 1) {
      return true;
    }
  }

  return false;
}; //
// Determines if any single alternative subset in {@code altsets} contains
// more than one alternative.
//
// @param altsets a collection of alternative subsets
// @return {@code true} if {@code altsets} contains a {@link BitSet} with
// {@link BitSet//cardinality cardinality} &gt; 1, otherwise {@code false}
//


PredictionMode.hasConflictingAltSet = function (altsets) {
  for (var i = 0; i < altsets.length; i++) {
    var alts = altsets[i];

    if (alts.length > 1) {
      return true;
    }
  }

  return false;
}; //
// Determines if every alternative subset in {@code altsets} is equivalent.
//
// @param altsets a collection of alternative subsets
// @return {@code true} if every member of {@code altsets} is equal to the
// others, otherwise {@code false}
//


PredictionMode.allSubsetsEqual = function (altsets) {
  var first = null;

  for (var i = 0; i < altsets.length; i++) {
    var alts = altsets[i];

    if (first === null) {
      first = alts;
    } else if (alts !== first) {
      return false;
    }
  }

  return true;
}; //
// Returns the unique alternative predicted by all alternative subsets in
// {@code altsets}. If no such alternative exists, this method returns
// {@link ATN//INVALID_ALT_NUMBER}.
//
// @param altsets a collection of alternative subsets
//


PredictionMode.getUniqueAlt = function (altsets) {
  var all = PredictionMode.getAlts(altsets);

  if (all.length === 1) {
    return all.minValue();
  } else {
    return ATN.INVALID_ALT_NUMBER;
  }
}; // Gets the complete set of represented alternatives for a collection of
// alternative subsets. This method returns the union of each {@link BitSet}
// in {@code altsets}.
//
// @param altsets a collection of alternative subsets
// @return the set of represented alternatives in {@code altsets}
//


PredictionMode.getAlts = function (altsets) {
  var all = new BitSet();
  altsets.map(function (alts) {
    all.or(alts);
  });
  return all;
}; //
// This function gets the conflicting alt subsets from a configuration set.
// For each configuration {@code c} in {@code configs}:
//
// <pre>
// map[c] U= c.{@link ATNConfig//alt alt} // map hash/equals uses s and x, not
// alt and not pred
// </pre>


PredictionMode.getConflictingAltSubsets = function (configs) {
  var configToAlts = new Map();

  configToAlts.hashFunction = function (cfg) {
    hashStuff(cfg.state.stateNumber, cfg.context);
  };

  configToAlts.equalsFunction = function (c1, c2) {
    return c1.state.stateNumber == c2.state.stateNumber && c1.context.equals(c2.context);
  };

  configs.items.map(function (cfg) {
    var alts = configToAlts.get(cfg);

    if (alts === null) {
      alts = new BitSet();
      configToAlts.put(cfg, alts);
    }

    alts.add(cfg.alt);
  });
  return configToAlts.getValues();
}; //
// Get a map from state to alt subset from a configuration set. For each
// configuration {@code c} in {@code configs}:
//
// <pre>
// map[c.{@link ATNConfig//state state}] U= c.{@link ATNConfig//alt alt}
// </pre>
//


PredictionMode.getStateToAltMap = function (configs) {
  var m = new AltDict();
  configs.items.map(function (c) {
    var alts = m.get(c.state);

    if (alts === null) {
      alts = new BitSet();
      m.put(c.state, alts);
    }

    alts.add(c.alt);
  });
  return m;
};

PredictionMode.hasStateAssociatedWithOneAlt = function (configs) {
  var values = PredictionMode.getStateToAltMap(configs).values();

  for (var i = 0; i < values.length; i++) {
    if (values[i].length === 1) {
      return true;
    }
  }

  return false;
};

PredictionMode.getSingleViableAlt = function (altsets) {
  var result = null;

  for (var i = 0; i < altsets.length; i++) {
    var alts = altsets[i];
    var minAlt = alts.minValue();

    if (result === null) {
      result = minAlt;
    } else if (result !== minAlt) {
      // more than 1 viable alt
      return ATN.INVALID_ALT_NUMBER;
    }
  }

  return result;
};

exports.PredictionMode = PredictionMode;

/***/ }),
/* 36 */
/***/ (function(module, exports) {

/*! https://mths.be/codepointat v0.2.0 by @mathias */
if (!String.prototype.codePointAt) {
  (function () {
    'use strict'; // needed to support `apply`/`call` with `undefined`/`null`

    var defineProperty = function () {
      // IE 8 only supports `Object.defineProperty` on DOM elements
      try {
        var object = {};
        var $defineProperty = Object.defineProperty;
        var result = $defineProperty(object, object, object) && $defineProperty;
      } catch (error) {}

      return result;
    }();

    var codePointAt = function codePointAt(position) {
      if (this == null) {
        throw TypeError();
      }

      var string = String(this);
      var size = string.length; // `ToInteger`

      var index = position ? Number(position) : 0;

      if (index != index) {
        // better `isNaN`
        index = 0;
      } // Account for out-of-bounds indices:


      if (index < 0 || index >= size) {
        return undefined;
      } // Get the first code unit


      var first = string.charCodeAt(index);
      var second;

      if ( // check if it’s the start of a surrogate pair
      first >= 0xD800 && first <= 0xDBFF && // high surrogate
      size > index + 1 // there is a next code unit
      ) {
          second = string.charCodeAt(index + 1);

          if (second >= 0xDC00 && second <= 0xDFFF) {
            // low surrogate
            // https://mathiasbynens.be/notes/javascript-encoding#surrogate-formulae
            return (first - 0xD800) * 0x400 + second - 0xDC00 + 0x10000;
          }
        }

      return first;
    };

    if (defineProperty) {
      defineProperty(String.prototype, 'codePointAt', {
        'value': codePointAt,
        'configurable': true,
        'writable': true
      });
    } else {
      String.prototype.codePointAt = codePointAt;
    }
  })();
}

/***/ }),
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

/* Copyright (c) 2012-2017 The ANTLR Project. All rights reserved.
 * Use of this file is governed by the BSD 3-clause license that
 * can be found in the LICENSE.txt file in the project root.
 */
exports.DFA = __webpack_require__(38).DFA;
exports.DFASerializer = __webpack_require__(39).DFASerializer;
exports.LexerDFASerializer = __webpack_require__(39).LexerDFASerializer;
exports.PredPrediction = __webpack_require__(31).PredPrediction;

/***/ }),
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

//

/* Copyright (c) 2012-2017 The ANTLR Project. All rights reserved.
 * Use of this file is governed by the BSD 3-clause license that
 * can be found in the LICENSE.txt file in the project root.
 */
var Set = __webpack_require__(8).Set;

var DFAState = __webpack_require__(31).DFAState;

var StarLoopEntryState = __webpack_require__(11).StarLoopEntryState;

var ATNConfigSet = __webpack_require__(32).ATNConfigSet;

var DFASerializer = __webpack_require__(39).DFASerializer;

var LexerDFASerializer = __webpack_require__(39).LexerDFASerializer;

function DFA(atnStartState, decision) {
  if (decision === undefined) {
    decision = 0;
  } // From which ATN state did we create this DFA?


  this.atnStartState = atnStartState;
  this.decision = decision; // A set of all DFA states. Use {@link Map} so we can get old state back
  // ({@link Set} only allows you to see if it's there).

  this._states = new Set();
  this.s0 = null; // {@code true} if this DFA is for a precedence decision; otherwise,
  // {@code false}. This is the backing field for {@link //isPrecedenceDfa},
  // {@link //setPrecedenceDfa}.

  this.precedenceDfa = false;

  if (atnStartState instanceof StarLoopEntryState) {
    if (atnStartState.isPrecedenceDecision) {
      this.precedenceDfa = true;
      var precedenceState = new DFAState(null, new ATNConfigSet());
      precedenceState.edges = [];
      precedenceState.isAcceptState = false;
      precedenceState.requiresFullContext = false;
      this.s0 = precedenceState;
    }
  }

  return this;
} // Get the start state for a specific precedence value.
//
// @param precedence The current precedence.
// @return The start state corresponding to the specified precedence, or
// {@code null} if no start state exists for the specified precedence.
//
// @throws IllegalStateException if this is not a precedence DFA.
// @see //isPrecedenceDfa()


DFA.prototype.getPrecedenceStartState = function (precedence) {
  if (!this.precedenceDfa) {
    throw "Only precedence DFAs may contain a precedence start state.";
  } // s0.edges is never null for a precedence DFA


  if (precedence < 0 || precedence >= this.s0.edges.length) {
    return null;
  }

  return this.s0.edges[precedence] || null;
}; // Set the start state for a specific precedence value.
//
// @param precedence The current precedence.
// @param startState The start state corresponding to the specified
// precedence.
//
// @throws IllegalStateException if this is not a precedence DFA.
// @see //isPrecedenceDfa()
//


DFA.prototype.setPrecedenceStartState = function (precedence, startState) {
  if (!this.precedenceDfa) {
    throw "Only precedence DFAs may contain a precedence start state.";
  }

  if (precedence < 0) {
    return;
  } // synchronization on s0 here is ok. when the DFA is turned into a
  // precedence DFA, s0 will be initialized once and not updated again
  // s0.edges is never null for a precedence DFA


  this.s0.edges[precedence] = startState;
}; //
// Sets whether this is a precedence DFA. If the specified value differs
// from the current DFA configuration, the following actions are taken;
// otherwise no changes are made to the current DFA.
//
// <ul>
// <li>The {@link //states} map is cleared</li>
// <li>If {@code precedenceDfa} is {@code false}, the initial state
// {@link //s0} is set to {@code null}; otherwise, it is initialized to a new
// {@link DFAState} with an empty outgoing {@link DFAState//edges} array to
// store the start states for individual precedence values.</li>
// <li>The {@link //precedenceDfa} field is updated</li>
// </ul>
//
// @param precedenceDfa {@code true} if this is a precedence DFA; otherwise,
// {@code false}


DFA.prototype.setPrecedenceDfa = function (precedenceDfa) {
  if (this.precedenceDfa !== precedenceDfa) {
    this._states = new DFAStatesSet();

    if (precedenceDfa) {
      var precedenceState = new DFAState(null, new ATNConfigSet());
      precedenceState.edges = [];
      precedenceState.isAcceptState = false;
      precedenceState.requiresFullContext = false;
      this.s0 = precedenceState;
    } else {
      this.s0 = null;
    }

    this.precedenceDfa = precedenceDfa;
  }
};

Object.defineProperty(DFA.prototype, "states", {
  get: function get() {
    return this._states;
  }
}); // Return a list of all states in this DFA, ordered by state number.

DFA.prototype.sortedStates = function () {
  var list = this._states.values();

  return list.sort(function (a, b) {
    return a.stateNumber - b.stateNumber;
  });
};

DFA.prototype.toString = function (literalNames, symbolicNames) {
  literalNames = literalNames || null;
  symbolicNames = symbolicNames || null;

  if (this.s0 === null) {
    return "";
  }

  var serializer = new DFASerializer(this, literalNames, symbolicNames);
  return serializer.toString();
};

DFA.prototype.toLexerString = function () {
  if (this.s0 === null) {
    return "";
  }

  var serializer = new LexerDFASerializer(this);
  return serializer.toString();
};

exports.DFA = DFA;

/***/ }),
/* 39 */
/***/ (function(module, exports) {

/* Copyright (c) 2012-2017 The ANTLR Project. All rights reserved.
 * Use of this file is governed by the BSD 3-clause license that
 * can be found in the LICENSE.txt file in the project root.
 */
// A DFA walker that knows how to dump them to serialized strings.#/
function DFASerializer(dfa, literalNames, symbolicNames) {
  this.dfa = dfa;
  this.literalNames = literalNames || [];
  this.symbolicNames = symbolicNames || [];
  return this;
}

DFASerializer.prototype.toString = function () {
  if (this.dfa.s0 === null) {
    return null;
  }

  var buf = "";
  var states = this.dfa.sortedStates();

  for (var i = 0; i < states.length; i++) {
    var s = states[i];

    if (s.edges !== null) {
      var n = s.edges.length;

      for (var j = 0; j < n; j++) {
        var t = s.edges[j] || null;

        if (t !== null && t.stateNumber !== 0x7FFFFFFF) {
          buf = buf.concat(this.getStateString(s));
          buf = buf.concat("-");
          buf = buf.concat(this.getEdgeLabel(j));
          buf = buf.concat("->");
          buf = buf.concat(this.getStateString(t));
          buf = buf.concat('\n');
        }
      }
    }
  }

  return buf.length === 0 ? null : buf;
};

DFASerializer.prototype.getEdgeLabel = function (i) {
  if (i === 0) {
    return "EOF";
  } else if (this.literalNames !== null || this.symbolicNames !== null) {
    return this.literalNames[i - 1] || this.symbolicNames[i - 1];
  } else {
    return String.fromCharCode(i - 1);
  }
};

DFASerializer.prototype.getStateString = function (s) {
  var baseStateStr = (s.isAcceptState ? ":" : "") + "s" + s.stateNumber + (s.requiresFullContext ? "^" : "");

  if (s.isAcceptState) {
    if (s.predicates !== null) {
      return baseStateStr + "=>" + s.predicates.toString();
    } else {
      return baseStateStr + "=>" + s.prediction.toString();
    }
  } else {
    return baseStateStr;
  }
};

function LexerDFASerializer(dfa) {
  DFASerializer.call(this, dfa, null);
  return this;
}

LexerDFASerializer.prototype = Object.create(DFASerializer.prototype);
LexerDFASerializer.prototype.constructor = LexerDFASerializer;

LexerDFASerializer.prototype.getEdgeLabel = function (i) {
  return "'" + String.fromCharCode(i) + "'";
};

exports.DFASerializer = DFASerializer;
exports.LexerDFASerializer = LexerDFASerializer;

/***/ }),
/* 40 */
/***/ (function(module, exports) {

/*! https://mths.be/fromcodepoint v0.2.1 by @mathias */
if (!String.fromCodePoint) {
  (function () {
    var defineProperty = function () {
      // IE 8 only supports `Object.defineProperty` on DOM elements
      try {
        var object = {};
        var $defineProperty = Object.defineProperty;
        var result = $defineProperty(object, object, object) && $defineProperty;
      } catch (error) {}

      return result;
    }();

    var stringFromCharCode = String.fromCharCode;
    var floor = Math.floor;

    var fromCodePoint = function fromCodePoint(_) {
      var MAX_SIZE = 0x4000;
      var codeUnits = [];
      var highSurrogate;
      var lowSurrogate;
      var index = -1;
      var length = arguments.length;

      if (!length) {
        return '';
      }

      var result = '';

      while (++index < length) {
        var codePoint = Number(arguments[index]);

        if (!isFinite(codePoint) || // `NaN`, `+Infinity`, or `-Infinity`
        codePoint < 0 || // not a valid Unicode code point
        codePoint > 0x10FFFF || // not a valid Unicode code point
        floor(codePoint) != codePoint // not an integer
        ) {
            throw RangeError('Invalid code point: ' + codePoint);
          }

        if (codePoint <= 0xFFFF) {
          // BMP code point
          codeUnits.push(codePoint);
        } else {
          // Astral code point; split in surrogate halves
          // https://mathiasbynens.be/notes/javascript-encoding#surrogate-formulae
          codePoint -= 0x10000;
          highSurrogate = (codePoint >> 10) + 0xD800;
          lowSurrogate = codePoint % 0x400 + 0xDC00;
          codeUnits.push(highSurrogate, lowSurrogate);
        }

        if (index + 1 == length || codeUnits.length > MAX_SIZE) {
          result += stringFromCharCode.apply(null, codeUnits);
          codeUnits.length = 0;
        }
      }

      return result;
    };

    if (defineProperty) {
      defineProperty(String, 'fromCodePoint', {
        'value': fromCodePoint,
        'configurable': true,
        'writable': true
      });
    } else {
      String.fromCodePoint = fromCodePoint;
    }
  })();
}

/***/ }),
/* 41 */
/***/ (function(module, exports, __webpack_require__) {

/* Copyright (c) 2012-2017 The ANTLR Project. All rights reserved.
 * Use of this file is governed by the BSD 3-clause license that
 * can be found in the LICENSE.txt file in the project root.
 */
var Tree = __webpack_require__(17);

exports.Trees = __webpack_require__(18).Trees;
exports.RuleNode = Tree.RuleNode;
exports.ParseTreeListener = Tree.ParseTreeListener;
exports.ParseTreeVisitor = Tree.ParseTreeVisitor;
exports.ParseTreeWalker = Tree.ParseTreeWalker;

/***/ }),
/* 42 */
/***/ (function(module, exports, __webpack_require__) {

/* Copyright (c) 2012-2017 The ANTLR Project. All rights reserved.
 * Use of this file is governed by the BSD 3-clause license that
 * can be found in the LICENSE.txt file in the project root.
 */
exports.RecognitionException = __webpack_require__(29).RecognitionException;
exports.NoViableAltException = __webpack_require__(29).NoViableAltException;
exports.LexerNoViableAltException = __webpack_require__(29).LexerNoViableAltException;
exports.InputMismatchException = __webpack_require__(29).InputMismatchException;
exports.FailedPredicateException = __webpack_require__(29).FailedPredicateException;
exports.DiagnosticErrorListener = __webpack_require__(43).DiagnosticErrorListener;
exports.BailErrorStrategy = __webpack_require__(44).BailErrorStrategy;
exports.ErrorListener = __webpack_require__(27).ErrorListener;

/***/ }),
/* 43 */
/***/ (function(module, exports, __webpack_require__) {

//

/* Copyright (c) 2012-2017 The ANTLR Project. All rights reserved.
 * Use of this file is governed by the BSD 3-clause license that
 * can be found in the LICENSE.txt file in the project root.
 */
//
//
// This implementation of {@link ANTLRErrorListener} can be used to identify
// certain potential correctness and performance problems in grammars. "Reports"
// are made by calling {@link Parser//notifyErrorListeners} with the appropriate
// message.
//
// <ul>
// <li><b>Ambiguities</b>: These are cases where more than one path through the
// grammar can match the input.</li>
// <li><b>Weak context sensitivity</b>: These are cases where full-context
// prediction resolved an SLL conflict to a unique alternative which equaled the
// minimum alternative of the SLL conflict.</li>
// <li><b>Strong (forced) context sensitivity</b>: These are cases where the
// full-context prediction resolved an SLL conflict to a unique alternative,
// <em>and</em> the minimum alternative of the SLL conflict was found to not be
// a truly viable alternative. Two-stage parsing cannot be used for inputs where
// this situation occurs.</li>
// </ul>
var BitSet = __webpack_require__(8).BitSet;

var ErrorListener = __webpack_require__(27).ErrorListener;

var Interval = __webpack_require__(13).Interval;

function DiagnosticErrorListener(exactOnly) {
  ErrorListener.call(this);
  exactOnly = exactOnly || true; // whether all ambiguities or only exact ambiguities are reported.

  this.exactOnly = exactOnly;
  return this;
}

DiagnosticErrorListener.prototype = Object.create(ErrorListener.prototype);
DiagnosticErrorListener.prototype.constructor = DiagnosticErrorListener;

DiagnosticErrorListener.prototype.reportAmbiguity = function (recognizer, dfa, startIndex, stopIndex, exact, ambigAlts, configs) {
  if (this.exactOnly && !exact) {
    return;
  }

  var msg = "reportAmbiguity d=" + this.getDecisionDescription(recognizer, dfa) + ": ambigAlts=" + this.getConflictingAlts(ambigAlts, configs) + ", input='" + recognizer.getTokenStream().getText(new Interval(startIndex, stopIndex)) + "'";
  recognizer.notifyErrorListeners(msg);
};

DiagnosticErrorListener.prototype.reportAttemptingFullContext = function (recognizer, dfa, startIndex, stopIndex, conflictingAlts, configs) {
  var msg = "reportAttemptingFullContext d=" + this.getDecisionDescription(recognizer, dfa) + ", input='" + recognizer.getTokenStream().getText(new Interval(startIndex, stopIndex)) + "'";
  recognizer.notifyErrorListeners(msg);
};

DiagnosticErrorListener.prototype.reportContextSensitivity = function (recognizer, dfa, startIndex, stopIndex, prediction, configs) {
  var msg = "reportContextSensitivity d=" + this.getDecisionDescription(recognizer, dfa) + ", input='" + recognizer.getTokenStream().getText(new Interval(startIndex, stopIndex)) + "'";
  recognizer.notifyErrorListeners(msg);
};

DiagnosticErrorListener.prototype.getDecisionDescription = function (recognizer, dfa) {
  var decision = dfa.decision;
  var ruleIndex = dfa.atnStartState.ruleIndex;
  var ruleNames = recognizer.ruleNames;

  if (ruleIndex < 0 || ruleIndex >= ruleNames.length) {
    return "" + decision;
  }

  var ruleName = ruleNames[ruleIndex] || null;

  if (ruleName === null || ruleName.length === 0) {
    return "" + decision;
  }

  return "" + decision + " (" + ruleName + ")";
}; //
// Computes the set of conflicting or ambiguous alternatives from a
// configuration set, if that information was not already provided by the
// parser.
//
// @param reportedAlts The set of conflicting or ambiguous alternatives, as
// reported by the parser.
// @param configs The conflicting or ambiguous configuration set.
// @return Returns {@code reportedAlts} if it is not {@code null}, otherwise
// returns the set of alternatives represented in {@code configs}.
//


DiagnosticErrorListener.prototype.getConflictingAlts = function (reportedAlts, configs) {
  if (reportedAlts !== null) {
    return reportedAlts;
  }

  var result = new BitSet();

  for (var i = 0; i < configs.items.length; i++) {
    result.add(configs.items[i].alt);
  }

  return "{" + result.values().join(", ") + "}";
};

exports.DiagnosticErrorListener = DiagnosticErrorListener;

/***/ }),
/* 44 */
/***/ (function(module, exports, __webpack_require__) {

//

/* Copyright (c) 2012-2017 The ANTLR Project. All rights reserved.
 * Use of this file is governed by the BSD 3-clause license that
 * can be found in the LICENSE.txt file in the project root.
 */
//
var Token = __webpack_require__(9).Token;

var Errors = __webpack_require__(29);

var NoViableAltException = Errors.NoViableAltException;
var InputMismatchException = Errors.InputMismatchException;
var FailedPredicateException = Errors.FailedPredicateException;
var ParseCancellationException = Errors.ParseCancellationException;

var ATNState = __webpack_require__(11).ATNState;

var Interval = __webpack_require__(13).Interval;

var IntervalSet = __webpack_require__(13).IntervalSet;

function ErrorStrategy() {}

ErrorStrategy.prototype.reset = function (recognizer) {};

ErrorStrategy.prototype.recoverInline = function (recognizer) {};

ErrorStrategy.prototype.recover = function (recognizer, e) {};

ErrorStrategy.prototype.sync = function (recognizer) {};

ErrorStrategy.prototype.inErrorRecoveryMode = function (recognizer) {};

ErrorStrategy.prototype.reportError = function (recognizer) {}; // This is the default implementation of {@link ANTLRErrorStrategy} used for
// error reporting and recovery in ANTLR parsers.
//


function DefaultErrorStrategy() {
  ErrorStrategy.call(this); // Indicates whether the error strategy is currently "recovering from an
  // error". This is used to suppress reporting multiple error messages while
  // attempting to recover from a detected syntax error.
  //
  // @see //inErrorRecoveryMode
  //

  this.errorRecoveryMode = false; // The index into the input stream where the last error occurred.
  // This is used to prevent infinite loops where an error is found
  // but no token is consumed during recovery...another error is found,
  // ad nauseum. This is a failsafe mechanism to guarantee that at least
  // one token/tree node is consumed for two errors.
  //

  this.lastErrorIndex = -1;
  this.lastErrorStates = null;
  return this;
}

DefaultErrorStrategy.prototype = Object.create(ErrorStrategy.prototype);
DefaultErrorStrategy.prototype.constructor = DefaultErrorStrategy; // <p>The default implementation simply calls {@link //endErrorCondition} to
// ensure that the handler is not in error recovery mode.</p>

DefaultErrorStrategy.prototype.reset = function (recognizer) {
  this.endErrorCondition(recognizer);
}; //
// This method is called to enter error recovery mode when a recognition
// exception is reported.
//
// @param recognizer the parser instance
//


DefaultErrorStrategy.prototype.beginErrorCondition = function (recognizer) {
  this.errorRecoveryMode = true;
};

DefaultErrorStrategy.prototype.inErrorRecoveryMode = function (recognizer) {
  return this.errorRecoveryMode;
}; //
// This method is called to leave error recovery mode after recovering from
// a recognition exception.
//
// @param recognizer
//


DefaultErrorStrategy.prototype.endErrorCondition = function (recognizer) {
  this.errorRecoveryMode = false;
  this.lastErrorStates = null;
  this.lastErrorIndex = -1;
}; //
// {@inheritDoc}
//
// <p>The default implementation simply calls {@link //endErrorCondition}.</p>
//


DefaultErrorStrategy.prototype.reportMatch = function (recognizer) {
  this.endErrorCondition(recognizer);
}; //
// {@inheritDoc}
//
// <p>The default implementation returns immediately if the handler is already
// in error recovery mode. Otherwise, it calls {@link //beginErrorCondition}
// and dispatches the reporting task based on the runtime type of {@code e}
// according to the following table.</p>
//
// <ul>
// <li>{@link NoViableAltException}: Dispatches the call to
// {@link //reportNoViableAlternative}</li>
// <li>{@link InputMismatchException}: Dispatches the call to
// {@link //reportInputMismatch}</li>
// <li>{@link FailedPredicateException}: Dispatches the call to
// {@link //reportFailedPredicate}</li>
// <li>All other types: calls {@link Parser//notifyErrorListeners} to report
// the exception</li>
// </ul>
//


DefaultErrorStrategy.prototype.reportError = function (recognizer, e) {
  // if we've already reported an error and have not matched a token
  // yet successfully, don't report any errors.
  if (this.inErrorRecoveryMode(recognizer)) {
    return; // don't report spurious errors
  }

  this.beginErrorCondition(recognizer);

  if (e instanceof NoViableAltException) {
    this.reportNoViableAlternative(recognizer, e);
  } else if (e instanceof InputMismatchException) {
    this.reportInputMismatch(recognizer, e);
  } else if (e instanceof FailedPredicateException) {
    this.reportFailedPredicate(recognizer, e);
  } else {
    console.log("unknown recognition error type: " + e.constructor.name);
    console.log(e.stack);
    recognizer.notifyErrorListeners(e.getOffendingToken(), e.getMessage(), e);
  }
}; //
// {@inheritDoc}
//
// <p>The default implementation resynchronizes the parser by consuming tokens
// until we find one in the resynchronization set--loosely the set of tokens
// that can follow the current rule.</p>
//


DefaultErrorStrategy.prototype.recover = function (recognizer, e) {
  if (this.lastErrorIndex === recognizer.getInputStream().index && this.lastErrorStates !== null && this.lastErrorStates.indexOf(recognizer.state) >= 0) {
    // uh oh, another error at same token index and previously-visited
    // state in ATN; must be a case where LT(1) is in the recovery
    // token set so nothing got consumed. Consume a single token
    // at least to prevent an infinite loop; this is a failsafe.
    recognizer.consume();
  }

  this.lastErrorIndex = recognizer._input.index;

  if (this.lastErrorStates === null) {
    this.lastErrorStates = [];
  }

  this.lastErrorStates.push(recognizer.state);
  var followSet = this.getErrorRecoverySet(recognizer);
  this.consumeUntil(recognizer, followSet);
}; // The default implementation of {@link ANTLRErrorStrategy//sync} makes sure
// that the current lookahead symbol is consistent with what were expecting
// at this point in the ATN. You can call this anytime but ANTLR only
// generates code to check before subrules/loops and each iteration.
//
// <p>Implements Jim Idle's magic sync mechanism in closures and optional
// subrules. E.g.,</p>
//
// <pre>
// a : sync ( stuff sync )* ;
// sync : {consume to what can follow sync} ;
// </pre>
//
// At the start of a sub rule upon error, {@link //sync} performs single
// token deletion, if possible. If it can't do that, it bails on the current
// rule and uses the default error recovery, which consumes until the
// resynchronization set of the current rule.
//
// <p>If the sub rule is optional ({@code (...)?}, {@code (...)*}, or block
// with an empty alternative), then the expected set includes what follows
// the subrule.</p>
//
// <p>During loop iteration, it consumes until it sees a token that can start a
// sub rule or what follows loop. Yes, that is pretty aggressive. We opt to
// stay in the loop as long as possible.</p>
//
// <p><strong>ORIGINS</strong></p>
//
// <p>Previous versions of ANTLR did a poor job of their recovery within loops.
// A single mismatch token or missing token would force the parser to bail
// out of the entire rules surrounding the loop. So, for rule</p>
//
// <pre>
// classDef : 'class' ID '{' member* '}'
// </pre>
//
// input with an extra token between members would force the parser to
// consume until it found the next class definition rather than the next
// member definition of the current class.
//
// <p>This functionality cost a little bit of effort because the parser has to
// compare token set at the start of the loop and at each iteration. If for
// some reason speed is suffering for you, you can turn off this
// functionality by simply overriding this method as a blank { }.</p>
//


DefaultErrorStrategy.prototype.sync = function (recognizer) {
  // If already recovering, don't try to sync
  if (this.inErrorRecoveryMode(recognizer)) {
    return;
  }

  var s = recognizer._interp.atn.states[recognizer.state];
  var la = recognizer.getTokenStream().LA(1); // try cheaper subset first; might get lucky. seems to shave a wee bit off

  var nextTokens = recognizer.atn.nextTokens(s);

  if (nextTokens.contains(Token.EPSILON) || nextTokens.contains(la)) {
    return;
  }

  switch (s.stateType) {
    case ATNState.BLOCK_START:
    case ATNState.STAR_BLOCK_START:
    case ATNState.PLUS_BLOCK_START:
    case ATNState.STAR_LOOP_ENTRY:
      // report error and recover if possible
      if (this.singleTokenDeletion(recognizer) !== null) {
        return;
      } else {
        throw new InputMismatchException(recognizer);
      }

      break;

    case ATNState.PLUS_LOOP_BACK:
    case ATNState.STAR_LOOP_BACK:
      this.reportUnwantedToken(recognizer);
      var expecting = new IntervalSet();
      expecting.addSet(recognizer.getExpectedTokens());
      var whatFollowsLoopIterationOrRule = expecting.addSet(this.getErrorRecoverySet(recognizer));
      this.consumeUntil(recognizer, whatFollowsLoopIterationOrRule);
      break;

    default: // do nothing if we can't identify the exact kind of ATN state

  }
}; // This is called by {@link //reportError} when the exception is a
// {@link NoViableAltException}.
//
// @see //reportError
//
// @param recognizer the parser instance
// @param e the recognition exception
//


DefaultErrorStrategy.prototype.reportNoViableAlternative = function (recognizer, e) {
  var tokens = recognizer.getTokenStream();
  var input;

  if (tokens !== null) {
    if (e.startToken.type === Token.EOF) {
      input = "<EOF>";
    } else {
      input = tokens.getText(new Interval(e.startToken.tokenIndex, e.offendingToken.tokenIndex));
    }
  } else {
    input = "<unknown input>";
  }

  var msg = "no viable alternative at input " + this.escapeWSAndQuote(input);
  recognizer.notifyErrorListeners(msg, e.offendingToken, e);
}; //
// This is called by {@link //reportError} when the exception is an
// {@link InputMismatchException}.
//
// @see //reportError
//
// @param recognizer the parser instance
// @param e the recognition exception
//


DefaultErrorStrategy.prototype.reportInputMismatch = function (recognizer, e) {
  var msg = "mismatched input " + this.getTokenErrorDisplay(e.offendingToken) + " expecting " + e.getExpectedTokens().toString(recognizer.literalNames, recognizer.symbolicNames);
  recognizer.notifyErrorListeners(msg, e.offendingToken, e);
}; //
// This is called by {@link //reportError} when the exception is a
// {@link FailedPredicateException}.
//
// @see //reportError
//
// @param recognizer the parser instance
// @param e the recognition exception
//


DefaultErrorStrategy.prototype.reportFailedPredicate = function (recognizer, e) {
  var ruleName = recognizer.ruleNames[recognizer._ctx.ruleIndex];
  var msg = "rule " + ruleName + " " + e.message;
  recognizer.notifyErrorListeners(msg, e.offendingToken, e);
}; // This method is called to report a syntax error which requires the removal
// of a token from the input stream. At the time this method is called, the
// erroneous symbol is current {@code LT(1)} symbol and has not yet been
// removed from the input stream. When this method returns,
// {@code recognizer} is in error recovery mode.
//
// <p>This method is called when {@link //singleTokenDeletion} identifies
// single-token deletion as a viable recovery strategy for a mismatched
// input error.</p>
//
// <p>The default implementation simply returns if the handler is already in
// error recovery mode. Otherwise, it calls {@link //beginErrorCondition} to
// enter error recovery mode, followed by calling
// {@link Parser//notifyErrorListeners}.</p>
//
// @param recognizer the parser instance
//


DefaultErrorStrategy.prototype.reportUnwantedToken = function (recognizer) {
  if (this.inErrorRecoveryMode(recognizer)) {
    return;
  }

  this.beginErrorCondition(recognizer);
  var t = recognizer.getCurrentToken();
  var tokenName = this.getTokenErrorDisplay(t);
  var expecting = this.getExpectedTokens(recognizer);
  var msg = "extraneous input " + tokenName + " expecting " + expecting.toString(recognizer.literalNames, recognizer.symbolicNames);
  recognizer.notifyErrorListeners(msg, t, null);
}; // This method is called to report a syntax error which requires the
// insertion of a missing token into the input stream. At the time this
// method is called, the missing token has not yet been inserted. When this
// method returns, {@code recognizer} is in error recovery mode.
//
// <p>This method is called when {@link //singleTokenInsertion} identifies
// single-token insertion as a viable recovery strategy for a mismatched
// input error.</p>
//
// <p>The default implementation simply returns if the handler is already in
// error recovery mode. Otherwise, it calls {@link //beginErrorCondition} to
// enter error recovery mode, followed by calling
// {@link Parser//notifyErrorListeners}.</p>
//
// @param recognizer the parser instance
//


DefaultErrorStrategy.prototype.reportMissingToken = function (recognizer) {
  if (this.inErrorRecoveryMode(recognizer)) {
    return;
  }

  this.beginErrorCondition(recognizer);
  var t = recognizer.getCurrentToken();
  var expecting = this.getExpectedTokens(recognizer);
  var msg = "missing " + expecting.toString(recognizer.literalNames, recognizer.symbolicNames) + " at " + this.getTokenErrorDisplay(t);
  recognizer.notifyErrorListeners(msg, t, null);
}; // <p>The default implementation attempts to recover from the mismatched input
// by using single token insertion and deletion as described below. If the
// recovery attempt fails, this method throws an
// {@link InputMismatchException}.</p>
//
// <p><strong>EXTRA TOKEN</strong> (single token deletion)</p>
//
// <p>{@code LA(1)} is not what we are looking for. If {@code LA(2)} has the
// right token, however, then assume {@code LA(1)} is some extra spurious
// token and delete it. Then consume and return the next token (which was
// the {@code LA(2)} token) as the successful result of the match operation.</p>
//
// <p>This recovery strategy is implemented by {@link
// //singleTokenDeletion}.</p>
//
// <p><strong>MISSING TOKEN</strong> (single token insertion)</p>
//
// <p>If current token (at {@code LA(1)}) is consistent with what could come
// after the expected {@code LA(1)} token, then assume the token is missing
// and use the parser's {@link TokenFactory} to create it on the fly. The
// "insertion" is performed by returning the created token as the successful
// result of the match operation.</p>
//
// <p>This recovery strategy is implemented by {@link
// //singleTokenInsertion}.</p>
//
// <p><strong>EXAMPLE</strong></p>
//
// <p>For example, Input {@code i=(3;} is clearly missing the {@code ')'}. When
// the parser returns from the nested call to {@code expr}, it will have
// call chain:</p>
//
// <pre>
// stat &rarr; expr &rarr; atom
// </pre>
//
// and it will be trying to match the {@code ')'} at this point in the
// derivation:
//
// <pre>
// =&gt; ID '=' '(' INT ')' ('+' atom)* ';'
// ^
// </pre>
//
// The attempt to match {@code ')'} will fail when it sees {@code ';'} and
// call {@link //recoverInline}. To recover, it sees that {@code LA(1)==';'}
// is in the set of tokens that can follow the {@code ')'} token reference
// in rule {@code atom}. It can assume that you forgot the {@code ')'}.
//


DefaultErrorStrategy.prototype.recoverInline = function (recognizer) {
  // SINGLE TOKEN DELETION
  var matchedSymbol = this.singleTokenDeletion(recognizer);

  if (matchedSymbol !== null) {
    // we have deleted the extra token.
    // now, move past ttype token as if all were ok
    recognizer.consume();
    return matchedSymbol;
  } // SINGLE TOKEN INSERTION


  if (this.singleTokenInsertion(recognizer)) {
    return this.getMissingSymbol(recognizer);
  } // even that didn't work; must throw the exception


  throw new InputMismatchException(recognizer);
}; //
// This method implements the single-token insertion inline error recovery
// strategy. It is called by {@link //recoverInline} if the single-token
// deletion strategy fails to recover from the mismatched input. If this
// method returns {@code true}, {@code recognizer} will be in error recovery
// mode.
//
// <p>This method determines whether or not single-token insertion is viable by
// checking if the {@code LA(1)} input symbol could be successfully matched
// if it were instead the {@code LA(2)} symbol. If this method returns
// {@code true}, the caller is responsible for creating and inserting a
// token with the correct type to produce this behavior.</p>
//
// @param recognizer the parser instance
// @return {@code true} if single-token insertion is a viable recovery
// strategy for the current mismatched input, otherwise {@code false}
//


DefaultErrorStrategy.prototype.singleTokenInsertion = function (recognizer) {
  var currentSymbolType = recognizer.getTokenStream().LA(1); // if current token is consistent with what could come after current
  // ATN state, then we know we're missing a token; error recovery
  // is free to conjure up and insert the missing token

  var atn = recognizer._interp.atn;
  var currentState = atn.states[recognizer.state];
  var next = currentState.transitions[0].target;
  var expectingAtLL2 = atn.nextTokens(next, recognizer._ctx);

  if (expectingAtLL2.contains(currentSymbolType)) {
    this.reportMissingToken(recognizer);
    return true;
  } else {
    return false;
  }
}; // This method implements the single-token deletion inline error recovery
// strategy. It is called by {@link //recoverInline} to attempt to recover
// from mismatched input. If this method returns null, the parser and error
// handler state will not have changed. If this method returns non-null,
// {@code recognizer} will <em>not</em> be in error recovery mode since the
// returned token was a successful match.
//
// <p>If the single-token deletion is successful, this method calls
// {@link //reportUnwantedToken} to report the error, followed by
// {@link Parser//consume} to actually "delete" the extraneous token. Then,
// before returning {@link //reportMatch} is called to signal a successful
// match.</p>
//
// @param recognizer the parser instance
// @return the successfully matched {@link Token} instance if single-token
// deletion successfully recovers from the mismatched input, otherwise
// {@code null}
//


DefaultErrorStrategy.prototype.singleTokenDeletion = function (recognizer) {
  var nextTokenType = recognizer.getTokenStream().LA(2);
  var expecting = this.getExpectedTokens(recognizer);

  if (expecting.contains(nextTokenType)) {
    this.reportUnwantedToken(recognizer); // print("recoverFromMismatchedToken deleting " \
    // + str(recognizer.getTokenStream().LT(1)) \
    // + " since " + str(recognizer.getTokenStream().LT(2)) \
    // + " is what we want", file=sys.stderr)

    recognizer.consume(); // simply delete extra token
    // we want to return the token we're actually matching

    var matchedSymbol = recognizer.getCurrentToken();
    this.reportMatch(recognizer); // we know current token is correct

    return matchedSymbol;
  } else {
    return null;
  }
}; // Conjure up a missing token during error recovery.
//
// The recognizer attempts to recover from single missing
// symbols. But, actions might refer to that missing symbol.
// For example, x=ID {f($x);}. The action clearly assumes
// that there has been an identifier matched previously and that
// $x points at that token. If that token is missing, but
// the next token in the stream is what we want we assume that
// this token is missing and we keep going. Because we
// have to return some token to replace the missing token,
// we have to conjure one up. This method gives the user control
// over the tokens returned for missing tokens. Mostly,
// you will want to create something special for identifier
// tokens. For literals such as '{' and ',', the default
// action in the parser or tree parser works. It simply creates
// a CommonToken of the appropriate type. The text will be the token.
// If you change what tokens must be created by the lexer,
// override this method to create the appropriate tokens.
//


DefaultErrorStrategy.prototype.getMissingSymbol = function (recognizer) {
  var currentSymbol = recognizer.getCurrentToken();
  var expecting = this.getExpectedTokens(recognizer);
  var expectedTokenType = expecting.first(); // get any element

  var tokenText;

  if (expectedTokenType === Token.EOF) {
    tokenText = "<missing EOF>";
  } else {
    tokenText = "<missing " + recognizer.literalNames[expectedTokenType] + ">";
  }

  var current = currentSymbol;
  var lookback = recognizer.getTokenStream().LT(-1);

  if (current.type === Token.EOF && lookback !== null) {
    current = lookback;
  }

  return recognizer.getTokenFactory().create(current.source, expectedTokenType, tokenText, Token.DEFAULT_CHANNEL, -1, -1, current.line, current.column);
};

DefaultErrorStrategy.prototype.getExpectedTokens = function (recognizer) {
  return recognizer.getExpectedTokens();
}; // How should a token be displayed in an error message? The default
// is to display just the text, but during development you might
// want to have a lot of information spit out. Override in that case
// to use t.toString() (which, for CommonToken, dumps everything about
// the token). This is better than forcing you to override a method in
// your token objects because you don't have to go modify your lexer
// so that it creates a new Java type.
//


DefaultErrorStrategy.prototype.getTokenErrorDisplay = function (t) {
  if (t === null) {
    return "<no token>";
  }

  var s = t.text;

  if (s === null) {
    if (t.type === Token.EOF) {
      s = "<EOF>";
    } else {
      s = "<" + t.type + ">";
    }
  }

  return this.escapeWSAndQuote(s);
};

DefaultErrorStrategy.prototype.escapeWSAndQuote = function (s) {
  s = s.replace(/\n/g, "\\n");
  s = s.replace(/\r/g, "\\r");
  s = s.replace(/\t/g, "\\t");
  return "'" + s + "'";
}; // Compute the error recovery set for the current rule. During
// rule invocation, the parser pushes the set of tokens that can
// follow that rule reference on the stack; this amounts to
// computing FIRST of what follows the rule reference in the
// enclosing rule. See LinearApproximator.FIRST().
// This local follow set only includes tokens
// from within the rule; i.e., the FIRST computation done by
// ANTLR stops at the end of a rule.
//
// EXAMPLE
//
// When you find a "no viable alt exception", the input is not
// consistent with any of the alternatives for rule r. The best
// thing to do is to consume tokens until you see something that
// can legally follow a call to r//or* any rule that called r.
// You don't want the exact set of viable next tokens because the
// input might just be missing a token--you might consume the
// rest of the input looking for one of the missing tokens.
//
// Consider grammar:
//
// a : '[' b ']'
// | '(' b ')'
// ;
// b : c '^' INT ;
// c : ID
// | INT
// ;
//
// At each rule invocation, the set of tokens that could follow
// that rule is pushed on a stack. Here are the various
// context-sensitive follow sets:
//
// FOLLOW(b1_in_a) = FIRST(']') = ']'
// FOLLOW(b2_in_a) = FIRST(')') = ')'
// FOLLOW(c_in_b) = FIRST('^') = '^'
//
// Upon erroneous input "[]", the call chain is
//
// a -> b -> c
//
// and, hence, the follow context stack is:
//
// depth follow set start of rule execution
// 0 <EOF> a (from main())
// 1 ']' b
// 2 '^' c
//
// Notice that ')' is not included, because b would have to have
// been called from a different context in rule a for ')' to be
// included.
//
// For error recovery, we cannot consider FOLLOW(c)
// (context-sensitive or otherwise). We need the combined set of
// all context-sensitive FOLLOW sets--the set of all tokens that
// could follow any reference in the call chain. We need to
// resync to one of those tokens. Note that FOLLOW(c)='^' and if
// we resync'd to that token, we'd consume until EOF. We need to
// sync to context-sensitive FOLLOWs for a, b, and c: {']','^'}.
// In this case, for input "[]", LA(1) is ']' and in the set, so we would
// not consume anything. After printing an error, rule c would
// return normally. Rule b would not find the required '^' though.
// At this point, it gets a mismatched token error and throws an
// exception (since LA(1) is not in the viable following token
// set). The rule exception handler tries to recover, but finds
// the same recovery set and doesn't consume anything. Rule b
// exits normally returning to rule a. Now it finds the ']' (and
// with the successful match exits errorRecovery mode).
//
// So, you can see that the parser walks up the call chain looking
// for the token that was a member of the recovery set.
//
// Errors are not generated in errorRecovery mode.
//
// ANTLR's error recovery mechanism is based upon original ideas:
//
// "Algorithms + Data Structures = Programs" by Niklaus Wirth
//
// and
//
// "A note on error recovery in recursive descent parsers":
// http://portal.acm.org/citation.cfm?id=947902.947905
//
// Later, Josef Grosch had some good ideas:
//
// "Efficient and Comfortable Error Recovery in Recursive Descent
// Parsers":
// ftp://www.cocolab.com/products/cocktail/doca4.ps/ell.ps.zip
//
// Like Grosch I implement context-sensitive FOLLOW sets that are combined
// at run-time upon error to avoid overhead during parsing.
//


DefaultErrorStrategy.prototype.getErrorRecoverySet = function (recognizer) {
  var atn = recognizer._interp.atn;
  var ctx = recognizer._ctx;
  var recoverSet = new IntervalSet();

  while (ctx !== null && ctx.invokingState >= 0) {
    // compute what follows who invoked us
    var invokingState = atn.states[ctx.invokingState];
    var rt = invokingState.transitions[0];
    var follow = atn.nextTokens(rt.followState);
    recoverSet.addSet(follow);
    ctx = ctx.parentCtx;
  }

  recoverSet.removeOne(Token.EPSILON);
  return recoverSet;
}; // Consume tokens until one matches the given token set.//


DefaultErrorStrategy.prototype.consumeUntil = function (recognizer, set) {
  var ttype = recognizer.getTokenStream().LA(1);

  while (ttype !== Token.EOF && !set.contains(ttype)) {
    recognizer.consume();
    ttype = recognizer.getTokenStream().LA(1);
  }
}; //
// This implementation of {@link ANTLRErrorStrategy} responds to syntax errors
// by immediately canceling the parse operation with a
// {@link ParseCancellationException}. The implementation ensures that the
// {@link ParserRuleContext//exception} field is set for all parse tree nodes
// that were not completed prior to encountering the error.
//
// <p>
// This error strategy is useful in the following scenarios.</p>
//
// <ul>
// <li><strong>Two-stage parsing:</strong> This error strategy allows the first
// stage of two-stage parsing to immediately terminate if an error is
// encountered, and immediately fall back to the second stage. In addition to
// avoiding wasted work by attempting to recover from errors here, the empty
// implementation of {@link BailErrorStrategy//sync} improves the performance of
// the first stage.</li>
// <li><strong>Silent validation:</strong> When syntax errors are not being
// reported or logged, and the parse result is simply ignored if errors occur,
// the {@link BailErrorStrategy} avoids wasting work on recovering from errors
// when the result will be ignored either way.</li>
// </ul>
//
// <p>
// {@code myparser.setErrorHandler(new BailErrorStrategy());}</p>
//
// @see Parser//setErrorHandler(ANTLRErrorStrategy)
//


function BailErrorStrategy() {
  DefaultErrorStrategy.call(this);
  return this;
}

BailErrorStrategy.prototype = Object.create(DefaultErrorStrategy.prototype);
BailErrorStrategy.prototype.constructor = BailErrorStrategy; // Instead of recovering from exception {@code e}, re-throw it wrapped
// in a {@link ParseCancellationException} so it is not caught by the
// rule function catches. Use {@link Exception//getCause()} to get the
// original {@link RecognitionException}.
//

BailErrorStrategy.prototype.recover = function (recognizer, e) {
  var context = recognizer._ctx;

  while (context !== null) {
    context.exception = e;
    context = context.parentCtx;
  }

  throw new ParseCancellationException(e);
}; // Make sure we don't attempt to recover inline; if the parser
// successfully recovers, it won't throw an exception.
//


BailErrorStrategy.prototype.recoverInline = function (recognizer) {
  this.recover(recognizer, new InputMismatchException(recognizer));
}; // Make sure we don't attempt to recover from problems in subrules.//


BailErrorStrategy.prototype.sync = function (recognizer) {// pass
};

exports.BailErrorStrategy = BailErrorStrategy;
exports.DefaultErrorStrategy = DefaultErrorStrategy;

/***/ }),
/* 45 */
/***/ (function(module, exports, __webpack_require__) {

//

/* Copyright (c) 2012-2017 The ANTLR Project. All rights reserved.
 * Use of this file is governed by the BSD 3-clause license that
 * can be found in the LICENSE.txt file in the project root.
 */
//
var Token = __webpack_require__(9).Token;

__webpack_require__(36);

__webpack_require__(40); // Vacuum all input from a string and then treat it like a buffer.


function _loadString(stream) {
  stream._index = 0;
  stream.data = [];

  if (stream.decodeToUnicodeCodePoints) {
    for (var i = 0; i < stream.strdata.length;) {
      var codePoint = stream.strdata.codePointAt(i);
      stream.data.push(codePoint);
      i += codePoint <= 0xFFFF ? 1 : 2;
    }
  } else {
    for (var i = 0; i < stream.strdata.length; i++) {
      var codeUnit = stream.strdata.charCodeAt(i);
      stream.data.push(codeUnit);
    }
  }

  stream._size = stream.data.length;
} // If decodeToUnicodeCodePoints is true, the input is treated
// as a series of Unicode code points.
//
// Otherwise, the input is treated as a series of 16-bit UTF-16 code
// units.


function InputStream(data, decodeToUnicodeCodePoints) {
  this.name = "<empty>";
  this.strdata = data;
  this.decodeToUnicodeCodePoints = decodeToUnicodeCodePoints || false;

  _loadString(this);

  return this;
}

Object.defineProperty(InputStream.prototype, "index", {
  get: function get() {
    return this._index;
  }
});
Object.defineProperty(InputStream.prototype, "size", {
  get: function get() {
    return this._size;
  }
}); // Reset the stream so that it's in the same state it was
// when the object was created *except* the data array is not
// touched.
//

InputStream.prototype.reset = function () {
  this._index = 0;
};

InputStream.prototype.consume = function () {
  if (this._index >= this._size) {
    // assert this.LA(1) == Token.EOF
    throw "cannot consume EOF";
  }

  this._index += 1;
};

InputStream.prototype.LA = function (offset) {
  if (offset === 0) {
    return 0; // undefined
  }

  if (offset < 0) {
    offset += 1; // e.g., translate LA(-1) to use offset=0
  }

  var pos = this._index + offset - 1;

  if (pos < 0 || pos >= this._size) {
    // invalid
    return Token.EOF;
  }

  return this.data[pos];
};

InputStream.prototype.LT = function (offset) {
  return this.LA(offset);
}; // mark/release do nothing; we have entire buffer


InputStream.prototype.mark = function () {
  return -1;
};

InputStream.prototype.release = function (marker) {}; // consume() ahead until p==_index; can't just set p=_index as we must
// update line and column. If we seek backwards, just set p
//


InputStream.prototype.seek = function (_index) {
  if (_index <= this._index) {
    this._index = _index; // just jump; don't update stream state (line,
    // ...)

    return;
  } // seek forward


  this._index = Math.min(_index, this._size);
};

InputStream.prototype.getText = function (start, stop) {
  if (stop >= this._size) {
    stop = this._size - 1;
  }

  if (start >= this._size) {
    return "";
  } else {
    if (this.decodeToUnicodeCodePoints) {
      var result = "";

      for (var i = start; i <= stop; i++) {
        result += String.fromCodePoint(this.data[i]);
      }

      return result;
    } else {
      return this.strdata.slice(start, stop + 1);
    }
  }
};

InputStream.prototype.toString = function () {
  return this.strdata;
};

exports.InputStream = InputStream;

/***/ }),
/* 46 */
/***/ (function(module, exports, __webpack_require__) {

//

/* Copyright (c) 2012-2017 The ANTLR Project. All rights reserved.
 * Use of this file is governed by the BSD 3-clause license that
 * can be found in the LICENSE.txt file in the project root.
 */
///
//
// This class extends {@link BufferedTokenStream} with functionality to filter
// token streams to tokens on a particular channel (tokens where
// {@link Token//getChannel} returns a particular value).
//
// <p>
// This token stream provides access to all tokens by index or when calling
// methods like {@link //getText}. The channel filtering is only used for code
// accessing tokens via the lookahead methods {@link //LA}, {@link //LT}, and
// {@link //LB}.</p>
//
// <p>
// By default, tokens are placed on the default channel
// ({@link Token//DEFAULT_CHANNEL}), but may be reassigned by using the
// {@code ->channel(HIDDEN)} lexer command, or by using an embedded action to
// call {@link Lexer//setChannel}.
// </p>
//
// <p>
// Note: lexer rules which use the {@code ->skip} lexer command or call
// {@link Lexer//skip} do not produce tokens at all, so input text matched by
// such a rule will not be available as part of the token stream, regardless of
// channel.</p>
///
var Token = __webpack_require__(9).Token;

var BufferedTokenStream = __webpack_require__(47).BufferedTokenStream;

function CommonTokenStream(lexer, channel) {
  BufferedTokenStream.call(this, lexer);
  this.channel = channel === undefined ? Token.DEFAULT_CHANNEL : channel;
  return this;
}

CommonTokenStream.prototype = Object.create(BufferedTokenStream.prototype);
CommonTokenStream.prototype.constructor = CommonTokenStream;

CommonTokenStream.prototype.adjustSeekIndex = function (i) {
  return this.nextTokenOnChannel(i, this.channel);
};

CommonTokenStream.prototype.LB = function (k) {
  if (k === 0 || this.index - k < 0) {
    return null;
  }

  var i = this.index;
  var n = 1; // find k good tokens looking backwards

  while (n <= k) {
    // skip off-channel tokens
    i = this.previousTokenOnChannel(i - 1, this.channel);
    n += 1;
  }

  if (i < 0) {
    return null;
  }

  return this.tokens[i];
};

CommonTokenStream.prototype.LT = function (k) {
  this.lazyInit();

  if (k === 0) {
    return null;
  }

  if (k < 0) {
    return this.LB(-k);
  }

  var i = this.index;
  var n = 1; // we know tokens[pos] is a good one
  // find k good tokens

  while (n < k) {
    // skip off-channel tokens, but make sure to not look past EOF
    if (this.sync(i + 1)) {
      i = this.nextTokenOnChannel(i + 1, this.channel);
    }

    n += 1;
  }

  return this.tokens[i];
}; // Count EOF just once.///


CommonTokenStream.prototype.getNumberOfOnChannelTokens = function () {
  var n = 0;
  this.fill();

  for (var i = 0; i < this.tokens.length; i++) {
    var t = this.tokens[i];

    if (t.channel === this.channel) {
      n += 1;
    }

    if (t.type === Token.EOF) {
      break;
    }
  }

  return n;
};

exports.CommonTokenStream = CommonTokenStream;

/***/ }),
/* 47 */
/***/ (function(module, exports, __webpack_require__) {

//

/* Copyright (c) 2012-2017 The ANTLR Project. All rights reserved.
 * Use of this file is governed by the BSD 3-clause license that
 * can be found in the LICENSE.txt file in the project root.
 */
// This implementation of {@link TokenStream} loads tokens from a
// {@link TokenSource} on-demand, and places the tokens in a buffer to provide
// access to any previous token by index.
//
// <p>
// This token stream ignores the value of {@link Token//getChannel}. If your
// parser requires the token stream filter tokens to only those on a particular
// channel, such as {@link Token//DEFAULT_CHANNEL} or
// {@link Token//HIDDEN_CHANNEL}, use a filtering token stream such a
// {@link CommonTokenStream}.</p>
var Token = __webpack_require__(9).Token;

var Lexer = __webpack_require__(25).Lexer;

var Interval = __webpack_require__(13).Interval; // this is just to keep meaningful parameter types to Parser


function TokenStream() {
  return this;
}

function BufferedTokenStream(tokenSource) {
  TokenStream.call(this); // The {@link TokenSource} from which tokens for this stream are fetched.

  this.tokenSource = tokenSource; // A collection of all tokens fetched from the token source. The list is
  // considered a complete view of the input once {@link //fetchedEOF} is set
  // to {@code true}.

  this.tokens = []; // The index into {@link //tokens} of the current token (next token to
  // {@link //consume}). {@link //tokens}{@code [}{@link //p}{@code ]} should
  // be
  // {@link //LT LT(1)}.
  //
  // <p>This field is set to -1 when the stream is first constructed or when
  // {@link //setTokenSource} is called, indicating that the first token has
  // not yet been fetched from the token source. For additional information,
  // see the documentation of {@link IntStream} for a description of
  // Initializing Methods.</p>

  this.index = -1; // Indicates whether the {@link Token//EOF} token has been fetched from
  // {@link //tokenSource} and added to {@link //tokens}. This field improves
  // performance for the following cases:
  //
  // <ul>
  // <li>{@link //consume}: The lookahead check in {@link //consume} to
  // prevent
  // consuming the EOF symbol is optimized by checking the values of
  // {@link //fetchedEOF} and {@link //p} instead of calling {@link
  // //LA}.</li>
  // <li>{@link //fetch}: The check to prevent adding multiple EOF symbols
  // into
  // {@link //tokens} is trivial with this field.</li>
  // <ul>

  this.fetchedEOF = false;
  return this;
}

BufferedTokenStream.prototype = Object.create(TokenStream.prototype);
BufferedTokenStream.prototype.constructor = BufferedTokenStream;

BufferedTokenStream.prototype.mark = function () {
  return 0;
};

BufferedTokenStream.prototype.release = function (marker) {// no resources to release
};

BufferedTokenStream.prototype.reset = function () {
  this.seek(0);
};

BufferedTokenStream.prototype.seek = function (index) {
  this.lazyInit();
  this.index = this.adjustSeekIndex(index);
};

BufferedTokenStream.prototype.get = function (index) {
  this.lazyInit();
  return this.tokens[index];
};

BufferedTokenStream.prototype.consume = function () {
  var skipEofCheck = false;

  if (this.index >= 0) {
    if (this.fetchedEOF) {
      // the last token in tokens is EOF. skip check if p indexes any
      // fetched token except the last.
      skipEofCheck = this.index < this.tokens.length - 1;
    } else {
      // no EOF token in tokens. skip check if p indexes a fetched token.
      skipEofCheck = this.index < this.tokens.length;
    }
  } else {
    // not yet initialized
    skipEofCheck = false;
  }

  if (!skipEofCheck && this.LA(1) === Token.EOF) {
    throw "cannot consume EOF";
  }

  if (this.sync(this.index + 1)) {
    this.index = this.adjustSeekIndex(this.index + 1);
  }
}; // Make sure index {@code i} in tokens has a token.
//
// @return {@code true} if a token is located at index {@code i}, otherwise
// {@code false}.
// @see //get(int i)
// /


BufferedTokenStream.prototype.sync = function (i) {
  var n = i - this.tokens.length + 1; // how many more elements we need?

  if (n > 0) {
    var fetched = this.fetch(n);
    return fetched >= n;
  }

  return true;
}; // Add {@code n} elements to buffer.
//
// @return The actual number of elements added to the buffer.
// /


BufferedTokenStream.prototype.fetch = function (n) {
  if (this.fetchedEOF) {
    return 0;
  }

  for (var i = 0; i < n; i++) {
    var t = this.tokenSource.nextToken();
    t.tokenIndex = this.tokens.length;
    this.tokens.push(t);

    if (t.type === Token.EOF) {
      this.fetchedEOF = true;
      return i + 1;
    }
  }

  return n;
}; // Get all tokens from start..stop inclusively///


BufferedTokenStream.prototype.getTokens = function (start, stop, types) {
  if (types === undefined) {
    types = null;
  }

  if (start < 0 || stop < 0) {
    return null;
  }

  this.lazyInit();
  var subset = [];

  if (stop >= this.tokens.length) {
    stop = this.tokens.length - 1;
  }

  for (var i = start; i < stop; i++) {
    var t = this.tokens[i];

    if (t.type === Token.EOF) {
      break;
    }

    if (types === null || types.contains(t.type)) {
      subset.push(t);
    }
  }

  return subset;
};

BufferedTokenStream.prototype.LA = function (i) {
  return this.LT(i).type;
};

BufferedTokenStream.prototype.LB = function (k) {
  if (this.index - k < 0) {
    return null;
  }

  return this.tokens[this.index - k];
};

BufferedTokenStream.prototype.LT = function (k) {
  this.lazyInit();

  if (k === 0) {
    return null;
  }

  if (k < 0) {
    return this.LB(-k);
  }

  var i = this.index + k - 1;
  this.sync(i);

  if (i >= this.tokens.length) {
    // return EOF token
    // EOF must be last token
    return this.tokens[this.tokens.length - 1];
  }

  return this.tokens[i];
}; // Allowed derived classes to modify the behavior of operations which change
// the current stream position by adjusting the target token index of a seek
// operation. The default implementation simply returns {@code i}. If an
// exception is thrown in this method, the current stream index should not be
// changed.
//
// <p>For example, {@link CommonTokenStream} overrides this method to ensure
// that
// the seek target is always an on-channel token.</p>
//
// @param i The target token index.
// @return The adjusted target token index.


BufferedTokenStream.prototype.adjustSeekIndex = function (i) {
  return i;
};

BufferedTokenStream.prototype.lazyInit = function () {
  if (this.index === -1) {
    this.setup();
  }
};

BufferedTokenStream.prototype.setup = function () {
  this.sync(0);
  this.index = this.adjustSeekIndex(0);
}; // Reset this token stream by setting its token source.///


BufferedTokenStream.prototype.setTokenSource = function (tokenSource) {
  this.tokenSource = tokenSource;
  this.tokens = [];
  this.index = -1;
  this.fetchedEOF = false;
}; // Given a starting index, return the index of the next token on channel.
// Return i if tokens[i] is on channel. Return -1 if there are no tokens
// on channel between i and EOF.
// /


BufferedTokenStream.prototype.nextTokenOnChannel = function (i, channel) {
  this.sync(i);

  if (i >= this.tokens.length) {
    return -1;
  }

  var token = this.tokens[i];

  while (token.channel !== this.channel) {
    if (token.type === Token.EOF) {
      return -1;
    }

    i += 1;
    this.sync(i);
    token = this.tokens[i];
  }

  return i;
}; // Given a starting index, return the index of the previous token on channel.
// Return i if tokens[i] is on channel. Return -1 if there are no tokens
// on channel between i and 0.


BufferedTokenStream.prototype.previousTokenOnChannel = function (i, channel) {
  while (i >= 0 && this.tokens[i].channel !== channel) {
    i -= 1;
  }

  return i;
}; // Collect all tokens on specified channel to the right of
// the current token up until we see a token on DEFAULT_TOKEN_CHANNEL or
// EOF. If channel is -1, find any non default channel token.


BufferedTokenStream.prototype.getHiddenTokensToRight = function (tokenIndex, channel) {
  if (channel === undefined) {
    channel = -1;
  }

  this.lazyInit();

  if (tokenIndex < 0 || tokenIndex >= this.tokens.length) {
    throw "" + tokenIndex + " not in 0.." + this.tokens.length - 1;
  }

  var nextOnChannel = this.nextTokenOnChannel(tokenIndex + 1, Lexer.DEFAULT_TOKEN_CHANNEL);
  var from_ = tokenIndex + 1; // if none onchannel to right, nextOnChannel=-1 so set to = last token

  var to = nextOnChannel === -1 ? this.tokens.length - 1 : nextOnChannel;
  return this.filterForChannel(from_, to, channel);
}; // Collect all tokens on specified channel to the left of
// the current token up until we see a token on DEFAULT_TOKEN_CHANNEL.
// If channel is -1, find any non default channel token.


BufferedTokenStream.prototype.getHiddenTokensToLeft = function (tokenIndex, channel) {
  if (channel === undefined) {
    channel = -1;
  }

  this.lazyInit();

  if (tokenIndex < 0 || tokenIndex >= this.tokens.length) {
    throw "" + tokenIndex + " not in 0.." + this.tokens.length - 1;
  }

  var prevOnChannel = this.previousTokenOnChannel(tokenIndex - 1, Lexer.DEFAULT_TOKEN_CHANNEL);

  if (prevOnChannel === tokenIndex - 1) {
    return null;
  } // if none on channel to left, prevOnChannel=-1 then from=0


  var from_ = prevOnChannel + 1;
  var to = tokenIndex - 1;
  return this.filterForChannel(from_, to, channel);
};

BufferedTokenStream.prototype.filterForChannel = function (left, right, channel) {
  var hidden = [];

  for (var i = left; i < right + 1; i++) {
    var t = this.tokens[i];

    if (channel === -1) {
      if (t.channel !== Lexer.DEFAULT_TOKEN_CHANNEL) {
        hidden.push(t);
      }
    } else if (t.channel === channel) {
      hidden.push(t);
    }
  }

  if (hidden.length === 0) {
    return null;
  }

  return hidden;
};

BufferedTokenStream.prototype.getSourceName = function () {
  return this.tokenSource.getSourceName();
}; // Get the text of all tokens in this buffer.///


BufferedTokenStream.prototype.getText = function (interval) {
  this.lazyInit();
  this.fill();

  if (interval === undefined || interval === null) {
    interval = new Interval(0, this.tokens.length - 1);
  }

  var start = interval.start;

  if (start instanceof Token) {
    start = start.tokenIndex;
  }

  var stop = interval.stop;

  if (stop instanceof Token) {
    stop = stop.tokenIndex;
  }

  if (start === null || stop === null || start < 0 || stop < 0) {
    return "";
  }

  if (stop >= this.tokens.length) {
    stop = this.tokens.length - 1;
  }

  var s = "";

  for (var i = start; i < stop + 1; i++) {
    var t = this.tokens[i];

    if (t.type === Token.EOF) {
      break;
    }

    s = s + t.text;
  }

  return s;
}; // Get all tokens from lexer until EOF///


BufferedTokenStream.prototype.fill = function () {
  this.lazyInit();

  while (this.fetch(1000) === 1000) {
    continue;
  }
};

exports.BufferedTokenStream = BufferedTokenStream;

/***/ }),
/* 48 */
/***/ (function(module, exports, __webpack_require__) {

/* Copyright (c) 2012-2017 The ANTLR Project. All rights reserved.
 * Use of this file is governed by the BSD 3-clause license that
 * can be found in the LICENSE.txt file in the project root.
 */
var Token = __webpack_require__(9).Token;

var ParseTreeListener = __webpack_require__(17).ParseTreeListener;

var Recognizer = __webpack_require__(26).Recognizer;

var DefaultErrorStrategy = __webpack_require__(44).DefaultErrorStrategy;

var ATNDeserializer = __webpack_require__(20).ATNDeserializer;

var ATNDeserializationOptions = __webpack_require__(22).ATNDeserializationOptions;

var TerminalNode = __webpack_require__(17).TerminalNode;

var ErrorNode = __webpack_require__(17).ErrorNode;

function TraceListener(parser) {
  ParseTreeListener.call(this);
  this.parser = parser;
  return this;
}

TraceListener.prototype = Object.create(ParseTreeListener.prototype);
TraceListener.prototype.constructor = TraceListener;

TraceListener.prototype.enterEveryRule = function (ctx) {
  console.log("enter   " + this.parser.ruleNames[ctx.ruleIndex] + ", LT(1)=" + this.parser._input.LT(1).text);
};

TraceListener.prototype.visitTerminal = function (node) {
  console.log("consume " + node.symbol + " rule " + this.parser.ruleNames[this.parser._ctx.ruleIndex]);
};

TraceListener.prototype.exitEveryRule = function (ctx) {
  console.log("exit    " + this.parser.ruleNames[ctx.ruleIndex] + ", LT(1)=" + this.parser._input.LT(1).text);
}; // this is all the parsing support code essentially; most of it is error
// recovery stuff.//


function Parser(input) {
  Recognizer.call(this); // The input stream.

  this._input = null; // The error handling strategy for the parser. The default value is a new
  // instance of {@link DefaultErrorStrategy}.

  this._errHandler = new DefaultErrorStrategy();
  this._precedenceStack = [];

  this._precedenceStack.push(0); // The {@link ParserRuleContext} object for the currently executing rule.
  // this is always non-null during the parsing process.


  this._ctx = null; // Specifies whether or not the parser should construct a parse tree during
  // the parsing process. The default value is {@code true}.

  this.buildParseTrees = true; // When {@link //setTrace}{@code (true)} is called, a reference to the
  // {@link TraceListener} is stored here so it can be easily removed in a
  // later call to {@link //setTrace}{@code (false)}. The listener itself is
  // implemented as a parser listener so this field is not directly used by
  // other parser methods.

  this._tracer = null; // The list of {@link ParseTreeListener} listeners registered to receive
  // events during the parse.

  this._parseListeners = null; // The number of syntax errors reported during parsing. this value is
  // incremented each time {@link //notifyErrorListeners} is called.

  this._syntaxErrors = 0;
  this.setInputStream(input);
  return this;
}

Parser.prototype = Object.create(Recognizer.prototype);
Parser.prototype.contructor = Parser; // this field maps from the serialized ATN string to the deserialized {@link
// ATN} with
// bypass alternatives.
//
// @see ATNDeserializationOptions//isGenerateRuleBypassTransitions()
//

Parser.bypassAltsAtnCache = {}; // reset the parser's state//

Parser.prototype.reset = function () {
  if (this._input !== null) {
    this._input.seek(0);
  }

  this._errHandler.reset(this);

  this._ctx = null;
  this._syntaxErrors = 0;
  this.setTrace(false);
  this._precedenceStack = [];

  this._precedenceStack.push(0);

  if (this._interp !== null) {
    this._interp.reset();
  }
}; // Match current input symbol against {@code ttype}. If the symbol type
// matches, {@link ANTLRErrorStrategy//reportMatch} and {@link //consume} are
// called to complete the match process.
//
// <p>If the symbol type does not match,
// {@link ANTLRErrorStrategy//recoverInline} is called on the current error
// strategy to attempt recovery. If {@link //getBuildParseTree} is
// {@code true} and the token index of the symbol returned by
// {@link ANTLRErrorStrategy//recoverInline} is -1, the symbol is added to
// the parse tree by calling {@link ParserRuleContext//addErrorNode}.</p>
//
// @param ttype the token type to match
// @return the matched symbol
// @throws RecognitionException if the current input symbol did not match
// {@code ttype} and the error strategy could not recover from the
// mismatched symbol


Parser.prototype.match = function (ttype) {
  var t = this.getCurrentToken();

  if (t.type === ttype) {
    this._errHandler.reportMatch(this);

    this.consume();
  } else {
    t = this._errHandler.recoverInline(this);

    if (this.buildParseTrees && t.tokenIndex === -1) {
      // we must have conjured up a new token during single token
      // insertion
      // if it's not the current symbol
      this._ctx.addErrorNode(t);
    }
  }

  return t;
}; // Match current input symbol as a wildcard. If the symbol type matches
// (i.e. has a value greater than 0), {@link ANTLRErrorStrategy//reportMatch}
// and {@link //consume} are called to complete the match process.
//
// <p>If the symbol type does not match,
// {@link ANTLRErrorStrategy//recoverInline} is called on the current error
// strategy to attempt recovery. If {@link //getBuildParseTree} is
// {@code true} and the token index of the symbol returned by
// {@link ANTLRErrorStrategy//recoverInline} is -1, the symbol is added to
// the parse tree by calling {@link ParserRuleContext//addErrorNode}.</p>
//
// @return the matched symbol
// @throws RecognitionException if the current input symbol did not match
// a wildcard and the error strategy could not recover from the mismatched
// symbol


Parser.prototype.matchWildcard = function () {
  var t = this.getCurrentToken();

  if (t.type > 0) {
    this._errHandler.reportMatch(this);

    this.consume();
  } else {
    t = this._errHandler.recoverInline(this);

    if (this._buildParseTrees && t.tokenIndex === -1) {
      // we must have conjured up a new token during single token
      // insertion
      // if it's not the current symbol
      this._ctx.addErrorNode(t);
    }
  }

  return t;
};

Parser.prototype.getParseListeners = function () {
  return this._parseListeners || [];
}; // Registers {@code listener} to receive events during the parsing process.
//
// <p>To support output-preserving grammar transformations (including but not
// limited to left-recursion removal, automated left-factoring, and
// optimized code generation), calls to listener methods during the parse
// may differ substantially from calls made by
// {@link ParseTreeWalker//DEFAULT} used after the parse is complete. In
// particular, rule entry and exit events may occur in a different order
// during the parse than after the parser. In addition, calls to certain
// rule entry methods may be omitted.</p>
//
// <p>With the following specific exceptions, calls to listener events are
// <em>deterministic</em>, i.e. for identical input the calls to listener
// methods will be the same.</p>
//
// <ul>
// <li>Alterations to the grammar used to generate code may change the
// behavior of the listener calls.</li>
// <li>Alterations to the command line options passed to ANTLR 4 when
// generating the parser may change the behavior of the listener calls.</li>
// <li>Changing the version of the ANTLR Tool used to generate the parser
// may change the behavior of the listener calls.</li>
// </ul>
//
// @param listener the listener to add
//
// @throws NullPointerException if {@code} listener is {@code null}
//


Parser.prototype.addParseListener = function (listener) {
  if (listener === null) {
    throw "listener";
  }

  if (this._parseListeners === null) {
    this._parseListeners = [];
  }

  this._parseListeners.push(listener);
}; //
// Remove {@code listener} from the list of parse listeners.
//
// <p>If {@code listener} is {@code null} or has not been added as a parse
// listener, this method does nothing.</p>
// @param listener the listener to remove
//


Parser.prototype.removeParseListener = function (listener) {
  if (this._parseListeners !== null) {
    var idx = this._parseListeners.indexOf(listener);

    if (idx >= 0) {
      this._parseListeners.splice(idx, 1);
    }

    if (this._parseListeners.length === 0) {
      this._parseListeners = null;
    }
  }
}; // Remove all parse listeners.


Parser.prototype.removeParseListeners = function () {
  this._parseListeners = null;
}; // Notify any parse listeners of an enter rule event.


Parser.prototype.triggerEnterRuleEvent = function () {
  if (this._parseListeners !== null) {
    var ctx = this._ctx;

    this._parseListeners.map(function (listener) {
      listener.enterEveryRule(ctx);
      ctx.enterRule(listener);
    });
  }
}; //
// Notify any parse listeners of an exit rule event.
//
// @see //addParseListener
//


Parser.prototype.triggerExitRuleEvent = function () {
  if (this._parseListeners !== null) {
    // reverse order walk of listeners
    var ctx = this._ctx;

    this._parseListeners.slice(0).reverse().map(function (listener) {
      ctx.exitRule(listener);
      listener.exitEveryRule(ctx);
    });
  }
};

Parser.prototype.getTokenFactory = function () {
  return this._input.tokenSource._factory;
}; // Tell our token source and error strategy about a new way to create tokens.//


Parser.prototype.setTokenFactory = function (factory) {
  this._input.tokenSource._factory = factory;
}; // The ATN with bypass alternatives is expensive to create so we create it
// lazily.
//
// @throws UnsupportedOperationException if the current parser does not
// implement the {@link //getSerializedATN()} method.
//


Parser.prototype.getATNWithBypassAlts = function () {
  var serializedAtn = this.getSerializedATN();

  if (serializedAtn === null) {
    throw "The current parser does not support an ATN with bypass alternatives.";
  }

  var result = this.bypassAltsAtnCache[serializedAtn];

  if (result === null) {
    var deserializationOptions = new ATNDeserializationOptions();
    deserializationOptions.generateRuleBypassTransitions = true;
    result = new ATNDeserializer(deserializationOptions).deserialize(serializedAtn);
    this.bypassAltsAtnCache[serializedAtn] = result;
  }

  return result;
}; // The preferred method of getting a tree pattern. For example, here's a
// sample use:
//
// <pre>
// ParseTree t = parser.expr();
// ParseTreePattern p = parser.compileParseTreePattern("&lt;ID&gt;+0",
// MyParser.RULE_expr);
// ParseTreeMatch m = p.match(t);
// String id = m.get("ID");
// </pre>


var Lexer = __webpack_require__(25).Lexer;

Parser.prototype.compileParseTreePattern = function (pattern, patternRuleIndex, lexer) {
  lexer = lexer || null;

  if (lexer === null) {
    if (this.getTokenStream() !== null) {
      var tokenSource = this.getTokenStream().tokenSource;

      if (tokenSource instanceof Lexer) {
        lexer = tokenSource;
      }
    }
  }

  if (lexer === null) {
    throw "Parser can't discover a lexer to use";
  }

  var m = new ParseTreePatternMatcher(lexer, this);
  return m.compile(pattern, patternRuleIndex);
};

Parser.prototype.getInputStream = function () {
  return this.getTokenStream();
};

Parser.prototype.setInputStream = function (input) {
  this.setTokenStream(input);
};

Parser.prototype.getTokenStream = function () {
  return this._input;
}; // Set the token stream and reset the parser.//


Parser.prototype.setTokenStream = function (input) {
  this._input = null;
  this.reset();
  this._input = input;
}; // Match needs to return the current input symbol, which gets put
// into the label for the associated token ref; e.g., x=ID.
//


Parser.prototype.getCurrentToken = function () {
  return this._input.LT(1);
};

Parser.prototype.notifyErrorListeners = function (msg, offendingToken, err) {
  offendingToken = offendingToken || null;
  err = err || null;

  if (offendingToken === null) {
    offendingToken = this.getCurrentToken();
  }

  this._syntaxErrors += 1;
  var line = offendingToken.line;
  var column = offendingToken.column;
  var listener = this.getErrorListenerDispatch();
  listener.syntaxError(this, offendingToken, line, column, msg, err);
}; //
// Consume and return the {@linkplain //getCurrentToken current symbol}.
//
// <p>E.g., given the following input with {@code A} being the current
// lookahead symbol, this function moves the cursor to {@code B} and returns
// {@code A}.</p>
//
// <pre>
// A B
// ^
// </pre>
//
// If the parser is not in error recovery mode, the consumed symbol is added
// to the parse tree using {@link ParserRuleContext//addChild(Token)}, and
// {@link ParseTreeListener//visitTerminal} is called on any parse listeners.
// If the parser <em>is</em> in error recovery mode, the consumed symbol is
// added to the parse tree using
// {@link ParserRuleContext//addErrorNode(Token)}, and
// {@link ParseTreeListener//visitErrorNode} is called on any parse
// listeners.
//


Parser.prototype.consume = function () {
  var o = this.getCurrentToken();

  if (o.type !== Token.EOF) {
    this.getInputStream().consume();
  }

  var hasListener = this._parseListeners !== null && this._parseListeners.length > 0;

  if (this.buildParseTrees || hasListener) {
    var node;

    if (this._errHandler.inErrorRecoveryMode(this)) {
      node = this._ctx.addErrorNode(o);
    } else {
      node = this._ctx.addTokenNode(o);
    }

    node.invokingState = this.state;

    if (hasListener) {
      this._parseListeners.map(function (listener) {
        if (node instanceof ErrorNode || node.isErrorNode !== undefined && node.isErrorNode()) {
          listener.visitErrorNode(node);
        } else if (node instanceof TerminalNode) {
          listener.visitTerminal(node);
        }
      });
    }
  }

  return o;
};

Parser.prototype.addContextToParseTree = function () {
  // add current context to parent if we have a parent
  if (this._ctx.parentCtx !== null) {
    this._ctx.parentCtx.addChild(this._ctx);
  }
}; // Always called by generated parsers upon entry to a rule. Access field
// {@link //_ctx} get the current context.


Parser.prototype.enterRule = function (localctx, state, ruleIndex) {
  this.state = state;
  this._ctx = localctx;
  this._ctx.start = this._input.LT(1);

  if (this.buildParseTrees) {
    this.addContextToParseTree();
  }

  if (this._parseListeners !== null) {
    this.triggerEnterRuleEvent();
  }
};

Parser.prototype.exitRule = function () {
  this._ctx.stop = this._input.LT(-1); // trigger event on _ctx, before it reverts to parent

  if (this._parseListeners !== null) {
    this.triggerExitRuleEvent();
  }

  this.state = this._ctx.invokingState;
  this._ctx = this._ctx.parentCtx;
};

Parser.prototype.enterOuterAlt = function (localctx, altNum) {
  localctx.setAltNumber(altNum); // if we have new localctx, make sure we replace existing ctx
  // that is previous child of parse tree

  if (this.buildParseTrees && this._ctx !== localctx) {
    if (this._ctx.parentCtx !== null) {
      this._ctx.parentCtx.removeLastChild();

      this._ctx.parentCtx.addChild(localctx);
    }
  }

  this._ctx = localctx;
}; // Get the precedence level for the top-most precedence rule.
//
// @return The precedence level for the top-most precedence rule, or -1 if
// the parser context is not nested within a precedence rule.


Parser.prototype.getPrecedence = function () {
  if (this._precedenceStack.length === 0) {
    return -1;
  } else {
    return this._precedenceStack[this._precedenceStack.length - 1];
  }
};

Parser.prototype.enterRecursionRule = function (localctx, state, ruleIndex, precedence) {
  this.state = state;

  this._precedenceStack.push(precedence);

  this._ctx = localctx;
  this._ctx.start = this._input.LT(1);

  if (this._parseListeners !== null) {
    this.triggerEnterRuleEvent(); // simulates rule entry for
    // left-recursive rules
  }
}; //
// Like {@link //enterRule} but for recursive rules.


Parser.prototype.pushNewRecursionContext = function (localctx, state, ruleIndex) {
  var previous = this._ctx;
  previous.parentCtx = localctx;
  previous.invokingState = state;
  previous.stop = this._input.LT(-1);
  this._ctx = localctx;
  this._ctx.start = previous.start;

  if (this.buildParseTrees) {
    this._ctx.addChild(previous);
  }

  if (this._parseListeners !== null) {
    this.triggerEnterRuleEvent(); // simulates rule entry for
    // left-recursive rules
  }
};

Parser.prototype.unrollRecursionContexts = function (parentCtx) {
  this._precedenceStack.pop();

  this._ctx.stop = this._input.LT(-1);
  var retCtx = this._ctx; // save current ctx (return value)
  // unroll so _ctx is as it was before call to recursive method

  if (this._parseListeners !== null) {
    while (this._ctx !== parentCtx) {
      this.triggerExitRuleEvent();
      this._ctx = this._ctx.parentCtx;
    }
  } else {
    this._ctx = parentCtx;
  } // hook into tree


  retCtx.parentCtx = parentCtx;

  if (this.buildParseTrees && parentCtx !== null) {
    // add return ctx into invoking rule's tree
    parentCtx.addChild(retCtx);
  }
};

Parser.prototype.getInvokingContext = function (ruleIndex) {
  var ctx = this._ctx;

  while (ctx !== null) {
    if (ctx.ruleIndex === ruleIndex) {
      return ctx;
    }

    ctx = ctx.parentCtx;
  }

  return null;
};

Parser.prototype.precpred = function (localctx, precedence) {
  return precedence >= this._precedenceStack[this._precedenceStack.length - 1];
};

Parser.prototype.inContext = function (context) {
  // TODO: useful in parser?
  return false;
}; //
// Checks whether or not {@code symbol} can follow the current state in the
// ATN. The behavior of this method is equivalent to the following, but is
// implemented such that the complete context-sensitive follow set does not
// need to be explicitly constructed.
//
// <pre>
// return getExpectedTokens().contains(symbol);
// </pre>
//
// @param symbol the symbol type to check
// @return {@code true} if {@code symbol} can follow the current state in
// the ATN, otherwise {@code false}.


Parser.prototype.isExpectedToken = function (symbol) {
  var atn = this._interp.atn;
  var ctx = this._ctx;
  var s = atn.states[this.state];
  var following = atn.nextTokens(s);

  if (following.contains(symbol)) {
    return true;
  }

  if (!following.contains(Token.EPSILON)) {
    return false;
  }

  while (ctx !== null && ctx.invokingState >= 0 && following.contains(Token.EPSILON)) {
    var invokingState = atn.states[ctx.invokingState];
    var rt = invokingState.transitions[0];
    following = atn.nextTokens(rt.followState);

    if (following.contains(symbol)) {
      return true;
    }

    ctx = ctx.parentCtx;
  }

  if (following.contains(Token.EPSILON) && symbol === Token.EOF) {
    return true;
  } else {
    return false;
  }
}; // Computes the set of input symbols which could follow the current parser
// state and context, as given by {@link //getState} and {@link //getContext},
// respectively.
//
// @see ATN//getExpectedTokens(int, RuleContext)
//


Parser.prototype.getExpectedTokens = function () {
  return this._interp.atn.getExpectedTokens(this.state, this._ctx);
};

Parser.prototype.getExpectedTokensWithinCurrentRule = function () {
  var atn = this._interp.atn;
  var s = atn.states[this.state];
  return atn.nextTokens(s);
}; // Get a rule's index (i.e., {@code RULE_ruleName} field) or -1 if not found.//


Parser.prototype.getRuleIndex = function (ruleName) {
  var ruleIndex = this.getRuleIndexMap()[ruleName];

  if (ruleIndex !== null) {
    return ruleIndex;
  } else {
    return -1;
  }
}; // Return List&lt;String&gt; of the rule names in your parser instance
// leading up to a call to the current rule. You could override if
// you want more details such as the file/line info of where
// in the ATN a rule is invoked.
//
// this is very useful for error messages.
//


Parser.prototype.getRuleInvocationStack = function (p) {
  p = p || null;

  if (p === null) {
    p = this._ctx;
  }

  var stack = [];

  while (p !== null) {
    // compute what follows who invoked us
    var ruleIndex = p.ruleIndex;

    if (ruleIndex < 0) {
      stack.push("n/a");
    } else {
      stack.push(this.ruleNames[ruleIndex]);
    }

    p = p.parentCtx;
  }

  return stack;
}; // For debugging and other purposes.//


Parser.prototype.getDFAStrings = function () {
  return this._interp.decisionToDFA.toString();
}; // For debugging and other purposes.//


Parser.prototype.dumpDFA = function () {
  var seenOne = false;

  for (var i = 0; i < this._interp.decisionToDFA.length; i++) {
    var dfa = this._interp.decisionToDFA[i];

    if (dfa.states.length > 0) {
      if (seenOne) {
        console.log();
      }

      this.printer.println("Decision " + dfa.decision + ":");
      this.printer.print(dfa.toString(this.literalNames, this.symbolicNames));
      seenOne = true;
    }
  }
};
/*
"			printer = function() {\r\n" +
"				this.println = function(s) { document.getElementById('output') += s + '\\n'; }\r\n" +
"				this.print = function(s) { document.getElementById('output') += s; }\r\n" +
"			};\r\n" +
*/


Parser.prototype.getSourceName = function () {
  return this._input.sourceName;
}; // During a parse is sometimes useful to listen in on the rule entry and exit
// events as well as token matches. this is for quick and dirty debugging.
//


Parser.prototype.setTrace = function (trace) {
  if (!trace) {
    this.removeParseListener(this._tracer);
    this._tracer = null;
  } else {
    if (this._tracer !== null) {
      this.removeParseListener(this._tracer);
    }

    this._tracer = new TraceListener(this);
    this.addParseListener(this._tracer);
  }
};

exports.Parser = Parser;

/***/ }),
/* 49 */
/***/ (function(module, exports, __webpack_require__) {

// Generated from FHIRPath.g4 by ANTLR 4.7.1
// jshint ignore: start
var antlr4 = __webpack_require__(4);

var serializedATN = ["\x03\u608B\uA72A\u8133\uB9ED\u417C\u3BE7\u7786\u5964", "\x02A\u0203\b\x01\x04\x02\t\x02\x04\x03\t\x03\x04", "\x04\t\x04\x04\x05\t\x05\x04\x06\t\x06\x04\x07\t", "\x07\x04\b\t\b\x04\t\t\t\x04\n\t\n\x04\x0B\t\x0B\x04", "\f\t\f\x04\r\t\r\x04\x0E\t\x0E\x04\x0F\t\x0F\x04\x10", "\t\x10\x04\x11\t\x11\x04\x12\t\x12\x04\x13\t\x13", "\x04\x14\t\x14\x04\x15\t\x15\x04\x16\t\x16\x04\x17", "\t\x17\x04\x18\t\x18\x04\x19\t\x19\x04\x1A\t\x1A", "\x04\x1B\t\x1B\x04\x1C\t\x1C\x04\x1D\t\x1D\x04\x1E", "\t\x1E\x04\x1F\t\x1F\x04 \t \x04!\t!\x04\"\t\"\x04#", "\t#\x04$\t$\x04%\t%\x04&\t&\x04'\t'\x04(\t(\x04)\t)\x04", "*\t*\x04+\t+\x04,\t,\x04-\t-\x04.\t.\x04/\t/\x040\t0\x04", "1\t1\x042\t2\x043\t3\x044\t4\x045\t5\x046\t6\x047\t7\x04", "8\t8\x049\t9\x04:\t:\x04;\t;\x04<\t<\x04=\t=\x04>\t>\x04", "?\t?\x04@\t@\x04A\tA\x04B\tB\x04C\tC\x04D\tD\x03\x02\x03", "\x02\x03\x03\x03\x03\x03\x04\x03\x04\x03\x05\x03", "\x05\x03\x06\x03\x06\x03\x07\x03\x07\x03\b\x03", "\b\x03\t\x03\t\x03\t\x03\t\x03\n\x03\n\x03\n\x03\n\x03", "\x0B\x03\x0B\x03\f\x03\f\x03\r\x03\r\x03\r\x03\x0E", "\x03\x0E\x03\x0F\x03\x0F\x03\x10\x03\x10\x03\x10", "\x03\x11\x03\x11\x03\x11\x03\x12\x03\x12\x03\x12", "\x03\x13\x03\x13\x03\x14\x03\x14\x03\x15\x03\x15", "\x03\x15\x03\x16\x03\x16\x03\x16\x03\x17\x03\x17", "\x03\x17\x03\x18\x03\x18\x03\x18\x03\x18\x03\x18", "\x03\x18\x03\x18\x03\x18\x03\x18\x03\x19\x03\x19", "\x03\x19\x03\x19\x03\x1A\x03\x1A\x03\x1A\x03\x1B", "\x03\x1B\x03\x1B\x03\x1B\x03\x1C\x03\x1C\x03\x1C", "\x03\x1C\x03\x1C\x03\x1C\x03\x1C\x03\x1C\x03\x1D", "\x03\x1D\x03\x1E\x03\x1E\x03\x1F\x03\x1F\x03 ", "\x03 \x03!\x03!\x03!\x03!\x03!\x03\"\x03\"\x03\"\x03", "\"\x03\"\x03\"\x03#\x03#\x03$\x03$\x03$\x03$\x03$", "\x03$\x03%\x03%\x03%\x03%\x03%\x03%\x03%\x03&\x03", "&\x03&\x03&\x03&\x03&\x03&\x03'\x03'\x03(\x03(\x03", "(\x03(\x03(\x03)\x03)\x03)\x03)\x03)\x03)\x03*\x03", "*\x03*\x03*\x03*\x03+\x03+\x03+\x03+\x03,\x03,\x03", ",\x03,\x03,\x03-\x03-\x03-\x03-\x03-\x03-\x03-\x03", ".\x03.\x03.\x03.\x03.\x03.\x03.\x03/\x03/\x03/\x03", "/\x03/\x03/\x03/\x03/\x03/\x03/\x03/\x03/\x030\x03", "0\x030\x030\x030\x030\x031\x031\x031\x031\x031\x03", "1\x031\x032\x032\x032\x032\x032\x032\x033\x033\x03", "3\x033\x033\x034\x034\x034\x034\x034\x034\x035\x03", "5\x035\x035\x035\x035\x035\x035\x036\x036\x036\x03", "6\x036\x036\x036\x036\x037\x037\x037\x037\x037\x03", "7\x037\x037\x037\x037\x037\x037\x037\x038\x038\x03", "8\x038\x038\x038\x038\x038\x038\x038\x038\x038\x03", "8\x058\u0183\n8\x058\u0185\n8\x058\u0187\n8\x038\x058\u018A", "\n8\x039\x039\x039\x039\x03:\x03:\x03:\x03:\x03:\x03", ":\x03:\x03:\x03:\x03:\x06:\u019A\n:\r:\x0E:\u019B\x05", ":\u019E\n:\x05:\u01A0\n:\x05:\u01A2\n:\x03:\x03:\x03:\x03", ":\x03:\x03:\x03:\x05:\u01AB\n:\x03;\x05;\u01AE\n;\x03", ";\x07;\u01B1\n;\f;\x0E;\u01B4\x0B;\x03<\x03<\x03<\x07", "<\u01B9\n<\f<\x0E<\u01BC\x0B<\x03<\x03<\x03=\x03=\x03", "=\x07=\u01C3\n=\f=\x0E=\u01C6\x0B=\x03=\x03=\x03>\x06", ">\u01CB\n>\r>\x0E>\u01CC\x03>\x03>\x06>\u01D1\n>\r>\x0E>\u01D2", "\x05>\u01D5\n>\x03?\x06?\u01D8\n?\r?\x0E?\u01D9\x03?\x03", "?\x03@\x03@\x03@\x03@\x07@\u01E2\n@\f@\x0E@\u01E5\x0B", "@\x03@\x03@\x03@\x03@\x03@\x03A\x03A\x03A\x03A\x07", "A\u01F0\nA\fA\x0EA\u01F3\x0BA\x03A\x03A\x03B\x03B\x03", "B\x05B\u01FA\nB\x03C\x03C\x03C\x03C\x03C\x03C\x03D\x03", "D\x03\u01E3\x02E\x03\x03\x05\x04\x07\x05\t\x06\x0B", "\x07\r\b\x0F\t\x11\n\x13\x0B\x15\f\x17\r\x19\x0E\x1B", "\x0F\x1D\x10\x1F\x11!\x12#\x13%\x14'\x15)\x16+", "\x17-\x18/\x191\x1A3\x1B5\x1C7\x1D9\x1E;\x1F= ?!A", "\"C#E$G%I&K'M(O)Q*S+U,W-Y.[/]0_1a2c3e4g5i6k7m8o9q:s\x02u;w<y={>}", "?\x7F@\x81A\x83\x02\x85\x02\x87\x02\x03\x02\f\x03", "\x022;\x04\x02--//\x05\x02C\\aac|\x06\x022;C\\aac|\x04", "\x02^^bb\x03\x02))\x05\x02\x0B\f\x0F\x0F\"\"\x04\x02", "\f\f\x0F\x0F\n\x02))11^^bbhhppttvv\x05\x022;CHch\x02\u0214", "\x02\x03\x03\x02\x02\x02\x02\x05\x03\x02\x02\x02", "\x02\x07\x03\x02\x02\x02\x02\t\x03\x02\x02\x02", "\x02\x0B\x03\x02\x02\x02\x02\r\x03\x02\x02\x02", "\x02\x0F\x03\x02\x02\x02\x02\x11\x03\x02\x02\x02", "\x02\x13\x03\x02\x02\x02\x02\x15\x03\x02\x02\x02", "\x02\x17\x03\x02\x02\x02\x02\x19\x03\x02\x02\x02", "\x02\x1B\x03\x02\x02\x02\x02\x1D\x03\x02\x02\x02", "\x02\x1F\x03\x02\x02\x02\x02!\x03\x02\x02\x02", "\x02#\x03\x02\x02\x02\x02%\x03\x02\x02\x02\x02", "'\x03\x02\x02\x02\x02)\x03\x02\x02\x02\x02+\x03", "\x02\x02\x02\x02-\x03\x02\x02\x02\x02/\x03\x02", "\x02\x02\x021\x03\x02\x02\x02\x023\x03\x02\x02", "\x02\x025\x03\x02\x02\x02\x027\x03\x02\x02\x02", "\x029\x03\x02\x02\x02\x02;\x03\x02\x02\x02\x02", "=\x03\x02\x02\x02\x02?\x03\x02\x02\x02\x02A\x03", "\x02\x02\x02\x02C\x03\x02\x02\x02\x02E\x03\x02", "\x02\x02\x02G\x03\x02\x02\x02\x02I\x03\x02\x02", "\x02\x02K\x03\x02\x02\x02\x02M\x03\x02\x02\x02", "\x02O\x03\x02\x02\x02\x02Q\x03\x02\x02\x02\x02", "S\x03\x02\x02\x02\x02U\x03\x02\x02\x02\x02W\x03", "\x02\x02\x02\x02Y\x03\x02\x02\x02\x02[\x03\x02", "\x02\x02\x02]\x03\x02\x02\x02\x02_\x03\x02\x02", "\x02\x02a\x03\x02\x02\x02\x02c\x03\x02\x02\x02", "\x02e\x03\x02\x02\x02\x02g\x03\x02\x02\x02\x02", "i\x03\x02\x02\x02\x02k\x03\x02\x02\x02\x02m\x03", "\x02\x02\x02\x02o\x03\x02\x02\x02\x02q\x03\x02", "\x02\x02\x02u\x03\x02\x02\x02\x02w\x03\x02\x02", "\x02\x02y\x03\x02\x02\x02\x02{\x03\x02\x02\x02", "\x02}\x03\x02\x02\x02\x02\x7F\x03\x02\x02\x02", "\x02\x81\x03\x02\x02\x02\x03\x89\x03\x02\x02\x02", "\x05\x8B\x03\x02\x02\x02\x07\x8D\x03\x02\x02\x02", "\t\x8F\x03\x02\x02\x02\x0B\x91\x03\x02\x02\x02", "\r\x93\x03\x02\x02\x02\x0F\x95\x03\x02\x02\x02", "\x11\x97\x03\x02\x02\x02\x13\x9B\x03\x02\x02\x02", "\x15\x9F\x03\x02\x02\x02\x17\xA1\x03\x02\x02\x02", "\x19\xA3\x03\x02\x02\x02\x1B\xA6\x03\x02\x02\x02", "\x1D\xA8\x03\x02\x02\x02\x1F\xAA\x03\x02\x02\x02", "!\xAD\x03\x02\x02\x02#\xB0\x03\x02\x02\x02%\xB3", "\x03\x02\x02\x02'\xB5\x03\x02\x02\x02)\xB7\x03", "\x02\x02\x02+\xBA\x03\x02\x02\x02-\xBD\x03\x02", "\x02\x02/\xC0\x03\x02\x02\x021\xC9\x03\x02\x02", "\x023\xCD\x03\x02\x02\x025\xD0\x03\x02\x02\x02", "7\xD4\x03\x02\x02\x029\xDC\x03\x02\x02\x02;\xDE", "\x03\x02\x02\x02=\xE0\x03\x02\x02\x02?\xE2\x03", "\x02\x02\x02A\xE4\x03\x02\x02\x02C\xE9\x03\x02", "\x02\x02E\xEF\x03\x02\x02\x02G\xF1\x03\x02\x02", "\x02I\xF7\x03\x02\x02\x02K\xFE\x03\x02\x02\x02", "M\u0105\x03\x02\x02\x02O\u0107\x03\x02\x02\x02Q\u010C", "\x03\x02\x02\x02S\u0112\x03\x02\x02\x02U\u0117\x03", "\x02\x02\x02W\u011B\x03\x02\x02\x02Y\u0120\x03\x02", "\x02\x02[\u0127\x03\x02\x02\x02]\u012E\x03\x02\x02", "\x02_\u013A\x03\x02\x02\x02a\u0140\x03\x02\x02\x02", "c\u0147\x03\x02\x02\x02e\u014D\x03\x02\x02\x02g\u0152", "\x03\x02\x02\x02i\u0158\x03\x02\x02\x02k\u0160\x03", "\x02\x02\x02m\u0168\x03\x02\x02\x02o\u0175\x03\x02", "\x02\x02q\u018B\x03\x02\x02\x02s\u018F\x03\x02\x02", "\x02u\u01AD\x03\x02\x02\x02w\u01B5\x03\x02\x02\x02", "y\u01BF\x03\x02\x02\x02{\u01CA\x03\x02\x02\x02}\u01D7", "\x03\x02\x02\x02\x7F\u01DD\x03\x02\x02\x02\x81\u01EB", "\x03\x02\x02\x02\x83\u01F6\x03\x02\x02\x02\x85\u01FB", "\x03\x02\x02\x02\x87\u0201\x03\x02\x02\x02\x89\x8A", "\x070\x02\x02\x8A\x04\x03\x02\x02\x02\x8B\x8C", "\x07]\x02\x02\x8C\x06\x03\x02\x02\x02\x8D\x8E", "\x07_\x02\x02\x8E\b\x03\x02\x02\x02\x8F\x90\x07", "-\x02\x02\x90\n\x03\x02\x02\x02\x91\x92\x07/\x02", "\x02\x92\f\x03\x02\x02\x02\x93\x94\x07,\x02\x02", "\x94\x0E\x03\x02\x02\x02\x95\x96\x071\x02\x02", "\x96\x10\x03\x02\x02\x02\x97\x98\x07f\x02\x02", "\x98\x99\x07k\x02\x02\x99\x9A\x07x\x02\x02\x9A", "\x12\x03\x02\x02\x02\x9B\x9C\x07o\x02\x02\x9C", "\x9D\x07q\x02\x02\x9D\x9E\x07f\x02\x02\x9E\x14", "\x03\x02\x02\x02\x9F\xA0\x07(\x02\x02\xA0\x16", "\x03\x02\x02\x02\xA1\xA2\x07~\x02\x02\xA2\x18", "\x03\x02\x02\x02\xA3\xA4\x07>\x02\x02\xA4\xA5", "\x07?\x02\x02\xA5\x1A\x03\x02\x02\x02\xA6\xA7", "\x07>\x02\x02\xA7\x1C\x03\x02\x02\x02\xA8\xA9", "\x07@\x02\x02\xA9\x1E\x03\x02\x02\x02\xAA\xAB", "\x07@\x02\x02\xAB\xAC\x07?\x02\x02\xAC \x03\x02", "\x02\x02\xAD\xAE\x07k\x02\x02\xAE\xAF\x07u\x02", "\x02\xAF\"\x03\x02\x02\x02\xB0\xB1\x07c\x02\x02", "\xB1\xB2\x07u\x02\x02\xB2$\x03\x02\x02\x02\xB3", "\xB4\x07?\x02\x02\xB4&\x03\x02\x02\x02\xB5\xB6", "\x07\x80\x02\x02\xB6(\x03\x02\x02\x02\xB7\xB8", "\x07#\x02\x02\xB8\xB9\x07?\x02\x02\xB9*\x03\x02", "\x02\x02\xBA\xBB\x07#\x02\x02\xBB\xBC\x07\x80", "\x02\x02\xBC,\x03\x02\x02\x02\xBD\xBE\x07k\x02", "\x02\xBE\xBF\x07p\x02\x02\xBF.\x03\x02\x02\x02", "\xC0\xC1\x07e\x02\x02\xC1\xC2\x07q\x02\x02\xC2", "\xC3\x07p\x02\x02\xC3\xC4\x07v\x02\x02\xC4\xC5", "\x07c\x02\x02\xC5\xC6\x07k\x02\x02\xC6\xC7\x07", "p\x02\x02\xC7\xC8\x07u\x02\x02\xC80\x03\x02\x02", "\x02\xC9\xCA\x07c\x02\x02\xCA\xCB\x07p\x02\x02", "\xCB\xCC\x07f\x02\x02\xCC2\x03\x02\x02\x02\xCD", "\xCE\x07q\x02\x02\xCE\xCF\x07t\x02\x02\xCF4\x03", "\x02\x02\x02\xD0\xD1\x07z\x02\x02\xD1\xD2\x07", "q\x02\x02\xD2\xD3\x07t\x02\x02\xD36\x03\x02\x02", "\x02\xD4\xD5\x07k\x02\x02\xD5\xD6\x07o\x02\x02", "\xD6\xD7\x07r\x02\x02\xD7\xD8\x07n\x02\x02\xD8", "\xD9\x07k\x02\x02\xD9\xDA\x07g\x02\x02\xDA\xDB", "\x07u\x02\x02\xDB8\x03\x02\x02\x02\xDC\xDD\x07", "*\x02\x02\xDD:\x03\x02\x02\x02\xDE\xDF\x07+\x02", "\x02\xDF<\x03\x02\x02\x02\xE0\xE1\x07}\x02\x02", "\xE1>\x03\x02\x02\x02\xE2\xE3\x07\x7F\x02\x02", "\xE3@\x03\x02\x02\x02\xE4\xE5\x07v\x02\x02\xE5", "\xE6\x07t\x02\x02\xE6\xE7\x07w\x02\x02\xE7\xE8", "\x07g\x02\x02\xE8B\x03\x02\x02\x02\xE9\xEA\x07", "h\x02\x02\xEA\xEB\x07c\x02\x02\xEB\xEC\x07n\x02", "\x02\xEC\xED\x07u\x02\x02\xED\xEE\x07g\x02\x02", "\xEED\x03\x02\x02\x02\xEF\xF0\x07'\x02\x02\xF0", "F\x03\x02\x02\x02\xF1\xF2\x07&\x02\x02\xF2\xF3", "\x07v\x02\x02\xF3\xF4\x07j\x02\x02\xF4\xF5\x07", "k\x02\x02\xF5\xF6\x07u\x02\x02\xF6H\x03\x02\x02", "\x02\xF7\xF8\x07&\x02\x02\xF8\xF9\x07k\x02\x02", "\xF9\xFA\x07p\x02\x02\xFA\xFB\x07f\x02\x02\xFB", "\xFC\x07g\x02\x02\xFC\xFD\x07z\x02\x02\xFDJ\x03", "\x02\x02\x02\xFE\xFF\x07&\x02\x02\xFF\u0100\x07", "v\x02\x02\u0100\u0101\x07q\x02\x02\u0101\u0102\x07v\x02", "\x02\u0102\u0103\x07c\x02\x02\u0103\u0104\x07n\x02\x02", "\u0104L\x03\x02\x02\x02\u0105\u0106\x07.\x02\x02\u0106", "N\x03\x02\x02\x02\u0107\u0108\x07{\x02\x02\u0108\u0109", "\x07g\x02\x02\u0109\u010A\x07c\x02\x02\u010A\u010B\x07", "t\x02\x02\u010BP\x03\x02\x02\x02\u010C\u010D\x07o\x02", "\x02\u010D\u010E\x07q\x02\x02\u010E\u010F\x07p\x02\x02", "\u010F\u0110\x07v\x02\x02\u0110\u0111\x07j\x02\x02\u0111", "R\x03\x02\x02\x02\u0112\u0113\x07y\x02\x02\u0113\u0114", "\x07g\x02\x02\u0114\u0115\x07g\x02\x02\u0115\u0116\x07", "m\x02\x02\u0116T\x03\x02\x02\x02\u0117\u0118\x07f\x02", "\x02\u0118\u0119\x07c\x02\x02\u0119\u011A\x07{\x02\x02", "\u011AV\x03\x02\x02\x02\u011B\u011C\x07j\x02\x02\u011C", "\u011D\x07q\x02\x02\u011D\u011E\x07w\x02\x02\u011E\u011F", "\x07t\x02\x02\u011FX\x03\x02\x02\x02\u0120\u0121\x07", "o\x02\x02\u0121\u0122\x07k\x02\x02\u0122\u0123\x07p\x02", "\x02\u0123\u0124\x07w\x02\x02\u0124\u0125\x07v\x02\x02", "\u0125\u0126\x07g\x02\x02\u0126Z\x03\x02\x02\x02\u0127", "\u0128\x07u\x02\x02\u0128\u0129\x07g\x02\x02\u0129\u012A", "\x07e\x02\x02\u012A\u012B\x07q\x02\x02\u012B\u012C\x07", "p\x02\x02\u012C\u012D\x07f\x02\x02\u012D\\\x03\x02\x02", "\x02\u012E\u012F\x07o\x02\x02\u012F\u0130\x07k\x02\x02", "\u0130\u0131\x07n\x02\x02\u0131\u0132\x07n\x02\x02\u0132", "\u0133\x07k\x02\x02\u0133\u0134\x07u\x02\x02\u0134\u0135", "\x07g\x02\x02\u0135\u0136\x07e\x02\x02\u0136\u0137\x07", "q\x02\x02\u0137\u0138\x07p\x02\x02\u0138\u0139\x07f\x02", "\x02\u0139^\x03\x02\x02\x02\u013A\u013B\x07{\x02\x02", "\u013B\u013C\x07g\x02\x02\u013C\u013D\x07c\x02\x02\u013D", "\u013E\x07t\x02\x02\u013E\u013F\x07u\x02\x02\u013F`\x03", "\x02\x02\x02\u0140\u0141\x07o\x02\x02\u0141\u0142\x07", "q\x02\x02\u0142\u0143\x07p\x02\x02\u0143\u0144\x07v\x02", "\x02\u0144\u0145\x07j\x02\x02\u0145\u0146\x07u\x02\x02", "\u0146b\x03\x02\x02\x02\u0147\u0148\x07y\x02\x02\u0148", "\u0149\x07g\x02\x02\u0149\u014A\x07g\x02\x02\u014A\u014B", "\x07m\x02\x02\u014B\u014C\x07u\x02\x02\u014Cd\x03\x02", "\x02\x02\u014D\u014E\x07f\x02\x02\u014E\u014F\x07c\x02", "\x02\u014F\u0150\x07{\x02\x02\u0150\u0151\x07u\x02\x02", "\u0151f\x03\x02\x02\x02\u0152\u0153\x07j\x02\x02\u0153", "\u0154\x07q\x02\x02\u0154\u0155\x07w\x02\x02\u0155\u0156", "\x07t\x02\x02\u0156\u0157\x07u\x02\x02\u0157h\x03\x02", "\x02\x02\u0158\u0159\x07o\x02\x02\u0159\u015A\x07k\x02", "\x02\u015A\u015B\x07p\x02\x02\u015B\u015C\x07w\x02\x02", "\u015C\u015D\x07v\x02\x02\u015D\u015E\x07g\x02\x02\u015E", "\u015F\x07u\x02\x02\u015Fj\x03\x02\x02\x02\u0160\u0161", "\x07u\x02\x02\u0161\u0162\x07g\x02\x02\u0162\u0163\x07", "e\x02\x02\u0163\u0164\x07q\x02\x02\u0164\u0165\x07p\x02", "\x02\u0165\u0166\x07f\x02\x02\u0166\u0167\x07u\x02\x02", "\u0167l\x03\x02\x02\x02\u0168\u0169\x07o\x02\x02\u0169", "\u016A\x07k\x02\x02\u016A\u016B\x07n\x02\x02\u016B\u016C", "\x07n\x02\x02\u016C\u016D\x07k\x02\x02\u016D\u016E\x07", "u\x02\x02\u016E\u016F\x07g\x02\x02\u016F\u0170\x07e\x02", "\x02\u0170\u0171\x07q\x02\x02\u0171\u0172\x07p\x02\x02", "\u0172\u0173\x07f\x02\x02\u0173\u0174\x07u\x02\x02\u0174", "n\x03\x02\x02\x02\u0175\u0176\x07B\x02\x02\u0176\u0177", "\t\x02\x02\x02\u0177\u0178\t\x02\x02\x02\u0178\u0179\t\x02", "\x02\x02\u0179\u0186\t\x02\x02\x02\u017A\u017B\x07/\x02", "\x02\u017B\u017C\t\x02\x02\x02\u017C\u0184\t\x02\x02\x02", "\u017D\u017E\x07/\x02\x02\u017E\u017F\t\x02\x02\x02\u017F", "\u0182\t\x02\x02\x02\u0180\u0181\x07V\x02\x02\u0181\u0183", "\x05s:\x02\u0182\u0180\x03\x02\x02\x02\u0182\u0183\x03", "\x02\x02\x02\u0183\u0185\x03\x02\x02\x02\u0184\u017D\x03", "\x02\x02\x02\u0184\u0185\x03\x02\x02\x02\u0185\u0187\x03", "\x02\x02\x02\u0186\u017A\x03\x02\x02\x02\u0186\u0187\x03", "\x02\x02\x02\u0187\u0189\x03\x02\x02\x02\u0188\u018A\x07", "\\\x02\x02\u0189\u0188\x03\x02\x02\x02\u0189\u018A\x03", "\x02\x02\x02\u018Ap\x03\x02\x02\x02\u018B\u018C\x07", "B\x02\x02\u018C\u018D\x07V\x02\x02\u018D\u018E\x05s:\x02", "\u018Er\x03\x02\x02\x02\u018F\u0190\t\x02\x02\x02\u0190", "\u01A1\t\x02\x02\x02\u0191\u0192\x07<\x02\x02\u0192\u0193", "\t\x02\x02\x02\u0193\u019F\t\x02\x02\x02\u0194\u0195\x07", "<\x02\x02\u0195\u0196\t\x02\x02\x02\u0196\u019D\t\x02\x02", "\x02\u0197\u0199\x070\x02\x02\u0198\u019A\t\x02\x02\x02", "\u0199\u0198\x03\x02\x02\x02\u019A\u019B\x03\x02\x02\x02", "\u019B\u0199\x03\x02\x02\x02\u019B\u019C\x03\x02\x02\x02", "\u019C\u019E\x03\x02\x02\x02\u019D\u0197\x03\x02\x02\x02", "\u019D\u019E\x03\x02\x02\x02\u019E\u01A0\x03\x02\x02\x02", "\u019F\u0194\x03\x02\x02\x02\u019F\u01A0\x03\x02\x02\x02", "\u01A0\u01A2\x03\x02\x02\x02\u01A1\u0191\x03\x02\x02\x02", "\u01A1\u01A2\x03\x02\x02\x02\u01A2\u01AA\x03\x02\x02\x02", "\u01A3\u01AB\x07\\\x02\x02\u01A4\u01A5\t\x03\x02\x02\u01A5", "\u01A6\t\x02\x02\x02\u01A6\u01A7\t\x02\x02\x02\u01A7\u01A8", "\x07<\x02\x02\u01A8\u01A9\t\x02\x02\x02\u01A9\u01AB\t\x02", "\x02\x02\u01AA\u01A3\x03\x02\x02\x02\u01AA\u01A4\x03\x02", "\x02\x02\u01AA\u01AB\x03\x02\x02\x02\u01ABt\x03\x02", "\x02\x02\u01AC\u01AE\t\x04\x02\x02\u01AD\u01AC\x03\x02", "\x02\x02\u01AE\u01B2\x03\x02\x02\x02\u01AF\u01B1\t\x05", "\x02\x02\u01B0\u01AF\x03\x02\x02\x02\u01B1\u01B4\x03\x02", "\x02\x02\u01B2\u01B0\x03\x02\x02\x02\u01B2\u01B3\x03\x02", "\x02\x02\u01B3v\x03\x02\x02\x02\u01B4\u01B2\x03\x02", "\x02\x02\u01B5\u01BA\x07b\x02\x02\u01B6\u01B9\x05\x83", "B\x02\u01B7\u01B9\n\x06\x02\x02\u01B8\u01B6\x03\x02\x02", "\x02\u01B8\u01B7\x03\x02\x02\x02\u01B9\u01BC\x03\x02\x02", "\x02\u01BA\u01B8\x03\x02\x02\x02\u01BA\u01BB\x03\x02\x02", "\x02\u01BB\u01BD\x03\x02\x02\x02\u01BC\u01BA\x03\x02\x02", "\x02\u01BD\u01BE\x07b\x02\x02\u01BEx\x03\x02\x02\x02", "\u01BF\u01C4\x07)\x02\x02\u01C0\u01C3\x05\x83B\x02\u01C1", "\u01C3\n\x07\x02\x02\u01C2\u01C0\x03\x02\x02\x02\u01C2", "\u01C1\x03\x02\x02\x02\u01C3\u01C6\x03\x02\x02\x02\u01C4", "\u01C2\x03\x02\x02\x02\u01C4\u01C5\x03\x02\x02\x02\u01C5", "\u01C7\x03\x02\x02\x02\u01C6\u01C4\x03\x02\x02\x02\u01C7", "\u01C8\x07)\x02\x02\u01C8z\x03\x02\x02\x02\u01C9\u01CB", "\t\x02\x02\x02\u01CA\u01C9\x03\x02\x02\x02\u01CB\u01CC", "\x03\x02\x02\x02\u01CC\u01CA\x03\x02\x02\x02\u01CC\u01CD", "\x03\x02\x02\x02\u01CD\u01D4\x03\x02\x02\x02\u01CE\u01D0", "\x070\x02\x02\u01CF\u01D1\t\x02\x02\x02\u01D0\u01CF\x03", "\x02\x02\x02\u01D1\u01D2\x03\x02\x02\x02\u01D2\u01D0\x03", "\x02\x02\x02\u01D2\u01D3\x03\x02\x02\x02\u01D3\u01D5\x03", "\x02\x02\x02\u01D4\u01CE\x03\x02\x02\x02\u01D4\u01D5\x03", "\x02\x02\x02\u01D5|\x03\x02\x02\x02\u01D6\u01D8\t\b\x02", "\x02\u01D7\u01D6\x03\x02\x02\x02\u01D8\u01D9\x03\x02\x02", "\x02\u01D9\u01D7\x03\x02\x02\x02\u01D9\u01DA\x03\x02\x02", "\x02\u01DA\u01DB\x03\x02\x02\x02\u01DB\u01DC\b?\x02\x02", "\u01DC~\x03\x02\x02\x02\u01DD\u01DE\x071\x02\x02\u01DE", "\u01DF\x07,\x02\x02\u01DF\u01E3\x03\x02\x02\x02\u01E0", "\u01E2\x0B\x02\x02\x02\u01E1\u01E0\x03\x02\x02\x02\u01E2", "\u01E5\x03\x02\x02\x02\u01E3\u01E4\x03\x02\x02\x02\u01E3", "\u01E1\x03\x02\x02\x02\u01E4\u01E6\x03\x02\x02\x02\u01E5", "\u01E3\x03\x02\x02\x02\u01E6\u01E7\x07,\x02\x02\u01E7", "\u01E8\x071\x02\x02\u01E8\u01E9\x03\x02\x02\x02\u01E9", "\u01EA\b@\x02\x02\u01EA\x80\x03\x02\x02\x02\u01EB\u01EC", "\x071\x02\x02\u01EC\u01ED\x071\x02\x02\u01ED\u01F1\x03", "\x02\x02\x02\u01EE\u01F0\n\t\x02\x02\u01EF\u01EE\x03\x02", "\x02\x02\u01F0\u01F3\x03\x02\x02\x02\u01F1\u01EF\x03\x02", "\x02\x02\u01F1\u01F2\x03\x02\x02\x02\u01F2\u01F4\x03\x02", "\x02\x02\u01F3\u01F1\x03\x02\x02\x02\u01F4\u01F5\bA\x02", "\x02\u01F5\x82\x03\x02\x02\x02\u01F6\u01F9\x07^\x02", "\x02\u01F7\u01FA\t\n\x02\x02\u01F8\u01FA\x05\x85C\x02\u01F9", "\u01F7\x03\x02\x02\x02\u01F9\u01F8\x03\x02\x02\x02\u01FA", "\x84\x03\x02\x02\x02\u01FB\u01FC\x07w\x02\x02\u01FC", "\u01FD\x05\x87D\x02\u01FD\u01FE\x05\x87D\x02\u01FE\u01FF", "\x05\x87D\x02\u01FF\u0200\x05\x87D\x02\u0200\x86\x03", "\x02\x02\x02\u0201\u0202\t\x0B\x02\x02\u0202\x88\x03", "\x02\x02\x02\x1A\x02\u0182\u0184\u0186\u0189\u019B\u019D\u019F", "\u01A1\u01AA\u01AD\u01B0\u01B2\u01B8\u01BA\u01C2\u01C4\u01CC\u01D2\u01D4", "\u01D9\u01E3\u01F1\u01F9\x03\x02\x03\x02"].join("");
var atn = new antlr4.atn.ATNDeserializer().deserialize(serializedATN);
var decisionsToDFA = atn.decisionToState.map(function (ds, index) {
  return new antlr4.dfa.DFA(ds, index);
});

function FHIRPathLexer(input) {
  antlr4.Lexer.call(this, input);
  this._interp = new antlr4.atn.LexerATNSimulator(this, atn, decisionsToDFA, new antlr4.PredictionContextCache());
  return this;
}

FHIRPathLexer.prototype = Object.create(antlr4.Lexer.prototype);
FHIRPathLexer.prototype.constructor = FHIRPathLexer;
Object.defineProperty(FHIRPathLexer.prototype, "atn", {
  get: function get() {
    return atn;
  }
});
FHIRPathLexer.EOF = antlr4.Token.EOF;
FHIRPathLexer.T__0 = 1;
FHIRPathLexer.T__1 = 2;
FHIRPathLexer.T__2 = 3;
FHIRPathLexer.T__3 = 4;
FHIRPathLexer.T__4 = 5;
FHIRPathLexer.T__5 = 6;
FHIRPathLexer.T__6 = 7;
FHIRPathLexer.T__7 = 8;
FHIRPathLexer.T__8 = 9;
FHIRPathLexer.T__9 = 10;
FHIRPathLexer.T__10 = 11;
FHIRPathLexer.T__11 = 12;
FHIRPathLexer.T__12 = 13;
FHIRPathLexer.T__13 = 14;
FHIRPathLexer.T__14 = 15;
FHIRPathLexer.T__15 = 16;
FHIRPathLexer.T__16 = 17;
FHIRPathLexer.T__17 = 18;
FHIRPathLexer.T__18 = 19;
FHIRPathLexer.T__19 = 20;
FHIRPathLexer.T__20 = 21;
FHIRPathLexer.T__21 = 22;
FHIRPathLexer.T__22 = 23;
FHIRPathLexer.T__23 = 24;
FHIRPathLexer.T__24 = 25;
FHIRPathLexer.T__25 = 26;
FHIRPathLexer.T__26 = 27;
FHIRPathLexer.T__27 = 28;
FHIRPathLexer.T__28 = 29;
FHIRPathLexer.T__29 = 30;
FHIRPathLexer.T__30 = 31;
FHIRPathLexer.T__31 = 32;
FHIRPathLexer.T__32 = 33;
FHIRPathLexer.T__33 = 34;
FHIRPathLexer.T__34 = 35;
FHIRPathLexer.T__35 = 36;
FHIRPathLexer.T__36 = 37;
FHIRPathLexer.T__37 = 38;
FHIRPathLexer.T__38 = 39;
FHIRPathLexer.T__39 = 40;
FHIRPathLexer.T__40 = 41;
FHIRPathLexer.T__41 = 42;
FHIRPathLexer.T__42 = 43;
FHIRPathLexer.T__43 = 44;
FHIRPathLexer.T__44 = 45;
FHIRPathLexer.T__45 = 46;
FHIRPathLexer.T__46 = 47;
FHIRPathLexer.T__47 = 48;
FHIRPathLexer.T__48 = 49;
FHIRPathLexer.T__49 = 50;
FHIRPathLexer.T__50 = 51;
FHIRPathLexer.T__51 = 52;
FHIRPathLexer.T__52 = 53;
FHIRPathLexer.T__53 = 54;
FHIRPathLexer.DATETIME = 55;
FHIRPathLexer.TIME = 56;
FHIRPathLexer.IDENTIFIER = 57;
FHIRPathLexer.DELIMITEDIDENTIFIER = 58;
FHIRPathLexer.STRING = 59;
FHIRPathLexer.NUMBER = 60;
FHIRPathLexer.WS = 61;
FHIRPathLexer.COMMENT = 62;
FHIRPathLexer.LINE_COMMENT = 63;
FHIRPathLexer.prototype.channelNames = ["DEFAULT_TOKEN_CHANNEL", "HIDDEN"];
FHIRPathLexer.prototype.modeNames = ["DEFAULT_MODE"];
FHIRPathLexer.prototype.literalNames = [null, "'.'", "'['", "']'", "'+'", "'-'", "'*'", "'/'", "'div'", "'mod'", "'&'", "'|'", "'<='", "'<'", "'>'", "'>='", "'is'", "'as'", "'='", "'~'", "'!='", "'!~'", "'in'", "'contains'", "'and'", "'or'", "'xor'", "'implies'", "'('", "')'", "'{'", "'}'", "'true'", "'false'", "'%'", "'$this'", "'$index'", "'$total'", "','", "'year'", "'month'", "'week'", "'day'", "'hour'", "'minute'", "'second'", "'millisecond'", "'years'", "'months'", "'weeks'", "'days'", "'hours'", "'minutes'", "'seconds'", "'milliseconds'"];
FHIRPathLexer.prototype.symbolicNames = [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, "DATETIME", "TIME", "IDENTIFIER", "DELIMITEDIDENTIFIER", "STRING", "NUMBER", "WS", "COMMENT", "LINE_COMMENT"];
FHIRPathLexer.prototype.ruleNames = ["T__0", "T__1", "T__2", "T__3", "T__4", "T__5", "T__6", "T__7", "T__8", "T__9", "T__10", "T__11", "T__12", "T__13", "T__14", "T__15", "T__16", "T__17", "T__18", "T__19", "T__20", "T__21", "T__22", "T__23", "T__24", "T__25", "T__26", "T__27", "T__28", "T__29", "T__30", "T__31", "T__32", "T__33", "T__34", "T__35", "T__36", "T__37", "T__38", "T__39", "T__40", "T__41", "T__42", "T__43", "T__44", "T__45", "T__46", "T__47", "T__48", "T__49", "T__50", "T__51", "T__52", "T__53", "DATETIME", "TIME", "TIMEFORMAT", "IDENTIFIER", "DELIMITEDIDENTIFIER", "STRING", "NUMBER", "WS", "COMMENT", "LINE_COMMENT", "ESC", "UNICODE", "HEX"];
FHIRPathLexer.prototype.grammarFileName = "FHIRPath.g4";
exports.FHIRPathLexer = FHIRPathLexer;

/***/ }),
/* 50 */
/***/ (function(module, exports, __webpack_require__) {

// Generated from FHIRPath.g4 by ANTLR 4.7.1
// jshint ignore: start
var antlr4 = __webpack_require__(4);

var FHIRPathListener = __webpack_require__(51).FHIRPathListener;

var grammarFileName = "FHIRPath.g4";
var serializedATN = ["\x03\u608B\uA72A\u8133\uB9ED\u417C\u3BE7\u7786\u5964", "\x03A\x9C\x04\x02\t\x02\x04\x03\t\x03\x04\x04\t", "\x04\x04\x05\t\x05\x04\x06\t\x06\x04\x07\t\x07\x04", "\b\t\b\x04\t\t\t\x04\n\t\n\x04\x0B\t\x0B\x04\f\t\f\x04", "\r\t\r\x04\x0E\t\x0E\x04\x0F\t\x0F\x04\x10\t\x10\x03", "\x02\x03\x02\x03\x02\x03\x03\x03\x03\x03\x03\x03", "\x03\x05\x03(\n\x03\x03\x03\x03\x03\x03\x03\x03", "\x03\x03\x03\x03\x03\x03\x03\x03\x03\x03\x03\x03", "\x03\x03\x03\x03\x03\x03\x03\x03\x03\x03\x03\x03", "\x03\x03\x03\x03\x03\x03\x03\x03\x03\x03\x03\x03", "\x03\x03\x03\x03\x03\x03\x03\x03\x03\x03\x03\x03", "\x03\x03\x03\x03\x03\x03\x03\x03\x03\x03\x03\x03", "\x03\x03\x03\x03\x03\x03\x03\x03\x03\x07\x03P", "\n\x03\f\x03\x0E\x03S\x0B\x03\x03\x04\x03\x04\x03", "\x04\x03\x04\x03\x04\x03\x04\x03\x04\x05\x04\\", "\n\x04\x03\x05\x03\x05\x03\x05\x03\x05\x03\x05", "\x03\x05\x03\x05\x03\x05\x05\x05f\n\x05\x03\x06", "\x03\x06\x03\x06\x05\x06k\n\x06\x03\x07\x03\x07", "\x03\x07\x03\x07\x03\x07\x05\x07r\n\x07\x03\b\x03", "\b\x03\b\x05\bw\n\b\x03\b\x03\b\x03\t\x03\t\x03\t\x07", "\t~\n\t\f\t\x0E\t\x81\x0B\t\x03\n\x03\n\x05\n\x85\n\n", "\x03\x0B\x03\x0B\x03\x0B\x05\x0B\x8A\n\x0B\x03", "\f\x03\f\x03\r\x03\r\x03\x0E\x03\x0E\x03\x0F\x03", "\x0F\x03\x0F\x07\x0F\x95\n\x0F\f\x0F\x0E\x0F\x98", "\x0B\x0F\x03\x10\x03\x10\x03\x10\x02\x03\x04\x11", "\x02\x04\x06\b\n\f\x0E\x10\x12\x14\x16\x18\x1A\x1C", "\x1E\x02\x0E\x03\x02\x06\x07\x03\x02\b\x0B\x04", "\x02\x06\x07\f\f\x03\x02\x0E\x11\x03\x02\x14\x17", "\x03\x02\x18\x19\x03\x02\x1B\x1C\x03\x02\x12\x13", "\x03\x02\"#\x03\x02)0\x03\x0218\x05\x02\x12\x13", "\x18\x19;<\x02\xAD\x02 \x03\x02\x02\x02\x04'\x03", "\x02\x02\x02\x06[\x03\x02\x02\x02\be\x03\x02\x02", "\x02\ng\x03\x02\x02\x02\fq\x03\x02\x02\x02\x0Es", "\x03\x02\x02\x02\x10z\x03\x02\x02\x02\x12\x82", "\x03\x02\x02\x02\x14\x89\x03\x02\x02\x02\x16\x8B", "\x03\x02\x02\x02\x18\x8D\x03\x02\x02\x02\x1A\x8F", "\x03\x02\x02\x02\x1C\x91\x03\x02\x02\x02\x1E\x99", "\x03\x02\x02\x02 !\x05\x04\x03\x02!\"\x07\x02\x02", "\x03\"\x03\x03\x02\x02\x02#$\b\x03\x01\x02$(\x05", "\x06\x04\x02%&\t\x02\x02\x02&(\x05\x04\x03\r'#\x03", "\x02\x02\x02'%\x03\x02\x02\x02(Q\x03\x02\x02\x02", ")*\f\f\x02\x02*+\t\x03\x02\x02+P\x05\x04\x03\r,-\f\x0B", "\x02\x02-.\t\x04\x02\x02.P\x05\x04\x03\f/0\f\n\x02", "\x0201\x07\r\x02\x021P\x05\x04\x03\x0B23\f\t\x02\x02", "34\t\x05\x02\x024P\x05\x04\x03\n56\f\x07\x02\x026", "7\t\x06\x02\x027P\x05\x04\x03\b89\f\x06\x02\x029:", "\t\x07\x02\x02:P\x05\x04\x03\x07;<\f\x05\x02\x02", "<=\x07\x1A\x02\x02=P\x05\x04\x03\x06>?\f\x04\x02", "\x02?@\t\b\x02\x02@P\x05\x04\x03\x05AB\f\x03\x02\x02", "BC\x07\x1D\x02\x02CP\x05\x04\x03\x04DE\f\x0F\x02", "\x02EF\x07\x03\x02\x02FP\x05\f\x07\x02GH\f\x0E\x02", "\x02HI\x07\x04\x02\x02IJ\x05\x04\x03\x02JK\x07\x05", "\x02\x02KP\x03\x02\x02\x02LM\f\b\x02\x02MN\t\t\x02", "\x02NP\x05\x1A\x0E\x02O)\x03\x02\x02\x02O,\x03\x02", "\x02\x02O/\x03\x02\x02\x02O2\x03\x02\x02\x02O5\x03", "\x02\x02\x02O8\x03\x02\x02\x02O;\x03\x02\x02\x02", "O>\x03\x02\x02\x02OA\x03\x02\x02\x02OD\x03\x02\x02", "\x02OG\x03\x02\x02\x02OL\x03\x02\x02\x02PS\x03\x02", "\x02\x02QO\x03\x02\x02\x02QR\x03\x02\x02\x02R\x05", "\x03\x02\x02\x02SQ\x03\x02\x02\x02T\\\x05\f\x07", "\x02U\\\x05\b\x05\x02V\\\x05\n\x06\x02WX\x07\x1E\x02", "\x02XY\x05\x04\x03\x02YZ\x07\x1F\x02\x02Z\\\x03", "\x02\x02\x02[T\x03\x02\x02\x02[U\x03\x02\x02\x02", "[V\x03\x02\x02\x02[W\x03\x02\x02\x02\\\x07\x03\x02", "\x02\x02]^\x07 \x02\x02^f\x07!\x02\x02_f\t\n\x02\x02", "`f\x07=\x02\x02af\x07>\x02\x02bf\x079\x02\x02cf\x07", ":\x02\x02df\x05\x12\n\x02e]\x03\x02\x02\x02e_\x03", "\x02\x02\x02e`\x03\x02\x02\x02ea\x03\x02\x02\x02", "eb\x03\x02\x02\x02ec\x03\x02\x02\x02ed\x03\x02\x02", "\x02f\t\x03\x02\x02\x02gj\x07$\x02\x02hk\x05\x1E", "\x10\x02ik\x07=\x02\x02jh\x03\x02\x02\x02ji\x03", "\x02\x02\x02k\x0B\x03\x02\x02\x02lr\x05\x1E\x10", "\x02mr\x05\x0E\b\x02nr\x07%\x02\x02or\x07&\x02\x02", "pr\x07'\x02\x02ql\x03\x02\x02\x02qm\x03\x02\x02", "\x02qn\x03\x02\x02\x02qo\x03\x02\x02\x02qp\x03\x02", "\x02\x02r\r\x03\x02\x02\x02st\x05\x1E\x10\x02tv", "\x07\x1E\x02\x02uw\x05\x10\t\x02vu\x03\x02\x02\x02", "vw\x03\x02\x02\x02wx\x03\x02\x02\x02xy\x07\x1F\x02", "\x02y\x0F\x03\x02\x02\x02z\x7F\x05\x04\x03\x02", "{|\x07(\x02\x02|~\x05\x04\x03\x02}{\x03\x02\x02", "\x02~\x81\x03\x02\x02\x02\x7F}\x03\x02\x02\x02", "\x7F\x80\x03\x02\x02\x02\x80\x11\x03\x02\x02\x02", "\x81\x7F\x03\x02\x02\x02\x82\x84\x07>\x02\x02", "\x83\x85\x05\x14\x0B\x02\x84\x83\x03\x02\x02\x02", "\x84\x85\x03\x02\x02\x02\x85\x13\x03\x02\x02\x02", "\x86\x8A\x05\x16\f\x02\x87\x8A\x05\x18\r\x02\x88", "\x8A\x07=\x02\x02\x89\x86\x03\x02\x02\x02\x89", "\x87\x03\x02\x02\x02\x89\x88\x03\x02\x02\x02\x8A", "\x15\x03\x02\x02\x02\x8B\x8C\t\x0B\x02\x02\x8C", "\x17\x03\x02\x02\x02\x8D\x8E\t\f\x02\x02\x8E\x19", "\x03\x02\x02\x02\x8F\x90\x05\x1C\x0F\x02\x90\x1B", "\x03\x02\x02\x02\x91\x96\x05\x1E\x10\x02\x92\x93", "\x07\x03\x02\x02\x93\x95\x05\x1E\x10\x02\x94\x92", "\x03\x02\x02\x02\x95\x98\x03\x02\x02\x02\x96\x94", "\x03\x02\x02\x02\x96\x97\x03\x02\x02\x02\x97\x1D", "\x03\x02\x02\x02\x98\x96\x03\x02\x02\x02\x99\x9A", "\t\r\x02\x02\x9A\x1F\x03\x02\x02\x02\x0E'OQ[ejqv", "\x7F\x84\x89\x96"].join("");
var atn = new antlr4.atn.ATNDeserializer().deserialize(serializedATN);
var decisionsToDFA = atn.decisionToState.map(function (ds, index) {
  return new antlr4.dfa.DFA(ds, index);
});
var sharedContextCache = new antlr4.PredictionContextCache();
var literalNames = [null, "'.'", "'['", "']'", "'+'", "'-'", "'*'", "'/'", "'div'", "'mod'", "'&'", "'|'", "'<='", "'<'", "'>'", "'>='", "'is'", "'as'", "'='", "'~'", "'!='", "'!~'", "'in'", "'contains'", "'and'", "'or'", "'xor'", "'implies'", "'('", "')'", "'{'", "'}'", "'true'", "'false'", "'%'", "'$this'", "'$index'", "'$total'", "','", "'year'", "'month'", "'week'", "'day'", "'hour'", "'minute'", "'second'", "'millisecond'", "'years'", "'months'", "'weeks'", "'days'", "'hours'", "'minutes'", "'seconds'", "'milliseconds'"];
var symbolicNames = [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, "DATETIME", "TIME", "IDENTIFIER", "DELIMITEDIDENTIFIER", "STRING", "NUMBER", "WS", "COMMENT", "LINE_COMMENT"];
var ruleNames = ["entireExpression", "expression", "term", "literal", "externalConstant", "invocation", "functn", "paramList", "quantity", "unit", "dateTimePrecision", "pluralDateTimePrecision", "typeSpecifier", "qualifiedIdentifier", "identifier"];

function FHIRPathParser(input) {
  antlr4.Parser.call(this, input);
  this._interp = new antlr4.atn.ParserATNSimulator(this, atn, decisionsToDFA, sharedContextCache);
  this.ruleNames = ruleNames;
  this.literalNames = literalNames;
  this.symbolicNames = symbolicNames;
  return this;
}

FHIRPathParser.prototype = Object.create(antlr4.Parser.prototype);
FHIRPathParser.prototype.constructor = FHIRPathParser;
Object.defineProperty(FHIRPathParser.prototype, "atn", {
  get: function get() {
    return atn;
  }
});
FHIRPathParser.EOF = antlr4.Token.EOF;
FHIRPathParser.T__0 = 1;
FHIRPathParser.T__1 = 2;
FHIRPathParser.T__2 = 3;
FHIRPathParser.T__3 = 4;
FHIRPathParser.T__4 = 5;
FHIRPathParser.T__5 = 6;
FHIRPathParser.T__6 = 7;
FHIRPathParser.T__7 = 8;
FHIRPathParser.T__8 = 9;
FHIRPathParser.T__9 = 10;
FHIRPathParser.T__10 = 11;
FHIRPathParser.T__11 = 12;
FHIRPathParser.T__12 = 13;
FHIRPathParser.T__13 = 14;
FHIRPathParser.T__14 = 15;
FHIRPathParser.T__15 = 16;
FHIRPathParser.T__16 = 17;
FHIRPathParser.T__17 = 18;
FHIRPathParser.T__18 = 19;
FHIRPathParser.T__19 = 20;
FHIRPathParser.T__20 = 21;
FHIRPathParser.T__21 = 22;
FHIRPathParser.T__22 = 23;
FHIRPathParser.T__23 = 24;
FHIRPathParser.T__24 = 25;
FHIRPathParser.T__25 = 26;
FHIRPathParser.T__26 = 27;
FHIRPathParser.T__27 = 28;
FHIRPathParser.T__28 = 29;
FHIRPathParser.T__29 = 30;
FHIRPathParser.T__30 = 31;
FHIRPathParser.T__31 = 32;
FHIRPathParser.T__32 = 33;
FHIRPathParser.T__33 = 34;
FHIRPathParser.T__34 = 35;
FHIRPathParser.T__35 = 36;
FHIRPathParser.T__36 = 37;
FHIRPathParser.T__37 = 38;
FHIRPathParser.T__38 = 39;
FHIRPathParser.T__39 = 40;
FHIRPathParser.T__40 = 41;
FHIRPathParser.T__41 = 42;
FHIRPathParser.T__42 = 43;
FHIRPathParser.T__43 = 44;
FHIRPathParser.T__44 = 45;
FHIRPathParser.T__45 = 46;
FHIRPathParser.T__46 = 47;
FHIRPathParser.T__47 = 48;
FHIRPathParser.T__48 = 49;
FHIRPathParser.T__49 = 50;
FHIRPathParser.T__50 = 51;
FHIRPathParser.T__51 = 52;
FHIRPathParser.T__52 = 53;
FHIRPathParser.T__53 = 54;
FHIRPathParser.DATETIME = 55;
FHIRPathParser.TIME = 56;
FHIRPathParser.IDENTIFIER = 57;
FHIRPathParser.DELIMITEDIDENTIFIER = 58;
FHIRPathParser.STRING = 59;
FHIRPathParser.NUMBER = 60;
FHIRPathParser.WS = 61;
FHIRPathParser.COMMENT = 62;
FHIRPathParser.LINE_COMMENT = 63;
FHIRPathParser.RULE_entireExpression = 0;
FHIRPathParser.RULE_expression = 1;
FHIRPathParser.RULE_term = 2;
FHIRPathParser.RULE_literal = 3;
FHIRPathParser.RULE_externalConstant = 4;
FHIRPathParser.RULE_invocation = 5;
FHIRPathParser.RULE_functn = 6;
FHIRPathParser.RULE_paramList = 7;
FHIRPathParser.RULE_quantity = 8;
FHIRPathParser.RULE_unit = 9;
FHIRPathParser.RULE_dateTimePrecision = 10;
FHIRPathParser.RULE_pluralDateTimePrecision = 11;
FHIRPathParser.RULE_typeSpecifier = 12;
FHIRPathParser.RULE_qualifiedIdentifier = 13;
FHIRPathParser.RULE_identifier = 14;

function EntireExpressionContext(parser, parent, invokingState) {
  if (parent === undefined) {
    parent = null;
  }

  if (invokingState === undefined || invokingState === null) {
    invokingState = -1;
  }

  antlr4.ParserRuleContext.call(this, parent, invokingState);
  this.parser = parser;
  this.ruleIndex = FHIRPathParser.RULE_entireExpression;
  return this;
}

EntireExpressionContext.prototype = Object.create(antlr4.ParserRuleContext.prototype);
EntireExpressionContext.prototype.constructor = EntireExpressionContext;

EntireExpressionContext.prototype.expression = function () {
  return this.getTypedRuleContext(ExpressionContext, 0);
};

EntireExpressionContext.prototype.EOF = function () {
  return this.getToken(FHIRPathParser.EOF, 0);
};

EntireExpressionContext.prototype.enterRule = function (listener) {
  if (listener instanceof FHIRPathListener) {
    listener.enterEntireExpression(this);
  }
};

EntireExpressionContext.prototype.exitRule = function (listener) {
  if (listener instanceof FHIRPathListener) {
    listener.exitEntireExpression(this);
  }
};

FHIRPathParser.EntireExpressionContext = EntireExpressionContext;

FHIRPathParser.prototype.entireExpression = function () {
  var localctx = new EntireExpressionContext(this, this._ctx, this.state);
  this.enterRule(localctx, 0, FHIRPathParser.RULE_entireExpression);

  try {
    this.enterOuterAlt(localctx, 1);
    this.state = 30;
    this.expression(0);
    this.state = 31;
    this.match(FHIRPathParser.EOF);
  } catch (re) {
    if (re instanceof antlr4.error.RecognitionException) {
      localctx.exception = re;

      this._errHandler.reportError(this, re);

      this._errHandler.recover(this, re);
    } else {
      throw re;
    }
  } finally {
    this.exitRule();
  }

  return localctx;
};

function ExpressionContext(parser, parent, invokingState) {
  if (parent === undefined) {
    parent = null;
  }

  if (invokingState === undefined || invokingState === null) {
    invokingState = -1;
  }

  antlr4.ParserRuleContext.call(this, parent, invokingState);
  this.parser = parser;
  this.ruleIndex = FHIRPathParser.RULE_expression;
  return this;
}

ExpressionContext.prototype = Object.create(antlr4.ParserRuleContext.prototype);
ExpressionContext.prototype.constructor = ExpressionContext;

ExpressionContext.prototype.copyFrom = function (ctx) {
  antlr4.ParserRuleContext.prototype.copyFrom.call(this, ctx);
};

function IndexerExpressionContext(parser, ctx) {
  ExpressionContext.call(this, parser);
  ExpressionContext.prototype.copyFrom.call(this, ctx);
  return this;
}

IndexerExpressionContext.prototype = Object.create(ExpressionContext.prototype);
IndexerExpressionContext.prototype.constructor = IndexerExpressionContext;
FHIRPathParser.IndexerExpressionContext = IndexerExpressionContext;

IndexerExpressionContext.prototype.expression = function (i) {
  if (i === undefined) {
    i = null;
  }

  if (i === null) {
    return this.getTypedRuleContexts(ExpressionContext);
  } else {
    return this.getTypedRuleContext(ExpressionContext, i);
  }
};

IndexerExpressionContext.prototype.enterRule = function (listener) {
  if (listener instanceof FHIRPathListener) {
    listener.enterIndexerExpression(this);
  }
};

IndexerExpressionContext.prototype.exitRule = function (listener) {
  if (listener instanceof FHIRPathListener) {
    listener.exitIndexerExpression(this);
  }
};

function PolarityExpressionContext(parser, ctx) {
  ExpressionContext.call(this, parser);
  ExpressionContext.prototype.copyFrom.call(this, ctx);
  return this;
}

PolarityExpressionContext.prototype = Object.create(ExpressionContext.prototype);
PolarityExpressionContext.prototype.constructor = PolarityExpressionContext;
FHIRPathParser.PolarityExpressionContext = PolarityExpressionContext;

PolarityExpressionContext.prototype.expression = function () {
  return this.getTypedRuleContext(ExpressionContext, 0);
};

PolarityExpressionContext.prototype.enterRule = function (listener) {
  if (listener instanceof FHIRPathListener) {
    listener.enterPolarityExpression(this);
  }
};

PolarityExpressionContext.prototype.exitRule = function (listener) {
  if (listener instanceof FHIRPathListener) {
    listener.exitPolarityExpression(this);
  }
};

function AdditiveExpressionContext(parser, ctx) {
  ExpressionContext.call(this, parser);
  ExpressionContext.prototype.copyFrom.call(this, ctx);
  return this;
}

AdditiveExpressionContext.prototype = Object.create(ExpressionContext.prototype);
AdditiveExpressionContext.prototype.constructor = AdditiveExpressionContext;
FHIRPathParser.AdditiveExpressionContext = AdditiveExpressionContext;

AdditiveExpressionContext.prototype.expression = function (i) {
  if (i === undefined) {
    i = null;
  }

  if (i === null) {
    return this.getTypedRuleContexts(ExpressionContext);
  } else {
    return this.getTypedRuleContext(ExpressionContext, i);
  }
};

AdditiveExpressionContext.prototype.enterRule = function (listener) {
  if (listener instanceof FHIRPathListener) {
    listener.enterAdditiveExpression(this);
  }
};

AdditiveExpressionContext.prototype.exitRule = function (listener) {
  if (listener instanceof FHIRPathListener) {
    listener.exitAdditiveExpression(this);
  }
};

function MultiplicativeExpressionContext(parser, ctx) {
  ExpressionContext.call(this, parser);
  ExpressionContext.prototype.copyFrom.call(this, ctx);
  return this;
}

MultiplicativeExpressionContext.prototype = Object.create(ExpressionContext.prototype);
MultiplicativeExpressionContext.prototype.constructor = MultiplicativeExpressionContext;
FHIRPathParser.MultiplicativeExpressionContext = MultiplicativeExpressionContext;

MultiplicativeExpressionContext.prototype.expression = function (i) {
  if (i === undefined) {
    i = null;
  }

  if (i === null) {
    return this.getTypedRuleContexts(ExpressionContext);
  } else {
    return this.getTypedRuleContext(ExpressionContext, i);
  }
};

MultiplicativeExpressionContext.prototype.enterRule = function (listener) {
  if (listener instanceof FHIRPathListener) {
    listener.enterMultiplicativeExpression(this);
  }
};

MultiplicativeExpressionContext.prototype.exitRule = function (listener) {
  if (listener instanceof FHIRPathListener) {
    listener.exitMultiplicativeExpression(this);
  }
};

function UnionExpressionContext(parser, ctx) {
  ExpressionContext.call(this, parser);
  ExpressionContext.prototype.copyFrom.call(this, ctx);
  return this;
}

UnionExpressionContext.prototype = Object.create(ExpressionContext.prototype);
UnionExpressionContext.prototype.constructor = UnionExpressionContext;
FHIRPathParser.UnionExpressionContext = UnionExpressionContext;

UnionExpressionContext.prototype.expression = function (i) {
  if (i === undefined) {
    i = null;
  }

  if (i === null) {
    return this.getTypedRuleContexts(ExpressionContext);
  } else {
    return this.getTypedRuleContext(ExpressionContext, i);
  }
};

UnionExpressionContext.prototype.enterRule = function (listener) {
  if (listener instanceof FHIRPathListener) {
    listener.enterUnionExpression(this);
  }
};

UnionExpressionContext.prototype.exitRule = function (listener) {
  if (listener instanceof FHIRPathListener) {
    listener.exitUnionExpression(this);
  }
};

function OrExpressionContext(parser, ctx) {
  ExpressionContext.call(this, parser);
  ExpressionContext.prototype.copyFrom.call(this, ctx);
  return this;
}

OrExpressionContext.prototype = Object.create(ExpressionContext.prototype);
OrExpressionContext.prototype.constructor = OrExpressionContext;
FHIRPathParser.OrExpressionContext = OrExpressionContext;

OrExpressionContext.prototype.expression = function (i) {
  if (i === undefined) {
    i = null;
  }

  if (i === null) {
    return this.getTypedRuleContexts(ExpressionContext);
  } else {
    return this.getTypedRuleContext(ExpressionContext, i);
  }
};

OrExpressionContext.prototype.enterRule = function (listener) {
  if (listener instanceof FHIRPathListener) {
    listener.enterOrExpression(this);
  }
};

OrExpressionContext.prototype.exitRule = function (listener) {
  if (listener instanceof FHIRPathListener) {
    listener.exitOrExpression(this);
  }
};

function AndExpressionContext(parser, ctx) {
  ExpressionContext.call(this, parser);
  ExpressionContext.prototype.copyFrom.call(this, ctx);
  return this;
}

AndExpressionContext.prototype = Object.create(ExpressionContext.prototype);
AndExpressionContext.prototype.constructor = AndExpressionContext;
FHIRPathParser.AndExpressionContext = AndExpressionContext;

AndExpressionContext.prototype.expression = function (i) {
  if (i === undefined) {
    i = null;
  }

  if (i === null) {
    return this.getTypedRuleContexts(ExpressionContext);
  } else {
    return this.getTypedRuleContext(ExpressionContext, i);
  }
};

AndExpressionContext.prototype.enterRule = function (listener) {
  if (listener instanceof FHIRPathListener) {
    listener.enterAndExpression(this);
  }
};

AndExpressionContext.prototype.exitRule = function (listener) {
  if (listener instanceof FHIRPathListener) {
    listener.exitAndExpression(this);
  }
};

function MembershipExpressionContext(parser, ctx) {
  ExpressionContext.call(this, parser);
  ExpressionContext.prototype.copyFrom.call(this, ctx);
  return this;
}

MembershipExpressionContext.prototype = Object.create(ExpressionContext.prototype);
MembershipExpressionContext.prototype.constructor = MembershipExpressionContext;
FHIRPathParser.MembershipExpressionContext = MembershipExpressionContext;

MembershipExpressionContext.prototype.expression = function (i) {
  if (i === undefined) {
    i = null;
  }

  if (i === null) {
    return this.getTypedRuleContexts(ExpressionContext);
  } else {
    return this.getTypedRuleContext(ExpressionContext, i);
  }
};

MembershipExpressionContext.prototype.enterRule = function (listener) {
  if (listener instanceof FHIRPathListener) {
    listener.enterMembershipExpression(this);
  }
};

MembershipExpressionContext.prototype.exitRule = function (listener) {
  if (listener instanceof FHIRPathListener) {
    listener.exitMembershipExpression(this);
  }
};

function InequalityExpressionContext(parser, ctx) {
  ExpressionContext.call(this, parser);
  ExpressionContext.prototype.copyFrom.call(this, ctx);
  return this;
}

InequalityExpressionContext.prototype = Object.create(ExpressionContext.prototype);
InequalityExpressionContext.prototype.constructor = InequalityExpressionContext;
FHIRPathParser.InequalityExpressionContext = InequalityExpressionContext;

InequalityExpressionContext.prototype.expression = function (i) {
  if (i === undefined) {
    i = null;
  }

  if (i === null) {
    return this.getTypedRuleContexts(ExpressionContext);
  } else {
    return this.getTypedRuleContext(ExpressionContext, i);
  }
};

InequalityExpressionContext.prototype.enterRule = function (listener) {
  if (listener instanceof FHIRPathListener) {
    listener.enterInequalityExpression(this);
  }
};

InequalityExpressionContext.prototype.exitRule = function (listener) {
  if (listener instanceof FHIRPathListener) {
    listener.exitInequalityExpression(this);
  }
};

function InvocationExpressionContext(parser, ctx) {
  ExpressionContext.call(this, parser);
  ExpressionContext.prototype.copyFrom.call(this, ctx);
  return this;
}

InvocationExpressionContext.prototype = Object.create(ExpressionContext.prototype);
InvocationExpressionContext.prototype.constructor = InvocationExpressionContext;
FHIRPathParser.InvocationExpressionContext = InvocationExpressionContext;

InvocationExpressionContext.prototype.expression = function () {
  return this.getTypedRuleContext(ExpressionContext, 0);
};

InvocationExpressionContext.prototype.invocation = function () {
  return this.getTypedRuleContext(InvocationContext, 0);
};

InvocationExpressionContext.prototype.enterRule = function (listener) {
  if (listener instanceof FHIRPathListener) {
    listener.enterInvocationExpression(this);
  }
};

InvocationExpressionContext.prototype.exitRule = function (listener) {
  if (listener instanceof FHIRPathListener) {
    listener.exitInvocationExpression(this);
  }
};

function EqualityExpressionContext(parser, ctx) {
  ExpressionContext.call(this, parser);
  ExpressionContext.prototype.copyFrom.call(this, ctx);
  return this;
}

EqualityExpressionContext.prototype = Object.create(ExpressionContext.prototype);
EqualityExpressionContext.prototype.constructor = EqualityExpressionContext;
FHIRPathParser.EqualityExpressionContext = EqualityExpressionContext;

EqualityExpressionContext.prototype.expression = function (i) {
  if (i === undefined) {
    i = null;
  }

  if (i === null) {
    return this.getTypedRuleContexts(ExpressionContext);
  } else {
    return this.getTypedRuleContext(ExpressionContext, i);
  }
};

EqualityExpressionContext.prototype.enterRule = function (listener) {
  if (listener instanceof FHIRPathListener) {
    listener.enterEqualityExpression(this);
  }
};

EqualityExpressionContext.prototype.exitRule = function (listener) {
  if (listener instanceof FHIRPathListener) {
    listener.exitEqualityExpression(this);
  }
};

function ImpliesExpressionContext(parser, ctx) {
  ExpressionContext.call(this, parser);
  ExpressionContext.prototype.copyFrom.call(this, ctx);
  return this;
}

ImpliesExpressionContext.prototype = Object.create(ExpressionContext.prototype);
ImpliesExpressionContext.prototype.constructor = ImpliesExpressionContext;
FHIRPathParser.ImpliesExpressionContext = ImpliesExpressionContext;

ImpliesExpressionContext.prototype.expression = function (i) {
  if (i === undefined) {
    i = null;
  }

  if (i === null) {
    return this.getTypedRuleContexts(ExpressionContext);
  } else {
    return this.getTypedRuleContext(ExpressionContext, i);
  }
};

ImpliesExpressionContext.prototype.enterRule = function (listener) {
  if (listener instanceof FHIRPathListener) {
    listener.enterImpliesExpression(this);
  }
};

ImpliesExpressionContext.prototype.exitRule = function (listener) {
  if (listener instanceof FHIRPathListener) {
    listener.exitImpliesExpression(this);
  }
};

function TermExpressionContext(parser, ctx) {
  ExpressionContext.call(this, parser);
  ExpressionContext.prototype.copyFrom.call(this, ctx);
  return this;
}

TermExpressionContext.prototype = Object.create(ExpressionContext.prototype);
TermExpressionContext.prototype.constructor = TermExpressionContext;
FHIRPathParser.TermExpressionContext = TermExpressionContext;

TermExpressionContext.prototype.term = function () {
  return this.getTypedRuleContext(TermContext, 0);
};

TermExpressionContext.prototype.enterRule = function (listener) {
  if (listener instanceof FHIRPathListener) {
    listener.enterTermExpression(this);
  }
};

TermExpressionContext.prototype.exitRule = function (listener) {
  if (listener instanceof FHIRPathListener) {
    listener.exitTermExpression(this);
  }
};

function TypeExpressionContext(parser, ctx) {
  ExpressionContext.call(this, parser);
  ExpressionContext.prototype.copyFrom.call(this, ctx);
  return this;
}

TypeExpressionContext.prototype = Object.create(ExpressionContext.prototype);
TypeExpressionContext.prototype.constructor = TypeExpressionContext;
FHIRPathParser.TypeExpressionContext = TypeExpressionContext;

TypeExpressionContext.prototype.expression = function () {
  return this.getTypedRuleContext(ExpressionContext, 0);
};

TypeExpressionContext.prototype.typeSpecifier = function () {
  return this.getTypedRuleContext(TypeSpecifierContext, 0);
};

TypeExpressionContext.prototype.enterRule = function (listener) {
  if (listener instanceof FHIRPathListener) {
    listener.enterTypeExpression(this);
  }
};

TypeExpressionContext.prototype.exitRule = function (listener) {
  if (listener instanceof FHIRPathListener) {
    listener.exitTypeExpression(this);
  }
};

FHIRPathParser.prototype.expression = function (_p) {
  if (_p === undefined) {
    _p = 0;
  }

  var _parentctx = this._ctx;
  var _parentState = this.state;
  var localctx = new ExpressionContext(this, this._ctx, _parentState);
  var _prevctx = localctx;
  var _startState = 2;
  this.enterRecursionRule(localctx, 2, FHIRPathParser.RULE_expression, _p);
  var _la = 0; // Token type

  try {
    this.enterOuterAlt(localctx, 1);
    this.state = 37;

    this._errHandler.sync(this);

    switch (this._input.LA(1)) {
      case FHIRPathParser.T__15:
      case FHIRPathParser.T__16:
      case FHIRPathParser.T__21:
      case FHIRPathParser.T__22:
      case FHIRPathParser.T__27:
      case FHIRPathParser.T__29:
      case FHIRPathParser.T__31:
      case FHIRPathParser.T__32:
      case FHIRPathParser.T__33:
      case FHIRPathParser.T__34:
      case FHIRPathParser.T__35:
      case FHIRPathParser.T__36:
      case FHIRPathParser.DATETIME:
      case FHIRPathParser.TIME:
      case FHIRPathParser.IDENTIFIER:
      case FHIRPathParser.DELIMITEDIDENTIFIER:
      case FHIRPathParser.STRING:
      case FHIRPathParser.NUMBER:
        localctx = new TermExpressionContext(this, localctx);
        this._ctx = localctx;
        _prevctx = localctx;
        this.state = 34;
        this.term();
        break;

      case FHIRPathParser.T__3:
      case FHIRPathParser.T__4:
        localctx = new PolarityExpressionContext(this, localctx);
        this._ctx = localctx;
        _prevctx = localctx;
        this.state = 35;
        _la = this._input.LA(1);

        if (!(_la === FHIRPathParser.T__3 || _la === FHIRPathParser.T__4)) {
          this._errHandler.recoverInline(this);
        } else {
          this._errHandler.reportMatch(this);

          this.consume();
        }

        this.state = 36;
        this.expression(11);
        break;

      default:
        throw new antlr4.error.NoViableAltException(this);
    }

    this._ctx.stop = this._input.LT(-1);
    this.state = 79;

    this._errHandler.sync(this);

    var _alt = this._interp.adaptivePredict(this._input, 2, this._ctx);

    while (_alt != 2 && _alt != antlr4.atn.ATN.INVALID_ALT_NUMBER) {
      if (_alt === 1) {
        if (this._parseListeners !== null) {
          this.triggerExitRuleEvent();
        }

        _prevctx = localctx;
        this.state = 77;

        this._errHandler.sync(this);

        var la_ = this._interp.adaptivePredict(this._input, 1, this._ctx);

        switch (la_) {
          case 1:
            localctx = new MultiplicativeExpressionContext(this, new ExpressionContext(this, _parentctx, _parentState));
            this.pushNewRecursionContext(localctx, _startState, FHIRPathParser.RULE_expression);
            this.state = 39;

            if (!this.precpred(this._ctx, 10)) {
              throw new antlr4.error.FailedPredicateException(this, "this.precpred(this._ctx, 10)");
            }

            this.state = 40;
            _la = this._input.LA(1);

            if (!((_la & ~0x1f) == 0 && (1 << _la & (1 << FHIRPathParser.T__5 | 1 << FHIRPathParser.T__6 | 1 << FHIRPathParser.T__7 | 1 << FHIRPathParser.T__8)) !== 0)) {
              this._errHandler.recoverInline(this);
            } else {
              this._errHandler.reportMatch(this);

              this.consume();
            }

            this.state = 41;
            this.expression(11);
            break;

          case 2:
            localctx = new AdditiveExpressionContext(this, new ExpressionContext(this, _parentctx, _parentState));
            this.pushNewRecursionContext(localctx, _startState, FHIRPathParser.RULE_expression);
            this.state = 42;

            if (!this.precpred(this._ctx, 9)) {
              throw new antlr4.error.FailedPredicateException(this, "this.precpred(this._ctx, 9)");
            }

            this.state = 43;
            _la = this._input.LA(1);

            if (!((_la & ~0x1f) == 0 && (1 << _la & (1 << FHIRPathParser.T__3 | 1 << FHIRPathParser.T__4 | 1 << FHIRPathParser.T__9)) !== 0)) {
              this._errHandler.recoverInline(this);
            } else {
              this._errHandler.reportMatch(this);

              this.consume();
            }

            this.state = 44;
            this.expression(10);
            break;

          case 3:
            localctx = new UnionExpressionContext(this, new ExpressionContext(this, _parentctx, _parentState));
            this.pushNewRecursionContext(localctx, _startState, FHIRPathParser.RULE_expression);
            this.state = 45;

            if (!this.precpred(this._ctx, 8)) {
              throw new antlr4.error.FailedPredicateException(this, "this.precpred(this._ctx, 8)");
            }

            this.state = 46;
            this.match(FHIRPathParser.T__10);
            this.state = 47;
            this.expression(9);
            break;

          case 4:
            localctx = new InequalityExpressionContext(this, new ExpressionContext(this, _parentctx, _parentState));
            this.pushNewRecursionContext(localctx, _startState, FHIRPathParser.RULE_expression);
            this.state = 48;

            if (!this.precpred(this._ctx, 7)) {
              throw new antlr4.error.FailedPredicateException(this, "this.precpred(this._ctx, 7)");
            }

            this.state = 49;
            _la = this._input.LA(1);

            if (!((_la & ~0x1f) == 0 && (1 << _la & (1 << FHIRPathParser.T__11 | 1 << FHIRPathParser.T__12 | 1 << FHIRPathParser.T__13 | 1 << FHIRPathParser.T__14)) !== 0)) {
              this._errHandler.recoverInline(this);
            } else {
              this._errHandler.reportMatch(this);

              this.consume();
            }

            this.state = 50;
            this.expression(8);
            break;

          case 5:
            localctx = new EqualityExpressionContext(this, new ExpressionContext(this, _parentctx, _parentState));
            this.pushNewRecursionContext(localctx, _startState, FHIRPathParser.RULE_expression);
            this.state = 51;

            if (!this.precpred(this._ctx, 5)) {
              throw new antlr4.error.FailedPredicateException(this, "this.precpred(this._ctx, 5)");
            }

            this.state = 52;
            _la = this._input.LA(1);

            if (!((_la & ~0x1f) == 0 && (1 << _la & (1 << FHIRPathParser.T__17 | 1 << FHIRPathParser.T__18 | 1 << FHIRPathParser.T__19 | 1 << FHIRPathParser.T__20)) !== 0)) {
              this._errHandler.recoverInline(this);
            } else {
              this._errHandler.reportMatch(this);

              this.consume();
            }

            this.state = 53;
            this.expression(6);
            break;

          case 6:
            localctx = new MembershipExpressionContext(this, new ExpressionContext(this, _parentctx, _parentState));
            this.pushNewRecursionContext(localctx, _startState, FHIRPathParser.RULE_expression);
            this.state = 54;

            if (!this.precpred(this._ctx, 4)) {
              throw new antlr4.error.FailedPredicateException(this, "this.precpred(this._ctx, 4)");
            }

            this.state = 55;
            _la = this._input.LA(1);

            if (!(_la === FHIRPathParser.T__21 || _la === FHIRPathParser.T__22)) {
              this._errHandler.recoverInline(this);
            } else {
              this._errHandler.reportMatch(this);

              this.consume();
            }

            this.state = 56;
            this.expression(5);
            break;

          case 7:
            localctx = new AndExpressionContext(this, new ExpressionContext(this, _parentctx, _parentState));
            this.pushNewRecursionContext(localctx, _startState, FHIRPathParser.RULE_expression);
            this.state = 57;

            if (!this.precpred(this._ctx, 3)) {
              throw new antlr4.error.FailedPredicateException(this, "this.precpred(this._ctx, 3)");
            }

            this.state = 58;
            this.match(FHIRPathParser.T__23);
            this.state = 59;
            this.expression(4);
            break;

          case 8:
            localctx = new OrExpressionContext(this, new ExpressionContext(this, _parentctx, _parentState));
            this.pushNewRecursionContext(localctx, _startState, FHIRPathParser.RULE_expression);
            this.state = 60;

            if (!this.precpred(this._ctx, 2)) {
              throw new antlr4.error.FailedPredicateException(this, "this.precpred(this._ctx, 2)");
            }

            this.state = 61;
            _la = this._input.LA(1);

            if (!(_la === FHIRPathParser.T__24 || _la === FHIRPathParser.T__25)) {
              this._errHandler.recoverInline(this);
            } else {
              this._errHandler.reportMatch(this);

              this.consume();
            }

            this.state = 62;
            this.expression(3);
            break;

          case 9:
            localctx = new ImpliesExpressionContext(this, new ExpressionContext(this, _parentctx, _parentState));
            this.pushNewRecursionContext(localctx, _startState, FHIRPathParser.RULE_expression);
            this.state = 63;

            if (!this.precpred(this._ctx, 1)) {
              throw new antlr4.error.FailedPredicateException(this, "this.precpred(this._ctx, 1)");
            }

            this.state = 64;
            this.match(FHIRPathParser.T__26);
            this.state = 65;
            this.expression(2);
            break;

          case 10:
            localctx = new InvocationExpressionContext(this, new ExpressionContext(this, _parentctx, _parentState));
            this.pushNewRecursionContext(localctx, _startState, FHIRPathParser.RULE_expression);
            this.state = 66;

            if (!this.precpred(this._ctx, 13)) {
              throw new antlr4.error.FailedPredicateException(this, "this.precpred(this._ctx, 13)");
            }

            this.state = 67;
            this.match(FHIRPathParser.T__0);
            this.state = 68;
            this.invocation();
            break;

          case 11:
            localctx = new IndexerExpressionContext(this, new ExpressionContext(this, _parentctx, _parentState));
            this.pushNewRecursionContext(localctx, _startState, FHIRPathParser.RULE_expression);
            this.state = 69;

            if (!this.precpred(this._ctx, 12)) {
              throw new antlr4.error.FailedPredicateException(this, "this.precpred(this._ctx, 12)");
            }

            this.state = 70;
            this.match(FHIRPathParser.T__1);
            this.state = 71;
            this.expression(0);
            this.state = 72;
            this.match(FHIRPathParser.T__2);
            break;

          case 12:
            localctx = new TypeExpressionContext(this, new ExpressionContext(this, _parentctx, _parentState));
            this.pushNewRecursionContext(localctx, _startState, FHIRPathParser.RULE_expression);
            this.state = 74;

            if (!this.precpred(this._ctx, 6)) {
              throw new antlr4.error.FailedPredicateException(this, "this.precpred(this._ctx, 6)");
            }

            this.state = 75;
            _la = this._input.LA(1);

            if (!(_la === FHIRPathParser.T__15 || _la === FHIRPathParser.T__16)) {
              this._errHandler.recoverInline(this);
            } else {
              this._errHandler.reportMatch(this);

              this.consume();
            }

            this.state = 76;
            this.typeSpecifier();
            break;
        }
      }

      this.state = 81;

      this._errHandler.sync(this);

      _alt = this._interp.adaptivePredict(this._input, 2, this._ctx);
    }
  } catch (error) {
    if (error instanceof antlr4.error.RecognitionException) {
      localctx.exception = error;

      this._errHandler.reportError(this, error);

      this._errHandler.recover(this, error);
    } else {
      throw error;
    }
  } finally {
    this.unrollRecursionContexts(_parentctx);
  }

  return localctx;
};

function TermContext(parser, parent, invokingState) {
  if (parent === undefined) {
    parent = null;
  }

  if (invokingState === undefined || invokingState === null) {
    invokingState = -1;
  }

  antlr4.ParserRuleContext.call(this, parent, invokingState);
  this.parser = parser;
  this.ruleIndex = FHIRPathParser.RULE_term;
  return this;
}

TermContext.prototype = Object.create(antlr4.ParserRuleContext.prototype);
TermContext.prototype.constructor = TermContext;

TermContext.prototype.copyFrom = function (ctx) {
  antlr4.ParserRuleContext.prototype.copyFrom.call(this, ctx);
};

function ExternalConstantTermContext(parser, ctx) {
  TermContext.call(this, parser);
  TermContext.prototype.copyFrom.call(this, ctx);
  return this;
}

ExternalConstantTermContext.prototype = Object.create(TermContext.prototype);
ExternalConstantTermContext.prototype.constructor = ExternalConstantTermContext;
FHIRPathParser.ExternalConstantTermContext = ExternalConstantTermContext;

ExternalConstantTermContext.prototype.externalConstant = function () {
  return this.getTypedRuleContext(ExternalConstantContext, 0);
};

ExternalConstantTermContext.prototype.enterRule = function (listener) {
  if (listener instanceof FHIRPathListener) {
    listener.enterExternalConstantTerm(this);
  }
};

ExternalConstantTermContext.prototype.exitRule = function (listener) {
  if (listener instanceof FHIRPathListener) {
    listener.exitExternalConstantTerm(this);
  }
};

function LiteralTermContext(parser, ctx) {
  TermContext.call(this, parser);
  TermContext.prototype.copyFrom.call(this, ctx);
  return this;
}

LiteralTermContext.prototype = Object.create(TermContext.prototype);
LiteralTermContext.prototype.constructor = LiteralTermContext;
FHIRPathParser.LiteralTermContext = LiteralTermContext;

LiteralTermContext.prototype.literal = function () {
  return this.getTypedRuleContext(LiteralContext, 0);
};

LiteralTermContext.prototype.enterRule = function (listener) {
  if (listener instanceof FHIRPathListener) {
    listener.enterLiteralTerm(this);
  }
};

LiteralTermContext.prototype.exitRule = function (listener) {
  if (listener instanceof FHIRPathListener) {
    listener.exitLiteralTerm(this);
  }
};

function ParenthesizedTermContext(parser, ctx) {
  TermContext.call(this, parser);
  TermContext.prototype.copyFrom.call(this, ctx);
  return this;
}

ParenthesizedTermContext.prototype = Object.create(TermContext.prototype);
ParenthesizedTermContext.prototype.constructor = ParenthesizedTermContext;
FHIRPathParser.ParenthesizedTermContext = ParenthesizedTermContext;

ParenthesizedTermContext.prototype.expression = function () {
  return this.getTypedRuleContext(ExpressionContext, 0);
};

ParenthesizedTermContext.prototype.enterRule = function (listener) {
  if (listener instanceof FHIRPathListener) {
    listener.enterParenthesizedTerm(this);
  }
};

ParenthesizedTermContext.prototype.exitRule = function (listener) {
  if (listener instanceof FHIRPathListener) {
    listener.exitParenthesizedTerm(this);
  }
};

function InvocationTermContext(parser, ctx) {
  TermContext.call(this, parser);
  TermContext.prototype.copyFrom.call(this, ctx);
  return this;
}

InvocationTermContext.prototype = Object.create(TermContext.prototype);
InvocationTermContext.prototype.constructor = InvocationTermContext;
FHIRPathParser.InvocationTermContext = InvocationTermContext;

InvocationTermContext.prototype.invocation = function () {
  return this.getTypedRuleContext(InvocationContext, 0);
};

InvocationTermContext.prototype.enterRule = function (listener) {
  if (listener instanceof FHIRPathListener) {
    listener.enterInvocationTerm(this);
  }
};

InvocationTermContext.prototype.exitRule = function (listener) {
  if (listener instanceof FHIRPathListener) {
    listener.exitInvocationTerm(this);
  }
};

FHIRPathParser.TermContext = TermContext;

FHIRPathParser.prototype.term = function () {
  var localctx = new TermContext(this, this._ctx, this.state);
  this.enterRule(localctx, 4, FHIRPathParser.RULE_term);

  try {
    this.state = 89;

    this._errHandler.sync(this);

    switch (this._input.LA(1)) {
      case FHIRPathParser.T__15:
      case FHIRPathParser.T__16:
      case FHIRPathParser.T__21:
      case FHIRPathParser.T__22:
      case FHIRPathParser.T__34:
      case FHIRPathParser.T__35:
      case FHIRPathParser.T__36:
      case FHIRPathParser.IDENTIFIER:
      case FHIRPathParser.DELIMITEDIDENTIFIER:
        localctx = new InvocationTermContext(this, localctx);
        this.enterOuterAlt(localctx, 1);
        this.state = 82;
        this.invocation();
        break;

      case FHIRPathParser.T__29:
      case FHIRPathParser.T__31:
      case FHIRPathParser.T__32:
      case FHIRPathParser.DATETIME:
      case FHIRPathParser.TIME:
      case FHIRPathParser.STRING:
      case FHIRPathParser.NUMBER:
        localctx = new LiteralTermContext(this, localctx);
        this.enterOuterAlt(localctx, 2);
        this.state = 83;
        this.literal();
        break;

      case FHIRPathParser.T__33:
        localctx = new ExternalConstantTermContext(this, localctx);
        this.enterOuterAlt(localctx, 3);
        this.state = 84;
        this.externalConstant();
        break;

      case FHIRPathParser.T__27:
        localctx = new ParenthesizedTermContext(this, localctx);
        this.enterOuterAlt(localctx, 4);
        this.state = 85;
        this.match(FHIRPathParser.T__27);
        this.state = 86;
        this.expression(0);
        this.state = 87;
        this.match(FHIRPathParser.T__28);
        break;

      default:
        throw new antlr4.error.NoViableAltException(this);
    }
  } catch (re) {
    if (re instanceof antlr4.error.RecognitionException) {
      localctx.exception = re;

      this._errHandler.reportError(this, re);

      this._errHandler.recover(this, re);
    } else {
      throw re;
    }
  } finally {
    this.exitRule();
  }

  return localctx;
};

function LiteralContext(parser, parent, invokingState) {
  if (parent === undefined) {
    parent = null;
  }

  if (invokingState === undefined || invokingState === null) {
    invokingState = -1;
  }

  antlr4.ParserRuleContext.call(this, parent, invokingState);
  this.parser = parser;
  this.ruleIndex = FHIRPathParser.RULE_literal;
  return this;
}

LiteralContext.prototype = Object.create(antlr4.ParserRuleContext.prototype);
LiteralContext.prototype.constructor = LiteralContext;

LiteralContext.prototype.copyFrom = function (ctx) {
  antlr4.ParserRuleContext.prototype.copyFrom.call(this, ctx);
};

function TimeLiteralContext(parser, ctx) {
  LiteralContext.call(this, parser);
  LiteralContext.prototype.copyFrom.call(this, ctx);
  return this;
}

TimeLiteralContext.prototype = Object.create(LiteralContext.prototype);
TimeLiteralContext.prototype.constructor = TimeLiteralContext;
FHIRPathParser.TimeLiteralContext = TimeLiteralContext;

TimeLiteralContext.prototype.TIME = function () {
  return this.getToken(FHIRPathParser.TIME, 0);
};

TimeLiteralContext.prototype.enterRule = function (listener) {
  if (listener instanceof FHIRPathListener) {
    listener.enterTimeLiteral(this);
  }
};

TimeLiteralContext.prototype.exitRule = function (listener) {
  if (listener instanceof FHIRPathListener) {
    listener.exitTimeLiteral(this);
  }
};

function NullLiteralContext(parser, ctx) {
  LiteralContext.call(this, parser);
  LiteralContext.prototype.copyFrom.call(this, ctx);
  return this;
}

NullLiteralContext.prototype = Object.create(LiteralContext.prototype);
NullLiteralContext.prototype.constructor = NullLiteralContext;
FHIRPathParser.NullLiteralContext = NullLiteralContext;

NullLiteralContext.prototype.enterRule = function (listener) {
  if (listener instanceof FHIRPathListener) {
    listener.enterNullLiteral(this);
  }
};

NullLiteralContext.prototype.exitRule = function (listener) {
  if (listener instanceof FHIRPathListener) {
    listener.exitNullLiteral(this);
  }
};

function DateTimeLiteralContext(parser, ctx) {
  LiteralContext.call(this, parser);
  LiteralContext.prototype.copyFrom.call(this, ctx);
  return this;
}

DateTimeLiteralContext.prototype = Object.create(LiteralContext.prototype);
DateTimeLiteralContext.prototype.constructor = DateTimeLiteralContext;
FHIRPathParser.DateTimeLiteralContext = DateTimeLiteralContext;

DateTimeLiteralContext.prototype.DATETIME = function () {
  return this.getToken(FHIRPathParser.DATETIME, 0);
};

DateTimeLiteralContext.prototype.enterRule = function (listener) {
  if (listener instanceof FHIRPathListener) {
    listener.enterDateTimeLiteral(this);
  }
};

DateTimeLiteralContext.prototype.exitRule = function (listener) {
  if (listener instanceof FHIRPathListener) {
    listener.exitDateTimeLiteral(this);
  }
};

function StringLiteralContext(parser, ctx) {
  LiteralContext.call(this, parser);
  LiteralContext.prototype.copyFrom.call(this, ctx);
  return this;
}

StringLiteralContext.prototype = Object.create(LiteralContext.prototype);
StringLiteralContext.prototype.constructor = StringLiteralContext;
FHIRPathParser.StringLiteralContext = StringLiteralContext;

StringLiteralContext.prototype.STRING = function () {
  return this.getToken(FHIRPathParser.STRING, 0);
};

StringLiteralContext.prototype.enterRule = function (listener) {
  if (listener instanceof FHIRPathListener) {
    listener.enterStringLiteral(this);
  }
};

StringLiteralContext.prototype.exitRule = function (listener) {
  if (listener instanceof FHIRPathListener) {
    listener.exitStringLiteral(this);
  }
};

function BooleanLiteralContext(parser, ctx) {
  LiteralContext.call(this, parser);
  LiteralContext.prototype.copyFrom.call(this, ctx);
  return this;
}

BooleanLiteralContext.prototype = Object.create(LiteralContext.prototype);
BooleanLiteralContext.prototype.constructor = BooleanLiteralContext;
FHIRPathParser.BooleanLiteralContext = BooleanLiteralContext;

BooleanLiteralContext.prototype.enterRule = function (listener) {
  if (listener instanceof FHIRPathListener) {
    listener.enterBooleanLiteral(this);
  }
};

BooleanLiteralContext.prototype.exitRule = function (listener) {
  if (listener instanceof FHIRPathListener) {
    listener.exitBooleanLiteral(this);
  }
};

function NumberLiteralContext(parser, ctx) {
  LiteralContext.call(this, parser);
  LiteralContext.prototype.copyFrom.call(this, ctx);
  return this;
}

NumberLiteralContext.prototype = Object.create(LiteralContext.prototype);
NumberLiteralContext.prototype.constructor = NumberLiteralContext;
FHIRPathParser.NumberLiteralContext = NumberLiteralContext;

NumberLiteralContext.prototype.NUMBER = function () {
  return this.getToken(FHIRPathParser.NUMBER, 0);
};

NumberLiteralContext.prototype.enterRule = function (listener) {
  if (listener instanceof FHIRPathListener) {
    listener.enterNumberLiteral(this);
  }
};

NumberLiteralContext.prototype.exitRule = function (listener) {
  if (listener instanceof FHIRPathListener) {
    listener.exitNumberLiteral(this);
  }
};

function QuantityLiteralContext(parser, ctx) {
  LiteralContext.call(this, parser);
  LiteralContext.prototype.copyFrom.call(this, ctx);
  return this;
}

QuantityLiteralContext.prototype = Object.create(LiteralContext.prototype);
QuantityLiteralContext.prototype.constructor = QuantityLiteralContext;
FHIRPathParser.QuantityLiteralContext = QuantityLiteralContext;

QuantityLiteralContext.prototype.quantity = function () {
  return this.getTypedRuleContext(QuantityContext, 0);
};

QuantityLiteralContext.prototype.enterRule = function (listener) {
  if (listener instanceof FHIRPathListener) {
    listener.enterQuantityLiteral(this);
  }
};

QuantityLiteralContext.prototype.exitRule = function (listener) {
  if (listener instanceof FHIRPathListener) {
    listener.exitQuantityLiteral(this);
  }
};

FHIRPathParser.LiteralContext = LiteralContext;

FHIRPathParser.prototype.literal = function () {
  var localctx = new LiteralContext(this, this._ctx, this.state);
  this.enterRule(localctx, 6, FHIRPathParser.RULE_literal);
  var _la = 0; // Token type

  try {
    this.state = 99;

    this._errHandler.sync(this);

    var la_ = this._interp.adaptivePredict(this._input, 4, this._ctx);

    switch (la_) {
      case 1:
        localctx = new NullLiteralContext(this, localctx);
        this.enterOuterAlt(localctx, 1);
        this.state = 91;
        this.match(FHIRPathParser.T__29);
        this.state = 92;
        this.match(FHIRPathParser.T__30);
        break;

      case 2:
        localctx = new BooleanLiteralContext(this, localctx);
        this.enterOuterAlt(localctx, 2);
        this.state = 93;
        _la = this._input.LA(1);

        if (!(_la === FHIRPathParser.T__31 || _la === FHIRPathParser.T__32)) {
          this._errHandler.recoverInline(this);
        } else {
          this._errHandler.reportMatch(this);

          this.consume();
        }

        break;

      case 3:
        localctx = new StringLiteralContext(this, localctx);
        this.enterOuterAlt(localctx, 3);
        this.state = 94;
        this.match(FHIRPathParser.STRING);
        break;

      case 4:
        localctx = new NumberLiteralContext(this, localctx);
        this.enterOuterAlt(localctx, 4);
        this.state = 95;
        this.match(FHIRPathParser.NUMBER);
        break;

      case 5:
        localctx = new DateTimeLiteralContext(this, localctx);
        this.enterOuterAlt(localctx, 5);
        this.state = 96;
        this.match(FHIRPathParser.DATETIME);
        break;

      case 6:
        localctx = new TimeLiteralContext(this, localctx);
        this.enterOuterAlt(localctx, 6);
        this.state = 97;
        this.match(FHIRPathParser.TIME);
        break;

      case 7:
        localctx = new QuantityLiteralContext(this, localctx);
        this.enterOuterAlt(localctx, 7);
        this.state = 98;
        this.quantity();
        break;
    }
  } catch (re) {
    if (re instanceof antlr4.error.RecognitionException) {
      localctx.exception = re;

      this._errHandler.reportError(this, re);

      this._errHandler.recover(this, re);
    } else {
      throw re;
    }
  } finally {
    this.exitRule();
  }

  return localctx;
};

function ExternalConstantContext(parser, parent, invokingState) {
  if (parent === undefined) {
    parent = null;
  }

  if (invokingState === undefined || invokingState === null) {
    invokingState = -1;
  }

  antlr4.ParserRuleContext.call(this, parent, invokingState);
  this.parser = parser;
  this.ruleIndex = FHIRPathParser.RULE_externalConstant;
  return this;
}

ExternalConstantContext.prototype = Object.create(antlr4.ParserRuleContext.prototype);
ExternalConstantContext.prototype.constructor = ExternalConstantContext;

ExternalConstantContext.prototype.identifier = function () {
  return this.getTypedRuleContext(IdentifierContext, 0);
};

ExternalConstantContext.prototype.STRING = function () {
  return this.getToken(FHIRPathParser.STRING, 0);
};

ExternalConstantContext.prototype.enterRule = function (listener) {
  if (listener instanceof FHIRPathListener) {
    listener.enterExternalConstant(this);
  }
};

ExternalConstantContext.prototype.exitRule = function (listener) {
  if (listener instanceof FHIRPathListener) {
    listener.exitExternalConstant(this);
  }
};

FHIRPathParser.ExternalConstantContext = ExternalConstantContext;

FHIRPathParser.prototype.externalConstant = function () {
  var localctx = new ExternalConstantContext(this, this._ctx, this.state);
  this.enterRule(localctx, 8, FHIRPathParser.RULE_externalConstant);

  try {
    this.enterOuterAlt(localctx, 1);
    this.state = 101;
    this.match(FHIRPathParser.T__33);
    this.state = 104;

    this._errHandler.sync(this);

    switch (this._input.LA(1)) {
      case FHIRPathParser.T__15:
      case FHIRPathParser.T__16:
      case FHIRPathParser.T__21:
      case FHIRPathParser.T__22:
      case FHIRPathParser.IDENTIFIER:
      case FHIRPathParser.DELIMITEDIDENTIFIER:
        this.state = 102;
        this.identifier();
        break;

      case FHIRPathParser.STRING:
        this.state = 103;
        this.match(FHIRPathParser.STRING);
        break;

      default:
        throw new antlr4.error.NoViableAltException(this);
    }
  } catch (re) {
    if (re instanceof antlr4.error.RecognitionException) {
      localctx.exception = re;

      this._errHandler.reportError(this, re);

      this._errHandler.recover(this, re);
    } else {
      throw re;
    }
  } finally {
    this.exitRule();
  }

  return localctx;
};

function InvocationContext(parser, parent, invokingState) {
  if (parent === undefined) {
    parent = null;
  }

  if (invokingState === undefined || invokingState === null) {
    invokingState = -1;
  }

  antlr4.ParserRuleContext.call(this, parent, invokingState);
  this.parser = parser;
  this.ruleIndex = FHIRPathParser.RULE_invocation;
  return this;
}

InvocationContext.prototype = Object.create(antlr4.ParserRuleContext.prototype);
InvocationContext.prototype.constructor = InvocationContext;

InvocationContext.prototype.copyFrom = function (ctx) {
  antlr4.ParserRuleContext.prototype.copyFrom.call(this, ctx);
};

function TotalInvocationContext(parser, ctx) {
  InvocationContext.call(this, parser);
  InvocationContext.prototype.copyFrom.call(this, ctx);
  return this;
}

TotalInvocationContext.prototype = Object.create(InvocationContext.prototype);
TotalInvocationContext.prototype.constructor = TotalInvocationContext;
FHIRPathParser.TotalInvocationContext = TotalInvocationContext;

TotalInvocationContext.prototype.enterRule = function (listener) {
  if (listener instanceof FHIRPathListener) {
    listener.enterTotalInvocation(this);
  }
};

TotalInvocationContext.prototype.exitRule = function (listener) {
  if (listener instanceof FHIRPathListener) {
    listener.exitTotalInvocation(this);
  }
};

function ThisInvocationContext(parser, ctx) {
  InvocationContext.call(this, parser);
  InvocationContext.prototype.copyFrom.call(this, ctx);
  return this;
}

ThisInvocationContext.prototype = Object.create(InvocationContext.prototype);
ThisInvocationContext.prototype.constructor = ThisInvocationContext;
FHIRPathParser.ThisInvocationContext = ThisInvocationContext;

ThisInvocationContext.prototype.enterRule = function (listener) {
  if (listener instanceof FHIRPathListener) {
    listener.enterThisInvocation(this);
  }
};

ThisInvocationContext.prototype.exitRule = function (listener) {
  if (listener instanceof FHIRPathListener) {
    listener.exitThisInvocation(this);
  }
};

function IndexInvocationContext(parser, ctx) {
  InvocationContext.call(this, parser);
  InvocationContext.prototype.copyFrom.call(this, ctx);
  return this;
}

IndexInvocationContext.prototype = Object.create(InvocationContext.prototype);
IndexInvocationContext.prototype.constructor = IndexInvocationContext;
FHIRPathParser.IndexInvocationContext = IndexInvocationContext;

IndexInvocationContext.prototype.enterRule = function (listener) {
  if (listener instanceof FHIRPathListener) {
    listener.enterIndexInvocation(this);
  }
};

IndexInvocationContext.prototype.exitRule = function (listener) {
  if (listener instanceof FHIRPathListener) {
    listener.exitIndexInvocation(this);
  }
};

function FunctionInvocationContext(parser, ctx) {
  InvocationContext.call(this, parser);
  InvocationContext.prototype.copyFrom.call(this, ctx);
  return this;
}

FunctionInvocationContext.prototype = Object.create(InvocationContext.prototype);
FunctionInvocationContext.prototype.constructor = FunctionInvocationContext;
FHIRPathParser.FunctionInvocationContext = FunctionInvocationContext;

FunctionInvocationContext.prototype.functn = function () {
  return this.getTypedRuleContext(FunctnContext, 0);
};

FunctionInvocationContext.prototype.enterRule = function (listener) {
  if (listener instanceof FHIRPathListener) {
    listener.enterFunctionInvocation(this);
  }
};

FunctionInvocationContext.prototype.exitRule = function (listener) {
  if (listener instanceof FHIRPathListener) {
    listener.exitFunctionInvocation(this);
  }
};

function MemberInvocationContext(parser, ctx) {
  InvocationContext.call(this, parser);
  InvocationContext.prototype.copyFrom.call(this, ctx);
  return this;
}

MemberInvocationContext.prototype = Object.create(InvocationContext.prototype);
MemberInvocationContext.prototype.constructor = MemberInvocationContext;
FHIRPathParser.MemberInvocationContext = MemberInvocationContext;

MemberInvocationContext.prototype.identifier = function () {
  return this.getTypedRuleContext(IdentifierContext, 0);
};

MemberInvocationContext.prototype.enterRule = function (listener) {
  if (listener instanceof FHIRPathListener) {
    listener.enterMemberInvocation(this);
  }
};

MemberInvocationContext.prototype.exitRule = function (listener) {
  if (listener instanceof FHIRPathListener) {
    listener.exitMemberInvocation(this);
  }
};

FHIRPathParser.InvocationContext = InvocationContext;

FHIRPathParser.prototype.invocation = function () {
  var localctx = new InvocationContext(this, this._ctx, this.state);
  this.enterRule(localctx, 10, FHIRPathParser.RULE_invocation);

  try {
    this.state = 111;

    this._errHandler.sync(this);

    var la_ = this._interp.adaptivePredict(this._input, 6, this._ctx);

    switch (la_) {
      case 1:
        localctx = new MemberInvocationContext(this, localctx);
        this.enterOuterAlt(localctx, 1);
        this.state = 106;
        this.identifier();
        break;

      case 2:
        localctx = new FunctionInvocationContext(this, localctx);
        this.enterOuterAlt(localctx, 2);
        this.state = 107;
        this.functn();
        break;

      case 3:
        localctx = new ThisInvocationContext(this, localctx);
        this.enterOuterAlt(localctx, 3);
        this.state = 108;
        this.match(FHIRPathParser.T__34);
        break;

      case 4:
        localctx = new IndexInvocationContext(this, localctx);
        this.enterOuterAlt(localctx, 4);
        this.state = 109;
        this.match(FHIRPathParser.T__35);
        break;

      case 5:
        localctx = new TotalInvocationContext(this, localctx);
        this.enterOuterAlt(localctx, 5);
        this.state = 110;
        this.match(FHIRPathParser.T__36);
        break;
    }
  } catch (re) {
    if (re instanceof antlr4.error.RecognitionException) {
      localctx.exception = re;

      this._errHandler.reportError(this, re);

      this._errHandler.recover(this, re);
    } else {
      throw re;
    }
  } finally {
    this.exitRule();
  }

  return localctx;
};

function FunctnContext(parser, parent, invokingState) {
  if (parent === undefined) {
    parent = null;
  }

  if (invokingState === undefined || invokingState === null) {
    invokingState = -1;
  }

  antlr4.ParserRuleContext.call(this, parent, invokingState);
  this.parser = parser;
  this.ruleIndex = FHIRPathParser.RULE_functn;
  return this;
}

FunctnContext.prototype = Object.create(antlr4.ParserRuleContext.prototype);
FunctnContext.prototype.constructor = FunctnContext;

FunctnContext.prototype.identifier = function () {
  return this.getTypedRuleContext(IdentifierContext, 0);
};

FunctnContext.prototype.paramList = function () {
  return this.getTypedRuleContext(ParamListContext, 0);
};

FunctnContext.prototype.enterRule = function (listener) {
  if (listener instanceof FHIRPathListener) {
    listener.enterFunctn(this);
  }
};

FunctnContext.prototype.exitRule = function (listener) {
  if (listener instanceof FHIRPathListener) {
    listener.exitFunctn(this);
  }
};

FHIRPathParser.FunctnContext = FunctnContext;

FHIRPathParser.prototype.functn = function () {
  var localctx = new FunctnContext(this, this._ctx, this.state);
  this.enterRule(localctx, 12, FHIRPathParser.RULE_functn);
  var _la = 0; // Token type

  try {
    this.enterOuterAlt(localctx, 1);
    this.state = 113;
    this.identifier();
    this.state = 114;
    this.match(FHIRPathParser.T__27);
    this.state = 116;

    this._errHandler.sync(this);

    _la = this._input.LA(1);

    if ((_la & ~0x1f) == 0 && (1 << _la & (1 << FHIRPathParser.T__3 | 1 << FHIRPathParser.T__4 | 1 << FHIRPathParser.T__15 | 1 << FHIRPathParser.T__16 | 1 << FHIRPathParser.T__21 | 1 << FHIRPathParser.T__22 | 1 << FHIRPathParser.T__27 | 1 << FHIRPathParser.T__29)) !== 0 || (_la - 32 & ~0x1f) == 0 && (1 << _la - 32 & (1 << FHIRPathParser.T__31 - 32 | 1 << FHIRPathParser.T__32 - 32 | 1 << FHIRPathParser.T__33 - 32 | 1 << FHIRPathParser.T__34 - 32 | 1 << FHIRPathParser.T__35 - 32 | 1 << FHIRPathParser.T__36 - 32 | 1 << FHIRPathParser.DATETIME - 32 | 1 << FHIRPathParser.TIME - 32 | 1 << FHIRPathParser.IDENTIFIER - 32 | 1 << FHIRPathParser.DELIMITEDIDENTIFIER - 32 | 1 << FHIRPathParser.STRING - 32 | 1 << FHIRPathParser.NUMBER - 32)) !== 0) {
      this.state = 115;
      this.paramList();
    }

    this.state = 118;
    this.match(FHIRPathParser.T__28);
  } catch (re) {
    if (re instanceof antlr4.error.RecognitionException) {
      localctx.exception = re;

      this._errHandler.reportError(this, re);

      this._errHandler.recover(this, re);
    } else {
      throw re;
    }
  } finally {
    this.exitRule();
  }

  return localctx;
};

function ParamListContext(parser, parent, invokingState) {
  if (parent === undefined) {
    parent = null;
  }

  if (invokingState === undefined || invokingState === null) {
    invokingState = -1;
  }

  antlr4.ParserRuleContext.call(this, parent, invokingState);
  this.parser = parser;
  this.ruleIndex = FHIRPathParser.RULE_paramList;
  return this;
}

ParamListContext.prototype = Object.create(antlr4.ParserRuleContext.prototype);
ParamListContext.prototype.constructor = ParamListContext;

ParamListContext.prototype.expression = function (i) {
  if (i === undefined) {
    i = null;
  }

  if (i === null) {
    return this.getTypedRuleContexts(ExpressionContext);
  } else {
    return this.getTypedRuleContext(ExpressionContext, i);
  }
};

ParamListContext.prototype.enterRule = function (listener) {
  if (listener instanceof FHIRPathListener) {
    listener.enterParamList(this);
  }
};

ParamListContext.prototype.exitRule = function (listener) {
  if (listener instanceof FHIRPathListener) {
    listener.exitParamList(this);
  }
};

FHIRPathParser.ParamListContext = ParamListContext;

FHIRPathParser.prototype.paramList = function () {
  var localctx = new ParamListContext(this, this._ctx, this.state);
  this.enterRule(localctx, 14, FHIRPathParser.RULE_paramList);
  var _la = 0; // Token type

  try {
    this.enterOuterAlt(localctx, 1);
    this.state = 120;
    this.expression(0);
    this.state = 125;

    this._errHandler.sync(this);

    _la = this._input.LA(1);

    while (_la === FHIRPathParser.T__37) {
      this.state = 121;
      this.match(FHIRPathParser.T__37);
      this.state = 122;
      this.expression(0);
      this.state = 127;

      this._errHandler.sync(this);

      _la = this._input.LA(1);
    }
  } catch (re) {
    if (re instanceof antlr4.error.RecognitionException) {
      localctx.exception = re;

      this._errHandler.reportError(this, re);

      this._errHandler.recover(this, re);
    } else {
      throw re;
    }
  } finally {
    this.exitRule();
  }

  return localctx;
};

function QuantityContext(parser, parent, invokingState) {
  if (parent === undefined) {
    parent = null;
  }

  if (invokingState === undefined || invokingState === null) {
    invokingState = -1;
  }

  antlr4.ParserRuleContext.call(this, parent, invokingState);
  this.parser = parser;
  this.ruleIndex = FHIRPathParser.RULE_quantity;
  return this;
}

QuantityContext.prototype = Object.create(antlr4.ParserRuleContext.prototype);
QuantityContext.prototype.constructor = QuantityContext;

QuantityContext.prototype.NUMBER = function () {
  return this.getToken(FHIRPathParser.NUMBER, 0);
};

QuantityContext.prototype.unit = function () {
  return this.getTypedRuleContext(UnitContext, 0);
};

QuantityContext.prototype.enterRule = function (listener) {
  if (listener instanceof FHIRPathListener) {
    listener.enterQuantity(this);
  }
};

QuantityContext.prototype.exitRule = function (listener) {
  if (listener instanceof FHIRPathListener) {
    listener.exitQuantity(this);
  }
};

FHIRPathParser.QuantityContext = QuantityContext;

FHIRPathParser.prototype.quantity = function () {
  var localctx = new QuantityContext(this, this._ctx, this.state);
  this.enterRule(localctx, 16, FHIRPathParser.RULE_quantity);

  try {
    this.enterOuterAlt(localctx, 1);
    this.state = 128;
    this.match(FHIRPathParser.NUMBER);
    this.state = 130;

    this._errHandler.sync(this);

    var la_ = this._interp.adaptivePredict(this._input, 9, this._ctx);

    if (la_ === 1) {
      this.state = 129;
      this.unit();
    }
  } catch (re) {
    if (re instanceof antlr4.error.RecognitionException) {
      localctx.exception = re;

      this._errHandler.reportError(this, re);

      this._errHandler.recover(this, re);
    } else {
      throw re;
    }
  } finally {
    this.exitRule();
  }

  return localctx;
};

function UnitContext(parser, parent, invokingState) {
  if (parent === undefined) {
    parent = null;
  }

  if (invokingState === undefined || invokingState === null) {
    invokingState = -1;
  }

  antlr4.ParserRuleContext.call(this, parent, invokingState);
  this.parser = parser;
  this.ruleIndex = FHIRPathParser.RULE_unit;
  return this;
}

UnitContext.prototype = Object.create(antlr4.ParserRuleContext.prototype);
UnitContext.prototype.constructor = UnitContext;

UnitContext.prototype.dateTimePrecision = function () {
  return this.getTypedRuleContext(DateTimePrecisionContext, 0);
};

UnitContext.prototype.pluralDateTimePrecision = function () {
  return this.getTypedRuleContext(PluralDateTimePrecisionContext, 0);
};

UnitContext.prototype.STRING = function () {
  return this.getToken(FHIRPathParser.STRING, 0);
};

UnitContext.prototype.enterRule = function (listener) {
  if (listener instanceof FHIRPathListener) {
    listener.enterUnit(this);
  }
};

UnitContext.prototype.exitRule = function (listener) {
  if (listener instanceof FHIRPathListener) {
    listener.exitUnit(this);
  }
};

FHIRPathParser.UnitContext = UnitContext;

FHIRPathParser.prototype.unit = function () {
  var localctx = new UnitContext(this, this._ctx, this.state);
  this.enterRule(localctx, 18, FHIRPathParser.RULE_unit);

  try {
    this.state = 135;

    this._errHandler.sync(this);

    switch (this._input.LA(1)) {
      case FHIRPathParser.T__38:
      case FHIRPathParser.T__39:
      case FHIRPathParser.T__40:
      case FHIRPathParser.T__41:
      case FHIRPathParser.T__42:
      case FHIRPathParser.T__43:
      case FHIRPathParser.T__44:
      case FHIRPathParser.T__45:
        this.enterOuterAlt(localctx, 1);
        this.state = 132;
        this.dateTimePrecision();
        break;

      case FHIRPathParser.T__46:
      case FHIRPathParser.T__47:
      case FHIRPathParser.T__48:
      case FHIRPathParser.T__49:
      case FHIRPathParser.T__50:
      case FHIRPathParser.T__51:
      case FHIRPathParser.T__52:
      case FHIRPathParser.T__53:
        this.enterOuterAlt(localctx, 2);
        this.state = 133;
        this.pluralDateTimePrecision();
        break;

      case FHIRPathParser.STRING:
        this.enterOuterAlt(localctx, 3);
        this.state = 134;
        this.match(FHIRPathParser.STRING);
        break;

      default:
        throw new antlr4.error.NoViableAltException(this);
    }
  } catch (re) {
    if (re instanceof antlr4.error.RecognitionException) {
      localctx.exception = re;

      this._errHandler.reportError(this, re);

      this._errHandler.recover(this, re);
    } else {
      throw re;
    }
  } finally {
    this.exitRule();
  }

  return localctx;
};

function DateTimePrecisionContext(parser, parent, invokingState) {
  if (parent === undefined) {
    parent = null;
  }

  if (invokingState === undefined || invokingState === null) {
    invokingState = -1;
  }

  antlr4.ParserRuleContext.call(this, parent, invokingState);
  this.parser = parser;
  this.ruleIndex = FHIRPathParser.RULE_dateTimePrecision;
  return this;
}

DateTimePrecisionContext.prototype = Object.create(antlr4.ParserRuleContext.prototype);
DateTimePrecisionContext.prototype.constructor = DateTimePrecisionContext;

DateTimePrecisionContext.prototype.enterRule = function (listener) {
  if (listener instanceof FHIRPathListener) {
    listener.enterDateTimePrecision(this);
  }
};

DateTimePrecisionContext.prototype.exitRule = function (listener) {
  if (listener instanceof FHIRPathListener) {
    listener.exitDateTimePrecision(this);
  }
};

FHIRPathParser.DateTimePrecisionContext = DateTimePrecisionContext;

FHIRPathParser.prototype.dateTimePrecision = function () {
  var localctx = new DateTimePrecisionContext(this, this._ctx, this.state);
  this.enterRule(localctx, 20, FHIRPathParser.RULE_dateTimePrecision);
  var _la = 0; // Token type

  try {
    this.enterOuterAlt(localctx, 1);
    this.state = 137;
    _la = this._input.LA(1);

    if (!((_la - 39 & ~0x1f) == 0 && (1 << _la - 39 & (1 << FHIRPathParser.T__38 - 39 | 1 << FHIRPathParser.T__39 - 39 | 1 << FHIRPathParser.T__40 - 39 | 1 << FHIRPathParser.T__41 - 39 | 1 << FHIRPathParser.T__42 - 39 | 1 << FHIRPathParser.T__43 - 39 | 1 << FHIRPathParser.T__44 - 39 | 1 << FHIRPathParser.T__45 - 39)) !== 0)) {
      this._errHandler.recoverInline(this);
    } else {
      this._errHandler.reportMatch(this);

      this.consume();
    }
  } catch (re) {
    if (re instanceof antlr4.error.RecognitionException) {
      localctx.exception = re;

      this._errHandler.reportError(this, re);

      this._errHandler.recover(this, re);
    } else {
      throw re;
    }
  } finally {
    this.exitRule();
  }

  return localctx;
};

function PluralDateTimePrecisionContext(parser, parent, invokingState) {
  if (parent === undefined) {
    parent = null;
  }

  if (invokingState === undefined || invokingState === null) {
    invokingState = -1;
  }

  antlr4.ParserRuleContext.call(this, parent, invokingState);
  this.parser = parser;
  this.ruleIndex = FHIRPathParser.RULE_pluralDateTimePrecision;
  return this;
}

PluralDateTimePrecisionContext.prototype = Object.create(antlr4.ParserRuleContext.prototype);
PluralDateTimePrecisionContext.prototype.constructor = PluralDateTimePrecisionContext;

PluralDateTimePrecisionContext.prototype.enterRule = function (listener) {
  if (listener instanceof FHIRPathListener) {
    listener.enterPluralDateTimePrecision(this);
  }
};

PluralDateTimePrecisionContext.prototype.exitRule = function (listener) {
  if (listener instanceof FHIRPathListener) {
    listener.exitPluralDateTimePrecision(this);
  }
};

FHIRPathParser.PluralDateTimePrecisionContext = PluralDateTimePrecisionContext;

FHIRPathParser.prototype.pluralDateTimePrecision = function () {
  var localctx = new PluralDateTimePrecisionContext(this, this._ctx, this.state);
  this.enterRule(localctx, 22, FHIRPathParser.RULE_pluralDateTimePrecision);
  var _la = 0; // Token type

  try {
    this.enterOuterAlt(localctx, 1);
    this.state = 139;
    _la = this._input.LA(1);

    if (!((_la - 47 & ~0x1f) == 0 && (1 << _la - 47 & (1 << FHIRPathParser.T__46 - 47 | 1 << FHIRPathParser.T__47 - 47 | 1 << FHIRPathParser.T__48 - 47 | 1 << FHIRPathParser.T__49 - 47 | 1 << FHIRPathParser.T__50 - 47 | 1 << FHIRPathParser.T__51 - 47 | 1 << FHIRPathParser.T__52 - 47 | 1 << FHIRPathParser.T__53 - 47)) !== 0)) {
      this._errHandler.recoverInline(this);
    } else {
      this._errHandler.reportMatch(this);

      this.consume();
    }
  } catch (re) {
    if (re instanceof antlr4.error.RecognitionException) {
      localctx.exception = re;

      this._errHandler.reportError(this, re);

      this._errHandler.recover(this, re);
    } else {
      throw re;
    }
  } finally {
    this.exitRule();
  }

  return localctx;
};

function TypeSpecifierContext(parser, parent, invokingState) {
  if (parent === undefined) {
    parent = null;
  }

  if (invokingState === undefined || invokingState === null) {
    invokingState = -1;
  }

  antlr4.ParserRuleContext.call(this, parent, invokingState);
  this.parser = parser;
  this.ruleIndex = FHIRPathParser.RULE_typeSpecifier;
  return this;
}

TypeSpecifierContext.prototype = Object.create(antlr4.ParserRuleContext.prototype);
TypeSpecifierContext.prototype.constructor = TypeSpecifierContext;

TypeSpecifierContext.prototype.qualifiedIdentifier = function () {
  return this.getTypedRuleContext(QualifiedIdentifierContext, 0);
};

TypeSpecifierContext.prototype.enterRule = function (listener) {
  if (listener instanceof FHIRPathListener) {
    listener.enterTypeSpecifier(this);
  }
};

TypeSpecifierContext.prototype.exitRule = function (listener) {
  if (listener instanceof FHIRPathListener) {
    listener.exitTypeSpecifier(this);
  }
};

FHIRPathParser.TypeSpecifierContext = TypeSpecifierContext;

FHIRPathParser.prototype.typeSpecifier = function () {
  var localctx = new TypeSpecifierContext(this, this._ctx, this.state);
  this.enterRule(localctx, 24, FHIRPathParser.RULE_typeSpecifier);

  try {
    this.enterOuterAlt(localctx, 1);
    this.state = 141;
    this.qualifiedIdentifier();
  } catch (re) {
    if (re instanceof antlr4.error.RecognitionException) {
      localctx.exception = re;

      this._errHandler.reportError(this, re);

      this._errHandler.recover(this, re);
    } else {
      throw re;
    }
  } finally {
    this.exitRule();
  }

  return localctx;
};

function QualifiedIdentifierContext(parser, parent, invokingState) {
  if (parent === undefined) {
    parent = null;
  }

  if (invokingState === undefined || invokingState === null) {
    invokingState = -1;
  }

  antlr4.ParserRuleContext.call(this, parent, invokingState);
  this.parser = parser;
  this.ruleIndex = FHIRPathParser.RULE_qualifiedIdentifier;
  return this;
}

QualifiedIdentifierContext.prototype = Object.create(antlr4.ParserRuleContext.prototype);
QualifiedIdentifierContext.prototype.constructor = QualifiedIdentifierContext;

QualifiedIdentifierContext.prototype.identifier = function (i) {
  if (i === undefined) {
    i = null;
  }

  if (i === null) {
    return this.getTypedRuleContexts(IdentifierContext);
  } else {
    return this.getTypedRuleContext(IdentifierContext, i);
  }
};

QualifiedIdentifierContext.prototype.enterRule = function (listener) {
  if (listener instanceof FHIRPathListener) {
    listener.enterQualifiedIdentifier(this);
  }
};

QualifiedIdentifierContext.prototype.exitRule = function (listener) {
  if (listener instanceof FHIRPathListener) {
    listener.exitQualifiedIdentifier(this);
  }
};

FHIRPathParser.QualifiedIdentifierContext = QualifiedIdentifierContext;

FHIRPathParser.prototype.qualifiedIdentifier = function () {
  var localctx = new QualifiedIdentifierContext(this, this._ctx, this.state);
  this.enterRule(localctx, 26, FHIRPathParser.RULE_qualifiedIdentifier);

  try {
    this.enterOuterAlt(localctx, 1);
    this.state = 143;
    this.identifier();
    this.state = 148;

    this._errHandler.sync(this);

    var _alt = this._interp.adaptivePredict(this._input, 11, this._ctx);

    while (_alt != 2 && _alt != antlr4.atn.ATN.INVALID_ALT_NUMBER) {
      if (_alt === 1) {
        this.state = 144;
        this.match(FHIRPathParser.T__0);
        this.state = 145;
        this.identifier();
      }

      this.state = 150;

      this._errHandler.sync(this);

      _alt = this._interp.adaptivePredict(this._input, 11, this._ctx);
    }
  } catch (re) {
    if (re instanceof antlr4.error.RecognitionException) {
      localctx.exception = re;

      this._errHandler.reportError(this, re);

      this._errHandler.recover(this, re);
    } else {
      throw re;
    }
  } finally {
    this.exitRule();
  }

  return localctx;
};

function IdentifierContext(parser, parent, invokingState) {
  if (parent === undefined) {
    parent = null;
  }

  if (invokingState === undefined || invokingState === null) {
    invokingState = -1;
  }

  antlr4.ParserRuleContext.call(this, parent, invokingState);
  this.parser = parser;
  this.ruleIndex = FHIRPathParser.RULE_identifier;
  return this;
}

IdentifierContext.prototype = Object.create(antlr4.ParserRuleContext.prototype);
IdentifierContext.prototype.constructor = IdentifierContext;

IdentifierContext.prototype.IDENTIFIER = function () {
  return this.getToken(FHIRPathParser.IDENTIFIER, 0);
};

IdentifierContext.prototype.DELIMITEDIDENTIFIER = function () {
  return this.getToken(FHIRPathParser.DELIMITEDIDENTIFIER, 0);
};

IdentifierContext.prototype.enterRule = function (listener) {
  if (listener instanceof FHIRPathListener) {
    listener.enterIdentifier(this);
  }
};

IdentifierContext.prototype.exitRule = function (listener) {
  if (listener instanceof FHIRPathListener) {
    listener.exitIdentifier(this);
  }
};

FHIRPathParser.IdentifierContext = IdentifierContext;

FHIRPathParser.prototype.identifier = function () {
  var localctx = new IdentifierContext(this, this._ctx, this.state);
  this.enterRule(localctx, 28, FHIRPathParser.RULE_identifier);
  var _la = 0; // Token type

  try {
    this.enterOuterAlt(localctx, 1);
    this.state = 151;
    _la = this._input.LA(1);

    if (!((_la & ~0x1f) == 0 && (1 << _la & (1 << FHIRPathParser.T__15 | 1 << FHIRPathParser.T__16 | 1 << FHIRPathParser.T__21 | 1 << FHIRPathParser.T__22)) !== 0 || _la === FHIRPathParser.IDENTIFIER || _la === FHIRPathParser.DELIMITEDIDENTIFIER)) {
      this._errHandler.recoverInline(this);
    } else {
      this._errHandler.reportMatch(this);

      this.consume();
    }
  } catch (re) {
    if (re instanceof antlr4.error.RecognitionException) {
      localctx.exception = re;

      this._errHandler.reportError(this, re);

      this._errHandler.recover(this, re);
    } else {
      throw re;
    }
  } finally {
    this.exitRule();
  }

  return localctx;
};

FHIRPathParser.prototype.sempred = function (localctx, ruleIndex, predIndex) {
  switch (ruleIndex) {
    case 1:
      return this.expression_sempred(localctx, predIndex);

    default:
      throw "No predicate with index:" + ruleIndex;
  }
};

FHIRPathParser.prototype.expression_sempred = function (localctx, predIndex) {
  switch (predIndex) {
    case 0:
      return this.precpred(this._ctx, 10);

    case 1:
      return this.precpred(this._ctx, 9);

    case 2:
      return this.precpred(this._ctx, 8);

    case 3:
      return this.precpred(this._ctx, 7);

    case 4:
      return this.precpred(this._ctx, 5);

    case 5:
      return this.precpred(this._ctx, 4);

    case 6:
      return this.precpred(this._ctx, 3);

    case 7:
      return this.precpred(this._ctx, 2);

    case 8:
      return this.precpred(this._ctx, 1);

    case 9:
      return this.precpred(this._ctx, 13);

    case 10:
      return this.precpred(this._ctx, 12);

    case 11:
      return this.precpred(this._ctx, 6);

    default:
      throw "No predicate with index:" + predIndex;
  }
};

exports.FHIRPathParser = FHIRPathParser;

/***/ }),
/* 51 */
/***/ (function(module, exports, __webpack_require__) {

// Generated from FHIRPath.g4 by ANTLR 4.7.1
// jshint ignore: start
var antlr4 = __webpack_require__(4); // This class defines a complete listener for a parse tree produced by FHIRPathParser.


function FHIRPathListener() {
  antlr4.tree.ParseTreeListener.call(this);
  return this;
}

FHIRPathListener.prototype = Object.create(antlr4.tree.ParseTreeListener.prototype);
FHIRPathListener.prototype.constructor = FHIRPathListener; // Enter a parse tree produced by FHIRPathParser#entireExpression.

FHIRPathListener.prototype.enterEntireExpression = function (ctx) {}; // Exit a parse tree produced by FHIRPathParser#entireExpression.


FHIRPathListener.prototype.exitEntireExpression = function (ctx) {}; // Enter a parse tree produced by FHIRPathParser#indexerExpression.


FHIRPathListener.prototype.enterIndexerExpression = function (ctx) {}; // Exit a parse tree produced by FHIRPathParser#indexerExpression.


FHIRPathListener.prototype.exitIndexerExpression = function (ctx) {}; // Enter a parse tree produced by FHIRPathParser#polarityExpression.


FHIRPathListener.prototype.enterPolarityExpression = function (ctx) {}; // Exit a parse tree produced by FHIRPathParser#polarityExpression.


FHIRPathListener.prototype.exitPolarityExpression = function (ctx) {}; // Enter a parse tree produced by FHIRPathParser#additiveExpression.


FHIRPathListener.prototype.enterAdditiveExpression = function (ctx) {}; // Exit a parse tree produced by FHIRPathParser#additiveExpression.


FHIRPathListener.prototype.exitAdditiveExpression = function (ctx) {}; // Enter a parse tree produced by FHIRPathParser#multiplicativeExpression.


FHIRPathListener.prototype.enterMultiplicativeExpression = function (ctx) {}; // Exit a parse tree produced by FHIRPathParser#multiplicativeExpression.


FHIRPathListener.prototype.exitMultiplicativeExpression = function (ctx) {}; // Enter a parse tree produced by FHIRPathParser#unionExpression.


FHIRPathListener.prototype.enterUnionExpression = function (ctx) {}; // Exit a parse tree produced by FHIRPathParser#unionExpression.


FHIRPathListener.prototype.exitUnionExpression = function (ctx) {}; // Enter a parse tree produced by FHIRPathParser#orExpression.


FHIRPathListener.prototype.enterOrExpression = function (ctx) {}; // Exit a parse tree produced by FHIRPathParser#orExpression.


FHIRPathListener.prototype.exitOrExpression = function (ctx) {}; // Enter a parse tree produced by FHIRPathParser#andExpression.


FHIRPathListener.prototype.enterAndExpression = function (ctx) {}; // Exit a parse tree produced by FHIRPathParser#andExpression.


FHIRPathListener.prototype.exitAndExpression = function (ctx) {}; // Enter a parse tree produced by FHIRPathParser#membershipExpression.


FHIRPathListener.prototype.enterMembershipExpression = function (ctx) {}; // Exit a parse tree produced by FHIRPathParser#membershipExpression.


FHIRPathListener.prototype.exitMembershipExpression = function (ctx) {}; // Enter a parse tree produced by FHIRPathParser#inequalityExpression.


FHIRPathListener.prototype.enterInequalityExpression = function (ctx) {}; // Exit a parse tree produced by FHIRPathParser#inequalityExpression.


FHIRPathListener.prototype.exitInequalityExpression = function (ctx) {}; // Enter a parse tree produced by FHIRPathParser#invocationExpression.


FHIRPathListener.prototype.enterInvocationExpression = function (ctx) {}; // Exit a parse tree produced by FHIRPathParser#invocationExpression.


FHIRPathListener.prototype.exitInvocationExpression = function (ctx) {}; // Enter a parse tree produced by FHIRPathParser#equalityExpression.


FHIRPathListener.prototype.enterEqualityExpression = function (ctx) {}; // Exit a parse tree produced by FHIRPathParser#equalityExpression.


FHIRPathListener.prototype.exitEqualityExpression = function (ctx) {}; // Enter a parse tree produced by FHIRPathParser#impliesExpression.


FHIRPathListener.prototype.enterImpliesExpression = function (ctx) {}; // Exit a parse tree produced by FHIRPathParser#impliesExpression.


FHIRPathListener.prototype.exitImpliesExpression = function (ctx) {}; // Enter a parse tree produced by FHIRPathParser#termExpression.


FHIRPathListener.prototype.enterTermExpression = function (ctx) {}; // Exit a parse tree produced by FHIRPathParser#termExpression.


FHIRPathListener.prototype.exitTermExpression = function (ctx) {}; // Enter a parse tree produced by FHIRPathParser#typeExpression.


FHIRPathListener.prototype.enterTypeExpression = function (ctx) {}; // Exit a parse tree produced by FHIRPathParser#typeExpression.


FHIRPathListener.prototype.exitTypeExpression = function (ctx) {}; // Enter a parse tree produced by FHIRPathParser#invocationTerm.


FHIRPathListener.prototype.enterInvocationTerm = function (ctx) {}; // Exit a parse tree produced by FHIRPathParser#invocationTerm.


FHIRPathListener.prototype.exitInvocationTerm = function (ctx) {}; // Enter a parse tree produced by FHIRPathParser#literalTerm.


FHIRPathListener.prototype.enterLiteralTerm = function (ctx) {}; // Exit a parse tree produced by FHIRPathParser#literalTerm.


FHIRPathListener.prototype.exitLiteralTerm = function (ctx) {}; // Enter a parse tree produced by FHIRPathParser#externalConstantTerm.


FHIRPathListener.prototype.enterExternalConstantTerm = function (ctx) {}; // Exit a parse tree produced by FHIRPathParser#externalConstantTerm.


FHIRPathListener.prototype.exitExternalConstantTerm = function (ctx) {}; // Enter a parse tree produced by FHIRPathParser#parenthesizedTerm.


FHIRPathListener.prototype.enterParenthesizedTerm = function (ctx) {}; // Exit a parse tree produced by FHIRPathParser#parenthesizedTerm.


FHIRPathListener.prototype.exitParenthesizedTerm = function (ctx) {}; // Enter a parse tree produced by FHIRPathParser#nullLiteral.


FHIRPathListener.prototype.enterNullLiteral = function (ctx) {}; // Exit a parse tree produced by FHIRPathParser#nullLiteral.


FHIRPathListener.prototype.exitNullLiteral = function (ctx) {}; // Enter a parse tree produced by FHIRPathParser#booleanLiteral.


FHIRPathListener.prototype.enterBooleanLiteral = function (ctx) {}; // Exit a parse tree produced by FHIRPathParser#booleanLiteral.


FHIRPathListener.prototype.exitBooleanLiteral = function (ctx) {}; // Enter a parse tree produced by FHIRPathParser#stringLiteral.


FHIRPathListener.prototype.enterStringLiteral = function (ctx) {}; // Exit a parse tree produced by FHIRPathParser#stringLiteral.


FHIRPathListener.prototype.exitStringLiteral = function (ctx) {}; // Enter a parse tree produced by FHIRPathParser#numberLiteral.


FHIRPathListener.prototype.enterNumberLiteral = function (ctx) {}; // Exit a parse tree produced by FHIRPathParser#numberLiteral.


FHIRPathListener.prototype.exitNumberLiteral = function (ctx) {}; // Enter a parse tree produced by FHIRPathParser#dateTimeLiteral.


FHIRPathListener.prototype.enterDateTimeLiteral = function (ctx) {}; // Exit a parse tree produced by FHIRPathParser#dateTimeLiteral.


FHIRPathListener.prototype.exitDateTimeLiteral = function (ctx) {}; // Enter a parse tree produced by FHIRPathParser#timeLiteral.


FHIRPathListener.prototype.enterTimeLiteral = function (ctx) {}; // Exit a parse tree produced by FHIRPathParser#timeLiteral.


FHIRPathListener.prototype.exitTimeLiteral = function (ctx) {}; // Enter a parse tree produced by FHIRPathParser#quantityLiteral.


FHIRPathListener.prototype.enterQuantityLiteral = function (ctx) {}; // Exit a parse tree produced by FHIRPathParser#quantityLiteral.


FHIRPathListener.prototype.exitQuantityLiteral = function (ctx) {}; // Enter a parse tree produced by FHIRPathParser#externalConstant.


FHIRPathListener.prototype.enterExternalConstant = function (ctx) {}; // Exit a parse tree produced by FHIRPathParser#externalConstant.


FHIRPathListener.prototype.exitExternalConstant = function (ctx) {}; // Enter a parse tree produced by FHIRPathParser#memberInvocation.


FHIRPathListener.prototype.enterMemberInvocation = function (ctx) {}; // Exit a parse tree produced by FHIRPathParser#memberInvocation.


FHIRPathListener.prototype.exitMemberInvocation = function (ctx) {}; // Enter a parse tree produced by FHIRPathParser#functionInvocation.


FHIRPathListener.prototype.enterFunctionInvocation = function (ctx) {}; // Exit a parse tree produced by FHIRPathParser#functionInvocation.


FHIRPathListener.prototype.exitFunctionInvocation = function (ctx) {}; // Enter a parse tree produced by FHIRPathParser#thisInvocation.


FHIRPathListener.prototype.enterThisInvocation = function (ctx) {}; // Exit a parse tree produced by FHIRPathParser#thisInvocation.


FHIRPathListener.prototype.exitThisInvocation = function (ctx) {}; // Enter a parse tree produced by FHIRPathParser#indexInvocation.


FHIRPathListener.prototype.enterIndexInvocation = function (ctx) {}; // Exit a parse tree produced by FHIRPathParser#indexInvocation.


FHIRPathListener.prototype.exitIndexInvocation = function (ctx) {}; // Enter a parse tree produced by FHIRPathParser#totalInvocation.


FHIRPathListener.prototype.enterTotalInvocation = function (ctx) {}; // Exit a parse tree produced by FHIRPathParser#totalInvocation.


FHIRPathListener.prototype.exitTotalInvocation = function (ctx) {}; // Enter a parse tree produced by FHIRPathParser#functn.


FHIRPathListener.prototype.enterFunctn = function (ctx) {}; // Exit a parse tree produced by FHIRPathParser#functn.


FHIRPathListener.prototype.exitFunctn = function (ctx) {}; // Enter a parse tree produced by FHIRPathParser#paramList.


FHIRPathListener.prototype.enterParamList = function (ctx) {}; // Exit a parse tree produced by FHIRPathParser#paramList.


FHIRPathListener.prototype.exitParamList = function (ctx) {}; // Enter a parse tree produced by FHIRPathParser#quantity.


FHIRPathListener.prototype.enterQuantity = function (ctx) {}; // Exit a parse tree produced by FHIRPathParser#quantity.


FHIRPathListener.prototype.exitQuantity = function (ctx) {}; // Enter a parse tree produced by FHIRPathParser#unit.


FHIRPathListener.prototype.enterUnit = function (ctx) {}; // Exit a parse tree produced by FHIRPathParser#unit.


FHIRPathListener.prototype.exitUnit = function (ctx) {}; // Enter a parse tree produced by FHIRPathParser#dateTimePrecision.


FHIRPathListener.prototype.enterDateTimePrecision = function (ctx) {}; // Exit a parse tree produced by FHIRPathParser#dateTimePrecision.


FHIRPathListener.prototype.exitDateTimePrecision = function (ctx) {}; // Enter a parse tree produced by FHIRPathParser#pluralDateTimePrecision.


FHIRPathListener.prototype.enterPluralDateTimePrecision = function (ctx) {}; // Exit a parse tree produced by FHIRPathParser#pluralDateTimePrecision.


FHIRPathListener.prototype.exitPluralDateTimePrecision = function (ctx) {}; // Enter a parse tree produced by FHIRPathParser#typeSpecifier.


FHIRPathListener.prototype.enterTypeSpecifier = function (ctx) {}; // Exit a parse tree produced by FHIRPathParser#typeSpecifier.


FHIRPathListener.prototype.exitTypeSpecifier = function (ctx) {}; // Enter a parse tree produced by FHIRPathParser#qualifiedIdentifier.


FHIRPathListener.prototype.enterQualifiedIdentifier = function (ctx) {}; // Exit a parse tree produced by FHIRPathParser#qualifiedIdentifier.


FHIRPathListener.prototype.exitQualifiedIdentifier = function (ctx) {}; // Enter a parse tree produced by FHIRPathParser#identifier.


FHIRPathListener.prototype.enterIdentifier = function (ctx) {}; // Exit a parse tree produced by FHIRPathParser#identifier.


FHIRPathListener.prototype.exitIdentifier = function (ctx) {};

exports.FHIRPathListener = FHIRPathListener;

/***/ }),
/* 52 */
/***/ (function(module, exports, __webpack_require__) {

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

// This file holds utility functions used in implementing the public functions.
var util = {};

var types = __webpack_require__(53);

var ResourceNode = types.ResourceNode;
/**
 *  Reports and error to the calling environment and stops processing.
 * @param message the error message
 * @param fnName the name of the function raising the error (optional)
 */

util.raiseError = function (message, fnName) {
  fnName = fnName ? fnName + ": " : "";
  throw fnName + message;
};
/**
 *  Throws an exception if the collection contains more than one value.
 * @param collection the collection to be checked.
 * @param errorMsgPrefix An optional prefix for the error message to assist in
 *  debugging.
 */


util.assertAtMostOne = function (collection, errorMsgPrefix) {
  if (collection.length > 1) {
    util.raiseError("Was expecting no more than one element but got " + JSON.stringify(collection), errorMsgPrefix);
  }
};
/**
 *  Throws an exception if the data is not one of the expected types.
 * @param data the value to be checked.  This may be a ResourceNode.
 * @param types an array of the permitted types
 * @param errorMsgPrefix An optional prefix for the error message to assist in
 *  debugging.
 * @return the value that was checked.  If "data" was a ResourceNode, this will
 *  be the ReourceNode's data.
 */


util.assertType = function (data, types, errorMsgPrefix) {
  var val = this.valData(data);

  if (types.indexOf(_typeof(val)) < 0) {
    var typeList = types.length > 1 ? "one of " + types.join(", ") : types[0];
    util.raiseError("Found type '" + _typeof(data) + "' but was expecting " + typeList, errorMsgPrefix);
  }

  return val;
};

util.isEmpty = function (x) {
  return Array.isArray(x) && x.length == 0;
};

util.isSome = function (x) {
  return x !== null && x !== undefined && !util.isEmpty(x);
};

util.isTrue = function (x) {
  return x !== null && x !== undefined && (x === true || x.length == 1 && x[0] === true);
};

util.isFalse = function (x) {
  return x !== null && x !== undefined && (x === false || x.length == 1 && x[0] === false);
};

util.isCapitalized = function (x) {
  return x && x[0] === x[0].toUpperCase();
};

util.flatten = function (x) {
  return x.reduce(function (acc, x) {
    if (Array.isArray(x)) {
      // todo replace with array modification
      acc = acc.concat(x);
    } else {
      acc.push(x);
    }

    return acc;
  }, []);
};

util.arraify = function (x) {
  if (Array.isArray(x)) {
    return x;
  }

  if (util.isSome(x)) {
    return [x];
  }

  return [];
};
/**
 *  Returns the data value of the given parameter, which might be a ResourceNode.
 *  Otherwise, it returns the value that was passed in.
 */


util.valData = function (val) {
  return val instanceof ResourceNode ? val.data : val;
};
/**
 * Prepares a string for insertion into a regular expression
 * @param {string} str
 * @return {string}
 */


util.escapeStringForRegExp = function (str) {
  return str.replace(/[-[\]{}()*+?.,\\/^$|#\s]/g, '\\$&');
};

module.exports = util;

/***/ }),
/* 53 */
/***/ (function(module, exports, __webpack_require__) {

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _get(target, property, receiver) { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get; } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(receiver); } return desc.value; }; } return _get(target, property, receiver || target); }

function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var addMinutes = __webpack_require__(54);

var ucumUtils = __webpack_require__(59).UcumLhcUtils.getInstance();

var numbers = __webpack_require__(60);

var ucumSystemUrl = 'http://unitsofmeasure.org';
var timeFormat = '[0-9][0-9](\\:[0-9][0-9](\\:[0-9][0-9](\\.[0-9]+)?)?)?(Z|(\\+|-)[0-9][0-9]\\:[0-9][0-9])?';
var timeRE = new RegExp('^T?' + timeFormat + '$');
var dateTimeRE = new RegExp('^[0-9][0-9][0-9][0-9](-[0-9][0-9](-[0-9][0-9](T' + timeFormat + ')?)?)?Z?$'); // FHIR date/time regular expressions are slightly different.  For now, we will
// stick with the FHIRPath regular expressions.
//let fhirTimeRE = /([01][0-9]|2[0-3]):[0-5][0-9]:([0-5][0-9]|60)(\.[0-9]+)?/;
//let fhirDateTimeRE =
///([0-9]([0-9]([0-9][1-9]|[1-9]0)|[1-9]00)|[1-9]000)(-(0[1-9]|1[0-2])(-(0[1-9]|[1-2][0-9]|3[0-1])(T([01][0-9]|2[0-3]):[0-5][0-9]:([0-5][0-9]|60)(\.[0-9]+)?(Z|(\+|-)((0[0-9]|1[0-3]):[0-5][0-9]|14:00)))?)?)?/;

/**
 *   Class FP_Type is the superclass for FHIRPath types that required special
 *   handling.
 */

var FP_Type = /*#__PURE__*/function () {
  function FP_Type() {
    _classCallCheck(this, FP_Type);
  }

  _createClass(FP_Type, [{
    key: "equals",

    /**
     *  Tests whether this object is equal to another.  Returns either true,
     *  false, or undefined (where in the FHIRPath specification empty would be
     *  returned).  The undefined return value indicates that the values were the
     *  same to the shared precision, but that they had differnent levels of
     *  precision.
     */
    value: function equals()
    /* otherObj */
    {
      return false;
    }
    /**
     *  Tests whether this object is equivalant to another.  Returns either true,
     *  false, or undefined (where in the FHIRPath specification empty would be
     *  returned).
     */

  }, {
    key: "equivalentTo",
    value: function equivalentTo()
    /* otherObj */
    {
      return false;
    }
  }, {
    key: "toString",
    value: function toString() {
      return this.asStr ? this.asStr : _get(_getPrototypeOf(FP_Type.prototype), "toString", this).call(this);
    }
  }, {
    key: "toJSON",
    value: function toJSON() {
      return this.toString();
    }
    /**
     *  Returns -1, 0, or 1 if this object is less then, equal to, or greater
     *  than otherObj.
     */

  }, {
    key: "compare",
    value: function compare()
    /* otherObj */
    {
      throw 'Not implemented';
    }
  }]);

  return FP_Type;
}();
/**
 *  A class for Quantities.
 */


var FP_Quantity = /*#__PURE__*/function (_FP_Type) {
  _inherits(FP_Quantity, _FP_Type);

  var _super = _createSuper(FP_Quantity);

  function FP_Quantity(value, unit) {
    var _this;

    _classCallCheck(this, FP_Quantity);

    _this = _super.call(this);
    _this.asStr = value + ' ' + unit;
    _this.value = value;
    _this.unit = unit;
    return _this;
  }

  _createClass(FP_Quantity, [{
    key: "equals",
    value: function equals(otherQuantity) {
      if (!(otherQuantity instanceof this.constructor)) {
        return false;
      }

      if (this.unit === otherQuantity.unit) {
        return numbers.isEqual(this.value, otherQuantity.value);
      } // Special year/month comparison case: 1 year = 12 month


      var compareYearsAndMonths = this._compareYearsAndMonths(otherQuantity);

      if (compareYearsAndMonths) {
        return compareYearsAndMonths.isEqual;
      } // General comparison case


      var thisQuantity = FP_Quantity.toUcumQuantity(this.value, this.unit),
          normalizedOtherQuantity = FP_Quantity.toUcumQuantity(otherQuantity.value, otherQuantity.unit),
          convResult = ucumUtils.convertUnitTo(normalizedOtherQuantity.unit, normalizedOtherQuantity.value, thisQuantity.unit);

      if (convResult.status !== 'succeeded') {
        return false;
      }

      return numbers.isEqual(thisQuantity.value, convResult.toVal);
    }
  }, {
    key: "equivalentTo",
    value: function equivalentTo(otherQuantity) {
      if (!(otherQuantity instanceof this.constructor)) {
        return false;
      }

      if (this.unit === otherQuantity.unit) {
        return numbers.isEquivalent(this.value, otherQuantity.value);
      }

      var ucumUnitCode = FP_Quantity.getEquivalentUcumUnitCode(this.unit),
          otherUcumUnitCode = FP_Quantity.getEquivalentUcumUnitCode(otherQuantity.unit),
          convResult = ucumUtils.convertUnitTo(otherUcumUnitCode, otherQuantity.value, ucumUnitCode);

      if (convResult.status !== 'succeeded') {
        return false;
      }

      return numbers.isEquivalent(this.value, convResult.toVal);
    }
    /**
     * If both quantities have one of these units: year or month,
     * then a special case will apply; otherwise returns null.
     * In the special case of comparison, the fact that 1 year = 12 months is used.
     *
     * Just note: in general, for a calendar duration:
     * 1 year = 365 days
     * 12 month = 12*30 days = 360 days
     * so, 1 year != 12 month
     * That's why this special case is needed
     *
     * @param {FP_Quantity} otherQuantity
     * @return {null|{isEqual: boolean}}
     * @private
     */

  }, {
    key: "_compareYearsAndMonths",
    value: function _compareYearsAndMonths(otherQuantity) {
      var magnitude1 = FP_Quantity._yearMonthConversionFactor[this.unit],
          magnitude2 = FP_Quantity._yearMonthConversionFactor[otherQuantity.unit];

      if (magnitude1 && magnitude2) {
        return {
          isEqual: numbers.isEqual(this.value * magnitude1, otherQuantity.value * magnitude2)
        };
      }

      return null;
    }
  }]);

  return FP_Quantity;
}(FP_Type);

var surroundingApostrophesRegex = /^'|'$/g;
/**
 * Converts a FHIR path unit to a UCUM unit code by converting a calendar duration keyword to an equivalent UCUM unit code
 * or removing single quotes for a UCUM unit.
 * @param {string} unit
 * @return {string}
 */

FP_Quantity.getEquivalentUcumUnitCode = function (unit) {
  return FP_Quantity.mapTimeUnitsToUCUMCode[unit] || unit.replace(surroundingApostrophesRegex, '');
};
/**
 * Converts FHIR path value/unit to UCUM value/unit. Usable for comparison.
 * @param {number} value
 * @param {string} unit
 * @returns { {value: number, unit: string} }
 */


FP_Quantity.toUcumQuantity = function (value, unit) {
  var magnitude = FP_Quantity._calendarDuration2Seconds[unit];

  if (magnitude) {
    return {
      value: magnitude * value,
      unit: 's'
    };
  }

  return {
    value: value,
    unit: unit.replace(surroundingApostrophesRegex, '')
  };
};
/**
 * Converts FHIRPath value/unit to other FHIRPath value/unit.
 * @param {string} fromUnit
 * @param {number} value
 * @param {string} toUnit
 * @return {FP_Quantity|null}
 */


FP_Quantity.convUnitTo = function (fromUnit, value, toUnit) {
  // 1 Year <-> 12 Months
  var fromYearMonthMagnitude = FP_Quantity._yearMonthConversionFactor[fromUnit],
      toYearMonthMagnitude = FP_Quantity._yearMonthConversionFactor[toUnit];

  if (fromYearMonthMagnitude && toYearMonthMagnitude) {
    return new FP_Quantity(fromYearMonthMagnitude * value / toYearMonthMagnitude, toUnit);
  }

  var fromMagnitude = FP_Quantity._calendarDuration2Seconds[fromUnit],
      toMagnitude = FP_Quantity._calendarDuration2Seconds[toUnit]; // To FHIR path calendar duration

  if (toMagnitude) {
    if (fromMagnitude) {
      return new FP_Quantity(fromMagnitude * value / toMagnitude, toUnit);
    } else {
      var convResult = ucumUtils.convertUnitTo(fromUnit.replace(/^'|'$/g, ''), value, 's');

      if (convResult.status === 'succeeded') {
        return new FP_Quantity(convResult.toVal / toMagnitude, toUnit);
      }
    } // To Ucum unit

  } else {
    var _convResult = fromMagnitude ? ucumUtils.convertUnitTo('s', fromMagnitude * value, toUnit.replace(/^'|'$/g, '')) : ucumUtils.convertUnitTo(fromUnit.replace(/^'|'$/g, ''), value, toUnit.replace(/^'|'$/g, ''));

    if (_convResult.status === 'succeeded') {
      return new FP_Quantity(_convResult.toVal, toUnit);
    }
  }

  return null;
}; // Defines conversion factors for calendar durations


FP_Quantity._calendarDuration2Seconds = {
  'years': 365 * 24 * 60 * 60,
  'months': 30 * 24 * 60 * 60,
  'weeks': 7 * 24 * 60 * 60,
  'days': 24 * 60 * 60,
  'hours': 60 * 60,
  'minutes': 60,
  'seconds': 1,
  'milliseconds': .001,
  'year': 365 * 24 * 60 * 60,
  'month': 30 * 24 * 60 * 60,
  'week': 7 * 24 * 60 * 60,
  'day': 24 * 60 * 60,
  'hour': 60 * 60,
  'minute': 60,
  'second': 1,
  'millisecond': .001
}; // Defines special case to compare years with months for calendar durations

FP_Quantity._yearMonthConversionFactor = {
  'years': 12,
  'months': 1,
  'year': 12,
  'month': 1
};
/**
 *  Defines a map from FHIRPath time units to UCUM.
 */

FP_Quantity.timeUnitsToUCUM = {
  'years': "'a'",
  'months': "'mo'",
  'weeks': "'wk'",
  'days': "'d'",
  'hours': "'h'",
  'minutes': "'min'",
  'seconds': "'s'",
  'milliseconds': "'ms'",
  'year': "'a'",
  'month': "'mo'",
  'week': "'wk'",
  'day': "'d'",
  'hour': "'h'",
  'minute': "'min'",
  'second': "'s'",
  'millisecond': "'ms'",
  "'a'": "'a'",
  "'mo'": "'mo'",
  "'wk'": "'wk'",
  "'d'": "'d'",
  "'h'": "'h'",
  "'min'": "'min'",
  "'s'": "'s'",
  "'ms'": "'ms'"
};
/**
 *  Defines a map from UCUM code to FHIRPath time units.
 */

FP_Quantity.mapUCUMCodeToTimeUnits = {
  'a': "year",
  'mo': "month",
  'wk': "week",
  'd': "day",
  'h': "hour",
  'min': "minute",
  's': "second",
  'ms': "millisecond"
};
/**
 *  Defines a map from FHIRPath time units to UCUM code.
 */

FP_Quantity.mapTimeUnitsToUCUMCode = Object.keys(FP_Quantity.mapUCUMCodeToTimeUnits).reduce(function (res, key) {
  res[FP_Quantity.mapUCUMCodeToTimeUnits[key]] = key;
  res[FP_Quantity.mapUCUMCodeToTimeUnits[key] + 's'] = key;
  return res;
}, {});
/**
 *  A map of the UCUM units that must be paired with integer values when doing
 *  arithmetic.
 */

FP_Quantity.integerUnits = {
  "'a'": true,
  "'mo'": true,
  "'wk'": true,
  "'d'": true,
  "'h'": true,
  "'min'": true
};

var FP_TimeBase = /*#__PURE__*/function (_FP_Type2) {
  _inherits(FP_TimeBase, _FP_Type2);

  var _super2 = _createSuper(FP_TimeBase);

  function FP_TimeBase(timeStr) {
    var _this2;

    _classCallCheck(this, FP_TimeBase);

    _this2 = _super2.call(this);
    _this2.asStr = timeStr;
    return _this2;
  }
  /**
   *  Adds a time-based quantity to this date/time.
   * @param timeQuantity a quantity to be added to this date/time.  See the
   *  FHIRPath specification for supported units.
   */


  _createClass(FP_TimeBase, [{
    key: "plus",
    value: function plus(timeQuantity) {
      var unit = timeQuantity.unit;
      var ucumUnit = FP_Quantity.timeUnitsToUCUM[unit];

      if (!ucumUnit) {
        throw new Error('For date/time arithmetic, the unit of the quantity ' + 'must be a recognized time-based unit');
      }

      var cls = this.constructor;
      var unitPrecision = cls._ucumToDatePrecision[ucumUnit];

      if (unitPrecision === undefined) {
        throw new Error('Unsupported unit for +.  The unit should be one of ' + Object.keys(cls._ucumToDatePrecision).join(', ') + '.');
      }

      var isIntUnit = FP_Quantity.integerUnits[ucumUnit];
      var qVal = timeQuantity.value;

      if (isIntUnit && !Number.isInteger(qVal)) {
        throw new Error('When adding a quantity of unit ' + unit + ' to a date/time,' + ' the value must be an integer.');
      } // If the precision of the time quantity is higher than the precision of the
      // date, we need to convert the time quantity to the precision of the date.


      if (this._getPrecision() < unitPrecision) {
        var unquotedUnit = ucumUnit.slice(1, ucumUnit.length - 1);

        var neededUnit = cls._datePrecisionToUnquotedUcum[this._getPrecision()];

        var convResult = ucumUtils.convertUnitTo(unquotedUnit, qVal, neededUnit);

        if (convResult.status != 'succeeded') {
          throw new Error(convResult.msg.join("\n"));
        }

        ucumUnit = "'" + neededUnit + "'";
        qVal = Math.floor(convResult.toVal);
      }

      var newDate = FP_TimeBase.timeUnitToAddFn[ucumUnit](this._getDateObj(), qVal); // newDate is a Date.  We need to make a string with the correct precision.

      var isTime = cls === FP_Time;

      var precision = this._getPrecision();

      if (isTime) precision += 3; // based on dateTimeRE, not timeRE

      var newDateStr = FP_DateTime.isoDateTime(newDate, precision);

      if (isTime) {
        // FP_Time just needs the time part of the string
        newDateStr = newDateStr.slice(newDateStr.indexOf('T') + 1);
      }

      return new cls(newDateStr);
    }
    /**
     *  Tests whether this object is equal to another.  Returns either true,
     *  false, or undefined (where in the FHIRPath specification empty would be
     *  returned).  The undefined return value indicates that the values were the
     *  same to the shared precision, but that they had differnent levels of
     *  precision.
     * @param otherDateTime any sub-type of FP_TimeBase, but it should be the same
     *  as the type of "this".
     */

  }, {
    key: "equals",
    value: function equals(otherDateTime) {
      // From the 2019May ballot:
      // For Date, DateTime and Time equality, the comparison is performed by
      // considering each precision in order, beginning with years (or hours for
      // time values), and respecting timezone offsets. If the values are the
      // same, comparison proceeds to the next precision; if the values are
      // different, the comparison stops and the result is false. If one input has
      // a value for the precision and the other does not, the comparison stops
      // and the result is empty ({ }); if neither input has a value for the
      // precision, or the last precision has been reached, the comparison stops
      // and the result is true.
      // Note:  Per the spec above
      //   2012-01 = 2012 //  empty
      //   2012-01 = 2011 //  false
      //   2012-01 ~ 2012 //  false
      var rtn;
      if (!(otherDateTime instanceof this.constructor)) rtn = false;else {
        var thisPrec = this._getPrecision();

        var otherPrec = otherDateTime._getPrecision();

        if (thisPrec == otherPrec) {
          rtn = this._getDateObj().getTime() == otherDateTime._getDateObj().getTime();
        } else {
          // The dates are not equal, but decide whether to return empty or false.
          var commonPrec = thisPrec <= otherPrec ? thisPrec : otherPrec; // Adjust for timezone offsets, if any, so they are at a common timezone

          var thisUTCStr = this._getDateObj().toISOString();

          var otherUTCStr = otherDateTime._getDateObj().toISOString();

          if (this.constructor === FP_Time) {
            commonPrec += 3; // because we now have year, month, and day

            thisPrec += 3;
            otherPrec += 3;
          } // Now parse the strings and compare the adjusted time parts.
          // Dates without time specify no timezone and should be treated as already normalized to UTC. So we do not adjust the timezone, as this would change the date


          var thisAdj = thisPrec > 2 ? new FP_DateTime(thisUTCStr)._getTimeParts() : this._getTimeParts();
          var otherAdj = otherPrec > 2 ? new FP_DateTime(otherUTCStr)._getTimeParts() : otherDateTime._getTimeParts();

          for (var i = 0; i <= commonPrec && rtn !== false; ++i) {
            rtn = thisAdj[i] == otherAdj[i];
          } // if rtn is still true, then return empty to indicate the difference in
          // precision.


          if (rtn) rtn = undefined;
        }
      } // else return undefined (empty)

      return rtn;
    }
    /**
     *  Tests whether this object is equivalant to another.  Returns either true
     *  or false.
     */

  }, {
    key: "equivalentTo",
    value: function equivalentTo(otherDateTime) {
      var rtn = otherDateTime instanceof this.constructor;

      if (rtn) {
        var thisPrec = this._getPrecision();

        var otherPrec = otherDateTime._getPrecision();

        rtn = thisPrec == otherPrec;

        if (rtn) {
          rtn = this._getDateObj().getTime() == otherDateTime._getDateObj().getTime();
        }
      }

      return rtn;
    }
    /**
     *  Returns a number less than 0, equal to 0 or greater than 0
     *  if this (date) time is less than, equal to, or greater than otherTime.
     *  Comparisons are made at the lesser of the two time precisions.
     *  @param {FP_TimeBase} otherTime
     *  @return {number}
     */

  }, {
    key: "compare",
    value: function compare(otherTime) {
      var thisPrecision = this._getPrecision();

      var otherPrecision = otherTime._getPrecision();

      var thisTimeInt = thisPrecision <= otherPrecision ? this._getDateObj().getTime() : this._dateAtPrecision(otherPrecision).getTime();
      var otherTimeInt = otherPrecision <= thisPrecision ? otherTime._getDateObj().getTime() : otherTime._dateAtPrecision(thisPrecision).getTime();

      if (thisPrecision !== otherPrecision && thisTimeInt === otherTimeInt) {
        return null;
      }

      return thisTimeInt - otherTimeInt;
    }
    /**
     *  Returns a number representing the precision of the time string given to
     *  the constructor.  (Higher means more precise).  The number is the number
     *  of components of the time string (ignoring the time zone) produced by
     *  matching against the time regular expression, except that milliseconds
     *  and seconds are counted together as a single of level of precision.
     *  @return {number}
     */

  }, {
    key: "_getPrecision",
    value: function _getPrecision() {
      if (this.precision === undefined) this._getMatchData();
      return this.precision;
    }
    /**
     *  Returns the match data from matching the given RegExp against the
     *  date/time string given to the constructor.
     *  Also sets this.precision.
     * @param regEx The regular expression to match against the date/time string.
     * @param maxPrecision the maximum precision possible for the type
     */

  }, {
    key: "_getMatchData",
    value: function _getMatchData(regEx, maxPrecision) {
      if (this.timeMatchData === undefined) {
        this.timeMatchData = this.asStr.match(regEx);

        if (this.timeMatchData) {
          for (var i = maxPrecision; i >= 0 && this.precision === undefined; --i) {
            if (this.timeMatchData[i]) this.precision = i;
          }
        }
      }

      return this.timeMatchData;
    }
    /**
     *  Returns an array of the pieces of the given time string, for use in
     *  constructing lower precision versions of the time. The returned array will
     *  contain separate elements for the hour, minutes, seconds, and milliseconds
     *  (or as many of those are as present).  The length of the returned array
     *  will therefore be an indication of the precision.
     *  It will not include the timezone.
     * @timeMatchData the result of matching the time portion of the string passed
     *  into the constructor against the "timeRE" regular expression.
     */

  }, {
    key: "_getTimeParts",
    value: function _getTimeParts(timeMatchData) {
      var timeParts = []; // Finish parsing the data into pieces, for later use in building
      // lower-precision versions of the date if needed.

      timeParts = [timeMatchData[0]];
      var timeZone = timeMatchData[4];

      if (timeZone) {
        // remove time zone from hours
        var hours = timeParts[0];
        timeParts[0] = hours.slice(0, hours.length - timeZone.length);
      }

      var min = timeMatchData[1];

      if (min) {
        // remove minutes from hours
        var _hours = timeParts[0];
        timeParts[0] = _hours.slice(0, _hours.length - min.length);
        timeParts[1] = min;
        var sec = timeMatchData[2];

        if (sec) {
          // remove seconds from minutes
          timeParts[1] = min.slice(0, min.length - sec.length);
          timeParts[2] = sec;
          var ms = timeMatchData[3];

          if (ms) {
            // remove milliseconds from seconds
            timeParts[2] = sec.slice(0, sec.length - ms.length);
            timeParts[3] = ms;
          }
        }
      }

      return timeParts;
    }
    /**
     *  Returns a date object representing this time on a certain date.
     */

  }, {
    key: "_getDateObj",
    value: function _getDateObj() {
      if (!this.dateObj) {
        var precision = this._getPrecision(); // We cannot directly pass the string into the date constructor because
        // (1) we don't want to introduce a time-dependent system date and (2) the
        // time string might not have contained minutes, which are required by the
        // Date constructor.


        this.dateObj = this._dateAtPrecision(precision);
      }

      return this.dateObj;
    }
    /**
     *  Creates a date object for the given timezone.  The returned date object
     *  will have the specified date and time in the specified timezone.
     * @param year...ms Just as in the Date constructor.
     * @param timezoneOffset (optional) a string in the format (+-)HH:mm or Z, representing the
     *  timezone offset.  If not provided, the local timzone will be assumed (as the
     *  Date constructor does).
     */

  }, {
    key: "_createDate",
    value: function _createDate(year, month, day, hour, minutes, seconds, ms, timezoneOffset) {
      var d = new Date(year, month, day, hour, minutes, seconds, ms);

      if (timezoneOffset) {
        // d is in local time.  Adjust for the timezone offset.
        // First adjust the date by the timezone offset before reducing its
        // precision.  Otherwise,
        // @2018-11-01T-04:00 < @2018T-05:00
        var localTimezoneMinutes = d.getTimezoneOffset();
        var timezoneMinutes = 0; // if Z

        if (timezoneOffset != 'Z') {
          var timezoneParts = timezoneOffset.split(':'); // (+-)hours:minutes

          var hours = parseInt(timezoneParts[0]);
          timezoneMinutes = parseInt(timezoneParts[1]);
          if (hours < 0) timezoneMinutes = -timezoneMinutes;
          timezoneMinutes += 60 * hours;
        } // localTimezoneMinutes has the inverse sign of its timezone offset


        d = addMinutes(d, -localTimezoneMinutes - timezoneMinutes);
      }

      return d;
    }
  }]);

  return FP_TimeBase;
}(FP_Type);
/**
 *  A map from a UCUM time based unit to a function used to add that quantity to
 *  a date/time.
 */


FP_TimeBase.timeUnitToAddFn = {
  "'a'": __webpack_require__(61),
  "'mo'": __webpack_require__(62),
  "'wk'": __webpack_require__(64),
  "'d'": __webpack_require__(65),
  "'h'": __webpack_require__(66),
  "'min'": __webpack_require__(54),
  "'s'": __webpack_require__(67),
  "'ms'": __webpack_require__(55)
};

var FP_DateTime = /*#__PURE__*/function (_FP_TimeBase) {
  _inherits(FP_DateTime, _FP_TimeBase);

  var _super3 = _createSuper(FP_DateTime);

  /**
   *  Constructs an FP_DateTime, assuming dateStr is valid.  If you don't know
   *  whether a string is a valid DateTime, use FP_DateTime.checkString instead.
   */
  function FP_DateTime(dateStr) {
    _classCallCheck(this, FP_DateTime);

    return _super3.call(this, dateStr);
  }
  /**
   *  Returns -1, 0, or 1 if this date time is less then, equal to, or greater
   *  than otherDateTime.  Comparisons are made at the lesser of the two date time
   *  precisions.
   */


  _createClass(FP_DateTime, [{
    key: "compare",
    value: function compare(otherDateTime) {
      if (!(otherDateTime instanceof FP_DateTime)) throw 'Invalid comparison of a DateTime with something else';
      return _get(_getPrototypeOf(FP_DateTime.prototype), "compare", this).call(this, otherDateTime);
    }
    /**
     *  Returns the match data from matching timeRE against the time string.
     *  Also sets this.precision.
     */

  }, {
    key: "_getMatchData",
    value: function _getMatchData() {
      return _get(_getPrototypeOf(FP_DateTime.prototype), "_getMatchData", this).call(this, dateTimeRE, 5);
    }
    /**
     *  Returns an array of the pieces of the date time string passed into the
     *  constructor, for use in constructing lower precision versions of the
     *  date time. The returned array will contain separate elements for the year,
     *  month, day, hour, minutes, seconds, and milliseconds (or as many of those
     *  are as present).  The length of the returned array will therefore be an
     *  indication of the precision.  It will not include the timezone.
     */

  }, {
    key: "_getTimeParts",
    value: function _getTimeParts() {
      if (!this.timeParts) {
        var timeMatchData = this._getMatchData();

        var year = timeMatchData[0];
        this.timeParts = [year];
        var month = timeMatchData[1];

        if (month) {
          // Remove other information from year
          this.timeParts[0] = year.slice(0, year.length - month.length);
          this.timeParts[1] = month;
          var day = timeMatchData[2];

          if (day) {
            // Remove day information from month
            this.timeParts[1] = month.slice(0, month.length - day.length);
            this.timeParts[2] = day;
            var time = timeMatchData[3];

            if (time) {
              // Remove time from day
              this.timeParts[2] = day.slice(0, day.length - time.length);
              if (time[0] === 'T') // remove T from hour
                timeMatchData[3] = time.slice(1);
              this.timeParts = this.timeParts.concat(_get(_getPrototypeOf(FP_DateTime.prototype), "_getTimeParts", this).call(this, timeMatchData.slice(3)));
            }
          }
        }
      }

      return this.timeParts;
    }
    /**
     *  Returns a new Date object for a time equal to what this time would be if
     *  the string passed into the constructor had the given precision.
     * @param precision the new precision, which is assumed to be less than
     *  or equal to the current precision.
     */

  }, {
    key: "_dateAtPrecision",
    value: function _dateAtPrecision(precision) {
      var timeParts = this._getTimeParts();

      var timezoneOffset = this._getMatchData()[7]; // Get the date object first at the current precision.


      var thisPrecision = this._getPrecision();

      var year = parseInt(timeParts[0]);
      var month = thisPrecision > 0 ? parseInt(timeParts[1].slice(1)) - 1 : 0;
      var day = thisPrecision > 1 ? parseInt(timeParts[2].slice(1)) : 1;
      var hour = thisPrecision > 2 ? parseInt(timeParts[3]) : 0;
      var minutes = thisPrecision > 3 ? parseInt(timeParts[4].slice(1)) : 0;
      var seconds = thisPrecision > 4 ? parseInt(timeParts[5].slice(1)) : 0;
      var ms = timeParts.length > 6 ? parseInt(timeParts[6].slice(1)) : 0;

      var d = this._createDate(year, month, day, hour, minutes, seconds, ms, timezoneOffset);

      if (precision < thisPrecision) {
        // Adjust the precision
        year = d.getFullYear();
        month = precision > 0 ? d.getMonth() : 0;
        day = precision > 1 ? d.getDate() : 1;
        hour = precision > 2 ? d.getHours() : 0;
        minutes = precision > 3 ? d.getMinutes() : 0; // Here the precision will always be less than the maximum
        // due to the condition in the if statement: "precision < thisPrecision"

        d = new Date(year, month, day, hour, minutes);
      }

      return d;
    }
  }]);

  return FP_DateTime;
}(FP_TimeBase);
/**
 *  Tests str to see if it is convertible to a DateTime.
 * @return If str is convertible to a DateTime, returns an FP_DateTime;
 *  otherwise returns null.
 */


FP_DateTime.checkString = function (str) {
  var d = new FP_DateTime(str);
  if (!d._getMatchData()) d = null;
  return d;
};
/**
 *  A map from UCUM units (in quotation marks, which is the FHIRPath syntax for
 *  UCUM) to the internal DateTime "precision" number.
 */


FP_DateTime._ucumToDatePrecision = {
  "'a'": 0,
  "'mo'": 1,
  "'wk'": 2,
  // wk is just 7*d
  "'d'": 2,
  "'h'": 3,
  "'min'": 4,
  "'s'": 5,
  "'ms'": 6
};
/**
 *  The inverse of _ucumToDatePrecision, except with unquoted UCUM units.
 */

FP_DateTime._datePrecisionToUnquotedUcum = ["a", "mo", "d", "h", "min", "s", "ms"];

var FP_Time = /*#__PURE__*/function (_FP_TimeBase2) {
  _inherits(FP_Time, _FP_TimeBase2);

  var _super4 = _createSuper(FP_Time);

  /**
   *  Constructs an FP_Time, assuming dateStr is valid.  If you don't know
   *  whether a string is a valid DateTime, use FP_Time.checkString instead.
   */
  function FP_Time(timeStr) {
    _classCallCheck(this, FP_Time);

    if (timeStr[0] == 'T') timeStr = timeStr.slice(1);
    return _super4.call(this, timeStr);
  }
  /**
   *  Returns -1, 0, or 1 if this time is less then, equal to, or greater
   *  than otherTime.  Comparisons are made at the lesser of the two time
   *  precisions.
   */


  _createClass(FP_Time, [{
    key: "compare",
    value: function compare(otherTime) {
      if (!(otherTime instanceof FP_Time)) throw 'Invalid comparison of a time with something else';
      return _get(_getPrototypeOf(FP_Time.prototype), "compare", this).call(this, otherTime);
    }
    /**
     *  Returns a new Date object for a time equal to what this time would be if
     *  the string passed into the constructor had the given precision.
     *  The "date" portion of the returned Date object is not meaningful, and
     *  should be ignored.
     * @param precision the new precision, which is assumed to be less than the
     *  or equal to the current precision.  A precision of 0 means the hour.
     */

  }, {
    key: "_dateAtPrecision",
    value: function _dateAtPrecision(precision) {
      var timeParts = this._getTimeParts();

      var timezoneOffset = this._getMatchData()[4]; // Get the date object first at the current precision.


      var thisPrecision = this._getPrecision();

      var year = 2010; // Have to pick some year for the date object

      var month = 0;
      var day = 1;
      var hour = parseInt(timeParts[0]);
      var minutes = thisPrecision > 0 ? parseInt(timeParts[1].slice(1)) : 0;
      var seconds = thisPrecision > 1 ? parseInt(timeParts[2].slice(1)) : 0;
      var ms = timeParts.length > 3 ? parseInt(timeParts[3].slice(1)) : 0;

      var d = this._createDate(year, month, day, hour, minutes, seconds, ms, timezoneOffset);

      if (timezoneOffset) {
        // Keep the date the same (in the local timezone), so it is not a relevant
        // factor when comparing different times.
        d.setYear(year);
        d.setMonth(month);
        d.setDate(day);
      }

      if (precision < thisPrecision) {
        // Adjust the precision
        hour = d.getHours();
        minutes = precision > 0 ? d.getMinutes() : 0; // Here the precision will always be less than the maximum
        // due to the condition in the if statement: "precision < thisPrecision"

        d = new Date(year, month, day, hour, minutes);
      }

      return d;
    }
    /**
     *  Returns the match data from matching timeRE against the time string.
     *  Also sets this.precision.
     */

  }, {
    key: "_getMatchData",
    value: function _getMatchData() {
      return _get(_getPrototypeOf(FP_Time.prototype), "_getMatchData", this).call(this, timeRE, 2);
    }
    /**
     *  Returns an array of the pieces of the time string passed into the
     *  constructor, for use in constructing lower precision versions of the
     *  time. The returned array will contain separate elements for the hour,
     *  minutes, seconds, and milliseconds (or as many of those are as present).
     *  The length of the returned array will therefore be an indication of the
     *  precision.  It will not include the timezone.
     */

  }, {
    key: "_getTimeParts",
    value: function _getTimeParts() {
      if (!this.timeParts) {
        this.timeParts = _get(_getPrototypeOf(FP_Time.prototype), "_getTimeParts", this).call(this, this._getMatchData());
      }

      return this.timeParts;
    }
  }]);

  return FP_Time;
}(FP_TimeBase);
/**
 *  Tests str to see if it is convertible to a Time.
 * @return If str is convertible to a Time, returns an FP_Time;
 *  otherwise returns null.
 */


FP_Time.checkString = function (str) {
  var d = new FP_Time(str);
  if (!d._getMatchData()) d = null;
  return d;
};
/**
 *  A map from UCUM units (in quotation marks, which is the FHIRPath syntax for
 *  UCUM) to the internal DateTime "precision" number.
 */


FP_Time._ucumToDatePrecision = {
  "'h'": 0,
  "'min'": 1,
  "'s'": 2,
  "'ms'": 3
};
/**
 *  The inverse of _ucumToDatePrecision, except with unquoted UCUM units.
 */

FP_Time._datePrecisionToUnquotedUcum = ["h", "min", "s", "ms"];
/**
 *  Returns either the given number or a string with the number prefixed by
 *  zeros if the given number is less than the given length.
 * @param num the nubmer to format
 * @param len the number of returned digits.  For now this must either be 2 or
 *  3. (Optional-- default is 2).
 */

function formatNum(num, len) {
  // Could use String.repeat, but that requires convertin num to an string first
  // to get its length.  This might be slightly faster given that we only need 2
  // or three 3 digit return values.
  var rtn = num;
  if (len === 3 && num < 100) rtn = '0' + num;
  if (num < 10) rtn = '0' + rtn;
  return rtn;
}
/**
 *  Formats the given date object into an ISO8601 datetime string, expressing it
 *  in the local timezone.
 * @date the date to format
 * @precision the precision at which to terminate string string.  (This is
 *  optional). If present, it will be an integer into the matching components of
 *  dateTimeRE.
 * @return a string in ISO8601 format.
 */


FP_DateTime.isoDateTime = function (date, precision) {
  if (precision === undefined) precision = 6; // maximum
  // YYYY-MM-DDTHH:mm:ss.sss[+-]HH:mm
  // Note:  Date.toISOString sets the timezone at 'Z', which I did not want.
  // Actually, I wanted to keep the original timezone given in the constructor,
  // but that is difficult due to daylight savings time changes.  (For instance,
  // if you add 6 months, the timezone offset could change).

  var rtn = '' + date.getFullYear();

  if (precision > 0) {
    rtn += '-' + formatNum(date.getMonth() + 1);

    if (precision > 1) {
      rtn += '-' + formatNum(date.getDate());

      if (precision > 2) {
        rtn += 'T' + formatNum(date.getHours());

        if (precision > 3) {
          rtn += ':' + formatNum(date.getMinutes());

          if (precision > 4) {
            rtn += ':' + formatNum(date.getSeconds());
            if (precision > 5) rtn += '.' + formatNum(date.getMilliseconds(), 3);
          }
        }
      }
    }
  } // FHIRPath STU1 does not allow a timezone offset on a dateTime that does not
  // have a time part (except that the grammar allows 'Z', which is
  // inconsistent).


  if (precision > 2) {
    // Note:  getTimezoneoffset returns the offset for the local system at the
    // given date.
    var tzOffset = date.getTimezoneOffset(); // tzOffset is a number of minutes, and is positive for negative timezones,
    // and negative for positive timezones.

    var tzSign = tzOffset < 0 ? '+' : '-';
    tzOffset = Math.abs(tzOffset);
    var tzMin = tzOffset % 60;
    var tzHour = (tzOffset - tzMin) / 60;
    rtn += tzSign + formatNum(tzHour) + ':' + formatNum(tzMin);
  }

  return rtn;
};
/**
 *  Returns a date string in ISO format at the given precision level.
 * @date the date to format
 * @precision the precision at which to terminate string string.  (This is
 *  optional). If present, it will be an integer into the matching components of
 *  dateTimeRE.
 * @return a string in ISO8601 format.
 */


FP_DateTime.isoDate = function (date, precision) {
  if (precision === undefined || precision > 2) precision = 2;
  return FP_DateTime.isoDateTime(date, precision);
};
/**
 *  A class that represents a node in a FHIR resource, with path and possibly type
 *  information.
 */


var ResourceNode = /*#__PURE__*/function () {
  /**
   *  Constructs a instance for the given node ("data") of a resource.  If the
   *  data is the top-level node of a resouce, the path and type parameters will
   *  be ignored in favor of the resource's resourceType field.
   * @param data the node's data or value (which might be an object with
   *  sub-nodes, an array, or FHIR data type)
   * @param path the node's path in the resource (e.g. Patient.name).  If the
   *  data's type can be determined from data, that will take precedence over
   *  this parameter.
   * @param _data additional data stored in a property named with "_" prepended,
   *  see https://www.hl7.org/fhir/element.html#json for details.
   */
  function ResourceNode(data, path, _data) {
    _classCallCheck(this, ResourceNode);

    // If data is a resource (maybe a contained resource) reset the path
    // information to the resource type.
    if (data.resourceType) path = data.resourceType;
    this.path = path;
    this.data = getResourceNodeData(data, path);
    this._data = _data || {};
  }
  /**
   * Returns resource node type info.
   * @return {TypeInfo}
   */


  _createClass(ResourceNode, [{
    key: "getTypeInfo",
    value: function getTypeInfo() {
      var namespace = TypeInfo.FHIR; // TODO: Here we should use property index which we will extract from the specification

      if (this.path.indexOf('.') === -1) {
        return new TypeInfo({
          namespace: namespace,
          name: this.path
        });
      }

      return TypeInfo.createByValueInNamespace({
        namespace: namespace,
        value: this.data
      });
    }
  }, {
    key: "toJSON",
    value: function toJSON() {
      return JSON.stringify(this.data);
    }
  }]);

  return ResourceNode;
}();
/**
 * Prepare data for ResourceNode:
 * Converts value from FHIR Quantity to FHIRPath System.Quantity.
 * The Mapping from FHIR Quantity to FHIRPath System.Quantity is explained here:
 * https://www.hl7.org/fhir/fhirpath.html#quantity
 * @param {Object|...} data
 * @param {string} path
 * @return {FP_Quantity|Object|...}
 */


function getResourceNodeData(data, path) {
  if (path === 'Quantity' && data.system === ucumSystemUrl) {
    if (typeof data.value === 'number' && typeof data.code === 'string') {
      data = new FP_Quantity(data.value, FP_Quantity.mapUCUMCodeToTimeUnits[data.code] || '\'' + data.code + '\'');
    }
  }

  return data;
}
/**
 *  Returns a ResourceNode for the given data node, checking first to see if the
 *  given node is already a ResourceNode.  Takes the same arguments as the
 *  constructor for ResourceNode.
 */


ResourceNode.makeResNode = function (data, path, _data) {
  return data instanceof ResourceNode ? data : new ResourceNode(data, path, _data);
};
/**
 * Object class defining type information.
 * Used for minimal type support.
 * (see http://hl7.org/fhirpath/#types-and-reflection)
 */


var TypeInfo = /*#__PURE__*/function () {
  function TypeInfo(_ref) {
    var name = _ref.name,
        namespace = _ref.namespace;

    _classCallCheck(this, TypeInfo);

    this.name = name;
    this.namespace = namespace;
  }
  /**
   * Checks for equality with another TypeInfo object, or that another TypeInfo
   * object specifies a superclass for the type specified by this object.
   * @param {TypeInfo} other
   * @return {boolean}
   */


  _createClass(TypeInfo, [{
    key: "is",
    value: function is(other) {
      // TODO: Here we should use type hierarchy index which we will extract from the specification
      return other instanceof TypeInfo && this.name === other.name && (!this.namespace || !other.namespace || this.namespace === other.namespace);
    }
  }]);

  return TypeInfo;
}(); // Available namespaces:


TypeInfo.System = 'System';
TypeInfo.FHIR = 'FHIR';
/**
 * Creates new TypeInfo object for specified namespace and value
 * @param {String} namespace
 * @param {*} value
 * @return {TypeInfo}
 */

TypeInfo.createByValueInNamespace = function (_ref2) {
  var namespace = _ref2.namespace,
      value = _ref2.value;

  var name = _typeof(value);

  if (Number.isInteger(value)) {
    name = 'integer';
  } else if (name === "number") {
    name = 'decimal';
  } else if (value instanceof FP_DateTime) {
    name = 'dateTime';
  } else if (value instanceof FP_Time) {
    name = 'time';
  } else if (value instanceof FP_Quantity) {
    name = 'Quantity';
  }

  if (namespace === TypeInfo.System) {
    name = name.replace(/^\w/, function (c) {
      return c.toUpperCase();
    });
  } // TODO: currently can return name = 'object" or "Object" which is probably wrong


  return new TypeInfo({
    namespace: namespace,
    name: name
  });
};
/**
 * Retrieves TypeInfo by value
 * @param {*} value
 * @return {TypeInfo}
 */


TypeInfo.fromValue = function (value) {
  return value instanceof ResourceNode ? value.getTypeInfo() : TypeInfo.createByValueInNamespace({
    namespace: TypeInfo.System,
    value: value
  });
};
/**
 * Basic "type()" function implementation
 * (see http://hl7.org/fhirpath/#reflection)
 * @param {Array<*>} coll - input collection
 * @return {Array<*>}
 */


function typeFn(coll) {
  return coll.map(function (value) {
    return TypeInfo.fromValue(value);
  });
}
/**
 * Implementation of function "is(type : type specifier)" and operator "is"
 * (see http://hl7.org/fhirpath/#is-type-specifier)
 * @param {Array<*>} coll - input collection
 * @param {TypeInfo} typeInfo
 * @return {boolean|[]}
 */


function isFn(coll, typeInfo) {
  if (coll.length === 0) {
    return [];
  }

  if (coll.length > 1) {
    throw new Error("Expected singleton on left side of is, got " + JSON.stringify(coll));
  }

  return TypeInfo.fromValue(coll[0]).is(typeInfo);
}

module.exports = {
  FP_Type: FP_Type,
  FP_TimeBase: FP_TimeBase,
  FP_DateTime: FP_DateTime,
  FP_Time: FP_Time,
  FP_Quantity: FP_Quantity,
  timeRE: timeRE,
  dateTimeRE: dateTimeRE,
  ResourceNode: ResourceNode,
  TypeInfo: TypeInfo,
  typeFn: typeFn,
  isFn: isFn
};

/***/ }),
/* 54 */
/***/ (function(module, exports, __webpack_require__) {

var addMilliseconds = __webpack_require__(55);

var MILLISECONDS_IN_MINUTE = 60000;
/**
 * @category Minute Helpers
 * @summary Add the specified number of minutes to the given date.
 *
 * @description
 * Add the specified number of minutes to the given date.
 *
 * @param {Date|String|Number} date - the date to be changed
 * @param {Number} amount - the amount of minutes to be added
 * @returns {Date} the new date with the minutes added
 *
 * @example
 * // Add 30 minutes to 10 July 2014 12:00:00:
 * var result = addMinutes(new Date(2014, 6, 10, 12, 0), 30)
 * //=> Thu Jul 10 2014 12:30:00
 */

function addMinutes(dirtyDate, dirtyAmount) {
  var amount = Number(dirtyAmount);
  return addMilliseconds(dirtyDate, amount * MILLISECONDS_IN_MINUTE);
}

module.exports = addMinutes;

/***/ }),
/* 55 */
/***/ (function(module, exports, __webpack_require__) {

var parse = __webpack_require__(56);
/**
 * @category Millisecond Helpers
 * @summary Add the specified number of milliseconds to the given date.
 *
 * @description
 * Add the specified number of milliseconds to the given date.
 *
 * @param {Date|String|Number} date - the date to be changed
 * @param {Number} amount - the amount of milliseconds to be added
 * @returns {Date} the new date with the milliseconds added
 *
 * @example
 * // Add 750 milliseconds to 10 July 2014 12:45:30.000:
 * var result = addMilliseconds(new Date(2014, 6, 10, 12, 45, 30, 0), 750)
 * //=> Thu Jul 10 2014 12:45:30.750
 */


function addMilliseconds(dirtyDate, dirtyAmount) {
  var timestamp = parse(dirtyDate).getTime();
  var amount = Number(dirtyAmount);
  return new Date(timestamp + amount);
}

module.exports = addMilliseconds;

/***/ }),
/* 56 */
/***/ (function(module, exports, __webpack_require__) {

var getTimezoneOffsetInMilliseconds = __webpack_require__(57);

var isDate = __webpack_require__(58);

var MILLISECONDS_IN_HOUR = 3600000;
var MILLISECONDS_IN_MINUTE = 60000;
var DEFAULT_ADDITIONAL_DIGITS = 2;
var parseTokenDateTimeDelimeter = /[T ]/;
var parseTokenPlainTime = /:/; // year tokens

var parseTokenYY = /^(\d{2})$/;
var parseTokensYYY = [/^([+-]\d{2})$/, // 0 additional digits
/^([+-]\d{3})$/, // 1 additional digit
/^([+-]\d{4})$/ // 2 additional digits
];
var parseTokenYYYY = /^(\d{4})/;
var parseTokensYYYYY = [/^([+-]\d{4})/, // 0 additional digits
/^([+-]\d{5})/, // 1 additional digit
/^([+-]\d{6})/ // 2 additional digits
]; // date tokens

var parseTokenMM = /^-(\d{2})$/;
var parseTokenDDD = /^-?(\d{3})$/;
var parseTokenMMDD = /^-?(\d{2})-?(\d{2})$/;
var parseTokenWww = /^-?W(\d{2})$/;
var parseTokenWwwD = /^-?W(\d{2})-?(\d{1})$/; // time tokens

var parseTokenHH = /^(\d{2}([.,]\d*)?)$/;
var parseTokenHHMM = /^(\d{2}):?(\d{2}([.,]\d*)?)$/;
var parseTokenHHMMSS = /^(\d{2}):?(\d{2}):?(\d{2}([.,]\d*)?)$/; // timezone tokens

var parseTokenTimezone = /([Z+-].*)$/;
var parseTokenTimezoneZ = /^(Z)$/;
var parseTokenTimezoneHH = /^([+-])(\d{2})$/;
var parseTokenTimezoneHHMM = /^([+-])(\d{2}):?(\d{2})$/;
/**
 * @category Common Helpers
 * @summary Convert the given argument to an instance of Date.
 *
 * @description
 * Convert the given argument to an instance of Date.
 *
 * If the argument is an instance of Date, the function returns its clone.
 *
 * If the argument is a number, it is treated as a timestamp.
 *
 * If an argument is a string, the function tries to parse it.
 * Function accepts complete ISO 8601 formats as well as partial implementations.
 * ISO 8601: http://en.wikipedia.org/wiki/ISO_8601
 *
 * If all above fails, the function passes the given argument to Date constructor.
 *
 * @param {Date|String|Number} argument - the value to convert
 * @param {Object} [options] - the object with options
 * @param {0 | 1 | 2} [options.additionalDigits=2] - the additional number of digits in the extended year format
 * @returns {Date} the parsed date in the local time zone
 *
 * @example
 * // Convert string '2014-02-11T11:30:30' to date:
 * var result = parse('2014-02-11T11:30:30')
 * //=> Tue Feb 11 2014 11:30:30
 *
 * @example
 * // Parse string '+02014101',
 * // if the additional number of digits in the extended year format is 1:
 * var result = parse('+02014101', {additionalDigits: 1})
 * //=> Fri Apr 11 2014 00:00:00
 */

function parse(argument, dirtyOptions) {
  if (isDate(argument)) {
    // Prevent the date to lose the milliseconds when passed to new Date() in IE10
    return new Date(argument.getTime());
  } else if (typeof argument !== 'string') {
    return new Date(argument);
  }

  var options = dirtyOptions || {};
  var additionalDigits = options.additionalDigits;

  if (additionalDigits == null) {
    additionalDigits = DEFAULT_ADDITIONAL_DIGITS;
  } else {
    additionalDigits = Number(additionalDigits);
  }

  var dateStrings = splitDateString(argument);
  var parseYearResult = parseYear(dateStrings.date, additionalDigits);
  var year = parseYearResult.year;
  var restDateString = parseYearResult.restDateString;
  var date = parseDate(restDateString, year);

  if (date) {
    var timestamp = date.getTime();
    var time = 0;
    var offset;

    if (dateStrings.time) {
      time = parseTime(dateStrings.time);
    }

    if (dateStrings.timezone) {
      offset = parseTimezone(dateStrings.timezone) * MILLISECONDS_IN_MINUTE;
    } else {
      var fullTime = timestamp + time;
      var fullTimeDate = new Date(fullTime);
      offset = getTimezoneOffsetInMilliseconds(fullTimeDate); // Adjust time when it's coming from DST

      var fullTimeDateNextDay = new Date(fullTime);
      fullTimeDateNextDay.setDate(fullTimeDate.getDate() + 1);
      var offsetDiff = getTimezoneOffsetInMilliseconds(fullTimeDateNextDay) - getTimezoneOffsetInMilliseconds(fullTimeDate);

      if (offsetDiff > 0) {
        offset += offsetDiff;
      }
    }

    return new Date(timestamp + time + offset);
  } else {
    return new Date(argument);
  }
}

function splitDateString(dateString) {
  var dateStrings = {};
  var array = dateString.split(parseTokenDateTimeDelimeter);
  var timeString;

  if (parseTokenPlainTime.test(array[0])) {
    dateStrings.date = null;
    timeString = array[0];
  } else {
    dateStrings.date = array[0];
    timeString = array[1];
  }

  if (timeString) {
    var token = parseTokenTimezone.exec(timeString);

    if (token) {
      dateStrings.time = timeString.replace(token[1], '');
      dateStrings.timezone = token[1];
    } else {
      dateStrings.time = timeString;
    }
  }

  return dateStrings;
}

function parseYear(dateString, additionalDigits) {
  var parseTokenYYY = parseTokensYYY[additionalDigits];
  var parseTokenYYYYY = parseTokensYYYYY[additionalDigits];
  var token; // YYYY or ±YYYYY

  token = parseTokenYYYY.exec(dateString) || parseTokenYYYYY.exec(dateString);

  if (token) {
    var yearString = token[1];
    return {
      year: parseInt(yearString, 10),
      restDateString: dateString.slice(yearString.length)
    };
  } // YY or ±YYY


  token = parseTokenYY.exec(dateString) || parseTokenYYY.exec(dateString);

  if (token) {
    var centuryString = token[1];
    return {
      year: parseInt(centuryString, 10) * 100,
      restDateString: dateString.slice(centuryString.length)
    };
  } // Invalid ISO-formatted year


  return {
    year: null
  };
}

function parseDate(dateString, year) {
  // Invalid ISO-formatted year
  if (year === null) {
    return null;
  }

  var token;
  var date;
  var month;
  var week; // YYYY

  if (dateString.length === 0) {
    date = new Date(0);
    date.setUTCFullYear(year);
    return date;
  } // YYYY-MM


  token = parseTokenMM.exec(dateString);

  if (token) {
    date = new Date(0);
    month = parseInt(token[1], 10) - 1;
    date.setUTCFullYear(year, month);
    return date;
  } // YYYY-DDD or YYYYDDD


  token = parseTokenDDD.exec(dateString);

  if (token) {
    date = new Date(0);
    var dayOfYear = parseInt(token[1], 10);
    date.setUTCFullYear(year, 0, dayOfYear);
    return date;
  } // YYYY-MM-DD or YYYYMMDD


  token = parseTokenMMDD.exec(dateString);

  if (token) {
    date = new Date(0);
    month = parseInt(token[1], 10) - 1;
    var day = parseInt(token[2], 10);
    date.setUTCFullYear(year, month, day);
    return date;
  } // YYYY-Www or YYYYWww


  token = parseTokenWww.exec(dateString);

  if (token) {
    week = parseInt(token[1], 10) - 1;
    return dayOfISOYear(year, week);
  } // YYYY-Www-D or YYYYWwwD


  token = parseTokenWwwD.exec(dateString);

  if (token) {
    week = parseInt(token[1], 10) - 1;
    var dayOfWeek = parseInt(token[2], 10) - 1;
    return dayOfISOYear(year, week, dayOfWeek);
  } // Invalid ISO-formatted date


  return null;
}

function parseTime(timeString) {
  var token;
  var hours;
  var minutes; // hh

  token = parseTokenHH.exec(timeString);

  if (token) {
    hours = parseFloat(token[1].replace(',', '.'));
    return hours % 24 * MILLISECONDS_IN_HOUR;
  } // hh:mm or hhmm


  token = parseTokenHHMM.exec(timeString);

  if (token) {
    hours = parseInt(token[1], 10);
    minutes = parseFloat(token[2].replace(',', '.'));
    return hours % 24 * MILLISECONDS_IN_HOUR + minutes * MILLISECONDS_IN_MINUTE;
  } // hh:mm:ss or hhmmss


  token = parseTokenHHMMSS.exec(timeString);

  if (token) {
    hours = parseInt(token[1], 10);
    minutes = parseInt(token[2], 10);
    var seconds = parseFloat(token[3].replace(',', '.'));
    return hours % 24 * MILLISECONDS_IN_HOUR + minutes * MILLISECONDS_IN_MINUTE + seconds * 1000;
  } // Invalid ISO-formatted time


  return null;
}

function parseTimezone(timezoneString) {
  var token;
  var absoluteOffset; // Z

  token = parseTokenTimezoneZ.exec(timezoneString);

  if (token) {
    return 0;
  } // ±hh


  token = parseTokenTimezoneHH.exec(timezoneString);

  if (token) {
    absoluteOffset = parseInt(token[2], 10) * 60;
    return token[1] === '+' ? -absoluteOffset : absoluteOffset;
  } // ±hh:mm or ±hhmm


  token = parseTokenTimezoneHHMM.exec(timezoneString);

  if (token) {
    absoluteOffset = parseInt(token[2], 10) * 60 + parseInt(token[3], 10);
    return token[1] === '+' ? -absoluteOffset : absoluteOffset;
  }

  return 0;
}

function dayOfISOYear(isoYear, week, day) {
  week = week || 0;
  day = day || 0;
  var date = new Date(0);
  date.setUTCFullYear(isoYear, 0, 4);
  var fourthOfJanuaryDay = date.getUTCDay() || 7;
  var diff = week * 7 + day + 1 - fourthOfJanuaryDay;
  date.setUTCDate(date.getUTCDate() + diff);
  return date;
}

module.exports = parse;

/***/ }),
/* 57 */
/***/ (function(module, exports) {

var MILLISECONDS_IN_MINUTE = 60000;
/**
 * Google Chrome as of 67.0.3396.87 introduced timezones with offset that includes seconds.
 * They usually appear for dates that denote time before the timezones were introduced
 * (e.g. for 'Europe/Prague' timezone the offset is GMT+00:57:44 before 1 October 1891
 * and GMT+01:00:00 after that date)
 *
 * Date#getTimezoneOffset returns the offset in minutes and would return 57 for the example above,
 * which would lead to incorrect calculations.
 *
 * This function returns the timezone offset in milliseconds that takes seconds in account.
 */

module.exports = function getTimezoneOffsetInMilliseconds(dirtyDate) {
  var date = new Date(dirtyDate.getTime());
  var baseTimezoneOffset = date.getTimezoneOffset();
  date.setSeconds(0, 0);
  var millisecondsPartOfTimezoneOffset = date.getTime() % MILLISECONDS_IN_MINUTE;
  return baseTimezoneOffset * MILLISECONDS_IN_MINUTE + millisecondsPartOfTimezoneOffset;
};

/***/ }),
/* 58 */
/***/ (function(module, exports) {

/**
 * @category Common Helpers
 * @summary Is the given argument an instance of Date?
 *
 * @description
 * Is the given argument an instance of Date?
 *
 * @param {*} argument - the argument to check
 * @returns {Boolean} the given argument is an instance of Date
 *
 * @example
 * // Is 'mayonnaise' a Date?
 * var result = isDate('mayonnaise')
 * //=> false
 */
function isDate(argument) {
  return argument instanceof Date;
}

module.exports = isDate;

/***/ }),
/* 59 */
/***/ (function(module, exports) {

module.exports = LForms.ucumPkg;

/***/ }),
/* 60 */
/***/ (function(module, exports) {

var numberFns = {}; // Returns the number of digits in the number after the decimal point, ignoring
// trailing zeros.

function decimalPlaces(x) {
  // Based on https://stackoverflow.com/a/9539746/360782
  // Make sure it is a number and use the builtin number -> string.
  var s = "" + +x,
      match = /(\d+)(?:\.(\d+))?(?:[eE]([+-]?\d+))?$/.exec(s); // NaN or Infinity or integer.
  // We arbitrarily decide that Infinity is integral.

  if (!match) {
    return 0;
  } // Count the number of digits in the fraction and subtract the
  // exponent to simulate moving the decimal point left by exponent places.
  // 1.234e+2 has 1 fraction digit and '234'.length -  2 == 1
  // 1.234e-2 has 5 fraction digit and '234'.length - -2 == 5
  //var wholeNum = match[1];


  var fraction = match[2],
      exponent = match[3];
  return Math.max(0, // lower limit.
  (fraction === '0' ? 0 : (fraction || '').length) - ( // fraction length
  exponent || 0)); // exponent
}
/**
 *  Rounds a number to the specified number of decimal places.
 * @param x the decimal number to be rounded
 * @param n the (maximum) number of decimal places to preserve.  (The result
 *  could contain fewer if the decimal digits in x contain zeros).
 */


function roundToDecimalPlaces(x, n) {
  var scale = Math.pow(10, n);
  return Math.round(x * scale) / scale;
}
/**
 *  The smallest representable number in FHIRPath.
 */


var PRECISION_STEP = 1e-8;
/**
 *  Rounds a number to the nearest multiple of PRECISION_STEP.
 */

function roundToMaxPrecision(x) {
  return Math.round(x / PRECISION_STEP) * PRECISION_STEP;
}
/**
 * Determines numbers equivalence
 * @param {number} actual
 * @param {number} expected
 * @return {boolean}
 */


numberFns.isEquivalent = function (actual, expected) {
  if (Number.isInteger(actual) && Number.isInteger(expected)) {
    return actual === expected;
  }

  var prec = Math.min(decimalPlaces(actual), decimalPlaces(expected));

  if (prec === 0) {
    return Math.round(actual) === Math.round(expected);
  } else {
    // Note: parseFloat(0.00000011).toPrecision(7) ===  "1.100000e-7"
    // It does # of significant digits, not decimal places.
    return roundToDecimalPlaces(actual, prec) === roundToDecimalPlaces(expected, prec);
  }
};
/**
 * Determines numbers equality
 * @param {number} actual
 * @param {number} expected
 * @return {boolean}
 */


numberFns.isEqual = function (actual, expected) {
  return roundToMaxPrecision(actual) === roundToMaxPrecision(expected);
};

module.exports = numberFns;

/***/ }),
/* 61 */
/***/ (function(module, exports, __webpack_require__) {

var addMonths = __webpack_require__(62);
/**
 * @category Year Helpers
 * @summary Add the specified number of years to the given date.
 *
 * @description
 * Add the specified number of years to the given date.
 *
 * @param {Date|String|Number} date - the date to be changed
 * @param {Number} amount - the amount of years to be added
 * @returns {Date} the new date with the years added
 *
 * @example
 * // Add 5 years to 1 September 2014:
 * var result = addYears(new Date(2014, 8, 1), 5)
 * //=> Sun Sep 01 2019 00:00:00
 */


function addYears(dirtyDate, dirtyAmount) {
  var amount = Number(dirtyAmount);
  return addMonths(dirtyDate, amount * 12);
}

module.exports = addYears;

/***/ }),
/* 62 */
/***/ (function(module, exports, __webpack_require__) {

var parse = __webpack_require__(56);

var getDaysInMonth = __webpack_require__(63);
/**
 * @category Month Helpers
 * @summary Add the specified number of months to the given date.
 *
 * @description
 * Add the specified number of months to the given date.
 *
 * @param {Date|String|Number} date - the date to be changed
 * @param {Number} amount - the amount of months to be added
 * @returns {Date} the new date with the months added
 *
 * @example
 * // Add 5 months to 1 September 2014:
 * var result = addMonths(new Date(2014, 8, 1), 5)
 * //=> Sun Feb 01 2015 00:00:00
 */


function addMonths(dirtyDate, dirtyAmount) {
  var date = parse(dirtyDate);
  var amount = Number(dirtyAmount);
  var desiredMonth = date.getMonth() + amount;
  var dateWithDesiredMonth = new Date(0);
  dateWithDesiredMonth.setFullYear(date.getFullYear(), desiredMonth, 1);
  dateWithDesiredMonth.setHours(0, 0, 0, 0);
  var daysInMonth = getDaysInMonth(dateWithDesiredMonth); // Set the last day of the new month
  // if the original date was the last day of the longer month

  date.setMonth(desiredMonth, Math.min(daysInMonth, date.getDate()));
  return date;
}

module.exports = addMonths;

/***/ }),
/* 63 */
/***/ (function(module, exports, __webpack_require__) {

var parse = __webpack_require__(56);
/**
 * @category Month Helpers
 * @summary Get the number of days in a month of the given date.
 *
 * @description
 * Get the number of days in a month of the given date.
 *
 * @param {Date|String|Number} date - the given date
 * @returns {Number} the number of days in a month
 *
 * @example
 * // How many days are in February 2000?
 * var result = getDaysInMonth(new Date(2000, 1))
 * //=> 29
 */


function getDaysInMonth(dirtyDate) {
  var date = parse(dirtyDate);
  var year = date.getFullYear();
  var monthIndex = date.getMonth();
  var lastDayOfMonth = new Date(0);
  lastDayOfMonth.setFullYear(year, monthIndex + 1, 0);
  lastDayOfMonth.setHours(0, 0, 0, 0);
  return lastDayOfMonth.getDate();
}

module.exports = getDaysInMonth;

/***/ }),
/* 64 */
/***/ (function(module, exports, __webpack_require__) {

var addDays = __webpack_require__(65);
/**
 * @category Week Helpers
 * @summary Add the specified number of weeks to the given date.
 *
 * @description
 * Add the specified number of week to the given date.
 *
 * @param {Date|String|Number} date - the date to be changed
 * @param {Number} amount - the amount of weeks to be added
 * @returns {Date} the new date with the weeks added
 *
 * @example
 * // Add 4 weeks to 1 September 2014:
 * var result = addWeeks(new Date(2014, 8, 1), 4)
 * //=> Mon Sep 29 2014 00:00:00
 */


function addWeeks(dirtyDate, dirtyAmount) {
  var amount = Number(dirtyAmount);
  var days = amount * 7;
  return addDays(dirtyDate, days);
}

module.exports = addWeeks;

/***/ }),
/* 65 */
/***/ (function(module, exports, __webpack_require__) {

var parse = __webpack_require__(56);
/**
 * @category Day Helpers
 * @summary Add the specified number of days to the given date.
 *
 * @description
 * Add the specified number of days to the given date.
 *
 * @param {Date|String|Number} date - the date to be changed
 * @param {Number} amount - the amount of days to be added
 * @returns {Date} the new date with the days added
 *
 * @example
 * // Add 10 days to 1 September 2014:
 * var result = addDays(new Date(2014, 8, 1), 10)
 * //=> Thu Sep 11 2014 00:00:00
 */


function addDays(dirtyDate, dirtyAmount) {
  var date = parse(dirtyDate);
  var amount = Number(dirtyAmount);
  date.setDate(date.getDate() + amount);
  return date;
}

module.exports = addDays;

/***/ }),
/* 66 */
/***/ (function(module, exports, __webpack_require__) {

var addMilliseconds = __webpack_require__(55);

var MILLISECONDS_IN_HOUR = 3600000;
/**
 * @category Hour Helpers
 * @summary Add the specified number of hours to the given date.
 *
 * @description
 * Add the specified number of hours to the given date.
 *
 * @param {Date|String|Number} date - the date to be changed
 * @param {Number} amount - the amount of hours to be added
 * @returns {Date} the new date with the hours added
 *
 * @example
 * // Add 2 hours to 10 July 2014 23:00:00:
 * var result = addHours(new Date(2014, 6, 10, 23, 0), 2)
 * //=> Fri Jul 11 2014 01:00:00
 */

function addHours(dirtyDate, dirtyAmount) {
  var amount = Number(dirtyAmount);
  return addMilliseconds(dirtyDate, amount * MILLISECONDS_IN_HOUR);
}

module.exports = addHours;

/***/ }),
/* 67 */
/***/ (function(module, exports, __webpack_require__) {

var addMilliseconds = __webpack_require__(55);
/**
 * @category Second Helpers
 * @summary Add the specified number of seconds to the given date.
 *
 * @description
 * Add the specified number of seconds to the given date.
 *
 * @param {Date|String|Number} date - the date to be changed
 * @param {Number} amount - the amount of seconds to be added
 * @returns {Date} the new date with the seconds added
 *
 * @example
 * // Add 30 seconds to 10 July 2014 12:45:00:
 * var result = addSeconds(new Date(2014, 6, 10, 12, 45, 0), 30)
 * //=> Thu Jul 10 2014 12:45:30
 */


function addSeconds(dirtyDate, dirtyAmount) {
  var amount = Number(dirtyAmount);
  return addMilliseconds(dirtyDate, amount * 1000);
}

module.exports = addSeconds;

/***/ }),
/* 68 */
/***/ (function(module, exports) {

// Binding the function Array.prototype.slice.call for convert Array-like objects/collections to a new Array.
var slice = Function.prototype.call.bind(Array.prototype.slice); // isInteger (not in IE)
// From Mozilla docs

Number.isInteger = Number.isInteger || function (value) {
  return typeof value === 'number' && isFinite(value) && Math.floor(value) === value;
};

if (!String.prototype.startsWith) {
  // From Mozilla docs with little changes
  Object.defineProperty(String.prototype, 'startsWith', {
    value: function value(searchString, position) {
      position = position || 0;
      return this.indexOf(searchString, position) === position;
    }
  });
}

if (!String.prototype.endsWith) {
  // From Mozilla docs with little changes
  Object.defineProperty(String.prototype, 'endsWith', {
    value: function value(searchString, position) {
      var subjectString = this.toString();

      if (position === undefined || position > subjectString.length) {
        position = subjectString.length;
      }

      position -= searchString.length;
      var lastIndex = subjectString.indexOf(searchString, position);
      return lastIndex !== -1 && lastIndex === position;
    }
  });
}

if (!String.prototype.includes) {
  Object.defineProperty(String.prototype, 'includes', {
    value: function value() {
      return this.indexOf.apply(this, arguments) !== -1;
    }
  });
}

if (!Object.assign) {
  // From Mozilla docs with little changes
  Object.defineProperty(Object, 'assign', {
    value: function value(target) {
      if (target === undefined || target === null) {
        throw new TypeError('Cannot convert undefined or null to object');
      }

      return slice(arguments, 1).reduce(function (to, nextSource) {
        Object.keys(Object(nextSource)).forEach(function (nextKey) {
          to[nextKey] = nextSource[nextKey];
        });
        return to;
      }, Object(target));
    }
  });
}

/***/ }),
/* 69 */
/***/ (function(module, exports) {

// These are values that should not change during an evaluation of a FHIRPath
// expression (e.g. the return value of today(), per the spec.)  They are
// constant during at least one evaluation.
module.exports = {
  /**
   *  Resets the constants.  Should be called when before the engine starts its
   *  processing.
   */
  reset: function reset() {
    this.nowDate = new Date(); // a Date object representint "now"

    this.today = null;
    this.now = null;
    this.localTimezoneOffset = null;
  },

  /**
   *  The cached value of today().
   */
  today: null,

  /**
   *  The cached value of now().
   */
  now: null
};

/***/ }),
/* 70 */
/***/ (function(module, exports, __webpack_require__) {

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

// This file holds code to hande the FHIRPath Existence functions (5.1 in the
// specification).
var util = __webpack_require__(52);

var filtering = __webpack_require__(71);

var misc = __webpack_require__(72);

var engine = {};
engine.emptyFn = util.isEmpty;

engine.notFn = function (coll) {
  var d = misc.singleton(coll, 'Boolean');
  return typeof d === 'boolean' ? !d : [];
};

engine.existsMacro = function (coll, expr) {
  var vec = coll;

  if (expr) {
    return engine.existsMacro(filtering.whereMacro(coll, expr));
  }

  return !util.isEmpty(vec);
};

engine.allMacro = function (coll, expr) {
  for (var i = 0, len = coll.length; i < len; ++i) {
    this.$index = i;

    if (!util.isTrue(expr(coll[i]))) {
      return [false];
    }
  }

  return [true];
};

engine.allTrueFn = function (x) {
  var rtn = true;

  for (var i = 0, len = x.length; i < len && rtn; ++i) {
    var xi = util.assertType(x[i], ["boolean"], "allTrue");
    rtn = xi === true;
  }

  return [rtn];
};

engine.anyTrueFn = function (x) {
  var rtn = false;

  for (var i = 0, len = x.length; i < len && !rtn; ++i) {
    var xi = util.assertType(x[i], ["boolean"], "anyTrue");
    rtn = xi === true;
  }

  return [rtn];
};

engine.allFalseFn = function (x) {
  var rtn = true;

  for (var i = 0, len = x.length; i < len && rtn; ++i) {
    var xi = util.assertType(x[i], ["boolean"], "allFalse");
    rtn = xi === false;
  }

  return [rtn];
};

engine.anyFalseFn = function (x) {
  var rtn = false;

  for (var i = 0, len = x.length; i < len && !rtn; ++i) {
    var xi = util.assertType(x[i], ["boolean"], "anyFalse");
    rtn = xi === false;
  }

  return [rtn];
};
/**
 *  Returns a JSON version of the given object, but with keys of the object in
 *  sorted order (or at least a stable order).
 *  From: https://stackoverflow.com/a/35810961/360782
 */


function orderedJsonStringify(obj) {
  return JSON.stringify(sortObjByKey(obj));
}
/**
 *  If given value is an object, returns a new object with the properties added
 *  in sorted order, and handles nested objects.  Otherwise, returns the given
 *  value.
 *  From: https://stackoverflow.com/a/35810961/360782
 */


function sortObjByKey(value) {
  return _typeof(value) === 'object' ? Array.isArray(value) ? value.map(sortObjByKey) : Object.keys(value).sort().reduce(function (o, key) {
    var v = value[key];
    o[key] = sortObjByKey(v);
    return o;
  }, {}) : value;
}
/**
 *  Returns true if coll1 is a subset of coll2.
 */


function subsetOf(coll1, coll2) {
  var rtn = coll1.length <= coll2.length;

  if (rtn) {
    // This requires a deep-equals comparision of every object in coll1,
    // against each object in coll2.
    // Optimize by building a hashmap of JSON versions of the objects.
    var c2Hash = {};

    for (var p = 0, pLen = coll1.length; p < pLen && rtn; ++p) {
      var obj1 = util.valData(coll1[p]);
      var obj1Str = orderedJsonStringify(obj1);
      var found = false;

      if (p === 0) {
        // c2Hash is not yet built
        for (var i = 0, len = coll2.length; i < len; ++i) {
          // No early return from this loop, because we're building c2Hash.
          var obj2 = util.valData(coll2[i]);
          var obj2Str = orderedJsonStringify(obj2);
          c2Hash[obj2Str] = obj2;
          found = found || obj1Str === obj2Str;
        }
      } else found = !!c2Hash[obj1Str];

      rtn = found;
    }
  }

  return rtn;
}

engine.subsetOfFn = function (coll1, coll2) {
  return [subsetOf(coll1, coll2)];
};

engine.supersetOfFn = function (coll1, coll2) {
  return [subsetOf(coll2, coll1)];
};

engine.isDistinctFn = function (x) {
  return [x.length === engine.distinctFn(x).length];
};

engine.distinctFn = function (x) {
  var unique = []; // Since this requires a deep equals, use a hash table (on JSON strings) for
  // efficiency.

  if (x.length > 0) {
    var uniqueHash = {};

    for (var i = 0, len = x.length; i < len; ++i) {
      var xObj = x[i];
      var xStr = JSON.stringify(xObj);
      var uObj = uniqueHash[xStr];

      if (uObj === undefined) {
        unique.push(xObj);
        uniqueHash[xStr] = xObj;
      }
    }
  }

  return unique;
};

engine.countFn = function (x) {
  if (x && x.length) {
    return x.length;
  } else {
    return 0;
  }
};

module.exports = engine;

/***/ }),
/* 71 */
/***/ (function(module, exports, __webpack_require__) {

// Contains the FHIRPath Filtering and Projection functions.  (Section 5.2 of
// the FHIRPath 1.0.0 specification).

/**
 *  Adds the filtering and projection functions to the given FHIRPath engine.
 */
var util = __webpack_require__(52);

var _require = __webpack_require__(53),
    TypeInfo = _require.TypeInfo,
    ResourceNode = _require.ResourceNode;

var engine = {};

engine.whereMacro = function (parentData, expr) {
  var _this = this;

  if (parentData !== false && !parentData) {
    return [];
  }

  return util.flatten(parentData.filter(function (x, i) {
    _this.$index = i;
    return expr(x)[0];
  }));
};

engine.extension = function (parentData, url) {
  var _this2 = this;

  if (parentData !== false && !parentData || !url) {
    return [];
  }

  return util.flatten(parentData.map(function (x, i) {
    _this2.$index = i;
    var extensions = x && (x.data && x.data.extension || x._data && x._data.extension);

    if (extensions) {
      return extensions.filter(function (extension) {
        return extension.url === url;
      }).map(function (x) {
        return ResourceNode.makeResNode(x, 'Extension');
      });
    }

    return [];
  }));
};

engine.selectMacro = function (data, expr) {
  var _this3 = this;

  if (data !== false && !data) {
    return [];
  }

  return util.flatten(data.map(function (x, i) {
    _this3.$index = i;
    return expr(x);
  }));
};

engine.repeatMacro = function (parentData, expr) {
  if (parentData !== false && !parentData) {
    return [];
  }

  var res = [];
  var items = parentData;
  var next = null;
  var lres = null;

  while (items.length != 0) {
    next = items.shift();
    lres = expr(next);

    if (lres) {
      res = res.concat(lres);
      items = items.concat(lres);
    }
  }

  return res;
}; //TODO: behavior on object?


engine.singleFn = function (x) {
  if (x.length == 1) {
    return x;
  } else if (x.length == 0) {
    return [];
  } else {
    //TODO: should throw error?
    return {
      $status: "error",
      $error: "Expected single"
    };
  }
};

engine.firstFn = function (x) {
  return x[0];
};

engine.lastFn = function (x) {
  return x[x.length - 1];
};

engine.tailFn = function (x) {
  return x.slice(1, x.length);
};

engine.takeFn = function (x, n) {
  return x.slice(0, n);
};

engine.skipFn = function (x, num) {
  return x.slice(num, x.length);
};

engine.ofTypeFn = function (coll, typeInfo) {
  return coll.filter(function (value) {
    return TypeInfo.fromValue(value).is(typeInfo);
  });
};

module.exports = engine;

/***/ }),
/* 72 */
/***/ (function(module, exports, __webpack_require__) {

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

// This file holds code to hande the FHIRPath Existence functions (5.1 in the
// specification).
var util = __webpack_require__(52);

var types = __webpack_require__(53);

var FP_Quantity = types.FP_Quantity;
var engine = {};

engine.iifMacro = function (data, cond, ok, fail) {
  if (util.isTrue(cond(data))) {
    return ok(data);
  } else {
    return fail ? fail(data) : [];
  }
};

engine.traceFn = function (x, label) {
  console.log("TRACE:[" + (label || "") + "]", JSON.stringify(x, null, " "));
  return x;
};

var intRegex = /^[+-]?\d+$/;

engine.toInteger = function (coll) {
  if (coll.length != 1) {
    return [];
  }

  var v = util.valData(coll[0]);

  if (v === false) {
    return 0;
  }

  if (v === true) {
    return 1;
  }

  if (typeof v === "number") {
    if (Number.isInteger(v)) {
      return v;
    } else {
      return [];
    }
  }

  if (typeof v === "string") {
    if (intRegex.test(v)) {
      return parseInt(v);
    }
  }

  return [];
};

var quantityRegex = /^((\+|-)?\d+(\.\d+)?)\s*(('[^']+')|([a-zA-Z]+))?$/,
    quantityRegexMap = {
  value: 1,
  unit: 5,
  time: 6
};

engine.toQuantity = function (coll, toUnit) {
  var result; // Surround UCUM unit code in the toUnit parameter with single quotes

  if (toUnit && !FP_Quantity.mapTimeUnitsToUCUMCode[toUnit]) {
    toUnit = "'".concat(toUnit, "'");
  }

  if (coll.length > 1) {
    throw new Error("Could not convert to quantity: input collection contains multiple items");
  } else if (coll.length === 1) {
    var item = coll[0],
        v = util.valData(item);
    var quantityRegexRes;

    if (typeof v === "number") {
      result = new FP_Quantity(v, '\'1\'');
    } else if (v instanceof FP_Quantity) {
      result = v;
    } else if (typeof v === 'boolean') {
      result = new FP_Quantity(v ? 1 : 0, '\'1\'');
    } else if (typeof v === "string" && (quantityRegexRes = quantityRegex.exec(v))) {
      var value = quantityRegexRes[quantityRegexMap.value],
          unit = quantityRegexRes[quantityRegexMap.unit],
          time = quantityRegexRes[quantityRegexMap.time]; // UCUM unit code in the input string must be surrounded with single quotes

      if (!time || FP_Quantity.mapTimeUnitsToUCUMCode[time]) {
        result = new FP_Quantity(Number(value), unit || time || '\'1\'');
      }
    }

    if (result && toUnit && result.unit !== toUnit) {
      result = FP_Quantity.convUnitTo(result.unit, result.value, toUnit);
    }
  }

  return result || [];
};

var numRegex = /^[+-]?\d+(\.\d+)?$/;

engine.toDecimal = function (coll) {
  if (coll.length != 1) {
    return [];
  }

  var v = util.valData(coll[0]);

  if (v === false) {
    return 0;
  }

  if (v === true) {
    return 1.0;
  }

  if (typeof v === "number") {
    return v;
  }

  if (typeof v === "string") {
    if (numRegex.test(v)) {
      return parseFloat(v);
    } else {
      throw new Error("Could not convert to decimal: " + v);
    }
  }

  return [];
};

engine.toString = function (coll) {
  if (coll.length != 1) {
    return [];
  }

  var v = util.valData(coll[0]);
  return v.toString();
};
/**
 *  Defines a function on engine called to+timeType (e.g., toDateTime, etc.).
 * @param timeType The string name of a class for a time type (e.g. "FP_DateTime").
 */


function defineTimeConverter(timeType) {
  var timeName = timeType.slice(3); // Remove 'FP_'

  engine['to' + timeName] = function (coll) {
    var rtn = [];
    if (coll.length > 1) throw Error('to ' + timeName + ' called for a collection of length ' + coll.length);

    if (coll.length === 1) {
      var t = types[timeType].checkString(util.valData(coll[0]));
      if (t) rtn = t;
    }

    return rtn;
  };
}

defineTimeConverter('FP_DateTime');
defineTimeConverter('FP_Time'); // Possible string values convertible to the true boolean value

var trueStrings = ['true', 't', 'yes', 'y', '1', '1.0'].reduce(function (acc, val) {
  acc[val] = true;
  return acc;
}, {}); // Possible string values convertible to the false boolean value

var falseStrings = ['false', 'f', 'no', 'n', '0', '0.0'].reduce(function (acc, val) {
  acc[val] = true;
  return acc;
}, {});

engine.toBoolean = function (coll) {
  if (coll.length !== 1) {
    return [];
  }

  var v = util.valData(coll[0]);

  switch (_typeof(v)) {
    case 'boolean':
      return v;

    case 'number':
      if (v === 1) {
        return true;
      }

      if (v === 0) {
        return false;
      }

      break;

    case 'string':
      // eslint-disable-next-line no-case-declarations
      var lowerCaseValue = v.toLowerCase();

      if (trueStrings[lowerCaseValue]) {
        return true;
      }

      if (falseStrings[lowerCaseValue]) {
        return false;
      }

  }

  return [];
};
/**
 * Creates function that checks if toFunction returns specified type
 * @param {function(coll: array): <type|[]>} toFunction
 * @param {string|class} type - specifies type, for example: 'string' or FP_Quantity
 * @return {function(coll: array)}
 */


engine.createConvertsToFn = function (toFunction, type) {
  if (typeof type === 'string') {
    return function (coll) {
      if (coll.length !== 1) {
        return [];
      }

      return _typeof(toFunction(coll)) === type;
    };
  }

  return function (coll) {
    if (coll.length !== 1) {
      return [];
    }

    return toFunction(coll) instanceof type;
  };
};

var singletonEvalByType = {
  "Integer": function Integer(coll) {
    var d = util.valData(coll[0]);

    if (Number.isInteger(d)) {
      return d;
    }
  },
  "Boolean": function Boolean(coll) {
    var d = util.valData(coll[0]);

    if (d === true || d === false) {
      return d;
    } else if (coll.length === 1) {
      return true;
    }
  },
  "Number": function Number(coll) {
    var d = util.valData(coll[0]);

    if (typeof d === "number") {
      return d;
    }
  },
  "String": function String(coll) {
    var d = util.valData(coll[0]);

    if (typeof d === "string") {
      return d;
    }
  }
};
/**
 * Converts a collection to a singleton of the specified type.
 * The result can be an empty array if input collection is empty.
 * See http://hl7.org/fhirpath/#singleton-evaluation-of-collections for details.
 * @param {Array} coll - collection
 * @param {string} type - 'Integer', 'Boolean', 'Number' or 'String'
 * @throws {Error}  if there is more than one item in input collection,
 *   or an item that is not a specified type
 * @return {*|[]} the value of specified type or empty array
 */

engine.singleton = function (coll, type) {
  if (coll.length > 1) {
    throw new Error("Unexpected collection" + JSON.stringify(coll) + "; expected singleton of type " + type);
  } else if (coll.length === 0) {
    return [];
  }

  var toSingleton = singletonEvalByType[type];

  if (toSingleton) {
    var value = toSingleton(coll);

    if (value !== undefined) {
      return value;
    }

    throw new Error("Expected ".concat(type.toLowerCase(), ", but got: ").concat(JSON.stringify(coll)));
  }

  throw new Error('Not supported type ' + type);
};

module.exports = engine;

/***/ }),
/* 73 */
/***/ (function(module, exports) {

// Contains the FHIRPath Aggregate functions.
// (Section 7 of the FHIRPath 2.0.0 (N1) specification).
var engine = {};

engine.aggregateMacro = function (data, expr, initialValue) {
  var _this = this;

  return data.reduce(function (total, x, i) {
    _this.$index = i;
    return _this.$total = expr(x);
  }, this.$total = initialValue);
};

module.exports = engine;

/***/ }),
/* 74 */
/***/ (function(module, exports, __webpack_require__) {

// This file holds code to hande the FHIRPath Combining functions.
var combineFns = {};

var existence = __webpack_require__(70);

combineFns.union = function (coll1, coll2) {
  return existence.distinctFn(coll1.concat(coll2));
};

combineFns.combineFn = function (coll1, coll2) {
  return coll1.concat(coll2);
};

module.exports = combineFns;

/***/ }),
/* 75 */
/***/ (function(module, exports, __webpack_require__) {

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

// This file holds code to hande the FHIRPath Math functions.
var util = __webpack_require__(52);

var deepEqual = __webpack_require__(76);

var types = __webpack_require__(53);

var FP_Type = types.FP_Type;
var FP_DateTime = types.FP_DateTime;
var FP_Time = types.FP_Time;
var engine = {};

function equality(x, y) {
  if (util.isEmpty(x) || util.isEmpty(y)) {
    return [];
  }

  return deepEqual(x, y);
}

function equivalence(x, y) {
  if (util.isEmpty(x) && util.isEmpty(y)) {
    return [true];
  }

  if (util.isEmpty(x) || util.isEmpty(y)) {
    return [];
  }

  return deepEqual(x, y, {
    fuzzy: true
  });
}

engine.equal = function (a, b) {
  return equality(a, b);
};

engine.unequal = function (a, b) {
  var eq = equality(a, b);
  return eq === undefined ? undefined : !eq;
};

engine.equival = function (a, b) {
  return equivalence(a, b);
};

engine.unequival = function (a, b) {
  return !equivalence(a, b);
};
/**
 *  Checks that the types of a and b are suitable for comparison in an
 *  inequality expression.  It is assumed that a check has already been made
 *  that there is at least one value in a and b.
 * @param a the left side of the inequality expression (which should be an array of
 *  one value).
 * @param b the right side of the inequality expression (which should be an array of
 *  one value).
 * @return the singleton values of the arrays a, and b.  If one was an FP_Type
 *  and the other was convertible, the coverted value will be retureed.
 */


function typecheck(a, b) {
  var rtn = null;
  util.assertAtMostOne(a, "Singleton was expected");
  util.assertAtMostOne(b, "Singleton was expected");
  a = util.valData(a[0]);
  b = util.valData(b[0]);
  var lClass = a.constructor;
  var rClass = b.constructor;

  if (lClass != rClass) {
    // See if one is an FPDateTime or FTTime while the other is a string.
    var d;

    if (lClass === String && (rClass === FP_DateTime || rClass === FP_Time)) {
      d = rClass.checkString(a);
      if (d) rtn = [d, b];
    } else if (rClass === String && (lClass === FP_DateTime || lClass === FP_Time)) {
      d = lClass.checkString(b);
      if (d) rtn = [a, d];
    }

    if (!rtn) {
      util.raiseError('Type of "' + a + '" (' + lClass.name + ') did not match type of "' + b + '" (' + rClass.name + ')', 'InequalityExpression');
    }
  }

  return rtn ? rtn : [a, b];
}

engine.lt = function (a, b) {
  if (!a.length || !b.length) return [];

  var _typecheck = typecheck(a, b),
      _typecheck2 = _slicedToArray(_typecheck, 2),
      a0 = _typecheck2[0],
      b0 = _typecheck2[1];

  if (a0 instanceof FP_Type) {
    var compare = a0.compare(b0);
    return compare === null ? [] : compare < 0;
  }

  return a0 < b0;
};

engine.gt = function (a, b) {
  if (!a.length || !b.length) return [];

  var _typecheck3 = typecheck(a, b),
      _typecheck4 = _slicedToArray(_typecheck3, 2),
      a0 = _typecheck4[0],
      b0 = _typecheck4[1];

  if (a0 instanceof FP_Type) {
    var compare = a0.compare(b0);
    return compare === null ? [] : compare > 0;
  }

  return a0 > b0;
};

engine.lte = function (a, b) {
  if (!a.length || !b.length) return [];

  var _typecheck5 = typecheck(a, b),
      _typecheck6 = _slicedToArray(_typecheck5, 2),
      a0 = _typecheck6[0],
      b0 = _typecheck6[1];

  if (a0 instanceof FP_Type) {
    var compare = a0.compare(b0);
    return compare === null ? [] : compare <= 0;
  }

  return a0 <= b0;
};

engine.gte = function (a, b) {
  if (!a.length || !b.length) return [];

  var _typecheck7 = typecheck(a, b),
      _typecheck8 = _slicedToArray(_typecheck7, 2),
      a0 = _typecheck8[0],
      b0 = _typecheck8[1];

  if (a0 instanceof FP_Type) {
    var compare = a0.compare(b0);
    return compare === null ? [] : compare >= 0;
  }

  return a0 >= b0;
};

module.exports = engine;

/***/ }),
/* 76 */
/***/ (function(module, exports, __webpack_require__) {

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

// Originally copied from node-deep-equal
// (https://github.com/substack/node-deep-equal), with modifications.
// For the license for node-deep-equal, see the bottom of this file.
var types = __webpack_require__(53);

var FP_Type = types.FP_Type;

var util = __webpack_require__(52);

var numbers = __webpack_require__(60);

var pSlice = Array.prototype.slice;
var objectKeys = Object.keys;

var isArguments = function isArguments(object) {
  return Object.prototype.toString.call(object) == '[object Arguments]';
};

function isString(myVar) {
  return typeof myVar === 'string' || myVar instanceof String;
}

function isNumber(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}

function normalizeStr(x) {
  return x.toUpperCase().replace(/\s+/, ' ');
}

var deepEqual = function deepEqual(actual, expected, opts) {
  actual = util.valData(actual);
  expected = util.valData(expected);
  if (!opts) opts = {}; // 7.1. All identical values are equivalent, as determined by ===.

  if (actual === expected) {
    return true;
  }

  if (opts.fuzzy) {
    if (isString(actual) && isString(expected)) {
      return normalizeStr(actual) == normalizeStr(expected);
    }

    if (isNumber(actual) && isNumber(expected)) {
      return numbers.isEquivalent(actual, expected);
    }
  } else {
    // !opts.fuzzy
    // If these are numbers, they need to be rounded to the maximum supported
    // precision to remove floating point arithmetic errors (e.g. 0.1+0.1+0.1 should
    // equal 0.3) before comparing.
    if (typeof actual === 'number' && typeof expected === 'number') {
      return numbers.isEqual(actual, expected);
    }
  }

  if (actual instanceof Date && expected instanceof Date) {
    return actual.getTime() === expected.getTime(); // 7.3. Other pairs that do not both pass typeof value == 'object',
    // equivalence is determined by ==.
  } else if (!actual || !expected || _typeof(actual) != 'object' && _typeof(expected) != 'object') {
    return opts.strict ? actual === expected : actual == expected;
  } else {
    var actualIsFPT = actual instanceof FP_Type;
    var expectedIsFPT = expected instanceof FP_Type;

    if (actualIsFPT && expectedIsFPT) {
      // if both are FP_Type
      var rtn = opts.fuzzy ? actual.equivalentTo(expected) : actual.equals(expected); // May return undefined

      return rtn;
    } else if (actualIsFPT || expectedIsFPT) {
      // if only one is an FP_Type
      // See if the other is convertible.
      var fpt, nonFPT;

      if (actualIsFPT) {
        fpt = actual;
        nonFPT = expected;
      } else {
        fpt = expected;
        nonFPT = actual;
      }

      var _rtn = typeof nonFPT === 'string';

      if (_rtn) {
        var d = fpt.constructor.checkString(nonFPT);

        if (d) {
          _rtn = opts.fuzzy ? actual.equivalentTo(d) : fpt.equals(d); // May return undefined
        } else _rtn = false; // not a date string

      }

      return _rtn;
    } // 7.4. For all other Object pairs, including Array objects, equivalence is
    // determined by having the same number of owned properties (as verified
    // with Object.prototype.hasOwnProperty.call), the same set of keys
    // (although not necessarily the same order), equivalent values for every
    // corresponding key, and an identical 'prototype' property. Note: this
    // accounts for both named and indexed properties on Arrays.


    return objEquiv(actual, expected, opts);
  }
};

function isUndefinedOrNull(value) {
  return value === null || value === undefined;
}

function objEquiv(a, b, opts) {
  var i, key;
  if (isUndefinedOrNull(a) || isUndefinedOrNull(b)) return false; // an identical 'prototype' property.

  if (a.prototype !== b.prototype) return false; //~~~I've managed to break Object.keys through screwy arguments passing.
  //   Converting to array solves the problem.

  if (isArguments(a) || isArguments(b)) {
    a = isArguments(a) ? pSlice.call(a) : a;
    b = isArguments(b) ? pSlice.call(b) : b;
    return deepEqual(a, b, opts);
  }

  try {
    var ka = objectKeys(a),
        kb = objectKeys(b);
  } catch (e) {
    //happens when one is a string literal and the other isn't
    return false;
  } // having the same number of owned properties (keys incorporates
  // hasOwnProperty)


  if (ka.length != kb.length) return false; //the same set of keys (although not necessarily the same order),

  ka.sort();
  kb.sort(); //~~~cheap key test

  for (i = ka.length - 1; i >= 0; i--) {
    if (ka[i] != kb[i]) return false;
  } //equivalent values for every corresponding key, and
  //~~~possibly expensive deep test
  // If the length of the array is one, return the value of deepEqual (which can
  // be "undefined".


  if (ka.length === 1) {
    key = ka[0];
    return deepEqual(a[key], b[key], opts);
  }

  for (i = ka.length - 1; i >= 0; i--) {
    key = ka[i];
    if (!deepEqual(a[key], b[key], opts)) return false;
  }

  return _typeof(a) === _typeof(b);
}

module.exports = deepEqual; // The license for node-deep-equal, on which the above code is based, is as
// follows:
//
// This software is released under the MIT license:
//
// Permission is hereby granted, free of charge, to any person obtaining a copy of
// this software and associated documentation files (the "Software"), to deal in
// the Software without restriction, including without limitation the rights to
// use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of
// the Software, and to permit persons to whom the Software is furnished to do so,
// subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in all
// copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
// FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
// COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
// IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
// CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

/***/ }),
/* 77 */
/***/ (function(module, exports, __webpack_require__) {

// This file holds code to hande the FHIRPath Math functions.
var deepEqual = __webpack_require__(76);

var engine = {}; // b is assumed to have one element and it tests whether b[0] is in a

function containsImpl(a, b) {
  if (b.length == 0) {
    return true;
  }

  for (var i = 0; i < a.length; i++) {
    if (deepEqual(a[i], b[0])) {
      return true;
    }
  }

  return false;
}

engine.contains = function (a, b) {
  if (b.length == 0) {
    return [];
  }

  if (a.length == 0) {
    return false;
  }

  if (b.length > 1) {
    throw new Error("Expected singleton on right side of contains, got " + JSON.stringify(b));
  }

  return containsImpl(a, b);
};

engine.in = function (a, b) {
  if (a.length == 0) {
    return [];
  }

  if (b.length == 0) {
    return false;
  }

  if (a.length > 1) {
    throw new Error("Expected singleton on right side of in, got " + JSON.stringify(b));
  }

  return containsImpl(b, a);
};

module.exports = engine;

/***/ }),
/* 78 */
/***/ (function(module, exports, __webpack_require__) {

// This file holds code to hande the FHIRPath Math functions.
var types = __webpack_require__(53);

var FP_TimeBase = types.FP_TimeBase,
    FP_Quantity = types.FP_Quantity;

var util = __webpack_require__(52);
/**
 *  Adds the math functions to the given FHIRPath engine.
 */


var engine = {};

function ensureNumberSingleton(x) {
  var d = util.valData(x);

  if (typeof d !== 'number') {
    if (d.length == 1 && typeof (d = util.valData(d[0])) === 'number') {
      return d;
    } else {
      throw new Error("Expected number, but got " + JSON.stringify(d || x));
    }
  } else return d;
}

function isEmpty(x) {
  if (typeof x == 'number') {
    return false;
  }

  return x.length == 0;
}

engine.amp = function (x, y) {
  return (x || "") + (y || "");
}; //HACK: for only polymorphic function
//  Actually, "minus" is now also polymorphic


engine.plus = function (xs, ys) {
  if (xs.length == 1 && ys.length == 1) {
    var x = util.valData(xs[0]);
    var y = util.valData(ys[0]); // In the future, this and other functions might need to return ResourceNode
    // to preserve the type information (integer vs decimal, and maybe decimal
    // vs string if decimals are represented as strings), in order to support
    // "as" and "is", but that support is deferred for now.

    if (typeof x == "string" && typeof y == "string") {
      return x + y;
    }

    if (typeof x == "number" && typeof y == "number") {
      return x + y;
    }

    if (x instanceof FP_TimeBase && y instanceof FP_Quantity) {
      return x.plus(y);
    }
  }

  throw new Error("Cannot " + JSON.stringify(xs) + " + " + JSON.stringify(ys));
};

engine.minus = function (xs, ys) {
  if (xs.length == 1 && ys.length == 1) {
    var x = util.valData(xs[0]);
    var y = util.valData(ys[0]);
    if (typeof x == "number" && typeof y == "number") return x - y;
    if (x instanceof FP_TimeBase && y instanceof FP_Quantity) return x.plus(new FP_Quantity(-y.value, y.unit));
  }

  throw new Error("Cannot " + JSON.stringify(xs) + " - " + JSON.stringify(ys));
};

engine.mul = function (x, y) {
  return x * y;
};

engine.div = function (x, y) {
  return x / y;
};

engine.intdiv = function (x, y) {
  return Math.floor(x / y);
};

engine.mod = function (x, y) {
  return x % y;
};

engine.abs = function (x) {
  if (isEmpty(x)) {
    return [];
  } else {
    var num = ensureNumberSingleton(x);
    return Math.abs(num);
  }
};

engine.ceiling = function (x) {
  if (isEmpty(x)) {
    return [];
  } else {
    var num = ensureNumberSingleton(x);
    return Math.ceil(num);
  }
};

engine.exp = function (x) {
  if (isEmpty(x)) {
    return [];
  } else {
    var num = ensureNumberSingleton(x);
    return Math.exp(num);
  }
};

engine.floor = function (x) {
  if (isEmpty(x)) {
    return [];
  } else {
    var num = ensureNumberSingleton(x);
    return Math.floor(num);
  }
};

engine.ln = function (x) {
  if (isEmpty(x)) {
    return [];
  } else {
    var num = ensureNumberSingleton(x);
    return Math.log(num);
  }
};

engine.log = function (x, base) {
  if (isEmpty(x) || isEmpty(base)) {
    return [];
  } else {
    var num = ensureNumberSingleton(x);
    var num2 = ensureNumberSingleton(base);
    return Math.log(num) / Math.log(num2);
  }
};

engine.power = function (x, degree) {
  if (isEmpty(x) || isEmpty(degree)) {
    return [];
  } else {
    var num = ensureNumberSingleton(x);
    var num2 = ensureNumberSingleton(degree);

    if (num < 0 && Math.floor(num2) != num2) {
      return [];
    } else {
      return Math.pow(num, num2);
    }
  }
};

engine.round = function (x, acc) {
  if (isEmpty(x)) {
    return [];
  } else {
    var num = ensureNumberSingleton(x);

    if (isEmpty(acc)) {
      return Math.round(num);
    } else {
      var num2 = ensureNumberSingleton(acc);
      var degree = Math.pow(10, num2);
      return Math.round(num * degree) / degree;
    }
  }
};

engine.sqrt = function (x) {
  if (isEmpty(x)) {
    return [];
  } else {
    var num = ensureNumberSingleton(x);

    if (num < 0) {
      return [];
    } else {
      return Math.sqrt(num);
    }
  }
};

engine.truncate = function (x) {
  if (isEmpty(x)) {
    return [];
  } else {
    var num = ensureNumberSingleton(x);
    return Math.trunc(num);
  }
};

module.exports = engine;

/***/ }),
/* 79 */
/***/ (function(module, exports, __webpack_require__) {

var util = __webpack_require__(52);

var misc = __webpack_require__(72);

var engine = {}; // Cache for rewritten RegExp patterns

var cachedRegExp = {};
/**
 * Rewrites RegExp pattern to support single-line mode (dotAll) in IE11:
 * To do that we replace "." with "[^]" in source RegExp pattern,
 * except where "." is escaped or is inside unescaped [].
 * Another way to do the same is using package regexpu-core
 * or packages regjsparser/regjsgen.
 * @param {string} pattern - source RegExp pattern
 * @return {string}
 */

function rewritePatternForDotAll(pattern) {
  if (!cachedRegExp[pattern]) {
    cachedRegExp[pattern] = pattern.replace(/\./g, function (_, offset, entirePattern) {
      // The preceding part of the string
      var precedingPart = entirePattern.substr(0, offset); // The preceding part of the string without escaped characters: '\', '[' or ']'

      var cleanPrecedingPart = precedingPart.replace(/\\\\/g, '').replace(/\\[\][]/g, ''); // Check if '.' is escaped

      var escaped = cleanPrecedingPart[cleanPrecedingPart.length - 1] === '\\'; // The last index of unescaped '['

      var lastIndexOfOpenBracket = cleanPrecedingPart.lastIndexOf('['); // The last index of unescaped ']'

      var lastIndexOfCloseBracket = cleanPrecedingPart.lastIndexOf(']');
      return escaped || lastIndexOfOpenBracket > lastIndexOfCloseBracket ? '.' : '[^]';
    });
  }

  return cachedRegExp[pattern];
}

engine.indexOf = function (coll, substr) {
  var str = misc.singleton(coll, 'String');
  return util.isEmpty(substr) || util.isEmpty(str) ? [] : str.indexOf(substr);
};

engine.substring = function (coll, start, length) {
  var str = misc.singleton(coll, 'String');

  if (util.isEmpty(str) || util.isEmpty(start) || start < 0 || start >= str.length) {
    return [];
  }

  if (length === undefined || util.isEmpty(length)) {
    return str.substring(start);
  }

  return str.substring(start, start + length);
};

engine.startsWith = function (coll, prefix) {
  var str = misc.singleton(coll, 'String');
  return util.isEmpty(prefix) || util.isEmpty(str) ? [] : str.startsWith(prefix);
};

engine.endsWith = function (coll, postfix) {
  var str = misc.singleton(coll, 'String');
  return util.isEmpty(postfix) || util.isEmpty(str) ? [] : str.endsWith(postfix);
};

engine.containsFn = function (coll, substr) {
  var str = misc.singleton(coll, 'String');
  return util.isEmpty(substr) || util.isEmpty(str) ? [] : str.includes(substr);
};

engine.upper = function (coll) {
  var str = misc.singleton(coll, 'String');
  return util.isEmpty(str) ? [] : str.toUpperCase();
};

engine.lower = function (coll) {
  var str = misc.singleton(coll, 'String');
  return util.isEmpty(str) ? [] : str.toLowerCase();
}; // Check if dotAll is supported.
// See https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp/dotAll for details.


var dotAllIsSupported = new RegExp('').dotAll === false;

if (dotAllIsSupported) {
  engine.matches = function (coll, regex) {
    var str = misc.singleton(coll, 'String');

    if (util.isEmpty(regex) || util.isEmpty(str)) {
      return [];
    }

    var reg = new RegExp(regex, 's');
    return reg.test(str);
  };
} else {
  engine.matches = function (coll, regex) {
    var str = misc.singleton(coll, 'String');

    if (util.isEmpty(regex) || util.isEmpty(str)) {
      return [];
    }

    var reg = new RegExp(rewritePatternForDotAll(regex));
    return reg.test(str);
  };
}

engine.replace = function (coll, pattern, repl) {
  var str = misc.singleton(coll, 'String');

  if (util.isEmpty(pattern) || util.isEmpty(repl) || util.isEmpty(str)) {
    return [];
  }

  var reg = new RegExp(util.escapeStringForRegExp(pattern), 'g');
  return str.replace(reg, repl);
};

engine.replaceMatches = function (coll, regex, repl) {
  var str = misc.singleton(coll, 'String');

  if (util.isEmpty(regex) || util.isEmpty(repl) || util.isEmpty(str)) {
    return [];
  }

  var reg = new RegExp(regex, 'g');
  return str.replace(reg, repl);
};

engine.length = function (coll) {
  var str = misc.singleton(coll, 'String');
  return util.isEmpty(str) ? [] : str.length;
};

engine.toChars = function (coll) {
  var str = misc.singleton(coll, 'String');
  return util.isEmpty(str) ? [] : str.split('');
};

module.exports = engine;

/***/ }),
/* 80 */
/***/ (function(module, exports, __webpack_require__) {

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var util = __webpack_require__(52);

var _require = __webpack_require__(53),
    ResourceNode = _require.ResourceNode;

var makeResNode = ResourceNode.makeResNode;
var engine = {};

engine.children = function (coll) {
  var model = this.model; // "this" is the context object

  return coll.reduce(function (acc, x) {
    var d = util.valData(x);
    x = makeResNode(x);

    if (_typeof(d) === 'object') {
      for (var _i = 0, _Object$keys = Object.keys(d); _i < _Object$keys.length; _i++) {
        var prop = _Object$keys[_i];
        var v = d[prop];
        var childPath = x.path + '.' + prop;

        if (model) {
          var defPath = model.pathsDefinedElsewhere[childPath];
          if (defPath) childPath = defPath;
        }

        if (Array.isArray(v)) {
          acc.push.apply(acc, v.map(function (n) {
            return makeResNode(n, childPath);
          }));
        } else {
          acc.push(makeResNode(v, childPath));
        }
      }

      return acc;
    } else {
      return acc;
    }
  }, []);
};

engine.descendants = function (coll) {
  var ch = engine.children.call(this, coll); // "this" is the context object

  var res = [];

  while (ch.length > 0) {
    res.push.apply(res, ch);
    ch = engine.children.call(this, ch);
  }

  return res;
};

module.exports = engine;

/***/ }),
/* 81 */
/***/ (function(module, exports, __webpack_require__) {

var engine = {};

var types = __webpack_require__(53);

var constants = __webpack_require__(69);

var FP_DateTime = types.FP_DateTime;
/**
 *  Implements FHIRPath now().
 */

engine.now = function () {
  if (!constants.now) {
    // return new FP_DateTime((new Date()).toISOString());
    // The above would construct an FP_DateTime with a timezone of "Z", which
    // would not make a difference for computation, but if the end result of an
    // expression is "now()", then it would look different when output to a user.
    // Construct it ourselves to preserve timezone
    var now = constants.nowDate; // a JS Date

    var isoStr = FP_DateTime.isoDateTime(now);
    constants.now = new FP_DateTime(isoStr);
  }

  return constants.now;
};
/**
 *  Implements FHIRPath today().  See comments in now(). This does not
 *  include a timezone offset.
 */


engine.today = function () {
  if (!constants.today) {
    // Construct the string ourselves to preserve timezone
    var now = constants.nowDate; // a JS Date

    var isoStr = FP_DateTime.isoDate(now);
    constants.today = new FP_DateTime(isoStr);
  }

  return constants.today;
};

module.exports = engine;

/***/ }),
/* 82 */
/***/ (function(module, exports) {

var engine = {};

engine.orOp = function (a, b) {
  if (Array.isArray(b)) {
    if (a === true) {
      return true;
    } else if (a === false) {
      return [];
    } else if (Array.isArray(a)) {
      return [];
    }
  }

  if (Array.isArray(a)) {
    if (b === true) {
      return true;
    } else {
      return [];
    }
  }

  return a || b;
};

engine.andOp = function (a, b) {
  if (Array.isArray(b)) {
    if (a === true) {
      return [];
    } else if (a === false) {
      return false;
    } else if (Array.isArray(a)) {
      return [];
    }
  }

  if (Array.isArray(a)) {
    if (b === true) {
      return [];
    } else {
      return false;
    }
  }

  return a && b;
};

engine.xorOp = function (a, b) {
  // If a or b are arrays, they must be the empty set.
  // In that case, the result is always the empty set.
  if (Array.isArray(a) || Array.isArray(b)) return [];
  return a && !b || !a && b;
};

engine.impliesOp = function (a, b) {
  if (Array.isArray(b)) {
    if (a === true) {
      return [];
    } else if (a === false) {
      return true;
    } else if (Array.isArray(a)) {
      return [];
    }
  }

  if (Array.isArray(a)) {
    if (b === true) {
      return true;
    } else {
      return [];
    }
  }

  if (a === false) {
    return true;
  }

  return a && b;
};

module.exports = engine;

/***/ }),
/* 83 */
/***/ (function(module, exports, __webpack_require__) {

/**
 *  Exports the FHIR model data for R4.  This is an internal structure that
 *  will likely evolve as more FHIR specific processing is added.
 */
module.exports = {
  /**
   *  A hash of resource element paths (e.g. Observation.value) that are known
   *  to point to fiels that are choice types.
   */
  choiceTypePaths: __webpack_require__(84),

  /**
   *  A hash from paths to the path for which their content is defined, e.g.
   *  Questionnaire.item.item -> Questionnaire.item.
   */
  pathsDefinedElsewhere: __webpack_require__(85)
};

/***/ }),
/* 84 */
/***/ (function(module) {

module.exports = JSON.parse("{\"ActivityDefinition.product\":[\"Reference\",\"CodeableConcept\"],\"ActivityDefinition.subject\":[\"CodeableConcept\",\"Reference\"],\"ActivityDefinition.timing\":[\"Timing\",\"DateTime\",\"Age\",\"Period\",\"Range\",\"Duration\"],\"AllergyIntolerance.onset\":[\"DateTime\",\"Age\",\"Period\",\"Range\",\"String\"],\"Annotation.author\":[\"Reference\",\"String\"],\"AuditEvent.entity.detail.value\":[\"String\",\"Base64Binary\"],\"BiologicallyDerivedProduct.collection.collected\":[\"DateTime\",\"Period\"],\"BiologicallyDerivedProduct.manipulation.time\":[\"DateTime\",\"Period\"],\"BiologicallyDerivedProduct.processing.time\":[\"DateTime\",\"Period\"],\"CarePlan.activity.detail.product\":[\"CodeableConcept\",\"Reference\"],\"CarePlan.activity.detail.scheduled\":[\"Timing\",\"Period\",\"String\"],\"ChargeItem.occurrence\":[\"DateTime\",\"Period\",\"Timing\"],\"ChargeItem.product\":[\"Reference\",\"CodeableConcept\"],\"Claim.accident.location\":[\"Address\",\"Reference\"],\"Claim.diagnosis.diagnosis\":[\"CodeableConcept\",\"Reference\"],\"Claim.item.location\":[\"CodeableConcept\",\"Address\",\"Reference\"],\"Claim.item.serviced\":[\"Date\",\"Period\"],\"Claim.procedure.procedure\":[\"CodeableConcept\",\"Reference\"],\"Claim.supportingInfo.timing\":[\"Date\",\"Period\"],\"Claim.supportingInfo.value\":[\"Boolean\",\"String\",\"Quantity\",\"Attachment\",\"Reference\"],\"ClaimResponse.addItem.location\":[\"CodeableConcept\",\"Address\",\"Reference\"],\"ClaimResponse.addItem.serviced\":[\"Date\",\"Period\"],\"ClinicalImpression.effective\":[\"DateTime\",\"Period\"],\"CodeSystem.concept.property.value\":[\"Code\",\"Coding\",\"String\",\"Integer\",\"Boolean\",\"DateTime\",\"Decimal\"],\"Communication.payload.content\":[\"String\",\"Attachment\",\"Reference\"],\"CommunicationRequest.occurrence\":[\"DateTime\",\"Period\"],\"CommunicationRequest.payload.content\":[\"String\",\"Attachment\",\"Reference\"],\"Composition.relatesTo.target\":[\"Identifier\",\"Reference\"],\"ConceptMap.source\":[\"Uri\",\"Canonical\"],\"ConceptMap.target\":[\"Uri\",\"Canonical\"],\"Condition.abatement\":[\"DateTime\",\"Age\",\"Period\",\"Range\",\"String\"],\"Condition.onset\":[\"DateTime\",\"Age\",\"Period\",\"Range\",\"String\"],\"Consent.source\":[\"Attachment\",\"Reference\"],\"Contract.friendly.content\":[\"Attachment\",\"Reference\"],\"Contract.legal.content\":[\"Attachment\",\"Reference\"],\"Contract.legallyBinding\":[\"Attachment\",\"Reference\"],\"Contract.rule.content\":[\"Attachment\",\"Reference\"],\"Contract.term.action.occurrence\":[\"DateTime\",\"Period\",\"Timing\"],\"Contract.term.asset.valuedItem.entity\":[\"CodeableConcept\",\"Reference\"],\"Contract.term.offer.answer.value\":[\"Boolean\",\"Decimal\",\"Integer\",\"Date\",\"DateTime\",\"Time\",\"String\",\"Uri\",\"Attachment\",\"Coding\",\"Quantity\",\"Reference\"],\"Contract.term.topic\":[\"CodeableConcept\",\"Reference\"],\"Contract.topic\":[\"CodeableConcept\",\"Reference\"],\"Coverage.costToBeneficiary.value\":[\"Quantity\",\"Money\"],\"CoverageEligibilityRequest.item.diagnosis.diagnosis\":[\"CodeableConcept\",\"Reference\"],\"CoverageEligibilityRequest.serviced\":[\"Date\",\"Period\"],\"CoverageEligibilityResponse.insurance.item.benefit.allowed\":[\"UnsignedInt\",\"String\",\"Money\"],\"CoverageEligibilityResponse.insurance.item.benefit.used\":[\"UnsignedInt\",\"String\",\"Money\"],\"CoverageEligibilityResponse.serviced\":[\"Date\",\"Period\"],\"DataRequirement.dateFilter.value\":[\"DateTime\",\"Period\",\"Duration\"],\"DataRequirement.subject\":[\"CodeableConcept\",\"Reference\"],\"DetectedIssue.identified\":[\"DateTime\",\"Period\"],\"DeviceDefinition.manufacturer\":[\"String\",\"Reference\"],\"DeviceRequest.code\":[\"Reference\",\"CodeableConcept\"],\"DeviceRequest.occurrence\":[\"DateTime\",\"Period\",\"Timing\"],\"DeviceRequest.parameter.value\":[\"CodeableConcept\",\"Quantity\",\"Range\",\"Boolean\"],\"DeviceUseStatement.timing\":[\"Timing\",\"Period\",\"DateTime\"],\"DiagnosticReport.effective\":[\"DateTime\",\"Period\"],\"Dosage.asNeeded\":[\"Boolean\",\"CodeableConcept\"],\"Dosage.doseAndRate.dose\":[\"Range\",\"Quantity\"],\"Dosage.doseAndRate.rate\":[\"Ratio\",\"Range\",\"Quantity\"],\"ElementDefinition.defaultValue\":[\"Base64Binary\",\"Boolean\",\"Canonical\",\"Code\",\"Date\",\"DateTime\",\"Decimal\",\"Id\",\"Instant\",\"Integer\",\"Markdown\",\"Oid\",\"PositiveInt\",\"String\",\"Time\",\"UnsignedInt\",\"Uri\",\"Url\",\"Uuid\",\"Address\",\"Age\",\"Annotation\",\"Attachment\",\"CodeableConcept\",\"Coding\",\"ContactPoint\",\"Count\",\"Distance\",\"Duration\",\"HumanName\",\"Identifier\",\"Money\",\"Period\",\"Quantity\",\"Range\",\"Ratio\",\"Reference\",\"SampledData\",\"Signature\",\"Timing\",\"ContactDetail\",\"Contributor\",\"DataRequirement\",\"Expression\",\"ParameterDefinition\",\"RelatedArtifact\",\"TriggerDefinition\",\"UsageContext\",\"Dosage\",\"Meta\"],\"ElementDefinition.example.value\":[\"Base64Binary\",\"Boolean\",\"Canonical\",\"Code\",\"Date\",\"DateTime\",\"Decimal\",\"Id\",\"Instant\",\"Integer\",\"Markdown\",\"Oid\",\"PositiveInt\",\"String\",\"Time\",\"UnsignedInt\",\"Uri\",\"Url\",\"Uuid\",\"Address\",\"Age\",\"Annotation\",\"Attachment\",\"CodeableConcept\",\"Coding\",\"ContactPoint\",\"Count\",\"Distance\",\"Duration\",\"HumanName\",\"Identifier\",\"Money\",\"Period\",\"Quantity\",\"Range\",\"Ratio\",\"Reference\",\"SampledData\",\"Signature\",\"Timing\",\"ContactDetail\",\"Contributor\",\"DataRequirement\",\"Expression\",\"ParameterDefinition\",\"RelatedArtifact\",\"TriggerDefinition\",\"UsageContext\",\"Dosage\",\"Meta\"],\"ElementDefinition.extension.value\":[\"CodeableConcept\",\"Canonical\"],\"ElementDefinition.fixed\":[\"Base64Binary\",\"Boolean\",\"Canonical\",\"Code\",\"Date\",\"DateTime\",\"Decimal\",\"Id\",\"Instant\",\"Integer\",\"Markdown\",\"Oid\",\"PositiveInt\",\"String\",\"Time\",\"UnsignedInt\",\"Uri\",\"Url\",\"Uuid\",\"Address\",\"Age\",\"Annotation\",\"Attachment\",\"CodeableConcept\",\"Coding\",\"ContactPoint\",\"Count\",\"Distance\",\"Duration\",\"HumanName\",\"Identifier\",\"Money\",\"Period\",\"Quantity\",\"Range\",\"Ratio\",\"Reference\",\"SampledData\",\"Signature\",\"Timing\",\"ContactDetail\",\"Contributor\",\"DataRequirement\",\"Expression\",\"ParameterDefinition\",\"RelatedArtifact\",\"TriggerDefinition\",\"UsageContext\",\"Dosage\",\"Meta\"],\"ElementDefinition.maxValue\":[\"Date\",\"DateTime\",\"Instant\",\"Time\",\"Decimal\",\"Integer\",\"PositiveInt\",\"UnsignedInt\",\"Quantity\"],\"ElementDefinition.minValue\":[\"Date\",\"DateTime\",\"Instant\",\"Time\",\"Decimal\",\"Integer\",\"PositiveInt\",\"UnsignedInt\",\"Quantity\"],\"ElementDefinition.pattern\":[\"Base64Binary\",\"Boolean\",\"Canonical\",\"Code\",\"Date\",\"DateTime\",\"Decimal\",\"Id\",\"Instant\",\"Integer\",\"Markdown\",\"Oid\",\"PositiveInt\",\"String\",\"Time\",\"UnsignedInt\",\"Uri\",\"Url\",\"Uuid\",\"Address\",\"Age\",\"Annotation\",\"Attachment\",\"CodeableConcept\",\"Coding\",\"ContactPoint\",\"Count\",\"Distance\",\"Duration\",\"HumanName\",\"Identifier\",\"Money\",\"Period\",\"Quantity\",\"Range\",\"Ratio\",\"Reference\",\"SampledData\",\"Signature\",\"Timing\",\"ContactDetail\",\"Contributor\",\"DataRequirement\",\"Expression\",\"ParameterDefinition\",\"RelatedArtifact\",\"TriggerDefinition\",\"UsageContext\",\"Dosage\",\"Meta\"],\"EventDefinition.subject\":[\"CodeableConcept\",\"Reference\"],\"EvidenceVariable.characteristic.definition\":[\"Reference\",\"Canonical\",\"CodeableConcept\",\"Expression\",\"DataRequirement\",\"TriggerDefinition\"],\"EvidenceVariable.characteristic.participantEffective\":[\"DateTime\",\"Period\",\"Duration\",\"Timing\"],\"ExplanationOfBenefit.accident.location\":[\"Address\",\"Reference\"],\"ExplanationOfBenefit.addItem.location\":[\"CodeableConcept\",\"Address\",\"Reference\"],\"ExplanationOfBenefit.addItem.serviced\":[\"Date\",\"Period\"],\"ExplanationOfBenefit.benefitBalance.financial.allowed\":[\"UnsignedInt\",\"String\",\"Money\"],\"ExplanationOfBenefit.benefitBalance.financial.used\":[\"UnsignedInt\",\"Money\"],\"ExplanationOfBenefit.diagnosis.diagnosis\":[\"CodeableConcept\",\"Reference\"],\"ExplanationOfBenefit.item.location\":[\"CodeableConcept\",\"Address\",\"Reference\"],\"ExplanationOfBenefit.item.serviced\":[\"Date\",\"Period\"],\"ExplanationOfBenefit.procedure.procedure\":[\"CodeableConcept\",\"Reference\"],\"ExplanationOfBenefit.supportingInfo.timing\":[\"Date\",\"Period\"],\"ExplanationOfBenefit.supportingInfo.value\":[\"Boolean\",\"String\",\"Quantity\",\"Attachment\",\"Reference\"],\"Extension.value\":[\"Base64Binary\",\"Boolean\",\"Canonical\",\"Code\",\"Date\",\"DateTime\",\"Decimal\",\"Id\",\"Instant\",\"Integer\",\"Markdown\",\"Oid\",\"PositiveInt\",\"String\",\"Time\",\"UnsignedInt\",\"Uri\",\"Url\",\"Uuid\",\"Address\",\"Age\",\"Annotation\",\"Attachment\",\"CodeableConcept\",\"Coding\",\"ContactPoint\",\"Count\",\"Distance\",\"Duration\",\"HumanName\",\"Identifier\",\"Money\",\"Period\",\"Quantity\",\"Range\",\"Ratio\",\"Reference\",\"SampledData\",\"Signature\",\"Timing\",\"ContactDetail\",\"Contributor\",\"DataRequirement\",\"Expression\",\"ParameterDefinition\",\"RelatedArtifact\",\"TriggerDefinition\",\"UsageContext\",\"Dosage\",\"Meta\"],\"FamilyMemberHistory.age\":[\"Age\",\"Range\",\"String\"],\"FamilyMemberHistory.born\":[\"Period\",\"Date\",\"String\"],\"FamilyMemberHistory.condition.onset\":[\"Age\",\"Range\",\"Period\",\"String\"],\"FamilyMemberHistory.deceased\":[\"Boolean\",\"Age\",\"Range\",\"Date\",\"String\"],\"Goal.start\":[\"Date\",\"CodeableConcept\"],\"Goal.target.detail\":[\"Quantity\",\"Range\",\"CodeableConcept\",\"String\",\"Boolean\",\"Integer\",\"Ratio\"],\"Goal.target.due\":[\"Date\",\"Duration\"],\"Group.characteristic.value\":[\"CodeableConcept\",\"Boolean\",\"Quantity\",\"Range\",\"Reference\"],\"GuidanceResponse.module\":[\"Uri\",\"Canonical\",\"CodeableConcept\"],\"Immunization.occurrence\":[\"DateTime\",\"String\"],\"Immunization.protocolApplied.doseNumber\":[\"PositiveInt\",\"String\"],\"Immunization.protocolApplied.seriesDoses\":[\"PositiveInt\",\"String\"],\"ImmunizationEvaluation.doseNumber\":[\"PositiveInt\",\"String\"],\"ImmunizationEvaluation.seriesDoses\":[\"PositiveInt\",\"String\"],\"ImmunizationRecommendation.recommendation.doseNumber\":[\"PositiveInt\",\"String\"],\"ImmunizationRecommendation.recommendation.seriesDoses\":[\"PositiveInt\",\"String\"],\"ImplementationGuide.definition.page.name\":[\"Url\",\"Reference\"],\"ImplementationGuide.definition.resource.example\":[\"Boolean\",\"Canonical\"],\"ImplementationGuide.manifest.resource.example\":[\"Boolean\",\"Canonical\"],\"Invoice.lineItem.chargeItem\":[\"Reference\",\"CodeableConcept\"],\"Library.subject\":[\"CodeableConcept\",\"Reference\"],\"Measure.subject\":[\"CodeableConcept\",\"Reference\"],\"Media.created\":[\"DateTime\",\"Period\"],\"Medication.ingredient.item\":[\"CodeableConcept\",\"Reference\"],\"MedicationAdministration.dosage.rate\":[\"Ratio\",\"Quantity\"],\"MedicationAdministration.effective\":[\"DateTime\",\"Period\"],\"MedicationAdministration.medication\":[\"CodeableConcept\",\"Reference\"],\"MedicationDispense.medication\":[\"CodeableConcept\",\"Reference\"],\"MedicationDispense.statusReason\":[\"CodeableConcept\",\"Reference\"],\"MedicationKnowledge.administrationGuidelines.indication\":[\"CodeableConcept\",\"Reference\"],\"MedicationKnowledge.administrationGuidelines.patientCharacteristics.characteristic\":[\"CodeableConcept\",\"Quantity\"],\"MedicationKnowledge.drugCharacteristic.value\":[\"CodeableConcept\",\"String\",\"Quantity\",\"Base64Binary\"],\"MedicationKnowledge.ingredient.item\":[\"CodeableConcept\",\"Reference\"],\"MedicationRequest.medication\":[\"CodeableConcept\",\"Reference\"],\"MedicationRequest.reported\":[\"Boolean\",\"Reference\"],\"MedicationRequest.substitution.allowed\":[\"Boolean\",\"CodeableConcept\"],\"MedicationStatement.effective\":[\"DateTime\",\"Period\"],\"MedicationStatement.medication\":[\"CodeableConcept\",\"Reference\"],\"MedicinalProduct.specialDesignation.indication\":[\"CodeableConcept\",\"Reference\"],\"MedicinalProductAuthorization.procedure.date\":[\"Period\",\"DateTime\"],\"MedicinalProductContraindication.otherTherapy.medication\":[\"CodeableConcept\",\"Reference\"],\"MedicinalProductIndication.otherTherapy.medication\":[\"CodeableConcept\",\"Reference\"],\"MedicinalProductInteraction.interactant.item\":[\"Reference\",\"CodeableConcept\"],\"MessageDefinition.event\":[\"Coding\",\"Uri\"],\"MessageHeader.event\":[\"Coding\",\"Uri\"],\"NutritionOrder.enteralFormula.administration.rate\":[\"Quantity\",\"Ratio\"],\"Observation.component.value\":[\"Quantity\",\"CodeableConcept\",\"String\",\"Boolean\",\"Integer\",\"Range\",\"Ratio\",\"SampledData\",\"Time\",\"DateTime\",\"Period\"],\"Observation.effective\":[\"DateTime\",\"Period\",\"Timing\",\"Instant\"],\"Observation.value\":[\"Quantity\",\"CodeableConcept\",\"String\",\"Boolean\",\"Integer\",\"Range\",\"Ratio\",\"SampledData\",\"Time\",\"DateTime\",\"Period\"],\"Parameters.parameter.value\":[\"Base64Binary\",\"Boolean\",\"Canonical\",\"Code\",\"Date\",\"DateTime\",\"Decimal\",\"Id\",\"Instant\",\"Integer\",\"Markdown\",\"Oid\",\"PositiveInt\",\"String\",\"Time\",\"UnsignedInt\",\"Uri\",\"Url\",\"Uuid\",\"Address\",\"Age\",\"Annotation\",\"Attachment\",\"CodeableConcept\",\"Coding\",\"ContactPoint\",\"Count\",\"Distance\",\"Duration\",\"HumanName\",\"Identifier\",\"Money\",\"Period\",\"Quantity\",\"Range\",\"Ratio\",\"Reference\",\"SampledData\",\"Signature\",\"Timing\",\"ContactDetail\",\"Contributor\",\"DataRequirement\",\"Expression\",\"ParameterDefinition\",\"RelatedArtifact\",\"TriggerDefinition\",\"UsageContext\",\"Dosage\",\"Meta\"],\"Patient.deceased\":[\"Boolean\",\"DateTime\"],\"Patient.multipleBirth\":[\"Boolean\",\"Integer\"],\"PlanDefinition.action.definition\":[\"Canonical\",\"Uri\"],\"PlanDefinition.action.relatedAction.offset\":[\"Duration\",\"Range\"],\"PlanDefinition.action.subject\":[\"CodeableConcept\",\"Reference\"],\"PlanDefinition.action.timing\":[\"DateTime\",\"Age\",\"Period\",\"Duration\",\"Range\",\"Timing\"],\"PlanDefinition.goal.target.detail\":[\"Quantity\",\"Range\",\"CodeableConcept\"],\"PlanDefinition.subject\":[\"CodeableConcept\",\"Reference\"],\"Population.age\":[\"Range\",\"CodeableConcept\"],\"Procedure.performed\":[\"DateTime\",\"Period\",\"String\",\"Age\",\"Range\"],\"Provenance.occurred\":[\"Period\",\"DateTime\"],\"Questionnaire.item.answerOption.value\":[\"Integer\",\"Date\",\"Time\",\"String\",\"Coding\",\"Reference\"],\"Questionnaire.item.enableWhen.answer\":[\"Boolean\",\"Decimal\",\"Integer\",\"Date\",\"DateTime\",\"Time\",\"String\",\"Coding\",\"Quantity\",\"Reference\"],\"Questionnaire.item.initial.value\":[\"Boolean\",\"Decimal\",\"Integer\",\"Date\",\"DateTime\",\"Time\",\"String\",\"Uri\",\"Attachment\",\"Coding\",\"Quantity\",\"Reference\"],\"QuestionnaireResponse.item.answer.value\":[\"Boolean\",\"Decimal\",\"Integer\",\"Date\",\"DateTime\",\"Time\",\"String\",\"Uri\",\"Attachment\",\"Coding\",\"Quantity\",\"Reference\"],\"RequestGroup.action.relatedAction.offset\":[\"Duration\",\"Range\"],\"RequestGroup.action.timing\":[\"DateTime\",\"Age\",\"Period\",\"Duration\",\"Range\",\"Timing\"],\"ResearchDefinition.subject\":[\"CodeableConcept\",\"Reference\"],\"ResearchElementDefinition.characteristic.definition\":[\"CodeableConcept\",\"Canonical\",\"Expression\",\"DataRequirement\"],\"ResearchElementDefinition.characteristic.participantEffective\":[\"DateTime\",\"Period\",\"Duration\",\"Timing\"],\"ResearchElementDefinition.characteristic.studyEffective\":[\"DateTime\",\"Period\",\"Duration\",\"Timing\"],\"ResearchElementDefinition.subject\":[\"CodeableConcept\",\"Reference\"],\"RiskAssessment.occurrence\":[\"DateTime\",\"Period\"],\"RiskAssessment.prediction.probability\":[\"Decimal\",\"Range\"],\"RiskAssessment.prediction.when\":[\"Period\",\"Range\"],\"ServiceRequest.asNeeded\":[\"Boolean\",\"CodeableConcept\"],\"ServiceRequest.occurrence\":[\"DateTime\",\"Period\",\"Timing\"],\"ServiceRequest.quantity\":[\"Quantity\",\"Ratio\",\"Range\"],\"Specimen.collection.collected\":[\"DateTime\",\"Period\"],\"Specimen.collection.fastingStatus\":[\"CodeableConcept\",\"Duration\"],\"Specimen.container.additive\":[\"CodeableConcept\",\"Reference\"],\"Specimen.processing.time\":[\"DateTime\",\"Period\"],\"SpecimenDefinition.typeTested.container.additive.additive\":[\"CodeableConcept\",\"Reference\"],\"SpecimenDefinition.typeTested.container.minimumVolume\":[\"Quantity\",\"String\"],\"StructureMap.group.rule.source.defaultValue\":[\"Base64Binary\",\"Boolean\",\"Canonical\",\"Code\",\"Date\",\"DateTime\",\"Decimal\",\"Id\",\"Instant\",\"Integer\",\"Markdown\",\"Oid\",\"PositiveInt\",\"String\",\"Time\",\"UnsignedInt\",\"Uri\",\"Url\",\"Uuid\",\"Address\",\"Age\",\"Annotation\",\"Attachment\",\"CodeableConcept\",\"Coding\",\"ContactPoint\",\"Count\",\"Distance\",\"Duration\",\"HumanName\",\"Identifier\",\"Money\",\"Period\",\"Quantity\",\"Range\",\"Ratio\",\"Reference\",\"SampledData\",\"Signature\",\"Timing\",\"ContactDetail\",\"Contributor\",\"DataRequirement\",\"Expression\",\"ParameterDefinition\",\"RelatedArtifact\",\"TriggerDefinition\",\"UsageContext\",\"Dosage\",\"Meta\"],\"StructureMap.group.rule.target.parameter.value\":[\"Id\",\"String\",\"Boolean\",\"Integer\",\"Decimal\"],\"Substance.ingredient.substance\":[\"CodeableConcept\",\"Reference\"],\"SubstanceAmount.amount\":[\"Quantity\",\"Range\",\"String\"],\"SubstanceReferenceInformation.target.amount\":[\"Quantity\",\"Range\",\"String\"],\"SubstanceSpecification.moiety.amount\":[\"Quantity\",\"String\"],\"SubstanceSpecification.property.amount\":[\"Quantity\",\"String\"],\"SubstanceSpecification.property.definingSubstance\":[\"Reference\",\"CodeableConcept\"],\"SubstanceSpecification.relationship.amount\":[\"Quantity\",\"Range\",\"Ratio\",\"String\"],\"SubstanceSpecification.relationship.substance\":[\"Reference\",\"CodeableConcept\"],\"SupplyDelivery.occurrence\":[\"DateTime\",\"Period\",\"Timing\"],\"SupplyDelivery.suppliedItem.item\":[\"CodeableConcept\",\"Reference\"],\"SupplyRequest.item\":[\"CodeableConcept\",\"Reference\"],\"SupplyRequest.occurrence\":[\"DateTime\",\"Period\",\"Timing\"],\"SupplyRequest.parameter.value\":[\"CodeableConcept\",\"Quantity\",\"Range\",\"Boolean\"],\"Task.input.value\":[\"Base64Binary\",\"Boolean\",\"Canonical\",\"Code\",\"Date\",\"DateTime\",\"Decimal\",\"Id\",\"Instant\",\"Integer\",\"Markdown\",\"Oid\",\"PositiveInt\",\"String\",\"Time\",\"UnsignedInt\",\"Uri\",\"Url\",\"Uuid\",\"Address\",\"Age\",\"Annotation\",\"Attachment\",\"CodeableConcept\",\"Coding\",\"ContactPoint\",\"Count\",\"Distance\",\"Duration\",\"HumanName\",\"Identifier\",\"Money\",\"Period\",\"Quantity\",\"Range\",\"Ratio\",\"Reference\",\"SampledData\",\"Signature\",\"Timing\",\"ContactDetail\",\"Contributor\",\"DataRequirement\",\"Expression\",\"ParameterDefinition\",\"RelatedArtifact\",\"TriggerDefinition\",\"UsageContext\",\"Dosage\",\"Meta\"],\"Task.output.value\":[\"Base64Binary\",\"Boolean\",\"Canonical\",\"Code\",\"Date\",\"DateTime\",\"Decimal\",\"Id\",\"Instant\",\"Integer\",\"Markdown\",\"Oid\",\"PositiveInt\",\"String\",\"Time\",\"UnsignedInt\",\"Uri\",\"Url\",\"Uuid\",\"Address\",\"Age\",\"Annotation\",\"Attachment\",\"CodeableConcept\",\"Coding\",\"ContactPoint\",\"Count\",\"Distance\",\"Duration\",\"HumanName\",\"Identifier\",\"Money\",\"Period\",\"Quantity\",\"Range\",\"Ratio\",\"Reference\",\"SampledData\",\"Signature\",\"Timing\",\"ContactDetail\",\"Contributor\",\"DataRequirement\",\"Expression\",\"ParameterDefinition\",\"RelatedArtifact\",\"TriggerDefinition\",\"UsageContext\",\"Dosage\",\"Meta\"],\"Timing.repeat.bounds\":[\"Duration\",\"Range\",\"Period\"],\"TriggerDefinition.timing\":[\"Timing\",\"Reference\",\"Date\",\"DateTime\"],\"UsageContext.value\":[\"CodeableConcept\",\"Quantity\",\"Range\",\"Reference\"],\"ValueSet.expansion.parameter.value\":[\"String\",\"Boolean\",\"Integer\",\"Decimal\",\"Uri\",\"Code\",\"DateTime\"]}");

/***/ }),
/* 85 */
/***/ (function(module) {

module.exports = JSON.parse("{\"Bundle.entry.link\":\"Bundle.link\",\"CapabilityStatement.rest.operation\":\"CapabilityStatement.rest.resource.operation\",\"CapabilityStatement.rest.searchParam\":\"CapabilityStatement.rest.resource.searchParam\",\"ChargeItemDefinition.propertyGroup.applicability\":\"ChargeItemDefinition.applicability\",\"ClaimResponse.addItem.adjudication\":\"ClaimResponse.item.adjudication\",\"ClaimResponse.addItem.detail.adjudication\":\"ClaimResponse.item.adjudication\",\"ClaimResponse.addItem.detail.subDetail.adjudication\":\"ClaimResponse.item.adjudication\",\"ClaimResponse.adjudication\":\"ClaimResponse.item.adjudication\",\"ClaimResponse.item.detail.adjudication\":\"ClaimResponse.item.adjudication\",\"ClaimResponse.item.detail.subDetail.adjudication\":\"ClaimResponse.item.adjudication\",\"CodeSystem.concept.concept\":\"CodeSystem.concept\",\"Composition.section.section\":\"Composition.section\",\"ConceptMap.group.element.target.product\":\"ConceptMap.group.element.target.dependsOn\",\"Consent.provision.provision\":\"Consent.provision\",\"Contract.term.asset.answer\":\"Contract.term.offer.answer\",\"Contract.term.group\":\"Contract.term\",\"ExampleScenario.process.step.alternative.step\":\"ExampleScenario.process.step\",\"ExampleScenario.process.step.operation.request\":\"ExampleScenario.instance.containedInstance\",\"ExampleScenario.process.step.operation.response\":\"ExampleScenario.instance.containedInstance\",\"ExampleScenario.process.step.process\":\"ExampleScenario.process\",\"ExplanationOfBenefit.addItem.adjudication\":\"ExplanationOfBenefit.item.adjudication\",\"ExplanationOfBenefit.addItem.detail.adjudication\":\"ExplanationOfBenefit.item.adjudication\",\"ExplanationOfBenefit.addItem.detail.subDetail.adjudication\":\"ExplanationOfBenefit.item.adjudication\",\"ExplanationOfBenefit.adjudication\":\"ExplanationOfBenefit.item.adjudication\",\"ExplanationOfBenefit.item.detail.adjudication\":\"ExplanationOfBenefit.item.adjudication\",\"ExplanationOfBenefit.item.detail.subDetail.adjudication\":\"ExplanationOfBenefit.item.adjudication\",\"GraphDefinition.link.target.link\":\"GraphDefinition.link\",\"ImplementationGuide.definition.page.page\":\"ImplementationGuide.definition.page\",\"Invoice.totalPriceComponent\":\"Invoice.lineItem.priceComponent\",\"MedicinalProductAuthorization.procedure.application\":\"MedicinalProductAuthorization.procedure\",\"MedicinalProductIngredient.substance.strength\":\"MedicinalProductIngredient.specifiedSubstance.strength\",\"MedicinalProductPackaged.packageItem.packageItem\":\"MedicinalProductPackaged.packageItem\",\"Observation.component.referenceRange\":\"Observation.referenceRange\",\"OperationDefinition.parameter.part\":\"OperationDefinition.parameter\",\"Parameters.parameter.part\":\"Parameters.parameter\",\"PlanDefinition.action.action\":\"PlanDefinition.action\",\"Provenance.entity.agent\":\"Provenance.agent\",\"Questionnaire.item.item\":\"Questionnaire.item\",\"QuestionnaireResponse.item.answer.item\":\"QuestionnaireResponse.item\",\"QuestionnaireResponse.item.item\":\"QuestionnaireResponse.item\",\"RequestGroup.action.action\":\"RequestGroup.action\",\"StructureMap.group.rule.rule\":\"StructureMap.group.rule\",\"SubstanceSpecification.molecularWeight\":\"SubstanceSpecification.structure.isotope.molecularWeight\",\"SubstanceSpecification.name.synonym\":\"SubstanceSpecification.name\",\"SubstanceSpecification.name.translation\":\"SubstanceSpecification.name\",\"SubstanceSpecification.structure.molecularWeight\":\"SubstanceSpecification.structure.isotope.molecularWeight\",\"TestReport.teardown.action.operation\":\"TestReport.setup.action.operation\",\"TestReport.test.action.assert\":\"TestReport.setup.action.assert\",\"TestReport.test.action.operation\":\"TestReport.setup.action.operation\",\"TestScript.teardown.action.operation\":\"TestScript.setup.action.operation\",\"TestScript.test.action.assert\":\"TestScript.setup.action.assert\",\"TestScript.test.action.operation\":\"TestScript.setup.action.operation\",\"ValueSet.compose.exclude\":\"ValueSet.compose.include\",\"ValueSet.expansion.contains.contains\":\"ValueSet.expansion.contains\",\"ValueSet.expansion.contains.designation\":\"ValueSet.compose.include.concept.designation\"}");

/***/ }),
/* 86 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/**
 * A package to handle FHIR DiagnosticReport for LForms
 * https://www.hl7.org/fhir/diagnosticreport.html
 *
 * Note that this was written for DSTU2 and has not been updated.
 *
 * It provides the following functions:
 * createDiagnosticReport()
 * -- Convert existing LOINC panels/forms data in LForms format into FHIR DiagnosticReport data
 * mergeDiagnosticReportToLForms()
 * -- Merge FHIR SDC DiagnosticReport data into corresponding LForms data
 */
var LForms = __webpack_require__(87);

var dr = {
  // a prefix for references to Observation resources
  _OBX_REF_PREFIX: "Observation/",

  /**
   * Functions for creating a DiagnosticReport instance from an LFormsData object
   */

  /** Get date in a standard string format
   * @param dateObj, a date object
   * @returns {string} a formatted date string
   * @private
   */
  _getFormattedDate: function _getFormattedDate(dateObj) {
    //"2013-01-27T11:45:33+11:00",
    return dateObj ? LForms.Util.dateToDTMString(dateObj) : "";
  },

  /**
   * Get the additional data in a form's formHeaderItems
   * Note: For DiagnosticReport only the effectiveDateTime is needed
   * @param formData an LFormsData object
   * @returns {{}} the extra data captured in the "OBR" fields of an LForms form
   * @private
   */
  _getExtensionData: function _getExtensionData(formData) {
    var extension = {};

    if (formData.templateOptions.formHeaderItems && formData.templateOptions.formHeaderItems.length > 0) {
      for (var i = 0, iLen = formData.templateOptions.formHeaderItems.length; i < iLen; i++) {
        var obrItem = formData.templateOptions.formHeaderItems[i];

        if (obrItem.questionCode === 'date_done' && obrItem.value) {
          extension["lforms_dateDone"] = obrItem.value;
        }

        if (obrItem.questionCode === 'where_done' && obrItem.value) {
          extension["lforms_whereDone"] = {
            display: obrItem.value.text
          };
        }

        if (obrItem.questionCode === 'time_done' && obrItem.value) {
          extension["lforms_timeDone"] = obrItem.value;
        }

        if (obrItem.questionCode === 'comment' && obrItem.value) {
          extension["lforms_comments"] = obrItem.value;
        }
      }
    }

    return extension;
  },

  /**
   * A recursive function that generates the DiagnosticReport content by
   * going through the LForms form data structure
   * @param item an LForms item
   * @param contained the "contained" field in a DiagnosticReport where all the Observation instances are kept.
   * @returns {{result: Array, resultObj: Array}} the content part of a Diagnostic Report instance
   * @private
   */
  _createDiagnosticReportContent: function _createDiagnosticReportContent(item, contained) {
    // return the content of "result" and "contained"
    var content = {
      result: [],
      resultObj: []
    };

    for (var i = 0, iLen = item.items.length; i < iLen; i++) {
      var subItem = item.items[i];

      if (subItem) {
        var obx = this._commonExport._createObservation(subItem, true);

        if (subItem.items && subItem.items.length > 0) {
          // single obx returned if it is a header item
          obx[0].related = [];

          var ret = this._createDiagnosticReportContent(subItem, contained);

          for (var j = 0, jLen = ret.result.length; j < jLen; j++) {
            var subObxRef = ret.result[j];
            obx[0].related.push({
              type: "has-member",
              target: {
                reference: subObxRef.reference
              }
            });
          }
        }

        for (var l = 0, lLen = obx.length; l < lLen; l++) {
          contained.push(obx[l]);
          content.result.push({
            reference: "#" + obx[l].id
          });
          content.resultObj.push(obx[l]);
        }
      }
    }

    return content;
  },

  /**
   * Convert a DiagnosticReport resource with contained Observation resources to
   * a FHIR Bundle resource that includes a DiagnosticReport resource and associated Observation resources
   * @param dr a DiagnosticReport resource with contained Observation resources
   * @param bundleType the FHIR Bundle type. Only "transaction" and "collection" types are allowed.
   * @returns {{}} a Bundle resource that includes a DiagnosticReport resource and associated Observation resources
   */
  _convertFromContainedToBundle: function _convertFromContainedToBundle(dr, bundleType) {
    var bundleDr = {}; // default bundleType

    if (!bundleType) {
      bundleType = "transaction";
    }

    if (dr) {
      switch (bundleType) {
        case "transaction":
          bundleDr = this._convertContainedToTransactionBundle(dr);
          break;

        case "collection":
          bundleDr = this._convertContainedToCollectionBundle(dr);
          break;

        default:
          console.log("Bundle type not supported: " + bundleType);
      }
    }

    return bundleDr;
  },

  /**
   * Convert a DiagnosticReport resource with contained Observation resources to
   * a FHIR "transaction" typed Bundle resource that includes a DiagnosticReport resource
   * and associated Observation resources
   * @param dr a DiagnosticReport resource with contained Observation resources
   * @returns {{}} a Bundle resource that includes a DiagnosticReport resource and associated Observation resources
   * @private
   */
  _convertContainedToTransactionBundle: function _convertContainedToTransactionBundle(dr) {
    var bundleDr = {
      resourceType: "Bundle",
      type: "transaction",
      entry: []
    };
    var contained = dr.contained;
    delete dr.contained; // update reference to Observation resources

    for (var i = 0, iLen = dr.result.length; i < iLen; i++) {
      var ref = dr.result[i];
      ref.reference = this._OBX_REF_PREFIX + ref.reference.slice(1);
    } // add DiagnosticReport resource into Bundle entry


    bundleDr.entry.push({
      resource: dr,
      request: {
        method: "POST",
        url: "DiagnosticReport"
      }
    }); // add Observation resources into Bundle entry

    for (var j = 0, jLen = contained.length; j < jLen; j++) {
      var res = contained[j]; // if it has related Observation resources (as it is a section in LForms)
      // update values of the references to the related Observation resources

      if (res.related) {
        for (var k = 0, kLen = res.related.length; k < kLen; k++) {
          var targetObservation = res.related[k];
          targetObservation.target.reference = this._OBX_REF_PREFIX + targetObservation.target.reference.slice(1);
        }
      } // add to the Bundle entry


      bundleDr.entry.push({
        resource: res,
        request: {
          method: "POST",
          url: "Observation"
        }
      });
    }

    return bundleDr;
  },

  /**
   * Convert a DiagnosticReport resource with contained Observation resources to
   * a FHIR "collection" typed Bundle resource that includes a DiagnosticReport resource
   * and associated Observation resources
   * @param dr a DiagnosticReport resource with contained Observation resources
   * @returns {{}} a Bundle resource that includes a DiagnosticReport resource and associated Observation resources
   * @private
   */
  _convertContainedToCollectionBundle: function _convertContainedToCollectionBundle(dr) {
    var bundleDr = {
      resourceType: "Bundle",
      type: "collection",
      entry: []
    };
    var contained = dr.contained;
    delete dr.contained; // add DiagnosticReport resource into Bundle entry

    bundleDr.entry.push({
      resource: dr
    }); // add Observation resources into Bundle entry

    for (var j = 0, jLen = contained.length; j < jLen; j++) {
      var res = contained[j]; // add to the Bundle entry

      bundleDr.entry.push({
        resource: res
      });
    }

    return bundleDr;
  },

  /**
   * Generate FHIR DiagnosticReport data from an LForms form data
   * @param formData an LFormsData object
   * @param subject optional, A local FHIR resource that is the subject for this
   *  DiagnoticReport.
   * @param inBundle optional, a flag that a DiagnosticReport resources and associated Observation resources
   *        should be placed into a FHIR Bundle. The default is false.
   * @param bundleType, optional, the FHIR Bundle type if inBundle is true.
   *        Only "transaction" and "collection" types are allowed.
   * @returns {{}} a Diagnostic Report instance
   */
  createDiagnosticReport: function createDiagnosticReport(formData, subject, inBundle, bundleType) {
    var dr = null,
        contained = [];

    if (formData) {
      var formAndUserData = formData.getFormData(true, true, true);

      var drContent = this._createDiagnosticReportContent(formAndUserData, contained);

      dr = {
        resourceType: "DiagnosticReport",
        id: this._commonExport._getUniqueId(formAndUserData.code),
        status: "final",
        code: {
          "coding": [{
            "system": "http://loinc.org",
            "code": formAndUserData.code,
            "display": formAndUserData.name
          }],
          "text": formAndUserData.name
        },
        result: drContent.result,
        contained: contained
      };

      this._commonExport._addVersionTag(dr);

      if (subject) dr.subject = LForms.Util.createLocalFHIRReference(subject); // obr data

      var extension = this._getExtensionData(formAndUserData);

      if (extension["lforms_dateDone"]) {
        dr["effectiveDateTime"] = extension["lforms_dateDone"];
      } // issued


      dr["issued"] = this._getFormattedDate(new Date());
    }

    var ret = inBundle ? this._convertFromContainedToBundle(dr, bundleType) : dr;
    LForms.Util.pruneNulls(ret);
    return ret;
  },

  /**
   * Functions for merging a DiagnosticReport instance into an LFormsData object
   */

  /**
   * Find an observation from the "contained" list by an observation id
   * @param refId an observation instance's id
   * @param contained the "contained" field in a DiagnosticReport instance
   * @returns {{}} an observation instance
   * @private
   */
  _findObxById: function _findObxById(refId, contained) {
    var obx = null;

    if (refId) {
      var id = refId[0] === "#" ? refId.slice(1) : refId;

      for (var i = 0, iLen = contained.length; i < iLen; i++) {
        if (contained[i].id === id) {
          obx = contained[i];
          break;
        }
      }
    }

    return obx;
  },

  /**
   * Merge an Observation instance into an item object
   * @param obx an observation instance
   * @param item an item in an LForms object
   * @private
   */
  _setupItemValueAndUnit: function _setupItemValueAndUnit(obx, item) {
    if (item && obx.code.coding[0].code === item.questionCode) {
      var dataType = item.dataType; // any one has a unit must be a numerical type, let use REAL for now.
      // dataType conversion should be handled when panel data are added to lforms-service.

      if ((!dataType || dataType === "ST") && item.units && item.units.length > 0) {
        dataType = "REAL";
      }

      switch (dataType) {
        case "INT":
          if (obx.valueInteger) {
            item.value = obx.valueInteger;
            break;
          }

        // else handle as Quantity

        case "REAL": // handle as Quantity

        case "QTY":
          var qty = obx.valueQuantity;
          item.value = qty.value;
          var unitName = qty.unit || qty.code;

          if (unitName || qty.code || qty.system) {
            item.unit = {};
            if (unitName) item.unit.name = unitName;
            if (qty.code) item.unit.code = qty.code;
            if (qty.system) item.unit.system = qty.system;
          }

          break;

        case "DT":
          item.value = LForms.Util.stringToDTDateISO(obx.valueDate);
          break;

        case "DTM":
          item.value = LForms.Util.stringToDate(obx.valueDateTime);
          break;

        case "CNE":
        case "CWE":
          // get the value from Observation resource.
          // for multiple-selected answers/values in LForms, each selected answer is exported as
          // a separated Observation resource
          var itemValue;

          if (obx.valueCodeableConcept) {
            itemValue = {
              "code": obx.valueCodeableConcept.coding[0].code,
              "text": obx.valueCodeableConcept.coding[0].display,
              "codeSystem": obx.valueCodeableConcept.coding[0].system
            };
          } else if (obx.valueString) {
            itemValue = obx.valueString;
          }

          if (item.answerCardinality && (item.answerCardinality.max === "*" || parseInt(item.answerCardinality.max) > 1)) {
            if (!item.value) {
              item.value = [];
            }

            item.value.push(itemValue);
          } else {
            item.value = itemValue;
          }

          break;

        case "SECTION":
        case "TITLE":
        case "":
          // do nothing
          break;

        default:
          item.value = obx.valueString;
      }
    }
  },

  /**
   * Find the number of the repeating items that have the same code
   * in the "contained" field of a DiagnosticReport instance
   * @param refIdList a list Observation instance IDs to be checked
   * @param code an item code
   * @param contained a list of Observation instances (in the "contained")
   * @returns a structural info object for a repeating item
   * of the repeating items
   * @private
   */
  _findTotalRepeatingNum: function _findTotalRepeatingNum(refIdList, code, contained) {
    var total = 0;
    var refIds = [];

    for (var i = 0, iLen = refIdList.length; i < iLen; i++) {
      var obx = this._findObxById(refIdList[i], contained);

      if (obx.code.coding[0].code === code) {
        refIds.push(refIdList[i]);
        total += 1;
      }
    }

    return {
      total: total,
      refIds: refIds
    };
  },

  /**
   * Get structural info of a DiagnosticReport by going though each level of observations
   * @param parentObxInfo the structural info of a parent Observation
   * @param parentRefId the instance ID of a parent Observation
   * @param diagnosticReport a DiagnosticReport instance
   * @private
   */
  _checkRepeatingItems: function _checkRepeatingItems(parentObxInfo, parentRefId, diagnosticReport) {
    var obxInfoList = [];
    var repeatingItemInfo = {};
    var obxIdList = []; // the report level

    if (!parentRefId && diagnosticReport.result) {
      for (var i = 0, iLen = diagnosticReport.result.length; i < iLen; i++) {
        obxIdList.push(diagnosticReport.result[i].reference);
      }
    } // obx level
    else {
        var parentObx = this._findObxById(parentRefId, diagnosticReport.contained);

        if (parentObx && parentObx.related) {
          for (var i = 0, iLen = parentObx.related.length; i < iLen; i++) {
            obxIdList.push(parentObx.related[i].target.reference);
          }
        }
      } // go through each observation instance


    for (var i = 0, iLen = obxIdList.length; i < iLen; i++) {
      var refId = obxIdList[i];

      var obx = this._findObxById(refId, diagnosticReport.contained);

      var itemCode = obx.code.coding[0].code; // first obx that has the same item code, either repeating or non-repeating

      if (!repeatingItemInfo[itemCode]) {
        var repeatingInfo = this._findTotalRepeatingNum(obxIdList, itemCode, diagnosticReport.contained);

        repeatingItemInfo[itemCode] = {
          total: repeatingInfo.total,
          refIds: repeatingInfo.refIds
        };
      } // create structure info for the obx


      var repeatingRefIds = repeatingItemInfo[itemCode].refIds;

      for (var j = 0, jLen = repeatingRefIds.length; j < jLen; j++) {
        if (refId === repeatingRefIds[j]) {
          var obxInfo = {
            code: itemCode,
            refId: refId,
            index: j,
            total: repeatingItemInfo[itemCode].total
          }; // check observation instances in the sub level

          this._checkRepeatingItems(obxInfo, refId, diagnosticReport);

          obxInfoList.push(obxInfo);
        }
      }
    }

    parentObxInfo.obxInfoList = obxInfoList;
  },

  /**
   * Get structure information of a DiagnosticReport instance
   * @param diagnosticReport a DiagnosticReport instance
   * @returns {{}} a Diagnostic Report data structure object
   * @private
   */
  _getReportStructure: function _getReportStructure(diagnosticReport) {
    var reportStructure = {
      obxInfoList: []
    };

    if (diagnosticReport) {
      this._checkRepeatingItems(reportStructure, null, diagnosticReport);
    }

    return reportStructure;
  },

  /**
   * Find a matching repeating item
   * @param parentItem a parent item
   * @param itemCode code of a repeating (or non-repeating) item
   * @param index index of the item in the sub item array of the parent item
   * @returns {{}} a matching item
   * @private
   */
  _findTheMatchingItemByCodeAndIndex: function _findTheMatchingItemByCodeAndIndex(parentItem, itemCode, index) {
    var item = null;
    var idx = 0;

    if (parentItem.items) {
      for (var i = 0, iLen = parentItem.items.length; i < iLen; i++) {
        var subItem = parentItem.items[i];

        if (itemCode === subItem.questionCode) {
          if ((subItem.dataType === "CNE" || subItem.dataType === "CWE") && subItem.answerCardinality && (subItem.answerCardinality.max === "*" || parseInt(subItem.answerCardinality.max) > 1)) {
            item = subItem;
            break;
          } else if (idx === index) {
            item = subItem;
            break;
          } else {
            idx += 1;
          }
        }
      }
    }

    return item;
  },

  /**
   * Add repeating items
   * @param parentItem a parent item
   * @param itemCode code of a repeating item
   * @param total total number of the repeating item with the same code
   * @private
   */
  _addRepeatingItems: function _addRepeatingItems(parentItem, itemCode, total) {
    // find the first (and the only one) item
    var item = null;

    if (parentItem.items) {
      for (var i = 0, iLen = parentItem.items.length; i < iLen; i++) {
        if (itemCode === parentItem.items[i].questionCode) {
          item = parentItem.items[i];
          break;
        }
      } // insert new items unless it is a CNE/CWE and has multiple answers.


      if (item && !((item.dataType === "CNE" || item.dataType === "CWE") && item.answerCardinality && (item.answerCardinality.max === "*" || parseInt(item.answerCardinality.max) > 1))) {
        while (total > 1) {
          var newItem = LForms.Util.deepCopy(item);
          parentItem.items.splice(i, 0, newItem);
          total -= 1;
        }
      }
    }
  },

  /**
   * Merge Observation instances into items on the same level
   * @param parentObxInfo structural information of a parent item
   * @param parentItem a parent item
   * @param diagnosticReport a DiagnosticReport instance
   * @private
   */
  _processObxAndItem: function _processObxAndItem(parentObxInfo, parentItem, diagnosticReport) {
    for (var i = 0, iLen = parentObxInfo.obxInfoList.length; i < iLen; i++) {
      var obxInfo = parentObxInfo.obxInfoList[i];

      var obx = this._findObxById(obxInfo.refId, diagnosticReport.contained);

      if (obx) {
        // first repeating obx
        if (obxInfo.total > 1 && obxInfo.index === 0) {
          // add repeating items in form data
          this._addRepeatingItems(parentItem, obxInfo.code, obxInfo.total);
        }

        var item = this._findTheMatchingItemByCodeAndIndex(parentItem, obxInfo.code, obxInfo.index);

        this._setupItemValueAndUnit(obx, item); // process items on sub level


        if (obxInfo.obxInfoList && obxInfo.obxInfoList.length > 0) {
          this._processObxAndItem(obxInfo, item, diagnosticReport);
        }
      }
    }
  },

  /**
   * Convert a FHIR Bundle resource that includes a DiagnosticReport resource and associated Observation resources
   * to a DiagnosticReport resource with contained Observation resources
   * @param bundleDr a Bundle that includes a DiagnosticReport resource and associated Observation resources.
   *        Only "searchset" type is allowed.
   * @returns {{}} a DiagnosticReport resource with contained Observation resources
   */
  _convertFromBundleToContained: function _convertFromBundleToContained(bundleDr) {
    var containedDr; // "searchset" is the only supported type at this point.

    if (bundleDr && bundleDr.type === "searchset") {
      var entry = bundleDr.entry; // find the DiagnosticReport in the bundle

      for (var i = 0, iLen = entry.length; i < iLen; i++) {
        if (entry[i].resource.resourceType === "DiagnosticReport") {
          containedDr = entry[i].resource; // change reference ids in result

          for (var j = 0, jLen = containedDr.result.length; j < jLen; j++) {
            var ref = containedDr.result[j];

            if (ref.reference && ref.reference.match(new RegExp(this._OBX_REF_PREFIX))) {
              ref.reference = ref.reference.slice(this._OBX_REF_PREFIX.length);
            }
          }

          containedDr.contained = [];
          break;
        }
      } // if DiagnosticReport is found


      if (containedDr) {
        // Move all Observation resource into "contained" field of the DiagnosticReport resource
        for (var i = 0, iLen = entry.length; i < iLen; i++) {
          if (entry[i].resource.resourceType === "Observation") {
            var obx = entry[i].resource; // change reference ids in related

            if (obx.related) {
              for (var j = 0, jLen = obx.related.length; j < jLen; j++) {
                var related = obx.related[j];

                if (related.target && related.target.reference && related.target.reference.match(new RegExp(this._OBX_REF_PREFIX))) {
                  related.target.reference = related.target.reference.slice(this._OBX_REF_PREFIX.length);
                }
              }
            }

            containedDr.contained.push(obx);
          }
        }
      }
    }

    return containedDr;
  },

  /**
   * Merge a DiagnosticReport instance into an LForms form definition or LFormsData object
   * @param formData an LForms form definition or LFormsData object.
   * @param diagnosticReport a DiagnosticReport resource with contained Observation resources,
   * or a Bundle that includes a DiagnosticReport resource and associated Observation resources
   * @param bundleType, optional, the FHIR Bundle type if inBundle is true.
   * @returns {{}} an updated LForms form definition, with answer data
   */
  mergeDiagnosticReportToLForms: function mergeDiagnosticReportToLForms(formData, diagnosticReport) {
    if (!(formData instanceof LForms.LFormsData)) {
      // get the default settings in case they are missing in the form data
      // not to set item values by default values for saved forms with user data
      formData.hasSavedData = true;
      formData = new LForms.LFormsData(formData).getFormData();
    }

    var inBundle = diagnosticReport && diagnosticReport.resourceType === "Bundle"; // move Observation resources in Bundle to be in "contained" in DiagnosticReport resource
    // as a base data structure for converting

    var dr = inBundle ? this._convertFromBundleToContained(diagnosticReport) : diagnosticReport;

    var reportStructure = this._getReportStructure(dr);

    this._processObxAndItem(reportStructure, formData, dr); // date


    if (dr.effectiveDateTime && formData.templateOptions.formHeaderItems) {
      var whenDone = new LForms.Util.dateToString(dr.effectiveDateTime);

      if (whenDone) {
        formData.templateOptions.formHeaderItems[0].value = whenDone;
      }
    }

    return formData;
  }
};
/* harmony default export */ __webpack_exports__["default"] = (dr);

/***/ }),
/* 87 */
/***/ (function(module, exports) {

module.exports = LForms;

/***/ }),
/* 88 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _export_common_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(89);
// R4-specific export code common to DiagnosticReport and SDC.

var self = Object.create(_export_common_js__WEBPACK_IMPORTED_MODULE_0__["default"]); // copies properties to self.prototype

Object.assign(self, {
  /**
   *  Creates a structure for use by _createObservation() in constructing an
   *  Observation value for the given integer value.
   * @param item an LForms item with the integer value to be represented in an Observation.
   *  It is assumed that the caller has already checked the data type.
   * @return an object with a "key" property that will be the property name for
   *  the value in the Observation object, and a "val" property that holds the
   *  value (formatted for the Observation).
   */
  _createObsIntValue: function _createObsIntValue(item) {
    // R4 added valueInteger to Observation, so we use that unless the item has
    // a unit, in which case we use valueQuantity.
    // valueQuantity.
    var rtn;

    if (item.unit) {
      var quantity = {
        value: item.value
      };

      this._setFHIRQuantityUnit(quantity, item.unit);

      rtn = {
        key: 'valueQuantity',
        val: quantity
      };
    } else rtn = {
      key: 'valueInteger',
      val: item.value
    };

    return rtn;
  }
});
/* harmony default export */ __webpack_exports__["default"] = (self);

/***/ }),
/* 89 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _fhir_common__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);
/* jshint -W097 */
// suppress jshint warning about strict

/* jshint node: true */
// suppress warning about "require"


function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }



var LForms = __webpack_require__(87);

var _versionTagStr = 'lformsVersion: ';
/**
 *  Defines export functions that are the same across the different FHIR
 *  versions and that are used by both the SDC and DiagnosticReport exports.
 */

var self = {
  /**
   *  Creates Observation resources from an LForms item object
   * @param item an LForms item object
   * @param setId (optional) a flag indicating if a unique ID should be set on the Observation resource
   * @returns {{}} an array of observation resources representing the values
   *  stored in the item.
   * @private
   */
  _createObservation: function _createObservation(item, setId) {
    var values = [];
    var dataType = item.dataType; // any item has a unit must be a numerical type, let use REAL for now.

    if ((!dataType || dataType === "ST") && item.units && item.units.length > 0) {
      dataType = "REAL";
    }

    switch (dataType) {
      case "INT":
        values = [this._createObsIntValue(item)];
        break;

      case "REAL": // A "real" data type should be exported as valueQuantity, because
      // there is no valueDecimal for Observation (as of R4).

      case "QTY":
        var valValue = {
          value: item.value
        };

        this._setFHIRQuantityUnit(valValue, item.unit);

        values = [{
          key: "valueQuantity",
          val: valValue
        }];
        break;

      case "DT":
        values = [{
          key: "valueDate",
          val: item.value
        }];
        break;

      case "DTM":
        values = [{
          key: "valueDateTime",
          val: item.value
        }];
        break;

      case "CNE":
      case "CWE":
        var max = item.answerCardinality.max; // multiple values, each value creates a separate Observation resource

        var itemValues;

        if (max && (max === "*" || parseInt(max) > 1)) {
          itemValues = item.value;
        } else {
          itemValues = [item.value];
        }

        for (var j = 0, jLen = itemValues.length; j < jLen; j++) {
          var val = itemValues[j];

          if (_typeof(val) === "object") {
            var coding = {};
            if (val.code) coding.code = val.code;
            if (val.text) coding.display = val.text;
            var codeSystem = val.system;
            if (codeSystem) coding.system = LForms.Util.getCodeSystem(codeSystem);
            values.push({
              key: "valueCodeableConcept",
              val: {
                "coding": [coding],
                "text": coding.display
              }
            });
          } else if (typeof val === "string") {
            if (val !== "") {
              values.push({
                key: "valueString",
                val: val
              });
            }
          }
        }

        break;

      case "attachment":
        values = [{
          key: "valueAttachment",
          val: item.value
        }];
        break;

      default:
        values = [{
          key: "valueString",
          val: item.value
        }];
    }

    var obxs = [];

    for (var i = 0, iLen = values.length; i < iLen; i++) {
      var obx = {
        "resourceType": "Observation",
        "status": "final",
        "code": {
          "coding": item.codeList,
          "text": item.question
        }
      };

      this._addVersionTag(obx);

      if (setId) {
        obx.id = this._getUniqueId(item.questionCode);
      }

      if (!item.header) {
        obx[values[i].key] = values[i].val;
      }

      obxs.push(obx);
    }

    return obxs;
  },

  /**
   * Generate an almost unique ID for a given Observation code
   * @param prefix A prefix for the ID (e.g. a code or resource name)
   * @returns {string} a unique id
   * @private
   */
  _getUniqueId: function _getUniqueId(prefix) {
    this._idCtr || (this._idCtr = 0);
    return prefix + "-" + Date.now() + '-' + ++this._idCtr + '-' + Math.random().toString(16).substr(2);
  },

  /**
   *  Sets the unit for a Quantity.
   * @param qty the FHIR Quantity structure whose unit will be set.  This
   *  function assumes there is no unit information already set.
   * @param unit An LForms unit object.
   */
  _setFHIRQuantityUnit: function _setFHIRQuantityUnit(qty, unit) {
    if (unit) {
      if (unit.name) qty.unit = unit.name;
      if (unit.code) qty.code = unit.code;
      if (unit.system) qty.system = unit.system;
    }
  },

  /**
   *  Returns and creates if necessary the tag array object on the resource.  If
   *  created, the given resource will be modified.
   * @param res the resource whose tag array is needed.
   */
  _resTags: function _resTags(res) {
    var meta = res.meta;
    if (!meta) meta = res.meta = {};
    var tag = meta.tag;
    if (!tag) tag = meta.tag = [];
    return tag;
  },

  /**
   *  Sets the LForms version tag on a FHIR resource to indicate the LForms version used to
   *  export it.  This will replace any version tag already present.
   * @param res the resource object to be tagged.
   */
  _setVersionTag: function _setVersionTag(res) {
    var tags = this._resTags(res); // Delete any lformsVersion tag present.  There should be at most one


    for (var i = 0, len = tags.length; i < len; ++i) {
      var t = tags[i];

      if (t.code && t.code.indexOf(_versionTagStr) === 0) {
        tags.splice(i, 1);
        break;
      }
    }

    this._addVersionTag(res);
  },

  /**
   *  Adds a tag to a FHIR resource to indicate the LForms version used to
   *  export it.  Assumes the version tag does not already exist.
   * @param res the resource object to be tagged.
   */
  _addVersionTag: function _addVersionTag(res) {
    var tag = this._resTags(res);

    tag.push({
      code: _versionTagStr + LForms.lformsVersion
    });
  }
};
/* harmony default export */ __webpack_exports__["default"] = (self);

/***/ }),
/* 90 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

/**
 * A package to handle FHIR Questionnaire and SDC (STU2) Questionnaire and QuestionnaireResponse for LForms
 *
 * FHIR Questionnaire:
 * https://www.hl7.org/fhir/questionnaire.html
 *
 * R4 Ballot (3.5) for comment:
 * http://hl7.org/fhir/uv/sdc/2018Sep/sdc-questionnaire.html
 * http://hl7.org/fhir/uv/sdc/2018Sep/sdc-questionnaireresponse.html
 *
 * It provides the following functions:
 * convertLFormsToQuestionnaire()
 * -- Convert existing LOINC panels/forms data in LForms format into FHIR (standard or SDC) Questionnaire data
 * convertLFormsToQuestionnaireResponse()
 * -- Generate FHIR (standard or SDC) QuestionnaireResponse data from captured data in LForms
 */
var sdcVersion = '2.7';
var fhirVersionNum = '4.0';
var self = {
  SDCVersion: sdcVersion,
  QProfile: 'http://hl7.org/fhir/uv/sdc/StructureDefinition/sdc-questionnaire|' + sdcVersion,
  QRProfile: 'http://hl7.org/fhir/uv/sdc/StructureDefinition/sdc-questionnaireresponse|' + sdcVersion,
  stdQProfile: 'http://hl7.org/fhir/' + fhirVersionNum + '/StructureDefinition/Questionnaire',
  stdQRProfile: 'http://hl7.org/fhir/' + fhirVersionNum + '/StructureDefinition/QuestionnaireResponse',

  /**
   *  Convert LForms captured data to a bundle consisting of a FHIR SDC
   *  QuestionnaireResponse and any extractable resources. (Currently this means
   *  any Observations that can be extracted via the observationLinkPeriod
   *  extension).
   *
   * @param lfData a LForms form object
   * @param noExtensions a flag that a standard FHIR Questionnaire is to be created without any extensions.
   *  The default is false.
   * @param subject A local FHIR resource that is the subject of the output resource.
   *  If provided, a reference to this resource will be added to the output FHIR
   *  resource when applicable.
   * @returns an array of QuestionnaireResponse and Observations.  Observations
   *  will have derivedFrom set to a temporary reference created for the returned
   *  QuestionnaireResponse (the first element of the array). The caller may
   *  wish to put all of the returned resources into a transaction Bundle for
   *  creating them on a FHIR server.
   */
  convertLFormsToFHIRData: function convertLFormsToFHIRData(lfData, noExtensions, subject) {
    var qr = this.convertLFormsToQuestionnaireResponse(lfData, noExtensions, subject);

    if (!qr.id) {
      qr.id = this._commonExport._getUniqueId(qr.identifier && qr.identifier.value || 'QR');
    }

    var qrRef = 'QuestionnaireResponse/' + qr.id;
    var rtn = [qr];

    for (var i = 0, len = lfData.itemList.length; i < len; ++i) {
      var item = lfData.itemList[i];

      if (self._getExtractValue(item) && item.value) {
        var obs = this._commonExport._createObservation(item);

        for (var j = 0, jLen = obs.length; j < jLen; j++) {
          // Following
          // http://hl7.org/fhir/uv/sdc/2019May/extraction.html#observation-based-extraction
          if (qr.basedOn) obs[j].basedOn = qr.basedOn;
          if (qr.partOf) obs[j].partOf = qr.partOf;
          if (qr.subject) obs[j].subject = qr.subject;
          if (qr.encounter) obs[j].encounter = qr.encounter;

          if (qr.authored) {
            obs[j].effectiveDateTime = qr.authored;
            obs[j].issued = qr.authored;
          }

          if (qr.author) obs[j].performer = qr.author;
          obs[j].derivedFrom = [{
            reference: qrRef
          }];
          rtn.push(obs[j]);
        }
      }
    }

    return rtn;
  },

  /**
   *  Proceses the LForms questionCardinality into FHIR.
   * @param targetItem an item in Questionnaire
   * @param item a LForms item
   */
  _processQuestionCardinality: function _processQuestionCardinality(targetItem, item) {
    if (item.questionCardinality) {
      if (item.questionCardinality.max === "*") {
        targetItem.repeats = true;
      } else if (parseInt(item.questionCardinality.max) > 1) {
        targetItem.repeats = true;
        targetItem.extension.push({
          "url": "http://hl7.org/fhir/StructureDefinition/questionnaire-maxOccurs",
          "valueInteger": parseInt(item.questionCardinality.max)
        });
      }
    } else {// No default in R4
      // targetItem.repeats = false;
    }
  },

  /**
   * Handle special requirements for 'display' items
   * @param targetItem an item in Questionnaire
   * @param item a LForms item
   * @private
   */
  _handleSpecialConstraints: function _handleSpecialConstraints(targetItem, item) {
    //Display items cannot have a "code" asserted
    //Required and repeat aren't permitted for display items
    //Read-only can't be specified for "display" items
    if (targetItem && item.dataType === "TITLE") {
      delete targetItem.code;
      delete targetItem.required;
      delete targetItem.repeats;
      delete targetItem.readOnly;
    }
  },

  /**
   * Process various restriction settings
   * @param targetItem an item in FHIR SDC Questionnaire object
   * @param item an item in LForms form object
   * @private
   */
  _handleRestrictions: function _handleRestrictions(targetItem, item) {
    // http://hl7.org/fhir/StructureDefinition/minLength
    // http://hl7.org/fhir/StructureDefinition/regex
    // http://hl7.org/fhir/StructureDefinition/minValue
    // http://hl7.org/fhir/StructureDefinition/maxValue
    // http://hl7.org/fhir/StructureDefinition/maxDecimalPlaces, not supported yet
    // http://hl7.org/fhir/StructureDefinition/maxSize, for attachment, not supported yet
    // maxLength
    if (item.restrictions) {
      for (var key in item.restrictions) {
        var value = item.restrictions[key];
        var extValue = null;

        var dataType = this._getAssumedDataTypeForExport(item);

        var valueKey = this._getValueKeyByDataType("value", item);

        switch (key) {
          // http://hl7.org/fhir/StructureDefinition/minValue
          // { // Must be >= this value
          //   // from Element: extension
          //   "url" : "http://hl7.org/fhir/StructureDefinition/minValue", // R!
          //   // value[x]: Value of extension. One of these 6:
          //   "valueDate" : "<date>" // R! Value of extension
          //   "valueDateTime" : "<dateTime>", // R! Value of extension
          //   "valueTime" : "<time>", // R! Value of extension
          //   "valueInstant" : "<instant>", // R! Value of extension
          //   "valueDecimal" : <decimal>, // R! Value of extension
          //   "valueInteger" : <integer>, // R! Value of extension
          // }
          case "minExclusive":
          case "minInclusive": // http://hl7.org/fhir/StructureDefinition/maxValue

          case "maxExclusive":
          case "maxInclusive":
            extValue = this._exportMinMax(dataType, value, valueKey, key);
            break;
          // http://hl7.org/fhir/StructureDefinition/minLength

          case "minLength":
            if (dataType === "ST" || dataType === "TX" || dataType === "URL" || dataType === "QTY") {
              extValue = {
                "url": "http://hl7.org/fhir/StructureDefinition/minLength",
                "valueInteger": parseInt(value)
              };
            }

            break;
          // maxLength, not an extension, directly on item

          case "maxLength":
            if (dataType === "ST" || dataType === "TX" || dataType === "URL" || dataType === "QTY") {
              targetItem.maxLength = parseInt(value);
            }

            break;
          // http://hl7.org/fhir/StructureDefinition/regex

          case "pattern":
            if (dataType === "ST" || dataType === "TX") {
              extValue = {
                "url": "http://hl7.org/fhir/StructureDefinition/regex",
                "valueString": value
              };
            }

            break;
        }

        if (extValue) {
          targetItem.extension.push(extValue);
        }
      }
    }
  },

  /**
   *  Processes settings for a list field with choices.
   * @param targetItem an item in FHIR SDC Questionnaire object
   * @param item an item in the LForms form object
   * @param noExtensions a flag that a standard FHIR Questionnaire is to be created without any extensions.
   *        The default is false.
   */
  _handleChoiceField: function _handleChoiceField(targetItem, item, noExtensions) {
    // an extension for the search url of the auto-complete field.
    if (item.externallyDefined) {
      this._handleExternallyDefined(targetItem, item);
    } // option, for answer list
    else if (item.answers && !item.answerValueSet) {
        // Make sure the answers did not come from answerExpression.
        if (!item._fhirExt || !item._fhirExt[this.fhirExtAnswerExp]) targetItem.answerOption = this._handleAnswers(item, noExtensions);
      } else if (item.answerValueSet) targetItem.answerValueSet = item.answerValueSet;
  },

  /**
   * Process an item's answer list
   * @param item an item in the LForms form object
   * @param noExtensions a flag that a standard FHIR Questionnaire is to be created without any extensions.
   *        The default is false.
   * @returns {Array}
   * @private
   */
  _handleAnswers: function _handleAnswers(item, noExtensions) {
    var optionArray = [];

    for (var i = 0, iLen = item.answers.length; i < iLen; i++) {
      var answer = item.answers[i];
      var option = {}; // needs an extension for label

      if (!noExtensions) {
        var ext = [];

        if (answer.label) {
          ext.push({
            "url": "http://hl7.org/fhir/StructureDefinition/questionnaire-optionPrefix",
            "valueString": answer.label
          });
        }

        if (answer.score !== null && answer.score !== undefined) {
          ext.push({
            "url": "http://hl7.org/fhir/StructureDefinition/ordinalValue",
            "valueDecimal": parseFloat(answer.score)
          });
        }

        if (ext.length > 0) {
          option.extension = ext;
        }
      } // option's value supports integer, date, time, string and Coding
      // for LForms, all answers are Coding


      option.valueCoding = {};
      if (answer.code) option.valueCoding.code = answer.code;
      if (answer.text) option.valueCoding.display = answer.text;

      if (answer.system) {
        option.valueCoding.system = LForms.Util.getCodeSystem(answer.system);
      }

      optionArray.push(option);
    }

    return optionArray;
  },

  /**
   * Process default values
   * @param targetItem an item in FHIR SDC Questionnaire object
   * @param item an item in LForms form object
   * @private
   */
  _handleInitialValues: function _handleInitialValues(targetItem, item) {
    if (item.defaultAnswer === null || item.defaultAnswer === undefined || item.defaultAnswer === '') {
      return;
    } // item.defaultAnswer could be an array of multiple default values or a single value


    var defaultAnswers = this._answerRepeats(item) && Array.isArray(item.defaultAnswer) ? item.defaultAnswer : [item.defaultAnswer];

    var dataType = this._getAssumedDataTypeForExport(item);

    var valueKey = this._getValueKeyByDataType("value", item);

    var answer = null;
    targetItem.initial = []; // go through each default value and handle it based on the data type.

    for (var i = 0, iLen = defaultAnswers.length; i < iLen; i++) {
      // dataType:
      // boolean, decimal, integer, date, dateTime, instant, time, string, uri,
      // Attachment, Coding, Quantity, Reference(Resource)
      // for Coding
      if (dataType === 'CWE' || dataType === 'CNE') {
        // could be a code object or a string
        if (_typeof(defaultAnswers[i]) === 'object') {
          var coding = {
            "code": defaultAnswers[i].code
          };

          if (defaultAnswers[i].text !== undefined) {
            coding.display = defaultAnswers[i].text;
          } // code system


          var codeSystem = defaultAnswers[i].system || item.answerCodeSystem;

          if (codeSystem) {
            coding.system = LForms.Util.getCodeSystem(codeSystem);
          }

          answer = {};
          answer[valueKey] = coding;
          targetItem.initial.push(answer);
        } // user typed answer that is not on the answer list.
        else if (typeof defaultAnswers[i] === 'string') {
            targetItem.initial.push({
              "valueString": defaultAnswers[i]
            });
          }
      } // for Quantity,
      // [{
      //   // from Element: extension
      //   "value" : <decimal>, // Numerical value (with implicit precision)
      //   "comparator" : "<code>", // < | <= | >= | > - how to understand the value
      //   "unit" : "<string>", // Unit representation
      //   "system" : "<uri>", // Code System that defines coded unit form
      //   "code" : "<code>" // Coded form of the unit
      // }]
      else if (dataType === 'QTY') {
          // for now, handling only simple quantities without the comparators.
          answer = {};
          answer[valueKey] = this._makeQuantity(defaultAnswers[i], item.units);
          targetItem.initial.push(answer);
        } // for boolean, decimal, integer, date, dateTime, instant, time, string, uri
        else if (dataType === "INT" || dataType === "REAL" || dataType === "BL" || dataType === "TM" || dataType === "ST" || dataType === "TX" || dataType === "URL") {
            answer = {};
            answer[valueKey] = defaultAnswers[i];
            targetItem.initial.push(answer);
          } else if (dataType === "DT" || dataType === "DTM") {
            // transform to FHIR date/datetime format.
            var dateValue = LForms.Util.stringToDate(defaultAnswers[i]);

            if (dateValue) {
              dateValue = dataType === "DTM" ? LForms.Util.dateToDTMString(dateValue) : LForms.Util.dateToDTStringISO(dateValue);
              targetItem.initial.push(_defineProperty({}, valueKey, dateValue));
            } else {
              // LForms.Util.stringToDate returns null on invalid string
              // TODO: should save the errors or emitting events.
              console.error(defaultAnswers[i] + ': Invalid date/datetime string as defaultAnswer for ' + item.questionCode);
            }
          } // no support for reference

    }
  },

  /**
   * Process units list
   * @param targetItem an item in FHIR SDC Questionnaire object
   * @param item an item in LForms form object
   * @private
   */
  _handleLFormsUnits: function _handleLFormsUnits(targetItem, item) {
    if (item.units && item.units.length > 0) {
      var dataType = this._getAssumedDataTypeForExport(item);

      if (dataType === "REAL" || dataType === "INT") {
        targetItem.extension.push({
          "url": this.fhirExtUrlUnit,
          // Datatype with multiple units is quantity. There is only one unit here.
          "valueCoding": this._createFhirUnitCoding(item.units[0])
        });
      } else if (dataType === 'QTY') {
        var defUnit = this._getDefaultUnit(item.units); // Skip if units are already set in default answer conversion.


        if (defUnit && defUnit.default && !(targetItem.initial && targetItem.initial.length > 0)) {
          // Use initial[].valueQuantity.unit to export the default unit.
          if (!targetItem.initial) {
            targetItem.initial = [];
          }

          var qty = {};

          self._setUnitAttributesToFhirQuantity(qty, defUnit);

          targetItem.initial.push({
            valueQuantity: qty
          });
        }

        for (var i = 0, iLen = item.units.length; i < iLen; i++) {
          var unit = item.units[i];
          var fhirUnitExt = {
            "url": this.fhirExtUrlUnitOption,
            "valueCoding": self._createFhirUnitCoding(unit)
          };
          targetItem.extension.push(fhirUnitExt);
        }
      }
    }
  },

  /**
   * Process skip logic
   * @param targetItem an item in FHIR SDC Questionnaire object
   * @param item an item in LForms form object
   * @param source a LForms form object
   * @private
   */
  _handleSkipLogic: function _handleSkipLogic(targetItem, item, source) {
    if (item.skipLogic) {
      var enableWhen = [];
      var rangeFound = false; // ignore "ANY", "ALL" on item.skipLogic.logic
      // ignore "show" on item.skipLogic.action

      for (var i = 0, iLen = item.skipLogic.conditions.length; i < iLen; i++) {
        var condition = item.skipLogic.conditions[i];

        var sourceItem = source._getSkipLogicSourceItem(item, condition.source);

        var enableWhenRules = self._createEnableWhenRulesForSkipLogicCondition(condition, sourceItem);

        if (enableWhenRules.length > 1) {
          rangeFound = true;
        }

        enableWhen = enableWhen.concat(enableWhenRules);
      }

      if (rangeFound && item.skipLogic.conditions.length > 1) {
        // TODO: Multiple skip logic conditons included with range specification is not supported with core FHIR.
        // Use SDC extensions with fhirpath expressions, but not all fhirpath functionality is
        // available yet. Revisit after implementation of variables, %resource etc. in fhirpath.
        throw new Error('Multiple skip logic conditons included with range specification is not supported yet.');
      }

      targetItem.enableWhen = enableWhen;

      if (item.skipLogic.logic === 'ALL' || rangeFound) {
        targetItem.enableBehavior = 'all';
      } else if (enableWhen.length > 1) {
        targetItem.enableBehavior = 'any';
      }
    }
  }
};
/* harmony default export */ __webpack_exports__["default"] = (self);

/***/ }),
/* 91 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

/**
 *  Defines SDC export functions that are the same across the different FHIR
 *  versions.  The function takes the SDC namespace object defined in the sdc export
 *  code, and adds additional functions to it.
 */
function addCommonSDCExportFns(ns) {
  "use strict";

  var self = ns;
  /**
   * Convert LForms captured data to FHIR SDC QuestionnaireResponse
   * @param lfData a LForms form object
   * @param noExtensions a flag that a standard FHIR Questionnaire is to be created without any extensions.
   *  The default is false.
   * @param subject A local FHIR resource that is the subject of the output resource.
   *  If provided, a reference to this resource will be added to the output FHIR
   *  resource when applicable.
   * @returns {{}}
   */

  self.convertLFormsToQuestionnaireResponse = function (lfData, noExtensions, subject) {
    var target = {};

    if (lfData) {
      var source = lfData.getFormData(true, true, true);

      this._processRepeatingItemValues(source);

      this._setResponseFormLevelFields(target, source, noExtensions);

      if (source.items && Array.isArray(source.items)) {
        var tmp = this._processResponseItem(source, true);

        if (tmp && tmp.item && tmp.item.length) {
          target.item = tmp.item;
        }
      }
    } // FHIR doesn't allow null values, strip them out.


    LForms.Util.pruneNulls(target);
    if (subject) target["subject"] = LForms.Util.createLocalFHIRReference(subject);

    this._commonExport._setVersionTag(target);

    return target;
  };
  /**
   * Convert LForms form definition to standard FHIR Questionnaire or FHIR SDC Questionnaire
   * @param lfData a LForms form object
   * @param noExtensions a flag that a standard FHIR Questionnaire is to be created without any extensions.
   *        The default is false.
   * @returns {{}}
   */


  self.convertLFormsToQuestionnaire = function (lfData, noExtensions) {
    var target = {};

    if (lfData) {
      var source = LForms.Util.deepCopy(lfData);

      if (!(source instanceof LForms.LFormsData)) {
        source = new LForms.LFormsData(source);
      }

      this._removeRepeatingItems(source);

      this._setFormLevelFields(target, lfData, noExtensions);

      if (source.items && Array.isArray(source.items)) {
        target.item = [];

        for (var i = 0, iLen = source.items.length; i < iLen; i++) {
          var newItem = this._processItem(source.items[i], source, noExtensions);

          target.item.push(newItem);
        }
      }
    } // FHIR doesn't allow null values, strip them out.


    LForms.Util.pruneNulls(target);

    this._commonExport._setVersionTag(target);

    return target;
  };
  /**
   * Process an item of the form
   * @param item an item in LForms form object
   * @param source a LForms form object
   * @param noExtensions a flag that a standard FHIR Questionnaire is to be created without any extensions.
   *        The default is false.
   * @returns {{}}
   * @private
   */


  self._processItem = function (item, source, noExtensions) {
    var targetItem = {}; // type

    targetItem.type = this._getFhirDataType(item); // id (empty for new record)
    // code

    targetItem.code = item.codeList; // extension

    targetItem.extension = item.extension || []; // later we delete if empty
    // required

    if (item._answerRequired === true || item._answerRequired === false) {
      targetItem.required = item._answerRequired;
    } // http://hl7.org/fhir/StructureDefinition/questionnaire-minOccurs


    if (targetItem.required) {
      var minOccurInt = parseInt(item.questionCardinality.min);

      if (minOccurInt > 1) {
        targetItem.extension.push({
          "url": "http://hl7.org/fhir/StructureDefinition/questionnaire-minOccurs",
          "valueInteger": minOccurInt
        });
      }
    } // question/answer repeats
    // http://hl7.org/fhir/StructureDefinition/questionnaire-maxOccurs


    this._processQuestionAndAnswerCardinality(targetItem, item); // http://hl7.org/fhir/StructureDefinition/questionnaire-itemControl


    this._handleItemControl(targetItem, item); // check restrictions


    this._handleRestrictions(targetItem, item); // http://hl7.org/fhir/StructureDefinition/entryFormat
    // looks like tooltip, TBD


    if (item._isHiddenInDef) {
      targetItem.extension.push({
        url: "http://hl7.org/fhir/StructureDefinition/questionnaire-hidden",
        valueBoolean: true
      });
    } // linkId


    targetItem.linkId = item.linkId; // Text & prefix

    targetItem.text = item.question;

    if (item.prefix) {
      targetItem.prefix = item.prefix;
    } // Copy item extensions


    for (var _i = 0, _arr = ['_prefix', '_text']; _i < _arr.length; _i++) {
      var extField = _arr[_i];
      var extFieldData = item['obj' + extField];
      if (extFieldData) targetItem[extField] = extFieldData;
    } // enableWhen


    if (item.skipLogic) {
      this._handleSkipLogic(targetItem, item, source);
    } // repeats, handled above
    // readonly, (editable)


    if (item.dataType !== "SECTION" && item.dataType !== "TITLE" && item.editable === "0") {
      targetItem.readOnly = true;
    }

    this._handleChoiceField(targetItem, item, noExtensions);

    this._handleTerminologyServer(targetItem, item); // initialValue, for default values


    this._handleInitialValues(targetItem, item); // add LForms Extension to units list. Process units after handling initial values.


    if (item.units) {
      this._handleLFormsUnits(targetItem, item);
    } // data control


    this._handleDataControl(targetItem, item);

    if (item.items && Array.isArray(item.items)) {
      targetItem.item = [];

      for (var i = 0, iLen = item.items.length; i < iLen; i++) {
        var newItem = this._processItem(item.items[i], source, noExtensions);

        targetItem.item.push(newItem);
      }
    } // the coding instruction is a sub item with a "display" type, and an item-control value as "help"
    // it is added as a sub item of this item.
    // http://hl7.org/fhir/StructureDefinition/questionnaire-itemControl, for instructions


    if (item.codingInstructions) {
      var helpItem = {
        "text": item.codingInstructionsPlain ? item.codingInstructionsPlain : item.codingInstructions,
        "type": "display",
        "linkId": targetItem.linkId + "-help",
        "extension": [{
          "url": "http://hl7.org/fhir/StructureDefinition/questionnaire-itemControl",
          "valueCodeableConcept": {
            "text": "Help-Button",
            "coding": [{
              "code": "help",
              "display": "Help-Button",
              "system": "http://hl7.org/fhir/questionnaire-item-control"
            }]
          }
        }]
      }; // format could be 'html' or 'text'

      if (item.codingInstructionsFormat === 'html') {
        // add a "_text" field to contain the extension for the string value in the 'text' field
        // see http://hl7.org/fhir/R4/json.html#primitive
        helpItem._text = {
          "extension": [{
            "url": "http://hl7.org/fhir/StructureDefinition/rendering-xhtml",
            "valueString": item.codingInstructions
          }]
        };
      }

      if (Array.isArray(targetItem.item)) {
        targetItem.item.push(helpItem);
      } else {
        targetItem.item = [helpItem];
      }
    }

    if (item.maxAttachmentSize) {
      var exts = targetItem.extension || (targetItem.extension = []);
      exts.push({
        url: self.fhirExtMaxSize,
        valueDecimal: item.maxAttachmentSize
      });
    }

    if (item.allowedAttachmentTypes) {
      exts = targetItem.extension || (targetItem.extension = []);

      var _iterator = _createForOfIteratorHelper(item.allowedAttachmentTypes),
          _step;

      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var type = _step.value;
          exts.push({
            url: self.fhirExtMimeType,
            valueCode: type
          });
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }
    } // handle special constraints for "display" item


    this._handleSpecialConstraints(targetItem, item); // if no extensions are allowed or there is no extension, remove it


    if (noExtensions || targetItem.extension.length === 0) delete targetItem.extension;
    this.copyFields(item, targetItem, this.itemLevelIgnoredFields);
    return targetItem;
  };
  /**
   * Process the LForms questionCardinality and answerCardinality into FHIR.
   * @param targetItem an item in Questionnaire
   * @param item a LForms item
   */


  self._processQuestionAndAnswerCardinality = function (targetItem, item) {
    var maxOccurs = 0;
    var qCard = item.questionCardinality,
        aCard = item.answerCardinality;
    var qCardMax = qCard && qCard.max !== undefined ? qCard.max : null;
    var aCardMax = aCard && aCard.max !== undefined ? aCard.max : null; // unlimited repeats, no need to set maxOccurs

    if (qCardMax === "*" || aCardMax === "*") {
      if (item.dataType !== "TITLE") {
        targetItem.repeats = true;
      }
    } // not unlimited repeats
    else {
        var intQCardMax = parseInt(qCardMax),
            intACardMax = parseInt(aCardMax); // has a maxOcurrs value

        if (intQCardMax > 1 || intACardMax > 1) {
          if (item.dataType !== "TITLE") {
            targetItem.repeats = true; // get the maxOccurs value

            if (!isNaN(intQCardMax) && !isNaN(intACardMax)) {
              maxOccurs = Math.max(intQCardMax, intACardMax);
            } else if (!isNaN(intQCardMax)) {
              maxOccurs = intQCardMax;
            } else if (!isNaN(intACardMax)) {
              maxOccurs = intACardMax;
            }

            if (maxOccurs > 1) {
              targetItem.extension.push({
                "url": self.fhirExtUrlCardinalityMax,
                "valueInteger": maxOccurs
              });
            }
          }
        }
      }
  };
  /**
   * Process an item's externally defined answer list
   * @param targetItem an item in FHIR SDC Questionnaire object
   * @param item an item in the LForms form object
   * @returns {*}
   * @private
   */


  self._handleExternallyDefined = function (targetItem, item) {
    if (item.externallyDefined) {
      targetItem.extension.push({
        "url": "http://hl7.org/fhir/StructureDefinition/questionnaire-externallydefined",
        "valueUri": item.externallyDefined
      });
    }
  };
  /**
   * Process an item's data control
   * @param targetItem an item in FHIR SDC Questionnaire object
   * @param item an item in the LForms form object
   * @returns {*}
   * @private
   */


  self._handleDataControl = function (targetItem, item) {
    if (item.dataControl) {
      targetItem.extension.push({
        "url": "http://lhcforms.nlm.nih.gov/fhirExt/dataControl",
        "valueString": JSON.stringify(item.dataControl)
      });
    }
  };
  /**
   * Remove repeating items in a form data object
   * @param source a LForms form data object
   * @private
   */


  self._removeRepeatingItems = function (source) {
    if (source.items && Array.isArray(source.items)) {
      for (var i = source.items.length - 1; i >= 0; i--) {
        // if it is a repeating item, whose _id is not 1
        if (source.items[i]._id > 1) {
          source.items.splice(i, 1);
        } else {
          this._removeRepeatingItems(source.items[i]);
        }
      }
    }
  };
  /**
   * Set form level attributes
   * @param target a Questionnaire object
   * @param source a LForms form object
   * @param noExtensions  a flag that a standard FHIR Questionnaire is to be created without any extensions.
   *        The default is false.
   * @private
   */


  self._setFormLevelFields = function (target, source, noExtensions) {
    this.copyFields(source, target, this.formLevelFields); // Handle title and name.  In LForms, "name" is the "title", but FHIR
    // defines both.

    target.name = source.shortName; // computer friendly

    target.title = source.name; // Handle extensions on title

    if (source.obj_title) target._title = source.obj_title;
    target.code = source.codeList; // resourceType

    target.resourceType = "Questionnaire";
    target.status = target.status ? target.status : "draft"; // meta

    var profile = noExtensions ? this.stdQProfile : this.QProfile;
    target.meta = target.meta ? target.meta : {};
    target.meta.profile = target.meta.profile ? target.meta.profile : [profile];
  };
  /**
   * Process itemControl based on LForms item's answerLayout and questionLayout
   * @param targetItem an item in FHIR SDC Questionnaire object
   * @param item an item in LForms form object
   * @private
   */


  self._handleItemControl = function (targetItem, item) {
    // http://hl7.org/fhir/StructureDefinition/questionnaire-itemControl
    var itemControlType = "";
    var itemControlDisplay, answerChoiceOrientation; // Fly-over, Table, Checkbox, Combo-box, Lookup

    if (!jQuery.isEmptyObject(item.displayControl)) {
      var dataType = this._getAssumedDataTypeForExport(item); // for answers


      if (item.displayControl.answerLayout && (dataType === "CNE" || dataType === "CWE")) {
        // search field
        if (item.externallyDefined || item.answerValueSet && item.isSearchAutocomplete) {
          itemControlType = "autocomplete";
          itemControlDisplay = "Auto-complete";
        } // prefetch list
        // combo-box
        else if (item.displayControl.answerLayout.type === "COMBO_BOX") {
            itemControlType = "drop-down";
            itemControlDisplay = "Drop down";
          } // radio or checkbox
          else if (item.displayControl.answerLayout.type === "RADIO_CHECKBOX") {
              if (item.answerCardinality && (item.answerCardinality.max === "*" || parseInt(item.answerCardinality.max) > 1)) {
                itemControlType = "check-box";
                itemControlDisplay = "Check-box";
              } else {
                itemControlType = "radio-button";
                itemControlDisplay = "Radio Button";
              } // answer choice orientation


              if (item.displayControl.answerLayout.columns === "0") {
                answerChoiceOrientation = "horizontal";
              } else if (item.displayControl.answerLayout.columns === "1") {
                answerChoiceOrientation = "vertical";
              }
            }
      } // for section item
      else if (item.displayControl.questionLayout && dataType === "SECTION") {
          if (item.displayControl.questionLayout === "horizontal") {
            itemControlType = "gtable"; // Not in STU3, but the binding is extensible, so we can use it

            itemControlDisplay = "Group Table";
          } else if (item.displayControl.questionLayout === "matrix") {
            itemControlType = "table";
            itemControlDisplay = "Vertical Answer Table";
          } // else {
          //   itemControlType = "List";
          // }

        }

      if (itemControlType) {
        targetItem.extension.push({
          "url": "http://hl7.org/fhir/StructureDefinition/questionnaire-itemControl",
          "valueCodeableConcept": {
            "coding": [{
              //"system" : "<uri>", // Identity of the terminology system
              //"version" : "<string>", // Version of the system - if relevant
              //"code" : "<code>", // Symbol in syntax defined by the system
              //"display" : "<string>", // Representation defined by the system
              //"userSelected" : <boolean> // If this coding was chosen directly by the user
              "system": "http://hl7.org/fhir/questionnaire-item-control",
              "code": itemControlType,
              "display": itemControlDisplay
            }],
            "text": itemControlDisplay || itemControlType
          }
        }); // answer choice orientation

        if (answerChoiceOrientation) {
          targetItem.extension.push({
            "url": "http://hl7.org/fhir/StructureDefinition/questionnaire-choiceOrientation",
            "valueCode": answerChoiceOrientation
          });
        }
      }
    }
  };
  /**
   * Process an item's terminology server setting.
   * @param targetItem a QuestionnaireResponse object
   * @param item an item in the LForms form object
   * @returns {*}
   * @private
   */


  self._handleTerminologyServer = function (targetItem, item) {
    if (item.terminologyServer) {
      targetItem.extension.push({
        "url": self.fhirExtTerminologyServer,
        "valueUrl": item.terminologyServer
      });
    }
  };
  /**
   * Convert LForms data type to FHIR SDC data type
   * @param item an item in the LForms form object
   * @returns {string}
   * @private
   */


  self._getFhirDataType = function (item) {
    var dataType = this._getAssumedDataTypeForExport(item);

    var type = this._lformsTypesToFHIRTypes[dataType]; // default is string

    if (!type) {
      type = 'string';
    }

    return type;
  };
  /**
   * Determine how an item's data type should be for export.
    If number type has multiple units, change it to quantity type. In such a case,
   multiple units are converted to quesionnaire-unitOption extension and the default unit
   would go into initial.valueQuantity.unit.
   For single unit numbers, use the same type, whose unit will be in questionnaire-unit extension.
    * @param item an item in the LForms form object
   * @returns {string} dataType - Data type in lforms
   * @private
   */


  self._getAssumedDataTypeForExport = function (item) {
    var dataType = item.dataType;

    if ((item.dataType === 'REAL' || item.dataType === 'INT') && item.units && item.units.length > 1) {
      dataType = 'QTY';
    }

    return dataType;
  };
  /**
   * Make a FHIR Quantity for the given value and unit info.
   * @param value optional, must be an integer or decimal
   * @param itemUnit optional, lform data item.unit (that has a name property)
   * @param unitSystem optional, overrides any system in itemUnit.
   * @return a FHIR quantity or null IFF the given value is not a number (parseFloat() returns NaN).
   * @private
   */


  self._makeValueQuantity = function (value, itemUnit, unitSystem) {
    var fhirQuantity = {};
    var floatValue = parseFloat(value);

    if (!isNaN(floatValue)) {
      fhirQuantity.value = floatValue;
    }

    if (itemUnit) {
      self._setUnitAttributesToFhirQuantity(fhirQuantity, itemUnit);

      if (unitSystem) {
        fhirQuantity.system = unitSystem;
      }
    }

    return Object.keys(fhirQuantity).length > 0 ? fhirQuantity : null;
  };
  /**
   * Make a FHIR Quantity for the given value and unit info.
   * @param value required, must be an integer or decimal
   * @param itemUnits optional, lform data item.units (An array of units)
   * @param unitSystem optional.
   * @return a FHIR quantity or null IFF the given value is not a number (parseFloat() returns NaN).
   * @private
   */


  self._makeQuantity = function (value, itemUnits, unitSystem) {
    var defaultUnit = this._getDefaultUnit(itemUnits);

    return this._makeValueQuantity(value, defaultUnit, unitSystem);
  };
  /**
   * Pick a default unit if found, otherwise return first one as default. Will return
   * null, if passed with empty list.
   * @param lformsUnits - Array of lforms units i.e with {name, default}
   * @returns {*} Return lforms unit if found otherwise null.
   * @private
   */


  self._getDefaultUnit = function (lformsUnits) {
    if (!lformsUnits || lformsUnits.length === 0) {
      return null;
    }

    var ret = null;

    for (var i = 0; i < lformsUnits.length; i++) {
      if (lformsUnits[i].default) {
        ret = lformsUnits[i];
        break;
      }
    }

    if (!ret) {
      ret = lformsUnits[0];
    }

    return ret;
  };
  /**
   * Create a key from data type to be used in a hash
   * @param prefix a prefix to be added to the key
   * @param item a LForms item
   * @returns {*}
   * @private
   */


  self._getValueKeyByDataType = function (prefix, item) {
    // prefix could be 'value', 'initial', 'answer'
    if (!prefix) {
      prefix = "value";
    }

    var fhirType = this._getFhirDataType(item);

    var dataType = fhirType === 'quantity' ? 'QTY' : item.dataType;
    var valueKey = this._lformsTypesToFHIRFields[dataType];
    return prefix + valueKey;
  };
  /**
   * Convert the minInclusive/minExclusive, maxInclusive/maxExclusive to FHIR. See the
   * the function _handleRestrictions() in sdc-export.js for more details on the context.
   * @param dataType Lforms data type, currently supporting DT, DTM, TM, REAL, and INT.
   * @param value the value (in the lforms system, either a number or a string).
   * @param valueKey the valueKey in FHIR minValue/maxValue extension (e.g., valueInteger)
   * @param minMaxKey must be one of minInclusive, minExclusive, maxInclusive, maxExclusive
   * @return The FHIR extension element. Specifically, undefined is returned if:
   *         - the given value is null or undefined, or
   *         - the dataType is not one of those listed above, or
   *         - the minMaxKey is not one of those listed above
   * @private
   */


  self._MIN_MAX_TYPES = ['DT', 'DTM', 'TM', 'REAL', 'INT'].reduce(function (map, t) {
    map[t] = t;
    return map;
  }, {});
  self._MIN_MAX_KEYS = ['minExclusive', 'minInclusive', 'maxExclusive', 'maxInclusive'].reduce(function (map, t) {
    map[t] = t;
    return map;
  }, {});

  self._exportMinMax = function (dataType, value, valueKey, minMaxKey) {
    if (value === null || value === undefined || !self._MIN_MAX_TYPES[dataType] || !self._MIN_MAX_KEYS[minMaxKey]) {
      return undefined;
    }

    var isoDateStr = dataType === "DT" || dataType === "DTM" ? new Date(value).toISOString() : dataType == "TM" ? new Date('1970-01-01T' + value + 'Z').toISOString() : null;
    var fhirValue = dataType === "DT" ? isoDateStr.substring(0, 10) : dataType === "DTM" ? isoDateStr : dataType === "TM" ? isoDateStr.substring(11, isoDateStr.length - 1) : dataType === "REAL" ? parseFloat(value) : parseInt(value);
    var fhirExtUrl = minMaxKey.indexOf('min') === 0 ? 'http://hl7.org/fhir/StructureDefinition/minValue' : 'http://hl7.org/fhir/StructureDefinition/maxValue';
    return _defineProperty({
      url: fhirExtUrl
    }, valueKey, fhirValue);
  }; // known source data types (besides CNE/CWE) in skip logic export handling,
  // see _createEnableWhenRulesForSkipLogicCondition below


  self._skipLogicValueDataTypes = ["BL", "REAL", "INT", 'QTY', "DT", "DTM", "TM", "ST", "TX", "URL"].reduce(function (map, type) {
    map[type] = type;
    return map;
  }, {});
  /**
   * @param skipLogicCondition - Lforms skip logic condition object
   * @param sourceItem - Skip logic source item in lforms.
   * @return {Array} FHIR enableWhen array
   * @private
   */

  self._createEnableWhenRulesForSkipLogicCondition = function (skipLogicCondition, sourceItem) {
    // dataTypes:
    // boolean, decimal, integer, date, dateTime, instant, time, string, uri,
    // Attachment, Coding, Quantity, Reference(Resource)
    var sourceDataType = this._getAssumedDataTypeForExport(sourceItem);

    var sourceValueKey = this._getValueKeyByDataType("answer", sourceItem);

    var enableWhenRules = []; // Per lforms spec, the trigger keys can be:
    // exists, value, minExclusive, minInclusive, maxExclusive, maxInclusive

    Object.keys(skipLogicCondition.trigger).forEach(function (key) {
      var operator = self._operatorMapping[key];
      var triggerValue = skipLogicCondition.trigger[key];

      if (!operator || triggerValue !== 0 && triggerValue !== false && !triggerValue) {
        throw new Error('Invalid lforms skip logic trigger: ' + JSON.stringify(skipLogicCondition.trigger, null, 4));
      }

      var rule = null;

      if (operator === 'exists') {
        rule = {
          answerBoolean: triggerValue
        };
      } // for Coding
      // multiple selections, item.value is an array
      // NO support of multiple selections in FHIR SDC, just pick one
      else if (sourceDataType === 'CWE' || sourceDataType === 'CNE') {
          var answerCoding = self._copyTriggerCoding(triggerValue, null, true);

          if (!answerCoding) {
            throw new Error('Invalid CNE/CWE trigger, key=' + key + '; value=' + triggerValue);
          }

          rule = {
            answerCoding: answerCoding
          };
        } else if (sourceDataType && self._skipLogicValueDataTypes[sourceDataType]) {
          var answer = triggerValue;

          if (sourceValueKey === 'answerQuantity') {
            answer = self._makeQuantity(answer, sourceItem.units);
          }

          if (answer === 0 || answer === false || answer) {
            rule = _defineProperty({}, sourceValueKey, answer);
          } else {
            throw new Error('Invalid value for trigger ' + key + ': ' + triggerValue);
          }
        } else {
          throw new Error('Unsupported data type for skip logic export: ' + sourceDataType);
        }

      rule.question = sourceItem.linkId;
      rule.operator = operator;
      enableWhenRules.push(rule);
    });
    return enableWhenRules;
  };
  /**
   * Set form level attribute
   * @param target a QuestionnaireResponse object
   * @param noExtensions  a flag that a standard FHIR Questionnaire is to be created without any extensions.
   *        The default is false.
   * @param source a LForms form object
    * @private
   */


  self._setResponseFormLevelFields = function (target, source, noExtensions) {
    // resourceType
    target.resourceType = "QuestionnaireResponse"; // meta

    var profile = noExtensions ? this.stdQRProfile : this.QRProfile;
    target.meta = target.meta ? target.meta : {};
    target.meta.profile = target.meta.profile ? target.meta.profile : [profile]; // "identifier": - not including identifier in QuestionnaireResponse per LF-1183
    //target.identifier = {
    //  "system": LForms.Util.getCodeSystem(source.codeSystem),
    //  "value": source.code
    //};
    // status, required
    // "in-progress", "completed", "amended"

    target.status = "completed"; // authored, required

    target.authored = LForms.Util.dateToDTMString(new Date()); // questionnaire , required
    // We do not have the ID at this point, so leave it unset for now.  Note
    // that the fomat has also changed from Reference to canonical in R4.

    /*
    target.questionnaire = {
      // questionnaireId should be an id of a related existing questionnaire resource stored in the server
      "reference": "Questionnaire/{{questionnaireId}}"
    };
    */
  };
  /**
   * Set unit attributes to a given FHIR quantity.
   *
   * @param fhirQuantity - FHIR Quantity object
   * @param lfUnit - Lforms unit, which includes name, code and system.
   * @private
   */


  self._setUnitAttributesToFhirQuantity = function (fhirQuantity, lfUnit) {
    if (fhirQuantity && lfUnit) {
      if (lfUnit.name) {
        fhirQuantity.unit = lfUnit.name;
      }

      if (lfUnit.code) {
        fhirQuantity.code = lfUnit.code;
      } // Unit system is optional. It was using a default system before,
      // Now we have an defined system field, read it from data and
      // not assume a default.


      if (lfUnit.system) {
        fhirQuantity.system = lfUnit.system;
      }
    }
  };
  /**
   * Create a FHIR coding object for a unit.
   *
   * @param lfUnit - Lforms unit, which includes name, code and system.
   * @returns FHIR coding object
   * @private
   */


  self._createFhirUnitCoding = function (lfUnit) {
    var ret = null;

    if (lfUnit) {
      ret = {};

      if (lfUnit.code) {
        ret.code = lfUnit.code;
      }

      if (lfUnit.name) {
        ret.display = lfUnit.name;
      }

      if (lfUnit.system) {
        ret.system = lfUnit.system;
      }
    }

    return ret;
  };
  /**
   * Converting the given item's value to FHIR QuestionaireResponse.answer (an array).
   * This is almost straightly refactored out of the original function self._handleAnswerValues.
   * This function only looks at the item value itself and not its sub-items, if any.
   * Here are the details for a single value's conversion (to an element in the returned answer array)
   * - For item data type quantity (QTY), a valueQuantity answer element will be created IF
   *   either (or both) item value or item unit is available.
   * - For item data types boolean, decimal, integer, date, dateTime, instant, time, string, attachment, and url,
   *   it will be converted to a FHIR value{TYPE} entry if the value is not null, not undefined, and not
   *   an empty string.
   * - For CNE and CWE, a valueCoding entry is created IF at least one of the item value's code, text, or system
   *   is available
   * - No answer entry will be created in all other cases, e.g., for types reference, title, section, etc.
   * @param item the item whose value is to be converted
   * @return the converted FHIR QuestionnaireResponse answer (an array), or null if the value is not converted -
   *         see the function description above for more details.
   * @private
   */


  self._lfItemValueToFhirAnswer = function (item) {
    // item could have an empty value if its sub-item has a value
    if (item.value === undefined || item.value === null || item.value === '') return null;

    var dataType = this._getAssumedDataTypeForExport(item);

    var values = this._answerRepeats(item) ? item.value : [item.value];
    var answers = [];

    for (var i = 0; i < values.length; ++i) {
      var itemValue = values[i];

      if (itemValue !== undefined && itemValue !== null && itemValue !== '') {
        var answer = null; // for Coding

        if (dataType === 'CWE' || dataType === 'CNE') {
          // for CWE, the value could be string if it is a user typed, not-on-list value
          if (dataType === 'CWE' && typeof itemValue === 'string') {
            answer = {
              "valueString": itemValue
            };
          } else if (!jQuery.isEmptyObject(itemValue)) {
            var answerCoding = this._setIfHasValue(null, 'system', LForms.Util.getCodeSystem(itemValue.system));

            answerCoding = this._setIfHasValue(answerCoding, 'code', itemValue.code);
            answerCoding = this._setIfHasValue(answerCoding, 'display', itemValue.text);
            answer = this._setIfHasValue(null, 'valueCoding', answerCoding);
          }
        } // for Quantity
        else if (dataType === "QTY") {
            // For now, handling only simple quantities without the comparators.
            // [{
            //   // from Element: extension
            //   "value" : <decimal>, // Numerical value (with implicit precision)
            //   "comparator" : "<code>", // < | <= | >= | > - how to understand the value
            //   "unit" : "<string>", // Unit representation
            //   "system" : "<uri>", // Code System that defines coded unit form
            //   "code" : "<code>" // Coded form of the unit
            // }]
            answer = this._setIfHasValue(null, 'valueQuantity', this._makeValueQuantity(itemValue, item.unit));
          } // for boolean, decimal, integer, date, dateTime, instant, time, string, uri, attachment
          else if (this._lformsTypesToFHIRFields[dataType]) {
              var valueKey = this._getValueKeyByDataType("value", item);

              answer = _defineProperty({}, valueKey, itemValue);
            }

        if (answer !== null) {
          answers.push(answer);
        }
      }
    }

    return answers.length === 0 ? null : answers;
  };
  /**
   * Check if an lform item has sub-items, that is, having an "items" field whose value is an array with non-zero length.
   * @param item the item to be checked for the presense of sub-items.
   * @return {*|boolean} true if the item has sub-items, false otherwise.
   * @private
   */


  self._lfHasSubItems = function (item) {
    return item && item.items && Array.isArray(item.items) && item.items.length > 0;
  };
  /**
   * Process an item of the form or the form itself - if it's the form itself, the form-level
   * properties will not be set here and will need to be managed outside of this function.
   * If the lforms item is repeatable, this function handles one particular occurrence of the item.
   * @param lfItem an item in LForms form object, or the form object itself
   * @param isForm optional, default false. If true, the given item is the form object itself.
   * @returns {{}} the converted FHIR item
   * @private
   */


  self._processResponseItem = function (lfItem, isForm) {
    if (isForm && typeof isForm !== 'boolean') {
      // just in case some are invoking it the old way.
      throw new Error('_processResponseItem function signature has been changed, please check/fix.');
    }

    var targetItem = isForm || lfItem.dataType === 'TITLE' ? {} : {
      linkId: lfItem.linkId,
      text: lfItem.question
    }; // just handle/convert the current item's value, no-recursion to sub-items at this step.

    if (!isForm && lfItem.dataType !== 'TITLE' && lfItem.dataType !== 'SECTION') {
      this._setIfHasValue(targetItem, 'answer', this._lfItemValueToFhirAnswer(lfItem));
    }

    if (this._lfHasSubItems(lfItem)) {
      var fhirItems = [];

      for (var i = 0; i < lfItem.items.length; ++i) {
        var lfSubItem = lfItem.items[i];

        if (!lfSubItem._isProcessed) {
          var linkId = lfSubItem.linkId;
          var repeats = lfItem._repeatingItems && lfItem._repeatingItems[linkId];

          if (repeats) {
            // Can only be questions here per _processRepeatingItemValues
            var fhirItem = {
              // one FHIR item for all repeats with the same linkId
              linkId: linkId,
              text: lfSubItem.question,
              answer: []
            };

            for (var rpt = 0; rpt < repeats.length; ++rpt) {
              var rptItem = repeats[rpt];

              var tmpFhirItem = this._processResponseItem(rptItem);

              if (tmpFhirItem.answer) {
                // TODO: not sure how to handle cases when both (lforms) question and answer repeat.
                // For now, just put all the answers from question and answer repeats into the answer (array).
                Array.prototype.push.apply(fhirItem.answer, tmpFhirItem.answer);
              }

              rptItem._isProcessed = true;
            }

            fhirItems.push(fhirItem);
            delete lfItem._repeatingItems[linkId]; // cleanup, no longer needed
          } else {
            var _fhirItem = this._processResponseItem(lfSubItem);

            fhirItems.push(_fhirItem);
          }
        }

        if (lfSubItem._isProcessed) {
          delete lfSubItem._isProcessed; // cleanup, no longer needed
        }
      }

      if (fhirItems.length > 0) {
        if (!isForm && lfItem.dataType !== 'SECTION') {
          // Question repeat is handled at the "parent level"; TODO: not sure how to handle answer repeat here,
          // assuming it isn't possible for an item to have answer repeat and sub-items at the same time.
          targetItem.answer = targetItem.answer || [];
          targetItem.answer[0] = targetItem.answer[0] || {};
          targetItem.answer[0].item = fhirItems;
        } else {
          targetItem.item = fhirItems;
        }
      }
    }

    return targetItem;
  };
  /**
   * Group values of the questions that have the same linkId
   * @param item an item in the LForms form object or a form item object
   * @private
   *
   */


  self._processRepeatingItemValues = function (item) {
    if (item.items) {
      for (var i = 0, iLen = item.items.length; i < iLen; i++) {
        var subItem = item.items[i]; // if it is a question and it repeats

        if (subItem.dataType !== 'TITLE' && subItem.dataType !== 'SECTION' && this._questionRepeats(subItem)) {
          var linkId = subItem.linkId;
          item._repeatingItems = item._repeatingItems || {};
          item._repeatingItems[linkId] = item._repeatingItems[linkId] || [];

          item._repeatingItems[linkId].push(subItem);
        } // if it's a section or a question that has children items


        if (this._lfHasSubItems(subItem)) {
          this._processRepeatingItemValues(subItem);
        }
      }
    }
  };
  /**
   * Get the extract value for the item or the closest parent
   * @param item an item in Questionnaire
   */


  self._getExtractValue = function (item) {
    var currentItem = item;

    while (true) {
      if (currentItem._fhirExt && currentItem._fhirExt[this.fhirExtObsExtract]) {
        return currentItem._fhirExt[this.fhirExtObsExtract][0].valueBoolean;
      } else if (!currentItem._parentItem) {
        return false;
      }

      currentItem = currentItem._parentItem;
    }
  };
}

/* harmony default export */ __webpack_exports__["default"] = (addCommonSDCExportFns);

/***/ }),
/* 92 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/**
 * A package to handle conversion from FHIR SDC Questionnaire to LForms
 *
 * It provides the following functions:
 * convertQuestionnaireToLForms()
 * -- Convert FHIR SDC QuestionnaireResponse data into corresponding LForms data
 * mergeQuestionnaireResponseToLForms()  (defined in sdc-import-common.js)
 * -- Merge FHIR SDC QuestionnaireResponse data into corresponding LForms data
 */
function addSDCImportFns(ns) {
  "use strict";

  var self = ns; // FHIR extension urls

  self.fhirExtUrlOptionScore = "http://hl7.org/fhir/StructureDefinition/ordinalValue";
  self.fhirExtUrlValueSetScore = self.fhirExtUrlOptionScore;
  /**
   * Extract contained VS (if any) from the given questionnaire resource object.
   * @param questionnaire the FHIR questionnaire resource object
   * @return when there are contained value sets, returns a hash from the ValueSet url to the answers
   *         options object, which, in turn, is a hash with 4 entries:
   *         - "answers" is the list of LF answers converted from the value set.
   *         - "systems" is the list of code systems for each answer item; and
   *         returns undefined if no contained value set is present.
   * @private
   */

  self._extractContainedVS = function (questionnaire) {
    var answersVS;

    if (questionnaire.contained && questionnaire.contained.length > 0) {
      answersVS = {};
      questionnaire.contained.forEach(function (vs) {
        if (vs.resourceType === 'ValueSet') {
          var answers = self.answersFromVS(vs);
          if (!answers) answers = []; // continuing with previous default; not sure if needed
          // Support both id and url based lookup - we are only supporting our non-standard url approach
          // for backward-compatibility with previous LForms versions. For more details on FHIR contained
          // resource references, please see "http://hl7.org/fhir/references.html#canonical-fragments"

          var lfVS = {
            answers: answers
          };

          if (vs.id) {
            answersVS['#' + vs.id] = lfVS;
          }

          if (vs.url) {
            answersVS[vs.url] = lfVS;
          }
        }
      });
    }

    return answersVS;
  };
  /**
   * Process questionnaire item recursively
   *
   * @param qItem - item object as defined in FHIR Questionnaire.
   * @param containedVS - contained ValueSet info, see _extractContainedVS() for data format details
   * @param linkIdItemMap - Map of items from link ID to item from the imported resource.
   * @returns {{}} - Converted 'item' field object as defined by LForms definition.
   * @private
   */


  self._processQuestionnaireItem = function (qItem, containedVS, linkIdItemMap) {
    var targetItem = {}; //A lot of parsing depends on data type. Extract it first.

    self._processDataType(targetItem, qItem);

    self._processTextAndPrefix(targetItem, qItem);

    self._processCodeAndLinkId(targetItem, qItem);

    self._processDisplayItemCode(targetItem, qItem);

    self._processEditable(targetItem, qItem);

    self._processFHIRQuestionAndAnswerCardinality(targetItem, qItem);

    self._processDisplayControl(targetItem, qItem);

    self._processDataControl(targetItem, qItem);

    self._processRestrictions(targetItem, qItem);

    self._processHiddenItem(targetItem, qItem);

    self._processUnitList(targetItem, qItem);

    self._processAnswers(targetItem, qItem, containedVS);

    self._processDefaultAnswer(targetItem, qItem);

    self._processExternallyDefined(targetItem, qItem);

    self._processTerminologyServer(targetItem, qItem);

    self._processSkipLogic(targetItem, qItem, linkIdItemMap);

    self._processExtensions(targetItem, qItem);

    self.copyFields(qItem, targetItem, self.itemLevelIgnoredFields);

    self._processChildItems(targetItem, qItem, containedVS, linkIdItemMap);

    return targetItem;
  };
  /**
   * Parse questionnaire object for skip logic information
   *
   * @param lfItem {object} - LForms item object to assign the skip logic
   * @param qItem {object} - Questionnaire item object
   * @param linkIdItemMap - Map of items from link ID to item from the imported resource.
   * @private
   */


  self._processSkipLogic = function (lfItem, qItem, linkIdItemMap) {
    if (qItem.enableWhen) {
      lfItem.skipLogic = {
        conditions: [],
        action: 'show'
      };

      for (var i = 0; i < qItem.enableWhen.length; i++) {
        var dataType = self._getDataType(linkIdItemMap[qItem.enableWhen[i].question]);

        var condition = {
          source: qItem.enableWhen[i].question,
          trigger: {}
        };

        var answer = self._getFHIRValueWithPrefixKey(qItem.enableWhen[i], /^answer/);

        var opMapping = self._operatorMapping[qItem.enableWhen[i].operator];

        if (!opMapping) {
          throw new Error('Unable to map FHIR enableWhen operator: ' + qItem.enableWhen[i].operator);
        }

        if (opMapping === 'exists') {
          condition.trigger.exists = answer; // boolean value here regardless of data type
        } else if (dataType === 'CWE' || dataType === 'CNE') {
          condition.trigger[opMapping] = self._copyTriggerCoding(answer, null, false);
        } else if (dataType === 'QTY') {
          condition.trigger[opMapping] = answer.value;
        } else {
          condition.trigger[opMapping] = answer;
        }

        lfItem.skipLogic.conditions.push(condition);
      }

      if (qItem.enableBehavior) {
        lfItem.skipLogic.logic = qItem.enableBehavior.toUpperCase();
      }
    }
  };
  /**
   * Parse Questionnaire item for externallyDefined url
   *
   * @param lfItem - LForms item object to assign externallyDefined
   * @param qItem - Questionnaire item object
   * @private
   */


  self._processExternallyDefined = function (lfItem, qItem) {
    var externallyDefined = LForms.Util.findObjectInArray(qItem.extension, 'url', self.fhirExtUrlExternallyDefined);

    if (externallyDefined && externallyDefined.valueUri) {
      lfItem.externallyDefined = externallyDefined.valueUri;
    }
  };
  /**
   * Parse questionnaire item for "hidden" extension
   *
   * @param lfItem {object} - LForms item object to be assigned the _isHiddenInDef flag if the item is to be hidden.
   * @param qItem {object} - Questionnaire item object
   * @private
   * @return true if the item is hidden or if its ancestor is hidden, false otherwise
   */


  self._processHiddenItem = function (lfItem, qItem) {
    var ci = LForms.Util.findObjectInArray(qItem.extension, 'url', self.fhirExtUrlHidden);

    if (ci) {
      lfItem._isHiddenInDef = typeof ci.valueBoolean === 'boolean' ? ci.valueBoolean : ci.valueBoolean === 'true';
    }

    return lfItem._isHiddenInDef;
  };
  /**
   * Parse questionnaire item for answers list
   *
   * @param lfItem {object} - LForms item object to assign answer list
   * @param qItem {object} - Questionnaire item object
   * @param containedVS - contained ValueSet info, see _extractContainedVS() for data format details
   * @private
   */


  self._processAnswers = function (lfItem, qItem, containedVS) {
    if (qItem.answerOption) {
      lfItem.answers = [];

      for (var i = 0; i < qItem.answerOption.length; i++) {
        var answer = {};
        var option = qItem.answerOption[i];
        var label = LForms.Util.findObjectInArray(option.extension, 'url', self.fhirExtUrlOptionPrefix);

        if (label) {
          answer.label = label.valueString;
        }

        var score = LForms.Util.findObjectInArray(option.extension, 'url', self.fhirExtUrlOptionScore); // Look for argonaut extension.

        score = !score ? LForms.Util.findObjectInArray(option.extension, 'url', self.argonautExtUrlExtensionScore) : score;

        if (score) {
          answer.score = score.valueDecimal.toString();
        }

        var optionKey = Object.keys(option).filter(function (key) {
          return key.indexOf('value') === 0;
        });

        if (optionKey && optionKey.length > 0) {
          if (optionKey[0] === 'valueCoding') {
            // Only one value[x] is expected
            if (option[optionKey[0]].code !== undefined) answer.code = option[optionKey[0]].code;
            if (option[optionKey[0]].display !== undefined) answer.text = option[optionKey[0]].display; // TBD- Lforms has answer code system at item level, expects all options to have one code system!

            if (option[optionKey[0]].system !== undefined) {
              answer.system = option[optionKey[0]].system;
            }
          } else {
            answer.text = option[optionKey[0]].toString();
          }
        }

        lfItem.answers.push(answer);
      }
    } else if (qItem.answerValueSet) {
      if (containedVS) var vs = containedVS[qItem.answerValueSet];

      if (vs) {
        // contained
        lfItem.answers = vs.answers;
      } else lfItem.answerValueSet = qItem.answerValueSet; // a URI for a ValueSet

    }
  };
  /**
   * Parse questionnaire item for editable
   *
   * @param lfItem {object} - LForms item object to assign editable
   * @param qItem {object} - Questionnaire item object
   * @private
   */


  self._processEditable = function (lfItem, qItem) {
    if (qItem.readOnly) {
      lfItem.editable = '0';
    }
  };
  /**
   * Parse questionnaire item for default answer
   *
   * @param lfItem {object} - LForms item object to assign default answer
   * @param qItem {object} - Questionnaire item object
   * @private
   */


  self._processDefaultAnswer = function (lfItem, qItem) {
    if (!qItem.initial) {
      return;
    }

    var vals = [];
    qItem.initial.forEach(function (elem) {
      var answer = null;
      elem = LForms.Util.deepCopy(elem); // Use a clone to avoid changing the original

      var val = elem.valueCoding;
      if (val) val._type = 'Coding';else val = self._getFHIRValueWithPrefixKey(elem, /^value/);
      if (val) vals.push(val);
    });
    if (vals.length > 0) this._processFHIRValues(lfItem, vals, true);
  };
  /**
   *  Returns the first initial quanitity for the given Questionnaire item, or
   *  null if there isn't one.
   */


  self.getFirstInitialQuantity = function (qItem) {
    return qItem.initial && qItem.initial.length > 0 && qItem.initial[0].valueQuantity || null;
  };
  /**
   * Parse 'linkId' for the LForms questionCode of a 'display' item, which does not have a 'code'
   *
   * @param lfItem {object} - LForms item object to assign questionCode
   * @param qItem {object} - Questionnaire item object
   * @private
   */


  self._processDisplayItemCode = function (lfItem, qItem) {
    if (qItem.type === "display" && qItem.linkId) {
      var codes = qItem.linkId.split("/");

      if (codes && codes[codes.length - 1]) {
        lfItem.questionCode = codes[codes.length - 1];
      }
    }
  };
  /**
   * Parse questionnaire item for data type
   *
   * @param lfItem {object} - LForms item object to assign data type
   * @param qItem {object} - Questionnaire item object
   * @private
   */


  self._processDataType = function (lfItem, qItem) {
    var type = self._getDataType(qItem);

    if (type === 'SECTION') {
      lfItem.header = true;
    }

    lfItem.dataType = type;
  }; // Quesitonnaire Response Import


  self._mergeQR = {
    /**
     * Get structure information of a QuestionnaireResponse instance
     * @param qr a QuestionnaireResponse instance
     * @returns {{}} a QuestionnaireResponse data structure object
     * @private
     */
    _getQRStructure: function _getQRStructure(qr) {
      var qrInfo = {
        qrItemsInfo: []
      };

      if (qr) {
        this._checkQRItems(qrInfo, qr);
      }

      return qrInfo;
    },

    /**
     * Get structural info of a QuestionnaireResponse by going though each level of items
     * @param parentQRItemInfo the structural info of a parent item
     * @param parentItem a parent item in a QuestionnaireResponse object
     * @private
     */
    _checkQRItems: function _checkQRItems(parentQRItemInfo, parentQRItem) {
      var qrItemsInfo = [];
      var repeatingItemProcessed = {};

      if (parentQRItem && parentQRItem.item) {
        for (var i = 0, iLen = parentQRItem.item.length; i < iLen; i++) {
          var item = parentQRItem.item[i];
          var linkId = item.linkId; //code is not necessary included in linkId
          // first item that has the same code, either repeating or non-repeating

          if (!repeatingItemProcessed[linkId]) {
            var repeatingInfo = this._findTotalRepeatingNum(linkId, parentQRItem); // create structure info for the item


            var repeatingItems = repeatingInfo.repeatingItems;

            for (var j = 0, jLen = repeatingItems.length; j < jLen; j++) {
              var qrItemInfo = {
                linkId: linkId,
                item: repeatingItems[j],
                index: j,
                total: repeatingInfo.total
              }; // check observation instances in the sub level

              this._checkQRItems(qrItemInfo, repeatingItems[j]);

              self._checkQRItemAnswerItems(qrItemInfo, repeatingItems[j]);

              qrItemsInfo.push(qrItemInfo);
            }

            repeatingItemProcessed[linkId] = true;
          }
        }

        parentQRItemInfo.qrItemsInfo = qrItemsInfo;
      }
    },

    /**
     * Find the number of the repeating items that have the same code
     * @param linkId an item's linkId
     * @param parentQRItem a parent item in a QuestionnaireResponse object
     * @returns a structural info object for a repeating item
     * @private
     */
    _findTotalRepeatingNum: function _findTotalRepeatingNum(linkId, parentQRItem) {
      var total = 0;
      var repeatingItems = [];

      for (var i = 0, iLen = parentQRItem.item.length; i < iLen; i++) {
        var item = parentQRItem.item[i];

        if (linkId === item.linkId) {
          repeatingItems.push(item);

          if (Array.isArray(item.answer)) {
            total += item.answer.length; // answers for repeating questions and repeating answers
          } else {
            total += 1;
          }
        }
      }

      return {
        total: total,
        repeatingItems: repeatingItems
      };
    },

    /**
     * Add repeating items into LForms definition data object
     * @param parentItem a parent item
     * @param linkId linkId of a repeating item
     * @param total total number of the repeating item with the same code
     * @private
     */
    _addRepeatingItems: function _addRepeatingItems(parentItem, linkId, total) {
      // find the first (and the only one) item
      var item = null;

      if (parentItem.items) {
        for (var i = 0, iLen = parentItem.items.length; i < iLen; i++) {
          if (linkId === parentItem.items[i].linkId) {
            item = parentItem.items[i];
            break;
          }
        } // insert new items


        if (item) {
          while (total > 1) {
            var newItem = LForms.Util.deepCopy(item);
            parentItem.items.splice(i, 0, newItem);
            total -= 1;
          }
        }
      }
    },

    /**
     * Find a matching repeating item by item code and the index in the items array
     * @param parentItem a parent item
     * @param linkId linkId of a repeating (or non-repeating) item
     * @param index index of the item in the sub item array of the parent item
     * @returns {{}} a matching item
     * @private
     */
    _findTheMatchingItemByLinkIdAndIndex: function _findTheMatchingItemByLinkIdAndIndex(parentItem, linkId, index) {
      var item = null;
      var idx = 0;

      if (parentItem.items) {
        for (var i = 0, iLen = parentItem.items.length; i < iLen; i++) {
          if (linkId === parentItem.items[i].linkId) {
            if (idx === index) {
              item = parentItem.items[i];
              break;
            } else {
              idx += 1;
            }
          }
        }
      }

      return item;
    },

    /**
     * Find a matching repeating item by item code alone
     * When used on the LForms definition data object, there is no repeating items yet.
     * @param parentItem a parent item
     * @param linkId linkId of an item
     * @returns {{}} a matching item
     * @private
     */
    _findTheMatchingItemByLinkId: function _findTheMatchingItemByLinkId(parentItem, linkId) {
      var item = null;

      if (parentItem.items) {
        for (var i = 0, iLen = parentItem.items.length; i < iLen; i++) {
          if (linkId === parentItem.items[i].linkId) {
            item = parentItem.items[i];
            break;
          }
        }
      }

      return item;
    }
  };
}

/* harmony default export */ __webpack_exports__["default"] = (addSDCImportFns);

/***/ }),
/* 93 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _obs_prepop_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(94);
function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }


/**
 *  Defines SDC functions (used by both import and export, or for other
 *  SDC-related purposes) that are the same across the different FHIR versions.
 *  The function takes SDC namespace object defined in the sdc export code,
 *  and adds additional functions to it.
 */

function addCommonSDCFns(ns) {
  "use strict";

  var self = ns;
  self.requestLinkedObs = _obs_prepop_mjs__WEBPACK_IMPORTED_MODULE_0__["requestLinkedObs"]; // A mapping of data types of items from LHC-Forms to FHIR Questionnaire

  self._lformsTypesToFHIRTypes = {
    "SECTION": 'group',
    "TITLE": 'display',
    "ST": 'string',
    "BL": 'boolean',
    "REAL": 'decimal',
    "INT": 'integer',
    "DT": 'date',
    "DTM": 'dateTime',
    "TM": 'time',
    "TX": 'text',
    "URL": 'url',
    "CNE": 'choice',
    "CWE": 'open-choice',
    "QTY": 'quantity',
    "attachment": 'attachment'
  }; // A mapping from LHC-Forms data types to the partial field names of the value fields
  // and initial value fields in FHIR Questionnaire

  self._lformsTypesToFHIRFields = {
    "attachment": "Attachment",
    "INT": 'Integer',
    "REAL": 'Decimal',
    "DT": 'Date',
    "DTM": 'DateTime',
    "TM": 'Time',
    "ST": 'String',
    "TX": 'String',
    "BL": 'Boolean',
    "URL": 'Url',
    "CNE": 'Coding',
    "CWE": 'Coding',
    "QTY": 'Quantity'
  };
  self._operatorMapping = {
    'minExclusive': '>',
    'maxExclusive': '<',
    'minInclusive': '>=',
    'maxInclusive': '<=',
    'value': '=',
    'notEqual': '!=',
    '>': 'minExclusive',
    '<': 'maxExclusive',
    '>=': 'minInclusive',
    '<=': 'maxInclusive',
    '=': 'value',
    '!=': 'notEqual',
    'exists': 'exists'
  };
  /**
   * Check if a LForms item has repeating questions
   * @param item a LForms item
   * @returns {*|boolean}
   * @private
   */

  self._questionRepeats = function (item) {
    return item && item.questionCardinality && item.questionCardinality.max && (item.questionCardinality.max === "*" || parseInt(item.questionCardinality.max) > 1);
  };
  /**
   * Check if a LForms item has repeating answers
   * @param item a LForms item
   * @returns {*|boolean}
   * @private
   */


  self._answerRepeats = function (item) {
    return item && item.answerCardinality && item.answerCardinality.max && (item.answerCardinality.max === "*" || parseInt(item.answerCardinality.max) > 1);
  };
  /**
   * Do a shallow copy of specified fields from source to target.
   *
   * @param source - Source object
   * @param target - Target object
   * @param fieldList - Array of fields to copy from the source. If the field is
   * not found in the source, it is ignored.
   */


  self.copyFields = function (source, target, fieldList) {
    if (source && target && fieldList && fieldList.length > 0) {
      fieldList.forEach(function (field) {
        if (source.hasOwnProperty(field)) {
          target[field] = source[field];
        }
      });
    }
  }; // Store the UCUM code system URI


  self.UCUM_URI = 'http://unitsofmeasure.org';
  /**
   * Set the given key/value to the object if the value is not undefined, not null, and not an empty string.
   * @param obj the object to set the key/value on. It can be null/undefined, and if so, a new object will
   *        be created and returned (only if the value is valid).
   * @param key the key for the given value to be set to the given object, required.
   * @param value the value to be set to the given object using the given key.
   * @return if the input object is not null/undefined, it will be returned;
   *         if the input object is null/undefined:
   *         - return the given object as is if the value is invalid, or
   *         - a newly created object with the given key/value set.
   * @private
   */

  self._setIfHasValue = function (obj, key, value) {
    if (value !== undefined && value !== null && value !== '') {
      if (!obj) {
        obj = {};
      }

      obj[key] = value;
    }

    return obj;
  };
  /**
   * Copy between lforms trigger value coding and FHIR enableWhen valueCoding. It only copies 3 fields:
   * code, system, and display/text (called "text" in lforms, "display" in FHIR)
   * @param srcCoding the coding object to copy from
   * @param dstCoding the coding object to copy to, may be null/undefined, and if null/undefined, a new object
   *        will be created but only if the srcCoding has at least one of code, system, display/text
   * @param lforms2Fhir The direction of copying, can be true or false. The direction matters because in lforms,
   *        the text/display field is called "text", while in FHIR, it's called "display"
   * @return the resulting dstCoding object.
   * @private
   */


  self._copyTriggerCoding = function (srcCoding, dstCoding, lforms2Fhir) {
    var srcTextField = lforms2Fhir ? 'text' : 'display';
    var dstTextField = lforms2Fhir ? 'display' : 'text';
    dstCoding = self._setIfHasValue(dstCoding, 'code', srcCoding.code);
    dstCoding = self._setIfHasValue(dstCoding, 'system', srcCoding.system);
    dstCoding = self._setIfHasValue(dstCoding, dstTextField, srcCoding[srcTextField]);
    return dstCoding;
  };
  /**
   *  Returns true if the given item (or LFormsData) has an expression
   *  which needs to be re-evaluated when the user changes their response.
   * @param itemOrLFData the item or LFormsData to be checked.  It is assumed
   *  that the relevant extensions will be in an _fhirExt hash where
   *  the key is the URI of the extension and the values are arrays of the FHIR
   *  extension structure.
   */


  self.hasResponsiveExpression = function (itemOrLFData) {
    var ext = itemOrLFData._fhirExt;
    return ext ? !!(ext[self.fhirExtCalculatedExp] || ext[self.fhirExtAnswerExp] || ext[self.fhirExtEnableWhenExp]) : false;
  };
  /**
   *  Returns true if the given item has an expression
   *  which sets the list.
   * @param item the item to be checked.  It is assumed
   *  that the relevant extensions will be in an _fhirExt hash where
   *  the key is the URI of the extension and the values are arrays of the FHIR
   *  extension structure.
   */


  self.hasListExpression = function (item) {
    var ext = item._fhirExt; // This should one day include a check for cqf-expression, when we add
    // support for it

    return ext ? !!ext[self.fhirExtAnswerExp] : false;
  };
  /**
   *  Returns true if the given item (or LFormsData) has an expression
   *  which needs to be evaluated only once, when form is first rendered.
   * @param itemOrLFData the item or LFormsData to be checked.  It is assumed
   *  that the relevant extensions will be in an _fhirExt hash where
   *  the key is the URI of the extension and the values are arrays of the FHIR
   *  extension structure.
   */


  self.hasInitialExpression = function (itemOrLFData) {
    return !!(itemOrLFData._fhirExt && itemOrLFData._fhirExt[self.fhirExtInitialExp]);
  };
  /**
   *  Builds a map from extension URIs to arrays of the FHIR extension
   *  structures, and stores it on the item.  Also builds an array of all
   *  Expression extensions.
   *
   * @param itemOrLFData a form item or an LFormsData which possibly contain
   *  FHIR extensions (in an "extension" property).
   */


  self.buildExtensionMap = function (itemOrLFData) {
    // Initialize a map for testing whether an extension is an Expression extension.
    // The keys are the URIs, and the values are see to true.
    if (!self.isExpressionExtension) {
      self.isExpressionExtension = [self.fhirExtCalculatedExp, self.fhirExtInitialExp, self.fhirExtAnswerExp, self.fhirExtVariable, self.fhirExtEnableWhenExp].reduce(function (x, k) {
        x[k] = true;
        return x;
      }, {});
    }

    if (itemOrLFData.extension) {
      var m = {};
      var exprExtensions = [];

      var _iterator = _createForOfIteratorHelper(itemOrLFData.extension),
          _step;

      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var ext = _step.value;
          var extArray = m[ext.url];
          if (!extArray) extArray = m[ext.url] = [];
          extArray.push(ext);
          if (self.isExpressionExtension[ext.url]) exprExtensions.push(ext);
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }

      itemOrLFData._fhirExt = m;
      if (exprExtensions.length) itemOrLFData._exprExtensions = exprExtensions;
    }
  };
  /**
   *  Requests launchContext resources.  Assumes LForms.Util.setFHIRContext() has
   *  been called.
   * @param lfData a LFormsData object for the form.
   * @return an array of Promises which resolve when the attempt to load the
   *  resources has completed (succesful or not, they resolve without being
   *  rejected).
   */


  self.loadLaunchContext = function (lfData) {
    // launchContext
    var contextItems = LForms.Util.findObjectInArray(lfData.extension, 'url', self.fhirExtLaunchContext, 0, true); // Per https://jira.hl7.org/browse/FHIR-29664 (approved; not yet applied- // 2020-11-19).

    var validContexts = {
      patient: {
        Patient: 1
      },
      encounter: {
        Encounter: 1
      },
      user: {
        Patient: 1,
        Practitioner: 1,
        PractitionerRole: 1,
        RelatedPerson: 1
      },
      study: {
        Study: 1
      }
    };
    var supportedContextNames = {
      Patient: 1,
      User: 1,
      Encounter: 1
    };
    var pendingPromises = [];

    var _loop = function _loop() {
      var contextItemExt = contextItems[i].extension;
      var name = null,
          typeList = [];

      for (j = 0, jLen = contextItemExt.length; j < jLen; ++j) {
        fieldExt = contextItemExt[j];

        if (!name && fieldExt.url === 'name') {
          var nameCode = fieldExt.valueId;

          if (validContexts[nameCode]) {
            name = nameCode; // It is no longer necessary to check that the name is a valid
            // FHIR variable, because per
            // https://jira.hl7.org/browse/FHIR-29664, the values are now
            // constrained to a known list.  I am leaving the line below
            // comented out for reference in case that changes again.
            // lfData._checkFHIRVarName(name); // might throw
          } else {
            console.warn("A launch context of name " + nameCode + " was requested by the form, but the supported types are: " + Object.keys(validContexts).join(", "));
          }
        } else if (fieldExt.url === 'type') {
          // there can be more than one
          typeList.push(fieldExt.valueCode);
        }
      }

      if (name && typeList.length) {
        pendingPromises.push(new Promise(function (resolve, reject) {
          var contextResource = LForms.fhirContext[name];

          if (!contextResource.id) {
            console.warn('A launch context resource of name ' + name + ' was requested by the form, but none was available'); // The loading of this resource should not be critical for the
            // Questionnaire, because it is just for prepopulation.  Don't
            // reject the promise.

            resolve();
          } else {
            contextResource.read().then(function (resource) {
              if (resource) {
                var resType = resource.resourceType;

                if (typeList.indexOf(resType) == -1) {
                  console.warn("Could not retrieve a resource of the requested" + " types for launch context name " + name);
                } else {
                  // Validate the "type"
                  var validTypes = validContexts[name];

                  if (!validTypes[resType]) {
                    console.warn("A launch context resource of type " + resType + " was requested by the form, but the supported types for name " + name + " are: " + Object.keys(validTypes).join(", "));
                  } else {
                    lfData._fhirVariables[name] = resource;
                  }
                }
              }

              resolve();
            }, function fail(reason) {
              console.warn('A launch context of name ' + name + ' was requested, ' + 'but could not be read.');
              console.error(reason);
              resolve(); // per above, we are not rejecting the promise
            });
          }
        }));
      }
    };

    for (var i = 0, len = contextItems.length; i < len; ++i) {
      var j, jLen;
      var fieldExt;

      _loop();
    }

    return pendingPromises;
  };
}

/* harmony default export */ __webpack_exports__["default"] = (addCommonSDCFns);

/***/ }),
/* 94 */
/***/ (function(__webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "requestLinkedObs", function() { return requestLinkedObs; });
// A module for Observation-based pre-population.

/**
 *  Starts the (likely asynchronous) requests to retrieve linked Observation
 *  resources for pre-population.  When the resources have been retrieved,
 *  prepoluation will be performed.
 * @param lfData the LFormsData object for the form being prepopulated.
 * @return a promise resolving after the resources have been retrieved and
 *  any prepopulation has been performed.
 */
function requestLinkedObs(lfData) {
  if (LForms.fhirContext && lfData._fhir) {
    // We will need to know what version of FHIR the server is using.  Make
    // sure that is available before continuing.
    if (!LForms._serverFHIRReleaseID) {
      // Go fetch the server's FHIR version first before continuing
      return new Promise(function (resolve, reject) {
        LForms.Util.getServerFHIRReleaseID(function (relID) {
          if (!relID) reject("Unable to obtain the server's FHIR version");else resolve(requestLinkedObs(lfData));
        });
      });
    } else {
      var pendingPromises = [];
      LForms.Util.validateFHIRVersion(LForms._serverFHIRReleaseID);
      var serverFHIR = LForms.FHIR[LForms._serverFHIRReleaseID];
      var obsLinkURI = lfData._fhir.SDC.fhirExtObsLinkPeriod;

      var _loop = function _loop() {
        var item = lfData.itemList[i];
        var obsExt = item._fhirExt && item._fhirExt[obsLinkURI];

        if (obsExt) {
          // an array of at least 1 if present
          duration = obsExt[0].valueDuration; // optional

          fhirClient = LForms.fhirContext; // Get a comma separated list of codes

          var codeQuery = item.codeList.map(function (code) {
            var codeSystem = code.system === 'LOINC' ? serverFHIR.LOINC_URI : code.system;
            return [codeSystem, code.code].join('|');
          }).join(',');
          var queryParams = {
            code: codeQuery,
            _sort: '-date',
            status: 'final,amended,corrected',
            _count: 5 // only need one, but we need to filter out focus=true below

          }; // Temporarily disabling the addition of the focus search
          // parameter, because of support issues.  Instead, for now, we
          // will check the focus parameter when the Observation is
          // returned.  Later, we might query the server to find out whether
          // :missing is supported.
          //if (LForms._serverFHIRReleaseID != 'STU3') // STU3 does not know about "focus"
          //  queryParams.focus = {$missing: true}; // TBD -- sometimes :missing is not supported
          // Constrain the date range

          if (duration && duration.value && duration.code) {
            // Convert value to milliseconds
            result = LForms.ucumPkg.UcumLhcUtils.getInstance().convertUnitTo(duration.code, duration.value, 'ms');

            if (result.status === 'succeeded') {
              date = new Date(new Date() - result.toVal);
              queryParams.date = 'gt' + date.toISOString();
            }
          }

          pendingPromises.push(fhirClient.patient.request(lfData._buildURL(['Observation'], queryParams)).then(function (successData) {
            var bundle = successData;

            if (bundle.entry) {
              var foundObs;

              for (var j = 0, jLen = bundle.entry.length; j < jLen && !foundObs; ++j) {
                var obs = bundle.entry[j].resource;

                if (!obs.focus) {
                  // in case we couldn't use focus:missing above
                  serverFHIR.SDC.importObsValue(item, obs);

                  if (item.value) {
                    // obs.value[x] could be missing
                    foundObs = true;
                    if (item.unit) lfData._setUnitDisplay(item.unit);
                  }
                }
              }
            }

            return item.questionCode; // code is not needed, but useful for debugging
          }));
        }
      };

      for (var i = 0, len = lfData.itemList.length; i < len; ++i) {
        var duration;
        var fhirClient;
        var result;
        var date;

        _loop();
      }

      return Promise.all(pendingPromises);
    }
  }
}
;

/***/ }),
/* 95 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var LForms = __webpack_require__(87);
/**
 *  Defines SDC import functions that are the same across the different FHIR
 *  versions.  The function takes SDC namespace object defined in the sdc export
 *  code, and adds additional functions to it.
 */


function addCommonSDCImportFns(ns) {
  "use strict";

  var self = ns; // FHIR extension urls

  self.fhirExtUrlCardinalityMin = "http://hl7.org/fhir/StructureDefinition/questionnaire-minOccurs";
  self.fhirExtUrlCardinalityMax = "http://hl7.org/fhir/StructureDefinition/questionnaire-maxOccurs";
  self.fhirExtUrlItemControl = "http://hl7.org/fhir/StructureDefinition/questionnaire-itemControl";
  self.fhirExtUrlUnit = "http://hl7.org/fhir/StructureDefinition/questionnaire-unit";
  self.fhirExtUrlUnitOption = "http://hl7.org/fhir/StructureDefinition/questionnaire-unitOption";
  self.fhirExtUrlOptionPrefix = "http://hl7.org/fhir/StructureDefinition/questionnaire-optionPrefix";
  self.fhirExtVariable = "http://hl7.org/fhir/StructureDefinition/variable";
  self.fhirExtUrlMinValue = "http://hl7.org/fhir/StructureDefinition/minValue";
  self.fhirExtUrlMaxValue = "http://hl7.org/fhir/StructureDefinition/maxValue";
  self.fhirExtUrlMinLength = "http://hl7.org/fhir/StructureDefinition/minLength";
  self.fhirExtUrlRegex = "http://hl7.org/fhir/StructureDefinition/regex";
  self.fhirExtUrlAnswerRepeats = "http://hl7.org/fhir/StructureDefinition/questionnaire-answerRepeats";
  self.fhirExtUrlExternallyDefined = "http://hl7.org/fhir/StructureDefinition/questionnaire-externallydefined";
  self.argonautExtUrlExtensionScore = "http://fhir.org/guides/argonaut-questionnaire/StructureDefinition/extension-score";
  self.fhirExtUrlHidden = "http://hl7.org/fhir/StructureDefinition/questionnaire-hidden";
  self.fhirExtTerminologyServer = "http://hl7.org/fhir/StructureDefinition/terminology-server";
  self.fhirExtUrlDataControl = "http://lhcforms.nlm.nih.gov/fhirExt/dataControl";
  self.fhirExtCalculatedExp = "http://hl7.org/fhir/uv/sdc/StructureDefinition/sdc-questionnaire-calculatedExpression";
  self.fhirExtInitialExp = "http://hl7.org/fhir/uv/sdc/StructureDefinition/sdc-questionnaire-initialExpression";
  self.fhirExtObsLinkPeriod = "http://hl7.org/fhir/uv/sdc/StructureDefinition/sdc-questionnaire-observationLinkPeriod";
  self.fhirExtObsExtract = 'http://hl7.org/fhir/uv/sdc/StructureDefinition/sdc-questionnaire-observationExtract';
  self.fhirExtAnswerExp = "http://hl7.org/fhir/uv/sdc/StructureDefinition/sdc-questionnaire-answerExpression";
  self.fhirExtEnableWhenExp = "http://hl7.org/fhir/uv/sdc/StructureDefinition/sdc-questionnaire-enableWhenExpression";
  self.fhirExtChoiceOrientation = "http://hl7.org/fhir/StructureDefinition/questionnaire-choiceOrientation";
  self.fhirExtLaunchContext = "http://hl7.org/fhir/uv/sdc/StructureDefinition/sdc-questionnaire-launchContext";
  self.fhirExtMaxSize = "http://hl7.org/fhir/StructureDefinition/maxSize";
  self.fhirExtMimeType = "http://hl7.org/fhir/StructureDefinition/mimeType";
  self.fhirExtUrlRestrictionArray = [self.fhirExtUrlMinValue, self.fhirExtUrlMaxValue, self.fhirExtUrlMinLength, self.fhirExtUrlRegex]; // One way or the other, the following extensions are converted to lforms internal fields.
  // Any extensions not listed here (there are many) are recognized as lforms extensions as they are.

  self.handledExtensionSet = new Set([self.fhirExtUrlCardinalityMin, self.fhirExtUrlCardinalityMax, self.fhirExtUrlItemControl, self.fhirExtUrlUnit, self.fhirExtUrlUnitOption, self.fhirExtUrlOptionPrefix, self.fhirExtUrlMinValue, self.fhirExtUrlMaxValue, self.fhirExtUrlMinLength, self.fhirExtUrlRegex, self.fhirExtUrlAnswerRepeats, self.fhirExtUrlExternallyDefined, self.argonautExtUrlExtensionScore, self.fhirExtUrlHidden, self.fhirExtTerminologyServer, self.fhirExtUrlDataControl, self.fhirExtChoiceOrientation]); // Simple functions for mapping extensions to properties in the internal structure.
  // Parameters:
  //   extension: the FHIR extension object
  //   item:  The LForms item to be updated
  // Returns:  true if the extension should still be added to the LForms item
  //   extension array, and false/undefined otherwise.
  //

  self.extensionHandlers = {};

  self.extensionHandlers[self.fhirExtMaxSize] = function (extension, item) {
    item.maxAttachmentSize = extension.valueDecimal || extension.valueInteger; // not sure why it is decimal
  };

  self.extensionHandlers[self.fhirExtMimeType] = function (extension, item) {
    item.allowedAttachmentTypes || (item.allowedAttachmentTypes = []);
    item.allowedAttachmentTypes.push(extension.valueCode);
  };

  self.extensionHandlers["http://hl7.org/fhir/StructureDefinition/questionnaire-initialExpression"] = function (extension, item) {
    // Update the URI to the current one.
    extension.url = 'http://hl7.org/fhir/uv/sdc/StructureDefinition/sdc-questionnaire-initialExpression';
    return true; // add extension to LForms item
  };

  self.formLevelFields = [// Resource
  'id', 'meta', 'implicitRules', 'language', // Domain Resource
  'text', 'contained', 'extension', 'modifiedExtension', // Questionnaire
  'date', 'version', 'identifier', 'code', // code in FHIR clashes with previous definition in lforms. It needs special handling.
  'subjectType', 'derivedFrom', // New in R4
  'status', 'experimental', 'publisher', 'contact', 'description', 'useContext', 'jurisdiction', 'purpose', 'copyright', 'approvalDate', 'reviewDate', 'effectivePeriod', 'url'];
  self.itemLevelIgnoredFields = ['definition'];
  /**
   * Convert FHIR SQC Questionnaire to LForms definition
   *
   * @param fhirData - FHIR Questionnaire object
   * @returns {{}} - LForms json object
   */

  self.convertQuestionnaireToLForms = function (fhirData) {
    var target = null;

    if (fhirData) {
      target = LForms.Util.baseFormDef();

      self._processFormLevelFields(target, fhirData);

      var containedVS = self._extractContainedVS(fhirData);

      if (fhirData.item && fhirData.item.length > 0) {
        var linkIdItemMap = self._createLinkIdItemMap(fhirData);

        target.items = [];

        for (var i = 0; i < fhirData.item.length; i++) {
          var item = self._processQuestionnaireItem(fhirData.item[i], containedVS, linkIdItemMap); // no instructions on the questionnaire level


          target.items.push(item);
        }
      }

      target.fhirVersion = self.fhirVersion;
    }

    return target;
  };
  /**
   * Parse form level fields from FHIR questionnaire and assign to LForms object.
   *
   * @param lfData - LForms object to assign the extracted fields
   * @param questionnaire - FHIR questionnaire resource object to parse for the fields.
   * @private
   */


  self._processFormLevelFields = function (lfData, questionnaire) {
    self.copyFields(questionnaire, lfData, self.formLevelFields); // Handle title and name.  In LForms, "name" is the "title", but FHIR
    // defines both.

    lfData.shortName = questionnaire.name; // computer friendly

    lfData.name = questionnaire.title; // Handle extensions on title

    if (questionnaire._title) lfData.obj_title = questionnaire._title; // For backward compatibility, we keep lforms.code as it is, and use lforms.codeList
    // for storing questionnaire.code. While exporting, merge lforms.code and lforms.codeList
    // into questionnaire.code. While importing, convert first of questionnaire.code
    // as lforms.code, and copy questionnaire.code to lforms.codeList.

    if (questionnaire.code) {
      // Rename questionnaire code to codeList
      lfData.codeList = questionnaire.code;
    }

    var codeAndSystemObj = self._getCode(questionnaire);

    if (codeAndSystemObj) {
      lfData.code = codeAndSystemObj.code;
      lfData.codeSystem = codeAndSystemObj.system;
    }
  };
  /**
   *  Returns the number of sinificant digits in the number after, ignoring
   *  trailing zeros.  (I am including this on "self" so we can have tests for it.)
   */


  self._significantDigits = function (x) {
    // Based on https://stackoverflow.com/a/9539746/360782
    // Make sure it is a number and use the builtin number -> string.
    var s = "" + +x; // The following RegExp include the exponent, which we don't need
    //var match = /(\d+)(?:\.(\d+))?(?:[eE]([+-]?\d+))?$/.exec(s);

    var match = /(\d+)(?:\.(\d+))?/.exec(s); // NaN or Infinity or integer.
    // We arbitrarily decide that Infinity is integral.

    if (!match) {
      return 0;
    }

    var wholeNum = match[1];
    var fraction = match[2]; //var exponent = match[3];

    return wholeNum === '0' ? 0 : wholeNum.length + (fraction ? fraction.length : 0);
  };
  /**
   *  Imports an observation's values into the given LForms item.
   * @param lfItem the LForms item to which a value will be assigned.
   * @param obs the observation whose value will be assigned to lfItem.  It
   *  assumed that obs has an appropriate data type for its value.
   */


  self.importObsValue = function (lfItem, obs) {
    // Get the value from obs, based on lfItem's data type.  (The altertnative
    // seems to be looping through the keys on obs looking for something that
    // starts with "value".
    var val = null;
    var lfDataType = lfItem.dataType;
    var fhirValType = this._lformsTypesToFHIRFields[lfDataType]; // fhirValType is now the FHIR data type for a Questionnaire.  However,
    // where Questionnaire uses Coding, Observation uses CodeableConcept.

    if (fhirValType === 'Coding') fhirValType = 'CodeableConcept';
    if (fhirValType) val = obs['value' + fhirValType];

    if (!val && (lfDataType === 'REAL' || lfDataType === 'INT')) {
      // Accept initial value of type Quantity for these types.
      val = obs.valueQuantity;
      if (val) val._type = 'Quantity';
    }

    if (val) {
      if (!val._type && _typeof(val) === 'object') val._type = fhirValType; // Before importing, confirm val contains a valid unit from the
      // item's unit list.

      var unitOkay = true;

      if (val._type === 'Quantity') {
        if (lfItem.units) {
          var matchingUnit;
          var valSystem = val.system; // On SMART sandbox, val.system might have a trailing slash (which is wrong, at least
          // for UCUM).  For now, just remove it.

          if (valSystem && valSystem[valSystem.length - 1] === '/') valSystem = valSystem.slice(0, -1);
          var isUCUMUnit = valSystem === self.UCUM_URI;
          var ucumUnit;

          for (var i = 0, len = lfItem.units.length; i < len && !matchingUnit; ++i) {
            var lfUnit = lfItem.units[i];

            if (lfUnit.system && lfUnit.system === valSystem && lfUnit.code === val.code || !lfUnit.system && lfUnit.name === val.unit) {
              matchingUnit = lfUnit;
            }

            if (isUCUMUnit && !matchingUnit && !ucumUnit && lfUnit.system === self.UCUM_URI) ucumUnit = lfUnit;
          }

          if (!matchingUnit && ucumUnit) {
            // See if we can convert to the ucumUnit we found
            var result = LForms.ucumPkg.UcumLhcUtils.getInstance().convertUnitTo(val.code, val.value, ucumUnit.code);

            if (result.status === 'succeeded') {
              matchingUnit = ucumUnit; // Round the result to the same number of significant digits as the
              // input value.

              var originalSD = this._significantDigits(val.value);

              if (originalSD > 0) val.value = parseFloat(result.toVal.toPrecision(originalSD));else val.value = result.toVal;
              val.code = ucumUnit.code;
            }
          }

          if (!matchingUnit) unitOkay = false;else lfItem.unit = matchingUnit;
        }
      }

      if (unitOkay) {
        this._processFHIRValues(lfItem, [val]);
      }
    }
  };
  /**
   *   Assigns FHIR values to an LForms item.
   *  @param lfItem the LForms item to receive the values from fhirVals
   *  @param fhirVals an array of FHIR values (e.g.  Quantity, Coding, string, etc.).
   *   Complex types like Quantity should have _type set to the type, if
   *   possible, or an attempt will be made to guess the FHIR type from the
   *   lfItem's data type.
   *  @param setDefault if true, the default value in lfItem will be set instead
   *   of the value.
   */


  self._processFHIRValues = function (lfItem, fhirVals, setDefault) {
    var lfDataType = lfItem.dataType;
    var isMultiple = lfItem.answerCardinality && lfItem.answerCardinality.max === '*';
    var answers = [];

    for (var i = 0, len = fhirVals.length; i < len; ++i) {
      var fhirVal = fhirVals[i];
      var answer = null;

      if (lfDataType === 'CWE' || lfDataType === 'CNE') {
        var codings = null;

        if (fhirVal._type === 'CodeableConcept') {
          codings = fhirVal.coding;
        } else if (fhirVal._type === 'Coding' || _typeof(fhirVal) === 'object') {
          codings = [fhirVal];
        }

        if (!codings) {
          // the value or the default value could be a string for 'open-choice'/CWE
          if (lfDataType === 'CWE') {
            answer = fhirVal;
          }
        } else {
          // Pick a Coding that is appropriate for this list item.
          if (lfItem.answers) {
            var itemAnswers = lfItem._modifiedAnswers || lfItem.answers; // _modified contains _displayText

            for (var k = 0, kLen = codings.length; k < kLen && !answer; ++k) {
              var coding = codings[k];

              for (var j = 0, jLen = itemAnswers.length; j < jLen && !answer; ++j) {
                var listAnswer = itemAnswers[j];
                var listAnswerSystem = listAnswer.system ? LForms.Util.getCodeSystem(listAnswer.system) : null;

                if ((!coding.system && !listAnswerSystem || coding.system === listAnswerSystem) && (coding.hasOwnProperty('code') && listAnswer.hasOwnProperty('code') && coding.code === listAnswer.code || coding.hasOwnProperty('display') && listAnswer.hasOwnProperty('text') && coding.display === listAnswer.text)) {
                  answer = itemAnswers[j]; // include label in answer text
                }
              }
            }
          }
        }
      } else if (fhirVal._type === 'Quantity' && (lfDataType === 'QTY' || lfDataType === 'REAL' || lfDataType === 'INT')) {
        if (fhirVal.value !== undefined) {
          answer = fhirVal.value; // Associated unit is parsed in _processUnitLists
        }
      } // For date types, convert them to date objects, but only for values.
      // If we're setting defaultAnswer, leave them as strings.
      else if (!setDefault && lfItem.dataType === 'DTM' && typeof fhirVal === 'string') answer = new Date(fhirVal);else if (!setDefault && lfItem.dataType === 'DT' && typeof fhirVal === 'string') answer = LForms.Util.stringToDTDateISO(fhirVal);else {
          answer = fhirVal;
        }

      if (answer !== undefined) answers.push(answer);
    }

    if (isMultiple) {
      if (setDefault) lfItem.defaultAnswer = answers;else lfItem.value = answers;
    } else {
      // there should just be one answer
      if (setDefault) lfItem.defaultAnswer = answers[0];else lfItem.value = answers[0];
    }
  };
  /**
   * Get a FHIR value from an object given a partial string of hash key.
   * Use it where at most only one key matches.
   *
   * @param obj {object} - Object to search
   * @param keyRegex {regex} - Regular expression to match a key.  This should
   *  be the beginning part of the key up to the type (e.g., /^value/, to match
   *  "valueQuantity").
   * @returns {*} - Corresponding value of matching key.  For complex types,
   *  such as Quantity, the type of the returned object will be present under
   *  a _type attribute.
   * @private
   */


  self._getFHIRValueWithPrefixKey = function (obj, keyRegex) {
    var ret = null;

    if (_typeof(obj) === 'object') {
      for (var key in obj) {
        var matchData = key.match(keyRegex);

        if (matchData) {
          ret = obj[key];

          if (ret && _typeof(ret) === 'object') {
            ret = LForms.Util.deepCopy(ret); // Work with clone

            ret._type = key.substring(matchData[0].length);
          }

          break;
        }
      }
    }

    return ret;
  };
  /**
   *  Process the text and prefix data.
   * @param lfItem {object} - LForms item object to receive the data
   * @param qItem {object} - Questionnaire item object (as the source)
   */


  self._processTextAndPrefix = function (lfItem, qItem) {
    // prefix
    if (qItem.prefix) lfItem.prefix = qItem.prefix; // text

    lfItem.question = qItem.text; // Copy item extensions

    for (var _i = 0, _arr = ['_prefix', '_text']; _i < _arr.length; _i++) {
      var extField = _arr[_i];
      var extFieldData = qItem[extField];
      if (extFieldData) lfItem['obj' + extField] = extFieldData;
    }
  };
  /**
   * Parse questionnaire item for code and code system
   * @param lfItem {object} - LForms item object to assign question code
   * @param qItem {object} - Questionnaire item object
   * @private
   */


  self._processCodeAndLinkId = function (lfItem, qItem) {
    if (qItem.code) {
      lfItem.codeList = qItem.code;
    }

    var code = self._getCode(qItem);

    if (code) {
      lfItem.questionCode = code.code;
      lfItem.questionCodeSystem = code.system;
    } // use linkId as questionCode, which should not be exported as code
    else {
        lfItem.questionCode = qItem.linkId;
        lfItem.questionCodeSystem = "LinkId";
      }

    lfItem.linkId = qItem.linkId;
  };
  /**
   * Parse questionnaire item for question cardinality and answer cardinality
   *
   * @param lfItem {object} - LForms item object to assign question cardinality
   * @param qItem {object} - Questionnaire item object
   * @private
   */


  self._processFHIRQuestionAndAnswerCardinality = function (lfItem, qItem) {
    var min = LForms.Util.findObjectInArray(qItem.extension, 'url', self.fhirExtUrlCardinalityMin);
    var max = LForms.Util.findObjectInArray(qItem.extension, 'url', self.fhirExtUrlCardinalityMax);
    var repeats = qItem.repeats;
    var required = qItem.required;
    var answerCardinality, questionCardinality; // CNE/CWE, repeats handled by autocompleter with multiple answers in one question

    if (lfItem.dataType === 'CNE' || lfItem.dataType === 'CWE') {
      if (repeats) {
        answerCardinality = max ? {
          max: max.valueInteger.toString()
        } : {
          max: "*"
        };
      } else {
        answerCardinality = {
          max: "1"
        };
      }

      if (required) {
        answerCardinality.min = min ? min.valueInteger.toString() : "1";
      } else {
        answerCardinality.min = "0";
      }
    } // not CNE/CWE, question repeats
    else {
        // repeats
        if (repeats) {
          questionCardinality = max ? {
            max: max.valueInteger.toString()
          } : {
            max: "*"
          };
        } else {
          questionCardinality = {
            max: "1"
          };
        } // required


        if (required) {
          questionCardinality.min = min ? min.valueInteger.toString() : "1";
          answerCardinality = {
            min: "1"
          };
        } else {
          questionCardinality.min = "1";
        }
      }

    if (questionCardinality) lfItem.questionCardinality = questionCardinality;
    if (answerCardinality) lfItem.answerCardinality = answerCardinality;
  };
  /**
   * Parse questionnaire item for units list
   *
   * @param lfItem {object} - LForms item object to assign units
   * @param qItem {object} - Questionnaire item object
   * @private
   */


  self._processUnitList = function (lfItem, qItem) {
    var lformsUnits = [];
    var lformsDefaultUnit = null; // The questionnaire-unitOption extension is only for item.type = quantity

    var unitOption = LForms.Util.findObjectInArray(qItem.extension, 'url', self.fhirExtUrlUnitOption, 0, true);

    if (unitOption && unitOption.length > 0) {
      if (qItem.type !== 'quantity') {
        throw new Error('The extension ' + self.fhirExtUrlUnitOption + ' can only be used with type quantity.  Question "' + qItem.text + '" is of type ' + qItem.type);
      }

      for (var i = 0; i < unitOption.length; i++) {
        var coding = unitOption[i].valueCoding;
        var lUnit = {
          name: coding.display,
          code: coding.code,
          system: coding.system
        };
        lformsUnits.push(lUnit);
      }
    } // The questionnaire-unit extension is only for item.type = integer or decimal


    var unit = LForms.Util.findObjectInArray(qItem.extension, 'url', self.fhirExtUrlUnit);

    if (unit) {
      if (qItem.type !== 'integer' && qItem.type !== 'decimal') {
        throw new Error('The extension ' + self.fhirExtUrlUnit + ' can only be used with types integer or decimal.  Question "' + qItem.text + '" is of type ' + qItem.type);
      }

      lformsDefaultUnit = {
        name: unit.valueCoding.display,
        code: unit.valueCoding.code,
        system: unit.valueCoding.system,
        default: true
      };
      lformsUnits.push(lformsDefaultUnit);
    }

    if (qItem.type === 'quantity') {
      var initialQ = this.getFirstInitialQuantity(qItem);

      if (initialQ && initialQ.unit) {
        lformsDefaultUnit = LForms.Util.findItem(lformsUnits, 'name', initialQ.unit);

        if (lformsDefaultUnit) {
          lformsDefaultUnit.default = true;
        } else {
          lformsDefaultUnit = {
            name: initialQ.unit,
            code: initialQ.code,
            system: initialQ.system,
            default: true
          };
          lformsUnits.push(lformsDefaultUnit);
        }
      }
    }

    if (lformsUnits.length > 0) {
      if (!lformsDefaultUnit) {
        lformsUnits[0].default = true;
      }

      lfItem.units = lformsUnits;
    }
  };
  /**
   * Parse questionnaire item for display control
   *
   * @param lfItem {object} - LForms item object to assign display control
   * @param qItem {object} - Questionnaire item object
   * @private
   */


  self._processDisplayControl = function (lfItem, qItem) {
    var itemControlType = LForms.Util.findObjectInArray(qItem.extension, 'url', self.fhirExtUrlItemControl);

    if (itemControlType) {
      var displayControl = {};

      switch (itemControlType.valueCodeableConcept.coding[0].code) {
        case 'Lookup': // backward-compatibility with old export

        case 'Combo-box': // backward-compatibility with old export

        case 'autocomplete':
          lfItem.isSearchAutocomplete = true;
        // continue to drop-down case

        case 'drop-down':
          displayControl.answerLayout = {
            type: 'COMBO_BOX'
          };
          break;

        case 'Checkbox': // backward-compatibility with old export

        case 'check-box':
        case 'Radio': // backward-compatibility with old export

        case 'radio-button':
          displayControl.answerLayout = {
            type: 'RADIO_CHECKBOX'
          };
          var answerChoiceOrientation = LForms.Util.findObjectInArray(qItem.extension, 'url', self.fhirExtChoiceOrientation);

          if (answerChoiceOrientation) {
            if (answerChoiceOrientation.valueCode === "vertical") {
              displayControl.answerLayout.columns = "1";
            } else if (answerChoiceOrientation.valueCode === "horizontal") {
              displayControl.answerLayout.columns = "0";
            }
          }

          break;

        case 'Table': // backward-compatibility with old export

        case 'gtable':
          // Not in STU3, but we'll accept it
          if (lfItem.dataType === 'SECTION') {
            displayControl.questionLayout = "horizontal";
          }

          break;

        case 'Matrix': // backward-compatibility with old export

        case 'table':
          if (lfItem.dataType === 'SECTION') {
            displayControl.questionLayout = "matrix";
          }

          break;

        default:
          displayControl = null;
      }

      if (displayControl && !jQuery.isEmptyObject(displayControl)) {
        lfItem.displayControl = displayControl;
      }
    }
  };
  /**
   * Parse questionnaire item for data control
   *
   * @param lfItem {object} - LForms item object to assign data control
   * @param qItem {object} - Questionnaire item object
   * @private
   */


  self._processDataControl = function (lfItem, qItem) {
    var dataControlType = LForms.Util.findObjectInArray(qItem.extension, 'url', self.fhirExtUrlDataControl);

    if (dataControlType && dataControlType.valueString) {
      try {
        var dataControl = JSON.parse(dataControlType.valueString);

        if (dataControl) {
          lfItem.dataControl = dataControl;
        }
      } catch (e) {
        console.log("Invalid dataControl data!");
      }
    }
  }; // ---------------- QuestionnaireResponse Import ---------------


  var qrImport = self._mergeQR;
  /**
   * Merge a QuestionnaireResponse instance into an LForms form object
   * @param formData an LForms form definition or LFormsData object.
   * @param qr a QuestionnaireResponse instance
   * @returns {{}} an updated LForms form definition, with answer data
   */

  qrImport.mergeQuestionnaireResponseToLForms = function (formData, qr) {
    if (!(formData instanceof LForms.LFormsData)) {
      // get the default settings in case they are missing in the form data
      // not to set item values by default values for saved forms with user data
      formData.hasSavedData = true;
      formData = new LForms.LFormsData(formData).getFormData();
    } // The reference to _mergeQR below is here because this function gets copied to
    // the containing object to be a part of the public API.


    var qrInfo = qrImport._getQRStructure(qr);

    qrImport._processQRItemAndLFormsItem(qrInfo, formData);

    return formData;
  };
  /**
   * Merge data into items on the same level
   * @param parentQRItemInfo structural information of a parent item
   * @param parentLFormsItem a parent item, could be a LForms form object or a form item object.
   * @private
   */


  qrImport._processQRItemAndLFormsItem = function (parentQRItemInfo, parentLFormsItem) {
    // note: parentQRItemInfo.qrItemInfo.length will increase when new data is inserted into the array
    for (var i = 0; i < parentQRItemInfo.qrItemsInfo.length; i++) {
      var qrItemInfo = parentQRItemInfo.qrItemsInfo[i];
      var qrItem = qrItemInfo.item;

      if (qrItem) {
        // first repeating qrItem
        if (qrItemInfo.total > 1 && qrItemInfo.index === 0) {
          var defItem = this._findTheMatchingItemByLinkId(parentLFormsItem, qrItemInfo.linkId); // add repeating items in form data
          // if it is a case of repeating questions, not repeating answers


          if (ns._questionRepeats(defItem)) {
            this._addRepeatingItems(parentLFormsItem, qrItemInfo.linkId, qrItemInfo.total); // add missing qrItemInfo nodes for the newly added repeating LForms items (questions, not sections)


            if (defItem.dataType !== 'SECTION' && defItem.dataType !== 'TITLE') {
              for (var j = 1; j < qrItemInfo.total; j++) {
                var newQRItemInfo = LForms.Util.deepCopy(qrItemInfo);
                newQRItemInfo.index = j;
                newQRItemInfo.item.answer = [newQRItemInfo.item.answer[j]];

                if (qrItemInfo.qrAnswersItemsInfo && qrItemInfo.qrAnswersItemsInfo[j]) {
                  newQRItemInfo.qrAnswersItemsInfo = [qrItemInfo.qrAnswersItemsInfo[j]];
                }

                parentQRItemInfo.qrItemsInfo.splice(i + j, 0, newQRItemInfo);
              } // change the first qr item's answer too


              qrItemInfo.item.answer = [qrItemInfo.item.answer[0]];

              if (qrItemInfo.qrAnswersItemsInfo && qrItemInfo.qrAnswersItemsInfo[0]) {
                qrItemInfo.qrAnswersItemsInfo = [qrItemInfo.qrAnswersItemsInfo[0]];
              } else {
                delete qrItemInfo.qrAnswersItemsInfo;
              }
            }
          } // reset the total number of questions when it is the answers that repeats
          else if (ns._answerRepeats(defItem)) {
              qrItemInfo.total = 1;
            }
        } // find the matching LForms item


        var item = this._findTheMatchingItemByLinkIdAndIndex(parentLFormsItem, qrItemInfo.linkId, qrItemInfo.index); // set up value and units if it is a question


        if (item.dataType !== 'SECTION' && item.dataType !== 'TITLE') {
          var qrAnswer = qrItem.answer;

          if (qrAnswer && qrAnswer.length > 0) {
            this._setupItemValueAndUnit(qrItem.linkId, qrAnswer, item); // process item.answer.item, if applicable


            if (qrItemInfo.qrAnswersItemsInfo) {
              // _setupItemValueAndUnit seems to assume single-answer except for multiple choices on CNE/CWE
              // moreover, each answer has already got its own item above if question repeats
              if (qrItemInfo.qrAnswersItemsInfo.length > 1) {
                throw new Error('item.answer.item with item.answer.length > 1 is not yet supported');
              }

              this._processQRItemAndLFormsItem(qrItemInfo.qrAnswersItemsInfo[0], item);
            }
          }
        } // process items on the sub-level


        if (qrItemInfo.qrItemsInfo && qrItemInfo.qrItemsInfo.length > 0) {
          this._processQRItemAndLFormsItem(qrItemInfo, item);
        }
      }
    }
  };
  /**
   * Set value and units on a LForms item
   * @param linkId an item's linkId
   * @param answer value for the item
   * @param item a LForms item
   * @private
   */


  qrImport._setupItemValueAndUnit = function (linkId, answer, item) {
    if (item && linkId === item.linkId && item.dataType !== 'SECTION' && item.dataType !== 'TITLE') {
      var dataType = item.dataType; // any one has a unit must be a numerical type, let use REAL for now.
      // dataType conversion should be handled when panel data are added to lforms-service.

      if ((!dataType || dataType === "ST") && item.units && item.units.length > 0) {
        item.dataType = dataType = "REAL";
      }

      var qrValue = answer[0];

      switch (dataType) {
        case "BL":
          if (qrValue.valueBoolean === true || qrValue.valueBoolean === false) {
            item.value = qrValue.valueBoolean;
          }

          break;

        case "INT":
          if (qrValue.valueQuantity) {
            item.value = qrValue.valueQuantity.value;

            if (qrValue.valueQuantity.code) {
              item.unit = {
                name: qrValue.valueQuantity.code
              };
            }
          } else if (qrValue.valueInteger) {
            item.value = qrValue.valueInteger;
          }

          break;

        case "REAL":
        case "QTY":
          if (qrValue.valueQuantity) {
            item.value = qrValue.valueQuantity.value;

            if (qrValue.valueQuantity.code) {
              item.unit = {
                name: qrValue.valueQuantity.code
              };
            }
          } else if (qrValue.valueDecimal) {
            item.value = qrValue.valueDecimal;
          }

          break;

        case "DT":
          item.value = qrValue.valueDate;
          break;

        case "DTM":
          item.value = qrValue.valueDateTime;
          break;

        case "CNE":
        case "CWE":
          if (ns._answerRepeats(item)) {
            var value = [];

            for (var j = 0, jLen = answer.length; j < jLen; j++) {
              var val = ns._processCWECNEValueInQR(answer[j]);

              if (val) {
                value.push(val);
              }
            }

            item.value = value;
          } else {
            var val = ns._processCWECNEValueInQR(qrValue);

            if (val) {
              item.value = val;
            }
          }

          break;

        case "ST":
        case "TX":
          item.value = qrValue.valueString;
          break;

        case "attachment":
          item.value = qrValue.valueAttachment;
          break;

        case "SECTION":
        case "TITLE":
        case "":
          // do nothing
          break;

        default:
          item.value = qrValue.valueString;
      }
    }
  };
  /**
   * Get LForms data type from questionnaire item
   *
   * @param qItem {object} - Questionnaire item object
   * @private
   */


  self._getDataType = function (qItem) {
    var type = 'string';

    switch (qItem.type) {
      case 'string':
        type = 'ST';
        break;

      case 'group':
        type = 'SECTION';
        break;

      case "choice":
        type = 'CNE';
        break;

      case "open-choice":
        type = 'CWE';
        break;

      case 'integer':
        type = 'INT';
        break;

      case 'decimal':
        type = 'REAL';
        break;

      case 'text':
        type = 'TX';
        break;

      case "boolean":
        type = 'BL';
        break;

      case "date":
        //dataType = 'date';
        type = 'DT';
        break;

      case "dateTime":
        type = 'DTM';
        break;

      case "time":
        type = 'TM';
        break;

      case "display":
        type = 'TITLE';
        break;

      case "url":
        type = 'URL';
        break;

      case "quantity":
        type = 'QTY';
        break;

      case "attachment":
        type = 'attachment';
        break;
    }

    return type;
  };
  /**
   * Build a map of items to linkid from a questionnaire resource.
   * @param qResource - FHIR Questionnaire resource
   * @returns {*} - Hash object with link id keys pointing to their respective items.
   * @private
   */


  self._createLinkIdItemMap = function (qResource) {
    var traverse = function traverse(itemArray, collection) {
      itemArray.forEach(function (item) {
        collection[item.linkId] = item;

        if (item.item) {
          traverse(item.item, collection);
        }
      });
      return collection;
    };

    var ret = {};

    if (qResource.item) {
      ret = traverse(qResource.item, ret);
    }

    return ret;
  };
  /**
   * Get an object with code and code system
   *
   * @param questionnaireItemOrResource {object} - question
   * @private
   */


  self._getCode = function (questionnaireItemOrResource) {
    var code = null;

    if (questionnaireItemOrResource && Array.isArray(questionnaireItemOrResource.code) && questionnaireItemOrResource.code.length) {
      code = {
        code: questionnaireItemOrResource.code[0].code,
        system: self._toLfCodeSystem(questionnaireItemOrResource.code[0].system)
      };
    } // If code is missing look for identifier.
    else if (questionnaireItemOrResource && Array.isArray(questionnaireItemOrResource.identifier) && questionnaireItemOrResource.identifier.length) {
        code = {
          code: questionnaireItemOrResource.identifier[0].value,
          system: self._toLfCodeSystem(questionnaireItemOrResource.identifier[0].system)
        };
      }

    return code;
  };
  /**
   *  Converts the given ValueSet into an array of answers that can be used with a prefetch autocompleter.
   * @return the array of answers, or null if the extraction cannot be done.
   */


  self.answersFromVS = function (valueSet) {
    var vs = valueSet;
    var rtn = [];

    if (vs.expansion && vs.expansion.contains && vs.expansion.contains.length > 0) {
      vs.expansion.contains.forEach(function (vsItem) {
        var answer = {
          code: vsItem.code,
          text: vsItem.display,
          system: vsItem.system
        };
        var ordExt = LForms.Util.findObjectInArray(vsItem.extension, 'url', self.fhirExtUrlValueSetScore);

        if (ordExt) {
          answer.score = ordExt.valueDecimal;
        }

        rtn.push(answer);
      });
    }

    return rtn.length > 0 ? rtn : null;
  };
  /**
   * Convert the given code system to LForms internal code system. Currently
   * only converts 'http://loinc.org' to 'LOINC' and returns all other input as is.
   * @param codeSystem
   * @private
   */


  self._toLfCodeSystem = function (codeSystem) {
    var ret = codeSystem;

    switch (codeSystem) {
      case 'http://loinc.org':
        ret = 'LOINC';
        break;
    }

    return ret;
  }; // Copy the main merge function to preserve the same API usage.


  self.mergeQuestionnaireResponseToLForms = qrImport.mergeQuestionnaireResponseToLForms;
  /**
   *  Processes the terminology server setting, if any.
   *
   * @param lfItem - LForms item object to assign externallyDefined
   * @param qItem - Questionnaire item object
   * @private
   */

  self._processTerminologyServer = function (lfItem, qItem) {
    var tServer = LForms.Util.findObjectInArray(qItem.extension, 'url', self.fhirExtTerminologyServer);

    if (tServer && tServer.valueUrl) {
      lfItem.terminologyServer = tServer.valueUrl;
    }
  };
  /**
   *  Finds the terminology server URL (if any) for the given item.
   * @param item a question, title, or group in the form (in the LFormsData
   *  structure, not the Questionnaire).
   * @return the base terminology server URL, or undefined if there isn't one
   *  for this item.
   */


  self._getTerminologyServer = function (item) {
    var terminologyServer = item.terminologyServer;
    var parent = item._parentItem;

    while (!terminologyServer && parent) {
      terminologyServer = parent.terminologyServer;
      parent = parent._parentItem;
    }

    return terminologyServer;
  };
  /**
   *  Returns the URL for performing a ValueSet expansion for the given item,
   *  if the given item has a terminology server and answerValueSet
   *  configured; otherwise it returns undefined.
   * @param item a question, title, or group in the form
   */


  self._getExpansionURL = function (item) {
    var rtn;

    if (item.answerValueSet) {
      var terminologyServer = this._getTerminologyServer(item);

      if (terminologyServer) rtn = terminologyServer + '/ValueSet/$expand?url=' + item.answerValueSet;
    }

    return rtn;
  };
  /**
   *  Loads answerValueSets for prefetched lists.
   * @param lfData the LFormsData for the form
   * @return an array of promise objects which resolve when the answer valuesets
   * have been loaded and imported.
   */


  self.loadAnswerValueSets = function (lfData) {
    var _this = this;

    var pendingPromises = [];
    var items = lfData.itemList;

    var _loop = function _loop() {
      var item = items[i];

      if (item.answerValueSet && !item.isSearchAutocomplete) {
        var expURL = _this._getExpansionURL(item);

        var vsKey = expURL ? expURL : item.answerValueSet;
        item._answerValueSetKey = vsKey;
        if (!LForms._valueSetAnswerCache) LForms._valueSetAnswerCache = {};
        var answers = LForms._valueSetAnswerCache[vsKey];

        if (answers) {
          item.answers = answers;

          lfData._updateAutocompOptions(item, true);
        } else {
          // if not already loaded
          if (expURL) {
            pendingPromises.push(fetch(expURL).then(function (response) {
              return response.json();
            }).then(function (parsedJSON) {
              answers = self.answersFromVS(parsedJSON);

              if (answers) {
                LForms._valueSetAnswerCache[expURL] = answers;
                item.answers = answers;

                lfData._updateAutocompOptions(item, true);
              }
            }, function fail() {
              throw new Error("Unable to load ValueSet from " + expURL);
            }));
          } else {
            // use FHIR context
            fhirClient = LForms.fhirContext;
            pendingPromises.push(fhirClient.request(lfData._buildURL(['ValueSet', '$expand'], {
              url: item.answerValueSet
            })).then(function (response) {
              var valueSet = response;
              var answers = self.answersFromVS(valueSet);

              if (answers) {
                LForms._valueSetAnswerCache[vsKey] = answers;
                item.answers = answers;

                lfData._updateAutocompOptions(item, true);
              }
            }, function fail() {
              throw new Error("Unable to load ValueSet " + item.answerValueSet + " from FHIR server");
            }));
          }
        }
      }
    };

    for (var i = 0, len = items.length; i < len; ++i) {
      var fhirClient;

      _loop();
    }

    return pendingPromises;
  };
  /**
   * Handle the item.value in QuestionnaireResponse for CWE/CNE typed items
   * @param qrItemValue a value of item in QuestionnaireResponse
   * @returns {{code: *, text: *}}
   * @private
   */


  self._processCWECNEValueInQR = function (qrItemValue) {
    var retValue; // a valueCoding, which is one of the answers

    if (qrItemValue.valueCoding) {
      retValue = {
        "code": qrItemValue.valueCoding.code,
        "text": qrItemValue.valueCoding.display,
        "system": qrItemValue.valueCoding.system
      };
    } // a valueString, which is a user supplied value that is not in the answers
    else if (qrItemValue.valueString) {
        retValue = qrItemValue.valueString;
      }

    return retValue;
  };
  /**
   * Parse questionnaire item for coding instructions
   *
   * @param qItem {object} - Questionnaire item object
   * @return {{}} an object contains the coding instructions info.
   * @private
   */


  self._processCodingInstructions = function (qItem) {
    // if the qItem is a "display" typed item with a item-control extension, then it meant to be a help message,
    // which in LForms is an attribute of the parent item, not a separate item.
    var ret = null;
    var ci = LForms.Util.findObjectInArray(qItem.extension, 'url', self.fhirExtUrlItemControl);
    var xhtmlFormat;

    if (qItem.type === "display" && ci) {
      // only "redering-xhtml" is supported. others are default to text
      if (qItem._text) {
        xhtmlFormat = LForms.Util.findObjectInArray(qItem._text.extension, 'url', "http://hl7.org/fhir/StructureDefinition/rendering-xhtml");
      } // there is a xhtml extension


      if (xhtmlFormat) {
        ret = {
          codingInstructionsFormat: "html",
          codingInstructions: xhtmlFormat.valueString,
          codingInstructionsPlain: qItem.text // this always contains the coding instructions in plain text

        };
      } // no xhtml extension, default to 'text'
      else {
          ret = {
            codingInstructionsFormat: "text",
            codingInstructions: qItem.text,
            codingInstructionsPlain: qItem.text // this always contains the coding instructions in plain text

          };
        }
    }

    return ret;
  };
  /**
   *  Processes the child items of the item.
   * @param targetItem the LForms node being populated with data
   * @param qItem the Questionnaire (item) node being imported
   * @param linkIdItemMap - Map of items from link ID to item from the imported resource.
   * @param containedVS - contained ValueSet info, see _extractContainedVS() for data format details
   */


  self._processChildItems = function (targetItem, qItem, containedVS, linkIdItemMap) {
    if (Array.isArray(qItem.item)) {
      targetItem.items = [];

      for (var i = 0; i < qItem.item.length; i++) {
        var help = self._processCodingInstructions(qItem.item[i]); // pick one coding instruction if there are multiple ones in Questionnaire


        if (help !== null) {
          targetItem.codingInstructions = help.codingInstructions;
          targetItem.codingInstructionsFormat = help.codingInstructionsFormat;
          targetItem.codingInstructionsPlain = help.codingInstructionsPlain;
        } else {
          var item = self._processQuestionnaireItem(qItem.item[i], containedVS, linkIdItemMap);

          targetItem.items.push(item);
        }
      }
    }
  };
  /**
   *  Copy extensions that haven't been handled before.
   *
   * @param lfItem the LForms node being populated with data
   * @param qItem the Questionnaire (item) node being imported
   */


  self._processExtensions = function (lfItem, qItem) {
    var extensions = [];

    if (Array.isArray(qItem.extension)) {
      for (var i = 0; i < qItem.extension.length; i++) {
        var ext = qItem.extension[i];
        var extHandler = self.extensionHandlers[ext.url];

        if (extHandler && extHandler(ext, lfItem) || !self.handledExtensionSet.has(qItem.extension[i].url)) {
          extensions.push(qItem.extension[i]);
        }
      }
    }

    if (extensions.length > 0) {
      lfItem.extension = extensions;
    }
  };
  /**
   * If the given entity is an array, it will return the array length, return -1 otherwise.
   * @param entity the given entity (can be anything) that needs to be tested to see if it's an array
   * @return {number} the array length or -1 if the given entity is not an array.
   * @private
   */


  self._arrayLen = function (entity) {
    return entity && Array.isArray(entity) ? entity.length : -1;
  };
  /**
   * Get structural info of a QuestionnaireResponse item.answer.item in a way similar to that of item.item.
   * If any answer entry in item.answer has items, the qrItemInfo.qrAnswersItemsInfo will be assigned, which
   * will be an array where each element corresponds to one answer element in item.answer. When an answer entry
   * does not have any items, null will be used to fill the position.
   * @param qrItemInfo the structural info of the given item
   * @param item the item in a QuestionnaireResponse object whose answer.item structure is to be created.
   * @private
   */


  self._checkQRItemAnswerItems = function (qrItemInfo, item) {
    var answerLen = self._arrayLen(item.answer);

    if (answerLen < 1) {
      return;
    }

    var numAnswersWithItems = 0;
    var answersItemsInfo = []; // one entry for each answer; each entry is an qrItemsInfo array for the answer.item

    for (var i = 0; i < answerLen; i++) {
      if (this._arrayLen(item.answer[i].item) > 0) {
        answersItemsInfo.push({});

        self._mergeQR._checkQRItems(answersItemsInfo[i], item.answer[i]);

        ++numAnswersWithItems;
      } else {
        answersItemsInfo.push(null);
      }
    }

    if (numAnswersWithItems > 0) {
      qrItemInfo.numAnswersWithItems = numAnswersWithItems;
      qrItemInfo.qrAnswersItemsInfo = answersItemsInfo;
    }
  };
  /**
   * Parse questionnaire item for restrictions
   *
   * @param lfItem {object} - LForms item object to assign restrictions
   * @param qItem {object} - Questionnaire item object
   * @private
   */


  self._processRestrictions = function (lfItem, qItem) {
    var restrictions = {};

    if (typeof qItem.maxLength !== 'undefined') {
      restrictions['maxLength'] = qItem.maxLength.toString();
    }

    for (var i = 0; i < self.fhirExtUrlRestrictionArray.length; i++) {
      var restriction = LForms.Util.findObjectInArray(qItem.extension, 'url', self.fhirExtUrlRestrictionArray[i]);

      var val = self._getFHIRValueWithPrefixKey(restriction, /^value/);

      if (val !== undefined && val !== null) {
        if (restriction.url.match(/minValue$/)) {
          // TODO -
          // There is no distinction between inclusive and exclusive.
          // Lforms looses this information when converting back and forth.
          restrictions['minInclusive'] = val;
        } else if (restriction.url.match(/maxValue$/)) {
          restrictions['maxInclusive'] = val;
        } else if (restriction.url.match(/minLength$/)) {
          restrictions['minLength'] = val;
        } else if (restriction.url.match(/regex$/)) {
          restrictions['pattern'] = val;
        }
      }
    }

    if (!jQuery.isEmptyObject(restrictions)) {
      lfItem.restrictions = restrictions;
    }
  };
}

/* harmony default export */ __webpack_exports__["default"] = (addCommonSDCImportFns);

/***/ }),
/* 96 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "addCommonRuntimeFns", function() { return addCommonRuntimeFns; });
/* harmony import */ var _extensions_rendering_style__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(97);

var extProcessors = {};
extProcessors[_extensions_rendering_style__WEBPACK_IMPORTED_MODULE_0__["default"].extURL] = _extensions_rendering_style__WEBPACK_IMPORTED_MODULE_0__["default"].processExtension;
function addCommonRuntimeFns(ns) {
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

  self.processExtensions = function (lfNode, lfFieldName) {
    var fieldData = lfFieldName ? lfNode[lfFieldName] : lfNode;

    if (fieldData) {
      var extensions = fieldData.extension;

      if (extensions) {
        for (var i = 0, len = extensions.length; i < len; ++i) {
          var extData = extensions[i];
          var extURL = extData.url;
          var processor = extProcessors[extURL];
          if (processor) processor(lfNode, lfFieldName, extData);
        }
      }
    }
  };
}

/***/ }),
/* 97 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
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
  if (css) lfNode['_' + fieldName + 'CSS'] = css;
}

/* harmony default export */ __webpack_exports__["default"] = ({
  extURL: extURL,
  processExtension: processExtension
});

/***/ }),
/* 98 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ExpressionProcessor", function() { return ExpressionProcessor; });
function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

// Processes FHIR Expression Extensions
// There are three types of expressions: FHIRPath, x-fhir-query (to a FHIR
// server), and CQL (but we do not yet support CQL).
// Various extensions have an Expression as a value, such as variable,
// initialExpression, calculatedExpression, and answerExpression.  When the
// Expression contains a name, that creates a variable which can be used by
// other Expressions defined either on the same item or a child item.
//
// The general processing pattern is depth-first traversal of the "tree" of the
// Questionnaire's items, and while we go through the expressions we keep track
// of whether a field has changed and whether a variable has changed.  If there
// are any changes, we traverse the tree again, but if the only things that
// changed were variables, then we only have to traverse the parts of the tree
// for which those variables are in scope.
//
// A further complication is that x-fhir-query Expressions require an
// asynchronous call.  So, after each traversal, we have to wait for those to
// complete before starting the next traversal (if one is needed).  This is also
// why the main function, runCalculations, returns a promise that resolves
// when the expression run has been completed.
//
// Also, because there is possibility of asynchronous queries, we have to handle
// the fact that runCalculations might get called again while before the first
// call has finished.
var ExpressionProcessor;

var deepEqual = __webpack_require__(99); // faster than JSON.stringify


(function () {
  "use strict"; // A class whose instances handle the running of FHIR expressions.

  /**
   *   Constructor.
   *  @param lfData an instance of LForms.LFormsData.  The _fhir attribute
   *   should be set before this is called.
   */

  ExpressionProcessor = function ExpressionProcessor(lfData) {
    // A cache of x-fhir-query URIs to results
    this._queryCache = {}; // An array of pending x-fhir-query results

    this._pendingQueries = []; // Keeps track of whether a request to run the calculations has come in
    // while we were already busy.

    this._pendingRun = false; // The promise returned by runCalculations, when a run is active.

    this._currentRunPromise = undefined;
    this._lfData = lfData;
    if (!lfData._fhir) throw new Error('lfData._fhir should be set');
    this._fhir = lfData._fhir;
    this._compiledExpressions = {};
  };

  ExpressionProcessor.prototype = {
    /**
     *   Runs the FHIR expressions in the form.  This the main function in this
     *   module.
     *  @param includeInitialExpr whether to include the "initialExpression"
     *   expressions (which should only be run once, after asynchronous loads
     *   from questionnaire-launchContext have been completed).
     *  @return a Promise that resolves when the expressions have been run, and
     *   there are no pending runs left to do.
     */
    runCalculations: function runCalculations(includeInitialExpr) {
      // Defer running calculations while we are waiting for earlier runs to
      // finish.
      if (this._currentRunPromise) // then we will just return that promise
        this._pendingRun = true; // so we know to run them when we can
      else {
          this._pendingRun = false; // clear this because we are running them now

          this._runStart = new Date(); // Create an export of Questionnaire for the %questionnaire variable in
          // FHIRPath.  We only need to do this once per form.

          var lfData = this._lfData;

          if (!lfData._fhirVariables.questionnaire) {
            lfData._fhirVariables.questionnaire = this._fhir.SDC.convertLFormsToQuestionnaire(lfData);
          }

          this._regenerateQuestionnaireResp();

          self = this;
          this._currentRunPromise = this._asyncRunCalculations(includeInitialExpr, false).then(function () {
            // At this point, every promise for the pending queries has been
            // resolved, and we are done.
            console.log("Ran expressions in " + (new Date() - self._runStart) + " ms");
            if (!self._firstExpressionRunComplete) // if this is the first run
              self._firstExpressionRunComplete = true;
            self._currentRunPromise = undefined;
            if (self._pendingRun) return self.runCalculations(false); // will set self._currentRunPromise again
          }, function (failureReason) {
            console.log("Run of expressions failed; reason follows");
            console.log(failureReason);
            self._currentRunPromise = undefined;
            self._pendingRun = false;
            self._pendingQueries = []; // reset

            throw failureReason;
          });
        }
      return this._currentRunPromise;
    },

    /**
     *  Waits for any pending queries.
     * @return a Promise the resolves when everything is finished, including any
     *  pending re-run request.  The returned promise will be rejected if something
     *  goes wrong.
     * @return the same map about changes as in _evaluateExpressions.
     */
    _handlePendingQueries: function _handlePendingQueries() {
      var self = this;
      return Promise.allSettled(this._pendingQueries).then(function (results) {
        self._pendingQueries = []; // reset

        var varsChanged = false,
            fieldsChanged = false;

        for (var i = 0, len = results.length; (!varsChanged || !fieldsChanged) && i < len; ++i) {
          var changes = results[i].value;

          if (changes) {
            varsChanged = varsChanged || changes.variables;
            fieldsChanged = fieldsChanged || changes.fields;
          } else if (results[i].status == 'rejected') return Promise.reject(results[i].reason);
        }

        return {
          fields: fieldsChanged,
          variables: varsChanged
        };
      });
    },

    /**
     *  This is conceptually a part of runCalculations, but it is this part of
     *  it that might need to call itself if fields or variables update.
     *  The basic algorithm is a depth-first traversal of the items to run their
     *  expressions.  Some of those might be asynchronous (e.g. x-fhir-query
     *  variables), so we wait for those to complete before looking at what has
     *  changed and deciding whether to run the expressions again.
     * @param includeInitialExpr whether to include the "initialExpression"
     *  expressions (which should only be run once, after asynchronous loads
     *  from questionnaire-launchContext have been completed).
     * @param changesByVarsOnly whether to run all field expressions, or just the ones
     *  that are likely to have been affected by changes from variable expressions.
     * @return a promise that resolves when all Expressions which needed to be
     *  processed have been processed and the values have stablized.
     */
    _asyncRunCalculations: function _asyncRunCalculations(includeInitialExpr, changesByVarsOnly) {
      var self = this;
      var lfData = this._lfData;
      var changes = null; // data about what the calculations changed

      changes = this._evaluateExpressions(lfData, includeInitialExpr, changesByVarsOnly); // Wait for any asynchronous queries to complete

      return this._handlePendingQueries().then(function (queryChanges) {
        // Two types of reported changes are possible -- variables and field values
        var varsChanged = changes.variables || queryChanges.variables;
        var fieldsChanged = changes.fields || queryChanges.fields;

        if (varsChanged || fieldsChanged) {
          // Run again
          if (fieldsChanged) self._regenerateQuestionnaireResp();
          var onlyVarsChanged = !fieldsChanged;
          return self._asyncRunCalculations(includeInitialExpr, onlyVarsChanged);
        }
      });
    },

    /**
     *  Updates the value of an item's FHIR variable.  If the variable value has changed,
     *  item._varChanged will be set to true.
     * @param item the item on which the variable is defined
     * @param varName the name of the variable
     * @param newVal the new value of the variable.
     * @return whether the value changed.
     */
    _updateItemVariable: function _updateItemVariable(item, varName, newVal) {
      var oldVal = item._fhirVariables[varName];
      item._fhirVariables[varName] = newVal;

      if (!deepEqual(oldVal, newVal)) {
        item._varChanged = true; // flag for re-running expressions.
      }

      return item._varChanged;
    },

    /**
     *  Evaluates the expressions for a given item.
     * @param item an LFormsData or item from LFormsData.
     * @param includeInitialExpr whether or not to run expressions from
     *  initialExpression extensions (which should only be run when the form is
     *  loaded).
     * @param changesByVarsOnly whether to run all field expressions, or just the ones
     *  that are likely to have been affected by changes from variable expressions.
     * @return a map with two fields, "variables" and "fields", which will be
     *  present and set to true if the evaluation changed variables (including
     *  implicit variables created by named expressions of some other
     *  non-variable type) or field values, respectively.
     */
    _evaluateExpressions: function _evaluateExpressions(item, includeInitialExpr, changesByVarsOnly) {
      var _this = this;

      var rtn = {}; // If changesByVarsOnly, for any item that has _varChanged set, we run any field
      // expressions that are within that group (or item).

      if (changesByVarsOnly && item.items && item._varChanged) {
        item._varChanged = false; // clear flag

        changesByVarsOnly = false; // clear it, so we process this and all child items
      }

      if (!changesByVarsOnly) {
        // process this and all child items
        item._varChanged = false; // clear flag in case it was set

        var fhirExt = item._fhirExt;

        if (fhirExt) {
          var sdc = this._fhir.SDC;
          var exts = item._exprExtensions;

          if (exts) {
            var fieldChanged = false;
            var self = this;

            var _loop = function _loop(i, _len) {
              var ext = exts[i]; // Skip initialExpressions if we are not including those.

              if (includeInitialExpr || ext.url != sdc.fhirExtInitialExp) {
                // Skip calculated expressions of editable fields for which the user has
                // edited the value.
                var isCalcExp = ext.url == sdc.fhirExtCalculatedExp; // Compare the item.value to the last calculated value (if any).  If
                // they differ, then the user has edited the field, and in that case we
                // skip setting the value and halt further calculations for the field.

                if (isCalcExp && !item._userModifiedCalculatedValue && item._calculatedValue && !deepEqual(item._calculatedValue, item.value)) {
                  item._userModifiedCalculatedValue = true;
                }

                if (!isCalcExp || !item._userModifiedCalculatedValue) {
                  var varName = ext.valueExpression.name; // i.e., a variable name

                  if (varName) itemVars = _this._getItemVariables(item);
                  var newVal;
                  updateValue = false;

                  if (ext.valueExpression.language == "text/fhirpath") {
                    if (varName) {
                      // Temporarily delete the old value, so we don't have
                      // circular references.
                      oldVal = item._fhirVariables[varName];
                      delete item._fhirVariables[varName];
                    }

                    newVal = _this._evaluateFHIRPath(item, ext.valueExpression.expression);
                    updateValue = true;
                    if (varName) item._fhirVariables[varName] = oldVal; // update handled below
                  } else if (ext.valueExpression.language == "application/x-fhir-query") {
                    var queryURL = ext.valueExpression.expression; // The expression might have embedded FHIRPath in the URI, inside {{...}}
                    // Use "undefinedExprVal" to keep track of whether one of
                    // the embedded FHIRPath expressions returns undefined (or
                    // null).

                    var undefinedExprVal = false;
                    queryURL = queryURL.replace(/\{\{([^}]+)\}\}/g, function (match, fpExp) {
                      // Replace the FHIRPath with the evaluated expressions
                      var result = self._evaluateFHIRPath(item, fpExp)[0];

                      if (result === null || result === undefined) undefinedExprVal = true; // i.e., URL likely not usable

                      return undefinedExprVal ? '' : '' + result;
                    });
                    if (!item._currentFhirQueryURLs) item._currentFhirQueryURLs = {};
                    var oldQueryURL = item._currentFhirQueryURLs[varName]; // If queryURL is not a new value, we don't need to do anything

                    if (queryURL != oldQueryURL) {
                      item._currentFhirQueryURLs[varName] = queryURL;

                      if (!undefinedExprVal) {
                        // Look for a cached result
                        if (_this._queryCache.hasOwnProperty(queryURL)) {
                          newVal = _this._queryCache[queryURL];
                          updateValue = true;
                        } else {
                          // query not cached
                          var fetchPromise = _this._fetch(queryURL); // Store the promise that handles the response. We
                          // will have to wait for it later.


                          _this._pendingQueries.push(fetchPromise.then(function (parsedJSON) {
                            newVal = self._queryCache[queryURL] = parsedJSON;
                          }, function fail(e) {
                            console.error("Unable to load FHIR data from " + queryURL);
                          }).then(function () {
                            // Update the item with the fetched value, and
                            // update the variable if there was a name defined.
                            var fChanged = self._updateItemFromExp(item, ext.url, varName, newVal, isCalcExp);

                            if (varName) {
                              var vChanged = self._updateItemVariable(item, varName, newVal);
                            }

                            return {
                              fields: fChanged,
                              variables: vChanged
                            };
                          }));
                        }
                      }
                    }
                  } // else CQL (TBD)


                  if (updateValue) {
                    // Update the item with the fetched value, and
                    // update the variable if there was a name defined.
                    fChanged = _this._updateItemFromExp(item, ext.url, varName, newVal, isCalcExp);
                    fieldChanged = fieldChanged || fChanged;
                    if (varName) _this._updateItemVariable(item, varName, newVal);
                  }
                }
              }
            };

            for (var i = 0, _len = exts.length; i < _len; ++i) {
              var itemVars;
              var oldVal;
              var updateValue;
              var fChanged;

              _loop(i, _len);
            }

            rtn = {
              fields: fieldChanged,
              variables: item._varChanged
            };
          }
        }
      } // Process child items


      if (item.items) {
        var childChanges;

        for (var j = 0, len = item.items.length; j < len; ++j) {
          // Note:  We need to process all the child items; we cannot do an
          // early loop exit based on rtn.
          childChanges = this._evaluateExpressions(item.items[j], includeInitialExpr, changesByVarsOnly);
          if (childChanges.fields) rtn.fields = true;
          if (childChanges.variables) rtn.variables = true;
        }
      }

      return rtn;
    },

    /**
     *  Regenerates the QuestionnaireResponse resource and the map from
     *  LFormsData _elementIDs to items in the QuestionnaireResponse.
     */
    _regenerateQuestionnaireResp: function _regenerateQuestionnaireResp() {
      var questResp = this._fhir.SDC.convertLFormsToQuestionnaireResponse(this._lfData);

      this._lfData._fhirVariables.resource = questResp;
      this._elemIDToQRItem = this._createIDtoQRItemMap(questResp);
    },

    /**
     *  Returns the nearest ancestor of item (or item itelf) that has
     *  _fhirVariables defined.
     * @param item either an LFormsData or an item from an LFormsData.
     */
    _itemWithVars: function _itemWithVars(item) {
      var itemWithVars = item;

      while (!itemWithVars._fhirVariables) {
        itemWithVars = itemWithVars._parentItem;
      } // should terminate at lfData


      return itemWithVars;
    },

    /**
     *  Gets or creates if not yet initialized, the item's _fhirVariables
     *  map (storing its variable values).  This should not be called until it is
     *  known that the item should have a _fhirVariables map.
     * @param item either an LFormsData or an item from an LFormsData.
     * @return the item's _fhirVariables map
     */
    _getItemVariables: function _getItemVariables(item) {
      var rtn = item._fhirVariables;

      if (!rtn) {
        // Create a hash for variables that will have access to
        // variables defined higher up in the tree.
        item._fhirVariables = Object.create(this._itemWithVars(item)._fhirVariables);
      }

      return rtn;
    },

    /**
     *  Fetches an x-fhir-query URL.
     * @param queryURL the URL (possibly relative) to fetch.
     * @return a Promise that resolves to the (parsed) JSON response.
     */
    _fetch: function _fetch(queryURL) {
      var fetchPromise; // If the queryURL is a relative URL, then if there is a FHIR
      // context (set via LForms.Util.setFHIRContext), use that to send
      // the query; otherwise just use fetch.
      // Also, set the format to JSON.

      queryURL += (queryURL.indexOf('?') > 0 ? '&' : '?') + '_format=json';

      if (!/^https?:/.test(queryURL) && LForms.fhirContext) {
        fetchPromise = LForms.fhirContext.request(queryURL);
      } else {
        fetchPromise = fetch(queryURL).then(function (response) {
          return response.json();
        });
      }

      return fetchPromise;
    },

    /**
     *  Updates an item's data following the run of an expression.
     * @param item either an LFormsData or an item from an LFormsData.
     * @param expURL the URL of the expression
     * @param varName variable name from the expression (if any)
     * @param newVal the new value of the variable (if any)
     * @param isCalcExp whether the expression was a calculated expression.
     *  This could be detected from expURL, but the caller already knows it.
     * @return true if the field value changed
     */
    _updateItemFromExp: function _updateItemFromExp(item, expURL, varName, newVal, isCalcExp) {
      var fieldChanged = false;
      var sdc = this._fhir.SDC;

      if (isCalcExp || expURL != sdc.fhirExtVariable) {
        if (expURL == sdc.fhirExtAnswerExp) fieldChanged = this._setItemListFromFHIRPath(item, newVal);else if (expURL == sdc.fhirExtEnableWhenExp) {
          // The new value should be a boolean.  Coerce it to a boolean, and
          // report a warning if it was not a boolean.
          var actualNewVal = newVal[0];
          newVal = !!actualNewVal;

          if (newVal !== actualNewVal) {
            LForms.Util.showWarning('An expression from enableWhenExpression ' + 'did not resolve to a Boolean as required', item);
          }

          if (varName) {
            // if there is a variable name defined, a change in the value matters
            var oldVal = !!item._enableWhenExpVal; // _enableWhenExpVal could be undefined

            fieldChanged = oldVal != newVal;
          }

          item._enableWhenExpVal = newVal;
        } else // else initial or calculated expression
          fieldChanged = this._setItemValueFromFHIRPath(item, newVal, isCalcExp);
      }

      return fieldChanged;
    },

    /**
     *  Evaluates the given FHIRPath expression defined in an extension on the
     *  given item.
     * @param item either an LFormsData or an item from an LFormsData.
     * @param expression the FHIRPath to evaluate with the context of item's
     *  equivalent node in the QuestionnaireResponse.
     * @returns the result of the expression.
     */
    _evaluateFHIRPath: function _evaluateFHIRPath(item, expression) {
      var fhirPathVal; // Find the item-level fhirpathVars

      var itemVars = this._itemWithVars(item)._fhirVariables;

      try {
        // We need to flatten the fhirVariables chain into a simple hash of key/
        // value pairs.
        var fVars = {};

        for (var k in itemVars) {
          fVars[k] = itemVars[k];
        }

        var fhirContext = item._elementId ? this._elemIDToQRItem[item._elementId] : this._lfData._fhirVariables.resource;
        var compiledExpr = this._compiledExpressions[expression];

        if (!compiledExpr) {
          compiledExpr = this._compiledExpressions[expression] = this._fhir.fhirpath.compile(expression, this._fhir.fhirpathModel);
        }

        fhirPathVal = compiledExpr(fhirContext, fVars);
      } catch (e) {
        // Sometimes an expression will rely on data that hasn't been filled in
        // yet.
        console.log(e);
      }

      return fhirPathVal;
    },

    /**
     *  Returns a hash from the LForms _elementId of each item to the
     *  corresponding QuestionnaireResponse item.
     * @param qr the QuestionnaireResponse corresponding to the current
     * LFormsData.
     */
    _createIDtoQRItemMap: function _createIDtoQRItemMap(qr) {
      var map = {};

      this._addToIDtoQRItemMap(this._lfData, qr, map);

      return map;
    },

    /**
     *  Adds to the map from LFormsData items to QuestionnaireResponse items and
     *  returns the number of items added.
     * @param lfItem an LFormsData, or an item within it.
     * @param qrItem the corresponding QuestionnaireResponse or an item within
     * it.
     * @param map the map to which entries will be added.
     * @return the number of items added to the map.
     */
    _addToIDtoQRItemMap: function _addToIDtoQRItemMap(lfItem, qrItem, map) {
      var added = 0;

      if (lfItem.linkId === qrItem.linkId) {
        if (lfItem.items) {
          // lfItem.items might contain items that don't have values, but
          // qrItem.item will not, so we need to skip the blank items.
          //
          // Also, for a repeating question, there will be multiple answers on an
          // qrItem.item, but repeats of the item in lfItem.items with one answer
          // each, unless answerCardinality is '*' (list items), in which case
          // there can be multiple answers per lforms item.
          // LForms does not currently support items that contain both answers
          // and child items, but I am trying to accomodate that here for the
          // future.
          if (qrItem && qrItem.item && qrItem.item.length > 0) {
            var lfItems = lfItem.items,
                qrItems = qrItem.item;
            var numLFItems = lfItems.length;

            for (var i = 0, qrI = 0, len = qrItems.length; qrI < len && i < numLFItems; ++qrI) {
              // Answers are repeated in QR, but items are repeated in LForms
              var qrIthItem = qrItems[qrI];
              var lfIthItem = lfItems[i];

              if (!qrIthItem.answer) {
                // process item anyway to handle child items with data
                var newlyAdded = this._addToIDtoQRItemMap(lfIthItem, qrIthItem, map);

                if (newlyAdded === 0) {
                  // lfIthItem was blank, so qrIthItem must be for a following
                  // item.
                  --qrI; // so we try qrIthItem with the next lfIthItem
                } else added += newlyAdded;

                ++i;
              } else {
                // there are answers on the qrIthItem item
                var numAnswers = qrIthItem.answer ? qrIthItem.answer.length : 0;

                for (var a = 0; a < numAnswers; ++i) {
                  if (i >= numLFItems) throw new Error('Logic error in _addToIDtoQRITemMap; ran out of lfItems');
                  var _lfIthItem = lfItems[i];

                  var _newlyAdded = this._addToIDtoQRItemMap(_lfIthItem, qrIthItem, map);

                  if (_newlyAdded != 0) {
                    // lfItems[i] was not blank
                    if (Array.isArray(_lfIthItem.value)) a += _lfIthItem.value.length;else a += 1;
                  }

                  added += _newlyAdded;
                }
              }
            }
          }
        } // this item has _elementId and has a value


        if (lfItem._elementId && (added || lfItem.value !== undefined && lfItem.value !== null && lfItem.value !== "")) {
          if (!qrItem) {
            // if there is data in lfItem, there should be a qrItem
            throw new Error('Logic error in _addToIDtoQRItemMap; missing qrItem');
          } else {
            map[lfItem._elementId] = qrItem;
            added += 1;
          }
        }
      }

      return added;
    },

    /**
     *  Assigns the given list result to the item.  If the list has changed, the
     *  field is cleared.
     * @param list an array of list items computed from a FHIRPath expression.
     * @return true if the list changed
     */
    _setItemListFromFHIRPath: function _setItemListFromFHIRPath(item, list) {
      var currentList = item.answers;
      var hasCurrentList = !!currentList && Array.isArray(currentList);
      var listHasData = !!list && Array.isArray(list);
      var changed = hasCurrentList != listHasData || listHasData && list.length != currentList.length;
      var newList = []; // a reformatted version of "list"

      var scoreURI = this._fhir.SDC.fhirExtUrlOptionScore;

      if (listHasData) {
        // list should be an array of any item type, including Coding.
        // (In R5, FHIR will start suppoing lists of types other than Coding.)
        for (var i = 0, len = list.length; i < len; ++i) {
          // Assume type "object" means a coding, and that otherwise what we have
          // is something useable as display text. It is probably necessary to
          // convert them to strings in that case, which means that in the future
          // (R5), we might have to save/re-create the original data type and value.
          // Work will need to be done to autocomplete-lhc to support data objects
          // associated with list values.
          var entry = list[i],
              newEntry = newList[i] = {};

          if (_typeof(entry) === 'object') {
            var code = entry.code;
            if (code !== undefined) newEntry.code = code;
            var display = entry.display;
            if (display !== undefined) newEntry.text = display;
            var system = entry.system;
            if (system !== undefined) newEntry.system = system; // A Coding can have the extension for scores

            var scoreExt = item._fhirExt && item._fhirExt[scoreURI];
            if (scoreExt) newEntry.score = scoreExt[0].valueDecimal;
          } else newEntry.text = '' + entry;

          if (!changed) {
            changed = !hasCurrentList || !this._lfData._objectEqual(newEntry, currentList[i]);
          }
        }
      }

      if (changed) {
        item.answers = newList;

        this._lfData._updateAutocompOptions(item, true);

        this._lfData._resetItemValueWithModifiedAnswers(item);
      }

      return changed;
    },

    /**
     *  Assigns the given FHIRPath result to the given item.
     * @param item the item from the LFormsData object that is receiving the new
     *  value.
     * @param fhirPathRes the result of a FHIRPath evaluation.
     * @param isCalcExp whether this is from a calculated expression, in which
     *  case a decision will be made whether to skip setting the value.
     * @return true if the value changed
     */
    _setItemValueFromFHIRPath: function _setItemValueFromFHIRPath(item, fhirPathRes, isCalcExp) {
      var oldVal = item.value;
      var fhirPathVal;
      if (fhirPathRes !== undefined) fhirPathVal = fhirPathRes[0];
      if (fhirPathVal === null || fhirPathVal === undefined) item.value = undefined;else this._fhir.SDC._processFHIRValues(item, fhirPathRes); // sets item.value

      var changed = !deepEqual(oldVal, item.value);
      item._calculatedValue = item.value; // If this is the first run of the expressions, and there is
      // saved user data, then we check whether the calculated value matches
      // what the user entered (or erased) and if it doesn't, we halt further
      // calculations for this field and restore the saved value.

      if (changed && isCalcExp && !this._firstExpressionRunComplete && this._lfData.hasSavedData) {
        item._userModifiedCalculatedValue = true;
        item.value = oldVal;
        changed = false;
      }

      return changed;
    }
  };
})();

/***/ }),
/* 99 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
 // do not edit .js files directly - edit src/index.jst

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

module.exports = function equal(a, b) {
  if (a === b) return true;

  if (a && b && _typeof(a) == 'object' && _typeof(b) == 'object') {
    if (a.constructor !== b.constructor) return false;
    var length, i, keys;

    if (Array.isArray(a)) {
      length = a.length;
      if (length != b.length) return false;

      for (i = length; i-- !== 0;) {
        if (!equal(a[i], b[i])) return false;
      }

      return true;
    }

    if (a.constructor === RegExp) return a.source === b.source && a.flags === b.flags;
    if (a.valueOf !== Object.prototype.valueOf) return a.valueOf() === b.valueOf();
    if (a.toString !== Object.prototype.toString) return a.toString() === b.toString();
    keys = Object.keys(a);
    length = keys.length;
    if (length !== Object.keys(b).length) return false;

    for (i = length; i-- !== 0;) {
      if (!Object.prototype.hasOwnProperty.call(b, keys[i])) return false;
    }

    for (i = length; i-- !== 0;) {
      var key = keys[i];
      if (!equal(a[key], b[key])) return false;
    }

    return true;
  } // true if both NaN, false otherwise


  return a !== a && b !== b;
};

/***/ })
/******/ ]);
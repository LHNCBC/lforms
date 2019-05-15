var LForms =
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
/***/ (function(module, exports, __webpack_require__) {

// This is the entry point for the bower version of LForms.  It does not include
// any of the bower dependencies.
var LForms = __webpack_require__(1);

LForms.Def = Def; // from the bower autocomplete-lhc package

if (!LForms.ucumPkg) LForms.ucumPkg = window.ucumPkg; // window.ucumPkg is defined by the bower ucum-lhc package
// The NPM version of lforms puts elementResizeDetectorMaker in an internal
// variable to avoid creating another global.  For compatibility, do the same
// for this bower version.

LForms._elementResizeDetectorMaker = elementResizeDetectorMaker; // bower package

module.exports = LForms;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

// A list of files from the lforms package itself to be combined with webpack.
// For the full list for the bower or npm package, see bower-index.js or
// index.js.
var LForms = __webpack_require__(2);

__webpack_require__(20);

__webpack_require__(21);

__webpack_require__(22);

__webpack_require__(23);

__webpack_require__(24);

__webpack_require__(25);

__webpack_require__(26);

__webpack_require__(27);

__webpack_require__(28);

__webpack_require__(29);

__webpack_require__(30);

__webpack_require__(31);

__webpack_require__(33);

LForms.Util.FHIRSupport = __webpack_require__(34);

__webpack_require__(35);

LForms._elementResizeDetectorMaker = __webpack_require__(36);
module.exports = LForms;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

// Use IIFE so that strict mode is not at the file level
(function () {
  'use strict';

  var Def = __webpack_require__(3);

  var widgetDeps = ['smoothScroll', 'autocompleteLhcMod'];
  if (Def._tooltip) widgetDeps = [Def._animate, Def._popover, Def._tooltip].concat(widgetDeps);else widgetDeps = ['ngAnimate', 'ui.bootstrap'].concat(widgetDeps);
  angular.module('lformsWidget', widgetDeps).config(['$animateProvider', function ($animateProvider) {
    $animateProvider.classNameFilter(/has-ng-animate/);
  }]).directive('lforms', function () {
    return {
      restrict: 'E',
      scope: {
        lfData: '=',
        // set a variable 'item' for 'lfData'
        // 'item' is used by some internal recursive directives
        item: '=lfData',
        lfOptions: '=?'
      },
      link: function link(scope, element, attributes) {
        // watch on data change
        scope.$watch("lfOptions", function (value) {
          if (scope.lfData && value) scope.lfData.setTemplateOptions(value);
        }, true); // watch on variable change

        scope.$watch("lfOptions", function (value) {
          if (scope.lfData && value) scope.lfData.setTemplateOptions(value);
        });
      },
      transclude: true,
      controller: 'LFormsCtrl',
      templateUrl: 'form-view.html'
    };
  });
})(); // Define the top-level namespace object


var LForms = {};
module.exports = LForms;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

var Def = {};
Def.PrototypeAPI = __webpack_require__(4);

__webpack_require__(5);

__webpack_require__(6)(Def);

__webpack_require__(7)(Def.PrototypeAPI.$, jQuery, Def);

__webpack_require__(8)(Def.PrototypeAPI, Def.Effect);

__webpack_require__(9)(Def.PrototypeAPI.$, Def);

__webpack_require__(10)(Def);

__webpack_require__(11)(Def);

__webpack_require__(12)(Def.PrototypeAPI.$, jQuery, Def);

__webpack_require__(13)(Def.PrototypeAPI.$, jQuery, Def);

__webpack_require__(14)(Def);

__webpack_require__(15)(Def.PrototypeAPI.$, jQuery, Def);

__webpack_require__(16)(Def.PrototypeAPI.$, jQuery, Def);

__webpack_require__(17)(Def.PrototypeAPI.$, jQuery, Def);

__webpack_require__(18)(Def.PrototypeAPI.$, jQuery, Def);

__webpack_require__(19)(Def);

module.exports = Def;

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

// Contains the subset of PrototypeJS APIs needed by this package, reimplemented
// using jQuery.
// Mostly copied (and modified) from the original PrototypeJS at
// http://prototypejs.org/
if (typeof Def === 'undefined') var Def = {};

Def.PrototypeAPI = function () {
  "use strict";

  var $break = {};
  /**
   *  Constructs and returns an array from the given iterable.
   */

  function $A(iterable) {
    if (!iterable) return [];
    if ('toArray' in Object(iterable)) return iterable.toArray();
    var length = iterable.length || 0,
        results = new Array(length);

    while (length--) {
      results[length] = iterable[length];
    }

    return results;
  }
  /**
   *  Returns the element with the given ID.
   * @param id the ID of the element.
   */


  function $(id) {
    var rtn = id; // "id" might be an element

    if (Def.PrototypeAPI.isString(id)) rtn = document.getElementById(id);
    return rtn;
  }

  var _toString = Object.prototype.toString;

  var Browser = function () {
    var ua = typeof navigator !== 'undefined' ? navigator.userAgent : false;
    var isOpera = Object.prototype.toString.call(window.opera) == '[object Opera]';
    return {
      IE: !!window.attachEvent && !isOpera,
      Opera: isOpera,
      WebKit: ua && ua.indexOf('AppleWebKit/') > -1,
      Gecko: ua && ua.indexOf('Gecko') > -1 && ua.indexOf('KHTML') === -1,
      MobileSafari: ua && /Apple.*Mobile/.test(ua)
    };
  }();
  /**
   *  Returns true if the given object is a function.
   */


  function isFunction(obj) {
    return _toString.call(obj) === '[object Function]';
  }
  /**
   *  Returns true if the given object is a string.
   */


  function isString(object) {
    return _toString.call(object) === '[object String]';
  }
  /**
   *  Returns true if the given object is an array.
   */


  function isArray(object) {
    return _toString.call(object) === '[object Array]';
  }
  /**
   *  Returns the argument names of the given function.
   * @param f the function
   */


  function functionArgumentNames(f) {
    var names = f.toString().match(/^[\s\(]*function[^(]*\(([^)]*)\)/)[1].replace(/\/\/.*?[\r\n]|\/\*(?:.|[\r\n])*?\*\//g, '').replace(/\s+/g, '').split(',');
    return names.length == 1 && !names[0] ? [] : names;
  }
  /**
   *  Copies properties of source into destination.
   * @return destination
   */


  function extend(destination, source) {
    for (var property in source) {
      destination[property] = source[property];
    }

    return destination;
  }
  /**
   *  An identity function
   * @return the object given.
   */


  function K(a) {
    return a;
  }
  /**
   *  A function for constructing a class.
   */


  var Class = function () {
    var IS_DONTENUM_BUGGY = function () {
      for (var p in {
        toString: 1
      }) {
        if (p === 'toString') return false;
      }

      return true;
    }();

    function subclass() {}

    ;

    function create() {
      var parent = null,
          properties = $A(arguments);
      if (isFunction(properties[0])) parent = properties.shift();

      function klass() {
        this.initialize.apply(this, arguments);
      }

      extend(klass, Class.Methods);
      klass.superclass = parent;
      klass.subclasses = [];

      if (parent) {
        subclass.prototype = parent.prototype;
        klass.prototype = new subclass();
        parent.subclasses.push(klass);
      }

      for (var i = 0, length = properties.length; i < length; i++) {
        klass.addMethods(properties[i]);
      }

      if (!klass.prototype.initialize) klass.prototype.initialize = function () {}; // empty function

      klass.prototype.constructor = klass;
      return klass;
    }

    function addMethods(source) {
      var ancestor = this.superclass && this.superclass.prototype,
          properties = Object.keys(source);

      if (IS_DONTENUM_BUGGY) {
        if (source.toString != Object.prototype.toString) properties.push("toString");
        if (source.valueOf != Object.prototype.valueOf) properties.push("valueOf");
      }

      for (var i = 0, length = properties.length; i < length; i++) {
        var property = properties[i],
            value = source[property];

        if (ancestor && isFunction(value) && functionArgumentNames(value)[0] == "$super") {
          var method = value;

          value = function (m) {
            return function () {
              return ancestor[m].apply(this, arguments);
            };
          }(property).wrap(method);

          value.valueOf = function (method) {
            return function () {
              return method.valueOf.call(method);
            };
          }(method);

          value.toString = function (method) {
            return function () {
              return method.toString.call(method);
            };
          }(method);
        }

        this.prototype[property] = value;
      }

      return this;
    }

    return {
      create: create,
      Methods: {
        addMethods: addMethods
      }
    };
  }(); // end of Class


  var Enumerable = function () {
    function each(iterator, context) {
      try {
        this._each(iterator, context);
      } catch (e) {
        if (e != $break) throw e;
      }

      return this;
    }

    function eachSlice(number, iterator, context) {
      var index = -number,
          slices = [],
          array = this.toArray();
      if (number < 1) return array;

      while ((index += number) < array.length) {
        slices.push(array.slice(index, index + number));
      }

      return slices.collect(iterator, context);
    }

    function all(iterator, context) {
      iterator = iterator || K;
      var result = true;
      this.each(function (value, index) {
        result = result && !!iterator.call(context, value, index, this);
        if (!result) throw $break;
      }, this);
      return result;
    }

    function any(iterator, context) {
      iterator = iterator || K;
      var result = false;
      this.each(function (value, index) {
        if (result = !!iterator.call(context, value, index, this)) throw $break;
      }, this);
      return result;
    }

    function collect(iterator, context) {
      iterator = iterator || K;
      var results = [];
      this.each(function (value, index) {
        results.push(iterator.call(context, value, index, this));
      }, this);
      return results;
    }

    function detect(iterator, context) {
      var result;
      this.each(function (value, index) {
        if (iterator.call(context, value, index, this)) {
          result = value;
          throw $break;
        }
      }, this);
      return result;
    }

    function findAll(iterator, context) {
      var results = [];
      this.each(function (value, index) {
        if (iterator.call(context, value, index, this)) results.push(value);
      }, this);
      return results;
    }

    function grep(filter, iterator, context) {
      iterator = iterator || K;
      var results = [];
      if (Def.PrototypeAPI.isString(filter)) filter = new RegExp(RegExp.escape(filter));
      this.each(function (value, index) {
        if (filter.match(value)) results.push(iterator.call(context, value, index, this));
      }, this);
      return results;
    }

    function include(object) {
      if (isFunction(this.indexOf) && this.indexOf(object) != -1) return true;
      var found = false;
      this.each(function (value) {
        if (value == object) {
          found = true;
          throw $break;
        }
      });
      return found;
    }

    function inGroupsOf(number, fillWith) {
      fillWith = Object.isUndefined(fillWith) ? null : fillWith;
      return this.eachSlice(number, function (slice) {
        while (slice.length < number) {
          slice.push(fillWith);
        }

        return slice;
      });
    }

    function inject(memo, iterator, context) {
      this.each(function (value, index) {
        memo = iterator.call(context, memo, value, index, this);
      }, this);
      return memo;
    }

    function invoke(method) {
      var args = $A(arguments).slice(1);
      return this.map(function (value) {
        return value[method].apply(value, args);
      });
    }

    function max(iterator, context) {
      iterator = iterator || K;
      var result;
      this.each(function (value, index) {
        value = iterator.call(context, value, index, this);
        if (result == null || value >= result) result = value;
      }, this);
      return result;
    }

    function min(iterator, context) {
      iterator = iterator || K;
      var result;
      this.each(function (value, index) {
        value = iterator.call(context, value, index, this);
        if (result == null || value < result) result = value;
      }, this);
      return result;
    }

    function partition(iterator, context) {
      iterator = iterator || K;
      var trues = [],
          falses = [];
      this.each(function (value, index) {
        (iterator.call(context, value, index, this) ? trues : falses).push(value);
      }, this);
      return [trues, falses];
    }

    function pluck(property) {
      var results = [];
      this.each(function (value) {
        results.push(value[property]);
      });
      return results;
    }

    function reject(iterator, context) {
      var results = [];
      this.each(function (value, index) {
        if (!iterator.call(context, value, index, this)) results.push(value);
      }, this);
      return results;
    }

    function sortBy(iterator, context) {
      return this.map(function (value, index) {
        return {
          value: value,
          criteria: iterator.call(context, value, index, this)
        };
      }, this).sort(function (left, right) {
        var a = left.criteria,
            b = right.criteria;
        return a < b ? -1 : a > b ? 1 : 0;
      }).pluck('value');
    }

    function toArray() {
      return this.map();
    }

    function zip() {
      var args = $A(arguments);
      var collections = [this].concat(args).map($A);
      return this.map(function (value, index) {
        var rtn = [];

        for (var i = 0, len = collections.length; i < len; ++i) {
          rtn.push(collections[i][index]);
        }

        return rtn;
      });
    }

    function size() {
      return this.toArray().length;
    }

    function inspect() {
      return '#<Enumerable:' + this.toArray().inspect() + '>';
    }

    return {
      each: each,
      eachSlice: eachSlice,
      all: all,
      every: all,
      any: any,
      some: any,
      collect: collect,
      map: collect,
      detect: detect,
      findAll: findAll,
      select: findAll,
      filter: findAll,
      grep: grep,
      include: include,
      member: include,
      inGroupsOf: inGroupsOf,
      inject: inject,
      invoke: invoke,
      max: max,
      min: min,
      partition: partition,
      pluck: pluck,
      reject: reject,
      sortBy: sortBy,
      toArray: toArray,
      entries: toArray,
      zip: zip,
      size: size,
      inspect: inspect,
      find: detect
    };
  }(); // End of Enumerable

  /**
   *  A modified toQueryParams that takes the search part of a URL and returns a
   *  hash of the parameters.
   */


  function toQueryParams(search) {
    var separator = '&';
    var match = search.trim().match(/([^?#]*)(#.*)?$/);
    if (!match) return {};
    var keyValPairs = match[1].split(separator || '&');
    var rtn = {};

    for (var i = 0, len = keyValPairs.length; i < len; ++i) {
      var pair = keyValPairs[i];

      if ((pair = pair.split('='))[0]) {
        var key = decodeURIComponent(pair.shift()),
            value = pair.length > 1 ? pair.join('=') : pair[0];

        if (value != undefined) {
          value = value.gsub('+', ' ');
          value = decodeURIComponent(value);
        }

        if (key in hash) {
          if (!this.isArray(hash[key])) hash[key] = [hash[key]];
          hash[key].push(value);
        } else hash[key] = value;
      }
    }

    return rtn;
  }
  /**
   *  Escapes a string for safe use as an HTML attribute.
   * @param val the string to be escaped
   * @return the escaped version of val
   */


  function escapeAttribute(val) {
    // Note:  PrototypeJS' escapeHTML does not escape quotes, and for
    // attributes quotes need to be escaped.
    // JQuery does not provide an API for this at all.
    //   (See:  http://bugs.jquery.com/ticket/11773)
    // Various implementations are benchmarked here:
    //   http://jsperf.com/htmlencoderegex
    // This one is the fastest (at least in Chrome).
    return val.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/'/g, '&#39;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }
  /* A namespace for the style-related functions */


  var Styles = {
    /* See PrototypeJS API */
    setOpacity: function setOpacity(element, value) {
      element = $(element);
      if (value == 1 || value === '') value = '';else if (value < 0.00001) value = 0;
      element.style.opacity = value;
      return element;
    },

    /* See PrototypeJS API */
    setStyle: function setStyle(element, styles) {
      element = $(element);
      var elementStyle = element.style,
          match;

      if (Def.PrototypeAPI.isString(styles)) {
        elementStyle.cssText += ';' + styles;

        if (styles.include('opacity')) {
          var opacity = styles.match(/opacity:\s*(\d?\.?\d*)/)[1];
          Def.PrototypeAPI.setOpacity(element, opacity);
        }

        return element;
      }

      for (var property in styles) {
        if (property === 'opacity') {
          Def.PrototypeAPI.setOpacity(element, styles[property]);
        } else {
          var value = styles[property];

          if (property === 'float' || property === 'cssFloat') {
            property = elementStyle.styleFloat === undefined ? 'cssFloat' : 'styleFloat';
          }

          elementStyle[property] = value;
        }
      }

      return element;
    },

    /* See PrototypeJS API */
    getStyle: function getStyle(element, style) {
      element = $(element); // style = normalizeStyleName(style);

      var value = element.style[style];

      if (!value || value === 'auto') {
        var css = document.defaultView.getComputedStyle(element, null);
        value = css ? css[style] : null;
      }

      if (style === 'opacity') return value ? parseFloat(value) : 1.0;
      return value === 'auto' ? null : value;
    },

    /**
     *  Stores data about an element
     /* See PrototypeJS API */
    makePositioned: function makePositioned(element) {
      element = $(element);
      var position = Def.PrototypeAPI.getStyle(element, 'position'),
          styles = {};

      if (position === 'static' || !position) {
        styles.position = 'relative';

        if (Def.PrototypeAPI.Browser.Opera) {
          styles.top = 0;
          styles.left = 0;
        }

        Def.PrototypeAPI.setStyle(element, styles);
        jQuery(element).data('prototype_made_positioned', true);
      }

      return element;
    },

    /* See PrototypeJS API */
    undoPositioned: function undoPositioned(element) {
      element = $(element);
      var jqElem = jQuery(element);
      var madePositioned = jqElem.data('prototype_made_positioned');

      if (madePositioned) {
        jqElem.removeData('prototype_made_positioned');
        Def.PrototypeAPI.setStyle(element, {
          position: '',
          top: '',
          bottom: '',
          left: '',
          right: ''
        });
      }

      return element;
    }
  }; // Styles

  return {
    $: $,
    Class: Class,
    Enumerable: Enumerable,
    isString: isString,
    isArray: isArray,
    Browser: Browser,
    parseQuery: toQueryParams,
    escapeHTML: escapeAttribute,
    escapeAttribute: escapeAttribute,
    getStyle: Styles.getStyle,
    setStyle: Styles.setStyle,
    makePositioned: Styles.makePositioned,
    undoPositioned: Styles.undoPositioned,
    $A: $A
  };
}();

if (true) module.exports = Def.PrototypeAPI;

/***/ }),
/* 5 */
/***/ (function(module, exports) {

// Needed polyfills.
// Object.assign
// From
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/assign#Polyfill
if (typeof Object.assign != 'function') {
  (function () {
    Object.assign = function (target) {
      'use strict'; // We must check against these specific cases.

      if (target === undefined || target === null) {
        throw new TypeError('Cannot convert undefined or null to object');
      }

      var output = Object(target);

      for (var index = 1; index < arguments.length; index++) {
        var source = arguments[index];

        if (source !== undefined && source !== null) {
          for (var nextKey in source) {
            if (source.hasOwnProperty(nextKey)) {
              output[nextKey] = source[nextKey];
            }
          }
        }
      }

      return output;
    };
  })();
} // String.trimLeft
// There is no standard yet for trimLeft, so to ensure consistent behavior, I am
// ignoring the trimLeft implemented in Chrome and Firefox (which could behave
// differently).


String.prototype.trimLeft = function () {
  // From:  http://stackoverflow.com/a/1593909/360782
  var start = -1;

  while (this.charCodeAt(++start) < 33) {
    ;
  }

  return this.slice(start, this.length);
};

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

// A replacement for the parts of jQuery (right now just jQuery UI) needed by
// the autocomplete-lhc package.  Parts of what is below may be borrowed from
// jQuery, which is under the MIT license.
(function () {
  function initJqueryLite(Def) {
    Def.jqueryLite = function () {
      "use strict";

      return {
        ui: {
          keyCode: {
            BACKSPACE: 8,
            COMMA: 188,
            DELETE: 46,
            DOWN: 40,
            END: 35,
            ENTER: 13,
            ESCAPE: 27,
            HOME: 36,
            LEFT: 37,
            PAGE_DOWN: 34,
            PAGE_UP: 33,
            PERIOD: 190,
            RIGHT: 39,
            SPACE: 32,
            TAB: 9,
            UP: 38
          }
        }
      };
    }(); // Eventually, but not yet, we'll try to replace jQuery entirely.  For now, just copy in the above.


    Object.assign(jQuery, Def.jqueryLite);
  }

  if (true) module.exports = initJqueryLite;else {}
})();

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

// A subset of Scriptaculous' effects.js code needed by this package, with
// modifications.
// See http://script.aculo.us/ for Scriptaculous, whose license is the following
// MIT-style license:
//
// Copyright © 2005-2008 Thomas Fuchs (http://script.aculo.us, http://mir.aculo.us)
//
// Permission is hereby granted, free of charge, to any person obtaining
// a copy of this software and associated documentation files (the
// “Software”), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to
// permit persons to whom the Software is furnished to do so, subject to
// the following conditions:
//
// The above copyright notice and this permission notice shall be
// included in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED “AS IS”, WITHOUT WARRANTY OF ANY KIND,
// EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
// NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
// LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
// OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
// WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
if (typeof Def === 'undefined') var Def = {};

(function () {
  function initEffects($, jQuery, Def) {
    "use strict";

    var Class = Def.PrototypeAPI.Class;
    var Enumerable = Def.PrototypeAPI.Enumerable;
    var $A = Def.PrototypeAPI.$A;
    var isString = Def.PrototypeAPI.isString;
    var Effect = {
      _elementDoesNotExistError: {
        name: 'ElementDoesNotExistError',
        message: 'The specified DOM element does not exist, but is required for this effect to operate'
      },
      Transitions: {
        linear: function linear(a) {
          return a;
        },
        // identity function
        sinoidal: function sinoidal(pos) {
          return -Math.cos(pos * Math.PI) / 2 + .5;
        },
        reverse: function reverse(pos) {
          return 1 - pos;
        },
        flicker: function flicker(pos) {
          var pos = -Math.cos(pos * Math.PI) / 4 + .75 + Math.random() / 4;
          return pos > 1 ? 1 : pos;
        },
        wobble: function wobble(pos) {
          return -Math.cos(pos * Math.PI * (9 * pos)) / 2 + .5;
        },
        pulse: function pulse(pos, pulses) {
          return -Math.cos(pos * ((pulses || 5) - .5) * 2 * Math.PI) / 2 + .5;
        },
        spring: function spring(pos) {
          return 1 - Math.cos(pos * 4.5 * Math.PI) * Math.exp(-pos * 6);
        },
        none: function none(pos) {
          return 0;
        },
        full: function full(pos) {
          return 1;
        }
      },
      DefaultOptions: {
        duration: 1.0,
        // seconds
        fps: 100,
        // 100= assume 66fps max.
        sync: false,
        // true for combining
        from: 0.0,
        to: 1.0,
        delay: 0.0,
        queue: 'parallel'
      }
    };
    Effect.DefaultOptions.transition = Effect.Transitions.sinoidal; // --- Queues ---

    Effect.ScopedQueue = Class.create(Enumerable, {
      initialize: function initialize() {
        this.effects = [];
        this.interval = null;
      },
      _each: function _each(iterator) {
        this.effects._each(iterator);
      },
      add: function add(effect) {
        var timestamp = new Date().getTime();
        var position = isString(effect.options.queue) ? effect.options.queue : effect.options.queue.position;

        switch (position) {
          case 'front':
            // move unstarted effects after this effect
            this.effects.findAll(function (e) {
              return e.state == 'idle';
            }).each(function (e) {
              e.startOn += effect.finishOn;
              e.finishOn += effect.finishOn;
            });
            break;

          case 'with-last':
            timestamp = this.effects.pluck('startOn').max() || timestamp;
            break;

          case 'end':
            // start effect after last queued effect has finished
            timestamp = this.effects.pluck('finishOn').max() || timestamp;
            break;
        }

        effect.startOn += timestamp;
        effect.finishOn += timestamp;
        if (!effect.options.queue.limit || this.effects.length < effect.options.queue.limit) this.effects.push(effect);
        if (!this.interval) this.interval = setInterval(jQuery.proxy(this.loop, this), 15);
      },
      remove: function remove(effect) {
        var i;

        while ((i = this.effects.indexOf(effect)) > -1) {
          this.effects.splice(i, 1);
        }

        if (this.effects.length == 0) {
          clearInterval(this.interval);
          this.interval = null;
        }
      },
      loop: function loop() {
        var timePos = new Date().getTime();

        for (var i = 0, len = this.effects.length; i < len; i++) {
          this.effects[i] && this.effects[i].loop(timePos);
        }
      }
    });
    Effect.Queues = {
      instances: {},
      get: function get(queueName) {
        if (!isString(queueName)) return queueName;
        return this.instances[queueName] || (this.instances[queueName] = new Effect.ScopedQueue());
      }
    };
    Effect.Queue = Effect.Queues.get('global'); // --- End of code for Queues ---

    Effect.Base = Class.create({
      position: null,
      start: function start(options) {
        if (options && options.transition === false) options.transition = Effect.Transitions.linear;
        this.options = jQuery.extend(jQuery.extend({}, Effect.DefaultOptions), options || {});
        this.currentFrame = 0;
        this.state = 'idle';
        this.startOn = this.options.delay * 1000;
        this.finishOn = this.startOn + this.options.duration * 1000;
        this.fromToDelta = this.options.to - this.options.from;
        this.totalTime = this.finishOn - this.startOn;
        this.totalFrames = this.options.fps * this.options.duration;

        this.render = function () {
          function dispatch(effect, eventName) {
            if (effect.options[eventName + 'Internal']) effect.options[eventName + 'Internal'](effect);
            if (effect.options[eventName]) effect.options[eventName](effect);
          }

          return function (pos) {
            if (this.state === "idle") {
              this.state = "running";
              dispatch(this, 'beforeSetup');
              if (this.setup) this.setup();
              dispatch(this, 'afterSetup');
            }

            if (this.state === "running") {
              pos = this.options.transition(pos) * this.fromToDelta + this.options.from;
              this.position = pos;
              dispatch(this, 'beforeUpdate');
              if (this.update) this.update(pos);
              dispatch(this, 'afterUpdate');
            }
          };
        }();

        this.event('beforeStart');
        if (!this.options.sync) Effect.Queues.get(isString(this.options.queue) ? 'global' : this.options.queue.scope).add(this);
      },
      loop: function loop(timePos) {
        if (timePos >= this.startOn) {
          if (timePos >= this.finishOn) {
            this.render(1.0);
            this.cancel();
            this.event('beforeFinish');
            if (this.finish) this.finish();
            this.event('afterFinish');
            return;
          }

          var pos = (timePos - this.startOn) / this.totalTime,
              frame = Math.round(pos * this.totalFrames);

          if (frame > this.currentFrame) {
            this.render(pos);
            this.currentFrame = frame;
          }
        }
      },
      cancel: function cancel() {
        if (!this.options.sync) Effect.Queues.get(isString(this.options.queue) ? 'global' : this.options.queue.scope).remove(this);
        this.state = 'finished';
      },
      event: function event(eventName) {
        if (this.options[eventName + 'Internal']) this.options[eventName + 'Internal'](this);
        if (this.options[eventName]) this.options[eventName](this);
      },
      inspect: function inspect() {
        var data = $H();

        for (property in this) {
          if (!Object.isFunction(this[property])) data.set(property, this[property]);
        }

        return '#<Effect:' + data.inspect() + ',options:' + $H(this.options).inspect() + '>';
      }
    });
    Effect.Move = Class.create(Effect.Base, {
      initialize: function initialize(element) {
        this.element = $(element);
        if (!this.element) throw Effect._elementDoesNotExistError;
        var options = jQuery.extend({
          x: 0,
          y: 0,
          mode: 'relative'
        }, arguments[1] || {});
        this.start(options);
      },
      setup: function setup() {
        Def.PrototypeAPI.makePositioned(this.element);
        var dpapi = Def.PrototypeAPI;
        this.originalLeft = parseFloat(dpapi.getStyle(this.element, 'left') || '0');
        this.originalTop = parseFloat(dpapi.getStyle(this.element, 'top') || '0');

        if (this.options.mode == 'absolute') {
          this.options.x = this.options.x - this.originalLeft;
          this.options.y = this.options.y - this.originalTop;
        }
      },
      update: function update(position) {
        Def.PrototypeAPI.setStyle(this.element, {
          left: Math.round(this.options.x * position + this.originalLeft) + 'px',
          top: Math.round(this.options.y * position + this.originalTop) + 'px'
        });
      }
    });

    Effect.Shake = function (element) {
      element = $(element);
      var options = jQuery.extend({
        distance: 20,
        duration: 0.5
      }, arguments[1] || {});
      var distance = parseFloat(options.distance);
      var split = parseFloat(options.duration) / 10.0;
      var offset = jQuery(element).offset();
      var dpapi = Def.PrototypeAPI;
      var oldStyle = {
        top: offset.top,
        left: offset.left
      };
      return new Effect.Move(element, {
        x: distance,
        y: 0,
        duration: split,
        afterFinishInternal: function afterFinishInternal(effect) {
          new Effect.Move(effect.element, {
            x: -distance * 2,
            y: 0,
            duration: split * 2,
            afterFinishInternal: function afterFinishInternal(effect) {
              new Effect.Move(effect.element, {
                x: distance * 2,
                y: 0,
                duration: split * 2,
                afterFinishInternal: function afterFinishInternal(effect) {
                  new Effect.Move(effect.element, {
                    x: -distance * 2,
                    y: 0,
                    duration: split * 2,
                    afterFinishInternal: function afterFinishInternal(effect) {
                      new Effect.Move(effect.element, {
                        x: distance * 2,
                        y: 0,
                        duration: split * 2,
                        afterFinishInternal: function afterFinishInternal(effect) {
                          new Effect.Move(effect.element, {
                            x: -distance,
                            y: 0,
                            duration: split,
                            afterFinishInternal: function afterFinishInternal(effect) {
                              dpapi.setStyle(dpapi.undoPositioned(effect.element), oldStyle);
                            }
                          });
                        }
                      });
                    }
                  });
                }
              });
            }
          });
        }
      });
    };

    Def.Effect = Effect;
  }

  if (true) module.exports = initEffects;else {}
})();

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

// These two methods are based on code from the web page (but don't use this URL, as it seems to have been
// taken over by some advertising company):
// http://www.garyharan.com/index.php/2007/11/26/how-to-unobtrusively-scroll-a-div-with-prototype-scriptaculous/
// They introduce a scrolling effect that can scroll to x and y coordinates
// instead of an element, and can scroll a div as well as a window.
// Wrap the definitions in a function to protect our version of global variables
(function () {
  function initEffectScroll(PrototypeAPI, Effect) {
    "use strict";

    var Class = PrototypeAPI.Class;
    var $ = PrototypeAPI.$;
    /**
     *  Sets the scroll position within an element.
     * @param element the element whose contents are being scrolled.
     * @param left the new horizontal scroll position
     * @param top the new vertical scroll position
     */

    function scrollTo(element, left, top) {
      var element = $(element);

      if (arguments.length == 1) {
        var pos = element.cumulativeOffset();
        window.scrollTo(pos[0], pos[1]);
      } else {
        element.scrollLeft = left;
        element.scrollTop = top;
      }

      return element;
    }

    ;
    Effect.Scroll = Class.create();
    jQuery.extend(jQuery.extend(Effect.Scroll.prototype, Effect.Base.prototype), {
      /**
       *  Returns the current scroll position of element.
       */
      currentScrollPos: function currentScrollPos(element) {
        // Store the current scroll position.  This used to be done in setup, but
        // in Chrome, the scroll position sometimes shifts (when a field is getting
        // focused) between initialize and setup.
        var scrollOffsets;
        if (this.element === window) scrollOffsets = document.viewport.getScrollOffsets();else {
          // Work around bug in Chrome (see comments in update).
          if (this.element === document.documentElement && document.documentElement.scrollTop === 0 && document.documentElement.scrollLeft === 0) {
            scrollOffsets = {
              left: document.body.scrollLeft,
              top: document.body.scrollTop
            };
          } else scrollOffsets = {
            left: this.element.scrollLeft,
            top: this.element.scrollTop
          };
        }
        return scrollOffsets;
      },
      initialize: function initialize(element) {
        this.element = $(element);
        if (!this.element) throw Effect._elementDoesNotExistError; // Capture the target location.

        var originalScrollPos = this.currentScrollPos(element);
        var shift = jQuery.extend({
          x: 0,
          y: 0
        }, arguments[1] || {});
        var targetPos = {
          x: originalScrollPos.left + shift.x,
          y: originalScrollPos.top + shift.y
        };
        this.start(targetPos);
      },
      setup: function setup() {},
      update: function update(pos) {
        // Recalcaute the current scroll position in case it has changed.  (The
        // browser also tries to scroll to fields on focus events.)
        var current = this.currentScrollPos(this.element);
        var left = Math.round((this.options.x - current.left) * pos + current.left);
        var top = Math.round((this.options.y - current.top) * pos + current.top);
        scrollTo(this.element, left, top); // Work around a bug in Chrome.  For chrome, if document.documentElement is
        // being scrolled, we need instead to set the scroll position on
        // document.body.
        // See https://code.google.com/p/chromium/issues/detail?id=157855
        // https://code.google.com/p/chromium/issues/detail?id=345592
        // https://code.google.com/p/chromium/issues/detail?id=342307

        if (this.element === document.documentElement) scrollTo(document.body, left, top);
      }
    });
  }

  if (true) module.exports = initEffectScroll;else {}
})();

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

// Based on:  https://github.com/kangax/protolicious/blob/5b56fdafcd7d7662c9d648534225039b2e78e371/event.simulate.js
// (MIT License)

/**
 * Event.simulate(@element, eventName[, options]) -> Element
 *
 * - @element: element to fire event on
 * - eventName: name of event to fire (only MouseEvents and HTMLEvents interfaces are supported)
 * - options: optional object to fine-tune event properties - pointerX, pointerY, ctrlKey, etc.
 *
 *    $('foo').simulate('click'); // => fires "click" event on an element with id=foo
 *
 **/
(function () {
  function initSimulate($, Def) {
    "use strict";

    var eventMatchers = {
      'HTMLEvents': /^(?:load|unload|abort|error|select|change|submit|reset|focus|blur|resize|scroll)$/,
      'MouseEvents': /^(?:click|mouse(?:down|up|over|move|out))$/
    };
    var defaultOptions = {
      pointerX: 0,
      pointerY: 0,
      button: 0,
      ctrlKey: false,
      altKey: false,
      shiftKey: false,
      metaKey: false,
      bubbles: true,
      cancelable: true
    };
    Def.Event = {};

    Def.Event.simulate = function (element, eventName) {
      var options = jQuery.extend(defaultOptions, arguments[2] || {});
      var oEvent,
          eventType = null;
      element = $(element);

      for (var name in eventMatchers) {
        if (eventMatchers[name].test(eventName)) {
          eventType = name;
          break;
        }
      }

      if (!eventType) throw new SyntaxError('Only HTMLEvents and MouseEvents interfaces are supported');

      if (document.createEvent) {
        oEvent = document.createEvent(eventType);

        if (eventType == 'HTMLEvents') {
          oEvent.initEvent(eventName, options.bubbles, options.cancelable);
        } else {
          oEvent.initMouseEvent(eventName, options.bubbles, options.cancelable, document.defaultView, options.button, options.pointerX, options.pointerY, options.pointerX, options.pointerY, options.ctrlKey, options.altKey, options.shiftKey, options.metaKey, options.button, element);
        }

        element.dispatchEvent(oEvent);
      } else {
        options.clientX = options.pointerX;
        options.clientY = options.pointerY;
        oEvent = jQuery.extend(document.createEventObject(), options);
        element.fireEvent('on' + eventName, oEvent);
      }

      return element;
    };
  }

  if (true) module.exports = initSimulate;else {}
})();

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

if (typeof Def === 'undefined') var Def = {};

(function () {
  function initObservable(Def) {
    "use strict";
    /*
     *  This is a mix-in for objects/classes that want to provide hooks for
     *  custom events.  See Def.Autocompleter.Event for an example of the usage.
     *  The methods here are not meant to be called directly by code that wants
     *  to register a callback.  Instead, the class that extends this one can
     *  provide observe[Event Name] methods that call storeCallback.
     */

    Def.Observable = {
      /**
       *  Storage of callback functions.  Null means there are no callbacks
       *  registered.
       */
      callbacks_: null,

      /**
       *  Runs the callbacks for the given event.  (This is meant for internal
       *  use by the autocompleter code; other code should not call it.)
       *  The callbacks are run in a timeout so that normal operation of the
       *  autocompleter can continue.
       * @param field the field on which the event occurred.  This
       *  can be null for certain types of events (for which storeCallback
       *  was called with null).
       * @param eventType the type of event (e.g. 'LIST_EXP' for list expansions)
       * @param data a hash containing an event-specific data structure.  See the
       *  relevant "observe..." method for the details of what callbacks can expect.
       */
      notifyObservers: function notifyObservers(field, eventType, data) {
        if (this.callbacks_ !== null) {
          data['field_id'] = field ? field.id : null;
          setTimeout(function () {
            var eventCallbacks = this.callbacks_[eventType];

            if (eventCallbacks !== undefined) {
              if (field !== null) {
                var key = this.lookupKey(field);
                var fieldEventCallbacks = eventCallbacks[key];
              } // Also get the callbacks that apply to all fields


              var allFieldEventCallbacks = eventCallbacks[null];
              var allCallbacks = [fieldEventCallbacks, allFieldEventCallbacks];

              for (var j = 0, maxJ = allCallbacks.length; j < maxJ; ++j) {
                var callbackArray = allCallbacks[j];

                if (callbackArray !== undefined) {
                  for (var i = 0, c = callbackArray.length; i < c; ++i) {
                    callbackArray[i].call(this, data);
                  }
                }
              }
            }
          }.bind(this));
        }
      },

      /**
       *  Returns a lookup key for finding callbacks for the given field.
       *  This is overridable.  By default it returns the field's name (or if
       *  that is not present, the ID, but it
       *  could be something more general, e.g. a part of a field's ID that is shared
       *  by several fields so that an event observer can be easily registered on a
       *  set of similar fields.
       * @param field the field for which the lookup key is needed.
       */
      lookupKey: function lookupKey(field) {
        return field.name || field.id;
      },

      /**
       *  Stores a callback function.  (This is meant for internal
       *  use by the classes that extend Observable; other code should not call it.)
       * @param fieldLookupKey the lookup key for the field which the callback is
       *  registered.  This could be the output of the lookupKey function.  If null
       *  is passed, the callback will be called anytime the event occurs on any
       *  field.
       * @param eventType The type of event for which the callback is to be called
       * @param callback the callback function
       */
      storeCallback: function storeCallback(fieldLookupKey, eventType, callback) {
        if (this.callbacks_ === null) this.callbacks_ = {};
        var listExpCallbacks = this.callbacks_[eventType];

        if (listExpCallbacks === undefined) {
          listExpCallbacks = {};
          this.callbacks_[eventType] = listExpCallbacks;
        }

        var fieldListExpCallbacks = listExpCallbacks[fieldLookupKey];

        if (fieldListExpCallbacks === undefined) {
          fieldListExpCallbacks = [];
          listExpCallbacks[fieldLookupKey] = fieldListExpCallbacks;
        }

        fieldListExpCallbacks.push(callback);
      },

      /**
       *  Removes a callback function that was previously registered.
       * @param fieldLookupKey the lookup key for the field which the callback is
       *  registered.  This could be the output of the lookupKey function.
       * @param eventType The type of event for which the callback is to be called
       * @param callback the callback function to be removed
       */
      removeCallback: function removeCallback(fieldLookupKey, eventType, callback) {
        if (this.callbacks_ !== null) {
          var typeCallbacks = this.callbacks_[eventType];

          if (typeCallbacks !== undefined) {
            var fieldCallbacks = typeCallbacks[fieldLookupKey];

            if (fieldCallbacks !== undefined) {
              var callbackIndex = fieldCallbacks.indexOf(callback);

              if (callbackIndex > -1) {
                fieldCallbacks.splice(callbackIndex, 1);
              }
            }
          }
        }
      }
    };
  }

  ;
  if (true) module.exports = initObservable;else {}
})();

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

(function () {
  function defineSCR(Def) {
    "use strict";
    /**
     *  This manages a log meant to be used in assisting users with screen readers.
     *  For backwards compatibility, in addition to the constructor,
     *  Def.ScreenReaderLog.add(msg) will log msg to a DOM element with id
     *  "reader_log".  However, that usage is deprecated.
     *  Current usage:  var myLog = new Def.ScreenReaderLog(); myLog.add(msg);
     * @param logID (optional) the ID of the DOM element to use for the log
     */

    Def.ScreenReaderLog = function (logID) {
      if (logID === undefined) {
        // Create a new log element
        var baseID = 'reader_log';
        var logID = baseID;
        var counter = 1;

        while (document.getElementById(logID)) {
          logID = baseID + ++counter;
        }

        this.logElement_ = document.createElement('div');
        this.logElement_.setAttribute('id', logID);
        document.body.appendChild(this.logElement_);
      } else this.logElement_ = document.getElementById(logID);

      this.logElement_.setAttribute('aria-live', 'assertive');
      this.logElement_.setAttribute('aria-relevant', 'additions');
      this.logElement_.setAttribute('role', 'log');
      this.logElement_.setAttribute('class', 'screen_reader_only');
    };

    Def.ScreenReaderLog.prototype = {
      /**
       *  Adds some text to the log to be read by the screen reader.
       * @param text the text to be read (hopefully immediately).  Note that at
       *  least with JAWS, sometimes the text isn't read if other things are
       *  happening at the same time.
       */
      add: function add(text) {
        // In Firefox, we can just append the text as a text node.  In IE 9, if
        // you do that, it reads the log text from the beginning with each add.
        // Putting each entry in p tags solves that, and still works okay in
        // Firefox.
        var p = document.createElement('p');
        p.appendChild(document.createTextNode(text));
        this.logElement_.appendChild(p);
      }
    }; // For backwards compatibility, include a static method

    /**
     *  Adds some text to the log to be read by the screen reader.
     * @param text the text to be read (hopefully immediately).  Note that at
     *  least with JAWS, sometimes the text isn't read if other things are
     *  happening at the same time.
     */

    Def.ScreenReaderLog.add = function (text) {
      if (!this.log_) this.log_ = new Def.ScreenReaderLog('reader_log');
      this.log_.add(text);
    };
  }

  if (true) module.exports = defineSCR;else {}
})();

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

if (typeof Def === 'undefined') var Def = {};

(function () {
  // Wrap the definitions in a function to protect our version of global variables
  function defineRDR($, jQuery, Def) {
    "use strict";

    var Class = Def.PrototypeAPI.Class;
    /**
     *  This class handles data requests that some fields (just autocompleting
     *  fields, at present) make to retrieve additional information about a record
     *  specified by the field's value (perhaps in combination with other field
     *  values).  The class relies on the data_req_input parameter for a field
     *  to know which fields need to be sent along with value of the field
     *  making the request.  It also relies on the data_req_output parameter
     *  to know what fields are populated from a request's return data.
     */

    Def.RecordDataRequester = Class.create();
    var tmp = {
      /**
       *  The HTML DOM form field element for which this instance
       *  will be retrieving additional data.
       */
      formField_: null,

      /**
       *  The code field (if present) associated with formField_
       */
      codeField_: null,

      /**
       *  The URL for getting additional data.
       */
      dataURL_: null,

      /**
       *  This is an array of target field names (e.g. patient_name) of fields whose
       *  values should be sent along with the formField's value when sending the
       *  request for additional data.  They are sent in the URL created for the
       *  ajax request, in the form fieldname=fieldvalue.
       */
      dataReqInput_: null,

      /**
       *  This is an array of target field names (e.g. patient_name) of fields whose
       *  values will be filled in following a data request.
       */
      dataReqOutput_: null,

      /**
       *  A hash of dataReqInput_ values (target field names) to
       *  the corresponding field objects.
       */
      inputFieldsHash_: null,

      /**
       *  A hash of dataReqOutput_ values (target field names) to
       *  arrays of the corresponding field objects.
       *
       *  Note that there can be more than one output field per target field
       *  name, as in the fetch rule form.  This would usually be when writing
       *  a value for a field in a horizontal table, where multiple lines exist and
       *  the field in each line must be updated.
       */
      outputFieldsHash_: null,

      /**
       *  It is important for the assignListData method to know whether this
       *  RecordDataRequester (RDR) has been previously used to fetch data.
       *  This keeps track of that.
       */
      noPriorDataReq_: true,

      /**
       *  The latest pending Ajax request (if any).
       */
      latestPendingAjaxRequest_: null,

      /**
       *  The field value at the time of the last data request.
       */
      lastFieldVal_: null,

      /**
       *  The hash of data returned in response to the last data request
       *  (made by this RecordDataRequester).
       */
      lastDataHash_: null,

      /**
       *  true if the output fields all in the same group as formField.  In this
       *  case, we can cache the output fields.
       */
      outputToSameGroup_: null,

      /*
       * a hash of hashes that represent the fields that should be checked
       * for list updating when the value of the field changes.  Each hash
       * key represents an output field - which should be one of the field
       * names in the outputFieldsHash_.  The value of each hash element should
       * be a hash whose key is a condition string and whose value is the
       * autocompleter whose list should be updated if the condition is met.
       *
       * autoCompUpdateList_{outputFieldA: {update_condition_a: [ac1,ac2,ac3,ac4],
       *                                    update_condition_b: [ac5,ac6]},
       *                     outputFieldB: {update_condition_c: [ac10],
       *                                    update_condition_d: [ac20,ac2]} }
       */
      autoCompUpdateList_: null,

      /**
       *  The class constructor.
       * @param formField The HTML DOM form field element for which this instance
       *  will be retrieving additional data.
       * @param dataURL The URL for getting additional data.
       * @param dataReqInput This is an array of
       *  target field names (e.g. patient_name) of fields whose values should be
       *  sent along with the formField's value when sending the request
       *  for additional data.  This may be null.
       * @param dataReqOutput This is an array of
       *  target field names (e.g. patient_name) of fields whose values will
       *  be filled in following a data request.
       * @param outputToSameGroup true if the output fields all in the same
       *  group as formField.  In this case, we can cache the output
       *  fields.
       */
      initialize: function initialize(formField, dataURL, dataReqInput, dataReqOutput, outputToSameGroup) {
        this.formField_ = formField;
        this.dataURL_ = dataURL;
        this.dataReqInput_ = dataReqInput;
        this.dataReqOutput_ = dataReqOutput;
        this.outputToSameGroup_ = outputToSameGroup;
        this.setOutputNamesToRDRNames(formField, dataReqOutput);
      },

      /**
       *  This sets the mapping between the field that "owns" this
       *  RecordDataRequester and the field(s) that should get the
       *  output from it.  The mapping is maintained in the
       *  Def.RecordDataRequester.outputFieldNameToRDRFieldName_ hash.
       *
       *  This was originally part of the initialize function.  However, we
       *  have a case (and will probably have more) where a field's list can
       *  come from more than one field's RDR.  So this was broken out from
       *  the initialize function and is called there AND is also called
       *  when a list is passed to an autocompleter.  That way the field that
       *  gets its list from multiple fields will get the latest list created.
       *
       *  @param formField the form field that owns this RDR
       *  @param dataReqOutput the dataReqOutput list to use to get the
       *   output fields.  These will always be target field names - without
       *   the prefix and suffix.
       */
      setOutputNamesToRDRNames: function setOutputNamesToRDRNames(formField, dataReqOutput) {
        // Initialize this RDR's entries in outputFieldNameToRDRFieldName_.
        // (See the declaration of this hash map below.)
        var rdrTargetField = Def.Autocompleter.getFieldLookupKey(formField);
        var map = Def.RecordDataRequester.outputFieldNameToRDRFieldName_;

        for (var i = 0, max = dataReqOutput.length; i < max; ++i) {
          map[dataReqOutput[i]] = rdrTargetField;
        } // end do for each output field

      },
      // end setOutputNamesToRDRNames

      /**
       *  A copy constructor, for a new field (e.g. another field in a new row
       *  of a table).
       * @param fieldID the ID of the field for which the new RecordDataRequester
       *  is being constructed.
       * @return a new RecordDataRequester for field field ID
       */
      dupForField: function dupForField(fieldID) {
        return new Def.RecordDataRequester($(fieldID), this.dataURL_, this.dataReqInput_, this.dataReqOutput_, this.outputToSameGroup_);
      },

      /**
       *  Starts a request for the additional data needed for the field.  When
       *  the request completes, a callback function in this class
       *  (onDataReqComplete) will be called to put the retrieved data into the
       *  fields specified by the dataReqOutput parameter given in the constructor.
       *  (However, the callback code relies in the server's copy of dataReqOutput.)
       *  If the field's value is blank, this will just call clearDataOutputFields()
       *  instead of making the AJAX request.
       * @param listDataOnly (optional, default=false) Whether only data for
       *  autocompleter lists should be assigned.  If this is true, any other
       *  data (including values for the autocompleter fields) will be ignored.
       *  (The "true" value is used by assignListData()).
       */
      requestData: function requestData(listDataOnly) {
        this.noPriorDataReq_ = false;
        if (!this.inputFieldsHash_) this.initFieldsHash(); // Start an Ajax request

        if (!this.dataRequestOptions_) this.dataRequestOptions_ = {}; // Clear the output fields, which might have now have invalid data
        // from a previous data request.  The drug duplicate warning code
        // in appSpecific.js waits until the output fields are filled in,
        // which it can only do if the fields are cleared before the request
        // is sent.
        // Don't do this if listDataOnly is true, which happens when we are
        // retrieving the list for a field on a saved form.  We don't need to do
        // the duplicate check then, because presumably it has already been done,
        // and we don't want to wipe out the entered values.

        if (!listDataOnly) this.clearDataOutputFields(); // We can no longer cache the assignment of onComplete, which now
        // depends on the input parameter.  (We could cache the bound versions
        // of the functions, but I am not sure if it is worth it.)

        this.dataRequestOptions_.complete = jQuery.proxy(listDataOnly ? this.onDataReqCompleteForListData : this.onDataReqComplete, this);
        this.dataRequestOptions_.data = this.buildParameters();
        this.latestPendingAjaxRequest_ = jQuery.ajax(this.dataURL_, this.dataRequestOptions_);
        this.lastFieldVal_ = Def.Autocompleter.getFieldVal(this.formField_);
      },
      // end requestData

      /**
       *  Under certain conditions, this method will set the lists of any
       *  output fields that have prefetched autocompleters.  The use case
       *  for this method is where a prefetched autocompleter for some field,
       *  field B, is initially
       *  defined without a list, because its list is based on another field,
       *  field A,
       *  that has a RecordDataRequester that assigns the list for field B after
       *  a change to field A.  However, for
       *  previously saved forms that are being edited, the value of the field A
       *  will sometimes be filled in, and no change event is issued,
       *  so field B doesn't get its list that way.  Instead, we wait for
       *  field B to get a focus event, and then it uses this method (on
       *  field A's RecordDataRequester) to request that the list data for
       *  any output fields that have lists be filled in.  Now, it is possible
       *  that the focus event on field B may be occuring just after a change
       *  event from field A.  To avoid sending an unnecessary request, we check
       *  to see whether this RecordDataRequester has already requested data, and
       *  if so this method does nothing.  (Also, if the field does not have a
       *  value, we don't do anything because we have nothing about which to request
       *  data.)
       */
      assignListData: function assignListData() {
        if (this.noPriorDataReq_ && Def.Autocompleter.getFieldVal(this.formField_) !== '') this.requestData(true);
      },

      /**
       *  Returns the data retrieved for the given field on the last data
       *  request this RecordDataRequester made.
       * @param targetField the target field name of the output field for which
       *  data is needed.
       * @return the data, or null if there is no data for the given target field
       *  or if no data request has yet been run or if the RecordDataRequester's
       *  form field's value has changed since the last data request (in which case
       *  a new one is probably in progress).
       */
      getFieldData: function getFieldData(targetField) {
        var rtn = null;

        if (this.lastDataHash_ && Def.Autocompleter.getFieldVal(this.formField_) === this.lastFieldVal_) {
          rtn = this.lastDataHash_[targetField];
        }

        return rtn;
      },

      /**
       *  This gets called when the data request comes back (after the user
       *  has made a selection from the list).
       * @param response the AJAX response object
       */
      onDataReqComplete: function onDataReqComplete(response) {
        // Do nothing if this is not the most recent request.
        // There is a small chance (which becomes larger with network delays)
        // that two requests from in the same field could be issued and return
        // in the order A, B, A returns, B returns, or in the order
        // A, B, B returns, A returns.  This check keeps the output fields
        // in a consistent state with the triggering field.
        if (this.latestPendingAjaxRequest_ === response) {
          // Do nothing if the field value has changed since this
          this.lastFieldVal_ = Def.Autocompleter.getFieldVal(this.formField_); // The response text should be a JSON object for a data hash map.

          var dataHash = response.responseJSON || JSON.parse(response.responseText);
          this.lastDataHash_ = dataHash;
          this.assignDataToFields(dataHash);
          this.processUpdateList(dataHash);
          this.latestPendingAjaxRequest_ = null;
        }
      },

      /**
       *  This gets called when the data request comes back (after the user
       *  has made a selection from the list).
       * @param response the AJAX response object
       */
      onDataReqCompleteForListData: function onDataReqCompleteForListData(response) {
        // Do nothing if this is not the most recent request.
        // (See onDataReqComplete.)
        if (this.latestPendingAjaxRequest_ === response) {
          // The response text should be a JSON object for a data hash map.
          var dataHash = response.responseJSON || JSON.parse(response.responseText);
          this.lastDataHash_ = dataHash;
          this.assignDataToFields(dataHash, true);
          this.processUpdateList(dataHash);
          this.latestPendingAjaxRequest_ = null;
        }
      },

      /**
       *  Clears the fields specified as output fields at construction.  If the
       *  field has an associated prefetched list, the list will be cleared as
       *  well.  I'm not sure yet if that is what we will always want to happen.
       *  At the moment, when a list field gets assigned a value from a
       *  data request, the value is the list's list, not the field value.
       */
      clearDataOutputFields: function clearDataOutputFields() {
        if (!this.inputFieldsHash_) this.initFieldsHash();
        var updatedFields = [];
        var outputFieldsHash = this.getOutputFieldsHash();

        for (var i = 0, max = this.dataReqOutput_.length; i < max; ++i) {
          var fields = outputFieldsHash[this.dataReqOutput_[i]];

          if (fields !== undefined) {
            for (var j = 0, maxJ = fields.length; j < maxJ; ++j) {
              var field = fields[j]; // Look for an autocompleter for the field.  For now,
              // we assume a prefetched list autocompleter.

              if (field.autocomp && field.autocomp.setListAndField) {
                // If we call setListAndField, that will take care of propagating
                // the change in field value.  For this reason, we don't add
                // the field to the updatedFields list.
                field.autocomp.setListAndField([]);
              } else {
                Def.Autocompleter.setFieldVal(field, '', false);
                updatedFields.push(field);
              }
            }
          }
        }

        Def.Autocompleter.Event.notifyObservers(null, 'RDR_CLEARING', updatedFields);
      },
      // end clearDataOutputFields

      /**
       *  This function adds fields to the list of fields whose autocompleter
       *  lists need to be updated on a change to the field to which this rdr
       *  is attached.
       *
       *  Use case:  On the fetch rule form we have a field that might contain
       *  a drug name.  (The field is a combo field, so it might be used for
       *  drug names or for other things).  If a drug name is specified, the
       *  name of the drug drives the values in a list of valid strengths for
       *  the drug.  Another field may need that strength list - IF yet ANOTHER
       *  field is set to a certain value.
       *
       *  So, fieldA = the first field - the one that contains a drug name.
       *  fieldB = the second field - the one that needs the strength list.
       *  fieldC = the third field - the one that is set to a value that makes
       *  fieldB need the strength list.
       *
       *  Other code works fine to allow fieldB to obtain the strength list
       *  from fieldA's record data requester when fieldB is first created.
       *  But suppose fieldB has already been created and filled in with a
       *  strength that is valid for the drug named in fieldA.  Then the user
       *  CHANGES the value of fieldA, invalidating the value in fieldB.  The
       *  value in fieldB needs to be removed and the autocompleter on fieldB
       *  needs a new list of valid strength values.  That's where this list
       *  comes in.  If fieldA has values in the autoCompUpdateList_ that belongs
       *  to its recordDataRequester object, and fieldA is changed, this list
       *  is used to find fields (via fieldC's value) whose autocompleter lists
       *  need to be updated.  See the processUpdateList function for a
       *  description of how that happens.
       *
       *  This function is in charge of adding fields to the autoCompUpdateList_.
       *  This is called when fieldC is set to a value that indicates fieldB
       *  needs the list.  Using the above example, when fieldC is set to
       *  'Strength', fieldB needs the strength list that is based on the
       *  drug name in fieldA.   So when fieldB (another combo field) is 'created',
       *  it calls this to add its name to fieldA's autoCompUpdateList_,
       *  specifying that the update should be done only for instances of fieldC
       *  that are set to 'Strength'.  (Naturally, all of these fields are in
       *  horizontal tables and so may have multiple instances).
       *
       *  Hope this helps.   lm, 10/2009.
       *
       *  @param origOutputField the name (without the prefix or suffix) of the
       *   original output field for the list.  This will correspond to the
       *   name this recordDataRequester uses in the dataHash it creates for
       *   the requested data.  For example, for the strength list described
       *   above, this will be drug_strength_form.
       *
       *  @param ac the autocompleter object for the field that needs the
       *   drug_strength_form list.  In the example given above, this would
       *   be the autocompleter for fieldB.
       *
       *  @param update_condition an array expressing the condition used to
       *   tell which versions of the output field (fieldC) need to be updated.
       *   In the example given above, this would contain the field name (WITH
       *   prefix and suffix) - fe_fieldA_x_x ... , the operator to be used
       *   (must be 'EQ' or 'NE') - in this case 'EQ', and the value that fieldA
       *   must contain - in this case 'Strength'.
       */
      addFieldsToUpdateList: function addFieldsToUpdateList(origOutputField, ac, update_condition) {
        if (this.autoCompUpdateList_ === null) {
          this.autoCompUpdateList_ = {};
        }

        if (this.autoCompUpdateList_[origOutputField] === null) {
          this.autoCompUpdateList_[origOutputField] = {};
        }

        if (this.autoCompUpdateList_[origOutputField][update_condition] === null) {
          this.autoCompUpdateList_[origOutputField][update_condition] = [ac];
        } else {
          this.autoCompUpdateList_[origOutputField][update_condition].push(ac);
        }
      },
      // end addFieldsToUpdateList

      /**
       *  This function processes the autoCompUpdateList_, if there is one for
       *  this recordDataRequester, against the dataHash passed in.  If a key
       *  in the dataHash matches a key in the autoCompUpdateList_, and if
       *  the condition specified for that key in the autoCompUpdateList_
       *  evaluates to true, the selections list in the autocompleter(s)
       *  specified for that key in the autoCompUpdateList_ is updated with
       *  the list from the dataHash.
       *
       *  See the addFieldsToUpdateList function for a description of the use case
       *  that drives this process.
       *
       *  @param dataHash a hash whose keys are the names of fields (without a
       *   prefix or suffix) that are to receive the data obtained by this
       *   recordDataRequester, and whose values are the values to be placed in
       *   the field or given to the field's autocompleter.
       */
      processUpdateList: function processUpdateList(dataHash) {
        if (this.autoCompUpdateList_ !== null) {
          for (var key in dataHash) {
            var val = dataHash[key];
            var isList = val instanceof Array && val.length > 0;

            if (this.autoCompUpdateList_[key] !== null) {
              for (var cond in this.autoCompUpdateList_[key]) {
                var condition = cond.split(',');
                var trig_field = $(condition[0]);
                var trig_val = Def.Autocompleter.getFieldVal(trig_field);

                if (condition[1] === 'EQ' && trig_val === condition[2] || condition[1] === 'NE' && trig_val !== condition[2]) {
                  var acList = this.autoCompUpdateList_[key][cond];

                  for (var a = 0, max = acList.length; a < max; a++) {
                    // make sure that this is not a zombie autocompleter that
                    // is too much trouble to fully destroy.
                    if (acList[a].element) {
                      if (isList) {
                        if (val[0] instanceof Array) acList[a].setListAndField(val[0], val[1]);else acList[a].setListAndField(val);
                      } // Could be a null return for an autocompleter field
                      // that had a list and now does not.
                      else if (val === null) {
                          acList[a].setListAndField([], []);
                        }
                    }
                  } // end do for each autocompleter or field to be updated

                } // end if the condition is true

              } // end do for each condition

            } // end if the list has entries for this key

          } // end do for each key in the hash

        } // end if this rdr has a list

      },
      // end processUpdateList

      /* ***********************************************************************
       * Functions below this line are not intended to be called directly (except by
       * test code.)
       */

      /**
       *  Initializes input/outputFieldsHash_.
       */
      initFieldsHash: function initFieldsHash() {
        this.inputFieldsHash_ = {};
        var autospace = Def.Autocompleter;

        if (this.dataReqInput_) {
          var targetFields = this.dataReqInput_;

          for (var i = 0, max = targetFields.length; i < max; ++i) {
            var targetFieldName = targetFields[i];
            var fields = autospace.findRelatedFields(this.formField_, targetFieldName);

            if (fields.length === 1) {
              // We found the field.  Store it for future use.
              this.inputFieldsHash_[targetFieldName] = fields[0];
            }
          }
        } // If the output fields are for the same row, cache them.


        if (this.outputToSameGroup_) this.outputFieldsHash_ = this.constructOutputFieldsHash();
      },

      /**
       *  Returns a hash of output target field names to arrays of matching
       *  fields.  Uses a cached version if available.
       */
      getOutputFieldsHash: function getOutputFieldsHash() {
        return this.outputToSameGroup_ ? this.outputFieldsHash_ : this.constructOutputFieldsHash();
      },

      /**
       *  Constructs  a hash of output target field names to arrays of matching
       *  fields.
       */
      constructOutputFieldsHash: function constructOutputFieldsHash() {
        var outputFH = {};
        var targetFields = this.dataReqOutput_;
        var autospace = Def.Autocompleter;

        for (var i = 0, max = targetFields.length; i < max; ++i) {
          var targetFieldName = targetFields[i];
          var fields = autospace.findRelatedFields(this.formField_, targetFieldName); // There could be more than one field per targetFieldName (e.g. a
          // field in a repeating line table, whose source list is determined by
          // the value of another field outside the table.)  So, we no longer
          // restrict this to just one field.

          if (fields.length > 0) {
            // We found the field.  Store it for future use.
            outputFH[targetFieldName] = fields;
          }
        }

        return outputFH;
      },

      /**
       *  Finds fields matching the target names in the given data hash's keys,
       *  and tries to assign to them (in some appropriate way) the values.
       * @param dataHash the data hash
       * @param listDataOnly (optional, default=false) Whether only data for
       *  autocompleter lists should be assigned.  If this is true, any other
       *  data (including values for the autocompleter fields) will be ignored.
       *  (The "true" value is used by assignListData()).  No field values
       *  are changed when this is true.  The purpose is just to update lists.
       */
      assignDataToFields: function assignDataToFields(dataHash, listDataOnly) {
        if (!this.inputFieldsHash_) this.initFieldsHash(); // For each key in the hash, look for a field to give the value to.

        var updatedFields = [];
        var updatedFieldIDToVal = {}; // hash from fields to field values

        var outputFieldsHash = this.getOutputFieldsHash();
        var lookupCache = Def.Autocompleter;

        for (var key in dataHash) {
          var fields = outputFieldsHash[key];

          if (fields !== undefined) {
            for (var i = 0, max = fields.length; i < max; ++i) {
              var field = fields[i]; // We found the field.

              var val = dataHash[key];

              if (val instanceof Array) {
                // Look for an autocompleter for the field.  For now,
                // we assume a prefetched list autocompleter.
                if (field.autocomp !== null) {
                  // Now that lists carry codes with them, when setting the value
                  // for a list, it should normally have both a list of codes
                  // and a list of values.  However, we support the case where
                  // there is just a list of values.
                  var targetField = lookupCache.getFieldLookupKey(field);
                  this.setOutputNamesToRDRNames(this.formField_, [targetField]); //this.setOutputNamesToRDRNames(this.formField_,
                  //                             splitFullFieldID(field.id)[1]) ;
                  // Note:  Calling setListAndField takes care of propagating the
                  // change to the field, so we don't need to add it to the
                  // updatedFields array.

                  if (val.length > 0 && val[0] instanceof Array) {
                    // if there's an option
                    if (val[2]) {
                      field.autocomp.initHeadings(val[2]);
                    }

                    if (listDataOnly) // In this case, don't update the field.
                      field.autocomp.setList(val[0], val[1]); // list, codes
                    else field.autocomp.setListAndField(val[0], val[1]); // list, codes
                  } else {
                    if (listDataOnly) field.autocomp.setList(val); // just a list
                    else field.autocomp.setListAndField(val); // just a list
                  }

                  if (this.autoCompUpdateList_ !== null && this.autoCompUpdateList_[targetField] !== null) {
                    var fieldValHash = {};
                    fieldValHash[targetField] = val;
                    this.processUpdateList(fieldValHash);
                  }
                } // end if we found an autocompleter for the field

              } // end if the value is an array
              else if (!listDataOnly) {
                  if (field.comboField !== undefined) {
                    // if the field is a "combo field"
                    field.comboField.mimicField(val, this.formField_.id);
                  } else {
                    // Assume a string
                    Def.Autocompleter.setFieldVal(field, val, false);
                    updatedFields.push(field);
                    updatedFieldIDToVal[field.id] = val;
                  }
                } // end if the value is an array or listDataOnly is false

            } // end do for each field

          } // end if there are fields

        } // end do for each key in the dataHash


        Def.Autocompleter.Event.notifyObservers(null, 'RDR_ASSIGNMENT', {
          updatedFields: updatedFields,
          updatedFieldIDToVal: updatedFieldIDToVal,
          listField: this.formField_
        });
      },
      // end assignDataToFields

      /**
       *  Constructs and returns the CGI parameter string for the URL used
       *  to make the data request.
       */
      buildParameters: function buildParameters() {
        var data = {};
        if (!this.inputFieldsHash_) this.initFieldsHash(); // Include the code field's value if there is a code field and if it
        // has a value.  If there isn't a code field value, include formField_'s
        // value.
        // Get the code value, assuming there is at most one (i.e. a non-multiselect
        // list, which is the use case for RecordDataRequester).

        var codeVal = this.formField_.autocomp.getSelectedCodes()[0];
        if (codeVal !== null && codeVal !== undefined) data.code_val = codeVal;else data.field_val = Def.Autocompleter.getFieldVal(this.formField_);

        if (this.dataReqInput_) {
          for (var i = 0, max = this.dataReqInput_.length; i < max; ++i) {
            var inputTargetFieldName = this.dataReqInput_[i];
            var inputField = this.inputFieldsHash_[inputTargetFieldName];
            if (inputField === undefined || inputField === null) throw 'Could not find field for ' + inputTargetFieldName;
            data[inputTargetFieldName] = Def.Autocompleter.getFieldVal(inputField);
          }
        } // Lastly add authenticity_token for csrf protection


        data.authenticity_token = window._token || '';
        return data;
      }
    };
    jQuery.extend(Def.RecordDataRequester.prototype, tmp);
    tmp = null; // Additional class-level data members and methods.

    jQuery.extend(Def.RecordDataRequester, {
      /**
       *  A hash map from data request output field target field names to the
       *  target field names of the field whose data requester sends them data.
       *
       *  So if fieldA has an autocompleter and a recordDataRequester that
       *  provides data for fieldB, this hash would contain an entry with a
       *  key of fieldB whose value is fieldA.
       *
       *  This hash is created as the RecordDataRequesters are created.
       */
      outputFieldNameToRDRFieldName_: {},

      /**
       *  Returns the RDR for the given field ID, or null if none can be located.
       * @param outputFieldID the field ID of the output field for the
       *  RecordDataRequester that is to be returned.
       */
      getOutputFieldRDR: function getOutputFieldRDR(outputFieldID) {
        var rtn = null;
        var outputField = $(outputFieldID);
        var outputFieldKey = Def.Autocompleter.getFieldLookupKey(outputField);
        var rdrFieldName = this.outputFieldNameToRDRFieldName_[outputFieldKey];
        var rdrFields = Def.Autocompleter.findRelatedFields(outputField, rdrFieldName);

        if (rdrFields.length === 1) {
          var rdrField = rdrFields[0];
          var autocomp = rdrField.autocomp;
          if (autocomp) rtn = autocomp.recDataRequester_;
        }

        return rtn;
      }
    });
  }

  if (true) module.exports = defineRDR;else {}
})();

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

if (typeof Def === 'undefined') var Def = {};

(function () {
  // Wrap the definitions in a function to protect our version of global variables
  function defineAlarms($, jQuery, Def) {
    "use strict";

    Def.FieldAlarms = {
      /**
       * Sets off an alarm with few shakes and a "bonk" sound
       *
       * @param field a field which should be shaked when the alarm is setoff
       **/
      setOffAlarm: function setOffAlarm(field) {
        if (this.bonk === undefined) this.bonk = new Audio(this.soundData_); // see bonk.js for soundData_
        // Reset the play position back the the beginning, if the sound has
        // been loaded sufficiently.

        if (this.bonk.readyState >= 2) {
          this.bonk.currentTime = 0; // now the sound can be replayed

          if (this.bonk.currentTime !== 0) {
            // Work around Chrome bug.  However, this bug really
            // has to do with the server not setting the Accept-Ranges
            // and Content-Range headers on the response.  The drawback
            // of this workaround is that it will trigger a reload
            // of the sound file (so it is better to adjust your server's
            // configuration if you are having that problem).
            this.bonk.src = this.bonk.src; // should reset the time to 0
          }
        }

        this.bonk.play();
        Def.Effect.Shake(field.id, 5);
      },
      // end of setOffAlarm

      /**
       *  Cancels the alarm.
       */
      cancelAlarm: function cancelAlarm(field) {
        field.shakeCanceled = true;
        this.bonk.pause();
        this.bonk.currentTime = 0;
      }
    };
  }

  if (true) module.exports = defineAlarms;else {}
})();

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

// This is a base64-encoded version of bonk.mp3.  Using this version avoids
// issues finding the sound file when the JavaScript is packed together by a
// tool like grunt.
(function () {
  function initSound(Def) {
    Def.FieldAlarms.soundData_ = 'data:audio/mp3;base64,/+OAxAAAAAAAAAAAAEluZm8AAAAPAAAABwAADQ4AJCQkJCQkJCQkJCQkJCRJSUlJSUlJSUlJSUlJSW1tbW1tbW1tbW1tbW1tkpKSkpKSkpKSkpKSkpKStra2tra2tra2tra2trbb29vb29vb29vb29vb2///////////////////AAAAWkxBTUUzLjkyIAHDAAAAAAAAAAACQCQF2SEAAAAAAA0OXWa08wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA/+OAxABa1IIMF5uwACCDBAGAB/86aEEGTrP/hZNdJTyqr/pn4OCRDARfjtIEHqAZfjEAZzj+AZkhOeMiITA2IE0A1rkeA6cdIA9GMcA66Ro+MmOYSZqT4G0RQAGcoYgGMcNoGAQPQGJ4KH4wyIEXNjUiYGUkgoGMMRYGEkBIGFkLYGG8P4GGMDv8tmpPn0J4DEOL0DGmI8AYFQGEkHIGDUHIGDEBYGD4F3/NicKiaCSJfLYGBoAQr4GFIIgGDoGwGCYAgGCsC4WhAFAQAw7hT//PE+ZmREB5IkLgGAO8ghUAwXgbAaAuUwMAIHQMFYDwMQAngMUwZgIAJAx5CmAwpAQFrAwcAs//6d97vTdngYJAPAFAkAGAeK2DlAGABluASAMDAaAsL3gYBwBgYAwDgNAHDU///////AwBgDDfxkBjxS4aoGQWIIF0nxWgYoFgJoAwBABwFBBQMiCAH//4GAUAIGAMA4DQBwAgDhc2MmBgWAgDY6AcA9UJAILy11W1dqwrXViy2OQCw1TFUqEku6WxLaggJZ4skWaLxKbQemiY/+OCxCha9IJFQ9jwABJw+YDYFRgagfGCiDUYQ4UhhvilGSSRkauQAZguA5mCgBuYC4DRgKgBBcBJxU5SzpgBADmAMAWYBQC5gFgGGAaAUYBIAxgDgBGAGAAWaQeV070dgBymHLDLDKmVMoEw1xZajTDtnsNKVBQAEwCgITBSAeMBcAgFABJFLucp3ozGYzLYzGcq0qpYzGYy5L+w67LszVqmv3dVYzLY1Gniac/0PRp/mlJiNeh6TyyNRqNQ1GYZf2GX9jLOXVgatTQ0/0PQWYEALbAkTlAVSs5a6zl/Xdh2My6mtayzq1aXKmlVymtU2WPa0n3n+tZY1X2TgjVNTU1al3j+5mUfg0WUQn9ZWvyxu473zH/5r/5jzHX/zHDn719rLLn3bO+5VuxaGm/ZbLbUqtU1rLP48+l/Hm5bD1NTUtLZpsfwxxuZU2SPPcqaaQAhh+FryH0uXjKpcoDewl+bSaWw/SLjbQLj8agKecVQYFATAIARMA0CgwBgSzAVCgMFAdkxD47Tt0DxMGgRAwHwVTAtAHBwVhgyiBBgOSTMH//jgsRRWgyCFULXtuQ5FkPVXXrENw3ZinyWZDgGE5YWqR/J+P0gNEVBZdGEjl1wlmZgAkb+ljIIyOMR2tdf7s3Fbzds47dprvwFI701C0yHDlMW5VhyelLWaO8MgTbROzjZc4MF3gn26qtiU/vstkOdu+6bR0TXks1pmVLtAosYDlE1+mY4CbaNMqlEbpb2oKk8kty2tauSKXyZusW+ih2GakYp2DVpRlRUUnmnjVAX3jVmJ87EpXEdSBuqVOMVFA1JhGCC4zBkqv3MotL5fRw1HpdnGpJD8odr56cgJyb0jm3ihiHJuIu9KqODsvkUzhS1uSqWx0EAa/YQ/N+jcF8ZqGIgoEJBNBSV5hbC9sZqDr8MqW/L6sVl2MM2pIYKQJncuwwqmR50hLvF3Zl0dUbAs7ViSSi7QSKIS6Hc9Z27ECMHRnIgBDAGAaMAkFEwJwFzEzJPMjjX89/l5TFqBeMCUC0wEQATAoA6MEcGZLtXk5SdWTA29vrU1POVTvBQwfEZbbtQ9KZRD4oA2JAExp9XBhyXxJK8wCALmttYq1rcamv/44LEfVscgggNWvAAViw7L6zk9Vh+eytw9KmttugmdZokWo5RJ9Yu1LMGBV5fOP9uEEwAMlpIJbWahqdmqlWgn6Wwy59WI3ZbHZA4bymB6BIDAFm5xtUiw1q/GXrsw5uVPLDVSnhFR+FtwKuxe0odCHpdTY3aTeFXka5L9KrAYBKV0UruS7KR3rlM6Rf7O8IgAXsQVijiSx5VrLCt86jEXVWbYclwoBj7IlH2ssGpJG6NiIPhGnLaWuZe7uxJ/YTMu03Z2WbQA3GSqbLqaS4sOupDcvf2rF4csW3Rrqyr2lcMUuT1ONYu3KGWwqgqOjCIy+2FuUhYAeBcoRTVBCSCRkof4QBfxYWZQMRCQAd1kQCzHgTXLwA6pYCCAFTAtBRMD8A8wOAcTBoAvMFUQ6GoZRCMKEQcwQJFzHkCyMMINwwiBNTHuK1MwwuswSAgVbn3Y0wIwvARi7Jg+AoAIDkwFwCzCwDVMKwEcwNAbzCAB1MDADCD4KhrN4jAwAOAoD5gNgDoCTAnAZDAMzA6BpMFYCcwBQVjAmA/MBIAQwMQUIat/+OCxKV/zGIABZrwAMBRK/NGBWBKQgDquMCEBtC9SwwGQATAMAVEIERgWgPBcAwwIwKgwCswCwJq1/H8pmqVAAAUATDQIAGFgCAAAIYBAACxTASAEMCUBQqgRmAiBIPARGAYBWYAYBRYALMBgB198JmryrV5vY8ABPGAMAAvFWNPARgImBAAOhPLVs3MAMAMwCAFwwCEEAHmAsAmCAADACAXAQEIhAUAgAqNhgFgJNdxrZbmq3a1butJ1v0YBIA8aZIgPTQXQ+4QAAtRUiDiXKNgNAIAwCyRxgBgCISwSAUBgEiAAkEgCK/AAB6gSMoCAFZj3HHUzVwmavKtXn+zR/ggAxmKQb8l91L0w3HTDLfoL0KAeLqELfTsYKAABU4AsACBgBUdAYAGmaFwBkEq+ACAFOoZJ9JpFtmHoCkNkdca2W61btat3Wu739XH6qokhHEYI6j8M4aRRKZP2lS1p8UxbTope7WqTEFNRTMuOTKqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqv/jgsQ6AAADSAHAAACqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqpMQU1FMy45Mqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqr/44LE/wAAA0gAAAAAqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqTEFNRTMuOTKqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqq';
  }

  if (true) module.exports = initSound;else {}
})();

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

// These autocompleters are based on the Autocompleter.Base class defined
// in the Script.aculo.us controls.js file.   Most of the controls.js code has
// been overridden, and the part that hasn't has been included in this file.
//
// See http://script.aculo.us/ for Scriptaculous, whose license is the following
// MIT-style license:
//
// Copyright © 2005-2008 Thomas Fuchs (http://script.aculo.us, http://mir.aculo.us)
//
// Permission is hereby granted, free of charge, to any person obtaining
// a copy of this software and associated documentation files (the
// “Software”), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to
// permit persons to whom the Software is furnished to do so, subject to
// the following conditions:
//
// The above copyright notice and this permission notice shall be
// included in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED “AS IS”, WITHOUT WARRANTY OF ANY KIND,
// EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
// NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
// LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
// OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
// WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
if (typeof Def === 'undefined') var Def = {};

(function () {
  // Wrap the definitions in a function to protect our version of global variables
  function initializeBase($, jQuery, Def) {
    "use strict"; // A test for IE, borrowed from PrototypeJS -- and modified.

    var Browser = Def.PrototypeAPI.Browser;
    var isIE = !!window.attachEvent && !Browser.isOpera || typeof navigator !== 'undefined' && navigator.userAgent.indexOf('Trident') >= 0;
    Def.Autocompleter = {
      // Namespace for DEF autocompletion stuff
      // Variables related to autocompleters but independent of any particular
      // autocompleter go here.

      /**
       *  True if the browser is IE.
       */
      isIE: isIE,

      /**
       *  A variable to keep track of which autocomplete text field is using the
       *  shared autocompletion area.
       */
      currentAutoCompField_: -1,

      /**
       *  The suggestion mode constant that means rely on the statistics for
       *  the field's master table.  See the suggestionMode option in
       *  defAutocompleterBaseInit.
       */
      USE_STATISTICS: 2,

      /**
       *  The suggestion mode constant that means do not recommend one item from
       *  the returned list over the others.  See the suggestionMode option in
       *  defAutocompleterBaseInit.
       */
      NO_COMPLETION_SUGGESTIONS: 0,

      /**
       *  The suggestion mode constant that means the shortest match should
       *  recommended over other returned items.  See the suggestionMode option in
       *  defAutocompleterBaseInit.
       */
      SUGGEST_SHORTEST: 1,

      /**
       *  If the list items consist of multiple
       *  strings (fields) each, this is the string used to join together each list
       *  item's fields to produce the list item string the user sees in the list.
       */
      LIST_ITEM_FIELD_SEP: ' - ',

      /**
       *  The screen reader log used by the autocompleter.
       */
      screenReaderLog_: new Def.ScreenReaderLog(),

      /**
       *  Sets global options for customizing behavior of all autocompleters.
       *  Currently, what is supported is the overriding (or supplying) of the
       *  functions found in this object.
       * @param options - a hash from one or more of this object's function names
       *  to a replacement function.
       */
      setOptions: function setOptions(options) {
        jQuery.extend(this, options);
      },

      /**
       *  Returns value of the given form field element.  (This may be overridden for
       *  special handling of values.)
       * @param field the form field from which the value is needed.
       */
      getFieldVal: function getFieldVal(field) {
        return field.value;
      },

      /**
       *  Sets the given form element's value to the given value. (This may be
       *  overridden for special handling of values.)
       * @param field the DOM field element.
       * @param val the new value, which should only be a string.
       * @param runChangeEventObservers (default true) whether the change
       *  event observers for the field (which includes the update for the data
       *  model and the running of rules) should be run after the value is set.
       */
      setFieldVal: function setFieldVal(field, val, runChangeEventObservers) {
        if (field.autocomp) field.autocomp.setFieldVal(val, runChangeEventObservers);else {
          if (typeof runChangeEventObservers === 'undefined') runChangeEventObservers = true; // default

          var fieldVal;
          if (runChangeEventObservers) fieldVal = this.getFieldVal(field);
          field.value = val;

          if (runChangeEventObservers && fieldVal !== val) {
            Def.Event.simulate(field, 'change');
          }
        }
      },

      /**
       *  Returns the field lookup key for the given field.  Lookup keys are used
       *  to store information about a particular field (or maybe a column of
       *  identical fields) and are also used to store/retrieve the associated
       *  fields themselves.  In systems where every field is unique, this can
       *  be the field's name or ID attribute, but it can also be a key shared by fields
       *  that have the same supporting list.  If this is overridden, be sure to
       *  also override lookupFields.
       * @param field a DOM field element
       */
      getFieldLookupKey: Def.Observable.lookupKey,
      // default implementation

      /**
       *  Returns the fields matching the given lookup key.  (See getFieldLookupKey).
       *  If there is no match, an empty array will be returned.
       *  This should be overridden to match getFieldLookupKey if that is overridden.
       * @param lookupKey a key for finding matching elements.
       */
      lookupFields: function lookupFields(lookupKey) {
        var rtn = [];

        for (var i = 0, numForms = document.forms.length; i < numForms; ++i) {
          var match = document.forms[i].elements[lookupKey];
          if (match !== undefined) rtn.push(match);
        }

        return rtn;
      },

      /**
       *  Returns the fields matching otherFieldLookupKey (see getFieldLookupKey)
       *  which are associated in some way with "field".  This default implementation
       *  just returns all the fields matching otherFieldLookupKey.
       * @param field the field for which related fields are needed
       * @param otherFieldLookupKey the key for finding fields related to "field".
       *  (See getFieldLookupKey.)
       * @returns an array of matching fields.  The array will be empty if there
       *  are no matching fields.
       */
      findRelatedFields: function findRelatedFields(field, otherFieldLookupKey) {
        return this.lookupFields(otherFieldLookupKey);
      },

      /**
       *  Returns the label text of the field with the given ID, or null if there
       *  isn't a label.  This default implementation just returns null.
       * @param fieldID the ID of the field for which the label is needed.
       */
      getFieldLabel: function getFieldLabel(fieldID) {
        return null;
      },

      /**
       *  Returns the DOM node immediately containing the list item elements.  This
       *  could either be a tbody or a ul, depending on options.tableFormat.
       *  If there is no list, the return value may be null.
       */
      listItemElementContainer: function listItemElementContainer() {
        var rtn = jQuery("#completionOptions")[0].firstChild;
        if (rtn && rtn.tagName === "TABLE") rtn = rtn.tBodies[0]; // tbody

        return rtn;
      },

      /**
       *  Returns the list items elements, which will be either
       *  tr elements or li elements depending on options.tableFormat.
       *  If there is no list, the return value may be null.
       */
      listItemElements: function listItemElements() {
        var rtn = null;
        var itemContainer = this.listItemElementContainer();
        if (itemContainer) rtn = itemContainer.childNodes;
        return rtn;
      },

      /**
       *  Sets off an alarm when a field is in an invalid state.
       * @param field the field that is invalid
       */
      setOffAlarm: function setOffAlarm(field) {
        Def.FieldAlarms.setOffAlarm(field);
      },

      /**
       *  Cancels the alarm started by setOffAlarm.
       */
      cancelAlarm: function cancelAlarm(field) {
        Def.FieldAlarms.cancelAlarm(field);
      },

      /**
       *  Stops further event handlers from runing on the element and prevents the
       *  default action.
       * @param event a jQuery Event object
       */
      stopEvent: function stopEvent(event) {
        event.stopImmediatePropagation();
        event.preventDefault();
      },

      /**
       *  Logs a message for a screen reader to read.  By default, this
       *  uses an instance of Def.ScreenReaderLog.
       * @param msg the message to log
       */
      screenReaderLog: function screenReaderLog(msg) {
        Def.Autocompleter.screenReaderLog_.add(msg);
      },

      /**
       *  Creates a cache for storing DOM values.
       * @param directProps a hash of properties that should be directly defined
       *  on the hash.  These properties should not include "data", "get",
       *  "invalidate", or "refresh".
       * @param jitProps a hash of properties to functions that will be called
       *  (just in time) to initialize the properties.  These properties will be
       *  accessible via the "get" function on the cache, and can be cleared with
       *  the "invalidate" function.
       * @return the cache object
       */
      createDOMCache: function createDOMCache(directProps, jitProps) {
        var rtn = {
          data: {},
          get: function get(item) {
            var rtn = this.data[item];
            if (rtn === undefined) rtn = this.data[item] = this.refresh[item].apply(this);
            return rtn;
          },
          set: function set(item, value) {
            this.data[item] = value;
          },
          // Drops the current value for "item"
          invalidate: function invalidate(item) {
            if (item) delete this.data[item];else this.data = {};
          },
          // A hash of functions to get a new property value
          refresh: {// populated with jitProps
          }
        };
        Object.assign(rtn, directProps);
        Object.assign(rtn.refresh, jitProps);
        return rtn;
      }
    };
    /**
     *  A base class for our Ajax and local autocompleters.
     */

    Def.Autocompleter.Base = function () {}; // Base class object

    /**
     *  Class-level stuff for Def.Autocompleter.Base.
     */


    jQuery.extend(Def.Autocompleter.Base, {
      /**
       *  The maximum number of items to show below a field if the user has not
       *  used the "see more" feature.
       */
      MAX_ITEMS_BELOW_FIELD: 7,

      /**
       *  Whether classInit() has been called.
       */
      classInit_: false,

      /**
       *  Does one-time initialization needed by all autocompleters on the page.
       */
      classInit: function classInit() {
        if (!this.classInit_) {
          jQuery(document.body).append('<div id="searchResults" class="form_auto_complete"> \
             <div id="completionOptionsScroller">\
             <span class="auto_complete" id="completionOptions"></span> \
             </div> \
             <div id="moreResults">See more items (Ctl Ret)</div> \
             <div id="searchCount">Search Results<!-- place holder for result count, \
              needed for height calculation--></div> \
             <div id="searchHint">Search Hint<!--place holder--></div> \
             </div>');
          jQuery('#moreResults').mousedown(function (event) {
            var field = $(Def.Autocompleter.currentAutoCompField_);
            field.autocomp.handleSeeMoreItems(event);
            Def.Autocompleter.Event.notifyObservers(field, 'LIST_EXP', {
              list_expansion_method: 'clicked'
            });
          });
          jQuery('#completionOptionsScroller').mousedown(jQuery.proxy(function (event) {
            // Here is a work-around for an IE-only issue in which if you use the scrollbar
            // on the list, the field gets a blur event (and maybe a change event
            // as well.)  For IE, we set things to refocus the field and to ignore
            // the change, blur, and focus events.
            if (Def.Autocompleter.isIE && event.target.id === 'completionOptionsScroller') {
              Def.Autocompleter.stopEvent(event);
              Def.Autocompleter.completionOptionsScrollerClicked_ = true;

              if ($(Def.Autocompleter.currentAutoCompField_) != -1) {
                var field = $(Def.Autocompleter.currentAutoCompField_);
                setTimeout(function () {
                  field.focus();
                });
              }
            }
          }, this));
          this.classInit_ = true;
        }
      },

      /**
       * Provides a way to do a case-insensitive sort on a javascript array.
       * Simply specify this function as the parameter to the sort function,
       * as in myArray.sort(noCaseSort)
       */
      noCaseSort: function noCaseSort(a, b) {
        var al = a.toLowerCase();
        var bl = b.toLowerCase();
        if (al > bl) return 1;else if (al < bl) return -1;else return 0;
      },

      /**
       *  Escapes a string for safe use as an HTML attribute.
       * @param val the string to be escaped
       * @return the escaped version of val
       */
      escapeAttribute: Def.PrototypeAPI.escapeAttribute,

      /**
       *  Reverses escapeAttribute.
       * @param escapedVal the string to be unescaped
       * @return the unescaped version of escapedVal
       */
      unescapeAttribute: function unescapeAttribute(escapedVal) {
        return escapedVal.replace(/&amp;/g, '&').replace(/&quot;/g, '"').replace(/&#39;/g, '\'').replace(/&lt;/g, '<').replace(/&gt;/g, '>');
      }
    });
    /**
     *  A cache of DOM values shared by all autocompleters on the page.
     */

    Def.Autocompleter.sharedDOMCache = Def.Autocompleter.createDOMCache({}, {
      spacerDiv: function spacerDiv() {
        var spacerDiv = $('spacer');

        if (!spacerDiv) {
          spacerDiv = document.createElement('div');
          spacerDiv.setAttribute('id', 'spacer');
          document.body.appendChild(spacerDiv);
        }

        return spacerDiv;
      },
      listContainer: function listContainer() {
        return $('searchResults');
      },
      firstEntryWidth: function firstEntryWidth() {
        return Def.Autocompleter.listItemElements()[0].offsetWidth;
      },
      listBoundingRect: function listBoundingRect() {
        return this.get('listContainer').getBoundingClientRect();
      },
      viewPortWidth: function viewPortWidth() {
        return document.documentElement.clientWidth;
      },
      spacerCoords: function spacerCoords() {
        return this.get('spacerDiv').getBoundingClientRect();
      }
    }); // This is the definition for the Base instance methods.  We define it in
    // a temporary object to help NetBeans see it.

    var tmp = {
      /**
       *  The array of options passed to the constructor.
       */
      constructorOpts_: null,

      /**
       *  The HTML DOM input element holding the score field for this list.
       */
      scoreField_: null,

      /**
       *  Whether scoreField_ has been initialized.
       */
      scoreFieldInitialized_: false,

      /**
       *  A hash between list values and the original unsorted list index,
       *  so that we can match up list values with arrays for codes and other
       *  data.
       */
      itemToDataIndex_: null,

      /**
       *  The codes of the currently selected items, stored as values on a hash,
       *  where the keys are the display strings.
       */
      selectedCodes_: null,

      /**
       *  The currently selected items' display strings, stored as keys on a hash.
       *  Some might not have codes, and so there might be more entries here than in
       *  selectedCodes_.
       */
      selectedItems_: null,

      /**
       *  The currently selected items' completed data, as an array of hashes for
       *  each item.
       */
      selectedItemData_: null,

      /**
       *  Whether the field value is required to be one from the list.
       */
      matchListValue_: null,

      /**
       *  Whether the field is invalid.
       */
      invalidStatus_: false,

      /**
       *  Whether the current field's value matches (even partially) one or more of
       *  the items in the list.  If the user types the first few leters of an
       *  item, it's matchStatus_ is true, even though the field value does
       *  not equal a complete list item value.
       */
      matchStatus_: true,

      /**
       *  Whether the field is responding to a focus event.
       */
      focusInProgress_: false,

      /**
       *  Whether the field is losing focus but will be refocused after a short
       *  delay.
       */
      refocusInProgress_: false,

      /**
       *  Whether or not the list will be shown below the field.
       */
      listBelowField_: true,

      /**
       *  The element that holds the selection list and search hit count
       *  information.
       */
      listContainer: null,

      /**
       *  A RecordDataRequester instance that will get used after list entry
       *  selection to pull back additional data.
       */
      recDataRequester_: null,

      /**
       *  Whether the autocompleter is enabled.  For example, this is false when
       *  there is no list assigned to the field.
       */
      enabled_: true,

      /**
       *  The value of the list's field before it was filled in by changing the
       *  default list selection (e.g. by arrowing into the list).
       */
      preFieldFillVal_: null,

      /**
       *  This is true when the field value is a list value.  This is initially null,
       *  which means we do not know anything about the current field value.  (A value
       *  of false means we know it is not a list value.)
       */
      fieldValIsListVal_: null,

      /**
       *  A hash from item indexes to heading levels, for the full list.
       *  A level of 0 means the item is not a heading, level 1 means the item is a top-level
       *  heading, and level 2 means a sub-heading.
       */
      indexToHeadingLevel_: {},

      /**
       *  An integer specifying what type of suggestion should
       *  be offered based on what the user has typed.  For allowed values,
       *  see the suggestionMode option in defAutocompleterBaseInit.
       */
      suggestionMode_: Def.Autocompleter.SUGGEST_SHORTEST,

      /**
       *  A reference to the last scroll effect (used in positioning).
       */
      lastScrollEffect_: null,

      /**
       *  Whether or not multiple items can be selected from the list.
       */
      multiSelect_: false,

      /**
       *  The hash of "extra data" for the current list.  (This might only apply
       *  to search lists.)
       */
      listExtraData_: null,

      /**
       *  The last value we tried to handle as a data entry, valid or not.
       */
      processedFieldVal_: null,

      /**
       *  An initialization method for the base Def.Autocompleter class.
       * @param field the ID or the DOM element of the field for which the
       *  list is displayed.  If an element is provided, it must contain an ID
       *  attribute, or one will be assigned.
       * @param options A hash of optional parameters.  For the allowed keys see the
       *  subclasses.  The base class uses the following keys:
       *  <ul>
       *    <li>matchListValue - whether the field should validate its value
       *      against the list (default: false)</li>
       *    <li>dataRequester - A DataRecordRequester for getting additional data
       *     after the user makes a selection from the completion list.  This may be
       *     null, in which case no request for additional data is made.</li>
       *    <li>suggestionMode - an integer specifying what type of suggestion
       *     should be offered based on what the user has typed.  If this is not
       *     specified, the default is [Def.Autocompleter.]SUGGEST_SHORTEST, which
       *     means "pick the shortest match."  A value of
       *     NO_COMPLETION_SUGGESTIONS means no suggestions, and a value of
       *     USE_STATISTICS means that the suggestion is based on statistics, and
       *     that we will rely on the server to return the best item as the first
       *     item in the list.</li>
       *    <li>maxSelect - (default 1) The maximum number of items that can be
       *     selected.  Use '*' for unlimited.</li>
       *    <li>wordBoundaryChars - (default none) For autocompleting based on part of the
       *     field's value, this should be an array of the characters that are
       *     considered "word" boundaries (e.g. a space, but could be something
       *     else).  When this option is used, maxSelect is ignored.
       *    <li>scrolledContainer - the element that should be scrolled to bring
       *     the list into view if it would otherwise extend below the edge of the
       *     window. The default is document.documentElement (i.e. the whole
       *     window).  This may be null if no scrolling is desired (e.g. if the
       *     list field is in a fixed position on the window), but in that
       *     case the list element might be unusually short.
       *     Note:  At present the only tested cases of this parameter are the
       *     default value and null.</li>
       *    <li>nonMatchSuggestions - (default: false) Whether the user should be
       *     given a list of suggestions if they enter a non-matching value.
       *     This only applies when matchListValue is false.  Also, the option is
       *     only presently supported by search autocompleters.</li>
       *    <li>headerBar - If the page has a fixed-position element at the top of
       *     the page (e.g. a top navigation bar), the autocompleter needs to know
       *     that so that when scrolling to show the list it doesn't scroll the current
       *     field under the header bar.  This is the element ID for such a header
       *     bar.</li>
       *    <li>twoColumnFlow - (default: true) Whether to allow long lists to
       *     flow into two columns to show more of the list on the page.</li>
       *  </ul>
       */
      defAutocompleterBaseInit: function defAutocompleterBaseInit(field, options) {
        if (!options) options = {}; // Rename the wordBoundaryChars option back to "tokens", the original
        // name from Scriptaculous, which seemed to confuse tokens with token
        // delimiters.  Also allow the older "tokens" option name to be used
        // for backward compatibility.

        if (options.wordBoundaryChars) options.tokens = options.wordBoundaryChars;
        if (options['suggestionMode'] !== undefined) this.suggestionMode_ = options['suggestionMode'];
        this.twoColumnFlow_ = options.twoColumnFlow;
        if (this.twoColumnFlow_ === undefined) this.twoColumnFlow_ = true;
        if (options.tokens || options.maxSelect === undefined) options.maxSelect = 1;else if (options.maxSelect === '*') options.maxSelect = Infinity;
        this.multiSelect_ = options.maxSelect !== 1;
        if (options.scrolledContainer !== undefined) // allow null
          this.scrolledContainer_ = options.scrolledContainer;else this.scrolledContainer_ = document.documentElement;
        if ((this.nonMatchSuggestions_ = options['nonMatchSuggestions']) === undefined) this.nonMatchSuggestions_ = false; // default

        this.constructorOpts_ = options;
        this.selectedCodes_ = {};
        this.selectedItems_ = {};
        this.selectedItemData_ = [];
        var dataRequester = options.dataRequester;
        if (!Def.Autocompleter.Base.classInit_) Def.Autocompleter.Base.classInit();
        this.matchListValue_ = options['matchListValue'] || false;
        this.recDataRequester_ = dataRequester;
        this.update = $('completionOptions');
        this.options = options;
        this.options.frequency = this.options.frequency || 0.01;
        this.options.minChars = this.options.minChars || 1;
        this.element = typeof field === 'string' ? $(field) : field;
        this.ensureNeededAttrs(); // --- start of section copied from controls.js baseInitialize ---

        this.hasFocus = false;
        this.changed = false;
        this.active = false;
        this.index = 0;
        this.entryCount = 0;
        this.observer = null;
        this.element.setAttribute('autocomplete', 'off'); // --- end of section copied from controls.js baseInitialize ---

        jQuery(this.update).hide();
        var jqElem = jQuery(this.element);
        jqElem.blur(jQuery.proxy(this.onBlur, this));
        jqElem.keydown(jQuery.proxy(this.onKeyPress, this)); // On clicks, reset the token bounds relative to the point of the click

        if (this.options.tokens) {
          jqElem.click(function () {
            this.tokenBounds = null;
            this.getTokenBounds(this.element.selectionStart);
          }.bind(this));
        } // If this is a multiselect list, put the field into a span.


        if (options.maxSelect > 1) {
          var fieldDiv = jQuery('<span class="autocomp_selected"><ul></ul></span>')[0];
          var fieldParent = this.element.parentNode;
          fieldParent.replaceChild(fieldDiv, this.element);
          fieldDiv.appendChild(this.element);
          this.selectedList = fieldDiv.firstChild;
        } // ARIA markup for screen readers
        // See http://test.cita.illinois.edu/aria/combobox/combobox2.php
        // for an example that works with JAWS + Firefox.  (It behaves
        // like a regular combobox, according to a JAWS user.)


        this.element.setAttribute('role', 'combobox'); // For aria-expanded, I am following the example at:
        // http://www.w3.org/TR/wai-aria/roles#combobox

        this.element.setAttribute('aria-expanded', 'false'); // Set up event handler functions.

        this.onMouseDownListener = jQuery.proxy(this.onMouseDown, this);
        jQuery(this.element).change(jQuery.proxy(this.onChange, this));
        jQuery(this.element).keypress(jQuery.proxy(this.changeToFieldByKeys, this));
        var fieldChanged = jQuery.proxy(function () {
          this.typedSinceLastFocus_ = true;
        }, this);
        jQuery(this.element).bind('paste cut', fieldChanged); // Store a reference to the element that should be positioned in order
        // to align the list with the field.

        this.listContainer = Def.Autocompleter.sharedDOMCache.get('listContainer'); // Make the this.showList and this.hideList available to onShow and onHide

        this.options.showList = jQuery.proxy(this.showList, this);
        this.options.hideList = jQuery.proxy(this.hideList, this);
        this.options.posAnsList = jQuery.proxy(this.posAnsList, this); // Undo the base class' hiding of the update element.  (We're hiding
        // the listContainer instead.)

        this.update.style.display = "block"; // Store a reference to the autocompleter in the field object, for
        // ease of accessing the autocompleter given the field.

        this.element.autocomp = this; // Set the active list item index to -1, instead of 0 as in controls.js,
        // because there might not be any list items.

        this.index = -1;
        this.initDOMCache();
        this.oldElementValue = this.domCache.get('elemVal');
      },

      /**
       *  Sets the autocompleter's form element's value to the given value.
       *  Differs from Def.Autocompleter.setFieldVal in that it uses and manages
       *  the domCache values.
       * @param val the new value, which should only be a string.
       * @param runChangeEventObservers (default true) whether the change
       *  event observers for the field (which includes the update for the data
       *  model and the running of rules) should be run after the value is set.
       */
      setFieldVal: function setFieldVal(val, runChangeEventObservers) {
        if (typeof runChangeEventObservers === 'undefined') runChangeEventObservers = true; // default

        var fieldVal;
        if (runChangeEventObservers) fieldVal = this.domCache.get('elemVal');
        this.domCache.set('elemVal', this.element.value = this.oldElementValue = val);
        this.tokenBounds = null;

        if (runChangeEventObservers && fieldVal !== val) {
          Def.Event.simulate(this.element, 'change');
        }
      },

      /**
       *  Ensures there is an ID on the list's element, creating one if necessary.
       */
      ensureNeededAttrs: function ensureNeededAttrs() {
        // The autocompleter uses the ID attribute of the element. If pElem
        // does not have an ID, give it one.
        var pElem = this.element;

        if (pElem.id === '') {
          // In this case just make up an ID.
          if (!Def.Autocompleter.lastGeneratedID_) Def.Autocompleter.lastGeneratedID_ = 0;
          pElem.id = 'ac' + ++Def.Autocompleter.lastGeneratedID_;
        }
      },

      /**
       *  Used by the dupForField methods (defined in the subclasses) to
       *  duplicate the RecordDataRequester.
       * @param fieldID the ID of the field being assigned to the new RecordDataRequester
       *  this method creates.
       * @return the RecordDataRequester for the new autocompleter being
       *  constructed.  (The return value will be null if this autocompleter
       *  doesn't have a RecordDataRequester.)
       */
      dupDataReqForField: function dupDataReqForField(fieldID) {
        var dataReq = null;
        if (this.recDataRequester_) dataReq = this.recDataRequester_.dupForField(fieldID);
        return dataReq;
      },

      /**
       *  Returns the codes for the currently selected items or an empty array if there are none.
       *  If some of the selected items do not have a code, there will be null in
       *  that place in the returned array.
       */
      getSelectedCodes: function getSelectedCodes() {
        var keys = this.getSelectedItems();
        var rtn = [];

        for (var i = 0, len = keys.length; i < len; ++i) {
          rtn.push(this.selectedCodes_[keys[i]]);
        }

        return rtn;
      },

      /**
       *  Returns the display strings for the currently selected items or an empty array if there are none.
       */
      getSelectedItems: function getSelectedItems() {
        return Object.keys(this.selectedItems_);
      },

      /**
       *  Returns all information about the currently selected list items.
       * @return an array of hashes, each with at least a "text" property for the
       *  item's display text.  The hashes may also contain (if the data was
       *  provided) properties "code", "code_system", and "data" (which for search
       *  lists contains the "extra data" fields for that item).  The return value
       *  will be null if there are no selected items.
       */
      getSelectedItemData: function getSelectedItemData() {
        return this.selectedItemData_.length > 0 ? this.selectedItemData_ : null;
      },

      /**
       *  Adds the code for the current item in the field to the list of selected
       *  codes, and does the same for the item text.  If this is not a multi-select
       *  list, the newly selected code will replace the others.  The text and
       *  code values can be provided to set the currently stored value.  This
       *  does not broadcast any events.
       * @param itemText (optional) if provided, this will be the selected text rather
       *  than the current item in the field.  When this is provided, it is
       *  assumed that "code" is provided too.
       * @param code (optional) if provided, this will be the code for the
       *  selected text rather that then code for the item currently in the field.
       *  If this is provided, itemText must be provided too.
       */
      storeSelectedItem: function storeSelectedItem(itemText, code) {
        if (itemText === undefined) {
          itemText = this.domCache.get('elemVal');
          code = this.getItemCode(itemText);
        }

        if (!this.multiSelect_) {
          this.selectedCodes_ = {};
          this.selectedItems_ = {};
          this.selectedItemData_ = [];
        }

        if (itemText) {
          var hasCode = code !== null && code !== undefined;
          if (hasCode) this.selectedCodes_[itemText] = code;
          this.selectedItems_[itemText] = 1;
          var itemData;
          if (this.getItemData) itemData = this.getItemData(itemText);else {
            itemData = {
              text: itemText
            };
            if (hasCode) itemData.code = code;
          }
          this.selectedItemData_.push(itemData);
        }
      },

      /**
       *  Returns the code for the given item text, or null if there isn't one.
       */
      getItemCode: function getItemCode(itemText) {
        if (!this.itemToDataIndex_) this.initItemToDataIndex();
        var dataIndex = this.itemToDataIndex_[itemText];
        var newCode = null;
        if (dataIndex !== undefined && this.itemCodes_) newCode = this.itemCodes_[dataIndex];
        return newCode;
      },

      /**
       *  Appends the given string (presumably a list item, but possibly off the
       *  list) to the selected area.  This is only for multi-select lists.  Do
       *  not call it for single-select lists, or you will get an error.
       * @param text the text to be added to the list of selected items.
       * @return an HTML-escaped version of the "text"
       */
      addToSelectedArea: function addToSelectedArea(text) {
        var escapedVal = Def.Autocompleter.Base.escapeAttribute(text);
        var li = jQuery('<li><button type="button" alt="' + escapedVal + '"><span aria-hidden="true">&times;</span></button>' + escapedVal + '</li>')[0];
        this.selectedList.appendChild(li);
        var span = li.childNodes[0];
        jQuery(span).click(jQuery.proxy(this.removeSelection, this));
        return escapedVal;
      },

      /**
       *  Moves the current field string to the selected area (for multi-select
       *  lists).  After this, the field will be blank.
       */
      moveEntryToSelectedArea: function moveEntryToSelectedArea() {
        var escapedVal = this.addToSelectedArea(this.domCache.get('elemVal'));
        this.setFieldVal(this.processedFieldVal_ = '', false);
        Def.Autocompleter.screenReaderLog('Selected ' + escapedVal);

        if (this.index >= 0) {
          // i.e. if it is a list item
          // Delete selected item
          var itemContainer = Def.Autocompleter.listItemElementContainer();
          itemContainer.removeChild(this.getCurrentEntry()); // Having deleted that item, we now need to update the the remaining ones

          --this.entryCount;
          var itemNodes = itemContainer.childNodes;

          for (var i = this.index, len = itemNodes.length; i < len; ++i) {
            itemNodes[i].autocompleteIndex = i;
          }

          if (this.index == this.entryCount) --this.index;

          if (this.numHeadings_) {
            // Move index forward until there is a non-heading entry.  If there
            // isn't one forward, try backward.
            var startPos = this.index;

            while (this.index < this.entryCount && this.liIsHeading(this.getCurrentEntry())) {
              ++this.index;
            }

            if (this.index == this.entryCount) {
              // no non-heading found
              this.index = startPos - 1;

              while (this.index > 0 && this.liIsHeading(this.getCurrentEntry())) {
                --this.index;
              }
            }
          } // Mark the new "current" item as selected


          this.render();
        } // Make the list "active" again (functional) and reposition


        this.active = true;
        this.hasFocus = true;
        this.posAnsList();
      },

      /**
       *  For a multi-select list, this is an event handler that removes an item
       *  from the selected area.
       * @param event the click event on the item to be removed.
       */
      removeSelection: function removeSelection(event) {
        var li = event.target.parentNode;
        if (event.target.tagName === 'SPAN') // the span within the button
          li = li.parentNode;
        li.parentNode.removeChild(li);
        var itemText = li.childNodes[1].textContent;
        delete this.selectedCodes_[itemText];
        delete this.selectedItems_[itemText];

        for (var i = 0, len = this.selectedItemData_.length; i < len; ++i) {
          if (this.selectedItemData_[i].text === itemText) {
            this.selectedItemData_.splice(i, 1);
            break;
          }
        }

        this.listSelectionNotification(itemText, true, true);
        Def.Autocompleter.screenReaderLog('Unselected ' + itemText);
      },

      /**
       *  Returns true if the given text is one of the list items that
       *  has already been selected (for multi-select lists).
       */
      isSelected: function isSelected(itemText) {
        return this.selectedItems_ && this.selectedItems_[itemText] !== undefined;
      },

      /**
       *  Returns the score field for this list, or null if there isn't one
       */
      getScoreField: function getScoreField() {
        if (!this.scoreFieldInitialized_) {
          this.scoreField_ = Def.Autocompleter.getScoreField(this.element);
          if (this.scoreField_) this.scoreFieldInitialized_ = true;
        }

        return this.scoreField_;
      },

      /**
       *  Listens to keypress events to determine if the user has typed into
       *  the field.
       * @param evt the key event
       */
      changeToFieldByKeys: function changeToFieldByKeys(evt) {
        // Only continue if we haven't already seen such an event.
        if (!this.typedSinceLastFocus_) {
          // Based on code from:
          // http://stackoverflow.com/a/4180715/360782
          var change = false;

          if (typeof evt.which === "undefined") {
            // This is IE, which only fires keypress events for printable keys
            change = true;
          } else if (typeof evt.which === "number" && evt.which > 0) {
            // In other browsers except old versions of WebKit, evt.which is
            // only greater than zero if the keypress is a printable key.
            // We need to filter out backspace and ctrl/alt/meta key combinations
            change = !evt.ctrlKey && !evt.metaKey && !evt.altKey && evt.which !== 8;
          }

          this.typedSinceLastFocus_ = change;
        }
      },

      /**
       *  Sets up event listeners for the list elements.
       * @param element a list item DOM element.
       */
      addObservers: function addObservers(element) {
        // Listen for mousedown events (which arrive more quickly than
        // click events, presumably because click events probably have
        // to be distinguished from double-clicks.)
        jQuery(element).mousedown(this.onMouseDownListener);
      },

      /**
       *  Returns the value of a list item (minus any sequence number and
       *  separator.)
       * @param itemElem a list item DOM element.
       */
      listItemValue: function listItemValue(itemElem) {
        var rtn;
        if (this.options.tableFormat) rtn = itemElem.getAttribute('data-fieldval');else rtn = itemElem.textContent; // decodes escaped HTML elements

        return rtn;
      },

      /**
       *  Override the Scriptaculous version so we do *not* call scrollIntoView().
       *  This does not work well on our page, so we have to do the scrolling
       *  ourselves.
       */
      markPrevious: function markPrevious() {
        if (this.preFieldFillVal_ === null) // save the value in case of ESC
          this.preFieldFillVal_ = this.domCache.get('elemVal'); // Move the index back and keep doing so until we're not on a heading (unless we
        // get back to where we started).

        var stopIndex = this.index;
        if (stopIndex === -1) stopIndex = this.entryCount - 1;
        var highlightedLITag;

        do {
          if (this.index > 0) this.index--;else this.index = this.entryCount - 1;
          highlightedLITag = this.getCurrentEntry(); // depends on this.index

          var itemText = this.listItemValue(highlightedLITag);

          if (this.itemTextIsHeading(itemText)) {
            Def.Autocompleter.screenReaderLog('Above list heading: ' + itemText);
            highlightedLITag = null;
          }
        } while (!highlightedLITag && this.index !== stopIndex);

        if (highlightedLITag) {
          this.scrollToShow(highlightedLITag, this.update.parentNode);
          this.updateElementAfterMarking(highlightedLITag);
        }
      },

      /**
       *  Override the Scriptaculous version so we do *not* call scrollIntoView().
       *  This does not work well on our page, so we have to do the scrolling
       *  ourselves.
       */
      markNext: function markNext() {
        if (this.preFieldFillVal_ === null) // save the value in case of ESC
          this.preFieldFillVal_ = this.domCache.get('elemVal'); // Move the index forward and keep doing so until we're not on a heading (unless we
        // get back to where we started).

        var stopIndex = this.index;
        if (stopIndex === -1) stopIndex = this.entryCount - 1;
        var highlightedLITag;

        do {
          if (this.index < this.entryCount - 1) this.index++;else this.index = 0;
          highlightedLITag = this.getCurrentEntry(); // depends on this.index

          var itemText = this.listItemValue(highlightedLITag);

          if (this.itemTextIsHeading(itemText)) {
            Def.Autocompleter.screenReaderLog('Under list heading: ' + itemText);
            highlightedLITag = null;
          }
        } while (!highlightedLITag && this.index !== stopIndex);

        if (highlightedLITag) {
          this.scrollToShow(highlightedLITag, this.update.parentNode);
          this.updateElementAfterMarking(highlightedLITag);
        }
      },

      /**
       *  Updates the field after an element has been highlighted in the list
       *  (e.g. via arrow keys).
       * @param listElement the DOM element that has been highlighted
       */
      updateElementAfterMarking: function updateElementAfterMarking(listElement) {
        // Also put the value into the field, but don't run the change event yet,
        // because the user has not really selected it.
        var oldTokenBounds = this.tokenBounds;
        this.updateElement(listElement); // clears this.tokenBounds

        if (this.options.tokens) {
          // Recompute token bounds, because we've inserted a list value
          this.getTokenBounds(oldTokenBounds && oldTokenBounds[0]);
          this.element.setSelectionRange(this.tokenBounds[0], this.tokenBounds[1]);
        } else this.element.select(); // At least under some circumstances, JAWS reads the field value (perhaps
        // because of the "select" above).  However, if this is a table-format
        // autocompleter, we need to read the row.


        if (this.options.tableFormat) {
          var logEntry = [];
          var cells = jQuery(listElement).children('td'); // Only read the row if there is more than one cell, because the screen
          // reader will read what gets put in the field.

          if (cells.length > 1) {
            for (var i = 0, len = cells.length; i < len; ++i) {
              logEntry.push(cells[i].innerText);
            }

            Def.Autocompleter.screenReaderLog(logEntry.join('; '));
          }
        }
      },

      /**
       *  Hides the list container.
       */
      hideList: function hideList() {
        if (Def.Autocompleter.currentAutoCompField_ === this.element.id) {
          // Check whether the list is hidden.  By default (via CSS) it is hidden,
          // so if style.visibility is blank, it is hidden.
          var hidden = this.listContainer.style.visibility !== 'visible';

          if (!hidden) {
            this.listContainer.style.visibility = 'hidden';
            this.listShowing = false;
            this.listContainer.setAttribute('aria-hidden', 'true');
            this.element.setAttribute('aria-expanded', 'false');
          }
        }
      },

      /**
       *  Shows the list container.
       */
      showList: function showList() {
        var previouslyHidden = this.listContainer.style.visibility !== 'visible';
        this.listContainer.style.visibility = 'visible';
        this.listShowing = true;
        this.listContainer.setAttribute('aria-hidden', 'false');
        this.element.setAttribute('aria-expanded', 'true');

        if (previouslyHidden && !this.temporaryHide_ && this.entryCount > 0) {
          Def.Autocompleter.screenReaderLog('A list has appeared below the ' + this.getFieldName() + '.');

          if (this.options.tableFormat && this.options.colHeaders) {
            Def.Autocompleter.screenReaderLog('The column headers on the ' + 'multi-column list are ' + this.options.colHeaders.join('; '));
          }
        }
      },

      /**
       *  Returns a field "name" like 'field "Drug Use Status"' for labeled fields,
       *  or just 'field' if there is no field label.
       */
      getFieldName: function getFieldName() {
        if (this.fieldName_ === undefined) {
          var fieldLabel = Def.Autocompleter.getFieldLabel(this.element.id);
          this.fieldName_ = fieldLabel === null ? 'field' : 'field "' + fieldLabel + '"';
        }

        return this.fieldName_;
      },

      /**
       *  Scrolls the given item into view within its container.
       * @param item the item to scroll into view
       * @param container the scrollable container that has the item
       */
      scrollToShow: function scrollToShow(item, container) {
        if (item.offsetTop < container.scrollTop) {
          container.scrollTop = item.offsetTop;
        } else {
          var itemHeight = item.clientHeight; // Get the height of the container, less border and scroll bar pixels

          var containerHeight = container.clientHeight;

          if (item.offsetTop + itemHeight - container.scrollTop > containerHeight) {
            container.scrollTop = item.offsetTop + itemHeight - containerHeight;
          }
        }
      },

      /**
       *  Pages the choice list (or table) up or down.
       * @param pageUp - true if it should try to page up, or false if it should
       *  try to page down.
       */
      pageOptionsUpOrDown: function pageOptionsUpOrDown(pageUp) {
        // Get the height of the search results, which might be constrained by
        // span tag (id completionOptions).
        var compOpts = jQuery('#completionOptionsScroller')[0];
        var compOptHeight = compOpts.clientHeight; // the inner height, minus border

        var newScrollTop;

        if (pageUp) {
          if (compOpts.scrollTop > 0) {
            newScrollTop = compOpts.scrollTop - compOptHeight;
            if (newScrollTop < 0) newScrollTop = 0;
            compOpts.scrollTop = newScrollTop;
          }
        } else {
          // PAGE DOWN
          var fullListHeight = jQuery('#completionOptions')[0].clientHeight;
          var maxScrollTop = fullListHeight - compOptHeight;
          if (maxScrollTop < 0) maxScrollTop = 0;

          if (compOpts.scrollTop < maxScrollTop) {
            newScrollTop = compOpts.scrollTop + compOptHeight;
            if (newScrollTop > maxScrollTop) newScrollTop = maxScrollTop;
            compOpts.scrollTop = newScrollTop;
          }
        }
      },

      /**
       *  Returns true if the given key event is a search request.
       */
      isSearchKey: function isSearchKey(event) {
        return event.ctrlKey && event.keyCode === jQuery.ui.keyCode.ENTER;
      },

      /**
       *  Handles key down events in the field (in spite of the name).
       * @param event the event object from the keypress event
       */
      onKeyPress: function onKeyPress(event) {
        // Do nothing if the autocompleter widget is not enabled_.
        if (this.enabled_) {
          // Note:  Normal (i.e. not search or navigation) key strokes are handled
          // by Scriptaculous, which defers processing until a short time later
          // (specified by 'frequency').  This is important, because we are
          // catching a keyDown event, at which time the element's value has not
          // yet been updated.
          var charCode = event.keyCode;
          var keyHandled = true;

          if (this.fieldEventIsBigList(event)) {
            event.stopImmediatePropagation(); // If the user had arrowed down into the list, reset the field
            // value to what the user actually typed before running the search.

            if (this.preFieldFillVal_) this.setFieldVal(this.preFieldFillVal_, false);
            this.handleSeeMoreItems(event); // implemented in sub-classes
            // Currently we don't have separate events for different reasons to
            // show the big list (e.g. search vs. list expansion), so just send
            // the list expansion event.

            Def.Autocompleter.Event.notifyObservers(this.element, 'LIST_EXP', {
              list_expansion_method: 'CtrlRet'
            });
          } else {
            var keys = jQuery.ui.keyCode;

            switch (charCode) {
              case keys.ENTER:
                // Step the event for multiselect lists so the focus stays in the
                // field.  The user might be trying to select more than one item
                // by hitting return more than once.
                if (this.multiSelect_) Def.Autocompleter.stopEvent(event);
                this.handleDataEntry(event);
                break;

              case keys.TAB:
                // For a tab, only try to select a value if there is something in
                // the field.  An item might be highlighted from a return-key
                // selection (in a multi-select list), but if the field is empty we
                // will ignore that because the user might just be trying to leave
                // the field.
                if (this.domCache.get('elemVal') !== '') this.handleDataEntry(event);
                break;

              case keys.ESCAPE:
                if (this.preFieldFillVal_ !== null) {
                  // Restore the field value
                  this.setFieldVal(this.preFieldFillVal_, false);
                  Def.Autocompleter.Event.notifyObservers(this.element, 'CANCEL', {
                    restored_value: this.preFieldFillVal_
                  });
                }

                if (this.active) {
                  this.index = -1;
                  this.hide();
                  this.active = false;
                }

                break;

              default:
                if (this.active) {
                  switch (charCode) {
                    case keys.PAGE_UP:
                      this.pageOptionsUpOrDown(true);
                      break;

                    case keys.PAGE_DOWN:
                      this.pageOptionsUpOrDown(false);
                      break;

                    default:
                      if (!event.ctrlKey) {
                        switch (charCode) {
                          case keys.DOWN:
                          case keys.UP:
                            charCode === keys.UP ? this.markPrevious() : this.markNext();
                            this.render();
                            Def.Autocompleter.stopEvent(event);
                            break;

                          case keys.LEFT:
                          case keys.RIGHT:
                            if (this.options.tokens) {
                              this.tokenBounds = null; // selection point may have moved

                              this.getTokenBounds(); // selection point may have moved
                            }

                            if (!event.ctrlKey && this.index >= 0 && jQuery(this.update).hasClass('multi_col')) {
                              this.moveToOtherColumn(event);
                            }

                            break;

                          default:
                            keyHandled = false;
                        }
                      } else keyHandled = false;

                  } // switch

                } // if this.active
                else keyHandled = false;

            } // switch

          }

          if (!keyHandled) {
            // Ignore events that are only a shift or control key.  If we allow a
            // shift key to get processed (and e.g. show the list) then shift-tab
            // to a previous field can have trouble, because the autocompleter will
            // still be scrolling the page to show the list.
            // charCode being 0 is a case Scriptaculous excluded for WebKit
            // browsers.  (I'm not sure when that happens.)
            // 16 & 17 = shift & control key codes
            // Also ignore control key combination events except for control+v.
            // We also handle control+enter, which is taken care of above (see the
            // call to fieldEventIsBigList).
            if ((!event.ctrlKey || charCode === 86) && // 86 = V (control+v sends V)
            charCode !== 16 && charCode !== 17 && charCode !== 0) {
              this.preFieldFillVal_ = null; // reset on key strokes in field

              this.changed = true;
              this.hasFocus = true;
              this.matchListItemsToField_ = true;
              if (this.observer) clearTimeout(this.observer);
              this.observer = setTimeout(jQuery.proxy(this.onObserverEvent, this), this.options.frequency * 1000);
            }
          }
        }
      },

      /**
       *  Sets the indicator to let the user know the whether the field value
       *  (if present) matches a value in the field's list.
       * @param matchStatus the match status.  This should be true if the field
       *  value either matches a list item or is blank, and false otherwise.
       */
      setMatchStatusIndicator: function setMatchStatusIndicator(matchStatus) {
        if (matchStatus !== this.matchStatus_) {
          if (matchStatus) {
            if (jQuery(this.element).hasClass('no_match')) {
              jQuery(this.element).removeClass('no_match');
              Def.Autocompleter.screenReaderLog('The field no longer contains a non-matching value.');
            }
          } else {
            jQuery(this.element).addClass('no_match');
            Def.Autocompleter.screenReaderLog('The field\'s value does not match any items in the list.');
          }

          this.matchStatus_ = matchStatus;
        }
      },

      /**
       *  Sets the indicator that marks a field as having an invalid value.  If
       *  the "invalid" parameter is set to false, the visual and permanent
       *  indicator an invalid value will be removed, but if animation and sound
       *  was in progress, that will run until completion.  (To interrupt that,
       *  use cancelInvalidValIndicator).
       * @param invalid true if the field is invalid.  (This is the reverse of
       *  the parameter to setMatchStatusIndicator, mostly because of the names
       *  of the two methods.)
       */
      setInvalidValIndicator: function setInvalidValIndicator(invalid) {
        if (invalid) {
          Def.Autocompleter.setOffAlarm(this.element);

          if (!this.invalidStatus_) {
            jQuery(this.element).addClass('invalid');
            this.element.setAttribute('invalid', true);
          }
        } else {
          if (this.invalidStatus_) {
            jQuery(this.element).removeClass('invalid');
            this.element.setAttribute('invalid', false);
          }
        }

        this.invalidStatus_ = invalid;
      },

      /**
       *  Halts any animation and sound associated with the invalid field value
       *  indicator.  This does not clear the permanent visual indicator.  To clear
       *  that, use setInvalidValIndicator(false).
       */
      cancelInvalidValIndicator: function cancelInvalidValIndicator() {
        Def.Autocompleter.cancelAlarm(this.element);
      },

      /**
       *  This is called to update the completion list area with new search results.
       *  We override this to change the default selection.
       * @param choices the HTML for a ul list.  It should not contain whitespace
       *  text between tags.
       * @param pickedByNum whether the user is picking by number
       */
      updateChoices: function updateChoices(choices, pickedByNum) {
        // We no longer call controls.js' updateChoices because the autocompleteIndex
        // settings need to be made after we move the default selection.  However,
        // a good bit of this code is copied from there.
        this.index = -1;

        if (!this.changed && this.hasFocus) {
          this.update.innerHTML = choices; // If the HTML has a header row, disable clicks on that row

          var fc = this.update.firstChild;

          if (fc && fc.tHead) {
            jQuery(fc.tHead).mousedown(function (e) {
              Def.Autocompleter.stopEvent(e);
            });
          }

          var domItems = Def.Autocompleter.listItemElements();

          if (domItems) {
            this.entryCount = domItems.length;
            var i;

            if (this.suggestionMode_ !== Def.Autocompleter.NO_COMPLETION_SUGGESTIONS) {
              if (this.entryCount > 0 && !this.focusInProgress_ && pickedByNum) {
                // Use the first non-heading entry (whose number should match
                // what was typed) as the default
                for (i = 0; this.liIsHeading(domItems[i]) && i < this.entryCount; ++i) {
                  ;
                }

                this.index = i;
              }
            } // If we are making a suggestion


            for (i = 0; i < this.entryCount; i++) {
              var entry = this.getEntry(i);
              entry.autocompleteIndex = i;
              this.addObservers(entry);
            }
          } else {
            this.entryCount = 0;
          }

          if (this.entryCount === 1 && this.options.autoSelect) {
            this.selectEntry();
            this.hide();
          } else {
            this.render();
          } // don't change the match indicator on a focus event.  (Prefetch
          // autocompleters show the whole list, no matter what is in the field.)


          if (!this.focusInProgress_) {
            // The field is in a non-matching state if the value is not empty
            // and there are no items in the list.
            this.setMatchStatusIndicator(this.entryCount > 0 || this.trimmedElemVal === '');
          }
        }
      },

      /**
       *  Returns true if the user seems to be picking a list item by number.
       */
      pickedByNumber: function pickedByNumber() {
        return this.add_seqnum && this.trimmedElemVal.match(/^\d+$/);
      },

      /**
       *  Returns the index of the item in the given list
       *  which should be offered as best match.
       * @param listItems an array of the items in the list
       * @return the index of the item, or -1 if no item should be highlighted.
       */
      pickBestMatch: function pickBestMatch(listItems) {
        // If there is something in the field, pick:
        // 1) the shortest choice with the field value at the beginning, or
        // 2) the shortest choice with the field value somewhere, or
        // 3) the shortest choice
        var elemValue = this.trimmedElemVal.toLowerCase();
        var numItems = listItems.length;
        var rtn = -1;

        if (elemValue.length > 0 && numItems > 0) {
          var minLengthIndex = -1;
          var minLength = Infinity;
          var beginMatchMinLengthIndex = -1;
          var beginMatchMinLength = minLength;
          var innerMatchMinLengthIndex = -1;
          var innerMatchMinLength = minLength;

          for (var i = 0; i < numItems; ++i) {
            // Make sure the entry is not a heading before considering it
            var itemText = listItems[i];

            if (!this.itemTextIsHeading(itemText)) {
              var itemTextLC = itemText.toLowerCase(); // Also remove non-word characters from the start of the string.

              itemTextLC = itemTextLC.replace(/^\W+/, '');
              var matchIndex = itemTextLC.indexOf(elemValue);
              var itemTextLength = itemText.length;

              if (matchIndex === 0) {
                // if searching by list item #, then ignore length and highlight
                // first element
                if (/(^\d+$)/.test(elemValue)) {
                  beginMatchMinLengthIndex = 0;
                  beginMatchMinLength = 0;
                } else if (itemTextLength < beginMatchMinLength) {
                  beginMatchMinLengthIndex = i;
                  beginMatchMinLength = itemTextLength;
                }
              } else if (beginMatchMinLengthIndex === -1) {
                // no begin match found yet
                if (matchIndex > 0) {
                  if (itemTextLength < innerMatchMinLength) {
                    innerMatchMinLengthIndex = i;
                    innerMatchMinLength = itemTextLength;
                  }
                } else if (innerMatchMinLengthIndex === -1 && // no inner match yet
                itemTextLength < minLength) {
                  minLength = itemTextLength;
                  minLengthIndex = i;
                }
              }
            }
          }

          if (beginMatchMinLengthIndex > -1) rtn = beginMatchMinLengthIndex;else if (innerMatchMinLengthIndex > -1) rtn = innerMatchMinLengthIndex;else rtn = minLengthIndex;
        } // if we have some entries


        return rtn;
      },

      /**
       *  Positions the answer list.
       */
      posAnsList: function posAnsList() {
        this.posListBelowFieldInMultiCol(); // If the list was already showing, made sure the currently selected item
        // is still in view after the repositioning (which sets the scrollTop
        // of the container back to 0.)

        if (this.index > 0) this.scrollToShow(this.getCurrentEntry(), $('completionOptionsScroller'));
      },

      /**
       *  Positions the list below the field, using a multicolumn format if
       *  necessary and scrolling the document up to show the multicolumn list if
       *  necessary.  This is like the old "posListInMultiCol", but the list is
       *  always below the field.
       */
      posListBelowFieldInMultiCol: function posListBelowFieldInMultiCol() {
        var sharedDOMCache = Def.Autocompleter.sharedDOMCache;
        var element = this.domCache.element;
        var update = this.update; // Clear previous settings

        this.domCache.invalidate('elemPos');
        sharedDOMCache.invalidate('firstEntryWidth');
        sharedDOMCache.invalidate('listBoundingRect');
        sharedDOMCache.invalidate('viewPortWidth');
        if (update.style.height) update.style.height = ''; // Turn off height setting, if any

        this.setListWrap(false);
        update.style.width = 'auto';
        $('completionOptionsScroller').style.height = '';
        this.listContainer.style.width = '';
        this.listHeight = undefined; // Positioning strategies (in order of attempt) to show all of the list
        // element within the viewport.
        // 1) list below field as a single column list, with no constraint on
        // height.  If that fits in the viewport's height, adjust left position as
        // necessary.
        // 2) list below field as a two column wrapped list.  If that fits in the
        // viewports height, and the wider form can fit within the viewport width,
        // adjust the left position as necessary.  If the new width is too wide
        // for the viewport, revert to the single column list, and adjust the left
        // position as needed.
        // 3) scroll page up to make room for the list below field
        // 4) constrain the list height.  If the addition of a scrollbar on the
        // list makes a two-column list too wide for the viewport, revert to a
        // single column list.  Adjust the left position as necessary.
        // 5) If we can't constrain the list height (because it would be too
        // short), then just adjust the left position.
        // First put the list below the field as a single column list.
        // Moving the list can result in the window scrollbar either appearing or
        // disappearing, which can change the position of the field.  So, first
        // hide the list to determine the element position.  Unfortunately this
        // introduces an additional 1ms of positioning time, but I don't see a
        // good way to avoid that.

        var positionedElement = this.listContainer;
        positionedElement.style.display = 'none';
        var elemPos = this.domCache.get('elemPos');
        positionedElement.style.display = '';
        positionedElement.style.top = elemPos.top + element.offsetHeight + 'px';
        var scrolledContainer = this.scrolledContainer_;
        var viewPortHeight = document.documentElement.clientHeight;
        var maxListContainerBottom = viewPortHeight; // bottom edge of viewport

        var posElVPCoords = sharedDOMCache.get('listBoundingRect');
        var bottomOfListContainer = posElVPCoords.bottom;

        if (bottomOfListContainer <= maxListContainerBottom) {
          this.setListLeft(); // We're done positioning the list
        } else {
          // If this list is not completely on the page, try making it a multi-column
          // list (unless it is a table format list, which already has columns).
          var tryMultiColumn = this.twoColumnFlow_ && !this.options.tableFormat && this.entryCount > 4; // otherwise it's too short

          if (tryMultiColumn) {
            tryMultiColumn = this.setListWrap(true);

            if (tryMultiColumn) {
              // We wrapped the list, so update the bottom position
              bottomOfListContainer = sharedDOMCache.get('listBoundingRect').bottom;
            }
          }

          if (tryMultiColumn && bottomOfListContainer <= maxListContainerBottom) {
            this.setListLeft(); // We're done positioning the list
          } else {
            // The multi-column list is still not on the page, try scrolling the
            // page down (making the list go up).
            var elementBoundingRect = element.getBoundingClientRect();
            var heightConstraint = undefined;

            if (!scrolledContainer) {
              heightConstraint = window.innerHeight - elementBoundingRect.bottom;
            } else {
              // Cancel any active scroll effect
              if (this.lastScrollEffect_) this.lastScrollEffect_.cancel();
              var scrollDownAmount = bottomOfListContainer - maxListContainerBottom;
              var elementTop = elementBoundingRect.top;
              var topNavBarHeight = 0;
              var headerBarID = this.constructorOpts_.headerBar;

              if (headerBarID) {
                var headerBar = document.getElementById(headerBarID);
                if (headerBar) topNavBarHeight = headerBar.offsetHeight;
              }

              var maxScroll;
              var scrolledContainerViewportTop = scrolledContainer.getBoundingClientRect().top;
              if (scrolledContainerViewportTop > topNavBarHeight) maxScroll = elementTop - scrolledContainerViewportTop;else maxScroll = elementTop - topNavBarHeight; // Make sure we don't scroll the field out of view.

              if (scrollDownAmount > maxScroll) {
                scrollDownAmount = maxScroll; // Also constrain the height of the list, so the bottom is on the page
                // The maximum allowable space is the viewport height minus the field
                // height minus the top nav bar height minus the part of the list
                // container that is not for list items (e.g. "See more results")).

                heightConstraint = viewPortHeight - elementBoundingRect.height - topNavBarHeight;
              }

              bottomOfListContainer = heightConstraint === undefined ? sharedDOMCache.get('listBoundingRect').bottom : sharedDOMCache.get('listBoundingRect').top + heightConstraint; // If the list is extending beyond the bottom of the page's normal
              // limits, increasing the page's length, extend the spacer div to make
              // sure the size does not diminish.  This should prevent the "bouncing"
              // effect we were getting when typing into the field, where the page
              // would first scroll up to accomodate a large list, and then as more
              // keystrokes were enterd the list got smaller, so the page scrolled
              // back down.  (The browser does that automatically when the page
              // shrinks.)

              var spacerCoords = sharedDOMCache.get('spacerCoords');

              if (bottomOfListContainer > spacerCoords.bottom) {
                var spacerDiv = sharedDOMCache.get('spacerDiv');
                spacerDiv.style.height = bottomOfListContainer - spacerCoords.top + 'px';
                sharedDOMCache.invalidate('spacerCoords');
              }

              this.lastScrollEffect_ = new Def.Effect.Scroll(scrolledContainer, {
                y: scrollDownAmount,
                duration: 0.4
              });
            }

            if (heightConstraint !== undefined) {
              // If we can't scroll the list into view, just constrain the height so
              // the list is visible.
              var elementRect = this.setListHeight(heightConstraint); // Setting this list height likely introduced a scrollbar on the list.

              var viewPortWidth = sharedDOMCache.get('viewPortWidth');
              var posElVPCoords = sharedDOMCache.get('listBoundingRect');

              if (sharedDOMCache.listWrap && posElVPCoords.width > viewPortWidth) {
                // The list is too wide, so remove the wrap
                this.setListWrap(false);
              }
            }

            this.setListLeft();
          }
        }
      },

      /**
       *  Constructs a cache of DOM values for use during list positioning.
       *  Unliked the sharedDOMCache, each autocompleter has its own one of these.
       */
      initDOMCache: function initDOMCache() {
        var acInstance = this;
        var ac = Def.Autocompleter;
        this.domCache = ac.createDOMCache({
          // element is the positioned element, which might be acInstance.element,
          // or might be a span wrapping it.
          element: acInstance.listPositioningElem()
        }, {
          // elemPos is the offset of "element" as defined above.
          elemPos: function elemPos() {
            return jQuery(this.element).offset();
          },
          // The field value
          elemVal: function elemVal() {
            return ac.getFieldVal(acInstance.element);
          }
        });
      },

      /**
       *  Returns the element used for positioning the answer list.
       */
      listPositioningElem: function listPositioningElem() {
        // Set "element" to the container of the element and the selected list
        // when this is a multi-select list, so that when the list is scrolled
        // into view, the selected items remain visible.
        return this.multiSelect_ ? this.element.parentNode : this.element;
      },

      /**
       *  Sets whether the list is wrapped to two columns or not.  If there is not
       *  enough space for two columns, then there will be no effect when "wrap"
       *  is true.
       * @param wrap if true, the list will be set to flow into two columns; if
       *  false, it will be set to be just one column.
       *  otherwise.
       * @return true if the list is wrapped
       */
      setListWrap: function setListWrap(wrap) {
        var sharedDOMCache = Def.Autocompleter.sharedDOMCache;

        if (wrap !== sharedDOMCache.listWrap) {
          if (wrap) {
            // For Chrome, but not Firefox, we need to set the width of the
            // list container; otherwise it will not adjust when the multiple
            // columns are turned on.
            // We set it to be twice the width of a list item plus 4 pixels for
            // the border.
            // There might also be a scrollbar on the list, but we won't know that
            // until we set the height.
            var newListWidth = sharedDOMCache.get('firstEntryWidth') * 2 + 4; // Make sure the new width will fit horizontally

            var viewPortWidth = sharedDOMCache.get('viewPortWidth');

            if (newListWidth <= viewPortWidth) {
              this.listContainer.style.width = newListWidth + 'px';
              jQuery(this.update).addClass('multi_col');
              sharedDOMCache.listWrap = true;
            }
          } else {
            jQuery(this.update).removeClass('multi_col');
            this.listContainer.style.width = ''; // reset it

            sharedDOMCache.listWrap = false; // There could now be a vertical scrollbar on the window, reducing
            // horizontal viewport space.

            sharedDOMCache.invalidate('viewPortWidth');
          }

          sharedDOMCache.invalidate('listBoundingRect'); // The window vertical scrollbar might have appeared/disappeared,
          // causing the field's horizontal position to change

          this.domCache.invalidate('elemPos');
        }

        return sharedDOMCache.listWrap;
      },

      /**
       *  Sets the list's left position to bring it as close as possible to the
       *  left edge of the field and to show as much of the list as possible.
       */
      setListLeft: function setListLeft() {
        // The window's scrollbar might be showing, and which might or might not
        // be due to the placement of the list.  We could potentially reclaim that
        // space if we move the list left so the scrollbar isn't needed, but that might
        // take time, so don't.
        var positionedElement = this.listContainer;
        var sharedDOMCache = Def.Autocompleter.sharedDOMCache;
        var viewPortWidth = sharedDOMCache.get('viewPortWidth');
        var posElVPCoords = sharedDOMCache.get('listBoundingRect');
        var elemPos = this.domCache.get('elemPos');
        var leftShift = posElVPCoords.width - (viewPortWidth - elemPos.left);
        if (leftShift < 0) // no need to shift
          leftShift = 0;
        var newLeftPos = elemPos.left - leftShift;
        if (newLeftPos < 0) newLeftPos = 0; // don't move the list past the left edge of the page

        var cache = Def.Autocompleter.sharedDOMCache;

        if (cache.listPosLeft !== newLeftPos) {
          positionedElement.style.left = newLeftPos + 'px';
          cache.listPosLeft = newLeftPos;
        }
      },

      /**
       *  Constrains the height of the completion options list.
       * @param height the height for entire list, including the options, the "see
       *  more" link, and the hit count.  This should be an integer number of
       *  pixels.
       */
      setListHeight: function setListHeight(height) {
        // Subtract from the height the height of the "see more" and hit count
        // divs.  We do this before increasing the width below, because that can
        // change update.height.
        var sharedDOMCache = Def.Autocompleter.sharedDOMCache;
        var posElVPCoords = sharedDOMCache.get('listBoundingRect');
        var height = height - posElVPCoords.height + // listContainer = everything
        this.update.offsetHeight; // update = list items only
        // This will usually be called when the list needs to scroll.
        // First make the list wider to allow room for the scrollbar (which will
        // mostly likely appear) and to avoid squeezing and wrapping the list items.

        this.listContainer.style.width = posElVPCoords.width + 20 + 'px'; // Multi-column lists typical scroll/overflow to the right, so we have put
        // $('completionOptions') in a container, $('completionOptionsScroller')
        // and set the height on that instead.  This allows the list to be
        // scrolled vertically instead of horizontally (with lots of short
        // columns).
        // Require at least 20 px of height, or give up

        if (height >= 20) {
          $('completionOptionsScroller').style.height = height + 'px';
          sharedDOMCache.invalidate('listBoundingRect');
        }
      },

      /**
       *  Returns the part of the field value (maybe the full field value) that
       *  should be used as the basis for autocompletion.
       */
      getToken: function getToken() {
        var rtn = this.domCache.get('elemVal');

        if (this.options.tokens) {
          var bounds = this.getTokenBounds();
          rtn = rtn.substring(bounds[0], bounds[1]);
        }

        return rtn;
      },

      /**
       *  Returns the indices of the most recently changed part of the element's
       *  value whose boundaries are the closest token characters.  Use when
       *  autocompleting based on just part of the field's value.  Note that the
       *  value is cached.  If you want an updated value, clear this.tokenBounds.
       * @param pos (optional) a position in the string around which to extract
         * the token.  Used when the changed part of the string is not known, or
         * when there is no changed part but the user has clicked on a token.
       */
      getTokenBounds: function () {
        /*
           This function was used in Scriptaculous, but we are not basing the
           concept of current tokens on what has changed, but on where the
           cursor is in the field.  Retaining for referrence in case we need it.
        function getFirstDifferencePos(newS, oldS) {
          var boundary = Math.min(newS.length, oldS.length);
          for (var index = 0; index < boundary; ++index)
            if (newS[index] != oldS[index])
              return index;
          return boundary;
        };
        */
        return function (pos) {
          if (null != this.tokenBounds) return this.tokenBounds;
          var value = this.domCache.get('elemVal');
          if (value.trim() === '') return [-1, 0]; // diff = position around which a token will be found.

          var diff = pos !== undefined ? pos : this.element.selectionStart; // var diff = pos !== undefined ? pos :
          //  getFirstDifferencePos(value, this.oldElementValue);

          var offset = diff == this.oldElementValue.length ? 1 : 0;
          var prevTokenPos = -1,
              nextTokenPos = value.length;
          var tp;

          for (var index = 0, l = this.options.tokens.length; index < l; ++index) {
            tp = value.lastIndexOf(this.options.tokens[index], diff + offset - 1);
            if (tp > prevTokenPos) prevTokenPos = tp;
            tp = value.indexOf(this.options.tokens[index], diff + offset);
            if (-1 != tp && tp < nextTokenPos) nextTokenPos = tp;
          }

          return this.tokenBounds = [prevTokenPos + 1, nextTokenPos];
        };
      }(),

      /**
       *  A copy constructor, for a new field (e.g. another field in a new row
       *  of a table).  This method must be overridden by subclasses.
       * @param fieldID the ID of the field being assigned to the new autocompleter
       *  this method creates.
       * @return a new autocompleter for field field ID
       */
      dupForField: function dupForField(fieldID) {
        throw 'dupForField must be overridden by autocompleter subclasses.';
      },

      /**
       *  Initializes the itemToDataIndex_ map.  This should be overridden by
       *  subclasses.
       */
      initItemToDataIndex: function initItemToDataIndex() {
        throw 'initItemToDataIndex must be overridden by autocompleter classes that ' + 'need it';
      },

      /**
       *  Runs the stuff that needs to be run when the field changes.  (This assumes
       *  that the field has changed.)
       * @param matchStatus (optional) Set this to false if this should assume the
       *  field value does not match the list.  If not provided, this.matchStatus_
       *  will be used.
       */
      propagateFieldChanges: function propagateFieldChanges(matchStatus) {
        if (matchStatus === undefined) matchStatus = this.matchStatus_; // If this autocompleter has a record data requester, run it or clear
        // the output fields.  This will make sure the output fields are clear
        // before the change event observers run for this field, in case one of
        // the change observers wants to use the data model's copy of the output
        // fields.  (If it does, it can wait for the record data requester's
        // latestPendingAjaxRequest_ variable to be null.)

        if (this.recDataRequester_) {
          if (matchStatus && this.domCache.get('elemVal').trim() !== '') this.recDataRequester_.requestData();else // no data, or no data from list
            this.recDataRequester_.clearDataOutputFields();
        }
      },

      /*
       *  Returns the value the user actually typed in the field (which might
       *  have just been the first few characters of the final list value
       *  following a selection).
       */
      getValTyped: function getValTyped() {
        return this.preFieldFillVal_ === null ? this.domCache.get('elemVal') : this.preFieldFillVal_;
      },

      /**
       *  Notifies event observers of an attempted list selection (which might
       *  actually have just been the user typing a value rather than picking it
       *  from the list).
       * @param valTyped The value the user actually typed in the field (which might
       *  have just been the first few characters of the final list value).
       * @param onList whether the final value was on the list
       * @param removed For multi-select lists, this indicates whether the
       *  selection was actual an unselection, removing the named item from the
       *  list of selected items.  When true, valTyped is the removed value.
       *  (Optional; default false)
       */
      listSelectionNotification: function listSelectionNotification(valTyped, onList, removed) {
        var finalVal;
        if (removed === undefined) removed = false;else if (removed) {
          // For this case, we are passing in the removed value via valTyped
          finalVal = valTyped;
          valTyped = '';
        }
        if (finalVal === undefined) finalVal = this.domCache.get('elemVal');
        var inputMethod = this.clickSelectionInProgress_ ? 'clicked' : this.preFieldFillVal_ === null ? 'typed' : 'arrows';
        var usedList = inputMethod !== 'typed' && onList;
        var newCode = this.getItemCode(finalVal);
        Def.Autocompleter.Event.notifyObservers(this.element, 'LIST_SEL', {
          input_method: inputMethod,
          val_typed_in: valTyped,
          final_val: finalVal,
          used_list: usedList,
          list: this.rawList_,
          on_list: onList,
          item_code: newCode,
          removed: removed
        });
      },

      /**
       *  Attempts to select an item from the list, if possible.  If successful,
       *  this will take care of updating the code field, and running rules.
       * @return true if an item was successfully selected (i.e. the list was active
       *  and the item was on the list), and false if not.
       */
      attemptSelection: function attemptSelection() {
        var canSelect = false;
        var valTyped = this.getValTyped();

        if (this.active) {
          if (this.index === -1) {
            var elemVal = this.domCache.get('elemVal').trim();
            var lcElemVal = elemVal.toLowerCase();
            var caseSensitiveMatchIndex = -1;
            var matchIndex = -1; // Allow the selection if what the user typed exactly matches an item
            // in the list, except for case, but prefer a case-sensitive match.

            for (var i = 0; i < this.entryCount && caseSensitiveMatchIndex < 0; ++i) {
              var li = this.getEntry(i);
              var liVal = this.listItemValue(li);

              if (!this.liIsHeading(li)) {
                if (elemVal === liVal) caseSensitiveMatchIndex = i;else if (matchIndex < 0 && lcElemVal === liVal.toLowerCase()) matchIndex = i;
              }
            }

            if (caseSensitiveMatchIndex >= 0) {
              this.index = caseSensitiveMatchIndex;
              canSelect = true;
            } else if (matchIndex >= 0) {
              this.index = matchIndex;
              canSelect = true;
            }
          } else canSelect = this.entryCount > 0 && !this.liIsHeading(this.getCurrentEntry());

          this.fieldValIsListVal_ = canSelect;

          if (canSelect) {
            this.active = false;
            this.updateElement(this.getCurrentEntry());
            this.storeSelectedItem(); // Queue the list selection event before doing further processing,
            // which might trigger other events (i.e. the duplication warning event.)

            if (Def.Autocompleter.Event.callbacks_ !== null) this.listSelectionNotification(valTyped, true); // Now continue with the processing of the selection.

            this.processedFieldVal_ = Def.Autocompleter.getFieldVal(this.element);
            this.setMatchStatusIndicator(true);
            this.setInvalidValIndicator(false);
            this.propagateFieldChanges();
            if (this.multiSelect_) this.moveEntryToSelectedArea();
          } // Don't hide the list if this is a multi-select list.


          if (!this.multiSelect_) {
            this.active = false;
            this.hide();
          }
        }

        return canSelect;
      },

      /**
       *  Overrides the base selectEntry to handle the updating of the code field,
       *  etc.  This function assumes that the caller knows there is something
       *  to select.
       */
      selectEntry: function selectEntry() {
        this.attemptSelection(); // should always succeed (per pre-conditions).
      },

      /**
       *  Takes appropriate action when the user enters something in the field
       *  that is not a list item.
       */
      handleNonListEntry: function handleNonListEntry() {
        this.propagateFieldChanges(false); // For a single selection list, clear the stored selection

        if (!this.multiSelect_) {
          this.selectedCodes_ = {};
          this.selectedItems_ = {};
        } // Blank values should not look different than values that haven't been
        // filled in.  They are okay-- at least until a submit, at which point
        // blank required fields will be brought to the user's attention.


        var fieldVal = Def.Autocompleter.getFieldVal(this.element);

        if (Def.Autocompleter.getFieldVal(this.element) === '') {
          this.setMatchStatusIndicator(true);
          this.setInvalidValIndicator(false);
          this.storeSelectedItem(''); // Send a list selection event for this case.

          if (Def.Autocompleter.Event.callbacks_ !== null) this.listSelectionNotification('', false);
          this.processedFieldVal_ = fieldVal;
        } else {
          if (this.enabled_) // i.e. if there is a list that should be matched
            this.setMatchStatusIndicator(false); // Send a list selection notification for non-matching values too, even
          // if non-matching values aren't allowed (in which case the AngularJS
          // directive listener needs to clean up the model value).

          if (Def.Autocompleter.Event.callbacks_ !== null) this.listSelectionNotification(this.getValTyped(), false);

          if (this.matchListValue_) {
            Def.Autocompleter.screenReaderLog('For this field your entry must match an item from the suggestion list.'); // If the element is not blank, and if a match is required, we set the
            // invalid value indicator.

            this.setInvalidValIndicator(true); // Refocus the field.  We have to wait until after the pending
            // focus event (for whatever element might be getting the focus) is
            // processed.  Waiting the smallest amount of time should be sufficient
            // to push this after the pending events.

            this.refocusInProgress_ = true;
            this.processedFieldVal_ = fieldVal;
            setTimeout(jQuery.proxy(function () {
              this.element.focus();
              this.element.select(); // select the text
              // Clear refocusInProgress_, which onFocus also clears, because
              // onFocus isn't called if the field is still focused when focus()
              // is called above.  That happens when you hit return to select an
              // invalid value.

              this.refocusInProgress_ = false;
            }, this));
          } else {
            this.storeSelectedItem();
            if (this.multiSelect_) this.moveEntryToSelectedArea(); // resets processedFieldVal_
            else this.processedFieldVal_ = fieldVal; // See if we can find some suggestions for what the user typed.
            // For now, we do not support suggestions for multiselect lists.

            if (this.findSuggestions && this.nonMatchSuggestions_ && !this.multiSelect_) {
              // Use a timeout to let the event that triggered this call finish,
              // before we notify suggestion listeners which might bring up a
              // dialog box and change the focus state and interfere
              // with subsequent event handlers after this one.
              // (This was to fix issue 4569, in which the drug use status field's
              // list showed up on top of the dialog box, even though the field
              // had lost focus.  What happened there is that the showing of the
              // dialog box came before the navigation code's attempt to focus
              // the status field, and then when focus() was called the dialog
              // somehow called blur() on the field (perhaps using event capturing)
              // before the autocompleter's focus event handler ran.)
              setTimeout(jQuery.proxy(function () {
                this.findSuggestions();
              }, this));
            }
          }
        }
      },

      /**
       *  An event function for when the field changes.
       * @param event the DOM event object for the change event
       */
      onChange: function onChange(event) {
        this.domCache.invalidate('elemVal');

        if (!Def.Autocompleter.completionOptionsScrollerClicked_) {
          // We used to only process the change if this.enabled_ was true.  However,
          // if the list field is changed by a RecordDataRequester, it will not
          // be active and might have an empty list.
          this.handleDataEntry(event);
        }
      },

      /**
       *  An event function for when the field loses focus.
       * @param event the DOM event object for the blur event
       */
      onBlur: function onBlur(event) {
        // Ignore blur events on the completionOptionsScroller.
        if (!Def.Autocompleter.completionOptionsScrollerClicked_) {
          // Cancel any active scroll effect
          if (this.lastScrollEffect_) this.lastScrollEffect_.cancel(); // If the user did not type in the field but the value is different from the
          // value when the field was focused (such as via down arrow or a click)
          // we need to simulate the change event.

          var elemVal = Def.Autocompleter.getFieldVal(this.element);
          if (elemVal !== this.processedFieldVal_) Def.Event.simulate(this.element, 'change');

          if (this.enabled_ && !this.refocusInProgress_) {
            // The scriptaculous autocompleter uses click events on the list,
            // and so has to do its hide() call via a timeout.  We're using
            // mousedown events, which means the field never loses focus when a list
            // item is clicked, so we can just make the call directly.  For this
            // reason, we don't call the base onBlur.
            // Autocompleter.Base.prototype.onBlur.apply(this, [event]);
            this.hide();
            this.hasFocus = false;
            this.active = false; // If the field is invalid and not being refocused (as it would be if the
            // user changed the field value to something invalid) clear the field
            // value.
            // Since the empty field is not an invalid field, we need to set the
            // invalid indicator to false

            if (this.invalidStatus_) this.clearInvalidFieldVal();else {
              // If the user retyped a non-list value that was in the field, and that
              // value that matches part of an entry but not completely, and the field
              // allows non-list values, then the no-match indicator will have been
              // turned off and no change event will get fired.  We turn it back on
              // here.
              // However, another case is where the user makes a saved row editable, clicks
              // in the new prefetched field (e.g. the strength field) and clicks out again
              // leaving the old value there.  In that case, we do not know whether the field
              // value is in the list or not, because the user has not changed the value.  We
              // could check each item in the list for prefetched lists but not for search lists;
              // however it seems okay to leave the match status indicator alone in this case.  In
              // this case fieldValIsListVal_ will be null (neither true nor false).
              //
              // A third case:  If the user types an invalid value into a field,
              // then erases it and leaves the field, the field is now empty and
              // should have the no-match indicator removed.  In all cases where
              // the field is blank, the no-match indicator should be removed.
              if (Def.Autocompleter.getFieldVal(this.element) === '') this.setMatchStatusIndicator(true);else if (this.fieldValIsListVal_ === false) this.setMatchStatusIndicator(false);
            }
          }
        }
      },

      /**
       *  Clears an (assumed) invalid value from the list field, and resets the
       *  invalid indicator.
       */
      clearInvalidFieldVal: function clearInvalidFieldVal() {
        this.setFieldVal('', false);
        this.setInvalidValIndicator(false); // Also clear the match status flag, because a blank value is okay
        // (except for required fields when the form submits).

        this.setMatchStatusIndicator(true);
        this.listSelectionNotification('', false);
        this.processedFieldVal_ = '';
      },

      /**
       *  A method that gets called when the field gains the focus.
       * @param event the DOM event object for the focus event
       */
      onFocus: function onFocus(event) {
        Def.Autocompleter.currentAutoCompField_ = this.element.id; // Don't update processedFieldVal_ if we are refocusing due to an invalid
        // value.  processedFieldVal_ should retain the last non-invalid value in
        // the field.

        if (!this.refocusInProgress_) this.processedFieldVal_ = Def.Autocompleter.getFieldVal(this.element);
        this.refocusInProgress_ = false;
        this.preFieldFillVal_ = null;
        Def.Autocompleter.Event.notifyObservers(this.element, 'FOCUS', {
          start_val: this.processedFieldVal_
        }); // If this is a multi-select list, announce any items in the selected
        // area.

        if (this.multiSelect_) {
          var selectedItems = Object.getOwnPropertyNames(this.selectedItems_);
          var numSelected = selectedItems.length;

          if (numSelected > 0) {
            var msg = 'Above this multi-select field are deselection buttons for ' + 'each selected item.  Currently selected:' + selectedItems.join(', ');
            Def.Autocompleter.screenReaderLog(msg);
          }
        }
      },

      /**
       *  Handles click events on the option list.
       * @param event the DOM event object for the mouse event
       */
      onMouseDown: function onMouseDown(event) {
        // Only process the event if the item is not a heading, but in all cases
        // stop the event so that the list stays open and the field retains focus.
        Def.Autocompleter.stopEvent(event);
        var itemElem = event.target;

        while (itemElem && itemElem.autocompleteIndex === undefined) {
          itemElem = itemElem.parentNode;
        }

        if (itemElem && !this.liIsHeading(itemElem)) {
          this.clickSelectionInProgress_ = true;
          this.index = itemElem.autocompleteIndex;
          this.selectEntry();
          this.hide();
          this.clickSelectionInProgress_ = false; // Reshow the list if this is a multi-select list.

          if (this.multiSelect_) this.showList();
        }

        this.tokenBounds = null; // selection point may have moved
      },

      /**
       *  Handles entry of an item.
       * @param event the DOM event signaling the data entry
       */
      handleDataEntry: function handleDataEntry(event) {
        if (this.invalidStatus_ && this.processedFieldVal_ === this.domCache.get('elemVal')) this.clearInvalidFieldVal();else {
          // If there was a pending autocompletion event (key event) clear it so we
          // don't reshow a list right after this selection.
          if (this.observer) clearTimeout(this.observer);
          var elemVal = Def.Autocompleter.getFieldVal(this.element); // If the user has changed the value since the last entry/selection,
          // try to use the value to select an item from the list.
          // Don't attempt to make a selection if the user has cleared the field,
          // unless this is a multiselect list, in which case the field will be
          // cleared if another item was selected before this one.
          // Also, note that for multiselect lists the value in the field might
          // not have changed.  It can remain blank while the enter is pressed
          // repeatedly.

          var selectionSucceeded = false;
          if (this.processedFieldVal_ !== elemVal && elemVal !== '') selectionSucceeded = this.attemptSelection();else if (this.multiSelect_ && elemVal === '' && this.index >= 0) selectionSucceeded = this.attemptSelection(); // If the value changed but we couldn't select it from the list, treat
          // it as a non-list entry.

          if (this.processedFieldVal_ !== elemVal && !selectionSucceeded) {
            if (elemVal === "") this.fieldValIsListVal_ = false;
            this.handleNonListEntry();
          }

          if (!this.multiSelect_) {
            this.hide();
            this.active = false;
          } // Stop the event if the field is in an invalid state (to avoid form
          // submission.)


          if (!event.stopped && this.matchListValue_ && this.invalidStatus_) Def.Autocompleter.stopEvent(event);
        }
      },

      /**
       *  Returns true if the given list item is a list heading rather than a
       *  list item.
       * @param itemText the text of the item from the list
       */
      itemTextIsHeading: function itemTextIsHeading(itemText) {
        var rtn = !!this.numHeadings_; // true if headings exist

        if (rtn) {
          // if there are headings
          if (!this.itemToDataIndex_) this.initItemToDataIndex();
          var listDataIndex = this.itemToDataIndex_[itemText]; // heading level 0 means not a heading

          rtn = listDataIndex !== undefined && !!this.indexToHeadingLevel_[listDataIndex];
        }

        return rtn;
      },

      /**
       *  Returns true if the given LI element is a list heading rather than a
       *  list item.
       * @param li the LI DOM element from the list
       */
      liIsHeading: function liIsHeading(li) {
        var rtn = !!this.numHeadings_; // true if headings exist

        if (rtn) {
          // if there are headings
          rtn = this.itemTextIsHeading(this.listItemValue(li));
        }

        return rtn;
      },

      /**
       *  Gets called when the list needs to be shown.
       * @param element the autocompleter's field
       * @param update the DOM element that gets updated with the list
       */
      onShow: function onShow(element, update) {
        element.autocomp.showList();
      },

      /**
       *  Gets called when the list needs to be hidden.
       * @param element the autocompleter's field
       * @param update the DOM element that gets updated with the list
       */
      onHide: function onHide(element, update) {
        element.autocomp.hideList();
      },

      /**
       *  Moves the selected item to the other column, if there are two columns
       *  in the list.  (This is called when the user hits the right or left arrow.)
       *  This method assumes that the list is active and there is a selected item
       *  in the list (i.e., that the user has arrowed down into the list).
       * @param event the event that triggered this.  If moving to the other
       *  column is possible, the event will be stopped.
       */
      moveToOtherColumn: function moveToOtherColumn(event) {
        // This is designed to work whether the number of items is odd or even.
        // If the number of items is odd and the current index is the middle
        // value, then there is no item in the other column so we don't move it.
        // Note that the index starts at zero (so 0 to 6 for 7 items).
        var numItems = Def.Autocompleter.listItemElements().length;
        var half = Math.floor(numItems / 2); // e.g. 3 if numItems == 6 or 7

        var shift = Math.ceil(numItems / 2.0); // e.g. 4 if numItems == 7

        var newIndex = this.index;
        if (this.index < half) // e.g. 0, 1, or 2 if numItems == 6 or 7
          newIndex = this.index + shift;else if (this.index >= shift) // e.g. >= 4 if numItems == 7
          newIndex = this.index - shift;

        if (newIndex !== this.index) {
          // Make sure the new index is not a header item.  If so, don't move.
          var newItem = this.getEntry(newIndex);

          if (!this.liIsHeading(newItem)) {
            // Put the value into the field, but don't run the change event yet,
            // because the user has not really selected it.
            this.index = newIndex;
            this.setFieldVal(this.listItemValue(newItem), false);
            this.element.select();
            this.render();
            Def.Autocompleter.stopEvent(event);
          }
        }
      },

      /**
       *  This gets called when the "See more items" link is clicked.  It should
       *  be overridden by subclasses as appropriate.  This default implementation
       *  does nothing.
       * @param event the click event on the link
       */
      handleSeeMoreItems: function handleSeeMoreItems(event) {},

      /**
       *  "Reads" the searchCount and moreResults divs via the ScreenReaderLog.
       */
      readSearchCount: function readSearchCount() {
        var rtn = false;

        if ($('searchCount').style.display !== 'none') {
          Def.Autocompleter.screenReaderLog('Showing ' + $('searchCount').innerHTML + '.');

          if ($('moreResults').style.display !== 'none') {
            Def.Autocompleter.screenReaderLog('Pressing control+return will expand the list.');
          }

          rtn = true;
        }

        return rtn;
      },

      /**
       *  This can be called when an autocompleter is no longer needed.
       *  It performs any needed cleanup of field references and event listeners.
       *  Most sub-classes should not override this directly, but override
       *  stopObservingEvents and detachFromDOM instead.
       */
      destroy: function destroy() {
        //Def.Logger.logMessage(['in autoCompBase.destroy, this.element.id = ',
        //                       this.element.id]) ;
        this.stopObservingEvents();
        this.detachFromDOM();
      },

      /**
       *  This can be called to detach an autocompleter's event listeners.
       */
      stopObservingEvents: function stopObservingEvents() {
        jQuery(this.element).unbind();
      },

      /**
       *  Frees any references this autocompleter has to DOM objects.
       */
      detachFromDOM: function detachFromDOM() {
        this.element.autocomp = null;
        this.element = null;
        this.update = null;
        this.listContainer = null;
        this.recDataRequester_ = null; // has DOM references
      },

      /**
       *  Updates the field with the selected list item value.
       * @param selectedElement the DOM list element (LI or TR) the user selected.
       */
      updateElement: function updateElement(selectedElement) {
        var selectedVal = this.listItemValue(selectedElement);
        var newFieldVal = selectedVal;

        if (this.options.tokens) {
          // We're autocompleting on paritial field values
          var bounds = this.getTokenBounds();

          if (bounds[0] != -1) {
            var currentVal = this.domCache.get('elemVal');
            var newValue = currentVal.substr(0, bounds[0]);
            var whitespace = currentVal.substr(bounds[0]).match(/^\s+/);
            if (whitespace) newValue += whitespace[0];
            newFieldVal = newValue + selectedVal + currentVal.substr(bounds[1]);
          }
        }

        this.setFieldVal(newFieldVal, false); // The "false" argument above means do not run change observers.  After
        // this gets called, propagateFieldChanges is called, and that takes care
        // of running change event handlers.

        if (this.options.afterUpdateElement) this.options.afterUpdateElement(this.element, selectedElement);
      },

      /**
       *  Shows the list.
       */
      show: function show() {
        if (jQuery(this.update).css('display') == 'none') this.options.onShow(this.element, this.update);

        if (!this.iefix && Browser.IE && jQuery(this.update).css('position') == 'absolute') {
          new Insertion.After(this.update, '<iframe id="' + this.update.id + '_iefix" ' + 'style="display:none;position:absolute;filter:progid:DXImageTransform.Microsoft.Alpha(opacity=0);" ' + 'src="javascript:false;" frameborder="0" scrolling="no"></iframe>');
          this.iefix = $(this.update.id + '_iefix');
        }

        if (this.iefix) setTimeout(jQuery.proxy(this.fixIEOverlapping, this), 50);
      },
      // This originally came from controls.js in Scriptaculous.  It seems to be working
      // around some IE bug.  (Rewritten to use jQuery.)
      fixIEOverlapping: function fixIEOverlapping() {
        var updatePos = this.update.offset();
        this.iefix.style.left = updatePos.left;
        if (!this.update.style.height) this.update.style.top = updatePos.top;
        this.iefix.style.zIndex = 1;
        this.update.style.zIndex = 2;
        jQuery(this.iefix).show();
      },

      /**
       *  Hides the list.
       */
      hide: function hide() {
        if (jQuery(this.update).css('display') != 'none') this.options.onHide(this.element, this.update);
        if (this.iefix) jQuery(this.iefix).hide();
      },

      /**
       *  Determines the state of the list and its items and shows/hides it as
       *  appropriate.
       */
      render: function render() {
        if (this.entryCount > 0) {
          for (var i = 0; i < this.entryCount; i++) {
            this.index == i ? jQuery(this.getEntry(i)).addClass("selected") : jQuery(this.getEntry(i)).removeClass("selected");
          }

          if (this.hasFocus) {
            this.show();
            this.active = true;
          }
        } else {
          this.active = false;
          this.hide();
        }
      },

      /**
       *  Returns the DOM node corresponding to the list item at the given index.
       * @param index the zero-based index of the list item to retrieve.
       */
      getEntry: function getEntry(index) {
        return Def.Autocompleter.listItemElements()[index];
      },
      // Copied as-is from controls.js  (remove this comment if you modify it).
      getCurrentEntry: function getCurrentEntry() {
        return this.getEntry(this.index);
      },
      onObserverEvent: function onObserverEvent() {
        this.domCache.invalidate('elemVal'); // presumably the field value changed

        this.changed = false;
        this.tokenBounds = null;

        if (this.getToken().length >= this.options.minChars) {
          this.getUpdatedChoices();
        } else {
          this.active = false;
          this.hide();
        }

        this.oldElementValue = this.domCache.get('elemVal');
      }
    }; // end Def.Autocompleter.Base class

    jQuery.extend(Def.Autocompleter.Base.prototype, tmp);
    tmp = null;
  }

  if (true) module.exports = initializeBase;else {}
})();

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

// This file contains auto-completer code for the Data Entry Framework project.
// These autocompleters are based on the Autocompleter.Base class defined
// in the Script.aculo.us controls.js file.
(function () {
  function definePrefetch($, jQuery, Def) {
    "use strict";

    var Class = Def.PrototypeAPI.Class;
    var Browser = Def.PrototypeAPI.Browser;
    /**
     *  A prefetched list autocompleter.  This is extended from the Scriptaculous
     *  local autocompleter, and then from our autocompleter base class (so
     *  our settings override those of the Scriptaculous autocompleter).
     */

    Def.Autocompleter.Prefetch = Class.create();
    Def.Autocompleter.Prefetch.constructor = Def.Autocompleter.Prefetch;
    jQuery.extend(Def.Autocompleter.Prefetch.prototype, Def.Autocompleter.Base.prototype);
    Def.Autocompleter.Prefetch.prototype.className = 'Def.Autocompleter.Prefetch'; // Define a temporary object for extending the Prefetch.prototype, which we
    // will do below.  This helps NetBeans find the methods and constants.

    var tmp = {
      /**
       * The HTML that goes before the sequence number (if used).
       */
      SEQ_NUM_PREFIX: '<span class="listNum">',

      /**
       *  The separator between the sequence number (if used) and the list item.
       *  (Note:  The </span> matches an opening <span> before the sequence number.
       */
      SEQ_NUM_SEPARATOR: ':</span>&nbsp; ',

      /**
       *  Whether the field failed validation the last time validation was
       *  run.
       */
      validationFailed_: false,

      /**
       *  Whether or not the list has been changed since construction.
       */
      listIsOriginal_: true,

      /**
       *  The list of options before the addition of item numbers.  Items in this
       *  list will match the value of the field after an item is selected.
       */
      rawList_: null,

      /**
       *  An array of the codes for the items in the list.
       */
      itemCodes_: null,

      /**
       *  Keeps track of whether the autocompleter has made an attempt to
       *  retrieve its list using a RecordDataRequester.
       */
      listLoadAttempted_: false,

      /**
       *  This is set to true when the user clicks on the "see more items" link.
       */
      seeMoreItemsClicked_: false,

      /**
       *  Whether the list shown to the user should be based on matches with
       *  the current field value.
       */
      matchListItemsToField_: false,

      /**
       *  The default selection index for this list when the field is empty.
       */
      defaultSelectionIndex_: null,

      /**
       *  If true, the field will be filled in with
       *  the list's value if there is just one item in the list.
       */
      autoFill_: true,

      /**
       *  The constructor.  (See Prototype's Class.create method.)
       *
       * @param field the ID or the DOM element of the field for which the
       *  list is displayed.  If an element is provided, it must contain an ID
       *  attribute, or one will be assigned.
       * @param listItems the array of completion options (list values).  If not
       *  specified here, the list will be supplied later by a call to the
       *  setListAndField function.
       * @param options A hash of optional parameters.  The allowed keys and their
       *  values are:
       *  <ul>
       *    <li>addSeqNum - whether sequence numbers should be added to the items
       *        in the prefetched answer list (default true).</li>
       *    <li>codes - the array of codes for the list values in "listItems"</li>
       *    <li>dataRequester - A DataRecordRequester for getting additional data
       *     after the user makes a selection from the completion list.  This may be
       *     null, in which case no request for additional data is made.</li>
       *    <li>matchListValue - whether the field should validate its value
       *      against the list (default: false)</li>
       *    <li>autoFill - If true, the field will be filled in with
       *      the list's value if there is just one item in the list.</li>
       *    <li>suggestionMode - an integer specifying what type of suggestion
       *      should be offered based on what the user has typed.  For values, see
       *      defAutocompleterBaseInit in autoCompBase.js.
       *    <li>itemToHeading - a hash of item codes to codes of item headings,
       *     where both items and headings appear in the listItems array.  This
       *     parameter requires that the codes parameter also be supplied.</li>
       *    <li>defaultValue - Either the code or the item text of the default value
       *     for this list's field.</li>
       *    <li>maxSelect - (default 1) The maximum number of items that can be
       *     selected.  Use '*' for unlimited.</li>
       *    <li>scrolledContainer - the element that should be scrolled to bring
       *     the list into view if it would otherwise extend below the edge of the
       *     window. The default is document.documentElement (i.e. the whole
       *     window).  This may be null if no scrolling is desired (e.g. if the
       *     list field is in a fixed position on the window), but in that
       *     case the list element might be unusually short.
       *     Note:  At present the only tested cases of this parameter are the
       *     default value and null.</li>
       *    <li>headerBar - If the page has a fixed-position element at the top of
       *     the page (e.g. a top navigation bar), the autocompleter needs to know
       *     that so that when scrolling to show the list it doesn't scroll the current
       *     field under the header bar.  This is the element ID for such a header
       *     bar.</li>
       *  </ul>
       */
      initialize: function initialize(id, listItems, options) {
        // Add Scriptaculous defaults, modified
        options = jQuery.extend({
          ignoreCase: true,
          fullSearch: false,
          selector: this.selector,
          onShow: this.onShow,
          onHide: this.onHide
        }, options || {});
        var addSeqNum = options['addSeqNum'];
        this.add_seqnum = addSeqNum === undefined ? true : addSeqNum;
        var autoFill = options['autoFill'];
        if (autoFill !== undefined) this.autoFill_ = autoFill; // Call the base class' initialize method.  We do this via the "apply"
        // function, which lets us specify the "this" object plus an array of
        // arguments to pass in to the method.

        if (!Def.Autocompleter.Base.classInit_) Def.Autocompleter.Base.classInit();
        this.initHeadings(options);
        this.defAutocompleterBaseInit(id, options); // Set up event observers.

        jQuery(this.element).focus(jQuery.proxy(this.onFocus, this));
        jQuery(this.element).click(jQuery.proxy(this.onFieldClick, this)); // The base class sets up one for a "blur" event.

        var codes = options['codes'];
        this.setList(listItems, codes);
        this.listIsOriginal_ = true; // reset this after calling setList

        this.originalCodes_ = codes;
        this.options.minChars = 0; // do autocompletion even if the field is blank

        this.splitAutocomp_ = false;
        jQuery(this.element).addClass('ansList');
      },

      /**
       *  Populates the list based on the field content.
       */
      getUpdatedChoices: function getUpdatedChoices() {
        this.trimmedElemVal = this.domCache.get('elemVal').trim();
        this.updateChoices(this.options.selector(this), this.pickedByNumber());
      },

      /**
       *  Used by dupForField to duplicate the item to indices map when creating a
       *  copy of this autocompleter for another field.  The map will not be
       *  copied if this autocompleter is not using its original list.  (The
       *  idea is that for fields that are given a list to begin with it makes
       *  sense to copy the map when duplicating, but for fields that
       *  are assigned lists from other actions, it does not make sense to copy
       *  the map.)
       * @param dupAutoComp the duplciate autocompleter instance.
       */
      dupItemToDataIndex: function dupItemToDataIndex(dupAutoComp) {
        if (this.listIsOriginal_) {
          // Give the copy our hashmap of list items to codes.
          if (!this.itemToDataIndex_) this.initItemToDataIndex(); // so each copy doesn't have to do it

          dupAutoComp.itemToDataIndex_ = this.itemToDataIndex_;
        }
      },

      /**
       *  A copy constructor, for a new field (e.g. another field in a new row
       *  of a table).
       * @param fieldID the ID of the field being assigned to the new autocompleter
       *  this method creates.
       * @return a new autocompleter for field field ID
       */
      dupForField: function dupForField(fieldID) {
        var dataReq = this.dupDataReqForField(fieldID);
        var opts = {};
        jQuery.extend(true, opts, this.constructorOpts_);
        opts['dataRequester'] = dataReq;
        var rtn = new Def.Autocompleter.Prefetch(fieldID, this.rawList_, opts);
        this.dupItemToDataIndex(rtn);
        return rtn;
      },

      /**
       *  Initializes data structures needed to support headings.
       * @param options the options parameter passed into the constructor.
       */
      initHeadings: function initHeadings(options) {
        var codes = options['codes'];
        var itemToHeading = options['itemToHeading'];

        if (itemToHeading) {
          // Remove this from the options so we don't re-do this part if we
          // duplicate the field.
          options['itemToHeading'] = null; // Initialize indexToHeadingLevel_

          var headingCodeLevels = {};
          var indexToHeadingLevel = {};

          for (var i = 0, max = codes.length; i < max; ++i) {
            var itemCode = codes[i];
            var headingCode = itemToHeading[itemCode];

            if (headingCode) {
              // else this item has no heading
              var hcLevel = headingCodeLevels[headingCode];

              if (!hcLevel) {
                // See if this heading has a parent heading, and make this heading's
                // level one more than the parent's level.
                // Assume the parent heading would have been processed ealier,
                // which it would have been if the list items were in order.
                var phCode = itemToHeading[headingCode];
                hcLevel = phCode ? headingCodeLevels[phCode] + 1 : 1;
                headingCodeLevels[headingCode] = hcLevel;
              }
            }
          }

          for (i = 0, max = codes.length; i < max; ++i) {
            hcLevel = headingCodeLevels[codes[i]];
            indexToHeadingLevel[i] = hcLevel ? hcLevel : 0;
          }

          this.indexToHeadingLevel_ = indexToHeadingLevel;
          options['indexToHeadingLevel'] = indexToHeadingLevel;
          this.numHeadings_ = Object.keys(headingCodeLevels).length;
          options['numHeadings'] = this.numHeadings_;
        } else if (options['indexToHeadingLevel']) {
          this.indexToHeadingLevel_ = options['indexToHeadingLevel'];
          this.numHeadings_ = options['numHeadings'];
        }
      },

      /**
       *  Initializes itemToDataIndex_, based on the current value of this.rawList_.
       */
      initItemToDataIndex: function initItemToDataIndex() {
        this.itemToDataIndex_ = {};

        if (this.rawList_) {
          for (var i = 0, max = this.rawList_.length; i < max; ++i) {
            this.itemToDataIndex_[this.rawList_[i]] = i;
          }
        }
      },

      /**
       *  Generates the list of items that match the user's input.  This was
       *  copied from the Scriptaculous controls.js Autocompleter.Local.prototype
       *  and modified (initially to allow matches at word boundaries).
       *  For focus events that are not due to a mouse click selection, we show
       *  the full list.
       * @param instance the autocompleter instance
       *
       * @return the HTML for the list.
       */
      selector: function selector(instance) {
        var ret = []; // Beginning matches

        var partial = []; // Inside matches

        var entry = instance.getToken();
        var totalCount = 0;
        var suggestionIndex = null;
        var useFullList = !instance.matchListItemsToField_ || instance.domCache.get('elemVal').trim() === ''; // If the user selected "See More Items", find all the matches.
        // Otherwise, limit the find to the maximum number of items we
        // show in the regular list (*2 because we allow two columns).

        var maxReturn = instance.seeMoreItemsClicked_ ? Infinity : Def.Autocompleter.Base.MAX_ITEMS_BELOW_FIELD * 2;
        var maxItemsPerHeading = useFullList && !instance.seeMoreItemsClicked_ ? Math.floor(maxReturn / instance.numHeadings_) : Infinity;
        if (maxItemsPerHeading < 1) maxItemsPerHeading = 1;
        var countForLastHeading = 0; // number of items for the last header

        var itemsInList = [];
        var itemToHTMLData = {};
        var lastHeading = null;
        var foundItemForLastHeading = false;
        var headerCount = 0;
        var headingsShown = 0;
        var skippedSelected = 0; // items already selected that are left out of the list

        var escapeHTML = Def.Autocompleter.Base.escapeAttribute;
        if (instance.options.ignoreCase) entry = entry.toLowerCase();

        for (var i = 0, max = instance.rawList_.length; i < max; ++i) {
          var tmp = instance.indexToHeadingLevel_[i];
          var isSelectedByNumber = false;

          if (tmp) {
            lastHeading = instance.rawList_[i];
            foundItemForLastHeading = false;
            ++headerCount;
          } else {
            var itemText = null; // Find all of the matches, even though we don't return them all,
            // so we can give the user a count.
            // This part does not yet support multi-level headings

            var rawItemText = instance.rawList_[i];

            if (useFullList) {
              ++totalCount;
              itemText = escapeHTML(rawItemText);
            } // We need to be careful not to match the HTML we've put around the
            // list numbers.
            // See if the entry matches a number.


            var itemNumStr = null;
            var matchesItemNum = false; // exact match

            var matchInItemNum = false; // partial match

            if (instance.add_seqnum) {
              itemNumStr = i + 1 - headerCount + '';
              var isSelectedByNumber = itemNumStr === entry;

              if (!useFullList && (isSelectedByNumber || itemNumStr.indexOf(entry) === 0)) {
                ++totalCount;
                matchInItemNum = true;

                if (isSelectedByNumber || totalCount <= maxReturn) {
                  itemNumStr = '<strong>' + itemNumStr.substr(0, entry.length) + '</strong>' + itemNumStr.substr(entry.length);
                  matchesItemNum = true;
                  itemText = instance.SEQ_NUM_PREFIX + itemNumStr + instance.SEQ_NUM_SEPARATOR + escapeHTML(rawItemText);
                }
              }
            } // if we're adding sequence numbers to this list


            if (!matchInItemNum && !useFullList) {
              // See if it matches the item at the beginning
              var foundMatch = false;
              var elemComp = rawItemText;
              if (instance.options.ignoreCase) elemComp = rawItemText.toLowerCase();
              var foundPos = elemComp.indexOf(entry);

              while (!foundMatch && foundPos !== -1) {
                if (foundPos === 0) {
                  ++totalCount;
                  foundMatch = true;

                  if (totalCount <= maxReturn) {
                    itemText = '<strong>' + escapeHTML(rawItemText.substr(0, entry.length)) + '</strong>' + escapeHTML(rawItemText.substr(entry.length));
                  }
                } else {
                  // foundPos > 0
                  // See if the match is at a word boundary
                  if (instance.options.fullSearch || /(.\b|_)./.test(elemComp.substr(foundPos - 1, 2))) {
                    ++totalCount;
                    foundMatch = true;

                    if (totalCount <= maxReturn) {
                      var prefix = escapeHTML(rawItemText.substr(0, foundPos));
                      itemText = prefix + '<strong>' + escapeHTML(rawItemText.substr(foundPos, entry.length)) + '</strong>' + escapeHTML(rawItemText.substr(foundPos + entry.length));
                    }
                  }
                }

                if (!foundMatch) foundPos = elemComp.indexOf(entry, foundPos + 1);
              } // while we haven't found a match at a word boundary

            } // if it didn't match the item number


            var alreadySelected = false;

            if (instance.multiSelect_) {
              alreadySelected = instance.isSelected(rawItemText);
              if (alreadySelected) ++skippedSelected;
            } // Make sure that if the item's number is an exact match for what was
            // typed, it gets into the list (unless already selected).
            // For multi-select lists, filter out currently selected items.
            // Then, only add it if we haven't exceeded the limit.


            if (!alreadySelected && itemText && (isSelectedByNumber || totalCount <= maxReturn || instance.numHeadings_ > 0 && useFullList)) {
              if (lastHeading && !foundItemForLastHeading) {
                foundItemForLastHeading = true;
                itemsInList.push(lastHeading);
                ++headingsShown;
                itemToHTMLData[lastHeading] = [escapeHTML(lastHeading), 'heading'];
                countForLastHeading = 0;
              }

              if (!useFullList || !instance.numHeadings_ || countForLastHeading < maxItemsPerHeading || isSelectedByNumber) {
                if (!matchesItemNum && instance.add_seqnum) {
                  itemText = instance.SEQ_NUM_PREFIX + itemNumStr + instance.SEQ_NUM_SEPARATOR + itemText;
                }

                itemsInList.push(rawItemText);
                if (isSelectedByNumber) suggestionIndex = itemsInList.length - 1;
                itemToHTMLData[rawItemText] = [itemText];
                if (useFullList) ++countForLastHeading;
              }
            }
          } // else this is not a heading

        } // for each item


        var itemsShownCount = itemsInList.length - headingsShown;

        if (totalCount > itemsShownCount + skippedSelected) {
          $('searchCount').innerHTML = itemsShownCount + ' of ' + totalCount + ' items total';
          $('moreResults').style.display = 'block';
          $('searchCount').style.display = 'block';
        } else {
          $('moreResults').style.display = 'none';
          $('searchCount').style.display = 'none';
        }

        return instance.buildHTML(itemsInList, itemToHTMLData, suggestionIndex);
      },

      /**
       *  Constructs the HTML for the list.
       * @param itemsInList an array of the raw item text for the items to shown
       * @param itemToHTMLData a hash from raw item texts to an array of data for
       *  the HTML output.  The first item should be the item text with any needed
       *  HTML markup.  The second item, if present, should be a class to apply to
       *  the item's row in the list.
       * @param suggestionIndex the index of the item found for the suggested
       *  item, or null if one is not known yet.
       */
      buildHTML: function buildHTML(itemsInList, itemToHTMLData, suggestionIndex) {
        // Don't use suggestions if there are headings, or if we are showing the
        // full list.
        var topItemIndex = -1;
        var i, topItem;
        var haveSug = suggestionIndex !== null;

        if (!this.numHeadings_ && this.matchListItemsToField_ && (haveSug || this.suggestionMode_ === Def.Autocompleter.SUGGEST_SHORTEST)) {
          var topItemIndex = haveSug ? suggestionIndex : this.pickBestMatch(itemsInList);

          if (topItemIndex >= 0) {
            // Move that item to the start of the list
            var topItem = itemsInList[topItemIndex];

            for (i = topItemIndex; i > 0; --i) {
              itemsInList[i] = itemsInList[i - 1];
            }

            itemsInList[0] = topItem;
          }
        }

        var rtn = '<ul>'; // Process the first item separately, because it might be a suggestion.

        i = 0;

        if (topItemIndex >= 0) {
          rtn += '<li class="suggestion">' + itemToHTMLData[topItem][0] + '</li>';
          ++i;
        }

        for (var len = itemsInList.length; i < len; ++i) {
          var itemData = itemToHTMLData[itemsInList[i]];
          var cls = itemData[1];
          if (cls) rtn += '<li class="' + cls + '">' + itemData[0] + '</li>';else rtn += '<li>' + itemData[0] + '</li>';
        }

        rtn += '</ul>';
        return rtn;
      },

      /**
       *  Sets the list of items.
       * @param listItems an array of strings to use for the list
       * @param itemCodes an array of codes corresponding to the items in listItems
       */
      setList: function setList(listItems, itemCodes) {
        //Def.Logger.logMessage(['in setList, listItems = [', listItems.join(', '),
        //                       '] and itemCodes = [', itemCodes.join(', '), ']'])
        //Def.Logger.logMessage(['this.element.id = ',
        //                       this.element.id])
        // Copy the list of options for future reference, and also make a hash
        // of the values for checking whether the field's value matches the list.
        // Also trim the list items before using them.
        // Some values (e.g. the strengths in the drug strength and form field)
        // have padding in front to help with the sorting.  However, once we are
        // putting them into the list, we don't need to sort them further.
        this.listIsOriginal_ = false;
        var numItems = listItems.length;
        this.rawList_ = new Array(numItems);

        for (var r = 0, max = listItems.length; r < max; ++r) {
          this.rawList_[r] = listItems[r].trim();
        }

        var displayList = new Array(numItems);
        var escapeHTML = Def.Autocompleter.Base.escapeAttribute;

        for (var i = 0; i < numItems; ++i) {
          displayList[i] = escapeHTML(this.rawList_[i]); // preprocess option list to add a serial number in the beginning of the
          // each item in the list, except for list headers

          if (this.add_seqnum === true && !this.indexToHeadingLevel_[i]) {
            displayList[i] = this.SEQ_NUM_PREFIX + (i + 1) + this.SEQ_NUM_SEPARATOR + displayList[i];
          }
        }

        this.options.array = displayList;
        this.itemCodes_ = itemCodes;
        this.itemToDataIndex_ = null; // to be built later
        // Turn off autocomplete listeners  when we don't have a list

        this.enabled_ = listItems.length > 0; // Add a class to the field if there is more than 1 item in the list
        // (so that CSS can add a small arrow-shaped background image).

        if (listItems.length > 1) jQuery(this.element).addClass('ac_multiple');else jQuery(this.element).removeClass('ac_multiple'); // If the field has focus, call onFocus to re-render and decide what
        // to do about displaying the list.

        if (this.hasFocus || document.activeElement === this.element) this.onFocus();
      },

      /**
       *  Sets the field value to a known list value.  No checking is done
       *  on the value; it is assumed that the caller knows it is a valid
       *  list value.
       */
      setFieldToListValue: function setFieldToListValue(newVal) {
        this.setFieldVal(newVal, false);
        this.fieldValIsListVal_ = true;
        this.storeSelectedItem(); // Set this value as the "processed value", so that when we send a change
        // event below, the autocompleter does not try to select the value from the
        // list (which can fail if the list is not active, e.g. when the value
        // is being set programattically, as in via selectByCode()).

        this.processedFieldVal_ = newVal; // Queue the list selection event before doing further processing,
        // which might trigger other events (i.e. the duplication warning event.)

        this.listSelectionNotification('', true);
        this.setMatchStatusIndicator(true);
        this.setInvalidValIndicator(false);
        this.propagateFieldChanges();
      },

      /**
       *  Sets the list of items.  If there is just one value in the list, the
       *  field value is set to that value too.  If there is more than one value
       *  in the list, the field value is set to blank, because the user should
       *  select a new value if the field now has a new list.
       *
       *  This is invoked when the list is populated based on the value
       *  specified in a different field.  For example, and specifically, the
       *  PHR form has a drug field (e.g. aspirin), and has a field for the
       *  combined strength and form (e.g. 325 MG Tabs).  The list of applicable
       *  strength and form values is not built until the user specifies the
       *  drug.  When that happens, the autocompleter for the drug field
       *  gets and passes the strength and form list to this TablePrefetch
       *  autocompleter.  It's called from the assignDataToFields function -
       *  see Def.Autcompleter.Base.
       *
       * @param listItems an array of strings to use for the list
       * @param itemCodes an array of codes corresponding to the items in listItems
       * @param fieldAlreadySet an optional flag that indicates whether or not
       *  the caller has taken care of updating the field value and its
       *  associated code field.  (Default is FALSE, in which case the field
       *  and code will be updated by this method.)
       * @param pickFirstItem an optional flag that indicates whether or not to set
       *  the field value with the first item in the list, even if the list is
       *  longer than 1.
       */
      setListAndField: function setListAndField(listItems, itemCodes, fieldAlreadySet, pickFirstItem) {
        if (fieldAlreadySet === undefined) fieldAlreadySet = false;
        if (pickFirstItem === undefined) pickFirstItem = false;
        this.setList(listItems, itemCodes);
        Def.Autocompleter.Event.notifyObservers(this.element, 'LIST_ASSIGNMENT', {}); // Reset the contents of the field unless the fieldAlreadySet flag
        // is set to false

        var oldValue = this.domCache.get('elemVal');
        var lenList = listItems.length;
        var newVal;

        if (fieldAlreadySet === false) {
          if (this.autoFill_ && (lenList === 1 || lenList > 1 && pickFirstItem)) newVal = this.assembleValue(listItems[0]);else newVal = ''; // Set the field value, but leave the running of change event observers
          // until later.

          this.setFieldVal(newVal, false);
          this.fieldValIsListVal_ = true;
        } // If the value changed, update stuff that needs updating.


        if (!fieldAlreadySet && oldValue !== newVal) {
          this.setFieldToListValue(newVal);
        } // Clear the no_match and invalid indicators, if they are set.
        // (Presumably, we have corrected the problem by setting the field value.)


        this.setInvalidValIndicator(false);
        this.setMatchStatusIndicator(true);
        if (this.options.afterUpdateElement) this.options.afterUpdateElement();
      },

      /**
       *  Used by setListAndField to construct an element value from one of the
       *  list items passed in.
       * @param listItem One of the list items given to setListAndField (or in
       *  the same format.
       * @return the value for the field.
       */
      assembleValue: function assembleValue(listItem) {
        return listItem.trim();
      },

      /**
       *  Override the observer event function (called after a small delay following
       *  a key stroke) so that the list position gets updated.
       */
      onObserverEvent: function onObserverEvent() {
        // First, hide the list so we don't see the list update and then move
        this.temporaryHide_ = true;
        this.hideList(); // $('searchCount').style.display = 'none';
        // $('searchHint').style.display = 'none';
        // Now call the base class' onObserverEvent

        Def.Autocompleter.Base.prototype.onObserverEvent.apply(this, []);
        this.posAnsList();
        this.showList(); // Dan Clark of Freedom Scientific reported that the search count made
        // the output for JAWS to verbose, so I am commenting out this call.
        // this.readSearchCount();

        this.temporaryHide_ = false;
      },

      /**
       *  Attempts to find a RecordDataRequester that it can use to retrieve
       *  the list for this autocompleter.  (This method assumes this autocompleter
       *  does not already have a list.)
       *
       *  @param outputFieldID - optional parameter that provides the name of
       *   the field that is to receive the list.  The default is the current
       *   element's id, which is used when this is not supplied.  This is used
       *   in those cases where the output field did/does not exist on the form
       *   and we are getting the list after the field has been created.  The
       *   use case for this is combo fields whose lists are dependent on values
       *   chosen from other (possibly combo) field lists.  An example is the
       *   drug_strength_form "field" on the fetch rule form, whose contents are
       *   dependent on a name_and_route value previously chosen.
       *
       *  @param triggerFieldID - the (also) optional parameter that provides
       *   the name of a field whose current contents are set up as a condition
       *   that later determines whether or not the autocompleter for the current
       *   or output field should be updated when the list being loaded changes.
       *   I know.  That's really convoluted.  I don't know yet how to simplify
       *   it.  lm, 10/2009.
       */
      loadList: function loadList(outputFieldID, triggerFieldID) {
        //    Def.Logger.logMessage(['in pac.loadList, this.element.id = ' ,
        //                           this.element.id, '; outputFieldID = ' ,
        //                           outputFieldID, '; triggerFieldID = ' ,
        //                           triggerFieldID]) ;
        // Set the targetField based on whether or not an outputFieldID was
        // specified
        if (outputFieldID === undefined) outputFieldID = this.element.id;
        var targetField = Def.Autocompleter.getFieldLookupKey(this.element); // Now try to get the RecordDataRequester for the output field

        this.listLoadAttempted_ = true;
        var listRdr = Def.RecordDataRequester.getOutputFieldRDR(outputFieldID); // If we got a RecordDataRequester, try to re-use the a prior data
        // request's data.  If we don't get anything for that, try to issue a new
        // request.

        if (listRdr) {
          var listData = listRdr.getFieldData(targetField);

          if (listData) {
            // Use setListAndField, because that takes care of running rules, etc.
            this.setListAndField(listData[0], listData[1], true, false);
          } else {
            // maybe the RecordDataRequester hasn't run yet
            listRdr.assignListData();
          } // If we passed in an outputFieldID, it means that we're loading a list
          // into an autocompleter whose list comes from the RecordDataRequester
          // of another autocompleter.   Add this field to that
          // RecordDataRequester's list of fields to be updated if the value
          // chosen from its list changes.  That's because if the value chosen
          // from its list changes, it will change the list that the current
          // autocompleter should be using.


          if (outputFieldID !== this.element.id) {
            var triggerField = $(triggerFieldID);
            var update_condition = [triggerFieldID, 'EQ', Def.Autocompleter.getFieldVal(triggerField)];
            listRdr.addFieldsToUpdateList(outputFieldID, this, update_condition);
          }
        } // end if we got an rdr

      },
      // end loadList

      /**
       *  Returns true if the list is empty.  (May be overridden by a subclass.)
       */
      listIsEmpty: function listIsEmpty() {
        return this.options.array.length === 0;
      },

      /**
       *  Returns the initial selection index for the list for when it is
       *  first shown (e.g. on a focus event).  This currently only works
       *  for cases where the number of items in the list does not exceed
       *  MAX_ITEMS_BELOW_FIELD.  (Otherwise, it just returns -1.)
       */
      getInitialSelectionIndex: function getInitialSelectionIndex() {
        // Set the selection index to -1, so that initially nothing is selected,
        // unless there is a field default and the field is blank, in which case
        // we use the index of the default.
        var index = -1; // default (no selection)

        if (this.domCache.get('elemVal') == '') {
          if (!this.defaultSelectionIndex_) {
            // Find the default index
            var defaultVal = this.constructorOpts_.defaultValue;

            if (defaultVal !== undefined) {
              if (this.itemCodes_) {
                // the default value should be a code
                for (var i = 0, max = this.itemCodes_.length; i < max; ++i) {
                  if (this.itemCodes_[i] === defaultVal) index = i;
                }
              }

              if (index === -1) {
                // Look for the value in the list itself.
                for (var r = 0, maxlen = this.rawList_.length; r < maxlen; ++r) {
                  if (this.rawList_[r] === defaultVal) index = r;
                }
              }
            } // If the index is less than the number of items we show below
            // the field, use it; otherwise we won't use the default, because we
            // can't show it selected in the list if it isn't visible.


            if (index >= Def.Autocompleter.Base.MAX_ITEMS_BELOW_FIELD * 2) index = -1;
            this.defaultSelectionIndex_ = index;
          } else index = this.defaultSelectionIndex_;
        }

        return index;
      },

      /**
       *  A method that gets called when the field gains the focus.
       */
      onFocus: function onFocus() {
        // Ignore blur events on the completionOptionsScroller.
        if (Def.Autocompleter.completionOptionsScrollerClicked_ === true) {
          Def.Autocompleter.completionOptionsScrollerClicked_ = false;
        } else {
          this.matchListItemsToField_ = false; // See if we should try to load the list.  Do not try if this is a combo
          // field, because in that case the field does not get its list from a
          // record data requester (it gets its type changed by it).

          if (!this.listLoadAttempted_ && this.listIsEmpty() && !this.element.comboField) {
            this.loadList();
          }

          if (this.enabled_) {
            this.listBelowField_ = true;
            this.focusInProgress_ = true;
            this.hideList(); // while we reposition

            Def.Autocompleter.Base.prototype.onFocus.apply(this);
            this.element.shakeCanceled = false;
            this.maybeShowList();
            this.index = this.getInitialSelectionIndex(); // for field defaults
            // Also put the value at "index" in the field

            if (this.index >= 0) {
              this.setFieldToListValue(this.listItemValue(this.getCurrentEntry())); //            this.selectEntry();

              this.element.select(); // select the text
              // selectEntry above will send a list selection event, so there is
              // no need to do that here.
              // selectEntry hides the list.  Call render to highlight the default
              // item and show the list.

              this.render(); // to highlight the entered item
            }

            this.focusInProgress_ = false;
          } // if enabled

        }
      },

      /**
       *  Decides whether the list should be shown, and if so, positions and shows
       *  it.  This used to be a part of onFocus.
       */
      maybeShowList: function maybeShowList() {
        this.activate(); // determines what is in the list (and resets the index)

        this.render(); // marks which item is selected
        //show the list based on following rules.

        var blnShowList = false;

        if (this.add_seqnum == false) {
          //show list if number of choices > 0 (when no sequence number was added)
          blnShowList = this.entryCount > 0;
        } else {
          //show list if number of choices > 1 and sequence number added
          if (this.entryCount > 1) {
            blnShowList = true;
          } //check if the list item value matches field value
          else if (this.entryCount == 1) {
              var value = this.listItemValue(Def.Autocompleter.listItemElements()[0]);
              blnShowList = value != this.processedFieldVal_;
            }
        }

        if (blnShowList == true) {
          // This sets the top for the initial list displayed
          // when the field first gets focus
          this.posAnsList();
          this.showList();
          this.readSearchCount();
        }
      },

      /**
       *  Handles clicks on the field.
       */
      onFieldClick: function onFieldClick() {
        if (this.enabled_ && // i.e. has list items
        this.element.id === Def.Autocompleter.currentAutoCompField_ && (!this.listShowing || this.matchListItemsToField_)) {
          //not already showing the full list
          this.matchListItemsToField_ = false; // Temporarily disable list suggestions so we just show the whole list
          // in order.

          var oldSug = this.suggestionMode_;
          this.suggestionMode_ = Def.Autocompleter.NO_COMPLETION_SUGGESTIONS;
          this.maybeShowList();
          this.suggestionMode_ = oldSug;
        }
      },

      /**
       *  Puts the focus into the field.
       */
      focusField: function focusField() {
        this.element.focus();
      },

      /**
       *  Returns the value of a list item (minus any sequence number an
       *  separator.)
       * @param li the list item DOM element.
       */
      listItemValue: function listItemValue(li) {
        var value = li.innerHTML;

        if (this.add_seqnum) {
          // Check to see if browser is IE.
          // All versions of IE convert lower case tag names to upper case - anantha (11/17/09)
          if (Browser.IE) value = value.replace("SPAN", "span");
          var index = value.indexOf(this.SEQ_NUM_SEPARATOR);
          if (index >= 0) // headings won't have the list number
            value = value.substring(index + this.SEQ_NUM_SEPARATOR.length); // Strip out any remaining tags and unescape the HTML

          value = value.replace(/(<([^>]+)>)/ig, "");
          value = Def.Autocompleter.Base.unescapeAttribute(value);
        } else value = li.textContent;

        return value;
      },

      /**
       *  Returns true if the given key event (from the input field) is a request
       *  for seeing the full list.  We are borrowing the key syntax for running
       *  a search in the search autocompleter, and reusing code (and hence the
       *  function name).
       */
      fieldEventIsBigList: function fieldEventIsBigList(event) {
        return event.ctrlKey && event.keyCode === jQuery.ui.keyCode.ENTER;
      },

      /**
       *  This gets called when the "See more items" link is clicked (or when
       *  control + return is pressed, which is another way of making the same
       *  request).
       * @param event the click event on the link
       */
      handleSeeMoreItems: function handleSeeMoreItems(event) {
        this.seeMoreItemsClicked_ = true;
        $('searchHint').style.display = 'none';
        this.listBelowField_ = false;
        this.getUpdatedChoices();
        this.posAnsList();
        this.seeMoreItemsClicked_ = false;
        this.splitAutocomp_ = false;
        Def.Autocompleter.stopEvent(event);
      },

      /**
       *  Returns the index of the item matching the given code.
       */
      findItemIndexByCode: function findItemIndexByCode(code) {
        // Find the index of the code in the list.
        var codeIndex = null;

        for (var i = 0, max = this.itemCodes_.length; i < max && !codeIndex; ++i) {
          if (code == this.itemCodes_[i]) codeIndex = i;
        }

        return codeIndex;
      },

      /**
       *  Selects an item from the list by its code value.  Both the list field and
       *  the code field are set as a result.
       * @param code the code value for the list item
       */
      selectByCode: function selectByCode(code) {
        var codeIndex = this.findItemIndexByCode(code);

        if (codeIndex != null) {
          this.setFieldToListValue(this.rawList_[codeIndex]);
        }
      },

      /**
       *  "Reads" the searchCount and moreResults divs via the ScreenReaderLog.
       * @return true if the search count was read.
       */
      readSearchCount: function readSearchCount() {
        var rtn = Def.Autocompleter.Base.prototype.readSearchCount.apply(this);

        if (!rtn && this.entryCount > 0) {
          Def.Autocompleter.screenReaderLog('Showing ' + this.entryCount + ' of ' + this.rawList_.length + ' items.');
          rtn = true;
        }

        return rtn;
      },
      // Copied as-is from controls.js  (remove this comment if you modify it).
      activate: function activate() {
        this.changed = false;
        this.hasFocus = true;
        this.getUpdatedChoices();
      }
    }; // end Def.Autocompleter.Prefetch class

    jQuery.extend(Def.Autocompleter.Prefetch.prototype, tmp);
    tmp = null; // prevent other code here from accidentally using it
  }

  if (true) module.exports = definePrefetch;else {}
})();

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

// This file defines the "search" (AJAX) autocompleter.
// These autocompleters are based on the Autocompleter.Base class defined
// in the Script.aculo.us controls.js file.
(function () {
  function defineSearch($, jQuery, Def) {
    "use strict";

    var Class = Def.PrototypeAPI.Class;
    /**
     *  An autocompleter that retrieves list options via AJAX calls.
     */

    Def.Autocompleter.Search = Class.create(); // This is the definition for the Search class methods.  We define it in
    // a temporary object to help NetBeans see it.

    var ctmp = {
      /**
       *  A cache for search result objects.  The key is the search
       *  autocompleter's base URL, and the value is a cache for queries sent to
       *  that URL.  (In a repeating line table, the cache gets shared across rows.)
       */
      urlToCache_: {},

      /**
       *  The index into the resultCache_ (an instance variable) for the part
       *  of the cache used to store autocompletion results (which are generally
       *  fewer than the search results, which can be up to 500.)
       */
      RESULT_CACHE_AUTOCOMP_RESULTS: 1,

      /**
       *  The index into the resultCache_ (an instance variable) for the part
       *  of the cache used to store search results (which generally have many
       *  more returned hits than the autcompletions results.)
       */
      RESULT_CACHE_SEARCH_RESULTS: 0,

      /**
       *  The maximum number of characters in the field for which we will send
       *  an autocompletion request.  If the field value is longer than this,
       *  we will truncate it when sending the request.
       */
      MAX_VALUE_SIZE_FOR_AUTOCOMP: 25,

      /**
       *  The constructor function.
       */
      constructor: Def.Autocompleter.Search,

      /**
       * The superclass.
       */
      superclass: Def.Autocompleter.Base.prototype
    };
    jQuery.extend(Def.Autocompleter.Search, ctmp);
    ctmp = null;
    jQuery.extend(Def.Autocompleter.Search.prototype, Def.Autocompleter.Base.prototype);
    Def.Autocompleter.Search.prototype.className = 'Def.Autocompleter.Search'; // This is the definition for the Search instance methods.  We define it in
    // a temporary object to help NetBeans see it.

    var tmp = {
      /**
       *  The pending Ajax request (if any).
       */
      lastAjaxRequest_: null,

      /**
       *  A reference to the search result cache for this autocompleter.  The
       *  results cache is an array of two hashes, where the index is the value of
       *  the "autocomp" parameter in the AJAX request, i.e, the 0th hash is
       *  the hash for the non-autocomp request (e.g. control+return to see
       *  an expanded results list) and the hash at index 1 is the hash for
       *  autocompletion results.  Each hash is a hash from the search string
       *  the autocompletion results for the string 'pro'.)
       */
      resultCache_: null,

      /**
       *  Whether we are using search result caches in this autocompleter.
       *  It might not be a good idea for all fields, but for now the default
       *  is to use it.
       */
      useResultCache_: true,

      /**
       *  The data for the suggestion list that appears when the user leaves a
       *  non-matching field value in a field for which matching values are not
       *  required.  (This could also be used for suggestions when a matching value
       *  is required, but we would need to change the message the user sees to
       *  handle that case.)
       */
      suggestionList_: null,

      /**
       *  The constructor.  (See Prototype's Class.create method.)
       * @param field the ID or the DOM element of the field for which the
       *  list is displayed.  If an element is provided, it must contain an ID
       *  attribute, or one will be assigned.
       * @param url for getting the completion list.  The website answering the
       *  URL is expected to understand the following parameters:
       *  <ul>
       *    <li>terms - the text from the field.  This should be used to find
       *     matching list items.</li>
       *    <li>maxList - if present, this signifies that this is a request
       *     for a large list of search results (e.g. by using the "see more" link
       *     on the list).  If maxList is not present, that means this is an autocompletion
       *     request and the server should return a short list (e.g. 7 items) as
       *     quickly as possible.</li>
       *    <li>authenticity_token - (optional) This is an anti-CSRF parameter.
       *     If the page has a value in window._token, it will get sent in this
       *     parameter.</li>
       *    <li>suggest - (optional) User input that does not match a list value
       *     will trigger a request for suggestions that are close to what the
       *     user typed.  A "suggest" parameter value of "1" means the request
       *     is for suggestions.</li>
       *    <li>field_val - When "suggest"==1, this contains the value the user
       *     typed.</li>
       *  </ul>
       *  The URL's response should be an array.  For a non-suggestion request
       *  (suggest != '1'), it should have the following elements:
       *  <ul>
       *    <li>position 0 - the total search result count (including the ones not
       *     returned, if autocomp==1).</li>
       *    <li>position 1 - the list of codes for the list items (if the items are
       *     coded)</li>
       *    <li>position 2 - A hash of extra data about the list items (e.g.
       *     an extra set of codes), or null if there is none.
       *     The keys in the hash should be names for the
       *     data elements, and the values should be an array of values, one for
       *     each returned item.  Configuration for what gets returned here is out
       *     of scope of this class; this search autocompleter just sends the
       *     parameters above.  The extra data for the selected item (when the
       *     user makes a selection) can get be retrieved with
       *     getItemExtraData(itemText).</li>
       *    <li>position 3 - the list item data; each item is an array of display
       *     string fields which will be joined together.  (At a mimimum, each item
       *     should be an array of one string.)  These display strings can contain
       *     span tags for styling sub-strings (e.g. matches to the user's input)
       *     but other HTML tags will be escaped.</li>
       *    <li>position 4 - if present, this is an array of code system names
       *     identifying the code system for each of the codes in the code array in
       *     position 1.  This is useful for lists that contain entries from
       *     different code systems.</li>
       *  </ul>
       *  For a "suggest" request, the response should have the following elements:
       *  <ul>
       *    <li>position 0 - the list of codes for the suggested items (if the
       *     items have codes)</li>
       *    <li>position 1 - the list of display strings (an array of strings, not
       *     of arrays) for the suggested items.</li>
       *    <li>position 2 - A hash of extra data about the list items (the same
       *     as position 2 for the non-suggestion request above.)
       *    <li>position 3 - if present, this is an array of code system names
       *     identifying the code system for each of the codes in the code array in
       *     position 0.  This is useful for lists that contain entries from
       *     different code systems.</li>
       *  </ul>
       * @param options A hash of optional parameters.  The allowed keys and their
       *  values are:
       *  <ul>
       *    <li>matchListValue - Whether the field value is required to be one from
       *     the list (default: false).</li>
       *    <li>sort - Whether or not values should be sorted after being
       *     retrieved from the server.  (Default: true).  Note that if you do not
       *     want sorting, you might also want set the suggestionMode parameter to
       *     Def.Autocompleter.NO_COMPLETION_SUGGESTIONS so that a suggestion is
       *     not moved to the top of the list.</li>
       *    <li>suggestionMode - an integer specifying what type of suggestion
       *     should be offered based on what the user has typed.  For values, see
       *     defAutocompleterBaseInit in autoCompBase.js.
       *    <li>useResultCache - (default: true) Whether or not the results
       *     should be cached.  The same cache is used for all fields that share
       *     the same url parameter value.</li>
       *    <li>maxSelect - (default 1) The maximum number of items that can be
       *     selected.  Use '*' for unlimited.</li>
       *    <li>minChars - (default 1) The minimum number of characters that must
       *     be in the field before autocompletion will start.</li>
       *    <li>scrolledContainer - the element that should be scrolled to bring
       *     the list into view if it would otherwise extend below the edge of the
       *     window. The default is document.documentElement (i.e. the whole
       *     window).  This may be null if no scrolling is desired (e.g. if the
       *     list field is in a fixed position on the window), but in that
       *     case the list element might be unusually short.
       *     Note:  At present the only tested cases of this parameter are the
       *     default value and null.</li>
       *    <li>nonMatchSuggestions - (default: false, as of version 10)
       *     Whether a list of suggestions should be generated if the user
       *     enters a non-matching value.  To receive the list of suggestions,
       *     the program should register a callback function via
       *     Def.Autocompleter.Event.observeSuggestions, and if the user selects
       *     a suggestion, the function acceptSuggestion should be called on the
       *     autocompleter instance with the index of the selected suggestion.
       *     See section on Notifications in the documentation. This only
       *     applies when matchListValue is false.
       *    <li>headerBar - If the page has a fixed-position element at the top of
       *     the page (e.g. a top navigation bar), the autocompleter needs to know
       *     that so that when scrolling to show the list it doesn't scroll the current
       *     field under the header bar.  This is the element ID for such a header
       *     bar.</li>
       *    <li>tableFormat - If true, then if the list's items contain
       *     multiple fields, the list will be formatted in a table instead of just
       *     concatenating the fields together for each list item.</li>
       *    <li>valueCols - Used when tableFormat is true to indicate
       *     which columns in the table should be combined to form the field value
       *     when the row is selected.  This should be an array of column indices
       *     (starting with 0).  If absent, all columns will be combined for the
       *     value.  Note that the specification here must result in unique field
       *     values for each table row.</li>
       *    <li>colHeaders - Used when tableFormat is true, this is an array of
       *     column headers for the columns in the table.  If this is not supplied, no header
       *     row will be created.</li>
       *    <ul>Somewhat obsolete, but not yet deprecated, parameters:
       *      <li>buttonID - the ID of the button (if there is one) which activates
       *       a search.  If you use this option, do not set matchListValue.</li>
       *      <li>autocomp - a boolean that controls whether the field should
       *       also autocomplete as the user types.  When this is false, the user
       *       won't see an autocompletion list until they hit return.  (Default:  true)</li>
       *      <li>dataRequester - A RecordDataRequester for getting additional data
       *       after the user makes a selection from the completion list.  This may be
       *       null, in which case no request for additional data is made.</li>
       *    </ul>
       *  </ul>
       */
      initialize: function initialize(fieldID, url, options) {
        options = jQuery.extend({
          partialChars: 2,
          onHide: jQuery.proxy(function (element, update) {
            $('searchCount').style.display = 'none';
            $('moreResults').style.display = 'none';
            Def.Autocompleter.Base.prototype.hideList.apply(this);
          }, this),
          onShow: jQuery.proxy(function (element, update) {
            // Make the search count display before adjusting the list position.
            $('searchCount').style.display = 'block';
            $('moreResults').style.display = 'block';
            Def.Autocompleter.Base.prototype.showList.apply(this);
          }, this),
          onComplete: jQuery.proxy(this.onComplete, this)
        }, options || {});
        if (!Def.Autocompleter.Base.classInit_) Def.Autocompleter.Base.classInit();
        this.url = url;
        this.defAutocompleterBaseInit(fieldID, options);
        this.autocomp = options['autocomp'];
        if (this.autocomp === undefined) this.autocomp = true; // default
        else if (!this.autocomp) {
            // Disable autocompletion by setting it to run once every year.
            // Note:  This used to be 1000 years, but the Linux version of Firefox
            // was treating such a large timeout value as zero.
            this.options.frequency = 365 * 86400; // seconds
          }
        if (options.sort === undefined) options.sort = true; // default

        if (options['useResultCache'] !== null && options['useResultCache'] === false) this.useResultCache_ = false; // default is true-- see declaration
        // Do not use the synchronous request option.  On Windows and Firefox,
        // if you use synchronous, and hit control+enter to run a search, the
        // Firefox Downloads window opens.  I don't know why.  See my post
        // (Paul Lynch) to the Prototype & Scriptaculous Google group, dated
        // 2008/2/5 for a test case.
        // Also, the Prototype library recommends not to use synchronous requests.
        //   this.options.asynchronous = false;
        // Set up event observers.

        jQuery(this.element).focus(jQuery.proxy(this.onFocus, this)); // The base class sets up one for a "blur" event.

        var buttonID = options['buttonID'];
        this.buttonID = buttonID; // buttonID might be "null", see line 3 of _search_field_autocomp.rhtml.

        if (buttonID && buttonID !== 'null') {
          // We need to use mousedown for the button.  We cannot wait for a
          // mouseup or click event because we have no idea how long that might
          // take, and we need to handle the blur event (which could be the result
          // or a click or of something else.)  Handling the mousedown event
          // also has the nice side-effect of preventing the blur from ever
          // occuring -- though I don't understand why.  (If I comment out the
          // Ajax.Request, the blur event occurs, but if I uncomment that and
          // comment out the onComplete code, it does not.)
          var button = jQuery(document.getElementById(buttonID));
          button.mousedown(jQuery.proxy(this.buttonClick, this));
          button.keypress(jQuery.proxy(this.buttonKeyPress, this));
        }

        jQuery(this.element).addClass('search_field');

        if (options.colHeaders) {
          this.colHeaderHTML = '<table><thead><th>' + options.colHeaders.join('</th><th>') + '</th></thead><tbody>';
        }
      },

      /**
       *  Initializes the itemToDataIndex_ map.
       */
      initItemToDataIndex: function initItemToDataIndex() {
        // For the search list, itemToDataIndex_ gets populated when we get an
        // autocompletion list.  However, it needs to have a non-null value for
        // cases where lookups are done for non-matching field values which did
        // not bring back any list (or single-character values when did not
        // trigger an autocompletion event).
        this.itemToDataIndex_ = {};
      },

      /**
       *  A copy constructor, for a new field (e.g. another field in a new row
       *  of a table).
       * @param fieldID the ID of the field being assigned to the new autocompleter
       *  this method creates.
       * @return a new autocompleter for field field ID
       */
      dupForField: function dupForField(fieldID) {
        var dataReq = this.dupDataReqForField(fieldID);
        var opts = Object.clone(this.constructorOpts_);
        opts['dataRequester'] = dataReq;
        return new Def.Autocompleter.Search(fieldID, this.url, opts);
      },

      /**
       *  Returns the field value (or partial value, if the tokens option was
       *  specified) with any field separator strings replaced by
       *  spaces, so it is ready to use as a search string.
       * @param fieldVal (optional) the field value if already obtained from this.element
       */
      getSearchStr: function getSearchStr(fieldVal) {
        // Use a cached version of the regular expression so we don't need to
        // create one for every autocompletion request.
        var ac = Def.Autocompleter;
        if (!ac.LIST_ITEM_FIELD_SEP_REGEX) ac.LIST_ITEM_FIELD_SEP_REGEX = new RegExp(ac.LIST_ITEM_FIELD_SEP, 'g');
        if (!fieldVal) fieldVal = this.getToken();
        return fieldVal.replace(ac.LIST_ITEM_FIELD_SEP_REGEX, ' ').trimLeft();
      },

      /**
       *  Runs the search (asynchronously).  This gets called when the search
       *  button is clicked.  When the search completes, onComplete
       *  will be called to update the choice list.
       */
      runSearch: function runSearch() {
        // Cancel the previous search/AJAX request, if there is one pending.
        // This might free up a thread for the browser, but it does not help
        // the server any.
        if (this.lastAjaxRequest_ && this.lastAjaxRequest_.transport) this.lastAjaxRequest_.abort();

        if (this.url) {
          // we also this to be initially undefined
          this.searchInProgress = true;
          this.searchStartTime = new Date().getTime(); // See if the search has been run before.

          var searchStr = this.getSearchStr();
          var results = null;

          if (this.useResultCache_) {
            results = this.getCachedResults(searchStr, Def.Autocompleter.Search.RESULT_CACHE_SEARCH_RESULTS);
            if (results) this.onComplete(results, null, true);
          }

          if (!results) {
            // i.e. if it wasn't cached
            // Run the search
            var paramData = {
              authenticity_token: window._token || '',
              maxList: null,
              // no value
              terms: searchStr
            };
            var options = {
              data: paramData,
              complete: this.options.onComplete
            };
            this.changed = false;
            this.hasFocus = true;
            this.lastAjaxRequest_ = jQuery.ajax(this.url, options);
            this.lastAjaxRequest_.requestParamData_ = paramData;
          }
        }
      },

      /**
       *  Initializes this.resultCache_.
       */
      initResultCache: function initResultCache() {
        this.resultCache_ = Def.Autocompleter.Search.urlToCache_[this.url];

        if (!this.resultCache_) {
          this.resultCache_ = [{}, {}];
          Def.Autocompleter.Search.urlToCache_[this.url] = this.resultCache_;
        }
      },

      /**
       *  Returns the cached search results (in the form of an AJAX response object
       *  for a request initiated by runSearch or getUpdatedChoices)
       *  for the given search string, or null if there are no cached results.
       * @param str the search string
       * @param autocomp RESULT_CACHE_AUTOCOMP_RESULTS if the results were for an
       *  autocompletion request (as opposed to a search request, which returns a
       *  much longer list of results), and RESULT_CACHE_SEARCH_RESULTS if they were
       *  for a search request.
       */
      getCachedResults: function getCachedResults(str, autocomp) {
        if (!this.resultCache_) this.initResultCache();
        return this.resultCache_[autocomp][str];
      },

      /**
       *  Stores search results for the given search string, for later re-use
       *  via getCachedResults.
       * @param str the search string
       * @param autocomp RESULT_CACHE_AUTOCOMP_RESULTS if the results were for an
       *  autocompletion request (as opposed to a search request, which returns a
       *  much longer list of results), and RESULT_CACHE_SEARCH_RESULTS if they were
       *  for a search request.
       * @param results the AJAX response object for a search initiated by
       *  runSearch or getUpdatedChoices.
       */
      storeCachedResults: function storeCachedResults(str, autocomp, results) {
        if (!this.resultCache_) this.initResultCache();
        this.resultCache_[autocomp][str] = results;
      },

      /**
       *  Forgets previously cached results.
       */
      clearCachedResults: function clearCachedResults() {
        this.resultCache_ = [{}, {}];
        Def.Autocompleter.Search.urlToCache_[this.url] = this.resultCache_;
      },

      /**
       *  Changes the autocompleter's URL to the given URL, and updates the cache.
       * @param url The new url for getting the completion list.  See the "url"
       *  parameter in the constructor.
       */
      setURL: function setURL(url) {
        this.url = url;
        this.initResultCache();
      },

      /**
       *  Returns true if the given key event (from the input field) is a request
       *  for showing the expanded list.
       * @param event the key event
       */
      fieldEventIsBigList: function fieldEventIsBigList(event) {
        return event.keyCode === jQuery.ui.keyCode.ENTER && (event.ctrlKey || !this.autocomp && this.domCache.get('elemVal') !== this.processedFieldVal_ && this.domCache.get('elemVal').trim() !== '');
      },

      /**
       *  This gets called when the user presses a key on the search button.
       * @param event the key event
       */
      buttonKeyPress: function buttonKeyPress(event) {
        if (event.keyCode === jQuery.ui.keyCode.ENTER) {
          this.runSearch();
        }
      },

      /**
       *  Processes a returned set of choices in preparation for building
       *  the HTML for the update (choices) area.  This filters out selected
       *  items, sorts the items, and picks the default item.
       * @param fieldValToItemFields a hash from field value version of the list
       *  items to the list item arrays received from the AJAX call
       * @return an array of two elements, an array of field value strings from
       *  fieldValToItemFields ordered in the way the items should appear in the
       *  list, and a boolean indicating whether the
       *  topmost item is placed as a suggested item.
       */
      processChoices: function processChoices(fieldValToItemFields) {
        // Filter out already selected items for multi-select lists
        var filteredItems = [];
        var fieldVals = Object.keys(fieldValToItemFields);

        for (var i = 0, len = fieldVals.length; i < len; ++i) {
          var item = fieldVals[i];
          if (!this.multiSelect_ || !this.isSelected(item)) filteredItems.push(item);
        }

        if (filteredItems.length > 0 && !this.numHeadings_) {
          // Sort items, but first see if there is a best match we want to move to
          // the top.
          var useStats = this.suggestionMode_ === Def.Autocompleter.USE_STATISTICS;
          var topItem = null;
          var topItemIndex = -1;

          if (useStats) {
            // For this kind of suggestion mode, we want to rely on the statistical
            // ordering of results returned by the server, which provides the
            // statistically best option at the top, so we work to keep this
            // item at the top of the list when sorting.
            topItemIndex = 0;
          } else if (this.suggestionMode_ === Def.Autocompleter.SUGGEST_SHORTEST) {
            topItemIndex = this.pickBestMatch(filteredItems);
          }

          if (this.options.sort) {
            if (topItemIndex > -1) {
              topItem = filteredItems[topItemIndex]; // Set the top item to '', so it will sort to the top of the list.
              // That way, after the sort, we don't have to push it into the top
              // of the list.  (It should be faster this way.)

              filteredItems[topItemIndex] = '';
            }

            filteredItems = filteredItems.sort(Def.Autocompleter.Base.noCaseSort);
            if (topItemIndex > -1) filteredItems[0] = topItem;
          } else if (topItemIndex > 0) {
            // no sorting, but still want suggestion at top
            var temp = filteredItems[0];
            filteredItems[0] = filteredItems[topItemIndex];
            filteredItems[topItemIndex] = temp;
          }
        }

        return [filteredItems, topItemIndex > -1];
      },

      /**
       *  HTML-escapes a string of text for display in a search list.
       *  Allows <span> tags to pass through.
       * @param text the string to escape
       * @return the escaped string
       */
      escapeHTML: function escapeHTML(text) {
        var f = Def.Autocompleter.Base.escapeAttribute(text); // Allow (unescape) span tags to mark matches.

        return f.replace(/&lt;(\/)?span&gt;/g, '<$1span>');
      },

      /**
       *  Builds and returns the HTML for the selection area.
       * @param listFieldVals the array of field values for the items to be shown in the list.
       * @param bestMatchFound whether a best match was found as a recommenation
       * @param fieldValToItemFields a hash from field value version of the list
       *  items to the list item arrays received from the AJAX call
       */
      buildUpdateHTML: function buildUpdateHTML(listFieldVals, bestMatchFound, fieldValToItemFields) {
        var rtn, htmlStart, htmlEnd, rowStartOpen, rowStartClose, fieldSep, rowEnd;
        var tableFormat = this.options.tableFormat;

        if (tableFormat) {
          htmlStart = this.colHeaderHTML || '<table><tbody>';
          htmlEnd = '</tbody></table>';
          rowStartOpen = '<tr';
          rowStartClose = '><td>';
          fieldSep = '</td><td>';
          rowEnd = '</td></tr>';
        } else {
          htmlStart = '<ul>';
          htmlEnd = '</ul>';
          rowStartOpen = '<li';
          rowStartClose = '>';
          fieldSep = Def.Autocompleter.LIST_ITEM_FIELD_SEP;
          rowEnd = '</li>';
        }

        rtn = htmlStart;

        for (var i = 0, len = listFieldVals.length; i < len; ++i) {
          var itemText = listFieldVals[i];
          var itemFields = fieldValToItemFields[itemText];
          var escapedFields = [];

          for (var c = 0, flen = itemFields.length; c < flen; ++c) {
            escapedFields[c] = this.escapeHTML(itemFields[c]);
          }

          rtn += rowStartOpen;
          if (i === 0 && bestMatchFound) rtn += ' class="suggestion"';
          if (tableFormat) rtn += ' data-fieldval="' + this.escapeHTML(itemText) + '"';
          rtn += rowStartClose;
          rtn += escapedFields.join(fieldSep);
          rtn += rowEnd;
        }

        rtn += htmlEnd;
        return rtn;
      },

      /**
       *  Updates the contents of the search count div below the list, if
       *  there were any results.
       * @param totalCount the total hits found on the server (possibly more than
       *  returned.)
       * @param shownCount the number of hits to be shown in the list
       * @param responseLength the number of characters in the returned data
       */
      setSearchCountDiv: function setSearchCountDiv(totalCount, shownCount, responseLength) {
        var searchCountElem = $('searchCount');
        var searchCountStr = '';

        if (totalCount > 0) {
          searchCountStr = shownCount + ' of ' + totalCount + ' total'; // Dan Clark of Freedom Scientific reported that the search count made
          // the output for JAWS too verbose, so I am commenting out this call.
          // this.readSearchCount();
          // Now display the counts and the elapsed time

          var timestamp = new Date(); // In computing the elapsed time, add the delay from the last keystroke,
          // so the user gets the total time from that point.

          var elapsedTime = timestamp.getTime() - this.searchStartTime + this.options.frequency * 1000 + ''; // bytes count of the total response data

          var bytes = responseLength + ''; // Add some padding so the string stays roughly the same size

          if (bytes.length < 3) bytes += '&nbsp;';
          var resultInfo = '; ' + bytes + ' bytes in ' + elapsedTime + ' ms';
          if (elapsedTime.length < 3) resultInfo += '&nbsp;';
          searchCountStr += resultInfo;
          searchCountElem.innerHTML = searchCountStr;
        }
      },

      /**
       *  Returns a hash from the values that get placed into the form field when
       *  an item is selected to the array of item field values shown in the
       *  autocompletion list.  While doing this it also initializes
       *  itemToDataIndex_.
       * @param itemFieldArrays the array of item field arrays (one array per
       *  item
       */
      createFieldVals: function createFieldVals(itemFieldArrays) {
        var rtn = {};
        var valCols = this.options.valueCols;
        var joinSep = Def.Autocompleter.LIST_ITEM_FIELD_SEP;
        this.itemToDataIndex_ = {};
        if (valCols) var numValCols = valCols.length;

        for (var i = 0, len = itemFieldArrays.length; i < len; ++i) {
          var itemFields = itemFieldArrays[i];
          var selectedFields;

          if (valCols) {
            selectedFields = [];

            for (var c = 0; c < numValCols; ++c) {
              selectedFields[c] = itemFields[valCols[c]];
            }
          } else selectedFields = itemFields;

          var fieldVal = selectedFields.join(joinSep); // Remove any <span> tags added for highlighting

          fieldVal = fieldVal.replace(/<\/?span>/g, '');
          this.itemToDataIndex_[fieldVal] = i;
          rtn[fieldVal] = itemFields;
        }

        return rtn;
      },

      /**
       *  This gets called when an Ajax request returns.  (See Prototype's
       *  Ajax.Request and callback sections.)
       * @param xhrObj A jQuery-extended XMLHttpRequest object
       * @param textStatus A jQuery text version of the status of the request
       *  (e.g. "success")
       * @param fromCache whether "response" is from the cache (optional).
       */
      onComplete: function onComplete(xhrObj, textStatus, fromCache) {
        var untrimmedFieldVal = this.getToken();
        this.trimmedElemVal = untrimmedFieldVal.trim(); // used in autoCompBase

        if (this.lastAjaxRequest_ === xhrObj) {
          this.lastAjaxRequest_ = null;
        }

        if (xhrObj.status === 200) {
          // 200 is the "OK" status
          var reqParams = xhrObj.requestParamData_;
          var searchStr = reqParams['terms'];
          var autocomp = reqParams['maxList'] === undefined;
          var searchAC = Def.Autocompleter.Search;

          if (!fromCache && this.useResultCache_) {
            var resultCacheIndex = autocomp ? searchAC.RESULT_CACHE_AUTOCOMP_RESULTS : searchAC.RESULT_CACHE_SEARCH_RESULTS;
            this.storeCachedResults(searchStr, resultCacheIndex, xhrObj);
          } // The search string is a truncated version of the field value for
          // autocompletion requests.  Compute what the search string would be
          // if it were sent for the current field value.


          var searchStrForFieldVal = this.getSearchStr(untrimmedFieldVal);

          if (autocomp) {
            searchStrForFieldVal = searchStrForFieldVal.substr(0, searchAC.MAX_VALUE_SIZE_FOR_AUTOCOMP);
          } // If the user is not in the field, don't try to display the returned
          // results.   (Note:  Refocusing does not work well, because it
          // confuses the field validation code which happens on change.)
          // Also, if this response is not for the text that is currently in the
          // field, don't do anything with it.


          if ((this.hasFocus || this.refocusInProgress_) && searchStrForFieldVal === searchStr) {
            // Retrieve the response data, which is in JSON format.
            var responseData = xhrObj.responseJSON || JSON.parse(xhrObj.responseText);
            var totalCount = responseData[0];
            this.itemCodes_ = responseData[1];
            this.listExtraData_ = responseData[2];
            this.itemCodeSystems_ = responseData[4];
            this.rawList_ = responseData[3]; // rawList_ is used in list selection events

            var fieldValToItemFields = this.createFieldVals(this.rawList_);
            var data = this.processChoices(fieldValToItemFields);
            var listFieldVals = data[0],
                bestMatchFound = data[1];
            var listHTML = this.buildUpdateHTML(listFieldVals, bestMatchFound, fieldValToItemFields);
            this.updateChoices(listHTML, false);
            var shownCount = listFieldVals.length;
            this.setSearchCountDiv(totalCount, shownCount, xhrObj.responseText.length); // Show "see more" link depending on whether this was an autocompletion
            // event and whether there are more items to see.

            if (shownCount < totalCount && autocomp) $('moreResults').style.display = 'block';else {
              $('moreResults').style.display = 'none';
            }
            this.searchInProgress = false; // If the number of list items is too large, use the split area, otherwise
            // put the list below the field.

            this.listBelowField_ = this.entryCount <= Def.Autocompleter.Base.MAX_ITEMS_BELOW_FIELD; // Now position the answer list.  We would like to do that before, so we
            // could include the position time in the above time measurement, but the
            // time and byte count string can affect the position.

            this.posAnsList();
          }
        }
      },

      /**
       *  Returns a hash of extra data (returned with AJAX autocompletion request)
       *  for a selected list item.
       *  Currently, this assumes that itemText was present in the last list shown
       *  for this field; if subsequent autocompletion requests take place in
       *  which itemText is not present, the return value will be empty.
       * @param itemText the display string of the selected item.
       */
      getItemExtraData: function getItemExtraData(itemText) {
        var itemData = {};

        if (this.listExtraData_) {
          var dataIndex = this.itemToDataIndex_[itemText];

          if (dataIndex != null) {
            // if it is on the list
            var keys = Object.keys(this.listExtraData_);

            for (var k = 0, numKeys = keys.length; k < numKeys; ++k) {
              var key = keys[k];
              itemData[key] = this.listExtraData_[key][dataIndex];
            }
          }
        }

        return itemData;
      },

      /**
       *  Returns a hash of all data about the item whose value is currently in the
       *  field, unless itemText is provided, in which case it will return data
       *  for that item.  This should only be used just after a selection has been made.
       * @param itemText (optional) the display text of an list item.  If the text
       *  is not in the list, then the returned hash will only contain the "text"
       *  property.
       *
       * @return a hash with "code" and "text" properties for the selected item,
       *  and if there is any extra data for the item, that will be under a
       *  "data" sub-hash.  If the items came with code system data, there will
       *  also be a "code_system" property with the code system corresponding to
       *  "code".  Properties for which there are no values will not be present,
       *  except for the "text" property.
       */
      getItemData: function getItemData(itemText) {
        if (!itemText) itemText = this.domCache.get('elemVal');
        var rtn = {
          text: itemText
        };

        if (itemText != '' && this.itemToDataIndex_) {
          var code = this.getItemCode(itemText);

          if (code !== undefined && code !== null) {
            rtn.code = code;

            if (this.itemCodeSystems_) {
              var itemIndex = this.itemToDataIndex_[itemText];
              var codeSys = this.itemCodeSystems_[itemIndex];
              if (codeSys) rtn.code_system = codeSys;
            }
          }

          var data = this.getItemExtraData(itemText);
          if (Object.keys(data).length > 0) rtn.data = data;
        }

        return rtn;
      },

      /**
       *  This gets called to show the list.
       */
      show: function show() {
        // The base class' show only calls onShow if the "update" element
        // has "display: none" set.  Since we are hiding the list container
        // instead, we need to explicitly call onShow here.
        // Only do this if the list is not already being shown.  For some reason,
        // in addition to checking whether the list container's visibility style is
        // "hidden", we also need to check for no value, because (at least in
        // Firefox) it doesn't have a value initially.
        if (this.listContainer.style.visibility === 'hidden' || this.listContainer.style.visibility === '') {
          this.options.onShow(this.element, this.update);
        }
      },

      /**
       *  This to hide the list. (e.g. after a selection).
       */
      hide: function hide() {
        if (!this.searchInProgress) {
          Def.Autocompleter.Search.superclass.hide.apply(this);
        }
      },

      /**
       *  Handles the click on the search button.
       * @param event the event object
       */
      buttonClick: function buttonClick(event) {
        // If there is a timeout from a key event, clear it.  (The user might have
        // hit one character, and then hit the search button, and if we don't clear
        // it, the timeout will hide the list because the input length is less
        // than the minimum number of characters.
        if (this.observer) clearTimeout(this.observer); // This runs on mouse down, and we stop the event so the focus never
        // leaves the field.

        this.searchInProgress = true;
        this.runSearch();
        Def.Autocompleter.stopEvent(event);
      },

      /**
       *  This gets called when the "See more items" link is clicked.
       * @param event the click event on the link
       */
      handleSeeMoreItems: function handleSeeMoreItems(event) {
        // For multiselect lists, after selecting an item the field is empty, so
        // if we have a preFieldFillVal_, we reset the field value back to that
        // before running the search.  At present, the only case where we don't
        // have preFieldFillVal_ is when the user has clicked on a list item,
        // after which (kind of by accident) the "see more items" link is hidden,
        // so we don't need to worry about that case for now.
        if (this.multiSelect_ && this.domCache.get('elemVal') === '' && this.preFieldFillVal_) {
          this.setFieldVal(this.preFieldFillVal_, false);
        }

        this.buttonClick(event);
      },

      /**
       *  A method that gets called when the field gains the focus.
       */
      onFocus: function onFocus() {
        // Ignore blur events on the completionOptionsScroller.
        if (Def.Autocompleter.completionOptionsScrollerClicked_ === true) {
          Def.Autocompleter.completionOptionsScrollerClicked_ = false;
        } else {
          if (!this.refocusInProgress_) {
            Def.Autocompleter.screenReaderLog('Type to show matching list values.'); // Hide the list, which might be showing from another autocompleter.
            // (On blur events, autocompleters set a timeout for hiding the list
            // so click events will work, but if the autocompleter isn't the current
            // one when the timeout runs, it doesn't know whether it should really
            // hide the list, so it doesn't.)

            this.hide(); // Reset rawList_, which might have data from a prior use of the field,
            // and which is used by attemptSelection for list selection observers.

            this.rawList_ = [];
          } // The base onFocus resets refocusInProgress_, so we call it after the above
          // check.


          Def.Autocompleter.Base.prototype.onFocus.apply(this);
          this.hasFocus = true;
        }
      },

      /**
       *  This gets called when the field loses focus.
       * @param event the DOM event object
       */
      onBlur: function onBlur(event) {
        // Do nothing if we're refocusing the field.
        if (!this.refocusInProgress_ && !Def.Autocompleter.completionOptionsScrollerClicked_) {
          Def.Autocompleter.Base.prototype.onBlur.apply(this, [event]);

          if (!this.searchInProgress) {
            this.active = false;
          }
        }
      },

      /**
       *  Overrides the method in the Scriptaculous superclass to change the
       *  parameters that are posted.
       */
      getUpdatedChoices: function getUpdatedChoices() {
        if (this.lastAjaxRequest_ && this.lastAjaxRequest_.transport) this.lastAjaxRequest_.abort();

        if (this.url) {
          // we also this to be initially undefined
          this.searchStartTime = new Date().getTime();
          var results = null;
          var autocompSearch = Def.Autocompleter.Search;
          var fieldVal = this.getSearchStr(); // Truncate fieldVal to some maximum length so we limit the number of
          // autocompletion requests that get generated if a user sets a book on the
          // keyboard.

          if (fieldVal.length > autocompSearch.MAX_VALUE_SIZE_FOR_AUTOCOMP) fieldVal = fieldVal.substr(0, autocompSearch.MAX_VALUE_SIZE_FOR_AUTOCOMP);

          if (this.useResultCache_) {
            // See if the search has been run before.
            results = this.getCachedResults(fieldVal, autocompSearch.RESULT_CACHE_AUTOCOMP_RESULTS);
            if (results) this.onComplete(results, null, true);
          }

          if (!results) {
            // Run the search
            var paramData = {
              authenticity_token: window._token || '',
              terms: fieldVal
            };
            var options = {
              data: paramData,
              dataType: 'json',
              complete: this.options.onComplete
            };
            this.lastAjaxRequest_ = jQuery.ajax(this.url, options);
            this.lastAjaxRequest_.requestParamData_ = paramData;
          }
        }
      },

      /**
       *  Starts an AJAX call to find suggestions for a field value that does
       *  not match the list.
       */
      findSuggestions: function findSuggestions() {
        if (this.url) {
          // we also this to be initially undefined
          var fieldVal = this.getSearchStr();
          var paramData = {
            authenticity_token: window._token || '',
            field_val: fieldVal,
            suggest: 1
          };
          var options = {
            data: paramData,
            complete: jQuery.proxy(this.onFindSuggestionComplete, this)
          };
          jQuery.ajax(this.url, options);
        }
      },

      /**
       *  Handles the return of the AJAX call started in findSuggestions.
       *  (See Prototype's Ajax.Request and callback sections for a description
       *  of the parameter and how this works.)
       * @param response the jQuery-extended XMLHttpRequest object
       */
      onFindSuggestionComplete: function onFindSuggestionComplete(response) {
        if (response.status === 200) {
          // 200 is the "OK" status
          // Retrieve the response data, which is in JSON format.
          var responseData = response.responseJSON || JSON.parse(response.responseText);
          var codes = responseData[0];
          var eventData = [];
          var foundMatch = false;

          if (codes.length > 0) {
            // See if one of the suggestions matches what was typed (in which case we just accept
            // that item as the selection).
            var listItems = responseData[1];
            this.suggestionList_ = responseData;
            var lowerCaseFieldVal = this.domCache.get('elemVal').trim().toLowerCase();
            var fieldSep = Def.Autocompleter.LIST_ITEM_FIELD_SEP;

            for (var i = 0, max = listItems.length; !foundMatch && i < max; ++i) {
              // The suggestion comes as an array (for the different fields that
              // might be displayed).  Fix that, and store it in hopes of
              // helping acceptSuggstion.
              listItems[i] = listItems[i].join(fieldSep);

              if (listItems[i].toLowerCase() === lowerCaseFieldVal) {
                foundMatch = true;
                if (this.observer) clearTimeout(this.observer); // stop the autocompletion

                this.acceptSuggestion(i);
              }
            }

            if (!foundMatch) eventData = listItems;
          } // Do not notify if we found a match and are not providing
          // suggestions.


          if (!foundMatch) {
            Def.Autocompleter.Event.notifyObservers(this.element, 'SUGGESTIONS', {
              suggestion_list: eventData
            });
          }
        }
      },

      /**
       *  Handles the user's request to accept a suggestion as a replacement for
       *  the field value.
       * @param index the index (in the suggestionList_ codes and values)
       *  of the suggestion that was accepted.
       */
      acceptSuggestion: function acceptSuggestion(index) {
        // We stored the last suggestion list data in suggestionList_.  Look
        // for "code".
        var codes = this.suggestionList_[0];
        var listItems = this.suggestionList_[1];
        var usedSuggestion = listItems[index];
        var valTyped = this.domCache.get('elemVal');
        var newVal = listItems[index];
        this.setFieldVal(this.processedFieldVal_ = usedSuggestion, false); // Mark the field as having a valid value, and reset processedFieldVal_.

        this.setMatchStatusIndicator(true);
        this.fieldValIsListVal_ = true;
        this.propagateFieldChanges();
        Def.Autocompleter.Event.notifyObservers(this.element, 'SUGGESTION_USED', {
          suggestion_used: usedSuggestion
        }); // Also send a list selection notification (so that that event can be
        // used as a change event for the field).  Also, the suggestion was from
        // the list.

        this.itemCodes_ = codes; // used by listSelectionNotification

        this.itemToDataIndex_ = {};
        this.itemToDataIndex_[listItems[index]] = index;
        this.listExtraData_ = this.suggestionList_[2];
        this.itemCodeSystems_ = this.suggestionList_[3];
        this.listSelectionNotification(valTyped, true); // not typed, on list
        // Put the focus back into the field we just updated.

        this.element.focus();
      }
    };
    jQuery.extend(Def.Autocompleter.Search.prototype, tmp);
    tmp = null;
  }

  if (true) module.exports = defineSearch;else {}
})();

/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

(function () {
  // Wrap the definitions in a function to protect our version of global variables
  function defineEvent($, jQuery, Def) {
    "use strict";
    /*
     *  This contains code for the custom "events" the autocompleter generates.
     *  Other code can use one of the "observe" methods to register to be notified
     *  when a certain type of event occurs.
     */

    Def.Autocompleter.Event = {
      /**
       *  Registers a callback for when the list is expanded.
       * @param fieldKey the lookup key from Def.Observable.lookupKey(field) for which
       *  the given callback will be called.  Fields whose lookupKey value matches
       *  fieldKey will trigger the callback for this event.  The
       *  idea is that there might be multiple fields (perhaps of an unknown number)
       *  that are related for which the callback should receive notifications.
       *  This can be null, in which case the function will be called for every
       *  event of this kind, regardless of the field for which it occurred.
       * @param callback the function to be called when the event occurs.
       *  The function will be called with the argument
       *  {list_expansion_method: 'CtrlRet'} if it was expanded with the keyboard,
       *  and {list_expansion_method: 'clicked'} if it was expanded with
       *  the mouse.
       */
      observeListExpansions: function observeListExpansions(fieldKey, callback) {
        this.storeCallback(fieldKey, 'LIST_EXP', callback);
      },

      /**
       *  Registers a callback for when an item is selected from the list, or if
       *  the user enters a non-list value (for lists that support that).
       * @param fieldKey the lookup key from Def.Observable.lookupKey(field) for which
       *  the given callback will be called.  Fields whose lookupKey value matches
       *  fieldKey will trigger the callback for this event.  The
       *  idea is that there might be multiple fields (perhaps of an unknown number)
       *  that are related for which the callback should receive notifications.
       *  This can be null, in which case the function will be called for every
       *  event of this kind, regardless of the field for which it occurred.
       * @param callback the function to be called when the event occurs.
       *  The function will be called with a hash argument with the following keys:
       *  1) val_typed_in (what the user actually typed in);
       *  2) final_val (the final value for the field);
       *  3) used_list (boolean indicating whether or not the final was
       *     selected from a list, whether by clicking or by arrows);
       *  4) on_list - boolean indicating whether or not the final value was on
       *     the list
       *  5) input_method ('clicked', 'arrows', or 'typed')
       *  6) item_code - the code for the selected item, or null if there isn't
       *     one.
       *  7) removed - For multi-select lists, this indicates whether the
       *     selection was actual an unselection, removing the named item from the
       *     list of selected items.  When true, final_val is the removed value
       *     (although for multi-select fields the field is blank afterward).
       *     (Optional; default false)
       *  8) list - the items that were in the list (which is the full list for a
       *     prefetched list, or the portion shown to the user for a search list).
       *  9) field_id - the ID of the list field
       */
      observeListSelections: function observeListSelections(fieldKey, callback) {
        this.storeCallback(fieldKey, 'LIST_SEL', callback);
      },

      /**
       *  Registers a callback for when a list field receives focus.
       * @param fieldKey the lookup key from Def.Observable.lookupKey(field) for which
       *  the given callback will be called.  Fields whose lookupKey value matches
       *  fieldKey will trigger the callback for this event.  The
       *  idea is that there might be multiple fields (perhaps of an unknown number)
       *  that are related for which the callback should receive notifications.
       * @param callback the function to be called when the event occurs.
       *  The function will be called with an the following argument:
       *  - start_val (the value already in the field)
       */
      observeFocusEvents: function observeFocusEvents(fieldKey, callback) {
        this.storeCallback(fieldKey, 'FOCUS', callback);
      },

      /**
       *  Registers a callback for when users cancel the list (by pressing
       *  the escape key).  This closes the list and restores the field's value.
       * @param fieldKey the lookup key from Def.Observable.lookupKey(field) for which
       *  the given callback will be called.  Fields whose lookupKey value matches
       *  fieldKey will trigger the callback for this event.  The
       *  idea is that there might be multiple fields (perhaps of an unknown number)
       *  that are related for which the callback should receive notifications.
       * @param callback the function to be called when the event occurs.
       *  The function will be called with an the following argument:
       *  - restored_value (the value that was restored to the field)
       */
      observeCancelList: function observeCancelList(fieldKey, callback) {
        this.storeCallback(fieldKey, 'CANCEL', callback);
      },

      /**
       *  Registers a callback for when suggestions should be shown to the
       *  user.  If the user selects a suggestion, the function acceptSuggestion
       *  should be called with the index of the selected suggestion.
       * @param fieldKey the lookup key from Def.Observable.lookupKey(field) for which
       *  the given callback will be called.  Fields whose lookupKey value matches
       *  fieldKey will trigger the callback for this event.  The
       *  idea is that there might be multiple fields (perhaps of an unknown number)
       *  that are related for which the callback should receive notifications.
       * @param callback the function to be called when the event occurs.
       *  The function will be called with an the following argument:
       *  - suggestion_list (an array of the values in the list to be shown to the user.
       *    or an empty array if no suggestions were found)
       */
      observeSuggestions: function observeSuggestions(fieldKey, callback) {
        this.storeCallback(fieldKey, 'SUGGESTIONS', callback);
      },

      /**
       *  Registers a callback for when a user accepts a suggestion.
       * @param fieldKey the lookup key from Def.Observable.lookupKey(field) for which
       *  the given callback will be called.  Fields whose lookupKey value matches
       *  fieldKey will trigger the callback for this event.  The
       *  idea is that there might be multiple fields (perhaps of an unknown number)
       *  that are related for which the callback should receive notifications.
       * @param callback the function to be called when the event occurs.
       */
      observeSuggestionUsed: function observeSuggestionUsed(fieldKey, callback) {
        this.storeCallback(fieldKey, 'SUGGESTION_USED', callback);
      },

      /**
       *  For prefetched lists only, this registers a callback for when the
       *  list is changed via setListAndField but the field value does NOT change.
       *  (If the field value is changed, a change event is sent.)
       * @param fieldKey the lookup key from Def.Observable.lookupKey(field) for which
       *  the given callback will be called.  Fields whose lookupKey value matches
       *  fieldKey will trigger the callback for this event.  The
       *  idea is that there might be multiple fields (perhaps of an unknown number)
       *  that are related for which the callback should receive notifications.
       * @param callback the function to be called when the event occurs.
       */
      observeListAssignments: function observeListAssignments(fieldKey, callback) {
        this.storeCallback(fieldKey, 'LIST_ASSIGNMENT', callback);
      },

      /**
       *  Registers a callback for when a record data requester (any one) clears
       *  fields.
       * @param callback the function to be called.  It will get the following
       *  argument:
       *  - updatedFields: an array of DOM field elements for the fields that
       *    were cleared
       */
      observeRDRClearing: function observeRDRClearing(callback) {
        this.storeCallback(null, 'RDR_CLEARING', callback);
      },

      /**
       *  Registers a callback for when a record data requester (any one) assigns
       *  values to fields.
       * @param callback the function to be called.  It will get a hash containing
       *  the following key/value pairs:
       *  - updatedFields: an array of DOM field elements for the fields that
       *    were cleared
       *  - updatedFieldIDToVal: a hash of field IDs to the updated values
       *  - listField - the field whose list had the record data requester.
       */
      observeRDRAssignment: function observeRDRAssignment(callback) {
        this.storeCallback(null, 'RDR_ASSIGNMENT', callback);
      }
    };
    jQuery.extend(Def.Autocompleter.Event, Def.Observable);
  }

  if (true) module.exports = defineEvent;else {}
})();

/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

// An AngularJS directive (optional; for use if you are using AngularJS)
//
// Example:
// <input id="myfield" autocomplete-lhc="opts" ng-model="selectedVal">
//
// The opts object (which could be a function that returns an object) contains
// the information needed for specifying the behavior of the autocompleter (e.g.
// what should be in the list).  There are two types of autocompleters.  You can
// either have a "prefetched" list where all the items are given to the autocompleter
// at construction time, or a "search" list where the list items are discovered
// as the user types, via AJAX calls.  For both types, opts is a hash, but the
// keys on the hash differ.
//
// For "prefetched lists", opts can contain:
// 1) listItems - (required) This is the list item data.  It should be an array,
//    and each element in the array should have a "text" property (or, if the
//    "display" option is set below, property of display's value) which is the
//    display string the user sees.  The object containing that text property
//    is what will get stored on the model you have associated via ng-model
//    (selectedVal, in the example above).
// 2) maxSelect - (default: 1) the maximum number of items that can be selected
//    from the list.  If this is '*', an unlimited number can be selected.  When
//    more than one item can be selected, selected items are stored in an array
//    on the model (e.g., selectedVal becomes an array).
// 3) defaultValue - The default value for the field.  This setting also exists in
//    the non-directive prefetch lists, but there are two differences here:
//    a) defaultValue can either be one of the list item display strings (the
//       "text" property), or it can be a hash like {code: 'AF-5'}, where "code" is
//       a key on the list item object, and 'AF-5' is the value of that key
//       to select the item as the default.  This is to allow the default value
//       to be specified not just by the display string, but by other attributes
//       of the list item object.
//    b) the default list item is loaded into the field when the autocompletion
//       is set up.
// 4) display - (default "text") the property of the objects in listItems which
//    should be displayed in the list.
// 5) Any other parameters used by the Def.Autocomp.Prefetch constructor defined in
//    autoCompPrefetch.js.  (Look at the options parameter in the initialize method).
//
// For "search" lists, opts can contain:
// 1) url - (required) The URL to which requests for data should be sent.  For
//    details about expected parameters and response data, see the comments for the
//    Def.Autocomp.Search constructor (the initialize method in autoCompSearch.js.)
// 2) Any other parameters used by the Def.Autocomp.Search constructor defiend
//    in autoCompSearch.js.  (Look at the options parameter in the initialize
//    method.)
//
// For search lists, the model data object (selectedVal in the example above)
// will become an array of objects if maxSelect is set to '*' to allow multiple
// selections. (That much is also true for prefetched lists, as noted above.)
// The object for each selected item will have a "text" property corresponding
// to the display text for the selected item, and a "code" property as returned
// by the URL's JSON response.   (For details of the return format, see
// the constructor comments in autoCompSearch.js).
//
// Search lists' URLs can respond with a hash of additional field data in the
// third element of the returned JSON array.  These extra data elements
// will be placed in a sub-object of the model object under the property "data".
// For example, {text: // display text, code: // code for display text,
//   data: { //extra field data here}}
//
// For both types of lists, if the list is configured to allow entry of off-list
// values, the model data objects for such items will have an additional
// property, _notOnList, set to true.
(function () {
  // Wrap the definitions in a function to protect our version of global variables
  function defineDirective(Def) {
    "use strict";

    var AutocompInitializer = Def.PrototypeAPI.Class.create({
      /**
       *  Constructor.
       * @param acOptions the options hash passed to the directive
       *  for configuring the autocompleter.
       * @param scope the AngularJS scope
       * @param element the jQuery-wrapped element for which an autocompleter is
       *  being created.
       * @param controller the AngularJS controller
       */
      initialize: function initialize(acOptions, scope, element, controller) {
        this.displayedProp = acOptions.display || 'text';
        this.scope = scope;
        this.acOptions = acOptions;

        if (controller) {
          // ngModelController, from the "require"
          this.pElem = element[0]; // if there's an autocomp already

          var oldAC = this.pElem.autocomp;

          if (oldAC) {
            // Destroy the existing autocomp
            oldAC.destroy(); // clean up the model data

            scope.modelData = null; // Remove the formatter and parser we defined for the previous
            // autocompleter.

            this.removeAutocompFunction(controller.$formatters);
            this.removeAutocompFunction(controller.$parsers);
          }

          this.ac = acOptions.hasOwnProperty('url') ? this.searchList() : this.prefetchList(); // See if there is an existing model value for the field (which
          // might have been set by the prefetchList call above, if there
          // was a default value for the field).

          var md = scope.modelData;
          var hasPrepoluatedModel = md !== undefined && md !== null; // If there is a already a model value for this field, load it
          // into the autocompleter.

          if (hasPrepoluatedModel) {
            if (this.ac.multiSelect_) {
              // in this case md is an array
              for (var i = 0, len = md.length; i < len; ++i) {
                var dispVal = md[i][this.displayedProp];
                this.ac.storeSelectedItem(dispVal, md[i].code);
                this.ac.addToSelectedArea(dispVal);
              } // Clear the field value for multi-select lists


              this.ac.setFieldVal('', false);
            } else {
              var dispVal = md[this.displayedProp];

              if (typeof dispVal === 'string') {
                this.ac.storeSelectedItem(dispVal, md.code);
                this.ac.setFieldVal(dispVal, false);
              } else // handle the case of an empty object as a model
                this.ac.setFieldVal('', false);
            }
          }

          this.parser = this.parser.bind(this);
          this.parser.fromAutocomp = true;
          controller.$parsers.push(this.parser);
          this.formatter = this.formatter.bind(this);
          this.formatter.fromAutocomp = true;
          controller.$formatters.push(this.formatter);
        } // if controller

      },

      /**
       *  A parser to convert from the field value to the object
       *  containing the value and (e.g.) code.
       * @param value the field value
       * @return the model object.
       */
      parser: function parser(value) {
        // Just rely on the autocompleter list selection event to manage
        // model updates.  Here we will just return the model object, to
        // prevent any change to the model from the parsers.
        var rtn = this.scope.modelData; // Returning "undefined" means the value is invalid and will cause
        // the ng-invalid-parse class to get added.  Switch to null.

        if (rtn === undefined) rtn = null;
        return rtn;
      },

      /**
       *  A formatter to get the display string if the model is changed.
       * @param value the model object
       * @return the display string for the field value
       */
      formatter: function formatter(value) {
        var rtn = '';

        if (!this.ac.multiSelect_) {
          if (typeof value === 'string') rtn = value;else if (value !== null && _typeof(value) === 'object' && typeof value[this.displayedProp] === "string") {
            rtn = value[this.displayedProp];
          }
          rtn = rtn.trim();
        } else rtn = ''; // If angular is setting the field value, we have to let the
        // autocompleter know.


        this.ac.setFieldVal(rtn, false);
        return rtn;
      },

      /**
       *  Returns model data for the field value "finalVal".  (Used for Prefetch
       *  lists.)  If the field is empty, null will be returned.
       * @param finaVal the field value after list selection.  This is the
       *  trimmed "text" value, which will be in the returned model object.
       * @param itemTextToItem a hash of list values to model data objects
       */
      getPrefetchItemModelData: function getPrefetchItemModelData(finalVal, itemTextToItem) {
        var item = itemTextToItem[finalVal];

        if (!item) {
          if (finalVal != '') {
            item = {
              _notOnList: true
            };
            item[this.displayedProp] = finalVal;
          } else // no value in the field
            item = null;
        }

        return item;
      },

      /**
       *  Handles a prefetch list selection event.
       * @param eventData the data about the selection event.
       * @param itemTextToItem a hash from display strings to items
       */
      prefetchListSelHandler: function prefetchListSelHandler(eventData, itemTextToItem) {
        var finalVal = eventData.final_val; // finalVal is a trimmed version of the text.  Use that for
        // the model data.

        if (!this.ac.multiSelect_) {
          // Even if the field value is not valid, we need to update the model;
          // clearing the model would clear the field.
          this.scope.modelData = this.getPrefetchItemModelData(finalVal, itemTextToItem);
        } else {
          if (!this.scope.modelData) this.scope.modelData = [];
          var selectedItems = this.scope.modelData;

          if (eventData.removed) {
            // The item was removed
            var removedVal = eventData.final_val;

            for (var i = 0, len = selectedItems.length; i < len; ++i) {
              if (removedVal === selectedItems[i][this.displayedProp]) {
                selectedItems.splice(i, 1);
                break;
              }
            }
          } else if (eventData.on_list || !this.acOptions.matchListValue) {
            // (Add the new model item, but not if it is invalid)
            var newModel = this.getPrefetchItemModelData(finalVal, itemTextToItem);
            if (newModel) // could be null if the field value was empty
              selectedItems.push(newModel);
          }
        }
      },

      /**
       *  Sets up a prefetched list on the field.
       */
      prefetchList: function prefetchList() {
        var itemText = [];
        var itemTextToItem = {}; // See if we have a default value, unless the model is already
        // populated.

        var acOptions = this.acOptions;
        var defaultKey = null; // null means not using a default

        var defaultValueSpec = acOptions.defaultValue;
        var defaultKeyVal = null; // the value in defaultValueSpec corresponding to defaultKey

        var displayedProp = this.displayedProp;

        if (defaultValueSpec !== undefined && (this.scope.modelData === undefined || this.scope.modelData === null)) {
          if (typeof defaultValueSpec === 'string') {
            defaultKey = displayedProp;
            defaultKeyVal = defaultValueSpec;
          } else {
            // an object like {code: 'AL-23'}
            defaultKey = Object.keys(defaultValueSpec)[0];
            defaultKeyVal = defaultValueSpec[defaultKey];
          }
        } // "listItems" = list item data.


        var modelDefault = null;
        var oneItemText;

        for (var i = 0, numItems = acOptions.listItems.length; i < numItems; ++i) {
          var item = acOptions.listItems[i];
          oneItemText = item[displayedProp];
          itemText[i] = oneItemText;
          var trimmedText = oneItemText.trim();
          itemTextToItem[trimmedText] = item;
          if (defaultKey && item[defaultKey].trim() === defaultKeyVal) modelDefault = this.getPrefetchItemModelData(trimmedText, itemTextToItem);
        }

        var ac = new Def.Autocompleter.Prefetch(this.pElem, itemText, acOptions);
        this.addNameAttr();
        var self = this;
        this.updateListSelectionHandler(function (eventData) {
          self.scope.$apply(function () {
            self.prefetchListSelHandler(eventData, itemTextToItem);
          });
        }); // If we have a default value, assign it to the model.

        if (modelDefault !== null && !this.scope.modelData) this.scope.modelData = ac.multiSelect_ ? [modelDefault] : modelDefault;
        return ac;
      },

      /**
       *  Returns the model data structure for a selected item in a search
       *  list.  If the field is empty, null will be returned.
       * @param itemText the display string of the selected item
       * @param onList true if the selected item was from the list
       */
      getSearchItemModelData: function getSearchItemModelData(itemText, onList) {
        var rtn;
        if (itemText === '') rtn = null;else {
          rtn = this.ac.getItemData(itemText);
          if (!onList) rtn._notOnList = true;
        }
        return rtn;
      },

      /**
       *  Assigns a name to the field if it is missing one.
       *  Names are used to register listeners.  We don't do this in the
       *  autocompleter base class to avoid polluting submitted form data
       *  with unintended fields.
       */
      addNameAttr: function addNameAttr() {
        // If the element does not have a name, use the ID.  The name
        // to register listeners.
        if (this.pElem.name === '') this.pElem.name = this.pElem.id;
      },

      /**
       *  Handles a search list selection event.
       * @param eventData the data about the selection event.
       */
      searchListSelHandler: function searchListSelHandler(eventData) {
        var itemText = eventData.final_val;
        var onList = eventData.on_list;

        if (!this.ac.multiSelect_) {
          // Even if the field value is not valid, we need to update the model;
          // clearing the model would clear the field.
          this.scope.modelData = this.getSearchItemModelData(itemText, onList);
        } else {
          if (!this.scope.modelData) this.scope.modelData = [];
          var selectedItems = this.scope.modelData;

          if (eventData.removed) {
            // The item was removed
            var removedVal = eventData.final_val;

            for (var i = 0, len = selectedItems.length; i < len; ++i) {
              if (removedVal === selectedItems[i].text) {
                selectedItems.splice(i, 1);
                break;
              }
            }
          } else if (eventData.on_list || !this.acOptions.matchListValue) {
            // (Add the new model item, but not if it is invalid)
            var newModel = this.getSearchItemModelData(itemText, onList);
            if (newModel) // could be null if the field value was empty
              selectedItems.push(newModel);
          }
        }
      },

      /**
       *  Sets up a search list on the field.
       */
      searchList: function searchList() {
        var ac = new Def.Autocompleter.Search(this.pElem, this.acOptions.url, this.acOptions);
        this.addNameAttr();
        var self = this;
        this.updateListSelectionHandler(function (eventData) {
          self.scope.$apply(function () {
            self.searchListSelHandler(eventData);
          });
        });
        return ac;
      },

      /**
       *  Takes an array of functions, and removes the first found that is
       *  flagged as being from an autocompleter.
       * @param functionList the array of functions
       */
      removeAutocompFunction: function removeAutocompFunction(functionList) {
        for (var i = 0, len = functionList.length; i < len; ++i) {
          if (functionList[i].fromAutocomp) {
            functionList.splice(i, 1);
            break;
          }
        }
      },

      /**
       *  Updates (replaces) the list selection event handler.
       * @param handler the list selection event handler to be assigned
       */
      updateListSelectionHandler: function updateListSelectionHandler(handler) {
        var field = this.pElem;
        var fieldKey = Def.Observable.lookupKey(field);
        var eh = Def.Autocompleter.directiveListEventHandlers;
        var oldHandler = eh[field.id];

        if (oldHandler) {
          Def.Autocompleter.Event.removeCallback(fieldKey, 'LIST_SEL', oldHandler);
        }

        Def.Autocompleter.Event.observeListSelections(fieldKey, handler);
        eh[field.id] = handler;
      }
    }); // class AutocompInitializer
    // Keep track of created list event handlers.  This is a hash of field IDs to
    // handler functions.

    Def.Autocompleter.directiveListEventHandlers = {};

    if (typeof angular !== 'undefined') {
      angular.module('autocompleteLhcMod', []).directive('autocompleteLhc', [function () {
        return {
          restrict: 'A',
          require: '?ngModel',
          scope: {
            modelData: '=ngModel',
            // the ng-model attribute on the tag
            acOpts: '=autocompleteLhc'
          },
          link: function link(scope, element, attrs, controller) {
            // Set the update options to 'none' so only the autocompleter code
            // updates the model.
            if (!controller.$options) controller.$options = {};
            controller.$options.updateOn = 'none';
            controller.$options.updateOnDefault = false;

            function initWidget(options) {
              new AutocompInitializer(options, scope, element, controller);
            } // Re-initialize the autocomplete widget whenever the options change


            scope.$watch("acOpts", initWidget, true);
          }
        };
      }]);
    }
  }

  if (true) module.exports = defineDirective;else {}
})();

/***/ }),
/* 20 */
/***/ (function(module, exports) {

/*
 * Define lforms constants here and use this a dependency in the angular application
 */
angular.module('lformsWidget').constant('LF_CONSTANTS', {
  BLANK_GIF_DATAURL: 'data:image/gif;base64,R0lGODlhAQABAJEAAAAAAP///////wAAACH5BAUUAAIALAAAAAABAAEAAAICVAEAOw==',
  EVENT_REPEATING_ITEM_ADDED: 'LF_EVENT_REPEATING_ITEM_ADDED',
  EVENT_REPEATING_ITEM_DELETED: 'LF_EVENT_REPEATING_ITEM_DELETED',
  VALIDATION_MESSAGE_INITIAL_SHOW_TIME: 2000
});

/***/ }),
/* 21 */
/***/ (function(module, exports) {

angular.module('lformsWidget').service('lformsConfig', ['$animate', function ($animate) {
  'use strict';

  return {
    'enableAnimate': function enableAnimate() {
      $animate.enabled(true);
    },
    'disableAnimate': function disableAnimate() {
      $animate.enabled(false);
    }
  };
}]);

/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var LForms = __webpack_require__(2);

angular.module('lformsWidget').controller('LFormsCtrl', ['$window', '$scope', '$element', '$timeout', '$interval', '$sce', 'smoothScroll', 'LF_CONSTANTS', 'lformsConfig', function ($window, $scope, $element, $timeout, $interval, $sce, smoothScroll, LF_CONSTANTS, lformsConfig) {
  'use strict';

  $scope.debug = false;
  $scope.hasUnused = false;
  $scope.repeatingSectionStatus = {};
  $scope.validationInitialShowTime = LF_CONSTANTS.VALIDATION_MESSAGE_INITIAL_SHOW_TIME; // Provide blank image to satisfy img tag. Bower packaging forces us to
  // avoid using image files from html templates, therefore using base64
  // encoding for a 1x1 blank gif file.

  $scope.blankGifDataUrl = LF_CONSTANTS.BLANK_GIF_DATAURL; // Default option for calendar

  $scope.dateOptions = {
    changeYear: true,
    changeMonth: true,
    yearRange: '1800:-0',
    showOn: 'button',
    constrainInput: false,
    showOtherMonths: true,
    selectOtherMonths: true,
    showMonthAfterYear: true,
    buttonText: "Show date picker"
  };
  /**
   * Check the current view's width
   */

  $scope.checkViewWidth = function () {
    // the $element is where the controller is set on
    var width = $element.width(); //$window.innerWidth;

    $scope._viewMode = "";
    $scope._inputFieldWidth = ""; // small screen

    if (width <= 400) //480
      $scope._viewMode = "sm"; // medium screen
    else if (width <= 600) //800
        $scope._viewMode = "md"; // large screen
      else {
          $scope._viewMode = "lg";
        }
    $scope._inputFieldWidth = {
      'width': width / 2
    };
  }; // initialize an element resize detector


  var erd = LForms._elementResizeDetectorMaker({
    strategy: "scroll" //<- For ultra performance.

  }); // check the width when the containing div changes its size


  erd.listenTo($element, function (element) {
    $scope.$apply($scope.checkViewWidth());
  }); // initial values

  $scope.checkViewWidth();
  /**
   * get the CSS class the form's view mode
   * @returns {string}
   */

  $scope.getViewModeClass = function () {
    var viewModeClass = "";

    if ($scope.lfData) {
      var viewMode = $scope.lfData.templateOptions.viewMode; // responsive to the screen/container's size

      if (!viewMode || viewMode === "auto") {
        viewMode = $scope._viewMode;
      }

      switch (viewMode) {
        // fixed to be the large layout
        case "lg":
          viewModeClass = "lf-view-lg";
          break;
        // fixed to be the large layout

        case "md":
          viewModeClass = "lf-view-md";
          break;
        // fixed to be the large layout

        case "sm":
          viewModeClass = "lf-view-sm";
          break;
      }
    }

    return viewModeClass;
  };
  /**
   * get the CSS class for an item's view mode
   * @param item a form item
   * @returns {string}
   */


  $scope.getItemViewModeClass = function (item) {
    var viewMode;
    var viewModeClass = "";

    if ($scope.lfData) {
      // if viewMode is specified on the item
      if (item.displayControl && item.displayControl.viewMode) {
        viewMode = item.displayControl.viewMode;
      } // otherwise use the default viewMode of the form
      else {
          viewMode = $scope.lfData.templateOptions.viewMode;
        } // responsive to the screen/container's size


      if (!viewMode || viewMode === "auto") {
        viewMode = $scope._viewMode;
      }

      switch (viewMode) {
        // fixed to be the large layout
        case "lg":
          viewModeClass = "lf-item-view-lg";
          break;
        // fixed to be the large layout

        case "md":
          viewModeClass = "lf-item-view-md";
          break;
        // fixed to be the large layout

        case "sm":
          viewModeClass = "lf-item-view-sm";
          break;

        default:
          viewModeClass = "lf-item-view-lg";
      }
    }

    return viewModeClass;
  };
  /**
  * Set the active row in table
  * @param index index of an item in the lforms form items array
  */


  $scope.setActiveRow = function (item) {
    $scope.lfData.setActiveRow(item);
  };
  /**
   * Get the inline width for the input and unit part of a form item
   * @item a form item
   * @returns {*}
   */


  $scope.getFieldWidth = function (item) {
    return $scope.getItemViewModeClass(item) === 'lf-item-view-lg' ? $scope._inputFieldWidth : null;
  };
  /**
   * Set the time that a validation message shows for the first time.
   * @param ms time in ms
   */


  $scope.setValidationInitialShowTime = function (ms) {
    $scope.validationInitialShowTime = ms;
  };
  /**
   * Set up a timer to make validation messages disappear in 2 seconds when the input field loses focus
   * @param item the item which onBlur event happens on its input field
   */


  $scope.activeRowOnBlur = function (item) {
    // the first visit to the field (and leaving the field), show validation messages for a certain time
    if (!item._visitedBefore) {
      item._showValidation = true; // use $interval instead of $timeout so that protractor will not wait on $timeout

      var intervalCanceller = $interval(function () {
        // not to show validation messages after 2 seconds
        item._showValidation = false;
        item._visitedBefore = true;
        $interval.cancel(intervalCanceller);
      }, $scope.validationInitialShowTime);
    } // the following visits (and leaving the field), not to show validation messages
    else {
        item._showValidation = false;
      }
  };
  /**
   * Get the css class for the active row
   * @param item an item
   * @returns {string}
   */


  $scope.getActiveRowClass = function (item) {
    return $scope.lfData.getActiveRowClass(item);
  };
  /**
   * Reset the lfData
   */


  $scope.setFormData = function (formData) {
    $scope.lfData = formData;
  };
  /**
   * Check if the form is finished
   * @returns {boolean|*|*}
   */


  $scope.isFormDone = function () {
    return $scope.lfData.isFormDone();
  };
  /**
   * Check if there's a unit list
   * @param item an item in the lforms form items array
   * @returns {boolean}
   */


  $scope.checkUnits = function (item) {
    var ret = false;

    if (item.dataType !== "CNE" && item.dataType !== "CWE" && item.units && jQuery.isArray(item.units)) {
      ret = true;
    }

    return ret;
  };
  /**
   * Get an item's skip logic status
   * @param item an item
   * @returns {*|string}
   */


  $scope.getSkipLogicClass = function (item) {
    return $scope.lfData.getSkipLogicClass(item);
  };
  /**
   * Get the CSS styles on an item in formHeaderItems
   * @param col an item in formHeaderItems
   * @returns {{}} CSS style object
   */


  $scope.getHeaderItemStyle = function (col) {
    var ret = {};

    if (col.displayControl && angular.isArray(col.displayControl.colCSS)) {
      // only when the view mode is lg, i.e. the items are listed like table columns
      var viewModeClass = $scope.getViewModeClass();

      if (viewModeClass === 'lf-view-lg') {
        var colCSS = col.displayControl.colCSS;

        for (var i = 0, iLen = colCSS.length; i < iLen; i++) {
          var css = colCSS[i];
          ret[css.name] = css.value;
        }
      }
    }

    return ret;
  };
  /**
   * Get the CSS styles on a table column
    * @param col a column in a HTML table
   * @returns {{}} CSS style object
   */


  $scope.getTableColumnStyle = function (col) {
    var ret = {};

    if (col.displayControl && angular.isArray(col.displayControl.colCSS)) {
      var colCSS = col.displayControl.colCSS;

      for (var i = 0, iLen = colCSS.length; i < iLen; i++) {
        var css = colCSS[i];
        ret[css.name] = css.value;
      }
    }

    return ret;
  };
  /**
   * Get the CSS styles on an item itself
   * @param item an item in a form
   * @returns {{}} CSS style object
   */


  $scope.getItemStyle = function (item) {
    var ret = {};

    if (item.displayControl && angular.isArray(item.displayControl.css)) {
      for (var i = 0, iLen = item.displayControl.css.length; i < iLen; i++) {
        var css = item.displayControl.css[i];
        ret[css.name] = css.value;
      }
    }

    return ret;
  };
  /**
   * Check an item's skip logic status to decide if the item should be shown
   * @param item an item
   * @returns {boolean}
   */


  $scope.targetShown = function (item) {
    return $scope.lfData.getSkipLogicClass(item) !== 'target-hide';
  };
  /**
   *  Hide/show the form option panel
   */


  $scope.hideShowFormOptionPanel = function () {
    $scope.lfData.templateOptions.showFormOptionPanel = !$scope.lfData.templateOptions.showFormOptionPanel;
  };
  /**
   * Check if the button for item option panel should be shown
   * @param item a form item
   */


  $scope.isItemOptionPanelButtonShown = function (item) {
    var buttonShown = $scope.lfData.templateOptions.showItemOptionPanelButton && (item.dataType === "SECTION" || item.answers && (item.dataType === "CWE" || item.dataType === "CNE"));
    if (!buttonShown) item._showItemOptionPanel = false;
    return buttonShown;
  };
  /**
   * Hide/show the item's option panel
   * @param item a form item
   */


  $scope.hideShowItemOptionPanel = function (item) {
    if ($scope.isItemOptionPanelButtonShown(item)) {
      item._showItemOptionPanel = !item._showItemOptionPanel;
    }
  };
  /**
   * Check if a particular layout is allowed for a section item
   * @param item a form item
   * @param layout a type of layout. permissible values are 'horizontal' and 'matrix'
   */


  $scope.isQuestionLayoutAllowed = function (item, layout) {
    var allowed = false;

    if (layout === 'matrix' || layout === 'horizontal') {
      allowed = true; //for both horizontal and matrix
      //the item has children but no grand children

      if (item.dataType === "SECTION" && item.items && item.items.length > 0) {
        var firstItemAnswers = item.items[0].answers;
        var firstItemDataType = item.items[0].dataType;
        var firstItemAnswerCardinality = item.items[0].answerCardinality;

        for (var i = 0, iLen = item.items.length; i < iLen; i++) {
          var subItem = item.items[i];

          if (subItem.dataType === "SECTION" || subItem.dataType === "TITLE" || subItem.items && subItem.items.length > 0) {
            allowed = false;
            break;
          } // addition requirement for matrix layout: all answers are same


          if (layout === "matrix") {
            if (subItem.dataType !== "CWE" && subItem.dataType !== "CNE") {
              allowed = false;
              break;
            } else if (i > 0 && firstItemDataType !== item.items[i].dataType || !angular.equals(firstItemAnswerCardinality, subItem.answerCardinality) || !angular.equals(firstItemAnswers, subItem.answers)) {
              allowed = false;
              break;
            }
          }
        }
      } else {
        allowed = false;
      }
    }

    return allowed;
  };
  /**
   * Check the display type of the coding instructions
   * @param item an item in the lforms form items array
   * @returns {string}
   */


  $scope.getCodingInstructionsDisplayType = function (item) {
    var ret = '';

    if (item.codingInstructions && item.codingInstructions.length > 0) {
      var position = $scope.lfData.templateOptions.showCodingInstruction ? "inline" : "popover";

      if ($scope.lfData.templateOptions.allowHTMLInInstructions && item.codingInstructionsFormat === "html") {
        var format = "html";
      } else {
        format = "escaped";
      }

      ret = position + "-" + format;
    }

    return ret;
  };
  /**
   * Get coding instructions with assumed safe HTML content
   * @param item an item in the lforms form items array
   * @returns {string}
   */


  $scope.getTrustedCodingInstructions = function (item) {
    var ret = '';

    if (item.codingInstructions) {
      ret = $sce.trustAsHtml(item.codingInstructions);
    }

    return ret;
  };
  /**
   * Get the sequence number for the current repeating item
   * @param item an item in the lforms form items array
   * @returns {string}
   */


  $scope.getRepeatingSN = function (item) {
    var ret = '';

    if (item._questionRepeatable) {
      var sn = item._idPath.slice(1);

      ret = sn.replace(/\//g, '.');
    }

    return ret;
  };
  /**
   * Watch on value and unit changes of controlling/source items for skip logic
   * formulas and data controls.
   */


  $scope.$watch(function () {
    var watchedSourceItems = null;

    if ($scope.lfData && $scope.lfData.itemList) {
      watchedSourceItems = [];

      for (var i = 0, iLen = $scope.lfData.itemList.length; i < iLen; i++) {
        var item = $scope.lfData.itemList[i];

        if (item._formulaTargets || item._dataControlTargets || item._skipLogicTargets) {
          watchedSourceItems.push({
            value: item.value,
            unit: item.unit,
            id: item._elementId
          });
        }
      }
    }

    return watchedSourceItems;
  }, function (newValues, oldValues) {
    var lastUpdated = [];

    if (newValues) {
      // no oldValues, initial loading
      if (!oldValues) {
        for (var i = 0, iLen = newValues.length; i < iLen; i++) {
          lastUpdated.push(newValues[i].id);
        }
      } // adding a new repeating item/section
      else if (oldValues.length < newValues.length) {
          //// find out which one is added, solution 1
          //for (var m= 0, mLen=newValues.length; m<mLen; m++) {
          //  var newVal = newValues[m];
          //  var isNew = true;
          //  for (var n= 0, nLen=oldValues.length; n<nLen; n++) {
          //    var oldVal = oldValues[n];
          //    if (newVal.id === oldVal.id) {
          //      isNew = false;
          //      break;
          //    }
          //  }
          //  if (isNew) {
          //    lastUpdated.push(newVal.id)
          //  }
          //}
          // find out which one is added, solution 2
          // it is always the last one in current design
          lastUpdated.push(newValues[newValues.length - 1].id);
        } // removing a repeating item/section
        else if (oldValues.length > newValues.length) {} // rules run at the remove event, TBD
          // data changes only
          else {
              for (var i = 0, iLen = newValues.length; i < iLen; i++) {
                if (!angular.equals(newValues[i], oldValues[i])) {
                  lastUpdated.push(newValues[i].id);
                }
              }
            } // do something


      for (var j = 0, jLen = lastUpdated.length; j < jLen; j++) {
        var item = $scope.lfData.itemHash[lastUpdated[j]];
        $scope.updateOnSourceItemChange(item);
      }
    }
  }, true);
  /**
   * Watch on form changes (shallow watch on the form object)
   * Disable animation and validations before a form is loaded,
   * then re-enable animation and validations when the form is loaded
   */

  $scope.$watch("lfData", function () {
    // or watch on function() {return $scope.lfData;}
    var lfData = $scope.lfData; // disable animation

    lformsConfig.disableAnimate(); // re-enable animation after the form is loaded

    if (lfData && lfData.templateOptions && lfData.templateOptions.useAnimation) {
      $timeout(function () {
        // the templateOptions might be changed again after the $timeout was set
        if (lfData && lfData.templateOptions && lfData.templateOptions.useAnimation) {
          lformsConfig.enableAnimate();
        }
      }, 1);
    } // Only when lfData changes as a whole do we check whether the new
    // form has FHIRPath or not.  This is to avoid the expensive (for
    // large forms) check on the whole of the form data for the need to
    // run FHIRPath.


    if (LForms.FHIR) {
      if (lfData && (lfData.hasFHIRPath || lfData._hasInitialExpr)) {
        // Watch for changes that require FHIRPath to run
        if (lfData.hasFHIRPath) {
          if ($scope.unwatchFHIRPath) $scope.unwatchFHIRPath();
          $scope.unwatchFHIRPath = $scope.$watch(function () {
            return JSON.stringify(lfData, function (key, val) {
              // In Safari, "key" is a number (not a string) for arrays
              key = "" + key; // a little faster than checking the type
              // Ignore changes to internal variables and $$hashKey

              return key.indexOf('_') === 0 || key.indexOf('$$') === 0 ? undefined : val;
            });
          }, function () {
            if (lfData) lfData._expressionProcessor.runCalculations(false);
          });
        } // Set up a listener for asynchronous change events (triggered by
        // lfData itself).


        if (!lfData._controllerInit) {
          // TBD: I think there is a race-condition here (though I
          // have not seen it happen).  Potentially the lfData could
          // have already notified regarding async changes before
          // this listener is added.
          lfData.addAsyncChangeListener(function () {
            $scope.$apply(function () {
              if (lfData.hasFHIRPath || lfData._hasInitialExpr) lfData._expressionProcessor.runCalculations(true);
            });
          });
        } // Angular calls this twice for the same lfData.  Set a flag.
        // Note:  For some reason the watches still need to be set up both times.


        lfData._controllerInit = true;
      } else {
        // !(lfData && $scope.lfData.hasFHIRPath)
        if ($scope.unwatchFHIRPath) {
          $scope.unwatchFHIRPath(); // stop watching because it is no longer needed

          $scope.unwatchFHIRPath = null;
        }

        if ($scope.unwatchAsync) {
          $scope.unwatchAsync();
          $scope.unwatchAsync = null;
        }
      }
    }
  });
  /**
   * Check skip logic, formulas and data controls when the source item changes.
   * @param item the controlling/source item
   */

  $scope.updateOnSourceItemChange = function (item) {
    var widgetData = $scope.lfData;

    if (widgetData) {
      widgetData.updateOnSourceItemChange(item);
      $scope.sendActionsToScreenReader();
    }
  };
  /**
   * Adjust the height of a textarea
   * @param e a textarea DOM element or a ID of a textarea element
   */


  $scope.autoExpand = function (e) {
    var element = _typeof(e) === 'object' ? e.target : document.getElementById(e);
    var scrollHeight = element.scrollHeight + 2;
    element.style.height = scrollHeight + "px";
  };
  /**
   * Get total number of questions on the form, not including section headers or titles
   * @returns {number}
   */


  $scope.getNumberOfQuestions = function () {
    var ret = 0;
    var widgetData = $scope.lfData;

    if (widgetData && widgetData.itemList) {
      for (var i = 0, iLen = widgetData.itemList.length; i < iLen; i++) {
        if (!widgetData.itemList[i].header) ret++;
      }
    }

    return ret;
  };
  /**
   * Get CSS classes for the sibling status (whether it is the first or the last sibling)
   * @param item a form item
   * @returns {string}
   */


  $scope.getSiblingStatus = function (item) {
    var status = "";
    if (item._lastSibling) status += 'lf-last-item';
    if (item._firstSibling) status += ' lf-first-item';
    return status;
  };
  /**
   * Get the indentation style of the form
   * @returns {string}
   */


  $scope.getIndentationStyle = function () {
    return $scope.lfData.templateOptions.useTreeLineStyle ? "lf-indentation-tree" : "lf-indentation-bar";
  };
  /**
   * Get the CSS class on each item row
   * @param item an item in the lforms form items array
   * @returns {string}
   */


  $scope.getRowClass = function (item) {
    var eleClass = 'level' + item._displayLevel;

    if (item._answerRequired) {
      eleClass += ' lf-answer-required';
    }

    if (item.header) {
      eleClass += ' lf-section-header';
    } else {
      eleClass += ' lf-question';
    }

    if (!item.question || item.question.length === 0) {
      eleClass += ' lf-empty-question';
    }

    if (item._visitedBefore) {
      eleClass += ' lf-visited-before';
    }

    if (item._showValidation) {
      eleClass += ' lf-show-validation';
    }

    if (item.dataType === 'TITLE') {
      eleClass += ' lf-title-row';
    }

    return eleClass;
  };
  /**
   * Add a repeating item or a repeating group
   * @param item an item in the lforms form items array
   * @param append an optional flag indicate if the new item is added to the end of the repeating group
   */


  $scope.addOneRepeatingItem = function (item, append) {
    var widgetData = $scope.lfData;
    var anyEmpty = false;

    if ($scope.lfData && !$scope.lfData.templateOptions.allowMultipleEmptyRepeatingItems) {
      anyEmpty = widgetData.areAnyRepeatingItemsEmpty(item);

      if (anyEmpty && item._showUnusedItemWarning) {
        if (!item._unusedItemWarning) item._unusedItemWarning = 'Please enter info in the blank "' + item.question + '"';
        $scope.sendMsgToScreenReader(item._unusedItemWarning);
      }
    }

    if (!anyEmpty) {
      var newItem = append ? widgetData.appendRepeatingItems(item) : widgetData.addRepeatingItems(item);
      $scope.sendActionsToScreenReader(); // broadcast the event

      $scope.$emit(LF_CONSTANTS.EVENT_REPEATING_ITEM_ADDED, {
        "event": LF_CONSTANTS.EVENT_REPEATING_ITEM_ADDED,
        "formId": $scope.lfData.code,
        "itemId": newItem._elementId,
        "time": new Date()
      });
      setTimeout(function () {
        var viewportHeight = window.innerHeight || document.documentElement.clientHeight;
        var headerItem = jQuery("label[for='" + newItem._elementId + "']")[0];
        var btnDel = document.getElementById("del-" + newItem._elementId); // vertical table, find the header item

        if (headerItem) {
          var anchorItem = headerItem;
        } // horizontal table, find the '-' button
        else if (btnDel) {
            var anchorItem = btnDel;
          }

        if (anchorItem) {
          var anchorPosition = anchorItem.getBoundingClientRect(); // scroll down to show about 2 rows of the newly added section
          // if the new header item is close enough to the bottom so that the first 2 questions are not visible

          if (anchorPosition && anchorPosition.bottom > viewportHeight - 70) {
            smoothScroll(anchorItem, {
              duration: 500,
              easing: 'easeInQuad',
              offset: viewportHeight - 105
            });
          } // move the focus to the '-' button of the newly added item/section
          // a table from the '-' button moves the focus to the next input field


          if (btnDel) btnDel.focus();
        }
      }, 1);
    }
  };
  /**
   * Unset the flag to hide the warning about unused repeating items
   * @param item a repeating item
   */


  $scope.hideUnusedItemWarning = function (item) {
    if ($scope.lfData && !$scope.lfData.templateOptions.allowMultipleEmptyRepeatingItems) {
      item._showUnusedItemWarning = false;
    }
  };
  /**
   *  Writes a single message to the reader_log element on the page
   *  so that screen readers can read it.
   * @param msg the message to be read
   */


  $scope.sendMsgToScreenReader = function (msg) {
    LForms.Def.Autocompleter.screenReaderLog(msg);
  };
  /**
   * Write action logs from the lforms to reader_log element on the page
   * so that screen readers can read.
   */


  $scope.sendActionsToScreenReader = function () {
    var widgetData = $scope.lfData;

    if (widgetData._actionLogs.length > 0) {
      widgetData._actionLogs.forEach(function (log) {
        LForms.Def.Autocompleter.screenReaderLog(log);
      }); // clean up logs


      widgetData._actionLogs = [];
    }
  };
  /**
   * Remove one repeating item in a group
   * @param item an item in the lforms form items array
   */


  $scope.removeOneRepeatingItem = function (item) {
    var widgetData = $scope.lfData;
    var nextItem = widgetData.getNextRepeatingItem(item);
    var btnId = ''; // move the focus to the next '-' button if there's one displayed
    // ('-' buttons are shown only when there are two repeating items shown).

    if (nextItem) {
      if (widgetData.getRepeatingItemCount(item) === 2) {
        btnId = 'add-' + nextItem._elementId;
      } else {
        btnId = 'del-' + nextItem._elementId;
      }
    } // otherwise move the focus to the add button of the previous item
    else {
        var prevItem = widgetData.getPrevRepeatingItem(item);

        if (prevItem) {
          btnId = 'add-' + prevItem._elementId;
        }
      } // remove the items


    $scope.lfData.removeRepeatingItems(item);
    $scope.sendActionsToScreenReader(); // broadcast the event

    $scope.$emit(LF_CONSTANTS.EVENT_REPEATING_ITEM_DELETED, {
      "event": LF_CONSTANTS.EVENT_REPEATING_ITEM_DELETED,
      "formId": $scope.lfData.code,
      "itemId": item._elementId,
      "time": new Date()
    }); // set the focus

    setTimeout(function () {
      var btn = document.getElementById(btnId);
      if (btn) btn.focus();
    }, 1);
  };
  /**
   * Check if there's only one repeating item in a group
   * (so that the 'remove' button won't show on this item)
   * @param item an item in the lforms form items array
   * @returns {boolean}
   */


  $scope.hasOneRepeatingItem = function (item) {
    var recCount = $scope.lfData.getRepeatingItemCount(item);
    return recCount > 1 ? false : true;
  };
  /**
   * Check if the current horizontal table has one row only
   * @param item an item in the lforms form items array
   * @returns {boolean}
   */


  $scope.hasOneRepeatingRow = function (item) {
    var ret = false;
    var tableInfo = $scope.lfData._horizontalTableInfo[item._codePath + item._parentIdPath_];

    if (tableInfo && tableInfo.tableRows && tableInfo.tableRows.length === 1) {
      ret = true;
    }

    return ret;
  };
  /**
   * Check if the question needs an extra input
   * @param item an item in the lforms form items array
   * @returns {*}
   */


  $scope.needExtra = function (item) {
    var widgetData = $scope.lfData;
    var extra = widgetData.needExtra(item);
    return extra;
  };
  /**
   * Get user input data from the form, with or without form definition data.
   * @param noFormDefData optional, to not include form definition data, the default is false.
   * @param noEmptyValue optional, to remove items that have an empty value, the default is false.
   * @param noHiddenItem optional, to remove items that are hidden by skip logic, the default is false.
   * @returns {{itemsData: (*|Array), templateData: (*|Array)}} form data and template data
   */


  $scope.getUserData = function (noFormDefData, noEmptyValue, noHiddenItem) {
    var formData = $scope.lfData.getUserData(noFormDefData, noEmptyValue, noHiddenItem);
    return formData;
  };
  /**
   * Get the complete form definition data, including the user input data from the form.
   * The returned data could be fed into a LForms widget directly to render the form.
   * @return {{}} form definition JSON object
   */


  $scope.getFormData = function () {
    var formData = $scope.lfData.getFormData();
    return formData;
  }; // for debug only. to be removed.


  $scope.onclick = function () {
    debugger;
    var ele = $element;
    var i = 1;
  };
  /**
   * Get the display layout for each answer in a RADIO_CHECKBOX layout of an item's answers
   * @param item a form item
   * @returns {string}
   */


  $scope.getAnswerLayoutColumnClass = function (item) {
    var ret = "";

    if (item && item.displayControl && item.displayControl.answerLayout && item.displayControl.answerLayout.type === "RADIO_CHECKBOX") {
      var colNum = parseInt(item.displayControl.answerLayout.columns);
      if (isNaN(colNum) || colNum > 6 || colNum < 0) colNum = 0;
      ret = "lf-" + colNum + "-col";
    }

    return ret;
  };
  /**
   * Updates the value for an item whose answers are displayed as a list of checkboxes,
   * one of which has just been selected or deselected
   * @param item a form item that has an answer list and supports multiple selections
   * @param answer an answer object in the answer list
   */


  $scope.updateCheckboxList = function (item, answer) {
    if (item.value && angular.isArray(item.value)) {
      var index,
          selected = false;

      for (var i = 0, iLen = item.value.length; i < iLen; i++) {
        if (angular.equals(item.value[i], answer)) {
          selected = true;
          index = i;
          break;
        }
      } // if answer is currently selected


      if (selected) {
        // remove the answer from the selected list
        item.value.splice(index, 1);
      } // if answer is not currently selected
      else {
          // add the answer to the selected list
          item.value.push(answer);
        }
    } // the value is not accessed before
    else {
        // add the answer to the selected list
        item.value = [answer];
      }
  };
  /**
   * Updates the value for an item with the user typed data.
   * The item's answers are displayed as a list of checkboxes, and users have an option to type their own answer.
   * Update the item.value based on selection of extra data input by users
   * @param item a form item that has an answer list and supports multiple selections and user typed data.
   * @param otherValue the value object of the other value checkbox
   */


  $scope.updateCheckboxListForOther = function (item, otherValue) {
    // set the other value flag
    otherValue._otherValue = true; // add/update the other value

    if (item._otherValueChecked) {
      // the list is not empty
      if (item.value && angular.isArray(item.value)) {
        var found = false;

        for (var i = 0, iLen = item.value.length; i < iLen; i++) {
          if (item.value[i]._otherValue) {
            item.value[i] = otherValue;
            found = true;
            break;
          }
        } // if the other value is not already in the list


        if (!found) {
          // add the other value to the list
          item.value.push(otherValue);
        }
      } // the list is empty
      else {
          // add the other value to the list
          item.value = [otherValue];
        }
    } // remove other value
    else {
        if (item.value && angular.isArray(item.value)) {
          var index,
              found = false;

          for (var i = 0, iLen = item.value.length; i < iLen; i++) {
            if (item.value[i]._otherValue) {
              found = true;
              index = i;
              break;
            }
          }

          if (found) {
            item.value.splice(index, 1);
          }
        }
      }
  };
  /**
   *
   * Update the item.value based on selection of an answer by users
   * @param item a form item that has an answer list and support single selections
   */


  $scope.updateRadioList = function (item) {
    item._otherValueChecked = false;
  };
  /**
   * Update the item.value based on selection of extra data input by users
   * @param item a form item that has an answer list and support single selections
   * @param otherValue the value object of the other value radio button
   */


  $scope.updateRadioListForOther = function (item, otherValue) {
    // add/update the other value
    if (item._otherValueChecked) {
      item.value = otherValue;
    }
  };
  /**
   * Check if a checkbox should be checked based on the value of a form item
   * @param item a form item
   * @param answer an answer in the items' answer list
   * @returns {boolean}
   */


  $scope.checkAnswer = function (item, answer) {
    var checked = false;

    if (item && item.value) {
      if (angular.isArray(item.value)) {
        for (var i = 0, iLen = item.value.length; i < iLen; i++) {
          var selectedAnswer = item.value[i];

          if (selectedAnswer.text === answer.text) {
            checked = true;
            break;
          }
        }
      } else {
        if (item.value.text === answer.text) {
          checked = true;
        }
      }
    }

    return checked;
  };
  /**
   * Handle navigation keys using TAB/ SHIFT+TAB keys
   * @param event keypress event
   */


  $scope.handleNavigationKeyEventByTab = function (event) {
    var widgetData = $scope.lfData;

    if (widgetData.templateOptions.tabOnInputFieldsOnly && event.keyCode === widgetData.Navigation.TAB) {
      if (event.shiftKey) {
        var simArrowCode = widgetData.Navigation.ARROW.LEFT;
      } else {
        var simArrowCode = widgetData.Navigation.ARROW.RIGHT;
      }

      var nextId = event.target['id'],
          nextElement; // find the next element, bypass the invisible elements

      do {
        // get the DOM element id of next field
        nextId = widgetData.Navigation.getNextFieldId(simArrowCode, nextId); // get the next DOM element by ID

        nextElement = document.getElementById(nextId);
      } while (nextId && (!nextElement || !jQuery(nextElement).is(":visible"))); // set the focus


      var currentElement = event.target;

      if (nextElement && nextElement.id !== currentElement.id) {
        event.preventDefault();
        event.stopPropagation();
        setTimeout(function () {
          nextElement.focus();
          nextElement.select();
        }, 1);
        currentElement.blur();
      }
    }
  };
  /**
   * Handle navigation keys using CTRL+arrow keys
   * @param event keypress event
   */


  $scope.handleNavigationKeyEventByArrowKeys = function (event) {
    var widgetData = $scope.lfData; // supported arrow keys

    var arrow = widgetData.Navigation.ARROW; // only when control key is also pressed

    if (event.ctrlKey && jQuery.inArray(event.keyCode, [arrow.LEFT, arrow.UP, arrow.RIGHT, arrow.DOWN]) >= 0) {
      var nextId = event.target['id'],
          nextElement; // find the next element, bypass the invisible elements

      do {
        // get the DOM element id of next field
        nextId = widgetData.Navigation.getNextFieldId(event.keyCode, nextId); // get the next DOM element by ID

        nextElement = document.getElementById(nextId);
      } while (nextId && (!nextElement || !jQuery(nextElement).is(":visible"))); // set the focus


      var currentElement = event.target;

      if (nextElement && nextElement.id !== currentElement.id) {
        event.preventDefault();
        event.stopPropagation();
        setTimeout(function () {
          nextElement.focus();
        }, 1);
        currentElement.blur();
      }
    }
  };
}]);

/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

(function () {
  'use strict';

  var LForms = __webpack_require__(2); //  var angular = require('angular');


  angular.module('lformsWidget').factory('RecursionHelper', ['$compile', function ($compile) {
    return {
      /**
       * From: http://stackoverflow.com/questions/14430655/recursion-in-angular-directives
       * Manually compiles the element, fixing the recursion loop.
       * @param element
       * @param [link] A post-link function, or an object with function(s) registered via pre and post properties.
       * @returns An object containing the linking functions.
       */
      compile: function compile(element, link) {
        // Normalize the link parameter
        if (angular.isFunction(link)) {
          link = {
            post: link
          };
        } // Break the recursion loop by removing the contents


        var contents = element.contents().remove();
        var compiledContents;
        return {
          pre: link && link.pre ? link.pre : null,

          /**
           * Compiles and re-adds the contents
           */
          post: function post(scope, element) {
            // Compile the contents
            if (!compiledContents) {
              compiledContents = $compile(contents);
            } // Re-add the compiled contents to the element


            compiledContents(scope, function (clone) {
              element.append(clone);
            }); // Call the post-linking function, if any

            if (link && link.post) {
              link.post.apply(null, arguments);
            }
          }
        };
      }
    };
  }]) // each item, use inherited scope
  .directive('lfItem', function () {
    return {
      restrict: 'E',
      transclude: true,
      templateUrl: 'item.html'
    };
  }) // each item in table template, use inherited scope
  .directive('lfTableItem', ["RecursionHelper", function (RecursionHelper) {
    return {
      restrict: "E",
      templateUrl: "table-item.html",
      compile: function compile(element) {
        // Use the compile function from the RecursionHelper,
        // And return the linking function(s) which it returns
        return RecursionHelper.compile(element);
      }
    };
  }]) // date field
  .constant('lfDateConfig', {}).directive('lfDate', ['lfDateConfig', '$timeout', function (lfDateConfig, $timeout) {
    'use strict';

    var options;
    options = {};
    angular.extend(options, lfDateConfig);
    return {
      require: '?ngModel',
      link: function link(scope, element, attrs, controller) {
        var getOptions = function getOptions() {
          return angular.extend({}, lfDateConfig, scope.$eval(attrs.lfDate));
        };

        var initDateWidget = function initDateWidget() {
          var showing = false;
          var opts = getOptions(); // If we have a controller (i.e. ngModelController) then wire it up

          if (controller) {
            // Set the view value in a $apply block when users selects
            // (calling directive user's function too if provided)
            var _onSelect = opts.onSelect || angular.noop;

            opts.onSelect = function (value, picker) {
              showing = true;
              controller.$setViewValue(element.datepicker("getDate"));

              _onSelect(value, picker);

              element.change();
            };

            opts.beforeShow = function () {
              showing = true;
            };

            opts.onClose = function (value, picker) {
              showing = false;
            };

            element.on('change', function () {
              var valid_date = Date.parse(this.value);

              if (valid_date) {
                controller.$setViewValue(valid_date);
                element.datepicker("setDate", valid_date);
              }

              if (!showing) {
                scope.$apply(function () {
                  element.datepicker("setDate", element.datepicker("getDate"));
                  controller.$setViewValue(element.datepicker("getDate"));
                });
              }
            }); // Update the date picker when the model changes

            controller.$render = function () {
              var date = controller.$viewValue;

              if (angular.isDefined(date) && date !== null && !angular.isDate(date) && typeof date !== "string") {
                throw new Error('ng-Model value must be a Date object or a string - currently it is a ' + _typeof(date));
              } // convert saved user data into date
              else if (typeof date === "string") {
                  date = new Date(date);
                }

              element.datepicker("setDate", date);
            };
          } // If we don't destroy the old one it doesn't update properly when the config changes


          element.datepicker('destroy'); // Create the new datepicker widget

          element.datepicker(opts);

          if (controller) {
            // Force a render to override whatever is in the input text box
            controller.$render();
          }
        }; // Run initDateWiget once


        scope.$watch({}, initDateWidget, true);
      }
    };
  }]) // answers field, (CNE and CWE) (search field?), inherited scope
  .directive('lfAnswers', function () {
    return {
      restrict: 'E',
      transclude: true,
      templateUrl: 'field-answers.html'
    };
  }) // units field, isolated scope?
  .directive('lfUnits', function () {
    return {
      restrict: 'E',
      scope: {
        item: '='
      },
      transclude: true,
      templateUrl: 'field-units.html'
    };
  }) // horizontal layout, inherited scope
  .directive('lfSectionHorizontal', function () {
    return {
      restrict: 'E',
      transclude: true,
      templateUrl: 'layout-horizontal.html'
    };
  }) // matrix layout, inherited scope
  .directive('lfSectionMatrix', function () {
    return {
      restrict: 'E',
      transclude: true,
      templateUrl: 'layout-matrix.html'
    };
  }).directive('lfRepeatingButton', function () {
    return {
      restrict: 'E',
      transclude: true,
      templateUrl: 'repeating-button.html'
    };
  }).directive('lfFormControls', function () {
    return {
      restrict: 'E',
      transclude: true,
      templateUrl: 'form-controls.html'
    };
  }).directive('lfFormTitle', function () {
    return {
      restrict: 'E',
      transclude: true,
      templateUrl: 'form-title.html'
    };
  }).directive('lfFormOptions', function () {
    return {
      restrict: 'E',
      transclude: true,
      templateUrl: 'form-options.html'
    };
  }).directive('lfItemOptions', function () {
    return {
      restrict: 'E',
      transclude: true,
      templateUrl: 'item-options.html'
    };
  }).directive('lfFormHeader', function () {
    return {
      restrict: 'E',
      transclude: true,
      templateUrl: 'form-header.html'
    };
  }).directive('lfValidate', function () {
    return {
      require: 'ngModel',
      restrict: 'A',
      scope: {
        itemData: '=lfValidate'
      },
      //transclude: true,
      template: '<div ng-repeat="error in itemData._validationErrors">' + '<div class="validation-error">"{{itemData.question}}" {{error}}</div>' + '</div>',
      link: function link(scope, elem, attr, ctrl) {
        /**
         * Validate model data on an item
         * @param item an item in the form
         * @param value the user input data
         * @param ctrl the directive control
         */
        function validate(item, value, ctrl) {
          item._validationErrors = [];
          var valid1 = LForms.Validations.checkDataType(item.dataType, value, item._validationErrors);
          ctrl.$setValidity('lf-datatype', valid1);
          var valid2 = LForms.Validations.checkRestrictions(item.restrictions, value, item._validationErrors);
          ctrl.$setValidity('lf-restrictions', valid2);
          var valid3 = LForms.Validations.checkRequired(item._answerRequired, value, item._validationErrors);
          ctrl.$setValidity('lf-required', valid3);

          for (var i = 0, len = item._validationErrors.length; i < len; ++i) {
            scope.$parent.sendMsgToScreenReader('"' + item.question + '"' + item._validationErrors[i]);
          }

          return valid1 && valid2 && valid3;
        }

        ; //For DOM -> model validation

        ctrl.$parsers.unshift(function (value) {
          if (value !== undefined) {
            scope.itemData._validationErrors = [];
            var valid = validate(scope.itemData, value, ctrl);
            return valid ? value : undefined;
          }
        }); //For model -> DOM validation
        // In the current use, lf-validate is applied to a separate non-input element, the validation always
        // happens when the model data changes, i.e. in this function.

        ctrl.$formatters.unshift(function (value) {
          if (value !== undefined) {
            scope.itemData._validationErrors = [];
            validate(scope.itemData, value, ctrl);
            return value;
          }
        });
      }
    };
  });
})();

/***/ }),
/* 24 */
/***/ (function(module, exports) {

// Based on https://stackoverflow.com/a/26339919/360782
angular.module('lformsWidget').config(['$provide', function Decorate($provide) {
  var directiveToTemplate = {
    'uibPopoverPopupDirective': "uib-popover-templates/uib-popover.html",
    'uibPopoverTemplatePopupDirective': "uib-popover-templates/uib-popover-template.html"
  };
  var names = Object.keys(directiveToTemplate);

  for (var len = names.length, i = 0; i < len; ++i) {
    var directiveName = names[i];
    var template = directiveToTemplate[directiveName];
    $provide.decorator(directiveName, ['$delegate', function (templatePath) {
      return function ($delegate) {
        var directive = $delegate[0];
        directive.templateUrl = templatePath; //  For future reference...
        // directive.compile = function() {
        //  return function link() {
        //    // can probably access popover element here
        //  }
        //}

        return $delegate;
      };
    }(template)]);
  }
}]);

/***/ }),
/* 25 */
/***/ (function(module, exports) {

/**
 * @version: 1.0 Alpha-1
 * @author: Coolite Inc. http://www.coolite.com/
 * @date: 2008-05-13
 * @copyright: Copyright (c) 2006-2008, Coolite Inc. (http://www.coolite.com/). All rights reserved.
 * @license: Licensed under The MIT License. See license.txt and http://www.datejs.com/license/. 
 * @website: http://www.datejs.com/
 */
Date.CultureInfo = {
  name: "en-US",
  englishName: "English (United States)",
  nativeName: "English (United States)",
  dayNames: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
  abbreviatedDayNames: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
  shortestDayNames: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"],
  firstLetterDayNames: ["S", "M", "T", "W", "T", "F", "S"],
  monthNames: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
  abbreviatedMonthNames: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
  amDesignator: "AM",
  pmDesignator: "PM",
  firstDayOfWeek: 0,
  twoDigitYearMax: 2029,
  dateElementOrder: "mdy",
  formatPatterns: {
    shortDate: "M/d/yyyy",
    longDate: "dddd, MMMM dd, yyyy",
    shortTime: "h:mm tt",
    longTime: "h:mm:ss tt",
    fullDateTime: "dddd, MMMM dd, yyyy h:mm:ss tt",
    sortableDateTime: "yyyy-MM-ddTHH:mm:ss",
    universalSortableDateTime: "yyyy-MM-dd HH:mm:ssZ",
    rfc1123: "ddd, dd MMM yyyy HH:mm:ss GMT",
    monthDay: "MMMM dd",
    yearMonth: "MMMM, yyyy"
  },
  regexPatterns: {
    jan: /^jan(uary)?/i,
    feb: /^feb(ruary)?/i,
    mar: /^mar(ch)?/i,
    apr: /^apr(il)?/i,
    may: /^may/i,
    jun: /^jun(e)?/i,
    jul: /^jul(y)?/i,
    aug: /^aug(ust)?/i,
    sep: /^sep(t(ember)?)?/i,
    oct: /^oct(ober)?/i,
    nov: /^nov(ember)?/i,
    dec: /^dec(ember)?/i,
    sun: /^su(n(day)?)?/i,
    mon: /^mo(n(day)?)?/i,
    tue: /^tu(e(s(day)?)?)?/i,
    wed: /^we(d(nesday)?)?/i,
    thu: /^th(u(r(s(day)?)?)?)?/i,
    fri: /^fr(i(day)?)?/i,
    sat: /^sa(t(urday)?)?/i,
    future: /^next/i,
    past: /^last|past|prev(ious)?/i,
    add: /^(\+|aft(er)?|from|hence)/i,
    subtract: /^(\-|bef(ore)?|ago)/i,
    yesterday: /^yes(terday)?/i,
    today: /^t(od(ay)?)?/i,
    tomorrow: /^tom(orrow)?/i,
    now: /^n(ow)?/i,
    millisecond: /^ms|milli(second)?s?/i,
    second: /^sec(ond)?s?/i,
    minute: /^mn|min(ute)?s?/i,
    hour: /^h(our)?s?/i,
    week: /^w(eek)?s?/i,
    month: /^m(onth)?s?/i,
    day: /^d(ay)?s?/i,
    year: /^y(ear)?s?/i,
    shortMeridian: /^(a|p)/i,
    longMeridian: /^(a\.?m?\.?|p\.?m?\.?)/i,
    timezone: /^((e(s|d)t|c(s|d)t|m(s|d)t|p(s|d)t)|((gmt)?\s*(\+|\-)\s*\d\d\d\d?)|gmt|utc)/i,
    ordinalSuffix: /^\s*(st|nd|rd|th)/i,
    timeContext: /^\s*(\:|a(?!u|p)|p)/i
  },
  timezones: [{
    name: "UTC",
    offset: "-000"
  }, {
    name: "GMT",
    offset: "-000"
  }, {
    name: "EST",
    offset: "-0500"
  }, {
    name: "EDT",
    offset: "-0400"
  }, {
    name: "CST",
    offset: "-0600"
  }, {
    name: "CDT",
    offset: "-0500"
  }, {
    name: "MST",
    offset: "-0700"
  }, {
    name: "MDT",
    offset: "-0600"
  }, {
    name: "PST",
    offset: "-0800"
  }, {
    name: "PDT",
    offset: "-0700"
  }]
};

(function () {
  var $D = Date,
      $P = $D.prototype,
      $C = $D.CultureInfo,
      p = function p(s, l) {
    if (!l) {
      l = 2;
    }

    return ("000" + s).slice(l * -1);
  };

  $P.clearTime = function () {
    this.setHours(0);
    this.setMinutes(0);
    this.setSeconds(0);
    this.setMilliseconds(0);
    return this;
  };

  $P.setTimeToNow = function () {
    var n = new Date();
    this.setHours(n.getHours());
    this.setMinutes(n.getMinutes());
    this.setSeconds(n.getSeconds());
    this.setMilliseconds(n.getMilliseconds());
    return this;
  };

  $D.today = function () {
    return new Date().clearTime();
  };

  $D.compare = function (date1, date2) {
    if (isNaN(date1) || isNaN(date2)) {
      throw new Error(date1 + " - " + date2);
    } else if (date1 instanceof Date && date2 instanceof Date) {
      return date1 < date2 ? -1 : date1 > date2 ? 1 : 0;
    } else {
      throw new TypeError(date1 + " - " + date2);
    }
  };

  $D.equals = function (date1, date2) {
    return date1.compareTo(date2) === 0;
  };

  $D.getDayNumberFromName = function (name) {
    var n = $C.dayNames,
        m = $C.abbreviatedDayNames,
        o = $C.shortestDayNames,
        s = name.toLowerCase();

    for (var i = 0; i < n.length; i++) {
      if (n[i].toLowerCase() == s || m[i].toLowerCase() == s || o[i].toLowerCase() == s) {
        return i;
      }
    }

    return -1;
  };

  $D.getMonthNumberFromName = function (name) {
    var n = $C.monthNames,
        m = $C.abbreviatedMonthNames,
        s = name.toLowerCase();

    for (var i = 0; i < n.length; i++) {
      if (n[i].toLowerCase() == s || m[i].toLowerCase() == s) {
        return i;
      }
    }

    return -1;
  };

  $D.isLeapYear = function (year) {
    return year % 4 === 0 && year % 100 !== 0 || year % 400 === 0;
  };

  $D.getDaysInMonth = function (year, month) {
    return [31, $D.isLeapYear(year) ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][month];
  };

  $D.getTimezoneAbbreviation = function (offset) {
    var z = $C.timezones,
        p;

    for (var i = 0; i < z.length; i++) {
      if (z[i].offset === offset) {
        return z[i].name;
      }
    }

    return null;
  };

  $D.getTimezoneOffset = function (name) {
    var z = $C.timezones,
        p;

    for (var i = 0; i < z.length; i++) {
      if (z[i].name === name.toUpperCase()) {
        return z[i].offset;
      }
    }

    return null;
  };

  $P.clone = function () {
    return new Date(this.getTime());
  };

  $P.compareTo = function (date) {
    return Date.compare(this, date);
  };

  $P.equals = function (date) {
    return Date.equals(this, date || new Date());
  };

  $P.between = function (start, end) {
    return this.getTime() >= start.getTime() && this.getTime() <= end.getTime();
  };

  $P.isAfter = function (date) {
    return this.compareTo(date || new Date()) === 1;
  };

  $P.isBefore = function (date) {
    return this.compareTo(date || new Date()) === -1;
  };

  $P.isToday = function () {
    return this.isSameDay(new Date());
  };

  $P.isSameDay = function (date) {
    return this.clone().clearTime().equals(date.clone().clearTime());
  };

  $P.addMilliseconds = function (value) {
    this.setMilliseconds(this.getMilliseconds() + value);
    return this;
  };

  $P.addSeconds = function (value) {
    return this.addMilliseconds(value * 1000);
  };

  $P.addMinutes = function (value) {
    return this.addMilliseconds(value * 60000);
  };

  $P.addHours = function (value) {
    return this.addMilliseconds(value * 3600000);
  };

  $P.addDays = function (value) {
    this.setDate(this.getDate() + value);
    return this;
  };

  $P.addWeeks = function (value) {
    return this.addDays(value * 7);
  };

  $P.addMonths = function (value) {
    var n = this.getDate();
    this.setDate(1);
    this.setMonth(this.getMonth() + value);
    this.setDate(Math.min(n, $D.getDaysInMonth(this.getFullYear(), this.getMonth())));
    return this;
  };

  $P.addYears = function (value) {
    return this.addMonths(value * 12);
  };

  $P.add = function (config) {
    if (typeof config == "number") {
      this._orient = config;
      return this;
    }

    var x = config;

    if (x.milliseconds) {
      this.addMilliseconds(x.milliseconds);
    }

    if (x.seconds) {
      this.addSeconds(x.seconds);
    }

    if (x.minutes) {
      this.addMinutes(x.minutes);
    }

    if (x.hours) {
      this.addHours(x.hours);
    }

    if (x.weeks) {
      this.addWeeks(x.weeks);
    }

    if (x.months) {
      this.addMonths(x.months);
    }

    if (x.years) {
      this.addYears(x.years);
    }

    if (x.days) {
      this.addDays(x.days);
    }

    return this;
  };

  var $y, $m, $d;

  $P.getWeek = function () {
    var a, b, c, d, e, f, g, n, s, w;
    $y = !$y ? this.getFullYear() : $y;
    $m = !$m ? this.getMonth() + 1 : $m;
    $d = !$d ? this.getDate() : $d;

    if ($m <= 2) {
      a = $y - 1;
      b = (a / 4 | 0) - (a / 100 | 0) + (a / 400 | 0);
      c = ((a - 1) / 4 | 0) - ((a - 1) / 100 | 0) + ((a - 1) / 400 | 0);
      s = b - c;
      e = 0;
      f = $d - 1 + 31 * ($m - 1);
    } else {
      a = $y;
      b = (a / 4 | 0) - (a / 100 | 0) + (a / 400 | 0);
      c = ((a - 1) / 4 | 0) - ((a - 1) / 100 | 0) + ((a - 1) / 400 | 0);
      s = b - c;
      e = s + 1;
      f = $d + (153 * ($m - 3) + 2) / 5 + 58 + s;
    }

    g = (a + b) % 7;
    d = (f + g - e) % 7;
    n = f + 3 - d | 0;

    if (n < 0) {
      w = 53 - ((g - s) / 5 | 0);
    } else if (n > 364 + s) {
      w = 1;
    } else {
      w = (n / 7 | 0) + 1;
    }

    $y = $m = $d = null;
    return w;
  };

  $P.getISOWeek = function () {
    $y = this.getUTCFullYear();
    $m = this.getUTCMonth() + 1;
    $d = this.getUTCDate();
    return p(this.getWeek());
  };

  $P.setWeek = function (n) {
    return this.moveToDayOfWeek(1).addWeeks(n - this.getWeek());
  };

  $D._validate = function (n, min, max, name) {
    if (typeof n == "undefined") {
      return false;
    } else if (typeof n != "number") {
      throw new TypeError(n + " is not a Number.");
    } else if (n < min || n > max) {
      throw new RangeError(n + " is not a valid value for " + name + ".");
    }

    return true;
  };

  $D.validateMillisecond = function (value) {
    return $D._validate(value, 0, 999, "millisecond");
  };

  $D.validateSecond = function (value) {
    return $D._validate(value, 0, 59, "second");
  };

  $D.validateMinute = function (value) {
    return $D._validate(value, 0, 59, "minute");
  };

  $D.validateHour = function (value) {
    return $D._validate(value, 0, 23, "hour");
  };

  $D.validateDay = function (value, year, month) {
    return $D._validate(value, 1, $D.getDaysInMonth(year, month), "day");
  };

  $D.validateMonth = function (value) {
    return $D._validate(value, 0, 11, "month");
  };

  $D.validateYear = function (value) {
    return $D._validate(value, 0, 9999, "year");
  };

  $P.set = function (config) {
    if ($D.validateMillisecond(config.millisecond)) {
      this.addMilliseconds(config.millisecond - this.getMilliseconds());
    }

    if ($D.validateSecond(config.second)) {
      this.addSeconds(config.second - this.getSeconds());
    }

    if ($D.validateMinute(config.minute)) {
      this.addMinutes(config.minute - this.getMinutes());
    }

    if ($D.validateHour(config.hour)) {
      this.addHours(config.hour - this.getHours());
    }

    if ($D.validateMonth(config.month)) {
      this.addMonths(config.month - this.getMonth());
    }

    if ($D.validateYear(config.year)) {
      this.addYears(config.year - this.getFullYear());
    }

    if ($D.validateDay(config.day, this.getFullYear(), this.getMonth())) {
      this.addDays(config.day - this.getDate());
    }

    if (config.timezone) {
      this.setTimezone(config.timezone);
    }

    if (config.timezoneOffset) {
      this.setTimezoneOffset(config.timezoneOffset);
    }

    if (config.week && $D._validate(config.week, 0, 53, "week")) {
      this.setWeek(config.week);
    }

    return this;
  };

  $P.moveToFirstDayOfMonth = function () {
    return this.set({
      day: 1
    });
  };

  $P.moveToLastDayOfMonth = function () {
    return this.set({
      day: $D.getDaysInMonth(this.getFullYear(), this.getMonth())
    });
  };

  $P.moveToNthOccurrence = function (dayOfWeek, occurrence) {
    var shift = 0;

    if (occurrence > 0) {
      shift = occurrence - 1;
    } else if (occurrence === -1) {
      this.moveToLastDayOfMonth();

      if (this.getDay() !== dayOfWeek) {
        this.moveToDayOfWeek(dayOfWeek, -1);
      }

      return this;
    }

    return this.moveToFirstDayOfMonth().addDays(-1).moveToDayOfWeek(dayOfWeek, +1).addWeeks(shift);
  };

  $P.moveToDayOfWeek = function (dayOfWeek, orient) {
    var diff = (dayOfWeek - this.getDay() + 7 * (orient || +1)) % 7;
    return this.addDays(diff === 0 ? diff += 7 * (orient || +1) : diff);
  };

  $P.moveToMonth = function (month, orient) {
    var diff = (month - this.getMonth() + 12 * (orient || +1)) % 12;
    return this.addMonths(diff === 0 ? diff += 12 * (orient || +1) : diff);
  };

  $P.getOrdinalNumber = function () {
    return Math.ceil((this.clone().clearTime() - new Date(this.getFullYear(), 0, 1)) / 86400000) + 1;
  };

  $P.getTimezone = function () {
    return $D.getTimezoneAbbreviation(this.getUTCOffset());
  };

  $P.setTimezoneOffset = function (offset) {
    var here = this.getTimezoneOffset(),
        there = Number(offset) * -6 / 10;
    return this.addMinutes(there - here);
  };

  $P.setTimezone = function (offset) {
    return this.setTimezoneOffset($D.getTimezoneOffset(offset));
  };

  $P.hasDaylightSavingTime = function () {
    return Date.today().set({
      month: 0,
      day: 1
    }).getTimezoneOffset() !== Date.today().set({
      month: 6,
      day: 1
    }).getTimezoneOffset();
  };

  $P.isDaylightSavingTime = function () {
    return this.hasDaylightSavingTime() && new Date().getTimezoneOffset() === Date.today().set({
      month: 6,
      day: 1
    }).getTimezoneOffset();
  };

  $P.getUTCOffset = function () {
    var n = this.getTimezoneOffset() * -10 / 6,
        r;

    if (n < 0) {
      r = (n - 10000).toString();
      return r.charAt(0) + r.substr(2);
    } else {
      r = (n + 10000).toString();
      return "+" + r.substr(1);
    }
  };

  $P.getElapsed = function (date) {
    return (date || new Date()) - this;
  };

  if (!$P.toISOString) {
    $P.toISOString = function () {
      function f(n) {
        return n < 10 ? '0' + n : n;
      }

      return '"' + this.getUTCFullYear() + '-' + f(this.getUTCMonth() + 1) + '-' + f(this.getUTCDate()) + 'T' + f(this.getUTCHours()) + ':' + f(this.getUTCMinutes()) + ':' + f(this.getUTCSeconds()) + 'Z"';
    };
  }

  $P._toString = $P.toString;

  $P.toString = function (format) {
    var x = this;

    if (format && format.length == 1) {
      var c = $C.formatPatterns;
      x.t = x.toString;

      switch (format) {
        case "d":
          return x.t(c.shortDate);

        case "D":
          return x.t(c.longDate);

        case "F":
          return x.t(c.fullDateTime);

        case "m":
          return x.t(c.monthDay);

        case "r":
          return x.t(c.rfc1123);

        case "s":
          return x.t(c.sortableDateTime);

        case "t":
          return x.t(c.shortTime);

        case "T":
          return x.t(c.longTime);

        case "u":
          return x.t(c.universalSortableDateTime);

        case "y":
          return x.t(c.yearMonth);
      }
    }

    var ord = function ord(n) {
      switch (n * 1) {
        case 1:
        case 21:
        case 31:
          return "st";

        case 2:
        case 22:
          return "nd";

        case 3:
        case 23:
          return "rd";

        default:
          return "th";
      }
    };

    return format ? format.replace(/(\\)?(dd?d?d?|MM?M?M?|yy?y?y?|hh?|HH?|mm?|ss?|tt?|S)/g, function (m) {
      if (m.charAt(0) === "\\") {
        return m.replace("\\", "");
      }

      x.h = x.getHours;

      switch (m) {
        case "hh":
          return p(x.h() < 13 ? x.h() === 0 ? 12 : x.h() : x.h() - 12);

        case "h":
          return x.h() < 13 ? x.h() === 0 ? 12 : x.h() : x.h() - 12;

        case "HH":
          return p(x.h());

        case "H":
          return x.h();

        case "mm":
          return p(x.getMinutes());

        case "m":
          return x.getMinutes();

        case "ss":
          return p(x.getSeconds());

        case "s":
          return x.getSeconds();

        case "yyyy":
          return p(x.getFullYear(), 4);

        case "yy":
          return p(x.getFullYear());

        case "dddd":
          return $C.dayNames[x.getDay()];

        case "ddd":
          return $C.abbreviatedDayNames[x.getDay()];

        case "dd":
          return p(x.getDate());

        case "d":
          return x.getDate();

        case "MMMM":
          return $C.monthNames[x.getMonth()];

        case "MMM":
          return $C.abbreviatedMonthNames[x.getMonth()];

        case "MM":
          return p(x.getMonth() + 1);

        case "M":
          return x.getMonth() + 1;

        case "t":
          return x.h() < 12 ? $C.amDesignator.substring(0, 1) : $C.pmDesignator.substring(0, 1);

        case "tt":
          return x.h() < 12 ? $C.amDesignator : $C.pmDesignator;

        case "S":
          return ord(x.getDate());

        default:
          return m;
      }
    }) : this._toString();
  };
})();

(function () {
  var $D = Date,
      $P = $D.prototype,
      $C = $D.CultureInfo,
      $N = Number.prototype;
  $P._orient = +1;
  $P._nth = null;
  $P._is = false;
  $P._same = false;
  $P._isSecond = false;
  $N._dateElement = "day";

  $P.next = function () {
    this._orient = +1;
    return this;
  };

  $D.next = function () {
    return $D.today().next();
  };

  $P.last = $P.prev = $P.previous = function () {
    this._orient = -1;
    return this;
  };

  $D.last = $D.prev = $D.previous = function () {
    return $D.today().last();
  };

  $P.is = function () {
    this._is = true;
    return this;
  };

  $P.same = function () {
    this._same = true;
    this._isSecond = false;
    return this;
  };

  $P.today = function () {
    return this.same().day();
  };

  $P.weekday = function () {
    if (this._is) {
      this._is = false;
      return !this.is().sat() && !this.is().sun();
    }

    return false;
  };

  $P.at = function (time) {
    return typeof time === "string" ? $D.parse(this.toString("d") + " " + time) : this.set(time);
  };

  $N.fromNow = $N.after = function (date) {
    var c = {};
    c[this._dateElement] = this;
    return (!date ? new Date() : date.clone()).add(c);
  };

  $N.ago = $N.before = function (date) {
    var c = {};
    c[this._dateElement] = this * -1;
    return (!date ? new Date() : date.clone()).add(c);
  };

  var dx = "sunday monday tuesday wednesday thursday friday saturday".split(/\s/),
      mx = "january february march april may june july august september october november december".split(/\s/),
      px = "Millisecond Second Minute Hour Day Week Month Year".split(/\s/),
      pxf = "Milliseconds Seconds Minutes Hours Date Week Month FullYear".split(/\s/),
      nth = "final first second third fourth fifth".split(/\s/),
      de;

  $P.toObject = function () {
    var o = {};

    for (var i = 0; i < px.length; i++) {
      o[px[i].toLowerCase()] = this["get" + pxf[i]]();
    }

    return o;
  };

  $D.fromObject = function (config) {
    config.week = null;
    return Date.today().set(config);
  };

  var df = function df(n) {
    return function () {
      if (this._is) {
        this._is = false;
        return this.getDay() == n;
      }

      if (this._nth !== null) {
        if (this._isSecond) {
          this.addSeconds(this._orient * -1);
        }

        this._isSecond = false;
        var ntemp = this._nth;
        this._nth = null;
        var temp = this.clone().moveToLastDayOfMonth();
        this.moveToNthOccurrence(n, ntemp);

        if (this > temp) {
          throw new RangeError($D.getDayName(n) + " does not occur " + ntemp + " times in the month of " + $D.getMonthName(temp.getMonth()) + " " + temp.getFullYear() + ".");
        }

        return this;
      }

      return this.moveToDayOfWeek(n, this._orient);
    };
  };

  var sdf = function sdf(n) {
    return function () {
      var t = $D.today(),
          shift = n - t.getDay();

      if (n === 0 && $C.firstDayOfWeek === 1 && t.getDay() !== 0) {
        shift = shift + 7;
      }

      return t.addDays(shift);
    };
  };

  for (var i = 0; i < dx.length; i++) {
    $D[dx[i].toUpperCase()] = $D[dx[i].toUpperCase().substring(0, 3)] = i;
    $D[dx[i]] = $D[dx[i].substring(0, 3)] = sdf(i);
    $P[dx[i]] = $P[dx[i].substring(0, 3)] = df(i);
  }

  var mf = function mf(n) {
    return function () {
      if (this._is) {
        this._is = false;
        return this.getMonth() === n;
      }

      return this.moveToMonth(n, this._orient);
    };
  };

  var smf = function smf(n) {
    return function () {
      return $D.today().set({
        month: n,
        day: 1
      });
    };
  };

  for (var j = 0; j < mx.length; j++) {
    $D[mx[j].toUpperCase()] = $D[mx[j].toUpperCase().substring(0, 3)] = j;
    $D[mx[j]] = $D[mx[j].substring(0, 3)] = smf(j);
    $P[mx[j]] = $P[mx[j].substring(0, 3)] = mf(j);
  }

  var ef = function ef(j) {
    return function () {
      if (this._isSecond) {
        this._isSecond = false;
        return this;
      }

      if (this._same) {
        this._same = this._is = false;
        var o1 = this.toObject(),
            o2 = (arguments[0] || new Date()).toObject(),
            v = "",
            k = j.toLowerCase();

        for (var m = px.length - 1; m > -1; m--) {
          v = px[m].toLowerCase();

          if (o1[v] != o2[v]) {
            return false;
          }

          if (k == v) {
            break;
          }
        }

        return true;
      }

      if (j.substring(j.length - 1) != "s") {
        j += "s";
      }

      return this["add" + j](this._orient);
    };
  };

  var nf = function nf(n) {
    return function () {
      this._dateElement = n;
      return this;
    };
  };

  for (var k = 0; k < px.length; k++) {
    de = px[k].toLowerCase();
    $P[de] = $P[de + "s"] = ef(px[k]);
    $N[de] = $N[de + "s"] = nf(de);
  }

  $P._ss = ef("Second");

  var nthfn = function nthfn(n) {
    return function (dayOfWeek) {
      if (this._same) {
        return this._ss(arguments[0]);
      }

      if (dayOfWeek || dayOfWeek === 0) {
        return this.moveToNthOccurrence(dayOfWeek, n);
      }

      this._nth = n;

      if (n === 2 && (dayOfWeek === undefined || dayOfWeek === null)) {
        this._isSecond = true;
        return this.addSeconds(this._orient);
      }

      return this;
    };
  };

  for (var l = 0; l < nth.length; l++) {
    $P[nth[l]] = l === 0 ? nthfn(-1) : nthfn(l);
  }
})();

(function () {
  Date.Parsing = {
    Exception: function Exception(s) {
      this.message = "Parse error at '" + s.substring(0, 10) + " ...'";
    }
  };
  var $P = Date.Parsing;

  var _ = $P.Operators = {
    rtoken: function rtoken(r) {
      return function (s) {
        var mx = s.match(r);

        if (mx) {
          return [mx[0], s.substring(mx[0].length)];
        } else {
          throw new $P.Exception(s);
        }
      };
    },
    token: function token(s) {
      return function (s) {
        return _.rtoken(new RegExp("^\s*" + s + "\s*"))(s);
      };
    },
    stoken: function stoken(s) {
      return _.rtoken(new RegExp("^" + s));
    },
    until: function until(p) {
      return function (s) {
        var qx = [],
            rx = null;

        while (s.length) {
          try {
            rx = p.call(this, s);
          } catch (e) {
            qx.push(rx[0]);
            s = rx[1];
            continue;
          }

          break;
        }

        return [qx, s];
      };
    },
    many: function many(p) {
      return function (s) {
        var rx = [],
            r = null;

        while (s.length) {
          try {
            r = p.call(this, s);
          } catch (e) {
            return [rx, s];
          }

          rx.push(r[0]);
          s = r[1];
        }

        return [rx, s];
      };
    },
    optional: function optional(p) {
      return function (s) {
        var r = null;

        try {
          r = p.call(this, s);
        } catch (e) {
          return [null, s];
        }

        return [r[0], r[1]];
      };
    },
    not: function not(p) {
      return function (s) {
        try {
          p.call(this, s);
        } catch (e) {
          return [null, s];
        }

        throw new $P.Exception(s);
      };
    },
    ignore: function ignore(p) {
      return p ? function (s) {
        var r = null;
        r = p.call(this, s);
        return [null, r[1]];
      } : null;
    },
    product: function product() {
      var px = arguments[0],
          qx = Array.prototype.slice.call(arguments, 1),
          rx = [];

      for (var i = 0; i < px.length; i++) {
        rx.push(_.each(px[i], qx));
      }

      return rx;
    },
    cache: function cache(rule) {
      var cache = {},
          r = null;
      return function (s) {
        try {
          r = cache[s] = cache[s] || rule.call(this, s);
        } catch (e) {
          r = cache[s] = e;
        }

        if (r instanceof $P.Exception) {
          throw r;
        } else {
          return r;
        }
      };
    },
    any: function any() {
      var px = arguments;
      return function (s) {
        var r = null;

        for (var i = 0; i < px.length; i++) {
          if (px[i] == null) {
            continue;
          }

          try {
            r = px[i].call(this, s);
          } catch (e) {
            r = null;
          }

          if (r) {
            return r;
          }
        }

        throw new $P.Exception(s);
      };
    },
    each: function each() {
      var px = arguments;
      return function (s) {
        var rx = [],
            r = null;

        for (var i = 0; i < px.length; i++) {
          if (px[i] == null) {
            continue;
          }

          try {
            r = px[i].call(this, s);
          } catch (e) {
            throw new $P.Exception(s);
          }

          rx.push(r[0]);
          s = r[1];
        }

        return [rx, s];
      };
    },
    all: function all() {
      var px = arguments,
          _ = _;
      return _.each(_.optional(px));
    },
    sequence: function sequence(px, d, c) {
      d = d || _.rtoken(/^\s*/);
      c = c || null;

      if (px.length == 1) {
        return px[0];
      }

      return function (s) {
        var r = null,
            q = null;
        var rx = [];

        for (var i = 0; i < px.length; i++) {
          try {
            r = px[i].call(this, s);
          } catch (e) {
            break;
          }

          rx.push(r[0]);

          try {
            q = d.call(this, r[1]);
          } catch (ex) {
            q = null;
            break;
          }

          s = q[1];
        }

        if (!r) {
          throw new $P.Exception(s);
        }

        if (q) {
          throw new $P.Exception(q[1]);
        }

        if (c) {
          try {
            r = c.call(this, r[1]);
          } catch (ey) {
            throw new $P.Exception(r[1]);
          }
        }

        return [rx, r ? r[1] : s];
      };
    },
    between: function between(d1, p, d2) {
      d2 = d2 || d1;

      var _fn = _.each(_.ignore(d1), p, _.ignore(d2));

      return function (s) {
        var rx = _fn.call(this, s);

        return [[rx[0][0], r[0][2]], rx[1]];
      };
    },
    list: function list(p, d, c) {
      d = d || _.rtoken(/^\s*/);
      c = c || null;
      return p instanceof Array ? _.each(_.product(p.slice(0, -1), _.ignore(d)), p.slice(-1), _.ignore(c)) : _.each(_.many(_.each(p, _.ignore(d))), px, _.ignore(c));
    },
    set: function set(px, d, c) {
      d = d || _.rtoken(/^\s*/);
      c = c || null;
      return function (s) {
        var r = null,
            p = null,
            q = null,
            rx = null,
            best = [[], s],
            last = false;

        for (var i = 0; i < px.length; i++) {
          q = null;
          p = null;
          r = null;
          last = px.length == 1;

          try {
            r = px[i].call(this, s);
          } catch (e) {
            continue;
          }

          rx = [[r[0]], r[1]];

          if (r[1].length > 0 && !last) {
            try {
              q = d.call(this, r[1]);
            } catch (ex) {
              last = true;
            }
          } else {
            last = true;
          }

          if (!last && q[1].length === 0) {
            last = true;
          }

          if (!last) {
            var qx = [];

            for (var j = 0; j < px.length; j++) {
              if (i != j) {
                qx.push(px[j]);
              }
            }

            p = _.set(qx, d).call(this, q[1]);

            if (p[0].length > 0) {
              rx[0] = rx[0].concat(p[0]);
              rx[1] = p[1];
            }
          }

          if (rx[1].length < best[1].length) {
            best = rx;
          }

          if (best[1].length === 0) {
            break;
          }
        }

        if (best[0].length === 0) {
          return best;
        }

        if (c) {
          try {
            q = c.call(this, best[1]);
          } catch (ey) {
            throw new $P.Exception(best[1]);
          }

          best[1] = q[1];
        }

        return best;
      };
    },
    forward: function forward(gr, fname) {
      return function (s) {
        return gr[fname].call(this, s);
      };
    },
    replace: function replace(rule, repl) {
      return function (s) {
        var r = rule.call(this, s);
        return [repl, r[1]];
      };
    },
    process: function process(rule, fn) {
      return function (s) {
        var r = rule.call(this, s);
        return [fn.call(this, r[0]), r[1]];
      };
    },
    min: function min(_min, rule) {
      return function (s) {
        var rx = rule.call(this, s);

        if (rx[0].length < _min) {
          throw new $P.Exception(s);
        }

        return rx;
      };
    }
  };

  var _generator = function _generator(op) {
    return function () {
      var args = null,
          rx = [];

      if (arguments.length > 1) {
        args = Array.prototype.slice.call(arguments);
      } else if (arguments[0] instanceof Array) {
        args = arguments[0];
      }

      if (args) {
        for (var i = 0, px = args.shift(); i < px.length; i++) {
          args.unshift(px[i]);
          rx.push(op.apply(null, args));
          args.shift();
          return rx;
        }
      } else {
        return op.apply(null, arguments);
      }
    };
  };

  var gx = "optional not ignore cache".split(/\s/);

  for (var i = 0; i < gx.length; i++) {
    _[gx[i]] = _generator(_[gx[i]]);
  }

  var _vector = function _vector(op) {
    return function () {
      if (arguments[0] instanceof Array) {
        return op.apply(null, arguments[0]);
      } else {
        return op.apply(null, arguments);
      }
    };
  };

  var vx = "each any all".split(/\s/);

  for (var j = 0; j < vx.length; j++) {
    _[vx[j]] = _vector(_[vx[j]]);
  }
})();

(function () {
  var $D = Date,
      $P = $D.prototype,
      $C = $D.CultureInfo;

  var flattenAndCompact = function flattenAndCompact(ax) {
    var rx = [];

    for (var i = 0; i < ax.length; i++) {
      if (ax[i] instanceof Array) {
        rx = rx.concat(flattenAndCompact(ax[i]));
      } else {
        if (ax[i]) {
          rx.push(ax[i]);
        }
      }
    }

    return rx;
  };

  $D.Grammar = {};
  $D.Translator = {
    hour: function hour(s) {
      return function () {
        this.hour = Number(s);
      };
    },
    minute: function minute(s) {
      return function () {
        this.minute = Number(s);
      };
    },
    second: function second(s) {
      return function () {
        this.second = Number(s);
      };
    },
    meridian: function meridian(s) {
      return function () {
        this.meridian = s.slice(0, 1).toLowerCase();
      };
    },
    timezone: function timezone(s) {
      return function () {
        var n = s.replace(/[^\d\+\-]/g, "");

        if (n.length) {
          this.timezoneOffset = Number(n);
        } else {
          this.timezone = s.toLowerCase();
        }
      };
    },
    day: function day(x) {
      var s = x[0];
      return function () {
        this.day = Number(s.match(/\d+/)[0]);
      };
    },
    month: function month(s) {
      return function () {
        this.month = s.length == 3 ? "jan feb mar apr may jun jul aug sep oct nov dec".indexOf(s) / 4 : Number(s) - 1;
      };
    },
    year: function year(s) {
      return function () {
        var n = Number(s);
        this.year = s.length > 2 ? n : n + (n + 2000 < $C.twoDigitYearMax ? 2000 : 1900);
      };
    },
    rday: function rday(s) {
      return function () {
        switch (s) {
          case "yesterday":
            this.days = -1;
            break;

          case "tomorrow":
            this.days = 1;
            break;

          case "today":
            this.days = 0;
            break;

          case "now":
            this.days = 0;
            this.now = true;
            break;
        }
      };
    },
    finishExact: function finishExact(x) {
      x = x instanceof Array ? x : [x];

      for (var i = 0; i < x.length; i++) {
        if (x[i]) {
          x[i].call(this);
        }
      }

      var now = new Date();

      if ((this.hour || this.minute) && !this.month && !this.year && !this.day) {
        this.day = now.getDate();
      }

      if (!this.year) {
        this.year = now.getFullYear();
      }

      if (!this.month && this.month !== 0) {
        this.month = now.getMonth();
      }

      if (!this.day) {
        this.day = 1;
      }

      if (!this.hour) {
        this.hour = 0;
      }

      if (!this.minute) {
        this.minute = 0;
      }

      if (!this.second) {
        this.second = 0;
      }

      if (this.meridian && this.hour) {
        if (this.meridian == "p" && this.hour < 12) {
          this.hour = this.hour + 12;
        } else if (this.meridian == "a" && this.hour == 12) {
          this.hour = 0;
        }
      }

      if (this.day > $D.getDaysInMonth(this.year, this.month)) {
        throw new RangeError(this.day + " is not a valid value for days.");
      }

      var r = new Date(this.year, this.month, this.day, this.hour, this.minute, this.second);

      if (this.timezone) {
        r.set({
          timezone: this.timezone
        });
      } else if (this.timezoneOffset) {
        r.set({
          timezoneOffset: this.timezoneOffset
        });
      }

      return r;
    },
    finish: function finish(x) {
      x = x instanceof Array ? flattenAndCompact(x) : [x];

      if (x.length === 0) {
        return null;
      }

      for (var i = 0; i < x.length; i++) {
        if (typeof x[i] == "function") {
          x[i].call(this);
        }
      }

      var today = $D.today();

      if (this.now && !this.unit && !this.operator) {
        return new Date();
      } else if (this.now) {
        today = new Date();
      }

      var expression = !!(this.days && this.days !== null || this.orient || this.operator);
      var gap, mod, orient;
      orient = this.orient == "past" || this.operator == "subtract" ? -1 : 1;

      if (!this.now && "hour minute second".indexOf(this.unit) != -1) {
        today.setTimeToNow();
      }

      if (this.month || this.month === 0) {
        if ("year day hour minute second".indexOf(this.unit) != -1) {
          this.value = this.month + 1;
          this.month = null;
          expression = true;
        }
      }

      if (!expression && this.weekday && !this.day && !this.days) {
        var temp = Date[this.weekday]();
        this.day = temp.getDate();

        if (!this.month) {
          this.month = temp.getMonth();
        }

        this.year = temp.getFullYear();
      }

      if (expression && this.weekday && this.unit != "month") {
        this.unit = "day";
        gap = $D.getDayNumberFromName(this.weekday) - today.getDay();
        mod = 7;
        this.days = gap ? (gap + orient * mod) % mod : orient * mod;
      }

      if (this.month && this.unit == "day" && this.operator) {
        this.value = this.month + 1;
        this.month = null;
      }

      if (this.value != null && this.month != null && this.year != null) {
        this.day = this.value * 1;
      }

      if (this.month && !this.day && this.value) {
        today.set({
          day: this.value * 1
        });

        if (!expression) {
          this.day = this.value * 1;
        }
      }

      if (!this.month && this.value && this.unit == "month" && !this.now) {
        this.month = this.value;
        expression = true;
      }

      if (expression && (this.month || this.month === 0) && this.unit != "year") {
        this.unit = "month";
        gap = this.month - today.getMonth();
        mod = 12;
        this.months = gap ? (gap + orient * mod) % mod : orient * mod;
        this.month = null;
      }

      if (!this.unit) {
        this.unit = "day";
      }

      if (!this.value && this.operator && this.operator !== null && this[this.unit + "s"] && this[this.unit + "s"] !== null) {
        this[this.unit + "s"] = this[this.unit + "s"] + (this.operator == "add" ? 1 : -1) + (this.value || 0) * orient;
      } else if (this[this.unit + "s"] == null || this.operator != null) {
        if (!this.value) {
          this.value = 1;
        }

        this[this.unit + "s"] = this.value * orient;
      }

      if (this.meridian && this.hour) {
        if (this.meridian == "p" && this.hour < 12) {
          this.hour = this.hour + 12;
        } else if (this.meridian == "a" && this.hour == 12) {
          this.hour = 0;
        }
      }

      if (this.weekday && !this.day && !this.days) {
        var temp = Date[this.weekday]();
        this.day = temp.getDate();

        if (temp.getMonth() !== today.getMonth()) {
          this.month = temp.getMonth();
        }
      }

      if ((this.month || this.month === 0) && !this.day) {
        this.day = 1;
      }

      if (!this.orient && !this.operator && this.unit == "week" && this.value && !this.day && !this.month) {
        return Date.today().setWeek(this.value);
      }

      if (expression && this.timezone && this.day && this.days) {
        this.day = this.days;
      }

      return expression ? today.add(this) : today.set(this);
    }
  };

  var _ = $D.Parsing.Operators,
      g = $D.Grammar,
      t = $D.Translator,
      _fn;

  g.datePartDelimiter = _.rtoken(/^([\s\-\.\,\/\x27]+)/);
  g.timePartDelimiter = _.stoken(":");
  g.whiteSpace = _.rtoken(/^\s*/);
  g.generalDelimiter = _.rtoken(/^(([\s\,]|at|@|on)+)/);
  var _C = {};

  g.ctoken = function (keys) {
    var fn = _C[keys];

    if (!fn) {
      var c = $C.regexPatterns;
      var kx = keys.split(/\s+/),
          px = [];

      for (var i = 0; i < kx.length; i++) {
        px.push(_.replace(_.rtoken(c[kx[i]]), kx[i]));
      }

      fn = _C[keys] = _.any.apply(null, px);
    }

    return fn;
  };

  g.ctoken2 = function (key) {
    return _.rtoken($C.regexPatterns[key]);
  };

  g.h = _.cache(_.process(_.rtoken(/^(0[0-9]|1[0-2]|[1-9])/), t.hour));
  g.hh = _.cache(_.process(_.rtoken(/^(0[0-9]|1[0-2])/), t.hour));
  g.H = _.cache(_.process(_.rtoken(/^([0-1][0-9]|2[0-3]|[0-9])/), t.hour));
  g.HH = _.cache(_.process(_.rtoken(/^([0-1][0-9]|2[0-3])/), t.hour));
  g.m = _.cache(_.process(_.rtoken(/^([0-5][0-9]|[0-9])/), t.minute));
  g.mm = _.cache(_.process(_.rtoken(/^[0-5][0-9]/), t.minute));
  g.s = _.cache(_.process(_.rtoken(/^([0-5][0-9]|[0-9])/), t.second));
  g.ss = _.cache(_.process(_.rtoken(/^[0-5][0-9]/), t.second));
  g.hms = _.cache(_.sequence([g.H, g.m, g.s], g.timePartDelimiter));
  g.t = _.cache(_.process(g.ctoken2("shortMeridian"), t.meridian));
  g.tt = _.cache(_.process(g.ctoken2("longMeridian"), t.meridian));
  g.z = _.cache(_.process(_.rtoken(/^((\+|\-)\s*\d\d\d\d)|((\+|\-)\d\d\:?\d\d)/), t.timezone));
  g.zz = _.cache(_.process(_.rtoken(/^((\+|\-)\s*\d\d\d\d)|((\+|\-)\d\d\:?\d\d)/), t.timezone));
  g.zzz = _.cache(_.process(g.ctoken2("timezone"), t.timezone));
  g.timeSuffix = _.each(_.ignore(g.whiteSpace), _.set([g.tt, g.zzz]));
  g.time = _.each(_.optional(_.ignore(_.stoken("T"))), g.hms, g.timeSuffix);
  g.d = _.cache(_.process(_.each(_.rtoken(/^([0-2]\d|3[0-1]|\d)/), _.optional(g.ctoken2("ordinalSuffix"))), t.day));
  g.dd = _.cache(_.process(_.each(_.rtoken(/^([0-2]\d|3[0-1])/), _.optional(g.ctoken2("ordinalSuffix"))), t.day));
  g.ddd = g.dddd = _.cache(_.process(g.ctoken("sun mon tue wed thu fri sat"), function (s) {
    return function () {
      this.weekday = s;
    };
  }));
  g.M = _.cache(_.process(_.rtoken(/^(1[0-2]|0\d|\d)/), t.month));
  g.MM = _.cache(_.process(_.rtoken(/^(1[0-2]|0\d)/), t.month));
  g.MMM = g.MMMM = _.cache(_.process(g.ctoken("jan feb mar apr may jun jul aug sep oct nov dec"), t.month));
  g.y = _.cache(_.process(_.rtoken(/^(\d\d?)/), t.year));
  g.yy = _.cache(_.process(_.rtoken(/^(\d\d)/), t.year));
  g.yyy = _.cache(_.process(_.rtoken(/^(\d\d?\d?\d?)/), t.year));
  g.yyyy = _.cache(_.process(_.rtoken(/^(\d\d\d\d)/), t.year));

  _fn = function _fn() {
    return _.each(_.any.apply(null, arguments), _.not(g.ctoken2("timeContext")));
  };

  g.day = _fn(g.d, g.dd);
  g.month = _fn(g.M, g.MMM);
  g.year = _fn(g.yyyy, g.yy);
  g.orientation = _.process(g.ctoken("past future"), function (s) {
    return function () {
      this.orient = s;
    };
  });
  g.operator = _.process(g.ctoken("add subtract"), function (s) {
    return function () {
      this.operator = s;
    };
  });
  g.rday = _.process(g.ctoken("yesterday tomorrow today now"), t.rday);
  g.unit = _.process(g.ctoken("second minute hour day week month year"), function (s) {
    return function () {
      this.unit = s;
    };
  });
  g.value = _.process(_.rtoken(/^\d\d?\d?\d?(st|nd|rd|th)?/), function (s) {
    return function () {
      this.value = s.replace(/\D/g, "");
    };
  });
  g.expression = _.set([g.rday, g.operator, g.value, g.unit, g.orientation, g.ddd, g.MMM]);

  _fn = function _fn() {
    return _.set(arguments, g.datePartDelimiter);
  };

  g.mdy = _fn(g.ddd, g.month, g.day, g.year);
  g.ymd = _fn(g.ddd, g.year, g.month, g.day);
  g.dmy = _fn(g.ddd, g.day, g.month, g.year);

  g.date = function (s) {
    return (g[$C.dateElementOrder] || g.mdy).call(this, s);
  };

  g.format = _.process(_.many(_.any(_.process(_.rtoken(/^(dd?d?d?|MM?M?M?|yy?y?y?|hh?|HH?|mm?|ss?|tt?|zz?z?)/), function (fmt) {
    if (g[fmt]) {
      return g[fmt];
    } else {
      throw $D.Parsing.Exception(fmt);
    }
  }), _.process(_.rtoken(/^[^dMyhHmstz]+/), function (s) {
    return _.ignore(_.stoken(s));
  }))), function (rules) {
    return _.process(_.each.apply(null, rules), t.finishExact);
  });
  var _F = {};

  var _get = function _get(f) {
    return _F[f] = _F[f] || g.format(f)[0];
  };

  g.formats = function (fx) {
    if (fx instanceof Array) {
      var rx = [];

      for (var i = 0; i < fx.length; i++) {
        rx.push(_get(fx[i]));
      }

      return _.any.apply(null, rx);
    } else {
      return _get(fx);
    }
  };

  g._formats = g.formats(["\"yyyy-MM-ddTHH:mm:ssZ\"", "yyyy-MM-ddTHH:mm:ssZ", "yyyy-MM-ddTHH:mm:ssz", "yyyy-MM-ddTHH:mm:ss", "yyyy-MM-ddTHH:mmZ", "yyyy-MM-ddTHH:mmz", "yyyy-MM-ddTHH:mm", "ddd, MMM dd, yyyy H:mm:ss tt", "ddd MMM d yyyy HH:mm:ss zzz", "MMddyyyy", "ddMMyyyy", "Mddyyyy", "ddMyyyy", "Mdyyyy", "dMyyyy", "yyyy", "Mdyy", "dMyy", "d"]);
  g._start = _.process(_.set([g.date, g.time, g.expression], g.generalDelimiter, g.whiteSpace), t.finish);

  g.start = function (s) {
    try {
      var r = g._formats.call({}, s);

      if (r[1].length === 0) {
        return r;
      }
    } catch (e) {}

    return g._start.call({}, s);
  };

  $D._parse = $D.parse;

  $D.parse = function (s) {
    var r = null;

    if (!s) {
      return null;
    }

    if (s instanceof Date) {
      return s;
    }

    try {
      r = $D.Grammar.start.call({}, s.replace(/^\s*(\S*(\s+\S+)*)\s*$/, "$1"));
    } catch (e) {
      return null;
    }

    return r[1].length === 0 ? r[0] : null;
  };

  $D.getParseFunction = function (fx) {
    var fn = $D.Grammar.formats(fx);
    return function (s) {
      var r = null;

      try {
        r = fn.call({}, s);
      } catch (e) {
        return null;
      }

      return r[1].length === 0 ? r[0] : null;
    };
  };

  $D.parseExact = function (s, fx) {
    return $D.getParseFunction(fx)(s);
  };
})();

/***/ }),
/* 26 */
/***/ (function(module, exports) {

/**
 * On IE 9, the window.console is undefined unless dev tools are open. This can cause the program
 * crashing when making function calls like console.log etc. The following code is used to prevent
 * the crashing. For details, see the web link listed belw:
 * http://stackoverflow.com/questions/3326650/console-is-undefined-error-for-internet-explorer.
 **/
(function () {
  if (!window.console) {
    window.console = {}; // union of Chrome, FF, IE, and Safari console methods

    var m = ["log", "info", "warn", "error", "debug", "trace", "dir", "group", "groupCollapsed", "groupEnd", "time", "timeEnd", "profile", "profileEnd", "dirxml", "assert", "count", "markTimeline", "timeStamp", "clear"]; // define undefined methods as noops to prevent errors

    for (var i = 0; i < m.length; i++) {
      if (!window.console[m[i]]) window.console[m[i]] = function () {};
    }
  }
})();

/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

/**
 * LForms Utility tools
 */
var LForms = __webpack_require__(2);

LForms.Util = {
  /**
   *  Adds an LForms form to the page.
   * @param formDataDef A form definiton (either JSON or a parsed object).  Also,
   *  for backward compatibility, this can be the name of a global-scope variable
   *  (on "window") containing that form definition object.
   * @param formContainer The ID of a DOM element to contain the form, or the
   *  element itself.  The contents of this element will be replaced by the form.
   *  This element should be outside the scope of any existing AngularJS app on
   *  the page.
   */
  addFormToPage: function addFormToPage(formDataDef, formContainer) {
    var formContainer = typeof formContainer === 'string' ? $('#' + formContainer) : $(formContainer);

    if (typeof formDataDef === 'string') {
      if (formDataDef.indexOf('{') >= 0) // test for JSON
        formDataDef = JSON.parse(formDataDef);else // backward compatibility
        formDataDef = window[formDataDef];
    }

    if (!this.pageFormID_) this.pageFormID_ = 0;
    var appName = 'LFormsApp' + ++this.pageFormID_;
    var controller = 'LFormsAppController' + this.pageFormID_;
    if (!LForms.addedFormDefs) LForms.addedFormDefs = [];
    var formIndex = LForms.addedFormDefs.length;
    LForms.addedFormDefs.push(formDataDef);
    formContainer.html('<div ng-controller="' + controller + '">' + '<lforms lf-data="myFormData"></lforms>' + '</div>' + '<script>' + 'angular.module("' + appName + '", ["lformsWidget"])' + '.controller("' + controller + '", ["$scope", function ($scope) {' + '  $scope.myFormData = new LForms.LFormsData(LForms.addedFormDefs[' + formIndex + ']);' + '}]);' + '</' + 'script>'); // Bootstrap the element if needed
    // Following http://stackoverflow.com/a/34501500/360782

    var isInitialized = formContainer.injector && formContainer.injector();
    if (!isInitialized) angular.bootstrap(formContainer.children(':first'), [appName]);
  },

  /**
   * Get user input data from the form, with or without form definition data.
   * @param element the containing HTML element that includes the LForm's rendered form.
   * @param noFormDefData optional, to include form definition data, the default is false.
   * @param noEmptyValue optional, to remove items that have an empty value, the default is false.
   * @param noHiddenItem optional, to remove items that are hidden by skip logic, the default is false.
   * @returns {{itemsData: (*|Array), templateData: (*|Array)}} form data and template data
   */
  getUserData: function getUserData(element, noFormDefData, noEmptyValue, noHiddenItem) {
    var formObj = this._getFormObjectInScope(element);

    return formObj ? formObj.getUserData(noFormDefData, noEmptyValue, noHiddenItem) : null;
  },

  /**
   * Get the complete form definition data, including the user input data from the form.
   * The returned data could be fed into a LForms widget directly to render the form.
   * @param element optional, the containing HTML element that includes the LForm's rendered form.
   *        It could either be the DOM element or its id.
   * @param noEmptyValue optional, to remove items that have an empty value, the default is false.
   * @param noHiddenItem optional, to remove items that are hidden by skip logic, the default is false.
   * @returns {{}} Form definition data
   */
  getFormData: function getFormData(element, noEmptyValue, noHiddenItem) {
    var formObj = this._getFormObjectInScope(element);

    return formObj ? formObj.getFormData(noEmptyValue, noHiddenItem) : null;
  },

  /**
   * Get HL7 v2 OBR and OBX segment data from the form.
   * Empty or hidden questions are not included.
   * @param element optional, the containing HTML element that includes the LForm's rendered form.
   *        It could either be the DOM element or its id
   * @returns {*} a string that contains HL7 v2 OBR and OBX segments
   */
  getFormHL7Data: function getFormHL7Data(element) {
    var formObj = this._getFormObjectInScope(element);

    return formObj ? LForms.HL7.toHL7Segments(formObj) : null;
  },

  /**
   *  Get FHIR data from the form.
   * @param resourceType a FHIR resource type. it currently supports "DiagnosticReport",
   *  "Questionnaire" (both standard Questionnaire and SDC Questionnaire profile)
   *  and "QuestionnaireResponse" (SDC profile)
   * @param fhirVersion the version of FHIR being used (e.g., 'STU3')
   * @param formDataSource Optional.  Either the containing HTML element that
   *  includes the LForm's rendered form, a CSS selector for that element, an
   *  LFormsData object, or an LForms form definition (parsed).  If not
   *  provided, the first form found in the page will be used.
   * @param options A hash of other options.  See convertLFormsToFHIRData for
   *  the allowed values.
   * @returns {*} the requested FHIR resource.  For Questionnaire, the full form definition
   *  will be returned, but or DiagnosticReport and QuestionnaireResponse, empty
   *  or hidden questions will not be included.
   */
  getFormFHIRData: function getFormFHIRData(resourceType, fhirVersion, formDataSource, options) {
    if (!formDataSource || formDataSource instanceof HTMLElement || typeof formDataSource === 'string') formDataSource = this._getFormObjectInScope(formDataSource);
    return this._convertLFormsToFHIRData(resourceType, fhirVersion, formDataSource, options);
  },

  /**
   * Convert LForms data into a FHIR resource
   * @param resourceType a FHIR resource type. it currently supports "DiagnosticReport",
   * "Questionnaire" (both standard Questionnaire and SDC Questionnaire profile)
   * @param fhirVersion the version of FHIR to be used (e.g., 'STU3')
   * @param formData an LFormsData object or an LForms form definition (parsed).
   * @param options A hash of other options, with the following optional keys:
   *  * bundleType: optional, maybe be either "transaction" or "collection".
   *    This is used when resourceType is set to "DiagnosticReport", and requests
   *    that the DiagnosticReport and associated Observation resources be placed
   *    together in a bundle.  When this is not present, a bundle will not be
   *    used.
   *  * noExtensions: a flag that a standard FHIR Questionnaire or QuestionnaireResponse is to be created
   *    without any extensions, when resourceType is Questionnaire or QuestionnaireResponse.
   *    The default is false.
   *  * subject: A local FHIR resource that is the subject of the output resource.
   *    If provided, a reference to this resource will be added to the output FHIR
   *    resource when applicable.
   * @returns {*} a FHIR resource
   */
  _convertLFormsToFHIRData: function _convertLFormsToFHIRData(resourceType, fhirVersion, formData, options) {
    if (!(formData instanceof LForms.LFormsData)) formData = new LForms.LFormsData(formData);
    var version = this.validateFHIRVersion(fhirVersion);
    var fhir = LForms.FHIR[version];
    var fhirData = null;

    if (formData) {
      var noExtensions = options ? options.noExtensions : undefined;
      var subject = options ? options.subject : undefined;

      switch (resourceType) {
        case "DiagnosticReport":
          var bundleType = options ? options.bundleType : undefined;
          var inBundle = bundleType != undefined;
          fhirData = fhir.DiagnosticReport.createDiagnosticReport(formData, subject, inBundle, bundleType);
          break;

        case "Questionnaire":
          fhirData = fhir.SDC.convertLFormsToQuestionnaire(formData, noExtensions);
          break;

        case "QuestionnaireResponse":
          fhirData = fhir.SDC.convertLFormsToQuestionnaireResponse(formData, noExtensions, subject);
          break;
      }
    }

    return fhirData;
  },

  /**
   * Convert FHIR SQC Questionnaire to the LForms internal definition
   *
   * @param fhirData - a FHIR Questionnaire resource, which should be generated through
   * the function "getFormFHIRData('Questionnaire', ...)"
   * @param fhirVersion - the version of FHIR in which the Questionnaire is
   *  written.  This maybe be omitted if the Questionnaire resource (in
   *  fhirData) contains a meta.profile attibute specifying the FHIR version.
   *  (See http://build.fhir.org/versioning.html#mp-version)
   *  If both are provided, this takes precedence.
   * @returns {*} - an LForms json object
   */
  convertFHIRQuestionnaireToLForms: function convertFHIRQuestionnaireToLForms(fhirData, fhirVersion) {
    var rtn = null;

    if (fhirData) {
      fhirVersion = this._requireValidFHIRVersion(fhirVersion, fhirData);
      var fhir = LForms.FHIR[fhirVersion];
      rtn = fhir.SDC.convertQuestionnaireToLForms(fhirData);
    }

    return rtn;
  },

  /**
   * Merge a FHIR resource into an LForms form object
   * @param resourceType a FHIR resource type. it currently supports "DiagnosticReport" and
   * "QuestionnaireResponse" (SDC profile)
   * @param fhirData a QuestionnaireResponse resource, a DiagnosticReport resource with "contained" Observation
   * resources,or a Bundle with DiagnosticReport and Observation resources
   * @param formData an LForms form definition or LFormsData object.
   * @param fhirVersion - the version of FHIR in which the fhirData is
   *  written.  This maybe be omitted if the Questionnaire resource (in
   *  fhirData) contains a meta.profile attibute specifying the FHIR version.
   *  (See http://build.fhir.org/versioning.html#mp-version)
   *  If both are provided, this takes precedence.
   * @returns {{}} an updated LForms form definition, with answer data
   */
  mergeFHIRDataIntoLForms: function mergeFHIRDataIntoLForms(resourceType, fhirData, formData, fhirVersion) {
    if (fhirData) {
      fhirVersion = this._requireValidFHIRVersion(fhirVersion, fhirData);
      var fhir = LForms.FHIR[fhirVersion];

      switch (resourceType) {
        case "DiagnosticReport":
          formData = fhir.DiagnosticReport.mergeDiagnosticReportToLForms(formData, fhirData);
          break;

        case "QuestionnaireResponse":
          formData = fhir.SDC.mergeQuestionnaireResponseToLForms(formData, fhirData);
          break;
      }
    }

    return formData;
  },

  /**
   *  Ensures that either the given FHIR version is valid and supported, or
   *  that a valid version can be determined from the given FHIR resource.
   */
  _requireValidFHIRVersion: function _requireValidFHIRVersion(fhirVersion, fhirResource) {
    if (!fhirVersion) fhirVersion = this.detectFHIRVersion(fhirResource) || this.guessFHIRVersion(fhirResource);

    if (!fhirVersion) {
      throw new Error('Could not determine the FHIR version for this resource.  ' + 'Please make sure it is specified via meta.profile (see ' + 'http://build.fhir.org/versioning.html#mp-version and ' + 'https://www.hl7.org/fhir/references.html#canonical).  ' + 'Example 1:  http://hl7.org/fhir/3.5/StructureDefinition/Questionnaire' + ' (for Questionnaire version 3.5).' + 'Example 2:  http://hl7.org/fhir/uv/sdc/StructureDefinition/sdc-questionnaire|3.5.0 ' + ' (for SDC Questionnaire version 3.5).');
    } else fhirVersion = this.validateFHIRVersion(fhirVersion);

    return fhirVersion;
  },

  /**
   *  For FHIR applications, provides FHIR context information that might be
   *  needed in rendering a Quesitonnaire.
   * @param fhirContext an optional object for accessing a FHIR context and
   *  FHIR API.  It should define the following operations:
   *  - getCurrent(typeList, callback):  "typeList" should be a list of desired
   *    FHIR resource types for which there is conceptually a "current" on in
   *    the FHIR context (e.g., Patient, or Practitioner).  Only one resource
   *    from the requested list will be returned, and the result will be null if
   *    none of the requested resource types are available.  Because retrieving
   *    the resource will generally be an asynchronous operation, the resource
   *    will be returned via the first argument to the provided "callback"
   *    function.
   *  - getFHIRAPI():  Should return an instance of fhir.js for interacting with
   *    the FHIR server.
   */
  setFHIRContext: function setFHIRContext(fhirContext) {
    LForms.fhirContext = fhirContext;
    delete LForms._serverFHIRReleaseID; // in case the version changed
  },

  /**
   *  Converts a FHIR version string (e.g. 3.0.1) to a release ID (e.g. 'STU3').
   * @param versionStr the version string to be converted to a release ID.
   * @return the release ID for the given version string, or versionStr if the
   *  version string cannot be mapped to a release ID.
   */
  _fhirVersionToRelease: function _fhirVersionToRelease(versionStr) {
    var releaseID = versionStr; // default

    var matchData = versionStr.match(/^\d+(\.\d+)/);

    if (matchData) {
      var versionNum = parseFloat(matchData[0]); // Following http://www.hl7.org/fhir/directory.cfml

      var releaseID = versionNum > 3.0 && versionNum <= 4.0 ? 'R4' : versionNum >= 1.1 && versionNum <= 3.0 ? 'STU3' : versionStr;
    }

    return releaseID;
  },

  /**
   *  Gets the release identifier for the version of FHIR being used by the
   *  server providing the FHIR context set via setFHIRContext (which must have
   *  been called first).
   * @param callback Because asking the FHIR server for its version is an
   *  asynchronous call, this callback function will be used to return the
   *  version when found.  The callback will be called asynchronously with a
   *  release string, like 'STU3' or 'R4'.  This string can then be passed to
   *  validateFHIRVersion to check that the needed support files have been loaded.
   *  If the release ID cannot be determined because the server's fhir
   *  version is not known, the version number will passed to the callback.  If
   *  communication with the FHIR server is not succesful, the callback will be
   *  called without an argument.
   */
  getServerFHIRReleaseID: function getServerFHIRReleaseID(callback) {
    if (!LForms.fhirContext) throw new Error('setFHIRContext needs to be called before getFHIRReleaseID');

    if (!LForms._serverFHIRReleaseID) {
      // Retrieve the fhir version
      try {
        var fhirAPI = LForms.fhirContext.getFHIRAPI();
        fhirAPI.conformance({}).then(function (res) {
          var fhirVersion = res.data.fhirVersion;
          LForms._serverFHIRReleaseID = LForms.Util._fhirVersionToRelease(fhirVersion);
          console.log('Server FHIR version is ' + LForms._serverFHIRReleaseID + ' (' + fhirVersion + ')');
          callback(LForms._serverFHIRReleaseID);
        }, function (err) {
          console.log("Error retrieving server's CompatibilityStatement:");
          console.log(err);
          callback();
        });
      } catch (e) {
        setTimeout(function () {
          callback();
        });
        throw e;
      }
    } else {
      // preserve the asynchronous nature of the return
      setTimeout(function () {
        callback(LForms._serverFHIRReleaseID);
      });
    }
  },

  /**
   *  Checks to see if the given value is a valid FHIR version.  If the
   *  version is unsupported, an exception is thrown.  Also, if the version is
   *  supported but the support file is not loaded, an exception will be thrown.
   * @version the version of FHIR that was requested
   * @return the version passed in
   */
  validateFHIRVersion: function validateFHIRVersion(version) {
    if (LForms.Util.FHIRSupport[version]) {
      if (!LForms.FHIR) {
        throw new Error('The FHIR support files for LHC-Forms do not appear to ' + 'have been loaded.  Please consult the documentation at ' + 'http://lhncbc.github.io/lforms/#fhirSupport.');
      } else if (!LForms.FHIR[version]) throw new Error('Version ' + version + ' of FHIR is supported, but the supporting code was not loaded.');
    } else throw new Error('Version ' + version + ' of FHIR is not supported.');

    return version;
  },

  /**
   *  Attempts to detect the version of FHIR specified in the given resource.
   * @param fhirData a FHIR resource.  Supported resource types are currently
   *  just Questionnaire and QuestionnaireResponse.
   * @return the FHIR version, or null if the FHIR version was not explicity
   *  specified in the resource.
   */
  detectFHIRVersion: function detectFHIRVersion(fhirData) {
    var fhirVersion;

    if (fhirData.meta && fhirData.meta.profile) {
      var profiles = fhirData.meta.profile; // See http://build.fhir.org/versioning.html#mp-version

      var questionnairePattern = new RegExp('http://hl7.org/fhir/(\\d+\.?\\d+)([\\.\\d]+)?/StructureDefinition/Questionnaire');
      var sdcPattern = new RegExp('http://hl7.org/fhir/u./sdc/StructureDefinition/sdc-questionnaire\\|(\\d+\.?\\d+)');

      for (var i = 0, len = profiles.length && !fhirVersion; i < len; ++i) {
        var match = profiles[i].match(questionnairePattern);
        if (match) fhirVersion = match[1];else {
          match = profiles[i].match(sdcPattern);

          if (match) {
            fhirVersion = match[1];
            if (fhirVersion == '2.0') fhirVersion = '3.0'; // Use FHIR 3.0 for SDC 2.0; There was no SDC 3.0
          }
        }
      }
    }

    if (fhirVersion) fhirVersion = this._fhirVersionToRelease(fhirVersion);
    return fhirVersion;
  },

  /**
   *  Looks at the structure of the given FHIR resource to determine the version
   *  of FHIR, if possible.
   * @param fhirData a FHIR resource.  Supported resource types are currently
   *  just Questionnaire and QuestionnaireResponse.
   * @return the FHIR version number (e.g. STU3), or null if the type cannot be
   *  determined.
   */
  guessFHIRVersion: function guessFHIRVersion(fhirData) {
    var version = null;

    if (fhirData.resourceType == 'Questionnaire') {
      // See if any items have a property deleted from R4.
      var items = [];

      var foundSTU3 = this._testValues(fhirData, 'item', function (item) {
        return !!(item.option || item.options || item.enableWhen && 'hasAnswer' in item.enableWhen);
      });

      version = foundSTU3 ? 'STU3' : 'R4';
    } else if (fhirData.resourceType == 'QuestionnaireResponse') {
      if (fhirData.parent) version = 'STU3';else {
        // See if any items have a property deleted from R4.
        var foundSTU3 = this._testValues(fhirData, 'item', function (item) {
          return !!item.subject;
        });

        version = foundSTU3 ? 'STU3' : 'R4';
      }
    }

    return version;
  },

  /**
   *  Searches the properties and sub-properties of "obj" for the given property
   *  name, testing their values to see if valTest returns true.
   * @param obj the object to be searched.  This can be an array.
   * @param property the property name to look for
   * @param testVal the function to use to test the property values.  This
   *  should return true if the value passes the test.
   * @return true if at least one value was found found whose key was "property"
   *  and for which testVal returned true.
   */
  _testValues: function _testValues(obj, property, valTest) {
    var rtn = false;

    if (obj instanceof Array) {
      for (var j = 0, jLen = obj.length; !rtn && j < jLen; ++j) {
        rtn = this._testValues(obj[j], property, valTest);
      }
    } else if (_typeof(obj) === "object") {
      var keys = Object.keys(obj);

      for (var i = 0, len = keys.length; !rtn && i < len; ++i) {
        var key = keys[i];
        var val = obj[key];

        if (key === property) {
          if (val instanceof Array) {
            for (var k = 0, kLen = val.length; !rtn && k < kLen; ++k) {
              rtn = valTest(val[k]);
            }
          } else rtn = valTest(val);
        }

        if (!rtn) this._testValues(val, property, valTest); // search sub-objects
      }
    }

    return rtn;
  },

  /**
   * Find the form object in the scope based the form dom element
   * @param element element the containing HTML element that includes the LForm's rendered form.
   * @returns {*}
   * @private
   */
  _getFormObjectInScope: function _getFormObjectInScope(element) {
    // find the scope that has the LForms data
    var formObj;
    if (!element) element = jQuery("body"); // class="lf-form"> is the element that contains rendered form.

    var lfForms = jQuery(element).find(".lf-form");
    angular.forEach(lfForms, function (ele, index) {
      var lfForm = angular.element(ele);

      if (lfForm.scope() && lfForm.scope().lfData) {
        formObj = lfForm.scope().lfData;
        return false; // break the loop
      }
    });
    return formObj;
  },

  /**
   * Get a formatted date string from a date object
   * for example: "2016-10-31T14:42:12-04:00"
   * @param objDate a date object
   * @returns a formatted date string
   */
  dateToString: function dateToString(objDate) {
    var offset = objDate.getUTCOffset();
    offset = offset.slice(0, -2) + ":" + offset.slice(-2);
    return objDate.toString("yyyy-MM-ddTHH:mm:ss") + offset;
  },

  /**
   * Parse a formatted date string and create a date object
   * @param strDate a formatted date string
   * @returns a date object
   */
  stringToDate: function stringToDate(strDate) {
    return new Date(strDate);
  },

  /**
   * Check if an item's value is empty, where the data has no meaningful use.
   * @param value the value to be tested
   * @returns {boolean}
   * @private
   */
  isItemValueEmpty: function isItemValueEmpty(value) {
    var empty = true;

    if (typeof value !== 'undefined') {
      // object
      if (angular.isObject(value)) {
        var keys = Object.keys(value);

        for (var i = 0, iLen = keys.length; i < iLen; i++) {
          var val = value[keys[i]];

          if (val !== null && val !== "") {
            empty = false;
            break;
          }
        }
      } // array
      else if (angular.isArray(value)) {
          if (value.length > 0) {
            empty = false;
          }
        } // other
        else if (value !== null && value !== "") {
            empty = false;
          }
    }

    return empty;
  },

  /**
   * Get the letter (or letters) indicator for the next repeating instance
   * The letters returned are in the pattern of:
   * 'a','b',...,'z','aa','ab',...,'az','ba','bb',...
   * for index that is:
   *  1,  2, ..., 26, 27,  28, ..., 52,  53,  54, ...
   * @param index the index for the current repeating instance, starting with 1
   */
  getNextLetter: function getNextLetter(index) {
    var letters = "abcdefghijklmnopqrstuvqxyz";
    var positions = [];
    var wkIndex = index;

    while (wkIndex > 0) {
      var letterIndex = wkIndex % 26;
      letterIndex = letterIndex === 0 ? 25 : letterIndex - 1;
      positions.push(letterIndex);
      wkIndex = Math.floor((wkIndex - 1) / 26);
    }

    var nextLetter = "";

    for (var i = positions.length - 1; i >= 0; i--) {
      nextLetter += letters.charAt(positions[i]);
    }

    return nextLetter;
  },

  /**
   * Finds an object from an array using key/value pair with an optional start index.
   * The matching value should be a primitive type. If start index is not specified,
   * it is assumed to be 0.
   *
   * Only returns the first matched object in the array.
   *
   * @param targetObjects - Array of objects to search using key and value
   * @param key - Key of the the target object to match the value.
   * @param matchingValue - Matching value of the specified key.
   * @param starting_index - Optional start index to lookup. Negative number indicates index from end.
   *   The absolute value should be less than the length of items in the array. If not
   *   the starting index is assumed to be 0.
   * @param all - If true, then an array will be returned containing all
   *  matches.
   *
   * @returns {*} - If "all" is false (default), then this returns the first matched
   *  object, or null if none matched.  If "all" is true, then this will return
   *  an array containing any matched objects.
   */
  findObjectInArray: function findObjectInArray(targetObjects, key, matchingValue, starting_index, all) {
    var ret = all ? [] : null;

    if (Array.isArray(targetObjects)) {
      var start = 0; // Figure out start index.

      if (starting_index && Math.abs(starting_index) < targetObjects.length) {
        if (starting_index < 0) {
          start = targetObjects.length + starting_index;
        } else {
          start = starting_index;
        }
      }

      var len = targetObjects.length;

      for (var i = start; i < len; i++) {
        if (targetObjects[i][key] === matchingValue) {
          var match = targetObjects[i];
          if (all) ret.push(match);else {
            ret = match;
            break;
          }
        }
      }
    }

    return ret;
  },

  /**
   * Recursively find the first occurrence of an item, depth first, that matches the
   * given field value for the given field
   * @param items an array of LForms items, where an item may have its own sub-items.
   * @param key
   * @param matchingValue
   * @return {*}
   */
  findItem: function findItem(items, key, matchingValue) {
    var ret = null;

    if (items) {
      for (var i = 0; !ret && i < items.length; ++i) {
        var item = items[i];

        if (item[key] === matchingValue) {
          ret = item;
        } else if (Array.isArray(item.items)) {
          ret = this.findItem(item.items, key, matchingValue);
        }
      }
    }

    return ret;
  },

  /**
   * Remove key/values from an object based on a regular expression of key.
   *
   * @param obj {object} - Object to prune
   * @param keyRegex {regex} - A regular expression to match the keys for deletion
   * @param recursiveKey {optional|string} - Key of the recursive field. The value
   *                                of this should be an object or an Array of objects.
   * @private
   */
  _pruneObject: function _pruneObject(keyRegex, obj, recursiveKey) {
    if (_typeof(obj) === 'object') {
      for (var k in obj) {
        if (k.match(keyRegex)) {
          delete obj[k];
        } else if (recursiveKey && k === recursiveKey) {
          var val = obj[k];

          if (Array.isArray(val)) {
            var len = val.length;

            for (var i = 0; i < len; i++) {
              this._pruneObject(keyRegex, val[i], recursiveKey);
            }
          } else {
            this._pruneObject(keyRegex, val, recursiveKey);
          }
        }
      }
    }
  },

  /**
   * Utility to walkthrough recurively through each element in a collection
   *
   * @param collectionObj
   */
  pruneNulls: function pruneNulls(collectionObj) {
    if (Array.isArray(collectionObj)) {
      for (var i = collectionObj.length - 1; i >= 0; i--) {
        if (collectionObj[i] === null || collectionObj[i] === undefined) {
          collectionObj.splice(i, 1);
        } else if (typeof collectionObj[i] === 'Array') {
          LForms.Util.pruneNulls(collectionObj[key]);
        }
      }
    } else if (collectionObj && _typeof(collectionObj) === 'object') {
      var keys = Object.keys(collectionObj);
      keys.forEach(function (key) {
        if (collectionObj[key] === null || collectionObj[key] === undefined) {
          delete collectionObj[key];
        } else if (_typeof(collectionObj[key]) === 'object') {
          LForms.Util.pruneNulls(collectionObj[key]);
        }
      });
    }
  },

  /**
   *  Creates a Reference to the given FHIR resource, to be used an a subject in
   *  another resource.
   * @param fhirRes the FHIR resource for which to create a Reference.
   * @return a FHIR Reference, with a local reference to fhirRes.
   */
  createLocalFHIRReference: function createLocalFHIRReference(fhirRes) {
    var ref = {
      "reference": fhirRes.resourceType + "/" + fhirRes.id
    };

    if (fhirRes.resourceType === "Patient") {
      if (fhirRes.name && fhirRes.name.length > 0) {
        var name = fhirRes.name[0];
        if (name.text) ref.display = name.text;else {
          if (name.given && name.given.length > 0) ref.display = name.given[0];

          if (name.family) {
            if (ref.display) ref.display = ref.display + ' ' + name.family;else ref.display = name.family;
          }
        }
      }
    } // Not sure what to put for display for something other than patient, but it
    // is optional, so for now I will just leave it blank.


    return ref;
  }
};

/***/ }),
/* 28 */
/***/ (function(module, exports) {

// HTML5 polyfills
// Polyfill for String.repeat
// Taken from
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/repeat
if (!String.prototype.repeat) {
  String.prototype.repeat = function (count) {
    'use strict';

    if (this == null) {
      throw new TypeError('can\'t convert ' + this + ' to object');
    }

    var str = '' + this;
    count = +count;

    if (count != count) {
      count = 0;
    }

    if (count < 0) {
      throw new RangeError('repeat count must be non-negative');
    }

    if (count == Infinity) {
      throw new RangeError('repeat count must be less than infinity');
    }

    count = Math.floor(count);

    if (str.length == 0 || count == 0) {
      return '';
    } // Ensuring count is a 31-bit integer allows us to heavily optimize the
    // main part. But anyway, most current (August 2014) browsers can't handle
    // strings 1 << 28 chars or longer, so:


    if (str.length * count >= 1 << 28) {
      throw new RangeError('repeat count must not overflow maximum string size');
    }

    var rpt = '';

    for (;;) {
      if ((count & 1) == 1) {
        rpt += str;
      }

      count >>>= 1;

      if (count == 0) {
        break;
      }

      str += str;
    } // Could we try:
    // return Array(count + 1).join(this);


    return rpt;
  };
}

/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

/**
 * A package to generate HL7 messgages from LForms form data
 */
var LForms = __webpack_require__(2);

LForms.HL7 = function () {
  "use strict";

  return {
    LOINC_CS: 'LN',
    obrFieldNum: 43,
    obxFieldNum: 17,
    // HL7 V2 data types
    DataType: {
      //Alphanumeric
      "ST": "String",
      "TX": "Text data",
      "FT": "Formatted text",
      //Numerical
      "CQ": "Composite quantity with units",
      "MO": "Money",
      "NM": "Numeric",
      "SI": "Sequence ID",
      "SN": "Structured numeric",
      //Identifier
      "ID": "Coded values for HL7 tables",
      "IS": "Coded values for user-defined tables",
      "HD": "Hierarchic designator",
      "EI": "Entity identifier",
      "RP": "Reference pointer",
      "PL": "Person location",
      "PT": "Processing type",
      //Date/Time
      "DT": "Date",
      "TM": "Time",
      "TS": "Time stamp",
      //Code Values
      "CE": "Coded element",
      "CF": "Coded element with formatted values",
      "CK": "Composite ID with check digit",
      "CN": "Composite ID number and name",
      "CX": "Extended composite ID with check digit",
      "XCN": "Extended composite ID number and name",
      //Generic
      "CM": "Composite",
      //Demographics
      "AD": "Address",
      "PN": "Person name",
      "TN": "Telephone number",
      "XAD": "Extended address",
      "XPN": "Extended person name",
      "XON": "Extended composite name and ID number for organizations",
      "XTN": "Extended telecommunications number",
      //Specialty/Chapter specific
      "CD": "Channel definition",
      "MA": "Multiplexed array",
      "NA": "Numeric array",
      "ED": "Encapsulated data",
      "CP": "Composite price",
      "FC": "Financial class",
      //Extended Queries
      "QSC": "Query selection criteria",
      "QIP": "Query input parameter list",
      "RCD": "Row column definition",
      //Master Files
      "DLN": "Driver’s license number",
      "JCC": "Job code/class",
      "VH": "Visiting hours",
      //Medical Records/Info Mgmt
      "PPN": "Performing person time stamp",
      //Time Series
      "DR": "Date/time range",
      "RI": "Repeat interval",
      "SCV": "Scheduling class value pair",
      "TQ": "Timing/quantity"
    },
    // message delimiters
    delimiters: {
      segment: "\r",
      // "\r\n" for display
      field: "|",
      component: "^",
      subcomponent: "&",
      repetition: "~",
      escape: "\\"
    },
    // OBX segment
    OBX: [{
      "seq": 1,
      "len": 4,
      "dt": "SI",
      "opt": "O",
      "name": "Set ID"
    }, {
      "seq": 2,
      "len": 2,
      "dt": "ID",
      "opt": "R",
      "name": "Value Type"
    }, {
      "seq": 3,
      "len": 590,
      "dt": "CE",
      "opt": "R",
      "name": "Observation Identifier"
    }, {
      "seq": 4,
      "len": 20,
      "dt": "ST",
      "opt": "O",
      "name": "Observation Sub-ID"
    }, {
      "seq": 5,
      "len": 65536,
      "dt": "ST",
      "opt": "O",
      "name": "Observation Value"
    }, {
      "seq": 6,
      "len": 60,
      "dt": "CE",
      "opt": "O",
      "name": "Units"
    }, {
      "seq": 7,
      "len": 10,
      "dt": "ST",
      "opt": "O",
      "name": "Reference Range"
    }, {
      "seq": 8,
      "len": 5,
      "dt": "ID",
      "opt": "O",
      "name": "Abnormal Flags"
    }, {
      "seq": 9,
      "len": 5,
      "dt": "NM",
      "opt": "O",
      "name": "Probability"
    }, {
      "seq": 10,
      "len": 2,
      "dt": "ID",
      "opt": "O",
      "name": "Nature of Abnormal Test"
    }, {
      "seq": 11,
      "len": 1,
      "dt": "ID",
      "opt": "R",
      "name": "Observation Result Status"
    }, {
      "seq": 12,
      "len": 26,
      "dt": "TS",
      "opt": "O",
      "name": "Date Last Obs Normal Values"
    }, {
      "seq": 13,
      "len": 20,
      "dt": "ST",
      "opt": "O",
      "name": "User Defined Access Checks"
    }, {
      "seq": 14,
      "len": 26,
      "dt": "TS",
      "opt": "O",
      "name": "Date/Time of the Observation"
    }, {
      "seq": 15,
      "len": 60,
      "dt": "CE",
      "opt": "O",
      "name": "Producer's ID"
    }, {
      "seq": 16,
      "len": 80,
      "dt": "XCN",
      "opt": "O",
      "name": "Responsible Observer"
    }, {
      "seq": 17,
      "len": 80,
      "dt": "CE",
      "opt": "O",
      "name": "Observation Method"
    }],
    // OBR segment
    OBR: [{
      "seq": 1,
      "len": 4,
      "dt": "SI",
      "opt": "C",
      "name": "Set ID - OBR"
    }, {
      "seq": 2,
      "len": 75,
      "dt": "EI",
      "opt": "C",
      "name": "Placer Order Number"
    }, {
      "seq": 3,
      "len": 75,
      "dt": "EI",
      "opt": "C",
      "name": "Filler Order Number"
    }, {
      "seq": 4,
      "len": 200,
      "dt": "CE",
      "opt": "R",
      "name": "Universal Service ID"
    }, {
      "seq": 5,
      "len": 2,
      "dt": "ID",
      "opt": "B",
      "name": "Priority"
    }, {
      "seq": 6,
      "len": 26,
      "dt": "TS",
      "opt": "B",
      "name": "Requested Date/time"
    }, {
      "seq": 7,
      "len": 26,
      "dt": "TS",
      "opt": "C",
      "name": "Observation Date/Time"
    }, {
      "seq": 8,
      "len": 26,
      "dt": "TS",
      "opt": "O",
      "name": "Observation End Date/Time"
    }, {
      "seq": 9,
      "len": 20,
      "dt": "CQ",
      "opt": "O",
      "name": "Collection Volume"
    }, {
      "seq": 10,
      "len": 60,
      "dt": "XCN",
      "opt": "O",
      "name": "Collector Identifier"
    }, {
      "seq": 11,
      "len": 1,
      "dt": "ID",
      "opt": "O",
      "name": "Specimen Action Code"
    }, {
      "seq": 12,
      "len": 60,
      "dt": "CE",
      "opt": "O",
      "name": "Danger Code"
    }, {
      "seq": 13,
      "len": 300,
      "dt": "ST",
      "opt": "O",
      "name": "Relevant Clinical Info."
    }, {
      "seq": 14,
      "len": 26,
      "dt": "TS",
      "opt": "C",
      "name": "Specimen Received Date/Time"
    }, {
      "seq": 15,
      "len": 300,
      "dt": "CM",
      "opt": "O",
      "name": "Specimen Source"
    }, {
      "seq": 16,
      "len": 80,
      "dt": "XCN",
      "opt": "O",
      "name": "Ordering Provider"
    }, {
      "seq": 17,
      "len": 40,
      "dt": "XTN",
      "opt": "O",
      "name": "Order Callback Phone Number"
    }, {
      "seq": 18,
      "len": 60,
      "dt": "ST",
      "opt": "O",
      "name": "Placer field 1"
    }, {
      "seq": 19,
      "len": 60,
      "dt": "ST",
      "opt": "O",
      "name": "Placer field 2"
    }, {
      "seq": 20,
      "len": 60,
      "dt": "ST",
      "opt": "O",
      "name": "Filler Field 1"
    }, {
      "seq": 21,
      "len": 60,
      "dt": "ST",
      "opt": "O",
      "name": "Filler Field 2"
    }, {
      "seq": 22,
      "len": 26,
      "dt": "TS",
      "opt": "C",
      "name": "Results Rpt/Status Chng - Date/Time"
    }, {
      "seq": 23,
      "len": 40,
      "dt": "CM",
      "opt": "O",
      "name": "Charge to Practice"
    }, {
      "seq": 24,
      "len": 10,
      "dt": "ID",
      "opt": "O",
      "name": "Diagnostic Serv Sect ID"
    }, {
      "seq": 25,
      "len": 1,
      "dt": "ID",
      "opt": "C",
      "name": "Result Status"
    }, {
      "seq": 26,
      "len": 400,
      "dt": "CM",
      "opt": "O",
      "name": "Parent Result"
    }, {
      "seq": 27,
      "len": 200,
      "dt": "TQ",
      "opt": "O",
      "name": "Quantity/Timing"
    }, {
      "seq": 28,
      "len": 150,
      "dt": "XCN",
      "opt": "O",
      "name": "Result Copies To"
    }, {
      "seq": 29,
      "len": 150,
      "dt": "CM",
      "opt": "O",
      "name": "Parent"
    }, {
      "seq": 30,
      "len": 20,
      "dt": "ID",
      "opt": "O",
      "name": "Transportation Mode"
    }, {
      "seq": 31,
      "len": 300,
      "dt": "CE",
      "opt": "O",
      "name": "Reason for Study"
    }, {
      "seq": 32,
      "len": 200,
      "dt": "CM",
      "opt": "O",
      "name": "Principal Result Interpreter"
    }, {
      "seq": 33,
      "len": 200,
      "dt": "CM",
      "opt": "O",
      "name": "Assistant Result Interpreter"
    }, {
      "seq": 34,
      "len": 200,
      "dt": "CM",
      "opt": "O",
      "name": "Technician"
    }, {
      "seq": 35,
      "len": 200,
      "dt": "CM",
      "opt": "O",
      "name": "Transcriptionist"
    }, {
      "seq": 36,
      "len": 26,
      "dt": "TS",
      "opt": "O",
      "name": "Scheduled Date/Time"
    }, {
      "seq": 37,
      "len": 4,
      "dt": "NM",
      "opt": "O",
      "name": "Number of Sample Containers"
    }, {
      "seq": 38,
      "len": 60,
      "dt": "CE",
      "opt": "O",
      "name": "Transport Logistics of Collected Sample"
    }, {
      "seq": 39,
      "len": 200,
      "dt": "CE",
      "opt": "O",
      "name": "Collector’s Comment"
    }, {
      "seq": 40,
      "len": 60,
      "dt": "CE",
      "opt": "O",
      "name": "Transport Arrangement Responsibility"
    }, {
      "seq": 41,
      "len": 30,
      "dt": "ID",
      "opt": "O",
      "name": "Transport Arranged"
    }, {
      "seq": 42,
      "len": 1,
      "dt": "ID",
      "opt": "O",
      "name": "Escort Required"
    }, {
      "seq": 43,
      "len": 200,
      "dt": "CE",
      "opt": "O",
      "name": "Planned Patient Transport Comment"
    }],
    getHL7V2DataType: function getHL7V2DataType(lformsDataType) {
      var ret;

      switch (lformsDataType) {
        case "INT":
        case "REAL":
          ret = "NM";
          break;

        case "NR":
        case "TX":
        case "DT":
        case "DTM":
        case "TM":
        case "CNE":
        case "CWE":
          ret = lformsDataType;
          break;
        // Commenting out these cases which are handled by the default, but
        // leaving them here for reference.

        /*
        case "BIN":
        case "RTO":
        case "QTY":
        case "YEAR":
        case "MONTH":
        case "DAY":
        case "URL":
        case "EMAIL":
        case "PHONE":
        case "BL":
        case "":
        case "ST":
          ret = "ST";
          break; */

        default:
          ret = "ST";
      }

      return ret;
    },
    // create HL7 OBR and OBX segments only

    /**
     * Convert LForms form data into HL7 OBR and OBX segments
     * @param lfData a LForms form data object
     * @returns {string}
     */
    toHL7Segments: function toHL7Segments(lfData) {
      var hl7String = '';
      var formInfo = {
        obrIndex: 1,
        obxIndex: 1
      }; // get form data with questions that have no values

      var formData = lfData.getFormData(false, true, true);

      this._generateOBX4(formData); // form level info


      var formObrArray = new Array(this.obrFieldNum); // initial value is undefined
      // index = seq - 1

      formObrArray[0] = "OBR";
      formObrArray[1] = "1";
      formObrArray[4] = formData.code + this.delimiters.component + formData.name + this.delimiters.component + this.LOINC_CS;

      if (formData.templateOptions.formHeaderItems && formData.templateOptions.formHeaderItems.length > 0) {
        for (var i = 0, iLen = formData.templateOptions.formHeaderItems.length; i < iLen; i++) {
          if (formData.templateOptions.formHeaderItems[i].questionCode === "date_done" && formData.templateOptions.formHeaderItems[i].value) {
            formObrArray[7] = formData.templateOptions.formHeaderItems[i].value.toString("yyyyMMddHHmmss");
          } else if (formData.templateOptions.formHeaderItems[i].questionCode === "where_done" && formData.templateOptions.formHeaderItems[i].value) {
            formObrArray[13] = formData.templateOptions.formHeaderItems[i].value.text;
          }
        }
      } // ignore ending empty fields


      var foundValue = false;

      for (var i = this.obrFieldNum - 1; i >= 0; i--) {
        if (!foundValue && formObrArray[i] === undefined) {
          continue;
        } else if (formObrArray[i] !== undefined) {
          hl7String = formObrArray[i] + this.delimiters.field + hl7String;
        } else {
          hl7String += this.delimiters.field;
        }
      }

      hl7String += this.delimiters.segment; // process the questions/sections

      if (formData.items) {
        var obxIndex = 0;

        for (var j = 0, jLen = formData.items.length; j < jLen; j++) {
          if (formData.items[j].dataType !== "TITLE") {
            // Note: OBX1 value is not reset for sub panels in the current design.
            // if (formData.items[j].header) {
            //   formInfo.obxIndex = 1;
            // }
            hl7String += this._itemToHL7v2(formData.items[j], formInfo);
          }
        }
      }

      return hl7String;
    },

    /**
     * Calculate OBX4 values of each item in the form
     * @param formData form data that also includes user data
     * @private
     */
    _generateOBX4: function _generateOBX4(formData) {
      if (formData && formData.items) {
        this._precessOBX4AtOneLevel("", formData.items);
      }
    },

    /**
     * Calculate OBX4 values for questions/sections at one level
     * @param parentOBX4 the containing section item's obx4 value
     * @param items, the list of items at the level
     * @private
     */
    _precessOBX4AtOneLevel: function _precessOBX4AtOneLevel(parentOBX4, items) {
      var sectionSN = 0;
      var repeatingIndex = 1;
      var prevItem = null; // go through questions/sections from top to bottom

      for (var i = 0, iLen = items.length; i < iLen; i++) {
        var item = items[i]; // if it's a section

        if (item.dataType === "SECTION") {
          // if it repeats
          var max = item.questionCardinality.max;

          if (max && (max === "*" || parseInt(max) > 1)) {
            // skip if all questions within it have no values
            if (!this._isSectionEmpty(item)) {
              // get the repeating instance letter
              if (!prevItem || prevItem && prevItem.questionCode !== item.questionCode) {
                repeatingIndex = 1;
                sectionSN += 1;
              } else {
                repeatingIndex += 1;
              }

              var repeatingLetter = LForms.Util.getNextLetter(repeatingIndex);
              item._obx4 = parentOBX4 ? parentOBX4 + "." + sectionSN + repeatingLetter : sectionSN + repeatingLetter;

              this._precessOBX4AtOneLevel(item._obx4, item.items);
            } // skip if it is an empty section, not to set prevItem
            else {
                continue;
              }
          } // if it does not repeat
          // Note: not to skip even if all questions within is has no values,
          // because the SN still increases in this case.
          else {
              repeatingIndex = 1;
              sectionSN += 1;
              item._obx4 = parentOBX4 ? parentOBX4 + "." + sectionSN : sectionSN;

              this._precessOBX4AtOneLevel(item._obx4, item.items);
            }
        } // if it's a question
        else {
            // if it repeats
            var max = item.questionCardinality.max;

            if (max && (max === "*" || parseInt(max) > 1)) {
              // if it has value
              if (!LForms.Util.isItemValueEmpty(item.value)) {
                // get the repeating instance letter
                if (!prevItem || prevItem && prevItem.questionCode !== item.questionCode) {
                  repeatingIndex = 1;
                } else {
                  repeatingIndex += 1;
                }

                var repeatingLetter = LForms.Util.getNextLetter(repeatingIndex);
                item._obx4 = parentOBX4 ? parentOBX4 + "." + repeatingLetter : repeatingLetter;
              } // skip if it has no values, not to set prevItem
              else {
                  continue;
                }
            } // if it does not repeat
            else {
                item._obx4 = parentOBX4 ? parentOBX4 : "";
                repeatingIndex = 1;
              }
          }

        prevItem = item;
      }
    },

    /**
     * Constructs an OBX5 for a list item (CNE/CWE)
     * @param itemVal a value for a list item
     * @param dataType the data type of the item (CNE or CWE)
     * @param answerCS the answer code system
     * @return the OBX5 field string
     */
    _generateOBX5: function _generateOBX5(itemVal, dataType, answerCS) {
      var rtn;
      var code = itemVal.code;

      if (dataType === 'CWE' && !code && code !== 0) {
        // For non-coded values, the text goes in OBX 5.9
        rtn = this.delimiters.component.repeat(8) + itemVal.text;
      } else {
        rtn = code + this.delimiters.component + itemVal.text + this.delimiters.component + answerCS;
      }

      return rtn;
    },

    /**
     * Convert an item to one or more HL7 v2 OBX records.
     * @param item an item in LForms form data
     * @param formInfo index info of the form
     * @returns {string}
     */
    _itemToHL7v2: function _itemToHL7v2(item, formInfo) {
      var hl7Seg = "";
      var questionCS = this.LOINC_CS;

      if (item.dataType !== "TITLE") {
        var itemObrArray = new Array(this.obrFieldNum); // a sub panel

        if (item.header) {
          var obrSeg = "";
          itemObrArray[0] = "OBR";
          itemObrArray[1] = ++formInfo.obrIndex;
          itemObrArray[4] = item.questionCode + this.delimiters.component + item.question + this.delimiters.component + questionCS; // ignore ending empty fields

          var foundValue = false;

          for (var i = this.obrFieldNum - 1; i >= 0; i--) {
            if (!foundValue && itemObrArray[i] === undefined) {
              continue;
            } else if (itemObrArray[i] !== undefined) {
              obrSeg = itemObrArray[i] + this.delimiters.field + obrSeg;
            } else {
              obrSeg += this.delimiters.field;
            }
          }

          obrSeg += this.delimiters.segment; //// Note: not to add obr segments for now.
          //hl7Seg += obrSeg;

          if (item.items) {
            var obxIndex = 0;

            for (var j = 0, jLen = item.items.length; j < jLen; j++) {
              // Note: OBX1 value is not reset for sub panels in the current design.
              // if (item.items[j].header) {
              //   //formInfo.obxIndex = 1;
              // }
              hl7Seg += this._itemToHL7v2(item.items[j], formInfo);
            }
          }
        } // a question, only when it has value
        else if (!LForms.Util.isItemValueEmpty(item.value)) {
            var isArrayVal = Array.isArray(item.value);
            var vals = isArrayVal ? item.value : [item.value];
            var itemObxArray = [];
            itemObxArray[0] = "OBX";
            itemObxArray[1] = formInfo.obxIndex++;
            itemObxArray[2] = this.getHL7V2DataType(item.dataType);
            itemObxArray[3] = item.questionCode + this.delimiters.component + item.question + this.delimiters.component + questionCS; // unit

            if (item.unit) {
              var unitName = "";

              if (item.unit.name !== undefined) {
                unitName = item.unit.name;
              }

              itemObxArray[6] = unitName + this.delimiters.component + unitName + this.delimiters.component + this.LOINC_CS;
            }

            var answerCS = item.answerCodeSystem ? item.answerCodeSystem : this.LOINC_CS;

            for (var i = 0, len = vals.length; i < len; ++i) {
              var val = vals[i]; // OBX4 - sub id

              itemObxArray[4] = item._obx4;

              if (isArrayVal) {
                if (item._obx4 !== '') itemObxArray[4] += ".";
                itemObxArray[4] += LForms.Util.getNextLetter(i + 1);
              } // OBX5 (answer value)


              if (item.dataType === 'CNE' || item.dataType === 'CWE') {
                itemObxArray[5] = this._generateOBX5(val, item.dataType, answerCS);
              } else if (item.dataType === 'DT') {
                itemObxArray[5] = val.toString("yyyyMMddHHmmss");
              } else {
                itemObxArray[5] = val.toString();
              } // ignore ending empty fields


              hl7Seg += itemObxArray.join(this.delimiters.field) + this.delimiters.field + this.delimiters.segment;
            }
          } // if value is not empty

      }

      return hl7Seg;
    },

    /**
     * Check if all questions within a section have no values
     * @param section a section item
     * @private
     */
    _isSectionEmpty: function _isSectionEmpty(sectionItem) {
      var empty = true;

      if (sectionItem.items) {
        for (var i = 0, iLen = sectionItem.items.length; i < iLen && empty; i++) {
          var item = sectionItem.items[i]; // sub section

          if (item.dataType === "SECTION") {
            // has been checked already
            if (item._emptySection === true || item._emptySection === false) {
              empty = item._emptySection;
            } else {
              empty = this._isSectionEmpty(item);
            }
          } // questions
          else {
              empty = LForms.Util.isItemValueEmpty(item.value);
            }
        } // end of for loop

      } // set the flag


      sectionItem._emptySection = empty;
      return empty;
    } // return

  };
}();

/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

/**
 * A package to process user data validations in LForms
 */
var LForms = __webpack_require__(2);

LForms.Validations = {
  // supported keys in restrictions
  _restrictionKeys: ["minExclusive", "minInclusive", "maxExclusive", "maxInclusive", "totalDigits", // not used
  "fractionDigits", // not used
  "length", "minLength", "maxLength", "enumeration", // not used
  "whiteSpace", // not used
  "pattern"],
  // supported data types
  _dataTypes: ["BL", // not fully supported yet
  "INT", "REAL", "ST", "TX", // long text
  "BIN", // not supported yet
  "DT", // complex type
  "DTM", // complex type, not supported yet
  "TM", // complex type
  "CNE", // complex type
  "CWE", // complex type
  "RTO", // complex type, not supported yet
  "QTY", // complex type, not supported yet
  "NR", // complex type
  "YEAR", // sub-type of "ST"
  "MONTH", // sub-type of "ST"
  "DAY", // sub-type of "ST"
  "URL", // sub-type of "ST"
  "EMAIL", // sub-type of "ST"
  "PHONE", // sub-type of "ST"
  "" // for header, no input field
  ],
  _errorMessages: {
    "BL": "must be a boolean (true/false).",
    // not fully supported
    "INT": "must be an integer number.",
    "REAL": "must be a decimal number.",
    "ST": "must be a string value.",
    // not needed
    "TX": "must be a text value.",
    // not needed
    "BIN": "must be a binary value.",
    // not supported
    "DT": "must be a date value.",
    // not used, handled by lf-date directive
    "DTM": "must be a date and time value.",
    // not supported
    "TM": "must be a time value.",
    "CNE": "must be a value from the answer list.",
    // not used, handled by the autocomplete-lhc directive
    "CWE": "must be a value from the answer list or a user supplied value.",
    // not used, handled by the autocomplete-lhc directive
    "RTO": "must be a ratio value.",
    // not supported
    "QTY": "must be a quantity value.",
    // not supported
    "NR": "must be two numeric values separated by a ^. One value can be omitted, but not the ^.",
    "YEAR": "must be a numeric value of year.",
    "MONTH": "must be a numeric value of month.",
    "DAY": "must be a numeric value of day.",
    "URL": "must be a valid URL.",
    "EMAIL": "must be a valid email address.",
    "PHONE": "must be a valid phone number."
  },

  /**
   * Returns false if the item requires a value but does not have one, and true otherwise
   * @param required a flag that indicates if the value is required
   * @param value the user input value
   * @param errors the error messages array that returns
   * @returns {boolean}
   */
  checkRequired: function checkRequired(required, value, errors) {
    var ret = true;

    if (required && (value === undefined || value === null || value === '' || angular.isArray(value) && value.length === 0)) {
      ret = false;
      errors.push("requires a value");
    }

    return ret;
  },

  /**
   * Check if value is of the specified data type
   * @param dataType the specified data type
   * @param value the user input value
   * @param errors the error messages array that returns
   * @returns {boolean}
   */
  checkDataType: function checkDataType(dataType, value, errors) {
    var valid = true;

    if (value !== undefined && value !== null && value !== "") {
      switch (dataType) {
        case "BL":
          if (value !== true && value !== false) {
            valid = false;
          }

          break;

        case "INT":
          var regex = /^(\+|-)?\d+$/;
          valid = regex.test(value);
          break;

        case "REAL":
          var regex = /^(\+|-)?\d+(\.\d+)?$/;
          valid = regex.test(value);
          break;

        case "PHONE":
          var regex = /(((^\s*(\d\d){0,1}\s*(-?|\.)\s*(\(?\d\d\d\)?\s*(-?|\.?)){0,1}\s*\d\d\d\s*(-?|\.?)\s*\d{4}\b)|(^\s*\+\(?(\d{1,4}\)?(-?|\.?))(\s*\(?\d{2,}\)?\s*(-?|\.?)\s*\d{2,}\s*(-?|\.?)(\s*\d*\s*(-|\.?)){0,3})))(\s*(x|ext|X)\s*\d+){0,1}$)/;
          valid = regex.test(value);
          break;

        case "EMAIL":
          var regex = /^\s*((\w+)(\.\w+)*)@((\w+)(\.\w+)+)$/;
          valid = regex.test(value);
          break;

        case "URL":
          var regex = /^(https?|ftp):\/\/[\w-]+(\.[\w-]+)+([\w.,@?^=%&amp;:\/~+#-]*[\w@?^=%&amp;\/~+#-])?$/;
          valid = regex.test(value);
          break;

        case "TM":
          // time
          var regex = /^\s*(((\d|[0-1]\d|2[0-4]):([0-5]\d))|(\d|0\d|1[0-2]):([0-5]\d)\s*([aApP][mM]))\s*$/;
          valid = regex.test(value);
          break;

        case "YEAR":
          var regex = /^\d{1,4}$/;
          valid = regex.test(value);
          break;

        case "MONTH":
          var regex = /^(0?[1-9]|1[012])$/;
          valid = regex.test(value);
          break;

        case "DAY":
          var regex = /^(0?[1-9]|[12]\d|3[01])$/;
          valid = regex.test(value);
          break;

        case "NR":
          var regex = /^(\-?\d+(\.\d*)?)?\s*\^\s*(\-?\d+(\.\d*)?)?$/;
          valid = regex.test(value);
          break;

        case "DT": // date, handled by date directive

        case "ST": // not needed

        case "DTM": // TBD

        case "RTO": // TBD

        case "QTY": // TBD

        case "CNE": // answers list with no exception, handled by autocomplete directive

        case "CWE": // answers list with exception, handled by autocomplete directive

        default:
          valid = true;
      }
    }

    if (angular.isArray(errors) && !valid) {
      errors.push(this._errorMessages[dataType]);
    }

    return valid;
  },

  /**
   * Check the value against a list of the restrictions
   * @param restrictions a hash of the restrictions and their values
   * @param value the user input value
   * @param errors the error messages array that returns
   * @returns {boolean}
   */
  checkRestrictions: function checkRestrictions(restrictions, value, errors) {
    var allValid = true;

    if (value !== undefined && value !== null && value !== "") {
      for (var key in restrictions) {
        var valid = true;
        var keyValue = restrictions[key];

        switch (key) {
          case "minExclusive":
            if (parseFloat(value) > parseFloat(keyValue)) {
              valid = true;
            } else {
              valid = false;
              errors.push("must be a value greater than " + keyValue + ".");
            }

            break;

          case "minInclusive":
            if (parseFloat(value) >= parseFloat(keyValue)) {
              valid = true;
            } else {
              valid = false;
              errors.push("must be a value greater than or equal to " + keyValue + ".");
            }

            break;

          case "maxExclusive":
            if (parseFloat(value) < parseFloat(keyValue)) {
              valid = true;
            } else {
              valid = false;
              errors.push("must be a value less than " + keyValue + ".");
            }

            break;

          case "maxInclusive":
            if (parseFloat(value) <= parseFloat(keyValue)) {
              valid = true;
            } else {
              valid = false;
              errors.push("must be a value less than or equal to " + keyValue + ".");
            }

            break;

          case "totalDigits":
            // TBD
            break;

          case "fractionDigits":
            // TBD
            break;

          case "length":
            if (value.length == parseInt(keyValue)) {
              valid = true;
            } else {
              valid = false;
              errors.push("must have a total length of " + keyValue + ".");
            }

            break;

          case "maxLength":
            if (value.length <= parseInt(keyValue)) {
              valid = true;
            } else {
              valid = false;
              errors.push("must have a total length less than or equal to " + keyValue + ".");
            }

            break;

          case "minLength":
            if (value.length >= parseInt(keyValue)) {
              valid = true;
            } else {
              valid = false;
              errors.push("must have a total length greater than or equal to " + keyValue + ".");
            }

            break;

          case "pattern":
            // the "\" in the pattern string should have been escaped
            var indexOfFirst = keyValue.indexOf("/");
            var indexOfLast = keyValue.lastIndexOf("/"); // get the pattern and the flag

            var pattern = keyValue.slice(indexOfFirst + 1, indexOfLast);
            var flags = keyValue.slice(indexOfLast + 1);
            var regex = new RegExp(pattern, flags);

            if (regex.test(value)) {
              valid = true;
            } else {
              valid = false;
              errors.push("must match a RegExp pattern of " + keyValue + ".");
            }

            break;

          default:
            valid = true;
        }

        allValid = allValid && valid;
      }
    }

    return allValid;
  }
};

/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

/**
 * LForms class for form definition data
 */
(function () {
  "use strict";

  var LForms = __webpack_require__(2);

  var Class = __webpack_require__(32);

  LForms.LFormsData = Class.extend({
    // constants
    _CONSTANTS: {
      DATA_CONTROL: {
        CONSTRUCTION_ARRAY: "ARRAY",
        CONSTRUCTION_OBJECT: "OBJECT",
        CONSTRUCTION_SIMPLE: "SIMPLE",
        SOURCE_INTERNAL: "INTERNAL",
        EXTERNAL: "EXTERNAL" // not supported yet

      },
      SKIP_LOGIC: {
        ACTION_SHOW: "show",
        ACTION_HIDE: "hide",
        // not supported yet
        STATUS_SHOW: "target-show",
        STATUS_HIDE: "target-hide"
      },
      CALCULATION_METHOD: {
        TOTALSCORE: "TOTALSCORE",
        BMI: "BMI",
        BSA: "BSA"
      },
      DATA_TYPE: {
        INT: "INT",
        REAL: "REAL",
        ST: "ST",
        TX: "TX",
        DT: "DT",
        TM: "TM",
        CNE: "CNE",
        CWE: "CWE",
        NR: "NR",
        YEAR: "YEAR",
        MONTH: "MONTH",
        DAY: "DAY",
        URL: "URL",
        EMAIL: "EMAIL",
        PHONE: "PHONE",
        SECTION: "SECTION",
        TITLE: "TITLE",
        QTY: "QTY",
        BL: "BL" // not fully supported yet
        // BIN:    "BIN",   // not supported yet
        // DTM:    "DTM",   // not supported yet
        // RTO:    "RTO",   // not supported yet

      },
      DISPLAY_MODE: ['lg', 'md', 'sm', 'auto']
    },
    // form type. for now the only type is "LOINC"
    type: null,
    // form's code
    code: null,
    // form's name
    name: null,
    // a pre-defined view template used to display the form
    // only 'table' is supported for now.
    template: null,
    // additional options that controls the selected view template
    templateOptions: {},
    // the question items defined in a form
    items: [],
    // a delimiter used in code path and id path
    PATH_DELIMITER: "/",
    // repeatable question items derived from items
    _repeatableItems: {},
    // All accessory attributes of an item
    // (move all other properties into this _opt eventually.)
    _opt: {},
    // action logs for screen reader
    _actionLogs: [],
    // active item, where a input field in the row has the focus
    _activeItem: null,
    // default template options
    _defaultTemplateOptions: {
      // whether question code is displayed next to the question
      showQuestionCode: false,
      // whether to show coding instruction inline. (false: in popover; true: inline)
      showCodingInstruction: false,
      // whether to control TAB keys to stop on the input fields only (not buttons, or even units fields).
      tabOnInputFieldsOnly: false,
      // whether to hide the controls section on top of the form
      hideFormControls: false,
      // whether to show the option panel that controls all the template options
      showFormOptionPanel: false,
      // should be false by default
      // whether to show the button that decides if 'showFormOptionPanel' is true or false, so that form's option panel will be displayed or hidden
      showFormOptionPanelButton: false,
      // should be false by default
      // whether to show the button for each item (questions and sections) that shows a option panel for display controls
      // Not to use. Unfinished.
      showItemOptionPanelButton: false,
      // should be false by default
      // whether to hide the unit column/field
      hideUnits: false,
      // whether to allow more than one unused repeating item/section
      allowMultipleEmptyRepeatingItems: false,
      // whether to allow HTML content in the codingInstructions field.
      allowHTMLInInstructions: false,
      // whether to use animation on the form
      // not changeable on a rendered form.
      useAnimation: true,
      displayControl: {
        // controls the question layout of the form. default value for questionLayout is "vertical".
        // available value could be "horizontal" when all the items in the form are on the same level,
        // or "matrix" when all the item are on the same level and all are CWE or CNE types items and all have the same list of answers.
        // not changeable on a rendered form.
        "questionLayout": "vertical"
      },
      // controls the view mode of the form, permitted values are "lg", "md", "sm", and "auto".
      // meaning the layout is responsive to the screen/container's size
      // each item can override this setting for the item by setting its own value in displayControl.viewMode
      viewMode: "auto",
      // controls if the form's header section needs to be displayed
      showFormHeader: true,
      // items in form header section
      formHeaderItems: [{
        "question": "Date Done",
        "questionCode": "date_done",
        "dataType": "DT",
        "answers": "",
        "_answerRequired": true,
        "answerCardinality": {
          "min": "1",
          "max": "1"
        }
      }, {
        "question": "Time Done",
        "questionCode": "time_done",
        "dataType": "TM",
        "answers": ""
      }, {
        "question": "Where Done",
        "questionCode": "where_done",
        "dataType": "CWE",
        "answers": [{
          "text": "Home",
          "code": "1"
        }, {
          "text": "Hospital",
          "code": "2"
        }, {
          "text": "MD Office",
          "code": "3"
        }, {
          "text": "Lab",
          "code": "4"
        }, {
          "text": "Other",
          "code": "5"
        }]
      }, {
        "question": "Comment",
        "questionCode": "comment",
        "dataType": "TX",
        "answers": ""
      }],
      // controls whether the column headers need to be displayed
      showColumnHeaders: true,
      // controls the default answer layout for CWE/CNE typed items if answerLayout is not specified on the item's displayControl.
      // not changeable on a rendered form.
      defaultAnswerLayout: {
        "answerLayout": {
          "type": "COMBO_BOX",
          // "COMBO_BOX" -- use autocompleter
          // "RADIO_CHECKBOX" -- all answers displayed as radio buttons or checkboxes
          "columns": "0" // valid only when "type" is "RADIO_CHECKBOX". Permissible values include:
          // "0" -- flexible
          // "1", "2", "3", "4", "5", "6" -- listed in columns

        }
      },
      // controls whether to use tree lines for indentations
      useTreeLineStyle: true,
      // true -- use tree lines
      // false -- use bars
      // form's table column headers' display names for question text, values and units
      // for now they should not be accessible to users
      columnHeaders: [{
        "name": "Name"
      }, {
        "name": "Value"
      }, {
        "name": "Units"
      }]
    },

    /**
     * Constructor
     * @param data the lforms form definition data
     */
    init: function init(data) {
      this.items = data.items;
      this.code = data.code;
      this.name = data.name;
      this.type = data.type;
      this.codeSystem = data.codeSystem;
      this.hasUserData = data.hasUserData;
      this.template = data.template;
      this.templateOptions = data.templateOptions || {};
      this.PATH_DELIMITER = data.PATH_DELIMITER || "/";
      this.answerLists = data.answerLists;
      this.copyrightNotice = data.copyrightNotice; // when the skip logic rule says the form is done

      this._formDone = false;

      if (LForms.FHIR) {
        this._initializeFormFHIRData(data);
      } // update internal data (_id, _idPath, _codePath, _displayLevel_),
      // that are used for widget control and/or for performance improvement.


      this._initializeInternalData();
    },

    /**
     *  Registers a callback for use if the rendering of the form
     *  requires the asynchronous operations (e.g. the loading of external
     *  resources) which could affect the content.  Potentially, the function could
     *  be called more than once, or after a related group of resources have
     *  completed loading.
     */
    addAsyncChangeListener: function addAsyncChangeListener(listener) {
      if (!this._asyncChangeListeners) this._asyncChangeListeners = [];

      this._asyncChangeListeners.push(listener);
    },

    /**
     *  Calls the listeners registered via addAsyncChangeListener.
     */
    _notifyAsyncChangeListeners: function _notifyAsyncChangeListeners() {
      if (this._asyncChangeListeners) {
        for (var i = 0, len = this._asyncChangeListeners.length; i < len; ++i) {
          this._asyncChangeListeners[i]();
        }
      }
    },

    /**
     *  Initializes form-level FHIR data.  This should be called before item
     *  properties are set up, because it sets properties like this.fhirVersion
     *  which might be needed for processing the items.
     * @param an LForms form definition object (or LFormsData).
     */
    _initializeFormFHIRData: function _initializeFormFHIRData(data) {
      var lfData = this;
      this._asyncLoadCounter = 0;
      this.fhirVersion = data.fhirVersion;
      this._fhir = LForms.FHIR[lfData.fhirVersion];
      this._expressionProcessor = new LForms.ExpressionProcessor(this);
      this._fhirVariables = {};
      this.extension = data.extension;
      this._variableExt = data._variableExt; // FHIR "variable" extensions

      if (LForms.fhirContext) {
        var contextItems = LForms.Util.findObjectInArray(this.extension, 'url', "http://hl7.org/fhir/StructureDefinition/questionnaire-launchContext", 0, true);

        for (var i = 0, len = contextItems.length; i < len; ++i) {
          var contextItemExt = contextItems[i].extension;
          var name;
          var typeList = [];

          for (var j = 0, jLen = contextItemExt.length; j < jLen; ++j) {
            var fieldExt = contextItemExt[j];

            if (!name && fieldExt.url === 'name') {
              name = fieldExt.valueId;

              this._checkFHIRVarName(name); // might throw

            } else if (fieldExt.url === 'type') typeList.push(fieldExt.valueCode);
          }

          if (name && typeList.length > 0) {
            this._asyncLoadCounter++; // Enforce that this is truly asynchronous with setTimeout.
            // Some implementations of getCurrent (e.g in testing) might be
            // synchronous.

            setTimeout(function () {
              LForms.fhirContext.getCurrent(typeList, function (resource) {
                lfData._asyncLoadCounter--;
                if (resource) lfData._fhirVariables[name] = resource;
                if (lfData._asyncLoadCounter === 0) lfData._notifyAsyncChangeListeners();
              });
            }, 1);
          }
        }
      }
    },

    /**
     *  Checks that the given variable name is allowed in FHIR and throws an
     *  exception if it is not.
     */
    _checkFHIRVarName: function _checkFHIRVarName(name) {
      if (this._fhir.reservedVarNames[name]) {
        throw 'The "' + name + '" variable name is reserved; Questionnaires may not ' + 'assign a value to it.';
      }
    },

    /**
     * Calculate internal data from the raw form definition data,
     * including:
     * structural data, (TBD: unless they are already included (when hasUserData == true) ):
     *    _id, _idPath, _codePath
     * data for widget control and/or performance improvement:
     *    _displayLevel_,
     * @private
     */
    _initializeInternalData: function _initializeInternalData() {
      //TODO, validate form data
      // set default values of certain form definition fields
      this._setDefaultValues(); // update internal status


      this._repeatableItems = {};

      this._setTreeNodes(this.items, this);

      this._updateLastRepeatingItemsStatus(this.items); // create a reference list of all items in the tree


      this.itemList = [];
      this.itemHash = {};

      this._updateItemReferenceList(this.items);

      this._standardizeScoreRule(this.itemList); // create horizontal table info


      this._resetHorizontalTableInfo();

      this._adjustLastSiblingListForHorizontalLayout(); // create a navigation map


      this.Navigation.setupNavigationMap(this); // create auto-completer options and assign field default values

      this._setUpDefaultsAndAutocomp(); // set up a mapping from controlling items to controlled items
      // for skip logic, data controls and formulas


      this._setupSourceToTargetMap(); // run the all form controls


      this._checkFormControls();

      if (this._fhir) this._requestLinkedObs();
    },

    /**
     *  Starts the (likely asynchronous) requests to retrieve linked Observation
     *  resources for pre-population.
     */
    _requestLinkedObs: function _requestLinkedObs() {
      if (LForms.fhirContext && this._fhir) {
        // We will need to know what version of FHIR the server is using.  Make
        // sure that is available before continuing.
        var lfData = this;

        if (!LForms._serverFHIRReleaseID) {
          LForms.Util.getServerFHIRReleaseID(function () {
            lfData._requestLinkedObs();
          });
        } else {
          LForms.Util.validateFHIRVersion(LForms._serverFHIRReleaseID);
          var serverFHIR = LForms.FHIR[LForms._serverFHIRReleaseID];

          for (var i = 0, len = this.items.length; i < len; ++i) {
            var item = this.items[i];

            if (item._obsLinkPeriodExt) {
              var duration = item._obsLinkPeriodExt.valueDuration; // optional

              var itemCodeSystem = item.questionCodeSystem || this.codeSystem;
              if (itemCodeSystem === 'LOINC') itemCodeSystem = serverFHIR.LOINC_URI;
              var fhirjs = LForms.fhirContext.getFHIRAPI(); // a fhir.js client

              var queryParams = {
                type: 'Observation',
                query: {
                  code: itemCodeSystem + '|' + item.questionCode,
                  _sort: '-date',
                  _count: 1
                }
              };
              if (LForms._serverFHIRReleaseID != 'STU3') // STU3 does not know about "focus"
                queryParams.query.focus = {
                  $missing: true
                };

              if (duration && duration.value && duration.code) {
                // Convert value to milliseconds
                var result = LForms.ucumPkg.UcumLhcUtils.getInstance().convertUnitTo(duration.code, duration.value, 'ms');

                if (result.status === 'succeeded') {
                  var date = new Date(new Date() - result.toVal);
                  queryParams.query._lastUpdated = 'gt' + date.toISOString();
                }
              }

              this._asyncLoadCounter++;
              fhirjs.search(queryParams).then(function (itemI) {
                return function (successData) {
                  var bundle = successData.data;

                  if (bundle.entry && bundle.entry.length === 1) {
                    var obs = bundle.entry[0].resource;
                    serverFHIR.SDC.importObsValue(itemI, obs);
                    if (itemI.unit) lfData._setUnitDisplay(itemI.unit);
                  }

                  lfData._asyncLoadCounter--;
                  if (lfData._asyncLoadCounter === 0) lfData._notifyAsyncChangeListeners();
                };
              }(item), function (errorData) {
                console.log(errorData);
                lfData._asyncLoadCounter--;
                if (lfData._asyncLoadCounter === 0) lfData._notifyAsyncChangeListeners();
              });
            }
          }
        }
      }
    },

    /**
     * Reset internal structural data when repeatable items/groups are added or removed.
     * @private
     */
    _resetInternalData: function _resetInternalData() {
      // update internal status
      this._updateTreeNodes(this.items, this);

      this._updateLastRepeatingItemsStatus(this.items); // create a reference list of all items in the tree


      this.itemList = [];
      this.itemHash = {};

      this._updateItemReferenceList(this.items);

      this._standardizeScoreRule(this.itemList); // create horizontal table info


      this._resetHorizontalTableInfo();

      this._adjustLastSiblingListForHorizontalLayout(); // create a navigation map


      this.Navigation.setupNavigationMap(this); // create auto-completer options

      this._setUpDefaultsAndAutocomp(); // set up a mapping from controlling items to controlled items
      // for skip logic, data controls and formulas


      this._setupSourceToTargetMap(); // run the all form controls


      this._checkFormControls();
    },

    /**
     * Check skip logic, formulas and data controls when the source item changes.
     * @param sourceItem the controlling/source item
     */
    updateOnSourceItemChange: function updateOnSourceItemChange(sourceItem) {
      // check formula
      if (sourceItem._formulaTargets) {
        for (var i = 0, iLen = sourceItem._formulaTargets.length; i < iLen; i++) {
          var targetItem = sourceItem._formulaTargets[i];

          this._processItemFormula(targetItem);
        }
      } // check data control


      if (sourceItem._dataControlTargets) {
        for (var i = 0, iLen = sourceItem._dataControlTargets.length; i < iLen; i++) {
          var targetItem = sourceItem._dataControlTargets[i];

          this._processItemDataControl(targetItem);
        }
      } // check skip logic


      if (sourceItem._skipLogicTargets) {
        for (var i = 0, iLen = sourceItem._skipLogicTargets.length; i < iLen; i++) {
          var targetItem = sourceItem._skipLogicTargets[i];

          this._updateItemSkipLogicStatus(targetItem, null);
        }
      } // update internal status


      this._updateTreeNodes(this.items, this);

      this._updateLastRepeatingItemsStatus(this.items);

      this._resetHorizontalTableInfo();

      this._adjustLastSiblingListForHorizontalLayout();
    },

    /**
     * Validate user input value
     * Note: Not currently used since validations are handled in an Angular directive.
     * This might be used in the future.
     * @param item the question item
     * @private
     */
    _checkValidations: function _checkValidations(item) {
      if (item._hasValidation) {
        var errors = [];
        var errorRequired = LForms.Validations.checkRequired(item._answerRequired, item.value, errors);
        var errorDataType = LForms.Validations.checkDataType(item.dataType, item.value, errors);
        var errorRestrictions = LForms.Validations.checkRestrictions(item.restrictions, item.value, errors);
        item._validationErrors = errors;
      }
    },

    /**
     * run all form controls when a form data is initially loaded.
     * @private
     */
    _checkFormControls: function _checkFormControls() {
      for (var i = 0, iLen = this.itemList.length; i < iLen; i++) {
        var item = this.itemList[i]; // run formula

        if (item.calculationMethod) {
          this._processItemFormula(item);
        } // run data control


        if (item.dataControl) {
          this._processItemDataControl(item);
        } // run skip logic


        if (item.skipLogic) {
          this._updateItemSkipLogicStatus(item, null);
        } // Hide the item via the skip logic mechanism if _isHidden flag is true. As of 2018-12-19, the _isHidden flag
        // is set to true if the item is converted from a FHIR Questionnaire with questionnaire-hidden extension.


        if (item._isHidden) {
          this._updateItemSkipLogicStatus(item, true);
        }
      } // update internal status


      this._updateTreeNodes(this.items, this);

      this._updateLastRepeatingItemsStatus(this.items);

      this._resetHorizontalTableInfo();

      this._adjustLastSiblingListForHorizontalLayout();
    },

    /**
     * Set up a mapping between controlling/source items and target items on the controlling/source item
     * @private
     */
    _setupSourceToTargetMap: function _setupSourceToTargetMap() {
      for (var i = 0, iLen = this.itemList.length; i < iLen; i++) {
        var item = this.itemList[i]; // formula

        if (item.calculationMethod && item.calculationMethod.name) {
          var sourceItems = this._getFormulaSourceItems(item, item.calculationMethod.value);

          for (var j = 0, jLen = sourceItems.length; j < jLen; j++) {
            if (sourceItems[j]._formulaTargets) {
              sourceItems[j]._formulaTargets.push(item);
            } else {
              sourceItems[j]._formulaTargets = [item];
            }
          }
        } // dataControl


        if (item.dataControl && angular.isArray(item.dataControl)) {
          for (var j = 0, jLen = item.dataControl.length; j < jLen; j++) {
            var source = item.dataControl[j].source; // has a source configuration

            if (source && (!source.sourceType || source.sourceType === this._CONSTANTS.DATA_CONTROL.SOURCE_INTERNAL) && source.sourceItemCode) {
              // get the source item object
              var sourceItem = this._findItemsUpwardsAlongAncestorTree(item, source.sourceItemCode);

              if (sourceItem._dataControlTargets) {
                sourceItem._dataControlTargets.push(item);
              } else {
                sourceItem._dataControlTargets = [item];
              }
            }
          }
        } // skip logic


        if (item.skipLogic) {
          for (var j = 0, jLen = item.skipLogic.conditions.length; j < jLen; j++) {
            var condition = item.skipLogic.conditions[j];

            var sourceItem = this._getSkipLogicSourceItem(item, condition.source);

            if (sourceItem._skipLogicTargets) {
              sourceItem._skipLogicTargets.push(item);
            } else {
              sourceItem._skipLogicTargets = [item];
            }
          }
        }
      }
    },

    /**
     * Update data by running the skip logic on the target item
     * @param item the target item where there is a skip logic
     * @param hide if the parent item is already hidden
     */
    _updateItemSkipLogicStatus: function _updateItemSkipLogicStatus(item, hide) {
      // if one item is hidden all of its decedents should be hidden.
      // not necessary to check skip logic, assuming 'hide' has the priority over 'show'
      if (hide) {
        this._setSkipLogicStatusValue(item, this._CONSTANTS.SKIP_LOGIC.STATUS_HIDE);

        var isHidden = true;
      } // if the item is not hidden, show all its decedents unless they are hidden by other skip logic.
      else {
          if (item.skipLogic) {
            var takeAction = this._checkSkipLogic(item);

            if (!item.skipLogic.action || item.skipLogic.action === this._CONSTANTS.SKIP_LOGIC.ACTION_SHOW) {
              var newStatus = takeAction ? this._CONSTANTS.SKIP_LOGIC.STATUS_SHOW : this._CONSTANTS.SKIP_LOGIC.STATUS_HIDE;

              this._setSkipLogicStatusValue(item, newStatus);
            } else if (item.skipLogic.action === this._CONSTANTS.SKIP_LOGIC.ACTION_HIDE) {
              var newStatus = takeAction ? this._CONSTANTS.SKIP_LOGIC.STATUS_HIDE : this._CONSTANTS.SKIP_LOGIC.STATUS_SHOW;

              this._setSkipLogicStatusValue(item, newStatus);
            }
          } // if there's no skip logic, show it when it was hidden because one of its ancestors was hidden
          else if (item._skipLogicStatus === this._CONSTANTS.SKIP_LOGIC.STATUS_HIDE) {
              this._setSkipLogicStatusValue(item, this._CONSTANTS.SKIP_LOGIC.STATUS_SHOW);
            }

          var isHidden = item._skipLogicStatus === this._CONSTANTS.SKIP_LOGIC.STATUS_HIDE;
        } // process the sub items


      if (item.items && item.items.length > 0) {
        for (var i = 0, iLen = item.items.length; i < iLen; i++) {
          var subItem = item.items[i];

          this._updateItemSkipLogicStatus(subItem, isHidden);
        }
      }
    },

    /**
     * Preset skip logic status for newly added repeating items
     * @param item an item
     * @param hide if the parent item is already hidden
     * @private
     */
    _presetSkipLogicStatus: function _presetSkipLogicStatus(item, hide) {
      // if it has skip logic or one of its ancestors has skip logic
      if (item.skipLogic || hide) {
        this._setSkipLogicStatusValue(item, this._CONSTANTS.SKIP_LOGIC.STATUS_HIDE, true);

        var isHidden = true; // process the sub items

        if (item.items) {
          for (var i = 0, iLen = item.items.length; i < iLen; i++) {
            this._presetSkipLogicStatus(item.items[i], isHidden);
          }
        }
      }
    },

    /**
     * Set the skip logic status value on an item and create a screen reader log
     * @param item an item
     * @param newStatus the new skip logic status
     * @param noLog optional, a flag that decides whether the action needs to be logged, default is false
     * @private
     */
    _setSkipLogicStatusValue: function _setSkipLogicStatusValue(item, newStatus, noLog) {
      if (item._skipLogicStatus !== newStatus) {
        if (item._skipLogicStatus) {
          var msg = newStatus === this._CONSTANTS.SKIP_LOGIC.STATUS_HIDE ? 'Hiding ' + item.question : 'Showing ' + item.question;
          if (!noLog) this._actionLogs.push(msg);
        }

        item._preSkipLogicStatus = item._skipLogicStatus;
        item._skipLogicStatus = newStatus;
      }
    },

    /**
     * Create a list of reference to the items in the tree
     * @param items sibling items on one level of the tree
     * @private
     */
    _updateItemReferenceList: function _updateItemReferenceList(items) {
      for (var i = 0, iLen = items.length; i < iLen; i++) {
        var item = items[i];
        this.itemList.push(item);
        this.itemHash[item._elementId] = item; // process the sub items

        if (item.items && item.items.length > 0) {
          this._updateItemReferenceList(item.items);
        }
      }
    },

    /**
     * Search upwards along the tree structure to find the item with answer scores
     * @param item the item to start with
     * @returns {}
     * @private
     */
    _findItemsWithScoreUpwardsAlongAncestorTree: function _findItemsWithScoreUpwardsAlongAncestorTree(item) {
      var itemsWithScore = []; // check siblings

      var itemToCheck = item;

      while (itemToCheck) {
        // check siblings
        if (itemToCheck._parentItem && Array.isArray(itemToCheck._parentItem.items)) {
          for (var i = 0, iLen = itemToCheck._parentItem.items.length; i < iLen; i++) {
            var sourceItem = itemToCheck._parentItem.items[i]; // it has an answer list

            if ((sourceItem.dataType === 'CNE' || sourceItem.dataType === 'CWE') && sourceItem.answers && Array.isArray(sourceItem.answers) && sourceItem.answers.length > 0) {
              // check if any one of the answers has a score
              for (var j = 0, jLen = sourceItem.answers.length; j < jLen; j++) {
                if (sourceItem.answers[j] && sourceItem.answers[j].score >= 0) {
                  itemsWithScore.push(sourceItem.questionCode);
                  break;
                }
              } // end of answers loop

            } // end if there's an answer list

          }
        } // check ancestors and each ancestors siblings


        itemToCheck = itemToCheck._parentItem;
      }

      return itemsWithScore;
    },

    /**
     * Convert the score rule definition to the standard formula definition
     * @param itemList the reference list of the items in the tree
     * @private
     */
    _standardizeScoreRule: function _standardizeScoreRule(itemList) {
      for (var i = 0, iLen = itemList.length; i < iLen; i++) {
        var totalScoreItem = itemList[i];

        if (totalScoreItem.calculationMethod && (totalScoreItem.calculationMethod.name === this._CONSTANTS.CALCULATION_METHOD.TOTALSCORE || totalScoreItem.calculationMethod === this._CONSTANTS.CALCULATION_METHOD.TOTALSCORE)) {
          // TBD, if the parameters values are already supplied,
          totalScoreItem.calculationMethod = {
            "name": this._CONSTANTS.CALCULATION_METHOD.TOTALSCORE,
            "value": []
          };

          var itemsWithScore = this._findItemsWithScoreUpwardsAlongAncestorTree(totalScoreItem);

          totalScoreItem.calculationMethod.value = itemsWithScore;
        }
      }
    },

    /**
     * Set default values if the data is missing.
     * @private
     */
    _setDefaultValues: function _setDefaultValues() {
      this._codePath = "";
      this._idPath = "";
      this._displayLevel = 0;
      this._activeItem = null; // type

      if (!this.type || this.type.length == 0) {
        this.type = "LOINC";
      } // question coding system


      if (this.type === "LOINC" && !this.codeSystem) {
        this.codeSystem = "LOINC";
      } // add a link to external site for item's definition


      if (this.codeSystem === "LOINC") {
        this._linkToDef = "http://s.details.loinc.org/LOINC/" + this.code + ".html";
      } // template


      if (!this.template || this.template.length == 0 || this.template === "form-view-a" || this.template === "form-view-b") {
        this.template = "table";
      } // templateOptions
      // not to use deep copy here, because of the unexpected deep copy result on arrays.
      // make a copy of the existing options of the form data


      var currentOptions = angular.copy(this.templateOptions);
      var defaultOptions = angular.copy(this._defaultTemplateOptions);
      this.setTemplateOptions(currentOptions, defaultOptions); // process values in templateOptions.formHeaderItems,

      if (this.templateOptions.formHeaderItems) {
        for (var i = 0, iLen = this.templateOptions.formHeaderItems.length; i < iLen; i++) {
          var item = this.templateOptions.formHeaderItems[i];

          if (item.value && item.dataType === this._CONSTANTS.DATA_TYPE.DT) {
            item.value = LForms.Util.stringToDate(item.value);
          }
        }
      }
    },

    /**
     * Merge two arrays of objects.
     * Any object or field value that is null are skipped.
     * Note: Used in setTemplateOptions only. Not supposed to be used by other functions.
     * @param array1 the array where data are merged to
     * @param array2 the array where data are merged from.
     * @private
     */
    _mergeTwoArrays: function _mergeTwoArrays(array1, array2) {
      for (var i = 0, iLen = array2.length; i < iLen; i++) {
        // if the element is not null or undefined
        if (array2[i]) {
          var fields = Object.keys(array2[i]);

          for (var j = 0, jLen = fields.length; j < jLen; j++) {
            // if the value is not null or undefined
            if (array2[i][fields[j]] !== null || array2[i][fields[j]] !== undefined) {
              // update the value on the field in array 1.
              // no duplicated angular.copy here on the value if array2 contains copies of the objects already
              array1[i][fields[j]] = array2[i][fields[j]];
            }
          }
        }
      }
    },

    /**
     * Set template options
     * @param newOptions new options to be merged with existing options
     * @param existingOptions existing options in the form data
     */
    setTemplateOptions: function setTemplateOptions(newOptions, existingOptions) {
      if (newOptions) {
        if (!existingOptions) existingOptions = angular.copy(this.templateOptions); // get the fields that contains array

        var columnHeaders = newOptions.columnHeaders;
        delete newOptions.columnHeaders; // merge the options

        this.templateOptions = jQuery.extend({}, existingOptions, newOptions); // process columnHeaders

        if (columnHeaders) {
          this._mergeTwoArrays(this.templateOptions.columnHeaders, columnHeaders);
        } // if there is a new formHeaderItems array, set up autocomplete options


        if (newOptions.formHeaderItems) this._setUpDefaultsAndAutocomp(true);
      }
    },

    /**
     * Set up the internal data for each item in the tree
     * @param items sibling items on one level of the tree
     * @param parentItem the parent item
     * @private
     */
    _setTreeNodes: function _setTreeNodes(items, parentItem) {
      var iLen = items.length,
          lastSiblingIndex = iLen - 1;
      var prevSibling = null,
          itemId = 1; // for each item on this level

      for (var i = 0; i < iLen; i++) {
        var item = items[i]; // set default dataType

        if (item.header) {
          if (item.dataType !== this._CONSTANTS.DATA_TYPE.TITLE) item.dataType = this._CONSTANTS.DATA_TYPE.SECTION;
        } else {
          // set data type for items with units (for unified display styles)
          if (item.units && !item.dataType) {
            item.dataType = this._CONSTANTS.DATA_TYPE.REAL;
          } // Make it a "ST" if it has a formula to avoid any mismatches of the data type in the model.
          // A type=number INPUT would require a number typed variable in the model. A string containing a number is not enough.
          // An error will be thrown in this case and an empty value will be set instead.
          else if (!item.dataType || item.calculationMethod !== undefined && !jQuery.isEmptyObject(item.calculationMethod)) item.dataType = this._CONSTANTS.DATA_TYPE.ST;
        } // displayControl default values


        if (item.dataType === "SECTION") {
          if (!item.displayControl) {
            item.displayControl = {
              "questionLayout": "vertical"
            };

            if (item.layout) {
              // rename layout for backward compatibility
              item.displayControl.questionLayout = item.layout;
              delete item.layout;
            }
          } else if (!item.displayControl.questionLayout) {
            item.displayControl.questionLayout = "vertical";
          }
        } else if (item.dataType === "CWE" || item.dataType === "CNE") {
          if (!item.displayControl) {
            item.displayControl = angular.copy(this.templateOptions.defaultAnswerLayout);
          } else if (!item.displayControl.answerLayout) {
            item.displayControl.answerLayout = angular.copy(this.templateOptions.defaultAnswerLayout.answerLayout);
          }
        }

        this._updateItemAttrs(item); // reset answers if it is an answer list id


        if ((angular.isString(item.answers) || angular.isNumber(item.answers)) && this.answerLists && angular.isArray(this.answerLists[item.answers])) {
          item.answers = this.answerLists[item.answers];
        } // If there are answers for an answer list and there is a value, replace
        // the value objects with the corresponding objects from the answer list,
        // so that when they are displayed as radio buttons, angular will recognize the
        // one or more answer options as equal to the values.


        this._setModifiedAnswers(item); // sets item._modifiedAnswers


        if (item.answers) {
          var vals = item.value || item.defaultAnswer;

          if (vals) {
            vals = angular.isArray(vals) ? vals : [vals];
            var listVals = [];

            for (var k = 0, kLen = vals.length; k < kLen; ++k) {
              var val = vals[k];
              var valKey = val.label !== undefined && val.label !== null ? 'label' : val.code !== undefined && val.code !== null ? 'code' : 'text'; // val should be a hash, but to preserve current behavior, a string is allowed.

              var valValue = typeof val === 'string' ? val : val[valKey];
              var found = false;

              for (var j = 0, jLen = item.answers.length; !found && j < jLen; ++j) {
                var ans = item.answers[j];

                if (valValue == ans[valKey]) {
                  listVals.push(item._modifiedAnswers[j]);
                  found = true;
                }
              } // a saved value not in the list


              if (item.value && !found) {
                val._displayText = val.text;
                listVals.push(val);
              }
            }

            item.value = item._multipleAnswers ? listVals : listVals[0];
          }
        } // normalize unit value if there is one, needed by calculationMethod


        if (item.unit && !item.unit.text) {
          item.unit.text = item.unit.name;
        } // id


        if (item._questionRepeatable && prevSibling && prevSibling.questionCode === item.questionCode) {
          itemId += 1;
        } else {
          itemId = 1;
        }

        item._id = itemId; // code path, id path, element id

        item._codePath = parentItem._codePath + this.PATH_DELIMITER + item.questionCode;
        item._idPath = parentItem._idPath + this.PATH_DELIMITER + item._id;
        item._elementId = item._codePath + item._idPath;
        item._displayLevel = parentItem._displayLevel + 1; // linkId for Questionnaire

        if (!item.linkId) {
          item.linkId = item._codePath;
        } // set last sibling status


        item._lastSibling = i === lastSiblingIndex; // set the first sibling status

        item._firstSibling = i === 0; // set up tooltip and process user data if there's any user data.

        if (!item._readOnly) {
          switch (item.dataType) {
            case this._CONSTANTS.DATA_TYPE.DT:
              item._toolTip = "MM/DD/YYYY"; // process user data

              if (item.value) {
                item.value = LForms.Util.stringToDate(item.value);
              }

              break;

            case this._CONSTANTS.DATA_TYPE.CNE:
              if (item.externallyDefined) item._toolTip = item._multipleAnswers ? "Search for values" : "Search for value";else item._toolTip = item._multipleAnswers ? "Select one or more" : "Select one";
              break;

            case this._CONSTANTS.DATA_TYPE.CWE:
              if (item.externallyDefined) item._toolTip = item._multipleAnswers ? "Search for or type values" : "Search for or type a value";else item._toolTip = item._multipleAnswers ? "Select one or more or type a value" : "Select one or type a value";
              break;

            case "SECTION":
            case "TITLE":
            case "":
              item._toolTip = "";
              break;

            case this._CONSTANTS.DATA_TYPE.INT:
            case this._CONSTANTS.DATA_TYPE.REAL:
            case this._CONSTANTS.DATA_TYPE.QTY:
              item._toolTip = "Type a number"; // internally all numeric values are of string type

              if (typeof item.value === "number") item.value = item.value + "";
              break;

            default:
              {
                item._toolTip = "Type a value";
              }
          }
        } // set up validation flag


        if (item._answerRequired || item.restrictions || item.dataType !== this._CONSTANTS.DATA_TYPE.ST && item.dataType !== this._CONSTANTS.DATA_TYPE.TX && item.dataType !== this._CONSTANTS.DATA_TYPE.CWE && item.dataType !== this._CONSTANTS.DATA_TYPE.CNE) {
          item._hasValidation = true;
        } // question coding system


        if (this.type === "LOINC" && !item.questionCodeSystem) {
          item.questionCodeSystem = "LOINC";
        } // add a link to external site for item's definition


        if (item.questionCodeSystem === "LOINC") {
          item._linkToDef = "http://s.details.loinc.org/LOINC/" + item.questionCode + ".html";
        } // process the sub items


        if (item.items && item.items.length > 0) {
          this._setTreeNodes(item.items, item);
        } // keep a copy of the repeatable items, only for the first of the same repeating items
        // before the parentItem is added to avoid circular reference that make the angular.copy really slow


        if (item._questionRepeatable && item._id === 1) {
          var itemRepeatable = angular.copy(item); // remove user data

          this._removeUserData(itemRepeatable);

          this._repeatableItems[item._codePath] = itemRepeatable;
        } // set a reference to its parent item


        item._parentItem = parentItem; // keep a reference to the previous item for checking repeating items.

        prevSibling = item;
      }
    },

    /**
     * Remove user data on an item or on all items in a section
     * @param item an item
     * @private
     */
    _removeUserData: function _removeUserData(item) {
      item.value = null;
      item.unit = null;

      if (item.items && item.items.length > 0) {
        for (var i = 0, iLen = item.items.length; i < iLen; i++) {
          this._removeUserData(item.items[i]);
        }
      }
    },

    /**
     *  Sets some tree node attributes which need to be updated by both _setTreeNodes
     *  and _updateTreeNodes.
     * @param item the item whose attributes need to set or updated.
     */
    _updateItemAttrs: function _updateItemAttrs(item) {
      // set default values on the item
      // questionCardinality
      if (!item.questionCardinality) {
        item.questionCardinality = {
          "min": "1",
          "max": "1"
        };
      } // answerCardinality


      if (!item.answerCardinality) {
        item.answerCardinality = {
          "min": "0",
          "max": "1"
        };
      } // set up flags for question and answer cardinality


      item._questionRepeatable = item.questionCardinality.max && (item.questionCardinality.max === "*" || parseInt(item.questionCardinality.max) > 1);
      item._answerRequired = item.answerCardinality.min && item.answerCardinality.min && parseInt(item.answerCardinality.min) >= 1;
      item._multipleAnswers = item.answerCardinality.max && (item.answerCardinality.max === "*" || parseInt(item.answerCardinality.max) > 1); // set up readonly flag

      item._readOnly = item.editable && item.editable === "0" || !!(item.calculationMethod || item._calculatedExprExt);
      var lfData = this;

      if (LForms.FHIR && lfData.fhirVersion) {
        lfData.hasFHIRPath = lfData.hasFHIRPath || item._calculatedExprExt && item._calculatedExprExt.valueExpression.language == "text/fhirpath";
        lfData._hasInitialExpr = lfData._hasInitialExpr || item._initialExprExt && item._initialExprExt.valueExpression.language == "text/fhirpath";
      }
    },

    /**
     * Update the internal data for each item in the tree when items are added or removed or the values change
     * @param items sibling items on one level of the tree
     * @param parentItem the parent item
     * @private
     */
    _updateTreeNodes: function _updateTreeNodes(items, parentItem) {
      // for each item on this level
      var iLen = items.length,
          lastSiblingIndex = iLen - 1;
      var foundLastSibling = false;

      for (var i = iLen - 1; i >= 0; i--) {
        var item = items[i];
        if (!item._id) item._id = 1;
        item._codePath = parentItem._codePath + this.PATH_DELIMITER + item.questionCode;
        item._idPath = parentItem._idPath + this.PATH_DELIMITER + item._id;
        item._elementId = item._codePath + item._idPath;
        item._displayLevel = parentItem._displayLevel + 1;
        item._parentItem = parentItem;
        item._repeatingSectionList = null; // linkId for Questionnaire

        if (!item.linkId) {
          item.linkId = item._codePath;
        }

        this._updateItemAttrs(item); // set the last sibling status


        item._lastSibling = i === lastSiblingIndex; // consider if the last sibling is hidden by skip logic

        if (!foundLastSibling) {
          if (item._skipLogicStatus === this._CONSTANTS.SKIP_LOGIC.STATUS_HIDE) {
            item._lastSibling = false;
            lastSiblingIndex -= 1;
          } else {
            item._lastSibling = true;
            foundLastSibling = true;
          }
        } // keep a copy of the repeatable items, only for the first of the same repeating items
        // before the parentItem is added to avoid circular reference that make the angular.copy really slow


        if (item._questionRepeatable && item._id === 1 && !this._repeatableItems[item._codePath]) {
          delete item._parentItem;
          var itemRepeatable = angular.copy(item); // remove user data

          this._removeUserData(itemRepeatable);

          this._repeatableItems[item._codePath] = itemRepeatable;
        }

        item._parentItem = parentItem; // process the sub items

        if (item.items && item.items.length > 0) {
          this._updateTreeNodes(item.items, item);
        }
      } // check first sibling status


      var foundFirstSibling = false;
      var firstSiblingIndex = 0;

      for (var i = 0; i < iLen; i++) {
        var item = items[i]; // set the first sibling status

        item._firstSibling = i === firstSiblingIndex; // consider if the first sibling is hidden by skip logic

        if (!foundFirstSibling) {
          if (item._skipLogicStatus === this._CONSTANTS.SKIP_LOGIC.STATUS_HIDE) {
            item._firstSibling = false;
            firstSiblingIndex += 1;
          } else {
            item._firstSibling = true;
            foundFirstSibling = true;
          }
        }
      }
    },

    /**
     * Get the complete form definition data, including the user input data from the form.
     * The returned data could be fed into a LForms widget directly to render the form.
     * @param noEmptyValue optional, to remove items that have an empty value, the default is false.
     * @param noHiddenItem optional, to remove items that are hidden by skip logic, the default is false.
     * @param keepIdPath optional, to keep _idPath field on item, the default is false
     * @param keepCodePath optional, to keep _codePath field on item, the default is false
     * @return {{}} form definition JSON object
     */
    getFormData: function getFormData(noEmptyValue, noHiddenItem, keepIdPath, keepCodePath) {
      // get the form data
      var formData = this.getUserData(false, noEmptyValue, noHiddenItem, keepIdPath, keepCodePath);
      var defData = {
        PATH_DELIMITER: this.PATH_DELIMITER,
        code: this.code,
        codeSystem: this.codeSystem,
        name: this.name,
        type: this.type,
        template: this.template,
        copyrightNotice: this.copyrightNotice,
        items: formData.itemsData,
        templateOptions: angular.copy(this.templateOptions)
      }; // reset obr fields

      defData.templateOptions.formHeaderItems = formData.templateData;
      return defData;
    },

    /**
     * Get user input data from the form, with or without form definition data.
     * @param noFormDefData optional, to not include form definition data, the default is false.
     * @param noEmptyValue optional, to remove items that have an empty value, the default is false.
     * @param noHiddenItem optional, to remove items that are hidden by skip logic, the default is false.
     * @param keepIdPath optional, to keep _idPath field on item, the default is false
     * @param keepCodePath optional, to keep _codePath field on item, the default is false
     * @returns {{itemsData: (*|Array), templateData: (*|Array)}} form data and template data
     */
    getUserData: function getUserData(noFormDefData, noEmptyValue, noHiddenItem, keepIdPath, keepCodePath) {
      var ret = {};
      ret.itemsData = this._processDataInItems(this.items, noFormDefData, noEmptyValue, noHiddenItem, keepIdPath, keepCodePath); // template options could be optional. Include them, only if they are present

      if (this.templateOptions && this.templateOptions.showFormHeader && this.templateOptions.formHeaderItems) {
        ret.templateData = this._processDataInItems(this.templateOptions.formHeaderItems, noFormDefData, noEmptyValue, noHiddenItem, keepIdPath, keepCodePath);
      } // return a deep copy of the data


      return angular.copy(ret);
    },

    /**
     *  Retuns true if the given item's value is empty.
     * @param item an LFormsData entry from "items".
     */
    isEmpty: function isEmpty(item) {
      return item.value === undefined || item.value === null;
    },

    /**
     * Process each item on each level of the tree structure
     * @param items the items array
     * @param noFormDefData optional, to not include form definition data, the default is false.
     * @param noEmptyValue optional, to remove items that have an empty value, the default is false.
     * @param noHiddenItem optional, to remove items that are hidden by skip logic, the default is false.
     * @param keepIdPath optional, to keep _idPath field on item, the default is false
     * @param keepCodePath optional, to keep _codePath field on item, the default is false
     * @returns {Array} form data on one tree level
     * @private
     */
    _processDataInItems: function _processDataInItems(items, noFormDefData, noEmptyValue, noHiddenItem, keepIdPath, keepCodePath) {
      var itemsData = [];

      for (var i = 0, iLen = items.length; i < iLen; i++) {
        var item = items[i];
        var itemData = {}; // skip the item if the value is empty and the flag is set to ignore the items with empty value
        // or if the item is hidden and the flag is set to ignore hidden items

        if (noHiddenItem && (item._skipLogicStatus === this._CONSTANTS.SKIP_LOGIC.STATUS_HIDE || item._isHidden) || noEmptyValue && this.isEmpty(item) && !item.header) {
          continue;
        } // include only the code and the value (and unit, other value) if no form definition data is needed


        if (noFormDefData) {
          itemData.questionCode = item.questionCode; // not a header

          if (!item.header) {
            if (item.value !== undefined) itemData.value = this._getOriginalValue(item.value, item.dataType);
            if (item.unit) itemData.unit = this._getOriginalValue(item.unit);
            if (item.valueOther) itemData.valueOther = item.valueOther; // "other value" is a string value
          }
        } // otherwise include form definition data
        else {
            // process fields
            for (var field in item) {
              // special handling for user input values
              if (field === "value") {
                itemData[field] = this._getOriginalValue(item[field], item.dataType);
              } else if (field === "unit") {
                itemData[field] = this._getOriginalValue(item[field]);
              } // ignore the internal lforms data and angular data
              else if (!field.match(/^[_\$]/)) {
                  itemData[field] = item[field];
                }

              if (keepIdPath) {
                itemData["_idPath"] = item["_idPath"];
              }

              if (keepCodePath) {
                itemData["_codePath"] = item["_codePath"];
              }
            }
          } // process the sub items


        if (item.items && item.items.length > 0) {
          itemData.items = this._processDataInItems(item.items, noFormDefData, noEmptyValue, noHiddenItem, keepIdPath, keepCodePath);
        } // not to add the section header if noEmptyValue is set, and
        // all its children has empty value (thus have not been added either) or it has not children, and
        // it has an empty value (empty object, empty array)


        if (!noEmptyValue || itemData.items && itemData.items.length !== 0 || !LForms.Util.isItemValueEmpty(item.value)) {
          itemsData.push(itemData);
        }
      }

      return itemsData;
    },

    /**
     * Process values for a user selected/typed answer or unit.
     * Also remove internal data whose field/key names start with _.
     * @param obj either an answer object or a unit object
     * @param autocompleteData optional, a flag indicates it is the data
     * handled by autocomplete-lhc. default is false.
     * @returns {{}}  a new object with the internal attributes removed.
     * @private
     */
    _filterInternalData: function _filterInternalData(obj, autocompleteData) {
      var objReturn = {}; // special handling for the user-typed value for CWE data type

      if (autocompleteData && obj._notOnList && obj._displayText) {
        objReturn = {
          text: obj._displayText
        };
      } else {
        for (var field in obj) {
          if (!field.match(/^[_\$]/)) {
            objReturn[field] = obj[field];
          }
        }
      }

      return objReturn;
    },

    /**
     * Process value where it is an object or an array of objects
     * @param value the captured value
     * @param autocompleteData optional, a flag indicates it is the data
     * handled by autocomplete-lhc. default is false.
     * @returns {*}
     * @private
     */
    _getObjectValue: function _getObjectValue(value, autocompleteData) {
      var retValue = null;

      if (value) {
        // an array
        if (Array.isArray(value)) {
          var answers = [];

          for (var j = 0, jLen = value.length; j < jLen; j++) {
            if (angular.isObject(value[j])) {
              answers.push(this._filterInternalData(value[j], autocompleteData));
            } // for primitive data type (multiple values not supported yet)
            //else {
            //  answers.push(value[j]);
            //}

          }

          retValue = answers;
        } // an object
        else if (angular.isObject(value)) {
            retValue = this._filterInternalData(value, autocompleteData);
          }
      }

      return retValue;
    },

    /**
     * Special handling for user input values, to get the original answer or unit object if there is one
     * @param value the data object of the selected answer
     * @param dataType optional, the data type of the value
     * @private
     */
    _getOriginalValue: function _getOriginalValue(value, dataType) {
      var retValue;

      if (value !== undefined && value !== null) {
        // has a data type
        if (dataType) {
          switch (dataType) {
            case this._CONSTANTS.DATA_TYPE.INT:
              retValue = parseInt(value);
              break;

            case this._CONSTANTS.DATA_TYPE.REAL:
            case this._CONSTANTS.DATA_TYPE.QTY:
              retValue = parseFloat(value);
              break;

            case this._CONSTANTS.DATA_TYPE.DT:
              retValue = LForms.Util.dateToString(value);
              break;

            case this._CONSTANTS.DATA_TYPE.CNE:
            case this._CONSTANTS.DATA_TYPE.CWE:
              retValue = this._getObjectValue(value, true);
              break;

            case this._CONSTANTS.DATA_TYPE.BL:
              retValue = value ? true : false;
              break;

            default:
              retValue = value;
          }
        } // it is for units when there is no dataType
        else {
            retValue = this._getObjectValue(value, true);
          }
      }

      return retValue;
    },

    /**
     * Get the max _id of the repeating item on the same level
     * @param item an item
     * @returns {number}
     */
    getRepeatingItemMaxId: function getRepeatingItemMaxId(item) {
      var maxId = item._id;

      if (item._parentItem && Array.isArray(item._parentItem.items)) {
        for (var i = 0, iLen = item._parentItem.items.length; i < iLen; i++) {
          if (item._parentItem.items[i]._codePath == item._codePath && item._parentItem.items[i]._id > maxId) {
            maxId = item._parentItem.items[i]._id;
          }
        }
      }

      return maxId;
    },

    /**
     * Get the count of the repeating item on the same level
     * @param item an item
     * @returns {number}
     */
    getRepeatingItemCount: function getRepeatingItemCount(item) {
      var count = 0;

      if (item._parentItem && Array.isArray(item._parentItem.items)) {
        for (var i = 0, iLen = item._parentItem.items.length; i < iLen; i++) {
          if (item._parentItem.items[i]._codePath == item._codePath) {
            count++;
          }
        }
      }

      return count;
    },

    /**
     * Update the last repeating item status on each item
     * @param items sibling items on one level of the tree
     * @private
     */
    _updateLastRepeatingItemsStatus: function _updateLastRepeatingItemsStatus(items) {
      var iLen = items.length;
      var prevCodePath = ''; // process all items in the array except the last one

      for (var i = 0; i < iLen; i++) {
        var item = items[i];

        if (prevCodePath !== '') {
          // it's a different item, and
          // previous item is a repeating item, set the flag as the last in the repeating set
          items[i - 1]._lastRepeatingItem = !!(prevCodePath !== item._codePath && items[i - 1]._questionRepeatable);
        }

        prevCodePath = item._codePath; // check sub levels

        if (item.items && item.items.length > 0) {
          this._updateLastRepeatingItemsStatus(item.items);
        }
      } // the last item in the array


      items[iLen - 1]._lastRepeatingItem = !!items[iLen - 1]._questionRepeatable; // check sub levels

      if (items[iLen - 1].items && items[iLen - 1].items.length > 0) {
        this._updateLastRepeatingItemsStatus(items[iLen - 1].items);
      }
    },

    /**
     * Get the last item that will be displayed in a repeating section
     * @param item an item
     * @returns {*}
     * @private
     */
    _getLastSubItem: function _getLastSubItem(item) {
      var retItem = item;

      if (item && Array.isArray(item.items) && item.items.length > 0) {
        var lastItem,
            i = item.items.length,
            found = false; // found the last item that is not hidden

        do {
          lastItem = item.items[--i];

          if (lastItem._skipLogicStatus !== this._CONSTANTS.SKIP_LOGIC.STATUS_HIDE) {
            found = true;
          }
        } while (!found);

        if (found) {
          retItem = this._getLastSubItem(lastItem);
        }
      }

      return retItem;
    },

    /**
     * Set up the internal data for handling the horizontal table
     * Note:
     * 1) "questionLayout" values 'horizontal','vertical' and 'matrix' are only set on items whose "header" is true
     * 2) any items within a 'horizontal' table must be a leaf node. i.e. it cannot contain any sub items.
     * 3) all items within a 'horizontal' table has it's "_inHorizontalTable" set to true.
     * 4) _repeatableItems is reused for adding a repeating row in a horizontal table. but the header item will not be added.
     * i.e. the table should not have more than one table title
     *
     * _horizontalTableInfo structure:
     * _horizontalTableInfo: {
     *    headerItem._horizontalTableId : {
     *      tableStartIndex: firstItemIndex (=== firstHeaderItemIndex === h1),
     *      tableEndIndex:   lastItemIndex,
     *      columnHeaders:   [ { label: item.question, id: 'col' + item._elementId, displayControl: item.displayControl },
     *                       ...],
     *      tableHeaders:    [headerItem1, headerItem2, ...]
     *      tableRows:       [{ header: headerItem1, cells : [rowItem11, rowItem12,...]},
     *                        { header: headerItem2, cells : [rowItem21, rowItem22,...]},
     *                       ... ],
     *      lastHeaderId:    lastHeaderId
     *    }
     *  }
     * @private
     */
    _resetHorizontalTableInfo: function _resetHorizontalTableInfo() {
      this._horizontalTableInfo = {};
      var tableHeaderCodePathAndParentIdPath = null;
      var lastHeaderId = null;

      for (var i = 0, iLen = this.itemList.length; i < iLen; i++) {
        var item = this.itemList[i]; // header item and horizontal layout

        if (item.header && item.displayControl && item.displayControl.questionLayout == "horizontal") {
          // same methods for repeating items could be used for repeating and non-repeating items.
          // (need to rename function names in those 'repeatable' functions.)
          var itemsInRow = [];
          var columnHeaders = [];
          item._inHorizontalTable = true;
          var itemCodePathAndParentIdPath = item._codePath + item._parentItem._idPath;
          lastHeaderId = item._elementId; // if it's the first row (header) of the first table,

          if (tableHeaderCodePathAndParentIdPath === null || tableHeaderCodePathAndParentIdPath !== itemCodePathAndParentIdPath) {
            // indicate this item is the table header
            tableHeaderCodePathAndParentIdPath = itemCodePathAndParentIdPath;
            item._horizontalTableHeader = true;
            item._horizontalTableId = tableHeaderCodePathAndParentIdPath;
            itemsInRow = item.items;

            for (var j = 0, jLen = itemsInRow.length; j < jLen; j++) {
              columnHeaders.push({
                label: itemsInRow[j].question,
                id: "col" + itemsInRow[j]._elementId,
                displayControl: itemsInRow[j].displayControl
              }); // indicate the item is in a horizontal table

              itemsInRow[j]._inHorizontalTable = true;
            }

            this._horizontalTableInfo[tableHeaderCodePathAndParentIdPath] = {
              tableStartIndex: i,
              tableEndIndex: i + itemsInRow.length,
              columnHeaders: columnHeaders,
              tableRows: [{
                header: item,
                cells: itemsInRow
              }],
              tableHeaders: [item]
            }; // set the last table/row in horizontal group/table flag

            this._horizontalTableInfo[tableHeaderCodePathAndParentIdPath]['lastHeaderId'] = lastHeaderId;
          } // if it's the following rows, update the tableRows and tableEndIndex
          else if (tableHeaderCodePathAndParentIdPath === itemCodePathAndParentIdPath) {
              item._horizontalTableHeader = false;
              itemsInRow = item.items;

              for (var j = 0, jLen = itemsInRow.length; j < jLen; j++) {
                // indicate the item is in a horizontal table
                itemsInRow[j]._inHorizontalTable = true;
              } // update rows index


              this._horizontalTableInfo[tableHeaderCodePathAndParentIdPath].tableRows.push({
                header: item,
                cells: itemsInRow
              }); // update headers index (hidden)


              this._horizontalTableInfo[tableHeaderCodePathAndParentIdPath].tableHeaders.push(item); // update last item index in the table


              this._horizontalTableInfo[tableHeaderCodePathAndParentIdPath].tableEndIndex = i + itemsInRow.length; // set the last table/row in horizontal group/table flag

              this._horizontalTableInfo[tableHeaderCodePathAndParentIdPath]['lastHeaderId'] = lastHeaderId;
            }
        }
      }
    },

    /**
     * Adjust the last sibling list for the first header item of horizontal tables
     * @private
     */
    _adjustLastSiblingListForHorizontalLayout: function _adjustLastSiblingListForHorizontalLayout() {
      var horizontalTables = this._horizontalTableInfo;

      for (var tableId in horizontalTables) {
        var tableHeaders = horizontalTables[tableId].tableHeaders;

        if (tableHeaders.length > 1) {
          // Pass the last header's last sibling status to the first header,
          // which is used for controlling the tree lines of the horizontal table.
          var firstTableHeader = tableHeaders[0];
          var lastTableHeader = tableHeaders[tableHeaders.length - 1];
          firstTableHeader._lastSibling = lastTableHeader._lastSibling; ////firstTableHeader._lastSiblingList = lastTableHeader._lastSiblingList;
        }
      }
    },

    /**
     * Add a repeating item or a repeating section after the specified item
     * and update form status
     * @param item a repeating item or a repeating group item
     * @returns the newly added item or a header item of the newly added section
     */
    addRepeatingItems: function addRepeatingItems(item) {
      var maxRecId = this.getRepeatingItemMaxId(item);
      var newItem = angular.copy(this._repeatableItems[item._codePath]);
      newItem._id = maxRecId + 1;

      if (item._parentItem && Array.isArray(item._parentItem.items)) {
        var insertPosition = 0;

        for (var i = 0, iLen = item._parentItem.items.length; i < iLen; i++) {
          if (item._parentItem.items[i]._codePath == item._codePath && item._parentItem.items[i]._idPath == item._idPath) {
            insertPosition = i;
            break;
          }
        }

        item._parentItem.items.splice(insertPosition + 1, 0, newItem);

        newItem._parentItem = item._parentItem; // preset the skip logic status to target-hide on the new items

        this._presetSkipLogicStatus(newItem, false);
      }

      this._resetInternalData();

      var readerMsg = 'Added ' + this.itemDescription(item);

      this._actionLogs.push(readerMsg);

      return newItem;
    },

    /**
     * Add a repeating item or a repeating section at the end of the repeating group
     * and update form status
     * @param item a repeating item or a repeating group item
     * @returns the newly added item or a header item of the newly added section
     */
    appendRepeatingItems: function appendRepeatingItems(item) {
      var maxRecId = this.getRepeatingItemMaxId(item);
      var newItem = angular.copy(this._repeatableItems[item._codePath]);
      newItem._id = maxRecId + 1;

      if (item._parentItem && Array.isArray(item._parentItem.items)) {
        var insertPosition = 0;
        var inRepeating = false;

        for (var i = 0, iLen = item._parentItem.items.length; i < iLen; i++) {
          if (item._parentItem.items[i]._codePath === item._codePath) {
            inRepeating = true;
          }

          if (inRepeating && item._parentItem.items[i]._codePath !== item._codePath) {
            insertPosition = i;
            break;
          }
        } // until the last item


        if (inRepeating && i === iLen) {
          insertPosition = i;
        }

        item._parentItem.items.splice(insertPosition, 0, newItem);

        newItem._parentItem = item._parentItem; // preset the skip logic status to target-hide on the new items

        this._presetSkipLogicStatus(newItem, false);
      }

      this._resetInternalData();

      var readerMsg = 'Added ' + this.itemDescription(item);

      this._actionLogs.push(readerMsg);

      return newItem;
    },

    /**
     * Check if any of the repeating item or group has no user input values.
     * @param item a repeating item or a repeating group item
     * @returns {boolean}
     */
    areAnyRepeatingItemsEmpty: function areAnyRepeatingItemsEmpty(item) {
      var anyEmpty = false;

      var repeatingItems = this._getRepeatingItems(item);

      for (var i = 0, iLen = repeatingItems.length; i < iLen; i++) {
        // reset the message flag
        repeatingItems[i]._showUnusedItemWarning = false; // check if there is no user input for this item/section

        var empty = this._isRepeatingItemEmpty(repeatingItems[i]);

        if (empty) anyEmpty = true;
      }

      if (anyEmpty) {
        // set the flag to show the warning about unused repeating items
        item._showUnusedItemWarning = true;
      }

      return anyEmpty;
    },

    /**
     * Check if a repeating item has no user input value or
     * all items within a repeating group item have no user input values
     * @param item a repeating item or a repeating group item
     * @returns {boolean}
     */
    _isRepeatingItemEmpty: function _isRepeatingItemEmpty(item) {
      var isEmpty = true; //if it is not hidden

      if (item._skipLogicStatus !== this._CONSTANTS.SKIP_LOGIC.STATUS_HIDE) {
        // multiple selection answer list (array is also an object)
        if (angular.isArray(item.value) && item.value.length > 0) {
          var notEmpty = false;

          for (var i = 0, iLen = item.value.length; i < iLen; i++) {
            if (item.value[i].text) notEmpty = item.value[i].text !== undefined && item.value[i].text !== null && item.value[i].text !== "";
            if (notEmpty) break;
          }

          isEmpty = !notEmpty;
        } // single selection answer list
        else if (angular.isObject(item.value)) {
            isEmpty = item.value.text === undefined || item.value.text === null || item.value.text === "";
          } // simple type
          else if (item.value !== undefined && item.value !== null && item.value !== "") {
              isEmpty = false;
            } // check sub items


        if (isEmpty && item.items) {
          for (var j = 0, jLen = item.items.length; j < jLen; j++) {
            isEmpty = this._isRepeatingItemEmpty(item.items[j]);
            if (!isEmpty) break;
          }
        }
      }

      return isEmpty;
    },

    /**
     * Get a list of repeating items that the current item belongs to.
     * @param item the current item
     * @returns {Array}
     * @private
     */
    _getRepeatingItems: function _getRepeatingItems(item) {
      var repeatingItems = [];

      if (item._questionRepeatable && item._parentItem && Array.isArray(item._parentItem.items)) {
        var items = item._parentItem.items;

        for (var i = 0, iLen = items.length; i < iLen; i++) {
          if (items[i]._codePath === item._codePath) {
            repeatingItems.push(items[i]);
          }
        }
      }

      return repeatingItems;
    },

    /**
     * Get the sibling repeating item that is before the current item
     * @param item the current item
     * @returns {*} the previous item or null
     */
    getPrevRepeatingItem: function getPrevRepeatingItem(item) {
      var repeatingItems = this._getRepeatingItems(item);

      var elementIDs = repeatingItems.map(function (it) {
        return it._elementId;
      });
      var posIndex = elementIDs.indexOf(item._elementId); // return null if there is no items before this one

      return posIndex > 0 ? repeatingItems[posIndex - 1] : null;
    },

    /**
     * Get the sibling repeating item that is after the current item
     * @param item the current item
     * @returns {*} the next item or null
     */
    getNextRepeatingItem: function getNextRepeatingItem(item) {
      var repeatingItems = this._getRepeatingItems(item);

      var elementIDs = repeatingItems.map(function (it) {
        return it._elementId;
      });
      var posIndex = elementIDs.indexOf(item._elementId); // return null if there is no items after this one

      return posIndex < repeatingItems.length - 1 ? repeatingItems[posIndex + 1] : null;
    },

    /**
     * Get the sibling repeating item that is the first one
     * @param item the current item
     * @returns {*} the first item
     */
    getFirstRepeatingItem: function getFirstRepeatingItem(item) {
      var repeatingItems = this._getRepeatingItems(item); // always return the first one


      return repeatingItems[0];
    },

    /**
     * Get the sibling repeating item that is the last one
     * @param item the current item
     * @returns {*} the last item
     */
    getLastRepeatingItem: function getLastRepeatingItem(item) {
      var repeatingItems = this._getRepeatingItems(item); // always return the last one


      return repeatingItems[repeatingItems.length - 1];
    },

    /**
     * Remove a repeating item or a repeating section and update form status
     * @param item an item
     */
    removeRepeatingItems: function removeRepeatingItems(item) {
      if (item._parentItem && Array.isArray(item._parentItem.items)) {
        for (var i = 0, iLen = item._parentItem.items.length; i < iLen; i++) {
          if (item._parentItem.items[i]._codePath == item._codePath && item._parentItem.items[i]._idPath == item._idPath) {
            item._parentItem.items.splice(i, 1);

            break;
          }
        }
      }

      this._resetInternalData();

      var readerMsg = 'Removed ' + this.itemDescription(item);

      this._actionLogs.push(readerMsg);
    },

    /**
     *  Returns the description of an item (section/question/row).
     * @param item the item whose type is needed
     */
    itemDescription: function itemDescription(item) {
      return item._inHorizontalTable ? 'row' : item.header ? 'section' : 'question';
    },

    /**
     * Get the scores from source items
     * @param item the target item where the score rule is defined
     * @param formula the score rule formula
     * @returns {Array}
     * @private
     */
    _getScores: function _getScores(item, formula) {
      var scores = [];

      var sourceItems = this._getFormulaSourceItems(item, formula.value);

      for (var i = 0, iLen = sourceItems.length; i < iLen; i++) {
        var item = sourceItems[i];
        var score = 0;

        if (item && item.value && item.value.score) {
          score = item.value.score;
        }

        scores.push(score);
      }

      return scores;
    },

    /**
     * Get a source item from the question code defined in a score rule
     * @param item the target item where a formula is defined
     * @param questionCodes the code of a source item
     * @param checkAncestorSibling, optional, to check ancestor's siblings too, default is true
     * @returns {Array}
     * @private
     */
    _getFormulaSourceItems: function _getFormulaSourceItems(item, questionCodes, checkAncestorSibling) {
      var sourceItems = [];

      for (var i = 0, iLen = questionCodes.length; i < iLen; i++) {
        var questionCode = questionCodes[i];

        var sourceItem = this._findItemsUpwardsAlongAncestorTree(item, questionCode, checkAncestorSibling);

        sourceItems.push(sourceItem);
      }

      return sourceItems;
    },

    /**
     * Convert an item's value in its selected unit to the value in standard unit used for calculation
     * @param item an item
     * @param formula the formula defined on the item
     * @returns {Array}
     * @private
     */
    _getValuesInStandardUnit: function _getValuesInStandardUnit(item, formula) {
      var values = [];

      var sourceItems = this._getFormulaSourceItems(item, formula.value);

      for (var i = 0, iLen = sourceItems.length; i < iLen; i++) {
        var valueInStandardUnit = '';
        var item = sourceItems[i];

        if (item.value) {
          if (item.unit && item.unit.name) {
            valueInStandardUnit = this.Units.getValueInStandardUnit(parseFloat(item.value), item.unit.name);
          } else {
            valueInStandardUnit = parseFloat(item.value);
          }
        }

        values.push(valueInStandardUnit);
      }

      return values;
    },

    /**
     * Run the formula on the item and get the result
     * @param item an item
     * @returns {string}
     */
    getFormulaResult: function getFormulaResult(item) {
      var result = '';
      var parameterValues = [];

      if (item.calculationMethod) {
        var formula = item.calculationMethod; // run score rule (there should be one score rule only in a form)

        if (formula.name === this._CONSTANTS.CALCULATION_METHOD.TOTALSCORE) {
          parameterValues = this._getScores(item, formula);
        } // run non-score rules
        else {
            // find the sources and target
            parameterValues = this._getValuesInStandardUnit(item, formula);
          } // calculate the formula result


        result = this.Formulas.calculations_[formula.name](parameterValues);
      }

      return result;
    },

    /**
     * Update data by running the formula on the target item
     * @param item the target item where there is a formula
     */
    _processItemFormula: function _processItemFormula(item) {
      if (item.calculationMethod && item.calculationMethod.name) {
        item.value = this.getFormulaResult(item);
      }
    },

    /**
     * Update data by running the data control on the target item
     * @param item the target item where there is a data control
     */
    _processItemDataControl: function _processItemDataControl(item) {
      if (item.dataControl && angular.isArray(item.dataControl)) {
        this._updateDataByDataControl(item); // Force a reset of answers


        this._updateAutocompOptions(item, true);

        this._updateUnitAutocompOptions(item);
      }
    },

    /**
     * Create a data object based on the value in dataFormat
     * @param dataFormat a string specifies how and where to get the data
     * @param sourceItem the source item, which is the data source
     * @returns {{}}
     * @private
     */
    _constructObjectByDataFormat: function _constructObjectByDataFormat(dataFormat, sourceItem) {
      var targetData = {};

      if (angular.isObject(dataFormat)) {
        var keys = Object.keys(dataFormat);

        for (var i = 0, iLen = keys.length; i < iLen; i++) {
          targetData[keys[i]] = this._getDataFromNestedAttributes(dataFormat[keys[i]], sourceItem);
        }
      }

      return targetData;
    },

    /**
     * Create a data array based on the value in dataFormat
     * @param dataFormat a string specifies how and where to get the data
     * @param sourceItem the source item, which is the data source
     * @returns {Array}
     * @private
     */
    _constructArrayByDataFormat: function _constructArrayByDataFormat(dataFormat, sourceItem) {
      var targetData = [],
          abort = false;

      if (angular.isObject(dataFormat)) {
        var keys = Object.keys(dataFormat);
        var listByKeys = {},
            iLen = keys.length;
        var listLength = -1;

        for (var i = 0; i < iLen; i++) {
          var list = listByKeys[keys[i]] = this._getDataFromNestedAttributes(dataFormat[keys[i]], sourceItem); // abort if any data returned is not an array


          if (!Array.isArray(list)) {
            abort = true;
            break;
          } else if (listLength === -1) {
            listLength = list.length;
          } // abort if any returned array has a different length
          else if (listLength !== list.length) {
              abort = true;
              break;
            }
        }

        if (!abort) {
          for (var j = 0; j < listLength; j++) {
            var elementData = {};

            for (var i = 0; i < iLen; i++) {
              elementData[keys[i]] = listByKeys[keys[i]][j];
            }

            targetData.push(elementData);
          }
        }
      }

      return targetData;
    },

    /**
     * Update the data on the item by running through the data control functions defined on this item.
     * @param item an item in the form
     * @private
     */
    _updateDataByDataControl: function _updateDataByDataControl(item) {
      for (var i = 0, iLen = item.dataControl.length; i < iLen; i++) {
        var source = item.dataControl[i].source,
            onAttribute = item.dataControl[i].onAttribute,
            constructionType = item.dataControl[i].construction,
            dataFormat = item.dataControl[i].dataFormat; // the default target attribute where the data is set is "value"

        if (!onAttribute) onAttribute = "value"; // the default construction type is "SIMPLE"

        if (!constructionType) constructionType = this._CONSTANTS.DATA_CONTROL.CONSTRUCTION_SIMPLE; // the default source data field is "value"

        if (!dataFormat) dataFormat = "value"; // has a source configuration

        if (source) {
          var sourceType = source.sourceType; // the default source type is "INTERNAL", which uses "sourceItemCode" to locate the source item

          if (!sourceType) sourceType = this._CONSTANTS.DATA_CONTROL.SOURCE_INTERNAL; // "INTERNAL"

          if (sourceType === this._CONSTANTS.DATA_CONTROL.SOURCE_INTERNAL && source.sourceItemCode) {
            // get the source item object
            var sourceItem = this._findItemsUpwardsAlongAncestorTree(item, source.sourceItemCode);

            if (sourceItem) {
              // check how to create the new data on target
              if (constructionType === this._CONSTANTS.DATA_CONTROL.CONSTRUCTION_ARRAY) {
                var newData = this._constructArrayByDataFormat(dataFormat, sourceItem); // set the data


                item[onAttribute] = angular.copy(newData);
              } else if (constructionType === this._CONSTANTS.DATA_CONTROL.CONSTRUCTION_OBJECT) {
                var newData = this._constructObjectByDataFormat(dataFormat, sourceItem); // set the data


                item[onAttribute] = angular.copy(newData);
              } else if (constructionType === this._CONSTANTS.DATA_CONTROL.CONSTRUCTION_SIMPLE) {
                // direct access to the data in source item
                var newData = this._getDataFromNestedAttributes(dataFormat, sourceItem);

                item[onAttribute] = angular.copy(newData);
              }
            }
          } // "EXTERNAL" uses "url" and optional "urlOptions" (an array), TBD

        } // end if source

      } // end of the loop of the data control

    },
    ///**
    // * *** working, not used at this moment. ***  not reviewed.
    // * Create the complete URL with addition parameters and data from source item
    // * @param item the item where the data is to be set
    // * @param source the source options
    // * @param onAttribute the attribute on the item where the data is to be set
    // * @returns {{}}
    // * @private
    // */
    //_getQueryURL: function(item, source, onAttribute) {
    //  var queryObj = {};
    //  if (source.sourceType === 'external' && source.url) {
    //    var url = source.url;
    //    // it has urlOptions
    //    if (source.urlOptions) {
    //      var sourceItem = this._findItemsUpwardsAlongAncestorTree(item, source.itemCode);
    //      if (sourceItem) {
    //        for(var i= 0, iLen=source.urlOptions.length; i<iLen; i++) {
    //          var options = source.urlOptions[i];
    //          var paramData = this._getDataFromNestedAttributes(options.data, sourceItem);
    //          url += '&' + options.parameter + '=' + paramData;
    //        }
    //      }
    //    }
    //    queryObj.url = url;
    //    queryObj.onAttribute = onAttribute;
    //    queryObj.targetItem = item;
    //  }
    //  return queryObj;
    //},

    /**
     * Get data from a source item object following the nested attribute path
     * Examples:
     * sourceItem: {value: [ {attr1: 'v1', attr2: 'v2'}, {attr1: 'va', attr2: 'vb'}] }
     * strQuery:   value[1].attr1 ===> 'va'
     * sourceItem: [{value: [ {attr1: 'v1', attr2: 'v2'}, {attr1: 'va', attr2: 'vb'}] }, {}]
     * strQuery:   [0].value[0].attr1 ===> 'v1'
     * @param strQuery a query path, such as "attr[index].subattr.subsubattr"
     *        where attr is an array, subattr and subsubattr are objects.
     * @param sourceItem a source item object.
     *        Note: While "." is allowed in the attribute names of javascript object,
     *        here we assume "." is not used in the names of the item's attributes.
     * @returns {*}
     * @private
     */
    _getDataFromNestedAttributes: function _getDataFromNestedAttributes(strQuery, sourceItem) {
      var levels = strQuery.trim().split('.');
      var dataSource = sourceItem,
          iLen = levels.length;

      for (var i = 0; i < iLen; i++) {
        if (dataSource) {
          var query = levels[i]; // query not empty

          if (query) {
            // if it points to an item in an array, such as answers[1]
            var elementInArray = query.match(/^(.+)\[(\d+)\]$/);

            if (elementInArray) {
              var dataSource = dataSource[elementInArray[1]];
              var index = parseInt(elementInArray[2]);

              if (Number.isInteger(index)) {
                dataSource = dataSource[index];
              } // stop if the index found is not an integer
              else {
                  break;
                }
            } // if it points to an attribute
            else {
                dataSource = dataSource[query];
              }
          } // stop if the query is empty
          else {
              break;
            }
        } // stop if data is not found in the middle
        else {
            break;
          }
      } // data is valid AND all the parts of the query path are checked


      return i === iLen && dataSource ? dataSource : null;
    },

    /**
     * Set up autocomplete options for each items
     * @param templateOptionsOnly (default false) set to true if only the
     *  templateOptions items need processing.
     */
    _setUpDefaultsAndAutocomp: function _setUpDefaultsAndAutocomp(templateOptionsOnly) {
      var itemList;
      var itemLists = [this.templateOptions.formHeaderItems];
      if (!templateOptionsOnly) itemLists.push(this.itemList);

      for (var j = 0, jLen = itemLists.length; j < jLen && (itemList = itemLists[j]); ++j) {
        for (var i = 0, iLen = itemList.length; i < iLen; i++) {
          var item = itemList[i];

          if (item.dataType === this._CONSTANTS.DATA_TYPE.CWE || item.dataType === this._CONSTANTS.DATA_TYPE.CNE) {
            this._updateAutocompOptions(item);
          } else if (item.defaultAnswer && !item.value) // && not a list
            item.value = item.defaultAnswer;

          this._updateUnitAutocompOptions(item);
        }
      }
    },

    /**
     *  Sets the display string for an item's unit.
     * @param unit the unit object on which the display string should be set.
     */
    _setUnitDisplay: function _setUnitDisplay(unit) {
      unit._displayUnit = unit.name ? unit.name : unit.code ? unit.code : null;
    },

    /**
     * Update an item's units autocomplete options
     * @param item an item on the form
     * @private
     */
    _updateUnitAutocompOptions: function _updateUnitAutocompOptions(item) {
      if (item.units && item.dataType !== this._CONSTANTS.DATA_TYPE.CNE && item.dataType !== this._CONSTANTS.DATA_TYPE.CWE) {
        // clean up unit autocomp options
        item._unitAutocompOptions = null;
        var listItems = [],
            answers = item.units; // Modify the label for each unit.

        var defaultValue;

        for (var i = 0, iLen = answers.length; i < iLen; i++) {
          var listItem = angular.copy(answers[i]);

          this._setUnitDisplay(listItem);

          if (answers[i].default) {
            defaultValue = listItem._displayUnit;
          } // Include only if name or code is specified.


          if (listItem._displayUnit) {
            listItems.push(listItem);
          }
        }

        var options = {
          listItems: listItems,
          matchListValue: true,
          autoFill: true,
          display: "_displayUnit"
        };

        if (defaultValue !== undefined) {
          options.defaultValue = defaultValue;
        } else if (listItems.length === 1) {
          options.defaultValue = listItems[0]._displayUnit;
        }

        item._unitAutocompOptions = options;
      }
    },

    /**
     * Initializes (if not already done) item._modifiedAnswers.
     * Also sets item._hasOneAnswerLabel
     * @param item the item for which labeled answers should be created.
     * @param forceReset always reset item._modifiedAnswers
     */
    _setModifiedAnswers: function _setModifiedAnswers(item, forceReset) {
      if (item.dataType === this._CONSTANTS.DATA_TYPE.CNE || item.dataType === this._CONSTANTS.DATA_TYPE.CWE) {
        // initial setting or a reset triggered by Data Control
        if (!item._modifiedAnswers || forceReset) {
          var answers = []; // 'answers' might be null even for CWE
          // need to recheck answers in case its value has been changed by data control

          if (item.answers) {
            if (angular.isArray(item.answers)) {
              answers = item.answers;
            } else if (item.answers !== "" && this.answerLists) {
              answers = this.answerLists[item.answers];
            }
          } // reset the modified answers (for the display text)


          item._modifiedAnswers = [];
          item._hasOneAnswerLabel = false;

          for (var i = 0, iLen = answers.length; i < iLen; i++) {
            var answerData = angular.copy(answers[i]);
            var displayText = answerData.text; // label is a string

            if (answerData.label) {
              displayText = answerData.label + ". " + displayText;
              item._hasOneAnswerLabel = true;
            }

            if (answerData.score !== undefined && answerData.score !== null) // score is an int
              displayText = displayText + " - " + answerData.score; // always uses _displayText in autocomplete-lhc for display

            answerData._displayText = displayText;

            item._modifiedAnswers.push(answerData);
          }
        }
      } // data type has been changed (by Data Control)
      else if (forceReset) {
          delete item._modifiedAnswers;
        }
    },

    /**
     * Update an item's autocomplete options
     * @param item an item on the form
     * @param forceReset force to reset _modifiedAnswers
     * @private
     */
    _updateAutocompOptions: function _updateAutocompOptions(item, forceReset) {
      // for list only
      if (item.dataType === this._CONSTANTS.DATA_TYPE.CNE || item.dataType === this._CONSTANTS.DATA_TYPE.CWE) {
        if (!item._modifiedAnswers || forceReset) {
          this._setModifiedAnswers(item, forceReset);
        }

        var maxSelect = item.answerCardinality ? item.answerCardinality.max : 1;

        if (maxSelect !== '*' && typeof maxSelect === 'string') {
          maxSelect = parseInt(maxSelect);
        }

        var options = {
          matchListValue: item.dataType === this._CONSTANTS.DATA_TYPE.CNE,
          maxSelect: maxSelect
        };
        var url = item.externallyDefined;

        if (url) {
          options.url = url;
          options.autocomp = true;
          options.nonMatchSuggestions = false;
          options.tableFormat = true;
          options.valueCols = [0];
          options.colHeaders = item.displayControl.listColHeaders;

          if (options.colHeaders) {
            var h = options.colHeaders; // Escape HTML tags to prevent them from rendering

            for (var i = 0, len = h.length; i < len; ++i) {
              h[i] = h[i].replace(/</g, '&lt;');
            }
          }
        } else {
          options.listItems = item._modifiedAnswers;
          options.addSeqNum = !item._hasOneAnswerLabel;
          options.display = "_displayText"; // See if there are list headings, and set them up if so.
          // The only way to determine this is to check whether parentAnswerCode
          // is defined on any item.
          // It would be more efficient to have a flag defined on the question
          // level.

          var answers = options.listItems;
          var noHeadings = true;

          for (i = 0, len = answers.length; i < len && noHeadings; ++i) {
            noHeadings = !!answers[i].parentAnswerCode;
          }

          if (!noHeadings) {
            var codes = [];
            var itemToHeading = {}; // list item (answer) to heading

            for (var i = 0, len = answers.length; i < len; ++i) {
              var ans = answers[i];
              codes.push(ans.code);
              if (ans.parentAnswerCode) itemToHeading[ans.code] = ans.parentAnswerCode;
            }

            options.codes = codes;
            options.itemToHeading = itemToHeading;
          } // If there isn't already a default value set (handled elsewhere), and
          // there is just one item in the list, use that as the default value.


          if (!options.defaultValue && options.listItems.length === 1) options.defaultValue = options.listItems[0];
        }

        item._autocompOptions = options;
      } // end of list

    },

    /**
     * Units modules
     * Embedded in lforms-data.js. To be separated as a independent file.
     */
    Units: {
      getValueInStandardUnit: function getValueInStandardUnit(value, unit) {
        var result = value * this.units_[unit];
        return result.toFixed(this.precision_);
      },
      getStandardUnit: function getStandardUnit() {// TBD when 'units_' is redesigned
      },
      precision_: 4,
      units_: {
        // 'WEIGHT', kg
        'kg': 1,
        'kgs': 1,
        'kilograms': 1,
        'pounds': 0.453592,
        'lbs': 0.453592,
        // 'LENGTH', cm
        'cm': 1,
        'cms': 1,
        'centimeters': 1,
        'feet': 30.48,
        'ft': 30.48,
        'inches': 2.54,
        '[in_i]': 2.54,
        'meters': 100,
        'ft-inches': 2.54 // converted to inches first ???

      }
    },

    /**
     * Formula modules
     * Embedded in lforms-data.js. To be separated as a independent file.
     */
    Formulas: {
      calculations_: {
        precision_: 2,
        // a sum of score values
        'TOTALSCORE': function TOTALSCORE(sources) {
          var totalScore = 0;

          for (var i = 0, iLen = sources.length; i < iLen; i++) {
            totalScore += parseInt(sources[i]);
          }

          return totalScore;
        },
        // BMI = weight (kg) / [height (m)] * 2
        // BMI = weight (lb) / [height (in)] * 2 x 703
        'BMI': function BMI(sources) {
          var ret = '';
          var weightInKg = parseFloat(sources[0]),
              heightInCm = parseFloat(sources[1]);

          if (weightInKg && weightInKg != '' && heightInCm && heightInCm != '' && heightInCm != '0') {
            ret = weightInKg / Math.pow(heightInCm / 100, 2);
            ret = ret.toFixed(this.precision_);
          }

          return ret;
        },
        // BSA (m2) = SQR RT ( [Height(cm) x Weight(kg) ] / 3600 )
        'BSA': function BSA(sources) {
          var ret = '';
          var weightInKg = parseFloat(sources[0]),
              heightInCm = parseFloat(sources[1]);

          if (weightInKg && weightInKg != '' && heightInCm && heightInCm != '') {
            ret = Math.sqrt(heightInCm * weightInKg / 3600);
            ret = ret.toFixed(this.precision_);
          }

          return ret;
        }
      }
    },

    /**
     * Check if a number is within a range.
     * keys in a range are "minInclusive"/"minExclusive" and/or "maxInclusive"/"maxExclusive"
     * range example: {"minInclusive": 3, "maxInclusive":10}
     * @param range data range
     * @param numValue an item's numeric value
     * @returns {boolean}
     * @private
     */
    _inRange: function _inRange(range, numValue) {
      var inRange = false;

      if (range && !isNaN(numValue)) {
        var fields = Object.keys(range); // one key

        if (fields.length == 1) {
          switch (fields[0]) {
            case "minInclusive":
              inRange = range["minInclusive"] <= numValue;
              break;

            case "minExclusive":
              inRange = range["minExclusive"] < numValue;
              break;

            case "maxInclusive":
              inRange = range["maxInclusive"] >= numValue;
              break;

            case "maxExclusive":
              inRange = range["maxExclusive"] > numValue;
              break;
          } // end of switch

        } // end of one key
        // two keys
        else if (fields.length == 2) {
            // check the lower end
            if (range.hasOwnProperty("minInclusive")) {
              inRange = range["minInclusive"] <= numValue;
            } else if (range.hasOwnProperty("minExclusive")) {
              inRange = range["minExclusive"] < numValue;
            } // check the upper end


            if (inRange) {
              if (range.hasOwnProperty("maxInclusive")) {
                inRange = range["maxInclusive"] >= numValue;
              } else if (range.hasOwnProperty("maxExclusive")) {
                inRange = range["maxExclusive"] > numValue;
              }
            } // end if lower end valid

          } // end of two keys

      } // end of valid range and numValue


      return inRange;
    },

    /**
     * Shallowly compares two JavaScript objects to see if their keys and values are equal.
     * @param obj1
     * @param obj2
     * @returns {boolean}
     * @private
     */
    _objectEqual: function _objectEqual(obj1, obj2) {
      var ret = true; // different type

      if (_typeof(obj1) !== _typeof(obj2)) {
        ret = false;
      } // not object
      else if (_typeof(obj1) !== "object") {
          if (obj1 !== obj2) {
            ret = false;
          }
        } // object
        else {
            var keys1 = Object.keys(obj1);
            var keys2 = Object.keys(obj2);

            if (keys1.length !== keys2.length) {
              ret = false;
            } else {
              // comparison from obj1 to obj2
              for (var i = 0, iLen = keys1.length; i < iLen; i++) {
                if (obj1[keys1[i]] !== obj2[keys1[i]]) {
                  ret = false;
                  break;
                }
              } // comparison from obj2 to obj1
              // is not necessary once the lengths have benn checked.

            }
          }

      return ret;
    },

    /**
     * Search upwards along the tree structure to find the item with a matching questionCode
     * @param item the item to start with
     * @param questionCode the code of an item
     * @param checkAncestorSibling, optional, to check ancestor's siblings too, default is true
     * @returns {}
     * @private
     */
    _findItemsUpwardsAlongAncestorTree: function _findItemsUpwardsAlongAncestorTree(item, questionCode, checkAncestorSibling) {
      var sourceItem = null;
      if (checkAncestorSibling === undefined) checkAncestorSibling = true; // check siblings

      if (item._parentItem && Array.isArray(item._parentItem.items)) {
        for (var i = 0, iLen = item._parentItem.items.length; i < iLen; i++) {
          if (item._parentItem.items[i].questionCode === questionCode) {
            sourceItem = item._parentItem.items[i];
            break;
          }
        }
      } // check ancestors and each ancestors siblings


      if (!sourceItem) {
        var parentItem = item._parentItem;

        while (parentItem) {
          var foundSource = false; // check the ancestor

          if (parentItem.questionCode === questionCode) {
            sourceItem = parentItem;
            foundSource = true;
          } // check the ancestors siblings
          else if (checkAncestorSibling && parentItem._parentItem && Array.isArray(parentItem._parentItem.items)) {
              for (var i = 0, iLen = parentItem._parentItem.items.length; i < iLen; i++) {
                if (parentItem._parentItem.items[i].questionCode === questionCode) {
                  sourceItem = parentItem._parentItem.items[i];
                  foundSource = true;
                  break;
                }
              }
            }

          if (foundSource) break;
          parentItem = parentItem._parentItem;
        }
      }

      return sourceItem;
    },

    /**
     * Get a source item from the question code defined in a skip logic
     * @param item the target item where a skip logic is defined
     * @param questionCode the code of a source item
     * @param checkAncestorSibling, optional, to check ancestor's siblings also, default is true
     * @returns {Array}
     * @private
     */
    _getSkipLogicSourceItem: function _getSkipLogicSourceItem(item, questionCode, checkAncestorSibling) {
      return this._findItemsUpwardsAlongAncestorTree(item, questionCode, checkAncestorSibling);
    },

    /**
     * Check if a source item's value meet a skip logic condition/trigger
     * @param item a source item of a skip logic
     * @param trigger a trigger of a skip logic
     * @returns {boolean}
     * @private
     */
    _checkSkipLogicCondition: function _checkSkipLogicCondition(item, trigger) {
      var action = false;

      if (item && item.value !== undefined && item.value !== null && item.value !== "") {
        var currentValue = item.value;

        switch (item.dataType) {
          // answer lists: {"code", "LA-83"}, {"label","A"} and etc.
          // the key is one of the keys in the answers.
          case this._CONSTANTS.DATA_TYPE.CNE:
          case this._CONSTANTS.DATA_TYPE.CWE:
            var field = Object.keys(trigger).filter(function (key) {
              return key !== 'not';
            })[0]; // trigger should have only one key, other than 'not'
            // if the field accepts multiple values from the answer list

            if (Array.isArray(currentValue)) {
              for (var m = 0, mLen = currentValue.length; m < mLen; m++) {
                if (trigger.hasOwnProperty(field) && currentValue[m].hasOwnProperty(field) && this._objectEqual(trigger[field], currentValue[m][field])) {
                  action = true;
                  break;
                }
              }
            } else {
              if (trigger.hasOwnProperty(field) && currentValue.hasOwnProperty(field) && this._objectEqual(trigger[field], currentValue[field])) {
                action = true;
              }
            }

            break;
          // numbers: {"value: 3}, {"minInclusive": 3, "maxInclusive":10} and etc.
          // available keys: (1) "value", or (2) "minInclusive"/"minExclusive" and/or "maxInclusive"/"maxExclusive"

          case this._CONSTANTS.DATA_TYPE.INT:
          case this._CONSTANTS.DATA_TYPE.REAL:
          case this._CONSTANTS.DATA_TYPE.QTY:
            var numCurrentValue = parseFloat(currentValue); // the skip logic rule has a "value" key

            if (trigger.hasOwnProperty("value")) {
              if (trigger["value"] == numCurrentValue) {
                action = true;
              }
            } // the skip logic rule has a range
            else {
                // if within the range
                if (this._inRange(trigger, numCurrentValue)) {
                  action = true;
                }
              }

            break;
          // string: {"value": "AAA"}   ( TBD: {"pattern": "/^Loinc/"} )
          // the only key is "value", for now

          case this._CONSTANTS.DATA_TYPE.ST: // boolean: {"value": true}, {"value": false}
          // the only key is "value"

          case this._CONSTANTS.DATA_TYPE.BL:
            if (trigger.hasOwnProperty("value") && trigger["value"] === currentValue) {
              action = true;
            }

            break;
        } // end case


        if (trigger.not) {
          action = !action;
        }
      }

      return action;
    },

    /**
     * Check if all the conditions/triggers are met for a skip logic
     * @param item a target item where a skip logic is defined
     * @returns {boolean}
     * @private
     */
    _checkSkipLogic: function _checkSkipLogic(item) {
      var takeAction = false;

      if (item.skipLogic) {
        var hasAll = !item.skipLogic.logic || item.skipLogic.logic === "ALL";
        var hasAny = item.skipLogic.logic === "ANY"; // set initial value takeAction to true if the 'logic' is not set or its value is 'ALL'
        // otherwise its value is false, including when the 'logic' value is 'ANY'

        takeAction = hasAll;

        for (var i = 0, iLen = item.skipLogic.conditions.length; i < iLen; i++) {
          var condition = item.skipLogic.conditions[i];

          var sourceItem = this._getSkipLogicSourceItem(item, condition.source);

          var conditionMet = this._checkSkipLogicCondition(sourceItem, condition.trigger); // ALL: check all conditions until one is not met, or all are met.


          if (hasAll && !conditionMet) {
            takeAction = false;
            break;
          } // ANY: check all conditions until one is met, or none is met.
          else if (hasAny && conditionMet) {
              takeAction = true;
              break;
            }
        } // end of conditions loop

      } // end of skipLogic


      return takeAction;
    },

    /**
     * Get the css class on the skip logic target field
     * @param item
     * @returns {string|string|*|string}
     */
    getSkipLogicClass: function getSkipLogicClass(item) {
      return item._skipLogicStatus;
    },

    /**
     * Check if the form is decided by skip logic as finished.
     * @returns {boolean|*}
     */
    isFormDone: function isFormDone() {
      return this._formDone;
    },

    /**
     * Check if the question needs an extra input
     * @param item an item in the lforms form items array
     * @returns {boolean}
     */
    needExtra: function needExtra(item) {
      var extra = false;

      if (item && item.value) {
        if (Array.isArray(item.value)) {
          jQuery.each(item.value, function (index, answer) {
            if (answer.other) {
              extra = true; // break

              return false;
            }
          });
        } else {
          if (item.value.other) {
            extra = true;
          }
        }
      }

      return extra;
    },

    /**
     * Set the active row in table
     * @param item an item
     */
    setActiveRow: function setActiveRow(item) {
      this._activeItem = item;
    },

    /**
     * Get the css class for the active row
     * @param item an item
     * @returns {string}
     */
    getActiveRowClass: function getActiveRowClass(item) {
      var ret = "";

      if (this._activeItem && this._activeItem._elementId === item._elementId) {
        ret = "active-row";
      }

      return ret;
    },
    // Form navigation by keyboard
    Navigation: {
      // keys
      ARROW: {
        LEFT: 37,
        UP: 38,
        RIGHT: 39,
        DOWN: 40
      },
      TAB: 9,
      _navigationMap: [],
      // a mapping from position (x, y) to element id (_elementId) of every question.
      _reverseNavigationMap: {},
      // a reverse mapping from element id to position, for quick search of positions.

      /**
       * Set up or update the navigation map of all active fields
       * @param lfData the LFormsData object of a form
       */
      setupNavigationMap: function setupNavigationMap(lfData) {
        var items = lfData.itemList,
            posX = 0,
            posY = 0;
        this._navigationMap = [];
        this._reverseNavigationMap = {};

        for (var i = 0, iLen = items.length; i < iLen; i++) {
          // not in horizontal tables
          if (!items[i]._inHorizontalTable && !items[i].header) {
            // TODO: if it is not a hidden target fields of skip logic rules
            posX = 0; // set x to 0

            this._navigationMap.push([items[i]._elementId]);

            this._reverseNavigationMap[items[i]._elementId] = {
              x: posX,
              y: posY
            };
            posY += 1; // have added a row
          } // in horizontal tables and it is a table header
          else if (items[i]._horizontalTableHeader) {
              var tableKey = [items[i]._codePath + items[i]._parentItem._idPath];
              var tableInfo = lfData._horizontalTableInfo[tableKey]; // it is the first table header

              if (tableInfo && tableInfo.tableStartIndex === i) {
                for (var j = 0, jLen = tableInfo.tableRows.length; j < jLen; j++) {
                  var tableRowMap = [];
                  var tableRow = tableInfo.tableRows[j];
                  posX = 0; // new row, set x to 0

                  for (var k = 0, kLen = tableRow.cells.length; k < kLen; k++) {
                    var cellItem = tableRow.cells[k];
                    tableRowMap.push(cellItem._elementId);
                    this._reverseNavigationMap[cellItem._elementId] = {
                      x: posX,
                      y: posY
                    };
                    posX += 1; // have added a field in the row
                  }

                  this._navigationMap.push(tableRowMap);

                  posY += 1; // have added a row
                } // move i to the item right after the horizontal table


                i = tableInfo.tableEndIndex;
              }
            } // non header items in horizontal tables are handled above

        }
      },

      /**
       * Find a field's position in navigationMap from its element id
       * @param id the ID of the currently focused DOM element
       * @returns {*} the position in the navigation map array of the currently focused DOM element
       */
      getCurrentPosition: function getCurrentPosition(id) {
        return id ? this._reverseNavigationMap[id] : null;
      },

      /**
       * Find the next field to get focus
       * @param kCode code value of a keyboard key
       * @param id the ID of the currently focused DOM element
       * @returns {*}
       */
      getNextFieldId: function getNextFieldId(kCode, id) {
        var nextPos, nextId; // if the current position is known

        var curPos = this.getCurrentPosition(id);

        if (curPos) {
          switch (kCode) {
            // Move left
            case this.ARROW.LEFT:
              {
                // move left one step
                if (curPos.x > 0) {
                  nextPos = {
                    x: curPos.x - 1,
                    y: curPos.y
                  };
                } // on the leftmost already, move to the end of upper row if there's an upper row
                else if (curPos.y > 0) {
                    nextPos = {
                      x: this._navigationMap[curPos.y - 1].length - 1,
                      y: curPos.y - 1
                    };
                  } // else, it is already the field on the left top corner. do nothing


                break;
              }
            // Move right

            case this.ARROW.RIGHT:
              {
                // move right one step
                if (curPos.x < this._navigationMap[curPos.y].length - 1) {
                  nextPos = {
                    x: curPos.x + 1,
                    y: curPos.y
                  };
                } // on the rightmost already, move to the beginning of lower row if there's a lower row
                else if (curPos.y < this._navigationMap.length - 1) {
                    nextPos = {
                      x: 0,
                      y: curPos.y + 1
                    };
                  } // else it is already the field on the right bottom corner. do nothing


                break;
              }
            // Move up

            case this.ARROW.UP:
              {
                // move up one step
                if (curPos.y > 0) {
                  // if upper row does not have a field at the same column
                  // choose the rightmost field
                  var nearbyX = curPos.x;

                  if (nearbyX >= this._navigationMap[curPos.y - 1].length) {
                    nearbyX = this._navigationMap[curPos.y - 1].length - 1;
                  } // set new position


                  nextPos = {
                    x: nearbyX,
                    y: curPos.y - 1
                  };
                }

                break;
              }
            // Move down

            case this.ARROW.DOWN:
              {
                // move up one step
                if (curPos.y < this._navigationMap.length - 1) {
                  // if lower row does not have a field at the same column
                  // choose the rightmost field
                  var nearbyX = curPos.x;

                  if (nearbyX >= this._navigationMap[curPos.y + 1].length) {
                    nearbyX = this._navigationMap[curPos.y + 1].length - 1;
                  } // set new position


                  nextPos = {
                    x: nearbyX,
                    y: curPos.y + 1
                  };
                }

                break;
              }
          } // end of switch


          if (nextPos) {
            nextId = this._navigationMap[nextPos.y][nextPos.x];
          }
        }

        return nextId;
      }
    }
  });
})();

/***/ }),
/* 32 */
/***/ (function(module, exports) {

/* Simple JavaScript Inheritance
 * By John Resig http://ejohn.org/
 * MIT Licensed.
 */
// Inspired by base2 and Prototype
(function () {
  var initializing = false,
      fnTest = /xyz/.test(function () {
    xyz;
  }) ? /\b_super\b/ : /.*/; // The base Class implementation (does nothing)

  var Class = function Class() {}; // Create a new Class that inherits from this class


  Class.extend = function (prop) {
    var _super = this.prototype; // Instantiate a base class (but only create the instance,
    // don't run the init constructor)

    initializing = true;
    var prototype = new this();
    initializing = false; // Copy the properties over onto the new prototype

    for (var name in prop) {
      // Check if we're overwriting an existing function
      prototype[name] = typeof prop[name] == "function" && typeof _super[name] == "function" && fnTest.test(prop[name]) ? function (name, fn) {
        return function () {
          var tmp = this._super; // Add a new ._super() method that is the same method
          // but on the super-class

          this._super = _super[name]; // The method only need to be bound temporarily, so we
          // remove it when we're done executing

          var ret = fn.apply(this, arguments);
          this._super = tmp;
          return ret;
        };
      }(name, prop[name]) : prop[name];
    } // The dummy class constructor


    function Class() {
      // All construction is actually done in the init method
      if (!initializing && this.init) this.init.apply(this, arguments);
    } // Populate our constructed prototype object


    Class.prototype = prototype; // Enforce the constructor to be what we expect

    Class.prototype.constructor = Class; // And make this class extendable

    Class.extend = arguments.callee;
    return Class;
  };

  module.exports = Class;
})();

/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

// Processes FHIR Expression Extensions
(function () {
  "use strict"; // A class whose instances handle the running of FHIR expressions.

  var LForms = __webpack_require__(2);
  /**
   *   Constructor.
   *  @param lfData an instance of LForms.LFormsData
   */


  LForms.ExpressionProcessor = function (lfData) {
    this._lfData = lfData;
    this._fhir = LForms.FHIR[lfData.fhirVersion];
  };

  LForms.ExpressionProcessor.prototype = {
    /**
     *   Runs the FHIR expressions in the form.
     *  @param includeInitialExpr whether to include the "initialExpression"
     *   expressions (which should only be run once, after asynchronous loads
     *   from questionnaire-launchContext have been completed).
     */
    runCalculations: function runCalculations(includeInitialExpr) {
      var firstRun = true;
      var changed = true;

      while (changed) {
        if (changed || firstRun) {
          this._regenerateQuestionnaireResp();

          changed = this._evaluateVariables(this._lfData, !firstRun);
        }

        if (changed || firstRun) changed = this._evaluateFieldExpressions(this._lfData, includeInitialExpr, !firstRun);
        firstRun = false;
      }
    },

    /**
     *  Evaluates variables on the given item.
     * @param item an LFormsData or item from LFormsData.
     */
    _evaluateVariables: function _evaluateVariables(item) {
      var rtn = false;
      var variableExts = item._variableExt;

      if (variableExts) {
        for (var i = 0, len = variableExts.length; i < len; ++i) {
          var ext = variableExts[i];

          if (ext && ext.valueExpression.language == "text/fhirpath") {
            var varName = ext.valueExpression.name;
            var oldVal;
            if (item._fhirVariables) oldVal = item._fhirVariables[varName];else {
              // Create a hash for variables that will have access to
              // variables defined higher up in the tree.
              item._fhirVariables = Object.create(this._itemWithVars(item)._fhirVariables);
            } // Delete the old value, so we don't have circular references.

            delete item._fhirVariables[varName];

            var newVal = this._evaluateFHIRPath(item, ext.valueExpression.expression);

            if (newVal !== undefined) item._fhirVariables[varName] = newVal;
            var varChanged = JSON.stringify(oldVal) != JSON.stringify(newVal);

            if (varChanged) {
              item._varChanged = true; // flag for re-running expressions.
            }
          } // else maybe x-fhir-query, asynchronous (TBD)

        }
      }

      if (item.items) {
        for (var i = 0, len = item.items.length; i < len; ++i) {
          var changed = this._evaluateVariables(item.items[i]);

          if (!rtn) rtn = changed;
        }
      }

      return rtn;
    },

    /**
     *  Evaluates the expressions that set field values for the given item.
     * @param item an LFormsData or item from LFormsData.
     * @param invludeInitialExpr whether or not to run expressions from
     *  initialExpression extensions (which should only be run when the form is
     *  loaded).
     * @param changesOnly whether to run all field expressions, or just the ones
     *  that are likely to have been affected by changes from variable expressions.
     */
    _evaluateFieldExpressions: function _evaluateFieldExpressions(item, includeInitialExpr, changesOnly) {
      var rtn = false; // If changesOnly, for any item that has _varChanged set, we run any field
      // expressions that are within that group (or item).

      if (changesOnly) {
        if (item.items && item._varChanged) {
          item._varChanged = false; // clear flag

          changeOnly = false; // process all child items
        }
      } else if (!changesOnly) {
        // process this and all child items
        item._varChanged = false; // clear flag in case it was set

        var exts = [];
        if (includeInitialExpr && item._initialExprExt) exts.push(item._initialExprExt);
        if (item._calculatedExprExt) exts.push(item._calculatedExprExt);
        var changed = false;

        for (var i = 0, len = exts.length; i < len; ++i) {
          var ext = exts[i];

          if (ext && ext.valueExpression.language == "text/fhirpath") {
            var varName = ext.name;

            var newVal = this._evaluateFHIRPath(item, ext.valueExpression.expression);

            var exprChanged = this._setItemValueFromFHIRPath(item, newVal);

            if (!changed) changed = exprChanged;
          }
        }

        rtn = changed;
      } // Process child items


      if (item.items) {
        for (var i = 0, len = item.items.length; i < len; ++i) {
          var changed = this._evaluateFieldExpressions(item.items[i], includeInitialExpr, changesOnly);

          if (!rtn) rtn = changed;
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
     *  Evaluates the given FHIRPath expression defined in an extension on the
     *  given item.
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

        fhirPathVal = this._fhir.fhirpath.evaluate(this._elemIDToQRItem[item._elementId], expression, fVars);
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
          // each.
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

                for (var a = 0; a < numAnswers; ++a, ++i) {
                  if (i >= numLFItems) throw new Error('Logic error in _addToIDtoQRITemMap; ran out of lfItems');

                  var newlyAdded = this._addToIDtoQRItemMap(lfItems[i], qrIthItem, map);

                  if (newlyAdded === 0) {
                    // lfItems[i] was blank; try next lfItem
                    --a;
                  } else {
                    added += newlyAdded;
                  }
                }
              }
            }
          }
        }

        if (lfItem._elementId && (added || !this._lfData.isEmpty(lfItem))) {
          // this item has a value
          if (!qrItem) {
            // if there is data in lfItem, there should be a qrItem
            throw new Error('Logic error in _addToIDtoQRItemMap');
          } else {
            map[lfItem._elementId] = qrItem;
            added += 1;
          }
        }
      }

      return added;
    },

    /**
     *  Assigns the given FHIRPath result to the given item.
     * @param item the item from the LFormsData object that is receiving the new
     *  value.
     * @param fhirPathRes the result of a FHIRPath evaluation.
     * @return true if the value changed
     */
    _setItemValueFromFHIRPath: function _setItemValueFromFHIRPath(item, fhirPathRes) {
      var oldVal = item.value;
      if (fhirPathRes !== undefined) var fhirPathVal = fhirPathRes[0];
      if (!fhirPathVal) item.value = undefined;else {
        if (item.dataType === this._lfData._CONSTANTS.DATA_TYPE.DT) {
          var d = new Date(fhirPathVal); // Convert to local time, so the date does not get shifted for negative
          // local timezones.

          item.value = new Date(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate());
        } else item.value = fhirPathVal; // TBD: handle other types - Coding, etc.

      }
      return oldVal != item.value;
    }
  };
})();

/***/ }),
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

// Contains information about the supported FHIR versions.
var FHIRSupport = {
  'STU3': 'partial',
  'R4': 'WIP'
};
if (true) module.exports = FHIRSupport;

/***/ }),
/* 35 */
/***/ (function(module, exports) {

angular.module('lformsWidget').run(['$templateCache', function ($templateCache) {
  'use strict';

  $templateCache.put('field-answers.html', "<div class=\"lf-field-answers\" ng-switch on=\"item.displayControl.answerLayout.type\">\n" + "  <!--list style-->\n" + "  <div ng-switch-when=\"RADIO_CHECKBOX\" class=\"lf-answer-type-list\"\n" + "   role=\"radiogroup\" aria-labeledby=\"label-{{ item._elementId }}\"\n" + "   aria-describedby=\"help-{{ item._elementId }}\">\n" + "    <span ng-repeat=\"answer in item._modifiedAnswers track by $index\" class=\"lf-answer {{getAnswerLayoutColumnClass(item)}}\">\n" + "      <!--checkboxes for multiple selections-->\n" + "      <div ng-if=\"item._multipleAnswers\">\n" + "        <input class=\"lf-answer-button\" type=\"checkbox\" id=\"{{item._elementId + answer.code}}\"\n" + "               ng-click=\"updateCheckboxList(item, answer)\" ng-disabled=\"item._readOnly\"\n" + "               ng-checked=\"checkAnswer(item,answer)\">\n" + "        <label class=\"lf-answer-label\" for=\"{{item._elementId + answer.code}}\">{{answer._displayText}}</label>\n" + "      </div>\n" + "      <!--radio buttons for single selection-->\n" + "      <div ng-if=\"!item._multipleAnswers\">\n" + "        <input class=\"lf-answer-button\" type=\"radio\" id=\"{{item._elementId + answer.code}}\"\n" + "               ng-model=\"item.value\" ng-value=\"answer\" name=\"{{item._elementId}}\"\n" + "               ng-click=\"updateRadioList(item)\" ng-disabled=\"item._readOnly\" >\n" + "        <label class=\"lf-answer-label\" for=\"{{item._elementId + answer.code}}\">{{answer._displayText}}</label>\n" + "      </div>\n" + "    </span>\n" + "    <!--extra OTHER field-->\n" + "    <!--<div class=\"lf-answer-type-list-other\">-->\n" + "    <span ng-if=\"item.dataType==='CWE'\" class=\"lf-answer lf-answer-cwe-other {{getAnswerLayoutColumnClass(item)}}\">\n" + "      <!--checkboxes for multiple selections-->\n" + "      <div ng-if=\"item._multipleAnswers\" class=\"\">\n" + "          <input class=\"lf-answer-button\" type=\"checkbox\" ng-model=\"item._otherValueChecked\"\n" + "                 id=\"{{item._elementId + '_other'}}\" ng-disabled=\"item._readOnly\"\n" + "                 ng-click=\"updateCheckboxListForOther(item, {'code':item.valueOther,'text':item.valueOther})\"\n" + "                 ng-checked=\"checkAnswer(item,{'code':item.valueOther,'text':item.valueOther})\">\n" + "          <label class=\"lf-answer-label\" for=\"{{item._elementId + '_other'}}\">OTHER:</label>\n" + "          <input ng-if=\"item._otherValueChecked\" class=\"lf-answer-other\" type=\"text\" ng-model=\"item.valueOther\"\n" + "                 id=\"{{item._elementId + '_otherValue'}}\" ng-disabled=\"item._readOnly\"\n" + "                 ng-change=\"updateCheckboxListForOther(item, {'code':item.valueOther,'text':item.valueOther})\">\n" + "      </div>\n" + "\n" + "      <!--radio buttons for single selection-->\n" + "      <div ng-if=\"!item._multipleAnswers\" class=\"\">\n" + "          <input class=\"lf-answer-button\" type=\"radio\" id=\"{{item._elementId + '_other'}}\"\n" + "                 ng-model=\"item._otherValueChecked\" ng-value=\"true\"\n" + "                 name=\"{{item._elementId}}\" ng-disabled=\"item._readOnly\"\n" + "                 ng-click=\"updateRadioListForOther(item, {'code':item.valueOther,'text':item.valueOther})\">\n" + "          <label class=\"lf-answer-label\" for=\"{{item._elementId + '_other'}}\">OTHER:</label>\n" + "          <input ng-if=\"item._otherValueChecked\" class=\"lf-answer-other\" type=\"text\"\n" + "                 id=\"{{item._elementId + '_otherValue'}}\" ng-model=\"item.valueOther\"\n" + "                 ng-change=\"updateRadioListForOther(item, {'code':item.valueOther,'text':item.valueOther})\"\n" + "                 ng-disabled=\"item._readOnly\">\n" + "      </div>\n" + "    </span>\n" + "    <!--</div>-->\n" + "  </div>\n" + "\n" + "  <!--COMBO_BOX style (default is 'COMBO_BOX')-->\n" + "  <div ng-switch-default class=\"lf-answer-type-combo\">\n" + "    <input name=\"{{item.question +'_'+ $id}}\" type=\"text\"\n" + "           ng-model=\"item.value\" autocomplete-lhc=\"item._autocompOptions\"\n" + "           ng-disabled=\"item._readOnly\" placeholder=\"{{item._toolTip}}\"\n" + "           id=\"{{item._elementId}}\"\n" + "           ng-focus=\"setActiveRow(item)\" ng-blur=\"activeRowOnBlur(item)\">\n" + "  </div>\n" + "</div>\n");
  $templateCache.put('field-units.html', "<div class=\"lf-field-units\" ng-switch on=\"item.displayControl.unitLayout\">\n" + "  <!--list style-->\n" + "  <div ng-switch-when=\"RADIO_CHECKBOX\">\n" + "    <span ng-repeat=\"unit in item.units\">\n" + "      <label>\n" + "        <input type=\"radio\" ng-model=\"item.unit\" ng-value=\"unit\" >{{unit._displayUnit}}\n" + "      </label>\n" + "    </span>\n" + "  </div>\n" + "\n" + "  <!--COMBO_BOX style (default is 'COMBO_BOX')-->\n" + "  <div ng-switch-default>\n" + "    <input class=\"units\" type=\"text\" ng-disabled=\"item._readOnly\"\n" + "           ng-model=\"item.unit\" autocomplete-lhc=\"item._unitAutocompOptions\"\n" + "           placeholder=\"Select one\" id=\"unit_{{item._elementId}}\" aria-labelledby=\"th_Units\">\n" + "  </div>\n" + "\n" + "</div>\n" + "\n");
  $templateCache.put('form-controls.html', "<div class=\"stopped\" ng-show=\"isFormDone()\">\n" + "  <img ng-src=\"{{::blankGifDataUrl}}\" class=\"stop-sign\">\n" + "  <span>This form is complete.</span>\n" + "</div>\n" + "<div class=\"lf-form-controls\" ng-if=\"!lfData.templateOptions.hideFormControls\">\n" + "  <div class=\"lf-form-control\">\n" + "    <label><input type=\"checkbox\" value=\"\" ng-model=\"lfData.templateOptions.showQuestionCode\"> Display Question Code</label>\n" + "  </div>\n" + "\n" + "  <div class=\"lf-form-control\">\n" + "    <label><input type=\"checkbox\" value=\"\" ng-model=\"lfData.templateOptions.showCodingInstruction\"> Show Help/Description</label>\n" + "  </div>\n" + "  <div class=\"lf-form-control\">\n" + "    <label><input type=\"checkbox\" value=\"\" ng-model=\"lfData.templateOptions.tabOnInputFieldsOnly\"> Keyboard Navigation On Input Fields</label>\n" + "  </div>\n" + "  <div class=\"lf-form-control\">\n" + "    <div class=\"text-info\" >Total # of Questions: {{getNumberOfQuestions()}}</div>\n" + "  </div>\n" + "</div>\n");
  $templateCache.put('form-header.html', "  <div class=\"lf-form-header\" ng-if=\"lfData.templateOptions.showFormHeader\">\n" + "    <div class=\"lf-header-de\" ng-style=\"getHeaderItemStyle(item)\"\n" + "         ng-repeat=\"item in lfData.templateOptions.formHeaderItems\">\n" + "      <div class=\"lf-header-de-label\">\n" + "        <span class=\"lf-question\"><label for=\"{{item.questionCode}}\">{{item.question}}</label></span>\n" + "      </div>\n" + "      <div class=\"lf-header-de-input\" ng-switch on=\"item.dataType\">\n" + "        <ng-form name=\"innerForm\">\n" + "          <div class=\"lf-form-item-data tooltipContainer\">\n" + "            <div class=\"tooltipContent\" lf-validate=\"item\" ng-model=\"item.value\"></div>\n" + "            <input ng-switch-when=\"CWE\" name=\"{{item.question}}\" type=\"text\"\n" + "                   placeholder=\"Select or type a value\"\n" + "                   ng-model=\"item.value\"\n" + "                   autocomplete-lhc=\"item._autocompOptions\"\n" + "                   id=\"{{item.questionCode}}\"\n" + "                   ng-blur=\"activeRowOnBlur(item)\">\n" + "            <input ng-switch-when=\"DT\" name=\"{{item.question}}\" type=\"text\"\n" + "                   ng-model=\"item.value\" lf-date=\"dateOptions\"\n" + "                   placeholder=\"MM/DD/YYYY\"\n" + "                   id=\"{{item.questionCode}}\"\n" + "                   ng-blur=\"activeRowOnBlur(item)\">\n" + "            <input ng-switch-default name=\"{{item.question}}\" type=\"text\"\n" + "                   ng-model=\"item.value\" placeholder=\"Type a value\"\n" + "                   id=\"{{item.questionCode}}\"\n" + "                   ng-blur=\"activeRowOnBlur(item)\">\n" + "            <textarea ng-switch-when=\"TX\" name=\"{{item.question}}\"\n" + "                      ng-model=\"item.value\" placeholder=\"Type a value\"\n" + "                      id=\"{{item.questionCode}}\" ng-keyup=\"autoExpand($event)\" ng-blur=\"autoExpand($event)\" rows=\"1\"\n" + "                      ng-blur=\"activeRowOnBlur(item)\">\n" + "                      </textarea>\n" + "          </div>\n" + "        </ng-form>\n" + "      </div>\n" + "    </div>\n" + "  </div>\n");
  $templateCache.put('form-options.html', "<div class=\"lf-form-options\" ng-if=\"lfData.templateOptions.showFormOptionPanel\">\n" + "\n" + "  <div class=\"lf-form-option\">\n" + "    <label><input type=\"checkbox\" value=\"\" ng-model=\"lfData.templateOptions.showQuestionCode\">Display question code</label>\n" + "  </div>\n" + "  <div class=\"lf-form-option\">\n" + "    <label><input type=\"checkbox\" value=\"\" ng-model=\"lfData.templateOptions.showCodingInstruction\">Show help/description</label>\n" + "  </div>\n" + "  <div class=\"lf-form-option\">\n" + "    <label><input type=\"checkbox\" value=\"\" ng-model=\"lfData.templateOptions.hideFormControls\">Hide form controls</label>\n" + "  </div>\n" + "  <div class=\"lf-form-option\">\n" + "    <label><input type=\"checkbox\" value=\"\" ng-model=\"lfData.templateOptions.showFormOptionPanelButton\">Display form's option button</label>\n" + "  </div>\n" + "  <div class=\"lf-form-option\">\n" + "    <label><input type=\"checkbox\" value=\"\" ng-model=\"lfData.templateOptions.showFormOptionPanel\">Display form's option panel</label>\n" + "  </div>\n" + "  <div class=\"lf-form-option\">\n" + "    <label><input type=\"checkbox\" value=\"\" ng-model=\"lfData.templateOptions.showItemOptionPanelButton\">Display item's option button</label>\n" + "  </div>\n" + "  <div class=\"lf-form-option\">\n" + "    <label><input type=\"checkbox\" value=\"\" ng-model=\"lfData.templateOptions.hideUnits\">Hide units</label>\n" + "  </div>\n" + "  <div class=\"lf-form-option\">\n" + "    <label><input type=\"checkbox\" value=\"\" ng-model=\"lfData.templateOptions.allowMultipleEmptyRepeatingItems\">Allow multiple empty repeating questions/sections</label>\n" + "  </div>\n" + "  <div class=\"lf-form-option\">\n" + "    <label><input type=\"checkbox\" value=\"\" ng-model=\"lfData.templateOptions.allowHTMLInInstructions\">Allow HTML content in instructions</label>\n" + "  </div>\n" + "  <div class=\"lf-form-option\">\n" + "    <label><input type=\"checkbox\" value=\"\" ng-model=\"lfData.templateOptions.showFormHeader\">Display form header questions</label>\n" + "  </div>\n" + "  <div class=\"lf-form-option\">\n" + "    <label><input type=\"checkbox\" value=\"\" ng-model=\"lfData.templateOptions.showColumnHeaders\">Display column headers</label>\n" + "  </div>\n" + "  <div class=\"lf-form-option\">\n" + "    <label><input type=\"checkbox\" value=\"\" ng-model=\"lfData.templateOptions.useTreeLineStyle\">Tree line style</label>\n" + "  </div>\n" + "  <div class=\"lf-form-option\">\n" + "    <label for=\"viewMode\">View mode</label>\n" + "    <select name=\"viewMode\" ng-model=\"lfData.templateOptions.viewMode\">\n" + "      <option value=\"auto\">Responsive [auto]</option>\n" + "      <option value=\"lg\">For large screen [lg]</option>\n" + "      <option value=\"md\">For medium screen [md]</option>\n" + "      <option value=\"sm\">For small screen [sm]</option>\n" + "    </select>\n" + "\n" + "  </div>\n" + "\n" + "</div>\n");
  $templateCache.put('form-title.html', "<div class=\"lf-form-title\" role=\"heading\" aria-level=1>\n" + "  <span id=\"label-{{ lfData.code }}\" class=\"lf-question\">{{lfData.name}}</span>\n" + "  <span class=\"lf-item-code\" ng-if=\"lfData.templateOptions.showQuestionCode\">\n" + "        <a ng-if=\"lfData._linkToDef\" href=\"{{ lfData._linkToDef }}\" target=\"_blank\" rel=\"noopener noreferrer\">[{{ lfData.code }}]</a>\n" + "        <span ng-if=\"!lfData._linkToDef\">[{{ lfData.code }}]</span>\n" + "      </span>\n" + "  <button ng-if=\"lfData.copyrightNotice\" id=\"copyright-{{lfData.code}}\" type=\"button\"\n" + "          class=\"lf-copyright-button btn-sm\" uib-popover=\"{{lfData.copyrightNotice}}\"\n" + "          popover-trigger=\"focus\" popover-placement=\"right\"\n" + "          popover-title=\"Copyright\" aria-label=\"Copyright notice\"\n" + "          aria-describedby=\"label-{{ lfData.code }}\">\n" + "    <span class=\"glyphicon glyphicon-copyright-mark\" aria-hidden=\"true\"></span>\n" + "  </button>\n" + "  <button ng-if=\"lfData.templateOptions.showFormOptionPanelButton\" type=\"button\" class=\"lf-control-button btn-sm\"\n" + "          ng-click=\"hideShowFormOptionPanel()\" aria-label=\"Form Option Panel\">\n" + "    <span class=\"glyphicon glyphicon-cog\" aria-hidden=\"true\"></span>\n" + "  </button>\n" + "\n" + "</div>\n");
  $templateCache.put('form-view.html', "<div class=\"lf-form-view {{getViewModeClass()}}\" ng-controller=\"LFormsCtrl\" ng-switch on=\"lfData.template\">\n" + "  <div ng-switch-when=\"table\">\n" + "    <div ng-include=\"'template-table.html'\"></div>\n" + "  </div>\n" + "  <!-- default is 'table' -->\n" + "  <div ng-switch-default>\n" + "    <div ng-include=\"'template-table.html'\"></div>\n" + "  </div>\n" + "\n" + "  <!--debugging-->\n" + "  <button type=\"button\" ng-if=\"debug\" ng-click=\"onclick()\">Click to debug Panel Controller</button>\n" + "\n" + "</div>\n");
  $templateCache.put('item-options.html', "<div ng-if=\"item._showItemOptionPanel\">\n" + "\n" + "  <div class=\"lf-item-options lf-section-options\"  ng-if=\"item.dataType==='SECTION'\">\n" + "    <div class=\"lf-item-option\">\n" + "      <input class=\"lf-answer-button\" type=\"radio\" id=\"{{item._elementId + 'vertical'}}\"\n" + "             ng-model=\"item.displayControl.questionLayout\" value=\"vertical\" name=\"{{item._elementId}} +'option'\">\n" + "      <label class=\"lf-answer-label\" for=\"{{item._elementId + 'vertical'}}\">Vertical</label>\n" + "    </div>\n" + "    <div class=\"lf-item-option\" ng-if=\"isQuestionLayoutAllowed(item, 'horizontal')\">\n" + "      <input class=\"lf-answer-button\" type=\"radio\" id=\"{{item._elementId + 'horizontal'}}\"\n" + "             ng-model=\"item.displayControl.questionLayout\" value=\"horizontal\" name=\"{{item._elementId}} +'option'\">\n" + "      <label class=\"lf-answer-label\" for=\"{{item._elementId + 'horizontal'}}\">Horizontal</label>\n" + "    </div>\n" + "    <div class=\"lf-item-option\" ng-if=\"isQuestionLayoutAllowed(item, 'matrix')\">\n" + "      <input class=\"lf-answer-button\" type=\"radio\" id=\"{{item._elementId + 'matrix'}}\"\n" + "             ng-model=\"item.displayControl.questionLayout\" value=\"matrix\" name=\"{{item._elementId}} +'option'\">\n" + "      <label class=\"lf-answer-label\" for=\"{{item._elementId + 'matrix'}}\">Matrix</label>\n" + "    </div>\n" + "\n" + "  </div>\n" + "\n" + "  <div class=\"lf-item-options\" ng-if=\"item.answers && (item.dataType==='CWE' || item.dataType==='CNE')\">\n" + "    <div class=\"lf-item-option\">\n" + "      <input class=\"lf-answer-button\" type=\"radio\" id=\"{{item._elementId + 'combo'}}\"\n" + "             ng-model=\"item.displayControl.answerLayout.type\" value=\"COMBO_BOX\" name=\"{{item._elementId}} +'option'\">\n" + "      <label class=\"lf-answer-label\" for=\"{{item._elementId + 'combo'}}\">Combo box</label>\n" + "    </div>\n" + "    <div class=\"lf-item-option\">\n" + "      <input class=\"lf-answer-button\" type=\"radio\" id=\"{{item._elementId + 'list'}}\"\n" + "             ng-model=\"item.displayControl.answerLayout.type\" value=\"RADIO_CHECKBOX\" name=\"{{item._elementId}} +'option'\">\n" + "      <label class=\"lf-answer-label\" for=\"{{item._elementId + 'list'}}\">{{item._multipleAnswers ? \"Checkboxes\" : \"Radio buttons\"}}</label>\n" + "    </div>\n" + "    <div class=\"lf-item-option\" ng-if=\"item.displayControl.answerLayout.type==='RADIO_CHECKBOX'\">\n" + "      <label for=\"{{item._elementId + 'columns'}}\"> Display format:</label>\n" + "      <select name=\"{{item._elementId + 'columns'}}\" id=\"{{item._elementId + 'columns'}}\" ng-model=\"item.displayControl.answerLayout.columns\">\n" + "        <option value=\"\">---Please select---</option> <!-- not selected / blank option -->\n" + "        <option value=\"0\">Compact</option>\n" + "        <option value=\"1\">In 1 column</option>\n" + "        <option value=\"2\">In 2 columns</option>\n" + "        <option value=\"3\">In 3 columns</option>\n" + "        <option value=\"4\">In 4 columns</option>\n" + "        <option value=\"5\">In 5 columns</option>\n" + "        <option value=\"6\">In 6 columns</option>\n" + "      </select>\n" + "    </div>\n" + "  </div>\n" + "\n" + "</div>\n");
  $templateCache.put('item.html', "<div ng-attr-role=\"{{item.header ? 'heading' : undefined}}\"\n" + " ng-attr-aria-level=\"{{item.header ? item._displayLevel+1 : undefined}}\"\n" + " class=\"lf-form-table-row lf-de {{getSiblingStatus(item)}} {{getRowClass(item)}}\n" + "    {{getSkipLogicClass(item)}} {{getActiveRowClass(item)}}\" ng-click=\"setActiveRow(item)\">\n" + "  <div class=\"lf-de-label-button\">\n" + "    <!-- label -->\n" + "    <div class=\"lf-de-label\">\n" + "      <span ng-show=\"item._questionRepeatable\" class=\"lf-sn\">{{getRepeatingSN(item) }}</span>\n" + "      <span class=\"lf-question\"><label id=\"label-{{ item._elementId }}\" for=\"{{item._elementId}}\">{{item.question}}</label></span>\n" + "      <span class=\"lf-item-code\" ng-show=\"lfData.templateOptions.showQuestionCode\">\n" + "        <a ng-if=\"item._linkToDef\" href=\"{{ item._linkToDef }}\" target=\"_blank\" rel=\"noopener noreferrer\">[{{ item.questionCode }}]</a>\n" + "        <span ng-if=\"!item._linkToDef\">[{{ item.questionCode }}]</span>\n" + "      </span>\n" + "      <span ng-switch on=\"getCodingInstructionsDisplayType(item)\" ng-if=\"item.codingInstructions\">\n" + "        <span ng-switch-when=\"inline-html\" id=\"help-{{ item._elementId }}\"\n" + "         class=\"lf-prompt\" ng-bind-html=\"getTrustedCodingInstructions(item)\"></span>\n" + "        <span ng-switch-when=\"inline-escaped\" id=\"help-{{ item._elementId }}\"\n" + "         class=\"lf-prompt\" ng-bind=\"item.codingInstructions\"></span>\n" + "        <button ng-switch-when=\"popover-html\" id=\"helpButton-{{ item._elementId }}\"\n" + "                class=\"lf-help-button btn-sm\" uib-popover-template=\"'popover-content.html'\"\n" + "                popover-trigger=\"focus\" popover-placement=\"right\"  popover-title=\"Instruction\"\n" + "                type=\"button\" aria-label=\"Help\"\n" + "                aria-describedby=\"label-{{ item._elementId }}\">\n" + "          <span class=\"glyphicon glyphicon-question-sign\" aria-hidden=\"true\"></span>\n" + "        </button>\n" + "        <button ng-switch-when=\"popover-escaped\" id=\"helpButton-{{ item._elementId }}\"\n" + "                class=\"lf-help-button btn-sm\" uib-popover=\"{{item.codingInstructions}}\"\n" + "                popover-trigger=\"focus\" popover-placement=\"right\"  popover-title=\"Instruction\"\n" + "                type=\"button\" aria-label=\"Help\"\n" + "                aria-describedby=\"label-{{ item._elementId }}\">\n" + "          <span class=\"glyphicon glyphicon-question-sign\" aria-hidden=\"true\"></span>\n" + "        </button>\n" + "      </span>\n" + "      <button ng-if=\"item.copyrightNotice\" id=\"copyright-{{item._elementId}}\" type=\"button\"\n" + "              class=\"lf-copyright-button btn-sm\" uib-popover=\"{{item.copyrightNotice}}\"\n" + "              popover-trigger=\"focus\" popover-placement=\"right\" popover-title=\"Copyright\"\n" + "              aria-label=\"Copyright notice\" aria-describedby=\"label-{{ item._elementId }}\">\n" + "        <span class=\"glyphicon glyphicon-copyright-mark\" aria-hidden=\"true\"></span>\n" + "      </button>\n" + "      <button ng-if=\"isItemOptionPanelButtonShown(item)\" type=\"button\" class=\"lf-control-button btn-sm\"\n" + "              ng-click=\"hideShowItemOptionPanel(item)\" aria-label=\"Item controls\"\n" + "              aria-describedby=\"label-{{ item._elementId }}\">\n" + "        <span class=\"glyphicon glyphicon-cog\" aria-hidden=\"true\"></span>\n" + "      </button>\n" + "      <!-- TBD -->\n" + "      <lf-item-options></lf-item-options>\n" + "    </div>\n" + "\n" + "    <!-- button -->\n" + "    <div class=\"lf-de-button\">\n" + "      <button ng-if=\"!hasOneRepeatingItem(item)\" class=\"lf-float-button\" type=\"button\"\n" + "              ng-click=\"removeOneRepeatingItem(item)\" id=\"del-{{item._elementId}}\"\n" + "              title='Remove this \"{{ item.question }}\"'>-</button>\n" + "    </div>\n" + "  </div>\n" + "\n" + "  <div ng-if=\"!item.header\" class=\"lf-de-input-unit\" ng-style=\"getFieldWidth(item)\">\n" + "    <!-- input field -->\n" + "    <div ng-switch on=\"item.dataType\" class=\"lf-de-input values hasTooltip\">\n" + "      <ng-form name=\"innerForm2\">\n" + "        <div class=\"lf-form-item-data tooltipContainer\">\n" + "          <div class=\"tooltipContent\" lf-validate=\"item\" ng-model=\"item.value\" ng-if=\"item._hasValidation\"></div>\n" + "          <div ng-switch-when=\"CNE\">\n" + "            <lf-answers item=\"item\"></lf-answers>\n" + "          </div>\n" + "          <div ng-switch-when=\"CWE\">\n" + "            <lf-answers item=\"item\"></lf-answers>\n" + "          </div>\n" + "\n" + "          <input ng-switch-when=\"DT\" name=\"{{item.question}}\" type=\"text\"\n" + "                 ng-model=\"item.value\" lf-date=\"dateOptions\" placeholder=\"{{item._toolTip}}\"\n" + "                 ng-disabled=\"item._readOnly\" id=\"{{item._elementId}}\" ng-focus=\"setActiveRow(item)\"\n" + "                 ng-blur=\"activeRowOnBlur(item)\" aria-describedby=\"help-{{ item._elementId }}\">\n" + "          <textarea ng-switch-when=\"TX\" name=\"{{item.question}}\"\n" + "                    ng-model=\"item.value\" placeholder=\"{{item._toolTip}}\" ng-disabled=\"item._readOnly\"\n" + "                    id=\"{{item._elementId}}\" ng-keyup=\"autoExpand($event)\" ng-blur=\"activeRowOnBlur(item);autoExpand($event)\" rows=\"1\"\n" + "                    ng-focus=\"setActiveRow(item)\" aria-describedby=\"help-{{ item._elementId }}\">\n" + "          </textarea>\n" + "          <input ng-switch-when=\"BL\" name=\"{{item.question}}\" type=\"checkbox\"\n" + "                 ng-model=\"item.value\" placeholder=\"{{item._toolTip}}\" ng-disabled=\"item._readOnly\"\n" + "                 id=\"{{item._elementId}}\" ng-focus=\"setActiveRow(item)\"\n" + "                 ng-true-value=\"true\" ng-false-value=\"false\"\n" + "                 ng-blur=\"activeRowOnBlur(item)\" aria-describedby=\"help-{{ item._elementId }}\">\n" + "          <input ng-switch-default name=\"{{item.question}}\" type=\"text\"\n" + "                 ng-model=\"item.value\" placeholder=\"{{item._toolTip}}\" ng-disabled=\"item._readOnly\"\n" + "                 id=\"{{item._elementId}}\" ng-focus=\"setActiveRow(item)\"\n" + "                 ng-blur=\"activeRowOnBlur(item)\" aria-describedby=\"help-{{ item._elementId }}\">\n" + "        </div>\n" + "      </ng-form>\n" + "    </div>\n" + "\n" + "    <!--unit-->\n" + "    <div ng-if=\"!lfData.templateOptions.hideUnits && checkUnits(item)\" class=\"lf-de-unit\">\n" + "      <lf-units item=\"item\"></lf-units>\n" + "    </div>\n" + "\n" + "    <!-- extra question -->\n" + "    <div ng-if=\"needExtra(item)\" class=\"lf-de-unit\">\n" + "      <input class=\"lf-extra-field\" ng-model=\"item.valueOther\" placeholder=\"Please specify\"\n" + "             ng-disabled=\"item._readOnly\" type=\"text\" ng-focus=\"setActiveRow(item)\">\n" + "    </div>\n" + "  </div>\n" + "\n" + "\n" + "</div>\n" + "\n");
  $templateCache.put('layout-horizontal.html', "<div class=\"lf-layout-horizontal lf-table-item {{getSiblingStatus(item)}} \" ng-if=\"item._horizontalTableHeader && lfData._horizontalTableInfo[item._horizontalTableId]\">\n" + "  <div ng-attr-role=\"{{item.header ? 'heading' : undefined}}\"\n" + "       ng-attr-aria-level=\"{{item.header ? item._displayLevel+1 : undefined}}\"\n" + "       class=\"lf-form-horizontal-table-title lf-de-label\">\n" + "    <span class=\"lf-question\"><label id=\"label-{{ item._elementId }}\">{{item.question}}</label></span>\n" + "    <span class=\"lf-item-code\" ng-show=\"lfData.templateOptions.showQuestionCode\">\n" + "        <a ng-if=\"item._linkToDef\" href=\"{{ item._linkToDef }}\" target=\"_blank\" rel=\"noopener noreferrer\">[{{ item.questionCode }}]</a>\n" + "        <span ng-if=\"!item._linkToDef\">[{{ item.questionCode }}]</span>\n" + "      </span>\n" + "    <span ng-switch on=\"getCodingInstructionsDisplayType(item)\" ng-if=\"item.codingInstructions\">\n" + "        <span ng-switch-when=\"inline-html\" class=\"lf-prompt\" ng-bind-html=\"getTrustedCodingInstructions(item)\"></span>\n" + "        <span ng-switch-when=\"inline-escaped\" class=\"lf-prompt\" ng-bind=\"item.codingInstructions\"></span>\n" + "        <button ng-switch-when=\"popover-html\" class=\"lf-help-button btn-sm\" uib-popover-template=\"'popover.html'\"\n" + "                popover-trigger=\"focus\" popover-placement=\"right\"  popover-title=\"Instruction\"\n" + "                type=\"button\" id=\"help-{{item._elementId}}\" aria-label=\"Help\"\n" + "                aria-describedby=\"label-{{ item._elementId }}\">\n" + "          <span class=\"glyphicon glyphicon-question-sign\" aria-hidden=\"true\"></span>\n" + "        </button>\n" + "        <button ng-switch-when=\"popover-escaped\" class=\"lf-help-button btn-sm\" uib-popover=\"{{item.codingInstructions}}\"\n" + "                popover-trigger=\"focus\" popover-placement=\"right\"  popover-title=\"Instruction\"\n" + "                type=\"button\" id=\"help-{{item._elementId}}\" aria-label=\"Help\"\n" + "                aria-describedby=\"label-{{ item._elementId }}\">\n" + "          <span class=\"glyphicon glyphicon-question-sign\" aria-hidden=\"true\"></span>\n" + "        </button>\n" + "      </span>\n" + "    <button ng-if=\"item.copyrightNotice\" id=\"copyright-{{item._elementId}}\" type=\"button\"\n" + "            class=\"lf-copyright-button btn-sm\" uib-popover=\"{{item.copyrightNotice}}\"\n" + "            popover-trigger=\"focus\" popover-placement=\"right\" popover-title=\"Copyright\"\n" + "            aria-label=\"Copyright notice\" aria-describedby=\"label-{{ item._elementId }}\">\n" + "      <span class=\"glyphicon glyphicon-copyright-mark\" aria-hidden=\"true\"></span>\n" + "    </button>\n" + "    <button ng-if=\"isItemOptionPanelButtonShown(item)\" type=\"button\" class=\"lf-control-button btn-sm\"\n" + "            ng-click=\"hideShowItemOptionPanel(item)\" aria-label=\"Item controls\"\n" + "            aria-describedby=\"label-{{ item._elementId }}\">\n" + "      <span class=\"glyphicon glyphicon-cog\" aria-hidden=\"true\"></span>\n" + "    </button>\n" + "    <!-- TBD -->\n" + "    <lf-item-options></lf-item-options>\n" + "  </div>\n" + "\n" + "  <table class=\"lf-form-horizontal-table\">\n" + "    <colgroup>\n" + "      <col class=\"lf-de-button\" ng-if=\"item._questionRepeatable && lfData._horizontalTableInfo[item._horizontalTableId].tableRows.length>1\">\n" + "      <col ng-repeat=\"col in lfData._horizontalTableInfo[item._horizontalTableId].columnHeaders\"\n" + "           ng-style=\"getTableColumnStyle(col)\">\n" + "    </colgroup>\n" + "    <thead>\n" + "    <tr>\n" + "      <th class=\"lf-form-horizontal-table-header\" ng-if=\"item._questionRepeatable && lfData._horizontalTableInfo[item._horizontalTableId].tableRows.length>1\"></th>\n" + "      <th ng-repeat=\"col in lfData._horizontalTableInfo[item._horizontalTableId].columnHeaders\"\n" + "          class=\"lf-form-horizontal-table-header\"\n" + "          id=\"{{col.id}}\">{{col.label}}</th>\n" + "    </tr>\n" + "    </thead>\n" + "    <tbody id=\"\" class=\"\">\n" + "    <tr ng-repeat=\"row in lfData._horizontalTableInfo[item._horizontalTableId].tableRows track by $index\"\n" + "        class=\"data-row has-ng-animate\">\n" + "      <td class=\"lf-de-button\" ng-if=\"item._questionRepeatable && lfData._horizontalTableInfo[item._horizontalTableId].tableRows.length>1\">\n" + "        <button ng-if=\"!hasOneRepeatingItem(item)\" type=\"button\"\n" + "                id=\"del-{{row.header._elementId}}\"\n" + "                class=\"lf-float-button\" ng-click=\"removeOneRepeatingItem(row.header)\"\n" + "                title='Remove this row of \"{{ row.header.question }}\"'>-</button>\n" + "      </td>\n" + "\n" + "      <td ng-repeat=\"cell in row.cells\"\n" + "          class=\"hasTooltip {{getRowClass(cell)}} {{getSkipLogicClass(cell)}} {{getActiveRowClass(cell)}}\"\n" + "          ng-switch on=\"cell.dataType\">\n" + "        <ng-form name=\"innerForm2\">\n" + "          <div class=\"lf-form-item-data tooltipContainer\">\n" + "            <div class=\"tooltipContent\" lf-validate=\"cell\" ng-model=\"cell.value\" ng-if=\"cell._hasValidation\"></div>\n" + "            <span ng-switch-when=\"\" > </span>\n" + "            <input ng-switch-when=\"CNE\" name=\"{{cell.question + '_' + $id}}\" type=\"text\"\n" + "                   ng-model=\"cell.value\"\n" + "                   autocomplete-lhc=\"cell._autocompOptions\"\n" + "                   ng-disabled=\"cell._readOnly\" placeholder=\"{{cell._toolTip}}\"\n" + "                   id=\"{{cell._elementId}}\"\n" + "                   aria-labelledby=\"{{lfData._horizontalTableInfo[item._horizontalTableId].columnHeaders[$index].id}}\"\n" + "                   ng-focus=\"setActiveRow(cell)\" ng-blur=\"activeRowOnBlur(cell)\">\n" + "            <input ng-switch-when=\"CWE\" name=\"{{cell.question + '_' + $id}}\" type=\"text\"\n" + "                   ng-model=\"cell.value\"\n" + "                   autocomplete-lhc=\"cell._autocompOptions\"\n" + "                   ng-disabled=\"cell._readOnly\" placeholder=\"{{cell._toolTip}}\"\n" + "                   id=\"{{cell._elementId}}\"\n" + "                   aria-labelledby=\"{{lfData._horizontalTableInfo[item._horizontalTableId].columnHeaders[$index].id}}\"\n" + "                   ng-focus=\"setActiveRow(cell)\" ng-blur=\"activeRowOnBlur(cell)\">\n" + "            <input ng-switch-when=\"REAL\" name=\"{{cell.question}}\" type=\"text\"\n" + "                   ng-model=\"cell.value\"\n" + "                   placeholder=\"{{cell._toolTip}}\" ng-disabled=\"cell._readOnly\"\n" + "                   id=\"{{cell._elementId}}\"\n" + "                   aria-labelledby=\"{{lfData._horizontalTableInfo[item._horizontalTableId].columnHeaders[$index].id}}\"\n" + "                   ng-focus=\"setActiveRow(cell)\" ng-blur=\"activeRowOnBlur(cell)\">\n" + "            <input ng-switch-when=\"INT\" name=\"{{cell.question}}\" type=\"text\"\n" + "                   ng-model=\"cell.value\"\n" + "                   placeholder=\"{{cell._toolTip}}\" ng-disabled=\"cell._readOnly\"\n" + "                   id=\"{{cell._elementId}}\"\n" + "                   aria-labelledby=\"{{lfData._horizontalTableInfo[item._horizontalTableId].columnHeaders[$index].id}}\"\n" + "                   ng-focus=\"setActiveRow(cell)\" ng-blur=\"activeRowOnBlur(cell)\">\n" + "            <input ng-switch-when=\"DT\" name=\"{{cell.question}}\" type=\"text\"\n" + "                   ng-model=\"cell.value\"\n" + "                   lf-date=\"dateOptions\" placeholder=\"{{cell._toolTip}}\" ng-disabled=\"cell._readOnly\"\n" + "                   id=\"{{cell._elementId}}\"\n" + "                   aria-labelledby=\"{{lfData._horizontalTableInfo[item._horizontalTableId].columnHeaders[$index].id}}\"\n" + "                   ng-focus=\"setActiveRow(cell)\" ng-blur=\"activeRowOnBlur(cell)\">\n" + "            <textarea ng-switch-when=\"TX\" name=\"{{cell.question}}\"\n" + "                      ng-model=\"cell.value\" placeholder=\"{{cell._toolTip}}\" ng-disabled=\"cell._readOnly\"\n" + "                      id=\"{{cell._elementId}}\"\n" + "                      aria-labelledby=\"{{lfData._horizontalTableInfo[item._horizontalTableId].columnHeaders[$index].id}}\"\n" + "                      ng-keyup=\"autoExpand($event)\" rows=\"1\"\n" + "                      ng-focus=\"setActiveRow(cell)\" ng-blur=\"activeRowOnBlur(cell)\"></textarea>\n" + "            <input ng-switch-default name=\"{{cell.question}}\" type=\"text\"\n" + "                   ng-model=\"cell.value\" placeholder=\"{{cell._toolTip}}\" ng-disabled=\"cell._readOnly\"\n" + "                   id=\"{{cell._elementId}}\"\n" + "                   aria-labelledby=\"{{lfData._horizontalTableInfo[item._horizontalTableId].columnHeaders[$index].id}}\"\n" + "                   ng-focus=\"setActiveRow(cell)\" ng-blur=\"activeRowOnBlur(cell)\">\n" + "          </div>\n" + "        </ng-form>\n" + "      </td>\n" + "    </tr>\n" + "    </tbody>\n" + "  </table>\n" + "\n" + "  <div ng-if=\"item._questionRepeatable && targetShown(item) \"\n" + "       class=\"lf-form-table-row button-row {{getSkipLogicClass(item)}}\">\n" + "    <div class=\"has-popover-warning\">\n" + "      <button type=\"button\"\n" + "              class=\"lf-float-button\" id=\"add-{{item._elementId}}\"\n" + "              ng-click=\"addOneRepeatingItem(item, true)\"\n" + "              ng-blur=\"hideUnusedItemWarning(item)\"\n" + "              uib-popover='Please enter info in the blank \"{{ item.question }}\".'\n" + "              popover-placement=\"top-left\"\n" + "              popover-trigger=\"none\"\n" + "              popover-is-open=\"item._showUnusedItemWarning\">\n" + "        + Add another \"{{item.question}}\"\n" + "      </button>\n" + "    </div>\n" + "  </div>\n" + "</div>\n" + "\n");
  $templateCache.put('layout-matrix.html', "<div class=\"lf-layout-matrix lf-table-item {{getSiblingStatus(item)}}\">\n" + "  <div ng-attr-role=\"{{item.header ? 'heading' : undefined}}\"\n" + "       ng-attr-aria-level=\"{{item.header ? item._displayLevel+1 : undefined}}\"\n" + "       class=\"lf-form-matrix-table-title lf-de-label\">\n" + "    <span class=\"lf-question\"><label id=\"label-{{ item._elementId }}\">{{item.question}}</label></span>\n" + "    <span class=\"lf-item-code\" ng-show=\"lfData.templateOptions.showQuestionCode\">\n" + "      <a ng-if=\"item._linkToDef\" href=\"{{ item._linkToDef }}\" target=\"_blank\" rel=\"noopener noreferrer\">[{{ item.questionCode }}]</a>\n" + "      <span ng-if=\"!item._linkToDef\">[{{ item.questionCode }}]</span>\n" + "    </span>\n" + "    <span ng-switch on=\"getCodingInstructionsDisplayType(item)\" ng-if=\"item.codingInstructions\">\n" + "      <span ng-switch-when=\"inline-html\" class=\"lf-prompt\" ng-bind-html=\"getTrustedCodingInstructions(item)\"\n" + "       id=\"help-{{ item._elementId }}\"></span>\n" + "      <span ng-switch-when=\"inline-escaped\" class=\"lf-prompt\" ng-bind=\"item.codingInstructions\"\n" + "       id=\"help-{{ item._elementId }}\"></span>\n" + "      <button ng-switch-when=\"popover-html\" class=\"lf-help-button btn-sm\" uib-popover-template=\"'popover.html'\"\n" + "              popover-trigger=\"focus\" popover-placement=\"right\"  popover-title=\"Instruction\"\n" + "              type=\"button\" id=\"helpButton-{{item._elementId}}\" aria-label=\"Help\"\n" + "              aria-describedby=\"label-{{ item._elementId }}\">\n" + "        <span class=\"glyphicon glyphicon-question-sign\" aria-hidden=\"true\"></span>\n" + "      </button>\n" + "      <button ng-switch-when=\"popover-escaped\" class=\"lf-help-button btn-sm\" uib-popover=\"{{item.codingInstructions}}\"\n" + "              popover-trigger=\"focus\" popover-placement=\"right\"  popover-title=\"Instruction\"\n" + "              type=\"button\" id=\"helpButton-{{item._elementId}}\" aria-label=\"Help\"\n" + "              aria-describedby=\"label-{{ item._elementId }}\">\n" + "        <span class=\"glyphicon glyphicon-question-sign\" aria-hidden=\"true\"></span>\n" + "      </button>\n" + "    </span>\n" + "    <button ng-if=\"item.copyrightNotice\" id=\"copyright-{{item._elementId}}\" type=\"button\"\n" + "            class=\"lf-copyright-button btn-sm\" uib-popover=\"{{item.copyrightNotice}}\"\n" + "            popover-trigger=\"focus\" popover-placement=\"right\" popover-title=\"Copyright\"\n" + "            aria-label=\"Copyright notice\" aria-describedby=\"label-{{ item._elementId }}\">\n" + "      <span class=\"glyphicon glyphicon-copyright-mark\" aria-hidden=\"true\"></span>\n" + "    </button>\n" + "    <button ng-if=\"isItemOptionPanelButtonShown(item)\" type=\"button\" class=\"lf-control-button btn-sm\"\n" + "            ng-click=\"hideShowItemOptionPanel(item)\" aria-label=\"Item controls\"\n" + "            aria-describedby=\"label-{{item._elementId}}\">\n" + "      <span class=\"glyphicon glyphicon-cog\" aria-hidden=\"true\"></span>\n" + "    </button>\n" + "    <!-- TBD -->\n" + "    <lf-item-options></lf-item-options>\n" + "  </div>\n" + "  <table class=\"lf-form-matrix-table lf-form-table\">\n" + "      <colgroup>\n" + "        <col class=\"lf-question\">\n" + "        <col ng-repeat=\"answer in item.items[0].answers\">\n" + "        <col class=\"other-answer\" ng-if=\"item.items[0].dataType ==='CWE'\">\n" + "      </colgroup>\n" + "      <thead>\n" + "      <tr class=\"lf-\">\n" + "        <th class=\"lf-question lf-form-table-header\"></th>\n" + "        <th ng-repeat=\"answer in item.items[0].answers\"\n" + "            class=\"lf-form-matrix-cell lf-form-table-header\"\n" + "            id=\"answer-{{$index}}\">{{answer.text}}</th>\n" + "        <th class=\"lf-form-matrix-cell-other lf-form-table-header\" ng-if=\"item.items[0].dataType ==='CWE'\"\n" + "         id=\"otherAnswer\">Other</th>\n" + "      </tr>\n" + "      </thead>\n" + "      <tbody>\n" + "      <tr ng-repeat=\"subItem in item.items\" role=\"radiogroup\"\n" + "         aria-labeledby=\"label-{{subItem._elementId }}\"\n" + "         aria-describedby=\"help-{{ subItem._parentItem._elementId }} help-{{ subItem._elementId }}\">\n" + "        <td class=\"lf-question\">\n" + "          <div class=\"lf-de-label\">\n" + "            <span class=\"lf-question\"><label id=\"label-{{ subItem._elementId }}\"\n" + "             for=\"{{subItem._elementId}}\">{{subItem.question}}</label></span>\n" + "            <span class=\"lf-item-code\" ng-show=\"lfData.templateOptions.showQuestionCode\">\n" + "              <a ng-if=\"subItem._linkToDef\" href=\"{{ subItem._linkToDef }}\" target=\"_blank\" rel=\"noopener noreferrer\">[{{ subItem.questionCode }}]</a>\n" + "              <span ng-if=\"!subItem._linkToDef\">[{{ subItem.questionCode }}]</span>\n" + "            </span>\n" + "            <span ng-switch on=\"getCodingInstructionsDisplayType(subItem)\" ng-if=\"subItem.codingInstructions\">\n" + "              <span ng-switch-when=\"inline-html\" id=\"help-{{subItem._elementId}}\"\n" + "               class=\"lf-prompt\" ng-bind-html=\"getTrustedCodingInstructions(subItem)\"></span>\n" + "              <span ng-switch-when=\"inline-escaped\" id=\"help-{{subItem._elementId}}\"\n" + "               class=\"lf-prompt\" ng-bind=\"subItem.codingInstructions\"></span>\n" + "              <button ng-switch-when=\"popover-html\" class=\"lf-help-button btn-sm\" uib-popover-template=\"'popover.html'\"\n" + "                      popover-trigger=\"focus\" popover-placement=\"right\"  popover-title=\"Instruction\"\n" + "                      type=\"button\" id=\"helpButton-{{subItem._elementId}}\"\n" + "                      aria-label=\"Help\" aria-describedby=\"label-{{ subItem._elementId }}\">\n" + "                <span class=\"glyphicon glyphicon-question-sign\" aria-hidden=\"true\"></span>\n" + "              </button>\n" + "              <button ng-switch-when=\"popover-escaped\" class=\"lf-help-button btn-sm\" uib-popover=\"{{subItem.codingInstructions}}\"\n" + "                      popover-trigger=\"focus\" popover-placement=\"right\"  popover-title=\"Instruction\"\n" + "                      type=\"button\" id=\"helpButton-{{subItem._elementId}}\" aria-label=\"Help\"\n" + "                      aria-describedby=\"label-{{ subItem._elementId }}\">\n" + "                <span class=\"glyphicon glyphicon-question-sign\" aria-hidden=\"true\"></span>\n" + "              </button>\n" + "            </span>\n" + "            <button ng-if=\"subItem.copyrightNotice\" id=\"copyright-{{subItem._elementId}}\" type=\"button\"\n" + "                    class=\"lf-copyright-button btn-sm\" uib-popover=\"{{subItem.copyrightNotice}}\"\n" + "                    popover-trigger=\"focus\" popover-placement=\"right\" popover-title=\"Copyright\"\n" + "                    aria-label=\"Copyright notice\"\n" + "                    aria-describedby=\"label-{{ subItem._elementId }}\">\n" + "              <span class=\"glyphicon glyphicon-copyright-mark\" aria-hidden=\"true\"></span>\n" + "            </button>\n" + "          </div>\n" + "        </td>\n" + "        <td ng-repeat=\"answer in item.items[0].answers\"\n" + "         class=\"lf-form-matrix-cell\">\n" + "          <span class=\"lf-form-matrix-answer\">\n" + "            <label ng-if=\"subItem._multipleAnswers\">\n" + "              <input type=\"checkbox\" id=\"{{subItem._elementId + answer.code}}\"\n" + "               ng-click=\"updateCheckboxList(subItem, answer)\" aria-labeledby=\"answer-{{$index}}\">\n" + "            </label>\n" + "            <label ng-if=\"!subItem._multipleAnswers\">\n" + "              <input type=\"radio\" id=\"{{subItem._elementId + answer.code}}\"\n" + "               aria-labeledby=\"answer-{{$index}}\" ng-model=\"subItem.value\" ng-value=\"answer\"\n" + "                     name=\"{{subItem._elementId}}\" ng-click=\"updateRadioList(subItem)\">\n" + "            </label>\n" + "          </span>\n" + "        </td>\n" + "        <td class=\"lf-form-matrix-cell-other\" ng-if=\"subItem.dataType ==='CWE'\"\n" + "         aria-labeledby=otherAnswer>\n" + "          <!--for multiple answers-->\n" + "          <span ng-if=\"subItem._multipleAnswers\" class=\"lf-form-matrix-answer\">\n" + "            <label>\n" + "              <input type=\"checkbox\" ng-model=\"subItem._otherValueChecked\"\n" + "                     id=\"{{subItem._elementId + '_other'}}\"\n" + "                     ng-click=\"updateCheckboxListForOther(subItem, {'code':subItem.valueOther,'text':subItem.valueOther})\">\n" + "            </label>\n" + "            <label>\n" + "              <input type=\"text\" ng-model=\"subItem.valueOther\"\n" + "                     id=\"{{subItem._elementId + '_otherValue'}}\"\n" + "                     ng-change=\"updateCheckboxListForOther(subItem, {'code':subItem.valueOther,'text':subItem.valueOther})\">\n" + "            </label>\n" + "          </span>\n" + "          <!--for single answer-->\n" + "          <span ng-if=\"!subItem._multipleAnswers\" class=\"lf-form-matrix-answer\">\n" + "            <label>\n" + "              <input type=\"radio\" id=\"{{subItem._elementId + '_other'}}\" ng-model=\"subItem._otherValueChecked\"\n" + "                     ng-value=\"true\" name=\"{{subItem._elementId}}\"\n" + "                     ng-click=\"updateRadioListForOther(subItem, {'code':subItem.valueOther,'text':subItem.valueOther})\">\n" + "            </label>\n" + "            <label>\n" + "              <input type=\"text\" id=\"{{subItem._elementId + '_otherValue'}}\" ng-model=\"subItem.valueOther\"\n" + "                     ng-change=\"updateRadioListForOther(subItem, {'code':subItem.valueOther,'text':subItem.valueOther})\">\n" + "            </label>\n" + "          </span>\n" + "        </td>\n" + "      </tr>\n" + "      </tbody>\n" + "    </table>\n" + "  <lf-repeating-button></lf-repeating-button>\n" + "</div>\n" + "\n");
  $templateCache.put('popover-content.html', "<div class=\"lf-popover\" ng-bind-html=\"getTrustedCodingInstructions(item)\"></div>\n");
  $templateCache.put('repeating-button.html', "<!--a button at the end of each repeating section-->\n" + "<div ng-if=\"item._lastRepeatingItem && targetShown(item) \"\n" + "     class=\"lf-form-table-row button-row {{getSkipLogicClass(item)}}\">\n" + "  <div class=\"has-popover-warning\">\n" + "    <button type=\"button\"\n" + "            class=\"lf-float-button\" id=\"add-{{item._elementId}}\"\n" + "            ng-click=\"addOneRepeatingItem(item)\"\n" + "            ng-blur=\"hideUnusedItemWarning(item)\"\n" + "            uib-popover='{{item._unusedItemWarning}}'\n" + "            popover-placement=\"top-left\"\n" + "            popover-trigger=\"none\"\n" + "            popover-is-open=\"item._showUnusedItemWarning\">\n" + "      + Add another \"{{item.question}}\"\n" + "    </button>\n" + "  </div>\n" + "</div>\n");
  $templateCache.put('table-item.html', "<div class=\"lf-table-item {{getSiblingStatus(item)}}\">\n" + "  <!-- question -->\n" + "  <lf-item ng-style=\"getItemStyle(item)\"></lf-item>\n" + "\n" + "  <!--sub sections, check each item's layout -->\n" + "  <div ng-if=\"item.items\" class=\"section\">\n" + "    <div ng-repeat=\"item in item.items\" ng-if=\"targetShown(item)\"\n" + "         class=\"data-row has-ng-animate {{getRowClass(item)}} {{getSkipLogicClass(item)}}\n" + "         {{getActiveRowClass(item)}} {{getItemViewModeClass(item)}}\">\n" + "      <div ng-if=\"item.header\" ng-switch on=\"item.displayControl.questionLayout\">\n" + "        <div ng-switch-when=\"horizontal\">\n" + "          <lf-section-horizontal></lf-section-horizontal>\n" + "        </div>\n" + "        <div ng-switch-when=\"matrix\">\n" + "          <lf-section-matrix></lf-section-matrix>\n" + "        </div>\n" + "        <div ng-switch-when=\"vertical\">\n" + "          <lf-table-item></lf-table-item>\n" + "        </div>\n" + "        <div ng-switch-default>\n" + "          <lf-table-item></lf-table-item>\n" + "        </div>\n" + "      </div>\n" + "      <div ng-if=\"!item.header\">\n" + "        <lf-table-item></lf-table-item>\n" + "      </div>\n" + "    </div>\n" + "  </div>\n" + "  <lf-repeating-button></lf-repeating-button>\n" + "</div>");
  $templateCache.put('template-table.html', "<form ng-if=\"lfData\" class=\"lf-form lf-template-table {{getIndentationStyle()}}\" novalidate autocomplete=\"false\"\n" + "      ng-keydown=\"handleNavigationKeyEventByTab($event)\">\n" + "    <!--form controls-->\n" + "    <lf-form-controls></lf-form-controls>\n" + "    <!--form title-->\n" + "    <lf-form-title></lf-form-title>\n" + "    <!-- form options -->\n" + "    <lf-form-options></lf-form-options>\n" + "    <!--form header-->\n" + "    <lf-form-header></lf-form-header>\n" + "    <!--form body-->\n" + "    <div class=\"lf-form-body\">\n" + "      <!--check form level questionLayout for matrix and horizontal layouts-->\n" + "      <div ng-switch on=\"lfData.templateOptions.displayControl.questionLayout\">\n" + "        <!--horizontal-->\n" + "        <div ng-switch-when=\"horizontal\" class=\"lf-top-section\">\n" + "          <lf-section-horizontal></lf-section-horizontal>\n" + "        </div>\n" + "        <!--matrix-->\n" + "        <div ng-switch-when=\"matrix\" class=\"lf-top-section\">\n" + "          <lf-section-matrix></lf-section-matrix>\n" + "        </div>\n" + "        <!--vertical-->\n" + "        <div ng-switch-default>\n" + "          <!-- data row, column header -->\n" + "          <div class=\"lf-column-header\" ng-if=\"lfData.templateOptions.showColumnHeaders\">\n" + "            <div class=\"lf-column-label-button\" id=\"th_Name\">\n" + "              {{lfData.templateOptions.columnHeaders[0].name}}\n" + "            </div>\n" + "            <div class=\"lf-column-input-unit\" ng-style=\"getFieldWidth(item)\">\n" + "              <div class=\"lf-column-input\" id=\"th_Value\">\n" + "                {{lfData.templateOptions.columnHeaders[1].name}}\n" + "              </div>\n" + "              <div ng-if=\"!lfData.templateOptions.hideUnits\" class=\"lf-column-unit\" id=\"th_Units\">\n" + "                {{lfData.templateOptions.columnHeaders[2].name}}\n" + "              </div>\n" + "            </div>\n" + "          </div>\n" + "          <!-- data row, for each item -->\n" + "          <!-- check each top level item's questionLayout -->\n" + "          <div ng-if=\"lfData.items\" class=\"lf-form-table\">\n" + "            <div ng-repeat=\"item in lfData.items\" ng-if=\"targetShown(item)\"\n" + "                 class=\"data-row has-ng-animate {{getRowClass(item)}} {{getSkipLogicClass(item)}}\n" + "                 {{getActiveRowClass(item)}} {{getItemViewModeClass(item)}}\">\n" + "              <!--header item-->\n" + "              <div ng-if=\"item.header\" ng-switch on=\"item.displayControl.questionLayout\">\n" + "                <div ng-switch-when=\"horizontal\">\n" + "                  <lf-section-horizontal></lf-section-horizontal>\n" + "                </div>\n" + "                <div ng-switch-when=\"matrix\">\n" + "                  <lf-section-matrix></lf-section-matrix>\n" + "                </div>\n" + "                <div ng-switch-when=\"vertical\">\n" + "                  <lf-table-item></lf-table-item>\n" + "                </div>\n" + "                <div ng-switch-default>\n" + "                  <lf-table-item></lf-table-item>\n" + "                </div>\n" + "              </div>\n" + "              <!--non-header data item-->\n" + "              <div ng-if=\"!item.header\">\n" + "                <lf-table-item></lf-table-item>\n" + "              </div>\n" + "            </div>\n" + "          </div>\n" + "        </div>\n" + "      </div>\n" + "    </div>\n" + "</form>\n");
  $templateCache.put('uib-popover-templates/uib-popover-template.html', "<div class=\"popover\"\n" + "  tooltip-animation-class=\"fade\"\n" + "  uib-tooltip-classes\n" + "  ng-class=\"{ in: isOpen() }\">\n" + "  <div class=\"arrow\"></div>\n" + "\n" + "  <div aria-live=polite class=\"popover-inner\">\n" + "      <h3 class=\"popover-title\" ng-bind=\"uibTitle\" ng-if=\"uibTitle\"></h3>\n" + "      <div class=\"popover-content\"\n" + "        uib-tooltip-template-transclude=\"contentExp()\"\n" + "        tooltip-template-transclude-scope=\"originScope()\"></div>\n" + "  </div>\n" + "</div>\n");
  $templateCache.put('uib-popover-templates/uib-popover.html', "<div class=\"popover\"\n" + "  tooltip-animation-class=\"fade\"\n" + "  uib-tooltip-classes\n" + "  ng-class=\"{ in: isOpen() }\">\n" + "  <div class=\"arrow\"></div>\n" + "\n" + "  <div aria-live=polite class=\"popover-inner\">\n" + "      <h3 class=\"popover-title\" ng-bind=\"uibTitle\" ng-if=\"uibTitle\"></h3>\n" + "      <div class=\"popover-content\" ng-bind=\"content\" ng-if=\"content\"></div>\n" + "  </div>\n" + "</div>\n");
}]);

/***/ }),
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var forEach = __webpack_require__(37).forEach;

var elementUtilsMaker = __webpack_require__(38);

var listenerHandlerMaker = __webpack_require__(39);

var idGeneratorMaker = __webpack_require__(40);

var idHandlerMaker = __webpack_require__(41);

var reporterMaker = __webpack_require__(42);

var browserDetector = __webpack_require__(43);

var batchProcessorMaker = __webpack_require__(44);

var stateHandler = __webpack_require__(46); //Detection strategies.


var objectStrategyMaker = __webpack_require__(47);

var scrollStrategyMaker = __webpack_require__(48);

function isCollection(obj) {
  return Array.isArray(obj) || obj.length !== undefined;
}

function toArray(collection) {
  if (!Array.isArray(collection)) {
    var array = [];
    forEach(collection, function (obj) {
      array.push(obj);
    });
    return array;
  } else {
    return collection;
  }
}

function isElement(obj) {
  return obj && obj.nodeType === 1;
}
/**
 * @typedef idHandler
 * @type {object}
 * @property {function} get Gets the resize detector id of the element.
 * @property {function} set Generate and sets the resize detector id of the element.
 */

/**
 * @typedef Options
 * @type {object}
 * @property {boolean} callOnAdd    Determines if listeners should be called when they are getting added.
                                    Default is true. If true, the listener is guaranteed to be called when it has been added.
                                    If false, the listener will not be guarenteed to be called when it has been added (does not prevent it from being called).
 * @property {idHandler} idHandler  A custom id handler that is responsible for generating, setting and retrieving id's for elements.
                                    If not provided, a default id handler will be used.
 * @property {reporter} reporter    A custom reporter that handles reporting logs, warnings and errors.
                                    If not provided, a default id handler will be used.
                                    If set to false, then nothing will be reported.
 * @property {boolean} debug        If set to true, the the system will report debug messages as default for the listenTo method.
 */

/**
 * Creates an element resize detector instance.
 * @public
 * @param {Options?} options Optional global options object that will decide how this instance will work.
 */


module.exports = function (options) {
  options = options || {}; //idHandler is currently not an option to the listenTo function, so it should not be added to globalOptions.

  var idHandler;

  if (options.idHandler) {
    // To maintain compatability with idHandler.get(element, readonly), make sure to wrap the given idHandler
    // so that readonly flag always is true when it's used here. This may be removed next major version bump.
    idHandler = {
      get: function get(element) {
        return options.idHandler.get(element, true);
      },
      set: options.idHandler.set
    };
  } else {
    var idGenerator = idGeneratorMaker();
    var defaultIdHandler = idHandlerMaker({
      idGenerator: idGenerator,
      stateHandler: stateHandler
    });
    idHandler = defaultIdHandler;
  } //reporter is currently not an option to the listenTo function, so it should not be added to globalOptions.


  var reporter = options.reporter;

  if (!reporter) {
    //If options.reporter is false, then the reporter should be quiet.
    var quiet = reporter === false;
    reporter = reporterMaker(quiet);
  } //batchProcessor is currently not an option to the listenTo function, so it should not be added to globalOptions.


  var batchProcessor = getOption(options, "batchProcessor", batchProcessorMaker({
    reporter: reporter
  })); //Options to be used as default for the listenTo function.

  var globalOptions = {};
  globalOptions.callOnAdd = !!getOption(options, "callOnAdd", true);
  globalOptions.debug = !!getOption(options, "debug", false);
  var eventListenerHandler = listenerHandlerMaker(idHandler);
  var elementUtils = elementUtilsMaker({
    stateHandler: stateHandler
  }); //The detection strategy to be used.

  var detectionStrategy;
  var desiredStrategy = getOption(options, "strategy", "object");
  var strategyOptions = {
    reporter: reporter,
    batchProcessor: batchProcessor,
    stateHandler: stateHandler,
    idHandler: idHandler
  };

  if (desiredStrategy === "scroll") {
    if (browserDetector.isLegacyOpera()) {
      reporter.warn("Scroll strategy is not supported on legacy Opera. Changing to object strategy.");
      desiredStrategy = "object";
    } else if (browserDetector.isIE(9)) {
      reporter.warn("Scroll strategy is not supported on IE9. Changing to object strategy.");
      desiredStrategy = "object";
    }
  }

  if (desiredStrategy === "scroll") {
    detectionStrategy = scrollStrategyMaker(strategyOptions);
  } else if (desiredStrategy === "object") {
    detectionStrategy = objectStrategyMaker(strategyOptions);
  } else {
    throw new Error("Invalid strategy name: " + desiredStrategy);
  } //Calls can be made to listenTo with elements that are still being installed.
  //Also, same elements can occur in the elements list in the listenTo function.
  //With this map, the ready callbacks can be synchronized between the calls
  //so that the ready callback can always be called when an element is ready - even if
  //it wasn't installed from the function itself.


  var onReadyCallbacks = {};
  /**
   * Makes the given elements resize-detectable and starts listening to resize events on the elements. Calls the event callback for each event for each element.
   * @public
   * @param {Options?} options Optional options object. These options will override the global options. Some options may not be overriden, such as idHandler.
   * @param {element[]|element} elements The given array of elements to detect resize events of. Single element is also valid.
   * @param {function} listener The callback to be executed for each resize event for each element.
   */

  function listenTo(options, elements, listener) {
    function onResizeCallback(element) {
      var listeners = eventListenerHandler.get(element);
      forEach(listeners, function callListenerProxy(listener) {
        listener(element);
      });
    }

    function addListener(callOnAdd, element, listener) {
      eventListenerHandler.add(element, listener);

      if (callOnAdd) {
        listener(element);
      }
    } //Options object may be omitted.


    if (!listener) {
      listener = elements;
      elements = options;
      options = {};
    }

    if (!elements) {
      throw new Error("At least one element required.");
    }

    if (!listener) {
      throw new Error("Listener required.");
    }

    if (isElement(elements)) {
      // A single element has been passed in.
      elements = [elements];
    } else if (isCollection(elements)) {
      // Convert collection to array for plugins.
      // TODO: May want to check so that all the elements in the collection are valid elements.
      elements = toArray(elements);
    } else {
      return reporter.error("Invalid arguments. Must be a DOM element or a collection of DOM elements.");
    }

    var elementsReady = 0;
    var callOnAdd = getOption(options, "callOnAdd", globalOptions.callOnAdd);
    var onReadyCallback = getOption(options, "onReady", function noop() {});
    var debug = getOption(options, "debug", globalOptions.debug);
    forEach(elements, function attachListenerToElement(element) {
      if (!stateHandler.getState(element)) {
        stateHandler.initState(element);
        idHandler.set(element);
      }

      var id = idHandler.get(element);
      debug && reporter.log("Attaching listener to element", id, element);

      if (!elementUtils.isDetectable(element)) {
        debug && reporter.log(id, "Not detectable.");

        if (elementUtils.isBusy(element)) {
          debug && reporter.log(id, "System busy making it detectable"); //The element is being prepared to be detectable. Do not make it detectable.
          //Just add the listener, because the element will soon be detectable.

          addListener(callOnAdd, element, listener);
          onReadyCallbacks[id] = onReadyCallbacks[id] || [];
          onReadyCallbacks[id].push(function onReady() {
            elementsReady++;

            if (elementsReady === elements.length) {
              onReadyCallback();
            }
          });
          return;
        }

        debug && reporter.log(id, "Making detectable..."); //The element is not prepared to be detectable, so do prepare it and add a listener to it.

        elementUtils.markBusy(element, true);
        return detectionStrategy.makeDetectable({
          debug: debug
        }, element, function onElementDetectable(element) {
          debug && reporter.log(id, "onElementDetectable");

          if (stateHandler.getState(element)) {
            elementUtils.markAsDetectable(element);
            elementUtils.markBusy(element, false);
            detectionStrategy.addListener(element, onResizeCallback);
            addListener(callOnAdd, element, listener); // Since the element size might have changed since the call to "listenTo", we need to check for this change,
            // so that a resize event may be emitted.
            // Having the startSize object is optional (since it does not make sense in some cases such as unrendered elements), so check for its existance before.
            // Also, check the state existance before since the element may have been uninstalled in the installation process.

            var state = stateHandler.getState(element);

            if (state && state.startSize) {
              var width = element.offsetWidth;
              var height = element.offsetHeight;

              if (state.startSize.width !== width || state.startSize.height !== height) {
                onResizeCallback(element);
              }
            }

            if (onReadyCallbacks[id]) {
              forEach(onReadyCallbacks[id], function (callback) {
                callback();
              });
            }
          } else {
            // The element has been unisntalled before being detectable.
            debug && reporter.log(id, "Element uninstalled before being detectable.");
          }

          delete onReadyCallbacks[id];
          elementsReady++;

          if (elementsReady === elements.length) {
            onReadyCallback();
          }
        });
      }

      debug && reporter.log(id, "Already detecable, adding listener."); //The element has been prepared to be detectable and is ready to be listened to.

      addListener(callOnAdd, element, listener);
      elementsReady++;
    });

    if (elementsReady === elements.length) {
      onReadyCallback();
    }
  }

  function uninstall(elements) {
    if (!elements) {
      return reporter.error("At least one element is required.");
    }

    if (isElement(elements)) {
      // A single element has been passed in.
      elements = [elements];
    } else if (isCollection(elements)) {
      // Convert collection to array for plugins.
      // TODO: May want to check so that all the elements in the collection are valid elements.
      elements = toArray(elements);
    } else {
      return reporter.error("Invalid arguments. Must be a DOM element or a collection of DOM elements.");
    }

    forEach(elements, function (element) {
      eventListenerHandler.removeAllListeners(element);
      detectionStrategy.uninstall(element);
      stateHandler.cleanState(element);
    });
  }

  return {
    listenTo: listenTo,
    removeListener: eventListenerHandler.removeListener,
    removeAllListeners: eventListenerHandler.removeAllListeners,
    uninstall: uninstall
  };
};

function getOption(options, name, defaultValue) {
  var value = options[name];

  if ((value === undefined || value === null) && defaultValue !== undefined) {
    return defaultValue;
  }

  return value;
}

/***/ }),
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = module.exports = {};
/**
 * Loops through the collection and calls the callback for each element. if the callback returns truthy, the loop is broken and returns the same value.
 * @public
 * @param {*} collection The collection to loop through. Needs to have a length property set and have indices set from 0 to length - 1.
 * @param {function} callback The callback to be called for each element. The element will be given as a parameter to the callback. If this callback returns truthy, the loop is broken and the same value is returned.
 * @returns {*} The value that a callback has returned (if truthy). Otherwise nothing.
 */

utils.forEach = function (collection, callback) {
  for (var i = 0; i < collection.length; i++) {
    var result = callback(collection[i]);

    if (result) {
      return result;
    }
  }
};

/***/ }),
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function (options) {
  var getState = options.stateHandler.getState;
  /**
   * Tells if the element has been made detectable and ready to be listened for resize events.
   * @public
   * @param {element} The element to check.
   * @returns {boolean} True or false depending on if the element is detectable or not.
   */

  function isDetectable(element) {
    var state = getState(element);
    return state && !!state.isDetectable;
  }
  /**
   * Marks the element that it has been made detectable and ready to be listened for resize events.
   * @public
   * @param {element} The element to mark.
   */


  function markAsDetectable(element) {
    getState(element).isDetectable = true;
  }
  /**
   * Tells if the element is busy or not.
   * @public
   * @param {element} The element to check.
   * @returns {boolean} True or false depending on if the element is busy or not.
   */


  function isBusy(element) {
    return !!getState(element).busy;
  }
  /**
   * Marks the object is busy and should not be made detectable.
   * @public
   * @param {element} element The element to mark.
   * @param {boolean} busy If the element is busy or not.
   */


  function markBusy(element, busy) {
    getState(element).busy = !!busy;
  }

  return {
    isDetectable: isDetectable,
    markAsDetectable: markAsDetectable,
    isBusy: isBusy,
    markBusy: markBusy
  };
};

/***/ }),
/* 39 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function (idHandler) {
  var eventListeners = {};
  /**
   * Gets all listeners for the given element.
   * @public
   * @param {element} element The element to get all listeners for.
   * @returns All listeners for the given element.
   */

  function getListeners(element) {
    var id = idHandler.get(element);

    if (id === undefined) {
      return [];
    }

    return eventListeners[id] || [];
  }
  /**
   * Stores the given listener for the given element. Will not actually add the listener to the element.
   * @public
   * @param {element} element The element that should have the listener added.
   * @param {function} listener The callback that the element has added.
   */


  function addListener(element, listener) {
    var id = idHandler.get(element);

    if (!eventListeners[id]) {
      eventListeners[id] = [];
    }

    eventListeners[id].push(listener);
  }

  function removeListener(element, listener) {
    var listeners = getListeners(element);

    for (var i = 0, len = listeners.length; i < len; ++i) {
      if (listeners[i] === listener) {
        listeners.splice(i, 1);
        break;
      }
    }
  }

  function removeAllListeners(element) {
    var listeners = getListeners(element);

    if (!listeners) {
      return;
    }

    listeners.length = 0;
  }

  return {
    get: getListeners,
    add: addListener,
    removeListener: removeListener,
    removeAllListeners: removeAllListeners
  };
};

/***/ }),
/* 40 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function () {
  var idCount = 1;
  /**
   * Generates a new unique id in the context.
   * @public
   * @returns {number} A unique id in the context.
   */

  function generate() {
    return idCount++;
  }

  return {
    generate: generate
  };
};

/***/ }),
/* 41 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function (options) {
  var idGenerator = options.idGenerator;
  var getState = options.stateHandler.getState;
  /**
   * Gets the resize detector id of the element.
   * @public
   * @param {element} element The target element to get the id of.
   * @returns {string|number|null} The id of the element. Null if it has no id.
   */

  function getId(element) {
    var state = getState(element);

    if (state && state.id !== undefined) {
      return state.id;
    }

    return null;
  }
  /**
   * Sets the resize detector id of the element. Requires the element to have a resize detector state initialized.
   * @public
   * @param {element} element The target element to set the id of.
   * @returns {string|number|null} The id of the element.
   */


  function setId(element) {
    var state = getState(element);

    if (!state) {
      throw new Error("setId required the element to have a resize detection state.");
    }

    var id = idGenerator.generate();
    state.id = id;
    return id;
  }

  return {
    get: getId,
    set: setId
  };
};

/***/ }),
/* 42 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/* global console: false */

/**
 * Reporter that handles the reporting of logs, warnings and errors.
 * @public
 * @param {boolean} quiet Tells if the reporter should be quiet or not.
 */

module.exports = function (quiet) {
  function noop() {//Does nothing.
  }

  var reporter = {
    log: noop,
    warn: noop,
    error: noop
  };

  if (!quiet && window.console) {
    var attachFunction = function attachFunction(reporter, name) {
      //The proxy is needed to be able to call the method with the console context,
      //since we cannot use bind.
      reporter[name] = function reporterProxy() {
        var f = console[name];

        if (f.apply) {
          //IE9 does not support console.log.apply :)
          f.apply(console, arguments);
        } else {
          for (var i = 0; i < arguments.length; i++) {
            f(arguments[i]);
          }
        }
      };
    };

    attachFunction(reporter, "log");
    attachFunction(reporter, "warn");
    attachFunction(reporter, "error");
  }

  return reporter;
};

/***/ }),
/* 43 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var detector = module.exports = {};

detector.isIE = function (version) {
  function isAnyIeVersion() {
    var agent = navigator.userAgent.toLowerCase();
    return agent.indexOf("msie") !== -1 || agent.indexOf("trident") !== -1 || agent.indexOf(" edge/") !== -1;
  }

  if (!isAnyIeVersion()) {
    return false;
  }

  if (!version) {
    return true;
  } //Shamelessly stolen from https://gist.github.com/padolsey/527683


  var ieVersion = function () {
    var undef,
        v = 3,
        div = document.createElement("div"),
        all = div.getElementsByTagName("i");

    do {
      div.innerHTML = "<!--[if gt IE " + ++v + "]><i></i><![endif]-->";
    } while (all[0]);

    return v > 4 ? v : undef;
  }();

  return version === ieVersion;
};

detector.isLegacyOpera = function () {
  return !!window.opera;
};

/***/ }),
/* 44 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(45);

module.exports = function batchProcessorMaker(options) {
  options = options || {};
  var reporter = options.reporter;
  var asyncProcess = utils.getOption(options, "async", true);
  var autoProcess = utils.getOption(options, "auto", true);

  if (autoProcess && !asyncProcess) {
    reporter && reporter.warn("Invalid options combination. auto=true and async=false is invalid. Setting async=true.");
    asyncProcess = true;
  }

  var batch = Batch();
  var asyncFrameHandler;
  var isProcessing = false;

  function addFunction(level, fn) {
    if (!isProcessing && autoProcess && asyncProcess && batch.size() === 0) {
      // Since this is async, it is guaranteed to be executed after that the fn is added to the batch.
      // This needs to be done before, since we're checking the size of the batch to be 0.
      processBatchAsync();
    }

    batch.add(level, fn);
  }

  function processBatch() {
    // Save the current batch, and create a new batch so that incoming functions are not added into the currently processing batch.
    // Continue processing until the top-level batch is empty (functions may be added to the new batch while processing, and so on).
    isProcessing = true;

    while (batch.size()) {
      var processingBatch = batch;
      batch = Batch();
      processingBatch.process();
    }

    isProcessing = false;
  }

  function forceProcessBatch(localAsyncProcess) {
    if (isProcessing) {
      return;
    }

    if (localAsyncProcess === undefined) {
      localAsyncProcess = asyncProcess;
    }

    if (asyncFrameHandler) {
      cancelFrame(asyncFrameHandler);
      asyncFrameHandler = null;
    }

    if (localAsyncProcess) {
      processBatchAsync();
    } else {
      processBatch();
    }
  }

  function processBatchAsync() {
    asyncFrameHandler = requestFrame(processBatch);
  }

  function clearBatch() {
    batch = {};
    batchSize = 0;
    topLevel = 0;
    bottomLevel = 0;
  }

  function cancelFrame(listener) {
    // var cancel = window.cancelAnimationFrame || window.mozCancelAnimationFrame || window.webkitCancelAnimationFrame || window.clearTimeout;
    var cancel = clearTimeout;
    return cancel(listener);
  }

  function requestFrame(callback) {
    // var raf = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || function(fn) { return window.setTimeout(fn, 20); };
    var raf = function raf(fn) {
      return setTimeout(fn, 0);
    };

    return raf(callback);
  }

  return {
    add: addFunction,
    force: forceProcessBatch
  };
};

function Batch() {
  var batch = {};
  var size = 0;
  var topLevel = 0;
  var bottomLevel = 0;

  function add(level, fn) {
    if (!fn) {
      fn = level;
      level = 0;
    }

    if (level > topLevel) {
      topLevel = level;
    } else if (level < bottomLevel) {
      bottomLevel = level;
    }

    if (!batch[level]) {
      batch[level] = [];
    }

    batch[level].push(fn);
    size++;
  }

  function process() {
    for (var level = bottomLevel; level <= topLevel; level++) {
      var fns = batch[level];

      for (var i = 0; i < fns.length; i++) {
        var fn = fns[i];
        fn();
      }
    }
  }

  function getSize() {
    return size;
  }

  return {
    add: add,
    process: process,
    size: getSize
  };
}

/***/ }),
/* 45 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = module.exports = {};
utils.getOption = getOption;

function getOption(options, name, defaultValue) {
  var value = options[name];

  if ((value === undefined || value === null) && defaultValue !== undefined) {
    return defaultValue;
  }

  return value;
}

/***/ }),
/* 46 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var prop = "_erd";

function initState(element) {
  element[prop] = {};
  return getState(element);
}

function getState(element) {
  return element[prop];
}

function cleanState(element) {
  delete element[prop];
}

module.exports = {
  initState: initState,
  getState: getState,
  cleanState: cleanState
};

/***/ }),
/* 47 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Resize detection strategy that injects objects to elements in order to detect resize events.
 * Heavily inspired by: http://www.backalleycoder.com/2013/03/18/cross-browser-event-based-element-resize-detection/
 */


var browserDetector = __webpack_require__(43);

module.exports = function (options) {
  options = options || {};
  var reporter = options.reporter;
  var batchProcessor = options.batchProcessor;
  var getState = options.stateHandler.getState;

  if (!reporter) {
    throw new Error("Missing required dependency: reporter.");
  }
  /**
   * Adds a resize event listener to the element.
   * @public
   * @param {element} element The element that should have the listener added.
   * @param {function} listener The listener callback to be called for each resize event of the element. The element will be given as a parameter to the listener callback.
   */


  function addListener(element, listener) {
    if (!getObject(element)) {
      throw new Error("Element is not detectable by this strategy.");
    }

    function listenerProxy() {
      listener(element);
    }

    if (browserDetector.isIE(8)) {
      //IE 8 does not support object, but supports the resize event directly on elements.
      getState(element).object = {
        proxy: listenerProxy
      };
      element.attachEvent("onresize", listenerProxy);
    } else {
      var object = getObject(element);
      object.contentDocument.defaultView.addEventListener("resize", listenerProxy);
    }
  }
  /**
   * Makes an element detectable and ready to be listened for resize events. Will call the callback when the element is ready to be listened for resize changes.
   * @private
   * @param {object} options Optional options object.
   * @param {element} element The element to make detectable
   * @param {function} callback The callback to be called when the element is ready to be listened for resize changes. Will be called with the element as first parameter.
   */


  function makeDetectable(options, element, callback) {
    if (!callback) {
      callback = element;
      element = options;
      options = null;
    }

    options = options || {};
    var debug = options.debug;

    function injectObject(element, callback) {
      var OBJECT_STYLE = "display: block; position: absolute; top: 0; left: 0; width: 100%; height: 100%; border: none; padding: 0; margin: 0; opacity: 0; z-index: -1000; pointer-events: none;"; //The target element needs to be positioned (everything except static) so the absolute positioned object will be positioned relative to the target element.
      // Position altering may be performed directly or on object load, depending on if style resolution is possible directly or not.

      var positionCheckPerformed = false; // The element may not yet be attached to the DOM, and therefore the style object may be empty in some browsers.
      // Since the style object is a reference, it will be updated as soon as the element is attached to the DOM.

      var style = window.getComputedStyle(element);
      var width = element.offsetWidth;
      var height = element.offsetHeight;
      getState(element).startSize = {
        width: width,
        height: height
      };

      function mutateDom() {
        function alterPositionStyles() {
          if (style.position === "static") {
            element.style.position = "relative";

            var removeRelativeStyles = function removeRelativeStyles(reporter, element, style, property) {
              function getNumericalValue(value) {
                return value.replace(/[^-\d\.]/g, "");
              }

              var value = style[property];

              if (value !== "auto" && getNumericalValue(value) !== "0") {
                reporter.warn("An element that is positioned static has style." + property + "=" + value + " which is ignored due to the static positioning. The element will need to be positioned relative, so the style." + property + " will be set to 0. Element: ", element);
                element.style[property] = 0;
              }
            }; //Check so that there are no accidental styles that will make the element styled differently now that is is relative.
            //If there are any, set them to 0 (this should be okay with the user since the style properties did nothing before [since the element was positioned static] anyway).


            removeRelativeStyles(reporter, element, style, "top");
            removeRelativeStyles(reporter, element, style, "right");
            removeRelativeStyles(reporter, element, style, "bottom");
            removeRelativeStyles(reporter, element, style, "left");
          }
        }

        function onObjectLoad() {
          // The object has been loaded, which means that the element now is guaranteed to be attached to the DOM.
          if (!positionCheckPerformed) {
            alterPositionStyles();
          }
          /*jshint validthis: true */


          function getDocument(element, callback) {
            //Opera 12 seem to call the object.onload before the actual document has been created.
            //So if it is not present, poll it with an timeout until it is present.
            //TODO: Could maybe be handled better with object.onreadystatechange or similar.
            if (!element.contentDocument) {
              setTimeout(function checkForObjectDocument() {
                getDocument(element, callback);
              }, 100);
              return;
            }

            callback(element.contentDocument);
          } //Mutating the object element here seems to fire another load event.
          //Mutating the inner document of the object element is fine though.


          var objectElement = this; //Create the style element to be added to the object.

          getDocument(objectElement, function onObjectDocumentReady(objectDocument) {
            //Notify that the element is ready to be listened to.
            callback(element);
          });
        } // The element may be detached from the DOM, and some browsers does not support style resolving of detached elements.
        // The alterPositionStyles needs to be delayed until we know the element has been attached to the DOM (which we are sure of when the onObjectLoad has been fired), if style resolution is not possible.


        if (style.position !== "") {
          alterPositionStyles(style);
          positionCheckPerformed = true;
        } //Add an object element as a child to the target element that will be listened to for resize events.


        var object = document.createElement("object");
        object.style.cssText = OBJECT_STYLE;
        object.tabIndex = -1;
        object.type = "text/html";
        object.setAttribute("aria-hidden", "true");
        object.onload = onObjectLoad; //Safari: This must occur before adding the object to the DOM.
        //IE: Does not like that this happens before, even if it is also added after.

        if (!browserDetector.isIE()) {
          object.data = "about:blank";
        }

        element.appendChild(object);
        getState(element).object = object; //IE: This must occur after adding the object to the DOM.

        if (browserDetector.isIE()) {
          object.data = "about:blank";
        }
      }

      if (batchProcessor) {
        batchProcessor.add(mutateDom);
      } else {
        mutateDom();
      }
    }

    if (browserDetector.isIE(8)) {
      //IE 8 does not support objects properly. Luckily they do support the resize event.
      //So do not inject the object and notify that the element is already ready to be listened to.
      //The event handler for the resize event is attached in the utils.addListener instead.
      callback(element);
    } else {
      injectObject(element, callback);
    }
  }
  /**
   * Returns the child object of the target element.
   * @private
   * @param {element} element The target element.
   * @returns The object element of the target.
   */


  function getObject(element) {
    return getState(element).object;
  }

  function uninstall(element) {
    if (browserDetector.isIE(8)) {
      element.detachEvent("onresize", getState(element).object.proxy);
    } else {
      element.removeChild(getObject(element));
    }

    delete getState(element).object;
  }

  return {
    makeDetectable: makeDetectable,
    addListener: addListener,
    uninstall: uninstall
  };
};

/***/ }),
/* 48 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Resize detection strategy that injects divs to elements in order to detect resize events on scroll events.
 * Heavily inspired by: https://github.com/marcj/css-element-queries/blob/master/src/ResizeSensor.js
 */


var forEach = __webpack_require__(37).forEach;

module.exports = function (options) {
  options = options || {};
  var reporter = options.reporter;
  var batchProcessor = options.batchProcessor;
  var getState = options.stateHandler.getState;
  var hasState = options.stateHandler.hasState;
  var idHandler = options.idHandler;

  if (!batchProcessor) {
    throw new Error("Missing required dependency: batchProcessor");
  }

  if (!reporter) {
    throw new Error("Missing required dependency: reporter.");
  } //TODO: Could this perhaps be done at installation time?


  var scrollbarSizes = getScrollbarSizes(); // Inject the scrollbar styling that prevents them from appearing sometimes in Chrome.
  // The injected container needs to have a class, so that it may be styled with CSS (pseudo elements).

  var styleId = "erd_scroll_detection_scrollbar_style";
  var detectionContainerClass = "erd_scroll_detection_container";
  injectScrollStyle(styleId, detectionContainerClass);

  function getScrollbarSizes() {
    var width = 500;
    var height = 500;
    var child = document.createElement("div");
    child.style.cssText = "position: absolute; width: " + width * 2 + "px; height: " + height * 2 + "px; visibility: hidden; margin: 0; padding: 0;";
    var container = document.createElement("div");
    container.style.cssText = "position: absolute; width: " + width + "px; height: " + height + "px; overflow: scroll; visibility: none; top: " + -width * 3 + "px; left: " + -height * 3 + "px; visibility: hidden; margin: 0; padding: 0;";
    container.appendChild(child);
    document.body.insertBefore(container, document.body.firstChild);
    var widthSize = width - container.clientWidth;
    var heightSize = height - container.clientHeight;
    document.body.removeChild(container);
    return {
      width: widthSize,
      height: heightSize
    };
  }

  function injectScrollStyle(styleId, containerClass) {
    function injectStyle(style, method) {
      method = method || function (element) {
        document.head.appendChild(element);
      };

      var styleElement = document.createElement("style");
      styleElement.innerHTML = style;
      styleElement.id = styleId;
      method(styleElement);
      return styleElement;
    }

    if (!document.getElementById(styleId)) {
      var containerAnimationClass = containerClass + "_animation";
      var containerAnimationActiveClass = containerClass + "_animation_active";
      var style = "/* Created by the element-resize-detector library. */\n";
      style += "." + containerClass + " > div::-webkit-scrollbar { display: none; }\n\n";
      style += "." + containerAnimationActiveClass + " { -webkit-animation-duration: 0.1s; animation-duration: 0.1s; -webkit-animation-name: " + containerAnimationClass + "; animation-name: " + containerAnimationClass + "; }\n";
      style += "@-webkit-keyframes " + containerAnimationClass + " { 0% { opacity: 1; } 50% { opacity: 0; } 100% { opacity: 1; } }\n";
      style += "@keyframes " + containerAnimationClass + " { 0% { opacity: 1; } 50% { opacity: 0; } 100% { opacity: 1; } }";
      injectStyle(style);
    }
  }

  function addAnimationClass(element) {
    element.className += " " + detectionContainerClass + "_animation_active";
  }

  function addEvent(el, name, cb) {
    if (el.addEventListener) {
      el.addEventListener(name, cb);
    } else if (el.attachEvent) {
      el.attachEvent("on" + name, cb);
    } else {
      return reporter.error("[scroll] Don't know how to add event listeners.");
    }
  }

  function removeEvent(el, name, cb) {
    if (el.removeEventListener) {
      el.removeEventListener(name, cb);
    } else if (el.detachEvent) {
      el.detachEvent("on" + name, cb);
    } else {
      return reporter.error("[scroll] Don't know how to remove event listeners.");
    }
  }

  function getExpandElement(element) {
    return getState(element).container.childNodes[0].childNodes[0].childNodes[0];
  }

  function getShrinkElement(element) {
    return getState(element).container.childNodes[0].childNodes[0].childNodes[1];
  }
  /**
   * Adds a resize event listener to the element.
   * @public
   * @param {element} element The element that should have the listener added.
   * @param {function} listener The listener callback to be called for each resize event of the element. The element will be given as a parameter to the listener callback.
   */


  function addListener(element, listener) {
    var listeners = getState(element).listeners;

    if (!listeners.push) {
      throw new Error("Cannot add listener to an element that is not detectable.");
    }

    getState(element).listeners.push(listener);
  }
  /**
   * Makes an element detectable and ready to be listened for resize events. Will call the callback when the element is ready to be listened for resize changes.
   * @private
   * @param {object} options Optional options object.
   * @param {element} element The element to make detectable
   * @param {function} callback The callback to be called when the element is ready to be listened for resize changes. Will be called with the element as first parameter.
   */


  function makeDetectable(options, element, callback) {
    if (!callback) {
      callback = element;
      element = options;
      options = null;
    }

    options = options || {};

    function debug() {
      if (options.debug) {
        var args = Array.prototype.slice.call(arguments);
        args.unshift(idHandler.get(element), "Scroll: ");

        if (reporter.log.apply) {
          reporter.log.apply(null, args);
        } else {
          for (var i = 0; i < args.length; i++) {
            reporter.log(args[i]);
          }
        }
      }
    }

    function isDetached(element) {
      function isInDocument(element) {
        return element === element.ownerDocument.body || element.ownerDocument.body.contains(element);
      }

      if (!isInDocument(element)) {
        return true;
      } // FireFox returns null style in hidden iframes. See https://github.com/wnr/element-resize-detector/issues/68 and https://bugzilla.mozilla.org/show_bug.cgi?id=795520


      if (window.getComputedStyle(element) === null) {
        return true;
      }

      return false;
    }

    function isUnrendered(element) {
      // Check the absolute positioned container since the top level container is display: inline.
      var container = getState(element).container.childNodes[0];
      var style = window.getComputedStyle(container);
      return !style.width || style.width.indexOf("px") === -1; //Can only compute pixel value when rendered.
    }

    function getStyle() {
      // Some browsers only force layouts when actually reading the style properties of the style object, so make sure that they are all read here,
      // so that the user of the function can be sure that it will perform the layout here, instead of later (important for batching).
      var elementStyle = window.getComputedStyle(element);
      var style = {};
      style.position = elementStyle.position;
      style.width = element.offsetWidth;
      style.height = element.offsetHeight;
      style.top = elementStyle.top;
      style.right = elementStyle.right;
      style.bottom = elementStyle.bottom;
      style.left = elementStyle.left;
      style.widthCSS = elementStyle.width;
      style.heightCSS = elementStyle.height;
      return style;
    }

    function storeStartSize() {
      var style = getStyle();
      getState(element).startSize = {
        width: style.width,
        height: style.height
      };
      debug("Element start size", getState(element).startSize);
    }

    function initListeners() {
      getState(element).listeners = [];
    }

    function storeStyle() {
      debug("storeStyle invoked.");

      if (!getState(element)) {
        debug("Aborting because element has been uninstalled");
        return;
      }

      var style = getStyle();
      getState(element).style = style;
    }

    function storeCurrentSize(element, width, height) {
      getState(element).lastWidth = width;
      getState(element).lastHeight = height;
    }

    function getExpandChildElement(element) {
      return getExpandElement(element).childNodes[0];
    }

    function getWidthOffset() {
      return 2 * scrollbarSizes.width + 1;
    }

    function getHeightOffset() {
      return 2 * scrollbarSizes.height + 1;
    }

    function getExpandWidth(width) {
      return width + 10 + getWidthOffset();
    }

    function getExpandHeight(height) {
      return height + 10 + getHeightOffset();
    }

    function getShrinkWidth(width) {
      return width * 2 + getWidthOffset();
    }

    function getShrinkHeight(height) {
      return height * 2 + getHeightOffset();
    }

    function positionScrollbars(element, width, height) {
      var expand = getExpandElement(element);
      var shrink = getShrinkElement(element);
      var expandWidth = getExpandWidth(width);
      var expandHeight = getExpandHeight(height);
      var shrinkWidth = getShrinkWidth(width);
      var shrinkHeight = getShrinkHeight(height);
      expand.scrollLeft = expandWidth;
      expand.scrollTop = expandHeight;
      shrink.scrollLeft = shrinkWidth;
      shrink.scrollTop = shrinkHeight;
    }

    function injectContainerElement() {
      var container = getState(element).container;

      if (!container) {
        container = document.createElement("div");
        container.className = detectionContainerClass;
        container.style.cssText = "visibility: hidden; display: inline; width: 0px; height: 0px; z-index: -1; overflow: hidden; margin: 0; padding: 0;";
        getState(element).container = container;
        addAnimationClass(container);
        element.appendChild(container);

        var onAnimationStart = function onAnimationStart() {
          getState(element).onRendered && getState(element).onRendered();
        };

        addEvent(container, "animationstart", onAnimationStart); // Store the event handler here so that they may be removed when uninstall is called.
        // See uninstall function for an explanation why it is needed.

        getState(element).onAnimationStart = onAnimationStart;
      }

      return container;
    }

    function injectScrollElements() {
      function alterPositionStyles() {
        var style = getState(element).style;

        if (style.position === "static") {
          element.style.position = "relative";

          var removeRelativeStyles = function removeRelativeStyles(reporter, element, style, property) {
            function getNumericalValue(value) {
              return value.replace(/[^-\d\.]/g, "");
            }

            var value = style[property];

            if (value !== "auto" && getNumericalValue(value) !== "0") {
              reporter.warn("An element that is positioned static has style." + property + "=" + value + " which is ignored due to the static positioning. The element will need to be positioned relative, so the style." + property + " will be set to 0. Element: ", element);
              element.style[property] = 0;
            }
          }; //Check so that there are no accidental styles that will make the element styled differently now that is is relative.
          //If there are any, set them to 0 (this should be okay with the user since the style properties did nothing before [since the element was positioned static] anyway).


          removeRelativeStyles(reporter, element, style, "top");
          removeRelativeStyles(reporter, element, style, "right");
          removeRelativeStyles(reporter, element, style, "bottom");
          removeRelativeStyles(reporter, element, style, "left");
        }
      }

      function getLeftTopBottomRightCssText(left, top, bottom, right) {
        left = !left ? "0" : left + "px";
        top = !top ? "0" : top + "px";
        bottom = !bottom ? "0" : bottom + "px";
        right = !right ? "0" : right + "px";
        return "left: " + left + "; top: " + top + "; right: " + right + "; bottom: " + bottom + ";";
      }

      debug("Injecting elements");

      if (!getState(element)) {
        debug("Aborting because element has been uninstalled");
        return;
      }

      alterPositionStyles();
      var rootContainer = getState(element).container;

      if (!rootContainer) {
        rootContainer = injectContainerElement();
      } // Due to this WebKit bug https://bugs.webkit.org/show_bug.cgi?id=80808 (currently fixed in Blink, but still present in WebKit browsers such as Safari),
      // we need to inject two containers, one that is width/height 100% and another that is left/top -1px so that the final container always is 1x1 pixels bigger than
      // the targeted element.
      // When the bug is resolved, "containerContainer" may be removed.
      // The outer container can occasionally be less wide than the targeted when inside inline elements element in WebKit (see https://bugs.webkit.org/show_bug.cgi?id=152980).
      // This should be no problem since the inner container either way makes sure the injected scroll elements are at least 1x1 px.


      var scrollbarWidth = scrollbarSizes.width;
      var scrollbarHeight = scrollbarSizes.height;
      var containerContainerStyle = "position: absolute; flex: none; overflow: hidden; z-index: -1; visibility: hidden; width: 100%; height: 100%; left: 0px; top: 0px;";
      var containerStyle = "position: absolute; flex: none; overflow: hidden; z-index: -1; visibility: hidden; " + getLeftTopBottomRightCssText(-(1 + scrollbarWidth), -(1 + scrollbarHeight), -scrollbarHeight, -scrollbarWidth);
      var expandStyle = "position: absolute; flex: none; overflow: scroll; z-index: -1; visibility: hidden; width: 100%; height: 100%;";
      var shrinkStyle = "position: absolute; flex: none; overflow: scroll; z-index: -1; visibility: hidden; width: 100%; height: 100%;";
      var expandChildStyle = "position: absolute; left: 0; top: 0;";
      var shrinkChildStyle = "position: absolute; width: 200%; height: 200%;";
      var containerContainer = document.createElement("div");
      var container = document.createElement("div");
      var expand = document.createElement("div");
      var expandChild = document.createElement("div");
      var shrink = document.createElement("div");
      var shrinkChild = document.createElement("div"); // Some browsers choke on the resize system being rtl, so force it to ltr. https://github.com/wnr/element-resize-detector/issues/56
      // However, dir should not be set on the top level container as it alters the dimensions of the target element in some browsers.

      containerContainer.dir = "ltr";
      containerContainer.style.cssText = containerContainerStyle;
      containerContainer.className = detectionContainerClass;
      container.className = detectionContainerClass;
      container.style.cssText = containerStyle;
      expand.style.cssText = expandStyle;
      expandChild.style.cssText = expandChildStyle;
      shrink.style.cssText = shrinkStyle;
      shrinkChild.style.cssText = shrinkChildStyle;
      expand.appendChild(expandChild);
      shrink.appendChild(shrinkChild);
      container.appendChild(expand);
      container.appendChild(shrink);
      containerContainer.appendChild(container);
      rootContainer.appendChild(containerContainer);

      function onExpandScroll() {
        getState(element).onExpand && getState(element).onExpand();
      }

      function onShrinkScroll() {
        getState(element).onShrink && getState(element).onShrink();
      }

      addEvent(expand, "scroll", onExpandScroll);
      addEvent(shrink, "scroll", onShrinkScroll); // Store the event handlers here so that they may be removed when uninstall is called.
      // See uninstall function for an explanation why it is needed.

      getState(element).onExpandScroll = onExpandScroll;
      getState(element).onShrinkScroll = onShrinkScroll;
    }

    function registerListenersAndPositionElements() {
      function updateChildSizes(element, width, height) {
        var expandChild = getExpandChildElement(element);
        var expandWidth = getExpandWidth(width);
        var expandHeight = getExpandHeight(height);
        expandChild.style.width = expandWidth + "px";
        expandChild.style.height = expandHeight + "px";
      }

      function updateDetectorElements(done) {
        var width = element.offsetWidth;
        var height = element.offsetHeight;
        debug("Storing current size", width, height); // Store the size of the element sync here, so that multiple scroll events may be ignored in the event listeners.
        // Otherwise the if-check in handleScroll is useless.

        storeCurrentSize(element, width, height); // Since we delay the processing of the batch, there is a risk that uninstall has been called before the batch gets to execute.
        // Since there is no way to cancel the fn executions, we need to add an uninstall guard to all fns of the batch.

        batchProcessor.add(0, function performUpdateChildSizes() {
          if (!getState(element)) {
            debug("Aborting because element has been uninstalled");
            return;
          }

          if (!areElementsInjected()) {
            debug("Aborting because element container has not been initialized");
            return;
          }

          if (options.debug) {
            var w = element.offsetWidth;
            var h = element.offsetHeight;

            if (w !== width || h !== height) {
              reporter.warn(idHandler.get(element), "Scroll: Size changed before updating detector elements.");
            }
          }

          updateChildSizes(element, width, height);
        });
        batchProcessor.add(1, function updateScrollbars() {
          if (!getState(element)) {
            debug("Aborting because element has been uninstalled");
            return;
          }

          if (!areElementsInjected()) {
            debug("Aborting because element container has not been initialized");
            return;
          }

          positionScrollbars(element, width, height);
        });

        if (done) {
          batchProcessor.add(2, function () {
            if (!getState(element)) {
              debug("Aborting because element has been uninstalled");
              return;
            }

            if (!areElementsInjected()) {
              debug("Aborting because element container has not been initialized");
              return;
            }

            done();
          });
        }
      }

      function areElementsInjected() {
        return !!getState(element).container;
      }

      function notifyListenersIfNeeded() {
        function isFirstNotify() {
          return getState(element).lastNotifiedWidth === undefined;
        }

        debug("notifyListenersIfNeeded invoked");
        var state = getState(element); // Don't notify the if the current size is the start size, and this is the first notification.

        if (isFirstNotify() && state.lastWidth === state.startSize.width && state.lastHeight === state.startSize.height) {
          return debug("Not notifying: Size is the same as the start size, and there has been no notification yet.");
        } // Don't notify if the size already has been notified.


        if (state.lastWidth === state.lastNotifiedWidth && state.lastHeight === state.lastNotifiedHeight) {
          return debug("Not notifying: Size already notified");
        }

        debug("Current size not notified, notifying...");
        state.lastNotifiedWidth = state.lastWidth;
        state.lastNotifiedHeight = state.lastHeight;
        forEach(getState(element).listeners, function (listener) {
          listener(element);
        });
      }

      function handleRender() {
        debug("startanimation triggered.");

        if (isUnrendered(element)) {
          debug("Ignoring since element is still unrendered...");
          return;
        }

        debug("Element rendered.");
        var expand = getExpandElement(element);
        var shrink = getShrinkElement(element);

        if (expand.scrollLeft === 0 || expand.scrollTop === 0 || shrink.scrollLeft === 0 || shrink.scrollTop === 0) {
          debug("Scrollbars out of sync. Updating detector elements...");
          updateDetectorElements(notifyListenersIfNeeded);
        }
      }

      function handleScroll() {
        debug("Scroll detected.");

        if (isUnrendered(element)) {
          // Element is still unrendered. Skip this scroll event.
          debug("Scroll event fired while unrendered. Ignoring...");
          return;
        }

        var width = element.offsetWidth;
        var height = element.offsetHeight;

        if (width !== getState(element).lastWidth || height !== getState(element).lastHeight) {
          debug("Element size changed.");
          updateDetectorElements(notifyListenersIfNeeded);
        } else {
          debug("Element size has not changed (" + width + "x" + height + ").");
        }
      }

      debug("registerListenersAndPositionElements invoked.");

      if (!getState(element)) {
        debug("Aborting because element has been uninstalled");
        return;
      }

      getState(element).onRendered = handleRender;
      getState(element).onExpand = handleScroll;
      getState(element).onShrink = handleScroll;
      var style = getState(element).style;
      updateChildSizes(element, style.width, style.height);
    }

    function finalizeDomMutation() {
      debug("finalizeDomMutation invoked.");

      if (!getState(element)) {
        debug("Aborting because element has been uninstalled");
        return;
      }

      var style = getState(element).style;
      storeCurrentSize(element, style.width, style.height);
      positionScrollbars(element, style.width, style.height);
    }

    function ready() {
      callback(element);
    }

    function install() {
      debug("Installing...");
      initListeners();
      storeStartSize();
      batchProcessor.add(0, storeStyle);
      batchProcessor.add(1, injectScrollElements);
      batchProcessor.add(2, registerListenersAndPositionElements);
      batchProcessor.add(3, finalizeDomMutation);
      batchProcessor.add(4, ready);
    }

    debug("Making detectable...");

    if (isDetached(element)) {
      debug("Element is detached");
      injectContainerElement();
      debug("Waiting until element is attached...");

      getState(element).onRendered = function () {
        debug("Element is now attached");
        install();
      };
    } else {
      install();
    }
  }

  function uninstall(element) {
    var state = getState(element);

    if (!state) {
      // Uninstall has been called on a non-erd element.
      return;
    } // Uninstall may have been called in the following scenarios:
    // (1) Right between the sync code and async batch (here state.busy = true, but nothing have been registered or injected).
    // (2) In the ready callback of the last level of the batch by another element (here, state.busy = true, but all the stuff has been injected).
    // (3) After the installation process (here, state.busy = false and all the stuff has been injected).
    // So to be on the safe side, let's check for each thing before removing.
    // We need to remove the event listeners, because otherwise the event might fire on an uninstall element which results in an error when trying to get the state of the element.


    state.onExpandScroll && removeEvent(getExpandElement(element), "scroll", state.onExpandScroll);
    state.onShrinkScroll && removeEvent(getShrinkElement(element), "scroll", state.onShrinkScroll);
    state.onAnimationStart && removeEvent(state.container, "animationstart", state.onAnimationStart);
    state.container && element.removeChild(state.container);
  }

  return {
    makeDetectable: makeDetectable,
    addListener: addListener,
    uninstall: uninstall
  };
};

/***/ })
/******/ ]);
//# sourceMappingURL=lforms.js.map
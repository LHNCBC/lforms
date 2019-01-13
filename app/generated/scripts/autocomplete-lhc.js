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

Def = {};
Def.PrototypeAPI = __webpack_require__(1);

__webpack_require__(2);

__webpack_require__(3)(Def);

__webpack_require__(4)(Def.PrototypeAPI.$, jQuery, Def);

__webpack_require__(5)(Def.PrototypeAPI.$, Def.Effect);

__webpack_require__(6)(Def.PrototypeAPI.$, Def);

__webpack_require__(7)(Def);

__webpack_require__(8)(Def);

__webpack_require__(9)(Def.PrototypeAPI.$, jQuery, Def);

__webpack_require__(10)(Def.PrototypeAPI.$, jQuery, Def);

__webpack_require__(11)(Def);

__webpack_require__(12)(Def.PrototypeAPI.$, jQuery, Def);

__webpack_require__(13)(Def.PrototypeAPI.$, jQuery, Def);

__webpack_require__(14)(Def.PrototypeAPI.$, jQuery, Def);

__webpack_require__(15)(Def.PrototypeAPI.$, jQuery, Def);

__webpack_require__(16)(Def);

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

// Contains the subset of PrototypeJS APIs needed by this package, reimplemented
// using jQuery.
// Mostly copied (and modified) from the original PrototypeJS at
// http://prototypejs.org/
if (typeof Def === 'undefined') window.Def = {};

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
    var ua = navigator.userAgent;
    var isOpera = Object.prototype.toString.call(window.opera) == '[object Opera]';
    return {
      IE: !!window.attachEvent && !isOpera,
      Opera: isOpera,
      WebKit: ua.indexOf('AppleWebKit/') > -1,
      Gecko: ua.indexOf('Gecko') > -1 && ua.indexOf('KHTML') === -1,
      MobileSafari: /Apple.*Mobile/.test(ua)
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
/* 2 */
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
/* 3 */
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
/* 4 */
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
if (typeof Def === 'undefined') window.Def = {};

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
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

// These two methods are based on code from the web page (but don't use this URL, as it seems to have been
// taken over by some advertising company):
// http://www.garyharan.com/index.php/2007/11/26/how-to-unobtrusively-scroll-a-div-with-prototype-scriptaculous/
// They introduce a scrolling effect that can scroll to x and y coordinates
// instead of an element, and can scroll a div as well as a window.
// Wrap the definitions in a function to protect our version of global variables
(function () {
  function initEffectScroll($, Effect) {
    "use strict";

    var Class = Def.PrototypeAPI.Class;
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
/* 6 */
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
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

if (typeof Def === 'undefined') Def = {};

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
/* 8 */
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
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

if (typeof Def === 'undefined') window.Def = {};

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
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

if (typeof Def === 'undefined') window.Def = {};

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
/* 11 */
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
/* 12 */
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
if (typeof Def === 'undefined') window.Def = {};

(function () {
  // Wrap the definitions in a function to protect our version of global variables
  function initializeBase($, jQuery, Def) {
    "use strict"; // A test for IE, borrowed from PrototypeJS -- and modified.

    var Browser = Def.PrototypeAPI.Browser;
    var isIE = !!window.attachEvent && !Browser.isOpera || navigator.userAgent.indexOf('Trident') >= 0;
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
/* 13 */
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
/* 14 */
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
/* 15 */
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
/* 16 */
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

/***/ })
/******/ ]);
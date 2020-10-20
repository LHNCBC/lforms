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

__webpack_require__(1);
module.exports = __webpack_require__(2);


/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Headers", function() { return Headers; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Request", function() { return Request; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Response", function() { return Response; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DOMException", function() { return DOMException; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "fetch", function() { return fetch; });
var support = {
  searchParams: 'URLSearchParams' in self,
  iterable: 'Symbol' in self && 'iterator' in Symbol,
  blob: 'FileReader' in self && 'Blob' in self && function () {
    try {
      new Blob();
      return true;
    } catch (e) {
      return false;
    }
  }(),
  formData: 'FormData' in self,
  arrayBuffer: 'ArrayBuffer' in self
};

function isDataView(obj) {
  return obj && DataView.prototype.isPrototypeOf(obj);
}

if (support.arrayBuffer) {
  var viewClasses = ['[object Int8Array]', '[object Uint8Array]', '[object Uint8ClampedArray]', '[object Int16Array]', '[object Uint16Array]', '[object Int32Array]', '[object Uint32Array]', '[object Float32Array]', '[object Float64Array]'];

  var isArrayBufferView = ArrayBuffer.isView || function (obj) {
    return obj && viewClasses.indexOf(Object.prototype.toString.call(obj)) > -1;
  };
}

function normalizeName(name) {
  if (typeof name !== 'string') {
    name = String(name);
  }

  if (/[^a-z0-9\-#$%&'*+.^_`|~]/i.test(name)) {
    throw new TypeError('Invalid character in header field name');
  }

  return name.toLowerCase();
}

function normalizeValue(value) {
  if (typeof value !== 'string') {
    value = String(value);
  }

  return value;
} // Build a destructive iterator for the value list


function iteratorFor(items) {
  var iterator = {
    next: function next() {
      var value = items.shift();
      return {
        done: value === undefined,
        value: value
      };
    }
  };

  if (support.iterable) {
    iterator[Symbol.iterator] = function () {
      return iterator;
    };
  }

  return iterator;
}

function Headers(headers) {
  this.map = {};

  if (headers instanceof Headers) {
    headers.forEach(function (value, name) {
      this.append(name, value);
    }, this);
  } else if (Array.isArray(headers)) {
    headers.forEach(function (header) {
      this.append(header[0], header[1]);
    }, this);
  } else if (headers) {
    Object.getOwnPropertyNames(headers).forEach(function (name) {
      this.append(name, headers[name]);
    }, this);
  }
}

Headers.prototype.append = function (name, value) {
  name = normalizeName(name);
  value = normalizeValue(value);
  var oldValue = this.map[name];
  this.map[name] = oldValue ? oldValue + ', ' + value : value;
};

Headers.prototype['delete'] = function (name) {
  delete this.map[normalizeName(name)];
};

Headers.prototype.get = function (name) {
  name = normalizeName(name);
  return this.has(name) ? this.map[name] : null;
};

Headers.prototype.has = function (name) {
  return this.map.hasOwnProperty(normalizeName(name));
};

Headers.prototype.set = function (name, value) {
  this.map[normalizeName(name)] = normalizeValue(value);
};

Headers.prototype.forEach = function (callback, thisArg) {
  for (var name in this.map) {
    if (this.map.hasOwnProperty(name)) {
      callback.call(thisArg, this.map[name], name, this);
    }
  }
};

Headers.prototype.keys = function () {
  var items = [];
  this.forEach(function (value, name) {
    items.push(name);
  });
  return iteratorFor(items);
};

Headers.prototype.values = function () {
  var items = [];
  this.forEach(function (value) {
    items.push(value);
  });
  return iteratorFor(items);
};

Headers.prototype.entries = function () {
  var items = [];
  this.forEach(function (value, name) {
    items.push([name, value]);
  });
  return iteratorFor(items);
};

if (support.iterable) {
  Headers.prototype[Symbol.iterator] = Headers.prototype.entries;
}

function consumed(body) {
  if (body.bodyUsed) {
    return Promise.reject(new TypeError('Already read'));
  }

  body.bodyUsed = true;
}

function fileReaderReady(reader) {
  return new Promise(function (resolve, reject) {
    reader.onload = function () {
      resolve(reader.result);
    };

    reader.onerror = function () {
      reject(reader.error);
    };
  });
}

function readBlobAsArrayBuffer(blob) {
  var reader = new FileReader();
  var promise = fileReaderReady(reader);
  reader.readAsArrayBuffer(blob);
  return promise;
}

function readBlobAsText(blob) {
  var reader = new FileReader();
  var promise = fileReaderReady(reader);
  reader.readAsText(blob);
  return promise;
}

function readArrayBufferAsText(buf) {
  var view = new Uint8Array(buf);
  var chars = new Array(view.length);

  for (var i = 0; i < view.length; i++) {
    chars[i] = String.fromCharCode(view[i]);
  }

  return chars.join('');
}

function bufferClone(buf) {
  if (buf.slice) {
    return buf.slice(0);
  } else {
    var view = new Uint8Array(buf.byteLength);
    view.set(new Uint8Array(buf));
    return view.buffer;
  }
}

function Body() {
  this.bodyUsed = false;

  this._initBody = function (body) {
    this._bodyInit = body;

    if (!body) {
      this._bodyText = '';
    } else if (typeof body === 'string') {
      this._bodyText = body;
    } else if (support.blob && Blob.prototype.isPrototypeOf(body)) {
      this._bodyBlob = body;
    } else if (support.formData && FormData.prototype.isPrototypeOf(body)) {
      this._bodyFormData = body;
    } else if (support.searchParams && URLSearchParams.prototype.isPrototypeOf(body)) {
      this._bodyText = body.toString();
    } else if (support.arrayBuffer && support.blob && isDataView(body)) {
      this._bodyArrayBuffer = bufferClone(body.buffer); // IE 10-11 can't handle a DataView body.

      this._bodyInit = new Blob([this._bodyArrayBuffer]);
    } else if (support.arrayBuffer && (ArrayBuffer.prototype.isPrototypeOf(body) || isArrayBufferView(body))) {
      this._bodyArrayBuffer = bufferClone(body);
    } else {
      this._bodyText = body = Object.prototype.toString.call(body);
    }

    if (!this.headers.get('content-type')) {
      if (typeof body === 'string') {
        this.headers.set('content-type', 'text/plain;charset=UTF-8');
      } else if (this._bodyBlob && this._bodyBlob.type) {
        this.headers.set('content-type', this._bodyBlob.type);
      } else if (support.searchParams && URLSearchParams.prototype.isPrototypeOf(body)) {
        this.headers.set('content-type', 'application/x-www-form-urlencoded;charset=UTF-8');
      }
    }
  };

  if (support.blob) {
    this.blob = function () {
      var rejected = consumed(this);

      if (rejected) {
        return rejected;
      }

      if (this._bodyBlob) {
        return Promise.resolve(this._bodyBlob);
      } else if (this._bodyArrayBuffer) {
        return Promise.resolve(new Blob([this._bodyArrayBuffer]));
      } else if (this._bodyFormData) {
        throw new Error('could not read FormData body as blob');
      } else {
        return Promise.resolve(new Blob([this._bodyText]));
      }
    };

    this.arrayBuffer = function () {
      if (this._bodyArrayBuffer) {
        return consumed(this) || Promise.resolve(this._bodyArrayBuffer);
      } else {
        return this.blob().then(readBlobAsArrayBuffer);
      }
    };
  }

  this.text = function () {
    var rejected = consumed(this);

    if (rejected) {
      return rejected;
    }

    if (this._bodyBlob) {
      return readBlobAsText(this._bodyBlob);
    } else if (this._bodyArrayBuffer) {
      return Promise.resolve(readArrayBufferAsText(this._bodyArrayBuffer));
    } else if (this._bodyFormData) {
      throw new Error('could not read FormData body as text');
    } else {
      return Promise.resolve(this._bodyText);
    }
  };

  if (support.formData) {
    this.formData = function () {
      return this.text().then(decode);
    };
  }

  this.json = function () {
    return this.text().then(JSON.parse);
  };

  return this;
} // HTTP methods whose capitalization should be normalized


var methods = ['DELETE', 'GET', 'HEAD', 'OPTIONS', 'POST', 'PUT'];

function normalizeMethod(method) {
  var upcased = method.toUpperCase();
  return methods.indexOf(upcased) > -1 ? upcased : method;
}

function Request(input, options) {
  options = options || {};
  var body = options.body;

  if (input instanceof Request) {
    if (input.bodyUsed) {
      throw new TypeError('Already read');
    }

    this.url = input.url;
    this.credentials = input.credentials;

    if (!options.headers) {
      this.headers = new Headers(input.headers);
    }

    this.method = input.method;
    this.mode = input.mode;
    this.signal = input.signal;

    if (!body && input._bodyInit != null) {
      body = input._bodyInit;
      input.bodyUsed = true;
    }
  } else {
    this.url = String(input);
  }

  this.credentials = options.credentials || this.credentials || 'same-origin';

  if (options.headers || !this.headers) {
    this.headers = new Headers(options.headers);
  }

  this.method = normalizeMethod(options.method || this.method || 'GET');
  this.mode = options.mode || this.mode || null;
  this.signal = options.signal || this.signal;
  this.referrer = null;

  if ((this.method === 'GET' || this.method === 'HEAD') && body) {
    throw new TypeError('Body not allowed for GET or HEAD requests');
  }

  this._initBody(body);
}

Request.prototype.clone = function () {
  return new Request(this, {
    body: this._bodyInit
  });
};

function decode(body) {
  var form = new FormData();
  body.trim().split('&').forEach(function (bytes) {
    if (bytes) {
      var split = bytes.split('=');
      var name = split.shift().replace(/\+/g, ' ');
      var value = split.join('=').replace(/\+/g, ' ');
      form.append(decodeURIComponent(name), decodeURIComponent(value));
    }
  });
  return form;
}

function parseHeaders(rawHeaders) {
  var headers = new Headers(); // Replace instances of \r\n and \n followed by at least one space or horizontal tab with a space
  // https://tools.ietf.org/html/rfc7230#section-3.2

  var preProcessedHeaders = rawHeaders.replace(/\r?\n[\t ]+/g, ' ');
  preProcessedHeaders.split(/\r?\n/).forEach(function (line) {
    var parts = line.split(':');
    var key = parts.shift().trim();

    if (key) {
      var value = parts.join(':').trim();
      headers.append(key, value);
    }
  });
  return headers;
}

Body.call(Request.prototype);
function Response(bodyInit, options) {
  if (!options) {
    options = {};
  }

  this.type = 'default';
  this.status = options.status === undefined ? 200 : options.status;
  this.ok = this.status >= 200 && this.status < 300;
  this.statusText = 'statusText' in options ? options.statusText : 'OK';
  this.headers = new Headers(options.headers);
  this.url = options.url || '';

  this._initBody(bodyInit);
}
Body.call(Response.prototype);

Response.prototype.clone = function () {
  return new Response(this._bodyInit, {
    status: this.status,
    statusText: this.statusText,
    headers: new Headers(this.headers),
    url: this.url
  });
};

Response.error = function () {
  var response = new Response(null, {
    status: 0,
    statusText: ''
  });
  response.type = 'error';
  return response;
};

var redirectStatuses = [301, 302, 303, 307, 308];

Response.redirect = function (url, status) {
  if (redirectStatuses.indexOf(status) === -1) {
    throw new RangeError('Invalid status code');
  }

  return new Response(null, {
    status: status,
    headers: {
      location: url
    }
  });
};

var DOMException = self.DOMException;

try {
  new DOMException();
} catch (err) {
  DOMException = function DOMException(message, name) {
    this.message = message;
    this.name = name;
    var error = Error(message);
    this.stack = error.stack;
  };

  DOMException.prototype = Object.create(Error.prototype);
  DOMException.prototype.constructor = DOMException;
}

function fetch(input, init) {
  return new Promise(function (resolve, reject) {
    var request = new Request(input, init);

    if (request.signal && request.signal.aborted) {
      return reject(new DOMException('Aborted', 'AbortError'));
    }

    var xhr = new XMLHttpRequest();

    function abortXhr() {
      xhr.abort();
    }

    xhr.onload = function () {
      var options = {
        status: xhr.status,
        statusText: xhr.statusText,
        headers: parseHeaders(xhr.getAllResponseHeaders() || '')
      };
      options.url = 'responseURL' in xhr ? xhr.responseURL : options.headers.get('X-Request-URL');
      var body = 'response' in xhr ? xhr.response : xhr.responseText;
      resolve(new Response(body, options));
    };

    xhr.onerror = function () {
      reject(new TypeError('Network request failed'));
    };

    xhr.ontimeout = function () {
      reject(new TypeError('Network request failed'));
    };

    xhr.onabort = function () {
      reject(new DOMException('Aborted', 'AbortError'));
    };

    xhr.open(request.method, request.url, true);

    if (request.credentials === 'include') {
      xhr.withCredentials = true;
    } else if (request.credentials === 'omit') {
      xhr.withCredentials = false;
    }

    if ('responseType' in xhr && support.blob) {
      xhr.responseType = 'blob';
    }

    request.headers.forEach(function (value, name) {
      xhr.setRequestHeader(name, value);
    });

    if (request.signal) {
      request.signal.addEventListener('abort', abortXhr);

      xhr.onreadystatechange = function () {
        // DONE (success or failure)
        if (xhr.readyState === 4) {
          request.signal.removeEventListener('abort', abortXhr);
        }
      };
    }

    xhr.send(typeof request._bodyInit === 'undefined' ? null : request._bodyInit);
  });
}
fetch.polyfill = true;

if (!self.fetch) {
  self.fetch = fetch;
  self.Headers = Headers;
  self.Request = Request;
  self.Response = Response;
}

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

// This is the entry point for the bower version of LForms.  It does not include
// any of the bower dependencies.
var LForms = __webpack_require__(3);

LForms.Def = Def; // from the bower autocomplete-lhc package

if (!LForms.ucumPkg) LForms.ucumPkg = window.ucumPkg; // window.ucumPkg is defined by the bower ucum-lhc package
// The NPM version of lforms puts elementResizeDetectorMaker in an internal
// variable to avoid creating another global.  For compatibility, do the same
// for this bower version.

LForms._elementResizeDetectorMaker = elementResizeDetectorMaker; // bower package

module.exports = LForms;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

// A list of files from the lforms package itself to be combined with webpack.
// For the full list for the bower or npm package, see bower-index.js or
// index.js.
var LForms = __webpack_require__(4);

__webpack_require__(7);

__webpack_require__(8);

__webpack_require__(9);

__webpack_require__(10);

__webpack_require__(11);

__webpack_require__(12);

__webpack_require__(13);

__webpack_require__(15);

__webpack_require__(16);

__webpack_require__(18);

__webpack_require__(19);

LForms.Util.FHIRSupport = __webpack_require__(21);

__webpack_require__(22);

LForms._elementResizeDetectorMaker = __webpack_require__(23);
module.exports = LForms;

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

// Use IIFE so that strict mode is not at the file level
(function () {
  'use strict';

  var widgetDeps = ['smoothScroll', 'autocompleteLhcMod', 'ui.bootstrap.datetimepicker'];

  var Def = __webpack_require__(5);

  if (Def._tooltip) widgetDeps = [Def._animate, Def._popover, Def._tooltip, 'ui.bootstrap'].concat(widgetDeps);else widgetDeps = ['ngAnimate', 'ui.bootstrap'].concat(widgetDeps);
  angular.module('lformsWidget', widgetDeps).config(['$animateProvider', '$rootScopeProvider', function ($animateProvider, $rootScopeProvider) {
    $animateProvider.classNameFilter(/has-ng-animate/); // AngularJS complains if there are too many levels of nesting in the form
    // (due to directives calling directives....)  Increase the maximum from
    // the default of 10.  When the number of levels is exceeded, the form
    // still renders, but error messages appear in the console, and it is
    // probably not properly initialized.

    $rootScopeProvider.digestTtl(20);
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


var LForms = Object.assign({}, __webpack_require__(6));
module.exports = LForms;

/***/ }),
/* 5 */
/***/ (function(module, exports) {

module.exports = Def;

/***/ }),
/* 6 */
/***/ (function(module) {

module.exports = JSON.parse("{\"lformsVersion\":\"26.3.1\"}");

/***/ }),
/* 7 */
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
/* 8 */
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
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var LForms = __webpack_require__(4);

angular.module('lformsWidget').controller('LFormsCtrl', ['$window', '$scope', '$element', '$timeout', '$interval', '$sce', 'smoothScroll', 'LF_CONSTANTS', 'lformsConfig', function ($window, $scope, $element, $timeout, $interval, $sce, smoothScroll, LF_CONSTANTS, lformsConfig) {
  'use strict';

  $scope.debug = false;
  $scope.hasUnused = false;
  $scope.repeatingSectionStatus = {};
  $scope.validationInitialShowTime = LF_CONSTANTS.VALIDATION_MESSAGE_INITIAL_SHOW_TIME; // Provide blank image to satisfy img tag. Bower packaging forces us to
  // avoid using image files from html templates, therefore using base64
  // encoding for a 1x1 blank gif file.

  $scope.blankGifDataUrl = LF_CONSTANTS.BLANK_GIF_DATAURL; // Default option for calendar - for the JQuery datepicker

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
  }; // uib booststrap datetime picker, https://github.com/Gillardo/bootstrap-ui-datetime-picker

  $scope.uibDateTimePickerFormat = "MM/dd/yyyy HH:mm";
  $scope.uibDatePickerAltFormats = ['yyyy', 'M/yyyy', 'MM/yyyy', 'yyyy/M', 'yyyy/MM', 'M/d/yyyy', 'MM/d/yyyy', 'M/dd/yyyy', 'MM/dd/yyyy', "M/d/yyyy HH:mm", "MM/d/yyyy HH:mm", "M/dd/yyyy HH:mm", "yyyy-MM", "yyyy-MM-dd", "yyyy-MM-dd HH:mm"];
  $scope.uibDatePickerOptions = {
    showWeeks: false
  };
  $scope.uibTimePickerOptions = {
    arrowkeys: true //showSeconds: false

  }; // open the uib bootstrap datetime picker

  $scope.openUibDtmPicker = function (e) {
    this.isOpen = true;
  };

  $scope.uibDtmPickerButtonBar = {
    // specify the class for the close button so that we can locate the element.
    // must specify each button but each button's conf fall back to system default if not specified.
    show: true,
    now: {},
    today: {},
    clear: {},
    date: {},
    time: {},
    close: {
      cls: 'btn-sm btn-default lf-dtmpk-close'
    },
    cancel: {}
  }; // Close the uib bootstrap datetime picker if the input field loses focus -
  // if the input loses focus due to clicking on the calendar icon, it will open fine.
  // not intended to use on other fields but having the eleName param make it useful for troubleshooting

  $scope.uibDtmPickerOnBlur = function (eleName) {
    if (eleName === 'input' && this.isOpen) {
      setTimeout(function () {
        document.getElementsByClassName('lf-dtmpk-close')[0].click();
      });
    }
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
    return !!(item._unitAutocompOptions || item._unitReadonly && item.unit && item.unit._displayUnit);
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
    return $scope.lfData.getSkipLogicClass(item) !== 'target-disabled';
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
    return item.codingInstructions ? $sce.trustAsHtml(item.codingInstructions) : '';
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
        else if (oldValues.length > newValues.length) {// rules run at the remove event, TBD
          } // data changes only
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
      if (lfData) {
        // sometimes set to null to clear the page
        if (lfData._hasResponsiveExpr || lfData._hasInitialExpr) {
          // Watch for changes that require FHIRPath to run
          if (lfData._hasResponsiveExpr) {
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
          }
        }

        if (!lfData._controllerInit && (lfData._hasResponsiveExpr || lfData._hasInitialExpr)) {
          lfData._expressionProcessor.runCalculations(true);
        } // Angular calls this twice for the same lfData.  Set a flag.
        // Note:  For some reason the watches still need to be set up both times.


        lfData._controllerInit = true;
      } else {
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
    eleClass += ' lf-datatype-' + item.dataType;

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

    if (item._isHiddenFromView) {
      eleClass += ' lf-hidden-from-view';
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
        if (!item._unusedItemWarning) item._unusedItemWarning = 'Please enter info in the blank "' + item._text + '"';
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
   * @param noDisabledItem optional, to remove items that are disabled by skip logic, the default is false.
   * @returns {{itemsData: (*|Array), templateData: (*|Array)}} form data and template data
   */


  $scope.getUserData = function (noFormDefData, noEmptyValue, noDisabledItem) {
    var formData = $scope.lfData.getUserData(noFormDefData, noEmptyValue, noDisabledItem);
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
   * Note: In the checkbox display layout only one "OTHER" value is allowed, while in autocomplete multiple
   * "OTHER" values are allowed.
   * @param item a form item that has an answer list and supports multiple selections and user typed data.
   * @param otherValue the user typed string value for the "OTHER" checkbox
   */


  $scope.updateCheckboxListForOther = function (item, otherValue) {
    var other = {
      "text": otherValue,
      "_notOnList": true
    }; // add/update the other value

    if (item._otherValueChecked) {
      // the list is not empty
      if (item.value && angular.isArray(item.value)) {
        var found = false;

        for (var i = 0, iLen = item.value.length; i < iLen; i++) {
          if (item.value[i]._notOnList) {
            item.value[i] = other;
            found = true;
            break;
          }
        } // if the other value is not already in the list


        if (!found) {
          // add the other value to the list
          item.value.push(other);
        }
      } // the list is empty
      else {
          // add the other value to the list
          item.value = [other];
        }
    } // remove other value
    else {
        if (item.value && angular.isArray(item.value)) {
          var index,
              found = false;

          for (var i = 0, iLen = item.value.length; i < iLen; i++) {
            if (item.value[i]._notOnList) {
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
   * @param otherValue the user typed string value for the "OTHER" radio button
   */


  $scope.updateRadioListForOther = function (item, otherValue) {
    // add/update the other value
    if (item._otherValueChecked) {
      item.value = {
        "text": otherValue,
        "_notOnList": true
      };
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
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

(function () {
  'use strict';

  var LForms = __webpack_require__(4); //  var angular = require('angular');


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
              element.click(); // without this, the UIB datetime picker does not close (if it were open)

              showing = true;
            };

            opts.onClose = function (value, picker) {
              showing = false;
            };

            element.on('change', function () {
              var valid_date = LForms.Util.stringToDate(this.value);

              if (valid_date) {
                controller.$setViewValue(valid_date);
                element.datepicker("setDate", valid_date);

                if (!showing) {
                  scope.$apply(function () {
                    element.datepicker("setDate", element.datepicker("getDate"));
                    controller.$setViewValue(element.datepicker("getDate"));
                  });
                }
              }
            }); // Update the date picker when the model changes

            controller.$render = function () {
              var date = controller.$viewValue;

              if (angular.isDefined(date) && date !== null && !angular.isDate(date) && typeof date !== "string") {
                throw new Error('ng-Model value must be a Date object or a string - currently it is a ' + _typeof(date));
              } // convert saved user data into date
              else if (typeof date === "string") {
                  date = LForms.Util.stringToDate(date, true);
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
            scope.$parent.sendMsgToScreenReader('"' + item._text + '"' + item._validationErrors[i]);
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
/* 11 */
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
/* 12 */
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
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

/**
 * LForms Utility tools
 */
var moment = __webpack_require__(14); // Acceptable date formats
// Strict parsing -


var parseDateFormats = ['M/D/YYYY', 'M/D/YY', 'M/D', 'M-D-YYYY', 'M-D-YY', 'M-D', 'YYYY', 'YYYY-M-D', 'YYYY/M/D', moment.ISO_8601, 'M/D/YYYY HH:mm', 'M/D/YY HH:mm', 'M/D HH:mm', 'M-D-YYYY HH:mm', 'M-D-YY HH:mm', 'M-D HH:mm'];

var LForms = __webpack_require__(4);

LForms.Util = {
  /**
   *  Adds an LForms form to the page.
   * @param formDataDef A form definiton (either JSON or a parsed object).  Also,
   *  for backward compatibility, this can be the name of a global-scope variable
   *  (on "window") containing that form definition object. A FHIR Questionnaire can be also be
   *  used as a form definition.
   * @param formContainer The ID of a DOM element to contain the form, or the
   *  element itself.  The contents of this element will be replaced by the form.
   *  This element should be outside the scope of any existing AngularJS app on
   *  the page.
   * @param {Object} [options] A hash of options
   * @param {boolean} [options.prepopulate] Set to true if you want FHIR prepopulation to happen (if
   *  the form was an imported FHIR Questionnaire).
   * @param {string} [options.fhirVersion] Optional, version of FHIR used if formDataDef is a FHIR
   *  Questionnaire. options are: `R4` or `STU3`. If not provided an attempt will be made to determine
   *  the version from the Questionnaire content.
   * @return a Promise that will resolve after any needed external FHIR
   *  resources have been loaded (if the form was imported from a FHIR
   *  Questionnaire).
   */
  addFormToPage: function addFormToPage(formDataDef, formContainer, options) {
    var formContainer = typeof formContainer === 'string' ? $('#' + formContainer) : $(formContainer);

    if (typeof formDataDef === 'string') {
      if (formDataDef.indexOf('{') >= 0) // test for JSON
        formDataDef = JSON.parse(formDataDef);else // backward compatibility
        formDataDef = window[formDataDef];
    } // If resourceType is specified assume formDataDef is FHIR


    var resourceType = formDataDef.resourceType;
    var fhirVersion = options && options.fhirVersion;

    if (resourceType === 'Questionnaire') {
      formDataDef = this.convertFHIRQuestionnaireToLForms(formDataDef, fhirVersion);
    } else if (resourceType) {
      throw new Error('Only Questionnaire FHIR content is supported in addFormToPage.');
    }

    if (!this.pageFormID_) this.pageFormID_ = 0;
    var appName = 'LFormsApp' + ++this.pageFormID_;
    var controller = 'LFormsAppController' + this.pageFormID_;
    if (!LForms.addedFormDefs) LForms.addedFormDefs = [];
    var formIndex = LForms.addedFormDefs.length;
    LForms.addedFormDefs.push(formDataDef);
    var prepop = options && options.prepopulate === true;
    formContainer.html('<div ng-controller="' + controller + '">' + '<lforms lf-data="myFormData"></lforms>' + '</div>');
    var rtnPromise = new Promise(function (resolve, reject) {
      angular.module(appName, ["lformsWidget"]).controller(controller, ["$scope", function ($scope) {
        var myFormData = new LForms.LFormsData(LForms.addedFormDefs[formIndex]);

        if (LForms.fhirContext) {
          myFormData.loadFHIRResources(prepop).then(function () {
            $scope.$apply(function () {
              $scope.myFormData = myFormData;
              resolve();
            });
          });
        } else {
          $scope.myFormData = myFormData;
          resolve();
        }
      }]);
    }); // Bootstrap the element if needed
    // Following http://stackoverflow.com/a/34501500/360782

    var isInitialized = formContainer.injector && formContainer.injector();
    if (!isInitialized) angular.bootstrap(formContainer.children(':first'), [appName]);
    return rtnPromise;
  },

  /**
   * Get user input data from the form, with or without form definition data.
   * @param element the containing HTML element that includes the LForm's rendered form.
   * @param noFormDefData optional, to include form definition data, the default is false.
   * @param noEmptyValue optional, to remove items that have an empty value, the default is false.
   * @param noDisabledItem optional, to remove items that are disabled by skip logic, the default is false.
   * @returns {{itemsData: (*|Array), templateData: (*|Array)}} form data and template data
   */
  getUserData: function getUserData(element, noFormDefData, noEmptyValue, noDisabledItem) {
    var formObj = this._getFormObjectInScope(element);

    return formObj ? formObj.getUserData(noFormDefData, noEmptyValue, noDisabledItem) : null;
  },

  /**
   * Get the complete form definition data, including the user input data from the form.
   * The returned data could be fed into a LForms widget directly to render the form.
   * @param element optional, the containing HTML element that includes the LForm's rendered form.
   *        It could either be the DOM element or its id.
   * @param noEmptyValue optional, to remove items that have an empty value, the default is false.
   * @param noDisabledItem optional, to remove items that are disabled by skip logic, the default is false.
   * @returns {{}} Form definition data
   */
  getFormData: function getFormData(element, noEmptyValue, noDisabledItem) {
    var formObj = this._getFormObjectInScope(element);

    return formObj ? formObj.getFormData(noEmptyValue, noDisabledItem) : null;
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
   *  and "QuestionnaireResponse" (SDC profile).
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
   * Get a list of errors preventing the form from being valid.
   * @param [element] optional, the containing HTML element that includes the LForm's rendered form.
   * @return {Array<string>} list of errors or null if form is valid
   */
  checkValidity: function checkValidity(element) {
    var formObj = this._getFormObjectInScope(element);

    return formObj ? formObj.checkValidity() : null;
  },

  /**
   * Convert LForms data into a FHIR resource
   * @param resourceType a FHIR resource type. it currently supports "DiagnosticReport",
   * "Questionnaire" (both standard Questionnaire and SDC Questionnaire profile)
   *  and "QuestionnaireResponse" (SDC profile).
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
   *  * extract:  a flag for QuestionnaireReponse that data should be extracted
   *    (using the observationLinkPeriod extension).  In this case the returned
   *    resource will be an array consisting of the QuestionnaireResponse and any
   *    extracted Observations.
   *  * subject: A local FHIR resource that is the subject of the output resource.
   *    If provided, a reference to this resource will be added to the output FHIR
   *    resource when applicable.
   * @returns {*} a FHIR resource, or (if extract is true) an array of
   *    resources.
   */
  _convertLFormsToFHIRData: function _convertLFormsToFHIRData(resourceType, fhirVersion, formData, options) {
    if (!options) options = {};
    if (!(formData instanceof LForms.LFormsData)) formData = new LForms.LFormsData(formData);
    var version = this.validateFHIRVersion(fhirVersion);
    var fhir = LForms.FHIR[version];
    var fhirData = null;

    if (formData) {
      switch (resourceType) {
        case "DiagnosticReport":
          var bundleType = options ? options.bundleType : undefined;
          var inBundle = bundleType != undefined;
          fhirData = fhir.DiagnosticReport.createDiagnosticReport(formData, options.subject, inBundle, bundleType);
          break;

        case "Questionnaire":
          fhirData = fhir.SDC.convertLFormsToQuestionnaire(formData, options.noExtensions);
          break;

        case "QuestionnaireResponse":
          if (options.extract) fhirData = fhir.SDC.convertLFormsToFHIRData(formData, options.noExtensions, options.subject);else fhirData = fhir.SDC.convertLFormsToQuestionnaireResponse(formData, options.noExtensions, options.subject);
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
          formData.hasSavedData = true;
          break;

        case "QuestionnaireResponse":
          formData = fhir.SDC.mergeQuestionnaireResponseToLForms(formData, fhirData);
          formData.hasSavedData = true; // will be used to determine whether to update or save

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
      throw new Error('Could not determine the FHIR version for this resource.  ' + 'Please make sure it is specified via meta.profile (see ' + 'http://build.fhir.org/versioning.html#mp-version and ' + 'https://www.hl7.org/fhir/references.html#canonical).  ' + 'Example 1:  http://hl7.org/fhir/4.0/StructureDefinition/Questionnaire' + ' (for Questionnaire version 4.0, a.k.a. R4).' + 'Example 2:  http://hl7.org/fhir/3.0/StructureDefinition/Questionnaire' + ' (for Questionnaire version 3.0, a.k.a. STU3).' + 'Example 3:  http://hl7.org/fhir/uv/sdc/StructureDefinition/sdc-questionnaire|2.7 ' + ' (for SDC Questionnaire version 2.7).');
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
    LForms.fhirCapabilities = {}; // our own flags about what the server can do

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

      var questionnairePattern = new RegExp('http://hl7.org/fhir/(\\d+\.\\d+)([\\.\\d]+)?/StructureDefinition/Questionnaire');
      var sdcPattern = new RegExp('http://hl7.org/fhir/u./sdc/StructureDefinition/sdc-questionnaire\\|(\\d+\.\\d+)(\.\\d+)?');

      for (var i = 0, len = profiles.length && !fhirVersion; i < len; ++i) {
        var match = profiles[i].match(questionnairePattern);
        if (match) fhirVersion = match[1];else {
          match = profiles[i].match(sdcPattern);

          if (match) {
            fhirVersion = match[1]; // See http://www.hl7.org/fhir/uv/sdc/history.cfml
            // Use FHIR 3.0 for SDC 2.0; There was no SDC 3.0

            if (fhirVersion == '2.0') {
              fhirVersion = '3.0';
            } // use FHIR 4.0 for SDC version >= 2.1
            else if (parseFloat(fhirVersion) >= 2.1) {
                fhirVersion = '4.0';
              }
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

        if (!rtn) rtn = this._testValues(val, property, valTest); // search sub-objects
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
   * This function and stringToDTDateISO are meant to work as a pair on DT (or FHIR date) data type.
   * The idea is that DT/date type does not have timezone info, as a result, the string value could be
   * off by a day during either way of conversion depending on the time zone the code is executed.
   * The solution here is to keep the literal values of the year, month, and date components remain
   * unchanged regardless of the time zones.
   * Convert the given date object into a DT type date string, in "yyyy-mm-dd" format, where the
   * year, month, and date are based on the "local time zone" as the users can see on the display.
   * @param dateObj the date object to be converted.
   * @return date string in yyyy-mm-dd format with year, month, and date values corresponding to that
   * at the local timezone.
   */
  dateToDTStringISO: function dateToDTStringISO(dateObj) {
    return !dateObj || !(dateObj instanceof Date) || isNaN(dateObj.getTime()) ? undefined : [(10000 + dateObj.getFullYear()).toString().substr(1), (101 + dateObj.getMonth()).toString().substr(1), (100 + dateObj.getDate()).toString().substr(1)].join('-');
  },

  /**
   * Parse the given iso date string, that is, a string of format "yyyy[-mm[-dd]]", into a Date object,
   * and then, adjust the year, month, and day so that when displayed (as local date) the literal values of
   * the year, month, and date components remain unchanged.
   * See the comments/docs for function dateToDTStringISO().
   * @param isoDateString
   */
  stringToDTDateISO: function stringToDTDateISO(isoDateString) {
    var d = new Date(isoDateString);
    return isNaN(d.getTime()) ? undefined : new Date(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate());
  },

  /**
   * Get a formatted date string from a date object
   * for example: "2016-10-31T14:42:12Z"
   * @param objDate a date object, or a valid string representation of date.
   * @returns a formatted date string
   */
  dateToDTMString: function dateToDTMString(objDate) {
    if (typeof objDate === 'string') {
      objDate = LForms.Util.stringToDate(objDate, true);
    }

    return objDate.toISOString();
  },

  /**
   * Parse a formatted date string and create a date object
   * @param strDate a formatted date string
   * @param looseParsing {boolean} - Do default parsing. Intended to parse output
   * from native date object, typically from programmatic output from widgets. Default is false.
   * @returns a date object
   */
  stringToDate: function stringToDate(strDate, looseParsing) {
    if (!strDate || typeof strDate != 'string') {
      // maybe already a date object.
      return strDate;
    }

    if (strDate.trim() === 't') {
      return new Date();
    }

    var m = moment(strDate, parseDateFormats, true);

    if (looseParsing && !m.isValid()) {
      // Make another attempt for loose parsing.
      m = moment(strDate);
    }

    return m.isValid() ? m.toDate() : null;
  },

  /**
   * Validate date object or date string. If string, check to see if it is in acceptable formats.
   * See stringToDate() for acceptable formats.
   * @param date {Date | string} - Potential date object or date string
   * @returns boolean
   */
  isValidDate: function isValidDate(date) {
    return !!LForms.Util.stringToDate(date);
  },

  /**
   * Format a date object with given format. Refer to momentjs documentation for
   * format specification.
   *
   * @param date - Date object
   * @param format - Format string
   * @returns {string}
   */
  formatDate: function formatDate(date, format) {
    return moment(date).format(format);
  },

  /**
   * Check if an item's value is empty, where the data has no meaningful use.
   * @param value the value to be tested
   * @returns {boolean}
   * @private
   */
  isItemValueEmpty: function isItemValueEmpty(value) {
    var empty = true;

    if (value !== null && value !== undefined && value !== '' && typeof value !== 'function') {
      if (typeof value === 'string' || value instanceof String) {
        empty = value.trim() === '';
      } else if (Array.isArray(value)) {
        for (var i = 0; i < value.length; ++i) {
          if (!this.isItemValueEmpty(value[i])) {
            empty = false;
            break;
          }
        }
      } else if (_typeof(value) === 'object') {
        var keys = Object.keys(value);

        if (keys.length > 0) {
          for (var i = 0, iLen = keys.length; i < iLen; i++) {
            if (!this.isItemValueEmpty(value[keys[i]])) {
              empty = false;
              break;
            }
          }
        } else if (value.constructor !== Object) {
          // e.g., a Date object has zero length keys
          empty = false;
        }
      } else {
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
   * @param key - Key of the target object to match the value.
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
        } else if (_typeof(collectionObj[i]) === 'object') {
          LForms.Util.pruneNulls(collectionObj[i]);
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
   * We are transitioning lforms fields representing code (form.code, items[x].questionCode
   * and items[x].questionCodeSystem) to FHIR definition of Coding type.
   * In lforms, these fields are string type and FHIR Coding is an array of
   * objects encapsulating multiple codes
   * .
   * To preserve compatibility with existing lforms code, we preserve
   * both lforms code and FHIR Coding. FHIR Coding is preserved in codeList.
   *
   * This function adopts the following rules.
   *
   * . If codeList is not present create it making the first item representing lforms code.
   * . If lforms code is not present, create it as appropriate (form.code or item[x].questionCode) from
   *   first item in codeList.
   * . Always make sure the first item in codeList represents lforms code.
   *
   * @param formOrItem - lforms form or items[x]
   */
  initializeCodes: function initializeCodes(formOrItem) {
    var isItem = formOrItem.question || formOrItem.questionCode;
    var code = isItem ? formOrItem.questionCode : formOrItem.code;
    var codeSystem = isItem ? formOrItem.questionCodeSystem : formOrItem.codeSystem;
    var display = isItem ? formOrItem.question : formOrItem.name;
    var codeSystemUrl = LForms.Util.getCodeSystem(codeSystem); // if there is code

    if (code) {
      if (!formOrItem.codeList) {
        formOrItem.codeList = [];
      }

      var codeList = formOrItem.codeList;
      var found = false;

      for (var i = 0; i < codeList.length; i++) {
        if (code === codeList[i].code && (!codeSystemUrl && !codeList[i].system || codeSystemUrl === codeList[i].system)) {
          found = true;
          break;
        }
      } // if form data is converted from a FHIR Questionnaire that has no 'code' on items,
      // don't create a 'code' when converting it back to Questionnaire.


      if (!found && codeSystemUrl !== 'LinkId') {
        var code = {
          code: code,
          display: display
        };

        if (codeSystemUrl) {
          code.system = codeSystemUrl;
        }

        codeList.unshift(code);
      }
    } // if there is a codeList
    else {
        if (formOrItem.codeList && formOrItem.codeList.length > 0) {
          if (isItem) {
            // questionCode is required, so this shouldn't happen??
            formOrItem.questionCode = formOrItem.codeList[0].code;
            formOrItem.questionCodeSystem = formOrItem.codeList[0].system;
          } else {
            formOrItem.code = formOrItem.codeList[0].code;
            formOrItem.codeSystem = formOrItem.codeList[0].system;
          }
        }
      }

    return formOrItem;
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
  },

  /**
   * Get a code system based on the code system value used in LForms
   * @param codeSystemInLForms code system value used in LForms
   * @private
   */
  getCodeSystem: function getCodeSystem(codeSystemInLForms) {
    var codeSystem;

    switch (codeSystemInLForms) {
      case "LOINC":
        codeSystem = "http://loinc.org";
        break;

      default:
        codeSystem = codeSystemInLForms;
    }

    return codeSystem;
  },

  /**
   * Removes an object(s) from an array searching it using key/value pair with an optional start index.
   * The matching value should be a primitive type. If start index is not specified,
   * it is assumed to be 0.
   *
   * @param targetObjects - Array of objects to search using key and value
   * @param key - key of the object to match the value
   * @param matchingValue - Matching value of the specified key.
   * @param starting_index - Optional start index to lookup. Negative number indicates index from end.
   *   The absolute value should be less than the length of items in the array. If not
   *   the starting index is assumed to be 0.
   * @param all - if false, removes the first matched object otherwise removes all matched objects.
   *   Default is false.
   *
   * @returns {Object|Array} - Returns removed object or array of objects.
   */
  removeObjectsFromArray: function removeObjectsFromArray(targetObjects, key, matchingValue, starting_index, all) {
    var ind = all ? [] : null;
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

          if (all) {
            ind.push(i);
            ret.push(match);
          } else {
            ind = i;
            ret = match;
            break;
          }
        }
      }

      if (Array.isArray(ind)) {
        for (var i = ind.length - 1; i >= 0; i--) {
          targetObjects.splice(ind[i], 1);
        }
      } else {
        if (ind !== null) {
          targetObjects.splice(ind, 1);
        }
      }
    }

    return ret;
  },

  /**
   *   Returns the part of an LForms form definition that all form definitions
   *   should have.
   */
  baseFormDef: function baseFormDef() {
    return {
      lformsVersion: LForms.lformsVersion
    };
  },

  /**
   * Get a list of warning messages about answer lists, which should have been 
   * loaded from the URL in answerValueSet but were not.
   * 
   * @param {*} formDataSource Optional.  Either the containing HTML element that
   *  includes the LForm's rendered form, a CSS selector for that element, an
   *  LFormsData object, or an LForms form definition (parsed).  If not
   *  provided, the first form found in the page will be used.   */
  getAnswersResourceStatus: function getAnswersResourceStatus(formDataSource) {
    if (!formDataSource || formDataSource instanceof HTMLElement || typeof formDataSource === 'string') formDataSource = this._getFormObjectInScope(formDataSource);
    return formDataSource.checkAnswersResourceStatus();
  }
};

/***/ }),
/* 14 */
/***/ (function(module, exports) {

module.exports = moment;

/***/ }),
/* 15 */
/***/ (function(module, exports) {

// HTML5 polyfills
// Polyill for Object.assign
//import 'core-js/features/object/assign'; // adds about 8k; use Mozilla's
// From https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/assign
if (typeof Object.assign !== 'function') {
  // Must be writable: true, enumerable: false, configurable: true
  Object.defineProperty(Object, "assign", {
    value: function assign(target, varArgs) {
      // .length of function is 2
      'use strict';

      if (target === null || target === undefined) {
        throw new TypeError('Cannot convert undefined or null to object');
      }

      var to = Object(target);

      for (var index = 1; index < arguments.length; index++) {
        var nextSource = arguments[index];

        if (nextSource !== null && nextSource !== undefined) {
          for (var nextKey in nextSource) {
            // Avoid bugs when hasOwnProperty is shadowed
            if (Object.prototype.hasOwnProperty.call(nextSource, nextKey)) {
              to[nextKey] = nextSource[nextKey];
            }
          }
        }
      }

      return to;
    },
    writable: true,
    configurable: true
  });
} // Polyfill for String.repeat
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
/* 16 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _fhir_fhir_common__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(17);
/**
 * A package to generate HL7 messgages from LForms form data
 */
var LForms = __webpack_require__(4);



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
      "DTM": "Date/Time",
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
        case "QTY":
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

      var formData = lfData.getFormData(false, true);

      this._generateOBX4(formData); // form level info


      var formObrArray = new Array(this.obrFieldNum); // initial value is undefined
      // index = seq - 1

      formObrArray[0] = "OBR";
      formObrArray[1] = "1";
      formObrArray[4] = formData.code + this.delimiters.component + formData.name + this.delimiters.component + this.LOINC_CS;

      if (formData.templateOptions.formHeaderItems && formData.templateOptions.formHeaderItems.length > 0) {
        for (var i = 0, iLen = formData.templateOptions.formHeaderItems.length; i < iLen; i++) {
          if (formData.templateOptions.formHeaderItems[i].questionCode === "date_done" && formData.templateOptions.formHeaderItems[i].value) {
            formObrArray[7] = LForms.Util.formatDate(formData.templateOptions.formHeaderItems[i].value, this._DTM_FMT);
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
     * @return the OBX5 field string
     */
    _generateOBX5: function _generateOBX5(itemVal, dataType, answerCS) {
      var rtn;
      var code = itemVal.code;

      if (dataType === 'CWE' && !code && code !== 0) {
        // For non-coded values, the text goes in OBX 5.9
        rtn = this.delimiters.component.repeat(8) + itemVal.text;
      } else {
        var answerCS = !itemVal.system ? "" : itemVal.system === 'LOINC' || itemVal.system === _fhir_fhir_common__WEBPACK_IMPORTED_MODULE_0__["LOINC_URI"] ? this.LOINC_CS : itemVal.system;
        rtn = code + this.delimiters.component + itemVal.text + this.delimiters.component + answerCS;
      }

      return rtn;
    },
    _DT_FMT: 'YYYYMMDD',
    _DTM_FMT: 'YYYYMMDDHHmmss',

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

            for (var i = 0, len = vals.length; i < len; ++i) {
              var val = vals[i]; // OBX4 - sub id

              itemObxArray[4] = item._obx4;

              if (isArrayVal) {
                if (item._obx4 !== '') itemObxArray[4] += ".";
                itemObxArray[4] += LForms.Util.getNextLetter(i + 1);
              } // OBX5 (answer value)


              if (item.dataType === 'CNE' || item.dataType === 'CWE') {
                itemObxArray[5] = this._generateOBX5(val, item.dataType);
              } else if (item.dataType === 'DT' || item.dataType === 'DTM') {
                var dv = typeof val === 'string' ? LForms.Util.stringToDate(val) : val;
                itemObxArray[5] = LForms.Util.formatDate(dv, item.dataType === 'DT' ? this._DT_FMT : this._DTM_FMT);
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
    }
  }; // return
}();

/***/ }),
/* 17 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LOINC_URI", function() { return LOINC_URI; });
// Definitions for things needed by both importing and exporting.
var LOINC_URI = 'http://loinc.org';

/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

/**
 * A package to process user data validations in LForms
 */
var LForms = __webpack_require__(4);

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
  "QTY", // complex type
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
    "QTY": "must be a decimal number",
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
        case "QTY":
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

        case "DT":
          // date, handled by date directive
          valid = LForms.Util.isValidDate(value);
          break;

        case "ST": // not needed

        case "DTM": // dataTime, handled by the datetime directive (datetime picker)

        case "RTO": // TBD

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
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

/**
 * LForms class for form definition data
 */
(function () {
  "use strict";

  var LForms = __webpack_require__(4);

  var Class = __webpack_require__(20);

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
        ACTION_ENABLE: "show",
        ACTION_DISABLE: "hide",
        // not supported yet
        STATUS_ENABLED: "target-enabled",
        STATUS_DISABLED: "target-disabled"
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
        DTM: "DTM",
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
        // RTO:    "RTO",   // not supported yet

      },
      DISPLAY_MODE: ['lg', 'md', 'sm', 'auto']
    },
    // form type. for now the only type is "LOINC"
    type: null,
    // form's code
    code: null,
    codeList: null,
    identifier: null,
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
    // whether the form data contains saved user data
    hasSavedData: false,
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
      hideFormControls: true,
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
      showFormHeader: false,
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
     * @param packageStore optional, an array that stores a list of FHIR resources
     *       needed by the Questionnaire. Currently only the expanded ValueSet is
     *       supported. Its format is same as the 'files' part in the .index.json
     *       file in a FHIR resource package files.
     *       (see https://confluence.hl7.org/display/FHIR/NPM+Package+Specification),
     *       plus a 'fileContent' field that contains the actual file contents.
     */
    init: function init(data, packageStore) {
      this.lformsVersion = LForms.lformsVersion;

      if (packageStore) {
        this._packageStore = packageStore;
      }

      if (data && data._initializeInternalData) {
        // This is already a lformsData object.
        var props = Object.getOwnPropertyNames(data);

        for (var i = 0; i < props.length; i++) {
          if (props[i] && !props[i].startsWith('_') && typeof data[props[i]] !== 'function') {
            this[props[i]] = data[props[i]];
          }
        } // Preserve _variableExt as FHIR variable extensions have been moved to _variableExt during the LFormsData construction.


        if (data._variableExt) {
          this._variableExt = data._variableExt;
        }
      } else {
        jQuery.extend(this, data);
        this.templateOptions = data.templateOptions || {};
        this.PATH_DELIMITER = data.PATH_DELIMITER || "/";
      } // when the skip logic rule says the form is done


      this._formDone = false;

      if (LForms.FHIR) {
        this._initializeFormFHIRData(data);
      } // update internal data (_id, _idPath, _codePath, _displayLevel_),
      // that are used for widget control and/or for performance improvement.


      this._initializeInternalData();
    },

    /**
     * Find the resource in the form's packageStore by resource type and identifier.
     * @param resType FHIR resource type, e.g. ValueSet, CodeSystem.
     * @param resIdentifier an id or an canonical URL of a FHIR resource.
     *        "http://hl7.org/fhir/uv/sdc/ValueSet/dex-mimetype"
     *        or "http://hl7.org/fhir/uv/sdc/ValueSet/dex-mimetype|2.8.0"
     *        (or "http://hl7.org/fhir/uv/sdc/ValueSet/dex-mimetype|2.8.0#vs1", TBD)
     * Note: The reference could be a contained ValueSet in a different resource
     * See https://www.hl7.org/fhir/references.html#canonical-fragments
     * @returns {null} a FHIR resource
     * @private
     */
    _getResourcesFromPackageStore: function _getResourcesFromPackageStore(resType, resIdentifier) {
      var resReturn = null;

      if (this._packageStore && resIdentifier && resType) {
        var splited = resIdentifier.split("|");
        var url = splited[0];
        var version = splited[1];

        for (var i = 0, iLen = this._packageStore.length; i < iLen; i++) {
          var resource = this._packageStore[i];

          if (resource.resourceType === resType && resource.url === url && (version && resource.version === version || !version)) {
            resReturn = JSON.parse(JSON.stringify(resource));
            break;
          }
        }
      }

      return resReturn;
    },

    /**
     * Get a list of warning messages where answer lists are not loaded from URLs
     * in 'answerValueSet'
     */
    checkAnswersResourceStatus: function checkAnswersResourceStatus() {
      var status = [];

      for (var i = 0, iLen = this.itemList.length; i < iLen; i++) {
        var item = this.itemList[i];

        if (item.answerValueSet && !item.answers) {
          status.push("Resource not loaded: " + item.answerValueSet);
        }
      }

      return status;
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
     * @param data - LForms form definition object (or LFormsData).
     */
    _initializeFormFHIRData: function _initializeFormFHIRData(data) {
      var lfData = this;
      this.fhirVersion = data.fhirVersion || 'R4'; // Default to R4

      this._fhir = LForms.FHIR[lfData.fhirVersion];
      this._expressionProcessor = new this._fhir.SDC.ExpressionProcessor(this);
      this._fhirVariables = {};
      this.extension = data.extension ? data.extension.slice(0) : []; // Shallow copy

      if (data.extension) {
        this._fhir.SDC.buildExtensionMap(this);

        this._hasResponsiveExpr = this._hasResponsiveExpr || this._fhir.SDC.hasResponsiveExpression(this);
        this._hasInitialExpr = this._hasInitialExpr || this._fhir.SDC.hasInitialExpression(this);
      }

      this._fhir.SDC.processExtensions(lfData, 'obj_title');
    },

    /**
     *   Returns the object containing the FHIR support.  If this LFormsData
     *   does not have fhirVersion set or if support for that version is not
     *   loaded, then a support object for some FHIR version will be returned,
     *   if any is loaded.  (In some cases, we do not care which version is
     *   used.)  If no fhir support is loaded, then an exception will be thrown.
     */
    _getFHIRSupport: function _getFHIRSupport() {
      var rtn = this._fhir;

      if (!rtn) {
        var loadedVersions = Object.keys(LForms.FHIR);
        if (loadedVersions.length > 0) rtn = LForms.FHIR[loadedVersions[0]];
        if (!rtn) throw new Error('The LHC-Forms FHIR support file was not loaded.');else this._fhir = rtn;
      }

      return rtn;
    },

    /**
     *  Loads FHIR resources necessary to show the form.  These are loaded
     *  asynchronously.  When the asynchous requests have completed, if
     *  "prepoluate" is set to true, the form will be partially filled in with
     *  values from the resources as extensions indicate (e.g.
     *  observationLinkPeriod and initialExpression).
     *  Prior to calling this, LForms.Util.setFHIRContext() should have been
     *  called, so that communication with the FHIR server can take place.
     * @param prepopulate whether or not to perform prepoluation.  If the form
     *  being shown is going to include previously saved user data, this flag
     *  should be set to false (which is the default).
     */
    loadFHIRResources: function loadFHIRResources(prepopulate) {
      var _this = this;

      if (!LForms.fhirContext) {
        throw new Error('LForms.Util.setFHIRContext() must be called before loadFHIRResources');
      }

      var lfData = this;
      var pendingPromises = []; // launchContext

      var contextItems = LForms.Util.findObjectInArray(this.extension, 'url', "http://hl7.org/fhir/StructureDefinition/questionnaire-launchContext", 0, true);

      var _loop = function _loop() {
        var contextItemExt = contextItems[i].extension;
        var name = void 0;
        var typeList = [];

        for (j = 0, jLen = contextItemExt.length; j < jLen; ++j) {
          fieldExt = contextItemExt[j];

          if (!name && fieldExt.url === 'name') {
            name = fieldExt.valueId;

            _this._checkFHIRVarName(name); // might throw

          } else if (fieldExt.url === 'type') typeList.push(fieldExt.valueCode);
        }

        if (name && typeList.length > 0) {
          pendingPromises.push(new Promise(function (resolve, reject) {
            // Enforce that this is truly asynchronous with setTimeout.
            // Some implementations of getCurrent (e.g in testing) might be
            // synchronous.
            setTimeout(function () {
              try {
                LForms.fhirContext.getCurrent(typeList, function (resource) {
                  if (resource) lfData._fhirVariables[name] = resource;
                  resolve();
                });
              } catch (e) {
                reject(e);
              }
            }, 1);
          }));
        }
      };

      for (var i = 0, len = contextItems.length; i < len; ++i) {
        var j, jLen;
        var fieldExt;

        _loop();
      } // answerValueSet (for prefetched lists)
      // For this import, we don't actually care which version of FHIR;
      // the implementation is common.  If either support file is loaded use
      // that (for both the terminology server case and the FHIR server case).


      var sdc = this._getFHIRSupport().SDC;

      pendingPromises = pendingPromises.concat(sdc.loadAnswerValueSets(this));
      if (prepopulate) pendingPromises.push(this._requestLinkedObs());
      return Promise.all(pendingPromises).then(function () {
        lfData._notifyAsyncChangeListeners(); // TBD Not sure this is still needed

      });
    },

    /**
     * Load ValueSet from the resource package, convert it the LForms' answers format
     * and set it on item.answers
     * @param item an item of lforms
     * @private
     */
    _loadAnswerValueSetsFromPackage: function _loadAnswerValueSetsFromPackage(item) {
      if (item.answerValueSet) {
        var vs = this._getResourcesFromPackageStore("ValueSet", item.answerValueSet);

        if (vs && this._fhir) {
          var answers = this._fhir.SDC.answersFromVS(vs.fileContent);

          if (answers) {
            item.answers = answers;
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
     * structural data:
     *    _id, _idPath
     * data for widget control and/or performance improvement:
     *    _displayLevel
     * @private
     */
    _initializeInternalData: function _initializeInternalData() {
      //TODO, validate form data
      // set default values of certain form definition fields
      this._setDefaultValues();

      LForms.Util.initializeCodes(this); // update internal status

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

      this._setUpAnswerAndUnitAutoComp(this.itemList); // set up a mapping from controlling items to controlled items
      // for skip logic, data controls and formulas


      this._setupSourceToTargetMap(); // run the form controls


      this._checkFormControls(); // adjust template options


      this._adjustTemplateOptions();
    },

    /**
     * Adjust hideUnits value depending on whether units are included in the form.
     * It is to be called only in the initialization of the form data object.
     * @private
     */
    _adjustTemplateOptions: function _adjustTemplateOptions() {
      // if none of the items has 'units', reset the 'hideUnits' to be true
      var noUnits = true;

      for (var i = 0, iLen = this.itemList.length; i < iLen; i++) {
        if (Array.isArray(this.itemList[i].units) && this.itemList[i].units.length > 0) {
          noUnits = false;
          break;
        }
      }

      if (noUnits) {
        this.templateOptions.hideUnits = true;
      }
    },

    /**
     *  Starts the (likely asynchronous) requests to retrieve linked Observation
     *  resources for pre-population.  When the resources have been retrieved,
     *  prepoluation will be performed.
     * @return a promise resolving after the resources have been retrieved and
     *  any prepopulation has been performed.
     */
    _requestLinkedObs: function _requestLinkedObs() {
      var _this2 = this;

      if (LForms.fhirContext && this._fhir) {
        // We will need to know what version of FHIR the server is using.  Make
        // sure that is available before continuing.
        var lfData = this;

        if (!LForms._serverFHIRReleaseID) {
          // Go fetch the server's FHIR version first before continuing
          return new Promise(function (resolve, reject) {
            LForms.Util.getServerFHIRReleaseID(function (relID) {
              if (!relID) reject("Unable to obtain the server's FHIR version");else resolve(lfData._requestLinkedObs());
            });
          });
        } else {
          var pendingPromises = [];
          LForms.Util.validateFHIRVersion(LForms._serverFHIRReleaseID);
          var serverFHIR = LForms.FHIR[LForms._serverFHIRReleaseID];
          var obsLinkURI = this._fhir.SDC.fhirExtObsLinkPeriod;

          var _loop2 = function _loop2() {
            var item = _this2.itemList[i];
            var obsExt = item._fhirExt && item._fhirExt[obsLinkURI];

            if (obsExt) {
              // an array of at least 1 if present
              duration = obsExt[0].valueDuration; // optional

              itemCodeSystem = item.questionCodeSystem;
              if (itemCodeSystem === 'LOINC') itemCodeSystem = serverFHIR.LOINC_URI;
              fhirjs = LForms.fhirContext.getFHIRAPI(); // a fhir.js client

              queryParams = {
                type: 'Observation',
                query: {
                  code: itemCodeSystem + '|' + item.questionCode,
                  _sort: '-date',
                  _count: 5
                }
              }; // only need one, but we need to filter out focus=true below
              // Temporarily disabling the addition of the focus search
              // parameter, because of support issues.  Instead, for now, we
              // will check the focus parameter when the Observation is
              // returned.  Later, we might query the server to find out whether
              // :missing is supported.
              //if (LForms._serverFHIRReleaseID != 'STU3') // STU3 does not know about "focus"
              //  queryParams.query.focus = {$missing: true}; // TBD -- sometimes :missing is not supported

              if (duration && duration.value && duration.code) {
                // Convert value to milliseconds
                result = LForms.ucumPkg.UcumLhcUtils.getInstance().convertUnitTo(duration.code, duration.value, 'ms');

                if (result.status === 'succeeded') {
                  date = new Date(new Date() - result.toVal);
                  queryParams.query._lastUpdated = 'gt' + date.toISOString();
                }
              } // I'm not sure why, but fhirjs.search.then() returns an already
              // resolved promise.  Wrap it in a Promise object.


              pendingPromises.push(new Promise(function (resolve, reject) {
                fhirjs.search(queryParams).then(function (successData) {
                  var bundle = successData.data;

                  if (bundle.entry) {
                    var foundObs;

                    for (var j = 0, jLen = bundle.entry.length; j < jLen && !foundObs; ++j) {
                      var obs = bundle.entry[j].resource;

                      if (!obs.focus) {
                        // in case we couldn't use focus:missing above
                        serverFHIR.SDC.importObsValue(item, obs);
                        if (item.value) foundObs = true;
                        if (item.unit) lfData._setUnitDisplay(item.unit);
                      }
                    }
                  }

                  resolve(item.questionCode); // code is not needed, but useful for debugging
                });
              }));
            }
          };

          for (var i = 0, len = this.itemList.length; i < len; ++i) {
            var duration;
            var itemCodeSystem;
            var fhirjs;
            var queryParams;
            var result;
            var date;

            _loop2();
          }

          return Promise.all(pendingPromises);
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

      this._setUpAnswerAndUnitAutoComp(this.itemList); // set up a mapping from controlling items to controlled items
      // for skip logic, data controls and formulas


      this._setupSourceToTargetMap(); // run the all form controls


      this._checkFormControls();
    },

    /**
     * Recursively update skip logic status of a source item, and apply any process,
     * typically update formulas or data control values.
     *
     * @param sourceItem - LFormsData of a source item.
     * @param processItem - A call back function with signature:
     *      function(item): item - Updated LFormsData of traversed item.
     */
    updateSkipLogicControlledItems: function updateSkipLogicControlledItems(sourceItem, processItem) {
      // check skip logic
      if (sourceItem._skipLogicTargets) {
        for (var i = 0, iLen = sourceItem._skipLogicTargets.length; i < iLen; i++) {
          var targetItem = sourceItem._skipLogicTargets[i];

          this._updateItemSkipLogicStatus(targetItem, null);

          this.updateSkipLogicControlledItems(targetItem, processItem);
        }
      }

      processItem(sourceItem);
    },

    /**
     * Check skip logic, formulas and data controls when the source item changes.
     * @param sourceItem the controlling/source item
     */
    updateOnSourceItemChange: function updateOnSourceItemChange(sourceItem) {
      var _self = this;

      this.updateSkipLogicControlledItems(sourceItem, function (item) {
        // check formula
        if (item._formulaTargets) {
          for (var i = 0, iLen = item._formulaTargets.length; i < iLen; i++) {
            var targetItem = item._formulaTargets[i];

            _self._processItemFormula(targetItem);
          }
        } // check data control


        if (item._dataControlTargets) {
          for (var i = 0, iLen = item._dataControlTargets.length; i < iLen; i++) {
            var targetItem = item._dataControlTargets[i];

            _self._processItemDataControl(targetItem);
          }
        }
      }); // update internal status

      this._updateTreeNodes(this.items, this);

      this._updateLastRepeatingItemsStatus(this.items);

      this._resetHorizontalTableInfo();

      this._adjustLastSiblingListForHorizontalLayout();
    },

    /**
     * Validate user input value
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
        } // Hide the sub items if _isHiddenInDef flag is true.


        if (item._isHiddenInDef) {
          item._isHiddenFromView = true;

          this._setSubItemsHidden(item);
        }
      } // update internal status


      this._updateTreeNodes(this.items, this);

      this._updateLastRepeatingItemsStatus(this.items);

      this._resetHorizontalTableInfo();

      this._adjustLastSiblingListForHorizontalLayout();
    },

    /**
     * Update sub items if the current item is hidden
     * @param item the item that is hidden
     */
    _setSubItemsHidden: function _setSubItemsHidden(item) {
      // process the sub items
      if (item.items && item.items.length > 0) {
        for (var i = 0, iLen = item.items.length; i < iLen; i++) {
          var subItem = item.items[i];
          subItem._isHiddenFromView = true;

          this._setSubItemsHidden(subItem);
        }
      }
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

            if (source && (!source.sourceType || source.sourceType === this._CONSTANTS.DATA_CONTROL.SOURCE_INTERNAL) && source.sourceLinkId) {
              // get the source item object
              var sourceItem = this._findItemByLinkId(item, source.sourceLinkId);

              if (!sourceItem) {
                // This is an error in the form definition.  Provide a useful
                // debugging message.
                throw new Error("Data control for item '" + item.question + "' refers to source item '" + source.sourceLinkId + "' which was not found as a sibling, ancestor, or ancestor sibling.");
              }

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
     * @param disabled if the parent item is already disabled
     */
    _updateItemSkipLogicStatus: function _updateItemSkipLogicStatus(item, disabled) {
      // if one item is hidden all of its decedents should be hidden.
      // not necessary to check skip logic, assuming 'hide' has the priority over 'show'
      if (disabled) {
        this._setSkipLogicStatusValue(item, this._CONSTANTS.SKIP_LOGIC.STATUS_DISABLED);

        var isDisabled = true;
      } // if the item is not hidden, show all its decedents unless they are hidden by other skip logic.
      else {
          if (item.skipLogic) {
            var takeAction = this._checkSkipLogic(item);

            if (!item.skipLogic.action || item.skipLogic.action === this._CONSTANTS.SKIP_LOGIC.ACTION_ENABLE) {
              var newStatus = takeAction ? this._CONSTANTS.SKIP_LOGIC.STATUS_ENABLED : this._CONSTANTS.SKIP_LOGIC.STATUS_DISABLED;

              this._setSkipLogicStatusValue(item, newStatus);
            } else if (item.skipLogic.action === this._CONSTANTS.SKIP_LOGIC.ACTION_DISABLE) {
              var newStatus = takeAction ? this._CONSTANTS.SKIP_LOGIC.STATUS_DISABLED : this._CONSTANTS.SKIP_LOGIC.STATUS_ENABLED;

              this._setSkipLogicStatusValue(item, newStatus);
            }
          } // if there's no skip logic, show it when it was hidden because one of its ancestors was hidden
          else if (item._skipLogicStatus === this._CONSTANTS.SKIP_LOGIC.STATUS_DISABLED) {
              this._setSkipLogicStatusValue(item, this._CONSTANTS.SKIP_LOGIC.STATUS_ENABLED);
            }

          var isDisabled = item._skipLogicStatus === this._CONSTANTS.SKIP_LOGIC.STATUS_DISABLED;
        } // process the sub items


      if (item.items && item.items.length > 0) {
        for (var i = 0, iLen = item.items.length; i < iLen; i++) {
          var subItem = item.items[i];

          this._updateItemSkipLogicStatus(subItem, isDisabled);
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
        this._setSkipLogicStatusValue(item, this._CONSTANTS.SKIP_LOGIC.STATUS_DISABLED, true);

        var isDisabled = true; // process the sub items

        if (item.items) {
          for (var i = 0, iLen = item.items.length; i < iLen; i++) {
            this._presetSkipLogicStatus(item.items[i], isDisabled);
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
          var msg = newStatus === this._CONSTANTS.SKIP_LOGIC.STATUS_DISABLED ? 'Hiding ' + item._text : 'Showing ' + item._text;
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
     * Find all the items across the form that have scores
     * @returns {string[]} items that have a score value on answers
     * @private
     */
    _findItemsWithScore: function _findItemsWithScore() {
      var itemsWithScore = {}; // check siblings

      for (var i = 0, iLen = this.itemList.length; i < iLen; i++) {
        var sourceItem = this.itemList[i]; // it has an answer list

        if ((sourceItem.dataType === 'CNE' || sourceItem.dataType === 'CWE') && sourceItem.answers && Array.isArray(sourceItem.answers) && sourceItem.answers.length > 0) {
          // check if any one of the answers has a score
          for (var j = 0, jLen = sourceItem.answers.length; j < jLen; j++) {
            var answer = sourceItem.answers[j];

            if (answer && answer.hasOwnProperty('score') && !isNaN(answer.score)) {
              itemsWithScore[sourceItem.linkId] = sourceItem;
              break;
            }
          } // end of answers loop

        } // end if there's an answer list

      }

      return Object.keys(itemsWithScore);
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

          var itemsWithScore = this._findItemsWithScore();

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
      this._activeItem = null; // add a link to external site for item's definition

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

          if (item.value && (item.dataType === this._CONSTANTS.DATA_TYPE.DT || item.dataType === this._CONSTANTS.DATA_TYPE.DTM)) {
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
        } // if there is a formHeaderItems array, set up autocomplete options


        if (this.templateOptions.formHeaderItems) {
          for (var i = 0, iLen = this.templateOptions.formHeaderItems.length; i < iLen; i++) {
            var item = this.templateOptions.formHeaderItems[i];

            if (item.dataType === this._CONSTANTS.DATA_TYPE.CWE || item.dataType === this._CONSTANTS.DATA_TYPE.CNE) {
              this._updateAutocompOptions(item);

              this._resetItemValueWithModifiedAnswers(item);
            } // if this is not a saved form with user data, and
            // there is a default value, and
            // there is no embedded data
            else if (!this.hasSavedData && item.defaultAnswer && !item.value) {
                this._lfItemValueFromDefaultAnswer(item);
              }

            this._updateUnitAutocompOptions(item);
          }
        }
      }
    },

    /**
     * Assign the given item's defaultAnswer as its value, potentially with data type conversion/transformation.
     * For now, only converting DT/DTM string to a date object. The assignment happens only if item.defaultAnswer
     * is not undefined, null, or empty string.
     * @param item the lforms item to assign value to (from its defaultAnswer)
     * @private
     */
    _lfItemValueFromDefaultAnswer: function _lfItemValueFromDefaultAnswer(item) {
      var value = item.defaultAnswer;

      if (value === undefined || value === null || value === '') {
        return false;
      }

      if ((item.dataType === this._CONSTANTS.DATA_TYPE.DTM || item.dataType === this._CONSTANTS.DATA_TYPE.DT) && typeof value === 'string') {
        value = LForms.Util.stringToDate(value);

        if (!value) {
          // LForms.Util.stringToDate returns null on invalid string
          //TODO: should save the errors or emitting events.
          console.error(item.defaultAnswer + ': Invalid date/datetime string as defaultAnswer for ' + item.questionCode);
        }
      }

      item.value = value;
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
        var item = items[i];
        LForms.Util.initializeCodes(item); // set display text for the item

        item._text = item.prefix ? item.prefix + " " + item.question : item.question; // set default dataType

        if (item.header) {
          if (item.dataType !== this._CONSTANTS.DATA_TYPE.TITLE) item.dataType = this._CONSTANTS.DATA_TYPE.SECTION;
        } else {
          // set data type for items with units (for unified display styles)
          if (item.units && !item.dataType) {
            item.dataType = this._CONSTANTS.DATA_TYPE.REAL;
          } else if (!item.dataType) item.dataType = this._CONSTANTS.DATA_TYPE.ST; // default data type

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

        if (item.extension) {
          this._fhir.SDC.buildExtensionMap(item);

          if (this._fhir) {
            this._hasResponsiveExpr = this._hasResponsiveExpr || this._fhir.SDC.hasResponsiveExpression(item);
            this._hasInitialExpr = this._hasInitialExpr || this._fhir.SDC.hasInitialExpression(item);
          }
        }

        this._updateItemAttrs(item); // reset answers if it is an answer list id


        if ((angular.isString(item.answers) || angular.isNumber(item.answers)) && this.answerLists && angular.isArray(this.answerLists[item.answers])) {
          item.answers = this.answerLists[item.answers];
        } // if a resource package is provided


        if (this._packageStore) {
          this._loadAnswerValueSetsFromPackage(item);
        } // If there are answers for an answer list and there is a value, replace
        // the value objects with the corresponding objects from the answer list,
        // so that when they are displayed as radio buttons, angular will recognize the
        // one or more answer options as equal to the values.


        this._setModifiedAnswers(item); // sets item._modifiedAnswers
        // reset item.value with modified answers if the item has a value (or an array of values)


        if (item.dataType === this._CONSTANTS.DATA_TYPE.CWE || item.dataType === this._CONSTANTS.DATA_TYPE.CNE) {
          this._resetItemValueWithModifiedAnswers(item);
        } // if this is not a saved form with user data, and
        // there is a default value, and
        // there is no embedded data
        else if (!this.hasSavedData && item.defaultAnswer && !item.value) {
            this._lfItemValueFromDefaultAnswer(item);
          } // normalize unit value if there is one, needed by calculationMethod


        if (item.unit && !item.unit.text) {
          item.unit.text = item.unit.name;
        } // id


        if (item._questionRepeatable && prevSibling && prevSibling.linkId === item.linkId) {
          itemId += 1;
        } else {
          itemId = 1;
        }

        item._id = itemId;
        item._idPath = parentItem._idPath + this.PATH_DELIMITER + item._id;
        item._elementId = item.linkId + item._idPath;
        item._displayLevel = parentItem._displayLevel + 1; // set last sibling status

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

            case this._CONSTANTS.DATA_TYPE.DTM:
              item._toolTip = "MM/DD/YYYY HH:MM"; // process user data

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


        if (item._answerRequired || item.restrictions || item.dataType !== this._CONSTANTS.DATA_TYPE.ST && item.dataType !== this._CONSTANTS.DATA_TYPE.TX && item.dataType !== this._CONSTANTS.DATA_TYPE.CWE && //item.dataType !== this._CONSTANTS.DATA_TYPE.CNE)) {
        item.dataType !== this._CONSTANTS.DATA_TYPE.CNE && item.dataType !== this._CONSTANTS.DATA_TYPE.DTM) {
          // datetime picker controls input.
          item._hasValidation = true;
        } // add a link to external site for item's definition


        if (item.questionCodeSystem === "LOINC" || this.codeSystem === "LOINC" && !item.questionCodeSystem) {
          item._linkToDef = "http://s.details.loinc.org/LOINC/" + item.questionCode + ".html";
        } // process the sub items


        if (item.items && item.items.length > 0) {
          this._setTreeNodes(item.items, item);
        } // keep a copy of the repeatable items, only for the first of the same repeating items
        // before the parentItem is added to avoid circular reference that make the angular.copy really slow
        // Note: this must be processed after its sub items are processed.


        if (item._questionRepeatable && item._id === 1) {
          // remove _parentItem if there is one
          delete item._parentItem;
          var itemRepeatable = angular.copy(item); // remove user data

          this._removeUserDataAndRepeatingSubItems(itemRepeatable);

          this._repeatableItems[item.linkId] = itemRepeatable;
        } // set a reference to its parent item


        item._parentItem = parentItem; // keep a reference to the previous item for checking repeating items.

        prevSibling = item;
      }
    },

    /**
     * Remove user data and the repeating sub items (except for the first one)
     * on an item or on all its sub items
     * @param item an item
     * @private
     */
    _removeUserDataAndRepeatingSubItems: function _removeUserDataAndRepeatingSubItems(item) {
      item.value = null;
      item.unit = null;

      if (item.items && item.items.length > 0) {
        for (var i = 0; i < item.items.length; i++) {
          var subItem = item.items[i];

          if (subItem._questionRepeatable && subItem._id != 1) {
            item.items.splice(i, 1);
            i--;
          } else {
            this._removeUserDataAndRepeatingSubItems(subItem);
          }
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
      }

      if (!Array.isArray(item.answers) && item.answers !== "" && this.answerLists) {
        item.answers = this.answerLists[item.answers];
      } // process the answer code system


      if (Array.isArray(item.answers)) {
        var answerCodeSystem = item.answerCodeSystem ? LForms.Util.getCodeSystem(item.answerCodeSystem) : null;

        for (var i = 0, iLen = item.answers.length; i < iLen; i++) {
          var answer = item.answers[i]; // if there is a 'system'

          if (answer.system) {
            // convert system to the standard one in case it is 'LOINC'
            answer.system = LForms.Util.getCodeSystem(answer.system);
          } else {
            // convert 'codeSystem' to 'system'. support 'codeSystem' for backward compatibility.
            if (answer.codeSystem) {
              answer.system = LForms.Util.getCodeSystem(answer.codeSystem);
              delete answer.codeSystem; // use item level answer code system
            } else if (answerCodeSystem) {
              answer.system = answerCodeSystem;
            }
          }
        }
      } // set up flags for question and answer cardinality


      item._questionRepeatable = item.questionCardinality.max && (item.questionCardinality.max === "*" || parseInt(item.questionCardinality.max) > 1);
      item._answerRequired = item.answerCardinality.min && item.answerCardinality.min && parseInt(item.answerCardinality.min) >= 1;
      item._multipleAnswers = item.answerCardinality.max && (item.answerCardinality.max === "*" || parseInt(item.answerCardinality.max) > 1); // set up readonly flag

      item._readOnly = item.editable && item.editable === "0" || !!(item.calculationMethod || item._fhirExt && item._fhirExt[this._fhir.SDC.fhirExtCalculatedExp]);

      if (this._fhir) {
        this._fhir.SDC.processExtensions(item, 'obj_text');

        this._fhir.SDC.processExtensions(item, 'obj_prefix');
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
        item._idPath = parentItem._idPath + this.PATH_DELIMITER + item._id;
        item._elementId = item.linkId + item._idPath;
        item._displayLevel = parentItem._displayLevel + 1;
        item._parentItem = parentItem;
        item._repeatingSectionList = null;

        this._updateItemAttrs(item); // set the last sibling status


        item._lastSibling = i === lastSiblingIndex; // consider if the last sibling is hidden by skip logic

        if (!foundLastSibling) {
          if (item._skipLogicStatus === this._CONSTANTS.SKIP_LOGIC.STATUS_DISABLED) {
            item._lastSibling = false;
            lastSiblingIndex -= 1;
          } else {
            item._lastSibling = true;
            foundLastSibling = true;
          }
        } // keep a copy of the repeatable items, only for the first of the same repeating items
        // before the parentItem is added to avoid circular reference that make the angular.copy really slow


        if (item._questionRepeatable && item._id === 1 && !this._repeatableItems[item.linkId]) {
          delete item._parentItem;
          var itemRepeatable = angular.copy(item); // remove user data

          this._removeUserDataAndRepeatingSubItems(itemRepeatable);

          this._repeatableItems[item.linkId] = itemRepeatable;
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
          if (item._skipLogicStatus === this._CONSTANTS.SKIP_LOGIC.STATUS_DISABLED) {
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
     * @param noDisabledItem optional, to remove items that are disabled by skip logic, the default is false.
     * @param keepId optional, to keep _id field on item, the default is false
     * @return {{}} form definition JSON object
     */
    getFormData: function getFormData(noEmptyValue, noDisabledItem, keepId) {
      // get the form data
      var formData = this.getUserData(false, noEmptyValue, noDisabledItem, keepId); // check if there is user data

      var hasSavedData = false;

      for (var i = 0, iLen = this.itemList.length; i < iLen; i++) {
        var item = this.itemList[i];

        if (!LForms.Util.isItemValueEmpty(item)) {
          hasSavedData = true;
          break;
        }
      }

      var defData = {
        lformsVersion: this.lformsVersion,
        PATH_DELIMITER: this.PATH_DELIMITER,
        code: this.code,
        codeList: this.codeList,
        identifier: this.identifier,
        codeSystem: this.codeSystem,
        name: this.name,
        type: this.type,
        template: this.template,
        copyrightNotice: this.copyrightNotice,
        items: formData.itemsData,
        templateOptions: angular.copy(this.templateOptions)
      };

      if (this.extension) {
        defData.extension = this.extension;
      }

      if (hasSavedData) {
        defData.hasSavedData = true;
      } // reset obr fields


      defData.templateOptions.formHeaderItems = angular.copy(formData.templateData);
      return defData;
    },

    /**
     * Get user input data from the form, with or without form definition data.
     * @param noFormDefData optional, to not include form definition data, the default is false.
     * @param noEmptyValue optional, to remove items that have an empty value, the default is false.
     * @param noDisabledItem optional, to remove items that are disabled by skip logic, the default is false.
     * @param keepId optional, to keep _id field on item, the default is false
     * @returns {{itemsData: (*|Array), templateData: (*|Array)}} form data and template data
     */
    getUserData: function getUserData(noFormDefData, noEmptyValue, noDisabledItem, keepId) {
      var ret = {}; // check the value on each item and its subtree

      this._checkSubTreeValues(this.items);

      ret.itemsData = this._processDataInItems(this.items, noFormDefData, noEmptyValue, noDisabledItem, keepId); // template options could be optional. Include them, only if they are present

      if (this.templateOptions && this.templateOptions.showFormHeader && this.templateOptions.formHeaderItems) {
        // check the value on each item and its subtree
        this._checkSubTreeValues(this.templateOptions.formHeaderItems);

        ret.templateData = this._processDataInItems(this.templateOptions.formHeaderItems, noFormDefData, noEmptyValue, noDisabledItem, keepId);
      } // return a deep copy of the data


      return angular.copy(ret);
    },

    /**
     * Get a list of errors preventing the form from being valid.
     * @returns {Array<string> | null} list of errors or null if no errors
     */
    checkValidity: function checkValidity() {
      var _this3 = this;

      var errors = [];
      var itemListLength = this.itemList.length;

      var _loop3 = function _loop3(i) {
        var item = _this3.itemList[i];

        _this3._checkValidations(item);

        if (item._validationErrors !== undefined && item._validationErrors.length) {
          var errorDetails = item._validationErrors.map(function (e) {
            return "".concat(item.question, " ").concat(e);
          });

          Array.prototype.push.apply(errors, errorDetails);
        }
      };

      for (var i = 0; i < itemListLength; i++) {
        _loop3(i);
      }

      if (errors.length) {
        return errors;
      } else {
        return null;
      }
    },

    /**
     * Check the value on each item and set a _itemOrSubtreeHasValue flag
     * @param items an array of items
     */
    _checkSubTreeValues: function _checkSubTreeValues(items) {
      for (var i = 0, iLen = items.length; i < iLen; i++) {
        this._setSubTreeHasValue(items[i]);
      }
    },

    /**
     * Set a _itemOrSubtreeHasValue flag on each item
     * item._itemOrSubtreeHasValue is true if the item or any item in its subtree has value.
     * @param item an item
     */
    _setSubTreeHasValue: function _setSubTreeHasValue(item) {
      var hasValue = false;

      if (!LForms.Util.isItemValueEmpty(item.value)) {
        hasValue = true;
      }

      if (item.items && item.items.length > 0) {
        for (var i = 0, iLen = item.items.length; i < iLen; i++) {
          var subHasValue = this._setSubTreeHasValue(item.items[i]);

          if (subHasValue) hasValue = true;
        }
      }

      item._itemOrSubtreeHasValue = hasValue;
      return hasValue;
    },

    /**
     * Process each item on each level of the tree structure
     * @param items the items array
     * @param noFormDefData optional, to not include form definition data, the default is false.
     * @param noEmptyValue optional, to remove items that have an empty value, the default is false.
     * @param noDisabledItem optional, to remove items that are disabled by skip logic, the default is false.
     * @param keepId optional, to keep _id field on item, the default is false
     * @returns {Array} form data on one tree level
     * @private
     */
    _processDataInItems: function _processDataInItems(items, noFormDefData, noEmptyValue, noDisabledItem, keepId) {
      var itemsData = [];

      for (var i = 0, iLen = items.length; i < iLen; i++) {
        var item = items[i];
        var itemData = {}; // for user typed data of a CWE item, _answerOther is already in item.value as {text: _answerOther}.
        // for 'other' in answer that requires an extra text input, the user typed data is kept in item.valueOther.
        // skip the item if the value is empty and the flag is set to ignore the items with empty value
        // or if the item is hidden and the flag is set to ignore hidden items

        if (noDisabledItem && item._skipLogicStatus === this._CONSTANTS.SKIP_LOGIC.STATUS_DISABLED || noEmptyValue && !item._itemOrSubtreeHasValue && !item.header) {
          continue;
        } // include only the code and the value (and unit, other value) if no form definition data is needed


        if (noFormDefData) {
          itemData.questionCode = item.questionCode; // not a header

          if (!item.header) {
            if (item.value !== undefined) itemData.value = this._getOriginalValue(item.value, item.dataType);
            if (item.unit) itemData.unit = this._getOriginalValue(item.unit);
          }
        } // otherwise include form definition data
        else {
            // process extensions
            if (item.extension) {
              itemData.extension = item.extension;
            } // Process other fields


            for (var field in item) {
              // special handling for user input values
              if (field === "value") {
                itemData[field] = this._getOriginalValue(item[field], item.dataType);
              } else if (field === "unit") {
                itemData[field] = this._getOriginalValue(item[field]);
              } // ignore the internal lforms data and angular data
              else if (!field.match(/^[_\$]/) && field !== 'extension') {
                  itemData[field] = item[field];
                }

              if (keepId) {
                itemData["_id"] = item["_id"];
              }
            }
          } // process the sub items


        if (item.items && item.items.length > 0) {
          itemData.items = this._processDataInItems(item.items, noFormDefData, noEmptyValue, noDisabledItem, keepId);
        } // not to add the section header if noEmptyValue is set, and
        // all its children has empty value (thus have not been added either) or it has not children, and
        // it has an empty value (empty object, empty array)


        if (!noEmptyValue || itemData.items && itemData.items.length !== 0 || item._itemOrSubtreeHasValue) {
          itemsData.push(itemData);
        }
      }

      return itemsData;
    },

    /**
     * Process values for a user selected/typed answer or unit.
     * Also remove internal data whose field/key names start with _.
     * @param obj either an answer object or a unit object
     * @param typeCWE optional, a flag indicates the item type is CWE, where data is
     * handled by autocomplete-lhc or radio buttons/checkboxes. default is false
     * @returns {{}}  a new object with the internal attributes removed.
     * @private
     */
    _filterInternalData: function _filterInternalData(obj, typeCWE) {
      var objReturn = {}; // special handling for the user-typed value for CWE data type

      if (typeCWE && obj._notOnList && obj._displayText) {
        // return a string value
        objReturn = obj._displayText;
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
     * @param typeCWE optional, a flag indicates the item type is CWE, where data is
     * handled by autocomplete-lhc or radio buttons/checkboxes. default is false
     * @returns {*}
     * @private
     */
    _getObjectValue: function _getObjectValue(value, typeCWE) {
      var retValue = null;

      if (value) {
        // an array
        if (Array.isArray(value)) {
          var answers = [];

          for (var j = 0, jLen = value.length; j < jLen; j++) {
            if (angular.isObject(value[j])) {
              answers.push(this._filterInternalData(value[j], typeCWE));
            } // for primitive data type (multiple values not supported yet)
            //else {
            //  answers.push(value[j]);
            //}

          }

          retValue = answers;
        } // an object
        else if (angular.isObject(value)) {
            retValue = this._filterInternalData(value, typeCWE);
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
              retValue = LForms.Util.dateToDTStringISO(value);
              break;

            case this._CONSTANTS.DATA_TYPE.DTM:
              retValue = LForms.Util.dateToDTMString(value);
              break;

            case this._CONSTANTS.DATA_TYPE.CNE:
              retValue = this._getObjectValue(value);
              break;

            case this._CONSTANTS.DATA_TYPE.CWE:
              // for CWE, it should handle the case where 'OTHER' is selected
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
            retValue = this._getObjectValue(value);
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
          if (item._parentItem.items[i].linkId === item.linkId && item._parentItem.items[i]._id > maxId) {
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
          if (item._parentItem.items[i].linkId === item.linkId) {
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
      if (!items || items.length === 0) {
        // Nothing to update. This allows to run the constructor on forms
        // with empty items, something FHIR Questionnaire supports.
        return;
      }

      var iLen = items.length;
      var prevLinkId = ''; // process all items in the array except the last one

      for (var i = 0; i < iLen; i++) {
        var item = items[i];

        if (prevLinkId !== '') {
          // it's a different item, and
          // previous item is a repeating item, set the flag as the last in the repeating set
          items[i - 1]._lastRepeatingItem = !!(prevLinkId !== item.linkId && items[i - 1]._questionRepeatable);
        }

        prevLinkId = item.linkId; // check sub levels

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

          if (lastItem._skipLogicStatus !== this._CONSTANTS.SKIP_LOGIC.STATUS_DISABLED) {
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
     *      columnHeaders:   [ { label: item._text, id: 'col' + item._elementId, displayControl: item.displayControl },
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
      var tableHeaderLinkIdAndParentIdPath = null;
      var lastHeaderId = null;

      for (var i = 0, iLen = this.itemList.length; i < iLen; i++) {
        var item = this.itemList[i]; // header item and horizontal layout

        if (item.header && item.displayControl && item.displayControl.questionLayout == "horizontal") {
          // same methods for repeating items could be used for repeating and non-repeating items.
          // (need to rename function names in those 'repeatable' functions.)
          var itemsInRow = [];
          var columnHeaders = [];
          item._inHorizontalTable = true;
          var itemLinkIdAndParentIdPath = item.linkId + item._parentItem._idPath; // item._codePath + item._parentItem._idPath;

          lastHeaderId = item._elementId; // if it's the first row (header) of the first table,

          if (tableHeaderLinkIdAndParentIdPath === null || tableHeaderLinkIdAndParentIdPath !== itemLinkIdAndParentIdPath) {
            // indicate this item is the table header
            tableHeaderLinkIdAndParentIdPath = itemLinkIdAndParentIdPath;
            item._horizontalTableHeader = true;
            item._horizontalTableId = tableHeaderLinkIdAndParentIdPath;
            itemsInRow = item.items;

            for (var j = 0, jLen = itemsInRow.length; j < jLen; j++) {
              var itemInRow = itemsInRow[j];
              columnHeaders.push({
                item: itemInRow,
                id: "col" + itemInRow._elementId,
                displayControl: itemInRow.displayControl
              }); // indicate the item is in a horizontal table

              itemsInRow[j]._inHorizontalTable = true;
            }

            this._horizontalTableInfo[tableHeaderLinkIdAndParentIdPath] = {
              tableStartIndex: i,
              tableEndIndex: i + itemsInRow.length,
              columnHeaders: columnHeaders,
              tableRows: [{
                header: item,
                cells: itemsInRow
              }],
              tableHeaders: [item]
            }; // set the last table/row in horizontal group/table flag

            this._horizontalTableInfo[tableHeaderLinkIdAndParentIdPath]['lastHeaderId'] = lastHeaderId;
          } // if it's the following rows, update the tableRows and tableEndIndex
          else if (tableHeaderLinkIdAndParentIdPath === itemLinkIdAndParentIdPath) {
              item._horizontalTableHeader = false;
              itemsInRow = item.items;

              for (var j = 0, jLen = itemsInRow.length; j < jLen; j++) {
                // indicate the item is in a horizontal table
                itemsInRow[j]._inHorizontalTable = true;
              } // update rows index


              this._horizontalTableInfo[tableHeaderLinkIdAndParentIdPath].tableRows.push({
                header: item,
                cells: itemsInRow
              }); // update headers index (hidden)


              this._horizontalTableInfo[tableHeaderLinkIdAndParentIdPath].tableHeaders.push(item); // update last item index in the table


              this._horizontalTableInfo[tableHeaderLinkIdAndParentIdPath].tableEndIndex = i + itemsInRow.length; // set the last table/row in horizontal group/table flag

              this._horizontalTableInfo[tableHeaderLinkIdAndParentIdPath]['lastHeaderId'] = lastHeaderId;
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
      var newItem = angular.copy(this._repeatableItems[item.linkId]);
      newItem._id = maxRecId + 1;

      if (item._parentItem && Array.isArray(item._parentItem.items)) {
        var insertPosition = 0;

        for (var i = 0, iLen = item._parentItem.items.length; i < iLen; i++) {
          if (item._parentItem.items[i].linkId === item.linkId && item._parentItem.items[i]._id === item._id) {
            insertPosition = i;
            break;
          }
        }

        item._parentItem.items.splice(insertPosition + 1, 0, newItem);

        newItem._parentItem = item._parentItem; // preset the skip logic status to target-disabled on the new items

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
      var newItem = angular.copy(this._repeatableItems[item.linkId]);
      newItem._id = maxRecId + 1;

      if (item._parentItem && Array.isArray(item._parentItem.items)) {
        var insertPosition = 0;
        var inRepeating = false;

        for (var i = 0, iLen = item._parentItem.items.length; i < iLen; i++) {
          if (item._parentItem.items[i].linkId === item.linkId) {
            inRepeating = true;
          }

          if (inRepeating && item._parentItem.items[i].linkId !== item.linkId) {
            insertPosition = i;
            break;
          }
        } // until the last item


        if (inRepeating && i === iLen) {
          insertPosition = i;
        }

        item._parentItem.items.splice(insertPosition, 0, newItem);

        newItem._parentItem = item._parentItem; // preset the skip logic status to target-disabled on the new items

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

      if (item._skipLogicStatus !== this._CONSTANTS.SKIP_LOGIC.STATUS_DISABLED) {
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
          if (items[i].linkId === item.linkId) {
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
          if (item._parentItem.items[i].linkId == item.linkId && item._parentItem.items[i]._id == item._id) {
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

        if (item && item.value && item.value.score && item._skipLogicStatus !== this._CONSTANTS.SKIP_LOGIC.STATUS_DISABLED) {
          score = item.value.score;
        }

        scores.push(score);
      }

      return scores;
    },

    /**
     * Get a source item from the question code defined in a score rule
     * @param item the target item where a formula is defined
     * @param linkIds the linkIds of source items
     * @returns {Array}
     * @private
     */
    _getFormulaSourceItems: function _getFormulaSourceItems(item, linkIds) {
      var sourceItems = [];

      for (var i = 0, iLen = linkIds.length; i < iLen; i++) {
        var linkId = linkIds[i];

        var sourceItem = this._findItemByLinkId(item, linkId);

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

        if (item.value && item._skipLogicStatus !== this._CONSTANTS.SKIP_LOGIC.STATUS_DISABLED) {
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
          var sourceType = source.sourceType; // the default source type is "INTERNAL", which uses "sourceLinkId" to locate the source item

          if (!sourceType) sourceType = this._CONSTANTS.DATA_CONTROL.SOURCE_INTERNAL; // "INTERNAL"

          if (sourceType === this._CONSTANTS.DATA_CONTROL.SOURCE_INTERNAL && source.sourceLinkId) {
            // get the source item object
            var sourceItem = this._findItemByLinkId(item, source.sourceLinkId);

            if (sourceItem && sourceItem._skipLogicStatus !== this._CONSTANTS.SKIP_LOGIC.STATUS_DISABLED) {
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
     * Set up autocomplete options for each item
     * @param items a list items of the form or in the templateOptions.
     */
    _setUpAnswerAndUnitAutoComp: function _setUpAnswerAndUnitAutoComp(items) {
      for (var i = 0, iLen = items.length; i < iLen; i++) {
        var item = items[i];

        if (item.dataType === this._CONSTANTS.DATA_TYPE.CWE || item.dataType === this._CONSTANTS.DATA_TYPE.CNE) {
          this._updateAutocompOptions(item);
        }

        this._updateUnitAutocompOptions(item);
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
        // add _displayUnit for item.unit if there is a value
        if (item.unit) {
          this._setUnitDisplay(item.unit);
        } // clean up unit autocomp options


        item._unitAutocompOptions = null;
        var listItems = [],
            answers = item.units; // Modify the label for each unit.

        var defaultValue, defaultUnit;

        for (var i = 0, iLen = answers.length; i < iLen; i++) {
          var listItem = angular.copy(answers[i]);

          this._setUnitDisplay(listItem);

          if (answers[i].default) {
            defaultUnit = listItem;
            defaultValue = listItem._displayUnit;
          } // Include only if name or code is specified.


          if (listItem._displayUnit) {
            listItems.push(listItem);
          }
        }

        if (item.dataType === this._CONSTANTS.DATA_TYPE.INT || item.dataType === this._CONSTANTS.DATA_TYPE.REAL) {
          // Per FHIR, if the item is of type integer or decimal, it can only have
          // one unit, and that unit is not editable.
          // However, this breaks our existing LOINC form definitions, so just
          // output a warning and convert the type..
          if (item.units && item.units.length > 1) {
            console.log('Form definition warning: Data types of INT or REAL may ' + 'only have one unit.  Question "' + item.question + '" has ' + item.units.length + ' units.  For multiple ' + 'units, use type QTY instead.');
            item.dataType = this._CONSTANTS.DATA_TYPE.QTY;
          } else {
            // we didn't change dateType to QTY
            item._unitReadonly = true;
            if (!item.unit) item.unit = listItems[0];
          }
        }

        if (item.dataType === this._CONSTANTS.DATA_TYPE.QTY) {
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

          if (Array.isArray(item.answers)) answers = item.answers;else if (item._answerValueSetKey) {
            var vsAnswers = LForms._valueSetAnswerCache[item._answerValueSetKey];
            if (vsAnswers) answers = vsAnswers;
          } // reset the modified answers (for the display text)

          item._modifiedAnswers = [];
          item._hasOneAnswerLabel = false;
          item._hasOneNumericAnswer = false;

          for (var i = 0, iLen = answers.length; i < iLen; i++) {
            var answerData = angular.copy(answers[i]);
            var displayText = answerData.text; // label is a string

            if (answerData.label) {
              displayText = answerData.label + ". " + displayText;
              item._hasOneAnswerLabel = true;
            } // check if one of the values is numeric
            else {
                if (!item._hasOneNumericAnswer && !isNaN(answerData.text)) {
                  item._hasOneNumericAnswer = true;
                }
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
     * Reset item.value with modified answers if the item has a value (or an array of values)
     * @param item the item for which it has an item.value or item.defaultAnswers
     * @private
     */
    _resetItemValueWithModifiedAnswers: function _resetItemValueWithModifiedAnswers(item) {
      if (item._modifiedAnswers) {
        // default answer and item.value could be a string value, if it is a not-on-list value for CWE types
        var modifiedValue = null; // item.value has the priority over item.defaultAnswer
        // if this is a saved form with user data, default answers are not to be used.

        var answerValue = this.hasSavedData ? item.value : item.value || item.defaultAnswer;

        if (answerValue) {
          modifiedValue = []; // could be an array of multiple default values or a single value

          var answerValueArray = item._multipleAnswers && Array.isArray(answerValue) ? answerValue : [answerValue];

          if (item.dataType !== 'CWE') {
            modifiedValue = answerValueArray;
          } else {
            // go through each value, there could be multiple not-on-list values
            for (var i = 0, iLen = answerValueArray.length; i < iLen; ++i) {
              // string value is allowed only if it is CWE
              if (typeof answerValueArray[i] === "string" || typeof answerValueArray[i] === "number") {
                modifiedValue.push({
                  "text": answerValueArray[i],
                  "_displayText": answerValueArray[i],
                  "_notOnList": true
                }); // for radio button/checkbox display, where only one "Other" option is displayed

                item._answerOther = answerValueArray[i];
                item._otherValueChecked = true;
              } else {
                modifiedValue.push(answerValueArray[i]);
              }
            }
          }
        }

        if (modifiedValue) {
          var listVals = [];

          for (var k = 0, kLen = modifiedValue.length; k < kLen; ++k) {
            var userValue = modifiedValue[k];
            var found = false; // for search field, assume the user values are valid answers

            if (item.externallyDefined) {
              listVals = modifiedValue;
            } // for item has a answer list
            else {
                for (var j = 0, jLen = item._modifiedAnswers.length; !found && j < jLen; ++j) {
                  if (this._areTwoAnswersSame(userValue, item._modifiedAnswers[j], item)) {
                    listVals.push(item._modifiedAnswers[j]);
                    found = true;
                  }
                } // a saved value or a default value is not on the list (default answer must be one of the answer items).
                // non-matching value objects are kept, (data control or others might use data on these objects)


                if (userValue && !found) {
                  if (userValue.text) userValue._displayText = userValue.text;
                  listVals.push(userValue);
                }
              }
          }

          item.value = item._multipleAnswers ? listVals : listVals[0];
        }
      }
    },

    /**
     * Check if two answers can be treated as same
     * @param answer an answer item that could have part of the attributes set
     * @param completeAnswer an answer in the answer list that usually has more attributes set
     * @param item the lforms item that has the completeAnswer in the answer list
     * @private
     */
    _areTwoAnswersSame: function _areTwoAnswersSame(answer, completeAnswer, item) {
      var standardAnswerAttr = ['label', 'code', 'text', 'score', 'other']; // answer in LForms might not have a codeSystem, check item.answerCodeSystem and form's codeSystem

      var completeAnswerCodeSystem = completeAnswer.system ? completeAnswer.system : LForms.Util.getCodeSystem(item.answerCodeSystem || this.codeSystem); // check answers' attributes if they have the same code system

      var same = false; // if no code system or same code system

      if (!answer.system && !completeAnswer.system || answer.system === completeAnswerCodeSystem) {
        // check all fields in answer
        same = true;
        var fields = Object.keys(answer);

        for (var i = 0, iLen = fields.length; i < iLen; i++) {
          // not to check extra attributes not specified in specs.
          if (standardAnswerAttr.indexOf(fields[i]) >= 0 && answer[fields[i]] !== completeAnswer[fields[i]]) {
            same = false;
            break;
          }
        }
      }

      return same;
    },

    /**
     *  Uses the FHIR client to search the given ValueSet for the string
     *  fieldVal.
     * @param valueSetID the ID of the ValueSet to search (expand)
     * @param fieldVal the value on which to filter the ValueSet
     * @param count the maximum count to return
     * @return a Promise that will resolve to the ValueSet expansion.
     */
    _fhirClientSearchByValueSetID: function _fhirClientSearchByValueSetID(valueSetID, fieldVal, count) {
      var fhirClient = LForms.fhirContext.getFHIRAPI();
      return fhirClient.search({
        type: 'ValueSet/' + valueSetID + '/$expand',
        query: {
          _format: 'application/json',
          count: count,
          filter: fieldVal
        }
      }).then(function (response) {
        return response.data;
      });
    },

    /**
     *  This is an alternative search mechanism to work around a problem with
     *  HAPI FHIR, which does not support $expand with both url and filter.
     * @param item an item on the form
     * @param fieldVal the value on which to filter the ValueSet
     * @param count the maximum count to return
     * @return a Promise that will resolve to the ValueSet expansion.
     */
    _findValueSetIDAndSearch: function _findValueSetIDAndSearch(item, fieldVal, count) {
      // Fetch the ValueSet
      var failMsg = "Could not retrieve the ValueSet definition for " + item.answerValueSet;
      var fhirClient = LForms.fhirContext.getFHIRAPI(); // Cache the lookup of ValueSet IDs, which should not change.  (A page
      // reload will clear the cache.)

      if (!LForms._valueSetUrlToID) LForms._valueSetUrlToID = {};
      var valueSetID = LForms._valueSetUrlToID[item.answerValueSet];

      if (valueSetID) {
        return this._fhirClientSearchByValueSetID(valueSetID, fieldVal, count);
      } else {
        var self = this;
        return fhirClient.search({
          type: 'ValueSet',
          query: {
            _format: 'application/json',
            url: item.answerValueSet,
            _total: 'accurate'
          }
        }).then(function (response) {
          var data = response.data;

          if (data.total === 1) {
            var valueSetID = data.entry[0].resource.id;
            LForms._valueSetUrlToID[item.answerValueSet] = valueSetID;
            return self._fhirClientSearchByValueSetID(valueSetID, fieldVal, count);
          } else {
            console.log(failMsg);
            return Promise.reject(failMsg);
          }
        }, function (errorData) {
          console.log(failMsg);
          return Promise.reject(failMsg);
        });
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
        } else if (item.isSearchAutocomplete && item.answerValueSet) {
          var valueSetUri = item.answerValueSet; // See if there is a terminology server for expanding this valueset

          var expURL = this._getFHIRSupport().SDC._getExpansionURL(item);

          if (expURL) {
            // undefined unless there is a terminology server
            // TBD - We might need to log in to some terminology servers.  Not
            // supporting that case yet.
            // Skip the fhirContext, and go directly to the terminology server
            // for the autocompletion requests.
            options.url = expURL;
            options.fhir = true;
          } else if (LForms.fhirContext) {
            var self = this;
            options.fhir = {
              search: function search(fieldVal, count) {
                if (LForms.fhirCapabilities.urlExpandBroken) return self._findValueSetIDAndSearch(item, fieldVal, count);else {
                  var fhirClient = LForms.fhirContext.getFHIRAPI();
                  return fhirClient.search({
                    type: 'ValueSet/$expand',
                    query: {
                      _format: 'application/json',
                      count: count,
                      filter: fieldVal,
                      url: item.answerValueSet
                    }
                  }).then(function (successData) {
                    return successData.data;
                  }, function (errorData) {
                    LForms.fhirCapabilities.urlExpandBroken = true; // HAPI does not support (maybe just because of a bug) $expand
                    // when both "url" and "filter" parameters are present.  In that
                    // case, it says, ""ValueSet contains include criteria with no
                    // system defined".
                    //if (errorData.data.responseJSON.issue[0].diagnostics ==
                    //  'ValueSet contains include criteria with no system defined') {
                    // For now, just always try the alternative.

                    return self._findValueSetIDAndSearch(item, fieldVal, count);
                  });
                }
              }
            };
          } else {
            throw new Error('Cannot properly initialize the list for field "' + item.question + '" because it requires either a terminology ' + 'server to be specified or LForms.Util.setFHIRContext(...) ' + 'to have been called to provide access to a FHIR server.');
          }
        } else {
          options.listItems = item._modifiedAnswers; // add seq num when there is no labels and no numeric values as answer

          options.addSeqNum = !item._hasOneAnswerLabel && !item._hasOneNumericAnswer;
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
          } // If this is not a saved form with user data, and
          // there isn't already a default value set (handled elsewhere), and
          // there is just one item in the list, use that as the default value.


          if (!this.hasSavedData && !options.defaultValue && options.listItems.length === 1) options.defaultValue = options.listItems[0];
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
            totalScore += parseFloat(sources[i]);
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
     * Find an item by linkId. It follows the algorithm described here:
     * https://www.hl7.org/fhir/questionnaire-definitions.html#Questionnaire.item.enableWhen.question
     * If multiple question occurrences are present for the same question (same linkId),
     * then this refers to the nearest question occurrence reachable by tracing first
     * the "ancestor" axis and then the "preceding" axis and then the "following" axis.
     * @param item an item where the search starts
     * @param linkId a linkId
     * @returns {null}
     * @private
     */
    _findItemByLinkId: function _findItemByLinkId(item, linkId) {
      var sourceItem = null; // check 'ancestor' axis

      var parentItem = item._parentItem;
      var foundSource = false;

      while (!foundSource && parentItem) {
        // check the ancestor
        if (parentItem.linkId === linkId) {
          sourceItem = parentItem;
          foundSource = true;
        }

        parentItem = parentItem._parentItem;
      }

      var itemIndex = null;

      if (!sourceItem) {
        // find the item's position in itemList
        for (var i = 0, iLen = this.itemList.length; i < iLen; i++) {
          if (item._elementId === this.itemList[i]._elementId) {
            itemIndex = i;
            break;
          }
        }

        if (itemIndex !== null) {
          // check 'preceding' axis
          for (var j = itemIndex - 1; j >= 0; j--) {
            if (this.itemList[j].linkId === linkId) {
              sourceItem = this.itemList[j];
              break;
            }
          } // check 'following' axis


          if (!sourceItem) {
            for (var k = itemIndex + 1, kLen = this.itemList.length; k < kLen; k++) {
              if (this.itemList[k].linkId === linkId) {
                sourceItem = this.itemList[k];
                break;
              }
            }
          }
        }
      }

      return sourceItem;
    },

    /**
     * Get a source item from the question code defined in a skip logic
     * @param item the target item where a skip logic is defined
     * @param linkId the linkId of a source item
     * @returns {Array}
     * @private
     */
    _getSkipLogicSourceItem: function _getSkipLogicSourceItem(item, linkId) {
      return this._findItemByLinkId(item, linkId);
    },

    /**
     * Compare if the two given codings are equal. A "coding" is a hash that may have any or all of the
     * following three fields: code, system, and text. Two codings are considered equal if and only if:
     * 1) The code systems are equal or unspecified, and
     * 2) Either the codes are specified and equal, or, the codes are not specified and the texts are
     *    specified and equal.
     * @param coding1 the first coding object
     * @param coding2 the second coding object
     * @return {boolean} true if the two codings are considered equal, false otherwise.
     * @private
     */
    _codingsEqual: function _codingsEqual(coding1, coding2) {
      var equals = false;

      var hasValue = function hasValue(v) {
        return v !== null && v !== undefined && v !== '';
      };

      if (coding1.system === coding2.system || !coding1.system && !coding2.system) {
        if (hasValue(coding1.code) || hasValue(coding2.code)) {
          equals = coding1.code === coding2.code;
        } else {
          equals = coding1.text && coding2.text && coding1.text === coding2.text;
        }
      }

      return !!equals;
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
      var hasAnswer = item && item.value !== undefined && item.value !== null && item.value !== "" && item._skipLogicStatus !== this._CONSTANTS.SKIP_LOGIC.STATUS_DISABLED; // the trigger contains only one of keys of 'exists', 'not', 'value' or minExclusive, minInclusive,
      // maxExclusive or maxInclusive.
      // 'not' means '!=', 'value' means '='.

      if (trigger.hasOwnProperty('exists')) {
        action = trigger.exists && hasAnswer || !trigger.exists && !hasAnswer;
      } else if (hasAnswer) {
        var currentValue = item.value;

        switch (item.dataType) {
          // answer lists: {"code", "LA-83"}, {"label","A"} and etc.
          // the key is one of the keys in the answers.
          case this._CONSTANTS.DATA_TYPE.CNE:
          case this._CONSTANTS.DATA_TYPE.CWE:
            var triggerValue = trigger.hasOwnProperty('value') ? trigger.value : trigger.hasOwnProperty('notEqual') ? trigger.notEqual : null;
            var answerValues = Array.isArray(currentValue) ? currentValue : [currentValue];
            var isEqual = false;

            for (var m = 0, mLen = answerValues.length; m < mLen; m++) {
              var answerValue = answerValues[m];

              if (item.answerCodeSystem) {
                answerValue = Object.assign({
                  system: item.answerCodeSystem
                }, answerValue);
              }

              if (this._codingsEqual(triggerValue, answerValue)) {
                isEqual = true;
                break;
              }
            }

            if (trigger.hasOwnProperty('value')) {
              if (isEqual) {
                action = true;
              }
            } else if (trigger.hasOwnProperty('notEqual')) {
              if (!isEqual) {
                action = true;
              }
            }

            break;
          // numbers: {"value: 3}, {"minInclusive": 3, "maxInclusive":10} and etc.
          // available keys: (1) "value", (2) "not" or (3) "minInclusive"/"minExclusive" and/or "maxInclusive"/"maxExclusive"

          case this._CONSTANTS.DATA_TYPE.INT:
          case this._CONSTANTS.DATA_TYPE.REAL:
          case this._CONSTANTS.DATA_TYPE.QTY:
            var numCurrentValue = parseFloat(currentValue); // the skip logic rule has a "value" key

            if (trigger.hasOwnProperty("value")) {
              if (trigger["value"] === numCurrentValue) {
                action = true;
              }
            } else if (trigger.hasOwnProperty('notEqual')) {
              if (trigger["notEqual"] != numCurrentValue) {
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
            if (trigger.hasOwnProperty("value")) {
              if (trigger["value"] === currentValue) {
                action = true;
              }
            } else if (trigger.hasOwnProperty('notEqual')) {
              if (trigger["notEqual"] != currentValue) {
                action = true;
              }
            }

            break;
        } // end case

      } // no answer and 'notEqual' has a value
      else if (trigger.hasOwnProperty('notEqual') && trigger.notEqual !== undefined && trigger.notEqual !== null && trigger.notEqual !== "") {
          action = true;
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
        var hasAll = item.skipLogic.logic === "ALL";
        var hasAny = !item.skipLogic.logic || item.skipLogic.logic === "ANY"; // per spec, default is ANY
        // set initial value takeAction to true if the 'logic' is not set or its value is 'ALL'
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
        // NOT to support multiple values of 'other' when multiple answers are allowed.
        // if (Array.isArray(item.value)) {
        //   jQuery.each(item.value, function(index, answer) {
        //     if (answer.other) {
        //       extra = true;
        //     }
        //   });
        // }
        if (!Array.isArray(item.value) && item.value.other) {
          extra = true;
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
              var tableKey = [items[i].linkId + items[i]._parentItem._idPath];
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
/* 20 */
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
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

// Contains information about the supported FHIR versions.
var FHIRSupport = {
  'STU3': 'partial',
  'R4': 'WIP'
};
if (true) module.exports = FHIRSupport;

/***/ }),
/* 22 */
/***/ (function(module, exports) {

angular.module('lformsWidget').run(['$templateCache', function ($templateCache) {
  'use strict';

  $templateCache.put('field-answers.html', "<div class=\"lf-field-answers\" ng-switch on=\"item.displayControl.answerLayout.type\">\n" + "  <!--list style-->\n" + "  <div ng-switch-when=\"RADIO_CHECKBOX\" class=\"lf-answer-type-list\"\n" + "   role=\"radiogroup\" aria-labeledby=\"label-{{ item._elementId }}\"\n" + "   aria-describedby=\"help-{{ item._elementId }}\">\n" + "    <span ng-repeat=\"answer in item._modifiedAnswers track by $index\" class=\"lf-answer {{getAnswerLayoutColumnClass(item)}}\">\n" + "      <!--checkboxes for multiple selections-->\n" + "      <div ng-if=\"item._multipleAnswers\">\n" + "        <input class=\"lf-answer-button\" type=\"checkbox\" id=\"{{item._elementId + answer.code}}\"\n" + "               ng-click=\"updateCheckboxList(item, answer)\" ng-disabled=\"item._readOnly\"\n" + "               ng-checked=\"checkAnswer(item,answer)\">\n" + "        <label class=\"lf-answer-label\" for=\"{{item._elementId + answer.code}}\">{{answer._displayText}}</label>\n" + "      </div>\n" + "      <!--radio buttons for single selection-->\n" + "      <div ng-if=\"!item._multipleAnswers\">\n" + "        <input class=\"lf-answer-button\" type=\"radio\" id=\"{{item._elementId + answer.code}}\"\n" + "               ng-model=\"item.value\" ng-value=\"answer\" name=\"{{item._elementId}}\"\n" + "               ng-click=\"updateRadioList(item)\" ng-disabled=\"item._readOnly\" >\n" + "        <label class=\"lf-answer-label\" for=\"{{item._elementId + answer.code}}\">{{answer._displayText}}</label>\n" + "      </div>\n" + "    </span>\n" + "    <!--extra OTHER field-->\n" + "    <!--<div class=\"lf-answer-type-list-other\">-->\n" + "    <span ng-if=\"item.dataType==='CWE'\" class=\"lf-answer lf-answer-cwe-other {{getAnswerLayoutColumnClass(item)}}\">\n" + "      <!--checkboxes for multiple selections-->\n" + "      <div ng-if=\"item._multipleAnswers\" class=\"\">\n" + "          <input class=\"lf-answer-button\" type=\"checkbox\" ng-model=\"item._otherValueChecked\"\n" + "                 id=\"{{item._elementId + '_other'}}\" ng-disabled=\"item._readOnly\"\n" + "                 ng-change=\"updateCheckboxListForOther(item, item._answerOther)\"\n" + "                 ng-checked=\"checkAnswer(item,{'text':item._answerOther})\">\n" + "          <label class=\"lf-answer-label\" for=\"{{item._elementId + '_other'}}\">OTHER:</label>\n" + "          <input ng-if=\"item._otherValueChecked\" class=\"lf-answer-other\" type=\"text\" ng-model=\"item._answerOther\"\n" + "                 id=\"{{item._elementId + '_otherValue'}}\" ng-disabled=\"item._readOnly\"\n" + "                 ng-change=\"updateCheckboxListForOther(item, item._answerOther)\">\n" + "      </div>\n" + "\n" + "      <!--radio buttons for single selection-->\n" + "      <div ng-if=\"!item._multipleAnswers\" class=\"\">\n" + "          <input class=\"lf-answer-button\" type=\"radio\" id=\"{{item._elementId + '_other'}}\"\n" + "                 ng-model=\"item._otherValueChecked\" ng-value=\"true\"\n" + "                 name=\"{{item._elementId}}\" ng-disabled=\"item._readOnly\"\n" + "                 ng-change=\"updateRadioListForOther(item, item._answerOther)\">\n" + "          <label class=\"lf-answer-label\" for=\"{{item._elementId + '_other'}}\">OTHER:</label>\n" + "          <input ng-if=\"item._otherValueChecked\" class=\"lf-answer-other\" type=\"text\"\n" + "                 id=\"{{item._elementId + '_otherValue'}}\" ng-model=\"item._answerOther\"\n" + "                 ng-change=\"updateRadioListForOther(item, item._answerOther)\"\n" + "                 ng-disabled=\"item._readOnly\">\n" + "      </div>\n" + "    </span>\n" + "    <!--</div>-->\n" + "  </div>\n" + "\n" + "  <!--COMBO_BOX style (default is 'COMBO_BOX')-->\n" + "  <div ng-switch-default class=\"lf-answer-type-combo\">\n" + "    <input name=\"{{item._text +'_'+ $id}}\" type=\"text\"\n" + "           ng-model=\"item.value\" autocomplete-lhc=\"item._autocompOptions\"\n" + "           ng-disabled=\"item._readOnly\" placeholder=\"{{item._toolTip}}\"\n" + "           id=\"{{item._elementId}}\"\n" + "           ng-focus=\"setActiveRow(item)\" ng-blur=\"activeRowOnBlur(item)\">\n" + "  </div>\n" + "</div>\n");
  $templateCache.put('field-units.html', "<div class=\"lf-field-units\" ng-switch on=\"item.displayControl.unitLayout\">\n" + "  <!--list style-->\n" + "  <div ng-switch-when=\"RADIO_CHECKBOX\">\n" + "    <span ng-repeat=\"unit in item.units\">\n" + "      <label>\n" + "        <input type=\"radio\" ng-model=\"item.unit\" ng-value=\"unit\"\n" + "         ng-readonly=\"item._unitReadonly\">{{unit._displayUnit}}\n" + "      </label>\n" + "    </span>\n" + "  </div>\n" + "\n" + "  <!--COMBO_BOX style (default is 'COMBO_BOX')-->\n" + "  <div ng-switch-default>\n" + "    <input ng-if=\"!item._unitReadonly\" class=\"units\" type=\"text\" ng-disabled=\"item._readOnly\"\n" + "           ng-model=\"item.unit\" autocomplete-lhc=\"item._unitAutocompOptions\"\n" + "           placeholder=\"Select one\" id=\"unit_{{item._elementId}}\"\n" + "           aria-labelledby=\"th_Units\">\n" + "    <input ng-if=\"item._unitReadonly\" class=\"units\" type=\"text\" ng-disabled=\"item._readOnly\"\n" + "           id=\"unit_{{item._elementId}}\" value=\"{{item.unit._displayUnit}}\"\n" + "           aria-labelledby=\"th_Units\" readonly>\n" + "  </div>\n" + "\n" + "</div>\n" + "\n");
  $templateCache.put('form-controls.html', "<div class=\"stopped\" ng-show=\"isFormDone()\">\n" + "  <img ng-src=\"{{::blankGifDataUrl}}\" class=\"stop-sign\">\n" + "  <span>This form is complete.</span>\n" + "</div>\n" + "<div class=\"lf-form-controls\" ng-if=\"!lfData.templateOptions.hideFormControls\">\n" + "  <div class=\"lf-form-control\">\n" + "    <label><input type=\"checkbox\" value=\"\" ng-model=\"lfData.templateOptions.showQuestionCode\"> Display Question Code</label>\n" + "  </div>\n" + "\n" + "  <div class=\"lf-form-control\">\n" + "    <label><input type=\"checkbox\" value=\"\" ng-model=\"lfData.templateOptions.showCodingInstruction\"> Show Help/Description</label>\n" + "  </div>\n" + "  <div class=\"lf-form-control\">\n" + "    <label><input type=\"checkbox\" value=\"\" ng-model=\"lfData.templateOptions.tabOnInputFieldsOnly\"> Keyboard Navigation On Input Fields</label>\n" + "  </div>\n" + "  <div class=\"lf-form-control\">\n" + "    <div class=\"text-info\" >Total # of Questions: {{getNumberOfQuestions()}}</div>\n" + "  </div>\n" + "</div>\n");
  $templateCache.put('form-header.html', "  <div class=\"lf-form-header\" ng-if=\"lfData.templateOptions.showFormHeader\">\n" + "    <div class=\"lf-header-de\" ng-style=\"getHeaderItemStyle(item)\"\n" + "         ng-repeat=\"item in lfData.templateOptions.formHeaderItems\">\n" + "      <div class=\"lf-header-de-label\">\n" + "        <span class=\"lf-question\"><label for=\"{{item.questionCode}}\">{{item.question}}</label></span>\n" + "      </div>\n" + "      <div class=\"lf-header-de-input\" ng-switch on=\"item.dataType\">\n" + "        <ng-form name=\"innerForm\">\n" + "          <div class=\"lf-form-item-data tooltipContainer\">\n" + "            <div class=\"tooltipContent\" lf-validate=\"item\" ng-model=\"item.value\"></div>\n" + "            <input ng-switch-when=\"CWE\" name=\"{{item.question}}\" type=\"text\"\n" + "                   placeholder=\"Select or type a value\"\n" + "                   ng-model=\"item.value\"\n" + "                   autocomplete-lhc=\"item._autocompOptions\"\n" + "                   id=\"{{item.questionCode}}\"\n" + "                   ng-blur=\"activeRowOnBlur(item)\">\n" + "            <input ng-switch-when=\"DT\" name=\"{{item.question}}\" type=\"text\"\n" + "                   ng-model=\"item.value\" lf-date=\"dateOptions\"\n" + "                   placeholder=\"MM/DD/YYYY\"\n" + "                   id=\"{{item.questionCode}}\"\n" + "                   ng-blur=\"activeRowOnBlur(item)\">\n" + "            <input ng-switch-default name=\"{{item.question}}\" type=\"text\"\n" + "                   ng-model=\"item.value\" placeholder=\"Type a value\"\n" + "                   id=\"{{item.questionCode}}\"\n" + "                   ng-blur=\"activeRowOnBlur(item)\">\n" + "            <textarea ng-switch-when=\"TX\" name=\"{{item.question}}\"\n" + "                      ng-model=\"item.value\" placeholder=\"Type a value\"\n" + "                      id=\"{{item.questionCode}}\" ng-keyup=\"autoExpand($event)\" ng-blur=\"autoExpand($event)\" rows=\"1\"\n" + "                      ng-blur=\"activeRowOnBlur(item)\">\n" + "                      </textarea>\n" + "          </div>\n" + "        </ng-form>\n" + "      </div>\n" + "    </div>\n" + "  </div>\n");
  $templateCache.put('form-options.html', "<div class=\"lf-form-options\" ng-if=\"lfData.templateOptions.showFormOptionPanel\">\n" + "\n" + "  <div class=\"lf-form-option\">\n" + "    <label><input type=\"checkbox\" value=\"\" ng-model=\"lfData.templateOptions.showQuestionCode\">Display question code</label>\n" + "  </div>\n" + "  <div class=\"lf-form-option\">\n" + "    <label><input type=\"checkbox\" value=\"\" ng-model=\"lfData.templateOptions.showCodingInstruction\">Show help/description</label>\n" + "  </div>\n" + "  <div class=\"lf-form-option\">\n" + "    <label><input type=\"checkbox\" value=\"\" ng-model=\"lfData.templateOptions.hideFormControls\">Hide form controls</label>\n" + "  </div>\n" + "  <div class=\"lf-form-option\">\n" + "    <label><input type=\"checkbox\" value=\"\" ng-model=\"lfData.templateOptions.showFormOptionPanelButton\">Display form's option button</label>\n" + "  </div>\n" + "  <div class=\"lf-form-option\">\n" + "    <label><input type=\"checkbox\" value=\"\" ng-model=\"lfData.templateOptions.showFormOptionPanel\">Display form's option panel</label>\n" + "  </div>\n" + "  <div class=\"lf-form-option\">\n" + "    <label><input type=\"checkbox\" value=\"\" ng-model=\"lfData.templateOptions.showItemOptionPanelButton\">Display item's option button</label>\n" + "  </div>\n" + "  <div class=\"lf-form-option\">\n" + "    <label><input type=\"checkbox\" value=\"\" ng-model=\"lfData.templateOptions.hideUnits\">Hide units</label>\n" + "  </div>\n" + "  <div class=\"lf-form-option\">\n" + "    <label><input type=\"checkbox\" value=\"\" ng-model=\"lfData.templateOptions.allowMultipleEmptyRepeatingItems\">Allow multiple empty repeating questions/sections</label>\n" + "  </div>\n" + "  <div class=\"lf-form-option\">\n" + "    <label><input type=\"checkbox\" value=\"\" ng-model=\"lfData.templateOptions.allowHTMLInInstructions\">Allow HTML content in instructions</label>\n" + "  </div>\n" + "  <div class=\"lf-form-option\">\n" + "    <label><input type=\"checkbox\" value=\"\" ng-model=\"lfData.templateOptions.showFormHeader\">Display form header questions</label>\n" + "  </div>\n" + "  <div class=\"lf-form-option\">\n" + "    <label><input type=\"checkbox\" value=\"\" ng-model=\"lfData.templateOptions.showColumnHeaders\">Display column headers</label>\n" + "  </div>\n" + "  <div class=\"lf-form-option\">\n" + "    <label><input type=\"checkbox\" value=\"\" ng-model=\"lfData.templateOptions.useTreeLineStyle\">Tree line style</label>\n" + "  </div>\n" + "  <div class=\"lf-form-option\">\n" + "    <label for=\"viewMode\">View mode</label>\n" + "    <select name=\"viewMode\" ng-model=\"lfData.templateOptions.viewMode\">\n" + "      <option value=\"auto\">Responsive [auto]</option>\n" + "      <option value=\"lg\">For large screen [lg]</option>\n" + "      <option value=\"md\">For medium screen [md]</option>\n" + "      <option value=\"sm\">For small screen [sm]</option>\n" + "    </select>\n" + "\n" + "  </div>\n" + "\n" + "</div>\n");
  $templateCache.put('form-title.html', "<div class=\"lf-form-title\" role=\"heading\" aria-level=1>\n" + "  <span id=\"label-{{ lfData.code }}\" class=\"lf-question\"\n" + "   style=\"{{lfData._obj_titleCSS}}\">{{lfData.name || lfData.fhirQName}}</span>\n" + "  <span class=\"lf-item-code\" ng-if=\"lfData.templateOptions.showQuestionCode\">\n" + "        <a ng-if=\"lfData._linkToDef\" href=\"{{ lfData._linkToDef }}\" target=\"_blank\" rel=\"noopener noreferrer\">[{{ lfData.code }}]</a>\n" + "        <span ng-if=\"!lfData._linkToDef\">[{{ lfData.code }}]</span>\n" + "      </span>\n" + "  <button ng-if=\"lfData.copyrightNotice\" id=\"copyright-{{lfData.code}}\" type=\"button\"\n" + "          class=\"lf-copyright-button btn-sm\" uib-popover=\"{{lfData.copyrightNotice}}\"\n" + "          popover-trigger=\"focus\" popover-placement=\"right\"\n" + "          popover-title=\"Copyright\" aria-label=\"Copyright notice\"\n" + "          aria-describedby=\"label-{{ lfData.code }}\">\n" + "    <span class=\"glyphicon glyphicon-copyright-mark\" aria-hidden=\"true\"></span>\n" + "  </button>\n" + "  <button ng-if=\"lfData.templateOptions.showFormOptionPanelButton\" type=\"button\" class=\"lf-control-button btn-sm\"\n" + "          ng-click=\"hideShowFormOptionPanel()\" aria-label=\"Form Option Panel\">\n" + "    <span class=\"glyphicon glyphicon-cog\" aria-hidden=\"true\"></span>\n" + "  </button>\n" + "\n" + "</div>\n");
  $templateCache.put('form-view.html', "<div class=\"lf-form-view {{getViewModeClass()}}\" ng-controller=\"LFormsCtrl\" ng-switch on=\"lfData.template\">\n" + "  <div ng-switch-when=\"table\">\n" + "    <div ng-include=\"'template-table.html'\"></div>\n" + "  </div>\n" + "  <!-- default is 'table' -->\n" + "  <div ng-switch-default>\n" + "    <div ng-include=\"'template-table.html'\"></div>\n" + "  </div>\n" + "\n" + "  <!--debugging-->\n" + "  <button type=\"button\" ng-if=\"debug\" ng-click=\"onclick()\">Click to debug Panel Controller</button>\n" + "\n" + "</div>\n");
  $templateCache.put('item-options.html', "<div ng-if=\"item._showItemOptionPanel\">\n" + "\n" + "  <div class=\"lf-item-options lf-section-options\"  ng-if=\"item.dataType==='SECTION'\">\n" + "    <div class=\"lf-item-option\">\n" + "      <input class=\"lf-answer-button\" type=\"radio\" id=\"{{item._elementId + 'vertical'}}\"\n" + "             ng-model=\"item.displayControl.questionLayout\" value=\"vertical\" name=\"{{item._elementId}} +'option'\">\n" + "      <label class=\"lf-answer-label\" for=\"{{item._elementId + 'vertical'}}\">Vertical</label>\n" + "    </div>\n" + "    <div class=\"lf-item-option\" ng-if=\"isQuestionLayoutAllowed(item, 'horizontal')\">\n" + "      <input class=\"lf-answer-button\" type=\"radio\" id=\"{{item._elementId + 'horizontal'}}\"\n" + "             ng-model=\"item.displayControl.questionLayout\" value=\"horizontal\" name=\"{{item._elementId}} +'option'\">\n" + "      <label class=\"lf-answer-label\" for=\"{{item._elementId + 'horizontal'}}\">Horizontal</label>\n" + "    </div>\n" + "    <div class=\"lf-item-option\" ng-if=\"isQuestionLayoutAllowed(item, 'matrix')\">\n" + "      <input class=\"lf-answer-button\" type=\"radio\" id=\"{{item._elementId + 'matrix'}}\"\n" + "             ng-model=\"item.displayControl.questionLayout\" value=\"matrix\" name=\"{{item._elementId}} +'option'\">\n" + "      <label class=\"lf-answer-label\" for=\"{{item._elementId + 'matrix'}}\">Matrix</label>\n" + "    </div>\n" + "\n" + "  </div>\n" + "\n" + "  <div class=\"lf-item-options\" ng-if=\"item.answers && (item.dataType==='CWE' || item.dataType==='CNE')\">\n" + "    <div class=\"lf-item-option\">\n" + "      <input class=\"lf-answer-button\" type=\"radio\" id=\"{{item._elementId + 'combo'}}\"\n" + "             ng-model=\"item.displayControl.answerLayout.type\" value=\"COMBO_BOX\" name=\"{{item._elementId}} +'option'\">\n" + "      <label class=\"lf-answer-label\" for=\"{{item._elementId + 'combo'}}\">Combo box</label>\n" + "    </div>\n" + "    <div class=\"lf-item-option\">\n" + "      <input class=\"lf-answer-button\" type=\"radio\" id=\"{{item._elementId + 'list'}}\"\n" + "             ng-model=\"item.displayControl.answerLayout.type\" value=\"RADIO_CHECKBOX\" name=\"{{item._elementId}} +'option'\">\n" + "      <label class=\"lf-answer-label\" for=\"{{item._elementId + 'list'}}\">{{item._multipleAnswers ? \"Checkboxes\" : \"Radio buttons\"}}</label>\n" + "    </div>\n" + "    <div class=\"lf-item-option\" ng-if=\"item.displayControl.answerLayout.type==='RADIO_CHECKBOX'\">\n" + "      <label for=\"{{item._elementId + 'columns'}}\"> Display format:</label>\n" + "      <select name=\"{{item._elementId + 'columns'}}\" id=\"{{item._elementId + 'columns'}}\" ng-model=\"item.displayControl.answerLayout.columns\">\n" + "        <option value=\"\">---Please select---</option> <!-- not selected / blank option -->\n" + "        <option value=\"0\">Compact</option>\n" + "        <option value=\"1\">In 1 column</option>\n" + "        <option value=\"2\">In 2 columns</option>\n" + "        <option value=\"3\">In 3 columns</option>\n" + "        <option value=\"4\">In 4 columns</option>\n" + "        <option value=\"5\">In 5 columns</option>\n" + "        <option value=\"6\">In 6 columns</option>\n" + "      </select>\n" + "    </div>\n" + "  </div>\n" + "\n" + "</div>\n");
  $templateCache.put('item.html', "<div ng-attr-role=\"{{item.header ? 'heading' : undefined}}\"\n" + " ng-attr-aria-level=\"{{item.header ? item._displayLevel+1 : undefined}}\"\n" + " class=\"lf-form-table-row lf-de {{getSiblingStatus(item)}} {{getRowClass(item)}}\n" + "    {{getSkipLogicClass(item)}} {{getActiveRowClass(item)}}\" ng-click=\"setActiveRow(item)\">\n" + "  <div class=\"lf-de-label-button\">\n" + "    <!-- label -->\n" + "    <div class=\"lf-de-label\">\n" + "      <span ng-show=\"item._questionRepeatable\" class=\"lf-sn\">{{getRepeatingSN(item) }}</span>\n" + "      <span class=\"lf-question\"><label id=\"label-{{ item._elementId }}\"\n" + "      for=\"{{item._elementId}}\"><ng-include src=\"'itemPrefixAndText.html'\"></label></span>\n" + "      <span class=\"lf-item-code\" ng-show=\"lfData.templateOptions.showQuestionCode\">\n" + "        <a ng-if=\"item._linkToDef\" href=\"{{ item._linkToDef }}\" target=\"_blank\" rel=\"noopener noreferrer\">[{{ item.questionCode }}]</a>\n" + "        <span ng-if=\"!item._linkToDef\">[{{ item.questionCode }}]</span>\n" + "      </span>\n" + "      <span ng-switch on=\"getCodingInstructionsDisplayType(item)\" ng-if=\"item.codingInstructions\">\n" + "        <span ng-switch-when=\"inline-html\" id=\"help-{{ item._elementId }}\"\n" + "         class=\"lf-prompt\" ng-bind-html=\"getTrustedCodingInstructions(item)\"></span>\n" + "        <span ng-switch-when=\"inline-escaped\" id=\"help-{{ item._elementId }}\"\n" + "         class=\"lf-prompt\" ng-bind=\"item.codingInstructions\"></span>\n" + "        <button ng-switch-when=\"popover-html\" id=\"helpButton-{{ item._elementId }}\"\n" + "                class=\"lf-help-button btn-sm\" uib-popover-template=\"'popover-content.html'\"\n" + "                popover-trigger=\"focus\" popover-placement=\"right\"  popover-title=\"Instruction\"\n" + "                type=\"button\" aria-label=\"Help\"\n" + "                aria-describedby=\"label-{{ item._elementId }}\">\n" + "          <span class=\"glyphicon glyphicon-question-sign\" aria-hidden=\"true\"></span>\n" + "        </button>\n" + "        <button ng-switch-when=\"popover-escaped\" id=\"helpButton-{{ item._elementId }}\"\n" + "                class=\"lf-help-button btn-sm\" uib-popover=\"{{item.codingInstructions}}\"\n" + "                popover-trigger=\"focus\" popover-placement=\"right\"  popover-title=\"Instruction\"\n" + "                type=\"button\" aria-label=\"Help\"\n" + "                aria-describedby=\"label-{{ item._elementId }}\">\n" + "          <span class=\"glyphicon glyphicon-question-sign\" aria-hidden=\"true\"></span>\n" + "        </button>\n" + "      </span>\n" + "      <button ng-if=\"item.copyrightNotice\" id=\"copyright-{{item._elementId}}\" type=\"button\"\n" + "              class=\"lf-copyright-button btn-sm\" uib-popover=\"{{item.copyrightNotice}}\"\n" + "              popover-trigger=\"focus\" popover-placement=\"right\" popover-title=\"Copyright\"\n" + "              aria-label=\"Copyright notice\" aria-describedby=\"label-{{ item._elementId }}\">\n" + "        <span class=\"glyphicon glyphicon-copyright-mark\" aria-hidden=\"true\"></span>\n" + "      </button>\n" + "      <button ng-if=\"isItemOptionPanelButtonShown(item)\" type=\"button\" class=\"lf-control-button btn-sm\"\n" + "              ng-click=\"hideShowItemOptionPanel(item)\" aria-label=\"Item controls\"\n" + "              aria-describedby=\"label-{{ item._elementId }}\">\n" + "        <span class=\"glyphicon glyphicon-cog\" aria-hidden=\"true\"></span>\n" + "      </button>\n" + "      <!-- TBD -->\n" + "      <lf-item-options></lf-item-options>\n" + "    </div>\n" + "\n" + "    <!-- button -->\n" + "    <div class=\"lf-de-button\">\n" + "      <button ng-if=\"!hasOneRepeatingItem(item)\" class=\"lf-float-button\" type=\"button\"\n" + "              ng-click=\"removeOneRepeatingItem(item)\" id=\"del-{{item._elementId}}\"\n" + "              title='Remove this \"{{ item._text }}\"'>-</button>\n" + "    </div>\n" + "  </div>\n" + "\n" + "  <div ng-if=\"item.dataType !=='TITLE' && !item.header\" class=\"lf-de-input-unit\" ng-style=\"getFieldWidth(item)\">\n" + "    <!-- input field -->\n" + "    <div ng-switch on=\"item.dataType\" class=\"lf-de-input values hasTooltip\">\n" + "      <ng-form name=\"innerForm2\">\n" + "        <div class=\"lf-form-item-data tooltipContainer\">\n" + "          <div class=\"tooltipContent\" lf-validate=\"item\" ng-model=\"item.value\" ng-if=\"item._hasValidation\"></div>\n" + "          <div ng-switch-when=\"CNE\">\n" + "            <lf-answers item=\"item\"></lf-answers>\n" + "          </div>\n" + "          <div ng-switch-when=\"CWE\">\n" + "            <lf-answers item=\"item\"></lf-answers>\n" + "          </div>\n" + "\n" + "          <input ng-switch-when=\"DT\" name=\"{{item._text}}\" type=\"text\"\n" + "                 ng-model=\"item.value\" lf-date=\"dateOptions\" placeholder=\"{{item._toolTip}}\"\n" + "                 ng-disabled=\"item._readOnly\" id=\"{{item._elementId}}\" ng-focus=\"setActiveRow(item)\"\n" + "                 ng-blur=\"activeRowOnBlur(item)\" aria-describedby=\"help-{{ item._elementId }}\"\n" + "                 aria-required=\"{{ item._answerRequired }}\">\n" + "\n" + "          <!-- Gillardo boostrap datetime picker -->\n" + "          <div ng-switch-when=\"DTM\" class=\"lf-dtm-picker-block\">\n" + "            <input name=\"{{item._text}}\" type=\"text\" class=\"form-control\"\n" + "                   ng-model=\"item.value\" placeholder=\"{{item._toolTip}}\"\n" + "                   datetime-picker=\"{{uibDateTimePickerFormat}}\" alt-input-formats=\"uibDatePickerAltFormats\"\n" + "                   is-open=\"isOpen\" enable-time=\"true\" close-on-date-selection=\"true\" button-bar=\"uibDtmPickerButtonBar\"\n" + "                   datepicker-options=\"uibDatePickerOptions\" timepicker-options=\"uibTimePickerOptions\"\n" + "                   ng-disabled=\"item._readOnly\" id=\"{{item._elementId}}\" ng-focus=\"setActiveRow(item)\"\n" + "                   ng-blur=\"activeRowOnBlur(item); uibDtmPickerOnBlur('input')\" aria-describedby=\"help-{{ item._elementId }}\"\n" + "                   aria-required=\"{{ item._answerRequired }}\">\n" + "            <button type=\"button\" class=\"ui-datepicker-trigger\" ng-click=\"openUibDtmPicker($event)\"></button>\n" + "          </div>\n" + "\n" + "          <textarea ng-switch-when=\"TX\" name=\"{{item._text}}\"\n" + "                    ng-model=\"item.value\" ng-attr-placeholder=\"{{item._toolTip}}\" ng-disabled=\"item._readOnly\"\n" + "                    id=\"{{item._elementId}}\" ng-keyup=\"autoExpand($event)\" ng-blur=\"activeRowOnBlur(item);autoExpand($event)\" rows=\"1\"\n" + "                    ng-focus=\"setActiveRow(item)\" aria-describedby=\"help-{{ item._elementId }}\"\n" + "                    aria-required=\"{{ item._answerRequired }}\">\n" + "          </textarea>\n" + "          <input ng-switch-when=\"BL\" name=\"{{item._text}}\" type=\"checkbox\"\n" + "                 ng-model=\"item.value\" placeholder=\"{{item._toolTip}}\" ng-disabled=\"item._readOnly\"\n" + "                 id=\"{{item._elementId}}\" ng-focus=\"setActiveRow(item)\"\n" + "                 ng-true-value=\"true\" ng-false-value=\"false\"\n" + "                 ng-blur=\"activeRowOnBlur(item)\" aria-describedby=\"help-{{ item._elementId }}\">\n" + "          <input ng-switch-default name=\"{{item._text}}\" type=\"text\"\n" + "                 ng-model=\"item.value\" placeholder=\"{{item._toolTip}}\" ng-disabled=\"item._readOnly\"\n" + "                 id=\"{{item._elementId}}\" ng-focus=\"setActiveRow(item)\"\n" + "                 ng-blur=\"activeRowOnBlur(item)\" aria-describedby=\"help-{{ item._elementId }}\"\n" + "                 aria-required=\"{{ item._answerRequired }}\">\n" + "        </div>\n" + "      </ng-form>\n" + "    </div>\n" + "\n" + "    <!--unit-->\n" + "    <div ng-if=\"!lfData.templateOptions.hideUnits && checkUnits(item)\" class=\"lf-de-unit\">\n" + "      <lf-units item=\"item\"></lf-units>\n" + "    </div>\n" + "\n" + "    <!-- extra question -->\n" + "    <div ng-if=\"needExtra(item)\" class=\"lf-de-unit\">\n" + "      <input class=\"lf-extra-field\" ng-model=\"item.valueOther\" placeholder=\"Please specify\"\n" + "             ng-disabled=\"item._readOnly\" type=\"text\" ng-focus=\"setActiveRow(item)\">\n" + "    </div>\n" + "  </div>\n" + "\n" + "\n" + "</div>\n" + "\n");
  $templateCache.put('itemPrefixAndText.html', "<span ng-if=\"item.prefix\" class=\"prefix\"\n" + "      style=\"{{item._obj_prefixCSS}}\">{{item.prefix}}</span><span\n" + "      class=\"question\" style={{item._obj_textCSS}}>{{item.question}}<span\n" + "      ng-if=\"item._answerRequired\" class=\"required\" title=\"Required\">&nbsp;*</span></span>\n");
  $templateCache.put('layout-horizontal.html', "<div class=\"lf-layout-horizontal lf-table-item {{getSiblingStatus(item)}} \" ng-if=\"item._horizontalTableHeader && lfData._horizontalTableInfo[item._horizontalTableId]\">\n" + "  <div ng-attr-role=\"{{item.header ? 'heading' : undefined}}\"\n" + "       ng-attr-aria-level=\"{{item.header ? item._displayLevel+1 : undefined}}\"\n" + "       class=\"lf-form-horizontal-table-title lf-de-label\">\n" + "    <span class=\"lf-question\"><label id=\"label-{{ item._elementId }}\"><ng-include src=\"'itemPrefixAndText.html'\"></label></span>\n" + "    <span class=\"lf-item-code\" ng-show=\"lfData.templateOptions.showQuestionCode\">\n" + "        <a ng-if=\"item._linkToDef\" href=\"{{ item._linkToDef }}\" target=\"_blank\" rel=\"noopener noreferrer\">[{{ item.questionCode }}]</a>\n" + "        <span ng-if=\"!item._linkToDef\">[{{ item.questionCode }}]</span>\n" + "      </span>\n" + "    <span ng-switch on=\"getCodingInstructionsDisplayType(item)\" ng-if=\"item.codingInstructions\">\n" + "        <span ng-switch-when=\"inline-html\" class=\"lf-prompt\" ng-bind-html=\"getTrustedCodingInstructions(item)\"></span>\n" + "        <span ng-switch-when=\"inline-escaped\" class=\"lf-prompt\" ng-bind=\"item.codingInstructions\"></span>\n" + "        <button ng-switch-when=\"popover-html\" class=\"lf-help-button btn-sm\" uib-popover-template=\"'popover.html'\"\n" + "                popover-trigger=\"focus\" popover-placement=\"right\"  popover-title=\"Instruction\"\n" + "                type=\"button\" id=\"help-{{item._elementId}}\" aria-label=\"Help\"\n" + "                aria-describedby=\"label-{{ item._elementId }}\">\n" + "          <span class=\"glyphicon glyphicon-question-sign\" aria-hidden=\"true\"></span>\n" + "        </button>\n" + "        <button ng-switch-when=\"popover-escaped\" class=\"lf-help-button btn-sm\" uib-popover=\"{{item.codingInstructions}}\"\n" + "                popover-trigger=\"focus\" popover-placement=\"right\"  popover-title=\"Instruction\"\n" + "                type=\"button\" id=\"help-{{item._elementId}}\" aria-label=\"Help\"\n" + "                aria-describedby=\"label-{{ item._elementId }}\">\n" + "          <span class=\"glyphicon glyphicon-question-sign\" aria-hidden=\"true\"></span>\n" + "        </button>\n" + "      </span>\n" + "    <button ng-if=\"item.copyrightNotice\" id=\"copyright-{{item._elementId}}\" type=\"button\"\n" + "            class=\"lf-copyright-button btn-sm\" uib-popover=\"{{item.copyrightNotice}}\"\n" + "            popover-trigger=\"focus\" popover-placement=\"right\" popover-title=\"Copyright\"\n" + "            aria-label=\"Copyright notice\" aria-describedby=\"label-{{ item._elementId }}\">\n" + "      <span class=\"glyphicon glyphicon-copyright-mark\" aria-hidden=\"true\"></span>\n" + "    </button>\n" + "    <button ng-if=\"isItemOptionPanelButtonShown(item)\" type=\"button\" class=\"lf-control-button btn-sm\"\n" + "            ng-click=\"hideShowItemOptionPanel(item)\" aria-label=\"Item controls\"\n" + "            aria-describedby=\"label-{{ item._elementId }}\">\n" + "      <span class=\"glyphicon glyphicon-cog\" aria-hidden=\"true\"></span>\n" + "    </button>\n" + "    <!-- TBD -->\n" + "    <lf-item-options></lf-item-options>\n" + "  </div>\n" + "\n" + "  <table class=\"lf-form-horizontal-table\">\n" + "    <colgroup>\n" + "      <col class=\"lf-de-button\" ng-if=\"item._questionRepeatable && lfData._horizontalTableInfo[item._horizontalTableId].tableRows.length>1\">\n" + "      <col ng-repeat=\"col in lfData._horizontalTableInfo[item._horizontalTableId].columnHeaders\"\n" + "           ng-style=\"getTableColumnStyle(col)\">\n" + "    </colgroup>\n" + "    <thead>\n" + "    <tr>\n" + "      <th class=\"lf-form-horizontal-table-header\" ng-if=\"item._questionRepeatable && lfData._horizontalTableInfo[item._horizontalTableId].tableRows.length>1\"></th>\n" + "      <th ng-repeat=\"col in lfData._horizontalTableInfo[item._horizontalTableId].columnHeaders\"\n" + "          ng-init=\"item = col.item\" class=\"lf-form-horizontal-table-header\"\n" + "          id=\"{{col.id}}\"><ng-include src=\"'itemPrefixAndText.html'\"></th>\n" + "    </tr>\n" + "    </thead>\n" + "    <tbody id=\"\" class=\"\">\n" + "    <tr ng-repeat=\"row in lfData._horizontalTableInfo[item._horizontalTableId].tableRows track by $index\"\n" + "        class=\"data-row has-ng-animate\">\n" + "      <td class=\"lf-de-button\" ng-if=\"item._questionRepeatable && lfData._horizontalTableInfo[item._horizontalTableId].tableRows.length>1\">\n" + "        <button ng-if=\"!hasOneRepeatingItem(item)\" type=\"button\"\n" + "                id=\"del-{{row.header._elementId}}\"\n" + "                class=\"lf-float-button\" ng-click=\"removeOneRepeatingItem(row.header)\"\n" + "                title='Remove this row of \"{{ row.header.question }}\"'>-</button>\n" + "      </td>\n" + "\n" + "      <td ng-repeat=\"cell in row.cells\"\n" + "          class=\"hasTooltip {{getRowClass(cell)}} {{getSkipLogicClass(cell)}} {{getActiveRowClass(cell)}}\"\n" + "          ng-switch on=\"cell.dataType\">\n" + "        <ng-form name=\"innerForm2\">\n" + "          <div class=\"lf-form-item-data tooltipContainer\">\n" + "            <div class=\"tooltipContent\" lf-validate=\"cell\" ng-model=\"cell.value\" ng-if=\"cell._hasValidation\"></div>\n" + "            <span ng-switch-when=\"\" > </span>\n" + "            <input ng-switch-when=\"CNE\" name=\"{{cell.question + '_' + $id}}\" type=\"text\"\n" + "                   ng-model=\"cell.value\"\n" + "                   autocomplete-lhc=\"cell._autocompOptions\"\n" + "                   ng-disabled=\"cell._readOnly\" placeholder=\"{{cell._toolTip}}\"\n" + "                   id=\"{{cell._elementId}}\"\n" + "                   aria-labelledby=\"{{lfData._horizontalTableInfo[item._horizontalTableId].columnHeaders[$index].id}}\"\n" + "                   ng-focus=\"setActiveRow(cell)\" ng-blur=\"activeRowOnBlur(cell)\">\n" + "            <input ng-switch-when=\"CWE\" name=\"{{cell.question + '_' + $id}}\" type=\"text\"\n" + "                   ng-model=\"cell.value\"\n" + "                   autocomplete-lhc=\"cell._autocompOptions\"\n" + "                   ng-disabled=\"cell._readOnly\" placeholder=\"{{cell._toolTip}}\"\n" + "                   id=\"{{cell._elementId}}\"\n" + "                   aria-labelledby=\"{{lfData._horizontalTableInfo[item._horizontalTableId].columnHeaders[$index].id}}\"\n" + "                   ng-focus=\"setActiveRow(cell)\" ng-blur=\"activeRowOnBlur(cell)\">\n" + "            <input ng-switch-when=\"REAL\" name=\"{{cell.question}}\" type=\"text\"\n" + "                   ng-model=\"cell.value\"\n" + "                   placeholder=\"{{cell._toolTip}}\" ng-disabled=\"cell._readOnly\"\n" + "                   id=\"{{cell._elementId}}\"\n" + "                   aria-labelledby=\"{{lfData._horizontalTableInfo[item._horizontalTableId].columnHeaders[$index].id}}\"\n" + "                   ng-focus=\"setActiveRow(cell)\" ng-blur=\"activeRowOnBlur(cell)\">\n" + "            <input ng-switch-when=\"INT\" name=\"{{cell.question}}\" type=\"text\"\n" + "                   ng-model=\"cell.value\"\n" + "                   placeholder=\"{{cell._toolTip}}\" ng-disabled=\"cell._readOnly\"\n" + "                   id=\"{{cell._elementId}}\"\n" + "                   aria-labelledby=\"{{lfData._horizontalTableInfo[item._horizontalTableId].columnHeaders[$index].id}}\"\n" + "                   ng-focus=\"setActiveRow(cell)\" ng-blur=\"activeRowOnBlur(cell)\">\n" + "            <input ng-switch-when=\"DT\" name=\"{{cell.question}}\" type=\"text\"\n" + "                   ng-model=\"cell.value\"\n" + "                   lf-date=\"dateOptions\" placeholder=\"{{cell._toolTip}}\" ng-disabled=\"cell._readOnly\"\n" + "                   id=\"{{cell._elementId}}\"\n" + "                   aria-labelledby=\"{{lfData._horizontalTableInfo[item._horizontalTableId].columnHeaders[$index].id}}\"\n" + "                   ng-focus=\"setActiveRow(cell)\" ng-blur=\"activeRowOnBlur(cell)\">\n" + "            <!-- Gillardo boostrap datetime picker -->\n" + "            <div ng-switch-when=\"DTM\" class=\"lf-dtm-picker-block\">\n" + "              <input name=\"{{cell.question}}\" type=\"text\" class=\"form-control\"\n" + "                     ng-model=\"cell.value\"\n" + "                     datetime-picker=\"{{uibDateTimePickerFormat}}\" alt-input-formats=\"uibDatePickerAltFormats\"\n" + "                     is-open=\"isOpen\" enable-time=\"true\" close-on-date-selection=\"true\" button-bar=\"uibDtmPickerButtonBar\"\n" + "                     datepicker-options=\"uibDatePickerOptions\" timepicker-options=\"uibTimePickerOptions\"\n" + "                     placeholder=\"{{cell._toolTip}}\" ng-disabled=\"cell._readOnly\"\n" + "                     id=\"{{cell._elementId}}\"\n" + "                     aria-labelledby=\"{{lfData._horizontalTableInfo[item._horizontalTableId].columnHeaders[$index].id}}\"\n" + "                     ng-focus=\"setActiveRow(cell)\" ng-blur=\"activeRowOnBlur(cell); uibDtmPickerOnBlur('input')\">\n" + "              <button type=\"button\" class=\"ui-datepicker-trigger\" ng-click=\"openUibDtmPicker($event)\"></button>\n" + "            </div>\n" + "            <textarea ng-switch-when=\"TX\" name=\"{{cell.question}}\"\n" + "                      ng-model=\"cell.value\" ng-attr-placeholder=\"{{cell._toolTip}}\" ng-disabled=\"cell._readOnly\"\n" + "                      id=\"{{cell._elementId}}\"\n" + "                      aria-labelledby=\"{{lfData._horizontalTableInfo[item._horizontalTableId].columnHeaders[$index].id}}\"\n" + "                      ng-keyup=\"autoExpand($event)\" rows=\"1\"\n" + "                      ng-focus=\"setActiveRow(cell)\" ng-blur=\"activeRowOnBlur(cell)\"></textarea>\n" + "            <input ng-switch-default name=\"{{cell.question}}\" type=\"text\"\n" + "                   ng-model=\"cell.value\" placeholder=\"{{cell._toolTip}}\" ng-disabled=\"cell._readOnly\"\n" + "                   id=\"{{cell._elementId}}\"\n" + "                   aria-labelledby=\"{{lfData._horizontalTableInfo[item._horizontalTableId].columnHeaders[$index].id}}\"\n" + "                   ng-focus=\"setActiveRow(cell)\" ng-blur=\"activeRowOnBlur(cell)\">\n" + "          </div>\n" + "        </ng-form>\n" + "      </td>\n" + "    </tr>\n" + "    </tbody>\n" + "  </table>\n" + "\n" + "  <div ng-if=\"item._questionRepeatable && targetShown(item) \"\n" + "       class=\"lf-form-table-row button-row {{getSkipLogicClass(item)}}\">\n" + "    <div class=\"has-popover-warning\">\n" + "      <button type=\"button\"\n" + "              class=\"lf-float-button\" id=\"add-{{item._elementId}}\"\n" + "              ng-click=\"addOneRepeatingItem(item, true)\"\n" + "              ng-blur=\"hideUnusedItemWarning(item)\"\n" + "              uib-popover='Please enter info in the blank \"{{ item._text }}\".'\n" + "              popover-placement=\"top-left\"\n" + "              popover-trigger=\"none\"\n" + "              popover-is-open=\"item._showUnusedItemWarning\">\n" + "        + Add another \"{{item._text}}\"\n" + "      </button>\n" + "    </div>\n" + "  </div>\n" + "</div>\n" + "\n");
  $templateCache.put('layout-matrix.html', "<div class=\"lf-layout-matrix lf-table-item {{getSiblingStatus(item)}}\">\n" + "  <div ng-attr-role=\"{{item.header ? 'heading' : undefined}}\"\n" + "       ng-attr-aria-level=\"{{item.header ? item._displayLevel+1 : undefined}}\"\n" + "       class=\"lf-form-matrix-table-title lf-de-label\">\n" + "    <span class=\"lf-question\"><label id=\"label-{{ item._elementId }}\"><ng-include src=\"'itemPrefixAndText.html'\"></label></span>\n" + "    <span class=\"lf-item-code\" ng-show=\"lfData.templateOptions.showQuestionCode\">\n" + "      <a ng-if=\"item._linkToDef\" href=\"{{ item._linkToDef }}\" target=\"_blank\" rel=\"noopener noreferrer\">[{{ item.questionCode }}]</a>\n" + "      <span ng-if=\"!item._linkToDef\">[{{ item.questionCode }}]</span>\n" + "    </span>\n" + "    <span ng-switch on=\"getCodingInstructionsDisplayType(item)\" ng-if=\"item.codingInstructions\">\n" + "      <span ng-switch-when=\"inline-html\" class=\"lf-prompt\" ng-bind-html=\"getTrustedCodingInstructions(item)\"\n" + "       id=\"help-{{ item._elementId }}\"></span>\n" + "      <span ng-switch-when=\"inline-escaped\" class=\"lf-prompt\" ng-bind=\"item.codingInstructions\"\n" + "       id=\"help-{{ item._elementId }}\"></span>\n" + "      <button ng-switch-when=\"popover-html\" class=\"lf-help-button btn-sm\" uib-popover-template=\"'popover.html'\"\n" + "              popover-trigger=\"focus\" popover-placement=\"right\"  popover-title=\"Instruction\"\n" + "              type=\"button\" id=\"helpButton-{{item._elementId}}\" aria-label=\"Help\"\n" + "              aria-describedby=\"label-{{ item._elementId }}\">\n" + "        <span class=\"glyphicon glyphicon-question-sign\" aria-hidden=\"true\"></span>\n" + "      </button>\n" + "      <button ng-switch-when=\"popover-escaped\" class=\"lf-help-button btn-sm\" uib-popover=\"{{item.codingInstructions}}\"\n" + "              popover-trigger=\"focus\" popover-placement=\"right\"  popover-title=\"Instruction\"\n" + "              type=\"button\" id=\"helpButton-{{item._elementId}}\" aria-label=\"Help\"\n" + "              aria-describedby=\"label-{{ item._elementId }}\">\n" + "        <span class=\"glyphicon glyphicon-question-sign\" aria-hidden=\"true\"></span>\n" + "      </button>\n" + "    </span>\n" + "    <button ng-if=\"item.copyrightNotice\" id=\"copyright-{{item._elementId}}\" type=\"button\"\n" + "            class=\"lf-copyright-button btn-sm\" uib-popover=\"{{item.copyrightNotice}}\"\n" + "            popover-trigger=\"focus\" popover-placement=\"right\" popover-title=\"Copyright\"\n" + "            aria-label=\"Copyright notice\" aria-describedby=\"label-{{ item._elementId }}\">\n" + "      <span class=\"glyphicon glyphicon-copyright-mark\" aria-hidden=\"true\"></span>\n" + "    </button>\n" + "    <button ng-if=\"isItemOptionPanelButtonShown(item)\" type=\"button\" class=\"lf-control-button btn-sm\"\n" + "            ng-click=\"hideShowItemOptionPanel(item)\" aria-label=\"Item controls\"\n" + "            aria-describedby=\"label-{{item._elementId}}\">\n" + "      <span class=\"glyphicon glyphicon-cog\" aria-hidden=\"true\"></span>\n" + "    </button>\n" + "    <!-- TBD -->\n" + "    <lf-item-options></lf-item-options>\n" + "  </div>\n" + "  <table class=\"lf-form-matrix-table lf-form-table\">\n" + "      <colgroup>\n" + "        <col class=\"lf-question\">\n" + "        <col ng-repeat=\"answer in item.items[0].answers\">\n" + "        <col class=\"other-answer\" ng-if=\"item.items[0].dataType ==='CWE'\">\n" + "      </colgroup>\n" + "      <thead>\n" + "      <tr class=\"lf-\">\n" + "        <th class=\"lf-question lf-form-table-header\"></th>\n" + "        <th ng-repeat=\"answer in item.items[0].answers\"\n" + "            class=\"lf-form-matrix-cell lf-form-table-header\"\n" + "            id=\"answer-{{$index}}\">{{answer.text}}</th>\n" + "        <th class=\"lf-form-matrix-cell-other lf-form-table-header\" ng-if=\"item.items[0].dataType ==='CWE'\"\n" + "         id=\"otherAnswer\">Other</th>\n" + "      </tr>\n" + "      </thead>\n" + "      <tbody>\n" + "      <tr ng-repeat=\"subItem in item.items\" role=\"radiogroup\"\n" + "         ng-init=\"firstItem = item.items[0] ; item = subItem\"\n" + "         aria-labeledby=\"label-{{subItem._elementId }}\"\n" + "         aria-describedby=\"help-{{ subItem._parentItem._elementId }} help-{{ subItem._elementId }}\">\n" + "        <td class=\"lf-question\">\n" + "          <div class=\"lf-de-label\">\n" + "            <span class=\"lf-question\"><label id=\"label-{{ subItem._elementId }}\"\n" + "             for=\"{{subItem._elementId}}\"><ng-include src=\"'itemPrefixAndText.html'\"></label></span>\n" + "            <span class=\"lf-item-code\" ng-show=\"lfData.templateOptions.showQuestionCode\">\n" + "              <a ng-if=\"subItem._linkToDef\" href=\"{{ subItem._linkToDef }}\" target=\"_blank\" rel=\"noopener noreferrer\">[{{ subItem.questionCode }}]</a>\n" + "              <span ng-if=\"!subItem._linkToDef\">[{{ subItem.questionCode }}]</span>\n" + "            </span>\n" + "            <span ng-switch on=\"getCodingInstructionsDisplayType(subItem)\" ng-if=\"subItem.codingInstructions\">\n" + "              <span ng-switch-when=\"inline-html\" id=\"help-{{subItem._elementId}}\"\n" + "               class=\"lf-prompt\" ng-bind-html=\"getTrustedCodingInstructions(subItem)\"></span>\n" + "              <span ng-switch-when=\"inline-escaped\" id=\"help-{{subItem._elementId}}\"\n" + "               class=\"lf-prompt\" ng-bind=\"subItem.codingInstructions\"></span>\n" + "              <button ng-switch-when=\"popover-html\" class=\"lf-help-button btn-sm\" uib-popover-template=\"'popover.html'\"\n" + "                      popover-trigger=\"focus\" popover-placement=\"right\"  popover-title=\"Instruction\"\n" + "                      type=\"button\" id=\"helpButton-{{subItem._elementId}}\"\n" + "                      aria-label=\"Help\" aria-describedby=\"label-{{ subItem._elementId }}\">\n" + "                <span class=\"glyphicon glyphicon-question-sign\" aria-hidden=\"true\"></span>\n" + "              </button>\n" + "              <button ng-switch-when=\"popover-escaped\" class=\"lf-help-button btn-sm\" uib-popover=\"{{subItem.codingInstructions}}\"\n" + "                      popover-trigger=\"focus\" popover-placement=\"right\"  popover-title=\"Instruction\"\n" + "                      type=\"button\" id=\"helpButton-{{subItem._elementId}}\" aria-label=\"Help\"\n" + "                      aria-describedby=\"label-{{ subItem._elementId }}\">\n" + "                <span class=\"glyphicon glyphicon-question-sign\" aria-hidden=\"true\"></span>\n" + "              </button>\n" + "            </span>\n" + "            <button ng-if=\"subItem.copyrightNotice\" id=\"copyright-{{subItem._elementId}}\" type=\"button\"\n" + "                    class=\"lf-copyright-button btn-sm\" uib-popover=\"{{subItem.copyrightNotice}}\"\n" + "                    popover-trigger=\"focus\" popover-placement=\"right\" popover-title=\"Copyright\"\n" + "                    aria-label=\"Copyright notice\"\n" + "                    aria-describedby=\"label-{{ subItem._elementId }}\">\n" + "              <span class=\"glyphicon glyphicon-copyright-mark\" aria-hidden=\"true\"></span>\n" + "            </button>\n" + "          </div>\n" + "        </td>\n" + "        <td ng-repeat=\"answer in firstItem.answers\"\n" + "         class=\"lf-form-matrix-cell\">\n" + "          <span class=\"lf-form-matrix-answer\">\n" + "            <label ng-if=\"subItem._multipleAnswers\">\n" + "              <input type=\"checkbox\" id=\"{{subItem._elementId + answer.code}}\"\n" + "               ng-click=\"updateCheckboxList(subItem, answer)\" aria-labeledby=\"answer-{{$index}}\">\n" + "            </label>\n" + "            <label ng-if=\"!subItem._multipleAnswers\">\n" + "              <input type=\"radio\" id=\"{{subItem._elementId + answer.code}}\"\n" + "               aria-labeledby=\"answer-{{$index}}\" ng-model=\"subItem.value\" ng-value=\"answer\"\n" + "                     name=\"{{subItem._elementId}}\" ng-change=\"updateRadioList(subItem)\">\n" + "            </label>\n" + "          </span>\n" + "        </td>\n" + "        <td class=\"lf-form-matrix-cell-other\" ng-if=\"subItem.dataType ==='CWE'\"\n" + "         aria-labeledby=otherAnswer>\n" + "          <!--for multiple answers-->\n" + "          <span ng-if=\"subItem._multipleAnswers\" class=\"lf-form-matrix-answer\">\n" + "            <label>\n" + "              <input type=\"checkbox\" ng-model=\"subItem._otherValueChecked\"\n" + "                     id=\"{{subItem._elementId + '_other'}}\"\n" + "                     ng-change=\"updateCheckboxListForOther(subItem, subitem._answerOther)\">\n" + "            </label>\n" + "            <label>\n" + "              <input type=\"text\" ng-model=\"subitem._answerOther\"\n" + "                     id=\"{{subItem._elementId + '_otherValue'}}\"\n" + "                     ng-change=\"updateCheckboxListForOther(subItem, subitem._answerOther)\">\n" + "            </label>\n" + "          </span>\n" + "          <!--for single answer-->\n" + "          <span ng-if=\"!subItem._multipleAnswers\" class=\"lf-form-matrix-answer\">\n" + "            <label>\n" + "              <input type=\"radio\" id=\"{{subItem._elementId + '_other'}}\" ng-model=\"subItem._otherValueChecked\"\n" + "                     ng-value=\"true\" name=\"{{subItem._elementId}}\"\n" + "                     ng-change=\"updateRadioListForOther(subItem, subitem._answerOther)\">\n" + "            </label>\n" + "            <label>\n" + "              <input type=\"text\" id=\"{{subItem._elementId + '_otherValue'}}\" ng-model=\"subitem._answerOther\"\n" + "                     ng-change=\"updateRadioListForOther(subItem, subitem._answerOther)\">\n" + "            </label>\n" + "          </span>\n" + "        </td>\n" + "      </tr>\n" + "      </tbody>\n" + "    </table>\n" + "  <lf-repeating-button></lf-repeating-button>\n" + "</div>\n" + "\n");
  $templateCache.put('popover-content.html', "<div class=\"lf-popover\" ng-bind-html=\"getTrustedCodingInstructions(item)\"></div>\n");
  $templateCache.put('repeating-button.html', "<!--a button at the end of each repeating section-->\n" + "<div ng-if=\"item._lastRepeatingItem && targetShown(item) \"\n" + "     class=\"lf-form-table-row button-row {{getSkipLogicClass(item)}}\">\n" + "  <div class=\"has-popover-warning\">\n" + "    <button type=\"button\"\n" + "            class=\"lf-float-button\" id=\"add-{{item._elementId}}\"\n" + "            ng-click=\"addOneRepeatingItem(item)\"\n" + "            ng-blur=\"hideUnusedItemWarning(item)\"\n" + "            uib-popover='{{item._unusedItemWarning}}'\n" + "            popover-placement=\"top-left\"\n" + "            popover-trigger=\"none\"\n" + "            popover-is-open=\"item._showUnusedItemWarning\">\n" + "      + Add another \"{{item._text}}\"\n" + "    </button>\n" + "  </div>\n" + "</div>\n");
  $templateCache.put('table-item.html', "<div class=\"lf-table-item {{getSiblingStatus(item)}}\">\n" + "  <!-- question -->\n" + "  <lf-item ng-if=\"!item._isHiddenFromView\" ng-style=\"getItemStyle(item)\"></lf-item>\n" + "\n" + "  <!--sub sections, check each item's layout -->\n" + "  <div ng-if=\"item.items\" class=\"section\">\n" + "    <div ng-repeat=\"item in item.items\" ng-if=\"targetShown(item) && !item._isHiddenFromView\"\n" + "         class=\"data-row has-ng-animate {{getRowClass(item)}} {{getSkipLogicClass(item)}}\n" + "         {{getActiveRowClass(item)}} {{getItemViewModeClass(item)}}\">\n" + "      <div ng-if=\"item.header\" ng-switch on=\"item.displayControl.questionLayout\">\n" + "        <div ng-switch-when=\"horizontal\">\n" + "          <lf-section-horizontal></lf-section-horizontal>\n" + "        </div>\n" + "        <div ng-switch-when=\"matrix\">\n" + "          <lf-section-matrix></lf-section-matrix>\n" + "        </div>\n" + "        <div ng-switch-when=\"vertical\">\n" + "          <lf-table-item></lf-table-item>\n" + "        </div>\n" + "        <div ng-switch-default>\n" + "          <lf-table-item></lf-table-item>\n" + "        </div>\n" + "      </div>\n" + "      <div ng-if=\"!item.header\">\n" + "        <lf-table-item></lf-table-item>\n" + "      </div>\n" + "    </div>\n" + "  </div>\n" + "  <lf-repeating-button></lf-repeating-button>\n" + "</div>\n");
  $templateCache.put('template-table.html', "<form ng-if=\"lfData\" class=\"lf-form lf-template-table {{getIndentationStyle()}}\" novalidate autocomplete=\"false\"\n" + "      ng-keydown=\"handleNavigationKeyEventByTab($event)\">\n" + "    <!--form controls-->\n" + "    <lf-form-controls></lf-form-controls>\n" + "    <!--form title-->\n" + "    <lf-form-title></lf-form-title>\n" + "    <!-- form options -->\n" + "    <lf-form-options></lf-form-options>\n" + "    <!--form header-->\n" + "    <lf-form-header></lf-form-header>\n" + "    <!--form body-->\n" + "    <div class=\"lf-form-body\">\n" + "      <!--check form level questionLayout for matrix and horizontal layouts-->\n" + "      <div ng-switch on=\"lfData.templateOptions.displayControl.questionLayout\">\n" + "        <!--horizontal-->\n" + "        <div ng-switch-when=\"horizontal\" class=\"lf-top-section\">\n" + "          <lf-section-horizontal></lf-section-horizontal>\n" + "        </div>\n" + "        <!--matrix-->\n" + "        <div ng-switch-when=\"matrix\" class=\"lf-top-section\">\n" + "          <lf-section-matrix></lf-section-matrix>\n" + "        </div>\n" + "        <!--vertical-->\n" + "        <div ng-switch-default>\n" + "          <!-- data row, column header -->\n" + "          <div class=\"lf-column-header\" ng-if=\"lfData.templateOptions.showColumnHeaders\">\n" + "            <div class=\"lf-column-label-button\" id=\"th_Name\">\n" + "              {{lfData.templateOptions.columnHeaders[0].name}}\n" + "            </div>\n" + "            <div class=\"lf-column-input-unit\" ng-style=\"getFieldWidth(item)\">\n" + "              <div class=\"lf-column-input\" id=\"th_Value\">\n" + "                {{lfData.templateOptions.columnHeaders[1].name}}\n" + "              </div>\n" + "              <div ng-if=\"!lfData.templateOptions.hideUnits\" class=\"lf-column-unit\" id=\"th_Units\">\n" + "                {{lfData.templateOptions.columnHeaders[2].name}}\n" + "              </div>\n" + "            </div>\n" + "          </div>\n" + "          <!-- data row, for each item -->\n" + "          <!-- check each top level item's questionLayout -->\n" + "          <div ng-if=\"lfData.items\" class=\"lf-form-table\">\n" + "            <div ng-repeat=\"item in lfData.items\" ng-if=\"targetShown(item) && !item._isHiddenFromView\"\n" + "                 class=\"data-row has-ng-animate {{getRowClass(item)}} {{getSkipLogicClass(item)}}\n" + "                 {{getActiveRowClass(item)}} {{getItemViewModeClass(item)}}\">\n" + "              <!--header item-->\n" + "              <div ng-if=\"item.header\" ng-switch on=\"item.displayControl.questionLayout\">\n" + "                <div ng-switch-when=\"horizontal\">\n" + "                  <lf-section-horizontal></lf-section-horizontal>\n" + "                </div>\n" + "                <div ng-switch-when=\"matrix\">\n" + "                  <lf-section-matrix></lf-section-matrix>\n" + "                </div>\n" + "                <div ng-switch-when=\"vertical\">\n" + "                  <lf-table-item></lf-table-item>\n" + "                </div>\n" + "                <div ng-switch-default>\n" + "                  <lf-table-item></lf-table-item>\n" + "                </div>\n" + "              </div>\n" + "              <!--non-header data item-->\n" + "              <div ng-if=\"!item.header\">\n" + "                <lf-table-item></lf-table-item>\n" + "              </div>\n" + "            </div>\n" + "          </div>\n" + "        </div>\n" + "      </div>\n" + "    </div>\n" + "</form>\n");
  $templateCache.put('uib-popover-templates/uib-popover-template.html', "<div class=\"popover\"\n" + "  tooltip-animation-class=\"fade\"\n" + "  uib-tooltip-classes\n" + "  ng-class=\"{ in: isOpen() }\">\n" + "  <div class=\"arrow\"></div>\n" + "\n" + "  <div aria-live=polite class=\"popover-inner\">\n" + "      <h3 class=\"popover-title\" ng-bind=\"uibTitle\" ng-if=\"uibTitle\"></h3>\n" + "      <div class=\"popover-content\"\n" + "        uib-tooltip-template-transclude=\"contentExp()\"\n" + "        tooltip-template-transclude-scope=\"originScope()\"></div>\n" + "  </div>\n" + "</div>\n");
  $templateCache.put('uib-popover-templates/uib-popover.html', "<div class=\"popover\"\n" + "  tooltip-animation-class=\"fade\"\n" + "  uib-tooltip-classes\n" + "  ng-class=\"{ in: isOpen() }\">\n" + "  <div class=\"arrow\"></div>\n" + "\n" + "  <div aria-live=polite class=\"popover-inner\">\n" + "      <h3 class=\"popover-title\" ng-bind=\"uibTitle\" ng-if=\"uibTitle\"></h3>\n" + "      <div class=\"popover-content\" ng-bind=\"content\" ng-if=\"content\"></div>\n" + "  </div>\n" + "</div>\n");
}]);

/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var forEach = __webpack_require__(24).forEach;

var elementUtilsMaker = __webpack_require__(25);

var listenerHandlerMaker = __webpack_require__(26);

var idGeneratorMaker = __webpack_require__(27);

var idHandlerMaker = __webpack_require__(28);

var reporterMaker = __webpack_require__(29);

var browserDetector = __webpack_require__(30);

var batchProcessorMaker = __webpack_require__(31);

var stateHandler = __webpack_require__(33); //Detection strategies.


var objectStrategyMaker = __webpack_require__(34);

var scrollStrategyMaker = __webpack_require__(35);

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
  var importantCssRules = getOption(options, "important", false);
  var strategyOptions = {
    reporter: reporter,
    batchProcessor: batchProcessor,
    stateHandler: stateHandler,
    idHandler: idHandler,
    important: importantCssRules
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
          debug: debug,
          important: importantCssRules
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

  function initDocument(targetDocument) {
    detectionStrategy.initDocument && detectionStrategy.initDocument(targetDocument);
  }

  return {
    listenTo: listenTo,
    removeListener: eventListenerHandler.removeListener,
    removeAllListeners: eventListenerHandler.removeAllListeners,
    uninstall: uninstall,
    initDocument: initDocument
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
/* 24 */
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
/* 25 */
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
/* 26 */
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
/* 27 */
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
/* 28 */
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
/* 29 */
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
/* 30 */
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
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(32);

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
/* 32 */
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
/* 33 */
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
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Resize detection strategy that injects objects to elements in order to detect resize events.
 * Heavily inspired by: http://www.backalleycoder.com/2013/03/18/cross-browser-event-based-element-resize-detection/
 */


var browserDetector = __webpack_require__(30);

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

      if (!object) {
        throw new Error("Element is not detectable by this strategy.");
      }

      object.contentDocument.defaultView.addEventListener("resize", listenerProxy);
    }
  }

  function buildCssTextString(rules) {
    var seperator = options.important ? " !important; " : "; ";
    return (rules.join(seperator) + seperator).trim();
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
      var OBJECT_STYLE = buildCssTextString(["display: block", "position: absolute", "top: 0", "left: 0", "width: 100%", "height: 100%", "border: none", "padding: 0", "margin: 0", "opacity: 0", "z-index: -1000", "pointer-events: none"]); //The target element needs to be positioned (everything except static) so the absolute positioned object will be positioned relative to the target element.
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
            element.style.setProperty("position", "relative", options.important ? "important" : "");

            var removeRelativeStyles = function removeRelativeStyles(reporter, element, style, property) {
              function getNumericalValue(value) {
                return value.replace(/[^-\d\.]/g, "");
              }

              var value = style[property];

              if (value !== "auto" && getNumericalValue(value) !== "0") {
                reporter.warn("An element that is positioned static has style." + property + "=" + value + " which is ignored due to the static positioning. The element will need to be positioned relative, so the style." + property + " will be set to 0. Element: ", element);
                element.style.setProperty(property, "0", options.important ? "important" : "");
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
              var state = getState(element);

              if (state.checkForObjectDocumentTimeoutId) {
                window.clearTimeout(state.checkForObjectDocumentTimeoutId);
              }

              state.checkForObjectDocumentTimeoutId = setTimeout(function checkForObjectDocument() {
                state.checkForObjectDocumentTimeoutId = 0;
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

        if (!getState(element)) {
          // The element has been uninstalled before the actual loading happened.
          return;
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
    if (!getState(element)) {
      return;
    }

    var object = getObject(element);

    if (!object) {
      return;
    }

    if (browserDetector.isIE(8)) {
      element.detachEvent("onresize", object.proxy);
    } else {
      element.removeChild(object);
    }

    if (getState(element).checkForObjectDocumentTimeoutId) {
      window.clearTimeout(getState(element).checkForObjectDocumentTimeoutId);
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
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Resize detection strategy that injects divs to elements in order to detect resize events on scroll events.
 * Heavily inspired by: https://github.com/marcj/css-element-queries/blob/master/src/ResizeSensor.js
 */


var forEach = __webpack_require__(24).forEach;

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


  var scrollbarSizes = getScrollbarSizes();
  var styleId = "erd_scroll_detection_scrollbar_style";
  var detectionContainerClass = "erd_scroll_detection_container";

  function initDocument(targetDocument) {
    // Inject the scrollbar styling that prevents them from appearing sometimes in Chrome.
    // The injected container needs to have a class, so that it may be styled with CSS (pseudo elements).
    injectScrollStyle(targetDocument, styleId, detectionContainerClass);
  }

  initDocument(window.document);

  function buildCssTextString(rules) {
    var seperator = options.important ? " !important; " : "; ";
    return (rules.join(seperator) + seperator).trim();
  }

  function getScrollbarSizes() {
    var width = 500;
    var height = 500;
    var child = document.createElement("div");
    child.style.cssText = buildCssTextString(["position: absolute", "width: " + width * 2 + "px", "height: " + height * 2 + "px", "visibility: hidden", "margin: 0", "padding: 0"]);
    var container = document.createElement("div");
    container.style.cssText = buildCssTextString(["position: absolute", "width: " + width + "px", "height: " + height + "px", "overflow: scroll", "visibility: none", "top: " + -width * 3 + "px", "left: " + -height * 3 + "px", "visibility: hidden", "margin: 0", "padding: 0"]);
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

  function injectScrollStyle(targetDocument, styleId, containerClass) {
    function injectStyle(style, method) {
      method = method || function (element) {
        targetDocument.head.appendChild(element);
      };

      var styleElement = targetDocument.createElement("style");
      styleElement.innerHTML = style;
      styleElement.id = styleId;
      method(styleElement);
      return styleElement;
    }

    if (!targetDocument.getElementById(styleId)) {
      var containerAnimationClass = containerClass + "_animation";
      var containerAnimationActiveClass = containerClass + "_animation_active";
      var style = "/* Created by the element-resize-detector library. */\n";
      style += "." + containerClass + " > div::-webkit-scrollbar { " + buildCssTextString(["display: none"]) + " }\n\n";
      style += "." + containerAnimationActiveClass + " { " + buildCssTextString(["-webkit-animation-duration: 0.1s", "animation-duration: 0.1s", "-webkit-animation-name: " + containerAnimationClass, "animation-name: " + containerAnimationClass]) + " }\n";
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
        container.style.cssText = buildCssTextString(["visibility: hidden", "display: inline", "width: 0px", "height: 0px", "z-index: -1", "overflow: hidden", "margin: 0", "padding: 0"]);
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
          element.style.setProperty("position", "relative", options.important ? "important" : "");

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
        return ["left: " + left, "top: " + top, "right: " + right, "bottom: " + bottom];
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
      var containerContainerStyle = buildCssTextString(["position: absolute", "flex: none", "overflow: hidden", "z-index: -1", "visibility: hidden", "width: 100%", "height: 100%", "left: 0px", "top: 0px"]);
      var containerStyle = buildCssTextString(["position: absolute", "flex: none", "overflow: hidden", "z-index: -1", "visibility: hidden"].concat(getLeftTopBottomRightCssText(-(1 + scrollbarWidth), -(1 + scrollbarHeight), -scrollbarHeight, -scrollbarWidth)));
      var expandStyle = buildCssTextString(["position: absolute", "flex: none", "overflow: scroll", "z-index: -1", "visibility: hidden", "width: 100%", "height: 100%"]);
      var shrinkStyle = buildCssTextString(["position: absolute", "flex: none", "overflow: scroll", "z-index: -1", "visibility: hidden", "width: 100%", "height: 100%"]);
      var expandChildStyle = buildCssTextString(["position: absolute", "left: 0", "top: 0"]);
      var shrinkChildStyle = buildCssTextString(["position: absolute", "width: 200%", "height: 200%"]);
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
        expandChild.style.setProperty("width", expandWidth + "px", options.important ? "important" : "");
        expandChild.style.setProperty("height", expandHeight + "px", options.important ? "important" : "");
      }

      function updateDetectorElements(done) {
        var width = element.offsetWidth;
        var height = element.offsetHeight; // Check whether the size has actually changed since last time the algorithm ran. If not, some steps may be skipped.

        var sizeChanged = width !== getState(element).lastWidth || height !== getState(element).lastHeight;
        debug("Storing current size", width, height); // Store the size of the element sync here, so that multiple scroll events may be ignored in the event listeners.
        // Otherwise the if-check in handleScroll is useless.

        storeCurrentSize(element, width, height); // Since we delay the processing of the batch, there is a risk that uninstall has been called before the batch gets to execute.
        // Since there is no way to cancel the fn executions, we need to add an uninstall guard to all fns of the batch.

        batchProcessor.add(0, function performUpdateChildSizes() {
          if (!sizeChanged) {
            return;
          }

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
          // This function needs to be invoked event though the size is unchanged. The element could have been resized very quickly and then
          // been restored to the original size, which will have changed the scrollbar positions.
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

        if (sizeChanged && done) {
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
        var state = getState(element); // Don't notify if the current size is the start size, and this is the first notification.

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

        updateDetectorElements(notifyListenersIfNeeded);
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
    uninstall: uninstall,
    initDocument: initDocument
  };
};

/***/ })
/******/ ]);
//# sourceMappingURL=lforms.js.map
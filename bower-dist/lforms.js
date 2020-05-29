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

__webpack_require__(35);

__webpack_require__(36);

__webpack_require__(38);

__webpack_require__(39);

__webpack_require__(41);

LForms.Util.FHIRSupport = __webpack_require__(42);

__webpack_require__(43);

LForms._elementResizeDetectorMaker = __webpack_require__(44);
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

module.exports = JSON.parse("{\"lformsVersion\":\"24.1.3\"}");

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
      if (lfData) {
        // sometimes set to null to clear the page
        if (lfData.hasFHIRPath || lfData._hasInitialExpr) {
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
          }
        }

        if (!lfData._controllerInit && (lfData.hasFHIRPath || lfData._hasInitialExpr)) {
          lfData._expressionProcessor.runCalculations(true);
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
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var js_untar__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(31);
/* harmony import */ var js_untar__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(js_untar__WEBPACK_IMPORTED_MODULE_0__);
function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

/**
 * LForms Utility tools
 */
var moment = __webpack_require__(14); // Acceptable date formats
// Strict parsing -


var parseDateFormats = ['M/D/YYYY', 'M/D/YY', 'M/D', 'M-D-YYYY', 'M-D-YY', 'M-D', 'YYYY', 'YYYY-M-D', 'YYYY/M/D', moment.ISO_8601, 'M/D/YYYY HH:mm', 'M/D/YY HH:mm', 'M/D HH:mm', 'M-D-YYYY HH:mm', 'M-D-YY HH:mm', 'M-D HH:mm']; // A map of FHIR extensions involving Expressions to the property names on
// which they will be stored in LFormsData, and a boolean indicating whether
// more than one extension of the type is permitted.

var _copiedExtensions = {
  "http://hl7.org/fhir/StructureDefinition/questionnaire-calculatedExpression": ["_calculatedExprExt", false],
  "http://hl7.org/fhir/StructureDefinition/questionnaire-initialExpression": ["_initialExprExt", false],
  "http://hl7.org/fhir/uv/sdc/StructureDefinition/sdc-questionnaire-observationLinkPeriod": ["_obsLinkPeriodExt", false],
  "http://hl7.org/fhir/StructureDefinition/variable": ["_variableExt", true]
};

var LForms = __webpack_require__(4); //var tar = require('tar-stream');
//var gunzip = require('gunzip-maybe');


var pako = __webpack_require__(15);



var str2ab = __webpack_require__(32);

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
   * @param options A hash of options (currently just one):
   *   * prepopulate:  Set to true if you want FHIR prepopulation to happen (if
   *     the form was an imported FHIR Questionnaire).
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
   *  Some extensions are simply copied over to the LForms data structure.
   *  This copies those extensions from qItem.extension to lfItem if they exist, and
   *  LForms can support them.
   * @param extensionArray - Questionnaire.item.extension
   * @param lfItem an item from the LFormsData structure
   */
  processCopiedItemExtensions: function processCopiedItemExtensions(lfItem, extensionArray) {
    if (!extensionArray || extensionArray.length === 0) {
      return;
    } // Go through selected extensions.


    var copiedExtURLs = Object.keys(_copiedExtensions);

    for (var i = 0, len = copiedExtURLs.length; i < len; ++i) {
      var url = copiedExtURLs[i];
      var extInfo = _copiedExtensions[url];
      var prop = extInfo[0],
          multiple = extInfo[1];
      var ext = LForms.Util.removeObjectsFromArray(extensionArray, 'url', url, 0, multiple);

      if (multiple && ext.length > 0 || !multiple && ext) {
        // If array, avoid assigning empty array
        lfItem[prop] = ext;
      }
    }
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
   * Some extensions are translated to other lforms fields, some are renamed internally and some are
   * preserved as they are. This function creates extension array with the renamed and preserved extensions
   * to use in output for lforms format.
   *
   * Recreate
   * @param {Object} - Internal item object of LFormsData, i.e. LFormsData.items[x]
   * @return {array|null} Array of extensions
   */
  createExtensionFromLForms: function createExtensionFromLForms(formOrItem) {
    var extension = [];
    ['_variableExt', '_calculatedExprExt', '_initialExprExt', '_obsLinkPeriodExt'].forEach(function (extName) {
      var _ext = formOrItem[extName];

      if (_ext) {
        if (Array.isArray(_ext)) {
          extension.push.apply(extension, _ext);
        } else {
          extension.push(_ext);
        }
      }
    });

    if (formOrItem.extension && formOrItem.extension.length > 0) {
      extension.push.apply(extension, formOrItem.extension);
    } // Return null if none


    return extension.length > 0 ? extension : null;
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
  testFetch: function testFetch(fileUrl) {
    if (fileUrl) {
      return fetch(fileUrl).then(function (response) {
        //var data = pako.inflate(response.body);
        //console.log(data);
        return response.blob();
      });
    }
  },
  // base64Encode: function (buf) {
  //   let string = '';
  //   (new Uint8Array(buf)).forEach(
  //       (byte) => { string += String.fromCharCode(byte) }
  //     )
  //   return btoa(string)
  // },
  // testGzippedTarFile: function(packageUrl) {
  //   var that = this;
  //   if (packageUrl) {
  //     fetch(packageUrl)
  //     .then(res => res.blob()) //arrayBuffer())
  //     .then(response => {
  //       var reader = new FileReader();
  //       reader.onload = function(event){
  //         var base64 =   event.target.result
  //         // TODO: base64 includes header info
  //         // "data:application/gzip;base64,H4sIAAkTyF4AA+3RMQ6DMAyF4cw9RU6A4hDCeSIRdWMgRtDbN4BYkTpAl/9bLFtveJI1F210VXMjV8UQttn2odt3OfaDeCNtjN6JBFfv4mvSWHdnqdNcNE3WmiWN70++yuWpPFHoWVr/b4ek6fXvJgAAAAAAAAAAAAAAAACAX3wBvhQL0QAoAAA="
  //         var base64Content = base64.replace(/^data:[\/;a-z]+;base64,/, "");
  //         //base64 = "H4sIAAkTyF4AA+3RMQ6DMAyF4cw9RU6A4hDCeSIRdWMgRtDbN4BYkTpAl/9bLFtveJI1F210VXMjV8UQttn2odt3OfaDeCNtjN6JBFfv4mvSWHdnqdNcNE3WmiWN70++yuWpPFHoWVr/b4ek6fXvJgAAAAAAAAAAAAAAAACAX3wBvhQL0QAoAAA=";
  //         // from base64 to ascii binary string
  //         var decodedAsString = atob(base64Content);
  //         // ascii string to bytes in gzipped format
  //         var data = that._binaryStringToArray(decodedAsString);
  //         // raw, uncompressed, binary image data into an array using gzip.js
  //         var uncompressed = require('gzip-js').unzip(data);
  //         // now take the raw uncompressed png and convert it
  //         // back to base64 to use it as a data url
  //         var asString = that._arrayToBinaryString(uncompressed);
  //         var encodedForDataUrl = btoa(asString);
  //         const tarFile = that._str2ab(encodedForDataUrl)
  //         untar(tarFile)
  //         .progress(function(extractedFile) {
  //           // Do something with a single extracted file.
  //           console.log(extractedFile);
  //           //var jsonData = extractedFile.readAsJSON();
  //           var strData = extractedFile.readAsString();
  //         })
  //         .then(function(extractedFiles) {
  //           // Do something with all extracted files.
  //           console.log(extractedFiles);
  //         });
  //         return asString;
  //       };
  //       reader.readAsDataURL(response);
  //     });
  //   }
  // },
  // //https://stackoverflow.com/questions/14308815/using-javascript-to-inflate-a-blob
  // testGzipFile2: function(packageUrl) {
  //   if (packageUrl) {
  //     fetch(packageUrl)
  //     .then(res => res.blob())
  //     .then(response => {
  //       //var input = 'byu9g1RZpINUpVtoKoiKIqJYoris...'; // really long string
  //       // var input = response;
  //       // input = "H4sIAAkTyF4AA+3RMQ6DMAyF4cw9RU6A4hDCeSIRdWMgRtDbN4BYkTpAl/9bLFtveJI1F210VXMjV8UQttn2odt3OfaDeCNtjN6JBFfv4mvSWHdnqdNcNE3WmiWN70++yuWpPFHoWVr/b4ek6fXvJgAAAAAAAAAAAAAAAACAX3wBvhQL0QAoAAA=";
  //       // // from base64 to ascii binary string
  //       // var decodedAsString = atob(input);
  //       // ascii string to bytes in gzipped format
  //       // var data = this._binaryStringToArray(decodedAsString);
  //       var data = this._binaryStringToArray(response);
  //       // raw, uncompressed, binary image data into an array using gzip.js
  //       var uncompressed = require('gzip-js').unzip(data);
  //       // now take the raw uncompressed png and convert it
  //       // back to base64 to use it as a data url
  //       var asString = this._arrayToBinaryString(uncompressed);
  //       var encodedForDataUrl = btoa(asString);
  //       //const tarFile = (new Response(asString)).arrayBuffer();
  //       const tarFile = this._str2ab(asString)
  //       untar(tarFile)
  //       .progress(function(extractedFile) {
  //         // Do something with a single extracted file.
  //         console.log(extractedFile);
  //         //var jsonData = extractedFile.readAsJSON();
  //         var strData = extractedFile.readAsString();
  //       })
  //       .then(function(extractedFiles) {
  //         // Do something with all extracted files.
  //         console.log(extractedFiles);
  //       });
  //       return asString;
  //     })
  //   }
  // },
  // _binaryStringToArray: function(binaryString) {
  //   var data = [];
  //   for (var i = 0; i < binaryString.length; ++i) {
  //       data[i] = binaryString.charCodeAt(i);
  //   }
  //   return data;
  // },
  // _arrayToBinaryString: function(array) {
  //   var str = '';
  //   for (var i = 0; i < array.length; ++i) {
  //       str += String.fromCharCode(array[i]);
  //   }
  //   return str;
  // },
  // _str2ab: function(str) {
  //   var buf = new ArrayBuffer(str.length*2); // 2 bytes for each char
  //   var bufView = new Uint16Array(buf);
  //   for (var i=0, strLen=str.length; i < strLen; i++) {
  //     bufView[i] = str.charCodeAt(i);
  //   }
  //   return buf;
  // },
  //https://stackoverflow.com/questions/47443433/extracting-gzip-data-in-javascript-with-pako-encoding-issues
  getGzippedTarFile: function getGzippedTarFile(packageUrl) {
    if (packageUrl) {
      fetch(packageUrl).then(function (res) {
        return res.blob();
      }) //arrayBuffer())
      .then(function (response) {
        var reader = new FileReader();

        reader.onload = function (event) {
          var base64 = event.target.result; // base64 includes header info
          // "data:application/gzip;base64,H4sIAAkTyF4AA+3RMQ6DMAyF4cw9RU6A4hDCeSIRdWMgRtDbN4BYkTpAl/9bLFtveJI1F210VXMjV8UQttn2odt3OfaDeCNtjN6JBFfv4mvSWHdnqdNcNE3WmiWN70++yuWpPFHoWVr/b4ek6fXvJgAAAAAAAAAAAAAAAACAX3wBvhQL0QAoAAA="

          var base64Content = base64.replace(/^data:[\/;a-z]+;base64,/, "");
          var strData = atob(base64Content); // split it into an array rather than a "string"

          var charData = strData.split('').map(function (x) {
            return x.charCodeAt(0);
          }); // convert to binary

          var binData = new Uint8Array(charData); // inflate

          var unzippedData = pako.inflate(binData); // Convert gunzipped byteArray back to ascii string:

          var strAsciiData = String.fromCharCode.apply(null, new Uint16Array(unzippedData)); // convert string to ArrayBuffer

          var abData = str2ab(strAsciiData);
          js_untar__WEBPACK_IMPORTED_MODULE_0___default()(abData).progress(function (extractedFile) {
            // do something with a single extracted file
            console.log(extractedFile); //var fileJsonContent = extractedFile.readAsJSON();

            var fileStrContent = extractedFile.readAsString();
            console.log(fileStrContent);
          }).then(function (extractedFiles) {
            // all extracted files
            console.log(extractedFiles);
          });
        };

        reader.readAsDataURL(response);
      });
    }
  },
  testGzipFile: function testGzipFile(packageUrl) {
    if (packageUrl) {
      fetch(packageUrl).then(function (res) {
        return res.blob();
      }) //arrayBuffer())
      .then(function (response) {
        // HttpClient result is in response.data
        // convert the incoming base64 -> binary
        //const strData = atob(response);
        //const strDataMod = this.base64Encode(response);
        var reader = new FileReader();

        reader.onload = function (event) {
          var base64 = event.target.result; // TODO: base64 includes header info
          // "data:application/gzip;base64,H4sIAAkTyF4AA+3RMQ6DMAyF4cw9RU6A4hDCeSIRdWMgRtDbN4BYkTpAl/9bLFtveJI1F210VXMjV8UQttn2odt3OfaDeCNtjN6JBFfv4mvSWHdnqdNcNE3WmiWN70++yuWpPFHoWVr/b4ek6fXvJgAAAAAAAAAAAAAAAACAX3wBvhQL0QAoAAA="
          // base64 = "H4sIAAkTyF4AA+3RMQ6DMAyF4cw9RU6A4hDCeSIRdWMgRtDbN4BYkTpAl/9bLFtveJI1F210VXMjV8UQttn2odt3OfaDeCNtjN6JBFfv4mvSWHdnqdNcNE3WmiWN70++yuWpPFHoWVr/b4ek6fXvJgAAAAAAAAAAAAAAAACAX3wBvhQL0QAoAAA=";

          var base64Content = base64.replace(/^data:[\/;a-z]+;base64,/, "");
          var strData = atob(base64Content); // split it into an array rather than a "string"

          var charData = strData.split('').map(function (x) {
            return x.charCodeAt(0);
          }); // convert to binary

          var binData = new Uint8Array(charData); // inflate

          var unzipped = pako.inflate(binData);
          console.log(unzipped); // Convert gunzipped byteArray back to ascii string:

          var strAsciiData = String.fromCharCode.apply(null, new Uint16Array(unzipped)); //const tarfile = (new Response(strData)).arrayBuffer();

          var tarfile = str2ab(strAsciiData);
          js_untar__WEBPACK_IMPORTED_MODULE_0___default()(tarfile).progress(function (extractedFile) {
            // Do something with a single extracted file.
            console.log(extractedFile); //var jsonData = extractedFile.readAsJSON();

            var strData = extractedFile.readAsString();
            console.log(strData);
          }).then(function (extractedFiles) {
            // Do something with all extracted files.
            console.log(extractedFiles);
          }); // var data = pako.ungzip(binData);
          // console.log(data)
          // var gunzipped = gunzip(binData);
          // console.log(gunzipped)
          // return gunzipped;
        };

        reader.readAsDataURL(response); //return res.body.pipe(gunzip());
        //res.body.on("end", () => resolve("it worked"));
      });
    }
  },
  testTarFile: function testTarFile(packageUrl) {
    if (packageUrl) {
      fetch(packageUrl).then(function (response) {
        return response.arrayBuffer();
      }) //  .blob())
      .then(function (tarFile) {
        var extract = tar.extract();
        js_untar__WEBPACK_IMPORTED_MODULE_0___default()(tarFile).progress(function (extractedFile) {
          // Do something with a single extracted file.
          console.log(extractedFile); //var jsonData = extractedFile.readAsJSON();

          var strData = extractedFile.readAsString();
        }).then(function (extractedFiles) {
          // Do something with all extracted files.
          console.log(extractedFiles);
        });
        return tarFile; //return res.body.pipe(gunzip());
        //res.body.on("end", () => resolve("it worked"));
      });
    }
  }
};

/***/ }),
/* 14 */
/***/ (function(module, exports) {

module.exports = moment;

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// Top level file is just a mixin of submodules & constants


var assign = __webpack_require__(16).assign;

var deflate = __webpack_require__(17);

var inflate = __webpack_require__(25);

var constants = __webpack_require__(29);

var pako = {};
assign(pako, deflate, inflate, constants);
module.exports = pako;

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var TYPED_OK = typeof Uint8Array !== 'undefined' && typeof Uint16Array !== 'undefined' && typeof Int32Array !== 'undefined';

function _has(obj, key) {
  return Object.prototype.hasOwnProperty.call(obj, key);
}

exports.assign = function (obj
/*from1, from2, from3, ...*/
) {
  var sources = Array.prototype.slice.call(arguments, 1);

  while (sources.length) {
    var source = sources.shift();

    if (!source) {
      continue;
    }

    if (_typeof(source) !== 'object') {
      throw new TypeError(source + 'must be non-object');
    }

    for (var p in source) {
      if (_has(source, p)) {
        obj[p] = source[p];
      }
    }
  }

  return obj;
}; // reduce buffer size, avoiding mem copy


exports.shrinkBuf = function (buf, size) {
  if (buf.length === size) {
    return buf;
  }

  if (buf.subarray) {
    return buf.subarray(0, size);
  }

  buf.length = size;
  return buf;
};

var fnTyped = {
  arraySet: function arraySet(dest, src, src_offs, len, dest_offs) {
    if (src.subarray && dest.subarray) {
      dest.set(src.subarray(src_offs, src_offs + len), dest_offs);
      return;
    } // Fallback to ordinary array


    for (var i = 0; i < len; i++) {
      dest[dest_offs + i] = src[src_offs + i];
    }
  },
  // Join array of chunks to single array.
  flattenChunks: function flattenChunks(chunks) {
    var i, l, len, pos, chunk, result; // calculate data length

    len = 0;

    for (i = 0, l = chunks.length; i < l; i++) {
      len += chunks[i].length;
    } // join chunks


    result = new Uint8Array(len);
    pos = 0;

    for (i = 0, l = chunks.length; i < l; i++) {
      chunk = chunks[i];
      result.set(chunk, pos);
      pos += chunk.length;
    }

    return result;
  }
};
var fnUntyped = {
  arraySet: function arraySet(dest, src, src_offs, len, dest_offs) {
    for (var i = 0; i < len; i++) {
      dest[dest_offs + i] = src[src_offs + i];
    }
  },
  // Join array of chunks to single array.
  flattenChunks: function flattenChunks(chunks) {
    return [].concat.apply([], chunks);
  }
}; // Enable/Disable typed arrays use, for testing
//

exports.setTyped = function (on) {
  if (on) {
    exports.Buf8 = Uint8Array;
    exports.Buf16 = Uint16Array;
    exports.Buf32 = Int32Array;
    exports.assign(exports, fnTyped);
  } else {
    exports.Buf8 = Array;
    exports.Buf16 = Array;
    exports.Buf32 = Array;
    exports.assign(exports, fnUntyped);
  }
};

exports.setTyped(TYPED_OK);

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var zlib_deflate = __webpack_require__(18);

var utils = __webpack_require__(16);

var strings = __webpack_require__(23);

var msg = __webpack_require__(22);

var ZStream = __webpack_require__(24);

var toString = Object.prototype.toString;
/* Public constants ==========================================================*/

/* ===========================================================================*/

var Z_NO_FLUSH = 0;
var Z_FINISH = 4;
var Z_OK = 0;
var Z_STREAM_END = 1;
var Z_SYNC_FLUSH = 2;
var Z_DEFAULT_COMPRESSION = -1;
var Z_DEFAULT_STRATEGY = 0;
var Z_DEFLATED = 8;
/* ===========================================================================*/

/**
 * class Deflate
 *
 * Generic JS-style wrapper for zlib calls. If you don't need
 * streaming behaviour - use more simple functions: [[deflate]],
 * [[deflateRaw]] and [[gzip]].
 **/

/* internal
 * Deflate.chunks -> Array
 *
 * Chunks of output data, if [[Deflate#onData]] not overridden.
 **/

/**
 * Deflate.result -> Uint8Array|Array
 *
 * Compressed result, generated by default [[Deflate#onData]]
 * and [[Deflate#onEnd]] handlers. Filled after you push last chunk
 * (call [[Deflate#push]] with `Z_FINISH` / `true` param)  or if you
 * push a chunk with explicit flush (call [[Deflate#push]] with
 * `Z_SYNC_FLUSH` param).
 **/

/**
 * Deflate.err -> Number
 *
 * Error code after deflate finished. 0 (Z_OK) on success.
 * You will not need it in real life, because deflate errors
 * are possible only on wrong options or bad `onData` / `onEnd`
 * custom handlers.
 **/

/**
 * Deflate.msg -> String
 *
 * Error message, if [[Deflate.err]] != 0
 **/

/**
 * new Deflate(options)
 * - options (Object): zlib deflate options.
 *
 * Creates new deflator instance with specified params. Throws exception
 * on bad params. Supported options:
 *
 * - `level`
 * - `windowBits`
 * - `memLevel`
 * - `strategy`
 * - `dictionary`
 *
 * [http://zlib.net/manual.html#Advanced](http://zlib.net/manual.html#Advanced)
 * for more information on these.
 *
 * Additional options, for internal needs:
 *
 * - `chunkSize` - size of generated data chunks (16K by default)
 * - `raw` (Boolean) - do raw deflate
 * - `gzip` (Boolean) - create gzip wrapper
 * - `to` (String) - if equal to 'string', then result will be "binary string"
 *    (each char code [0..255])
 * - `header` (Object) - custom header for gzip
 *   - `text` (Boolean) - true if compressed data believed to be text
 *   - `time` (Number) - modification time, unix timestamp
 *   - `os` (Number) - operation system code
 *   - `extra` (Array) - array of bytes with extra data (max 65536)
 *   - `name` (String) - file name (binary string)
 *   - `comment` (String) - comment (binary string)
 *   - `hcrc` (Boolean) - true if header crc should be added
 *
 * ##### Example:
 *
 * ```javascript
 * var pako = require('pako')
 *   , chunk1 = Uint8Array([1,2,3,4,5,6,7,8,9])
 *   , chunk2 = Uint8Array([10,11,12,13,14,15,16,17,18,19]);
 *
 * var deflate = new pako.Deflate({ level: 3});
 *
 * deflate.push(chunk1, false);
 * deflate.push(chunk2, true);  // true -> last chunk
 *
 * if (deflate.err) { throw new Error(deflate.err); }
 *
 * console.log(deflate.result);
 * ```
 **/

function Deflate(options) {
  if (!(this instanceof Deflate)) return new Deflate(options);
  this.options = utils.assign({
    level: Z_DEFAULT_COMPRESSION,
    method: Z_DEFLATED,
    chunkSize: 16384,
    windowBits: 15,
    memLevel: 8,
    strategy: Z_DEFAULT_STRATEGY,
    to: ''
  }, options || {});
  var opt = this.options;

  if (opt.raw && opt.windowBits > 0) {
    opt.windowBits = -opt.windowBits;
  } else if (opt.gzip && opt.windowBits > 0 && opt.windowBits < 16) {
    opt.windowBits += 16;
  }

  this.err = 0; // error code, if happens (0 = Z_OK)

  this.msg = ''; // error message

  this.ended = false; // used to avoid multiple onEnd() calls

  this.chunks = []; // chunks of compressed data

  this.strm = new ZStream();
  this.strm.avail_out = 0;
  var status = zlib_deflate.deflateInit2(this.strm, opt.level, opt.method, opt.windowBits, opt.memLevel, opt.strategy);

  if (status !== Z_OK) {
    throw new Error(msg[status]);
  }

  if (opt.header) {
    zlib_deflate.deflateSetHeader(this.strm, opt.header);
  }

  if (opt.dictionary) {
    var dict; // Convert data if needed

    if (typeof opt.dictionary === 'string') {
      // If we need to compress text, change encoding to utf8.
      dict = strings.string2buf(opt.dictionary);
    } else if (toString.call(opt.dictionary) === '[object ArrayBuffer]') {
      dict = new Uint8Array(opt.dictionary);
    } else {
      dict = opt.dictionary;
    }

    status = zlib_deflate.deflateSetDictionary(this.strm, dict);

    if (status !== Z_OK) {
      throw new Error(msg[status]);
    }

    this._dict_set = true;
  }
}
/**
 * Deflate#push(data[, mode]) -> Boolean
 * - data (Uint8Array|Array|ArrayBuffer|String): input data. Strings will be
 *   converted to utf8 byte sequence.
 * - mode (Number|Boolean): 0..6 for corresponding Z_NO_FLUSH..Z_TREE modes.
 *   See constants. Skipped or `false` means Z_NO_FLUSH, `true` means Z_FINISH.
 *
 * Sends input data to deflate pipe, generating [[Deflate#onData]] calls with
 * new compressed chunks. Returns `true` on success. The last data block must have
 * mode Z_FINISH (or `true`). That will flush internal pending buffers and call
 * [[Deflate#onEnd]]. For interim explicit flushes (without ending the stream) you
 * can use mode Z_SYNC_FLUSH, keeping the compression context.
 *
 * On fail call [[Deflate#onEnd]] with error code and return false.
 *
 * We strongly recommend to use `Uint8Array` on input for best speed (output
 * array format is detected automatically). Also, don't skip last param and always
 * use the same type in your code (boolean or number). That will improve JS speed.
 *
 * For regular `Array`-s make sure all elements are [0..255].
 *
 * ##### Example
 *
 * ```javascript
 * push(chunk, false); // push one of data chunks
 * ...
 * push(chunk, true);  // push last chunk
 * ```
 **/


Deflate.prototype.push = function (data, mode) {
  var strm = this.strm;
  var chunkSize = this.options.chunkSize;

  var status, _mode;

  if (this.ended) {
    return false;
  }

  _mode = mode === ~~mode ? mode : mode === true ? Z_FINISH : Z_NO_FLUSH; // Convert data if needed

  if (typeof data === 'string') {
    // If we need to compress text, change encoding to utf8.
    strm.input = strings.string2buf(data);
  } else if (toString.call(data) === '[object ArrayBuffer]') {
    strm.input = new Uint8Array(data);
  } else {
    strm.input = data;
  }

  strm.next_in = 0;
  strm.avail_in = strm.input.length;

  do {
    if (strm.avail_out === 0) {
      strm.output = new utils.Buf8(chunkSize);
      strm.next_out = 0;
      strm.avail_out = chunkSize;
    }

    status = zlib_deflate.deflate(strm, _mode);
    /* no bad return value */

    if (status !== Z_STREAM_END && status !== Z_OK) {
      this.onEnd(status);
      this.ended = true;
      return false;
    }

    if (strm.avail_out === 0 || strm.avail_in === 0 && (_mode === Z_FINISH || _mode === Z_SYNC_FLUSH)) {
      if (this.options.to === 'string') {
        this.onData(strings.buf2binstring(utils.shrinkBuf(strm.output, strm.next_out)));
      } else {
        this.onData(utils.shrinkBuf(strm.output, strm.next_out));
      }
    }
  } while ((strm.avail_in > 0 || strm.avail_out === 0) && status !== Z_STREAM_END); // Finalize on the last chunk.


  if (_mode === Z_FINISH) {
    status = zlib_deflate.deflateEnd(this.strm);
    this.onEnd(status);
    this.ended = true;
    return status === Z_OK;
  } // callback interim results if Z_SYNC_FLUSH.


  if (_mode === Z_SYNC_FLUSH) {
    this.onEnd(Z_OK);
    strm.avail_out = 0;
    return true;
  }

  return true;
};
/**
 * Deflate#onData(chunk) -> Void
 * - chunk (Uint8Array|Array|String): output data. Type of array depends
 *   on js engine support. When string output requested, each chunk
 *   will be string.
 *
 * By default, stores data blocks in `chunks[]` property and glue
 * those in `onEnd`. Override this handler, if you need another behaviour.
 **/


Deflate.prototype.onData = function (chunk) {
  this.chunks.push(chunk);
};
/**
 * Deflate#onEnd(status) -> Void
 * - status (Number): deflate status. 0 (Z_OK) on success,
 *   other if not.
 *
 * Called once after you tell deflate that the input stream is
 * complete (Z_FINISH) or should be flushed (Z_SYNC_FLUSH)
 * or if an error happened. By default - join collected chunks,
 * free memory and fill `results` / `err` properties.
 **/


Deflate.prototype.onEnd = function (status) {
  // On success - join
  if (status === Z_OK) {
    if (this.options.to === 'string') {
      this.result = this.chunks.join('');
    } else {
      this.result = utils.flattenChunks(this.chunks);
    }
  }

  this.chunks = [];
  this.err = status;
  this.msg = this.strm.msg;
};
/**
 * deflate(data[, options]) -> Uint8Array|Array|String
 * - data (Uint8Array|Array|String): input data to compress.
 * - options (Object): zlib deflate options.
 *
 * Compress `data` with deflate algorithm and `options`.
 *
 * Supported options are:
 *
 * - level
 * - windowBits
 * - memLevel
 * - strategy
 * - dictionary
 *
 * [http://zlib.net/manual.html#Advanced](http://zlib.net/manual.html#Advanced)
 * for more information on these.
 *
 * Sugar (options):
 *
 * - `raw` (Boolean) - say that we work with raw stream, if you don't wish to specify
 *   negative windowBits implicitly.
 * - `to` (String) - if equal to 'string', then result will be "binary string"
 *    (each char code [0..255])
 *
 * ##### Example:
 *
 * ```javascript
 * var pako = require('pako')
 *   , data = Uint8Array([1,2,3,4,5,6,7,8,9]);
 *
 * console.log(pako.deflate(data));
 * ```
 **/


function deflate(input, options) {
  var deflator = new Deflate(options);
  deflator.push(input, true); // That will never happens, if you don't cheat with options :)

  if (deflator.err) {
    throw deflator.msg || msg[deflator.err];
  }

  return deflator.result;
}
/**
 * deflateRaw(data[, options]) -> Uint8Array|Array|String
 * - data (Uint8Array|Array|String): input data to compress.
 * - options (Object): zlib deflate options.
 *
 * The same as [[deflate]], but creates raw data, without wrapper
 * (header and adler32 crc).
 **/


function deflateRaw(input, options) {
  options = options || {};
  options.raw = true;
  return deflate(input, options);
}
/**
 * gzip(data[, options]) -> Uint8Array|Array|String
 * - data (Uint8Array|Array|String): input data to compress.
 * - options (Object): zlib deflate options.
 *
 * The same as [[deflate]], but create gzip wrapper instead of
 * deflate one.
 **/


function gzip(input, options) {
  options = options || {};
  options.gzip = true;
  return deflate(input, options);
}

exports.Deflate = Deflate;
exports.deflate = deflate;
exports.deflateRaw = deflateRaw;
exports.gzip = gzip;

/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
 // (C) 1995-2013 Jean-loup Gailly and Mark Adler
// (C) 2014-2017 Vitaly Puzrin and Andrey Tupitsin
//
// This software is provided 'as-is', without any express or implied
// warranty. In no event will the authors be held liable for any damages
// arising from the use of this software.
//
// Permission is granted to anyone to use this software for any purpose,
// including commercial applications, and to alter it and redistribute it
// freely, subject to the following restrictions:
//
// 1. The origin of this software must not be misrepresented; you must not
//   claim that you wrote the original software. If you use this software
//   in a product, an acknowledgment in the product documentation would be
//   appreciated but is not required.
// 2. Altered source versions must be plainly marked as such, and must not be
//   misrepresented as being the original software.
// 3. This notice may not be removed or altered from any source distribution.

var utils = __webpack_require__(16);

var trees = __webpack_require__(19);

var adler32 = __webpack_require__(20);

var crc32 = __webpack_require__(21);

var msg = __webpack_require__(22);
/* Public constants ==========================================================*/

/* ===========================================================================*/

/* Allowed flush values; see deflate() and inflate() below for details */


var Z_NO_FLUSH = 0;
var Z_PARTIAL_FLUSH = 1; //var Z_SYNC_FLUSH    = 2;

var Z_FULL_FLUSH = 3;
var Z_FINISH = 4;
var Z_BLOCK = 5; //var Z_TREES         = 6;

/* Return codes for the compression/decompression functions. Negative values
 * are errors, positive values are used for special but normal events.
 */

var Z_OK = 0;
var Z_STREAM_END = 1; //var Z_NEED_DICT     = 2;
//var Z_ERRNO         = -1;

var Z_STREAM_ERROR = -2;
var Z_DATA_ERROR = -3; //var Z_MEM_ERROR     = -4;

var Z_BUF_ERROR = -5; //var Z_VERSION_ERROR = -6;

/* compression levels */
//var Z_NO_COMPRESSION      = 0;
//var Z_BEST_SPEED          = 1;
//var Z_BEST_COMPRESSION    = 9;

var Z_DEFAULT_COMPRESSION = -1;
var Z_FILTERED = 1;
var Z_HUFFMAN_ONLY = 2;
var Z_RLE = 3;
var Z_FIXED = 4;
var Z_DEFAULT_STRATEGY = 0;
/* Possible values of the data_type field (though see inflate()) */
//var Z_BINARY              = 0;
//var Z_TEXT                = 1;
//var Z_ASCII               = 1; // = Z_TEXT

var Z_UNKNOWN = 2;
/* The deflate compression method */

var Z_DEFLATED = 8;
/*============================================================================*/

var MAX_MEM_LEVEL = 9;
/* Maximum value for memLevel in deflateInit2 */

var MAX_WBITS = 15;
/* 32K LZ77 window */

var DEF_MEM_LEVEL = 8;
var LENGTH_CODES = 29;
/* number of length codes, not counting the special END_BLOCK code */

var LITERALS = 256;
/* number of literal bytes 0..255 */

var L_CODES = LITERALS + 1 + LENGTH_CODES;
/* number of Literal or Length codes, including the END_BLOCK code */

var D_CODES = 30;
/* number of distance codes */

var BL_CODES = 19;
/* number of codes used to transfer the bit lengths */

var HEAP_SIZE = 2 * L_CODES + 1;
/* maximum heap size */

var MAX_BITS = 15;
/* All codes must not exceed MAX_BITS bits */

var MIN_MATCH = 3;
var MAX_MATCH = 258;
var MIN_LOOKAHEAD = MAX_MATCH + MIN_MATCH + 1;
var PRESET_DICT = 0x20;
var INIT_STATE = 42;
var EXTRA_STATE = 69;
var NAME_STATE = 73;
var COMMENT_STATE = 91;
var HCRC_STATE = 103;
var BUSY_STATE = 113;
var FINISH_STATE = 666;
var BS_NEED_MORE = 1;
/* block not completed, need more input or more output */

var BS_BLOCK_DONE = 2;
/* block flush performed */

var BS_FINISH_STARTED = 3;
/* finish started, need only more output at next deflate */

var BS_FINISH_DONE = 4;
/* finish done, accept no more input or output */

var OS_CODE = 0x03; // Unix :) . Don't detect, use this default.

function err(strm, errorCode) {
  strm.msg = msg[errorCode];
  return errorCode;
}

function rank(f) {
  return (f << 1) - (f > 4 ? 9 : 0);
}

function zero(buf) {
  var len = buf.length;

  while (--len >= 0) {
    buf[len] = 0;
  }
}
/* =========================================================================
 * Flush as much pending output as possible. All deflate() output goes
 * through this function so some applications may wish to modify it
 * to avoid allocating a large strm->output buffer and copying into it.
 * (See also read_buf()).
 */


function flush_pending(strm) {
  var s = strm.state; //_tr_flush_bits(s);

  var len = s.pending;

  if (len > strm.avail_out) {
    len = strm.avail_out;
  }

  if (len === 0) {
    return;
  }

  utils.arraySet(strm.output, s.pending_buf, s.pending_out, len, strm.next_out);
  strm.next_out += len;
  s.pending_out += len;
  strm.total_out += len;
  strm.avail_out -= len;
  s.pending -= len;

  if (s.pending === 0) {
    s.pending_out = 0;
  }
}

function flush_block_only(s, last) {
  trees._tr_flush_block(s, s.block_start >= 0 ? s.block_start : -1, s.strstart - s.block_start, last);

  s.block_start = s.strstart;
  flush_pending(s.strm);
}

function put_byte(s, b) {
  s.pending_buf[s.pending++] = b;
}
/* =========================================================================
 * Put a short in the pending buffer. The 16-bit value is put in MSB order.
 * IN assertion: the stream state is correct and there is enough room in
 * pending_buf.
 */


function putShortMSB(s, b) {
  //  put_byte(s, (Byte)(b >> 8));
  //  put_byte(s, (Byte)(b & 0xff));
  s.pending_buf[s.pending++] = b >>> 8 & 0xff;
  s.pending_buf[s.pending++] = b & 0xff;
}
/* ===========================================================================
 * Read a new buffer from the current input stream, update the adler32
 * and total number of bytes read.  All deflate() input goes through
 * this function so some applications may wish to modify it to avoid
 * allocating a large strm->input buffer and copying from it.
 * (See also flush_pending()).
 */


function read_buf(strm, buf, start, size) {
  var len = strm.avail_in;

  if (len > size) {
    len = size;
  }

  if (len === 0) {
    return 0;
  }

  strm.avail_in -= len; // zmemcpy(buf, strm->next_in, len);

  utils.arraySet(buf, strm.input, strm.next_in, len, start);

  if (strm.state.wrap === 1) {
    strm.adler = adler32(strm.adler, buf, len, start);
  } else if (strm.state.wrap === 2) {
    strm.adler = crc32(strm.adler, buf, len, start);
  }

  strm.next_in += len;
  strm.total_in += len;
  return len;
}
/* ===========================================================================
 * Set match_start to the longest match starting at the given string and
 * return its length. Matches shorter or equal to prev_length are discarded,
 * in which case the result is equal to prev_length and match_start is
 * garbage.
 * IN assertions: cur_match is the head of the hash chain for the current
 *   string (strstart) and its distance is <= MAX_DIST, and prev_length >= 1
 * OUT assertion: the match length is not greater than s->lookahead.
 */


function longest_match(s, cur_match) {
  var chain_length = s.max_chain_length;
  /* max hash chain length */

  var scan = s.strstart;
  /* current string */

  var match;
  /* matched string */

  var len;
  /* length of current match */

  var best_len = s.prev_length;
  /* best match length so far */

  var nice_match = s.nice_match;
  /* stop if match long enough */

  var limit = s.strstart > s.w_size - MIN_LOOKAHEAD ? s.strstart - (s.w_size - MIN_LOOKAHEAD) : 0
  /*NIL*/
  ;
  var _win = s.window; // shortcut

  var wmask = s.w_mask;
  var prev = s.prev;
  /* Stop when cur_match becomes <= limit. To simplify the code,
   * we prevent matches with the string of window index 0.
   */

  var strend = s.strstart + MAX_MATCH;
  var scan_end1 = _win[scan + best_len - 1];
  var scan_end = _win[scan + best_len];
  /* The code is optimized for HASH_BITS >= 8 and MAX_MATCH-2 multiple of 16.
   * It is easy to get rid of this optimization if necessary.
   */
  // Assert(s->hash_bits >= 8 && MAX_MATCH == 258, "Code too clever");

  /* Do not waste too much time if we already have a good match: */

  if (s.prev_length >= s.good_match) {
    chain_length >>= 2;
  }
  /* Do not look for matches beyond the end of the input. This is necessary
   * to make deflate deterministic.
   */


  if (nice_match > s.lookahead) {
    nice_match = s.lookahead;
  } // Assert((ulg)s->strstart <= s->window_size-MIN_LOOKAHEAD, "need lookahead");


  do {
    // Assert(cur_match < s->strstart, "no future");
    match = cur_match;
    /* Skip to next match if the match length cannot increase
     * or if the match length is less than 2.  Note that the checks below
     * for insufficient lookahead only occur occasionally for performance
     * reasons.  Therefore uninitialized memory will be accessed, and
     * conditional jumps will be made that depend on those values.
     * However the length of the match is limited to the lookahead, so
     * the output of deflate is not affected by the uninitialized values.
     */

    if (_win[match + best_len] !== scan_end || _win[match + best_len - 1] !== scan_end1 || _win[match] !== _win[scan] || _win[++match] !== _win[scan + 1]) {
      continue;
    }
    /* The check at best_len-1 can be removed because it will be made
     * again later. (This heuristic is not always a win.)
     * It is not necessary to compare scan[2] and match[2] since they
     * are always equal when the other bytes match, given that
     * the hash keys are equal and that HASH_BITS >= 8.
     */


    scan += 2;
    match++; // Assert(*scan == *match, "match[2]?");

    /* We check for insufficient lookahead only every 8th comparison;
     * the 256th check will be made at strstart+258.
     */

    do {
      /*jshint noempty:false*/
    } while (_win[++scan] === _win[++match] && _win[++scan] === _win[++match] && _win[++scan] === _win[++match] && _win[++scan] === _win[++match] && _win[++scan] === _win[++match] && _win[++scan] === _win[++match] && _win[++scan] === _win[++match] && _win[++scan] === _win[++match] && scan < strend); // Assert(scan <= s->window+(unsigned)(s->window_size-1), "wild scan");


    len = MAX_MATCH - (strend - scan);
    scan = strend - MAX_MATCH;

    if (len > best_len) {
      s.match_start = cur_match;
      best_len = len;

      if (len >= nice_match) {
        break;
      }

      scan_end1 = _win[scan + best_len - 1];
      scan_end = _win[scan + best_len];
    }
  } while ((cur_match = prev[cur_match & wmask]) > limit && --chain_length !== 0);

  if (best_len <= s.lookahead) {
    return best_len;
  }

  return s.lookahead;
}
/* ===========================================================================
 * Fill the window when the lookahead becomes insufficient.
 * Updates strstart and lookahead.
 *
 * IN assertion: lookahead < MIN_LOOKAHEAD
 * OUT assertions: strstart <= window_size-MIN_LOOKAHEAD
 *    At least one byte has been read, or avail_in == 0; reads are
 *    performed for at least two bytes (required for the zip translate_eol
 *    option -- not supported here).
 */


function fill_window(s) {
  var _w_size = s.w_size;
  var p, n, m, more, str; //Assert(s->lookahead < MIN_LOOKAHEAD, "already enough lookahead");

  do {
    more = s.window_size - s.lookahead - s.strstart; // JS ints have 32 bit, block below not needed

    /* Deal with !@#$% 64K limit: */
    //if (sizeof(int) <= 2) {
    //    if (more == 0 && s->strstart == 0 && s->lookahead == 0) {
    //        more = wsize;
    //
    //  } else if (more == (unsigned)(-1)) {
    //        /* Very unlikely, but possible on 16 bit machine if
    //         * strstart == 0 && lookahead == 1 (input done a byte at time)
    //         */
    //        more--;
    //    }
    //}

    /* If the window is almost full and there is insufficient lookahead,
     * move the upper half to the lower one to make room in the upper half.
     */

    if (s.strstart >= _w_size + (_w_size - MIN_LOOKAHEAD)) {
      utils.arraySet(s.window, s.window, _w_size, _w_size, 0);
      s.match_start -= _w_size;
      s.strstart -= _w_size;
      /* we now have strstart >= MAX_DIST */

      s.block_start -= _w_size;
      /* Slide the hash table (could be avoided with 32 bit values
       at the expense of memory usage). We slide even when level == 0
       to keep the hash table consistent if we switch back to level > 0
       later. (Using level 0 permanently is not an optimal usage of
       zlib, so we don't care about this pathological case.)
       */

      n = s.hash_size;
      p = n;

      do {
        m = s.head[--p];
        s.head[p] = m >= _w_size ? m - _w_size : 0;
      } while (--n);

      n = _w_size;
      p = n;

      do {
        m = s.prev[--p];
        s.prev[p] = m >= _w_size ? m - _w_size : 0;
        /* If n is not on any hash chain, prev[n] is garbage but
         * its value will never be used.
         */
      } while (--n);

      more += _w_size;
    }

    if (s.strm.avail_in === 0) {
      break;
    }
    /* If there was no sliding:
     *    strstart <= WSIZE+MAX_DIST-1 && lookahead <= MIN_LOOKAHEAD - 1 &&
     *    more == window_size - lookahead - strstart
     * => more >= window_size - (MIN_LOOKAHEAD-1 + WSIZE + MAX_DIST-1)
     * => more >= window_size - 2*WSIZE + 2
     * In the BIG_MEM or MMAP case (not yet supported),
     *   window_size == input_size + MIN_LOOKAHEAD  &&
     *   strstart + s->lookahead <= input_size => more >= MIN_LOOKAHEAD.
     * Otherwise, window_size == 2*WSIZE so more >= 2.
     * If there was sliding, more >= WSIZE. So in all cases, more >= 2.
     */
    //Assert(more >= 2, "more < 2");


    n = read_buf(s.strm, s.window, s.strstart + s.lookahead, more);
    s.lookahead += n;
    /* Initialize the hash value now that we have some input: */

    if (s.lookahead + s.insert >= MIN_MATCH) {
      str = s.strstart - s.insert;
      s.ins_h = s.window[str];
      /* UPDATE_HASH(s, s->ins_h, s->window[str + 1]); */

      s.ins_h = (s.ins_h << s.hash_shift ^ s.window[str + 1]) & s.hash_mask; //#if MIN_MATCH != 3
      //        Call update_hash() MIN_MATCH-3 more times
      //#endif

      while (s.insert) {
        /* UPDATE_HASH(s, s->ins_h, s->window[str + MIN_MATCH-1]); */
        s.ins_h = (s.ins_h << s.hash_shift ^ s.window[str + MIN_MATCH - 1]) & s.hash_mask;
        s.prev[str & s.w_mask] = s.head[s.ins_h];
        s.head[s.ins_h] = str;
        str++;
        s.insert--;

        if (s.lookahead + s.insert < MIN_MATCH) {
          break;
        }
      }
    }
    /* If the whole input has less than MIN_MATCH bytes, ins_h is garbage,
     * but this is not important since only literal bytes will be emitted.
     */

  } while (s.lookahead < MIN_LOOKAHEAD && s.strm.avail_in !== 0);
  /* If the WIN_INIT bytes after the end of the current data have never been
   * written, then zero those bytes in order to avoid memory check reports of
   * the use of uninitialized (or uninitialised as Julian writes) bytes by
   * the longest match routines.  Update the high water mark for the next
   * time through here.  WIN_INIT is set to MAX_MATCH since the longest match
   * routines allow scanning to strstart + MAX_MATCH, ignoring lookahead.
   */
  //  if (s.high_water < s.window_size) {
  //    var curr = s.strstart + s.lookahead;
  //    var init = 0;
  //
  //    if (s.high_water < curr) {
  //      /* Previous high water mark below current data -- zero WIN_INIT
  //       * bytes or up to end of window, whichever is less.
  //       */
  //      init = s.window_size - curr;
  //      if (init > WIN_INIT)
  //        init = WIN_INIT;
  //      zmemzero(s->window + curr, (unsigned)init);
  //      s->high_water = curr + init;
  //    }
  //    else if (s->high_water < (ulg)curr + WIN_INIT) {
  //      /* High water mark at or above current data, but below current data
  //       * plus WIN_INIT -- zero out to current data plus WIN_INIT, or up
  //       * to end of window, whichever is less.
  //       */
  //      init = (ulg)curr + WIN_INIT - s->high_water;
  //      if (init > s->window_size - s->high_water)
  //        init = s->window_size - s->high_water;
  //      zmemzero(s->window + s->high_water, (unsigned)init);
  //      s->high_water += init;
  //    }
  //  }
  //
  //  Assert((ulg)s->strstart <= s->window_size - MIN_LOOKAHEAD,
  //    "not enough room for search");

}
/* ===========================================================================
 * Copy without compression as much as possible from the input stream, return
 * the current block state.
 * This function does not insert new strings in the dictionary since
 * uncompressible data is probably not useful. This function is used
 * only for the level=0 compression option.
 * NOTE: this function should be optimized to avoid extra copying from
 * window to pending_buf.
 */


function deflate_stored(s, flush) {
  /* Stored blocks are limited to 0xffff bytes, pending_buf is limited
   * to pending_buf_size, and each stored block has a 5 byte header:
   */
  var max_block_size = 0xffff;

  if (max_block_size > s.pending_buf_size - 5) {
    max_block_size = s.pending_buf_size - 5;
  }
  /* Copy as much as possible from input to output: */


  for (;;) {
    /* Fill the window as much as possible: */
    if (s.lookahead <= 1) {
      //Assert(s->strstart < s->w_size+MAX_DIST(s) ||
      //  s->block_start >= (long)s->w_size, "slide too late");
      //      if (!(s.strstart < s.w_size + (s.w_size - MIN_LOOKAHEAD) ||
      //        s.block_start >= s.w_size)) {
      //        throw  new Error("slide too late");
      //      }
      fill_window(s);

      if (s.lookahead === 0 && flush === Z_NO_FLUSH) {
        return BS_NEED_MORE;
      }

      if (s.lookahead === 0) {
        break;
      }
      /* flush the current block */

    } //Assert(s->block_start >= 0L, "block gone");
    //    if (s.block_start < 0) throw new Error("block gone");


    s.strstart += s.lookahead;
    s.lookahead = 0;
    /* Emit a stored block if pending_buf will be full: */

    var max_start = s.block_start + max_block_size;

    if (s.strstart === 0 || s.strstart >= max_start) {
      /* strstart == 0 is possible when wraparound on 16-bit machine */
      s.lookahead = s.strstart - max_start;
      s.strstart = max_start;
      /*** FLUSH_BLOCK(s, 0); ***/

      flush_block_only(s, false);

      if (s.strm.avail_out === 0) {
        return BS_NEED_MORE;
      }
      /***/

    }
    /* Flush if we may have to slide, otherwise block_start may become
     * negative and the data will be gone:
     */


    if (s.strstart - s.block_start >= s.w_size - MIN_LOOKAHEAD) {
      /*** FLUSH_BLOCK(s, 0); ***/
      flush_block_only(s, false);

      if (s.strm.avail_out === 0) {
        return BS_NEED_MORE;
      }
      /***/

    }
  }

  s.insert = 0;

  if (flush === Z_FINISH) {
    /*** FLUSH_BLOCK(s, 1); ***/
    flush_block_only(s, true);

    if (s.strm.avail_out === 0) {
      return BS_FINISH_STARTED;
    }
    /***/


    return BS_FINISH_DONE;
  }

  if (s.strstart > s.block_start) {
    /*** FLUSH_BLOCK(s, 0); ***/
    flush_block_only(s, false);

    if (s.strm.avail_out === 0) {
      return BS_NEED_MORE;
    }
    /***/

  }

  return BS_NEED_MORE;
}
/* ===========================================================================
 * Compress as much as possible from the input stream, return the current
 * block state.
 * This function does not perform lazy evaluation of matches and inserts
 * new strings in the dictionary only for unmatched strings or for short
 * matches. It is used only for the fast compression options.
 */


function deflate_fast(s, flush) {
  var hash_head;
  /* head of the hash chain */

  var bflush;
  /* set if current block must be flushed */

  for (;;) {
    /* Make sure that we always have enough lookahead, except
     * at the end of the input file. We need MAX_MATCH bytes
     * for the next match, plus MIN_MATCH bytes to insert the
     * string following the next match.
     */
    if (s.lookahead < MIN_LOOKAHEAD) {
      fill_window(s);

      if (s.lookahead < MIN_LOOKAHEAD && flush === Z_NO_FLUSH) {
        return BS_NEED_MORE;
      }

      if (s.lookahead === 0) {
        break;
        /* flush the current block */
      }
    }
    /* Insert the string window[strstart .. strstart+2] in the
     * dictionary, and set hash_head to the head of the hash chain:
     */


    hash_head = 0
    /*NIL*/
    ;

    if (s.lookahead >= MIN_MATCH) {
      /*** INSERT_STRING(s, s.strstart, hash_head); ***/
      s.ins_h = (s.ins_h << s.hash_shift ^ s.window[s.strstart + MIN_MATCH - 1]) & s.hash_mask;
      hash_head = s.prev[s.strstart & s.w_mask] = s.head[s.ins_h];
      s.head[s.ins_h] = s.strstart;
      /***/
    }
    /* Find the longest match, discarding those <= prev_length.
     * At this point we have always match_length < MIN_MATCH
     */


    if (hash_head !== 0
    /*NIL*/
    && s.strstart - hash_head <= s.w_size - MIN_LOOKAHEAD) {
      /* To simplify the code, we prevent matches with the string
       * of window index 0 (in particular we have to avoid a match
       * of the string with itself at the start of the input file).
       */
      s.match_length = longest_match(s, hash_head);
      /* longest_match() sets match_start */
    }

    if (s.match_length >= MIN_MATCH) {
      // check_match(s, s.strstart, s.match_start, s.match_length); // for debug only

      /*** _tr_tally_dist(s, s.strstart - s.match_start,
                     s.match_length - MIN_MATCH, bflush); ***/
      bflush = trees._tr_tally(s, s.strstart - s.match_start, s.match_length - MIN_MATCH);
      s.lookahead -= s.match_length;
      /* Insert new strings in the hash table only if the match length
       * is not too large. This saves time but degrades compression.
       */

      if (s.match_length <= s.max_lazy_match
      /*max_insert_length*/
      && s.lookahead >= MIN_MATCH) {
        s.match_length--;
        /* string at strstart already in table */

        do {
          s.strstart++;
          /*** INSERT_STRING(s, s.strstart, hash_head); ***/

          s.ins_h = (s.ins_h << s.hash_shift ^ s.window[s.strstart + MIN_MATCH - 1]) & s.hash_mask;
          hash_head = s.prev[s.strstart & s.w_mask] = s.head[s.ins_h];
          s.head[s.ins_h] = s.strstart;
          /***/

          /* strstart never exceeds WSIZE-MAX_MATCH, so there are
           * always MIN_MATCH bytes ahead.
           */
        } while (--s.match_length !== 0);

        s.strstart++;
      } else {
        s.strstart += s.match_length;
        s.match_length = 0;
        s.ins_h = s.window[s.strstart];
        /* UPDATE_HASH(s, s.ins_h, s.window[s.strstart+1]); */

        s.ins_h = (s.ins_h << s.hash_shift ^ s.window[s.strstart + 1]) & s.hash_mask; //#if MIN_MATCH != 3
        //                Call UPDATE_HASH() MIN_MATCH-3 more times
        //#endif

        /* If lookahead < MIN_MATCH, ins_h is garbage, but it does not
         * matter since it will be recomputed at next deflate call.
         */
      }
    } else {
      /* No match, output a literal byte */
      //Tracevv((stderr,"%c", s.window[s.strstart]));

      /*** _tr_tally_lit(s, s.window[s.strstart], bflush); ***/
      bflush = trees._tr_tally(s, 0, s.window[s.strstart]);
      s.lookahead--;
      s.strstart++;
    }

    if (bflush) {
      /*** FLUSH_BLOCK(s, 0); ***/
      flush_block_only(s, false);

      if (s.strm.avail_out === 0) {
        return BS_NEED_MORE;
      }
      /***/

    }
  }

  s.insert = s.strstart < MIN_MATCH - 1 ? s.strstart : MIN_MATCH - 1;

  if (flush === Z_FINISH) {
    /*** FLUSH_BLOCK(s, 1); ***/
    flush_block_only(s, true);

    if (s.strm.avail_out === 0) {
      return BS_FINISH_STARTED;
    }
    /***/


    return BS_FINISH_DONE;
  }

  if (s.last_lit) {
    /*** FLUSH_BLOCK(s, 0); ***/
    flush_block_only(s, false);

    if (s.strm.avail_out === 0) {
      return BS_NEED_MORE;
    }
    /***/

  }

  return BS_BLOCK_DONE;
}
/* ===========================================================================
 * Same as above, but achieves better compression. We use a lazy
 * evaluation for matches: a match is finally adopted only if there is
 * no better match at the next window position.
 */


function deflate_slow(s, flush) {
  var hash_head;
  /* head of hash chain */

  var bflush;
  /* set if current block must be flushed */

  var max_insert;
  /* Process the input block. */

  for (;;) {
    /* Make sure that we always have enough lookahead, except
     * at the end of the input file. We need MAX_MATCH bytes
     * for the next match, plus MIN_MATCH bytes to insert the
     * string following the next match.
     */
    if (s.lookahead < MIN_LOOKAHEAD) {
      fill_window(s);

      if (s.lookahead < MIN_LOOKAHEAD && flush === Z_NO_FLUSH) {
        return BS_NEED_MORE;
      }

      if (s.lookahead === 0) {
        break;
      }
      /* flush the current block */

    }
    /* Insert the string window[strstart .. strstart+2] in the
     * dictionary, and set hash_head to the head of the hash chain:
     */


    hash_head = 0
    /*NIL*/
    ;

    if (s.lookahead >= MIN_MATCH) {
      /*** INSERT_STRING(s, s.strstart, hash_head); ***/
      s.ins_h = (s.ins_h << s.hash_shift ^ s.window[s.strstart + MIN_MATCH - 1]) & s.hash_mask;
      hash_head = s.prev[s.strstart & s.w_mask] = s.head[s.ins_h];
      s.head[s.ins_h] = s.strstart;
      /***/
    }
    /* Find the longest match, discarding those <= prev_length.
     */


    s.prev_length = s.match_length;
    s.prev_match = s.match_start;
    s.match_length = MIN_MATCH - 1;

    if (hash_head !== 0
    /*NIL*/
    && s.prev_length < s.max_lazy_match && s.strstart - hash_head <= s.w_size - MIN_LOOKAHEAD
    /*MAX_DIST(s)*/
    ) {
        /* To simplify the code, we prevent matches with the string
         * of window index 0 (in particular we have to avoid a match
         * of the string with itself at the start of the input file).
         */
        s.match_length = longest_match(s, hash_head);
        /* longest_match() sets match_start */

        if (s.match_length <= 5 && (s.strategy === Z_FILTERED || s.match_length === MIN_MATCH && s.strstart - s.match_start > 4096
        /*TOO_FAR*/
        )) {
          /* If prev_match is also MIN_MATCH, match_start is garbage
           * but we will ignore the current match anyway.
           */
          s.match_length = MIN_MATCH - 1;
        }
      }
    /* If there was a match at the previous step and the current
     * match is not better, output the previous match:
     */


    if (s.prev_length >= MIN_MATCH && s.match_length <= s.prev_length) {
      max_insert = s.strstart + s.lookahead - MIN_MATCH;
      /* Do not insert strings in hash table beyond this. */
      //check_match(s, s.strstart-1, s.prev_match, s.prev_length);

      /***_tr_tally_dist(s, s.strstart - 1 - s.prev_match,
                     s.prev_length - MIN_MATCH, bflush);***/

      bflush = trees._tr_tally(s, s.strstart - 1 - s.prev_match, s.prev_length - MIN_MATCH);
      /* Insert in hash table all strings up to the end of the match.
       * strstart-1 and strstart are already inserted. If there is not
       * enough lookahead, the last two strings are not inserted in
       * the hash table.
       */

      s.lookahead -= s.prev_length - 1;
      s.prev_length -= 2;

      do {
        if (++s.strstart <= max_insert) {
          /*** INSERT_STRING(s, s.strstart, hash_head); ***/
          s.ins_h = (s.ins_h << s.hash_shift ^ s.window[s.strstart + MIN_MATCH - 1]) & s.hash_mask;
          hash_head = s.prev[s.strstart & s.w_mask] = s.head[s.ins_h];
          s.head[s.ins_h] = s.strstart;
          /***/
        }
      } while (--s.prev_length !== 0);

      s.match_available = 0;
      s.match_length = MIN_MATCH - 1;
      s.strstart++;

      if (bflush) {
        /*** FLUSH_BLOCK(s, 0); ***/
        flush_block_only(s, false);

        if (s.strm.avail_out === 0) {
          return BS_NEED_MORE;
        }
        /***/

      }
    } else if (s.match_available) {
      /* If there was no match at the previous position, output a
       * single literal. If there was a match but the current match
       * is longer, truncate the previous match to a single literal.
       */
      //Tracevv((stderr,"%c", s->window[s->strstart-1]));

      /*** _tr_tally_lit(s, s.window[s.strstart-1], bflush); ***/
      bflush = trees._tr_tally(s, 0, s.window[s.strstart - 1]);

      if (bflush) {
        /*** FLUSH_BLOCK_ONLY(s, 0) ***/
        flush_block_only(s, false);
        /***/
      }

      s.strstart++;
      s.lookahead--;

      if (s.strm.avail_out === 0) {
        return BS_NEED_MORE;
      }
    } else {
      /* There is no previous match to compare with, wait for
       * the next step to decide.
       */
      s.match_available = 1;
      s.strstart++;
      s.lookahead--;
    }
  } //Assert (flush != Z_NO_FLUSH, "no flush?");


  if (s.match_available) {
    //Tracevv((stderr,"%c", s->window[s->strstart-1]));

    /*** _tr_tally_lit(s, s.window[s.strstart-1], bflush); ***/
    bflush = trees._tr_tally(s, 0, s.window[s.strstart - 1]);
    s.match_available = 0;
  }

  s.insert = s.strstart < MIN_MATCH - 1 ? s.strstart : MIN_MATCH - 1;

  if (flush === Z_FINISH) {
    /*** FLUSH_BLOCK(s, 1); ***/
    flush_block_only(s, true);

    if (s.strm.avail_out === 0) {
      return BS_FINISH_STARTED;
    }
    /***/


    return BS_FINISH_DONE;
  }

  if (s.last_lit) {
    /*** FLUSH_BLOCK(s, 0); ***/
    flush_block_only(s, false);

    if (s.strm.avail_out === 0) {
      return BS_NEED_MORE;
    }
    /***/

  }

  return BS_BLOCK_DONE;
}
/* ===========================================================================
 * For Z_RLE, simply look for runs of bytes, generate matches only of distance
 * one.  Do not maintain a hash table.  (It will be regenerated if this run of
 * deflate switches away from Z_RLE.)
 */


function deflate_rle(s, flush) {
  var bflush;
  /* set if current block must be flushed */

  var prev;
  /* byte at distance one to match */

  var scan, strend;
  /* scan goes up to strend for length of run */

  var _win = s.window;

  for (;;) {
    /* Make sure that we always have enough lookahead, except
     * at the end of the input file. We need MAX_MATCH bytes
     * for the longest run, plus one for the unrolled loop.
     */
    if (s.lookahead <= MAX_MATCH) {
      fill_window(s);

      if (s.lookahead <= MAX_MATCH && flush === Z_NO_FLUSH) {
        return BS_NEED_MORE;
      }

      if (s.lookahead === 0) {
        break;
      }
      /* flush the current block */

    }
    /* See how many times the previous byte repeats */


    s.match_length = 0;

    if (s.lookahead >= MIN_MATCH && s.strstart > 0) {
      scan = s.strstart - 1;
      prev = _win[scan];

      if (prev === _win[++scan] && prev === _win[++scan] && prev === _win[++scan]) {
        strend = s.strstart + MAX_MATCH;

        do {
          /*jshint noempty:false*/
        } while (prev === _win[++scan] && prev === _win[++scan] && prev === _win[++scan] && prev === _win[++scan] && prev === _win[++scan] && prev === _win[++scan] && prev === _win[++scan] && prev === _win[++scan] && scan < strend);

        s.match_length = MAX_MATCH - (strend - scan);

        if (s.match_length > s.lookahead) {
          s.match_length = s.lookahead;
        }
      } //Assert(scan <= s->window+(uInt)(s->window_size-1), "wild scan");

    }
    /* Emit match if have run of MIN_MATCH or longer, else emit literal */


    if (s.match_length >= MIN_MATCH) {
      //check_match(s, s.strstart, s.strstart - 1, s.match_length);

      /*** _tr_tally_dist(s, 1, s.match_length - MIN_MATCH, bflush); ***/
      bflush = trees._tr_tally(s, 1, s.match_length - MIN_MATCH);
      s.lookahead -= s.match_length;
      s.strstart += s.match_length;
      s.match_length = 0;
    } else {
      /* No match, output a literal byte */
      //Tracevv((stderr,"%c", s->window[s->strstart]));

      /*** _tr_tally_lit(s, s.window[s.strstart], bflush); ***/
      bflush = trees._tr_tally(s, 0, s.window[s.strstart]);
      s.lookahead--;
      s.strstart++;
    }

    if (bflush) {
      /*** FLUSH_BLOCK(s, 0); ***/
      flush_block_only(s, false);

      if (s.strm.avail_out === 0) {
        return BS_NEED_MORE;
      }
      /***/

    }
  }

  s.insert = 0;

  if (flush === Z_FINISH) {
    /*** FLUSH_BLOCK(s, 1); ***/
    flush_block_only(s, true);

    if (s.strm.avail_out === 0) {
      return BS_FINISH_STARTED;
    }
    /***/


    return BS_FINISH_DONE;
  }

  if (s.last_lit) {
    /*** FLUSH_BLOCK(s, 0); ***/
    flush_block_only(s, false);

    if (s.strm.avail_out === 0) {
      return BS_NEED_MORE;
    }
    /***/

  }

  return BS_BLOCK_DONE;
}
/* ===========================================================================
 * For Z_HUFFMAN_ONLY, do not look for matches.  Do not maintain a hash table.
 * (It will be regenerated if this run of deflate switches away from Huffman.)
 */


function deflate_huff(s, flush) {
  var bflush;
  /* set if current block must be flushed */

  for (;;) {
    /* Make sure that we have a literal to write. */
    if (s.lookahead === 0) {
      fill_window(s);

      if (s.lookahead === 0) {
        if (flush === Z_NO_FLUSH) {
          return BS_NEED_MORE;
        }

        break;
        /* flush the current block */
      }
    }
    /* Output a literal byte */


    s.match_length = 0; //Tracevv((stderr,"%c", s->window[s->strstart]));

    /*** _tr_tally_lit(s, s.window[s.strstart], bflush); ***/

    bflush = trees._tr_tally(s, 0, s.window[s.strstart]);
    s.lookahead--;
    s.strstart++;

    if (bflush) {
      /*** FLUSH_BLOCK(s, 0); ***/
      flush_block_only(s, false);

      if (s.strm.avail_out === 0) {
        return BS_NEED_MORE;
      }
      /***/

    }
  }

  s.insert = 0;

  if (flush === Z_FINISH) {
    /*** FLUSH_BLOCK(s, 1); ***/
    flush_block_only(s, true);

    if (s.strm.avail_out === 0) {
      return BS_FINISH_STARTED;
    }
    /***/


    return BS_FINISH_DONE;
  }

  if (s.last_lit) {
    /*** FLUSH_BLOCK(s, 0); ***/
    flush_block_only(s, false);

    if (s.strm.avail_out === 0) {
      return BS_NEED_MORE;
    }
    /***/

  }

  return BS_BLOCK_DONE;
}
/* Values for max_lazy_match, good_match and max_chain_length, depending on
 * the desired pack level (0..9). The values given below have been tuned to
 * exclude worst case performance for pathological files. Better values may be
 * found for specific files.
 */


function Config(good_length, max_lazy, nice_length, max_chain, func) {
  this.good_length = good_length;
  this.max_lazy = max_lazy;
  this.nice_length = nice_length;
  this.max_chain = max_chain;
  this.func = func;
}

var configuration_table;
configuration_table = [
/*      good lazy nice chain */
new Config(0, 0, 0, 0, deflate_stored),
/* 0 store only */
new Config(4, 4, 8, 4, deflate_fast),
/* 1 max speed, no lazy matches */
new Config(4, 5, 16, 8, deflate_fast),
/* 2 */
new Config(4, 6, 32, 32, deflate_fast),
/* 3 */
new Config(4, 4, 16, 16, deflate_slow),
/* 4 lazy matches */
new Config(8, 16, 32, 32, deflate_slow),
/* 5 */
new Config(8, 16, 128, 128, deflate_slow),
/* 6 */
new Config(8, 32, 128, 256, deflate_slow),
/* 7 */
new Config(32, 128, 258, 1024, deflate_slow),
/* 8 */
new Config(32, 258, 258, 4096, deflate_slow)
/* 9 max compression */
];
/* ===========================================================================
 * Initialize the "longest match" routines for a new zlib stream
 */

function lm_init(s) {
  s.window_size = 2 * s.w_size;
  /*** CLEAR_HASH(s); ***/

  zero(s.head); // Fill with NIL (= 0);

  /* Set the default configuration parameters:
   */

  s.max_lazy_match = configuration_table[s.level].max_lazy;
  s.good_match = configuration_table[s.level].good_length;
  s.nice_match = configuration_table[s.level].nice_length;
  s.max_chain_length = configuration_table[s.level].max_chain;
  s.strstart = 0;
  s.block_start = 0;
  s.lookahead = 0;
  s.insert = 0;
  s.match_length = s.prev_length = MIN_MATCH - 1;
  s.match_available = 0;
  s.ins_h = 0;
}

function DeflateState() {
  this.strm = null;
  /* pointer back to this zlib stream */

  this.status = 0;
  /* as the name implies */

  this.pending_buf = null;
  /* output still pending */

  this.pending_buf_size = 0;
  /* size of pending_buf */

  this.pending_out = 0;
  /* next pending byte to output to the stream */

  this.pending = 0;
  /* nb of bytes in the pending buffer */

  this.wrap = 0;
  /* bit 0 true for zlib, bit 1 true for gzip */

  this.gzhead = null;
  /* gzip header information to write */

  this.gzindex = 0;
  /* where in extra, name, or comment */

  this.method = Z_DEFLATED;
  /* can only be DEFLATED */

  this.last_flush = -1;
  /* value of flush param for previous deflate call */

  this.w_size = 0;
  /* LZ77 window size (32K by default) */

  this.w_bits = 0;
  /* log2(w_size)  (8..16) */

  this.w_mask = 0;
  /* w_size - 1 */

  this.window = null;
  /* Sliding window. Input bytes are read into the second half of the window,
   * and move to the first half later to keep a dictionary of at least wSize
   * bytes. With this organization, matches are limited to a distance of
   * wSize-MAX_MATCH bytes, but this ensures that IO is always
   * performed with a length multiple of the block size.
   */

  this.window_size = 0;
  /* Actual size of window: 2*wSize, except when the user input buffer
   * is directly used as sliding window.
   */

  this.prev = null;
  /* Link to older string with same hash index. To limit the size of this
   * array to 64K, this link is maintained only for the last 32K strings.
   * An index in this array is thus a window index modulo 32K.
   */

  this.head = null;
  /* Heads of the hash chains or NIL. */

  this.ins_h = 0;
  /* hash index of string to be inserted */

  this.hash_size = 0;
  /* number of elements in hash table */

  this.hash_bits = 0;
  /* log2(hash_size) */

  this.hash_mask = 0;
  /* hash_size-1 */

  this.hash_shift = 0;
  /* Number of bits by which ins_h must be shifted at each input
   * step. It must be such that after MIN_MATCH steps, the oldest
   * byte no longer takes part in the hash key, that is:
   *   hash_shift * MIN_MATCH >= hash_bits
   */

  this.block_start = 0;
  /* Window position at the beginning of the current output block. Gets
   * negative when the window is moved backwards.
   */

  this.match_length = 0;
  /* length of best match */

  this.prev_match = 0;
  /* previous match */

  this.match_available = 0;
  /* set if previous match exists */

  this.strstart = 0;
  /* start of string to insert */

  this.match_start = 0;
  /* start of matching string */

  this.lookahead = 0;
  /* number of valid bytes ahead in window */

  this.prev_length = 0;
  /* Length of the best match at previous step. Matches not greater than this
   * are discarded. This is used in the lazy match evaluation.
   */

  this.max_chain_length = 0;
  /* To speed up deflation, hash chains are never searched beyond this
   * length.  A higher limit improves compression ratio but degrades the
   * speed.
   */

  this.max_lazy_match = 0;
  /* Attempt to find a better match only when the current match is strictly
   * smaller than this value. This mechanism is used only for compression
   * levels >= 4.
   */
  // That's alias to max_lazy_match, don't use directly
  //this.max_insert_length = 0;

  /* Insert new strings in the hash table only if the match length is not
   * greater than this length. This saves time but degrades compression.
   * max_insert_length is used only for compression levels <= 3.
   */

  this.level = 0;
  /* compression level (1..9) */

  this.strategy = 0;
  /* favor or force Huffman coding*/

  this.good_match = 0;
  /* Use a faster search when the previous match is longer than this */

  this.nice_match = 0;
  /* Stop searching when current match exceeds this */

  /* used by trees.c: */

  /* Didn't use ct_data typedef below to suppress compiler warning */
  // struct ct_data_s dyn_ltree[HEAP_SIZE];   /* literal and length tree */
  // struct ct_data_s dyn_dtree[2*D_CODES+1]; /* distance tree */
  // struct ct_data_s bl_tree[2*BL_CODES+1];  /* Huffman tree for bit lengths */
  // Use flat array of DOUBLE size, with interleaved fata,
  // because JS does not support effective

  this.dyn_ltree = new utils.Buf16(HEAP_SIZE * 2);
  this.dyn_dtree = new utils.Buf16((2 * D_CODES + 1) * 2);
  this.bl_tree = new utils.Buf16((2 * BL_CODES + 1) * 2);
  zero(this.dyn_ltree);
  zero(this.dyn_dtree);
  zero(this.bl_tree);
  this.l_desc = null;
  /* desc. for literal tree */

  this.d_desc = null;
  /* desc. for distance tree */

  this.bl_desc = null;
  /* desc. for bit length tree */
  //ush bl_count[MAX_BITS+1];

  this.bl_count = new utils.Buf16(MAX_BITS + 1);
  /* number of codes at each bit length for an optimal tree */
  //int heap[2*L_CODES+1];      /* heap used to build the Huffman trees */

  this.heap = new utils.Buf16(2 * L_CODES + 1);
  /* heap used to build the Huffman trees */

  zero(this.heap);
  this.heap_len = 0;
  /* number of elements in the heap */

  this.heap_max = 0;
  /* element of largest frequency */

  /* The sons of heap[n] are heap[2*n] and heap[2*n+1]. heap[0] is not used.
   * The same heap array is used to build all trees.
   */

  this.depth = new utils.Buf16(2 * L_CODES + 1); //uch depth[2*L_CODES+1];

  zero(this.depth);
  /* Depth of each subtree used as tie breaker for trees of equal frequency
   */

  this.l_buf = 0;
  /* buffer index for literals or lengths */

  this.lit_bufsize = 0;
  /* Size of match buffer for literals/lengths.  There are 4 reasons for
   * limiting lit_bufsize to 64K:
   *   - frequencies can be kept in 16 bit counters
   *   - if compression is not successful for the first block, all input
   *     data is still in the window so we can still emit a stored block even
   *     when input comes from standard input.  (This can also be done for
   *     all blocks if lit_bufsize is not greater than 32K.)
   *   - if compression is not successful for a file smaller than 64K, we can
   *     even emit a stored file instead of a stored block (saving 5 bytes).
   *     This is applicable only for zip (not gzip or zlib).
   *   - creating new Huffman trees less frequently may not provide fast
   *     adaptation to changes in the input data statistics. (Take for
   *     example a binary file with poorly compressible code followed by
   *     a highly compressible string table.) Smaller buffer sizes give
   *     fast adaptation but have of course the overhead of transmitting
   *     trees more frequently.
   *   - I can't count above 4
   */

  this.last_lit = 0;
  /* running index in l_buf */

  this.d_buf = 0;
  /* Buffer index for distances. To simplify the code, d_buf and l_buf have
   * the same number of elements. To use different lengths, an extra flag
   * array would be necessary.
   */

  this.opt_len = 0;
  /* bit length of current block with optimal trees */

  this.static_len = 0;
  /* bit length of current block with static trees */

  this.matches = 0;
  /* number of string matches in current block */

  this.insert = 0;
  /* bytes at end of window left to insert */

  this.bi_buf = 0;
  /* Output buffer. bits are inserted starting at the bottom (least
   * significant bits).
   */

  this.bi_valid = 0;
  /* Number of valid bits in bi_buf.  All bits above the last valid bit
   * are always zero.
   */
  // Used for window memory init. We safely ignore it for JS. That makes
  // sense only for pointers and memory check tools.
  //this.high_water = 0;

  /* High water mark offset in window for initialized bytes -- bytes above
   * this are set to zero in order to avoid memory check warnings when
   * longest match routines access bytes past the input.  This is then
   * updated to the new high water mark.
   */
}

function deflateResetKeep(strm) {
  var s;

  if (!strm || !strm.state) {
    return err(strm, Z_STREAM_ERROR);
  }

  strm.total_in = strm.total_out = 0;
  strm.data_type = Z_UNKNOWN;
  s = strm.state;
  s.pending = 0;
  s.pending_out = 0;

  if (s.wrap < 0) {
    s.wrap = -s.wrap;
    /* was made negative by deflate(..., Z_FINISH); */
  }

  s.status = s.wrap ? INIT_STATE : BUSY_STATE;
  strm.adler = s.wrap === 2 ? 0 // crc32(0, Z_NULL, 0)
  : 1; // adler32(0, Z_NULL, 0)

  s.last_flush = Z_NO_FLUSH;

  trees._tr_init(s);

  return Z_OK;
}

function deflateReset(strm) {
  var ret = deflateResetKeep(strm);

  if (ret === Z_OK) {
    lm_init(strm.state);
  }

  return ret;
}

function deflateSetHeader(strm, head) {
  if (!strm || !strm.state) {
    return Z_STREAM_ERROR;
  }

  if (strm.state.wrap !== 2) {
    return Z_STREAM_ERROR;
  }

  strm.state.gzhead = head;
  return Z_OK;
}

function deflateInit2(strm, level, method, windowBits, memLevel, strategy) {
  if (!strm) {
    // === Z_NULL
    return Z_STREAM_ERROR;
  }

  var wrap = 1;

  if (level === Z_DEFAULT_COMPRESSION) {
    level = 6;
  }

  if (windowBits < 0) {
    /* suppress zlib wrapper */
    wrap = 0;
    windowBits = -windowBits;
  } else if (windowBits > 15) {
    wrap = 2;
    /* write gzip wrapper instead */

    windowBits -= 16;
  }

  if (memLevel < 1 || memLevel > MAX_MEM_LEVEL || method !== Z_DEFLATED || windowBits < 8 || windowBits > 15 || level < 0 || level > 9 || strategy < 0 || strategy > Z_FIXED) {
    return err(strm, Z_STREAM_ERROR);
  }

  if (windowBits === 8) {
    windowBits = 9;
  }
  /* until 256-byte window bug fixed */


  var s = new DeflateState();
  strm.state = s;
  s.strm = strm;
  s.wrap = wrap;
  s.gzhead = null;
  s.w_bits = windowBits;
  s.w_size = 1 << s.w_bits;
  s.w_mask = s.w_size - 1;
  s.hash_bits = memLevel + 7;
  s.hash_size = 1 << s.hash_bits;
  s.hash_mask = s.hash_size - 1;
  s.hash_shift = ~~((s.hash_bits + MIN_MATCH - 1) / MIN_MATCH);
  s.window = new utils.Buf8(s.w_size * 2);
  s.head = new utils.Buf16(s.hash_size);
  s.prev = new utils.Buf16(s.w_size); // Don't need mem init magic for JS.
  //s.high_water = 0;  /* nothing written to s->window yet */

  s.lit_bufsize = 1 << memLevel + 6;
  /* 16K elements by default */

  s.pending_buf_size = s.lit_bufsize * 4; //overlay = (ushf *) ZALLOC(strm, s->lit_bufsize, sizeof(ush)+2);
  //s->pending_buf = (uchf *) overlay;

  s.pending_buf = new utils.Buf8(s.pending_buf_size); // It is offset from `s.pending_buf` (size is `s.lit_bufsize * 2`)
  //s->d_buf = overlay + s->lit_bufsize/sizeof(ush);

  s.d_buf = 1 * s.lit_bufsize; //s->l_buf = s->pending_buf + (1+sizeof(ush))*s->lit_bufsize;

  s.l_buf = (1 + 2) * s.lit_bufsize;
  s.level = level;
  s.strategy = strategy;
  s.method = method;
  return deflateReset(strm);
}

function deflateInit(strm, level) {
  return deflateInit2(strm, level, Z_DEFLATED, MAX_WBITS, DEF_MEM_LEVEL, Z_DEFAULT_STRATEGY);
}

function deflate(strm, flush) {
  var old_flush, s;
  var beg, val; // for gzip header write only

  if (!strm || !strm.state || flush > Z_BLOCK || flush < 0) {
    return strm ? err(strm, Z_STREAM_ERROR) : Z_STREAM_ERROR;
  }

  s = strm.state;

  if (!strm.output || !strm.input && strm.avail_in !== 0 || s.status === FINISH_STATE && flush !== Z_FINISH) {
    return err(strm, strm.avail_out === 0 ? Z_BUF_ERROR : Z_STREAM_ERROR);
  }

  s.strm = strm;
  /* just in case */

  old_flush = s.last_flush;
  s.last_flush = flush;
  /* Write the header */

  if (s.status === INIT_STATE) {
    if (s.wrap === 2) {
      // GZIP header
      strm.adler = 0; //crc32(0L, Z_NULL, 0);

      put_byte(s, 31);
      put_byte(s, 139);
      put_byte(s, 8);

      if (!s.gzhead) {
        // s->gzhead == Z_NULL
        put_byte(s, 0);
        put_byte(s, 0);
        put_byte(s, 0);
        put_byte(s, 0);
        put_byte(s, 0);
        put_byte(s, s.level === 9 ? 2 : s.strategy >= Z_HUFFMAN_ONLY || s.level < 2 ? 4 : 0);
        put_byte(s, OS_CODE);
        s.status = BUSY_STATE;
      } else {
        put_byte(s, (s.gzhead.text ? 1 : 0) + (s.gzhead.hcrc ? 2 : 0) + (!s.gzhead.extra ? 0 : 4) + (!s.gzhead.name ? 0 : 8) + (!s.gzhead.comment ? 0 : 16));
        put_byte(s, s.gzhead.time & 0xff);
        put_byte(s, s.gzhead.time >> 8 & 0xff);
        put_byte(s, s.gzhead.time >> 16 & 0xff);
        put_byte(s, s.gzhead.time >> 24 & 0xff);
        put_byte(s, s.level === 9 ? 2 : s.strategy >= Z_HUFFMAN_ONLY || s.level < 2 ? 4 : 0);
        put_byte(s, s.gzhead.os & 0xff);

        if (s.gzhead.extra && s.gzhead.extra.length) {
          put_byte(s, s.gzhead.extra.length & 0xff);
          put_byte(s, s.gzhead.extra.length >> 8 & 0xff);
        }

        if (s.gzhead.hcrc) {
          strm.adler = crc32(strm.adler, s.pending_buf, s.pending, 0);
        }

        s.gzindex = 0;
        s.status = EXTRA_STATE;
      }
    } else // DEFLATE header
      {
        var header = Z_DEFLATED + (s.w_bits - 8 << 4) << 8;
        var level_flags = -1;

        if (s.strategy >= Z_HUFFMAN_ONLY || s.level < 2) {
          level_flags = 0;
        } else if (s.level < 6) {
          level_flags = 1;
        } else if (s.level === 6) {
          level_flags = 2;
        } else {
          level_flags = 3;
        }

        header |= level_flags << 6;

        if (s.strstart !== 0) {
          header |= PRESET_DICT;
        }

        header += 31 - header % 31;
        s.status = BUSY_STATE;
        putShortMSB(s, header);
        /* Save the adler32 of the preset dictionary: */

        if (s.strstart !== 0) {
          putShortMSB(s, strm.adler >>> 16);
          putShortMSB(s, strm.adler & 0xffff);
        }

        strm.adler = 1; // adler32(0L, Z_NULL, 0);
      }
  } //#ifdef GZIP


  if (s.status === EXTRA_STATE) {
    if (s.gzhead.extra
    /* != Z_NULL*/
    ) {
        beg = s.pending;
        /* start of bytes to update crc */

        while (s.gzindex < (s.gzhead.extra.length & 0xffff)) {
          if (s.pending === s.pending_buf_size) {
            if (s.gzhead.hcrc && s.pending > beg) {
              strm.adler = crc32(strm.adler, s.pending_buf, s.pending - beg, beg);
            }

            flush_pending(strm);
            beg = s.pending;

            if (s.pending === s.pending_buf_size) {
              break;
            }
          }

          put_byte(s, s.gzhead.extra[s.gzindex] & 0xff);
          s.gzindex++;
        }

        if (s.gzhead.hcrc && s.pending > beg) {
          strm.adler = crc32(strm.adler, s.pending_buf, s.pending - beg, beg);
        }

        if (s.gzindex === s.gzhead.extra.length) {
          s.gzindex = 0;
          s.status = NAME_STATE;
        }
      } else {
      s.status = NAME_STATE;
    }
  }

  if (s.status === NAME_STATE) {
    if (s.gzhead.name
    /* != Z_NULL*/
    ) {
        beg = s.pending;
        /* start of bytes to update crc */
        //int val;

        do {
          if (s.pending === s.pending_buf_size) {
            if (s.gzhead.hcrc && s.pending > beg) {
              strm.adler = crc32(strm.adler, s.pending_buf, s.pending - beg, beg);
            }

            flush_pending(strm);
            beg = s.pending;

            if (s.pending === s.pending_buf_size) {
              val = 1;
              break;
            }
          } // JS specific: little magic to add zero terminator to end of string


          if (s.gzindex < s.gzhead.name.length) {
            val = s.gzhead.name.charCodeAt(s.gzindex++) & 0xff;
          } else {
            val = 0;
          }

          put_byte(s, val);
        } while (val !== 0);

        if (s.gzhead.hcrc && s.pending > beg) {
          strm.adler = crc32(strm.adler, s.pending_buf, s.pending - beg, beg);
        }

        if (val === 0) {
          s.gzindex = 0;
          s.status = COMMENT_STATE;
        }
      } else {
      s.status = COMMENT_STATE;
    }
  }

  if (s.status === COMMENT_STATE) {
    if (s.gzhead.comment
    /* != Z_NULL*/
    ) {
        beg = s.pending;
        /* start of bytes to update crc */
        //int val;

        do {
          if (s.pending === s.pending_buf_size) {
            if (s.gzhead.hcrc && s.pending > beg) {
              strm.adler = crc32(strm.adler, s.pending_buf, s.pending - beg, beg);
            }

            flush_pending(strm);
            beg = s.pending;

            if (s.pending === s.pending_buf_size) {
              val = 1;
              break;
            }
          } // JS specific: little magic to add zero terminator to end of string


          if (s.gzindex < s.gzhead.comment.length) {
            val = s.gzhead.comment.charCodeAt(s.gzindex++) & 0xff;
          } else {
            val = 0;
          }

          put_byte(s, val);
        } while (val !== 0);

        if (s.gzhead.hcrc && s.pending > beg) {
          strm.adler = crc32(strm.adler, s.pending_buf, s.pending - beg, beg);
        }

        if (val === 0) {
          s.status = HCRC_STATE;
        }
      } else {
      s.status = HCRC_STATE;
    }
  }

  if (s.status === HCRC_STATE) {
    if (s.gzhead.hcrc) {
      if (s.pending + 2 > s.pending_buf_size) {
        flush_pending(strm);
      }

      if (s.pending + 2 <= s.pending_buf_size) {
        put_byte(s, strm.adler & 0xff);
        put_byte(s, strm.adler >> 8 & 0xff);
        strm.adler = 0; //crc32(0L, Z_NULL, 0);

        s.status = BUSY_STATE;
      }
    } else {
      s.status = BUSY_STATE;
    }
  } //#endif

  /* Flush as much pending output as possible */


  if (s.pending !== 0) {
    flush_pending(strm);

    if (strm.avail_out === 0) {
      /* Since avail_out is 0, deflate will be called again with
       * more output space, but possibly with both pending and
       * avail_in equal to zero. There won't be anything to do,
       * but this is not an error situation so make sure we
       * return OK instead of BUF_ERROR at next call of deflate:
       */
      s.last_flush = -1;
      return Z_OK;
    }
    /* Make sure there is something to do and avoid duplicate consecutive
     * flushes. For repeated and useless calls with Z_FINISH, we keep
     * returning Z_STREAM_END instead of Z_BUF_ERROR.
     */

  } else if (strm.avail_in === 0 && rank(flush) <= rank(old_flush) && flush !== Z_FINISH) {
    return err(strm, Z_BUF_ERROR);
  }
  /* User must not provide more input after the first FINISH: */


  if (s.status === FINISH_STATE && strm.avail_in !== 0) {
    return err(strm, Z_BUF_ERROR);
  }
  /* Start a new block or continue the current one.
   */


  if (strm.avail_in !== 0 || s.lookahead !== 0 || flush !== Z_NO_FLUSH && s.status !== FINISH_STATE) {
    var bstate = s.strategy === Z_HUFFMAN_ONLY ? deflate_huff(s, flush) : s.strategy === Z_RLE ? deflate_rle(s, flush) : configuration_table[s.level].func(s, flush);

    if (bstate === BS_FINISH_STARTED || bstate === BS_FINISH_DONE) {
      s.status = FINISH_STATE;
    }

    if (bstate === BS_NEED_MORE || bstate === BS_FINISH_STARTED) {
      if (strm.avail_out === 0) {
        s.last_flush = -1;
        /* avoid BUF_ERROR next call, see above */
      }

      return Z_OK;
      /* If flush != Z_NO_FLUSH && avail_out == 0, the next call
       * of deflate should use the same flush parameter to make sure
       * that the flush is complete. So we don't have to output an
       * empty block here, this will be done at next call. This also
       * ensures that for a very small output buffer, we emit at most
       * one empty block.
       */
    }

    if (bstate === BS_BLOCK_DONE) {
      if (flush === Z_PARTIAL_FLUSH) {
        trees._tr_align(s);
      } else if (flush !== Z_BLOCK) {
        /* FULL_FLUSH or SYNC_FLUSH */
        trees._tr_stored_block(s, 0, 0, false);
        /* For a full flush, this empty block will be recognized
         * as a special marker by inflate_sync().
         */


        if (flush === Z_FULL_FLUSH) {
          /*** CLEAR_HASH(s); ***/

          /* forget history */
          zero(s.head); // Fill with NIL (= 0);

          if (s.lookahead === 0) {
            s.strstart = 0;
            s.block_start = 0;
            s.insert = 0;
          }
        }
      }

      flush_pending(strm);

      if (strm.avail_out === 0) {
        s.last_flush = -1;
        /* avoid BUF_ERROR at next call, see above */

        return Z_OK;
      }
    }
  } //Assert(strm->avail_out > 0, "bug2");
  //if (strm.avail_out <= 0) { throw new Error("bug2");}


  if (flush !== Z_FINISH) {
    return Z_OK;
  }

  if (s.wrap <= 0) {
    return Z_STREAM_END;
  }
  /* Write the trailer */


  if (s.wrap === 2) {
    put_byte(s, strm.adler & 0xff);
    put_byte(s, strm.adler >> 8 & 0xff);
    put_byte(s, strm.adler >> 16 & 0xff);
    put_byte(s, strm.adler >> 24 & 0xff);
    put_byte(s, strm.total_in & 0xff);
    put_byte(s, strm.total_in >> 8 & 0xff);
    put_byte(s, strm.total_in >> 16 & 0xff);
    put_byte(s, strm.total_in >> 24 & 0xff);
  } else {
    putShortMSB(s, strm.adler >>> 16);
    putShortMSB(s, strm.adler & 0xffff);
  }

  flush_pending(strm);
  /* If avail_out is zero, the application will call deflate again
   * to flush the rest.
   */

  if (s.wrap > 0) {
    s.wrap = -s.wrap;
  }
  /* write the trailer only once! */


  return s.pending !== 0 ? Z_OK : Z_STREAM_END;
}

function deflateEnd(strm) {
  var status;

  if (!strm
  /*== Z_NULL*/
  || !strm.state
  /*== Z_NULL*/
  ) {
      return Z_STREAM_ERROR;
    }

  status = strm.state.status;

  if (status !== INIT_STATE && status !== EXTRA_STATE && status !== NAME_STATE && status !== COMMENT_STATE && status !== HCRC_STATE && status !== BUSY_STATE && status !== FINISH_STATE) {
    return err(strm, Z_STREAM_ERROR);
  }

  strm.state = null;
  return status === BUSY_STATE ? err(strm, Z_DATA_ERROR) : Z_OK;
}
/* =========================================================================
 * Initializes the compression dictionary from the given byte
 * sequence without producing any compressed output.
 */


function deflateSetDictionary(strm, dictionary) {
  var dictLength = dictionary.length;
  var s;
  var str, n;
  var wrap;
  var avail;
  var next;
  var input;
  var tmpDict;

  if (!strm
  /*== Z_NULL*/
  || !strm.state
  /*== Z_NULL*/
  ) {
      return Z_STREAM_ERROR;
    }

  s = strm.state;
  wrap = s.wrap;

  if (wrap === 2 || wrap === 1 && s.status !== INIT_STATE || s.lookahead) {
    return Z_STREAM_ERROR;
  }
  /* when using zlib wrappers, compute Adler-32 for provided dictionary */


  if (wrap === 1) {
    /* adler32(strm->adler, dictionary, dictLength); */
    strm.adler = adler32(strm.adler, dictionary, dictLength, 0);
  }

  s.wrap = 0;
  /* avoid computing Adler-32 in read_buf */

  /* if dictionary would fill window, just replace the history */

  if (dictLength >= s.w_size) {
    if (wrap === 0) {
      /* already empty otherwise */

      /*** CLEAR_HASH(s); ***/
      zero(s.head); // Fill with NIL (= 0);

      s.strstart = 0;
      s.block_start = 0;
      s.insert = 0;
    }
    /* use the tail */
    // dictionary = dictionary.slice(dictLength - s.w_size);


    tmpDict = new utils.Buf8(s.w_size);
    utils.arraySet(tmpDict, dictionary, dictLength - s.w_size, s.w_size, 0);
    dictionary = tmpDict;
    dictLength = s.w_size;
  }
  /* insert dictionary into window and hash */


  avail = strm.avail_in;
  next = strm.next_in;
  input = strm.input;
  strm.avail_in = dictLength;
  strm.next_in = 0;
  strm.input = dictionary;
  fill_window(s);

  while (s.lookahead >= MIN_MATCH) {
    str = s.strstart;
    n = s.lookahead - (MIN_MATCH - 1);

    do {
      /* UPDATE_HASH(s, s->ins_h, s->window[str + MIN_MATCH-1]); */
      s.ins_h = (s.ins_h << s.hash_shift ^ s.window[str + MIN_MATCH - 1]) & s.hash_mask;
      s.prev[str & s.w_mask] = s.head[s.ins_h];
      s.head[s.ins_h] = str;
      str++;
    } while (--n);

    s.strstart = str;
    s.lookahead = MIN_MATCH - 1;
    fill_window(s);
  }

  s.strstart += s.lookahead;
  s.block_start = s.strstart;
  s.insert = s.lookahead;
  s.lookahead = 0;
  s.match_length = s.prev_length = MIN_MATCH - 1;
  s.match_available = 0;
  strm.next_in = next;
  strm.input = input;
  strm.avail_in = avail;
  s.wrap = wrap;
  return Z_OK;
}

exports.deflateInit = deflateInit;
exports.deflateInit2 = deflateInit2;
exports.deflateReset = deflateReset;
exports.deflateResetKeep = deflateResetKeep;
exports.deflateSetHeader = deflateSetHeader;
exports.deflate = deflate;
exports.deflateEnd = deflateEnd;
exports.deflateSetDictionary = deflateSetDictionary;
exports.deflateInfo = 'pako deflate (from Nodeca project)';
/* Not implemented
exports.deflateBound = deflateBound;
exports.deflateCopy = deflateCopy;
exports.deflateParams = deflateParams;
exports.deflatePending = deflatePending;
exports.deflatePrime = deflatePrime;
exports.deflateTune = deflateTune;
*/

/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
 // (C) 1995-2013 Jean-loup Gailly and Mark Adler
// (C) 2014-2017 Vitaly Puzrin and Andrey Tupitsin
//
// This software is provided 'as-is', without any express or implied
// warranty. In no event will the authors be held liable for any damages
// arising from the use of this software.
//
// Permission is granted to anyone to use this software for any purpose,
// including commercial applications, and to alter it and redistribute it
// freely, subject to the following restrictions:
//
// 1. The origin of this software must not be misrepresented; you must not
//   claim that you wrote the original software. If you use this software
//   in a product, an acknowledgment in the product documentation would be
//   appreciated but is not required.
// 2. Altered source versions must be plainly marked as such, and must not be
//   misrepresented as being the original software.
// 3. This notice may not be removed or altered from any source distribution.

/* eslint-disable space-unary-ops */

var utils = __webpack_require__(16);
/* Public constants ==========================================================*/

/* ===========================================================================*/
//var Z_FILTERED          = 1;
//var Z_HUFFMAN_ONLY      = 2;
//var Z_RLE               = 3;


var Z_FIXED = 4; //var Z_DEFAULT_STRATEGY  = 0;

/* Possible values of the data_type field (though see inflate()) */

var Z_BINARY = 0;
var Z_TEXT = 1; //var Z_ASCII             = 1; // = Z_TEXT

var Z_UNKNOWN = 2;
/*============================================================================*/

function zero(buf) {
  var len = buf.length;

  while (--len >= 0) {
    buf[len] = 0;
  }
} // From zutil.h


var STORED_BLOCK = 0;
var STATIC_TREES = 1;
var DYN_TREES = 2;
/* The three kinds of block type */

var MIN_MATCH = 3;
var MAX_MATCH = 258;
/* The minimum and maximum match lengths */
// From deflate.h

/* ===========================================================================
 * Internal compression state.
 */

var LENGTH_CODES = 29;
/* number of length codes, not counting the special END_BLOCK code */

var LITERALS = 256;
/* number of literal bytes 0..255 */

var L_CODES = LITERALS + 1 + LENGTH_CODES;
/* number of Literal or Length codes, including the END_BLOCK code */

var D_CODES = 30;
/* number of distance codes */

var BL_CODES = 19;
/* number of codes used to transfer the bit lengths */

var HEAP_SIZE = 2 * L_CODES + 1;
/* maximum heap size */

var MAX_BITS = 15;
/* All codes must not exceed MAX_BITS bits */

var Buf_size = 16;
/* size of bit buffer in bi_buf */

/* ===========================================================================
 * Constants
 */

var MAX_BL_BITS = 7;
/* Bit length codes must not exceed MAX_BL_BITS bits */

var END_BLOCK = 256;
/* end of block literal code */

var REP_3_6 = 16;
/* repeat previous bit length 3-6 times (2 bits of repeat count) */

var REPZ_3_10 = 17;
/* repeat a zero length 3-10 times  (3 bits of repeat count) */

var REPZ_11_138 = 18;
/* repeat a zero length 11-138 times  (7 bits of repeat count) */

/* eslint-disable comma-spacing,array-bracket-spacing */

var extra_lbits =
/* extra bits for each length code */
[0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 5, 0];
var extra_dbits =
/* extra bits for each distance code */
[0, 0, 0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10, 10, 11, 11, 12, 12, 13, 13];
var extra_blbits =
/* extra bits for each bit length code */
[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 3, 7];
var bl_order = [16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15];
/* eslint-enable comma-spacing,array-bracket-spacing */

/* The lengths of the bit length codes are sent in order of decreasing
 * probability, to avoid transmitting the lengths for unused bit length codes.
 */

/* ===========================================================================
 * Local data. These are initialized only once.
 */
// We pre-fill arrays with 0 to avoid uninitialized gaps

var DIST_CODE_LEN = 512;
/* see definition of array dist_code below */
// !!!! Use flat array instead of structure, Freq = i*2, Len = i*2+1

var static_ltree = new Array((L_CODES + 2) * 2);
zero(static_ltree);
/* The static literal tree. Since the bit lengths are imposed, there is no
 * need for the L_CODES extra codes used during heap construction. However
 * The codes 286 and 287 are needed to build a canonical tree (see _tr_init
 * below).
 */

var static_dtree = new Array(D_CODES * 2);
zero(static_dtree);
/* The static distance tree. (Actually a trivial tree since all codes use
 * 5 bits.)
 */

var _dist_code = new Array(DIST_CODE_LEN);

zero(_dist_code);
/* Distance codes. The first 256 values correspond to the distances
 * 3 .. 258, the last 256 values correspond to the top 8 bits of
 * the 15 bit distances.
 */

var _length_code = new Array(MAX_MATCH - MIN_MATCH + 1);

zero(_length_code);
/* length code for each normalized match length (0 == MIN_MATCH) */

var base_length = new Array(LENGTH_CODES);
zero(base_length);
/* First normalized length for each code (0 = MIN_MATCH) */

var base_dist = new Array(D_CODES);
zero(base_dist);
/* First normalized distance for each code (0 = distance of 1) */

function StaticTreeDesc(static_tree, extra_bits, extra_base, elems, max_length) {
  this.static_tree = static_tree;
  /* static tree or NULL */

  this.extra_bits = extra_bits;
  /* extra bits for each code or NULL */

  this.extra_base = extra_base;
  /* base index for extra_bits */

  this.elems = elems;
  /* max number of elements in the tree */

  this.max_length = max_length;
  /* max bit length for the codes */
  // show if `static_tree` has data or dummy - needed for monomorphic objects

  this.has_stree = static_tree && static_tree.length;
}

var static_l_desc;
var static_d_desc;
var static_bl_desc;

function TreeDesc(dyn_tree, stat_desc) {
  this.dyn_tree = dyn_tree;
  /* the dynamic tree */

  this.max_code = 0;
  /* largest code with non zero frequency */

  this.stat_desc = stat_desc;
  /* the corresponding static tree */
}

function d_code(dist) {
  return dist < 256 ? _dist_code[dist] : _dist_code[256 + (dist >>> 7)];
}
/* ===========================================================================
 * Output a short LSB first on the stream.
 * IN assertion: there is enough room in pendingBuf.
 */


function put_short(s, w) {
  //    put_byte(s, (uch)((w) & 0xff));
  //    put_byte(s, (uch)((ush)(w) >> 8));
  s.pending_buf[s.pending++] = w & 0xff;
  s.pending_buf[s.pending++] = w >>> 8 & 0xff;
}
/* ===========================================================================
 * Send a value on a given number of bits.
 * IN assertion: length <= 16 and value fits in length bits.
 */


function send_bits(s, value, length) {
  if (s.bi_valid > Buf_size - length) {
    s.bi_buf |= value << s.bi_valid & 0xffff;
    put_short(s, s.bi_buf);
    s.bi_buf = value >> Buf_size - s.bi_valid;
    s.bi_valid += length - Buf_size;
  } else {
    s.bi_buf |= value << s.bi_valid & 0xffff;
    s.bi_valid += length;
  }
}

function send_code(s, c, tree) {
  send_bits(s, tree[c * 2]
  /*.Code*/
  , tree[c * 2 + 1]
  /*.Len*/
  );
}
/* ===========================================================================
 * Reverse the first len bits of a code, using straightforward code (a faster
 * method would use a table)
 * IN assertion: 1 <= len <= 15
 */


function bi_reverse(code, len) {
  var res = 0;

  do {
    res |= code & 1;
    code >>>= 1;
    res <<= 1;
  } while (--len > 0);

  return res >>> 1;
}
/* ===========================================================================
 * Flush the bit buffer, keeping at most 7 bits in it.
 */


function bi_flush(s) {
  if (s.bi_valid === 16) {
    put_short(s, s.bi_buf);
    s.bi_buf = 0;
    s.bi_valid = 0;
  } else if (s.bi_valid >= 8) {
    s.pending_buf[s.pending++] = s.bi_buf & 0xff;
    s.bi_buf >>= 8;
    s.bi_valid -= 8;
  }
}
/* ===========================================================================
 * Compute the optimal bit lengths for a tree and update the total bit length
 * for the current block.
 * IN assertion: the fields freq and dad are set, heap[heap_max] and
 *    above are the tree nodes sorted by increasing frequency.
 * OUT assertions: the field len is set to the optimal bit length, the
 *     array bl_count contains the frequencies for each bit length.
 *     The length opt_len is updated; static_len is also updated if stree is
 *     not null.
 */


function gen_bitlen(s, desc) //    deflate_state *s;
//    tree_desc *desc;    /* the tree descriptor */
{
  var tree = desc.dyn_tree;
  var max_code = desc.max_code;
  var stree = desc.stat_desc.static_tree;
  var has_stree = desc.stat_desc.has_stree;
  var extra = desc.stat_desc.extra_bits;
  var base = desc.stat_desc.extra_base;
  var max_length = desc.stat_desc.max_length;
  var h;
  /* heap index */

  var n, m;
  /* iterate over the tree elements */

  var bits;
  /* bit length */

  var xbits;
  /* extra bits */

  var f;
  /* frequency */

  var overflow = 0;
  /* number of elements with bit length too large */

  for (bits = 0; bits <= MAX_BITS; bits++) {
    s.bl_count[bits] = 0;
  }
  /* In a first pass, compute the optimal bit lengths (which may
   * overflow in the case of the bit length tree).
   */


  tree[s.heap[s.heap_max] * 2 + 1]
  /*.Len*/
  = 0;
  /* root of the heap */

  for (h = s.heap_max + 1; h < HEAP_SIZE; h++) {
    n = s.heap[h];
    bits = tree[tree[n * 2 + 1]
    /*.Dad*/
    * 2 + 1]
    /*.Len*/
    + 1;

    if (bits > max_length) {
      bits = max_length;
      overflow++;
    }

    tree[n * 2 + 1]
    /*.Len*/
    = bits;
    /* We overwrite tree[n].Dad which is no longer needed */

    if (n > max_code) {
      continue;
    }
    /* not a leaf node */


    s.bl_count[bits]++;
    xbits = 0;

    if (n >= base) {
      xbits = extra[n - base];
    }

    f = tree[n * 2]
    /*.Freq*/
    ;
    s.opt_len += f * (bits + xbits);

    if (has_stree) {
      s.static_len += f * (stree[n * 2 + 1]
      /*.Len*/
      + xbits);
    }
  }

  if (overflow === 0) {
    return;
  } // Trace((stderr,"\nbit length overflow\n"));

  /* This happens for example on obj2 and pic of the Calgary corpus */

  /* Find the first bit length which could increase: */


  do {
    bits = max_length - 1;

    while (s.bl_count[bits] === 0) {
      bits--;
    }

    s.bl_count[bits]--;
    /* move one leaf down the tree */

    s.bl_count[bits + 1] += 2;
    /* move one overflow item as its brother */

    s.bl_count[max_length]--;
    /* The brother of the overflow item also moves one step up,
     * but this does not affect bl_count[max_length]
     */

    overflow -= 2;
  } while (overflow > 0);
  /* Now recompute all bit lengths, scanning in increasing frequency.
   * h is still equal to HEAP_SIZE. (It is simpler to reconstruct all
   * lengths instead of fixing only the wrong ones. This idea is taken
   * from 'ar' written by Haruhiko Okumura.)
   */


  for (bits = max_length; bits !== 0; bits--) {
    n = s.bl_count[bits];

    while (n !== 0) {
      m = s.heap[--h];

      if (m > max_code) {
        continue;
      }

      if (tree[m * 2 + 1]
      /*.Len*/
      !== bits) {
        // Trace((stderr,"code %d bits %d->%d\n", m, tree[m].Len, bits));
        s.opt_len += (bits - tree[m * 2 + 1]
        /*.Len*/
        ) * tree[m * 2]
        /*.Freq*/
        ;
        tree[m * 2 + 1]
        /*.Len*/
        = bits;
      }

      n--;
    }
  }
}
/* ===========================================================================
 * Generate the codes for a given tree and bit counts (which need not be
 * optimal).
 * IN assertion: the array bl_count contains the bit length statistics for
 * the given tree and the field len is set for all tree elements.
 * OUT assertion: the field code is set for all tree elements of non
 *     zero code length.
 */


function gen_codes(tree, max_code, bl_count) //    ct_data *tree;             /* the tree to decorate */
//    int max_code;              /* largest code with non zero frequency */
//    ushf *bl_count;            /* number of codes at each bit length */
{
  var next_code = new Array(MAX_BITS + 1);
  /* next code value for each bit length */

  var code = 0;
  /* running code value */

  var bits;
  /* bit index */

  var n;
  /* code index */

  /* The distribution counts are first used to generate the code values
   * without bit reversal.
   */

  for (bits = 1; bits <= MAX_BITS; bits++) {
    next_code[bits] = code = code + bl_count[bits - 1] << 1;
  }
  /* Check that the bit counts in bl_count are consistent. The last code
   * must be all ones.
   */
  //Assert (code + bl_count[MAX_BITS]-1 == (1<<MAX_BITS)-1,
  //        "inconsistent bit counts");
  //Tracev((stderr,"\ngen_codes: max_code %d ", max_code));


  for (n = 0; n <= max_code; n++) {
    var len = tree[n * 2 + 1]
    /*.Len*/
    ;

    if (len === 0) {
      continue;
    }
    /* Now reverse the bits */


    tree[n * 2]
    /*.Code*/
    = bi_reverse(next_code[len]++, len); //Tracecv(tree != static_ltree, (stderr,"\nn %3d %c l %2d c %4x (%x) ",
    //     n, (isgraph(n) ? n : ' '), len, tree[n].Code, next_code[len]-1));
  }
}
/* ===========================================================================
 * Initialize the various 'constant' tables.
 */


function tr_static_init() {
  var n;
  /* iterates over tree elements */

  var bits;
  /* bit counter */

  var length;
  /* length value */

  var code;
  /* code value */

  var dist;
  /* distance index */

  var bl_count = new Array(MAX_BITS + 1);
  /* number of codes at each bit length for an optimal tree */
  // do check in _tr_init()
  //if (static_init_done) return;

  /* For some embedded targets, global variables are not initialized: */

  /*#ifdef NO_INIT_GLOBAL_POINTERS
    static_l_desc.static_tree = static_ltree;
    static_l_desc.extra_bits = extra_lbits;
    static_d_desc.static_tree = static_dtree;
    static_d_desc.extra_bits = extra_dbits;
    static_bl_desc.extra_bits = extra_blbits;
  #endif*/

  /* Initialize the mapping length (0..255) -> length code (0..28) */

  length = 0;

  for (code = 0; code < LENGTH_CODES - 1; code++) {
    base_length[code] = length;

    for (n = 0; n < 1 << extra_lbits[code]; n++) {
      _length_code[length++] = code;
    }
  } //Assert (length == 256, "tr_static_init: length != 256");

  /* Note that the length 255 (match length 258) can be represented
   * in two different ways: code 284 + 5 bits or code 285, so we
   * overwrite length_code[255] to use the best encoding:
   */


  _length_code[length - 1] = code;
  /* Initialize the mapping dist (0..32K) -> dist code (0..29) */

  dist = 0;

  for (code = 0; code < 16; code++) {
    base_dist[code] = dist;

    for (n = 0; n < 1 << extra_dbits[code]; n++) {
      _dist_code[dist++] = code;
    }
  } //Assert (dist == 256, "tr_static_init: dist != 256");


  dist >>= 7;
  /* from now on, all distances are divided by 128 */

  for (; code < D_CODES; code++) {
    base_dist[code] = dist << 7;

    for (n = 0; n < 1 << extra_dbits[code] - 7; n++) {
      _dist_code[256 + dist++] = code;
    }
  } //Assert (dist == 256, "tr_static_init: 256+dist != 512");

  /* Construct the codes of the static literal tree */


  for (bits = 0; bits <= MAX_BITS; bits++) {
    bl_count[bits] = 0;
  }

  n = 0;

  while (n <= 143) {
    static_ltree[n * 2 + 1]
    /*.Len*/
    = 8;
    n++;
    bl_count[8]++;
  }

  while (n <= 255) {
    static_ltree[n * 2 + 1]
    /*.Len*/
    = 9;
    n++;
    bl_count[9]++;
  }

  while (n <= 279) {
    static_ltree[n * 2 + 1]
    /*.Len*/
    = 7;
    n++;
    bl_count[7]++;
  }

  while (n <= 287) {
    static_ltree[n * 2 + 1]
    /*.Len*/
    = 8;
    n++;
    bl_count[8]++;
  }
  /* Codes 286 and 287 do not exist, but we must include them in the
   * tree construction to get a canonical Huffman tree (longest code
   * all ones)
   */


  gen_codes(static_ltree, L_CODES + 1, bl_count);
  /* The static distance tree is trivial: */

  for (n = 0; n < D_CODES; n++) {
    static_dtree[n * 2 + 1]
    /*.Len*/
    = 5;
    static_dtree[n * 2]
    /*.Code*/
    = bi_reverse(n, 5);
  } // Now data ready and we can init static trees


  static_l_desc = new StaticTreeDesc(static_ltree, extra_lbits, LITERALS + 1, L_CODES, MAX_BITS);
  static_d_desc = new StaticTreeDesc(static_dtree, extra_dbits, 0, D_CODES, MAX_BITS);
  static_bl_desc = new StaticTreeDesc(new Array(0), extra_blbits, 0, BL_CODES, MAX_BL_BITS); //static_init_done = true;
}
/* ===========================================================================
 * Initialize a new block.
 */


function init_block(s) {
  var n;
  /* iterates over tree elements */

  /* Initialize the trees. */

  for (n = 0; n < L_CODES; n++) {
    s.dyn_ltree[n * 2]
    /*.Freq*/
    = 0;
  }

  for (n = 0; n < D_CODES; n++) {
    s.dyn_dtree[n * 2]
    /*.Freq*/
    = 0;
  }

  for (n = 0; n < BL_CODES; n++) {
    s.bl_tree[n * 2]
    /*.Freq*/
    = 0;
  }

  s.dyn_ltree[END_BLOCK * 2]
  /*.Freq*/
  = 1;
  s.opt_len = s.static_len = 0;
  s.last_lit = s.matches = 0;
}
/* ===========================================================================
 * Flush the bit buffer and align the output on a byte boundary
 */


function bi_windup(s) {
  if (s.bi_valid > 8) {
    put_short(s, s.bi_buf);
  } else if (s.bi_valid > 0) {
    //put_byte(s, (Byte)s->bi_buf);
    s.pending_buf[s.pending++] = s.bi_buf;
  }

  s.bi_buf = 0;
  s.bi_valid = 0;
}
/* ===========================================================================
 * Copy a stored block, storing first the length and its
 * one's complement if requested.
 */


function copy_block(s, buf, len, header) //DeflateState *s;
//charf    *buf;    /* the input data */
//unsigned len;     /* its length */
//int      header;  /* true if block header must be written */
{
  bi_windup(s);
  /* align on byte boundary */

  if (header) {
    put_short(s, len);
    put_short(s, ~len);
  } //  while (len--) {
  //    put_byte(s, *buf++);
  //  }


  utils.arraySet(s.pending_buf, s.window, buf, len, s.pending);
  s.pending += len;
}
/* ===========================================================================
 * Compares to subtrees, using the tree depth as tie breaker when
 * the subtrees have equal frequency. This minimizes the worst case length.
 */


function smaller(tree, n, m, depth) {
  var _n2 = n * 2;

  var _m2 = m * 2;

  return tree[_n2]
  /*.Freq*/
  < tree[_m2]
  /*.Freq*/
  || tree[_n2]
  /*.Freq*/
  === tree[_m2]
  /*.Freq*/
  && depth[n] <= depth[m];
}
/* ===========================================================================
 * Restore the heap property by moving down the tree starting at node k,
 * exchanging a node with the smallest of its two sons if necessary, stopping
 * when the heap property is re-established (each father smaller than its
 * two sons).
 */


function pqdownheap(s, tree, k) //    deflate_state *s;
//    ct_data *tree;  /* the tree to restore */
//    int k;               /* node to move down */
{
  var v = s.heap[k];
  var j = k << 1;
  /* left son of k */

  while (j <= s.heap_len) {
    /* Set j to the smallest of the two sons: */
    if (j < s.heap_len && smaller(tree, s.heap[j + 1], s.heap[j], s.depth)) {
      j++;
    }
    /* Exit if v is smaller than both sons */


    if (smaller(tree, v, s.heap[j], s.depth)) {
      break;
    }
    /* Exchange v with the smallest son */


    s.heap[k] = s.heap[j];
    k = j;
    /* And continue down the tree, setting j to the left son of k */

    j <<= 1;
  }

  s.heap[k] = v;
} // inlined manually
// var SMALLEST = 1;

/* ===========================================================================
 * Send the block data compressed using the given Huffman trees
 */


function compress_block(s, ltree, dtree) //    deflate_state *s;
//    const ct_data *ltree; /* literal tree */
//    const ct_data *dtree; /* distance tree */
{
  var dist;
  /* distance of matched string */

  var lc;
  /* match length or unmatched char (if dist == 0) */

  var lx = 0;
  /* running index in l_buf */

  var code;
  /* the code to send */

  var extra;
  /* number of extra bits to send */

  if (s.last_lit !== 0) {
    do {
      dist = s.pending_buf[s.d_buf + lx * 2] << 8 | s.pending_buf[s.d_buf + lx * 2 + 1];
      lc = s.pending_buf[s.l_buf + lx];
      lx++;

      if (dist === 0) {
        send_code(s, lc, ltree);
        /* send a literal byte */
        //Tracecv(isgraph(lc), (stderr," '%c' ", lc));
      } else {
        /* Here, lc is the match length - MIN_MATCH */
        code = _length_code[lc];
        send_code(s, code + LITERALS + 1, ltree);
        /* send the length code */

        extra = extra_lbits[code];

        if (extra !== 0) {
          lc -= base_length[code];
          send_bits(s, lc, extra);
          /* send the extra length bits */
        }

        dist--;
        /* dist is now the match distance - 1 */

        code = d_code(dist); //Assert (code < D_CODES, "bad d_code");

        send_code(s, code, dtree);
        /* send the distance code */

        extra = extra_dbits[code];

        if (extra !== 0) {
          dist -= base_dist[code];
          send_bits(s, dist, extra);
          /* send the extra distance bits */
        }
      }
      /* literal or match pair ? */

      /* Check that the overlay between pending_buf and d_buf+l_buf is ok: */
      //Assert((uInt)(s->pending) < s->lit_bufsize + 2*lx,
      //       "pendingBuf overflow");

    } while (lx < s.last_lit);
  }

  send_code(s, END_BLOCK, ltree);
}
/* ===========================================================================
 * Construct one Huffman tree and assigns the code bit strings and lengths.
 * Update the total bit length for the current block.
 * IN assertion: the field freq is set for all tree elements.
 * OUT assertions: the fields len and code are set to the optimal bit length
 *     and corresponding code. The length opt_len is updated; static_len is
 *     also updated if stree is not null. The field max_code is set.
 */


function build_tree(s, desc) //    deflate_state *s;
//    tree_desc *desc; /* the tree descriptor */
{
  var tree = desc.dyn_tree;
  var stree = desc.stat_desc.static_tree;
  var has_stree = desc.stat_desc.has_stree;
  var elems = desc.stat_desc.elems;
  var n, m;
  /* iterate over heap elements */

  var max_code = -1;
  /* largest code with non zero frequency */

  var node;
  /* new node being created */

  /* Construct the initial heap, with least frequent element in
   * heap[SMALLEST]. The sons of heap[n] are heap[2*n] and heap[2*n+1].
   * heap[0] is not used.
   */

  s.heap_len = 0;
  s.heap_max = HEAP_SIZE;

  for (n = 0; n < elems; n++) {
    if (tree[n * 2]
    /*.Freq*/
    !== 0) {
      s.heap[++s.heap_len] = max_code = n;
      s.depth[n] = 0;
    } else {
      tree[n * 2 + 1]
      /*.Len*/
      = 0;
    }
  }
  /* The pkzip format requires that at least one distance code exists,
   * and that at least one bit should be sent even if there is only one
   * possible code. So to avoid special checks later on we force at least
   * two codes of non zero frequency.
   */


  while (s.heap_len < 2) {
    node = s.heap[++s.heap_len] = max_code < 2 ? ++max_code : 0;
    tree[node * 2]
    /*.Freq*/
    = 1;
    s.depth[node] = 0;
    s.opt_len--;

    if (has_stree) {
      s.static_len -= stree[node * 2 + 1]
      /*.Len*/
      ;
    }
    /* node is 0 or 1 so it does not have extra bits */

  }

  desc.max_code = max_code;
  /* The elements heap[heap_len/2+1 .. heap_len] are leaves of the tree,
   * establish sub-heaps of increasing lengths:
   */

  for (n = s.heap_len >> 1
  /*int /2*/
  ; n >= 1; n--) {
    pqdownheap(s, tree, n);
  }
  /* Construct the Huffman tree by repeatedly combining the least two
   * frequent nodes.
   */


  node = elems;
  /* next internal node of the tree */

  do {
    //pqremove(s, tree, n);  /* n = node of least frequency */

    /*** pqremove ***/
    n = s.heap[1
    /*SMALLEST*/
    ];
    s.heap[1
    /*SMALLEST*/
    ] = s.heap[s.heap_len--];
    pqdownheap(s, tree, 1
    /*SMALLEST*/
    );
    /***/

    m = s.heap[1
    /*SMALLEST*/
    ];
    /* m = node of next least frequency */

    s.heap[--s.heap_max] = n;
    /* keep the nodes sorted by frequency */

    s.heap[--s.heap_max] = m;
    /* Create a new node father of n and m */

    tree[node * 2]
    /*.Freq*/
    = tree[n * 2]
    /*.Freq*/
    + tree[m * 2]
    /*.Freq*/
    ;
    s.depth[node] = (s.depth[n] >= s.depth[m] ? s.depth[n] : s.depth[m]) + 1;
    tree[n * 2 + 1]
    /*.Dad*/
    = tree[m * 2 + 1]
    /*.Dad*/
    = node;
    /* and insert the new node in the heap */

    s.heap[1
    /*SMALLEST*/
    ] = node++;
    pqdownheap(s, tree, 1
    /*SMALLEST*/
    );
  } while (s.heap_len >= 2);

  s.heap[--s.heap_max] = s.heap[1
  /*SMALLEST*/
  ];
  /* At this point, the fields freq and dad are set. We can now
   * generate the bit lengths.
   */

  gen_bitlen(s, desc);
  /* The field len is now set, we can generate the bit codes */

  gen_codes(tree, max_code, s.bl_count);
}
/* ===========================================================================
 * Scan a literal or distance tree to determine the frequencies of the codes
 * in the bit length tree.
 */


function scan_tree(s, tree, max_code) //    deflate_state *s;
//    ct_data *tree;   /* the tree to be scanned */
//    int max_code;    /* and its largest code of non zero frequency */
{
  var n;
  /* iterates over all tree elements */

  var prevlen = -1;
  /* last emitted length */

  var curlen;
  /* length of current code */

  var nextlen = tree[0 * 2 + 1]
  /*.Len*/
  ;
  /* length of next code */

  var count = 0;
  /* repeat count of the current code */

  var max_count = 7;
  /* max repeat count */

  var min_count = 4;
  /* min repeat count */

  if (nextlen === 0) {
    max_count = 138;
    min_count = 3;
  }

  tree[(max_code + 1) * 2 + 1]
  /*.Len*/
  = 0xffff;
  /* guard */

  for (n = 0; n <= max_code; n++) {
    curlen = nextlen;
    nextlen = tree[(n + 1) * 2 + 1]
    /*.Len*/
    ;

    if (++count < max_count && curlen === nextlen) {
      continue;
    } else if (count < min_count) {
      s.bl_tree[curlen * 2]
      /*.Freq*/
      += count;
    } else if (curlen !== 0) {
      if (curlen !== prevlen) {
        s.bl_tree[curlen * 2] /*.Freq*/++;
      }

      s.bl_tree[REP_3_6 * 2] /*.Freq*/++;
    } else if (count <= 10) {
      s.bl_tree[REPZ_3_10 * 2] /*.Freq*/++;
    } else {
      s.bl_tree[REPZ_11_138 * 2] /*.Freq*/++;
    }

    count = 0;
    prevlen = curlen;

    if (nextlen === 0) {
      max_count = 138;
      min_count = 3;
    } else if (curlen === nextlen) {
      max_count = 6;
      min_count = 3;
    } else {
      max_count = 7;
      min_count = 4;
    }
  }
}
/* ===========================================================================
 * Send a literal or distance tree in compressed form, using the codes in
 * bl_tree.
 */


function send_tree(s, tree, max_code) //    deflate_state *s;
//    ct_data *tree; /* the tree to be scanned */
//    int max_code;       /* and its largest code of non zero frequency */
{
  var n;
  /* iterates over all tree elements */

  var prevlen = -1;
  /* last emitted length */

  var curlen;
  /* length of current code */

  var nextlen = tree[0 * 2 + 1]
  /*.Len*/
  ;
  /* length of next code */

  var count = 0;
  /* repeat count of the current code */

  var max_count = 7;
  /* max repeat count */

  var min_count = 4;
  /* min repeat count */

  /* tree[max_code+1].Len = -1; */

  /* guard already set */

  if (nextlen === 0) {
    max_count = 138;
    min_count = 3;
  }

  for (n = 0; n <= max_code; n++) {
    curlen = nextlen;
    nextlen = tree[(n + 1) * 2 + 1]
    /*.Len*/
    ;

    if (++count < max_count && curlen === nextlen) {
      continue;
    } else if (count < min_count) {
      do {
        send_code(s, curlen, s.bl_tree);
      } while (--count !== 0);
    } else if (curlen !== 0) {
      if (curlen !== prevlen) {
        send_code(s, curlen, s.bl_tree);
        count--;
      } //Assert(count >= 3 && count <= 6, " 3_6?");


      send_code(s, REP_3_6, s.bl_tree);
      send_bits(s, count - 3, 2);
    } else if (count <= 10) {
      send_code(s, REPZ_3_10, s.bl_tree);
      send_bits(s, count - 3, 3);
    } else {
      send_code(s, REPZ_11_138, s.bl_tree);
      send_bits(s, count - 11, 7);
    }

    count = 0;
    prevlen = curlen;

    if (nextlen === 0) {
      max_count = 138;
      min_count = 3;
    } else if (curlen === nextlen) {
      max_count = 6;
      min_count = 3;
    } else {
      max_count = 7;
      min_count = 4;
    }
  }
}
/* ===========================================================================
 * Construct the Huffman tree for the bit lengths and return the index in
 * bl_order of the last bit length code to send.
 */


function build_bl_tree(s) {
  var max_blindex;
  /* index of last bit length code of non zero freq */

  /* Determine the bit length frequencies for literal and distance trees */

  scan_tree(s, s.dyn_ltree, s.l_desc.max_code);
  scan_tree(s, s.dyn_dtree, s.d_desc.max_code);
  /* Build the bit length tree: */

  build_tree(s, s.bl_desc);
  /* opt_len now includes the length of the tree representations, except
   * the lengths of the bit lengths codes and the 5+5+4 bits for the counts.
   */

  /* Determine the number of bit length codes to send. The pkzip format
   * requires that at least 4 bit length codes be sent. (appnote.txt says
   * 3 but the actual value used is 4.)
   */

  for (max_blindex = BL_CODES - 1; max_blindex >= 3; max_blindex--) {
    if (s.bl_tree[bl_order[max_blindex] * 2 + 1]
    /*.Len*/
    !== 0) {
      break;
    }
  }
  /* Update opt_len to include the bit length tree and counts */


  s.opt_len += 3 * (max_blindex + 1) + 5 + 5 + 4; //Tracev((stderr, "\ndyn trees: dyn %ld, stat %ld",
  //        s->opt_len, s->static_len));

  return max_blindex;
}
/* ===========================================================================
 * Send the header for a block using dynamic Huffman trees: the counts, the
 * lengths of the bit length codes, the literal tree and the distance tree.
 * IN assertion: lcodes >= 257, dcodes >= 1, blcodes >= 4.
 */


function send_all_trees(s, lcodes, dcodes, blcodes) //    deflate_state *s;
//    int lcodes, dcodes, blcodes; /* number of codes for each tree */
{
  var rank;
  /* index in bl_order */
  //Assert (lcodes >= 257 && dcodes >= 1 && blcodes >= 4, "not enough codes");
  //Assert (lcodes <= L_CODES && dcodes <= D_CODES && blcodes <= BL_CODES,
  //        "too many codes");
  //Tracev((stderr, "\nbl counts: "));

  send_bits(s, lcodes - 257, 5);
  /* not +255 as stated in appnote.txt */

  send_bits(s, dcodes - 1, 5);
  send_bits(s, blcodes - 4, 4);
  /* not -3 as stated in appnote.txt */

  for (rank = 0; rank < blcodes; rank++) {
    //Tracev((stderr, "\nbl code %2d ", bl_order[rank]));
    send_bits(s, s.bl_tree[bl_order[rank] * 2 + 1]
    /*.Len*/
    , 3);
  } //Tracev((stderr, "\nbl tree: sent %ld", s->bits_sent));


  send_tree(s, s.dyn_ltree, lcodes - 1);
  /* literal tree */
  //Tracev((stderr, "\nlit tree: sent %ld", s->bits_sent));

  send_tree(s, s.dyn_dtree, dcodes - 1);
  /* distance tree */
  //Tracev((stderr, "\ndist tree: sent %ld", s->bits_sent));
}
/* ===========================================================================
 * Check if the data type is TEXT or BINARY, using the following algorithm:
 * - TEXT if the two conditions below are satisfied:
 *    a) There are no non-portable control characters belonging to the
 *       "black list" (0..6, 14..25, 28..31).
 *    b) There is at least one printable character belonging to the
 *       "white list" (9 {TAB}, 10 {LF}, 13 {CR}, 32..255).
 * - BINARY otherwise.
 * - The following partially-portable control characters form a
 *   "gray list" that is ignored in this detection algorithm:
 *   (7 {BEL}, 8 {BS}, 11 {VT}, 12 {FF}, 26 {SUB}, 27 {ESC}).
 * IN assertion: the fields Freq of dyn_ltree are set.
 */


function detect_data_type(s) {
  /* black_mask is the bit mask of black-listed bytes
   * set bits 0..6, 14..25, and 28..31
   * 0xf3ffc07f = binary 11110011111111111100000001111111
   */
  var black_mask = 0xf3ffc07f;
  var n;
  /* Check for non-textual ("black-listed") bytes. */

  for (n = 0; n <= 31; n++, black_mask >>>= 1) {
    if (black_mask & 1 && s.dyn_ltree[n * 2]
    /*.Freq*/
    !== 0) {
      return Z_BINARY;
    }
  }
  /* Check for textual ("white-listed") bytes. */


  if (s.dyn_ltree[9 * 2]
  /*.Freq*/
  !== 0 || s.dyn_ltree[10 * 2]
  /*.Freq*/
  !== 0 || s.dyn_ltree[13 * 2]
  /*.Freq*/
  !== 0) {
    return Z_TEXT;
  }

  for (n = 32; n < LITERALS; n++) {
    if (s.dyn_ltree[n * 2]
    /*.Freq*/
    !== 0) {
      return Z_TEXT;
    }
  }
  /* There are no "black-listed" or "white-listed" bytes:
   * this stream either is empty or has tolerated ("gray-listed") bytes only.
   */


  return Z_BINARY;
}

var static_init_done = false;
/* ===========================================================================
 * Initialize the tree data structures for a new zlib stream.
 */

function _tr_init(s) {
  if (!static_init_done) {
    tr_static_init();
    static_init_done = true;
  }

  s.l_desc = new TreeDesc(s.dyn_ltree, static_l_desc);
  s.d_desc = new TreeDesc(s.dyn_dtree, static_d_desc);
  s.bl_desc = new TreeDesc(s.bl_tree, static_bl_desc);
  s.bi_buf = 0;
  s.bi_valid = 0;
  /* Initialize the first block of the first file: */

  init_block(s);
}
/* ===========================================================================
 * Send a stored block
 */


function _tr_stored_block(s, buf, stored_len, last) //DeflateState *s;
//charf *buf;       /* input block */
//ulg stored_len;   /* length of input block */
//int last;         /* one if this is the last block for a file */
{
  send_bits(s, (STORED_BLOCK << 1) + (last ? 1 : 0), 3);
  /* send block type */

  copy_block(s, buf, stored_len, true);
  /* with header */
}
/* ===========================================================================
 * Send one empty static block to give enough lookahead for inflate.
 * This takes 10 bits, of which 7 may remain in the bit buffer.
 */


function _tr_align(s) {
  send_bits(s, STATIC_TREES << 1, 3);
  send_code(s, END_BLOCK, static_ltree);
  bi_flush(s);
}
/* ===========================================================================
 * Determine the best encoding for the current block: dynamic trees, static
 * trees or store, and output the encoded block to the zip file.
 */


function _tr_flush_block(s, buf, stored_len, last) //DeflateState *s;
//charf *buf;       /* input block, or NULL if too old */
//ulg stored_len;   /* length of input block */
//int last;         /* one if this is the last block for a file */
{
  var opt_lenb, static_lenb;
  /* opt_len and static_len in bytes */

  var max_blindex = 0;
  /* index of last bit length code of non zero freq */

  /* Build the Huffman trees unless a stored block is forced */

  if (s.level > 0) {
    /* Check if the file is binary or text */
    if (s.strm.data_type === Z_UNKNOWN) {
      s.strm.data_type = detect_data_type(s);
    }
    /* Construct the literal and distance trees */


    build_tree(s, s.l_desc); // Tracev((stderr, "\nlit data: dyn %ld, stat %ld", s->opt_len,
    //        s->static_len));

    build_tree(s, s.d_desc); // Tracev((stderr, "\ndist data: dyn %ld, stat %ld", s->opt_len,
    //        s->static_len));

    /* At this point, opt_len and static_len are the total bit lengths of
     * the compressed block data, excluding the tree representations.
     */

    /* Build the bit length tree for the above two trees, and get the index
     * in bl_order of the last bit length code to send.
     */

    max_blindex = build_bl_tree(s);
    /* Determine the best encoding. Compute the block lengths in bytes. */

    opt_lenb = s.opt_len + 3 + 7 >>> 3;
    static_lenb = s.static_len + 3 + 7 >>> 3; // Tracev((stderr, "\nopt %lu(%lu) stat %lu(%lu) stored %lu lit %u ",
    //        opt_lenb, s->opt_len, static_lenb, s->static_len, stored_len,
    //        s->last_lit));

    if (static_lenb <= opt_lenb) {
      opt_lenb = static_lenb;
    }
  } else {
    // Assert(buf != (char*)0, "lost buf");
    opt_lenb = static_lenb = stored_len + 5;
    /* force a stored block */
  }

  if (stored_len + 4 <= opt_lenb && buf !== -1) {
    /* 4: two words for the lengths */

    /* The test buf != NULL is only necessary if LIT_BUFSIZE > WSIZE.
     * Otherwise we can't have processed more than WSIZE input bytes since
     * the last block flush, because compression would have been
     * successful. If LIT_BUFSIZE <= WSIZE, it is never too late to
     * transform a block into a stored block.
     */
    _tr_stored_block(s, buf, stored_len, last);
  } else if (s.strategy === Z_FIXED || static_lenb === opt_lenb) {
    send_bits(s, (STATIC_TREES << 1) + (last ? 1 : 0), 3);
    compress_block(s, static_ltree, static_dtree);
  } else {
    send_bits(s, (DYN_TREES << 1) + (last ? 1 : 0), 3);
    send_all_trees(s, s.l_desc.max_code + 1, s.d_desc.max_code + 1, max_blindex + 1);
    compress_block(s, s.dyn_ltree, s.dyn_dtree);
  } // Assert (s->compressed_len == s->bits_sent, "bad compressed size");

  /* The above check is made mod 2^32, for files larger than 512 MB
   * and uLong implemented on 32 bits.
   */


  init_block(s);

  if (last) {
    bi_windup(s);
  } // Tracev((stderr,"\ncomprlen %lu(%lu) ", s->compressed_len>>3,
  //       s->compressed_len-7*last));

}
/* ===========================================================================
 * Save the match info and tally the frequency counts. Return true if
 * the current block must be flushed.
 */


function _tr_tally(s, dist, lc) //    deflate_state *s;
//    unsigned dist;  /* distance of matched string */
//    unsigned lc;    /* match length-MIN_MATCH or unmatched char (if dist==0) */
{
  //var out_length, in_length, dcode;
  s.pending_buf[s.d_buf + s.last_lit * 2] = dist >>> 8 & 0xff;
  s.pending_buf[s.d_buf + s.last_lit * 2 + 1] = dist & 0xff;
  s.pending_buf[s.l_buf + s.last_lit] = lc & 0xff;
  s.last_lit++;

  if (dist === 0) {
    /* lc is the unmatched char */
    s.dyn_ltree[lc * 2] /*.Freq*/++;
  } else {
    s.matches++;
    /* Here, lc is the match length - MIN_MATCH */

    dist--;
    /* dist = match distance - 1 */
    //Assert((ush)dist < (ush)MAX_DIST(s) &&
    //       (ush)lc <= (ush)(MAX_MATCH-MIN_MATCH) &&
    //       (ush)d_code(dist) < (ush)D_CODES,  "_tr_tally: bad match");

    s.dyn_ltree[(_length_code[lc] + LITERALS + 1) * 2] /*.Freq*/++;
    s.dyn_dtree[d_code(dist) * 2] /*.Freq*/++;
  } // (!) This block is disabled in zlib defaults,
  // don't enable it for binary compatibility
  //#ifdef TRUNCATE_BLOCK
  //  /* Try to guess if it is profitable to stop the current block here */
  //  if ((s.last_lit & 0x1fff) === 0 && s.level > 2) {
  //    /* Compute an upper bound for the compressed length */
  //    out_length = s.last_lit*8;
  //    in_length = s.strstart - s.block_start;
  //
  //    for (dcode = 0; dcode < D_CODES; dcode++) {
  //      out_length += s.dyn_dtree[dcode*2]/*.Freq*/ * (5 + extra_dbits[dcode]);
  //    }
  //    out_length >>>= 3;
  //    //Tracev((stderr,"\nlast_lit %u, in %ld, out ~%ld(%ld%%) ",
  //    //       s->last_lit, in_length, out_length,
  //    //       100L - out_length*100L/in_length));
  //    if (s.matches < (s.last_lit>>1)/*int /2*/ && out_length < (in_length>>1)/*int /2*/) {
  //      return true;
  //    }
  //  }
  //#endif


  return s.last_lit === s.lit_bufsize - 1;
  /* We avoid equality with lit_bufsize because of wraparound at 64K
   * on 16 bit machines and because stored blocks are restricted to
   * 64K-1 bytes.
   */
}

exports._tr_init = _tr_init;
exports._tr_stored_block = _tr_stored_block;
exports._tr_flush_block = _tr_flush_block;
exports._tr_tally = _tr_tally;
exports._tr_align = _tr_align;

/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
 // Note: adler32 takes 12% for level 0 and 2% for level 6.
// It isn't worth it to make additional optimizations as in original.
// Small size is preferable.
// (C) 1995-2013 Jean-loup Gailly and Mark Adler
// (C) 2014-2017 Vitaly Puzrin and Andrey Tupitsin
//
// This software is provided 'as-is', without any express or implied
// warranty. In no event will the authors be held liable for any damages
// arising from the use of this software.
//
// Permission is granted to anyone to use this software for any purpose,
// including commercial applications, and to alter it and redistribute it
// freely, subject to the following restrictions:
//
// 1. The origin of this software must not be misrepresented; you must not
//   claim that you wrote the original software. If you use this software
//   in a product, an acknowledgment in the product documentation would be
//   appreciated but is not required.
// 2. Altered source versions must be plainly marked as such, and must not be
//   misrepresented as being the original software.
// 3. This notice may not be removed or altered from any source distribution.

function adler32(adler, buf, len, pos) {
  var s1 = adler & 0xffff | 0,
      s2 = adler >>> 16 & 0xffff | 0,
      n = 0;

  while (len !== 0) {
    // Set limit ~ twice less than 5552, to keep
    // s2 in 31-bits, because we force signed ints.
    // in other case %= will fail.
    n = len > 2000 ? 2000 : len;
    len -= n;

    do {
      s1 = s1 + buf[pos++] | 0;
      s2 = s2 + s1 | 0;
    } while (--n);

    s1 %= 65521;
    s2 %= 65521;
  }

  return s1 | s2 << 16 | 0;
}

module.exports = adler32;

/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
 // Note: we can't get significant speed boost here.
// So write code to minimize size - no pregenerated tables
// and array tools dependencies.
// (C) 1995-2013 Jean-loup Gailly and Mark Adler
// (C) 2014-2017 Vitaly Puzrin and Andrey Tupitsin
//
// This software is provided 'as-is', without any express or implied
// warranty. In no event will the authors be held liable for any damages
// arising from the use of this software.
//
// Permission is granted to anyone to use this software for any purpose,
// including commercial applications, and to alter it and redistribute it
// freely, subject to the following restrictions:
//
// 1. The origin of this software must not be misrepresented; you must not
//   claim that you wrote the original software. If you use this software
//   in a product, an acknowledgment in the product documentation would be
//   appreciated but is not required.
// 2. Altered source versions must be plainly marked as such, and must not be
//   misrepresented as being the original software.
// 3. This notice may not be removed or altered from any source distribution.
// Use ordinary array, since untyped makes no boost here

function makeTable() {
  var c,
      table = [];

  for (var n = 0; n < 256; n++) {
    c = n;

    for (var k = 0; k < 8; k++) {
      c = c & 1 ? 0xEDB88320 ^ c >>> 1 : c >>> 1;
    }

    table[n] = c;
  }

  return table;
} // Create table on load. Just 255 signed longs. Not a problem.


var crcTable = makeTable();

function crc32(crc, buf, len, pos) {
  var t = crcTable,
      end = pos + len;
  crc ^= -1;

  for (var i = pos; i < end; i++) {
    crc = crc >>> 8 ^ t[(crc ^ buf[i]) & 0xFF];
  }

  return crc ^ -1; // >>> 0;
}

module.exports = crc32;

/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
 // (C) 1995-2013 Jean-loup Gailly and Mark Adler
// (C) 2014-2017 Vitaly Puzrin and Andrey Tupitsin
//
// This software is provided 'as-is', without any express or implied
// warranty. In no event will the authors be held liable for any damages
// arising from the use of this software.
//
// Permission is granted to anyone to use this software for any purpose,
// including commercial applications, and to alter it and redistribute it
// freely, subject to the following restrictions:
//
// 1. The origin of this software must not be misrepresented; you must not
//   claim that you wrote the original software. If you use this software
//   in a product, an acknowledgment in the product documentation would be
//   appreciated but is not required.
// 2. Altered source versions must be plainly marked as such, and must not be
//   misrepresented as being the original software.
// 3. This notice may not be removed or altered from any source distribution.

module.exports = {
  2: 'need dictionary',

  /* Z_NEED_DICT       2  */
  1: 'stream end',

  /* Z_STREAM_END      1  */
  0: '',

  /* Z_OK              0  */
  '-1': 'file error',

  /* Z_ERRNO         (-1) */
  '-2': 'stream error',

  /* Z_STREAM_ERROR  (-2) */
  '-3': 'data error',

  /* Z_DATA_ERROR    (-3) */
  '-4': 'insufficient memory',

  /* Z_MEM_ERROR     (-4) */
  '-5': 'buffer error',

  /* Z_BUF_ERROR     (-5) */
  '-6': 'incompatible version'
  /* Z_VERSION_ERROR (-6) */

};

/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// String encode/decode helpers


var utils = __webpack_require__(16); // Quick check if we can use fast array to bin string conversion
//
// - apply(Array) can fail on Android 2.2
// - apply(Uint8Array) can fail on iOS 5.1 Safari
//


var STR_APPLY_OK = true;
var STR_APPLY_UIA_OK = true;

try {
  String.fromCharCode.apply(null, [0]);
} catch (__) {
  STR_APPLY_OK = false;
}

try {
  String.fromCharCode.apply(null, new Uint8Array(1));
} catch (__) {
  STR_APPLY_UIA_OK = false;
} // Table with utf8 lengths (calculated by first byte of sequence)
// Note, that 5 & 6-byte values and some 4-byte values can not be represented in JS,
// because max possible codepoint is 0x10ffff


var _utf8len = new utils.Buf8(256);

for (var q = 0; q < 256; q++) {
  _utf8len[q] = q >= 252 ? 6 : q >= 248 ? 5 : q >= 240 ? 4 : q >= 224 ? 3 : q >= 192 ? 2 : 1;
}

_utf8len[254] = _utf8len[254] = 1; // Invalid sequence start
// convert string to array (typed, when possible)

exports.string2buf = function (str) {
  var buf,
      c,
      c2,
      m_pos,
      i,
      str_len = str.length,
      buf_len = 0; // count binary size

  for (m_pos = 0; m_pos < str_len; m_pos++) {
    c = str.charCodeAt(m_pos);

    if ((c & 0xfc00) === 0xd800 && m_pos + 1 < str_len) {
      c2 = str.charCodeAt(m_pos + 1);

      if ((c2 & 0xfc00) === 0xdc00) {
        c = 0x10000 + (c - 0xd800 << 10) + (c2 - 0xdc00);
        m_pos++;
      }
    }

    buf_len += c < 0x80 ? 1 : c < 0x800 ? 2 : c < 0x10000 ? 3 : 4;
  } // allocate buffer


  buf = new utils.Buf8(buf_len); // convert

  for (i = 0, m_pos = 0; i < buf_len; m_pos++) {
    c = str.charCodeAt(m_pos);

    if ((c & 0xfc00) === 0xd800 && m_pos + 1 < str_len) {
      c2 = str.charCodeAt(m_pos + 1);

      if ((c2 & 0xfc00) === 0xdc00) {
        c = 0x10000 + (c - 0xd800 << 10) + (c2 - 0xdc00);
        m_pos++;
      }
    }

    if (c < 0x80) {
      /* one byte */
      buf[i++] = c;
    } else if (c < 0x800) {
      /* two bytes */
      buf[i++] = 0xC0 | c >>> 6;
      buf[i++] = 0x80 | c & 0x3f;
    } else if (c < 0x10000) {
      /* three bytes */
      buf[i++] = 0xE0 | c >>> 12;
      buf[i++] = 0x80 | c >>> 6 & 0x3f;
      buf[i++] = 0x80 | c & 0x3f;
    } else {
      /* four bytes */
      buf[i++] = 0xf0 | c >>> 18;
      buf[i++] = 0x80 | c >>> 12 & 0x3f;
      buf[i++] = 0x80 | c >>> 6 & 0x3f;
      buf[i++] = 0x80 | c & 0x3f;
    }
  }

  return buf;
}; // Helper (used in 2 places)


function buf2binstring(buf, len) {
  // On Chrome, the arguments in a function call that are allowed is `65534`.
  // If the length of the buffer is smaller than that, we can use this optimization,
  // otherwise we will take a slower path.
  if (len < 65534) {
    if (buf.subarray && STR_APPLY_UIA_OK || !buf.subarray && STR_APPLY_OK) {
      return String.fromCharCode.apply(null, utils.shrinkBuf(buf, len));
    }
  }

  var result = '';

  for (var i = 0; i < len; i++) {
    result += String.fromCharCode(buf[i]);
  }

  return result;
} // Convert byte array to binary string


exports.buf2binstring = function (buf) {
  return buf2binstring(buf, buf.length);
}; // Convert binary string (typed, when possible)


exports.binstring2buf = function (str) {
  var buf = new utils.Buf8(str.length);

  for (var i = 0, len = buf.length; i < len; i++) {
    buf[i] = str.charCodeAt(i);
  }

  return buf;
}; // convert array to string


exports.buf2string = function (buf, max) {
  var i, out, c, c_len;
  var len = max || buf.length; // Reserve max possible length (2 words per char)
  // NB: by unknown reasons, Array is significantly faster for
  //     String.fromCharCode.apply than Uint16Array.

  var utf16buf = new Array(len * 2);

  for (out = 0, i = 0; i < len;) {
    c = buf[i++]; // quick process ascii

    if (c < 0x80) {
      utf16buf[out++] = c;
      continue;
    }

    c_len = _utf8len[c]; // skip 5 & 6 byte codes

    if (c_len > 4) {
      utf16buf[out++] = 0xfffd;
      i += c_len - 1;
      continue;
    } // apply mask on first byte


    c &= c_len === 2 ? 0x1f : c_len === 3 ? 0x0f : 0x07; // join the rest

    while (c_len > 1 && i < len) {
      c = c << 6 | buf[i++] & 0x3f;
      c_len--;
    } // terminated by end of string?


    if (c_len > 1) {
      utf16buf[out++] = 0xfffd;
      continue;
    }

    if (c < 0x10000) {
      utf16buf[out++] = c;
    } else {
      c -= 0x10000;
      utf16buf[out++] = 0xd800 | c >> 10 & 0x3ff;
      utf16buf[out++] = 0xdc00 | c & 0x3ff;
    }
  }

  return buf2binstring(utf16buf, out);
}; // Calculate max possible position in utf8 buffer,
// that will not break sequence. If that's not possible
// - (very small limits) return max size as is.
//
// buf[] - utf8 bytes array
// max   - length limit (mandatory);


exports.utf8border = function (buf, max) {
  var pos;
  max = max || buf.length;

  if (max > buf.length) {
    max = buf.length;
  } // go back from last position, until start of sequence found


  pos = max - 1;

  while (pos >= 0 && (buf[pos] & 0xC0) === 0x80) {
    pos--;
  } // Very small and broken sequence,
  // return max, because we should return something anyway.


  if (pos < 0) {
    return max;
  } // If we came to start of buffer - that means buffer is too small,
  // return max too.


  if (pos === 0) {
    return max;
  }

  return pos + _utf8len[buf[pos]] > max ? pos : max;
};

/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
 // (C) 1995-2013 Jean-loup Gailly and Mark Adler
// (C) 2014-2017 Vitaly Puzrin and Andrey Tupitsin
//
// This software is provided 'as-is', without any express or implied
// warranty. In no event will the authors be held liable for any damages
// arising from the use of this software.
//
// Permission is granted to anyone to use this software for any purpose,
// including commercial applications, and to alter it and redistribute it
// freely, subject to the following restrictions:
//
// 1. The origin of this software must not be misrepresented; you must not
//   claim that you wrote the original software. If you use this software
//   in a product, an acknowledgment in the product documentation would be
//   appreciated but is not required.
// 2. Altered source versions must be plainly marked as such, and must not be
//   misrepresented as being the original software.
// 3. This notice may not be removed or altered from any source distribution.

function ZStream() {
  /* next input byte */
  this.input = null; // JS specific, because we have no pointers

  this.next_in = 0;
  /* number of bytes available at input */

  this.avail_in = 0;
  /* total number of input bytes read so far */

  this.total_in = 0;
  /* next output byte should be put there */

  this.output = null; // JS specific, because we have no pointers

  this.next_out = 0;
  /* remaining free space at output */

  this.avail_out = 0;
  /* total number of bytes output so far */

  this.total_out = 0;
  /* last error message, NULL if no error */

  this.msg = ''
  /*Z_NULL*/
  ;
  /* not visible by applications */

  this.state = null;
  /* best guess about the data type: binary or text */

  this.data_type = 2
  /*Z_UNKNOWN*/
  ;
  /* adler32 value of the uncompressed data */

  this.adler = 0;
}

module.exports = ZStream;

/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var zlib_inflate = __webpack_require__(26);

var utils = __webpack_require__(16);

var strings = __webpack_require__(23);

var c = __webpack_require__(29);

var msg = __webpack_require__(22);

var ZStream = __webpack_require__(24);

var GZheader = __webpack_require__(30);

var toString = Object.prototype.toString;
/**
 * class Inflate
 *
 * Generic JS-style wrapper for zlib calls. If you don't need
 * streaming behaviour - use more simple functions: [[inflate]]
 * and [[inflateRaw]].
 **/

/* internal
 * inflate.chunks -> Array
 *
 * Chunks of output data, if [[Inflate#onData]] not overridden.
 **/

/**
 * Inflate.result -> Uint8Array|Array|String
 *
 * Uncompressed result, generated by default [[Inflate#onData]]
 * and [[Inflate#onEnd]] handlers. Filled after you push last chunk
 * (call [[Inflate#push]] with `Z_FINISH` / `true` param) or if you
 * push a chunk with explicit flush (call [[Inflate#push]] with
 * `Z_SYNC_FLUSH` param).
 **/

/**
 * Inflate.err -> Number
 *
 * Error code after inflate finished. 0 (Z_OK) on success.
 * Should be checked if broken data possible.
 **/

/**
 * Inflate.msg -> String
 *
 * Error message, if [[Inflate.err]] != 0
 **/

/**
 * new Inflate(options)
 * - options (Object): zlib inflate options.
 *
 * Creates new inflator instance with specified params. Throws exception
 * on bad params. Supported options:
 *
 * - `windowBits`
 * - `dictionary`
 *
 * [http://zlib.net/manual.html#Advanced](http://zlib.net/manual.html#Advanced)
 * for more information on these.
 *
 * Additional options, for internal needs:
 *
 * - `chunkSize` - size of generated data chunks (16K by default)
 * - `raw` (Boolean) - do raw inflate
 * - `to` (String) - if equal to 'string', then result will be converted
 *   from utf8 to utf16 (javascript) string. When string output requested,
 *   chunk length can differ from `chunkSize`, depending on content.
 *
 * By default, when no options set, autodetect deflate/gzip data format via
 * wrapper header.
 *
 * ##### Example:
 *
 * ```javascript
 * var pako = require('pako')
 *   , chunk1 = Uint8Array([1,2,3,4,5,6,7,8,9])
 *   , chunk2 = Uint8Array([10,11,12,13,14,15,16,17,18,19]);
 *
 * var inflate = new pako.Inflate({ level: 3});
 *
 * inflate.push(chunk1, false);
 * inflate.push(chunk2, true);  // true -> last chunk
 *
 * if (inflate.err) { throw new Error(inflate.err); }
 *
 * console.log(inflate.result);
 * ```
 **/

function Inflate(options) {
  if (!(this instanceof Inflate)) return new Inflate(options);
  this.options = utils.assign({
    chunkSize: 16384,
    windowBits: 0,
    to: ''
  }, options || {});
  var opt = this.options; // Force window size for `raw` data, if not set directly,
  // because we have no header for autodetect.

  if (opt.raw && opt.windowBits >= 0 && opt.windowBits < 16) {
    opt.windowBits = -opt.windowBits;

    if (opt.windowBits === 0) {
      opt.windowBits = -15;
    }
  } // If `windowBits` not defined (and mode not raw) - set autodetect flag for gzip/deflate


  if (opt.windowBits >= 0 && opt.windowBits < 16 && !(options && options.windowBits)) {
    opt.windowBits += 32;
  } // Gzip header has no info about windows size, we can do autodetect only
  // for deflate. So, if window size not set, force it to max when gzip possible


  if (opt.windowBits > 15 && opt.windowBits < 48) {
    // bit 3 (16) -> gzipped data
    // bit 4 (32) -> autodetect gzip/deflate
    if ((opt.windowBits & 15) === 0) {
      opt.windowBits |= 15;
    }
  }

  this.err = 0; // error code, if happens (0 = Z_OK)

  this.msg = ''; // error message

  this.ended = false; // used to avoid multiple onEnd() calls

  this.chunks = []; // chunks of compressed data

  this.strm = new ZStream();
  this.strm.avail_out = 0;
  var status = zlib_inflate.inflateInit2(this.strm, opt.windowBits);

  if (status !== c.Z_OK) {
    throw new Error(msg[status]);
  }

  this.header = new GZheader();
  zlib_inflate.inflateGetHeader(this.strm, this.header); // Setup dictionary

  if (opt.dictionary) {
    // Convert data if needed
    if (typeof opt.dictionary === 'string') {
      opt.dictionary = strings.string2buf(opt.dictionary);
    } else if (toString.call(opt.dictionary) === '[object ArrayBuffer]') {
      opt.dictionary = new Uint8Array(opt.dictionary);
    }

    if (opt.raw) {
      //In raw mode we need to set the dictionary early
      status = zlib_inflate.inflateSetDictionary(this.strm, opt.dictionary);

      if (status !== c.Z_OK) {
        throw new Error(msg[status]);
      }
    }
  }
}
/**
 * Inflate#push(data[, mode]) -> Boolean
 * - data (Uint8Array|Array|ArrayBuffer|String): input data
 * - mode (Number|Boolean): 0..6 for corresponding Z_NO_FLUSH..Z_TREE modes.
 *   See constants. Skipped or `false` means Z_NO_FLUSH, `true` means Z_FINISH.
 *
 * Sends input data to inflate pipe, generating [[Inflate#onData]] calls with
 * new output chunks. Returns `true` on success. The last data block must have
 * mode Z_FINISH (or `true`). That will flush internal pending buffers and call
 * [[Inflate#onEnd]]. For interim explicit flushes (without ending the stream) you
 * can use mode Z_SYNC_FLUSH, keeping the decompression context.
 *
 * On fail call [[Inflate#onEnd]] with error code and return false.
 *
 * We strongly recommend to use `Uint8Array` on input for best speed (output
 * format is detected automatically). Also, don't skip last param and always
 * use the same type in your code (boolean or number). That will improve JS speed.
 *
 * For regular `Array`-s make sure all elements are [0..255].
 *
 * ##### Example
 *
 * ```javascript
 * push(chunk, false); // push one of data chunks
 * ...
 * push(chunk, true);  // push last chunk
 * ```
 **/


Inflate.prototype.push = function (data, mode) {
  var strm = this.strm;
  var chunkSize = this.options.chunkSize;
  var dictionary = this.options.dictionary;

  var status, _mode;

  var next_out_utf8, tail, utf8str; // Flag to properly process Z_BUF_ERROR on testing inflate call
  // when we check that all output data was flushed.

  var allowBufError = false;

  if (this.ended) {
    return false;
  }

  _mode = mode === ~~mode ? mode : mode === true ? c.Z_FINISH : c.Z_NO_FLUSH; // Convert data if needed

  if (typeof data === 'string') {
    // Only binary strings can be decompressed on practice
    strm.input = strings.binstring2buf(data);
  } else if (toString.call(data) === '[object ArrayBuffer]') {
    strm.input = new Uint8Array(data);
  } else {
    strm.input = data;
  }

  strm.next_in = 0;
  strm.avail_in = strm.input.length;

  do {
    if (strm.avail_out === 0) {
      strm.output = new utils.Buf8(chunkSize);
      strm.next_out = 0;
      strm.avail_out = chunkSize;
    }

    status = zlib_inflate.inflate(strm, c.Z_NO_FLUSH);
    /* no bad return value */

    if (status === c.Z_NEED_DICT && dictionary) {
      status = zlib_inflate.inflateSetDictionary(this.strm, dictionary);
    }

    if (status === c.Z_BUF_ERROR && allowBufError === true) {
      status = c.Z_OK;
      allowBufError = false;
    }

    if (status !== c.Z_STREAM_END && status !== c.Z_OK) {
      this.onEnd(status);
      this.ended = true;
      return false;
    }

    if (strm.next_out) {
      if (strm.avail_out === 0 || status === c.Z_STREAM_END || strm.avail_in === 0 && (_mode === c.Z_FINISH || _mode === c.Z_SYNC_FLUSH)) {
        if (this.options.to === 'string') {
          next_out_utf8 = strings.utf8border(strm.output, strm.next_out);
          tail = strm.next_out - next_out_utf8;
          utf8str = strings.buf2string(strm.output, next_out_utf8); // move tail

          strm.next_out = tail;
          strm.avail_out = chunkSize - tail;

          if (tail) {
            utils.arraySet(strm.output, strm.output, next_out_utf8, tail, 0);
          }

          this.onData(utf8str);
        } else {
          this.onData(utils.shrinkBuf(strm.output, strm.next_out));
        }
      }
    } // When no more input data, we should check that internal inflate buffers
    // are flushed. The only way to do it when avail_out = 0 - run one more
    // inflate pass. But if output data not exists, inflate return Z_BUF_ERROR.
    // Here we set flag to process this error properly.
    //
    // NOTE. Deflate does not return error in this case and does not needs such
    // logic.


    if (strm.avail_in === 0 && strm.avail_out === 0) {
      allowBufError = true;
    }
  } while ((strm.avail_in > 0 || strm.avail_out === 0) && status !== c.Z_STREAM_END);

  if (status === c.Z_STREAM_END) {
    _mode = c.Z_FINISH;
  } // Finalize on the last chunk.


  if (_mode === c.Z_FINISH) {
    status = zlib_inflate.inflateEnd(this.strm);
    this.onEnd(status);
    this.ended = true;
    return status === c.Z_OK;
  } // callback interim results if Z_SYNC_FLUSH.


  if (_mode === c.Z_SYNC_FLUSH) {
    this.onEnd(c.Z_OK);
    strm.avail_out = 0;
    return true;
  }

  return true;
};
/**
 * Inflate#onData(chunk) -> Void
 * - chunk (Uint8Array|Array|String): output data. Type of array depends
 *   on js engine support. When string output requested, each chunk
 *   will be string.
 *
 * By default, stores data blocks in `chunks[]` property and glue
 * those in `onEnd`. Override this handler, if you need another behaviour.
 **/


Inflate.prototype.onData = function (chunk) {
  this.chunks.push(chunk);
};
/**
 * Inflate#onEnd(status) -> Void
 * - status (Number): inflate status. 0 (Z_OK) on success,
 *   other if not.
 *
 * Called either after you tell inflate that the input stream is
 * complete (Z_FINISH) or should be flushed (Z_SYNC_FLUSH)
 * or if an error happened. By default - join collected chunks,
 * free memory and fill `results` / `err` properties.
 **/


Inflate.prototype.onEnd = function (status) {
  // On success - join
  if (status === c.Z_OK) {
    if (this.options.to === 'string') {
      // Glue & convert here, until we teach pako to send
      // utf8 aligned strings to onData
      this.result = this.chunks.join('');
    } else {
      this.result = utils.flattenChunks(this.chunks);
    }
  }

  this.chunks = [];
  this.err = status;
  this.msg = this.strm.msg;
};
/**
 * inflate(data[, options]) -> Uint8Array|Array|String
 * - data (Uint8Array|Array|String): input data to decompress.
 * - options (Object): zlib inflate options.
 *
 * Decompress `data` with inflate/ungzip and `options`. Autodetect
 * format via wrapper header by default. That's why we don't provide
 * separate `ungzip` method.
 *
 * Supported options are:
 *
 * - windowBits
 *
 * [http://zlib.net/manual.html#Advanced](http://zlib.net/manual.html#Advanced)
 * for more information.
 *
 * Sugar (options):
 *
 * - `raw` (Boolean) - say that we work with raw stream, if you don't wish to specify
 *   negative windowBits implicitly.
 * - `to` (String) - if equal to 'string', then result will be converted
 *   from utf8 to utf16 (javascript) string. When string output requested,
 *   chunk length can differ from `chunkSize`, depending on content.
 *
 *
 * ##### Example:
 *
 * ```javascript
 * var pako = require('pako')
 *   , input = pako.deflate([1,2,3,4,5,6,7,8,9])
 *   , output;
 *
 * try {
 *   output = pako.inflate(input);
 * } catch (err)
 *   console.log(err);
 * }
 * ```
 **/


function inflate(input, options) {
  var inflator = new Inflate(options);
  inflator.push(input, true); // That will never happens, if you don't cheat with options :)

  if (inflator.err) {
    throw inflator.msg || msg[inflator.err];
  }

  return inflator.result;
}
/**
 * inflateRaw(data[, options]) -> Uint8Array|Array|String
 * - data (Uint8Array|Array|String): input data to decompress.
 * - options (Object): zlib inflate options.
 *
 * The same as [[inflate]], but creates raw data, without wrapper
 * (header and adler32 crc).
 **/


function inflateRaw(input, options) {
  options = options || {};
  options.raw = true;
  return inflate(input, options);
}
/**
 * ungzip(data[, options]) -> Uint8Array|Array|String
 * - data (Uint8Array|Array|String): input data to decompress.
 * - options (Object): zlib inflate options.
 *
 * Just shortcut to [[inflate]], because it autodetects format
 * by header.content. Done for convenience.
 **/


exports.Inflate = Inflate;
exports.inflate = inflate;
exports.inflateRaw = inflateRaw;
exports.ungzip = inflate;

/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
 // (C) 1995-2013 Jean-loup Gailly and Mark Adler
// (C) 2014-2017 Vitaly Puzrin and Andrey Tupitsin
//
// This software is provided 'as-is', without any express or implied
// warranty. In no event will the authors be held liable for any damages
// arising from the use of this software.
//
// Permission is granted to anyone to use this software for any purpose,
// including commercial applications, and to alter it and redistribute it
// freely, subject to the following restrictions:
//
// 1. The origin of this software must not be misrepresented; you must not
//   claim that you wrote the original software. If you use this software
//   in a product, an acknowledgment in the product documentation would be
//   appreciated but is not required.
// 2. Altered source versions must be plainly marked as such, and must not be
//   misrepresented as being the original software.
// 3. This notice may not be removed or altered from any source distribution.

var utils = __webpack_require__(16);

var adler32 = __webpack_require__(20);

var crc32 = __webpack_require__(21);

var inflate_fast = __webpack_require__(27);

var inflate_table = __webpack_require__(28);

var CODES = 0;
var LENS = 1;
var DISTS = 2;
/* Public constants ==========================================================*/

/* ===========================================================================*/

/* Allowed flush values; see deflate() and inflate() below for details */
//var Z_NO_FLUSH      = 0;
//var Z_PARTIAL_FLUSH = 1;
//var Z_SYNC_FLUSH    = 2;
//var Z_FULL_FLUSH    = 3;

var Z_FINISH = 4;
var Z_BLOCK = 5;
var Z_TREES = 6;
/* Return codes for the compression/decompression functions. Negative values
 * are errors, positive values are used for special but normal events.
 */

var Z_OK = 0;
var Z_STREAM_END = 1;
var Z_NEED_DICT = 2; //var Z_ERRNO         = -1;

var Z_STREAM_ERROR = -2;
var Z_DATA_ERROR = -3;
var Z_MEM_ERROR = -4;
var Z_BUF_ERROR = -5; //var Z_VERSION_ERROR = -6;

/* The deflate compression method */

var Z_DEFLATED = 8;
/* STATES ====================================================================*/

/* ===========================================================================*/

var HEAD = 1;
/* i: waiting for magic header */

var FLAGS = 2;
/* i: waiting for method and flags (gzip) */

var TIME = 3;
/* i: waiting for modification time (gzip) */

var OS = 4;
/* i: waiting for extra flags and operating system (gzip) */

var EXLEN = 5;
/* i: waiting for extra length (gzip) */

var EXTRA = 6;
/* i: waiting for extra bytes (gzip) */

var NAME = 7;
/* i: waiting for end of file name (gzip) */

var COMMENT = 8;
/* i: waiting for end of comment (gzip) */

var HCRC = 9;
/* i: waiting for header crc (gzip) */

var DICTID = 10;
/* i: waiting for dictionary check value */

var DICT = 11;
/* waiting for inflateSetDictionary() call */

var TYPE = 12;
/* i: waiting for type bits, including last-flag bit */

var TYPEDO = 13;
/* i: same, but skip check to exit inflate on new block */

var STORED = 14;
/* i: waiting for stored size (length and complement) */

var COPY_ = 15;
/* i/o: same as COPY below, but only first time in */

var COPY = 16;
/* i/o: waiting for input or output to copy stored block */

var TABLE = 17;
/* i: waiting for dynamic block table lengths */

var LENLENS = 18;
/* i: waiting for code length code lengths */

var CODELENS = 19;
/* i: waiting for length/lit and distance code lengths */

var LEN_ = 20;
/* i: same as LEN below, but only first time in */

var LEN = 21;
/* i: waiting for length/lit/eob code */

var LENEXT = 22;
/* i: waiting for length extra bits */

var DIST = 23;
/* i: waiting for distance code */

var DISTEXT = 24;
/* i: waiting for distance extra bits */

var MATCH = 25;
/* o: waiting for output space to copy string */

var LIT = 26;
/* o: waiting for output space to write literal */

var CHECK = 27;
/* i: waiting for 32-bit check value */

var LENGTH = 28;
/* i: waiting for 32-bit length (gzip) */

var DONE = 29;
/* finished check, done -- remain here until reset */

var BAD = 30;
/* got a data error -- remain here until reset */

var MEM = 31;
/* got an inflate() memory error -- remain here until reset */

var SYNC = 32;
/* looking for synchronization bytes to restart inflate() */

/* ===========================================================================*/

var ENOUGH_LENS = 852;
var ENOUGH_DISTS = 592; //var ENOUGH =  (ENOUGH_LENS+ENOUGH_DISTS);

var MAX_WBITS = 15;
/* 32K LZ77 window */

var DEF_WBITS = MAX_WBITS;

function zswap32(q) {
  return (q >>> 24 & 0xff) + (q >>> 8 & 0xff00) + ((q & 0xff00) << 8) + ((q & 0xff) << 24);
}

function InflateState() {
  this.mode = 0;
  /* current inflate mode */

  this.last = false;
  /* true if processing last block */

  this.wrap = 0;
  /* bit 0 true for zlib, bit 1 true for gzip */

  this.havedict = false;
  /* true if dictionary provided */

  this.flags = 0;
  /* gzip header method and flags (0 if zlib) */

  this.dmax = 0;
  /* zlib header max distance (INFLATE_STRICT) */

  this.check = 0;
  /* protected copy of check value */

  this.total = 0;
  /* protected copy of output count */
  // TODO: may be {}

  this.head = null;
  /* where to save gzip header information */

  /* sliding window */

  this.wbits = 0;
  /* log base 2 of requested window size */

  this.wsize = 0;
  /* window size or zero if not using window */

  this.whave = 0;
  /* valid bytes in the window */

  this.wnext = 0;
  /* window write index */

  this.window = null;
  /* allocated sliding window, if needed */

  /* bit accumulator */

  this.hold = 0;
  /* input bit accumulator */

  this.bits = 0;
  /* number of bits in "in" */

  /* for string and stored block copying */

  this.length = 0;
  /* literal or length of data to copy */

  this.offset = 0;
  /* distance back to copy string from */

  /* for table and code decoding */

  this.extra = 0;
  /* extra bits needed */

  /* fixed and dynamic code tables */

  this.lencode = null;
  /* starting table for length/literal codes */

  this.distcode = null;
  /* starting table for distance codes */

  this.lenbits = 0;
  /* index bits for lencode */

  this.distbits = 0;
  /* index bits for distcode */

  /* dynamic table building */

  this.ncode = 0;
  /* number of code length code lengths */

  this.nlen = 0;
  /* number of length code lengths */

  this.ndist = 0;
  /* number of distance code lengths */

  this.have = 0;
  /* number of code lengths in lens[] */

  this.next = null;
  /* next available space in codes[] */

  this.lens = new utils.Buf16(320);
  /* temporary storage for code lengths */

  this.work = new utils.Buf16(288);
  /* work area for code table building */

  /*
   because we don't have pointers in js, we use lencode and distcode directly
   as buffers so we don't need codes
  */
  //this.codes = new utils.Buf32(ENOUGH);       /* space for code tables */

  this.lendyn = null;
  /* dynamic table for length/literal codes (JS specific) */

  this.distdyn = null;
  /* dynamic table for distance codes (JS specific) */

  this.sane = 0;
  /* if false, allow invalid distance too far */

  this.back = 0;
  /* bits back of last unprocessed length/lit */

  this.was = 0;
  /* initial length of match */
}

function inflateResetKeep(strm) {
  var state;

  if (!strm || !strm.state) {
    return Z_STREAM_ERROR;
  }

  state = strm.state;
  strm.total_in = strm.total_out = state.total = 0;
  strm.msg = '';
  /*Z_NULL*/

  if (state.wrap) {
    /* to support ill-conceived Java test suite */
    strm.adler = state.wrap & 1;
  }

  state.mode = HEAD;
  state.last = 0;
  state.havedict = 0;
  state.dmax = 32768;
  state.head = null
  /*Z_NULL*/
  ;
  state.hold = 0;
  state.bits = 0; //state.lencode = state.distcode = state.next = state.codes;

  state.lencode = state.lendyn = new utils.Buf32(ENOUGH_LENS);
  state.distcode = state.distdyn = new utils.Buf32(ENOUGH_DISTS);
  state.sane = 1;
  state.back = -1; //Tracev((stderr, "inflate: reset\n"));

  return Z_OK;
}

function inflateReset(strm) {
  var state;

  if (!strm || !strm.state) {
    return Z_STREAM_ERROR;
  }

  state = strm.state;
  state.wsize = 0;
  state.whave = 0;
  state.wnext = 0;
  return inflateResetKeep(strm);
}

function inflateReset2(strm, windowBits) {
  var wrap;
  var state;
  /* get the state */

  if (!strm || !strm.state) {
    return Z_STREAM_ERROR;
  }

  state = strm.state;
  /* extract wrap request from windowBits parameter */

  if (windowBits < 0) {
    wrap = 0;
    windowBits = -windowBits;
  } else {
    wrap = (windowBits >> 4) + 1;

    if (windowBits < 48) {
      windowBits &= 15;
    }
  }
  /* set number of window bits, free window if different */


  if (windowBits && (windowBits < 8 || windowBits > 15)) {
    return Z_STREAM_ERROR;
  }

  if (state.window !== null && state.wbits !== windowBits) {
    state.window = null;
  }
  /* update state and reset the rest of it */


  state.wrap = wrap;
  state.wbits = windowBits;
  return inflateReset(strm);
}

function inflateInit2(strm, windowBits) {
  var ret;
  var state;

  if (!strm) {
    return Z_STREAM_ERROR;
  } //strm.msg = Z_NULL;                 /* in case we return an error */


  state = new InflateState(); //if (state === Z_NULL) return Z_MEM_ERROR;
  //Tracev((stderr, "inflate: allocated\n"));

  strm.state = state;
  state.window = null
  /*Z_NULL*/
  ;
  ret = inflateReset2(strm, windowBits);

  if (ret !== Z_OK) {
    strm.state = null
    /*Z_NULL*/
    ;
  }

  return ret;
}

function inflateInit(strm) {
  return inflateInit2(strm, DEF_WBITS);
}
/*
 Return state with length and distance decoding tables and index sizes set to
 fixed code decoding.  Normally this returns fixed tables from inffixed.h.
 If BUILDFIXED is defined, then instead this routine builds the tables the
 first time it's called, and returns those tables the first time and
 thereafter.  This reduces the size of the code by about 2K bytes, in
 exchange for a little execution time.  However, BUILDFIXED should not be
 used for threaded applications, since the rewriting of the tables and virgin
 may not be thread-safe.
 */


var virgin = true;
var lenfix, distfix; // We have no pointers in JS, so keep tables separate

function fixedtables(state) {
  /* build fixed huffman tables if first call (may not be thread safe) */
  if (virgin) {
    var sym;
    lenfix = new utils.Buf32(512);
    distfix = new utils.Buf32(32);
    /* literal/length table */

    sym = 0;

    while (sym < 144) {
      state.lens[sym++] = 8;
    }

    while (sym < 256) {
      state.lens[sym++] = 9;
    }

    while (sym < 280) {
      state.lens[sym++] = 7;
    }

    while (sym < 288) {
      state.lens[sym++] = 8;
    }

    inflate_table(LENS, state.lens, 0, 288, lenfix, 0, state.work, {
      bits: 9
    });
    /* distance table */

    sym = 0;

    while (sym < 32) {
      state.lens[sym++] = 5;
    }

    inflate_table(DISTS, state.lens, 0, 32, distfix, 0, state.work, {
      bits: 5
    });
    /* do this just once */

    virgin = false;
  }

  state.lencode = lenfix;
  state.lenbits = 9;
  state.distcode = distfix;
  state.distbits = 5;
}
/*
 Update the window with the last wsize (normally 32K) bytes written before
 returning.  If window does not exist yet, create it.  This is only called
 when a window is already in use, or when output has been written during this
 inflate call, but the end of the deflate stream has not been reached yet.
 It is also called to create a window for dictionary data when a dictionary
 is loaded.

 Providing output buffers larger than 32K to inflate() should provide a speed
 advantage, since only the last 32K of output is copied to the sliding window
 upon return from inflate(), and since all distances after the first 32K of
 output will fall in the output data, making match copies simpler and faster.
 The advantage may be dependent on the size of the processor's data caches.
 */


function updatewindow(strm, src, end, copy) {
  var dist;
  var state = strm.state;
  /* if it hasn't been done already, allocate space for the window */

  if (state.window === null) {
    state.wsize = 1 << state.wbits;
    state.wnext = 0;
    state.whave = 0;
    state.window = new utils.Buf8(state.wsize);
  }
  /* copy state->wsize or less output bytes into the circular window */


  if (copy >= state.wsize) {
    utils.arraySet(state.window, src, end - state.wsize, state.wsize, 0);
    state.wnext = 0;
    state.whave = state.wsize;
  } else {
    dist = state.wsize - state.wnext;

    if (dist > copy) {
      dist = copy;
    } //zmemcpy(state->window + state->wnext, end - copy, dist);


    utils.arraySet(state.window, src, end - copy, dist, state.wnext);
    copy -= dist;

    if (copy) {
      //zmemcpy(state->window, end - copy, copy);
      utils.arraySet(state.window, src, end - copy, copy, 0);
      state.wnext = copy;
      state.whave = state.wsize;
    } else {
      state.wnext += dist;

      if (state.wnext === state.wsize) {
        state.wnext = 0;
      }

      if (state.whave < state.wsize) {
        state.whave += dist;
      }
    }
  }

  return 0;
}

function inflate(strm, flush) {
  var state;
  var input, output; // input/output buffers

  var next;
  /* next input INDEX */

  var put;
  /* next output INDEX */

  var have, left;
  /* available input and output */

  var hold;
  /* bit buffer */

  var bits;
  /* bits in bit buffer */

  var _in, _out;
  /* save starting available input and output */


  var copy;
  /* number of stored or match bytes to copy */

  var from;
  /* where to copy match bytes from */

  var from_source;
  var here = 0;
  /* current decoding table entry */

  var here_bits, here_op, here_val; // paked "here" denormalized (JS specific)
  //var last;                   /* parent table entry */

  var last_bits, last_op, last_val; // paked "last" denormalized (JS specific)

  var len;
  /* length to copy for repeats, bits to drop */

  var ret;
  /* return code */

  var hbuf = new utils.Buf8(4);
  /* buffer for gzip header crc calculation */

  var opts;
  var n; // temporary var for NEED_BITS

  var order =
  /* permutation of code lengths */
  [16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15];

  if (!strm || !strm.state || !strm.output || !strm.input && strm.avail_in !== 0) {
    return Z_STREAM_ERROR;
  }

  state = strm.state;

  if (state.mode === TYPE) {
    state.mode = TYPEDO;
  }
  /* skip check */
  //--- LOAD() ---


  put = strm.next_out;
  output = strm.output;
  left = strm.avail_out;
  next = strm.next_in;
  input = strm.input;
  have = strm.avail_in;
  hold = state.hold;
  bits = state.bits; //---

  _in = have;
  _out = left;
  ret = Z_OK;

  inf_leave: // goto emulation
  for (;;) {
    switch (state.mode) {
      case HEAD:
        if (state.wrap === 0) {
          state.mode = TYPEDO;
          break;
        } //=== NEEDBITS(16);


        while (bits < 16) {
          if (have === 0) {
            break inf_leave;
          }

          have--;
          hold += input[next++] << bits;
          bits += 8;
        } //===//


        if (state.wrap & 2 && hold === 0x8b1f) {
          /* gzip header */
          state.check = 0
          /*crc32(0L, Z_NULL, 0)*/
          ; //=== CRC2(state.check, hold);

          hbuf[0] = hold & 0xff;
          hbuf[1] = hold >>> 8 & 0xff;
          state.check = crc32(state.check, hbuf, 2, 0); //===//
          //=== INITBITS();

          hold = 0;
          bits = 0; //===//

          state.mode = FLAGS;
          break;
        }

        state.flags = 0;
        /* expect zlib header */

        if (state.head) {
          state.head.done = false;
        }

        if (!(state.wrap & 1) ||
        /* check if zlib header allowed */
        (((hold & 0xff) <<
        /*BITS(8)*/
        8) + (hold >> 8)) % 31) {
          strm.msg = 'incorrect header check';
          state.mode = BAD;
          break;
        }

        if ((hold & 0x0f) !==
        /*BITS(4)*/
        Z_DEFLATED) {
          strm.msg = 'unknown compression method';
          state.mode = BAD;
          break;
        } //--- DROPBITS(4) ---//


        hold >>>= 4;
        bits -= 4; //---//

        len = (hold & 0x0f) +
        /*BITS(4)*/
        8;

        if (state.wbits === 0) {
          state.wbits = len;
        } else if (len > state.wbits) {
          strm.msg = 'invalid window size';
          state.mode = BAD;
          break;
        }

        state.dmax = 1 << len; //Tracev((stderr, "inflate:   zlib header ok\n"));

        strm.adler = state.check = 1
        /*adler32(0L, Z_NULL, 0)*/
        ;
        state.mode = hold & 0x200 ? DICTID : TYPE; //=== INITBITS();

        hold = 0;
        bits = 0; //===//

        break;

      case FLAGS:
        //=== NEEDBITS(16); */
        while (bits < 16) {
          if (have === 0) {
            break inf_leave;
          }

          have--;
          hold += input[next++] << bits;
          bits += 8;
        } //===//


        state.flags = hold;

        if ((state.flags & 0xff) !== Z_DEFLATED) {
          strm.msg = 'unknown compression method';
          state.mode = BAD;
          break;
        }

        if (state.flags & 0xe000) {
          strm.msg = 'unknown header flags set';
          state.mode = BAD;
          break;
        }

        if (state.head) {
          state.head.text = hold >> 8 & 1;
        }

        if (state.flags & 0x0200) {
          //=== CRC2(state.check, hold);
          hbuf[0] = hold & 0xff;
          hbuf[1] = hold >>> 8 & 0xff;
          state.check = crc32(state.check, hbuf, 2, 0); //===//
        } //=== INITBITS();


        hold = 0;
        bits = 0; //===//

        state.mode = TIME;

      /* falls through */

      case TIME:
        //=== NEEDBITS(32); */
        while (bits < 32) {
          if (have === 0) {
            break inf_leave;
          }

          have--;
          hold += input[next++] << bits;
          bits += 8;
        } //===//


        if (state.head) {
          state.head.time = hold;
        }

        if (state.flags & 0x0200) {
          //=== CRC4(state.check, hold)
          hbuf[0] = hold & 0xff;
          hbuf[1] = hold >>> 8 & 0xff;
          hbuf[2] = hold >>> 16 & 0xff;
          hbuf[3] = hold >>> 24 & 0xff;
          state.check = crc32(state.check, hbuf, 4, 0); //===
        } //=== INITBITS();


        hold = 0;
        bits = 0; //===//

        state.mode = OS;

      /* falls through */

      case OS:
        //=== NEEDBITS(16); */
        while (bits < 16) {
          if (have === 0) {
            break inf_leave;
          }

          have--;
          hold += input[next++] << bits;
          bits += 8;
        } //===//


        if (state.head) {
          state.head.xflags = hold & 0xff;
          state.head.os = hold >> 8;
        }

        if (state.flags & 0x0200) {
          //=== CRC2(state.check, hold);
          hbuf[0] = hold & 0xff;
          hbuf[1] = hold >>> 8 & 0xff;
          state.check = crc32(state.check, hbuf, 2, 0); //===//
        } //=== INITBITS();


        hold = 0;
        bits = 0; //===//

        state.mode = EXLEN;

      /* falls through */

      case EXLEN:
        if (state.flags & 0x0400) {
          //=== NEEDBITS(16); */
          while (bits < 16) {
            if (have === 0) {
              break inf_leave;
            }

            have--;
            hold += input[next++] << bits;
            bits += 8;
          } //===//


          state.length = hold;

          if (state.head) {
            state.head.extra_len = hold;
          }

          if (state.flags & 0x0200) {
            //=== CRC2(state.check, hold);
            hbuf[0] = hold & 0xff;
            hbuf[1] = hold >>> 8 & 0xff;
            state.check = crc32(state.check, hbuf, 2, 0); //===//
          } //=== INITBITS();


          hold = 0;
          bits = 0; //===//
        } else if (state.head) {
          state.head.extra = null
          /*Z_NULL*/
          ;
        }

        state.mode = EXTRA;

      /* falls through */

      case EXTRA:
        if (state.flags & 0x0400) {
          copy = state.length;

          if (copy > have) {
            copy = have;
          }

          if (copy) {
            if (state.head) {
              len = state.head.extra_len - state.length;

              if (!state.head.extra) {
                // Use untyped array for more convenient processing later
                state.head.extra = new Array(state.head.extra_len);
              }

              utils.arraySet(state.head.extra, input, next, // extra field is limited to 65536 bytes
              // - no need for additional size check
              copy,
              /*len + copy > state.head.extra_max - len ? state.head.extra_max : copy,*/
              len); //zmemcpy(state.head.extra + len, next,
              //        len + copy > state.head.extra_max ?
              //        state.head.extra_max - len : copy);
            }

            if (state.flags & 0x0200) {
              state.check = crc32(state.check, input, copy, next);
            }

            have -= copy;
            next += copy;
            state.length -= copy;
          }

          if (state.length) {
            break inf_leave;
          }
        }

        state.length = 0;
        state.mode = NAME;

      /* falls through */

      case NAME:
        if (state.flags & 0x0800) {
          if (have === 0) {
            break inf_leave;
          }

          copy = 0;

          do {
            // TODO: 2 or 1 bytes?
            len = input[next + copy++];
            /* use constant limit because in js we should not preallocate memory */

            if (state.head && len && state.length < 65536
            /*state.head.name_max*/
            ) {
              state.head.name += String.fromCharCode(len);
            }
          } while (len && copy < have);

          if (state.flags & 0x0200) {
            state.check = crc32(state.check, input, copy, next);
          }

          have -= copy;
          next += copy;

          if (len) {
            break inf_leave;
          }
        } else if (state.head) {
          state.head.name = null;
        }

        state.length = 0;
        state.mode = COMMENT;

      /* falls through */

      case COMMENT:
        if (state.flags & 0x1000) {
          if (have === 0) {
            break inf_leave;
          }

          copy = 0;

          do {
            len = input[next + copy++];
            /* use constant limit because in js we should not preallocate memory */

            if (state.head && len && state.length < 65536
            /*state.head.comm_max*/
            ) {
              state.head.comment += String.fromCharCode(len);
            }
          } while (len && copy < have);

          if (state.flags & 0x0200) {
            state.check = crc32(state.check, input, copy, next);
          }

          have -= copy;
          next += copy;

          if (len) {
            break inf_leave;
          }
        } else if (state.head) {
          state.head.comment = null;
        }

        state.mode = HCRC;

      /* falls through */

      case HCRC:
        if (state.flags & 0x0200) {
          //=== NEEDBITS(16); */
          while (bits < 16) {
            if (have === 0) {
              break inf_leave;
            }

            have--;
            hold += input[next++] << bits;
            bits += 8;
          } //===//


          if (hold !== (state.check & 0xffff)) {
            strm.msg = 'header crc mismatch';
            state.mode = BAD;
            break;
          } //=== INITBITS();


          hold = 0;
          bits = 0; //===//
        }

        if (state.head) {
          state.head.hcrc = state.flags >> 9 & 1;
          state.head.done = true;
        }

        strm.adler = state.check = 0;
        state.mode = TYPE;
        break;

      case DICTID:
        //=== NEEDBITS(32); */
        while (bits < 32) {
          if (have === 0) {
            break inf_leave;
          }

          have--;
          hold += input[next++] << bits;
          bits += 8;
        } //===//


        strm.adler = state.check = zswap32(hold); //=== INITBITS();

        hold = 0;
        bits = 0; //===//

        state.mode = DICT;

      /* falls through */

      case DICT:
        if (state.havedict === 0) {
          //--- RESTORE() ---
          strm.next_out = put;
          strm.avail_out = left;
          strm.next_in = next;
          strm.avail_in = have;
          state.hold = hold;
          state.bits = bits; //---

          return Z_NEED_DICT;
        }

        strm.adler = state.check = 1
        /*adler32(0L, Z_NULL, 0)*/
        ;
        state.mode = TYPE;

      /* falls through */

      case TYPE:
        if (flush === Z_BLOCK || flush === Z_TREES) {
          break inf_leave;
        }

      /* falls through */

      case TYPEDO:
        if (state.last) {
          //--- BYTEBITS() ---//
          hold >>>= bits & 7;
          bits -= bits & 7; //---//

          state.mode = CHECK;
          break;
        } //=== NEEDBITS(3); */


        while (bits < 3) {
          if (have === 0) {
            break inf_leave;
          }

          have--;
          hold += input[next++] << bits;
          bits += 8;
        } //===//


        state.last = hold & 0x01
        /*BITS(1)*/
        ; //--- DROPBITS(1) ---//

        hold >>>= 1;
        bits -= 1; //---//

        switch (hold & 0x03) {
          /*BITS(2)*/
          case 0:
            /* stored block */
            //Tracev((stderr, "inflate:     stored block%s\n",
            //        state.last ? " (last)" : ""));
            state.mode = STORED;
            break;

          case 1:
            /* fixed block */
            fixedtables(state); //Tracev((stderr, "inflate:     fixed codes block%s\n",
            //        state.last ? " (last)" : ""));

            state.mode = LEN_;
            /* decode codes */

            if (flush === Z_TREES) {
              //--- DROPBITS(2) ---//
              hold >>>= 2;
              bits -= 2; //---//

              break inf_leave;
            }

            break;

          case 2:
            /* dynamic block */
            //Tracev((stderr, "inflate:     dynamic codes block%s\n",
            //        state.last ? " (last)" : ""));
            state.mode = TABLE;
            break;

          case 3:
            strm.msg = 'invalid block type';
            state.mode = BAD;
        } //--- DROPBITS(2) ---//


        hold >>>= 2;
        bits -= 2; //---//

        break;

      case STORED:
        //--- BYTEBITS() ---// /* go to byte boundary */
        hold >>>= bits & 7;
        bits -= bits & 7; //---//
        //=== NEEDBITS(32); */

        while (bits < 32) {
          if (have === 0) {
            break inf_leave;
          }

          have--;
          hold += input[next++] << bits;
          bits += 8;
        } //===//


        if ((hold & 0xffff) !== (hold >>> 16 ^ 0xffff)) {
          strm.msg = 'invalid stored block lengths';
          state.mode = BAD;
          break;
        }

        state.length = hold & 0xffff; //Tracev((stderr, "inflate:       stored length %u\n",
        //        state.length));
        //=== INITBITS();

        hold = 0;
        bits = 0; //===//

        state.mode = COPY_;

        if (flush === Z_TREES) {
          break inf_leave;
        }

      /* falls through */

      case COPY_:
        state.mode = COPY;

      /* falls through */

      case COPY:
        copy = state.length;

        if (copy) {
          if (copy > have) {
            copy = have;
          }

          if (copy > left) {
            copy = left;
          }

          if (copy === 0) {
            break inf_leave;
          } //--- zmemcpy(put, next, copy); ---


          utils.arraySet(output, input, next, copy, put); //---//

          have -= copy;
          next += copy;
          left -= copy;
          put += copy;
          state.length -= copy;
          break;
        } //Tracev((stderr, "inflate:       stored end\n"));


        state.mode = TYPE;
        break;

      case TABLE:
        //=== NEEDBITS(14); */
        while (bits < 14) {
          if (have === 0) {
            break inf_leave;
          }

          have--;
          hold += input[next++] << bits;
          bits += 8;
        } //===//


        state.nlen = (hold & 0x1f) +
        /*BITS(5)*/
        257; //--- DROPBITS(5) ---//

        hold >>>= 5;
        bits -= 5; //---//

        state.ndist = (hold & 0x1f) +
        /*BITS(5)*/
        1; //--- DROPBITS(5) ---//

        hold >>>= 5;
        bits -= 5; //---//

        state.ncode = (hold & 0x0f) +
        /*BITS(4)*/
        4; //--- DROPBITS(4) ---//

        hold >>>= 4;
        bits -= 4; //---//
        //#ifndef PKZIP_BUG_WORKAROUND

        if (state.nlen > 286 || state.ndist > 30) {
          strm.msg = 'too many length or distance symbols';
          state.mode = BAD;
          break;
        } //#endif
        //Tracev((stderr, "inflate:       table sizes ok\n"));


        state.have = 0;
        state.mode = LENLENS;

      /* falls through */

      case LENLENS:
        while (state.have < state.ncode) {
          //=== NEEDBITS(3);
          while (bits < 3) {
            if (have === 0) {
              break inf_leave;
            }

            have--;
            hold += input[next++] << bits;
            bits += 8;
          } //===//


          state.lens[order[state.have++]] = hold & 0x07; //BITS(3);
          //--- DROPBITS(3) ---//

          hold >>>= 3;
          bits -= 3; //---//
        }

        while (state.have < 19) {
          state.lens[order[state.have++]] = 0;
        } // We have separate tables & no pointers. 2 commented lines below not needed.
        //state.next = state.codes;
        //state.lencode = state.next;
        // Switch to use dynamic table


        state.lencode = state.lendyn;
        state.lenbits = 7;
        opts = {
          bits: state.lenbits
        };
        ret = inflate_table(CODES, state.lens, 0, 19, state.lencode, 0, state.work, opts);
        state.lenbits = opts.bits;

        if (ret) {
          strm.msg = 'invalid code lengths set';
          state.mode = BAD;
          break;
        } //Tracev((stderr, "inflate:       code lengths ok\n"));


        state.have = 0;
        state.mode = CODELENS;

      /* falls through */

      case CODELENS:
        while (state.have < state.nlen + state.ndist) {
          for (;;) {
            here = state.lencode[hold & (1 << state.lenbits) - 1];
            /*BITS(state.lenbits)*/

            here_bits = here >>> 24;
            here_op = here >>> 16 & 0xff;
            here_val = here & 0xffff;

            if (here_bits <= bits) {
              break;
            } //--- PULLBYTE() ---//


            if (have === 0) {
              break inf_leave;
            }

            have--;
            hold += input[next++] << bits;
            bits += 8; //---//
          }

          if (here_val < 16) {
            //--- DROPBITS(here.bits) ---//
            hold >>>= here_bits;
            bits -= here_bits; //---//

            state.lens[state.have++] = here_val;
          } else {
            if (here_val === 16) {
              //=== NEEDBITS(here.bits + 2);
              n = here_bits + 2;

              while (bits < n) {
                if (have === 0) {
                  break inf_leave;
                }

                have--;
                hold += input[next++] << bits;
                bits += 8;
              } //===//
              //--- DROPBITS(here.bits) ---//


              hold >>>= here_bits;
              bits -= here_bits; //---//

              if (state.have === 0) {
                strm.msg = 'invalid bit length repeat';
                state.mode = BAD;
                break;
              }

              len = state.lens[state.have - 1];
              copy = 3 + (hold & 0x03); //BITS(2);
              //--- DROPBITS(2) ---//

              hold >>>= 2;
              bits -= 2; //---//
            } else if (here_val === 17) {
              //=== NEEDBITS(here.bits + 3);
              n = here_bits + 3;

              while (bits < n) {
                if (have === 0) {
                  break inf_leave;
                }

                have--;
                hold += input[next++] << bits;
                bits += 8;
              } //===//
              //--- DROPBITS(here.bits) ---//


              hold >>>= here_bits;
              bits -= here_bits; //---//

              len = 0;
              copy = 3 + (hold & 0x07); //BITS(3);
              //--- DROPBITS(3) ---//

              hold >>>= 3;
              bits -= 3; //---//
            } else {
              //=== NEEDBITS(here.bits + 7);
              n = here_bits + 7;

              while (bits < n) {
                if (have === 0) {
                  break inf_leave;
                }

                have--;
                hold += input[next++] << bits;
                bits += 8;
              } //===//
              //--- DROPBITS(here.bits) ---//


              hold >>>= here_bits;
              bits -= here_bits; //---//

              len = 0;
              copy = 11 + (hold & 0x7f); //BITS(7);
              //--- DROPBITS(7) ---//

              hold >>>= 7;
              bits -= 7; //---//
            }

            if (state.have + copy > state.nlen + state.ndist) {
              strm.msg = 'invalid bit length repeat';
              state.mode = BAD;
              break;
            }

            while (copy--) {
              state.lens[state.have++] = len;
            }
          }
        }
        /* handle error breaks in while */


        if (state.mode === BAD) {
          break;
        }
        /* check for end-of-block code (better have one) */


        if (state.lens[256] === 0) {
          strm.msg = 'invalid code -- missing end-of-block';
          state.mode = BAD;
          break;
        }
        /* build code tables -- note: do not change the lenbits or distbits
           values here (9 and 6) without reading the comments in inftrees.h
           concerning the ENOUGH constants, which depend on those values */


        state.lenbits = 9;
        opts = {
          bits: state.lenbits
        };
        ret = inflate_table(LENS, state.lens, 0, state.nlen, state.lencode, 0, state.work, opts); // We have separate tables & no pointers. 2 commented lines below not needed.
        // state.next_index = opts.table_index;

        state.lenbits = opts.bits; // state.lencode = state.next;

        if (ret) {
          strm.msg = 'invalid literal/lengths set';
          state.mode = BAD;
          break;
        }

        state.distbits = 6; //state.distcode.copy(state.codes);
        // Switch to use dynamic table

        state.distcode = state.distdyn;
        opts = {
          bits: state.distbits
        };
        ret = inflate_table(DISTS, state.lens, state.nlen, state.ndist, state.distcode, 0, state.work, opts); // We have separate tables & no pointers. 2 commented lines below not needed.
        // state.next_index = opts.table_index;

        state.distbits = opts.bits; // state.distcode = state.next;

        if (ret) {
          strm.msg = 'invalid distances set';
          state.mode = BAD;
          break;
        } //Tracev((stderr, 'inflate:       codes ok\n'));


        state.mode = LEN_;

        if (flush === Z_TREES) {
          break inf_leave;
        }

      /* falls through */

      case LEN_:
        state.mode = LEN;

      /* falls through */

      case LEN:
        if (have >= 6 && left >= 258) {
          //--- RESTORE() ---
          strm.next_out = put;
          strm.avail_out = left;
          strm.next_in = next;
          strm.avail_in = have;
          state.hold = hold;
          state.bits = bits; //---

          inflate_fast(strm, _out); //--- LOAD() ---

          put = strm.next_out;
          output = strm.output;
          left = strm.avail_out;
          next = strm.next_in;
          input = strm.input;
          have = strm.avail_in;
          hold = state.hold;
          bits = state.bits; //---

          if (state.mode === TYPE) {
            state.back = -1;
          }

          break;
        }

        state.back = 0;

        for (;;) {
          here = state.lencode[hold & (1 << state.lenbits) - 1];
          /*BITS(state.lenbits)*/

          here_bits = here >>> 24;
          here_op = here >>> 16 & 0xff;
          here_val = here & 0xffff;

          if (here_bits <= bits) {
            break;
          } //--- PULLBYTE() ---//


          if (have === 0) {
            break inf_leave;
          }

          have--;
          hold += input[next++] << bits;
          bits += 8; //---//
        }

        if (here_op && (here_op & 0xf0) === 0) {
          last_bits = here_bits;
          last_op = here_op;
          last_val = here_val;

          for (;;) {
            here = state.lencode[last_val + ((hold & (1 << last_bits + last_op) - 1) >>
            /*BITS(last.bits + last.op)*/
            last_bits)];
            here_bits = here >>> 24;
            here_op = here >>> 16 & 0xff;
            here_val = here & 0xffff;

            if (last_bits + here_bits <= bits) {
              break;
            } //--- PULLBYTE() ---//


            if (have === 0) {
              break inf_leave;
            }

            have--;
            hold += input[next++] << bits;
            bits += 8; //---//
          } //--- DROPBITS(last.bits) ---//


          hold >>>= last_bits;
          bits -= last_bits; //---//

          state.back += last_bits;
        } //--- DROPBITS(here.bits) ---//


        hold >>>= here_bits;
        bits -= here_bits; //---//

        state.back += here_bits;
        state.length = here_val;

        if (here_op === 0) {
          //Tracevv((stderr, here.val >= 0x20 && here.val < 0x7f ?
          //        "inflate:         literal '%c'\n" :
          //        "inflate:         literal 0x%02x\n", here.val));
          state.mode = LIT;
          break;
        }

        if (here_op & 32) {
          //Tracevv((stderr, "inflate:         end of block\n"));
          state.back = -1;
          state.mode = TYPE;
          break;
        }

        if (here_op & 64) {
          strm.msg = 'invalid literal/length code';
          state.mode = BAD;
          break;
        }

        state.extra = here_op & 15;
        state.mode = LENEXT;

      /* falls through */

      case LENEXT:
        if (state.extra) {
          //=== NEEDBITS(state.extra);
          n = state.extra;

          while (bits < n) {
            if (have === 0) {
              break inf_leave;
            }

            have--;
            hold += input[next++] << bits;
            bits += 8;
          } //===//


          state.length += hold & (1 << state.extra) - 1
          /*BITS(state.extra)*/
          ; //--- DROPBITS(state.extra) ---//

          hold >>>= state.extra;
          bits -= state.extra; //---//

          state.back += state.extra;
        } //Tracevv((stderr, "inflate:         length %u\n", state.length));


        state.was = state.length;
        state.mode = DIST;

      /* falls through */

      case DIST:
        for (;;) {
          here = state.distcode[hold & (1 << state.distbits) - 1];
          /*BITS(state.distbits)*/

          here_bits = here >>> 24;
          here_op = here >>> 16 & 0xff;
          here_val = here & 0xffff;

          if (here_bits <= bits) {
            break;
          } //--- PULLBYTE() ---//


          if (have === 0) {
            break inf_leave;
          }

          have--;
          hold += input[next++] << bits;
          bits += 8; //---//
        }

        if ((here_op & 0xf0) === 0) {
          last_bits = here_bits;
          last_op = here_op;
          last_val = here_val;

          for (;;) {
            here = state.distcode[last_val + ((hold & (1 << last_bits + last_op) - 1) >>
            /*BITS(last.bits + last.op)*/
            last_bits)];
            here_bits = here >>> 24;
            here_op = here >>> 16 & 0xff;
            here_val = here & 0xffff;

            if (last_bits + here_bits <= bits) {
              break;
            } //--- PULLBYTE() ---//


            if (have === 0) {
              break inf_leave;
            }

            have--;
            hold += input[next++] << bits;
            bits += 8; //---//
          } //--- DROPBITS(last.bits) ---//


          hold >>>= last_bits;
          bits -= last_bits; //---//

          state.back += last_bits;
        } //--- DROPBITS(here.bits) ---//


        hold >>>= here_bits;
        bits -= here_bits; //---//

        state.back += here_bits;

        if (here_op & 64) {
          strm.msg = 'invalid distance code';
          state.mode = BAD;
          break;
        }

        state.offset = here_val;
        state.extra = here_op & 15;
        state.mode = DISTEXT;

      /* falls through */

      case DISTEXT:
        if (state.extra) {
          //=== NEEDBITS(state.extra);
          n = state.extra;

          while (bits < n) {
            if (have === 0) {
              break inf_leave;
            }

            have--;
            hold += input[next++] << bits;
            bits += 8;
          } //===//


          state.offset += hold & (1 << state.extra) - 1
          /*BITS(state.extra)*/
          ; //--- DROPBITS(state.extra) ---//

          hold >>>= state.extra;
          bits -= state.extra; //---//

          state.back += state.extra;
        } //#ifdef INFLATE_STRICT


        if (state.offset > state.dmax) {
          strm.msg = 'invalid distance too far back';
          state.mode = BAD;
          break;
        } //#endif
        //Tracevv((stderr, "inflate:         distance %u\n", state.offset));


        state.mode = MATCH;

      /* falls through */

      case MATCH:
        if (left === 0) {
          break inf_leave;
        }

        copy = _out - left;

        if (state.offset > copy) {
          /* copy from window */
          copy = state.offset - copy;

          if (copy > state.whave) {
            if (state.sane) {
              strm.msg = 'invalid distance too far back';
              state.mode = BAD;
              break;
            } // (!) This block is disabled in zlib defaults,
            // don't enable it for binary compatibility
            //#ifdef INFLATE_ALLOW_INVALID_DISTANCE_TOOFAR_ARRR
            //          Trace((stderr, "inflate.c too far\n"));
            //          copy -= state.whave;
            //          if (copy > state.length) { copy = state.length; }
            //          if (copy > left) { copy = left; }
            //          left -= copy;
            //          state.length -= copy;
            //          do {
            //            output[put++] = 0;
            //          } while (--copy);
            //          if (state.length === 0) { state.mode = LEN; }
            //          break;
            //#endif

          }

          if (copy > state.wnext) {
            copy -= state.wnext;
            from = state.wsize - copy;
          } else {
            from = state.wnext - copy;
          }

          if (copy > state.length) {
            copy = state.length;
          }

          from_source = state.window;
        } else {
          /* copy from output */
          from_source = output;
          from = put - state.offset;
          copy = state.length;
        }

        if (copy > left) {
          copy = left;
        }

        left -= copy;
        state.length -= copy;

        do {
          output[put++] = from_source[from++];
        } while (--copy);

        if (state.length === 0) {
          state.mode = LEN;
        }

        break;

      case LIT:
        if (left === 0) {
          break inf_leave;
        }

        output[put++] = state.length;
        left--;
        state.mode = LEN;
        break;

      case CHECK:
        if (state.wrap) {
          //=== NEEDBITS(32);
          while (bits < 32) {
            if (have === 0) {
              break inf_leave;
            }

            have--; // Use '|' instead of '+' to make sure that result is signed

            hold |= input[next++] << bits;
            bits += 8;
          } //===//


          _out -= left;
          strm.total_out += _out;
          state.total += _out;

          if (_out) {
            strm.adler = state.check =
            /*UPDATE(state.check, put - _out, _out);*/
            state.flags ? crc32(state.check, output, _out, put - _out) : adler32(state.check, output, _out, put - _out);
          }

          _out = left; // NB: crc32 stored as signed 32-bit int, zswap32 returns signed too

          if ((state.flags ? hold : zswap32(hold)) !== state.check) {
            strm.msg = 'incorrect data check';
            state.mode = BAD;
            break;
          } //=== INITBITS();


          hold = 0;
          bits = 0; //===//
          //Tracev((stderr, "inflate:   check matches trailer\n"));
        }

        state.mode = LENGTH;

      /* falls through */

      case LENGTH:
        if (state.wrap && state.flags) {
          //=== NEEDBITS(32);
          while (bits < 32) {
            if (have === 0) {
              break inf_leave;
            }

            have--;
            hold += input[next++] << bits;
            bits += 8;
          } //===//


          if (hold !== (state.total & 0xffffffff)) {
            strm.msg = 'incorrect length check';
            state.mode = BAD;
            break;
          } //=== INITBITS();


          hold = 0;
          bits = 0; //===//
          //Tracev((stderr, "inflate:   length matches trailer\n"));
        }

        state.mode = DONE;

      /* falls through */

      case DONE:
        ret = Z_STREAM_END;
        break inf_leave;

      case BAD:
        ret = Z_DATA_ERROR;
        break inf_leave;

      case MEM:
        return Z_MEM_ERROR;

      case SYNC:
      /* falls through */

      default:
        return Z_STREAM_ERROR;
    }
  } // inf_leave <- here is real place for "goto inf_leave", emulated via "break inf_leave"

  /*
     Return from inflate(), updating the total counts and the check value.
     If there was no progress during the inflate() call, return a buffer
     error.  Call updatewindow() to create and/or update the window state.
     Note: a memory error from inflate() is non-recoverable.
   */
  //--- RESTORE() ---


  strm.next_out = put;
  strm.avail_out = left;
  strm.next_in = next;
  strm.avail_in = have;
  state.hold = hold;
  state.bits = bits; //---

  if (state.wsize || _out !== strm.avail_out && state.mode < BAD && (state.mode < CHECK || flush !== Z_FINISH)) {
    if (updatewindow(strm, strm.output, strm.next_out, _out - strm.avail_out)) {
      state.mode = MEM;
      return Z_MEM_ERROR;
    }
  }

  _in -= strm.avail_in;
  _out -= strm.avail_out;
  strm.total_in += _in;
  strm.total_out += _out;
  state.total += _out;

  if (state.wrap && _out) {
    strm.adler = state.check =
    /*UPDATE(state.check, strm.next_out - _out, _out);*/
    state.flags ? crc32(state.check, output, _out, strm.next_out - _out) : adler32(state.check, output, _out, strm.next_out - _out);
  }

  strm.data_type = state.bits + (state.last ? 64 : 0) + (state.mode === TYPE ? 128 : 0) + (state.mode === LEN_ || state.mode === COPY_ ? 256 : 0);

  if ((_in === 0 && _out === 0 || flush === Z_FINISH) && ret === Z_OK) {
    ret = Z_BUF_ERROR;
  }

  return ret;
}

function inflateEnd(strm) {
  if (!strm || !strm.state
  /*|| strm->zfree == (free_func)0*/
  ) {
      return Z_STREAM_ERROR;
    }

  var state = strm.state;

  if (state.window) {
    state.window = null;
  }

  strm.state = null;
  return Z_OK;
}

function inflateGetHeader(strm, head) {
  var state;
  /* check state */

  if (!strm || !strm.state) {
    return Z_STREAM_ERROR;
  }

  state = strm.state;

  if ((state.wrap & 2) === 0) {
    return Z_STREAM_ERROR;
  }
  /* save header structure */


  state.head = head;
  head.done = false;
  return Z_OK;
}

function inflateSetDictionary(strm, dictionary) {
  var dictLength = dictionary.length;
  var state;
  var dictid;
  var ret;
  /* check state */

  if (!strm
  /* == Z_NULL */
  || !strm.state
  /* == Z_NULL */
  ) {
      return Z_STREAM_ERROR;
    }

  state = strm.state;

  if (state.wrap !== 0 && state.mode !== DICT) {
    return Z_STREAM_ERROR;
  }
  /* check for correct dictionary identifier */


  if (state.mode === DICT) {
    dictid = 1;
    /* adler32(0, null, 0)*/

    /* dictid = adler32(dictid, dictionary, dictLength); */

    dictid = adler32(dictid, dictionary, dictLength, 0);

    if (dictid !== state.check) {
      return Z_DATA_ERROR;
    }
  }
  /* copy dictionary to window using updatewindow(), which will amend the
   existing dictionary if appropriate */


  ret = updatewindow(strm, dictionary, dictLength, dictLength);

  if (ret) {
    state.mode = MEM;
    return Z_MEM_ERROR;
  }

  state.havedict = 1; // Tracev((stderr, "inflate:   dictionary set\n"));

  return Z_OK;
}

exports.inflateReset = inflateReset;
exports.inflateReset2 = inflateReset2;
exports.inflateResetKeep = inflateResetKeep;
exports.inflateInit = inflateInit;
exports.inflateInit2 = inflateInit2;
exports.inflate = inflate;
exports.inflateEnd = inflateEnd;
exports.inflateGetHeader = inflateGetHeader;
exports.inflateSetDictionary = inflateSetDictionary;
exports.inflateInfo = 'pako inflate (from Nodeca project)';
/* Not implemented
exports.inflateCopy = inflateCopy;
exports.inflateGetDictionary = inflateGetDictionary;
exports.inflateMark = inflateMark;
exports.inflatePrime = inflatePrime;
exports.inflateSync = inflateSync;
exports.inflateSyncPoint = inflateSyncPoint;
exports.inflateUndermine = inflateUndermine;
*/

/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
 // (C) 1995-2013 Jean-loup Gailly and Mark Adler
// (C) 2014-2017 Vitaly Puzrin and Andrey Tupitsin
//
// This software is provided 'as-is', without any express or implied
// warranty. In no event will the authors be held liable for any damages
// arising from the use of this software.
//
// Permission is granted to anyone to use this software for any purpose,
// including commercial applications, and to alter it and redistribute it
// freely, subject to the following restrictions:
//
// 1. The origin of this software must not be misrepresented; you must not
//   claim that you wrote the original software. If you use this software
//   in a product, an acknowledgment in the product documentation would be
//   appreciated but is not required.
// 2. Altered source versions must be plainly marked as such, and must not be
//   misrepresented as being the original software.
// 3. This notice may not be removed or altered from any source distribution.
// See state defs from inflate.js

var BAD = 30;
/* got a data error -- remain here until reset */

var TYPE = 12;
/* i: waiting for type bits, including last-flag bit */

/*
   Decode literal, length, and distance codes and write out the resulting
   literal and match bytes until either not enough input or output is
   available, an end-of-block is encountered, or a data error is encountered.
   When large enough input and output buffers are supplied to inflate(), for
   example, a 16K input buffer and a 64K output buffer, more than 95% of the
   inflate execution time is spent in this routine.

   Entry assumptions:

        state.mode === LEN
        strm.avail_in >= 6
        strm.avail_out >= 258
        start >= strm.avail_out
        state.bits < 8

   On return, state.mode is one of:

        LEN -- ran out of enough output space or enough available input
        TYPE -- reached end of block code, inflate() to interpret next block
        BAD -- error in block data

   Notes:

    - The maximum input bits used by a length/distance pair is 15 bits for the
      length code, 5 bits for the length extra, 15 bits for the distance code,
      and 13 bits for the distance extra.  This totals 48 bits, or six bytes.
      Therefore if strm.avail_in >= 6, then there is enough input to avoid
      checking for available input while decoding.

    - The maximum bytes that a single length/distance pair can output is 258
      bytes, which is the maximum length that can be coded.  inflate_fast()
      requires strm.avail_out >= 258 for each loop to avoid checking for
      output space.
 */

module.exports = function inflate_fast(strm, start) {
  var state;

  var _in;
  /* local strm.input */


  var last;
  /* have enough input while in < last */

  var _out;
  /* local strm.output */


  var beg;
  /* inflate()'s initial strm.output */

  var end;
  /* while out < end, enough space available */
  //#ifdef INFLATE_STRICT

  var dmax;
  /* maximum distance from zlib header */
  //#endif

  var wsize;
  /* window size or zero if not using window */

  var whave;
  /* valid bytes in the window */

  var wnext;
  /* window write index */
  // Use `s_window` instead `window`, avoid conflict with instrumentation tools

  var s_window;
  /* allocated sliding window, if wsize != 0 */

  var hold;
  /* local strm.hold */

  var bits;
  /* local strm.bits */

  var lcode;
  /* local strm.lencode */

  var dcode;
  /* local strm.distcode */

  var lmask;
  /* mask for first level of length codes */

  var dmask;
  /* mask for first level of distance codes */

  var here;
  /* retrieved table entry */

  var op;
  /* code bits, operation, extra bits, or */

  /*  window position, window bytes to copy */

  var len;
  /* match length, unused bytes */

  var dist;
  /* match distance */

  var from;
  /* where to copy match from */

  var from_source;
  var input, output; // JS specific, because we have no pointers

  /* copy state to local variables */

  state = strm.state; //here = state.here;

  _in = strm.next_in;
  input = strm.input;
  last = _in + (strm.avail_in - 5);
  _out = strm.next_out;
  output = strm.output;
  beg = _out - (start - strm.avail_out);
  end = _out + (strm.avail_out - 257); //#ifdef INFLATE_STRICT

  dmax = state.dmax; //#endif

  wsize = state.wsize;
  whave = state.whave;
  wnext = state.wnext;
  s_window = state.window;
  hold = state.hold;
  bits = state.bits;
  lcode = state.lencode;
  dcode = state.distcode;
  lmask = (1 << state.lenbits) - 1;
  dmask = (1 << state.distbits) - 1;
  /* decode literals and length/distances until end-of-block or not enough
     input data or output space */

  top: do {
    if (bits < 15) {
      hold += input[_in++] << bits;
      bits += 8;
      hold += input[_in++] << bits;
      bits += 8;
    }

    here = lcode[hold & lmask];

    dolen: for (;;) {
      // Goto emulation
      op = here >>> 24
      /*here.bits*/
      ;
      hold >>>= op;
      bits -= op;
      op = here >>> 16 & 0xff
      /*here.op*/
      ;

      if (op === 0) {
        /* literal */
        //Tracevv((stderr, here.val >= 0x20 && here.val < 0x7f ?
        //        "inflate:         literal '%c'\n" :
        //        "inflate:         literal 0x%02x\n", here.val));
        output[_out++] = here & 0xffff
        /*here.val*/
        ;
      } else if (op & 16) {
        /* length base */
        len = here & 0xffff
        /*here.val*/
        ;
        op &= 15;
        /* number of extra bits */

        if (op) {
          if (bits < op) {
            hold += input[_in++] << bits;
            bits += 8;
          }

          len += hold & (1 << op) - 1;
          hold >>>= op;
          bits -= op;
        } //Tracevv((stderr, "inflate:         length %u\n", len));


        if (bits < 15) {
          hold += input[_in++] << bits;
          bits += 8;
          hold += input[_in++] << bits;
          bits += 8;
        }

        here = dcode[hold & dmask];

        dodist: for (;;) {
          // goto emulation
          op = here >>> 24
          /*here.bits*/
          ;
          hold >>>= op;
          bits -= op;
          op = here >>> 16 & 0xff
          /*here.op*/
          ;

          if (op & 16) {
            /* distance base */
            dist = here & 0xffff
            /*here.val*/
            ;
            op &= 15;
            /* number of extra bits */

            if (bits < op) {
              hold += input[_in++] << bits;
              bits += 8;

              if (bits < op) {
                hold += input[_in++] << bits;
                bits += 8;
              }
            }

            dist += hold & (1 << op) - 1; //#ifdef INFLATE_STRICT

            if (dist > dmax) {
              strm.msg = 'invalid distance too far back';
              state.mode = BAD;
              break top;
            } //#endif


            hold >>>= op;
            bits -= op; //Tracevv((stderr, "inflate:         distance %u\n", dist));

            op = _out - beg;
            /* max distance in output */

            if (dist > op) {
              /* see if copy from window */
              op = dist - op;
              /* distance back in window */

              if (op > whave) {
                if (state.sane) {
                  strm.msg = 'invalid distance too far back';
                  state.mode = BAD;
                  break top;
                } // (!) This block is disabled in zlib defaults,
                // don't enable it for binary compatibility
                //#ifdef INFLATE_ALLOW_INVALID_DISTANCE_TOOFAR_ARRR
                //                if (len <= op - whave) {
                //                  do {
                //                    output[_out++] = 0;
                //                  } while (--len);
                //                  continue top;
                //                }
                //                len -= op - whave;
                //                do {
                //                  output[_out++] = 0;
                //                } while (--op > whave);
                //                if (op === 0) {
                //                  from = _out - dist;
                //                  do {
                //                    output[_out++] = output[from++];
                //                  } while (--len);
                //                  continue top;
                //                }
                //#endif

              }

              from = 0; // window index

              from_source = s_window;

              if (wnext === 0) {
                /* very common case */
                from += wsize - op;

                if (op < len) {
                  /* some from window */
                  len -= op;

                  do {
                    output[_out++] = s_window[from++];
                  } while (--op);

                  from = _out - dist;
                  /* rest from output */

                  from_source = output;
                }
              } else if (wnext < op) {
                /* wrap around window */
                from += wsize + wnext - op;
                op -= wnext;

                if (op < len) {
                  /* some from end of window */
                  len -= op;

                  do {
                    output[_out++] = s_window[from++];
                  } while (--op);

                  from = 0;

                  if (wnext < len) {
                    /* some from start of window */
                    op = wnext;
                    len -= op;

                    do {
                      output[_out++] = s_window[from++];
                    } while (--op);

                    from = _out - dist;
                    /* rest from output */

                    from_source = output;
                  }
                }
              } else {
                /* contiguous in window */
                from += wnext - op;

                if (op < len) {
                  /* some from window */
                  len -= op;

                  do {
                    output[_out++] = s_window[from++];
                  } while (--op);

                  from = _out - dist;
                  /* rest from output */

                  from_source = output;
                }
              }

              while (len > 2) {
                output[_out++] = from_source[from++];
                output[_out++] = from_source[from++];
                output[_out++] = from_source[from++];
                len -= 3;
              }

              if (len) {
                output[_out++] = from_source[from++];

                if (len > 1) {
                  output[_out++] = from_source[from++];
                }
              }
            } else {
              from = _out - dist;
              /* copy direct from output */

              do {
                /* minimum length is three */
                output[_out++] = output[from++];
                output[_out++] = output[from++];
                output[_out++] = output[from++];
                len -= 3;
              } while (len > 2);

              if (len) {
                output[_out++] = output[from++];

                if (len > 1) {
                  output[_out++] = output[from++];
                }
              }
            }
          } else if ((op & 64) === 0) {
            /* 2nd level distance code */
            here = dcode[(here & 0xffff) + (
            /*here.val*/
            hold & (1 << op) - 1)];
            continue dodist;
          } else {
            strm.msg = 'invalid distance code';
            state.mode = BAD;
            break top;
          }

          break; // need to emulate goto via "continue"
        }
      } else if ((op & 64) === 0) {
        /* 2nd level length code */
        here = lcode[(here & 0xffff) + (
        /*here.val*/
        hold & (1 << op) - 1)];
        continue dolen;
      } else if (op & 32) {
        /* end-of-block */
        //Tracevv((stderr, "inflate:         end of block\n"));
        state.mode = TYPE;
        break top;
      } else {
        strm.msg = 'invalid literal/length code';
        state.mode = BAD;
        break top;
      }

      break; // need to emulate goto via "continue"
    }
  } while (_in < last && _out < end);
  /* return unused bytes (on entry, bits < 8, so in won't go too far back) */


  len = bits >> 3;
  _in -= len;
  bits -= len << 3;
  hold &= (1 << bits) - 1;
  /* update state and return */

  strm.next_in = _in;
  strm.next_out = _out;
  strm.avail_in = _in < last ? 5 + (last - _in) : 5 - (_in - last);
  strm.avail_out = _out < end ? 257 + (end - _out) : 257 - (_out - end);
  state.hold = hold;
  state.bits = bits;
  return;
};

/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
 // (C) 1995-2013 Jean-loup Gailly and Mark Adler
// (C) 2014-2017 Vitaly Puzrin and Andrey Tupitsin
//
// This software is provided 'as-is', without any express or implied
// warranty. In no event will the authors be held liable for any damages
// arising from the use of this software.
//
// Permission is granted to anyone to use this software for any purpose,
// including commercial applications, and to alter it and redistribute it
// freely, subject to the following restrictions:
//
// 1. The origin of this software must not be misrepresented; you must not
//   claim that you wrote the original software. If you use this software
//   in a product, an acknowledgment in the product documentation would be
//   appreciated but is not required.
// 2. Altered source versions must be plainly marked as such, and must not be
//   misrepresented as being the original software.
// 3. This notice may not be removed or altered from any source distribution.

var utils = __webpack_require__(16);

var MAXBITS = 15;
var ENOUGH_LENS = 852;
var ENOUGH_DISTS = 592; //var ENOUGH = (ENOUGH_LENS+ENOUGH_DISTS);

var CODES = 0;
var LENS = 1;
var DISTS = 2;
var lbase = [
/* Length codes 257..285 base */
3, 4, 5, 6, 7, 8, 9, 10, 11, 13, 15, 17, 19, 23, 27, 31, 35, 43, 51, 59, 67, 83, 99, 115, 131, 163, 195, 227, 258, 0, 0];
var lext = [
/* Length codes 257..285 extra */
16, 16, 16, 16, 16, 16, 16, 16, 17, 17, 17, 17, 18, 18, 18, 18, 19, 19, 19, 19, 20, 20, 20, 20, 21, 21, 21, 21, 16, 72, 78];
var dbase = [
/* Distance codes 0..29 base */
1, 2, 3, 4, 5, 7, 9, 13, 17, 25, 33, 49, 65, 97, 129, 193, 257, 385, 513, 769, 1025, 1537, 2049, 3073, 4097, 6145, 8193, 12289, 16385, 24577, 0, 0];
var dext = [
/* Distance codes 0..29 extra */
16, 16, 16, 16, 17, 17, 18, 18, 19, 19, 20, 20, 21, 21, 22, 22, 23, 23, 24, 24, 25, 25, 26, 26, 27, 27, 28, 28, 29, 29, 64, 64];

module.exports = function inflate_table(type, lens, lens_index, codes, table, table_index, work, opts) {
  var bits = opts.bits; //here = opts.here; /* table entry for duplication */

  var len = 0;
  /* a code's length in bits */

  var sym = 0;
  /* index of code symbols */

  var min = 0,
      max = 0;
  /* minimum and maximum code lengths */

  var root = 0;
  /* number of index bits for root table */

  var curr = 0;
  /* number of index bits for current table */

  var drop = 0;
  /* code bits to drop for sub-table */

  var left = 0;
  /* number of prefix codes available */

  var used = 0;
  /* code entries in table used */

  var huff = 0;
  /* Huffman code */

  var incr;
  /* for incrementing code, index */

  var fill;
  /* index for replicating entries */

  var low;
  /* low bits for current root entry */

  var mask;
  /* mask for low root bits */

  var next;
  /* next available space in table */

  var base = null;
  /* base value table to use */

  var base_index = 0; //  var shoextra;    /* extra bits table to use */

  var end;
  /* use base and extra for symbol > end */

  var count = new utils.Buf16(MAXBITS + 1); //[MAXBITS+1];    /* number of codes of each length */

  var offs = new utils.Buf16(MAXBITS + 1); //[MAXBITS+1];     /* offsets in table for each length */

  var extra = null;
  var extra_index = 0;
  var here_bits, here_op, here_val;
  /*
   Process a set of code lengths to create a canonical Huffman code.  The
   code lengths are lens[0..codes-1].  Each length corresponds to the
   symbols 0..codes-1.  The Huffman code is generated by first sorting the
   symbols by length from short to long, and retaining the symbol order
   for codes with equal lengths.  Then the code starts with all zero bits
   for the first code of the shortest length, and the codes are integer
   increments for the same length, and zeros are appended as the length
   increases.  For the deflate format, these bits are stored backwards
   from their more natural integer increment ordering, and so when the
   decoding tables are built in the large loop below, the integer codes
   are incremented backwards.
    This routine assumes, but does not check, that all of the entries in
   lens[] are in the range 0..MAXBITS.  The caller must assure this.
   1..MAXBITS is interpreted as that code length.  zero means that that
   symbol does not occur in this code.
    The codes are sorted by computing a count of codes for each length,
   creating from that a table of starting indices for each length in the
   sorted table, and then entering the symbols in order in the sorted
   table.  The sorted table is work[], with that space being provided by
   the caller.
    The length counts are used for other purposes as well, i.e. finding
   the minimum and maximum length codes, determining if there are any
   codes at all, checking for a valid set of lengths, and looking ahead
   at length counts to determine sub-table sizes when building the
   decoding tables.
   */

  /* accumulate lengths for codes (assumes lens[] all in 0..MAXBITS) */

  for (len = 0; len <= MAXBITS; len++) {
    count[len] = 0;
  }

  for (sym = 0; sym < codes; sym++) {
    count[lens[lens_index + sym]]++;
  }
  /* bound code lengths, force root to be within code lengths */


  root = bits;

  for (max = MAXBITS; max >= 1; max--) {
    if (count[max] !== 0) {
      break;
    }
  }

  if (root > max) {
    root = max;
  }

  if (max === 0) {
    /* no symbols to code at all */
    //table.op[opts.table_index] = 64;  //here.op = (var char)64;    /* invalid code marker */
    //table.bits[opts.table_index] = 1;   //here.bits = (var char)1;
    //table.val[opts.table_index++] = 0;   //here.val = (var short)0;
    table[table_index++] = 1 << 24 | 64 << 16 | 0; //table.op[opts.table_index] = 64;
    //table.bits[opts.table_index] = 1;
    //table.val[opts.table_index++] = 0;

    table[table_index++] = 1 << 24 | 64 << 16 | 0;
    opts.bits = 1;
    return 0;
    /* no symbols, but wait for decoding to report error */
  }

  for (min = 1; min < max; min++) {
    if (count[min] !== 0) {
      break;
    }
  }

  if (root < min) {
    root = min;
  }
  /* check for an over-subscribed or incomplete set of lengths */


  left = 1;

  for (len = 1; len <= MAXBITS; len++) {
    left <<= 1;
    left -= count[len];

    if (left < 0) {
      return -1;
    }
    /* over-subscribed */

  }

  if (left > 0 && (type === CODES || max !== 1)) {
    return -1;
    /* incomplete set */
  }
  /* generate offsets into symbol table for each length for sorting */


  offs[1] = 0;

  for (len = 1; len < MAXBITS; len++) {
    offs[len + 1] = offs[len] + count[len];
  }
  /* sort symbols by length, by symbol order within each length */


  for (sym = 0; sym < codes; sym++) {
    if (lens[lens_index + sym] !== 0) {
      work[offs[lens[lens_index + sym]]++] = sym;
    }
  }
  /*
   Create and fill in decoding tables.  In this loop, the table being
   filled is at next and has curr index bits.  The code being used is huff
   with length len.  That code is converted to an index by dropping drop
   bits off of the bottom.  For codes where len is less than drop + curr,
   those top drop + curr - len bits are incremented through all values to
   fill the table with replicated entries.
    root is the number of index bits for the root table.  When len exceeds
   root, sub-tables are created pointed to by the root entry with an index
   of the low root bits of huff.  This is saved in low to check for when a
   new sub-table should be started.  drop is zero when the root table is
   being filled, and drop is root when sub-tables are being filled.
    When a new sub-table is needed, it is necessary to look ahead in the
   code lengths to determine what size sub-table is needed.  The length
   counts are used for this, and so count[] is decremented as codes are
   entered in the tables.
    used keeps track of how many table entries have been allocated from the
   provided *table space.  It is checked for LENS and DIST tables against
   the constants ENOUGH_LENS and ENOUGH_DISTS to guard against changes in
   the initial root table size constants.  See the comments in inftrees.h
   for more information.
    sym increments through all symbols, and the loop terminates when
   all codes of length max, i.e. all codes, have been processed.  This
   routine permits incomplete codes, so another loop after this one fills
   in the rest of the decoding tables with invalid code markers.
   */

  /* set up for code type */
  // poor man optimization - use if-else instead of switch,
  // to avoid deopts in old v8


  if (type === CODES) {
    base = extra = work;
    /* dummy value--not used */

    end = 19;
  } else if (type === LENS) {
    base = lbase;
    base_index -= 257;
    extra = lext;
    extra_index -= 257;
    end = 256;
  } else {
    /* DISTS */
    base = dbase;
    extra = dext;
    end = -1;
  }
  /* initialize opts for loop */


  huff = 0;
  /* starting code */

  sym = 0;
  /* starting code symbol */

  len = min;
  /* starting code length */

  next = table_index;
  /* current table to fill in */

  curr = root;
  /* current table index bits */

  drop = 0;
  /* current bits to drop from code for index */

  low = -1;
  /* trigger new sub-table when len > root */

  used = 1 << root;
  /* use root table entries */

  mask = used - 1;
  /* mask for comparing low */

  /* check available table space */

  if (type === LENS && used > ENOUGH_LENS || type === DISTS && used > ENOUGH_DISTS) {
    return 1;
  }
  /* process all codes and make table entries */


  for (;;) {
    /* create table entry */
    here_bits = len - drop;

    if (work[sym] < end) {
      here_op = 0;
      here_val = work[sym];
    } else if (work[sym] > end) {
      here_op = extra[extra_index + work[sym]];
      here_val = base[base_index + work[sym]];
    } else {
      here_op = 32 + 64;
      /* end of block */

      here_val = 0;
    }
    /* replicate for those indices with low len bits equal to huff */


    incr = 1 << len - drop;
    fill = 1 << curr;
    min = fill;
    /* save offset to next table */

    do {
      fill -= incr;
      table[next + (huff >> drop) + fill] = here_bits << 24 | here_op << 16 | here_val | 0;
    } while (fill !== 0);
    /* backwards increment the len-bit code huff */


    incr = 1 << len - 1;

    while (huff & incr) {
      incr >>= 1;
    }

    if (incr !== 0) {
      huff &= incr - 1;
      huff += incr;
    } else {
      huff = 0;
    }
    /* go to next symbol, update count, len */


    sym++;

    if (--count[len] === 0) {
      if (len === max) {
        break;
      }

      len = lens[lens_index + work[sym]];
    }
    /* create new sub-table if needed */


    if (len > root && (huff & mask) !== low) {
      /* if first time, transition to sub-tables */
      if (drop === 0) {
        drop = root;
      }
      /* increment past last table */


      next += min;
      /* here min is 1 << curr */

      /* determine length of next table */

      curr = len - drop;
      left = 1 << curr;

      while (curr + drop < max) {
        left -= count[curr + drop];

        if (left <= 0) {
          break;
        }

        curr++;
        left <<= 1;
      }
      /* check for enough space */


      used += 1 << curr;

      if (type === LENS && used > ENOUGH_LENS || type === DISTS && used > ENOUGH_DISTS) {
        return 1;
      }
      /* point entry in root table to sub-table */


      low = huff & mask;
      /*table.op[low] = curr;
      table.bits[low] = root;
      table.val[low] = next - opts.table_index;*/

      table[low] = root << 24 | curr << 16 | next - table_index | 0;
    }
  }
  /* fill in remaining table entry if code is incomplete (guaranteed to have
   at most one remaining entry, since if the code is incomplete, the
   maximum code length that was allowed to get this far is one bit) */


  if (huff !== 0) {
    //table.op[next + huff] = 64;            /* invalid code marker */
    //table.bits[next + huff] = len - drop;
    //table.val[next + huff] = 0;
    table[next + huff] = len - drop << 24 | 64 << 16 | 0;
  }
  /* set return parameters */
  //opts.table_index += used;


  opts.bits = root;
  return 0;
};

/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
 // (C) 1995-2013 Jean-loup Gailly and Mark Adler
// (C) 2014-2017 Vitaly Puzrin and Andrey Tupitsin
//
// This software is provided 'as-is', without any express or implied
// warranty. In no event will the authors be held liable for any damages
// arising from the use of this software.
//
// Permission is granted to anyone to use this software for any purpose,
// including commercial applications, and to alter it and redistribute it
// freely, subject to the following restrictions:
//
// 1. The origin of this software must not be misrepresented; you must not
//   claim that you wrote the original software. If you use this software
//   in a product, an acknowledgment in the product documentation would be
//   appreciated but is not required.
// 2. Altered source versions must be plainly marked as such, and must not be
//   misrepresented as being the original software.
// 3. This notice may not be removed or altered from any source distribution.

module.exports = {
  /* Allowed flush values; see deflate() and inflate() below for details */
  Z_NO_FLUSH: 0,
  Z_PARTIAL_FLUSH: 1,
  Z_SYNC_FLUSH: 2,
  Z_FULL_FLUSH: 3,
  Z_FINISH: 4,
  Z_BLOCK: 5,
  Z_TREES: 6,

  /* Return codes for the compression/decompression functions. Negative values
  * are errors, positive values are used for special but normal events.
  */
  Z_OK: 0,
  Z_STREAM_END: 1,
  Z_NEED_DICT: 2,
  Z_ERRNO: -1,
  Z_STREAM_ERROR: -2,
  Z_DATA_ERROR: -3,
  //Z_MEM_ERROR:     -4,
  Z_BUF_ERROR: -5,
  //Z_VERSION_ERROR: -6,

  /* compression levels */
  Z_NO_COMPRESSION: 0,
  Z_BEST_SPEED: 1,
  Z_BEST_COMPRESSION: 9,
  Z_DEFAULT_COMPRESSION: -1,
  Z_FILTERED: 1,
  Z_HUFFMAN_ONLY: 2,
  Z_RLE: 3,
  Z_FIXED: 4,
  Z_DEFAULT_STRATEGY: 0,

  /* Possible values of the data_type field (though see inflate()) */
  Z_BINARY: 0,
  Z_TEXT: 1,
  //Z_ASCII:                1, // = Z_TEXT (deprecated)
  Z_UNKNOWN: 2,

  /* The deflate compression method */
  Z_DEFLATED: 8 //Z_NULL:                 null // Use -1 or null inline, depending on var type

};

/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
 // (C) 1995-2013 Jean-loup Gailly and Mark Adler
// (C) 2014-2017 Vitaly Puzrin and Andrey Tupitsin
//
// This software is provided 'as-is', without any express or implied
// warranty. In no event will the authors be held liable for any damages
// arising from the use of this software.
//
// Permission is granted to anyone to use this software for any purpose,
// including commercial applications, and to alter it and redistribute it
// freely, subject to the following restrictions:
//
// 1. The origin of this software must not be misrepresented; you must not
//   claim that you wrote the original software. If you use this software
//   in a product, an acknowledgment in the product documentation would be
//   appreciated but is not required.
// 2. Altered source versions must be plainly marked as such, and must not be
//   misrepresented as being the original software.
// 3. This notice may not be removed or altered from any source distribution.

function GZheader() {
  /* true if compressed data believed to be text */
  this.text = 0;
  /* modification time */

  this.time = 0;
  /* extra flags (not used when writing a gzip file) */

  this.xflags = 0;
  /* operating system */

  this.os = 0;
  /* pointer to extra field or Z_NULL if none */

  this.extra = null;
  /* extra field length (valid if extra != Z_NULL) */

  this.extra_len = 0; // Actually, we don't need it in JS,
  // but leave for few code modifications
  //
  // Setup limits is not necessary because in js we should not preallocate memory
  // for inflate use constant limit in 65536 bytes
  //

  /* space at extra (only when reading header) */
  // this.extra_max  = 0;

  /* pointer to zero-terminated file name or Z_NULL */

  this.name = '';
  /* space at name (only when reading header) */
  // this.name_max   = 0;

  /* pointer to zero-terminated comment or Z_NULL */

  this.comment = '';
  /* space at comment (only when reading header) */
  // this.comm_max   = 0;

  /* true if there was or will be a header crc */

  this.hcrc = 0;
  /* true when done reading gzip header (not used when writing a gzip file) */

  this.done = false;
}

module.exports = GZheader;

/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

!function (e, r) {
   true ? !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_FACTORY__ = (r),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)) : undefined;
}(this, function () {
  "use strict";

  function e(e) {
    function r(e) {
      for (var r = 0, n = t.length; r < n; ++r) {
        t[r](e);
      }

      a.push(e);
    }

    if ("function" != typeof Promise) throw new Error("Promise implementation not available in this environment.");
    var t = [],
        a = [],
        n = new Promise(function (t, a) {
      e(t, a, r);
    });

    n.progress = function (e) {
      if ("function" != typeof e) throw new Error("cb is not a function.");

      for (var r = 0, i = a.length; r < i; ++r) {
        e(a[r]);
      }

      return t.push(e), n;
    };

    var i = n.then;
    return n.then = function (e, r, t) {
      return i.call(n, e, r), void 0 !== t && n.progress(t), n;
    }, n;
  }

  function r(r) {
    if (!(r instanceof ArrayBuffer)) throw new TypeError("arrayBuffer is not an instance of ArrayBuffer.");
    if (!n.Worker) throw new Error("Worker implementation is not available in this environment.");
    return new e(function (e, n, i) {
      var o = new Worker(a),
          s = [];
      o.onerror = function (e) {
        n(e);
      }, o.onmessage = function (r) {
        switch (r = r.data, r.type) {
          case "log":
            console[r.data.level]("Worker: " + r.data.msg);
            break;

          case "extract":
            var a = t(r.data);
            s.push(a), i(a);
            break;

          case "complete":
            o.terminate(), e(s);
            break;

          case "error":
            o.terminate(), n(new Error(r.data.message));
            break;

          default:
            o.terminate(), n(new Error("Unknown message from worker: " + r.type));
        }
      }, o.postMessage({
        type: "extract",
        buffer: r
      }, [r]);
    });
  }

  function t(e) {
    return Object.defineProperties(e, o), e;
  }

  var a,
      n = window || this,
      i = n.URL || n.webkitURL,
      o = {
    blob: {
      get: function get() {
        return this._blob || (this._blob = new Blob([this.buffer]));
      }
    },
    getBlobUrl: {
      value: function value() {
        return this._blobUrl || (this._blobUrl = i.createObjectURL(this.blob));
      }
    },
    readAsString: {
      value: function value() {
        for (var e = this.buffer, r = e.byteLength, t = 1, a = new DataView(e), n = [], i = 0; i < r; ++i) {
          var o = a.getUint8(i * t, !0);
          n.push(o);
        }

        return this._string = String.fromCharCode.apply(null, n);
      }
    },
    readAsJSON: {
      value: function value() {
        return JSON.parse(this.readAsString());
      }
    }
  };
  return a = (window || this).URL.createObjectURL(new Blob(['"use strict";function UntarWorker(){}function decodeUTF8(e){for(var r="",t=0;t<e.length;){var a=e[t++];if(a>127){if(a>191&&a<224){if(t>=e.length)throw"UTF-8 decode: incomplete 2-byte sequence";a=(31&a)<<6|63&e[t]}else if(a>223&&a<240){if(t+1>=e.length)throw"UTF-8 decode: incomplete 3-byte sequence";a=(15&a)<<12|(63&e[t])<<6|63&e[++t]}else{if(!(a>239&&a<248))throw"UTF-8 decode: unknown multibyte start 0x"+a.toString(16)+" at index "+(t-1);if(t+2>=e.length)throw"UTF-8 decode: incomplete 4-byte sequence";a=(7&a)<<18|(63&e[t])<<12|(63&e[++t])<<6|63&e[++t]}++t}if(a<=65535)r+=String.fromCharCode(a);else{if(!(a<=1114111))throw"UTF-8 decode: code point 0x"+a.toString(16)+" exceeds UTF-16 reach";a-=65536,r+=String.fromCharCode(a>>10|55296),r+=String.fromCharCode(1023&a|56320)}}return r}function PaxHeader(e){this._fields=e}function TarFile(){}function UntarStream(e){this._bufferView=new DataView(e),this._position=0}function UntarFileStream(e){this._stream=new UntarStream(e),this._globalPaxHeader=null}if(UntarWorker.prototype={onmessage:function(e){try{if("extract"!==e.data.type)throw new Error("Unknown message type: "+e.data.type);this.untarBuffer(e.data.buffer)}catch(r){this.postError(r)}},postError:function(e){this.postMessage({type:"error",data:{message:e.message}})},postLog:function(e,r){this.postMessage({type:"log",data:{level:e,msg:r}})},untarBuffer:function(e){try{for(var r=new UntarFileStream(e);r.hasNext();){var t=r.next();this.postMessage({type:"extract",data:t},[t.buffer])}this.postMessage({type:"complete"})}catch(a){this.postError(a)}},postMessage:function(e,r){self.postMessage(e,r)}},"undefined"!=typeof self){var worker=new UntarWorker;self.onmessage=function(e){worker.onmessage(e)}}PaxHeader.parse=function(e){for(var r=new Uint8Array(e),t=[];r.length>0;){var a=parseInt(decodeUTF8(r.subarray(0,r.indexOf(32)))),n=decodeUTF8(r.subarray(0,a)),i=n.match(/^\\d+ ([^=]+)=(.*)\\n$/);if(null===i)throw new Error("Invalid PAX header data format.");var s=i[1],o=i[2];0===o.length?o=null:null!==o.match(/^\\d+$/)&&(o=parseInt(o));var f={name:s,value:o};t.push(f),r=r.subarray(a)}return new PaxHeader(t)},PaxHeader.prototype={applyHeader:function(e){this._fields.forEach(function(r){var t=r.name,a=r.value;"path"===t?(t="name",void 0!==e.prefix&&delete e.prefix):"linkpath"===t&&(t="linkname"),null===a?delete e[t]:e[t]=a})}},UntarStream.prototype={readString:function(e){for(var r=1,t=e*r,a=[],n=0;n<e;++n){var i=this._bufferView.getUint8(this.position()+n*r,!0);if(0===i)break;a.push(i)}return this.seek(t),String.fromCharCode.apply(null,a)},readBuffer:function(e){var r;if("function"==typeof ArrayBuffer.prototype.slice)r=this._bufferView.buffer.slice(this.position(),this.position()+e);else{r=new ArrayBuffer(e);var t=new Uint8Array(r),a=new Uint8Array(this._bufferView.buffer,this.position(),e);t.set(a)}return this.seek(e),r},seek:function(e){this._position+=e},peekUint32:function(){return this._bufferView.getUint32(this.position(),!0)},position:function(e){return void 0===e?this._position:void(this._position=e)},size:function(){return this._bufferView.byteLength}},UntarFileStream.prototype={hasNext:function(){return this._stream.position()+4<this._stream.size()&&0!==this._stream.peekUint32()},next:function(){return this._readNextFile()},_readNextFile:function(){var e=this._stream,r=new TarFile,t=!1,a=null,n=e.position(),i=n+512;switch(r.name=e.readString(100),r.mode=e.readString(8),r.uid=parseInt(e.readString(8)),r.gid=parseInt(e.readString(8)),r.size=parseInt(e.readString(12),8),r.mtime=parseInt(e.readString(12),8),r.checksum=parseInt(e.readString(8)),r.type=e.readString(1),r.linkname=e.readString(100),r.ustarFormat=e.readString(6),r.ustarFormat.indexOf("ustar")>-1&&(r.version=e.readString(2),r.uname=e.readString(32),r.gname=e.readString(32),r.devmajor=parseInt(e.readString(8)),r.devminor=parseInt(e.readString(8)),r.namePrefix=e.readString(155),r.namePrefix.length>0&&(r.name=r.namePrefix+"/"+r.name)),e.position(i),r.type){case"0":case"":r.buffer=e.readBuffer(r.size);break;case"1":break;case"2":break;case"3":break;case"4":break;case"5":break;case"6":break;case"7":break;case"g":t=!0,this._globalPaxHeader=PaxHeader.parse(e.readBuffer(r.size));break;case"x":t=!0,a=PaxHeader.parse(e.readBuffer(r.size))}void 0===r.buffer&&(r.buffer=new ArrayBuffer(0));var s=i+r.size;return r.size%512!==0&&(s+=512-r.size%512),e.position(s),t&&(r=this._readNextFile()),null!==this._globalPaxHeader&&this._globalPaxHeader.applyHeader(r),null!==a&&a.applyHeader(r),r}};'])), r;
});

/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * @module  string-to-arraybuffer
 */


var atob = __webpack_require__(33);

var isBase64 = __webpack_require__(34);

module.exports = function stringToArrayBuffer(arg) {
  if (typeof arg !== 'string') throw Error('Argument should be a string'); //valid data uri

  if (/^data\:/i.test(arg)) return decode(arg); //base64

  if (isBase64(arg)) arg = atob(arg);
  return str2ab(arg);
};

function str2ab(str) {
  var array = new Uint8Array(str.length);

  for (var i = 0; i < str.length; i++) {
    array[i] = str.charCodeAt(i);
  }

  return array.buffer;
}

function decode(uri) {
  // strip newlines
  uri = uri.replace(/\r?\n/g, ''); // split the URI up into the "metadata" and the "data" portions

  var firstComma = uri.indexOf(',');
  if (-1 === firstComma || firstComma <= 4) throw new TypeError('malformed data-URI'); // remove the "data:" scheme and parse the metadata

  var meta = uri.substring(5, firstComma).split(';');
  var base64 = false;
  var charset = 'US-ASCII';

  for (var i = 0; i < meta.length; i++) {
    if ('base64' == meta[i]) {
      base64 = true;
    } else if (0 == meta[i].indexOf('charset=')) {
      charset = meta[i].substring(8);
    }
  } // get the encoded data portion and decode URI-encoded chars


  var data = unescape(uri.substring(firstComma + 1));
  if (base64) data = atob(data);
  var abuf = str2ab(data);
  abuf.type = meta[0] || 'text/plain';
  abuf.charset = charset;
  return abuf;
}

/***/ }),
/* 33 */
/***/ (function(module, exports) {

module.exports = function _atob(str) {
  return atob(str);
};

/***/ }),
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

(function (root) {
  'use strict';

  function isBase64(v, opts) {
    if (v instanceof Boolean || typeof v === 'boolean') {
      return false;
    }

    if (!(opts instanceof Object)) {
      opts = {};
    }

    if (opts.hasOwnProperty('allowBlank') && !opts.allowBlank && v === '') {
      return false;
    }

    var regex = '(?:[A-Za-z0-9+\\/]{4})*(?:[A-Za-z0-9+\\/]{2}==|[A-Za-z0-9+\/]{3}=)?';

    if (opts.mime) {
      regex = '(data:\\w+\\/[a-zA-Z\\+\\-\\.]+;base64,)?' + regex;
    }

    if (opts.paddingRequired === false) {
      regex = '(?:[A-Za-z0-9+\\/]{4})*(?:[A-Za-z0-9+\\/]{2}(==)?|[A-Za-z0-9+\\/]{3}=?)?';
    }

    return new RegExp('^' + regex + '$', 'gi').test(v);
  }

  if (true) {
    if ( true && module.exports) {
      exports = module.exports = isBase64;
    }

    exports.isBase64 = isBase64;
  } else {}
})(this);

/***/ }),
/* 35 */
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
/* 36 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _fhir_fhir_common__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(37);
/**
 * A package to generate HL7 messgages from LForms form data
 */
var LForms = __webpack_require__(4);

 // import { FileDetector } from 'protractor';
// import { tar } from 'tar-stream';
// import { gunzip } from 'gunzip-maybe';
// import { pullout } from 'pullout';

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
/* 37 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LOINC_URI", function() { return LOINC_URI; });
// Definitions for things needed by both importing and exporting.
var LOINC_URI = 'http://loinc.org';

/***/ }),
/* 38 */
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
/* 39 */
/***/ (function(module, exports, __webpack_require__) {

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

/**
 * LForms class for form definition data
 */
(function () {
  "use strict";

  var LForms = __webpack_require__(4);

  var Class = __webpack_require__(40);

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
      this.lformsVersion = LForms.lformsVersion;

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
      this._expressionProcessor = new LForms.ExpressionProcessor(this);
      this._fhirVariables = {};
      this.extension = data.extension ? data.extension.slice(0) : []; // Shallow copy
      // form-level variables (really only R4+)

      var ext = LForms.Util.removeObjectsFromArray(this.extension, 'url', this._fhir.SDC.fhirExtVariable, 0, true);
      if (ext.length > 0) lfData._variableExt = ext;

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

          var _loop2 = function _loop2() {
            var item = _this2.itemList[i];

            if (item._obsLinkPeriodExt) {
              duration = item._obsLinkPeriodExt.valueDuration; // optional

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
          item.extension = item.extension.slice(0); // Extension can be mutated, work with a copy.

          LForms.Util.processCopiedItemExtensions(item, item.extension);
        }

        this._updateItemAttrs(item); // reset answers if it is an answer list id


        if ((angular.isString(item.answers) || angular.isNumber(item.answers)) && this.answerLists && angular.isArray(this.answerLists[item.answers])) {
          item.answers = this.answerLists[item.answers];
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

      item._readOnly = item.editable && item.editable === "0" || !!(item.calculationMethod || item._calculatedExprExt);
      var lfData = this;

      if (LForms.FHIR && lfData.fhirVersion) {
        lfData.hasFHIRPath = lfData.hasFHIRPath || item._calculatedExprExt && item._calculatedExprExt.valueExpression.language === "text/fhirpath";
        lfData._hasInitialExpr = lfData._hasInitialExpr || item._initialExprExt && item._initialExprExt.valueExpression.language === "text/fhirpath";
      }

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
      var flExtensions = LForms.Util.createExtensionFromLForms(this);

      if (flExtensions) {
        defData.extension = flExtensions;
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
      var ret = {};
      ret.itemsData = this._processDataInItems(this.items, noFormDefData, noEmptyValue, noDisabledItem, keepId); // template options could be optional. Include them, only if they are present

      if (this.templateOptions && this.templateOptions.showFormHeader && this.templateOptions.formHeaderItems) {
        ret.templateData = this._processDataInItems(this.templateOptions.formHeaderItems, noFormDefData, noEmptyValue, noDisabledItem, keepId);
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

        if (noDisabledItem && item._skipLogicStatus === this._CONSTANTS.SKIP_LOGIC.STATUS_DISABLED || noEmptyValue && this.isEmpty(item) && !item.header) {
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
            var extension = LForms.Util.createExtensionFromLForms(item);

            if (extension) {
              itemData.extension = extension;
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
          var sourceType = source.sourceType; // the default source type is "INTERNAL", which uses "sourceLinkId" to locate the source item

          if (!sourceType) sourceType = this._CONSTANTS.DATA_CONTROL.SOURCE_INTERNAL; // "INTERNAL"

          if (sourceType === this._CONSTANTS.DATA_CONTROL.SOURCE_INTERNAL && source.sourceLinkId) {
            // get the source item object
            var sourceItem = this._findItemByLinkId(item, source.sourceLinkId);

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
      var hasAnswer = item && item.value !== undefined && item.value !== null && item.value !== ""; // the trigger contains only one of keys of 'exists', 'not', 'value' or minExclusive, minInclusive,
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
            var triggerValue = trigger.hasOwnProperty('value') ? trigger.value : trigger.hasOwnProperty('notEqual') ? trigger.not : null;
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
/* 40 */
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
/* 41 */
/***/ (function(module, exports, __webpack_require__) {

// Processes FHIR Expression Extensions
(function () {
  "use strict"; // A class whose instances handle the running of FHIR expressions.

  var LForms = __webpack_require__(4);
  /**
   *   Constructor.
   *  @param lfData an instance of LForms.LFormsData
   */


  LForms.ExpressionProcessor = function (lfData) {
    this._lfData = lfData;
    this._fhir = LForms.FHIR[lfData.fhirVersion];
    this._compiledExpressions = {};
  };

  LForms.ExpressionProcessor.prototype = {
    /**
     *   Runs the FHIR expressions in the form.
     *  @param includeInitialExpr whether to include the "initialExpression"
     *   expressions (which should only be run once, after asynchronous loads
     *   from questionnaire-launchContext have been completed).
     */
    runCalculations: function runCalculations(includeInitialExpr) {
      // Create an export of Questionnaire for the %questionnaire variable in
      // FHIRPath.  We only need to do this once per form.
      var lfData = this._lfData;

      if (!lfData._fhirVariables.questionnaire) {
        lfData._fhirVariables.questionnaire = LForms.Util.getFormFHIRData('Questionnaire', lfData.fhirVersion, lfData);
      }

      var firstRun = true;
      var changed = true;
      var start = new Date();

      while (changed) {
        if (changed || firstRun) {
          this._regenerateQuestionnaireResp();

          changed = this._evaluateVariables(lfData, !firstRun);
        }

        if (changed || firstRun) changed = this._evaluateFieldExpressions(lfData, includeInitialExpr, !firstRun);
        firstRun = false;
      }

      console.log("Ran FHIRPath expressions in " + (new Date() - start) + " ms");
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
        for (var _i = 0, _len = item.items.length; _i < _len; ++_i) {
          var changed = this._evaluateVariables(item.items[_i]);

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

          changesOnly = false; // process all child items
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
            var newVal = this._evaluateFHIRPath(item, ext.valueExpression.expression);

            var exprChanged = this._setItemValueFromFHIRPath(item, newVal);

            if (!changed) changed = exprChanged;
          }
        }

        rtn = changed;
      } // Process child items


      if (item.items) {
        for (var _i2 = 0, _len2 = item.items.length; _i2 < _len2; ++_i2) {
          var _changed = this._evaluateFieldExpressions(item.items[_i2], includeInitialExpr, changesOnly);

          if (!rtn) rtn = _changed;
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

                  var _newlyAdded = this._addToIDtoQRItemMap(lfItems[i], qrIthItem, map);

                  if (_newlyAdded === 0) {
                    // lfItems[i] was blank; try next lfItem
                    --a;
                  } else {
                    added += _newlyAdded;
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
      var fhirPathVal;
      if (fhirPathRes !== undefined) fhirPathVal = fhirPathRes[0];
      if (fhirPathVal === null || fhirPathVal === undefined) item.value = undefined;else this._fhir.SDC._processFHIRValues(item, fhirPathRes);
      return oldVal != item.value;
    }
  };
})();

/***/ }),
/* 42 */
/***/ (function(module, exports, __webpack_require__) {

// Contains information about the supported FHIR versions.
var FHIRSupport = {
  'STU3': 'partial',
  'R4': 'WIP'
};
if (true) module.exports = FHIRSupport;

/***/ }),
/* 43 */
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
  $templateCache.put('item.html', "<div ng-attr-role=\"{{item.header ? 'heading' : undefined}}\"\n" + " ng-attr-aria-level=\"{{item.header ? item._displayLevel+1 : undefined}}\"\n" + " class=\"lf-form-table-row lf-de {{getSiblingStatus(item)}} {{getRowClass(item)}}\n" + "    {{getSkipLogicClass(item)}} {{getActiveRowClass(item)}}\" ng-click=\"setActiveRow(item)\">\n" + "  <div class=\"lf-de-label-button\">\n" + "    <!-- label -->\n" + "    <div class=\"lf-de-label\">\n" + "      <span ng-show=\"item._questionRepeatable\" class=\"lf-sn\">{{getRepeatingSN(item) }}</span>\n" + "      <span class=\"lf-question\"><label id=\"label-{{ item._elementId }}\"\n" + "      for=\"{{item._elementId}}\"><ng-include src=\"'itemPrefixAndText.html'\"></label></span>\n" + "      <span class=\"lf-item-code\" ng-show=\"lfData.templateOptions.showQuestionCode\">\n" + "        <a ng-if=\"item._linkToDef\" href=\"{{ item._linkToDef }}\" target=\"_blank\" rel=\"noopener noreferrer\">[{{ item.questionCode }}]</a>\n" + "        <span ng-if=\"!item._linkToDef\">[{{ item.questionCode }}]</span>\n" + "      </span>\n" + "      <span ng-switch on=\"getCodingInstructionsDisplayType(item)\" ng-if=\"item.codingInstructions\">\n" + "        <span ng-switch-when=\"inline-html\" id=\"help-{{ item._elementId }}\"\n" + "         class=\"lf-prompt\" ng-bind-html=\"getTrustedCodingInstructions(item)\"></span>\n" + "        <span ng-switch-when=\"inline-escaped\" id=\"help-{{ item._elementId }}\"\n" + "         class=\"lf-prompt\" ng-bind=\"item.codingInstructions\"></span>\n" + "        <button ng-switch-when=\"popover-html\" id=\"helpButton-{{ item._elementId }}\"\n" + "                class=\"lf-help-button btn-sm\" uib-popover-template=\"'popover-content.html'\"\n" + "                popover-trigger=\"focus\" popover-placement=\"right\"  popover-title=\"Instruction\"\n" + "                type=\"button\" aria-label=\"Help\"\n" + "                aria-describedby=\"label-{{ item._elementId }}\">\n" + "          <span class=\"glyphicon glyphicon-question-sign\" aria-hidden=\"true\"></span>\n" + "        </button>\n" + "        <button ng-switch-when=\"popover-escaped\" id=\"helpButton-{{ item._elementId }}\"\n" + "                class=\"lf-help-button btn-sm\" uib-popover=\"{{item.codingInstructions}}\"\n" + "                popover-trigger=\"focus\" popover-placement=\"right\"  popover-title=\"Instruction\"\n" + "                type=\"button\" aria-label=\"Help\"\n" + "                aria-describedby=\"label-{{ item._elementId }}\">\n" + "          <span class=\"glyphicon glyphicon-question-sign\" aria-hidden=\"true\"></span>\n" + "        </button>\n" + "      </span>\n" + "      <button ng-if=\"item.copyrightNotice\" id=\"copyright-{{item._elementId}}\" type=\"button\"\n" + "              class=\"lf-copyright-button btn-sm\" uib-popover=\"{{item.copyrightNotice}}\"\n" + "              popover-trigger=\"focus\" popover-placement=\"right\" popover-title=\"Copyright\"\n" + "              aria-label=\"Copyright notice\" aria-describedby=\"label-{{ item._elementId }}\">\n" + "        <span class=\"glyphicon glyphicon-copyright-mark\" aria-hidden=\"true\"></span>\n" + "      </button>\n" + "      <button ng-if=\"isItemOptionPanelButtonShown(item)\" type=\"button\" class=\"lf-control-button btn-sm\"\n" + "              ng-click=\"hideShowItemOptionPanel(item)\" aria-label=\"Item controls\"\n" + "              aria-describedby=\"label-{{ item._elementId }}\">\n" + "        <span class=\"glyphicon glyphicon-cog\" aria-hidden=\"true\"></span>\n" + "      </button>\n" + "      <!-- TBD -->\n" + "      <lf-item-options></lf-item-options>\n" + "    </div>\n" + "\n" + "    <!-- button -->\n" + "    <div class=\"lf-de-button\">\n" + "      <button ng-if=\"!hasOneRepeatingItem(item)\" class=\"lf-float-button\" type=\"button\"\n" + "              ng-click=\"removeOneRepeatingItem(item)\" id=\"del-{{item._elementId}}\"\n" + "              title='Remove this \"{{ item._text }}\"'>-</button>\n" + "    </div>\n" + "  </div>\n" + "\n" + "  <div ng-if=\"item.dataType !=='TITLE' && !item.header\" class=\"lf-de-input-unit\" ng-style=\"getFieldWidth(item)\">\n" + "    <!-- input field -->\n" + "    <div ng-switch on=\"item.dataType\" class=\"lf-de-input values hasTooltip\">\n" + "      <ng-form name=\"innerForm2\">\n" + "        <div class=\"lf-form-item-data tooltipContainer\">\n" + "          <div class=\"tooltipContent\" lf-validate=\"item\" ng-model=\"item.value\" ng-if=\"item._hasValidation\"></div>\n" + "          <div ng-switch-when=\"CNE\">\n" + "            <lf-answers item=\"item\"></lf-answers>\n" + "          </div>\n" + "          <div ng-switch-when=\"CWE\">\n" + "            <lf-answers item=\"item\"></lf-answers>\n" + "          </div>\n" + "\n" + "          <input ng-switch-when=\"DT\" name=\"{{item._text}}\" type=\"text\"\n" + "                 ng-model=\"item.value\" lf-date=\"dateOptions\" placeholder=\"{{item._toolTip}}\"\n" + "                 ng-disabled=\"item._readOnly\" id=\"{{item._elementId}}\" ng-focus=\"setActiveRow(item)\"\n" + "                 ng-blur=\"activeRowOnBlur(item)\" aria-describedby=\"help-{{ item._elementId }}\">\n" + "\n" + "          <!-- Gillardo boostrap datetime picker -->\n" + "          <div ng-switch-when=\"DTM\" class=\"lf-dtm-picker-block\">\n" + "            <input name=\"{{item._text}}\" type=\"text\" class=\"form-control\"\n" + "                   ng-model=\"item.value\" placeholder=\"{{item._toolTip}}\"\n" + "                   datetime-picker=\"{{uibDateTimePickerFormat}}\" alt-input-formats=\"uibDatePickerAltFormats\"\n" + "                   is-open=\"isOpen\" enable-time=\"true\" close-on-date-selection=\"true\" button-bar=\"uibDtmPickerButtonBar\"\n" + "                   datepicker-options=\"uibDatePickerOptions\" timepicker-options=\"uibTimePickerOptions\"\n" + "                   ng-disabled=\"item._readOnly\" id=\"{{item._elementId}}\" ng-focus=\"setActiveRow(item)\"\n" + "                   ng-blur=\"activeRowOnBlur(item); uibDtmPickerOnBlur('input')\" aria-describedby=\"help-{{ item._elementId }}\">\n" + "            <button type=\"button\" class=\"ui-datepicker-trigger\" ng-click=\"openUibDtmPicker($event)\"></button>\n" + "          </div>\n" + "\n" + "          <textarea ng-switch-when=\"TX\" name=\"{{item._text}}\"\n" + "                    ng-model=\"item.value\" ng-attr-placeholder=\"{{item._toolTip}}\" ng-disabled=\"item._readOnly\"\n" + "                    id=\"{{item._elementId}}\" ng-keyup=\"autoExpand($event)\" ng-blur=\"activeRowOnBlur(item);autoExpand($event)\" rows=\"1\"\n" + "                    ng-focus=\"setActiveRow(item)\" aria-describedby=\"help-{{ item._elementId }}\">\n" + "          </textarea>\n" + "          <input ng-switch-when=\"BL\" name=\"{{item._text}}\" type=\"checkbox\"\n" + "                 ng-model=\"item.value\" placeholder=\"{{item._toolTip}}\" ng-disabled=\"item._readOnly\"\n" + "                 id=\"{{item._elementId}}\" ng-focus=\"setActiveRow(item)\"\n" + "                 ng-true-value=\"true\" ng-false-value=\"false\"\n" + "                 ng-blur=\"activeRowOnBlur(item)\" aria-describedby=\"help-{{ item._elementId }}\">\n" + "          <input ng-switch-default name=\"{{item._text}}\" type=\"text\"\n" + "                 ng-model=\"item.value\" placeholder=\"{{item._toolTip}}\" ng-disabled=\"item._readOnly\"\n" + "                 id=\"{{item._elementId}}\" ng-focus=\"setActiveRow(item)\"\n" + "                 ng-blur=\"activeRowOnBlur(item)\" aria-describedby=\"help-{{ item._elementId }}\">\n" + "        </div>\n" + "      </ng-form>\n" + "    </div>\n" + "\n" + "    <!--unit-->\n" + "    <div ng-if=\"!lfData.templateOptions.hideUnits && checkUnits(item)\" class=\"lf-de-unit\">\n" + "      <lf-units item=\"item\"></lf-units>\n" + "    </div>\n" + "\n" + "    <!-- extra question -->\n" + "    <div ng-if=\"needExtra(item)\" class=\"lf-de-unit\">\n" + "      <input class=\"lf-extra-field\" ng-model=\"item.valueOther\" placeholder=\"Please specify\"\n" + "             ng-disabled=\"item._readOnly\" type=\"text\" ng-focus=\"setActiveRow(item)\">\n" + "    </div>\n" + "  </div>\n" + "\n" + "\n" + "</div>\n" + "\n");
  $templateCache.put('itemPrefixAndText.html', "<span ng-if=\"item.prefix\" class=\"prefix\"\n" + "      style=\"{{item._obj_prefixCSS}}\">{{item.prefix}}</span><span\n" + "      class=\"question\" style={{item._obj_textCSS}}>{{item.question}}</span>\n");
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
/* 44 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var forEach = __webpack_require__(45).forEach;

var elementUtilsMaker = __webpack_require__(46);

var listenerHandlerMaker = __webpack_require__(47);

var idGeneratorMaker = __webpack_require__(48);

var idHandlerMaker = __webpack_require__(49);

var reporterMaker = __webpack_require__(50);

var browserDetector = __webpack_require__(51);

var batchProcessorMaker = __webpack_require__(52);

var stateHandler = __webpack_require__(54); //Detection strategies.


var objectStrategyMaker = __webpack_require__(55);

var scrollStrategyMaker = __webpack_require__(56);

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
/* 45 */
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
/* 46 */
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
/* 47 */
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
/* 48 */
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
/* 49 */
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
/* 50 */
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
/* 51 */
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
/* 52 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(53);

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
/* 53 */
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
/* 54 */
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
/* 55 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Resize detection strategy that injects objects to elements in order to detect resize events.
 * Heavily inspired by: http://www.backalleycoder.com/2013/03/18/cross-browser-event-based-element-resize-detection/
 */


var browserDetector = __webpack_require__(51);

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
/* 56 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Resize detection strategy that injects divs to elements in order to detect resize events on scroll events.
 * Heavily inspired by: https://github.com/marcj/css-element-queries/blob/master/src/ResizeSensor.js
 */


var forEach = __webpack_require__(45).forEach;

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
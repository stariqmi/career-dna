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
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
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
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var circleOptions = document.getElementsByClassName('circle-option');

var formValues = {
  college: 'Amherst College',
  isTransferStudent: false,
  tookGapYear: false
};

var selected = {};

var _loop = function _loop(i) {
  var option = circleOptions[i];
  option.onclick = function (e) {
    var circle = option.childNodes[0];
    var text = option.childNodes[1].textContent;

    if (circle.classList.contains('option-selected')) {
      circle.classList.remove('option-selected');
      delete selected[text];
    } else {
      circle.classList.add('option-selected');
      selected[text] = 1;
    }
  };
};

for (var i = 0; i < circleOptions.length; i++) {
  _loop(i);
}

document.getElementById('college').onchange = function (e) {
  return formValues.college = e.target.value;
};
document.getElementById('transfer-student').onchange = function (e) {
  return formValues.isTransferStudent = e.target.value === '1';
};
document.getElementById('gap-year').onchange = function (e) {
  return formValues.tookGapYear = e.target.value === '1';
};

document.getElementById('submit').onclick = function (e) {
  console.log(formValues);
  console.log(selected);
};

/***/ })
/******/ ]);
//# sourceMappingURL=main.bundle.js.map
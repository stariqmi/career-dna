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
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */,
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var options = {
	'My identity': ['White', 'Black or Latin', 'Asian', 'Other'],
	'My gender': ['Male', 'Female', 'Trans', 'Other'],
	'My parents': ['Both parents went to college', 'One parent went to college', 'No parent went to college', 'First to go to college'],
	'My family': ['Broke', 'Middle Class', 'Upper Middle Class', 'Rich'],
	'How I paid for school': ['No Loans', 'Loans', 'Scholarships, Grants', 'Pell Grants'],
	'Why I chose my school': ['Specific Program', 'Rank / Reputation', 'Cost', 'Family'],
	'My life on campus': ['Mostly lived on campus', 'Worked', 'Fraternities / Sororities', 'Varsity Sports'],
	'My getting used to college': ['Remedial Course', 'Active Campus Life', 'Happy with grades'],
	'Becoming a senior': ['Internships Junior Year', 'Declare Major', 'Job Search', 'No Plans For Jobs'],
	'My major': ['SCIENCE, TECHNOLOGY, ENGINEERING OR MATH', 'ECONOMICS, FINANCE, OR ACCOUNTING', 'FINE ARTS, MUSIC, DRAMA, OR PERFORMING ARTS', 'ENVIRONMENTAL STUDIES, FORESTRY, OR ECOLOGY', 'LIBERAL ARTS, HISTORY, ANY LANGUAGE, OR PHILOSOPHY	PSYCHOLOGY, SOCIOLOGY ...', 'POLITICAL SCIENCE, PUBLIC POLICY, OR GOVERNMENT'],
	'Effects of my student loans': ['WILL TAKE JOB OUTSIDE OF FIELD OF STUDY', 'WILL LESS DESIRABLE JOB', 'WILL WORK MORE THAN ONE JOB', 'WILL WORK MORE HOURS'],
	'My certifications': ['STATE CERTIFICATIONS', 'PROFESSIONAL CERTIFICATIONS', 'JOB REQUIREMENT', 'PART OF COURSE'],
	'Barriers beyond me': ['NO RIGHT CREDENTIALS / GRADES', 'CANT RELOCATE', 'LACK OF CONNECTIONS', 'NO RECRUTUING / CAREER SVCS HELP'],
	'Serious life events': ['DIVORCE IN FAMILY', 'PARENTS JOB LOSS', 'ILLNESS', 'DEATH'],
	'Other things': []
};

var ingredientsStart = 0;

var url = window.location.href;
var paramString = url.split('?')[1];
var params = paramString.split('&').map(function (p) {
	return decodeURIComponent(p).split('=');
});

var paramObj = {};
for (var i = 0; i < params.length; i++) {
	paramObj[params[i][0]] = params[i][1];
}

paramObj.gap = parseInt(paramObj.gap);
paramObj.transfer = parseInt(paramObj.transfer);
paramObj.ingredients = paramObj.ingredients.split(',');

var ingredientsContainer = document.getElementsByClassName('ingredients')[0];
var ingredientMenuContainer = document.getElementsByClassName('ingredient-menu')[0];

function drawIngredients(start, container) {
	container.innerHTML = ''; // Clear

	// Select 3 from start, draw them
	for (var _i = start; _i < start + 3; _i++) {
		var el = document.createElement('div');
		el.classList.add('ingredient');
		el.classList.add('padding-20');

		var circle = document.createElement('div');
		circle.classList.add('circle');
		// circle.classList.add('small-circle')
		el.appendChild(circle);

		var p = document.createElement('p');
		p.classList.add('centered-text');
		p.innerHTML = paramObj.ingredients[_i];
		el.appendChild(p);

		el.onclick = renderIngredientMenu(el, paramObj.ingredients[_i], ingredientMenuContainer);

		container.appendChild(el);
	}
}

function renderIngredientMenu(element, ingredient, container) {
	return function (e) {
		// Cleanup
		ingredientMenuContainer.innerHTML = ''; // Clear

		document.getElementById('selected').innerHTML = ingredient;

		var menuItems = options[ingredient];

		for (var _i2 = 0; _i2 < menuItems.length; _i2++) {
			var menuItem = document.createElement('div');
			menuItem.classList.add('ingredient-menu--item');
			menuItem.classList.add('padding-20');

			var p = document.createElement('p');
			p.innerHTML = menuItems[_i2];
			menuItem.appendChild(p);

			container.appendChild(menuItem);
		}
	};
}

document.getElementById('left').onclick = function () {
	if (ingredientsStart === 0) return;else ingredientsStart -= 1;

	drawIngredients(ingredientsStart, ingredientsContainer);
};

document.getElementById('right').onclick = function () {
	if (ingredientsStart === paramObj.ingredients.length - 3) return;else ingredientsStart += 1;

	drawIngredients(ingredientsStart, ingredientsContainer);
};

drawIngredients(0, ingredientsContainer);

/***/ })
/******/ ]);
//# sourceMappingURL=ingredients.bundle.js.map
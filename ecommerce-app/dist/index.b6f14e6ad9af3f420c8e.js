/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./node_modules/css-loader/dist/cjs.js!./node_modules/postcss-loader/dist/cjs.js??ruleSet[1].rules[1].use[2]!./src/global.css":
/*!************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./node_modules/postcss-loader/dist/cjs.js??ruleSet[1].rules[1].use[2]!./src/global.css ***!
  \************************************************************************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../node_modules/css-loader/dist/runtime/sourceMaps.js */ "./node_modules/css-loader/dist/runtime/sourceMaps.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_app_pages_registration_page_registration_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! -!../node_modules/css-loader/dist/cjs.js!./app/pages/registration-page/registration.css */ "./node_modules/css-loader/dist/cjs.js!./src/app/pages/registration-page/registration.css");
// Imports



var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
___CSS_LOADER_EXPORT___.i(_node_modules_css_loader_dist_cjs_js_app_pages_registration_page_registration_css__WEBPACK_IMPORTED_MODULE_2__["default"]);
// Module
___CSS_LOADER_EXPORT___.push([module.id, `/* @import url('./app/pages/log-in-page/log-in.css'); */`, "",{"version":3,"sources":["webpack://./src/global.css"],"names":[],"mappings":"AAAA,uDAAuD","sourcesContent":["/* @import url('./app/pages/log-in-page/log-in.css'); */\r\n\r\n@import url('./app/pages/registration-page/registration.css');"],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./src/app/pages/registration-page/registration.css":
/*!************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./src/app/pages/registration-page/registration.css ***!
  \************************************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../node_modules/css-loader/dist/runtime/sourceMaps.js */ "./node_modules/css-loader/dist/runtime/sourceMaps.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, `* {
    box-sizing: border-box;
}
body {
    margin: 0 auto;
}

.wrapper {
    max-width: 1980px;
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin: 0 auto;
}

.main {
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
}

/* .registration-form {
    padding: 20px;
} */

.registration-fieldset {
    display: flex;
    flex-direction: column;
    gap: 10px;
    padding: 20px;
    width: 300px;
}
.registration-title {
    text-align: center;
    font-size: 20px;
}

.USLabel {
    padding: 0 0 2px 5px;
}
.USInput__input {
    width: 100%;
    padding: 4px 8px;
    border: 2px solid #d9d9d9;
    color: rgba(0, 0, 0, 0.88);
    border-radius: 2px;
    box-sizing: border-box;
    transition: all 0.2s;
}
.USInput__input:focus-visible {
    outline: none;
    border-color: #000;
}
.USInput__input:hover {
    outline: none;
    border-color: #000;
    transition: all 0.2s;
}
.USInput:last-of-type {
    margin-bottom: 10px;
}

.USInput__container__select {
    width: 100%;
    padding: 4px 6px;
    border-radius: 2px;
    border: 2px solid #d9d9d9;
    transition: all 0.2s;
}
.USInput__container__select:hover {
    border-color: #000;
    transition: all 0.2s;
}
.USInput__container__select:focus-visible {
    outline: none;
    border-color: #000;
}
.USInput__hint {
    display: none;
    font-size: 12px;
    color: rgb(204 70 70);
    padding: 0 4px;
}

.registration__btn {
    padding: 4px 15px;
    border: 0px #fff;
    height: 32px;
    border-radius: 6px;
    font-size: 14px;
    cursor: pointer;
    background-color: #1677ff;;
    color: #fff;
    transition: all 0.2s;
}

.registration__btn:hover {
    background-color: #4096ff;
    transition: all 0.2s;
}

`, "",{"version":3,"sources":["webpack://./src/app/pages/registration-page/registration.css"],"names":[],"mappings":"AAAA;IACI,sBAAsB;AAC1B;AACA;IACI,cAAc;AAClB;;AAEA;IACI,iBAAiB;IACjB,aAAa;IACb,aAAa;IACb,sBAAsB;IACtB,uBAAuB;IACvB,mBAAmB;IACnB,cAAc;AAClB;;AAEA;IACI,YAAY;IACZ,aAAa;IACb,uBAAuB;IACvB,mBAAmB;AACvB;;AAEA;;GAEG;;AAEH;IACI,aAAa;IACb,sBAAsB;IACtB,SAAS;IACT,aAAa;IACb,YAAY;AAChB;AACA;IACI,kBAAkB;IAClB,eAAe;AACnB;;AAEA;IACI,oBAAoB;AACxB;AACA;IACI,WAAW;IACX,gBAAgB;IAChB,yBAAyB;IACzB,0BAA0B;IAC1B,kBAAkB;IAClB,sBAAsB;IACtB,oBAAoB;AACxB;AACA;IACI,aAAa;IACb,kBAAkB;AACtB;AACA;IACI,aAAa;IACb,kBAAkB;IAClB,oBAAoB;AACxB;AACA;IACI,mBAAmB;AACvB;;AAEA;IACI,WAAW;IACX,gBAAgB;IAChB,kBAAkB;IAClB,yBAAyB;IACzB,oBAAoB;AACxB;AACA;IACI,kBAAkB;IAClB,oBAAoB;AACxB;AACA;IACI,aAAa;IACb,kBAAkB;AACtB;AACA;IACI,aAAa;IACb,eAAe;IACf,qBAAqB;IACrB,cAAc;AAClB;;AAEA;IACI,iBAAiB;IACjB,gBAAgB;IAChB,YAAY;IACZ,kBAAkB;IAClB,eAAe;IACf,eAAe;IACf,yBAAyB;IACzB,WAAW;IACX,oBAAoB;AACxB;;AAEA;IACI,yBAAyB;IACzB,oBAAoB;AACxB","sourcesContent":["* {\r\n    box-sizing: border-box;\r\n}\r\nbody {\r\n    margin: 0 auto;\r\n}\r\n\r\n.wrapper {\r\n    max-width: 1980px;\r\n    height: 100vh;\r\n    display: flex;\r\n    flex-direction: column;\r\n    justify-content: center;\r\n    align-items: center;\r\n    margin: 0 auto;\r\n}\r\n\r\n.main {\r\n    height: 100%;\r\n    display: flex;\r\n    justify-content: center;\r\n    align-items: center;\r\n}\r\n\r\n/* .registration-form {\r\n    padding: 20px;\r\n} */\r\n\r\n.registration-fieldset {\r\n    display: flex;\r\n    flex-direction: column;\r\n    gap: 10px;\r\n    padding: 20px;\r\n    width: 300px;\r\n}\r\n.registration-title {\r\n    text-align: center;\r\n    font-size: 20px;\r\n}\r\n\r\n.USLabel {\r\n    padding: 0 0 2px 5px;\r\n}\r\n.USInput__input {\r\n    width: 100%;\r\n    padding: 4px 8px;\r\n    border: 2px solid #d9d9d9;\r\n    color: rgba(0, 0, 0, 0.88);\r\n    border-radius: 2px;\r\n    box-sizing: border-box;\r\n    transition: all 0.2s;\r\n}\r\n.USInput__input:focus-visible {\r\n    outline: none;\r\n    border-color: #000;\r\n}\r\n.USInput__input:hover {\r\n    outline: none;\r\n    border-color: #000;\r\n    transition: all 0.2s;\r\n}\r\n.USInput:last-of-type {\r\n    margin-bottom: 10px;\r\n}\r\n\r\n.USInput__container__select {\r\n    width: 100%;\r\n    padding: 4px 6px;\r\n    border-radius: 2px;\r\n    border: 2px solid #d9d9d9;\r\n    transition: all 0.2s;\r\n}\r\n.USInput__container__select:hover {\r\n    border-color: #000;\r\n    transition: all 0.2s;\r\n}\r\n.USInput__container__select:focus-visible {\r\n    outline: none;\r\n    border-color: #000;\r\n}\r\n.USInput__hint {\r\n    display: none;\r\n    font-size: 12px;\r\n    color: rgb(204 70 70);\r\n    padding: 0 4px;\r\n}\r\n\r\n.registration__btn {\r\n    padding: 4px 15px;\r\n    border: 0px #fff;\r\n    height: 32px;\r\n    border-radius: 6px;\r\n    font-size: 14px;\r\n    cursor: pointer;\r\n    background-color: #1677ff;;\r\n    color: #fff;\r\n    transition: all 0.2s;\r\n}\r\n\r\n.registration__btn:hover {\r\n    background-color: #4096ff;\r\n    transition: all 0.2s;\r\n}\r\n\r\n"],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/api.js":
/*!*****************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/api.js ***!
  \*****************************************************/
/***/ ((module) => {



/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
*/
module.exports = function (cssWithMappingToString) {
  var list = [];

  // return the list of modules as css string
  list.toString = function toString() {
    return this.map(function (item) {
      var content = "";
      var needLayer = typeof item[5] !== "undefined";
      if (item[4]) {
        content += "@supports (".concat(item[4], ") {");
      }
      if (item[2]) {
        content += "@media ".concat(item[2], " {");
      }
      if (needLayer) {
        content += "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {");
      }
      content += cssWithMappingToString(item);
      if (needLayer) {
        content += "}";
      }
      if (item[2]) {
        content += "}";
      }
      if (item[4]) {
        content += "}";
      }
      return content;
    }).join("");
  };

  // import a list of modules into the list
  list.i = function i(modules, media, dedupe, supports, layer) {
    if (typeof modules === "string") {
      modules = [[null, modules, undefined]];
    }
    var alreadyImportedModules = {};
    if (dedupe) {
      for (var k = 0; k < this.length; k++) {
        var id = this[k][0];
        if (id != null) {
          alreadyImportedModules[id] = true;
        }
      }
    }
    for (var _k = 0; _k < modules.length; _k++) {
      var item = [].concat(modules[_k]);
      if (dedupe && alreadyImportedModules[item[0]]) {
        continue;
      }
      if (typeof layer !== "undefined") {
        if (typeof item[5] === "undefined") {
          item[5] = layer;
        } else {
          item[1] = "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {").concat(item[1], "}");
          item[5] = layer;
        }
      }
      if (media) {
        if (!item[2]) {
          item[2] = media;
        } else {
          item[1] = "@media ".concat(item[2], " {").concat(item[1], "}");
          item[2] = media;
        }
      }
      if (supports) {
        if (!item[4]) {
          item[4] = "".concat(supports);
        } else {
          item[1] = "@supports (".concat(item[4], ") {").concat(item[1], "}");
          item[4] = supports;
        }
      }
      list.push(item);
    }
  };
  return list;
};

/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/sourceMaps.js":
/*!************************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/sourceMaps.js ***!
  \************************************************************/
/***/ ((module) => {



module.exports = function (item) {
  var content = item[1];
  var cssMapping = item[3];
  if (!cssMapping) {
    return content;
  }
  if (typeof btoa === "function") {
    var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(cssMapping))));
    var data = "sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(base64);
    var sourceMapping = "/*# ".concat(data, " */");
    return [content].concat([sourceMapping]).join("\n");
  }
  return [content].join("\n");
};

/***/ }),

/***/ "./src/global.css":
/*!************************!*\
  !*** ./src/global.css ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/styleDomAPI.js */ "./node_modules/style-loader/dist/runtime/styleDomAPI.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/insertBySelector.js */ "./node_modules/style-loader/dist/runtime/insertBySelector.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js */ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/insertStyleElement.js */ "./node_modules/style-loader/dist/runtime/insertStyleElement.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/styleTagTransform.js */ "./node_modules/style-loader/dist/runtime/styleTagTransform.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_node_modules_postcss_loader_dist_cjs_js_ruleSet_1_rules_1_use_2_global_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! !!../node_modules/css-loader/dist/cjs.js!../node_modules/postcss-loader/dist/cjs.js??ruleSet[1].rules[1].use[2]!./global.css */ "./node_modules/css-loader/dist/cjs.js!./node_modules/postcss-loader/dist/cjs.js??ruleSet[1].rules[1].use[2]!./src/global.css");

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());
options.setAttributes = (_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());
options.insert = _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, "head");
options.domAPI = (_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());
options.insertStyleElement = (_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_node_modules_postcss_loader_dist_cjs_js_ruleSet_1_rules_1_use_2_global_css__WEBPACK_IMPORTED_MODULE_6__["default"], options);




       /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_node_modules_postcss_loader_dist_cjs_js_ruleSet_1_rules_1_use_2_global_css__WEBPACK_IMPORTED_MODULE_6__["default"] && _node_modules_css_loader_dist_cjs_js_node_modules_postcss_loader_dist_cjs_js_ruleSet_1_rules_1_use_2_global_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals ? _node_modules_css_loader_dist_cjs_js_node_modules_postcss_loader_dist_cjs_js_ruleSet_1_rules_1_use_2_global_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals : undefined);


/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js":
/*!****************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js ***!
  \****************************************************************************/
/***/ ((module) => {



var stylesInDOM = [];
function getIndexByIdentifier(identifier) {
  var result = -1;
  for (var i = 0; i < stylesInDOM.length; i++) {
    if (stylesInDOM[i].identifier === identifier) {
      result = i;
      break;
    }
  }
  return result;
}
function modulesToDom(list, options) {
  var idCountMap = {};
  var identifiers = [];
  for (var i = 0; i < list.length; i++) {
    var item = list[i];
    var id = options.base ? item[0] + options.base : item[0];
    var count = idCountMap[id] || 0;
    var identifier = "".concat(id, " ").concat(count);
    idCountMap[id] = count + 1;
    var indexByIdentifier = getIndexByIdentifier(identifier);
    var obj = {
      css: item[1],
      media: item[2],
      sourceMap: item[3],
      supports: item[4],
      layer: item[5]
    };
    if (indexByIdentifier !== -1) {
      stylesInDOM[indexByIdentifier].references++;
      stylesInDOM[indexByIdentifier].updater(obj);
    } else {
      var updater = addElementStyle(obj, options);
      options.byIndex = i;
      stylesInDOM.splice(i, 0, {
        identifier: identifier,
        updater: updater,
        references: 1
      });
    }
    identifiers.push(identifier);
  }
  return identifiers;
}
function addElementStyle(obj, options) {
  var api = options.domAPI(options);
  api.update(obj);
  var updater = function updater(newObj) {
    if (newObj) {
      if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap && newObj.supports === obj.supports && newObj.layer === obj.layer) {
        return;
      }
      api.update(obj = newObj);
    } else {
      api.remove();
    }
  };
  return updater;
}
module.exports = function (list, options) {
  options = options || {};
  list = list || [];
  var lastIdentifiers = modulesToDom(list, options);
  return function update(newList) {
    newList = newList || [];
    for (var i = 0; i < lastIdentifiers.length; i++) {
      var identifier = lastIdentifiers[i];
      var index = getIndexByIdentifier(identifier);
      stylesInDOM[index].references--;
    }
    var newLastIdentifiers = modulesToDom(newList, options);
    for (var _i = 0; _i < lastIdentifiers.length; _i++) {
      var _identifier = lastIdentifiers[_i];
      var _index = getIndexByIdentifier(_identifier);
      if (stylesInDOM[_index].references === 0) {
        stylesInDOM[_index].updater();
        stylesInDOM.splice(_index, 1);
      }
    }
    lastIdentifiers = newLastIdentifiers;
  };
};

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/insertBySelector.js":
/*!********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/insertBySelector.js ***!
  \********************************************************************/
/***/ ((module) => {



var memo = {};

/* istanbul ignore next  */
function getTarget(target) {
  if (typeof memo[target] === "undefined") {
    var styleTarget = document.querySelector(target);

    // Special case to return head of iframe instead of iframe itself
    if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {
      try {
        // This will throw an exception if access to iframe is blocked
        // due to cross-origin restrictions
        styleTarget = styleTarget.contentDocument.head;
      } catch (e) {
        // istanbul ignore next
        styleTarget = null;
      }
    }
    memo[target] = styleTarget;
  }
  return memo[target];
}

/* istanbul ignore next  */
function insertBySelector(insert, style) {
  var target = getTarget(insert);
  if (!target) {
    throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");
  }
  target.appendChild(style);
}
module.exports = insertBySelector;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/insertStyleElement.js":
/*!**********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/insertStyleElement.js ***!
  \**********************************************************************/
/***/ ((module) => {



/* istanbul ignore next  */
function insertStyleElement(options) {
  var element = document.createElement("style");
  options.setAttributes(element, options.attributes);
  options.insert(element, options.options);
  return element;
}
module.exports = insertStyleElement;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js":
/*!**********************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js ***!
  \**********************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {



/* istanbul ignore next  */
function setAttributesWithoutAttributes(styleElement) {
  var nonce =  true ? __webpack_require__.nc : 0;
  if (nonce) {
    styleElement.setAttribute("nonce", nonce);
  }
}
module.exports = setAttributesWithoutAttributes;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/styleDomAPI.js":
/*!***************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/styleDomAPI.js ***!
  \***************************************************************/
/***/ ((module) => {



/* istanbul ignore next  */
function apply(styleElement, options, obj) {
  var css = "";
  if (obj.supports) {
    css += "@supports (".concat(obj.supports, ") {");
  }
  if (obj.media) {
    css += "@media ".concat(obj.media, " {");
  }
  var needLayer = typeof obj.layer !== "undefined";
  if (needLayer) {
    css += "@layer".concat(obj.layer.length > 0 ? " ".concat(obj.layer) : "", " {");
  }
  css += obj.css;
  if (needLayer) {
    css += "}";
  }
  if (obj.media) {
    css += "}";
  }
  if (obj.supports) {
    css += "}";
  }
  var sourceMap = obj.sourceMap;
  if (sourceMap && typeof btoa !== "undefined") {
    css += "\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))), " */");
  }

  // For old IE
  /* istanbul ignore if  */
  options.styleTagTransform(css, styleElement, options.options);
}
function removeStyleElement(styleElement) {
  // istanbul ignore if
  if (styleElement.parentNode === null) {
    return false;
  }
  styleElement.parentNode.removeChild(styleElement);
}

/* istanbul ignore next  */
function domAPI(options) {
  if (typeof document === "undefined") {
    return {
      update: function update() {},
      remove: function remove() {}
    };
  }
  var styleElement = options.insertStyleElement(options);
  return {
    update: function update(obj) {
      apply(styleElement, options, obj);
    },
    remove: function remove() {
      removeStyleElement(styleElement);
    }
  };
}
module.exports = domAPI;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/styleTagTransform.js":
/*!*********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/styleTagTransform.js ***!
  \*********************************************************************/
/***/ ((module) => {



/* istanbul ignore next  */
function styleTagTransform(css, styleElement) {
  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = css;
  } else {
    while (styleElement.firstChild) {
      styleElement.removeChild(styleElement.firstChild);
    }
    styleElement.appendChild(document.createTextNode(css));
  }
}
module.exports = styleTagTransform;

/***/ }),

/***/ "./src/app/pages/registration-page/registration.ts":
/*!*********************************************************!*\
  !*** ./src/app/pages/registration-page/registration.ts ***!
  \*********************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
const page_1 = __importDefault(__webpack_require__(/*! ../../templates/page */ "./src/app/templates/page.ts"));
const functions_1 = __importDefault(__webpack_require__(/*! ../../utils/functions */ "./src/app/utils/functions.ts"));
const validationFn_1 = __webpack_require__(/*! ./validation/validationFn */ "./src/app/pages/registration-page/validation/validationFn.ts");
const validationMsgs_1 = __webpack_require__(/*! ./validation/validationMsgs */ "./src/app/pages/registration-page/validation/validationMsgs.ts");
class RegistrationPage extends page_1.default {
    constructor() {
        super();
        this.form = (0, functions_1.default)('form', 'registration-form');
    }
    createFormElement(labelText, inputClass, placeholderValue, hintsName, hintName, errMsgs, conditionDone, 
    // inputEventHandler: ,
    isCountry = false) {
        const userInputElem = (0, functions_1.default)('div', 'USInput');
        const labelForm = (0, functions_1.default)('div', 'USLabel');
        const label = (0, functions_1.default)('label', 'USLabel__label', labelText);
        labelForm.appendChild(label);
        const hintsForm = (0, functions_1.default)('div', `USInput__hints ${hintsName}`);
        // for (let i = 0; i < errMsgs.length; i++) {
        //   const errElem = createHtmlElement('span', `USInput__hint ${hintName}`)
        //   hintsForm.appendChild(errElem);
        // }
        errMsgs.forEach((errMsg) => {
            const errElem = (0, functions_1.default)('span', `USInput__hint ${hintName}`, errMsg);
            hintsForm.appendChild(errElem);
        });
        const inputForm = (0, functions_1.default)('div', 'USInput__container');
        if (isCountry) {
            const selectCountry = (0, functions_1.default)('select', 'USInput__container__select');
            const optionCountry = (0, functions_1.default)('option', 'USInput__container__select-choice', 'Germany');
            selectCountry.appendChild(optionCountry);
            inputForm.appendChild(selectCountry);
        }
        else {
            const input = (0, functions_1.default)('input', `USInput__input ${inputClass}`, '', [
                { name: 'placeholder', value: placeholderValue },
            ]);
            input.addEventListener('input', () => {
                const { value } = input;
                conditionDone.forEach((condition, index) => {
                    const errMsg = hintsForm.children[index];
                    if (condition(value) || value.length === 0) {
                        errMsg.style.display = 'none';
                    }
                    else {
                        errMsg.style.display = 'block';
                    }
                });
            });
            inputForm.appendChild(input);
        }
        userInputElem.append(labelForm, inputForm, hintsForm);
        return userInputElem;
    }
    renderPage() {
        document.body.append(this.pageWrapper);
        this.pageWrapper.append(this.main);
        this.main.classList.add('main');
        const regTitle = (0, functions_1.default)('legend', 'registration-title', 'Registration form');
        const firstNameIn = this.createFormElement('First Name', 'first-name__input', 'Ivan', 'hints-firstName', 'hints-firstName', validationMsgs_1.errMsgsName, validationFn_1.conditionName);
        const lastNameIn = this.createFormElement('Last Name', 'last-name__input', 'Ivanov', 'hints-lastName', 'hints-lastName', validationMsgs_1.errMsgsLastName, validationFn_1.conditionLastName);
        // const birthDateIn = this.createFormElement(
        //   'Date of Birth',
        //   'birth-date__input',
        //   '24.05.2000',
        //   'hints-birth',
        //   'hints-birth'
        // );
        // const emailIn = this.createFormElement('Email', 'email__input', 'example@gmail.com', 'hints-email', 'hint-email');
        // const passwordIn = this.createFormElement(
        //   'Password',
        //   'password__input',
        //   'Example73!',
        //   'hints-password',
        //   'hint-password'
        // );
        // passwordIn
        // const countryIn = this.createFormElement('Country', 'country__input', '', 'hints-country', '', [], true);
        // const cityIn = this.createFormElement('City', 'city__input', 'Berlin', 'hints-city', 'hint-city');
        // const streetIn = this.createFormElement(
        //   'Street',
        //   'street__input',
        //   'Friedrichstraße',
        //   'hints-street',
        //   'hint-street'
        // );
        // const houseIn = this.createFormElement('House Number', 'house__input', '21', 'hints-house', 'hint-house');
        // const postcodeIn = this.createFormElement(
        //   'Postcode',
        //   'postcode__input',
        //   '12345',
        //   'hints-postcode',
        //   'hint-postcode'
        // );
        const registBtn = (0, functions_1.default)('button', 'registration__btn', 'Sign up');
        const registrFieldset = (0, functions_1.default)('fieldset', 'registration-fieldset');
        const fieldsetItems = [
            regTitle,
            firstNameIn,
            lastNameIn,
            // birthDateIn,
            // emailIn,
            // passwordIn,
            // countryIn,
            // cityIn,
            // streetIn,
            // houseIn,
            // postcodeIn,
            registBtn,
        ];
        registrFieldset.append(...fieldsetItems);
        this.form.appendChild(registrFieldset);
        this.addElemsToMain(this.form);
        return this.pageWrapper;
    }
}
exports["default"] = RegistrationPage;


/***/ }),

/***/ "./src/app/pages/registration-page/validation/validationFn.ts":
/*!********************************************************************!*\
  !*** ./src/app/pages/registration-page/validation/validationFn.ts ***!
  \********************************************************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.conditionLastName = exports.conditionName = void 0;
exports.conditionName = [(value) => value.length >= 1, (value) => !/[^a-zA-Z\s]/.test(value)];
exports.conditionLastName = [(value) => value.length >= 1, (value) => !/[^a-zA-Z\s]/.test(value)];


/***/ }),

/***/ "./src/app/pages/registration-page/validation/validationMsgs.ts":
/*!**********************************************************************!*\
  !*** ./src/app/pages/registration-page/validation/validationMsgs.ts ***!
  \**********************************************************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.errMsgsLastName = exports.errMsgsName = void 0;
exports.errMsgsName = [
    'Name must contain at least one character',
    'Name must not contain special characters or digits',
];
exports.errMsgsLastName = [
    'Name must contain at least one character',
    'Name must not contain special characters or digits',
];


/***/ }),

/***/ "./src/app/templates/page.ts":
/*!***********************************!*\
  !*** ./src/app/templates/page.ts ***!
  \***********************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
const functions_1 = __importDefault(__webpack_require__(/*! ../../app/utils/functions */ "./src/app/utils/functions.ts"));
class Page {
    constructor() {
        this.pageWrapper = (0, functions_1.default)('div', 'wrapper');
        this.header = (0, functions_1.default)('header');
        this.headerWrapper = (0, functions_1.default)('div', 'wrapper-header');
        this.appName = (0, functions_1.default)('h1');
        this.main = (0, functions_1.default)('main');
        this.mainWrapper = (0, functions_1.default)('div', 'wrapper-main');
        this.footer = (0, functions_1.default)('footer');
        this.footerWrapper = (0, functions_1.default)('div');
    }
    addElemsToHeader(...elems) {
        this.header.append(this.headerWrapper);
        return this.headerWrapper.append(...elems);
    }
    addElemsToMain(...elems) {
        this.main.append(this.mainWrapper);
        return this.mainWrapper.append(...elems);
    }
    addElemsToFooter(...elems) {
        this.footer.append(this.footerWrapper);
        return this.footerWrapper.append(...elems);
    }
    renderPage() {
        return this.pageWrapper;
    }
}
exports["default"] = Page;


/***/ }),

/***/ "./src/app/utils/functions.ts":
/*!************************************!*\
  !*** ./src/app/utils/functions.ts ***!
  \************************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.createImage = exports.addEventHandler = void 0;
function createHtmlElement(newTag, newClass = '', text = '', attributes = []) {
    const newElem = document.createElement(`${newTag}`);
    if (newClass)
        newElem.className = `${newClass}`;
    if (text)
        newElem.innerHTML = `${text}`;
    if (attributes.length) {
        attributes.forEach((attribute) => newElem.setAttribute(attribute.name, attribute.value));
    }
    return newElem;
}
exports["default"] = createHtmlElement;
function addEventHandler(element, e, callback = () => { }) {
    const target = document.querySelector(`.${element}`);
    target === null || target === void 0 ? void 0 : target.addEventListener(`${e}`, callback);
}
exports.addEventHandler = addEventHandler;
function createImage(source, alt, classImg, image = new Image()) {
    const newImage = image;
    newImage.src = `${source}`;
    newImage.alt = `${alt}`;
    newImage.className = `.${classImg}`;
    return newImage;
}
exports.createImage = createImage;


/***/ }),

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
const registration_1 = __importDefault(__webpack_require__(/*! ./app/pages/registration-page/registration */ "./src/app/pages/registration-page/registration.ts"));
__webpack_require__(/*! ./global.css */ "./src/global.css");
// import LogInPage from './app/pages/log-in-page/log-in';
// new LogInPage().renderPage();
// import RegistrationPage from './app/pages/registration-page/registration';
new registration_1.default().renderPage();


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			id: moduleId,
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/nonce */
/******/ 	(() => {
/******/ 		__webpack_require__.nc = undefined;
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.ts");
/******/ 	
/******/ })()
;
//# sourceMappingURL=index.b6f14e6ad9af3f420c8e.js.map
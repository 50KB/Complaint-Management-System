"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(() => {
var exports = {};
exports.id = "pages/index";
exports.ids = ["pages/index"];
exports.modules = {

/***/ "./pages/index.js":
/*!************************!*\
  !*** ./pages/index.js ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"react/jsx-dev-runtime\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var semantic_ui_react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! semantic-ui-react */ \"semantic-ui-react\");\n/* harmony import */ var semantic_ui_react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(semantic_ui_react__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! next/router */ \"next/router\");\n/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(next_router__WEBPACK_IMPORTED_MODULE_3__);\n\n\n\n\nfunction index({ user  }) {\n    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{\n        document.title = `Welcome, ${user.name}`;\n    });\n    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{\n        if (!user.typeOfUser) next_router__WEBPACK_IMPORTED_MODULE_3___default().push(\"signup-two\");\n    });\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(semantic_ui_react__WEBPACK_IMPORTED_MODULE_2__.Container, {\n            children: [\n                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(semantic_ui_react__WEBPACK_IMPORTED_MODULE_2__.Image, {\n                    src: user.image,\n                    size: \"small\",\n                    circular: true\n                }, void 0, false, {\n                    fileName: \"/Users/tanviropy/MyGit/CSE-299/CSE-299/pages/index.js\",\n                    lineNumber: 17,\n                    columnNumber: 9\n                }, this),\n                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(semantic_ui_react__WEBPACK_IMPORTED_MODULE_2__.Divider, {}, void 0, false, {\n                    fileName: \"/Users/tanviropy/MyGit/CSE-299/CSE-299/pages/index.js\",\n                    lineNumber: 19,\n                    columnNumber: 9\n                }, this),\n                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(semantic_ui_react__WEBPACK_IMPORTED_MODULE_2__.Item, {\n                    children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(semantic_ui_react__WEBPACK_IMPORTED_MODULE_2__.Item.Content, {\n                        children: [\n                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(semantic_ui_react__WEBPACK_IMPORTED_MODULE_2__.Item.Header, {\n                                as: \"h2\",\n                                children: user.name\n                            }, void 0, false, {\n                                fileName: \"/Users/tanviropy/MyGit/CSE-299/CSE-299/pages/index.js\",\n                                lineNumber: 23,\n                                columnNumber: 13\n                            }, this),\n                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(semantic_ui_react__WEBPACK_IMPORTED_MODULE_2__.Item.Description, {\n                                children: [\n                                    \"RFID: \",\n                                    user.RFID\n                                ]\n                            }, void 0, true, {\n                                fileName: \"/Users/tanviropy/MyGit/CSE-299/CSE-299/pages/index.js\",\n                                lineNumber: 24,\n                                columnNumber: 13\n                            }, this),\n                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(semantic_ui_react__WEBPACK_IMPORTED_MODULE_2__.Item.Description, {\n                                children: [\n                                    \"Category: \",\n                                    user.typeOfUser\n                                ]\n                            }, void 0, true, {\n                                fileName: \"/Users/tanviropy/MyGit/CSE-299/CSE-299/pages/index.js\",\n                                lineNumber: 25,\n                                columnNumber: 13\n                            }, this),\n                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(semantic_ui_react__WEBPACK_IMPORTED_MODULE_2__.Item.Description, {\n                                children: [\n                                    \"Phone No: \",\n                                    user.phoneNumber\n                                ]\n                            }, void 0, true, {\n                                fileName: \"/Users/tanviropy/MyGit/CSE-299/CSE-299/pages/index.js\",\n                                lineNumber: 26,\n                                columnNumber: 13\n                            }, this)\n                        ]\n                    }, void 0, true, {\n                        fileName: \"/Users/tanviropy/MyGit/CSE-299/CSE-299/pages/index.js\",\n                        lineNumber: 22,\n                        columnNumber: 11\n                    }, this)\n                }, void 0, false, {\n                    fileName: \"/Users/tanviropy/MyGit/CSE-299/CSE-299/pages/index.js\",\n                    lineNumber: 21,\n                    columnNumber: 9\n                }, this)\n            ]\n        }, void 0, true, {\n            fileName: \"/Users/tanviropy/MyGit/CSE-299/CSE-299/pages/index.js\",\n            lineNumber: 16,\n            columnNumber: 7\n        }, this)\n    }, void 0, false, {\n        fileName: \"/Users/tanviropy/MyGit/CSE-299/CSE-299/pages/index.js\",\n        lineNumber: 15,\n        columnNumber: 5\n    }, this);\n}\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (index);\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9wYWdlcy9pbmRleC5qcy5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7QUFBQTtBQUF5QztBQUMyQjtBQUNuQztBQUVqQyxTQUFTTyxLQUFLLENBQUMsRUFBRUMsSUFBSSxHQUFFLEVBQUU7SUFDdkJQLGdEQUFTLENBQUMsSUFBTTtRQUNkUSxRQUFRLENBQUNDLEtBQUssR0FBRyxDQUFDLFNBQVMsRUFBRUYsSUFBSSxDQUFDRyxJQUFJLENBQUMsQ0FBQyxDQUFDO0tBQzFDLENBQUMsQ0FBQztJQUVIVixnREFBUyxDQUFDLElBQU07UUFDZCxJQUFJLENBQUNPLElBQUksQ0FBQ0ksVUFBVSxFQUFFTix1REFBVyxDQUFDLFlBQVksQ0FBQyxDQUFDO0tBQ2pELENBQUMsQ0FBQztJQUVILHFCQUNFLDhEQUFDUSxLQUFHO2tCQUNGLDRFQUFDWix3REFBUzs7OEJBQ1IsOERBQUNFLG9EQUFLO29CQUFDVyxHQUFHLEVBQUVQLElBQUksQ0FBQ1EsS0FBSztvQkFBRUMsSUFBSSxFQUFDLE9BQU87b0JBQUNDLFFBQVE7Ozs7O3dCQUFHOzhCQUVoRCw4REFBQ2Ysc0RBQU87Ozs7d0JBQUc7OEJBRVgsOERBQUNFLG1EQUFJOzhCQUNILDRFQUFDQSwyREFBWTs7MENBQ1gsOERBQUNBLDBEQUFXO2dDQUFDZ0IsRUFBRSxFQUFDLElBQUk7MENBQUViLElBQUksQ0FBQ0csSUFBSTs7Ozs7b0NBQWU7MENBQzlDLDhEQUFDTiwrREFBZ0I7O29DQUFDLFFBQU07b0NBQUNHLElBQUksQ0FBQ2UsSUFBSTs7Ozs7O29DQUFvQjswQ0FDdEQsOERBQUNsQiwrREFBZ0I7O29DQUFDLFlBQVU7b0NBQUNHLElBQUksQ0FBQ0ksVUFBVTs7Ozs7O29DQUFvQjswQ0FDaEUsOERBQUNQLCtEQUFnQjs7b0NBQUMsWUFBVTtvQ0FBQ0csSUFBSSxDQUFDZ0IsV0FBVzs7Ozs7O29DQUFvQjs7Ozs7OzRCQUNwRDs7Ozs7d0JBQ1Y7Ozs7OztnQkFDRzs7Ozs7WUFDUixDQUNOO0NBQ0g7QUFFRCxpRUFBZWpCLEtBQUssRUFBQyIsInNvdXJjZXMiOlsid2VicGFjazovL25zdV9vdmlqb2cvLi9wYWdlcy9pbmRleC5qcz9iZWU3Il0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCwgeyB1c2VFZmZlY3QgfSBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyBDb250YWluZXIsIERpdmlkZXIsIEltYWdlLCBJdGVtIH0gZnJvbSAnc2VtYW50aWMtdWktcmVhY3QnO1xuaW1wb3J0IFJvdXRlciBmcm9tICduZXh0L3JvdXRlcic7XG5cbmZ1bmN0aW9uIGluZGV4KHsgdXNlciB9KSB7XG4gIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgZG9jdW1lbnQudGl0bGUgPSBgV2VsY29tZSwgJHt1c2VyLm5hbWV9YDtcbiAgfSk7XG5cbiAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICBpZiAoIXVzZXIudHlwZU9mVXNlcikgUm91dGVyLnB1c2goJ3NpZ251cC10d28nKTtcbiAgfSk7XG5cbiAgcmV0dXJuIChcbiAgICA8ZGl2PlxuICAgICAgPENvbnRhaW5lcj5cbiAgICAgICAgPEltYWdlIHNyYz17dXNlci5pbWFnZX0gc2l6ZT1cInNtYWxsXCIgY2lyY3VsYXIgLz5cblxuICAgICAgICA8RGl2aWRlciAvPlxuXG4gICAgICAgIDxJdGVtPlxuICAgICAgICAgIDxJdGVtLkNvbnRlbnQ+XG4gICAgICAgICAgICA8SXRlbS5IZWFkZXIgYXM9XCJoMlwiPnt1c2VyLm5hbWV9PC9JdGVtLkhlYWRlcj5cbiAgICAgICAgICAgIDxJdGVtLkRlc2NyaXB0aW9uPlJGSUQ6IHt1c2VyLlJGSUR9PC9JdGVtLkRlc2NyaXB0aW9uPlxuICAgICAgICAgICAgPEl0ZW0uRGVzY3JpcHRpb24+Q2F0ZWdvcnk6IHt1c2VyLnR5cGVPZlVzZXJ9PC9JdGVtLkRlc2NyaXB0aW9uPlxuICAgICAgICAgICAgPEl0ZW0uRGVzY3JpcHRpb24+UGhvbmUgTm86IHt1c2VyLnBob25lTnVtYmVyfTwvSXRlbS5EZXNjcmlwdGlvbj5cbiAgICAgICAgICA8L0l0ZW0uQ29udGVudD5cbiAgICAgICAgPC9JdGVtPlxuICAgICAgPC9Db250YWluZXI+XG4gICAgPC9kaXY+XG4gICk7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGluZGV4O1xuIl0sIm5hbWVzIjpbIlJlYWN0IiwidXNlRWZmZWN0IiwiQ29udGFpbmVyIiwiRGl2aWRlciIsIkltYWdlIiwiSXRlbSIsIlJvdXRlciIsImluZGV4IiwidXNlciIsImRvY3VtZW50IiwidGl0bGUiLCJuYW1lIiwidHlwZU9mVXNlciIsInB1c2giLCJkaXYiLCJzcmMiLCJpbWFnZSIsInNpemUiLCJjaXJjdWxhciIsIkNvbnRlbnQiLCJIZWFkZXIiLCJhcyIsIkRlc2NyaXB0aW9uIiwiUkZJRCIsInBob25lTnVtYmVyIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./pages/index.js\n");

/***/ }),

/***/ "next/router":
/*!******************************!*\
  !*** external "next/router" ***!
  \******************************/
/***/ ((module) => {

module.exports = require("next/router");

/***/ }),

/***/ "react":
/*!************************!*\
  !*** external "react" ***!
  \************************/
/***/ ((module) => {

module.exports = require("react");

/***/ }),

/***/ "react/jsx-dev-runtime":
/*!****************************************!*\
  !*** external "react/jsx-dev-runtime" ***!
  \****************************************/
/***/ ((module) => {

module.exports = require("react/jsx-dev-runtime");

/***/ }),

/***/ "semantic-ui-react":
/*!************************************!*\
  !*** external "semantic-ui-react" ***!
  \************************************/
/***/ ((module) => {

module.exports = require("semantic-ui-react");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = (__webpack_exec__("./pages/index.js"));
module.exports = __webpack_exports__;

})();
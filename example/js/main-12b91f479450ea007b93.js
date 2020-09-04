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
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/curves.js":
/*!***********************!*\
  !*** ./src/curves.js ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("const EasingFunctions = {\n  // no easing, no acceleration\n  linear: t => t,\n  // accelerating from zero velocity\n  easeInQuad: t => t * t,\n  // decelerating to zero velocity\n  easeOutQuad: t => t * (2 - t),\n  // acceleration until halfway, then deceleration\n  easeInOutQuad: t => t < .5 ? 2 * t * t : -1 + (4 - 2 * t) * t,\n  // accelerating from zero velocity\n  easeInCubic: t => t * t * t,\n  // decelerating to zero velocity\n  easeOutCubic: t => --t * t * t + 1,\n  // acceleration until halfway, then deceleration\n  easeInOutCubic: t => t < .5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1,\n  // accelerating from zero velocity\n  easeInQuart: t => t * t * t * t,\n  // decelerating to zero velocity\n  easeOutQuart: t => 1 - --t * t * t * t,\n  // acceleration until halfway, then deceleration\n  easeInOutQuart: t => t < .5 ? 8 * t * t * t * t : 1 - 8 * --t * t * t * t,\n  // accelerating from zero velocity\n  easeInQuint: t => t * t * t * t * t,\n  // decelerating to zero velocity\n  easeOutQuint: t => 1 + --t * t * t * t * t,\n  // acceleration until halfway, then deceleration\n  easeInOutQuint: t => t < .5 ? 16 * t * t * t * t * t : 1 + 16 * --t * t * t * t * t\n};\nmodule.exports = EasingFunctions;\n\n//# sourceURL=webpack:///./src/curves.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("(function () {\n  fillPage();\n\n  const scroller = __webpack_require__(/*! ./scroller */ \"./src/scroller.js\"); // console.log(scroller);\n\n\n  scroller();\n})();\n\nfunction fillPage() {\n  const repeatableElement = document.body.querySelector('[data-repeatable]');\n\n  if (repeatableElement) {\n    let count = repeatableElement.getAttribute('data-count');\n\n    try {\n      if (count) count = Number.parseInt(count);\n    } catch (e) {}\n\n    if (typeof count === 'number') {\n      const parent = repeatableElement.parentElement;\n\n      for (let i = 1; i < count; i++) {\n        const clone = repeatableElement.cloneNode(true);\n        parent.appendChild(clone);\n      }\n    }\n  }\n}\n\n//# sourceURL=webpack:///./src/index.js?");

/***/ }),

/***/ "./src/scroller.js":
/*!*************************!*\
  !*** ./src/scroller.js ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const curves = __webpack_require__(/*! ./curves */ \"./src/curves.js\");\n\nconst defaultArgs = {\n  type: 'scroll'\n}; // curves.easeInOutCubic(.5)\n\nlet loop = 0,\n    stopped = false;\nconst animations = {\n  scroll: scrollAnimation\n};\n\nfunction Scroller(args) {\n  args = Object.assign(defaultArgs, args);\n  let looper;\n  console.log(args);\n  const anim = scrollByFPSAnimation({\n    // fps: 60,\n    // scrollY: 1,\n    // minY: 0,\n    maxY: 3200,\n\n    started(loopId) {\n      looper = loopId;\n      console.log('Loop Started', looper);\n    },\n\n    onStopped() {\n      console.log('Loop Finished', looper);\n      setTimeout(() => {\n        window.scrollTo(0, args.minY);\n        setTimeout(anim.start, 1000);\n      }, 2000);\n    }\n\n  });\n  setTimeout(anim.start, 1000); // window.addEventListener('scroll', )\n  //\n  // const animation = animations[args.type];\n  //\n  // if (animation) {\n  //     setTimeout(() => {\n  //         looper = requestAnimationFrame(animation);\n  //     }, 2000);\n  // }\n}\n\nconst defaultFPSAnimArgs = {\n  fps: 999999,\n  scrollY: 1,\n  scrollX: 0,\n  minY: 0\n};\n\nfunction scrollByFPSAnimation(args) {\n  args = Object.assign(defaultFPSAnimArgs, args);\n  let fpsInterval = 1000 / args.fps;\n  let scrollY = args.scrollY,\n      scrollX = args.scrollX,\n      currentY = args.scrollY;\n  let curve = 1;\n  let then = Date.now();\n  let now, elapsed, id;\n  let started = false,\n      stopped = false;\n  const tmp = args.started;\n\n  args.started = loopId => {\n    id = loopId;\n    return tmp(loopId);\n  };\n\n  function stop() {\n    stopped = true;\n    started = false;\n    window.removeEventListener('scroll', scrollListener);\n    if (args.onStopped) args.onStopped();\n  }\n\n  function start() {\n    stopped = false;\n    started = false;\n    window.addEventListener('scroll', scrollListener);\n\n    function animate() {\n      if (stopped) return;\n      const id = requestAnimationFrame(animate);\n\n      if (args.started && !started) {\n        args.started(id);\n        started = true;\n      }\n\n      now = Date.now();\n      elapsed = now - then;\n\n      if (elapsed > fpsInterval) {\n        then = now - elapsed % fpsInterval;\n        const margin = Number.parseInt(getComputedStyle(document.body).marginTop) + Number.parseInt(getComputedStyle(document.body).marginBottom);\n        const pageHeight = document.body.scrollHeight + margin;\n        const maxScroll = pageHeight - window.scrollY - window.innerHeight; // console.log({\n        //     currentY,\n        //     nextY: window.scrollY + (scrollY * curve < 1 ? 1 : scrollY * curve),\n        //     diff: (window.scrollY + (scrollY * curve < 1 ? 1 : scrollY * curve)) - currentY\n        // })\n\n        currentY = window.scrollY + (scrollY * curve < 1 ? 1 : scrollY * curve);\n        window.scrollTo(scrollX, currentY); // window.scrollBy(scrollX, scrollY * curve < 1 ? 1 : scrollY * curve);\n        // console.log('ScrollBy: ', scrollY * curve < 1 ? 1 : scrollY * curve, curve)\n      }\n    }\n\n    return animate();\n  }\n\n  function scrollListener(evt) {\n    const margin = Number.parseInt(getComputedStyle(document.body).marginTop) + Number.parseInt(getComputedStyle(document.body).marginBottom);\n    const pageHeight = document.body.scrollHeight + margin;\n    const maxScroll = pageHeight - window.scrollY - window.innerHeight;\n    const curveTest = window.scrollY / (args.maxY ? args.maxY : pageHeight / 2);\n    console.log(curveTest);\n\n    if (pageHeight - maxScroll < pageHeight / 2) {\n      curve = 5 * curves.easeOutQuad(curveTest);\n    } else {\n      curve = 5 * curves.easeOutQuad(curveTest);\n    } // console.log({\n    //     pageHeight,\n    //     maxScroll,\n    //     diff: pageHeight - maxScroll,\n    //     scrollY: window.scrollY,\n    //     innerHeight: window.innerHeight,\n    //     maxY: args.maxY,\n    // })\n\n\n    if (maxScroll <= 0 || typeof args.maxY === 'number' && window.scrollY >= args.maxY) {\n      if (id) {\n        cancelAnimationFrame(id);\n        stop();\n      }\n    }\n  }\n\n  return {\n    start,\n    stop\n  };\n}\n\nfunction scrollAnimation() {\n  if (loop % 2 === 0) {\n    console.log('scroll by 1');\n    window.scrollBy(0, 1);\n  }\n\n  if (stopped) return;\n  loop++;\n  requestAnimationFrame(scrollAnimation);\n}\n\nmodule.exports = Scroller;\n\n//# sourceURL=webpack:///./src/scroller.js?");

/***/ })

/******/ });
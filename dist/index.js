/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
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
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(1);


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _domready = __webpack_require__(2);
	
	var _domready2 = _interopRequireDefault(_domready);
	
	var _fastclick = __webpack_require__(3);
	
	var _fastclick2 = _interopRequireDefault(_fastclick);
	
	__webpack_require__(4);
	
	var _App = __webpack_require__(8);
	
	var _App2 = _interopRequireDefault(_App);
	
	var _firebase = __webpack_require__(13);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	(0, _domready2.default)(function () {
	  (0, _firebase.start)();
	  _fastclick2.default.attach(document.body);
	  (0, _App2.default)(document.getElementById('app'));
	});

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	/*!
	  * domready (c) Dustin Diaz 2014 - License MIT
	  */
	!function (name, definition) {
	
	  if (true) module.exports = definition()
	  else if (typeof define == 'function' && typeof define.amd == 'object') define(definition)
	  else this[name] = definition()
	
	}('domready', function () {
	
	  var fns = [], listener
	    , doc = document
	    , hack = doc.documentElement.doScroll
	    , domContentLoaded = 'DOMContentLoaded'
	    , loaded = (hack ? /^loaded|^c/ : /^loaded|^i|^c/).test(doc.readyState)
	
	
	  if (!loaded)
	  doc.addEventListener(domContentLoaded, listener = function () {
	    doc.removeEventListener(domContentLoaded, listener)
	    loaded = 1
	    while (listener = fns.shift()) listener()
	  })
	
	  return function (fn) {
	    loaded ? setTimeout(fn, 0) : fns.push(fn)
	  }
	
	});


/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;;(function () {
		'use strict';
	
		/**
		 * @preserve FastClick: polyfill to remove click delays on browsers with touch UIs.
		 *
		 * @codingstandard ftlabs-jsv2
		 * @copyright The Financial Times Limited [All Rights Reserved]
		 * @license MIT License (see LICENSE.txt)
		 */
	
		/*jslint browser:true, node:true*/
		/*global define, Event, Node*/
	
	
		/**
		 * Instantiate fast-clicking listeners on the specified layer.
		 *
		 * @constructor
		 * @param {Element} layer The layer to listen on
		 * @param {Object} [options={}] The options to override the defaults
		 */
		function FastClick(layer, options) {
			var oldOnClick;
	
			options = options || {};
	
			/**
			 * Whether a click is currently being tracked.
			 *
			 * @type boolean
			 */
			this.trackingClick = false;
	
	
			/**
			 * Timestamp for when click tracking started.
			 *
			 * @type number
			 */
			this.trackingClickStart = 0;
	
	
			/**
			 * The element being tracked for a click.
			 *
			 * @type EventTarget
			 */
			this.targetElement = null;
	
	
			/**
			 * X-coordinate of touch start event.
			 *
			 * @type number
			 */
			this.touchStartX = 0;
	
	
			/**
			 * Y-coordinate of touch start event.
			 *
			 * @type number
			 */
			this.touchStartY = 0;
	
	
			/**
			 * ID of the last touch, retrieved from Touch.identifier.
			 *
			 * @type number
			 */
			this.lastTouchIdentifier = 0;
	
	
			/**
			 * Touchmove boundary, beyond which a click will be cancelled.
			 *
			 * @type number
			 */
			this.touchBoundary = options.touchBoundary || 10;
	
	
			/**
			 * The FastClick layer.
			 *
			 * @type Element
			 */
			this.layer = layer;
	
			/**
			 * The minimum time between tap(touchstart and touchend) events
			 *
			 * @type number
			 */
			this.tapDelay = options.tapDelay || 200;
	
			/**
			 * The maximum time for a tap
			 *
			 * @type number
			 */
			this.tapTimeout = options.tapTimeout || 700;
	
			if (FastClick.notNeeded(layer)) {
				return;
			}
	
			// Some old versions of Android don't have Function.prototype.bind
			function bind(method, context) {
				return function() { return method.apply(context, arguments); };
			}
	
	
			var methods = ['onMouse', 'onClick', 'onTouchStart', 'onTouchMove', 'onTouchEnd', 'onTouchCancel'];
			var context = this;
			for (var i = 0, l = methods.length; i < l; i++) {
				context[methods[i]] = bind(context[methods[i]], context);
			}
	
			// Set up event handlers as required
			if (deviceIsAndroid) {
				layer.addEventListener('mouseover', this.onMouse, true);
				layer.addEventListener('mousedown', this.onMouse, true);
				layer.addEventListener('mouseup', this.onMouse, true);
			}
	
			layer.addEventListener('click', this.onClick, true);
			layer.addEventListener('touchstart', this.onTouchStart, false);
			layer.addEventListener('touchmove', this.onTouchMove, false);
			layer.addEventListener('touchend', this.onTouchEnd, false);
			layer.addEventListener('touchcancel', this.onTouchCancel, false);
	
			// Hack is required for browsers that don't support Event#stopImmediatePropagation (e.g. Android 2)
			// which is how FastClick normally stops click events bubbling to callbacks registered on the FastClick
			// layer when they are cancelled.
			if (!Event.prototype.stopImmediatePropagation) {
				layer.removeEventListener = function(type, callback, capture) {
					var rmv = Node.prototype.removeEventListener;
					if (type === 'click') {
						rmv.call(layer, type, callback.hijacked || callback, capture);
					} else {
						rmv.call(layer, type, callback, capture);
					}
				};
	
				layer.addEventListener = function(type, callback, capture) {
					var adv = Node.prototype.addEventListener;
					if (type === 'click') {
						adv.call(layer, type, callback.hijacked || (callback.hijacked = function(event) {
							if (!event.propagationStopped) {
								callback(event);
							}
						}), capture);
					} else {
						adv.call(layer, type, callback, capture);
					}
				};
			}
	
			// If a handler is already declared in the element's onclick attribute, it will be fired before
			// FastClick's onClick handler. Fix this by pulling out the user-defined handler function and
			// adding it as listener.
			if (typeof layer.onclick === 'function') {
	
				// Android browser on at least 3.2 requires a new reference to the function in layer.onclick
				// - the old one won't work if passed to addEventListener directly.
				oldOnClick = layer.onclick;
				layer.addEventListener('click', function(event) {
					oldOnClick(event);
				}, false);
				layer.onclick = null;
			}
		}
	
		/**
		* Windows Phone 8.1 fakes user agent string to look like Android and iPhone.
		*
		* @type boolean
		*/
		var deviceIsWindowsPhone = navigator.userAgent.indexOf("Windows Phone") >= 0;
	
		/**
		 * Android requires exceptions.
		 *
		 * @type boolean
		 */
		var deviceIsAndroid = navigator.userAgent.indexOf('Android') > 0 && !deviceIsWindowsPhone;
	
	
		/**
		 * iOS requires exceptions.
		 *
		 * @type boolean
		 */
		var deviceIsIOS = /iP(ad|hone|od)/.test(navigator.userAgent) && !deviceIsWindowsPhone;
	
	
		/**
		 * iOS 4 requires an exception for select elements.
		 *
		 * @type boolean
		 */
		var deviceIsIOS4 = deviceIsIOS && (/OS 4_\d(_\d)?/).test(navigator.userAgent);
	
	
		/**
		 * iOS 6.0-7.* requires the target element to be manually derived
		 *
		 * @type boolean
		 */
		var deviceIsIOSWithBadTarget = deviceIsIOS && (/OS [6-7]_\d/).test(navigator.userAgent);
	
		/**
		 * BlackBerry requires exceptions.
		 *
		 * @type boolean
		 */
		var deviceIsBlackBerry10 = navigator.userAgent.indexOf('BB10') > 0;
	
		/**
		 * Determine whether a given element requires a native click.
		 *
		 * @param {EventTarget|Element} target Target DOM element
		 * @returns {boolean} Returns true if the element needs a native click
		 */
		FastClick.prototype.needsClick = function(target) {
			switch (target.nodeName.toLowerCase()) {
	
			// Don't send a synthetic click to disabled inputs (issue #62)
			case 'button':
			case 'select':
			case 'textarea':
				if (target.disabled) {
					return true;
				}
	
				break;
			case 'input':
	
				// File inputs need real clicks on iOS 6 due to a browser bug (issue #68)
				if ((deviceIsIOS && target.type === 'file') || target.disabled) {
					return true;
				}
	
				break;
			case 'label':
			case 'iframe': // iOS8 homescreen apps can prevent events bubbling into frames
			case 'video':
				return true;
			}
	
			return (/\bneedsclick\b/).test(target.className);
		};
	
	
		/**
		 * Determine whether a given element requires a call to focus to simulate click into element.
		 *
		 * @param {EventTarget|Element} target Target DOM element
		 * @returns {boolean} Returns true if the element requires a call to focus to simulate native click.
		 */
		FastClick.prototype.needsFocus = function(target) {
			switch (target.nodeName.toLowerCase()) {
			case 'textarea':
				return true;
			case 'select':
				return !deviceIsAndroid;
			case 'input':
				switch (target.type) {
				case 'button':
				case 'checkbox':
				case 'file':
				case 'image':
				case 'radio':
				case 'submit':
					return false;
				}
	
				// No point in attempting to focus disabled inputs
				return !target.disabled && !target.readOnly;
			default:
				return (/\bneedsfocus\b/).test(target.className);
			}
		};
	
	
		/**
		 * Send a click event to the specified element.
		 *
		 * @param {EventTarget|Element} targetElement
		 * @param {Event} event
		 */
		FastClick.prototype.sendClick = function(targetElement, event) {
			var clickEvent, touch;
	
			// On some Android devices activeElement needs to be blurred otherwise the synthetic click will have no effect (#24)
			if (document.activeElement && document.activeElement !== targetElement) {
				document.activeElement.blur();
			}
	
			touch = event.changedTouches[0];
	
			// Synthesise a click event, with an extra attribute so it can be tracked
			clickEvent = document.createEvent('MouseEvents');
			clickEvent.initMouseEvent(this.determineEventType(targetElement), true, true, window, 1, touch.screenX, touch.screenY, touch.clientX, touch.clientY, false, false, false, false, 0, null);
			clickEvent.forwardedTouchEvent = true;
			targetElement.dispatchEvent(clickEvent);
		};
	
		FastClick.prototype.determineEventType = function(targetElement) {
	
			//Issue #159: Android Chrome Select Box does not open with a synthetic click event
			if (deviceIsAndroid && targetElement.tagName.toLowerCase() === 'select') {
				return 'mousedown';
			}
	
			return 'click';
		};
	
	
		/**
		 * @param {EventTarget|Element} targetElement
		 */
		FastClick.prototype.focus = function(targetElement) {
			var length;
	
			// Issue #160: on iOS 7, some input elements (e.g. date datetime month) throw a vague TypeError on setSelectionRange. These elements don't have an integer value for the selectionStart and selectionEnd properties, but unfortunately that can't be used for detection because accessing the properties also throws a TypeError. Just check the type instead. Filed as Apple bug #15122724.
			if (deviceIsIOS && targetElement.setSelectionRange && targetElement.type.indexOf('date') !== 0 && targetElement.type !== 'time' && targetElement.type !== 'month') {
				length = targetElement.value.length;
				targetElement.setSelectionRange(length, length);
			} else {
				targetElement.focus();
			}
		};
	
	
		/**
		 * Check whether the given target element is a child of a scrollable layer and if so, set a flag on it.
		 *
		 * @param {EventTarget|Element} targetElement
		 */
		FastClick.prototype.updateScrollParent = function(targetElement) {
			var scrollParent, parentElement;
	
			scrollParent = targetElement.fastClickScrollParent;
	
			// Attempt to discover whether the target element is contained within a scrollable layer. Re-check if the
			// target element was moved to another parent.
			if (!scrollParent || !scrollParent.contains(targetElement)) {
				parentElement = targetElement;
				do {
					if (parentElement.scrollHeight > parentElement.offsetHeight) {
						scrollParent = parentElement;
						targetElement.fastClickScrollParent = parentElement;
						break;
					}
	
					parentElement = parentElement.parentElement;
				} while (parentElement);
			}
	
			// Always update the scroll top tracker if possible.
			if (scrollParent) {
				scrollParent.fastClickLastScrollTop = scrollParent.scrollTop;
			}
		};
	
	
		/**
		 * @param {EventTarget} targetElement
		 * @returns {Element|EventTarget}
		 */
		FastClick.prototype.getTargetElementFromEventTarget = function(eventTarget) {
	
			// On some older browsers (notably Safari on iOS 4.1 - see issue #56) the event target may be a text node.
			if (eventTarget.nodeType === Node.TEXT_NODE) {
				return eventTarget.parentNode;
			}
	
			return eventTarget;
		};
	
	
		/**
		 * On touch start, record the position and scroll offset.
		 *
		 * @param {Event} event
		 * @returns {boolean}
		 */
		FastClick.prototype.onTouchStart = function(event) {
			var targetElement, touch, selection;
	
			// Ignore multiple touches, otherwise pinch-to-zoom is prevented if both fingers are on the FastClick element (issue #111).
			if (event.targetTouches.length > 1) {
				return true;
			}
	
			targetElement = this.getTargetElementFromEventTarget(event.target);
			touch = event.targetTouches[0];
	
			if (deviceIsIOS) {
	
				// Only trusted events will deselect text on iOS (issue #49)
				selection = window.getSelection();
				if (selection.rangeCount && !selection.isCollapsed) {
					return true;
				}
	
				if (!deviceIsIOS4) {
	
					// Weird things happen on iOS when an alert or confirm dialog is opened from a click event callback (issue #23):
					// when the user next taps anywhere else on the page, new touchstart and touchend events are dispatched
					// with the same identifier as the touch event that previously triggered the click that triggered the alert.
					// Sadly, there is an issue on iOS 4 that causes some normal touch events to have the same identifier as an
					// immediately preceeding touch event (issue #52), so this fix is unavailable on that platform.
					// Issue 120: touch.identifier is 0 when Chrome dev tools 'Emulate touch events' is set with an iOS device UA string,
					// which causes all touch events to be ignored. As this block only applies to iOS, and iOS identifiers are always long,
					// random integers, it's safe to to continue if the identifier is 0 here.
					if (touch.identifier && touch.identifier === this.lastTouchIdentifier) {
						event.preventDefault();
						return false;
					}
	
					this.lastTouchIdentifier = touch.identifier;
	
					// If the target element is a child of a scrollable layer (using -webkit-overflow-scrolling: touch) and:
					// 1) the user does a fling scroll on the scrollable layer
					// 2) the user stops the fling scroll with another tap
					// then the event.target of the last 'touchend' event will be the element that was under the user's finger
					// when the fling scroll was started, causing FastClick to send a click event to that layer - unless a check
					// is made to ensure that a parent layer was not scrolled before sending a synthetic click (issue #42).
					this.updateScrollParent(targetElement);
				}
			}
	
			this.trackingClick = true;
			this.trackingClickStart = event.timeStamp;
			this.targetElement = targetElement;
	
			this.touchStartX = touch.pageX;
			this.touchStartY = touch.pageY;
	
			// Prevent phantom clicks on fast double-tap (issue #36)
			if ((event.timeStamp - this.lastClickTime) < this.tapDelay) {
				event.preventDefault();
			}
	
			return true;
		};
	
	
		/**
		 * Based on a touchmove event object, check whether the touch has moved past a boundary since it started.
		 *
		 * @param {Event} event
		 * @returns {boolean}
		 */
		FastClick.prototype.touchHasMoved = function(event) {
			var touch = event.changedTouches[0], boundary = this.touchBoundary;
	
			if (Math.abs(touch.pageX - this.touchStartX) > boundary || Math.abs(touch.pageY - this.touchStartY) > boundary) {
				return true;
			}
	
			return false;
		};
	
	
		/**
		 * Update the last position.
		 *
		 * @param {Event} event
		 * @returns {boolean}
		 */
		FastClick.prototype.onTouchMove = function(event) {
			if (!this.trackingClick) {
				return true;
			}
	
			// If the touch has moved, cancel the click tracking
			if (this.targetElement !== this.getTargetElementFromEventTarget(event.target) || this.touchHasMoved(event)) {
				this.trackingClick = false;
				this.targetElement = null;
			}
	
			return true;
		};
	
	
		/**
		 * Attempt to find the labelled control for the given label element.
		 *
		 * @param {EventTarget|HTMLLabelElement} labelElement
		 * @returns {Element|null}
		 */
		FastClick.prototype.findControl = function(labelElement) {
	
			// Fast path for newer browsers supporting the HTML5 control attribute
			if (labelElement.control !== undefined) {
				return labelElement.control;
			}
	
			// All browsers under test that support touch events also support the HTML5 htmlFor attribute
			if (labelElement.htmlFor) {
				return document.getElementById(labelElement.htmlFor);
			}
	
			// If no for attribute exists, attempt to retrieve the first labellable descendant element
			// the list of which is defined here: http://www.w3.org/TR/html5/forms.html#category-label
			return labelElement.querySelector('button, input:not([type=hidden]), keygen, meter, output, progress, select, textarea');
		};
	
	
		/**
		 * On touch end, determine whether to send a click event at once.
		 *
		 * @param {Event} event
		 * @returns {boolean}
		 */
		FastClick.prototype.onTouchEnd = function(event) {
			var forElement, trackingClickStart, targetTagName, scrollParent, touch, targetElement = this.targetElement;
	
			if (!this.trackingClick) {
				return true;
			}
	
			// Prevent phantom clicks on fast double-tap (issue #36)
			if ((event.timeStamp - this.lastClickTime) < this.tapDelay) {
				this.cancelNextClick = true;
				return true;
			}
	
			if ((event.timeStamp - this.trackingClickStart) > this.tapTimeout) {
				return true;
			}
	
			// Reset to prevent wrong click cancel on input (issue #156).
			this.cancelNextClick = false;
	
			this.lastClickTime = event.timeStamp;
	
			trackingClickStart = this.trackingClickStart;
			this.trackingClick = false;
			this.trackingClickStart = 0;
	
			// On some iOS devices, the targetElement supplied with the event is invalid if the layer
			// is performing a transition or scroll, and has to be re-detected manually. Note that
			// for this to function correctly, it must be called *after* the event target is checked!
			// See issue #57; also filed as rdar://13048589 .
			if (deviceIsIOSWithBadTarget) {
				touch = event.changedTouches[0];
	
				// In certain cases arguments of elementFromPoint can be negative, so prevent setting targetElement to null
				targetElement = document.elementFromPoint(touch.pageX - window.pageXOffset, touch.pageY - window.pageYOffset) || targetElement;
				targetElement.fastClickScrollParent = this.targetElement.fastClickScrollParent;
			}
	
			targetTagName = targetElement.tagName.toLowerCase();
			if (targetTagName === 'label') {
				forElement = this.findControl(targetElement);
				if (forElement) {
					this.focus(targetElement);
					if (deviceIsAndroid) {
						return false;
					}
	
					targetElement = forElement;
				}
			} else if (this.needsFocus(targetElement)) {
	
				// Case 1: If the touch started a while ago (best guess is 100ms based on tests for issue #36) then focus will be triggered anyway. Return early and unset the target element reference so that the subsequent click will be allowed through.
				// Case 2: Without this exception for input elements tapped when the document is contained in an iframe, then any inputted text won't be visible even though the value attribute is updated as the user types (issue #37).
				if ((event.timeStamp - trackingClickStart) > 100 || (deviceIsIOS && window.top !== window && targetTagName === 'input')) {
					this.targetElement = null;
					return false;
				}
	
				this.focus(targetElement);
				this.sendClick(targetElement, event);
	
				// Select elements need the event to go through on iOS 4, otherwise the selector menu won't open.
				// Also this breaks opening selects when VoiceOver is active on iOS6, iOS7 (and possibly others)
				if (!deviceIsIOS || targetTagName !== 'select') {
					this.targetElement = null;
					event.preventDefault();
				}
	
				return false;
			}
	
			if (deviceIsIOS && !deviceIsIOS4) {
	
				// Don't send a synthetic click event if the target element is contained within a parent layer that was scrolled
				// and this tap is being used to stop the scrolling (usually initiated by a fling - issue #42).
				scrollParent = targetElement.fastClickScrollParent;
				if (scrollParent && scrollParent.fastClickLastScrollTop !== scrollParent.scrollTop) {
					return true;
				}
			}
	
			// Prevent the actual click from going though - unless the target node is marked as requiring
			// real clicks or if it is in the whitelist in which case only non-programmatic clicks are permitted.
			if (!this.needsClick(targetElement)) {
				event.preventDefault();
				this.sendClick(targetElement, event);
			}
	
			return false;
		};
	
	
		/**
		 * On touch cancel, stop tracking the click.
		 *
		 * @returns {void}
		 */
		FastClick.prototype.onTouchCancel = function() {
			this.trackingClick = false;
			this.targetElement = null;
		};
	
	
		/**
		 * Determine mouse events which should be permitted.
		 *
		 * @param {Event} event
		 * @returns {boolean}
		 */
		FastClick.prototype.onMouse = function(event) {
	
			// If a target element was never set (because a touch event was never fired) allow the event
			if (!this.targetElement) {
				return true;
			}
	
			if (event.forwardedTouchEvent) {
				return true;
			}
	
			// Programmatically generated events targeting a specific element should be permitted
			if (!event.cancelable) {
				return true;
			}
	
			// Derive and check the target element to see whether the mouse event needs to be permitted;
			// unless explicitly enabled, prevent non-touch click events from triggering actions,
			// to prevent ghost/doubleclicks.
			if (!this.needsClick(this.targetElement) || this.cancelNextClick) {
	
				// Prevent any user-added listeners declared on FastClick element from being fired.
				if (event.stopImmediatePropagation) {
					event.stopImmediatePropagation();
				} else {
	
					// Part of the hack for browsers that don't support Event#stopImmediatePropagation (e.g. Android 2)
					event.propagationStopped = true;
				}
	
				// Cancel the event
				event.stopPropagation();
				event.preventDefault();
	
				return false;
			}
	
			// If the mouse event is permitted, return true for the action to go through.
			return true;
		};
	
	
		/**
		 * On actual clicks, determine whether this is a touch-generated click, a click action occurring
		 * naturally after a delay after a touch (which needs to be cancelled to avoid duplication), or
		 * an actual click which should be permitted.
		 *
		 * @param {Event} event
		 * @returns {boolean}
		 */
		FastClick.prototype.onClick = function(event) {
			var permitted;
	
			// It's possible for another FastClick-like library delivered with third-party code to fire a click event before FastClick does (issue #44). In that case, set the click-tracking flag back to false and return early. This will cause onTouchEnd to return early.
			if (this.trackingClick) {
				this.targetElement = null;
				this.trackingClick = false;
				return true;
			}
	
			// Very odd behaviour on iOS (issue #18): if a submit element is present inside a form and the user hits enter in the iOS simulator or clicks the Go button on the pop-up OS keyboard the a kind of 'fake' click event will be triggered with the submit-type input element as the target.
			if (event.target.type === 'submit' && event.detail === 0) {
				return true;
			}
	
			permitted = this.onMouse(event);
	
			// Only unset targetElement if the click is not permitted. This will ensure that the check for !targetElement in onMouse fails and the browser's click doesn't go through.
			if (!permitted) {
				this.targetElement = null;
			}
	
			// If clicks are permitted, return true for the action to go through.
			return permitted;
		};
	
	
		/**
		 * Remove all FastClick's event listeners.
		 *
		 * @returns {void}
		 */
		FastClick.prototype.destroy = function() {
			var layer = this.layer;
	
			if (deviceIsAndroid) {
				layer.removeEventListener('mouseover', this.onMouse, true);
				layer.removeEventListener('mousedown', this.onMouse, true);
				layer.removeEventListener('mouseup', this.onMouse, true);
			}
	
			layer.removeEventListener('click', this.onClick, true);
			layer.removeEventListener('touchstart', this.onTouchStart, false);
			layer.removeEventListener('touchmove', this.onTouchMove, false);
			layer.removeEventListener('touchend', this.onTouchEnd, false);
			layer.removeEventListener('touchcancel', this.onTouchCancel, false);
		};
	
	
		/**
		 * Check whether FastClick is needed.
		 *
		 * @param {Element} layer The layer to listen on
		 */
		FastClick.notNeeded = function(layer) {
			var metaViewport;
			var chromeVersion;
			var blackberryVersion;
			var firefoxVersion;
	
			// Devices that don't support touch don't need FastClick
			if (typeof window.ontouchstart === 'undefined') {
				return true;
			}
	
			// Chrome version - zero for other browsers
			chromeVersion = +(/Chrome\/([0-9]+)/.exec(navigator.userAgent) || [,0])[1];
	
			if (chromeVersion) {
	
				if (deviceIsAndroid) {
					metaViewport = document.querySelector('meta[name=viewport]');
	
					if (metaViewport) {
						// Chrome on Android with user-scalable="no" doesn't need FastClick (issue #89)
						if (metaViewport.content.indexOf('user-scalable=no') !== -1) {
							return true;
						}
						// Chrome 32 and above with width=device-width or less don't need FastClick
						if (chromeVersion > 31 && document.documentElement.scrollWidth <= window.outerWidth) {
							return true;
						}
					}
	
				// Chrome desktop doesn't need FastClick (issue #15)
				} else {
					return true;
				}
			}
	
			if (deviceIsBlackBerry10) {
				blackberryVersion = navigator.userAgent.match(/Version\/([0-9]*)\.([0-9]*)/);
	
				// BlackBerry 10.3+ does not require Fastclick library.
				// https://github.com/ftlabs/fastclick/issues/251
				if (blackberryVersion[1] >= 10 && blackberryVersion[2] >= 3) {
					metaViewport = document.querySelector('meta[name=viewport]');
	
					if (metaViewport) {
						// user-scalable=no eliminates click delay.
						if (metaViewport.content.indexOf('user-scalable=no') !== -1) {
							return true;
						}
						// width=device-width (or less than device-width) eliminates click delay.
						if (document.documentElement.scrollWidth <= window.outerWidth) {
							return true;
						}
					}
				}
			}
	
			// IE10 with -ms-touch-action: none or manipulation, which disables double-tap-to-zoom (issue #97)
			if (layer.style.msTouchAction === 'none' || layer.style.touchAction === 'manipulation') {
				return true;
			}
	
			// Firefox version - zero for other browsers
			firefoxVersion = +(/Firefox\/([0-9]+)/.exec(navigator.userAgent) || [,0])[1];
	
			if (firefoxVersion >= 27) {
				// Firefox 27+ does not have tap delay if the content is not zoomable - https://bugzilla.mozilla.org/show_bug.cgi?id=922896
	
				metaViewport = document.querySelector('meta[name=viewport]');
				if (metaViewport && (metaViewport.content.indexOf('user-scalable=no') !== -1 || document.documentElement.scrollWidth <= window.outerWidth)) {
					return true;
				}
			}
	
			// IE11: prefixed -ms-touch-action is no longer supported and it's recomended to use non-prefixed version
			// http://msdn.microsoft.com/en-us/library/windows/apps/Hh767313.aspx
			if (layer.style.touchAction === 'none' || layer.style.touchAction === 'manipulation') {
				return true;
			}
	
			return false;
		};
	
	
		/**
		 * Factory method for creating a FastClick object
		 *
		 * @param {Element} layer The layer to listen on
		 * @param {Object} [options={}] The options to override the defaults
		 */
		FastClick.attach = function(layer, options) {
			return new FastClick(layer, options);
		};
	
	
		if (true) {
	
			// AMD. Register as an anonymous module.
			!(__WEBPACK_AMD_DEFINE_RESULT__ = function() {
				return FastClick;
			}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
		} else if (typeof module !== 'undefined' && module.exports) {
			module.exports = FastClick.attach;
			module.exports.FastClick = FastClick;
		} else {
			window.FastClick = FastClick;
		}
	}());


/***/ },
/* 4 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },
/* 5 */,
/* 6 */,
/* 7 */,
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _Main = __webpack_require__(9);
	
	var _Main2 = _interopRequireDefault(_Main);
	
	var _ports = __webpack_require__(12);
	
	var _ports2 = _interopRequireDefault(_ports);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	exports.default = function (domNode) {
	  domNode.innerHTML = '';
	
	  var _Elm$Main$embed = _Main2.default.Main.embed(domNode),
	      ports = _Elm$Main$embed.ports;
	
	  (0, _ports2.default)(ports);
	};

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/* WEBPACK VAR INJECTION */(function(global, module) {
	(function() {
	'use strict';
	
	function F2(fun)
	{
	  function wrapper(a) { return function(b) { return fun(a,b); }; }
	  wrapper.arity = 2;
	  wrapper.func = fun;
	  return wrapper;
	}
	
	function F3(fun)
	{
	  function wrapper(a) {
	    return function(b) { return function(c) { return fun(a, b, c); }; };
	  }
	  wrapper.arity = 3;
	  wrapper.func = fun;
	  return wrapper;
	}
	
	function F4(fun)
	{
	  function wrapper(a) { return function(b) { return function(c) {
	    return function(d) { return fun(a, b, c, d); }; }; };
	  }
	  wrapper.arity = 4;
	  wrapper.func = fun;
	  return wrapper;
	}
	
	function F5(fun)
	{
	  function wrapper(a) { return function(b) { return function(c) {
	    return function(d) { return function(e) { return fun(a, b, c, d, e); }; }; }; };
	  }
	  wrapper.arity = 5;
	  wrapper.func = fun;
	  return wrapper;
	}
	
	function F6(fun)
	{
	  function wrapper(a) { return function(b) { return function(c) {
	    return function(d) { return function(e) { return function(f) {
	    return fun(a, b, c, d, e, f); }; }; }; }; };
	  }
	  wrapper.arity = 6;
	  wrapper.func = fun;
	  return wrapper;
	}
	
	function F7(fun)
	{
	  function wrapper(a) { return function(b) { return function(c) {
	    return function(d) { return function(e) { return function(f) {
	    return function(g) { return fun(a, b, c, d, e, f, g); }; }; }; }; }; };
	  }
	  wrapper.arity = 7;
	  wrapper.func = fun;
	  return wrapper;
	}
	
	function F8(fun)
	{
	  function wrapper(a) { return function(b) { return function(c) {
	    return function(d) { return function(e) { return function(f) {
	    return function(g) { return function(h) {
	    return fun(a, b, c, d, e, f, g, h); }; }; }; }; }; }; };
	  }
	  wrapper.arity = 8;
	  wrapper.func = fun;
	  return wrapper;
	}
	
	function F9(fun)
	{
	  function wrapper(a) { return function(b) { return function(c) {
	    return function(d) { return function(e) { return function(f) {
	    return function(g) { return function(h) { return function(i) {
	    return fun(a, b, c, d, e, f, g, h, i); }; }; }; }; }; }; }; };
	  }
	  wrapper.arity = 9;
	  wrapper.func = fun;
	  return wrapper;
	}
	
	function A2(fun, a, b)
	{
	  return fun.arity === 2
	    ? fun.func(a, b)
	    : fun(a)(b);
	}
	function A3(fun, a, b, c)
	{
	  return fun.arity === 3
	    ? fun.func(a, b, c)
	    : fun(a)(b)(c);
	}
	function A4(fun, a, b, c, d)
	{
	  return fun.arity === 4
	    ? fun.func(a, b, c, d)
	    : fun(a)(b)(c)(d);
	}
	function A5(fun, a, b, c, d, e)
	{
	  return fun.arity === 5
	    ? fun.func(a, b, c, d, e)
	    : fun(a)(b)(c)(d)(e);
	}
	function A6(fun, a, b, c, d, e, f)
	{
	  return fun.arity === 6
	    ? fun.func(a, b, c, d, e, f)
	    : fun(a)(b)(c)(d)(e)(f);
	}
	function A7(fun, a, b, c, d, e, f, g)
	{
	  return fun.arity === 7
	    ? fun.func(a, b, c, d, e, f, g)
	    : fun(a)(b)(c)(d)(e)(f)(g);
	}
	function A8(fun, a, b, c, d, e, f, g, h)
	{
	  return fun.arity === 8
	    ? fun.func(a, b, c, d, e, f, g, h)
	    : fun(a)(b)(c)(d)(e)(f)(g)(h);
	}
	function A9(fun, a, b, c, d, e, f, g, h, i)
	{
	  return fun.arity === 9
	    ? fun.func(a, b, c, d, e, f, g, h, i)
	    : fun(a)(b)(c)(d)(e)(f)(g)(h)(i);
	}
	
	//import Native.List //
	
	var _elm_lang$core$Native_Array = function() {
	
	// A RRB-Tree has two distinct data types.
	// Leaf -> "height"  is always 0
	//         "table"   is an array of elements
	// Node -> "height"  is always greater than 0
	//         "table"   is an array of child nodes
	//         "lengths" is an array of accumulated lengths of the child nodes
	
	// M is the maximal table size. 32 seems fast. E is the allowed increase
	// of search steps when concatting to find an index. Lower values will
	// decrease balancing, but will increase search steps.
	var M = 32;
	var E = 2;
	
	// An empty array.
	var empty = {
		ctor: '_Array',
		height: 0,
		table: []
	};
	
	
	function get(i, array)
	{
		if (i < 0 || i >= length(array))
		{
			throw new Error(
				'Index ' + i + ' is out of range. Check the length of ' +
				'your array first or use getMaybe or getWithDefault.');
		}
		return unsafeGet(i, array);
	}
	
	
	function unsafeGet(i, array)
	{
		for (var x = array.height; x > 0; x--)
		{
			var slot = i >> (x * 5);
			while (array.lengths[slot] <= i)
			{
				slot++;
			}
			if (slot > 0)
			{
				i -= array.lengths[slot - 1];
			}
			array = array.table[slot];
		}
		return array.table[i];
	}
	
	
	// Sets the value at the index i. Only the nodes leading to i will get
	// copied and updated.
	function set(i, item, array)
	{
		if (i < 0 || length(array) <= i)
		{
			return array;
		}
		return unsafeSet(i, item, array);
	}
	
	
	function unsafeSet(i, item, array)
	{
		array = nodeCopy(array);
	
		if (array.height === 0)
		{
			array.table[i] = item;
		}
		else
		{
			var slot = getSlot(i, array);
			if (slot > 0)
			{
				i -= array.lengths[slot - 1];
			}
			array.table[slot] = unsafeSet(i, item, array.table[slot]);
		}
		return array;
	}
	
	
	function initialize(len, f)
	{
		if (len <= 0)
		{
			return empty;
		}
		var h = Math.floor( Math.log(len) / Math.log(M) );
		return initialize_(f, h, 0, len);
	}
	
	function initialize_(f, h, from, to)
	{
		if (h === 0)
		{
			var table = new Array((to - from) % (M + 1));
			for (var i = 0; i < table.length; i++)
			{
			  table[i] = f(from + i);
			}
			return {
				ctor: '_Array',
				height: 0,
				table: table
			};
		}
	
		var step = Math.pow(M, h);
		var table = new Array(Math.ceil((to - from) / step));
		var lengths = new Array(table.length);
		for (var i = 0; i < table.length; i++)
		{
			table[i] = initialize_(f, h - 1, from + (i * step), Math.min(from + ((i + 1) * step), to));
			lengths[i] = length(table[i]) + (i > 0 ? lengths[i-1] : 0);
		}
		return {
			ctor: '_Array',
			height: h,
			table: table,
			lengths: lengths
		};
	}
	
	function fromList(list)
	{
		if (list.ctor === '[]')
		{
			return empty;
		}
	
		// Allocate M sized blocks (table) and write list elements to it.
		var table = new Array(M);
		var nodes = [];
		var i = 0;
	
		while (list.ctor !== '[]')
		{
			table[i] = list._0;
			list = list._1;
			i++;
	
			// table is full, so we can push a leaf containing it into the
			// next node.
			if (i === M)
			{
				var leaf = {
					ctor: '_Array',
					height: 0,
					table: table
				};
				fromListPush(leaf, nodes);
				table = new Array(M);
				i = 0;
			}
		}
	
		// Maybe there is something left on the table.
		if (i > 0)
		{
			var leaf = {
				ctor: '_Array',
				height: 0,
				table: table.splice(0, i)
			};
			fromListPush(leaf, nodes);
		}
	
		// Go through all of the nodes and eventually push them into higher nodes.
		for (var h = 0; h < nodes.length - 1; h++)
		{
			if (nodes[h].table.length > 0)
			{
				fromListPush(nodes[h], nodes);
			}
		}
	
		var head = nodes[nodes.length - 1];
		if (head.height > 0 && head.table.length === 1)
		{
			return head.table[0];
		}
		else
		{
			return head;
		}
	}
	
	// Push a node into a higher node as a child.
	function fromListPush(toPush, nodes)
	{
		var h = toPush.height;
	
		// Maybe the node on this height does not exist.
		if (nodes.length === h)
		{
			var node = {
				ctor: '_Array',
				height: h + 1,
				table: [],
				lengths: []
			};
			nodes.push(node);
		}
	
		nodes[h].table.push(toPush);
		var len = length(toPush);
		if (nodes[h].lengths.length > 0)
		{
			len += nodes[h].lengths[nodes[h].lengths.length - 1];
		}
		nodes[h].lengths.push(len);
	
		if (nodes[h].table.length === M)
		{
			fromListPush(nodes[h], nodes);
			nodes[h] = {
				ctor: '_Array',
				height: h + 1,
				table: [],
				lengths: []
			};
		}
	}
	
	// Pushes an item via push_ to the bottom right of a tree.
	function push(item, a)
	{
		var pushed = push_(item, a);
		if (pushed !== null)
		{
			return pushed;
		}
	
		var newTree = create(item, a.height);
		return siblise(a, newTree);
	}
	
	// Recursively tries to push an item to the bottom-right most
	// tree possible. If there is no space left for the item,
	// null will be returned.
	function push_(item, a)
	{
		// Handle resursion stop at leaf level.
		if (a.height === 0)
		{
			if (a.table.length < M)
			{
				var newA = {
					ctor: '_Array',
					height: 0,
					table: a.table.slice()
				};
				newA.table.push(item);
				return newA;
			}
			else
			{
			  return null;
			}
		}
	
		// Recursively push
		var pushed = push_(item, botRight(a));
	
		// There was space in the bottom right tree, so the slot will
		// be updated.
		if (pushed !== null)
		{
			var newA = nodeCopy(a);
			newA.table[newA.table.length - 1] = pushed;
			newA.lengths[newA.lengths.length - 1]++;
			return newA;
		}
	
		// When there was no space left, check if there is space left
		// for a new slot with a tree which contains only the item
		// at the bottom.
		if (a.table.length < M)
		{
			var newSlot = create(item, a.height - 1);
			var newA = nodeCopy(a);
			newA.table.push(newSlot);
			newA.lengths.push(newA.lengths[newA.lengths.length - 1] + length(newSlot));
			return newA;
		}
		else
		{
			return null;
		}
	}
	
	// Converts an array into a list of elements.
	function toList(a)
	{
		return toList_(_elm_lang$core$Native_List.Nil, a);
	}
	
	function toList_(list, a)
	{
		for (var i = a.table.length - 1; i >= 0; i--)
		{
			list =
				a.height === 0
					? _elm_lang$core$Native_List.Cons(a.table[i], list)
					: toList_(list, a.table[i]);
		}
		return list;
	}
	
	// Maps a function over the elements of an array.
	function map(f, a)
	{
		var newA = {
			ctor: '_Array',
			height: a.height,
			table: new Array(a.table.length)
		};
		if (a.height > 0)
		{
			newA.lengths = a.lengths;
		}
		for (var i = 0; i < a.table.length; i++)
		{
			newA.table[i] =
				a.height === 0
					? f(a.table[i])
					: map(f, a.table[i]);
		}
		return newA;
	}
	
	// Maps a function over the elements with their index as first argument.
	function indexedMap(f, a)
	{
		return indexedMap_(f, a, 0);
	}
	
	function indexedMap_(f, a, from)
	{
		var newA = {
			ctor: '_Array',
			height: a.height,
			table: new Array(a.table.length)
		};
		if (a.height > 0)
		{
			newA.lengths = a.lengths;
		}
		for (var i = 0; i < a.table.length; i++)
		{
			newA.table[i] =
				a.height === 0
					? A2(f, from + i, a.table[i])
					: indexedMap_(f, a.table[i], i == 0 ? from : from + a.lengths[i - 1]);
		}
		return newA;
	}
	
	function foldl(f, b, a)
	{
		if (a.height === 0)
		{
			for (var i = 0; i < a.table.length; i++)
			{
				b = A2(f, a.table[i], b);
			}
		}
		else
		{
			for (var i = 0; i < a.table.length; i++)
			{
				b = foldl(f, b, a.table[i]);
			}
		}
		return b;
	}
	
	function foldr(f, b, a)
	{
		if (a.height === 0)
		{
			for (var i = a.table.length; i--; )
			{
				b = A2(f, a.table[i], b);
			}
		}
		else
		{
			for (var i = a.table.length; i--; )
			{
				b = foldr(f, b, a.table[i]);
			}
		}
		return b;
	}
	
	// TODO: currently, it slices the right, then the left. This can be
	// optimized.
	function slice(from, to, a)
	{
		if (from < 0)
		{
			from += length(a);
		}
		if (to < 0)
		{
			to += length(a);
		}
		return sliceLeft(from, sliceRight(to, a));
	}
	
	function sliceRight(to, a)
	{
		if (to === length(a))
		{
			return a;
		}
	
		// Handle leaf level.
		if (a.height === 0)
		{
			var newA = { ctor:'_Array', height:0 };
			newA.table = a.table.slice(0, to);
			return newA;
		}
	
		// Slice the right recursively.
		var right = getSlot(to, a);
		var sliced = sliceRight(to - (right > 0 ? a.lengths[right - 1] : 0), a.table[right]);
	
		// Maybe the a node is not even needed, as sliced contains the whole slice.
		if (right === 0)
		{
			return sliced;
		}
	
		// Create new node.
		var newA = {
			ctor: '_Array',
			height: a.height,
			table: a.table.slice(0, right),
			lengths: a.lengths.slice(0, right)
		};
		if (sliced.table.length > 0)
		{
			newA.table[right] = sliced;
			newA.lengths[right] = length(sliced) + (right > 0 ? newA.lengths[right - 1] : 0);
		}
		return newA;
	}
	
	function sliceLeft(from, a)
	{
		if (from === 0)
		{
			return a;
		}
	
		// Handle leaf level.
		if (a.height === 0)
		{
			var newA = { ctor:'_Array', height:0 };
			newA.table = a.table.slice(from, a.table.length + 1);
			return newA;
		}
	
		// Slice the left recursively.
		var left = getSlot(from, a);
		var sliced = sliceLeft(from - (left > 0 ? a.lengths[left - 1] : 0), a.table[left]);
	
		// Maybe the a node is not even needed, as sliced contains the whole slice.
		if (left === a.table.length - 1)
		{
			return sliced;
		}
	
		// Create new node.
		var newA = {
			ctor: '_Array',
			height: a.height,
			table: a.table.slice(left, a.table.length + 1),
			lengths: new Array(a.table.length - left)
		};
		newA.table[0] = sliced;
		var len = 0;
		for (var i = 0; i < newA.table.length; i++)
		{
			len += length(newA.table[i]);
			newA.lengths[i] = len;
		}
	
		return newA;
	}
	
	// Appends two trees.
	function append(a,b)
	{
		if (a.table.length === 0)
		{
			return b;
		}
		if (b.table.length === 0)
		{
			return a;
		}
	
		var c = append_(a, b);
	
		// Check if both nodes can be crunshed together.
		if (c[0].table.length + c[1].table.length <= M)
		{
			if (c[0].table.length === 0)
			{
				return c[1];
			}
			if (c[1].table.length === 0)
			{
				return c[0];
			}
	
			// Adjust .table and .lengths
			c[0].table = c[0].table.concat(c[1].table);
			if (c[0].height > 0)
			{
				var len = length(c[0]);
				for (var i = 0; i < c[1].lengths.length; i++)
				{
					c[1].lengths[i] += len;
				}
				c[0].lengths = c[0].lengths.concat(c[1].lengths);
			}
	
			return c[0];
		}
	
		if (c[0].height > 0)
		{
			var toRemove = calcToRemove(a, b);
			if (toRemove > E)
			{
				c = shuffle(c[0], c[1], toRemove);
			}
		}
	
		return siblise(c[0], c[1]);
	}
	
	// Returns an array of two nodes; right and left. One node _may_ be empty.
	function append_(a, b)
	{
		if (a.height === 0 && b.height === 0)
		{
			return [a, b];
		}
	
		if (a.height !== 1 || b.height !== 1)
		{
			if (a.height === b.height)
			{
				a = nodeCopy(a);
				b = nodeCopy(b);
				var appended = append_(botRight(a), botLeft(b));
	
				insertRight(a, appended[1]);
				insertLeft(b, appended[0]);
			}
			else if (a.height > b.height)
			{
				a = nodeCopy(a);
				var appended = append_(botRight(a), b);
	
				insertRight(a, appended[0]);
				b = parentise(appended[1], appended[1].height + 1);
			}
			else
			{
				b = nodeCopy(b);
				var appended = append_(a, botLeft(b));
	
				var left = appended[0].table.length === 0 ? 0 : 1;
				var right = left === 0 ? 1 : 0;
				insertLeft(b, appended[left]);
				a = parentise(appended[right], appended[right].height + 1);
			}
		}
	
		// Check if balancing is needed and return based on that.
		if (a.table.length === 0 || b.table.length === 0)
		{
			return [a, b];
		}
	
		var toRemove = calcToRemove(a, b);
		if (toRemove <= E)
		{
			return [a, b];
		}
		return shuffle(a, b, toRemove);
	}
	
	// Helperfunctions for append_. Replaces a child node at the side of the parent.
	function insertRight(parent, node)
	{
		var index = parent.table.length - 1;
		parent.table[index] = node;
		parent.lengths[index] = length(node);
		parent.lengths[index] += index > 0 ? parent.lengths[index - 1] : 0;
	}
	
	function insertLeft(parent, node)
	{
		if (node.table.length > 0)
		{
			parent.table[0] = node;
			parent.lengths[0] = length(node);
	
			var len = length(parent.table[0]);
			for (var i = 1; i < parent.lengths.length; i++)
			{
				len += length(parent.table[i]);
				parent.lengths[i] = len;
			}
		}
		else
		{
			parent.table.shift();
			for (var i = 1; i < parent.lengths.length; i++)
			{
				parent.lengths[i] = parent.lengths[i] - parent.lengths[0];
			}
			parent.lengths.shift();
		}
	}
	
	// Returns the extra search steps for E. Refer to the paper.
	function calcToRemove(a, b)
	{
		var subLengths = 0;
		for (var i = 0; i < a.table.length; i++)
		{
			subLengths += a.table[i].table.length;
		}
		for (var i = 0; i < b.table.length; i++)
		{
			subLengths += b.table[i].table.length;
		}
	
		var toRemove = a.table.length + b.table.length;
		return toRemove - (Math.floor((subLengths - 1) / M) + 1);
	}
	
	// get2, set2 and saveSlot are helpers for accessing elements over two arrays.
	function get2(a, b, index)
	{
		return index < a.length
			? a[index]
			: b[index - a.length];
	}
	
	function set2(a, b, index, value)
	{
		if (index < a.length)
		{
			a[index] = value;
		}
		else
		{
			b[index - a.length] = value;
		}
	}
	
	function saveSlot(a, b, index, slot)
	{
		set2(a.table, b.table, index, slot);
	
		var l = (index === 0 || index === a.lengths.length)
			? 0
			: get2(a.lengths, a.lengths, index - 1);
	
		set2(a.lengths, b.lengths, index, l + length(slot));
	}
	
	// Creates a node or leaf with a given length at their arrays for perfomance.
	// Is only used by shuffle.
	function createNode(h, length)
	{
		if (length < 0)
		{
			length = 0;
		}
		var a = {
			ctor: '_Array',
			height: h,
			table: new Array(length)
		};
		if (h > 0)
		{
			a.lengths = new Array(length);
		}
		return a;
	}
	
	// Returns an array of two balanced nodes.
	function shuffle(a, b, toRemove)
	{
		var newA = createNode(a.height, Math.min(M, a.table.length + b.table.length - toRemove));
		var newB = createNode(a.height, newA.table.length - (a.table.length + b.table.length - toRemove));
	
		// Skip the slots with size M. More precise: copy the slot references
		// to the new node
		var read = 0;
		while (get2(a.table, b.table, read).table.length % M === 0)
		{
			set2(newA.table, newB.table, read, get2(a.table, b.table, read));
			set2(newA.lengths, newB.lengths, read, get2(a.lengths, b.lengths, read));
			read++;
		}
	
		// Pulling items from left to right, caching in a slot before writing
		// it into the new nodes.
		var write = read;
		var slot = new createNode(a.height - 1, 0);
		var from = 0;
	
		// If the current slot is still containing data, then there will be at
		// least one more write, so we do not break this loop yet.
		while (read - write - (slot.table.length > 0 ? 1 : 0) < toRemove)
		{
			// Find out the max possible items for copying.
			var source = get2(a.table, b.table, read);
			var to = Math.min(M - slot.table.length, source.table.length);
	
			// Copy and adjust size table.
			slot.table = slot.table.concat(source.table.slice(from, to));
			if (slot.height > 0)
			{
				var len = slot.lengths.length;
				for (var i = len; i < len + to - from; i++)
				{
					slot.lengths[i] = length(slot.table[i]);
					slot.lengths[i] += (i > 0 ? slot.lengths[i - 1] : 0);
				}
			}
	
			from += to;
	
			// Only proceed to next slots[i] if the current one was
			// fully copied.
			if (source.table.length <= to)
			{
				read++; from = 0;
			}
	
			// Only create a new slot if the current one is filled up.
			if (slot.table.length === M)
			{
				saveSlot(newA, newB, write, slot);
				slot = createNode(a.height - 1, 0);
				write++;
			}
		}
	
		// Cleanup after the loop. Copy the last slot into the new nodes.
		if (slot.table.length > 0)
		{
			saveSlot(newA, newB, write, slot);
			write++;
		}
	
		// Shift the untouched slots to the left
		while (read < a.table.length + b.table.length )
		{
			saveSlot(newA, newB, write, get2(a.table, b.table, read));
			read++;
			write++;
		}
	
		return [newA, newB];
	}
	
	// Navigation functions
	function botRight(a)
	{
		return a.table[a.table.length - 1];
	}
	function botLeft(a)
	{
		return a.table[0];
	}
	
	// Copies a node for updating. Note that you should not use this if
	// only updating only one of "table" or "lengths" for performance reasons.
	function nodeCopy(a)
	{
		var newA = {
			ctor: '_Array',
			height: a.height,
			table: a.table.slice()
		};
		if (a.height > 0)
		{
			newA.lengths = a.lengths.slice();
		}
		return newA;
	}
	
	// Returns how many items are in the tree.
	function length(array)
	{
		if (array.height === 0)
		{
			return array.table.length;
		}
		else
		{
			return array.lengths[array.lengths.length - 1];
		}
	}
	
	// Calculates in which slot of "table" the item probably is, then
	// find the exact slot via forward searching in  "lengths". Returns the index.
	function getSlot(i, a)
	{
		var slot = i >> (5 * a.height);
		while (a.lengths[slot] <= i)
		{
			slot++;
		}
		return slot;
	}
	
	// Recursively creates a tree with a given height containing
	// only the given item.
	function create(item, h)
	{
		if (h === 0)
		{
			return {
				ctor: '_Array',
				height: 0,
				table: [item]
			};
		}
		return {
			ctor: '_Array',
			height: h,
			table: [create(item, h - 1)],
			lengths: [1]
		};
	}
	
	// Recursively creates a tree that contains the given tree.
	function parentise(tree, h)
	{
		if (h === tree.height)
		{
			return tree;
		}
	
		return {
			ctor: '_Array',
			height: h,
			table: [parentise(tree, h - 1)],
			lengths: [length(tree)]
		};
	}
	
	// Emphasizes blood brotherhood beneath two trees.
	function siblise(a, b)
	{
		return {
			ctor: '_Array',
			height: a.height + 1,
			table: [a, b],
			lengths: [length(a), length(a) + length(b)]
		};
	}
	
	function toJSArray(a)
	{
		var jsArray = new Array(length(a));
		toJSArray_(jsArray, 0, a);
		return jsArray;
	}
	
	function toJSArray_(jsArray, i, a)
	{
		for (var t = 0; t < a.table.length; t++)
		{
			if (a.height === 0)
			{
				jsArray[i + t] = a.table[t];
			}
			else
			{
				var inc = t === 0 ? 0 : a.lengths[t - 1];
				toJSArray_(jsArray, i + inc, a.table[t]);
			}
		}
	}
	
	function fromJSArray(jsArray)
	{
		if (jsArray.length === 0)
		{
			return empty;
		}
		var h = Math.floor(Math.log(jsArray.length) / Math.log(M));
		return fromJSArray_(jsArray, h, 0, jsArray.length);
	}
	
	function fromJSArray_(jsArray, h, from, to)
	{
		if (h === 0)
		{
			return {
				ctor: '_Array',
				height: 0,
				table: jsArray.slice(from, to)
			};
		}
	
		var step = Math.pow(M, h);
		var table = new Array(Math.ceil((to - from) / step));
		var lengths = new Array(table.length);
		for (var i = 0; i < table.length; i++)
		{
			table[i] = fromJSArray_(jsArray, h - 1, from + (i * step), Math.min(from + ((i + 1) * step), to));
			lengths[i] = length(table[i]) + (i > 0 ? lengths[i - 1] : 0);
		}
		return {
			ctor: '_Array',
			height: h,
			table: table,
			lengths: lengths
		};
	}
	
	return {
		empty: empty,
		fromList: fromList,
		toList: toList,
		initialize: F2(initialize),
		append: F2(append),
		push: F2(push),
		slice: F3(slice),
		get: F2(get),
		set: F3(set),
		map: F2(map),
		indexedMap: F2(indexedMap),
		foldl: F3(foldl),
		foldr: F3(foldr),
		length: length,
	
		toJSArray: toJSArray,
		fromJSArray: fromJSArray
	};
	
	}();
	//import Native.Utils //
	
	var _elm_lang$core$Native_Basics = function() {
	
	function div(a, b)
	{
		return (a / b) | 0;
	}
	function rem(a, b)
	{
		return a % b;
	}
	function mod(a, b)
	{
		if (b === 0)
		{
			throw new Error('Cannot perform mod 0. Division by zero error.');
		}
		var r = a % b;
		var m = a === 0 ? 0 : (b > 0 ? (a >= 0 ? r : r + b) : -mod(-a, -b));
	
		return m === b ? 0 : m;
	}
	function logBase(base, n)
	{
		return Math.log(n) / Math.log(base);
	}
	function negate(n)
	{
		return -n;
	}
	function abs(n)
	{
		return n < 0 ? -n : n;
	}
	
	function min(a, b)
	{
		return _elm_lang$core$Native_Utils.cmp(a, b) < 0 ? a : b;
	}
	function max(a, b)
	{
		return _elm_lang$core$Native_Utils.cmp(a, b) > 0 ? a : b;
	}
	function clamp(lo, hi, n)
	{
		return _elm_lang$core$Native_Utils.cmp(n, lo) < 0
			? lo
			: _elm_lang$core$Native_Utils.cmp(n, hi) > 0
				? hi
				: n;
	}
	
	var ord = ['LT', 'EQ', 'GT'];
	
	function compare(x, y)
	{
		return { ctor: ord[_elm_lang$core$Native_Utils.cmp(x, y) + 1] };
	}
	
	function xor(a, b)
	{
		return a !== b;
	}
	function not(b)
	{
		return !b;
	}
	function isInfinite(n)
	{
		return n === Infinity || n === -Infinity;
	}
	
	function truncate(n)
	{
		return n | 0;
	}
	
	function degrees(d)
	{
		return d * Math.PI / 180;
	}
	function turns(t)
	{
		return 2 * Math.PI * t;
	}
	function fromPolar(point)
	{
		var r = point._0;
		var t = point._1;
		return _elm_lang$core$Native_Utils.Tuple2(r * Math.cos(t), r * Math.sin(t));
	}
	function toPolar(point)
	{
		var x = point._0;
		var y = point._1;
		return _elm_lang$core$Native_Utils.Tuple2(Math.sqrt(x * x + y * y), Math.atan2(y, x));
	}
	
	return {
		div: F2(div),
		rem: F2(rem),
		mod: F2(mod),
	
		pi: Math.PI,
		e: Math.E,
		cos: Math.cos,
		sin: Math.sin,
		tan: Math.tan,
		acos: Math.acos,
		asin: Math.asin,
		atan: Math.atan,
		atan2: F2(Math.atan2),
	
		degrees: degrees,
		turns: turns,
		fromPolar: fromPolar,
		toPolar: toPolar,
	
		sqrt: Math.sqrt,
		logBase: F2(logBase),
		negate: negate,
		abs: abs,
		min: F2(min),
		max: F2(max),
		clamp: F3(clamp),
		compare: F2(compare),
	
		xor: F2(xor),
		not: not,
	
		truncate: truncate,
		ceiling: Math.ceil,
		floor: Math.floor,
		round: Math.round,
		toFloat: function(x) { return x; },
		isNaN: isNaN,
		isInfinite: isInfinite
	};
	
	}();
	//import //
	
	var _elm_lang$core$Native_Utils = function() {
	
	// COMPARISONS
	
	function eq(x, y)
	{
		var stack = [];
		var isEqual = eqHelp(x, y, 0, stack);
		var pair;
		while (isEqual && (pair = stack.pop()))
		{
			isEqual = eqHelp(pair.x, pair.y, 0, stack);
		}
		return isEqual;
	}
	
	
	function eqHelp(x, y, depth, stack)
	{
		if (depth > 100)
		{
			stack.push({ x: x, y: y });
			return true;
		}
	
		if (x === y)
		{
			return true;
		}
	
		if (typeof x !== 'object')
		{
			if (typeof x === 'function')
			{
				throw new Error(
					'Trying to use `(==)` on functions. There is no way to know if functions are "the same" in the Elm sense.'
					+ ' Read more about this at http://package.elm-lang.org/packages/elm-lang/core/latest/Basics#=='
					+ ' which describes why it is this way and what the better version will look like.'
				);
			}
			return false;
		}
	
		if (x === null || y === null)
		{
			return false
		}
	
		if (x instanceof Date)
		{
			return x.getTime() === y.getTime();
		}
	
		if (!('ctor' in x))
		{
			for (var key in x)
			{
				if (!eqHelp(x[key], y[key], depth + 1, stack))
				{
					return false;
				}
			}
			return true;
		}
	
		// convert Dicts and Sets to lists
		if (x.ctor === 'RBNode_elm_builtin' || x.ctor === 'RBEmpty_elm_builtin')
		{
			x = _elm_lang$core$Dict$toList(x);
			y = _elm_lang$core$Dict$toList(y);
		}
		if (x.ctor === 'Set_elm_builtin')
		{
			x = _elm_lang$core$Set$toList(x);
			y = _elm_lang$core$Set$toList(y);
		}
	
		// check if lists are equal without recursion
		if (x.ctor === '::')
		{
			var a = x;
			var b = y;
			while (a.ctor === '::' && b.ctor === '::')
			{
				if (!eqHelp(a._0, b._0, depth + 1, stack))
				{
					return false;
				}
				a = a._1;
				b = b._1;
			}
			return a.ctor === b.ctor;
		}
	
		// check if Arrays are equal
		if (x.ctor === '_Array')
		{
			var xs = _elm_lang$core$Native_Array.toJSArray(x);
			var ys = _elm_lang$core$Native_Array.toJSArray(y);
			if (xs.length !== ys.length)
			{
				return false;
			}
			for (var i = 0; i < xs.length; i++)
			{
				if (!eqHelp(xs[i], ys[i], depth + 1, stack))
				{
					return false;
				}
			}
			return true;
		}
	
		if (!eqHelp(x.ctor, y.ctor, depth + 1, stack))
		{
			return false;
		}
	
		for (var key in x)
		{
			if (!eqHelp(x[key], y[key], depth + 1, stack))
			{
				return false;
			}
		}
		return true;
	}
	
	// Code in Generate/JavaScript.hs, Basics.js, and List.js depends on
	// the particular integer values assigned to LT, EQ, and GT.
	
	var LT = -1, EQ = 0, GT = 1;
	
	function cmp(x, y)
	{
		if (typeof x !== 'object')
		{
			return x === y ? EQ : x < y ? LT : GT;
		}
	
		if (x instanceof String)
		{
			var a = x.valueOf();
			var b = y.valueOf();
			return a === b ? EQ : a < b ? LT : GT;
		}
	
		if (x.ctor === '::' || x.ctor === '[]')
		{
			while (x.ctor === '::' && y.ctor === '::')
			{
				var ord = cmp(x._0, y._0);
				if (ord !== EQ)
				{
					return ord;
				}
				x = x._1;
				y = y._1;
			}
			return x.ctor === y.ctor ? EQ : x.ctor === '[]' ? LT : GT;
		}
	
		if (x.ctor.slice(0, 6) === '_Tuple')
		{
			var ord;
			var n = x.ctor.slice(6) - 0;
			var err = 'cannot compare tuples with more than 6 elements.';
			if (n === 0) return EQ;
			if (n >= 1) { ord = cmp(x._0, y._0); if (ord !== EQ) return ord;
			if (n >= 2) { ord = cmp(x._1, y._1); if (ord !== EQ) return ord;
			if (n >= 3) { ord = cmp(x._2, y._2); if (ord !== EQ) return ord;
			if (n >= 4) { ord = cmp(x._3, y._3); if (ord !== EQ) return ord;
			if (n >= 5) { ord = cmp(x._4, y._4); if (ord !== EQ) return ord;
			if (n >= 6) { ord = cmp(x._5, y._5); if (ord !== EQ) return ord;
			if (n >= 7) throw new Error('Comparison error: ' + err); } } } } } }
			return EQ;
		}
	
		throw new Error(
			'Comparison error: comparison is only defined on ints, '
			+ 'floats, times, chars, strings, lists of comparable values, '
			+ 'and tuples of comparable values.'
		);
	}
	
	
	// COMMON VALUES
	
	var Tuple0 = {
		ctor: '_Tuple0'
	};
	
	function Tuple2(x, y)
	{
		return {
			ctor: '_Tuple2',
			_0: x,
			_1: y
		};
	}
	
	function chr(c)
	{
		return new String(c);
	}
	
	
	// GUID
	
	var count = 0;
	function guid(_)
	{
		return count++;
	}
	
	
	// RECORDS
	
	function update(oldRecord, updatedFields)
	{
		var newRecord = {};
	
		for (var key in oldRecord)
		{
			newRecord[key] = oldRecord[key];
		}
	
		for (var key in updatedFields)
		{
			newRecord[key] = updatedFields[key];
		}
	
		return newRecord;
	}
	
	
	//// LIST STUFF ////
	
	var Nil = { ctor: '[]' };
	
	function Cons(hd, tl)
	{
		return {
			ctor: '::',
			_0: hd,
			_1: tl
		};
	}
	
	function append(xs, ys)
	{
		// append Strings
		if (typeof xs === 'string')
		{
			return xs + ys;
		}
	
		// append Lists
		if (xs.ctor === '[]')
		{
			return ys;
		}
		var root = Cons(xs._0, Nil);
		var curr = root;
		xs = xs._1;
		while (xs.ctor !== '[]')
		{
			curr._1 = Cons(xs._0, Nil);
			xs = xs._1;
			curr = curr._1;
		}
		curr._1 = ys;
		return root;
	}
	
	
	// CRASHES
	
	function crash(moduleName, region)
	{
		return function(message) {
			throw new Error(
				'Ran into a `Debug.crash` in module `' + moduleName + '` ' + regionToString(region) + '\n'
				+ 'The message provided by the code author is:\n\n    '
				+ message
			);
		};
	}
	
	function crashCase(moduleName, region, value)
	{
		return function(message) {
			throw new Error(
				'Ran into a `Debug.crash` in module `' + moduleName + '`\n\n'
				+ 'This was caused by the `case` expression ' + regionToString(region) + '.\n'
				+ 'One of the branches ended with a crash and the following value got through:\n\n    ' + toString(value) + '\n\n'
				+ 'The message provided by the code author is:\n\n    '
				+ message
			);
		};
	}
	
	function regionToString(region)
	{
		if (region.start.line == region.end.line)
		{
			return 'on line ' + region.start.line;
		}
		return 'between lines ' + region.start.line + ' and ' + region.end.line;
	}
	
	
	// TO STRING
	
	function toString(v)
	{
		var type = typeof v;
		if (type === 'function')
		{
			var name = v.func ? v.func.name : v.name;
			return '<function' + (name === '' ? '' : ':') + name + '>';
		}
	
		if (type === 'boolean')
		{
			return v ? 'True' : 'False';
		}
	
		if (type === 'number')
		{
			return v + '';
		}
	
		if (v instanceof String)
		{
			return '\'' + addSlashes(v, true) + '\'';
		}
	
		if (type === 'string')
		{
			return '"' + addSlashes(v, false) + '"';
		}
	
		if (v === null)
		{
			return 'null';
		}
	
		if (type === 'object' && 'ctor' in v)
		{
			var ctorStarter = v.ctor.substring(0, 5);
	
			if (ctorStarter === '_Tupl')
			{
				var output = [];
				for (var k in v)
				{
					if (k === 'ctor') continue;
					output.push(toString(v[k]));
				}
				return '(' + output.join(',') + ')';
			}
	
			if (ctorStarter === '_Task')
			{
				return '<task>'
			}
	
			if (v.ctor === '_Array')
			{
				var list = _elm_lang$core$Array$toList(v);
				return 'Array.fromList ' + toString(list);
			}
	
			if (v.ctor === '<decoder>')
			{
				return '<decoder>';
			}
	
			if (v.ctor === '_Process')
			{
				return '<process:' + v.id + '>';
			}
	
			if (v.ctor === '::')
			{
				var output = '[' + toString(v._0);
				v = v._1;
				while (v.ctor === '::')
				{
					output += ',' + toString(v._0);
					v = v._1;
				}
				return output + ']';
			}
	
			if (v.ctor === '[]')
			{
				return '[]';
			}
	
			if (v.ctor === 'Set_elm_builtin')
			{
				return 'Set.fromList ' + toString(_elm_lang$core$Set$toList(v));
			}
	
			if (v.ctor === 'RBNode_elm_builtin' || v.ctor === 'RBEmpty_elm_builtin')
			{
				return 'Dict.fromList ' + toString(_elm_lang$core$Dict$toList(v));
			}
	
			var output = '';
			for (var i in v)
			{
				if (i === 'ctor') continue;
				var str = toString(v[i]);
				var c0 = str[0];
				var parenless = c0 === '{' || c0 === '(' || c0 === '<' || c0 === '"' || str.indexOf(' ') < 0;
				output += ' ' + (parenless ? str : '(' + str + ')');
			}
			return v.ctor + output;
		}
	
		if (type === 'object')
		{
			if (v instanceof Date)
			{
				return '<' + v.toString() + '>';
			}
	
			if (v.elm_web_socket)
			{
				return '<websocket>';
			}
	
			var output = [];
			for (var k in v)
			{
				output.push(k + ' = ' + toString(v[k]));
			}
			if (output.length === 0)
			{
				return '{}';
			}
			return '{ ' + output.join(', ') + ' }';
		}
	
		return '<internal structure>';
	}
	
	function addSlashes(str, isChar)
	{
		var s = str.replace(/\\/g, '\\\\')
				  .replace(/\n/g, '\\n')
				  .replace(/\t/g, '\\t')
				  .replace(/\r/g, '\\r')
				  .replace(/\v/g, '\\v')
				  .replace(/\0/g, '\\0');
		if (isChar)
		{
			return s.replace(/\'/g, '\\\'');
		}
		else
		{
			return s.replace(/\"/g, '\\"');
		}
	}
	
	
	return {
		eq: eq,
		cmp: cmp,
		Tuple0: Tuple0,
		Tuple2: Tuple2,
		chr: chr,
		update: update,
		guid: guid,
	
		append: F2(append),
	
		crash: crash,
		crashCase: crashCase,
	
		toString: toString
	};
	
	}();
	var _elm_lang$core$Basics$never = function (_p0) {
		never:
		while (true) {
			var _p1 = _p0;
			var _v1 = _p1._0;
			_p0 = _v1;
			continue never;
		}
	};
	var _elm_lang$core$Basics$uncurry = F2(
		function (f, _p2) {
			var _p3 = _p2;
			return A2(f, _p3._0, _p3._1);
		});
	var _elm_lang$core$Basics$curry = F3(
		function (f, a, b) {
			return f(
				{ctor: '_Tuple2', _0: a, _1: b});
		});
	var _elm_lang$core$Basics$flip = F3(
		function (f, b, a) {
			return A2(f, a, b);
		});
	var _elm_lang$core$Basics$always = F2(
		function (a, _p4) {
			return a;
		});
	var _elm_lang$core$Basics$identity = function (x) {
		return x;
	};
	var _elm_lang$core$Basics_ops = _elm_lang$core$Basics_ops || {};
	_elm_lang$core$Basics_ops['<|'] = F2(
		function (f, x) {
			return f(x);
		});
	var _elm_lang$core$Basics_ops = _elm_lang$core$Basics_ops || {};
	_elm_lang$core$Basics_ops['|>'] = F2(
		function (x, f) {
			return f(x);
		});
	var _elm_lang$core$Basics_ops = _elm_lang$core$Basics_ops || {};
	_elm_lang$core$Basics_ops['>>'] = F3(
		function (f, g, x) {
			return g(
				f(x));
		});
	var _elm_lang$core$Basics_ops = _elm_lang$core$Basics_ops || {};
	_elm_lang$core$Basics_ops['<<'] = F3(
		function (g, f, x) {
			return g(
				f(x));
		});
	var _elm_lang$core$Basics_ops = _elm_lang$core$Basics_ops || {};
	_elm_lang$core$Basics_ops['++'] = _elm_lang$core$Native_Utils.append;
	var _elm_lang$core$Basics$toString = _elm_lang$core$Native_Utils.toString;
	var _elm_lang$core$Basics$isInfinite = _elm_lang$core$Native_Basics.isInfinite;
	var _elm_lang$core$Basics$isNaN = _elm_lang$core$Native_Basics.isNaN;
	var _elm_lang$core$Basics$toFloat = _elm_lang$core$Native_Basics.toFloat;
	var _elm_lang$core$Basics$ceiling = _elm_lang$core$Native_Basics.ceiling;
	var _elm_lang$core$Basics$floor = _elm_lang$core$Native_Basics.floor;
	var _elm_lang$core$Basics$truncate = _elm_lang$core$Native_Basics.truncate;
	var _elm_lang$core$Basics$round = _elm_lang$core$Native_Basics.round;
	var _elm_lang$core$Basics$not = _elm_lang$core$Native_Basics.not;
	var _elm_lang$core$Basics$xor = _elm_lang$core$Native_Basics.xor;
	var _elm_lang$core$Basics_ops = _elm_lang$core$Basics_ops || {};
	_elm_lang$core$Basics_ops['||'] = _elm_lang$core$Native_Basics.or;
	var _elm_lang$core$Basics_ops = _elm_lang$core$Basics_ops || {};
	_elm_lang$core$Basics_ops['&&'] = _elm_lang$core$Native_Basics.and;
	var _elm_lang$core$Basics$max = _elm_lang$core$Native_Basics.max;
	var _elm_lang$core$Basics$min = _elm_lang$core$Native_Basics.min;
	var _elm_lang$core$Basics$compare = _elm_lang$core$Native_Basics.compare;
	var _elm_lang$core$Basics_ops = _elm_lang$core$Basics_ops || {};
	_elm_lang$core$Basics_ops['>='] = _elm_lang$core$Native_Basics.ge;
	var _elm_lang$core$Basics_ops = _elm_lang$core$Basics_ops || {};
	_elm_lang$core$Basics_ops['<='] = _elm_lang$core$Native_Basics.le;
	var _elm_lang$core$Basics_ops = _elm_lang$core$Basics_ops || {};
	_elm_lang$core$Basics_ops['>'] = _elm_lang$core$Native_Basics.gt;
	var _elm_lang$core$Basics_ops = _elm_lang$core$Basics_ops || {};
	_elm_lang$core$Basics_ops['<'] = _elm_lang$core$Native_Basics.lt;
	var _elm_lang$core$Basics_ops = _elm_lang$core$Basics_ops || {};
	_elm_lang$core$Basics_ops['/='] = _elm_lang$core$Native_Basics.neq;
	var _elm_lang$core$Basics_ops = _elm_lang$core$Basics_ops || {};
	_elm_lang$core$Basics_ops['=='] = _elm_lang$core$Native_Basics.eq;
	var _elm_lang$core$Basics$e = _elm_lang$core$Native_Basics.e;
	var _elm_lang$core$Basics$pi = _elm_lang$core$Native_Basics.pi;
	var _elm_lang$core$Basics$clamp = _elm_lang$core$Native_Basics.clamp;
	var _elm_lang$core$Basics$logBase = _elm_lang$core$Native_Basics.logBase;
	var _elm_lang$core$Basics$abs = _elm_lang$core$Native_Basics.abs;
	var _elm_lang$core$Basics$negate = _elm_lang$core$Native_Basics.negate;
	var _elm_lang$core$Basics$sqrt = _elm_lang$core$Native_Basics.sqrt;
	var _elm_lang$core$Basics$atan2 = _elm_lang$core$Native_Basics.atan2;
	var _elm_lang$core$Basics$atan = _elm_lang$core$Native_Basics.atan;
	var _elm_lang$core$Basics$asin = _elm_lang$core$Native_Basics.asin;
	var _elm_lang$core$Basics$acos = _elm_lang$core$Native_Basics.acos;
	var _elm_lang$core$Basics$tan = _elm_lang$core$Native_Basics.tan;
	var _elm_lang$core$Basics$sin = _elm_lang$core$Native_Basics.sin;
	var _elm_lang$core$Basics$cos = _elm_lang$core$Native_Basics.cos;
	var _elm_lang$core$Basics_ops = _elm_lang$core$Basics_ops || {};
	_elm_lang$core$Basics_ops['^'] = _elm_lang$core$Native_Basics.exp;
	var _elm_lang$core$Basics_ops = _elm_lang$core$Basics_ops || {};
	_elm_lang$core$Basics_ops['%'] = _elm_lang$core$Native_Basics.mod;
	var _elm_lang$core$Basics$rem = _elm_lang$core$Native_Basics.rem;
	var _elm_lang$core$Basics_ops = _elm_lang$core$Basics_ops || {};
	_elm_lang$core$Basics_ops['//'] = _elm_lang$core$Native_Basics.div;
	var _elm_lang$core$Basics_ops = _elm_lang$core$Basics_ops || {};
	_elm_lang$core$Basics_ops['/'] = _elm_lang$core$Native_Basics.floatDiv;
	var _elm_lang$core$Basics_ops = _elm_lang$core$Basics_ops || {};
	_elm_lang$core$Basics_ops['*'] = _elm_lang$core$Native_Basics.mul;
	var _elm_lang$core$Basics_ops = _elm_lang$core$Basics_ops || {};
	_elm_lang$core$Basics_ops['-'] = _elm_lang$core$Native_Basics.sub;
	var _elm_lang$core$Basics_ops = _elm_lang$core$Basics_ops || {};
	_elm_lang$core$Basics_ops['+'] = _elm_lang$core$Native_Basics.add;
	var _elm_lang$core$Basics$toPolar = _elm_lang$core$Native_Basics.toPolar;
	var _elm_lang$core$Basics$fromPolar = _elm_lang$core$Native_Basics.fromPolar;
	var _elm_lang$core$Basics$turns = _elm_lang$core$Native_Basics.turns;
	var _elm_lang$core$Basics$degrees = _elm_lang$core$Native_Basics.degrees;
	var _elm_lang$core$Basics$radians = function (t) {
		return t;
	};
	var _elm_lang$core$Basics$GT = {ctor: 'GT'};
	var _elm_lang$core$Basics$EQ = {ctor: 'EQ'};
	var _elm_lang$core$Basics$LT = {ctor: 'LT'};
	var _elm_lang$core$Basics$JustOneMore = function (a) {
		return {ctor: 'JustOneMore', _0: a};
	};
	
	var _elm_lang$core$Maybe$withDefault = F2(
		function ($default, maybe) {
			var _p0 = maybe;
			if (_p0.ctor === 'Just') {
				return _p0._0;
			} else {
				return $default;
			}
		});
	var _elm_lang$core$Maybe$Nothing = {ctor: 'Nothing'};
	var _elm_lang$core$Maybe$andThen = F2(
		function (callback, maybeValue) {
			var _p1 = maybeValue;
			if (_p1.ctor === 'Just') {
				return callback(_p1._0);
			} else {
				return _elm_lang$core$Maybe$Nothing;
			}
		});
	var _elm_lang$core$Maybe$Just = function (a) {
		return {ctor: 'Just', _0: a};
	};
	var _elm_lang$core$Maybe$map = F2(
		function (f, maybe) {
			var _p2 = maybe;
			if (_p2.ctor === 'Just') {
				return _elm_lang$core$Maybe$Just(
					f(_p2._0));
			} else {
				return _elm_lang$core$Maybe$Nothing;
			}
		});
	var _elm_lang$core$Maybe$map2 = F3(
		function (func, ma, mb) {
			var _p3 = {ctor: '_Tuple2', _0: ma, _1: mb};
			if (((_p3.ctor === '_Tuple2') && (_p3._0.ctor === 'Just')) && (_p3._1.ctor === 'Just')) {
				return _elm_lang$core$Maybe$Just(
					A2(func, _p3._0._0, _p3._1._0));
			} else {
				return _elm_lang$core$Maybe$Nothing;
			}
		});
	var _elm_lang$core$Maybe$map3 = F4(
		function (func, ma, mb, mc) {
			var _p4 = {ctor: '_Tuple3', _0: ma, _1: mb, _2: mc};
			if ((((_p4.ctor === '_Tuple3') && (_p4._0.ctor === 'Just')) && (_p4._1.ctor === 'Just')) && (_p4._2.ctor === 'Just')) {
				return _elm_lang$core$Maybe$Just(
					A3(func, _p4._0._0, _p4._1._0, _p4._2._0));
			} else {
				return _elm_lang$core$Maybe$Nothing;
			}
		});
	var _elm_lang$core$Maybe$map4 = F5(
		function (func, ma, mb, mc, md) {
			var _p5 = {ctor: '_Tuple4', _0: ma, _1: mb, _2: mc, _3: md};
			if (((((_p5.ctor === '_Tuple4') && (_p5._0.ctor === 'Just')) && (_p5._1.ctor === 'Just')) && (_p5._2.ctor === 'Just')) && (_p5._3.ctor === 'Just')) {
				return _elm_lang$core$Maybe$Just(
					A4(func, _p5._0._0, _p5._1._0, _p5._2._0, _p5._3._0));
			} else {
				return _elm_lang$core$Maybe$Nothing;
			}
		});
	var _elm_lang$core$Maybe$map5 = F6(
		function (func, ma, mb, mc, md, me) {
			var _p6 = {ctor: '_Tuple5', _0: ma, _1: mb, _2: mc, _3: md, _4: me};
			if ((((((_p6.ctor === '_Tuple5') && (_p6._0.ctor === 'Just')) && (_p6._1.ctor === 'Just')) && (_p6._2.ctor === 'Just')) && (_p6._3.ctor === 'Just')) && (_p6._4.ctor === 'Just')) {
				return _elm_lang$core$Maybe$Just(
					A5(func, _p6._0._0, _p6._1._0, _p6._2._0, _p6._3._0, _p6._4._0));
			} else {
				return _elm_lang$core$Maybe$Nothing;
			}
		});
	
	//import Native.Utils //
	
	var _elm_lang$core$Native_List = function() {
	
	var Nil = { ctor: '[]' };
	
	function Cons(hd, tl)
	{
		return { ctor: '::', _0: hd, _1: tl };
	}
	
	function fromArray(arr)
	{
		var out = Nil;
		for (var i = arr.length; i--; )
		{
			out = Cons(arr[i], out);
		}
		return out;
	}
	
	function toArray(xs)
	{
		var out = [];
		while (xs.ctor !== '[]')
		{
			out.push(xs._0);
			xs = xs._1;
		}
		return out;
	}
	
	function foldr(f, b, xs)
	{
		var arr = toArray(xs);
		var acc = b;
		for (var i = arr.length; i--; )
		{
			acc = A2(f, arr[i], acc);
		}
		return acc;
	}
	
	function map2(f, xs, ys)
	{
		var arr = [];
		while (xs.ctor !== '[]' && ys.ctor !== '[]')
		{
			arr.push(A2(f, xs._0, ys._0));
			xs = xs._1;
			ys = ys._1;
		}
		return fromArray(arr);
	}
	
	function map3(f, xs, ys, zs)
	{
		var arr = [];
		while (xs.ctor !== '[]' && ys.ctor !== '[]' && zs.ctor !== '[]')
		{
			arr.push(A3(f, xs._0, ys._0, zs._0));
			xs = xs._1;
			ys = ys._1;
			zs = zs._1;
		}
		return fromArray(arr);
	}
	
	function map4(f, ws, xs, ys, zs)
	{
		var arr = [];
		while (   ws.ctor !== '[]'
			   && xs.ctor !== '[]'
			   && ys.ctor !== '[]'
			   && zs.ctor !== '[]')
		{
			arr.push(A4(f, ws._0, xs._0, ys._0, zs._0));
			ws = ws._1;
			xs = xs._1;
			ys = ys._1;
			zs = zs._1;
		}
		return fromArray(arr);
	}
	
	function map5(f, vs, ws, xs, ys, zs)
	{
		var arr = [];
		while (   vs.ctor !== '[]'
			   && ws.ctor !== '[]'
			   && xs.ctor !== '[]'
			   && ys.ctor !== '[]'
			   && zs.ctor !== '[]')
		{
			arr.push(A5(f, vs._0, ws._0, xs._0, ys._0, zs._0));
			vs = vs._1;
			ws = ws._1;
			xs = xs._1;
			ys = ys._1;
			zs = zs._1;
		}
		return fromArray(arr);
	}
	
	function sortBy(f, xs)
	{
		return fromArray(toArray(xs).sort(function(a, b) {
			return _elm_lang$core$Native_Utils.cmp(f(a), f(b));
		}));
	}
	
	function sortWith(f, xs)
	{
		return fromArray(toArray(xs).sort(function(a, b) {
			var ord = f(a)(b).ctor;
			return ord === 'EQ' ? 0 : ord === 'LT' ? -1 : 1;
		}));
	}
	
	return {
		Nil: Nil,
		Cons: Cons,
		cons: F2(Cons),
		toArray: toArray,
		fromArray: fromArray,
	
		foldr: F3(foldr),
	
		map2: F3(map2),
		map3: F4(map3),
		map4: F5(map4),
		map5: F6(map5),
		sortBy: F2(sortBy),
		sortWith: F2(sortWith)
	};
	
	}();
	var _elm_lang$core$List$sortWith = _elm_lang$core$Native_List.sortWith;
	var _elm_lang$core$List$sortBy = _elm_lang$core$Native_List.sortBy;
	var _elm_lang$core$List$sort = function (xs) {
		return A2(_elm_lang$core$List$sortBy, _elm_lang$core$Basics$identity, xs);
	};
	var _elm_lang$core$List$drop = F2(
		function (n, list) {
			drop:
			while (true) {
				if (_elm_lang$core$Native_Utils.cmp(n, 0) < 1) {
					return list;
				} else {
					var _p0 = list;
					if (_p0.ctor === '[]') {
						return list;
					} else {
						var _v1 = n - 1,
							_v2 = _p0._1;
						n = _v1;
						list = _v2;
						continue drop;
					}
				}
			}
		});
	var _elm_lang$core$List$map5 = _elm_lang$core$Native_List.map5;
	var _elm_lang$core$List$map4 = _elm_lang$core$Native_List.map4;
	var _elm_lang$core$List$map3 = _elm_lang$core$Native_List.map3;
	var _elm_lang$core$List$map2 = _elm_lang$core$Native_List.map2;
	var _elm_lang$core$List$any = F2(
		function (isOkay, list) {
			any:
			while (true) {
				var _p1 = list;
				if (_p1.ctor === '[]') {
					return false;
				} else {
					if (isOkay(_p1._0)) {
						return true;
					} else {
						var _v4 = isOkay,
							_v5 = _p1._1;
						isOkay = _v4;
						list = _v5;
						continue any;
					}
				}
			}
		});
	var _elm_lang$core$List$all = F2(
		function (isOkay, list) {
			return !A2(
				_elm_lang$core$List$any,
				function (_p2) {
					return !isOkay(_p2);
				},
				list);
		});
	var _elm_lang$core$List$foldr = _elm_lang$core$Native_List.foldr;
	var _elm_lang$core$List$foldl = F3(
		function (func, acc, list) {
			foldl:
			while (true) {
				var _p3 = list;
				if (_p3.ctor === '[]') {
					return acc;
				} else {
					var _v7 = func,
						_v8 = A2(func, _p3._0, acc),
						_v9 = _p3._1;
					func = _v7;
					acc = _v8;
					list = _v9;
					continue foldl;
				}
			}
		});
	var _elm_lang$core$List$length = function (xs) {
		return A3(
			_elm_lang$core$List$foldl,
			F2(
				function (_p4, i) {
					return i + 1;
				}),
			0,
			xs);
	};
	var _elm_lang$core$List$sum = function (numbers) {
		return A3(
			_elm_lang$core$List$foldl,
			F2(
				function (x, y) {
					return x + y;
				}),
			0,
			numbers);
	};
	var _elm_lang$core$List$product = function (numbers) {
		return A3(
			_elm_lang$core$List$foldl,
			F2(
				function (x, y) {
					return x * y;
				}),
			1,
			numbers);
	};
	var _elm_lang$core$List$maximum = function (list) {
		var _p5 = list;
		if (_p5.ctor === '::') {
			return _elm_lang$core$Maybe$Just(
				A3(_elm_lang$core$List$foldl, _elm_lang$core$Basics$max, _p5._0, _p5._1));
		} else {
			return _elm_lang$core$Maybe$Nothing;
		}
	};
	var _elm_lang$core$List$minimum = function (list) {
		var _p6 = list;
		if (_p6.ctor === '::') {
			return _elm_lang$core$Maybe$Just(
				A3(_elm_lang$core$List$foldl, _elm_lang$core$Basics$min, _p6._0, _p6._1));
		} else {
			return _elm_lang$core$Maybe$Nothing;
		}
	};
	var _elm_lang$core$List$member = F2(
		function (x, xs) {
			return A2(
				_elm_lang$core$List$any,
				function (a) {
					return _elm_lang$core$Native_Utils.eq(a, x);
				},
				xs);
		});
	var _elm_lang$core$List$isEmpty = function (xs) {
		var _p7 = xs;
		if (_p7.ctor === '[]') {
			return true;
		} else {
			return false;
		}
	};
	var _elm_lang$core$List$tail = function (list) {
		var _p8 = list;
		if (_p8.ctor === '::') {
			return _elm_lang$core$Maybe$Just(_p8._1);
		} else {
			return _elm_lang$core$Maybe$Nothing;
		}
	};
	var _elm_lang$core$List$head = function (list) {
		var _p9 = list;
		if (_p9.ctor === '::') {
			return _elm_lang$core$Maybe$Just(_p9._0);
		} else {
			return _elm_lang$core$Maybe$Nothing;
		}
	};
	var _elm_lang$core$List_ops = _elm_lang$core$List_ops || {};
	_elm_lang$core$List_ops['::'] = _elm_lang$core$Native_List.cons;
	var _elm_lang$core$List$map = F2(
		function (f, xs) {
			return A3(
				_elm_lang$core$List$foldr,
				F2(
					function (x, acc) {
						return {
							ctor: '::',
							_0: f(x),
							_1: acc
						};
					}),
				{ctor: '[]'},
				xs);
		});
	var _elm_lang$core$List$filter = F2(
		function (pred, xs) {
			var conditionalCons = F2(
				function (front, back) {
					return pred(front) ? {ctor: '::', _0: front, _1: back} : back;
				});
			return A3(
				_elm_lang$core$List$foldr,
				conditionalCons,
				{ctor: '[]'},
				xs);
		});
	var _elm_lang$core$List$maybeCons = F3(
		function (f, mx, xs) {
			var _p10 = f(mx);
			if (_p10.ctor === 'Just') {
				return {ctor: '::', _0: _p10._0, _1: xs};
			} else {
				return xs;
			}
		});
	var _elm_lang$core$List$filterMap = F2(
		function (f, xs) {
			return A3(
				_elm_lang$core$List$foldr,
				_elm_lang$core$List$maybeCons(f),
				{ctor: '[]'},
				xs);
		});
	var _elm_lang$core$List$reverse = function (list) {
		return A3(
			_elm_lang$core$List$foldl,
			F2(
				function (x, y) {
					return {ctor: '::', _0: x, _1: y};
				}),
			{ctor: '[]'},
			list);
	};
	var _elm_lang$core$List$scanl = F3(
		function (f, b, xs) {
			var scan1 = F2(
				function (x, accAcc) {
					var _p11 = accAcc;
					if (_p11.ctor === '::') {
						return {
							ctor: '::',
							_0: A2(f, x, _p11._0),
							_1: accAcc
						};
					} else {
						return {ctor: '[]'};
					}
				});
			return _elm_lang$core$List$reverse(
				A3(
					_elm_lang$core$List$foldl,
					scan1,
					{
						ctor: '::',
						_0: b,
						_1: {ctor: '[]'}
					},
					xs));
		});
	var _elm_lang$core$List$append = F2(
		function (xs, ys) {
			var _p12 = ys;
			if (_p12.ctor === '[]') {
				return xs;
			} else {
				return A3(
					_elm_lang$core$List$foldr,
					F2(
						function (x, y) {
							return {ctor: '::', _0: x, _1: y};
						}),
					ys,
					xs);
			}
		});
	var _elm_lang$core$List$concat = function (lists) {
		return A3(
			_elm_lang$core$List$foldr,
			_elm_lang$core$List$append,
			{ctor: '[]'},
			lists);
	};
	var _elm_lang$core$List$concatMap = F2(
		function (f, list) {
			return _elm_lang$core$List$concat(
				A2(_elm_lang$core$List$map, f, list));
		});
	var _elm_lang$core$List$partition = F2(
		function (pred, list) {
			var step = F2(
				function (x, _p13) {
					var _p14 = _p13;
					var _p16 = _p14._0;
					var _p15 = _p14._1;
					return pred(x) ? {
						ctor: '_Tuple2',
						_0: {ctor: '::', _0: x, _1: _p16},
						_1: _p15
					} : {
						ctor: '_Tuple2',
						_0: _p16,
						_1: {ctor: '::', _0: x, _1: _p15}
					};
				});
			return A3(
				_elm_lang$core$List$foldr,
				step,
				{
					ctor: '_Tuple2',
					_0: {ctor: '[]'},
					_1: {ctor: '[]'}
				},
				list);
		});
	var _elm_lang$core$List$unzip = function (pairs) {
		var step = F2(
			function (_p18, _p17) {
				var _p19 = _p18;
				var _p20 = _p17;
				return {
					ctor: '_Tuple2',
					_0: {ctor: '::', _0: _p19._0, _1: _p20._0},
					_1: {ctor: '::', _0: _p19._1, _1: _p20._1}
				};
			});
		return A3(
			_elm_lang$core$List$foldr,
			step,
			{
				ctor: '_Tuple2',
				_0: {ctor: '[]'},
				_1: {ctor: '[]'}
			},
			pairs);
	};
	var _elm_lang$core$List$intersperse = F2(
		function (sep, xs) {
			var _p21 = xs;
			if (_p21.ctor === '[]') {
				return {ctor: '[]'};
			} else {
				var step = F2(
					function (x, rest) {
						return {
							ctor: '::',
							_0: sep,
							_1: {ctor: '::', _0: x, _1: rest}
						};
					});
				var spersed = A3(
					_elm_lang$core$List$foldr,
					step,
					{ctor: '[]'},
					_p21._1);
				return {ctor: '::', _0: _p21._0, _1: spersed};
			}
		});
	var _elm_lang$core$List$takeReverse = F3(
		function (n, list, taken) {
			takeReverse:
			while (true) {
				if (_elm_lang$core$Native_Utils.cmp(n, 0) < 1) {
					return taken;
				} else {
					var _p22 = list;
					if (_p22.ctor === '[]') {
						return taken;
					} else {
						var _v23 = n - 1,
							_v24 = _p22._1,
							_v25 = {ctor: '::', _0: _p22._0, _1: taken};
						n = _v23;
						list = _v24;
						taken = _v25;
						continue takeReverse;
					}
				}
			}
		});
	var _elm_lang$core$List$takeTailRec = F2(
		function (n, list) {
			return _elm_lang$core$List$reverse(
				A3(
					_elm_lang$core$List$takeReverse,
					n,
					list,
					{ctor: '[]'}));
		});
	var _elm_lang$core$List$takeFast = F3(
		function (ctr, n, list) {
			if (_elm_lang$core$Native_Utils.cmp(n, 0) < 1) {
				return {ctor: '[]'};
			} else {
				var _p23 = {ctor: '_Tuple2', _0: n, _1: list};
				_v26_5:
				do {
					_v26_1:
					do {
						if (_p23.ctor === '_Tuple2') {
							if (_p23._1.ctor === '[]') {
								return list;
							} else {
								if (_p23._1._1.ctor === '::') {
									switch (_p23._0) {
										case 1:
											break _v26_1;
										case 2:
											return {
												ctor: '::',
												_0: _p23._1._0,
												_1: {
													ctor: '::',
													_0: _p23._1._1._0,
													_1: {ctor: '[]'}
												}
											};
										case 3:
											if (_p23._1._1._1.ctor === '::') {
												return {
													ctor: '::',
													_0: _p23._1._0,
													_1: {
														ctor: '::',
														_0: _p23._1._1._0,
														_1: {
															ctor: '::',
															_0: _p23._1._1._1._0,
															_1: {ctor: '[]'}
														}
													}
												};
											} else {
												break _v26_5;
											}
										default:
											if ((_p23._1._1._1.ctor === '::') && (_p23._1._1._1._1.ctor === '::')) {
												var _p28 = _p23._1._1._1._0;
												var _p27 = _p23._1._1._0;
												var _p26 = _p23._1._0;
												var _p25 = _p23._1._1._1._1._0;
												var _p24 = _p23._1._1._1._1._1;
												return (_elm_lang$core$Native_Utils.cmp(ctr, 1000) > 0) ? {
													ctor: '::',
													_0: _p26,
													_1: {
														ctor: '::',
														_0: _p27,
														_1: {
															ctor: '::',
															_0: _p28,
															_1: {
																ctor: '::',
																_0: _p25,
																_1: A2(_elm_lang$core$List$takeTailRec, n - 4, _p24)
															}
														}
													}
												} : {
													ctor: '::',
													_0: _p26,
													_1: {
														ctor: '::',
														_0: _p27,
														_1: {
															ctor: '::',
															_0: _p28,
															_1: {
																ctor: '::',
																_0: _p25,
																_1: A3(_elm_lang$core$List$takeFast, ctr + 1, n - 4, _p24)
															}
														}
													}
												};
											} else {
												break _v26_5;
											}
									}
								} else {
									if (_p23._0 === 1) {
										break _v26_1;
									} else {
										break _v26_5;
									}
								}
							}
						} else {
							break _v26_5;
						}
					} while(false);
					return {
						ctor: '::',
						_0: _p23._1._0,
						_1: {ctor: '[]'}
					};
				} while(false);
				return list;
			}
		});
	var _elm_lang$core$List$take = F2(
		function (n, list) {
			return A3(_elm_lang$core$List$takeFast, 0, n, list);
		});
	var _elm_lang$core$List$repeatHelp = F3(
		function (result, n, value) {
			repeatHelp:
			while (true) {
				if (_elm_lang$core$Native_Utils.cmp(n, 0) < 1) {
					return result;
				} else {
					var _v27 = {ctor: '::', _0: value, _1: result},
						_v28 = n - 1,
						_v29 = value;
					result = _v27;
					n = _v28;
					value = _v29;
					continue repeatHelp;
				}
			}
		});
	var _elm_lang$core$List$repeat = F2(
		function (n, value) {
			return A3(
				_elm_lang$core$List$repeatHelp,
				{ctor: '[]'},
				n,
				value);
		});
	var _elm_lang$core$List$rangeHelp = F3(
		function (lo, hi, list) {
			rangeHelp:
			while (true) {
				if (_elm_lang$core$Native_Utils.cmp(lo, hi) < 1) {
					var _v30 = lo,
						_v31 = hi - 1,
						_v32 = {ctor: '::', _0: hi, _1: list};
					lo = _v30;
					hi = _v31;
					list = _v32;
					continue rangeHelp;
				} else {
					return list;
				}
			}
		});
	var _elm_lang$core$List$range = F2(
		function (lo, hi) {
			return A3(
				_elm_lang$core$List$rangeHelp,
				lo,
				hi,
				{ctor: '[]'});
		});
	var _elm_lang$core$List$indexedMap = F2(
		function (f, xs) {
			return A3(
				_elm_lang$core$List$map2,
				f,
				A2(
					_elm_lang$core$List$range,
					0,
					_elm_lang$core$List$length(xs) - 1),
				xs);
		});
	
	var _elm_lang$core$Array$append = _elm_lang$core$Native_Array.append;
	var _elm_lang$core$Array$length = _elm_lang$core$Native_Array.length;
	var _elm_lang$core$Array$isEmpty = function (array) {
		return _elm_lang$core$Native_Utils.eq(
			_elm_lang$core$Array$length(array),
			0);
	};
	var _elm_lang$core$Array$slice = _elm_lang$core$Native_Array.slice;
	var _elm_lang$core$Array$set = _elm_lang$core$Native_Array.set;
	var _elm_lang$core$Array$get = F2(
		function (i, array) {
			return ((_elm_lang$core$Native_Utils.cmp(0, i) < 1) && (_elm_lang$core$Native_Utils.cmp(
				i,
				_elm_lang$core$Native_Array.length(array)) < 0)) ? _elm_lang$core$Maybe$Just(
				A2(_elm_lang$core$Native_Array.get, i, array)) : _elm_lang$core$Maybe$Nothing;
		});
	var _elm_lang$core$Array$push = _elm_lang$core$Native_Array.push;
	var _elm_lang$core$Array$empty = _elm_lang$core$Native_Array.empty;
	var _elm_lang$core$Array$filter = F2(
		function (isOkay, arr) {
			var update = F2(
				function (x, xs) {
					return isOkay(x) ? A2(_elm_lang$core$Native_Array.push, x, xs) : xs;
				});
			return A3(_elm_lang$core$Native_Array.foldl, update, _elm_lang$core$Native_Array.empty, arr);
		});
	var _elm_lang$core$Array$foldr = _elm_lang$core$Native_Array.foldr;
	var _elm_lang$core$Array$foldl = _elm_lang$core$Native_Array.foldl;
	var _elm_lang$core$Array$indexedMap = _elm_lang$core$Native_Array.indexedMap;
	var _elm_lang$core$Array$map = _elm_lang$core$Native_Array.map;
	var _elm_lang$core$Array$toIndexedList = function (array) {
		return A3(
			_elm_lang$core$List$map2,
			F2(
				function (v0, v1) {
					return {ctor: '_Tuple2', _0: v0, _1: v1};
				}),
			A2(
				_elm_lang$core$List$range,
				0,
				_elm_lang$core$Native_Array.length(array) - 1),
			_elm_lang$core$Native_Array.toList(array));
	};
	var _elm_lang$core$Array$toList = _elm_lang$core$Native_Array.toList;
	var _elm_lang$core$Array$fromList = _elm_lang$core$Native_Array.fromList;
	var _elm_lang$core$Array$initialize = _elm_lang$core$Native_Array.initialize;
	var _elm_lang$core$Array$repeat = F2(
		function (n, e) {
			return A2(
				_elm_lang$core$Array$initialize,
				n,
				_elm_lang$core$Basics$always(e));
		});
	var _elm_lang$core$Array$Array = {ctor: 'Array'};
	
	//import Native.Utils //
	
	var _elm_lang$core$Native_Char = function() {
	
	return {
		fromCode: function(c) { return _elm_lang$core$Native_Utils.chr(String.fromCharCode(c)); },
		toCode: function(c) { return c.charCodeAt(0); },
		toUpper: function(c) { return _elm_lang$core$Native_Utils.chr(c.toUpperCase()); },
		toLower: function(c) { return _elm_lang$core$Native_Utils.chr(c.toLowerCase()); },
		toLocaleUpper: function(c) { return _elm_lang$core$Native_Utils.chr(c.toLocaleUpperCase()); },
		toLocaleLower: function(c) { return _elm_lang$core$Native_Utils.chr(c.toLocaleLowerCase()); }
	};
	
	}();
	var _elm_lang$core$Char$fromCode = _elm_lang$core$Native_Char.fromCode;
	var _elm_lang$core$Char$toCode = _elm_lang$core$Native_Char.toCode;
	var _elm_lang$core$Char$toLocaleLower = _elm_lang$core$Native_Char.toLocaleLower;
	var _elm_lang$core$Char$toLocaleUpper = _elm_lang$core$Native_Char.toLocaleUpper;
	var _elm_lang$core$Char$toLower = _elm_lang$core$Native_Char.toLower;
	var _elm_lang$core$Char$toUpper = _elm_lang$core$Native_Char.toUpper;
	var _elm_lang$core$Char$isBetween = F3(
		function (low, high, $char) {
			var code = _elm_lang$core$Char$toCode($char);
			return (_elm_lang$core$Native_Utils.cmp(
				code,
				_elm_lang$core$Char$toCode(low)) > -1) && (_elm_lang$core$Native_Utils.cmp(
				code,
				_elm_lang$core$Char$toCode(high)) < 1);
		});
	var _elm_lang$core$Char$isUpper = A2(
		_elm_lang$core$Char$isBetween,
		_elm_lang$core$Native_Utils.chr('A'),
		_elm_lang$core$Native_Utils.chr('Z'));
	var _elm_lang$core$Char$isLower = A2(
		_elm_lang$core$Char$isBetween,
		_elm_lang$core$Native_Utils.chr('a'),
		_elm_lang$core$Native_Utils.chr('z'));
	var _elm_lang$core$Char$isDigit = A2(
		_elm_lang$core$Char$isBetween,
		_elm_lang$core$Native_Utils.chr('0'),
		_elm_lang$core$Native_Utils.chr('9'));
	var _elm_lang$core$Char$isOctDigit = A2(
		_elm_lang$core$Char$isBetween,
		_elm_lang$core$Native_Utils.chr('0'),
		_elm_lang$core$Native_Utils.chr('7'));
	var _elm_lang$core$Char$isHexDigit = function ($char) {
		return _elm_lang$core$Char$isDigit($char) || (A3(
			_elm_lang$core$Char$isBetween,
			_elm_lang$core$Native_Utils.chr('a'),
			_elm_lang$core$Native_Utils.chr('f'),
			$char) || A3(
			_elm_lang$core$Char$isBetween,
			_elm_lang$core$Native_Utils.chr('A'),
			_elm_lang$core$Native_Utils.chr('F'),
			$char));
	};
	
	//import Native.Utils //
	
	var _elm_lang$core$Native_Scheduler = function() {
	
	var MAX_STEPS = 10000;
	
	
	// TASKS
	
	function succeed(value)
	{
		return {
			ctor: '_Task_succeed',
			value: value
		};
	}
	
	function fail(error)
	{
		return {
			ctor: '_Task_fail',
			value: error
		};
	}
	
	function nativeBinding(callback)
	{
		return {
			ctor: '_Task_nativeBinding',
			callback: callback,
			cancel: null
		};
	}
	
	function andThen(callback, task)
	{
		return {
			ctor: '_Task_andThen',
			callback: callback,
			task: task
		};
	}
	
	function onError(callback, task)
	{
		return {
			ctor: '_Task_onError',
			callback: callback,
			task: task
		};
	}
	
	function receive(callback)
	{
		return {
			ctor: '_Task_receive',
			callback: callback
		};
	}
	
	
	// PROCESSES
	
	function rawSpawn(task)
	{
		var process = {
			ctor: '_Process',
			id: _elm_lang$core$Native_Utils.guid(),
			root: task,
			stack: null,
			mailbox: []
		};
	
		enqueue(process);
	
		return process;
	}
	
	function spawn(task)
	{
		return nativeBinding(function(callback) {
			var process = rawSpawn(task);
			callback(succeed(process));
		});
	}
	
	function rawSend(process, msg)
	{
		process.mailbox.push(msg);
		enqueue(process);
	}
	
	function send(process, msg)
	{
		return nativeBinding(function(callback) {
			rawSend(process, msg);
			callback(succeed(_elm_lang$core$Native_Utils.Tuple0));
		});
	}
	
	function kill(process)
	{
		return nativeBinding(function(callback) {
			var root = process.root;
			if (root.ctor === '_Task_nativeBinding' && root.cancel)
			{
				root.cancel();
			}
	
			process.root = null;
	
			callback(succeed(_elm_lang$core$Native_Utils.Tuple0));
		});
	}
	
	function sleep(time)
	{
		return nativeBinding(function(callback) {
			var id = setTimeout(function() {
				callback(succeed(_elm_lang$core$Native_Utils.Tuple0));
			}, time);
	
			return function() { clearTimeout(id); };
		});
	}
	
	
	// STEP PROCESSES
	
	function step(numSteps, process)
	{
		while (numSteps < MAX_STEPS)
		{
			var ctor = process.root.ctor;
	
			if (ctor === '_Task_succeed')
			{
				while (process.stack && process.stack.ctor === '_Task_onError')
				{
					process.stack = process.stack.rest;
				}
				if (process.stack === null)
				{
					break;
				}
				process.root = process.stack.callback(process.root.value);
				process.stack = process.stack.rest;
				++numSteps;
				continue;
			}
	
			if (ctor === '_Task_fail')
			{
				while (process.stack && process.stack.ctor === '_Task_andThen')
				{
					process.stack = process.stack.rest;
				}
				if (process.stack === null)
				{
					break;
				}
				process.root = process.stack.callback(process.root.value);
				process.stack = process.stack.rest;
				++numSteps;
				continue;
			}
	
			if (ctor === '_Task_andThen')
			{
				process.stack = {
					ctor: '_Task_andThen',
					callback: process.root.callback,
					rest: process.stack
				};
				process.root = process.root.task;
				++numSteps;
				continue;
			}
	
			if (ctor === '_Task_onError')
			{
				process.stack = {
					ctor: '_Task_onError',
					callback: process.root.callback,
					rest: process.stack
				};
				process.root = process.root.task;
				++numSteps;
				continue;
			}
	
			if (ctor === '_Task_nativeBinding')
			{
				process.root.cancel = process.root.callback(function(newRoot) {
					process.root = newRoot;
					enqueue(process);
				});
	
				break;
			}
	
			if (ctor === '_Task_receive')
			{
				var mailbox = process.mailbox;
				if (mailbox.length === 0)
				{
					break;
				}
	
				process.root = process.root.callback(mailbox.shift());
				++numSteps;
				continue;
			}
	
			throw new Error(ctor);
		}
	
		if (numSteps < MAX_STEPS)
		{
			return numSteps + 1;
		}
		enqueue(process);
	
		return numSteps;
	}
	
	
	// WORK QUEUE
	
	var working = false;
	var workQueue = [];
	
	function enqueue(process)
	{
		workQueue.push(process);
	
		if (!working)
		{
			setTimeout(work, 0);
			working = true;
		}
	}
	
	function work()
	{
		var numSteps = 0;
		var process;
		while (numSteps < MAX_STEPS && (process = workQueue.shift()))
		{
			if (process.root)
			{
				numSteps = step(numSteps, process);
			}
		}
		if (!process)
		{
			working = false;
			return;
		}
		setTimeout(work, 0);
	}
	
	
	return {
		succeed: succeed,
		fail: fail,
		nativeBinding: nativeBinding,
		andThen: F2(andThen),
		onError: F2(onError),
		receive: receive,
	
		spawn: spawn,
		kill: kill,
		sleep: sleep,
		send: F2(send),
	
		rawSpawn: rawSpawn,
		rawSend: rawSend
	};
	
	}();
	//import //
	
	var _elm_lang$core$Native_Platform = function() {
	
	
	// PROGRAMS
	
	function program(impl)
	{
		return function(flagDecoder)
		{
			return function(object, moduleName)
			{
				object['worker'] = function worker(flags)
				{
					if (typeof flags !== 'undefined')
					{
						throw new Error(
							'The `' + moduleName + '` module does not need flags.\n'
							+ 'Call ' + moduleName + '.worker() with no arguments and you should be all set!'
						);
					}
	
					return initialize(
						impl.init,
						impl.update,
						impl.subscriptions,
						renderer
					);
				};
			};
		};
	}
	
	function programWithFlags(impl)
	{
		return function(flagDecoder)
		{
			return function(object, moduleName)
			{
				object['worker'] = function worker(flags)
				{
					if (typeof flagDecoder === 'undefined')
					{
						throw new Error(
							'Are you trying to sneak a Never value into Elm? Trickster!\n'
							+ 'It looks like ' + moduleName + '.main is defined with `programWithFlags` but has type `Program Never`.\n'
							+ 'Use `program` instead if you do not want flags.'
						);
					}
	
					var result = A2(_elm_lang$core$Native_Json.run, flagDecoder, flags);
					if (result.ctor === 'Err')
					{
						throw new Error(
							moduleName + '.worker(...) was called with an unexpected argument.\n'
							+ 'I tried to convert it to an Elm value, but ran into this problem:\n\n'
							+ result._0
						);
					}
	
					return initialize(
						impl.init(result._0),
						impl.update,
						impl.subscriptions,
						renderer
					);
				};
			};
		};
	}
	
	function renderer(enqueue, _)
	{
		return function(_) {};
	}
	
	
	// HTML TO PROGRAM
	
	function htmlToProgram(vnode)
	{
		var emptyBag = batch(_elm_lang$core$Native_List.Nil);
		var noChange = _elm_lang$core$Native_Utils.Tuple2(
			_elm_lang$core$Native_Utils.Tuple0,
			emptyBag
		);
	
		return _elm_lang$virtual_dom$VirtualDom$program({
			init: noChange,
			view: function(model) { return main; },
			update: F2(function(msg, model) { return noChange; }),
			subscriptions: function (model) { return emptyBag; }
		});
	}
	
	
	// INITIALIZE A PROGRAM
	
	function initialize(init, update, subscriptions, renderer)
	{
		// ambient state
		var managers = {};
		var updateView;
	
		// init and update state in main process
		var initApp = _elm_lang$core$Native_Scheduler.nativeBinding(function(callback) {
			var model = init._0;
			updateView = renderer(enqueue, model);
			var cmds = init._1;
			var subs = subscriptions(model);
			dispatchEffects(managers, cmds, subs);
			callback(_elm_lang$core$Native_Scheduler.succeed(model));
		});
	
		function onMessage(msg, model)
		{
			return _elm_lang$core$Native_Scheduler.nativeBinding(function(callback) {
				var results = A2(update, msg, model);
				model = results._0;
				updateView(model);
				var cmds = results._1;
				var subs = subscriptions(model);
				dispatchEffects(managers, cmds, subs);
				callback(_elm_lang$core$Native_Scheduler.succeed(model));
			});
		}
	
		var mainProcess = spawnLoop(initApp, onMessage);
	
		function enqueue(msg)
		{
			_elm_lang$core$Native_Scheduler.rawSend(mainProcess, msg);
		}
	
		var ports = setupEffects(managers, enqueue);
	
		return ports ? { ports: ports } : {};
	}
	
	
	// EFFECT MANAGERS
	
	var effectManagers = {};
	
	function setupEffects(managers, callback)
	{
		var ports;
	
		// setup all necessary effect managers
		for (var key in effectManagers)
		{
			var manager = effectManagers[key];
	
			if (manager.isForeign)
			{
				ports = ports || {};
				ports[key] = manager.tag === 'cmd'
					? setupOutgoingPort(key)
					: setupIncomingPort(key, callback);
			}
	
			managers[key] = makeManager(manager, callback);
		}
	
		return ports;
	}
	
	function makeManager(info, callback)
	{
		var router = {
			main: callback,
			self: undefined
		};
	
		var tag = info.tag;
		var onEffects = info.onEffects;
		var onSelfMsg = info.onSelfMsg;
	
		function onMessage(msg, state)
		{
			if (msg.ctor === 'self')
			{
				return A3(onSelfMsg, router, msg._0, state);
			}
	
			var fx = msg._0;
			switch (tag)
			{
				case 'cmd':
					return A3(onEffects, router, fx.cmds, state);
	
				case 'sub':
					return A3(onEffects, router, fx.subs, state);
	
				case 'fx':
					return A4(onEffects, router, fx.cmds, fx.subs, state);
			}
		}
	
		var process = spawnLoop(info.init, onMessage);
		router.self = process;
		return process;
	}
	
	function sendToApp(router, msg)
	{
		return _elm_lang$core$Native_Scheduler.nativeBinding(function(callback)
		{
			router.main(msg);
			callback(_elm_lang$core$Native_Scheduler.succeed(_elm_lang$core$Native_Utils.Tuple0));
		});
	}
	
	function sendToSelf(router, msg)
	{
		return A2(_elm_lang$core$Native_Scheduler.send, router.self, {
			ctor: 'self',
			_0: msg
		});
	}
	
	
	// HELPER for STATEFUL LOOPS
	
	function spawnLoop(init, onMessage)
	{
		var andThen = _elm_lang$core$Native_Scheduler.andThen;
	
		function loop(state)
		{
			var handleMsg = _elm_lang$core$Native_Scheduler.receive(function(msg) {
				return onMessage(msg, state);
			});
			return A2(andThen, loop, handleMsg);
		}
	
		var task = A2(andThen, loop, init);
	
		return _elm_lang$core$Native_Scheduler.rawSpawn(task);
	}
	
	
	// BAGS
	
	function leaf(home)
	{
		return function(value)
		{
			return {
				type: 'leaf',
				home: home,
				value: value
			};
		};
	}
	
	function batch(list)
	{
		return {
			type: 'node',
			branches: list
		};
	}
	
	function map(tagger, bag)
	{
		return {
			type: 'map',
			tagger: tagger,
			tree: bag
		}
	}
	
	
	// PIPE BAGS INTO EFFECT MANAGERS
	
	function dispatchEffects(managers, cmdBag, subBag)
	{
		var effectsDict = {};
		gatherEffects(true, cmdBag, effectsDict, null);
		gatherEffects(false, subBag, effectsDict, null);
	
		for (var home in managers)
		{
			var fx = home in effectsDict
				? effectsDict[home]
				: {
					cmds: _elm_lang$core$Native_List.Nil,
					subs: _elm_lang$core$Native_List.Nil
				};
	
			_elm_lang$core$Native_Scheduler.rawSend(managers[home], { ctor: 'fx', _0: fx });
		}
	}
	
	function gatherEffects(isCmd, bag, effectsDict, taggers)
	{
		switch (bag.type)
		{
			case 'leaf':
				var home = bag.home;
				var effect = toEffect(isCmd, home, taggers, bag.value);
				effectsDict[home] = insert(isCmd, effect, effectsDict[home]);
				return;
	
			case 'node':
				var list = bag.branches;
				while (list.ctor !== '[]')
				{
					gatherEffects(isCmd, list._0, effectsDict, taggers);
					list = list._1;
				}
				return;
	
			case 'map':
				gatherEffects(isCmd, bag.tree, effectsDict, {
					tagger: bag.tagger,
					rest: taggers
				});
				return;
		}
	}
	
	function toEffect(isCmd, home, taggers, value)
	{
		function applyTaggers(x)
		{
			var temp = taggers;
			while (temp)
			{
				x = temp.tagger(x);
				temp = temp.rest;
			}
			return x;
		}
	
		var map = isCmd
			? effectManagers[home].cmdMap
			: effectManagers[home].subMap;
	
		return A2(map, applyTaggers, value)
	}
	
	function insert(isCmd, newEffect, effects)
	{
		effects = effects || {
			cmds: _elm_lang$core$Native_List.Nil,
			subs: _elm_lang$core$Native_List.Nil
		};
		if (isCmd)
		{
			effects.cmds = _elm_lang$core$Native_List.Cons(newEffect, effects.cmds);
			return effects;
		}
		effects.subs = _elm_lang$core$Native_List.Cons(newEffect, effects.subs);
		return effects;
	}
	
	
	// PORTS
	
	function checkPortName(name)
	{
		if (name in effectManagers)
		{
			throw new Error('There can only be one port named `' + name + '`, but your program has multiple.');
		}
	}
	
	
	// OUTGOING PORTS
	
	function outgoingPort(name, converter)
	{
		checkPortName(name);
		effectManagers[name] = {
			tag: 'cmd',
			cmdMap: outgoingPortMap,
			converter: converter,
			isForeign: true
		};
		return leaf(name);
	}
	
	var outgoingPortMap = F2(function cmdMap(tagger, value) {
		return value;
	});
	
	function setupOutgoingPort(name)
	{
		var subs = [];
		var converter = effectManagers[name].converter;
	
		// CREATE MANAGER
	
		var init = _elm_lang$core$Native_Scheduler.succeed(null);
	
		function onEffects(router, cmdList, state)
		{
			while (cmdList.ctor !== '[]')
			{
				// grab a separate reference to subs in case unsubscribe is called
				var currentSubs = subs;
				var value = converter(cmdList._0);
				for (var i = 0; i < currentSubs.length; i++)
				{
					currentSubs[i](value);
				}
				cmdList = cmdList._1;
			}
			return init;
		}
	
		effectManagers[name].init = init;
		effectManagers[name].onEffects = F3(onEffects);
	
		// PUBLIC API
	
		function subscribe(callback)
		{
			subs.push(callback);
		}
	
		function unsubscribe(callback)
		{
			// copy subs into a new array in case unsubscribe is called within a
			// subscribed callback
			subs = subs.slice();
			var index = subs.indexOf(callback);
			if (index >= 0)
			{
				subs.splice(index, 1);
			}
		}
	
		return {
			subscribe: subscribe,
			unsubscribe: unsubscribe
		};
	}
	
	
	// INCOMING PORTS
	
	function incomingPort(name, converter)
	{
		checkPortName(name);
		effectManagers[name] = {
			tag: 'sub',
			subMap: incomingPortMap,
			converter: converter,
			isForeign: true
		};
		return leaf(name);
	}
	
	var incomingPortMap = F2(function subMap(tagger, finalTagger)
	{
		return function(value)
		{
			return tagger(finalTagger(value));
		};
	});
	
	function setupIncomingPort(name, callback)
	{
		var sentBeforeInit = [];
		var subs = _elm_lang$core$Native_List.Nil;
		var converter = effectManagers[name].converter;
		var currentOnEffects = preInitOnEffects;
		var currentSend = preInitSend;
	
		// CREATE MANAGER
	
		var init = _elm_lang$core$Native_Scheduler.succeed(null);
	
		function preInitOnEffects(router, subList, state)
		{
			var postInitResult = postInitOnEffects(router, subList, state);
	
			for(var i = 0; i < sentBeforeInit.length; i++)
			{
				postInitSend(sentBeforeInit[i]);
			}
	
			sentBeforeInit = null; // to release objects held in queue
			currentSend = postInitSend;
			currentOnEffects = postInitOnEffects;
			return postInitResult;
		}
	
		function postInitOnEffects(router, subList, state)
		{
			subs = subList;
			return init;
		}
	
		function onEffects(router, subList, state)
		{
			return currentOnEffects(router, subList, state);
		}
	
		effectManagers[name].init = init;
		effectManagers[name].onEffects = F3(onEffects);
	
		// PUBLIC API
	
		function preInitSend(value)
		{
			sentBeforeInit.push(value);
		}
	
		function postInitSend(incomingValue)
		{
			var result = A2(_elm_lang$core$Json_Decode$decodeValue, converter, incomingValue);
			if (result.ctor === 'Err')
			{
				throw new Error('Trying to send an unexpected type of value through port `' + name + '`:\n' + result._0);
			}
	
			var value = result._0;
			var temp = subs;
			while (temp.ctor !== '[]')
			{
				callback(temp._0(value));
				temp = temp._1;
			}
		}
	
		function send(incomingValue)
		{
			currentSend(incomingValue);
		}
	
		return { send: send };
	}
	
	return {
		// routers
		sendToApp: F2(sendToApp),
		sendToSelf: F2(sendToSelf),
	
		// global setup
		effectManagers: effectManagers,
		outgoingPort: outgoingPort,
		incomingPort: incomingPort,
	
		htmlToProgram: htmlToProgram,
		program: program,
		programWithFlags: programWithFlags,
		initialize: initialize,
	
		// effect bags
		leaf: leaf,
		batch: batch,
		map: F2(map)
	};
	
	}();
	
	var _elm_lang$core$Platform_Cmd$batch = _elm_lang$core$Native_Platform.batch;
	var _elm_lang$core$Platform_Cmd$none = _elm_lang$core$Platform_Cmd$batch(
		{ctor: '[]'});
	var _elm_lang$core$Platform_Cmd_ops = _elm_lang$core$Platform_Cmd_ops || {};
	_elm_lang$core$Platform_Cmd_ops['!'] = F2(
		function (model, commands) {
			return {
				ctor: '_Tuple2',
				_0: model,
				_1: _elm_lang$core$Platform_Cmd$batch(commands)
			};
		});
	var _elm_lang$core$Platform_Cmd$map = _elm_lang$core$Native_Platform.map;
	var _elm_lang$core$Platform_Cmd$Cmd = {ctor: 'Cmd'};
	
	var _elm_lang$core$Platform_Sub$batch = _elm_lang$core$Native_Platform.batch;
	var _elm_lang$core$Platform_Sub$none = _elm_lang$core$Platform_Sub$batch(
		{ctor: '[]'});
	var _elm_lang$core$Platform_Sub$map = _elm_lang$core$Native_Platform.map;
	var _elm_lang$core$Platform_Sub$Sub = {ctor: 'Sub'};
	
	var _elm_lang$core$Platform$hack = _elm_lang$core$Native_Scheduler.succeed;
	var _elm_lang$core$Platform$sendToSelf = _elm_lang$core$Native_Platform.sendToSelf;
	var _elm_lang$core$Platform$sendToApp = _elm_lang$core$Native_Platform.sendToApp;
	var _elm_lang$core$Platform$programWithFlags = _elm_lang$core$Native_Platform.programWithFlags;
	var _elm_lang$core$Platform$program = _elm_lang$core$Native_Platform.program;
	var _elm_lang$core$Platform$Program = {ctor: 'Program'};
	var _elm_lang$core$Platform$Task = {ctor: 'Task'};
	var _elm_lang$core$Platform$ProcessId = {ctor: 'ProcessId'};
	var _elm_lang$core$Platform$Router = {ctor: 'Router'};
	
	var _elm_lang$core$Result$toMaybe = function (result) {
		var _p0 = result;
		if (_p0.ctor === 'Ok') {
			return _elm_lang$core$Maybe$Just(_p0._0);
		} else {
			return _elm_lang$core$Maybe$Nothing;
		}
	};
	var _elm_lang$core$Result$withDefault = F2(
		function (def, result) {
			var _p1 = result;
			if (_p1.ctor === 'Ok') {
				return _p1._0;
			} else {
				return def;
			}
		});
	var _elm_lang$core$Result$Err = function (a) {
		return {ctor: 'Err', _0: a};
	};
	var _elm_lang$core$Result$andThen = F2(
		function (callback, result) {
			var _p2 = result;
			if (_p2.ctor === 'Ok') {
				return callback(_p2._0);
			} else {
				return _elm_lang$core$Result$Err(_p2._0);
			}
		});
	var _elm_lang$core$Result$Ok = function (a) {
		return {ctor: 'Ok', _0: a};
	};
	var _elm_lang$core$Result$map = F2(
		function (func, ra) {
			var _p3 = ra;
			if (_p3.ctor === 'Ok') {
				return _elm_lang$core$Result$Ok(
					func(_p3._0));
			} else {
				return _elm_lang$core$Result$Err(_p3._0);
			}
		});
	var _elm_lang$core$Result$map2 = F3(
		function (func, ra, rb) {
			var _p4 = {ctor: '_Tuple2', _0: ra, _1: rb};
			if (_p4._0.ctor === 'Ok') {
				if (_p4._1.ctor === 'Ok') {
					return _elm_lang$core$Result$Ok(
						A2(func, _p4._0._0, _p4._1._0));
				} else {
					return _elm_lang$core$Result$Err(_p4._1._0);
				}
			} else {
				return _elm_lang$core$Result$Err(_p4._0._0);
			}
		});
	var _elm_lang$core$Result$map3 = F4(
		function (func, ra, rb, rc) {
			var _p5 = {ctor: '_Tuple3', _0: ra, _1: rb, _2: rc};
			if (_p5._0.ctor === 'Ok') {
				if (_p5._1.ctor === 'Ok') {
					if (_p5._2.ctor === 'Ok') {
						return _elm_lang$core$Result$Ok(
							A3(func, _p5._0._0, _p5._1._0, _p5._2._0));
					} else {
						return _elm_lang$core$Result$Err(_p5._2._0);
					}
				} else {
					return _elm_lang$core$Result$Err(_p5._1._0);
				}
			} else {
				return _elm_lang$core$Result$Err(_p5._0._0);
			}
		});
	var _elm_lang$core$Result$map4 = F5(
		function (func, ra, rb, rc, rd) {
			var _p6 = {ctor: '_Tuple4', _0: ra, _1: rb, _2: rc, _3: rd};
			if (_p6._0.ctor === 'Ok') {
				if (_p6._1.ctor === 'Ok') {
					if (_p6._2.ctor === 'Ok') {
						if (_p6._3.ctor === 'Ok') {
							return _elm_lang$core$Result$Ok(
								A4(func, _p6._0._0, _p6._1._0, _p6._2._0, _p6._3._0));
						} else {
							return _elm_lang$core$Result$Err(_p6._3._0);
						}
					} else {
						return _elm_lang$core$Result$Err(_p6._2._0);
					}
				} else {
					return _elm_lang$core$Result$Err(_p6._1._0);
				}
			} else {
				return _elm_lang$core$Result$Err(_p6._0._0);
			}
		});
	var _elm_lang$core$Result$map5 = F6(
		function (func, ra, rb, rc, rd, re) {
			var _p7 = {ctor: '_Tuple5', _0: ra, _1: rb, _2: rc, _3: rd, _4: re};
			if (_p7._0.ctor === 'Ok') {
				if (_p7._1.ctor === 'Ok') {
					if (_p7._2.ctor === 'Ok') {
						if (_p7._3.ctor === 'Ok') {
							if (_p7._4.ctor === 'Ok') {
								return _elm_lang$core$Result$Ok(
									A5(func, _p7._0._0, _p7._1._0, _p7._2._0, _p7._3._0, _p7._4._0));
							} else {
								return _elm_lang$core$Result$Err(_p7._4._0);
							}
						} else {
							return _elm_lang$core$Result$Err(_p7._3._0);
						}
					} else {
						return _elm_lang$core$Result$Err(_p7._2._0);
					}
				} else {
					return _elm_lang$core$Result$Err(_p7._1._0);
				}
			} else {
				return _elm_lang$core$Result$Err(_p7._0._0);
			}
		});
	var _elm_lang$core$Result$mapError = F2(
		function (f, result) {
			var _p8 = result;
			if (_p8.ctor === 'Ok') {
				return _elm_lang$core$Result$Ok(_p8._0);
			} else {
				return _elm_lang$core$Result$Err(
					f(_p8._0));
			}
		});
	var _elm_lang$core$Result$fromMaybe = F2(
		function (err, maybe) {
			var _p9 = maybe;
			if (_p9.ctor === 'Just') {
				return _elm_lang$core$Result$Ok(_p9._0);
			} else {
				return _elm_lang$core$Result$Err(err);
			}
		});
	
	var _elm_lang$core$Task$onError = _elm_lang$core$Native_Scheduler.onError;
	var _elm_lang$core$Task$andThen = _elm_lang$core$Native_Scheduler.andThen;
	var _elm_lang$core$Task$spawnCmd = F2(
		function (router, _p0) {
			var _p1 = _p0;
			return _elm_lang$core$Native_Scheduler.spawn(
				A2(
					_elm_lang$core$Task$andThen,
					_elm_lang$core$Platform$sendToApp(router),
					_p1._0));
		});
	var _elm_lang$core$Task$fail = _elm_lang$core$Native_Scheduler.fail;
	var _elm_lang$core$Task$mapError = F2(
		function (convert, task) {
			return A2(
				_elm_lang$core$Task$onError,
				function (_p2) {
					return _elm_lang$core$Task$fail(
						convert(_p2));
				},
				task);
		});
	var _elm_lang$core$Task$succeed = _elm_lang$core$Native_Scheduler.succeed;
	var _elm_lang$core$Task$map = F2(
		function (func, taskA) {
			return A2(
				_elm_lang$core$Task$andThen,
				function (a) {
					return _elm_lang$core$Task$succeed(
						func(a));
				},
				taskA);
		});
	var _elm_lang$core$Task$map2 = F3(
		function (func, taskA, taskB) {
			return A2(
				_elm_lang$core$Task$andThen,
				function (a) {
					return A2(
						_elm_lang$core$Task$andThen,
						function (b) {
							return _elm_lang$core$Task$succeed(
								A2(func, a, b));
						},
						taskB);
				},
				taskA);
		});
	var _elm_lang$core$Task$map3 = F4(
		function (func, taskA, taskB, taskC) {
			return A2(
				_elm_lang$core$Task$andThen,
				function (a) {
					return A2(
						_elm_lang$core$Task$andThen,
						function (b) {
							return A2(
								_elm_lang$core$Task$andThen,
								function (c) {
									return _elm_lang$core$Task$succeed(
										A3(func, a, b, c));
								},
								taskC);
						},
						taskB);
				},
				taskA);
		});
	var _elm_lang$core$Task$map4 = F5(
		function (func, taskA, taskB, taskC, taskD) {
			return A2(
				_elm_lang$core$Task$andThen,
				function (a) {
					return A2(
						_elm_lang$core$Task$andThen,
						function (b) {
							return A2(
								_elm_lang$core$Task$andThen,
								function (c) {
									return A2(
										_elm_lang$core$Task$andThen,
										function (d) {
											return _elm_lang$core$Task$succeed(
												A4(func, a, b, c, d));
										},
										taskD);
								},
								taskC);
						},
						taskB);
				},
				taskA);
		});
	var _elm_lang$core$Task$map5 = F6(
		function (func, taskA, taskB, taskC, taskD, taskE) {
			return A2(
				_elm_lang$core$Task$andThen,
				function (a) {
					return A2(
						_elm_lang$core$Task$andThen,
						function (b) {
							return A2(
								_elm_lang$core$Task$andThen,
								function (c) {
									return A2(
										_elm_lang$core$Task$andThen,
										function (d) {
											return A2(
												_elm_lang$core$Task$andThen,
												function (e) {
													return _elm_lang$core$Task$succeed(
														A5(func, a, b, c, d, e));
												},
												taskE);
										},
										taskD);
								},
								taskC);
						},
						taskB);
				},
				taskA);
		});
	var _elm_lang$core$Task$sequence = function (tasks) {
		var _p3 = tasks;
		if (_p3.ctor === '[]') {
			return _elm_lang$core$Task$succeed(
				{ctor: '[]'});
		} else {
			return A3(
				_elm_lang$core$Task$map2,
				F2(
					function (x, y) {
						return {ctor: '::', _0: x, _1: y};
					}),
				_p3._0,
				_elm_lang$core$Task$sequence(_p3._1));
		}
	};
	var _elm_lang$core$Task$onEffects = F3(
		function (router, commands, state) {
			return A2(
				_elm_lang$core$Task$map,
				function (_p4) {
					return {ctor: '_Tuple0'};
				},
				_elm_lang$core$Task$sequence(
					A2(
						_elm_lang$core$List$map,
						_elm_lang$core$Task$spawnCmd(router),
						commands)));
		});
	var _elm_lang$core$Task$init = _elm_lang$core$Task$succeed(
		{ctor: '_Tuple0'});
	var _elm_lang$core$Task$onSelfMsg = F3(
		function (_p7, _p6, _p5) {
			return _elm_lang$core$Task$succeed(
				{ctor: '_Tuple0'});
		});
	var _elm_lang$core$Task$command = _elm_lang$core$Native_Platform.leaf('Task');
	var _elm_lang$core$Task$Perform = function (a) {
		return {ctor: 'Perform', _0: a};
	};
	var _elm_lang$core$Task$perform = F2(
		function (toMessage, task) {
			return _elm_lang$core$Task$command(
				_elm_lang$core$Task$Perform(
					A2(_elm_lang$core$Task$map, toMessage, task)));
		});
	var _elm_lang$core$Task$attempt = F2(
		function (resultToMessage, task) {
			return _elm_lang$core$Task$command(
				_elm_lang$core$Task$Perform(
					A2(
						_elm_lang$core$Task$onError,
						function (_p8) {
							return _elm_lang$core$Task$succeed(
								resultToMessage(
									_elm_lang$core$Result$Err(_p8)));
						},
						A2(
							_elm_lang$core$Task$andThen,
							function (_p9) {
								return _elm_lang$core$Task$succeed(
									resultToMessage(
										_elm_lang$core$Result$Ok(_p9)));
							},
							task))));
		});
	var _elm_lang$core$Task$cmdMap = F2(
		function (tagger, _p10) {
			var _p11 = _p10;
			return _elm_lang$core$Task$Perform(
				A2(_elm_lang$core$Task$map, tagger, _p11._0));
		});
	_elm_lang$core$Native_Platform.effectManagers['Task'] = {pkg: 'elm-lang/core', init: _elm_lang$core$Task$init, onEffects: _elm_lang$core$Task$onEffects, onSelfMsg: _elm_lang$core$Task$onSelfMsg, tag: 'cmd', cmdMap: _elm_lang$core$Task$cmdMap};
	
	//import Native.Utils //
	
	var _elm_lang$core$Native_Debug = function() {
	
	function log(tag, value)
	{
		var msg = tag + ': ' + _elm_lang$core$Native_Utils.toString(value);
		var process = process || {};
		if (process.stdout)
		{
			process.stdout.write(msg);
		}
		else
		{
			console.log(msg);
		}
		return value;
	}
	
	function crash(message)
	{
		throw new Error(message);
	}
	
	return {
		crash: crash,
		log: F2(log)
	};
	
	}();
	//import Maybe, Native.List, Native.Utils, Result //
	
	var _elm_lang$core$Native_String = function() {
	
	function isEmpty(str)
	{
		return str.length === 0;
	}
	function cons(chr, str)
	{
		return chr + str;
	}
	function uncons(str)
	{
		var hd = str[0];
		if (hd)
		{
			return _elm_lang$core$Maybe$Just(_elm_lang$core$Native_Utils.Tuple2(_elm_lang$core$Native_Utils.chr(hd), str.slice(1)));
		}
		return _elm_lang$core$Maybe$Nothing;
	}
	function append(a, b)
	{
		return a + b;
	}
	function concat(strs)
	{
		return _elm_lang$core$Native_List.toArray(strs).join('');
	}
	function length(str)
	{
		return str.length;
	}
	function map(f, str)
	{
		var out = str.split('');
		for (var i = out.length; i--; )
		{
			out[i] = f(_elm_lang$core$Native_Utils.chr(out[i]));
		}
		return out.join('');
	}
	function filter(pred, str)
	{
		return str.split('').map(_elm_lang$core$Native_Utils.chr).filter(pred).join('');
	}
	function reverse(str)
	{
		return str.split('').reverse().join('');
	}
	function foldl(f, b, str)
	{
		var len = str.length;
		for (var i = 0; i < len; ++i)
		{
			b = A2(f, _elm_lang$core$Native_Utils.chr(str[i]), b);
		}
		return b;
	}
	function foldr(f, b, str)
	{
		for (var i = str.length; i--; )
		{
			b = A2(f, _elm_lang$core$Native_Utils.chr(str[i]), b);
		}
		return b;
	}
	function split(sep, str)
	{
		return _elm_lang$core$Native_List.fromArray(str.split(sep));
	}
	function join(sep, strs)
	{
		return _elm_lang$core$Native_List.toArray(strs).join(sep);
	}
	function repeat(n, str)
	{
		var result = '';
		while (n > 0)
		{
			if (n & 1)
			{
				result += str;
			}
			n >>= 1, str += str;
		}
		return result;
	}
	function slice(start, end, str)
	{
		return str.slice(start, end);
	}
	function left(n, str)
	{
		return n < 1 ? '' : str.slice(0, n);
	}
	function right(n, str)
	{
		return n < 1 ? '' : str.slice(-n);
	}
	function dropLeft(n, str)
	{
		return n < 1 ? str : str.slice(n);
	}
	function dropRight(n, str)
	{
		return n < 1 ? str : str.slice(0, -n);
	}
	function pad(n, chr, str)
	{
		var half = (n - str.length) / 2;
		return repeat(Math.ceil(half), chr) + str + repeat(half | 0, chr);
	}
	function padRight(n, chr, str)
	{
		return str + repeat(n - str.length, chr);
	}
	function padLeft(n, chr, str)
	{
		return repeat(n - str.length, chr) + str;
	}
	
	function trim(str)
	{
		return str.trim();
	}
	function trimLeft(str)
	{
		return str.replace(/^\s+/, '');
	}
	function trimRight(str)
	{
		return str.replace(/\s+$/, '');
	}
	
	function words(str)
	{
		return _elm_lang$core$Native_List.fromArray(str.trim().split(/\s+/g));
	}
	function lines(str)
	{
		return _elm_lang$core$Native_List.fromArray(str.split(/\r\n|\r|\n/g));
	}
	
	function toUpper(str)
	{
		return str.toUpperCase();
	}
	function toLower(str)
	{
		return str.toLowerCase();
	}
	
	function any(pred, str)
	{
		for (var i = str.length; i--; )
		{
			if (pred(_elm_lang$core$Native_Utils.chr(str[i])))
			{
				return true;
			}
		}
		return false;
	}
	function all(pred, str)
	{
		for (var i = str.length; i--; )
		{
			if (!pred(_elm_lang$core$Native_Utils.chr(str[i])))
			{
				return false;
			}
		}
		return true;
	}
	
	function contains(sub, str)
	{
		return str.indexOf(sub) > -1;
	}
	function startsWith(sub, str)
	{
		return str.indexOf(sub) === 0;
	}
	function endsWith(sub, str)
	{
		return str.length >= sub.length &&
			str.lastIndexOf(sub) === str.length - sub.length;
	}
	function indexes(sub, str)
	{
		var subLen = sub.length;
		
		if (subLen < 1)
		{
			return _elm_lang$core$Native_List.Nil;
		}
	
		var i = 0;
		var is = [];
	
		while ((i = str.indexOf(sub, i)) > -1)
		{
			is.push(i);
			i = i + subLen;
		}	
		
		return _elm_lang$core$Native_List.fromArray(is);
	}
	
	function toInt(s)
	{
		var len = s.length;
		if (len === 0)
		{
			return _elm_lang$core$Result$Err("could not convert string '" + s + "' to an Int" );
		}
		var start = 0;
		if (s[0] === '-')
		{
			if (len === 1)
			{
				return _elm_lang$core$Result$Err("could not convert string '" + s + "' to an Int" );
			}
			start = 1;
		}
		for (var i = start; i < len; ++i)
		{
			var c = s[i];
			if (c < '0' || '9' < c)
			{
				return _elm_lang$core$Result$Err("could not convert string '" + s + "' to an Int" );
			}
		}
		return _elm_lang$core$Result$Ok(parseInt(s, 10));
	}
	
	function toFloat(s)
	{
		var len = s.length;
		if (len === 0)
		{
			return _elm_lang$core$Result$Err("could not convert string '" + s + "' to a Float" );
		}
		var start = 0;
		if (s[0] === '-')
		{
			if (len === 1)
			{
				return _elm_lang$core$Result$Err("could not convert string '" + s + "' to a Float" );
			}
			start = 1;
		}
		var dotCount = 0;
		for (var i = start; i < len; ++i)
		{
			var c = s[i];
			if ('0' <= c && c <= '9')
			{
				continue;
			}
			if (c === '.')
			{
				dotCount += 1;
				if (dotCount <= 1)
				{
					continue;
				}
			}
			return _elm_lang$core$Result$Err("could not convert string '" + s + "' to a Float" );
		}
		return _elm_lang$core$Result$Ok(parseFloat(s));
	}
	
	function toList(str)
	{
		return _elm_lang$core$Native_List.fromArray(str.split('').map(_elm_lang$core$Native_Utils.chr));
	}
	function fromList(chars)
	{
		return _elm_lang$core$Native_List.toArray(chars).join('');
	}
	
	return {
		isEmpty: isEmpty,
		cons: F2(cons),
		uncons: uncons,
		append: F2(append),
		concat: concat,
		length: length,
		map: F2(map),
		filter: F2(filter),
		reverse: reverse,
		foldl: F3(foldl),
		foldr: F3(foldr),
	
		split: F2(split),
		join: F2(join),
		repeat: F2(repeat),
	
		slice: F3(slice),
		left: F2(left),
		right: F2(right),
		dropLeft: F2(dropLeft),
		dropRight: F2(dropRight),
	
		pad: F3(pad),
		padLeft: F3(padLeft),
		padRight: F3(padRight),
	
		trim: trim,
		trimLeft: trimLeft,
		trimRight: trimRight,
	
		words: words,
		lines: lines,
	
		toUpper: toUpper,
		toLower: toLower,
	
		any: F2(any),
		all: F2(all),
	
		contains: F2(contains),
		startsWith: F2(startsWith),
		endsWith: F2(endsWith),
		indexes: F2(indexes),
	
		toInt: toInt,
		toFloat: toFloat,
		toList: toList,
		fromList: fromList
	};
	
	}();
	
	var _elm_lang$core$String$fromList = _elm_lang$core$Native_String.fromList;
	var _elm_lang$core$String$toList = _elm_lang$core$Native_String.toList;
	var _elm_lang$core$String$toFloat = _elm_lang$core$Native_String.toFloat;
	var _elm_lang$core$String$toInt = _elm_lang$core$Native_String.toInt;
	var _elm_lang$core$String$indices = _elm_lang$core$Native_String.indexes;
	var _elm_lang$core$String$indexes = _elm_lang$core$Native_String.indexes;
	var _elm_lang$core$String$endsWith = _elm_lang$core$Native_String.endsWith;
	var _elm_lang$core$String$startsWith = _elm_lang$core$Native_String.startsWith;
	var _elm_lang$core$String$contains = _elm_lang$core$Native_String.contains;
	var _elm_lang$core$String$all = _elm_lang$core$Native_String.all;
	var _elm_lang$core$String$any = _elm_lang$core$Native_String.any;
	var _elm_lang$core$String$toLower = _elm_lang$core$Native_String.toLower;
	var _elm_lang$core$String$toUpper = _elm_lang$core$Native_String.toUpper;
	var _elm_lang$core$String$lines = _elm_lang$core$Native_String.lines;
	var _elm_lang$core$String$words = _elm_lang$core$Native_String.words;
	var _elm_lang$core$String$trimRight = _elm_lang$core$Native_String.trimRight;
	var _elm_lang$core$String$trimLeft = _elm_lang$core$Native_String.trimLeft;
	var _elm_lang$core$String$trim = _elm_lang$core$Native_String.trim;
	var _elm_lang$core$String$padRight = _elm_lang$core$Native_String.padRight;
	var _elm_lang$core$String$padLeft = _elm_lang$core$Native_String.padLeft;
	var _elm_lang$core$String$pad = _elm_lang$core$Native_String.pad;
	var _elm_lang$core$String$dropRight = _elm_lang$core$Native_String.dropRight;
	var _elm_lang$core$String$dropLeft = _elm_lang$core$Native_String.dropLeft;
	var _elm_lang$core$String$right = _elm_lang$core$Native_String.right;
	var _elm_lang$core$String$left = _elm_lang$core$Native_String.left;
	var _elm_lang$core$String$slice = _elm_lang$core$Native_String.slice;
	var _elm_lang$core$String$repeat = _elm_lang$core$Native_String.repeat;
	var _elm_lang$core$String$join = _elm_lang$core$Native_String.join;
	var _elm_lang$core$String$split = _elm_lang$core$Native_String.split;
	var _elm_lang$core$String$foldr = _elm_lang$core$Native_String.foldr;
	var _elm_lang$core$String$foldl = _elm_lang$core$Native_String.foldl;
	var _elm_lang$core$String$reverse = _elm_lang$core$Native_String.reverse;
	var _elm_lang$core$String$filter = _elm_lang$core$Native_String.filter;
	var _elm_lang$core$String$map = _elm_lang$core$Native_String.map;
	var _elm_lang$core$String$length = _elm_lang$core$Native_String.length;
	var _elm_lang$core$String$concat = _elm_lang$core$Native_String.concat;
	var _elm_lang$core$String$append = _elm_lang$core$Native_String.append;
	var _elm_lang$core$String$uncons = _elm_lang$core$Native_String.uncons;
	var _elm_lang$core$String$cons = _elm_lang$core$Native_String.cons;
	var _elm_lang$core$String$fromChar = function ($char) {
		return A2(_elm_lang$core$String$cons, $char, '');
	};
	var _elm_lang$core$String$isEmpty = _elm_lang$core$Native_String.isEmpty;
	
	var _elm_lang$core$Dict$foldr = F3(
		function (f, acc, t) {
			foldr:
			while (true) {
				var _p0 = t;
				if (_p0.ctor === 'RBEmpty_elm_builtin') {
					return acc;
				} else {
					var _v1 = f,
						_v2 = A3(
						f,
						_p0._1,
						_p0._2,
						A3(_elm_lang$core$Dict$foldr, f, acc, _p0._4)),
						_v3 = _p0._3;
					f = _v1;
					acc = _v2;
					t = _v3;
					continue foldr;
				}
			}
		});
	var _elm_lang$core$Dict$keys = function (dict) {
		return A3(
			_elm_lang$core$Dict$foldr,
			F3(
				function (key, value, keyList) {
					return {ctor: '::', _0: key, _1: keyList};
				}),
			{ctor: '[]'},
			dict);
	};
	var _elm_lang$core$Dict$values = function (dict) {
		return A3(
			_elm_lang$core$Dict$foldr,
			F3(
				function (key, value, valueList) {
					return {ctor: '::', _0: value, _1: valueList};
				}),
			{ctor: '[]'},
			dict);
	};
	var _elm_lang$core$Dict$toList = function (dict) {
		return A3(
			_elm_lang$core$Dict$foldr,
			F3(
				function (key, value, list) {
					return {
						ctor: '::',
						_0: {ctor: '_Tuple2', _0: key, _1: value},
						_1: list
					};
				}),
			{ctor: '[]'},
			dict);
	};
	var _elm_lang$core$Dict$foldl = F3(
		function (f, acc, dict) {
			foldl:
			while (true) {
				var _p1 = dict;
				if (_p1.ctor === 'RBEmpty_elm_builtin') {
					return acc;
				} else {
					var _v5 = f,
						_v6 = A3(
						f,
						_p1._1,
						_p1._2,
						A3(_elm_lang$core$Dict$foldl, f, acc, _p1._3)),
						_v7 = _p1._4;
					f = _v5;
					acc = _v6;
					dict = _v7;
					continue foldl;
				}
			}
		});
	var _elm_lang$core$Dict$merge = F6(
		function (leftStep, bothStep, rightStep, leftDict, rightDict, initialResult) {
			var stepState = F3(
				function (rKey, rValue, _p2) {
					stepState:
					while (true) {
						var _p3 = _p2;
						var _p9 = _p3._1;
						var _p8 = _p3._0;
						var _p4 = _p8;
						if (_p4.ctor === '[]') {
							return {
								ctor: '_Tuple2',
								_0: _p8,
								_1: A3(rightStep, rKey, rValue, _p9)
							};
						} else {
							var _p7 = _p4._1;
							var _p6 = _p4._0._1;
							var _p5 = _p4._0._0;
							if (_elm_lang$core$Native_Utils.cmp(_p5, rKey) < 0) {
								var _v10 = rKey,
									_v11 = rValue,
									_v12 = {
									ctor: '_Tuple2',
									_0: _p7,
									_1: A3(leftStep, _p5, _p6, _p9)
								};
								rKey = _v10;
								rValue = _v11;
								_p2 = _v12;
								continue stepState;
							} else {
								if (_elm_lang$core$Native_Utils.cmp(_p5, rKey) > 0) {
									return {
										ctor: '_Tuple2',
										_0: _p8,
										_1: A3(rightStep, rKey, rValue, _p9)
									};
								} else {
									return {
										ctor: '_Tuple2',
										_0: _p7,
										_1: A4(bothStep, _p5, _p6, rValue, _p9)
									};
								}
							}
						}
					}
				});
			var _p10 = A3(
				_elm_lang$core$Dict$foldl,
				stepState,
				{
					ctor: '_Tuple2',
					_0: _elm_lang$core$Dict$toList(leftDict),
					_1: initialResult
				},
				rightDict);
			var leftovers = _p10._0;
			var intermediateResult = _p10._1;
			return A3(
				_elm_lang$core$List$foldl,
				F2(
					function (_p11, result) {
						var _p12 = _p11;
						return A3(leftStep, _p12._0, _p12._1, result);
					}),
				intermediateResult,
				leftovers);
		});
	var _elm_lang$core$Dict$reportRemBug = F4(
		function (msg, c, lgot, rgot) {
			return _elm_lang$core$Native_Debug.crash(
				_elm_lang$core$String$concat(
					{
						ctor: '::',
						_0: 'Internal red-black tree invariant violated, expected ',
						_1: {
							ctor: '::',
							_0: msg,
							_1: {
								ctor: '::',
								_0: ' and got ',
								_1: {
									ctor: '::',
									_0: _elm_lang$core$Basics$toString(c),
									_1: {
										ctor: '::',
										_0: '/',
										_1: {
											ctor: '::',
											_0: lgot,
											_1: {
												ctor: '::',
												_0: '/',
												_1: {
													ctor: '::',
													_0: rgot,
													_1: {
														ctor: '::',
														_0: '\nPlease report this bug to <https://github.com/elm-lang/core/issues>',
														_1: {ctor: '[]'}
													}
												}
											}
										}
									}
								}
							}
						}
					}));
		});
	var _elm_lang$core$Dict$isBBlack = function (dict) {
		var _p13 = dict;
		_v14_2:
		do {
			if (_p13.ctor === 'RBNode_elm_builtin') {
				if (_p13._0.ctor === 'BBlack') {
					return true;
				} else {
					break _v14_2;
				}
			} else {
				if (_p13._0.ctor === 'LBBlack') {
					return true;
				} else {
					break _v14_2;
				}
			}
		} while(false);
		return false;
	};
	var _elm_lang$core$Dict$sizeHelp = F2(
		function (n, dict) {
			sizeHelp:
			while (true) {
				var _p14 = dict;
				if (_p14.ctor === 'RBEmpty_elm_builtin') {
					return n;
				} else {
					var _v16 = A2(_elm_lang$core$Dict$sizeHelp, n + 1, _p14._4),
						_v17 = _p14._3;
					n = _v16;
					dict = _v17;
					continue sizeHelp;
				}
			}
		});
	var _elm_lang$core$Dict$size = function (dict) {
		return A2(_elm_lang$core$Dict$sizeHelp, 0, dict);
	};
	var _elm_lang$core$Dict$get = F2(
		function (targetKey, dict) {
			get:
			while (true) {
				var _p15 = dict;
				if (_p15.ctor === 'RBEmpty_elm_builtin') {
					return _elm_lang$core$Maybe$Nothing;
				} else {
					var _p16 = A2(_elm_lang$core$Basics$compare, targetKey, _p15._1);
					switch (_p16.ctor) {
						case 'LT':
							var _v20 = targetKey,
								_v21 = _p15._3;
							targetKey = _v20;
							dict = _v21;
							continue get;
						case 'EQ':
							return _elm_lang$core$Maybe$Just(_p15._2);
						default:
							var _v22 = targetKey,
								_v23 = _p15._4;
							targetKey = _v22;
							dict = _v23;
							continue get;
					}
				}
			}
		});
	var _elm_lang$core$Dict$member = F2(
		function (key, dict) {
			var _p17 = A2(_elm_lang$core$Dict$get, key, dict);
			if (_p17.ctor === 'Just') {
				return true;
			} else {
				return false;
			}
		});
	var _elm_lang$core$Dict$maxWithDefault = F3(
		function (k, v, r) {
			maxWithDefault:
			while (true) {
				var _p18 = r;
				if (_p18.ctor === 'RBEmpty_elm_builtin') {
					return {ctor: '_Tuple2', _0: k, _1: v};
				} else {
					var _v26 = _p18._1,
						_v27 = _p18._2,
						_v28 = _p18._4;
					k = _v26;
					v = _v27;
					r = _v28;
					continue maxWithDefault;
				}
			}
		});
	var _elm_lang$core$Dict$NBlack = {ctor: 'NBlack'};
	var _elm_lang$core$Dict$BBlack = {ctor: 'BBlack'};
	var _elm_lang$core$Dict$Black = {ctor: 'Black'};
	var _elm_lang$core$Dict$blackish = function (t) {
		var _p19 = t;
		if (_p19.ctor === 'RBNode_elm_builtin') {
			var _p20 = _p19._0;
			return _elm_lang$core$Native_Utils.eq(_p20, _elm_lang$core$Dict$Black) || _elm_lang$core$Native_Utils.eq(_p20, _elm_lang$core$Dict$BBlack);
		} else {
			return true;
		}
	};
	var _elm_lang$core$Dict$Red = {ctor: 'Red'};
	var _elm_lang$core$Dict$moreBlack = function (color) {
		var _p21 = color;
		switch (_p21.ctor) {
			case 'Black':
				return _elm_lang$core$Dict$BBlack;
			case 'Red':
				return _elm_lang$core$Dict$Black;
			case 'NBlack':
				return _elm_lang$core$Dict$Red;
			default:
				return _elm_lang$core$Native_Debug.crash('Can\'t make a double black node more black!');
		}
	};
	var _elm_lang$core$Dict$lessBlack = function (color) {
		var _p22 = color;
		switch (_p22.ctor) {
			case 'BBlack':
				return _elm_lang$core$Dict$Black;
			case 'Black':
				return _elm_lang$core$Dict$Red;
			case 'Red':
				return _elm_lang$core$Dict$NBlack;
			default:
				return _elm_lang$core$Native_Debug.crash('Can\'t make a negative black node less black!');
		}
	};
	var _elm_lang$core$Dict$LBBlack = {ctor: 'LBBlack'};
	var _elm_lang$core$Dict$LBlack = {ctor: 'LBlack'};
	var _elm_lang$core$Dict$RBEmpty_elm_builtin = function (a) {
		return {ctor: 'RBEmpty_elm_builtin', _0: a};
	};
	var _elm_lang$core$Dict$empty = _elm_lang$core$Dict$RBEmpty_elm_builtin(_elm_lang$core$Dict$LBlack);
	var _elm_lang$core$Dict$isEmpty = function (dict) {
		return _elm_lang$core$Native_Utils.eq(dict, _elm_lang$core$Dict$empty);
	};
	var _elm_lang$core$Dict$RBNode_elm_builtin = F5(
		function (a, b, c, d, e) {
			return {ctor: 'RBNode_elm_builtin', _0: a, _1: b, _2: c, _3: d, _4: e};
		});
	var _elm_lang$core$Dict$ensureBlackRoot = function (dict) {
		var _p23 = dict;
		if ((_p23.ctor === 'RBNode_elm_builtin') && (_p23._0.ctor === 'Red')) {
			return A5(_elm_lang$core$Dict$RBNode_elm_builtin, _elm_lang$core$Dict$Black, _p23._1, _p23._2, _p23._3, _p23._4);
		} else {
			return dict;
		}
	};
	var _elm_lang$core$Dict$lessBlackTree = function (dict) {
		var _p24 = dict;
		if (_p24.ctor === 'RBNode_elm_builtin') {
			return A5(
				_elm_lang$core$Dict$RBNode_elm_builtin,
				_elm_lang$core$Dict$lessBlack(_p24._0),
				_p24._1,
				_p24._2,
				_p24._3,
				_p24._4);
		} else {
			return _elm_lang$core$Dict$RBEmpty_elm_builtin(_elm_lang$core$Dict$LBlack);
		}
	};
	var _elm_lang$core$Dict$balancedTree = function (col) {
		return function (xk) {
			return function (xv) {
				return function (yk) {
					return function (yv) {
						return function (zk) {
							return function (zv) {
								return function (a) {
									return function (b) {
										return function (c) {
											return function (d) {
												return A5(
													_elm_lang$core$Dict$RBNode_elm_builtin,
													_elm_lang$core$Dict$lessBlack(col),
													yk,
													yv,
													A5(_elm_lang$core$Dict$RBNode_elm_builtin, _elm_lang$core$Dict$Black, xk, xv, a, b),
													A5(_elm_lang$core$Dict$RBNode_elm_builtin, _elm_lang$core$Dict$Black, zk, zv, c, d));
											};
										};
									};
								};
							};
						};
					};
				};
			};
		};
	};
	var _elm_lang$core$Dict$blacken = function (t) {
		var _p25 = t;
		if (_p25.ctor === 'RBEmpty_elm_builtin') {
			return _elm_lang$core$Dict$RBEmpty_elm_builtin(_elm_lang$core$Dict$LBlack);
		} else {
			return A5(_elm_lang$core$Dict$RBNode_elm_builtin, _elm_lang$core$Dict$Black, _p25._1, _p25._2, _p25._3, _p25._4);
		}
	};
	var _elm_lang$core$Dict$redden = function (t) {
		var _p26 = t;
		if (_p26.ctor === 'RBEmpty_elm_builtin') {
			return _elm_lang$core$Native_Debug.crash('can\'t make a Leaf red');
		} else {
			return A5(_elm_lang$core$Dict$RBNode_elm_builtin, _elm_lang$core$Dict$Red, _p26._1, _p26._2, _p26._3, _p26._4);
		}
	};
	var _elm_lang$core$Dict$balanceHelp = function (tree) {
		var _p27 = tree;
		_v36_6:
		do {
			_v36_5:
			do {
				_v36_4:
				do {
					_v36_3:
					do {
						_v36_2:
						do {
							_v36_1:
							do {
								_v36_0:
								do {
									if (_p27.ctor === 'RBNode_elm_builtin') {
										if (_p27._3.ctor === 'RBNode_elm_builtin') {
											if (_p27._4.ctor === 'RBNode_elm_builtin') {
												switch (_p27._3._0.ctor) {
													case 'Red':
														switch (_p27._4._0.ctor) {
															case 'Red':
																if ((_p27._3._3.ctor === 'RBNode_elm_builtin') && (_p27._3._3._0.ctor === 'Red')) {
																	break _v36_0;
																} else {
																	if ((_p27._3._4.ctor === 'RBNode_elm_builtin') && (_p27._3._4._0.ctor === 'Red')) {
																		break _v36_1;
																	} else {
																		if ((_p27._4._3.ctor === 'RBNode_elm_builtin') && (_p27._4._3._0.ctor === 'Red')) {
																			break _v36_2;
																		} else {
																			if ((_p27._4._4.ctor === 'RBNode_elm_builtin') && (_p27._4._4._0.ctor === 'Red')) {
																				break _v36_3;
																			} else {
																				break _v36_6;
																			}
																		}
																	}
																}
															case 'NBlack':
																if ((_p27._3._3.ctor === 'RBNode_elm_builtin') && (_p27._3._3._0.ctor === 'Red')) {
																	break _v36_0;
																} else {
																	if ((_p27._3._4.ctor === 'RBNode_elm_builtin') && (_p27._3._4._0.ctor === 'Red')) {
																		break _v36_1;
																	} else {
																		if (((((_p27._0.ctor === 'BBlack') && (_p27._4._3.ctor === 'RBNode_elm_builtin')) && (_p27._4._3._0.ctor === 'Black')) && (_p27._4._4.ctor === 'RBNode_elm_builtin')) && (_p27._4._4._0.ctor === 'Black')) {
																			break _v36_4;
																		} else {
																			break _v36_6;
																		}
																	}
																}
															default:
																if ((_p27._3._3.ctor === 'RBNode_elm_builtin') && (_p27._3._3._0.ctor === 'Red')) {
																	break _v36_0;
																} else {
																	if ((_p27._3._4.ctor === 'RBNode_elm_builtin') && (_p27._3._4._0.ctor === 'Red')) {
																		break _v36_1;
																	} else {
																		break _v36_6;
																	}
																}
														}
													case 'NBlack':
														switch (_p27._4._0.ctor) {
															case 'Red':
																if ((_p27._4._3.ctor === 'RBNode_elm_builtin') && (_p27._4._3._0.ctor === 'Red')) {
																	break _v36_2;
																} else {
																	if ((_p27._4._4.ctor === 'RBNode_elm_builtin') && (_p27._4._4._0.ctor === 'Red')) {
																		break _v36_3;
																	} else {
																		if (((((_p27._0.ctor === 'BBlack') && (_p27._3._3.ctor === 'RBNode_elm_builtin')) && (_p27._3._3._0.ctor === 'Black')) && (_p27._3._4.ctor === 'RBNode_elm_builtin')) && (_p27._3._4._0.ctor === 'Black')) {
																			break _v36_5;
																		} else {
																			break _v36_6;
																		}
																	}
																}
															case 'NBlack':
																if (_p27._0.ctor === 'BBlack') {
																	if ((((_p27._4._3.ctor === 'RBNode_elm_builtin') && (_p27._4._3._0.ctor === 'Black')) && (_p27._4._4.ctor === 'RBNode_elm_builtin')) && (_p27._4._4._0.ctor === 'Black')) {
																		break _v36_4;
																	} else {
																		if ((((_p27._3._3.ctor === 'RBNode_elm_builtin') && (_p27._3._3._0.ctor === 'Black')) && (_p27._3._4.ctor === 'RBNode_elm_builtin')) && (_p27._3._4._0.ctor === 'Black')) {
																			break _v36_5;
																		} else {
																			break _v36_6;
																		}
																	}
																} else {
																	break _v36_6;
																}
															default:
																if (((((_p27._0.ctor === 'BBlack') && (_p27._3._3.ctor === 'RBNode_elm_builtin')) && (_p27._3._3._0.ctor === 'Black')) && (_p27._3._4.ctor === 'RBNode_elm_builtin')) && (_p27._3._4._0.ctor === 'Black')) {
																	break _v36_5;
																} else {
																	break _v36_6;
																}
														}
													default:
														switch (_p27._4._0.ctor) {
															case 'Red':
																if ((_p27._4._3.ctor === 'RBNode_elm_builtin') && (_p27._4._3._0.ctor === 'Red')) {
																	break _v36_2;
																} else {
																	if ((_p27._4._4.ctor === 'RBNode_elm_builtin') && (_p27._4._4._0.ctor === 'Red')) {
																		break _v36_3;
																	} else {
																		break _v36_6;
																	}
																}
															case 'NBlack':
																if (((((_p27._0.ctor === 'BBlack') && (_p27._4._3.ctor === 'RBNode_elm_builtin')) && (_p27._4._3._0.ctor === 'Black')) && (_p27._4._4.ctor === 'RBNode_elm_builtin')) && (_p27._4._4._0.ctor === 'Black')) {
																	break _v36_4;
																} else {
																	break _v36_6;
																}
															default:
																break _v36_6;
														}
												}
											} else {
												switch (_p27._3._0.ctor) {
													case 'Red':
														if ((_p27._3._3.ctor === 'RBNode_elm_builtin') && (_p27._3._3._0.ctor === 'Red')) {
															break _v36_0;
														} else {
															if ((_p27._3._4.ctor === 'RBNode_elm_builtin') && (_p27._3._4._0.ctor === 'Red')) {
																break _v36_1;
															} else {
																break _v36_6;
															}
														}
													case 'NBlack':
														if (((((_p27._0.ctor === 'BBlack') && (_p27._3._3.ctor === 'RBNode_elm_builtin')) && (_p27._3._3._0.ctor === 'Black')) && (_p27._3._4.ctor === 'RBNode_elm_builtin')) && (_p27._3._4._0.ctor === 'Black')) {
															break _v36_5;
														} else {
															break _v36_6;
														}
													default:
														break _v36_6;
												}
											}
										} else {
											if (_p27._4.ctor === 'RBNode_elm_builtin') {
												switch (_p27._4._0.ctor) {
													case 'Red':
														if ((_p27._4._3.ctor === 'RBNode_elm_builtin') && (_p27._4._3._0.ctor === 'Red')) {
															break _v36_2;
														} else {
															if ((_p27._4._4.ctor === 'RBNode_elm_builtin') && (_p27._4._4._0.ctor === 'Red')) {
																break _v36_3;
															} else {
																break _v36_6;
															}
														}
													case 'NBlack':
														if (((((_p27._0.ctor === 'BBlack') && (_p27._4._3.ctor === 'RBNode_elm_builtin')) && (_p27._4._3._0.ctor === 'Black')) && (_p27._4._4.ctor === 'RBNode_elm_builtin')) && (_p27._4._4._0.ctor === 'Black')) {
															break _v36_4;
														} else {
															break _v36_6;
														}
													default:
														break _v36_6;
												}
											} else {
												break _v36_6;
											}
										}
									} else {
										break _v36_6;
									}
								} while(false);
								return _elm_lang$core$Dict$balancedTree(_p27._0)(_p27._3._3._1)(_p27._3._3._2)(_p27._3._1)(_p27._3._2)(_p27._1)(_p27._2)(_p27._3._3._3)(_p27._3._3._4)(_p27._3._4)(_p27._4);
							} while(false);
							return _elm_lang$core$Dict$balancedTree(_p27._0)(_p27._3._1)(_p27._3._2)(_p27._3._4._1)(_p27._3._4._2)(_p27._1)(_p27._2)(_p27._3._3)(_p27._3._4._3)(_p27._3._4._4)(_p27._4);
						} while(false);
						return _elm_lang$core$Dict$balancedTree(_p27._0)(_p27._1)(_p27._2)(_p27._4._3._1)(_p27._4._3._2)(_p27._4._1)(_p27._4._2)(_p27._3)(_p27._4._3._3)(_p27._4._3._4)(_p27._4._4);
					} while(false);
					return _elm_lang$core$Dict$balancedTree(_p27._0)(_p27._1)(_p27._2)(_p27._4._1)(_p27._4._2)(_p27._4._4._1)(_p27._4._4._2)(_p27._3)(_p27._4._3)(_p27._4._4._3)(_p27._4._4._4);
				} while(false);
				return A5(
					_elm_lang$core$Dict$RBNode_elm_builtin,
					_elm_lang$core$Dict$Black,
					_p27._4._3._1,
					_p27._4._3._2,
					A5(_elm_lang$core$Dict$RBNode_elm_builtin, _elm_lang$core$Dict$Black, _p27._1, _p27._2, _p27._3, _p27._4._3._3),
					A5(
						_elm_lang$core$Dict$balance,
						_elm_lang$core$Dict$Black,
						_p27._4._1,
						_p27._4._2,
						_p27._4._3._4,
						_elm_lang$core$Dict$redden(_p27._4._4)));
			} while(false);
			return A5(
				_elm_lang$core$Dict$RBNode_elm_builtin,
				_elm_lang$core$Dict$Black,
				_p27._3._4._1,
				_p27._3._4._2,
				A5(
					_elm_lang$core$Dict$balance,
					_elm_lang$core$Dict$Black,
					_p27._3._1,
					_p27._3._2,
					_elm_lang$core$Dict$redden(_p27._3._3),
					_p27._3._4._3),
				A5(_elm_lang$core$Dict$RBNode_elm_builtin, _elm_lang$core$Dict$Black, _p27._1, _p27._2, _p27._3._4._4, _p27._4));
		} while(false);
		return tree;
	};
	var _elm_lang$core$Dict$balance = F5(
		function (c, k, v, l, r) {
			var tree = A5(_elm_lang$core$Dict$RBNode_elm_builtin, c, k, v, l, r);
			return _elm_lang$core$Dict$blackish(tree) ? _elm_lang$core$Dict$balanceHelp(tree) : tree;
		});
	var _elm_lang$core$Dict$bubble = F5(
		function (c, k, v, l, r) {
			return (_elm_lang$core$Dict$isBBlack(l) || _elm_lang$core$Dict$isBBlack(r)) ? A5(
				_elm_lang$core$Dict$balance,
				_elm_lang$core$Dict$moreBlack(c),
				k,
				v,
				_elm_lang$core$Dict$lessBlackTree(l),
				_elm_lang$core$Dict$lessBlackTree(r)) : A5(_elm_lang$core$Dict$RBNode_elm_builtin, c, k, v, l, r);
		});
	var _elm_lang$core$Dict$removeMax = F5(
		function (c, k, v, l, r) {
			var _p28 = r;
			if (_p28.ctor === 'RBEmpty_elm_builtin') {
				return A3(_elm_lang$core$Dict$rem, c, l, r);
			} else {
				return A5(
					_elm_lang$core$Dict$bubble,
					c,
					k,
					v,
					l,
					A5(_elm_lang$core$Dict$removeMax, _p28._0, _p28._1, _p28._2, _p28._3, _p28._4));
			}
		});
	var _elm_lang$core$Dict$rem = F3(
		function (color, left, right) {
			var _p29 = {ctor: '_Tuple2', _0: left, _1: right};
			if (_p29._0.ctor === 'RBEmpty_elm_builtin') {
				if (_p29._1.ctor === 'RBEmpty_elm_builtin') {
					var _p30 = color;
					switch (_p30.ctor) {
						case 'Red':
							return _elm_lang$core$Dict$RBEmpty_elm_builtin(_elm_lang$core$Dict$LBlack);
						case 'Black':
							return _elm_lang$core$Dict$RBEmpty_elm_builtin(_elm_lang$core$Dict$LBBlack);
						default:
							return _elm_lang$core$Native_Debug.crash('cannot have bblack or nblack nodes at this point');
					}
				} else {
					var _p33 = _p29._1._0;
					var _p32 = _p29._0._0;
					var _p31 = {ctor: '_Tuple3', _0: color, _1: _p32, _2: _p33};
					if ((((_p31.ctor === '_Tuple3') && (_p31._0.ctor === 'Black')) && (_p31._1.ctor === 'LBlack')) && (_p31._2.ctor === 'Red')) {
						return A5(_elm_lang$core$Dict$RBNode_elm_builtin, _elm_lang$core$Dict$Black, _p29._1._1, _p29._1._2, _p29._1._3, _p29._1._4);
					} else {
						return A4(
							_elm_lang$core$Dict$reportRemBug,
							'Black/LBlack/Red',
							color,
							_elm_lang$core$Basics$toString(_p32),
							_elm_lang$core$Basics$toString(_p33));
					}
				}
			} else {
				if (_p29._1.ctor === 'RBEmpty_elm_builtin') {
					var _p36 = _p29._1._0;
					var _p35 = _p29._0._0;
					var _p34 = {ctor: '_Tuple3', _0: color, _1: _p35, _2: _p36};
					if ((((_p34.ctor === '_Tuple3') && (_p34._0.ctor === 'Black')) && (_p34._1.ctor === 'Red')) && (_p34._2.ctor === 'LBlack')) {
						return A5(_elm_lang$core$Dict$RBNode_elm_builtin, _elm_lang$core$Dict$Black, _p29._0._1, _p29._0._2, _p29._0._3, _p29._0._4);
					} else {
						return A4(
							_elm_lang$core$Dict$reportRemBug,
							'Black/Red/LBlack',
							color,
							_elm_lang$core$Basics$toString(_p35),
							_elm_lang$core$Basics$toString(_p36));
					}
				} else {
					var _p40 = _p29._0._2;
					var _p39 = _p29._0._4;
					var _p38 = _p29._0._1;
					var newLeft = A5(_elm_lang$core$Dict$removeMax, _p29._0._0, _p38, _p40, _p29._0._3, _p39);
					var _p37 = A3(_elm_lang$core$Dict$maxWithDefault, _p38, _p40, _p39);
					var k = _p37._0;
					var v = _p37._1;
					return A5(_elm_lang$core$Dict$bubble, color, k, v, newLeft, right);
				}
			}
		});
	var _elm_lang$core$Dict$map = F2(
		function (f, dict) {
			var _p41 = dict;
			if (_p41.ctor === 'RBEmpty_elm_builtin') {
				return _elm_lang$core$Dict$RBEmpty_elm_builtin(_elm_lang$core$Dict$LBlack);
			} else {
				var _p42 = _p41._1;
				return A5(
					_elm_lang$core$Dict$RBNode_elm_builtin,
					_p41._0,
					_p42,
					A2(f, _p42, _p41._2),
					A2(_elm_lang$core$Dict$map, f, _p41._3),
					A2(_elm_lang$core$Dict$map, f, _p41._4));
			}
		});
	var _elm_lang$core$Dict$Same = {ctor: 'Same'};
	var _elm_lang$core$Dict$Remove = {ctor: 'Remove'};
	var _elm_lang$core$Dict$Insert = {ctor: 'Insert'};
	var _elm_lang$core$Dict$update = F3(
		function (k, alter, dict) {
			var up = function (dict) {
				var _p43 = dict;
				if (_p43.ctor === 'RBEmpty_elm_builtin') {
					var _p44 = alter(_elm_lang$core$Maybe$Nothing);
					if (_p44.ctor === 'Nothing') {
						return {ctor: '_Tuple2', _0: _elm_lang$core$Dict$Same, _1: _elm_lang$core$Dict$empty};
					} else {
						return {
							ctor: '_Tuple2',
							_0: _elm_lang$core$Dict$Insert,
							_1: A5(_elm_lang$core$Dict$RBNode_elm_builtin, _elm_lang$core$Dict$Red, k, _p44._0, _elm_lang$core$Dict$empty, _elm_lang$core$Dict$empty)
						};
					}
				} else {
					var _p55 = _p43._2;
					var _p54 = _p43._4;
					var _p53 = _p43._3;
					var _p52 = _p43._1;
					var _p51 = _p43._0;
					var _p45 = A2(_elm_lang$core$Basics$compare, k, _p52);
					switch (_p45.ctor) {
						case 'EQ':
							var _p46 = alter(
								_elm_lang$core$Maybe$Just(_p55));
							if (_p46.ctor === 'Nothing') {
								return {
									ctor: '_Tuple2',
									_0: _elm_lang$core$Dict$Remove,
									_1: A3(_elm_lang$core$Dict$rem, _p51, _p53, _p54)
								};
							} else {
								return {
									ctor: '_Tuple2',
									_0: _elm_lang$core$Dict$Same,
									_1: A5(_elm_lang$core$Dict$RBNode_elm_builtin, _p51, _p52, _p46._0, _p53, _p54)
								};
							}
						case 'LT':
							var _p47 = up(_p53);
							var flag = _p47._0;
							var newLeft = _p47._1;
							var _p48 = flag;
							switch (_p48.ctor) {
								case 'Same':
									return {
										ctor: '_Tuple2',
										_0: _elm_lang$core$Dict$Same,
										_1: A5(_elm_lang$core$Dict$RBNode_elm_builtin, _p51, _p52, _p55, newLeft, _p54)
									};
								case 'Insert':
									return {
										ctor: '_Tuple2',
										_0: _elm_lang$core$Dict$Insert,
										_1: A5(_elm_lang$core$Dict$balance, _p51, _p52, _p55, newLeft, _p54)
									};
								default:
									return {
										ctor: '_Tuple2',
										_0: _elm_lang$core$Dict$Remove,
										_1: A5(_elm_lang$core$Dict$bubble, _p51, _p52, _p55, newLeft, _p54)
									};
							}
						default:
							var _p49 = up(_p54);
							var flag = _p49._0;
							var newRight = _p49._1;
							var _p50 = flag;
							switch (_p50.ctor) {
								case 'Same':
									return {
										ctor: '_Tuple2',
										_0: _elm_lang$core$Dict$Same,
										_1: A5(_elm_lang$core$Dict$RBNode_elm_builtin, _p51, _p52, _p55, _p53, newRight)
									};
								case 'Insert':
									return {
										ctor: '_Tuple2',
										_0: _elm_lang$core$Dict$Insert,
										_1: A5(_elm_lang$core$Dict$balance, _p51, _p52, _p55, _p53, newRight)
									};
								default:
									return {
										ctor: '_Tuple2',
										_0: _elm_lang$core$Dict$Remove,
										_1: A5(_elm_lang$core$Dict$bubble, _p51, _p52, _p55, _p53, newRight)
									};
							}
					}
				}
			};
			var _p56 = up(dict);
			var flag = _p56._0;
			var updatedDict = _p56._1;
			var _p57 = flag;
			switch (_p57.ctor) {
				case 'Same':
					return updatedDict;
				case 'Insert':
					return _elm_lang$core$Dict$ensureBlackRoot(updatedDict);
				default:
					return _elm_lang$core$Dict$blacken(updatedDict);
			}
		});
	var _elm_lang$core$Dict$insert = F3(
		function (key, value, dict) {
			return A3(
				_elm_lang$core$Dict$update,
				key,
				_elm_lang$core$Basics$always(
					_elm_lang$core$Maybe$Just(value)),
				dict);
		});
	var _elm_lang$core$Dict$singleton = F2(
		function (key, value) {
			return A3(_elm_lang$core$Dict$insert, key, value, _elm_lang$core$Dict$empty);
		});
	var _elm_lang$core$Dict$union = F2(
		function (t1, t2) {
			return A3(_elm_lang$core$Dict$foldl, _elm_lang$core$Dict$insert, t2, t1);
		});
	var _elm_lang$core$Dict$filter = F2(
		function (predicate, dictionary) {
			var add = F3(
				function (key, value, dict) {
					return A2(predicate, key, value) ? A3(_elm_lang$core$Dict$insert, key, value, dict) : dict;
				});
			return A3(_elm_lang$core$Dict$foldl, add, _elm_lang$core$Dict$empty, dictionary);
		});
	var _elm_lang$core$Dict$intersect = F2(
		function (t1, t2) {
			return A2(
				_elm_lang$core$Dict$filter,
				F2(
					function (k, _p58) {
						return A2(_elm_lang$core$Dict$member, k, t2);
					}),
				t1);
		});
	var _elm_lang$core$Dict$partition = F2(
		function (predicate, dict) {
			var add = F3(
				function (key, value, _p59) {
					var _p60 = _p59;
					var _p62 = _p60._1;
					var _p61 = _p60._0;
					return A2(predicate, key, value) ? {
						ctor: '_Tuple2',
						_0: A3(_elm_lang$core$Dict$insert, key, value, _p61),
						_1: _p62
					} : {
						ctor: '_Tuple2',
						_0: _p61,
						_1: A3(_elm_lang$core$Dict$insert, key, value, _p62)
					};
				});
			return A3(
				_elm_lang$core$Dict$foldl,
				add,
				{ctor: '_Tuple2', _0: _elm_lang$core$Dict$empty, _1: _elm_lang$core$Dict$empty},
				dict);
		});
	var _elm_lang$core$Dict$fromList = function (assocs) {
		return A3(
			_elm_lang$core$List$foldl,
			F2(
				function (_p63, dict) {
					var _p64 = _p63;
					return A3(_elm_lang$core$Dict$insert, _p64._0, _p64._1, dict);
				}),
			_elm_lang$core$Dict$empty,
			assocs);
	};
	var _elm_lang$core$Dict$remove = F2(
		function (key, dict) {
			return A3(
				_elm_lang$core$Dict$update,
				key,
				_elm_lang$core$Basics$always(_elm_lang$core$Maybe$Nothing),
				dict);
		});
	var _elm_lang$core$Dict$diff = F2(
		function (t1, t2) {
			return A3(
				_elm_lang$core$Dict$foldl,
				F3(
					function (k, v, t) {
						return A2(_elm_lang$core$Dict$remove, k, t);
					}),
				t1,
				t2);
		});
	
	//import Native.Scheduler //
	
	var _elm_lang$core$Native_Time = function() {
	
	var now = _elm_lang$core$Native_Scheduler.nativeBinding(function(callback)
	{
		callback(_elm_lang$core$Native_Scheduler.succeed(Date.now()));
	});
	
	function setInterval_(interval, task)
	{
		return _elm_lang$core$Native_Scheduler.nativeBinding(function(callback)
		{
			var id = setInterval(function() {
				_elm_lang$core$Native_Scheduler.rawSpawn(task);
			}, interval);
	
			return function() { clearInterval(id); };
		});
	}
	
	return {
		now: now,
		setInterval_: F2(setInterval_)
	};
	
	}();
	var _elm_lang$core$Time$setInterval = _elm_lang$core$Native_Time.setInterval_;
	var _elm_lang$core$Time$spawnHelp = F3(
		function (router, intervals, processes) {
			var _p0 = intervals;
			if (_p0.ctor === '[]') {
				return _elm_lang$core$Task$succeed(processes);
			} else {
				var _p1 = _p0._0;
				var spawnRest = function (id) {
					return A3(
						_elm_lang$core$Time$spawnHelp,
						router,
						_p0._1,
						A3(_elm_lang$core$Dict$insert, _p1, id, processes));
				};
				var spawnTimer = _elm_lang$core$Native_Scheduler.spawn(
					A2(
						_elm_lang$core$Time$setInterval,
						_p1,
						A2(_elm_lang$core$Platform$sendToSelf, router, _p1)));
				return A2(_elm_lang$core$Task$andThen, spawnRest, spawnTimer);
			}
		});
	var _elm_lang$core$Time$addMySub = F2(
		function (_p2, state) {
			var _p3 = _p2;
			var _p6 = _p3._1;
			var _p5 = _p3._0;
			var _p4 = A2(_elm_lang$core$Dict$get, _p5, state);
			if (_p4.ctor === 'Nothing') {
				return A3(
					_elm_lang$core$Dict$insert,
					_p5,
					{
						ctor: '::',
						_0: _p6,
						_1: {ctor: '[]'}
					},
					state);
			} else {
				return A3(
					_elm_lang$core$Dict$insert,
					_p5,
					{ctor: '::', _0: _p6, _1: _p4._0},
					state);
			}
		});
	var _elm_lang$core$Time$inMilliseconds = function (t) {
		return t;
	};
	var _elm_lang$core$Time$millisecond = 1;
	var _elm_lang$core$Time$second = 1000 * _elm_lang$core$Time$millisecond;
	var _elm_lang$core$Time$minute = 60 * _elm_lang$core$Time$second;
	var _elm_lang$core$Time$hour = 60 * _elm_lang$core$Time$minute;
	var _elm_lang$core$Time$inHours = function (t) {
		return t / _elm_lang$core$Time$hour;
	};
	var _elm_lang$core$Time$inMinutes = function (t) {
		return t / _elm_lang$core$Time$minute;
	};
	var _elm_lang$core$Time$inSeconds = function (t) {
		return t / _elm_lang$core$Time$second;
	};
	var _elm_lang$core$Time$now = _elm_lang$core$Native_Time.now;
	var _elm_lang$core$Time$onSelfMsg = F3(
		function (router, interval, state) {
			var _p7 = A2(_elm_lang$core$Dict$get, interval, state.taggers);
			if (_p7.ctor === 'Nothing') {
				return _elm_lang$core$Task$succeed(state);
			} else {
				var tellTaggers = function (time) {
					return _elm_lang$core$Task$sequence(
						A2(
							_elm_lang$core$List$map,
							function (tagger) {
								return A2(
									_elm_lang$core$Platform$sendToApp,
									router,
									tagger(time));
							},
							_p7._0));
				};
				return A2(
					_elm_lang$core$Task$andThen,
					function (_p8) {
						return _elm_lang$core$Task$succeed(state);
					},
					A2(_elm_lang$core$Task$andThen, tellTaggers, _elm_lang$core$Time$now));
			}
		});
	var _elm_lang$core$Time$subscription = _elm_lang$core$Native_Platform.leaf('Time');
	var _elm_lang$core$Time$State = F2(
		function (a, b) {
			return {taggers: a, processes: b};
		});
	var _elm_lang$core$Time$init = _elm_lang$core$Task$succeed(
		A2(_elm_lang$core$Time$State, _elm_lang$core$Dict$empty, _elm_lang$core$Dict$empty));
	var _elm_lang$core$Time$onEffects = F3(
		function (router, subs, _p9) {
			var _p10 = _p9;
			var rightStep = F3(
				function (_p12, id, _p11) {
					var _p13 = _p11;
					return {
						ctor: '_Tuple3',
						_0: _p13._0,
						_1: _p13._1,
						_2: A2(
							_elm_lang$core$Task$andThen,
							function (_p14) {
								return _p13._2;
							},
							_elm_lang$core$Native_Scheduler.kill(id))
					};
				});
			var bothStep = F4(
				function (interval, taggers, id, _p15) {
					var _p16 = _p15;
					return {
						ctor: '_Tuple3',
						_0: _p16._0,
						_1: A3(_elm_lang$core$Dict$insert, interval, id, _p16._1),
						_2: _p16._2
					};
				});
			var leftStep = F3(
				function (interval, taggers, _p17) {
					var _p18 = _p17;
					return {
						ctor: '_Tuple3',
						_0: {ctor: '::', _0: interval, _1: _p18._0},
						_1: _p18._1,
						_2: _p18._2
					};
				});
			var newTaggers = A3(_elm_lang$core$List$foldl, _elm_lang$core$Time$addMySub, _elm_lang$core$Dict$empty, subs);
			var _p19 = A6(
				_elm_lang$core$Dict$merge,
				leftStep,
				bothStep,
				rightStep,
				newTaggers,
				_p10.processes,
				{
					ctor: '_Tuple3',
					_0: {ctor: '[]'},
					_1: _elm_lang$core$Dict$empty,
					_2: _elm_lang$core$Task$succeed(
						{ctor: '_Tuple0'})
				});
			var spawnList = _p19._0;
			var existingDict = _p19._1;
			var killTask = _p19._2;
			return A2(
				_elm_lang$core$Task$andThen,
				function (newProcesses) {
					return _elm_lang$core$Task$succeed(
						A2(_elm_lang$core$Time$State, newTaggers, newProcesses));
				},
				A2(
					_elm_lang$core$Task$andThen,
					function (_p20) {
						return A3(_elm_lang$core$Time$spawnHelp, router, spawnList, existingDict);
					},
					killTask));
		});
	var _elm_lang$core$Time$Every = F2(
		function (a, b) {
			return {ctor: 'Every', _0: a, _1: b};
		});
	var _elm_lang$core$Time$every = F2(
		function (interval, tagger) {
			return _elm_lang$core$Time$subscription(
				A2(_elm_lang$core$Time$Every, interval, tagger));
		});
	var _elm_lang$core$Time$subMap = F2(
		function (f, _p21) {
			var _p22 = _p21;
			return A2(
				_elm_lang$core$Time$Every,
				_p22._0,
				function (_p23) {
					return f(
						_p22._1(_p23));
				});
		});
	_elm_lang$core$Native_Platform.effectManagers['Time'] = {pkg: 'elm-lang/core', init: _elm_lang$core$Time$init, onEffects: _elm_lang$core$Time$onEffects, onSelfMsg: _elm_lang$core$Time$onSelfMsg, tag: 'sub', subMap: _elm_lang$core$Time$subMap};
	
	var _elm_lang$core$Debug$crash = _elm_lang$core$Native_Debug.crash;
	var _elm_lang$core$Debug$log = _elm_lang$core$Native_Debug.log;
	
	//import Maybe, Native.Array, Native.List, Native.Utils, Result //
	
	var _elm_lang$core$Native_Json = function() {
	
	
	// CORE DECODERS
	
	function succeed(msg)
	{
		return {
			ctor: '<decoder>',
			tag: 'succeed',
			msg: msg
		};
	}
	
	function fail(msg)
	{
		return {
			ctor: '<decoder>',
			tag: 'fail',
			msg: msg
		};
	}
	
	function decodePrimitive(tag)
	{
		return {
			ctor: '<decoder>',
			tag: tag
		};
	}
	
	function decodeContainer(tag, decoder)
	{
		return {
			ctor: '<decoder>',
			tag: tag,
			decoder: decoder
		};
	}
	
	function decodeNull(value)
	{
		return {
			ctor: '<decoder>',
			tag: 'null',
			value: value
		};
	}
	
	function decodeField(field, decoder)
	{
		return {
			ctor: '<decoder>',
			tag: 'field',
			field: field,
			decoder: decoder
		};
	}
	
	function decodeIndex(index, decoder)
	{
		return {
			ctor: '<decoder>',
			tag: 'index',
			index: index,
			decoder: decoder
		};
	}
	
	function decodeKeyValuePairs(decoder)
	{
		return {
			ctor: '<decoder>',
			tag: 'key-value',
			decoder: decoder
		};
	}
	
	function mapMany(f, decoders)
	{
		return {
			ctor: '<decoder>',
			tag: 'map-many',
			func: f,
			decoders: decoders
		};
	}
	
	function andThen(callback, decoder)
	{
		return {
			ctor: '<decoder>',
			tag: 'andThen',
			decoder: decoder,
			callback: callback
		};
	}
	
	function oneOf(decoders)
	{
		return {
			ctor: '<decoder>',
			tag: 'oneOf',
			decoders: decoders
		};
	}
	
	
	// DECODING OBJECTS
	
	function map1(f, d1)
	{
		return mapMany(f, [d1]);
	}
	
	function map2(f, d1, d2)
	{
		return mapMany(f, [d1, d2]);
	}
	
	function map3(f, d1, d2, d3)
	{
		return mapMany(f, [d1, d2, d3]);
	}
	
	function map4(f, d1, d2, d3, d4)
	{
		return mapMany(f, [d1, d2, d3, d4]);
	}
	
	function map5(f, d1, d2, d3, d4, d5)
	{
		return mapMany(f, [d1, d2, d3, d4, d5]);
	}
	
	function map6(f, d1, d2, d3, d4, d5, d6)
	{
		return mapMany(f, [d1, d2, d3, d4, d5, d6]);
	}
	
	function map7(f, d1, d2, d3, d4, d5, d6, d7)
	{
		return mapMany(f, [d1, d2, d3, d4, d5, d6, d7]);
	}
	
	function map8(f, d1, d2, d3, d4, d5, d6, d7, d8)
	{
		return mapMany(f, [d1, d2, d3, d4, d5, d6, d7, d8]);
	}
	
	
	// DECODE HELPERS
	
	function ok(value)
	{
		return { tag: 'ok', value: value };
	}
	
	function badPrimitive(type, value)
	{
		return { tag: 'primitive', type: type, value: value };
	}
	
	function badIndex(index, nestedProblems)
	{
		return { tag: 'index', index: index, rest: nestedProblems };
	}
	
	function badField(field, nestedProblems)
	{
		return { tag: 'field', field: field, rest: nestedProblems };
	}
	
	function badIndex(index, nestedProblems)
	{
		return { tag: 'index', index: index, rest: nestedProblems };
	}
	
	function badOneOf(problems)
	{
		return { tag: 'oneOf', problems: problems };
	}
	
	function bad(msg)
	{
		return { tag: 'fail', msg: msg };
	}
	
	function badToString(problem)
	{
		var context = '_';
		while (problem)
		{
			switch (problem.tag)
			{
				case 'primitive':
					return 'Expecting ' + problem.type
						+ (context === '_' ? '' : ' at ' + context)
						+ ' but instead got: ' + jsToString(problem.value);
	
				case 'index':
					context += '[' + problem.index + ']';
					problem = problem.rest;
					break;
	
				case 'field':
					context += '.' + problem.field;
					problem = problem.rest;
					break;
	
				case 'index':
					context += '[' + problem.index + ']';
					problem = problem.rest;
					break;
	
				case 'oneOf':
					var problems = problem.problems;
					for (var i = 0; i < problems.length; i++)
					{
						problems[i] = badToString(problems[i]);
					}
					return 'I ran into the following problems'
						+ (context === '_' ? '' : ' at ' + context)
						+ ':\n\n' + problems.join('\n');
	
				case 'fail':
					return 'I ran into a `fail` decoder'
						+ (context === '_' ? '' : ' at ' + context)
						+ ': ' + problem.msg;
			}
		}
	}
	
	function jsToString(value)
	{
		return value === undefined
			? 'undefined'
			: JSON.stringify(value);
	}
	
	
	// DECODE
	
	function runOnString(decoder, string)
	{
		var json;
		try
		{
			json = JSON.parse(string);
		}
		catch (e)
		{
			return _elm_lang$core$Result$Err('Given an invalid JSON: ' + e.message);
		}
		return run(decoder, json);
	}
	
	function run(decoder, value)
	{
		var result = runHelp(decoder, value);
		return (result.tag === 'ok')
			? _elm_lang$core$Result$Ok(result.value)
			: _elm_lang$core$Result$Err(badToString(result));
	}
	
	function runHelp(decoder, value)
	{
		switch (decoder.tag)
		{
			case 'bool':
				return (typeof value === 'boolean')
					? ok(value)
					: badPrimitive('a Bool', value);
	
			case 'int':
				if (typeof value !== 'number') {
					return badPrimitive('an Int', value);
				}
	
				if (-2147483647 < value && value < 2147483647 && (value | 0) === value) {
					return ok(value);
				}
	
				if (isFinite(value) && !(value % 1)) {
					return ok(value);
				}
	
				return badPrimitive('an Int', value);
	
			case 'float':
				return (typeof value === 'number')
					? ok(value)
					: badPrimitive('a Float', value);
	
			case 'string':
				return (typeof value === 'string')
					? ok(value)
					: (value instanceof String)
						? ok(value + '')
						: badPrimitive('a String', value);
	
			case 'null':
				return (value === null)
					? ok(decoder.value)
					: badPrimitive('null', value);
	
			case 'value':
				return ok(value);
	
			case 'list':
				if (!(value instanceof Array))
				{
					return badPrimitive('a List', value);
				}
	
				var list = _elm_lang$core$Native_List.Nil;
				for (var i = value.length; i--; )
				{
					var result = runHelp(decoder.decoder, value[i]);
					if (result.tag !== 'ok')
					{
						return badIndex(i, result)
					}
					list = _elm_lang$core$Native_List.Cons(result.value, list);
				}
				return ok(list);
	
			case 'array':
				if (!(value instanceof Array))
				{
					return badPrimitive('an Array', value);
				}
	
				var len = value.length;
				var array = new Array(len);
				for (var i = len; i--; )
				{
					var result = runHelp(decoder.decoder, value[i]);
					if (result.tag !== 'ok')
					{
						return badIndex(i, result);
					}
					array[i] = result.value;
				}
				return ok(_elm_lang$core$Native_Array.fromJSArray(array));
	
			case 'maybe':
				var result = runHelp(decoder.decoder, value);
				return (result.tag === 'ok')
					? ok(_elm_lang$core$Maybe$Just(result.value))
					: ok(_elm_lang$core$Maybe$Nothing);
	
			case 'field':
				var field = decoder.field;
				if (typeof value !== 'object' || value === null || !(field in value))
				{
					return badPrimitive('an object with a field named `' + field + '`', value);
				}
	
				var result = runHelp(decoder.decoder, value[field]);
				return (result.tag === 'ok') ? result : badField(field, result);
	
			case 'index':
				var index = decoder.index;
				if (!(value instanceof Array))
				{
					return badPrimitive('an array', value);
				}
				if (index >= value.length)
				{
					return badPrimitive('a longer array. Need index ' + index + ' but there are only ' + value.length + ' entries', value);
				}
	
				var result = runHelp(decoder.decoder, value[index]);
				return (result.tag === 'ok') ? result : badIndex(index, result);
	
			case 'key-value':
				if (typeof value !== 'object' || value === null || value instanceof Array)
				{
					return badPrimitive('an object', value);
				}
	
				var keyValuePairs = _elm_lang$core$Native_List.Nil;
				for (var key in value)
				{
					var result = runHelp(decoder.decoder, value[key]);
					if (result.tag !== 'ok')
					{
						return badField(key, result);
					}
					var pair = _elm_lang$core$Native_Utils.Tuple2(key, result.value);
					keyValuePairs = _elm_lang$core$Native_List.Cons(pair, keyValuePairs);
				}
				return ok(keyValuePairs);
	
			case 'map-many':
				var answer = decoder.func;
				var decoders = decoder.decoders;
				for (var i = 0; i < decoders.length; i++)
				{
					var result = runHelp(decoders[i], value);
					if (result.tag !== 'ok')
					{
						return result;
					}
					answer = answer(result.value);
				}
				return ok(answer);
	
			case 'andThen':
				var result = runHelp(decoder.decoder, value);
				return (result.tag !== 'ok')
					? result
					: runHelp(decoder.callback(result.value), value);
	
			case 'oneOf':
				var errors = [];
				var temp = decoder.decoders;
				while (temp.ctor !== '[]')
				{
					var result = runHelp(temp._0, value);
	
					if (result.tag === 'ok')
					{
						return result;
					}
	
					errors.push(result);
	
					temp = temp._1;
				}
				return badOneOf(errors);
	
			case 'fail':
				return bad(decoder.msg);
	
			case 'succeed':
				return ok(decoder.msg);
		}
	}
	
	
	// EQUALITY
	
	function equality(a, b)
	{
		if (a === b)
		{
			return true;
		}
	
		if (a.tag !== b.tag)
		{
			return false;
		}
	
		switch (a.tag)
		{
			case 'succeed':
			case 'fail':
				return a.msg === b.msg;
	
			case 'bool':
			case 'int':
			case 'float':
			case 'string':
			case 'value':
				return true;
	
			case 'null':
				return a.value === b.value;
	
			case 'list':
			case 'array':
			case 'maybe':
			case 'key-value':
				return equality(a.decoder, b.decoder);
	
			case 'field':
				return a.field === b.field && equality(a.decoder, b.decoder);
	
			case 'index':
				return a.index === b.index && equality(a.decoder, b.decoder);
	
			case 'map-many':
				if (a.func !== b.func)
				{
					return false;
				}
				return listEquality(a.decoders, b.decoders);
	
			case 'andThen':
				return a.callback === b.callback && equality(a.decoder, b.decoder);
	
			case 'oneOf':
				return listEquality(a.decoders, b.decoders);
		}
	}
	
	function listEquality(aDecoders, bDecoders)
	{
		var len = aDecoders.length;
		if (len !== bDecoders.length)
		{
			return false;
		}
		for (var i = 0; i < len; i++)
		{
			if (!equality(aDecoders[i], bDecoders[i]))
			{
				return false;
			}
		}
		return true;
	}
	
	
	// ENCODE
	
	function encode(indentLevel, value)
	{
		return JSON.stringify(value, null, indentLevel);
	}
	
	function identity(value)
	{
		return value;
	}
	
	function encodeObject(keyValuePairs)
	{
		var obj = {};
		while (keyValuePairs.ctor !== '[]')
		{
			var pair = keyValuePairs._0;
			obj[pair._0] = pair._1;
			keyValuePairs = keyValuePairs._1;
		}
		return obj;
	}
	
	return {
		encode: F2(encode),
		runOnString: F2(runOnString),
		run: F2(run),
	
		decodeNull: decodeNull,
		decodePrimitive: decodePrimitive,
		decodeContainer: F2(decodeContainer),
	
		decodeField: F2(decodeField),
		decodeIndex: F2(decodeIndex),
	
		map1: F2(map1),
		map2: F3(map2),
		map3: F4(map3),
		map4: F5(map4),
		map5: F6(map5),
		map6: F7(map6),
		map7: F8(map7),
		map8: F9(map8),
		decodeKeyValuePairs: decodeKeyValuePairs,
	
		andThen: F2(andThen),
		fail: fail,
		succeed: succeed,
		oneOf: oneOf,
	
		identity: identity,
		encodeNull: null,
		encodeArray: _elm_lang$core$Native_Array.toJSArray,
		encodeList: _elm_lang$core$Native_List.toArray,
		encodeObject: encodeObject,
	
		equality: equality
	};
	
	}();
	
	var _elm_lang$core$Json_Encode$list = _elm_lang$core$Native_Json.encodeList;
	var _elm_lang$core$Json_Encode$array = _elm_lang$core$Native_Json.encodeArray;
	var _elm_lang$core$Json_Encode$object = _elm_lang$core$Native_Json.encodeObject;
	var _elm_lang$core$Json_Encode$null = _elm_lang$core$Native_Json.encodeNull;
	var _elm_lang$core$Json_Encode$bool = _elm_lang$core$Native_Json.identity;
	var _elm_lang$core$Json_Encode$float = _elm_lang$core$Native_Json.identity;
	var _elm_lang$core$Json_Encode$int = _elm_lang$core$Native_Json.identity;
	var _elm_lang$core$Json_Encode$string = _elm_lang$core$Native_Json.identity;
	var _elm_lang$core$Json_Encode$encode = _elm_lang$core$Native_Json.encode;
	var _elm_lang$core$Json_Encode$Value = {ctor: 'Value'};
	
	var _elm_lang$core$Json_Decode$null = _elm_lang$core$Native_Json.decodeNull;
	var _elm_lang$core$Json_Decode$value = _elm_lang$core$Native_Json.decodePrimitive('value');
	var _elm_lang$core$Json_Decode$andThen = _elm_lang$core$Native_Json.andThen;
	var _elm_lang$core$Json_Decode$fail = _elm_lang$core$Native_Json.fail;
	var _elm_lang$core$Json_Decode$succeed = _elm_lang$core$Native_Json.succeed;
	var _elm_lang$core$Json_Decode$lazy = function (thunk) {
		return A2(
			_elm_lang$core$Json_Decode$andThen,
			thunk,
			_elm_lang$core$Json_Decode$succeed(
				{ctor: '_Tuple0'}));
	};
	var _elm_lang$core$Json_Decode$decodeValue = _elm_lang$core$Native_Json.run;
	var _elm_lang$core$Json_Decode$decodeString = _elm_lang$core$Native_Json.runOnString;
	var _elm_lang$core$Json_Decode$map8 = _elm_lang$core$Native_Json.map8;
	var _elm_lang$core$Json_Decode$map7 = _elm_lang$core$Native_Json.map7;
	var _elm_lang$core$Json_Decode$map6 = _elm_lang$core$Native_Json.map6;
	var _elm_lang$core$Json_Decode$map5 = _elm_lang$core$Native_Json.map5;
	var _elm_lang$core$Json_Decode$map4 = _elm_lang$core$Native_Json.map4;
	var _elm_lang$core$Json_Decode$map3 = _elm_lang$core$Native_Json.map3;
	var _elm_lang$core$Json_Decode$map2 = _elm_lang$core$Native_Json.map2;
	var _elm_lang$core$Json_Decode$map = _elm_lang$core$Native_Json.map1;
	var _elm_lang$core$Json_Decode$oneOf = _elm_lang$core$Native_Json.oneOf;
	var _elm_lang$core$Json_Decode$maybe = function (decoder) {
		return A2(_elm_lang$core$Native_Json.decodeContainer, 'maybe', decoder);
	};
	var _elm_lang$core$Json_Decode$index = _elm_lang$core$Native_Json.decodeIndex;
	var _elm_lang$core$Json_Decode$field = _elm_lang$core$Native_Json.decodeField;
	var _elm_lang$core$Json_Decode$at = F2(
		function (fields, decoder) {
			return A3(_elm_lang$core$List$foldr, _elm_lang$core$Json_Decode$field, decoder, fields);
		});
	var _elm_lang$core$Json_Decode$keyValuePairs = _elm_lang$core$Native_Json.decodeKeyValuePairs;
	var _elm_lang$core$Json_Decode$dict = function (decoder) {
		return A2(
			_elm_lang$core$Json_Decode$map,
			_elm_lang$core$Dict$fromList,
			_elm_lang$core$Json_Decode$keyValuePairs(decoder));
	};
	var _elm_lang$core$Json_Decode$array = function (decoder) {
		return A2(_elm_lang$core$Native_Json.decodeContainer, 'array', decoder);
	};
	var _elm_lang$core$Json_Decode$list = function (decoder) {
		return A2(_elm_lang$core$Native_Json.decodeContainer, 'list', decoder);
	};
	var _elm_lang$core$Json_Decode$nullable = function (decoder) {
		return _elm_lang$core$Json_Decode$oneOf(
			{
				ctor: '::',
				_0: _elm_lang$core$Json_Decode$null(_elm_lang$core$Maybe$Nothing),
				_1: {
					ctor: '::',
					_0: A2(_elm_lang$core$Json_Decode$map, _elm_lang$core$Maybe$Just, decoder),
					_1: {ctor: '[]'}
				}
			});
	};
	var _elm_lang$core$Json_Decode$float = _elm_lang$core$Native_Json.decodePrimitive('float');
	var _elm_lang$core$Json_Decode$int = _elm_lang$core$Native_Json.decodePrimitive('int');
	var _elm_lang$core$Json_Decode$bool = _elm_lang$core$Native_Json.decodePrimitive('bool');
	var _elm_lang$core$Json_Decode$string = _elm_lang$core$Native_Json.decodePrimitive('string');
	var _elm_lang$core$Json_Decode$Decoder = {ctor: 'Decoder'};
	
	//import Maybe, Native.List //
	
	var _elm_lang$core$Native_Regex = function() {
	
	function escape(str)
	{
		return str.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
	}
	function caseInsensitive(re)
	{
		return new RegExp(re.source, 'gi');
	}
	function regex(raw)
	{
		return new RegExp(raw, 'g');
	}
	
	function contains(re, string)
	{
		return string.match(re) !== null;
	}
	
	function find(n, re, str)
	{
		n = n.ctor === 'All' ? Infinity : n._0;
		var out = [];
		var number = 0;
		var string = str;
		var lastIndex = re.lastIndex;
		var prevLastIndex = -1;
		var result;
		while (number++ < n && (result = re.exec(string)))
		{
			if (prevLastIndex === re.lastIndex) break;
			var i = result.length - 1;
			var subs = new Array(i);
			while (i > 0)
			{
				var submatch = result[i];
				subs[--i] = submatch === undefined
					? _elm_lang$core$Maybe$Nothing
					: _elm_lang$core$Maybe$Just(submatch);
			}
			out.push({
				match: result[0],
				submatches: _elm_lang$core$Native_List.fromArray(subs),
				index: result.index,
				number: number
			});
			prevLastIndex = re.lastIndex;
		}
		re.lastIndex = lastIndex;
		return _elm_lang$core$Native_List.fromArray(out);
	}
	
	function replace(n, re, replacer, string)
	{
		n = n.ctor === 'All' ? Infinity : n._0;
		var count = 0;
		function jsReplacer(match)
		{
			if (count++ >= n)
			{
				return match;
			}
			var i = arguments.length - 3;
			var submatches = new Array(i);
			while (i > 0)
			{
				var submatch = arguments[i];
				submatches[--i] = submatch === undefined
					? _elm_lang$core$Maybe$Nothing
					: _elm_lang$core$Maybe$Just(submatch);
			}
			return replacer({
				match: match,
				submatches: _elm_lang$core$Native_List.fromArray(submatches),
				index: arguments[arguments.length - 2],
				number: count
			});
		}
		return string.replace(re, jsReplacer);
	}
	
	function split(n, re, str)
	{
		n = n.ctor === 'All' ? Infinity : n._0;
		if (n === Infinity)
		{
			return _elm_lang$core$Native_List.fromArray(str.split(re));
		}
		var string = str;
		var result;
		var out = [];
		var start = re.lastIndex;
		var restoreLastIndex = re.lastIndex;
		while (n--)
		{
			if (!(result = re.exec(string))) break;
			out.push(string.slice(start, result.index));
			start = re.lastIndex;
		}
		out.push(string.slice(start));
		re.lastIndex = restoreLastIndex;
		return _elm_lang$core$Native_List.fromArray(out);
	}
	
	return {
		regex: regex,
		caseInsensitive: caseInsensitive,
		escape: escape,
	
		contains: F2(contains),
		find: F3(find),
		replace: F4(replace),
		split: F3(split)
	};
	
	}();
	
	var _elm_lang$core$Process$kill = _elm_lang$core$Native_Scheduler.kill;
	var _elm_lang$core$Process$sleep = _elm_lang$core$Native_Scheduler.sleep;
	var _elm_lang$core$Process$spawn = _elm_lang$core$Native_Scheduler.spawn;
	
	var _elm_lang$core$Tuple$mapSecond = F2(
		function (func, _p0) {
			var _p1 = _p0;
			return {
				ctor: '_Tuple2',
				_0: _p1._0,
				_1: func(_p1._1)
			};
		});
	var _elm_lang$core$Tuple$mapFirst = F2(
		function (func, _p2) {
			var _p3 = _p2;
			return {
				ctor: '_Tuple2',
				_0: func(_p3._0),
				_1: _p3._1
			};
		});
	var _elm_lang$core$Tuple$second = function (_p4) {
		var _p5 = _p4;
		return _p5._1;
	};
	var _elm_lang$core$Tuple$first = function (_p6) {
		var _p7 = _p6;
		return _p7._0;
	};
	
	var _elm_lang$core$Random$onSelfMsg = F3(
		function (_p1, _p0, seed) {
			return _elm_lang$core$Task$succeed(seed);
		});
	var _elm_lang$core$Random$magicNum8 = 2147483562;
	var _elm_lang$core$Random$range = function (_p2) {
		return {ctor: '_Tuple2', _0: 0, _1: _elm_lang$core$Random$magicNum8};
	};
	var _elm_lang$core$Random$magicNum7 = 2147483399;
	var _elm_lang$core$Random$magicNum6 = 2147483563;
	var _elm_lang$core$Random$magicNum5 = 3791;
	var _elm_lang$core$Random$magicNum4 = 40692;
	var _elm_lang$core$Random$magicNum3 = 52774;
	var _elm_lang$core$Random$magicNum2 = 12211;
	var _elm_lang$core$Random$magicNum1 = 53668;
	var _elm_lang$core$Random$magicNum0 = 40014;
	var _elm_lang$core$Random$step = F2(
		function (_p3, seed) {
			var _p4 = _p3;
			return _p4._0(seed);
		});
	var _elm_lang$core$Random$onEffects = F3(
		function (router, commands, seed) {
			var _p5 = commands;
			if (_p5.ctor === '[]') {
				return _elm_lang$core$Task$succeed(seed);
			} else {
				var _p6 = A2(_elm_lang$core$Random$step, _p5._0._0, seed);
				var value = _p6._0;
				var newSeed = _p6._1;
				return A2(
					_elm_lang$core$Task$andThen,
					function (_p7) {
						return A3(_elm_lang$core$Random$onEffects, router, _p5._1, newSeed);
					},
					A2(_elm_lang$core$Platform$sendToApp, router, value));
			}
		});
	var _elm_lang$core$Random$listHelp = F4(
		function (list, n, generate, seed) {
			listHelp:
			while (true) {
				if (_elm_lang$core$Native_Utils.cmp(n, 1) < 0) {
					return {
						ctor: '_Tuple2',
						_0: _elm_lang$core$List$reverse(list),
						_1: seed
					};
				} else {
					var _p8 = generate(seed);
					var value = _p8._0;
					var newSeed = _p8._1;
					var _v2 = {ctor: '::', _0: value, _1: list},
						_v3 = n - 1,
						_v4 = generate,
						_v5 = newSeed;
					list = _v2;
					n = _v3;
					generate = _v4;
					seed = _v5;
					continue listHelp;
				}
			}
		});
	var _elm_lang$core$Random$minInt = -2147483648;
	var _elm_lang$core$Random$maxInt = 2147483647;
	var _elm_lang$core$Random$iLogBase = F2(
		function (b, i) {
			return (_elm_lang$core$Native_Utils.cmp(i, b) < 0) ? 1 : (1 + A2(_elm_lang$core$Random$iLogBase, b, (i / b) | 0));
		});
	var _elm_lang$core$Random$command = _elm_lang$core$Native_Platform.leaf('Random');
	var _elm_lang$core$Random$Generator = function (a) {
		return {ctor: 'Generator', _0: a};
	};
	var _elm_lang$core$Random$list = F2(
		function (n, _p9) {
			var _p10 = _p9;
			return _elm_lang$core$Random$Generator(
				function (seed) {
					return A4(
						_elm_lang$core$Random$listHelp,
						{ctor: '[]'},
						n,
						_p10._0,
						seed);
				});
		});
	var _elm_lang$core$Random$map = F2(
		function (func, _p11) {
			var _p12 = _p11;
			return _elm_lang$core$Random$Generator(
				function (seed0) {
					var _p13 = _p12._0(seed0);
					var a = _p13._0;
					var seed1 = _p13._1;
					return {
						ctor: '_Tuple2',
						_0: func(a),
						_1: seed1
					};
				});
		});
	var _elm_lang$core$Random$map2 = F3(
		function (func, _p15, _p14) {
			var _p16 = _p15;
			var _p17 = _p14;
			return _elm_lang$core$Random$Generator(
				function (seed0) {
					var _p18 = _p16._0(seed0);
					var a = _p18._0;
					var seed1 = _p18._1;
					var _p19 = _p17._0(seed1);
					var b = _p19._0;
					var seed2 = _p19._1;
					return {
						ctor: '_Tuple2',
						_0: A2(func, a, b),
						_1: seed2
					};
				});
		});
	var _elm_lang$core$Random$pair = F2(
		function (genA, genB) {
			return A3(
				_elm_lang$core$Random$map2,
				F2(
					function (v0, v1) {
						return {ctor: '_Tuple2', _0: v0, _1: v1};
					}),
				genA,
				genB);
		});
	var _elm_lang$core$Random$map3 = F4(
		function (func, _p22, _p21, _p20) {
			var _p23 = _p22;
			var _p24 = _p21;
			var _p25 = _p20;
			return _elm_lang$core$Random$Generator(
				function (seed0) {
					var _p26 = _p23._0(seed0);
					var a = _p26._0;
					var seed1 = _p26._1;
					var _p27 = _p24._0(seed1);
					var b = _p27._0;
					var seed2 = _p27._1;
					var _p28 = _p25._0(seed2);
					var c = _p28._0;
					var seed3 = _p28._1;
					return {
						ctor: '_Tuple2',
						_0: A3(func, a, b, c),
						_1: seed3
					};
				});
		});
	var _elm_lang$core$Random$map4 = F5(
		function (func, _p32, _p31, _p30, _p29) {
			var _p33 = _p32;
			var _p34 = _p31;
			var _p35 = _p30;
			var _p36 = _p29;
			return _elm_lang$core$Random$Generator(
				function (seed0) {
					var _p37 = _p33._0(seed0);
					var a = _p37._0;
					var seed1 = _p37._1;
					var _p38 = _p34._0(seed1);
					var b = _p38._0;
					var seed2 = _p38._1;
					var _p39 = _p35._0(seed2);
					var c = _p39._0;
					var seed3 = _p39._1;
					var _p40 = _p36._0(seed3);
					var d = _p40._0;
					var seed4 = _p40._1;
					return {
						ctor: '_Tuple2',
						_0: A4(func, a, b, c, d),
						_1: seed4
					};
				});
		});
	var _elm_lang$core$Random$map5 = F6(
		function (func, _p45, _p44, _p43, _p42, _p41) {
			var _p46 = _p45;
			var _p47 = _p44;
			var _p48 = _p43;
			var _p49 = _p42;
			var _p50 = _p41;
			return _elm_lang$core$Random$Generator(
				function (seed0) {
					var _p51 = _p46._0(seed0);
					var a = _p51._0;
					var seed1 = _p51._1;
					var _p52 = _p47._0(seed1);
					var b = _p52._0;
					var seed2 = _p52._1;
					var _p53 = _p48._0(seed2);
					var c = _p53._0;
					var seed3 = _p53._1;
					var _p54 = _p49._0(seed3);
					var d = _p54._0;
					var seed4 = _p54._1;
					var _p55 = _p50._0(seed4);
					var e = _p55._0;
					var seed5 = _p55._1;
					return {
						ctor: '_Tuple2',
						_0: A5(func, a, b, c, d, e),
						_1: seed5
					};
				});
		});
	var _elm_lang$core$Random$andThen = F2(
		function (callback, _p56) {
			var _p57 = _p56;
			return _elm_lang$core$Random$Generator(
				function (seed) {
					var _p58 = _p57._0(seed);
					var result = _p58._0;
					var newSeed = _p58._1;
					var _p59 = callback(result);
					var genB = _p59._0;
					return genB(newSeed);
				});
		});
	var _elm_lang$core$Random$State = F2(
		function (a, b) {
			return {ctor: 'State', _0: a, _1: b};
		});
	var _elm_lang$core$Random$initState = function (seed) {
		var s = A2(_elm_lang$core$Basics$max, seed, 0 - seed);
		var q = (s / (_elm_lang$core$Random$magicNum6 - 1)) | 0;
		var s2 = A2(_elm_lang$core$Basics_ops['%'], q, _elm_lang$core$Random$magicNum7 - 1);
		var s1 = A2(_elm_lang$core$Basics_ops['%'], s, _elm_lang$core$Random$magicNum6 - 1);
		return A2(_elm_lang$core$Random$State, s1 + 1, s2 + 1);
	};
	var _elm_lang$core$Random$next = function (_p60) {
		var _p61 = _p60;
		var _p63 = _p61._1;
		var _p62 = _p61._0;
		var k2 = (_p63 / _elm_lang$core$Random$magicNum3) | 0;
		var rawState2 = (_elm_lang$core$Random$magicNum4 * (_p63 - (k2 * _elm_lang$core$Random$magicNum3))) - (k2 * _elm_lang$core$Random$magicNum5);
		var newState2 = (_elm_lang$core$Native_Utils.cmp(rawState2, 0) < 0) ? (rawState2 + _elm_lang$core$Random$magicNum7) : rawState2;
		var k1 = (_p62 / _elm_lang$core$Random$magicNum1) | 0;
		var rawState1 = (_elm_lang$core$Random$magicNum0 * (_p62 - (k1 * _elm_lang$core$Random$magicNum1))) - (k1 * _elm_lang$core$Random$magicNum2);
		var newState1 = (_elm_lang$core$Native_Utils.cmp(rawState1, 0) < 0) ? (rawState1 + _elm_lang$core$Random$magicNum6) : rawState1;
		var z = newState1 - newState2;
		var newZ = (_elm_lang$core$Native_Utils.cmp(z, 1) < 0) ? (z + _elm_lang$core$Random$magicNum8) : z;
		return {
			ctor: '_Tuple2',
			_0: newZ,
			_1: A2(_elm_lang$core$Random$State, newState1, newState2)
		};
	};
	var _elm_lang$core$Random$split = function (_p64) {
		var _p65 = _p64;
		var _p68 = _p65._1;
		var _p67 = _p65._0;
		var _p66 = _elm_lang$core$Tuple$second(
			_elm_lang$core$Random$next(_p65));
		var t1 = _p66._0;
		var t2 = _p66._1;
		var new_s2 = _elm_lang$core$Native_Utils.eq(_p68, 1) ? (_elm_lang$core$Random$magicNum7 - 1) : (_p68 - 1);
		var new_s1 = _elm_lang$core$Native_Utils.eq(_p67, _elm_lang$core$Random$magicNum6 - 1) ? 1 : (_p67 + 1);
		return {
			ctor: '_Tuple2',
			_0: A2(_elm_lang$core$Random$State, new_s1, t2),
			_1: A2(_elm_lang$core$Random$State, t1, new_s2)
		};
	};
	var _elm_lang$core$Random$Seed = function (a) {
		return {ctor: 'Seed', _0: a};
	};
	var _elm_lang$core$Random$int = F2(
		function (a, b) {
			return _elm_lang$core$Random$Generator(
				function (_p69) {
					var _p70 = _p69;
					var _p75 = _p70._0;
					var base = 2147483561;
					var f = F3(
						function (n, acc, state) {
							f:
							while (true) {
								var _p71 = n;
								if (_p71 === 0) {
									return {ctor: '_Tuple2', _0: acc, _1: state};
								} else {
									var _p72 = _p75.next(state);
									var x = _p72._0;
									var nextState = _p72._1;
									var _v27 = n - 1,
										_v28 = x + (acc * base),
										_v29 = nextState;
									n = _v27;
									acc = _v28;
									state = _v29;
									continue f;
								}
							}
						});
					var _p73 = (_elm_lang$core$Native_Utils.cmp(a, b) < 0) ? {ctor: '_Tuple2', _0: a, _1: b} : {ctor: '_Tuple2', _0: b, _1: a};
					var lo = _p73._0;
					var hi = _p73._1;
					var k = (hi - lo) + 1;
					var n = A2(_elm_lang$core$Random$iLogBase, base, k);
					var _p74 = A3(f, n, 1, _p75.state);
					var v = _p74._0;
					var nextState = _p74._1;
					return {
						ctor: '_Tuple2',
						_0: lo + A2(_elm_lang$core$Basics_ops['%'], v, k),
						_1: _elm_lang$core$Random$Seed(
							_elm_lang$core$Native_Utils.update(
								_p75,
								{state: nextState}))
					};
				});
		});
	var _elm_lang$core$Random$bool = A2(
		_elm_lang$core$Random$map,
		F2(
			function (x, y) {
				return _elm_lang$core$Native_Utils.eq(x, y);
			})(1),
		A2(_elm_lang$core$Random$int, 0, 1));
	var _elm_lang$core$Random$float = F2(
		function (a, b) {
			return _elm_lang$core$Random$Generator(
				function (seed) {
					var _p76 = A2(
						_elm_lang$core$Random$step,
						A2(_elm_lang$core$Random$int, _elm_lang$core$Random$minInt, _elm_lang$core$Random$maxInt),
						seed);
					var number = _p76._0;
					var newSeed = _p76._1;
					var negativeOneToOne = _elm_lang$core$Basics$toFloat(number) / _elm_lang$core$Basics$toFloat(_elm_lang$core$Random$maxInt - _elm_lang$core$Random$minInt);
					var _p77 = (_elm_lang$core$Native_Utils.cmp(a, b) < 0) ? {ctor: '_Tuple2', _0: a, _1: b} : {ctor: '_Tuple2', _0: b, _1: a};
					var lo = _p77._0;
					var hi = _p77._1;
					var scaled = ((lo + hi) / 2) + ((hi - lo) * negativeOneToOne);
					return {ctor: '_Tuple2', _0: scaled, _1: newSeed};
				});
		});
	var _elm_lang$core$Random$initialSeed = function (n) {
		return _elm_lang$core$Random$Seed(
			{
				state: _elm_lang$core$Random$initState(n),
				next: _elm_lang$core$Random$next,
				split: _elm_lang$core$Random$split,
				range: _elm_lang$core$Random$range
			});
	};
	var _elm_lang$core$Random$init = A2(
		_elm_lang$core$Task$andThen,
		function (t) {
			return _elm_lang$core$Task$succeed(
				_elm_lang$core$Random$initialSeed(
					_elm_lang$core$Basics$round(t)));
		},
		_elm_lang$core$Time$now);
	var _elm_lang$core$Random$Generate = function (a) {
		return {ctor: 'Generate', _0: a};
	};
	var _elm_lang$core$Random$generate = F2(
		function (tagger, generator) {
			return _elm_lang$core$Random$command(
				_elm_lang$core$Random$Generate(
					A2(_elm_lang$core$Random$map, tagger, generator)));
		});
	var _elm_lang$core$Random$cmdMap = F2(
		function (func, _p78) {
			var _p79 = _p78;
			return _elm_lang$core$Random$Generate(
				A2(_elm_lang$core$Random$map, func, _p79._0));
		});
	_elm_lang$core$Native_Platform.effectManagers['Random'] = {pkg: 'elm-lang/core', init: _elm_lang$core$Random$init, onEffects: _elm_lang$core$Random$onEffects, onSelfMsg: _elm_lang$core$Random$onSelfMsg, tag: 'cmd', cmdMap: _elm_lang$core$Random$cmdMap};
	
	var _elm_lang$core$Regex$split = _elm_lang$core$Native_Regex.split;
	var _elm_lang$core$Regex$replace = _elm_lang$core$Native_Regex.replace;
	var _elm_lang$core$Regex$find = _elm_lang$core$Native_Regex.find;
	var _elm_lang$core$Regex$contains = _elm_lang$core$Native_Regex.contains;
	var _elm_lang$core$Regex$caseInsensitive = _elm_lang$core$Native_Regex.caseInsensitive;
	var _elm_lang$core$Regex$regex = _elm_lang$core$Native_Regex.regex;
	var _elm_lang$core$Regex$escape = _elm_lang$core$Native_Regex.escape;
	var _elm_lang$core$Regex$Match = F4(
		function (a, b, c, d) {
			return {match: a, submatches: b, index: c, number: d};
		});
	var _elm_lang$core$Regex$Regex = {ctor: 'Regex'};
	var _elm_lang$core$Regex$AtMost = function (a) {
		return {ctor: 'AtMost', _0: a};
	};
	var _elm_lang$core$Regex$All = {ctor: 'All'};
	
	var _elm_lang$dom$Native_Dom = function() {
	
	var fakeNode = {
		addEventListener: function() {},
		removeEventListener: function() {}
	};
	
	var onDocument = on(typeof document !== 'undefined' ? document : fakeNode);
	var onWindow = on(typeof window !== 'undefined' ? window : fakeNode);
	
	function on(node)
	{
		return function(eventName, decoder, toTask)
		{
			return _elm_lang$core$Native_Scheduler.nativeBinding(function(callback) {
	
				function performTask(event)
				{
					var result = A2(_elm_lang$core$Json_Decode$decodeValue, decoder, event);
					if (result.ctor === 'Ok')
					{
						_elm_lang$core$Native_Scheduler.rawSpawn(toTask(result._0));
					}
				}
	
				node.addEventListener(eventName, performTask);
	
				return function()
				{
					node.removeEventListener(eventName, performTask);
				};
			});
		};
	}
	
	var rAF = typeof requestAnimationFrame !== 'undefined'
		? requestAnimationFrame
		: function(callback) { callback(); };
	
	function withNode(id, doStuff)
	{
		return _elm_lang$core$Native_Scheduler.nativeBinding(function(callback)
		{
			rAF(function()
			{
				var node = document.getElementById(id);
				if (node === null)
				{
					callback(_elm_lang$core$Native_Scheduler.fail({ ctor: 'NotFound', _0: id }));
					return;
				}
				callback(_elm_lang$core$Native_Scheduler.succeed(doStuff(node)));
			});
		});
	}
	
	
	// FOCUS
	
	function focus(id)
	{
		return withNode(id, function(node) {
			node.focus();
			return _elm_lang$core$Native_Utils.Tuple0;
		});
	}
	
	function blur(id)
	{
		return withNode(id, function(node) {
			node.blur();
			return _elm_lang$core$Native_Utils.Tuple0;
		});
	}
	
	
	// SCROLLING
	
	function getScrollTop(id)
	{
		return withNode(id, function(node) {
			return node.scrollTop;
		});
	}
	
	function setScrollTop(id, desiredScrollTop)
	{
		return withNode(id, function(node) {
			node.scrollTop = desiredScrollTop;
			return _elm_lang$core$Native_Utils.Tuple0;
		});
	}
	
	function toBottom(id)
	{
		return withNode(id, function(node) {
			node.scrollTop = node.scrollHeight;
			return _elm_lang$core$Native_Utils.Tuple0;
		});
	}
	
	function getScrollLeft(id)
	{
		return withNode(id, function(node) {
			return node.scrollLeft;
		});
	}
	
	function setScrollLeft(id, desiredScrollLeft)
	{
		return withNode(id, function(node) {
			node.scrollLeft = desiredScrollLeft;
			return _elm_lang$core$Native_Utils.Tuple0;
		});
	}
	
	function toRight(id)
	{
		return withNode(id, function(node) {
			node.scrollLeft = node.scrollWidth;
			return _elm_lang$core$Native_Utils.Tuple0;
		});
	}
	
	
	// SIZE
	
	function width(options, id)
	{
		return withNode(id, function(node) {
			switch (options.ctor)
			{
				case 'Content':
					return node.scrollWidth;
				case 'VisibleContent':
					return node.clientWidth;
				case 'VisibleContentWithBorders':
					return node.offsetWidth;
				case 'VisibleContentWithBordersAndMargins':
					var rect = node.getBoundingClientRect();
					return rect.right - rect.left;
			}
		});
	}
	
	function height(options, id)
	{
		return withNode(id, function(node) {
			switch (options.ctor)
			{
				case 'Content':
					return node.scrollHeight;
				case 'VisibleContent':
					return node.clientHeight;
				case 'VisibleContentWithBorders':
					return node.offsetHeight;
				case 'VisibleContentWithBordersAndMargins':
					var rect = node.getBoundingClientRect();
					return rect.bottom - rect.top;
			}
		});
	}
	
	return {
		onDocument: F3(onDocument),
		onWindow: F3(onWindow),
	
		focus: focus,
		blur: blur,
	
		getScrollTop: getScrollTop,
		setScrollTop: F2(setScrollTop),
		getScrollLeft: getScrollLeft,
		setScrollLeft: F2(setScrollLeft),
		toBottom: toBottom,
		toRight: toRight,
	
		height: F2(height),
		width: F2(width)
	};
	
	}();
	
	var _elm_lang$dom$Dom_LowLevel$onWindow = _elm_lang$dom$Native_Dom.onWindow;
	var _elm_lang$dom$Dom_LowLevel$onDocument = _elm_lang$dom$Native_Dom.onDocument;
	
	var _elm_lang$virtual_dom$VirtualDom_Debug$wrap;
	var _elm_lang$virtual_dom$VirtualDom_Debug$wrapWithFlags;
	
	var _elm_lang$virtual_dom$Native_VirtualDom = function() {
	
	var STYLE_KEY = 'STYLE';
	var EVENT_KEY = 'EVENT';
	var ATTR_KEY = 'ATTR';
	var ATTR_NS_KEY = 'ATTR_NS';
	
	var localDoc = typeof document !== 'undefined' ? document : {};
	
	
	////////////  VIRTUAL DOM NODES  ////////////
	
	
	function text(string)
	{
		return {
			type: 'text',
			text: string
		};
	}
	
	
	function node(tag)
	{
		return F2(function(factList, kidList) {
			return nodeHelp(tag, factList, kidList);
		});
	}
	
	
	function nodeHelp(tag, factList, kidList)
	{
		var organized = organizeFacts(factList);
		var namespace = organized.namespace;
		var facts = organized.facts;
	
		var children = [];
		var descendantsCount = 0;
		while (kidList.ctor !== '[]')
		{
			var kid = kidList._0;
			descendantsCount += (kid.descendantsCount || 0);
			children.push(kid);
			kidList = kidList._1;
		}
		descendantsCount += children.length;
	
		return {
			type: 'node',
			tag: tag,
			facts: facts,
			children: children,
			namespace: namespace,
			descendantsCount: descendantsCount
		};
	}
	
	
	function keyedNode(tag, factList, kidList)
	{
		var organized = organizeFacts(factList);
		var namespace = organized.namespace;
		var facts = organized.facts;
	
		var children = [];
		var descendantsCount = 0;
		while (kidList.ctor !== '[]')
		{
			var kid = kidList._0;
			descendantsCount += (kid._1.descendantsCount || 0);
			children.push(kid);
			kidList = kidList._1;
		}
		descendantsCount += children.length;
	
		return {
			type: 'keyed-node',
			tag: tag,
			facts: facts,
			children: children,
			namespace: namespace,
			descendantsCount: descendantsCount
		};
	}
	
	
	function custom(factList, model, impl)
	{
		var facts = organizeFacts(factList).facts;
	
		return {
			type: 'custom',
			facts: facts,
			model: model,
			impl: impl
		};
	}
	
	
	function map(tagger, node)
	{
		return {
			type: 'tagger',
			tagger: tagger,
			node: node,
			descendantsCount: 1 + (node.descendantsCount || 0)
		};
	}
	
	
	function thunk(func, args, thunk)
	{
		return {
			type: 'thunk',
			func: func,
			args: args,
			thunk: thunk,
			node: undefined
		};
	}
	
	function lazy(fn, a)
	{
		return thunk(fn, [a], function() {
			return fn(a);
		});
	}
	
	function lazy2(fn, a, b)
	{
		return thunk(fn, [a,b], function() {
			return A2(fn, a, b);
		});
	}
	
	function lazy3(fn, a, b, c)
	{
		return thunk(fn, [a,b,c], function() {
			return A3(fn, a, b, c);
		});
	}
	
	
	
	// FACTS
	
	
	function organizeFacts(factList)
	{
		var namespace, facts = {};
	
		while (factList.ctor !== '[]')
		{
			var entry = factList._0;
			var key = entry.key;
	
			if (key === ATTR_KEY || key === ATTR_NS_KEY || key === EVENT_KEY)
			{
				var subFacts = facts[key] || {};
				subFacts[entry.realKey] = entry.value;
				facts[key] = subFacts;
			}
			else if (key === STYLE_KEY)
			{
				var styles = facts[key] || {};
				var styleList = entry.value;
				while (styleList.ctor !== '[]')
				{
					var style = styleList._0;
					styles[style._0] = style._1;
					styleList = styleList._1;
				}
				facts[key] = styles;
			}
			else if (key === 'namespace')
			{
				namespace = entry.value;
			}
			else if (key === 'className')
			{
				var classes = facts[key];
				facts[key] = typeof classes === 'undefined'
					? entry.value
					: classes + ' ' + entry.value;
			}
	 		else
			{
				facts[key] = entry.value;
			}
			factList = factList._1;
		}
	
		return {
			facts: facts,
			namespace: namespace
		};
	}
	
	
	
	////////////  PROPERTIES AND ATTRIBUTES  ////////////
	
	
	function style(value)
	{
		return {
			key: STYLE_KEY,
			value: value
		};
	}
	
	
	function property(key, value)
	{
		return {
			key: key,
			value: value
		};
	}
	
	
	function attribute(key, value)
	{
		return {
			key: ATTR_KEY,
			realKey: key,
			value: value
		};
	}
	
	
	function attributeNS(namespace, key, value)
	{
		return {
			key: ATTR_NS_KEY,
			realKey: key,
			value: {
				value: value,
				namespace: namespace
			}
		};
	}
	
	
	function on(name, options, decoder)
	{
		return {
			key: EVENT_KEY,
			realKey: name,
			value: {
				options: options,
				decoder: decoder
			}
		};
	}
	
	
	function equalEvents(a, b)
	{
		if (!a.options === b.options)
		{
			if (a.stopPropagation !== b.stopPropagation || a.preventDefault !== b.preventDefault)
			{
				return false;
			}
		}
		return _elm_lang$core$Native_Json.equality(a.decoder, b.decoder);
	}
	
	
	function mapProperty(func, property)
	{
		if (property.key !== EVENT_KEY)
		{
			return property;
		}
		return on(
			property.realKey,
			property.value.options,
			A2(_elm_lang$core$Json_Decode$map, func, property.value.decoder)
		);
	}
	
	
	////////////  RENDER  ////////////
	
	
	function render(vNode, eventNode)
	{
		switch (vNode.type)
		{
			case 'thunk':
				if (!vNode.node)
				{
					vNode.node = vNode.thunk();
				}
				return render(vNode.node, eventNode);
	
			case 'tagger':
				var subNode = vNode.node;
				var tagger = vNode.tagger;
	
				while (subNode.type === 'tagger')
				{
					typeof tagger !== 'object'
						? tagger = [tagger, subNode.tagger]
						: tagger.push(subNode.tagger);
	
					subNode = subNode.node;
				}
	
				var subEventRoot = { tagger: tagger, parent: eventNode };
				var domNode = render(subNode, subEventRoot);
				domNode.elm_event_node_ref = subEventRoot;
				return domNode;
	
			case 'text':
				return localDoc.createTextNode(vNode.text);
	
			case 'node':
				var domNode = vNode.namespace
					? localDoc.createElementNS(vNode.namespace, vNode.tag)
					: localDoc.createElement(vNode.tag);
	
				applyFacts(domNode, eventNode, vNode.facts);
	
				var children = vNode.children;
	
				for (var i = 0; i < children.length; i++)
				{
					domNode.appendChild(render(children[i], eventNode));
				}
	
				return domNode;
	
			case 'keyed-node':
				var domNode = vNode.namespace
					? localDoc.createElementNS(vNode.namespace, vNode.tag)
					: localDoc.createElement(vNode.tag);
	
				applyFacts(domNode, eventNode, vNode.facts);
	
				var children = vNode.children;
	
				for (var i = 0; i < children.length; i++)
				{
					domNode.appendChild(render(children[i]._1, eventNode));
				}
	
				return domNode;
	
			case 'custom':
				var domNode = vNode.impl.render(vNode.model);
				applyFacts(domNode, eventNode, vNode.facts);
				return domNode;
		}
	}
	
	
	
	////////////  APPLY FACTS  ////////////
	
	
	function applyFacts(domNode, eventNode, facts)
	{
		for (var key in facts)
		{
			var value = facts[key];
	
			switch (key)
			{
				case STYLE_KEY:
					applyStyles(domNode, value);
					break;
	
				case EVENT_KEY:
					applyEvents(domNode, eventNode, value);
					break;
	
				case ATTR_KEY:
					applyAttrs(domNode, value);
					break;
	
				case ATTR_NS_KEY:
					applyAttrsNS(domNode, value);
					break;
	
				case 'value':
					if (domNode[key] !== value)
					{
						domNode[key] = value;
					}
					break;
	
				default:
					domNode[key] = value;
					break;
			}
		}
	}
	
	function applyStyles(domNode, styles)
	{
		var domNodeStyle = domNode.style;
	
		for (var key in styles)
		{
			domNodeStyle[key] = styles[key];
		}
	}
	
	function applyEvents(domNode, eventNode, events)
	{
		var allHandlers = domNode.elm_handlers || {};
	
		for (var key in events)
		{
			var handler = allHandlers[key];
			var value = events[key];
	
			if (typeof value === 'undefined')
			{
				domNode.removeEventListener(key, handler);
				allHandlers[key] = undefined;
			}
			else if (typeof handler === 'undefined')
			{
				var handler = makeEventHandler(eventNode, value);
				domNode.addEventListener(key, handler);
				allHandlers[key] = handler;
			}
			else
			{
				handler.info = value;
			}
		}
	
		domNode.elm_handlers = allHandlers;
	}
	
	function makeEventHandler(eventNode, info)
	{
		function eventHandler(event)
		{
			var info = eventHandler.info;
	
			var value = A2(_elm_lang$core$Native_Json.run, info.decoder, event);
	
			if (value.ctor === 'Ok')
			{
				var options = info.options;
				if (options.stopPropagation)
				{
					event.stopPropagation();
				}
				if (options.preventDefault)
				{
					event.preventDefault();
				}
	
				var message = value._0;
	
				var currentEventNode = eventNode;
				while (currentEventNode)
				{
					var tagger = currentEventNode.tagger;
					if (typeof tagger === 'function')
					{
						message = tagger(message);
					}
					else
					{
						for (var i = tagger.length; i--; )
						{
							message = tagger[i](message);
						}
					}
					currentEventNode = currentEventNode.parent;
				}
			}
		};
	
		eventHandler.info = info;
	
		return eventHandler;
	}
	
	function applyAttrs(domNode, attrs)
	{
		for (var key in attrs)
		{
			var value = attrs[key];
			if (typeof value === 'undefined')
			{
				domNode.removeAttribute(key);
			}
			else
			{
				domNode.setAttribute(key, value);
			}
		}
	}
	
	function applyAttrsNS(domNode, nsAttrs)
	{
		for (var key in nsAttrs)
		{
			var pair = nsAttrs[key];
			var namespace = pair.namespace;
			var value = pair.value;
	
			if (typeof value === 'undefined')
			{
				domNode.removeAttributeNS(namespace, key);
			}
			else
			{
				domNode.setAttributeNS(namespace, key, value);
			}
		}
	}
	
	
	
	////////////  DIFF  ////////////
	
	
	function diff(a, b)
	{
		var patches = [];
		diffHelp(a, b, patches, 0);
		return patches;
	}
	
	
	function makePatch(type, index, data)
	{
		return {
			index: index,
			type: type,
			data: data,
			domNode: undefined,
			eventNode: undefined
		};
	}
	
	
	function diffHelp(a, b, patches, index)
	{
		if (a === b)
		{
			return;
		}
	
		var aType = a.type;
		var bType = b.type;
	
		// Bail if you run into different types of nodes. Implies that the
		// structure has changed significantly and it's not worth a diff.
		if (aType !== bType)
		{
			patches.push(makePatch('p-redraw', index, b));
			return;
		}
	
		// Now we know that both nodes are the same type.
		switch (bType)
		{
			case 'thunk':
				var aArgs = a.args;
				var bArgs = b.args;
				var i = aArgs.length;
				var same = a.func === b.func && i === bArgs.length;
				while (same && i--)
				{
					same = aArgs[i] === bArgs[i];
				}
				if (same)
				{
					b.node = a.node;
					return;
				}
				b.node = b.thunk();
				var subPatches = [];
				diffHelp(a.node, b.node, subPatches, 0);
				if (subPatches.length > 0)
				{
					patches.push(makePatch('p-thunk', index, subPatches));
				}
				return;
	
			case 'tagger':
				// gather nested taggers
				var aTaggers = a.tagger;
				var bTaggers = b.tagger;
				var nesting = false;
	
				var aSubNode = a.node;
				while (aSubNode.type === 'tagger')
				{
					nesting = true;
	
					typeof aTaggers !== 'object'
						? aTaggers = [aTaggers, aSubNode.tagger]
						: aTaggers.push(aSubNode.tagger);
	
					aSubNode = aSubNode.node;
				}
	
				var bSubNode = b.node;
				while (bSubNode.type === 'tagger')
				{
					nesting = true;
	
					typeof bTaggers !== 'object'
						? bTaggers = [bTaggers, bSubNode.tagger]
						: bTaggers.push(bSubNode.tagger);
	
					bSubNode = bSubNode.node;
				}
	
				// Just bail if different numbers of taggers. This implies the
				// structure of the virtual DOM has changed.
				if (nesting && aTaggers.length !== bTaggers.length)
				{
					patches.push(makePatch('p-redraw', index, b));
					return;
				}
	
				// check if taggers are "the same"
				if (nesting ? !pairwiseRefEqual(aTaggers, bTaggers) : aTaggers !== bTaggers)
				{
					patches.push(makePatch('p-tagger', index, bTaggers));
				}
	
				// diff everything below the taggers
				diffHelp(aSubNode, bSubNode, patches, index + 1);
				return;
	
			case 'text':
				if (a.text !== b.text)
				{
					patches.push(makePatch('p-text', index, b.text));
					return;
				}
	
				return;
	
			case 'node':
				// Bail if obvious indicators have changed. Implies more serious
				// structural changes such that it's not worth it to diff.
				if (a.tag !== b.tag || a.namespace !== b.namespace)
				{
					patches.push(makePatch('p-redraw', index, b));
					return;
				}
	
				var factsDiff = diffFacts(a.facts, b.facts);
	
				if (typeof factsDiff !== 'undefined')
				{
					patches.push(makePatch('p-facts', index, factsDiff));
				}
	
				diffChildren(a, b, patches, index);
				return;
	
			case 'keyed-node':
				// Bail if obvious indicators have changed. Implies more serious
				// structural changes such that it's not worth it to diff.
				if (a.tag !== b.tag || a.namespace !== b.namespace)
				{
					patches.push(makePatch('p-redraw', index, b));
					return;
				}
	
				var factsDiff = diffFacts(a.facts, b.facts);
	
				if (typeof factsDiff !== 'undefined')
				{
					patches.push(makePatch('p-facts', index, factsDiff));
				}
	
				diffKeyedChildren(a, b, patches, index);
				return;
	
			case 'custom':
				if (a.impl !== b.impl)
				{
					patches.push(makePatch('p-redraw', index, b));
					return;
				}
	
				var factsDiff = diffFacts(a.facts, b.facts);
				if (typeof factsDiff !== 'undefined')
				{
					patches.push(makePatch('p-facts', index, factsDiff));
				}
	
				var patch = b.impl.diff(a,b);
				if (patch)
				{
					patches.push(makePatch('p-custom', index, patch));
					return;
				}
	
				return;
		}
	}
	
	
	// assumes the incoming arrays are the same length
	function pairwiseRefEqual(as, bs)
	{
		for (var i = 0; i < as.length; i++)
		{
			if (as[i] !== bs[i])
			{
				return false;
			}
		}
	
		return true;
	}
	
	
	// TODO Instead of creating a new diff object, it's possible to just test if
	// there *is* a diff. During the actual patch, do the diff again and make the
	// modifications directly. This way, there's no new allocations. Worth it?
	function diffFacts(a, b, category)
	{
		var diff;
	
		// look for changes and removals
		for (var aKey in a)
		{
			if (aKey === STYLE_KEY || aKey === EVENT_KEY || aKey === ATTR_KEY || aKey === ATTR_NS_KEY)
			{
				var subDiff = diffFacts(a[aKey], b[aKey] || {}, aKey);
				if (subDiff)
				{
					diff = diff || {};
					diff[aKey] = subDiff;
				}
				continue;
			}
	
			// remove if not in the new facts
			if (!(aKey in b))
			{
				diff = diff || {};
				diff[aKey] =
					(typeof category === 'undefined')
						? (typeof a[aKey] === 'string' ? '' : null)
						:
					(category === STYLE_KEY)
						? ''
						:
					(category === EVENT_KEY || category === ATTR_KEY)
						? undefined
						:
					{ namespace: a[aKey].namespace, value: undefined };
	
				continue;
			}
	
			var aValue = a[aKey];
			var bValue = b[aKey];
	
			// reference equal, so don't worry about it
			if (aValue === bValue && aKey !== 'value'
				|| category === EVENT_KEY && equalEvents(aValue, bValue))
			{
				continue;
			}
	
			diff = diff || {};
			diff[aKey] = bValue;
		}
	
		// add new stuff
		for (var bKey in b)
		{
			if (!(bKey in a))
			{
				diff = diff || {};
				diff[bKey] = b[bKey];
			}
		}
	
		return diff;
	}
	
	
	function diffChildren(aParent, bParent, patches, rootIndex)
	{
		var aChildren = aParent.children;
		var bChildren = bParent.children;
	
		var aLen = aChildren.length;
		var bLen = bChildren.length;
	
		// FIGURE OUT IF THERE ARE INSERTS OR REMOVALS
	
		if (aLen > bLen)
		{
			patches.push(makePatch('p-remove-last', rootIndex, aLen - bLen));
		}
		else if (aLen < bLen)
		{
			patches.push(makePatch('p-append', rootIndex, bChildren.slice(aLen)));
		}
	
		// PAIRWISE DIFF EVERYTHING ELSE
	
		var index = rootIndex;
		var minLen = aLen < bLen ? aLen : bLen;
		for (var i = 0; i < minLen; i++)
		{
			index++;
			var aChild = aChildren[i];
			diffHelp(aChild, bChildren[i], patches, index);
			index += aChild.descendantsCount || 0;
		}
	}
	
	
	
	////////////  KEYED DIFF  ////////////
	
	
	function diffKeyedChildren(aParent, bParent, patches, rootIndex)
	{
		var localPatches = [];
	
		var changes = {}; // Dict String Entry
		var inserts = []; // Array { index : Int, entry : Entry }
		// type Entry = { tag : String, vnode : VNode, index : Int, data : _ }
	
		var aChildren = aParent.children;
		var bChildren = bParent.children;
		var aLen = aChildren.length;
		var bLen = bChildren.length;
		var aIndex = 0;
		var bIndex = 0;
	
		var index = rootIndex;
	
		while (aIndex < aLen && bIndex < bLen)
		{
			var a = aChildren[aIndex];
			var b = bChildren[bIndex];
	
			var aKey = a._0;
			var bKey = b._0;
			var aNode = a._1;
			var bNode = b._1;
	
			// check if keys match
	
			if (aKey === bKey)
			{
				index++;
				diffHelp(aNode, bNode, localPatches, index);
				index += aNode.descendantsCount || 0;
	
				aIndex++;
				bIndex++;
				continue;
			}
	
			// look ahead 1 to detect insertions and removals.
	
			var aLookAhead = aIndex + 1 < aLen;
			var bLookAhead = bIndex + 1 < bLen;
	
			if (aLookAhead)
			{
				var aNext = aChildren[aIndex + 1];
				var aNextKey = aNext._0;
				var aNextNode = aNext._1;
				var oldMatch = bKey === aNextKey;
			}
	
			if (bLookAhead)
			{
				var bNext = bChildren[bIndex + 1];
				var bNextKey = bNext._0;
				var bNextNode = bNext._1;
				var newMatch = aKey === bNextKey;
			}
	
	
			// swap a and b
			if (aLookAhead && bLookAhead && newMatch && oldMatch)
			{
				index++;
				diffHelp(aNode, bNextNode, localPatches, index);
				insertNode(changes, localPatches, aKey, bNode, bIndex, inserts);
				index += aNode.descendantsCount || 0;
	
				index++;
				removeNode(changes, localPatches, aKey, aNextNode, index);
				index += aNextNode.descendantsCount || 0;
	
				aIndex += 2;
				bIndex += 2;
				continue;
			}
	
			// insert b
			if (bLookAhead && newMatch)
			{
				index++;
				insertNode(changes, localPatches, bKey, bNode, bIndex, inserts);
				diffHelp(aNode, bNextNode, localPatches, index);
				index += aNode.descendantsCount || 0;
	
				aIndex += 1;
				bIndex += 2;
				continue;
			}
	
			// remove a
			if (aLookAhead && oldMatch)
			{
				index++;
				removeNode(changes, localPatches, aKey, aNode, index);
				index += aNode.descendantsCount || 0;
	
				index++;
				diffHelp(aNextNode, bNode, localPatches, index);
				index += aNextNode.descendantsCount || 0;
	
				aIndex += 2;
				bIndex += 1;
				continue;
			}
	
			// remove a, insert b
			if (aLookAhead && bLookAhead && aNextKey === bNextKey)
			{
				index++;
				removeNode(changes, localPatches, aKey, aNode, index);
				insertNode(changes, localPatches, bKey, bNode, bIndex, inserts);
				index += aNode.descendantsCount || 0;
	
				index++;
				diffHelp(aNextNode, bNextNode, localPatches, index);
				index += aNextNode.descendantsCount || 0;
	
				aIndex += 2;
				bIndex += 2;
				continue;
			}
	
			break;
		}
	
		// eat up any remaining nodes with removeNode and insertNode
	
		while (aIndex < aLen)
		{
			index++;
			var a = aChildren[aIndex];
			var aNode = a._1;
			removeNode(changes, localPatches, a._0, aNode, index);
			index += aNode.descendantsCount || 0;
			aIndex++;
		}
	
		var endInserts;
		while (bIndex < bLen)
		{
			endInserts = endInserts || [];
			var b = bChildren[bIndex];
			insertNode(changes, localPatches, b._0, b._1, undefined, endInserts);
			bIndex++;
		}
	
		if (localPatches.length > 0 || inserts.length > 0 || typeof endInserts !== 'undefined')
		{
			patches.push(makePatch('p-reorder', rootIndex, {
				patches: localPatches,
				inserts: inserts,
				endInserts: endInserts
			}));
		}
	}
	
	
	
	////////////  CHANGES FROM KEYED DIFF  ////////////
	
	
	var POSTFIX = '_elmW6BL';
	
	
	function insertNode(changes, localPatches, key, vnode, bIndex, inserts)
	{
		var entry = changes[key];
	
		// never seen this key before
		if (typeof entry === 'undefined')
		{
			entry = {
				tag: 'insert',
				vnode: vnode,
				index: bIndex,
				data: undefined
			};
	
			inserts.push({ index: bIndex, entry: entry });
			changes[key] = entry;
	
			return;
		}
	
		// this key was removed earlier, a match!
		if (entry.tag === 'remove')
		{
			inserts.push({ index: bIndex, entry: entry });
	
			entry.tag = 'move';
			var subPatches = [];
			diffHelp(entry.vnode, vnode, subPatches, entry.index);
			entry.index = bIndex;
			entry.data.data = {
				patches: subPatches,
				entry: entry
			};
	
			return;
		}
	
		// this key has already been inserted or moved, a duplicate!
		insertNode(changes, localPatches, key + POSTFIX, vnode, bIndex, inserts);
	}
	
	
	function removeNode(changes, localPatches, key, vnode, index)
	{
		var entry = changes[key];
	
		// never seen this key before
		if (typeof entry === 'undefined')
		{
			var patch = makePatch('p-remove', index, undefined);
			localPatches.push(patch);
	
			changes[key] = {
				tag: 'remove',
				vnode: vnode,
				index: index,
				data: patch
			};
	
			return;
		}
	
		// this key was inserted earlier, a match!
		if (entry.tag === 'insert')
		{
			entry.tag = 'move';
			var subPatches = [];
			diffHelp(vnode, entry.vnode, subPatches, index);
	
			var patch = makePatch('p-remove', index, {
				patches: subPatches,
				entry: entry
			});
			localPatches.push(patch);
	
			return;
		}
	
		// this key has already been removed or moved, a duplicate!
		removeNode(changes, localPatches, key + POSTFIX, vnode, index);
	}
	
	
	
	////////////  ADD DOM NODES  ////////////
	//
	// Each DOM node has an "index" assigned in order of traversal. It is important
	// to minimize our crawl over the actual DOM, so these indexes (along with the
	// descendantsCount of virtual nodes) let us skip touching entire subtrees of
	// the DOM if we know there are no patches there.
	
	
	function addDomNodes(domNode, vNode, patches, eventNode)
	{
		addDomNodesHelp(domNode, vNode, patches, 0, 0, vNode.descendantsCount, eventNode);
	}
	
	
	// assumes `patches` is non-empty and indexes increase monotonically.
	function addDomNodesHelp(domNode, vNode, patches, i, low, high, eventNode)
	{
		var patch = patches[i];
		var index = patch.index;
	
		while (index === low)
		{
			var patchType = patch.type;
	
			if (patchType === 'p-thunk')
			{
				addDomNodes(domNode, vNode.node, patch.data, eventNode);
			}
			else if (patchType === 'p-reorder')
			{
				patch.domNode = domNode;
				patch.eventNode = eventNode;
	
				var subPatches = patch.data.patches;
				if (subPatches.length > 0)
				{
					addDomNodesHelp(domNode, vNode, subPatches, 0, low, high, eventNode);
				}
			}
			else if (patchType === 'p-remove')
			{
				patch.domNode = domNode;
				patch.eventNode = eventNode;
	
				var data = patch.data;
				if (typeof data !== 'undefined')
				{
					data.entry.data = domNode;
					var subPatches = data.patches;
					if (subPatches.length > 0)
					{
						addDomNodesHelp(domNode, vNode, subPatches, 0, low, high, eventNode);
					}
				}
			}
			else
			{
				patch.domNode = domNode;
				patch.eventNode = eventNode;
			}
	
			i++;
	
			if (!(patch = patches[i]) || (index = patch.index) > high)
			{
				return i;
			}
		}
	
		switch (vNode.type)
		{
			case 'tagger':
				var subNode = vNode.node;
	
				while (subNode.type === "tagger")
				{
					subNode = subNode.node;
				}
	
				return addDomNodesHelp(domNode, subNode, patches, i, low + 1, high, domNode.elm_event_node_ref);
	
			case 'node':
				var vChildren = vNode.children;
				var childNodes = domNode.childNodes;
				for (var j = 0; j < vChildren.length; j++)
				{
					low++;
					var vChild = vChildren[j];
					var nextLow = low + (vChild.descendantsCount || 0);
					if (low <= index && index <= nextLow)
					{
						i = addDomNodesHelp(childNodes[j], vChild, patches, i, low, nextLow, eventNode);
						if (!(patch = patches[i]) || (index = patch.index) > high)
						{
							return i;
						}
					}
					low = nextLow;
				}
				return i;
	
			case 'keyed-node':
				var vChildren = vNode.children;
				var childNodes = domNode.childNodes;
				for (var j = 0; j < vChildren.length; j++)
				{
					low++;
					var vChild = vChildren[j]._1;
					var nextLow = low + (vChild.descendantsCount || 0);
					if (low <= index && index <= nextLow)
					{
						i = addDomNodesHelp(childNodes[j], vChild, patches, i, low, nextLow, eventNode);
						if (!(patch = patches[i]) || (index = patch.index) > high)
						{
							return i;
						}
					}
					low = nextLow;
				}
				return i;
	
			case 'text':
			case 'thunk':
				throw new Error('should never traverse `text` or `thunk` nodes like this');
		}
	}
	
	
	
	////////////  APPLY PATCHES  ////////////
	
	
	function applyPatches(rootDomNode, oldVirtualNode, patches, eventNode)
	{
		if (patches.length === 0)
		{
			return rootDomNode;
		}
	
		addDomNodes(rootDomNode, oldVirtualNode, patches, eventNode);
		return applyPatchesHelp(rootDomNode, patches);
	}
	
	function applyPatchesHelp(rootDomNode, patches)
	{
		for (var i = 0; i < patches.length; i++)
		{
			var patch = patches[i];
			var localDomNode = patch.domNode
			var newNode = applyPatch(localDomNode, patch);
			if (localDomNode === rootDomNode)
			{
				rootDomNode = newNode;
			}
		}
		return rootDomNode;
	}
	
	function applyPatch(domNode, patch)
	{
		switch (patch.type)
		{
			case 'p-redraw':
				return applyPatchRedraw(domNode, patch.data, patch.eventNode);
	
			case 'p-facts':
				applyFacts(domNode, patch.eventNode, patch.data);
				return domNode;
	
			case 'p-text':
				domNode.replaceData(0, domNode.length, patch.data);
				return domNode;
	
			case 'p-thunk':
				return applyPatchesHelp(domNode, patch.data);
	
			case 'p-tagger':
				if (typeof domNode.elm_event_node_ref !== 'undefined')
				{
					domNode.elm_event_node_ref.tagger = patch.data;
				}
				else
				{
					domNode.elm_event_node_ref = { tagger: patch.data, parent: patch.eventNode };
				}
				return domNode;
	
			case 'p-remove-last':
				var i = patch.data;
				while (i--)
				{
					domNode.removeChild(domNode.lastChild);
				}
				return domNode;
	
			case 'p-append':
				var newNodes = patch.data;
				for (var i = 0; i < newNodes.length; i++)
				{
					domNode.appendChild(render(newNodes[i], patch.eventNode));
				}
				return domNode;
	
			case 'p-remove':
				var data = patch.data;
				if (typeof data === 'undefined')
				{
					domNode.parentNode.removeChild(domNode);
					return domNode;
				}
				var entry = data.entry;
				if (typeof entry.index !== 'undefined')
				{
					domNode.parentNode.removeChild(domNode);
				}
				entry.data = applyPatchesHelp(domNode, data.patches);
				return domNode;
	
			case 'p-reorder':
				return applyPatchReorder(domNode, patch);
	
			case 'p-custom':
				var impl = patch.data;
				return impl.applyPatch(domNode, impl.data);
	
			default:
				throw new Error('Ran into an unknown patch!');
		}
	}
	
	
	function applyPatchRedraw(domNode, vNode, eventNode)
	{
		var parentNode = domNode.parentNode;
		var newNode = render(vNode, eventNode);
	
		if (typeof newNode.elm_event_node_ref === 'undefined')
		{
			newNode.elm_event_node_ref = domNode.elm_event_node_ref;
		}
	
		if (parentNode && newNode !== domNode)
		{
			parentNode.replaceChild(newNode, domNode);
		}
		return newNode;
	}
	
	
	function applyPatchReorder(domNode, patch)
	{
		var data = patch.data;
	
		// remove end inserts
		var frag = applyPatchReorderEndInsertsHelp(data.endInserts, patch);
	
		// removals
		domNode = applyPatchesHelp(domNode, data.patches);
	
		// inserts
		var inserts = data.inserts;
		for (var i = 0; i < inserts.length; i++)
		{
			var insert = inserts[i];
			var entry = insert.entry;
			var node = entry.tag === 'move'
				? entry.data
				: render(entry.vnode, patch.eventNode);
			domNode.insertBefore(node, domNode.childNodes[insert.index]);
		}
	
		// add end inserts
		if (typeof frag !== 'undefined')
		{
			domNode.appendChild(frag);
		}
	
		return domNode;
	}
	
	
	function applyPatchReorderEndInsertsHelp(endInserts, patch)
	{
		if (typeof endInserts === 'undefined')
		{
			return;
		}
	
		var frag = localDoc.createDocumentFragment();
		for (var i = 0; i < endInserts.length; i++)
		{
			var insert = endInserts[i];
			var entry = insert.entry;
			frag.appendChild(entry.tag === 'move'
				? entry.data
				: render(entry.vnode, patch.eventNode)
			);
		}
		return frag;
	}
	
	
	// PROGRAMS
	
	var program = makeProgram(checkNoFlags);
	var programWithFlags = makeProgram(checkYesFlags);
	
	function makeProgram(flagChecker)
	{
		return F2(function(debugWrap, impl)
		{
			return function(flagDecoder)
			{
				return function(object, moduleName, debugMetadata)
				{
					var checker = flagChecker(flagDecoder, moduleName);
					if (typeof debugMetadata === 'undefined')
					{
						normalSetup(impl, object, moduleName, checker);
					}
					else
					{
						debugSetup(A2(debugWrap, debugMetadata, impl), object, moduleName, checker);
					}
				};
			};
		});
	}
	
	function staticProgram(vNode)
	{
		var nothing = _elm_lang$core$Native_Utils.Tuple2(
			_elm_lang$core$Native_Utils.Tuple0,
			_elm_lang$core$Platform_Cmd$none
		);
		return A2(program, _elm_lang$virtual_dom$VirtualDom_Debug$wrap, {
			init: nothing,
			view: function() { return vNode; },
			update: F2(function() { return nothing; }),
			subscriptions: function() { return _elm_lang$core$Platform_Sub$none; }
		})();
	}
	
	
	// FLAG CHECKERS
	
	function checkNoFlags(flagDecoder, moduleName)
	{
		return function(init, flags, domNode)
		{
			if (typeof flags === 'undefined')
			{
				return init;
			}
	
			var errorMessage =
				'The `' + moduleName + '` module does not need flags.\n'
				+ 'Initialize it with no arguments and you should be all set!';
	
			crash(errorMessage, domNode);
		};
	}
	
	function checkYesFlags(flagDecoder, moduleName)
	{
		return function(init, flags, domNode)
		{
			if (typeof flagDecoder === 'undefined')
			{
				var errorMessage =
					'Are you trying to sneak a Never value into Elm? Trickster!\n'
					+ 'It looks like ' + moduleName + '.main is defined with `programWithFlags` but has type `Program Never`.\n'
					+ 'Use `program` instead if you do not want flags.'
	
				crash(errorMessage, domNode);
			}
	
			var result = A2(_elm_lang$core$Native_Json.run, flagDecoder, flags);
			if (result.ctor === 'Ok')
			{
				return init(result._0);
			}
	
			var errorMessage =
				'Trying to initialize the `' + moduleName + '` module with an unexpected flag.\n'
				+ 'I tried to convert it to an Elm value, but ran into this problem:\n\n'
				+ result._0;
	
			crash(errorMessage, domNode);
		};
	}
	
	function crash(errorMessage, domNode)
	{
		if (domNode)
		{
			domNode.innerHTML =
				'<div style="padding-left:1em;">'
				+ '<h2 style="font-weight:normal;"><b>Oops!</b> Something went wrong when starting your Elm program.</h2>'
				+ '<pre style="padding-left:1em;">' + errorMessage + '</pre>'
				+ '</div>';
		}
	
		throw new Error(errorMessage);
	}
	
	
	//  NORMAL SETUP
	
	function normalSetup(impl, object, moduleName, flagChecker)
	{
		object['embed'] = function embed(node, flags)
		{
			while (node.lastChild)
			{
				node.removeChild(node.lastChild);
			}
	
			return _elm_lang$core$Native_Platform.initialize(
				flagChecker(impl.init, flags, node),
				impl.update,
				impl.subscriptions,
				normalRenderer(node, impl.view)
			);
		};
	
		object['fullscreen'] = function fullscreen(flags)
		{
			return _elm_lang$core$Native_Platform.initialize(
				flagChecker(impl.init, flags, document.body),
				impl.update,
				impl.subscriptions,
				normalRenderer(document.body, impl.view)
			);
		};
	}
	
	function normalRenderer(parentNode, view)
	{
		return function(tagger, initialModel)
		{
			var eventNode = { tagger: tagger, parent: undefined };
			var initialVirtualNode = view(initialModel);
			var domNode = render(initialVirtualNode, eventNode);
			parentNode.appendChild(domNode);
			return makeStepper(domNode, view, initialVirtualNode, eventNode);
		};
	}
	
	
	// STEPPER
	
	var rAF =
		typeof requestAnimationFrame !== 'undefined'
			? requestAnimationFrame
			: function(callback) { callback(); };
	
	function makeStepper(domNode, view, initialVirtualNode, eventNode)
	{
		var state = 'NO_REQUEST';
		var currNode = initialVirtualNode;
		var nextModel;
	
		function updateIfNeeded()
		{
			switch (state)
			{
				case 'NO_REQUEST':
					throw new Error(
						'Unexpected draw callback.\n' +
						'Please report this to <https://github.com/elm-lang/virtual-dom/issues>.'
					);
	
				case 'PENDING_REQUEST':
					rAF(updateIfNeeded);
					state = 'EXTRA_REQUEST';
	
					var nextNode = view(nextModel);
					var patches = diff(currNode, nextNode);
					domNode = applyPatches(domNode, currNode, patches, eventNode);
					currNode = nextNode;
	
					return;
	
				case 'EXTRA_REQUEST':
					state = 'NO_REQUEST';
					return;
			}
		}
	
		return function stepper(model)
		{
			if (state === 'NO_REQUEST')
			{
				rAF(updateIfNeeded);
			}
			state = 'PENDING_REQUEST';
			nextModel = model;
		};
	}
	
	
	// DEBUG SETUP
	
	function debugSetup(impl, object, moduleName, flagChecker)
	{
		object['fullscreen'] = function fullscreen(flags)
		{
			var popoutRef = { doc: undefined };
			return _elm_lang$core$Native_Platform.initialize(
				flagChecker(impl.init, flags, document.body),
				impl.update(scrollTask(popoutRef)),
				impl.subscriptions,
				debugRenderer(moduleName, document.body, popoutRef, impl.view, impl.viewIn, impl.viewOut)
			);
		};
	
		object['embed'] = function fullscreen(node, flags)
		{
			var popoutRef = { doc: undefined };
			return _elm_lang$core$Native_Platform.initialize(
				flagChecker(impl.init, flags, node),
				impl.update(scrollTask(popoutRef)),
				impl.subscriptions,
				debugRenderer(moduleName, node, popoutRef, impl.view, impl.viewIn, impl.viewOut)
			);
		};
	}
	
	function scrollTask(popoutRef)
	{
		return _elm_lang$core$Native_Scheduler.nativeBinding(function(callback)
		{
			var doc = popoutRef.doc;
			if (doc)
			{
				var msgs = doc.getElementsByClassName('debugger-sidebar-messages')[0];
				if (msgs)
				{
					msgs.scrollTop = msgs.scrollHeight;
				}
			}
			callback(_elm_lang$core$Native_Scheduler.succeed(_elm_lang$core$Native_Utils.Tuple0));
		});
	}
	
	
	function debugRenderer(moduleName, parentNode, popoutRef, view, viewIn, viewOut)
	{
		return function(tagger, initialModel)
		{
			var appEventNode = { tagger: tagger, parent: undefined };
			var eventNode = { tagger: tagger, parent: undefined };
	
			// make normal stepper
			var appVirtualNode = view(initialModel);
			var appNode = render(appVirtualNode, appEventNode);
			parentNode.appendChild(appNode);
			var appStepper = makeStepper(appNode, view, appVirtualNode, appEventNode);
	
			// make overlay stepper
			var overVirtualNode = viewIn(initialModel)._1;
			var overNode = render(overVirtualNode, eventNode);
			parentNode.appendChild(overNode);
			var wrappedViewIn = wrapViewIn(appEventNode, overNode, viewIn);
			var overStepper = makeStepper(overNode, wrappedViewIn, overVirtualNode, eventNode);
	
			// make debugger stepper
			var debugStepper = makeDebugStepper(initialModel, viewOut, eventNode, parentNode, moduleName, popoutRef);
	
			return function stepper(model)
			{
				appStepper(model);
				overStepper(model);
				debugStepper(model);
			}
		};
	}
	
	function makeDebugStepper(initialModel, view, eventNode, parentNode, moduleName, popoutRef)
	{
		var curr;
		var domNode;
	
		return function stepper(model)
		{
			if (!model.isDebuggerOpen)
			{
				return;
			}
	
			if (!popoutRef.doc)
			{
				curr = view(model);
				domNode = openDebugWindow(moduleName, popoutRef, curr, eventNode);
				return;
			}
	
			// switch to document of popout
			localDoc = popoutRef.doc;
	
			var next = view(model);
			var patches = diff(curr, next);
			domNode = applyPatches(domNode, curr, patches, eventNode);
			curr = next;
	
			// switch back to normal document
			localDoc = document;
		};
	}
	
	function openDebugWindow(moduleName, popoutRef, virtualNode, eventNode)
	{
		var w = 900;
		var h = 360;
		var x = screen.width - w;
		var y = screen.height - h;
		var debugWindow = window.open('', '', 'width=' + w + ',height=' + h + ',left=' + x + ',top=' + y);
	
		// switch to window document
		localDoc = debugWindow.document;
	
		popoutRef.doc = localDoc;
		localDoc.title = 'Debugger - ' + moduleName;
		localDoc.body.style.margin = '0';
		localDoc.body.style.padding = '0';
		var domNode = render(virtualNode, eventNode);
		localDoc.body.appendChild(domNode);
	
		localDoc.addEventListener('keydown', function(event) {
			if (event.metaKey && event.which === 82)
			{
				window.location.reload();
			}
			if (event.which === 38)
			{
				eventNode.tagger({ ctor: 'Up' });
				event.preventDefault();
			}
			if (event.which === 40)
			{
				eventNode.tagger({ ctor: 'Down' });
				event.preventDefault();
			}
		});
	
		function close()
		{
			popoutRef.doc = undefined;
			debugWindow.close();
		}
		window.addEventListener('unload', close);
		debugWindow.addEventListener('unload', function() {
			popoutRef.doc = undefined;
			window.removeEventListener('unload', close);
			eventNode.tagger({ ctor: 'Close' });
		});
	
		// switch back to the normal document
		localDoc = document;
	
		return domNode;
	}
	
	
	// BLOCK EVENTS
	
	function wrapViewIn(appEventNode, overlayNode, viewIn)
	{
		var ignorer = makeIgnorer(overlayNode);
		var blocking = 'Normal';
		var overflow;
	
		var normalTagger = appEventNode.tagger;
		var blockTagger = function() {};
	
		return function(model)
		{
			var tuple = viewIn(model);
			var newBlocking = tuple._0.ctor;
			appEventNode.tagger = newBlocking === 'Normal' ? normalTagger : blockTagger;
			if (blocking !== newBlocking)
			{
				traverse('removeEventListener', ignorer, blocking);
				traverse('addEventListener', ignorer, newBlocking);
	
				if (blocking === 'Normal')
				{
					overflow = document.body.style.overflow;
					document.body.style.overflow = 'hidden';
				}
	
				if (newBlocking === 'Normal')
				{
					document.body.style.overflow = overflow;
				}
	
				blocking = newBlocking;
			}
			return tuple._1;
		}
	}
	
	function traverse(verbEventListener, ignorer, blocking)
	{
		switch(blocking)
		{
			case 'Normal':
				return;
	
			case 'Pause':
				return traverseHelp(verbEventListener, ignorer, mostEvents);
	
			case 'Message':
				return traverseHelp(verbEventListener, ignorer, allEvents);
		}
	}
	
	function traverseHelp(verbEventListener, handler, eventNames)
	{
		for (var i = 0; i < eventNames.length; i++)
		{
			document.body[verbEventListener](eventNames[i], handler, true);
		}
	}
	
	function makeIgnorer(overlayNode)
	{
		return function(event)
		{
			if (event.type === 'keydown' && event.metaKey && event.which === 82)
			{
				return;
			}
	
			var isScroll = event.type === 'scroll' || event.type === 'wheel';
	
			var node = event.target;
			while (node !== null)
			{
				if (node.className === 'elm-overlay-message-details' && isScroll)
				{
					return;
				}
	
				if (node === overlayNode && !isScroll)
				{
					return;
				}
				node = node.parentNode;
			}
	
			event.stopPropagation();
			event.preventDefault();
		}
	}
	
	var mostEvents = [
		'click', 'dblclick', 'mousemove',
		'mouseup', 'mousedown', 'mouseenter', 'mouseleave',
		'touchstart', 'touchend', 'touchcancel', 'touchmove',
		'pointerdown', 'pointerup', 'pointerover', 'pointerout',
		'pointerenter', 'pointerleave', 'pointermove', 'pointercancel',
		'dragstart', 'drag', 'dragend', 'dragenter', 'dragover', 'dragleave', 'drop',
		'keyup', 'keydown', 'keypress',
		'input', 'change',
		'focus', 'blur'
	];
	
	var allEvents = mostEvents.concat('wheel', 'scroll');
	
	
	return {
		node: node,
		text: text,
		custom: custom,
		map: F2(map),
	
		on: F3(on),
		style: style,
		property: F2(property),
		attribute: F2(attribute),
		attributeNS: F3(attributeNS),
		mapProperty: F2(mapProperty),
	
		lazy: F2(lazy),
		lazy2: F3(lazy2),
		lazy3: F4(lazy3),
		keyedNode: F3(keyedNode),
	
		program: program,
		programWithFlags: programWithFlags,
		staticProgram: staticProgram
	};
	
	}();
	
	var _elm_lang$virtual_dom$Native_Debug = function() {
	
	
	// IMPORT / EXPORT
	
	function unsafeCoerce(value)
	{
		return value;
	}
	
	var upload = _elm_lang$core$Native_Scheduler.nativeBinding(function(callback)
	{
		var element = document.createElement('input');
		element.setAttribute('type', 'file');
		element.setAttribute('accept', 'text/json');
		element.style.display = 'none';
		element.addEventListener('change', function(event)
		{
			var fileReader = new FileReader();
			fileReader.onload = function(e)
			{
				callback(_elm_lang$core$Native_Scheduler.succeed(e.target.result));
			};
			fileReader.readAsText(event.target.files[0]);
			document.body.removeChild(element);
		});
		document.body.appendChild(element);
		element.click();
	});
	
	function download(historyLength, json)
	{
		return _elm_lang$core$Native_Scheduler.nativeBinding(function(callback)
		{
			var fileName = 'history-' + historyLength + '.txt';
			var jsonString = JSON.stringify(json);
			var mime = 'text/plain;charset=utf-8';
			var done = _elm_lang$core$Native_Scheduler.succeed(_elm_lang$core$Native_Utils.Tuple0);
	
			// for IE10+
			if (navigator.msSaveBlob)
			{
				navigator.msSaveBlob(new Blob([jsonString], {type: mime}), fileName);
				return callback(done);
			}
	
			// for HTML5
			var element = document.createElement('a');
			element.setAttribute('href', 'data:' + mime + ',' + encodeURIComponent(jsonString));
			element.setAttribute('download', fileName);
			element.style.display = 'none';
			document.body.appendChild(element);
			element.click();
			document.body.removeChild(element);
			callback(done);
		});
	}
	
	
	// POPOUT
	
	function messageToString(value)
	{
		switch (typeof value)
		{
			case 'boolean':
				return value ? 'True' : 'False';
			case 'number':
				return value + '';
			case 'string':
				return '"' + addSlashes(value, false) + '"';
		}
		if (value instanceof String)
		{
			return '\'' + addSlashes(value, true) + '\'';
		}
		if (typeof value !== 'object' || value === null || !('ctor' in value))
		{
			return '…';
		}
	
		var ctorStarter = value.ctor.substring(0, 5);
		if (ctorStarter === '_Tupl' || ctorStarter === '_Task')
		{
			return '…'
		}
		if (['_Array', '<decoder>', '_Process', '::', '[]', 'Set_elm_builtin', 'RBNode_elm_builtin', 'RBEmpty_elm_builtin'].indexOf(value.ctor) >= 0)
		{
			return '…';
		}
	
		var keys = Object.keys(value);
		switch (keys.length)
		{
			case 1:
				return value.ctor;
			case 2:
				return value.ctor + ' ' + messageToString(value._0);
			default:
				return value.ctor + ' … ' + messageToString(value[keys[keys.length - 1]]);
		}
	}
	
	
	function primitive(str)
	{
		return { ctor: 'Primitive', _0: str };
	}
	
	
	function init(value)
	{
		var type = typeof value;
	
		if (type === 'boolean')
		{
			return {
				ctor: 'Constructor',
				_0: _elm_lang$core$Maybe$Just(value ? 'True' : 'False'),
				_1: true,
				_2: _elm_lang$core$Native_List.Nil
			};
		}
	
		if (type === 'number')
		{
			return primitive(value + '');
		}
	
		if (type === 'string')
		{
			return { ctor: 'S', _0: '"' + addSlashes(value, false) + '"' };
		}
	
		if (value instanceof String)
		{
			return { ctor: 'S', _0: "'" + addSlashes(value, true) + "'" };
		}
	
		if (value instanceof Date)
		{
			return primitive('<' + value.toString() + '>');
		}
	
		if (value === null)
		{
			return primitive('XXX');
		}
	
		if (type === 'object' && 'ctor' in value)
		{
			var ctor = value.ctor;
	
			if (ctor === '::' || ctor === '[]')
			{
				return {
					ctor: 'Sequence',
					_0: {ctor: 'ListSeq'},
					_1: true,
					_2: A2(_elm_lang$core$List$map, init, value)
				};
			}
	
			if (ctor === 'Set_elm_builtin')
			{
				return {
					ctor: 'Sequence',
					_0: {ctor: 'SetSeq'},
					_1: true,
					_2: A3(_elm_lang$core$Set$foldr, initCons, _elm_lang$core$Native_List.Nil, value)
				};
			}
	
			if (ctor === 'RBNode_elm_builtin' || ctor == 'RBEmpty_elm_builtin')
			{
				return {
					ctor: 'Dictionary',
					_0: true,
					_1: A3(_elm_lang$core$Dict$foldr, initKeyValueCons, _elm_lang$core$Native_List.Nil, value)
				};
			}
	
			if (ctor === '_Array')
			{
				return {
					ctor: 'Sequence',
					_0: {ctor: 'ArraySeq'},
					_1: true,
					_2: A3(_elm_lang$core$Array$foldr, initCons, _elm_lang$core$Native_List.Nil, value)
				};
			}
	
			var ctorStarter = value.ctor.substring(0, 5);
			if (ctorStarter === '_Task')
			{
				return primitive('<task>');
			}
	
			if (ctor === '<decoder>')
			{
				return primitive(ctor);
			}
	
			if (ctor === '_Process')
			{
				return primitive('<process>');
			}
	
			var list = _elm_lang$core$Native_List.Nil;
			for (var i in value)
			{
				if (i === 'ctor') continue;
				list = _elm_lang$core$Native_List.Cons(init(value[i]), list);
			}
			return {
				ctor: 'Constructor',
				_0: ctorStarter === '_Tupl' ? _elm_lang$core$Maybe$Nothing : _elm_lang$core$Maybe$Just(ctor),
				_1: true,
				_2: _elm_lang$core$List$reverse(list)
			};
		}
	
		if (type === 'object')
		{
			var dict = _elm_lang$core$Dict$empty;
			for (var i in value)
			{
				dict = A3(_elm_lang$core$Dict$insert, i, init(value[i]), dict);
			}
			return { ctor: 'Record', _0: true, _1: dict };
		}
	
		return primitive('XXX');
	}
	
	var initCons = F2(initConsHelp);
	
	function initConsHelp(value, list)
	{
		return _elm_lang$core$Native_List.Cons(init(value), list);
	}
	
	var initKeyValueCons = F3(initKeyValueConsHelp);
	
	function initKeyValueConsHelp(key, value, list)
	{
		return _elm_lang$core$Native_List.Cons(
			_elm_lang$core$Native_Utils.Tuple2(init(key), init(value)),
			list
		);
	}
	
	function addSlashes(str, isChar)
	{
		var s = str.replace(/\\/g, '\\\\')
				  .replace(/\n/g, '\\n')
				  .replace(/\t/g, '\\t')
				  .replace(/\r/g, '\\r')
				  .replace(/\v/g, '\\v')
				  .replace(/\0/g, '\\0');
		if (isChar)
		{
			return s.replace(/\'/g, '\\\'');
		}
		else
		{
			return s.replace(/\"/g, '\\"');
		}
	}
	
	
	return {
		upload: upload,
		download: F2(download),
		unsafeCoerce: unsafeCoerce,
		messageToString: messageToString,
		init: init
	}
	
	}();
	
	var _elm_lang$virtual_dom$VirtualDom_Helpers$keyedNode = _elm_lang$virtual_dom$Native_VirtualDom.keyedNode;
	var _elm_lang$virtual_dom$VirtualDom_Helpers$lazy3 = _elm_lang$virtual_dom$Native_VirtualDom.lazy3;
	var _elm_lang$virtual_dom$VirtualDom_Helpers$lazy2 = _elm_lang$virtual_dom$Native_VirtualDom.lazy2;
	var _elm_lang$virtual_dom$VirtualDom_Helpers$lazy = _elm_lang$virtual_dom$Native_VirtualDom.lazy;
	var _elm_lang$virtual_dom$VirtualDom_Helpers$defaultOptions = {stopPropagation: false, preventDefault: false};
	var _elm_lang$virtual_dom$VirtualDom_Helpers$onWithOptions = _elm_lang$virtual_dom$Native_VirtualDom.on;
	var _elm_lang$virtual_dom$VirtualDom_Helpers$on = F2(
		function (eventName, decoder) {
			return A3(_elm_lang$virtual_dom$VirtualDom_Helpers$onWithOptions, eventName, _elm_lang$virtual_dom$VirtualDom_Helpers$defaultOptions, decoder);
		});
	var _elm_lang$virtual_dom$VirtualDom_Helpers$onClick = function (msg) {
		return A2(
			_elm_lang$virtual_dom$VirtualDom_Helpers$on,
			'click',
			_elm_lang$core$Json_Decode$succeed(msg));
	};
	var _elm_lang$virtual_dom$VirtualDom_Helpers$style = _elm_lang$virtual_dom$Native_VirtualDom.style;
	var _elm_lang$virtual_dom$VirtualDom_Helpers$attribute = _elm_lang$virtual_dom$Native_VirtualDom.attribute;
	var _elm_lang$virtual_dom$VirtualDom_Helpers$id = _elm_lang$virtual_dom$VirtualDom_Helpers$attribute('id');
	var _elm_lang$virtual_dom$VirtualDom_Helpers$property = _elm_lang$virtual_dom$Native_VirtualDom.property;
	var _elm_lang$virtual_dom$VirtualDom_Helpers$class = function (name) {
		return A2(
			_elm_lang$virtual_dom$VirtualDom_Helpers$property,
			'className',
			_elm_lang$core$Json_Encode$string(name));
	};
	var _elm_lang$virtual_dom$VirtualDom_Helpers$href = function (name) {
		return A2(
			_elm_lang$virtual_dom$VirtualDom_Helpers$property,
			'href',
			_elm_lang$core$Json_Encode$string(name));
	};
	var _elm_lang$virtual_dom$VirtualDom_Helpers$map = _elm_lang$virtual_dom$Native_VirtualDom.map;
	var _elm_lang$virtual_dom$VirtualDom_Helpers$text = _elm_lang$virtual_dom$Native_VirtualDom.text;
	var _elm_lang$virtual_dom$VirtualDom_Helpers$node = _elm_lang$virtual_dom$Native_VirtualDom.node;
	var _elm_lang$virtual_dom$VirtualDom_Helpers$div = _elm_lang$virtual_dom$VirtualDom_Helpers$node('div');
	var _elm_lang$virtual_dom$VirtualDom_Helpers$span = _elm_lang$virtual_dom$VirtualDom_Helpers$node('span');
	var _elm_lang$virtual_dom$VirtualDom_Helpers$a = _elm_lang$virtual_dom$VirtualDom_Helpers$node('a');
	var _elm_lang$virtual_dom$VirtualDom_Helpers$h1 = _elm_lang$virtual_dom$VirtualDom_Helpers$node('h1');
	var _elm_lang$virtual_dom$VirtualDom_Helpers$Options = F2(
		function (a, b) {
			return {stopPropagation: a, preventDefault: b};
		});
	var _elm_lang$virtual_dom$VirtualDom_Helpers$Node = {ctor: 'Node'};
	var _elm_lang$virtual_dom$VirtualDom_Helpers$Property = {ctor: 'Property'};
	
	var _elm_lang$virtual_dom$VirtualDom_Expando$purple = _elm_lang$virtual_dom$VirtualDom_Helpers$style(
		{
			ctor: '::',
			_0: {ctor: '_Tuple2', _0: 'color', _1: 'rgb(136, 19, 145)'},
			_1: {ctor: '[]'}
		});
	var _elm_lang$virtual_dom$VirtualDom_Expando$blue = _elm_lang$virtual_dom$VirtualDom_Helpers$style(
		{
			ctor: '::',
			_0: {ctor: '_Tuple2', _0: 'color', _1: 'rgb(28, 0, 207)'},
			_1: {ctor: '[]'}
		});
	var _elm_lang$virtual_dom$VirtualDom_Expando$red = _elm_lang$virtual_dom$VirtualDom_Helpers$style(
		{
			ctor: '::',
			_0: {ctor: '_Tuple2', _0: 'color', _1: 'rgb(196, 26, 22)'},
			_1: {ctor: '[]'}
		});
	var _elm_lang$virtual_dom$VirtualDom_Expando$leftPad = function (maybeKey) {
		var _p0 = maybeKey;
		if (_p0.ctor === 'Nothing') {
			return _elm_lang$virtual_dom$VirtualDom_Helpers$style(
				{ctor: '[]'});
		} else {
			return _elm_lang$virtual_dom$VirtualDom_Helpers$style(
				{
					ctor: '::',
					_0: {ctor: '_Tuple2', _0: 'padding-left', _1: '4ch'},
					_1: {ctor: '[]'}
				});
		}
	};
	var _elm_lang$virtual_dom$VirtualDom_Expando$makeArrow = function (arrow) {
		return A2(
			_elm_lang$virtual_dom$VirtualDom_Helpers$span,
			{
				ctor: '::',
				_0: _elm_lang$virtual_dom$VirtualDom_Helpers$style(
					{
						ctor: '::',
						_0: {ctor: '_Tuple2', _0: 'color', _1: '#777'},
						_1: {
							ctor: '::',
							_0: {ctor: '_Tuple2', _0: 'padding-left', _1: '2ch'},
							_1: {
								ctor: '::',
								_0: {ctor: '_Tuple2', _0: 'width', _1: '2ch'},
								_1: {
									ctor: '::',
									_0: {ctor: '_Tuple2', _0: 'display', _1: 'inline-block'},
									_1: {ctor: '[]'}
								}
							}
						}
					}),
				_1: {ctor: '[]'}
			},
			{
				ctor: '::',
				_0: _elm_lang$virtual_dom$VirtualDom_Helpers$text(arrow),
				_1: {ctor: '[]'}
			});
	};
	var _elm_lang$virtual_dom$VirtualDom_Expando$lineStarter = F3(
		function (maybeKey, maybeIsClosed, description) {
			var arrow = function () {
				var _p1 = maybeIsClosed;
				if (_p1.ctor === 'Nothing') {
					return _elm_lang$virtual_dom$VirtualDom_Expando$makeArrow('');
				} else {
					if (_p1._0 === true) {
						return _elm_lang$virtual_dom$VirtualDom_Expando$makeArrow('▸');
					} else {
						return _elm_lang$virtual_dom$VirtualDom_Expando$makeArrow('▾');
					}
				}
			}();
			var _p2 = maybeKey;
			if (_p2.ctor === 'Nothing') {
				return {ctor: '::', _0: arrow, _1: description};
			} else {
				return {
					ctor: '::',
					_0: arrow,
					_1: {
						ctor: '::',
						_0: A2(
							_elm_lang$virtual_dom$VirtualDom_Helpers$span,
							{
								ctor: '::',
								_0: _elm_lang$virtual_dom$VirtualDom_Expando$purple,
								_1: {ctor: '[]'}
							},
							{
								ctor: '::',
								_0: _elm_lang$virtual_dom$VirtualDom_Helpers$text(_p2._0),
								_1: {ctor: '[]'}
							}),
						_1: {
							ctor: '::',
							_0: _elm_lang$virtual_dom$VirtualDom_Helpers$text(' = '),
							_1: description
						}
					}
				};
			}
		});
	var _elm_lang$virtual_dom$VirtualDom_Expando$viewExtraTinyRecord = F3(
		function (length, starter, entries) {
			var _p3 = entries;
			if (_p3.ctor === '[]') {
				return {
					ctor: '_Tuple2',
					_0: length + 1,
					_1: {
						ctor: '::',
						_0: _elm_lang$virtual_dom$VirtualDom_Helpers$text('}'),
						_1: {ctor: '[]'}
					}
				};
			} else {
				var _p5 = _p3._0;
				var nextLength = (length + _elm_lang$core$String$length(_p5)) + 1;
				if (_elm_lang$core$Native_Utils.cmp(nextLength, 18) > 0) {
					return {
						ctor: '_Tuple2',
						_0: length + 2,
						_1: {
							ctor: '::',
							_0: _elm_lang$virtual_dom$VirtualDom_Helpers$text('…}'),
							_1: {ctor: '[]'}
						}
					};
				} else {
					var _p4 = A3(_elm_lang$virtual_dom$VirtualDom_Expando$viewExtraTinyRecord, nextLength, ',', _p3._1);
					var finalLength = _p4._0;
					var otherNodes = _p4._1;
					return {
						ctor: '_Tuple2',
						_0: finalLength,
						_1: {
							ctor: '::',
							_0: _elm_lang$virtual_dom$VirtualDom_Helpers$text(starter),
							_1: {
								ctor: '::',
								_0: A2(
									_elm_lang$virtual_dom$VirtualDom_Helpers$span,
									{
										ctor: '::',
										_0: _elm_lang$virtual_dom$VirtualDom_Expando$purple,
										_1: {ctor: '[]'}
									},
									{
										ctor: '::',
										_0: _elm_lang$virtual_dom$VirtualDom_Helpers$text(_p5),
										_1: {ctor: '[]'}
									}),
								_1: otherNodes
							}
						}
					};
				}
			}
		});
	var _elm_lang$virtual_dom$VirtualDom_Expando$elideMiddle = function (str) {
		return (_elm_lang$core$Native_Utils.cmp(
			_elm_lang$core$String$length(str),
			18) < 1) ? str : A2(
			_elm_lang$core$Basics_ops['++'],
			A2(_elm_lang$core$String$left, 8, str),
			A2(
				_elm_lang$core$Basics_ops['++'],
				'...',
				A2(_elm_lang$core$String$right, 8, str)));
	};
	var _elm_lang$virtual_dom$VirtualDom_Expando$viewTinyHelp = function (str) {
		return {
			ctor: '_Tuple2',
			_0: _elm_lang$core$String$length(str),
			_1: {
				ctor: '::',
				_0: _elm_lang$virtual_dom$VirtualDom_Helpers$text(str),
				_1: {ctor: '[]'}
			}
		};
	};
	var _elm_lang$virtual_dom$VirtualDom_Expando$updateIndex = F3(
		function (n, func, list) {
			var _p6 = list;
			if (_p6.ctor === '[]') {
				return {ctor: '[]'};
			} else {
				var _p8 = _p6._1;
				var _p7 = _p6._0;
				return (_elm_lang$core$Native_Utils.cmp(n, 0) < 1) ? {
					ctor: '::',
					_0: func(_p7),
					_1: _p8
				} : {
					ctor: '::',
					_0: _p7,
					_1: A3(_elm_lang$virtual_dom$VirtualDom_Expando$updateIndex, n - 1, func, _p8)
				};
			}
		});
	var _elm_lang$virtual_dom$VirtualDom_Expando$seqTypeToString = F2(
		function (n, seqType) {
			var _p9 = seqType;
			switch (_p9.ctor) {
				case 'ListSeq':
					return A2(
						_elm_lang$core$Basics_ops['++'],
						'List(',
						A2(
							_elm_lang$core$Basics_ops['++'],
							_elm_lang$core$Basics$toString(n),
							')'));
				case 'SetSeq':
					return A2(
						_elm_lang$core$Basics_ops['++'],
						'Set(',
						A2(
							_elm_lang$core$Basics_ops['++'],
							_elm_lang$core$Basics$toString(n),
							')'));
				default:
					return A2(
						_elm_lang$core$Basics_ops['++'],
						'Array(',
						A2(
							_elm_lang$core$Basics_ops['++'],
							_elm_lang$core$Basics$toString(n),
							')'));
			}
		});
	var _elm_lang$virtual_dom$VirtualDom_Expando$viewTiny = function (value) {
		var _p10 = value;
		switch (_p10.ctor) {
			case 'S':
				var str = _elm_lang$virtual_dom$VirtualDom_Expando$elideMiddle(_p10._0);
				return {
					ctor: '_Tuple2',
					_0: _elm_lang$core$String$length(str),
					_1: {
						ctor: '::',
						_0: A2(
							_elm_lang$virtual_dom$VirtualDom_Helpers$span,
							{
								ctor: '::',
								_0: _elm_lang$virtual_dom$VirtualDom_Expando$red,
								_1: {ctor: '[]'}
							},
							{
								ctor: '::',
								_0: _elm_lang$virtual_dom$VirtualDom_Helpers$text(str),
								_1: {ctor: '[]'}
							}),
						_1: {ctor: '[]'}
					}
				};
			case 'Primitive':
				var _p11 = _p10._0;
				return {
					ctor: '_Tuple2',
					_0: _elm_lang$core$String$length(_p11),
					_1: {
						ctor: '::',
						_0: A2(
							_elm_lang$virtual_dom$VirtualDom_Helpers$span,
							{
								ctor: '::',
								_0: _elm_lang$virtual_dom$VirtualDom_Expando$blue,
								_1: {ctor: '[]'}
							},
							{
								ctor: '::',
								_0: _elm_lang$virtual_dom$VirtualDom_Helpers$text(_p11),
								_1: {ctor: '[]'}
							}),
						_1: {ctor: '[]'}
					}
				};
			case 'Sequence':
				return _elm_lang$virtual_dom$VirtualDom_Expando$viewTinyHelp(
					A2(
						_elm_lang$virtual_dom$VirtualDom_Expando$seqTypeToString,
						_elm_lang$core$List$length(_p10._2),
						_p10._0));
			case 'Dictionary':
				return _elm_lang$virtual_dom$VirtualDom_Expando$viewTinyHelp(
					A2(
						_elm_lang$core$Basics_ops['++'],
						'Dict(',
						A2(
							_elm_lang$core$Basics_ops['++'],
							_elm_lang$core$Basics$toString(
								_elm_lang$core$List$length(_p10._1)),
							')')));
			case 'Record':
				return _elm_lang$virtual_dom$VirtualDom_Expando$viewTinyRecord(_p10._1);
			default:
				if (_p10._2.ctor === '[]') {
					return _elm_lang$virtual_dom$VirtualDom_Expando$viewTinyHelp(
						A2(_elm_lang$core$Maybe$withDefault, 'Unit', _p10._0));
				} else {
					return _elm_lang$virtual_dom$VirtualDom_Expando$viewTinyHelp(
						function () {
							var _p12 = _p10._0;
							if (_p12.ctor === 'Nothing') {
								return A2(
									_elm_lang$core$Basics_ops['++'],
									'Tuple(',
									A2(
										_elm_lang$core$Basics_ops['++'],
										_elm_lang$core$Basics$toString(
											_elm_lang$core$List$length(_p10._2)),
										')'));
							} else {
								return A2(_elm_lang$core$Basics_ops['++'], _p12._0, ' …');
							}
						}());
				}
		}
	};
	var _elm_lang$virtual_dom$VirtualDom_Expando$viewTinyRecord = function (record) {
		return _elm_lang$core$Dict$isEmpty(record) ? {
			ctor: '_Tuple2',
			_0: 2,
			_1: {
				ctor: '::',
				_0: _elm_lang$virtual_dom$VirtualDom_Helpers$text('{}'),
				_1: {ctor: '[]'}
			}
		} : A3(
			_elm_lang$virtual_dom$VirtualDom_Expando$viewTinyRecordHelp,
			0,
			'{ ',
			_elm_lang$core$Dict$toList(record));
	};
	var _elm_lang$virtual_dom$VirtualDom_Expando$viewTinyRecordHelp = F3(
		function (length, starter, entries) {
			var _p13 = entries;
			if (_p13.ctor === '[]') {
				return {
					ctor: '_Tuple2',
					_0: length + 2,
					_1: {
						ctor: '::',
						_0: _elm_lang$virtual_dom$VirtualDom_Helpers$text(' }'),
						_1: {ctor: '[]'}
					}
				};
			} else {
				var _p16 = _p13._0._0;
				var _p14 = _elm_lang$virtual_dom$VirtualDom_Expando$viewExtraTiny(_p13._0._1);
				var valueLen = _p14._0;
				var valueNodes = _p14._1;
				var fieldLen = _elm_lang$core$String$length(_p16);
				var newLength = ((length + fieldLen) + valueLen) + 5;
				if (_elm_lang$core$Native_Utils.cmp(newLength, 60) > 0) {
					return {
						ctor: '_Tuple2',
						_0: length + 4,
						_1: {
							ctor: '::',
							_0: _elm_lang$virtual_dom$VirtualDom_Helpers$text(', … }'),
							_1: {ctor: '[]'}
						}
					};
				} else {
					var _p15 = A3(_elm_lang$virtual_dom$VirtualDom_Expando$viewTinyRecordHelp, newLength, ', ', _p13._1);
					var finalLength = _p15._0;
					var otherNodes = _p15._1;
					return {
						ctor: '_Tuple2',
						_0: finalLength,
						_1: {
							ctor: '::',
							_0: _elm_lang$virtual_dom$VirtualDom_Helpers$text(starter),
							_1: {
								ctor: '::',
								_0: A2(
									_elm_lang$virtual_dom$VirtualDom_Helpers$span,
									{
										ctor: '::',
										_0: _elm_lang$virtual_dom$VirtualDom_Expando$purple,
										_1: {ctor: '[]'}
									},
									{
										ctor: '::',
										_0: _elm_lang$virtual_dom$VirtualDom_Helpers$text(_p16),
										_1: {ctor: '[]'}
									}),
								_1: {
									ctor: '::',
									_0: _elm_lang$virtual_dom$VirtualDom_Helpers$text(' = '),
									_1: {
										ctor: '::',
										_0: A2(
											_elm_lang$virtual_dom$VirtualDom_Helpers$span,
											{ctor: '[]'},
											valueNodes),
										_1: otherNodes
									}
								}
							}
						}
					};
				}
			}
		});
	var _elm_lang$virtual_dom$VirtualDom_Expando$viewExtraTiny = function (value) {
		var _p17 = value;
		if (_p17.ctor === 'Record') {
			return A3(
				_elm_lang$virtual_dom$VirtualDom_Expando$viewExtraTinyRecord,
				0,
				'{',
				_elm_lang$core$Dict$keys(_p17._1));
		} else {
			return _elm_lang$virtual_dom$VirtualDom_Expando$viewTiny(value);
		}
	};
	var _elm_lang$virtual_dom$VirtualDom_Expando$Constructor = F3(
		function (a, b, c) {
			return {ctor: 'Constructor', _0: a, _1: b, _2: c};
		});
	var _elm_lang$virtual_dom$VirtualDom_Expando$Record = F2(
		function (a, b) {
			return {ctor: 'Record', _0: a, _1: b};
		});
	var _elm_lang$virtual_dom$VirtualDom_Expando$Dictionary = F2(
		function (a, b) {
			return {ctor: 'Dictionary', _0: a, _1: b};
		});
	var _elm_lang$virtual_dom$VirtualDom_Expando$Sequence = F3(
		function (a, b, c) {
			return {ctor: 'Sequence', _0: a, _1: b, _2: c};
		});
	var _elm_lang$virtual_dom$VirtualDom_Expando$initHelp = F2(
		function (isOuter, expando) {
			var _p18 = expando;
			switch (_p18.ctor) {
				case 'S':
					return expando;
				case 'Primitive':
					return expando;
				case 'Sequence':
					var _p20 = _p18._0;
					var _p19 = _p18._2;
					return isOuter ? A3(
						_elm_lang$virtual_dom$VirtualDom_Expando$Sequence,
						_p20,
						false,
						A2(
							_elm_lang$core$List$map,
							_elm_lang$virtual_dom$VirtualDom_Expando$initHelp(false),
							_p19)) : ((_elm_lang$core$Native_Utils.cmp(
						_elm_lang$core$List$length(_p19),
						8) < 1) ? A3(_elm_lang$virtual_dom$VirtualDom_Expando$Sequence, _p20, false, _p19) : expando);
				case 'Dictionary':
					var _p23 = _p18._1;
					return isOuter ? A2(
						_elm_lang$virtual_dom$VirtualDom_Expando$Dictionary,
						false,
						A2(
							_elm_lang$core$List$map,
							function (_p21) {
								var _p22 = _p21;
								return {
									ctor: '_Tuple2',
									_0: _p22._0,
									_1: A2(_elm_lang$virtual_dom$VirtualDom_Expando$initHelp, false, _p22._1)
								};
							},
							_p23)) : ((_elm_lang$core$Native_Utils.cmp(
						_elm_lang$core$List$length(_p23),
						8) < 1) ? A2(_elm_lang$virtual_dom$VirtualDom_Expando$Dictionary, false, _p23) : expando);
				case 'Record':
					var _p25 = _p18._1;
					return isOuter ? A2(
						_elm_lang$virtual_dom$VirtualDom_Expando$Record,
						false,
						A2(
							_elm_lang$core$Dict$map,
							F2(
								function (_p24, v) {
									return A2(_elm_lang$virtual_dom$VirtualDom_Expando$initHelp, false, v);
								}),
							_p25)) : ((_elm_lang$core$Native_Utils.cmp(
						_elm_lang$core$Dict$size(_p25),
						4) < 1) ? A2(_elm_lang$virtual_dom$VirtualDom_Expando$Record, false, _p25) : expando);
				default:
					var _p27 = _p18._0;
					var _p26 = _p18._2;
					return isOuter ? A3(
						_elm_lang$virtual_dom$VirtualDom_Expando$Constructor,
						_p27,
						false,
						A2(
							_elm_lang$core$List$map,
							_elm_lang$virtual_dom$VirtualDom_Expando$initHelp(false),
							_p26)) : ((_elm_lang$core$Native_Utils.cmp(
						_elm_lang$core$List$length(_p26),
						4) < 1) ? A3(_elm_lang$virtual_dom$VirtualDom_Expando$Constructor, _p27, false, _p26) : expando);
			}
		});
	var _elm_lang$virtual_dom$VirtualDom_Expando$init = function (value) {
		return A2(
			_elm_lang$virtual_dom$VirtualDom_Expando$initHelp,
			true,
			_elm_lang$virtual_dom$Native_Debug.init(value));
	};
	var _elm_lang$virtual_dom$VirtualDom_Expando$mergeHelp = F2(
		function (old, $new) {
			var _p28 = {ctor: '_Tuple2', _0: old, _1: $new};
			_v12_6:
			do {
				if (_p28.ctor === '_Tuple2') {
					switch (_p28._1.ctor) {
						case 'S':
							return $new;
						case 'Primitive':
							return $new;
						case 'Sequence':
							if (_p28._0.ctor === 'Sequence') {
								return A3(
									_elm_lang$virtual_dom$VirtualDom_Expando$Sequence,
									_p28._1._0,
									_p28._0._1,
									A2(_elm_lang$virtual_dom$VirtualDom_Expando$mergeListHelp, _p28._0._2, _p28._1._2));
							} else {
								break _v12_6;
							}
						case 'Dictionary':
							if (_p28._0.ctor === 'Dictionary') {
								return A2(_elm_lang$virtual_dom$VirtualDom_Expando$Dictionary, _p28._0._0, _p28._1._1);
							} else {
								break _v12_6;
							}
						case 'Record':
							if (_p28._0.ctor === 'Record') {
								return A2(
									_elm_lang$virtual_dom$VirtualDom_Expando$Record,
									_p28._0._0,
									A2(
										_elm_lang$core$Dict$map,
										_elm_lang$virtual_dom$VirtualDom_Expando$mergeDictHelp(_p28._0._1),
										_p28._1._1));
							} else {
								break _v12_6;
							}
						default:
							if (_p28._0.ctor === 'Constructor') {
								return A3(
									_elm_lang$virtual_dom$VirtualDom_Expando$Constructor,
									_p28._1._0,
									_p28._0._1,
									A2(_elm_lang$virtual_dom$VirtualDom_Expando$mergeListHelp, _p28._0._2, _p28._1._2));
							} else {
								break _v12_6;
							}
					}
				} else {
					break _v12_6;
				}
			} while(false);
			return $new;
		});
	var _elm_lang$virtual_dom$VirtualDom_Expando$mergeDictHelp = F3(
		function (oldDict, key, value) {
			var _p29 = A2(_elm_lang$core$Dict$get, key, oldDict);
			if (_p29.ctor === 'Nothing') {
				return value;
			} else {
				return A2(_elm_lang$virtual_dom$VirtualDom_Expando$mergeHelp, _p29._0, value);
			}
		});
	var _elm_lang$virtual_dom$VirtualDom_Expando$mergeListHelp = F2(
		function (olds, news) {
			var _p30 = {ctor: '_Tuple2', _0: olds, _1: news};
			if (_p30._0.ctor === '[]') {
				return news;
			} else {
				if (_p30._1.ctor === '[]') {
					return news;
				} else {
					return {
						ctor: '::',
						_0: A2(_elm_lang$virtual_dom$VirtualDom_Expando$mergeHelp, _p30._0._0, _p30._1._0),
						_1: A2(_elm_lang$virtual_dom$VirtualDom_Expando$mergeListHelp, _p30._0._1, _p30._1._1)
					};
				}
			}
		});
	var _elm_lang$virtual_dom$VirtualDom_Expando$merge = F2(
		function (value, expando) {
			return A2(
				_elm_lang$virtual_dom$VirtualDom_Expando$mergeHelp,
				expando,
				_elm_lang$virtual_dom$Native_Debug.init(value));
		});
	var _elm_lang$virtual_dom$VirtualDom_Expando$update = F2(
		function (msg, value) {
			var _p31 = value;
			switch (_p31.ctor) {
				case 'S':
					return _elm_lang$core$Native_Utils.crashCase(
						'VirtualDom.Expando',
						{
							start: {line: 168, column: 3},
							end: {line: 235, column: 50}
						},
						_p31)('No messages for primitives');
				case 'Primitive':
					return _elm_lang$core$Native_Utils.crashCase(
						'VirtualDom.Expando',
						{
							start: {line: 168, column: 3},
							end: {line: 235, column: 50}
						},
						_p31)('No messages for primitives');
				case 'Sequence':
					var _p39 = _p31._2;
					var _p38 = _p31._0;
					var _p37 = _p31._1;
					var _p34 = msg;
					switch (_p34.ctor) {
						case 'Toggle':
							return A3(_elm_lang$virtual_dom$VirtualDom_Expando$Sequence, _p38, !_p37, _p39);
						case 'Index':
							if (_p34._0.ctor === 'None') {
								return A3(
									_elm_lang$virtual_dom$VirtualDom_Expando$Sequence,
									_p38,
									_p37,
									A3(
										_elm_lang$virtual_dom$VirtualDom_Expando$updateIndex,
										_p34._1,
										_elm_lang$virtual_dom$VirtualDom_Expando$update(_p34._2),
										_p39));
							} else {
								return _elm_lang$core$Native_Utils.crashCase(
									'VirtualDom.Expando',
									{
										start: {line: 176, column: 7},
										end: {line: 188, column: 46}
									},
									_p34)('No redirected indexes on sequences');
							}
						default:
							return _elm_lang$core$Native_Utils.crashCase(
								'VirtualDom.Expando',
								{
									start: {line: 176, column: 7},
									end: {line: 188, column: 46}
								},
								_p34)('No field on sequences');
					}
				case 'Dictionary':
					var _p51 = _p31._1;
					var _p50 = _p31._0;
					var _p40 = msg;
					switch (_p40.ctor) {
						case 'Toggle':
							return A2(_elm_lang$virtual_dom$VirtualDom_Expando$Dictionary, !_p50, _p51);
						case 'Index':
							var _p48 = _p40._2;
							var _p47 = _p40._1;
							var _p41 = _p40._0;
							switch (_p41.ctor) {
								case 'None':
									return _elm_lang$core$Native_Utils.crashCase(
										'VirtualDom.Expando',
										{
											start: {line: 196, column: 11},
											end: {line: 206, column: 81}
										},
										_p41)('must have redirect for dictionaries');
								case 'Key':
									return A2(
										_elm_lang$virtual_dom$VirtualDom_Expando$Dictionary,
										_p50,
										A3(
											_elm_lang$virtual_dom$VirtualDom_Expando$updateIndex,
											_p47,
											function (_p43) {
												var _p44 = _p43;
												return {
													ctor: '_Tuple2',
													_0: A2(_elm_lang$virtual_dom$VirtualDom_Expando$update, _p48, _p44._0),
													_1: _p44._1
												};
											},
											_p51));
								default:
									return A2(
										_elm_lang$virtual_dom$VirtualDom_Expando$Dictionary,
										_p50,
										A3(
											_elm_lang$virtual_dom$VirtualDom_Expando$updateIndex,
											_p47,
											function (_p45) {
												var _p46 = _p45;
												return {
													ctor: '_Tuple2',
													_0: _p46._0,
													_1: A2(_elm_lang$virtual_dom$VirtualDom_Expando$update, _p48, _p46._1)
												};
											},
											_p51));
							}
						default:
							return _elm_lang$core$Native_Utils.crashCase(
								'VirtualDom.Expando',
								{
									start: {line: 191, column: 7},
									end: {line: 209, column: 50}
								},
								_p40)('no field for dictionaries');
					}
				case 'Record':
					var _p55 = _p31._1;
					var _p54 = _p31._0;
					var _p52 = msg;
					switch (_p52.ctor) {
						case 'Toggle':
							return A2(_elm_lang$virtual_dom$VirtualDom_Expando$Record, !_p54, _p55);
						case 'Index':
							return _elm_lang$core$Native_Utils.crashCase(
								'VirtualDom.Expando',
								{
									start: {line: 212, column: 7},
									end: {line: 220, column: 77}
								},
								_p52)('No index for records');
						default:
							return A2(
								_elm_lang$virtual_dom$VirtualDom_Expando$Record,
								_p54,
								A3(
									_elm_lang$core$Dict$update,
									_p52._0,
									_elm_lang$virtual_dom$VirtualDom_Expando$updateField(_p52._1),
									_p55));
					}
				default:
					var _p61 = _p31._2;
					var _p60 = _p31._0;
					var _p59 = _p31._1;
					var _p56 = msg;
					switch (_p56.ctor) {
						case 'Toggle':
							return A3(_elm_lang$virtual_dom$VirtualDom_Expando$Constructor, _p60, !_p59, _p61);
						case 'Index':
							if (_p56._0.ctor === 'None') {
								return A3(
									_elm_lang$virtual_dom$VirtualDom_Expando$Constructor,
									_p60,
									_p59,
									A3(
										_elm_lang$virtual_dom$VirtualDom_Expando$updateIndex,
										_p56._1,
										_elm_lang$virtual_dom$VirtualDom_Expando$update(_p56._2),
										_p61));
							} else {
								return _elm_lang$core$Native_Utils.crashCase(
									'VirtualDom.Expando',
									{
										start: {line: 223, column: 7},
										end: {line: 235, column: 50}
									},
									_p56)('No redirected indexes on sequences');
							}
						default:
							return _elm_lang$core$Native_Utils.crashCase(
								'VirtualDom.Expando',
								{
									start: {line: 223, column: 7},
									end: {line: 235, column: 50}
								},
								_p56)('No field for constructors');
					}
			}
		});
	var _elm_lang$virtual_dom$VirtualDom_Expando$updateField = F2(
		function (msg, maybeExpando) {
			var _p62 = maybeExpando;
			if (_p62.ctor === 'Nothing') {
				return _elm_lang$core$Native_Utils.crashCase(
					'VirtualDom.Expando',
					{
						start: {line: 253, column: 3},
						end: {line: 258, column: 32}
					},
					_p62)('key does not exist');
			} else {
				return _elm_lang$core$Maybe$Just(
					A2(_elm_lang$virtual_dom$VirtualDom_Expando$update, msg, _p62._0));
			}
		});
	var _elm_lang$virtual_dom$VirtualDom_Expando$Primitive = function (a) {
		return {ctor: 'Primitive', _0: a};
	};
	var _elm_lang$virtual_dom$VirtualDom_Expando$S = function (a) {
		return {ctor: 'S', _0: a};
	};
	var _elm_lang$virtual_dom$VirtualDom_Expando$ArraySeq = {ctor: 'ArraySeq'};
	var _elm_lang$virtual_dom$VirtualDom_Expando$SetSeq = {ctor: 'SetSeq'};
	var _elm_lang$virtual_dom$VirtualDom_Expando$ListSeq = {ctor: 'ListSeq'};
	var _elm_lang$virtual_dom$VirtualDom_Expando$Field = F2(
		function (a, b) {
			return {ctor: 'Field', _0: a, _1: b};
		});
	var _elm_lang$virtual_dom$VirtualDom_Expando$Index = F3(
		function (a, b, c) {
			return {ctor: 'Index', _0: a, _1: b, _2: c};
		});
	var _elm_lang$virtual_dom$VirtualDom_Expando$Toggle = {ctor: 'Toggle'};
	var _elm_lang$virtual_dom$VirtualDom_Expando$Value = {ctor: 'Value'};
	var _elm_lang$virtual_dom$VirtualDom_Expando$Key = {ctor: 'Key'};
	var _elm_lang$virtual_dom$VirtualDom_Expando$None = {ctor: 'None'};
	var _elm_lang$virtual_dom$VirtualDom_Expando$viewConstructorEntry = F2(
		function (index, value) {
			return A2(
				_elm_lang$virtual_dom$VirtualDom_Helpers$map,
				A2(_elm_lang$virtual_dom$VirtualDom_Expando$Index, _elm_lang$virtual_dom$VirtualDom_Expando$None, index),
				A2(
					_elm_lang$virtual_dom$VirtualDom_Expando$view,
					_elm_lang$core$Maybe$Just(
						_elm_lang$core$Basics$toString(index)),
					value));
		});
	var _elm_lang$virtual_dom$VirtualDom_Expando$view = F2(
		function (maybeKey, expando) {
			var _p64 = expando;
			switch (_p64.ctor) {
				case 'S':
					return A2(
						_elm_lang$virtual_dom$VirtualDom_Helpers$div,
						{
							ctor: '::',
							_0: _elm_lang$virtual_dom$VirtualDom_Expando$leftPad(maybeKey),
							_1: {ctor: '[]'}
						},
						A3(
							_elm_lang$virtual_dom$VirtualDom_Expando$lineStarter,
							maybeKey,
							_elm_lang$core$Maybe$Nothing,
							{
								ctor: '::',
								_0: A2(
									_elm_lang$virtual_dom$VirtualDom_Helpers$span,
									{
										ctor: '::',
										_0: _elm_lang$virtual_dom$VirtualDom_Expando$red,
										_1: {ctor: '[]'}
									},
									{
										ctor: '::',
										_0: _elm_lang$virtual_dom$VirtualDom_Helpers$text(_p64._0),
										_1: {ctor: '[]'}
									}),
								_1: {ctor: '[]'}
							}));
				case 'Primitive':
					return A2(
						_elm_lang$virtual_dom$VirtualDom_Helpers$div,
						{
							ctor: '::',
							_0: _elm_lang$virtual_dom$VirtualDom_Expando$leftPad(maybeKey),
							_1: {ctor: '[]'}
						},
						A3(
							_elm_lang$virtual_dom$VirtualDom_Expando$lineStarter,
							maybeKey,
							_elm_lang$core$Maybe$Nothing,
							{
								ctor: '::',
								_0: A2(
									_elm_lang$virtual_dom$VirtualDom_Helpers$span,
									{
										ctor: '::',
										_0: _elm_lang$virtual_dom$VirtualDom_Expando$blue,
										_1: {ctor: '[]'}
									},
									{
										ctor: '::',
										_0: _elm_lang$virtual_dom$VirtualDom_Helpers$text(_p64._0),
										_1: {ctor: '[]'}
									}),
								_1: {ctor: '[]'}
							}));
				case 'Sequence':
					return A4(_elm_lang$virtual_dom$VirtualDom_Expando$viewSequence, maybeKey, _p64._0, _p64._1, _p64._2);
				case 'Dictionary':
					return A3(_elm_lang$virtual_dom$VirtualDom_Expando$viewDictionary, maybeKey, _p64._0, _p64._1);
				case 'Record':
					return A3(_elm_lang$virtual_dom$VirtualDom_Expando$viewRecord, maybeKey, _p64._0, _p64._1);
				default:
					return A4(_elm_lang$virtual_dom$VirtualDom_Expando$viewConstructor, maybeKey, _p64._0, _p64._1, _p64._2);
			}
		});
	var _elm_lang$virtual_dom$VirtualDom_Expando$viewConstructor = F4(
		function (maybeKey, maybeName, isClosed, valueList) {
			var _p65 = function () {
				var _p66 = valueList;
				if (_p66.ctor === '[]') {
					return {
						ctor: '_Tuple2',
						_0: _elm_lang$core$Maybe$Nothing,
						_1: A2(
							_elm_lang$virtual_dom$VirtualDom_Helpers$div,
							{ctor: '[]'},
							{ctor: '[]'})
					};
				} else {
					if (_p66._1.ctor === '[]') {
						var _p67 = _p66._0;
						switch (_p67.ctor) {
							case 'S':
								return {
									ctor: '_Tuple2',
									_0: _elm_lang$core$Maybe$Nothing,
									_1: A2(
										_elm_lang$virtual_dom$VirtualDom_Helpers$div,
										{ctor: '[]'},
										{ctor: '[]'})
								};
							case 'Primitive':
								return {
									ctor: '_Tuple2',
									_0: _elm_lang$core$Maybe$Nothing,
									_1: A2(
										_elm_lang$virtual_dom$VirtualDom_Helpers$div,
										{ctor: '[]'},
										{ctor: '[]'})
								};
							case 'Sequence':
								return {
									ctor: '_Tuple2',
									_0: _elm_lang$core$Maybe$Just(isClosed),
									_1: isClosed ? A2(
										_elm_lang$virtual_dom$VirtualDom_Helpers$div,
										{ctor: '[]'},
										{ctor: '[]'}) : A2(
										_elm_lang$virtual_dom$VirtualDom_Helpers$map,
										A2(_elm_lang$virtual_dom$VirtualDom_Expando$Index, _elm_lang$virtual_dom$VirtualDom_Expando$None, 0),
										_elm_lang$virtual_dom$VirtualDom_Expando$viewSequenceOpen(_p67._2))
								};
							case 'Dictionary':
								return {
									ctor: '_Tuple2',
									_0: _elm_lang$core$Maybe$Just(isClosed),
									_1: isClosed ? A2(
										_elm_lang$virtual_dom$VirtualDom_Helpers$div,
										{ctor: '[]'},
										{ctor: '[]'}) : A2(
										_elm_lang$virtual_dom$VirtualDom_Helpers$map,
										A2(_elm_lang$virtual_dom$VirtualDom_Expando$Index, _elm_lang$virtual_dom$VirtualDom_Expando$None, 0),
										_elm_lang$virtual_dom$VirtualDom_Expando$viewDictionaryOpen(_p67._1))
								};
							case 'Record':
								return {
									ctor: '_Tuple2',
									_0: _elm_lang$core$Maybe$Just(isClosed),
									_1: isClosed ? A2(
										_elm_lang$virtual_dom$VirtualDom_Helpers$div,
										{ctor: '[]'},
										{ctor: '[]'}) : A2(
										_elm_lang$virtual_dom$VirtualDom_Helpers$map,
										A2(_elm_lang$virtual_dom$VirtualDom_Expando$Index, _elm_lang$virtual_dom$VirtualDom_Expando$None, 0),
										_elm_lang$virtual_dom$VirtualDom_Expando$viewRecordOpen(_p67._1))
								};
							default:
								return {
									ctor: '_Tuple2',
									_0: _elm_lang$core$Maybe$Just(isClosed),
									_1: isClosed ? A2(
										_elm_lang$virtual_dom$VirtualDom_Helpers$div,
										{ctor: '[]'},
										{ctor: '[]'}) : A2(
										_elm_lang$virtual_dom$VirtualDom_Helpers$map,
										A2(_elm_lang$virtual_dom$VirtualDom_Expando$Index, _elm_lang$virtual_dom$VirtualDom_Expando$None, 0),
										_elm_lang$virtual_dom$VirtualDom_Expando$viewConstructorOpen(_p67._2))
								};
						}
					} else {
						return {
							ctor: '_Tuple2',
							_0: _elm_lang$core$Maybe$Just(isClosed),
							_1: isClosed ? A2(
								_elm_lang$virtual_dom$VirtualDom_Helpers$div,
								{ctor: '[]'},
								{ctor: '[]'}) : _elm_lang$virtual_dom$VirtualDom_Expando$viewConstructorOpen(valueList)
						};
					}
				}
			}();
			var maybeIsClosed = _p65._0;
			var openHtml = _p65._1;
			var tinyArgs = A2(
				_elm_lang$core$List$map,
				function (_p68) {
					return _elm_lang$core$Tuple$second(
						_elm_lang$virtual_dom$VirtualDom_Expando$viewExtraTiny(_p68));
				},
				valueList);
			var description = function () {
				var _p69 = {ctor: '_Tuple2', _0: maybeName, _1: tinyArgs};
				if (_p69._0.ctor === 'Nothing') {
					if (_p69._1.ctor === '[]') {
						return {
							ctor: '::',
							_0: _elm_lang$virtual_dom$VirtualDom_Helpers$text('()'),
							_1: {ctor: '[]'}
						};
					} else {
						return {
							ctor: '::',
							_0: _elm_lang$virtual_dom$VirtualDom_Helpers$text('( '),
							_1: {
								ctor: '::',
								_0: A2(
									_elm_lang$virtual_dom$VirtualDom_Helpers$span,
									{ctor: '[]'},
									_p69._1._0),
								_1: A3(
									_elm_lang$core$List$foldr,
									F2(
										function (args, rest) {
											return {
												ctor: '::',
												_0: _elm_lang$virtual_dom$VirtualDom_Helpers$text(', '),
												_1: {
													ctor: '::',
													_0: A2(
														_elm_lang$virtual_dom$VirtualDom_Helpers$span,
														{ctor: '[]'},
														args),
													_1: rest
												}
											};
										}),
									{
										ctor: '::',
										_0: _elm_lang$virtual_dom$VirtualDom_Helpers$text(' )'),
										_1: {ctor: '[]'}
									},
									_p69._1._1)
							}
						};
					}
				} else {
					if (_p69._1.ctor === '[]') {
						return {
							ctor: '::',
							_0: _elm_lang$virtual_dom$VirtualDom_Helpers$text(_p69._0._0),
							_1: {ctor: '[]'}
						};
					} else {
						return {
							ctor: '::',
							_0: _elm_lang$virtual_dom$VirtualDom_Helpers$text(
								A2(_elm_lang$core$Basics_ops['++'], _p69._0._0, ' ')),
							_1: {
								ctor: '::',
								_0: A2(
									_elm_lang$virtual_dom$VirtualDom_Helpers$span,
									{ctor: '[]'},
									_p69._1._0),
								_1: A3(
									_elm_lang$core$List$foldr,
									F2(
										function (args, rest) {
											return {
												ctor: '::',
												_0: _elm_lang$virtual_dom$VirtualDom_Helpers$text(' '),
												_1: {
													ctor: '::',
													_0: A2(
														_elm_lang$virtual_dom$VirtualDom_Helpers$span,
														{ctor: '[]'},
														args),
													_1: rest
												}
											};
										}),
									{ctor: '[]'},
									_p69._1._1)
							}
						};
					}
				}
			}();
			return A2(
				_elm_lang$virtual_dom$VirtualDom_Helpers$div,
				{
					ctor: '::',
					_0: _elm_lang$virtual_dom$VirtualDom_Expando$leftPad(maybeKey),
					_1: {ctor: '[]'}
				},
				{
					ctor: '::',
					_0: A2(
						_elm_lang$virtual_dom$VirtualDom_Helpers$div,
						{
							ctor: '::',
							_0: _elm_lang$virtual_dom$VirtualDom_Helpers$onClick(_elm_lang$virtual_dom$VirtualDom_Expando$Toggle),
							_1: {ctor: '[]'}
						},
						A3(_elm_lang$virtual_dom$VirtualDom_Expando$lineStarter, maybeKey, maybeIsClosed, description)),
					_1: {
						ctor: '::',
						_0: openHtml,
						_1: {ctor: '[]'}
					}
				});
		});
	var _elm_lang$virtual_dom$VirtualDom_Expando$viewConstructorOpen = function (valueList) {
		return A2(
			_elm_lang$virtual_dom$VirtualDom_Helpers$div,
			{ctor: '[]'},
			A2(_elm_lang$core$List$indexedMap, _elm_lang$virtual_dom$VirtualDom_Expando$viewConstructorEntry, valueList));
	};
	var _elm_lang$virtual_dom$VirtualDom_Expando$viewDictionaryOpen = function (keyValuePairs) {
		return A2(
			_elm_lang$virtual_dom$VirtualDom_Helpers$div,
			{ctor: '[]'},
			A2(_elm_lang$core$List$indexedMap, _elm_lang$virtual_dom$VirtualDom_Expando$viewDictionaryEntry, keyValuePairs));
	};
	var _elm_lang$virtual_dom$VirtualDom_Expando$viewDictionaryEntry = F2(
		function (index, _p70) {
			var _p71 = _p70;
			var _p74 = _p71._1;
			var _p73 = _p71._0;
			var _p72 = _p73;
			switch (_p72.ctor) {
				case 'S':
					return A2(
						_elm_lang$virtual_dom$VirtualDom_Helpers$map,
						A2(_elm_lang$virtual_dom$VirtualDom_Expando$Index, _elm_lang$virtual_dom$VirtualDom_Expando$Value, index),
						A2(
							_elm_lang$virtual_dom$VirtualDom_Expando$view,
							_elm_lang$core$Maybe$Just(_p72._0),
							_p74));
				case 'Primitive':
					return A2(
						_elm_lang$virtual_dom$VirtualDom_Helpers$map,
						A2(_elm_lang$virtual_dom$VirtualDom_Expando$Index, _elm_lang$virtual_dom$VirtualDom_Expando$Value, index),
						A2(
							_elm_lang$virtual_dom$VirtualDom_Expando$view,
							_elm_lang$core$Maybe$Just(_p72._0),
							_p74));
				default:
					return A2(
						_elm_lang$virtual_dom$VirtualDom_Helpers$div,
						{ctor: '[]'},
						{
							ctor: '::',
							_0: A2(
								_elm_lang$virtual_dom$VirtualDom_Helpers$map,
								A2(_elm_lang$virtual_dom$VirtualDom_Expando$Index, _elm_lang$virtual_dom$VirtualDom_Expando$Key, index),
								A2(
									_elm_lang$virtual_dom$VirtualDom_Expando$view,
									_elm_lang$core$Maybe$Just('key'),
									_p73)),
							_1: {
								ctor: '::',
								_0: A2(
									_elm_lang$virtual_dom$VirtualDom_Helpers$map,
									A2(_elm_lang$virtual_dom$VirtualDom_Expando$Index, _elm_lang$virtual_dom$VirtualDom_Expando$Value, index),
									A2(
										_elm_lang$virtual_dom$VirtualDom_Expando$view,
										_elm_lang$core$Maybe$Just('value'),
										_p74)),
								_1: {ctor: '[]'}
							}
						});
			}
		});
	var _elm_lang$virtual_dom$VirtualDom_Expando$viewRecordOpen = function (record) {
		return A2(
			_elm_lang$virtual_dom$VirtualDom_Helpers$div,
			{ctor: '[]'},
			A2(
				_elm_lang$core$List$map,
				_elm_lang$virtual_dom$VirtualDom_Expando$viewRecordEntry,
				_elm_lang$core$Dict$toList(record)));
	};
	var _elm_lang$virtual_dom$VirtualDom_Expando$viewRecordEntry = function (_p75) {
		var _p76 = _p75;
		var _p77 = _p76._0;
		return A2(
			_elm_lang$virtual_dom$VirtualDom_Helpers$map,
			_elm_lang$virtual_dom$VirtualDom_Expando$Field(_p77),
			A2(
				_elm_lang$virtual_dom$VirtualDom_Expando$view,
				_elm_lang$core$Maybe$Just(_p77),
				_p76._1));
	};
	var _elm_lang$virtual_dom$VirtualDom_Expando$viewSequenceOpen = function (values) {
		return A2(
			_elm_lang$virtual_dom$VirtualDom_Helpers$div,
			{ctor: '[]'},
			A2(_elm_lang$core$List$indexedMap, _elm_lang$virtual_dom$VirtualDom_Expando$viewConstructorEntry, values));
	};
	var _elm_lang$virtual_dom$VirtualDom_Expando$viewDictionary = F3(
		function (maybeKey, isClosed, keyValuePairs) {
			var starter = A2(
				_elm_lang$core$Basics_ops['++'],
				'Dict(',
				A2(
					_elm_lang$core$Basics_ops['++'],
					_elm_lang$core$Basics$toString(
						_elm_lang$core$List$length(keyValuePairs)),
					')'));
			return A2(
				_elm_lang$virtual_dom$VirtualDom_Helpers$div,
				{
					ctor: '::',
					_0: _elm_lang$virtual_dom$VirtualDom_Expando$leftPad(maybeKey),
					_1: {ctor: '[]'}
				},
				{
					ctor: '::',
					_0: A2(
						_elm_lang$virtual_dom$VirtualDom_Helpers$div,
						{
							ctor: '::',
							_0: _elm_lang$virtual_dom$VirtualDom_Helpers$onClick(_elm_lang$virtual_dom$VirtualDom_Expando$Toggle),
							_1: {ctor: '[]'}
						},
						A3(
							_elm_lang$virtual_dom$VirtualDom_Expando$lineStarter,
							maybeKey,
							_elm_lang$core$Maybe$Just(isClosed),
							{
								ctor: '::',
								_0: _elm_lang$virtual_dom$VirtualDom_Helpers$text(starter),
								_1: {ctor: '[]'}
							})),
					_1: {
						ctor: '::',
						_0: isClosed ? _elm_lang$virtual_dom$VirtualDom_Helpers$text('') : _elm_lang$virtual_dom$VirtualDom_Expando$viewDictionaryOpen(keyValuePairs),
						_1: {ctor: '[]'}
					}
				});
		});
	var _elm_lang$virtual_dom$VirtualDom_Expando$viewRecord = F3(
		function (maybeKey, isClosed, record) {
			var _p78 = isClosed ? {
				ctor: '_Tuple3',
				_0: _elm_lang$core$Tuple$second(
					_elm_lang$virtual_dom$VirtualDom_Expando$viewTinyRecord(record)),
				_1: _elm_lang$virtual_dom$VirtualDom_Helpers$text(''),
				_2: _elm_lang$virtual_dom$VirtualDom_Helpers$text('')
			} : {
				ctor: '_Tuple3',
				_0: {
					ctor: '::',
					_0: _elm_lang$virtual_dom$VirtualDom_Helpers$text('{'),
					_1: {ctor: '[]'}
				},
				_1: _elm_lang$virtual_dom$VirtualDom_Expando$viewRecordOpen(record),
				_2: A2(
					_elm_lang$virtual_dom$VirtualDom_Helpers$div,
					{
						ctor: '::',
						_0: _elm_lang$virtual_dom$VirtualDom_Expando$leftPad(
							_elm_lang$core$Maybe$Just(
								{ctor: '_Tuple0'})),
						_1: {ctor: '[]'}
					},
					{
						ctor: '::',
						_0: _elm_lang$virtual_dom$VirtualDom_Helpers$text('}'),
						_1: {ctor: '[]'}
					})
			};
			var start = _p78._0;
			var middle = _p78._1;
			var end = _p78._2;
			return A2(
				_elm_lang$virtual_dom$VirtualDom_Helpers$div,
				{
					ctor: '::',
					_0: _elm_lang$virtual_dom$VirtualDom_Expando$leftPad(maybeKey),
					_1: {ctor: '[]'}
				},
				{
					ctor: '::',
					_0: A2(
						_elm_lang$virtual_dom$VirtualDom_Helpers$div,
						{
							ctor: '::',
							_0: _elm_lang$virtual_dom$VirtualDom_Helpers$onClick(_elm_lang$virtual_dom$VirtualDom_Expando$Toggle),
							_1: {ctor: '[]'}
						},
						A3(
							_elm_lang$virtual_dom$VirtualDom_Expando$lineStarter,
							maybeKey,
							_elm_lang$core$Maybe$Just(isClosed),
							start)),
					_1: {
						ctor: '::',
						_0: middle,
						_1: {
							ctor: '::',
							_0: end,
							_1: {ctor: '[]'}
						}
					}
				});
		});
	var _elm_lang$virtual_dom$VirtualDom_Expando$viewSequence = F4(
		function (maybeKey, seqType, isClosed, valueList) {
			var starter = A2(
				_elm_lang$virtual_dom$VirtualDom_Expando$seqTypeToString,
				_elm_lang$core$List$length(valueList),
				seqType);
			return A2(
				_elm_lang$virtual_dom$VirtualDom_Helpers$div,
				{
					ctor: '::',
					_0: _elm_lang$virtual_dom$VirtualDom_Expando$leftPad(maybeKey),
					_1: {ctor: '[]'}
				},
				{
					ctor: '::',
					_0: A2(
						_elm_lang$virtual_dom$VirtualDom_Helpers$div,
						{
							ctor: '::',
							_0: _elm_lang$virtual_dom$VirtualDom_Helpers$onClick(_elm_lang$virtual_dom$VirtualDom_Expando$Toggle),
							_1: {ctor: '[]'}
						},
						A3(
							_elm_lang$virtual_dom$VirtualDom_Expando$lineStarter,
							maybeKey,
							_elm_lang$core$Maybe$Just(isClosed),
							{
								ctor: '::',
								_0: _elm_lang$virtual_dom$VirtualDom_Helpers$text(starter),
								_1: {ctor: '[]'}
							})),
					_1: {
						ctor: '::',
						_0: isClosed ? _elm_lang$virtual_dom$VirtualDom_Helpers$text('') : _elm_lang$virtual_dom$VirtualDom_Expando$viewSequenceOpen(valueList),
						_1: {ctor: '[]'}
					}
				});
		});
	
	var _elm_lang$virtual_dom$VirtualDom_Report$some = function (list) {
		return !_elm_lang$core$List$isEmpty(list);
	};
	var _elm_lang$virtual_dom$VirtualDom_Report$TagChanges = F4(
		function (a, b, c, d) {
			return {removed: a, changed: b, added: c, argsMatch: d};
		});
	var _elm_lang$virtual_dom$VirtualDom_Report$emptyTagChanges = function (argsMatch) {
		return A4(
			_elm_lang$virtual_dom$VirtualDom_Report$TagChanges,
			{ctor: '[]'},
			{ctor: '[]'},
			{ctor: '[]'},
			argsMatch);
	};
	var _elm_lang$virtual_dom$VirtualDom_Report$hasTagChanges = function (tagChanges) {
		return _elm_lang$core$Native_Utils.eq(
			tagChanges,
			A4(
				_elm_lang$virtual_dom$VirtualDom_Report$TagChanges,
				{ctor: '[]'},
				{ctor: '[]'},
				{ctor: '[]'},
				true));
	};
	var _elm_lang$virtual_dom$VirtualDom_Report$SomethingChanged = function (a) {
		return {ctor: 'SomethingChanged', _0: a};
	};
	var _elm_lang$virtual_dom$VirtualDom_Report$MessageChanged = F2(
		function (a, b) {
			return {ctor: 'MessageChanged', _0: a, _1: b};
		});
	var _elm_lang$virtual_dom$VirtualDom_Report$VersionChanged = F2(
		function (a, b) {
			return {ctor: 'VersionChanged', _0: a, _1: b};
		});
	var _elm_lang$virtual_dom$VirtualDom_Report$CorruptHistory = {ctor: 'CorruptHistory'};
	var _elm_lang$virtual_dom$VirtualDom_Report$UnionChange = F2(
		function (a, b) {
			return {ctor: 'UnionChange', _0: a, _1: b};
		});
	var _elm_lang$virtual_dom$VirtualDom_Report$AliasChange = function (a) {
		return {ctor: 'AliasChange', _0: a};
	};
	var _elm_lang$virtual_dom$VirtualDom_Report$Fine = {ctor: 'Fine'};
	var _elm_lang$virtual_dom$VirtualDom_Report$Risky = {ctor: 'Risky'};
	var _elm_lang$virtual_dom$VirtualDom_Report$Impossible = {ctor: 'Impossible'};
	var _elm_lang$virtual_dom$VirtualDom_Report$worstCase = F2(
		function (status, statusList) {
			worstCase:
			while (true) {
				var _p0 = statusList;
				if (_p0.ctor === '[]') {
					return status;
				} else {
					switch (_p0._0.ctor) {
						case 'Impossible':
							return _elm_lang$virtual_dom$VirtualDom_Report$Impossible;
						case 'Risky':
							var _v1 = _elm_lang$virtual_dom$VirtualDom_Report$Risky,
								_v2 = _p0._1;
							status = _v1;
							statusList = _v2;
							continue worstCase;
						default:
							var _v3 = status,
								_v4 = _p0._1;
							status = _v3;
							statusList = _v4;
							continue worstCase;
					}
				}
			}
		});
	var _elm_lang$virtual_dom$VirtualDom_Report$evaluateChange = function (change) {
		var _p1 = change;
		if (_p1.ctor === 'AliasChange') {
			return _elm_lang$virtual_dom$VirtualDom_Report$Impossible;
		} else {
			return ((!_p1._1.argsMatch) || (_elm_lang$virtual_dom$VirtualDom_Report$some(_p1._1.changed) || _elm_lang$virtual_dom$VirtualDom_Report$some(_p1._1.removed))) ? _elm_lang$virtual_dom$VirtualDom_Report$Impossible : (_elm_lang$virtual_dom$VirtualDom_Report$some(_p1._1.added) ? _elm_lang$virtual_dom$VirtualDom_Report$Risky : _elm_lang$virtual_dom$VirtualDom_Report$Fine);
		}
	};
	var _elm_lang$virtual_dom$VirtualDom_Report$evaluate = function (report) {
		var _p2 = report;
		switch (_p2.ctor) {
			case 'CorruptHistory':
				return _elm_lang$virtual_dom$VirtualDom_Report$Impossible;
			case 'VersionChanged':
				return _elm_lang$virtual_dom$VirtualDom_Report$Impossible;
			case 'MessageChanged':
				return _elm_lang$virtual_dom$VirtualDom_Report$Impossible;
			default:
				return A2(
					_elm_lang$virtual_dom$VirtualDom_Report$worstCase,
					_elm_lang$virtual_dom$VirtualDom_Report$Fine,
					A2(_elm_lang$core$List$map, _elm_lang$virtual_dom$VirtualDom_Report$evaluateChange, _p2._0));
		}
	};
	
	var _elm_lang$virtual_dom$VirtualDom_Metadata$encodeDict = F2(
		function (f, dict) {
			return _elm_lang$core$Json_Encode$object(
				_elm_lang$core$Dict$toList(
					A2(
						_elm_lang$core$Dict$map,
						F2(
							function (key, value) {
								return f(value);
							}),
						dict)));
		});
	var _elm_lang$virtual_dom$VirtualDom_Metadata$encodeUnion = function (_p0) {
		var _p1 = _p0;
		return _elm_lang$core$Json_Encode$object(
			{
				ctor: '::',
				_0: {
					ctor: '_Tuple2',
					_0: 'args',
					_1: _elm_lang$core$Json_Encode$list(
						A2(_elm_lang$core$List$map, _elm_lang$core$Json_Encode$string, _p1.args))
				},
				_1: {
					ctor: '::',
					_0: {
						ctor: '_Tuple2',
						_0: 'tags',
						_1: A2(
							_elm_lang$virtual_dom$VirtualDom_Metadata$encodeDict,
							function (_p2) {
								return _elm_lang$core$Json_Encode$list(
									A2(_elm_lang$core$List$map, _elm_lang$core$Json_Encode$string, _p2));
							},
							_p1.tags)
					},
					_1: {ctor: '[]'}
				}
			});
	};
	var _elm_lang$virtual_dom$VirtualDom_Metadata$encodeAlias = function (_p3) {
		var _p4 = _p3;
		return _elm_lang$core$Json_Encode$object(
			{
				ctor: '::',
				_0: {
					ctor: '_Tuple2',
					_0: 'args',
					_1: _elm_lang$core$Json_Encode$list(
						A2(_elm_lang$core$List$map, _elm_lang$core$Json_Encode$string, _p4.args))
				},
				_1: {
					ctor: '::',
					_0: {
						ctor: '_Tuple2',
						_0: 'type',
						_1: _elm_lang$core$Json_Encode$string(_p4.tipe)
					},
					_1: {ctor: '[]'}
				}
			});
	};
	var _elm_lang$virtual_dom$VirtualDom_Metadata$encodeTypes = function (_p5) {
		var _p6 = _p5;
		return _elm_lang$core$Json_Encode$object(
			{
				ctor: '::',
				_0: {
					ctor: '_Tuple2',
					_0: 'message',
					_1: _elm_lang$core$Json_Encode$string(_p6.message)
				},
				_1: {
					ctor: '::',
					_0: {
						ctor: '_Tuple2',
						_0: 'aliases',
						_1: A2(_elm_lang$virtual_dom$VirtualDom_Metadata$encodeDict, _elm_lang$virtual_dom$VirtualDom_Metadata$encodeAlias, _p6.aliases)
					},
					_1: {
						ctor: '::',
						_0: {
							ctor: '_Tuple2',
							_0: 'unions',
							_1: A2(_elm_lang$virtual_dom$VirtualDom_Metadata$encodeDict, _elm_lang$virtual_dom$VirtualDom_Metadata$encodeUnion, _p6.unions)
						},
						_1: {ctor: '[]'}
					}
				}
			});
	};
	var _elm_lang$virtual_dom$VirtualDom_Metadata$encodeVersions = function (_p7) {
		var _p8 = _p7;
		return _elm_lang$core$Json_Encode$object(
			{
				ctor: '::',
				_0: {
					ctor: '_Tuple2',
					_0: 'elm',
					_1: _elm_lang$core$Json_Encode$string(_p8.elm)
				},
				_1: {ctor: '[]'}
			});
	};
	var _elm_lang$virtual_dom$VirtualDom_Metadata$encode = function (_p9) {
		var _p10 = _p9;
		return _elm_lang$core$Json_Encode$object(
			{
				ctor: '::',
				_0: {
					ctor: '_Tuple2',
					_0: 'versions',
					_1: _elm_lang$virtual_dom$VirtualDom_Metadata$encodeVersions(_p10.versions)
				},
				_1: {
					ctor: '::',
					_0: {
						ctor: '_Tuple2',
						_0: 'types',
						_1: _elm_lang$virtual_dom$VirtualDom_Metadata$encodeTypes(_p10.types)
					},
					_1: {ctor: '[]'}
				}
			});
	};
	var _elm_lang$virtual_dom$VirtualDom_Metadata$checkTag = F4(
		function (tag, old, $new, changes) {
			return _elm_lang$core$Native_Utils.eq(old, $new) ? changes : _elm_lang$core$Native_Utils.update(
				changes,
				{
					changed: {ctor: '::', _0: tag, _1: changes.changed}
				});
		});
	var _elm_lang$virtual_dom$VirtualDom_Metadata$addTag = F3(
		function (tag, _p11, changes) {
			return _elm_lang$core$Native_Utils.update(
				changes,
				{
					added: {ctor: '::', _0: tag, _1: changes.added}
				});
		});
	var _elm_lang$virtual_dom$VirtualDom_Metadata$removeTag = F3(
		function (tag, _p12, changes) {
			return _elm_lang$core$Native_Utils.update(
				changes,
				{
					removed: {ctor: '::', _0: tag, _1: changes.removed}
				});
		});
	var _elm_lang$virtual_dom$VirtualDom_Metadata$checkUnion = F4(
		function (name, old, $new, changes) {
			var tagChanges = A6(
				_elm_lang$core$Dict$merge,
				_elm_lang$virtual_dom$VirtualDom_Metadata$removeTag,
				_elm_lang$virtual_dom$VirtualDom_Metadata$checkTag,
				_elm_lang$virtual_dom$VirtualDom_Metadata$addTag,
				old.tags,
				$new.tags,
				_elm_lang$virtual_dom$VirtualDom_Report$emptyTagChanges(
					_elm_lang$core$Native_Utils.eq(old.args, $new.args)));
			return _elm_lang$virtual_dom$VirtualDom_Report$hasTagChanges(tagChanges) ? changes : {
				ctor: '::',
				_0: A2(_elm_lang$virtual_dom$VirtualDom_Report$UnionChange, name, tagChanges),
				_1: changes
			};
		});
	var _elm_lang$virtual_dom$VirtualDom_Metadata$checkAlias = F4(
		function (name, old, $new, changes) {
			return (_elm_lang$core$Native_Utils.eq(old.tipe, $new.tipe) && _elm_lang$core$Native_Utils.eq(old.args, $new.args)) ? changes : {
				ctor: '::',
				_0: _elm_lang$virtual_dom$VirtualDom_Report$AliasChange(name),
				_1: changes
			};
		});
	var _elm_lang$virtual_dom$VirtualDom_Metadata$ignore = F3(
		function (key, value, report) {
			return report;
		});
	var _elm_lang$virtual_dom$VirtualDom_Metadata$checkTypes = F2(
		function (old, $new) {
			return (!_elm_lang$core$Native_Utils.eq(old.message, $new.message)) ? A2(_elm_lang$virtual_dom$VirtualDom_Report$MessageChanged, old.message, $new.message) : _elm_lang$virtual_dom$VirtualDom_Report$SomethingChanged(
				A6(
					_elm_lang$core$Dict$merge,
					_elm_lang$virtual_dom$VirtualDom_Metadata$ignore,
					_elm_lang$virtual_dom$VirtualDom_Metadata$checkUnion,
					_elm_lang$virtual_dom$VirtualDom_Metadata$ignore,
					old.unions,
					$new.unions,
					A6(
						_elm_lang$core$Dict$merge,
						_elm_lang$virtual_dom$VirtualDom_Metadata$ignore,
						_elm_lang$virtual_dom$VirtualDom_Metadata$checkAlias,
						_elm_lang$virtual_dom$VirtualDom_Metadata$ignore,
						old.aliases,
						$new.aliases,
						{ctor: '[]'})));
		});
	var _elm_lang$virtual_dom$VirtualDom_Metadata$check = F2(
		function (old, $new) {
			return (!_elm_lang$core$Native_Utils.eq(old.versions.elm, $new.versions.elm)) ? A2(_elm_lang$virtual_dom$VirtualDom_Report$VersionChanged, old.versions.elm, $new.versions.elm) : A2(_elm_lang$virtual_dom$VirtualDom_Metadata$checkTypes, old.types, $new.types);
		});
	var _elm_lang$virtual_dom$VirtualDom_Metadata$hasProblem = F2(
		function (tipe, _p13) {
			var _p14 = _p13;
			return A2(_elm_lang$core$String$contains, _p14._1, tipe) ? _elm_lang$core$Maybe$Just(_p14._0) : _elm_lang$core$Maybe$Nothing;
		});
	var _elm_lang$virtual_dom$VirtualDom_Metadata$Metadata = F2(
		function (a, b) {
			return {versions: a, types: b};
		});
	var _elm_lang$virtual_dom$VirtualDom_Metadata$Versions = function (a) {
		return {elm: a};
	};
	var _elm_lang$virtual_dom$VirtualDom_Metadata$decodeVersions = A2(
		_elm_lang$core$Json_Decode$map,
		_elm_lang$virtual_dom$VirtualDom_Metadata$Versions,
		A2(_elm_lang$core$Json_Decode$field, 'elm', _elm_lang$core$Json_Decode$string));
	var _elm_lang$virtual_dom$VirtualDom_Metadata$Types = F3(
		function (a, b, c) {
			return {message: a, aliases: b, unions: c};
		});
	var _elm_lang$virtual_dom$VirtualDom_Metadata$Alias = F2(
		function (a, b) {
			return {args: a, tipe: b};
		});
	var _elm_lang$virtual_dom$VirtualDom_Metadata$decodeAlias = A3(
		_elm_lang$core$Json_Decode$map2,
		_elm_lang$virtual_dom$VirtualDom_Metadata$Alias,
		A2(
			_elm_lang$core$Json_Decode$field,
			'args',
			_elm_lang$core$Json_Decode$list(_elm_lang$core$Json_Decode$string)),
		A2(_elm_lang$core$Json_Decode$field, 'type', _elm_lang$core$Json_Decode$string));
	var _elm_lang$virtual_dom$VirtualDom_Metadata$Union = F2(
		function (a, b) {
			return {args: a, tags: b};
		});
	var _elm_lang$virtual_dom$VirtualDom_Metadata$decodeUnion = A3(
		_elm_lang$core$Json_Decode$map2,
		_elm_lang$virtual_dom$VirtualDom_Metadata$Union,
		A2(
			_elm_lang$core$Json_Decode$field,
			'args',
			_elm_lang$core$Json_Decode$list(_elm_lang$core$Json_Decode$string)),
		A2(
			_elm_lang$core$Json_Decode$field,
			'tags',
			_elm_lang$core$Json_Decode$dict(
				_elm_lang$core$Json_Decode$list(_elm_lang$core$Json_Decode$string))));
	var _elm_lang$virtual_dom$VirtualDom_Metadata$decodeTypes = A4(
		_elm_lang$core$Json_Decode$map3,
		_elm_lang$virtual_dom$VirtualDom_Metadata$Types,
		A2(_elm_lang$core$Json_Decode$field, 'message', _elm_lang$core$Json_Decode$string),
		A2(
			_elm_lang$core$Json_Decode$field,
			'aliases',
			_elm_lang$core$Json_Decode$dict(_elm_lang$virtual_dom$VirtualDom_Metadata$decodeAlias)),
		A2(
			_elm_lang$core$Json_Decode$field,
			'unions',
			_elm_lang$core$Json_Decode$dict(_elm_lang$virtual_dom$VirtualDom_Metadata$decodeUnion)));
	var _elm_lang$virtual_dom$VirtualDom_Metadata$decoder = A3(
		_elm_lang$core$Json_Decode$map2,
		_elm_lang$virtual_dom$VirtualDom_Metadata$Metadata,
		A2(_elm_lang$core$Json_Decode$field, 'versions', _elm_lang$virtual_dom$VirtualDom_Metadata$decodeVersions),
		A2(_elm_lang$core$Json_Decode$field, 'types', _elm_lang$virtual_dom$VirtualDom_Metadata$decodeTypes));
	var _elm_lang$virtual_dom$VirtualDom_Metadata$Error = F2(
		function (a, b) {
			return {message: a, problems: b};
		});
	var _elm_lang$virtual_dom$VirtualDom_Metadata$ProblemType = F2(
		function (a, b) {
			return {name: a, problems: b};
		});
	var _elm_lang$virtual_dom$VirtualDom_Metadata$VirtualDom = {ctor: 'VirtualDom'};
	var _elm_lang$virtual_dom$VirtualDom_Metadata$Program = {ctor: 'Program'};
	var _elm_lang$virtual_dom$VirtualDom_Metadata$Request = {ctor: 'Request'};
	var _elm_lang$virtual_dom$VirtualDom_Metadata$Socket = {ctor: 'Socket'};
	var _elm_lang$virtual_dom$VirtualDom_Metadata$Process = {ctor: 'Process'};
	var _elm_lang$virtual_dom$VirtualDom_Metadata$Task = {ctor: 'Task'};
	var _elm_lang$virtual_dom$VirtualDom_Metadata$Decoder = {ctor: 'Decoder'};
	var _elm_lang$virtual_dom$VirtualDom_Metadata$Function = {ctor: 'Function'};
	var _elm_lang$virtual_dom$VirtualDom_Metadata$problemTable = {
		ctor: '::',
		_0: {ctor: '_Tuple2', _0: _elm_lang$virtual_dom$VirtualDom_Metadata$Function, _1: '->'},
		_1: {
			ctor: '::',
			_0: {ctor: '_Tuple2', _0: _elm_lang$virtual_dom$VirtualDom_Metadata$Decoder, _1: 'Json.Decode.Decoder'},
			_1: {
				ctor: '::',
				_0: {ctor: '_Tuple2', _0: _elm_lang$virtual_dom$VirtualDom_Metadata$Task, _1: 'Task.Task'},
				_1: {
					ctor: '::',
					_0: {ctor: '_Tuple2', _0: _elm_lang$virtual_dom$VirtualDom_Metadata$Process, _1: 'Process.Id'},
					_1: {
						ctor: '::',
						_0: {ctor: '_Tuple2', _0: _elm_lang$virtual_dom$VirtualDom_Metadata$Socket, _1: 'WebSocket.LowLevel.WebSocket'},
						_1: {
							ctor: '::',
							_0: {ctor: '_Tuple2', _0: _elm_lang$virtual_dom$VirtualDom_Metadata$Request, _1: 'Http.Request'},
							_1: {
								ctor: '::',
								_0: {ctor: '_Tuple2', _0: _elm_lang$virtual_dom$VirtualDom_Metadata$Program, _1: 'Platform.Program'},
								_1: {
									ctor: '::',
									_0: {ctor: '_Tuple2', _0: _elm_lang$virtual_dom$VirtualDom_Metadata$VirtualDom, _1: 'VirtualDom.Node'},
									_1: {
										ctor: '::',
										_0: {ctor: '_Tuple2', _0: _elm_lang$virtual_dom$VirtualDom_Metadata$VirtualDom, _1: 'VirtualDom.Attribute'},
										_1: {ctor: '[]'}
									}
								}
							}
						}
					}
				}
			}
		}
	};
	var _elm_lang$virtual_dom$VirtualDom_Metadata$findProblems = function (tipe) {
		return A2(
			_elm_lang$core$List$filterMap,
			_elm_lang$virtual_dom$VirtualDom_Metadata$hasProblem(tipe),
			_elm_lang$virtual_dom$VirtualDom_Metadata$problemTable);
	};
	var _elm_lang$virtual_dom$VirtualDom_Metadata$collectBadAliases = F3(
		function (name, _p15, list) {
			var _p16 = _p15;
			var _p17 = _elm_lang$virtual_dom$VirtualDom_Metadata$findProblems(_p16.tipe);
			if (_p17.ctor === '[]') {
				return list;
			} else {
				return {
					ctor: '::',
					_0: A2(_elm_lang$virtual_dom$VirtualDom_Metadata$ProblemType, name, _p17),
					_1: list
				};
			}
		});
	var _elm_lang$virtual_dom$VirtualDom_Metadata$collectBadUnions = F3(
		function (name, _p18, list) {
			var _p19 = _p18;
			var _p20 = A2(
				_elm_lang$core$List$concatMap,
				_elm_lang$virtual_dom$VirtualDom_Metadata$findProblems,
				_elm_lang$core$List$concat(
					_elm_lang$core$Dict$values(_p19.tags)));
			if (_p20.ctor === '[]') {
				return list;
			} else {
				return {
					ctor: '::',
					_0: A2(_elm_lang$virtual_dom$VirtualDom_Metadata$ProblemType, name, _p20),
					_1: list
				};
			}
		});
	var _elm_lang$virtual_dom$VirtualDom_Metadata$isPortable = function (_p21) {
		var _p22 = _p21;
		var _p24 = _p22.types;
		var badAliases = A3(
			_elm_lang$core$Dict$foldl,
			_elm_lang$virtual_dom$VirtualDom_Metadata$collectBadAliases,
			{ctor: '[]'},
			_p24.aliases);
		var _p23 = A3(_elm_lang$core$Dict$foldl, _elm_lang$virtual_dom$VirtualDom_Metadata$collectBadUnions, badAliases, _p24.unions);
		if (_p23.ctor === '[]') {
			return _elm_lang$core$Maybe$Nothing;
		} else {
			return _elm_lang$core$Maybe$Just(
				A2(_elm_lang$virtual_dom$VirtualDom_Metadata$Error, _p24.message, _p23));
		}
	};
	var _elm_lang$virtual_dom$VirtualDom_Metadata$decode = function (value) {
		var _p25 = A2(_elm_lang$core$Json_Decode$decodeValue, _elm_lang$virtual_dom$VirtualDom_Metadata$decoder, value);
		if (_p25.ctor === 'Err') {
			return _elm_lang$core$Native_Utils.crashCase(
				'VirtualDom.Metadata',
				{
					start: {line: 229, column: 3},
					end: {line: 239, column: 20}
				},
				_p25)('Compiler is generating bad metadata. Report this at <https://github.com/elm-lang/virtual-dom/issues>.');
		} else {
			var _p28 = _p25._0;
			var _p27 = _elm_lang$virtual_dom$VirtualDom_Metadata$isPortable(_p28);
			if (_p27.ctor === 'Nothing') {
				return _elm_lang$core$Result$Ok(_p28);
			} else {
				return _elm_lang$core$Result$Err(_p27._0);
			}
		}
	};
	
	var _elm_lang$virtual_dom$VirtualDom_History$viewMessage = F3(
		function (currentIndex, index, msg) {
			var className = _elm_lang$core$Native_Utils.eq(currentIndex, index) ? 'messages-entry messages-entry-selected' : 'messages-entry';
			return A2(
				_elm_lang$virtual_dom$VirtualDom_Helpers$div,
				{
					ctor: '::',
					_0: _elm_lang$virtual_dom$VirtualDom_Helpers$class(className),
					_1: {
						ctor: '::',
						_0: A2(
							_elm_lang$virtual_dom$VirtualDom_Helpers$on,
							'click',
							_elm_lang$core$Json_Decode$succeed(index)),
						_1: {ctor: '[]'}
					}
				},
				{
					ctor: '::',
					_0: A2(
						_elm_lang$virtual_dom$VirtualDom_Helpers$span,
						{
							ctor: '::',
							_0: _elm_lang$virtual_dom$VirtualDom_Helpers$class('messages-entry-content'),
							_1: {ctor: '[]'}
						},
						{
							ctor: '::',
							_0: _elm_lang$virtual_dom$VirtualDom_Helpers$text(
								_elm_lang$virtual_dom$Native_Debug.messageToString(msg)),
							_1: {ctor: '[]'}
						}),
					_1: {
						ctor: '::',
						_0: A2(
							_elm_lang$virtual_dom$VirtualDom_Helpers$span,
							{
								ctor: '::',
								_0: _elm_lang$virtual_dom$VirtualDom_Helpers$class('messages-entry-index'),
								_1: {ctor: '[]'}
							},
							{
								ctor: '::',
								_0: _elm_lang$virtual_dom$VirtualDom_Helpers$text(
									_elm_lang$core$Basics$toString(index)),
								_1: {ctor: '[]'}
							}),
						_1: {ctor: '[]'}
					}
				});
		});
	var _elm_lang$virtual_dom$VirtualDom_History$consMsg = F3(
		function (currentIndex, msg, _p0) {
			var _p1 = _p0;
			var _p2 = _p1._0;
			return {
				ctor: '_Tuple2',
				_0: _p2 - 1,
				_1: {
					ctor: '::',
					_0: A4(_elm_lang$virtual_dom$VirtualDom_Helpers$lazy3, _elm_lang$virtual_dom$VirtualDom_History$viewMessage, currentIndex, _p2, msg),
					_1: _p1._1
				}
			};
		});
	var _elm_lang$virtual_dom$VirtualDom_History$viewSnapshot = F3(
		function (currentIndex, index, _p3) {
			var _p4 = _p3;
			return A2(
				_elm_lang$virtual_dom$VirtualDom_Helpers$div,
				{ctor: '[]'},
				_elm_lang$core$Tuple$second(
					A3(
						_elm_lang$core$Array$foldl,
						_elm_lang$virtual_dom$VirtualDom_History$consMsg(currentIndex),
						{
							ctor: '_Tuple2',
							_0: index - 1,
							_1: {ctor: '[]'}
						},
						_p4.messages)));
		});
	var _elm_lang$virtual_dom$VirtualDom_History$undone = function (getResult) {
		var _p5 = getResult;
		if (_p5.ctor === 'Done') {
			return {ctor: '_Tuple2', _0: _p5._1, _1: _p5._0};
		} else {
			return _elm_lang$core$Native_Utils.crashCase(
				'VirtualDom.History',
				{
					start: {line: 195, column: 3},
					end: {line: 200, column: 39}
				},
				_p5)('Bug in History.get');
		}
	};
	var _elm_lang$virtual_dom$VirtualDom_History$elmToJs = _elm_lang$virtual_dom$Native_Debug.unsafeCoerce;
	var _elm_lang$virtual_dom$VirtualDom_History$encodeHelp = F2(
		function (snapshot, allMessages) {
			return A3(
				_elm_lang$core$Array$foldl,
				F2(
					function (elm, msgs) {
						return {
							ctor: '::',
							_0: _elm_lang$virtual_dom$VirtualDom_History$elmToJs(elm),
							_1: msgs
						};
					}),
				allMessages,
				snapshot.messages);
		});
	var _elm_lang$virtual_dom$VirtualDom_History$encode = function (_p7) {
		var _p8 = _p7;
		var recentJson = A2(
			_elm_lang$core$List$map,
			_elm_lang$virtual_dom$VirtualDom_History$elmToJs,
			_elm_lang$core$List$reverse(_p8.recent.messages));
		return _elm_lang$core$Json_Encode$list(
			A3(_elm_lang$core$Array$foldr, _elm_lang$virtual_dom$VirtualDom_History$encodeHelp, recentJson, _p8.snapshots));
	};
	var _elm_lang$virtual_dom$VirtualDom_History$jsToElm = _elm_lang$virtual_dom$Native_Debug.unsafeCoerce;
	var _elm_lang$virtual_dom$VirtualDom_History$initialModel = function (_p9) {
		var _p10 = _p9;
		var _p11 = A2(_elm_lang$core$Array$get, 0, _p10.snapshots);
		if (_p11.ctor === 'Just') {
			return _p11._0.model;
		} else {
			return _p10.recent.model;
		}
	};
	var _elm_lang$virtual_dom$VirtualDom_History$size = function (history) {
		return history.numMessages;
	};
	var _elm_lang$virtual_dom$VirtualDom_History$maxSnapshotSize = 64;
	var _elm_lang$virtual_dom$VirtualDom_History$consSnapshot = F3(
		function (currentIndex, snapshot, _p12) {
			var _p13 = _p12;
			var _p14 = _p13._0;
			var nextIndex = _p14 - _elm_lang$virtual_dom$VirtualDom_History$maxSnapshotSize;
			var currentIndexHelp = ((_elm_lang$core$Native_Utils.cmp(nextIndex, currentIndex) < 1) && (_elm_lang$core$Native_Utils.cmp(currentIndex, _p14) < 0)) ? currentIndex : -1;
			return {
				ctor: '_Tuple2',
				_0: _p14 - _elm_lang$virtual_dom$VirtualDom_History$maxSnapshotSize,
				_1: {
					ctor: '::',
					_0: A4(_elm_lang$virtual_dom$VirtualDom_Helpers$lazy3, _elm_lang$virtual_dom$VirtualDom_History$viewSnapshot, currentIndexHelp, _p14, snapshot),
					_1: _p13._1
				}
			};
		});
	var _elm_lang$virtual_dom$VirtualDom_History$viewSnapshots = F2(
		function (currentIndex, snapshots) {
			var highIndex = _elm_lang$virtual_dom$VirtualDom_History$maxSnapshotSize * _elm_lang$core$Array$length(snapshots);
			return A2(
				_elm_lang$virtual_dom$VirtualDom_Helpers$div,
				{ctor: '[]'},
				_elm_lang$core$Tuple$second(
					A3(
						_elm_lang$core$Array$foldr,
						_elm_lang$virtual_dom$VirtualDom_History$consSnapshot(currentIndex),
						{
							ctor: '_Tuple2',
							_0: highIndex,
							_1: {ctor: '[]'}
						},
						snapshots)));
		});
	var _elm_lang$virtual_dom$VirtualDom_History$view = F2(
		function (maybeIndex, _p15) {
			var _p16 = _p15;
			var _p17 = function () {
				var _p18 = maybeIndex;
				if (_p18.ctor === 'Nothing') {
					return {ctor: '_Tuple2', _0: -1, _1: 'debugger-sidebar-messages'};
				} else {
					return {ctor: '_Tuple2', _0: _p18._0, _1: 'debugger-sidebar-messages-paused'};
				}
			}();
			var index = _p17._0;
			var className = _p17._1;
			var oldStuff = A3(_elm_lang$virtual_dom$VirtualDom_Helpers$lazy2, _elm_lang$virtual_dom$VirtualDom_History$viewSnapshots, index, _p16.snapshots);
			var newStuff = _elm_lang$core$Tuple$second(
				A3(
					_elm_lang$core$List$foldl,
					_elm_lang$virtual_dom$VirtualDom_History$consMsg(index),
					{
						ctor: '_Tuple2',
						_0: _p16.numMessages - 1,
						_1: {ctor: '[]'}
					},
					_p16.recent.messages));
			return A2(
				_elm_lang$virtual_dom$VirtualDom_Helpers$div,
				{
					ctor: '::',
					_0: _elm_lang$virtual_dom$VirtualDom_Helpers$class(className),
					_1: {ctor: '[]'}
				},
				{ctor: '::', _0: oldStuff, _1: newStuff});
		});
	var _elm_lang$virtual_dom$VirtualDom_History$History = F3(
		function (a, b, c) {
			return {snapshots: a, recent: b, numMessages: c};
		});
	var _elm_lang$virtual_dom$VirtualDom_History$RecentHistory = F3(
		function (a, b, c) {
			return {model: a, messages: b, numMessages: c};
		});
	var _elm_lang$virtual_dom$VirtualDom_History$empty = function (model) {
		return A3(
			_elm_lang$virtual_dom$VirtualDom_History$History,
			_elm_lang$core$Array$empty,
			A3(
				_elm_lang$virtual_dom$VirtualDom_History$RecentHistory,
				model,
				{ctor: '[]'},
				0),
			0);
	};
	var _elm_lang$virtual_dom$VirtualDom_History$Snapshot = F2(
		function (a, b) {
			return {model: a, messages: b};
		});
	var _elm_lang$virtual_dom$VirtualDom_History$addRecent = F3(
		function (msg, newModel, _p19) {
			var _p20 = _p19;
			var _p23 = _p20.numMessages;
			var _p22 = _p20.model;
			var _p21 = _p20.messages;
			return _elm_lang$core$Native_Utils.eq(_p23, _elm_lang$virtual_dom$VirtualDom_History$maxSnapshotSize) ? {
				ctor: '_Tuple2',
				_0: _elm_lang$core$Maybe$Just(
					A2(
						_elm_lang$virtual_dom$VirtualDom_History$Snapshot,
						_p22,
						_elm_lang$core$Array$fromList(_p21))),
				_1: A3(
					_elm_lang$virtual_dom$VirtualDom_History$RecentHistory,
					newModel,
					{
						ctor: '::',
						_0: msg,
						_1: {ctor: '[]'}
					},
					1)
			} : {
				ctor: '_Tuple2',
				_0: _elm_lang$core$Maybe$Nothing,
				_1: A3(
					_elm_lang$virtual_dom$VirtualDom_History$RecentHistory,
					_p22,
					{ctor: '::', _0: msg, _1: _p21},
					_p23 + 1)
			};
		});
	var _elm_lang$virtual_dom$VirtualDom_History$add = F3(
		function (msg, model, _p24) {
			var _p25 = _p24;
			var _p28 = _p25.snapshots;
			var _p27 = _p25.numMessages;
			var _p26 = A3(_elm_lang$virtual_dom$VirtualDom_History$addRecent, msg, model, _p25.recent);
			if (_p26._0.ctor === 'Just') {
				return A3(
					_elm_lang$virtual_dom$VirtualDom_History$History,
					A2(_elm_lang$core$Array$push, _p26._0._0, _p28),
					_p26._1,
					_p27 + 1);
			} else {
				return A3(_elm_lang$virtual_dom$VirtualDom_History$History, _p28, _p26._1, _p27 + 1);
			}
		});
	var _elm_lang$virtual_dom$VirtualDom_History$decoder = F2(
		function (initialModel, update) {
			var addMessage = F2(
				function (rawMsg, _p29) {
					var _p30 = _p29;
					var _p31 = _p30._0;
					var msg = _elm_lang$virtual_dom$VirtualDom_History$jsToElm(rawMsg);
					return {
						ctor: '_Tuple2',
						_0: A2(update, msg, _p31),
						_1: A3(_elm_lang$virtual_dom$VirtualDom_History$add, msg, _p31, _p30._1)
					};
				});
			var updateModel = function (rawMsgs) {
				return A3(
					_elm_lang$core$List$foldl,
					addMessage,
					{
						ctor: '_Tuple2',
						_0: initialModel,
						_1: _elm_lang$virtual_dom$VirtualDom_History$empty(initialModel)
					},
					rawMsgs);
			};
			return A2(
				_elm_lang$core$Json_Decode$map,
				updateModel,
				_elm_lang$core$Json_Decode$list(_elm_lang$core$Json_Decode$value));
		});
	var _elm_lang$virtual_dom$VirtualDom_History$Done = F2(
		function (a, b) {
			return {ctor: 'Done', _0: a, _1: b};
		});
	var _elm_lang$virtual_dom$VirtualDom_History$Stepping = F2(
		function (a, b) {
			return {ctor: 'Stepping', _0: a, _1: b};
		});
	var _elm_lang$virtual_dom$VirtualDom_History$getHelp = F3(
		function (update, msg, getResult) {
			var _p32 = getResult;
			if (_p32.ctor === 'Done') {
				return getResult;
			} else {
				var _p34 = _p32._0;
				var _p33 = _p32._1;
				return _elm_lang$core$Native_Utils.eq(_p34, 0) ? A2(
					_elm_lang$virtual_dom$VirtualDom_History$Done,
					msg,
					_elm_lang$core$Tuple$first(
						A2(update, msg, _p33))) : A2(
					_elm_lang$virtual_dom$VirtualDom_History$Stepping,
					_p34 - 1,
					_elm_lang$core$Tuple$first(
						A2(update, msg, _p33)));
			}
		});
	var _elm_lang$virtual_dom$VirtualDom_History$get = F3(
		function (update, index, _p35) {
			var _p36 = _p35;
			var _p39 = _p36.recent;
			var snapshotMax = _p36.numMessages - _p39.numMessages;
			if (_elm_lang$core$Native_Utils.cmp(index, snapshotMax) > -1) {
				return _elm_lang$virtual_dom$VirtualDom_History$undone(
					A3(
						_elm_lang$core$List$foldr,
						_elm_lang$virtual_dom$VirtualDom_History$getHelp(update),
						A2(_elm_lang$virtual_dom$VirtualDom_History$Stepping, index - snapshotMax, _p39.model),
						_p39.messages));
			} else {
				var _p37 = A2(_elm_lang$core$Array$get, (index / _elm_lang$virtual_dom$VirtualDom_History$maxSnapshotSize) | 0, _p36.snapshots);
				if (_p37.ctor === 'Nothing') {
					return _elm_lang$core$Native_Utils.crashCase(
						'VirtualDom.History',
						{
							start: {line: 165, column: 7},
							end: {line: 171, column: 95}
						},
						_p37)('UI should only let you ask for real indexes!');
				} else {
					return _elm_lang$virtual_dom$VirtualDom_History$undone(
						A3(
							_elm_lang$core$Array$foldr,
							_elm_lang$virtual_dom$VirtualDom_History$getHelp(update),
							A2(
								_elm_lang$virtual_dom$VirtualDom_History$Stepping,
								A2(_elm_lang$core$Basics$rem, index, _elm_lang$virtual_dom$VirtualDom_History$maxSnapshotSize),
								_p37._0.model),
							_p37._0.messages));
				}
			}
		});
	
	var _elm_lang$virtual_dom$VirtualDom_Overlay$styles = A3(
		_elm_lang$virtual_dom$VirtualDom_Helpers$node,
		'style',
		{ctor: '[]'},
		{
			ctor: '::',
			_0: _elm_lang$virtual_dom$VirtualDom_Helpers$text('\n\n.elm-overlay {\n  position: fixed;\n  top: 0;\n  left: 0;\n  width: 100%;\n  height: 100%;\n  color: white;\n  pointer-events: none;\n  font-family: \'Trebuchet MS\', \'Lucida Grande\', \'Bitstream Vera Sans\', \'Helvetica Neue\', sans-serif;\n}\n\n.elm-overlay-resume {\n  width: 100%;\n  height: 100%;\n  cursor: pointer;\n  text-align: center;\n  pointer-events: auto;\n  background-color: rgba(200, 200, 200, 0.7);\n}\n\n.elm-overlay-resume-words {\n  position: absolute;\n  top: calc(50% - 40px);\n  font-size: 80px;\n  line-height: 80px;\n  height: 80px;\n  width: 100%;\n}\n\n.elm-mini-controls {\n  position: fixed;\n  bottom: 0;\n  right: 6px;\n  border-radius: 4px;\n  background-color: rgb(61, 61, 61);\n  font-family: monospace;\n  pointer-events: auto;\n}\n\n.elm-mini-controls-button {\n  padding: 6px;\n  cursor: pointer;\n  text-align: center;\n  min-width: 24ch;\n}\n\n.elm-mini-controls-import-export {\n  padding: 4px 0;\n  font-size: 0.8em;\n  text-align: center;\n  background-color: rgb(50, 50, 50);\n}\n\n.elm-overlay-message {\n  position: absolute;\n  width: 600px;\n  height: 100%;\n  padding-left: calc(50% - 300px);\n  padding-right: calc(50% - 300px);\n  background-color: rgba(200, 200, 200, 0.7);\n  pointer-events: auto;\n}\n\n.elm-overlay-message-title {\n  font-size: 36px;\n  height: 80px;\n  background-color: rgb(50, 50, 50);\n  padding-left: 22px;\n  vertical-align: middle;\n  line-height: 80px;\n}\n\n.elm-overlay-message-details {\n  padding: 8px 20px;\n  overflow-y: auto;\n  max-height: calc(100% - 156px);\n  background-color: rgb(61, 61, 61);\n}\n\n.elm-overlay-message-details-type {\n  font-size: 1.5em;\n}\n\n.elm-overlay-message-details ul {\n  list-style-type: none;\n  padding-left: 20px;\n}\n\n.elm-overlay-message-details ul ul {\n  list-style-type: disc;\n  padding-left: 2em;\n}\n\n.elm-overlay-message-details li {\n  margin: 8px 0;\n}\n\n.elm-overlay-message-buttons {\n  height: 60px;\n  line-height: 60px;\n  text-align: right;\n  background-color: rgb(50, 50, 50);\n}\n\n.elm-overlay-message-buttons button {\n  margin-right: 20px;\n}\n\n'),
			_1: {ctor: '[]'}
		});
	var _elm_lang$virtual_dom$VirtualDom_Overlay$button = F2(
		function (msg, label) {
			return A2(
				_elm_lang$virtual_dom$VirtualDom_Helpers$span,
				{
					ctor: '::',
					_0: _elm_lang$virtual_dom$VirtualDom_Helpers$onClick(msg),
					_1: {
						ctor: '::',
						_0: _elm_lang$virtual_dom$VirtualDom_Helpers$style(
							{
								ctor: '::',
								_0: {ctor: '_Tuple2', _0: 'cursor', _1: 'pointer'},
								_1: {ctor: '[]'}
							}),
						_1: {ctor: '[]'}
					}
				},
				{
					ctor: '::',
					_0: _elm_lang$virtual_dom$VirtualDom_Helpers$text(label),
					_1: {ctor: '[]'}
				});
		});
	var _elm_lang$virtual_dom$VirtualDom_Overlay$viewImportExport = F3(
		function (props, importMsg, exportMsg) {
			return A2(
				_elm_lang$virtual_dom$VirtualDom_Helpers$div,
				props,
				{
					ctor: '::',
					_0: A2(_elm_lang$virtual_dom$VirtualDom_Overlay$button, importMsg, 'Import'),
					_1: {
						ctor: '::',
						_0: _elm_lang$virtual_dom$VirtualDom_Helpers$text(' / '),
						_1: {
							ctor: '::',
							_0: A2(_elm_lang$virtual_dom$VirtualDom_Overlay$button, exportMsg, 'Export'),
							_1: {ctor: '[]'}
						}
					}
				});
		});
	var _elm_lang$virtual_dom$VirtualDom_Overlay$viewMiniControls = F2(
		function (config, numMsgs) {
			return A2(
				_elm_lang$virtual_dom$VirtualDom_Helpers$div,
				{
					ctor: '::',
					_0: _elm_lang$virtual_dom$VirtualDom_Helpers$class('elm-mini-controls'),
					_1: {ctor: '[]'}
				},
				{
					ctor: '::',
					_0: A2(
						_elm_lang$virtual_dom$VirtualDom_Helpers$div,
						{
							ctor: '::',
							_0: _elm_lang$virtual_dom$VirtualDom_Helpers$onClick(config.open),
							_1: {
								ctor: '::',
								_0: _elm_lang$virtual_dom$VirtualDom_Helpers$class('elm-mini-controls-button'),
								_1: {ctor: '[]'}
							}
						},
						{
							ctor: '::',
							_0: _elm_lang$virtual_dom$VirtualDom_Helpers$text(
								A2(
									_elm_lang$core$Basics_ops['++'],
									'Explore History (',
									A2(
										_elm_lang$core$Basics_ops['++'],
										_elm_lang$core$Basics$toString(numMsgs),
										')'))),
							_1: {ctor: '[]'}
						}),
					_1: {
						ctor: '::',
						_0: A3(
							_elm_lang$virtual_dom$VirtualDom_Overlay$viewImportExport,
							{
								ctor: '::',
								_0: _elm_lang$virtual_dom$VirtualDom_Helpers$class('elm-mini-controls-import-export'),
								_1: {ctor: '[]'}
							},
							config.importHistory,
							config.exportHistory),
						_1: {ctor: '[]'}
					}
				});
		});
	var _elm_lang$virtual_dom$VirtualDom_Overlay$addCommas = function (items) {
		var _p0 = items;
		if (_p0.ctor === '[]') {
			return '';
		} else {
			if (_p0._1.ctor === '[]') {
				return _p0._0;
			} else {
				if (_p0._1._1.ctor === '[]') {
					return A2(
						_elm_lang$core$Basics_ops['++'],
						_p0._0,
						A2(_elm_lang$core$Basics_ops['++'], ' and ', _p0._1._0));
				} else {
					return A2(
						_elm_lang$core$String$join,
						', ',
						A2(
							_elm_lang$core$Basics_ops['++'],
							_p0._1,
							{
								ctor: '::',
								_0: A2(_elm_lang$core$Basics_ops['++'], ' and ', _p0._0),
								_1: {ctor: '[]'}
							}));
				}
			}
		}
	};
	var _elm_lang$virtual_dom$VirtualDom_Overlay$problemToString = function (problem) {
		var _p1 = problem;
		switch (_p1.ctor) {
			case 'Function':
				return 'functions';
			case 'Decoder':
				return 'JSON decoders';
			case 'Task':
				return 'tasks';
			case 'Process':
				return 'processes';
			case 'Socket':
				return 'web sockets';
			case 'Request':
				return 'HTTP requests';
			case 'Program':
				return 'programs';
			default:
				return 'virtual DOM values';
		}
	};
	var _elm_lang$virtual_dom$VirtualDom_Overlay$goodNews2 = '\nfunction can pattern match on that data and call whatever functions, JSON\ndecoders, etc. you need. This makes the code much more explicit and easy to\nfollow for other readers (or you in a few months!)\n';
	var _elm_lang$virtual_dom$VirtualDom_Overlay$goodNews1 = '\nThe good news is that having values like this in your message type is not\nso great in the long run. You are better off using simpler data, like\n';
	var _elm_lang$virtual_dom$VirtualDom_Overlay$viewCode = function (name) {
		return A3(
			_elm_lang$virtual_dom$VirtualDom_Helpers$node,
			'code',
			{ctor: '[]'},
			{
				ctor: '::',
				_0: _elm_lang$virtual_dom$VirtualDom_Helpers$text(name),
				_1: {ctor: '[]'}
			});
	};
	var _elm_lang$virtual_dom$VirtualDom_Overlay$viewMention = F2(
		function (tags, verbed) {
			var _p2 = A2(
				_elm_lang$core$List$map,
				_elm_lang$virtual_dom$VirtualDom_Overlay$viewCode,
				_elm_lang$core$List$reverse(tags));
			if (_p2.ctor === '[]') {
				return _elm_lang$virtual_dom$VirtualDom_Helpers$text('');
			} else {
				if (_p2._1.ctor === '[]') {
					return A3(
						_elm_lang$virtual_dom$VirtualDom_Helpers$node,
						'li',
						{ctor: '[]'},
						{
							ctor: '::',
							_0: _elm_lang$virtual_dom$VirtualDom_Helpers$text(verbed),
							_1: {
								ctor: '::',
								_0: _p2._0,
								_1: {
									ctor: '::',
									_0: _elm_lang$virtual_dom$VirtualDom_Helpers$text('.'),
									_1: {ctor: '[]'}
								}
							}
						});
				} else {
					if (_p2._1._1.ctor === '[]') {
						return A3(
							_elm_lang$virtual_dom$VirtualDom_Helpers$node,
							'li',
							{ctor: '[]'},
							{
								ctor: '::',
								_0: _elm_lang$virtual_dom$VirtualDom_Helpers$text(verbed),
								_1: {
									ctor: '::',
									_0: _p2._1._0,
									_1: {
										ctor: '::',
										_0: _elm_lang$virtual_dom$VirtualDom_Helpers$text(' and '),
										_1: {
											ctor: '::',
											_0: _p2._0,
											_1: {
												ctor: '::',
												_0: _elm_lang$virtual_dom$VirtualDom_Helpers$text('.'),
												_1: {ctor: '[]'}
											}
										}
									}
								}
							});
					} else {
						return A3(
							_elm_lang$virtual_dom$VirtualDom_Helpers$node,
							'li',
							{ctor: '[]'},
							{
								ctor: '::',
								_0: _elm_lang$virtual_dom$VirtualDom_Helpers$text(verbed),
								_1: A2(
									_elm_lang$core$Basics_ops['++'],
									A2(
										_elm_lang$core$List$intersperse,
										_elm_lang$virtual_dom$VirtualDom_Helpers$text(', '),
										_elm_lang$core$List$reverse(_p2._1)),
									{
										ctor: '::',
										_0: _elm_lang$virtual_dom$VirtualDom_Helpers$text(', and '),
										_1: {
											ctor: '::',
											_0: _p2._0,
											_1: {
												ctor: '::',
												_0: _elm_lang$virtual_dom$VirtualDom_Helpers$text('.'),
												_1: {ctor: '[]'}
											}
										}
									})
							});
					}
				}
			}
		});
	var _elm_lang$virtual_dom$VirtualDom_Overlay$viewChange = function (change) {
		return A3(
			_elm_lang$virtual_dom$VirtualDom_Helpers$node,
			'li',
			{ctor: '[]'},
			function () {
				var _p3 = change;
				if (_p3.ctor === 'AliasChange') {
					return {
						ctor: '::',
						_0: A2(
							_elm_lang$virtual_dom$VirtualDom_Helpers$span,
							{
								ctor: '::',
								_0: _elm_lang$virtual_dom$VirtualDom_Helpers$class('elm-overlay-message-details-type'),
								_1: {ctor: '[]'}
							},
							{
								ctor: '::',
								_0: _elm_lang$virtual_dom$VirtualDom_Overlay$viewCode(_p3._0),
								_1: {ctor: '[]'}
							}),
						_1: {ctor: '[]'}
					};
				} else {
					return {
						ctor: '::',
						_0: A2(
							_elm_lang$virtual_dom$VirtualDom_Helpers$span,
							{
								ctor: '::',
								_0: _elm_lang$virtual_dom$VirtualDom_Helpers$class('elm-overlay-message-details-type'),
								_1: {ctor: '[]'}
							},
							{
								ctor: '::',
								_0: _elm_lang$virtual_dom$VirtualDom_Overlay$viewCode(_p3._0),
								_1: {ctor: '[]'}
							}),
						_1: {
							ctor: '::',
							_0: A3(
								_elm_lang$virtual_dom$VirtualDom_Helpers$node,
								'ul',
								{ctor: '[]'},
								{
									ctor: '::',
									_0: A2(_elm_lang$virtual_dom$VirtualDom_Overlay$viewMention, _p3._1.removed, 'Removed '),
									_1: {
										ctor: '::',
										_0: A2(_elm_lang$virtual_dom$VirtualDom_Overlay$viewMention, _p3._1.changed, 'Changed '),
										_1: {
											ctor: '::',
											_0: A2(_elm_lang$virtual_dom$VirtualDom_Overlay$viewMention, _p3._1.added, 'Added '),
											_1: {ctor: '[]'}
										}
									}
								}),
							_1: {
								ctor: '::',
								_0: _p3._1.argsMatch ? _elm_lang$virtual_dom$VirtualDom_Helpers$text('') : _elm_lang$virtual_dom$VirtualDom_Helpers$text('This may be due to the fact that the type variable names changed.'),
								_1: {ctor: '[]'}
							}
						}
					};
				}
			}());
	};
	var _elm_lang$virtual_dom$VirtualDom_Overlay$viewProblemType = function (_p4) {
		var _p5 = _p4;
		return A3(
			_elm_lang$virtual_dom$VirtualDom_Helpers$node,
			'li',
			{ctor: '[]'},
			{
				ctor: '::',
				_0: _elm_lang$virtual_dom$VirtualDom_Overlay$viewCode(_p5.name),
				_1: {
					ctor: '::',
					_0: _elm_lang$virtual_dom$VirtualDom_Helpers$text(
						A2(
							_elm_lang$core$Basics_ops['++'],
							' can contain ',
							A2(
								_elm_lang$core$Basics_ops['++'],
								_elm_lang$virtual_dom$VirtualDom_Overlay$addCommas(
									A2(_elm_lang$core$List$map, _elm_lang$virtual_dom$VirtualDom_Overlay$problemToString, _p5.problems)),
								'.'))),
					_1: {ctor: '[]'}
				}
			});
	};
	var _elm_lang$virtual_dom$VirtualDom_Overlay$viewBadMetadata = function (_p6) {
		var _p7 = _p6;
		return {
			ctor: '::',
			_0: A3(
				_elm_lang$virtual_dom$VirtualDom_Helpers$node,
				'p',
				{ctor: '[]'},
				{
					ctor: '::',
					_0: _elm_lang$virtual_dom$VirtualDom_Helpers$text('The '),
					_1: {
						ctor: '::',
						_0: _elm_lang$virtual_dom$VirtualDom_Overlay$viewCode(_p7.message),
						_1: {
							ctor: '::',
							_0: _elm_lang$virtual_dom$VirtualDom_Helpers$text(' type of your program cannot be reliably serialized for history files.'),
							_1: {ctor: '[]'}
						}
					}
				}),
			_1: {
				ctor: '::',
				_0: A3(
					_elm_lang$virtual_dom$VirtualDom_Helpers$node,
					'p',
					{ctor: '[]'},
					{
						ctor: '::',
						_0: _elm_lang$virtual_dom$VirtualDom_Helpers$text('Functions cannot be serialized, nor can values that contain functions. This is a problem in these places:'),
						_1: {ctor: '[]'}
					}),
				_1: {
					ctor: '::',
					_0: A3(
						_elm_lang$virtual_dom$VirtualDom_Helpers$node,
						'ul',
						{ctor: '[]'},
						A2(_elm_lang$core$List$map, _elm_lang$virtual_dom$VirtualDom_Overlay$viewProblemType, _p7.problems)),
					_1: {
						ctor: '::',
						_0: A3(
							_elm_lang$virtual_dom$VirtualDom_Helpers$node,
							'p',
							{ctor: '[]'},
							{
								ctor: '::',
								_0: _elm_lang$virtual_dom$VirtualDom_Helpers$text(_elm_lang$virtual_dom$VirtualDom_Overlay$goodNews1),
								_1: {
									ctor: '::',
									_0: A2(
										_elm_lang$virtual_dom$VirtualDom_Helpers$a,
										{
											ctor: '::',
											_0: _elm_lang$virtual_dom$VirtualDom_Helpers$href('https://guide.elm-lang.org/types/union_types.html'),
											_1: {ctor: '[]'}
										},
										{
											ctor: '::',
											_0: _elm_lang$virtual_dom$VirtualDom_Helpers$text('union types'),
											_1: {ctor: '[]'}
										}),
									_1: {
										ctor: '::',
										_0: _elm_lang$virtual_dom$VirtualDom_Helpers$text(', in your messages. From there, your '),
										_1: {
											ctor: '::',
											_0: _elm_lang$virtual_dom$VirtualDom_Overlay$viewCode('update'),
											_1: {
												ctor: '::',
												_0: _elm_lang$virtual_dom$VirtualDom_Helpers$text(_elm_lang$virtual_dom$VirtualDom_Overlay$goodNews2),
												_1: {ctor: '[]'}
											}
										}
									}
								}
							}),
						_1: {ctor: '[]'}
					}
				}
			}
		};
	};
	var _elm_lang$virtual_dom$VirtualDom_Overlay$explanationRisky = '\nThis history seems old. It will work with this program, but some\nmessages have been added since the history was created:\n';
	var _elm_lang$virtual_dom$VirtualDom_Overlay$explanationBad = '\nThe messages in this history do not match the messages handled by your\nprogram. I noticed changes in the following types:\n';
	var _elm_lang$virtual_dom$VirtualDom_Overlay$viewReport = F2(
		function (isBad, report) {
			var _p8 = report;
			switch (_p8.ctor) {
				case 'CorruptHistory':
					return {
						ctor: '::',
						_0: _elm_lang$virtual_dom$VirtualDom_Helpers$text('Looks like this history file is corrupt. I cannot understand it.'),
						_1: {ctor: '[]'}
					};
				case 'VersionChanged':
					return {
						ctor: '::',
						_0: _elm_lang$virtual_dom$VirtualDom_Helpers$text(
							A2(
								_elm_lang$core$Basics_ops['++'],
								'This history was created with Elm ',
								A2(
									_elm_lang$core$Basics_ops['++'],
									_p8._0,
									A2(
										_elm_lang$core$Basics_ops['++'],
										', but you are using Elm ',
										A2(_elm_lang$core$Basics_ops['++'], _p8._1, ' right now.'))))),
						_1: {ctor: '[]'}
					};
				case 'MessageChanged':
					return {
						ctor: '::',
						_0: _elm_lang$virtual_dom$VirtualDom_Helpers$text(
							A2(_elm_lang$core$Basics_ops['++'], 'To import some other history, the overall message type must', ' be the same. The old history has ')),
						_1: {
							ctor: '::',
							_0: _elm_lang$virtual_dom$VirtualDom_Overlay$viewCode(_p8._0),
							_1: {
								ctor: '::',
								_0: _elm_lang$virtual_dom$VirtualDom_Helpers$text(' messages, but the new program works with '),
								_1: {
									ctor: '::',
									_0: _elm_lang$virtual_dom$VirtualDom_Overlay$viewCode(_p8._1),
									_1: {
										ctor: '::',
										_0: _elm_lang$virtual_dom$VirtualDom_Helpers$text(' messages.'),
										_1: {ctor: '[]'}
									}
								}
							}
						}
					};
				default:
					return {
						ctor: '::',
						_0: A3(
							_elm_lang$virtual_dom$VirtualDom_Helpers$node,
							'p',
							{ctor: '[]'},
							{
								ctor: '::',
								_0: _elm_lang$virtual_dom$VirtualDom_Helpers$text(
									isBad ? _elm_lang$virtual_dom$VirtualDom_Overlay$explanationBad : _elm_lang$virtual_dom$VirtualDom_Overlay$explanationRisky),
								_1: {ctor: '[]'}
							}),
						_1: {
							ctor: '::',
							_0: A3(
								_elm_lang$virtual_dom$VirtualDom_Helpers$node,
								'ul',
								{ctor: '[]'},
								A2(_elm_lang$core$List$map, _elm_lang$virtual_dom$VirtualDom_Overlay$viewChange, _p8._0)),
							_1: {ctor: '[]'}
						}
					};
			}
		});
	var _elm_lang$virtual_dom$VirtualDom_Overlay$viewResume = function (config) {
		return A2(
			_elm_lang$virtual_dom$VirtualDom_Helpers$div,
			{
				ctor: '::',
				_0: _elm_lang$virtual_dom$VirtualDom_Helpers$class('elm-overlay-resume'),
				_1: {
					ctor: '::',
					_0: _elm_lang$virtual_dom$VirtualDom_Helpers$onClick(config.resume),
					_1: {ctor: '[]'}
				}
			},
			{
				ctor: '::',
				_0: A2(
					_elm_lang$virtual_dom$VirtualDom_Helpers$div,
					{
						ctor: '::',
						_0: _elm_lang$virtual_dom$VirtualDom_Helpers$class('elm-overlay-resume-words'),
						_1: {ctor: '[]'}
					},
					{
						ctor: '::',
						_0: _elm_lang$virtual_dom$VirtualDom_Helpers$text('Click to Resume'),
						_1: {ctor: '[]'}
					}),
				_1: {ctor: '[]'}
			});
	};
	var _elm_lang$virtual_dom$VirtualDom_Overlay$uploadDecoder = A3(
		_elm_lang$core$Json_Decode$map2,
		F2(
			function (v0, v1) {
				return {ctor: '_Tuple2', _0: v0, _1: v1};
			}),
		A2(_elm_lang$core$Json_Decode$field, 'metadata', _elm_lang$virtual_dom$VirtualDom_Metadata$decoder),
		A2(_elm_lang$core$Json_Decode$field, 'history', _elm_lang$core$Json_Decode$value));
	var _elm_lang$virtual_dom$VirtualDom_Overlay$close = F2(
		function (msg, state) {
			var _p9 = state;
			switch (_p9.ctor) {
				case 'None':
					return _elm_lang$core$Maybe$Nothing;
				case 'BadMetadata':
					return _elm_lang$core$Maybe$Nothing;
				case 'BadImport':
					return _elm_lang$core$Maybe$Nothing;
				default:
					var _p10 = msg;
					if (_p10.ctor === 'Cancel') {
						return _elm_lang$core$Maybe$Nothing;
					} else {
						return _elm_lang$core$Maybe$Just(_p9._1);
					}
			}
		});
	var _elm_lang$virtual_dom$VirtualDom_Overlay$isBlocking = function (state) {
		var _p11 = state;
		if (_p11.ctor === 'None') {
			return false;
		} else {
			return true;
		}
	};
	var _elm_lang$virtual_dom$VirtualDom_Overlay$Config = F5(
		function (a, b, c, d, e) {
			return {resume: a, open: b, importHistory: c, exportHistory: d, wrap: e};
		});
	var _elm_lang$virtual_dom$VirtualDom_Overlay$RiskyImport = F2(
		function (a, b) {
			return {ctor: 'RiskyImport', _0: a, _1: b};
		});
	var _elm_lang$virtual_dom$VirtualDom_Overlay$BadImport = function (a) {
		return {ctor: 'BadImport', _0: a};
	};
	var _elm_lang$virtual_dom$VirtualDom_Overlay$corruptImport = _elm_lang$virtual_dom$VirtualDom_Overlay$BadImport(_elm_lang$virtual_dom$VirtualDom_Report$CorruptHistory);
	var _elm_lang$virtual_dom$VirtualDom_Overlay$assessImport = F2(
		function (metadata, jsonString) {
			var _p12 = A2(_elm_lang$core$Json_Decode$decodeString, _elm_lang$virtual_dom$VirtualDom_Overlay$uploadDecoder, jsonString);
			if (_p12.ctor === 'Err') {
				return _elm_lang$core$Result$Err(_elm_lang$virtual_dom$VirtualDom_Overlay$corruptImport);
			} else {
				var _p14 = _p12._0._1;
				var report = A2(_elm_lang$virtual_dom$VirtualDom_Metadata$check, _p12._0._0, metadata);
				var _p13 = _elm_lang$virtual_dom$VirtualDom_Report$evaluate(report);
				switch (_p13.ctor) {
					case 'Impossible':
						return _elm_lang$core$Result$Err(
							_elm_lang$virtual_dom$VirtualDom_Overlay$BadImport(report));
					case 'Risky':
						return _elm_lang$core$Result$Err(
							A2(_elm_lang$virtual_dom$VirtualDom_Overlay$RiskyImport, report, _p14));
					default:
						return _elm_lang$core$Result$Ok(_p14);
				}
			}
		});
	var _elm_lang$virtual_dom$VirtualDom_Overlay$BadMetadata = function (a) {
		return {ctor: 'BadMetadata', _0: a};
	};
	var _elm_lang$virtual_dom$VirtualDom_Overlay$badMetadata = _elm_lang$virtual_dom$VirtualDom_Overlay$BadMetadata;
	var _elm_lang$virtual_dom$VirtualDom_Overlay$None = {ctor: 'None'};
	var _elm_lang$virtual_dom$VirtualDom_Overlay$none = _elm_lang$virtual_dom$VirtualDom_Overlay$None;
	var _elm_lang$virtual_dom$VirtualDom_Overlay$Proceed = {ctor: 'Proceed'};
	var _elm_lang$virtual_dom$VirtualDom_Overlay$Cancel = {ctor: 'Cancel'};
	var _elm_lang$virtual_dom$VirtualDom_Overlay$viewButtons = function (buttons) {
		return A2(
			_elm_lang$virtual_dom$VirtualDom_Helpers$div,
			{
				ctor: '::',
				_0: _elm_lang$virtual_dom$VirtualDom_Helpers$class('elm-overlay-message-buttons'),
				_1: {ctor: '[]'}
			},
			function () {
				var _p15 = buttons;
				if (_p15.ctor === 'Accept') {
					return {
						ctor: '::',
						_0: A3(
							_elm_lang$virtual_dom$VirtualDom_Helpers$node,
							'button',
							{
								ctor: '::',
								_0: _elm_lang$virtual_dom$VirtualDom_Helpers$onClick(_elm_lang$virtual_dom$VirtualDom_Overlay$Proceed),
								_1: {ctor: '[]'}
							},
							{
								ctor: '::',
								_0: _elm_lang$virtual_dom$VirtualDom_Helpers$text(_p15._0),
								_1: {ctor: '[]'}
							}),
						_1: {ctor: '[]'}
					};
				} else {
					return {
						ctor: '::',
						_0: A3(
							_elm_lang$virtual_dom$VirtualDom_Helpers$node,
							'button',
							{
								ctor: '::',
								_0: _elm_lang$virtual_dom$VirtualDom_Helpers$onClick(_elm_lang$virtual_dom$VirtualDom_Overlay$Cancel),
								_1: {ctor: '[]'}
							},
							{
								ctor: '::',
								_0: _elm_lang$virtual_dom$VirtualDom_Helpers$text(_p15._0),
								_1: {ctor: '[]'}
							}),
						_1: {
							ctor: '::',
							_0: A3(
								_elm_lang$virtual_dom$VirtualDom_Helpers$node,
								'button',
								{
									ctor: '::',
									_0: _elm_lang$virtual_dom$VirtualDom_Helpers$onClick(_elm_lang$virtual_dom$VirtualDom_Overlay$Proceed),
									_1: {ctor: '[]'}
								},
								{
									ctor: '::',
									_0: _elm_lang$virtual_dom$VirtualDom_Helpers$text(_p15._1),
									_1: {ctor: '[]'}
								}),
							_1: {ctor: '[]'}
						}
					};
				}
			}());
	};
	var _elm_lang$virtual_dom$VirtualDom_Overlay$Message = {ctor: 'Message'};
	var _elm_lang$virtual_dom$VirtualDom_Overlay$viewMessage = F4(
		function (config, title, details, buttons) {
			return {
				ctor: '_Tuple2',
				_0: _elm_lang$virtual_dom$VirtualDom_Overlay$Message,
				_1: {
					ctor: '::',
					_0: A2(
						_elm_lang$virtual_dom$VirtualDom_Helpers$div,
						{
							ctor: '::',
							_0: _elm_lang$virtual_dom$VirtualDom_Helpers$class('elm-overlay-message'),
							_1: {ctor: '[]'}
						},
						{
							ctor: '::',
							_0: A2(
								_elm_lang$virtual_dom$VirtualDom_Helpers$div,
								{
									ctor: '::',
									_0: _elm_lang$virtual_dom$VirtualDom_Helpers$class('elm-overlay-message-title'),
									_1: {ctor: '[]'}
								},
								{
									ctor: '::',
									_0: _elm_lang$virtual_dom$VirtualDom_Helpers$text(title),
									_1: {ctor: '[]'}
								}),
							_1: {
								ctor: '::',
								_0: A2(
									_elm_lang$virtual_dom$VirtualDom_Helpers$div,
									{
										ctor: '::',
										_0: _elm_lang$virtual_dom$VirtualDom_Helpers$class('elm-overlay-message-details'),
										_1: {ctor: '[]'}
									},
									details),
								_1: {
									ctor: '::',
									_0: A2(
										_elm_lang$virtual_dom$VirtualDom_Helpers$map,
										config.wrap,
										_elm_lang$virtual_dom$VirtualDom_Overlay$viewButtons(buttons)),
									_1: {ctor: '[]'}
								}
							}
						}),
					_1: {ctor: '[]'}
				}
			};
		});
	var _elm_lang$virtual_dom$VirtualDom_Overlay$Pause = {ctor: 'Pause'};
	var _elm_lang$virtual_dom$VirtualDom_Overlay$Normal = {ctor: 'Normal'};
	var _elm_lang$virtual_dom$VirtualDom_Overlay$Choose = F2(
		function (a, b) {
			return {ctor: 'Choose', _0: a, _1: b};
		});
	var _elm_lang$virtual_dom$VirtualDom_Overlay$Accept = function (a) {
		return {ctor: 'Accept', _0: a};
	};
	var _elm_lang$virtual_dom$VirtualDom_Overlay$viewHelp = F5(
		function (config, isPaused, isOpen, numMsgs, state) {
			var _p16 = state;
			switch (_p16.ctor) {
				case 'None':
					var miniControls = isOpen ? {ctor: '[]'} : {
						ctor: '::',
						_0: A2(_elm_lang$virtual_dom$VirtualDom_Overlay$viewMiniControls, config, numMsgs),
						_1: {ctor: '[]'}
					};
					return {
						ctor: '_Tuple2',
						_0: isPaused ? _elm_lang$virtual_dom$VirtualDom_Overlay$Pause : _elm_lang$virtual_dom$VirtualDom_Overlay$Normal,
						_1: (isPaused && (!isOpen)) ? {
							ctor: '::',
							_0: _elm_lang$virtual_dom$VirtualDom_Overlay$viewResume(config),
							_1: miniControls
						} : miniControls
					};
				case 'BadMetadata':
					return A4(
						_elm_lang$virtual_dom$VirtualDom_Overlay$viewMessage,
						config,
						'Cannot use Import or Export',
						_elm_lang$virtual_dom$VirtualDom_Overlay$viewBadMetadata(_p16._0),
						_elm_lang$virtual_dom$VirtualDom_Overlay$Accept('Ok'));
				case 'BadImport':
					return A4(
						_elm_lang$virtual_dom$VirtualDom_Overlay$viewMessage,
						config,
						'Cannot Import History',
						A2(_elm_lang$virtual_dom$VirtualDom_Overlay$viewReport, true, _p16._0),
						_elm_lang$virtual_dom$VirtualDom_Overlay$Accept('Ok'));
				default:
					return A4(
						_elm_lang$virtual_dom$VirtualDom_Overlay$viewMessage,
						config,
						'Warning',
						A2(_elm_lang$virtual_dom$VirtualDom_Overlay$viewReport, false, _p16._0),
						A2(_elm_lang$virtual_dom$VirtualDom_Overlay$Choose, 'Cancel', 'Import Anyway'));
			}
		});
	var _elm_lang$virtual_dom$VirtualDom_Overlay$view = F5(
		function (config, isPaused, isOpen, numMsgs, state) {
			var _p17 = A5(_elm_lang$virtual_dom$VirtualDom_Overlay$viewHelp, config, isPaused, isOpen, numMsgs, state);
			var block = _p17._0;
			var nodes = _p17._1;
			return {
				ctor: '_Tuple2',
				_0: block,
				_1: A2(
					_elm_lang$virtual_dom$VirtualDom_Helpers$div,
					{
						ctor: '::',
						_0: _elm_lang$virtual_dom$VirtualDom_Helpers$class('elm-overlay'),
						_1: {ctor: '[]'}
					},
					{ctor: '::', _0: _elm_lang$virtual_dom$VirtualDom_Overlay$styles, _1: nodes})
			};
		});
	
	var _elm_lang$virtual_dom$VirtualDom_Debug$styles = A3(
		_elm_lang$virtual_dom$VirtualDom_Helpers$node,
		'style',
		{ctor: '[]'},
		{
			ctor: '::',
			_0: _elm_lang$virtual_dom$VirtualDom_Helpers$text('\n\nhtml {\n    overflow: hidden;\n    height: 100%;\n}\n\nbody {\n    height: 100%;\n    overflow: auto;\n}\n\n#debugger {\n  width: 100%\n  height: 100%;\n  font-family: monospace;\n}\n\n#values {\n  display: block;\n  float: left;\n  height: 100%;\n  width: calc(100% - 30ch);\n  margin: 0;\n  overflow: auto;\n  cursor: default;\n}\n\n.debugger-sidebar {\n  display: block;\n  float: left;\n  width: 30ch;\n  height: 100%;\n  color: white;\n  background-color: rgb(61, 61, 61);\n}\n\n.debugger-sidebar-controls {\n  width: 100%;\n  text-align: center;\n  background-color: rgb(50, 50, 50);\n}\n\n.debugger-sidebar-controls-import-export {\n  width: 100%;\n  height: 24px;\n  line-height: 24px;\n  font-size: 12px;\n}\n\n.debugger-sidebar-controls-resume {\n  width: 100%;\n  height: 30px;\n  line-height: 30px;\n  cursor: pointer;\n}\n\n.debugger-sidebar-controls-resume:hover {\n  background-color: rgb(41, 41, 41);\n}\n\n.debugger-sidebar-messages {\n  width: 100%;\n  overflow-y: auto;\n  height: calc(100% - 24px);\n}\n\n.debugger-sidebar-messages-paused {\n  width: 100%;\n  overflow-y: auto;\n  height: calc(100% - 54px);\n}\n\n.messages-entry {\n  cursor: pointer;\n  width: 100%;\n}\n\n.messages-entry:hover {\n  background-color: rgb(41, 41, 41);\n}\n\n.messages-entry-selected, .messages-entry-selected:hover {\n  background-color: rgb(10, 10, 10);\n}\n\n.messages-entry-content {\n  width: calc(100% - 7ch);\n  padding-top: 4px;\n  padding-bottom: 4px;\n  padding-left: 1ch;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n  overflow: hidden;\n  display: inline-block;\n}\n\n.messages-entry-index {\n  color: #666;\n  width: 5ch;\n  padding-top: 4px;\n  padding-bottom: 4px;\n  padding-right: 1ch;\n  text-align: right;\n  display: block;\n  float: right;\n}\n\n'),
			_1: {ctor: '[]'}
		});
	var _elm_lang$virtual_dom$VirtualDom_Debug$button = F2(
		function (msg, label) {
			return A2(
				_elm_lang$virtual_dom$VirtualDom_Helpers$span,
				{
					ctor: '::',
					_0: _elm_lang$virtual_dom$VirtualDom_Helpers$onClick(msg),
					_1: {
						ctor: '::',
						_0: _elm_lang$virtual_dom$VirtualDom_Helpers$style(
							{
								ctor: '::',
								_0: {ctor: '_Tuple2', _0: 'cursor', _1: 'pointer'},
								_1: {ctor: '[]'}
							}),
						_1: {ctor: '[]'}
					}
				},
				{
					ctor: '::',
					_0: _elm_lang$virtual_dom$VirtualDom_Helpers$text(label),
					_1: {ctor: '[]'}
				});
		});
	var _elm_lang$virtual_dom$VirtualDom_Debug$getLatestModel = function (state) {
		var _p0 = state;
		if (_p0.ctor === 'Running') {
			return _p0._0;
		} else {
			return _p0._2;
		}
	};
	var _elm_lang$virtual_dom$VirtualDom_Debug$withGoodMetadata = F2(
		function (model, func) {
			var _p1 = model.metadata;
			if (_p1.ctor === 'Ok') {
				return func(_p1._0);
			} else {
				return A2(
					_elm_lang$core$Platform_Cmd_ops['!'],
					_elm_lang$core$Native_Utils.update(
						model,
						{
							overlay: _elm_lang$virtual_dom$VirtualDom_Overlay$badMetadata(_p1._0)
						}),
					{ctor: '[]'});
			}
		});
	var _elm_lang$virtual_dom$VirtualDom_Debug$Model = F6(
		function (a, b, c, d, e, f) {
			return {history: a, state: b, expando: c, metadata: d, overlay: e, isDebuggerOpen: f};
		});
	var _elm_lang$virtual_dom$VirtualDom_Debug$Paused = F3(
		function (a, b, c) {
			return {ctor: 'Paused', _0: a, _1: b, _2: c};
		});
	var _elm_lang$virtual_dom$VirtualDom_Debug$Running = function (a) {
		return {ctor: 'Running', _0: a};
	};
	var _elm_lang$virtual_dom$VirtualDom_Debug$loadNewHistory = F3(
		function (rawHistory, userUpdate, model) {
			var pureUserUpdate = F2(
				function (msg, userModel) {
					return _elm_lang$core$Tuple$first(
						A2(userUpdate, msg, userModel));
				});
			var initialUserModel = _elm_lang$virtual_dom$VirtualDom_History$initialModel(model.history);
			var decoder = A2(_elm_lang$virtual_dom$VirtualDom_History$decoder, initialUserModel, pureUserUpdate);
			var _p2 = A2(_elm_lang$core$Json_Decode$decodeValue, decoder, rawHistory);
			if (_p2.ctor === 'Err') {
				return A2(
					_elm_lang$core$Platform_Cmd_ops['!'],
					_elm_lang$core$Native_Utils.update(
						model,
						{overlay: _elm_lang$virtual_dom$VirtualDom_Overlay$corruptImport}),
					{ctor: '[]'});
			} else {
				var _p3 = _p2._0._0;
				return A2(
					_elm_lang$core$Platform_Cmd_ops['!'],
					_elm_lang$core$Native_Utils.update(
						model,
						{
							history: _p2._0._1,
							state: _elm_lang$virtual_dom$VirtualDom_Debug$Running(_p3),
							expando: _elm_lang$virtual_dom$VirtualDom_Expando$init(_p3),
							overlay: _elm_lang$virtual_dom$VirtualDom_Overlay$none
						}),
					{ctor: '[]'});
			}
		});
	var _elm_lang$virtual_dom$VirtualDom_Debug$OverlayMsg = function (a) {
		return {ctor: 'OverlayMsg', _0: a};
	};
	var _elm_lang$virtual_dom$VirtualDom_Debug$Upload = function (a) {
		return {ctor: 'Upload', _0: a};
	};
	var _elm_lang$virtual_dom$VirtualDom_Debug$upload = A2(_elm_lang$core$Task$perform, _elm_lang$virtual_dom$VirtualDom_Debug$Upload, _elm_lang$virtual_dom$Native_Debug.upload);
	var _elm_lang$virtual_dom$VirtualDom_Debug$Export = {ctor: 'Export'};
	var _elm_lang$virtual_dom$VirtualDom_Debug$Import = {ctor: 'Import'};
	var _elm_lang$virtual_dom$VirtualDom_Debug$Down = {ctor: 'Down'};
	var _elm_lang$virtual_dom$VirtualDom_Debug$Up = {ctor: 'Up'};
	var _elm_lang$virtual_dom$VirtualDom_Debug$Close = {ctor: 'Close'};
	var _elm_lang$virtual_dom$VirtualDom_Debug$Open = {ctor: 'Open'};
	var _elm_lang$virtual_dom$VirtualDom_Debug$Jump = function (a) {
		return {ctor: 'Jump', _0: a};
	};
	var _elm_lang$virtual_dom$VirtualDom_Debug$Resume = {ctor: 'Resume'};
	var _elm_lang$virtual_dom$VirtualDom_Debug$overlayConfig = {resume: _elm_lang$virtual_dom$VirtualDom_Debug$Resume, open: _elm_lang$virtual_dom$VirtualDom_Debug$Open, importHistory: _elm_lang$virtual_dom$VirtualDom_Debug$Import, exportHistory: _elm_lang$virtual_dom$VirtualDom_Debug$Export, wrap: _elm_lang$virtual_dom$VirtualDom_Debug$OverlayMsg};
	var _elm_lang$virtual_dom$VirtualDom_Debug$viewIn = function (_p4) {
		var _p5 = _p4;
		var isPaused = function () {
			var _p6 = _p5.state;
			if (_p6.ctor === 'Running') {
				return false;
			} else {
				return true;
			}
		}();
		return A5(
			_elm_lang$virtual_dom$VirtualDom_Overlay$view,
			_elm_lang$virtual_dom$VirtualDom_Debug$overlayConfig,
			isPaused,
			_p5.isDebuggerOpen,
			_elm_lang$virtual_dom$VirtualDom_History$size(_p5.history),
			_p5.overlay);
	};
	var _elm_lang$virtual_dom$VirtualDom_Debug$resumeButton = A2(
		_elm_lang$virtual_dom$VirtualDom_Helpers$div,
		{
			ctor: '::',
			_0: _elm_lang$virtual_dom$VirtualDom_Helpers$onClick(_elm_lang$virtual_dom$VirtualDom_Debug$Resume),
			_1: {
				ctor: '::',
				_0: _elm_lang$virtual_dom$VirtualDom_Helpers$class('debugger-sidebar-controls-resume'),
				_1: {ctor: '[]'}
			}
		},
		{
			ctor: '::',
			_0: _elm_lang$virtual_dom$VirtualDom_Helpers$text('Resume'),
			_1: {ctor: '[]'}
		});
	var _elm_lang$virtual_dom$VirtualDom_Debug$viewResumeButton = function (maybeIndex) {
		var _p7 = maybeIndex;
		if (_p7.ctor === 'Nothing') {
			return _elm_lang$virtual_dom$VirtualDom_Helpers$text('');
		} else {
			return _elm_lang$virtual_dom$VirtualDom_Debug$resumeButton;
		}
	};
	var _elm_lang$virtual_dom$VirtualDom_Debug$playButton = function (maybeIndex) {
		return A2(
			_elm_lang$virtual_dom$VirtualDom_Helpers$div,
			{
				ctor: '::',
				_0: _elm_lang$virtual_dom$VirtualDom_Helpers$class('debugger-sidebar-controls'),
				_1: {ctor: '[]'}
			},
			{
				ctor: '::',
				_0: _elm_lang$virtual_dom$VirtualDom_Debug$viewResumeButton(maybeIndex),
				_1: {
					ctor: '::',
					_0: A2(
						_elm_lang$virtual_dom$VirtualDom_Helpers$div,
						{
							ctor: '::',
							_0: _elm_lang$virtual_dom$VirtualDom_Helpers$class('debugger-sidebar-controls-import-export'),
							_1: {ctor: '[]'}
						},
						{
							ctor: '::',
							_0: A2(_elm_lang$virtual_dom$VirtualDom_Debug$button, _elm_lang$virtual_dom$VirtualDom_Debug$Import, 'Import'),
							_1: {
								ctor: '::',
								_0: _elm_lang$virtual_dom$VirtualDom_Helpers$text(' / '),
								_1: {
									ctor: '::',
									_0: A2(_elm_lang$virtual_dom$VirtualDom_Debug$button, _elm_lang$virtual_dom$VirtualDom_Debug$Export, 'Export'),
									_1: {ctor: '[]'}
								}
							}
						}),
					_1: {ctor: '[]'}
				}
			});
	};
	var _elm_lang$virtual_dom$VirtualDom_Debug$viewSidebar = F2(
		function (state, history) {
			var maybeIndex = function () {
				var _p8 = state;
				if (_p8.ctor === 'Running') {
					return _elm_lang$core$Maybe$Nothing;
				} else {
					return _elm_lang$core$Maybe$Just(_p8._0);
				}
			}();
			return A2(
				_elm_lang$virtual_dom$VirtualDom_Helpers$div,
				{
					ctor: '::',
					_0: _elm_lang$virtual_dom$VirtualDom_Helpers$class('debugger-sidebar'),
					_1: {ctor: '[]'}
				},
				{
					ctor: '::',
					_0: A2(
						_elm_lang$virtual_dom$VirtualDom_Helpers$map,
						_elm_lang$virtual_dom$VirtualDom_Debug$Jump,
						A2(_elm_lang$virtual_dom$VirtualDom_History$view, maybeIndex, history)),
					_1: {
						ctor: '::',
						_0: _elm_lang$virtual_dom$VirtualDom_Debug$playButton(maybeIndex),
						_1: {ctor: '[]'}
					}
				});
		});
	var _elm_lang$virtual_dom$VirtualDom_Debug$ExpandoMsg = function (a) {
		return {ctor: 'ExpandoMsg', _0: a};
	};
	var _elm_lang$virtual_dom$VirtualDom_Debug$viewOut = function (_p9) {
		var _p10 = _p9;
		return A2(
			_elm_lang$virtual_dom$VirtualDom_Helpers$div,
			{
				ctor: '::',
				_0: _elm_lang$virtual_dom$VirtualDom_Helpers$id('debugger'),
				_1: {ctor: '[]'}
			},
			{
				ctor: '::',
				_0: _elm_lang$virtual_dom$VirtualDom_Debug$styles,
				_1: {
					ctor: '::',
					_0: A2(_elm_lang$virtual_dom$VirtualDom_Debug$viewSidebar, _p10.state, _p10.history),
					_1: {
						ctor: '::',
						_0: A2(
							_elm_lang$virtual_dom$VirtualDom_Helpers$map,
							_elm_lang$virtual_dom$VirtualDom_Debug$ExpandoMsg,
							A2(
								_elm_lang$virtual_dom$VirtualDom_Helpers$div,
								{
									ctor: '::',
									_0: _elm_lang$virtual_dom$VirtualDom_Helpers$id('values'),
									_1: {ctor: '[]'}
								},
								{
									ctor: '::',
									_0: A2(_elm_lang$virtual_dom$VirtualDom_Expando$view, _elm_lang$core$Maybe$Nothing, _p10.expando),
									_1: {ctor: '[]'}
								})),
						_1: {ctor: '[]'}
					}
				}
			});
	};
	var _elm_lang$virtual_dom$VirtualDom_Debug$UserMsg = function (a) {
		return {ctor: 'UserMsg', _0: a};
	};
	var _elm_lang$virtual_dom$VirtualDom_Debug$wrapInit = F2(
		function (metadata, _p11) {
			var _p12 = _p11;
			var _p13 = _p12._0;
			return A2(
				_elm_lang$core$Platform_Cmd_ops['!'],
				{
					history: _elm_lang$virtual_dom$VirtualDom_History$empty(_p13),
					state: _elm_lang$virtual_dom$VirtualDom_Debug$Running(_p13),
					expando: _elm_lang$virtual_dom$VirtualDom_Expando$init(_p13),
					metadata: _elm_lang$virtual_dom$VirtualDom_Metadata$decode(metadata),
					overlay: _elm_lang$virtual_dom$VirtualDom_Overlay$none,
					isDebuggerOpen: false
				},
				{
					ctor: '::',
					_0: A2(_elm_lang$core$Platform_Cmd$map, _elm_lang$virtual_dom$VirtualDom_Debug$UserMsg, _p12._1),
					_1: {ctor: '[]'}
				});
		});
	var _elm_lang$virtual_dom$VirtualDom_Debug$wrapSubs = F2(
		function (userSubscriptions, _p14) {
			var _p15 = _p14;
			return A2(
				_elm_lang$core$Platform_Sub$map,
				_elm_lang$virtual_dom$VirtualDom_Debug$UserMsg,
				userSubscriptions(
					_elm_lang$virtual_dom$VirtualDom_Debug$getLatestModel(_p15.state)));
		});
	var _elm_lang$virtual_dom$VirtualDom_Debug$wrapView = F2(
		function (userView, _p16) {
			var _p17 = _p16;
			var currentModel = function () {
				var _p18 = _p17.state;
				if (_p18.ctor === 'Running') {
					return _p18._0;
				} else {
					return _p18._1;
				}
			}();
			return A2(
				_elm_lang$virtual_dom$VirtualDom_Helpers$map,
				_elm_lang$virtual_dom$VirtualDom_Debug$UserMsg,
				userView(currentModel));
		});
	var _elm_lang$virtual_dom$VirtualDom_Debug$NoOp = {ctor: 'NoOp'};
	var _elm_lang$virtual_dom$VirtualDom_Debug$download = F2(
		function (metadata, history) {
			var json = _elm_lang$core$Json_Encode$object(
				{
					ctor: '::',
					_0: {
						ctor: '_Tuple2',
						_0: 'metadata',
						_1: _elm_lang$virtual_dom$VirtualDom_Metadata$encode(metadata)
					},
					_1: {
						ctor: '::',
						_0: {
							ctor: '_Tuple2',
							_0: 'history',
							_1: _elm_lang$virtual_dom$VirtualDom_History$encode(history)
						},
						_1: {ctor: '[]'}
					}
				});
			var historyLength = _elm_lang$virtual_dom$VirtualDom_History$size(history);
			return A2(
				_elm_lang$core$Task$perform,
				function (_p19) {
					return _elm_lang$virtual_dom$VirtualDom_Debug$NoOp;
				},
				A2(_elm_lang$virtual_dom$Native_Debug.download, historyLength, json));
		});
	var _elm_lang$virtual_dom$VirtualDom_Debug$runIf = F2(
		function (bool, task) {
			return bool ? A2(
				_elm_lang$core$Task$perform,
				_elm_lang$core$Basics$always(_elm_lang$virtual_dom$VirtualDom_Debug$NoOp),
				task) : _elm_lang$core$Platform_Cmd$none;
		});
	var _elm_lang$virtual_dom$VirtualDom_Debug$updateUserMsg = F4(
		function (userUpdate, scrollTask, userMsg, _p20) {
			var _p21 = _p20;
			var _p25 = _p21.state;
			var _p24 = _p21;
			var userModel = _elm_lang$virtual_dom$VirtualDom_Debug$getLatestModel(_p25);
			var newHistory = A3(_elm_lang$virtual_dom$VirtualDom_History$add, userMsg, userModel, _p21.history);
			var _p22 = A2(userUpdate, userMsg, userModel);
			var newUserModel = _p22._0;
			var userCmds = _p22._1;
			var commands = A2(_elm_lang$core$Platform_Cmd$map, _elm_lang$virtual_dom$VirtualDom_Debug$UserMsg, userCmds);
			var _p23 = _p25;
			if (_p23.ctor === 'Running') {
				return A2(
					_elm_lang$core$Platform_Cmd_ops['!'],
					_elm_lang$core$Native_Utils.update(
						_p24,
						{
							history: newHistory,
							state: _elm_lang$virtual_dom$VirtualDom_Debug$Running(newUserModel),
							expando: A2(_elm_lang$virtual_dom$VirtualDom_Expando$merge, newUserModel, _p21.expando)
						}),
					{
						ctor: '::',
						_0: commands,
						_1: {
							ctor: '::',
							_0: A2(_elm_lang$virtual_dom$VirtualDom_Debug$runIf, _p24.isDebuggerOpen, scrollTask),
							_1: {ctor: '[]'}
						}
					});
			} else {
				return A2(
					_elm_lang$core$Platform_Cmd_ops['!'],
					_elm_lang$core$Native_Utils.update(
						_p24,
						{
							history: newHistory,
							state: A3(_elm_lang$virtual_dom$VirtualDom_Debug$Paused, _p23._0, _p23._1, newUserModel)
						}),
					{
						ctor: '::',
						_0: commands,
						_1: {ctor: '[]'}
					});
			}
		});
	var _elm_lang$virtual_dom$VirtualDom_Debug$wrapUpdate = F4(
		function (userUpdate, scrollTask, msg, model) {
			wrapUpdate:
			while (true) {
				var _p26 = msg;
				switch (_p26.ctor) {
					case 'NoOp':
						return A2(
							_elm_lang$core$Platform_Cmd_ops['!'],
							model,
							{ctor: '[]'});
					case 'UserMsg':
						return A4(_elm_lang$virtual_dom$VirtualDom_Debug$updateUserMsg, userUpdate, scrollTask, _p26._0, model);
					case 'ExpandoMsg':
						return A2(
							_elm_lang$core$Platform_Cmd_ops['!'],
							_elm_lang$core$Native_Utils.update(
								model,
								{
									expando: A2(_elm_lang$virtual_dom$VirtualDom_Expando$update, _p26._0, model.expando)
								}),
							{ctor: '[]'});
					case 'Resume':
						var _p27 = model.state;
						if (_p27.ctor === 'Running') {
							return A2(
								_elm_lang$core$Platform_Cmd_ops['!'],
								model,
								{ctor: '[]'});
						} else {
							var _p28 = _p27._2;
							return A2(
								_elm_lang$core$Platform_Cmd_ops['!'],
								_elm_lang$core$Native_Utils.update(
									model,
									{
										state: _elm_lang$virtual_dom$VirtualDom_Debug$Running(_p28),
										expando: A2(_elm_lang$virtual_dom$VirtualDom_Expando$merge, _p28, model.expando)
									}),
								{
									ctor: '::',
									_0: A2(_elm_lang$virtual_dom$VirtualDom_Debug$runIf, model.isDebuggerOpen, scrollTask),
									_1: {ctor: '[]'}
								});
						}
					case 'Jump':
						var _p30 = _p26._0;
						var _p29 = A3(_elm_lang$virtual_dom$VirtualDom_History$get, userUpdate, _p30, model.history);
						var indexModel = _p29._0;
						var indexMsg = _p29._1;
						return A2(
							_elm_lang$core$Platform_Cmd_ops['!'],
							_elm_lang$core$Native_Utils.update(
								model,
								{
									state: A3(
										_elm_lang$virtual_dom$VirtualDom_Debug$Paused,
										_p30,
										indexModel,
										_elm_lang$virtual_dom$VirtualDom_Debug$getLatestModel(model.state)),
									expando: A2(_elm_lang$virtual_dom$VirtualDom_Expando$merge, indexModel, model.expando)
								}),
							{ctor: '[]'});
					case 'Open':
						return A2(
							_elm_lang$core$Platform_Cmd_ops['!'],
							_elm_lang$core$Native_Utils.update(
								model,
								{isDebuggerOpen: true}),
							{ctor: '[]'});
					case 'Close':
						return A2(
							_elm_lang$core$Platform_Cmd_ops['!'],
							_elm_lang$core$Native_Utils.update(
								model,
								{isDebuggerOpen: false}),
							{ctor: '[]'});
					case 'Up':
						var index = function () {
							var _p31 = model.state;
							if (_p31.ctor === 'Paused') {
								return _p31._0;
							} else {
								return _elm_lang$virtual_dom$VirtualDom_History$size(model.history);
							}
						}();
						if (_elm_lang$core$Native_Utils.cmp(index, 0) > 0) {
							var _v17 = userUpdate,
								_v18 = scrollTask,
								_v19 = _elm_lang$virtual_dom$VirtualDom_Debug$Jump(index - 1),
								_v20 = model;
							userUpdate = _v17;
							scrollTask = _v18;
							msg = _v19;
							model = _v20;
							continue wrapUpdate;
						} else {
							return A2(
								_elm_lang$core$Platform_Cmd_ops['!'],
								model,
								{ctor: '[]'});
						}
					case 'Down':
						var _p32 = model.state;
						if (_p32.ctor === 'Running') {
							return A2(
								_elm_lang$core$Platform_Cmd_ops['!'],
								model,
								{ctor: '[]'});
						} else {
							var _p33 = _p32._0;
							if (_elm_lang$core$Native_Utils.eq(
								_p33,
								_elm_lang$virtual_dom$VirtualDom_History$size(model.history) - 1)) {
								var _v22 = userUpdate,
									_v23 = scrollTask,
									_v24 = _elm_lang$virtual_dom$VirtualDom_Debug$Resume,
									_v25 = model;
								userUpdate = _v22;
								scrollTask = _v23;
								msg = _v24;
								model = _v25;
								continue wrapUpdate;
							} else {
								var _v26 = userUpdate,
									_v27 = scrollTask,
									_v28 = _elm_lang$virtual_dom$VirtualDom_Debug$Jump(_p33 + 1),
									_v29 = model;
								userUpdate = _v26;
								scrollTask = _v27;
								msg = _v28;
								model = _v29;
								continue wrapUpdate;
							}
						}
					case 'Import':
						return A2(
							_elm_lang$virtual_dom$VirtualDom_Debug$withGoodMetadata,
							model,
							function (_p34) {
								return A2(
									_elm_lang$core$Platform_Cmd_ops['!'],
									model,
									{
										ctor: '::',
										_0: _elm_lang$virtual_dom$VirtualDom_Debug$upload,
										_1: {ctor: '[]'}
									});
							});
					case 'Export':
						return A2(
							_elm_lang$virtual_dom$VirtualDom_Debug$withGoodMetadata,
							model,
							function (metadata) {
								return A2(
									_elm_lang$core$Platform_Cmd_ops['!'],
									model,
									{
										ctor: '::',
										_0: A2(_elm_lang$virtual_dom$VirtualDom_Debug$download, metadata, model.history),
										_1: {ctor: '[]'}
									});
							});
					case 'Upload':
						return A2(
							_elm_lang$virtual_dom$VirtualDom_Debug$withGoodMetadata,
							model,
							function (metadata) {
								var _p35 = A2(_elm_lang$virtual_dom$VirtualDom_Overlay$assessImport, metadata, _p26._0);
								if (_p35.ctor === 'Err') {
									return A2(
										_elm_lang$core$Platform_Cmd_ops['!'],
										_elm_lang$core$Native_Utils.update(
											model,
											{overlay: _p35._0}),
										{ctor: '[]'});
								} else {
									return A3(_elm_lang$virtual_dom$VirtualDom_Debug$loadNewHistory, _p35._0, userUpdate, model);
								}
							});
					default:
						var _p36 = A2(_elm_lang$virtual_dom$VirtualDom_Overlay$close, _p26._0, model.overlay);
						if (_p36.ctor === 'Nothing') {
							return A2(
								_elm_lang$core$Platform_Cmd_ops['!'],
								_elm_lang$core$Native_Utils.update(
									model,
									{overlay: _elm_lang$virtual_dom$VirtualDom_Overlay$none}),
								{ctor: '[]'});
						} else {
							return A3(_elm_lang$virtual_dom$VirtualDom_Debug$loadNewHistory, _p36._0, userUpdate, model);
						}
				}
			}
		});
	var _elm_lang$virtual_dom$VirtualDom_Debug$wrap = F2(
		function (metadata, _p37) {
			var _p38 = _p37;
			return {
				init: A2(_elm_lang$virtual_dom$VirtualDom_Debug$wrapInit, metadata, _p38.init),
				view: _elm_lang$virtual_dom$VirtualDom_Debug$wrapView(_p38.view),
				update: _elm_lang$virtual_dom$VirtualDom_Debug$wrapUpdate(_p38.update),
				viewIn: _elm_lang$virtual_dom$VirtualDom_Debug$viewIn,
				viewOut: _elm_lang$virtual_dom$VirtualDom_Debug$viewOut,
				subscriptions: _elm_lang$virtual_dom$VirtualDom_Debug$wrapSubs(_p38.subscriptions)
			};
		});
	var _elm_lang$virtual_dom$VirtualDom_Debug$wrapWithFlags = F2(
		function (metadata, _p39) {
			var _p40 = _p39;
			return {
				init: function (flags) {
					return A2(
						_elm_lang$virtual_dom$VirtualDom_Debug$wrapInit,
						metadata,
						_p40.init(flags));
				},
				view: _elm_lang$virtual_dom$VirtualDom_Debug$wrapView(_p40.view),
				update: _elm_lang$virtual_dom$VirtualDom_Debug$wrapUpdate(_p40.update),
				viewIn: _elm_lang$virtual_dom$VirtualDom_Debug$viewIn,
				viewOut: _elm_lang$virtual_dom$VirtualDom_Debug$viewOut,
				subscriptions: _elm_lang$virtual_dom$VirtualDom_Debug$wrapSubs(_p40.subscriptions)
			};
		});
	
	var _elm_lang$virtual_dom$VirtualDom$programWithFlags = function (impl) {
		return A2(_elm_lang$virtual_dom$Native_VirtualDom.programWithFlags, _elm_lang$virtual_dom$VirtualDom_Debug$wrapWithFlags, impl);
	};
	var _elm_lang$virtual_dom$VirtualDom$program = function (impl) {
		return A2(_elm_lang$virtual_dom$Native_VirtualDom.program, _elm_lang$virtual_dom$VirtualDom_Debug$wrap, impl);
	};
	var _elm_lang$virtual_dom$VirtualDom$keyedNode = _elm_lang$virtual_dom$Native_VirtualDom.keyedNode;
	var _elm_lang$virtual_dom$VirtualDom$lazy3 = _elm_lang$virtual_dom$Native_VirtualDom.lazy3;
	var _elm_lang$virtual_dom$VirtualDom$lazy2 = _elm_lang$virtual_dom$Native_VirtualDom.lazy2;
	var _elm_lang$virtual_dom$VirtualDom$lazy = _elm_lang$virtual_dom$Native_VirtualDom.lazy;
	var _elm_lang$virtual_dom$VirtualDom$defaultOptions = {stopPropagation: false, preventDefault: false};
	var _elm_lang$virtual_dom$VirtualDom$onWithOptions = _elm_lang$virtual_dom$Native_VirtualDom.on;
	var _elm_lang$virtual_dom$VirtualDom$on = F2(
		function (eventName, decoder) {
			return A3(_elm_lang$virtual_dom$VirtualDom$onWithOptions, eventName, _elm_lang$virtual_dom$VirtualDom$defaultOptions, decoder);
		});
	var _elm_lang$virtual_dom$VirtualDom$style = _elm_lang$virtual_dom$Native_VirtualDom.style;
	var _elm_lang$virtual_dom$VirtualDom$mapProperty = _elm_lang$virtual_dom$Native_VirtualDom.mapProperty;
	var _elm_lang$virtual_dom$VirtualDom$attributeNS = _elm_lang$virtual_dom$Native_VirtualDom.attributeNS;
	var _elm_lang$virtual_dom$VirtualDom$attribute = _elm_lang$virtual_dom$Native_VirtualDom.attribute;
	var _elm_lang$virtual_dom$VirtualDom$property = _elm_lang$virtual_dom$Native_VirtualDom.property;
	var _elm_lang$virtual_dom$VirtualDom$map = _elm_lang$virtual_dom$Native_VirtualDom.map;
	var _elm_lang$virtual_dom$VirtualDom$text = _elm_lang$virtual_dom$Native_VirtualDom.text;
	var _elm_lang$virtual_dom$VirtualDom$node = _elm_lang$virtual_dom$Native_VirtualDom.node;
	var _elm_lang$virtual_dom$VirtualDom$Options = F2(
		function (a, b) {
			return {stopPropagation: a, preventDefault: b};
		});
	var _elm_lang$virtual_dom$VirtualDom$Node = {ctor: 'Node'};
	var _elm_lang$virtual_dom$VirtualDom$Property = {ctor: 'Property'};
	
	var _elm_lang$html$Html$programWithFlags = _elm_lang$virtual_dom$VirtualDom$programWithFlags;
	var _elm_lang$html$Html$program = _elm_lang$virtual_dom$VirtualDom$program;
	var _elm_lang$html$Html$beginnerProgram = function (_p0) {
		var _p1 = _p0;
		return _elm_lang$html$Html$program(
			{
				init: A2(
					_elm_lang$core$Platform_Cmd_ops['!'],
					_p1.model,
					{ctor: '[]'}),
				update: F2(
					function (msg, model) {
						return A2(
							_elm_lang$core$Platform_Cmd_ops['!'],
							A2(_p1.update, msg, model),
							{ctor: '[]'});
					}),
				view: _p1.view,
				subscriptions: function (_p2) {
					return _elm_lang$core$Platform_Sub$none;
				}
			});
	};
	var _elm_lang$html$Html$map = _elm_lang$virtual_dom$VirtualDom$map;
	var _elm_lang$html$Html$text = _elm_lang$virtual_dom$VirtualDom$text;
	var _elm_lang$html$Html$node = _elm_lang$virtual_dom$VirtualDom$node;
	var _elm_lang$html$Html$body = _elm_lang$html$Html$node('body');
	var _elm_lang$html$Html$section = _elm_lang$html$Html$node('section');
	var _elm_lang$html$Html$nav = _elm_lang$html$Html$node('nav');
	var _elm_lang$html$Html$article = _elm_lang$html$Html$node('article');
	var _elm_lang$html$Html$aside = _elm_lang$html$Html$node('aside');
	var _elm_lang$html$Html$h1 = _elm_lang$html$Html$node('h1');
	var _elm_lang$html$Html$h2 = _elm_lang$html$Html$node('h2');
	var _elm_lang$html$Html$h3 = _elm_lang$html$Html$node('h3');
	var _elm_lang$html$Html$h4 = _elm_lang$html$Html$node('h4');
	var _elm_lang$html$Html$h5 = _elm_lang$html$Html$node('h5');
	var _elm_lang$html$Html$h6 = _elm_lang$html$Html$node('h6');
	var _elm_lang$html$Html$header = _elm_lang$html$Html$node('header');
	var _elm_lang$html$Html$footer = _elm_lang$html$Html$node('footer');
	var _elm_lang$html$Html$address = _elm_lang$html$Html$node('address');
	var _elm_lang$html$Html$main_ = _elm_lang$html$Html$node('main');
	var _elm_lang$html$Html$p = _elm_lang$html$Html$node('p');
	var _elm_lang$html$Html$hr = _elm_lang$html$Html$node('hr');
	var _elm_lang$html$Html$pre = _elm_lang$html$Html$node('pre');
	var _elm_lang$html$Html$blockquote = _elm_lang$html$Html$node('blockquote');
	var _elm_lang$html$Html$ol = _elm_lang$html$Html$node('ol');
	var _elm_lang$html$Html$ul = _elm_lang$html$Html$node('ul');
	var _elm_lang$html$Html$li = _elm_lang$html$Html$node('li');
	var _elm_lang$html$Html$dl = _elm_lang$html$Html$node('dl');
	var _elm_lang$html$Html$dt = _elm_lang$html$Html$node('dt');
	var _elm_lang$html$Html$dd = _elm_lang$html$Html$node('dd');
	var _elm_lang$html$Html$figure = _elm_lang$html$Html$node('figure');
	var _elm_lang$html$Html$figcaption = _elm_lang$html$Html$node('figcaption');
	var _elm_lang$html$Html$div = _elm_lang$html$Html$node('div');
	var _elm_lang$html$Html$a = _elm_lang$html$Html$node('a');
	var _elm_lang$html$Html$em = _elm_lang$html$Html$node('em');
	var _elm_lang$html$Html$strong = _elm_lang$html$Html$node('strong');
	var _elm_lang$html$Html$small = _elm_lang$html$Html$node('small');
	var _elm_lang$html$Html$s = _elm_lang$html$Html$node('s');
	var _elm_lang$html$Html$cite = _elm_lang$html$Html$node('cite');
	var _elm_lang$html$Html$q = _elm_lang$html$Html$node('q');
	var _elm_lang$html$Html$dfn = _elm_lang$html$Html$node('dfn');
	var _elm_lang$html$Html$abbr = _elm_lang$html$Html$node('abbr');
	var _elm_lang$html$Html$time = _elm_lang$html$Html$node('time');
	var _elm_lang$html$Html$code = _elm_lang$html$Html$node('code');
	var _elm_lang$html$Html$var = _elm_lang$html$Html$node('var');
	var _elm_lang$html$Html$samp = _elm_lang$html$Html$node('samp');
	var _elm_lang$html$Html$kbd = _elm_lang$html$Html$node('kbd');
	var _elm_lang$html$Html$sub = _elm_lang$html$Html$node('sub');
	var _elm_lang$html$Html$sup = _elm_lang$html$Html$node('sup');
	var _elm_lang$html$Html$i = _elm_lang$html$Html$node('i');
	var _elm_lang$html$Html$b = _elm_lang$html$Html$node('b');
	var _elm_lang$html$Html$u = _elm_lang$html$Html$node('u');
	var _elm_lang$html$Html$mark = _elm_lang$html$Html$node('mark');
	var _elm_lang$html$Html$ruby = _elm_lang$html$Html$node('ruby');
	var _elm_lang$html$Html$rt = _elm_lang$html$Html$node('rt');
	var _elm_lang$html$Html$rp = _elm_lang$html$Html$node('rp');
	var _elm_lang$html$Html$bdi = _elm_lang$html$Html$node('bdi');
	var _elm_lang$html$Html$bdo = _elm_lang$html$Html$node('bdo');
	var _elm_lang$html$Html$span = _elm_lang$html$Html$node('span');
	var _elm_lang$html$Html$br = _elm_lang$html$Html$node('br');
	var _elm_lang$html$Html$wbr = _elm_lang$html$Html$node('wbr');
	var _elm_lang$html$Html$ins = _elm_lang$html$Html$node('ins');
	var _elm_lang$html$Html$del = _elm_lang$html$Html$node('del');
	var _elm_lang$html$Html$img = _elm_lang$html$Html$node('img');
	var _elm_lang$html$Html$iframe = _elm_lang$html$Html$node('iframe');
	var _elm_lang$html$Html$embed = _elm_lang$html$Html$node('embed');
	var _elm_lang$html$Html$object = _elm_lang$html$Html$node('object');
	var _elm_lang$html$Html$param = _elm_lang$html$Html$node('param');
	var _elm_lang$html$Html$video = _elm_lang$html$Html$node('video');
	var _elm_lang$html$Html$audio = _elm_lang$html$Html$node('audio');
	var _elm_lang$html$Html$source = _elm_lang$html$Html$node('source');
	var _elm_lang$html$Html$track = _elm_lang$html$Html$node('track');
	var _elm_lang$html$Html$canvas = _elm_lang$html$Html$node('canvas');
	var _elm_lang$html$Html$math = _elm_lang$html$Html$node('math');
	var _elm_lang$html$Html$table = _elm_lang$html$Html$node('table');
	var _elm_lang$html$Html$caption = _elm_lang$html$Html$node('caption');
	var _elm_lang$html$Html$colgroup = _elm_lang$html$Html$node('colgroup');
	var _elm_lang$html$Html$col = _elm_lang$html$Html$node('col');
	var _elm_lang$html$Html$tbody = _elm_lang$html$Html$node('tbody');
	var _elm_lang$html$Html$thead = _elm_lang$html$Html$node('thead');
	var _elm_lang$html$Html$tfoot = _elm_lang$html$Html$node('tfoot');
	var _elm_lang$html$Html$tr = _elm_lang$html$Html$node('tr');
	var _elm_lang$html$Html$td = _elm_lang$html$Html$node('td');
	var _elm_lang$html$Html$th = _elm_lang$html$Html$node('th');
	var _elm_lang$html$Html$form = _elm_lang$html$Html$node('form');
	var _elm_lang$html$Html$fieldset = _elm_lang$html$Html$node('fieldset');
	var _elm_lang$html$Html$legend = _elm_lang$html$Html$node('legend');
	var _elm_lang$html$Html$label = _elm_lang$html$Html$node('label');
	var _elm_lang$html$Html$input = _elm_lang$html$Html$node('input');
	var _elm_lang$html$Html$button = _elm_lang$html$Html$node('button');
	var _elm_lang$html$Html$select = _elm_lang$html$Html$node('select');
	var _elm_lang$html$Html$datalist = _elm_lang$html$Html$node('datalist');
	var _elm_lang$html$Html$optgroup = _elm_lang$html$Html$node('optgroup');
	var _elm_lang$html$Html$option = _elm_lang$html$Html$node('option');
	var _elm_lang$html$Html$textarea = _elm_lang$html$Html$node('textarea');
	var _elm_lang$html$Html$keygen = _elm_lang$html$Html$node('keygen');
	var _elm_lang$html$Html$output = _elm_lang$html$Html$node('output');
	var _elm_lang$html$Html$progress = _elm_lang$html$Html$node('progress');
	var _elm_lang$html$Html$meter = _elm_lang$html$Html$node('meter');
	var _elm_lang$html$Html$details = _elm_lang$html$Html$node('details');
	var _elm_lang$html$Html$summary = _elm_lang$html$Html$node('summary');
	var _elm_lang$html$Html$menuitem = _elm_lang$html$Html$node('menuitem');
	var _elm_lang$html$Html$menu = _elm_lang$html$Html$node('menu');
	
	var _elm_lang$html$Html_Attributes$map = _elm_lang$virtual_dom$VirtualDom$mapProperty;
	var _elm_lang$html$Html_Attributes$attribute = _elm_lang$virtual_dom$VirtualDom$attribute;
	var _elm_lang$html$Html_Attributes$contextmenu = function (value) {
		return A2(_elm_lang$html$Html_Attributes$attribute, 'contextmenu', value);
	};
	var _elm_lang$html$Html_Attributes$draggable = function (value) {
		return A2(_elm_lang$html$Html_Attributes$attribute, 'draggable', value);
	};
	var _elm_lang$html$Html_Attributes$itemprop = function (value) {
		return A2(_elm_lang$html$Html_Attributes$attribute, 'itemprop', value);
	};
	var _elm_lang$html$Html_Attributes$tabindex = function (n) {
		return A2(
			_elm_lang$html$Html_Attributes$attribute,
			'tabIndex',
			_elm_lang$core$Basics$toString(n));
	};
	var _elm_lang$html$Html_Attributes$charset = function (value) {
		return A2(_elm_lang$html$Html_Attributes$attribute, 'charset', value);
	};
	var _elm_lang$html$Html_Attributes$height = function (value) {
		return A2(
			_elm_lang$html$Html_Attributes$attribute,
			'height',
			_elm_lang$core$Basics$toString(value));
	};
	var _elm_lang$html$Html_Attributes$width = function (value) {
		return A2(
			_elm_lang$html$Html_Attributes$attribute,
			'width',
			_elm_lang$core$Basics$toString(value));
	};
	var _elm_lang$html$Html_Attributes$formaction = function (value) {
		return A2(_elm_lang$html$Html_Attributes$attribute, 'formAction', value);
	};
	var _elm_lang$html$Html_Attributes$list = function (value) {
		return A2(_elm_lang$html$Html_Attributes$attribute, 'list', value);
	};
	var _elm_lang$html$Html_Attributes$minlength = function (n) {
		return A2(
			_elm_lang$html$Html_Attributes$attribute,
			'minLength',
			_elm_lang$core$Basics$toString(n));
	};
	var _elm_lang$html$Html_Attributes$maxlength = function (n) {
		return A2(
			_elm_lang$html$Html_Attributes$attribute,
			'maxlength',
			_elm_lang$core$Basics$toString(n));
	};
	var _elm_lang$html$Html_Attributes$size = function (n) {
		return A2(
			_elm_lang$html$Html_Attributes$attribute,
			'size',
			_elm_lang$core$Basics$toString(n));
	};
	var _elm_lang$html$Html_Attributes$form = function (value) {
		return A2(_elm_lang$html$Html_Attributes$attribute, 'form', value);
	};
	var _elm_lang$html$Html_Attributes$cols = function (n) {
		return A2(
			_elm_lang$html$Html_Attributes$attribute,
			'cols',
			_elm_lang$core$Basics$toString(n));
	};
	var _elm_lang$html$Html_Attributes$rows = function (n) {
		return A2(
			_elm_lang$html$Html_Attributes$attribute,
			'rows',
			_elm_lang$core$Basics$toString(n));
	};
	var _elm_lang$html$Html_Attributes$challenge = function (value) {
		return A2(_elm_lang$html$Html_Attributes$attribute, 'challenge', value);
	};
	var _elm_lang$html$Html_Attributes$media = function (value) {
		return A2(_elm_lang$html$Html_Attributes$attribute, 'media', value);
	};
	var _elm_lang$html$Html_Attributes$rel = function (value) {
		return A2(_elm_lang$html$Html_Attributes$attribute, 'rel', value);
	};
	var _elm_lang$html$Html_Attributes$datetime = function (value) {
		return A2(_elm_lang$html$Html_Attributes$attribute, 'datetime', value);
	};
	var _elm_lang$html$Html_Attributes$pubdate = function (value) {
		return A2(_elm_lang$html$Html_Attributes$attribute, 'pubdate', value);
	};
	var _elm_lang$html$Html_Attributes$colspan = function (n) {
		return A2(
			_elm_lang$html$Html_Attributes$attribute,
			'colspan',
			_elm_lang$core$Basics$toString(n));
	};
	var _elm_lang$html$Html_Attributes$rowspan = function (n) {
		return A2(
			_elm_lang$html$Html_Attributes$attribute,
			'rowspan',
			_elm_lang$core$Basics$toString(n));
	};
	var _elm_lang$html$Html_Attributes$manifest = function (value) {
		return A2(_elm_lang$html$Html_Attributes$attribute, 'manifest', value);
	};
	var _elm_lang$html$Html_Attributes$property = _elm_lang$virtual_dom$VirtualDom$property;
	var _elm_lang$html$Html_Attributes$stringProperty = F2(
		function (name, string) {
			return A2(
				_elm_lang$html$Html_Attributes$property,
				name,
				_elm_lang$core$Json_Encode$string(string));
		});
	var _elm_lang$html$Html_Attributes$class = function (name) {
		return A2(_elm_lang$html$Html_Attributes$stringProperty, 'className', name);
	};
	var _elm_lang$html$Html_Attributes$id = function (name) {
		return A2(_elm_lang$html$Html_Attributes$stringProperty, 'id', name);
	};
	var _elm_lang$html$Html_Attributes$title = function (name) {
		return A2(_elm_lang$html$Html_Attributes$stringProperty, 'title', name);
	};
	var _elm_lang$html$Html_Attributes$accesskey = function ($char) {
		return A2(
			_elm_lang$html$Html_Attributes$stringProperty,
			'accessKey',
			_elm_lang$core$String$fromChar($char));
	};
	var _elm_lang$html$Html_Attributes$dir = function (value) {
		return A2(_elm_lang$html$Html_Attributes$stringProperty, 'dir', value);
	};
	var _elm_lang$html$Html_Attributes$dropzone = function (value) {
		return A2(_elm_lang$html$Html_Attributes$stringProperty, 'dropzone', value);
	};
	var _elm_lang$html$Html_Attributes$lang = function (value) {
		return A2(_elm_lang$html$Html_Attributes$stringProperty, 'lang', value);
	};
	var _elm_lang$html$Html_Attributes$content = function (value) {
		return A2(_elm_lang$html$Html_Attributes$stringProperty, 'content', value);
	};
	var _elm_lang$html$Html_Attributes$httpEquiv = function (value) {
		return A2(_elm_lang$html$Html_Attributes$stringProperty, 'httpEquiv', value);
	};
	var _elm_lang$html$Html_Attributes$language = function (value) {
		return A2(_elm_lang$html$Html_Attributes$stringProperty, 'language', value);
	};
	var _elm_lang$html$Html_Attributes$src = function (value) {
		return A2(_elm_lang$html$Html_Attributes$stringProperty, 'src', value);
	};
	var _elm_lang$html$Html_Attributes$alt = function (value) {
		return A2(_elm_lang$html$Html_Attributes$stringProperty, 'alt', value);
	};
	var _elm_lang$html$Html_Attributes$preload = function (value) {
		return A2(_elm_lang$html$Html_Attributes$stringProperty, 'preload', value);
	};
	var _elm_lang$html$Html_Attributes$poster = function (value) {
		return A2(_elm_lang$html$Html_Attributes$stringProperty, 'poster', value);
	};
	var _elm_lang$html$Html_Attributes$kind = function (value) {
		return A2(_elm_lang$html$Html_Attributes$stringProperty, 'kind', value);
	};
	var _elm_lang$html$Html_Attributes$srclang = function (value) {
		return A2(_elm_lang$html$Html_Attributes$stringProperty, 'srclang', value);
	};
	var _elm_lang$html$Html_Attributes$sandbox = function (value) {
		return A2(_elm_lang$html$Html_Attributes$stringProperty, 'sandbox', value);
	};
	var _elm_lang$html$Html_Attributes$srcdoc = function (value) {
		return A2(_elm_lang$html$Html_Attributes$stringProperty, 'srcdoc', value);
	};
	var _elm_lang$html$Html_Attributes$type_ = function (value) {
		return A2(_elm_lang$html$Html_Attributes$stringProperty, 'type', value);
	};
	var _elm_lang$html$Html_Attributes$value = function (value) {
		return A2(_elm_lang$html$Html_Attributes$stringProperty, 'value', value);
	};
	var _elm_lang$html$Html_Attributes$defaultValue = function (value) {
		return A2(_elm_lang$html$Html_Attributes$stringProperty, 'defaultValue', value);
	};
	var _elm_lang$html$Html_Attributes$placeholder = function (value) {
		return A2(_elm_lang$html$Html_Attributes$stringProperty, 'placeholder', value);
	};
	var _elm_lang$html$Html_Attributes$accept = function (value) {
		return A2(_elm_lang$html$Html_Attributes$stringProperty, 'accept', value);
	};
	var _elm_lang$html$Html_Attributes$acceptCharset = function (value) {
		return A2(_elm_lang$html$Html_Attributes$stringProperty, 'acceptCharset', value);
	};
	var _elm_lang$html$Html_Attributes$action = function (value) {
		return A2(_elm_lang$html$Html_Attributes$stringProperty, 'action', value);
	};
	var _elm_lang$html$Html_Attributes$autocomplete = function (bool) {
		return A2(
			_elm_lang$html$Html_Attributes$stringProperty,
			'autocomplete',
			bool ? 'on' : 'off');
	};
	var _elm_lang$html$Html_Attributes$enctype = function (value) {
		return A2(_elm_lang$html$Html_Attributes$stringProperty, 'enctype', value);
	};
	var _elm_lang$html$Html_Attributes$method = function (value) {
		return A2(_elm_lang$html$Html_Attributes$stringProperty, 'method', value);
	};
	var _elm_lang$html$Html_Attributes$name = function (value) {
		return A2(_elm_lang$html$Html_Attributes$stringProperty, 'name', value);
	};
	var _elm_lang$html$Html_Attributes$pattern = function (value) {
		return A2(_elm_lang$html$Html_Attributes$stringProperty, 'pattern', value);
	};
	var _elm_lang$html$Html_Attributes$for = function (value) {
		return A2(_elm_lang$html$Html_Attributes$stringProperty, 'htmlFor', value);
	};
	var _elm_lang$html$Html_Attributes$max = function (value) {
		return A2(_elm_lang$html$Html_Attributes$stringProperty, 'max', value);
	};
	var _elm_lang$html$Html_Attributes$min = function (value) {
		return A2(_elm_lang$html$Html_Attributes$stringProperty, 'min', value);
	};
	var _elm_lang$html$Html_Attributes$step = function (n) {
		return A2(_elm_lang$html$Html_Attributes$stringProperty, 'step', n);
	};
	var _elm_lang$html$Html_Attributes$wrap = function (value) {
		return A2(_elm_lang$html$Html_Attributes$stringProperty, 'wrap', value);
	};
	var _elm_lang$html$Html_Attributes$usemap = function (value) {
		return A2(_elm_lang$html$Html_Attributes$stringProperty, 'useMap', value);
	};
	var _elm_lang$html$Html_Attributes$shape = function (value) {
		return A2(_elm_lang$html$Html_Attributes$stringProperty, 'shape', value);
	};
	var _elm_lang$html$Html_Attributes$coords = function (value) {
		return A2(_elm_lang$html$Html_Attributes$stringProperty, 'coords', value);
	};
	var _elm_lang$html$Html_Attributes$keytype = function (value) {
		return A2(_elm_lang$html$Html_Attributes$stringProperty, 'keytype', value);
	};
	var _elm_lang$html$Html_Attributes$align = function (value) {
		return A2(_elm_lang$html$Html_Attributes$stringProperty, 'align', value);
	};
	var _elm_lang$html$Html_Attributes$cite = function (value) {
		return A2(_elm_lang$html$Html_Attributes$stringProperty, 'cite', value);
	};
	var _elm_lang$html$Html_Attributes$href = function (value) {
		return A2(_elm_lang$html$Html_Attributes$stringProperty, 'href', value);
	};
	var _elm_lang$html$Html_Attributes$target = function (value) {
		return A2(_elm_lang$html$Html_Attributes$stringProperty, 'target', value);
	};
	var _elm_lang$html$Html_Attributes$downloadAs = function (value) {
		return A2(_elm_lang$html$Html_Attributes$stringProperty, 'download', value);
	};
	var _elm_lang$html$Html_Attributes$hreflang = function (value) {
		return A2(_elm_lang$html$Html_Attributes$stringProperty, 'hreflang', value);
	};
	var _elm_lang$html$Html_Attributes$ping = function (value) {
		return A2(_elm_lang$html$Html_Attributes$stringProperty, 'ping', value);
	};
	var _elm_lang$html$Html_Attributes$start = function (n) {
		return A2(
			_elm_lang$html$Html_Attributes$stringProperty,
			'start',
			_elm_lang$core$Basics$toString(n));
	};
	var _elm_lang$html$Html_Attributes$headers = function (value) {
		return A2(_elm_lang$html$Html_Attributes$stringProperty, 'headers', value);
	};
	var _elm_lang$html$Html_Attributes$scope = function (value) {
		return A2(_elm_lang$html$Html_Attributes$stringProperty, 'scope', value);
	};
	var _elm_lang$html$Html_Attributes$boolProperty = F2(
		function (name, bool) {
			return A2(
				_elm_lang$html$Html_Attributes$property,
				name,
				_elm_lang$core$Json_Encode$bool(bool));
		});
	var _elm_lang$html$Html_Attributes$hidden = function (bool) {
		return A2(_elm_lang$html$Html_Attributes$boolProperty, 'hidden', bool);
	};
	var _elm_lang$html$Html_Attributes$contenteditable = function (bool) {
		return A2(_elm_lang$html$Html_Attributes$boolProperty, 'contentEditable', bool);
	};
	var _elm_lang$html$Html_Attributes$spellcheck = function (bool) {
		return A2(_elm_lang$html$Html_Attributes$boolProperty, 'spellcheck', bool);
	};
	var _elm_lang$html$Html_Attributes$async = function (bool) {
		return A2(_elm_lang$html$Html_Attributes$boolProperty, 'async', bool);
	};
	var _elm_lang$html$Html_Attributes$defer = function (bool) {
		return A2(_elm_lang$html$Html_Attributes$boolProperty, 'defer', bool);
	};
	var _elm_lang$html$Html_Attributes$scoped = function (bool) {
		return A2(_elm_lang$html$Html_Attributes$boolProperty, 'scoped', bool);
	};
	var _elm_lang$html$Html_Attributes$autoplay = function (bool) {
		return A2(_elm_lang$html$Html_Attributes$boolProperty, 'autoplay', bool);
	};
	var _elm_lang$html$Html_Attributes$controls = function (bool) {
		return A2(_elm_lang$html$Html_Attributes$boolProperty, 'controls', bool);
	};
	var _elm_lang$html$Html_Attributes$loop = function (bool) {
		return A2(_elm_lang$html$Html_Attributes$boolProperty, 'loop', bool);
	};
	var _elm_lang$html$Html_Attributes$default = function (bool) {
		return A2(_elm_lang$html$Html_Attributes$boolProperty, 'default', bool);
	};
	var _elm_lang$html$Html_Attributes$seamless = function (bool) {
		return A2(_elm_lang$html$Html_Attributes$boolProperty, 'seamless', bool);
	};
	var _elm_lang$html$Html_Attributes$checked = function (bool) {
		return A2(_elm_lang$html$Html_Attributes$boolProperty, 'checked', bool);
	};
	var _elm_lang$html$Html_Attributes$selected = function (bool) {
		return A2(_elm_lang$html$Html_Attributes$boolProperty, 'selected', bool);
	};
	var _elm_lang$html$Html_Attributes$autofocus = function (bool) {
		return A2(_elm_lang$html$Html_Attributes$boolProperty, 'autofocus', bool);
	};
	var _elm_lang$html$Html_Attributes$disabled = function (bool) {
		return A2(_elm_lang$html$Html_Attributes$boolProperty, 'disabled', bool);
	};
	var _elm_lang$html$Html_Attributes$multiple = function (bool) {
		return A2(_elm_lang$html$Html_Attributes$boolProperty, 'multiple', bool);
	};
	var _elm_lang$html$Html_Attributes$novalidate = function (bool) {
		return A2(_elm_lang$html$Html_Attributes$boolProperty, 'noValidate', bool);
	};
	var _elm_lang$html$Html_Attributes$readonly = function (bool) {
		return A2(_elm_lang$html$Html_Attributes$boolProperty, 'readOnly', bool);
	};
	var _elm_lang$html$Html_Attributes$required = function (bool) {
		return A2(_elm_lang$html$Html_Attributes$boolProperty, 'required', bool);
	};
	var _elm_lang$html$Html_Attributes$ismap = function (value) {
		return A2(_elm_lang$html$Html_Attributes$boolProperty, 'isMap', value);
	};
	var _elm_lang$html$Html_Attributes$download = function (bool) {
		return A2(_elm_lang$html$Html_Attributes$boolProperty, 'download', bool);
	};
	var _elm_lang$html$Html_Attributes$reversed = function (bool) {
		return A2(_elm_lang$html$Html_Attributes$boolProperty, 'reversed', bool);
	};
	var _elm_lang$html$Html_Attributes$classList = function (list) {
		return _elm_lang$html$Html_Attributes$class(
			A2(
				_elm_lang$core$String$join,
				' ',
				A2(
					_elm_lang$core$List$map,
					_elm_lang$core$Tuple$first,
					A2(_elm_lang$core$List$filter, _elm_lang$core$Tuple$second, list))));
	};
	var _elm_lang$html$Html_Attributes$style = _elm_lang$virtual_dom$VirtualDom$style;
	
	var _elm_lang$html$Html_Events$keyCode = A2(_elm_lang$core$Json_Decode$field, 'keyCode', _elm_lang$core$Json_Decode$int);
	var _elm_lang$html$Html_Events$targetChecked = A2(
		_elm_lang$core$Json_Decode$at,
		{
			ctor: '::',
			_0: 'target',
			_1: {
				ctor: '::',
				_0: 'checked',
				_1: {ctor: '[]'}
			}
		},
		_elm_lang$core$Json_Decode$bool);
	var _elm_lang$html$Html_Events$targetValue = A2(
		_elm_lang$core$Json_Decode$at,
		{
			ctor: '::',
			_0: 'target',
			_1: {
				ctor: '::',
				_0: 'value',
				_1: {ctor: '[]'}
			}
		},
		_elm_lang$core$Json_Decode$string);
	var _elm_lang$html$Html_Events$defaultOptions = _elm_lang$virtual_dom$VirtualDom$defaultOptions;
	var _elm_lang$html$Html_Events$onWithOptions = _elm_lang$virtual_dom$VirtualDom$onWithOptions;
	var _elm_lang$html$Html_Events$on = _elm_lang$virtual_dom$VirtualDom$on;
	var _elm_lang$html$Html_Events$onFocus = function (msg) {
		return A2(
			_elm_lang$html$Html_Events$on,
			'focus',
			_elm_lang$core$Json_Decode$succeed(msg));
	};
	var _elm_lang$html$Html_Events$onBlur = function (msg) {
		return A2(
			_elm_lang$html$Html_Events$on,
			'blur',
			_elm_lang$core$Json_Decode$succeed(msg));
	};
	var _elm_lang$html$Html_Events$onSubmitOptions = _elm_lang$core$Native_Utils.update(
		_elm_lang$html$Html_Events$defaultOptions,
		{preventDefault: true});
	var _elm_lang$html$Html_Events$onSubmit = function (msg) {
		return A3(
			_elm_lang$html$Html_Events$onWithOptions,
			'submit',
			_elm_lang$html$Html_Events$onSubmitOptions,
			_elm_lang$core$Json_Decode$succeed(msg));
	};
	var _elm_lang$html$Html_Events$onCheck = function (tagger) {
		return A2(
			_elm_lang$html$Html_Events$on,
			'change',
			A2(_elm_lang$core$Json_Decode$map, tagger, _elm_lang$html$Html_Events$targetChecked));
	};
	var _elm_lang$html$Html_Events$onInput = function (tagger) {
		return A2(
			_elm_lang$html$Html_Events$on,
			'input',
			A2(_elm_lang$core$Json_Decode$map, tagger, _elm_lang$html$Html_Events$targetValue));
	};
	var _elm_lang$html$Html_Events$onMouseOut = function (msg) {
		return A2(
			_elm_lang$html$Html_Events$on,
			'mouseout',
			_elm_lang$core$Json_Decode$succeed(msg));
	};
	var _elm_lang$html$Html_Events$onMouseOver = function (msg) {
		return A2(
			_elm_lang$html$Html_Events$on,
			'mouseover',
			_elm_lang$core$Json_Decode$succeed(msg));
	};
	var _elm_lang$html$Html_Events$onMouseLeave = function (msg) {
		return A2(
			_elm_lang$html$Html_Events$on,
			'mouseleave',
			_elm_lang$core$Json_Decode$succeed(msg));
	};
	var _elm_lang$html$Html_Events$onMouseEnter = function (msg) {
		return A2(
			_elm_lang$html$Html_Events$on,
			'mouseenter',
			_elm_lang$core$Json_Decode$succeed(msg));
	};
	var _elm_lang$html$Html_Events$onMouseUp = function (msg) {
		return A2(
			_elm_lang$html$Html_Events$on,
			'mouseup',
			_elm_lang$core$Json_Decode$succeed(msg));
	};
	var _elm_lang$html$Html_Events$onMouseDown = function (msg) {
		return A2(
			_elm_lang$html$Html_Events$on,
			'mousedown',
			_elm_lang$core$Json_Decode$succeed(msg));
	};
	var _elm_lang$html$Html_Events$onDoubleClick = function (msg) {
		return A2(
			_elm_lang$html$Html_Events$on,
			'dblclick',
			_elm_lang$core$Json_Decode$succeed(msg));
	};
	var _elm_lang$html$Html_Events$onClick = function (msg) {
		return A2(
			_elm_lang$html$Html_Events$on,
			'click',
			_elm_lang$core$Json_Decode$succeed(msg));
	};
	var _elm_lang$html$Html_Events$Options = F2(
		function (a, b) {
			return {stopPropagation: a, preventDefault: b};
		});
	
	var _elm_lang$html$Html_Lazy$lazy3 = _elm_lang$virtual_dom$VirtualDom$lazy3;
	var _elm_lang$html$Html_Lazy$lazy2 = _elm_lang$virtual_dom$VirtualDom$lazy2;
	var _elm_lang$html$Html_Lazy$lazy = _elm_lang$virtual_dom$VirtualDom$lazy;
	
	var _elm_lang$http$Native_Http = function() {
	
	
	// ENCODING AND DECODING
	
	function encodeUri(string)
	{
		return encodeURIComponent(string);
	}
	
	function decodeUri(string)
	{
		try
		{
			return _elm_lang$core$Maybe$Just(decodeURIComponent(string));
		}
		catch(e)
		{
			return _elm_lang$core$Maybe$Nothing;
		}
	}
	
	
	// SEND REQUEST
	
	function toTask(request, maybeProgress)
	{
		return _elm_lang$core$Native_Scheduler.nativeBinding(function(callback)
		{
			var xhr = new XMLHttpRequest();
	
			configureProgress(xhr, maybeProgress);
	
			xhr.addEventListener('error', function() {
				callback(_elm_lang$core$Native_Scheduler.fail({ ctor: 'NetworkError' }));
			});
			xhr.addEventListener('timeout', function() {
				callback(_elm_lang$core$Native_Scheduler.fail({ ctor: 'Timeout' }));
			});
			xhr.addEventListener('load', function() {
				callback(handleResponse(xhr, request.expect.responseToResult));
			});
	
			try
			{
				xhr.open(request.method, request.url, true);
			}
			catch (e)
			{
				return callback(_elm_lang$core$Native_Scheduler.fail({ ctor: 'BadUrl', _0: request.url }));
			}
	
			configureRequest(xhr, request);
			send(xhr, request.body);
	
			return function() { xhr.abort(); };
		});
	}
	
	function configureProgress(xhr, maybeProgress)
	{
		if (maybeProgress.ctor === 'Nothing')
		{
			return;
		}
	
		xhr.addEventListener('progress', function(event) {
			if (!event.lengthComputable)
			{
				return;
			}
			_elm_lang$core$Native_Scheduler.rawSpawn(maybeProgress._0({
				bytes: event.loaded,
				bytesExpected: event.total
			}));
		});
	}
	
	function configureRequest(xhr, request)
	{
		function setHeader(pair)
		{
			xhr.setRequestHeader(pair._0, pair._1);
		}
	
		A2(_elm_lang$core$List$map, setHeader, request.headers);
		xhr.responseType = request.expect.responseType;
		xhr.withCredentials = request.withCredentials;
	
		if (request.timeout.ctor === 'Just')
		{
			xhr.timeout = request.timeout._0;
		}
	}
	
	function send(xhr, body)
	{
		switch (body.ctor)
		{
			case 'EmptyBody':
				xhr.send();
				return;
	
			case 'StringBody':
				xhr.setRequestHeader('Content-Type', body._0);
				xhr.send(body._1);
				return;
	
			case 'FormDataBody':
				xhr.send(body._0);
				return;
		}
	}
	
	
	// RESPONSES
	
	function handleResponse(xhr, responseToResult)
	{
		var response = toResponse(xhr);
	
		if (xhr.status < 200 || 300 <= xhr.status)
		{
			response.body = xhr.responseText;
			return _elm_lang$core$Native_Scheduler.fail({
				ctor: 'BadStatus',
				_0: response
			});
		}
	
		var result = responseToResult(response);
	
		if (result.ctor === 'Ok')
		{
			return _elm_lang$core$Native_Scheduler.succeed(result._0);
		}
		else
		{
			response.body = xhr.responseText;
			return _elm_lang$core$Native_Scheduler.fail({
				ctor: 'BadPayload',
				_0: result._0,
				_1: response
			});
		}
	}
	
	function toResponse(xhr)
	{
		return {
			status: { code: xhr.status, message: xhr.statusText },
			headers: parseHeaders(xhr.getAllResponseHeaders()),
			url: xhr.responseURL,
			body: xhr.response
		};
	}
	
	function parseHeaders(rawHeaders)
	{
		var headers = _elm_lang$core$Dict$empty;
	
		if (!rawHeaders)
		{
			return headers;
		}
	
		var headerPairs = rawHeaders.split('\u000d\u000a');
		for (var i = headerPairs.length; i--; )
		{
			var headerPair = headerPairs[i];
			var index = headerPair.indexOf('\u003a\u0020');
			if (index > 0)
			{
				var key = headerPair.substring(0, index);
				var value = headerPair.substring(index + 2);
	
				headers = A3(_elm_lang$core$Dict$update, key, function(oldValue) {
					if (oldValue.ctor === 'Just')
					{
						return _elm_lang$core$Maybe$Just(value + ', ' + oldValue._0);
					}
					return _elm_lang$core$Maybe$Just(value);
				}, headers);
			}
		}
	
		return headers;
	}
	
	
	// EXPECTORS
	
	function expectStringResponse(responseToResult)
	{
		return {
			responseType: 'text',
			responseToResult: responseToResult
		};
	}
	
	function mapExpect(func, expect)
	{
		return {
			responseType: expect.responseType,
			responseToResult: function(response) {
				var convertedResponse = expect.responseToResult(response);
				return A2(_elm_lang$core$Result$map, func, convertedResponse);
			}
		};
	}
	
	
	// BODY
	
	function multipart(parts)
	{
		var formData = new FormData();
	
		while (parts.ctor !== '[]')
		{
			var part = parts._0;
			formData.append(part._0, part._1);
			parts = parts._1;
		}
	
		return { ctor: 'FormDataBody', _0: formData };
	}
	
	return {
		toTask: F2(toTask),
		expectStringResponse: expectStringResponse,
		mapExpect: F2(mapExpect),
		multipart: multipart,
		encodeUri: encodeUri,
		decodeUri: decodeUri
	};
	
	}();
	
	var _elm_lang$http$Http_Internal$map = F2(
		function (func, request) {
			return _elm_lang$core$Native_Utils.update(
				request,
				{
					expect: A2(_elm_lang$http$Native_Http.mapExpect, func, request.expect)
				});
		});
	var _elm_lang$http$Http_Internal$RawRequest = F7(
		function (a, b, c, d, e, f, g) {
			return {method: a, headers: b, url: c, body: d, expect: e, timeout: f, withCredentials: g};
		});
	var _elm_lang$http$Http_Internal$Request = function (a) {
		return {ctor: 'Request', _0: a};
	};
	var _elm_lang$http$Http_Internal$Expect = {ctor: 'Expect'};
	var _elm_lang$http$Http_Internal$FormDataBody = {ctor: 'FormDataBody'};
	var _elm_lang$http$Http_Internal$StringBody = F2(
		function (a, b) {
			return {ctor: 'StringBody', _0: a, _1: b};
		});
	var _elm_lang$http$Http_Internal$EmptyBody = {ctor: 'EmptyBody'};
	var _elm_lang$http$Http_Internal$Header = F2(
		function (a, b) {
			return {ctor: 'Header', _0: a, _1: b};
		});
	
	var _elm_lang$http$Http$decodeUri = _elm_lang$http$Native_Http.decodeUri;
	var _elm_lang$http$Http$encodeUri = _elm_lang$http$Native_Http.encodeUri;
	var _elm_lang$http$Http$expectStringResponse = _elm_lang$http$Native_Http.expectStringResponse;
	var _elm_lang$http$Http$expectJson = function (decoder) {
		return _elm_lang$http$Http$expectStringResponse(
			function (response) {
				return A2(_elm_lang$core$Json_Decode$decodeString, decoder, response.body);
			});
	};
	var _elm_lang$http$Http$expectString = _elm_lang$http$Http$expectStringResponse(
		function (response) {
			return _elm_lang$core$Result$Ok(response.body);
		});
	var _elm_lang$http$Http$multipartBody = _elm_lang$http$Native_Http.multipart;
	var _elm_lang$http$Http$stringBody = _elm_lang$http$Http_Internal$StringBody;
	var _elm_lang$http$Http$jsonBody = function (value) {
		return A2(
			_elm_lang$http$Http_Internal$StringBody,
			'application/json',
			A2(_elm_lang$core$Json_Encode$encode, 0, value));
	};
	var _elm_lang$http$Http$emptyBody = _elm_lang$http$Http_Internal$EmptyBody;
	var _elm_lang$http$Http$header = _elm_lang$http$Http_Internal$Header;
	var _elm_lang$http$Http$request = _elm_lang$http$Http_Internal$Request;
	var _elm_lang$http$Http$post = F3(
		function (url, body, decoder) {
			return _elm_lang$http$Http$request(
				{
					method: 'POST',
					headers: {ctor: '[]'},
					url: url,
					body: body,
					expect: _elm_lang$http$Http$expectJson(decoder),
					timeout: _elm_lang$core$Maybe$Nothing,
					withCredentials: false
				});
		});
	var _elm_lang$http$Http$get = F2(
		function (url, decoder) {
			return _elm_lang$http$Http$request(
				{
					method: 'GET',
					headers: {ctor: '[]'},
					url: url,
					body: _elm_lang$http$Http$emptyBody,
					expect: _elm_lang$http$Http$expectJson(decoder),
					timeout: _elm_lang$core$Maybe$Nothing,
					withCredentials: false
				});
		});
	var _elm_lang$http$Http$getString = function (url) {
		return _elm_lang$http$Http$request(
			{
				method: 'GET',
				headers: {ctor: '[]'},
				url: url,
				body: _elm_lang$http$Http$emptyBody,
				expect: _elm_lang$http$Http$expectString,
				timeout: _elm_lang$core$Maybe$Nothing,
				withCredentials: false
			});
	};
	var _elm_lang$http$Http$toTask = function (_p0) {
		var _p1 = _p0;
		return A2(_elm_lang$http$Native_Http.toTask, _p1._0, _elm_lang$core$Maybe$Nothing);
	};
	var _elm_lang$http$Http$send = F2(
		function (resultToMessage, request) {
			return A2(
				_elm_lang$core$Task$attempt,
				resultToMessage,
				_elm_lang$http$Http$toTask(request));
		});
	var _elm_lang$http$Http$Response = F4(
		function (a, b, c, d) {
			return {url: a, status: b, headers: c, body: d};
		});
	var _elm_lang$http$Http$BadPayload = F2(
		function (a, b) {
			return {ctor: 'BadPayload', _0: a, _1: b};
		});
	var _elm_lang$http$Http$BadStatus = function (a) {
		return {ctor: 'BadStatus', _0: a};
	};
	var _elm_lang$http$Http$NetworkError = {ctor: 'NetworkError'};
	var _elm_lang$http$Http$Timeout = {ctor: 'Timeout'};
	var _elm_lang$http$Http$BadUrl = function (a) {
		return {ctor: 'BadUrl', _0: a};
	};
	var _elm_lang$http$Http$StringPart = F2(
		function (a, b) {
			return {ctor: 'StringPart', _0: a, _1: b};
		});
	var _elm_lang$http$Http$stringPart = _elm_lang$http$Http$StringPart;
	
	var _elm_lang$navigation$Native_Navigation = function() {
	
	function go(n)
	{
		return _elm_lang$core$Native_Scheduler.nativeBinding(function(callback)
		{
			if (n !== 0)
			{
				history.go(n);
			}
			callback(_elm_lang$core$Native_Scheduler.succeed(_elm_lang$core$Native_Utils.Tuple0));
		});
	}
	
	function pushState(url)
	{
		return _elm_lang$core$Native_Scheduler.nativeBinding(function(callback)
		{
			history.pushState({}, '', url);
			callback(_elm_lang$core$Native_Scheduler.succeed(getLocation()));
		});
	}
	
	function replaceState(url)
	{
		return _elm_lang$core$Native_Scheduler.nativeBinding(function(callback)
		{
			history.replaceState({}, '', url);
			callback(_elm_lang$core$Native_Scheduler.succeed(getLocation()));
		});
	}
	
	function getLocation()
	{
		var location = document.location;
	
		return {
			href: location.href,
			host: location.host,
			hostname: location.hostname,
			protocol: location.protocol,
			origin: location.origin,
			port_: location.port,
			pathname: location.pathname,
			search: location.search,
			hash: location.hash,
			username: location.username,
			password: location.password
		};
	}
	
	
	return {
		go: go,
		pushState: pushState,
		replaceState: replaceState,
		getLocation: getLocation
	};
	
	}();
	
	var _elm_lang$navigation$Navigation$replaceState = _elm_lang$navigation$Native_Navigation.replaceState;
	var _elm_lang$navigation$Navigation$pushState = _elm_lang$navigation$Native_Navigation.pushState;
	var _elm_lang$navigation$Navigation$go = _elm_lang$navigation$Native_Navigation.go;
	var _elm_lang$navigation$Navigation$spawnPopState = function (router) {
		return _elm_lang$core$Process$spawn(
			A3(
				_elm_lang$dom$Dom_LowLevel$onWindow,
				'popstate',
				_elm_lang$core$Json_Decode$value,
				function (_p0) {
					return A2(
						_elm_lang$core$Platform$sendToSelf,
						router,
						_elm_lang$navigation$Native_Navigation.getLocation(
							{ctor: '_Tuple0'}));
				}));
	};
	var _elm_lang$navigation$Navigation_ops = _elm_lang$navigation$Navigation_ops || {};
	_elm_lang$navigation$Navigation_ops['&>'] = F2(
		function (task1, task2) {
			return A2(
				_elm_lang$core$Task$andThen,
				function (_p1) {
					return task2;
				},
				task1);
		});
	var _elm_lang$navigation$Navigation$notify = F3(
		function (router, subs, location) {
			var send = function (_p2) {
				var _p3 = _p2;
				return A2(
					_elm_lang$core$Platform$sendToApp,
					router,
					_p3._0(location));
			};
			return A2(
				_elm_lang$navigation$Navigation_ops['&>'],
				_elm_lang$core$Task$sequence(
					A2(_elm_lang$core$List$map, send, subs)),
				_elm_lang$core$Task$succeed(
					{ctor: '_Tuple0'}));
		});
	var _elm_lang$navigation$Navigation$onSelfMsg = F3(
		function (router, location, state) {
			return A2(
				_elm_lang$navigation$Navigation_ops['&>'],
				A3(_elm_lang$navigation$Navigation$notify, router, state.subs, location),
				_elm_lang$core$Task$succeed(state));
		});
	var _elm_lang$navigation$Navigation$cmdHelp = F3(
		function (router, subs, cmd) {
			var _p4 = cmd;
			switch (_p4.ctor) {
				case 'Jump':
					return _elm_lang$navigation$Navigation$go(_p4._0);
				case 'New':
					return A2(
						_elm_lang$core$Task$andThen,
						A2(_elm_lang$navigation$Navigation$notify, router, subs),
						_elm_lang$navigation$Navigation$pushState(_p4._0));
				default:
					return A2(
						_elm_lang$core$Task$andThen,
						A2(_elm_lang$navigation$Navigation$notify, router, subs),
						_elm_lang$navigation$Navigation$replaceState(_p4._0));
			}
		});
	var _elm_lang$navigation$Navigation$subscription = _elm_lang$core$Native_Platform.leaf('Navigation');
	var _elm_lang$navigation$Navigation$command = _elm_lang$core$Native_Platform.leaf('Navigation');
	var _elm_lang$navigation$Navigation$Location = function (a) {
		return function (b) {
			return function (c) {
				return function (d) {
					return function (e) {
						return function (f) {
							return function (g) {
								return function (h) {
									return function (i) {
										return function (j) {
											return function (k) {
												return {href: a, host: b, hostname: c, protocol: d, origin: e, port_: f, pathname: g, search: h, hash: i, username: j, password: k};
											};
										};
									};
								};
							};
						};
					};
				};
			};
		};
	};
	var _elm_lang$navigation$Navigation$State = F2(
		function (a, b) {
			return {subs: a, process: b};
		});
	var _elm_lang$navigation$Navigation$init = _elm_lang$core$Task$succeed(
		A2(
			_elm_lang$navigation$Navigation$State,
			{ctor: '[]'},
			_elm_lang$core$Maybe$Nothing));
	var _elm_lang$navigation$Navigation$onEffects = F4(
		function (router, cmds, subs, _p5) {
			var _p6 = _p5;
			var _p9 = _p6.process;
			var stepState = function () {
				var _p7 = {ctor: '_Tuple2', _0: subs, _1: _p9};
				_v3_2:
				do {
					if (_p7._0.ctor === '[]') {
						if (_p7._1.ctor === 'Just') {
							return A2(
								_elm_lang$navigation$Navigation_ops['&>'],
								_elm_lang$core$Process$kill(_p7._1._0),
								_elm_lang$core$Task$succeed(
									A2(_elm_lang$navigation$Navigation$State, subs, _elm_lang$core$Maybe$Nothing)));
						} else {
							break _v3_2;
						}
					} else {
						if (_p7._1.ctor === 'Nothing') {
							return A2(
								_elm_lang$core$Task$map,
								function (_p8) {
									return A2(
										_elm_lang$navigation$Navigation$State,
										subs,
										_elm_lang$core$Maybe$Just(_p8));
								},
								_elm_lang$navigation$Navigation$spawnPopState(router));
						} else {
							break _v3_2;
						}
					}
				} while(false);
				return _elm_lang$core$Task$succeed(
					A2(_elm_lang$navigation$Navigation$State, subs, _p9));
			}();
			return A2(
				_elm_lang$navigation$Navigation_ops['&>'],
				_elm_lang$core$Task$sequence(
					A2(
						_elm_lang$core$List$map,
						A2(_elm_lang$navigation$Navigation$cmdHelp, router, subs),
						cmds)),
				stepState);
		});
	var _elm_lang$navigation$Navigation$Modify = function (a) {
		return {ctor: 'Modify', _0: a};
	};
	var _elm_lang$navigation$Navigation$modifyUrl = function (url) {
		return _elm_lang$navigation$Navigation$command(
			_elm_lang$navigation$Navigation$Modify(url));
	};
	var _elm_lang$navigation$Navigation$New = function (a) {
		return {ctor: 'New', _0: a};
	};
	var _elm_lang$navigation$Navigation$newUrl = function (url) {
		return _elm_lang$navigation$Navigation$command(
			_elm_lang$navigation$Navigation$New(url));
	};
	var _elm_lang$navigation$Navigation$Jump = function (a) {
		return {ctor: 'Jump', _0: a};
	};
	var _elm_lang$navigation$Navigation$back = function (n) {
		return _elm_lang$navigation$Navigation$command(
			_elm_lang$navigation$Navigation$Jump(0 - n));
	};
	var _elm_lang$navigation$Navigation$forward = function (n) {
		return _elm_lang$navigation$Navigation$command(
			_elm_lang$navigation$Navigation$Jump(n));
	};
	var _elm_lang$navigation$Navigation$cmdMap = F2(
		function (_p10, myCmd) {
			var _p11 = myCmd;
			switch (_p11.ctor) {
				case 'Jump':
					return _elm_lang$navigation$Navigation$Jump(_p11._0);
				case 'New':
					return _elm_lang$navigation$Navigation$New(_p11._0);
				default:
					return _elm_lang$navigation$Navigation$Modify(_p11._0);
			}
		});
	var _elm_lang$navigation$Navigation$Monitor = function (a) {
		return {ctor: 'Monitor', _0: a};
	};
	var _elm_lang$navigation$Navigation$program = F2(
		function (locationToMessage, stuff) {
			var init = stuff.init(
				_elm_lang$navigation$Native_Navigation.getLocation(
					{ctor: '_Tuple0'}));
			var subs = function (model) {
				return _elm_lang$core$Platform_Sub$batch(
					{
						ctor: '::',
						_0: _elm_lang$navigation$Navigation$subscription(
							_elm_lang$navigation$Navigation$Monitor(locationToMessage)),
						_1: {
							ctor: '::',
							_0: stuff.subscriptions(model),
							_1: {ctor: '[]'}
						}
					});
			};
			return _elm_lang$html$Html$program(
				{init: init, view: stuff.view, update: stuff.update, subscriptions: subs});
		});
	var _elm_lang$navigation$Navigation$programWithFlags = F2(
		function (locationToMessage, stuff) {
			var init = function (flags) {
				return A2(
					stuff.init,
					flags,
					_elm_lang$navigation$Native_Navigation.getLocation(
						{ctor: '_Tuple0'}));
			};
			var subs = function (model) {
				return _elm_lang$core$Platform_Sub$batch(
					{
						ctor: '::',
						_0: _elm_lang$navigation$Navigation$subscription(
							_elm_lang$navigation$Navigation$Monitor(locationToMessage)),
						_1: {
							ctor: '::',
							_0: stuff.subscriptions(model),
							_1: {ctor: '[]'}
						}
					});
			};
			return _elm_lang$html$Html$programWithFlags(
				{init: init, view: stuff.view, update: stuff.update, subscriptions: subs});
		});
	var _elm_lang$navigation$Navigation$subMap = F2(
		function (func, _p12) {
			var _p13 = _p12;
			return _elm_lang$navigation$Navigation$Monitor(
				function (_p14) {
					return func(
						_p13._0(_p14));
				});
		});
	_elm_lang$core$Native_Platform.effectManagers['Navigation'] = {pkg: 'elm-lang/navigation', init: _elm_lang$navigation$Navigation$init, onEffects: _elm_lang$navigation$Navigation$onEffects, onSelfMsg: _elm_lang$navigation$Navigation$onSelfMsg, tag: 'fx', cmdMap: _elm_lang$navigation$Navigation$cmdMap, subMap: _elm_lang$navigation$Navigation$subMap};
	
	var _elm_lang$svg$Svg$map = _elm_lang$virtual_dom$VirtualDom$map;
	var _elm_lang$svg$Svg$text = _elm_lang$virtual_dom$VirtualDom$text;
	var _elm_lang$svg$Svg$svgNamespace = A2(
		_elm_lang$virtual_dom$VirtualDom$property,
		'namespace',
		_elm_lang$core$Json_Encode$string('http://www.w3.org/2000/svg'));
	var _elm_lang$svg$Svg$node = F3(
		function (name, attributes, children) {
			return A3(
				_elm_lang$virtual_dom$VirtualDom$node,
				name,
				{ctor: '::', _0: _elm_lang$svg$Svg$svgNamespace, _1: attributes},
				children);
		});
	var _elm_lang$svg$Svg$svg = _elm_lang$svg$Svg$node('svg');
	var _elm_lang$svg$Svg$foreignObject = _elm_lang$svg$Svg$node('foreignObject');
	var _elm_lang$svg$Svg$animate = _elm_lang$svg$Svg$node('animate');
	var _elm_lang$svg$Svg$animateColor = _elm_lang$svg$Svg$node('animateColor');
	var _elm_lang$svg$Svg$animateMotion = _elm_lang$svg$Svg$node('animateMotion');
	var _elm_lang$svg$Svg$animateTransform = _elm_lang$svg$Svg$node('animateTransform');
	var _elm_lang$svg$Svg$mpath = _elm_lang$svg$Svg$node('mpath');
	var _elm_lang$svg$Svg$set = _elm_lang$svg$Svg$node('set');
	var _elm_lang$svg$Svg$a = _elm_lang$svg$Svg$node('a');
	var _elm_lang$svg$Svg$defs = _elm_lang$svg$Svg$node('defs');
	var _elm_lang$svg$Svg$g = _elm_lang$svg$Svg$node('g');
	var _elm_lang$svg$Svg$marker = _elm_lang$svg$Svg$node('marker');
	var _elm_lang$svg$Svg$mask = _elm_lang$svg$Svg$node('mask');
	var _elm_lang$svg$Svg$pattern = _elm_lang$svg$Svg$node('pattern');
	var _elm_lang$svg$Svg$switch = _elm_lang$svg$Svg$node('switch');
	var _elm_lang$svg$Svg$symbol = _elm_lang$svg$Svg$node('symbol');
	var _elm_lang$svg$Svg$desc = _elm_lang$svg$Svg$node('desc');
	var _elm_lang$svg$Svg$metadata = _elm_lang$svg$Svg$node('metadata');
	var _elm_lang$svg$Svg$title = _elm_lang$svg$Svg$node('title');
	var _elm_lang$svg$Svg$feBlend = _elm_lang$svg$Svg$node('feBlend');
	var _elm_lang$svg$Svg$feColorMatrix = _elm_lang$svg$Svg$node('feColorMatrix');
	var _elm_lang$svg$Svg$feComponentTransfer = _elm_lang$svg$Svg$node('feComponentTransfer');
	var _elm_lang$svg$Svg$feComposite = _elm_lang$svg$Svg$node('feComposite');
	var _elm_lang$svg$Svg$feConvolveMatrix = _elm_lang$svg$Svg$node('feConvolveMatrix');
	var _elm_lang$svg$Svg$feDiffuseLighting = _elm_lang$svg$Svg$node('feDiffuseLighting');
	var _elm_lang$svg$Svg$feDisplacementMap = _elm_lang$svg$Svg$node('feDisplacementMap');
	var _elm_lang$svg$Svg$feFlood = _elm_lang$svg$Svg$node('feFlood');
	var _elm_lang$svg$Svg$feFuncA = _elm_lang$svg$Svg$node('feFuncA');
	var _elm_lang$svg$Svg$feFuncB = _elm_lang$svg$Svg$node('feFuncB');
	var _elm_lang$svg$Svg$feFuncG = _elm_lang$svg$Svg$node('feFuncG');
	var _elm_lang$svg$Svg$feFuncR = _elm_lang$svg$Svg$node('feFuncR');
	var _elm_lang$svg$Svg$feGaussianBlur = _elm_lang$svg$Svg$node('feGaussianBlur');
	var _elm_lang$svg$Svg$feImage = _elm_lang$svg$Svg$node('feImage');
	var _elm_lang$svg$Svg$feMerge = _elm_lang$svg$Svg$node('feMerge');
	var _elm_lang$svg$Svg$feMergeNode = _elm_lang$svg$Svg$node('feMergeNode');
	var _elm_lang$svg$Svg$feMorphology = _elm_lang$svg$Svg$node('feMorphology');
	var _elm_lang$svg$Svg$feOffset = _elm_lang$svg$Svg$node('feOffset');
	var _elm_lang$svg$Svg$feSpecularLighting = _elm_lang$svg$Svg$node('feSpecularLighting');
	var _elm_lang$svg$Svg$feTile = _elm_lang$svg$Svg$node('feTile');
	var _elm_lang$svg$Svg$feTurbulence = _elm_lang$svg$Svg$node('feTurbulence');
	var _elm_lang$svg$Svg$font = _elm_lang$svg$Svg$node('font');
	var _elm_lang$svg$Svg$linearGradient = _elm_lang$svg$Svg$node('linearGradient');
	var _elm_lang$svg$Svg$radialGradient = _elm_lang$svg$Svg$node('radialGradient');
	var _elm_lang$svg$Svg$stop = _elm_lang$svg$Svg$node('stop');
	var _elm_lang$svg$Svg$circle = _elm_lang$svg$Svg$node('circle');
	var _elm_lang$svg$Svg$ellipse = _elm_lang$svg$Svg$node('ellipse');
	var _elm_lang$svg$Svg$image = _elm_lang$svg$Svg$node('image');
	var _elm_lang$svg$Svg$line = _elm_lang$svg$Svg$node('line');
	var _elm_lang$svg$Svg$path = _elm_lang$svg$Svg$node('path');
	var _elm_lang$svg$Svg$polygon = _elm_lang$svg$Svg$node('polygon');
	var _elm_lang$svg$Svg$polyline = _elm_lang$svg$Svg$node('polyline');
	var _elm_lang$svg$Svg$rect = _elm_lang$svg$Svg$node('rect');
	var _elm_lang$svg$Svg$use = _elm_lang$svg$Svg$node('use');
	var _elm_lang$svg$Svg$feDistantLight = _elm_lang$svg$Svg$node('feDistantLight');
	var _elm_lang$svg$Svg$fePointLight = _elm_lang$svg$Svg$node('fePointLight');
	var _elm_lang$svg$Svg$feSpotLight = _elm_lang$svg$Svg$node('feSpotLight');
	var _elm_lang$svg$Svg$altGlyph = _elm_lang$svg$Svg$node('altGlyph');
	var _elm_lang$svg$Svg$altGlyphDef = _elm_lang$svg$Svg$node('altGlyphDef');
	var _elm_lang$svg$Svg$altGlyphItem = _elm_lang$svg$Svg$node('altGlyphItem');
	var _elm_lang$svg$Svg$glyph = _elm_lang$svg$Svg$node('glyph');
	var _elm_lang$svg$Svg$glyphRef = _elm_lang$svg$Svg$node('glyphRef');
	var _elm_lang$svg$Svg$textPath = _elm_lang$svg$Svg$node('textPath');
	var _elm_lang$svg$Svg$text_ = _elm_lang$svg$Svg$node('text');
	var _elm_lang$svg$Svg$tref = _elm_lang$svg$Svg$node('tref');
	var _elm_lang$svg$Svg$tspan = _elm_lang$svg$Svg$node('tspan');
	var _elm_lang$svg$Svg$clipPath = _elm_lang$svg$Svg$node('clipPath');
	var _elm_lang$svg$Svg$colorProfile = _elm_lang$svg$Svg$node('colorProfile');
	var _elm_lang$svg$Svg$cursor = _elm_lang$svg$Svg$node('cursor');
	var _elm_lang$svg$Svg$filter = _elm_lang$svg$Svg$node('filter');
	var _elm_lang$svg$Svg$script = _elm_lang$svg$Svg$node('script');
	var _elm_lang$svg$Svg$style = _elm_lang$svg$Svg$node('style');
	var _elm_lang$svg$Svg$view = _elm_lang$svg$Svg$node('view');
	
	var _elm_lang$svg$Svg_Attributes$writingMode = _elm_lang$virtual_dom$VirtualDom$attribute('writing-mode');
	var _elm_lang$svg$Svg_Attributes$wordSpacing = _elm_lang$virtual_dom$VirtualDom$attribute('word-spacing');
	var _elm_lang$svg$Svg_Attributes$visibility = _elm_lang$virtual_dom$VirtualDom$attribute('visibility');
	var _elm_lang$svg$Svg_Attributes$unicodeBidi = _elm_lang$virtual_dom$VirtualDom$attribute('unicode-bidi');
	var _elm_lang$svg$Svg_Attributes$textRendering = _elm_lang$virtual_dom$VirtualDom$attribute('text-rendering');
	var _elm_lang$svg$Svg_Attributes$textDecoration = _elm_lang$virtual_dom$VirtualDom$attribute('text-decoration');
	var _elm_lang$svg$Svg_Attributes$textAnchor = _elm_lang$virtual_dom$VirtualDom$attribute('text-anchor');
	var _elm_lang$svg$Svg_Attributes$stroke = _elm_lang$virtual_dom$VirtualDom$attribute('stroke');
	var _elm_lang$svg$Svg_Attributes$strokeWidth = _elm_lang$virtual_dom$VirtualDom$attribute('stroke-width');
	var _elm_lang$svg$Svg_Attributes$strokeOpacity = _elm_lang$virtual_dom$VirtualDom$attribute('stroke-opacity');
	var _elm_lang$svg$Svg_Attributes$strokeMiterlimit = _elm_lang$virtual_dom$VirtualDom$attribute('stroke-miterlimit');
	var _elm_lang$svg$Svg_Attributes$strokeLinejoin = _elm_lang$virtual_dom$VirtualDom$attribute('stroke-linejoin');
	var _elm_lang$svg$Svg_Attributes$strokeLinecap = _elm_lang$virtual_dom$VirtualDom$attribute('stroke-linecap');
	var _elm_lang$svg$Svg_Attributes$strokeDashoffset = _elm_lang$virtual_dom$VirtualDom$attribute('stroke-dashoffset');
	var _elm_lang$svg$Svg_Attributes$strokeDasharray = _elm_lang$virtual_dom$VirtualDom$attribute('stroke-dasharray');
	var _elm_lang$svg$Svg_Attributes$stopOpacity = _elm_lang$virtual_dom$VirtualDom$attribute('stop-opacity');
	var _elm_lang$svg$Svg_Attributes$stopColor = _elm_lang$virtual_dom$VirtualDom$attribute('stop-color');
	var _elm_lang$svg$Svg_Attributes$shapeRendering = _elm_lang$virtual_dom$VirtualDom$attribute('shape-rendering');
	var _elm_lang$svg$Svg_Attributes$pointerEvents = _elm_lang$virtual_dom$VirtualDom$attribute('pointer-events');
	var _elm_lang$svg$Svg_Attributes$overflow = _elm_lang$virtual_dom$VirtualDom$attribute('overflow');
	var _elm_lang$svg$Svg_Attributes$opacity = _elm_lang$virtual_dom$VirtualDom$attribute('opacity');
	var _elm_lang$svg$Svg_Attributes$mask = _elm_lang$virtual_dom$VirtualDom$attribute('mask');
	var _elm_lang$svg$Svg_Attributes$markerStart = _elm_lang$virtual_dom$VirtualDom$attribute('marker-start');
	var _elm_lang$svg$Svg_Attributes$markerMid = _elm_lang$virtual_dom$VirtualDom$attribute('marker-mid');
	var _elm_lang$svg$Svg_Attributes$markerEnd = _elm_lang$virtual_dom$VirtualDom$attribute('marker-end');
	var _elm_lang$svg$Svg_Attributes$lightingColor = _elm_lang$virtual_dom$VirtualDom$attribute('lighting-color');
	var _elm_lang$svg$Svg_Attributes$letterSpacing = _elm_lang$virtual_dom$VirtualDom$attribute('letter-spacing');
	var _elm_lang$svg$Svg_Attributes$kerning = _elm_lang$virtual_dom$VirtualDom$attribute('kerning');
	var _elm_lang$svg$Svg_Attributes$imageRendering = _elm_lang$virtual_dom$VirtualDom$attribute('image-rendering');
	var _elm_lang$svg$Svg_Attributes$glyphOrientationVertical = _elm_lang$virtual_dom$VirtualDom$attribute('glyph-orientation-vertical');
	var _elm_lang$svg$Svg_Attributes$glyphOrientationHorizontal = _elm_lang$virtual_dom$VirtualDom$attribute('glyph-orientation-horizontal');
	var _elm_lang$svg$Svg_Attributes$fontWeight = _elm_lang$virtual_dom$VirtualDom$attribute('font-weight');
	var _elm_lang$svg$Svg_Attributes$fontVariant = _elm_lang$virtual_dom$VirtualDom$attribute('font-variant');
	var _elm_lang$svg$Svg_Attributes$fontStyle = _elm_lang$virtual_dom$VirtualDom$attribute('font-style');
	var _elm_lang$svg$Svg_Attributes$fontStretch = _elm_lang$virtual_dom$VirtualDom$attribute('font-stretch');
	var _elm_lang$svg$Svg_Attributes$fontSize = _elm_lang$virtual_dom$VirtualDom$attribute('font-size');
	var _elm_lang$svg$Svg_Attributes$fontSizeAdjust = _elm_lang$virtual_dom$VirtualDom$attribute('font-size-adjust');
	var _elm_lang$svg$Svg_Attributes$fontFamily = _elm_lang$virtual_dom$VirtualDom$attribute('font-family');
	var _elm_lang$svg$Svg_Attributes$floodOpacity = _elm_lang$virtual_dom$VirtualDom$attribute('flood-opacity');
	var _elm_lang$svg$Svg_Attributes$floodColor = _elm_lang$virtual_dom$VirtualDom$attribute('flood-color');
	var _elm_lang$svg$Svg_Attributes$filter = _elm_lang$virtual_dom$VirtualDom$attribute('filter');
	var _elm_lang$svg$Svg_Attributes$fill = _elm_lang$virtual_dom$VirtualDom$attribute('fill');
	var _elm_lang$svg$Svg_Attributes$fillRule = _elm_lang$virtual_dom$VirtualDom$attribute('fill-rule');
	var _elm_lang$svg$Svg_Attributes$fillOpacity = _elm_lang$virtual_dom$VirtualDom$attribute('fill-opacity');
	var _elm_lang$svg$Svg_Attributes$enableBackground = _elm_lang$virtual_dom$VirtualDom$attribute('enable-background');
	var _elm_lang$svg$Svg_Attributes$dominantBaseline = _elm_lang$virtual_dom$VirtualDom$attribute('dominant-baseline');
	var _elm_lang$svg$Svg_Attributes$display = _elm_lang$virtual_dom$VirtualDom$attribute('display');
	var _elm_lang$svg$Svg_Attributes$direction = _elm_lang$virtual_dom$VirtualDom$attribute('direction');
	var _elm_lang$svg$Svg_Attributes$cursor = _elm_lang$virtual_dom$VirtualDom$attribute('cursor');
	var _elm_lang$svg$Svg_Attributes$color = _elm_lang$virtual_dom$VirtualDom$attribute('color');
	var _elm_lang$svg$Svg_Attributes$colorRendering = _elm_lang$virtual_dom$VirtualDom$attribute('color-rendering');
	var _elm_lang$svg$Svg_Attributes$colorProfile = _elm_lang$virtual_dom$VirtualDom$attribute('color-profile');
	var _elm_lang$svg$Svg_Attributes$colorInterpolation = _elm_lang$virtual_dom$VirtualDom$attribute('color-interpolation');
	var _elm_lang$svg$Svg_Attributes$colorInterpolationFilters = _elm_lang$virtual_dom$VirtualDom$attribute('color-interpolation-filters');
	var _elm_lang$svg$Svg_Attributes$clip = _elm_lang$virtual_dom$VirtualDom$attribute('clip');
	var _elm_lang$svg$Svg_Attributes$clipRule = _elm_lang$virtual_dom$VirtualDom$attribute('clip-rule');
	var _elm_lang$svg$Svg_Attributes$clipPath = _elm_lang$virtual_dom$VirtualDom$attribute('clip-path');
	var _elm_lang$svg$Svg_Attributes$baselineShift = _elm_lang$virtual_dom$VirtualDom$attribute('baseline-shift');
	var _elm_lang$svg$Svg_Attributes$alignmentBaseline = _elm_lang$virtual_dom$VirtualDom$attribute('alignment-baseline');
	var _elm_lang$svg$Svg_Attributes$zoomAndPan = _elm_lang$virtual_dom$VirtualDom$attribute('zoomAndPan');
	var _elm_lang$svg$Svg_Attributes$z = _elm_lang$virtual_dom$VirtualDom$attribute('z');
	var _elm_lang$svg$Svg_Attributes$yChannelSelector = _elm_lang$virtual_dom$VirtualDom$attribute('yChannelSelector');
	var _elm_lang$svg$Svg_Attributes$y2 = _elm_lang$virtual_dom$VirtualDom$attribute('y2');
	var _elm_lang$svg$Svg_Attributes$y1 = _elm_lang$virtual_dom$VirtualDom$attribute('y1');
	var _elm_lang$svg$Svg_Attributes$y = _elm_lang$virtual_dom$VirtualDom$attribute('y');
	var _elm_lang$svg$Svg_Attributes$xmlSpace = A2(_elm_lang$virtual_dom$VirtualDom$attributeNS, 'http://www.w3.org/XML/1998/namespace', 'xml:space');
	var _elm_lang$svg$Svg_Attributes$xmlLang = A2(_elm_lang$virtual_dom$VirtualDom$attributeNS, 'http://www.w3.org/XML/1998/namespace', 'xml:lang');
	var _elm_lang$svg$Svg_Attributes$xmlBase = A2(_elm_lang$virtual_dom$VirtualDom$attributeNS, 'http://www.w3.org/XML/1998/namespace', 'xml:base');
	var _elm_lang$svg$Svg_Attributes$xlinkType = A2(_elm_lang$virtual_dom$VirtualDom$attributeNS, 'http://www.w3.org/1999/xlink', 'xlink:type');
	var _elm_lang$svg$Svg_Attributes$xlinkTitle = A2(_elm_lang$virtual_dom$VirtualDom$attributeNS, 'http://www.w3.org/1999/xlink', 'xlink:title');
	var _elm_lang$svg$Svg_Attributes$xlinkShow = A2(_elm_lang$virtual_dom$VirtualDom$attributeNS, 'http://www.w3.org/1999/xlink', 'xlink:show');
	var _elm_lang$svg$Svg_Attributes$xlinkRole = A2(_elm_lang$virtual_dom$VirtualDom$attributeNS, 'http://www.w3.org/1999/xlink', 'xlink:role');
	var _elm_lang$svg$Svg_Attributes$xlinkHref = A2(_elm_lang$virtual_dom$VirtualDom$attributeNS, 'http://www.w3.org/1999/xlink', 'xlink:href');
	var _elm_lang$svg$Svg_Attributes$xlinkArcrole = A2(_elm_lang$virtual_dom$VirtualDom$attributeNS, 'http://www.w3.org/1999/xlink', 'xlink:arcrole');
	var _elm_lang$svg$Svg_Attributes$xlinkActuate = A2(_elm_lang$virtual_dom$VirtualDom$attributeNS, 'http://www.w3.org/1999/xlink', 'xlink:actuate');
	var _elm_lang$svg$Svg_Attributes$xChannelSelector = _elm_lang$virtual_dom$VirtualDom$attribute('xChannelSelector');
	var _elm_lang$svg$Svg_Attributes$x2 = _elm_lang$virtual_dom$VirtualDom$attribute('x2');
	var _elm_lang$svg$Svg_Attributes$x1 = _elm_lang$virtual_dom$VirtualDom$attribute('x1');
	var _elm_lang$svg$Svg_Attributes$xHeight = _elm_lang$virtual_dom$VirtualDom$attribute('x-height');
	var _elm_lang$svg$Svg_Attributes$x = _elm_lang$virtual_dom$VirtualDom$attribute('x');
	var _elm_lang$svg$Svg_Attributes$widths = _elm_lang$virtual_dom$VirtualDom$attribute('widths');
	var _elm_lang$svg$Svg_Attributes$width = _elm_lang$virtual_dom$VirtualDom$attribute('width');
	var _elm_lang$svg$Svg_Attributes$viewTarget = _elm_lang$virtual_dom$VirtualDom$attribute('viewTarget');
	var _elm_lang$svg$Svg_Attributes$viewBox = _elm_lang$virtual_dom$VirtualDom$attribute('viewBox');
	var _elm_lang$svg$Svg_Attributes$vertOriginY = _elm_lang$virtual_dom$VirtualDom$attribute('vert-origin-y');
	var _elm_lang$svg$Svg_Attributes$vertOriginX = _elm_lang$virtual_dom$VirtualDom$attribute('vert-origin-x');
	var _elm_lang$svg$Svg_Attributes$vertAdvY = _elm_lang$virtual_dom$VirtualDom$attribute('vert-adv-y');
	var _elm_lang$svg$Svg_Attributes$version = _elm_lang$virtual_dom$VirtualDom$attribute('version');
	var _elm_lang$svg$Svg_Attributes$values = _elm_lang$virtual_dom$VirtualDom$attribute('values');
	var _elm_lang$svg$Svg_Attributes$vMathematical = _elm_lang$virtual_dom$VirtualDom$attribute('v-mathematical');
	var _elm_lang$svg$Svg_Attributes$vIdeographic = _elm_lang$virtual_dom$VirtualDom$attribute('v-ideographic');
	var _elm_lang$svg$Svg_Attributes$vHanging = _elm_lang$virtual_dom$VirtualDom$attribute('v-hanging');
	var _elm_lang$svg$Svg_Attributes$vAlphabetic = _elm_lang$virtual_dom$VirtualDom$attribute('v-alphabetic');
	var _elm_lang$svg$Svg_Attributes$unitsPerEm = _elm_lang$virtual_dom$VirtualDom$attribute('units-per-em');
	var _elm_lang$svg$Svg_Attributes$unicodeRange = _elm_lang$virtual_dom$VirtualDom$attribute('unicode-range');
	var _elm_lang$svg$Svg_Attributes$unicode = _elm_lang$virtual_dom$VirtualDom$attribute('unicode');
	var _elm_lang$svg$Svg_Attributes$underlineThickness = _elm_lang$virtual_dom$VirtualDom$attribute('underline-thickness');
	var _elm_lang$svg$Svg_Attributes$underlinePosition = _elm_lang$virtual_dom$VirtualDom$attribute('underline-position');
	var _elm_lang$svg$Svg_Attributes$u2 = _elm_lang$virtual_dom$VirtualDom$attribute('u2');
	var _elm_lang$svg$Svg_Attributes$u1 = _elm_lang$virtual_dom$VirtualDom$attribute('u1');
	var _elm_lang$svg$Svg_Attributes$type_ = _elm_lang$virtual_dom$VirtualDom$attribute('type');
	var _elm_lang$svg$Svg_Attributes$transform = _elm_lang$virtual_dom$VirtualDom$attribute('transform');
	var _elm_lang$svg$Svg_Attributes$to = _elm_lang$virtual_dom$VirtualDom$attribute('to');
	var _elm_lang$svg$Svg_Attributes$title = _elm_lang$virtual_dom$VirtualDom$attribute('title');
	var _elm_lang$svg$Svg_Attributes$textLength = _elm_lang$virtual_dom$VirtualDom$attribute('textLength');
	var _elm_lang$svg$Svg_Attributes$targetY = _elm_lang$virtual_dom$VirtualDom$attribute('targetY');
	var _elm_lang$svg$Svg_Attributes$targetX = _elm_lang$virtual_dom$VirtualDom$attribute('targetX');
	var _elm_lang$svg$Svg_Attributes$target = _elm_lang$virtual_dom$VirtualDom$attribute('target');
	var _elm_lang$svg$Svg_Attributes$tableValues = _elm_lang$virtual_dom$VirtualDom$attribute('tableValues');
	var _elm_lang$svg$Svg_Attributes$systemLanguage = _elm_lang$virtual_dom$VirtualDom$attribute('systemLanguage');
	var _elm_lang$svg$Svg_Attributes$surfaceScale = _elm_lang$virtual_dom$VirtualDom$attribute('surfaceScale');
	var _elm_lang$svg$Svg_Attributes$style = _elm_lang$virtual_dom$VirtualDom$attribute('style');
	var _elm_lang$svg$Svg_Attributes$string = _elm_lang$virtual_dom$VirtualDom$attribute('string');
	var _elm_lang$svg$Svg_Attributes$strikethroughThickness = _elm_lang$virtual_dom$VirtualDom$attribute('strikethrough-thickness');
	var _elm_lang$svg$Svg_Attributes$strikethroughPosition = _elm_lang$virtual_dom$VirtualDom$attribute('strikethrough-position');
	var _elm_lang$svg$Svg_Attributes$stitchTiles = _elm_lang$virtual_dom$VirtualDom$attribute('stitchTiles');
	var _elm_lang$svg$Svg_Attributes$stemv = _elm_lang$virtual_dom$VirtualDom$attribute('stemv');
	var _elm_lang$svg$Svg_Attributes$stemh = _elm_lang$virtual_dom$VirtualDom$attribute('stemh');
	var _elm_lang$svg$Svg_Attributes$stdDeviation = _elm_lang$virtual_dom$VirtualDom$attribute('stdDeviation');
	var _elm_lang$svg$Svg_Attributes$startOffset = _elm_lang$virtual_dom$VirtualDom$attribute('startOffset');
	var _elm_lang$svg$Svg_Attributes$spreadMethod = _elm_lang$virtual_dom$VirtualDom$attribute('spreadMethod');
	var _elm_lang$svg$Svg_Attributes$speed = _elm_lang$virtual_dom$VirtualDom$attribute('speed');
	var _elm_lang$svg$Svg_Attributes$specularExponent = _elm_lang$virtual_dom$VirtualDom$attribute('specularExponent');
	var _elm_lang$svg$Svg_Attributes$specularConstant = _elm_lang$virtual_dom$VirtualDom$attribute('specularConstant');
	var _elm_lang$svg$Svg_Attributes$spacing = _elm_lang$virtual_dom$VirtualDom$attribute('spacing');
	var _elm_lang$svg$Svg_Attributes$slope = _elm_lang$virtual_dom$VirtualDom$attribute('slope');
	var _elm_lang$svg$Svg_Attributes$seed = _elm_lang$virtual_dom$VirtualDom$attribute('seed');
	var _elm_lang$svg$Svg_Attributes$scale = _elm_lang$virtual_dom$VirtualDom$attribute('scale');
	var _elm_lang$svg$Svg_Attributes$ry = _elm_lang$virtual_dom$VirtualDom$attribute('ry');
	var _elm_lang$svg$Svg_Attributes$rx = _elm_lang$virtual_dom$VirtualDom$attribute('rx');
	var _elm_lang$svg$Svg_Attributes$rotate = _elm_lang$virtual_dom$VirtualDom$attribute('rotate');
	var _elm_lang$svg$Svg_Attributes$result = _elm_lang$virtual_dom$VirtualDom$attribute('result');
	var _elm_lang$svg$Svg_Attributes$restart = _elm_lang$virtual_dom$VirtualDom$attribute('restart');
	var _elm_lang$svg$Svg_Attributes$requiredFeatures = _elm_lang$virtual_dom$VirtualDom$attribute('requiredFeatures');
	var _elm_lang$svg$Svg_Attributes$requiredExtensions = _elm_lang$virtual_dom$VirtualDom$attribute('requiredExtensions');
	var _elm_lang$svg$Svg_Attributes$repeatDur = _elm_lang$virtual_dom$VirtualDom$attribute('repeatDur');
	var _elm_lang$svg$Svg_Attributes$repeatCount = _elm_lang$virtual_dom$VirtualDom$attribute('repeatCount');
	var _elm_lang$svg$Svg_Attributes$renderingIntent = _elm_lang$virtual_dom$VirtualDom$attribute('rendering-intent');
	var _elm_lang$svg$Svg_Attributes$refY = _elm_lang$virtual_dom$VirtualDom$attribute('refY');
	var _elm_lang$svg$Svg_Attributes$refX = _elm_lang$virtual_dom$VirtualDom$attribute('refX');
	var _elm_lang$svg$Svg_Attributes$radius = _elm_lang$virtual_dom$VirtualDom$attribute('radius');
	var _elm_lang$svg$Svg_Attributes$r = _elm_lang$virtual_dom$VirtualDom$attribute('r');
	var _elm_lang$svg$Svg_Attributes$primitiveUnits = _elm_lang$virtual_dom$VirtualDom$attribute('primitiveUnits');
	var _elm_lang$svg$Svg_Attributes$preserveAspectRatio = _elm_lang$virtual_dom$VirtualDom$attribute('preserveAspectRatio');
	var _elm_lang$svg$Svg_Attributes$preserveAlpha = _elm_lang$virtual_dom$VirtualDom$attribute('preserveAlpha');
	var _elm_lang$svg$Svg_Attributes$pointsAtZ = _elm_lang$virtual_dom$VirtualDom$attribute('pointsAtZ');
	var _elm_lang$svg$Svg_Attributes$pointsAtY = _elm_lang$virtual_dom$VirtualDom$attribute('pointsAtY');
	var _elm_lang$svg$Svg_Attributes$pointsAtX = _elm_lang$virtual_dom$VirtualDom$attribute('pointsAtX');
	var _elm_lang$svg$Svg_Attributes$points = _elm_lang$virtual_dom$VirtualDom$attribute('points');
	var _elm_lang$svg$Svg_Attributes$pointOrder = _elm_lang$virtual_dom$VirtualDom$attribute('point-order');
	var _elm_lang$svg$Svg_Attributes$patternUnits = _elm_lang$virtual_dom$VirtualDom$attribute('patternUnits');
	var _elm_lang$svg$Svg_Attributes$patternTransform = _elm_lang$virtual_dom$VirtualDom$attribute('patternTransform');
	var _elm_lang$svg$Svg_Attributes$patternContentUnits = _elm_lang$virtual_dom$VirtualDom$attribute('patternContentUnits');
	var _elm_lang$svg$Svg_Attributes$pathLength = _elm_lang$virtual_dom$VirtualDom$attribute('pathLength');
	var _elm_lang$svg$Svg_Attributes$path = _elm_lang$virtual_dom$VirtualDom$attribute('path');
	var _elm_lang$svg$Svg_Attributes$panose1 = _elm_lang$virtual_dom$VirtualDom$attribute('panose-1');
	var _elm_lang$svg$Svg_Attributes$overlineThickness = _elm_lang$virtual_dom$VirtualDom$attribute('overline-thickness');
	var _elm_lang$svg$Svg_Attributes$overlinePosition = _elm_lang$virtual_dom$VirtualDom$attribute('overline-position');
	var _elm_lang$svg$Svg_Attributes$origin = _elm_lang$virtual_dom$VirtualDom$attribute('origin');
	var _elm_lang$svg$Svg_Attributes$orientation = _elm_lang$virtual_dom$VirtualDom$attribute('orientation');
	var _elm_lang$svg$Svg_Attributes$orient = _elm_lang$virtual_dom$VirtualDom$attribute('orient');
	var _elm_lang$svg$Svg_Attributes$order = _elm_lang$virtual_dom$VirtualDom$attribute('order');
	var _elm_lang$svg$Svg_Attributes$operator = _elm_lang$virtual_dom$VirtualDom$attribute('operator');
	var _elm_lang$svg$Svg_Attributes$offset = _elm_lang$virtual_dom$VirtualDom$attribute('offset');
	var _elm_lang$svg$Svg_Attributes$numOctaves = _elm_lang$virtual_dom$VirtualDom$attribute('numOctaves');
	var _elm_lang$svg$Svg_Attributes$name = _elm_lang$virtual_dom$VirtualDom$attribute('name');
	var _elm_lang$svg$Svg_Attributes$mode = _elm_lang$virtual_dom$VirtualDom$attribute('mode');
	var _elm_lang$svg$Svg_Attributes$min = _elm_lang$virtual_dom$VirtualDom$attribute('min');
	var _elm_lang$svg$Svg_Attributes$method = _elm_lang$virtual_dom$VirtualDom$attribute('method');
	var _elm_lang$svg$Svg_Attributes$media = _elm_lang$virtual_dom$VirtualDom$attribute('media');
	var _elm_lang$svg$Svg_Attributes$max = _elm_lang$virtual_dom$VirtualDom$attribute('max');
	var _elm_lang$svg$Svg_Attributes$mathematical = _elm_lang$virtual_dom$VirtualDom$attribute('mathematical');
	var _elm_lang$svg$Svg_Attributes$maskUnits = _elm_lang$virtual_dom$VirtualDom$attribute('maskUnits');
	var _elm_lang$svg$Svg_Attributes$maskContentUnits = _elm_lang$virtual_dom$VirtualDom$attribute('maskContentUnits');
	var _elm_lang$svg$Svg_Attributes$markerWidth = _elm_lang$virtual_dom$VirtualDom$attribute('markerWidth');
	var _elm_lang$svg$Svg_Attributes$markerUnits = _elm_lang$virtual_dom$VirtualDom$attribute('markerUnits');
	var _elm_lang$svg$Svg_Attributes$markerHeight = _elm_lang$virtual_dom$VirtualDom$attribute('markerHeight');
	var _elm_lang$svg$Svg_Attributes$local = _elm_lang$virtual_dom$VirtualDom$attribute('local');
	var _elm_lang$svg$Svg_Attributes$limitingConeAngle = _elm_lang$virtual_dom$VirtualDom$attribute('limitingConeAngle');
	var _elm_lang$svg$Svg_Attributes$lengthAdjust = _elm_lang$virtual_dom$VirtualDom$attribute('lengthAdjust');
	var _elm_lang$svg$Svg_Attributes$lang = _elm_lang$virtual_dom$VirtualDom$attribute('lang');
	var _elm_lang$svg$Svg_Attributes$keyTimes = _elm_lang$virtual_dom$VirtualDom$attribute('keyTimes');
	var _elm_lang$svg$Svg_Attributes$keySplines = _elm_lang$virtual_dom$VirtualDom$attribute('keySplines');
	var _elm_lang$svg$Svg_Attributes$keyPoints = _elm_lang$virtual_dom$VirtualDom$attribute('keyPoints');
	var _elm_lang$svg$Svg_Attributes$kernelUnitLength = _elm_lang$virtual_dom$VirtualDom$attribute('kernelUnitLength');
	var _elm_lang$svg$Svg_Attributes$kernelMatrix = _elm_lang$virtual_dom$VirtualDom$attribute('kernelMatrix');
	var _elm_lang$svg$Svg_Attributes$k4 = _elm_lang$virtual_dom$VirtualDom$attribute('k4');
	var _elm_lang$svg$Svg_Attributes$k3 = _elm_lang$virtual_dom$VirtualDom$attribute('k3');
	var _elm_lang$svg$Svg_Attributes$k2 = _elm_lang$virtual_dom$VirtualDom$attribute('k2');
	var _elm_lang$svg$Svg_Attributes$k1 = _elm_lang$virtual_dom$VirtualDom$attribute('k1');
	var _elm_lang$svg$Svg_Attributes$k = _elm_lang$virtual_dom$VirtualDom$attribute('k');
	var _elm_lang$svg$Svg_Attributes$intercept = _elm_lang$virtual_dom$VirtualDom$attribute('intercept');
	var _elm_lang$svg$Svg_Attributes$in2 = _elm_lang$virtual_dom$VirtualDom$attribute('in2');
	var _elm_lang$svg$Svg_Attributes$in_ = _elm_lang$virtual_dom$VirtualDom$attribute('in');
	var _elm_lang$svg$Svg_Attributes$ideographic = _elm_lang$virtual_dom$VirtualDom$attribute('ideographic');
	var _elm_lang$svg$Svg_Attributes$id = _elm_lang$virtual_dom$VirtualDom$attribute('id');
	var _elm_lang$svg$Svg_Attributes$horizOriginY = _elm_lang$virtual_dom$VirtualDom$attribute('horiz-origin-y');
	var _elm_lang$svg$Svg_Attributes$horizOriginX = _elm_lang$virtual_dom$VirtualDom$attribute('horiz-origin-x');
	var _elm_lang$svg$Svg_Attributes$horizAdvX = _elm_lang$virtual_dom$VirtualDom$attribute('horiz-adv-x');
	var _elm_lang$svg$Svg_Attributes$height = _elm_lang$virtual_dom$VirtualDom$attribute('height');
	var _elm_lang$svg$Svg_Attributes$hanging = _elm_lang$virtual_dom$VirtualDom$attribute('hanging');
	var _elm_lang$svg$Svg_Attributes$gradientUnits = _elm_lang$virtual_dom$VirtualDom$attribute('gradientUnits');
	var _elm_lang$svg$Svg_Attributes$gradientTransform = _elm_lang$virtual_dom$VirtualDom$attribute('gradientTransform');
	var _elm_lang$svg$Svg_Attributes$glyphRef = _elm_lang$virtual_dom$VirtualDom$attribute('glyphRef');
	var _elm_lang$svg$Svg_Attributes$glyphName = _elm_lang$virtual_dom$VirtualDom$attribute('glyph-name');
	var _elm_lang$svg$Svg_Attributes$g2 = _elm_lang$virtual_dom$VirtualDom$attribute('g2');
	var _elm_lang$svg$Svg_Attributes$g1 = _elm_lang$virtual_dom$VirtualDom$attribute('g1');
	var _elm_lang$svg$Svg_Attributes$fy = _elm_lang$virtual_dom$VirtualDom$attribute('fy');
	var _elm_lang$svg$Svg_Attributes$fx = _elm_lang$virtual_dom$VirtualDom$attribute('fx');
	var _elm_lang$svg$Svg_Attributes$from = _elm_lang$virtual_dom$VirtualDom$attribute('from');
	var _elm_lang$svg$Svg_Attributes$format = _elm_lang$virtual_dom$VirtualDom$attribute('format');
	var _elm_lang$svg$Svg_Attributes$filterUnits = _elm_lang$virtual_dom$VirtualDom$attribute('filterUnits');
	var _elm_lang$svg$Svg_Attributes$filterRes = _elm_lang$virtual_dom$VirtualDom$attribute('filterRes');
	var _elm_lang$svg$Svg_Attributes$externalResourcesRequired = _elm_lang$virtual_dom$VirtualDom$attribute('externalResourcesRequired');
	var _elm_lang$svg$Svg_Attributes$exponent = _elm_lang$virtual_dom$VirtualDom$attribute('exponent');
	var _elm_lang$svg$Svg_Attributes$end = _elm_lang$virtual_dom$VirtualDom$attribute('end');
	var _elm_lang$svg$Svg_Attributes$elevation = _elm_lang$virtual_dom$VirtualDom$attribute('elevation');
	var _elm_lang$svg$Svg_Attributes$edgeMode = _elm_lang$virtual_dom$VirtualDom$attribute('edgeMode');
	var _elm_lang$svg$Svg_Attributes$dy = _elm_lang$virtual_dom$VirtualDom$attribute('dy');
	var _elm_lang$svg$Svg_Attributes$dx = _elm_lang$virtual_dom$VirtualDom$attribute('dx');
	var _elm_lang$svg$Svg_Attributes$dur = _elm_lang$virtual_dom$VirtualDom$attribute('dur');
	var _elm_lang$svg$Svg_Attributes$divisor = _elm_lang$virtual_dom$VirtualDom$attribute('divisor');
	var _elm_lang$svg$Svg_Attributes$diffuseConstant = _elm_lang$virtual_dom$VirtualDom$attribute('diffuseConstant');
	var _elm_lang$svg$Svg_Attributes$descent = _elm_lang$virtual_dom$VirtualDom$attribute('descent');
	var _elm_lang$svg$Svg_Attributes$decelerate = _elm_lang$virtual_dom$VirtualDom$attribute('decelerate');
	var _elm_lang$svg$Svg_Attributes$d = _elm_lang$virtual_dom$VirtualDom$attribute('d');
	var _elm_lang$svg$Svg_Attributes$cy = _elm_lang$virtual_dom$VirtualDom$attribute('cy');
	var _elm_lang$svg$Svg_Attributes$cx = _elm_lang$virtual_dom$VirtualDom$attribute('cx');
	var _elm_lang$svg$Svg_Attributes$contentStyleType = _elm_lang$virtual_dom$VirtualDom$attribute('contentStyleType');
	var _elm_lang$svg$Svg_Attributes$contentScriptType = _elm_lang$virtual_dom$VirtualDom$attribute('contentScriptType');
	var _elm_lang$svg$Svg_Attributes$clipPathUnits = _elm_lang$virtual_dom$VirtualDom$attribute('clipPathUnits');
	var _elm_lang$svg$Svg_Attributes$class = _elm_lang$virtual_dom$VirtualDom$attribute('class');
	var _elm_lang$svg$Svg_Attributes$capHeight = _elm_lang$virtual_dom$VirtualDom$attribute('cap-height');
	var _elm_lang$svg$Svg_Attributes$calcMode = _elm_lang$virtual_dom$VirtualDom$attribute('calcMode');
	var _elm_lang$svg$Svg_Attributes$by = _elm_lang$virtual_dom$VirtualDom$attribute('by');
	var _elm_lang$svg$Svg_Attributes$bias = _elm_lang$virtual_dom$VirtualDom$attribute('bias');
	var _elm_lang$svg$Svg_Attributes$begin = _elm_lang$virtual_dom$VirtualDom$attribute('begin');
	var _elm_lang$svg$Svg_Attributes$bbox = _elm_lang$virtual_dom$VirtualDom$attribute('bbox');
	var _elm_lang$svg$Svg_Attributes$baseProfile = _elm_lang$virtual_dom$VirtualDom$attribute('baseProfile');
	var _elm_lang$svg$Svg_Attributes$baseFrequency = _elm_lang$virtual_dom$VirtualDom$attribute('baseFrequency');
	var _elm_lang$svg$Svg_Attributes$azimuth = _elm_lang$virtual_dom$VirtualDom$attribute('azimuth');
	var _elm_lang$svg$Svg_Attributes$autoReverse = _elm_lang$virtual_dom$VirtualDom$attribute('autoReverse');
	var _elm_lang$svg$Svg_Attributes$attributeType = _elm_lang$virtual_dom$VirtualDom$attribute('attributeType');
	var _elm_lang$svg$Svg_Attributes$attributeName = _elm_lang$virtual_dom$VirtualDom$attribute('attributeName');
	var _elm_lang$svg$Svg_Attributes$ascent = _elm_lang$virtual_dom$VirtualDom$attribute('ascent');
	var _elm_lang$svg$Svg_Attributes$arabicForm = _elm_lang$virtual_dom$VirtualDom$attribute('arabic-form');
	var _elm_lang$svg$Svg_Attributes$amplitude = _elm_lang$virtual_dom$VirtualDom$attribute('amplitude');
	var _elm_lang$svg$Svg_Attributes$allowReorder = _elm_lang$virtual_dom$VirtualDom$attribute('allowReorder');
	var _elm_lang$svg$Svg_Attributes$alphabetic = _elm_lang$virtual_dom$VirtualDom$attribute('alphabetic');
	var _elm_lang$svg$Svg_Attributes$additive = _elm_lang$virtual_dom$VirtualDom$attribute('additive');
	var _elm_lang$svg$Svg_Attributes$accumulate = _elm_lang$virtual_dom$VirtualDom$attribute('accumulate');
	var _elm_lang$svg$Svg_Attributes$accelerate = _elm_lang$virtual_dom$VirtualDom$attribute('accelerate');
	var _elm_lang$svg$Svg_Attributes$accentHeight = _elm_lang$virtual_dom$VirtualDom$attribute('accent-height');
	
	var _evancz$elm_markdown$Native_Markdown = function() {
	
	
	// VIRTUAL-DOM WIDGETS
	
	function toHtml(options, factList, rawMarkdown)
	{
		var model = {
			options: options,
			markdown: rawMarkdown
		};
		return _elm_lang$virtual_dom$Native_VirtualDom.custom(factList, model, implementation);
	}
	
	
	// WIDGET IMPLEMENTATION
	
	var implementation = {
		render: render,
		diff: diff
	};
	
	function render(model)
	{
		var html = marked(model.markdown, formatOptions(model.options));
		var div = document.createElement('div');
		div.innerHTML = html;
		return div;
	}
	
	function diff(a, b)
	{
		
		if (a.model.markdown === b.model.markdown && a.model.options === b.model.options)
		{
			return null;
		}
	
		return {
			applyPatch: applyPatch,
			data: marked(b.model.markdown, formatOptions(b.model.options))
		};
	}
	
	function applyPatch(domNode, data)
	{
		domNode.innerHTML = data;
		return domNode;
	}
	
	
	// ACTUAL MARKDOWN PARSER
	
	var marked = function() {
		// catch the `marked` object regardless of the outer environment.
		// (ex. a CommonJS module compatible environment.)
		// note that this depends on marked's implementation of environment detection.
		var module = {};
		var exports = module.exports = {};
	
		/**
		 * marked - a markdown parser
		 * Copyright (c) 2011-2014, Christopher Jeffrey. (MIT Licensed)
		 * https://github.com/chjj/marked
		 */
		(function(){var block={newline:/^\n+/,code:/^( {4}[^\n]+\n*)+/,fences:noop,hr:/^( *[-*_]){3,} *(?:\n+|$)/,heading:/^ *(#{1,6}) *([^\n]+?) *#* *(?:\n+|$)/,nptable:noop,lheading:/^([^\n]+)\n *(=|-){2,} *(?:\n+|$)/,blockquote:/^( *>[^\n]+(\n(?!def)[^\n]+)*\n*)+/,list:/^( *)(bull) [\s\S]+?(?:hr|def|\n{2,}(?! )(?!\1bull )\n*|\s*$)/,html:/^ *(?:comment|closed|closing) *(?:\n{2,}|\s*$)/,def:/^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +["(]([^\n]+)[")])? *(?:\n+|$)/,table:noop,paragraph:/^((?:[^\n]+\n?(?!hr|heading|lheading|blockquote|tag|def))+)\n*/,text:/^[^\n]+/};block.bullet=/(?:[*+-]|\d+\.)/;block.item=/^( *)(bull) [^\n]*(?:\n(?!\1bull )[^\n]*)*/;block.item=replace(block.item,"gm")(/bull/g,block.bullet)();block.list=replace(block.list)(/bull/g,block.bullet)("hr","\\n+(?=\\1?(?:[-*_] *){3,}(?:\\n+|$))")("def","\\n+(?="+block.def.source+")")();block.blockquote=replace(block.blockquote)("def",block.def)();block._tag="(?!(?:"+"a|em|strong|small|s|cite|q|dfn|abbr|data|time|code"+"|var|samp|kbd|sub|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo"+"|span|br|wbr|ins|del|img)\\b)\\w+(?!:/|[^\\w\\s@]*@)\\b";block.html=replace(block.html)("comment",/<!--[\s\S]*?-->/)("closed",/<(tag)[\s\S]+?<\/\1>/)("closing",/<tag(?:"[^"]*"|'[^']*'|[^'">])*?>/)(/tag/g,block._tag)();block.paragraph=replace(block.paragraph)("hr",block.hr)("heading",block.heading)("lheading",block.lheading)("blockquote",block.blockquote)("tag","<"+block._tag)("def",block.def)();block.normal=merge({},block);block.gfm=merge({},block.normal,{fences:/^ *(`{3,}|~{3,}) *(\S+)? *\n([\s\S]+?)\s*\1 *(?:\n+|$)/,paragraph:/^/});block.gfm.paragraph=replace(block.paragraph)("(?!","(?!"+block.gfm.fences.source.replace("\\1","\\2")+"|"+block.list.source.replace("\\1","\\3")+"|")();block.tables=merge({},block.gfm,{nptable:/^ *(\S.*\|.*)\n *([-:]+ *\|[-| :]*)\n((?:.*\|.*(?:\n|$))*)\n*/,table:/^ *\|(.+)\n *\|( *[-:]+[-| :]*)\n((?: *\|.*(?:\n|$))*)\n*/});function Lexer(options){this.tokens=[];this.tokens.links={};this.options=options||marked.defaults;this.rules=block.normal;if(this.options.gfm){if(this.options.tables){this.rules=block.tables}else{this.rules=block.gfm}}}Lexer.rules=block;Lexer.lex=function(src,options){var lexer=new Lexer(options);return lexer.lex(src)};Lexer.prototype.lex=function(src){src=src.replace(/\r\n|\r/g,"\n").replace(/\t/g,"    ").replace(/\u00a0/g," ").replace(/\u2424/g,"\n");return this.token(src,true)};Lexer.prototype.token=function(src,top,bq){var src=src.replace(/^ +$/gm,""),next,loose,cap,bull,b,item,space,i,l;while(src){if(cap=this.rules.newline.exec(src)){src=src.substring(cap[0].length);if(cap[0].length>1){this.tokens.push({type:"space"})}}if(cap=this.rules.code.exec(src)){src=src.substring(cap[0].length);cap=cap[0].replace(/^ {4}/gm,"");this.tokens.push({type:"code",text:!this.options.pedantic?cap.replace(/\n+$/,""):cap});continue}if(cap=this.rules.fences.exec(src)){src=src.substring(cap[0].length);this.tokens.push({type:"code",lang:cap[2],text:cap[3]});continue}if(cap=this.rules.heading.exec(src)){src=src.substring(cap[0].length);this.tokens.push({type:"heading",depth:cap[1].length,text:cap[2]});continue}if(top&&(cap=this.rules.nptable.exec(src))){src=src.substring(cap[0].length);item={type:"table",header:cap[1].replace(/^ *| *\| *$/g,"").split(/ *\| */),align:cap[2].replace(/^ *|\| *$/g,"").split(/ *\| */),cells:cap[3].replace(/\n$/,"").split("\n")};for(i=0;i<item.align.length;i++){if(/^ *-+: *$/.test(item.align[i])){item.align[i]="right"}else if(/^ *:-+: *$/.test(item.align[i])){item.align[i]="center"}else if(/^ *:-+ *$/.test(item.align[i])){item.align[i]="left"}else{item.align[i]=null}}for(i=0;i<item.cells.length;i++){item.cells[i]=item.cells[i].split(/ *\| */)}this.tokens.push(item);continue}if(cap=this.rules.lheading.exec(src)){src=src.substring(cap[0].length);this.tokens.push({type:"heading",depth:cap[2]==="="?1:2,text:cap[1]});continue}if(cap=this.rules.hr.exec(src)){src=src.substring(cap[0].length);this.tokens.push({type:"hr"});continue}if(cap=this.rules.blockquote.exec(src)){src=src.substring(cap[0].length);this.tokens.push({type:"blockquote_start"});cap=cap[0].replace(/^ *> ?/gm,"");this.token(cap,top,true);this.tokens.push({type:"blockquote_end"});continue}if(cap=this.rules.list.exec(src)){src=src.substring(cap[0].length);bull=cap[2];this.tokens.push({type:"list_start",ordered:bull.length>1});cap=cap[0].match(this.rules.item);next=false;l=cap.length;i=0;for(;i<l;i++){item=cap[i];space=item.length;item=item.replace(/^ *([*+-]|\d+\.) +/,"");if(~item.indexOf("\n ")){space-=item.length;item=!this.options.pedantic?item.replace(new RegExp("^ {1,"+space+"}","gm"),""):item.replace(/^ {1,4}/gm,"")}if(this.options.smartLists&&i!==l-1){b=block.bullet.exec(cap[i+1])[0];if(bull!==b&&!(bull.length>1&&b.length>1)){src=cap.slice(i+1).join("\n")+src;i=l-1}}loose=next||/\n\n(?!\s*$)/.test(item);if(i!==l-1){next=item.charAt(item.length-1)==="\n";if(!loose)loose=next}this.tokens.push({type:loose?"loose_item_start":"list_item_start"});this.token(item,false,bq);this.tokens.push({type:"list_item_end"})}this.tokens.push({type:"list_end"});continue}if(cap=this.rules.html.exec(src)){src=src.substring(cap[0].length);this.tokens.push({type:this.options.sanitize?"paragraph":"html",pre:cap[1]==="pre"||cap[1]==="script"||cap[1]==="style",text:cap[0]});continue}if(!bq&&top&&(cap=this.rules.def.exec(src))){src=src.substring(cap[0].length);this.tokens.links[cap[1].toLowerCase()]={href:cap[2],title:cap[3]};continue}if(top&&(cap=this.rules.table.exec(src))){src=src.substring(cap[0].length);item={type:"table",header:cap[1].replace(/^ *| *\| *$/g,"").split(/ *\| */),align:cap[2].replace(/^ *|\| *$/g,"").split(/ *\| */),cells:cap[3].replace(/(?: *\| *)?\n$/,"").split("\n")};for(i=0;i<item.align.length;i++){if(/^ *-+: *$/.test(item.align[i])){item.align[i]="right"}else if(/^ *:-+: *$/.test(item.align[i])){item.align[i]="center"}else if(/^ *:-+ *$/.test(item.align[i])){item.align[i]="left"}else{item.align[i]=null}}for(i=0;i<item.cells.length;i++){item.cells[i]=item.cells[i].replace(/^ *\| *| *\| *$/g,"").split(/ *\| */)}this.tokens.push(item);continue}if(top&&(cap=this.rules.paragraph.exec(src))){src=src.substring(cap[0].length);this.tokens.push({type:"paragraph",text:cap[1].charAt(cap[1].length-1)==="\n"?cap[1].slice(0,-1):cap[1]});continue}if(cap=this.rules.text.exec(src)){src=src.substring(cap[0].length);this.tokens.push({type:"text",text:cap[0]});continue}if(src){throw new Error("Infinite loop on byte: "+src.charCodeAt(0))}}return this.tokens};var inline={escape:/^\\([\\`*{}\[\]()#+\-.!_>])/,autolink:/^<([^ >]+(@|:\/)[^ >]+)>/,url:noop,tag:/^<!--[\s\S]*?-->|^<\/?\w+(?:"[^"]*"|'[^']*'|[^'">])*?>/,link:/^!?\[(inside)\]\(href\)/,reflink:/^!?\[(inside)\]\s*\[([^\]]*)\]/,nolink:/^!?\[((?:\[[^\]]*\]|[^\[\]])*)\]/,strong:/^__([\s\S]+?)__(?!_)|^\*\*([\s\S]+?)\*\*(?!\*)/,em:/^\b_((?:__|[\s\S])+?)_\b|^\*((?:\*\*|[\s\S])+?)\*(?!\*)/,code:/^(`+)\s*([\s\S]*?[^`])\s*\1(?!`)/,br:/^ {2,}\n(?!\s*$)/,del:noop,text:/^[\s\S]+?(?=[\\<!\[_*`]| {2,}\n|$)/};inline._inside=/(?:\[[^\]]*\]|[^\[\]]|\](?=[^\[]*\]))*/;inline._href=/\s*<?([\s\S]*?)>?(?:\s+['"]([\s\S]*?)['"])?\s*/;inline.link=replace(inline.link)("inside",inline._inside)("href",inline._href)();inline.reflink=replace(inline.reflink)("inside",inline._inside)();inline.normal=merge({},inline);inline.pedantic=merge({},inline.normal,{strong:/^__(?=\S)([\s\S]*?\S)__(?!_)|^\*\*(?=\S)([\s\S]*?\S)\*\*(?!\*)/,em:/^_(?=\S)([\s\S]*?\S)_(?!_)|^\*(?=\S)([\s\S]*?\S)\*(?!\*)/});inline.gfm=merge({},inline.normal,{escape:replace(inline.escape)("])","~|])")(),url:/^(https?:\/\/[^\s<]+[^<.,:;"')\]\s])/,del:/^~~(?=\S)([\s\S]*?\S)~~/,text:replace(inline.text)("]|","~]|")("|","|https?://|")()});inline.breaks=merge({},inline.gfm,{br:replace(inline.br)("{2,}","*")(),text:replace(inline.gfm.text)("{2,}","*")()});function InlineLexer(links,options){this.options=options||marked.defaults;this.links=links;this.rules=inline.normal;this.renderer=this.options.renderer||new Renderer;this.renderer.options=this.options;if(!this.links){throw new Error("Tokens array requires a `links` property.")}if(this.options.gfm){if(this.options.breaks){this.rules=inline.breaks}else{this.rules=inline.gfm}}else if(this.options.pedantic){this.rules=inline.pedantic}}InlineLexer.rules=inline;InlineLexer.output=function(src,links,options){var inline=new InlineLexer(links,options);return inline.output(src)};InlineLexer.prototype.output=function(src){var out="",link,text,href,cap;while(src){if(cap=this.rules.escape.exec(src)){src=src.substring(cap[0].length);out+=cap[1];continue}if(cap=this.rules.autolink.exec(src)){src=src.substring(cap[0].length);if(cap[2]==="@"){text=cap[1].charAt(6)===":"?this.mangle(cap[1].substring(7)):this.mangle(cap[1]);href=this.mangle("mailto:")+text}else{text=escape(cap[1]);href=text}out+=this.renderer.link(href,null,text);continue}if(!this.inLink&&(cap=this.rules.url.exec(src))){src=src.substring(cap[0].length);text=escape(cap[1]);href=text;out+=this.renderer.link(href,null,text);continue}if(cap=this.rules.tag.exec(src)){if(!this.inLink&&/^<a /i.test(cap[0])){this.inLink=true}else if(this.inLink&&/^<\/a>/i.test(cap[0])){this.inLink=false}src=src.substring(cap[0].length);out+=this.options.sanitize?escape(cap[0]):cap[0];continue}if(cap=this.rules.link.exec(src)){src=src.substring(cap[0].length);this.inLink=true;out+=this.outputLink(cap,{href:cap[2],title:cap[3]});this.inLink=false;continue}if((cap=this.rules.reflink.exec(src))||(cap=this.rules.nolink.exec(src))){src=src.substring(cap[0].length);link=(cap[2]||cap[1]).replace(/\s+/g," ");link=this.links[link.toLowerCase()];if(!link||!link.href){out+=cap[0].charAt(0);src=cap[0].substring(1)+src;continue}this.inLink=true;out+=this.outputLink(cap,link);this.inLink=false;continue}if(cap=this.rules.strong.exec(src)){src=src.substring(cap[0].length);out+=this.renderer.strong(this.output(cap[2]||cap[1]));continue}if(cap=this.rules.em.exec(src)){src=src.substring(cap[0].length);out+=this.renderer.em(this.output(cap[2]||cap[1]));continue}if(cap=this.rules.code.exec(src)){src=src.substring(cap[0].length);out+=this.renderer.codespan(escape(cap[2],true));continue}if(cap=this.rules.br.exec(src)){src=src.substring(cap[0].length);out+=this.renderer.br();continue}if(cap=this.rules.del.exec(src)){src=src.substring(cap[0].length);out+=this.renderer.del(this.output(cap[1]));continue}if(cap=this.rules.text.exec(src)){src=src.substring(cap[0].length);out+=escape(this.smartypants(cap[0]));continue}if(src){throw new Error("Infinite loop on byte: "+src.charCodeAt(0))}}return out};InlineLexer.prototype.outputLink=function(cap,link){var href=escape(link.href),title=link.title?escape(link.title):null;return cap[0].charAt(0)!=="!"?this.renderer.link(href,title,this.output(cap[1])):this.renderer.image(href,title,escape(cap[1]))};InlineLexer.prototype.smartypants=function(text){if(!this.options.smartypants)return text;return text.replace(/--/g,"—").replace(/(^|[-\u2014/(\[{"\s])'/g,"$1‘").replace(/'/g,"’").replace(/(^|[-\u2014/(\[{\u2018\s])"/g,"$1“").replace(/"/g,"”").replace(/\.{3}/g,"…")};InlineLexer.prototype.mangle=function(text){var out="",l=text.length,i=0,ch;for(;i<l;i++){ch=text.charCodeAt(i);if(Math.random()>.5){ch="x"+ch.toString(16)}out+="&#"+ch+";"}return out};function Renderer(options){this.options=options||{}}Renderer.prototype.code=function(code,lang,escaped){if(this.options.highlight){var out=this.options.highlight(code,lang);if(out!=null&&out!==code){escaped=true;code=out}}if(!lang){return"<pre><code>"+(escaped?code:escape(code,true))+"\n</code></pre>"}return'<pre><code class="'+this.options.langPrefix+escape(lang,true)+'">'+(escaped?code:escape(code,true))+"\n</code></pre>\n"};Renderer.prototype.blockquote=function(quote){return"<blockquote>\n"+quote+"</blockquote>\n"};Renderer.prototype.html=function(html){return html};Renderer.prototype.heading=function(text,level,raw){return"<h"+level+' id="'+this.options.headerPrefix+raw.toLowerCase().replace(/[^\w]+/g,"-")+'">'+text+"</h"+level+">\n"};Renderer.prototype.hr=function(){return this.options.xhtml?"<hr/>\n":"<hr>\n"};Renderer.prototype.list=function(body,ordered){var type=ordered?"ol":"ul";return"<"+type+">\n"+body+"</"+type+">\n"};Renderer.prototype.listitem=function(text){return"<li>"+text+"</li>\n"};Renderer.prototype.paragraph=function(text){return"<p>"+text+"</p>\n"};Renderer.prototype.table=function(header,body){return"<table>\n"+"<thead>\n"+header+"</thead>\n"+"<tbody>\n"+body+"</tbody>\n"+"</table>\n"};Renderer.prototype.tablerow=function(content){return"<tr>\n"+content+"</tr>\n"};Renderer.prototype.tablecell=function(content,flags){var type=flags.header?"th":"td";var tag=flags.align?"<"+type+' style="text-align:'+flags.align+'">':"<"+type+">";return tag+content+"</"+type+">\n"};Renderer.prototype.strong=function(text){return"<strong>"+text+"</strong>"};Renderer.prototype.em=function(text){return"<em>"+text+"</em>"};Renderer.prototype.codespan=function(text){return"<code>"+text+"</code>"};Renderer.prototype.br=function(){return this.options.xhtml?"<br/>":"<br>"};Renderer.prototype.del=function(text){return"<del>"+text+"</del>"};Renderer.prototype.link=function(href,title,text){if(this.options.sanitize){try{var prot=decodeURIComponent(unescape(href)).replace(/[^\w:]/g,"").toLowerCase()}catch(e){return""}if(prot.indexOf("javascript:")===0){return""}}var out='<a href="'+href+'"';if(title){out+=' title="'+title+'"'}out+=">"+text+"</a>";return out};Renderer.prototype.image=function(href,title,text){var out='<img src="'+href+'" alt="'+text+'"';if(title){out+=' title="'+title+'"'}out+=this.options.xhtml?"/>":">";return out};function Parser(options){this.tokens=[];this.token=null;this.options=options||marked.defaults;this.options.renderer=this.options.renderer||new Renderer;this.renderer=this.options.renderer;this.renderer.options=this.options}Parser.parse=function(src,options,renderer){var parser=new Parser(options,renderer);return parser.parse(src)};Parser.prototype.parse=function(src){this.inline=new InlineLexer(src.links,this.options,this.renderer);this.tokens=src.reverse();var out="";while(this.next()){out+=this.tok()}return out};Parser.prototype.next=function(){return this.token=this.tokens.pop()};Parser.prototype.peek=function(){return this.tokens[this.tokens.length-1]||0};Parser.prototype.parseText=function(){var body=this.token.text;while(this.peek().type==="text"){body+="\n"+this.next().text}return this.inline.output(body)};Parser.prototype.tok=function(){switch(this.token.type){case"space":{return""}case"hr":{return this.renderer.hr()}case"heading":{return this.renderer.heading(this.inline.output(this.token.text),this.token.depth,this.token.text)}case"code":{return this.renderer.code(this.token.text,this.token.lang,this.token.escaped)}case"table":{var header="",body="",i,row,cell,flags,j;cell="";for(i=0;i<this.token.header.length;i++){flags={header:true,align:this.token.align[i]};cell+=this.renderer.tablecell(this.inline.output(this.token.header[i]),{header:true,align:this.token.align[i]})}header+=this.renderer.tablerow(cell);for(i=0;i<this.token.cells.length;i++){row=this.token.cells[i];cell="";for(j=0;j<row.length;j++){cell+=this.renderer.tablecell(this.inline.output(row[j]),{header:false,align:this.token.align[j]})}body+=this.renderer.tablerow(cell)}return this.renderer.table(header,body)}case"blockquote_start":{var body="";while(this.next().type!=="blockquote_end"){body+=this.tok()}return this.renderer.blockquote(body)}case"list_start":{var body="",ordered=this.token.ordered;while(this.next().type!=="list_end"){body+=this.tok()}return this.renderer.list(body,ordered)}case"list_item_start":{var body="";while(this.next().type!=="list_item_end"){body+=this.token.type==="text"?this.parseText():this.tok()}return this.renderer.listitem(body)}case"loose_item_start":{var body="";while(this.next().type!=="list_item_end"){body+=this.tok()}return this.renderer.listitem(body)}case"html":{var html=!this.token.pre&&!this.options.pedantic?this.inline.output(this.token.text):this.token.text;return this.renderer.html(html)}case"paragraph":{return this.renderer.paragraph(this.inline.output(this.token.text))}case"text":{return this.renderer.paragraph(this.parseText())}}};function escape(html,encode){return html.replace(!encode?/&(?!#?\w+;)/g:/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}function unescape(html){return html.replace(/&([#\w]+);/g,function(_,n){n=n.toLowerCase();if(n==="colon")return":";if(n.charAt(0)==="#"){return n.charAt(1)==="x"?String.fromCharCode(parseInt(n.substring(2),16)):String.fromCharCode(+n.substring(1))}return""})}function replace(regex,opt){regex=regex.source;opt=opt||"";return function self(name,val){if(!name)return new RegExp(regex,opt);val=val.source||val;val=val.replace(/(^|[^\[])\^/g,"$1");regex=regex.replace(name,val);return self}}function noop(){}noop.exec=noop;function merge(obj){var i=1,target,key;for(;i<arguments.length;i++){target=arguments[i];for(key in target){if(Object.prototype.hasOwnProperty.call(target,key)){obj[key]=target[key]}}}return obj}function marked(src,opt,callback){if(callback||typeof opt==="function"){if(!callback){callback=opt;opt=null}opt=merge({},marked.defaults,opt||{});var highlight=opt.highlight,tokens,pending,i=0;try{tokens=Lexer.lex(src,opt)}catch(e){return callback(e)}pending=tokens.length;var done=function(err){if(err){opt.highlight=highlight;return callback(err)}var out;try{out=Parser.parse(tokens,opt)}catch(e){err=e}opt.highlight=highlight;return err?callback(err):callback(null,out)};if(!highlight||highlight.length<3){return done()}delete opt.highlight;if(!pending)return done();for(;i<tokens.length;i++){(function(token){if(token.type!=="code"){return--pending||done()}return highlight(token.text,token.lang,function(err,code){if(err)return done(err);if(code==null||code===token.text){return--pending||done()}token.text=code;token.escaped=true;--pending||done()})})(tokens[i])}return}try{if(opt)opt=merge({},marked.defaults,opt);return Parser.parse(Lexer.lex(src,opt),opt)}catch(e){e.message+="\nPlease report this to https://github.com/chjj/marked.";if((opt||marked.defaults).silent){return"<p>An error occured:</p><pre>"+escape(e.message+"",true)+"</pre>"}throw e}}marked.options=marked.setOptions=function(opt){merge(marked.defaults,opt);return marked};marked.defaults={gfm:true,tables:true,breaks:false,pedantic:false,sanitize:false,smartLists:false,silent:false,highlight:null,langPrefix:"lang-",smartypants:false,headerPrefix:"",renderer:new Renderer,xhtml:false};marked.Parser=Parser;marked.parser=Parser.parse;marked.Renderer=Renderer;marked.Lexer=Lexer;marked.lexer=Lexer.lex;marked.InlineLexer=InlineLexer;marked.inlineLexer=InlineLexer.output;marked.parse=marked;if(typeof module!=="undefined"&&typeof exports==="object"){module.exports=marked}else if(true){!(__WEBPACK_AMD_DEFINE_RESULT__ = function(){return marked}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__))}else{this.marked=marked}}).call(function(){return this||(typeof window!=="undefined"?window:global)}());
	
		return module.exports;
	}();
	
	
	// FORMAT OPTIONS FOR MARKED IMPLEMENTATION
	
	function formatOptions(options)
	{
		function toHighlight(code, lang)
		{
			if (!lang && options.defaultHighlighting.ctor === 'Just')
			{
				lang = options.defaultHighlighting._0;
			}
	
			if (typeof hljs !== 'undefined' && lang && hljs.listLanguages().indexOf(lang) >= 0)
			{
				return hljs.highlight(lang, code, true).value;
			}
	
			return code;
		}
	
		var gfm = options.githubFlavored;
		if (gfm.ctor === 'Just')
		{
			return {
				highlight: toHighlight,
				gfm: true,
				tables: gfm._0.tables,
				breaks: gfm._0.breaks,
				sanitize: options.sanitize,
				smartypants: options.smartypants
			};
		}
	
		return {
			highlight: toHighlight,
			gfm: false,
			tables: false,
			breaks: false,
			sanitize: options.sanitize,
			smartypants: options.smartypants
		};
	}
	
	
	// EXPORTS
	
	return {
		toHtml: F3(toHtml)
	};
	
	}();
	
	var _evancz$elm_markdown$Markdown$toHtmlWith = _evancz$elm_markdown$Native_Markdown.toHtml;
	var _evancz$elm_markdown$Markdown$defaultOptions = {
		githubFlavored: _elm_lang$core$Maybe$Just(
			{tables: false, breaks: false}),
		defaultHighlighting: _elm_lang$core$Maybe$Nothing,
		sanitize: false,
		smartypants: false
	};
	var _evancz$elm_markdown$Markdown$toHtml = F2(
		function (attrs, string) {
			return A3(_evancz$elm_markdown$Native_Markdown.toHtml, _evancz$elm_markdown$Markdown$defaultOptions, attrs, string);
		});
	var _evancz$elm_markdown$Markdown$Options = F4(
		function (a, b, c, d) {
			return {githubFlavored: a, defaultHighlighting: b, sanitize: c, smartypants: d};
		});
	
	var _evancz$url_parser$UrlParser$toKeyValuePair = function (segment) {
		var _p0 = A2(_elm_lang$core$String$split, '=', segment);
		if (((_p0.ctor === '::') && (_p0._1.ctor === '::')) && (_p0._1._1.ctor === '[]')) {
			return A3(
				_elm_lang$core$Maybe$map2,
				F2(
					function (v0, v1) {
						return {ctor: '_Tuple2', _0: v0, _1: v1};
					}),
				_elm_lang$http$Http$decodeUri(_p0._0),
				_elm_lang$http$Http$decodeUri(_p0._1._0));
		} else {
			return _elm_lang$core$Maybe$Nothing;
		}
	};
	var _evancz$url_parser$UrlParser$parseParams = function (queryString) {
		return _elm_lang$core$Dict$fromList(
			A2(
				_elm_lang$core$List$filterMap,
				_evancz$url_parser$UrlParser$toKeyValuePair,
				A2(
					_elm_lang$core$String$split,
					'&',
					A2(_elm_lang$core$String$dropLeft, 1, queryString))));
	};
	var _evancz$url_parser$UrlParser$splitUrl = function (url) {
		var _p1 = A2(_elm_lang$core$String$split, '/', url);
		if ((_p1.ctor === '::') && (_p1._0 === '')) {
			return _p1._1;
		} else {
			return _p1;
		}
	};
	var _evancz$url_parser$UrlParser$parseHelp = function (states) {
		parseHelp:
		while (true) {
			var _p2 = states;
			if (_p2.ctor === '[]') {
				return _elm_lang$core$Maybe$Nothing;
			} else {
				var _p4 = _p2._0;
				var _p3 = _p4.unvisited;
				if (_p3.ctor === '[]') {
					return _elm_lang$core$Maybe$Just(_p4.value);
				} else {
					if ((_p3._0 === '') && (_p3._1.ctor === '[]')) {
						return _elm_lang$core$Maybe$Just(_p4.value);
					} else {
						var _v4 = _p2._1;
						states = _v4;
						continue parseHelp;
					}
				}
			}
		}
	};
	var _evancz$url_parser$UrlParser$parse = F3(
		function (_p5, url, params) {
			var _p6 = _p5;
			return _evancz$url_parser$UrlParser$parseHelp(
				_p6._0(
					{
						visited: {ctor: '[]'},
						unvisited: _evancz$url_parser$UrlParser$splitUrl(url),
						params: params,
						value: _elm_lang$core$Basics$identity
					}));
		});
	var _evancz$url_parser$UrlParser$parseHash = F2(
		function (parser, location) {
			return A3(
				_evancz$url_parser$UrlParser$parse,
				parser,
				A2(_elm_lang$core$String$dropLeft, 1, location.hash),
				_evancz$url_parser$UrlParser$parseParams(location.search));
		});
	var _evancz$url_parser$UrlParser$parsePath = F2(
		function (parser, location) {
			return A3(
				_evancz$url_parser$UrlParser$parse,
				parser,
				location.pathname,
				_evancz$url_parser$UrlParser$parseParams(location.search));
		});
	var _evancz$url_parser$UrlParser$intParamHelp = function (maybeValue) {
		var _p7 = maybeValue;
		if (_p7.ctor === 'Nothing') {
			return _elm_lang$core$Maybe$Nothing;
		} else {
			return _elm_lang$core$Result$toMaybe(
				_elm_lang$core$String$toInt(_p7._0));
		}
	};
	var _evancz$url_parser$UrlParser$mapHelp = F2(
		function (func, _p8) {
			var _p9 = _p8;
			return {
				visited: _p9.visited,
				unvisited: _p9.unvisited,
				params: _p9.params,
				value: func(_p9.value)
			};
		});
	var _evancz$url_parser$UrlParser$State = F4(
		function (a, b, c, d) {
			return {visited: a, unvisited: b, params: c, value: d};
		});
	var _evancz$url_parser$UrlParser$Parser = function (a) {
		return {ctor: 'Parser', _0: a};
	};
	var _evancz$url_parser$UrlParser$s = function (str) {
		return _evancz$url_parser$UrlParser$Parser(
			function (_p10) {
				var _p11 = _p10;
				var _p12 = _p11.unvisited;
				if (_p12.ctor === '[]') {
					return {ctor: '[]'};
				} else {
					var _p13 = _p12._0;
					return _elm_lang$core$Native_Utils.eq(_p13, str) ? {
						ctor: '::',
						_0: A4(
							_evancz$url_parser$UrlParser$State,
							{ctor: '::', _0: _p13, _1: _p11.visited},
							_p12._1,
							_p11.params,
							_p11.value),
						_1: {ctor: '[]'}
					} : {ctor: '[]'};
				}
			});
	};
	var _evancz$url_parser$UrlParser$custom = F2(
		function (tipe, stringToSomething) {
			return _evancz$url_parser$UrlParser$Parser(
				function (_p14) {
					var _p15 = _p14;
					var _p16 = _p15.unvisited;
					if (_p16.ctor === '[]') {
						return {ctor: '[]'};
					} else {
						var _p18 = _p16._0;
						var _p17 = stringToSomething(_p18);
						if (_p17.ctor === 'Ok') {
							return {
								ctor: '::',
								_0: A4(
									_evancz$url_parser$UrlParser$State,
									{ctor: '::', _0: _p18, _1: _p15.visited},
									_p16._1,
									_p15.params,
									_p15.value(_p17._0)),
								_1: {ctor: '[]'}
							};
						} else {
							return {ctor: '[]'};
						}
					}
				});
		});
	var _evancz$url_parser$UrlParser$string = A2(_evancz$url_parser$UrlParser$custom, 'STRING', _elm_lang$core$Result$Ok);
	var _evancz$url_parser$UrlParser$int = A2(_evancz$url_parser$UrlParser$custom, 'NUMBER', _elm_lang$core$String$toInt);
	var _evancz$url_parser$UrlParser_ops = _evancz$url_parser$UrlParser_ops || {};
	_evancz$url_parser$UrlParser_ops['</>'] = F2(
		function (_p20, _p19) {
			var _p21 = _p20;
			var _p22 = _p19;
			return _evancz$url_parser$UrlParser$Parser(
				function (state) {
					return A2(
						_elm_lang$core$List$concatMap,
						_p22._0,
						_p21._0(state));
				});
		});
	var _evancz$url_parser$UrlParser$map = F2(
		function (subValue, _p23) {
			var _p24 = _p23;
			return _evancz$url_parser$UrlParser$Parser(
				function (_p25) {
					var _p26 = _p25;
					return A2(
						_elm_lang$core$List$map,
						_evancz$url_parser$UrlParser$mapHelp(_p26.value),
						_p24._0(
							{visited: _p26.visited, unvisited: _p26.unvisited, params: _p26.params, value: subValue}));
				});
		});
	var _evancz$url_parser$UrlParser$oneOf = function (parsers) {
		return _evancz$url_parser$UrlParser$Parser(
			function (state) {
				return A2(
					_elm_lang$core$List$concatMap,
					function (_p27) {
						var _p28 = _p27;
						return _p28._0(state);
					},
					parsers);
			});
	};
	var _evancz$url_parser$UrlParser$top = _evancz$url_parser$UrlParser$Parser(
		function (state) {
			return {
				ctor: '::',
				_0: state,
				_1: {ctor: '[]'}
			};
		});
	var _evancz$url_parser$UrlParser_ops = _evancz$url_parser$UrlParser_ops || {};
	_evancz$url_parser$UrlParser_ops['<?>'] = F2(
		function (_p30, _p29) {
			var _p31 = _p30;
			var _p32 = _p29;
			return _evancz$url_parser$UrlParser$Parser(
				function (state) {
					return A2(
						_elm_lang$core$List$concatMap,
						_p32._0,
						_p31._0(state));
				});
		});
	var _evancz$url_parser$UrlParser$QueryParser = function (a) {
		return {ctor: 'QueryParser', _0: a};
	};
	var _evancz$url_parser$UrlParser$customParam = F2(
		function (key, func) {
			return _evancz$url_parser$UrlParser$QueryParser(
				function (_p33) {
					var _p34 = _p33;
					var _p35 = _p34.params;
					return {
						ctor: '::',
						_0: A4(
							_evancz$url_parser$UrlParser$State,
							_p34.visited,
							_p34.unvisited,
							_p35,
							_p34.value(
								func(
									A2(_elm_lang$core$Dict$get, key, _p35)))),
						_1: {ctor: '[]'}
					};
				});
		});
	var _evancz$url_parser$UrlParser$stringParam = function (name) {
		return A2(_evancz$url_parser$UrlParser$customParam, name, _elm_lang$core$Basics$identity);
	};
	var _evancz$url_parser$UrlParser$intParam = function (name) {
		return A2(_evancz$url_parser$UrlParser$customParam, name, _evancz$url_parser$UrlParser$intParamHelp);
	};
	
	var _pickled_plugins$lettero$Constants$baseUrl = 'https://lettero.co';
	
	var _pickled_plugins$lettero$Content$defaultErrorMessage = 'Hi, this is an error';
	var _pickled_plugins$lettero$Content$gameIncorrectGuessNotification = 'Not quite what we were looking for :(';
	var _pickled_plugins$lettero$Content$gameIdleNotification = 'Oupsie, ran out of time there :/';
	var _pickled_plugins$lettero$Content$gameTieNotification = 'It’s a tie, folks';
	var _pickled_plugins$lettero$Content$gameRoundLoseNotification = 'This one goes to ${}';
	var _pickled_plugins$lettero$Content$gameRoundWinNotification = 'Nice going, ${}!';
	var _pickled_plugins$lettero$Content$gameReadyScreenBody = 'Once you feel ready, tap your name. This game can get a little stressful, so feel free to take a deep breath or two before you do so. Letterhunting begins immediately once all players marked ready.';
	var _pickled_plugins$lettero$Content$gameReadyScreenTitle = 'Ready, fellas?';
	var _pickled_plugins$lettero$Content$tutorialIncorrect = 'Not quite, not quite. Give it one more go?';
	var _pickled_plugins$lettero$Content$tutorialCorrect = 'Well done - shall we create a game room now?';
	var _pickled_plugins$lettero$Content$tutorialShow = 'Holy moly, who writes like that? Anyways, see if you can find the first letter.';
	var _pickled_plugins$lettero$Content$tutorialStart = 'Heyyo, ready? Just click me to get your very first word.';
	var _pickled_plugins$lettero$Content$roomManagerPageInviteLinksIntro = 'Or invite your opponent by email:';
	var _pickled_plugins$lettero$Content$roomManagerPagePlayLinksIntro = 'Your room is ready. Play under these links:';
	var _pickled_plugins$lettero$Content$roomManagerPageTitle = 'Welcome to ${}';
	var _pickled_plugins$lettero$Content$roomCreatorFormValidationError = 'Lowercase letters only, please!';
	var _pickled_plugins$lettero$Content$roomCreatorPageSuccessButtonText = 'Go to your room!! ☞';
	var _pickled_plugins$lettero$Content$roomCreatorPageSuccessBody = 'Yes, indeed, ${} is all yours! And now:';
	var _pickled_plugins$lettero$Content$roomCreatorPageSuccessTitle = 'Success!';
	var _pickled_plugins$lettero$Content$roomCreatorPageErrorBody = 'Things go wrong from time to time.. anyways, care to try again?';
	var _pickled_plugins$lettero$Content$roomCreatorPageErrorTitle = 'Well that didn’t go so well..';
	var _pickled_plugins$lettero$Content$roomCreatorPageBody = 'Now that’s a very short time, if you care to lend us a hand: please use lowercase letters only.';
	var _pickled_plugins$lettero$Content$roomCreatorPageAddPlayerPrompt = 'Add player';
	var _pickled_plugins$lettero$Content$roomCreatorPageTitle = 'Create a room in a jiffy';
	var _pickled_plugins$lettero$Content$startPageCreateRoomPrompt = 'If you’ve got the hang of it, create a room. No login required.';
	var _pickled_plugins$lettero$Content$startPageTutorialPrompt = 'Shall we start with a 15-second tutorial?';
	var _pickled_plugins$lettero$Content$aboutPagePlayButtonText = 'Play ☞';
	var _pickled_plugins$lettero$Content$aboutPageBackButtonText = '☜ Back';
	var _pickled_plugins$lettero$Content$aboutPageContent = '\n## About Lettero\n\nOh, words. So complex and full of surprises. We can hardly make head or tail of them, right? Literally.\n\nLettero is a tiny game where players compete against each other decyphering words that are displayed in a less conformist fashion. In a circle. Looping around. Scattered all over.\n\nMade by [Peter](http://www.peterszerzo.com), kicked off with the generous coding time-support of [Airtame](https://airtame.com). Enjoy!\n';
	var _pickled_plugins$lettero$Content$notFoundPageBody = 'Uh, boy, looks like we sent you to the wrong place..';
	var _pickled_plugins$lettero$Content$notFoundPageTitle = 'Not found :/';
	var _pickled_plugins$lettero$Content$homePageAboutButtonText = 'About';
	var _pickled_plugins$lettero$Content$homePagePlayButtonText = 'Play';
	var _pickled_plugins$lettero$Content$homePageSubtitle = 'Playground for the social wordnerd';
	var _pickled_plugins$lettero$Content$homePageTitle = 'Lettero';
	
	var _pickled_plugins$lettero$Game_Ports$roomStateUpdate = _elm_lang$core$Native_Platform.incomingPort('roomStateUpdate', _elm_lang$core$Json_Decode$string);
	var _pickled_plugins$lettero$Game_Ports$sendGameCommand = _elm_lang$core$Native_Platform.outgoingPort(
		'sendGameCommand',
		function (v) {
			return v;
		});
	
	var _pickled_plugins$lettero$Models_GuessValue$decoder = _elm_lang$core$Json_Decode$int;
	var _pickled_plugins$lettero$Models_GuessValue$encoder = _elm_lang$core$Json_Encode$int;
	var _pickled_plugins$lettero$Models_GuessValue$correct = 0;
	var _pickled_plugins$lettero$Models_GuessValue$isCorrect = F2(
		function (x, y) {
			return _elm_lang$core$Native_Utils.eq(x, y);
		})(_pickled_plugins$lettero$Models_GuessValue$correct);
	var _pickled_plugins$lettero$Models_GuessValue$default = 0;
	
	var _pickled_plugins$lettero$Models_Guess$encoder = function (_p0) {
		var _p1 = _p0;
		var encodedValue = function () {
			var _p2 = _p1.status;
			switch (_p2.ctor) {
				case 'Pending':
					return _elm_lang$core$Json_Encode$string('pending');
				case 'Idle':
					return _elm_lang$core$Json_Encode$string('idle');
				default:
					return _pickled_plugins$lettero$Models_GuessValue$encoder(_p2._0);
			}
		}();
		return _elm_lang$core$Json_Encode$object(
			{
				ctor: '::',
				_0: {ctor: '_Tuple2', _0: 'status', _1: encodedValue},
				_1: {
					ctor: '::',
					_0: {
						ctor: '_Tuple2',
						_0: 'time',
						_1: _elm_lang$core$Json_Encode$float(_p1.time)
					},
					_1: {ctor: '[]'}
				}
			});
	};
	var _pickled_plugins$lettero$Models_Guess$encodeItem = function (guess) {
		return A2(
			_elm_lang$core$Json_Encode$encode,
			0,
			_pickled_plugins$lettero$Models_Guess$encoder(guess));
	};
	var _pickled_plugins$lettero$Models_Guess$toMaybe = function (guess) {
		var _p3 = guess.status;
		if (_p3.ctor === 'Made') {
			return _elm_lang$core$Maybe$Just(_p3._0);
		} else {
			return _elm_lang$core$Maybe$Nothing;
		}
	};
	var _pickled_plugins$lettero$Models_Guess$Guess = F2(
		function (a, b) {
			return {status: a, time: b};
		});
	var _pickled_plugins$lettero$Models_Guess$Made = function (a) {
		return {ctor: 'Made', _0: a};
	};
	var _pickled_plugins$lettero$Models_Guess$isCorrect = function (guess) {
		return _elm_lang$core$Native_Utils.eq(
			guess.status,
			_pickled_plugins$lettero$Models_Guess$Made(_pickled_plugins$lettero$Models_GuessValue$correct));
	};
	var _pickled_plugins$lettero$Models_Guess$Idle = {ctor: 'Idle'};
	var _pickled_plugins$lettero$Models_Guess$Pending = {ctor: 'Pending'};
	var _pickled_plugins$lettero$Models_Guess$getDummy = function (s) {
		return A2(_pickled_plugins$lettero$Models_Guess$Guess, _pickled_plugins$lettero$Models_Guess$Pending, 0);
	};
	var _pickled_plugins$lettero$Models_Guess$isPending = function (guess) {
		return _elm_lang$core$Native_Utils.eq(guess.status, _pickled_plugins$lettero$Models_Guess$Pending);
	};
	var _pickled_plugins$lettero$Models_Guess$isIncorrect = function (guess) {
		return (!_pickled_plugins$lettero$Models_Guess$isCorrect(guess)) && (!_pickled_plugins$lettero$Models_Guess$isPending(guess));
	};
	var _pickled_plugins$lettero$Models_Guess$statusDecoder = _elm_lang$core$Json_Decode$oneOf(
		{
			ctor: '::',
			_0: A2(
				_elm_lang$core$Json_Decode$andThen,
				function (i) {
					return _elm_lang$core$Json_Decode$succeed(
						_pickled_plugins$lettero$Models_Guess$Made(i));
				},
				_pickled_plugins$lettero$Models_GuessValue$decoder),
			_1: {
				ctor: '::',
				_0: A2(
					_elm_lang$core$Json_Decode$andThen,
					function (s) {
						return _elm_lang$core$Json_Decode$succeed(
							_elm_lang$core$Native_Utils.eq(s, 'pending') ? _pickled_plugins$lettero$Models_Guess$Pending : _pickled_plugins$lettero$Models_Guess$Idle);
					},
					_elm_lang$core$Json_Decode$string),
				_1: {ctor: '[]'}
			}
		});
	var _pickled_plugins$lettero$Models_Guess$decoder = A3(
		_elm_lang$core$Json_Decode$map2,
		_pickled_plugins$lettero$Models_Guess$Guess,
		A2(_elm_lang$core$Json_Decode$field, 'status', _pickled_plugins$lettero$Models_Guess$statusDecoder),
		A2(_elm_lang$core$Json_Decode$field, 'time', _elm_lang$core$Json_Decode$float));
	
	var _pickled_plugins$lettero$Models_Player$itemEncoder = function (_p0) {
		var _p1 = _p0;
		return _elm_lang$core$Json_Encode$object(
			{
				ctor: '::',
				_0: {
					ctor: '_Tuple2',
					_0: 'roomId',
					_1: _elm_lang$core$Json_Encode$string(_p1.roomId)
				},
				_1: {
					ctor: '::',
					_0: {
						ctor: '_Tuple2',
						_0: 'id',
						_1: _elm_lang$core$Json_Encode$string(_p1.id)
					},
					_1: {
						ctor: '::',
						_0: {
							ctor: '_Tuple2',
							_0: 'score',
							_1: _elm_lang$core$Json_Encode$int(_p1.score)
						},
						_1: {
							ctor: '::',
							_0: {
								ctor: '_Tuple2',
								_0: 'guess',
								_1: _pickled_plugins$lettero$Models_Guess$encoder(_p1.guess)
							},
							_1: {
								ctor: '::',
								_0: {
									ctor: '_Tuple2',
									_0: 'isReady',
									_1: _elm_lang$core$Json_Encode$bool(_p1.isReady)
								},
								_1: {ctor: '[]'}
							}
						}
					}
				}
			});
	};
	var _pickled_plugins$lettero$Models_Player$itemsEncoder = function (players) {
		return _elm_lang$core$Json_Encode$object(
			A2(
				_elm_lang$core$List$map,
				function (_p2) {
					var _p3 = _p2;
					return {
						ctor: '_Tuple2',
						_0: _p3._0,
						_1: _pickled_plugins$lettero$Models_Player$itemEncoder(_p3._1)
					};
				},
				_elm_lang$core$Dict$toList(players)));
	};
	var _pickled_plugins$lettero$Models_Player$encodeItems = function (_p4) {
		return A2(
			_elm_lang$core$Json_Encode$encode,
			0,
			_pickled_plugins$lettero$Models_Player$itemsEncoder(_p4));
	};
	var _pickled_plugins$lettero$Models_Player$encodeItem = function (_p5) {
		return A2(
			_elm_lang$core$Json_Encode$encode,
			0,
			_pickled_plugins$lettero$Models_Player$itemEncoder(_p5));
	};
	var _pickled_plugins$lettero$Models_Player$compareByGuessTime = F2(
		function (player1, player2) {
			var time2 = player2.guess.time;
			var time1 = player1.guess.time;
			return (_elm_lang$core$Native_Utils.cmp(time1 - time2, 0) < 0) ? _elm_lang$core$Basics$LT : (_elm_lang$core$Native_Utils.eq(time1, time2) ? _elm_lang$core$Basics$EQ : _elm_lang$core$Basics$GT);
		});
	var _pickled_plugins$lettero$Models_Player$hasIncorrectGuess = function (_p6) {
		return _pickled_plugins$lettero$Models_Guess$isIncorrect(
			function (_) {
				return _.guess;
			}(_p6));
	};
	var _pickled_plugins$lettero$Models_Player$isDraw = function (players) {
		return A2(
			_elm_lang$core$List$all,
			_elm_lang$core$Basics$identity,
			A2(
				_elm_lang$core$List$map,
				_pickled_plugins$lettero$Models_Player$hasIncorrectGuess,
				A2(
					_elm_lang$core$List$map,
					_elm_lang$core$Tuple$second,
					_elm_lang$core$Dict$toList(players))));
	};
	var _pickled_plugins$lettero$Models_Player$hasCorrectGuess = function (_p7) {
		return _pickled_plugins$lettero$Models_Guess$isCorrect(
			function (_) {
				return _.guess;
			}(_p7));
	};
	var _pickled_plugins$lettero$Models_Player$toList = function (_p8) {
		return A2(
			_elm_lang$core$List$map,
			_elm_lang$core$Tuple$second,
			_elm_lang$core$Dict$toList(_p8));
	};
	var _pickled_plugins$lettero$Models_Player$areAllReady = function (players) {
		return A2(
			_elm_lang$core$List$all,
			_elm_lang$core$Basics$identity,
			A2(
				_elm_lang$core$List$map,
				function (_) {
					return _.isReady;
				},
				_pickled_plugins$lettero$Models_Player$toList(players)));
	};
	var _pickled_plugins$lettero$Models_Player$getWinnerId = function (players) {
		return A2(
			_elm_lang$core$Maybe$map,
			function (_) {
				return _.id;
			},
			_elm_lang$core$List$head(
				A2(
					_elm_lang$core$List$sortWith,
					_pickled_plugins$lettero$Models_Player$compareByGuessTime,
					A2(
						_elm_lang$core$List$filter,
						_pickled_plugins$lettero$Models_Player$hasCorrectGuess,
						_pickled_plugins$lettero$Models_Player$toList(players)))));
	};
	var _pickled_plugins$lettero$Models_Player$didSomeoneWin = function (players) {
		return !_elm_lang$core$Native_Utils.eq(
			_pickled_plugins$lettero$Models_Player$getWinnerId(players),
			_elm_lang$core$Maybe$Nothing);
	};
	var _pickled_plugins$lettero$Models_Player$didAllGuess = function (players) {
		return !A2(
			_elm_lang$core$List$any,
			_elm_lang$core$Basics$identity,
			A2(
				_elm_lang$core$List$map,
				function (_p9) {
					return _pickled_plugins$lettero$Models_Guess$isPending(
						function (_) {
							return _.guess;
						}(_p9));
				},
				_pickled_plugins$lettero$Models_Player$toList(players)));
	};
	var _pickled_plugins$lettero$Models_Player$getDummy = function (id_) {
		return {
			id: id_,
			roomId: 'pears',
			score: 0,
			guess: _pickled_plugins$lettero$Models_Guess$getDummy(''),
			isReady: false
		};
	};
	var _pickled_plugins$lettero$Models_Player$unsafeFindById = F2(
		function (playerId, players) {
			return A2(
				_elm_lang$core$Maybe$withDefault,
				_pickled_plugins$lettero$Models_Player$getDummy(''),
				A2(_elm_lang$core$Dict$get, playerId, players));
		});
	var _pickled_plugins$lettero$Models_Player$update = F3(
		function (fn, playerId, players) {
			var player = A2(_pickled_plugins$lettero$Models_Player$unsafeFindById, playerId, players);
			return A3(
				_elm_lang$core$Dict$insert,
				playerId,
				fn(player),
				players);
		});
	var _pickled_plugins$lettero$Models_Player$Player = F5(
		function (a, b, c, d, e) {
			return {id: a, roomId: b, score: c, guess: d, isReady: e};
		});
	var _pickled_plugins$lettero$Models_Player$itemDecoder = A6(
		_elm_lang$core$Json_Decode$map5,
		_pickled_plugins$lettero$Models_Player$Player,
		A2(_elm_lang$core$Json_Decode$field, 'id', _elm_lang$core$Json_Decode$string),
		A2(_elm_lang$core$Json_Decode$field, 'roomId', _elm_lang$core$Json_Decode$string),
		A2(_elm_lang$core$Json_Decode$field, 'score', _elm_lang$core$Json_Decode$int),
		A2(_elm_lang$core$Json_Decode$field, 'guess', _pickled_plugins$lettero$Models_Guess$decoder),
		A2(_elm_lang$core$Json_Decode$field, 'isReady', _elm_lang$core$Json_Decode$bool));
	var _pickled_plugins$lettero$Models_Player$itemsDecoder = _elm_lang$core$Json_Decode$dict(_pickled_plugins$lettero$Models_Player$itemDecoder);
	
	var _pickled_plugins$lettero$Models_RoundData$itemEncoder = function (_p0) {
		var _p1 = _p0;
		return _elm_lang$core$Json_Encode$object(
			{
				ctor: '::',
				_0: {
					ctor: '_Tuple2',
					_0: 'word',
					_1: _elm_lang$core$Json_Encode$string(_p1.word)
				},
				_1: {ctor: '[]'}
			});
	};
	var _pickled_plugins$lettero$Models_RoundData$getDummy = function (s) {
		return {word: 'hedgehog'};
	};
	var _pickled_plugins$lettero$Models_RoundData$RoundData = function (a) {
		return {word: a};
	};
	var _pickled_plugins$lettero$Models_RoundData$itemDecoder = A2(
		_elm_lang$core$Json_Decode$map,
		_pickled_plugins$lettero$Models_RoundData$RoundData,
		A2(_elm_lang$core$Json_Decode$field, 'word', _elm_lang$core$Json_Decode$string));
	
	var _pickled_plugins$lettero$Models_Room$itemEncoder = function (_p0) {
		var _p1 = _p0;
		return _elm_lang$core$Json_Encode$object(
			{
				ctor: '::',
				_0: {
					ctor: '_Tuple2',
					_0: 'id',
					_1: _elm_lang$core$Json_Encode$string(_p1.id)
				},
				_1: {
					ctor: '::',
					_0: {
						ctor: '_Tuple2',
						_0: 'round',
						_1: _elm_lang$core$Json_Encode$int(_p1.round)
					},
					_1: {
						ctor: '::',
						_0: {
							ctor: '_Tuple2',
							_0: 'roundData',
							_1: _pickled_plugins$lettero$Models_RoundData$itemEncoder(_p1.roundData)
						},
						_1: {
							ctor: '::',
							_0: {
								ctor: '_Tuple2',
								_0: 'hostId',
								_1: _elm_lang$core$Json_Encode$string(_p1.hostId)
							},
							_1: {
								ctor: '::',
								_0: {
									ctor: '_Tuple2',
									_0: 'players',
									_1: _pickled_plugins$lettero$Models_Player$itemsEncoder(_p1.players)
								},
								_1: {ctor: '[]'}
							}
						}
					}
				}
			});
	};
	var _pickled_plugins$lettero$Models_Room$encodeItem = function (_p2) {
		return A2(
			_elm_lang$core$Json_Encode$encode,
			0,
			_pickled_plugins$lettero$Models_Room$itemEncoder(_p2));
	};
	var _pickled_plugins$lettero$Models_Room$setReady = F2(
		function (playerId, room) {
			return _elm_lang$core$Native_Utils.update(
				room,
				{
					players: A3(
						_pickled_plugins$lettero$Models_Player$update,
						function (p) {
							return _elm_lang$core$Native_Utils.update(
								p,
								{isReady: true});
						},
						playerId,
						room.players)
				});
		});
	var _pickled_plugins$lettero$Models_Room$setNewRound = function (room) {
		return _elm_lang$core$Native_Utils.update(
			room,
			{
				round: room.round + 1,
				players: A2(
					_elm_lang$core$Dict$map,
					F2(
						function (id, p) {
							return _elm_lang$core$Native_Utils.update(
								p,
								{
									guess: {time: 0, status: _pickled_plugins$lettero$Models_Guess$Pending}
								});
						}),
					room.players)
			});
	};
	var _pickled_plugins$lettero$Models_Room$isRoundOver = function (_p3) {
		var _p4 = _p3;
		var _p5 = _p4.players;
		return _pickled_plugins$lettero$Models_Player$didSomeoneWin(_p5) || _pickled_plugins$lettero$Models_Player$didAllGuess(_p5);
	};
	var _pickled_plugins$lettero$Models_Room$canGuess = F2(
		function (playerId, room) {
			var playerDidNotGuess = function (_p6) {
				return A2(
					F2(
						function (x, y) {
							return _elm_lang$core$Native_Utils.eq(x, y);
						}),
					_pickled_plugins$lettero$Models_Guess$Pending,
					function (_) {
						return _.status;
					}(
						function (_) {
							return _.guess;
						}(_p6)));
			}(
				A2(_pickled_plugins$lettero$Models_Player$unsafeFindById, playerId, room.players));
			return playerDidNotGuess && (!_pickled_plugins$lettero$Models_Room$isRoundOver(room));
		});
	var _pickled_plugins$lettero$Models_Room$getGuess = F2(
		function (playerId, room) {
			return function (_) {
				return _.guess;
			}(
				A2(_pickled_plugins$lettero$Models_Player$unsafeFindById, playerId, room.players));
		});
	var _pickled_plugins$lettero$Models_Room$setGuess = F3(
		function (guess, playerId, room) {
			var players = A3(
				_pickled_plugins$lettero$Models_Player$update,
				function (p) {
					return _elm_lang$core$Native_Utils.update(
						p,
						{guess: guess});
				},
				playerId,
				room.players);
			var newWinnerId = _pickled_plugins$lettero$Models_Player$getWinnerId(players);
			var previousWinnerId = _pickled_plugins$lettero$Models_Player$getWinnerId(room.players);
			return _elm_lang$core$Native_Utils.update(
				room,
				{
					players: (_elm_lang$core$Native_Utils.eq(previousWinnerId, _elm_lang$core$Maybe$Nothing) && _elm_lang$core$Native_Utils.eq(
						newWinnerId,
						_elm_lang$core$Maybe$Just(playerId))) ? A3(
						_pickled_plugins$lettero$Models_Player$update,
						function (p) {
							return _elm_lang$core$Native_Utils.update(
								p,
								{score: p.score + 1});
						},
						playerId,
						players) : players
				});
		});
	var _pickled_plugins$lettero$Models_Room$create = function (_p7) {
		var _p8 = _p7;
		var _p9 = _p8.playerIds;
		return {
			id: _p8.roomId,
			round: 0,
			roundData: _pickled_plugins$lettero$Models_RoundData$getDummy('s'),
			hostId: A2(
				_elm_lang$core$Maybe$withDefault,
				'',
				_elm_lang$core$List$head(_p9)),
			players: _elm_lang$core$Dict$fromList(
				A2(
					_elm_lang$core$List$map,
					function (id_) {
						return {
							ctor: '_Tuple2',
							_0: id_,
							_1: _pickled_plugins$lettero$Models_Player$getDummy(id_)
						};
					},
					_p9))
		};
	};
	var _pickled_plugins$lettero$Models_Room$getDummy = function (id_) {
		return _pickled_plugins$lettero$Models_Room$create(
			{
				roomId: id_,
				playerIds: {ctor: '[]'}
			});
	};
	var _pickled_plugins$lettero$Models_Room$RoomRaw = F2(
		function (a, b) {
			return {playerIds: a, roomId: b};
		});
	var _pickled_plugins$lettero$Models_Room$Room = F5(
		function (a, b, c, d, e) {
			return {id: a, round: b, roundData: c, hostId: d, players: e};
		});
	var _pickled_plugins$lettero$Models_Room$itemDecoder = A6(
		_elm_lang$core$Json_Decode$map5,
		_pickled_plugins$lettero$Models_Room$Room,
		A2(_elm_lang$core$Json_Decode$field, 'id', _elm_lang$core$Json_Decode$string),
		A2(_elm_lang$core$Json_Decode$field, 'round', _elm_lang$core$Json_Decode$int),
		A2(_elm_lang$core$Json_Decode$field, 'roundData', _pickled_plugins$lettero$Models_RoundData$itemDecoder),
		A2(_elm_lang$core$Json_Decode$field, 'hostId', _elm_lang$core$Json_Decode$string),
		A2(_elm_lang$core$Json_Decode$field, 'players', _pickled_plugins$lettero$Models_Player$itemsDecoder));
	
	var _pickled_plugins$lettero$Game_Messages$newPath = function (msg) {
		var _p0 = msg;
		if (_p0.ctor === 'Navigate') {
			return _elm_lang$core$Maybe$Just(_p0._0);
		} else {
			return _elm_lang$core$Maybe$Nothing;
		}
	};
	var _pickled_plugins$lettero$Game_Messages$Navigate = function (a) {
		return {ctor: 'Navigate', _0: a};
	};
	var _pickled_plugins$lettero$Game_Messages$LeaveRoom = function (a) {
		return {ctor: 'LeaveRoom', _0: a};
	};
	var _pickled_plugins$lettero$Game_Messages$SetReady = {ctor: 'SetReady'};
	var _pickled_plugins$lettero$Game_Messages$Tick = function (a) {
		return {ctor: 'Tick', _0: a};
	};
	var _pickled_plugins$lettero$Game_Messages$ReceiveRoundRandom = function (a) {
		return {ctor: 'ReceiveRoundRandom', _0: a};
	};
	var _pickled_plugins$lettero$Game_Messages$MakeGuess = function (a) {
		return {ctor: 'MakeGuess', _0: a};
	};
	var _pickled_plugins$lettero$Game_Messages$ReceiveRoomState = function (a) {
		return {ctor: 'ReceiveRoomState', _0: a};
	};
	
	var _pickled_plugins$lettero$Game_Models$isRoundJustOver = F2(
		function (oldModel, newModel) {
			return A2(
				F2(
					function (x, y) {
						return _elm_lang$core$Native_Utils.eq(x, y);
					}),
				_elm_lang$core$Maybe$Just(true),
				A3(
					_elm_lang$core$Maybe$map2,
					F2(
						function (oldRm, newRm) {
							return (!_pickled_plugins$lettero$Models_Room$isRoundOver(oldRm)) && _pickled_plugins$lettero$Models_Room$isRoundOver(newRm);
						}),
					oldModel.room,
					newModel.room));
		});
	var _pickled_plugins$lettero$Game_Models$getOwnGuess = function (model) {
		return A2(
			_elm_lang$core$Maybe$map,
			_pickled_plugins$lettero$Models_Room$getGuess(model.playerId),
			model.room);
	};
	var _pickled_plugins$lettero$Game_Models$setOwnGuess = F2(
		function (guessValue, model) {
			var guess = {
				status: _pickled_plugins$lettero$Models_Guess$Made(guessValue),
				time: model.currentRoundTime
			};
			return _elm_lang$core$Native_Utils.update(
				model,
				{
					room: A2(
						_elm_lang$core$Maybe$map,
						A2(_pickled_plugins$lettero$Models_Room$setGuess, guess, model.playerId),
						model.room)
				});
		});
	var _pickled_plugins$lettero$Game_Models$getDummy = function (s) {
		return {room: _elm_lang$core$Maybe$Nothing, roomId: s, playerId: '2', currentRoundRandom: 0, currentRoundTime: 0, error: _elm_lang$core$Maybe$Nothing};
	};
	var _pickled_plugins$lettero$Game_Models$init = F2(
		function (roomId, playerId) {
			var model = {room: _elm_lang$core$Maybe$Nothing, roomId: roomId, playerId: playerId, currentRoundRandom: 0, currentRoundTime: 0, error: _elm_lang$core$Maybe$Nothing};
			return A2(
				_elm_lang$core$Platform_Cmd_ops['!'],
				model,
				{
					ctor: '::',
					_0: _pickled_plugins$lettero$Game_Ports$sendGameCommand(
						A2(
							_elm_lang$core$Basics_ops['++'],
							'{\"type\": \"requestRoomState\"',
							A2(
								_elm_lang$core$Basics_ops['++'],
								', \"roomId\": \"',
								A2(
									_elm_lang$core$Basics_ops['++'],
									model.roomId,
									A2(_elm_lang$core$Basics_ops['++'], '\"', '}'))))),
					_1: {ctor: '[]'}
				});
		});
	var _pickled_plugins$lettero$Game_Models$Model = F6(
		function (a, b, c, d, e, f) {
			return {room: a, roomId: b, playerId: c, currentRoundRandom: d, currentRoundTime: e, error: f};
		});
	var _pickled_plugins$lettero$Game_Models$Other = {ctor: 'Other'};
	var _pickled_plugins$lettero$Game_Models$Network = {ctor: 'Network'};
	var _pickled_plugins$lettero$Game_Models$WrongPath = {ctor: 'WrongPath'};
	
	var _pickled_plugins$lettero$Game_Commands$requestRoundRandom = function (_p0) {
		return A2(
			_elm_lang$core$Random$generate,
			_pickled_plugins$lettero$Game_Messages$ReceiveRoundRandom,
			A2(_elm_lang$core$Random$int, 0, 1000));
	};
	var _pickled_plugins$lettero$Game_Commands$requestNewRound = function (room) {
		return _pickled_plugins$lettero$Game_Ports$sendGameCommand(
			A2(
				_elm_lang$core$Basics_ops['++'],
				'{\"type\": \"requestNewRound\"',
				A2(
					_elm_lang$core$Basics_ops['++'],
					', \"roomId\": \"',
					A2(
						_elm_lang$core$Basics_ops['++'],
						room.id,
						A2(
							_elm_lang$core$Basics_ops['++'],
							'\"',
							A2(
								_elm_lang$core$Basics_ops['++'],
								', \"payload\": ',
								A2(
									_elm_lang$core$Basics_ops['++'],
									_pickled_plugins$lettero$Models_Room$encodeItem(room),
									'}')))))));
	};
	var _pickled_plugins$lettero$Game_Commands$requestRoomState = function (model) {
		return _pickled_plugins$lettero$Game_Ports$sendGameCommand(
			A2(
				_elm_lang$core$Basics_ops['++'],
				'{\"type\": \"requestRoomState\"',
				A2(
					_elm_lang$core$Basics_ops['++'],
					', \"roomId\": \"',
					A2(
						_elm_lang$core$Basics_ops['++'],
						model.roomId,
						A2(_elm_lang$core$Basics_ops['++'], '\"', '}')))));
	};
	var _pickled_plugins$lettero$Game_Commands$sendPlayerStatusUpdate = function (model) {
		var encodedItem = A2(
			_elm_lang$core$Maybe$withDefault,
			'',
			A2(
				_elm_lang$core$Maybe$map,
				_pickled_plugins$lettero$Models_Player$encodeItem,
				A2(
					_elm_lang$core$Maybe$map,
					_pickled_plugins$lettero$Models_Player$unsafeFindById(model.playerId),
					A2(
						_elm_lang$core$Maybe$map,
						function (_) {
							return _.players;
						},
						model.room))));
		return _pickled_plugins$lettero$Game_Ports$sendGameCommand(
			A2(
				_elm_lang$core$Basics_ops['++'],
				'{\"type\": \"player\"',
				A2(
					_elm_lang$core$Basics_ops['++'],
					', \"roomId\": \"',
					A2(
						_elm_lang$core$Basics_ops['++'],
						model.roomId,
						A2(
							_elm_lang$core$Basics_ops['++'],
							'\", \"payload\": ',
							A2(_elm_lang$core$Basics_ops['++'], encodedItem, '}'))))));
	};
	
	var _pickled_plugins$lettero$Game_Constants$roundDuration = 5000 * _elm_lang$core$Time$millisecond;
	var _pickled_plugins$lettero$Game_Constants$coolDownDuration = 3000 * _elm_lang$core$Time$millisecond;
	var _pickled_plugins$lettero$Game_Constants$tickDuration = 100 * _elm_lang$core$Time$millisecond;
	
	var _pickled_plugins$lettero$Ports$closeTab = _elm_lang$core$Native_Platform.incomingPort('closeTab', _elm_lang$core$Json_Decode$string);
	var _pickled_plugins$lettero$Ports$createRoomRequest = _elm_lang$core$Native_Platform.outgoingPort(
		'createRoomRequest',
		function (v) {
			return v;
		});
	var _pickled_plugins$lettero$Ports$createRoomResponse = _elm_lang$core$Native_Platform.incomingPort('createRoomResponse', _elm_lang$core$Json_Decode$string);
	var _pickled_plugins$lettero$Ports$roomRequest = _elm_lang$core$Native_Platform.outgoingPort(
		'roomRequest',
		function (v) {
			return v;
		});
	var _pickled_plugins$lettero$Ports$roomResponse = _elm_lang$core$Native_Platform.incomingPort('roomResponse', _elm_lang$core$Json_Decode$string);
	
	var _pickled_plugins$lettero$Game_Subscriptions$subscriptions = function (model) {
		var isTicking = A2(
			_elm_lang$core$Maybe$withDefault,
			false,
			A2(
				_elm_lang$core$Maybe$map,
				_elm_lang$core$List$all(_elm_lang$core$Basics$identity),
				A2(
					_elm_lang$core$Maybe$map,
					_elm_lang$core$List$map(
						function (_) {
							return _.isReady;
						}),
					A2(
						_elm_lang$core$Maybe$map,
						function (_p0) {
							return _pickled_plugins$lettero$Models_Player$toList(
								function (_) {
									return _.players;
								}(_p0));
						},
						model.room))));
		return _elm_lang$core$Platform_Sub$batch(
			{
				ctor: '::',
				_0: _pickled_plugins$lettero$Game_Ports$roomStateUpdate(_pickled_plugins$lettero$Game_Messages$ReceiveRoomState),
				_1: {
					ctor: '::',
					_0: _pickled_plugins$lettero$Ports$closeTab(_pickled_plugins$lettero$Game_Messages$LeaveRoom),
					_1: {
						ctor: '::',
						_0: isTicking ? A2(_elm_lang$core$Time$every, _pickled_plugins$lettero$Game_Constants$tickDuration, _pickled_plugins$lettero$Game_Messages$Tick) : _elm_lang$core$Platform_Sub$none,
						_1: {ctor: '[]'}
					}
				}
			});
	};
	
	var _pickled_plugins$lettero$Game_Update$augmentCommand = F3(
		function (model, newModel, cmd) {
			var shouldCloseRound = A2(_pickled_plugins$lettero$Game_Models$isRoundJustOver, model, newModel) && _elm_lang$core$Native_Utils.eq(
				_elm_lang$core$Maybe$Just(model.playerId),
				A2(
					_elm_lang$core$Maybe$map,
					function (_) {
						return _.hostId;
					},
					model.room));
			return _elm_lang$core$Platform_Cmd$batch(
				{
					ctor: '::',
					_0: cmd,
					_1: {
						ctor: '::',
						_0: shouldCloseRound ? _pickled_plugins$lettero$Game_Commands$requestNewRound(
							A2(
								_elm_lang$core$Maybe$withDefault,
								_pickled_plugins$lettero$Models_Room$getDummy(''),
								A2(_elm_lang$core$Maybe$map, _pickled_plugins$lettero$Models_Room$setNewRound, newModel.room))) : _elm_lang$core$Platform_Cmd$none,
						_1: {ctor: '[]'}
					}
				});
		});
	var _pickled_plugins$lettero$Game_Update$update = F2(
		function (msg, model) {
			var _p0 = msg;
			switch (_p0.ctor) {
				case 'ReceiveRoomState':
					var newRoom = _elm_lang$core$Result$toMaybe(
						A2(_elm_lang$core$Json_Decode$decodeString, _pickled_plugins$lettero$Models_Room$itemDecoder, _p0._0));
					var didRoundChange = !_elm_lang$core$Native_Utils.eq(
						A2(
							_elm_lang$core$Maybe$map,
							function (_) {
								return _.round;
							},
							model.room),
						A2(
							_elm_lang$core$Maybe$map,
							function (_) {
								return _.round;
							},
							newRoom));
					var newTime = didRoundChange ? 0 : model.currentRoundTime;
					var cmd = (didRoundChange || _elm_lang$core$Native_Utils.eq(model.room, _elm_lang$core$Maybe$Nothing)) ? _pickled_plugins$lettero$Game_Commands$requestRoundRandom(
						{ctor: '_Tuple0'}) : _elm_lang$core$Platform_Cmd$none;
					var newModel = _elm_lang$core$Native_Utils.update(
						model,
						{
							room: newRoom,
							error: _elm_lang$core$Native_Utils.eq(newRoom, _elm_lang$core$Maybe$Nothing) ? _elm_lang$core$Maybe$Just(_pickled_plugins$lettero$Game_Models$WrongPath) : _elm_lang$core$Maybe$Nothing,
							currentRoundTime: newTime
						});
					var cmd_ = A3(_pickled_plugins$lettero$Game_Update$augmentCommand, model, newModel, cmd);
					return A2(
						_elm_lang$core$Platform_Cmd_ops['!'],
						newModel,
						{
							ctor: '::',
							_0: cmd_,
							_1: {ctor: '[]'}
						});
				case 'ReceiveRoundRandom':
					return A2(
						_elm_lang$core$Platform_Cmd_ops['!'],
						_elm_lang$core$Native_Utils.update(
							model,
							{currentRoundRandom: _p0._0}),
						{
							ctor: '::',
							_0: _elm_lang$core$Platform_Cmd$none,
							_1: {ctor: '[]'}
						});
				case 'MakeGuess':
					var canMakeGuess = A2(
						_elm_lang$core$Maybe$withDefault,
						false,
						A2(
							_elm_lang$core$Maybe$map,
							_pickled_plugins$lettero$Models_Room$canGuess(model.playerId),
							model.room));
					var newModel = canMakeGuess ? A2(_pickled_plugins$lettero$Game_Models$setOwnGuess, _p0._0, model) : model;
					var cmd = A3(
						_pickled_plugins$lettero$Game_Update$augmentCommand,
						model,
						newModel,
						canMakeGuess ? _pickled_plugins$lettero$Game_Commands$sendPlayerStatusUpdate(newModel) : _elm_lang$core$Platform_Cmd$none);
					return A2(
						_elm_lang$core$Platform_Cmd_ops['!'],
						newModel,
						{
							ctor: '::',
							_0: cmd,
							_1: {ctor: '[]'}
						});
				case 'Tick':
					var isPlayerGuessPending = A2(
						F2(
							function (x, y) {
								return _elm_lang$core$Native_Utils.eq(x, y);
							}),
						_elm_lang$core$Maybe$Just(_pickled_plugins$lettero$Models_Guess$Pending),
						A2(
							_elm_lang$core$Maybe$map,
							function (_) {
								return _.status;
							},
							_pickled_plugins$lettero$Game_Models$getOwnGuess(model)));
					var newRoundTime = model.currentRoundTime + _pickled_plugins$lettero$Game_Constants$tickDuration;
					var didRoundTimeJustRunOut = (_elm_lang$core$Native_Utils.cmp(newRoundTime, _pickled_plugins$lettero$Game_Constants$roundDuration) > -1) && (_elm_lang$core$Native_Utils.cmp(model.currentRoundTime, _pickled_plugins$lettero$Game_Constants$roundDuration) < 0);
					var _p1 = (didRoundTimeJustRunOut && isPlayerGuessPending) ? {
						ctor: '_Tuple2',
						_0: A2(
							_elm_lang$core$Maybe$map,
							A2(
								_pickled_plugins$lettero$Models_Room$setGuess,
								{time: newRoundTime, status: _pickled_plugins$lettero$Models_Guess$Idle},
								model.playerId),
							model.room),
						_1: true
					} : {ctor: '_Tuple2', _0: model.room, _1: false};
					var newRoom = _p1._0;
					var shouldSendStatusUpdate = _p1._1;
					var newModel = _elm_lang$core$Native_Utils.update(
						model,
						{currentRoundTime: newRoundTime, room: newRoom});
					var cmd = A3(
						_pickled_plugins$lettero$Game_Update$augmentCommand,
						model,
						newModel,
						shouldSendStatusUpdate ? _pickled_plugins$lettero$Game_Commands$sendPlayerStatusUpdate(newModel) : _elm_lang$core$Platform_Cmd$none);
					return A2(
						_elm_lang$core$Platform_Cmd_ops['!'],
						newModel,
						{
							ctor: '::',
							_0: cmd,
							_1: {ctor: '[]'}
						});
				case 'SetReady':
					var newRoom = A2(
						_elm_lang$core$Maybe$map,
						_pickled_plugins$lettero$Models_Room$setReady(model.playerId),
						model.room);
					var newModel = _elm_lang$core$Native_Utils.update(
						model,
						{room: newRoom, currentRoundTime: 0});
					var command = _pickled_plugins$lettero$Game_Commands$sendPlayerStatusUpdate(newModel);
					return A2(
						_elm_lang$core$Platform_Cmd_ops['!'],
						newModel,
						{
							ctor: '::',
							_0: command,
							_1: {ctor: '[]'}
						});
				case 'LeaveRoom':
					var newRoom = A2(
						_elm_lang$core$Maybe$withDefault,
						model.room,
						A2(
							_elm_lang$core$Maybe$map,
							function (r) {
								return _elm_lang$core$Maybe$Just(
									_elm_lang$core$Native_Utils.update(
										r,
										{
											players: A3(
												_pickled_plugins$lettero$Models_Player$update,
												function (p) {
													return _elm_lang$core$Native_Utils.update(
														p,
														{isReady: false});
												},
												model.playerId,
												r.players)
										}));
							},
							model.room));
					var newModel = _elm_lang$core$Native_Utils.update(
						model,
						{room: newRoom});
					var command = _pickled_plugins$lettero$Game_Commands$sendPlayerStatusUpdate(newModel);
					return A2(
						_elm_lang$core$Platform_Cmd_ops['!'],
						newModel,
						{
							ctor: '::',
							_0: command,
							_1: {ctor: '[]'}
						});
				default:
					return A2(
						_elm_lang$core$Platform_Cmd_ops['!'],
						model,
						{ctor: '[]'});
			}
		});
	
	var _pickled_plugins$lettero$Utilities$isAllLowercaseLetter = function (_p0) {
		return A2(
			F2(
				function (x, y) {
					return _elm_lang$core$Native_Utils.eq(x, y);
				}),
			1,
			_elm_lang$core$List$length(
				A3(
					_elm_lang$core$Regex$find,
					_elm_lang$core$Regex$All,
					_elm_lang$core$Regex$regex('^[a-z]*$'),
					_p0)));
	};
	var _pickled_plugins$lettero$Utilities$textTemplate = F2(
		function (template, value) {
			return A4(
				_elm_lang$core$Regex$replace,
				_elm_lang$core$Regex$All,
				_elm_lang$core$Regex$regex(
					_elm_lang$core$Regex$escape('${}')),
				_elm_lang$core$Basics$always(value),
				template);
		});
	
	var _pickled_plugins$lettero$UiKit_Spinner$view = A2(
		_elm_lang$html$Html$div,
		{
			ctor: '::',
			_0: _elm_lang$html$Html_Attributes$class('spinner'),
			_1: {ctor: '[]'}
		},
		{
			ctor: '::',
			_0: A2(
				_elm_lang$svg$Svg$svg,
				{
					ctor: '::',
					_0: _elm_lang$svg$Svg_Attributes$width('50'),
					_1: {
						ctor: '::',
						_0: _elm_lang$svg$Svg_Attributes$height('50'),
						_1: {
							ctor: '::',
							_0: _elm_lang$svg$Svg_Attributes$viewBox('0 0 50 50'),
							_1: {ctor: '[]'}
						}
					}
				},
				{
					ctor: '::',
					_0: A2(
						_elm_lang$svg$Svg$g,
						{
							ctor: '::',
							_0: _elm_lang$svg$Svg_Attributes$transform('translate(25, 25)'),
							_1: {ctor: '[]'}
						},
						{
							ctor: '::',
							_0: A2(
								_elm_lang$svg$Svg$circle,
								{
									ctor: '::',
									_0: _elm_lang$svg$Svg_Attributes$cx('0'),
									_1: {
										ctor: '::',
										_0: _elm_lang$svg$Svg_Attributes$cy('15'),
										_1: {
											ctor: '::',
											_0: _elm_lang$svg$Svg_Attributes$r('3'),
											_1: {ctor: '[]'}
										}
									}
								},
								{ctor: '[]'}),
							_1: {
								ctor: '::',
								_0: A2(
									_elm_lang$svg$Svg$circle,
									{
										ctor: '::',
										_0: _elm_lang$svg$Svg_Attributes$cx('0'),
										_1: {
											ctor: '::',
											_0: _elm_lang$svg$Svg_Attributes$cy('-15'),
											_1: {
												ctor: '::',
												_0: _elm_lang$svg$Svg_Attributes$r('3'),
												_1: {ctor: '[]'}
											}
										}
									},
									{ctor: '[]'}),
								_1: {ctor: '[]'}
							}
						}),
					_1: {ctor: '[]'}
				}),
			_1: {ctor: '[]'}
		});
	
	var _pickled_plugins$lettero$UiKit_TickTockTickTock$view = function (timeRatioLeft) {
		return A2(
			_elm_lang$html$Html$div,
			{
				ctor: '::',
				_0: _elm_lang$html$Html_Attributes$class('ticktockticktock'),
				_1: {ctor: '[]'}
			},
			{
				ctor: '::',
				_0: A2(
					_elm_lang$html$Html$div,
					{
						ctor: '::',
						_0: _elm_lang$html$Html_Attributes$class('ticktockticktock__content'),
						_1: {
							ctor: '::',
							_0: _elm_lang$html$Html_Attributes$style(
								{
									ctor: '::',
									_0: {
										ctor: '_Tuple2',
										_0: 'width',
										_1: function (s) {
											return A2(_elm_lang$core$Basics_ops['++'], s, '%');
										}(
											_elm_lang$core$Basics$toString(timeRatioLeft * 100))
									},
									_1: {ctor: '[]'}
								}),
							_1: {ctor: '[]'}
						}
					},
					{ctor: '[]'}),
				_1: {ctor: '[]'}
			});
	};
	
	var _pickled_plugins$lettero$UiKit_Notification$view = F3(
		function (content, isActive, isHighlighted) {
			return A2(
				_elm_lang$html$Html$div,
				{
					ctor: '::',
					_0: _elm_lang$html$Html_Attributes$classList(
						{
							ctor: '::',
							_0: {ctor: '_Tuple2', _0: 'notification', _1: true},
							_1: {
								ctor: '::',
								_0: {ctor: '_Tuple2', _0: 'notification--active', _1: isActive},
								_1: {
									ctor: '::',
									_0: {ctor: '_Tuple2', _0: 'notification--highlighted', _1: isHighlighted},
									_1: {ctor: '[]'}
								}
							}
						}),
					_1: {ctor: '[]'}
				},
				{
					ctor: '::',
					_0: A2(
						_elm_lang$html$Html$p,
						{ctor: '[]'},
						{
							ctor: '::',
							_0: _elm_lang$html$Html$text(content),
							_1: {ctor: '[]'}
						}),
					_1: {ctor: '[]'}
				});
		});
	
	var _pickled_plugins$lettero$UiKit_ScoreBoard$viewItem = function (_p0) {
		var _p1 = _p0;
		return A2(
			_elm_lang$html$Html$p,
			{
				ctor: '::',
				_0: _elm_lang$html$Html_Attributes$class('score-board__item'),
				_1: {ctor: '[]'}
			},
			{
				ctor: '::',
				_0: A2(
					_elm_lang$html$Html$span,
					{
						ctor: '::',
						_0: _elm_lang$html$Html_Attributes$class('score-board__player'),
						_1: {ctor: '[]'}
					},
					{
						ctor: '::',
						_0: _elm_lang$html$Html$text(_p1._0),
						_1: {ctor: '[]'}
					}),
				_1: {
					ctor: '::',
					_0: A2(
						_elm_lang$html$Html$span,
						{
							ctor: '::',
							_0: _elm_lang$html$Html_Attributes$class('score-board__score'),
							_1: {ctor: '[]'}
						},
						{
							ctor: '::',
							_0: _elm_lang$html$Html$text(
								_elm_lang$core$Basics$toString(_p1._1)),
							_1: {ctor: '[]'}
						}),
					_1: {
						ctor: '::',
						_0: A2(
							_elm_lang$html$Html$span,
							{
								ctor: '::',
								_0: _elm_lang$html$Html_Attributes$class('score-board__mark'),
								_1: {ctor: '[]'}
							},
							{
								ctor: '::',
								_0: _elm_lang$html$Html$text(
									_p1._2 ? '♛' : ''),
								_1: {ctor: '[]'}
							}),
						_1: {ctor: '[]'}
					}
				}
			});
	};
	var _pickled_plugins$lettero$UiKit_ScoreBoard$view = function (items) {
		return A2(
			_elm_lang$html$Html$div,
			{
				ctor: '::',
				_0: _elm_lang$html$Html_Attributes$class('score-board'),
				_1: {ctor: '[]'}
			},
			{
				ctor: '::',
				_0: A2(
					_elm_lang$html$Html$div,
					{
						ctor: '::',
						_0: _elm_lang$html$Html_Attributes$class('score-board__items'),
						_1: {ctor: '[]'}
					},
					A2(_elm_lang$core$List$map, _pickled_plugins$lettero$UiKit_ScoreBoard$viewItem, items)),
				_1: {ctor: '[]'}
			});
	};
	
	var _pickled_plugins$lettero$UiKit_Word$letterStyle = F3(
		function (left, top, angle) {
			var rotateVal = _elm_lang$core$Basics$toString(
				A2(
					F2(
						function (x, y) {
							return x * y;
						}),
					180 / _elm_lang$core$Basics$pi,
					angle));
			var topVal = _elm_lang$core$Basics$toString(
				A2(
					F2(
						function (x, y) {
							return x * y;
						}),
					100,
					top));
			var leftVal = _elm_lang$core$Basics$toString(
				A2(
					F2(
						function (x, y) {
							return x * y;
						}),
					100,
					left));
			return {
				ctor: '::',
				_0: {
					ctor: '_Tuple2',
					_0: 'top',
					_1: A2(_elm_lang$core$Basics_ops['++'], topVal, '%')
				},
				_1: {
					ctor: '::',
					_0: {
						ctor: '_Tuple2',
						_0: 'left',
						_1: A2(_elm_lang$core$Basics_ops['++'], leftVal, '%')
					},
					_1: {
						ctor: '::',
						_0: {
							ctor: '_Tuple2',
							_0: 'transform',
							_1: A2(
								_elm_lang$core$Basics_ops['++'],
								'translate3d(-50%, -50%, 0) rotate(',
								A2(_elm_lang$core$Basics_ops['++'], rotateVal, 'deg)'))
						},
						_1: {ctor: '[]'}
					}
				}
			};
		});
	var _pickled_plugins$lettero$UiKit_Word$viewLetter = F6(
		function (startAngle, highlights, onLetterClick, len, index, letter) {
			var highlightClassListItem = A2(
				_elm_lang$core$Maybe$withDefault,
				{ctor: '_Tuple2', _0: '', _1: false},
				A2(
					_elm_lang$core$Maybe$map,
					function (s) {
						return {
							ctor: '_Tuple2',
							_0: A2(_elm_lang$core$Basics_ops['++'], 'word__letter--', s),
							_1: true
						};
					},
					A2(_elm_lang$core$Dict$get, index, highlights)));
			var angle = startAngle + (((2 * _elm_lang$core$Basics$pi) * _elm_lang$core$Basics$toFloat(index)) / _elm_lang$core$Basics$toFloat(len));
			var top = A2(
				F2(
					function (x, y) {
						return x + y;
					}),
				0.5,
				A2(
					F2(
						function (x, y) {
							return x * y;
						}),
					0.4,
					_elm_lang$core$Basics$sin(angle)));
			var left = A2(
				F2(
					function (x, y) {
						return x + y;
					}),
				0.5,
				A2(
					F2(
						function (x, y) {
							return x * y;
						}),
					0.4,
					_elm_lang$core$Basics$cos(angle)));
			var rotate = angle + (_elm_lang$core$Basics$pi / 2);
			return A2(
				_elm_lang$html$Html$p,
				{
					ctor: '::',
					_0: _elm_lang$html$Html_Attributes$classList(
						{
							ctor: '::',
							_0: {ctor: '_Tuple2', _0: 'word__letter', _1: true},
							_1: {
								ctor: '::',
								_0: highlightClassListItem,
								_1: {ctor: '[]'}
							}
						}),
					_1: {
						ctor: '::',
						_0: _elm_lang$html$Html_Events$onClick(
							onLetterClick(index)),
						_1: {
							ctor: '::',
							_0: _elm_lang$html$Html_Attributes$style(
								A3(_pickled_plugins$lettero$UiKit_Word$letterStyle, left, top, rotate)),
							_1: {ctor: '[]'}
						}
					}
				},
				{
					ctor: '::',
					_0: _elm_lang$html$Html$text(letter),
					_1: {ctor: '[]'}
				});
		});
	var _pickled_plugins$lettero$UiKit_Word$view = function (_p0) {
		var _p1 = _p0;
		var letters = A2(_elm_lang$core$String$split, '', _p1.word);
		return A2(
			_elm_lang$html$Html$div,
			{
				ctor: '::',
				_0: _elm_lang$html$Html_Attributes$classList(
					{
						ctor: '::',
						_0: {ctor: '_Tuple2', _0: 'word', _1: true},
						_1: {
							ctor: '::',
							_0: {ctor: '_Tuple2', _0: 'word--disabled', _1: _p1.isDisabled},
							_1: {ctor: '[]'}
						}
					}),
				_1: {ctor: '[]'}
			},
			A2(
				_elm_lang$core$List$indexedMap,
				A4(
					_pickled_plugins$lettero$UiKit_Word$viewLetter,
					_p1.startAngle,
					_p1.highlights,
					_p1.onGuess,
					_elm_lang$core$List$length(letters)),
				letters));
	};
	var _pickled_plugins$lettero$UiKit_Word$Options = F5(
		function (a, b, c, d, e) {
			return {word: a, onGuess: b, isDisabled: c, startAngle: d, highlights: e};
		});
	
	var _pickled_plugins$lettero$Game_Views$viewWord = F2(
		function (model, room) {
			var isRoundOver = _pickled_plugins$lettero$Models_Room$isRoundOver(room);
			var startAngle = ((_elm_lang$core$Basics$toFloat(model.currentRoundRandom) / 1000) * 2) * _elm_lang$core$Basics$pi;
			var guessIndex = A2(
				_elm_lang$core$Maybe$withDefault,
				_elm_lang$core$Maybe$Just(0),
				A2(
					_elm_lang$core$Maybe$map,
					_pickled_plugins$lettero$Models_Guess$toMaybe,
					_pickled_plugins$lettero$Game_Models$getOwnGuess(model)));
			var highlights = A2(
				_elm_lang$core$Maybe$withDefault,
				_elm_lang$core$Dict$empty,
				A2(
					_elm_lang$core$Maybe$map,
					_elm_lang$core$Dict$fromList,
					A2(
						_elm_lang$core$Maybe$map,
						F2(
							function (x, y) {
								return A2(_elm_lang$core$Basics_ops['++'], x, y);
							})(
							isRoundOver ? {
								ctor: '::',
								_0: {ctor: '_Tuple2', _0: 0, _1: 'marked'},
								_1: {ctor: '[]'}
							} : {ctor: '[]'}),
						A2(
							_elm_lang$core$Maybe$map,
							function (i) {
								return {
									ctor: '::',
									_0: {ctor: '_Tuple2', _0: i, _1: 'highlighted'},
									_1: {ctor: '[]'}
								};
							},
							guessIndex))));
			return A2(
				_elm_lang$html$Html_Lazy$lazy,
				_pickled_plugins$lettero$UiKit_Word$view,
				{word: room.roundData.word, startAngle: startAngle, highlights: highlights, isDisabled: isRoundOver, onGuess: _pickled_plugins$lettero$Game_Messages$MakeGuess});
		});
	var _pickled_plugins$lettero$Game_Views$viewReadyScreenPlayer = F2(
		function (playerId, player) {
			var content = A2(
				_elm_lang$core$Basics_ops['++'],
				player.id,
				A2(
					_elm_lang$core$Basics_ops['++'],
					' ',
					player.isReady ? '✓' : '...'));
			var eventAttributes = _elm_lang$core$Native_Utils.eq(player.id, playerId) ? {
				ctor: '::',
				_0: _elm_lang$html$Html_Events$onClick(_pickled_plugins$lettero$Game_Messages$SetReady),
				_1: {ctor: '[]'}
			} : {ctor: '[]'};
			var classAttributes = {
				ctor: '::',
				_0: _elm_lang$html$Html_Attributes$classList(
					{
						ctor: '::',
						_0: {ctor: '_Tuple2', _0: 'button', _1: true},
						_1: {
							ctor: '::',
							_0: {
								ctor: '_Tuple2',
								_0: 'button--disabled',
								_1: !_elm_lang$core$Native_Utils.eq(player.id, playerId)
							},
							_1: {ctor: '[]'}
						}
					}),
				_1: {
					ctor: '::',
					_0: _elm_lang$html$Html_Attributes$disabled(
						!_elm_lang$core$Native_Utils.eq(player.id, playerId)),
					_1: {ctor: '[]'}
				}
			};
			return A2(
				_elm_lang$html$Html$button,
				A2(_elm_lang$core$Basics_ops['++'], classAttributes, eventAttributes),
				{
					ctor: '::',
					_0: _elm_lang$html$Html$text(content),
					_1: {ctor: '[]'}
				});
		});
	var _pickled_plugins$lettero$Game_Views$viewReadyScreen = F2(
		function (players, playerId) {
			return A2(
				_elm_lang$html$Html$div,
				{
					ctor: '::',
					_0: _elm_lang$html$Html_Attributes$class('basic-content'),
					_1: {ctor: '[]'}
				},
				{
					ctor: '::',
					_0: A2(
						_elm_lang$html$Html$h2,
						{ctor: '[]'},
						{
							ctor: '::',
							_0: _elm_lang$html$Html$text(_pickled_plugins$lettero$Content$gameReadyScreenTitle),
							_1: {ctor: '[]'}
						}),
					_1: {
						ctor: '::',
						_0: A2(
							_elm_lang$html$Html$p,
							{ctor: '[]'},
							{
								ctor: '::',
								_0: _elm_lang$html$Html$text(_pickled_plugins$lettero$Content$gameReadyScreenBody),
								_1: {ctor: '[]'}
							}),
						_1: {
							ctor: '::',
							_0: A2(
								_elm_lang$html$Html$div,
								{ctor: '[]'},
								A2(
									_elm_lang$core$List$map,
									_pickled_plugins$lettero$Game_Views$viewReadyScreenPlayer(playerId),
									_pickled_plugins$lettero$Models_Player$toList(players))),
							_1: {ctor: '[]'}
						}
					}
				});
		});
	var _pickled_plugins$lettero$Game_Views$viewScoreBoard = F2(
		function (playerId, players) {
			var playersList = _pickled_plugins$lettero$Models_Player$toList(players);
			var scores = A2(
				_elm_lang$core$List$map,
				function (_) {
					return _.score;
				},
				playersList);
			var maxScore = A2(
				_elm_lang$core$Maybe$withDefault,
				0,
				_elm_lang$core$List$maximum(scores));
			var maxCount = A3(
				_elm_lang$core$List$foldl,
				F2(
					function (a, i) {
						return _elm_lang$core$Native_Utils.eq(a, maxScore) ? (i + 1) : i;
					}),
				0,
				scores);
			var viewData = A2(
				_elm_lang$core$List$map,
				function (p) {
					return {
						ctor: '_Tuple3',
						_0: p.id,
						_1: p.score,
						_2: (_elm_lang$core$Native_Utils.cmp(maxCount, 2) < 0) ? _elm_lang$core$Native_Utils.eq(p.score, maxScore) : false
					};
				},
				playersList);
			return _pickled_plugins$lettero$UiKit_ScoreBoard$view(viewData);
		});
	var _pickled_plugins$lettero$Game_Views$getNotificationContent = F2(
		function (winner, self) {
			return _elm_lang$core$Native_Utils.eq(winner, self) ? A2(_pickled_plugins$lettero$Utilities$textTemplate, _pickled_plugins$lettero$Content$gameRoundWinNotification, winner) : A2(_pickled_plugins$lettero$Utilities$textTemplate, _pickled_plugins$lettero$Content$gameRoundLoseNotification, winner);
		});
	var _pickled_plugins$lettero$Game_Views$viewNotification = F2(
		function (model, room) {
			var ownGuess = _pickled_plugins$lettero$Game_Models$getOwnGuess(model);
			var _p0 = _pickled_plugins$lettero$Models_Player$isDraw(room.players) ? {ctor: '_Tuple2', _0: true, _1: _pickled_plugins$lettero$Content$gameTieNotification} : ((!_elm_lang$core$Native_Utils.eq(
				_pickled_plugins$lettero$Models_Player$getWinnerId(room.players),
				_elm_lang$core$Maybe$Nothing)) ? A2(
				_elm_lang$core$Maybe$withDefault,
				{ctor: '_Tuple2', _0: false, _1: ''},
				A2(
					_elm_lang$core$Maybe$map,
					function (id) {
						return {
							ctor: '_Tuple2',
							_0: true,
							_1: A2(_pickled_plugins$lettero$Game_Views$getNotificationContent, id, model.playerId)
						};
					},
					_pickled_plugins$lettero$Models_Player$getWinnerId(room.players))) : (A2(
				F2(
					function (x, y) {
						return _elm_lang$core$Native_Utils.eq(x, y);
					}),
				_elm_lang$core$Maybe$Just(_pickled_plugins$lettero$Models_Guess$Idle),
				A2(
					_elm_lang$core$Maybe$map,
					function (_) {
						return _.status;
					},
					ownGuess)) ? {ctor: '_Tuple2', _0: true, _1: _pickled_plugins$lettero$Content$gameIdleNotification} : (A2(
				F2(
					function (x, y) {
						return _elm_lang$core$Native_Utils.eq(x, y);
					}),
				_elm_lang$core$Maybe$Just(true),
				A2(_elm_lang$core$Maybe$map, _pickled_plugins$lettero$Models_Guess$isIncorrect, ownGuess)) ? {ctor: '_Tuple2', _0: true, _1: _pickled_plugins$lettero$Content$gameIncorrectGuessNotification} : {ctor: '_Tuple2', _0: false, _1: ''})));
			var isActive = _p0._0;
			var content = _p0._1;
			return A3(_pickled_plugins$lettero$UiKit_Notification$view, content, isActive, false);
		});
	var _pickled_plugins$lettero$Game_Views$viewError = function (error) {
		return {
			ctor: '::',
			_0: A2(
				_elm_lang$html$Html$div,
				{
					ctor: '::',
					_0: _elm_lang$html$Html_Attributes$class('basic-content'),
					_1: {ctor: '[]'}
				},
				{
					ctor: '::',
					_0: A2(
						_elm_lang$html$Html$h2,
						{ctor: '[]'},
						{
							ctor: '::',
							_0: _elm_lang$html$Html$text(_pickled_plugins$lettero$Content$defaultErrorMessage),
							_1: {ctor: '[]'}
						}),
					_1: {ctor: '[]'}
				}),
			_1: {ctor: '[]'}
		};
	};
	var _pickled_plugins$lettero$Game_Views$viewGame = F2(
		function (model, room) {
			var timeRatioLeft = _pickled_plugins$lettero$Models_Room$isRoundOver(room) ? 0 : A3(_elm_lang$core$Basics$clamp, 0, 1, 1 - (model.currentRoundTime / _pickled_plugins$lettero$Game_Constants$roundDuration));
			return _pickled_plugins$lettero$Models_Player$areAllReady(room.players) ? {
				ctor: '::',
				_0: A2(_pickled_plugins$lettero$Game_Views$viewWord, model, room),
				_1: {
					ctor: '::',
					_0: A2(_pickled_plugins$lettero$Game_Views$viewScoreBoard, model.playerId, room.players),
					_1: {
						ctor: '::',
						_0: A2(_pickled_plugins$lettero$Game_Views$viewNotification, model, room),
						_1: {
							ctor: '::',
							_0: _pickled_plugins$lettero$UiKit_TickTockTickTock$view(timeRatioLeft),
							_1: {ctor: '[]'}
						}
					}
				}
			} : {
				ctor: '::',
				_0: A2(_pickled_plugins$lettero$Game_Views$viewReadyScreen, room.players, model.playerId),
				_1: {ctor: '[]'}
			};
		});
	var _pickled_plugins$lettero$Game_Views$view = function (model) {
		return A2(
			_elm_lang$html$Html$div,
			{
				ctor: '::',
				_0: _elm_lang$html$Html_Attributes$class('app__page'),
				_1: {ctor: '[]'}
			},
			function () {
				var _p1 = model.error;
				if (_p1.ctor === 'Just') {
					return _pickled_plugins$lettero$Game_Views$viewError(_p1._0);
				} else {
					return A2(
						_elm_lang$core$Maybe$withDefault,
						{
							ctor: '::',
							_0: A2(
								_elm_lang$html$Html$div,
								{ctor: '[]'},
								{
									ctor: '::',
									_0: _pickled_plugins$lettero$UiKit_Spinner$view,
									_1: {ctor: '[]'}
								}),
							_1: {ctor: '[]'}
						},
						A2(
							_elm_lang$core$Maybe$map,
							_pickled_plugins$lettero$Game_Views$viewGame(model),
							model.room));
				}
			}());
	};
	
	var _pickled_plugins$lettero$RoomCreator_Messages$newPath = function (msg) {
		var _p0 = msg;
		if (_p0.ctor === 'Navigate') {
			return _elm_lang$core$Maybe$Just(_p0._0);
		} else {
			return _elm_lang$core$Maybe$Nothing;
		}
	};
	var _pickled_plugins$lettero$RoomCreator_Messages$Navigate = function (a) {
		return {ctor: 'Navigate', _0: a};
	};
	var _pickled_plugins$lettero$RoomCreator_Messages$ReceiveFormStatus = function (a) {
		return {ctor: 'ReceiveFormStatus', _0: a};
	};
	var _pickled_plugins$lettero$RoomCreator_Messages$SubmitCreateForm = {ctor: 'SubmitCreateForm'};
	var _pickled_plugins$lettero$RoomCreator_Messages$RemovePlayer = function (a) {
		return {ctor: 'RemovePlayer', _0: a};
	};
	var _pickled_plugins$lettero$RoomCreator_Messages$AddPlayer = {ctor: 'AddPlayer'};
	var _pickled_plugins$lettero$RoomCreator_Messages$InputPlayer = F2(
		function (a, b) {
			return {ctor: 'InputPlayer', _0: a, _1: b};
		});
	var _pickled_plugins$lettero$RoomCreator_Messages$InputRoomId = function (a) {
		return {ctor: 'InputRoomId', _0: a};
	};
	
	var _pickled_plugins$lettero$RoomCreator_Models$stringifyCreateRoomRequest = function (_p0) {
		var _p1 = _p0;
		return A2(
			_elm_lang$core$Basics_ops['++'],
			'{\"roomId\": \"',
			A2(
				_elm_lang$core$Basics_ops['++'],
				_p1.roomId,
				A2(
					_elm_lang$core$Basics_ops['++'],
					'\", \"playerIds\": ',
					A2(
						_elm_lang$core$Basics_ops['++'],
						_elm_lang$core$Basics$toString(_p1.playerIds),
						'}'))));
	};
	var _pickled_plugins$lettero$RoomCreator_Models$canSubmit = function (_p2) {
		var _p3 = _p2;
		return (_elm_lang$core$Native_Utils.cmp(
			_elm_lang$core$String$length(_p3.roomId),
			0) > 0) && A2(
			_elm_lang$core$List$all,
			_elm_lang$core$Basics$identity,
			A2(
				_elm_lang$core$List$map,
				function (_p4) {
					return function (i) {
						return _elm_lang$core$Native_Utils.cmp(i, 0) > 0;
					}(
						_elm_lang$core$String$length(_p4));
				},
				_p3.playerIds));
	};
	var _pickled_plugins$lettero$RoomCreator_Models$Model = F3(
		function (a, b, c) {
			return {roomId: a, playerIds: b, status: c};
		});
	var _pickled_plugins$lettero$RoomCreator_Models$Error = {ctor: 'Error'};
	var _pickled_plugins$lettero$RoomCreator_Models$Success = {ctor: 'Success'};
	var _pickled_plugins$lettero$RoomCreator_Models$Processing = {ctor: 'Processing'};
	var _pickled_plugins$lettero$RoomCreator_Models$Editing = {ctor: 'Editing'};
	var _pickled_plugins$lettero$RoomCreator_Models$init = A2(
		_elm_lang$core$Platform_Cmd_ops['!'],
		{
			roomId: '',
			playerIds: {
				ctor: '::',
				_0: '',
				_1: {
					ctor: '::',
					_0: '',
					_1: {ctor: '[]'}
				}
			},
			status: _pickled_plugins$lettero$RoomCreator_Models$Editing
		},
		{ctor: '[]'});
	
	var _pickled_plugins$lettero$RoomManager_Messages$newPath = function (msg) {
		var _p0 = msg;
		if (_p0.ctor === 'Navigate') {
			return _elm_lang$core$Maybe$Just(_p0._0);
		} else {
			return _elm_lang$core$Maybe$Nothing;
		}
	};
	var _pickled_plugins$lettero$RoomManager_Messages$Navigate = function (a) {
		return {ctor: 'Navigate', _0: a};
	};
	var _pickled_plugins$lettero$RoomManager_Messages$ReceiveRoom = function (a) {
		return {ctor: 'ReceiveRoom', _0: a};
	};
	
	var _pickled_plugins$lettero$RoomManager_Models$Model = F3(
		function (a, b, c) {
			return {roomId: a, room: b, stage: c};
		});
	var _pickled_plugins$lettero$RoomManager_Models$DeletingRoom = {ctor: 'DeletingRoom'};
	var _pickled_plugins$lettero$RoomManager_Models$AboutToDeleteRoom = {ctor: 'AboutToDeleteRoom'};
	var _pickled_plugins$lettero$RoomManager_Models$InvitePlayer = {ctor: 'InvitePlayer'};
	var _pickled_plugins$lettero$RoomManager_Models$Base = {ctor: 'Base'};
	var _pickled_plugins$lettero$RoomManager_Models$FetchingRoom = {ctor: 'FetchingRoom'};
	var _pickled_plugins$lettero$RoomManager_Models$init = function (roomId) {
		return A2(
			_elm_lang$core$Platform_Cmd_ops['!'],
			{roomId: roomId, room: _elm_lang$core$Maybe$Nothing, stage: _pickled_plugins$lettero$RoomManager_Models$FetchingRoom},
			{
				ctor: '::',
				_0: _pickled_plugins$lettero$Ports$roomRequest(roomId),
				_1: {ctor: '[]'}
			});
	};
	
	var _pickled_plugins$lettero$Tutorial_Messages$newPath = function (msg) {
		var _p0 = msg;
		if (_p0.ctor === 'Navigate') {
			return _elm_lang$core$Maybe$Just(_p0._0);
		} else {
			return _elm_lang$core$Maybe$Nothing;
		}
	};
	var _pickled_plugins$lettero$Tutorial_Messages$Navigate = function (a) {
		return {ctor: 'Navigate', _0: a};
	};
	var _pickled_plugins$lettero$Tutorial_Messages$Guess = function (a) {
		return {ctor: 'Guess', _0: a};
	};
	var _pickled_plugins$lettero$Tutorial_Messages$Start = {ctor: 'Start'};
	
	var _pickled_plugins$lettero$Tutorial_Models$isCorrectGuess = function (model) {
		var _p0 = model;
		if (_p0.ctor === 'Guessed') {
			return _pickled_plugins$lettero$Models_GuessValue$isCorrect(_p0._0);
		} else {
			return false;
		}
	};
	var _pickled_plugins$lettero$Tutorial_Models$Guessed = function (a) {
		return {ctor: 'Guessed', _0: a};
	};
	var _pickled_plugins$lettero$Tutorial_Models$Show = {ctor: 'Show'};
	var _pickled_plugins$lettero$Tutorial_Models$Intro = {ctor: 'Intro'};
	var _pickled_plugins$lettero$Tutorial_Models$init = A2(
		_elm_lang$core$Platform_Cmd_ops['!'],
		_pickled_plugins$lettero$Tutorial_Models$Intro,
		{
			ctor: '::',
			_0: _elm_lang$core$Platform_Cmd$none,
			_1: {ctor: '[]'}
		});
	
	var _pickled_plugins$lettero$Router$roomsPath = 'rooms';
	var _pickled_plugins$lettero$Router$homePath = '';
	var _pickled_plugins$lettero$Router$newPath = 'new';
	var _pickled_plugins$lettero$Router$aboutPath = 'about';
	var _pickled_plugins$lettero$Router$startPath = 'start';
	var _pickled_plugins$lettero$Router$uiPath = 'ui';
	var _pickled_plugins$lettero$Router$tryPath = 'try';
	var _pickled_plugins$lettero$Router$NotFound = {ctor: 'NotFound'};
	var _pickled_plugins$lettero$Router$Ui = {ctor: 'Ui'};
	var _pickled_plugins$lettero$Router$Game = function (a) {
		return {ctor: 'Game', _0: a};
	};
	var _pickled_plugins$lettero$Router$RoomManager = function (a) {
		return {ctor: 'RoomManager', _0: a};
	};
	var _pickled_plugins$lettero$Router$RoomCreator = function (a) {
		return {ctor: 'RoomCreator', _0: a};
	};
	var _pickled_plugins$lettero$Router$Tutorial = function (a) {
		return {ctor: 'Tutorial', _0: a};
	};
	var _pickled_plugins$lettero$Router$About = {ctor: 'About'};
	var _pickled_plugins$lettero$Router$Start = {ctor: 'Start'};
	var _pickled_plugins$lettero$Router$Home = {ctor: 'Home'};
	var _pickled_plugins$lettero$Router$defaultRouteUrl = {ctor: '_Tuple2', _0: _pickled_plugins$lettero$Router$Home, _1: ''};
	var _pickled_plugins$lettero$Router$matchers = _evancz$url_parser$UrlParser$oneOf(
		{
			ctor: '::',
			_0: A2(
				_evancz$url_parser$UrlParser$map,
				_pickled_plugins$lettero$Router$Home,
				_evancz$url_parser$UrlParser$s(_pickled_plugins$lettero$Router$homePath)),
			_1: {
				ctor: '::',
				_0: A2(
					_evancz$url_parser$UrlParser$map,
					_pickled_plugins$lettero$Router$Start,
					_evancz$url_parser$UrlParser$s(_pickled_plugins$lettero$Router$startPath)),
				_1: {
					ctor: '::',
					_0: A2(
						_evancz$url_parser$UrlParser$map,
						_pickled_plugins$lettero$Router$About,
						_evancz$url_parser$UrlParser$s(_pickled_plugins$lettero$Router$aboutPath)),
					_1: {
						ctor: '::',
						_0: A2(
							_evancz$url_parser$UrlParser$map,
							_pickled_plugins$lettero$Router$Tutorial(
								_elm_lang$core$Tuple$first(_pickled_plugins$lettero$Tutorial_Models$init)),
							_evancz$url_parser$UrlParser$s(_pickled_plugins$lettero$Router$tryPath)),
						_1: {
							ctor: '::',
							_0: A2(
								_evancz$url_parser$UrlParser$map,
								_pickled_plugins$lettero$Router$Ui,
								_evancz$url_parser$UrlParser$s(_pickled_plugins$lettero$Router$uiPath)),
							_1: {
								ctor: '::',
								_0: A2(
									_evancz$url_parser$UrlParser$map,
									F2(
										function (roomId, playerId) {
											return _pickled_plugins$lettero$Router$Game(
												_elm_lang$core$Tuple$first(
													A2(_pickled_plugins$lettero$Game_Models$init, roomId, playerId)));
										}),
									A2(
										_evancz$url_parser$UrlParser_ops['</>'],
										_evancz$url_parser$UrlParser$s(_pickled_plugins$lettero$Router$roomsPath),
										A2(_evancz$url_parser$UrlParser_ops['</>'], _evancz$url_parser$UrlParser$string, _evancz$url_parser$UrlParser$string))),
								_1: {
									ctor: '::',
									_0: A2(
										_evancz$url_parser$UrlParser$map,
										function (roomId) {
											return _pickled_plugins$lettero$Router$RoomManager(
												_elm_lang$core$Tuple$first(
													_pickled_plugins$lettero$RoomManager_Models$init(roomId)));
										},
										A2(
											_evancz$url_parser$UrlParser_ops['</>'],
											_evancz$url_parser$UrlParser$s(_pickled_plugins$lettero$Router$roomsPath),
											_evancz$url_parser$UrlParser$string)),
									_1: {
										ctor: '::',
										_0: A2(
											_evancz$url_parser$UrlParser$map,
											_pickled_plugins$lettero$Router$RoomCreator(
												_elm_lang$core$Tuple$first(_pickled_plugins$lettero$RoomCreator_Models$init)),
											_evancz$url_parser$UrlParser$s(_pickled_plugins$lettero$Router$newPath)),
										_1: {ctor: '[]'}
									}
								}
							}
						}
					}
				}
			}
		});
	var _pickled_plugins$lettero$Router$parse = function (location) {
		return A2(
			_elm_lang$core$Maybe$withDefault,
			_pickled_plugins$lettero$Router$NotFound,
			A2(_evancz$url_parser$UrlParser$parsePath, _pickled_plugins$lettero$Router$matchers, location));
	};
	
	var _pickled_plugins$lettero$Messages$TutorialMsg = function (a) {
		return {ctor: 'TutorialMsg', _0: a};
	};
	var _pickled_plugins$lettero$Messages$RoomManagerMsg = function (a) {
		return {ctor: 'RoomManagerMsg', _0: a};
	};
	var _pickled_plugins$lettero$Messages$RoomCreatorMsg = function (a) {
		return {ctor: 'RoomCreatorMsg', _0: a};
	};
	var _pickled_plugins$lettero$Messages$GameMsg = function (a) {
		return {ctor: 'GameMsg', _0: a};
	};
	var _pickled_plugins$lettero$Messages$RouteChange = function (a) {
		return {ctor: 'RouteChange', _0: a};
	};
	var _pickled_plugins$lettero$Messages$Navigate = function (a) {
		return {ctor: 'Navigate', _0: a};
	};
	
	var _pickled_plugins$lettero$Models$getCmdOnRouteChange = function (rt) {
		var _p0 = rt;
		switch (_p0.ctor) {
			case 'Game':
				var _p1 = _p0._0;
				return A2(
					_elm_lang$core$Platform_Cmd$map,
					_pickled_plugins$lettero$Messages$GameMsg,
					_elm_lang$core$Tuple$second(
						A2(_pickled_plugins$lettero$Game_Models$init, _p1.roomId, _p1.playerId)));
			case 'RoomCreator':
				return A2(
					_elm_lang$core$Platform_Cmd$map,
					_pickled_plugins$lettero$Messages$RoomCreatorMsg,
					_elm_lang$core$Tuple$second(_pickled_plugins$lettero$RoomCreator_Models$init));
			case 'RoomManager':
				return A2(
					_elm_lang$core$Platform_Cmd$map,
					_pickled_plugins$lettero$Messages$RoomManagerMsg,
					_elm_lang$core$Tuple$second(
						_pickled_plugins$lettero$RoomManager_Models$init(_p0._0.roomId)));
			case 'Tutorial':
				return A2(
					_elm_lang$core$Platform_Cmd$map,
					_pickled_plugins$lettero$Messages$TutorialMsg,
					_elm_lang$core$Tuple$second(_pickled_plugins$lettero$Tutorial_Models$init));
			default:
				return _elm_lang$core$Platform_Cmd$none;
		}
	};
	var _pickled_plugins$lettero$Models$Model = function (a) {
		return {route: a};
	};
	var _pickled_plugins$lettero$Models$init = function (loc) {
		var route = _pickled_plugins$lettero$Router$parse(loc);
		return {
			ctor: '_Tuple2',
			_0: _pickled_plugins$lettero$Models$Model(route),
			_1: _pickled_plugins$lettero$Models$getCmdOnRouteChange(route)
		};
	};
	
	var _pickled_plugins$lettero$UiKit_LabeledInput$viewDeleteButton = function ($delete) {
		var _p0 = $delete;
		if (_p0.ctor === 'Just') {
			return A2(
				_elm_lang$html$Html$div,
				{
					ctor: '::',
					_0: _elm_lang$html$Html_Attributes$classList(
						{
							ctor: '::',
							_0: {ctor: '_Tuple2', _0: 'textinput__remove', _1: true},
							_1: {
								ctor: '::',
								_0: {ctor: '_Tuple2', _0: 'textinput__remove--displayed', _1: true},
								_1: {ctor: '[]'}
							}
						}),
					_1: {
						ctor: '::',
						_0: _elm_lang$html$Html_Events$onClick(_p0._0),
						_1: {ctor: '[]'}
					}
				},
				{
					ctor: '::',
					_0: _elm_lang$html$Html$text('✕'),
					_1: {ctor: '[]'}
				});
		} else {
			return A2(
				_elm_lang$html$Html$div,
				{ctor: '[]'},
				{ctor: '[]'});
		}
	};
	var _pickled_plugins$lettero$UiKit_LabeledInput$view = function (options) {
		return A2(
			_elm_lang$html$Html$div,
			{
				ctor: '::',
				_0: _elm_lang$html$Html_Attributes$class('textinput'),
				_1: {ctor: '[]'}
			},
			{
				ctor: '::',
				_0: A2(
					_elm_lang$html$Html$label,
					{
						ctor: '::',
						_0: _elm_lang$html$Html_Attributes$for(options.id),
						_1: {
							ctor: '::',
							_0: _elm_lang$html$Html_Attributes$class('textinput__label'),
							_1: {ctor: '[]'}
						}
					},
					{
						ctor: '::',
						_0: _elm_lang$html$Html$text(options.label),
						_1: {ctor: '[]'}
					}),
				_1: {
					ctor: '::',
					_0: A2(
						_elm_lang$html$Html$input,
						{
							ctor: '::',
							_0: _elm_lang$html$Html_Attributes$class('textinput__field'),
							_1: {
								ctor: '::',
								_0: _elm_lang$html$Html_Attributes$type_('text'),
								_1: {
									ctor: '::',
									_0: _elm_lang$html$Html_Attributes$value(options.value),
									_1: {
										ctor: '::',
										_0: _elm_lang$html$Html_Attributes$id(options.id),
										_1: {
											ctor: '::',
											_0: _elm_lang$html$Html_Attributes$name(options.id),
											_1: {
												ctor: '::',
												_0: _elm_lang$html$Html_Events$onInput(options.onInput),
												_1: {
													ctor: '::',
													_0: _elm_lang$html$Html_Attributes$autofocus(options.autofocus),
													_1: {
														ctor: '::',
														_0: _elm_lang$html$Html_Attributes$placeholder(options.placeholder),
														_1: {ctor: '[]'}
													}
												}
											}
										}
									}
								}
							}
						},
						{ctor: '[]'}),
					_1: {
						ctor: '::',
						_0: _pickled_plugins$lettero$UiKit_LabeledInput$viewDeleteButton(options.$delete),
						_1: {ctor: '[]'}
					}
				}
			});
	};
	var _pickled_plugins$lettero$UiKit_LabeledInput$Options = F8(
		function (a, b, c, d, e, f, g, h) {
			return {id: a, label: b, type_: c, value: d, autofocus: e, placeholder: f, onInput: g, $delete: h};
		});
	
	var _pickled_plugins$lettero$UiKit_PageLayout$view = function (children) {
		return A2(
			_elm_lang$html$Html$div,
			{
				ctor: '::',
				_0: _elm_lang$html$Html_Attributes$class('app__page'),
				_1: {ctor: '[]'}
			},
			{
				ctor: '::',
				_0: A2(
					_elm_lang$html$Html$div,
					{
						ctor: '::',
						_0: _elm_lang$html$Html_Attributes$class('app__page-content'),
						_1: {ctor: '[]'}
					},
					{
						ctor: '::',
						_0: A2(
							_elm_lang$html$Html$div,
							{
								ctor: '::',
								_0: _elm_lang$html$Html_Attributes$class('basic-content'),
								_1: {ctor: '[]'}
							},
							children),
						_1: {ctor: '[]'}
					}),
				_1: {ctor: '[]'}
			});
	};
	
	var _pickled_plugins$lettero$UiKit_Form$Processing = {ctor: 'Processing'};
	var _pickled_plugins$lettero$UiKit_Form$Disabled = {ctor: 'Disabled'};
	var _pickled_plugins$lettero$UiKit_Form$Enabled = {ctor: 'Enabled'};
	var _pickled_plugins$lettero$UiKit_Form$view = F3(
		function (state, notification, children) {
			return A2(
				_elm_lang$html$Html$div,
				{
					ctor: '::',
					_0: _elm_lang$html$Html_Attributes$classList(
						{
							ctor: '::',
							_0: {ctor: '_Tuple2', _0: 'form', _1: true},
							_1: {
								ctor: '::',
								_0: {
									ctor: '_Tuple2',
									_0: 'form--inactive',
									_1: !_elm_lang$core$Native_Utils.eq(state, _pickled_plugins$lettero$UiKit_Form$Enabled)
								},
								_1: {ctor: '[]'}
							}
						}),
					_1: {ctor: '[]'}
				},
				A2(
					_elm_lang$core$Basics_ops['++'],
					{
						ctor: '::',
						_0: A2(
							_elm_lang$html$Html$div,
							{
								ctor: '::',
								_0: _elm_lang$html$Html_Attributes$class('form__content'),
								_1: {ctor: '[]'}
							},
							children),
						_1: {ctor: '[]'}
					},
					A2(
						_elm_lang$core$Basics_ops['++'],
						_elm_lang$core$Native_Utils.eq(state, _pickled_plugins$lettero$UiKit_Form$Processing) ? {
							ctor: '::',
							_0: A2(
								_elm_lang$html$Html$div,
								{
									ctor: '::',
									_0: _elm_lang$html$Html_Attributes$class('form__spinner'),
									_1: {ctor: '[]'}
								},
								{
									ctor: '::',
									_0: _pickled_plugins$lettero$UiKit_Spinner$view,
									_1: {ctor: '[]'}
								}),
							_1: {ctor: '[]'}
						} : {ctor: '[]'},
						function () {
							var _p0 = notification;
							if (_p0.ctor === 'Just') {
								return {
									ctor: '::',
									_0: A2(
										_elm_lang$html$Html$div,
										{
											ctor: '::',
											_0: _elm_lang$html$Html_Attributes$class('form__notification'),
											_1: {ctor: '[]'}
										},
										{
											ctor: '::',
											_0: _elm_lang$html$Html$text(_p0._0),
											_1: {ctor: '[]'}
										}),
									_1: {ctor: '[]'}
								};
							} else {
								return {ctor: '[]'};
							}
						}())));
		});
	
	var _pickled_plugins$lettero$RoomCreator_Views$viewError = {
		ctor: '::',
		_0: A2(
			_elm_lang$html$Html$h2,
			{ctor: '[]'},
			{
				ctor: '::',
				_0: _elm_lang$html$Html$text(_pickled_plugins$lettero$Content$roomCreatorPageErrorTitle),
				_1: {ctor: '[]'}
			}),
		_1: {
			ctor: '::',
			_0: A2(
				_elm_lang$html$Html$p,
				{ctor: '[]'},
				{
					ctor: '::',
					_0: _elm_lang$html$Html$text(_pickled_plugins$lettero$Content$roomCreatorPageErrorBody),
					_1: {ctor: '[]'}
				}),
			_1: {
				ctor: '::',
				_0: A2(
					_elm_lang$html$Html$button,
					{
						ctor: '::',
						_0: _elm_lang$html$Html_Attributes$class('button'),
						_1: {
							ctor: '::',
							_0: _elm_lang$html$Html_Events$onClick(
								_pickled_plugins$lettero$RoomCreator_Messages$Navigate(
									A2(_elm_lang$core$Basics_ops['++'], '/', _pickled_plugins$lettero$Router$newPath))),
							_1: {ctor: '[]'}
						}
					},
					{
						ctor: '::',
						_0: _elm_lang$html$Html$text('Yes'),
						_1: {ctor: '[]'}
					}),
				_1: {
					ctor: '::',
					_0: A2(
						_elm_lang$html$Html$button,
						{
							ctor: '::',
							_0: _elm_lang$html$Html_Attributes$class('button'),
							_1: {
								ctor: '::',
								_0: _elm_lang$html$Html_Events$onClick(
									_pickled_plugins$lettero$RoomCreator_Messages$Navigate(
										A2(_elm_lang$core$Basics_ops['++'], '/', _pickled_plugins$lettero$Router$newPath))),
								_1: {ctor: '[]'}
							}
						},
						{
							ctor: '::',
							_0: _elm_lang$html$Html$text('No'),
							_1: {ctor: '[]'}
						}),
					_1: {ctor: '[]'}
				}
			}
		}
	};
	var _pickled_plugins$lettero$RoomCreator_Views$viewSuccess = function (model) {
		return {
			ctor: '::',
			_0: A2(
				_elm_lang$html$Html$h2,
				{ctor: '[]'},
				{
					ctor: '::',
					_0: _elm_lang$html$Html$text(_pickled_plugins$lettero$Content$roomCreatorPageSuccessTitle),
					_1: {ctor: '[]'}
				}),
			_1: {
				ctor: '::',
				_0: A2(
					_elm_lang$html$Html$p,
					{ctor: '[]'},
					{
						ctor: '::',
						_0: _elm_lang$html$Html$text(
							A2(_pickled_plugins$lettero$Utilities$textTemplate, _pickled_plugins$lettero$Content$roomCreatorPageSuccessBody, model.roomId)),
						_1: {ctor: '[]'}
					}),
				_1: {
					ctor: '::',
					_0: A2(
						_elm_lang$html$Html$button,
						{
							ctor: '::',
							_0: _elm_lang$html$Html_Attributes$class('button'),
							_1: {
								ctor: '::',
								_0: _elm_lang$html$Html_Events$onClick(
									_pickled_plugins$lettero$RoomCreator_Messages$Navigate(
										A2(
											_elm_lang$core$Basics_ops['++'],
											'/',
											A2(
												_elm_lang$core$Basics_ops['++'],
												_pickled_plugins$lettero$Router$roomsPath,
												A2(_elm_lang$core$Basics_ops['++'], '/', model.roomId))))),
								_1: {ctor: '[]'}
							}
						},
						{
							ctor: '::',
							_0: _elm_lang$html$Html$text(_pickled_plugins$lettero$Content$roomCreatorPageSuccessButtonText),
							_1: {ctor: '[]'}
						}),
					_1: {ctor: '[]'}
				}
			}
		};
	};
	var _pickled_plugins$lettero$RoomCreator_Views$viewPlayers = function (playerIds) {
		return A2(
			_elm_lang$core$List$indexedMap,
			F2(
				function (i, playerId) {
					return _pickled_plugins$lettero$UiKit_LabeledInput$view(
						{
							id: A2(
								_elm_lang$core$Basics_ops['++'],
								'player',
								_elm_lang$core$Basics$toString(i)),
							label: A2(
								_elm_lang$core$Basics_ops['++'],
								'Player ',
								_elm_lang$core$Basics$toString(i + 1)),
							type_: 'text',
							value: playerId,
							autofocus: false,
							placeholder: 'E.g. alfred',
							onInput: _pickled_plugins$lettero$RoomCreator_Messages$InputPlayer(i),
							$delete: (_elm_lang$core$Native_Utils.cmp(
								_elm_lang$core$List$length(playerIds),
								2) > 0) ? _elm_lang$core$Maybe$Just(
								_pickled_plugins$lettero$RoomCreator_Messages$RemovePlayer(i)) : _elm_lang$core$Maybe$Nothing
						});
				}),
			playerIds);
	};
	var _pickled_plugins$lettero$RoomCreator_Views$viewCreateForm = function (model) {
		return {
			ctor: '::',
			_0: A2(
				_elm_lang$html$Html$h2,
				{ctor: '[]'},
				{
					ctor: '::',
					_0: _elm_lang$html$Html$text(_pickled_plugins$lettero$Content$roomCreatorPageTitle),
					_1: {ctor: '[]'}
				}),
			_1: {
				ctor: '::',
				_0: A2(
					_elm_lang$html$Html$p,
					{ctor: '[]'},
					{
						ctor: '::',
						_0: _elm_lang$html$Html$text(_pickled_plugins$lettero$Content$roomCreatorPageBody),
						_1: {ctor: '[]'}
					}),
				_1: {
					ctor: '::',
					_0: A3(
						_pickled_plugins$lettero$UiKit_Form$view,
						_elm_lang$core$Native_Utils.eq(model.status, _pickled_plugins$lettero$RoomCreator_Models$Processing) ? _pickled_plugins$lettero$UiKit_Form$Processing : _pickled_plugins$lettero$UiKit_Form$Enabled,
						_elm_lang$core$Maybe$Nothing,
						A2(
							_elm_lang$core$Basics_ops['++'],
							{
								ctor: '::',
								_0: _pickled_plugins$lettero$UiKit_LabeledInput$view(
									{id: 'roomId', label: 'Room name', type_: 'text', value: model.roomId, autofocus: false, placeholder: 'E.g. theroom', onInput: _pickled_plugins$lettero$RoomCreator_Messages$InputRoomId, $delete: _elm_lang$core$Maybe$Nothing}),
								_1: {ctor: '[]'}
							},
							A2(
								_elm_lang$core$Basics_ops['++'],
								_pickled_plugins$lettero$RoomCreator_Views$viewPlayers(model.playerIds),
								{
									ctor: '::',
									_0: A2(
										_elm_lang$html$Html$button,
										{
											ctor: '::',
											_0: _elm_lang$html$Html_Events$onClick(_pickled_plugins$lettero$RoomCreator_Messages$AddPlayer),
											_1: {
												ctor: '::',
												_0: _elm_lang$html$Html_Attributes$class('form__button'),
												_1: {ctor: '[]'}
											}
										},
										{
											ctor: '::',
											_0: A2(
												_elm_lang$html$Html$span,
												{ctor: '[]'},
												{
													ctor: '::',
													_0: _elm_lang$html$Html$text(_pickled_plugins$lettero$Content$roomCreatorPageAddPlayerPrompt),
													_1: {ctor: '[]'}
												}),
											_1: {ctor: '[]'}
										}),
									_1: {
										ctor: '::',
										_0: A2(
											_elm_lang$html$Html$button,
											{
												ctor: '::',
												_0: _elm_lang$html$Html_Attributes$classList(
													{
														ctor: '::',
														_0: {ctor: '_Tuple2', _0: 'form__button', _1: true},
														_1: {
															ctor: '::',
															_0: {
																ctor: '_Tuple2',
																_0: 'form__button--disabled',
																_1: !_pickled_plugins$lettero$RoomCreator_Models$canSubmit(model)
															},
															_1: {ctor: '[]'}
														}
													}),
												_1: {
													ctor: '::',
													_0: _elm_lang$html$Html_Events$onClick(_pickled_plugins$lettero$RoomCreator_Messages$SubmitCreateForm),
													_1: {ctor: '[]'}
												}
											},
											{
												ctor: '::',
												_0: _elm_lang$html$Html$text('Submit'),
												_1: {ctor: '[]'}
											}),
										_1: {ctor: '[]'}
									}
								}))),
					_1: {ctor: '[]'}
				}
			}
		};
	};
	var _pickled_plugins$lettero$RoomCreator_Views$viewContent = function (model) {
		var _p0 = model.status;
		switch (_p0.ctor) {
			case 'Success':
				return _pickled_plugins$lettero$RoomCreator_Views$viewSuccess(model);
			case 'Error':
				return _pickled_plugins$lettero$RoomCreator_Views$viewError;
			default:
				return _pickled_plugins$lettero$RoomCreator_Views$viewCreateForm(model);
		}
	};
	var _pickled_plugins$lettero$RoomCreator_Views$view = function (model) {
		return _pickled_plugins$lettero$UiKit_PageLayout$view(
			_pickled_plugins$lettero$RoomCreator_Views$viewContent(model));
	};
	
	var _pickled_plugins$lettero$RoomManager_Views$viewPlayers = F2(
		function (viewPlayer, room) {
			return A2(
				_elm_lang$core$List$map,
				viewPlayer(room.id),
				_pickled_plugins$lettero$Models_Player$toList(room.players));
		});
	var _pickled_plugins$lettero$RoomManager_Views$viewPlayerEmail = F2(
		function (roomId, player) {
			return A2(
				_elm_lang$html$Html$a,
				{
					ctor: '::',
					_0: _elm_lang$html$Html_Attributes$class('button'),
					_1: {
						ctor: '::',
						_0: _elm_lang$html$Html_Attributes$href(
							A2(
								_elm_lang$core$Basics_ops['++'],
								'mailto:?body=',
								A2(
									_elm_lang$core$Basics_ops['++'],
									_pickled_plugins$lettero$Constants$baseUrl,
									A2(
										_elm_lang$core$Basics_ops['++'],
										'/rooms/',
										A2(
											_elm_lang$core$Basics_ops['++'],
											roomId,
											A2(_elm_lang$core$Basics_ops['++'], '/', player.id)))))),
						_1: {ctor: '[]'}
					}
				},
				{
					ctor: '::',
					_0: _elm_lang$html$Html$text(
						A2(_elm_lang$core$Basics_ops['++'], '✎ ', player.id)),
					_1: {ctor: '[]'}
				});
		});
	var _pickled_plugins$lettero$RoomManager_Views$viewPlayerPlay = F2(
		function (roomId, player) {
			return A2(
				_elm_lang$html$Html$a,
				{
					ctor: '::',
					_0: _elm_lang$html$Html_Attributes$class('button'),
					_1: {
						ctor: '::',
						_0: _elm_lang$html$Html_Attributes$href(
							A2(
								_elm_lang$core$Basics_ops['++'],
								'/rooms/',
								A2(
									_elm_lang$core$Basics_ops['++'],
									roomId,
									A2(_elm_lang$core$Basics_ops['++'], '/', player.id)))),
						_1: {ctor: '[]'}
					}
				},
				{
					ctor: '::',
					_0: _elm_lang$html$Html$text(
						A2(_elm_lang$core$Basics_ops['++'], '♟ ', player.id)),
					_1: {ctor: '[]'}
				});
		});
	var _pickled_plugins$lettero$RoomManager_Views$view = function (model) {
		var content = function () {
			var _p0 = model.stage;
			switch (_p0.ctor) {
				case 'FetchingRoom':
					return A2(
						_elm_lang$html$Html$div,
						{ctor: '[]'},
						{
							ctor: '::',
							_0: _pickled_plugins$lettero$UiKit_Spinner$view,
							_1: {ctor: '[]'}
						});
				case 'Base':
					return A2(
						_elm_lang$html$Html$div,
						{ctor: '[]'},
						A2(
							_elm_lang$core$Basics_ops['++'],
							{
								ctor: '::',
								_0: A2(
									_elm_lang$html$Html$p,
									{ctor: '[]'},
									{
										ctor: '::',
										_0: _elm_lang$html$Html$text(_pickled_plugins$lettero$Content$roomManagerPagePlayLinksIntro),
										_1: {ctor: '[]'}
									}),
								_1: {ctor: '[]'}
							},
							A2(
								_elm_lang$core$Basics_ops['++'],
								A2(
									_elm_lang$core$Maybe$withDefault,
									{ctor: '[]'},
									A2(
										_elm_lang$core$Maybe$map,
										_pickled_plugins$lettero$RoomManager_Views$viewPlayers(_pickled_plugins$lettero$RoomManager_Views$viewPlayerPlay),
										model.room)),
								A2(
									_elm_lang$core$Basics_ops['++'],
									{
										ctor: '::',
										_0: A2(
											_elm_lang$html$Html$p,
											{ctor: '[]'},
											{
												ctor: '::',
												_0: _elm_lang$html$Html$text(_pickled_plugins$lettero$Content$roomManagerPageInviteLinksIntro),
												_1: {ctor: '[]'}
											}),
										_1: {ctor: '[]'}
									},
									A2(
										_elm_lang$core$Maybe$withDefault,
										{ctor: '[]'},
										A2(
											_elm_lang$core$Maybe$map,
											_pickled_plugins$lettero$RoomManager_Views$viewPlayers(_pickled_plugins$lettero$RoomManager_Views$viewPlayerEmail),
											model.room))))));
				default:
					return A2(
						_elm_lang$html$Html$div,
						{ctor: '[]'},
						{ctor: '[]'});
			}
		}();
		return _pickled_plugins$lettero$UiKit_PageLayout$view(
			{
				ctor: '::',
				_0: A2(
					_elm_lang$html$Html$h2,
					{ctor: '[]'},
					{
						ctor: '::',
						_0: _elm_lang$html$Html$text(
							A2(_pickled_plugins$lettero$Utilities$textTemplate, _pickled_plugins$lettero$Content$roomManagerPageTitle, model.roomId)),
						_1: {ctor: '[]'}
					}),
				_1: {
					ctor: '::',
					_0: content,
					_1: {ctor: '[]'}
				}
			});
	};
	
	var _pickled_plugins$lettero$Tutorial_Views$view = function (model) {
		var isCorrectGuess_ = _pickled_plugins$lettero$Tutorial_Models$isCorrectGuess(model);
		var onNotificationClick = isCorrectGuess_ ? _pickled_plugins$lettero$Tutorial_Messages$Navigate(_pickled_plugins$lettero$Router$newPath) : _pickled_plugins$lettero$Tutorial_Messages$Start;
		var notificationContent = function () {
			var _p0 = model;
			switch (_p0.ctor) {
				case 'Intro':
					return _pickled_plugins$lettero$Content$tutorialStart;
				case 'Show':
					return _pickled_plugins$lettero$Content$tutorialShow;
				default:
					return isCorrectGuess_ ? _pickled_plugins$lettero$Content$tutorialCorrect : _pickled_plugins$lettero$Content$tutorialIncorrect;
			}
		}();
		var highlights = function () {
			var _p1 = model;
			if (_p1.ctor === 'Guessed') {
				return _elm_lang$core$Dict$fromList(
					{
						ctor: '::',
						_0: {ctor: '_Tuple2', _0: _p1._0, _1: 'highlighted'},
						_1: {ctor: '[]'}
					});
			} else {
				return _elm_lang$core$Dict$empty;
			}
		}();
		return A2(
			_elm_lang$html$Html$div,
			{
				ctor: '::',
				_0: _elm_lang$html$Html_Attributes$class('app__page'),
				_1: {ctor: '[]'}
			},
			{
				ctor: '::',
				_0: A2(
					_elm_lang$html$Html$div,
					{
						ctor: '::',
						_0: _elm_lang$html$Html_Events$onClick(onNotificationClick),
						_1: {ctor: '[]'}
					},
					{
						ctor: '::',
						_0: A3(_pickled_plugins$lettero$UiKit_Notification$view, notificationContent, true, isCorrectGuess_),
						_1: {ctor: '[]'}
					}),
				_1: {
					ctor: '::',
					_0: (!_elm_lang$core$Native_Utils.eq(model, _pickled_plugins$lettero$Tutorial_Models$Intro)) ? _pickled_plugins$lettero$UiKit_Word$view(
						{word: 'berry', onGuess: _pickled_plugins$lettero$Tutorial_Messages$Guess, isDisabled: false, startAngle: 0, highlights: highlights}) : A2(
						_elm_lang$html$Html$div,
						{ctor: '[]'},
						{ctor: '[]'}),
					_1: {ctor: '[]'}
				}
			});
	};
	
	var _pickled_plugins$lettero$UiKit_Background$toSeconds = function (f) {
		return A2(
			_elm_lang$core$Basics_ops['++'],
			'-',
			A2(
				_elm_lang$core$Basics_ops['++'],
				_elm_lang$core$Basics$toString(f * 3),
				's'));
	};
	var _pickled_plugins$lettero$UiKit_Background$toPercent = function (f) {
		return A2(
			_elm_lang$core$Basics_ops['++'],
			_elm_lang$core$Basics$toString(f * 100),
			'%');
	};
	var _pickled_plugins$lettero$UiKit_Background$viewLetter = F2(
		function (i, coord) {
			var styleAttributes = A2(
				_elm_lang$core$Basics_ops['++'],
				A2(
					_elm_lang$core$List$indexedMap,
					F2(
						function (i, f) {
							return _elm_lang$core$Native_Utils.eq(i, 0) ? {
								ctor: '_Tuple2',
								_0: 'top',
								_1: _pickled_plugins$lettero$UiKit_Background$toPercent(f)
							} : {
								ctor: '_Tuple2',
								_0: 'left',
								_1: _pickled_plugins$lettero$UiKit_Background$toPercent(f)
							};
						}),
					coord),
				{
					ctor: '::',
					_0: {
						ctor: '_Tuple2',
						_0: 'animation-delay',
						_1: _pickled_plugins$lettero$UiKit_Background$toSeconds(
							A2(
								_elm_lang$core$Maybe$withDefault,
								0,
								_elm_lang$core$List$head(coord)))
					},
					_1: {ctor: '[]'}
				});
			return A2(
				_elm_lang$html$Html$p,
				{
					ctor: '::',
					_0: _elm_lang$html$Html_Attributes$class('background__letter'),
					_1: {
						ctor: '::',
						_0: _elm_lang$html$Html_Attributes$style(styleAttributes),
						_1: {ctor: '[]'}
					}
				},
				{
					ctor: '::',
					_0: _elm_lang$html$Html$text(
						_elm_lang$core$String$fromChar(
							_elm_lang$core$Char$fromCode(i + 65))),
					_1: {ctor: '[]'}
				});
		});
	var _pickled_plugins$lettero$UiKit_Background$randomCoordinates = {
		ctor: '::',
		_0: {
			ctor: '::',
			_0: 0.39772362282305,
			_1: {
				ctor: '::',
				_0: 0.13385055958664,
				_1: {ctor: '[]'}
			}
		},
		_1: {
			ctor: '::',
			_0: {
				ctor: '::',
				_0: 0.90265921437869,
				_1: {
					ctor: '::',
					_0: 0.78826690018196,
					_1: {ctor: '[]'}
				}
			},
			_1: {
				ctor: '::',
				_0: {
					ctor: '::',
					_0: 0.68433962491747,
					_1: {
						ctor: '::',
						_0: 0.92743311379723,
						_1: {ctor: '[]'}
					}
				},
				_1: {
					ctor: '::',
					_0: {
						ctor: '::',
						_0: 0.96803548800928,
						_1: {
							ctor: '::',
							_0: 0.62107961570188,
							_1: {ctor: '[]'}
						}
					},
					_1: {
						ctor: '::',
						_0: {
							ctor: '::',
							_0: 0.87890461393535,
							_1: {
								ctor: '::',
								_0: 0.53139456523985,
								_1: {ctor: '[]'}
							}
						},
						_1: {
							ctor: '::',
							_0: {
								ctor: '::',
								_0: 0.24938027198527,
								_1: {
									ctor: '::',
									_0: 0.74117815378618,
									_1: {ctor: '[]'}
								}
							},
							_1: {
								ctor: '::',
								_0: {
									ctor: '::',
									_0: 0.53646111173265,
									_1: {
										ctor: '::',
										_0: 0.59048200410966,
										_1: {ctor: '[]'}
									}
								},
								_1: {
									ctor: '::',
									_0: {
										ctor: '::',
										_0: 0.14002300353906,
										_1: {
											ctor: '::',
											_0: 0.40275729602502,
											_1: {ctor: '[]'}
										}
									},
									_1: {
										ctor: '::',
										_0: {
											ctor: '::',
											_0: 0.13631679054516,
											_1: {
												ctor: '::',
												_0: 0.79465177102886,
												_1: {ctor: '[]'}
											}
										},
										_1: {
											ctor: '::',
											_0: {
												ctor: '::',
												_0: 0.67248952440424,
												_1: {
													ctor: '::',
													_0: 0.29879515278558,
													_1: {ctor: '[]'}
												}
											},
											_1: {
												ctor: '::',
												_0: {
													ctor: '::',
													_0: 0.19575529674038,
													_1: {
														ctor: '::',
														_0: 0.54673568772673,
														_1: {ctor: '[]'}
													}
												},
												_1: {
													ctor: '::',
													_0: {
														ctor: '::',
														_0: 0.44673726784932,
														_1: {
															ctor: '::',
															_0: 0.60767216257622,
															_1: {ctor: '[]'}
														}
													},
													_1: {
														ctor: '::',
														_0: {
															ctor: '::',
															_0: 0.48502237539388,
															_1: {
																ctor: '::',
																_0: 0.45007984986623,
																_1: {ctor: '[]'}
															}
														},
														_1: {
															ctor: '::',
															_0: {
																ctor: '::',
																_0: 0.48637634837427,
																_1: {
																	ctor: '::',
																	_0: 0.53214031228054,
																	_1: {ctor: '[]'}
																}
															},
															_1: {
																ctor: '::',
																_0: {
																	ctor: '::',
																	_0: 0.63161102890469,
																	_1: {
																		ctor: '::',
																		_0: 0.67875845938348,
																		_1: {ctor: '[]'}
																	}
																},
																_1: {
																	ctor: '::',
																	_0: {
																		ctor: '::',
																		_0: 0.44880325506446,
																		_1: {
																			ctor: '::',
																			_0: 0.40418736632348,
																			_1: {ctor: '[]'}
																		}
																	},
																	_1: {
																		ctor: '::',
																		_0: {
																			ctor: '::',
																			_0: 0.79171103082767,
																			_1: {
																				ctor: '::',
																				_0: 0.89732391360877,
																				_1: {ctor: '[]'}
																			}
																		},
																		_1: {
																			ctor: '::',
																			_0: {
																				ctor: '::',
																				_0: 0.36894288887264,
																				_1: {
																					ctor: '::',
																					_0: 0.20537349730458,
																					_1: {ctor: '[]'}
																				}
																			},
																			_1: {
																				ctor: '::',
																				_0: {
																					ctor: '::',
																					_0: 0.94620846255249,
																					_1: {
																						ctor: '::',
																						_0: 0.47698619775852,
																						_1: {ctor: '[]'}
																					}
																				},
																				_1: {
																					ctor: '::',
																					_0: {
																						ctor: '::',
																						_0: 3.2908616405397e-2,
																						_1: {
																							ctor: '::',
																							_0: 0.60566972751773,
																							_1: {ctor: '[]'}
																						}
																					},
																					_1: {ctor: '[]'}
																				}
																			}
																		}
																	}
																}
															}
														}
													}
												}
											}
										}
									}
								}
							}
						}
					}
				}
			}
		}
	};
	var _pickled_plugins$lettero$UiKit_Background$view = A2(
		_elm_lang$html$Html$div,
		{
			ctor: '::',
			_0: _elm_lang$html$Html_Attributes$class('background'),
			_1: {ctor: '[]'}
		},
		A2(_elm_lang$core$List$indexedMap, _pickled_plugins$lettero$UiKit_Background$viewLetter, _pickled_plugins$lettero$UiKit_Background$randomCoordinates));
	
	var _pickled_plugins$lettero$UiKit_Icons$logo = A2(
		_elm_lang$html$Html$div,
		{
			ctor: '::',
			_0: _elm_lang$html$Html_Attributes$class('icon'),
			_1: {ctor: '[]'}
		},
		{
			ctor: '::',
			_0: A2(
				_elm_lang$svg$Svg$svg,
				{
					ctor: '::',
					_0: _elm_lang$svg$Svg_Attributes$viewBox('0 0 320 320'),
					_1: {ctor: '[]'}
				},
				{
					ctor: '::',
					_0: A2(
						_elm_lang$svg$Svg$path,
						{
							ctor: '::',
							_0: _elm_lang$svg$Svg_Attributes$d('M124.8,248.52 L124.8,66.52 C124.8,62.786648 126.573316,59.986676 130.12,58.12 C133.666684,56.253324 137.959975,55.32 143,55.32 C148.040025,55.32 152.333316,56.253324 155.88,58.12 C159.426684,59.986676 161.2,62.786648 161.2,66.52 L161.2,228.08 L229.52,228.08 C232.880017,228.08 235.53999,229.666651 237.5,232.84 C239.46001,236.013349 240.44,239.746645 240.44,244.04 C240.44,248.333355 239.46001,252.066651 237.5,255.24 C235.53999,258.413349 232.880017,260 229.52,260 L140.76,260 C136.466645,260 132.733349,258.973344 129.56,256.92 C126.386651,254.866656 124.8,252.066684 124.8,248.52 L124.8,248.52 Z'),
							_1: {
								ctor: '::',
								_0: _elm_lang$svg$Svg_Attributes$transform('translate(50 -40) rotate(19.000000)'),
								_1: {ctor: '[]'}
							}
						},
						{ctor: '[]'}),
					_1: {ctor: '[]'}
				}),
			_1: {ctor: '[]'}
		});
	
	var _pickled_plugins$lettero$Views$viewUi = _pickled_plugins$lettero$UiKit_PageLayout$view(
		{
			ctor: '::',
			_0: A2(
				_elm_lang$html$Html$h2,
				{ctor: '[]'},
				{
					ctor: '::',
					_0: _elm_lang$html$Html$text('Lettero UI kit'),
					_1: {ctor: '[]'}
				}),
			_1: {
				ctor: '::',
				_0: A2(
					_elm_lang$html$Html$p,
					{ctor: '[]'},
					{
						ctor: '::',
						_0: _elm_lang$html$Html$text('A list of UI elements used in the game.'),
						_1: {ctor: '[]'}
					}),
				_1: {
					ctor: '::',
					_0: A2(
						_elm_lang$html$Html$div,
						{ctor: '[]'},
						{
							ctor: '::',
							_0: A2(
								_elm_lang$html$Html$p,
								{ctor: '[]'},
								{
									ctor: '::',
									_0: _elm_lang$html$Html$text('Spinner'),
									_1: {ctor: '[]'}
								}),
							_1: {
								ctor: '::',
								_0: _pickled_plugins$lettero$UiKit_Spinner$view,
								_1: {ctor: '[]'}
							}
						}),
					_1: {ctor: '[]'}
				}
			}
		});
	var _pickled_plugins$lettero$Views$viewAbout = _pickled_plugins$lettero$UiKit_PageLayout$view(
		{
			ctor: '::',
			_0: A2(
				_evancz$elm_markdown$Markdown$toHtml,
				{ctor: '[]'},
				_pickled_plugins$lettero$Content$aboutPageContent),
			_1: {
				ctor: '::',
				_0: A2(
					_elm_lang$html$Html$button,
					{
						ctor: '::',
						_0: _elm_lang$html$Html_Attributes$class('button'),
						_1: {
							ctor: '::',
							_0: _elm_lang$html$Html_Events$onClick(
								_pickled_plugins$lettero$Messages$Navigate(
									A2(_elm_lang$core$Basics_ops['++'], '/', _pickled_plugins$lettero$Router$homePath))),
							_1: {ctor: '[]'}
						}
					},
					{
						ctor: '::',
						_0: _elm_lang$html$Html$text(_pickled_plugins$lettero$Content$aboutPageBackButtonText),
						_1: {ctor: '[]'}
					}),
				_1: {
					ctor: '::',
					_0: A2(
						_elm_lang$html$Html$button,
						{
							ctor: '::',
							_0: _elm_lang$html$Html_Attributes$class('button'),
							_1: {
								ctor: '::',
								_0: _elm_lang$html$Html_Events$onClick(
									_pickled_plugins$lettero$Messages$Navigate(
										A2(_elm_lang$core$Basics_ops['++'], '/', _pickled_plugins$lettero$Router$startPath))),
								_1: {ctor: '[]'}
							}
						},
						{
							ctor: '::',
							_0: _elm_lang$html$Html$text(_pickled_plugins$lettero$Content$aboutPagePlayButtonText),
							_1: {ctor: '[]'}
						}),
					_1: {ctor: '[]'}
				}
			}
		});
	var _pickled_plugins$lettero$Views$viewStart = _pickled_plugins$lettero$UiKit_PageLayout$view(
		{
			ctor: '::',
			_0: A2(
				_elm_lang$html$Html$p,
				{ctor: '[]'},
				{
					ctor: '::',
					_0: _elm_lang$html$Html$text(_pickled_plugins$lettero$Content$startPageTutorialPrompt),
					_1: {ctor: '[]'}
				}),
			_1: {
				ctor: '::',
				_0: A2(
					_elm_lang$html$Html$button,
					{
						ctor: '::',
						_0: _elm_lang$html$Html_Attributes$class('button'),
						_1: {
							ctor: '::',
							_0: _elm_lang$html$Html_Events$onClick(
								_pickled_plugins$lettero$Messages$Navigate(
									A2(_elm_lang$core$Basics_ops['++'], '/', _pickled_plugins$lettero$Router$tryPath))),
							_1: {ctor: '[]'}
						}
					},
					{
						ctor: '::',
						_0: _elm_lang$html$Html$text('Tutorial'),
						_1: {ctor: '[]'}
					}),
				_1: {
					ctor: '::',
					_0: A2(
						_elm_lang$html$Html$p,
						{ctor: '[]'},
						{
							ctor: '::',
							_0: _elm_lang$html$Html$text(_pickled_plugins$lettero$Content$startPageCreateRoomPrompt),
							_1: {ctor: '[]'}
						}),
					_1: {
						ctor: '::',
						_0: A2(
							_elm_lang$html$Html$button,
							{
								ctor: '::',
								_0: _elm_lang$html$Html_Attributes$class('button'),
								_1: {
									ctor: '::',
									_0: _elm_lang$html$Html_Events$onClick(
										_pickled_plugins$lettero$Messages$Navigate(
											A2(_elm_lang$core$Basics_ops['++'], '/', _pickled_plugins$lettero$Router$newPath))),
									_1: {ctor: '[]'}
								}
							},
							{
								ctor: '::',
								_0: _elm_lang$html$Html$text('Create room'),
								_1: {ctor: '[]'}
							}),
						_1: {ctor: '[]'}
					}
				}
			}
		});
	var _pickled_plugins$lettero$Views$viewNav = function (model) {
		return A2(
			_elm_lang$html$Html$nav,
			{
				ctor: '::',
				_0: _elm_lang$html$Html_Attributes$classList(
					{
						ctor: '::',
						_0: {ctor: '_Tuple2', _0: 'nav', _1: true},
						_1: {
							ctor: '::',
							_0: {
								ctor: '_Tuple2',
								_0: 'nav--hidden',
								_1: _elm_lang$core$Native_Utils.eq(model.route, _pickled_plugins$lettero$Router$Home)
							},
							_1: {ctor: '[]'}
						}
					}),
				_1: {
					ctor: '::',
					_0: _elm_lang$html$Html_Events$onClick(
						_pickled_plugins$lettero$Messages$Navigate('/')),
					_1: {ctor: '[]'}
				}
			},
			{
				ctor: '::',
				_0: A2(
					_elm_lang$html$Html$div,
					{
						ctor: '::',
						_0: _elm_lang$html$Html_Attributes$class('nav__item nav__item--left'),
						_1: {ctor: '[]'}
					},
					{
						ctor: '::',
						_0: _pickled_plugins$lettero$UiKit_Icons$logo,
						_1: {ctor: '[]'}
					}),
				_1: {ctor: '[]'}
			});
	};
	var _pickled_plugins$lettero$Views$viewNotFound = _pickled_plugins$lettero$UiKit_PageLayout$view(
		{
			ctor: '::',
			_0: A2(
				_elm_lang$html$Html$h2,
				{ctor: '[]'},
				{
					ctor: '::',
					_0: _elm_lang$html$Html$text(_pickled_plugins$lettero$Content$notFoundPageTitle),
					_1: {ctor: '[]'}
				}),
			_1: {
				ctor: '::',
				_0: A2(
					_elm_lang$html$Html$p,
					{ctor: '[]'},
					{
						ctor: '::',
						_0: _elm_lang$html$Html$text(_pickled_plugins$lettero$Content$notFoundPageBody),
						_1: {ctor: '[]'}
					}),
				_1: {ctor: '[]'}
			}
		});
	var _pickled_plugins$lettero$Views$viewHome = _pickled_plugins$lettero$UiKit_PageLayout$view(
		{
			ctor: '::',
			_0: A2(
				_elm_lang$html$Html$h1,
				{ctor: '[]'},
				{
					ctor: '::',
					_0: _elm_lang$html$Html$text(_pickled_plugins$lettero$Content$homePageTitle),
					_1: {ctor: '[]'}
				}),
			_1: {
				ctor: '::',
				_0: A2(
					_elm_lang$html$Html$h3,
					{ctor: '[]'},
					{
						ctor: '::',
						_0: _elm_lang$html$Html$text(_pickled_plugins$lettero$Content$homePageSubtitle),
						_1: {ctor: '[]'}
					}),
				_1: {
					ctor: '::',
					_0: A2(
						_elm_lang$html$Html$div,
						{
							ctor: '::',
							_0: _elm_lang$html$Html_Attributes$class('basic-content__nav'),
							_1: {ctor: '[]'}
						},
						{
							ctor: '::',
							_0: A2(
								_elm_lang$html$Html$button,
								{
									ctor: '::',
									_0: _elm_lang$html$Html_Attributes$class('button'),
									_1: {
										ctor: '::',
										_0: _elm_lang$html$Html_Events$onClick(
											_pickled_plugins$lettero$Messages$Navigate(
												A2(_elm_lang$core$Basics_ops['++'], '/', _pickled_plugins$lettero$Router$startPath))),
										_1: {ctor: '[]'}
									}
								},
								{
									ctor: '::',
									_0: _elm_lang$html$Html$text(_pickled_plugins$lettero$Content$homePagePlayButtonText),
									_1: {ctor: '[]'}
								}),
							_1: {
								ctor: '::',
								_0: A2(
									_elm_lang$html$Html$button,
									{
										ctor: '::',
										_0: _elm_lang$html$Html_Attributes$class('button'),
										_1: {
											ctor: '::',
											_0: _elm_lang$html$Html_Events$onClick(
												_pickled_plugins$lettero$Messages$Navigate(
													A2(_elm_lang$core$Basics_ops['++'], '/', _pickled_plugins$lettero$Router$aboutPath))),
											_1: {ctor: '[]'}
										}
									},
									{
										ctor: '::',
										_0: _elm_lang$html$Html$text(_pickled_plugins$lettero$Content$homePageAboutButtonText),
										_1: {ctor: '[]'}
									}),
								_1: {ctor: '[]'}
							}
						}),
					_1: {ctor: '[]'}
				}
			}
		});
	var _pickled_plugins$lettero$Views$view = function (model) {
		var content = function () {
			var _p0 = model.route;
			switch (_p0.ctor) {
				case 'Home':
					return _pickled_plugins$lettero$Views$viewHome;
				case 'Start':
					return _pickled_plugins$lettero$Views$viewStart;
				case 'About':
					return _pickled_plugins$lettero$Views$viewAbout;
				case 'NotFound':
					return _pickled_plugins$lettero$Views$viewNotFound;
				case 'Ui':
					return _pickled_plugins$lettero$Views$viewUi;
				case 'RoomCreator':
					return A2(
						_elm_lang$html$Html$map,
						_pickled_plugins$lettero$Messages$RoomCreatorMsg,
						_pickled_plugins$lettero$RoomCreator_Views$view(_p0._0));
				case 'RoomManager':
					return A2(
						_elm_lang$html$Html$map,
						_pickled_plugins$lettero$Messages$RoomManagerMsg,
						_pickled_plugins$lettero$RoomManager_Views$view(_p0._0));
				case 'Game':
					return A2(
						_elm_lang$html$Html$map,
						_pickled_plugins$lettero$Messages$GameMsg,
						_pickled_plugins$lettero$Game_Views$view(_p0._0));
				default:
					return A2(
						_elm_lang$html$Html$map,
						_pickled_plugins$lettero$Messages$TutorialMsg,
						_pickled_plugins$lettero$Tutorial_Views$view(_p0._0));
			}
		}();
		return A2(
			_elm_lang$html$Html$div,
			{
				ctor: '::',
				_0: _elm_lang$html$Html_Attributes$class('app'),
				_1: {ctor: '[]'}
			},
			{
				ctor: '::',
				_0: _pickled_plugins$lettero$Views$viewNav(model),
				_1: {
					ctor: '::',
					_0: _pickled_plugins$lettero$UiKit_Background$view,
					_1: {
						ctor: '::',
						_0: content,
						_1: {ctor: '[]'}
					}
				}
			});
	};
	
	var _pickled_plugins$lettero$RoomCreator_Update$lTake = F2(
		function (i, l) {
			return _elm_lang$core$List$concat(
				{
					ctor: '::',
					_0: A2(_elm_lang$core$List$take, i, l),
					_1: {
						ctor: '::',
						_0: A2(_elm_lang$core$List$drop, i + 1, l),
						_1: {ctor: '[]'}
					}
				});
		});
	var _pickled_plugins$lettero$RoomCreator_Update$update = F2(
		function (msg, model) {
			var _p0 = msg;
			switch (_p0.ctor) {
				case 'InputRoomId':
					return A2(
						_elm_lang$core$Platform_Cmd_ops['!'],
						_elm_lang$core$Native_Utils.update(
							model,
							{roomId: _p0._0}),
						{
							ctor: '::',
							_0: _elm_lang$core$Platform_Cmd$none,
							_1: {ctor: '[]'}
						});
				case 'InputPlayer':
					return A2(
						_elm_lang$core$Platform_Cmd_ops['!'],
						_elm_lang$core$Native_Utils.update(
							model,
							{
								playerIds: A2(
									_elm_lang$core$List$indexedMap,
									F2(
										function (i, val) {
											return _elm_lang$core$Native_Utils.eq(i, _p0._0) ? _p0._1 : val;
										}),
									model.playerIds)
							}),
						{ctor: '[]'});
				case 'AddPlayer':
					return A2(
						_elm_lang$core$Platform_Cmd_ops['!'],
						_elm_lang$core$Native_Utils.update(
							model,
							{
								playerIds: A2(
									_elm_lang$core$List$append,
									model.playerIds,
									{
										ctor: '::',
										_0: '',
										_1: {ctor: '[]'}
									})
							}),
						{ctor: '[]'});
				case 'RemovePlayer':
					return A2(
						_elm_lang$core$Platform_Cmd_ops['!'],
						_elm_lang$core$Native_Utils.update(
							model,
							{
								playerIds: A2(_pickled_plugins$lettero$RoomCreator_Update$lTake, _p0._0, model.playerIds)
							}),
						{ctor: '[]'});
				case 'SubmitCreateForm':
					var room = _pickled_plugins$lettero$Models_Room$create(
						{roomId: model.roomId, playerIds: model.playerIds});
					return A2(
						_elm_lang$core$Platform_Cmd_ops['!'],
						_elm_lang$core$Native_Utils.update(
							model,
							{status: _pickled_plugins$lettero$RoomCreator_Models$Processing}),
						{
							ctor: '::',
							_0: _pickled_plugins$lettero$Ports$createRoomRequest(
								_pickled_plugins$lettero$Models_Room$encodeItem(room)),
							_1: {ctor: '[]'}
						});
				case 'ReceiveFormStatus':
					return A2(
						_elm_lang$core$Platform_Cmd_ops['!'],
						_elm_lang$core$Native_Utils.update(
							model,
							{
								status: _elm_lang$core$Native_Utils.eq(_p0._0, 'success') ? _pickled_plugins$lettero$RoomCreator_Models$Success : _pickled_plugins$lettero$RoomCreator_Models$Error
							}),
						{ctor: '[]'});
				default:
					return A2(
						_elm_lang$core$Platform_Cmd_ops['!'],
						model,
						{ctor: '[]'});
			}
		});
	
	var _pickled_plugins$lettero$RoomManager_Update$update = F2(
		function (msg, model) {
			var _p0 = msg;
			if (_p0.ctor === 'ReceiveRoom') {
				var room = _elm_lang$core$Result$toMaybe(
					A2(_elm_lang$core$Json_Decode$decodeString, _pickled_plugins$lettero$Models_Room$itemDecoder, _p0._0));
				return A2(
					_elm_lang$core$Platform_Cmd_ops['!'],
					_elm_lang$core$Native_Utils.update(
						model,
						{room: room, stage: _pickled_plugins$lettero$RoomManager_Models$Base}),
					{ctor: '[]'});
			} else {
				return A2(
					_elm_lang$core$Platform_Cmd_ops['!'],
					model,
					{ctor: '[]'});
			}
		});
	
	var _pickled_plugins$lettero$Tutorial_Update$update = F2(
		function (msg, model) {
			var _p0 = msg;
			switch (_p0.ctor) {
				case 'Start':
					return A2(
						_elm_lang$core$Platform_Cmd_ops['!'],
						_elm_lang$core$Native_Utils.eq(model, _pickled_plugins$lettero$Tutorial_Models$Intro) ? _pickled_plugins$lettero$Tutorial_Models$Show : model,
						{ctor: '[]'});
				case 'Guess':
					return A2(
						_elm_lang$core$Platform_Cmd_ops['!'],
						_pickled_plugins$lettero$Tutorial_Models$Guessed(_p0._0),
						{ctor: '[]'});
				default:
					return A2(
						_elm_lang$core$Platform_Cmd_ops['!'],
						model,
						{ctor: '[]'});
			}
		});
	
	var _pickled_plugins$lettero$Update$updateTutorial = F2(
		function (msg, model) {
			return A2(
				_elm_lang$core$Maybe$withDefault,
				function () {
					var _p0 = model.route;
					if (_p0.ctor === 'Tutorial') {
						return function (_p1) {
							var _p2 = _p1;
							return {
								ctor: '_Tuple2',
								_0: _elm_lang$core$Native_Utils.update(
									model,
									{
										route: _pickled_plugins$lettero$Router$Tutorial(_p2._0)
									}),
								_1: A2(_elm_lang$core$Platform_Cmd$map, _pickled_plugins$lettero$Messages$TutorialMsg, _p2._1)
							};
						}(
							A2(_pickled_plugins$lettero$Tutorial_Update$update, msg, _p0._0));
					} else {
						return {ctor: '_Tuple2', _0: model, _1: _elm_lang$core$Platform_Cmd$none};
					}
				}(),
				A2(
					_elm_lang$core$Maybe$map,
					function (str) {
						return A2(
							_elm_lang$core$Platform_Cmd_ops['!'],
							model,
							{
								ctor: '::',
								_0: _elm_lang$navigation$Navigation$newUrl(str),
								_1: {ctor: '[]'}
							});
					},
					_pickled_plugins$lettero$Tutorial_Messages$newPath(msg)));
		});
	var _pickled_plugins$lettero$Update$updateRoomManager = F2(
		function (msg, model) {
			return A2(
				_elm_lang$core$Maybe$withDefault,
				function () {
					var _p3 = model.route;
					if (_p3.ctor === 'RoomManager') {
						return function (_p4) {
							var _p5 = _p4;
							return {
								ctor: '_Tuple2',
								_0: _elm_lang$core$Native_Utils.update(
									model,
									{
										route: _pickled_plugins$lettero$Router$RoomManager(_p5._0)
									}),
								_1: A2(_elm_lang$core$Platform_Cmd$map, _pickled_plugins$lettero$Messages$RoomManagerMsg, _p5._1)
							};
						}(
							A2(_pickled_plugins$lettero$RoomManager_Update$update, msg, _p3._0));
					} else {
						return {ctor: '_Tuple2', _0: model, _1: _elm_lang$core$Platform_Cmd$none};
					}
				}(),
				A2(
					_elm_lang$core$Maybe$map,
					function (str) {
						return A2(
							_elm_lang$core$Platform_Cmd_ops['!'],
							model,
							{
								ctor: '::',
								_0: _elm_lang$navigation$Navigation$newUrl(str),
								_1: {ctor: '[]'}
							});
					},
					_pickled_plugins$lettero$RoomManager_Messages$newPath(msg)));
		});
	var _pickled_plugins$lettero$Update$updateRoomCreator = F2(
		function (msg, model) {
			return A2(
				_elm_lang$core$Maybe$withDefault,
				function () {
					var _p6 = model.route;
					if (_p6.ctor === 'RoomCreator') {
						return function (_p7) {
							var _p8 = _p7;
							return {
								ctor: '_Tuple2',
								_0: _elm_lang$core$Native_Utils.update(
									model,
									{
										route: _pickled_plugins$lettero$Router$RoomCreator(_p8._0)
									}),
								_1: A2(_elm_lang$core$Platform_Cmd$map, _pickled_plugins$lettero$Messages$RoomCreatorMsg, _p8._1)
							};
						}(
							A2(_pickled_plugins$lettero$RoomCreator_Update$update, msg, _p6._0));
					} else {
						return {ctor: '_Tuple2', _0: model, _1: _elm_lang$core$Platform_Cmd$none};
					}
				}(),
				A2(
					_elm_lang$core$Maybe$map,
					function (str) {
						return A2(
							_elm_lang$core$Platform_Cmd_ops['!'],
							model,
							{
								ctor: '::',
								_0: _elm_lang$navigation$Navigation$newUrl(str),
								_1: {ctor: '[]'}
							});
					},
					_pickled_plugins$lettero$RoomCreator_Messages$newPath(msg)));
		});
	var _pickled_plugins$lettero$Update$updateGame = F2(
		function (msg, model) {
			return A2(
				_elm_lang$core$Maybe$withDefault,
				function () {
					var _p9 = model.route;
					if (_p9.ctor === 'Game') {
						return function (_p10) {
							var _p11 = _p10;
							return {
								ctor: '_Tuple2',
								_0: _elm_lang$core$Native_Utils.update(
									model,
									{
										route: _pickled_plugins$lettero$Router$Game(_p11._0)
									}),
								_1: A2(_elm_lang$core$Platform_Cmd$map, _pickled_plugins$lettero$Messages$GameMsg, _p11._1)
							};
						}(
							A2(_pickled_plugins$lettero$Game_Update$update, msg, _p9._0));
					} else {
						return {ctor: '_Tuple2', _0: model, _1: _elm_lang$core$Platform_Cmd$none};
					}
				}(),
				A2(
					_elm_lang$core$Maybe$map,
					function (str) {
						return A2(
							_elm_lang$core$Platform_Cmd_ops['!'],
							model,
							{
								ctor: '::',
								_0: _elm_lang$navigation$Navigation$newUrl(str),
								_1: {ctor: '[]'}
							});
					},
					_pickled_plugins$lettero$Game_Messages$newPath(msg)));
		});
	var _pickled_plugins$lettero$Update$update = F2(
		function (msg, model) {
			var _p12 = msg;
			switch (_p12.ctor) {
				case 'Navigate':
					return A2(
						_elm_lang$core$Platform_Cmd_ops['!'],
						model,
						{
							ctor: '::',
							_0: _elm_lang$navigation$Navigation$newUrl(_p12._0),
							_1: {ctor: '[]'}
						});
				case 'RouteChange':
					var _p13 = _p12._0;
					return A2(
						_elm_lang$core$Platform_Cmd_ops['!'],
						_elm_lang$core$Native_Utils.update(
							model,
							{route: _p13}),
						{
							ctor: '::',
							_0: _pickled_plugins$lettero$Models$getCmdOnRouteChange(_p13),
							_1: {ctor: '[]'}
						});
				case 'GameMsg':
					return A2(_pickled_plugins$lettero$Update$updateGame, _p12._0, model);
				case 'RoomCreatorMsg':
					return A2(_pickled_plugins$lettero$Update$updateRoomCreator, _p12._0, model);
				case 'RoomManagerMsg':
					return A2(_pickled_plugins$lettero$Update$updateRoomManager, _p12._0, model);
				default:
					return A2(_pickled_plugins$lettero$Update$updateTutorial, _p12._0, model);
			}
		});
	
	var _pickled_plugins$lettero$Tutorial_Subscriptions$subscriptions = function (model) {
		return _elm_lang$core$Platform_Sub$none;
	};
	
	var _pickled_plugins$lettero$RoomCreator_Subscriptions$subscriptions = function (model) {
		return _pickled_plugins$lettero$Ports$createRoomResponse(_pickled_plugins$lettero$RoomCreator_Messages$ReceiveFormStatus);
	};
	
	var _pickled_plugins$lettero$RoomManager_Subscriptions$subscriptions = function (model) {
		return _elm_lang$core$Platform_Sub$batch(
			{
				ctor: '::',
				_0: _pickled_plugins$lettero$Ports$roomResponse(_pickled_plugins$lettero$RoomManager_Messages$ReceiveRoom),
				_1: {ctor: '[]'}
			});
	};
	
	var _pickled_plugins$lettero$Subscriptions$subscriptions = function (model) {
		var _p0 = model.route;
		switch (_p0.ctor) {
			case 'Game':
				return A2(
					_elm_lang$core$Platform_Sub$map,
					_pickled_plugins$lettero$Messages$GameMsg,
					_pickled_plugins$lettero$Game_Subscriptions$subscriptions(_p0._0));
			case 'Tutorial':
				return A2(
					_elm_lang$core$Platform_Sub$map,
					_pickled_plugins$lettero$Messages$TutorialMsg,
					_pickled_plugins$lettero$Tutorial_Subscriptions$subscriptions(_p0._0));
			case 'RoomCreator':
				return A2(
					_elm_lang$core$Platform_Sub$map,
					_pickled_plugins$lettero$Messages$RoomCreatorMsg,
					_pickled_plugins$lettero$RoomCreator_Subscriptions$subscriptions(_p0._0));
			case 'RoomManager':
				return A2(
					_elm_lang$core$Platform_Sub$map,
					_pickled_plugins$lettero$Messages$RoomManagerMsg,
					_pickled_plugins$lettero$RoomManager_Subscriptions$subscriptions(_p0._0));
			default:
				return _elm_lang$core$Platform_Sub$none;
		}
	};
	
	var _pickled_plugins$lettero$Main$main = A2(
		_elm_lang$navigation$Navigation$program,
		function (_p0) {
			return _pickled_plugins$lettero$Messages$RouteChange(
				_pickled_plugins$lettero$Router$parse(_p0));
		},
		{init: _pickled_plugins$lettero$Models$init, view: _pickled_plugins$lettero$Views$view, update: _pickled_plugins$lettero$Update$update, subscriptions: _pickled_plugins$lettero$Subscriptions$subscriptions})();
	
	var Elm = {};
	Elm['Main'] = Elm['Main'] || {};
	if (typeof _pickled_plugins$lettero$Main$main !== 'undefined') {
	    _pickled_plugins$lettero$Main$main(Elm['Main'], 'Main', {"types":{"unions":{"RoomManager.Models.Stage":{"args":[],"tags":{"Base":[],"AboutToDeleteRoom":[],"FetchingRoom":[],"DeletingRoom":[],"InvitePlayer":[]}},"Messages.Msg":{"args":[],"tags":{"RoomCreatorMsg":["RoomCreator.Messages.Msg"],"RouteChange":["Router.Route"],"Navigate":["String"],"GameMsg":["Game.Messages.Msg"],"TutorialMsg":["Tutorial.Messages.Msg"],"RoomManagerMsg":["RoomManager.Messages.Msg"]}},"Dict.LeafColor":{"args":[],"tags":{"LBBlack":[],"LBlack":[]}},"Game.Messages.Msg":{"args":[],"tags":{"ReceiveRoundRandom":["Int"],"Tick":["Time.Time"],"ReceiveRoomState":["String"],"LeaveRoom":["String"],"Navigate":["String"],"MakeGuess":["Int"],"SetReady":[]}},"Game.Models.Error":{"args":[],"tags":{"Other":[],"Network":[],"WrongPath":[]}},"Tutorial.Messages.Msg":{"args":[],"tags":{"Guess":["Int"],"Start":[],"Navigate":["String"]}},"RoomManager.Messages.Msg":{"args":[],"tags":{"ReceiveRoom":["String"],"Navigate":["String"]}},"RoomCreator.Models.Status":{"args":[],"tags":{"Editing":[],"Error":[],"Success":[],"Processing":[]}},"Dict.Dict":{"args":["k","v"],"tags":{"RBNode_elm_builtin":["Dict.NColor","k","v","Dict.Dict k v","Dict.Dict k v"],"RBEmpty_elm_builtin":["Dict.LeafColor"]}},"Maybe.Maybe":{"args":["a"],"tags":{"Just":["a"],"Nothing":[]}},"Router.Route":{"args":[],"tags":{"Home":[],"Start":[],"NotFound":[],"Game":["Game.Models.Model"],"Tutorial":["Tutorial.Models.Model"],"Ui":[],"RoomManager":["RoomManager.Models.Model"],"About":[],"RoomCreator":["RoomCreator.Models.Model"]}},"Dict.NColor":{"args":[],"tags":{"BBlack":[],"Red":[],"NBlack":[],"Black":[]}},"Tutorial.Models.Model":{"args":[],"tags":{"Guessed":["Models.GuessValue.GuessValue"],"Intro":[],"Show":[]}},"RoomCreator.Messages.Msg":{"args":[],"tags":{"InputRoomId":["String"],"RemovePlayer":["Int"],"InputPlayer":["Int","String"],"ReceiveFormStatus":["String"],"Navigate":["String"],"AddPlayer":[],"SubmitCreateForm":[]}},"Models.Guess.GuessStatus":{"args":[],"tags":{"Idle":[],"Pending":[],"Made":["Models.GuessValue.GuessValue"]}}},"aliases":{"Models.Room.Room":{"args":[],"type":"{ id : String , round : Int , roundData : Models.RoundData.RoundData , hostId : String , players : Models.Player.Players }"},"Models.Player.Player":{"args":[],"type":"{ id : String , roomId : String , score : Int , guess : Models.Guess.Guess , isReady : Bool }"},"RoomCreator.Models.Model":{"args":[],"type":"{ roomId : String , playerIds : List String , status : RoomCreator.Models.Status }"},"Models.Guess.Guess":{"args":[],"type":"{ status : Models.Guess.GuessStatus, time : Time.Time }"},"Models.RoundData.RoundData":{"args":[],"type":"{ word : String }"},"Models.GuessValue.GuessValue":{"args":[],"type":"Int"},"Models.Player.Players":{"args":[],"type":"Dict.Dict String Models.Player.Player"},"RoomManager.Models.Model":{"args":[],"type":"{ roomId : String , room : Maybe.Maybe Models.Room.Room , stage : RoomManager.Models.Stage }"},"Game.Models.Model":{"args":[],"type":"{ room : Maybe.Maybe Models.Room.Room , roomId : String , playerId : String , currentRoundRandom : Int , currentRoundTime : Time.Time , error : Maybe.Maybe Game.Models.Error }"},"Time.Time":{"args":[],"type":"Float"}},"message":"Messages.Msg"},"versions":{"elm":"0.18.0"}});
	}
	
	if ("function" === "function" && __webpack_require__(11)['amd'])
	{
	  !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = function() { return Elm; }.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	  return;
	}
	
	if (true)
	{
	  module['exports'] = Elm;
	  return;
	}
	
	var globalElm = this['Elm'];
	if (typeof globalElm === "undefined")
	{
	  this['Elm'] = Elm;
	  return;
	}
	
	for (var publicModule in Elm)
	{
	  if (publicModule in globalElm)
	  {
	    throw new Error('There are two Elm modules called `' + publicModule + '` on this page! Rename one of them.');
	  }
	  globalElm[publicModule] = Elm[publicModule];
	}
	
	}).call(this);
	
	
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }()), __webpack_require__(10)(module)))

/***/ },
/* 10 */
/***/ function(module, exports) {

	module.exports = function(module) {
		if(!module.webpackPolyfill) {
			module.deprecate = function() {};
			module.paths = [];
			// module.parent = undefined by default
			module.children = [];
			module.webpackPolyfill = 1;
		}
		return module;
	}


/***/ },
/* 11 */
/***/ function(module, exports) {

	module.exports = function() { throw new Error("define cannot be used indirect"); };


/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _firebase = __webpack_require__(13);
	
	var _ports = __webpack_require__(20);
	
	var _ports2 = _interopRequireDefault(_ports);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	exports.default = function (ports) {
	  var db = (0, _firebase.getDb)();
	  ports.roomRequest.subscribe(function (roomId) {
	    db.ref('/rooms/' + roomId).once('value').then(function (s) {
	      return s.val();
	    }).then(function (s) {
	      return JSON.stringify(s);
	    }).then(function (s) {
	      ports.roomResponse.send(s);
	    });
	  });
	
	  ports.createRoomRequest.subscribe(function (msg) {
	    var room = JSON.parse(msg);
	    db.ref('/rooms/' + room.id).set(room).then(function () {
	      ports.createRoomResponse.send('success');
	    }).catch(function () {
	      ports.createRoomResponse.send('error');
	    });
	  });
	
	  (0, _ports2.default)(ports);
	
	  global.onbeforeunload = function () {
	    ports.closeTab.send('');
	  };
	};
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.start = start;
	exports.getDb = getDb;
	
	var _firebase = __webpack_require__(14);
	
	var _firebase2 = _interopRequireDefault(_firebase);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var config = {
	  apiKey: ("AIzaSyCHzzWM5xVDuDMyKhwmwKr_W96F3OtgISM"),
	  authDomain: ("lettero-27803.firebaseapp.com"),
	  databaseURL: ("https://lettero-27803.firebaseio.com"),
	  storageBucket: ("lettero-27803.appspot.com"),
	  messagingSenderId: ("1004858982411")
	};
	
	var app = void 0,
	    db = void 0;
	
	function start() {
	  app = _firebase2.default.initializeApp(config);
	  db = app.database();
	}
	
	function getDb() {
	  return db;
	}

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 *  Firebase libraries for browser - npm package.
	 *
	 * Usage:
	 *
	 *   firebase = require('firebase');
	 */
	var firebase = __webpack_require__(15);
	__webpack_require__(16);
	__webpack_require__(17);
	__webpack_require__(18);
	__webpack_require__(19);
	module.exports = firebase;


/***/ },
/* 15 */
/***/ function(module, exports) {

	/* WEBPACK VAR INJECTION */(function(global) {/*! @license Firebase v3.5.2
	    Build: 3.5.2-rc.1
	    Terms: https://developers.google.com/terms */
	var firebase = null; (function() { for(var aa="function"==typeof Object.defineProperties?Object.defineProperty:function(a,b,c){if(c.get||c.set)throw new TypeError("ES3 does not support getters and setters.");a!=Array.prototype&&a!=Object.prototype&&(a[b]=c.value)},h="undefined"!=typeof window&&window===this?this:"undefined"!=typeof global&&null!=global?global:this,ba=function(){ba=function(){};h.Symbol||(h.Symbol=ca)},da=0,ca=function(a){return"jscomp_symbol_"+(a||"")+da++},m=function(){ba();var a=h.Symbol.iterator;a||(a=h.Symbol.iterator=
	h.Symbol("iterator"));"function"!=typeof Array.prototype[a]&&aa(Array.prototype,a,{configurable:!0,writable:!0,value:function(){return ea(this)}});m=function(){}},ea=function(a){var b=0;return fa(function(){return b<a.length?{done:!1,value:a[b++]}:{done:!0}})},fa=function(a){m();a={next:a};a[h.Symbol.iterator]=function(){return this};return a},n=function(a){m();var b=a[Symbol.iterator];return b?b.call(a):ea(a)},p=h,q=["Promise"],r=0;r<q.length-1;r++){var t=q[r];t in p||(p[t]={});p=p[t]}
	var ga=q[q.length-1],u=p[ga],w=function(){function a(){this.c=null}if(u)return u;a.prototype.L=function(a){null==this.c&&(this.c=[],this.W());this.c.push(a)};a.prototype.W=function(){var a=this;this.M(function(){a.$()})};var b=h.setTimeout;a.prototype.M=function(a){b(a,0)};a.prototype.$=function(){for(;this.c&&this.c.length;){var a=this.c;this.c=[];for(var b=0;b<a.length;++b){var c=a[b];delete a[b];try{c()}catch(k){this.X(k)}}}this.c=null};a.prototype.X=function(a){this.M(function(){throw a;})};var c=
	function(a){this.a=0;this.j=void 0;this.m=[];var b=this.F();try{a(b.resolve,b.reject)}catch(g){b.reject(g)}};c.prototype.F=function(){function a(a){return function(e){c||(c=!0,a.call(b,e))}}var b=this,c=!1;return{resolve:a(this.ia),reject:a(this.K)}};c.prototype.ia=function(a){if(a===this)this.K(new TypeError("A Promise cannot resolve to itself"));else if(a instanceof c)this.la(a);else{var b;a:switch(typeof a){case "object":b=null!=a;break a;case "function":b=!0;break a;default:b=!1}b?this.ha(a):
	this.R(a)}};c.prototype.ha=function(a){var b=void 0;try{b=a.then}catch(g){this.K(g);return}"function"==typeof b?this.ma(b,a):this.R(a)};c.prototype.K=function(a){this.U(2,a)};c.prototype.R=function(a){this.U(1,a)};c.prototype.U=function(a,b){if(0!=this.a)throw Error("Cannot settle("+a+", "+b|"): Promise already settled in state"+this.a);this.a=a;this.j=b;this.ba()};c.prototype.ba=function(){if(null!=this.m){for(var a=this.m,b=0;b<a.length;++b)a[b].call(),a[b]=null;this.m=null}};var d=new a;c.prototype.la=
	function(a){var b=this.F();a.o(b.resolve,b.reject)};c.prototype.ma=function(a,b){var c=this.F();try{a.call(b,c.resolve,c.reject)}catch(k){c.reject(k)}};c.prototype.then=function(a,b){function e(a,b){return"function"==typeof a?function(b){try{d(a(b))}catch(Fa){f(Fa)}}:b}var d,f,z=new c(function(a,b){d=a;f=b});this.o(e(a,d),e(b,f));return z};c.prototype.catch=function(a){return this.then(void 0,a)};c.prototype.o=function(a,b){function c(){switch(e.a){case 1:a(e.j);break;case 2:b(e.j);break;default:throw Error("Unexpected state: "+
	e.a);}}var e=this;null==this.m?d.L(c):this.m.push(function(){d.L(c)})};c.resolve=function(a){return a instanceof c?a:new c(function(b){b(a)})};c.reject=function(a){return new c(function(b,c){c(a)})};c.race=function(a){return new c(function(b,d){for(var e=n(a),f=e.next();!f.done;f=e.next())c.resolve(f.value).o(b,d)})};c.all=function(a){var b=n(a),d=b.next();return d.done?c.resolve([]):new c(function(a,e){function k(b){return function(c){f[b]=c;l--;0==l&&a(f)}}var f=[],l=0;do f.push(void 0),l++,c.resolve(d.value).o(k(f.length-
	1),e),d=b.next();while(!d.done)})};c.$jscomp$new$AsyncExecutor=function(){return new a};return c}();w!=u&&null!=w&&aa(p,ga,{configurable:!0,writable:!0,value:w});
	var x=this,y=function(){},ha=function(a){var b=typeof a;if("object"==b)if(a){if(a instanceof Array)return"array";if(a instanceof Object)return b;var c=Object.prototype.toString.call(a);if("[object Window]"==c)return"object";if("[object Array]"==c||"number"==typeof a.length&&"undefined"!=typeof a.splice&&"undefined"!=typeof a.propertyIsEnumerable&&!a.propertyIsEnumerable("splice"))return"array";if("[object Function]"==c||"undefined"!=typeof a.call&&"undefined"!=typeof a.propertyIsEnumerable&&!a.propertyIsEnumerable("call"))return"function"}else return"null";
	else if("function"==b&&"undefined"==typeof a.call)return"object";return b},A=function(a){return"function"==ha(a)},ia=function(a,b,c){return a.call.apply(a.bind,arguments)},ja=function(a,b,c){if(!a)throw Error();if(2<arguments.length){var d=Array.prototype.slice.call(arguments,2);return function(){var c=Array.prototype.slice.call(arguments);Array.prototype.unshift.apply(c,d);return a.apply(b,c)}}return function(){return a.apply(b,arguments)}},B=function(a,b,c){B=Function.prototype.bind&&-1!=Function.prototype.bind.toString().indexOf("native code")?
	ia:ja;return B.apply(null,arguments)},ka=function(a,b){var c=Array.prototype.slice.call(arguments,1);return function(){var b=c.slice();b.push.apply(b,arguments);return a.apply(this,b)}},la=function(a,b){function c(){}c.prototype=b.prototype;a.sa=b.prototype;a.prototype=new c;a.prototype.constructor=a;a.ra=function(a,c,f){for(var d=Array(arguments.length-2),e=2;e<arguments.length;e++)d[e-2]=arguments[e];return b.prototype[c].apply(a,d)}};var C;C="undefined"!==typeof window?window:"undefined"!==typeof self?self:global;function __extends(a,b){function c(){this.constructor=a}for(var d in b)b.hasOwnProperty(d)&&(a[d]=b[d]);a.prototype=null===b?Object.create(b):(c.prototype=b.prototype,new c)}
	function __decorate(a,b,c,d){var e=arguments.length,f=3>e?b:null===d?d=Object.getOwnPropertyDescriptor(b,c):d,g;g=C.Reflect;if("object"===typeof g&&"function"===typeof g.decorate)f=g.decorate(a,b,c,d);else for(var k=a.length-1;0<=k;k--)if(g=a[k])f=(3>e?g(f):3<e?g(b,c,f):g(b,c))||f;return 3<e&&f&&Object.defineProperty(b,c,f),f}function __metadata(a,b){var c=C.Reflect;if("object"===typeof c&&"function"===typeof c.metadata)return c.metadata(a,b)}
	var __param=function(a,b){return function(c,d){b(c,d,a)}},__awaiter=function(a,b,c,d){return new (c||(c=Promise))(function(e,f){function g(a){try{l(d.next(a))}catch(v){f(v)}}function k(a){try{l(d.throw(a))}catch(v){f(v)}}function l(a){a.done?e(a.value):(new c(function(b){b(a.value)})).then(g,k)}l((d=d.apply(a,b)).next())})};"undefined"!==typeof C.V&&C.V||(C.__extends=__extends,C.__decorate=__decorate,C.__metadata=__metadata,C.__param=__param,C.__awaiter=__awaiter);var D=function(a){if(Error.captureStackTrace)Error.captureStackTrace(this,D);else{var b=Error().stack;b&&(this.stack=b)}a&&(this.message=String(a))};la(D,Error);D.prototype.name="CustomError";var ma=function(a,b){for(var c=a.split("%s"),d="",e=Array.prototype.slice.call(arguments,1);e.length&&1<c.length;)d+=c.shift()+e.shift();return d+c.join("%s")};var E=function(a,b){b.unshift(a);D.call(this,ma.apply(null,b));b.shift()};la(E,D);E.prototype.name="AssertionError";var na=function(a,b,c,d){var e="Assertion failed";if(c)var e=e+(": "+c),f=d;else a&&(e+=": "+a,f=b);throw new E(""+e,f||[]);},F=function(a,b,c){a||na("",null,b,Array.prototype.slice.call(arguments,2))},G=function(a,b,c){A(a)||na("Expected function but got %s: %s.",[ha(a),a],b,Array.prototype.slice.call(arguments,2))};var H=function(a,b,c){this.ea=c;this.Y=a;this.ga=b;this.A=0;this.w=null};H.prototype.get=function(){var a;0<this.A?(this.A--,a=this.w,this.w=a.next,a.next=null):a=this.Y();return a};H.prototype.put=function(a){this.ga(a);this.A<this.ea&&(this.A++,a.next=this.w,this.w=a)};var I;a:{var oa=x.navigator;if(oa){var pa=oa.userAgent;if(pa){I=pa;break a}}I=""};var qa=function(a){x.setTimeout(function(){throw a;},0)},J,ra=function(){var a=x.MessageChannel;"undefined"===typeof a&&"undefined"!==typeof window&&window.postMessage&&window.addEventListener&&-1==I.indexOf("Presto")&&(a=function(){var a=document.createElement("IFRAME");a.style.display="none";a.src="";document.documentElement.appendChild(a);var b=a.contentWindow,a=b.document;a.open();a.write("");a.close();var c="callImmediate"+Math.random(),d="file:"==b.location.protocol?"*":b.location.protocol+
	"//"+b.location.host,a=B(function(a){if(("*"==d||a.origin==d)&&a.data==c)this.port1.onmessage()},this);b.addEventListener("message",a,!1);this.port1={};this.port2={postMessage:function(){b.postMessage(c,d)}}});if("undefined"!==typeof a&&-1==I.indexOf("Trident")&&-1==I.indexOf("MSIE")){var b=new a,c={},d=c;b.port1.onmessage=function(){if(void 0!==c.next){c=c.next;var a=c.N;c.N=null;a()}};return function(a){d.next={N:a};d=d.next;b.port2.postMessage(0)}}return"undefined"!==typeof document&&"onreadystatechange"in
	document.createElement("SCRIPT")?function(a){var b=document.createElement("SCRIPT");b.onreadystatechange=function(){b.onreadystatechange=null;b.parentNode.removeChild(b);b=null;a();a=null};document.documentElement.appendChild(b)}:function(a){x.setTimeout(a,0)}};var K=function(){this.C=this.g=null},sa=new H(function(){return new L},function(a){a.reset()},100);K.prototype.add=function(a,b){var c=sa.get();c.set(a,b);this.C?this.C.next=c:(F(!this.g),this.g=c);this.C=c};K.prototype.remove=function(){var a=null;this.g&&(a=this.g,this.g=this.g.next,this.g||(this.C=null),a.next=null);return a};var L=function(){this.next=this.scope=this.H=null};L.prototype.set=function(a,b){this.H=a;this.scope=b;this.next=null};
	L.prototype.reset=function(){this.next=this.scope=this.H=null};var O=function(a,b){M||ta();N||(M(),N=!0);ua.add(a,b)},M,ta=function(){var a=x.Promise;if(-1!=String(a).indexOf("[native code]")){var b=a.resolve(void 0);M=function(){b.then(va)}}else M=function(){var a=va,b;!(b=!A(x.setImmediate))&&(b=x.Window&&x.Window.prototype)&&(b=-1==I.indexOf("Edge")&&x.Window.prototype.setImmediate==x.setImmediate);b?(J||(J=ra()),J(a)):x.setImmediate(a)}},N=!1,ua=new K,va=function(){for(var a;a=ua.remove();){try{a.H.call(a.scope)}catch(b){qa(b)}sa.put(a)}N=!1};var Q=function(a,b){this.a=0;this.j=void 0;this.s=this.h=this.B=null;this.v=this.G=!1;if(a!=y)try{var c=this;a.call(b,function(a){P(c,2,a)},function(a){try{if(a instanceof Error)throw a;throw Error("Promise rejected.");}catch(e){}P(c,3,a)})}catch(d){P(this,3,d)}},wa=function(){this.next=this.context=this.i=this.f=this.child=null;this.D=!1};wa.prototype.reset=function(){this.context=this.i=this.f=this.child=null;this.D=!1};
	var xa=new H(function(){return new wa},function(a){a.reset()},100),ya=function(a,b,c){var d=xa.get();d.f=a;d.i=b;d.context=c;return d},Aa=function(a,b,c){za(a,b,c,null)||O(ka(b,a))};Q.prototype.then=function(a,b,c){null!=a&&G(a,"opt_onFulfilled should be a function.");null!=b&&G(b,"opt_onRejected should be a function. Did you pass opt_context as the second argument instead of the third?");return Ba(this,A(a)?a:null,A(b)?b:null,c)};Q.prototype.then=Q.prototype.then;Q.prototype.$goog_Thenable=!0;
	Q.prototype.na=function(a,b){return Ba(this,null,a,b)};var Da=function(a,b){a.h||2!=a.a&&3!=a.a||Ca(a);F(null!=b.f);a.s?a.s.next=b:a.h=b;a.s=b},Ba=function(a,b,c,d){var e=ya(null,null,null);e.child=new Q(function(a,g){e.f=b?function(c){try{var e=b.call(d,c);a(e)}catch(z){g(z)}}:a;e.i=c?function(b){try{var e=c.call(d,b);a(e)}catch(z){g(z)}}:g});e.child.B=a;Da(a,e);return e.child};Q.prototype.oa=function(a){F(1==this.a);this.a=0;P(this,2,a)};
	Q.prototype.pa=function(a){F(1==this.a);this.a=0;P(this,3,a)};
	var P=function(a,b,c){0==a.a&&(a===c&&(b=3,c=new TypeError("Promise cannot resolve to itself")),a.a=1,za(c,a.oa,a.pa,a)||(a.j=c,a.a=b,a.B=null,Ca(a),3!=b||Ea(a,c)))},za=function(a,b,c,d){if(a instanceof Q)return null!=b&&G(b,"opt_onFulfilled should be a function."),null!=c&&G(c,"opt_onRejected should be a function. Did you pass opt_context as the second argument instead of the third?"),Da(a,ya(b||y,c||null,d)),!0;var e;if(a)try{e=!!a.$goog_Thenable}catch(g){e=!1}else e=!1;if(e)return a.then(b,c,d),
	!0;e=typeof a;if("object"==e&&null!=a||"function"==e)try{var f=a.then;if(A(f))return Ga(a,f,b,c,d),!0}catch(g){return c.call(d,g),!0}return!1},Ga=function(a,b,c,d,e){var f=!1,g=function(a){f||(f=!0,c.call(e,a))},k=function(a){f||(f=!0,d.call(e,a))};try{b.call(a,g,k)}catch(l){k(l)}},Ca=function(a){a.G||(a.G=!0,O(a.aa,a))},Ha=function(a){var b=null;a.h&&(b=a.h,a.h=b.next,b.next=null);a.h||(a.s=null);null!=b&&F(null!=b.f);return b};
	Q.prototype.aa=function(){for(var a;a=Ha(this);){var b=this.a,c=this.j;if(3==b&&a.i&&!a.D){var d;for(d=this;d&&d.v;d=d.B)d.v=!1}if(a.child)a.child.B=null,Ia(a,b,c);else try{a.D?a.f.call(a.context):Ia(a,b,c)}catch(e){Ja.call(null,e)}xa.put(a)}this.G=!1};var Ia=function(a,b,c){2==b?a.f.call(a.context,c):a.i&&a.i.call(a.context,c)},Ea=function(a,b){a.v=!0;O(function(){a.v&&Ja.call(null,b)})},Ja=qa;function R(a,b){if(!(b instanceof Object))return b;switch(b.constructor){case Date:return new Date(b.getTime());case Object:void 0===a&&(a={});break;case Array:a=[];break;default:return b}for(var c in b)b.hasOwnProperty(c)&&(a[c]=R(a[c],b[c]));return a};Q.all=function(a){return new Q(function(b,c){var d=a.length,e=[];if(d)for(var f=function(a,c){d--;e[a]=c;0==d&&b(e)},g=function(a){c(a)},k=0,l;k<a.length;k++)l=a[k],Aa(l,ka(f,k),g);else b(e)})};Q.resolve=function(a){if(a instanceof Q)return a;var b=new Q(y);P(b,2,a);return b};Q.reject=function(a){return new Q(function(b,c){c(a)})};Q.prototype["catch"]=Q.prototype.na;var S=Q;"undefined"!==typeof Promise&&(S=Promise);var Ka=S;function La(a,b){a=new T(a,b);return a.subscribe.bind(a)}var T=function(a,b){var c=this;this.b=[];this.T=0;this.task=Ka.resolve();this.u=!1;this.J=b;this.task.then(function(){a(c)}).catch(function(a){c.error(a)})};T.prototype.next=function(a){U(this,function(b){b.next(a)})};T.prototype.error=function(a){U(this,function(b){b.error(a)});this.close(a)};T.prototype.complete=function(){U(this,function(a){a.complete()});this.close()};
	T.prototype.subscribe=function(a,b,c){var d=this,e;if(void 0===a&&void 0===b&&void 0===c)throw Error("Missing Observer.");e=Ma(a)?a:{next:a,error:b,complete:c};void 0===e.next&&(e.next=Na);void 0===e.error&&(e.error=Na);void 0===e.complete&&(e.complete=Na);a=this.qa.bind(this,this.b.length);this.u&&this.task.then(function(){try{d.O?e.error(d.O):e.complete()}catch(f){}});this.b.push(e);return a};
	T.prototype.qa=function(a){void 0!==this.b&&void 0!==this.b[a]&&(delete this.b[a],--this.T,0===this.T&&void 0!==this.J&&this.J(this))};var U=function(a,b){if(!a.u)for(var c=0;c<a.b.length;c++)Oa(a,c,b)},Oa=function(a,b,c){a.task.then(function(){if(void 0!==a.b&&void 0!==a.b[b])try{c(a.b[b])}catch(d){"undefined"!==typeof console&&console.error&&console.error(d)}})};T.prototype.close=function(a){var b=this;this.u||(this.u=!0,void 0!==a&&(this.O=a),this.task.then(function(){b.b=void 0;b.J=void 0}))};
	function Ma(a){if("object"!==typeof a||null===a)return!1;for(var b=n(["next","error","complete"]),c=b.next();!c.done;c=b.next())if(c=c.value,c in a&&"function"===typeof a[c])return!0;return!1}function Na(){};var Pa=Error.captureStackTrace,V=function(a,b){this.code=a;this.message=b;if(Pa)Pa(this,Qa.prototype.create);else{var c=Error.apply(this,arguments);this.name="FirebaseError";Object.defineProperty(this,"stack",{get:function(){return c.stack}})}};V.prototype=Object.create(Error.prototype);V.prototype.constructor=V;V.prototype.name="FirebaseError";var Qa=function(a,b,c){this.ja=a;this.ka=b;this.Z=c;this.pattern=/\{\$([^}]+)}/g};
	Qa.prototype.create=function(a,b){void 0===b&&(b={});var c=this.Z[a];a=this.ja+"/"+a;var c=void 0===c?"Error":c.replace(this.pattern,function(a,c){a=b[c];return void 0!==a?a.toString():"<"+c+"?>"}),c=this.ka+": "+c+" ("+a+").",c=new V(a,c),d;for(d in b)b.hasOwnProperty(d)&&"_"!==d.slice(-1)&&(c[d]=b[d]);return c};var W=S,X=function(a,b,c){var d=this;this.P=c;this.S=!1;this.l={};this.I=b;this.fa=R(void 0,a);Object.keys(c.INTERNAL.factories).forEach(function(a){var b=c.INTERNAL.useAsService(d,a);null!==b&&(b=d.da.bind(d,b),d[a]=b)})};X.prototype.delete=function(){var a=this;return(new W(function(b){Y(a);b()})).then(function(){a.P.INTERNAL.removeApp(a.I);return W.all(Object.keys(a.l).map(function(b){return a.l[b].INTERNAL.delete()}))}).then(function(){a.S=!0;a.l={}})};
	X.prototype.da=function(a){Y(this);void 0===this.l[a]&&(this.l[a]=this.P.INTERNAL.factories[a](this,this.ca.bind(this)));return this.l[a]};X.prototype.ca=function(a){R(this,a)};var Y=function(a){a.S&&Z(Ra("deleted",{name:a.I}))};h.Object.defineProperties(X.prototype,{name:{configurable:!0,enumerable:!0,get:function(){Y(this);return this.I}},options:{configurable:!0,enumerable:!0,get:function(){Y(this);return this.fa}}});X.prototype.name&&X.prototype.options||X.prototype.delete||console.log("dc");
	function Sa(){function a(a){a=a||"[DEFAULT]";var b=d[a];void 0===b&&Z("noApp",{name:a});return b}function b(a,b){Object.keys(e).forEach(function(d){d=c(a,d);if(null!==d&&f[d])f[d](b,a)})}function c(a,b){if("serverAuth"===b)return null;var c=b;a=a.options;"auth"===b&&(a.serviceAccount||a.credential)&&(c="serverAuth","serverAuth"in e||Z("serverAuthMissing"));return c}var d={},e={},f={},g={__esModule:!0,initializeApp:function(a,c){void 0===c?c="[DEFAULT]":"string"===typeof c&&""!==c||Z("bad-app-name",
	{name:c+""});void 0!==d[c]&&Z("dupApp",{name:c});a=new X(a,c,g);d[c]=a;b(a,"create");void 0!=a.INTERNAL&&void 0!=a.INTERNAL.getToken||R(a,{INTERNAL:{getToken:function(){return W.resolve(null)},addAuthTokenListener:function(){},removeAuthTokenListener:function(){}}});return a},app:a,apps:null,Promise:W,SDK_VERSION:"0.0.0",INTERNAL:{registerService:function(b,c,d,v){e[b]&&Z("dupService",{name:b});e[b]=c;v&&(f[b]=v);c=function(c){void 0===c&&(c=a());return c[b]()};void 0!==d&&R(c,d);return g[b]=c},createFirebaseNamespace:Sa,
	extendNamespace:function(a){R(g,a)},createSubscribe:La,ErrorFactory:Qa,removeApp:function(a){b(d[a],"delete");delete d[a]},factories:e,useAsService:c,Promise:Q,deepExtend:R}};g["default"]=g;Object.defineProperty(g,"apps",{get:function(){return Object.keys(d).map(function(a){return d[a]})}});a.App=X;return g}function Z(a,b){throw Error(Ra(a,b));}
	function Ra(a,b){b=b||{};b={noApp:"No Firebase App '"+b.name+"' has been created - call Firebase App.initializeApp().","bad-app-name":"Illegal App name: '"+b.name+"'.",dupApp:"Firebase App named '"+b.name+"' already exists.",deleted:"Firebase App named '"+b.name+"' already deleted.",dupService:"Firebase Service named '"+b.name+"' already registered.",serverAuthMissing:"Initializing the Firebase SDK with a service account is only allowed in a Node.js environment. On client devices, you should instead initialize the SDK with an api key and auth domain."}[a];
	return void 0===b?"Application Error: ("+a+")":b};"undefined"!==typeof firebase&&(firebase=Sa()); })();
	firebase.SDK_VERSION = "3.5.2";
	module.exports = firebase;
	
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	var firebase = __webpack_require__(15);
	/*! @license Firebase v3.5.2
	    Build: 3.5.2-rc.1
	    Terms: https://developers.google.com/terms */
	(function(){var h,aa=aa||{},l=this,ba=function(){},ca=function(){throw Error("unimplemented abstract method");},m=function(a){var b=typeof a;if("object"==b)if(a){if(a instanceof Array)return"array";if(a instanceof Object)return b;var c=Object.prototype.toString.call(a);if("[object Window]"==c)return"object";if("[object Array]"==c||"number"==typeof a.length&&"undefined"!=typeof a.splice&&"undefined"!=typeof a.propertyIsEnumerable&&!a.propertyIsEnumerable("splice"))return"array";if("[object Function]"==c||"undefined"!=
	typeof a.call&&"undefined"!=typeof a.propertyIsEnumerable&&!a.propertyIsEnumerable("call"))return"function"}else return"null";else if("function"==b&&"undefined"==typeof a.call)return"object";return b},da=function(a){return null===a},ea=function(a){return"array"==m(a)},fa=function(a){var b=m(a);return"array"==b||"object"==b&&"number"==typeof a.length},n=function(a){return"string"==typeof a},ga=function(a){return"number"==typeof a},p=function(a){return"function"==m(a)},ha=function(a){var b=typeof a;
	return"object"==b&&null!=a||"function"==b},ia=function(a,b,c){return a.call.apply(a.bind,arguments)},ja=function(a,b,c){if(!a)throw Error();if(2<arguments.length){var d=Array.prototype.slice.call(arguments,2);return function(){var c=Array.prototype.slice.call(arguments);Array.prototype.unshift.apply(c,d);return a.apply(b,c)}}return function(){return a.apply(b,arguments)}},q=function(a,b,c){q=Function.prototype.bind&&-1!=Function.prototype.bind.toString().indexOf("native code")?ia:ja;return q.apply(null,
	arguments)},ka=function(a,b){var c=Array.prototype.slice.call(arguments,1);return function(){var b=c.slice();b.push.apply(b,arguments);return a.apply(this,b)}},la=Date.now||function(){return+new Date},r=function(a,b){function c(){}c.prototype=b.prototype;a.Vc=b.prototype;a.prototype=new c;a.prototype.constructor=a;a.gf=function(a,c,f){for(var d=Array(arguments.length-2),e=2;e<arguments.length;e++)d[e-2]=arguments[e];return b.prototype[c].apply(a,d)}};var u=function(a){if(Error.captureStackTrace)Error.captureStackTrace(this,u);else{var b=Error().stack;b&&(this.stack=b)}a&&(this.message=String(a))};r(u,Error);u.prototype.name="CustomError";var ma=function(a,b){for(var c=a.split("%s"),d="",e=Array.prototype.slice.call(arguments,1);e.length&&1<c.length;)d+=c.shift()+e.shift();return d+c.join("%s")},na=String.prototype.trim?function(a){return a.trim()}:function(a){return a.replace(/^[\s\xa0]+|[\s\xa0]+$/g,"")},oa=/&/g,pa=/</g,qa=/>/g,ra=/"/g,sa=/'/g,ta=/\x00/g,va=/[\x00&<>"']/,v=function(a,b){return-1!=a.indexOf(b)},wa=function(a,b){return a<b?-1:a>b?1:0};var xa=function(a,b){b.unshift(a);u.call(this,ma.apply(null,b));b.shift()};r(xa,u);xa.prototype.name="AssertionError";
	var ya=function(a,b,c,d){var e="Assertion failed";if(c)var e=e+(": "+c),f=d;else a&&(e+=": "+a,f=b);throw new xa(""+e,f||[]);},w=function(a,b,c){a||ya("",null,b,Array.prototype.slice.call(arguments,2))},za=function(a,b){throw new xa("Failure"+(a?": "+a:""),Array.prototype.slice.call(arguments,1));},Aa=function(a,b,c){ga(a)||ya("Expected number but got %s: %s.",[m(a),a],b,Array.prototype.slice.call(arguments,2));return a},Ba=function(a,b,c){n(a)||ya("Expected string but got %s: %s.",[m(a),a],b,Array.prototype.slice.call(arguments,
	2))},Ca=function(a,b,c){p(a)||ya("Expected function but got %s: %s.",[m(a),a],b,Array.prototype.slice.call(arguments,2))};var Da=Array.prototype.indexOf?function(a,b,c){w(null!=a.length);return Array.prototype.indexOf.call(a,b,c)}:function(a,b,c){c=null==c?0:0>c?Math.max(0,a.length+c):c;if(n(a))return n(b)&&1==b.length?a.indexOf(b,c):-1;for(;c<a.length;c++)if(c in a&&a[c]===b)return c;return-1},Ea=Array.prototype.forEach?function(a,b,c){w(null!=a.length);Array.prototype.forEach.call(a,b,c)}:function(a,b,c){for(var d=a.length,e=n(a)?a.split(""):a,f=0;f<d;f++)f in e&&b.call(c,e[f],f,a)},Fa=function(a,b){for(var c=n(a)?
	a.split(""):a,d=a.length-1;0<=d;--d)d in c&&b.call(void 0,c[d],d,a)},Ga=Array.prototype.map?function(a,b,c){w(null!=a.length);return Array.prototype.map.call(a,b,c)}:function(a,b,c){for(var d=a.length,e=Array(d),f=n(a)?a.split(""):a,g=0;g<d;g++)g in f&&(e[g]=b.call(c,f[g],g,a));return e},Ha=Array.prototype.some?function(a,b,c){w(null!=a.length);return Array.prototype.some.call(a,b,c)}:function(a,b,c){for(var d=a.length,e=n(a)?a.split(""):a,f=0;f<d;f++)if(f in e&&b.call(c,e[f],f,a))return!0;return!1},
	Ja=function(a){var b;a:{b=Ia;for(var c=a.length,d=n(a)?a.split(""):a,e=0;e<c;e++)if(e in d&&b.call(void 0,d[e],e,a)){b=e;break a}b=-1}return 0>b?null:n(a)?a.charAt(b):a[b]},Ka=function(a,b){return 0<=Da(a,b)},Ma=function(a,b){b=Da(a,b);var c;(c=0<=b)&&La(a,b);return c},La=function(a,b){w(null!=a.length);return 1==Array.prototype.splice.call(a,b,1).length},Na=function(a,b){var c=0;Fa(a,function(d,e){b.call(void 0,d,e,a)&&La(a,e)&&c++})},Oa=function(a){return Array.prototype.concat.apply(Array.prototype,
	arguments)},Pa=function(a){return Array.prototype.concat.apply(Array.prototype,arguments)},Qa=function(a){var b=a.length;if(0<b){for(var c=Array(b),d=0;d<b;d++)c[d]=a[d];return c}return[]},Ra=function(a,b){for(var c=1;c<arguments.length;c++){var d=arguments[c];if(fa(d)){var e=a.length||0,f=d.length||0;a.length=e+f;for(var g=0;g<f;g++)a[e+g]=d[g]}else a.push(d)}};var Sa=function(a,b){for(var c in a)b.call(void 0,a[c],c,a)},Ta=function(a){var b=[],c=0,d;for(d in a)b[c++]=a[d];return b},Ua=function(a){var b=[],c=0,d;for(d in a)b[c++]=d;return b},Va=function(a){for(var b in a)return!1;return!0},Wa=function(a,b){for(var c in a)if(!(c in b)||a[c]!==b[c])return!1;for(c in b)if(!(c in a))return!1;return!0},Xa=function(a){var b={},c;for(c in a)b[c]=a[c];return b},Ya="constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(" "),
	Za=function(a,b){for(var c,d,e=1;e<arguments.length;e++){d=arguments[e];for(c in d)a[c]=d[c];for(var f=0;f<Ya.length;f++)c=Ya[f],Object.prototype.hasOwnProperty.call(d,c)&&(a[c]=d[c])}};var $a;a:{var ab=l.navigator;if(ab){var bb=ab.userAgent;if(bb){$a=bb;break a}}$a=""}var x=function(a){return v($a,a)};var cb=function(a){cb[" "](a);return a};cb[" "]=ba;var eb=function(a,b){var c=db;return Object.prototype.hasOwnProperty.call(c,a)?c[a]:c[a]=b(a)};var fb=x("Opera"),y=x("Trident")||x("MSIE"),gb=x("Edge"),hb=gb||y,ib=x("Gecko")&&!(v($a.toLowerCase(),"webkit")&&!x("Edge"))&&!(x("Trident")||x("MSIE"))&&!x("Edge"),jb=v($a.toLowerCase(),"webkit")&&!x("Edge"),kb=function(){var a=l.document;return a?a.documentMode:void 0},lb;
	a:{var mb="",nb=function(){var a=$a;if(ib)return/rv\:([^\);]+)(\)|;)/.exec(a);if(gb)return/Edge\/([\d\.]+)/.exec(a);if(y)return/\b(?:MSIE|rv)[: ]([^\);]+)(\)|;)/.exec(a);if(jb)return/WebKit\/(\S+)/.exec(a);if(fb)return/(?:Version)[ \/]?(\S+)/.exec(a)}();nb&&(mb=nb?nb[1]:"");if(y){var ob=kb();if(null!=ob&&ob>parseFloat(mb)){lb=String(ob);break a}}lb=mb}
	var pb=lb,db={},z=function(a){return eb(a,function(){for(var b=0,c=na(String(pb)).split("."),d=na(String(a)).split("."),e=Math.max(c.length,d.length),f=0;0==b&&f<e;f++){var g=c[f]||"",k=d[f]||"";do{g=/(\d*)(\D*)(.*)/.exec(g)||["","","",""];k=/(\d*)(\D*)(.*)/.exec(k)||["","","",""];if(0==g[0].length&&0==k[0].length)break;b=wa(0==g[1].length?0:parseInt(g[1],10),0==k[1].length?0:parseInt(k[1],10))||wa(0==g[2].length,0==k[2].length)||wa(g[2],k[2]);g=g[3];k=k[3]}while(0==b)}return 0<=b})},qb;var rb=l.document;
	qb=rb&&y?kb()||("CSS1Compat"==rb.compatMode?parseInt(pb,10):5):void 0;var sb=null,tb=null,vb=function(a){var b="";ub(a,function(a){b+=String.fromCharCode(a)});return b},ub=function(a,b){function c(b){for(;d<a.length;){var c=a.charAt(d++),e=tb[c];if(null!=e)return e;if(!/^[\s\xa0]*$/.test(c))throw Error("Unknown base64 encoding at char: "+c);}return b}wb();for(var d=0;;){var e=c(-1),f=c(0),g=c(64),k=c(64);if(64===k&&-1===e)break;b(e<<2|f>>4);64!=g&&(b(f<<4&240|g>>2),64!=k&&b(g<<6&192|k))}},wb=function(){if(!sb){sb={};tb={};for(var a=0;65>a;a++)sb[a]="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=".charAt(a),
	tb[sb[a]]=a,62<=a&&(tb["ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_.".charAt(a)]=a)}};var xb=!y||9<=Number(qb),yb=y&&!z("9");!jb||z("528");ib&&z("1.9b")||y&&z("8")||fb&&z("9.5")||jb&&z("528");ib&&!z("8")||y&&z("9");var zb=function(){this.Ba=this.Ba;this.Wb=this.Wb};zb.prototype.Ba=!1;zb.prototype.isDisposed=function(){return this.Ba};zb.prototype.Ra=function(){if(this.Wb)for(;this.Wb.length;)this.Wb.shift()()};var Ab=function(a,b){this.type=a;this.currentTarget=this.target=b;this.defaultPrevented=this.Ya=!1;this.Bd=!0};Ab.prototype.preventDefault=function(){this.defaultPrevented=!0;this.Bd=!1};var Bb=function(a,b){Ab.call(this,a?a.type:"");this.relatedTarget=this.currentTarget=this.target=null;this.charCode=this.keyCode=this.button=this.screenY=this.screenX=this.clientY=this.clientX=this.offsetY=this.offsetX=0;this.metaKey=this.shiftKey=this.altKey=this.ctrlKey=!1;this.ob=this.state=null;a&&this.init(a,b)};r(Bb,Ab);
	Bb.prototype.init=function(a,b){var c=this.type=a.type,d=a.changedTouches?a.changedTouches[0]:null;this.target=a.target||a.srcElement;this.currentTarget=b;if(b=a.relatedTarget){if(ib){var e;a:{try{cb(b.nodeName);e=!0;break a}catch(f){}e=!1}e||(b=null)}}else"mouseover"==c?b=a.fromElement:"mouseout"==c&&(b=a.toElement);this.relatedTarget=b;null===d?(this.offsetX=jb||void 0!==a.offsetX?a.offsetX:a.layerX,this.offsetY=jb||void 0!==a.offsetY?a.offsetY:a.layerY,this.clientX=void 0!==a.clientX?a.clientX:
	a.pageX,this.clientY=void 0!==a.clientY?a.clientY:a.pageY,this.screenX=a.screenX||0,this.screenY=a.screenY||0):(this.clientX=void 0!==d.clientX?d.clientX:d.pageX,this.clientY=void 0!==d.clientY?d.clientY:d.pageY,this.screenX=d.screenX||0,this.screenY=d.screenY||0);this.button=a.button;this.keyCode=a.keyCode||0;this.charCode=a.charCode||("keypress"==c?a.keyCode:0);this.ctrlKey=a.ctrlKey;this.altKey=a.altKey;this.shiftKey=a.shiftKey;this.metaKey=a.metaKey;this.state=a.state;this.ob=a;a.defaultPrevented&&
	this.preventDefault()};Bb.prototype.preventDefault=function(){Bb.Vc.preventDefault.call(this);var a=this.ob;if(a.preventDefault)a.preventDefault();else if(a.returnValue=!1,yb)try{if(a.ctrlKey||112<=a.keyCode&&123>=a.keyCode)a.keyCode=-1}catch(b){}};Bb.prototype.le=function(){return this.ob};var Cb="closure_listenable_"+(1E6*Math.random()|0),Db=0;var Eb=function(a,b,c,d,e){this.listener=a;this.ac=null;this.src=b;this.type=c;this.Gb=!!d;this.Nb=e;this.key=++Db;this.cb=this.Fb=!1},Fb=function(a){a.cb=!0;a.listener=null;a.ac=null;a.src=null;a.Nb=null};var Gb=function(a){this.src=a;this.A={};this.Cb=0};Gb.prototype.add=function(a,b,c,d,e){var f=a.toString();a=this.A[f];a||(a=this.A[f]=[],this.Cb++);var g=Hb(a,b,d,e);-1<g?(b=a[g],c||(b.Fb=!1)):(b=new Eb(b,this.src,f,!!d,e),b.Fb=c,a.push(b));return b};Gb.prototype.remove=function(a,b,c,d){a=a.toString();if(!(a in this.A))return!1;var e=this.A[a];b=Hb(e,b,c,d);return-1<b?(Fb(e[b]),La(e,b),0==e.length&&(delete this.A[a],this.Cb--),!0):!1};
	var Ib=function(a,b){var c=b.type;c in a.A&&Ma(a.A[c],b)&&(Fb(b),0==a.A[c].length&&(delete a.A[c],a.Cb--))};Gb.prototype.Ac=function(a,b,c,d){a=this.A[a.toString()];var e=-1;a&&(e=Hb(a,b,c,d));return-1<e?a[e]:null};var Hb=function(a,b,c,d){for(var e=0;e<a.length;++e){var f=a[e];if(!f.cb&&f.listener==b&&f.Gb==!!c&&f.Nb==d)return e}return-1};var Jb="closure_lm_"+(1E6*Math.random()|0),Kb={},Lb=0,Mb=function(a,b,c,d,e){if(ea(b))for(var f=0;f<b.length;f++)Mb(a,b[f],c,d,e);else c=Nb(c),a&&a[Cb]?a.listen(b,c,d,e):Ob(a,b,c,!1,d,e)},Ob=function(a,b,c,d,e,f){if(!b)throw Error("Invalid event type");var g=!!e,k=Pb(a);k||(a[Jb]=k=new Gb(a));c=k.add(b,c,d,e,f);if(!c.ac){d=Qb();c.ac=d;d.src=a;d.listener=c;if(a.addEventListener)a.addEventListener(b.toString(),d,g);else if(a.attachEvent)a.attachEvent(Rb(b.toString()),d);else throw Error("addEventListener and attachEvent are unavailable.");
	Lb++}},Qb=function(){var a=Sb,b=xb?function(c){return a.call(b.src,b.listener,c)}:function(c){c=a.call(b.src,b.listener,c);if(!c)return c};return b},Tb=function(a,b,c,d,e){if(ea(b))for(var f=0;f<b.length;f++)Tb(a,b[f],c,d,e);else c=Nb(c),a&&a[Cb]?Ub(a,b,c,d,e):Ob(a,b,c,!0,d,e)},Vb=function(a,b,c,d,e){if(ea(b))for(var f=0;f<b.length;f++)Vb(a,b[f],c,d,e);else c=Nb(c),a&&a[Cb]?a.ba.remove(String(b),c,d,e):a&&(a=Pb(a))&&(b=a.Ac(b,c,!!d,e))&&Wb(b)},Wb=function(a){if(!ga(a)&&a&&!a.cb){var b=a.src;if(b&&
	b[Cb])Ib(b.ba,a);else{var c=a.type,d=a.ac;b.removeEventListener?b.removeEventListener(c,d,a.Gb):b.detachEvent&&b.detachEvent(Rb(c),d);Lb--;(c=Pb(b))?(Ib(c,a),0==c.Cb&&(c.src=null,b[Jb]=null)):Fb(a)}}},Rb=function(a){return a in Kb?Kb[a]:Kb[a]="on"+a},Yb=function(a,b,c,d){var e=!0;if(a=Pb(a))if(b=a.A[b.toString()])for(b=b.concat(),a=0;a<b.length;a++){var f=b[a];f&&f.Gb==c&&!f.cb&&(f=Xb(f,d),e=e&&!1!==f)}return e},Xb=function(a,b){var c=a.listener,d=a.Nb||a.src;a.Fb&&Wb(a);return c.call(d,b)},Sb=function(a,
	b){if(a.cb)return!0;if(!xb){if(!b)a:{b=["window","event"];for(var c=l,d;d=b.shift();)if(null!=c[d])c=c[d];else{b=null;break a}b=c}d=b;b=new Bb(d,this);c=!0;if(!(0>d.keyCode||void 0!=d.returnValue)){a:{var e=!1;if(0==d.keyCode)try{d.keyCode=-1;break a}catch(g){e=!0}if(e||void 0==d.returnValue)d.returnValue=!0}d=[];for(e=b.currentTarget;e;e=e.parentNode)d.push(e);a=a.type;for(e=d.length-1;!b.Ya&&0<=e;e--){b.currentTarget=d[e];var f=Yb(d[e],a,!0,b),c=c&&f}for(e=0;!b.Ya&&e<d.length;e++)b.currentTarget=
	d[e],f=Yb(d[e],a,!1,b),c=c&&f}return c}return Xb(a,new Bb(b,this))},Pb=function(a){a=a[Jb];return a instanceof Gb?a:null},Zb="__closure_events_fn_"+(1E9*Math.random()>>>0),Nb=function(a){w(a,"Listener can not be null.");if(p(a))return a;w(a.handleEvent,"An object listener must have handleEvent method.");a[Zb]||(a[Zb]=function(b){return a.handleEvent(b)});return a[Zb]};var $b=/^[+a-zA-Z0-9_.!#$%&'*\/=?^`{|}~-]+@([a-zA-Z0-9-]+\.)+[a-zA-Z0-9]{2,63}$/;var bc=function(){this.kc="";this.Td=ac};bc.prototype.Qb=!0;bc.prototype.Lb=function(){return this.kc};bc.prototype.toString=function(){return"Const{"+this.kc+"}"};var cc=function(a){if(a instanceof bc&&a.constructor===bc&&a.Td===ac)return a.kc;za("expected object of type Const, got '"+a+"'");return"type_error:Const"},ac={},dc=function(a){var b=new bc;b.kc=a;return b};dc("");var fc=function(){this.la="";this.Sd=ec};fc.prototype.Qb=!0;fc.prototype.Lb=function(){return this.la};fc.prototype.toString=function(){return"SafeUrl{"+this.la+"}"};
	var gc=function(a){if(a instanceof fc&&a.constructor===fc&&a.Sd===ec)return a.la;za("expected object of type SafeUrl, got '"+a+"' of type "+m(a));return"type_error:SafeUrl"},hc=/^(?:(?:https?|mailto|ftp):|[^&:/?#]*(?:[/?#]|$))/i,jc=function(a){if(a instanceof fc)return a;a=a.Qb?a.Lb():String(a);hc.test(a)||(a="about:invalid#zClosurez");return ic(a)},ec={},ic=function(a){var b=new fc;b.la=a;return b};ic("about:blank");var kc=function(a){return/^\s*$/.test(a)?!1:/^[\],:{}\s\u2028\u2029]*$/.test(a.replace(/\\["\\\/bfnrtu]/g,"@").replace(/(?:"[^"\\\n\r\u2028\u2029\x00-\x08\x0a-\x1f]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)[\s\u2028\u2029]*(?=:|,|]|}|$)/g,"]").replace(/(?:^|:|,)(?:[\s\u2028\u2029]*\[)+/g,""))},lc=function(a){a=String(a);if(kc(a))try{return eval("("+a+")")}catch(b){}throw Error("Invalid JSON string: "+a);},oc=function(a){var b=[];mc(new nc,a,b);return b.join("")},nc=function(){this.ec=void 0},
	mc=function(a,b,c){if(null==b)c.push("null");else{if("object"==typeof b){if(ea(b)){var d=b;b=d.length;c.push("[");for(var e="",f=0;f<b;f++)c.push(e),e=d[f],mc(a,a.ec?a.ec.call(d,String(f),e):e,c),e=",";c.push("]");return}if(b instanceof String||b instanceof Number||b instanceof Boolean)b=b.valueOf();else{c.push("{");f="";for(d in b)Object.prototype.hasOwnProperty.call(b,d)&&(e=b[d],"function"!=typeof e&&(c.push(f),pc(d,c),c.push(":"),mc(a,a.ec?a.ec.call(b,d,e):e,c),f=","));c.push("}");return}}switch(typeof b){case "string":pc(b,
	c);break;case "number":c.push(isFinite(b)&&!isNaN(b)?String(b):"null");break;case "boolean":c.push(String(b));break;case "function":c.push("null");break;default:throw Error("Unknown type: "+typeof b);}}},qc={'"':'\\"',"\\":"\\\\","/":"\\/","\b":"\\b","\f":"\\f","\n":"\\n","\r":"\\r","\t":"\\t","\x0B":"\\u000b"},rc=/\uffff/.test("\uffff")?/[\\\"\x00-\x1f\x7f-\uffff]/g:/[\\\"\x00-\x1f\x7f-\xff]/g,pc=function(a,b){b.push('"',a.replace(rc,function(a){var b=qc[a];b||(b="\\u"+(a.charCodeAt(0)|65536).toString(16).substr(1),
	qc[a]=b);return b}),'"')};var sc=function(){};sc.prototype.Zc=null;sc.prototype.nb=ca;var tc=function(a){return a.Zc||(a.Zc=a.Tb())};sc.prototype.Tb=ca;var uc,vc=function(){};r(vc,sc);vc.prototype.nb=function(){var a=wc(this);return a?new ActiveXObject(a):new XMLHttpRequest};vc.prototype.Tb=function(){var a={};wc(this)&&(a[0]=!0,a[1]=!0);return a};
	var wc=function(a){if(!a.od&&"undefined"==typeof XMLHttpRequest&&"undefined"!=typeof ActiveXObject){for(var b=["MSXML2.XMLHTTP.6.0","MSXML2.XMLHTTP.3.0","MSXML2.XMLHTTP","Microsoft.XMLHTTP"],c=0;c<b.length;c++){var d=b[c];try{return new ActiveXObject(d),a.od=d}catch(e){}}throw Error("Could not create ActiveXObject. ActiveX might be disabled, or MSXML might not be installed");}return a.od};uc=new vc;var xc=function(){};r(xc,sc);xc.prototype.nb=function(){var a=new XMLHttpRequest;if("withCredentials"in a)return a;if("undefined"!=typeof XDomainRequest)return new yc;throw Error("Unsupported browser");};xc.prototype.Tb=function(){return{}};
	var yc=function(){this.qa=new XDomainRequest;this.readyState=0;this.onreadystatechange=null;this.responseText="";this.status=-1;this.statusText=this.responseXML=null;this.qa.onload=q(this.pe,this);this.qa.onerror=q(this.md,this);this.qa.onprogress=q(this.qe,this);this.qa.ontimeout=q(this.re,this)};h=yc.prototype;h.open=function(a,b,c){if(null!=c&&!c)throw Error("Only async requests are supported.");this.qa.open(a,b)};
	h.send=function(a){if(a)if("string"==typeof a)this.qa.send(a);else throw Error("Only string data is supported");else this.qa.send()};h.abort=function(){this.qa.abort()};h.setRequestHeader=function(){};h.pe=function(){this.status=200;this.responseText=this.qa.responseText;zc(this,4)};h.md=function(){this.status=500;this.responseText="";zc(this,4)};h.re=function(){this.md()};h.qe=function(){this.status=200;zc(this,1)};var zc=function(a,b){a.readyState=b;if(a.onreadystatechange)a.onreadystatechange()};var A=function(a,b){this.h=[];this.g=b;for(var c=!0,d=a.length-1;0<=d;d--){var e=a[d]|0;c&&e==b||(this.h[d]=e,c=!1)}},Ac={},Bc=function(a){if(-128<=a&&128>a){var b=Ac[a];if(b)return b}b=new A([a|0],0>a?-1:0);-128<=a&&128>a&&(Ac[a]=b);return b},D=function(a){if(isNaN(a)||!isFinite(a))return B;if(0>a)return C(D(-a));for(var b=[],c=1,d=0;a>=c;d++)b[d]=a/c|0,c*=4294967296;return new A(b,0)},Cc=function(a,b){if(0==a.length)throw Error("number format error: empty string");b=b||10;if(2>b||36<b)throw Error("radix out of range: "+
	b);if("-"==a.charAt(0))return C(Cc(a.substring(1),b));if(0<=a.indexOf("-"))throw Error('number format error: interior "-" character');for(var c=D(Math.pow(b,8)),d=B,e=0;e<a.length;e+=8){var f=Math.min(8,a.length-e),g=parseInt(a.substring(e,e+f),b);8>f?(f=D(Math.pow(b,f)),d=d.multiply(f).add(D(g))):(d=d.multiply(c),d=d.add(D(g)))}return d},B=Bc(0),Dc=Bc(1),Ec=Bc(16777216),Fc=function(a){if(-1==a.g)return-Fc(C(a));for(var b=0,c=1,d=0;d<a.h.length;d++)b+=Gc(a,d)*c,c*=4294967296;return b};
	A.prototype.toString=function(a){a=a||10;if(2>a||36<a)throw Error("radix out of range: "+a);if(Hc(this))return"0";if(-1==this.g)return"-"+C(this).toString(a);for(var b=D(Math.pow(a,6)),c=this,d="";;){var e=Ic(c,b),c=Jc(c,e.multiply(b)),f=((0<c.h.length?c.h[0]:c.g)>>>0).toString(a),c=e;if(Hc(c))return f+d;for(;6>f.length;)f="0"+f;d=""+f+d}};
	var E=function(a,b){return 0>b?0:b<a.h.length?a.h[b]:a.g},Gc=function(a,b){a=E(a,b);return 0<=a?a:4294967296+a},Hc=function(a){if(0!=a.g)return!1;for(var b=0;b<a.h.length;b++)if(0!=a.h[b])return!1;return!0};A.prototype.Ib=function(a){if(this.g!=a.g)return!1;for(var b=Math.max(this.h.length,a.h.length),c=0;c<b;c++)if(E(this,c)!=E(a,c))return!1;return!0};A.prototype.compare=function(a){a=Jc(this,a);return-1==a.g?-1:Hc(a)?0:1};
	var C=function(a){for(var b=a.h.length,c=[],d=0;d<b;d++)c[d]=~a.h[d];return(new A(c,~a.g)).add(Dc)};A.prototype.add=function(a){for(var b=Math.max(this.h.length,a.h.length),c=[],d=0,e=0;e<=b;e++){var f=d+(E(this,e)&65535)+(E(a,e)&65535),g=(f>>>16)+(E(this,e)>>>16)+(E(a,e)>>>16),d=g>>>16,f=f&65535,g=g&65535;c[e]=g<<16|f}return new A(c,c[c.length-1]&-2147483648?-1:0)};var Jc=function(a,b){return a.add(C(b))};
	A.prototype.multiply=function(a){if(Hc(this)||Hc(a))return B;if(-1==this.g)return-1==a.g?C(this).multiply(C(a)):C(C(this).multiply(a));if(-1==a.g)return C(this.multiply(C(a)));if(0>this.compare(Ec)&&0>a.compare(Ec))return D(Fc(this)*Fc(a));for(var b=this.h.length+a.h.length,c=[],d=0;d<2*b;d++)c[d]=0;for(d=0;d<this.h.length;d++)for(var e=0;e<a.h.length;e++){var f=E(this,d)>>>16,g=E(this,d)&65535,k=E(a,e)>>>16,t=E(a,e)&65535;c[2*d+2*e]+=g*t;Kc(c,2*d+2*e);c[2*d+2*e+1]+=f*t;Kc(c,2*d+2*e+1);c[2*d+2*e+
	1]+=g*k;Kc(c,2*d+2*e+1);c[2*d+2*e+2]+=f*k;Kc(c,2*d+2*e+2)}for(d=0;d<b;d++)c[d]=c[2*d+1]<<16|c[2*d];for(d=b;d<2*b;d++)c[d]=0;return new A(c,0)};
	var Kc=function(a,b){for(;(a[b]&65535)!=a[b];)a[b+1]+=a[b]>>>16,a[b]&=65535,b++},Ic=function(a,b){if(Hc(b))throw Error("division by zero");if(Hc(a))return B;if(-1==a.g)return-1==b.g?Ic(C(a),C(b)):C(Ic(C(a),b));if(-1==b.g)return C(Ic(a,C(b)));if(30<a.h.length){if(-1==a.g||-1==b.g)throw Error("slowDivide_ only works with positive integers.");for(var c=Dc;0>=b.compare(a);)c=c.shiftLeft(1),b=b.shiftLeft(1);var d=Lc(c,1),e=Lc(b,1),f;b=Lc(b,2);for(c=Lc(c,2);!Hc(b);)f=e.add(b),0>=f.compare(a)&&(d=d.add(c),
	e=f),b=Lc(b,1),c=Lc(c,1);return d}for(c=B;0<=a.compare(b);){d=Math.max(1,Math.floor(Fc(a)/Fc(b)));e=Math.ceil(Math.log(d)/Math.LN2);e=48>=e?1:Math.pow(2,e-48);f=D(d);for(var g=f.multiply(b);-1==g.g||0<g.compare(a);)d-=e,f=D(d),g=f.multiply(b);Hc(f)&&(f=Dc);c=c.add(f);a=Jc(a,g)}return c},Mc=function(a,b){for(var c=Math.max(a.h.length,b.h.length),d=[],e=0;e<c;e++)d[e]=E(a,e)|E(b,e);return new A(d,a.g|b.g)};
	A.prototype.shiftLeft=function(a){var b=a>>5;a%=32;for(var c=this.h.length+b+(0<a?1:0),d=[],e=0;e<c;e++)d[e]=0<a?E(this,e-b)<<a|E(this,e-b-1)>>>32-a:E(this,e-b);return new A(d,this.g)};var Lc=function(a,b){var c=b>>5;b%=32;for(var d=a.h.length-c,e=[],f=0;f<d;f++)e[f]=0<b?E(a,f+c)>>>b|E(a,f+c+1)<<32-b:E(a,f+c);return new A(e,a.g)};var Nc=function(a,b){this.sb=a;this.pa=b};Nc.prototype.Ib=function(a){return this.pa==a.pa&&this.sb.Ib(Xa(a.sb))};Nc.prototype.toString=ca;
	var Qc=function(a){try{var b;if(b=0==a.lastIndexOf("[",0)){var c=a.length-1;b=0<=c&&a.indexOf("]",c)==c}return b?new Oc(a.substring(1,a.length-1)):new Pc(a)}catch(d){return null}},Pc=function(a){var b=B;if(a instanceof A){if(0!=a.g||0>a.compare(B)||0<a.compare(Rc))throw Error("The address does not look like an IPv4.");b=Xa(a)}else{if(!Sc.test(a))throw Error(a+" does not look like an IPv4 address.");var c=a.split(".");if(4!=c.length)throw Error(a+" does not look like an IPv4 address.");for(var d=0;d<
	c.length;d++){var e;e=c[d];var f=Number(e);e=0==f&&/^[\s\xa0]*$/.test(e)?NaN:f;if(isNaN(e)||0>e||255<e||1!=c[d].length&&0==c[d].lastIndexOf("0",0))throw Error("In "+a+", octet "+d+" is not valid");e=D(e);b=Mc(b.shiftLeft(8),e)}}Nc.call(this,b,4)};r(Pc,Nc);var Sc=/^[0-9.]*$/,Rc=Jc(Dc.shiftLeft(32),Dc);Pc.prototype.toString=function(){if(this.Ea)return this.Ea;for(var a=Gc(this.sb,0),b=[],c=3;0<=c;c--)b[c]=String(a&255),a>>>=8;return this.Ea=b.join(".")};
	var Oc=function(a){var b=B;if(a instanceof A){if(0!=a.g||0>a.compare(B)||0<a.compare(Tc))throw Error("The address does not look like a valid IPv6.");b=Xa(a)}else{if(!Uc.test(a))throw Error(a+" is not a valid IPv6 address.");var c=a.split(":");if(-1!=c[c.length-1].indexOf(".")){a=Gc(Xa((new Pc(c[c.length-1])).sb),0);var d=[];d.push((a>>>16&65535).toString(16));d.push((a&65535).toString(16));La(c,c.length-1);Ra(c,d);a=c.join(":")}d=a.split("::");if(2<d.length||1==d.length&&8!=c.length)throw Error(a+
	" is not a valid IPv6 address.");if(1<d.length){c=d[0].split(":");d=d[1].split(":");1==c.length&&""==c[0]&&(c=[]);1==d.length&&""==d[0]&&(d=[]);var e=8-(c.length+d.length);if(1>e)c=[];else{for(var f=[],g=0;g<e;g++)f[g]="0";c=Pa(c,f,d)}}if(8!=c.length)throw Error(a+" is not a valid IPv6 address");for(d=0;d<c.length;d++){e=Cc(c[d],16);if(0>e.compare(B)||0<e.compare(Vc))throw Error(c[d]+" in "+a+" is not a valid hextet.");b=Mc(b.shiftLeft(16),e)}}Nc.call(this,b,6)};r(Oc,Nc);
	var Uc=/^([a-fA-F0-9]*:){2}[a-fA-F0-9:.]*$/,Vc=Bc(65535),Tc=Jc(Dc.shiftLeft(128),Dc);Oc.prototype.toString=function(){if(this.Ea)return this.Ea;for(var a=[],b=3;0<=b;b--){var c=Gc(this.sb,b),d=c&65535;a.push((c>>>16).toString(16));a.push(d.toString(16))}for(var c=b=-1,e=d=0,f=0;f<a.length;f++)"0"==a[f]?(e++,-1==c&&(c=f),e>d&&(d=e,b=c)):(c=-1,e=0);0<d&&(b+d==a.length&&a.push(""),a.splice(b,d,""),0==b&&(a=[""].concat(a)));return this.Ea=a.join(":")};var Xc=function(){this.Zb="";this.Ud=Wc};Xc.prototype.Qb=!0;Xc.prototype.Lb=function(){return this.Zb};Xc.prototype.toString=function(){return"TrustedResourceUrl{"+this.Zb+"}"};var Wc={};var Zc=function(){this.la="";this.Rd=Yc};Zc.prototype.Qb=!0;Zc.prototype.Lb=function(){return this.la};Zc.prototype.toString=function(){return"SafeHtml{"+this.la+"}"};var $c=function(a){if(a instanceof Zc&&a.constructor===Zc&&a.Rd===Yc)return a.la;za("expected object of type SafeHtml, got '"+a+"' of type "+m(a));return"type_error:SafeHtml"},Yc={};Zc.prototype.ye=function(a){this.la=a;return this};!ib&&!y||y&&9<=Number(qb)||ib&&z("1.9.1");y&&z("9");var bd=function(a,b){Sa(b,function(b,d){"style"==d?a.style.cssText=b:"class"==d?a.className=b:"for"==d?a.htmlFor=b:ad.hasOwnProperty(d)?a.setAttribute(ad[d],b):0==d.lastIndexOf("aria-",0)||0==d.lastIndexOf("data-",0)?a.setAttribute(d,b):a[d]=b})},ad={cellpadding:"cellPadding",cellspacing:"cellSpacing",colspan:"colSpan",frameborder:"frameBorder",height:"height",maxlength:"maxLength",nonce:"nonce",role:"role",rowspan:"rowSpan",type:"type",usemap:"useMap",valign:"vAlign",width:"width"};var cd=function(a,b,c){this.Be=c;this.ae=a;this.Ne=b;this.Vb=0;this.Ob=null};cd.prototype.get=function(){var a;0<this.Vb?(this.Vb--,a=this.Ob,this.Ob=a.next,a.next=null):a=this.ae();return a};cd.prototype.put=function(a){this.Ne(a);this.Vb<this.Be&&(this.Vb++,a.next=this.Ob,this.Ob=a)};var dd=function(a){l.setTimeout(function(){throw a;},0)},ed,fd=function(){var a=l.MessageChannel;"undefined"===typeof a&&"undefined"!==typeof window&&window.postMessage&&window.addEventListener&&!x("Presto")&&(a=function(){var a=document.createElement("IFRAME");a.style.display="none";a.src="";document.documentElement.appendChild(a);var b=a.contentWindow,a=b.document;a.open();a.write("");a.close();var c="callImmediate"+Math.random(),d="file:"==b.location.protocol?"*":b.location.protocol+"//"+b.location.host,
	a=q(function(a){if(("*"==d||a.origin==d)&&a.data==c)this.port1.onmessage()},this);b.addEventListener("message",a,!1);this.port1={};this.port2={postMessage:function(){b.postMessage(c,d)}}});if("undefined"!==typeof a&&!x("Trident")&&!x("MSIE")){var b=new a,c={},d=c;b.port1.onmessage=function(){if(void 0!==c.next){c=c.next;var a=c.cd;c.cd=null;a()}};return function(a){d.next={cd:a};d=d.next;b.port2.postMessage(0)}}return"undefined"!==typeof document&&"onreadystatechange"in document.createElement("SCRIPT")?
	function(a){var b=document.createElement("SCRIPT");b.onreadystatechange=function(){b.onreadystatechange=null;b.parentNode.removeChild(b);b=null;a();a=null};document.documentElement.appendChild(b)}:function(a){l.setTimeout(a,0)}};var gd=function(){this.pc=this.Ma=null},id=new cd(function(){return new hd},function(a){a.reset()},100);gd.prototype.add=function(a,b){var c=id.get();c.set(a,b);this.pc?this.pc.next=c:(w(!this.Ma),this.Ma=c);this.pc=c};gd.prototype.remove=function(){var a=null;this.Ma&&(a=this.Ma,this.Ma=this.Ma.next,this.Ma||(this.pc=null),a.next=null);return a};var hd=function(){this.next=this.scope=this.zc=null};hd.prototype.set=function(a,b){this.zc=a;this.scope=b;this.next=null};
	hd.prototype.reset=function(){this.next=this.scope=this.zc=null};var nd=function(a,b){jd||kd();ld||(jd(),ld=!0);md.add(a,b)},jd,kd=function(){var a=l.Promise;if(-1!=String(a).indexOf("[native code]")){var b=a.resolve(void 0);jd=function(){b.then(od)}}else jd=function(){var a=od;!p(l.setImmediate)||l.Window&&l.Window.prototype&&!x("Edge")&&l.Window.prototype.setImmediate==l.setImmediate?(ed||(ed=fd()),ed(a)):l.setImmediate(a)}},ld=!1,md=new gd,od=function(){for(var a;a=md.remove();){try{a.zc.call(a.scope)}catch(b){dd(b)}id.put(a)}ld=!1};var pd=function(a){a.prototype.then=a.prototype.then;a.prototype.$goog_Thenable=!0},qd=function(a){if(!a)return!1;try{return!!a.$goog_Thenable}catch(b){return!1}};var F=function(a,b){this.J=0;this.ma=void 0;this.Pa=this.ha=this.s=null;this.Mb=this.yc=!1;if(a!=ba)try{var c=this;a.call(b,function(a){rd(c,2,a)},function(a){if(!(a instanceof sd))try{if(a instanceof Error)throw a;throw Error("Promise rejected.");}catch(e){}rd(c,3,a)})}catch(d){rd(this,3,d)}},td=function(){this.next=this.context=this.Va=this.Ga=this.child=null;this.lb=!1};td.prototype.reset=function(){this.context=this.Va=this.Ga=this.child=null;this.lb=!1};
	var ud=new cd(function(){return new td},function(a){a.reset()},100),vd=function(a,b,c){var d=ud.get();d.Ga=a;d.Va=b;d.context=c;return d},G=function(a){if(a instanceof F)return a;var b=new F(ba);rd(b,2,a);return b},H=function(a){return new F(function(b,c){c(a)})},xd=function(a,b,c){wd(a,b,c,null)||nd(ka(b,a))},yd=function(a){return new F(function(b){var c=a.length,d=[];if(c)for(var e=function(a,e,f){c--;d[a]=e?{ke:!0,value:f}:{ke:!1,reason:f};0==c&&b(d)},f=0,g;f<a.length;f++)g=a[f],xd(g,ka(e,f,!0),
	ka(e,f,!1));else b(d)})};F.prototype.then=function(a,b,c){null!=a&&Ca(a,"opt_onFulfilled should be a function.");null!=b&&Ca(b,"opt_onRejected should be a function. Did you pass opt_context as the second argument instead of the third?");return zd(this,p(a)?a:null,p(b)?b:null,c)};pd(F);var Bd=function(a,b){b=vd(b,b,void 0);b.lb=!0;Ad(a,b);return a};F.prototype.l=function(a,b){return zd(this,null,a,b)};F.prototype.cancel=function(a){0==this.J&&nd(function(){var b=new sd(a);Cd(this,b)},this)};
	var Cd=function(a,b){if(0==a.J)if(a.s){var c=a.s;if(c.ha){for(var d=0,e=null,f=null,g=c.ha;g&&(g.lb||(d++,g.child==a&&(e=g),!(e&&1<d)));g=g.next)e||(f=g);e&&(0==c.J&&1==d?Cd(c,b):(f?(d=f,w(c.ha),w(null!=d),d.next==c.Pa&&(c.Pa=d),d.next=d.next.next):Dd(c),Ed(c,e,3,b)))}a.s=null}else rd(a,3,b)},Ad=function(a,b){a.ha||2!=a.J&&3!=a.J||Fd(a);w(null!=b.Ga);a.Pa?a.Pa.next=b:a.ha=b;a.Pa=b},zd=function(a,b,c,d){var e=vd(null,null,null);e.child=new F(function(a,g){e.Ga=b?function(c){try{var e=b.call(d,c);a(e)}catch(ua){g(ua)}}:
	a;e.Va=c?function(b){try{var e=c.call(d,b);void 0===e&&b instanceof sd?g(b):a(e)}catch(ua){g(ua)}}:g});e.child.s=a;Ad(a,e);return e.child};F.prototype.Xe=function(a){w(1==this.J);this.J=0;rd(this,2,a)};F.prototype.Ye=function(a){w(1==this.J);this.J=0;rd(this,3,a)};
	var rd=function(a,b,c){0==a.J&&(a===c&&(b=3,c=new TypeError("Promise cannot resolve to itself")),a.J=1,wd(c,a.Xe,a.Ye,a)||(a.ma=c,a.J=b,a.s=null,Fd(a),3!=b||c instanceof sd||Gd(a,c)))},wd=function(a,b,c,d){if(a instanceof F)return null!=b&&Ca(b,"opt_onFulfilled should be a function."),null!=c&&Ca(c,"opt_onRejected should be a function. Did you pass opt_context as the second argument instead of the third?"),Ad(a,vd(b||ba,c||null,d)),!0;if(qd(a))return a.then(b,c,d),!0;if(ha(a))try{var e=a.then;if(p(e))return Hd(a,
	e,b,c,d),!0}catch(f){return c.call(d,f),!0}return!1},Hd=function(a,b,c,d,e){var f=!1,g=function(a){f||(f=!0,c.call(e,a))},k=function(a){f||(f=!0,d.call(e,a))};try{b.call(a,g,k)}catch(t){k(t)}},Fd=function(a){a.yc||(a.yc=!0,nd(a.fe,a))},Dd=function(a){var b=null;a.ha&&(b=a.ha,a.ha=b.next,b.next=null);a.ha||(a.Pa=null);null!=b&&w(null!=b.Ga);return b};F.prototype.fe=function(){for(var a;a=Dd(this);)Ed(this,a,this.J,this.ma);this.yc=!1};
	var Ed=function(a,b,c,d){if(3==c&&b.Va&&!b.lb)for(;a&&a.Mb;a=a.s)a.Mb=!1;if(b.child)b.child.s=null,Id(b,c,d);else try{b.lb?b.Ga.call(b.context):Id(b,c,d)}catch(e){Jd.call(null,e)}ud.put(b)},Id=function(a,b,c){2==b?a.Ga.call(a.context,c):a.Va&&a.Va.call(a.context,c)},Gd=function(a,b){a.Mb=!0;nd(function(){a.Mb&&Jd.call(null,b)})},Jd=dd,sd=function(a){u.call(this,a)};r(sd,u);sd.prototype.name="cancel";/*
	 Portions of this code are from MochiKit, received by
	 The Closure Authors under the MIT license. All other code is Copyright
	 2005-2009 The Closure Authors. All Rights Reserved.
	*/
	var Kd=function(a,b){this.gc=[];this.ud=a;this.fd=b||null;this.qb=this.Ta=!1;this.ma=void 0;this.Tc=this.Yc=this.tc=!1;this.nc=0;this.s=null;this.uc=0};Kd.prototype.cancel=function(a){if(this.Ta)this.ma instanceof Kd&&this.ma.cancel();else{if(this.s){var b=this.s;delete this.s;a?b.cancel(a):(b.uc--,0>=b.uc&&b.cancel())}this.ud?this.ud.call(this.fd,this):this.Tc=!0;this.Ta||Ld(this,new Md)}};Kd.prototype.dd=function(a,b){this.tc=!1;Nd(this,a,b)};
	var Nd=function(a,b,c){a.Ta=!0;a.ma=c;a.qb=!b;Od(a)},Qd=function(a){if(a.Ta){if(!a.Tc)throw new Pd;a.Tc=!1}};Kd.prototype.callback=function(a){Qd(this);Rd(a);Nd(this,!0,a)};
	var Ld=function(a,b){Qd(a);Rd(b);Nd(a,!1,b)},Rd=function(a){w(!(a instanceof Kd),"An execution sequence may not be initiated with a blocking Deferred.")},Vd=function(a){var b=Sd("https://apis.google.com/js/client.js?onload="+Td);Ud(b,null,a,void 0)},Ud=function(a,b,c,d){w(!a.Yc,"Blocking Deferreds can not be re-used");a.gc.push([b,c,d]);a.Ta&&Od(a)};Kd.prototype.then=function(a,b,c){var d,e,f=new F(function(a,b){d=a;e=b});Ud(this,d,function(a){a instanceof Md?f.cancel():e(a)});return f.then(a,b,c)};
	pd(Kd);
	var Wd=function(a){return Ha(a.gc,function(a){return p(a[1])})},Od=function(a){if(a.nc&&a.Ta&&Wd(a)){var b=a.nc,c=Xd[b];c&&(l.clearTimeout(c.rb),delete Xd[b]);a.nc=0}a.s&&(a.s.uc--,delete a.s);for(var b=a.ma,d=c=!1;a.gc.length&&!a.tc;){var e=a.gc.shift(),f=e[0],g=e[1],e=e[2];if(f=a.qb?g:f)try{var k=f.call(e||a.fd,b);void 0!==k&&(a.qb=a.qb&&(k==b||k instanceof Error),a.ma=b=k);if(qd(b)||"function"===typeof l.Promise&&b instanceof l.Promise)d=!0,a.tc=!0}catch(t){b=t,a.qb=!0,Wd(a)||(c=!0)}}a.ma=b;d&&
	(k=q(a.dd,a,!0),d=q(a.dd,a,!1),b instanceof Kd?(Ud(b,k,d),b.Yc=!0):b.then(k,d));c&&(b=new Yd(b),Xd[b.rb]=b,a.nc=b.rb)},Pd=function(){u.call(this)};r(Pd,u);Pd.prototype.message="Deferred has already fired";Pd.prototype.name="AlreadyCalledError";var Md=function(){u.call(this)};r(Md,u);Md.prototype.message="Deferred was canceled";Md.prototype.name="CanceledError";var Yd=function(a){this.rb=l.setTimeout(q(this.We,this),0);this.N=a};
	Yd.prototype.We=function(){w(Xd[this.rb],"Cannot throw an error that is not scheduled.");delete Xd[this.rb];throw this.N;};var Xd={};var Sd=function(a){var b=new Xc;b.Zb=a;return Zd(b)},Zd=function(a){var b={},c=b.document||document,d;a instanceof Xc&&a.constructor===Xc&&a.Ud===Wc?d=a.Zb:(za("expected object of type TrustedResourceUrl, got '"+a+"' of type "+m(a)),d="type_error:TrustedResourceUrl");var e=document.createElement("SCRIPT");a={Cd:e,Bb:void 0};var f=new Kd($d,a),g=null,k=null!=b.timeout?b.timeout:5E3;0<k&&(g=window.setTimeout(function(){ae(e,!0);Ld(f,new be(1,"Timeout reached for loading script "+d))},k),a.Bb=g);e.onload=
	e.onreadystatechange=function(){e.readyState&&"loaded"!=e.readyState&&"complete"!=e.readyState||(ae(e,b.hf||!1,g),f.callback(null))};e.onerror=function(){ae(e,!0,g);Ld(f,new be(0,"Error while loading script "+d))};a=b.attributes||{};Za(a,{type:"text/javascript",charset:"UTF-8",src:d});bd(e,a);ce(c).appendChild(e);return f},ce=function(a){var b;return(b=(a||document).getElementsByTagName("HEAD"))&&0!=b.length?b[0]:a.documentElement},$d=function(){if(this&&this.Cd){var a=this.Cd;a&&"SCRIPT"==a.tagName&&
	ae(a,!0,this.Bb)}},ae=function(a,b,c){null!=c&&l.clearTimeout(c);a.onload=ba;a.onerror=ba;a.onreadystatechange=ba;b&&window.setTimeout(function(){a&&a.parentNode&&a.parentNode.removeChild(a)},0)},be=function(a,b){var c="Jsloader error (code #"+a+")";b&&(c+=": "+b);u.call(this,c);this.code=a};r(be,u);var de=function(){zb.call(this);this.ba=new Gb(this);this.Xd=this;this.Ic=null};r(de,zb);de.prototype[Cb]=!0;h=de.prototype;h.addEventListener=function(a,b,c,d){Mb(this,a,b,c,d)};h.removeEventListener=function(a,b,c,d){Vb(this,a,b,c,d)};
	h.dispatchEvent=function(a){ee(this);var b,c=this.Ic;if(c){b=[];for(var d=1;c;c=c.Ic)b.push(c),w(1E3>++d,"infinite loop")}c=this.Xd;d=a.type||a;if(n(a))a=new Ab(a,c);else if(a instanceof Ab)a.target=a.target||c;else{var e=a;a=new Ab(d,c);Za(a,e)}var e=!0,f;if(b)for(var g=b.length-1;!a.Ya&&0<=g;g--)f=a.currentTarget=b[g],e=fe(f,d,!0,a)&&e;a.Ya||(f=a.currentTarget=c,e=fe(f,d,!0,a)&&e,a.Ya||(e=fe(f,d,!1,a)&&e));if(b)for(g=0;!a.Ya&&g<b.length;g++)f=a.currentTarget=b[g],e=fe(f,d,!1,a)&&e;return e};
	h.Ra=function(){de.Vc.Ra.call(this);if(this.ba){var a=this.ba,b=0,c;for(c in a.A){for(var d=a.A[c],e=0;e<d.length;e++)++b,Fb(d[e]);delete a.A[c];a.Cb--}}this.Ic=null};h.listen=function(a,b,c,d){ee(this);return this.ba.add(String(a),b,!1,c,d)};
	var Ub=function(a,b,c,d,e){a.ba.add(String(b),c,!0,d,e)},fe=function(a,b,c,d){b=a.ba.A[String(b)];if(!b)return!0;b=b.concat();for(var e=!0,f=0;f<b.length;++f){var g=b[f];if(g&&!g.cb&&g.Gb==c){var k=g.listener,t=g.Nb||g.src;g.Fb&&Ib(a.ba,g);e=!1!==k.call(t,d)&&e}}return e&&0!=d.Bd};de.prototype.Ac=function(a,b,c,d){return this.ba.Ac(String(a),b,c,d)};var ee=function(a){w(a.ba,"Event target is not initialized. Did you call the superclass (goog.events.EventTarget) constructor?")};var ge="StopIteration"in l?l.StopIteration:{message:"StopIteration",stack:""},he=function(){};he.prototype.next=function(){throw ge;};he.prototype.Wd=function(){return this};var ie=function(a,b){this.ca={};this.v=[];this.pa=this.i=0;var c=arguments.length;if(1<c){if(c%2)throw Error("Uneven number of arguments");for(var d=0;d<c;d+=2)this.set(arguments[d],arguments[d+1])}else a&&this.addAll(a)};h=ie.prototype;h.ld=function(){return this.i};h.X=function(){je(this);for(var a=[],b=0;b<this.v.length;b++)a.push(this.ca[this.v[b]]);return a};h.ja=function(){je(this);return this.v.concat()};h.mb=function(a){return ke(this.ca,a)};
	h.Ib=function(a,b){if(this===a)return!0;if(this.i!=a.ld())return!1;b=b||le;je(this);for(var c,d=0;c=this.v[d];d++)if(!b(this.get(c),a.get(c)))return!1;return!0};var le=function(a,b){return a===b};ie.prototype.remove=function(a){return ke(this.ca,a)?(delete this.ca[a],this.i--,this.pa++,this.v.length>2*this.i&&je(this),!0):!1};
	var je=function(a){if(a.i!=a.v.length){for(var b=0,c=0;b<a.v.length;){var d=a.v[b];ke(a.ca,d)&&(a.v[c++]=d);b++}a.v.length=c}if(a.i!=a.v.length){for(var e={},c=b=0;b<a.v.length;)d=a.v[b],ke(e,d)||(a.v[c++]=d,e[d]=1),b++;a.v.length=c}};h=ie.prototype;h.get=function(a,b){return ke(this.ca,a)?this.ca[a]:b};h.set=function(a,b){ke(this.ca,a)||(this.i++,this.v.push(a),this.pa++);this.ca[a]=b};
	h.addAll=function(a){var b;a instanceof ie?(b=a.ja(),a=a.X()):(b=Ua(a),a=Ta(a));for(var c=0;c<b.length;c++)this.set(b[c],a[c])};h.forEach=function(a,b){for(var c=this.ja(),d=0;d<c.length;d++){var e=c[d],f=this.get(e);a.call(b,f,e,this)}};h.clone=function(){return new ie(this)};h.Wd=function(a){je(this);var b=0,c=this.pa,d=this,e=new he;e.next=function(){if(c!=d.pa)throw Error("The map has changed since the iterator was created");if(b>=d.v.length)throw ge;var e=d.v[b++];return a?e:d.ca[e]};return e};
	var ke=function(a,b){return Object.prototype.hasOwnProperty.call(a,b)};var me=function(a){if(a.X&&"function"==typeof a.X)return a.X();if(n(a))return a.split("");if(fa(a)){for(var b=[],c=a.length,d=0;d<c;d++)b.push(a[d]);return b}return Ta(a)},ne=function(a){if(a.ja&&"function"==typeof a.ja)return a.ja();if(!a.X||"function"!=typeof a.X){if(fa(a)||n(a)){var b=[];a=a.length;for(var c=0;c<a;c++)b.push(c);return b}return Ua(a)}},oe=function(a,b){if(a.forEach&&"function"==typeof a.forEach)a.forEach(b,void 0);else if(fa(a)||n(a))Ea(a,b,void 0);else for(var c=ne(a),d=me(a),
	e=d.length,f=0;f<e;f++)b.call(void 0,d[f],c&&c[f],a)};var pe=function(a,b,c,d,e){this.reset(a,b,c,d,e)};pe.prototype.hd=null;var qe=0;pe.prototype.reset=function(a,b,c,d,e){"number"==typeof e||qe++;d||la();this.ub=a;this.Ge=b;delete this.hd};pe.prototype.Fd=function(a){this.ub=a};var re=function(a){this.He=a;this.nd=this.vc=this.ub=this.s=null},se=function(a,b){this.name=a;this.value=b};se.prototype.toString=function(){return this.name};var te=new se("SEVERE",1E3),ue=new se("CONFIG",700),ve=new se("FINE",500);re.prototype.getParent=function(){return this.s};re.prototype.Fd=function(a){this.ub=a};var we=function(a){if(a.ub)return a.ub;if(a.s)return we(a.s);za("Root logger has no level set.");return null};
	re.prototype.log=function(a,b,c){if(a.value>=we(this).value)for(p(b)&&(b=b()),a=new pe(a,String(b),this.He),c&&(a.hd=c),c="log:"+a.Ge,l.console&&(l.console.timeStamp?l.console.timeStamp(c):l.console.markTimeline&&l.console.markTimeline(c)),l.msWriteProfilerMark&&l.msWriteProfilerMark(c),c=this;c;){b=c;var d=a;if(b.nd)for(var e=0,f;f=b.nd[e];e++)f(d);c=c.getParent()}};
	var xe={},ye=null,ze=function(a){ye||(ye=new re(""),xe[""]=ye,ye.Fd(ue));var b;if(!(b=xe[a])){b=new re(a);var c=a.lastIndexOf("."),d=a.substr(c+1),c=ze(a.substr(0,c));c.vc||(c.vc={});c.vc[d]=b;b.s=c;xe[a]=b}return b};var I=function(a,b){a&&a.log(ve,b,void 0)};var Ae=function(a,b,c){if(p(a))c&&(a=q(a,c));else if(a&&"function"==typeof a.handleEvent)a=q(a.handleEvent,a);else throw Error("Invalid listener argument");return 2147483647<Number(b)?-1:l.setTimeout(a,b||0)},Be=function(a){var b=null;return(new F(function(c,d){b=Ae(function(){c(void 0)},a);-1==b&&d(Error("Failed to schedule timer."))})).l(function(a){l.clearTimeout(b);throw a;})};var Ce=/^(?:([^:/?#.]+):)?(?:\/\/(?:([^/?#]*)@)?([^/#?]*?)(?::([0-9]+))?(?=[/#?]|$))?([^?#]+)?(?:\?([^#]*))?(?:#([\s\S]*))?$/,De=function(a,b){if(a){a=a.split("&");for(var c=0;c<a.length;c++){var d=a[c].indexOf("="),e,f=null;0<=d?(e=a[c].substring(0,d),f=a[c].substring(d+1)):e=a[c];b(e,f?decodeURIComponent(f.replace(/\+/g," ")):"")}}};var J=function(a){de.call(this);this.headers=new ie;this.rc=a||null;this.ra=!1;this.qc=this.b=null;this.tb=this.sd=this.Ub="";this.Da=this.Dc=this.Rb=this.xc=!1;this.ib=0;this.mc=null;this.Ad="";this.oc=this.Me=this.Nd=!1};r(J,de);var Ee=J.prototype,Fe=ze("goog.net.XhrIo");Ee.T=Fe;var Ge=/^https?$/i,He=["POST","PUT"];
	J.prototype.send=function(a,b,c,d){if(this.b)throw Error("[goog.net.XhrIo] Object is active with another request="+this.Ub+"; newUri="+a);b=b?b.toUpperCase():"GET";this.Ub=a;this.tb="";this.sd=b;this.xc=!1;this.ra=!0;this.b=this.rc?this.rc.nb():uc.nb();this.qc=this.rc?tc(this.rc):tc(uc);this.b.onreadystatechange=q(this.xd,this);this.Me&&"onprogress"in this.b&&(this.b.onprogress=q(function(a){this.wd(a,!0)},this),this.b.upload&&(this.b.upload.onprogress=q(this.wd,this)));try{I(this.T,Ie(this,"Opening Xhr")),
	this.Dc=!0,this.b.open(b,String(a),!0),this.Dc=!1}catch(f){I(this.T,Ie(this,"Error opening Xhr: "+f.message));this.N(5,f);return}a=c||"";var e=this.headers.clone();d&&oe(d,function(a,b){e.set(b,a)});d=Ja(e.ja());c=l.FormData&&a instanceof l.FormData;!Ka(He,b)||d||c||e.set("Content-Type","application/x-www-form-urlencoded;charset=utf-8");e.forEach(function(a,b){this.b.setRequestHeader(b,a)},this);this.Ad&&(this.b.responseType=this.Ad);"withCredentials"in this.b&&this.b.withCredentials!==this.Nd&&(this.b.withCredentials=
	this.Nd);try{Je(this),0<this.ib&&(this.oc=Ke(this.b),I(this.T,Ie(this,"Will abort after "+this.ib+"ms if incomplete, xhr2 "+this.oc)),this.oc?(this.b.timeout=this.ib,this.b.ontimeout=q(this.Bb,this)):this.mc=Ae(this.Bb,this.ib,this)),I(this.T,Ie(this,"Sending request")),this.Rb=!0,this.b.send(a),this.Rb=!1}catch(f){I(this.T,Ie(this,"Send error: "+f.message)),this.N(5,f)}};var Ke=function(a){return y&&z(9)&&ga(a.timeout)&&void 0!==a.ontimeout},Ia=function(a){return"content-type"==a.toLowerCase()};
	J.prototype.Bb=function(){"undefined"!=typeof aa&&this.b&&(this.tb="Timed out after "+this.ib+"ms, aborting",I(this.T,Ie(this,this.tb)),this.dispatchEvent("timeout"),this.abort(8))};J.prototype.N=function(a,b){this.ra=!1;this.b&&(this.Da=!0,this.b.abort(),this.Da=!1);this.tb=b;Le(this);Me(this)};var Le=function(a){a.xc||(a.xc=!0,a.dispatchEvent("complete"),a.dispatchEvent("error"))};
	J.prototype.abort=function(){this.b&&this.ra&&(I(this.T,Ie(this,"Aborting")),this.ra=!1,this.Da=!0,this.b.abort(),this.Da=!1,this.dispatchEvent("complete"),this.dispatchEvent("abort"),Me(this))};J.prototype.Ra=function(){this.b&&(this.ra&&(this.ra=!1,this.Da=!0,this.b.abort(),this.Da=!1),Me(this,!0));J.Vc.Ra.call(this)};J.prototype.xd=function(){this.isDisposed()||(this.Dc||this.Rb||this.Da?Ne(this):this.Ke())};J.prototype.Ke=function(){Ne(this)};
	var Ne=function(a){if(a.ra&&"undefined"!=typeof aa)if(a.qc[1]&&4==Oe(a)&&2==Pe(a))I(a.T,Ie(a,"Local request error detected and ignored"));else if(a.Rb&&4==Oe(a))Ae(a.xd,0,a);else if(a.dispatchEvent("readystatechange"),4==Oe(a)){I(a.T,Ie(a,"Request complete"));a.ra=!1;try{var b=Pe(a),c;a:switch(b){case 200:case 201:case 202:case 204:case 206:case 304:case 1223:c=!0;break a;default:c=!1}var d;if(!(d=c)){var e;if(e=0===b){var f=String(a.Ub).match(Ce)[1]||null;if(!f&&l.self&&l.self.location)var g=l.self.location.protocol,
	f=g.substr(0,g.length-1);e=!Ge.test(f?f.toLowerCase():"")}d=e}if(d)a.dispatchEvent("complete"),a.dispatchEvent("success");else{var k;try{k=2<Oe(a)?a.b.statusText:""}catch(t){I(a.T,"Can not get status: "+t.message),k=""}a.tb=k+" ["+Pe(a)+"]";Le(a)}}finally{Me(a)}}};J.prototype.wd=function(a,b){w("progress"===a.type,"goog.net.EventType.PROGRESS is of the same type as raw XHR progress.");this.dispatchEvent(Qe(a,"progress"));this.dispatchEvent(Qe(a,b?"downloadprogress":"uploadprogress"))};
	var Qe=function(a,b){return{type:b,lengthComputable:a.lengthComputable,loaded:a.loaded,total:a.total}},Me=function(a,b){if(a.b){Je(a);var c=a.b,d=a.qc[0]?ba:null;a.b=null;a.qc=null;b||a.dispatchEvent("ready");try{c.onreadystatechange=d}catch(e){(a=a.T)&&a.log(te,"Problem encountered resetting onreadystatechange: "+e.message,void 0)}}},Je=function(a){a.b&&a.oc&&(a.b.ontimeout=null);ga(a.mc)&&(l.clearTimeout(a.mc),a.mc=null)},Oe=function(a){return a.b?a.b.readyState:0},Pe=function(a){try{return 2<Oe(a)?
	a.b.status:-1}catch(b){return-1}},Re=function(a){try{return a.b?a.b.responseText:""}catch(b){return I(a.T,"Can not get responseText: "+b.message),""}},Ie=function(a,b){return b+" ["+a.sd+" "+a.Ub+" "+Pe(a)+"]"};var Se=function(a,b){this.ia=this.Ka=this.na="";this.Xa=null;this.Ca=this.ta="";this.P=this.Ae=!1;var c;a instanceof Se?(this.P=void 0!==b?b:a.P,Te(this,a.na),c=a.Ka,K(this),this.Ka=c,Ue(this,a.ia),Ve(this,a.Xa),We(this,a.ta),Xe(this,a.$.clone()),a=a.Ca,K(this),this.Ca=a):a&&(c=String(a).match(Ce))?(this.P=!!b,Te(this,c[1]||"",!0),a=c[2]||"",K(this),this.Ka=Ye(a),Ue(this,c[3]||"",!0),Ve(this,c[4]),We(this,c[5]||"",!0),Xe(this,c[6]||"",!0),a=c[7]||"",K(this),this.Ca=Ye(a)):(this.P=!!b,this.$=new L(null,
	0,this.P))};Se.prototype.toString=function(){var a=[],b=this.na;b&&a.push(Ze(b,$e,!0),":");var c=this.ia;if(c||"file"==b)a.push("//"),(b=this.Ka)&&a.push(Ze(b,$e,!0),"@"),a.push(encodeURIComponent(String(c)).replace(/%25([0-9a-fA-F]{2})/g,"%$1")),c=this.Xa,null!=c&&a.push(":",String(c));if(c=this.ta)this.ia&&"/"!=c.charAt(0)&&a.push("/"),a.push(Ze(c,"/"==c.charAt(0)?af:bf,!0));(c=this.$.toString())&&a.push("?",c);(c=this.Ca)&&a.push("#",Ze(c,cf));return a.join("")};
	Se.prototype.resolve=function(a){var b=this.clone(),c=!!a.na;c?Te(b,a.na):c=!!a.Ka;if(c){var d=a.Ka;K(b);b.Ka=d}else c=!!a.ia;c?Ue(b,a.ia):c=null!=a.Xa;d=a.ta;if(c)Ve(b,a.Xa);else if(c=!!a.ta){if("/"!=d.charAt(0))if(this.ia&&!this.ta)d="/"+d;else{var e=b.ta.lastIndexOf("/");-1!=e&&(d=b.ta.substr(0,e+1)+d)}e=d;if(".."==e||"."==e)d="";else if(v(e,"./")||v(e,"/.")){for(var d=0==e.lastIndexOf("/",0),e=e.split("/"),f=[],g=0;g<e.length;){var k=e[g++];"."==k?d&&g==e.length&&f.push(""):".."==k?((1<f.length||
	1==f.length&&""!=f[0])&&f.pop(),d&&g==e.length&&f.push("")):(f.push(k),d=!0)}d=f.join("/")}else d=e}c?We(b,d):c=""!==a.$.toString();c?Xe(b,Ye(a.$.toString())):c=!!a.Ca;c&&(a=a.Ca,K(b),b.Ca=a);return b};Se.prototype.clone=function(){return new Se(this)};
	var Te=function(a,b,c){K(a);a.na=c?Ye(b,!0):b;a.na&&(a.na=a.na.replace(/:$/,""))},Ue=function(a,b,c){K(a);a.ia=c?Ye(b,!0):b},Ve=function(a,b){K(a);if(b){b=Number(b);if(isNaN(b)||0>b)throw Error("Bad port number "+b);a.Xa=b}else a.Xa=null},We=function(a,b,c){K(a);a.ta=c?Ye(b,!0):b},Xe=function(a,b,c){K(a);b instanceof L?(a.$=b,a.$.Sc(a.P)):(c||(b=Ze(b,df)),a.$=new L(b,0,a.P))},M=function(a,b,c){K(a);a.$.set(b,c)},ef=function(a,b){K(a);a.$.remove(b)},K=function(a){if(a.Ae)throw Error("Tried to modify a read-only Uri");
	};Se.prototype.Sc=function(a){this.P=a;this.$&&this.$.Sc(a);return this};
	var ff=function(a){return a instanceof Se?a.clone():new Se(a,void 0)},gf=function(a,b){var c=new Se(null,void 0);Te(c,"https");a&&Ue(c,a);b&&We(c,b);return c},Ye=function(a,b){return a?b?decodeURI(a.replace(/%25/g,"%2525")):decodeURIComponent(a):""},Ze=function(a,b,c){return n(a)?(a=encodeURI(a).replace(b,hf),c&&(a=a.replace(/%25([0-9a-fA-F]{2})/g,"%$1")),a):null},hf=function(a){a=a.charCodeAt(0);return"%"+(a>>4&15).toString(16)+(a&15).toString(16)},$e=/[#\/\?@]/g,bf=/[\#\?:]/g,af=/[\#\?]/g,df=/[\#\?@]/g,
	cf=/#/g,L=function(a,b,c){this.i=this.j=null;this.M=a||null;this.P=!!c},jf=function(a){a.j||(a.j=new ie,a.i=0,a.M&&De(a.M,function(b,c){a.add(decodeURIComponent(b.replace(/\+/g," ")),c)}))},lf=function(a){var b=ne(a);if("undefined"==typeof b)throw Error("Keys are undefined");var c=new L(null,0,void 0);a=me(a);for(var d=0;d<b.length;d++){var e=b[d],f=a[d];ea(f)?kf(c,e,f):c.add(e,f)}return c};h=L.prototype;h.ld=function(){jf(this);return this.i};
	h.add=function(a,b){jf(this);this.M=null;a=this.O(a);var c=this.j.get(a);c||this.j.set(a,c=[]);c.push(b);this.i=Aa(this.i)+1;return this};h.remove=function(a){jf(this);a=this.O(a);return this.j.mb(a)?(this.M=null,this.i=Aa(this.i)-this.j.get(a).length,this.j.remove(a)):!1};h.mb=function(a){jf(this);a=this.O(a);return this.j.mb(a)};h.ja=function(){jf(this);for(var a=this.j.X(),b=this.j.ja(),c=[],d=0;d<b.length;d++)for(var e=a[d],f=0;f<e.length;f++)c.push(b[d]);return c};
	h.X=function(a){jf(this);var b=[];if(n(a))this.mb(a)&&(b=Oa(b,this.j.get(this.O(a))));else{a=this.j.X();for(var c=0;c<a.length;c++)b=Oa(b,a[c])}return b};h.set=function(a,b){jf(this);this.M=null;a=this.O(a);this.mb(a)&&(this.i=Aa(this.i)-this.j.get(a).length);this.j.set(a,[b]);this.i=Aa(this.i)+1;return this};h.get=function(a,b){a=a?this.X(a):[];return 0<a.length?String(a[0]):b};var kf=function(a,b,c){a.remove(b);0<c.length&&(a.M=null,a.j.set(a.O(b),Qa(c)),a.i=Aa(a.i)+c.length)};
	L.prototype.toString=function(){if(this.M)return this.M;if(!this.j)return"";for(var a=[],b=this.j.ja(),c=0;c<b.length;c++)for(var d=b[c],e=encodeURIComponent(String(d)),d=this.X(d),f=0;f<d.length;f++){var g=e;""!==d[f]&&(g+="="+encodeURIComponent(String(d[f])));a.push(g)}return this.M=a.join("&")};L.prototype.clone=function(){var a=new L;a.M=this.M;this.j&&(a.j=this.j.clone(),a.i=this.i);return a};L.prototype.O=function(a){a=String(a);this.P&&(a=a.toLowerCase());return a};
	L.prototype.Sc=function(a){a&&!this.P&&(jf(this),this.M=null,this.j.forEach(function(a,c){var b=c.toLowerCase();c!=b&&(this.remove(c),kf(this,b,a))},this));this.P=a};var mf=function(){var a=N();return y&&!!qb&&11==qb||/Edge\/\d+/.test(a)},nf=function(){return l.window&&l.window.location.href||""},of=function(a,b){var c=[],d;for(d in a)d in b?typeof a[d]!=typeof b[d]?c.push(d):ea(a[d])?Wa(a[d],b[d])||c.push(d):"object"==typeof a[d]&&null!=a[d]&&null!=b[d]?0<of(a[d],b[d]).length&&c.push(d):a[d]!==b[d]&&c.push(d):c.push(d);for(d in b)d in a||c.push(d);return c},qf=function(){var a;a=N();a="Chrome"!=pf(a)?null:(a=a.match(/\sChrome\/(\d+)/i))&&2==a.length?parseInt(a[1],
	10):null;return a&&30>a?!1:!y||!qb||9<qb},rf=function(a){a=(a||N()).toLowerCase();return a.match(/android/)||a.match(/webos/)||a.match(/iphone|ipad|ipod/)||a.match(/blackberry/)||a.match(/windows phone/)||a.match(/iemobile/)?!0:!1},sf=function(a){a=a||l.window;try{a.close()}catch(b){}},tf=function(a,b,c){var d=Math.floor(1E9*Math.random()).toString();b=b||500;c=c||600;var e=(window.screen.availHeight-c)/2,f=(window.screen.availWidth-b)/2;b={width:b,height:c,top:0<e?e:0,left:0<f?f:0,location:!0,resizable:!0,
	statusbar:!0,toolbar:!1};d&&(b.target=d);"Firefox"==pf(N())&&(a=a||"http://localhost",b.scrollbars=!0);var g;c=a||"about:blank";(d=b)||(d={});a=window;b=c instanceof fc?c:jc("undefined"!=typeof c.href?c.href:String(c));c=d.target||c.target;e=[];for(g in d)switch(g){case "width":case "height":case "top":case "left":e.push(g+"="+d[g]);break;case "target":case "noreferrer":break;default:e.push(g+"="+(d[g]?1:0))}g=e.join(",");(x("iPhone")&&!x("iPod")&&!x("iPad")||x("iPad")||x("iPod"))&&a.navigator&&a.navigator.standalone&&
	c&&"_self"!=c?(g=a.document.createElement("A"),"undefined"!=typeof HTMLAnchorElement&&"undefined"!=typeof Location&&"undefined"!=typeof Element&&(e=g&&(g instanceof HTMLAnchorElement||!(g instanceof Location||g instanceof Element)),f=ha(g)?g.constructor.displayName||g.constructor.name||Object.prototype.toString.call(g):void 0===g?"undefined":null===g?"null":typeof g,w(e,"Argument is not a HTMLAnchorElement (or a non-Element mock); got: %s",f)),b=b instanceof fc?b:jc(b),g.href=gc(b),g.setAttribute("target",
	c),d.noreferrer&&g.setAttribute("rel","noreferrer"),d=document.createEvent("MouseEvent"),d.initMouseEvent("click",!0,!0,a,1),g.dispatchEvent(d),g={}):d.noreferrer?(g=a.open("",c,g),d=gc(b),g&&(hb&&v(d,";")&&(d="'"+d.replace(/'/g,"%27")+"'"),g.opener=null,a=dc("b/12014412, meta tag with sanitized URL"),va.test(d)&&(-1!=d.indexOf("&")&&(d=d.replace(oa,"&amp;")),-1!=d.indexOf("<")&&(d=d.replace(pa,"&lt;")),-1!=d.indexOf(">")&&(d=d.replace(qa,"&gt;")),-1!=d.indexOf('"')&&(d=d.replace(ra,"&quot;")),-1!=
	d.indexOf("'")&&(d=d.replace(sa,"&#39;")),-1!=d.indexOf("\x00")&&(d=d.replace(ta,"&#0;"))),d='<META HTTP-EQUIV="refresh" content="0; url='+d+'">',Ba(cc(a),"must provide justification"),w(!/^[\s\xa0]*$/.test(cc(a)),"must provide non-empty justification"),g.document.write($c((new Zc).ye(d))),g.document.close())):g=a.open(gc(b),c,g);if(g)try{g.focus()}catch(k){}return g},uf=function(a){return new F(function(b){var c=function(){Be(2E3).then(function(){if(!a||a.closed)b();else return c()})};return c()})},
	vf=function(){var a=null;return(new F(function(b){"complete"==l.document.readyState?b():(a=function(){b()},Tb(window,"load",a))})).l(function(b){Vb(window,"load",a);throw b;})},O=function(a){switch(a||l.navigator&&l.navigator.product||""){case "ReactNative":return"ReactNative";default:return"undefined"!==typeof l.process?"Node":"Browser"}},wf=function(){var a=O();return"ReactNative"===a||"Node"===a},pf=function(a){var b=a.toLowerCase();if(v(b,"opera/")||v(b,"opr/")||v(b,"opios/"))return"Opera";if(v(b,
	"iemobile"))return"IEMobile";if(v(b,"msie")||v(b,"trident/"))return"IE";if(v(b,"edge/"))return"Edge";if(v(b,"firefox/"))return"Firefox";if(v(b,"silk/"))return"Silk";if(v(b,"blackberry"))return"Blackberry";if(v(b,"webos"))return"Webos";if(!v(b,"safari/")||v(b,"chrome/")||v(b,"crios/")||v(b,"android"))if(!v(b,"chrome/")&&!v(b,"crios/")||v(b,"edge/")){if(v(b,"android"))return"Android";if((a=a.match(/([a-zA-Z\d\.]+)\/[a-zA-Z\d\.]*$/))&&2==a.length)return a[1]}else return"Chrome";else return"Safari";return"Other"},
	xf=function(a){var b=O(void 0);return("Browser"===b?pf(N()):b)+"/JsCore/"+a},N=function(){return l.navigator&&l.navigator.userAgent||""},yf=function(a){a=a.split(".");for(var b=l,c=0;c<a.length&&"object"==typeof b&&null!=b;c++)b=b[a[c]];c!=a.length&&(b=void 0);return b},Af=function(){var a;if(!(a=!l.location||!l.location.protocol||"http:"!=l.location.protocol&&"https:"!=l.location.protocol||wf())){var b;a:{try{var c=l.localStorage,d=zf();if(c){c.setItem(d,"1");c.removeItem(d);b=mf()?!!l.indexedDB:
	!0;break a}}catch(e){}b=!1}a=!b}return!a},Bf=function(a){a=a||N();return rf(a)||"Firefox"==pf(a)?!1:!0},Cf=function(a){return"undefined"===typeof a?null:oc(a)},Df=function(a){var b={},c;for(c in a)a.hasOwnProperty(c)&&null!==a[c]&&void 0!==a[c]&&(b[c]=a[c]);return b},Ef=function(a){if(null!==a){var b;try{b=lc(a)}catch(c){try{b=JSON.parse(a)}catch(d){throw c;}}return b}},zf=function(a){return a?a:""+Math.floor(1E9*Math.random()).toString()},Ff=function(a){a=a||N();return"Safari"==pf(a)||a.toLowerCase().match(/iphone|ipad|ipod/)?
	!1:!0},Gf=function(){var a=l.___jsl;if(a&&a.H)for(var b in a.H)if(a.H[b].r=a.H[b].r||[],a.H[b].L=a.H[b].L||[],a.H[b].r=a.H[b].L.concat(),a.CP)for(var c=0;c<a.CP.length;c++)a.CP[c]=null},Hf=function(a,b,c,d){if(a>b)throw Error("Short delay should be less than long delay!");this.Te=a;this.Fe=b;a=d||O();this.ze=rf(c||N())||"ReactNative"===a};Hf.prototype.get=function(){return this.ze?this.Fe:this.Te};var If;try{var Jf={};Object.defineProperty(Jf,"abcd",{configurable:!0,enumerable:!0,value:1});Object.defineProperty(Jf,"abcd",{configurable:!0,enumerable:!0,value:2});If=2==Jf.abcd}catch(a){If=!1}
	var P=function(a,b,c){If?Object.defineProperty(a,b,{configurable:!0,enumerable:!0,value:c}):a[b]=c},Kf=function(a,b){if(b)for(var c in b)b.hasOwnProperty(c)&&P(a,c,b[c])},Lf=function(a){var b={},c;for(c in a)a.hasOwnProperty(c)&&(b[c]=a[c]);return b},Mf=function(a,b){if(!b||!b.length)return!0;if(!a)return!1;for(var c=0;c<b.length;c++){var d=a[b[c]];if(void 0===d||null===d||""===d)return!1}return!0},Nf=function(a){var b=a;if("object"==typeof a&&null!=a){var b="length"in a?[]:{},c;for(c in a)P(b,c,
	Nf(a[c]))}return b};var Of=["client_id","response_type","scope","redirect_uri","state"],Pf={Od:{xb:500,wb:600,providerId:"facebook.com",fc:Of},Pd:{xb:500,wb:620,providerId:"github.com",fc:Of},Qd:{xb:515,wb:680,providerId:"google.com",fc:Of},Vd:{xb:485,wb:705,providerId:"twitter.com",fc:"oauth_consumer_key oauth_nonce oauth_signature oauth_signature_method oauth_timestamp oauth_token oauth_version".split(" ")}},Qf=function(a){for(var b in Pf)if(Pf[b].providerId==a)return Pf[b];return null},Rf=function(a){return(a=Qf(a))&&
	a.fc||[]};var Q=function(a,b){this.code="auth/"+a;this.message=b||Sf[a]||""};r(Q,Error);Q.prototype.K=function(){return{name:this.code,code:this.code,message:this.message}};
	var Sf={"argument-error":"","app-not-authorized":"This app, identified by the domain where it's hosted, is not authorized to use Firebase Authentication with the provided API key. Review your key configuration in the Google API console.","cors-unsupported":"This browser is not supported.","credential-already-in-use":"This credential is already associated with a different user account.","custom-token-mismatch":"The custom token corresponds to a different audience.","requires-recent-login":"This operation is sensitive and requires recent authentication. Log in again before retrying this request.",
	"email-already-in-use":"The email address is already in use by another account.","expired-action-code":"The action code has expired. ","cancelled-popup-request":"This operation has been cancelled due to another conflicting popup being opened.","internal-error":"An internal error has occurred.","invalid-user-token":"The user's credential is no longer valid. The user must sign in again.","invalid-auth-event":"An internal error has occurred.","invalid-custom-token":"The custom token format is incorrect. Please check the documentation.",
	"invalid-email":"The email address is badly formatted.","invalid-api-key":"Your API key is invalid, please check you have copied it correctly.","invalid-credential":"The supplied auth credential is malformed or has expired.","invalid-oauth-provider":"EmailAuthProvider is not supported for this operation. This operation only supports OAuth providers.","unauthorized-domain":"This domain is not authorized for OAuth operations for your Firebase project. Edit the list of authorized domains from the Firebase console.",
	"invalid-action-code":"The action code is invalid. This can happen if the code is malformed, expired, or has already been used.","wrong-password":"The password is invalid or the user does not have a password.","missing-iframe-start":"An internal error has occurred.","auth-domain-config-required":"Be sure to include authDomain when calling firebase.initializeApp(), by following the instructions in the Firebase console.","app-deleted":"This instance of FirebaseApp has been deleted.","account-exists-with-different-credential":"An account already exists with the same email address but different sign-in credentials. Sign in using a provider associated with this email address.",
	"network-request-failed":"A network error (such as timeout, interrupted connection or unreachable host) has occurred.","no-auth-event":"An internal error has occurred.","no-such-provider":"User was not linked to an account with the given provider.","operation-not-allowed":"The given sign-in provider is disabled for this Firebase project. Enable it in the Firebase console, under the sign-in method tab of the Auth section.","operation-not-supported-in-this-environment":'This operation is not supported in the environment this application is running on. "location.protocol" must be http or https and web storage must be enabled.',
	"popup-blocked":"Unable to establish a connection with the popup. It may have been blocked by the browser.","popup-closed-by-user":"The popup has been closed by the user before finalizing the operation.","provider-already-linked":"User can only be linked to one identity for the given provider.",timeout:"The operation has timed out.","user-token-expired":"The user's credential is no longer valid. The user must sign in again.","too-many-requests":"We have blocked all requests from this device due to unusual activity. Try again later.",
	"user-cancelled":"User did not grant your application the permissions it requested.","user-not-found":"There is no user record corresponding to this identifier. The user may have been deleted.","user-disabled":"The user account has been disabled by an administrator.","user-mismatch":"The supplied credentials do not correspond to the previously signed in user.","user-signed-out":"","weak-password":"The password must be 6 characters long or more.","web-storage-unsupported":"This browser is not supported."};var Tf=function(a,b,c,d,e){this.ya=a;this.W=b||null;this.kb=c||null;this.hc=d||null;this.N=e||null;if(this.kb||this.N){if(this.kb&&this.N)throw new Q("invalid-auth-event");if(this.kb&&!this.hc)throw new Q("invalid-auth-event");}else throw new Q("invalid-auth-event");};Tf.prototype.getError=function(){return this.N};Tf.prototype.K=function(){return{type:this.ya,eventId:this.W,urlResponse:this.kb,sessionId:this.hc,error:this.N&&this.N.K()}};var Uf=function(a){var b="unauthorized-domain",c=void 0,d=ff(a);a=d.ia;d=d.na;"http"!=d&&"https"!=d?b="operation-not-supported-in-this-environment":c=ma("This domain (%s) is not authorized to run this operation. Add it to the OAuth redirect domains list in the Firebase console -> Auth section -> Sign in method tab.",a);Q.call(this,b,c)};r(Uf,Q);var Vf=function(a){this.Ee=a.sub;la();this.Hb=a.email||null};var Wf=function(a,b,c,d){var e={};ha(c)?e=c:b&&n(c)&&n(d)?e={oauthToken:c,oauthTokenSecret:d}:!b&&n(c)&&(e={accessToken:c});if(b||!e.idToken&&!e.accessToken)if(b&&e.oauthToken&&e.oauthTokenSecret)P(this,"accessToken",e.oauthToken),P(this,"secret",e.oauthTokenSecret);else{if(b)throw new Q("argument-error","credential failed: expected 2 arguments (the OAuth access token and secret).");throw new Q("argument-error","credential failed: expected 1 argument (the OAuth access token).");}else e.idToken&&P(this,
	"idToken",e.idToken),e.accessToken&&P(this,"accessToken",e.accessToken);P(this,"provider",a)};Wf.prototype.Kb=function(a){return Xf(a,Yf(this))};Wf.prototype.td=function(a,b){var c=Yf(this);c.idToken=b;return Zf(a,c)};var Yf=function(a){var b={};a.idToken&&(b.id_token=a.idToken);a.accessToken&&(b.access_token=a.accessToken);a.secret&&(b.oauth_token_secret=a.secret);b.providerId=a.provider;return{postBody:lf(b).toString(),requestUri:Af()?nf():"http://localhost"}};
	Wf.prototype.K=function(){var a={provider:this.provider};this.idToken&&(a.oauthIdToken=this.idToken);this.accessToken&&(a.oauthAccessToken=this.accessToken);this.secret&&(a.oauthTokenSecret=this.secret);return a};
	var $f=function(a,b,c){var d=!!b,e=c||[];b=function(){Kf(this,{providerId:a,isOAuthProvider:!0});this.Rc=[];this.ed={};"google.com"==a&&this.addScope("profile")};d||(b.prototype.addScope=function(a){Ka(this.Rc,a)||this.Rc.push(a)});b.prototype.setCustomParameters=function(a){this.ed=Xa(a)};b.prototype.me=function(){var a=Df(this.ed),b;for(b in a)a[b]=a[b].toString();a=Xa(a);for(b=0;b<e.length;b++){var c=e[b];c in a&&delete a[c]}return a};b.prototype.ne=function(){return Qa(this.Rc)};b.credential=
	function(b,c){return new Wf(a,d,b,c)};Kf(b,{PROVIDER_ID:a});return b},ag=$f("facebook.com",!1,Rf("facebook.com"));ag.prototype.addScope=ag.prototype.addScope||void 0;var bg=$f("github.com",!1,Rf("github.com"));bg.prototype.addScope=bg.prototype.addScope||void 0;var cg=$f("google.com",!1,Rf("google.com"));cg.prototype.addScope=cg.prototype.addScope||void 0;
	cg.credential=function(a,b){if(!a&&!b)throw new Q("argument-error","credential failed: must provide the ID token and/or the access token.");return new Wf("google.com",!1,ha(a)?a:{idToken:a||null,accessToken:b||null})};var dg=$f("twitter.com",!0,Rf("twitter.com")),eg=function(a,b){this.Hb=a;this.Jc=b;P(this,"provider","password")};eg.prototype.Kb=function(a){return R(a,fg,{email:this.Hb,password:this.Jc})};eg.prototype.td=function(a,b){return R(a,gg,{idToken:b,email:this.Hb,password:this.Jc})};
	eg.prototype.K=function(){return{email:this.Hb,password:this.Jc}};var hg=function(){Kf(this,{providerId:"password",isOAuthProvider:!1})};Kf(hg,{PROVIDER_ID:"password"});var ig={ff:hg,Od:ag,Qd:cg,Pd:bg,Vd:dg},jg=function(a){var b=a&&a.providerId;if(!b)return null;var c=a&&a.oauthAccessToken,d=a&&a.oauthTokenSecret;a=a&&a.oauthIdToken;for(var e in ig)if(ig[e].PROVIDER_ID==b)try{return ig[e].credential({accessToken:c,idToken:a,oauthToken:c,oauthTokenSecret:d})}catch(f){break}return null};var kg=function(a,b,c,d){Q.call(this,a,d);P(this,"email",b);P(this,"credential",c)};r(kg,Q);kg.prototype.K=function(){var a={code:this.code,message:this.message,email:this.email},b=this.credential&&this.credential.K();b&&(Za(a,b),a.providerId=b.provider,delete a.provider);return a};var lg=function(a){if(a.code){var b=a.code||"";0==b.indexOf("auth/")&&(b=b.substring(5));return a.email?new kg(b,a.email,jg(a),a.message):new Q(b,a.message||void 0)}return null};var mg=function(a){this.ef=a};r(mg,sc);mg.prototype.nb=function(){return new this.ef};mg.prototype.Tb=function(){return{}};
	var S=function(a,b,c){var d;d="Node"==O();d=l.XMLHttpRequest||d&&firebase.INTERNAL.node&&firebase.INTERNAL.node.XMLHttpRequest;if(!d)throw new Q("internal-error","The XMLHttpRequest compatibility library was not found.");this.m=a;a=b||{};this.Pe=a.secureTokenEndpoint||"https://securetoken.googleapis.com/v1/token";this.Qe=a.secureTokenTimeout||ng;this.Dd=Xa(a.secureTokenHeaders||og);this.ie=a.firebaseEndpoint||"https://www.googleapis.com/identitytoolkit/v3/relyingparty/";this.je=a.firebaseTimeout||
	pg;this.kd=Xa(a.firebaseHeaders||qg);c&&(this.kd["X-Client-Version"]=c,this.Dd["X-Client-Version"]=c);this.$d=new xc;this.df=new mg(d)},rg,ng=new Hf(1E4,3E4),og={"Content-Type":"application/x-www-form-urlencoded"},pg=new Hf(1E4,3E4),qg={"Content-Type":"application/json"},tg=function(a,b,c,d,e,f,g){qf()?a=q(a.Se,a):(rg||(rg=new F(function(a,b){sg(a,b)})),a=q(a.Re,a));a(b,c,d,e,f,g)};
	S.prototype.Se=function(a,b,c,d,e,f){var g="Node"==O(),k=wf()?g?new J(this.df):new J:new J(this.$d),t;f&&(k.ib=Math.max(0,f),t=setTimeout(function(){k.dispatchEvent("timeout")},f));k.listen("complete",function(){t&&clearTimeout(t);var a=null;try{var c;c=this.b?lc(this.b.responseText):void 0;a=c||null}catch(fj){try{a=JSON.parse(Re(this))||null}catch(gj){a=null}}b&&b(a)});Ub(k,"ready",function(){t&&clearTimeout(t);this.Ba||(this.Ba=!0,this.Ra())});Ub(k,"timeout",function(){t&&clearTimeout(t);this.Ba||
	(this.Ba=!0,this.Ra());b&&b(null)});k.send(a,c,d,e)};var Td="__fcb"+Math.floor(1E6*Math.random()).toString(),sg=function(a,b){((window.gapi||{}).client||{}).request?a():(l[Td]=function(){((window.gapi||{}).client||{}).request?a():b(Error("CORS_UNSUPPORTED"))},Vd(function(){b(Error("CORS_UNSUPPORTED"))}))};
	S.prototype.Re=function(a,b,c,d,e){var f=this;rg.then(function(){window.gapi.client.setApiKey(f.m);var g=window.gapi.auth.getToken();window.gapi.auth.setToken(null);window.gapi.client.request({path:a,method:c,body:d,headers:e,authType:"none",callback:function(a){window.gapi.auth.setToken(g);b&&b(a)}})}).l(function(a){b&&b({error:{message:a&&a.message||"CORS_UNSUPPORTED"}})})};
	var vg=function(a,b){return new F(function(c,d){"refresh_token"==b.grant_type&&b.refresh_token||"authorization_code"==b.grant_type&&b.code?tg(a,a.Pe+"?key="+encodeURIComponent(a.m),function(a){a?a.error?d(ug(a)):a.access_token&&a.refresh_token?c(a):d(new Q("internal-error")):d(new Q("network-request-failed"))},"POST",lf(b).toString(),a.Dd,a.Qe.get()):d(new Q("internal-error"))})},wg=function(a,b,c,d,e){var f=a.ie+b+"?key="+encodeURIComponent(a.m);e&&(f+="&cb="+la().toString());return new F(function(b,
	e){tg(a,f,function(a){a?a.error?e(ug(a)):b(a):e(new Q("network-request-failed"))},c,oc(Df(d)),a.kd,a.je.get())})},xg=function(a){if(!$b.test(a.email))throw new Q("invalid-email");},yg=function(a){"email"in a&&xg(a)},Ag=function(a,b){var c=Af()?nf():"http://localhost";return R(a,zg,{identifier:b,continueUri:c}).then(function(a){return a.allProviders||[]})},Cg=function(a){return R(a,Bg,{}).then(function(a){return a.authorizedDomains||[]})},Dg=function(a){if(!a.idToken)throw new Q("internal-error");
	};S.prototype.signInAnonymously=function(){return R(this,Eg,{})};S.prototype.updateEmail=function(a,b){return R(this,Fg,{idToken:a,email:b})};S.prototype.updatePassword=function(a,b){return R(this,gg,{idToken:a,password:b})};var Gg={displayName:"DISPLAY_NAME",photoUrl:"PHOTO_URL"};S.prototype.updateProfile=function(a,b){var c={idToken:a},d=[];Sa(Gg,function(a,f){var e=b[f];null===e?d.push(a):f in b&&(c[f]=e)});d.length&&(c.deleteAttribute=d);return R(this,Fg,c)};
	S.prototype.sendPasswordResetEmail=function(a){return R(this,Hg,{requestType:"PASSWORD_RESET",email:a})};S.prototype.sendEmailVerification=function(a){return R(this,Ig,{requestType:"VERIFY_EMAIL",idToken:a})};
	var Kg=function(a,b,c){return R(a,Jg,{idToken:b,deleteProvider:c})},Lg=function(a){if(!a.requestUri||!a.sessionId&&!a.postBody)throw new Q("internal-error");},Mg=function(a){var b=null;a.needConfirmation?(a.code="account-exists-with-different-credential",b=lg(a)):"FEDERATED_USER_ID_ALREADY_LINKED"==a.errorMessage?(a.code="credential-already-in-use",b=lg(a)):"EMAIL_EXISTS"==a.errorMessage&&(a.code="email-already-in-use",b=lg(a));if(b)throw b;if(!a.idToken)throw new Q("internal-error");},Xf=function(a,
	b){b.returnIdpCredential=!0;return R(a,Ng,b)},Zf=function(a,b){b.returnIdpCredential=!0;return R(a,Og,b)},Pg=function(a){if(!a.oobCode)throw new Q("invalid-action-code");};S.prototype.confirmPasswordReset=function(a,b){return R(this,Qg,{oobCode:a,newPassword:b})};S.prototype.checkActionCode=function(a){return R(this,Rg,{oobCode:a})};S.prototype.applyActionCode=function(a){return R(this,Sg,{oobCode:a})};
	var Sg={endpoint:"setAccountInfo",I:Pg,gb:"email"},Rg={endpoint:"resetPassword",I:Pg,wa:function(a){if(!a.email||!a.requestType)throw new Q("internal-error");}},Tg={endpoint:"signupNewUser",I:function(a){xg(a);if(!a.password)throw new Q("weak-password");},wa:Dg,xa:!0},zg={endpoint:"createAuthUri"},Ug={endpoint:"deleteAccount",eb:["idToken"]},Jg={endpoint:"setAccountInfo",eb:["idToken","deleteProvider"],I:function(a){if(!ea(a.deleteProvider))throw new Q("internal-error");}},Vg={endpoint:"getAccountInfo"},
	Ig={endpoint:"getOobConfirmationCode",eb:["idToken","requestType"],I:function(a){if("VERIFY_EMAIL"!=a.requestType)throw new Q("internal-error");},gb:"email"},Hg={endpoint:"getOobConfirmationCode",eb:["requestType"],I:function(a){if("PASSWORD_RESET"!=a.requestType)throw new Q("internal-error");xg(a)},gb:"email"},Bg={Zd:!0,endpoint:"getProjectConfig",ue:"GET"},Qg={endpoint:"resetPassword",I:Pg,gb:"email"},Fg={endpoint:"setAccountInfo",eb:["idToken"],I:yg,xa:!0},gg={endpoint:"setAccountInfo",eb:["idToken"],
	I:function(a){yg(a);if(!a.password)throw new Q("weak-password");},wa:Dg,xa:!0},Eg={endpoint:"signupNewUser",wa:Dg,xa:!0},Ng={endpoint:"verifyAssertion",I:Lg,wa:Mg,xa:!0},Og={endpoint:"verifyAssertion",I:function(a){Lg(a);if(!a.idToken)throw new Q("internal-error");},wa:Mg,xa:!0},Wg={endpoint:"verifyCustomToken",I:function(a){if(!a.token)throw new Q("invalid-custom-token");},wa:Dg,xa:!0},fg={endpoint:"verifyPassword",I:function(a){xg(a);if(!a.password)throw new Q("wrong-password");},wa:Dg,xa:!0},R=
	function(a,b,c){if(!Mf(c,b.eb))return H(new Q("internal-error"));var d=b.ue||"POST",e;return G(c).then(b.I).then(function(){b.xa&&(c.returnSecureToken=!0);return wg(a,b.endpoint,d,c,b.Zd||!1)}).then(function(a){return e=a}).then(b.wa).then(function(){if(!b.gb)return e;if(!(b.gb in e))throw new Q("internal-error");return e[b.gb]})},ug=function(a){var b,c;c=(a.error&&a.error.errors&&a.error.errors[0]||{}).reason||"";var d={keyInvalid:"invalid-api-key",ipRefererBlocked:"app-not-authorized"};if(c=d[c]?
	new Q(d[c]):null)return c;c=a.error&&a.error.message||"";d={INVALID_CUSTOM_TOKEN:"invalid-custom-token",CREDENTIAL_MISMATCH:"custom-token-mismatch",MISSING_CUSTOM_TOKEN:"internal-error",INVALID_IDENTIFIER:"invalid-email",MISSING_CONTINUE_URI:"internal-error",INVALID_EMAIL:"invalid-email",INVALID_PASSWORD:"wrong-password",USER_DISABLED:"user-disabled",MISSING_PASSWORD:"internal-error",EMAIL_EXISTS:"email-already-in-use",PASSWORD_LOGIN_DISABLED:"operation-not-allowed",INVALID_IDP_RESPONSE:"invalid-credential",
	FEDERATED_USER_ID_ALREADY_LINKED:"credential-already-in-use",EMAIL_NOT_FOUND:"user-not-found",EXPIRED_OOB_CODE:"expired-action-code",INVALID_OOB_CODE:"invalid-action-code",MISSING_OOB_CODE:"internal-error",CREDENTIAL_TOO_OLD_LOGIN_AGAIN:"requires-recent-login",INVALID_ID_TOKEN:"invalid-user-token",TOKEN_EXPIRED:"user-token-expired",USER_NOT_FOUND:"user-token-expired",CORS_UNSUPPORTED:"cors-unsupported",TOO_MANY_ATTEMPTS_TRY_LATER:"too-many-requests",WEAK_PASSWORD:"weak-password",OPERATION_NOT_ALLOWED:"operation-not-allowed",
	USER_CANCELLED:"user-cancelled"};b=(b=c.match(/^[^\s]+\s*:\s*(.*)$/))&&1<b.length?b[1]:void 0;for(var e in d)if(0===c.indexOf(e))return new Q(d[e],b);!b&&a&&(b=Cf(a));return new Q("internal-error",b)};var Xg=function(a){this.U=a};Xg.prototype.value=function(){return this.U};Xg.prototype.Gd=function(a){this.U.style=a;return this};var Yg=function(a){this.U=a||{}};Yg.prototype.value=function(){return this.U};Yg.prototype.Gd=function(a){this.U.style=a;return this};var $g=function(a){this.cf=a;this.Cc=null;this.vd=Zg(this)};$g.prototype.Hc=function(){return this.vd};
	var ah=function(a){var b=new Yg;b.U.where=document.body;b.U.url=a.cf;b.U.messageHandlersFilter=yf("gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER");b.U.attributes=b.U.attributes||{};(new Xg(b.U.attributes)).Gd({position:"absolute",top:"-100px",width:"1px",height:"1px"});b.U.dontclear=!0;return b},Zg=function(a){return bh().then(function(){return new F(function(b,c){yf("gapi.iframes.getContext")().open(ah(a).value(),function(d){a.Cc=d;a.Cc.restyle({setHideOnLeave:!1});var e=setTimeout(function(){c(Error("Network Error"))},
	ch.get()),f=function(){clearTimeout(e);b()};d.ping(f).then(f,function(){c(Error("Network Error"))})})})})},dh=function(a,b){a.vd.then(function(){a.Cc.register("authEvent",b,yf("gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER"))})},eh=new Hf(3E3,15E3),ch=new Hf(5E3,15E3),bh=function(){return new F(function(a,b){var c=function(){Gf();yf("gapi.load")("gapi.iframes",{callback:a,ontimeout:function(){Gf();b(Error("Network Error"))},timeout:eh.get()})};if(yf("gapi.iframes.Iframe"))a();else if(yf("gapi.load"))c();
	else{var d="__iframefcb"+Math.floor(1E6*Math.random()).toString();l[d]=function(){yf("gapi.load")?c():b(Error("Network Error"))};G(Sd("https://apis.google.com/js/api.js?onload="+d)).l(function(){b(Error("Network Error"))})}})};var fh=function(a,b,c){this.C=a;this.m=b;this.F=c;this.La=null;this.u=gf(this.C,"/__/auth/iframe");M(this.u,"apiKey",this.m);M(this.u,"appName",this.F)};fh.prototype.setVersion=function(a){this.La=a;return this};fh.prototype.toString=function(){this.La?M(this.u,"v",this.La):ef(this.u,"v");return this.u.toString()};
	var gh=function(a,b,c,d,e){this.C=a;this.m=b;this.F=c;this.Yd=d;this.La=this.W=this.Pc=null;this.$b=e;this.u=gf(this.C,"/__/auth/handler");M(this.u,"apiKey",this.m);M(this.u,"appName",this.F);M(this.u,"authType",this.Yd)};gh.prototype.setVersion=function(a){this.La=a;return this};
	gh.prototype.toString=function(){if(this.$b.isOAuthProvider){M(this.u,"providerId",this.$b.providerId);var a=this.$b.ne();a&&a.length&&M(this.u,"scopes",a.join(","));a=this.$b.me();Va(a)||M(this.u,"customParameters",Cf(a))}this.Pc?M(this.u,"redirectUrl",this.Pc):ef(this.u,"redirectUrl");this.W?M(this.u,"eventId",this.W):ef(this.u,"eventId");this.La?M(this.u,"v",this.La):ef(this.u,"v");return this.u.toString()};
	var ih=function(a,b,c,d){this.C=a;this.m=b;this.F=c;d=this.Aa=d||null;this.ve=(new fh(a,b,c)).setVersion(d).toString();this.pd=new $g(this.ve);this.Db=[];hh(this)};ih.prototype.Hc=function(){return this.pd.Hc()};
	var jh=function(a,b,c,d,e,f,g,k){a=new gh(a,b,c,d,e);a.Pc=f;a.W=g;return a.setVersion(k).toString()},hh=function(a){dh(a.pd,function(b){var c={};if(b&&b.authEvent){var d=!1;b=b.authEvent||{};if(b.type){if(c=b.error)var e=(c=b.error)&&(c.name||c.code),c=e?new Q(e.substring(5),c.message):null;b=new Tf(b.type,b.eventId,b.urlResponse,b.sessionId,c)}else b=null;for(c=0;c<a.Db.length;c++)d=a.Db[c](b)||d;c={};c.status=d?"ACK":"ERROR";return G(c)}c.status="ERROR";return G(c)})},kh=function(a,b){Na(a.Db,function(a){return a==
	b})};var lh=function(a){this.w=a||firebase.INTERNAL.reactNative&&firebase.INTERNAL.reactNative.AsyncStorage;if(!this.w)throw new Q("internal-error","The React Native compatibility library was not found.");};h=lh.prototype;h.get=function(a){return G(this.w.getItem(a)).then(function(a){return a&&Ef(a)})};h.set=function(a,b){return G(this.w.setItem(a,Cf(b)))};h.remove=function(a){return G(this.w.removeItem(a))};h.Na=function(){};h.bb=function(){};var mh=function(){this.w={}};h=mh.prototype;h.get=function(a){return G(this.w[a])};h.set=function(a,b){this.w[a]=b;return G()};h.remove=function(a){delete this.w[a];return G()};h.Na=function(){};h.bb=function(){};var oh=function(){if(!nh()){if("Node"==O())throw new Q("internal-error","The LocalStorage compatibility library was not found.");throw new Q("web-storage-unsupported");}this.w=l.localStorage||firebase.INTERNAL.node.localStorage},nh=function(){var a="Node"==O(),a=l.localStorage||a&&firebase.INTERNAL.node&&firebase.INTERNAL.node.localStorage;if(!a)return!1;try{return a.setItem("__sak","1"),a.removeItem("__sak"),!0}catch(b){return!1}};h=oh.prototype;
	h.get=function(a){var b=this;return G().then(function(){var c=b.w.getItem(a);return Ef(c)})};h.set=function(a,b){var c=this;return G().then(function(){var d=Cf(b);null===d?c.remove(a):c.w.setItem(a,d)})};h.remove=function(a){var b=this;return G().then(function(){b.w.removeItem(a)})};h.Na=function(a){l.window&&Mb(l.window,"storage",a)};h.bb=function(a){l.window&&Vb(l.window,"storage",a)};var ph=function(){this.w={}};h=ph.prototype;h.get=function(){return G(null)};h.set=function(){return G()};h.remove=function(){return G()};h.Na=function(){};h.bb=function(){};var rh=function(){if(!qh()){if("Node"==O())throw new Q("internal-error","The SessionStorage compatibility library was not found.");throw new Q("web-storage-unsupported");}this.w=l.sessionStorage||firebase.INTERNAL.node.sessionStorage},qh=function(){var a="Node"==O(),a=l.sessionStorage||a&&firebase.INTERNAL.node&&firebase.INTERNAL.node.sessionStorage;if(!a)return!1;try{return a.setItem("__sak","1"),a.removeItem("__sak"),!0}catch(b){return!1}};h=rh.prototype;
	h.get=function(a){var b=this;return G().then(function(){var c=b.w.getItem(a);return Ef(c)})};h.set=function(a,b){var c=this;return G().then(function(){var d=Cf(b);null===d?c.remove(a):c.w.setItem(a,d)})};h.remove=function(a){var b=this;return G().then(function(){b.w.removeItem(a)})};h.Na=function(){};h.bb=function(){};var sh=function(a,b,c,d,e,f){if(!window.indexedDB)throw new Q("web-storage-unsupported");this.be=a;this.Gc=b;this.wc=c;this.Md=d;this.pa=e;this.S={};this.zb=[];this.vb=0;this.we=f||l.indexedDB},th,uh=function(a){return new F(function(b,c){var d=a.we.open(a.be,a.pa);d.onerror=function(a){c(Error(a.target.errorCode))};d.onupgradeneeded=function(b){b=b.target.result;try{b.createObjectStore(a.Gc,{keyPath:a.wc})}catch(f){c(f)}};d.onsuccess=function(a){b(a.target.result)}})},vh=function(a){a.qd||(a.qd=
	uh(a));return a.qd},wh=function(a,b){return b.objectStore(a.Gc)},xh=function(a,b,c){return b.transaction([a.Gc],c?"readwrite":"readonly")},yh=function(a){return new F(function(b,c){a.onsuccess=function(a){a&&a.target?b(a.target.result):b()};a.onerror=function(a){c(Error(a.target.errorCode))}})};h=sh.prototype;
	h.set=function(a,b){var c=!1,d,e=this;return Bd(vh(this).then(function(b){d=b;b=wh(e,xh(e,d,!0));return yh(b.get(a))}).then(function(f){var g=wh(e,xh(e,d,!0));if(f)return f.value=b,yh(g.put(f));e.vb++;c=!0;f={};f[e.wc]=a;f[e.Md]=b;return yh(g.add(f))}).then(function(){e.S[a]=b}),function(){c&&e.vb--})};h.get=function(a){var b=this;return vh(this).then(function(c){return yh(wh(b,xh(b,c,!1)).get(a))}).then(function(a){return a&&a.value})};
	h.remove=function(a){var b=!1,c=this;return Bd(vh(this).then(function(d){b=!0;c.vb++;return yh(wh(c,xh(c,d,!0))["delete"](a))}).then(function(){delete c.S[a]}),function(){b&&c.vb--})};
	h.Ve=function(){var a=this;return vh(this).then(function(b){var c=wh(a,xh(a,b,!1));return c.getAll?yh(c.getAll()):new F(function(a,b){var d=[],e=c.openCursor();e.onsuccess=function(b){(b=b.target.result)?(d.push(b.value),b["continue"]()):a(d)};e.onerror=function(a){b(Error(a.target.errorCode))}})}).then(function(b){var c={},d=[];if(0==a.vb){for(d=0;d<b.length;d++)c[b[d][a.wc]]=b[d][a.Md];d=of(a.S,c);a.S=c}return d})};h.Na=function(a){0==this.zb.length&&this.Uc();this.zb.push(a)};
	h.bb=function(a){Na(this.zb,function(b){return b==a});0==this.zb.length&&this.jc()};h.Uc=function(){var a=this;this.jc();var b=function(){a.Lc=Be(800).then(q(a.Ve,a)).then(function(b){0<b.length&&Ea(a.zb,function(a){a(b)})}).then(b).l(function(a){"STOP_EVENT"!=a.message&&b()});return a.Lc};b()};h.jc=function(){this.Lc&&this.Lc.cancel("STOP_EVENT")};var Ch=function(){this.gd={Browser:zh,Node:Ah,ReactNative:Bh}[O()]},Dh,zh={Z:oh,Wc:rh},Ah={Z:oh,Wc:rh},Bh={Z:lh,Wc:ph};var Eh=function(a){var b={},c=a.email,d=a.newEmail;a=a.requestType;if(!c||!a)throw Error("Invalid provider user info!");b.fromEmail=d||null;b.email=c;P(this,"operation",a);P(this,"data",Nf(b))};var Fh="First Second Third Fourth Fifth Sixth Seventh Eighth Ninth".split(" "),T=function(a,b){return{name:a||"",fa:"a valid string",optional:!!b,ga:n}},U=function(a){return{name:a||"",fa:"a valid object",optional:!1,ga:ha}},Gh=function(a,b){return{name:a||"",fa:"a function",optional:!!b,ga:p}},Hh=function(){return{name:"",fa:"null",optional:!1,ga:da}},Ih=function(){return{name:"credential",fa:"a valid credential",optional:!1,ga:function(a){return!(!a||!a.Kb)}}},Jh=function(){return{name:"authProvider",
	fa:"a valid Auth provider",optional:!1,ga:function(a){return!!(a&&a.providerId&&a.hasOwnProperty&&a.hasOwnProperty("isOAuthProvider"))}}},Kh=function(a,b,c,d){return{name:c||"",fa:a.fa+" or "+b.fa,optional:!!d,ga:function(c){return a.ga(c)||b.ga(c)}}};var Mh=function(a,b){for(var c in b){var d=b[c].name;a[d]=Lh(d,a[c],b[c].a)}},V=function(a,b,c,d){a[b]=Lh(b,c,d)},Lh=function(a,b,c){if(!c)return b;var d=Nh(a);a=function(){var a=Array.prototype.slice.call(arguments),e;a:{e=Array.prototype.slice.call(a);var k;k=0;for(var t=!1,ua=0;ua<c.length;ua++)if(c[ua].optional)t=!0;else{if(t)throw new Q("internal-error","Argument validator encountered a required argument after an optional argument.");k++}t=c.length;if(e.length<k||t<e.length)e="Expected "+(k==
	t?1==k?"1 argument":k+" arguments":k+"-"+t+" arguments")+" but got "+e.length+".";else{for(k=0;k<e.length;k++)if(t=c[k].optional&&void 0===e[k],!c[k].ga(e[k])&&!t){e=c[k];if(0>k||k>=Fh.length)throw new Q("internal-error","Argument validator received an unsupported number of arguments.");e=Fh[k]+" argument "+(e.name?'"'+e.name+'" ':"")+"must be "+e.fa+".";break a}e=null}}if(e)throw new Q("argument-error",d+" failed: "+e);return b.apply(this,a)};for(var e in b)a[e]=b[e];for(e in b.prototype)a.prototype[e]=
	b.prototype[e];return a},Nh=function(a){a=a.split(".");return a[a.length-1]};var Oh=function(a,b,c,d){this.Ie=a;this.Ed=b;this.Oe=c;this.hb=d;this.R={};Dh||(Dh=new Ch);a=Dh;try{var e;mf()?(th||(th=new sh("firebaseLocalStorageDb","firebaseLocalStorage","fbase_key","value",1)),e=th):e=new a.gd.Z;this.Wa=e}catch(f){this.Wa=new mh,this.hb=!0}try{this.lc=new a.gd.Wc}catch(f){this.lc=new mh}this.Hd=q(this.Id,this);this.S={}},Ph,Qh=function(){Ph||(Ph=new Oh("firebase",":",!Ff(N())&&l.window&&l.window!=l.window.top?!0:!1,Bf()));return Ph};h=Oh.prototype;
	h.O=function(a,b){return this.Ie+this.Ed+a.name+(b?this.Ed+b:"")};h.get=function(a,b){return(a.Z?this.Wa:this.lc).get(this.O(a,b))};h.remove=function(a,b){b=this.O(a,b);a.Z&&!this.hb&&(this.S[b]=null);return(a.Z?this.Wa:this.lc).remove(b)};h.set=function(a,b,c){var d=this.O(a,c),e=this,f=a.Z?this.Wa:this.lc;return f.set(d,b).then(function(){return f.get(d)}).then(function(b){a.Z&&!this.hb&&(e.S[d]=b)})};
	h.addListener=function(a,b,c){a=this.O(a,b);this.hb||(this.S[a]=l.localStorage.getItem(a));Va(this.R)&&this.Uc();this.R[a]||(this.R[a]=[]);this.R[a].push(c)};h.removeListener=function(a,b,c){a=this.O(a,b);this.R[a]&&(Na(this.R[a],function(a){return a==c}),0==this.R[a].length&&delete this.R[a]);Va(this.R)&&this.jc()};h.Uc=function(){this.Wa.Na(this.Hd);this.hb||Rh(this)};
	var Rh=function(a){Sh(a);a.Fc=setInterval(function(){for(var b in a.R){var c=l.localStorage.getItem(b);c!=a.S[b]&&(a.S[b]=c,c=new Bb({type:"storage",key:b,target:window,oldValue:a.S[b],newValue:c}),a.Id(c))}},1E3)},Sh=function(a){a.Fc&&(clearInterval(a.Fc),a.Fc=null)};Oh.prototype.jc=function(){this.Wa.bb(this.Hd);this.hb||Sh(this)};
	Oh.prototype.Id=function(a){if(a&&a.le){var b=a.ob.key;if(this.Oe){var c=l.localStorage.getItem(b);a=a.ob.newValue;a!=c&&(a?l.localStorage.setItem(b,a):a||l.localStorage.removeItem(b))}this.S[b]=l.localStorage.getItem(b);this.ad(b)}else Ea(a,q(this.ad,this))};Oh.prototype.ad=function(a){this.R[a]&&Ea(this.R[a],function(a){a()})};var Th=function(a){this.D=a;this.B=Qh()},Uh={name:"pendingRedirect",Z:!1},Vh=function(a){return a.B.set(Uh,"pending",a.D)},Wh=function(a){return a.B.remove(Uh,a.D)},Xh=function(a){return a.B.get(Uh,a.D).then(function(a){return"pending"==a})};var $h=function(a,b,c){var d=this,e=(this.Aa=firebase.SDK_VERSION||null)?xf(this.Aa):null;this.f=new S(b,null,e);this.sa=null;this.C=a;this.m=b;this.F=c;this.Ab=[];this.Sb=!1;this.Xc=q(this.oe,this);this.Za=new Yh(this);this.yd=new Zh(this);this.Kc=new Th(this.m+":"+this.F);this.jb={};this.jb.unknown=this.Za;this.jb.signInViaRedirect=this.Za;this.jb.linkViaRedirect=this.Za;this.jb.signInViaPopup=this.yd;this.jb.linkViaPopup=this.yd;this.dc=this.fb=null;this.Xb=new F(function(a,b){d.fb=a;d.dc=b})};
	$h.prototype.reset=function(){var a=this;this.sa=null;this.Xb.cancel();this.Sb=!1;this.dc=this.fb=null;this.Pb&&kh(this.Pb,this.Xc);this.Xb=new F(function(b,c){a.fb=b;a.dc=c})};
	var ai=function(a){var b=nf();return Cg(a).then(function(a){a:{for(var c=ff(b).ia,e=0;e<a.length;e++){var f;var g=a[e];f=c;var k=Qc(g);k?f=(f=Qc(f))?k.Ib(f):!1:(k=g.split(".").join("\\."),f=(new RegExp("^(.+\\."+k+"|"+k+")$","i")).test(f));if(f){a=!0;break a}}a=!1}if(!a)throw new Uf(nf());})},bi=function(a){a.Sb||(a.Sb=!0,vf().then(function(){a.Pb=new ih(a.C,a.m,a.F,a.Aa);a.Pb.Hc().l(function(){a.dc(new Q("network-request-failed"));a.reset()});a.Pb.Db.push(a.Xc)}));return a.Xb};
	$h.prototype.subscribe=function(a){Ka(this.Ab,a)||this.Ab.push(a);if(!this.Sb){var b=this,c=function(){var a=N();Bf(a)||Ff(a)||bi(b);ci(b.Za)};Xh(this.Kc).then(function(a){a?Wh(b.Kc).then(function(){bi(b)}):c()}).l(function(){c()})}};$h.prototype.unsubscribe=function(a){Na(this.Ab,function(b){return b==a})};
	$h.prototype.oe=function(a){if(!a)throw new Q("invalid-auth-event");this.fb&&(this.fb(),this.fb=null);for(var b=!1,c=0;c<this.Ab.length;c++){var d=this.Ab[c];if(d.bd(a.ya,a.W)){(b=this.jb[a.ya])&&b.zd(a,d);b=!0;break}}ci(this.Za);return b};var di=new Hf(2E3,1E4),ei=new Hf(1E4,3E4);$h.prototype.getRedirectResult=function(){return this.Za.getRedirectResult()};
	var gi=function(a,b,c,d,e,f){if(!b)return H(new Q("popup-blocked"));if(f)return bi(a),G();a.sa||(a.sa=ai(a.f));return a.sa.then(function(){return bi(a)}).then(function(){fi(d);var f=jh(a.C,a.m,a.F,c,d,null,e,a.Aa);(b||l.window).location.href=gc(jc(f))}).l(function(b){"auth/network-request-failed"==b.code&&(a.sa=null);throw b;})},hi=function(a,b,c,d){a.sa||(a.sa=ai(a.f));return a.sa.then(function(){fi(c);var e=jh(a.C,a.m,a.F,b,c,nf(),d,a.Aa);Vh(a.Kc).then(function(){l.window.location.href=gc(jc(e))})})},
	ii=function(a,b,c,d,e){var f=new Q("popup-closed-by-user");return a.Xb.l(function(){}).then(function(){return uf(d)}).then(function(){return Be(di.get()).then(function(){b.Ja(c,null,f,e)})})},fi=function(a){if(!a.isOAuthProvider)throw new Q("invalid-oauth-provider");},ji={},ki=function(a,b,c){var d=b+":"+c;ji[d]||(ji[d]=new $h(a,b,c));return ji[d]},Yh=function(a){this.B=a;this.yb=this.cc=this.$a=this.aa=null;this.Oc=!1};
	Yh.prototype.zd=function(a,b){if(!a)return H(new Q("invalid-auth-event"));this.Oc=!0;var c=a.ya,d=a.W;"unknown"==c?(this.aa||li(this,!1,null,null),a=G()):a=a.N?this.Mc(a,b):b.pb(c,d)?this.Nc(a,b):H(new Q("invalid-auth-event"));return a};var ci=function(a){a.Oc||(a.Oc=!0,li(a,!1,null,null))};Yh.prototype.Mc=function(a){this.aa||li(this,!0,null,a.getError());return G()};
	Yh.prototype.Nc=function(a,b){var c=this,d=a.ya;b=b.pb(d,a.W);var e=a.kb;a=a.hc;var f="signInViaRedirect"==d||"linkViaRedirect"==d;if(this.aa)return G();this.yb&&this.yb.cancel();return b(e,a).then(function(a){c.aa||li(c,f,a,null)}).l(function(a){c.aa||li(c,f,null,a)})};var li=function(a,b,c,d){b?d?(a.aa=function(){return H(d)},a.cc&&a.cc(d)):(a.aa=function(){return G(c)},a.$a&&a.$a(c)):(a.aa=function(){return G({user:null})},a.$a&&a.$a({user:null}));a.$a=null;a.cc=null};
	Yh.prototype.getRedirectResult=function(){var a=this;this.$c||(this.$c=new F(function(b,c){a.aa?a.aa().then(b,c):(a.$a=b,a.cc=c,mi(a))}));return this.$c};var mi=function(a){var b=new Q("timeout");a.yb&&a.yb.cancel();a.yb=Be(ei.get()).then(function(){a.aa||li(a,!0,null,b)})},Zh=function(a){this.B=a};Zh.prototype.zd=function(a,b){if(!a)return H(new Q("invalid-auth-event"));var c=a.ya,d=a.W;return a.N?this.Mc(a,b):b.pb(c,d)?this.Nc(a,b):H(new Q("invalid-auth-event"))};
	Zh.prototype.Mc=function(a,b){b.Ja(a.ya,null,a.getError(),a.W);return G()};Zh.prototype.Nc=function(a,b){var c=a.W,d=a.ya;return b.pb(d,c)(a.kb,a.hc).then(function(a){b.Ja(d,a,null,c)}).l(function(a){b.Ja(d,null,a,c)})};var ni=function(a){this.f=a;this.za=this.V=null;this.Sa=0};ni.prototype.K=function(){return{apiKey:this.f.m,refreshToken:this.V,accessToken:this.za,expirationTime:this.Sa}};
	var pi=function(a,b){var c=b.idToken,d=b.refreshToken;b=oi(b.expiresIn);a.za=c;a.Sa=b;a.V=d},oi=function(a){return la()+1E3*parseInt(a,10)},qi=function(a,b){return vg(a.f,b).then(function(b){a.za=b.access_token;a.Sa=oi(b.expires_in);a.V=b.refresh_token;return{accessToken:a.za,expirationTime:a.Sa,refreshToken:a.V}}).l(function(b){"auth/user-token-expired"==b.code&&(a.V=null);throw b;})},ri=function(a){return!(!a.za||a.V)};
	ni.prototype.getToken=function(a){a=!!a;return ri(this)?H(new Q("user-token-expired")):a||!this.za||la()>this.Sa-3E4?this.V?qi(this,{grant_type:"refresh_token",refresh_token:this.V}):G(null):G({accessToken:this.za,expirationTime:this.Sa,refreshToken:this.V})};var si=function(a,b,c,d,e){Kf(this,{uid:a,displayName:d||null,photoURL:e||null,email:c||null,providerId:b})},ti=function(a,b){Ab.call(this,a);for(var c in b)this[c]=b[c]};r(ti,Ab);
	var W=function(a,b,c){this.Y=[];this.m=a.apiKey;this.F=a.appName;this.C=a.authDomain||null;a=firebase.SDK_VERSION?xf(firebase.SDK_VERSION):null;this.f=new S(this.m,null,a);this.ea=new ni(this.f);ui(this,b.idToken);pi(this.ea,b);P(this,"refreshToken",this.ea.V);vi(this,c||{});de.call(this);this.Yb=!1;this.C&&Af()&&(this.o=ki(this.C,this.m,this.F));this.ic=[];this.sc=G()};r(W,de);
	W.prototype.ua=function(a,b){var c=Array.prototype.slice.call(arguments,1),d=this;return this.sc=this.sc.then(function(){return a.apply(d,c)},function(){return a.apply(d,c)})};
	var ui=function(a,b){a.rd=b;P(a,"_lat",b)},wi=function(a,b){Na(a.ic,function(a){return a==b})},xi=function(a){for(var b=[],c=0;c<a.ic.length;c++)b.push(a.ic[c](a));return yd(b).then(function(){return a})},yi=function(a){a.o&&!a.Yb&&(a.Yb=!0,a.o.subscribe(a))},vi=function(a,b){Kf(a,{uid:b.uid,displayName:b.displayName||null,photoURL:b.photoURL||null,email:b.email||null,emailVerified:b.emailVerified||!1,isAnonymous:b.isAnonymous||!1,providerData:[]})};P(W.prototype,"providerId","firebase");
	var zi=function(){},Ai=function(a){return G().then(function(){if(a.de)throw new Q("app-deleted");})},Bi=function(a){return Ga(a.providerData,function(a){return a.providerId})},Di=function(a,b){b&&(Ci(a,b.providerId),a.providerData.push(b))},Ci=function(a,b){Na(a.providerData,function(a){return a.providerId==b})},Ei=function(a,b,c){("uid"!=b||c)&&a.hasOwnProperty(b)&&P(a,b,c)};
	W.prototype.copy=function(a){var b=this;b!=a&&(Kf(this,{uid:a.uid,displayName:a.displayName,photoURL:a.photoURL,email:a.email,emailVerified:a.emailVerified,isAnonymous:a.isAnonymous,providerData:[]}),Ea(a.providerData,function(a){Di(b,a)}),this.ea=a.ea,P(this,"refreshToken",this.ea.V))};W.prototype.reload=function(){var a=this;return Ai(this).then(function(){return Fi(a).then(function(){return xi(a)}).then(zi)})};
	var Fi=function(a){return a.getToken().then(function(b){var c=a.isAnonymous;return Gi(a,b).then(function(){c||Ei(a,"isAnonymous",!1);return b}).l(function(b){"auth/user-token-expired"==b.code&&(a.dispatchEvent(new ti("userDeleted")),Hi(a));throw b;})})};
	W.prototype.getToken=function(a){var b=this,c=ri(this.ea);return Ai(this).then(function(){return b.ea.getToken(a)}).then(function(a){if(!a)throw new Q("internal-error");a.accessToken!=b.rd&&(ui(b,a.accessToken),b.Fa());Ei(b,"refreshToken",a.refreshToken);return a.accessToken}).l(function(a){if("auth/user-token-expired"==a.code&&!c)return xi(b).then(function(){Ei(b,"refreshToken",null);throw a;});throw a;})};
	var Ii=function(a,b){b.idToken&&a.rd!=b.idToken&&(pi(a.ea,b),a.Fa(),ui(a,b.idToken),Ei(a,"refreshToken",a.ea.V))};W.prototype.Fa=function(){this.dispatchEvent(new ti("tokenChanged"))};var Gi=function(a,b){return R(a.f,Vg,{idToken:b}).then(q(a.Le,a))};
	W.prototype.Le=function(a){a=a.users;if(!a||!a.length)throw new Q("internal-error");a=a[0];vi(this,{uid:a.localId,displayName:a.displayName,photoURL:a.photoUrl,email:a.email,emailVerified:!!a.emailVerified});for(var b=Ji(a),c=0;c<b.length;c++)Di(this,b[c]);Ei(this,"isAnonymous",!(this.email&&a.passwordHash)&&!(this.providerData&&this.providerData.length))};
	var Ji=function(a){return(a=a.providerUserInfo)&&a.length?Ga(a,function(a){return new si(a.rawId,a.providerId,a.email,a.displayName,a.photoUrl)}):[]};W.prototype.reauthenticate=function(a){var b=this;return this.c(a.Kb(this.f).then(function(a){var c;a:{var e=a.idToken.split(".");if(3==e.length){for(var e=e[1],f=(4-e.length%4)%4,g=0;g<f;g++)e+=".";try{var k=lc(vb(e));if(k.sub&&k.iss&&k.aud&&k.exp){c=new Vf(k);break a}}catch(t){}}c=null}if(!c||b.uid!=c.Ee)throw new Q("user-mismatch");Ii(b,a);return b.reload()}))};
	var Ki=function(a,b){return Fi(a).then(function(){if(Ka(Bi(a),b))return xi(a).then(function(){throw new Q("provider-already-linked");})})};h=W.prototype;h.Ce=function(a){var b=this;return this.c(Ki(this,a.provider).then(function(){return b.getToken()}).then(function(c){return a.td(b.f,c)}).then(q(this.jd,this)))};h.link=function(a){return this.ua(this.Ce,a)};h.jd=function(a){Ii(this,a);var b=this;return this.reload().then(function(){return b})};
	h.$e=function(a){var b=this;return this.c(this.getToken().then(function(c){return b.f.updateEmail(c,a)}).then(function(a){Ii(b,a);return b.reload()}))};h.updateEmail=function(a){return this.ua(this.$e,a)};h.af=function(a){var b=this;return this.c(this.getToken().then(function(c){return b.f.updatePassword(c,a)}).then(function(a){Ii(b,a);return b.reload()}))};h.updatePassword=function(a){return this.ua(this.af,a)};
	h.bf=function(a){if(void 0===a.displayName&&void 0===a.photoURL)return Ai(this);var b=this;return this.c(this.getToken().then(function(c){return b.f.updateProfile(c,{displayName:a.displayName,photoUrl:a.photoURL})}).then(function(a){Ii(b,a);Ei(b,"displayName",a.displayName||null);Ei(b,"photoURL",a.photoUrl||null);return xi(b)}).then(zi))};h.updateProfile=function(a){return this.ua(this.bf,a)};
	h.Ze=function(a){var b=this;return this.c(Fi(this).then(function(c){return Ka(Bi(b),a)?Kg(b.f,c,[a]).then(function(a){var c={};Ea(a.providerUserInfo||[],function(a){c[a.providerId]=!0});Ea(Bi(b),function(a){c[a]||Ci(b,a)});return xi(b)}):xi(b).then(function(){throw new Q("no-such-provider");})}))};h.unlink=function(a){return this.ua(this.Ze,a)};h.ce=function(){var a=this;return this.c(this.getToken().then(function(b){return R(a.f,Ug,{idToken:b})}).then(function(){a.dispatchEvent(new ti("userDeleted"))})).then(function(){Hi(a)})};
	h.delete=function(){return this.ua(this.ce)};h.bd=function(a,b){return"linkViaPopup"==a&&(this.ka||null)==b&&this.da||"linkViaRedirect"==a&&(this.bc||null)==b?!0:!1};h.Ja=function(a,b,c,d){"linkViaPopup"==a&&d==(this.ka||null)&&(c&&this.Ha?this.Ha(c):b&&!c&&this.da&&this.da(b),this.G&&(this.G.cancel(),this.G=null),delete this.da,delete this.Ha)};h.pb=function(a,b){return"linkViaPopup"==a&&b==(this.ka||null)||"linkViaRedirect"==a&&(this.bc||null)==b?q(this.ge,this):null};
	h.Jb=function(){return zf(this.uid+":::")};
	var Mi=function(a,b){if(!Af())return H(new Q("operation-not-supported-in-this-environment"));var c=Qf(b.providerId),d=a.Jb(),e=null;!Bf()&&a.C&&b.isOAuthProvider&&(e=jh(a.C,a.m,a.F,"linkViaPopup",b,null,d,firebase.SDK_VERSION||null));var f=tf(e,c&&c.xb,c&&c.wb),c=Ki(a,b.providerId).then(function(){return xi(a)}).then(function(){Li(a);return a.getToken()}).then(function(){return gi(a.o,f,"linkViaPopup",b,d,!!e)}).then(function(){return new F(function(b,c){a.Ja("linkViaPopup",null,new Q("cancelled-popup-request"),
	a.ka||null);a.da=b;a.Ha=c;a.ka=d;a.G=ii(a.o,a,"linkViaPopup",f,d)})}).then(function(a){f&&sf(f);return a}).l(function(a){f&&sf(f);throw a;});return a.c(c)};W.prototype.linkWithPopup=function(a){var b=Mi(this,a);return this.ua(function(){return b})};
	W.prototype.De=function(a){if(!Af())return H(new Q("operation-not-supported-in-this-environment"));var b=this,c=null,d=this.Jb(),e=Ki(this,a.providerId).then(function(){Li(b);return b.getToken()}).then(function(){b.bc=d;return xi(b)}).then(function(a){b.Ia&&(a=b.Ia,a=a.B.set(Ni,b.K(),a.D));return a}).then(function(){return hi(b.o,"linkViaRedirect",a,d)}).l(function(a){c=a;if(b.Ia)return Oi(b.Ia);throw c;}).then(function(){if(c)throw c;});return this.c(e)};
	W.prototype.linkWithRedirect=function(a){return this.ua(this.De,a)};var Li=function(a){if(!a.o||!a.Yb){if(a.o&&!a.Yb)throw new Q("internal-error");throw new Q("auth-domain-config-required");}};W.prototype.ge=function(a,b){var c=this;this.G&&(this.G.cancel(),this.G=null);var d=null,e=this.getToken().then(function(d){return Zf(c.f,{requestUri:a,sessionId:b,idToken:d})}).then(function(a){d=jg(a);return c.jd(a)}).then(function(a){return{user:a,credential:d}});return this.c(e)};
	W.prototype.sendEmailVerification=function(){var a=this;return this.c(this.getToken().then(function(b){return a.f.sendEmailVerification(b)}).then(function(b){if(a.email!=b)return a.reload()}).then(function(){}))};var Hi=function(a){for(var b=0;b<a.Y.length;b++)a.Y[b].cancel("app-deleted");a.Y=[];a.de=!0;P(a,"refreshToken",null);a.o&&a.o.unsubscribe(a)};W.prototype.c=function(a){var b=this;this.Y.push(a);Bd(a,function(){Ma(b.Y,a)});return a};W.prototype.toJSON=function(){return this.K()};
	W.prototype.K=function(){var a={uid:this.uid,displayName:this.displayName,photoURL:this.photoURL,email:this.email,emailVerified:this.emailVerified,isAnonymous:this.isAnonymous,providerData:[],apiKey:this.m,appName:this.F,authDomain:this.C,stsTokenManager:this.ea.K(),redirectEventId:this.bc||null};Ea(this.providerData,function(b){a.providerData.push(Lf(b))});return a};
	var Pi=function(a){if(!a.apiKey)return null;var b={apiKey:a.apiKey,authDomain:a.authDomain,appName:a.appName},c={};if(a.stsTokenManager&&a.stsTokenManager.accessToken&&a.stsTokenManager.expirationTime)c.idToken=a.stsTokenManager.accessToken,c.refreshToken=a.stsTokenManager.refreshToken||null,c.expiresIn=(a.stsTokenManager.expirationTime-la())/1E3;else return null;var d=new W(b,c,a);a.providerData&&Ea(a.providerData,function(a){if(a){var b={};Kf(b,a);Di(d,b)}});a.redirectEventId&&(d.bc=a.redirectEventId);
	return d},Qi=function(a,b,c){var d=new W(a,b);c&&(d.Ia=c);return d.reload().then(function(){return d})};var Ri=function(a){this.D=a;this.B=Qh()},Ni={name:"redirectUser",Z:!1},Oi=function(a){return a.B.remove(Ni,a.D)},Si=function(a,b){return a.B.get(Ni,a.D).then(function(a){a&&b&&(a.authDomain=b);return Pi(a||{})})};var Ti=function(a){this.D=a;this.B=Qh()},Ui={name:"authUser",Z:!0},Vi=function(a,b){return a.B.set(Ui,b.K(),a.D)},Wi=function(a){return a.B.remove(Ui,a.D)},Xi=function(a,b){return a.B.get(Ui,a.D).then(function(a){a&&b&&(a.authDomain=b);return Pi(a||{})})};var Y=function(a){this.Qa=!1;P(this,"app",a);if(X(this).options&&X(this).options.apiKey)a=firebase.SDK_VERSION?xf(firebase.SDK_VERSION):null,this.f=new S(X(this).options&&X(this).options.apiKey,null,a);else throw new Q("invalid-api-key");this.Y=[];this.Oa=[];this.Je=firebase.INTERNAL.createSubscribe(q(this.xe,this));Yi(this,null);this.oa=new Ti(X(this).options.apiKey+":"+X(this).name);this.ab=new Ri(X(this).options.apiKey+":"+X(this).name);this.Eb=this.c(Zi(this));this.va=this.c($i(this));this.Ec=
	!1;this.Bc=q(this.Ue,this);this.Kd=q(this.Ua,this);this.Ld=q(this.te,this);this.Jd=q(this.se,this);aj(this);this.INTERNAL={};this.INTERNAL.delete=q(this.delete,this)};Y.prototype.toJSON=function(){return{apiKey:X(this).options.apiKey,authDomain:X(this).options.authDomain,appName:X(this).name,currentUser:Z(this)&&Z(this).K()}};
	var bj=function(a){return a.ee||H(new Q("auth-domain-config-required"))},aj=function(a){var b=X(a).options.authDomain,c=X(a).options.apiKey;b&&Af()&&(a.ee=a.Eb.then(function(){if(!a.Qa)return a.o=ki(b,c,X(a).name),a.o.subscribe(a),Z(a)&&yi(Z(a)),a.Qc&&(yi(a.Qc),a.Qc=null),a.o}))};h=Y.prototype;h.bd=function(a,b){switch(a){case "unknown":case "signInViaRedirect":return!0;case "signInViaPopup":return this.ka==b&&!!this.da;default:return!1}};
	h.Ja=function(a,b,c,d){"signInViaPopup"==a&&this.ka==d&&(c&&this.Ha?this.Ha(c):b&&!c&&this.da&&this.da(b),this.G&&(this.G.cancel(),this.G=null),delete this.da,delete this.Ha)};h.pb=function(a,b){return"signInViaRedirect"==a||"signInViaPopup"==a&&this.ka==b&&this.da?q(this.he,this):null};
	h.he=function(a,b){var c=this;a={requestUri:a,sessionId:b};this.G&&(this.G.cancel(),this.G=null);var d=null,e=Xf(c.f,a).then(function(a){d=jg(a);return a});a=c.Eb.then(function(){return e}).then(function(a){return cj(c,a)}).then(function(){return{user:Z(c),credential:d}});return this.c(a)};h.Jb=function(){return zf()};
	h.signInWithPopup=function(a){if(!Af())return H(new Q("operation-not-supported-in-this-environment"));var b=this,c=Qf(a.providerId),d=this.Jb(),e=null;!Bf()&&X(this).options.authDomain&&a.isOAuthProvider&&(e=jh(X(this).options.authDomain,X(this).options.apiKey,X(this).name,"signInViaPopup",a,null,d,firebase.SDK_VERSION||null));var f=tf(e,c&&c.xb,c&&c.wb),c=bj(this).then(function(b){return gi(b,f,"signInViaPopup",a,d,!!e)}).then(function(){return new F(function(a,c){b.Ja("signInViaPopup",null,new Q("cancelled-popup-request"),
	b.ka);b.da=a;b.Ha=c;b.ka=d;b.G=ii(b.o,b,"signInViaPopup",f,d)})}).then(function(a){f&&sf(f);return a}).l(function(a){f&&sf(f);throw a;});return this.c(c)};h.signInWithRedirect=function(a){if(!Af())return H(new Q("operation-not-supported-in-this-environment"));var b=this,c=bj(this).then(function(){return hi(b.o,"signInViaRedirect",a)});return this.c(c)};
	h.getRedirectResult=function(){if(!Af())return H(new Q("operation-not-supported-in-this-environment"));var a=this,b=bj(this).then(function(){return a.o.getRedirectResult()});return this.c(b)};
	var cj=function(a,b){var c={};c.apiKey=X(a).options.apiKey;c.authDomain=X(a).options.authDomain;c.appName=X(a).name;return a.Eb.then(function(){return Qi(c,b,a.ab)}).then(function(b){if(Z(a)&&b.uid==Z(a).uid)return Z(a).copy(b),a.Ua(b);Yi(a,b);yi(b);return a.Ua(b)}).then(function(){a.Fa()})},Yi=function(a,b){Z(a)&&(wi(Z(a),a.Kd),Vb(Z(a),"tokenChanged",a.Ld),Vb(Z(a),"userDeleted",a.Jd));b&&(b.ic.push(a.Kd),Mb(b,"tokenChanged",a.Ld),Mb(b,"userDeleted",a.Jd));P(a,"currentUser",b)};
	Y.prototype.signOut=function(){var a=this,b=this.va.then(function(){if(!Z(a))return G();Yi(a,null);return Wi(a.oa).then(function(){a.Fa()})});return this.c(b)};
	var dj=function(a){var b=Si(a.ab,X(a).options.authDomain).then(function(b){if(a.Qc=b)b.Ia=a.ab;return Oi(a.ab)});return a.c(b)},Zi=function(a){var b=X(a).options.authDomain,c=dj(a).then(function(){return Xi(a.oa,b)}).then(function(b){return b?(b.Ia=a.ab,b.reload().then(function(){return Vi(a.oa,b).then(function(){return b})}).l(function(c){return"auth/network-request-failed"==c.code?b:Wi(a.oa)})):null}).then(function(b){Yi(a,b||null)});return a.c(c)},$i=function(a){return a.Eb.then(function(){return a.getRedirectResult()}).l(function(){}).then(function(){if(!a.Qa)return a.Bc()}).l(function(){}).then(function(){if(!a.Qa){a.Ec=
	!0;var b=a.oa;b.B.addListener(Ui,b.D,a.Bc)}})};Y.prototype.Ue=function(){var a=this;return Xi(this.oa,X(this).options.authDomain).then(function(b){if(!a.Qa){var c;if(c=Z(a)&&b){c=Z(a).uid;var d=b.uid;c=void 0===c||null===c||""===c||void 0===d||null===d||""===d?!1:c==d}if(c)return Z(a).copy(b),Z(a).getToken();if(Z(a)||b)Yi(a,b),b&&(yi(b),b.Ia=a.ab),a.o&&a.o.subscribe(a),a.Fa()}})};Y.prototype.Ua=function(a){return Vi(this.oa,a)};Y.prototype.te=function(){this.Fa();this.Ua(Z(this))};
	Y.prototype.se=function(){this.signOut()};var ej=function(a,b){return a.c(b.then(function(b){return cj(a,b)}).then(function(){return Z(a)}))};h=Y.prototype;h.xe=function(a){var b=this;this.addAuthTokenListener(function(){a.next(Z(b))})};h.onAuthStateChanged=function(a,b,c){var d=this;this.Ec&&firebase.Promise.resolve().then(function(){p(a)?a(Z(d)):p(a.next)&&a.next(Z(d))});return this.Je(a,b,c)};
	h.getToken=function(a){var b=this,c=this.va.then(function(){return Z(b)?Z(b).getToken(a).then(function(a){return{accessToken:a}}):null});return this.c(c)};h.signInWithCustomToken=function(a){var b=this;return this.va.then(function(){return ej(b,R(b.f,Wg,{token:a}))}).then(function(a){Ei(a,"isAnonymous",!1);return b.Ua(a)}).then(function(){return Z(b)})};h.signInWithEmailAndPassword=function(a,b){var c=this;return this.va.then(function(){return ej(c,R(c.f,fg,{email:a,password:b}))})};
	h.createUserWithEmailAndPassword=function(a,b){var c=this;return this.va.then(function(){return ej(c,R(c.f,Tg,{email:a,password:b}))})};h.signInWithCredential=function(a){var b=this;return this.va.then(function(){return ej(b,a.Kb(b.f))})};h.signInAnonymously=function(){var a=Z(this),b=this;return a&&a.isAnonymous?G(a):this.va.then(function(){return ej(b,b.f.signInAnonymously())}).then(function(a){Ei(a,"isAnonymous",!0);return b.Ua(a)}).then(function(){return Z(b)})};
	var X=function(a){return a.app},Z=function(a){return a.currentUser};h=Y.prototype;h.Fa=function(){if(this.Ec)for(var a=0;a<this.Oa.length;a++)if(this.Oa[a])this.Oa[a](Z(this)&&Z(this)._lat||null)};h.addAuthTokenListener=function(a){var b=this;this.Oa.push(a);this.c(this.va.then(function(){b.Qa||Ka(b.Oa,a)&&a(Z(b)&&Z(b)._lat||null)}))};h.removeAuthTokenListener=function(a){Na(this.Oa,function(b){return b==a})};
	h.delete=function(){this.Qa=!0;for(var a=0;a<this.Y.length;a++)this.Y[a].cancel("app-deleted");this.Y=[];this.oa&&(a=this.oa,a.B.removeListener(Ui,a.D,this.Bc));this.o&&this.o.unsubscribe(this);return firebase.Promise.resolve()};h.c=function(a){var b=this;this.Y.push(a);Bd(a,function(){Ma(b.Y,a)});return a};h.fetchProvidersForEmail=function(a){return this.c(Ag(this.f,a))};h.verifyPasswordResetCode=function(a){return this.checkActionCode(a).then(function(a){return a.data.email})};
	h.confirmPasswordReset=function(a,b){return this.c(this.f.confirmPasswordReset(a,b).then(function(){}))};h.checkActionCode=function(a){return this.c(this.f.checkActionCode(a).then(function(a){return new Eh(a)}))};h.applyActionCode=function(a){return this.c(this.f.applyActionCode(a).then(function(){}))};h.sendPasswordResetEmail=function(a){return this.c(this.f.sendPasswordResetEmail(a).then(function(){}))};Mh(Y.prototype,{applyActionCode:{name:"applyActionCode",a:[T("code")]},checkActionCode:{name:"checkActionCode",a:[T("code")]},confirmPasswordReset:{name:"confirmPasswordReset",a:[T("code"),T("newPassword")]},createUserWithEmailAndPassword:{name:"createUserWithEmailAndPassword",a:[T("email"),T("password")]},fetchProvidersForEmail:{name:"fetchProvidersForEmail",a:[T("email")]},getRedirectResult:{name:"getRedirectResult",a:[]},onAuthStateChanged:{name:"onAuthStateChanged",a:[Kh(U(),Gh(),"nextOrObserver"),
	Gh("opt_error",!0),Gh("opt_completed",!0)]},sendPasswordResetEmail:{name:"sendPasswordResetEmail",a:[T("email")]},signInAnonymously:{name:"signInAnonymously",a:[]},signInWithCredential:{name:"signInWithCredential",a:[Ih()]},signInWithCustomToken:{name:"signInWithCustomToken",a:[T("token")]},signInWithEmailAndPassword:{name:"signInWithEmailAndPassword",a:[T("email"),T("password")]},signInWithPopup:{name:"signInWithPopup",a:[Jh()]},signInWithRedirect:{name:"signInWithRedirect",a:[Jh()]},signOut:{name:"signOut",
	a:[]},toJSON:{name:"toJSON",a:[T(null,!0)]},verifyPasswordResetCode:{name:"verifyPasswordResetCode",a:[T("code")]}});
	Mh(W.prototype,{"delete":{name:"delete",a:[]},getToken:{name:"getToken",a:[{name:"opt_forceRefresh",fa:"a boolean",optional:!0,ga:function(a){return"boolean"==typeof a}}]},link:{name:"link",a:[Ih()]},linkWithPopup:{name:"linkWithPopup",a:[Jh()]},linkWithRedirect:{name:"linkWithRedirect",a:[Jh()]},reauthenticate:{name:"reauthenticate",a:[Ih()]},reload:{name:"reload",a:[]},sendEmailVerification:{name:"sendEmailVerification",a:[]},toJSON:{name:"toJSON",a:[T(null,!0)]},unlink:{name:"unlink",a:[T("provider")]},
	updateEmail:{name:"updateEmail",a:[T("email")]},updatePassword:{name:"updatePassword",a:[T("password")]},updateProfile:{name:"updateProfile",a:[U("profile")]}});Mh(F.prototype,{l:{name:"catch"},then:{name:"then"}});V(hg,"credential",function(a,b){return new eg(a,b)},[T("email"),T("password")]);Mh(ag.prototype,{addScope:{name:"addScope",a:[T("scope")]},setCustomParameters:{name:"setCustomParameters",a:[U("customOAuthParameters")]}});V(ag,"credential",ag.credential,[Kh(T(),U(),"token")]);
	Mh(bg.prototype,{addScope:{name:"addScope",a:[T("scope")]},setCustomParameters:{name:"setCustomParameters",a:[U("customOAuthParameters")]}});V(bg,"credential",bg.credential,[Kh(T(),U(),"token")]);Mh(cg.prototype,{addScope:{name:"addScope",a:[T("scope")]},setCustomParameters:{name:"setCustomParameters",a:[U("customOAuthParameters")]}});V(cg,"credential",cg.credential,[Kh(T(),Kh(U(),Hh()),"idToken"),Kh(T(),Hh(),"accessToken",!0)]);Mh(dg.prototype,{setCustomParameters:{name:"setCustomParameters",a:[U("customOAuthParameters")]}});
	V(dg,"credential",dg.credential,[Kh(T(),U(),"token"),T("secret",!0)]);
	(function(){if("undefined"!==typeof firebase&&firebase.INTERNAL&&firebase.INTERNAL.registerService){var a={Auth:Y,Error:Q};V(a,"EmailAuthProvider",hg,[]);V(a,"FacebookAuthProvider",ag,[]);V(a,"GithubAuthProvider",bg,[]);V(a,"GoogleAuthProvider",cg,[]);V(a,"TwitterAuthProvider",dg,[]);firebase.INTERNAL.registerService("auth",function(a,c){a=new Y(a);c({INTERNAL:{getToken:q(a.getToken,a),addAuthTokenListener:q(a.addAuthTokenListener,a),removeAuthTokenListener:q(a.removeAuthTokenListener,a)}});return a},
	a,function(a,c){if("create"===a)try{c.auth()}catch(d){}});firebase.INTERNAL.extendNamespace({User:W})}else throw Error("Cannot find the firebase namespace; be sure to include firebase-app.js before this library.");})();})();
	module.exports = firebase.auth;


/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	var firebase = __webpack_require__(15);
	/*! @license Firebase v3.5.2
	    Build: 3.5.2-rc.1
	    Terms: https://developers.google.com/terms */
	(function() {var g,n=this;function p(a){return void 0!==a}function aa(){}function ba(a){a.Wb=function(){return a.bf?a.bf:a.bf=new a}}
	function ca(a){var b=typeof a;if("object"==b)if(a){if(a instanceof Array)return"array";if(a instanceof Object)return b;var c=Object.prototype.toString.call(a);if("[object Window]"==c)return"object";if("[object Array]"==c||"number"==typeof a.length&&"undefined"!=typeof a.splice&&"undefined"!=typeof a.propertyIsEnumerable&&!a.propertyIsEnumerable("splice"))return"array";if("[object Function]"==c||"undefined"!=typeof a.call&&"undefined"!=typeof a.propertyIsEnumerable&&!a.propertyIsEnumerable("call"))return"function"}else return"null";
	else if("function"==b&&"undefined"==typeof a.call)return"object";return b}function da(a){return"array"==ca(a)}function ea(a){var b=ca(a);return"array"==b||"object"==b&&"number"==typeof a.length}function q(a){return"string"==typeof a}function fa(a){return"number"==typeof a}function ga(a){return"function"==ca(a)}function ha(a){var b=typeof a;return"object"==b&&null!=a||"function"==b}function ia(a,b,c){return a.call.apply(a.bind,arguments)}
	function ja(a,b,c){if(!a)throw Error();if(2<arguments.length){var d=Array.prototype.slice.call(arguments,2);return function(){var c=Array.prototype.slice.call(arguments);Array.prototype.unshift.apply(c,d);return a.apply(b,c)}}return function(){return a.apply(b,arguments)}}function r(a,b,c){r=Function.prototype.bind&&-1!=Function.prototype.bind.toString().indexOf("native code")?ia:ja;return r.apply(null,arguments)}
	function ka(a,b){function c(){}c.prototype=b.prototype;a.Ig=b.prototype;a.prototype=new c;a.prototype.constructor=a;a.Eg=function(a,c,f){for(var h=Array(arguments.length-2),k=2;k<arguments.length;k++)h[k-2]=arguments[k];return b.prototype[c].apply(a,h)}};function la(){this.Ya=-1};function ma(){this.Ya=-1;this.Ya=64;this.N=[];this.Wd=[];this.Jf=[];this.zd=[];this.zd[0]=128;for(var a=1;a<this.Ya;++a)this.zd[a]=0;this.Pd=this.ac=0;this.reset()}ka(ma,la);ma.prototype.reset=function(){this.N[0]=1732584193;this.N[1]=4023233417;this.N[2]=2562383102;this.N[3]=271733878;this.N[4]=3285377520;this.Pd=this.ac=0};
	function na(a,b,c){c||(c=0);var d=a.Jf;if(q(b))for(var e=0;16>e;e++)d[e]=b.charCodeAt(c)<<24|b.charCodeAt(c+1)<<16|b.charCodeAt(c+2)<<8|b.charCodeAt(c+3),c+=4;else for(e=0;16>e;e++)d[e]=b[c]<<24|b[c+1]<<16|b[c+2]<<8|b[c+3],c+=4;for(e=16;80>e;e++){var f=d[e-3]^d[e-8]^d[e-14]^d[e-16];d[e]=(f<<1|f>>>31)&4294967295}b=a.N[0];c=a.N[1];for(var h=a.N[2],k=a.N[3],m=a.N[4],l,e=0;80>e;e++)40>e?20>e?(f=k^c&(h^k),l=1518500249):(f=c^h^k,l=1859775393):60>e?(f=c&h|k&(c|h),l=2400959708):(f=c^h^k,l=3395469782),f=(b<<
	5|b>>>27)+f+m+l+d[e]&4294967295,m=k,k=h,h=(c<<30|c>>>2)&4294967295,c=b,b=f;a.N[0]=a.N[0]+b&4294967295;a.N[1]=a.N[1]+c&4294967295;a.N[2]=a.N[2]+h&4294967295;a.N[3]=a.N[3]+k&4294967295;a.N[4]=a.N[4]+m&4294967295}
	ma.prototype.update=function(a,b){if(null!=a){p(b)||(b=a.length);for(var c=b-this.Ya,d=0,e=this.Wd,f=this.ac;d<b;){if(0==f)for(;d<=c;)na(this,a,d),d+=this.Ya;if(q(a))for(;d<b;){if(e[f]=a.charCodeAt(d),++f,++d,f==this.Ya){na(this,e);f=0;break}}else for(;d<b;)if(e[f]=a[d],++f,++d,f==this.Ya){na(this,e);f=0;break}}this.ac=f;this.Pd+=b}};function t(a,b){for(var c in a)b.call(void 0,a[c],c,a)}function oa(a,b){var c={},d;for(d in a)c[d]=b.call(void 0,a[d],d,a);return c}function pa(a,b){for(var c in a)if(!b.call(void 0,a[c],c,a))return!1;return!0}function qa(a){var b=0,c;for(c in a)b++;return b}function ra(a){for(var b in a)return b}function sa(a){var b=[],c=0,d;for(d in a)b[c++]=a[d];return b}function ta(a){var b=[],c=0,d;for(d in a)b[c++]=d;return b}function ua(a,b){for(var c in a)if(a[c]==b)return!0;return!1}
	function va(a,b,c){for(var d in a)if(b.call(c,a[d],d,a))return d}function wa(a,b){var c=va(a,b,void 0);return c&&a[c]}function xa(a){for(var b in a)return!1;return!0}function ya(a){var b={},c;for(c in a)b[c]=a[c];return b};function za(a){a=String(a);if(/^\s*$/.test(a)?0:/^[\],:{}\s\u2028\u2029]*$/.test(a.replace(/\\["\\\/bfnrtu]/g,"@").replace(/"[^"\\\n\r\u2028\u2029\x00-\x08\x0a-\x1f]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,"]").replace(/(?:^|:|,)(?:[\s\u2028\u2029]*\[)+/g,"")))try{return eval("("+a+")")}catch(b){}throw Error("Invalid JSON string: "+a);}function Aa(){this.Fd=void 0}
	function Ba(a,b,c){switch(typeof b){case "string":Ca(b,c);break;case "number":c.push(isFinite(b)&&!isNaN(b)?b:"null");break;case "boolean":c.push(b);break;case "undefined":c.push("null");break;case "object":if(null==b){c.push("null");break}if(da(b)){var d=b.length;c.push("[");for(var e="",f=0;f<d;f++)c.push(e),e=b[f],Ba(a,a.Fd?a.Fd.call(b,String(f),e):e,c),e=",";c.push("]");break}c.push("{");d="";for(f in b)Object.prototype.hasOwnProperty.call(b,f)&&(e=b[f],"function"!=typeof e&&(c.push(d),Ca(f,c),
	c.push(":"),Ba(a,a.Fd?a.Fd.call(b,f,e):e,c),d=","));c.push("}");break;case "function":break;default:throw Error("Unknown type: "+typeof b);}}var Da={'"':'\\"',"\\":"\\\\","/":"\\/","\b":"\\b","\f":"\\f","\n":"\\n","\r":"\\r","\t":"\\t","\x0B":"\\u000b"},Ea=/\uffff/.test("\uffff")?/[\\\"\x00-\x1f\x7f-\uffff]/g:/[\\\"\x00-\x1f\x7f-\xff]/g;
	function Ca(a,b){b.push('"',a.replace(Ea,function(a){if(a in Da)return Da[a];var b=a.charCodeAt(0),e="\\u";16>b?e+="000":256>b?e+="00":4096>b&&(e+="0");return Da[a]=e+b.toString(16)}),'"')};var v;a:{var Fa=n.navigator;if(Fa){var Ga=Fa.userAgent;if(Ga){v=Ga;break a}}v=""};function Ha(a){if(Error.captureStackTrace)Error.captureStackTrace(this,Ha);else{var b=Error().stack;b&&(this.stack=b)}a&&(this.message=String(a))}ka(Ha,Error);Ha.prototype.name="CustomError";var w=Array.prototype,Ia=w.indexOf?function(a,b,c){return w.indexOf.call(a,b,c)}:function(a,b,c){c=null==c?0:0>c?Math.max(0,a.length+c):c;if(q(a))return q(b)&&1==b.length?a.indexOf(b,c):-1;for(;c<a.length;c++)if(c in a&&a[c]===b)return c;return-1},Ja=w.forEach?function(a,b,c){w.forEach.call(a,b,c)}:function(a,b,c){for(var d=a.length,e=q(a)?a.split(""):a,f=0;f<d;f++)f in e&&b.call(c,e[f],f,a)},Ka=w.filter?function(a,b,c){return w.filter.call(a,b,c)}:function(a,b,c){for(var d=a.length,e=[],f=0,h=q(a)?
	a.split(""):a,k=0;k<d;k++)if(k in h){var m=h[k];b.call(c,m,k,a)&&(e[f++]=m)}return e},La=w.map?function(a,b,c){return w.map.call(a,b,c)}:function(a,b,c){for(var d=a.length,e=Array(d),f=q(a)?a.split(""):a,h=0;h<d;h++)h in f&&(e[h]=b.call(c,f[h],h,a));return e},Ma=w.reduce?function(a,b,c,d){for(var e=[],f=1,h=arguments.length;f<h;f++)e.push(arguments[f]);d&&(e[0]=r(b,d));return w.reduce.apply(a,e)}:function(a,b,c,d){var e=c;Ja(a,function(c,h){e=b.call(d,e,c,h,a)});return e},Na=w.every?function(a,b,
	c){return w.every.call(a,b,c)}:function(a,b,c){for(var d=a.length,e=q(a)?a.split(""):a,f=0;f<d;f++)if(f in e&&!b.call(c,e[f],f,a))return!1;return!0};function Oa(a,b){var c=Pa(a,b,void 0);return 0>c?null:q(a)?a.charAt(c):a[c]}function Pa(a,b,c){for(var d=a.length,e=q(a)?a.split(""):a,f=0;f<d;f++)if(f in e&&b.call(c,e[f],f,a))return f;return-1}function Qa(a,b){var c=Ia(a,b);0<=c&&w.splice.call(a,c,1)}function Ra(a,b,c){return 2>=arguments.length?w.slice.call(a,b):w.slice.call(a,b,c)}
	function Sa(a,b){a.sort(b||Ta)}function Ta(a,b){return a>b?1:a<b?-1:0};var Ua=-1!=v.indexOf("Opera")||-1!=v.indexOf("OPR"),Va=-1!=v.indexOf("Trident")||-1!=v.indexOf("MSIE"),Wa=-1!=v.indexOf("Gecko")&&-1==v.toLowerCase().indexOf("webkit")&&!(-1!=v.indexOf("Trident")||-1!=v.indexOf("MSIE")),Xa=-1!=v.toLowerCase().indexOf("webkit");
	(function(){var a="",b;if(Ua&&n.opera)return a=n.opera.version,ga(a)?a():a;Wa?b=/rv\:([^\);]+)(\)|;)/:Va?b=/\b(?:MSIE|rv)[: ]([^\);]+)(\)|;)/:Xa&&(b=/WebKit\/(\S+)/);b&&(a=(a=b.exec(v))?a[1]:"");return Va&&(b=(b=n.document)?b.documentMode:void 0,b>parseFloat(a))?String(b):a})();var Ya=null,Za=null,$a=null;function ab(a,b){if(!ea(a))throw Error("encodeByteArray takes an array as a parameter");bb();for(var c=b?Za:Ya,d=[],e=0;e<a.length;e+=3){var f=a[e],h=e+1<a.length,k=h?a[e+1]:0,m=e+2<a.length,l=m?a[e+2]:0,u=f>>2,f=(f&3)<<4|k>>4,k=(k&15)<<2|l>>6,l=l&63;m||(l=64,h||(k=64));d.push(c[u],c[f],c[k],c[l])}return d.join("")}
	function bb(){if(!Ya){Ya={};Za={};$a={};for(var a=0;65>a;a++)Ya[a]="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=".charAt(a),Za[a]="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_.".charAt(a),$a[Za[a]]=a,62<=a&&($a["ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=".charAt(a)]=a)}};function cb(a){n.setTimeout(function(){throw a;},0)}var db;
	function eb(){var a=n.MessageChannel;"undefined"===typeof a&&"undefined"!==typeof window&&window.postMessage&&window.addEventListener&&-1==v.indexOf("Presto")&&(a=function(){var a=document.createElement("iframe");a.style.display="none";a.src="";document.documentElement.appendChild(a);var b=a.contentWindow,a=b.document;a.open();a.write("");a.close();var c="callImmediate"+Math.random(),d="file:"==b.location.protocol?"*":b.location.protocol+"//"+b.location.host,a=r(function(a){if(("*"==d||a.origin==
	d)&&a.data==c)this.port1.onmessage()},this);b.addEventListener("message",a,!1);this.port1={};this.port2={postMessage:function(){b.postMessage(c,d)}}});if("undefined"!==typeof a&&-1==v.indexOf("Trident")&&-1==v.indexOf("MSIE")){var b=new a,c={},d=c;b.port1.onmessage=function(){if(p(c.next)){c=c.next;var a=c.Le;c.Le=null;a()}};return function(a){d.next={Le:a};d=d.next;b.port2.postMessage(0)}}return"undefined"!==typeof document&&"onreadystatechange"in document.createElement("script")?function(a){var b=
	document.createElement("script");b.onreadystatechange=function(){b.onreadystatechange=null;b.parentNode.removeChild(b);b=null;a();a=null};document.documentElement.appendChild(b)}:function(a){n.setTimeout(a,0)}};function fb(a,b){gb||hb();ib||(gb(),ib=!0);jb.push(new kb(a,b))}var gb;function hb(){if(n.Promise&&n.Promise.resolve){var a=n.Promise.resolve();gb=function(){a.then(lb)}}else gb=function(){var a=lb;!ga(n.setImmediate)||n.Window&&n.Window.prototype&&n.Window.prototype.setImmediate==n.setImmediate?(db||(db=eb()),db(a)):n.setImmediate(a)}}var ib=!1,jb=[];[].push(function(){ib=!1;jb=[]});
	function lb(){for(;jb.length;){var a=jb;jb=[];for(var b=0;b<a.length;b++){var c=a[b];try{c.Wf.call(c.scope)}catch(d){cb(d)}}}ib=!1}function kb(a,b){this.Wf=a;this.scope=b};function mb(a,b){this.L=nb;this.uf=void 0;this.Ca=this.Ha=null;this.jd=this.be=!1;if(a==ob)pb(this,qb,b);else try{var c=this;a.call(b,function(a){pb(c,qb,a)},function(a){if(!(a instanceof rb))try{if(a instanceof Error)throw a;throw Error("Promise rejected.");}catch(b){}pb(c,sb,a)})}catch(d){pb(this,sb,d)}}var nb=0,qb=2,sb=3;function ob(){}mb.prototype.then=function(a,b,c){return tb(this,ga(a)?a:null,ga(b)?b:null,c)};mb.prototype.then=mb.prototype.then;mb.prototype.$goog_Thenable=!0;g=mb.prototype;
	g.Ag=function(a,b){return tb(this,null,a,b)};g.cancel=function(a){this.L==nb&&fb(function(){var b=new rb(a);ub(this,b)},this)};function ub(a,b){if(a.L==nb)if(a.Ha){var c=a.Ha;if(c.Ca){for(var d=0,e=-1,f=0,h;h=c.Ca[f];f++)if(h=h.k)if(d++,h==a&&(e=f),0<=e&&1<d)break;0<=e&&(c.L==nb&&1==d?ub(c,b):(d=c.Ca.splice(e,1)[0],vb(c,d,sb,b)))}a.Ha=null}else pb(a,sb,b)}function wb(a,b){a.Ca&&a.Ca.length||a.L!=qb&&a.L!=sb||xb(a);a.Ca||(a.Ca=[]);a.Ca.push(b)}
	function tb(a,b,c,d){var e={k:null,hf:null,kf:null};e.k=new mb(function(a,h){e.hf=b?function(c){try{var e=b.call(d,c);a(e)}catch(l){h(l)}}:a;e.kf=c?function(b){try{var e=c.call(d,b);!p(e)&&b instanceof rb?h(b):a(e)}catch(l){h(l)}}:h});e.k.Ha=a;wb(a,e);return e.k}g.Cf=function(a){this.L=nb;pb(this,qb,a)};g.Df=function(a){this.L=nb;pb(this,sb,a)};
	function pb(a,b,c){if(a.L==nb){if(a==c)b=sb,c=new TypeError("Promise cannot resolve to itself");else{var d;if(c)try{d=!!c.$goog_Thenable}catch(e){d=!1}else d=!1;if(d){a.L=1;c.then(a.Cf,a.Df,a);return}if(ha(c))try{var f=c.then;if(ga(f)){yb(a,c,f);return}}catch(h){b=sb,c=h}}a.uf=c;a.L=b;a.Ha=null;xb(a);b!=sb||c instanceof rb||zb(a,c)}}function yb(a,b,c){function d(b){f||(f=!0,a.Df(b))}function e(b){f||(f=!0,a.Cf(b))}a.L=1;var f=!1;try{c.call(b,e,d)}catch(h){d(h)}}
	function xb(a){a.be||(a.be=!0,fb(a.Uf,a))}g.Uf=function(){for(;this.Ca&&this.Ca.length;){var a=this.Ca;this.Ca=null;for(var b=0;b<a.length;b++)vb(this,a[b],this.L,this.uf)}this.be=!1};function vb(a,b,c,d){if(c==qb)b.hf(d);else{if(b.k)for(;a&&a.jd;a=a.Ha)a.jd=!1;b.kf(d)}}function zb(a,b){a.jd=!0;fb(function(){a.jd&&Ab.call(null,b)})}var Ab=cb;function rb(a){Ha.call(this,a)}ka(rb,Ha);rb.prototype.name="cancel";function Bb(a,b){return Object.prototype.hasOwnProperty.call(a,b)}function x(a,b){if(Object.prototype.hasOwnProperty.call(a,b))return a[b]}function Cb(a,b){for(var c in a)Object.prototype.hasOwnProperty.call(a,c)&&b(c,a[c])};function y(a,b,c,d){var e;d<b?e="at least "+b:d>c&&(e=0===c?"none":"no more than "+c);if(e)throw Error(a+" failed: Was called with "+d+(1===d?" argument.":" arguments.")+" Expects "+e+".");}function Db(a,b,c){var d="";switch(b){case 1:d=c?"first":"First";break;case 2:d=c?"second":"Second";break;case 3:d=c?"third":"Third";break;case 4:d=c?"fourth":"Fourth";break;default:throw Error("errorPrefix called with argumentNumber > 4.  Need to update it?");}return a=a+" failed: "+(d+" argument ")}
	function A(a,b,c,d){if((!d||p(c))&&!ga(c))throw Error(Db(a,b,d)+"must be a valid function.");}function Eb(a,b,c){if(p(c)&&(!ha(c)||null===c))throw Error(Db(a,b,!0)+"must be a valid context object.");};function Fb(a){var b=[];Cb(a,function(a,d){da(d)?Ja(d,function(d){b.push(encodeURIComponent(a)+"="+encodeURIComponent(d))}):b.push(encodeURIComponent(a)+"="+encodeURIComponent(d))});return b.length?"&"+b.join("&"):""};var Gb=n.Promise||mb;mb.prototype["catch"]=mb.prototype.Ag;function Hb(){var a=this;this.reject=this.resolve=null;this.sa=new Gb(function(b,c){a.resolve=b;a.reject=c})}function Ib(a,b){return function(c,d){c?a.reject(c):a.resolve(d);ga(b)&&(Jb(a.sa),1===b.length?b(c):b(c,d))}}function Jb(a){a.then(void 0,aa)};function Kb(a,b){if(!a)throw Lb(b);}function Lb(a){return Error("Firebase Database ("+firebase.SDK_VERSION+") INTERNAL ASSERT FAILED: "+a)};function Mb(a){for(var b=[],c=0,d=0;d<a.length;d++){var e=a.charCodeAt(d);55296<=e&&56319>=e&&(e-=55296,d++,Kb(d<a.length,"Surrogate pair missing trail surrogate."),e=65536+(e<<10)+(a.charCodeAt(d)-56320));128>e?b[c++]=e:(2048>e?b[c++]=e>>6|192:(65536>e?b[c++]=e>>12|224:(b[c++]=e>>18|240,b[c++]=e>>12&63|128),b[c++]=e>>6&63|128),b[c++]=e&63|128)}return b}function Nb(a){for(var b=0,c=0;c<a.length;c++){var d=a.charCodeAt(c);128>d?b++:2048>d?b+=2:55296<=d&&56319>=d?(b+=4,c++):b+=3}return b};function Ob(a){return"undefined"!==typeof JSON&&p(JSON.parse)?JSON.parse(a):za(a)}function B(a){if("undefined"!==typeof JSON&&p(JSON.stringify))a=JSON.stringify(a);else{var b=[];Ba(new Aa,a,b);a=b.join("")}return a};function Pb(a,b){this.committed=a;this.snapshot=b};function Qb(){return"undefined"!==typeof window&&!!(window.cordova||window.phonegap||window.PhoneGap)&&/ios|iphone|ipod|ipad|android|blackberry|iemobile/i.test("undefined"!==typeof navigator&&"string"===typeof navigator.userAgent?navigator.userAgent:"")};function Rb(a){this.te=a;this.Bd=[];this.Rb=0;this.Yd=-1;this.Gb=null}function Sb(a,b,c){a.Yd=b;a.Gb=c;a.Yd<a.Rb&&(a.Gb(),a.Gb=null)}function Tb(a,b,c){for(a.Bd[b]=c;a.Bd[a.Rb];){var d=a.Bd[a.Rb];delete a.Bd[a.Rb];for(var e=0;e<d.length;++e)if(d[e]){var f=a;Ub(function(){f.te(d[e])})}if(a.Rb===a.Yd){a.Gb&&(clearTimeout(a.Gb),a.Gb(),a.Gb=null);break}a.Rb++}};function Vb(){this.qc={}}Vb.prototype.set=function(a,b){null==b?delete this.qc[a]:this.qc[a]=b};Vb.prototype.get=function(a){return Bb(this.qc,a)?this.qc[a]:null};Vb.prototype.remove=function(a){delete this.qc[a]};Vb.prototype.cf=!0;function Wb(a){this.vc=a;this.Cd="firebase:"}g=Wb.prototype;g.set=function(a,b){null==b?this.vc.removeItem(this.Cd+a):this.vc.setItem(this.Cd+a,B(b))};g.get=function(a){a=this.vc.getItem(this.Cd+a);return null==a?null:Ob(a)};g.remove=function(a){this.vc.removeItem(this.Cd+a)};g.cf=!1;g.toString=function(){return this.vc.toString()};function Xb(a){try{if("undefined"!==typeof window&&"undefined"!==typeof window[a]){var b=window[a];b.setItem("firebase:sentinel","cache");b.removeItem("firebase:sentinel");return new Wb(b)}}catch(c){}return new Vb}var Yb=Xb("localStorage"),Zb=Xb("sessionStorage");function $b(a,b,c){this.type=ac;this.source=a;this.path=b;this.Ja=c}$b.prototype.Nc=function(a){return this.path.e()?new $b(this.source,C,this.Ja.R(a)):new $b(this.source,D(this.path),this.Ja)};$b.prototype.toString=function(){return"Operation("+this.path+": "+this.source.toString()+" overwrite: "+this.Ja.toString()+")"};function bc(a,b){this.type=cc;this.source=a;this.path=b}bc.prototype.Nc=function(){return this.path.e()?new bc(this.source,C):new bc(this.source,D(this.path))};bc.prototype.toString=function(){return"Operation("+this.path+": "+this.source.toString()+" listen_complete)"};function dc(a){this.He=a}dc.prototype.getToken=function(a){return this.He.INTERNAL.getToken(a).then(null,function(a){return a&&"auth/token-not-initialized"===a.code?(E("Got auth/token-not-initialized error.  Treating as null token."),null):Promise.reject(a)})};function ec(a,b){a.He.INTERNAL.addAuthTokenListener(b)};function fc(){this.Jd=F}fc.prototype.j=function(a){return this.Jd.Q(a)};fc.prototype.toString=function(){return this.Jd.toString()};function gc(a,b,c,d,e){this.host=a.toLowerCase();this.domain=this.host.substr(this.host.indexOf(".")+1);this.Sc=b;this.pe=c;this.Cg=d;this.nf=e||"";this.bb=Yb.get("host:"+a)||this.host}function hc(a,b){b!==a.bb&&(a.bb=b,"s-"===a.bb.substr(0,2)&&Yb.set("host:"+a.host,a.bb))}
	function ic(a,b,c){H("string"===typeof b,"typeof type must == string");H("object"===typeof c,"typeof params must == object");if("websocket"===b)b=(a.Sc?"wss://":"ws://")+a.bb+"/.ws?";else if("long_polling"===b)b=(a.Sc?"https://":"http://")+a.bb+"/.lp?";else throw Error("Unknown connection type: "+b);a.host!==a.bb&&(c.ns=a.pe);var d=[];t(c,function(a,b){d.push(b+"="+a)});return b+d.join("&")}
	gc.prototype.toString=function(){var a=(this.Sc?"https://":"http://")+this.host;this.nf&&(a+="<"+this.nf+">");return a};function jc(){this.uc={}}function kc(a,b,c){p(c)||(c=1);Bb(a.uc,b)||(a.uc[b]=0);a.uc[b]+=c}jc.prototype.get=function(){return ya(this.uc)};function lc(a){this.Nf=a;this.rd=null}lc.prototype.get=function(){var a=this.Nf.get(),b=ya(a);if(this.rd)for(var c in this.rd)b[c]-=this.rd[c];this.rd=a;return b};function mc(){this.wb=[]}function nc(a,b){for(var c=null,d=0;d<b.length;d++){var e=b[d],f=e.Zb();null===c||f.$(c.Zb())||(a.wb.push(c),c=null);null===c&&(c=new oc(f));c.add(e)}c&&a.wb.push(c)}function pc(a,b,c){nc(a,c);qc(a,function(a){return a.$(b)})}function rc(a,b,c){nc(a,c);qc(a,function(a){return a.contains(b)||b.contains(a)})}
	function qc(a,b){for(var c=!0,d=0;d<a.wb.length;d++){var e=a.wb[d];if(e)if(e=e.Zb(),b(e)){for(var e=a.wb[d],f=0;f<e.hd.length;f++){var h=e.hd[f];if(null!==h){e.hd[f]=null;var k=h.Ub();sc&&E("event: "+h.toString());Ub(k)}}a.wb[d]=null}else c=!1}c&&(a.wb=[])}function oc(a){this.ra=a;this.hd=[]}oc.prototype.add=function(a){this.hd.push(a)};oc.prototype.Zb=function(){return this.ra};function tc(a,b,c,d){this.ae=b;this.Md=c;this.Dd=d;this.gd=a}tc.prototype.Zb=function(){var a=this.Md.xb();return"value"===this.gd?a.path:a.getParent().path};tc.prototype.ge=function(){return this.gd};tc.prototype.Ub=function(){return this.ae.Ub(this)};tc.prototype.toString=function(){return this.Zb().toString()+":"+this.gd+":"+B(this.Md.Ue())};function uc(a,b,c){this.ae=a;this.error=b;this.path=c}uc.prototype.Zb=function(){return this.path};uc.prototype.ge=function(){return"cancel"};
	uc.prototype.Ub=function(){return this.ae.Ub(this)};uc.prototype.toString=function(){return this.path.toString()+":cancel"};function vc(){}vc.prototype.Xe=function(){return null};vc.prototype.fe=function(){return null};var wc=new vc;function xc(a,b,c){this.Gf=a;this.Na=b;this.yd=c}xc.prototype.Xe=function(a){var b=this.Na.O;if(yc(b,a))return b.j().R(a);b=null!=this.yd?new zc(this.yd,!0,!1):this.Na.w();return this.Gf.rc(a,b)};xc.prototype.fe=function(a,b,c){var d=null!=this.yd?this.yd:Ac(this.Na);a=this.Gf.Xd(d,b,1,c,a);return 0===a.length?null:a[0]};function I(a,b,c,d){this.type=a;this.Ma=b;this.Za=c;this.qe=d;this.Dd=void 0}function Bc(a){return new I(Cc,a)}var Cc="value";function zc(a,b,c){this.A=a;this.ea=b;this.Tb=c}function Dc(a){return a.ea}function Ec(a){return a.Tb}function Fc(a,b){return b.e()?a.ea&&!a.Tb:yc(a,J(b))}function yc(a,b){return a.ea&&!a.Tb||a.A.Fa(b)}zc.prototype.j=function(){return this.A};function Gc(a,b){return Hc(a.name,b.name)}function Ic(a,b){return Hc(a,b)};function K(a,b){this.name=a;this.S=b}function Jc(a,b){return new K(a,b)};function Kc(a,b){return a&&"object"===typeof a?(H(".sv"in a,"Unexpected leaf node or priority contents"),b[a[".sv"]]):a}function Lc(a,b){var c=new Mc;Nc(a,new L(""),function(a,e){Oc(c,a,Pc(e,b))});return c}function Pc(a,b){var c=a.C().H(),c=Kc(c,b),d;if(a.J()){var e=Kc(a.Ea(),b);return e!==a.Ea()||c!==a.C().H()?new Qc(e,M(c)):a}d=a;c!==a.C().H()&&(d=d.ga(new Qc(c)));a.P(N,function(a,c){var e=Pc(c,b);e!==c&&(d=d.U(a,e))});return d};var Rc=function(){var a=1;return function(){return a++}}(),H=Kb,Sc=Lb;
	function Tc(a){try{var b;bb();for(var c=$a,d=[],e=0;e<a.length;){var f=c[a.charAt(e++)],h=e<a.length?c[a.charAt(e)]:0;++e;var k=e<a.length?c[a.charAt(e)]:64;++e;var m=e<a.length?c[a.charAt(e)]:64;++e;if(null==f||null==h||null==k||null==m)throw Error();d.push(f<<2|h>>4);64!=k&&(d.push(h<<4&240|k>>2),64!=m&&d.push(k<<6&192|m))}if(8192>d.length)b=String.fromCharCode.apply(null,d);else{a="";for(c=0;c<d.length;c+=8192)a+=String.fromCharCode.apply(null,Ra(d,c,c+8192));b=a}return b}catch(l){E("base64Decode failed: ",
	l)}return null}function Uc(a){var b=Mb(a);a=new ma;a.update(b);var b=[],c=8*a.Pd;56>a.ac?a.update(a.zd,56-a.ac):a.update(a.zd,a.Ya-(a.ac-56));for(var d=a.Ya-1;56<=d;d--)a.Wd[d]=c&255,c/=256;na(a,a.Wd);for(d=c=0;5>d;d++)for(var e=24;0<=e;e-=8)b[c]=a.N[d]>>e&255,++c;return ab(b)}function Vc(a){for(var b="",c=0;c<arguments.length;c++)b=ea(arguments[c])?b+Vc.apply(null,arguments[c]):"object"===typeof arguments[c]?b+B(arguments[c]):b+arguments[c],b+=" ";return b}var sc=null,Wc=!0;
	function Xc(a,b){Kb(!b||!0===a||!1===a,"Can't turn on custom loggers persistently.");!0===a?("undefined"!==typeof console&&("function"===typeof console.log?sc=r(console.log,console):"object"===typeof console.log&&(sc=function(a){console.log(a)})),b&&Zb.set("logging_enabled",!0)):ga(a)?sc=a:(sc=null,Zb.remove("logging_enabled"))}function E(a){!0===Wc&&(Wc=!1,null===sc&&!0===Zb.get("logging_enabled")&&Xc(!0));if(sc){var b=Vc.apply(null,arguments);sc(b)}}
	function Yc(a){return function(){E(a,arguments)}}function Zc(a){if("undefined"!==typeof console){var b="FIREBASE INTERNAL ERROR: "+Vc.apply(null,arguments);"undefined"!==typeof console.error?console.error(b):console.log(b)}}function $c(a){var b=Vc.apply(null,arguments);throw Error("FIREBASE FATAL ERROR: "+b);}function O(a){if("undefined"!==typeof console){var b="FIREBASE WARNING: "+Vc.apply(null,arguments);"undefined"!==typeof console.warn?console.warn(b):console.log(b)}}
	function ad(a){var b,c,d,e,f,h=a;f=c=a=b="";d=!0;e="https";if(q(h)){var k=h.indexOf("//");0<=k&&(e=h.substring(0,k-1),h=h.substring(k+2));k=h.indexOf("/");-1===k&&(k=h.length);b=h.substring(0,k);f="";h=h.substring(k).split("/");for(k=0;k<h.length;k++)if(0<h[k].length){var m=h[k];try{m=decodeURIComponent(m.replace(/\+/g," "))}catch(l){}f+="/"+m}h=b.split(".");3===h.length?(a=h[1],c=h[0].toLowerCase()):2===h.length&&(a=h[0]);k=b.indexOf(":");0<=k&&(d="https"===e||"wss"===e)}"firebase"===a&&$c(b+" is no longer supported. Please use <YOUR FIREBASE>.firebaseio.com instead");
	c&&"undefined"!=c||$c("Cannot parse Firebase url. Please use https://<YOUR FIREBASE>.firebaseio.com");d||"undefined"!==typeof window&&window.location&&window.location.protocol&&-1!==window.location.protocol.indexOf("https:")&&O("Insecure Firebase access from a secure page. Please use https in calls to new Firebase().");return{kc:new gc(b,d,c,"ws"===e||"wss"===e),path:new L(f)}}function bd(a){return fa(a)&&(a!=a||a==Number.POSITIVE_INFINITY||a==Number.NEGATIVE_INFINITY)}
	function cd(a){if("complete"===document.readyState)a();else{var b=!1,c=function(){document.body?b||(b=!0,a()):setTimeout(c,Math.floor(10))};document.addEventListener?(document.addEventListener("DOMContentLoaded",c,!1),window.addEventListener("load",c,!1)):document.attachEvent&&(document.attachEvent("onreadystatechange",function(){"complete"===document.readyState&&c()}),window.attachEvent("onload",c))}}
	function Hc(a,b){if(a===b)return 0;if("[MIN_NAME]"===a||"[MAX_NAME]"===b)return-1;if("[MIN_NAME]"===b||"[MAX_NAME]"===a)return 1;var c=dd(a),d=dd(b);return null!==c?null!==d?0==c-d?a.length-b.length:c-d:-1:null!==d?1:a<b?-1:1}function ed(a,b){if(b&&a in b)return b[a];throw Error("Missing required key ("+a+") in object: "+B(b));}
	function fd(a){if("object"!==typeof a||null===a)return B(a);var b=[],c;for(c in a)b.push(c);b.sort();c="{";for(var d=0;d<b.length;d++)0!==d&&(c+=","),c+=B(b[d]),c+=":",c+=fd(a[b[d]]);return c+"}"}function gd(a,b){if(a.length<=b)return[a];for(var c=[],d=0;d<a.length;d+=b)d+b>a?c.push(a.substring(d,a.length)):c.push(a.substring(d,d+b));return c}function hd(a,b){if(da(a))for(var c=0;c<a.length;++c)b(c,a[c]);else t(a,b)}
	function id(a){H(!bd(a),"Invalid JSON number");var b,c,d,e;0===a?(d=c=0,b=-Infinity===1/a?1:0):(b=0>a,a=Math.abs(a),a>=Math.pow(2,-1022)?(d=Math.min(Math.floor(Math.log(a)/Math.LN2),1023),c=d+1023,d=Math.round(a*Math.pow(2,52-d)-Math.pow(2,52))):(c=0,d=Math.round(a/Math.pow(2,-1074))));e=[];for(a=52;a;--a)e.push(d%2?1:0),d=Math.floor(d/2);for(a=11;a;--a)e.push(c%2?1:0),c=Math.floor(c/2);e.push(b?1:0);e.reverse();b=e.join("");c="";for(a=0;64>a;a+=8)d=parseInt(b.substr(a,8),2).toString(16),1===d.length&&
	(d="0"+d),c+=d;return c.toLowerCase()}var jd=/^-?\d{1,10}$/;function dd(a){return jd.test(a)&&(a=Number(a),-2147483648<=a&&2147483647>=a)?a:null}function Ub(a){try{a()}catch(b){setTimeout(function(){O("Exception was thrown by user callback.",b.stack||"");throw b;},Math.floor(0))}}function kd(a,b,c){Object.defineProperty(a,b,{get:c})}function ld(a,b){var c=setTimeout(a,b);"object"===typeof c&&c.unref&&c.unref();return c};function md(a){var b={},c={},d={},e="";try{var f=a.split("."),b=Ob(Tc(f[0])||""),c=Ob(Tc(f[1])||""),e=f[2],d=c.d||{};delete c.d}catch(h){}return{Fg:b,Me:c,data:d,xg:e}}function nd(a){a=md(a);var b=a.Me;return!!a.xg&&!!b&&"object"===typeof b&&b.hasOwnProperty("iat")}function od(a){a=md(a).Me;return"object"===typeof a&&!0===x(a,"admin")};function pd(a,b,c){this.f=Yc("p:rest:");this.M=a;this.Hb=b;this.Vd=c;this.aa={}}function qd(a,b){if(p(b))return"tag$"+b;H(rd(a.n),"should have a tag if it's not a default query.");return a.path.toString()}g=pd.prototype;
	g.df=function(a,b,c,d){var e=a.path.toString();this.f("Listen called for "+e+" "+a.ka());var f=qd(a,c),h={};this.aa[f]=h;a=sd(a.n);var k=this;td(this,e+".json",a,function(a,b){var u=b;404===a&&(a=u=null);null===a&&k.Hb(e,u,!1,c);x(k.aa,f)===h&&d(a?401==a?"permission_denied":"rest_error:"+a:"ok",null)})};g.Ef=function(a,b){var c=qd(a,b);delete this.aa[c]};g.qf=function(){};g.re=function(){};g.gf=function(){};g.xd=function(){};g.put=function(){};g.ef=function(){};g.ye=function(){};
	function td(a,b,c,d){c=c||{};c.format="export";a.Vd.getToken(!1).then(function(e){(e=e&&e.accessToken)&&(c.auth=e);var f=(a.M.Sc?"https://":"http://")+a.M.host+b+"?"+Fb(c);a.f("Sending REST request for "+f);var h=new XMLHttpRequest;h.onreadystatechange=function(){if(d&&4===h.readyState){a.f("REST Response for "+f+" received. status:",h.status,"response:",h.responseText);var b=null;if(200<=h.status&&300>h.status){try{b=Ob(h.responseText)}catch(c){O("Failed to parse JSON response for "+f+": "+h.responseText)}d(null,
	b)}else 401!==h.status&&404!==h.status&&O("Got unsuccessful REST response for "+f+" Status: "+h.status),d(h.status);d=null}};h.open("GET",f,!0);h.send()})};function vd(a,b,c){this.type=wd;this.source=a;this.path=b;this.children=c}vd.prototype.Nc=function(a){if(this.path.e())return a=this.children.subtree(new L(a)),a.e()?null:a.value?new $b(this.source,C,a.value):new vd(this.source,C,a);H(J(this.path)===a,"Can't get a merge for a child not on the path of the operation");return new vd(this.source,D(this.path),this.children)};vd.prototype.toString=function(){return"Operation("+this.path+": "+this.source.toString()+" merge: "+this.children.toString()+")"};function xd(a,b){this.zf={};this.Vc=new lc(a);this.wa=b;var c=1E4+2E4*Math.random();ld(r(this.rf,this),Math.floor(c))}xd.prototype.rf=function(){var a=this.Vc.get(),b={},c=!1,d;for(d in a)0<a[d]&&Bb(this.zf,d)&&(b[d]=a[d],c=!0);c&&this.wa.ye(b);ld(r(this.rf,this),Math.floor(6E5*Math.random()))};var yd={},zd={};function Ad(a){a=a.toString();yd[a]||(yd[a]=new jc);return yd[a]}function Bd(a,b){var c=a.toString();zd[c]||(zd[c]=b());return zd[c]};var Cd=null;"undefined"!==typeof MozWebSocket?Cd=MozWebSocket:"undefined"!==typeof WebSocket&&(Cd=WebSocket);function Dd(a,b,c,d){this.Zd=a;this.f=Yc(this.Zd);this.frames=this.Ac=null;this.qb=this.rb=this.Fe=0;this.Xa=Ad(b);a={v:"5"};"undefined"!==typeof location&&location.href&&-1!==location.href.indexOf("firebaseio.com")&&(a.r="f");c&&(a.s=c);d&&(a.ls=d);this.Ne=ic(b,"websocket",a)}var Ed;
	Dd.prototype.open=function(a,b){this.kb=b;this.hg=a;this.f("Websocket connecting to "+this.Ne);this.xc=!1;Yb.set("previous_websocket_failure",!0);try{this.La=new Cd(this.Ne)}catch(c){this.f("Error instantiating WebSocket.");var d=c.message||c.data;d&&this.f(d);this.fb();return}var e=this;this.La.onopen=function(){e.f("Websocket connected.");e.xc=!0};this.La.onclose=function(){e.f("Websocket connection was disconnected.");e.La=null;e.fb()};this.La.onmessage=function(a){if(null!==e.La)if(a=a.data,e.qb+=
	a.length,kc(e.Xa,"bytes_received",a.length),Fd(e),null!==e.frames)Gd(e,a);else{a:{H(null===e.frames,"We already have a frame buffer");if(6>=a.length){var b=Number(a);if(!isNaN(b)){e.Fe=b;e.frames=[];a=null;break a}}e.Fe=1;e.frames=[]}null!==a&&Gd(e,a)}};this.La.onerror=function(a){e.f("WebSocket error.  Closing connection.");(a=a.message||a.data)&&e.f(a);e.fb()}};Dd.prototype.start=function(){};
	Dd.isAvailable=function(){var a=!1;if("undefined"!==typeof navigator&&navigator.userAgent){var b=navigator.userAgent.match(/Android ([0-9]{0,}\.[0-9]{0,})/);b&&1<b.length&&4.4>parseFloat(b[1])&&(a=!0)}return!a&&null!==Cd&&!Ed};Dd.responsesRequiredToBeHealthy=2;Dd.healthyTimeout=3E4;g=Dd.prototype;g.sd=function(){Yb.remove("previous_websocket_failure")};function Gd(a,b){a.frames.push(b);if(a.frames.length==a.Fe){var c=a.frames.join("");a.frames=null;c=Ob(c);a.hg(c)}}
	g.send=function(a){Fd(this);a=B(a);this.rb+=a.length;kc(this.Xa,"bytes_sent",a.length);a=gd(a,16384);1<a.length&&Hd(this,String(a.length));for(var b=0;b<a.length;b++)Hd(this,a[b])};g.Tc=function(){this.Bb=!0;this.Ac&&(clearInterval(this.Ac),this.Ac=null);this.La&&(this.La.close(),this.La=null)};g.fb=function(){this.Bb||(this.f("WebSocket is closing itself"),this.Tc(),this.kb&&(this.kb(this.xc),this.kb=null))};g.close=function(){this.Bb||(this.f("WebSocket is being closed"),this.Tc())};
	function Fd(a){clearInterval(a.Ac);a.Ac=setInterval(function(){a.La&&Hd(a,"0");Fd(a)},Math.floor(45E3))}function Hd(a,b){try{a.La.send(b)}catch(c){a.f("Exception thrown from WebSocket.send():",c.message||c.data,"Closing connection."),setTimeout(r(a.fb,a),0)}};function Id(){this.hb={}}
	function Jd(a,b){var c=b.type,d=b.Za;H("child_added"==c||"child_changed"==c||"child_removed"==c,"Only child changes supported for tracking");H(".priority"!==d,"Only non-priority child changes can be tracked.");var e=x(a.hb,d);if(e){var f=e.type;if("child_added"==c&&"child_removed"==f)a.hb[d]=new I("child_changed",b.Ma,d,e.Ma);else if("child_removed"==c&&"child_added"==f)delete a.hb[d];else if("child_removed"==c&&"child_changed"==f)a.hb[d]=new I("child_removed",e.qe,d);else if("child_changed"==c&&
	"child_added"==f)a.hb[d]=new I("child_added",b.Ma,d);else if("child_changed"==c&&"child_changed"==f)a.hb[d]=new I("child_changed",b.Ma,d,e.qe);else throw Sc("Illegal combination of changes: "+b+" occurred after "+e);}else a.hb[d]=b};function Kd(a){this.W=a;this.g=a.n.g}function Ld(a,b,c,d){var e=[],f=[];Ja(b,function(b){"child_changed"===b.type&&a.g.nd(b.qe,b.Ma)&&f.push(new I("child_moved",b.Ma,b.Za))});Md(a,e,"child_removed",b,d,c);Md(a,e,"child_added",b,d,c);Md(a,e,"child_moved",f,d,c);Md(a,e,"child_changed",b,d,c);Md(a,e,Cc,b,d,c);return e}function Md(a,b,c,d,e,f){d=Ka(d,function(a){return a.type===c});Sa(d,r(a.Of,a));Ja(d,function(c){var d=Nd(a,c,f);Ja(e,function(e){e.tf(c.type)&&b.push(e.createEvent(d,a.W))})})}
	function Nd(a,b,c){"value"!==b.type&&"child_removed"!==b.type&&(b.Dd=c.Ze(b.Za,b.Ma,a.g));return b}Kd.prototype.Of=function(a,b){if(null==a.Za||null==b.Za)throw Sc("Should only compare child_ events.");return this.g.compare(new K(a.Za,a.Ma),new K(b.Za,b.Ma))};function Od(a,b){this.Sd=a;this.Mf=b}function Pd(a){this.V=a}
	Pd.prototype.gb=function(a,b,c,d){var e=new Id,f;if(b.type===ac)b.source.ee?c=Qd(this,a,b.path,b.Ja,c,d,e):(H(b.source.We,"Unknown source."),f=b.source.Ee||Ec(a.w())&&!b.path.e(),c=Rd(this,a,b.path,b.Ja,c,d,f,e));else if(b.type===wd)b.source.ee?c=Sd(this,a,b.path,b.children,c,d,e):(H(b.source.We,"Unknown source."),f=b.source.Ee||Ec(a.w()),c=Td(this,a,b.path,b.children,c,d,f,e));else if(b.type===Ud)if(b.Id)if(b=b.path,null!=c.mc(b))c=a;else{f=new xc(c,a,d);d=a.O.j();if(b.e()||".priority"===J(b))Dc(a.w())?
	b=c.Ba(Ac(a)):(b=a.w().j(),H(b instanceof P,"serverChildren would be complete if leaf node"),b=c.sc(b)),b=this.V.za(d,b,e);else{var h=J(b),k=c.rc(h,a.w());null==k&&yc(a.w(),h)&&(k=d.R(h));b=null!=k?this.V.F(d,h,k,D(b),f,e):a.O.j().Fa(h)?this.V.F(d,h,F,D(b),f,e):d;b.e()&&Dc(a.w())&&(d=c.Ba(Ac(a)),d.J()&&(b=this.V.za(b,d,e)))}d=Dc(a.w())||null!=c.mc(C);c=Vd(a,b,d,this.V.Qa())}else c=Wd(this,a,b.path,b.Pb,c,d,e);else if(b.type===cc)d=b.path,b=a.w(),f=b.j(),h=b.ea||d.e(),c=Xd(this,new Yd(a.O,new zc(f,
	h,b.Tb)),d,c,wc,e);else throw Sc("Unknown operation type: "+b.type);e=sa(e.hb);d=c;b=d.O;b.ea&&(f=b.j().J()||b.j().e(),h=Zd(a),(0<e.length||!a.O.ea||f&&!b.j().$(h)||!b.j().C().$(h.C()))&&e.push(Bc(Zd(d))));return new Od(c,e)};
	function Xd(a,b,c,d,e,f){var h=b.O;if(null!=d.mc(c))return b;var k;if(c.e())H(Dc(b.w()),"If change path is empty, we must have complete server data"),Ec(b.w())?(e=Ac(b),d=d.sc(e instanceof P?e:F)):d=d.Ba(Ac(b)),f=a.V.za(b.O.j(),d,f);else{var m=J(c);if(".priority"==m)H(1==$d(c),"Can't have a priority with additional path components"),f=h.j(),k=b.w().j(),d=d.$c(c,f,k),f=null!=d?a.V.ga(f,d):h.j();else{var l=D(c);yc(h,m)?(k=b.w().j(),d=d.$c(c,h.j(),k),d=null!=d?h.j().R(m).F(l,d):h.j().R(m)):d=d.rc(m,
	b.w());f=null!=d?a.V.F(h.j(),m,d,l,e,f):h.j()}}return Vd(b,f,h.ea||c.e(),a.V.Qa())}function Rd(a,b,c,d,e,f,h,k){var m=b.w();h=h?a.V:a.V.Vb();if(c.e())d=h.za(m.j(),d,null);else if(h.Qa()&&!m.Tb)d=m.j().F(c,d),d=h.za(m.j(),d,null);else{var l=J(c);if(!Fc(m,c)&&1<$d(c))return b;var u=D(c);d=m.j().R(l).F(u,d);d=".priority"==l?h.ga(m.j(),d):h.F(m.j(),l,d,u,wc,null)}m=m.ea||c.e();b=new Yd(b.O,new zc(d,m,h.Qa()));return Xd(a,b,c,e,new xc(e,b,f),k)}
	function Qd(a,b,c,d,e,f,h){var k=b.O;e=new xc(e,b,f);if(c.e())h=a.V.za(b.O.j(),d,h),a=Vd(b,h,!0,a.V.Qa());else if(f=J(c),".priority"===f)h=a.V.ga(b.O.j(),d),a=Vd(b,h,k.ea,k.Tb);else{c=D(c);var m=k.j().R(f);if(!c.e()){var l=e.Xe(f);d=null!=l?".priority"===ae(c)&&l.Q(c.parent()).e()?l:l.F(c,d):F}m.$(d)?a=b:(h=a.V.F(k.j(),f,d,c,e,h),a=Vd(b,h,k.ea,a.V.Qa()))}return a}
	function Sd(a,b,c,d,e,f,h){var k=b;be(d,function(d,l){var u=c.k(d);yc(b.O,J(u))&&(k=Qd(a,k,u,l,e,f,h))});be(d,function(d,l){var u=c.k(d);yc(b.O,J(u))||(k=Qd(a,k,u,l,e,f,h))});return k}function ce(a,b){be(b,function(b,d){a=a.F(b,d)});return a}
	function Td(a,b,c,d,e,f,h,k){if(b.w().j().e()&&!Dc(b.w()))return b;var m=b;c=c.e()?d:de(Q,c,d);var l=b.w().j();c.children.ia(function(c,d){if(l.Fa(c)){var G=b.w().j().R(c),G=ce(G,d);m=Rd(a,m,new L(c),G,e,f,h,k)}});c.children.ia(function(c,d){var G=!yc(b.w(),c)&&null==d.value;l.Fa(c)||G||(G=b.w().j().R(c),G=ce(G,d),m=Rd(a,m,new L(c),G,e,f,h,k))});return m}
	function Wd(a,b,c,d,e,f,h){if(null!=e.mc(c))return b;var k=Ec(b.w()),m=b.w();if(null!=d.value){if(c.e()&&m.ea||Fc(m,c))return Rd(a,b,c,m.j().Q(c),e,f,k,h);if(c.e()){var l=Q;m.j().P(ee,function(a,b){l=l.set(new L(a),b)});return Td(a,b,c,l,e,f,k,h)}return b}l=Q;be(d,function(a){var b=c.k(a);Fc(m,b)&&(l=l.set(a,m.j().Q(b)))});return Td(a,b,c,l,e,f,k,h)};function fe(a){this.g=a}g=fe.prototype;g.F=function(a,b,c,d,e,f){H(a.zc(this.g),"A node must be indexed if only a child is updated");e=a.R(b);if(e.Q(d).$(c.Q(d))&&e.e()==c.e())return a;null!=f&&(c.e()?a.Fa(b)?Jd(f,new I("child_removed",e,b)):H(a.J(),"A child remove without an old child only makes sense on a leaf node"):e.e()?Jd(f,new I("child_added",c,b)):Jd(f,new I("child_changed",c,b,e)));return a.J()&&c.e()?a:a.U(b,c).ob(this.g)};
	g.za=function(a,b,c){null!=c&&(a.J()||a.P(N,function(a,e){b.Fa(a)||Jd(c,new I("child_removed",e,a))}),b.J()||b.P(N,function(b,e){if(a.Fa(b)){var f=a.R(b);f.$(e)||Jd(c,new I("child_changed",e,b,f))}else Jd(c,new I("child_added",e,b))}));return b.ob(this.g)};g.ga=function(a,b){return a.e()?F:a.ga(b)};g.Qa=function(){return!1};g.Vb=function(){return this};function ge(a){this.he=new fe(a.g);this.g=a.g;var b;a.la?(b=he(a),b=a.g.Fc(ie(a),b)):b=a.g.Ic();this.Uc=b;a.oa?(b=je(a),a=a.g.Fc(ke(a),b)):a=a.g.Gc();this.wc=a}g=ge.prototype;g.matches=function(a){return 0>=this.g.compare(this.Uc,a)&&0>=this.g.compare(a,this.wc)};g.F=function(a,b,c,d,e,f){this.matches(new K(b,c))||(c=F);return this.he.F(a,b,c,d,e,f)};
	g.za=function(a,b,c){b.J()&&(b=F);var d=b.ob(this.g),d=d.ga(F),e=this;b.P(N,function(a,b){e.matches(new K(a,b))||(d=d.U(a,F))});return this.he.za(a,d,c)};g.ga=function(a){return a};g.Qa=function(){return!0};g.Vb=function(){return this.he};function le(a){this.ta=new ge(a);this.g=a.g;H(a.ya,"Only valid if limit has been set");this.pa=a.pa;this.Jb=!me(a)}g=le.prototype;g.F=function(a,b,c,d,e,f){this.ta.matches(new K(b,c))||(c=F);return a.R(b).$(c)?a:a.Fb()<this.pa?this.ta.Vb().F(a,b,c,d,e,f):ne(this,a,b,c,e,f)};
	g.za=function(a,b,c){var d;if(b.J()||b.e())d=F.ob(this.g);else if(2*this.pa<b.Fb()&&b.zc(this.g)){d=F.ob(this.g);b=this.Jb?b.$b(this.ta.wc,this.g):b.Yb(this.ta.Uc,this.g);for(var e=0;0<b.Sa.length&&e<this.pa;){var f=R(b),h;if(h=this.Jb?0>=this.g.compare(this.ta.Uc,f):0>=this.g.compare(f,this.ta.wc))d=d.U(f.name,f.S),e++;else break}}else{d=b.ob(this.g);d=d.ga(F);var k,m,l;if(this.Jb){b=d.$e(this.g);k=this.ta.wc;m=this.ta.Uc;var u=oe(this.g);l=function(a,b){return u(b,a)}}else b=d.Xb(this.g),k=this.ta.Uc,
	m=this.ta.wc,l=oe(this.g);for(var e=0,z=!1;0<b.Sa.length;)f=R(b),!z&&0>=l(k,f)&&(z=!0),(h=z&&e<this.pa&&0>=l(f,m))?e++:d=d.U(f.name,F)}return this.ta.Vb().za(a,d,c)};g.ga=function(a){return a};g.Qa=function(){return!0};g.Vb=function(){return this.ta.Vb()};
	function ne(a,b,c,d,e,f){var h;if(a.Jb){var k=oe(a.g);h=function(a,b){return k(b,a)}}else h=oe(a.g);H(b.Fb()==a.pa,"");var m=new K(c,d),l=a.Jb?pe(b,a.g):qe(b,a.g),u=a.ta.matches(m);if(b.Fa(c)){for(var z=b.R(c),l=e.fe(a.g,l,a.Jb);null!=l&&(l.name==c||b.Fa(l.name));)l=e.fe(a.g,l,a.Jb);e=null==l?1:h(l,m);if(u&&!d.e()&&0<=e)return null!=f&&Jd(f,new I("child_changed",d,c,z)),b.U(c,d);null!=f&&Jd(f,new I("child_removed",z,c));b=b.U(c,F);return null!=l&&a.ta.matches(l)?(null!=f&&Jd(f,new I("child_added",
	l.S,l.name)),b.U(l.name,l.S)):b}return d.e()?b:u&&0<=h(l,m)?(null!=f&&(Jd(f,new I("child_removed",l.S,l.name)),Jd(f,new I("child_added",d,c))),b.U(c,d).U(l.name,F)):b};function Qc(a,b){this.B=a;H(p(this.B)&&null!==this.B,"LeafNode shouldn't be created with null/undefined value.");this.ba=b||F;re(this.ba);this.Eb=null}var se=["object","boolean","number","string"];g=Qc.prototype;g.J=function(){return!0};g.C=function(){return this.ba};g.ga=function(a){return new Qc(this.B,a)};g.R=function(a){return".priority"===a?this.ba:F};g.Q=function(a){return a.e()?this:".priority"===J(a)?this.ba:F};g.Fa=function(){return!1};g.Ze=function(){return null};
	g.U=function(a,b){return".priority"===a?this.ga(b):b.e()&&".priority"!==a?this:F.U(a,b).ga(this.ba)};g.F=function(a,b){var c=J(a);if(null===c)return b;if(b.e()&&".priority"!==c)return this;H(".priority"!==c||1===$d(a),".priority must be the last token in a path");return this.U(c,F.F(D(a),b))};g.e=function(){return!1};g.Fb=function(){return 0};g.P=function(){return!1};g.H=function(a){return a&&!this.C().e()?{".value":this.Ea(),".priority":this.C().H()}:this.Ea()};
	g.hash=function(){if(null===this.Eb){var a="";this.ba.e()||(a+="priority:"+te(this.ba.H())+":");var b=typeof this.B,a=a+(b+":"),a="number"===b?a+id(this.B):a+this.B;this.Eb=Uc(a)}return this.Eb};g.Ea=function(){return this.B};g.tc=function(a){if(a===F)return 1;if(a instanceof P)return-1;H(a.J(),"Unknown node type");var b=typeof a.B,c=typeof this.B,d=Ia(se,b),e=Ia(se,c);H(0<=d,"Unknown leaf type: "+b);H(0<=e,"Unknown leaf type: "+c);return d===e?"object"===c?0:this.B<a.B?-1:this.B===a.B?0:1:e-d};
	g.ob=function(){return this};g.zc=function(){return!0};g.$=function(a){return a===this?!0:a.J()?this.B===a.B&&this.ba.$(a.ba):!1};g.toString=function(){return B(this.H(!0))};function ue(){}var ve={};function oe(a){return r(a.compare,a)}ue.prototype.nd=function(a,b){return 0!==this.compare(new K("[MIN_NAME]",a),new K("[MIN_NAME]",b))};ue.prototype.Ic=function(){return we};function xe(a){H(!a.e()&&".priority"!==J(a),"Can't create PathIndex with empty path or .priority key");this.cc=a}ka(xe,ue);g=xe.prototype;g.yc=function(a){return!a.Q(this.cc).e()};g.compare=function(a,b){var c=a.S.Q(this.cc),d=b.S.Q(this.cc),c=c.tc(d);return 0===c?Hc(a.name,b.name):c};
	g.Fc=function(a,b){var c=M(a),c=F.F(this.cc,c);return new K(b,c)};g.Gc=function(){var a=F.F(this.cc,ye);return new K("[MAX_NAME]",a)};g.toString=function(){return this.cc.slice().join("/")};function ze(){}ka(ze,ue);g=ze.prototype;g.compare=function(a,b){var c=a.S.C(),d=b.S.C(),c=c.tc(d);return 0===c?Hc(a.name,b.name):c};g.yc=function(a){return!a.C().e()};g.nd=function(a,b){return!a.C().$(b.C())};g.Ic=function(){return we};g.Gc=function(){return new K("[MAX_NAME]",new Qc("[PRIORITY-POST]",ye))};
	g.Fc=function(a,b){var c=M(a);return new K(b,new Qc("[PRIORITY-POST]",c))};g.toString=function(){return".priority"};var N=new ze;function Ae(){}ka(Ae,ue);g=Ae.prototype;g.compare=function(a,b){return Hc(a.name,b.name)};g.yc=function(){throw Sc("KeyIndex.isDefinedOn not expected to be called.");};g.nd=function(){return!1};g.Ic=function(){return we};g.Gc=function(){return new K("[MAX_NAME]",F)};g.Fc=function(a){H(q(a),"KeyIndex indexValue must always be a string.");return new K(a,F)};g.toString=function(){return".key"};
	var ee=new Ae;function Be(){}ka(Be,ue);g=Be.prototype;g.compare=function(a,b){var c=a.S.tc(b.S);return 0===c?Hc(a.name,b.name):c};g.yc=function(){return!0};g.nd=function(a,b){return!a.$(b)};g.Ic=function(){return we};g.Gc=function(){return Ce};g.Fc=function(a,b){var c=M(a);return new K(b,c)};g.toString=function(){return".value"};var De=new Be;function Ee(){this.Sb=this.oa=this.Lb=this.la=this.ya=!1;this.pa=0;this.oc="";this.ec=null;this.Ab="";this.bc=null;this.yb="";this.g=N}var Fe=new Ee;function me(a){return""===a.oc?a.la:"l"===a.oc}function ie(a){H(a.la,"Only valid if start has been set");return a.ec}function he(a){H(a.la,"Only valid if start has been set");return a.Lb?a.Ab:"[MIN_NAME]"}function ke(a){H(a.oa,"Only valid if end has been set");return a.bc}
	function je(a){H(a.oa,"Only valid if end has been set");return a.Sb?a.yb:"[MAX_NAME]"}function Ge(a){var b=new Ee;b.ya=a.ya;b.pa=a.pa;b.la=a.la;b.ec=a.ec;b.Lb=a.Lb;b.Ab=a.Ab;b.oa=a.oa;b.bc=a.bc;b.Sb=a.Sb;b.yb=a.yb;b.g=a.g;return b}g=Ee.prototype;g.ne=function(a){var b=Ge(this);b.ya=!0;b.pa=a;b.oc="l";return b};g.oe=function(a){var b=Ge(this);b.ya=!0;b.pa=a;b.oc="r";return b};g.Nd=function(a,b){var c=Ge(this);c.la=!0;p(a)||(a=null);c.ec=a;null!=b?(c.Lb=!0,c.Ab=b):(c.Lb=!1,c.Ab="");return c};
	g.fd=function(a,b){var c=Ge(this);c.oa=!0;p(a)||(a=null);c.bc=a;p(b)?(c.Sb=!0,c.yb=b):(c.Hg=!1,c.yb="");return c};function He(a,b){var c=Ge(a);c.g=b;return c}function Ie(a){var b={};a.la&&(b.sp=a.ec,a.Lb&&(b.sn=a.Ab));a.oa&&(b.ep=a.bc,a.Sb&&(b.en=a.yb));if(a.ya){b.l=a.pa;var c=a.oc;""===c&&(c=me(a)?"l":"r");b.vf=c}a.g!==N&&(b.i=a.g.toString());return b}function S(a){return!(a.la||a.oa||a.ya)}function rd(a){return S(a)&&a.g==N}
	function sd(a){var b={};if(rd(a))return b;var c;a.g===N?c="$priority":a.g===De?c="$value":a.g===ee?c="$key":(H(a.g instanceof xe,"Unrecognized index type!"),c=a.g.toString());b.orderBy=B(c);a.la&&(b.startAt=B(a.ec),a.Lb&&(b.startAt+=","+B(a.Ab)));a.oa&&(b.endAt=B(a.bc),a.Sb&&(b.endAt+=","+B(a.yb)));a.ya&&(me(a)?b.limitToFirst=a.pa:b.limitToLast=a.pa);return b}g.toString=function(){return B(Ie(this))};function Je(a,b){this.od=a;this.dc=b}Je.prototype.get=function(a){var b=x(this.od,a);if(!b)throw Error("No index defined for "+a);return b===ve?null:b};function Ke(a,b,c){var d=oa(a.od,function(d,f){var h=x(a.dc,f);H(h,"Missing index implementation for "+f);if(d===ve){if(h.yc(b.S)){for(var k=[],m=c.Xb(Jc),l=R(m);l;)l.name!=b.name&&k.push(l),l=R(m);k.push(b);return Le(k,oe(h))}return ve}h=c.get(b.name);k=d;h&&(k=k.remove(new K(b.name,h)));return k.Ra(b,b.S)});return new Je(d,a.dc)}
	function Me(a,b,c){var d=oa(a.od,function(a){if(a===ve)return a;var d=c.get(b.name);return d?a.remove(new K(b.name,d)):a});return new Je(d,a.dc)}var Ne=new Je({".priority":ve},{".priority":N});function Oe(){this.set={}}g=Oe.prototype;g.add=function(a,b){this.set[a]=null!==b?b:!0};g.contains=function(a){return Bb(this.set,a)};g.get=function(a){return this.contains(a)?this.set[a]:void 0};g.remove=function(a){delete this.set[a]};g.clear=function(){this.set={}};g.e=function(){return xa(this.set)};g.count=function(){return qa(this.set)};function Pe(a,b){t(a.set,function(a,d){b(d,a)})}g.keys=function(){var a=[];t(this.set,function(b,c){a.push(c)});return a};function Qe(a,b,c,d){this.Zd=a;this.f=Yc(a);this.kc=b;this.qb=this.rb=0;this.Xa=Ad(b);this.Bf=c;this.xc=!1;this.Db=d;this.Yc=function(a){return ic(b,"long_polling",a)}}var Re,Se;
	Qe.prototype.open=function(a,b){this.Qe=0;this.ja=b;this.ff=new Rb(a);this.Bb=!1;var c=this;this.tb=setTimeout(function(){c.f("Timed out trying to connect.");c.fb();c.tb=null},Math.floor(3E4));cd(function(){if(!c.Bb){c.Wa=new Te(function(a,b,d,k,m){Ue(c,arguments);if(c.Wa)if(c.tb&&(clearTimeout(c.tb),c.tb=null),c.xc=!0,"start"==a)c.id=b,c.mf=d;else if("close"===a)b?(c.Wa.Kd=!1,Sb(c.ff,b,function(){c.fb()})):c.fb();else throw Error("Unrecognized command received: "+a);},function(a,b){Ue(c,arguments);
	Tb(c.ff,a,b)},function(){c.fb()},c.Yc);var a={start:"t"};a.ser=Math.floor(1E8*Math.random());c.Wa.Qd&&(a.cb=c.Wa.Qd);a.v="5";c.Bf&&(a.s=c.Bf);c.Db&&(a.ls=c.Db);"undefined"!==typeof location&&location.href&&-1!==location.href.indexOf("firebaseio.com")&&(a.r="f");a=c.Yc(a);c.f("Connecting via long-poll to "+a);Ve(c.Wa,a,function(){})}})};
	Qe.prototype.start=function(){var a=this.Wa,b=this.mf;a.fg=this.id;a.gg=b;for(a.Ud=!0;We(a););a=this.id;b=this.mf;this.gc=document.createElement("iframe");var c={dframe:"t"};c.id=a;c.pw=b;this.gc.src=this.Yc(c);this.gc.style.display="none";document.body.appendChild(this.gc)};
	Qe.isAvailable=function(){return Re||!Se&&"undefined"!==typeof document&&null!=document.createElement&&!("object"===typeof window&&window.chrome&&window.chrome.extension&&!/^chrome/.test(window.location.href))&&!("object"===typeof Windows&&"object"===typeof Windows.Dg)&&!0};g=Qe.prototype;g.sd=function(){};g.Tc=function(){this.Bb=!0;this.Wa&&(this.Wa.close(),this.Wa=null);this.gc&&(document.body.removeChild(this.gc),this.gc=null);this.tb&&(clearTimeout(this.tb),this.tb=null)};
	g.fb=function(){this.Bb||(this.f("Longpoll is closing itself"),this.Tc(),this.ja&&(this.ja(this.xc),this.ja=null))};g.close=function(){this.Bb||(this.f("Longpoll is being closed."),this.Tc())};g.send=function(a){a=B(a);this.rb+=a.length;kc(this.Xa,"bytes_sent",a.length);a=Mb(a);a=ab(a,!0);a=gd(a,1840);for(var b=0;b<a.length;b++){var c=this.Wa;c.Qc.push({ug:this.Qe,Bg:a.length,Se:a[b]});c.Ud&&We(c);this.Qe++}};function Ue(a,b){var c=B(b).length;a.qb+=c;kc(a.Xa,"bytes_received",c)}
	function Te(a,b,c,d){this.Yc=d;this.kb=c;this.ve=new Oe;this.Qc=[];this.$d=Math.floor(1E8*Math.random());this.Kd=!0;this.Qd=Rc();window["pLPCommand"+this.Qd]=a;window["pRTLPCB"+this.Qd]=b;a=document.createElement("iframe");a.style.display="none";if(document.body){document.body.appendChild(a);try{a.contentWindow.document||E("No IE domain setting required")}catch(e){a.src="javascript:void((function(){document.open();document.domain='"+document.domain+"';document.close();})())"}}else throw"Document body has not initialized. Wait to initialize Firebase until after the document is ready.";
	a.contentDocument?a.ib=a.contentDocument:a.contentWindow?a.ib=a.contentWindow.document:a.document&&(a.ib=a.document);this.Ga=a;a="";this.Ga.src&&"javascript:"===this.Ga.src.substr(0,11)&&(a='<script>document.domain="'+document.domain+'";\x3c/script>');a="<html><body>"+a+"</body></html>";try{this.Ga.ib.open(),this.Ga.ib.write(a),this.Ga.ib.close()}catch(f){E("frame writing exception"),f.stack&&E(f.stack),E(f)}}
	Te.prototype.close=function(){this.Ud=!1;if(this.Ga){this.Ga.ib.body.innerHTML="";var a=this;setTimeout(function(){null!==a.Ga&&(document.body.removeChild(a.Ga),a.Ga=null)},Math.floor(0))}var b=this.kb;b&&(this.kb=null,b())};
	function We(a){if(a.Ud&&a.Kd&&a.ve.count()<(0<a.Qc.length?2:1)){a.$d++;var b={};b.id=a.fg;b.pw=a.gg;b.ser=a.$d;for(var b=a.Yc(b),c="",d=0;0<a.Qc.length;)if(1870>=a.Qc[0].Se.length+30+c.length){var e=a.Qc.shift(),c=c+"&seg"+d+"="+e.ug+"&ts"+d+"="+e.Bg+"&d"+d+"="+e.Se;d++}else break;Xe(a,b+c,a.$d);return!0}return!1}function Xe(a,b,c){function d(){a.ve.remove(c);We(a)}a.ve.add(c,1);var e=setTimeout(d,Math.floor(25E3));Ve(a,b,function(){clearTimeout(e);d()})}
	function Ve(a,b,c){setTimeout(function(){try{if(a.Kd){var d=a.Ga.ib.createElement("script");d.type="text/javascript";d.async=!0;d.src=b;d.onload=d.onreadystatechange=function(){var a=d.readyState;a&&"loaded"!==a&&"complete"!==a||(d.onload=d.onreadystatechange=null,d.parentNode&&d.parentNode.removeChild(d),c())};d.onerror=function(){E("Long-poll script failed to load: "+b);a.Kd=!1;a.close()};a.Ga.ib.body.appendChild(d)}}catch(e){}},Math.floor(1))};function Ye(a){Ze(this,a)}var $e=[Qe,Dd];function Ze(a,b){var c=Dd&&Dd.isAvailable(),d=c&&!(Yb.cf||!0===Yb.get("previous_websocket_failure"));b.Cg&&(c||O("wss:// URL used, but browser isn't known to support websockets.  Trying anyway."),d=!0);if(d)a.Wc=[Dd];else{var e=a.Wc=[];hd($e,function(a,b){b&&b.isAvailable()&&e.push(b)})}}function af(a){if(0<a.Wc.length)return a.Wc[0];throw Error("No transports available");};function bf(a,b,c,d,e,f,h){this.id=a;this.f=Yc("c:"+this.id+":");this.te=c;this.Mc=d;this.ja=e;this.se=f;this.M=b;this.Ad=[];this.Oe=0;this.Af=new Ye(b);this.L=0;this.Db=h;this.f("Connection created");cf(this)}
	function cf(a){var b=af(a.Af);a.I=new b("c:"+a.id+":"+a.Oe++,a.M,void 0,a.Db);a.xe=b.responsesRequiredToBeHealthy||0;var c=df(a,a.I),d=ef(a,a.I);a.Xc=a.I;a.Rc=a.I;a.D=null;a.Cb=!1;setTimeout(function(){a.I&&a.I.open(c,d)},Math.floor(0));b=b.healthyTimeout||0;0<b&&(a.md=ld(function(){a.md=null;a.Cb||(a.I&&102400<a.I.qb?(a.f("Connection exceeded healthy timeout but has received "+a.I.qb+" bytes.  Marking connection healthy."),a.Cb=!0,a.I.sd()):a.I&&10240<a.I.rb?a.f("Connection exceeded healthy timeout but has sent "+
	a.I.rb+" bytes.  Leaving connection alive."):(a.f("Closing unhealthy connection after timeout."),a.close()))},Math.floor(b)))}function ef(a,b){return function(c){b===a.I?(a.I=null,c||0!==a.L?1===a.L&&a.f("Realtime connection lost."):(a.f("Realtime connection failed."),"s-"===a.M.bb.substr(0,2)&&(Yb.remove("host:"+a.M.host),a.M.bb=a.M.host)),a.close()):b===a.D?(a.f("Secondary connection lost."),c=a.D,a.D=null,a.Xc!==c&&a.Rc!==c||a.close()):a.f("closing an old connection")}}
	function df(a,b){return function(c){if(2!=a.L)if(b===a.Rc){var d=ed("t",c);c=ed("d",c);if("c"==d){if(d=ed("t",c),"d"in c)if(c=c.d,"h"===d){var d=c.ts,e=c.v,f=c.h;a.yf=c.s;hc(a.M,f);0==a.L&&(a.I.start(),ff(a,a.I,d),"5"!==e&&O("Protocol version mismatch detected"),c=a.Af,(c=1<c.Wc.length?c.Wc[1]:null)&&gf(a,c))}else if("n"===d){a.f("recvd end transmission on primary");a.Rc=a.D;for(c=0;c<a.Ad.length;++c)a.wd(a.Ad[c]);a.Ad=[];hf(a)}else"s"===d?(a.f("Connection shutdown command received. Shutting down..."),
	a.se&&(a.se(c),a.se=null),a.ja=null,a.close()):"r"===d?(a.f("Reset packet received.  New host: "+c),hc(a.M,c),1===a.L?a.close():(jf(a),cf(a))):"e"===d?Zc("Server Error: "+c):"o"===d?(a.f("got pong on primary."),kf(a),lf(a)):Zc("Unknown control packet command: "+d)}else"d"==d&&a.wd(c)}else if(b===a.D)if(d=ed("t",c),c=ed("d",c),"c"==d)"t"in c&&(c=c.t,"a"===c?mf(a):"r"===c?(a.f("Got a reset on secondary, closing it"),a.D.close(),a.Xc!==a.D&&a.Rc!==a.D||a.close()):"o"===c&&(a.f("got pong on secondary."),
	a.xf--,mf(a)));else if("d"==d)a.Ad.push(c);else throw Error("Unknown protocol layer: "+d);else a.f("message on old connection")}}bf.prototype.va=function(a){nf(this,{t:"d",d:a})};function hf(a){a.Xc===a.D&&a.Rc===a.D&&(a.f("cleaning up and promoting a connection: "+a.D.Zd),a.I=a.D,a.D=null)}
	function mf(a){0>=a.xf?(a.f("Secondary connection is healthy."),a.Cb=!0,a.D.sd(),a.D.start(),a.f("sending client ack on secondary"),a.D.send({t:"c",d:{t:"a",d:{}}}),a.f("Ending transmission on primary"),a.I.send({t:"c",d:{t:"n",d:{}}}),a.Xc=a.D,hf(a)):(a.f("sending ping on secondary."),a.D.send({t:"c",d:{t:"p",d:{}}}))}bf.prototype.wd=function(a){kf(this);this.te(a)};function kf(a){a.Cb||(a.xe--,0>=a.xe&&(a.f("Primary connection is healthy."),a.Cb=!0,a.I.sd()))}
	function gf(a,b){a.D=new b("c:"+a.id+":"+a.Oe++,a.M,a.yf);a.xf=b.responsesRequiredToBeHealthy||0;a.D.open(df(a,a.D),ef(a,a.D));ld(function(){a.D&&(a.f("Timed out trying to upgrade."),a.D.close())},Math.floor(6E4))}function ff(a,b,c){a.f("Realtime connection established.");a.I=b;a.L=1;a.Mc&&(a.Mc(c,a.yf),a.Mc=null);0===a.xe?(a.f("Primary connection is healthy."),a.Cb=!0):ld(function(){lf(a)},Math.floor(5E3))}
	function lf(a){a.Cb||1!==a.L||(a.f("sending ping on primary."),nf(a,{t:"c",d:{t:"p",d:{}}}))}function nf(a,b){if(1!==a.L)throw"Connection is not connected";a.Xc.send(b)}bf.prototype.close=function(){2!==this.L&&(this.f("Closing realtime connection."),this.L=2,jf(this),this.ja&&(this.ja(),this.ja=null))};function jf(a){a.f("Shutting down all connections");a.I&&(a.I.close(),a.I=null);a.D&&(a.D.close(),a.D=null);a.md&&(clearTimeout(a.md),a.md=null)};function L(a,b){if(1==arguments.length){this.o=a.split("/");for(var c=0,d=0;d<this.o.length;d++)0<this.o[d].length&&(this.o[c]=this.o[d],c++);this.o.length=c;this.Z=0}else this.o=a,this.Z=b}function T(a,b){var c=J(a);if(null===c)return b;if(c===J(b))return T(D(a),D(b));throw Error("INTERNAL ERROR: innerPath ("+b+") is not within outerPath ("+a+")");}
	function of(a,b){for(var c=a.slice(),d=b.slice(),e=0;e<c.length&&e<d.length;e++){var f=Hc(c[e],d[e]);if(0!==f)return f}return c.length===d.length?0:c.length<d.length?-1:1}function J(a){return a.Z>=a.o.length?null:a.o[a.Z]}function $d(a){return a.o.length-a.Z}function D(a){var b=a.Z;b<a.o.length&&b++;return new L(a.o,b)}function ae(a){return a.Z<a.o.length?a.o[a.o.length-1]:null}g=L.prototype;
	g.toString=function(){for(var a="",b=this.Z;b<this.o.length;b++)""!==this.o[b]&&(a+="/"+this.o[b]);return a||"/"};g.slice=function(a){return this.o.slice(this.Z+(a||0))};g.parent=function(){if(this.Z>=this.o.length)return null;for(var a=[],b=this.Z;b<this.o.length-1;b++)a.push(this.o[b]);return new L(a,0)};
	g.k=function(a){for(var b=[],c=this.Z;c<this.o.length;c++)b.push(this.o[c]);if(a instanceof L)for(c=a.Z;c<a.o.length;c++)b.push(a.o[c]);else for(a=a.split("/"),c=0;c<a.length;c++)0<a[c].length&&b.push(a[c]);return new L(b,0)};g.e=function(){return this.Z>=this.o.length};g.$=function(a){if($d(this)!==$d(a))return!1;for(var b=this.Z,c=a.Z;b<=this.o.length;b++,c++)if(this.o[b]!==a.o[c])return!1;return!0};
	g.contains=function(a){var b=this.Z,c=a.Z;if($d(this)>$d(a))return!1;for(;b<this.o.length;){if(this.o[b]!==a.o[c])return!1;++b;++c}return!0};var C=new L("");function pf(a,b){this.Ta=a.slice();this.Ka=Math.max(1,this.Ta.length);this.Te=b;for(var c=0;c<this.Ta.length;c++)this.Ka+=Nb(this.Ta[c]);qf(this)}pf.prototype.push=function(a){0<this.Ta.length&&(this.Ka+=1);this.Ta.push(a);this.Ka+=Nb(a);qf(this)};pf.prototype.pop=function(){var a=this.Ta.pop();this.Ka-=Nb(a);0<this.Ta.length&&--this.Ka};
	function qf(a){if(768<a.Ka)throw Error(a.Te+"has a key path longer than 768 bytes ("+a.Ka+").");if(32<a.Ta.length)throw Error(a.Te+"path specified exceeds the maximum depth that can be written (32) or object contains a cycle "+rf(a));}function rf(a){return 0==a.Ta.length?"":"in property '"+a.Ta.join(".")+"'"};function sf(a){a instanceof tf||$c("Don't call new Database() directly - please use firebase.database().");this.ua=a;this.ca=new U(a,C);this.INTERNAL=new uf(this)}var vf={TIMESTAMP:{".sv":"timestamp"}};g=sf.prototype;g.app=null;g.pf=function(a){wf(this,"ref");y("database.ref",0,1,arguments.length);return p(a)?this.ca.k(a):this.ca};
	g.rg=function(a){wf(this,"database.refFromURL");y("database.refFromURL",1,1,arguments.length);var b=ad(a);xf("database.refFromURL",b);var c=b.kc;c.host!==this.ua.M.host&&$c("database.refFromURL: Host name does not match the current database: (found "+c.host+" but expected "+this.ua.M.host+")");return this.pf(b.path.toString())};function wf(a,b){null===a.ua&&$c("Cannot call "+b+" on a deleted database.")}g.$f=function(){y("database.goOffline",0,0,arguments.length);wf(this,"goOffline");this.ua.eb()};
	g.ag=function(){y("database.goOnline",0,0,arguments.length);wf(this,"goOnline");this.ua.lc()};Object.defineProperty(sf.prototype,"app",{get:function(){return this.ua.app}});function uf(a){this.$a=a}uf.prototype.delete=function(){wf(this.$a,"delete");var a=yf.Wb(),b=this.$a.ua;x(a.nb,b.app.name)!==b&&$c("Database "+b.app.name+" has already been deleted.");b.eb();delete a.nb[b.app.name];this.$a.ua=null;this.$a.ca=null;this.$a=this.$a.INTERNAL=null;return firebase.Promise.resolve()};
	sf.prototype.ref=sf.prototype.pf;sf.prototype.refFromURL=sf.prototype.rg;sf.prototype.goOnline=sf.prototype.ag;sf.prototype.goOffline=sf.prototype.$f;uf.prototype["delete"]=uf.prototype.delete;function Mc(){this.m=this.B=null}Mc.prototype.find=function(a){if(null!=this.B)return this.B.Q(a);if(a.e()||null==this.m)return null;var b=J(a);a=D(a);return this.m.contains(b)?this.m.get(b).find(a):null};function Oc(a,b,c){if(b.e())a.B=c,a.m=null;else if(null!==a.B)a.B=a.B.F(b,c);else{null==a.m&&(a.m=new Oe);var d=J(b);a.m.contains(d)||a.m.add(d,new Mc);a=a.m.get(d);b=D(b);Oc(a,b,c)}}
	function zf(a,b){if(b.e())return a.B=null,a.m=null,!0;if(null!==a.B){if(a.B.J())return!1;var c=a.B;a.B=null;c.P(N,function(b,c){Oc(a,new L(b),c)});return zf(a,b)}return null!==a.m?(c=J(b),b=D(b),a.m.contains(c)&&zf(a.m.get(c),b)&&a.m.remove(c),a.m.e()?(a.m=null,!0):!1):!0}function Nc(a,b,c){null!==a.B?c(b,a.B):a.P(function(a,e){var f=new L(b.toString()+"/"+a);Nc(e,f,c)})}Mc.prototype.P=function(a){null!==this.m&&Pe(this.m,function(b,c){a(b,c)})};var Af=/[\[\].#$\/\u0000-\u001F\u007F]/,Bf=/[\[\].#$\u0000-\u001F\u007F]/;function Cf(a){return q(a)&&0!==a.length&&!Af.test(a)}function Df(a){return null===a||q(a)||fa(a)&&!bd(a)||ha(a)&&Bb(a,".sv")}function Ef(a,b,c,d){d&&!p(b)||Ff(Db(a,1,d),b,c)}
	function Ff(a,b,c){c instanceof L&&(c=new pf(c,a));if(!p(b))throw Error(a+"contains undefined "+rf(c));if(ga(b))throw Error(a+"contains a function "+rf(c)+" with contents: "+b.toString());if(bd(b))throw Error(a+"contains "+b.toString()+" "+rf(c));if(q(b)&&b.length>10485760/3&&10485760<Nb(b))throw Error(a+"contains a string greater than 10485760 utf8 bytes "+rf(c)+" ('"+b.substring(0,50)+"...')");if(ha(b)){var d=!1,e=!1;Cb(b,function(b,h){if(".value"===b)d=!0;else if(".priority"!==b&&".sv"!==b&&(e=
	!0,!Cf(b)))throw Error(a+" contains an invalid key ("+b+") "+rf(c)+'.  Keys must be non-empty strings and can\'t contain ".", "#", "$", "/", "[", or "]"');c.push(b);Ff(a,h,c);c.pop()});if(d&&e)throw Error(a+' contains ".value" child '+rf(c)+" in addition to actual children.");}}
	function Gf(a,b){var c,d;for(c=0;c<b.length;c++){d=b[c];for(var e=d.slice(),f=0;f<e.length;f++)if((".priority"!==e[f]||f!==e.length-1)&&!Cf(e[f]))throw Error(a+"contains an invalid key ("+e[f]+") in path "+d.toString()+'. Keys must be non-empty strings and can\'t contain ".", "#", "$", "/", "[", or "]"');}b.sort(of);e=null;for(c=0;c<b.length;c++){d=b[c];if(null!==e&&e.contains(d))throw Error(a+"contains a path "+e.toString()+" that is ancestor of another path "+d.toString());e=d}}
	function Hf(a,b,c){var d=Db(a,1,!1);if(!ha(b)||da(b))throw Error(d+" must be an object containing the children to replace.");var e=[];Cb(b,function(a,b){var k=new L(a);Ff(d,b,c.k(k));if(".priority"===ae(k)&&!Df(b))throw Error(d+"contains an invalid value for '"+k.toString()+"', which must be a valid Firebase priority (a string, finite number, server value, or null).");e.push(k)});Gf(d,e)}
	function If(a,b,c){if(bd(c))throw Error(Db(a,b,!1)+"is "+c.toString()+", but must be a valid Firebase priority (a string, finite number, server value, or null).");if(!Df(c))throw Error(Db(a,b,!1)+"must be a valid Firebase priority (a string, finite number, server value, or null).");}
	function Jf(a,b,c){if(!c||p(b))switch(b){case "value":case "child_added":case "child_removed":case "child_changed":case "child_moved":break;default:throw Error(Db(a,1,c)+'must be a valid event type: "value", "child_added", "child_removed", "child_changed", or "child_moved".');}}function Kf(a,b){if(p(b)&&!Cf(b))throw Error(Db(a,2,!0)+'was an invalid key: "'+b+'".  Firebase keys must be non-empty strings and can\'t contain ".", "#", "$", "/", "[", or "]").');}
	function Lf(a,b){if(!q(b)||0===b.length||Bf.test(b))throw Error(Db(a,1,!1)+'was an invalid path: "'+b+'". Paths must be non-empty strings and can\'t contain ".", "#", "$", "[", or "]"');}function Mf(a,b){if(".info"===J(b))throw Error(a+" failed: Can't modify data under /.info/");}
	function xf(a,b){var c=b.path.toString(),d;!(d=!q(b.kc.host)||0===b.kc.host.length||!Cf(b.kc.pe))&&(d=0!==c.length)&&(c&&(c=c.replace(/^\/*\.info(\/|$)/,"/")),d=!(q(c)&&0!==c.length&&!Bf.test(c)));if(d)throw Error(Db(a,1,!1)+'must be a valid firebase URL and the path can\'t contain ".", "#", "$", "[", or "]".');};function V(a,b){this.ua=a;this.ra=b}V.prototype.cancel=function(a){y("Firebase.onDisconnect().cancel",0,1,arguments.length);A("Firebase.onDisconnect().cancel",1,a,!0);var b=new Hb;this.ua.xd(this.ra,Ib(b,a));return b.sa};V.prototype.cancel=V.prototype.cancel;V.prototype.remove=function(a){y("Firebase.onDisconnect().remove",0,1,arguments.length);Mf("Firebase.onDisconnect().remove",this.ra);A("Firebase.onDisconnect().remove",1,a,!0);var b=new Hb;Nf(this.ua,this.ra,null,Ib(b,a));return b.sa};
	V.prototype.remove=V.prototype.remove;V.prototype.set=function(a,b){y("Firebase.onDisconnect().set",1,2,arguments.length);Mf("Firebase.onDisconnect().set",this.ra);Ef("Firebase.onDisconnect().set",a,this.ra,!1);A("Firebase.onDisconnect().set",2,b,!0);var c=new Hb;Nf(this.ua,this.ra,a,Ib(c,b));return c.sa};V.prototype.set=V.prototype.set;
	V.prototype.Kb=function(a,b,c){y("Firebase.onDisconnect().setWithPriority",2,3,arguments.length);Mf("Firebase.onDisconnect().setWithPriority",this.ra);Ef("Firebase.onDisconnect().setWithPriority",a,this.ra,!1);If("Firebase.onDisconnect().setWithPriority",2,b);A("Firebase.onDisconnect().setWithPriority",3,c,!0);var d=new Hb;Of(this.ua,this.ra,a,b,Ib(d,c));return d.sa};V.prototype.setWithPriority=V.prototype.Kb;
	V.prototype.update=function(a,b){y("Firebase.onDisconnect().update",1,2,arguments.length);Mf("Firebase.onDisconnect().update",this.ra);if(da(a)){for(var c={},d=0;d<a.length;++d)c[""+d]=a[d];a=c;O("Passing an Array to Firebase.onDisconnect().update() is deprecated. Use set() if you want to overwrite the existing data, or an Object with integer keys if you really do want to only update some of the children.")}Hf("Firebase.onDisconnect().update",a,this.ra);A("Firebase.onDisconnect().update",2,b,!0);
	c=new Hb;Pf(this.ua,this.ra,a,Ib(c,b));return c.sa};V.prototype.update=V.prototype.update;function Qf(a){H(da(a)&&0<a.length,"Requires a non-empty array");this.Kf=a;this.Ec={}}Qf.prototype.Ge=function(a,b){var c;c=this.Ec[a]||[];var d=c.length;if(0<d){for(var e=Array(d),f=0;f<d;f++)e[f]=c[f];c=e}else c=[];for(d=0;d<c.length;d++)c[d].Ke.apply(c[d].Pa,Array.prototype.slice.call(arguments,1))};Qf.prototype.hc=function(a,b,c){Rf(this,a);this.Ec[a]=this.Ec[a]||[];this.Ec[a].push({Ke:b,Pa:c});(a=this.Ye(a))&&b.apply(c,a)};
	Qf.prototype.Jc=function(a,b,c){Rf(this,a);a=this.Ec[a]||[];for(var d=0;d<a.length;d++)if(a[d].Ke===b&&(!c||c===a[d].Pa)){a.splice(d,1);break}};function Rf(a,b){H(Oa(a.Kf,function(a){return a===b}),"Unknown event: "+b)};function Sf(){Qf.call(this,["online"]);this.ic=!0;if("undefined"!==typeof window&&"undefined"!==typeof window.addEventListener&&!Qb()){var a=this;window.addEventListener("online",function(){a.ic||(a.ic=!0,a.Ge("online",!0))},!1);window.addEventListener("offline",function(){a.ic&&(a.ic=!1,a.Ge("online",!1))},!1)}}ka(Sf,Qf);Sf.prototype.Ye=function(a){H("online"===a,"Unknown event type: "+a);return[this.ic]};ba(Sf);function Tf(){Qf.call(this,["visible"]);var a,b;"undefined"!==typeof document&&"undefined"!==typeof document.addEventListener&&("undefined"!==typeof document.hidden?(b="visibilitychange",a="hidden"):"undefined"!==typeof document.mozHidden?(b="mozvisibilitychange",a="mozHidden"):"undefined"!==typeof document.msHidden?(b="msvisibilitychange",a="msHidden"):"undefined"!==typeof document.webkitHidden&&(b="webkitvisibilitychange",a="webkitHidden"));this.Nb=!0;if(b){var c=this;document.addEventListener(b,
	function(){var b=!document[a];b!==c.Nb&&(c.Nb=b,c.Ge("visible",b))},!1)}}ka(Tf,Qf);Tf.prototype.Ye=function(a){H("visible"===a,"Unknown event type: "+a);return[this.Nb]};ba(Tf);var Uf=function(){var a=0,b=[];return function(c){var d=c===a;a=c;for(var e=Array(8),f=7;0<=f;f--)e[f]="-0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ_abcdefghijklmnopqrstuvwxyz".charAt(c%64),c=Math.floor(c/64);H(0===c,"Cannot push at time == 0");c=e.join("");if(d){for(f=11;0<=f&&63===b[f];f--)b[f]=0;b[f]++}else for(f=0;12>f;f++)b[f]=Math.floor(64*Math.random());for(f=0;12>f;f++)c+="-0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ_abcdefghijklmnopqrstuvwxyz".charAt(b[f]);H(20===c.length,"nextPushId: Length should be 20.");
	return c}}();function Vf(a,b){this.Oa=a;this.ca=b?b:Wf}g=Vf.prototype;g.Ra=function(a,b){return new Vf(this.Oa,this.ca.Ra(a,b,this.Oa).Y(null,null,!1,null,null))};g.remove=function(a){return new Vf(this.Oa,this.ca.remove(a,this.Oa).Y(null,null,!1,null,null))};g.get=function(a){for(var b,c=this.ca;!c.e();){b=this.Oa(a,c.key);if(0===b)return c.value;0>b?c=c.left:0<b&&(c=c.right)}return null};
	function Xf(a,b){for(var c,d=a.ca,e=null;!d.e();){c=a.Oa(b,d.key);if(0===c){if(d.left.e())return e?e.key:null;for(d=d.left;!d.right.e();)d=d.right;return d.key}0>c?d=d.left:0<c&&(e=d,d=d.right)}throw Error("Attempted to find predecessor key for a nonexistent key.  What gives?");}g.e=function(){return this.ca.e()};g.count=function(){return this.ca.count()};g.Hc=function(){return this.ca.Hc()};g.fc=function(){return this.ca.fc()};g.ia=function(a){return this.ca.ia(a)};
	g.Xb=function(a){return new Yf(this.ca,null,this.Oa,!1,a)};g.Yb=function(a,b){return new Yf(this.ca,a,this.Oa,!1,b)};g.$b=function(a,b){return new Yf(this.ca,a,this.Oa,!0,b)};g.$e=function(a){return new Yf(this.ca,null,this.Oa,!0,a)};function Yf(a,b,c,d,e){this.Hd=e||null;this.le=d;this.Sa=[];for(e=1;!a.e();)if(e=b?c(a.key,b):1,d&&(e*=-1),0>e)a=this.le?a.left:a.right;else if(0===e){this.Sa.push(a);break}else this.Sa.push(a),a=this.le?a.right:a.left}
	function R(a){if(0===a.Sa.length)return null;var b=a.Sa.pop(),c;c=a.Hd?a.Hd(b.key,b.value):{key:b.key,value:b.value};if(a.le)for(b=b.left;!b.e();)a.Sa.push(b),b=b.right;else for(b=b.right;!b.e();)a.Sa.push(b),b=b.left;return c}function Zf(a){if(0===a.Sa.length)return null;var b;b=a.Sa;b=b[b.length-1];return a.Hd?a.Hd(b.key,b.value):{key:b.key,value:b.value}}function $f(a,b,c,d,e){this.key=a;this.value=b;this.color=null!=c?c:!0;this.left=null!=d?d:Wf;this.right=null!=e?e:Wf}g=$f.prototype;
	g.Y=function(a,b,c,d,e){return new $f(null!=a?a:this.key,null!=b?b:this.value,null!=c?c:this.color,null!=d?d:this.left,null!=e?e:this.right)};g.count=function(){return this.left.count()+1+this.right.count()};g.e=function(){return!1};g.ia=function(a){return this.left.ia(a)||a(this.key,this.value)||this.right.ia(a)};function ag(a){return a.left.e()?a:ag(a.left)}g.Hc=function(){return ag(this).key};g.fc=function(){return this.right.e()?this.key:this.right.fc()};
	g.Ra=function(a,b,c){var d,e;e=this;d=c(a,e.key);e=0>d?e.Y(null,null,null,e.left.Ra(a,b,c),null):0===d?e.Y(null,b,null,null,null):e.Y(null,null,null,null,e.right.Ra(a,b,c));return bg(e)};function cg(a){if(a.left.e())return Wf;a.left.fa()||a.left.left.fa()||(a=dg(a));a=a.Y(null,null,null,cg(a.left),null);return bg(a)}
	g.remove=function(a,b){var c,d;c=this;if(0>b(a,c.key))c.left.e()||c.left.fa()||c.left.left.fa()||(c=dg(c)),c=c.Y(null,null,null,c.left.remove(a,b),null);else{c.left.fa()&&(c=eg(c));c.right.e()||c.right.fa()||c.right.left.fa()||(c=fg(c),c.left.left.fa()&&(c=eg(c),c=fg(c)));if(0===b(a,c.key)){if(c.right.e())return Wf;d=ag(c.right);c=c.Y(d.key,d.value,null,null,cg(c.right))}c=c.Y(null,null,null,null,c.right.remove(a,b))}return bg(c)};g.fa=function(){return this.color};
	function bg(a){a.right.fa()&&!a.left.fa()&&(a=gg(a));a.left.fa()&&a.left.left.fa()&&(a=eg(a));a.left.fa()&&a.right.fa()&&(a=fg(a));return a}function dg(a){a=fg(a);a.right.left.fa()&&(a=a.Y(null,null,null,null,eg(a.right)),a=gg(a),a=fg(a));return a}function gg(a){return a.right.Y(null,null,a.color,a.Y(null,null,!0,null,a.right.left),null)}function eg(a){return a.left.Y(null,null,a.color,null,a.Y(null,null,!0,a.left.right,null))}
	function fg(a){return a.Y(null,null,!a.color,a.left.Y(null,null,!a.left.color,null,null),a.right.Y(null,null,!a.right.color,null,null))}function hg(){}g=hg.prototype;g.Y=function(){return this};g.Ra=function(a,b){return new $f(a,b,null)};g.remove=function(){return this};g.count=function(){return 0};g.e=function(){return!0};g.ia=function(){return!1};g.Hc=function(){return null};g.fc=function(){return null};g.fa=function(){return!1};var Wf=new hg;function P(a,b,c){this.m=a;(this.ba=b)&&re(this.ba);a.e()&&H(!this.ba||this.ba.e(),"An empty node cannot have a priority");this.zb=c;this.Eb=null}g=P.prototype;g.J=function(){return!1};g.C=function(){return this.ba||F};g.ga=function(a){return this.m.e()?this:new P(this.m,a,this.zb)};g.R=function(a){if(".priority"===a)return this.C();a=this.m.get(a);return null===a?F:a};g.Q=function(a){var b=J(a);return null===b?this:this.R(b).Q(D(a))};g.Fa=function(a){return null!==this.m.get(a)};
	g.U=function(a,b){H(b,"We should always be passing snapshot nodes");if(".priority"===a)return this.ga(b);var c=new K(a,b),d,e;b.e()?(d=this.m.remove(a),c=Me(this.zb,c,this.m)):(d=this.m.Ra(a,b),c=Ke(this.zb,c,this.m));e=d.e()?F:this.ba;return new P(d,e,c)};g.F=function(a,b){var c=J(a);if(null===c)return b;H(".priority"!==J(a)||1===$d(a),".priority must be the last token in a path");var d=this.R(c).F(D(a),b);return this.U(c,d)};g.e=function(){return this.m.e()};g.Fb=function(){return this.m.count()};
	var ig=/^(0|[1-9]\d*)$/;g=P.prototype;g.H=function(a){if(this.e())return null;var b={},c=0,d=0,e=!0;this.P(N,function(f,h){b[f]=h.H(a);c++;e&&ig.test(f)?d=Math.max(d,Number(f)):e=!1});if(!a&&e&&d<2*c){var f=[],h;for(h in b)f[h]=b[h];return f}a&&!this.C().e()&&(b[".priority"]=this.C().H());return b};g.hash=function(){if(null===this.Eb){var a="";this.C().e()||(a+="priority:"+te(this.C().H())+":");this.P(N,function(b,c){var d=c.hash();""!==d&&(a+=":"+b+":"+d)});this.Eb=""===a?"":Uc(a)}return this.Eb};
	g.Ze=function(a,b,c){return(c=jg(this,c))?(a=Xf(c,new K(a,b)))?a.name:null:Xf(this.m,a)};function pe(a,b){var c;c=(c=jg(a,b))?(c=c.Hc())&&c.name:a.m.Hc();return c?new K(c,a.m.get(c)):null}function qe(a,b){var c;c=(c=jg(a,b))?(c=c.fc())&&c.name:a.m.fc();return c?new K(c,a.m.get(c)):null}g.P=function(a,b){var c=jg(this,a);return c?c.ia(function(a){return b(a.name,a.S)}):this.m.ia(b)};g.Xb=function(a){return this.Yb(a.Ic(),a)};
	g.Yb=function(a,b){var c=jg(this,b);if(c)return c.Yb(a,function(a){return a});for(var c=this.m.Yb(a.name,Jc),d=Zf(c);null!=d&&0>b.compare(d,a);)R(c),d=Zf(c);return c};g.$e=function(a){return this.$b(a.Gc(),a)};g.$b=function(a,b){var c=jg(this,b);if(c)return c.$b(a,function(a){return a});for(var c=this.m.$b(a.name,Jc),d=Zf(c);null!=d&&0<b.compare(d,a);)R(c),d=Zf(c);return c};g.tc=function(a){return this.e()?a.e()?0:-1:a.J()||a.e()?1:a===ye?-1:0};
	g.ob=function(a){if(a===ee||ua(this.zb.dc,a.toString()))return this;var b=this.zb,c=this.m;H(a!==ee,"KeyIndex always exists and isn't meant to be added to the IndexMap.");for(var d=[],e=!1,c=c.Xb(Jc),f=R(c);f;)e=e||a.yc(f.S),d.push(f),f=R(c);d=e?Le(d,oe(a)):ve;e=a.toString();c=ya(b.dc);c[e]=a;a=ya(b.od);a[e]=d;return new P(this.m,this.ba,new Je(a,c))};g.zc=function(a){return a===ee||ua(this.zb.dc,a.toString())};
	g.$=function(a){if(a===this)return!0;if(a.J())return!1;if(this.C().$(a.C())&&this.m.count()===a.m.count()){var b=this.Xb(N);a=a.Xb(N);for(var c=R(b),d=R(a);c&&d;){if(c.name!==d.name||!c.S.$(d.S))return!1;c=R(b);d=R(a)}return null===c&&null===d}return!1};function jg(a,b){return b===ee?null:a.zb.get(b.toString())}g.toString=function(){return B(this.H(!0))};function M(a,b){if(null===a)return F;var c=null;"object"===typeof a&&".priority"in a?c=a[".priority"]:"undefined"!==typeof b&&(c=b);H(null===c||"string"===typeof c||"number"===typeof c||"object"===typeof c&&".sv"in c,"Invalid priority type found: "+typeof c);"object"===typeof a&&".value"in a&&null!==a[".value"]&&(a=a[".value"]);if("object"!==typeof a||".sv"in a)return new Qc(a,M(c));if(a instanceof Array){var d=F,e=a;t(e,function(a,b){if(Bb(e,b)&&"."!==b.substring(0,1)){var c=M(a);if(c.J()||!c.e())d=
	d.U(b,c)}});return d.ga(M(c))}var f=[],h=!1,k=a;Cb(k,function(a){if("string"!==typeof a||"."!==a.substring(0,1)){var b=M(k[a]);b.e()||(h=h||!b.C().e(),f.push(new K(a,b)))}});if(0==f.length)return F;var m=Le(f,Gc,function(a){return a.name},Ic);if(h){var l=Le(f,oe(N));return new P(m,M(c),new Je({".priority":l},{".priority":N}))}return new P(m,M(c),Ne)}var kg=Math.log(2);
	function lg(a){this.count=parseInt(Math.log(a+1)/kg,10);this.Re=this.count-1;this.Lf=a+1&parseInt(Array(this.count+1).join("1"),2)}function mg(a){var b=!(a.Lf&1<<a.Re);a.Re--;return b}
	function Le(a,b,c,d){function e(b,d){var f=d-b;if(0==f)return null;if(1==f){var l=a[b],u=c?c(l):l;return new $f(u,l.S,!1,null,null)}var l=parseInt(f/2,10)+b,f=e(b,l),z=e(l+1,d),l=a[l],u=c?c(l):l;return new $f(u,l.S,!1,f,z)}a.sort(b);var f=function(b){function d(b,h){var k=u-b,z=u;u-=b;var z=e(k+1,z),k=a[k],G=c?c(k):k,z=new $f(G,k.S,h,null,z);f?f.left=z:l=z;f=z}for(var f=null,l=null,u=a.length,z=0;z<b.count;++z){var G=mg(b),ud=Math.pow(2,b.count-(z+1));G?d(ud,!1):(d(ud,!1),d(ud,!0))}return l}(new lg(a.length));
	return null!==f?new Vf(d||b,f):new Vf(d||b)}function te(a){return"number"===typeof a?"number:"+id(a):"string:"+a}function re(a){if(a.J()){var b=a.H();H("string"===typeof b||"number"===typeof b||"object"===typeof b&&Bb(b,".sv"),"Priority must be a string or number.")}else H(a===ye||a.e(),"priority of unexpected type.");H(a===ye||a.C().e(),"Priority nodes can't have a priority of their own.")}var F=new P(new Vf(Ic),null,Ne);function ng(){P.call(this,new Vf(Ic),F,Ne)}ka(ng,P);g=ng.prototype;
	g.tc=function(a){return a===this?0:1};g.$=function(a){return a===this};g.C=function(){return this};g.R=function(){return F};g.e=function(){return!1};var ye=new ng,we=new K("[MIN_NAME]",F),Ce=new K("[MAX_NAME]",ye);function W(a,b,c){this.A=a;this.W=b;this.g=c}W.prototype.H=function(){y("Firebase.DataSnapshot.val",0,0,arguments.length);return this.A.H()};W.prototype.val=W.prototype.H;W.prototype.Ue=function(){y("Firebase.DataSnapshot.exportVal",0,0,arguments.length);return this.A.H(!0)};W.prototype.exportVal=W.prototype.Ue;W.prototype.Vf=function(){y("Firebase.DataSnapshot.exists",0,0,arguments.length);return!this.A.e()};W.prototype.exists=W.prototype.Vf;
	W.prototype.k=function(a){y("Firebase.DataSnapshot.child",0,1,arguments.length);fa(a)&&(a=String(a));Lf("Firebase.DataSnapshot.child",a);var b=new L(a),c=this.W.k(b);return new W(this.A.Q(b),c,N)};W.prototype.child=W.prototype.k;W.prototype.Fa=function(a){y("Firebase.DataSnapshot.hasChild",1,1,arguments.length);Lf("Firebase.DataSnapshot.hasChild",a);var b=new L(a);return!this.A.Q(b).e()};W.prototype.hasChild=W.prototype.Fa;
	W.prototype.C=function(){y("Firebase.DataSnapshot.getPriority",0,0,arguments.length);return this.A.C().H()};W.prototype.getPriority=W.prototype.C;W.prototype.forEach=function(a){y("Firebase.DataSnapshot.forEach",1,1,arguments.length);A("Firebase.DataSnapshot.forEach",1,a,!1);if(this.A.J())return!1;var b=this;return!!this.A.P(this.g,function(c,d){return a(new W(d,b.W.k(c),N))})};W.prototype.forEach=W.prototype.forEach;
	W.prototype.kd=function(){y("Firebase.DataSnapshot.hasChildren",0,0,arguments.length);return this.A.J()?!1:!this.A.e()};W.prototype.hasChildren=W.prototype.kd;W.prototype.getKey=function(){y("Firebase.DataSnapshot.key",0,0,arguments.length);return this.W.getKey()};kd(W.prototype,"key",W.prototype.getKey);W.prototype.Fb=function(){y("Firebase.DataSnapshot.numChildren",0,0,arguments.length);return this.A.Fb()};W.prototype.numChildren=W.prototype.Fb;
	W.prototype.xb=function(){y("Firebase.DataSnapshot.ref",0,0,arguments.length);return this.W};kd(W.prototype,"ref",W.prototype.xb);function Yd(a,b){this.O=a;this.Ld=b}function Vd(a,b,c,d){return new Yd(new zc(b,c,d),a.Ld)}function Zd(a){return a.O.ea?a.O.j():null}Yd.prototype.w=function(){return this.Ld};function Ac(a){return a.Ld.ea?a.Ld.j():null};function og(a,b){this.W=a;var c=a.n,d=new fe(c.g),c=S(c)?new fe(c.g):c.ya?new le(c):new ge(c);this.of=new Pd(c);var e=b.w(),f=b.O,h=d.za(F,e.j(),null),k=c.za(F,f.j(),null);this.Na=new Yd(new zc(k,f.ea,c.Qa()),new zc(h,e.ea,d.Qa()));this.ab=[];this.Sf=new Kd(a)}function pg(a){return a.W}g=og.prototype;g.w=function(){return this.Na.w().j()};g.jb=function(a){var b=Ac(this.Na);return b&&(S(this.W.n)||!a.e()&&!b.R(J(a)).e())?b.Q(a):null};g.e=function(){return 0===this.ab.length};g.Ob=function(a){this.ab.push(a)};
	g.mb=function(a,b){var c=[];if(b){H(null==a,"A cancel should cancel all event registrations.");var d=this.W.path;Ja(this.ab,function(a){(a=a.Pe(b,d))&&c.push(a)})}if(a){for(var e=[],f=0;f<this.ab.length;++f){var h=this.ab[f];if(!h.matches(a))e.push(h);else if(a.af()){e=e.concat(this.ab.slice(f+1));break}}this.ab=e}else this.ab=[];return c};
	g.gb=function(a,b,c){a.type===wd&&null!==a.source.Ib&&(H(Ac(this.Na),"We should always have a full cache before handling merges"),H(Zd(this.Na),"Missing event cache, even though we have a server cache"));var d=this.Na;a=this.of.gb(d,a,b,c);b=this.of;c=a.Sd;H(c.O.j().zc(b.V.g),"Event snap not indexed");H(c.w().j().zc(b.V.g),"Server snap not indexed");H(Dc(a.Sd.w())||!Dc(d.w()),"Once a server snap is complete, it should never go back");this.Na=a.Sd;return qg(this,a.Mf,a.Sd.O.j(),null)};
	function rg(a,b){var c=a.Na.O,d=[];c.j().J()||c.j().P(N,function(a,b){d.push(new I("child_added",b,a))});c.ea&&d.push(Bc(c.j()));return qg(a,d,c.j(),b)}function qg(a,b,c,d){return Ld(a.Sf,b,c,d?[d]:a.ab)};function sg(a,b,c){this.Qb=a;this.sb=b;this.ub=c||null}g=sg.prototype;g.tf=function(a){return"value"===a};g.createEvent=function(a,b){var c=b.n.g;return new tc("value",this,new W(a.Ma,b.xb(),c))};g.Ub=function(a){var b=this.ub;if("cancel"===a.ge()){H(this.sb,"Raising a cancel event on a listener with no cancel callback");var c=this.sb;return function(){c.call(b,a.error)}}var d=this.Qb;return function(){d.call(b,a.Md)}};g.Pe=function(a,b){return this.sb?new uc(this,a,b):null};
	g.matches=function(a){return a instanceof sg?a.Qb&&this.Qb?a.Qb===this.Qb&&a.ub===this.ub:!0:!1};g.af=function(){return null!==this.Qb};function tg(a,b,c){this.ha=a;this.sb=b;this.ub=c}g=tg.prototype;g.tf=function(a){a="children_added"===a?"child_added":a;return("children_removed"===a?"child_removed":a)in this.ha};g.Pe=function(a,b){return this.sb?new uc(this,a,b):null};
	g.createEvent=function(a,b){H(null!=a.Za,"Child events should have a childName.");var c=b.xb().k(a.Za);return new tc(a.type,this,new W(a.Ma,c,b.n.g),a.Dd)};g.Ub=function(a){var b=this.ub;if("cancel"===a.ge()){H(this.sb,"Raising a cancel event on a listener with no cancel callback");var c=this.sb;return function(){c.call(b,a.error)}}var d=this.ha[a.gd];return function(){d.call(b,a.Md,a.Dd)}};
	g.matches=function(a){if(a instanceof tg){if(!this.ha||!a.ha)return!0;if(this.ub===a.ub){var b=qa(a.ha);if(b===qa(this.ha)){if(1===b){var b=ra(a.ha),c=ra(this.ha);return c===b&&(!a.ha[b]||!this.ha[c]||a.ha[b]===this.ha[c])}return pa(this.ha,function(b,c){return a.ha[c]===b})}}}return!1};g.af=function(){return null!==this.ha};function X(a,b,c,d){this.u=a;this.path=b;this.n=c;this.Oc=d}
	function ug(a){var b=null,c=null;a.la&&(b=ie(a));a.oa&&(c=ke(a));if(a.g===ee){if(a.la){if("[MIN_NAME]"!=he(a))throw Error("Query: When ordering by key, you may only pass one argument to startAt(), endAt(), or equalTo().");if("string"!==typeof b)throw Error("Query: When ordering by key, the argument passed to startAt(), endAt(),or equalTo() must be a string.");}if(a.oa){if("[MAX_NAME]"!=je(a))throw Error("Query: When ordering by key, you may only pass one argument to startAt(), endAt(), or equalTo().");if("string"!==
	typeof c)throw Error("Query: When ordering by key, the argument passed to startAt(), endAt(),or equalTo() must be a string.");}}else if(a.g===N){if(null!=b&&!Df(b)||null!=c&&!Df(c))throw Error("Query: When ordering by priority, the first argument passed to startAt(), endAt(), or equalTo() must be a valid priority value (null, a number, or a string).");}else if(H(a.g instanceof xe||a.g===De,"unknown index type."),null!=b&&"object"===typeof b||null!=c&&"object"===typeof c)throw Error("Query: First argument passed to startAt(), endAt(), or equalTo() cannot be an object.");
	}function vg(a){if(a.la&&a.oa&&a.ya&&(!a.ya||""===a.oc))throw Error("Query: Can't combine startAt(), endAt(), and limit(). Use limitToFirst() or limitToLast() instead.");}function wg(a,b){if(!0===a.Oc)throw Error(b+": You can't combine multiple orderBy calls.");}g=X.prototype;g.xb=function(){y("Query.ref",0,0,arguments.length);return new U(this.u,this.path)};
	g.hc=function(a,b,c,d){y("Query.on",2,4,arguments.length);Jf("Query.on",a,!1);A("Query.on",2,b,!1);var e=xg("Query.on",c,d);if("value"===a)yg(this.u,this,new sg(b,e.cancel||null,e.Pa||null));else{var f={};f[a]=b;yg(this.u,this,new tg(f,e.cancel,e.Pa))}return b};
	g.Jc=function(a,b,c){y("Query.off",0,3,arguments.length);Jf("Query.off",a,!0);A("Query.off",2,b,!0);Eb("Query.off",3,c);var d=null,e=null;"value"===a?d=new sg(b||null,null,c||null):a&&(b&&(e={},e[a]=b),d=new tg(e,null,c||null));e=this.u;d=".info"===J(this.path)?e.pd.mb(this,d):e.K.mb(this,d);pc(e.da,this.path,d)};
	g.kg=function(a,b){function c(k){f&&(f=!1,e.Jc(a,c),b&&b.call(d.Pa,k),h.resolve(k))}y("Query.once",1,4,arguments.length);Jf("Query.once",a,!1);A("Query.once",2,b,!0);var d=xg("Query.once",arguments[2],arguments[3]),e=this,f=!0,h=new Hb;Jb(h.sa);this.hc(a,c,function(b){e.Jc(a,c);d.cancel&&d.cancel.call(d.Pa,b);h.reject(b)});return h.sa};
	g.ne=function(a){y("Query.limitToFirst",1,1,arguments.length);if(!fa(a)||Math.floor(a)!==a||0>=a)throw Error("Query.limitToFirst: First argument must be a positive integer.");if(this.n.ya)throw Error("Query.limitToFirst: Limit was already set (by another call to limit, limitToFirst, or limitToLast).");return new X(this.u,this.path,this.n.ne(a),this.Oc)};
	g.oe=function(a){y("Query.limitToLast",1,1,arguments.length);if(!fa(a)||Math.floor(a)!==a||0>=a)throw Error("Query.limitToLast: First argument must be a positive integer.");if(this.n.ya)throw Error("Query.limitToLast: Limit was already set (by another call to limit, limitToFirst, or limitToLast).");return new X(this.u,this.path,this.n.oe(a),this.Oc)};
	g.lg=function(a){y("Query.orderByChild",1,1,arguments.length);if("$key"===a)throw Error('Query.orderByChild: "$key" is invalid.  Use Query.orderByKey() instead.');if("$priority"===a)throw Error('Query.orderByChild: "$priority" is invalid.  Use Query.orderByPriority() instead.');if("$value"===a)throw Error('Query.orderByChild: "$value" is invalid.  Use Query.orderByValue() instead.');Lf("Query.orderByChild",a);wg(this,"Query.orderByChild");var b=new L(a);if(b.e())throw Error("Query.orderByChild: cannot pass in empty path.  Use Query.orderByValue() instead.");
	b=new xe(b);b=He(this.n,b);ug(b);return new X(this.u,this.path,b,!0)};g.mg=function(){y("Query.orderByKey",0,0,arguments.length);wg(this,"Query.orderByKey");var a=He(this.n,ee);ug(a);return new X(this.u,this.path,a,!0)};g.ng=function(){y("Query.orderByPriority",0,0,arguments.length);wg(this,"Query.orderByPriority");var a=He(this.n,N);ug(a);return new X(this.u,this.path,a,!0)};
	g.og=function(){y("Query.orderByValue",0,0,arguments.length);wg(this,"Query.orderByValue");var a=He(this.n,De);ug(a);return new X(this.u,this.path,a,!0)};g.Nd=function(a,b){y("Query.startAt",0,2,arguments.length);Ef("Query.startAt",a,this.path,!0);Kf("Query.startAt",b);var c=this.n.Nd(a,b);vg(c);ug(c);if(this.n.la)throw Error("Query.startAt: Starting point was already set (by another call to startAt or equalTo).");p(a)||(b=a=null);return new X(this.u,this.path,c,this.Oc)};
	g.fd=function(a,b){y("Query.endAt",0,2,arguments.length);Ef("Query.endAt",a,this.path,!0);Kf("Query.endAt",b);var c=this.n.fd(a,b);vg(c);ug(c);if(this.n.oa)throw Error("Query.endAt: Ending point was already set (by another call to endAt or equalTo).");return new X(this.u,this.path,c,this.Oc)};
	g.Rf=function(a,b){y("Query.equalTo",1,2,arguments.length);Ef("Query.equalTo",a,this.path,!1);Kf("Query.equalTo",b);if(this.n.la)throw Error("Query.equalTo: Starting point was already set (by another call to endAt or equalTo).");if(this.n.oa)throw Error("Query.equalTo: Ending point was already set (by another call to endAt or equalTo).");return this.Nd(a,b).fd(a,b)};
	g.toString=function(){y("Query.toString",0,0,arguments.length);for(var a=this.path,b="",c=a.Z;c<a.o.length;c++)""!==a.o[c]&&(b+="/"+encodeURIComponent(String(a.o[c])));return this.u.toString()+(b||"/")};g.ka=function(){var a=fd(Ie(this.n));return"{}"===a?"default":a};
	g.isEqual=function(a){y("Query.isEqual",1,1,arguments.length);if(!(a instanceof X))throw Error("Query.isEqual failed: First argument must be an instance of firebase.database.Query.");var b=this.u===a.u,c=this.path.$(a.path),d=this.ka()===a.ka();return b&&c&&d};
	function xg(a,b,c){var d={cancel:null,Pa:null};if(b&&c)d.cancel=b,A(a,3,d.cancel,!0),d.Pa=c,Eb(a,4,d.Pa);else if(b)if("object"===typeof b&&null!==b)d.Pa=b;else if("function"===typeof b)d.cancel=b;else throw Error(Db(a,3,!0)+" must either be a cancel callback or a context object.");return d}X.prototype.on=X.prototype.hc;X.prototype.off=X.prototype.Jc;X.prototype.once=X.prototype.kg;X.prototype.limitToFirst=X.prototype.ne;X.prototype.limitToLast=X.prototype.oe;X.prototype.orderByChild=X.prototype.lg;
	X.prototype.orderByKey=X.prototype.mg;X.prototype.orderByPriority=X.prototype.ng;X.prototype.orderByValue=X.prototype.og;X.prototype.startAt=X.prototype.Nd;X.prototype.endAt=X.prototype.fd;X.prototype.equalTo=X.prototype.Rf;X.prototype.toString=X.prototype.toString;X.prototype.isEqual=X.prototype.isEqual;kd(X.prototype,"ref",X.prototype.xb);function zg(a,b){this.value=a;this.children=b||Ag}var Ag=new Vf(function(a,b){return a===b?0:a<b?-1:1});function Bg(a){var b=Q;t(a,function(a,d){b=b.set(new L(d),a)});return b}g=zg.prototype;g.e=function(){return null===this.value&&this.children.e()};function Cg(a,b,c){if(null!=a.value&&c(a.value))return{path:C,value:a.value};if(b.e())return null;var d=J(b);a=a.children.get(d);return null!==a?(b=Cg(a,D(b),c),null!=b?{path:(new L(d)).k(b.path),value:b.value}:null):null}
	function Dg(a,b){return Cg(a,b,function(){return!0})}g.subtree=function(a){if(a.e())return this;var b=this.children.get(J(a));return null!==b?b.subtree(D(a)):Q};g.set=function(a,b){if(a.e())return new zg(b,this.children);var c=J(a),d=(this.children.get(c)||Q).set(D(a),b),c=this.children.Ra(c,d);return new zg(this.value,c)};
	g.remove=function(a){if(a.e())return this.children.e()?Q:new zg(null,this.children);var b=J(a),c=this.children.get(b);return c?(a=c.remove(D(a)),b=a.e()?this.children.remove(b):this.children.Ra(b,a),null===this.value&&b.e()?Q:new zg(this.value,b)):this};g.get=function(a){if(a.e())return this.value;var b=this.children.get(J(a));return b?b.get(D(a)):null};
	function de(a,b,c){if(b.e())return c;var d=J(b);b=de(a.children.get(d)||Q,D(b),c);d=b.e()?a.children.remove(d):a.children.Ra(d,b);return new zg(a.value,d)}function Eg(a,b){return Fg(a,C,b)}function Fg(a,b,c){var d={};a.children.ia(function(a,f){d[a]=Fg(f,b.k(a),c)});return c(b,a.value,d)}function Gg(a,b,c){return Hg(a,b,C,c)}function Hg(a,b,c,d){var e=a.value?d(c,a.value):!1;if(e)return e;if(b.e())return null;e=J(b);return(a=a.children.get(e))?Hg(a,D(b),c.k(e),d):null}
	function Ig(a,b,c){Jg(a,b,C,c)}function Jg(a,b,c,d){if(b.e())return a;a.value&&d(c,a.value);var e=J(b);return(a=a.children.get(e))?Jg(a,D(b),c.k(e),d):Q}function be(a,b){Kg(a,C,b)}function Kg(a,b,c){a.children.ia(function(a,e){Kg(e,b.k(a),c)});a.value&&c(b,a.value)}function Lg(a,b){a.children.ia(function(a,d){d.value&&b(a,d.value)})}var Q=new zg(null);zg.prototype.toString=function(){var a={};be(this,function(b,c){a[b.toString()]=c.toString()});return B(a)};function Mg(a,b,c){this.type=Ud;this.source=Ng;this.path=a;this.Pb=b;this.Id=c}Mg.prototype.Nc=function(a){if(this.path.e()){if(null!=this.Pb.value)return H(this.Pb.children.e(),"affectedTree should not have overlapping affected paths."),this;a=this.Pb.subtree(new L(a));return new Mg(C,a,this.Id)}H(J(this.path)===a,"operationForChild called for unrelated child.");return new Mg(D(this.path),this.Pb,this.Id)};
	Mg.prototype.toString=function(){return"Operation("+this.path+": "+this.source.toString()+" ack write revert="+this.Id+" affectedTree="+this.Pb+")"};var ac=0,wd=1,Ud=2,cc=3;function Og(a,b,c,d){this.ee=a;this.We=b;this.Ib=c;this.Ee=d;H(!d||b,"Tagged queries must be from server.")}var Ng=new Og(!0,!1,null,!1),Pg=new Og(!1,!0,null,!1);Og.prototype.toString=function(){return this.ee?"user":this.Ee?"server(queryID="+this.Ib+")":"server"};function Qg(a){this.X=a}var Rg=new Qg(new zg(null));function Sg(a,b,c){if(b.e())return new Qg(new zg(c));var d=Dg(a.X,b);if(null!=d){var e=d.path,d=d.value;b=T(e,b);d=d.F(b,c);return new Qg(a.X.set(e,d))}a=de(a.X,b,new zg(c));return new Qg(a)}function Tg(a,b,c){var d=a;Cb(c,function(a,c){d=Sg(d,b.k(a),c)});return d}Qg.prototype.Ed=function(a){if(a.e())return Rg;a=de(this.X,a,Q);return new Qg(a)};function Ug(a,b){var c=Dg(a.X,b);return null!=c?a.X.get(c.path).Q(T(c.path,b)):null}
	function Vg(a){var b=[],c=a.X.value;null!=c?c.J()||c.P(N,function(a,c){b.push(new K(a,c))}):a.X.children.ia(function(a,c){null!=c.value&&b.push(new K(a,c.value))});return b}function Wg(a,b){if(b.e())return a;var c=Ug(a,b);return null!=c?new Qg(new zg(c)):new Qg(a.X.subtree(b))}Qg.prototype.e=function(){return this.X.e()};Qg.prototype.apply=function(a){return Xg(C,this.X,a)};
	function Xg(a,b,c){if(null!=b.value)return c.F(a,b.value);var d=null;b.children.ia(function(b,f){".priority"===b?(H(null!==f.value,"Priority writes must always be leaf nodes"),d=f.value):c=Xg(a.k(b),f,c)});c.Q(a).e()||null===d||(c=c.F(a.k(".priority"),d));return c};function Yg(){this.Aa={}}g=Yg.prototype;g.e=function(){return xa(this.Aa)};g.gb=function(a,b,c){var d=a.source.Ib;if(null!==d)return d=x(this.Aa,d),H(null!=d,"SyncTree gave us an op for an invalid query."),d.gb(a,b,c);var e=[];t(this.Aa,function(d){e=e.concat(d.gb(a,b,c))});return e};g.Ob=function(a,b,c,d,e){var f=a.ka(),h=x(this.Aa,f);if(!h){var h=c.Ba(e?d:null),k=!1;h?k=!0:(h=d instanceof P?c.sc(d):F,k=!1);h=new og(a,new Yd(new zc(h,k,!1),new zc(d,e,!1)));this.Aa[f]=h}h.Ob(b);return rg(h,b)};
	g.mb=function(a,b,c){var d=a.ka(),e=[],f=[],h=null!=Zg(this);if("default"===d){var k=this;t(this.Aa,function(a,d){f=f.concat(a.mb(b,c));a.e()&&(delete k.Aa[d],S(a.W.n)||e.push(a.W))})}else{var m=x(this.Aa,d);m&&(f=f.concat(m.mb(b,c)),m.e()&&(delete this.Aa[d],S(m.W.n)||e.push(m.W)))}h&&null==Zg(this)&&e.push(new U(a.u,a.path));return{sg:e,Tf:f}};function $g(a){return Ka(sa(a.Aa),function(a){return!S(a.W.n)})}g.jb=function(a){var b=null;t(this.Aa,function(c){b=b||c.jb(a)});return b};
	function ah(a,b){if(S(b.n))return Zg(a);var c=b.ka();return x(a.Aa,c)}function Zg(a){return wa(a.Aa,function(a){return S(a.W.n)})||null};function bh(){this.T=Rg;this.ma=[];this.Cc=-1}function ch(a,b){for(var c=0;c<a.ma.length;c++){var d=a.ma[c];if(d.Zc===b)return d}return null}g=bh.prototype;
	g.Ed=function(a){var b=Pa(this.ma,function(b){return b.Zc===a});H(0<=b,"removeWrite called with nonexistent writeId.");var c=this.ma[b];this.ma.splice(b,1);for(var d=c.visible,e=!1,f=this.ma.length-1;d&&0<=f;){var h=this.ma[f];h.visible&&(f>=b&&dh(h,c.path)?d=!1:c.path.contains(h.path)&&(e=!0));f--}if(d){if(e)this.T=eh(this.ma,fh,C),this.Cc=0<this.ma.length?this.ma[this.ma.length-1].Zc:-1;else if(c.Ja)this.T=this.T.Ed(c.path);else{var k=this;t(c.children,function(a,b){k.T=k.T.Ed(c.path.k(b))})}return!0}return!1};
	g.Ba=function(a,b,c,d){if(c||d){var e=Wg(this.T,a);return!d&&e.e()?b:d||null!=b||null!=Ug(e,C)?(e=eh(this.ma,function(b){return(b.visible||d)&&(!c||!(0<=Ia(c,b.Zc)))&&(b.path.contains(a)||a.contains(b.path))},a),b=b||F,e.apply(b)):null}e=Ug(this.T,a);if(null!=e)return e;e=Wg(this.T,a);return e.e()?b:null!=b||null!=Ug(e,C)?(b=b||F,e.apply(b)):null};
	g.sc=function(a,b){var c=F,d=Ug(this.T,a);if(d)d.J()||d.P(N,function(a,b){c=c.U(a,b)});else if(b){var e=Wg(this.T,a);b.P(N,function(a,b){var d=Wg(e,new L(a)).apply(b);c=c.U(a,d)});Ja(Vg(e),function(a){c=c.U(a.name,a.S)})}else e=Wg(this.T,a),Ja(Vg(e),function(a){c=c.U(a.name,a.S)});return c};g.$c=function(a,b,c,d){H(c||d,"Either existingEventSnap or existingServerSnap must exist");a=a.k(b);if(null!=Ug(this.T,a))return null;a=Wg(this.T,a);return a.e()?d.Q(b):a.apply(d.Q(b))};
	g.rc=function(a,b,c){a=a.k(b);var d=Ug(this.T,a);return null!=d?d:yc(c,b)?Wg(this.T,a).apply(c.j().R(b)):null};g.mc=function(a){return Ug(this.T,a)};g.Xd=function(a,b,c,d,e,f){var h;a=Wg(this.T,a);h=Ug(a,C);if(null==h)if(null!=b)h=a.apply(b);else return[];h=h.ob(f);if(h.e()||h.J())return[];b=[];a=oe(f);e=e?h.$b(c,f):h.Yb(c,f);for(f=R(e);f&&b.length<d;)0!==a(f,c)&&b.push(f),f=R(e);return b};
	function dh(a,b){return a.Ja?a.path.contains(b):!!va(a.children,function(c,d){return a.path.k(d).contains(b)})}function fh(a){return a.visible}
	function eh(a,b,c){for(var d=Rg,e=0;e<a.length;++e){var f=a[e];if(b(f)){var h=f.path;if(f.Ja)c.contains(h)?(h=T(c,h),d=Sg(d,h,f.Ja)):h.contains(c)&&(h=T(h,c),d=Sg(d,C,f.Ja.Q(h)));else if(f.children)if(c.contains(h))h=T(c,h),d=Tg(d,h,f.children);else{if(h.contains(c))if(h=T(h,c),h.e())d=Tg(d,C,f.children);else if(f=x(f.children,J(h)))f=f.Q(D(h)),d=Sg(d,C,f)}else throw Sc("WriteRecord should have .snap or .children");}}return d}function gh(a,b){this.Mb=a;this.X=b}g=gh.prototype;
	g.Ba=function(a,b,c){return this.X.Ba(this.Mb,a,b,c)};g.sc=function(a){return this.X.sc(this.Mb,a)};g.$c=function(a,b,c){return this.X.$c(this.Mb,a,b,c)};g.mc=function(a){return this.X.mc(this.Mb.k(a))};g.Xd=function(a,b,c,d,e){return this.X.Xd(this.Mb,a,b,c,d,e)};g.rc=function(a,b){return this.X.rc(this.Mb,a,b)};g.k=function(a){return new gh(this.Mb.k(a),this.X)};function hh(){this.children={};this.ad=0;this.value=null}function ih(a,b,c){this.ud=a?a:"";this.Ha=b?b:null;this.A=c?c:new hh}function jh(a,b){for(var c=b instanceof L?b:new L(b),d=a,e;null!==(e=J(c));)d=new ih(e,d,x(d.A.children,e)||new hh),c=D(c);return d}g=ih.prototype;g.Ea=function(){return this.A.value};function kh(a,b){H("undefined"!==typeof b,"Cannot set value to undefined");a.A.value=b;lh(a)}g.clear=function(){this.A.value=null;this.A.children={};this.A.ad=0;lh(this)};
	g.kd=function(){return 0<this.A.ad};g.e=function(){return null===this.Ea()&&!this.kd()};g.P=function(a){var b=this;t(this.A.children,function(c,d){a(new ih(d,b,c))})};function mh(a,b,c,d){c&&!d&&b(a);a.P(function(a){mh(a,b,!0,d)});c&&d&&b(a)}function nh(a,b){for(var c=a.parent();null!==c&&!b(c);)c=c.parent()}g.path=function(){return new L(null===this.Ha?this.ud:this.Ha.path()+"/"+this.ud)};g.name=function(){return this.ud};g.parent=function(){return this.Ha};
	function lh(a){if(null!==a.Ha){var b=a.Ha,c=a.ud,d=a.e(),e=Bb(b.A.children,c);d&&e?(delete b.A.children[c],b.A.ad--,lh(b)):d||e||(b.A.children[c]=a.A,b.A.ad++,lh(b))}};function oh(a,b,c,d,e,f){this.id=ph++;this.f=Yc("p:"+this.id+":");this.qd={};this.aa={};this.qa=[];this.Pc=0;this.Lc=[];this.na=!1;this.Va=1E3;this.td=3E5;this.Hb=b;this.Kc=c;this.ue=d;this.M=a;this.pb=this.Ia=this.Db=this.ze=null;this.Vd=e;this.de=!1;this.ke=0;if(f)throw Error("Auth override specified in options, but not supported on non Node.js platforms");this.Je=f||null;this.vb=null;this.Nb=!1;this.Gd={};this.tg=0;this.Ve=!0;this.Bc=this.me=null;qh(this,0);Tf.Wb().hc("visible",this.jg,this);-1===
	a.host.indexOf("fblocal")&&Sf.Wb().hc("online",this.ig,this)}var ph=0,rh=0;g=oh.prototype;g.va=function(a,b,c){var d=++this.tg;a={r:d,a:a,b:b};this.f(B(a));H(this.na,"sendRequest call when we're not connected not allowed.");this.Ia.va(a);c&&(this.Gd[d]=c)};
	g.df=function(a,b,c,d){var e=a.ka(),f=a.path.toString();this.f("Listen called for "+f+" "+e);this.aa[f]=this.aa[f]||{};H(rd(a.n)||!S(a.n),"listen() called for non-default but complete query");H(!this.aa[f][e],"listen() called twice for same path/queryId.");a={G:d,ld:b,pg:a,tag:c};this.aa[f][e]=a;this.na&&sh(this,a)};
	function sh(a,b){var c=b.pg,d=c.path.toString(),e=c.ka();a.f("Listen on "+d+" for "+e);var f={p:d};b.tag&&(f.q=Ie(c.n),f.t=b.tag);f.h=b.ld();a.va("q",f,function(f){var k=f.d,m=f.s;if(k&&"object"===typeof k&&Bb(k,"w")){var l=x(k,"w");da(l)&&0<=Ia(l,"no_index")&&O("Using an unspecified index. Consider adding "+('".indexOn": "'+c.n.g.toString()+'"')+" at "+c.path.toString()+" to your security rules for better performance")}(a.aa[d]&&a.aa[d][e])===b&&(a.f("listen response",f),"ok"!==m&&th(a,d,e),b.G&&
	b.G(m,k))})}g.qf=function(a){this.pb=a;this.f("Auth token refreshed");this.pb?uh(this):this.na&&this.va("unauth",{},function(){});if(a&&40===a.length||od(a))this.f("Admin auth credential detected.  Reducing max reconnect time."),this.td=3E4};function uh(a){if(a.na&&a.pb){var b=a.pb,c=nd(b)?"auth":"gauth",d={cred:b};a.Je&&(d.authvar=a.Je);a.va(c,d,function(c){var d=c.s;c=c.d||"error";a.pb===b&&("ok"===d?a.ke=0:vh(a,d,c))})}}
	g.Ef=function(a,b){var c=a.path.toString(),d=a.ka();this.f("Unlisten called for "+c+" "+d);H(rd(a.n)||!S(a.n),"unlisten() called for non-default but complete query");if(th(this,c,d)&&this.na){var e=Ie(a.n);this.f("Unlisten on "+c+" for "+d);c={p:c};b&&(c.q=e,c.t=b);this.va("n",c)}};g.re=function(a,b,c){this.na?wh(this,"o",a,b,c):this.Lc.push({we:a,action:"o",data:b,G:c})};g.gf=function(a,b,c){this.na?wh(this,"om",a,b,c):this.Lc.push({we:a,action:"om",data:b,G:c})};
	g.xd=function(a,b){this.na?wh(this,"oc",a,null,b):this.Lc.push({we:a,action:"oc",data:null,G:b})};function wh(a,b,c,d,e){c={p:c,d:d};a.f("onDisconnect "+b,c);a.va(b,c,function(a){e&&setTimeout(function(){e(a.s,a.d)},Math.floor(0))})}g.put=function(a,b,c,d){xh(this,"p",a,b,c,d)};g.ef=function(a,b,c,d){xh(this,"m",a,b,c,d)};function xh(a,b,c,d,e,f){d={p:c,d:d};p(f)&&(d.h=f);a.qa.push({action:b,sf:d,G:e});a.Pc++;b=a.qa.length-1;a.na?yh(a,b):a.f("Buffering put: "+c)}
	function yh(a,b){var c=a.qa[b].action,d=a.qa[b].sf,e=a.qa[b].G;a.qa[b].qg=a.na;a.va(c,d,function(d){a.f(c+" response",d);delete a.qa[b];a.Pc--;0===a.Pc&&(a.qa=[]);e&&e(d.s,d.d)})}g.ye=function(a){this.na&&(a={c:a},this.f("reportStats",a),this.va("s",a,function(a){"ok"!==a.s&&this.f("reportStats","Error sending stats: "+a.d)}))};
	g.wd=function(a){if("r"in a){this.f("from server: "+B(a));var b=a.r,c=this.Gd[b];c&&(delete this.Gd[b],c(a.b))}else{if("error"in a)throw"A server-side error has occurred: "+a.error;"a"in a&&(b=a.a,a=a.b,this.f("handleServerMessage",b,a),"d"===b?this.Hb(a.p,a.d,!1,a.t):"m"===b?this.Hb(a.p,a.d,!0,a.t):"c"===b?zh(this,a.p,a.q):"ac"===b?vh(this,a.s,a.d):"sd"===b?this.ze?this.ze(a):"msg"in a&&"undefined"!==typeof console&&console.log("FIREBASE: "+a.msg.replace("\n","\nFIREBASE: ")):Zc("Unrecognized action received from server: "+
	B(b)+"\nAre you using the latest client?"))}};g.Mc=function(a,b){this.f("connection ready");this.na=!0;this.Bc=(new Date).getTime();this.ue({serverTimeOffset:a-(new Date).getTime()});this.Db=b;if(this.Ve){var c={};c["sdk.js."+firebase.SDK_VERSION.replace(/\./g,"-")]=1;Qb()?c["framework.cordova"]=1:"object"===typeof navigator&&"ReactNative"===navigator.product&&(c["framework.reactnative"]=1);this.ye(c)}Ah(this);this.Ve=!1;this.Kc(!0)};
	function qh(a,b){H(!a.Ia,"Scheduling a connect when we're already connected/ing?");a.vb&&clearTimeout(a.vb);a.vb=setTimeout(function(){a.vb=null;Bh(a)},Math.floor(b))}g.jg=function(a){a&&!this.Nb&&this.Va===this.td&&(this.f("Window became visible.  Reducing delay."),this.Va=1E3,this.Ia||qh(this,0));this.Nb=a};g.ig=function(a){a?(this.f("Browser went online."),this.Va=1E3,this.Ia||qh(this,0)):(this.f("Browser went offline.  Killing connection."),this.Ia&&this.Ia.close())};
	g.jf=function(){this.f("data client disconnected");this.na=!1;this.Ia=null;for(var a=0;a<this.qa.length;a++){var b=this.qa[a];b&&"h"in b.sf&&b.qg&&(b.G&&b.G("disconnect"),delete this.qa[a],this.Pc--)}0===this.Pc&&(this.qa=[]);this.Gd={};Ch(this)&&(this.Nb?this.Bc&&(3E4<(new Date).getTime()-this.Bc&&(this.Va=1E3),this.Bc=null):(this.f("Window isn't visible.  Delaying reconnect."),this.Va=this.td,this.me=(new Date).getTime()),a=Math.max(0,this.Va-((new Date).getTime()-this.me)),a*=Math.random(),this.f("Trying to reconnect in "+
	a+"ms"),qh(this,a),this.Va=Math.min(this.td,1.3*this.Va));this.Kc(!1)};
	function Bh(a){if(Ch(a)){a.f("Making a connection attempt");a.me=(new Date).getTime();a.Bc=null;var b=r(a.wd,a),c=r(a.Mc,a),d=r(a.jf,a),e=a.id+":"+rh++,f=a.Db,h=!1,k=null,m=function(){k?k.close():(h=!0,d())};a.Ia={close:m,va:function(a){H(k,"sendRequest call when we're not connected not allowed.");k.va(a)}};var l=a.de;a.de=!1;a.Vd.getToken(l).then(function(l){h?E("getToken() completed but was canceled"):(E("getToken() completed. Creating connection."),a.pb=l&&l.accessToken,k=new bf(e,a.M,b,c,d,function(b){O(b+
	" ("+a.M.toString()+")");a.eb("server_kill")},f))}).then(null,function(b){a.f("Failed to get token: "+b);h||m()})}}g.eb=function(a){E("Interrupting connection for reason: "+a);this.qd[a]=!0;this.Ia?this.Ia.close():(this.vb&&(clearTimeout(this.vb),this.vb=null),this.na&&this.jf())};g.lc=function(a){E("Resuming connection for reason: "+a);delete this.qd[a];xa(this.qd)&&(this.Va=1E3,this.Ia||qh(this,0))};
	function zh(a,b,c){c=c?La(c,function(a){return fd(a)}).join("$"):"default";(a=th(a,b,c))&&a.G&&a.G("permission_denied")}function th(a,b,c){b=(new L(b)).toString();var d;p(a.aa[b])?(d=a.aa[b][c],delete a.aa[b][c],0===qa(a.aa[b])&&delete a.aa[b]):d=void 0;return d}
	function vh(a,b,c){E("Auth token revoked: "+b+"/"+c);a.pb=null;a.de=!0;a.Ia.close();"invalid_token"===b&&(a.ke++,3<=a.ke&&(a.Va=3E4,O("Provided authentication credentials are invalid. This usually indicates your FirebaseApp instance was not initialized correctly. Make sure your apiKey and databaseURL match the values provided for your app at https://console.firebase.google.com/, or if you're using a service account, make sure it's authorized to access the specified databaseURL and is from the correct project.")))}
	function Ah(a){uh(a);t(a.aa,function(b){t(b,function(b){sh(a,b)})});for(var b=0;b<a.qa.length;b++)a.qa[b]&&yh(a,b);for(;a.Lc.length;)b=a.Lc.shift(),wh(a,b.action,b.we,b.data,b.G)}function Ch(a){var b;b=Sf.Wb().ic;return xa(a.qd)&&b};var Y={Xf:function(){Re=Ed=!0}};Y.forceLongPolling=Y.Xf;Y.Yf=function(){Se=!0};Y.forceWebSockets=Y.Yf;Y.dg=function(){return Dd.isAvailable()};Y.isWebSocketsAvailable=Y.dg;Y.wg=function(a,b){a.u.Ua.ze=b};Y.setSecurityDebugCallback=Y.wg;Y.Be=function(a,b){a.u.Be(b)};Y.stats=Y.Be;Y.Ce=function(a,b){a.u.Ce(b)};Y.statsIncrementCounter=Y.Ce;Y.ed=function(a){return a.u.ed};Y.dataUpdateCount=Y.ed;Y.cg=function(a,b){a.u.je=b};Y.interceptServerData=Y.cg;function Dh(a){this.xa=Q;this.lb=new bh;this.De={};this.jc={};this.Dc=a}function Eh(a,b,c,d,e){var f=a.lb,h=e;H(d>f.Cc,"Stacking an older write on top of newer ones");p(h)||(h=!0);f.ma.push({path:b,Ja:c,Zc:d,visible:h});h&&(f.T=Sg(f.T,b,c));f.Cc=d;return e?Fh(a,new $b(Ng,b,c)):[]}function Gh(a,b,c,d){var e=a.lb;H(d>e.Cc,"Stacking an older merge on top of newer ones");e.ma.push({path:b,children:c,Zc:d,visible:!0});e.T=Tg(e.T,b,c);e.Cc=d;c=Bg(c);return Fh(a,new vd(Ng,b,c))}
	function Hh(a,b,c){c=c||!1;var d=ch(a.lb,b);if(a.lb.Ed(b)){var e=Q;null!=d.Ja?e=e.set(C,!0):Cb(d.children,function(a,b){e=e.set(new L(a),b)});return Fh(a,new Mg(d.path,e,c))}return[]}function Ih(a,b,c){c=Bg(c);return Fh(a,new vd(Pg,b,c))}function Jh(a,b,c,d){d=Kh(a,d);if(null!=d){var e=Lh(d);d=e.path;e=e.Ib;b=T(d,b);c=new $b(new Og(!1,!0,e,!0),b,c);return Mh(a,d,c)}return[]}
	function Nh(a,b,c,d){if(d=Kh(a,d)){var e=Lh(d);d=e.path;e=e.Ib;b=T(d,b);c=Bg(c);c=new vd(new Og(!1,!0,e,!0),b,c);return Mh(a,d,c)}return[]}
	Dh.prototype.Ob=function(a,b){var c=a.path,d=null,e=!1;Ig(this.xa,c,function(a,b){var f=T(a,c);d=d||b.jb(f);e=e||null!=Zg(b)});var f=this.xa.get(c);f?(e=e||null!=Zg(f),d=d||f.jb(C)):(f=new Yg,this.xa=this.xa.set(c,f));var h;null!=d?h=!0:(h=!1,d=F,Lg(this.xa.subtree(c),function(a,b){var c=b.jb(C);c&&(d=d.U(a,c))}));var k=null!=ah(f,a);if(!k&&!S(a.n)){var m=Oh(a);H(!(m in this.jc),"View does not exist, but we have a tag");var l=Ph++;this.jc[m]=l;this.De["_"+l]=m}h=f.Ob(a,b,new gh(c,this.lb),d,h);k||
	e||(f=ah(f,a),h=h.concat(Qh(this,a,f)));return h};
	Dh.prototype.mb=function(a,b,c){var d=a.path,e=this.xa.get(d),f=[];if(e&&("default"===a.ka()||null!=ah(e,a))){f=e.mb(a,b,c);e.e()&&(this.xa=this.xa.remove(d));e=f.sg;f=f.Tf;b=-1!==Pa(e,function(a){return S(a.n)});var h=Gg(this.xa,d,function(a,b){return null!=Zg(b)});if(b&&!h&&(d=this.xa.subtree(d),!d.e()))for(var d=Rh(d),k=0;k<d.length;++k){var m=d[k],l=m.W,m=Sh(this,m);this.Dc.Ae(Th(l),Uh(this,l),m.ld,m.G)}if(!h&&0<e.length&&!c)if(b)this.Dc.Od(Th(a),null);else{var u=this;Ja(e,function(a){a.ka();
	var b=u.jc[Oh(a)];u.Dc.Od(Th(a),b)})}Vh(this,e)}return f};Dh.prototype.Ba=function(a,b){var c=this.lb,d=Gg(this.xa,a,function(b,c){var d=T(b,a);if(d=c.jb(d))return d});return c.Ba(a,d,b,!0)};function Rh(a){return Eg(a,function(a,c,d){if(c&&null!=Zg(c))return[Zg(c)];var e=[];c&&(e=$g(c));t(d,function(a){e=e.concat(a)});return e})}function Vh(a,b){for(var c=0;c<b.length;++c){var d=b[c];if(!S(d.n)){var d=Oh(d),e=a.jc[d];delete a.jc[d];delete a.De["_"+e]}}}
	function Th(a){return S(a.n)&&!rd(a.n)?a.xb():a}function Qh(a,b,c){var d=b.path,e=Uh(a,b);c=Sh(a,c);b=a.Dc.Ae(Th(b),e,c.ld,c.G);d=a.xa.subtree(d);if(e)H(null==Zg(d.value),"If we're adding a query, it shouldn't be shadowed");else for(e=Eg(d,function(a,b,c){if(!a.e()&&b&&null!=Zg(b))return[pg(Zg(b))];var d=[];b&&(d=d.concat(La($g(b),function(a){return a.W})));t(c,function(a){d=d.concat(a)});return d}),d=0;d<e.length;++d)c=e[d],a.Dc.Od(Th(c),Uh(a,c));return b}
	function Sh(a,b){var c=b.W,d=Uh(a,c);return{ld:function(){return(b.w()||F).hash()},G:function(b){if("ok"===b){if(d){var f=c.path;if(b=Kh(a,d)){var h=Lh(b);b=h.path;h=h.Ib;f=T(b,f);f=new bc(new Og(!1,!0,h,!0),f);b=Mh(a,b,f)}else b=[]}else b=Fh(a,new bc(Pg,c.path));return b}f="Unknown Error";"too_big"===b?f="The data requested exceeds the maximum size that can be accessed with a single request.":"permission_denied"==b?f="Client doesn't have permission to access the desired data.":"unavailable"==b&&
	(f="The service is unavailable");f=Error(b+" at "+c.path.toString()+": "+f);f.code=b.toUpperCase();return a.mb(c,null,f)}}}function Oh(a){return a.path.toString()+"$"+a.ka()}function Lh(a){var b=a.indexOf("$");H(-1!==b&&b<a.length-1,"Bad queryKey.");return{Ib:a.substr(b+1),path:new L(a.substr(0,b))}}function Kh(a,b){var c=a.De,d="_"+b;return d in c?c[d]:void 0}function Uh(a,b){var c=Oh(b);return x(a.jc,c)}var Ph=1;
	function Mh(a,b,c){var d=a.xa.get(b);H(d,"Missing sync point for query tag that we're tracking");return d.gb(c,new gh(b,a.lb),null)}function Fh(a,b){return Wh(a,b,a.xa,null,new gh(C,a.lb))}function Wh(a,b,c,d,e){if(b.path.e())return Xh(a,b,c,d,e);var f=c.get(C);null==d&&null!=f&&(d=f.jb(C));var h=[],k=J(b.path),m=b.Nc(k);if((c=c.children.get(k))&&m)var l=d?d.R(k):null,k=e.k(k),h=h.concat(Wh(a,m,c,l,k));f&&(h=h.concat(f.gb(b,e,d)));return h}
	function Xh(a,b,c,d,e){var f=c.get(C);null==d&&null!=f&&(d=f.jb(C));var h=[];c.children.ia(function(c,f){var l=d?d.R(c):null,u=e.k(c),z=b.Nc(c);z&&(h=h.concat(Xh(a,z,f,l,u)))});f&&(h=h.concat(f.gb(b,e,d)));return h};function tf(a,b,c){this.app=c;var d=new dc(c);this.M=a;this.Xa=Ad(a);this.Vc=null;this.da=new mc;this.vd=1;this.Ua=null;if(b||0<=("object"===typeof window&&window.navigator&&window.navigator.userAgent||"").search(/googlebot|google webmaster tools|bingbot|yahoo! slurp|baiduspider|yandexbot|duckduckbot/i))this.wa=new pd(this.M,r(this.Hb,this),d),setTimeout(r(this.Kc,this,!0),0);else{b=c.options.databaseAuthVariableOverride||null;if(null!==b){if("object"!==ca(b))throw Error("Only objects are supported for option databaseAuthVariableOverride");
	try{B(b)}catch(e){throw Error("Invalid authOverride provided: "+e);}}this.wa=this.Ua=new oh(this.M,r(this.Hb,this),r(this.Kc,this),r(this.ue,this),d,b)}var f=this;ec(d,function(a){f.wa.qf(a)});this.zg=Bd(a,r(function(){return new xd(this.Xa,this.wa)},this));this.nc=new ih;this.ie=new fc;this.pd=new Dh({Ae:function(a,b,c,d){b=[];c=f.ie.j(a.path);c.e()||(b=Fh(f.pd,new $b(Pg,a.path,c)),setTimeout(function(){d("ok")},0));return b},Od:aa});Yh(this,"connected",!1);this.ja=new Mc;this.$a=new sf(this);this.ed=
	0;this.je=null;this.K=new Dh({Ae:function(a,b,c,d){f.wa.df(a,c,b,function(b,c){var e=d(b,c);rc(f.da,a.path,e)});return[]},Od:function(a,b){f.wa.Ef(a,b)}})}g=tf.prototype;g.toString=function(){return(this.M.Sc?"https://":"http://")+this.M.host};g.name=function(){return this.M.pe};function Zh(a){a=a.ie.j(new L(".info/serverTimeOffset")).H()||0;return(new Date).getTime()+a}function $h(a){a=a={timestamp:Zh(a)};a.timestamp=a.timestamp||(new Date).getTime();return a}
	g.Hb=function(a,b,c,d){this.ed++;var e=new L(a);b=this.je?this.je(a,b):b;a=[];d?c?(b=oa(b,function(a){return M(a)}),a=Nh(this.K,e,b,d)):(b=M(b),a=Jh(this.K,e,b,d)):c?(d=oa(b,function(a){return M(a)}),a=Ih(this.K,e,d)):(d=M(b),a=Fh(this.K,new $b(Pg,e,d)));d=e;0<a.length&&(d=ai(this,e));rc(this.da,d,a)};g.Kc=function(a){Yh(this,"connected",a);!1===a&&bi(this)};g.ue=function(a){var b=this;hd(a,function(a,d){Yh(b,d,a)})};
	function Yh(a,b,c){b=new L("/.info/"+b);c=M(c);var d=a.ie;d.Jd=d.Jd.F(b,c);c=Fh(a.pd,new $b(Pg,b,c));rc(a.da,b,c)}g.Kb=function(a,b,c,d){this.f("set",{path:a.toString(),value:b,Gg:c});var e=$h(this);b=M(b,c);var e=Pc(b,e),f=this.vd++,e=Eh(this.K,a,e,f,!0);nc(this.da,e);var h=this;this.wa.put(a.toString(),b.H(!0),function(b,c){var e="ok"===b;e||O("set at "+a+" failed: "+b);e=Hh(h.K,f,!e);rc(h.da,a,e);ci(d,b,c)});e=di(this,a);ai(this,e);rc(this.da,e,[])};
	g.update=function(a,b,c){this.f("update",{path:a.toString(),value:b});var d=!0,e=$h(this),f={};t(b,function(a,b){d=!1;var c=M(a);f[b]=Pc(c,e)});if(d)E("update() called with empty data.  Don't do anything."),ci(c,"ok");else{var h=this.vd++,k=Gh(this.K,a,f,h);nc(this.da,k);var m=this;this.wa.ef(a.toString(),b,function(b,d){var e="ok"===b;e||O("update at "+a+" failed: "+b);var e=Hh(m.K,h,!e),f=a;0<e.length&&(f=ai(m,a));rc(m.da,f,e);ci(c,b,d)});t(b,function(b,c){var d=di(m,a.k(c));ai(m,d)});rc(this.da,
	a,[])}};function bi(a){a.f("onDisconnectEvents");var b=$h(a),c=[];Nc(Lc(a.ja,b),C,function(b,e){c=c.concat(Fh(a.K,new $b(Pg,b,e)));var f=di(a,b);ai(a,f)});a.ja=new Mc;rc(a.da,C,c)}g.xd=function(a,b){var c=this;this.wa.xd(a.toString(),function(d,e){"ok"===d&&zf(c.ja,a);ci(b,d,e)})};function Nf(a,b,c,d){var e=M(c);a.wa.re(b.toString(),e.H(!0),function(c,h){"ok"===c&&Oc(a.ja,b,e);ci(d,c,h)})}
	function Of(a,b,c,d,e){var f=M(c,d);a.wa.re(b.toString(),f.H(!0),function(c,d){"ok"===c&&Oc(a.ja,b,f);ci(e,c,d)})}function Pf(a,b,c,d){var e=!0,f;for(f in c)e=!1;e?(E("onDisconnect().update() called with empty data.  Don't do anything."),ci(d,"ok")):a.wa.gf(b.toString(),c,function(e,f){if("ok"===e)for(var m in c){var l=M(c[m]);Oc(a.ja,b.k(m),l)}ci(d,e,f)})}function yg(a,b,c){c=".info"===J(b.path)?a.pd.Ob(b,c):a.K.Ob(b,c);pc(a.da,b.path,c)}g.eb=function(){this.Ua&&this.Ua.eb("repo_interrupt")};
	g.lc=function(){this.Ua&&this.Ua.lc("repo_interrupt")};g.Be=function(a){if("undefined"!==typeof console){a?(this.Vc||(this.Vc=new lc(this.Xa)),a=this.Vc.get()):a=this.Xa.get();var b=Ma(ta(a),function(a,b){return Math.max(b.length,a)},0),c;for(c in a){for(var d=a[c],e=c.length;e<b+2;e++)c+=" ";console.log(c+d)}}};g.Ce=function(a){kc(this.Xa,a);this.zg.zf[a]=!0};g.f=function(a){var b="";this.Ua&&(b=this.Ua.id+":");E(b,arguments)};
	function ci(a,b,c){a&&Ub(function(){if("ok"==b)a(null);else{var d=(b||"error").toUpperCase(),e=d;c&&(e+=": "+c);e=Error(e);e.code=d;a(e)}})};function ei(a,b,c,d,e){function f(){}a.f("transaction on "+b);var h=new U(a,b);h.hc("value",f);c={path:b,update:c,G:d,status:null,lf:Rc(),Ie:e,wf:0,Rd:function(){h.Jc("value",f)},Td:null,Da:null,bd:null,cd:null,dd:null};d=a.K.Ba(b,void 0)||F;c.bd=d;d=c.update(d.H());if(p(d)){Ff("transaction failed: Data returned ",d,c.path);c.status=1;e=jh(a.nc,b);var k=e.Ea()||[];k.push(c);kh(e,k);"object"===typeof d&&null!==d&&Bb(d,".priority")?(k=x(d,".priority"),H(Df(k),"Invalid priority returned by transaction. Priority must be a valid string, finite number, server value, or null.")):
	k=(a.K.Ba(b)||F).C().H();e=$h(a);d=M(d,k);e=Pc(d,e);c.cd=d;c.dd=e;c.Da=a.vd++;c=Eh(a.K,b,e,c.Da,c.Ie);rc(a.da,b,c);fi(a)}else c.Rd(),c.cd=null,c.dd=null,c.G&&(a=new W(c.bd,new U(a,c.path),N),c.G(null,!1,a))}function fi(a,b){var c=b||a.nc;b||gi(a,c);if(null!==c.Ea()){var d=hi(a,c);H(0<d.length,"Sending zero length transaction queue");Na(d,function(a){return 1===a.status})&&ii(a,c.path(),d)}else c.kd()&&c.P(function(b){fi(a,b)})}
	function ii(a,b,c){for(var d=La(c,function(a){return a.Da}),e=a.K.Ba(b,d)||F,d=e,e=e.hash(),f=0;f<c.length;f++){var h=c[f];H(1===h.status,"tryToSendTransactionQueue_: items in queue should all be run.");h.status=2;h.wf++;var k=T(b,h.path),d=d.F(k,h.cd)}d=d.H(!0);a.wa.put(b.toString(),d,function(d){a.f("transaction put response",{path:b.toString(),status:d});var e=[];if("ok"===d){d=[];for(f=0;f<c.length;f++){c[f].status=3;e=e.concat(Hh(a.K,c[f].Da));if(c[f].G){var h=c[f].dd,k=new U(a,c[f].path);d.push(r(c[f].G,
	null,null,!0,new W(h,k,N)))}c[f].Rd()}gi(a,jh(a.nc,b));fi(a);rc(a.da,b,e);for(f=0;f<d.length;f++)Ub(d[f])}else{if("datastale"===d)for(f=0;f<c.length;f++)c[f].status=4===c[f].status?5:1;else for(O("transaction at "+b.toString()+" failed: "+d),f=0;f<c.length;f++)c[f].status=5,c[f].Td=d;ai(a,b)}},e)}function ai(a,b){var c=ji(a,b),d=c.path(),c=hi(a,c);ki(a,c,d);return d}
	function ki(a,b,c){if(0!==b.length){for(var d=[],e=[],f=Ka(b,function(a){return 1===a.status}),f=La(f,function(a){return a.Da}),h=0;h<b.length;h++){var k=b[h],m=T(c,k.path),l=!1,u;H(null!==m,"rerunTransactionsUnderNode_: relativePath should not be null.");if(5===k.status)l=!0,u=k.Td,e=e.concat(Hh(a.K,k.Da,!0));else if(1===k.status)if(25<=k.wf)l=!0,u="maxretry",e=e.concat(Hh(a.K,k.Da,!0));else{var z=a.K.Ba(k.path,f)||F;k.bd=z;var G=b[h].update(z.H());p(G)?(Ff("transaction failed: Data returned ",G,
	k.path),m=M(G),"object"===typeof G&&null!=G&&Bb(G,".priority")||(m=m.ga(z.C())),z=k.Da,G=$h(a),G=Pc(m,G),k.cd=m,k.dd=G,k.Da=a.vd++,Qa(f,z),e=e.concat(Eh(a.K,k.path,G,k.Da,k.Ie)),e=e.concat(Hh(a.K,z,!0))):(l=!0,u="nodata",e=e.concat(Hh(a.K,k.Da,!0)))}rc(a.da,c,e);e=[];l&&(b[h].status=3,setTimeout(b[h].Rd,Math.floor(0)),b[h].G&&("nodata"===u?(k=new U(a,b[h].path),d.push(r(b[h].G,null,null,!1,new W(b[h].bd,k,N)))):d.push(r(b[h].G,null,Error(u),!1,null))))}gi(a,a.nc);for(h=0;h<d.length;h++)Ub(d[h]);fi(a)}}
	function ji(a,b){for(var c,d=a.nc;null!==(c=J(b))&&null===d.Ea();)d=jh(d,c),b=D(b);return d}function hi(a,b){var c=[];li(a,b,c);c.sort(function(a,b){return a.lf-b.lf});return c}function li(a,b,c){var d=b.Ea();if(null!==d)for(var e=0;e<d.length;e++)c.push(d[e]);b.P(function(b){li(a,b,c)})}function gi(a,b){var c=b.Ea();if(c){for(var d=0,e=0;e<c.length;e++)3!==c[e].status&&(c[d]=c[e],d++);c.length=d;kh(b,0<c.length?c:null)}b.P(function(b){gi(a,b)})}
	function di(a,b){var c=ji(a,b).path(),d=jh(a.nc,b);nh(d,function(b){mi(a,b)});mi(a,d);mh(d,function(b){mi(a,b)});return c}
	function mi(a,b){var c=b.Ea();if(null!==c){for(var d=[],e=[],f=-1,h=0;h<c.length;h++)4!==c[h].status&&(2===c[h].status?(H(f===h-1,"All SENT items should be at beginning of queue."),f=h,c[h].status=4,c[h].Td="set"):(H(1===c[h].status,"Unexpected transaction status in abort"),c[h].Rd(),e=e.concat(Hh(a.K,c[h].Da,!0)),c[h].G&&d.push(r(c[h].G,null,Error("set"),!1,null))));-1===f?kh(b,null):c.length=f+1;rc(a.da,b.path(),e);for(h=0;h<d.length;h++)Ub(d[h])}};function yf(){this.nb={};this.Ff=!1}yf.prototype.eb=function(){for(var a in this.nb)this.nb[a].eb()};yf.prototype.lc=function(){for(var a in this.nb)this.nb[a].lc()};yf.prototype.ce=function(a){this.Ff=a};ba(yf);yf.prototype.interrupt=yf.prototype.eb;yf.prototype.resume=yf.prototype.lc;var Z={};Z.pc=oh;Z.DataConnection=Z.pc;oh.prototype.yg=function(a,b){this.va("q",{p:a},b)};Z.pc.prototype.simpleListen=Z.pc.prototype.yg;oh.prototype.Qf=function(a,b){this.va("echo",{d:a},b)};Z.pc.prototype.echo=Z.pc.prototype.Qf;oh.prototype.interrupt=oh.prototype.eb;Z.If=bf;Z.RealTimeConnection=Z.If;bf.prototype.sendRequest=bf.prototype.va;bf.prototype.close=bf.prototype.close;
	Z.bg=function(a){var b=oh.prototype.put;oh.prototype.put=function(c,d,e,f){p(f)&&(f=a());b.call(this,c,d,e,f)};return function(){oh.prototype.put=b}};Z.hijackHash=Z.bg;Z.Hf=gc;Z.ConnectionTarget=Z.Hf;Z.ka=function(a){return a.ka()};Z.queryIdentifier=Z.ka;Z.eg=function(a){return a.u.Ua.aa};Z.listens=Z.eg;Z.ce=function(a){yf.Wb().ce(a)};Z.forceRestClient=Z.ce;Z.Context=yf;function U(a,b){if(!(a instanceof tf))throw Error("new Firebase() no longer supported - use app.database().");X.call(this,a,b,Fe,!1);this.then=void 0;this["catch"]=void 0}ka(U,X);g=U.prototype;g.getKey=function(){y("Firebase.key",0,0,arguments.length);return this.path.e()?null:ae(this.path)};
	g.k=function(a){y("Firebase.child",1,1,arguments.length);if(fa(a))a=String(a);else if(!(a instanceof L))if(null===J(this.path)){var b=a;b&&(b=b.replace(/^\/*\.info(\/|$)/,"/"));Lf("Firebase.child",b)}else Lf("Firebase.child",a);return new U(this.u,this.path.k(a))};g.getParent=function(){y("Firebase.parent",0,0,arguments.length);var a=this.path.parent();return null===a?null:new U(this.u,a)};
	g.Zf=function(){y("Firebase.ref",0,0,arguments.length);for(var a=this;null!==a.getParent();)a=a.getParent();return a};g.Pf=function(){return this.u.$a};g.set=function(a,b){y("Firebase.set",1,2,arguments.length);Mf("Firebase.set",this.path);Ef("Firebase.set",a,this.path,!1);A("Firebase.set",2,b,!0);var c=new Hb;this.u.Kb(this.path,a,null,Ib(c,b));return c.sa};
	g.update=function(a,b){y("Firebase.update",1,2,arguments.length);Mf("Firebase.update",this.path);if(da(a)){for(var c={},d=0;d<a.length;++d)c[""+d]=a[d];a=c;O("Passing an Array to Firebase.update() is deprecated. Use set() if you want to overwrite the existing data, or an Object with integer keys if you really do want to only update some of the children.")}Hf("Firebase.update",a,this.path);A("Firebase.update",2,b,!0);c=new Hb;this.u.update(this.path,a,Ib(c,b));return c.sa};
	g.Kb=function(a,b,c){y("Firebase.setWithPriority",2,3,arguments.length);Mf("Firebase.setWithPriority",this.path);Ef("Firebase.setWithPriority",a,this.path,!1);If("Firebase.setWithPriority",2,b);A("Firebase.setWithPriority",3,c,!0);if(".length"===this.getKey()||".keys"===this.getKey())throw"Firebase.setWithPriority failed: "+this.getKey()+" is a read-only object.";var d=new Hb;this.u.Kb(this.path,a,b,Ib(d,c));return d.sa};
	g.remove=function(a){y("Firebase.remove",0,1,arguments.length);Mf("Firebase.remove",this.path);A("Firebase.remove",1,a,!0);return this.set(null,a)};
	g.transaction=function(a,b,c){y("Firebase.transaction",1,3,arguments.length);Mf("Firebase.transaction",this.path);A("Firebase.transaction",1,a,!1);A("Firebase.transaction",2,b,!0);if(p(c)&&"boolean"!=typeof c)throw Error(Db("Firebase.transaction",3,!0)+"must be a boolean.");if(".length"===this.getKey()||".keys"===this.getKey())throw"Firebase.transaction failed: "+this.getKey()+" is a read-only object.";"undefined"===typeof c&&(c=!0);var d=new Hb;ga(b)&&Jb(d.sa);ei(this.u,this.path,a,function(a,c,
	h){a?d.reject(a):d.resolve(new Pb(c,h));ga(b)&&b(a,c,h)},c);return d.sa};g.vg=function(a,b){y("Firebase.setPriority",1,2,arguments.length);Mf("Firebase.setPriority",this.path);If("Firebase.setPriority",1,a);A("Firebase.setPriority",2,b,!0);var c=new Hb;this.u.Kb(this.path.k(".priority"),a,null,Ib(c,b));return c.sa};
	g.push=function(a,b){y("Firebase.push",0,2,arguments.length);Mf("Firebase.push",this.path);Ef("Firebase.push",a,this.path,!0);A("Firebase.push",2,b,!0);var c=Zh(this.u),d=Uf(c),c=this.k(d);if(null!=a){var e=this,f=c.set(a,b).then(function(){return e.k(d)});c.then=r(f.then,f);c["catch"]=r(f.then,f,void 0);ga(b)&&Jb(f)}return c};g.kb=function(){Mf("Firebase.onDisconnect",this.path);return new V(this.u,this.path)};U.prototype.child=U.prototype.k;U.prototype.set=U.prototype.set;U.prototype.update=U.prototype.update;
	U.prototype.setWithPriority=U.prototype.Kb;U.prototype.remove=U.prototype.remove;U.prototype.transaction=U.prototype.transaction;U.prototype.setPriority=U.prototype.vg;U.prototype.push=U.prototype.push;U.prototype.onDisconnect=U.prototype.kb;kd(U.prototype,"database",U.prototype.Pf);kd(U.prototype,"key",U.prototype.getKey);kd(U.prototype,"parent",U.prototype.getParent);kd(U.prototype,"root",U.prototype.Zf);if("undefined"===typeof firebase)throw Error("Cannot install Firebase Database - be sure to load firebase-app.js first.");
	try{firebase.INTERNAL.registerService("database",function(a){var b=yf.Wb(),c=a.options.databaseURL;p(c)||$c("Can't determine Firebase Database URL.  Be sure to include databaseURL option when calling firebase.intializeApp().");var d=ad(c),c=d.kc;xf("Invalid Firebase Database URL",d);d.path.e()||$c("Database URL must point to the root of a Firebase Database (not including a child path).");(d=x(b.nb,a.name))&&$c("FIREBASE INTERNAL ERROR: Database initialized multiple times.");d=new tf(c,b.Ff,a);b.nb[a.name]=
	d;return d.$a},{Reference:U,Query:X,Database:sf,enableLogging:Xc,INTERNAL:Y,TEST_ACCESS:Z,ServerValue:vf})}catch(ni){$c("Failed to register the Firebase Database Service ("+ni+")")};})();
	
	module.exports = firebase.database;


/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	var firebase = __webpack_require__(15);
	/*! @license Firebase v3.5.2
	    Build: 3.5.2-rc.1
	    Terms: https://developers.google.com/terms */
	(function() {var k,aa=aa||{},l=this,n=function(a){return void 0!==a},ba=function(){},ca=function(){throw Error("unimplemented abstract method");},p=function(a){var b=typeof a;if("object"==b)if(a){if(a instanceof Array)return"array";if(a instanceof Object)return b;var c=Object.prototype.toString.call(a);if("[object Window]"==c)return"object";if("[object Array]"==c||"number"==typeof a.length&&"undefined"!=typeof a.splice&&"undefined"!=typeof a.propertyIsEnumerable&&!a.propertyIsEnumerable("splice"))return"array";
	if("[object Function]"==c||"undefined"!=typeof a.call&&"undefined"!=typeof a.propertyIsEnumerable&&!a.propertyIsEnumerable("call"))return"function"}else return"null";else if("function"==b&&"undefined"==typeof a.call)return"object";return b},da=function(a){var b=p(a);return"array"==b||"object"==b&&"number"==typeof a.length},r=function(a){return"string"==typeof a},t=function(a){return"function"==p(a)},ea=function(a){var b=typeof a;return"object"==b&&null!=a||"function"==b},fa="closure_uid_"+(1E9*Math.random()>>>
	0),ga=0,ha=function(a,b,c){return a.call.apply(a.bind,arguments)},ia=function(a,b,c){if(!a)throw Error();if(2<arguments.length){var d=Array.prototype.slice.call(arguments,2);return function(){var c=Array.prototype.slice.call(arguments);Array.prototype.unshift.apply(c,d);return a.apply(b,c)}}return function(){return a.apply(b,arguments)}},u=function(a,b,c){u=Function.prototype.bind&&-1!=Function.prototype.bind.toString().indexOf("native code")?ha:ia;return u.apply(null,arguments)},ja=Date.now||function(){return+new Date},
	v=function(a,b){function c(){}c.prototype=b.prototype;a.I=b.prototype;a.prototype=new c;a.Ka=function(a,c,f){for(var d=Array(arguments.length-2),e=2;e<arguments.length;e++)d[e-2]=arguments[e];return b.prototype[c].apply(a,d)}};var ka=function(a,b,c){function d(){P||(P=!0,b.apply(null,arguments))}function e(b){m=setTimeout(function(){m=null;a(f,2===Q)},b)}function f(a,b){if(!P)if(a)d.apply(null,arguments);else if(2===Q||q)d.apply(null,arguments);else{64>h&&(h*=2);var c;1===Q?(Q=2,c=0):c=1E3*(h+Math.random());e(c)}}function g(a){jc||(jc=!0,P||(null!==m?(a||(Q=2),clearTimeout(m),e(0)):a||(Q=1)))}var h=1,m=null,q=!1,Q=0,P=!1,jc=!1;e(0);setTimeout(function(){q=!0;g(!0)},c);return g};var la="https://firebasestorage.googleapis.com";var w=function(a,b){this.code="storage/"+a;this.message="Firebase Storage: "+b;this.serverResponse=null;this.name="FirebaseError"};v(w,Error);
	var ma=function(){return new w("unknown","An unknown error occurred, please check the error payload for server response.")},na=function(){return new w("canceled","User canceled the upload/download.")},oa=function(){return new w("cannot-slice-blob","Cannot slice blob for upload. Please retry the upload.")},pa=function(a,b,c){return new w("invalid-argument","Invalid argument in `"+b+"` at index "+a+": "+c)},qa=function(){return new w("app-deleted","The Firebase app was deleted.")},ra=function(a,b){return new w("invalid-format",
	"String does not match format '"+a+"': "+b)};var sa=function(a,b){for(var c in a)Object.prototype.hasOwnProperty.call(a,c)&&b(c,a[c])},ta=function(a){var b={};sa(a,function(a,d){b[a]=d});return b};var x=function(a,b,c,d){this.i=a;this.b={};this.method=b;this.headers={};this.body="";this.M=c;this.c=this.a=null;this.f=[200];this.h=[];this.timeout=d;this.g=!0};var ua={STATE_CHANGED:"state_changed"},va={RUNNING:"running",PAUSED:"paused",SUCCESS:"success",CANCELED:"canceled",ERROR:"error"},wa=function(a){switch(a){case "running":case "pausing":case "canceling":return"running";case "paused":return"paused";case "success":return"success";case "canceled":return"canceled";case "error":return"error";default:return"error"}};var y=function(a){return n(a)&&null!==a},xa=function(a){return"string"===typeof a||a instanceof String},ya=function(){return"undefined"!==typeof Blob};var za=function(a,b,c){this.f=c;this.c=a;this.g=b;this.b=0;this.a=null};za.prototype.get=function(){var a;0<this.b?(this.b--,a=this.a,this.a=a.next,a.next=null):a=this.c();return a};var Aa=function(a,b){a.g(b);a.b<a.f&&(a.b++,b.next=a.a,a.a=b)};var z=function(a){if(Error.captureStackTrace)Error.captureStackTrace(this,z);else{var b=Error().stack;b&&(this.stack=b)}a&&(this.message=String(a))};v(z,Error);z.prototype.name="CustomError";var Ba=function(a,b,c,d,e){this.reset(a,b,c,d,e)};Ba.prototype.a=null;var Ca=0;Ba.prototype.reset=function(a,b,c,d,e){"number"==typeof e||Ca++;d||ja();this.b=b;delete this.a};var Da=function(a){var b=[],c=0,d;for(d in a)b[c++]=a[d];return b},Ea=function(a){var b=[],c=0,d;for(d in a)b[c++]=d;return b},Fa="constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(" "),Ga=function(a,b){for(var c,d,e=1;e<arguments.length;e++){d=arguments[e];for(c in d)a[c]=d[c];for(var f=0;f<Fa.length;f++)c=Fa[f],Object.prototype.hasOwnProperty.call(d,c)&&(a[c]=d[c])}};var Ha=function(a){a.prototype.then=a.prototype.then;a.prototype.$goog_Thenable=!0},Ia=function(a){if(!a)return!1;try{return!!a.$goog_Thenable}catch(b){return!1}};var Ja=function(a){Ja[" "](a);return a};Ja[" "]=ba;var La=function(a,b){var c=Ka;return Object.prototype.hasOwnProperty.call(c,a)?c[a]:c[a]=b(a)};var Ma=function(a,b){for(var c=a.split("%s"),d="",e=Array.prototype.slice.call(arguments,1);e.length&&1<c.length;)d+=c.shift()+e.shift();return d+c.join("%s")},Na=String.prototype.trim?function(a){return a.trim()}:function(a){return a.replace(/^[\s\xa0]+|[\s\xa0]+$/g,"")},Oa=function(a,b){return a<b?-1:a>b?1:0};var Pa=function(a,b){this.a=a;this.b=b};var Qa=function(a,b){this.bucket=a;this.path=b},Ra=function(a){var b=encodeURIComponent;return"/b/"+b(a.bucket)+"/o/"+b(a.path)},Sa=function(a){for(var b=null,c=[{ia:/^gs:\/\/([A-Za-z0-9.\-]+)(\/(.*))?$/i,ba:{bucket:1,path:3},ha:function(a){"/"===a.path.charAt(a.path.length-1)&&(a.path=a.path.slice(0,-1))}},{ia:/^https?:\/\/firebasestorage\.googleapis\.com\/v[A-Za-z0-9_]+\/b\/([A-Za-z0-9.\-]+)\/o(\/([^?#]*).*)?$/i,ba:{bucket:1,path:3},ha:function(a){a.path=decodeURIComponent(a.path)}}],d=0;d<c.length;d++){var e=
	c[d],f=e.ia.exec(a);if(f){b=f[e.ba.bucket];(f=f[e.ba.path])||(f="");b=new Qa(b,f);e.ha(b);break}}if(null==b)throw new w("invalid-url","Invalid URL '"+a+"'.");return b};var Ta=function(a,b,c){t(a)||y(b)||y(c)?(this.next=a,this.a=b||null,this.b=c||null):(this.next=a.next||null,this.a=a.error||null,this.b=a.complete||null)};var Ua={RAW:"raw",BASE64:"base64",BASE64URL:"base64url",DATA_URL:"data_url"},Va=function(a){switch(a){case "raw":case "base64":case "base64url":case "data_url":break;default:throw"Expected one of the event types: [raw, base64, base64url, data_url].";}},Wa=function(a,b){this.data=a;this.a=b||null},$a=function(a,b){switch(a){case "raw":return new Wa(Xa(b));case "base64":case "base64url":return new Wa(Ya(a,b));case "data_url":return a=new Za(b),a=a.a?Ya("base64",a.c):Xa(a.c),new Wa(a,(new Za(b)).b)}throw ma();
	},Xa=function(a){for(var b=[],c=0;c<a.length;c++){var d=a.charCodeAt(c);if(127>=d)b.push(d);else if(2047>=d)b.push(192|d>>6,128|d&63);else if(55296==(d&64512))if(c<a.length-1&&56320==(a.charCodeAt(c+1)&64512)){var e=a.charCodeAt(++c),d=65536|(d&1023)<<10|e&1023;b.push(240|d>>18,128|d>>12&63,128|d>>6&63,128|d&63)}else b.push(239,191,189);else 56320==(d&64512)?b.push(239,191,189):b.push(224|d>>12,128|d>>6&63,128|d&63)}return new Uint8Array(b)},Ya=function(a,b){switch(a){case "base64":var c=-1!==b.indexOf("-"),
	d=-1!==b.indexOf("_");if(c||d)throw ra(a,"Invalid character '"+(c?"-":"_")+"' found: is it base64url encoded?");break;case "base64url":c=-1!==b.indexOf("+");d=-1!==b.indexOf("/");if(c||d)throw ra(a,"Invalid character '"+(c?"+":"/")+"' found: is it base64 encoded?");b=b.replace(/-/g,"+").replace(/_/g,"/")}var e;try{e=atob(b)}catch(f){throw ra(a,"Invalid character found");}a=new Uint8Array(e.length);for(b=0;b<e.length;b++)a[b]=e.charCodeAt(b);return a},Za=function(a){var b=a.match(/^data:([^,]+)?,/);
	if(null===b)throw ra("data_url","Must be formatted 'data:[<mediatype>][;base64],<data>");b=b[1]||null;this.a=!1;this.b=null;if(null!=b){var c=b.length-7;this.b=(this.a=0<=c&&b.indexOf(";base64",c)==c)?b.substring(0,b.length-7):b}this.c=a.substring(a.indexOf(",")+1)};var ab=function(a){var b=encodeURIComponent,c="?";sa(a,function(a,e){a=b(a)+"="+b(e);c=c+a+"&"});return c=c.slice(0,-1)};var A=function(a,b,c,d,e,f){this.b=a;this.h=b;this.f=c;this.a=d;this.g=e;this.c=f};k=A.prototype;k.na=function(){return this.b};k.Ja=function(){return this.h};k.Ga=function(){return this.f};k.Ba=function(){return this.a};k.pa=function(){if(y(this.a)){var a=this.a.downloadURLs;return y(a)&&y(a[0])?a[0]:null}return null};k.Ia=function(){return this.g};k.Ea=function(){return this.c};var bb=function(a,b){b.unshift(a);z.call(this,Ma.apply(null,b));b.shift()};v(bb,z);bb.prototype.name="AssertionError";
	var cb=function(a,b,c,d){var e="Assertion failed";if(c)var e=e+(": "+c),f=d;else a&&(e+=": "+a,f=b);throw new bb(""+e,f||[]);},B=function(a,b,c){a||cb("",null,b,Array.prototype.slice.call(arguments,2))},db=function(a,b){throw new bb("Failure"+(a?": "+a:""),Array.prototype.slice.call(arguments,1));},eb=function(a,b,c){t(a)||cb("Expected function but got %s: %s.",[p(a),a],b,Array.prototype.slice.call(arguments,2))};var fb=function(){this.g=this.g;this.o=this.o};fb.prototype.g=!1;fb.prototype.ea=function(){this.g||(this.g=!0,this.D())};fb.prototype.D=function(){if(this.o)for(;this.o.length;)this.o.shift()()};var gb="closure_listenable_"+(1E6*Math.random()|0),hb=0;var ib;a:{var jb=l.navigator;if(jb){var kb=jb.userAgent;if(kb){ib=kb;break a}}ib=""}var C=function(a){return-1!=ib.indexOf(a)};var lb=function(){};lb.prototype.b=null;lb.prototype.a=ca;var mb=function(a){return a.b||(a.b=a.f())};lb.prototype.f=ca;var nb=Array.prototype.indexOf?function(a,b,c){B(null!=a.length);return Array.prototype.indexOf.call(a,b,c)}:function(a,b,c){c=null==c?0:0>c?Math.max(0,a.length+c):c;if(r(a))return r(b)&&1==b.length?a.indexOf(b,c):-1;for(;c<a.length;c++)if(c in a&&a[c]===b)return c;return-1},ob=Array.prototype.forEach?function(a,b,c){B(null!=a.length);Array.prototype.forEach.call(a,b,c)}:function(a,b,c){for(var d=a.length,e=r(a)?a.split(""):a,f=0;f<d;f++)f in e&&b.call(c,e[f],f,a)},pb=Array.prototype.filter?function(a,
	b,c){B(null!=a.length);return Array.prototype.filter.call(a,b,c)}:function(a,b,c){for(var d=a.length,e=[],f=0,g=r(a)?a.split(""):a,h=0;h<d;h++)if(h in g){var m=g[h];b.call(c,m,h,a)&&(e[f++]=m)}return e},qb=Array.prototype.map?function(a,b,c){B(null!=a.length);return Array.prototype.map.call(a,b,c)}:function(a,b,c){for(var d=a.length,e=Array(d),f=r(a)?a.split(""):a,g=0;g<d;g++)g in f&&(e[g]=b.call(c,f[g],g,a));return e},rb=Array.prototype.some?function(a,b,c){B(null!=a.length);return Array.prototype.some.call(a,
	b,c)}:function(a,b,c){for(var d=a.length,e=r(a)?a.split(""):a,f=0;f<d;f++)if(f in e&&b.call(c,e[f],f,a))return!0;return!1},tb=function(a){var b;a:{b=sb;for(var c=a.length,d=r(a)?a.split(""):a,e=0;e<c;e++)if(e in d&&b.call(void 0,d[e],e,a)){b=e;break a}b=-1}return 0>b?null:r(a)?a.charAt(b):a[b]},ub=function(a,b){return 0<=nb(a,b)},vb=function(a){if("array"!=p(a))for(var b=a.length-1;0<=b;b--)delete a[b];a.length=0},wb=function(a,b){b=nb(a,b);var c;if(c=0<=b)B(null!=a.length),Array.prototype.splice.call(a,
	b,1);return c},xb=function(a){var b=a.length;if(0<b){for(var c=Array(b),d=0;d<b;d++)c[d]=a[d];return c}return[]};var zb=new za(function(){return new yb},function(a){a.reset()},100),Bb=function(){var a=Ab,b=null;a.a&&(b=a.a,a.a=a.a.next,a.a||(a.b=null),b.next=null);return b},yb=function(){this.next=this.b=this.a=null};yb.prototype.set=function(a,b){this.a=a;this.b=b;this.next=null};yb.prototype.reset=function(){this.next=this.b=this.a=null};var Cb=function(a,b){this.type=a;this.a=this.target=b;this.ja=!0};Cb.prototype.b=function(){this.ja=!1};var Db=function(a,b,c,d,e){this.listener=a;this.a=null;this.src=b;this.type=c;this.U=!!d;this.M=e;++hb;this.N=this.T=!1},Eb=function(a){a.N=!0;a.listener=null;a.a=null;a.src=null;a.M=null};var Fb=/^(?:([^:/?#.]+):)?(?:\/\/(?:([^/?#]*)@)?([^/#?]*?)(?::([0-9]+))?(?=[/#?]|$))?([^?#]+)?(?:\?([^#]*))?(?:#([\s\S]*))?$/;var Gb=function(a,b){b=pb(b.split("/"),function(a){return 0<a.length}).join("/");return 0===a.length?b:a+"/"+b},Hb=function(a){var b=a.lastIndexOf("/",a.length-2);return-1===b?a:a.slice(b+1)};var Ib=function(a){this.src=a;this.a={};this.b=0},Kb=function(a,b,c,d,e,f){var g=b.toString();b=a.a[g];b||(b=a.a[g]=[],a.b++);var h=Jb(b,c,e,f);-1<h?(a=b[h],d||(a.T=!1)):(a=new Db(c,a.src,g,!!e,f),a.T=d,b.push(a));return a},Lb=function(a,b){var c=b.type;c in a.a&&wb(a.a[c],b)&&(Eb(b),0==a.a[c].length&&(delete a.a[c],a.b--))},Jb=function(a,b,c,d){for(var e=0;e<a.length;++e){var f=a[e];if(!f.N&&f.listener==b&&f.U==!!c&&f.M==d)return e}return-1};var Mb,Nb=function(){};v(Nb,lb);Nb.prototype.a=function(){var a=Ob(this);return a?new ActiveXObject(a):new XMLHttpRequest};Nb.prototype.f=function(){var a={};Ob(this)&&(a[0]=!0,a[1]=!0);return a};
	var Ob=function(a){if(!a.c&&"undefined"==typeof XMLHttpRequest&&"undefined"!=typeof ActiveXObject){for(var b=["MSXML2.XMLHTTP.6.0","MSXML2.XMLHTTP.3.0","MSXML2.XMLHTTP","Microsoft.XMLHTTP"],c=0;c<b.length;c++){var d=b[c];try{return new ActiveXObject(d),a.c=d}catch(e){}}throw Error("Could not create ActiveXObject. ActiveX might be disabled, or MSXML might not be installed");}return a.c};Mb=new Nb;var Pb=function(a){this.a=[];if(a)a:{var b;if(a instanceof Pb){if(b=a.H(),a=a.A(),0>=this.b()){for(var c=this.a,d=0;d<b.length;d++)c.push(new Pa(b[d],a[d]));break a}}else b=Ea(a),a=Da(a);for(d=0;d<b.length;d++)Qb(this,b[d],a[d])}},Qb=function(a,b,c){var d=a.a;d.push(new Pa(b,c));b=d.length-1;a=a.a;for(c=a[b];0<b;)if(d=b-1>>1,a[d].a>c.a)a[b]=a[d],b=d;else break;a[b]=c};Pb.prototype.A=function(){for(var a=this.a,b=[],c=a.length,d=0;d<c;d++)b.push(a[d].b);return b};
	Pb.prototype.H=function(){for(var a=this.a,b=[],c=a.length,d=0;d<c;d++)b.push(a[d].a);return b};Pb.prototype.b=function(){return this.a.length};var Rb=function(){this.c=[];this.a=[]},Sb=function(a){0==a.c.length&&(a.c=a.a,a.c.reverse(),a.a=[]);return a.c.pop()};Rb.prototype.b=function(){return this.c.length+this.a.length};Rb.prototype.A=function(){for(var a=[],b=this.c.length-1;0<=b;--b)a.push(this.c[b]);for(var c=this.a.length,b=0;b<c;++b)a.push(this.a[b]);return a};var Tb=function(a){if(a.A&&"function"==typeof a.A)return a.A();if(r(a))return a.split("");if(da(a)){for(var b=[],c=a.length,d=0;d<c;d++)b.push(a[d]);return b}return Da(a)},Ub=function(a,b){if(a.forEach&&"function"==typeof a.forEach)a.forEach(b,void 0);else if(da(a)||r(a))ob(a,b,void 0);else{var c;if(a.H&&"function"==typeof a.H)c=a.H();else if(a.A&&"function"==typeof a.A)c=void 0;else if(da(a)||r(a)){c=[];for(var d=a.length,e=0;e<d;e++)c.push(e)}else c=Ea(a);for(var d=Tb(a),e=d.length,f=0;f<e;f++)b.call(void 0,
	d[f],c&&c[f],a)}};var Vb=function(a){l.setTimeout(function(){throw a;},0)},Wb,Xb=function(){var a=l.MessageChannel;"undefined"===typeof a&&"undefined"!==typeof window&&window.postMessage&&window.addEventListener&&!C("Presto")&&(a=function(){var a=document.createElement("IFRAME");a.style.display="none";a.src="";document.documentElement.appendChild(a);var b=a.contentWindow,a=b.document;a.open();a.write("");a.close();var c="callImmediate"+Math.random(),d="file:"==b.location.protocol?"*":b.location.protocol+"//"+b.location.host,
	a=u(function(a){if(("*"==d||a.origin==d)&&a.data==c)this.port1.onmessage()},this);b.addEventListener("message",a,!1);this.port1={};this.port2={postMessage:function(){b.postMessage(c,d)}}});if("undefined"!==typeof a&&!C("Trident")&&!C("MSIE")){var b=new a,c={},d=c;b.port1.onmessage=function(){if(n(c.next)){c=c.next;var a=c.da;c.da=null;a()}};return function(a){d.next={da:a};d=d.next;b.port2.postMessage(0)}}return"undefined"!==typeof document&&"onreadystatechange"in document.createElement("SCRIPT")?
	function(a){var b=document.createElement("SCRIPT");b.onreadystatechange=function(){b.onreadystatechange=null;b.parentNode.removeChild(b);b=null;a();a=null};document.documentElement.appendChild(b)}:function(a){l.setTimeout(a,0)}};var Yb="StopIteration"in l?l.StopIteration:{message:"StopIteration",stack:""},Zb=function(){};Zb.prototype.next=function(){throw Yb;};Zb.prototype.h=function(){return this};var $b=function(){Pb.call(this)};v($b,Pb);var ac=C("Opera"),D=C("Trident")||C("MSIE"),bc=C("Edge"),cc=C("Gecko")&&!(-1!=ib.toLowerCase().indexOf("webkit")&&!C("Edge"))&&!(C("Trident")||C("MSIE"))&&!C("Edge"),dc=-1!=ib.toLowerCase().indexOf("webkit")&&!C("Edge"),ec=function(){var a=l.document;return a?a.documentMode:void 0},fc;
	a:{var gc="",hc=function(){var a=ib;if(cc)return/rv\:([^\);]+)(\)|;)/.exec(a);if(bc)return/Edge\/([\d\.]+)/.exec(a);if(D)return/\b(?:MSIE|rv)[: ]([^\);]+)(\)|;)/.exec(a);if(dc)return/WebKit\/(\S+)/.exec(a);if(ac)return/(?:Version)[ \/]?(\S+)/.exec(a)}();hc&&(gc=hc?hc[1]:"");if(D){var ic=ec();if(null!=ic&&ic>parseFloat(gc)){fc=String(ic);break a}}fc=gc}
	var kc=fc,Ka={},E=function(a){return La(a,function(){for(var b=0,c=Na(String(kc)).split("."),d=Na(String(a)).split("."),e=Math.max(c.length,d.length),f=0;0==b&&f<e;f++){var g=c[f]||"",h=d[f]||"";do{g=/(\d*)(\D*)(.*)/.exec(g)||["","","",""];h=/(\d*)(\D*)(.*)/.exec(h)||["","","",""];if(0==g[0].length&&0==h[0].length)break;b=Oa(0==g[1].length?0:parseInt(g[1],10),0==h[1].length?0:parseInt(h[1],10))||Oa(0==g[2].length,0==h[2].length)||Oa(g[2],h[2]);g=g[3];h=h[3]}while(0==b)}return 0<=b})},lc;var mc=l.document;
	lc=mc&&D?ec()||("CSS1Compat"==mc.compatMode?parseInt(kc,10):5):void 0;var qc=function(a,b){nc||oc();pc||(nc(),pc=!0);var c=Ab,d=zb.get();d.set(a,b);c.b?c.b.next=d:(B(!c.a),c.a=d);c.b=d},nc,oc=function(){var a=l.Promise;if(-1!=String(a).indexOf("[native code]")){var b=a.resolve(void 0);nc=function(){b.then(rc)}}else nc=function(){var a=rc;!t(l.setImmediate)||l.Window&&l.Window.prototype&&!C("Edge")&&l.Window.prototype.setImmediate==l.setImmediate?(Wb||(Wb=Xb()),Wb(a)):l.setImmediate(a)}},pc=!1,Ab=new function(){this.b=this.a=null},rc=function(){for(var a;a=Bb();){try{a.a.call(a.b)}catch(b){Vb(b)}Aa(zb,
	a)}pc=!1};var sc;(sc=!D)||(sc=9<=Number(lc));var tc=sc,uc=D&&!E("9");!dc||E("528");cc&&E("1.9b")||D&&E("8")||ac&&E("9.5")||dc&&E("528");cc&&!E("8")||D&&E("9");var F=function(a,b){this.c={};this.a=[];this.g=this.f=0;var c=arguments.length;if(1<c){if(c%2)throw Error("Uneven number of arguments");for(var d=0;d<c;d+=2)this.set(arguments[d],arguments[d+1])}else if(a){a instanceof F?(c=a.H(),d=a.A()):(c=Ea(a),d=Da(a));for(var e=0;e<c.length;e++)this.set(c[e],d[e])}};F.prototype.b=function(){return this.f};F.prototype.A=function(){vc(this);for(var a=[],b=0;b<this.a.length;b++)a.push(this.c[this.a[b]]);return a};F.prototype.H=function(){vc(this);return this.a.concat()};
	var wc=function(a,b){return Object.prototype.hasOwnProperty.call(a.c,b)?(delete a.c[b],a.f--,a.g++,a.a.length>2*a.f&&vc(a),!0):!1},vc=function(a){if(a.f!=a.a.length){for(var b=0,c=0;b<a.a.length;){var d=a.a[b];Object.prototype.hasOwnProperty.call(a.c,d)&&(a.a[c++]=d);b++}a.a.length=c}if(a.f!=a.a.length){for(var e={},c=b=0;b<a.a.length;)d=a.a[b],Object.prototype.hasOwnProperty.call(e,d)||(a.a[c++]=d,e[d]=1),b++;a.a.length=c}};
	F.prototype.get=function(a,b){return Object.prototype.hasOwnProperty.call(this.c,a)?this.c[a]:b};F.prototype.set=function(a,b){Object.prototype.hasOwnProperty.call(this.c,a)||(this.f++,this.a.push(a),this.g++);this.c[a]=b};F.prototype.forEach=function(a,b){for(var c=this.H(),d=0;d<c.length;d++){var e=c[d],f=this.get(e);a.call(b,f,e,this)}};
	F.prototype.h=function(a){vc(this);var b=0,c=this.g,d=this,e=new Zb;e.next=function(){if(c!=d.g)throw Error("The map has changed since the iterator was created");if(b>=d.a.length)throw Yb;var e=d.a[b++];return a?e:d.c[e]};return e};var xc=function(a,b){Cb.call(this,a?a.type:"");this.c=this.a=this.target=null;if(a){this.type=a.type;this.target=a.target||a.srcElement;this.a=b;if((b=a.relatedTarget)&&cc)try{Ja(b.nodeName)}catch(c){}this.c=a;a.defaultPrevented&&this.b()}};v(xc,Cb);xc.prototype.b=function(){xc.I.b.call(this);var a=this.c;if(a.preventDefault)a.preventDefault();else if(a.returnValue=!1,uc)try{if(a.ctrlKey||112<=a.keyCode&&123>=a.keyCode)a.keyCode=-1}catch(b){}};var G=function(a,b){this.a=0;this.i=void 0;this.f=this.b=this.c=null;this.g=this.h=!1;if(a!=ba)try{var c=this;a.call(b,function(a){yc(c,2,a)},function(a){if(!(a instanceof zc))try{if(a instanceof Error)throw a;throw Error("Promise rejected.");}catch(e){}yc(c,3,a)})}catch(d){yc(this,3,d)}},Ac=function(){this.next=this.f=this.c=this.b=this.a=null;this.g=!1};Ac.prototype.reset=function(){this.f=this.c=this.b=this.a=null;this.g=!1};
	var Bc=new za(function(){return new Ac},function(a){a.reset()},100),Cc=function(a,b,c){var d=Bc.get();d.b=a;d.c=b;d.f=c;return d},Dc=function(a){if(a instanceof G)return a;var b=new G(ba);yc(b,2,a);return b},Ec=function(a){return new G(function(b,c){c(a)})};
	G.prototype.then=function(a,b,c){null!=a&&eb(a,"opt_onFulfilled should be a function.");null!=b&&eb(b,"opt_onRejected should be a function. Did you pass opt_context as the second argument instead of the third?");return Fc(this,t(a)?a:null,t(b)?b:null,c)};Ha(G);G.prototype.l=function(a,b){return Fc(this,null,a,b)};G.prototype.cancel=function(a){0==this.a&&qc(function(){var b=new zc(a);Gc(this,b)},this)};
	var Gc=function(a,b){if(0==a.a)if(a.c){var c=a.c;if(c.b){for(var d=0,e=null,f=null,g=c.b;g&&(g.g||(d++,g.a==a&&(e=g),!(e&&1<d)));g=g.next)e||(f=g);e&&(0==c.a&&1==d?Gc(c,b):(f?(d=f,B(c.b),B(null!=d),d.next==c.f&&(c.f=d),d.next=d.next.next):Hc(c),Ic(c,e,3,b)))}a.c=null}else yc(a,3,b)},Kc=function(a,b){a.b||2!=a.a&&3!=a.a||Jc(a);B(null!=b.b);a.f?a.f.next=b:a.b=b;a.f=b},Fc=function(a,b,c,d){var e=Cc(null,null,null);e.a=new G(function(a,g){e.b=b?function(c){try{var e=b.call(d,c);a(e)}catch(q){g(q)}}:a;
	e.c=c?function(b){try{var e=c.call(d,b);!n(e)&&b instanceof zc?g(b):a(e)}catch(q){g(q)}}:g});e.a.c=a;Kc(a,e);return e.a};G.prototype.o=function(a){B(1==this.a);this.a=0;yc(this,2,a)};G.prototype.m=function(a){B(1==this.a);this.a=0;yc(this,3,a)};
	var yc=function(a,b,c){if(0==a.a){a===c&&(b=3,c=new TypeError("Promise cannot resolve to itself"));a.a=1;var d;a:{var e=c,f=a.o,g=a.m;if(e instanceof G)null!=f&&eb(f,"opt_onFulfilled should be a function."),null!=g&&eb(g,"opt_onRejected should be a function. Did you pass opt_context as the second argument instead of the third?"),Kc(e,Cc(f||ba,g||null,a)),d=!0;else if(Ia(e))e.then(f,g,a),d=!0;else{if(ea(e))try{var h=e.then;if(t(h)){Lc(e,h,f,g,a);d=!0;break a}}catch(m){g.call(a,m);d=!0;break a}d=!1}}d||
	(a.i=c,a.a=b,a.c=null,Jc(a),3!=b||c instanceof zc||Mc(a,c))}},Lc=function(a,b,c,d,e){var f=!1,g=function(a){f||(f=!0,c.call(e,a))},h=function(a){f||(f=!0,d.call(e,a))};try{b.call(a,g,h)}catch(m){h(m)}},Jc=function(a){a.h||(a.h=!0,qc(a.j,a))},Hc=function(a){var b=null;a.b&&(b=a.b,a.b=b.next,b.next=null);a.b||(a.f=null);null!=b&&B(null!=b.b);return b};G.prototype.j=function(){for(var a;a=Hc(this);)Ic(this,a,this.a,this.i);this.h=!1};
	var Ic=function(a,b,c,d){if(3==c&&b.c&&!b.g)for(;a&&a.g;a=a.c)a.g=!1;if(b.a)b.a.c=null,Nc(b,c,d);else try{b.g?b.b.call(b.f):Nc(b,c,d)}catch(e){Oc.call(null,e)}Aa(Bc,b)},Nc=function(a,b,c){2==b?a.b.call(a.f,c):a.c&&a.c.call(a.f,c)},Mc=function(a,b){a.g=!0;qc(function(){a.g&&Oc.call(null,b)})},Oc=Vb,zc=function(a){z.call(this,a)};v(zc,z);zc.prototype.name="cancel";var Qc=function(a){this.a=new F;if(a){a=Tb(a);for(var b=a.length,c=0;c<b;c++){var d=a[c];this.a.set(Pc(d),d)}}},Pc=function(a){var b=typeof a;return"object"==b&&a||"function"==b?"o"+(a[fa]||(a[fa]=++ga)):b.substr(0,1)+a};Qc.prototype.b=function(){return this.a.b()};Qc.prototype.A=function(){return this.a.A()};Qc.prototype.h=function(){return this.a.h(!1)};var Rc=function(a){return function(){var b=[];Array.prototype.push.apply(b,arguments);Dc(!0).then(function(){a.apply(null,b)})}};var Sc="closure_lm_"+(1E6*Math.random()|0),Tc={},Uc=0,Vc=function(a,b,c,d,e){if("array"==p(b)){for(var f=0;f<b.length;f++)Vc(a,b[f],c,d,e);return null}c=Wc(c);a&&a[gb]?(Xc(a),a=Kb(a.b,String(b),c,!1,d,e)):a=Yc(a,b,c,!1,d,e);return a},Yc=function(a,b,c,d,e,f){if(!b)throw Error("Invalid event type");var g=!!e,h=Zc(a);h||(a[Sc]=h=new Ib(a));c=Kb(h,b,c,d,e,f);if(c.a)return c;d=$c();c.a=d;d.src=a;d.listener=c;if(a.addEventListener)a.addEventListener(b.toString(),d,g);else if(a.attachEvent)a.attachEvent(ad(b.toString()),
	d);else throw Error("addEventListener and attachEvent are unavailable.");Uc++;return c},$c=function(){var a=bd,b=tc?function(c){return a.call(b.src,b.listener,c)}:function(c){c=a.call(b.src,b.listener,c);if(!c)return c};return b},cd=function(a,b,c,d,e){if("array"==p(b))for(var f=0;f<b.length;f++)cd(a,b[f],c,d,e);else c=Wc(c),a&&a[gb]?Kb(a.b,String(b),c,!0,d,e):Yc(a,b,c,!0,d,e)},dd=function(a,b,c,d,e){if("array"==p(b))for(var f=0;f<b.length;f++)dd(a,b[f],c,d,e);else(c=Wc(c),a&&a[gb])?(a=a.b,b=String(b).toString(),
	b in a.a&&(f=a.a[b],c=Jb(f,c,d,e),-1<c&&(Eb(f[c]),B(null!=f.length),Array.prototype.splice.call(f,c,1),0==f.length&&(delete a.a[b],a.b--)))):a&&(a=Zc(a))&&(b=a.a[b.toString()],a=-1,b&&(a=Jb(b,c,!!d,e)),(c=-1<a?b[a]:null)&&ed(c))},ed=function(a){if("number"!=typeof a&&a&&!a.N){var b=a.src;if(b&&b[gb])Lb(b.b,a);else{var c=a.type,d=a.a;b.removeEventListener?b.removeEventListener(c,d,a.U):b.detachEvent&&b.detachEvent(ad(c),d);Uc--;(c=Zc(b))?(Lb(c,a),0==c.b&&(c.src=null,b[Sc]=null)):Eb(a)}}},ad=function(a){return a in
	Tc?Tc[a]:Tc[a]="on"+a},gd=function(a,b,c,d){var e=!0;if(a=Zc(a))if(b=a.a[b.toString()])for(b=b.concat(),a=0;a<b.length;a++){var f=b[a];f&&f.U==c&&!f.N&&(f=fd(f,d),e=e&&!1!==f)}return e},fd=function(a,b){var c=a.listener,d=a.M||a.src;a.T&&ed(a);return c.call(d,b)},bd=function(a,b){if(a.N)return!0;if(!tc){if(!b)a:{b=["window","event"];for(var c=l,d;d=b.shift();)if(null!=c[d])c=c[d];else{b=null;break a}b=c}d=b;b=new xc(d,this);c=!0;if(!(0>d.keyCode||void 0!=d.returnValue)){a:{var e=!1;if(0==d.keyCode)try{d.keyCode=
	-1;break a}catch(g){e=!0}if(e||void 0==d.returnValue)d.returnValue=!0}d=[];for(e=b.a;e;e=e.parentNode)d.push(e);a=a.type;for(e=d.length-1;0<=e;e--){b.a=d[e];var f=gd(d[e],a,!0,b),c=c&&f}for(e=0;e<d.length;e++)b.a=d[e],f=gd(d[e],a,!1,b),c=c&&f}return c}return fd(a,new xc(b,this))},Zc=function(a){a=a[Sc];return a instanceof Ib?a:null},hd="__closure_events_fn_"+(1E9*Math.random()>>>0),Wc=function(a){B(a,"Listener can not be null.");if(t(a))return a;B(a.handleEvent,"An object listener must have handleEvent method.");
	a[hd]||(a[hd]=function(b){return a.handleEvent(b)});return a[hd]};var H=function(a,b){fb.call(this);this.m=a||0;this.f=b||10;if(this.m>this.f)throw Error("[goog.structs.Pool] Min can not be greater than max");this.a=new Rb;this.c=new Qc;this.j=null;this.S()};v(H,fb);H.prototype.W=function(){var a=ja();if(!(null!=this.j&&0>a-this.j)){for(var b;0<this.a.b()&&(b=Sb(this.a),!this.l(b));)this.S();!b&&this.b()<this.f&&(b=this.i());b&&(this.j=a,this.c.a.set(Pc(b),b));return b}};var jd=function(a){var b=id;wc(b.c.a,Pc(a))&&b.$(a)};
	H.prototype.$=function(a){wc(this.c.a,Pc(a));this.l(a)&&this.b()<this.f?this.a.a.push(a):kd(a)};H.prototype.S=function(){for(var a=this.a;this.b()<this.m;){var b=this.i();a.a.push(b)}for(;this.b()>this.f&&0<this.a.b();)kd(Sb(a))};H.prototype.i=function(){return{}};var kd=function(a){if("function"==typeof a.ea)a.ea();else for(var b in a)a[b]=null};H.prototype.l=function(a){return"function"==typeof a.oa?a.oa():!0};H.prototype.b=function(){return this.a.b()+this.c.b()};
	H.prototype.D=function(){H.I.D.call(this);if(0<this.c.b())throw Error("[goog.structs.Pool] Objects not released");delete this.c;for(var a=this.a;0!=a.c.length||0!=a.a.length;)kd(Sb(a));delete this.a};/*
	 Portions of this code are from MochiKit, received by
	 The Closure Authors under the MIT license. All other code is Copyright
	 2005-2009 The Closure Authors. All Rights Reserved.
	*/
	var ld=function(a,b){this.g=[];this.u=a;this.s=b||null;this.f=this.a=!1;this.b=void 0;this.l=this.o=this.i=!1;this.h=0;this.c=null;this.j=0};
	ld.prototype.cancel=function(a){if(this.a)this.b instanceof ld&&this.b.cancel();else{if(this.c){var b=this.c;delete this.c;a?b.cancel(a):(b.j--,0>=b.j&&b.cancel())}this.u?this.u.call(this.s,this):this.l=!0;if(!this.a){a=new md;if(this.a){if(!this.l)throw new nd;this.l=!1}B(!(a instanceof ld),"An execution sequence may not be initiated with a blocking Deferred.");this.a=!0;this.b=a;this.f=!0;od(this)}}};ld.prototype.m=function(a,b){this.i=!1;this.a=!0;this.b=b;this.f=!a;od(this)};
	var pd=function(a,b,c){B(!a.o,"Blocking Deferreds can not be re-used");a.g.push([b,c,void 0]);a.a&&od(a)};ld.prototype.then=function(a,b,c){var d,e,f=new G(function(a,b){d=a;e=b});pd(this,d,function(a){a instanceof md?f.cancel():e(a)});return f.then(a,b,c)};Ha(ld);
	var qd=function(a){return rb(a.g,function(a){return t(a[1])})},od=function(a){if(a.h&&a.a&&qd(a)){var b=a.h,c=rd[b];c&&(l.clearTimeout(c.a),delete rd[b]);a.h=0}a.c&&(a.c.j--,delete a.c);for(var b=a.b,d=c=!1;a.g.length&&!a.i;){var e=a.g.shift(),f=e[0],g=e[1],e=e[2];if(f=a.f?g:f)try{var h=f.call(e||a.s,b);n(h)&&(a.f=a.f&&(h==b||h instanceof Error),a.b=b=h);if(Ia(b)||"function"===typeof l.Promise&&b instanceof l.Promise)d=!0,a.i=!0}catch(m){b=m,a.f=!0,qd(a)||(c=!0)}}a.b=b;d&&(h=u(a.m,a,!0),d=u(a.m,a,
	!1),b instanceof ld?(pd(b,h,d),b.o=!0):b.then(h,d));c&&(b=new sd(b),rd[b.a]=b,a.h=b.a)},nd=function(){z.call(this)};v(nd,z);nd.prototype.message="Deferred has already fired";nd.prototype.name="AlreadyCalledError";var md=function(){z.call(this)};v(md,z);md.prototype.message="Deferred was canceled";md.prototype.name="CanceledError";var sd=function(a){this.a=l.setTimeout(u(this.c,this),0);this.b=a};
	sd.prototype.c=function(){B(rd[this.a],"Cannot throw an error that is not scheduled.");delete rd[this.a];throw this.b;};var rd={};var td=function(a){this.f=a;this.b=this.c=this.a=null},ud=function(a,b){this.name=a;this.value=b};ud.prototype.toString=function(){return this.name};var vd=new ud("SEVERE",1E3),wd=new ud("CONFIG",700),xd=new ud("FINE",500),yd=function(a){if(a.c)return a.c;if(a.a)return yd(a.a);db("Root logger has no level set.");return null};
	td.prototype.log=function(a,b,c){if(a.value>=yd(this).value)for(t(b)&&(b=b()),a=new Ba(a,String(b),this.f),c&&(a.a=c),c="log:"+a.b,l.console&&(l.console.timeStamp?l.console.timeStamp(c):l.console.markTimeline&&l.console.markTimeline(c)),l.msWriteProfilerMark&&l.msWriteProfilerMark(c),c=this;c;)c=c.a};
	var zd={},Ad=null,Bd=function(a){Ad||(Ad=new td(""),zd[""]=Ad,Ad.c=wd);var b;if(!(b=zd[a])){b=new td(a);var c=a.lastIndexOf("."),d=a.substr(c+1),c=Bd(a.substr(0,c));c.b||(c.b={});c.b[d]=b;b.a=c;zd[a]=b}return b};var Cd=function(){fb.call(this);this.b=new Ib(this);this.Y=this;this.G=null};v(Cd,fb);Cd.prototype[gb]=!0;Cd.prototype.removeEventListener=function(a,b,c,d){dd(this,a,b,c,d)};
	var I=function(a,b){Xc(a);var c,d=a.G;if(d){c=[];for(var e=1;d;d=d.G)c.push(d),B(1E3>++e,"infinite loop")}a=a.Y;d=b.type||b;r(b)?b=new Cb(b,a):b instanceof Cb?b.target=b.target||a:(e=b,b=new Cb(d,a),Ga(b,e));var e=!0,f;if(c)for(var g=c.length-1;0<=g;g--)f=b.a=c[g],e=Dd(f,d,!0,b)&&e;f=b.a=a;e=Dd(f,d,!0,b)&&e;e=Dd(f,d,!1,b)&&e;if(c)for(g=0;g<c.length;g++)f=b.a=c[g],e=Dd(f,d,!1,b)&&e};
	Cd.prototype.D=function(){Cd.I.D.call(this);if(this.b){var a=this.b,b=0,c;for(c in a.a){for(var d=a.a[c],e=0;e<d.length;e++)++b,Eb(d[e]);delete a.a[c];a.b--}}this.G=null};var Dd=function(a,b,c,d){b=a.b.a[String(b)];if(!b)return!0;b=b.concat();for(var e=!0,f=0;f<b.length;++f){var g=b[f];if(g&&!g.N&&g.U==c){var h=g.listener,m=g.M||g.src;g.T&&Lb(a.b,g);e=!1!==h.call(m,d)&&e}}return e&&0!=d.ja},Xc=function(a){B(a.b,"Event target is not initialized. Did you call the superclass (goog.events.EventTarget) constructor?")};var J=function(a,b){this.h=new $b;H.call(this,a,b)};v(J,H);k=J.prototype;k.W=function(a,b){if(!a)return J.I.W.call(this);Qb(this.h,n(b)?b:100,a);this.aa()};k.aa=function(){for(var a=this.h;0<a.b();){var b=this.W();if(b){var c;var d=a,e=d.a,f=e.length;c=e[0];if(0>=f)c=void 0;else{if(1==f)vb(e);else{e[0]=e.pop();for(var e=0,d=d.a,f=d.length,g=d[e];e<f>>1;){var h=2*e+1,m=2*e+2,h=m<f&&d[m].a<d[h].a?m:h;if(d[h].a>g.a)break;d[e]=d[h];e=h}d[e]=g}c=c.b}c.apply(this,[b])}else break}};
	k.$=function(a){J.I.$.call(this,a);this.aa()};k.S=function(){J.I.S.call(this);this.aa()};k.D=function(){J.I.D.call(this);l.clearTimeout(void 0);vb(this.h.a);this.h=null};var K=function(a,b){a&&a.log(xd,b,void 0)};var Ed=function(a,b,c){if(t(a))c&&(a=u(a,c));else if(a&&"function"==typeof a.handleEvent)a=u(a.handleEvent,a);else throw Error("Invalid listener argument");return 2147483647<Number(b)?-1:l.setTimeout(a,b||0)};var L=function(a){Cd.call(this);this.headers=new F;this.B=a||null;this.c=!1;this.u=this.a=null;this.L=this.l="";this.K=0;this.h="";this.f=this.C=this.j=this.F=!1;this.i=0;this.m=null;this.R="";this.s=this.ca=this.X=!1};v(L,Cd);var Fd=L.prototype,Gd=Bd("goog.net.XhrIo");Fd.w=Gd;var Hd=/^https?$/i,Id=["POST","PUT"];
	L.prototype.send=function(a,b,c,d){if(this.a)throw Error("[goog.net.XhrIo] Object is active with another request="+this.l+"; newUri="+a);b=b?b.toUpperCase():"GET";this.l=a;this.h="";this.K=0;this.L=b;this.F=!1;this.c=!0;this.a=this.B?this.B.a():Mb.a();this.u=this.B?mb(this.B):mb(Mb);this.a.onreadystatechange=u(this.P,this);this.ca&&"onprogress"in this.a&&(this.a.onprogress=u(function(a){this.O(a,!0)},this),this.a.upload&&(this.a.upload.onprogress=u(this.O,this)));try{K(this.w,M(this,"Opening Xhr")),
	this.C=!0,this.a.open(b,String(a),!0),this.C=!1}catch(f){K(this.w,M(this,"Error opening Xhr: "+f.message));Jd(this,f);return}a=c||"";var e=new F(this.headers);d&&Ub(d,function(a,b){e.set(b,a)});d=tb(e.H());c=l.FormData&&a instanceof l.FormData;!ub(Id,b)||d||c||e.set("Content-Type","application/x-www-form-urlencoded;charset=utf-8");e.forEach(function(a,b){this.a.setRequestHeader(b,a)},this);this.R&&(this.a.responseType=this.R);"withCredentials"in this.a&&this.a.withCredentials!==this.X&&(this.a.withCredentials=
	this.X);try{Kd(this),0<this.i&&(this.s=Ld(this.a),K(this.w,M(this,"Will abort after "+this.i+"ms if incomplete, xhr2 "+this.s)),this.s?(this.a.timeout=this.i,this.a.ontimeout=u(this.J,this)):this.m=Ed(this.J,this.i,this)),K(this.w,M(this,"Sending request")),this.j=!0,this.a.send(a),this.j=!1}catch(f){K(this.w,M(this,"Send error: "+f.message)),Jd(this,f)}};var Ld=function(a){return D&&E(9)&&"number"==typeof a.timeout&&n(a.ontimeout)},sb=function(a){return"content-type"==a.toLowerCase()};
	L.prototype.J=function(){"undefined"!=typeof aa&&this.a&&(this.h="Timed out after "+this.i+"ms, aborting",this.K=8,K(this.w,M(this,this.h)),I(this,"timeout"),this.abort(8))};var Jd=function(a,b){a.c=!1;a.a&&(a.f=!0,a.a.abort(),a.f=!1);a.h=b;a.K=5;Md(a);Nd(a)},Md=function(a){a.F||(a.F=!0,I(a,"complete"),I(a,"error"))};L.prototype.abort=function(a){this.a&&this.c&&(K(this.w,M(this,"Aborting")),this.c=!1,this.f=!0,this.a.abort(),this.f=!1,this.K=a||7,I(this,"complete"),I(this,"abort"),Nd(this))};
	L.prototype.D=function(){this.a&&(this.c&&(this.c=!1,this.f=!0,this.a.abort(),this.f=!1),Nd(this,!0));L.I.D.call(this)};L.prototype.P=function(){this.g||(this.C||this.j||this.f?Od(this):this.Z())};L.prototype.Z=function(){Od(this)};
	var Od=function(a){if(a.c&&"undefined"!=typeof aa)if(a.u[1]&&4==Pd(a)&&2==N(a))K(a.w,M(a,"Local request error detected and ignored"));else if(a.j&&4==Pd(a))Ed(a.P,0,a);else if(I(a,"readystatechange"),4==Pd(a)){K(a.w,M(a,"Request complete"));a.c=!1;try{if(Qd(a))I(a,"complete"),I(a,"success");else{a.K=6;var b;try{b=2<Pd(a)?a.a.statusText:""}catch(c){K(a.w,"Can not get status: "+c.message),b=""}a.h=b+" ["+N(a)+"]";Md(a)}}finally{Nd(a)}}};
	L.prototype.O=function(a,b){B("progress"===a.type,"goog.net.EventType.PROGRESS is of the same type as raw XHR progress.");I(this,Rd(a,"progress"));I(this,Rd(a,b?"downloadprogress":"uploadprogress"))};
	var Rd=function(a,b){return{type:b,lengthComputable:a.lengthComputable,loaded:a.loaded,total:a.total}},Nd=function(a,b){if(a.a){Kd(a);var c=a.a,d=a.u[0]?ba:null;a.a=null;a.u=null;b||I(a,"ready");try{c.onreadystatechange=d}catch(e){(a=a.w)&&a.log(vd,"Problem encountered resetting onreadystatechange: "+e.message,void 0)}}},Kd=function(a){a.a&&a.s&&(a.a.ontimeout=null);"number"==typeof a.m&&(l.clearTimeout(a.m),a.m=null)},Qd=function(a){var b=N(a),c;a:switch(b){case 200:case 201:case 202:case 204:case 206:case 304:case 1223:c=
	!0;break a;default:c=!1}if(!c){if(b=0===b)a=String(a.l).match(Fb)[1]||null,!a&&l.self&&l.self.location&&(a=l.self.location.protocol,a=a.substr(0,a.length-1)),b=!Hd.test(a?a.toLowerCase():"");c=b}return c},Pd=function(a){return a.a?a.a.readyState:0},N=function(a){try{return 2<Pd(a)?a.a.status:-1}catch(b){return-1}},Sd=function(a){try{return a.a?a.a.responseText:""}catch(b){return K(a.w,"Can not get responseText: "+b.message),""}},Td=function(a,b){if(a.a&&4==Pd(a))return a=a.a.getResponseHeader(b),
	null===a?void 0:a},M=function(a,b){return b+" ["+a.L+" "+a.l+" "+N(a)+"]"};var Ud=function(a,b,c,d){this.s=a;this.u=!!d;J.call(this,b,c)};v(Ud,J);Ud.prototype.i=function(){var a=new L,b=this.s;b&&b.forEach(function(b,d){a.headers.set(d,b)});this.u&&(a.X=!0);return a};Ud.prototype.l=function(a){return!a.g&&!a.a};var id=new Ud;var Wd=function(a,b,c,d,e,f,g,h,m,q,Q){this.J=a;this.C=b;this.u=c;this.m=d;this.G=e.slice();this.o=f.slice();this.j=this.l=this.c=this.b=null;this.g=this.h=!1;this.s=g;this.i=h;this.f=q;this.L=Q;this.F=m;var P=this;this.B=new G(function(a,b){P.l=a;P.j=b;Vd(P)})},Xd=function(a,b,c){this.b=a;this.c=b;this.a=!!c},Vd=function(a){function b(a,b){b?a(!1,new Xd(!1,null,!0)):id.W(function(b){b.X=d.L;d.b=b;var c=null;null!==d.f&&(b.ca=!0,c=Vc(b,"uploadprogress",function(a){d.f(a.loaded,a.lengthComputable?
	a.total:-1)}),b.ca=null!==d.f);b.send(d.J,d.C,d.m,d.u);cd(b,"complete",function(b){null!==c&&ed(c);d.b=null;b=b.target;var e=6===b.K&&100<=N(b),f=Qd(b)||e,e=N(b);if(!(f=!f))var g=d,f=500<=e&&600>e,h=ub([408,429],e),g=ub(g.o,e),f=f||h||g;f?(e=7===b.K,jd(b),a(!1,new Xd(!1,null,e))):(e=ub(d.G,e),a(!0,new Xd(e,b)))})})}function c(a,b){var c=d.l;a=d.j;var e=b.c;if(b.b)try{var f=d.s(e,Sd(e));n(f)?c(f):c()}catch(q){a(q)}else null!==e?(b=ma(),f=Sd(e),b.serverResponse=f,d.i?a(d.i(e,b)):a(b)):(b=b.a?d.g?qa():
	na():new w("retry-limit-exceeded","Max retry time for operation exceeded, please try again."),a(b));jd(e)}var d=a;a.h?c(0,new Xd(!1,null,!0)):a.c=ka(b,c,a.F)};Wd.prototype.a=function(){return this.B};Wd.prototype.cancel=function(a){this.h=!0;this.g=a||!1;null!==this.c&&(0,this.c)(!1);null!==this.b&&this.b.abort()};
	var Yd=function(a,b,c){var d=ab(a.b),d=a.i+d,e=a.headers?ta(a.headers):{};null!==b&&0<b.length&&(e.Authorization="Firebase "+b);e["X-Firebase-Storage-Version"]="webjs/"+("undefined"!==typeof firebase?firebase.SDK_VERSION:"AppManager");return new Wd(d,a.method,e,a.body,a.f,a.h,a.M,a.a,a.timeout,a.c,c)};var Zd=function(a){var b=l.BlobBuilder||l.WebKitBlobBuilder;if(n(b)){for(var b=new b,c=0;c<arguments.length;c++)b.append(arguments[c]);return b.getBlob()}b=xb(arguments);c=l.BlobBuilder||l.WebKitBlobBuilder;if(n(c)){for(var c=new c,d=0;d<b.length;d++)c.append(b[d],void 0);b=c.getBlob(void 0)}else if(n(l.Blob))b=new Blob(b,{});else throw Error("This browser doesn't seem to support creating Blobs");return b},$d=function(a,b,c){n(c)||(c=a.size);return a.webkitSlice?a.webkitSlice(b,c):a.mozSlice?a.mozSlice(b,
	c):a.slice?cc&&!E("13.0")||dc&&!E("537.1")?(0>b&&(b+=a.size),0>b&&(b=0),0>c&&(c+=a.size),c<b&&(c=b),a.slice(b,c-b)):a.slice(b,c):null};var O=function(a,b){ya()&&a instanceof Blob?(this.v=a,b=a.size,a=a.type):(a instanceof ArrayBuffer?(b?this.v=new Uint8Array(a):(this.v=new Uint8Array(a.byteLength),this.v.set(new Uint8Array(a))),b=this.v.length):(b?this.v=a:(this.v=new Uint8Array(a.length),this.v.set(a)),b=a.length),a="");this.a=b;this.b=a};O.prototype.type=function(){return this.b};
	O.prototype.slice=function(a,b){if(ya()&&this.v instanceof Blob)return a=$d(this.v,a,b),null===a?null:new O(a);a=new Uint8Array(this.v.buffer,a,b-a);return new O(a,!0)};
	var ae=function(a){var b=[];Array.prototype.push.apply(b,arguments);if(ya())return b=qb(b,function(a){return a instanceof O?a.v:a}),new O(Zd.apply(null,b));var b=qb(b,function(a){return xa(a)?$a("raw",a).data.buffer:a.v.buffer}),c=0;ob(b,function(a){c+=a.byteLength});var d=new Uint8Array(c),e=0;ob(b,function(a){a=new Uint8Array(a);for(var b=0;b<a.length;b++)d[e++]=a[b]});return new O(d,!0)};var be=function(a){this.b=Ec(a)};be.prototype.a=function(){return this.b};be.prototype.cancel=function(){};var ce=function(){this.a={};this.b=Number.MIN_SAFE_INTEGER},de=function(a,b){function c(){delete e.a[d]}var d=a.b;a.b++;a.a[d]=b;var e=a;b.a().then(c,c)},ee=function(a){sa(a.a,function(a,c){c&&c.cancel(!0)});a.a={}};var fe=function(a,b,c,d){this.a=a;this.g=null;if(null!==this.a&&(a=this.a.options,y(a))){a=a.storageBucket||null;if(null==a)a=null;else{var e=null;try{e=Sa(a)}catch(f){}if(null!==e){if(""!==e.path)throw new w("invalid-default-bucket","Invalid default bucket '"+a+"'.");a=e.bucket}}this.g=a}this.l=b;this.j=c;this.i=d;this.c=12E4;this.b=6E4;this.h=new ce;this.f=!1},ge=function(a){return null!==a.a&&y(a.a.INTERNAL)&&y(a.a.INTERNAL.getToken)?a.a.INTERNAL.getToken().then(function(a){return y(a)?a.accessToken:
	null},function(){return null}):Dc(null)};fe.prototype.bucket=function(){if(this.f)throw qa();return this.g};var R=function(a,b,c){if(a.f)return new be(qa());b=a.j(b,c,null===a.a);de(a.h,b);return b};var he=function(a,b){return b},S=function(a,b,c,d){this.c=a;this.b=b||a;this.writable=!!c;this.a=d||he},ie=null,je=function(){if(ie)return ie;var a=[];a.push(new S("bucket"));a.push(new S("generation"));a.push(new S("metageneration"));a.push(new S("name","fullPath",!0));var b=new S("name");b.a=function(a,b){return!xa(b)||2>b.length?b:Hb(b)};a.push(b);b=new S("size");b.a=function(a,b){return y(b)?+b:b};a.push(b);a.push(new S("timeCreated"));a.push(new S("updated"));a.push(new S("md5Hash",null,!0));
	a.push(new S("cacheControl",null,!0));a.push(new S("contentDisposition",null,!0));a.push(new S("contentEncoding",null,!0));a.push(new S("contentLanguage",null,!0));a.push(new S("contentType",null,!0));a.push(new S("metadata","customMetadata",!0));a.push(new S("downloadTokens","downloadURLs",!1,function(a,b){if(!(xa(b)&&0<b.length))return[];var c=encodeURIComponent;return qb(b.split(","),function(b){var d=a.fullPath,d="https://firebasestorage.googleapis.com/v0"+("/b/"+c(a.bucket)+"/o/"+c(d));b=ab({alt:"media",
	token:b});return d+b})}));return ie=a},ke=function(a,b){Object.defineProperty(a,"ref",{get:function(){return b.l(b,new Qa(a.bucket,a.fullPath))}})},le=function(a,b){for(var c={},d=b.length,e=0;e<d;e++){var f=b[e];f.writable&&(c[f.c]=a[f.b])}return JSON.stringify(c)},me=function(a){if(!a||"object"!==typeof a)throw"Expected Metadata object.";for(var b in a){var c=a[b];if("customMetadata"===b&&"object"!==typeof c)throw"Expected object for 'customMetadata' mapping.";}};var T=function(a,b,c){for(var d=b.length,e=b.length,f=0;f<b.length;f++)if(b[f].b){d=f;break}if(!(d<=c.length&&c.length<=e))throw d===e?(b=d,d=1===d?"argument":"arguments"):(b="between "+d+" and "+e,d="arguments"),new w("invalid-argument-count","Invalid argument count in `"+a+"`: Expected "+b+" "+d+", received "+c.length+".");for(f=0;f<c.length;f++)try{b[f].a(c[f])}catch(g){if(g instanceof Error)throw pa(f,a,g.message);throw pa(f,a,g);}},U=function(a,b){var c=this;this.a=function(b){c.b&&!n(b)||a(b)};
	this.b=!!b},ne=function(a,b){return function(c){a(c);b(c)}},oe=function(a,b){function c(a){if(!("string"===typeof a||a instanceof String))throw"Expected string.";}var d;a?d=ne(c,a):d=c;return new U(d,b)},pe=function(){return new U(function(a){if(!(a instanceof Uint8Array||a instanceof ArrayBuffer||ya()&&a instanceof Blob))throw"Expected Blob or File.";})},qe=function(){return new U(function(a){if(!(("number"===typeof a||a instanceof Number)&&0<=a))throw"Expected a number 0 or greater.";})},re=function(a,
	b){return new U(function(b){if(!(null===b||y(b)&&b instanceof Object))throw"Expected an Object.";y(a)&&a(b)},b)},se=function(){return new U(function(a){if(null!==a&&!t(a))throw"Expected a Function.";},!0)};var te=function(a){if(!a)throw ma();},ue=function(a,b){return function(c,d){a:{var e;try{e=JSON.parse(d)}catch(h){c=null;break a}c=ea(e)?e:null}if(null===c)c=null;else{d={type:"file"};e=b.length;for(var f=0;f<e;f++){var g=b[f];d[g.b]=g.a(d,c[g.c])}ke(d,a);c=d}te(null!==c);return c}},ve=function(a){return function(b,c){b=401===N(b)?new w("unauthenticated","User is not authenticated, please authenticate using Firebase Authentication and try again."):402===N(b)?new w("quota-exceeded","Quota for bucket '"+
	a.bucket+"' exceeded, please view quota on https://firebase.google.com/pricing/."):403===N(b)?new w("unauthorized","User does not have permission to access '"+a.path+"'."):c;b.serverResponse=c.serverResponse;return b}},we=function(a){var b=ve(a);return function(c,d){var e=b(c,d);404===N(c)&&(e=new w("object-not-found","Object '"+a.path+"' does not exist."));e.serverResponse=d.serverResponse;return e}},xe=function(a,b,c){var d=Ra(b);a=new x(la+"/v0"+d,"GET",ue(a,c),a.c);a.a=we(b);return a},ye=function(a,
	b){var c=Ra(b);a=new x(la+"/v0"+c,"DELETE",function(){},a.c);a.f=[200,204];a.a=we(b);return a},ze=function(a,b,c){c=c?ta(c):{};c.fullPath=a.path;c.size=b.a;c.contentType||(a=b&&b.type()||"application/octet-stream",c.contentType=a);return c},Ae=function(a,b,c,d,e){var f="/b/"+encodeURIComponent(b.bucket)+"/o",g={"X-Goog-Upload-Protocol":"multipart"},h;h="";for(var m=0;2>m;m++)h+=Math.random().toString().slice(2);g["Content-Type"]="multipart/related; boundary="+h;e=ze(b,d,e);m=le(e,c);d=ae("--"+h+"\r\nContent-Type: application/json; charset=utf-8\r\n\r\n"+
	m+"\r\n--"+h+"\r\nContent-Type: "+e.contentType+"\r\n\r\n",d,"\r\n--"+h+"--");if(null===d)throw oa();a=new x(la+"/v0"+f,"POST",ue(a,c),a.b);a.b={name:e.fullPath};a.headers=g;a.body=d.v;a.a=ve(b);return a},Be=function(a,b,c,d){this.a=a;this.total=b;this.b=!!c;this.c=d||null},Ce=function(a,b){var c;try{c=Td(a,"X-Goog-Upload-Status")}catch(d){te(!1)}te(ub(b||["active"],c));return c},De=function(a,b,c,d,e){var f="/b/"+encodeURIComponent(b.bucket)+"/o",g=ze(b,d,e);e={name:g.fullPath};f=la+"/v0"+f;d={"X-Goog-Upload-Protocol":"resumable",
	"X-Goog-Upload-Command":"start","X-Goog-Upload-Header-Content-Length":d.a,"X-Goog-Upload-Header-Content-Type":g.contentType,"Content-Type":"application/json; charset=utf-8"};c=le(g,c);a=new x(f,"POST",function(a){Ce(a);var b;try{b=Td(a,"X-Goog-Upload-URL")}catch(q){te(!1)}te(xa(b));return b},a.b);a.b=e;a.headers=d;a.body=c;a.a=ve(b);return a},Ee=function(a,b,c,d){a=new x(c,"POST",function(a){var b=Ce(a,["active","final"]),c;try{c=Td(a,"X-Goog-Upload-Size-Received")}catch(h){te(!1)}a=c;isFinite(a)&&
	(a=String(a));a=r(a)?/^\s*-?0x/i.test(a)?parseInt(a,16):parseInt(a,10):NaN;te(!isNaN(a));return new Be(a,d.a,"final"===b)},a.b);a.headers={"X-Goog-Upload-Command":"query"};a.a=ve(b);a.g=!1;return a},Fe=function(a,b,c,d,e,f,g){var h=new Be(0,0);g?(h.a=g.a,h.total=g.total):(h.a=0,h.total=d.a);if(d.a!==h.total)throw new w("server-file-wrong-size","Server recorded incorrect upload file size, please retry the upload.");var m=g=h.total-h.a;0<e&&(m=Math.min(m,e));var q=h.a;e={"X-Goog-Upload-Command":m===
	g?"upload, finalize":"upload","X-Goog-Upload-Offset":h.a};g=d.slice(q,q+m);if(null===g)throw oa();c=new x(c,"POST",function(a,c){var e=Ce(a,["active","final"]),g=h.a+m,Q=d.a,q;"final"===e?q=ue(b,f)(a,c):q=null;return new Be(g,Q,"final"===e,q)},b.b);c.headers=e;c.body=g.v;c.c=null;c.a=ve(a);c.g=!1;return c};var W=function(a,b,c,d,e,f){this.L=a;this.c=b;this.j=c;this.f=e;this.h=f||null;this.m=d;this.l=0;this.J=this.s=!1;this.F=[];this.Z=262144<this.f.a;this.b="running";this.a=this.u=this.g=null;this.i=1;var g=this;this.V=function(a){g.a=null;g.i=1;"storage/canceled"===a.code?(g.s=!0,Ge(g)):(g.g=a,V(g,"error"))};this.Y=function(a){g.a=null;"storage/canceled"===a.code?Ge(g):(g.g=a,V(g,"error"))};this.B=this.o=null;this.G=new G(function(a,b){g.o=a;g.B=b;He(g)});this.G.then(null,function(){})},He=function(a){"running"===
	a.b&&null===a.a&&(a.Z?null===a.u?Ie(a):a.s?Je(a):a.J?Ke(a):Le(a):Me(a))},Ne=function(a,b){ge(a.c).then(function(c){switch(a.b){case "running":b(c);break;case "canceling":V(a,"canceled");break;case "pausing":V(a,"paused")}})},Ie=function(a){Ne(a,function(b){var c=De(a.c,a.j,a.m,a.f,a.h);a.a=R(a.c,c,b);a.a.a().then(function(b){a.a=null;a.u=b;a.s=!1;Ge(a)},this.V)})},Je=function(a){var b=a.u;Ne(a,function(c){var d=Ee(a.c,a.j,b,a.f);a.a=R(a.c,d,c);a.a.a().then(function(b){a.a=null;Oe(a,b.a);a.s=!1;b.b&&
	(a.J=!0);Ge(a)},a.V)})},Le=function(a){var b=262144*a.i,c=new Be(a.l,a.f.a),d=a.u;Ne(a,function(e){var f;try{f=Fe(a.j,a.c,d,a.f,b,a.m,c)}catch(g){a.g=g;V(a,"error");return}a.a=R(a.c,f,e);a.a.a().then(function(b){33554432>262144*a.i&&(a.i*=2);a.a=null;Oe(a,b.a);b.b?(a.h=b.c,V(a,"success")):Ge(a)},a.V)})},Ke=function(a){Ne(a,function(b){var c=xe(a.c,a.j,a.m);a.a=R(a.c,c,b);a.a.a().then(function(b){a.a=null;a.h=b;V(a,"success")},a.Y)})},Me=function(a){Ne(a,function(b){var c=Ae(a.c,a.j,a.m,a.f,a.h);a.a=
	R(a.c,c,b);a.a.a().then(function(b){a.a=null;a.h=b;Oe(a,a.f.a);V(a,"success")},a.V)})},Oe=function(a,b){var c=a.l;a.l=b;a.l>c&&Pe(a)},V=function(a,b){if(a.b!==b)switch(b){case "canceling":a.b=b;null!==a.a&&a.a.cancel();break;case "pausing":a.b=b;null!==a.a&&a.a.cancel();break;case "running":var c="paused"===a.b;a.b=b;c&&(Pe(a),He(a));break;case "paused":a.b=b;Pe(a);break;case "canceled":a.g=na();a.b=b;Pe(a);break;case "error":a.b=b;Pe(a);break;case "success":a.b=b,Pe(a)}},Ge=function(a){switch(a.b){case "pausing":V(a,
	"paused");break;case "canceling":V(a,"canceled");break;case "running":He(a)}};W.prototype.C=function(){return new A(this.l,this.f.a,wa(this.b),this.h,this,this.L)};
	W.prototype.O=function(a,b,c,d){function e(a){try{g(a);return}catch(P){}try{if(h(a),!(n(a.next)||n(a.error)||n(a.complete)))throw"";}catch(P){throw"Expected a function or an Object with one of `next`, `error`, `complete` properties.";}}function f(a){return function(b,c,d){null!==a&&T("on",a,arguments);var e=new Ta(b,c,d);Qe(m,e);return function(){wb(m.F,e)}}}var g=se().a,h=re(null,!0).a;T("on",[oe(function(){if("state_changed"!==a)throw"Expected one of the event types: [state_changed].";}),re(e,!0),
	se(),se()],arguments);var m=this,q=[re(function(a){if(null===a)throw"Expected a function or an Object with one of `next`, `error`, `complete` properties.";e(a)}),se(),se()];return n(b)||n(c)||n(d)?f(null)(b,c,d):f(q)};W.prototype.then=function(a,b){return this.G.then(a,b)};
	var Qe=function(a,b){a.F.push(b);Re(a,b)},Pe=function(a){Se(a);var b=xb(a.F);ob(b,function(b){Re(a,b)})},Se=function(a){if(null!==a.o){var b=!0;switch(wa(a.b)){case "success":Rc(a.o.bind(null,a.C()))();break;case "canceled":case "error":Rc(a.B.bind(null,a.g))();break;default:b=!1}b&&(a.o=null,a.B=null)}},Re=function(a,b){switch(wa(a.b)){case "running":case "paused":null!==b.next&&Rc(b.next.bind(b,a.C()))();break;case "success":null!==b.b&&Rc(b.b.bind(b))();break;case "canceled":case "error":null!==
	b.a&&Rc(b.a.bind(b,a.g))();break;default:null!==b.a&&Rc(b.a.bind(b,a.g))()}};W.prototype.R=function(){T("resume",[],arguments);var a="paused"===this.b||"pausing"===this.b;a&&V(this,"running");return a};W.prototype.P=function(){T("pause",[],arguments);var a="running"===this.b;a&&V(this,"pausing");return a};W.prototype.cancel=function(){T("cancel",[],arguments);var a="running"===this.b||"pausing"===this.b;a&&V(this,"canceling");return a};var X=function(a,b){this.b=a;if(b)this.a=b instanceof Qa?b:Sa(b);else if(a=a.bucket(),null!==a)this.a=new Qa(a,"");else throw new w("no-default-bucket","No default bucket found. Did you set the 'storageBucket' property when initializing the app?");};X.prototype.toString=function(){T("toString",[],arguments);return"gs://"+this.a.bucket+"/"+this.a.path};var Te=function(a,b){return new X(a,b)};k=X.prototype;
	k.fa=function(a){T("child",[oe()],arguments);var b=Gb(this.a.path,a);return Te(this.b,new Qa(this.a.bucket,b))};k.Da=function(){var a;a=this.a.path;if(0==a.length)a=null;else{var b=a.lastIndexOf("/");a=-1===b?"":a.slice(0,b)}return null===a?null:Te(this.b,new Qa(this.a.bucket,a))};k.Fa=function(){return Te(this.b,new Qa(this.a.bucket,""))};k.ma=function(){return this.a.bucket};k.ya=function(){return this.a.path};k.Ca=function(){return Hb(this.a.path)};k.Ha=function(){return this.b.i};
	k.ra=function(a,b){T("put",[pe(),new U(me,!0)],arguments);Ue(this,"put");return new W(this,this.b,this.a,je(),new O(a),b)};k.sa=function(a,b,c){T("putString",[oe(),oe(Va,!0),new U(me,!0)],arguments);Ue(this,"putString");var d=$a(y(b)?b:"raw",a),e=c?ta(c):{};!y(e.contentType)&&y(d.a)&&(e.contentType=d.a);return new W(this,this.b,this.a,je(),new O(d.data,!0),e)};
	k.delete=function(){T("delete",[],arguments);Ue(this,"delete");var a=this;return ge(this.b).then(function(b){var c=ye(a.b,a.a);return R(a.b,c,b).a()})};k.ga=function(){T("getMetadata",[],arguments);Ue(this,"getMetadata");var a=this;return ge(this.b).then(function(b){var c=xe(a.b,a.a,je());return R(a.b,c,b).a()})};
	k.ta=function(a){T("updateMetadata",[new U(me,void 0)],arguments);Ue(this,"updateMetadata");var b=this;return ge(this.b).then(function(c){var d=b.b,e=b.a,f=a,g=je(),h=Ra(e),h=la+"/v0"+h,f=le(f,g),d=new x(h,"PATCH",ue(d,g),d.c);d.headers={"Content-Type":"application/json; charset=utf-8"};d.body=f;d.a=we(e);return R(b.b,d,c).a()})};
	k.qa=function(){T("getDownloadURL",[],arguments);Ue(this,"getDownloadURL");return this.ga().then(function(a){a=a.downloadURLs[0];if(y(a))return a;throw new w("no-download-url","The given file does not have any download URLs.");})};var Ue=function(a,b){if(""===a.a.path)throw new w("invalid-root-operation","The operation '"+b+"' cannot be performed on a root reference, create a non-root reference using child, such as .child('file.png').");};var Y=function(a){this.a=new fe(a,function(a,c){return new X(a,c)},Yd,this);this.b=a;this.c=new Ve(this)};k=Y.prototype;k.ua=function(a){T("ref",[oe(function(a){if(/^[A-Za-z]+:\/\//.test(a))throw"Expected child path but got a URL, use refFromURL instead.";},!0)],arguments);var b=new X(this.a);return n(a)?b.fa(a):b};
	k.va=function(a){T("refFromURL",[oe(function(a){if(!/^[A-Za-z]+:\/\//.test(a))throw"Expected full URL but got a child path, use ref instead.";try{Sa(a)}catch(c){throw"Expected valid full URL but got an invalid one.";}},!1)],arguments);return new X(this.a,a)};k.Aa=function(){return this.a.b};k.xa=function(a){T("setMaxUploadRetryTime",[qe()],arguments);this.a.b=a};k.za=function(){return this.a.c};k.wa=function(a){T("setMaxOperationRetryTime",[qe()],arguments);this.a.c=a};k.la=function(){return this.b};
	k.ka=function(){return this.c};var Ve=function(a){this.a=a};Ve.prototype.delete=function(){var a=this.a.a;a.f=!0;a.a=null;ee(a.h)};var Z=function(a,b,c){Object.defineProperty(a,b,{get:c})};X.prototype.toString=X.prototype.toString;X.prototype.child=X.prototype.fa;X.prototype.put=X.prototype.ra;X.prototype.putString=X.prototype.sa;X.prototype["delete"]=X.prototype.delete;X.prototype.getMetadata=X.prototype.ga;X.prototype.updateMetadata=X.prototype.ta;X.prototype.getDownloadURL=X.prototype.qa;Z(X.prototype,"parent",X.prototype.Da);Z(X.prototype,"root",X.prototype.Fa);Z(X.prototype,"bucket",X.prototype.ma);
	Z(X.prototype,"fullPath",X.prototype.ya);Z(X.prototype,"name",X.prototype.Ca);Z(X.prototype,"storage",X.prototype.Ha);Y.prototype.ref=Y.prototype.ua;Y.prototype.refFromURL=Y.prototype.va;Z(Y.prototype,"maxOperationRetryTime",Y.prototype.za);Y.prototype.setMaxOperationRetryTime=Y.prototype.wa;Z(Y.prototype,"maxUploadRetryTime",Y.prototype.Aa);Y.prototype.setMaxUploadRetryTime=Y.prototype.xa;Z(Y.prototype,"app",Y.prototype.la);Z(Y.prototype,"INTERNAL",Y.prototype.ka);Ve.prototype["delete"]=Ve.prototype.delete;
	Y.prototype.capi_=function(a){la=a};W.prototype.on=W.prototype.O;W.prototype.resume=W.prototype.R;W.prototype.pause=W.prototype.P;W.prototype.cancel=W.prototype.cancel;Z(W.prototype,"snapshot",W.prototype.C);Z(A.prototype,"bytesTransferred",A.prototype.na);Z(A.prototype,"totalBytes",A.prototype.Ja);Z(A.prototype,"state",A.prototype.Ga);Z(A.prototype,"metadata",A.prototype.Ba);Z(A.prototype,"downloadURL",A.prototype.pa);Z(A.prototype,"task",A.prototype.Ia);Z(A.prototype,"ref",A.prototype.Ea);
	ua.STATE_CHANGED="state_changed";va.RUNNING="running";va.PAUSED="paused";va.SUCCESS="success";va.CANCELED="canceled";va.ERROR="error";Ua.RAW="raw";Ua.BASE64="base64";Ua.BASE64URL="base64url";Ua.DATA_URL="data_url";G.prototype["catch"]=G.prototype.l;G.prototype.then=G.prototype.then;
	(function(){function a(a){return new Y(a)}var b={TaskState:va,TaskEvent:ua,StringFormat:Ua,Storage:Y,Reference:X};if("undefined"!==typeof firebase)firebase.INTERNAL.registerService("storage",a,b);else throw Error("Cannot install Firebase Storage - be sure to load firebase-app.js first.");})();})();
	module.exports = firebase.storage;


/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {var firebase = __webpack_require__(15);
	/*! @license Firebase v3.5.2
	    Build: 3.5.2-rc.1
	    Terms: https://developers.google.com/terms */
	(function() {var f=function(a,b){function c(){}c.prototype=b.prototype;a.prototype=new c;for(var d in b)if(Object.defineProperties){var e=Object.getOwnPropertyDescriptor(b,d);e&&Object.defineProperty(a,d,e)}else a[d]=b[d]},h="function"==typeof Object.defineProperties?Object.defineProperty:function(a,b,c){if(c.get||c.set)throw new TypeError("ES3 does not support getters and setters.");a!=Array.prototype&&a!=Object.prototype&&(a[b]=c.value)},k="undefined"!=typeof window&&window===this?this:"undefined"!=typeof global&&
	null!=global?global:this,l=function(a,b){if(b){var c=k;a=a.split(".");for(var d=0;d<a.length-1;d++){var e=a[d];e in c||(c[e]={});c=c[e]}a=a[a.length-1];d=c[a];b=b(d);b!=d&&null!=b&&h(c,a,{configurable:!0,writable:!0,value:b})}},n=function(){n=function(){};k.Symbol||(k.Symbol=q)},t=0,q=function(a){return"jscomp_symbol_"+(a||"")+t++},v=function(){n();var a=k.Symbol.iterator;a||(a=k.Symbol.iterator=k.Symbol("iterator"));"function"!=typeof Array.prototype[a]&&h(Array.prototype,a,{configurable:!0,writable:!0,
	value:function(){return u(this)}});v=function(){}},u=function(a){var b=0;return w(function(){return b<a.length?{done:!1,value:a[b++]}:{done:!0}})},w=function(a){v();a={next:a};a[k.Symbol.iterator]=function(){return this};return a},x=function(a){v();var b=a[Symbol.iterator];return b?b.call(a):u(a)};
	l("Promise",function(a){function b(){this.a=null}if(a)return a;b.prototype.b=function(a){null==this.a&&(this.a=[],this.f());this.a.push(a)};b.prototype.f=function(){var a=this;this.c(function(){a.h()})};var c=k.setTimeout;b.prototype.c=function(a){c(a,0)};b.prototype.h=function(){for(;this.a&&this.a.length;){var a=this.a;this.a=[];for(var b=0;b<a.length;++b){var c=a[b];delete a[b];try{c()}catch(r){this.g(r)}}}this.a=null};b.prototype.g=function(a){this.c(function(){throw a;})};var d=function(a){this.b=
	0;this.h=void 0;this.a=[];var b=this.f();try{a(b.resolve,b.reject)}catch(p){b.reject(p)}};d.prototype.f=function(){function a(a){return function(d){c||(c=!0,a.call(b,d))}}var b=this,c=!1;return{resolve:a(this.ca),reject:a(this.g)}};d.prototype.ca=function(a){if(a===this)this.g(new TypeError("A Promise cannot resolve to itself"));else if(a instanceof d)this.da(a);else{var b;a:switch(typeof a){case "object":b=null!=a;break a;case "function":b=!0;break a;default:b=!1}b?this.w(a):this.j(a)}};d.prototype.w=
	function(a){var b=void 0;try{b=a.then}catch(p){this.g(p);return}"function"==typeof b?this.ea(b,a):this.j(a)};d.prototype.g=function(a){this.o(2,a)};d.prototype.j=function(a){this.o(1,a)};d.prototype.o=function(a,b){if(0!=this.b)throw Error("Cannot settle("+a+", "+b|"): Promise already settled in state"+this.b);this.b=a;this.h=b;this.v()};d.prototype.v=function(){if(null!=this.a){for(var a=this.a,b=0;b<a.length;++b)a[b].call(),a[b]=null;this.a=null}};var e=new b;d.prototype.da=function(a){var b=this.f();
	a.c(b.resolve,b.reject)};d.prototype.ea=function(a,b){var c=this.f();try{a.call(b,c.resolve,c.reject)}catch(r){c.reject(r)}};d.prototype.then=function(a,b){function c(a,b){return"function"==typeof a?function(b){try{e(a(b))}catch(W){g(W)}}:b}var e,g,m=new d(function(a,b){e=a;g=b});this.c(c(a,e),c(b,g));return m};d.prototype.catch=function(a){return this.then(void 0,a)};d.prototype.c=function(a,b){function c(){switch(d.b){case 1:a(d.h);break;case 2:b(d.h);break;default:throw Error("Unexpected state: "+
	d.b);}}var d=this;null==this.a?e.b(c):this.a.push(function(){e.b(c)})};d.resolve=function(a){return a instanceof d?a:new d(function(b){b(a)})};d.reject=function(a){return new d(function(b,c){c(a)})};d.b=function(a){return new d(function(b,c){for(var e=x(a),g=e.next();!g.done;g=e.next())d.resolve(g.value).c(b,c)})};d.a=function(a){var b=x(a),c=b.next();return c.done?d.resolve([]):new d(function(a,e){function g(b){return function(c){m[b]=c;p--;0==p&&a(m)}}var m=[],p=0;do m.push(void 0),p++,d.resolve(c.value).c(g(m.length-
	1),e),c=b.next();while(!c.done)})};d.$jscomp$new$AsyncExecutor=function(){return new b};return d});l("Array.prototype.findIndex",function(a){return a?a:function(a,c){a:{var b=this;b instanceof String&&(b=String(b));for(var e=b.length,g=0;g<e;g++)if(a.call(c,b[g],g,b)){a=g;break a}a=-1}return a}});l("Object.assign",function(a){return a?a:function(a,c){for(var b=1;b<arguments.length;b++){var e=arguments[b];if(e)for(var g in e)Object.prototype.hasOwnProperty.call(e,g)&&(a[g]=e[g])}return a}});
	var y=this,z=function(a){var b=typeof a;if("object"==b)if(a){if(a instanceof Array)return"array";if(a instanceof Object)return b;var c=Object.prototype.toString.call(a);if("[object Window]"==c)return"object";if("[object Array]"==c||"number"==typeof a.length&&"undefined"!=typeof a.splice&&"undefined"!=typeof a.propertyIsEnumerable&&!a.propertyIsEnumerable("splice"))return"array";if("[object Function]"==c||"undefined"!=typeof a.call&&"undefined"!=typeof a.propertyIsEnumerable&&!a.propertyIsEnumerable("call"))return"function"}else return"null";
	else if("function"==b&&"undefined"==typeof a.call)return"object";return b},A=function(a,b){function c(){}c.prototype=b.prototype;a.ja=b.prototype;a.prototype=new c;a.fa=function(a,c,g){for(var d=Array(arguments.length-2),e=2;e<arguments.length;e++)d[e-2]=arguments[e];return b.prototype[c].apply(a,d)}};var B={i:"only-available-in-window",A:"only-available-in-sw",U:"should-be-overriden",l:"bad-sender-id",I:"incorrect-gcm-sender-id",S:"permission-default",R:"permission-blocked",Z:"unsupported-browser",L:"notifications-blocked",F:"failed-serviceworker-registration",m:"sw-registration-expected",H:"get-subscription-failed",K:"invalid-saved-token",s:"sw-reg-redundant",V:"token-subscribe-failed",X:"token-subscribe-no-token",W:"token-subscribe-no-push-set",$:"use-sw-before-get-token",J:"invalid-delete-token",
	D:"delete-token-not-found",B:"bg-handler-function-expected",P:"no-window-client-to-msg",Y:"unable-to-resubscribe",N:"no-fcm-token-for-resubscribe",G:"failed-to-delete-token",O:"no-sw-in-reg"},C={},D=(C[B.i]="This method is available in a Window context.",C[B.A]="This method is available in a service worker context.",C[B.U]="This method should be overriden by extended classes.",C[B.l]="Please ensure that 'messagingSenderId' is set correctly in the options passed into firebase.initializeApp().",C[B.S]=
	"The required permissions were not granted and dismissed instead.",C[B.R]="The required permissions were not granted and blocked instead.",C[B.Z]="This browser doesn't support the API's required to use the firebase SDK.",C[B.L]="Notifications have been blocked.",C[B.F]="We are unable to register the default service worker. {$browserErrorMessage}",C[B.m]="A service worker registration was the expected input.",C[B.H]="There was an error when trying to get any existing Push Subscriptions.",C[B.K]="Unable to access details of the saved token.",
	C[B.s]="The service worker being used for push was made redundant.",C[B.V]="A problem occured while subscribing the user to FCM: {$message}",C[B.X]="FCM returned no token when subscribing the user to push.",C[B.W]="FCM returned an invalid response when getting an FCM token.",C[B.$]="You must call useServiceWorker() before calling getToken() to ensure your service worker is used.",C[B.J]="You must pass a valid token into deleteToken(), i.e. the token from getToken().",C[B.D]="The deletion attempt for token could not be performed as the token was not found.",
	C[B.B]="The input to setBackgroundMessageHandler() must be a function.",C[B.P]="An attempt was made to message a non-existant window client.",C[B.Y]="There was an error while re-subscribing the FCM token for push messaging. Will have to resubscribe the user on next visit. {$message}",C[B.N]="Could not find an FCM token and as a result, unable to resubscribe. Will have to resubscribe the user on next visit.",C[B.G]="Unable to delete the currently saved token.",C[B.O]="Even though the service worker registration was successful, there was a problem accessing the service worker itself.",
	C[B.I]="Please change your web app manifest's 'gcm_sender_id' value to '103953800507' to use Firebase messaging.",C);var E={userVisibleOnly:!0,applicationServerKey:new Uint8Array([4,51,148,247,223,161,235,177,220,3,162,94,21,113,219,72,211,46,237,237,178,52,219,183,71,58,12,143,196,204,225,111,60,140,132,223,171,182,102,62,242,12,212,139,254,227,249,118,47,20,28,99,8,106,111,45,177,26,149,176,206,55,192,156,110])};var F={u:"firebase-messaging-msg-type",C:"firebase-messaging-msg-data"},G={T:"push-msg-received",M:"notification-clicked"},H=function(a,b){var c={};return c[F.u]=a,c[F.C]=b,c};var I=function(a){if(Error.captureStackTrace)Error.captureStackTrace(this,I);else{var b=Error().stack;b&&(this.stack=b)}a&&(this.message=String(a))};A(I,Error);var J=function(a,b){for(var c=a.split("%s"),d="",e=Array.prototype.slice.call(arguments,1);e.length&&1<c.length;)d+=c.shift()+e.shift();return d+c.join("%s")};var K=function(a,b){b.unshift(a);I.call(this,J.apply(null,b));b.shift()};A(K,I);var aa=function(a,b,c){if(!a){var d="Assertion failed";if(b)var d=d+(": "+b),e=Array.prototype.slice.call(arguments,2);throw new K(""+d,e||[]);}};var L=null;var M=function(a){a=new Uint8Array(a);var b=z(a);aa("array"==b||"object"==b&&"number"==typeof a.length,"encodeByteArray takes an array as a parameter");if(!L)for(L={},b=0;65>b;b++)L[b]="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=".charAt(b);for(var b=L,c=[],d=0;d<a.length;d+=3){var e=a[d],g=d+1<a.length,m=g?a[d+1]:0,p=d+2<a.length,r=p?a[d+2]:0,V=e>>2,e=(e&3)<<4|m>>4,m=(m&15)<<2|r>>6,r=r&63;p||(r=64,g||(m=64));c.push(b[V],b[e],b[m],b[r])}return c.join("").replace(/\+/g,"-").replace(/\//g,
	"_").replace(/=+$/,"")};var N=new firebase.INTERNAL.ErrorFactory("messaging","Messaging",D),O=function(){this.a=null},P=function(a){if(a.a)return a.a;a.a=new Promise(function(a,c){var b=y.indexedDB.open("fcm_token_details_db",1);b.onerror=function(a){c(a.target.error)};b.onsuccess=function(b){a(b.target.result)};b.onupgradeneeded=function(a){a=a.target.result.createObjectStore("fcm_token_object_Store",{keyPath:"swScope"});a.createIndex("fcmSenderId","fcmSenderId",{unique:!1});a.createIndex("fcmToken","fcmToken",{unique:!0})}});
	return a.a},ba=function(a){a.a?a.a.then(function(b){b.close();a.a=null}):Promise.resolve()},Q=function(a,b){return P(a).then(function(a){return new Promise(function(c,e){var d=a.transaction(["fcm_token_object_Store"]).objectStore("fcm_token_object_Store").index("fcmToken").get(b);d.onerror=function(a){e(a.target.error)};d.onsuccess=function(a){c(a.target.result)}})})},ca=function(a,b){return P(a).then(function(a){return new Promise(function(c,e){var d=[],m=a.transaction(["fcm_token_object_Store"]).objectStore("fcm_token_object_Store").openCursor();
	m.onerror=function(a){e(a.target.error)};m.onsuccess=function(a){(a=a.target.result)?(a.value.fcmSenderId===b&&d.push(a.value),a.continue()):c(d)}})})},R=function(a,b,c){var d=M(b.getKey("p256dh")),e=M(b.getKey("auth"));a="authorized_entity="+a+"&"+("endpoint="+b.endpoint+"&")+("encryption_key="+d+"&")+("encryption_auth="+e);c&&(a+="&pushSet="+c);c=new Headers;c.append("Content-Type","application/x-www-form-urlencoded");return fetch("https://fcm.googleapis.com/fcm/connect/subscribe",{method:"POST",
	headers:c,body:a}).then(function(a){return a.json()}).then(function(a){if(a.error)throw N.create(B.V,{message:a.error.message});if(!a.token)throw N.create(B.X);if(!a.pushSet)throw N.create(B.W);return{token:a.token,pushSet:a.pushSet}})},da=function(a,b,c,d,e,g){var m={swScope:c.scope,endpoint:d.endpoint,auth:M(d.getKey("auth")),p256dh:M(d.getKey("p256dh")),fcmToken:e,fcmPushSet:g,fcmSenderId:b};return P(a).then(function(a){return new Promise(function(b,c){var d=a.transaction(["fcm_token_object_Store"],
	"readwrite").objectStore("fcm_token_object_Store").put(m);d.onerror=function(a){c(a.target.error)};d.onsuccess=function(){b()}})})};
	O.prototype.ba=function(a,b){return b instanceof ServiceWorkerRegistration?"string"!==typeof a||0===a.length?Promise.reject(N.create(B.l)):ca(this,a).then(function(c){if(0!==c.length){var d=c.findIndex(function(c){return b.scope===c.swScope&&a===c.fcmSenderId});if(-1!==d)return c[d]}}).then(function(a){if(a)return b.pushManager.getSubscription().catch(function(){throw N.create(B.H);}).then(function(b){var c;if(c=b)c=b.endpoint===a.endpoint&&M(b.getKey("auth"))===a.auth&&M(b.getKey("p256dh"))===a.p256dh;
	if(c)return a.fcmToken})}):Promise.reject(N.create(B.m))};O.prototype.getSavedToken=O.prototype.ba;O.prototype.aa=function(a,b){var c=this;return"string"!==typeof a||0===a.length?Promise.reject(N.create(B.l)):b instanceof ServiceWorkerRegistration?b.pushManager.getSubscription().then(function(a){return a?a:b.pushManager.subscribe(E)}).then(function(d){return R(a,d).then(function(e){return da(c,a,b,d,e.token,e.pushSet).then(function(){return e.token})})}):Promise.reject(N.create(B.m))};
	O.prototype.createToken=O.prototype.aa;O.prototype.deleteToken=function(a){var b=this;return"string"!==typeof a||0===a.length?Promise.reject(N.create(B.J)):Q(this,a).then(function(a){if(!a)throw N.create(B.D);return P(b).then(function(b){return new Promise(function(c,d){var e=b.transaction(["fcm_token_object_Store"],"readwrite").objectStore("fcm_token_object_Store").delete(a.swScope);e.onerror=function(a){d(a.target.error)};e.onsuccess=function(b){0===b.target.result?d(N.create(B.G)):c(a)}})})})};var S=function(a){var b=this;this.a=new firebase.INTERNAL.ErrorFactory("messaging","Messaging",D);if(!a.options.messagingSenderId||"string"!==typeof a.options.messagingSenderId)throw this.a.create(B.l);this.j=a.options.messagingSenderId;this.c=new O;this.app=a;this.INTERNAL={};this.INTERNAL.delete=function(){return b.delete}};
	S.prototype.getToken=function(){var a=this,b=Notification.permission;return"granted"!==b?"denied"===b?Promise.reject(this.a.create(B.L)):Promise.resolve(null):this.f().then(function(b){return a.c.ba(a.j,b).then(function(c){return c?c:a.c.aa(a.j,b)})})};S.prototype.getToken=S.prototype.getToken;S.prototype.deleteToken=function(a){var b=this;return this.c.deleteToken(a).then(function(){return b.f()}).then(function(a){return a?a.pushManager.getSubscription():null}).then(function(a){if(a)return a.unsubscribe()})};
	S.prototype.deleteToken=S.prototype.deleteToken;S.prototype.f=function(){throw this.a.create(B.U);};S.prototype.requestPermission=function(){throw this.a.create(B.i);};S.prototype.useServiceWorker=function(){throw this.a.create(B.i);};S.prototype.useServiceWorker=S.prototype.useServiceWorker;S.prototype.onMessage=function(){throw this.a.create(B.i);};S.prototype.onMessage=S.prototype.onMessage;S.prototype.onTokenRefresh=function(){throw this.a.create(B.i);};S.prototype.onTokenRefresh=S.prototype.onTokenRefresh;
	S.prototype.setBackgroundMessageHandler=function(){throw this.a.create(B.A);};S.prototype.setBackgroundMessageHandler=S.prototype.setBackgroundMessageHandler;S.prototype.delete=function(){ba(this.c)};var T=self,U=function(a){var b=this;S.call(this,a);this.a=new firebase.INTERNAL.ErrorFactory("messaging","Messaging",D);T.addEventListener("push",function(a){return ea(b,a)},!1);T.addEventListener("pushsubscriptionchange",function(a){return fa(b,a)},!1);T.addEventListener("notificationclick",function(a){return ga(b,a)},!1);this.b=null};f(U,S);
	var ea=function(a,b){var c;try{c=b.data.json()}catch(e){return}var d=ha().then(function(b){if(b){if(c.notification||a.b)return ia(a,c)}else{if((b=c)&&"object"===typeof b.notification){var d=Object.assign({},b.notification),e={};d.data=(e.FCM_MSG=b,e);b=d}else b=void 0;if(b)return T.registration.showNotification(b.title||"",b);if(a.b)return a.b(c)}});b.waitUntil(d)},fa=function(a,b){var c=a.getToken().then(function(b){if(!b)throw a.a.create(B.N);var c=a.c;return Q(c,b).then(function(b){if(!b)throw a.a.create(B.K);
	return T.registration.pushManager.subscribe(E).then(function(a){return R(b.ha,a,b.ga)}).catch(function(d){return c.deleteToken(b.ia).then(function(){throw a.a.create(B.Y,{message:d});})})})});b.waitUntil(c)},ga=function(a,b){if(b.notification&&b.notification.data&&b.notification.data.FCM_MSG){b.stopImmediatePropagation();b.notification.close();var c=b.notification.data.FCM_MSG,d=c.notification.click_action;if(d){var e=ja(d).then(function(a){return a?a:T.clients.openWindow(d)}).then(function(b){if(b)return delete c.notification,
	X(a,b,H(G.M,c))});b.waitUntil(e)}}};U.prototype.setBackgroundMessageHandler=function(a){if(a&&"function"!==typeof a)throw this.a.create(B.B);this.b=a};U.prototype.setBackgroundMessageHandler=U.prototype.setBackgroundMessageHandler;
	var ja=function(a){var b=(new URL(a)).href;return T.clients.matchAll({type:"window",includeUncontrolled:!0}).then(function(a){for(var c=null,e=0;e<a.length;e++)if((new URL(a[e].url)).href===b){c=a[e];break}if(c)return c.focus(),c})},X=function(a,b,c){return new Promise(function(d,e){if(!b)return e(a.a.create(B.P));b.postMessage(c);d()})},ha=function(){return T.clients.matchAll({type:"window",includeUncontrolled:!0}).then(function(a){return a.some(function(a){return"visible"===a.visibilityState})})},
	ia=function(a,b){return T.clients.matchAll({type:"window",includeUncontrolled:!0}).then(function(c){var d=H(G.T,b);return Promise.all(c.map(function(b){return X(a,b,d)}))})};U.prototype.f=function(){return Promise.resolve(T.registration)};var Y=function(a){var b=this;S.call(this,a);this.h=null;this.o=firebase.INTERNAL.createSubscribe(function(a){b.h=a});this.w=null;this.v=firebase.INTERNAL.createSubscribe(function(a){b.w=a});ka(this)};f(Y,S);
	Y.prototype.getToken=function(){var a=this;return"serviceWorker"in navigator&&"PushManager"in window&&"Notification"in window&&ServiceWorkerRegistration.prototype.hasOwnProperty("showNotification")&&PushSubscription.prototype.hasOwnProperty("getKey")?la(this).then(function(){return S.prototype.getToken.call(a)}):Promise.reject(this.a.create(B.Z))};Y.prototype.getToken=Y.prototype.getToken;
	var la=function(a){if(a.g)return a.g;var b=document.querySelector('link[rel="manifest"]');b?a.g=fetch(b.href).then(function(a){return a.json()}).catch(function(){return Promise.resolve()}).then(function(b){if(b&&b.gcm_sender_id&&"103953800507"!==b.gcm_sender_id)throw a.a.create(B.I);}):a.g=Promise.resolve();return a.g};
	Y.prototype.requestPermission=function(){var a=this;return"granted"===Notification.permission?Promise.resolve():new Promise(function(b,c){var d=function(d){return"granted"===d?b():"denied"===d?c(a.a.create(B.R)):c(a.a.create(B.S))},e=Notification.requestPermission(function(a){e||d(a)});e&&e.then(d)})};Y.prototype.requestPermission=Y.prototype.requestPermission;
	Y.prototype.useServiceWorker=function(a){if(!(a instanceof ServiceWorkerRegistration))throw this.a.create(B.m);if("undefined"!==typeof this.b)throw this.a.create(B.$);this.b=a};Y.prototype.useServiceWorker=Y.prototype.useServiceWorker;Y.prototype.onMessage=function(a,b,c){return this.o(a,b,c)};Y.prototype.onMessage=Y.prototype.onMessage;Y.prototype.onTokenRefresh=function(a,b,c){return this.v(a,b,c)};Y.prototype.onTokenRefresh=Y.prototype.onTokenRefresh;
	var Z=function(a,b){var c=b.installing||b.waiting||b.active;return new Promise(function(d,e){if(c)if("activated"===c.state)d(b);else if("redundant"===c.state)e(a.a.create(B.s));else{var g=function(){if("activated"===c.state)d(b);else if("redundant"===c.state)e(a.a.create(B.s));else return;c.removeEventListener("statechange",g)};c.addEventListener("statechange",g)}else e(a.a.create(B.O))})};
	Y.prototype.f=function(){var a=this;if(this.b)return Z(this,this.b);this.b=null;return navigator.serviceWorker.register("/firebase-messaging-sw.js",{scope:"/firebase-cloud-messaging-push-scope"}).catch(function(b){throw a.a.create(B.F,{browserErrorMessage:b.message});}).then(function(b){return Z(a,b).then(function(){a.b=b;b.update();return b})})};
	var ka=function(a){"serviceWorker"in navigator&&navigator.serviceWorker.addEventListener("message",function(b){if(b.data&&b.data[F.u])switch(b=b.data,b[F.u]){case G.T:case G.M:a.h.next(b[F.C])}},!1)};if(!(firebase&&firebase.INTERNAL&&firebase.INTERNAL.registerService))throw Error("Cannot install Firebase Messaging - be sure to load firebase-app.js first.");firebase.INTERNAL.registerService("messaging",function(a){return self&&"ServiceWorkerGlobalScope"in self?new U(a):new Y(a)},{Messaging:Y});})();
	module.exports = firebase.messaging;
	
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _controllers = __webpack_require__(21);
	
	var _firebase = __webpack_require__(13);
	
	/* eslint max-len : "off" */
	exports.default = function (ports) {
	  var db = (0, _firebase.getDb)();
	
	  var shipToElm = function shipToElm(obj) {
	    ports.roomStateUpdate.send(JSON.stringify(obj));
	  };
	
	  var subscribedRoomIds = [];
	
	  ports.sendGameCommand.subscribe(function (msgString) {
	    var _JSON$parse = JSON.parse(msgString),
	        type = _JSON$parse.type,
	        roomId = _JSON$parse.roomId,
	        payload = _JSON$parse.payload;
	
	    if (subscribedRoomIds.indexOf(roomId) === -1) {
	      (0, _controllers.watchRoom)(db, roomId, shipToElm);
	      subscribedRoomIds.push(roomId);
	    }
	    if (type === 'requestRoomState') {
	      return (0, _controllers.getRoom)(db, roomId).then(shipToElm);
	    }
	    if (type === 'requestNewRound') {
	      return (0, _controllers.scheduleNewRound)(db, payload).then(shipToElm);
	    }
	    if (type === 'player') {
	      (0, _controllers.updatePlayer)(db, roomId, payload);
	    }
	  });
	};

/***/ },
/* 21 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var wordsCache = void 0;
	
	function curry(fx) {
	  var arity = fx.length;
	  return function f1() {
	    var args = Array.prototype.slice.call(arguments, 0);
	    if (args.length >= arity) {
	      return fx.apply(null, args);
	    } else {
	      return function f2() {
	        var args2 = Array.prototype.slice.call(arguments, 0);
	        return f1.apply(null, args.concat(args2));
	      };
	    }
	  };
	}
	
	var getRoom = exports.getRoom = curry(function (db, roomId) {
	  return db.ref('/rooms/' + roomId).once('value').then(function (s) {
	    return s.val();
	  });
	});
	
	var listWords = exports.listWords = curry(function (db) {
	  if (wordsCache) {
	    return Promise.resolve(wordsCache);
	  }
	  return db.ref('/roundData/words').once('value').then(function (s) {
	    return Object.keys(s.val());
	  });
	});
	
	var saveRoom = exports.saveRoom = curry(function (db, rm) {
	  return Promise.all([Promise.resolve(rm), db.ref('/rooms/' + rm.id).set(rm)]).then(function (data) {
	    return data[0];
	  });
	});
	
	var watchRoom = exports.watchRoom = curry(function (db, roomId, onValue) {
	  return db.ref('/rooms/' + roomId).on('value', function (s) {
	    onValue(s.val());
	  });
	});
	
	var updatePlayer = exports.updatePlayer = curry(function (db, roomId, player) {
	  db.ref('/rooms/' + roomId + '/players/' + player.id).set(player);
	});
	
	var setNewRound = exports.setNewRound = curry(function (db, room) {
	  return listWords(db).then(function (words) {
	    return Object.assign({}, room, {
	      roundData: {
	        word: words[Math.floor(Math.random() * words.length)]
	      }
	    });
	  }).then(saveRoom(db));
	});
	
	var scheduleNewRound = exports.scheduleNewRound = curry(function (db, room) {
	  return new Promise(function (resolve, reject) {
	    setTimeout(function () {
	      setNewRound(db, room).then(resolve).catch(reject);
	    }, 3000);
	  });
	});

/***/ }
/******/ ]);
//# sourceMappingURL=index.js.map
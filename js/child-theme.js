/*!
  * Understrap v1.1.0 (https://understrap.com)
  * Copyright 2013-2022 The Understrap Authors (https://github.com/understrap/understrap/graphs/contributors)
  * Licensed under GPL (http://www.gnu.org/licenses/old-licenses/gpl-2.0.en.html)
  */
(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('https://unpkg.com/swiper@8/swiper-bundle.esm.browser.min.js')) :
	typeof define === 'function' && define.amd ? define(['exports', 'https://unpkg.com/swiper@8/swiper-bundle.esm.browser.min.js'], factory) :
	(global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.understrap = {}, global.Swiper));
})(this, (function (exports, Swiper) { 'use strict';

	function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

	var Swiper__default = /*#__PURE__*/_interopDefaultLegacy(Swiper);

	var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

	function getDefaultExportFromCjs (x) {
		return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
	}

	function getAugmentedNamespace(n) {
		if (n.__esModule) return n;
		var a = Object.defineProperty({}, '__esModule', {value: true});
		Object.keys(n).forEach(function (k) {
			var d = Object.getOwnPropertyDescriptor(n, k);
			Object.defineProperty(a, k, d.get ? d : {
				enumerable: true,
				get: function () {
					return n[k];
				}
			});
		});
		return a;
	}

	var alert$2 = {exports: {}};

	var eventHandler = {exports: {}};

	/*!
	  * Bootstrap event-handler.js v5.1.3 (https://getbootstrap.com/)
	  * Copyright 2011-2021 The Bootstrap Authors (https://github.com/twbs/bootstrap/graphs/contributors)
	  * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
	  */

	(function (module, exports) {
	(function (global, factory) {
	  module.exports = factory() ;
	})(commonjsGlobal, (function () {
	  /**
	   * --------------------------------------------------------------------------
	   * Bootstrap (v5.1.3): util/index.js
	   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
	   * --------------------------------------------------------------------------
	   */

	  const getjQuery = () => {
	    const {
	      jQuery
	    } = window;

	    if (jQuery && !document.body.hasAttribute('data-bs-no-jquery')) {
	      return jQuery;
	    }

	    return null;
	  };

	  /**
	   * --------------------------------------------------------------------------
	   * Bootstrap (v5.1.3): dom/event-handler.js
	   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
	   * --------------------------------------------------------------------------
	   */
	  /**
	   * ------------------------------------------------------------------------
	   * Constants
	   * ------------------------------------------------------------------------
	   */

	  const namespaceRegex = /[^.]*(?=\..*)\.|.*/;
	  const stripNameRegex = /\..*/;
	  const stripUidRegex = /::\d+$/;
	  const eventRegistry = {}; // Events storage

	  let uidEvent = 1;
	  const customEvents = {
	    mouseenter: 'mouseover',
	    mouseleave: 'mouseout'
	  };
	  const customEventsRegex = /^(mouseenter|mouseleave)/i;
	  const nativeEvents = new Set(['click', 'dblclick', 'mouseup', 'mousedown', 'contextmenu', 'mousewheel', 'DOMMouseScroll', 'mouseover', 'mouseout', 'mousemove', 'selectstart', 'selectend', 'keydown', 'keypress', 'keyup', 'orientationchange', 'touchstart', 'touchmove', 'touchend', 'touchcancel', 'pointerdown', 'pointermove', 'pointerup', 'pointerleave', 'pointercancel', 'gesturestart', 'gesturechange', 'gestureend', 'focus', 'blur', 'change', 'reset', 'select', 'submit', 'focusin', 'focusout', 'load', 'unload', 'beforeunload', 'resize', 'move', 'DOMContentLoaded', 'readystatechange', 'error', 'abort', 'scroll']);
	  /**
	   * ------------------------------------------------------------------------
	   * Private methods
	   * ------------------------------------------------------------------------
	   */

	  function getUidEvent(element, uid) {
	    return uid && `${uid}::${uidEvent++}` || element.uidEvent || uidEvent++;
	  }

	  function getEvent(element) {
	    const uid = getUidEvent(element);
	    element.uidEvent = uid;
	    eventRegistry[uid] = eventRegistry[uid] || {};
	    return eventRegistry[uid];
	  }

	  function bootstrapHandler(element, fn) {
	    return function handler(event) {
	      event.delegateTarget = element;

	      if (handler.oneOff) {
	        EventHandler.off(element, event.type, fn);
	      }

	      return fn.apply(element, [event]);
	    };
	  }

	  function bootstrapDelegationHandler(element, selector, fn) {
	    return function handler(event) {
	      const domElements = element.querySelectorAll(selector);

	      for (let {
	        target
	      } = event; target && target !== this; target = target.parentNode) {
	        for (let i = domElements.length; i--;) {
	          if (domElements[i] === target) {
	            event.delegateTarget = target;

	            if (handler.oneOff) {
	              EventHandler.off(element, event.type, selector, fn);
	            }

	            return fn.apply(target, [event]);
	          }
	        }
	      } // To please ESLint


	      return null;
	    };
	  }

	  function findHandler(events, handler, delegationSelector = null) {
	    const uidEventList = Object.keys(events);

	    for (let i = 0, len = uidEventList.length; i < len; i++) {
	      const event = events[uidEventList[i]];

	      if (event.originalHandler === handler && event.delegationSelector === delegationSelector) {
	        return event;
	      }
	    }

	    return null;
	  }

	  function normalizeParams(originalTypeEvent, handler, delegationFn) {
	    const delegation = typeof handler === 'string';
	    const originalHandler = delegation ? delegationFn : handler;
	    let typeEvent = getTypeEvent(originalTypeEvent);
	    const isNative = nativeEvents.has(typeEvent);

	    if (!isNative) {
	      typeEvent = originalTypeEvent;
	    }

	    return [delegation, originalHandler, typeEvent];
	  }

	  function addHandler(element, originalTypeEvent, handler, delegationFn, oneOff) {
	    if (typeof originalTypeEvent !== 'string' || !element) {
	      return;
	    }

	    if (!handler) {
	      handler = delegationFn;
	      delegationFn = null;
	    } // in case of mouseenter or mouseleave wrap the handler within a function that checks for its DOM position
	    // this prevents the handler from being dispatched the same way as mouseover or mouseout does


	    if (customEventsRegex.test(originalTypeEvent)) {
	      const wrapFn = fn => {
	        return function (event) {
	          if (!event.relatedTarget || event.relatedTarget !== event.delegateTarget && !event.delegateTarget.contains(event.relatedTarget)) {
	            return fn.call(this, event);
	          }
	        };
	      };

	      if (delegationFn) {
	        delegationFn = wrapFn(delegationFn);
	      } else {
	        handler = wrapFn(handler);
	      }
	    }

	    const [delegation, originalHandler, typeEvent] = normalizeParams(originalTypeEvent, handler, delegationFn);
	    const events = getEvent(element);
	    const handlers = events[typeEvent] || (events[typeEvent] = {});
	    const previousFn = findHandler(handlers, originalHandler, delegation ? handler : null);

	    if (previousFn) {
	      previousFn.oneOff = previousFn.oneOff && oneOff;
	      return;
	    }

	    const uid = getUidEvent(originalHandler, originalTypeEvent.replace(namespaceRegex, ''));
	    const fn = delegation ? bootstrapDelegationHandler(element, handler, delegationFn) : bootstrapHandler(element, handler);
	    fn.delegationSelector = delegation ? handler : null;
	    fn.originalHandler = originalHandler;
	    fn.oneOff = oneOff;
	    fn.uidEvent = uid;
	    handlers[uid] = fn;
	    element.addEventListener(typeEvent, fn, delegation);
	  }

	  function removeHandler(element, events, typeEvent, handler, delegationSelector) {
	    const fn = findHandler(events[typeEvent], handler, delegationSelector);

	    if (!fn) {
	      return;
	    }

	    element.removeEventListener(typeEvent, fn, Boolean(delegationSelector));
	    delete events[typeEvent][fn.uidEvent];
	  }

	  function removeNamespacedHandlers(element, events, typeEvent, namespace) {
	    const storeElementEvent = events[typeEvent] || {};
	    Object.keys(storeElementEvent).forEach(handlerKey => {
	      if (handlerKey.includes(namespace)) {
	        const event = storeElementEvent[handlerKey];
	        removeHandler(element, events, typeEvent, event.originalHandler, event.delegationSelector);
	      }
	    });
	  }

	  function getTypeEvent(event) {
	    // allow to get the native events from namespaced events ('click.bs.button' --> 'click')
	    event = event.replace(stripNameRegex, '');
	    return customEvents[event] || event;
	  }

	  const EventHandler = {
	    on(element, event, handler, delegationFn) {
	      addHandler(element, event, handler, delegationFn, false);
	    },

	    one(element, event, handler, delegationFn) {
	      addHandler(element, event, handler, delegationFn, true);
	    },

	    off(element, originalTypeEvent, handler, delegationFn) {
	      if (typeof originalTypeEvent !== 'string' || !element) {
	        return;
	      }

	      const [delegation, originalHandler, typeEvent] = normalizeParams(originalTypeEvent, handler, delegationFn);
	      const inNamespace = typeEvent !== originalTypeEvent;
	      const events = getEvent(element);
	      const isNamespace = originalTypeEvent.startsWith('.');

	      if (typeof originalHandler !== 'undefined') {
	        // Simplest case: handler is passed, remove that listener ONLY.
	        if (!events || !events[typeEvent]) {
	          return;
	        }

	        removeHandler(element, events, typeEvent, originalHandler, delegation ? handler : null);
	        return;
	      }

	      if (isNamespace) {
	        Object.keys(events).forEach(elementEvent => {
	          removeNamespacedHandlers(element, events, elementEvent, originalTypeEvent.slice(1));
	        });
	      }

	      const storeElementEvent = events[typeEvent] || {};
	      Object.keys(storeElementEvent).forEach(keyHandlers => {
	        const handlerKey = keyHandlers.replace(stripUidRegex, '');

	        if (!inNamespace || originalTypeEvent.includes(handlerKey)) {
	          const event = storeElementEvent[keyHandlers];
	          removeHandler(element, events, typeEvent, event.originalHandler, event.delegationSelector);
	        }
	      });
	    },

	    trigger(element, event, args) {
	      if (typeof event !== 'string' || !element) {
	        return null;
	      }

	      const $ = getjQuery();
	      const typeEvent = getTypeEvent(event);
	      const inNamespace = event !== typeEvent;
	      const isNative = nativeEvents.has(typeEvent);
	      let jQueryEvent;
	      let bubbles = true;
	      let nativeDispatch = true;
	      let defaultPrevented = false;
	      let evt = null;

	      if (inNamespace && $) {
	        jQueryEvent = $.Event(event, args);
	        $(element).trigger(jQueryEvent);
	        bubbles = !jQueryEvent.isPropagationStopped();
	        nativeDispatch = !jQueryEvent.isImmediatePropagationStopped();
	        defaultPrevented = jQueryEvent.isDefaultPrevented();
	      }

	      if (isNative) {
	        evt = document.createEvent('HTMLEvents');
	        evt.initEvent(typeEvent, bubbles, true);
	      } else {
	        evt = new CustomEvent(event, {
	          bubbles,
	          cancelable: true
	        });
	      } // merge custom information in our event


	      if (typeof args !== 'undefined') {
	        Object.keys(args).forEach(key => {
	          Object.defineProperty(evt, key, {
	            get() {
	              return args[key];
	            }

	          });
	        });
	      }

	      if (defaultPrevented) {
	        evt.preventDefault();
	      }

	      if (nativeDispatch) {
	        element.dispatchEvent(evt);
	      }

	      if (evt.defaultPrevented && typeof jQueryEvent !== 'undefined') {
	        jQueryEvent.preventDefault();
	      }

	      return evt;
	    }

	  };

	  return EventHandler;

	}));

	}(eventHandler));

	var baseComponent = {exports: {}};

	var data = {exports: {}};

	/*!
	  * Bootstrap data.js v5.1.3 (https://getbootstrap.com/)
	  * Copyright 2011-2021 The Bootstrap Authors (https://github.com/twbs/bootstrap/graphs/contributors)
	  * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
	  */

	(function (module, exports) {
	(function (global, factory) {
	  module.exports = factory() ;
	})(commonjsGlobal, (function () {
	  /**
	   * --------------------------------------------------------------------------
	   * Bootstrap (v5.1.3): dom/data.js
	   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
	   * --------------------------------------------------------------------------
	   */

	  /**
	   * ------------------------------------------------------------------------
	   * Constants
	   * ------------------------------------------------------------------------
	   */
	  const elementMap = new Map();
	  const data = {
	    set(element, key, instance) {
	      if (!elementMap.has(element)) {
	        elementMap.set(element, new Map());
	      }

	      const instanceMap = elementMap.get(element); // make it clear we only want one instance per element
	      // can be removed later when multiple key/instances are fine to be used

	      if (!instanceMap.has(key) && instanceMap.size !== 0) {
	        // eslint-disable-next-line no-console
	        console.error(`Bootstrap doesn't allow more than one instance per element. Bound instance: ${Array.from(instanceMap.keys())[0]}.`);
	        return;
	      }

	      instanceMap.set(key, instance);
	    },

	    get(element, key) {
	      if (elementMap.has(element)) {
	        return elementMap.get(element).get(key) || null;
	      }

	      return null;
	    },

	    remove(element, key) {
	      if (!elementMap.has(element)) {
	        return;
	      }

	      const instanceMap = elementMap.get(element);
	      instanceMap.delete(key); // free up element references if there are no instances left for an element

	      if (instanceMap.size === 0) {
	        elementMap.delete(element);
	      }
	    }

	  };

	  return data;

	}));

	}(data));

	/*!
	  * Bootstrap base-component.js v5.1.3 (https://getbootstrap.com/)
	  * Copyright 2011-2021 The Bootstrap Authors (https://github.com/twbs/bootstrap/graphs/contributors)
	  * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
	  */

	(function (module, exports) {
	(function (global, factory) {
	  module.exports = factory(data.exports, eventHandler.exports) ;
	})(commonjsGlobal, (function (Data, EventHandler) {
	  const _interopDefaultLegacy = e => e && typeof e === 'object' && 'default' in e ? e : { default: e };

	  const Data__default = /*#__PURE__*/_interopDefaultLegacy(Data);
	  const EventHandler__default = /*#__PURE__*/_interopDefaultLegacy(EventHandler);

	  /**
	   * --------------------------------------------------------------------------
	   * Bootstrap (v5.1.3): util/index.js
	   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
	   * --------------------------------------------------------------------------
	   */
	  const MILLISECONDS_MULTIPLIER = 1000;
	  const TRANSITION_END = 'transitionend'; // Shoutout AngusCroll (https://goo.gl/pxwQGp)

	  const getTransitionDurationFromElement = element => {
	    if (!element) {
	      return 0;
	    } // Get transition-duration of the element


	    let {
	      transitionDuration,
	      transitionDelay
	    } = window.getComputedStyle(element);
	    const floatTransitionDuration = Number.parseFloat(transitionDuration);
	    const floatTransitionDelay = Number.parseFloat(transitionDelay); // Return 0 if element or transition duration is not found

	    if (!floatTransitionDuration && !floatTransitionDelay) {
	      return 0;
	    } // If multiple durations are defined, take the first


	    transitionDuration = transitionDuration.split(',')[0];
	    transitionDelay = transitionDelay.split(',')[0];
	    return (Number.parseFloat(transitionDuration) + Number.parseFloat(transitionDelay)) * MILLISECONDS_MULTIPLIER;
	  };

	  const triggerTransitionEnd = element => {
	    element.dispatchEvent(new Event(TRANSITION_END));
	  };

	  const isElement = obj => {
	    if (!obj || typeof obj !== 'object') {
	      return false;
	    }

	    if (typeof obj.jquery !== 'undefined') {
	      obj = obj[0];
	    }

	    return typeof obj.nodeType !== 'undefined';
	  };

	  const getElement = obj => {
	    if (isElement(obj)) {
	      // it's a jQuery object or a node element
	      return obj.jquery ? obj[0] : obj;
	    }

	    if (typeof obj === 'string' && obj.length > 0) {
	      return document.querySelector(obj);
	    }

	    return null;
	  };

	  const execute = callback => {
	    if (typeof callback === 'function') {
	      callback();
	    }
	  };

	  const executeAfterTransition = (callback, transitionElement, waitForTransition = true) => {
	    if (!waitForTransition) {
	      execute(callback);
	      return;
	    }

	    const durationPadding = 5;
	    const emulatedDuration = getTransitionDurationFromElement(transitionElement) + durationPadding;
	    let called = false;

	    const handler = ({
	      target
	    }) => {
	      if (target !== transitionElement) {
	        return;
	      }

	      called = true;
	      transitionElement.removeEventListener(TRANSITION_END, handler);
	      execute(callback);
	    };

	    transitionElement.addEventListener(TRANSITION_END, handler);
	    setTimeout(() => {
	      if (!called) {
	        triggerTransitionEnd(transitionElement);
	      }
	    }, emulatedDuration);
	  };

	  /**
	   * --------------------------------------------------------------------------
	   * Bootstrap (v5.1.3): base-component.js
	   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
	   * --------------------------------------------------------------------------
	   */
	  /**
	   * ------------------------------------------------------------------------
	   * Constants
	   * ------------------------------------------------------------------------
	   */

	  const VERSION = '5.1.3';

	  class BaseComponent {
	    constructor(element) {
	      element = getElement(element);

	      if (!element) {
	        return;
	      }

	      this._element = element;
	      Data__default.default.set(this._element, this.constructor.DATA_KEY, this);
	    }

	    dispose() {
	      Data__default.default.remove(this._element, this.constructor.DATA_KEY);
	      EventHandler__default.default.off(this._element, this.constructor.EVENT_KEY);
	      Object.getOwnPropertyNames(this).forEach(propertyName => {
	        this[propertyName] = null;
	      });
	    }

	    _queueCallback(callback, element, isAnimated = true) {
	      executeAfterTransition(callback, element, isAnimated);
	    }
	    /** Static */


	    static getInstance(element) {
	      return Data__default.default.get(getElement(element), this.DATA_KEY);
	    }

	    static getOrCreateInstance(element, config = {}) {
	      return this.getInstance(element) || new this(element, typeof config === 'object' ? config : null);
	    }

	    static get VERSION() {
	      return VERSION;
	    }

	    static get NAME() {
	      throw new Error('You have to implement the static method "NAME", for each component!');
	    }

	    static get DATA_KEY() {
	      return `bs.${this.NAME}`;
	    }

	    static get EVENT_KEY() {
	      return `.${this.DATA_KEY}`;
	    }

	  }

	  return BaseComponent;

	}));

	}(baseComponent));

	/*!
	  * Bootstrap alert.js v5.1.3 (https://getbootstrap.com/)
	  * Copyright 2011-2021 The Bootstrap Authors (https://github.com/twbs/bootstrap/graphs/contributors)
	  * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
	  */

	(function (module, exports) {
	(function (global, factory) {
	  module.exports = factory(eventHandler.exports, baseComponent.exports) ;
	})(commonjsGlobal, (function (EventHandler, BaseComponent) {
	  const _interopDefaultLegacy = e => e && typeof e === 'object' && 'default' in e ? e : { default: e };

	  const EventHandler__default = /*#__PURE__*/_interopDefaultLegacy(EventHandler);
	  const BaseComponent__default = /*#__PURE__*/_interopDefaultLegacy(BaseComponent);

	  /**
	   * --------------------------------------------------------------------------
	   * Bootstrap (v5.1.3): util/index.js
	   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
	   * --------------------------------------------------------------------------
	   */

	  const getSelector = element => {
	    let selector = element.getAttribute('data-bs-target');

	    if (!selector || selector === '#') {
	      let hrefAttr = element.getAttribute('href'); // The only valid content that could double as a selector are IDs or classes,
	      // so everything starting with `#` or `.`. If a "real" URL is used as the selector,
	      // `document.querySelector` will rightfully complain it is invalid.
	      // See https://github.com/twbs/bootstrap/issues/32273

	      if (!hrefAttr || !hrefAttr.includes('#') && !hrefAttr.startsWith('.')) {
	        return null;
	      } // Just in case some CMS puts out a full URL with the anchor appended


	      if (hrefAttr.includes('#') && !hrefAttr.startsWith('#')) {
	        hrefAttr = `#${hrefAttr.split('#')[1]}`;
	      }

	      selector = hrefAttr && hrefAttr !== '#' ? hrefAttr.trim() : null;
	    }

	    return selector;
	  };

	  const getElementFromSelector = element => {
	    const selector = getSelector(element);
	    return selector ? document.querySelector(selector) : null;
	  };

	  const isDisabled = element => {
	    if (!element || element.nodeType !== Node.ELEMENT_NODE) {
	      return true;
	    }

	    if (element.classList.contains('disabled')) {
	      return true;
	    }

	    if (typeof element.disabled !== 'undefined') {
	      return element.disabled;
	    }

	    return element.hasAttribute('disabled') && element.getAttribute('disabled') !== 'false';
	  };

	  const getjQuery = () => {
	    const {
	      jQuery
	    } = window;

	    if (jQuery && !document.body.hasAttribute('data-bs-no-jquery')) {
	      return jQuery;
	    }

	    return null;
	  };

	  const DOMContentLoadedCallbacks = [];

	  const onDOMContentLoaded = callback => {
	    if (document.readyState === 'loading') {
	      // add listener on the first call when the document is in loading state
	      if (!DOMContentLoadedCallbacks.length) {
	        document.addEventListener('DOMContentLoaded', () => {
	          DOMContentLoadedCallbacks.forEach(callback => callback());
	        });
	      }

	      DOMContentLoadedCallbacks.push(callback);
	    } else {
	      callback();
	    }
	  };

	  const defineJQueryPlugin = plugin => {
	    onDOMContentLoaded(() => {
	      const $ = getjQuery();
	      /* istanbul ignore if */

	      if ($) {
	        const name = plugin.NAME;
	        const JQUERY_NO_CONFLICT = $.fn[name];
	        $.fn[name] = plugin.jQueryInterface;
	        $.fn[name].Constructor = plugin;

	        $.fn[name].noConflict = () => {
	          $.fn[name] = JQUERY_NO_CONFLICT;
	          return plugin.jQueryInterface;
	        };
	      }
	    });
	  };

	  /**
	   * --------------------------------------------------------------------------
	   * Bootstrap (v5.1.3): util/component-functions.js
	   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
	   * --------------------------------------------------------------------------
	   */

	  const enableDismissTrigger = (component, method = 'hide') => {
	    const clickEvent = `click.dismiss${component.EVENT_KEY}`;
	    const name = component.NAME;
	    EventHandler__default.default.on(document, clickEvent, `[data-bs-dismiss="${name}"]`, function (event) {
	      if (['A', 'AREA'].includes(this.tagName)) {
	        event.preventDefault();
	      }

	      if (isDisabled(this)) {
	        return;
	      }

	      const target = getElementFromSelector(this) || this.closest(`.${name}`);
	      const instance = component.getOrCreateInstance(target); // Method argument is left, for Alert and only, as it doesn't implement the 'hide' method

	      instance[method]();
	    });
	  };

	  /**
	   * --------------------------------------------------------------------------
	   * Bootstrap (v5.1.3): alert.js
	   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
	   * --------------------------------------------------------------------------
	   */
	  /**
	   * ------------------------------------------------------------------------
	   * Constants
	   * ------------------------------------------------------------------------
	   */

	  const NAME = 'alert';
	  const DATA_KEY = 'bs.alert';
	  const EVENT_KEY = `.${DATA_KEY}`;
	  const EVENT_CLOSE = `close${EVENT_KEY}`;
	  const EVENT_CLOSED = `closed${EVENT_KEY}`;
	  const CLASS_NAME_FADE = 'fade';
	  const CLASS_NAME_SHOW = 'show';
	  /**
	   * ------------------------------------------------------------------------
	   * Class Definition
	   * ------------------------------------------------------------------------
	   */

	  class Alert extends BaseComponent__default.default {
	    // Getters
	    static get NAME() {
	      return NAME;
	    } // Public


	    close() {
	      const closeEvent = EventHandler__default.default.trigger(this._element, EVENT_CLOSE);

	      if (closeEvent.defaultPrevented) {
	        return;
	      }

	      this._element.classList.remove(CLASS_NAME_SHOW);

	      const isAnimated = this._element.classList.contains(CLASS_NAME_FADE);

	      this._queueCallback(() => this._destroyElement(), this._element, isAnimated);
	    } // Private


	    _destroyElement() {
	      this._element.remove();

	      EventHandler__default.default.trigger(this._element, EVENT_CLOSED);
	      this.dispose();
	    } // Static


	    static jQueryInterface(config) {
	      return this.each(function () {
	        const data = Alert.getOrCreateInstance(this);

	        if (typeof config !== 'string') {
	          return;
	        }

	        if (data[config] === undefined || config.startsWith('_') || config === 'constructor') {
	          throw new TypeError(`No method named "${config}"`);
	        }

	        data[config](this);
	      });
	    }

	  }
	  /**
	   * ------------------------------------------------------------------------
	   * Data Api implementation
	   * ------------------------------------------------------------------------
	   */


	  enableDismissTrigger(Alert, 'close');
	  /**
	   * ------------------------------------------------------------------------
	   * jQuery
	   * ------------------------------------------------------------------------
	   * add .Alert to jQuery only if jQuery is present
	   */

	  defineJQueryPlugin(Alert);

	  return Alert;

	}));

	}(alert$2));

	var alert$1 = alert$2.exports;

	var button$1 = {exports: {}};

	/*!
	  * Bootstrap button.js v5.1.3 (https://getbootstrap.com/)
	  * Copyright 2011-2021 The Bootstrap Authors (https://github.com/twbs/bootstrap/graphs/contributors)
	  * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
	  */

	(function (module, exports) {
	(function (global, factory) {
	  module.exports = factory(eventHandler.exports, baseComponent.exports) ;
	})(commonjsGlobal, (function (EventHandler, BaseComponent) {
	  const _interopDefaultLegacy = e => e && typeof e === 'object' && 'default' in e ? e : { default: e };

	  const EventHandler__default = /*#__PURE__*/_interopDefaultLegacy(EventHandler);
	  const BaseComponent__default = /*#__PURE__*/_interopDefaultLegacy(BaseComponent);

	  /**
	   * --------------------------------------------------------------------------
	   * Bootstrap (v5.1.3): util/index.js
	   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
	   * --------------------------------------------------------------------------
	   */

	  const getjQuery = () => {
	    const {
	      jQuery
	    } = window;

	    if (jQuery && !document.body.hasAttribute('data-bs-no-jquery')) {
	      return jQuery;
	    }

	    return null;
	  };

	  const DOMContentLoadedCallbacks = [];

	  const onDOMContentLoaded = callback => {
	    if (document.readyState === 'loading') {
	      // add listener on the first call when the document is in loading state
	      if (!DOMContentLoadedCallbacks.length) {
	        document.addEventListener('DOMContentLoaded', () => {
	          DOMContentLoadedCallbacks.forEach(callback => callback());
	        });
	      }

	      DOMContentLoadedCallbacks.push(callback);
	    } else {
	      callback();
	    }
	  };

	  const defineJQueryPlugin = plugin => {
	    onDOMContentLoaded(() => {
	      const $ = getjQuery();
	      /* istanbul ignore if */

	      if ($) {
	        const name = plugin.NAME;
	        const JQUERY_NO_CONFLICT = $.fn[name];
	        $.fn[name] = plugin.jQueryInterface;
	        $.fn[name].Constructor = plugin;

	        $.fn[name].noConflict = () => {
	          $.fn[name] = JQUERY_NO_CONFLICT;
	          return plugin.jQueryInterface;
	        };
	      }
	    });
	  };

	  /**
	   * --------------------------------------------------------------------------
	   * Bootstrap (v5.1.3): button.js
	   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
	   * --------------------------------------------------------------------------
	   */
	  /**
	   * ------------------------------------------------------------------------
	   * Constants
	   * ------------------------------------------------------------------------
	   */

	  const NAME = 'button';
	  const DATA_KEY = 'bs.button';
	  const EVENT_KEY = `.${DATA_KEY}`;
	  const DATA_API_KEY = '.data-api';
	  const CLASS_NAME_ACTIVE = 'active';
	  const SELECTOR_DATA_TOGGLE = '[data-bs-toggle="button"]';
	  const EVENT_CLICK_DATA_API = `click${EVENT_KEY}${DATA_API_KEY}`;
	  /**
	   * ------------------------------------------------------------------------
	   * Class Definition
	   * ------------------------------------------------------------------------
	   */

	  class Button extends BaseComponent__default.default {
	    // Getters
	    static get NAME() {
	      return NAME;
	    } // Public


	    toggle() {
	      // Toggle class and sync the `aria-pressed` attribute with the return value of the `.toggle()` method
	      this._element.setAttribute('aria-pressed', this._element.classList.toggle(CLASS_NAME_ACTIVE));
	    } // Static


	    static jQueryInterface(config) {
	      return this.each(function () {
	        const data = Button.getOrCreateInstance(this);

	        if (config === 'toggle') {
	          data[config]();
	        }
	      });
	    }

	  }
	  /**
	   * ------------------------------------------------------------------------
	   * Data Api implementation
	   * ------------------------------------------------------------------------
	   */


	  EventHandler__default.default.on(document, EVENT_CLICK_DATA_API, SELECTOR_DATA_TOGGLE, event => {
	    event.preventDefault();
	    const button = event.target.closest(SELECTOR_DATA_TOGGLE);
	    const data = Button.getOrCreateInstance(button);
	    data.toggle();
	  });
	  /**
	   * ------------------------------------------------------------------------
	   * jQuery
	   * ------------------------------------------------------------------------
	   * add .Button to jQuery only if jQuery is present
	   */

	  defineJQueryPlugin(Button);

	  return Button;

	}));

	}(button$1));

	var button = button$1.exports;

	var carousel$1 = {exports: {}};

	var manipulator = {exports: {}};

	/*!
	  * Bootstrap manipulator.js v5.1.3 (https://getbootstrap.com/)
	  * Copyright 2011-2021 The Bootstrap Authors (https://github.com/twbs/bootstrap/graphs/contributors)
	  * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
	  */

	(function (module, exports) {
	(function (global, factory) {
	  module.exports = factory() ;
	})(commonjsGlobal, (function () {
	  /**
	   * --------------------------------------------------------------------------
	   * Bootstrap (v5.1.3): dom/manipulator.js
	   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
	   * --------------------------------------------------------------------------
	   */
	  function normalizeData(val) {
	    if (val === 'true') {
	      return true;
	    }

	    if (val === 'false') {
	      return false;
	    }

	    if (val === Number(val).toString()) {
	      return Number(val);
	    }

	    if (val === '' || val === 'null') {
	      return null;
	    }

	    return val;
	  }

	  function normalizeDataKey(key) {
	    return key.replace(/[A-Z]/g, chr => `-${chr.toLowerCase()}`);
	  }

	  const Manipulator = {
	    setDataAttribute(element, key, value) {
	      element.setAttribute(`data-bs-${normalizeDataKey(key)}`, value);
	    },

	    removeDataAttribute(element, key) {
	      element.removeAttribute(`data-bs-${normalizeDataKey(key)}`);
	    },

	    getDataAttributes(element) {
	      if (!element) {
	        return {};
	      }

	      const attributes = {};
	      Object.keys(element.dataset).filter(key => key.startsWith('bs')).forEach(key => {
	        let pureKey = key.replace(/^bs/, '');
	        pureKey = pureKey.charAt(0).toLowerCase() + pureKey.slice(1, pureKey.length);
	        attributes[pureKey] = normalizeData(element.dataset[key]);
	      });
	      return attributes;
	    },

	    getDataAttribute(element, key) {
	      return normalizeData(element.getAttribute(`data-bs-${normalizeDataKey(key)}`));
	    },

	    offset(element) {
	      const rect = element.getBoundingClientRect();
	      return {
	        top: rect.top + window.pageYOffset,
	        left: rect.left + window.pageXOffset
	      };
	    },

	    position(element) {
	      return {
	        top: element.offsetTop,
	        left: element.offsetLeft
	      };
	    }

	  };

	  return Manipulator;

	}));

	}(manipulator));

	var selectorEngine = {exports: {}};

	/*!
	  * Bootstrap selector-engine.js v5.1.3 (https://getbootstrap.com/)
	  * Copyright 2011-2021 The Bootstrap Authors (https://github.com/twbs/bootstrap/graphs/contributors)
	  * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
	  */

	(function (module, exports) {
	(function (global, factory) {
	  module.exports = factory() ;
	})(commonjsGlobal, (function () {
	  /**
	   * --------------------------------------------------------------------------
	   * Bootstrap (v5.1.3): util/index.js
	   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
	   * --------------------------------------------------------------------------
	   */

	  const isElement = obj => {
	    if (!obj || typeof obj !== 'object') {
	      return false;
	    }

	    if (typeof obj.jquery !== 'undefined') {
	      obj = obj[0];
	    }

	    return typeof obj.nodeType !== 'undefined';
	  };

	  const isVisible = element => {
	    if (!isElement(element) || element.getClientRects().length === 0) {
	      return false;
	    }

	    return getComputedStyle(element).getPropertyValue('visibility') === 'visible';
	  };

	  const isDisabled = element => {
	    if (!element || element.nodeType !== Node.ELEMENT_NODE) {
	      return true;
	    }

	    if (element.classList.contains('disabled')) {
	      return true;
	    }

	    if (typeof element.disabled !== 'undefined') {
	      return element.disabled;
	    }

	    return element.hasAttribute('disabled') && element.getAttribute('disabled') !== 'false';
	  };

	  /**
	   * --------------------------------------------------------------------------
	   * Bootstrap (v5.1.3): dom/selector-engine.js
	   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
	   * --------------------------------------------------------------------------
	   */
	  const NODE_TEXT = 3;
	  const SelectorEngine = {
	    find(selector, element = document.documentElement) {
	      return [].concat(...Element.prototype.querySelectorAll.call(element, selector));
	    },

	    findOne(selector, element = document.documentElement) {
	      return Element.prototype.querySelector.call(element, selector);
	    },

	    children(element, selector) {
	      return [].concat(...element.children).filter(child => child.matches(selector));
	    },

	    parents(element, selector) {
	      const parents = [];
	      let ancestor = element.parentNode;

	      while (ancestor && ancestor.nodeType === Node.ELEMENT_NODE && ancestor.nodeType !== NODE_TEXT) {
	        if (ancestor.matches(selector)) {
	          parents.push(ancestor);
	        }

	        ancestor = ancestor.parentNode;
	      }

	      return parents;
	    },

	    prev(element, selector) {
	      let previous = element.previousElementSibling;

	      while (previous) {
	        if (previous.matches(selector)) {
	          return [previous];
	        }

	        previous = previous.previousElementSibling;
	      }

	      return [];
	    },

	    next(element, selector) {
	      let next = element.nextElementSibling;

	      while (next) {
	        if (next.matches(selector)) {
	          return [next];
	        }

	        next = next.nextElementSibling;
	      }

	      return [];
	    },

	    focusableChildren(element) {
	      const focusables = ['a', 'button', 'input', 'textarea', 'select', 'details', '[tabindex]', '[contenteditable="true"]'].map(selector => `${selector}:not([tabindex^="-"])`).join(', ');
	      return this.find(focusables, element).filter(el => !isDisabled(el) && isVisible(el));
	    }

	  };

	  return SelectorEngine;

	}));

	}(selectorEngine));

	/*!
	  * Bootstrap carousel.js v5.1.3 (https://getbootstrap.com/)
	  * Copyright 2011-2021 The Bootstrap Authors (https://github.com/twbs/bootstrap/graphs/contributors)
	  * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
	  */

	(function (module, exports) {
	(function (global, factory) {
	  module.exports = factory(eventHandler.exports, manipulator.exports, selectorEngine.exports, baseComponent.exports) ;
	})(commonjsGlobal, (function (EventHandler, Manipulator, SelectorEngine, BaseComponent) {
	  const _interopDefaultLegacy = e => e && typeof e === 'object' && 'default' in e ? e : { default: e };

	  const EventHandler__default = /*#__PURE__*/_interopDefaultLegacy(EventHandler);
	  const Manipulator__default = /*#__PURE__*/_interopDefaultLegacy(Manipulator);
	  const SelectorEngine__default = /*#__PURE__*/_interopDefaultLegacy(SelectorEngine);
	  const BaseComponent__default = /*#__PURE__*/_interopDefaultLegacy(BaseComponent);

	  /**
	   * --------------------------------------------------------------------------
	   * Bootstrap (v5.1.3): util/index.js
	   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
	   * --------------------------------------------------------------------------
	   */
	  const TRANSITION_END = 'transitionend'; // Shoutout AngusCroll (https://goo.gl/pxwQGp)

	  const toType = obj => {
	    if (obj === null || obj === undefined) {
	      return `${obj}`;
	    }

	    return {}.toString.call(obj).match(/\s([a-z]+)/i)[1].toLowerCase();
	  };

	  const getSelector = element => {
	    let selector = element.getAttribute('data-bs-target');

	    if (!selector || selector === '#') {
	      let hrefAttr = element.getAttribute('href'); // The only valid content that could double as a selector are IDs or classes,
	      // so everything starting with `#` or `.`. If a "real" URL is used as the selector,
	      // `document.querySelector` will rightfully complain it is invalid.
	      // See https://github.com/twbs/bootstrap/issues/32273

	      if (!hrefAttr || !hrefAttr.includes('#') && !hrefAttr.startsWith('.')) {
	        return null;
	      } // Just in case some CMS puts out a full URL with the anchor appended


	      if (hrefAttr.includes('#') && !hrefAttr.startsWith('#')) {
	        hrefAttr = `#${hrefAttr.split('#')[1]}`;
	      }

	      selector = hrefAttr && hrefAttr !== '#' ? hrefAttr.trim() : null;
	    }

	    return selector;
	  };

	  const getElementFromSelector = element => {
	    const selector = getSelector(element);
	    return selector ? document.querySelector(selector) : null;
	  };

	  const triggerTransitionEnd = element => {
	    element.dispatchEvent(new Event(TRANSITION_END));
	  };

	  const isElement = obj => {
	    if (!obj || typeof obj !== 'object') {
	      return false;
	    }

	    if (typeof obj.jquery !== 'undefined') {
	      obj = obj[0];
	    }

	    return typeof obj.nodeType !== 'undefined';
	  };

	  const typeCheckConfig = (componentName, config, configTypes) => {
	    Object.keys(configTypes).forEach(property => {
	      const expectedTypes = configTypes[property];
	      const value = config[property];
	      const valueType = value && isElement(value) ? 'element' : toType(value);

	      if (!new RegExp(expectedTypes).test(valueType)) {
	        throw new TypeError(`${componentName.toUpperCase()}: Option "${property}" provided type "${valueType}" but expected type "${expectedTypes}".`);
	      }
	    });
	  };

	  const isVisible = element => {
	    if (!isElement(element) || element.getClientRects().length === 0) {
	      return false;
	    }

	    return getComputedStyle(element).getPropertyValue('visibility') === 'visible';
	  };
	  /**
	   * Trick to restart an element's animation
	   *
	   * @param {HTMLElement} element
	   * @return void
	   *
	   * @see https://www.charistheo.io/blog/2021/02/restart-a-css-animation-with-javascript/#restarting-a-css-animation
	   */


	  const reflow = element => {
	    // eslint-disable-next-line no-unused-expressions
	    element.offsetHeight;
	  };

	  const getjQuery = () => {
	    const {
	      jQuery
	    } = window;

	    if (jQuery && !document.body.hasAttribute('data-bs-no-jquery')) {
	      return jQuery;
	    }

	    return null;
	  };

	  const DOMContentLoadedCallbacks = [];

	  const onDOMContentLoaded = callback => {
	    if (document.readyState === 'loading') {
	      // add listener on the first call when the document is in loading state
	      if (!DOMContentLoadedCallbacks.length) {
	        document.addEventListener('DOMContentLoaded', () => {
	          DOMContentLoadedCallbacks.forEach(callback => callback());
	        });
	      }

	      DOMContentLoadedCallbacks.push(callback);
	    } else {
	      callback();
	    }
	  };

	  const isRTL = () => document.documentElement.dir === 'rtl';

	  const defineJQueryPlugin = plugin => {
	    onDOMContentLoaded(() => {
	      const $ = getjQuery();
	      /* istanbul ignore if */

	      if ($) {
	        const name = plugin.NAME;
	        const JQUERY_NO_CONFLICT = $.fn[name];
	        $.fn[name] = plugin.jQueryInterface;
	        $.fn[name].Constructor = plugin;

	        $.fn[name].noConflict = () => {
	          $.fn[name] = JQUERY_NO_CONFLICT;
	          return plugin.jQueryInterface;
	        };
	      }
	    });
	  };
	  /**
	   * Return the previous/next element of a list.
	   *
	   * @param {array} list    The list of elements
	   * @param activeElement   The active element
	   * @param shouldGetNext   Choose to get next or previous element
	   * @param isCycleAllowed
	   * @return {Element|elem} The proper element
	   */


	  const getNextActiveElement = (list, activeElement, shouldGetNext, isCycleAllowed) => {
	    let index = list.indexOf(activeElement); // if the element does not exist in the list return an element depending on the direction and if cycle is allowed

	    if (index === -1) {
	      return list[!shouldGetNext && isCycleAllowed ? list.length - 1 : 0];
	    }

	    const listLength = list.length;
	    index += shouldGetNext ? 1 : -1;

	    if (isCycleAllowed) {
	      index = (index + listLength) % listLength;
	    }

	    return list[Math.max(0, Math.min(index, listLength - 1))];
	  };

	  /**
	   * --------------------------------------------------------------------------
	   * Bootstrap (v5.1.3): carousel.js
	   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
	   * --------------------------------------------------------------------------
	   */
	  /**
	   * ------------------------------------------------------------------------
	   * Constants
	   * ------------------------------------------------------------------------
	   */

	  const NAME = 'carousel';
	  const DATA_KEY = 'bs.carousel';
	  const EVENT_KEY = `.${DATA_KEY}`;
	  const DATA_API_KEY = '.data-api';
	  const ARROW_LEFT_KEY = 'ArrowLeft';
	  const ARROW_RIGHT_KEY = 'ArrowRight';
	  const TOUCHEVENT_COMPAT_WAIT = 500; // Time for mouse compat events to fire after touch

	  const SWIPE_THRESHOLD = 40;
	  const Default = {
	    interval: 5000,
	    keyboard: true,
	    slide: false,
	    pause: 'hover',
	    wrap: true,
	    touch: true
	  };
	  const DefaultType = {
	    interval: '(number|boolean)',
	    keyboard: 'boolean',
	    slide: '(boolean|string)',
	    pause: '(string|boolean)',
	    wrap: 'boolean',
	    touch: 'boolean'
	  };
	  const ORDER_NEXT = 'next';
	  const ORDER_PREV = 'prev';
	  const DIRECTION_LEFT = 'left';
	  const DIRECTION_RIGHT = 'right';
	  const KEY_TO_DIRECTION = {
	    [ARROW_LEFT_KEY]: DIRECTION_RIGHT,
	    [ARROW_RIGHT_KEY]: DIRECTION_LEFT
	  };
	  const EVENT_SLIDE = `slide${EVENT_KEY}`;
	  const EVENT_SLID = `slid${EVENT_KEY}`;
	  const EVENT_KEYDOWN = `keydown${EVENT_KEY}`;
	  const EVENT_MOUSEENTER = `mouseenter${EVENT_KEY}`;
	  const EVENT_MOUSELEAVE = `mouseleave${EVENT_KEY}`;
	  const EVENT_TOUCHSTART = `touchstart${EVENT_KEY}`;
	  const EVENT_TOUCHMOVE = `touchmove${EVENT_KEY}`;
	  const EVENT_TOUCHEND = `touchend${EVENT_KEY}`;
	  const EVENT_POINTERDOWN = `pointerdown${EVENT_KEY}`;
	  const EVENT_POINTERUP = `pointerup${EVENT_KEY}`;
	  const EVENT_DRAG_START = `dragstart${EVENT_KEY}`;
	  const EVENT_LOAD_DATA_API = `load${EVENT_KEY}${DATA_API_KEY}`;
	  const EVENT_CLICK_DATA_API = `click${EVENT_KEY}${DATA_API_KEY}`;
	  const CLASS_NAME_CAROUSEL = 'carousel';
	  const CLASS_NAME_ACTIVE = 'active';
	  const CLASS_NAME_SLIDE = 'slide';
	  const CLASS_NAME_END = 'carousel-item-end';
	  const CLASS_NAME_START = 'carousel-item-start';
	  const CLASS_NAME_NEXT = 'carousel-item-next';
	  const CLASS_NAME_PREV = 'carousel-item-prev';
	  const CLASS_NAME_POINTER_EVENT = 'pointer-event';
	  const SELECTOR_ACTIVE = '.active';
	  const SELECTOR_ACTIVE_ITEM = '.active.carousel-item';
	  const SELECTOR_ITEM = '.carousel-item';
	  const SELECTOR_ITEM_IMG = '.carousel-item img';
	  const SELECTOR_NEXT_PREV = '.carousel-item-next, .carousel-item-prev';
	  const SELECTOR_INDICATORS = '.carousel-indicators';
	  const SELECTOR_INDICATOR = '[data-bs-target]';
	  const SELECTOR_DATA_SLIDE = '[data-bs-slide], [data-bs-slide-to]';
	  const SELECTOR_DATA_RIDE = '[data-bs-ride="carousel"]';
	  const POINTER_TYPE_TOUCH = 'touch';
	  const POINTER_TYPE_PEN = 'pen';
	  /**
	   * ------------------------------------------------------------------------
	   * Class Definition
	   * ------------------------------------------------------------------------
	   */

	  class Carousel extends BaseComponent__default.default {
	    constructor(element, config) {
	      super(element);
	      this._items = null;
	      this._interval = null;
	      this._activeElement = null;
	      this._isPaused = false;
	      this._isSliding = false;
	      this.touchTimeout = null;
	      this.touchStartX = 0;
	      this.touchDeltaX = 0;
	      this._config = this._getConfig(config);
	      this._indicatorsElement = SelectorEngine__default.default.findOne(SELECTOR_INDICATORS, this._element);
	      this._touchSupported = 'ontouchstart' in document.documentElement || navigator.maxTouchPoints > 0;
	      this._pointerEvent = Boolean(window.PointerEvent);

	      this._addEventListeners();
	    } // Getters


	    static get Default() {
	      return Default;
	    }

	    static get NAME() {
	      return NAME;
	    } // Public


	    next() {
	      this._slide(ORDER_NEXT);
	    }

	    nextWhenVisible() {
	      // Don't call next when the page isn't visible
	      // or the carousel or its parent isn't visible
	      if (!document.hidden && isVisible(this._element)) {
	        this.next();
	      }
	    }

	    prev() {
	      this._slide(ORDER_PREV);
	    }

	    pause(event) {
	      if (!event) {
	        this._isPaused = true;
	      }

	      if (SelectorEngine__default.default.findOne(SELECTOR_NEXT_PREV, this._element)) {
	        triggerTransitionEnd(this._element);
	        this.cycle(true);
	      }

	      clearInterval(this._interval);
	      this._interval = null;
	    }

	    cycle(event) {
	      if (!event) {
	        this._isPaused = false;
	      }

	      if (this._interval) {
	        clearInterval(this._interval);
	        this._interval = null;
	      }

	      if (this._config && this._config.interval && !this._isPaused) {
	        this._updateInterval();

	        this._interval = setInterval((document.visibilityState ? this.nextWhenVisible : this.next).bind(this), this._config.interval);
	      }
	    }

	    to(index) {
	      this._activeElement = SelectorEngine__default.default.findOne(SELECTOR_ACTIVE_ITEM, this._element);

	      const activeIndex = this._getItemIndex(this._activeElement);

	      if (index > this._items.length - 1 || index < 0) {
	        return;
	      }

	      if (this._isSliding) {
	        EventHandler__default.default.one(this._element, EVENT_SLID, () => this.to(index));
	        return;
	      }

	      if (activeIndex === index) {
	        this.pause();
	        this.cycle();
	        return;
	      }

	      const order = index > activeIndex ? ORDER_NEXT : ORDER_PREV;

	      this._slide(order, this._items[index]);
	    } // Private


	    _getConfig(config) {
	      config = { ...Default,
	        ...Manipulator__default.default.getDataAttributes(this._element),
	        ...(typeof config === 'object' ? config : {})
	      };
	      typeCheckConfig(NAME, config, DefaultType);
	      return config;
	    }

	    _handleSwipe() {
	      const absDeltax = Math.abs(this.touchDeltaX);

	      if (absDeltax <= SWIPE_THRESHOLD) {
	        return;
	      }

	      const direction = absDeltax / this.touchDeltaX;
	      this.touchDeltaX = 0;

	      if (!direction) {
	        return;
	      }

	      this._slide(direction > 0 ? DIRECTION_RIGHT : DIRECTION_LEFT);
	    }

	    _addEventListeners() {
	      if (this._config.keyboard) {
	        EventHandler__default.default.on(this._element, EVENT_KEYDOWN, event => this._keydown(event));
	      }

	      if (this._config.pause === 'hover') {
	        EventHandler__default.default.on(this._element, EVENT_MOUSEENTER, event => this.pause(event));
	        EventHandler__default.default.on(this._element, EVENT_MOUSELEAVE, event => this.cycle(event));
	      }

	      if (this._config.touch && this._touchSupported) {
	        this._addTouchEventListeners();
	      }
	    }

	    _addTouchEventListeners() {
	      const hasPointerPenTouch = event => {
	        return this._pointerEvent && (event.pointerType === POINTER_TYPE_PEN || event.pointerType === POINTER_TYPE_TOUCH);
	      };

	      const start = event => {
	        if (hasPointerPenTouch(event)) {
	          this.touchStartX = event.clientX;
	        } else if (!this._pointerEvent) {
	          this.touchStartX = event.touches[0].clientX;
	        }
	      };

	      const move = event => {
	        // ensure swiping with one touch and not pinching
	        this.touchDeltaX = event.touches && event.touches.length > 1 ? 0 : event.touches[0].clientX - this.touchStartX;
	      };

	      const end = event => {
	        if (hasPointerPenTouch(event)) {
	          this.touchDeltaX = event.clientX - this.touchStartX;
	        }

	        this._handleSwipe();

	        if (this._config.pause === 'hover') {
	          // If it's a touch-enabled device, mouseenter/leave are fired as
	          // part of the mouse compatibility events on first tap - the carousel
	          // would stop cycling until user tapped out of it;
	          // here, we listen for touchend, explicitly pause the carousel
	          // (as if it's the second time we tap on it, mouseenter compat event
	          // is NOT fired) and after a timeout (to allow for mouse compatibility
	          // events to fire) we explicitly restart cycling
	          this.pause();

	          if (this.touchTimeout) {
	            clearTimeout(this.touchTimeout);
	          }

	          this.touchTimeout = setTimeout(event => this.cycle(event), TOUCHEVENT_COMPAT_WAIT + this._config.interval);
	        }
	      };

	      SelectorEngine__default.default.find(SELECTOR_ITEM_IMG, this._element).forEach(itemImg => {
	        EventHandler__default.default.on(itemImg, EVENT_DRAG_START, event => event.preventDefault());
	      });

	      if (this._pointerEvent) {
	        EventHandler__default.default.on(this._element, EVENT_POINTERDOWN, event => start(event));
	        EventHandler__default.default.on(this._element, EVENT_POINTERUP, event => end(event));

	        this._element.classList.add(CLASS_NAME_POINTER_EVENT);
	      } else {
	        EventHandler__default.default.on(this._element, EVENT_TOUCHSTART, event => start(event));
	        EventHandler__default.default.on(this._element, EVENT_TOUCHMOVE, event => move(event));
	        EventHandler__default.default.on(this._element, EVENT_TOUCHEND, event => end(event));
	      }
	    }

	    _keydown(event) {
	      if (/input|textarea/i.test(event.target.tagName)) {
	        return;
	      }

	      const direction = KEY_TO_DIRECTION[event.key];

	      if (direction) {
	        event.preventDefault();

	        this._slide(direction);
	      }
	    }

	    _getItemIndex(element) {
	      this._items = element && element.parentNode ? SelectorEngine__default.default.find(SELECTOR_ITEM, element.parentNode) : [];
	      return this._items.indexOf(element);
	    }

	    _getItemByOrder(order, activeElement) {
	      const isNext = order === ORDER_NEXT;
	      return getNextActiveElement(this._items, activeElement, isNext, this._config.wrap);
	    }

	    _triggerSlideEvent(relatedTarget, eventDirectionName) {
	      const targetIndex = this._getItemIndex(relatedTarget);

	      const fromIndex = this._getItemIndex(SelectorEngine__default.default.findOne(SELECTOR_ACTIVE_ITEM, this._element));

	      return EventHandler__default.default.trigger(this._element, EVENT_SLIDE, {
	        relatedTarget,
	        direction: eventDirectionName,
	        from: fromIndex,
	        to: targetIndex
	      });
	    }

	    _setActiveIndicatorElement(element) {
	      if (this._indicatorsElement) {
	        const activeIndicator = SelectorEngine__default.default.findOne(SELECTOR_ACTIVE, this._indicatorsElement);
	        activeIndicator.classList.remove(CLASS_NAME_ACTIVE);
	        activeIndicator.removeAttribute('aria-current');
	        const indicators = SelectorEngine__default.default.find(SELECTOR_INDICATOR, this._indicatorsElement);

	        for (let i = 0; i < indicators.length; i++) {
	          if (Number.parseInt(indicators[i].getAttribute('data-bs-slide-to'), 10) === this._getItemIndex(element)) {
	            indicators[i].classList.add(CLASS_NAME_ACTIVE);
	            indicators[i].setAttribute('aria-current', 'true');
	            break;
	          }
	        }
	      }
	    }

	    _updateInterval() {
	      const element = this._activeElement || SelectorEngine__default.default.findOne(SELECTOR_ACTIVE_ITEM, this._element);

	      if (!element) {
	        return;
	      }

	      const elementInterval = Number.parseInt(element.getAttribute('data-bs-interval'), 10);

	      if (elementInterval) {
	        this._config.defaultInterval = this._config.defaultInterval || this._config.interval;
	        this._config.interval = elementInterval;
	      } else {
	        this._config.interval = this._config.defaultInterval || this._config.interval;
	      }
	    }

	    _slide(directionOrOrder, element) {
	      const order = this._directionToOrder(directionOrOrder);

	      const activeElement = SelectorEngine__default.default.findOne(SELECTOR_ACTIVE_ITEM, this._element);

	      const activeElementIndex = this._getItemIndex(activeElement);

	      const nextElement = element || this._getItemByOrder(order, activeElement);

	      const nextElementIndex = this._getItemIndex(nextElement);

	      const isCycling = Boolean(this._interval);
	      const isNext = order === ORDER_NEXT;
	      const directionalClassName = isNext ? CLASS_NAME_START : CLASS_NAME_END;
	      const orderClassName = isNext ? CLASS_NAME_NEXT : CLASS_NAME_PREV;

	      const eventDirectionName = this._orderToDirection(order);

	      if (nextElement && nextElement.classList.contains(CLASS_NAME_ACTIVE)) {
	        this._isSliding = false;
	        return;
	      }

	      if (this._isSliding) {
	        return;
	      }

	      const slideEvent = this._triggerSlideEvent(nextElement, eventDirectionName);

	      if (slideEvent.defaultPrevented) {
	        return;
	      }

	      if (!activeElement || !nextElement) {
	        // Some weirdness is happening, so we bail
	        return;
	      }

	      this._isSliding = true;

	      if (isCycling) {
	        this.pause();
	      }

	      this._setActiveIndicatorElement(nextElement);

	      this._activeElement = nextElement;

	      const triggerSlidEvent = () => {
	        EventHandler__default.default.trigger(this._element, EVENT_SLID, {
	          relatedTarget: nextElement,
	          direction: eventDirectionName,
	          from: activeElementIndex,
	          to: nextElementIndex
	        });
	      };

	      if (this._element.classList.contains(CLASS_NAME_SLIDE)) {
	        nextElement.classList.add(orderClassName);
	        reflow(nextElement);
	        activeElement.classList.add(directionalClassName);
	        nextElement.classList.add(directionalClassName);

	        const completeCallBack = () => {
	          nextElement.classList.remove(directionalClassName, orderClassName);
	          nextElement.classList.add(CLASS_NAME_ACTIVE);
	          activeElement.classList.remove(CLASS_NAME_ACTIVE, orderClassName, directionalClassName);
	          this._isSliding = false;
	          setTimeout(triggerSlidEvent, 0);
	        };

	        this._queueCallback(completeCallBack, activeElement, true);
	      } else {
	        activeElement.classList.remove(CLASS_NAME_ACTIVE);
	        nextElement.classList.add(CLASS_NAME_ACTIVE);
	        this._isSliding = false;
	        triggerSlidEvent();
	      }

	      if (isCycling) {
	        this.cycle();
	      }
	    }

	    _directionToOrder(direction) {
	      if (![DIRECTION_RIGHT, DIRECTION_LEFT].includes(direction)) {
	        return direction;
	      }

	      if (isRTL()) {
	        return direction === DIRECTION_LEFT ? ORDER_PREV : ORDER_NEXT;
	      }

	      return direction === DIRECTION_LEFT ? ORDER_NEXT : ORDER_PREV;
	    }

	    _orderToDirection(order) {
	      if (![ORDER_NEXT, ORDER_PREV].includes(order)) {
	        return order;
	      }

	      if (isRTL()) {
	        return order === ORDER_PREV ? DIRECTION_LEFT : DIRECTION_RIGHT;
	      }

	      return order === ORDER_PREV ? DIRECTION_RIGHT : DIRECTION_LEFT;
	    } // Static


	    static carouselInterface(element, config) {
	      const data = Carousel.getOrCreateInstance(element, config);
	      let {
	        _config
	      } = data;

	      if (typeof config === 'object') {
	        _config = { ..._config,
	          ...config
	        };
	      }

	      const action = typeof config === 'string' ? config : _config.slide;

	      if (typeof config === 'number') {
	        data.to(config);
	      } else if (typeof action === 'string') {
	        if (typeof data[action] === 'undefined') {
	          throw new TypeError(`No method named "${action}"`);
	        }

	        data[action]();
	      } else if (_config.interval && _config.ride) {
	        data.pause();
	        data.cycle();
	      }
	    }

	    static jQueryInterface(config) {
	      return this.each(function () {
	        Carousel.carouselInterface(this, config);
	      });
	    }

	    static dataApiClickHandler(event) {
	      const target = getElementFromSelector(this);

	      if (!target || !target.classList.contains(CLASS_NAME_CAROUSEL)) {
	        return;
	      }

	      const config = { ...Manipulator__default.default.getDataAttributes(target),
	        ...Manipulator__default.default.getDataAttributes(this)
	      };
	      const slideIndex = this.getAttribute('data-bs-slide-to');

	      if (slideIndex) {
	        config.interval = false;
	      }

	      Carousel.carouselInterface(target, config);

	      if (slideIndex) {
	        Carousel.getInstance(target).to(slideIndex);
	      }

	      event.preventDefault();
	    }

	  }
	  /**
	   * ------------------------------------------------------------------------
	   * Data Api implementation
	   * ------------------------------------------------------------------------
	   */


	  EventHandler__default.default.on(document, EVENT_CLICK_DATA_API, SELECTOR_DATA_SLIDE, Carousel.dataApiClickHandler);
	  EventHandler__default.default.on(window, EVENT_LOAD_DATA_API, () => {
	    const carousels = SelectorEngine__default.default.find(SELECTOR_DATA_RIDE);

	    for (let i = 0, len = carousels.length; i < len; i++) {
	      Carousel.carouselInterface(carousels[i], Carousel.getInstance(carousels[i]));
	    }
	  });
	  /**
	   * ------------------------------------------------------------------------
	   * jQuery
	   * ------------------------------------------------------------------------
	   * add .Carousel to jQuery only if jQuery is present
	   */

	  defineJQueryPlugin(Carousel);

	  return Carousel;

	}));

	}(carousel$1));

	var carousel = carousel$1.exports;

	var collapse$1 = {exports: {}};

	/*!
	  * Bootstrap collapse.js v5.1.3 (https://getbootstrap.com/)
	  * Copyright 2011-2021 The Bootstrap Authors (https://github.com/twbs/bootstrap/graphs/contributors)
	  * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
	  */

	(function (module, exports) {
	(function (global, factory) {
	  module.exports = factory(data.exports, eventHandler.exports, manipulator.exports, selectorEngine.exports, baseComponent.exports) ;
	})(commonjsGlobal, (function (Data, EventHandler, Manipulator, SelectorEngine, BaseComponent) {
	  const _interopDefaultLegacy = e => e && typeof e === 'object' && 'default' in e ? e : { default: e };

	  const Data__default = /*#__PURE__*/_interopDefaultLegacy(Data);
	  const EventHandler__default = /*#__PURE__*/_interopDefaultLegacy(EventHandler);
	  const Manipulator__default = /*#__PURE__*/_interopDefaultLegacy(Manipulator);
	  const SelectorEngine__default = /*#__PURE__*/_interopDefaultLegacy(SelectorEngine);
	  const BaseComponent__default = /*#__PURE__*/_interopDefaultLegacy(BaseComponent);

	  /**
	   * --------------------------------------------------------------------------
	   * Bootstrap (v5.1.3): util/index.js
	   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
	   * --------------------------------------------------------------------------
	   */

	  const toType = obj => {
	    if (obj === null || obj === undefined) {
	      return `${obj}`;
	    }

	    return {}.toString.call(obj).match(/\s([a-z]+)/i)[1].toLowerCase();
	  };

	  const getSelector = element => {
	    let selector = element.getAttribute('data-bs-target');

	    if (!selector || selector === '#') {
	      let hrefAttr = element.getAttribute('href'); // The only valid content that could double as a selector are IDs or classes,
	      // so everything starting with `#` or `.`. If a "real" URL is used as the selector,
	      // `document.querySelector` will rightfully complain it is invalid.
	      // See https://github.com/twbs/bootstrap/issues/32273

	      if (!hrefAttr || !hrefAttr.includes('#') && !hrefAttr.startsWith('.')) {
	        return null;
	      } // Just in case some CMS puts out a full URL with the anchor appended


	      if (hrefAttr.includes('#') && !hrefAttr.startsWith('#')) {
	        hrefAttr = `#${hrefAttr.split('#')[1]}`;
	      }

	      selector = hrefAttr && hrefAttr !== '#' ? hrefAttr.trim() : null;
	    }

	    return selector;
	  };

	  const getSelectorFromElement = element => {
	    const selector = getSelector(element);

	    if (selector) {
	      return document.querySelector(selector) ? selector : null;
	    }

	    return null;
	  };

	  const getElementFromSelector = element => {
	    const selector = getSelector(element);
	    return selector ? document.querySelector(selector) : null;
	  };

	  const isElement = obj => {
	    if (!obj || typeof obj !== 'object') {
	      return false;
	    }

	    if (typeof obj.jquery !== 'undefined') {
	      obj = obj[0];
	    }

	    return typeof obj.nodeType !== 'undefined';
	  };

	  const getElement = obj => {
	    if (isElement(obj)) {
	      // it's a jQuery object or a node element
	      return obj.jquery ? obj[0] : obj;
	    }

	    if (typeof obj === 'string' && obj.length > 0) {
	      return document.querySelector(obj);
	    }

	    return null;
	  };

	  const typeCheckConfig = (componentName, config, configTypes) => {
	    Object.keys(configTypes).forEach(property => {
	      const expectedTypes = configTypes[property];
	      const value = config[property];
	      const valueType = value && isElement(value) ? 'element' : toType(value);

	      if (!new RegExp(expectedTypes).test(valueType)) {
	        throw new TypeError(`${componentName.toUpperCase()}: Option "${property}" provided type "${valueType}" but expected type "${expectedTypes}".`);
	      }
	    });
	  };
	  /**
	   * Trick to restart an element's animation
	   *
	   * @param {HTMLElement} element
	   * @return void
	   *
	   * @see https://www.charistheo.io/blog/2021/02/restart-a-css-animation-with-javascript/#restarting-a-css-animation
	   */


	  const reflow = element => {
	    // eslint-disable-next-line no-unused-expressions
	    element.offsetHeight;
	  };

	  const getjQuery = () => {
	    const {
	      jQuery
	    } = window;

	    if (jQuery && !document.body.hasAttribute('data-bs-no-jquery')) {
	      return jQuery;
	    }

	    return null;
	  };

	  const DOMContentLoadedCallbacks = [];

	  const onDOMContentLoaded = callback => {
	    if (document.readyState === 'loading') {
	      // add listener on the first call when the document is in loading state
	      if (!DOMContentLoadedCallbacks.length) {
	        document.addEventListener('DOMContentLoaded', () => {
	          DOMContentLoadedCallbacks.forEach(callback => callback());
	        });
	      }

	      DOMContentLoadedCallbacks.push(callback);
	    } else {
	      callback();
	    }
	  };

	  const defineJQueryPlugin = plugin => {
	    onDOMContentLoaded(() => {
	      const $ = getjQuery();
	      /* istanbul ignore if */

	      if ($) {
	        const name = plugin.NAME;
	        const JQUERY_NO_CONFLICT = $.fn[name];
	        $.fn[name] = plugin.jQueryInterface;
	        $.fn[name].Constructor = plugin;

	        $.fn[name].noConflict = () => {
	          $.fn[name] = JQUERY_NO_CONFLICT;
	          return plugin.jQueryInterface;
	        };
	      }
	    });
	  };

	  /**
	   * --------------------------------------------------------------------------
	   * Bootstrap (v5.1.3): collapse.js
	   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
	   * --------------------------------------------------------------------------
	   */
	  /**
	   * ------------------------------------------------------------------------
	   * Constants
	   * ------------------------------------------------------------------------
	   */

	  const NAME = 'collapse';
	  const DATA_KEY = 'bs.collapse';
	  const EVENT_KEY = `.${DATA_KEY}`;
	  const DATA_API_KEY = '.data-api';
	  const Default = {
	    toggle: true,
	    parent: null
	  };
	  const DefaultType = {
	    toggle: 'boolean',
	    parent: '(null|element)'
	  };
	  const EVENT_SHOW = `show${EVENT_KEY}`;
	  const EVENT_SHOWN = `shown${EVENT_KEY}`;
	  const EVENT_HIDE = `hide${EVENT_KEY}`;
	  const EVENT_HIDDEN = `hidden${EVENT_KEY}`;
	  const EVENT_CLICK_DATA_API = `click${EVENT_KEY}${DATA_API_KEY}`;
	  const CLASS_NAME_SHOW = 'show';
	  const CLASS_NAME_COLLAPSE = 'collapse';
	  const CLASS_NAME_COLLAPSING = 'collapsing';
	  const CLASS_NAME_COLLAPSED = 'collapsed';
	  const CLASS_NAME_DEEPER_CHILDREN = `:scope .${CLASS_NAME_COLLAPSE} .${CLASS_NAME_COLLAPSE}`;
	  const CLASS_NAME_HORIZONTAL = 'collapse-horizontal';
	  const WIDTH = 'width';
	  const HEIGHT = 'height';
	  const SELECTOR_ACTIVES = '.collapse.show, .collapse.collapsing';
	  const SELECTOR_DATA_TOGGLE = '[data-bs-toggle="collapse"]';
	  /**
	   * ------------------------------------------------------------------------
	   * Class Definition
	   * ------------------------------------------------------------------------
	   */

	  class Collapse extends BaseComponent__default.default {
	    constructor(element, config) {
	      super(element);
	      this._isTransitioning = false;
	      this._config = this._getConfig(config);
	      this._triggerArray = [];
	      const toggleList = SelectorEngine__default.default.find(SELECTOR_DATA_TOGGLE);

	      for (let i = 0, len = toggleList.length; i < len; i++) {
	        const elem = toggleList[i];
	        const selector = getSelectorFromElement(elem);
	        const filterElement = SelectorEngine__default.default.find(selector).filter(foundElem => foundElem === this._element);

	        if (selector !== null && filterElement.length) {
	          this._selector = selector;

	          this._triggerArray.push(elem);
	        }
	      }

	      this._initializeChildren();

	      if (!this._config.parent) {
	        this._addAriaAndCollapsedClass(this._triggerArray, this._isShown());
	      }

	      if (this._config.toggle) {
	        this.toggle();
	      }
	    } // Getters


	    static get Default() {
	      return Default;
	    }

	    static get NAME() {
	      return NAME;
	    } // Public


	    toggle() {
	      if (this._isShown()) {
	        this.hide();
	      } else {
	        this.show();
	      }
	    }

	    show() {
	      if (this._isTransitioning || this._isShown()) {
	        return;
	      }

	      let actives = [];
	      let activesData;

	      if (this._config.parent) {
	        const children = SelectorEngine__default.default.find(CLASS_NAME_DEEPER_CHILDREN, this._config.parent);
	        actives = SelectorEngine__default.default.find(SELECTOR_ACTIVES, this._config.parent).filter(elem => !children.includes(elem)); // remove children if greater depth
	      }

	      const container = SelectorEngine__default.default.findOne(this._selector);

	      if (actives.length) {
	        const tempActiveData = actives.find(elem => container !== elem);
	        activesData = tempActiveData ? Collapse.getInstance(tempActiveData) : null;

	        if (activesData && activesData._isTransitioning) {
	          return;
	        }
	      }

	      const startEvent = EventHandler__default.default.trigger(this._element, EVENT_SHOW);

	      if (startEvent.defaultPrevented) {
	        return;
	      }

	      actives.forEach(elemActive => {
	        if (container !== elemActive) {
	          Collapse.getOrCreateInstance(elemActive, {
	            toggle: false
	          }).hide();
	        }

	        if (!activesData) {
	          Data__default.default.set(elemActive, DATA_KEY, null);
	        }
	      });

	      const dimension = this._getDimension();

	      this._element.classList.remove(CLASS_NAME_COLLAPSE);

	      this._element.classList.add(CLASS_NAME_COLLAPSING);

	      this._element.style[dimension] = 0;

	      this._addAriaAndCollapsedClass(this._triggerArray, true);

	      this._isTransitioning = true;

	      const complete = () => {
	        this._isTransitioning = false;

	        this._element.classList.remove(CLASS_NAME_COLLAPSING);

	        this._element.classList.add(CLASS_NAME_COLLAPSE, CLASS_NAME_SHOW);

	        this._element.style[dimension] = '';
	        EventHandler__default.default.trigger(this._element, EVENT_SHOWN);
	      };

	      const capitalizedDimension = dimension[0].toUpperCase() + dimension.slice(1);
	      const scrollSize = `scroll${capitalizedDimension}`;

	      this._queueCallback(complete, this._element, true);

	      this._element.style[dimension] = `${this._element[scrollSize]}px`;
	    }

	    hide() {
	      if (this._isTransitioning || !this._isShown()) {
	        return;
	      }

	      const startEvent = EventHandler__default.default.trigger(this._element, EVENT_HIDE);

	      if (startEvent.defaultPrevented) {
	        return;
	      }

	      const dimension = this._getDimension();

	      this._element.style[dimension] = `${this._element.getBoundingClientRect()[dimension]}px`;
	      reflow(this._element);

	      this._element.classList.add(CLASS_NAME_COLLAPSING);

	      this._element.classList.remove(CLASS_NAME_COLLAPSE, CLASS_NAME_SHOW);

	      const triggerArrayLength = this._triggerArray.length;

	      for (let i = 0; i < triggerArrayLength; i++) {
	        const trigger = this._triggerArray[i];
	        const elem = getElementFromSelector(trigger);

	        if (elem && !this._isShown(elem)) {
	          this._addAriaAndCollapsedClass([trigger], false);
	        }
	      }

	      this._isTransitioning = true;

	      const complete = () => {
	        this._isTransitioning = false;

	        this._element.classList.remove(CLASS_NAME_COLLAPSING);

	        this._element.classList.add(CLASS_NAME_COLLAPSE);

	        EventHandler__default.default.trigger(this._element, EVENT_HIDDEN);
	      };

	      this._element.style[dimension] = '';

	      this._queueCallback(complete, this._element, true);
	    }

	    _isShown(element = this._element) {
	      return element.classList.contains(CLASS_NAME_SHOW);
	    } // Private


	    _getConfig(config) {
	      config = { ...Default,
	        ...Manipulator__default.default.getDataAttributes(this._element),
	        ...config
	      };
	      config.toggle = Boolean(config.toggle); // Coerce string values

	      config.parent = getElement(config.parent);
	      typeCheckConfig(NAME, config, DefaultType);
	      return config;
	    }

	    _getDimension() {
	      return this._element.classList.contains(CLASS_NAME_HORIZONTAL) ? WIDTH : HEIGHT;
	    }

	    _initializeChildren() {
	      if (!this._config.parent) {
	        return;
	      }

	      const children = SelectorEngine__default.default.find(CLASS_NAME_DEEPER_CHILDREN, this._config.parent);
	      SelectorEngine__default.default.find(SELECTOR_DATA_TOGGLE, this._config.parent).filter(elem => !children.includes(elem)).forEach(element => {
	        const selected = getElementFromSelector(element);

	        if (selected) {
	          this._addAriaAndCollapsedClass([element], this._isShown(selected));
	        }
	      });
	    }

	    _addAriaAndCollapsedClass(triggerArray, isOpen) {
	      if (!triggerArray.length) {
	        return;
	      }

	      triggerArray.forEach(elem => {
	        if (isOpen) {
	          elem.classList.remove(CLASS_NAME_COLLAPSED);
	        } else {
	          elem.classList.add(CLASS_NAME_COLLAPSED);
	        }

	        elem.setAttribute('aria-expanded', isOpen);
	      });
	    } // Static


	    static jQueryInterface(config) {
	      return this.each(function () {
	        const _config = {};

	        if (typeof config === 'string' && /show|hide/.test(config)) {
	          _config.toggle = false;
	        }

	        const data = Collapse.getOrCreateInstance(this, _config);

	        if (typeof config === 'string') {
	          if (typeof data[config] === 'undefined') {
	            throw new TypeError(`No method named "${config}"`);
	          }

	          data[config]();
	        }
	      });
	    }

	  }
	  /**
	   * ------------------------------------------------------------------------
	   * Data Api implementation
	   * ------------------------------------------------------------------------
	   */


	  EventHandler__default.default.on(document, EVENT_CLICK_DATA_API, SELECTOR_DATA_TOGGLE, function (event) {
	    // preventDefault only for <a> elements (which change the URL) not inside the collapsible element
	    if (event.target.tagName === 'A' || event.delegateTarget && event.delegateTarget.tagName === 'A') {
	      event.preventDefault();
	    }

	    const selector = getSelectorFromElement(this);
	    const selectorElements = SelectorEngine__default.default.find(selector);
	    selectorElements.forEach(element => {
	      Collapse.getOrCreateInstance(element, {
	        toggle: false
	      }).toggle();
	    });
	  });
	  /**
	   * ------------------------------------------------------------------------
	   * jQuery
	   * ------------------------------------------------------------------------
	   * add .Collapse to jQuery only if jQuery is present
	   */

	  defineJQueryPlugin(Collapse);

	  return Collapse;

	}));

	}(collapse$1));

	var collapse = collapse$1.exports;

	var dropdown$1 = {exports: {}};

	var top = 'top';
	var bottom = 'bottom';
	var right = 'right';
	var left = 'left';
	var auto = 'auto';
	var basePlacements = [top, bottom, right, left];
	var start = 'start';
	var end = 'end';
	var clippingParents = 'clippingParents';
	var viewport = 'viewport';
	var popper = 'popper';
	var reference = 'reference';
	var variationPlacements = /*#__PURE__*/basePlacements.reduce(function (acc, placement) {
	  return acc.concat([placement + "-" + start, placement + "-" + end]);
	}, []);
	var placements = /*#__PURE__*/[].concat(basePlacements, [auto]).reduce(function (acc, placement) {
	  return acc.concat([placement, placement + "-" + start, placement + "-" + end]);
	}, []); // modifiers that need to read the DOM

	var beforeRead = 'beforeRead';
	var read = 'read';
	var afterRead = 'afterRead'; // pure-logic modifiers

	var beforeMain = 'beforeMain';
	var main = 'main';
	var afterMain = 'afterMain'; // modifier with the purpose to write to the DOM (or write into a framework state)

	var beforeWrite = 'beforeWrite';
	var write = 'write';
	var afterWrite = 'afterWrite';
	var modifierPhases = [beforeRead, read, afterRead, beforeMain, main, afterMain, beforeWrite, write, afterWrite];

	function getNodeName(element) {
	  return element ? (element.nodeName || '').toLowerCase() : null;
	}

	function getWindow(node) {
	  if (node == null) {
	    return window;
	  }

	  if (node.toString() !== '[object Window]') {
	    var ownerDocument = node.ownerDocument;
	    return ownerDocument ? ownerDocument.defaultView || window : window;
	  }

	  return node;
	}

	function isElement(node) {
	  var OwnElement = getWindow(node).Element;
	  return node instanceof OwnElement || node instanceof Element;
	}

	function isHTMLElement(node) {
	  var OwnElement = getWindow(node).HTMLElement;
	  return node instanceof OwnElement || node instanceof HTMLElement;
	}

	function isShadowRoot(node) {
	  // IE 11 has no ShadowRoot
	  if (typeof ShadowRoot === 'undefined') {
	    return false;
	  }

	  var OwnElement = getWindow(node).ShadowRoot;
	  return node instanceof OwnElement || node instanceof ShadowRoot;
	}

	// and applies them to the HTMLElements such as popper and arrow

	function applyStyles(_ref) {
	  var state = _ref.state;
	  Object.keys(state.elements).forEach(function (name) {
	    var style = state.styles[name] || {};
	    var attributes = state.attributes[name] || {};
	    var element = state.elements[name]; // arrow is optional + virtual elements

	    if (!isHTMLElement(element) || !getNodeName(element)) {
	      return;
	    } // Flow doesn't support to extend this property, but it's the most
	    // effective way to apply styles to an HTMLElement
	    // $FlowFixMe[cannot-write]


	    Object.assign(element.style, style);
	    Object.keys(attributes).forEach(function (name) {
	      var value = attributes[name];

	      if (value === false) {
	        element.removeAttribute(name);
	      } else {
	        element.setAttribute(name, value === true ? '' : value);
	      }
	    });
	  });
	}

	function effect$2(_ref2) {
	  var state = _ref2.state;
	  var initialStyles = {
	    popper: {
	      position: state.options.strategy,
	      left: '0',
	      top: '0',
	      margin: '0'
	    },
	    arrow: {
	      position: 'absolute'
	    },
	    reference: {}
	  };
	  Object.assign(state.elements.popper.style, initialStyles.popper);
	  state.styles = initialStyles;

	  if (state.elements.arrow) {
	    Object.assign(state.elements.arrow.style, initialStyles.arrow);
	  }

	  return function () {
	    Object.keys(state.elements).forEach(function (name) {
	      var element = state.elements[name];
	      var attributes = state.attributes[name] || {};
	      var styleProperties = Object.keys(state.styles.hasOwnProperty(name) ? state.styles[name] : initialStyles[name]); // Set all values to an empty string to unset them

	      var style = styleProperties.reduce(function (style, property) {
	        style[property] = '';
	        return style;
	      }, {}); // arrow is optional + virtual elements

	      if (!isHTMLElement(element) || !getNodeName(element)) {
	        return;
	      }

	      Object.assign(element.style, style);
	      Object.keys(attributes).forEach(function (attribute) {
	        element.removeAttribute(attribute);
	      });
	    });
	  };
	} // eslint-disable-next-line import/no-unused-modules


	var applyStyles$1 = {
	  name: 'applyStyles',
	  enabled: true,
	  phase: 'write',
	  fn: applyStyles,
	  effect: effect$2,
	  requires: ['computeStyles']
	};

	function getBasePlacement(placement) {
	  return placement.split('-')[0];
	}

	var max = Math.max;
	var min = Math.min;
	var round = Math.round;

	function getBoundingClientRect(element, includeScale) {
	  if (includeScale === void 0) {
	    includeScale = false;
	  }

	  var rect = element.getBoundingClientRect();
	  var scaleX = 1;
	  var scaleY = 1;

	  if (isHTMLElement(element) && includeScale) {
	    var offsetHeight = element.offsetHeight;
	    var offsetWidth = element.offsetWidth; // Do not attempt to divide by 0, otherwise we get `Infinity` as scale
	    // Fallback to 1 in case both values are `0`

	    if (offsetWidth > 0) {
	      scaleX = round(rect.width) / offsetWidth || 1;
	    }

	    if (offsetHeight > 0) {
	      scaleY = round(rect.height) / offsetHeight || 1;
	    }
	  }

	  return {
	    width: rect.width / scaleX,
	    height: rect.height / scaleY,
	    top: rect.top / scaleY,
	    right: rect.right / scaleX,
	    bottom: rect.bottom / scaleY,
	    left: rect.left / scaleX,
	    x: rect.left / scaleX,
	    y: rect.top / scaleY
	  };
	}

	// means it doesn't take into account transforms.

	function getLayoutRect(element) {
	  var clientRect = getBoundingClientRect(element); // Use the clientRect sizes if it's not been transformed.
	  // Fixes https://github.com/popperjs/popper-core/issues/1223

	  var width = element.offsetWidth;
	  var height = element.offsetHeight;

	  if (Math.abs(clientRect.width - width) <= 1) {
	    width = clientRect.width;
	  }

	  if (Math.abs(clientRect.height - height) <= 1) {
	    height = clientRect.height;
	  }

	  return {
	    x: element.offsetLeft,
	    y: element.offsetTop,
	    width: width,
	    height: height
	  };
	}

	function contains(parent, child) {
	  var rootNode = child.getRootNode && child.getRootNode(); // First, attempt with faster native method

	  if (parent.contains(child)) {
	    return true;
	  } // then fallback to custom implementation with Shadow DOM support
	  else if (rootNode && isShadowRoot(rootNode)) {
	      var next = child;

	      do {
	        if (next && parent.isSameNode(next)) {
	          return true;
	        } // $FlowFixMe[prop-missing]: need a better way to handle this...


	        next = next.parentNode || next.host;
	      } while (next);
	    } // Give up, the result is false


	  return false;
	}

	function getComputedStyle$1(element) {
	  return getWindow(element).getComputedStyle(element);
	}

	function isTableElement(element) {
	  return ['table', 'td', 'th'].indexOf(getNodeName(element)) >= 0;
	}

	function getDocumentElement(element) {
	  // $FlowFixMe[incompatible-return]: assume body is always available
	  return ((isElement(element) ? element.ownerDocument : // $FlowFixMe[prop-missing]
	  element.document) || window.document).documentElement;
	}

	function getParentNode(element) {
	  if (getNodeName(element) === 'html') {
	    return element;
	  }

	  return (// this is a quicker (but less type safe) way to save quite some bytes from the bundle
	    // $FlowFixMe[incompatible-return]
	    // $FlowFixMe[prop-missing]
	    element.assignedSlot || // step into the shadow DOM of the parent of a slotted node
	    element.parentNode || ( // DOM Element detected
	    isShadowRoot(element) ? element.host : null) || // ShadowRoot detected
	    // $FlowFixMe[incompatible-call]: HTMLElement is a Node
	    getDocumentElement(element) // fallback

	  );
	}

	function getTrueOffsetParent(element) {
	  if (!isHTMLElement(element) || // https://github.com/popperjs/popper-core/issues/837
	  getComputedStyle$1(element).position === 'fixed') {
	    return null;
	  }

	  return element.offsetParent;
	} // `.offsetParent` reports `null` for fixed elements, while absolute elements
	// return the containing block


	function getContainingBlock(element) {
	  var isFirefox = navigator.userAgent.toLowerCase().indexOf('firefox') !== -1;
	  var isIE = navigator.userAgent.indexOf('Trident') !== -1;

	  if (isIE && isHTMLElement(element)) {
	    // In IE 9, 10 and 11 fixed elements containing block is always established by the viewport
	    var elementCss = getComputedStyle$1(element);

	    if (elementCss.position === 'fixed') {
	      return null;
	    }
	  }

	  var currentNode = getParentNode(element);

	  while (isHTMLElement(currentNode) && ['html', 'body'].indexOf(getNodeName(currentNode)) < 0) {
	    var css = getComputedStyle$1(currentNode); // This is non-exhaustive but covers the most common CSS properties that
	    // create a containing block.
	    // https://developer.mozilla.org/en-US/docs/Web/CSS/Containing_block#identifying_the_containing_block

	    if (css.transform !== 'none' || css.perspective !== 'none' || css.contain === 'paint' || ['transform', 'perspective'].indexOf(css.willChange) !== -1 || isFirefox && css.willChange === 'filter' || isFirefox && css.filter && css.filter !== 'none') {
	      return currentNode;
	    } else {
	      currentNode = currentNode.parentNode;
	    }
	  }

	  return null;
	} // Gets the closest ancestor positioned element. Handles some edge cases,
	// such as table ancestors and cross browser bugs.


	function getOffsetParent(element) {
	  var window = getWindow(element);
	  var offsetParent = getTrueOffsetParent(element);

	  while (offsetParent && isTableElement(offsetParent) && getComputedStyle$1(offsetParent).position === 'static') {
	    offsetParent = getTrueOffsetParent(offsetParent);
	  }

	  if (offsetParent && (getNodeName(offsetParent) === 'html' || getNodeName(offsetParent) === 'body' && getComputedStyle$1(offsetParent).position === 'static')) {
	    return window;
	  }

	  return offsetParent || getContainingBlock(element) || window;
	}

	function getMainAxisFromPlacement(placement) {
	  return ['top', 'bottom'].indexOf(placement) >= 0 ? 'x' : 'y';
	}

	function within(min$1, value, max$1) {
	  return max(min$1, min(value, max$1));
	}
	function withinMaxClamp(min, value, max) {
	  var v = within(min, value, max);
	  return v > max ? max : v;
	}

	function getFreshSideObject() {
	  return {
	    top: 0,
	    right: 0,
	    bottom: 0,
	    left: 0
	  };
	}

	function mergePaddingObject(paddingObject) {
	  return Object.assign({}, getFreshSideObject(), paddingObject);
	}

	function expandToHashMap(value, keys) {
	  return keys.reduce(function (hashMap, key) {
	    hashMap[key] = value;
	    return hashMap;
	  }, {});
	}

	var toPaddingObject = function toPaddingObject(padding, state) {
	  padding = typeof padding === 'function' ? padding(Object.assign({}, state.rects, {
	    placement: state.placement
	  })) : padding;
	  return mergePaddingObject(typeof padding !== 'number' ? padding : expandToHashMap(padding, basePlacements));
	};

	function arrow(_ref) {
	  var _state$modifiersData$;

	  var state = _ref.state,
	      name = _ref.name,
	      options = _ref.options;
	  var arrowElement = state.elements.arrow;
	  var popperOffsets = state.modifiersData.popperOffsets;
	  var basePlacement = getBasePlacement(state.placement);
	  var axis = getMainAxisFromPlacement(basePlacement);
	  var isVertical = [left, right].indexOf(basePlacement) >= 0;
	  var len = isVertical ? 'height' : 'width';

	  if (!arrowElement || !popperOffsets) {
	    return;
	  }

	  var paddingObject = toPaddingObject(options.padding, state);
	  var arrowRect = getLayoutRect(arrowElement);
	  var minProp = axis === 'y' ? top : left;
	  var maxProp = axis === 'y' ? bottom : right;
	  var endDiff = state.rects.reference[len] + state.rects.reference[axis] - popperOffsets[axis] - state.rects.popper[len];
	  var startDiff = popperOffsets[axis] - state.rects.reference[axis];
	  var arrowOffsetParent = getOffsetParent(arrowElement);
	  var clientSize = arrowOffsetParent ? axis === 'y' ? arrowOffsetParent.clientHeight || 0 : arrowOffsetParent.clientWidth || 0 : 0;
	  var centerToReference = endDiff / 2 - startDiff / 2; // Make sure the arrow doesn't overflow the popper if the center point is
	  // outside of the popper bounds

	  var min = paddingObject[minProp];
	  var max = clientSize - arrowRect[len] - paddingObject[maxProp];
	  var center = clientSize / 2 - arrowRect[len] / 2 + centerToReference;
	  var offset = within(min, center, max); // Prevents breaking syntax highlighting...

	  var axisProp = axis;
	  state.modifiersData[name] = (_state$modifiersData$ = {}, _state$modifiersData$[axisProp] = offset, _state$modifiersData$.centerOffset = offset - center, _state$modifiersData$);
	}

	function effect$1(_ref2) {
	  var state = _ref2.state,
	      options = _ref2.options;
	  var _options$element = options.element,
	      arrowElement = _options$element === void 0 ? '[data-popper-arrow]' : _options$element;

	  if (arrowElement == null) {
	    return;
	  } // CSS selector


	  if (typeof arrowElement === 'string') {
	    arrowElement = state.elements.popper.querySelector(arrowElement);

	    if (!arrowElement) {
	      return;
	    }
	  }

	  if (!contains(state.elements.popper, arrowElement)) {

	    return;
	  }

	  state.elements.arrow = arrowElement;
	} // eslint-disable-next-line import/no-unused-modules


	var arrow$1 = {
	  name: 'arrow',
	  enabled: true,
	  phase: 'main',
	  fn: arrow,
	  effect: effect$1,
	  requires: ['popperOffsets'],
	  requiresIfExists: ['preventOverflow']
	};

	function getVariation(placement) {
	  return placement.split('-')[1];
	}

	var unsetSides = {
	  top: 'auto',
	  right: 'auto',
	  bottom: 'auto',
	  left: 'auto'
	}; // Round the offsets to the nearest suitable subpixel based on the DPR.
	// Zooming can change the DPR, but it seems to report a value that will
	// cleanly divide the values into the appropriate subpixels.

	function roundOffsetsByDPR(_ref) {
	  var x = _ref.x,
	      y = _ref.y;
	  var win = window;
	  var dpr = win.devicePixelRatio || 1;
	  return {
	    x: round(x * dpr) / dpr || 0,
	    y: round(y * dpr) / dpr || 0
	  };
	}

	function mapToStyles(_ref2) {
	  var _Object$assign2;

	  var popper = _ref2.popper,
	      popperRect = _ref2.popperRect,
	      placement = _ref2.placement,
	      variation = _ref2.variation,
	      offsets = _ref2.offsets,
	      position = _ref2.position,
	      gpuAcceleration = _ref2.gpuAcceleration,
	      adaptive = _ref2.adaptive,
	      roundOffsets = _ref2.roundOffsets,
	      isFixed = _ref2.isFixed;

	  var _ref3 = roundOffsets === true ? roundOffsetsByDPR(offsets) : typeof roundOffsets === 'function' ? roundOffsets(offsets) : offsets,
	      _ref3$x = _ref3.x,
	      x = _ref3$x === void 0 ? 0 : _ref3$x,
	      _ref3$y = _ref3.y,
	      y = _ref3$y === void 0 ? 0 : _ref3$y;

	  var hasX = offsets.hasOwnProperty('x');
	  var hasY = offsets.hasOwnProperty('y');
	  var sideX = left;
	  var sideY = top;
	  var win = window;

	  if (adaptive) {
	    var offsetParent = getOffsetParent(popper);
	    var heightProp = 'clientHeight';
	    var widthProp = 'clientWidth';

	    if (offsetParent === getWindow(popper)) {
	      offsetParent = getDocumentElement(popper);

	      if (getComputedStyle$1(offsetParent).position !== 'static' && position === 'absolute') {
	        heightProp = 'scrollHeight';
	        widthProp = 'scrollWidth';
	      }
	    } // $FlowFixMe[incompatible-cast]: force type refinement, we compare offsetParent with window above, but Flow doesn't detect it


	    offsetParent = offsetParent;

	    if (placement === top || (placement === left || placement === right) && variation === end) {
	      sideY = bottom;
	      var offsetY = isFixed && win.visualViewport ? win.visualViewport.height : // $FlowFixMe[prop-missing]
	      offsetParent[heightProp];
	      y -= offsetY - popperRect.height;
	      y *= gpuAcceleration ? 1 : -1;
	    }

	    if (placement === left || (placement === top || placement === bottom) && variation === end) {
	      sideX = right;
	      var offsetX = isFixed && win.visualViewport ? win.visualViewport.width : // $FlowFixMe[prop-missing]
	      offsetParent[widthProp];
	      x -= offsetX - popperRect.width;
	      x *= gpuAcceleration ? 1 : -1;
	    }
	  }

	  var commonStyles = Object.assign({
	    position: position
	  }, adaptive && unsetSides);

	  if (gpuAcceleration) {
	    var _Object$assign;

	    return Object.assign({}, commonStyles, (_Object$assign = {}, _Object$assign[sideY] = hasY ? '0' : '', _Object$assign[sideX] = hasX ? '0' : '', _Object$assign.transform = (win.devicePixelRatio || 1) <= 1 ? "translate(" + x + "px, " + y + "px)" : "translate3d(" + x + "px, " + y + "px, 0)", _Object$assign));
	  }

	  return Object.assign({}, commonStyles, (_Object$assign2 = {}, _Object$assign2[sideY] = hasY ? y + "px" : '', _Object$assign2[sideX] = hasX ? x + "px" : '', _Object$assign2.transform = '', _Object$assign2));
	}

	function computeStyles(_ref4) {
	  var state = _ref4.state,
	      options = _ref4.options;
	  var _options$gpuAccelerat = options.gpuAcceleration,
	      gpuAcceleration = _options$gpuAccelerat === void 0 ? true : _options$gpuAccelerat,
	      _options$adaptive = options.adaptive,
	      adaptive = _options$adaptive === void 0 ? true : _options$adaptive,
	      _options$roundOffsets = options.roundOffsets,
	      roundOffsets = _options$roundOffsets === void 0 ? true : _options$roundOffsets;

	  var commonStyles = {
	    placement: getBasePlacement(state.placement),
	    variation: getVariation(state.placement),
	    popper: state.elements.popper,
	    popperRect: state.rects.popper,
	    gpuAcceleration: gpuAcceleration,
	    isFixed: state.options.strategy === 'fixed'
	  };

	  if (state.modifiersData.popperOffsets != null) {
	    state.styles.popper = Object.assign({}, state.styles.popper, mapToStyles(Object.assign({}, commonStyles, {
	      offsets: state.modifiersData.popperOffsets,
	      position: state.options.strategy,
	      adaptive: adaptive,
	      roundOffsets: roundOffsets
	    })));
	  }

	  if (state.modifiersData.arrow != null) {
	    state.styles.arrow = Object.assign({}, state.styles.arrow, mapToStyles(Object.assign({}, commonStyles, {
	      offsets: state.modifiersData.arrow,
	      position: 'absolute',
	      adaptive: false,
	      roundOffsets: roundOffsets
	    })));
	  }

	  state.attributes.popper = Object.assign({}, state.attributes.popper, {
	    'data-popper-placement': state.placement
	  });
	} // eslint-disable-next-line import/no-unused-modules


	var computeStyles$1 = {
	  name: 'computeStyles',
	  enabled: true,
	  phase: 'beforeWrite',
	  fn: computeStyles,
	  data: {}
	};

	var passive = {
	  passive: true
	};

	function effect(_ref) {
	  var state = _ref.state,
	      instance = _ref.instance,
	      options = _ref.options;
	  var _options$scroll = options.scroll,
	      scroll = _options$scroll === void 0 ? true : _options$scroll,
	      _options$resize = options.resize,
	      resize = _options$resize === void 0 ? true : _options$resize;
	  var window = getWindow(state.elements.popper);
	  var scrollParents = [].concat(state.scrollParents.reference, state.scrollParents.popper);

	  if (scroll) {
	    scrollParents.forEach(function (scrollParent) {
	      scrollParent.addEventListener('scroll', instance.update, passive);
	    });
	  }

	  if (resize) {
	    window.addEventListener('resize', instance.update, passive);
	  }

	  return function () {
	    if (scroll) {
	      scrollParents.forEach(function (scrollParent) {
	        scrollParent.removeEventListener('scroll', instance.update, passive);
	      });
	    }

	    if (resize) {
	      window.removeEventListener('resize', instance.update, passive);
	    }
	  };
	} // eslint-disable-next-line import/no-unused-modules


	var eventListeners = {
	  name: 'eventListeners',
	  enabled: true,
	  phase: 'write',
	  fn: function fn() {},
	  effect: effect,
	  data: {}
	};

	var hash$1 = {
	  left: 'right',
	  right: 'left',
	  bottom: 'top',
	  top: 'bottom'
	};
	function getOppositePlacement(placement) {
	  return placement.replace(/left|right|bottom|top/g, function (matched) {
	    return hash$1[matched];
	  });
	}

	var hash = {
	  start: 'end',
	  end: 'start'
	};
	function getOppositeVariationPlacement(placement) {
	  return placement.replace(/start|end/g, function (matched) {
	    return hash[matched];
	  });
	}

	function getWindowScroll(node) {
	  var win = getWindow(node);
	  var scrollLeft = win.pageXOffset;
	  var scrollTop = win.pageYOffset;
	  return {
	    scrollLeft: scrollLeft,
	    scrollTop: scrollTop
	  };
	}

	function getWindowScrollBarX(element) {
	  // If <html> has a CSS width greater than the viewport, then this will be
	  // incorrect for RTL.
	  // Popper 1 is broken in this case and never had a bug report so let's assume
	  // it's not an issue. I don't think anyone ever specifies width on <html>
	  // anyway.
	  // Browsers where the left scrollbar doesn't cause an issue report `0` for
	  // this (e.g. Edge 2019, IE11, Safari)
	  return getBoundingClientRect(getDocumentElement(element)).left + getWindowScroll(element).scrollLeft;
	}

	function getViewportRect(element) {
	  var win = getWindow(element);
	  var html = getDocumentElement(element);
	  var visualViewport = win.visualViewport;
	  var width = html.clientWidth;
	  var height = html.clientHeight;
	  var x = 0;
	  var y = 0; // NB: This isn't supported on iOS <= 12. If the keyboard is open, the popper
	  // can be obscured underneath it.
	  // Also, `html.clientHeight` adds the bottom bar height in Safari iOS, even
	  // if it isn't open, so if this isn't available, the popper will be detected
	  // to overflow the bottom of the screen too early.

	  if (visualViewport) {
	    width = visualViewport.width;
	    height = visualViewport.height; // Uses Layout Viewport (like Chrome; Safari does not currently)
	    // In Chrome, it returns a value very close to 0 (+/-) but contains rounding
	    // errors due to floating point numbers, so we need to check precision.
	    // Safari returns a number <= 0, usually < -1 when pinch-zoomed
	    // Feature detection fails in mobile emulation mode in Chrome.
	    // Math.abs(win.innerWidth / visualViewport.scale - visualViewport.width) <
	    // 0.001
	    // Fallback here: "Not Safari" userAgent

	    if (!/^((?!chrome|android).)*safari/i.test(navigator.userAgent)) {
	      x = visualViewport.offsetLeft;
	      y = visualViewport.offsetTop;
	    }
	  }

	  return {
	    width: width,
	    height: height,
	    x: x + getWindowScrollBarX(element),
	    y: y
	  };
	}

	// of the `<html>` and `<body>` rect bounds if horizontally scrollable

	function getDocumentRect(element) {
	  var _element$ownerDocumen;

	  var html = getDocumentElement(element);
	  var winScroll = getWindowScroll(element);
	  var body = (_element$ownerDocumen = element.ownerDocument) == null ? void 0 : _element$ownerDocumen.body;
	  var width = max(html.scrollWidth, html.clientWidth, body ? body.scrollWidth : 0, body ? body.clientWidth : 0);
	  var height = max(html.scrollHeight, html.clientHeight, body ? body.scrollHeight : 0, body ? body.clientHeight : 0);
	  var x = -winScroll.scrollLeft + getWindowScrollBarX(element);
	  var y = -winScroll.scrollTop;

	  if (getComputedStyle$1(body || html).direction === 'rtl') {
	    x += max(html.clientWidth, body ? body.clientWidth : 0) - width;
	  }

	  return {
	    width: width,
	    height: height,
	    x: x,
	    y: y
	  };
	}

	function isScrollParent(element) {
	  // Firefox wants us to check `-x` and `-y` variations as well
	  var _getComputedStyle = getComputedStyle$1(element),
	      overflow = _getComputedStyle.overflow,
	      overflowX = _getComputedStyle.overflowX,
	      overflowY = _getComputedStyle.overflowY;

	  return /auto|scroll|overlay|hidden/.test(overflow + overflowY + overflowX);
	}

	function getScrollParent(node) {
	  if (['html', 'body', '#document'].indexOf(getNodeName(node)) >= 0) {
	    // $FlowFixMe[incompatible-return]: assume body is always available
	    return node.ownerDocument.body;
	  }

	  if (isHTMLElement(node) && isScrollParent(node)) {
	    return node;
	  }

	  return getScrollParent(getParentNode(node));
	}

	/*
	given a DOM element, return the list of all scroll parents, up the list of ancesors
	until we get to the top window object. This list is what we attach scroll listeners
	to, because if any of these parent elements scroll, we'll need to re-calculate the
	reference element's position.
	*/

	function listScrollParents(element, list) {
	  var _element$ownerDocumen;

	  if (list === void 0) {
	    list = [];
	  }

	  var scrollParent = getScrollParent(element);
	  var isBody = scrollParent === ((_element$ownerDocumen = element.ownerDocument) == null ? void 0 : _element$ownerDocumen.body);
	  var win = getWindow(scrollParent);
	  var target = isBody ? [win].concat(win.visualViewport || [], isScrollParent(scrollParent) ? scrollParent : []) : scrollParent;
	  var updatedList = list.concat(target);
	  return isBody ? updatedList : // $FlowFixMe[incompatible-call]: isBody tells us target will be an HTMLElement here
	  updatedList.concat(listScrollParents(getParentNode(target)));
	}

	function rectToClientRect(rect) {
	  return Object.assign({}, rect, {
	    left: rect.x,
	    top: rect.y,
	    right: rect.x + rect.width,
	    bottom: rect.y + rect.height
	  });
	}

	function getInnerBoundingClientRect(element) {
	  var rect = getBoundingClientRect(element);
	  rect.top = rect.top + element.clientTop;
	  rect.left = rect.left + element.clientLeft;
	  rect.bottom = rect.top + element.clientHeight;
	  rect.right = rect.left + element.clientWidth;
	  rect.width = element.clientWidth;
	  rect.height = element.clientHeight;
	  rect.x = rect.left;
	  rect.y = rect.top;
	  return rect;
	}

	function getClientRectFromMixedType(element, clippingParent) {
	  return clippingParent === viewport ? rectToClientRect(getViewportRect(element)) : isElement(clippingParent) ? getInnerBoundingClientRect(clippingParent) : rectToClientRect(getDocumentRect(getDocumentElement(element)));
	} // A "clipping parent" is an overflowable container with the characteristic of
	// clipping (or hiding) overflowing elements with a position different from
	// `initial`


	function getClippingParents(element) {
	  var clippingParents = listScrollParents(getParentNode(element));
	  var canEscapeClipping = ['absolute', 'fixed'].indexOf(getComputedStyle$1(element).position) >= 0;
	  var clipperElement = canEscapeClipping && isHTMLElement(element) ? getOffsetParent(element) : element;

	  if (!isElement(clipperElement)) {
	    return [];
	  } // $FlowFixMe[incompatible-return]: https://github.com/facebook/flow/issues/1414


	  return clippingParents.filter(function (clippingParent) {
	    return isElement(clippingParent) && contains(clippingParent, clipperElement) && getNodeName(clippingParent) !== 'body' && (canEscapeClipping ? getComputedStyle$1(clippingParent).position !== 'static' : true);
	  });
	} // Gets the maximum area that the element is visible in due to any number of
	// clipping parents


	function getClippingRect(element, boundary, rootBoundary) {
	  var mainClippingParents = boundary === 'clippingParents' ? getClippingParents(element) : [].concat(boundary);
	  var clippingParents = [].concat(mainClippingParents, [rootBoundary]);
	  var firstClippingParent = clippingParents[0];
	  var clippingRect = clippingParents.reduce(function (accRect, clippingParent) {
	    var rect = getClientRectFromMixedType(element, clippingParent);
	    accRect.top = max(rect.top, accRect.top);
	    accRect.right = min(rect.right, accRect.right);
	    accRect.bottom = min(rect.bottom, accRect.bottom);
	    accRect.left = max(rect.left, accRect.left);
	    return accRect;
	  }, getClientRectFromMixedType(element, firstClippingParent));
	  clippingRect.width = clippingRect.right - clippingRect.left;
	  clippingRect.height = clippingRect.bottom - clippingRect.top;
	  clippingRect.x = clippingRect.left;
	  clippingRect.y = clippingRect.top;
	  return clippingRect;
	}

	function computeOffsets(_ref) {
	  var reference = _ref.reference,
	      element = _ref.element,
	      placement = _ref.placement;
	  var basePlacement = placement ? getBasePlacement(placement) : null;
	  var variation = placement ? getVariation(placement) : null;
	  var commonX = reference.x + reference.width / 2 - element.width / 2;
	  var commonY = reference.y + reference.height / 2 - element.height / 2;
	  var offsets;

	  switch (basePlacement) {
	    case top:
	      offsets = {
	        x: commonX,
	        y: reference.y - element.height
	      };
	      break;

	    case bottom:
	      offsets = {
	        x: commonX,
	        y: reference.y + reference.height
	      };
	      break;

	    case right:
	      offsets = {
	        x: reference.x + reference.width,
	        y: commonY
	      };
	      break;

	    case left:
	      offsets = {
	        x: reference.x - element.width,
	        y: commonY
	      };
	      break;

	    default:
	      offsets = {
	        x: reference.x,
	        y: reference.y
	      };
	  }

	  var mainAxis = basePlacement ? getMainAxisFromPlacement(basePlacement) : null;

	  if (mainAxis != null) {
	    var len = mainAxis === 'y' ? 'height' : 'width';

	    switch (variation) {
	      case start:
	        offsets[mainAxis] = offsets[mainAxis] - (reference[len] / 2 - element[len] / 2);
	        break;

	      case end:
	        offsets[mainAxis] = offsets[mainAxis] + (reference[len] / 2 - element[len] / 2);
	        break;
	    }
	  }

	  return offsets;
	}

	function detectOverflow(state, options) {
	  if (options === void 0) {
	    options = {};
	  }

	  var _options = options,
	      _options$placement = _options.placement,
	      placement = _options$placement === void 0 ? state.placement : _options$placement,
	      _options$boundary = _options.boundary,
	      boundary = _options$boundary === void 0 ? clippingParents : _options$boundary,
	      _options$rootBoundary = _options.rootBoundary,
	      rootBoundary = _options$rootBoundary === void 0 ? viewport : _options$rootBoundary,
	      _options$elementConte = _options.elementContext,
	      elementContext = _options$elementConte === void 0 ? popper : _options$elementConte,
	      _options$altBoundary = _options.altBoundary,
	      altBoundary = _options$altBoundary === void 0 ? false : _options$altBoundary,
	      _options$padding = _options.padding,
	      padding = _options$padding === void 0 ? 0 : _options$padding;
	  var paddingObject = mergePaddingObject(typeof padding !== 'number' ? padding : expandToHashMap(padding, basePlacements));
	  var altContext = elementContext === popper ? reference : popper;
	  var popperRect = state.rects.popper;
	  var element = state.elements[altBoundary ? altContext : elementContext];
	  var clippingClientRect = getClippingRect(isElement(element) ? element : element.contextElement || getDocumentElement(state.elements.popper), boundary, rootBoundary);
	  var referenceClientRect = getBoundingClientRect(state.elements.reference);
	  var popperOffsets = computeOffsets({
	    reference: referenceClientRect,
	    element: popperRect,
	    strategy: 'absolute',
	    placement: placement
	  });
	  var popperClientRect = rectToClientRect(Object.assign({}, popperRect, popperOffsets));
	  var elementClientRect = elementContext === popper ? popperClientRect : referenceClientRect; // positive = overflowing the clipping rect
	  // 0 or negative = within the clipping rect

	  var overflowOffsets = {
	    top: clippingClientRect.top - elementClientRect.top + paddingObject.top,
	    bottom: elementClientRect.bottom - clippingClientRect.bottom + paddingObject.bottom,
	    left: clippingClientRect.left - elementClientRect.left + paddingObject.left,
	    right: elementClientRect.right - clippingClientRect.right + paddingObject.right
	  };
	  var offsetData = state.modifiersData.offset; // Offsets can be applied only to the popper element

	  if (elementContext === popper && offsetData) {
	    var offset = offsetData[placement];
	    Object.keys(overflowOffsets).forEach(function (key) {
	      var multiply = [right, bottom].indexOf(key) >= 0 ? 1 : -1;
	      var axis = [top, bottom].indexOf(key) >= 0 ? 'y' : 'x';
	      overflowOffsets[key] += offset[axis] * multiply;
	    });
	  }

	  return overflowOffsets;
	}

	function computeAutoPlacement(state, options) {
	  if (options === void 0) {
	    options = {};
	  }

	  var _options = options,
	      placement = _options.placement,
	      boundary = _options.boundary,
	      rootBoundary = _options.rootBoundary,
	      padding = _options.padding,
	      flipVariations = _options.flipVariations,
	      _options$allowedAutoP = _options.allowedAutoPlacements,
	      allowedAutoPlacements = _options$allowedAutoP === void 0 ? placements : _options$allowedAutoP;
	  var variation = getVariation(placement);
	  var placements$1 = variation ? flipVariations ? variationPlacements : variationPlacements.filter(function (placement) {
	    return getVariation(placement) === variation;
	  }) : basePlacements;
	  var allowedPlacements = placements$1.filter(function (placement) {
	    return allowedAutoPlacements.indexOf(placement) >= 0;
	  });

	  if (allowedPlacements.length === 0) {
	    allowedPlacements = placements$1;
	  } // $FlowFixMe[incompatible-type]: Flow seems to have problems with two array unions...


	  var overflows = allowedPlacements.reduce(function (acc, placement) {
	    acc[placement] = detectOverflow(state, {
	      placement: placement,
	      boundary: boundary,
	      rootBoundary: rootBoundary,
	      padding: padding
	    })[getBasePlacement(placement)];
	    return acc;
	  }, {});
	  return Object.keys(overflows).sort(function (a, b) {
	    return overflows[a] - overflows[b];
	  });
	}

	function getExpandedFallbackPlacements(placement) {
	  if (getBasePlacement(placement) === auto) {
	    return [];
	  }

	  var oppositePlacement = getOppositePlacement(placement);
	  return [getOppositeVariationPlacement(placement), oppositePlacement, getOppositeVariationPlacement(oppositePlacement)];
	}

	function flip(_ref) {
	  var state = _ref.state,
	      options = _ref.options,
	      name = _ref.name;

	  if (state.modifiersData[name]._skip) {
	    return;
	  }

	  var _options$mainAxis = options.mainAxis,
	      checkMainAxis = _options$mainAxis === void 0 ? true : _options$mainAxis,
	      _options$altAxis = options.altAxis,
	      checkAltAxis = _options$altAxis === void 0 ? true : _options$altAxis,
	      specifiedFallbackPlacements = options.fallbackPlacements,
	      padding = options.padding,
	      boundary = options.boundary,
	      rootBoundary = options.rootBoundary,
	      altBoundary = options.altBoundary,
	      _options$flipVariatio = options.flipVariations,
	      flipVariations = _options$flipVariatio === void 0 ? true : _options$flipVariatio,
	      allowedAutoPlacements = options.allowedAutoPlacements;
	  var preferredPlacement = state.options.placement;
	  var basePlacement = getBasePlacement(preferredPlacement);
	  var isBasePlacement = basePlacement === preferredPlacement;
	  var fallbackPlacements = specifiedFallbackPlacements || (isBasePlacement || !flipVariations ? [getOppositePlacement(preferredPlacement)] : getExpandedFallbackPlacements(preferredPlacement));
	  var placements = [preferredPlacement].concat(fallbackPlacements).reduce(function (acc, placement) {
	    return acc.concat(getBasePlacement(placement) === auto ? computeAutoPlacement(state, {
	      placement: placement,
	      boundary: boundary,
	      rootBoundary: rootBoundary,
	      padding: padding,
	      flipVariations: flipVariations,
	      allowedAutoPlacements: allowedAutoPlacements
	    }) : placement);
	  }, []);
	  var referenceRect = state.rects.reference;
	  var popperRect = state.rects.popper;
	  var checksMap = new Map();
	  var makeFallbackChecks = true;
	  var firstFittingPlacement = placements[0];

	  for (var i = 0; i < placements.length; i++) {
	    var placement = placements[i];

	    var _basePlacement = getBasePlacement(placement);

	    var isStartVariation = getVariation(placement) === start;
	    var isVertical = [top, bottom].indexOf(_basePlacement) >= 0;
	    var len = isVertical ? 'width' : 'height';
	    var overflow = detectOverflow(state, {
	      placement: placement,
	      boundary: boundary,
	      rootBoundary: rootBoundary,
	      altBoundary: altBoundary,
	      padding: padding
	    });
	    var mainVariationSide = isVertical ? isStartVariation ? right : left : isStartVariation ? bottom : top;

	    if (referenceRect[len] > popperRect[len]) {
	      mainVariationSide = getOppositePlacement(mainVariationSide);
	    }

	    var altVariationSide = getOppositePlacement(mainVariationSide);
	    var checks = [];

	    if (checkMainAxis) {
	      checks.push(overflow[_basePlacement] <= 0);
	    }

	    if (checkAltAxis) {
	      checks.push(overflow[mainVariationSide] <= 0, overflow[altVariationSide] <= 0);
	    }

	    if (checks.every(function (check) {
	      return check;
	    })) {
	      firstFittingPlacement = placement;
	      makeFallbackChecks = false;
	      break;
	    }

	    checksMap.set(placement, checks);
	  }

	  if (makeFallbackChecks) {
	    // `2` may be desired in some cases – research later
	    var numberOfChecks = flipVariations ? 3 : 1;

	    var _loop = function _loop(_i) {
	      var fittingPlacement = placements.find(function (placement) {
	        var checks = checksMap.get(placement);

	        if (checks) {
	          return checks.slice(0, _i).every(function (check) {
	            return check;
	          });
	        }
	      });

	      if (fittingPlacement) {
	        firstFittingPlacement = fittingPlacement;
	        return "break";
	      }
	    };

	    for (var _i = numberOfChecks; _i > 0; _i--) {
	      var _ret = _loop(_i);

	      if (_ret === "break") break;
	    }
	  }

	  if (state.placement !== firstFittingPlacement) {
	    state.modifiersData[name]._skip = true;
	    state.placement = firstFittingPlacement;
	    state.reset = true;
	  }
	} // eslint-disable-next-line import/no-unused-modules


	var flip$1 = {
	  name: 'flip',
	  enabled: true,
	  phase: 'main',
	  fn: flip,
	  requiresIfExists: ['offset'],
	  data: {
	    _skip: false
	  }
	};

	function getSideOffsets(overflow, rect, preventedOffsets) {
	  if (preventedOffsets === void 0) {
	    preventedOffsets = {
	      x: 0,
	      y: 0
	    };
	  }

	  return {
	    top: overflow.top - rect.height - preventedOffsets.y,
	    right: overflow.right - rect.width + preventedOffsets.x,
	    bottom: overflow.bottom - rect.height + preventedOffsets.y,
	    left: overflow.left - rect.width - preventedOffsets.x
	  };
	}

	function isAnySideFullyClipped(overflow) {
	  return [top, right, bottom, left].some(function (side) {
	    return overflow[side] >= 0;
	  });
	}

	function hide(_ref) {
	  var state = _ref.state,
	      name = _ref.name;
	  var referenceRect = state.rects.reference;
	  var popperRect = state.rects.popper;
	  var preventedOffsets = state.modifiersData.preventOverflow;
	  var referenceOverflow = detectOverflow(state, {
	    elementContext: 'reference'
	  });
	  var popperAltOverflow = detectOverflow(state, {
	    altBoundary: true
	  });
	  var referenceClippingOffsets = getSideOffsets(referenceOverflow, referenceRect);
	  var popperEscapeOffsets = getSideOffsets(popperAltOverflow, popperRect, preventedOffsets);
	  var isReferenceHidden = isAnySideFullyClipped(referenceClippingOffsets);
	  var hasPopperEscaped = isAnySideFullyClipped(popperEscapeOffsets);
	  state.modifiersData[name] = {
	    referenceClippingOffsets: referenceClippingOffsets,
	    popperEscapeOffsets: popperEscapeOffsets,
	    isReferenceHidden: isReferenceHidden,
	    hasPopperEscaped: hasPopperEscaped
	  };
	  state.attributes.popper = Object.assign({}, state.attributes.popper, {
	    'data-popper-reference-hidden': isReferenceHidden,
	    'data-popper-escaped': hasPopperEscaped
	  });
	} // eslint-disable-next-line import/no-unused-modules


	var hide$1 = {
	  name: 'hide',
	  enabled: true,
	  phase: 'main',
	  requiresIfExists: ['preventOverflow'],
	  fn: hide
	};

	function distanceAndSkiddingToXY(placement, rects, offset) {
	  var basePlacement = getBasePlacement(placement);
	  var invertDistance = [left, top].indexOf(basePlacement) >= 0 ? -1 : 1;

	  var _ref = typeof offset === 'function' ? offset(Object.assign({}, rects, {
	    placement: placement
	  })) : offset,
	      skidding = _ref[0],
	      distance = _ref[1];

	  skidding = skidding || 0;
	  distance = (distance || 0) * invertDistance;
	  return [left, right].indexOf(basePlacement) >= 0 ? {
	    x: distance,
	    y: skidding
	  } : {
	    x: skidding,
	    y: distance
	  };
	}

	function offset$1(_ref2) {
	  var state = _ref2.state,
	      options = _ref2.options,
	      name = _ref2.name;
	  var _options$offset = options.offset,
	      offset = _options$offset === void 0 ? [0, 0] : _options$offset;
	  var data = placements.reduce(function (acc, placement) {
	    acc[placement] = distanceAndSkiddingToXY(placement, state.rects, offset);
	    return acc;
	  }, {});
	  var _data$state$placement = data[state.placement],
	      x = _data$state$placement.x,
	      y = _data$state$placement.y;

	  if (state.modifiersData.popperOffsets != null) {
	    state.modifiersData.popperOffsets.x += x;
	    state.modifiersData.popperOffsets.y += y;
	  }

	  state.modifiersData[name] = data;
	} // eslint-disable-next-line import/no-unused-modules


	var offset$2 = {
	  name: 'offset',
	  enabled: true,
	  phase: 'main',
	  requires: ['popperOffsets'],
	  fn: offset$1
	};

	function popperOffsets(_ref) {
	  var state = _ref.state,
	      name = _ref.name;
	  // Offsets are the actual position the popper needs to have to be
	  // properly positioned near its reference element
	  // This is the most basic placement, and will be adjusted by
	  // the modifiers in the next step
	  state.modifiersData[name] = computeOffsets({
	    reference: state.rects.reference,
	    element: state.rects.popper,
	    strategy: 'absolute',
	    placement: state.placement
	  });
	} // eslint-disable-next-line import/no-unused-modules


	var popperOffsets$1 = {
	  name: 'popperOffsets',
	  enabled: true,
	  phase: 'read',
	  fn: popperOffsets,
	  data: {}
	};

	function getAltAxis(axis) {
	  return axis === 'x' ? 'y' : 'x';
	}

	function preventOverflow(_ref) {
	  var state = _ref.state,
	      options = _ref.options,
	      name = _ref.name;
	  var _options$mainAxis = options.mainAxis,
	      checkMainAxis = _options$mainAxis === void 0 ? true : _options$mainAxis,
	      _options$altAxis = options.altAxis,
	      checkAltAxis = _options$altAxis === void 0 ? false : _options$altAxis,
	      boundary = options.boundary,
	      rootBoundary = options.rootBoundary,
	      altBoundary = options.altBoundary,
	      padding = options.padding,
	      _options$tether = options.tether,
	      tether = _options$tether === void 0 ? true : _options$tether,
	      _options$tetherOffset = options.tetherOffset,
	      tetherOffset = _options$tetherOffset === void 0 ? 0 : _options$tetherOffset;
	  var overflow = detectOverflow(state, {
	    boundary: boundary,
	    rootBoundary: rootBoundary,
	    padding: padding,
	    altBoundary: altBoundary
	  });
	  var basePlacement = getBasePlacement(state.placement);
	  var variation = getVariation(state.placement);
	  var isBasePlacement = !variation;
	  var mainAxis = getMainAxisFromPlacement(basePlacement);
	  var altAxis = getAltAxis(mainAxis);
	  var popperOffsets = state.modifiersData.popperOffsets;
	  var referenceRect = state.rects.reference;
	  var popperRect = state.rects.popper;
	  var tetherOffsetValue = typeof tetherOffset === 'function' ? tetherOffset(Object.assign({}, state.rects, {
	    placement: state.placement
	  })) : tetherOffset;
	  var normalizedTetherOffsetValue = typeof tetherOffsetValue === 'number' ? {
	    mainAxis: tetherOffsetValue,
	    altAxis: tetherOffsetValue
	  } : Object.assign({
	    mainAxis: 0,
	    altAxis: 0
	  }, tetherOffsetValue);
	  var offsetModifierState = state.modifiersData.offset ? state.modifiersData.offset[state.placement] : null;
	  var data = {
	    x: 0,
	    y: 0
	  };

	  if (!popperOffsets) {
	    return;
	  }

	  if (checkMainAxis) {
	    var _offsetModifierState$;

	    var mainSide = mainAxis === 'y' ? top : left;
	    var altSide = mainAxis === 'y' ? bottom : right;
	    var len = mainAxis === 'y' ? 'height' : 'width';
	    var offset = popperOffsets[mainAxis];
	    var min$1 = offset + overflow[mainSide];
	    var max$1 = offset - overflow[altSide];
	    var additive = tether ? -popperRect[len] / 2 : 0;
	    var minLen = variation === start ? referenceRect[len] : popperRect[len];
	    var maxLen = variation === start ? -popperRect[len] : -referenceRect[len]; // We need to include the arrow in the calculation so the arrow doesn't go
	    // outside the reference bounds

	    var arrowElement = state.elements.arrow;
	    var arrowRect = tether && arrowElement ? getLayoutRect(arrowElement) : {
	      width: 0,
	      height: 0
	    };
	    var arrowPaddingObject = state.modifiersData['arrow#persistent'] ? state.modifiersData['arrow#persistent'].padding : getFreshSideObject();
	    var arrowPaddingMin = arrowPaddingObject[mainSide];
	    var arrowPaddingMax = arrowPaddingObject[altSide]; // If the reference length is smaller than the arrow length, we don't want
	    // to include its full size in the calculation. If the reference is small
	    // and near the edge of a boundary, the popper can overflow even if the
	    // reference is not overflowing as well (e.g. virtual elements with no
	    // width or height)

	    var arrowLen = within(0, referenceRect[len], arrowRect[len]);
	    var minOffset = isBasePlacement ? referenceRect[len] / 2 - additive - arrowLen - arrowPaddingMin - normalizedTetherOffsetValue.mainAxis : minLen - arrowLen - arrowPaddingMin - normalizedTetherOffsetValue.mainAxis;
	    var maxOffset = isBasePlacement ? -referenceRect[len] / 2 + additive + arrowLen + arrowPaddingMax + normalizedTetherOffsetValue.mainAxis : maxLen + arrowLen + arrowPaddingMax + normalizedTetherOffsetValue.mainAxis;
	    var arrowOffsetParent = state.elements.arrow && getOffsetParent(state.elements.arrow);
	    var clientOffset = arrowOffsetParent ? mainAxis === 'y' ? arrowOffsetParent.clientTop || 0 : arrowOffsetParent.clientLeft || 0 : 0;
	    var offsetModifierValue = (_offsetModifierState$ = offsetModifierState == null ? void 0 : offsetModifierState[mainAxis]) != null ? _offsetModifierState$ : 0;
	    var tetherMin = offset + minOffset - offsetModifierValue - clientOffset;
	    var tetherMax = offset + maxOffset - offsetModifierValue;
	    var preventedOffset = within(tether ? min(min$1, tetherMin) : min$1, offset, tether ? max(max$1, tetherMax) : max$1);
	    popperOffsets[mainAxis] = preventedOffset;
	    data[mainAxis] = preventedOffset - offset;
	  }

	  if (checkAltAxis) {
	    var _offsetModifierState$2;

	    var _mainSide = mainAxis === 'x' ? top : left;

	    var _altSide = mainAxis === 'x' ? bottom : right;

	    var _offset = popperOffsets[altAxis];

	    var _len = altAxis === 'y' ? 'height' : 'width';

	    var _min = _offset + overflow[_mainSide];

	    var _max = _offset - overflow[_altSide];

	    var isOriginSide = [top, left].indexOf(basePlacement) !== -1;

	    var _offsetModifierValue = (_offsetModifierState$2 = offsetModifierState == null ? void 0 : offsetModifierState[altAxis]) != null ? _offsetModifierState$2 : 0;

	    var _tetherMin = isOriginSide ? _min : _offset - referenceRect[_len] - popperRect[_len] - _offsetModifierValue + normalizedTetherOffsetValue.altAxis;

	    var _tetherMax = isOriginSide ? _offset + referenceRect[_len] + popperRect[_len] - _offsetModifierValue - normalizedTetherOffsetValue.altAxis : _max;

	    var _preventedOffset = tether && isOriginSide ? withinMaxClamp(_tetherMin, _offset, _tetherMax) : within(tether ? _tetherMin : _min, _offset, tether ? _tetherMax : _max);

	    popperOffsets[altAxis] = _preventedOffset;
	    data[altAxis] = _preventedOffset - _offset;
	  }

	  state.modifiersData[name] = data;
	} // eslint-disable-next-line import/no-unused-modules


	var preventOverflow$1 = {
	  name: 'preventOverflow',
	  enabled: true,
	  phase: 'main',
	  fn: preventOverflow,
	  requiresIfExists: ['offset']
	};

	function getHTMLElementScroll(element) {
	  return {
	    scrollLeft: element.scrollLeft,
	    scrollTop: element.scrollTop
	  };
	}

	function getNodeScroll(node) {
	  if (node === getWindow(node) || !isHTMLElement(node)) {
	    return getWindowScroll(node);
	  } else {
	    return getHTMLElementScroll(node);
	  }
	}

	function isElementScaled(element) {
	  var rect = element.getBoundingClientRect();
	  var scaleX = round(rect.width) / element.offsetWidth || 1;
	  var scaleY = round(rect.height) / element.offsetHeight || 1;
	  return scaleX !== 1 || scaleY !== 1;
	} // Returns the composite rect of an element relative to its offsetParent.
	// Composite means it takes into account transforms as well as layout.


	function getCompositeRect(elementOrVirtualElement, offsetParent, isFixed) {
	  if (isFixed === void 0) {
	    isFixed = false;
	  }

	  var isOffsetParentAnElement = isHTMLElement(offsetParent);
	  var offsetParentIsScaled = isHTMLElement(offsetParent) && isElementScaled(offsetParent);
	  var documentElement = getDocumentElement(offsetParent);
	  var rect = getBoundingClientRect(elementOrVirtualElement, offsetParentIsScaled);
	  var scroll = {
	    scrollLeft: 0,
	    scrollTop: 0
	  };
	  var offsets = {
	    x: 0,
	    y: 0
	  };

	  if (isOffsetParentAnElement || !isOffsetParentAnElement && !isFixed) {
	    if (getNodeName(offsetParent) !== 'body' || // https://github.com/popperjs/popper-core/issues/1078
	    isScrollParent(documentElement)) {
	      scroll = getNodeScroll(offsetParent);
	    }

	    if (isHTMLElement(offsetParent)) {
	      offsets = getBoundingClientRect(offsetParent, true);
	      offsets.x += offsetParent.clientLeft;
	      offsets.y += offsetParent.clientTop;
	    } else if (documentElement) {
	      offsets.x = getWindowScrollBarX(documentElement);
	    }
	  }

	  return {
	    x: rect.left + scroll.scrollLeft - offsets.x,
	    y: rect.top + scroll.scrollTop - offsets.y,
	    width: rect.width,
	    height: rect.height
	  };
	}

	function order(modifiers) {
	  var map = new Map();
	  var visited = new Set();
	  var result = [];
	  modifiers.forEach(function (modifier) {
	    map.set(modifier.name, modifier);
	  }); // On visiting object, check for its dependencies and visit them recursively

	  function sort(modifier) {
	    visited.add(modifier.name);
	    var requires = [].concat(modifier.requires || [], modifier.requiresIfExists || []);
	    requires.forEach(function (dep) {
	      if (!visited.has(dep)) {
	        var depModifier = map.get(dep);

	        if (depModifier) {
	          sort(depModifier);
	        }
	      }
	    });
	    result.push(modifier);
	  }

	  modifiers.forEach(function (modifier) {
	    if (!visited.has(modifier.name)) {
	      // check for visited object
	      sort(modifier);
	    }
	  });
	  return result;
	}

	function orderModifiers(modifiers) {
	  // order based on dependencies
	  var orderedModifiers = order(modifiers); // order based on phase

	  return modifierPhases.reduce(function (acc, phase) {
	    return acc.concat(orderedModifiers.filter(function (modifier) {
	      return modifier.phase === phase;
	    }));
	  }, []);
	}

	function debounce$2(fn) {
	  var pending;
	  return function () {
	    if (!pending) {
	      pending = new Promise(function (resolve) {
	        Promise.resolve().then(function () {
	          pending = undefined;
	          resolve(fn());
	        });
	      });
	    }

	    return pending;
	  };
	}

	function mergeByName(modifiers) {
	  var merged = modifiers.reduce(function (merged, current) {
	    var existing = merged[current.name];
	    merged[current.name] = existing ? Object.assign({}, existing, current, {
	      options: Object.assign({}, existing.options, current.options),
	      data: Object.assign({}, existing.data, current.data)
	    }) : current;
	    return merged;
	  }, {}); // IE11 does not support Object.values

	  return Object.keys(merged).map(function (key) {
	    return merged[key];
	  });
	}

	var DEFAULT_OPTIONS = {
	  placement: 'bottom',
	  modifiers: [],
	  strategy: 'absolute'
	};

	function areValidElements() {
	  for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
	    args[_key] = arguments[_key];
	  }

	  return !args.some(function (element) {
	    return !(element && typeof element.getBoundingClientRect === 'function');
	  });
	}

	function popperGenerator(generatorOptions) {
	  if (generatorOptions === void 0) {
	    generatorOptions = {};
	  }

	  var _generatorOptions = generatorOptions,
	      _generatorOptions$def = _generatorOptions.defaultModifiers,
	      defaultModifiers = _generatorOptions$def === void 0 ? [] : _generatorOptions$def,
	      _generatorOptions$def2 = _generatorOptions.defaultOptions,
	      defaultOptions = _generatorOptions$def2 === void 0 ? DEFAULT_OPTIONS : _generatorOptions$def2;
	  return function createPopper(reference, popper, options) {
	    if (options === void 0) {
	      options = defaultOptions;
	    }

	    var state = {
	      placement: 'bottom',
	      orderedModifiers: [],
	      options: Object.assign({}, DEFAULT_OPTIONS, defaultOptions),
	      modifiersData: {},
	      elements: {
	        reference: reference,
	        popper: popper
	      },
	      attributes: {},
	      styles: {}
	    };
	    var effectCleanupFns = [];
	    var isDestroyed = false;
	    var instance = {
	      state: state,
	      setOptions: function setOptions(setOptionsAction) {
	        var options = typeof setOptionsAction === 'function' ? setOptionsAction(state.options) : setOptionsAction;
	        cleanupModifierEffects();
	        state.options = Object.assign({}, defaultOptions, state.options, options);
	        state.scrollParents = {
	          reference: isElement(reference) ? listScrollParents(reference) : reference.contextElement ? listScrollParents(reference.contextElement) : [],
	          popper: listScrollParents(popper)
	        }; // Orders the modifiers based on their dependencies and `phase`
	        // properties

	        var orderedModifiers = orderModifiers(mergeByName([].concat(defaultModifiers, state.options.modifiers))); // Strip out disabled modifiers

	        state.orderedModifiers = orderedModifiers.filter(function (m) {
	          return m.enabled;
	        }); // Validate the provided modifiers so that the consumer will get warned

	        runModifierEffects();
	        return instance.update();
	      },
	      // Sync update – it will always be executed, even if not necessary. This
	      // is useful for low frequency updates where sync behavior simplifies the
	      // logic.
	      // For high frequency updates (e.g. `resize` and `scroll` events), always
	      // prefer the async Popper#update method
	      forceUpdate: function forceUpdate() {
	        if (isDestroyed) {
	          return;
	        }

	        var _state$elements = state.elements,
	            reference = _state$elements.reference,
	            popper = _state$elements.popper; // Don't proceed if `reference` or `popper` are not valid elements
	        // anymore

	        if (!areValidElements(reference, popper)) {

	          return;
	        } // Store the reference and popper rects to be read by modifiers


	        state.rects = {
	          reference: getCompositeRect(reference, getOffsetParent(popper), state.options.strategy === 'fixed'),
	          popper: getLayoutRect(popper)
	        }; // Modifiers have the ability to reset the current update cycle. The
	        // most common use case for this is the `flip` modifier changing the
	        // placement, which then needs to re-run all the modifiers, because the
	        // logic was previously ran for the previous placement and is therefore
	        // stale/incorrect

	        state.reset = false;
	        state.placement = state.options.placement; // On each update cycle, the `modifiersData` property for each modifier
	        // is filled with the initial data specified by the modifier. This means
	        // it doesn't persist and is fresh on each update.
	        // To ensure persistent data, use `${name}#persistent`

	        state.orderedModifiers.forEach(function (modifier) {
	          return state.modifiersData[modifier.name] = Object.assign({}, modifier.data);
	        });

	        for (var index = 0; index < state.orderedModifiers.length; index++) {

	          if (state.reset === true) {
	            state.reset = false;
	            index = -1;
	            continue;
	          }

	          var _state$orderedModifie = state.orderedModifiers[index],
	              fn = _state$orderedModifie.fn,
	              _state$orderedModifie2 = _state$orderedModifie.options,
	              _options = _state$orderedModifie2 === void 0 ? {} : _state$orderedModifie2,
	              name = _state$orderedModifie.name;

	          if (typeof fn === 'function') {
	            state = fn({
	              state: state,
	              options: _options,
	              name: name,
	              instance: instance
	            }) || state;
	          }
	        }
	      },
	      // Async and optimistically optimized update – it will not be executed if
	      // not necessary (debounced to run at most once-per-tick)
	      update: debounce$2(function () {
	        return new Promise(function (resolve) {
	          instance.forceUpdate();
	          resolve(state);
	        });
	      }),
	      destroy: function destroy() {
	        cleanupModifierEffects();
	        isDestroyed = true;
	      }
	    };

	    if (!areValidElements(reference, popper)) {

	      return instance;
	    }

	    instance.setOptions(options).then(function (state) {
	      if (!isDestroyed && options.onFirstUpdate) {
	        options.onFirstUpdate(state);
	      }
	    }); // Modifiers have the ability to execute arbitrary code before the first
	    // update cycle runs. They will be executed in the same order as the update
	    // cycle. This is useful when a modifier adds some persistent data that
	    // other modifiers need to use, but the modifier is run after the dependent
	    // one.

	    function runModifierEffects() {
	      state.orderedModifiers.forEach(function (_ref3) {
	        var name = _ref3.name,
	            _ref3$options = _ref3.options,
	            options = _ref3$options === void 0 ? {} : _ref3$options,
	            effect = _ref3.effect;

	        if (typeof effect === 'function') {
	          var cleanupFn = effect({
	            state: state,
	            name: name,
	            instance: instance,
	            options: options
	          });

	          var noopFn = function noopFn() {};

	          effectCleanupFns.push(cleanupFn || noopFn);
	        }
	      });
	    }

	    function cleanupModifierEffects() {
	      effectCleanupFns.forEach(function (fn) {
	        return fn();
	      });
	      effectCleanupFns = [];
	    }

	    return instance;
	  };
	}
	var createPopper$2 = /*#__PURE__*/popperGenerator(); // eslint-disable-next-line import/no-unused-modules

	var defaultModifiers$1 = [eventListeners, popperOffsets$1, computeStyles$1, applyStyles$1];
	var createPopper$1 = /*#__PURE__*/popperGenerator({
	  defaultModifiers: defaultModifiers$1
	}); // eslint-disable-next-line import/no-unused-modules

	var defaultModifiers = [eventListeners, popperOffsets$1, computeStyles$1, applyStyles$1, offset$2, flip$1, preventOverflow$1, arrow$1, hide$1];
	var createPopper = /*#__PURE__*/popperGenerator({
	  defaultModifiers: defaultModifiers
	}); // eslint-disable-next-line import/no-unused-modules

	var lib = /*#__PURE__*/Object.freeze({
		__proto__: null,
		popperGenerator: popperGenerator,
		detectOverflow: detectOverflow,
		createPopperBase: createPopper$2,
		createPopper: createPopper,
		createPopperLite: createPopper$1,
		top: top,
		bottom: bottom,
		right: right,
		left: left,
		auto: auto,
		basePlacements: basePlacements,
		start: start,
		end: end,
		clippingParents: clippingParents,
		viewport: viewport,
		popper: popper,
		reference: reference,
		variationPlacements: variationPlacements,
		placements: placements,
		beforeRead: beforeRead,
		read: read,
		afterRead: afterRead,
		beforeMain: beforeMain,
		main: main,
		afterMain: afterMain,
		beforeWrite: beforeWrite,
		write: write,
		afterWrite: afterWrite,
		modifierPhases: modifierPhases,
		applyStyles: applyStyles$1,
		arrow: arrow$1,
		computeStyles: computeStyles$1,
		eventListeners: eventListeners,
		flip: flip$1,
		hide: hide$1,
		offset: offset$2,
		popperOffsets: popperOffsets$1,
		preventOverflow: preventOverflow$1
	});

	var require$$0 = /*@__PURE__*/getAugmentedNamespace(lib);

	/*!
	  * Bootstrap dropdown.js v5.1.3 (https://getbootstrap.com/)
	  * Copyright 2011-2021 The Bootstrap Authors (https://github.com/twbs/bootstrap/graphs/contributors)
	  * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
	  */

	(function (module, exports) {
	(function (global, factory) {
	  module.exports = factory(require$$0, eventHandler.exports, manipulator.exports, selectorEngine.exports, baseComponent.exports) ;
	})(commonjsGlobal, (function (Popper, EventHandler, Manipulator, SelectorEngine, BaseComponent) {
	  const _interopDefaultLegacy = e => e && typeof e === 'object' && 'default' in e ? e : { default: e };

	  function _interopNamespace(e) {
	    if (e && e.__esModule) return e;
	    const n = Object.create(null);
	    if (e) {
	      for (const k in e) {
	        if (k !== 'default') {
	          const d = Object.getOwnPropertyDescriptor(e, k);
	          Object.defineProperty(n, k, d.get ? d : {
	            enumerable: true,
	            get: () => e[k]
	          });
	        }
	      }
	    }
	    n.default = e;
	    return Object.freeze(n);
	  }

	  const Popper__namespace = /*#__PURE__*/_interopNamespace(Popper);
	  const EventHandler__default = /*#__PURE__*/_interopDefaultLegacy(EventHandler);
	  const Manipulator__default = /*#__PURE__*/_interopDefaultLegacy(Manipulator);
	  const SelectorEngine__default = /*#__PURE__*/_interopDefaultLegacy(SelectorEngine);
	  const BaseComponent__default = /*#__PURE__*/_interopDefaultLegacy(BaseComponent);

	  /**
	   * --------------------------------------------------------------------------
	   * Bootstrap (v5.1.3): util/index.js
	   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
	   * --------------------------------------------------------------------------
	   */

	  const toType = obj => {
	    if (obj === null || obj === undefined) {
	      return `${obj}`;
	    }

	    return {}.toString.call(obj).match(/\s([a-z]+)/i)[1].toLowerCase();
	  };

	  const getSelector = element => {
	    let selector = element.getAttribute('data-bs-target');

	    if (!selector || selector === '#') {
	      let hrefAttr = element.getAttribute('href'); // The only valid content that could double as a selector are IDs or classes,
	      // so everything starting with `#` or `.`. If a "real" URL is used as the selector,
	      // `document.querySelector` will rightfully complain it is invalid.
	      // See https://github.com/twbs/bootstrap/issues/32273

	      if (!hrefAttr || !hrefAttr.includes('#') && !hrefAttr.startsWith('.')) {
	        return null;
	      } // Just in case some CMS puts out a full URL with the anchor appended


	      if (hrefAttr.includes('#') && !hrefAttr.startsWith('#')) {
	        hrefAttr = `#${hrefAttr.split('#')[1]}`;
	      }

	      selector = hrefAttr && hrefAttr !== '#' ? hrefAttr.trim() : null;
	    }

	    return selector;
	  };

	  const getElementFromSelector = element => {
	    const selector = getSelector(element);
	    return selector ? document.querySelector(selector) : null;
	  };

	  const isElement = obj => {
	    if (!obj || typeof obj !== 'object') {
	      return false;
	    }

	    if (typeof obj.jquery !== 'undefined') {
	      obj = obj[0];
	    }

	    return typeof obj.nodeType !== 'undefined';
	  };

	  const getElement = obj => {
	    if (isElement(obj)) {
	      // it's a jQuery object or a node element
	      return obj.jquery ? obj[0] : obj;
	    }

	    if (typeof obj === 'string' && obj.length > 0) {
	      return document.querySelector(obj);
	    }

	    return null;
	  };

	  const typeCheckConfig = (componentName, config, configTypes) => {
	    Object.keys(configTypes).forEach(property => {
	      const expectedTypes = configTypes[property];
	      const value = config[property];
	      const valueType = value && isElement(value) ? 'element' : toType(value);

	      if (!new RegExp(expectedTypes).test(valueType)) {
	        throw new TypeError(`${componentName.toUpperCase()}: Option "${property}" provided type "${valueType}" but expected type "${expectedTypes}".`);
	      }
	    });
	  };

	  const isVisible = element => {
	    if (!isElement(element) || element.getClientRects().length === 0) {
	      return false;
	    }

	    return getComputedStyle(element).getPropertyValue('visibility') === 'visible';
	  };

	  const isDisabled = element => {
	    if (!element || element.nodeType !== Node.ELEMENT_NODE) {
	      return true;
	    }

	    if (element.classList.contains('disabled')) {
	      return true;
	    }

	    if (typeof element.disabled !== 'undefined') {
	      return element.disabled;
	    }

	    return element.hasAttribute('disabled') && element.getAttribute('disabled') !== 'false';
	  };

	  const noop = () => {};

	  const getjQuery = () => {
	    const {
	      jQuery
	    } = window;

	    if (jQuery && !document.body.hasAttribute('data-bs-no-jquery')) {
	      return jQuery;
	    }

	    return null;
	  };

	  const DOMContentLoadedCallbacks = [];

	  const onDOMContentLoaded = callback => {
	    if (document.readyState === 'loading') {
	      // add listener on the first call when the document is in loading state
	      if (!DOMContentLoadedCallbacks.length) {
	        document.addEventListener('DOMContentLoaded', () => {
	          DOMContentLoadedCallbacks.forEach(callback => callback());
	        });
	      }

	      DOMContentLoadedCallbacks.push(callback);
	    } else {
	      callback();
	    }
	  };

	  const isRTL = () => document.documentElement.dir === 'rtl';

	  const defineJQueryPlugin = plugin => {
	    onDOMContentLoaded(() => {
	      const $ = getjQuery();
	      /* istanbul ignore if */

	      if ($) {
	        const name = plugin.NAME;
	        const JQUERY_NO_CONFLICT = $.fn[name];
	        $.fn[name] = plugin.jQueryInterface;
	        $.fn[name].Constructor = plugin;

	        $.fn[name].noConflict = () => {
	          $.fn[name] = JQUERY_NO_CONFLICT;
	          return plugin.jQueryInterface;
	        };
	      }
	    });
	  };
	  /**
	   * Return the previous/next element of a list.
	   *
	   * @param {array} list    The list of elements
	   * @param activeElement   The active element
	   * @param shouldGetNext   Choose to get next or previous element
	   * @param isCycleAllowed
	   * @return {Element|elem} The proper element
	   */


	  const getNextActiveElement = (list, activeElement, shouldGetNext, isCycleAllowed) => {
	    let index = list.indexOf(activeElement); // if the element does not exist in the list return an element depending on the direction and if cycle is allowed

	    if (index === -1) {
	      return list[!shouldGetNext && isCycleAllowed ? list.length - 1 : 0];
	    }

	    const listLength = list.length;
	    index += shouldGetNext ? 1 : -1;

	    if (isCycleAllowed) {
	      index = (index + listLength) % listLength;
	    }

	    return list[Math.max(0, Math.min(index, listLength - 1))];
	  };

	  /**
	   * --------------------------------------------------------------------------
	   * Bootstrap (v5.1.3): dropdown.js
	   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
	   * --------------------------------------------------------------------------
	   */
	  /**
	   * ------------------------------------------------------------------------
	   * Constants
	   * ------------------------------------------------------------------------
	   */

	  const NAME = 'dropdown';
	  const DATA_KEY = 'bs.dropdown';
	  const EVENT_KEY = `.${DATA_KEY}`;
	  const DATA_API_KEY = '.data-api';
	  const ESCAPE_KEY = 'Escape';
	  const SPACE_KEY = 'Space';
	  const TAB_KEY = 'Tab';
	  const ARROW_UP_KEY = 'ArrowUp';
	  const ARROW_DOWN_KEY = 'ArrowDown';
	  const RIGHT_MOUSE_BUTTON = 2; // MouseEvent.button value for the secondary button, usually the right button

	  const REGEXP_KEYDOWN = new RegExp(`${ARROW_UP_KEY}|${ARROW_DOWN_KEY}|${ESCAPE_KEY}`);
	  const EVENT_HIDE = `hide${EVENT_KEY}`;
	  const EVENT_HIDDEN = `hidden${EVENT_KEY}`;
	  const EVENT_SHOW = `show${EVENT_KEY}`;
	  const EVENT_SHOWN = `shown${EVENT_KEY}`;
	  const EVENT_CLICK_DATA_API = `click${EVENT_KEY}${DATA_API_KEY}`;
	  const EVENT_KEYDOWN_DATA_API = `keydown${EVENT_KEY}${DATA_API_KEY}`;
	  const EVENT_KEYUP_DATA_API = `keyup${EVENT_KEY}${DATA_API_KEY}`;
	  const CLASS_NAME_SHOW = 'show';
	  const CLASS_NAME_DROPUP = 'dropup';
	  const CLASS_NAME_DROPEND = 'dropend';
	  const CLASS_NAME_DROPSTART = 'dropstart';
	  const CLASS_NAME_NAVBAR = 'navbar';
	  const SELECTOR_DATA_TOGGLE = '[data-bs-toggle="dropdown"]';
	  const SELECTOR_MENU = '.dropdown-menu';
	  const SELECTOR_NAVBAR_NAV = '.navbar-nav';
	  const SELECTOR_VISIBLE_ITEMS = '.dropdown-menu .dropdown-item:not(.disabled):not(:disabled)';
	  const PLACEMENT_TOP = isRTL() ? 'top-end' : 'top-start';
	  const PLACEMENT_TOPEND = isRTL() ? 'top-start' : 'top-end';
	  const PLACEMENT_BOTTOM = isRTL() ? 'bottom-end' : 'bottom-start';
	  const PLACEMENT_BOTTOMEND = isRTL() ? 'bottom-start' : 'bottom-end';
	  const PLACEMENT_RIGHT = isRTL() ? 'left-start' : 'right-start';
	  const PLACEMENT_LEFT = isRTL() ? 'right-start' : 'left-start';
	  const Default = {
	    offset: [0, 2],
	    boundary: 'clippingParents',
	    reference: 'toggle',
	    display: 'dynamic',
	    popperConfig: null,
	    autoClose: true
	  };
	  const DefaultType = {
	    offset: '(array|string|function)',
	    boundary: '(string|element)',
	    reference: '(string|element|object)',
	    display: 'string',
	    popperConfig: '(null|object|function)',
	    autoClose: '(boolean|string)'
	  };
	  /**
	   * ------------------------------------------------------------------------
	   * Class Definition
	   * ------------------------------------------------------------------------
	   */

	  class Dropdown extends BaseComponent__default.default {
	    constructor(element, config) {
	      super(element);
	      this._popper = null;
	      this._config = this._getConfig(config);
	      this._menu = this._getMenuElement();
	      this._inNavbar = this._detectNavbar();
	    } // Getters


	    static get Default() {
	      return Default;
	    }

	    static get DefaultType() {
	      return DefaultType;
	    }

	    static get NAME() {
	      return NAME;
	    } // Public


	    toggle() {
	      return this._isShown() ? this.hide() : this.show();
	    }

	    show() {
	      if (isDisabled(this._element) || this._isShown(this._menu)) {
	        return;
	      }

	      const relatedTarget = {
	        relatedTarget: this._element
	      };
	      const showEvent = EventHandler__default.default.trigger(this._element, EVENT_SHOW, relatedTarget);

	      if (showEvent.defaultPrevented) {
	        return;
	      }

	      const parent = Dropdown.getParentFromElement(this._element); // Totally disable Popper for Dropdowns in Navbar

	      if (this._inNavbar) {
	        Manipulator__default.default.setDataAttribute(this._menu, 'popper', 'none');
	      } else {
	        this._createPopper(parent);
	      } // If this is a touch-enabled device we add extra
	      // empty mouseover listeners to the body's immediate children;
	      // only needed because of broken event delegation on iOS
	      // https://www.quirksmode.org/blog/archives/2014/02/mouse_event_bub.html


	      if ('ontouchstart' in document.documentElement && !parent.closest(SELECTOR_NAVBAR_NAV)) {
	        [].concat(...document.body.children).forEach(elem => EventHandler__default.default.on(elem, 'mouseover', noop));
	      }

	      this._element.focus();

	      this._element.setAttribute('aria-expanded', true);

	      this._menu.classList.add(CLASS_NAME_SHOW);

	      this._element.classList.add(CLASS_NAME_SHOW);

	      EventHandler__default.default.trigger(this._element, EVENT_SHOWN, relatedTarget);
	    }

	    hide() {
	      if (isDisabled(this._element) || !this._isShown(this._menu)) {
	        return;
	      }

	      const relatedTarget = {
	        relatedTarget: this._element
	      };

	      this._completeHide(relatedTarget);
	    }

	    dispose() {
	      if (this._popper) {
	        this._popper.destroy();
	      }

	      super.dispose();
	    }

	    update() {
	      this._inNavbar = this._detectNavbar();

	      if (this._popper) {
	        this._popper.update();
	      }
	    } // Private


	    _completeHide(relatedTarget) {
	      const hideEvent = EventHandler__default.default.trigger(this._element, EVENT_HIDE, relatedTarget);

	      if (hideEvent.defaultPrevented) {
	        return;
	      } // If this is a touch-enabled device we remove the extra
	      // empty mouseover listeners we added for iOS support


	      if ('ontouchstart' in document.documentElement) {
	        [].concat(...document.body.children).forEach(elem => EventHandler__default.default.off(elem, 'mouseover', noop));
	      }

	      if (this._popper) {
	        this._popper.destroy();
	      }

	      this._menu.classList.remove(CLASS_NAME_SHOW);

	      this._element.classList.remove(CLASS_NAME_SHOW);

	      this._element.setAttribute('aria-expanded', 'false');

	      Manipulator__default.default.removeDataAttribute(this._menu, 'popper');
	      EventHandler__default.default.trigger(this._element, EVENT_HIDDEN, relatedTarget);
	    }

	    _getConfig(config) {
	      config = { ...this.constructor.Default,
	        ...Manipulator__default.default.getDataAttributes(this._element),
	        ...config
	      };
	      typeCheckConfig(NAME, config, this.constructor.DefaultType);

	      if (typeof config.reference === 'object' && !isElement(config.reference) && typeof config.reference.getBoundingClientRect !== 'function') {
	        // Popper virtual elements require a getBoundingClientRect method
	        throw new TypeError(`${NAME.toUpperCase()}: Option "reference" provided type "object" without a required "getBoundingClientRect" method.`);
	      }

	      return config;
	    }

	    _createPopper(parent) {
	      if (typeof Popper__namespace === 'undefined') {
	        throw new TypeError('Bootstrap\'s dropdowns require Popper (https://popper.js.org)');
	      }

	      let referenceElement = this._element;

	      if (this._config.reference === 'parent') {
	        referenceElement = parent;
	      } else if (isElement(this._config.reference)) {
	        referenceElement = getElement(this._config.reference);
	      } else if (typeof this._config.reference === 'object') {
	        referenceElement = this._config.reference;
	      }

	      const popperConfig = this._getPopperConfig();

	      const isDisplayStatic = popperConfig.modifiers.find(modifier => modifier.name === 'applyStyles' && modifier.enabled === false);
	      this._popper = Popper__namespace.createPopper(referenceElement, this._menu, popperConfig);

	      if (isDisplayStatic) {
	        Manipulator__default.default.setDataAttribute(this._menu, 'popper', 'static');
	      }
	    }

	    _isShown(element = this._element) {
	      return element.classList.contains(CLASS_NAME_SHOW);
	    }

	    _getMenuElement() {
	      return SelectorEngine__default.default.next(this._element, SELECTOR_MENU)[0];
	    }

	    _getPlacement() {
	      const parentDropdown = this._element.parentNode;

	      if (parentDropdown.classList.contains(CLASS_NAME_DROPEND)) {
	        return PLACEMENT_RIGHT;
	      }

	      if (parentDropdown.classList.contains(CLASS_NAME_DROPSTART)) {
	        return PLACEMENT_LEFT;
	      } // We need to trim the value because custom properties can also include spaces


	      const isEnd = getComputedStyle(this._menu).getPropertyValue('--bs-position').trim() === 'end';

	      if (parentDropdown.classList.contains(CLASS_NAME_DROPUP)) {
	        return isEnd ? PLACEMENT_TOPEND : PLACEMENT_TOP;
	      }

	      return isEnd ? PLACEMENT_BOTTOMEND : PLACEMENT_BOTTOM;
	    }

	    _detectNavbar() {
	      return this._element.closest(`.${CLASS_NAME_NAVBAR}`) !== null;
	    }

	    _getOffset() {
	      const {
	        offset
	      } = this._config;

	      if (typeof offset === 'string') {
	        return offset.split(',').map(val => Number.parseInt(val, 10));
	      }

	      if (typeof offset === 'function') {
	        return popperData => offset(popperData, this._element);
	      }

	      return offset;
	    }

	    _getPopperConfig() {
	      const defaultBsPopperConfig = {
	        placement: this._getPlacement(),
	        modifiers: [{
	          name: 'preventOverflow',
	          options: {
	            boundary: this._config.boundary
	          }
	        }, {
	          name: 'offset',
	          options: {
	            offset: this._getOffset()
	          }
	        }]
	      }; // Disable Popper if we have a static display

	      if (this._config.display === 'static') {
	        defaultBsPopperConfig.modifiers = [{
	          name: 'applyStyles',
	          enabled: false
	        }];
	      }

	      return { ...defaultBsPopperConfig,
	        ...(typeof this._config.popperConfig === 'function' ? this._config.popperConfig(defaultBsPopperConfig) : this._config.popperConfig)
	      };
	    }

	    _selectMenuItem({
	      key,
	      target
	    }) {
	      const items = SelectorEngine__default.default.find(SELECTOR_VISIBLE_ITEMS, this._menu).filter(isVisible);

	      if (!items.length) {
	        return;
	      } // if target isn't included in items (e.g. when expanding the dropdown)
	      // allow cycling to get the last item in case key equals ARROW_UP_KEY


	      getNextActiveElement(items, target, key === ARROW_DOWN_KEY, !items.includes(target)).focus();
	    } // Static


	    static jQueryInterface(config) {
	      return this.each(function () {
	        const data = Dropdown.getOrCreateInstance(this, config);

	        if (typeof config !== 'string') {
	          return;
	        }

	        if (typeof data[config] === 'undefined') {
	          throw new TypeError(`No method named "${config}"`);
	        }

	        data[config]();
	      });
	    }

	    static clearMenus(event) {
	      if (event && (event.button === RIGHT_MOUSE_BUTTON || event.type === 'keyup' && event.key !== TAB_KEY)) {
	        return;
	      }

	      const toggles = SelectorEngine__default.default.find(SELECTOR_DATA_TOGGLE);

	      for (let i = 0, len = toggles.length; i < len; i++) {
	        const context = Dropdown.getInstance(toggles[i]);

	        if (!context || context._config.autoClose === false) {
	          continue;
	        }

	        if (!context._isShown()) {
	          continue;
	        }

	        const relatedTarget = {
	          relatedTarget: context._element
	        };

	        if (event) {
	          const composedPath = event.composedPath();
	          const isMenuTarget = composedPath.includes(context._menu);

	          if (composedPath.includes(context._element) || context._config.autoClose === 'inside' && !isMenuTarget || context._config.autoClose === 'outside' && isMenuTarget) {
	            continue;
	          } // Tab navigation through the dropdown menu or events from contained inputs shouldn't close the menu


	          if (context._menu.contains(event.target) && (event.type === 'keyup' && event.key === TAB_KEY || /input|select|option|textarea|form/i.test(event.target.tagName))) {
	            continue;
	          }

	          if (event.type === 'click') {
	            relatedTarget.clickEvent = event;
	          }
	        }

	        context._completeHide(relatedTarget);
	      }
	    }

	    static getParentFromElement(element) {
	      return getElementFromSelector(element) || element.parentNode;
	    }

	    static dataApiKeydownHandler(event) {
	      // If not input/textarea:
	      //  - And not a key in REGEXP_KEYDOWN => not a dropdown command
	      // If input/textarea:
	      //  - If space key => not a dropdown command
	      //  - If key is other than escape
	      //    - If key is not up or down => not a dropdown command
	      //    - If trigger inside the menu => not a dropdown command
	      if (/input|textarea/i.test(event.target.tagName) ? event.key === SPACE_KEY || event.key !== ESCAPE_KEY && (event.key !== ARROW_DOWN_KEY && event.key !== ARROW_UP_KEY || event.target.closest(SELECTOR_MENU)) : !REGEXP_KEYDOWN.test(event.key)) {
	        return;
	      }

	      const isActive = this.classList.contains(CLASS_NAME_SHOW);

	      if (!isActive && event.key === ESCAPE_KEY) {
	        return;
	      }

	      event.preventDefault();
	      event.stopPropagation();

	      if (isDisabled(this)) {
	        return;
	      }

	      const getToggleButton = this.matches(SELECTOR_DATA_TOGGLE) ? this : SelectorEngine__default.default.prev(this, SELECTOR_DATA_TOGGLE)[0];
	      const instance = Dropdown.getOrCreateInstance(getToggleButton);

	      if (event.key === ESCAPE_KEY) {
	        instance.hide();
	        return;
	      }

	      if (event.key === ARROW_UP_KEY || event.key === ARROW_DOWN_KEY) {
	        if (!isActive) {
	          instance.show();
	        }

	        instance._selectMenuItem(event);

	        return;
	      }

	      if (!isActive || event.key === SPACE_KEY) {
	        Dropdown.clearMenus();
	      }
	    }

	  }
	  /**
	   * ------------------------------------------------------------------------
	   * Data Api implementation
	   * ------------------------------------------------------------------------
	   */


	  EventHandler__default.default.on(document, EVENT_KEYDOWN_DATA_API, SELECTOR_DATA_TOGGLE, Dropdown.dataApiKeydownHandler);
	  EventHandler__default.default.on(document, EVENT_KEYDOWN_DATA_API, SELECTOR_MENU, Dropdown.dataApiKeydownHandler);
	  EventHandler__default.default.on(document, EVENT_CLICK_DATA_API, Dropdown.clearMenus);
	  EventHandler__default.default.on(document, EVENT_KEYUP_DATA_API, Dropdown.clearMenus);
	  EventHandler__default.default.on(document, EVENT_CLICK_DATA_API, SELECTOR_DATA_TOGGLE, function (event) {
	    event.preventDefault();
	    Dropdown.getOrCreateInstance(this).toggle();
	  });
	  /**
	   * ------------------------------------------------------------------------
	   * jQuery
	   * ------------------------------------------------------------------------
	   * add .Dropdown to jQuery only if jQuery is present
	   */

	  defineJQueryPlugin(Dropdown);

	  return Dropdown;

	}));

	}(dropdown$1));

	var dropdown = /*@__PURE__*/getDefaultExportFromCjs(dropdown$1.exports);

	var modal$1 = {exports: {}};

	/*!
	  * Bootstrap modal.js v5.1.3 (https://getbootstrap.com/)
	  * Copyright 2011-2021 The Bootstrap Authors (https://github.com/twbs/bootstrap/graphs/contributors)
	  * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
	  */

	(function (module, exports) {
	(function (global, factory) {
	  module.exports = factory(eventHandler.exports, manipulator.exports, selectorEngine.exports, baseComponent.exports) ;
	})(commonjsGlobal, (function (EventHandler, Manipulator, SelectorEngine, BaseComponent) {
	  const _interopDefaultLegacy = e => e && typeof e === 'object' && 'default' in e ? e : { default: e };

	  const EventHandler__default = /*#__PURE__*/_interopDefaultLegacy(EventHandler);
	  const Manipulator__default = /*#__PURE__*/_interopDefaultLegacy(Manipulator);
	  const SelectorEngine__default = /*#__PURE__*/_interopDefaultLegacy(SelectorEngine);
	  const BaseComponent__default = /*#__PURE__*/_interopDefaultLegacy(BaseComponent);

	  /**
	   * --------------------------------------------------------------------------
	   * Bootstrap (v5.1.3): util/index.js
	   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
	   * --------------------------------------------------------------------------
	   */
	  const MILLISECONDS_MULTIPLIER = 1000;
	  const TRANSITION_END = 'transitionend'; // Shoutout AngusCroll (https://goo.gl/pxwQGp)

	  const toType = obj => {
	    if (obj === null || obj === undefined) {
	      return `${obj}`;
	    }

	    return {}.toString.call(obj).match(/\s([a-z]+)/i)[1].toLowerCase();
	  };

	  const getSelector = element => {
	    let selector = element.getAttribute('data-bs-target');

	    if (!selector || selector === '#') {
	      let hrefAttr = element.getAttribute('href'); // The only valid content that could double as a selector are IDs or classes,
	      // so everything starting with `#` or `.`. If a "real" URL is used as the selector,
	      // `document.querySelector` will rightfully complain it is invalid.
	      // See https://github.com/twbs/bootstrap/issues/32273

	      if (!hrefAttr || !hrefAttr.includes('#') && !hrefAttr.startsWith('.')) {
	        return null;
	      } // Just in case some CMS puts out a full URL with the anchor appended


	      if (hrefAttr.includes('#') && !hrefAttr.startsWith('#')) {
	        hrefAttr = `#${hrefAttr.split('#')[1]}`;
	      }

	      selector = hrefAttr && hrefAttr !== '#' ? hrefAttr.trim() : null;
	    }

	    return selector;
	  };

	  const getElementFromSelector = element => {
	    const selector = getSelector(element);
	    return selector ? document.querySelector(selector) : null;
	  };

	  const getTransitionDurationFromElement = element => {
	    if (!element) {
	      return 0;
	    } // Get transition-duration of the element


	    let {
	      transitionDuration,
	      transitionDelay
	    } = window.getComputedStyle(element);
	    const floatTransitionDuration = Number.parseFloat(transitionDuration);
	    const floatTransitionDelay = Number.parseFloat(transitionDelay); // Return 0 if element or transition duration is not found

	    if (!floatTransitionDuration && !floatTransitionDelay) {
	      return 0;
	    } // If multiple durations are defined, take the first


	    transitionDuration = transitionDuration.split(',')[0];
	    transitionDelay = transitionDelay.split(',')[0];
	    return (Number.parseFloat(transitionDuration) + Number.parseFloat(transitionDelay)) * MILLISECONDS_MULTIPLIER;
	  };

	  const triggerTransitionEnd = element => {
	    element.dispatchEvent(new Event(TRANSITION_END));
	  };

	  const isElement = obj => {
	    if (!obj || typeof obj !== 'object') {
	      return false;
	    }

	    if (typeof obj.jquery !== 'undefined') {
	      obj = obj[0];
	    }

	    return typeof obj.nodeType !== 'undefined';
	  };

	  const getElement = obj => {
	    if (isElement(obj)) {
	      // it's a jQuery object or a node element
	      return obj.jquery ? obj[0] : obj;
	    }

	    if (typeof obj === 'string' && obj.length > 0) {
	      return document.querySelector(obj);
	    }

	    return null;
	  };

	  const typeCheckConfig = (componentName, config, configTypes) => {
	    Object.keys(configTypes).forEach(property => {
	      const expectedTypes = configTypes[property];
	      const value = config[property];
	      const valueType = value && isElement(value) ? 'element' : toType(value);

	      if (!new RegExp(expectedTypes).test(valueType)) {
	        throw new TypeError(`${componentName.toUpperCase()}: Option "${property}" provided type "${valueType}" but expected type "${expectedTypes}".`);
	      }
	    });
	  };

	  const isVisible = element => {
	    if (!isElement(element) || element.getClientRects().length === 0) {
	      return false;
	    }

	    return getComputedStyle(element).getPropertyValue('visibility') === 'visible';
	  };

	  const isDisabled = element => {
	    if (!element || element.nodeType !== Node.ELEMENT_NODE) {
	      return true;
	    }

	    if (element.classList.contains('disabled')) {
	      return true;
	    }

	    if (typeof element.disabled !== 'undefined') {
	      return element.disabled;
	    }

	    return element.hasAttribute('disabled') && element.getAttribute('disabled') !== 'false';
	  };
	  /**
	   * Trick to restart an element's animation
	   *
	   * @param {HTMLElement} element
	   * @return void
	   *
	   * @see https://www.charistheo.io/blog/2021/02/restart-a-css-animation-with-javascript/#restarting-a-css-animation
	   */


	  const reflow = element => {
	    // eslint-disable-next-line no-unused-expressions
	    element.offsetHeight;
	  };

	  const getjQuery = () => {
	    const {
	      jQuery
	    } = window;

	    if (jQuery && !document.body.hasAttribute('data-bs-no-jquery')) {
	      return jQuery;
	    }

	    return null;
	  };

	  const DOMContentLoadedCallbacks = [];

	  const onDOMContentLoaded = callback => {
	    if (document.readyState === 'loading') {
	      // add listener on the first call when the document is in loading state
	      if (!DOMContentLoadedCallbacks.length) {
	        document.addEventListener('DOMContentLoaded', () => {
	          DOMContentLoadedCallbacks.forEach(callback => callback());
	        });
	      }

	      DOMContentLoadedCallbacks.push(callback);
	    } else {
	      callback();
	    }
	  };

	  const isRTL = () => document.documentElement.dir === 'rtl';

	  const defineJQueryPlugin = plugin => {
	    onDOMContentLoaded(() => {
	      const $ = getjQuery();
	      /* istanbul ignore if */

	      if ($) {
	        const name = plugin.NAME;
	        const JQUERY_NO_CONFLICT = $.fn[name];
	        $.fn[name] = plugin.jQueryInterface;
	        $.fn[name].Constructor = plugin;

	        $.fn[name].noConflict = () => {
	          $.fn[name] = JQUERY_NO_CONFLICT;
	          return plugin.jQueryInterface;
	        };
	      }
	    });
	  };

	  const execute = callback => {
	    if (typeof callback === 'function') {
	      callback();
	    }
	  };

	  const executeAfterTransition = (callback, transitionElement, waitForTransition = true) => {
	    if (!waitForTransition) {
	      execute(callback);
	      return;
	    }

	    const durationPadding = 5;
	    const emulatedDuration = getTransitionDurationFromElement(transitionElement) + durationPadding;
	    let called = false;

	    const handler = ({
	      target
	    }) => {
	      if (target !== transitionElement) {
	        return;
	      }

	      called = true;
	      transitionElement.removeEventListener(TRANSITION_END, handler);
	      execute(callback);
	    };

	    transitionElement.addEventListener(TRANSITION_END, handler);
	    setTimeout(() => {
	      if (!called) {
	        triggerTransitionEnd(transitionElement);
	      }
	    }, emulatedDuration);
	  };

	  /**
	   * --------------------------------------------------------------------------
	   * Bootstrap (v5.1.3): util/scrollBar.js
	   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
	   * --------------------------------------------------------------------------
	   */
	  const SELECTOR_FIXED_CONTENT = '.fixed-top, .fixed-bottom, .is-fixed, .sticky-top';
	  const SELECTOR_STICKY_CONTENT = '.sticky-top';

	  class ScrollBarHelper {
	    constructor() {
	      this._element = document.body;
	    }

	    getWidth() {
	      // https://developer.mozilla.org/en-US/docs/Web/API/Window/innerWidth#usage_notes
	      const documentWidth = document.documentElement.clientWidth;
	      return Math.abs(window.innerWidth - documentWidth);
	    }

	    hide() {
	      const width = this.getWidth();

	      this._disableOverFlow(); // give padding to element to balance the hidden scrollbar width


	      this._setElementAttributes(this._element, 'paddingRight', calculatedValue => calculatedValue + width); // trick: We adjust positive paddingRight and negative marginRight to sticky-top elements to keep showing fullwidth


	      this._setElementAttributes(SELECTOR_FIXED_CONTENT, 'paddingRight', calculatedValue => calculatedValue + width);

	      this._setElementAttributes(SELECTOR_STICKY_CONTENT, 'marginRight', calculatedValue => calculatedValue - width);
	    }

	    _disableOverFlow() {
	      this._saveInitialAttribute(this._element, 'overflow');

	      this._element.style.overflow = 'hidden';
	    }

	    _setElementAttributes(selector, styleProp, callback) {
	      const scrollbarWidth = this.getWidth();

	      const manipulationCallBack = element => {
	        if (element !== this._element && window.innerWidth > element.clientWidth + scrollbarWidth) {
	          return;
	        }

	        this._saveInitialAttribute(element, styleProp);

	        const calculatedValue = window.getComputedStyle(element)[styleProp];
	        element.style[styleProp] = `${callback(Number.parseFloat(calculatedValue))}px`;
	      };

	      this._applyManipulationCallback(selector, manipulationCallBack);
	    }

	    reset() {
	      this._resetElementAttributes(this._element, 'overflow');

	      this._resetElementAttributes(this._element, 'paddingRight');

	      this._resetElementAttributes(SELECTOR_FIXED_CONTENT, 'paddingRight');

	      this._resetElementAttributes(SELECTOR_STICKY_CONTENT, 'marginRight');
	    }

	    _saveInitialAttribute(element, styleProp) {
	      const actualValue = element.style[styleProp];

	      if (actualValue) {
	        Manipulator__default.default.setDataAttribute(element, styleProp, actualValue);
	      }
	    }

	    _resetElementAttributes(selector, styleProp) {
	      const manipulationCallBack = element => {
	        const value = Manipulator__default.default.getDataAttribute(element, styleProp);

	        if (typeof value === 'undefined') {
	          element.style.removeProperty(styleProp);
	        } else {
	          Manipulator__default.default.removeDataAttribute(element, styleProp);
	          element.style[styleProp] = value;
	        }
	      };

	      this._applyManipulationCallback(selector, manipulationCallBack);
	    }

	    _applyManipulationCallback(selector, callBack) {
	      if (isElement(selector)) {
	        callBack(selector);
	      } else {
	        SelectorEngine__default.default.find(selector, this._element).forEach(callBack);
	      }
	    }

	    isOverflowing() {
	      return this.getWidth() > 0;
	    }

	  }

	  /**
	   * --------------------------------------------------------------------------
	   * Bootstrap (v5.1.3): util/backdrop.js
	   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
	   * --------------------------------------------------------------------------
	   */
	  const Default$2 = {
	    className: 'modal-backdrop',
	    isVisible: true,
	    // if false, we use the backdrop helper without adding any element to the dom
	    isAnimated: false,
	    rootElement: 'body',
	    // give the choice to place backdrop under different elements
	    clickCallback: null
	  };
	  const DefaultType$2 = {
	    className: 'string',
	    isVisible: 'boolean',
	    isAnimated: 'boolean',
	    rootElement: '(element|string)',
	    clickCallback: '(function|null)'
	  };
	  const NAME$2 = 'backdrop';
	  const CLASS_NAME_FADE$1 = 'fade';
	  const CLASS_NAME_SHOW$1 = 'show';
	  const EVENT_MOUSEDOWN = `mousedown.bs.${NAME$2}`;

	  class Backdrop {
	    constructor(config) {
	      this._config = this._getConfig(config);
	      this._isAppended = false;
	      this._element = null;
	    }

	    show(callback) {
	      if (!this._config.isVisible) {
	        execute(callback);
	        return;
	      }

	      this._append();

	      if (this._config.isAnimated) {
	        reflow(this._getElement());
	      }

	      this._getElement().classList.add(CLASS_NAME_SHOW$1);

	      this._emulateAnimation(() => {
	        execute(callback);
	      });
	    }

	    hide(callback) {
	      if (!this._config.isVisible) {
	        execute(callback);
	        return;
	      }

	      this._getElement().classList.remove(CLASS_NAME_SHOW$1);

	      this._emulateAnimation(() => {
	        this.dispose();
	        execute(callback);
	      });
	    } // Private


	    _getElement() {
	      if (!this._element) {
	        const backdrop = document.createElement('div');
	        backdrop.className = this._config.className;

	        if (this._config.isAnimated) {
	          backdrop.classList.add(CLASS_NAME_FADE$1);
	        }

	        this._element = backdrop;
	      }

	      return this._element;
	    }

	    _getConfig(config) {
	      config = { ...Default$2,
	        ...(typeof config === 'object' ? config : {})
	      }; // use getElement() with the default "body" to get a fresh Element on each instantiation

	      config.rootElement = getElement(config.rootElement);
	      typeCheckConfig(NAME$2, config, DefaultType$2);
	      return config;
	    }

	    _append() {
	      if (this._isAppended) {
	        return;
	      }

	      this._config.rootElement.append(this._getElement());

	      EventHandler__default.default.on(this._getElement(), EVENT_MOUSEDOWN, () => {
	        execute(this._config.clickCallback);
	      });
	      this._isAppended = true;
	    }

	    dispose() {
	      if (!this._isAppended) {
	        return;
	      }

	      EventHandler__default.default.off(this._element, EVENT_MOUSEDOWN);

	      this._element.remove();

	      this._isAppended = false;
	    }

	    _emulateAnimation(callback) {
	      executeAfterTransition(callback, this._getElement(), this._config.isAnimated);
	    }

	  }

	  /**
	   * --------------------------------------------------------------------------
	   * Bootstrap (v5.1.3): util/focustrap.js
	   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
	   * --------------------------------------------------------------------------
	   */
	  const Default$1 = {
	    trapElement: null,
	    // The element to trap focus inside of
	    autofocus: true
	  };
	  const DefaultType$1 = {
	    trapElement: 'element',
	    autofocus: 'boolean'
	  };
	  const NAME$1 = 'focustrap';
	  const DATA_KEY$1 = 'bs.focustrap';
	  const EVENT_KEY$1 = `.${DATA_KEY$1}`;
	  const EVENT_FOCUSIN = `focusin${EVENT_KEY$1}`;
	  const EVENT_KEYDOWN_TAB = `keydown.tab${EVENT_KEY$1}`;
	  const TAB_KEY = 'Tab';
	  const TAB_NAV_FORWARD = 'forward';
	  const TAB_NAV_BACKWARD = 'backward';

	  class FocusTrap {
	    constructor(config) {
	      this._config = this._getConfig(config);
	      this._isActive = false;
	      this._lastTabNavDirection = null;
	    }

	    activate() {
	      const {
	        trapElement,
	        autofocus
	      } = this._config;

	      if (this._isActive) {
	        return;
	      }

	      if (autofocus) {
	        trapElement.focus();
	      }

	      EventHandler__default.default.off(document, EVENT_KEY$1); // guard against infinite focus loop

	      EventHandler__default.default.on(document, EVENT_FOCUSIN, event => this._handleFocusin(event));
	      EventHandler__default.default.on(document, EVENT_KEYDOWN_TAB, event => this._handleKeydown(event));
	      this._isActive = true;
	    }

	    deactivate() {
	      if (!this._isActive) {
	        return;
	      }

	      this._isActive = false;
	      EventHandler__default.default.off(document, EVENT_KEY$1);
	    } // Private


	    _handleFocusin(event) {
	      const {
	        target
	      } = event;
	      const {
	        trapElement
	      } = this._config;

	      if (target === document || target === trapElement || trapElement.contains(target)) {
	        return;
	      }

	      const elements = SelectorEngine__default.default.focusableChildren(trapElement);

	      if (elements.length === 0) {
	        trapElement.focus();
	      } else if (this._lastTabNavDirection === TAB_NAV_BACKWARD) {
	        elements[elements.length - 1].focus();
	      } else {
	        elements[0].focus();
	      }
	    }

	    _handleKeydown(event) {
	      if (event.key !== TAB_KEY) {
	        return;
	      }

	      this._lastTabNavDirection = event.shiftKey ? TAB_NAV_BACKWARD : TAB_NAV_FORWARD;
	    }

	    _getConfig(config) {
	      config = { ...Default$1,
	        ...(typeof config === 'object' ? config : {})
	      };
	      typeCheckConfig(NAME$1, config, DefaultType$1);
	      return config;
	    }

	  }

	  /**
	   * --------------------------------------------------------------------------
	   * Bootstrap (v5.1.3): util/component-functions.js
	   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
	   * --------------------------------------------------------------------------
	   */

	  const enableDismissTrigger = (component, method = 'hide') => {
	    const clickEvent = `click.dismiss${component.EVENT_KEY}`;
	    const name = component.NAME;
	    EventHandler__default.default.on(document, clickEvent, `[data-bs-dismiss="${name}"]`, function (event) {
	      if (['A', 'AREA'].includes(this.tagName)) {
	        event.preventDefault();
	      }

	      if (isDisabled(this)) {
	        return;
	      }

	      const target = getElementFromSelector(this) || this.closest(`.${name}`);
	      const instance = component.getOrCreateInstance(target); // Method argument is left, for Alert and only, as it doesn't implement the 'hide' method

	      instance[method]();
	    });
	  };

	  /**
	   * --------------------------------------------------------------------------
	   * Bootstrap (v5.1.3): modal.js
	   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
	   * --------------------------------------------------------------------------
	   */
	  /**
	   * ------------------------------------------------------------------------
	   * Constants
	   * ------------------------------------------------------------------------
	   */

	  const NAME = 'modal';
	  const DATA_KEY = 'bs.modal';
	  const EVENT_KEY = `.${DATA_KEY}`;
	  const DATA_API_KEY = '.data-api';
	  const ESCAPE_KEY = 'Escape';
	  const Default = {
	    backdrop: true,
	    keyboard: true,
	    focus: true
	  };
	  const DefaultType = {
	    backdrop: '(boolean|string)',
	    keyboard: 'boolean',
	    focus: 'boolean'
	  };
	  const EVENT_HIDE = `hide${EVENT_KEY}`;
	  const EVENT_HIDE_PREVENTED = `hidePrevented${EVENT_KEY}`;
	  const EVENT_HIDDEN = `hidden${EVENT_KEY}`;
	  const EVENT_SHOW = `show${EVENT_KEY}`;
	  const EVENT_SHOWN = `shown${EVENT_KEY}`;
	  const EVENT_RESIZE = `resize${EVENT_KEY}`;
	  const EVENT_CLICK_DISMISS = `click.dismiss${EVENT_KEY}`;
	  const EVENT_KEYDOWN_DISMISS = `keydown.dismiss${EVENT_KEY}`;
	  const EVENT_MOUSEUP_DISMISS = `mouseup.dismiss${EVENT_KEY}`;
	  const EVENT_MOUSEDOWN_DISMISS = `mousedown.dismiss${EVENT_KEY}`;
	  const EVENT_CLICK_DATA_API = `click${EVENT_KEY}${DATA_API_KEY}`;
	  const CLASS_NAME_OPEN = 'modal-open';
	  const CLASS_NAME_FADE = 'fade';
	  const CLASS_NAME_SHOW = 'show';
	  const CLASS_NAME_STATIC = 'modal-static';
	  const OPEN_SELECTOR = '.modal.show';
	  const SELECTOR_DIALOG = '.modal-dialog';
	  const SELECTOR_MODAL_BODY = '.modal-body';
	  const SELECTOR_DATA_TOGGLE = '[data-bs-toggle="modal"]';
	  /**
	   * ------------------------------------------------------------------------
	   * Class Definition
	   * ------------------------------------------------------------------------
	   */

	  class Modal extends BaseComponent__default.default {
	    constructor(element, config) {
	      super(element);
	      this._config = this._getConfig(config);
	      this._dialog = SelectorEngine__default.default.findOne(SELECTOR_DIALOG, this._element);
	      this._backdrop = this._initializeBackDrop();
	      this._focustrap = this._initializeFocusTrap();
	      this._isShown = false;
	      this._ignoreBackdropClick = false;
	      this._isTransitioning = false;
	      this._scrollBar = new ScrollBarHelper();
	    } // Getters


	    static get Default() {
	      return Default;
	    }

	    static get NAME() {
	      return NAME;
	    } // Public


	    toggle(relatedTarget) {
	      return this._isShown ? this.hide() : this.show(relatedTarget);
	    }

	    show(relatedTarget) {
	      if (this._isShown || this._isTransitioning) {
	        return;
	      }

	      const showEvent = EventHandler__default.default.trigger(this._element, EVENT_SHOW, {
	        relatedTarget
	      });

	      if (showEvent.defaultPrevented) {
	        return;
	      }

	      this._isShown = true;

	      if (this._isAnimated()) {
	        this._isTransitioning = true;
	      }

	      this._scrollBar.hide();

	      document.body.classList.add(CLASS_NAME_OPEN);

	      this._adjustDialog();

	      this._setEscapeEvent();

	      this._setResizeEvent();

	      EventHandler__default.default.on(this._dialog, EVENT_MOUSEDOWN_DISMISS, () => {
	        EventHandler__default.default.one(this._element, EVENT_MOUSEUP_DISMISS, event => {
	          if (event.target === this._element) {
	            this._ignoreBackdropClick = true;
	          }
	        });
	      });

	      this._showBackdrop(() => this._showElement(relatedTarget));
	    }

	    hide() {
	      if (!this._isShown || this._isTransitioning) {
	        return;
	      }

	      const hideEvent = EventHandler__default.default.trigger(this._element, EVENT_HIDE);

	      if (hideEvent.defaultPrevented) {
	        return;
	      }

	      this._isShown = false;

	      const isAnimated = this._isAnimated();

	      if (isAnimated) {
	        this._isTransitioning = true;
	      }

	      this._setEscapeEvent();

	      this._setResizeEvent();

	      this._focustrap.deactivate();

	      this._element.classList.remove(CLASS_NAME_SHOW);

	      EventHandler__default.default.off(this._element, EVENT_CLICK_DISMISS);
	      EventHandler__default.default.off(this._dialog, EVENT_MOUSEDOWN_DISMISS);

	      this._queueCallback(() => this._hideModal(), this._element, isAnimated);
	    }

	    dispose() {
	      [window, this._dialog].forEach(htmlElement => EventHandler__default.default.off(htmlElement, EVENT_KEY));

	      this._backdrop.dispose();

	      this._focustrap.deactivate();

	      super.dispose();
	    }

	    handleUpdate() {
	      this._adjustDialog();
	    } // Private


	    _initializeBackDrop() {
	      return new Backdrop({
	        isVisible: Boolean(this._config.backdrop),
	        // 'static' option will be translated to true, and booleans will keep their value
	        isAnimated: this._isAnimated()
	      });
	    }

	    _initializeFocusTrap() {
	      return new FocusTrap({
	        trapElement: this._element
	      });
	    }

	    _getConfig(config) {
	      config = { ...Default,
	        ...Manipulator__default.default.getDataAttributes(this._element),
	        ...(typeof config === 'object' ? config : {})
	      };
	      typeCheckConfig(NAME, config, DefaultType);
	      return config;
	    }

	    _showElement(relatedTarget) {
	      const isAnimated = this._isAnimated();

	      const modalBody = SelectorEngine__default.default.findOne(SELECTOR_MODAL_BODY, this._dialog);

	      if (!this._element.parentNode || this._element.parentNode.nodeType !== Node.ELEMENT_NODE) {
	        // Don't move modal's DOM position
	        document.body.append(this._element);
	      }

	      this._element.style.display = 'block';

	      this._element.removeAttribute('aria-hidden');

	      this._element.setAttribute('aria-modal', true);

	      this._element.setAttribute('role', 'dialog');

	      this._element.scrollTop = 0;

	      if (modalBody) {
	        modalBody.scrollTop = 0;
	      }

	      if (isAnimated) {
	        reflow(this._element);
	      }

	      this._element.classList.add(CLASS_NAME_SHOW);

	      const transitionComplete = () => {
	        if (this._config.focus) {
	          this._focustrap.activate();
	        }

	        this._isTransitioning = false;
	        EventHandler__default.default.trigger(this._element, EVENT_SHOWN, {
	          relatedTarget
	        });
	      };

	      this._queueCallback(transitionComplete, this._dialog, isAnimated);
	    }

	    _setEscapeEvent() {
	      if (this._isShown) {
	        EventHandler__default.default.on(this._element, EVENT_KEYDOWN_DISMISS, event => {
	          if (this._config.keyboard && event.key === ESCAPE_KEY) {
	            event.preventDefault();
	            this.hide();
	          } else if (!this._config.keyboard && event.key === ESCAPE_KEY) {
	            this._triggerBackdropTransition();
	          }
	        });
	      } else {
	        EventHandler__default.default.off(this._element, EVENT_KEYDOWN_DISMISS);
	      }
	    }

	    _setResizeEvent() {
	      if (this._isShown) {
	        EventHandler__default.default.on(window, EVENT_RESIZE, () => this._adjustDialog());
	      } else {
	        EventHandler__default.default.off(window, EVENT_RESIZE);
	      }
	    }

	    _hideModal() {
	      this._element.style.display = 'none';

	      this._element.setAttribute('aria-hidden', true);

	      this._element.removeAttribute('aria-modal');

	      this._element.removeAttribute('role');

	      this._isTransitioning = false;

	      this._backdrop.hide(() => {
	        document.body.classList.remove(CLASS_NAME_OPEN);

	        this._resetAdjustments();

	        this._scrollBar.reset();

	        EventHandler__default.default.trigger(this._element, EVENT_HIDDEN);
	      });
	    }

	    _showBackdrop(callback) {
	      EventHandler__default.default.on(this._element, EVENT_CLICK_DISMISS, event => {
	        if (this._ignoreBackdropClick) {
	          this._ignoreBackdropClick = false;
	          return;
	        }

	        if (event.target !== event.currentTarget) {
	          return;
	        }

	        if (this._config.backdrop === true) {
	          this.hide();
	        } else if (this._config.backdrop === 'static') {
	          this._triggerBackdropTransition();
	        }
	      });

	      this._backdrop.show(callback);
	    }

	    _isAnimated() {
	      return this._element.classList.contains(CLASS_NAME_FADE);
	    }

	    _triggerBackdropTransition() {
	      const hideEvent = EventHandler__default.default.trigger(this._element, EVENT_HIDE_PREVENTED);

	      if (hideEvent.defaultPrevented) {
	        return;
	      }

	      const {
	        classList,
	        scrollHeight,
	        style
	      } = this._element;
	      const isModalOverflowing = scrollHeight > document.documentElement.clientHeight; // return if the following background transition hasn't yet completed

	      if (!isModalOverflowing && style.overflowY === 'hidden' || classList.contains(CLASS_NAME_STATIC)) {
	        return;
	      }

	      if (!isModalOverflowing) {
	        style.overflowY = 'hidden';
	      }

	      classList.add(CLASS_NAME_STATIC);

	      this._queueCallback(() => {
	        classList.remove(CLASS_NAME_STATIC);

	        if (!isModalOverflowing) {
	          this._queueCallback(() => {
	            style.overflowY = '';
	          }, this._dialog);
	        }
	      }, this._dialog);

	      this._element.focus();
	    } // ----------------------------------------------------------------------
	    // the following methods are used to handle overflowing modals
	    // ----------------------------------------------------------------------


	    _adjustDialog() {
	      const isModalOverflowing = this._element.scrollHeight > document.documentElement.clientHeight;

	      const scrollbarWidth = this._scrollBar.getWidth();

	      const isBodyOverflowing = scrollbarWidth > 0;

	      if (!isBodyOverflowing && isModalOverflowing && !isRTL() || isBodyOverflowing && !isModalOverflowing && isRTL()) {
	        this._element.style.paddingLeft = `${scrollbarWidth}px`;
	      }

	      if (isBodyOverflowing && !isModalOverflowing && !isRTL() || !isBodyOverflowing && isModalOverflowing && isRTL()) {
	        this._element.style.paddingRight = `${scrollbarWidth}px`;
	      }
	    }

	    _resetAdjustments() {
	      this._element.style.paddingLeft = '';
	      this._element.style.paddingRight = '';
	    } // Static


	    static jQueryInterface(config, relatedTarget) {
	      return this.each(function () {
	        const data = Modal.getOrCreateInstance(this, config);

	        if (typeof config !== 'string') {
	          return;
	        }

	        if (typeof data[config] === 'undefined') {
	          throw new TypeError(`No method named "${config}"`);
	        }

	        data[config](relatedTarget);
	      });
	    }

	  }
	  /**
	   * ------------------------------------------------------------------------
	   * Data Api implementation
	   * ------------------------------------------------------------------------
	   */


	  EventHandler__default.default.on(document, EVENT_CLICK_DATA_API, SELECTOR_DATA_TOGGLE, function (event) {
	    const target = getElementFromSelector(this);

	    if (['A', 'AREA'].includes(this.tagName)) {
	      event.preventDefault();
	    }

	    EventHandler__default.default.one(target, EVENT_SHOW, showEvent => {
	      if (showEvent.defaultPrevented) {
	        // only register focus restorer if modal will actually get shown
	        return;
	      }

	      EventHandler__default.default.one(target, EVENT_HIDDEN, () => {
	        if (isVisible(this)) {
	          this.focus();
	        }
	      });
	    }); // avoid conflict when clicking moddal toggler while another one is open

	    const allReadyOpen = SelectorEngine__default.default.findOne(OPEN_SELECTOR);

	    if (allReadyOpen) {
	      Modal.getInstance(allReadyOpen).hide();
	    }

	    const data = Modal.getOrCreateInstance(target);
	    data.toggle(this);
	  });
	  enableDismissTrigger(Modal);
	  /**
	   * ------------------------------------------------------------------------
	   * jQuery
	   * ------------------------------------------------------------------------
	   * add .Modal to jQuery only if jQuery is present
	   */

	  defineJQueryPlugin(Modal);

	  return Modal;

	}));

	}(modal$1));

	var modal = modal$1.exports;

	var offcanvas$1 = {exports: {}};

	/*!
	  * Bootstrap offcanvas.js v5.1.3 (https://getbootstrap.com/)
	  * Copyright 2011-2021 The Bootstrap Authors (https://github.com/twbs/bootstrap/graphs/contributors)
	  * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
	  */

	(function (module, exports) {
	(function (global, factory) {
	  module.exports = factory(selectorEngine.exports, manipulator.exports, eventHandler.exports, baseComponent.exports) ;
	})(commonjsGlobal, (function (SelectorEngine, Manipulator, EventHandler, BaseComponent) {
	  const _interopDefaultLegacy = e => e && typeof e === 'object' && 'default' in e ? e : { default: e };

	  const SelectorEngine__default = /*#__PURE__*/_interopDefaultLegacy(SelectorEngine);
	  const Manipulator__default = /*#__PURE__*/_interopDefaultLegacy(Manipulator);
	  const EventHandler__default = /*#__PURE__*/_interopDefaultLegacy(EventHandler);
	  const BaseComponent__default = /*#__PURE__*/_interopDefaultLegacy(BaseComponent);

	  /**
	   * --------------------------------------------------------------------------
	   * Bootstrap (v5.1.3): util/index.js
	   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
	   * --------------------------------------------------------------------------
	   */
	  const MILLISECONDS_MULTIPLIER = 1000;
	  const TRANSITION_END = 'transitionend'; // Shoutout AngusCroll (https://goo.gl/pxwQGp)

	  const toType = obj => {
	    if (obj === null || obj === undefined) {
	      return `${obj}`;
	    }

	    return {}.toString.call(obj).match(/\s([a-z]+)/i)[1].toLowerCase();
	  };

	  const getSelector = element => {
	    let selector = element.getAttribute('data-bs-target');

	    if (!selector || selector === '#') {
	      let hrefAttr = element.getAttribute('href'); // The only valid content that could double as a selector are IDs or classes,
	      // so everything starting with `#` or `.`. If a "real" URL is used as the selector,
	      // `document.querySelector` will rightfully complain it is invalid.
	      // See https://github.com/twbs/bootstrap/issues/32273

	      if (!hrefAttr || !hrefAttr.includes('#') && !hrefAttr.startsWith('.')) {
	        return null;
	      } // Just in case some CMS puts out a full URL with the anchor appended


	      if (hrefAttr.includes('#') && !hrefAttr.startsWith('#')) {
	        hrefAttr = `#${hrefAttr.split('#')[1]}`;
	      }

	      selector = hrefAttr && hrefAttr !== '#' ? hrefAttr.trim() : null;
	    }

	    return selector;
	  };

	  const getElementFromSelector = element => {
	    const selector = getSelector(element);
	    return selector ? document.querySelector(selector) : null;
	  };

	  const getTransitionDurationFromElement = element => {
	    if (!element) {
	      return 0;
	    } // Get transition-duration of the element


	    let {
	      transitionDuration,
	      transitionDelay
	    } = window.getComputedStyle(element);
	    const floatTransitionDuration = Number.parseFloat(transitionDuration);
	    const floatTransitionDelay = Number.parseFloat(transitionDelay); // Return 0 if element or transition duration is not found

	    if (!floatTransitionDuration && !floatTransitionDelay) {
	      return 0;
	    } // If multiple durations are defined, take the first


	    transitionDuration = transitionDuration.split(',')[0];
	    transitionDelay = transitionDelay.split(',')[0];
	    return (Number.parseFloat(transitionDuration) + Number.parseFloat(transitionDelay)) * MILLISECONDS_MULTIPLIER;
	  };

	  const triggerTransitionEnd = element => {
	    element.dispatchEvent(new Event(TRANSITION_END));
	  };

	  const isElement = obj => {
	    if (!obj || typeof obj !== 'object') {
	      return false;
	    }

	    if (typeof obj.jquery !== 'undefined') {
	      obj = obj[0];
	    }

	    return typeof obj.nodeType !== 'undefined';
	  };

	  const getElement = obj => {
	    if (isElement(obj)) {
	      // it's a jQuery object or a node element
	      return obj.jquery ? obj[0] : obj;
	    }

	    if (typeof obj === 'string' && obj.length > 0) {
	      return document.querySelector(obj);
	    }

	    return null;
	  };

	  const typeCheckConfig = (componentName, config, configTypes) => {
	    Object.keys(configTypes).forEach(property => {
	      const expectedTypes = configTypes[property];
	      const value = config[property];
	      const valueType = value && isElement(value) ? 'element' : toType(value);

	      if (!new RegExp(expectedTypes).test(valueType)) {
	        throw new TypeError(`${componentName.toUpperCase()}: Option "${property}" provided type "${valueType}" but expected type "${expectedTypes}".`);
	      }
	    });
	  };

	  const isVisible = element => {
	    if (!isElement(element) || element.getClientRects().length === 0) {
	      return false;
	    }

	    return getComputedStyle(element).getPropertyValue('visibility') === 'visible';
	  };

	  const isDisabled = element => {
	    if (!element || element.nodeType !== Node.ELEMENT_NODE) {
	      return true;
	    }

	    if (element.classList.contains('disabled')) {
	      return true;
	    }

	    if (typeof element.disabled !== 'undefined') {
	      return element.disabled;
	    }

	    return element.hasAttribute('disabled') && element.getAttribute('disabled') !== 'false';
	  };
	  /**
	   * Trick to restart an element's animation
	   *
	   * @param {HTMLElement} element
	   * @return void
	   *
	   * @see https://www.charistheo.io/blog/2021/02/restart-a-css-animation-with-javascript/#restarting-a-css-animation
	   */


	  const reflow = element => {
	    // eslint-disable-next-line no-unused-expressions
	    element.offsetHeight;
	  };

	  const getjQuery = () => {
	    const {
	      jQuery
	    } = window;

	    if (jQuery && !document.body.hasAttribute('data-bs-no-jquery')) {
	      return jQuery;
	    }

	    return null;
	  };

	  const DOMContentLoadedCallbacks = [];

	  const onDOMContentLoaded = callback => {
	    if (document.readyState === 'loading') {
	      // add listener on the first call when the document is in loading state
	      if (!DOMContentLoadedCallbacks.length) {
	        document.addEventListener('DOMContentLoaded', () => {
	          DOMContentLoadedCallbacks.forEach(callback => callback());
	        });
	      }

	      DOMContentLoadedCallbacks.push(callback);
	    } else {
	      callback();
	    }
	  };

	  const defineJQueryPlugin = plugin => {
	    onDOMContentLoaded(() => {
	      const $ = getjQuery();
	      /* istanbul ignore if */

	      if ($) {
	        const name = plugin.NAME;
	        const JQUERY_NO_CONFLICT = $.fn[name];
	        $.fn[name] = plugin.jQueryInterface;
	        $.fn[name].Constructor = plugin;

	        $.fn[name].noConflict = () => {
	          $.fn[name] = JQUERY_NO_CONFLICT;
	          return plugin.jQueryInterface;
	        };
	      }
	    });
	  };

	  const execute = callback => {
	    if (typeof callback === 'function') {
	      callback();
	    }
	  };

	  const executeAfterTransition = (callback, transitionElement, waitForTransition = true) => {
	    if (!waitForTransition) {
	      execute(callback);
	      return;
	    }

	    const durationPadding = 5;
	    const emulatedDuration = getTransitionDurationFromElement(transitionElement) + durationPadding;
	    let called = false;

	    const handler = ({
	      target
	    }) => {
	      if (target !== transitionElement) {
	        return;
	      }

	      called = true;
	      transitionElement.removeEventListener(TRANSITION_END, handler);
	      execute(callback);
	    };

	    transitionElement.addEventListener(TRANSITION_END, handler);
	    setTimeout(() => {
	      if (!called) {
	        triggerTransitionEnd(transitionElement);
	      }
	    }, emulatedDuration);
	  };

	  /**
	   * --------------------------------------------------------------------------
	   * Bootstrap (v5.1.3): util/scrollBar.js
	   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
	   * --------------------------------------------------------------------------
	   */
	  const SELECTOR_FIXED_CONTENT = '.fixed-top, .fixed-bottom, .is-fixed, .sticky-top';
	  const SELECTOR_STICKY_CONTENT = '.sticky-top';

	  class ScrollBarHelper {
	    constructor() {
	      this._element = document.body;
	    }

	    getWidth() {
	      // https://developer.mozilla.org/en-US/docs/Web/API/Window/innerWidth#usage_notes
	      const documentWidth = document.documentElement.clientWidth;
	      return Math.abs(window.innerWidth - documentWidth);
	    }

	    hide() {
	      const width = this.getWidth();

	      this._disableOverFlow(); // give padding to element to balance the hidden scrollbar width


	      this._setElementAttributes(this._element, 'paddingRight', calculatedValue => calculatedValue + width); // trick: We adjust positive paddingRight and negative marginRight to sticky-top elements to keep showing fullwidth


	      this._setElementAttributes(SELECTOR_FIXED_CONTENT, 'paddingRight', calculatedValue => calculatedValue + width);

	      this._setElementAttributes(SELECTOR_STICKY_CONTENT, 'marginRight', calculatedValue => calculatedValue - width);
	    }

	    _disableOverFlow() {
	      this._saveInitialAttribute(this._element, 'overflow');

	      this._element.style.overflow = 'hidden';
	    }

	    _setElementAttributes(selector, styleProp, callback) {
	      const scrollbarWidth = this.getWidth();

	      const manipulationCallBack = element => {
	        if (element !== this._element && window.innerWidth > element.clientWidth + scrollbarWidth) {
	          return;
	        }

	        this._saveInitialAttribute(element, styleProp);

	        const calculatedValue = window.getComputedStyle(element)[styleProp];
	        element.style[styleProp] = `${callback(Number.parseFloat(calculatedValue))}px`;
	      };

	      this._applyManipulationCallback(selector, manipulationCallBack);
	    }

	    reset() {
	      this._resetElementAttributes(this._element, 'overflow');

	      this._resetElementAttributes(this._element, 'paddingRight');

	      this._resetElementAttributes(SELECTOR_FIXED_CONTENT, 'paddingRight');

	      this._resetElementAttributes(SELECTOR_STICKY_CONTENT, 'marginRight');
	    }

	    _saveInitialAttribute(element, styleProp) {
	      const actualValue = element.style[styleProp];

	      if (actualValue) {
	        Manipulator__default.default.setDataAttribute(element, styleProp, actualValue);
	      }
	    }

	    _resetElementAttributes(selector, styleProp) {
	      const manipulationCallBack = element => {
	        const value = Manipulator__default.default.getDataAttribute(element, styleProp);

	        if (typeof value === 'undefined') {
	          element.style.removeProperty(styleProp);
	        } else {
	          Manipulator__default.default.removeDataAttribute(element, styleProp);
	          element.style[styleProp] = value;
	        }
	      };

	      this._applyManipulationCallback(selector, manipulationCallBack);
	    }

	    _applyManipulationCallback(selector, callBack) {
	      if (isElement(selector)) {
	        callBack(selector);
	      } else {
	        SelectorEngine__default.default.find(selector, this._element).forEach(callBack);
	      }
	    }

	    isOverflowing() {
	      return this.getWidth() > 0;
	    }

	  }

	  /**
	   * --------------------------------------------------------------------------
	   * Bootstrap (v5.1.3): util/backdrop.js
	   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
	   * --------------------------------------------------------------------------
	   */
	  const Default$2 = {
	    className: 'modal-backdrop',
	    isVisible: true,
	    // if false, we use the backdrop helper without adding any element to the dom
	    isAnimated: false,
	    rootElement: 'body',
	    // give the choice to place backdrop under different elements
	    clickCallback: null
	  };
	  const DefaultType$2 = {
	    className: 'string',
	    isVisible: 'boolean',
	    isAnimated: 'boolean',
	    rootElement: '(element|string)',
	    clickCallback: '(function|null)'
	  };
	  const NAME$2 = 'backdrop';
	  const CLASS_NAME_FADE = 'fade';
	  const CLASS_NAME_SHOW$1 = 'show';
	  const EVENT_MOUSEDOWN = `mousedown.bs.${NAME$2}`;

	  class Backdrop {
	    constructor(config) {
	      this._config = this._getConfig(config);
	      this._isAppended = false;
	      this._element = null;
	    }

	    show(callback) {
	      if (!this._config.isVisible) {
	        execute(callback);
	        return;
	      }

	      this._append();

	      if (this._config.isAnimated) {
	        reflow(this._getElement());
	      }

	      this._getElement().classList.add(CLASS_NAME_SHOW$1);

	      this._emulateAnimation(() => {
	        execute(callback);
	      });
	    }

	    hide(callback) {
	      if (!this._config.isVisible) {
	        execute(callback);
	        return;
	      }

	      this._getElement().classList.remove(CLASS_NAME_SHOW$1);

	      this._emulateAnimation(() => {
	        this.dispose();
	        execute(callback);
	      });
	    } // Private


	    _getElement() {
	      if (!this._element) {
	        const backdrop = document.createElement('div');
	        backdrop.className = this._config.className;

	        if (this._config.isAnimated) {
	          backdrop.classList.add(CLASS_NAME_FADE);
	        }

	        this._element = backdrop;
	      }

	      return this._element;
	    }

	    _getConfig(config) {
	      config = { ...Default$2,
	        ...(typeof config === 'object' ? config : {})
	      }; // use getElement() with the default "body" to get a fresh Element on each instantiation

	      config.rootElement = getElement(config.rootElement);
	      typeCheckConfig(NAME$2, config, DefaultType$2);
	      return config;
	    }

	    _append() {
	      if (this._isAppended) {
	        return;
	      }

	      this._config.rootElement.append(this._getElement());

	      EventHandler__default.default.on(this._getElement(), EVENT_MOUSEDOWN, () => {
	        execute(this._config.clickCallback);
	      });
	      this._isAppended = true;
	    }

	    dispose() {
	      if (!this._isAppended) {
	        return;
	      }

	      EventHandler__default.default.off(this._element, EVENT_MOUSEDOWN);

	      this._element.remove();

	      this._isAppended = false;
	    }

	    _emulateAnimation(callback) {
	      executeAfterTransition(callback, this._getElement(), this._config.isAnimated);
	    }

	  }

	  /**
	   * --------------------------------------------------------------------------
	   * Bootstrap (v5.1.3): util/focustrap.js
	   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
	   * --------------------------------------------------------------------------
	   */
	  const Default$1 = {
	    trapElement: null,
	    // The element to trap focus inside of
	    autofocus: true
	  };
	  const DefaultType$1 = {
	    trapElement: 'element',
	    autofocus: 'boolean'
	  };
	  const NAME$1 = 'focustrap';
	  const DATA_KEY$1 = 'bs.focustrap';
	  const EVENT_KEY$1 = `.${DATA_KEY$1}`;
	  const EVENT_FOCUSIN = `focusin${EVENT_KEY$1}`;
	  const EVENT_KEYDOWN_TAB = `keydown.tab${EVENT_KEY$1}`;
	  const TAB_KEY = 'Tab';
	  const TAB_NAV_FORWARD = 'forward';
	  const TAB_NAV_BACKWARD = 'backward';

	  class FocusTrap {
	    constructor(config) {
	      this._config = this._getConfig(config);
	      this._isActive = false;
	      this._lastTabNavDirection = null;
	    }

	    activate() {
	      const {
	        trapElement,
	        autofocus
	      } = this._config;

	      if (this._isActive) {
	        return;
	      }

	      if (autofocus) {
	        trapElement.focus();
	      }

	      EventHandler__default.default.off(document, EVENT_KEY$1); // guard against infinite focus loop

	      EventHandler__default.default.on(document, EVENT_FOCUSIN, event => this._handleFocusin(event));
	      EventHandler__default.default.on(document, EVENT_KEYDOWN_TAB, event => this._handleKeydown(event));
	      this._isActive = true;
	    }

	    deactivate() {
	      if (!this._isActive) {
	        return;
	      }

	      this._isActive = false;
	      EventHandler__default.default.off(document, EVENT_KEY$1);
	    } // Private


	    _handleFocusin(event) {
	      const {
	        target
	      } = event;
	      const {
	        trapElement
	      } = this._config;

	      if (target === document || target === trapElement || trapElement.contains(target)) {
	        return;
	      }

	      const elements = SelectorEngine__default.default.focusableChildren(trapElement);

	      if (elements.length === 0) {
	        trapElement.focus();
	      } else if (this._lastTabNavDirection === TAB_NAV_BACKWARD) {
	        elements[elements.length - 1].focus();
	      } else {
	        elements[0].focus();
	      }
	    }

	    _handleKeydown(event) {
	      if (event.key !== TAB_KEY) {
	        return;
	      }

	      this._lastTabNavDirection = event.shiftKey ? TAB_NAV_BACKWARD : TAB_NAV_FORWARD;
	    }

	    _getConfig(config) {
	      config = { ...Default$1,
	        ...(typeof config === 'object' ? config : {})
	      };
	      typeCheckConfig(NAME$1, config, DefaultType$1);
	      return config;
	    }

	  }

	  /**
	   * --------------------------------------------------------------------------
	   * Bootstrap (v5.1.3): util/component-functions.js
	   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
	   * --------------------------------------------------------------------------
	   */

	  const enableDismissTrigger = (component, method = 'hide') => {
	    const clickEvent = `click.dismiss${component.EVENT_KEY}`;
	    const name = component.NAME;
	    EventHandler__default.default.on(document, clickEvent, `[data-bs-dismiss="${name}"]`, function (event) {
	      if (['A', 'AREA'].includes(this.tagName)) {
	        event.preventDefault();
	      }

	      if (isDisabled(this)) {
	        return;
	      }

	      const target = getElementFromSelector(this) || this.closest(`.${name}`);
	      const instance = component.getOrCreateInstance(target); // Method argument is left, for Alert and only, as it doesn't implement the 'hide' method

	      instance[method]();
	    });
	  };

	  /**
	   * --------------------------------------------------------------------------
	   * Bootstrap (v5.1.3): offcanvas.js
	   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
	   * --------------------------------------------------------------------------
	   */
	  /**
	   * ------------------------------------------------------------------------
	   * Constants
	   * ------------------------------------------------------------------------
	   */

	  const NAME = 'offcanvas';
	  const DATA_KEY = 'bs.offcanvas';
	  const EVENT_KEY = `.${DATA_KEY}`;
	  const DATA_API_KEY = '.data-api';
	  const EVENT_LOAD_DATA_API = `load${EVENT_KEY}${DATA_API_KEY}`;
	  const ESCAPE_KEY = 'Escape';
	  const Default = {
	    backdrop: true,
	    keyboard: true,
	    scroll: false
	  };
	  const DefaultType = {
	    backdrop: 'boolean',
	    keyboard: 'boolean',
	    scroll: 'boolean'
	  };
	  const CLASS_NAME_SHOW = 'show';
	  const CLASS_NAME_BACKDROP = 'offcanvas-backdrop';
	  const OPEN_SELECTOR = '.offcanvas.show';
	  const EVENT_SHOW = `show${EVENT_KEY}`;
	  const EVENT_SHOWN = `shown${EVENT_KEY}`;
	  const EVENT_HIDE = `hide${EVENT_KEY}`;
	  const EVENT_HIDDEN = `hidden${EVENT_KEY}`;
	  const EVENT_CLICK_DATA_API = `click${EVENT_KEY}${DATA_API_KEY}`;
	  const EVENT_KEYDOWN_DISMISS = `keydown.dismiss${EVENT_KEY}`;
	  const SELECTOR_DATA_TOGGLE = '[data-bs-toggle="offcanvas"]';
	  /**
	   * ------------------------------------------------------------------------
	   * Class Definition
	   * ------------------------------------------------------------------------
	   */

	  class Offcanvas extends BaseComponent__default.default {
	    constructor(element, config) {
	      super(element);
	      this._config = this._getConfig(config);
	      this._isShown = false;
	      this._backdrop = this._initializeBackDrop();
	      this._focustrap = this._initializeFocusTrap();

	      this._addEventListeners();
	    } // Getters


	    static get NAME() {
	      return NAME;
	    }

	    static get Default() {
	      return Default;
	    } // Public


	    toggle(relatedTarget) {
	      return this._isShown ? this.hide() : this.show(relatedTarget);
	    }

	    show(relatedTarget) {
	      if (this._isShown) {
	        return;
	      }

	      const showEvent = EventHandler__default.default.trigger(this._element, EVENT_SHOW, {
	        relatedTarget
	      });

	      if (showEvent.defaultPrevented) {
	        return;
	      }

	      this._isShown = true;
	      this._element.style.visibility = 'visible';

	      this._backdrop.show();

	      if (!this._config.scroll) {
	        new ScrollBarHelper().hide();
	      }

	      this._element.removeAttribute('aria-hidden');

	      this._element.setAttribute('aria-modal', true);

	      this._element.setAttribute('role', 'dialog');

	      this._element.classList.add(CLASS_NAME_SHOW);

	      const completeCallBack = () => {
	        if (!this._config.scroll) {
	          this._focustrap.activate();
	        }

	        EventHandler__default.default.trigger(this._element, EVENT_SHOWN, {
	          relatedTarget
	        });
	      };

	      this._queueCallback(completeCallBack, this._element, true);
	    }

	    hide() {
	      if (!this._isShown) {
	        return;
	      }

	      const hideEvent = EventHandler__default.default.trigger(this._element, EVENT_HIDE);

	      if (hideEvent.defaultPrevented) {
	        return;
	      }

	      this._focustrap.deactivate();

	      this._element.blur();

	      this._isShown = false;

	      this._element.classList.remove(CLASS_NAME_SHOW);

	      this._backdrop.hide();

	      const completeCallback = () => {
	        this._element.setAttribute('aria-hidden', true);

	        this._element.removeAttribute('aria-modal');

	        this._element.removeAttribute('role');

	        this._element.style.visibility = 'hidden';

	        if (!this._config.scroll) {
	          new ScrollBarHelper().reset();
	        }

	        EventHandler__default.default.trigger(this._element, EVENT_HIDDEN);
	      };

	      this._queueCallback(completeCallback, this._element, true);
	    }

	    dispose() {
	      this._backdrop.dispose();

	      this._focustrap.deactivate();

	      super.dispose();
	    } // Private


	    _getConfig(config) {
	      config = { ...Default,
	        ...Manipulator__default.default.getDataAttributes(this._element),
	        ...(typeof config === 'object' ? config : {})
	      };
	      typeCheckConfig(NAME, config, DefaultType);
	      return config;
	    }

	    _initializeBackDrop() {
	      return new Backdrop({
	        className: CLASS_NAME_BACKDROP,
	        isVisible: this._config.backdrop,
	        isAnimated: true,
	        rootElement: this._element.parentNode,
	        clickCallback: () => this.hide()
	      });
	    }

	    _initializeFocusTrap() {
	      return new FocusTrap({
	        trapElement: this._element
	      });
	    }

	    _addEventListeners() {
	      EventHandler__default.default.on(this._element, EVENT_KEYDOWN_DISMISS, event => {
	        if (this._config.keyboard && event.key === ESCAPE_KEY) {
	          this.hide();
	        }
	      });
	    } // Static


	    static jQueryInterface(config) {
	      return this.each(function () {
	        const data = Offcanvas.getOrCreateInstance(this, config);

	        if (typeof config !== 'string') {
	          return;
	        }

	        if (data[config] === undefined || config.startsWith('_') || config === 'constructor') {
	          throw new TypeError(`No method named "${config}"`);
	        }

	        data[config](this);
	      });
	    }

	  }
	  /**
	   * ------------------------------------------------------------------------
	   * Data Api implementation
	   * ------------------------------------------------------------------------
	   */


	  EventHandler__default.default.on(document, EVENT_CLICK_DATA_API, SELECTOR_DATA_TOGGLE, function (event) {
	    const target = getElementFromSelector(this);

	    if (['A', 'AREA'].includes(this.tagName)) {
	      event.preventDefault();
	    }

	    if (isDisabled(this)) {
	      return;
	    }

	    EventHandler__default.default.one(target, EVENT_HIDDEN, () => {
	      // focus on trigger when it is closed
	      if (isVisible(this)) {
	        this.focus();
	      }
	    }); // avoid conflict when clicking a toggler of an offcanvas, while another is open

	    const allReadyOpen = SelectorEngine__default.default.findOne(OPEN_SELECTOR);

	    if (allReadyOpen && allReadyOpen !== target) {
	      Offcanvas.getInstance(allReadyOpen).hide();
	    }

	    const data = Offcanvas.getOrCreateInstance(target);
	    data.toggle(this);
	  });
	  EventHandler__default.default.on(window, EVENT_LOAD_DATA_API, () => SelectorEngine__default.default.find(OPEN_SELECTOR).forEach(el => Offcanvas.getOrCreateInstance(el).show()));
	  enableDismissTrigger(Offcanvas);
	  /**
	   * ------------------------------------------------------------------------
	   * jQuery
	   * ------------------------------------------------------------------------
	   */

	  defineJQueryPlugin(Offcanvas);

	  return Offcanvas;

	}));

	}(offcanvas$1));

	var offcanvas = offcanvas$1.exports;

	var popover$1 = {exports: {}};

	var tooltip$1 = {exports: {}};

	/*!
	  * Bootstrap tooltip.js v5.1.3 (https://getbootstrap.com/)
	  * Copyright 2011-2021 The Bootstrap Authors (https://github.com/twbs/bootstrap/graphs/contributors)
	  * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
	  */

	(function (module, exports) {
	(function (global, factory) {
	  module.exports = factory(require$$0, data.exports, eventHandler.exports, manipulator.exports, selectorEngine.exports, baseComponent.exports) ;
	})(commonjsGlobal, (function (Popper, Data, EventHandler, Manipulator, SelectorEngine, BaseComponent) {
	  const _interopDefaultLegacy = e => e && typeof e === 'object' && 'default' in e ? e : { default: e };

	  function _interopNamespace(e) {
	    if (e && e.__esModule) return e;
	    const n = Object.create(null);
	    if (e) {
	      for (const k in e) {
	        if (k !== 'default') {
	          const d = Object.getOwnPropertyDescriptor(e, k);
	          Object.defineProperty(n, k, d.get ? d : {
	            enumerable: true,
	            get: () => e[k]
	          });
	        }
	      }
	    }
	    n.default = e;
	    return Object.freeze(n);
	  }

	  const Popper__namespace = /*#__PURE__*/_interopNamespace(Popper);
	  const Data__default = /*#__PURE__*/_interopDefaultLegacy(Data);
	  const EventHandler__default = /*#__PURE__*/_interopDefaultLegacy(EventHandler);
	  const Manipulator__default = /*#__PURE__*/_interopDefaultLegacy(Manipulator);
	  const SelectorEngine__default = /*#__PURE__*/_interopDefaultLegacy(SelectorEngine);
	  const BaseComponent__default = /*#__PURE__*/_interopDefaultLegacy(BaseComponent);

	  /**
	   * --------------------------------------------------------------------------
	   * Bootstrap (v5.1.3): util/index.js
	   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
	   * --------------------------------------------------------------------------
	   */
	  const MAX_UID = 1000000;

	  const toType = obj => {
	    if (obj === null || obj === undefined) {
	      return `${obj}`;
	    }

	    return {}.toString.call(obj).match(/\s([a-z]+)/i)[1].toLowerCase();
	  };
	  /**
	   * --------------------------------------------------------------------------
	   * Public Util Api
	   * --------------------------------------------------------------------------
	   */


	  const getUID = prefix => {
	    do {
	      prefix += Math.floor(Math.random() * MAX_UID);
	    } while (document.getElementById(prefix));

	    return prefix;
	  };

	  const isElement = obj => {
	    if (!obj || typeof obj !== 'object') {
	      return false;
	    }

	    if (typeof obj.jquery !== 'undefined') {
	      obj = obj[0];
	    }

	    return typeof obj.nodeType !== 'undefined';
	  };

	  const getElement = obj => {
	    if (isElement(obj)) {
	      // it's a jQuery object or a node element
	      return obj.jquery ? obj[0] : obj;
	    }

	    if (typeof obj === 'string' && obj.length > 0) {
	      return document.querySelector(obj);
	    }

	    return null;
	  };

	  const typeCheckConfig = (componentName, config, configTypes) => {
	    Object.keys(configTypes).forEach(property => {
	      const expectedTypes = configTypes[property];
	      const value = config[property];
	      const valueType = value && isElement(value) ? 'element' : toType(value);

	      if (!new RegExp(expectedTypes).test(valueType)) {
	        throw new TypeError(`${componentName.toUpperCase()}: Option "${property}" provided type "${valueType}" but expected type "${expectedTypes}".`);
	      }
	    });
	  };

	  const findShadowRoot = element => {
	    if (!document.documentElement.attachShadow) {
	      return null;
	    } // Can find the shadow root otherwise it'll return the document


	    if (typeof element.getRootNode === 'function') {
	      const root = element.getRootNode();
	      return root instanceof ShadowRoot ? root : null;
	    }

	    if (element instanceof ShadowRoot) {
	      return element;
	    } // when we don't find a shadow root


	    if (!element.parentNode) {
	      return null;
	    }

	    return findShadowRoot(element.parentNode);
	  };

	  const noop = () => {};

	  const getjQuery = () => {
	    const {
	      jQuery
	    } = window;

	    if (jQuery && !document.body.hasAttribute('data-bs-no-jquery')) {
	      return jQuery;
	    }

	    return null;
	  };

	  const DOMContentLoadedCallbacks = [];

	  const onDOMContentLoaded = callback => {
	    if (document.readyState === 'loading') {
	      // add listener on the first call when the document is in loading state
	      if (!DOMContentLoadedCallbacks.length) {
	        document.addEventListener('DOMContentLoaded', () => {
	          DOMContentLoadedCallbacks.forEach(callback => callback());
	        });
	      }

	      DOMContentLoadedCallbacks.push(callback);
	    } else {
	      callback();
	    }
	  };

	  const isRTL = () => document.documentElement.dir === 'rtl';

	  const defineJQueryPlugin = plugin => {
	    onDOMContentLoaded(() => {
	      const $ = getjQuery();
	      /* istanbul ignore if */

	      if ($) {
	        const name = plugin.NAME;
	        const JQUERY_NO_CONFLICT = $.fn[name];
	        $.fn[name] = plugin.jQueryInterface;
	        $.fn[name].Constructor = plugin;

	        $.fn[name].noConflict = () => {
	          $.fn[name] = JQUERY_NO_CONFLICT;
	          return plugin.jQueryInterface;
	        };
	      }
	    });
	  };

	  /**
	   * --------------------------------------------------------------------------
	   * Bootstrap (v5.1.3): util/sanitizer.js
	   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
	   * --------------------------------------------------------------------------
	   */
	  const uriAttributes = new Set(['background', 'cite', 'href', 'itemtype', 'longdesc', 'poster', 'src', 'xlink:href']);
	  const ARIA_ATTRIBUTE_PATTERN = /^aria-[\w-]*$/i;
	  /**
	   * A pattern that recognizes a commonly useful subset of URLs that are safe.
	   *
	   * Shoutout to Angular https://github.com/angular/angular/blob/12.2.x/packages/core/src/sanitization/url_sanitizer.ts
	   */

	  const SAFE_URL_PATTERN = /^(?:(?:https?|mailto|ftp|tel|file|sms):|[^#&/:?]*(?:[#/?]|$))/i;
	  /**
	   * A pattern that matches safe data URLs. Only matches image, video and audio types.
	   *
	   * Shoutout to Angular https://github.com/angular/angular/blob/12.2.x/packages/core/src/sanitization/url_sanitizer.ts
	   */

	  const DATA_URL_PATTERN = /^data:(?:image\/(?:bmp|gif|jpeg|jpg|png|tiff|webp)|video\/(?:mpeg|mp4|ogg|webm)|audio\/(?:mp3|oga|ogg|opus));base64,[\d+/a-z]+=*$/i;

	  const allowedAttribute = (attribute, allowedAttributeList) => {
	    const attributeName = attribute.nodeName.toLowerCase();

	    if (allowedAttributeList.includes(attributeName)) {
	      if (uriAttributes.has(attributeName)) {
	        return Boolean(SAFE_URL_PATTERN.test(attribute.nodeValue) || DATA_URL_PATTERN.test(attribute.nodeValue));
	      }

	      return true;
	    }

	    const regExp = allowedAttributeList.filter(attributeRegex => attributeRegex instanceof RegExp); // Check if a regular expression validates the attribute.

	    for (let i = 0, len = regExp.length; i < len; i++) {
	      if (regExp[i].test(attributeName)) {
	        return true;
	      }
	    }

	    return false;
	  };

	  const DefaultAllowlist = {
	    // Global attributes allowed on any supplied element below.
	    '*': ['class', 'dir', 'id', 'lang', 'role', ARIA_ATTRIBUTE_PATTERN],
	    a: ['target', 'href', 'title', 'rel'],
	    area: [],
	    b: [],
	    br: [],
	    col: [],
	    code: [],
	    div: [],
	    em: [],
	    hr: [],
	    h1: [],
	    h2: [],
	    h3: [],
	    h4: [],
	    h5: [],
	    h6: [],
	    i: [],
	    img: ['src', 'srcset', 'alt', 'title', 'width', 'height'],
	    li: [],
	    ol: [],
	    p: [],
	    pre: [],
	    s: [],
	    small: [],
	    span: [],
	    sub: [],
	    sup: [],
	    strong: [],
	    u: [],
	    ul: []
	  };
	  function sanitizeHtml(unsafeHtml, allowList, sanitizeFn) {
	    if (!unsafeHtml.length) {
	      return unsafeHtml;
	    }

	    if (sanitizeFn && typeof sanitizeFn === 'function') {
	      return sanitizeFn(unsafeHtml);
	    }

	    const domParser = new window.DOMParser();
	    const createdDocument = domParser.parseFromString(unsafeHtml, 'text/html');
	    const elements = [].concat(...createdDocument.body.querySelectorAll('*'));

	    for (let i = 0, len = elements.length; i < len; i++) {
	      const element = elements[i];
	      const elementName = element.nodeName.toLowerCase();

	      if (!Object.keys(allowList).includes(elementName)) {
	        element.remove();
	        continue;
	      }

	      const attributeList = [].concat(...element.attributes);
	      const allowedAttributes = [].concat(allowList['*'] || [], allowList[elementName] || []);
	      attributeList.forEach(attribute => {
	        if (!allowedAttribute(attribute, allowedAttributes)) {
	          element.removeAttribute(attribute.nodeName);
	        }
	      });
	    }

	    return createdDocument.body.innerHTML;
	  }

	  /**
	   * --------------------------------------------------------------------------
	   * Bootstrap (v5.1.3): tooltip.js
	   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
	   * --------------------------------------------------------------------------
	   */
	  /**
	   * ------------------------------------------------------------------------
	   * Constants
	   * ------------------------------------------------------------------------
	   */

	  const NAME = 'tooltip';
	  const DATA_KEY = 'bs.tooltip';
	  const EVENT_KEY = `.${DATA_KEY}`;
	  const CLASS_PREFIX = 'bs-tooltip';
	  const DISALLOWED_ATTRIBUTES = new Set(['sanitize', 'allowList', 'sanitizeFn']);
	  const DefaultType = {
	    animation: 'boolean',
	    template: 'string',
	    title: '(string|element|function)',
	    trigger: 'string',
	    delay: '(number|object)',
	    html: 'boolean',
	    selector: '(string|boolean)',
	    placement: '(string|function)',
	    offset: '(array|string|function)',
	    container: '(string|element|boolean)',
	    fallbackPlacements: 'array',
	    boundary: '(string|element)',
	    customClass: '(string|function)',
	    sanitize: 'boolean',
	    sanitizeFn: '(null|function)',
	    allowList: 'object',
	    popperConfig: '(null|object|function)'
	  };
	  const AttachmentMap = {
	    AUTO: 'auto',
	    TOP: 'top',
	    RIGHT: isRTL() ? 'left' : 'right',
	    BOTTOM: 'bottom',
	    LEFT: isRTL() ? 'right' : 'left'
	  };
	  const Default = {
	    animation: true,
	    template: '<div class="tooltip" role="tooltip">' + '<div class="tooltip-arrow"></div>' + '<div class="tooltip-inner"></div>' + '</div>',
	    trigger: 'hover focus',
	    title: '',
	    delay: 0,
	    html: false,
	    selector: false,
	    placement: 'top',
	    offset: [0, 0],
	    container: false,
	    fallbackPlacements: ['top', 'right', 'bottom', 'left'],
	    boundary: 'clippingParents',
	    customClass: '',
	    sanitize: true,
	    sanitizeFn: null,
	    allowList: DefaultAllowlist,
	    popperConfig: null
	  };
	  const Event = {
	    HIDE: `hide${EVENT_KEY}`,
	    HIDDEN: `hidden${EVENT_KEY}`,
	    SHOW: `show${EVENT_KEY}`,
	    SHOWN: `shown${EVENT_KEY}`,
	    INSERTED: `inserted${EVENT_KEY}`,
	    CLICK: `click${EVENT_KEY}`,
	    FOCUSIN: `focusin${EVENT_KEY}`,
	    FOCUSOUT: `focusout${EVENT_KEY}`,
	    MOUSEENTER: `mouseenter${EVENT_KEY}`,
	    MOUSELEAVE: `mouseleave${EVENT_KEY}`
	  };
	  const CLASS_NAME_FADE = 'fade';
	  const CLASS_NAME_MODAL = 'modal';
	  const CLASS_NAME_SHOW = 'show';
	  const HOVER_STATE_SHOW = 'show';
	  const HOVER_STATE_OUT = 'out';
	  const SELECTOR_TOOLTIP_INNER = '.tooltip-inner';
	  const SELECTOR_MODAL = `.${CLASS_NAME_MODAL}`;
	  const EVENT_MODAL_HIDE = 'hide.bs.modal';
	  const TRIGGER_HOVER = 'hover';
	  const TRIGGER_FOCUS = 'focus';
	  const TRIGGER_CLICK = 'click';
	  const TRIGGER_MANUAL = 'manual';
	  /**
	   * ------------------------------------------------------------------------
	   * Class Definition
	   * ------------------------------------------------------------------------
	   */

	  class Tooltip extends BaseComponent__default.default {
	    constructor(element, config) {
	      if (typeof Popper__namespace === 'undefined') {
	        throw new TypeError('Bootstrap\'s tooltips require Popper (https://popper.js.org)');
	      }

	      super(element); // private

	      this._isEnabled = true;
	      this._timeout = 0;
	      this._hoverState = '';
	      this._activeTrigger = {};
	      this._popper = null; // Protected

	      this._config = this._getConfig(config);
	      this.tip = null;

	      this._setListeners();
	    } // Getters


	    static get Default() {
	      return Default;
	    }

	    static get NAME() {
	      return NAME;
	    }

	    static get Event() {
	      return Event;
	    }

	    static get DefaultType() {
	      return DefaultType;
	    } // Public


	    enable() {
	      this._isEnabled = true;
	    }

	    disable() {
	      this._isEnabled = false;
	    }

	    toggleEnabled() {
	      this._isEnabled = !this._isEnabled;
	    }

	    toggle(event) {
	      if (!this._isEnabled) {
	        return;
	      }

	      if (event) {
	        const context = this._initializeOnDelegatedTarget(event);

	        context._activeTrigger.click = !context._activeTrigger.click;

	        if (context._isWithActiveTrigger()) {
	          context._enter(null, context);
	        } else {
	          context._leave(null, context);
	        }
	      } else {
	        if (this.getTipElement().classList.contains(CLASS_NAME_SHOW)) {
	          this._leave(null, this);

	          return;
	        }

	        this._enter(null, this);
	      }
	    }

	    dispose() {
	      clearTimeout(this._timeout);
	      EventHandler__default.default.off(this._element.closest(SELECTOR_MODAL), EVENT_MODAL_HIDE, this._hideModalHandler);

	      if (this.tip) {
	        this.tip.remove();
	      }

	      this._disposePopper();

	      super.dispose();
	    }

	    show() {
	      if (this._element.style.display === 'none') {
	        throw new Error('Please use show on visible elements');
	      }

	      if (!(this.isWithContent() && this._isEnabled)) {
	        return;
	      }

	      const showEvent = EventHandler__default.default.trigger(this._element, this.constructor.Event.SHOW);
	      const shadowRoot = findShadowRoot(this._element);
	      const isInTheDom = shadowRoot === null ? this._element.ownerDocument.documentElement.contains(this._element) : shadowRoot.contains(this._element);

	      if (showEvent.defaultPrevented || !isInTheDom) {
	        return;
	      } // A trick to recreate a tooltip in case a new title is given by using the NOT documented `data-bs-original-title`
	      // This will be removed later in favor of a `setContent` method


	      if (this.constructor.NAME === 'tooltip' && this.tip && this.getTitle() !== this.tip.querySelector(SELECTOR_TOOLTIP_INNER).innerHTML) {
	        this._disposePopper();

	        this.tip.remove();
	        this.tip = null;
	      }

	      const tip = this.getTipElement();
	      const tipId = getUID(this.constructor.NAME);
	      tip.setAttribute('id', tipId);

	      this._element.setAttribute('aria-describedby', tipId);

	      if (this._config.animation) {
	        tip.classList.add(CLASS_NAME_FADE);
	      }

	      const placement = typeof this._config.placement === 'function' ? this._config.placement.call(this, tip, this._element) : this._config.placement;

	      const attachment = this._getAttachment(placement);

	      this._addAttachmentClass(attachment);

	      const {
	        container
	      } = this._config;
	      Data__default.default.set(tip, this.constructor.DATA_KEY, this);

	      if (!this._element.ownerDocument.documentElement.contains(this.tip)) {
	        container.append(tip);
	        EventHandler__default.default.trigger(this._element, this.constructor.Event.INSERTED);
	      }

	      if (this._popper) {
	        this._popper.update();
	      } else {
	        this._popper = Popper__namespace.createPopper(this._element, tip, this._getPopperConfig(attachment));
	      }

	      tip.classList.add(CLASS_NAME_SHOW);

	      const customClass = this._resolvePossibleFunction(this._config.customClass);

	      if (customClass) {
	        tip.classList.add(...customClass.split(' '));
	      } // If this is a touch-enabled device we add extra
	      // empty mouseover listeners to the body's immediate children;
	      // only needed because of broken event delegation on iOS
	      // https://www.quirksmode.org/blog/archives/2014/02/mouse_event_bub.html


	      if ('ontouchstart' in document.documentElement) {
	        [].concat(...document.body.children).forEach(element => {
	          EventHandler__default.default.on(element, 'mouseover', noop);
	        });
	      }

	      const complete = () => {
	        const prevHoverState = this._hoverState;
	        this._hoverState = null;
	        EventHandler__default.default.trigger(this._element, this.constructor.Event.SHOWN);

	        if (prevHoverState === HOVER_STATE_OUT) {
	          this._leave(null, this);
	        }
	      };

	      const isAnimated = this.tip.classList.contains(CLASS_NAME_FADE);

	      this._queueCallback(complete, this.tip, isAnimated);
	    }

	    hide() {
	      if (!this._popper) {
	        return;
	      }

	      const tip = this.getTipElement();

	      const complete = () => {
	        if (this._isWithActiveTrigger()) {
	          return;
	        }

	        if (this._hoverState !== HOVER_STATE_SHOW) {
	          tip.remove();
	        }

	        this._cleanTipClass();

	        this._element.removeAttribute('aria-describedby');

	        EventHandler__default.default.trigger(this._element, this.constructor.Event.HIDDEN);

	        this._disposePopper();
	      };

	      const hideEvent = EventHandler__default.default.trigger(this._element, this.constructor.Event.HIDE);

	      if (hideEvent.defaultPrevented) {
	        return;
	      }

	      tip.classList.remove(CLASS_NAME_SHOW); // If this is a touch-enabled device we remove the extra
	      // empty mouseover listeners we added for iOS support

	      if ('ontouchstart' in document.documentElement) {
	        [].concat(...document.body.children).forEach(element => EventHandler__default.default.off(element, 'mouseover', noop));
	      }

	      this._activeTrigger[TRIGGER_CLICK] = false;
	      this._activeTrigger[TRIGGER_FOCUS] = false;
	      this._activeTrigger[TRIGGER_HOVER] = false;
	      const isAnimated = this.tip.classList.contains(CLASS_NAME_FADE);

	      this._queueCallback(complete, this.tip, isAnimated);

	      this._hoverState = '';
	    }

	    update() {
	      if (this._popper !== null) {
	        this._popper.update();
	      }
	    } // Protected


	    isWithContent() {
	      return Boolean(this.getTitle());
	    }

	    getTipElement() {
	      if (this.tip) {
	        return this.tip;
	      }

	      const element = document.createElement('div');
	      element.innerHTML = this._config.template;
	      const tip = element.children[0];
	      this.setContent(tip);
	      tip.classList.remove(CLASS_NAME_FADE, CLASS_NAME_SHOW);
	      this.tip = tip;
	      return this.tip;
	    }

	    setContent(tip) {
	      this._sanitizeAndSetContent(tip, this.getTitle(), SELECTOR_TOOLTIP_INNER);
	    }

	    _sanitizeAndSetContent(template, content, selector) {
	      const templateElement = SelectorEngine__default.default.findOne(selector, template);

	      if (!content && templateElement) {
	        templateElement.remove();
	        return;
	      } // we use append for html objects to maintain js events


	      this.setElementContent(templateElement, content);
	    }

	    setElementContent(element, content) {
	      if (element === null) {
	        return;
	      }

	      if (isElement(content)) {
	        content = getElement(content); // content is a DOM node or a jQuery

	        if (this._config.html) {
	          if (content.parentNode !== element) {
	            element.innerHTML = '';
	            element.append(content);
	          }
	        } else {
	          element.textContent = content.textContent;
	        }

	        return;
	      }

	      if (this._config.html) {
	        if (this._config.sanitize) {
	          content = sanitizeHtml(content, this._config.allowList, this._config.sanitizeFn);
	        }

	        element.innerHTML = content;
	      } else {
	        element.textContent = content;
	      }
	    }

	    getTitle() {
	      const title = this._element.getAttribute('data-bs-original-title') || this._config.title;

	      return this._resolvePossibleFunction(title);
	    }

	    updateAttachment(attachment) {
	      if (attachment === 'right') {
	        return 'end';
	      }

	      if (attachment === 'left') {
	        return 'start';
	      }

	      return attachment;
	    } // Private


	    _initializeOnDelegatedTarget(event, context) {
	      return context || this.constructor.getOrCreateInstance(event.delegateTarget, this._getDelegateConfig());
	    }

	    _getOffset() {
	      const {
	        offset
	      } = this._config;

	      if (typeof offset === 'string') {
	        return offset.split(',').map(val => Number.parseInt(val, 10));
	      }

	      if (typeof offset === 'function') {
	        return popperData => offset(popperData, this._element);
	      }

	      return offset;
	    }

	    _resolvePossibleFunction(content) {
	      return typeof content === 'function' ? content.call(this._element) : content;
	    }

	    _getPopperConfig(attachment) {
	      const defaultBsPopperConfig = {
	        placement: attachment,
	        modifiers: [{
	          name: 'flip',
	          options: {
	            fallbackPlacements: this._config.fallbackPlacements
	          }
	        }, {
	          name: 'offset',
	          options: {
	            offset: this._getOffset()
	          }
	        }, {
	          name: 'preventOverflow',
	          options: {
	            boundary: this._config.boundary
	          }
	        }, {
	          name: 'arrow',
	          options: {
	            element: `.${this.constructor.NAME}-arrow`
	          }
	        }, {
	          name: 'onChange',
	          enabled: true,
	          phase: 'afterWrite',
	          fn: data => this._handlePopperPlacementChange(data)
	        }],
	        onFirstUpdate: data => {
	          if (data.options.placement !== data.placement) {
	            this._handlePopperPlacementChange(data);
	          }
	        }
	      };
	      return { ...defaultBsPopperConfig,
	        ...(typeof this._config.popperConfig === 'function' ? this._config.popperConfig(defaultBsPopperConfig) : this._config.popperConfig)
	      };
	    }

	    _addAttachmentClass(attachment) {
	      this.getTipElement().classList.add(`${this._getBasicClassPrefix()}-${this.updateAttachment(attachment)}`);
	    }

	    _getAttachment(placement) {
	      return AttachmentMap[placement.toUpperCase()];
	    }

	    _setListeners() {
	      const triggers = this._config.trigger.split(' ');

	      triggers.forEach(trigger => {
	        if (trigger === 'click') {
	          EventHandler__default.default.on(this._element, this.constructor.Event.CLICK, this._config.selector, event => this.toggle(event));
	        } else if (trigger !== TRIGGER_MANUAL) {
	          const eventIn = trigger === TRIGGER_HOVER ? this.constructor.Event.MOUSEENTER : this.constructor.Event.FOCUSIN;
	          const eventOut = trigger === TRIGGER_HOVER ? this.constructor.Event.MOUSELEAVE : this.constructor.Event.FOCUSOUT;
	          EventHandler__default.default.on(this._element, eventIn, this._config.selector, event => this._enter(event));
	          EventHandler__default.default.on(this._element, eventOut, this._config.selector, event => this._leave(event));
	        }
	      });

	      this._hideModalHandler = () => {
	        if (this._element) {
	          this.hide();
	        }
	      };

	      EventHandler__default.default.on(this._element.closest(SELECTOR_MODAL), EVENT_MODAL_HIDE, this._hideModalHandler);

	      if (this._config.selector) {
	        this._config = { ...this._config,
	          trigger: 'manual',
	          selector: ''
	        };
	      } else {
	        this._fixTitle();
	      }
	    }

	    _fixTitle() {
	      const title = this._element.getAttribute('title');

	      const originalTitleType = typeof this._element.getAttribute('data-bs-original-title');

	      if (title || originalTitleType !== 'string') {
	        this._element.setAttribute('data-bs-original-title', title || '');

	        if (title && !this._element.getAttribute('aria-label') && !this._element.textContent) {
	          this._element.setAttribute('aria-label', title);
	        }

	        this._element.setAttribute('title', '');
	      }
	    }

	    _enter(event, context) {
	      context = this._initializeOnDelegatedTarget(event, context);

	      if (event) {
	        context._activeTrigger[event.type === 'focusin' ? TRIGGER_FOCUS : TRIGGER_HOVER] = true;
	      }

	      if (context.getTipElement().classList.contains(CLASS_NAME_SHOW) || context._hoverState === HOVER_STATE_SHOW) {
	        context._hoverState = HOVER_STATE_SHOW;
	        return;
	      }

	      clearTimeout(context._timeout);
	      context._hoverState = HOVER_STATE_SHOW;

	      if (!context._config.delay || !context._config.delay.show) {
	        context.show();
	        return;
	      }

	      context._timeout = setTimeout(() => {
	        if (context._hoverState === HOVER_STATE_SHOW) {
	          context.show();
	        }
	      }, context._config.delay.show);
	    }

	    _leave(event, context) {
	      context = this._initializeOnDelegatedTarget(event, context);

	      if (event) {
	        context._activeTrigger[event.type === 'focusout' ? TRIGGER_FOCUS : TRIGGER_HOVER] = context._element.contains(event.relatedTarget);
	      }

	      if (context._isWithActiveTrigger()) {
	        return;
	      }

	      clearTimeout(context._timeout);
	      context._hoverState = HOVER_STATE_OUT;

	      if (!context._config.delay || !context._config.delay.hide) {
	        context.hide();
	        return;
	      }

	      context._timeout = setTimeout(() => {
	        if (context._hoverState === HOVER_STATE_OUT) {
	          context.hide();
	        }
	      }, context._config.delay.hide);
	    }

	    _isWithActiveTrigger() {
	      for (const trigger in this._activeTrigger) {
	        if (this._activeTrigger[trigger]) {
	          return true;
	        }
	      }

	      return false;
	    }

	    _getConfig(config) {
	      const dataAttributes = Manipulator__default.default.getDataAttributes(this._element);
	      Object.keys(dataAttributes).forEach(dataAttr => {
	        if (DISALLOWED_ATTRIBUTES.has(dataAttr)) {
	          delete dataAttributes[dataAttr];
	        }
	      });
	      config = { ...this.constructor.Default,
	        ...dataAttributes,
	        ...(typeof config === 'object' && config ? config : {})
	      };
	      config.container = config.container === false ? document.body : getElement(config.container);

	      if (typeof config.delay === 'number') {
	        config.delay = {
	          show: config.delay,
	          hide: config.delay
	        };
	      }

	      if (typeof config.title === 'number') {
	        config.title = config.title.toString();
	      }

	      if (typeof config.content === 'number') {
	        config.content = config.content.toString();
	      }

	      typeCheckConfig(NAME, config, this.constructor.DefaultType);

	      if (config.sanitize) {
	        config.template = sanitizeHtml(config.template, config.allowList, config.sanitizeFn);
	      }

	      return config;
	    }

	    _getDelegateConfig() {
	      const config = {};

	      for (const key in this._config) {
	        if (this.constructor.Default[key] !== this._config[key]) {
	          config[key] = this._config[key];
	        }
	      } // In the future can be replaced with:
	      // const keysWithDifferentValues = Object.entries(this._config).filter(entry => this.constructor.Default[entry[0]] !== this._config[entry[0]])
	      // `Object.fromEntries(keysWithDifferentValues)`


	      return config;
	    }

	    _cleanTipClass() {
	      const tip = this.getTipElement();
	      const basicClassPrefixRegex = new RegExp(`(^|\\s)${this._getBasicClassPrefix()}\\S+`, 'g');
	      const tabClass = tip.getAttribute('class').match(basicClassPrefixRegex);

	      if (tabClass !== null && tabClass.length > 0) {
	        tabClass.map(token => token.trim()).forEach(tClass => tip.classList.remove(tClass));
	      }
	    }

	    _getBasicClassPrefix() {
	      return CLASS_PREFIX;
	    }

	    _handlePopperPlacementChange(popperData) {
	      const {
	        state
	      } = popperData;

	      if (!state) {
	        return;
	      }

	      this.tip = state.elements.popper;

	      this._cleanTipClass();

	      this._addAttachmentClass(this._getAttachment(state.placement));
	    }

	    _disposePopper() {
	      if (this._popper) {
	        this._popper.destroy();

	        this._popper = null;
	      }
	    } // Static


	    static jQueryInterface(config) {
	      return this.each(function () {
	        const data = Tooltip.getOrCreateInstance(this, config);

	        if (typeof config === 'string') {
	          if (typeof data[config] === 'undefined') {
	            throw new TypeError(`No method named "${config}"`);
	          }

	          data[config]();
	        }
	      });
	    }

	  }
	  /**
	   * ------------------------------------------------------------------------
	   * jQuery
	   * ------------------------------------------------------------------------
	   * add .Tooltip to jQuery only if jQuery is present
	   */


	  defineJQueryPlugin(Tooltip);

	  return Tooltip;

	}));

	}(tooltip$1));

	var tooltip = /*@__PURE__*/getDefaultExportFromCjs(tooltip$1.exports);

	/*!
	  * Bootstrap popover.js v5.1.3 (https://getbootstrap.com/)
	  * Copyright 2011-2021 The Bootstrap Authors (https://github.com/twbs/bootstrap/graphs/contributors)
	  * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
	  */

	(function (module, exports) {
	(function (global, factory) {
	  module.exports = factory(tooltip$1.exports) ;
	})(commonjsGlobal, (function (Tooltip) {
	  const _interopDefaultLegacy = e => e && typeof e === 'object' && 'default' in e ? e : { default: e };

	  const Tooltip__default = /*#__PURE__*/_interopDefaultLegacy(Tooltip);

	  /**
	   * --------------------------------------------------------------------------
	   * Bootstrap (v5.1.3): util/index.js
	   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
	   * --------------------------------------------------------------------------
	   */

	  const getjQuery = () => {
	    const {
	      jQuery
	    } = window;

	    if (jQuery && !document.body.hasAttribute('data-bs-no-jquery')) {
	      return jQuery;
	    }

	    return null;
	  };

	  const DOMContentLoadedCallbacks = [];

	  const onDOMContentLoaded = callback => {
	    if (document.readyState === 'loading') {
	      // add listener on the first call when the document is in loading state
	      if (!DOMContentLoadedCallbacks.length) {
	        document.addEventListener('DOMContentLoaded', () => {
	          DOMContentLoadedCallbacks.forEach(callback => callback());
	        });
	      }

	      DOMContentLoadedCallbacks.push(callback);
	    } else {
	      callback();
	    }
	  };

	  const defineJQueryPlugin = plugin => {
	    onDOMContentLoaded(() => {
	      const $ = getjQuery();
	      /* istanbul ignore if */

	      if ($) {
	        const name = plugin.NAME;
	        const JQUERY_NO_CONFLICT = $.fn[name];
	        $.fn[name] = plugin.jQueryInterface;
	        $.fn[name].Constructor = plugin;

	        $.fn[name].noConflict = () => {
	          $.fn[name] = JQUERY_NO_CONFLICT;
	          return plugin.jQueryInterface;
	        };
	      }
	    });
	  };

	  /**
	   * --------------------------------------------------------------------------
	   * Bootstrap (v5.1.3): popover.js
	   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
	   * --------------------------------------------------------------------------
	   */
	  /**
	   * ------------------------------------------------------------------------
	   * Constants
	   * ------------------------------------------------------------------------
	   */

	  const NAME = 'popover';
	  const DATA_KEY = 'bs.popover';
	  const EVENT_KEY = `.${DATA_KEY}`;
	  const CLASS_PREFIX = 'bs-popover';
	  const Default = { ...Tooltip__default.default.Default,
	    placement: 'right',
	    offset: [0, 8],
	    trigger: 'click',
	    content: '',
	    template: '<div class="popover" role="tooltip">' + '<div class="popover-arrow"></div>' + '<h3 class="popover-header"></h3>' + '<div class="popover-body"></div>' + '</div>'
	  };
	  const DefaultType = { ...Tooltip__default.default.DefaultType,
	    content: '(string|element|function)'
	  };
	  const Event = {
	    HIDE: `hide${EVENT_KEY}`,
	    HIDDEN: `hidden${EVENT_KEY}`,
	    SHOW: `show${EVENT_KEY}`,
	    SHOWN: `shown${EVENT_KEY}`,
	    INSERTED: `inserted${EVENT_KEY}`,
	    CLICK: `click${EVENT_KEY}`,
	    FOCUSIN: `focusin${EVENT_KEY}`,
	    FOCUSOUT: `focusout${EVENT_KEY}`,
	    MOUSEENTER: `mouseenter${EVENT_KEY}`,
	    MOUSELEAVE: `mouseleave${EVENT_KEY}`
	  };
	  const SELECTOR_TITLE = '.popover-header';
	  const SELECTOR_CONTENT = '.popover-body';
	  /**
	   * ------------------------------------------------------------------------
	   * Class Definition
	   * ------------------------------------------------------------------------
	   */

	  class Popover extends Tooltip__default.default {
	    // Getters
	    static get Default() {
	      return Default;
	    }

	    static get NAME() {
	      return NAME;
	    }

	    static get Event() {
	      return Event;
	    }

	    static get DefaultType() {
	      return DefaultType;
	    } // Overrides


	    isWithContent() {
	      return this.getTitle() || this._getContent();
	    }

	    setContent(tip) {
	      this._sanitizeAndSetContent(tip, this.getTitle(), SELECTOR_TITLE);

	      this._sanitizeAndSetContent(tip, this._getContent(), SELECTOR_CONTENT);
	    } // Private


	    _getContent() {
	      return this._resolvePossibleFunction(this._config.content);
	    }

	    _getBasicClassPrefix() {
	      return CLASS_PREFIX;
	    } // Static


	    static jQueryInterface(config) {
	      return this.each(function () {
	        const data = Popover.getOrCreateInstance(this, config);

	        if (typeof config === 'string') {
	          if (typeof data[config] === 'undefined') {
	            throw new TypeError(`No method named "${config}"`);
	          }

	          data[config]();
	        }
	      });
	    }

	  }
	  /**
	   * ------------------------------------------------------------------------
	   * jQuery
	   * ------------------------------------------------------------------------
	   * add .Popover to jQuery only if jQuery is present
	   */


	  defineJQueryPlugin(Popover);

	  return Popover;

	}));

	}(popover$1));

	var popover = popover$1.exports;

	var scrollspy$1 = {exports: {}};

	/*!
	  * Bootstrap scrollspy.js v5.1.3 (https://getbootstrap.com/)
	  * Copyright 2011-2021 The Bootstrap Authors (https://github.com/twbs/bootstrap/graphs/contributors)
	  * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
	  */

	(function (module, exports) {
	(function (global, factory) {
	  module.exports = factory(eventHandler.exports, manipulator.exports, selectorEngine.exports, baseComponent.exports) ;
	})(commonjsGlobal, (function (EventHandler, Manipulator, SelectorEngine, BaseComponent) {
	  const _interopDefaultLegacy = e => e && typeof e === 'object' && 'default' in e ? e : { default: e };

	  const EventHandler__default = /*#__PURE__*/_interopDefaultLegacy(EventHandler);
	  const Manipulator__default = /*#__PURE__*/_interopDefaultLegacy(Manipulator);
	  const SelectorEngine__default = /*#__PURE__*/_interopDefaultLegacy(SelectorEngine);
	  const BaseComponent__default = /*#__PURE__*/_interopDefaultLegacy(BaseComponent);

	  /**
	   * --------------------------------------------------------------------------
	   * Bootstrap (v5.1.3): util/index.js
	   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
	   * --------------------------------------------------------------------------
	   */

	  const toType = obj => {
	    if (obj === null || obj === undefined) {
	      return `${obj}`;
	    }

	    return {}.toString.call(obj).match(/\s([a-z]+)/i)[1].toLowerCase();
	  };

	  const getSelector = element => {
	    let selector = element.getAttribute('data-bs-target');

	    if (!selector || selector === '#') {
	      let hrefAttr = element.getAttribute('href'); // The only valid content that could double as a selector are IDs or classes,
	      // so everything starting with `#` or `.`. If a "real" URL is used as the selector,
	      // `document.querySelector` will rightfully complain it is invalid.
	      // See https://github.com/twbs/bootstrap/issues/32273

	      if (!hrefAttr || !hrefAttr.includes('#') && !hrefAttr.startsWith('.')) {
	        return null;
	      } // Just in case some CMS puts out a full URL with the anchor appended


	      if (hrefAttr.includes('#') && !hrefAttr.startsWith('#')) {
	        hrefAttr = `#${hrefAttr.split('#')[1]}`;
	      }

	      selector = hrefAttr && hrefAttr !== '#' ? hrefAttr.trim() : null;
	    }

	    return selector;
	  };

	  const getSelectorFromElement = element => {
	    const selector = getSelector(element);

	    if (selector) {
	      return document.querySelector(selector) ? selector : null;
	    }

	    return null;
	  };

	  const isElement = obj => {
	    if (!obj || typeof obj !== 'object') {
	      return false;
	    }

	    if (typeof obj.jquery !== 'undefined') {
	      obj = obj[0];
	    }

	    return typeof obj.nodeType !== 'undefined';
	  };

	  const getElement = obj => {
	    if (isElement(obj)) {
	      // it's a jQuery object or a node element
	      return obj.jquery ? obj[0] : obj;
	    }

	    if (typeof obj === 'string' && obj.length > 0) {
	      return document.querySelector(obj);
	    }

	    return null;
	  };

	  const typeCheckConfig = (componentName, config, configTypes) => {
	    Object.keys(configTypes).forEach(property => {
	      const expectedTypes = configTypes[property];
	      const value = config[property];
	      const valueType = value && isElement(value) ? 'element' : toType(value);

	      if (!new RegExp(expectedTypes).test(valueType)) {
	        throw new TypeError(`${componentName.toUpperCase()}: Option "${property}" provided type "${valueType}" but expected type "${expectedTypes}".`);
	      }
	    });
	  };

	  const getjQuery = () => {
	    const {
	      jQuery
	    } = window;

	    if (jQuery && !document.body.hasAttribute('data-bs-no-jquery')) {
	      return jQuery;
	    }

	    return null;
	  };

	  const DOMContentLoadedCallbacks = [];

	  const onDOMContentLoaded = callback => {
	    if (document.readyState === 'loading') {
	      // add listener on the first call when the document is in loading state
	      if (!DOMContentLoadedCallbacks.length) {
	        document.addEventListener('DOMContentLoaded', () => {
	          DOMContentLoadedCallbacks.forEach(callback => callback());
	        });
	      }

	      DOMContentLoadedCallbacks.push(callback);
	    } else {
	      callback();
	    }
	  };

	  const defineJQueryPlugin = plugin => {
	    onDOMContentLoaded(() => {
	      const $ = getjQuery();
	      /* istanbul ignore if */

	      if ($) {
	        const name = plugin.NAME;
	        const JQUERY_NO_CONFLICT = $.fn[name];
	        $.fn[name] = plugin.jQueryInterface;
	        $.fn[name].Constructor = plugin;

	        $.fn[name].noConflict = () => {
	          $.fn[name] = JQUERY_NO_CONFLICT;
	          return plugin.jQueryInterface;
	        };
	      }
	    });
	  };

	  /**
	   * --------------------------------------------------------------------------
	   * Bootstrap (v5.1.3): scrollspy.js
	   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
	   * --------------------------------------------------------------------------
	   */
	  /**
	   * ------------------------------------------------------------------------
	   * Constants
	   * ------------------------------------------------------------------------
	   */

	  const NAME = 'scrollspy';
	  const DATA_KEY = 'bs.scrollspy';
	  const EVENT_KEY = `.${DATA_KEY}`;
	  const DATA_API_KEY = '.data-api';
	  const Default = {
	    offset: 10,
	    method: 'auto',
	    target: ''
	  };
	  const DefaultType = {
	    offset: 'number',
	    method: 'string',
	    target: '(string|element)'
	  };
	  const EVENT_ACTIVATE = `activate${EVENT_KEY}`;
	  const EVENT_SCROLL = `scroll${EVENT_KEY}`;
	  const EVENT_LOAD_DATA_API = `load${EVENT_KEY}${DATA_API_KEY}`;
	  const CLASS_NAME_DROPDOWN_ITEM = 'dropdown-item';
	  const CLASS_NAME_ACTIVE = 'active';
	  const SELECTOR_DATA_SPY = '[data-bs-spy="scroll"]';
	  const SELECTOR_NAV_LIST_GROUP = '.nav, .list-group';
	  const SELECTOR_NAV_LINKS = '.nav-link';
	  const SELECTOR_NAV_ITEMS = '.nav-item';
	  const SELECTOR_LIST_ITEMS = '.list-group-item';
	  const SELECTOR_LINK_ITEMS = `${SELECTOR_NAV_LINKS}, ${SELECTOR_LIST_ITEMS}, .${CLASS_NAME_DROPDOWN_ITEM}`;
	  const SELECTOR_DROPDOWN = '.dropdown';
	  const SELECTOR_DROPDOWN_TOGGLE = '.dropdown-toggle';
	  const METHOD_OFFSET = 'offset';
	  const METHOD_POSITION = 'position';
	  /**
	   * ------------------------------------------------------------------------
	   * Class Definition
	   * ------------------------------------------------------------------------
	   */

	  class ScrollSpy extends BaseComponent__default.default {
	    constructor(element, config) {
	      super(element);
	      this._scrollElement = this._element.tagName === 'BODY' ? window : this._element;
	      this._config = this._getConfig(config);
	      this._offsets = [];
	      this._targets = [];
	      this._activeTarget = null;
	      this._scrollHeight = 0;
	      EventHandler__default.default.on(this._scrollElement, EVENT_SCROLL, () => this._process());
	      this.refresh();

	      this._process();
	    } // Getters


	    static get Default() {
	      return Default;
	    }

	    static get NAME() {
	      return NAME;
	    } // Public


	    refresh() {
	      const autoMethod = this._scrollElement === this._scrollElement.window ? METHOD_OFFSET : METHOD_POSITION;
	      const offsetMethod = this._config.method === 'auto' ? autoMethod : this._config.method;
	      const offsetBase = offsetMethod === METHOD_POSITION ? this._getScrollTop() : 0;
	      this._offsets = [];
	      this._targets = [];
	      this._scrollHeight = this._getScrollHeight();
	      const targets = SelectorEngine__default.default.find(SELECTOR_LINK_ITEMS, this._config.target);
	      targets.map(element => {
	        const targetSelector = getSelectorFromElement(element);
	        const target = targetSelector ? SelectorEngine__default.default.findOne(targetSelector) : null;

	        if (target) {
	          const targetBCR = target.getBoundingClientRect();

	          if (targetBCR.width || targetBCR.height) {
	            return [Manipulator__default.default[offsetMethod](target).top + offsetBase, targetSelector];
	          }
	        }

	        return null;
	      }).filter(item => item).sort((a, b) => a[0] - b[0]).forEach(item => {
	        this._offsets.push(item[0]);

	        this._targets.push(item[1]);
	      });
	    }

	    dispose() {
	      EventHandler__default.default.off(this._scrollElement, EVENT_KEY);
	      super.dispose();
	    } // Private


	    _getConfig(config) {
	      config = { ...Default,
	        ...Manipulator__default.default.getDataAttributes(this._element),
	        ...(typeof config === 'object' && config ? config : {})
	      };
	      config.target = getElement(config.target) || document.documentElement;
	      typeCheckConfig(NAME, config, DefaultType);
	      return config;
	    }

	    _getScrollTop() {
	      return this._scrollElement === window ? this._scrollElement.pageYOffset : this._scrollElement.scrollTop;
	    }

	    _getScrollHeight() {
	      return this._scrollElement.scrollHeight || Math.max(document.body.scrollHeight, document.documentElement.scrollHeight);
	    }

	    _getOffsetHeight() {
	      return this._scrollElement === window ? window.innerHeight : this._scrollElement.getBoundingClientRect().height;
	    }

	    _process() {
	      const scrollTop = this._getScrollTop() + this._config.offset;

	      const scrollHeight = this._getScrollHeight();

	      const maxScroll = this._config.offset + scrollHeight - this._getOffsetHeight();

	      if (this._scrollHeight !== scrollHeight) {
	        this.refresh();
	      }

	      if (scrollTop >= maxScroll) {
	        const target = this._targets[this._targets.length - 1];

	        if (this._activeTarget !== target) {
	          this._activate(target);
	        }

	        return;
	      }

	      if (this._activeTarget && scrollTop < this._offsets[0] && this._offsets[0] > 0) {
	        this._activeTarget = null;

	        this._clear();

	        return;
	      }

	      for (let i = this._offsets.length; i--;) {
	        const isActiveTarget = this._activeTarget !== this._targets[i] && scrollTop >= this._offsets[i] && (typeof this._offsets[i + 1] === 'undefined' || scrollTop < this._offsets[i + 1]);

	        if (isActiveTarget) {
	          this._activate(this._targets[i]);
	        }
	      }
	    }

	    _activate(target) {
	      this._activeTarget = target;

	      this._clear();

	      const queries = SELECTOR_LINK_ITEMS.split(',').map(selector => `${selector}[data-bs-target="${target}"],${selector}[href="${target}"]`);
	      const link = SelectorEngine__default.default.findOne(queries.join(','), this._config.target);
	      link.classList.add(CLASS_NAME_ACTIVE);

	      if (link.classList.contains(CLASS_NAME_DROPDOWN_ITEM)) {
	        SelectorEngine__default.default.findOne(SELECTOR_DROPDOWN_TOGGLE, link.closest(SELECTOR_DROPDOWN)).classList.add(CLASS_NAME_ACTIVE);
	      } else {
	        SelectorEngine__default.default.parents(link, SELECTOR_NAV_LIST_GROUP).forEach(listGroup => {
	          // Set triggered links parents as active
	          // With both <ul> and <nav> markup a parent is the previous sibling of any nav ancestor
	          SelectorEngine__default.default.prev(listGroup, `${SELECTOR_NAV_LINKS}, ${SELECTOR_LIST_ITEMS}`).forEach(item => item.classList.add(CLASS_NAME_ACTIVE)); // Handle special case when .nav-link is inside .nav-item

	          SelectorEngine__default.default.prev(listGroup, SELECTOR_NAV_ITEMS).forEach(navItem => {
	            SelectorEngine__default.default.children(navItem, SELECTOR_NAV_LINKS).forEach(item => item.classList.add(CLASS_NAME_ACTIVE));
	          });
	        });
	      }

	      EventHandler__default.default.trigger(this._scrollElement, EVENT_ACTIVATE, {
	        relatedTarget: target
	      });
	    }

	    _clear() {
	      SelectorEngine__default.default.find(SELECTOR_LINK_ITEMS, this._config.target).filter(node => node.classList.contains(CLASS_NAME_ACTIVE)).forEach(node => node.classList.remove(CLASS_NAME_ACTIVE));
	    } // Static


	    static jQueryInterface(config) {
	      return this.each(function () {
	        const data = ScrollSpy.getOrCreateInstance(this, config);

	        if (typeof config !== 'string') {
	          return;
	        }

	        if (typeof data[config] === 'undefined') {
	          throw new TypeError(`No method named "${config}"`);
	        }

	        data[config]();
	      });
	    }

	  }
	  /**
	   * ------------------------------------------------------------------------
	   * Data Api implementation
	   * ------------------------------------------------------------------------
	   */


	  EventHandler__default.default.on(window, EVENT_LOAD_DATA_API, () => {
	    SelectorEngine__default.default.find(SELECTOR_DATA_SPY).forEach(spy => new ScrollSpy(spy));
	  });
	  /**
	   * ------------------------------------------------------------------------
	   * jQuery
	   * ------------------------------------------------------------------------
	   * add .ScrollSpy to jQuery only if jQuery is present
	   */

	  defineJQueryPlugin(ScrollSpy);

	  return ScrollSpy;

	}));

	}(scrollspy$1));

	var scrollspy = scrollspy$1.exports;

	var tab$1 = {exports: {}};

	/*!
	  * Bootstrap tab.js v5.1.3 (https://getbootstrap.com/)
	  * Copyright 2011-2021 The Bootstrap Authors (https://github.com/twbs/bootstrap/graphs/contributors)
	  * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
	  */

	(function (module, exports) {
	(function (global, factory) {
	  module.exports = factory(eventHandler.exports, selectorEngine.exports, baseComponent.exports) ;
	})(commonjsGlobal, (function (EventHandler, SelectorEngine, BaseComponent) {
	  const _interopDefaultLegacy = e => e && typeof e === 'object' && 'default' in e ? e : { default: e };

	  const EventHandler__default = /*#__PURE__*/_interopDefaultLegacy(EventHandler);
	  const SelectorEngine__default = /*#__PURE__*/_interopDefaultLegacy(SelectorEngine);
	  const BaseComponent__default = /*#__PURE__*/_interopDefaultLegacy(BaseComponent);

	  /**
	   * --------------------------------------------------------------------------
	   * Bootstrap (v5.1.3): util/index.js
	   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
	   * --------------------------------------------------------------------------
	   */

	  const getSelector = element => {
	    let selector = element.getAttribute('data-bs-target');

	    if (!selector || selector === '#') {
	      let hrefAttr = element.getAttribute('href'); // The only valid content that could double as a selector are IDs or classes,
	      // so everything starting with `#` or `.`. If a "real" URL is used as the selector,
	      // `document.querySelector` will rightfully complain it is invalid.
	      // See https://github.com/twbs/bootstrap/issues/32273

	      if (!hrefAttr || !hrefAttr.includes('#') && !hrefAttr.startsWith('.')) {
	        return null;
	      } // Just in case some CMS puts out a full URL with the anchor appended


	      if (hrefAttr.includes('#') && !hrefAttr.startsWith('#')) {
	        hrefAttr = `#${hrefAttr.split('#')[1]}`;
	      }

	      selector = hrefAttr && hrefAttr !== '#' ? hrefAttr.trim() : null;
	    }

	    return selector;
	  };

	  const getElementFromSelector = element => {
	    const selector = getSelector(element);
	    return selector ? document.querySelector(selector) : null;
	  };

	  const isDisabled = element => {
	    if (!element || element.nodeType !== Node.ELEMENT_NODE) {
	      return true;
	    }

	    if (element.classList.contains('disabled')) {
	      return true;
	    }

	    if (typeof element.disabled !== 'undefined') {
	      return element.disabled;
	    }

	    return element.hasAttribute('disabled') && element.getAttribute('disabled') !== 'false';
	  };
	  /**
	   * Trick to restart an element's animation
	   *
	   * @param {HTMLElement} element
	   * @return void
	   *
	   * @see https://www.charistheo.io/blog/2021/02/restart-a-css-animation-with-javascript/#restarting-a-css-animation
	   */


	  const reflow = element => {
	    // eslint-disable-next-line no-unused-expressions
	    element.offsetHeight;
	  };

	  const getjQuery = () => {
	    const {
	      jQuery
	    } = window;

	    if (jQuery && !document.body.hasAttribute('data-bs-no-jquery')) {
	      return jQuery;
	    }

	    return null;
	  };

	  const DOMContentLoadedCallbacks = [];

	  const onDOMContentLoaded = callback => {
	    if (document.readyState === 'loading') {
	      // add listener on the first call when the document is in loading state
	      if (!DOMContentLoadedCallbacks.length) {
	        document.addEventListener('DOMContentLoaded', () => {
	          DOMContentLoadedCallbacks.forEach(callback => callback());
	        });
	      }

	      DOMContentLoadedCallbacks.push(callback);
	    } else {
	      callback();
	    }
	  };

	  const defineJQueryPlugin = plugin => {
	    onDOMContentLoaded(() => {
	      const $ = getjQuery();
	      /* istanbul ignore if */

	      if ($) {
	        const name = plugin.NAME;
	        const JQUERY_NO_CONFLICT = $.fn[name];
	        $.fn[name] = plugin.jQueryInterface;
	        $.fn[name].Constructor = plugin;

	        $.fn[name].noConflict = () => {
	          $.fn[name] = JQUERY_NO_CONFLICT;
	          return plugin.jQueryInterface;
	        };
	      }
	    });
	  };

	  /**
	   * --------------------------------------------------------------------------
	   * Bootstrap (v5.1.3): tab.js
	   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
	   * --------------------------------------------------------------------------
	   */
	  /**
	   * ------------------------------------------------------------------------
	   * Constants
	   * ------------------------------------------------------------------------
	   */

	  const NAME = 'tab';
	  const DATA_KEY = 'bs.tab';
	  const EVENT_KEY = `.${DATA_KEY}`;
	  const DATA_API_KEY = '.data-api';
	  const EVENT_HIDE = `hide${EVENT_KEY}`;
	  const EVENT_HIDDEN = `hidden${EVENT_KEY}`;
	  const EVENT_SHOW = `show${EVENT_KEY}`;
	  const EVENT_SHOWN = `shown${EVENT_KEY}`;
	  const EVENT_CLICK_DATA_API = `click${EVENT_KEY}${DATA_API_KEY}`;
	  const CLASS_NAME_DROPDOWN_MENU = 'dropdown-menu';
	  const CLASS_NAME_ACTIVE = 'active';
	  const CLASS_NAME_FADE = 'fade';
	  const CLASS_NAME_SHOW = 'show';
	  const SELECTOR_DROPDOWN = '.dropdown';
	  const SELECTOR_NAV_LIST_GROUP = '.nav, .list-group';
	  const SELECTOR_ACTIVE = '.active';
	  const SELECTOR_ACTIVE_UL = ':scope > li > .active';
	  const SELECTOR_DATA_TOGGLE = '[data-bs-toggle="tab"], [data-bs-toggle="pill"], [data-bs-toggle="list"]';
	  const SELECTOR_DROPDOWN_TOGGLE = '.dropdown-toggle';
	  const SELECTOR_DROPDOWN_ACTIVE_CHILD = ':scope > .dropdown-menu .active';
	  /**
	   * ------------------------------------------------------------------------
	   * Class Definition
	   * ------------------------------------------------------------------------
	   */

	  class Tab extends BaseComponent__default.default {
	    // Getters
	    static get NAME() {
	      return NAME;
	    } // Public


	    show() {
	      if (this._element.parentNode && this._element.parentNode.nodeType === Node.ELEMENT_NODE && this._element.classList.contains(CLASS_NAME_ACTIVE)) {
	        return;
	      }

	      let previous;
	      const target = getElementFromSelector(this._element);

	      const listElement = this._element.closest(SELECTOR_NAV_LIST_GROUP);

	      if (listElement) {
	        const itemSelector = listElement.nodeName === 'UL' || listElement.nodeName === 'OL' ? SELECTOR_ACTIVE_UL : SELECTOR_ACTIVE;
	        previous = SelectorEngine__default.default.find(itemSelector, listElement);
	        previous = previous[previous.length - 1];
	      }

	      const hideEvent = previous ? EventHandler__default.default.trigger(previous, EVENT_HIDE, {
	        relatedTarget: this._element
	      }) : null;
	      const showEvent = EventHandler__default.default.trigger(this._element, EVENT_SHOW, {
	        relatedTarget: previous
	      });

	      if (showEvent.defaultPrevented || hideEvent !== null && hideEvent.defaultPrevented) {
	        return;
	      }

	      this._activate(this._element, listElement);

	      const complete = () => {
	        EventHandler__default.default.trigger(previous, EVENT_HIDDEN, {
	          relatedTarget: this._element
	        });
	        EventHandler__default.default.trigger(this._element, EVENT_SHOWN, {
	          relatedTarget: previous
	        });
	      };

	      if (target) {
	        this._activate(target, target.parentNode, complete);
	      } else {
	        complete();
	      }
	    } // Private


	    _activate(element, container, callback) {
	      const activeElements = container && (container.nodeName === 'UL' || container.nodeName === 'OL') ? SelectorEngine__default.default.find(SELECTOR_ACTIVE_UL, container) : SelectorEngine__default.default.children(container, SELECTOR_ACTIVE);
	      const active = activeElements[0];
	      const isTransitioning = callback && active && active.classList.contains(CLASS_NAME_FADE);

	      const complete = () => this._transitionComplete(element, active, callback);

	      if (active && isTransitioning) {
	        active.classList.remove(CLASS_NAME_SHOW);

	        this._queueCallback(complete, element, true);
	      } else {
	        complete();
	      }
	    }

	    _transitionComplete(element, active, callback) {
	      if (active) {
	        active.classList.remove(CLASS_NAME_ACTIVE);
	        const dropdownChild = SelectorEngine__default.default.findOne(SELECTOR_DROPDOWN_ACTIVE_CHILD, active.parentNode);

	        if (dropdownChild) {
	          dropdownChild.classList.remove(CLASS_NAME_ACTIVE);
	        }

	        if (active.getAttribute('role') === 'tab') {
	          active.setAttribute('aria-selected', false);
	        }
	      }

	      element.classList.add(CLASS_NAME_ACTIVE);

	      if (element.getAttribute('role') === 'tab') {
	        element.setAttribute('aria-selected', true);
	      }

	      reflow(element);

	      if (element.classList.contains(CLASS_NAME_FADE)) {
	        element.classList.add(CLASS_NAME_SHOW);
	      }

	      let parent = element.parentNode;

	      if (parent && parent.nodeName === 'LI') {
	        parent = parent.parentNode;
	      }

	      if (parent && parent.classList.contains(CLASS_NAME_DROPDOWN_MENU)) {
	        const dropdownElement = element.closest(SELECTOR_DROPDOWN);

	        if (dropdownElement) {
	          SelectorEngine__default.default.find(SELECTOR_DROPDOWN_TOGGLE, dropdownElement).forEach(dropdown => dropdown.classList.add(CLASS_NAME_ACTIVE));
	        }

	        element.setAttribute('aria-expanded', true);
	      }

	      if (callback) {
	        callback();
	      }
	    } // Static


	    static jQueryInterface(config) {
	      return this.each(function () {
	        const data = Tab.getOrCreateInstance(this);

	        if (typeof config === 'string') {
	          if (typeof data[config] === 'undefined') {
	            throw new TypeError(`No method named "${config}"`);
	          }

	          data[config]();
	        }
	      });
	    }

	  }
	  /**
	   * ------------------------------------------------------------------------
	   * Data Api implementation
	   * ------------------------------------------------------------------------
	   */


	  EventHandler__default.default.on(document, EVENT_CLICK_DATA_API, SELECTOR_DATA_TOGGLE, function (event) {
	    if (['A', 'AREA'].includes(this.tagName)) {
	      event.preventDefault();
	    }

	    if (isDisabled(this)) {
	      return;
	    }

	    const data = Tab.getOrCreateInstance(this);
	    data.show();
	  });
	  /**
	   * ------------------------------------------------------------------------
	   * jQuery
	   * ------------------------------------------------------------------------
	   * add .Tab to jQuery only if jQuery is present
	   */

	  defineJQueryPlugin(Tab);

	  return Tab;

	}));

	}(tab$1));

	var tab = tab$1.exports;

	var toast$1 = {exports: {}};

	/*!
	  * Bootstrap toast.js v5.1.3 (https://getbootstrap.com/)
	  * Copyright 2011-2021 The Bootstrap Authors (https://github.com/twbs/bootstrap/graphs/contributors)
	  * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
	  */

	(function (module, exports) {
	(function (global, factory) {
	  module.exports = factory(eventHandler.exports, manipulator.exports, baseComponent.exports) ;
	})(commonjsGlobal, (function (EventHandler, Manipulator, BaseComponent) {
	  const _interopDefaultLegacy = e => e && typeof e === 'object' && 'default' in e ? e : { default: e };

	  const EventHandler__default = /*#__PURE__*/_interopDefaultLegacy(EventHandler);
	  const Manipulator__default = /*#__PURE__*/_interopDefaultLegacy(Manipulator);
	  const BaseComponent__default = /*#__PURE__*/_interopDefaultLegacy(BaseComponent);

	  /**
	   * --------------------------------------------------------------------------
	   * Bootstrap (v5.1.3): util/index.js
	   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
	   * --------------------------------------------------------------------------
	   */

	  const toType = obj => {
	    if (obj === null || obj === undefined) {
	      return `${obj}`;
	    }

	    return {}.toString.call(obj).match(/\s([a-z]+)/i)[1].toLowerCase();
	  };

	  const getSelector = element => {
	    let selector = element.getAttribute('data-bs-target');

	    if (!selector || selector === '#') {
	      let hrefAttr = element.getAttribute('href'); // The only valid content that could double as a selector are IDs or classes,
	      // so everything starting with `#` or `.`. If a "real" URL is used as the selector,
	      // `document.querySelector` will rightfully complain it is invalid.
	      // See https://github.com/twbs/bootstrap/issues/32273

	      if (!hrefAttr || !hrefAttr.includes('#') && !hrefAttr.startsWith('.')) {
	        return null;
	      } // Just in case some CMS puts out a full URL with the anchor appended


	      if (hrefAttr.includes('#') && !hrefAttr.startsWith('#')) {
	        hrefAttr = `#${hrefAttr.split('#')[1]}`;
	      }

	      selector = hrefAttr && hrefAttr !== '#' ? hrefAttr.trim() : null;
	    }

	    return selector;
	  };

	  const getElementFromSelector = element => {
	    const selector = getSelector(element);
	    return selector ? document.querySelector(selector) : null;
	  };

	  const isElement = obj => {
	    if (!obj || typeof obj !== 'object') {
	      return false;
	    }

	    if (typeof obj.jquery !== 'undefined') {
	      obj = obj[0];
	    }

	    return typeof obj.nodeType !== 'undefined';
	  };

	  const typeCheckConfig = (componentName, config, configTypes) => {
	    Object.keys(configTypes).forEach(property => {
	      const expectedTypes = configTypes[property];
	      const value = config[property];
	      const valueType = value && isElement(value) ? 'element' : toType(value);

	      if (!new RegExp(expectedTypes).test(valueType)) {
	        throw new TypeError(`${componentName.toUpperCase()}: Option "${property}" provided type "${valueType}" but expected type "${expectedTypes}".`);
	      }
	    });
	  };

	  const isDisabled = element => {
	    if (!element || element.nodeType !== Node.ELEMENT_NODE) {
	      return true;
	    }

	    if (element.classList.contains('disabled')) {
	      return true;
	    }

	    if (typeof element.disabled !== 'undefined') {
	      return element.disabled;
	    }

	    return element.hasAttribute('disabled') && element.getAttribute('disabled') !== 'false';
	  };
	  /**
	   * Trick to restart an element's animation
	   *
	   * @param {HTMLElement} element
	   * @return void
	   *
	   * @see https://www.charistheo.io/blog/2021/02/restart-a-css-animation-with-javascript/#restarting-a-css-animation
	   */


	  const reflow = element => {
	    // eslint-disable-next-line no-unused-expressions
	    element.offsetHeight;
	  };

	  const getjQuery = () => {
	    const {
	      jQuery
	    } = window;

	    if (jQuery && !document.body.hasAttribute('data-bs-no-jquery')) {
	      return jQuery;
	    }

	    return null;
	  };

	  const DOMContentLoadedCallbacks = [];

	  const onDOMContentLoaded = callback => {
	    if (document.readyState === 'loading') {
	      // add listener on the first call when the document is in loading state
	      if (!DOMContentLoadedCallbacks.length) {
	        document.addEventListener('DOMContentLoaded', () => {
	          DOMContentLoadedCallbacks.forEach(callback => callback());
	        });
	      }

	      DOMContentLoadedCallbacks.push(callback);
	    } else {
	      callback();
	    }
	  };

	  const defineJQueryPlugin = plugin => {
	    onDOMContentLoaded(() => {
	      const $ = getjQuery();
	      /* istanbul ignore if */

	      if ($) {
	        const name = plugin.NAME;
	        const JQUERY_NO_CONFLICT = $.fn[name];
	        $.fn[name] = plugin.jQueryInterface;
	        $.fn[name].Constructor = plugin;

	        $.fn[name].noConflict = () => {
	          $.fn[name] = JQUERY_NO_CONFLICT;
	          return plugin.jQueryInterface;
	        };
	      }
	    });
	  };

	  /**
	   * --------------------------------------------------------------------------
	   * Bootstrap (v5.1.3): util/component-functions.js
	   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
	   * --------------------------------------------------------------------------
	   */

	  const enableDismissTrigger = (component, method = 'hide') => {
	    const clickEvent = `click.dismiss${component.EVENT_KEY}`;
	    const name = component.NAME;
	    EventHandler__default.default.on(document, clickEvent, `[data-bs-dismiss="${name}"]`, function (event) {
	      if (['A', 'AREA'].includes(this.tagName)) {
	        event.preventDefault();
	      }

	      if (isDisabled(this)) {
	        return;
	      }

	      const target = getElementFromSelector(this) || this.closest(`.${name}`);
	      const instance = component.getOrCreateInstance(target); // Method argument is left, for Alert and only, as it doesn't implement the 'hide' method

	      instance[method]();
	    });
	  };

	  /**
	   * --------------------------------------------------------------------------
	   * Bootstrap (v5.1.3): toast.js
	   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
	   * --------------------------------------------------------------------------
	   */
	  /**
	   * ------------------------------------------------------------------------
	   * Constants
	   * ------------------------------------------------------------------------
	   */

	  const NAME = 'toast';
	  const DATA_KEY = 'bs.toast';
	  const EVENT_KEY = `.${DATA_KEY}`;
	  const EVENT_MOUSEOVER = `mouseover${EVENT_KEY}`;
	  const EVENT_MOUSEOUT = `mouseout${EVENT_KEY}`;
	  const EVENT_FOCUSIN = `focusin${EVENT_KEY}`;
	  const EVENT_FOCUSOUT = `focusout${EVENT_KEY}`;
	  const EVENT_HIDE = `hide${EVENT_KEY}`;
	  const EVENT_HIDDEN = `hidden${EVENT_KEY}`;
	  const EVENT_SHOW = `show${EVENT_KEY}`;
	  const EVENT_SHOWN = `shown${EVENT_KEY}`;
	  const CLASS_NAME_FADE = 'fade';
	  const CLASS_NAME_HIDE = 'hide'; // @deprecated - kept here only for backwards compatibility

	  const CLASS_NAME_SHOW = 'show';
	  const CLASS_NAME_SHOWING = 'showing';
	  const DefaultType = {
	    animation: 'boolean',
	    autohide: 'boolean',
	    delay: 'number'
	  };
	  const Default = {
	    animation: true,
	    autohide: true,
	    delay: 5000
	  };
	  /**
	   * ------------------------------------------------------------------------
	   * Class Definition
	   * ------------------------------------------------------------------------
	   */

	  class Toast extends BaseComponent__default.default {
	    constructor(element, config) {
	      super(element);
	      this._config = this._getConfig(config);
	      this._timeout = null;
	      this._hasMouseInteraction = false;
	      this._hasKeyboardInteraction = false;

	      this._setListeners();
	    } // Getters


	    static get DefaultType() {
	      return DefaultType;
	    }

	    static get Default() {
	      return Default;
	    }

	    static get NAME() {
	      return NAME;
	    } // Public


	    show() {
	      const showEvent = EventHandler__default.default.trigger(this._element, EVENT_SHOW);

	      if (showEvent.defaultPrevented) {
	        return;
	      }

	      this._clearTimeout();

	      if (this._config.animation) {
	        this._element.classList.add(CLASS_NAME_FADE);
	      }

	      const complete = () => {
	        this._element.classList.remove(CLASS_NAME_SHOWING);

	        EventHandler__default.default.trigger(this._element, EVENT_SHOWN);

	        this._maybeScheduleHide();
	      };

	      this._element.classList.remove(CLASS_NAME_HIDE); // @deprecated


	      reflow(this._element);

	      this._element.classList.add(CLASS_NAME_SHOW);

	      this._element.classList.add(CLASS_NAME_SHOWING);

	      this._queueCallback(complete, this._element, this._config.animation);
	    }

	    hide() {
	      if (!this._element.classList.contains(CLASS_NAME_SHOW)) {
	        return;
	      }

	      const hideEvent = EventHandler__default.default.trigger(this._element, EVENT_HIDE);

	      if (hideEvent.defaultPrevented) {
	        return;
	      }

	      const complete = () => {
	        this._element.classList.add(CLASS_NAME_HIDE); // @deprecated


	        this._element.classList.remove(CLASS_NAME_SHOWING);

	        this._element.classList.remove(CLASS_NAME_SHOW);

	        EventHandler__default.default.trigger(this._element, EVENT_HIDDEN);
	      };

	      this._element.classList.add(CLASS_NAME_SHOWING);

	      this._queueCallback(complete, this._element, this._config.animation);
	    }

	    dispose() {
	      this._clearTimeout();

	      if (this._element.classList.contains(CLASS_NAME_SHOW)) {
	        this._element.classList.remove(CLASS_NAME_SHOW);
	      }

	      super.dispose();
	    } // Private


	    _getConfig(config) {
	      config = { ...Default,
	        ...Manipulator__default.default.getDataAttributes(this._element),
	        ...(typeof config === 'object' && config ? config : {})
	      };
	      typeCheckConfig(NAME, config, this.constructor.DefaultType);
	      return config;
	    }

	    _maybeScheduleHide() {
	      if (!this._config.autohide) {
	        return;
	      }

	      if (this._hasMouseInteraction || this._hasKeyboardInteraction) {
	        return;
	      }

	      this._timeout = setTimeout(() => {
	        this.hide();
	      }, this._config.delay);
	    }

	    _onInteraction(event, isInteracting) {
	      switch (event.type) {
	        case 'mouseover':
	        case 'mouseout':
	          this._hasMouseInteraction = isInteracting;
	          break;

	        case 'focusin':
	        case 'focusout':
	          this._hasKeyboardInteraction = isInteracting;
	          break;
	      }

	      if (isInteracting) {
	        this._clearTimeout();

	        return;
	      }

	      const nextElement = event.relatedTarget;

	      if (this._element === nextElement || this._element.contains(nextElement)) {
	        return;
	      }

	      this._maybeScheduleHide();
	    }

	    _setListeners() {
	      EventHandler__default.default.on(this._element, EVENT_MOUSEOVER, event => this._onInteraction(event, true));
	      EventHandler__default.default.on(this._element, EVENT_MOUSEOUT, event => this._onInteraction(event, false));
	      EventHandler__default.default.on(this._element, EVENT_FOCUSIN, event => this._onInteraction(event, true));
	      EventHandler__default.default.on(this._element, EVENT_FOCUSOUT, event => this._onInteraction(event, false));
	    }

	    _clearTimeout() {
	      clearTimeout(this._timeout);
	      this._timeout = null;
	    } // Static


	    static jQueryInterface(config) {
	      return this.each(function () {
	        const data = Toast.getOrCreateInstance(this, config);

	        if (typeof config === 'string') {
	          if (typeof data[config] === 'undefined') {
	            throw new TypeError(`No method named "${config}"`);
	          }

	          data[config](this);
	        }
	      });
	    }

	  }

	  enableDismissTrigger(Toast);
	  /**
	   * ------------------------------------------------------------------------
	   * jQuery
	   * ------------------------------------------------------------------------
	   * add .Toast to jQuery only if jQuery is present
	   */

	  defineJQueryPlugin(Toast);

	  return Toast;

	}));

	}(toast$1));

	var toast = toast$1.exports;

	/**
	 * File skip-link-focus-fix.js.
	 *
	 * Helps with accessibility for keyboard only users.
	 *
	 * Learn more: https://git.io/vWdr2
	 */
	(function () {
	  var isWebkit = navigator.userAgent.toLowerCase().indexOf('webkit') > -1,
	      isOpera = navigator.userAgent.toLowerCase().indexOf('opera') > -1,
	      isIe = navigator.userAgent.toLowerCase().indexOf('msie') > -1;

	  if ((isWebkit || isOpera || isIe) && document.getElementById && window.addEventListener) {
	    window.addEventListener('hashchange', function () {
	      var id = location.hash.substring(1),
	          element;

	      if (!/^[A-z0-9_-]+$/.test(id)) {
	        return;
	      }

	      element = document.getElementById(id);

	      if (element) {
	        if (!/^(?:a|select|input|button|textarea)$/i.test(element.tagName)) {
	          element.tabIndex = -1;
	        }

	        element.focus();
	      }
	    }, false);
	  }
	})();

	var __assign=undefined&&undefined.__assign||function(){return (__assign=Object.assign||function(t){for(var i,a=1,n=arguments.length;a<n;a++)for(var s in i=arguments[a])Object.prototype.hasOwnProperty.call(i,s)&&(t[s]=i[s]);return t}).apply(this,arguments)},CountUp=function(){function t(t,i,a){var n=this;this.endVal=i,this.options=a,this.version="2.1.0",this.defaults={startVal:0,decimalPlaces:0,duration:2,useEasing:!0,useGrouping:!0,smartEasingThreshold:999,smartEasingAmount:333,separator:",",decimal:".",prefix:"",suffix:"",enableScrollSpy:!1,scrollSpyDelay:200},this.finalEndVal=null,this.useEasing=!0,this.countDown=!1,this.error="",this.startVal=0,this.paused=!0,this.count=function(t){n.startTime||(n.startTime=t);var i=t-n.startTime;n.remaining=n.duration-i,n.useEasing?n.countDown?n.frameVal=n.startVal-n.easingFn(i,0,n.startVal-n.endVal,n.duration):n.frameVal=n.easingFn(i,n.startVal,n.endVal-n.startVal,n.duration):n.countDown?n.frameVal=n.startVal-(n.startVal-n.endVal)*(i/n.duration):n.frameVal=n.startVal+(n.endVal-n.startVal)*(i/n.duration),n.countDown?n.frameVal=n.frameVal<n.endVal?n.endVal:n.frameVal:n.frameVal=n.frameVal>n.endVal?n.endVal:n.frameVal,n.frameVal=Number(n.frameVal.toFixed(n.options.decimalPlaces)),n.printValue(n.frameVal),i<n.duration?n.rAF=requestAnimationFrame(n.count):null!==n.finalEndVal?n.update(n.finalEndVal):n.callback&&n.callback();},this.formatNumber=function(t){var i,a,s,e,r=t<0?"-":"";i=Math.abs(t).toFixed(n.options.decimalPlaces);var o=(i+="").split(".");if(a=o[0],s=o.length>1?n.options.decimal+o[1]:"",n.options.useGrouping){e="";for(var l=0,h=a.length;l<h;++l)0!==l&&l%3==0&&(e=n.options.separator+e),e=a[h-l-1]+e;a=e;}return n.options.numerals&&n.options.numerals.length&&(a=a.replace(/[0-9]/g,function(t){return n.options.numerals[+t]}),s=s.replace(/[0-9]/g,function(t){return n.options.numerals[+t]})),r+n.options.prefix+a+s+n.options.suffix},this.easeOutExpo=function(t,i,a,n){return a*(1-Math.pow(2,-10*t/n))*1024/1023+i},this.options=__assign(__assign({},this.defaults),a),this.formattingFn=this.options.formattingFn?this.options.formattingFn:this.formatNumber,this.easingFn=this.options.easingFn?this.options.easingFn:this.easeOutExpo,this.startVal=this.validateValue(this.options.startVal),this.frameVal=this.startVal,this.endVal=this.validateValue(i),this.options.decimalPlaces=Math.max(this.options.decimalPlaces),this.resetDuration(),this.options.separator=String(this.options.separator),this.useEasing=this.options.useEasing,""===this.options.separator&&(this.options.useGrouping=!1),this.el="string"==typeof t?document.getElementById(t):t,this.el?this.printValue(this.startVal):this.error="[CountUp] target is null or undefined",void 0!==window&&this.options.enableScrollSpy&&(this.error?console.error(this.error,t):(window.onScrollFns=window.onScrollFns||[],window.onScrollFns.push(function(){return n.handleScroll(n)}),window.onscroll=function(){window.onScrollFns.forEach(function(t){return t()});},this.handleScroll(this)));}return t.prototype.handleScroll=function(t){if(t&&window){var i=window.innerHeight+window.scrollY,a=t.el.offsetTop+t.el.offsetHeight;a<i&&a>window.scrollY&&t.paused?(t.paused=!1,setTimeout(function(){return t.start()},t.options.scrollSpyDelay)):window.scrollY>a&&!t.paused&&t.reset();}},t.prototype.determineDirectionAndSmartEasing=function(){var t=this.finalEndVal?this.finalEndVal:this.endVal;this.countDown=this.startVal>t;var i=t-this.startVal;if(Math.abs(i)>this.options.smartEasingThreshold){this.finalEndVal=t;var a=this.countDown?1:-1;this.endVal=t+a*this.options.smartEasingAmount,this.duration=this.duration/2;}else this.endVal=t,this.finalEndVal=null;this.finalEndVal?this.useEasing=!1:this.useEasing=this.options.useEasing;},t.prototype.start=function(t){this.error||(this.callback=t,this.duration>0?(this.determineDirectionAndSmartEasing(),this.paused=!1,this.rAF=requestAnimationFrame(this.count)):this.printValue(this.endVal));},t.prototype.pauseResume=function(){this.paused?(this.startTime=null,this.duration=this.remaining,this.startVal=this.frameVal,this.determineDirectionAndSmartEasing(),this.rAF=requestAnimationFrame(this.count)):cancelAnimationFrame(this.rAF),this.paused=!this.paused;},t.prototype.reset=function(){cancelAnimationFrame(this.rAF),this.paused=!0,this.resetDuration(),this.startVal=this.validateValue(this.options.startVal),this.frameVal=this.startVal,this.printValue(this.startVal);},t.prototype.update=function(t){cancelAnimationFrame(this.rAF),this.startTime=null,this.endVal=this.validateValue(t),this.endVal!==this.frameVal&&(this.startVal=this.frameVal,this.finalEndVal||this.resetDuration(),this.finalEndVal=null,this.determineDirectionAndSmartEasing(),this.rAF=requestAnimationFrame(this.count));},t.prototype.printValue=function(t){var i=this.formattingFn(t);"INPUT"===this.el.tagName?this.el.value=i:"text"===this.el.tagName||"tspan"===this.el.tagName?this.el.textContent=i:this.el.innerHTML=i;},t.prototype.ensureNumber=function(t){return "number"==typeof t&&!isNaN(t)},t.prototype.validateValue=function(t){var i=Number(t);return this.ensureNumber(i)?i:(this.error="[CountUp] invalid start or end value: "+t,null)},t.prototype.resetDuration=function(){this.startTime=null,this.duration=1e3*Number(this.options.duration),this.remaining=this.duration;},t}();

	/**
	 * lodash (Custom Build) <https://lodash.com/>
	 * Build: `lodash modularize exports="npm" -o ./`
	 * Copyright jQuery Foundation and other contributors <https://jquery.org/>
	 * Released under MIT license <https://lodash.com/license>
	 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
	 * Copyright Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
	 */

	/** Used as the `TypeError` message for "Functions" methods. */
	var FUNC_ERROR_TEXT$1 = 'Expected a function';

	/** Used as references for various `Number` constants. */
	var NAN$1 = 0 / 0;

	/** `Object#toString` result references. */
	var symbolTag$1 = '[object Symbol]';

	/** Used to match leading and trailing whitespace. */
	var reTrim$1 = /^\s+|\s+$/g;

	/** Used to detect bad signed hexadecimal string values. */
	var reIsBadHex$1 = /^[-+]0x[0-9a-f]+$/i;

	/** Used to detect binary string values. */
	var reIsBinary$1 = /^0b[01]+$/i;

	/** Used to detect octal string values. */
	var reIsOctal$1 = /^0o[0-7]+$/i;

	/** Built-in method references without a dependency on `root`. */
	var freeParseInt$1 = parseInt;

	/** Detect free variable `global` from Node.js. */
	var freeGlobal$1 = typeof commonjsGlobal == 'object' && commonjsGlobal && commonjsGlobal.Object === Object && commonjsGlobal;

	/** Detect free variable `self`. */
	var freeSelf$1 = typeof self == 'object' && self && self.Object === Object && self;

	/** Used as a reference to the global object. */
	var root$1 = freeGlobal$1 || freeSelf$1 || Function('return this')();

	/** Used for built-in method references. */
	var objectProto$1 = Object.prototype;

	/**
	 * Used to resolve the
	 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
	 * of values.
	 */
	var objectToString$1 = objectProto$1.toString;

	/* Built-in method references for those with the same name as other `lodash` methods. */
	var nativeMax$1 = Math.max,
	    nativeMin$1 = Math.min;

	/**
	 * Gets the timestamp of the number of milliseconds that have elapsed since
	 * the Unix epoch (1 January 1970 00:00:00 UTC).
	 *
	 * @static
	 * @memberOf _
	 * @since 2.4.0
	 * @category Date
	 * @returns {number} Returns the timestamp.
	 * @example
	 *
	 * _.defer(function(stamp) {
	 *   console.log(_.now() - stamp);
	 * }, _.now());
	 * // => Logs the number of milliseconds it took for the deferred invocation.
	 */
	var now$1 = function() {
	  return root$1.Date.now();
	};

	/**
	 * Creates a debounced function that delays invoking `func` until after `wait`
	 * milliseconds have elapsed since the last time the debounced function was
	 * invoked. The debounced function comes with a `cancel` method to cancel
	 * delayed `func` invocations and a `flush` method to immediately invoke them.
	 * Provide `options` to indicate whether `func` should be invoked on the
	 * leading and/or trailing edge of the `wait` timeout. The `func` is invoked
	 * with the last arguments provided to the debounced function. Subsequent
	 * calls to the debounced function return the result of the last `func`
	 * invocation.
	 *
	 * **Note:** If `leading` and `trailing` options are `true`, `func` is
	 * invoked on the trailing edge of the timeout only if the debounced function
	 * is invoked more than once during the `wait` timeout.
	 *
	 * If `wait` is `0` and `leading` is `false`, `func` invocation is deferred
	 * until to the next tick, similar to `setTimeout` with a timeout of `0`.
	 *
	 * See [David Corbacho's article](https://css-tricks.com/debouncing-throttling-explained-examples/)
	 * for details over the differences between `_.debounce` and `_.throttle`.
	 *
	 * @static
	 * @memberOf _
	 * @since 0.1.0
	 * @category Function
	 * @param {Function} func The function to debounce.
	 * @param {number} [wait=0] The number of milliseconds to delay.
	 * @param {Object} [options={}] The options object.
	 * @param {boolean} [options.leading=false]
	 *  Specify invoking on the leading edge of the timeout.
	 * @param {number} [options.maxWait]
	 *  The maximum time `func` is allowed to be delayed before it's invoked.
	 * @param {boolean} [options.trailing=true]
	 *  Specify invoking on the trailing edge of the timeout.
	 * @returns {Function} Returns the new debounced function.
	 * @example
	 *
	 * // Avoid costly calculations while the window size is in flux.
	 * jQuery(window).on('resize', _.debounce(calculateLayout, 150));
	 *
	 * // Invoke `sendMail` when clicked, debouncing subsequent calls.
	 * jQuery(element).on('click', _.debounce(sendMail, 300, {
	 *   'leading': true,
	 *   'trailing': false
	 * }));
	 *
	 * // Ensure `batchLog` is invoked once after 1 second of debounced calls.
	 * var debounced = _.debounce(batchLog, 250, { 'maxWait': 1000 });
	 * var source = new EventSource('/stream');
	 * jQuery(source).on('message', debounced);
	 *
	 * // Cancel the trailing debounced invocation.
	 * jQuery(window).on('popstate', debounced.cancel);
	 */
	function debounce$1(func, wait, options) {
	  var lastArgs,
	      lastThis,
	      maxWait,
	      result,
	      timerId,
	      lastCallTime,
	      lastInvokeTime = 0,
	      leading = false,
	      maxing = false,
	      trailing = true;

	  if (typeof func != 'function') {
	    throw new TypeError(FUNC_ERROR_TEXT$1);
	  }
	  wait = toNumber$1(wait) || 0;
	  if (isObject$1(options)) {
	    leading = !!options.leading;
	    maxing = 'maxWait' in options;
	    maxWait = maxing ? nativeMax$1(toNumber$1(options.maxWait) || 0, wait) : maxWait;
	    trailing = 'trailing' in options ? !!options.trailing : trailing;
	  }

	  function invokeFunc(time) {
	    var args = lastArgs,
	        thisArg = lastThis;

	    lastArgs = lastThis = undefined;
	    lastInvokeTime = time;
	    result = func.apply(thisArg, args);
	    return result;
	  }

	  function leadingEdge(time) {
	    // Reset any `maxWait` timer.
	    lastInvokeTime = time;
	    // Start the timer for the trailing edge.
	    timerId = setTimeout(timerExpired, wait);
	    // Invoke the leading edge.
	    return leading ? invokeFunc(time) : result;
	  }

	  function remainingWait(time) {
	    var timeSinceLastCall = time - lastCallTime,
	        timeSinceLastInvoke = time - lastInvokeTime,
	        result = wait - timeSinceLastCall;

	    return maxing ? nativeMin$1(result, maxWait - timeSinceLastInvoke) : result;
	  }

	  function shouldInvoke(time) {
	    var timeSinceLastCall = time - lastCallTime,
	        timeSinceLastInvoke = time - lastInvokeTime;

	    // Either this is the first call, activity has stopped and we're at the
	    // trailing edge, the system time has gone backwards and we're treating
	    // it as the trailing edge, or we've hit the `maxWait` limit.
	    return (lastCallTime === undefined || (timeSinceLastCall >= wait) ||
	      (timeSinceLastCall < 0) || (maxing && timeSinceLastInvoke >= maxWait));
	  }

	  function timerExpired() {
	    var time = now$1();
	    if (shouldInvoke(time)) {
	      return trailingEdge(time);
	    }
	    // Restart the timer.
	    timerId = setTimeout(timerExpired, remainingWait(time));
	  }

	  function trailingEdge(time) {
	    timerId = undefined;

	    // Only invoke if we have `lastArgs` which means `func` has been
	    // debounced at least once.
	    if (trailing && lastArgs) {
	      return invokeFunc(time);
	    }
	    lastArgs = lastThis = undefined;
	    return result;
	  }

	  function cancel() {
	    if (timerId !== undefined) {
	      clearTimeout(timerId);
	    }
	    lastInvokeTime = 0;
	    lastArgs = lastCallTime = lastThis = timerId = undefined;
	  }

	  function flush() {
	    return timerId === undefined ? result : trailingEdge(now$1());
	  }

	  function debounced() {
	    var time = now$1(),
	        isInvoking = shouldInvoke(time);

	    lastArgs = arguments;
	    lastThis = this;
	    lastCallTime = time;

	    if (isInvoking) {
	      if (timerId === undefined) {
	        return leadingEdge(lastCallTime);
	      }
	      if (maxing) {
	        // Handle invocations in a tight loop.
	        timerId = setTimeout(timerExpired, wait);
	        return invokeFunc(lastCallTime);
	      }
	    }
	    if (timerId === undefined) {
	      timerId = setTimeout(timerExpired, wait);
	    }
	    return result;
	  }
	  debounced.cancel = cancel;
	  debounced.flush = flush;
	  return debounced;
	}

	/**
	 * Creates a throttled function that only invokes `func` at most once per
	 * every `wait` milliseconds. The throttled function comes with a `cancel`
	 * method to cancel delayed `func` invocations and a `flush` method to
	 * immediately invoke them. Provide `options` to indicate whether `func`
	 * should be invoked on the leading and/or trailing edge of the `wait`
	 * timeout. The `func` is invoked with the last arguments provided to the
	 * throttled function. Subsequent calls to the throttled function return the
	 * result of the last `func` invocation.
	 *
	 * **Note:** If `leading` and `trailing` options are `true`, `func` is
	 * invoked on the trailing edge of the timeout only if the throttled function
	 * is invoked more than once during the `wait` timeout.
	 *
	 * If `wait` is `0` and `leading` is `false`, `func` invocation is deferred
	 * until to the next tick, similar to `setTimeout` with a timeout of `0`.
	 *
	 * See [David Corbacho's article](https://css-tricks.com/debouncing-throttling-explained-examples/)
	 * for details over the differences between `_.throttle` and `_.debounce`.
	 *
	 * @static
	 * @memberOf _
	 * @since 0.1.0
	 * @category Function
	 * @param {Function} func The function to throttle.
	 * @param {number} [wait=0] The number of milliseconds to throttle invocations to.
	 * @param {Object} [options={}] The options object.
	 * @param {boolean} [options.leading=true]
	 *  Specify invoking on the leading edge of the timeout.
	 * @param {boolean} [options.trailing=true]
	 *  Specify invoking on the trailing edge of the timeout.
	 * @returns {Function} Returns the new throttled function.
	 * @example
	 *
	 * // Avoid excessively updating the position while scrolling.
	 * jQuery(window).on('scroll', _.throttle(updatePosition, 100));
	 *
	 * // Invoke `renewToken` when the click event is fired, but not more than once every 5 minutes.
	 * var throttled = _.throttle(renewToken, 300000, { 'trailing': false });
	 * jQuery(element).on('click', throttled);
	 *
	 * // Cancel the trailing throttled invocation.
	 * jQuery(window).on('popstate', throttled.cancel);
	 */
	function throttle(func, wait, options) {
	  var leading = true,
	      trailing = true;

	  if (typeof func != 'function') {
	    throw new TypeError(FUNC_ERROR_TEXT$1);
	  }
	  if (isObject$1(options)) {
	    leading = 'leading' in options ? !!options.leading : leading;
	    trailing = 'trailing' in options ? !!options.trailing : trailing;
	  }
	  return debounce$1(func, wait, {
	    'leading': leading,
	    'maxWait': wait,
	    'trailing': trailing
	  });
	}

	/**
	 * Checks if `value` is the
	 * [language type](http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types)
	 * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
	 *
	 * @static
	 * @memberOf _
	 * @since 0.1.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
	 * @example
	 *
	 * _.isObject({});
	 * // => true
	 *
	 * _.isObject([1, 2, 3]);
	 * // => true
	 *
	 * _.isObject(_.noop);
	 * // => true
	 *
	 * _.isObject(null);
	 * // => false
	 */
	function isObject$1(value) {
	  var type = typeof value;
	  return !!value && (type == 'object' || type == 'function');
	}

	/**
	 * Checks if `value` is object-like. A value is object-like if it's not `null`
	 * and has a `typeof` result of "object".
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
	 * @example
	 *
	 * _.isObjectLike({});
	 * // => true
	 *
	 * _.isObjectLike([1, 2, 3]);
	 * // => true
	 *
	 * _.isObjectLike(_.noop);
	 * // => false
	 *
	 * _.isObjectLike(null);
	 * // => false
	 */
	function isObjectLike$1(value) {
	  return !!value && typeof value == 'object';
	}

	/**
	 * Checks if `value` is classified as a `Symbol` primitive or object.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a symbol, else `false`.
	 * @example
	 *
	 * _.isSymbol(Symbol.iterator);
	 * // => true
	 *
	 * _.isSymbol('abc');
	 * // => false
	 */
	function isSymbol$1(value) {
	  return typeof value == 'symbol' ||
	    (isObjectLike$1(value) && objectToString$1.call(value) == symbolTag$1);
	}

	/**
	 * Converts `value` to a number.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Lang
	 * @param {*} value The value to process.
	 * @returns {number} Returns the number.
	 * @example
	 *
	 * _.toNumber(3.2);
	 * // => 3.2
	 *
	 * _.toNumber(Number.MIN_VALUE);
	 * // => 5e-324
	 *
	 * _.toNumber(Infinity);
	 * // => Infinity
	 *
	 * _.toNumber('3.2');
	 * // => 3.2
	 */
	function toNumber$1(value) {
	  if (typeof value == 'number') {
	    return value;
	  }
	  if (isSymbol$1(value)) {
	    return NAN$1;
	  }
	  if (isObject$1(value)) {
	    var other = typeof value.valueOf == 'function' ? value.valueOf() : value;
	    value = isObject$1(other) ? (other + '') : other;
	  }
	  if (typeof value != 'string') {
	    return value === 0 ? value : +value;
	  }
	  value = value.replace(reTrim$1, '');
	  var isBinary = reIsBinary$1.test(value);
	  return (isBinary || reIsOctal$1.test(value))
	    ? freeParseInt$1(value.slice(2), isBinary ? 2 : 8)
	    : (reIsBadHex$1.test(value) ? NAN$1 : +value);
	}

	var lodash_throttle = throttle;

	/**
	 * lodash (Custom Build) <https://lodash.com/>
	 * Build: `lodash modularize exports="npm" -o ./`
	 * Copyright jQuery Foundation and other contributors <https://jquery.org/>
	 * Released under MIT license <https://lodash.com/license>
	 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
	 * Copyright Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
	 */

	/** Used as the `TypeError` message for "Functions" methods. */
	var FUNC_ERROR_TEXT = 'Expected a function';

	/** Used as references for various `Number` constants. */
	var NAN = 0 / 0;

	/** `Object#toString` result references. */
	var symbolTag = '[object Symbol]';

	/** Used to match leading and trailing whitespace. */
	var reTrim = /^\s+|\s+$/g;

	/** Used to detect bad signed hexadecimal string values. */
	var reIsBadHex = /^[-+]0x[0-9a-f]+$/i;

	/** Used to detect binary string values. */
	var reIsBinary = /^0b[01]+$/i;

	/** Used to detect octal string values. */
	var reIsOctal = /^0o[0-7]+$/i;

	/** Built-in method references without a dependency on `root`. */
	var freeParseInt = parseInt;

	/** Detect free variable `global` from Node.js. */
	var freeGlobal = typeof commonjsGlobal == 'object' && commonjsGlobal && commonjsGlobal.Object === Object && commonjsGlobal;

	/** Detect free variable `self`. */
	var freeSelf = typeof self == 'object' && self && self.Object === Object && self;

	/** Used as a reference to the global object. */
	var root = freeGlobal || freeSelf || Function('return this')();

	/** Used for built-in method references. */
	var objectProto = Object.prototype;

	/**
	 * Used to resolve the
	 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
	 * of values.
	 */
	var objectToString = objectProto.toString;

	/* Built-in method references for those with the same name as other `lodash` methods. */
	var nativeMax = Math.max,
	    nativeMin = Math.min;

	/**
	 * Gets the timestamp of the number of milliseconds that have elapsed since
	 * the Unix epoch (1 January 1970 00:00:00 UTC).
	 *
	 * @static
	 * @memberOf _
	 * @since 2.4.0
	 * @category Date
	 * @returns {number} Returns the timestamp.
	 * @example
	 *
	 * _.defer(function(stamp) {
	 *   console.log(_.now() - stamp);
	 * }, _.now());
	 * // => Logs the number of milliseconds it took for the deferred invocation.
	 */
	var now = function() {
	  return root.Date.now();
	};

	/**
	 * Creates a debounced function that delays invoking `func` until after `wait`
	 * milliseconds have elapsed since the last time the debounced function was
	 * invoked. The debounced function comes with a `cancel` method to cancel
	 * delayed `func` invocations and a `flush` method to immediately invoke them.
	 * Provide `options` to indicate whether `func` should be invoked on the
	 * leading and/or trailing edge of the `wait` timeout. The `func` is invoked
	 * with the last arguments provided to the debounced function. Subsequent
	 * calls to the debounced function return the result of the last `func`
	 * invocation.
	 *
	 * **Note:** If `leading` and `trailing` options are `true`, `func` is
	 * invoked on the trailing edge of the timeout only if the debounced function
	 * is invoked more than once during the `wait` timeout.
	 *
	 * If `wait` is `0` and `leading` is `false`, `func` invocation is deferred
	 * until to the next tick, similar to `setTimeout` with a timeout of `0`.
	 *
	 * See [David Corbacho's article](https://css-tricks.com/debouncing-throttling-explained-examples/)
	 * for details over the differences between `_.debounce` and `_.throttle`.
	 *
	 * @static
	 * @memberOf _
	 * @since 0.1.0
	 * @category Function
	 * @param {Function} func The function to debounce.
	 * @param {number} [wait=0] The number of milliseconds to delay.
	 * @param {Object} [options={}] The options object.
	 * @param {boolean} [options.leading=false]
	 *  Specify invoking on the leading edge of the timeout.
	 * @param {number} [options.maxWait]
	 *  The maximum time `func` is allowed to be delayed before it's invoked.
	 * @param {boolean} [options.trailing=true]
	 *  Specify invoking on the trailing edge of the timeout.
	 * @returns {Function} Returns the new debounced function.
	 * @example
	 *
	 * // Avoid costly calculations while the window size is in flux.
	 * jQuery(window).on('resize', _.debounce(calculateLayout, 150));
	 *
	 * // Invoke `sendMail` when clicked, debouncing subsequent calls.
	 * jQuery(element).on('click', _.debounce(sendMail, 300, {
	 *   'leading': true,
	 *   'trailing': false
	 * }));
	 *
	 * // Ensure `batchLog` is invoked once after 1 second of debounced calls.
	 * var debounced = _.debounce(batchLog, 250, { 'maxWait': 1000 });
	 * var source = new EventSource('/stream');
	 * jQuery(source).on('message', debounced);
	 *
	 * // Cancel the trailing debounced invocation.
	 * jQuery(window).on('popstate', debounced.cancel);
	 */
	function debounce(func, wait, options) {
	  var lastArgs,
	      lastThis,
	      maxWait,
	      result,
	      timerId,
	      lastCallTime,
	      lastInvokeTime = 0,
	      leading = false,
	      maxing = false,
	      trailing = true;

	  if (typeof func != 'function') {
	    throw new TypeError(FUNC_ERROR_TEXT);
	  }
	  wait = toNumber(wait) || 0;
	  if (isObject(options)) {
	    leading = !!options.leading;
	    maxing = 'maxWait' in options;
	    maxWait = maxing ? nativeMax(toNumber(options.maxWait) || 0, wait) : maxWait;
	    trailing = 'trailing' in options ? !!options.trailing : trailing;
	  }

	  function invokeFunc(time) {
	    var args = lastArgs,
	        thisArg = lastThis;

	    lastArgs = lastThis = undefined;
	    lastInvokeTime = time;
	    result = func.apply(thisArg, args);
	    return result;
	  }

	  function leadingEdge(time) {
	    // Reset any `maxWait` timer.
	    lastInvokeTime = time;
	    // Start the timer for the trailing edge.
	    timerId = setTimeout(timerExpired, wait);
	    // Invoke the leading edge.
	    return leading ? invokeFunc(time) : result;
	  }

	  function remainingWait(time) {
	    var timeSinceLastCall = time - lastCallTime,
	        timeSinceLastInvoke = time - lastInvokeTime,
	        result = wait - timeSinceLastCall;

	    return maxing ? nativeMin(result, maxWait - timeSinceLastInvoke) : result;
	  }

	  function shouldInvoke(time) {
	    var timeSinceLastCall = time - lastCallTime,
	        timeSinceLastInvoke = time - lastInvokeTime;

	    // Either this is the first call, activity has stopped and we're at the
	    // trailing edge, the system time has gone backwards and we're treating
	    // it as the trailing edge, or we've hit the `maxWait` limit.
	    return (lastCallTime === undefined || (timeSinceLastCall >= wait) ||
	      (timeSinceLastCall < 0) || (maxing && timeSinceLastInvoke >= maxWait));
	  }

	  function timerExpired() {
	    var time = now();
	    if (shouldInvoke(time)) {
	      return trailingEdge(time);
	    }
	    // Restart the timer.
	    timerId = setTimeout(timerExpired, remainingWait(time));
	  }

	  function trailingEdge(time) {
	    timerId = undefined;

	    // Only invoke if we have `lastArgs` which means `func` has been
	    // debounced at least once.
	    if (trailing && lastArgs) {
	      return invokeFunc(time);
	    }
	    lastArgs = lastThis = undefined;
	    return result;
	  }

	  function cancel() {
	    if (timerId !== undefined) {
	      clearTimeout(timerId);
	    }
	    lastInvokeTime = 0;
	    lastArgs = lastCallTime = lastThis = timerId = undefined;
	  }

	  function flush() {
	    return timerId === undefined ? result : trailingEdge(now());
	  }

	  function debounced() {
	    var time = now(),
	        isInvoking = shouldInvoke(time);

	    lastArgs = arguments;
	    lastThis = this;
	    lastCallTime = time;

	    if (isInvoking) {
	      if (timerId === undefined) {
	        return leadingEdge(lastCallTime);
	      }
	      if (maxing) {
	        // Handle invocations in a tight loop.
	        timerId = setTimeout(timerExpired, wait);
	        return invokeFunc(lastCallTime);
	      }
	    }
	    if (timerId === undefined) {
	      timerId = setTimeout(timerExpired, wait);
	    }
	    return result;
	  }
	  debounced.cancel = cancel;
	  debounced.flush = flush;
	  return debounced;
	}

	/**
	 * Checks if `value` is the
	 * [language type](http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types)
	 * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
	 *
	 * @static
	 * @memberOf _
	 * @since 0.1.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
	 * @example
	 *
	 * _.isObject({});
	 * // => true
	 *
	 * _.isObject([1, 2, 3]);
	 * // => true
	 *
	 * _.isObject(_.noop);
	 * // => true
	 *
	 * _.isObject(null);
	 * // => false
	 */
	function isObject(value) {
	  var type = typeof value;
	  return !!value && (type == 'object' || type == 'function');
	}

	/**
	 * Checks if `value` is object-like. A value is object-like if it's not `null`
	 * and has a `typeof` result of "object".
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
	 * @example
	 *
	 * _.isObjectLike({});
	 * // => true
	 *
	 * _.isObjectLike([1, 2, 3]);
	 * // => true
	 *
	 * _.isObjectLike(_.noop);
	 * // => false
	 *
	 * _.isObjectLike(null);
	 * // => false
	 */
	function isObjectLike(value) {
	  return !!value && typeof value == 'object';
	}

	/**
	 * Checks if `value` is classified as a `Symbol` primitive or object.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a symbol, else `false`.
	 * @example
	 *
	 * _.isSymbol(Symbol.iterator);
	 * // => true
	 *
	 * _.isSymbol('abc');
	 * // => false
	 */
	function isSymbol(value) {
	  return typeof value == 'symbol' ||
	    (isObjectLike(value) && objectToString.call(value) == symbolTag);
	}

	/**
	 * Converts `value` to a number.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Lang
	 * @param {*} value The value to process.
	 * @returns {number} Returns the number.
	 * @example
	 *
	 * _.toNumber(3.2);
	 * // => 3.2
	 *
	 * _.toNumber(Number.MIN_VALUE);
	 * // => 5e-324
	 *
	 * _.toNumber(Infinity);
	 * // => Infinity
	 *
	 * _.toNumber('3.2');
	 * // => 3.2
	 */
	function toNumber(value) {
	  if (typeof value == 'number') {
	    return value;
	  }
	  if (isSymbol(value)) {
	    return NAN;
	  }
	  if (isObject(value)) {
	    var other = typeof value.valueOf == 'function' ? value.valueOf() : value;
	    value = isObject(other) ? (other + '') : other;
	  }
	  if (typeof value != 'string') {
	    return value === 0 ? value : +value;
	  }
	  value = value.replace(reTrim, '');
	  var isBinary = reIsBinary.test(value);
	  return (isBinary || reIsOctal.test(value))
	    ? freeParseInt(value.slice(2), isBinary ? 2 : 8)
	    : (reIsBadHex.test(value) ? NAN : +value);
	}

	var lodash_debounce = debounce;

	var callback = function callback() {};

	function containsAOSNode(nodes) {
	  var i = void 0,
	      currentNode = void 0,
	      result = void 0;

	  for (i = 0; i < nodes.length; i += 1) {
	    currentNode = nodes[i];

	    if (currentNode.dataset && currentNode.dataset.aos) {
	      return true;
	    }

	    result = currentNode.children && containsAOSNode(currentNode.children);

	    if (result) {
	      return true;
	    }
	  }

	  return false;
	}

	function check(mutations) {
	  if (!mutations) return;

	  mutations.forEach(function (mutation) {
	    var addedNodes = Array.prototype.slice.call(mutation.addedNodes);
	    var removedNodes = Array.prototype.slice.call(mutation.removedNodes);
	    var allNodes = addedNodes.concat(removedNodes);

	    if (containsAOSNode(allNodes)) {
	      return callback();
	    }
	  });
	}

	function getMutationObserver() {
	  return window.MutationObserver || window.WebKitMutationObserver || window.MozMutationObserver;
	}

	function isSupported() {
	  return !!getMutationObserver();
	}

	function ready(selector, fn) {
	  var doc = window.document;
	  var MutationObserver = getMutationObserver();

	  var observer = new MutationObserver(check);
	  callback = fn;

	  observer.observe(doc.documentElement, {
	    childList: true,
	    subtree: true,
	    removedNodes: true
	  });
	}

	var observer = { isSupported: isSupported, ready: ready };

	var classCallCheck = function (instance, Constructor) {
	  if (!(instance instanceof Constructor)) {
	    throw new TypeError("Cannot call a class as a function");
	  }
	};

	var createClass = function () {
	  function defineProperties(target, props) {
	    for (var i = 0; i < props.length; i++) {
	      var descriptor = props[i];
	      descriptor.enumerable = descriptor.enumerable || false;
	      descriptor.configurable = true;
	      if ("value" in descriptor) descriptor.writable = true;
	      Object.defineProperty(target, descriptor.key, descriptor);
	    }
	  }

	  return function (Constructor, protoProps, staticProps) {
	    if (protoProps) defineProperties(Constructor.prototype, protoProps);
	    if (staticProps) defineProperties(Constructor, staticProps);
	    return Constructor;
	  };
	}();

	var _extends = Object.assign || function (target) {
	  for (var i = 1; i < arguments.length; i++) {
	    var source = arguments[i];

	    for (var key in source) {
	      if (Object.prototype.hasOwnProperty.call(source, key)) {
	        target[key] = source[key];
	      }
	    }
	  }

	  return target;
	};

	/**
	 * Device detector
	 */

	var fullNameRe = /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i;
	var prefixRe = /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i;
	var fullNameMobileRe = /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i;
	var prefixMobileRe = /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i;

	function ua() {
	  return navigator.userAgent || navigator.vendor || window.opera || '';
	}

	var Detector = function () {
	  function Detector() {
	    classCallCheck(this, Detector);
	  }

	  createClass(Detector, [{
	    key: 'phone',
	    value: function phone() {
	      var a = ua();
	      return !!(fullNameRe.test(a) || prefixRe.test(a.substr(0, 4)));
	    }
	  }, {
	    key: 'mobile',
	    value: function mobile() {
	      var a = ua();
	      return !!(fullNameMobileRe.test(a) || prefixMobileRe.test(a.substr(0, 4)));
	    }
	  }, {
	    key: 'tablet',
	    value: function tablet() {
	      return this.mobile() && !this.phone();
	    }

	    // http://browserhacks.com/#hack-acea075d0ac6954f275a70023906050c

	  }, {
	    key: 'ie11',
	    value: function ie11() {
	      return '-ms-scroll-limit' in document.documentElement.style && '-ms-ime-align' in document.documentElement.style;
	    }
	  }]);
	  return Detector;
	}();

	var detect = new Detector();

	/**
	 * Adds multiple classes on node
	 * @param {DOMNode} node
	 * @param {array}  classes
	 */
	var addClasses = function addClasses(node, classes) {
	  return classes && classes.forEach(function (className) {
	    return node.classList.add(className);
	  });
	};

	/**
	 * Removes multiple classes from node
	 * @param {DOMNode} node
	 * @param {array}  classes
	 */
	var removeClasses = function removeClasses(node, classes) {
	  return classes && classes.forEach(function (className) {
	    return node.classList.remove(className);
	  });
	};

	var fireEvent = function fireEvent(eventName, data) {
	  var customEvent = void 0;

	  if (detect.ie11()) {
	    customEvent = document.createEvent('CustomEvent');
	    customEvent.initCustomEvent(eventName, true, true, { detail: data });
	  } else {
	    customEvent = new CustomEvent(eventName, {
	      detail: data
	    });
	  }

	  return document.dispatchEvent(customEvent);
	};

	/**
	 * Set or remove aos-animate class
	 * @param {node} el         element
	 * @param {int}  top        scrolled distance
	 */
	var applyClasses = function applyClasses(el, top) {
	  var options = el.options,
	      position = el.position,
	      node = el.node;
	      el.data;


	  var hide = function hide() {
	    if (!el.animated) return;

	    removeClasses(node, options.animatedClassNames);
	    fireEvent('aos:out', node);

	    if (el.options.id) {
	      fireEvent('aos:in:' + el.options.id, node);
	    }

	    el.animated = false;
	  };

	  var show = function show() {
	    if (el.animated) return;

	    addClasses(node, options.animatedClassNames);

	    fireEvent('aos:in', node);
	    if (el.options.id) {
	      fireEvent('aos:in:' + el.options.id, node);
	    }

	    el.animated = true;
	  };

	  if (options.mirror && top >= position.out && !options.once) {
	    hide();
	  } else if (top >= position.in) {
	    show();
	  } else if (el.animated && !options.once) {
	    hide();
	  }
	};

	/**
	 * Scroll logic - add or remove 'aos-animate' class on scroll
	 *
	 * @param  {array} $elements         array of elements nodes
	 * @return {void}
	 */
	var handleScroll = function handleScroll($elements) {
	  return $elements.forEach(function (el, i) {
	    return applyClasses(el, window.pageYOffset);
	  });
	};

	/**
	 * Get offset of DOM element
	 * like there were no transforms applied on it
	 *
	 * @param  {Node} el [DOM element]
	 * @return {Object} [top and left offset]
	 */
	var offset = function offset(el) {
	  var _x = 0;
	  var _y = 0;

	  while (el && !isNaN(el.offsetLeft) && !isNaN(el.offsetTop)) {
	    _x += el.offsetLeft - (el.tagName != 'BODY' ? el.scrollLeft : 0);
	    _y += el.offsetTop - (el.tagName != 'BODY' ? el.scrollTop : 0);
	    el = el.offsetParent;
	  }

	  return {
	    top: _y,
	    left: _x
	  };
	};

	/**
	 * Get inline option with a fallback.
	 *
	 * @param  {Node} el [Dom element]
	 * @param  {String} key [Option key]
	 * @param  {String} fallback [Default (fallback) value]
	 * @return {Mixed} [Option set with inline attributes or fallback value if not set]
	 */

	var getInlineOption = (function (el, key, fallback) {
	  var attr = el.getAttribute('data-aos-' + key);

	  if (typeof attr !== 'undefined') {
	    if (attr === 'true') {
	      return true;
	    } else if (attr === 'false') {
	      return false;
	    }
	  }

	  return attr || fallback;
	});

	/**
	 * Calculate offset
	 * basing on element's settings like:
	 * - anchor
	 * - offset
	 *
	 * @param  {Node} el [Dom element]
	 * @return {Integer} [Final offset that will be used to trigger animation in good position]
	 */

	var getPositionIn = function getPositionIn(el, defaultOffset, defaultAnchorPlacement) {
	  var windowHeight = window.innerHeight;
	  var anchor = getInlineOption(el, 'anchor');
	  var inlineAnchorPlacement = getInlineOption(el, 'anchor-placement');
	  var additionalOffset = Number(getInlineOption(el, 'offset', inlineAnchorPlacement ? 0 : defaultOffset));
	  var anchorPlacement = inlineAnchorPlacement || defaultAnchorPlacement;
	  var finalEl = el;

	  if (anchor && document.querySelectorAll(anchor)) {
	    finalEl = document.querySelectorAll(anchor)[0];
	  }

	  var triggerPoint = offset(finalEl).top - windowHeight;

	  switch (anchorPlacement) {
	    case 'top-bottom':
	      // Default offset
	      break;
	    case 'center-bottom':
	      triggerPoint += finalEl.offsetHeight / 2;
	      break;
	    case 'bottom-bottom':
	      triggerPoint += finalEl.offsetHeight;
	      break;
	    case 'top-center':
	      triggerPoint += windowHeight / 2;
	      break;
	    case 'center-center':
	      triggerPoint += windowHeight / 2 + finalEl.offsetHeight / 2;
	      break;
	    case 'bottom-center':
	      triggerPoint += windowHeight / 2 + finalEl.offsetHeight;
	      break;
	    case 'top-top':
	      triggerPoint += windowHeight;
	      break;
	    case 'bottom-top':
	      triggerPoint += windowHeight + finalEl.offsetHeight;
	      break;
	    case 'center-top':
	      triggerPoint += windowHeight + finalEl.offsetHeight / 2;
	      break;
	  }

	  return triggerPoint + additionalOffset;
	};

	var getPositionOut = function getPositionOut(el, defaultOffset) {
	  var anchor = getInlineOption(el, 'anchor');
	  var additionalOffset = getInlineOption(el, 'offset', defaultOffset);
	  var finalEl = el;

	  if (anchor && document.querySelectorAll(anchor)) {
	    finalEl = document.querySelectorAll(anchor)[0];
	  }

	  var elementOffsetTop = offset(finalEl).top;

	  return elementOffsetTop + finalEl.offsetHeight - additionalOffset;
	};

	/* Clearing variables */

	var prepare = function prepare($elements, options) {
	  $elements.forEach(function (el, i) {
	    var mirror = getInlineOption(el.node, 'mirror', options.mirror);
	    var once = getInlineOption(el.node, 'once', options.once);
	    var id = getInlineOption(el.node, 'id');
	    var customClassNames = options.useClassNames && el.node.getAttribute('data-aos');

	    var animatedClassNames = [options.animatedClassName].concat(customClassNames ? customClassNames.split(' ') : []).filter(function (className) {
	      return typeof className === 'string';
	    });

	    if (options.initClassName) {
	      el.node.classList.add(options.initClassName);
	    }

	    el.position = {
	      in: getPositionIn(el.node, options.offset, options.anchorPlacement),
	      out: mirror && getPositionOut(el.node, options.offset)
	    };

	    el.options = {
	      once: once,
	      mirror: mirror,
	      animatedClassNames: animatedClassNames,
	      id: id
	    };
	  });

	  return $elements;
	};

	/**
	 * Generate initial array with elements as objects
	 * This array will be extended later with elements attributes values
	 * like 'position'
	 */
	var elements = (function () {
	  var elements = document.querySelectorAll('[data-aos]');
	  return Array.prototype.map.call(elements, function (node) {
	    return { node: node };
	  });
	});

	/**
	 * *******************************************************
	 * AOS (Animate on scroll) - wowjs alternative
	 * made to animate elements on scroll in both directions
	 * *******************************************************
	 */

	/**
	 * Private variables
	 */
	var $aosElements = [];
	var initialized = false;

	/**
	 * Default options
	 */
	var options = {
	  offset: 120,
	  delay: 0,
	  easing: 'ease',
	  duration: 400,
	  disable: false,
	  once: false,
	  mirror: false,
	  anchorPlacement: 'top-bottom',
	  startEvent: 'DOMContentLoaded',
	  animatedClassName: 'aos-animate',
	  initClassName: 'aos-init',
	  useClassNames: false,
	  disableMutationObserver: false,
	  throttleDelay: 99,
	  debounceDelay: 50
	};

	// Detect not supported browsers (<=IE9)
	// http://browserhacks.com/#hack-e71d8692f65334173fee715c222cb805
	var isBrowserNotSupported = function isBrowserNotSupported() {
	  return document.all && !window.atob;
	};

	var initializeScroll = function initializeScroll() {
	  // Extend elements objects in $aosElements with their positions
	  $aosElements = prepare($aosElements, options);
	  // Perform scroll event, to refresh view and show/hide elements
	  handleScroll($aosElements);

	  /**
	   * Handle scroll event to animate elements on scroll
	   */
	  window.addEventListener('scroll', lodash_throttle(function () {
	    handleScroll($aosElements, options.once);
	  }, options.throttleDelay));

	  return $aosElements;
	};

	/**
	 * Refresh AOS
	 */
	var refresh = function refresh() {
	  var initialize = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

	  // Allow refresh only when it was first initialized on startEvent
	  if (initialize) initialized = true;
	  if (initialized) initializeScroll();
	};

	/**
	 * Hard refresh
	 * create array with new elements and trigger refresh
	 */
	var refreshHard = function refreshHard() {
	  $aosElements = elements();

	  if (isDisabled(options.disable) || isBrowserNotSupported()) {
	    return disable();
	  }

	  refresh();
	};

	/**
	 * Disable AOS
	 * Remove all attributes to reset applied styles
	 */
	var disable = function disable() {
	  $aosElements.forEach(function (el, i) {
	    el.node.removeAttribute('data-aos');
	    el.node.removeAttribute('data-aos-easing');
	    el.node.removeAttribute('data-aos-duration');
	    el.node.removeAttribute('data-aos-delay');

	    if (options.initClassName) {
	      el.node.classList.remove(options.initClassName);
	    }

	    if (options.animatedClassName) {
	      el.node.classList.remove(options.animatedClassName);
	    }
	  });
	};

	/**
	 * Check if AOS should be disabled based on provided setting
	 */
	var isDisabled = function isDisabled(optionDisable) {
	  return optionDisable === true || optionDisable === 'mobile' && detect.mobile() || optionDisable === 'phone' && detect.phone() || optionDisable === 'tablet' && detect.tablet() || typeof optionDisable === 'function' && optionDisable() === true;
	};

	/**
	 * Initializing AOS
	 * - Create options merging defaults with user defined options
	 * - Set attributes on <body> as global setting - css relies on it
	 * - Attach preparing elements to options.startEvent,
	 *   window resize and orientation change
	 * - Attach function that handle scroll and everything connected to it
	 *   to window scroll event and fire once document is ready to set initial state
	 */
	var init = function init(settings) {
	  options = _extends(options, settings);

	  // Create initial array with elements -> to be fullfilled later with prepare()
	  $aosElements = elements();

	  /**
	   * Disable mutation observing if not supported
	   */
	  if (!options.disableMutationObserver && !observer.isSupported()) {
	    console.info('\n      aos: MutationObserver is not supported on this browser,\n      code mutations observing has been disabled.\n      You may have to call "refreshHard()" by yourself.\n    ');
	    options.disableMutationObserver = true;
	  }

	  /**
	   * Observe [aos] elements
	   * If something is loaded by AJAX
	   * it'll refresh plugin automatically
	   */
	  if (!options.disableMutationObserver) {
	    observer.ready('[data-aos]', refreshHard);
	  }

	  /**
	   * Don't init plugin if option `disable` is set
	   * or when browser is not supported
	   */
	  if (isDisabled(options.disable) || isBrowserNotSupported()) {
	    return disable();
	  }

	  /**
	   * Set global settings on body, based on options
	   * so CSS can use it
	   */
	  document.querySelector('body').setAttribute('data-aos-easing', options.easing);

	  document.querySelector('body').setAttribute('data-aos-duration', options.duration);

	  document.querySelector('body').setAttribute('data-aos-delay', options.delay);

	  /**
	   * Handle initializing
	   */
	  if (['DOMContentLoaded', 'load'].indexOf(options.startEvent) === -1) {
	    // Listen to options.startEvent and initialize AOS
	    document.addEventListener(options.startEvent, function () {
	      refresh(true);
	    });
	  } else {
	    window.addEventListener('load', function () {
	      refresh(true);
	    });
	  }

	  if (options.startEvent === 'DOMContentLoaded' && ['complete', 'interactive'].indexOf(document.readyState) > -1) {
	    // Initialize AOS if default startEvent was already fired
	    refresh(true);
	  }

	  /**
	   * Refresh plugin on window resize or orientation change
	   */
	  window.addEventListener('resize', lodash_debounce(refresh, options.debounceDelay, true));

	  window.addEventListener('orientationchange', lodash_debounce(refresh, options.debounceDelay, true));

	  return $aosElements;
	};

	/**
	 * Export Public API
	 */

	var aos = {
	  init: init,
	  refresh: refresh,
	  refreshHard: refreshHard
	};

	aos.init({
	  once: true,
	  duration: 1000
	});

	(function ($) {
	  $(document).ready(function () {
	    new Swiper__default["default"]('.swiper-main', {
	      cssMode: true,
	      mousewheel: true
	    });
	    new Swiper__default["default"]('.swiper-products', {
	      autoplay: false,
	      grabCursor: true,
	      mousewheel: false,
	      slidesPerView: "auto",
	      spaceBetween: 15,
	      navigation: {
	        nextEl: '.swiper-button-next',
	        prevEl: '.swiper-button-prev'
	      }
	    });
	    new Swiper__default["default"]('.swiper-data', {
	      cssMode: true,
	      mousewheel: true,
	      slidesPerView: "auto",
	      spaceBetween: 15
	    });
	    new Swiper__default["default"]('.swiper-gallery', {
	      autoplay: true,
	      grabCursor: true,
	      mousewheel: false,
	      slidesPerView: "auto",
	      spaceBetween: 15
	    });
	    new Swiper__default["default"]('.swiper-gallery-2', {
	      autoplay: true,
	      grabCursor: true,
	      mousewheel: false,
	      slidesPerView: "auto",
	      spaceBetween: 15
	    });
	    const data1 = new CountUp('data-1', 275631, {
	      startVal: 100000,
	      duration: 25
	    });
	    const data2 = new CountUp('data-2', 9022706, {
	      startVal: 100000,
	      duration: 25
	    });
	    const data3 = new CountUp('data-3', 6597655, {
	      startVal: 100000,
	      duration: 25
	    });
	    const data4 = new CountUp('data-4', 35663, {
	      startVal: 50000,
	      duration: 25
	    }); // const data5 = new CountUp('data-5', 15, { startVal: 0 });

	    const data6 = new CountUp('data-6', 80, {
	      startVal: 0,
	      duration: 25
	    });
	    const data7 = new CountUp('data-7', 4, {
	      startVal: 0,
	      duration: 25
	    });
	    document.addEventListener('aos:in:randomize', () => {
	      data1.start();
	      data2.start();
	      data3.start();
	      data4.start(); // data5.start();

	      data6.start();
	      data7.start();
	    }); // Simular impacto

	    $('#products');
	    $('#frequency');
	    const simulaData1 = new CountUp('simulaData1', 0, {
	      startVal: 0
	    });
	    const simulaData2 = new CountUp('simulaData2', 0, {
	      startVal: 0,
	      suffix: 'gr'
	    });
	    const simulaData3 = new CountUp('simulaData3', 0, {
	      startVal: 0,
	      suffix: 'gr'
	    });
	    simulaData1.start();
	    simulaData2.start();
	    simulaData3.start();
	    let productVal = '0';
	    let frequencyVal = '0';
	    $('#products').on('change', function () {
	      productVal = $('#products option').filter(':selected').val();
	      if (this.value === '0' && frequencyVal === '0') return;

	      if (frequencyVal === '1') {
	        switch (this.value) {
	          case '1':
	            simulaData1.update(23);
	            simulaData2.update(23 * 152);
	            simulaData3.update(23 * 465);
	            break;

	          case '2':
	            simulaData1.update(23);
	            simulaData2.update(23 * 49);
	            simulaData3.update(23 * 143);
	            break;

	          case '3':
	            simulaData1.update(23);
	            simulaData2.update(23 * 48);
	            simulaData3.update(23 * 231);
	            break;

	          case '4':
	            simulaData1.update(23);
	            simulaData2.update(23 * 44);
	            simulaData3.update(23 * 151);
	            break;

	          case '5':
	            simulaData1.update(23);
	            simulaData2.update(23 * 52);
	            simulaData3.update(23 * 151);
	            break;

	          case '6':
	            simulaData1.update(23);
	            simulaData2.update(23 * 345);
	            simulaData3.update(23 * 1141);
	            break;

	          default:
	            simulaData1.update(0);
	            break;
	        }
	      }

	      if (frequencyVal === '2') {
	        switch (this.value) {
	          case '1':
	            simulaData1.update(11);
	            simulaData2.update(11 * 152);
	            simulaData3.update(11 * 465);
	            break;

	          case '2':
	            simulaData1.update(11);
	            simulaData2.update(11 * 49);
	            simulaData3.update(11 * 143);
	            break;

	          case '3':
	            simulaData1.update(11);
	            simulaData2.update(11 * 48);
	            simulaData3.update(11 * 231);
	            break;

	          case '4':
	            simulaData1.update(11);
	            simulaData2.update(11 * 44);
	            simulaData3.update(11 * 151);
	            break;

	          case '5':
	            simulaData1.update(11);
	            simulaData2.update(11 * 52);
	            simulaData3.update(11 * 151);
	            break;

	          case '6':
	            simulaData1.update(11);
	            simulaData2.update(11 * 345);
	            simulaData3.update(11 * 1141);
	            break;

	          default:
	            simulaData1.update(0);
	            break;
	        }
	      }

	      if (frequencyVal === '3') {
	        switch (this.value) {
	          case '1':
	            simulaData1.update(5);
	            simulaData2.update(5 * 152);
	            simulaData3.update(5 * 465);
	            break;

	          case '2':
	            simulaData1.update(5);
	            simulaData2.update(5 * 143);
	            simulaData3.update(5 * 143);
	            break;

	          case '3':
	            simulaData1.update(5);
	            simulaData2.update(5 * 48);
	            simulaData3.update(5 * 231);
	            break;

	          case '4':
	            simulaData1.update(5);
	            simulaData2.update(5 * 44);
	            simulaData3.update(5 * 151);
	            break;

	          case '5':
	            simulaData1.update(5);
	            simulaData2.update(5 * 52);
	            simulaData3.update(5 * 151);
	            break;

	          case '6':
	            simulaData1.update(5);
	            simulaData2.update(5 * 345);
	            simulaData3.update(5 * 1141);
	            break;

	          default:
	            simulaData1.update(0);
	            break;
	        }
	      }

	      if (frequencyVal === '4') {
	        switch (this.value) {
	          case '1':
	            simulaData1.update(3);
	            simulaData2.update(3 * 152);
	            simulaData3.update(3 * 465);
	            break;

	          case '2':
	            simulaData1.update(3);
	            simulaData2.update(3 * 49);
	            simulaData3.update(3 * 143);
	            break;

	          case '3':
	            simulaData1.update(3);
	            simulaData2.update(3 * 48);
	            simulaData3.update(3 * 231);
	            break;

	          case '4':
	            simulaData1.update(3);
	            simulaData2.update(3 * 44);
	            simulaData3.update(3 * 151);
	            break;

	          case '5':
	            simulaData1.update(3);
	            simulaData2.update(3 * 52);
	            simulaData3.update(3 * 151);
	            break;

	          case '6':
	            simulaData1.update(3);
	            simulaData2.update(3 * 345);
	            simulaData3.update(3 * 1141);
	            break;

	          default:
	            simulaData1.update(0);
	            break;
	        }
	      }

	      if (frequencyVal === '5') {
	        switch (this.value) {
	          case '1':
	            simulaData1.update(1);
	            simulaData2.update(1 * 152);
	            simulaData3.update(1 * 465);
	            break;

	          case '2':
	            simulaData1.update(1);
	            simulaData2.update(1 * 49);
	            simulaData3.update(1 * 143);
	            break;

	          case '3':
	            simulaData1.update(1);
	            simulaData2.update(1 * 48);
	            simulaData3.update(1 * 231);
	            break;

	          case '4':
	            simulaData1.update(1);
	            simulaData2.update(1 * 44);
	            simulaData3.update(1 * 151);
	            break;

	          case '5':
	            simulaData1.update(1);
	            simulaData2.update(1 * 52);
	            simulaData3.update(1 * 151);
	            break;

	          case '6':
	            simulaData1.update(1);
	            simulaData2.update(1 * 345);
	            simulaData3.update(1 * 1141);
	            break;

	          default:
	            simulaData1.update(0);
	            break;
	        }
	      }
	    });
	    $('#frequency').on('change', function () {
	      frequencyVal = $('#frequency option').filter(':selected').val();
	      if (this.value === '0' && productVal === '0') return;

	      if (productVal === '1') {
	        switch (this.value) {
	          case '1':
	            simulaData1.update(23);
	            simulaData2.update(23 * 152);
	            simulaData3.update(23 * 465);
	            break;

	          case '2':
	            simulaData1.update(11);
	            simulaData2.update(11 * 152);
	            simulaData3.update(11 * 465);
	            break;

	          case '3':
	            simulaData1.update(5);
	            simulaData2.update(5 * 152);
	            simulaData3.update(5 * 465);
	            break;

	          case '4':
	            simulaData1.update(3);
	            simulaData2.update(3 * 152);
	            simulaData3.update(3 * 465);
	            break;

	          case '5':
	            simulaData1.update(1);
	            simulaData2.update(1 * 152);
	            simulaData3.update(1 * 465);
	            break;

	          default:
	            simulaData1.update(0);
	            break;
	        }
	      }

	      if (productVal === '2') {
	        switch (this.value) {
	          case '1':
	            simulaData1.update(23);
	            simulaData2.update(23 * 49);
	            simulaData3.update(23 * 143);
	            break;

	          case '2':
	            simulaData1.update(11);
	            simulaData2.update(11 * 49);
	            simulaData3.update(11 * 143);
	            break;

	          case '3':
	            simulaData1.update(5);
	            simulaData2.update(5 * 49);
	            simulaData3.update(5 * 143);
	            break;

	          case '4':
	            simulaData1.update(3);
	            simulaData2.update(3 * 49);
	            simulaData3.update(3 * 143);
	            break;

	          case '5':
	            simulaData1.update(1);
	            simulaData2.update(1 * 49);
	            simulaData3.update(1 * 143);
	            break;

	          default:
	            simulaData1.update(0);
	            break;
	        }
	      }

	      if (productVal === '3') {
	        switch (this.value) {
	          case '1':
	            simulaData1.update(23);
	            simulaData2.update(23 * 48);
	            simulaData3.update(23 * 231);
	            break;

	          case '2':
	            simulaData1.update(11);
	            simulaData2.update(11 * 48);
	            simulaData3.update(11 * 231);
	            break;

	          case '3':
	            simulaData1.update(5);
	            simulaData2.update(5 * 48);
	            simulaData3.update(5 * 231);
	            break;

	          case '4':
	            simulaData1.update(3);
	            simulaData2.update(3 * 48);
	            simulaData3.update(3 * 231);
	            break;

	          case '5':
	            simulaData1.update(1);
	            simulaData2.update(1 * 48);
	            simulaData3.update(1 * 231);
	            break;

	          default:
	            simulaData1.update(0);
	            break;
	        }
	      }

	      if (productVal === '4') {
	        switch (this.value) {
	          case '1':
	            simulaData1.update(23);
	            simulaData2.update(23 * 44);
	            simulaData3.update(23 * 151);
	            break;

	          case '2':
	            simulaData1.update(11);
	            simulaData2.update(11 * 44);
	            simulaData3.update(11 * 151);
	            break;

	          case '3':
	            simulaData1.update(5);
	            simulaData2.update(5 * 44);
	            simulaData3.update(5 * 151);
	            break;

	          case '4':
	            simulaData1.update(3);
	            simulaData2.update(3 * 44);
	            simulaData3.update(3 * 151);
	            break;

	          case '5':
	            simulaData1.update(1);
	            simulaData2.update(1 * 44);
	            simulaData3.update(1 * 151);
	            break;

	          default:
	            simulaData1.update(0);
	            break;
	        }
	      }

	      if (productVal === '5') {
	        switch (this.value) {
	          case '1':
	            simulaData1.update(23);
	            simulaData2.update(23 * 52);
	            simulaData3.update(23 * 151);
	            break;

	          case '2':
	            simulaData1.update(11);
	            simulaData2.update(11 * 52);
	            simulaData3.update(11 * 151);
	            break;

	          case '3':
	            simulaData1.update(5);
	            simulaData2.update(5 * 52);
	            simulaData3.update(5 * 151);
	            break;

	          case '4':
	            simulaData1.update(3);
	            simulaData2.update(3 * 52);
	            simulaData3.update(3 * 151);
	            break;

	          case '5':
	            simulaData1.update(1);
	            simulaData2.update(1 * 52);
	            simulaData3.update(1 * 151);
	            break;

	          default:
	            simulaData1.update(0);
	            break;
	        }
	      }

	      if (productVal === '6') {
	        switch (this.value) {
	          case '1':
	            simulaData1.update(23);
	            simulaData2.update(23 * 345);
	            simulaData3.update(23 * 1141);
	            break;

	          case '2':
	            simulaData1.update(11);
	            simulaData2.update(11 * 345);
	            simulaData3.update(11 * 1141);
	            break;

	          case '3':
	            simulaData1.update(5);
	            simulaData2.update(5 * 345);
	            simulaData3.update(5 * 1141);
	            break;

	          case '4':
	            simulaData1.update(3);
	            simulaData2.update(3 * 345);
	            simulaData3.update(3 * 1141);
	            break;

	          case '5':
	            simulaData1.update(1);
	            simulaData2.update(1 * 345);
	            simulaData3.update(1 * 1141);
	            break;

	          default:
	            simulaData1.update(0);
	            break;
	        }
	      }
	    });
	    const swiperVertical = new Swiper__default["default"]('.swiper-v', {
	      direction: "vertical",
	      allowTouchMove: false,
	      pagination: {
	        el: ".swiper-pagination",
	        clickable: false
	      }
	    });
	    const sectionH = $('.section').height() / 2;
	    const firstBlock = $('#block-1');
	    const secondBlock = $('#block-2');
	    const thirdBlock = $('#block-3');
	    let slideIndex = $('#slide-idx').text('01');
	    const firstBlockTopDistance = firstBlock?.offset()?.top;
	    const secondBlockTopDistance = secondBlock?.offset()?.top;
	    const thirdBlockTopDistance = thirdBlock?.offset()?.top;
	    const $window = $(window);
	    const vSlider = $('#v-slider');
	    let allBullets = $('.pagerline').find('.bullet');
	    $window.scroll(function () {
	      if ($(window).scrollTop() >= firstBlockTopDistance && $(window).scrollTop() < thirdBlockTopDistance) {
	        vSlider.addClass('active fixed');
	      } else if ($(window).scrollTop() >= thirdBlockTopDistance || $(window).scrollTop() < firstBlockTopDistance) {
	        vSlider.removeClass('active fixed');
	      }

	      if ($(window).scrollTop() >= thirdBlockTopDistance) {
	        vSlider.addClass('bottom');
	      } else {
	        vSlider.removeClass('bottom');
	      }

	      if ($(window).scrollTop() >= firstBlockTopDistance - sectionH && $(window).scrollTop() < secondBlockTopDistance - sectionH) {
	        slideIndex.text('01');
	        swiperVertical.slideTo(0, 500);
	        allBullets[0].classList.add('active');
	        allBullets[1].classList.remove('active');
	      }

	      if ($(window).scrollTop() >= secondBlockTopDistance - sectionH && $(window).scrollTop() <= thirdBlockTopDistance - sectionH) {
	        slideIndex.text('02');
	        swiperVertical.slideTo(1, 500);
	        allBullets[1].classList.add('active');
	        allBullets[2].classList.remove('active');
	      }

	      if ($(window).scrollTop() >= thirdBlockTopDistance - sectionH) {
	        slideIndex.text('03');
	        swiperVertical.slideTo(2, 500);
	        allBullets[2].classList.add('active');
	      }
	    });
	  });
	})(jQuery);

	(function ($) {
	  const subject1 = $('#subject-1');
	  const subject2 = $('#subject-2');
	  const subject3 = $('#subject-3');
	  const subject4 = $('#subject-4');
	  subject1.click(function () {
	    $('#change-image').attr('src', 'http://localhost:8888/prosa.cl.algramo/wp-content/themes/understrap-child/images/gif/postular.gif');
	  });
	  subject2.click(function () {
	    $('#change-image').attr('src', 'http://localhost:8888/prosa.cl.algramo/wp-content/themes/understrap-child/images/gif/colaborar.gif');
	  });
	  subject3.click(function () {
	    $('#change-image').attr('src', 'http://localhost:8888/prosa.cl.algramo/wp-content/themes/understrap-child/images/gif/comprar.gif');
	  });
	  subject4.click(function () {
	    $('#change-image').attr('src', 'http://localhost:8888/prosa.cl.algramo/wp-content/themes/understrap-child/images/gif/molestar.gif');
	  });
	  subject4.attr('tabindex', -1);
	  $(".text-selector").click(function () {
	    $(".text-selector").removeClass("active");
	    $(this).addClass("active");
	    $("#subject").val($(this).data('val')).trigger('change');
	  });
	})(jQuery);

	const changeLanguage = lang => {
	  let url = lang;

	  if (url) {
	    // require a URL
	    window.location = url; // redirect
	  }

	  return false;
	};

	var x, i, j, l, ll, selElmnt, a, b, c;
	/*look for any elements with the class "custom-select":*/

	x = document.getElementsByClassName("custom-select");
	l = x.length;

	for (i = 0; i < l; i++) {
	  selElmnt = x[i].getElementsByTagName("select")[0];
	  ll = selElmnt.length;
	  /*for each element, create a new DIV that will act as the selected item:*/

	  a = document.createElement("DIV");
	  a.setAttribute("class", "select-selected");
	  a.innerHTML = selElmnt.options[selElmnt.selectedIndex].innerHTML;
	  x[i].appendChild(a);
	  /*for each element, create a new DIV that will contain the option list:*/

	  b = document.createElement("DIV");
	  b.setAttribute("class", "select-items select-hide");

	  for (j = 1; j < ll; j++) {
	    /*for each option in the original select element,
	    create a new DIV that will act as an option item:*/
	    c = document.createElement("DIV");
	    c.innerHTML = selElmnt.options[j].innerHTML;
	    c.addEventListener("click", function (e) {
	      /*when an item is clicked, update the original select box,
	      and the selected item:*/
	      var y, i, k, s, h, sl, yl;
	      s = this.parentNode.parentNode.getElementsByTagName("select")[0];
	      sl = s.length;
	      h = this.parentNode.previousSibling;

	      for (i = 0; i < sl; i++) {
	        if (s.options[i].innerHTML == this.innerHTML) {
	          s.selectedIndex = i; // console.log(s.options[i].value);

	          changeLanguage(s.options[i].value); // change language

	          h.innerHTML = this.innerHTML;
	          y = this.parentNode.getElementsByClassName("same-as-selected");
	          yl = y.length;

	          for (k = 0; k < yl; k++) {
	            y[k].removeAttribute("class");
	          }

	          this.setAttribute("class", "same-as-selected");
	          break;
	        }
	      }

	      h.click();
	    });
	    b.appendChild(c);
	  }

	  x[i].appendChild(b);
	  a.addEventListener("click", function (e) {
	    /*when the select box is clicked, close any other select boxes,
	    and open/close the current select box:*/
	    e.stopPropagation();
	    closeAllSelect(this);
	    this.nextSibling.classList.toggle("select-hide");
	    this.classList.toggle("select-arrow-active");
	  });
	}

	function closeAllSelect(elmnt) {
	  /*a function that will close all select boxes in the document,
	  except the current select box:*/
	  var x,
	      y,
	      i,
	      xl,
	      yl,
	      arrNo = [];
	  x = document.getElementsByClassName("select-items");
	  y = document.getElementsByClassName("select-selected");
	  xl = x.length;
	  yl = y.length;

	  for (i = 0; i < yl; i++) {
	    if (elmnt == y[i]) {
	      arrNo.push(i);
	    } else {
	      y[i].classList.remove("select-arrow-active");
	    }
	  }

	  for (i = 0; i < xl; i++) {
	    if (arrNo.indexOf(i)) {
	      x[i].classList.add("select-hide");
	    }
	  }
	}
	/*if the user clicks anywhere outside the select box,
	then close all select boxes:*/


	document.addEventListener("click", closeAllSelect);

	function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

	function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

	/*!
	 * GSAP 3.10.4
	 * https://greensock.com
	 *
	 * @license Copyright 2008-2022, GreenSock. All rights reserved.
	 * Subject to the terms at https://greensock.com/standard-license or for
	 * Club GreenSock members, the agreement issued with that membership.
	 * @author: Jack Doyle, jack@greensock.com
	*/

	/* eslint-disable */
	var _config = {
	  autoSleep: 120,
	  force3D: "auto",
	  nullTargetWarn: 1,
	  units: {
	    lineHeight: ""
	  }
	},
	    _defaults = {
	  duration: .5,
	  overwrite: false,
	  delay: 0
	},
	    _suppressOverwrites,
	    _bigNum$1 = 1e8,
	    _tinyNum = 1 / _bigNum$1,
	    _2PI = Math.PI * 2,
	    _HALF_PI = _2PI / 4,
	    _gsID = 0,
	    _sqrt = Math.sqrt,
	    _cos = Math.cos,
	    _sin = Math.sin,
	    _isString = function _isString(value) {
	  return typeof value === "string";
	},
	    _isFunction = function _isFunction(value) {
	  return typeof value === "function";
	},
	    _isNumber = function _isNumber(value) {
	  return typeof value === "number";
	},
	    _isUndefined = function _isUndefined(value) {
	  return typeof value === "undefined";
	},
	    _isObject = function _isObject(value) {
	  return typeof value === "object";
	},
	    _isNotFalse = function _isNotFalse(value) {
	  return value !== false;
	},
	    _windowExists$1 = function _windowExists() {
	  return typeof window !== "undefined";
	},
	    _isFuncOrString = function _isFuncOrString(value) {
	  return _isFunction(value) || _isString(value);
	},
	    _isTypedArray = typeof ArrayBuffer === "function" && ArrayBuffer.isView || function () {},
	    // note: IE10 has ArrayBuffer, but NOT ArrayBuffer.isView().
	_isArray = Array.isArray,
	    _strictNumExp = /(?:-?\.?\d|\.)+/gi,
	    //only numbers (including negatives and decimals) but NOT relative values.
	_numExp = /[-+=.]*\d+[.e\-+]*\d*[e\-+]*\d*/g,
	    //finds any numbers, including ones that start with += or -=, negative numbers, and ones in scientific notation like 1e-8.
	_numWithUnitExp = /[-+=.]*\d+[.e-]*\d*[a-z%]*/g,
	    _complexStringNumExp = /[-+=.]*\d+\.?\d*(?:e-|e\+)?\d*/gi,
	    //duplicate so that while we're looping through matches from exec(), it doesn't contaminate the lastIndex of _numExp which we use to search for colors too.
	_relExp = /[+-]=-?[.\d]+/,
	    _delimitedValueExp = /[^,'"\[\]\s]+/gi,
	    // previously /[#\-+.]*\b[a-z\d\-=+%.]+/gi but didn't catch special characters.
	_unitExp = /^[+\-=e\s\d]*\d+[.\d]*([a-z]*|%)\s*$/i,
	    _globalTimeline,
	    _win$1,
	    _coreInitted,
	    _doc$1,
	    _globals = {},
	    _installScope = {},
	    _coreReady,
	    _install = function _install(scope) {
	  return (_installScope = _merge(scope, _globals)) && gsap;
	},
	    _missingPlugin = function _missingPlugin(property, value) {
	  return console.warn("Invalid property", property, "set to", value, "Missing plugin? gsap.registerPlugin()");
	},
	    _warn = function _warn(message, suppress) {
	  return !suppress && console.warn(message);
	},
	    _addGlobal = function _addGlobal(name, obj) {
	  return name && (_globals[name] = obj) && _installScope && (_installScope[name] = obj) || _globals;
	},
	    _emptyFunc = function _emptyFunc() {
	  return 0;
	},
	    _reservedProps = {},
	    _lazyTweens = [],
	    _lazyLookup = {},
	    _lastRenderedFrame,
	    _plugins = {},
	    _effects = {},
	    _nextGCFrame = 30,
	    _harnessPlugins = [],
	    _callbackNames = "",
	    _harness = function _harness(targets) {
	  var target = targets[0],
	      harnessPlugin,
	      i;
	  _isObject(target) || _isFunction(target) || (targets = [targets]);

	  if (!(harnessPlugin = (target._gsap || {}).harness)) {
	    // find the first target with a harness. We assume targets passed into an animation will be of similar type, meaning the same kind of harness can be used for them all (performance optimization)
	    i = _harnessPlugins.length;

	    while (i-- && !_harnessPlugins[i].targetTest(target)) {}

	    harnessPlugin = _harnessPlugins[i];
	  }

	  i = targets.length;

	  while (i--) {
	    targets[i] && (targets[i]._gsap || (targets[i]._gsap = new GSCache(targets[i], harnessPlugin))) || targets.splice(i, 1);
	  }

	  return targets;
	},
	    _getCache = function _getCache(target) {
	  return target._gsap || _harness(toArray(target))[0]._gsap;
	},
	    _getProperty = function _getProperty(target, property, v) {
	  return (v = target[property]) && _isFunction(v) ? target[property]() : _isUndefined(v) && target.getAttribute && target.getAttribute(property) || v;
	},
	    _forEachName = function _forEachName(names, func) {
	  return (names = names.split(",")).forEach(func) || names;
	},
	    //split a comma-delimited list of names into an array, then run a forEach() function and return the split array (this is just a way to consolidate/shorten some code).
	_round = function _round(value) {
	  return Math.round(value * 100000) / 100000 || 0;
	},
	    _roundPrecise = function _roundPrecise(value) {
	  return Math.round(value * 10000000) / 10000000 || 0;
	},
	    // increased precision mostly for timing values.
	_parseRelative = function _parseRelative(start, value) {
	  var operator = value.charAt(0),
	      end = parseFloat(value.substr(2));
	  start = parseFloat(start);
	  return operator === "+" ? start + end : operator === "-" ? start - end : operator === "*" ? start * end : start / end;
	},
	    _arrayContainsAny = function _arrayContainsAny(toSearch, toFind) {
	  //searches one array to find matches for any of the items in the toFind array. As soon as one is found, it returns true. It does NOT return all the matches; it's simply a boolean search.
	  var l = toFind.length,
	      i = 0;

	  for (; toSearch.indexOf(toFind[i]) < 0 && ++i < l;) {}

	  return i < l;
	},
	    _lazyRender = function _lazyRender() {
	  var l = _lazyTweens.length,
	      a = _lazyTweens.slice(0),
	      i,
	      tween;

	  _lazyLookup = {};
	  _lazyTweens.length = 0;

	  for (i = 0; i < l; i++) {
	    tween = a[i];
	    tween && tween._lazy && (tween.render(tween._lazy[0], tween._lazy[1], true)._lazy = 0);
	  }
	},
	    _lazySafeRender = function _lazySafeRender(animation, time, suppressEvents, force) {
	  _lazyTweens.length && _lazyRender();
	  animation.render(time, suppressEvents, force);
	  _lazyTweens.length && _lazyRender(); //in case rendering caused any tweens to lazy-init, we should render them because typically when someone calls seek() or time() or progress(), they expect an immediate render.
	},
	    _numericIfPossible = function _numericIfPossible(value) {
	  var n = parseFloat(value);
	  return (n || n === 0) && (value + "").match(_delimitedValueExp).length < 2 ? n : _isString(value) ? value.trim() : value;
	},
	    _passThrough = function _passThrough(p) {
	  return p;
	},
	    _setDefaults = function _setDefaults(obj, defaults) {
	  for (var p in defaults) {
	    p in obj || (obj[p] = defaults[p]);
	  }

	  return obj;
	},
	    _setKeyframeDefaults = function _setKeyframeDefaults(excludeDuration) {
	  return function (obj, defaults) {
	    for (var p in defaults) {
	      p in obj || p === "duration" && excludeDuration || p === "ease" || (obj[p] = defaults[p]);
	    }
	  };
	},
	    _merge = function _merge(base, toMerge) {
	  for (var p in toMerge) {
	    base[p] = toMerge[p];
	  }

	  return base;
	},
	    _mergeDeep = function _mergeDeep(base, toMerge) {
	  for (var p in toMerge) {
	    p !== "__proto__" && p !== "constructor" && p !== "prototype" && (base[p] = _isObject(toMerge[p]) ? _mergeDeep(base[p] || (base[p] = {}), toMerge[p]) : toMerge[p]);
	  }

	  return base;
	},
	    _copyExcluding = function _copyExcluding(obj, excluding) {
	  var copy = {},
	      p;

	  for (p in obj) {
	    p in excluding || (copy[p] = obj[p]);
	  }

	  return copy;
	},
	    _inheritDefaults = function _inheritDefaults(vars) {
	  var parent = vars.parent || _globalTimeline,
	      func = vars.keyframes ? _setKeyframeDefaults(_isArray(vars.keyframes)) : _setDefaults;

	  if (_isNotFalse(vars.inherit)) {
	    while (parent) {
	      func(vars, parent.vars.defaults);
	      parent = parent.parent || parent._dp;
	    }
	  }

	  return vars;
	},
	    _arraysMatch = function _arraysMatch(a1, a2) {
	  var i = a1.length,
	      match = i === a2.length;

	  while (match && i-- && a1[i] === a2[i]) {}

	  return i < 0;
	},
	    _addLinkedListItem = function _addLinkedListItem(parent, child, firstProp, lastProp, sortBy) {
	  if (firstProp === void 0) {
	    firstProp = "_first";
	  }

	  if (lastProp === void 0) {
	    lastProp = "_last";
	  }

	  var prev = parent[lastProp],
	      t;

	  if (sortBy) {
	    t = child[sortBy];

	    while (prev && prev[sortBy] > t) {
	      prev = prev._prev;
	    }
	  }

	  if (prev) {
	    child._next = prev._next;
	    prev._next = child;
	  } else {
	    child._next = parent[firstProp];
	    parent[firstProp] = child;
	  }

	  if (child._next) {
	    child._next._prev = child;
	  } else {
	    parent[lastProp] = child;
	  }

	  child._prev = prev;
	  child.parent = child._dp = parent;
	  return child;
	},
	    _removeLinkedListItem = function _removeLinkedListItem(parent, child, firstProp, lastProp) {
	  if (firstProp === void 0) {
	    firstProp = "_first";
	  }

	  if (lastProp === void 0) {
	    lastProp = "_last";
	  }

	  var prev = child._prev,
	      next = child._next;

	  if (prev) {
	    prev._next = next;
	  } else if (parent[firstProp] === child) {
	    parent[firstProp] = next;
	  }

	  if (next) {
	    next._prev = prev;
	  } else if (parent[lastProp] === child) {
	    parent[lastProp] = prev;
	  }

	  child._next = child._prev = child.parent = null; // don't delete the _dp just so we can revert if necessary. But parent should be null to indicate the item isn't in a linked list.
	},
	    _removeFromParent = function _removeFromParent(child, onlyIfParentHasAutoRemove) {
	  child.parent && (!onlyIfParentHasAutoRemove || child.parent.autoRemoveChildren) && child.parent.remove(child);
	  child._act = 0;
	},
	    _uncache = function _uncache(animation, child) {
	  if (animation && (!child || child._end > animation._dur || child._start < 0)) {
	    // performance optimization: if a child animation is passed in we should only uncache if that child EXTENDS the animation (its end time is beyond the end)
	    var a = animation;

	    while (a) {
	      a._dirty = 1;
	      a = a.parent;
	    }
	  }

	  return animation;
	},
	    _recacheAncestors = function _recacheAncestors(animation) {
	  var parent = animation.parent;

	  while (parent && parent.parent) {
	    //sometimes we must force a re-sort of all children and update the duration/totalDuration of all ancestor timelines immediately in case, for example, in the middle of a render loop, one tween alters another tween's timeScale which shoves its startTime before 0, forcing the parent timeline to shift around and shiftChildren() which could affect that next tween's render (startTime). Doesn't matter for the root timeline though.
	    parent._dirty = 1;
	    parent.totalDuration();
	    parent = parent.parent;
	  }

	  return animation;
	},
	    _hasNoPausedAncestors = function _hasNoPausedAncestors(animation) {
	  return !animation || animation._ts && _hasNoPausedAncestors(animation.parent);
	},
	    _elapsedCycleDuration = function _elapsedCycleDuration(animation) {
	  return animation._repeat ? _animationCycle(animation._tTime, animation = animation.duration() + animation._rDelay) * animation : 0;
	},
	    // feed in the totalTime and cycleDuration and it'll return the cycle (iteration minus 1) and if the playhead is exactly at the very END, it will NOT bump up to the next cycle.
	_animationCycle = function _animationCycle(tTime, cycleDuration) {
	  var whole = Math.floor(tTime /= cycleDuration);
	  return tTime && whole === tTime ? whole - 1 : whole;
	},
	    _parentToChildTotalTime = function _parentToChildTotalTime(parentTime, child) {
	  return (parentTime - child._start) * child._ts + (child._ts >= 0 ? 0 : child._dirty ? child.totalDuration() : child._tDur);
	},
	    _setEnd = function _setEnd(animation) {
	  return animation._end = _roundPrecise(animation._start + (animation._tDur / Math.abs(animation._ts || animation._rts || _tinyNum) || 0));
	},
	    _alignPlayhead = function _alignPlayhead(animation, totalTime) {
	  // adjusts the animation's _start and _end according to the provided totalTime (only if the parent's smoothChildTiming is true and the animation isn't paused). It doesn't do any rendering or forcing things back into parent timelines, etc. - that's what totalTime() is for.
	  var parent = animation._dp;

	  if (parent && parent.smoothChildTiming && animation._ts) {
	    animation._start = _roundPrecise(parent._time - (animation._ts > 0 ? totalTime / animation._ts : ((animation._dirty ? animation.totalDuration() : animation._tDur) - totalTime) / -animation._ts));

	    _setEnd(animation);

	    parent._dirty || _uncache(parent, animation); //for performance improvement. If the parent's cache is already dirty, it already took care of marking the ancestors as dirty too, so skip the function call here.
	  }

	  return animation;
	},

	/*
	_totalTimeToTime = (clampedTotalTime, duration, repeat, repeatDelay, yoyo) => {
		let cycleDuration = duration + repeatDelay,
			time = _round(clampedTotalTime % cycleDuration);
		if (time > duration) {
			time = duration;
		}
		return (yoyo && (~~(clampedTotalTime / cycleDuration) & 1)) ? duration - time : time;
	},
	*/
	_postAddChecks = function _postAddChecks(timeline, child) {
	  var t;

	  if (child._time || child._initted && !child._dur) {
	    //in case, for example, the _start is moved on a tween that has already rendered. Imagine it's at its end state, then the startTime is moved WAY later (after the end of this timeline), it should render at its beginning.
	    t = _parentToChildTotalTime(timeline.rawTime(), child);

	    if (!child._dur || _clamp(0, child.totalDuration(), t) - child._tTime > _tinyNum) {
	      child.render(t, true);
	    }
	  } //if the timeline has already ended but the inserted tween/timeline extends the duration, we should enable this timeline again so that it renders properly. We should also align the playhead with the parent timeline's when appropriate.


	  if (_uncache(timeline, child)._dp && timeline._initted && timeline._time >= timeline._dur && timeline._ts) {
	    //in case any of the ancestors had completed but should now be enabled...
	    if (timeline._dur < timeline.duration()) {
	      t = timeline;

	      while (t._dp) {
	        t.rawTime() >= 0 && t.totalTime(t._tTime); //moves the timeline (shifts its startTime) if necessary, and also enables it. If it's currently zero, though, it may not be scheduled to render until later so there's no need to force it to align with the current playhead position. Only move to catch up with the playhead.

	        t = t._dp;
	      }
	    }

	    timeline._zTime = -_tinyNum; // helps ensure that the next render() will be forced (crossingStart = true in render()), even if the duration hasn't changed (we're adding a child which would need to get rendered). Definitely an edge case. Note: we MUST do this AFTER the loop above where the totalTime() might trigger a render() because this _addToTimeline() method gets called from the Animation constructor, BEFORE tweens even record their targets, etc. so we wouldn't want things to get triggered in the wrong order.
	  }
	},
	    _addToTimeline = function _addToTimeline(timeline, child, position, skipChecks) {
	  child.parent && _removeFromParent(child);
	  child._start = _roundPrecise((_isNumber(position) ? position : position || timeline !== _globalTimeline ? _parsePosition(timeline, position, child) : timeline._time) + child._delay);
	  child._end = _roundPrecise(child._start + (child.totalDuration() / Math.abs(child.timeScale()) || 0));

	  _addLinkedListItem(timeline, child, "_first", "_last", timeline._sort ? "_start" : 0);

	  _isFromOrFromStart(child) || (timeline._recent = child);
	  skipChecks || _postAddChecks(timeline, child);
	  return timeline;
	},
	    _scrollTrigger = function _scrollTrigger(animation, trigger) {
	  return (_globals.ScrollTrigger || _missingPlugin("scrollTrigger", trigger)) && _globals.ScrollTrigger.create(trigger, animation);
	},
	    _attemptInitTween = function _attemptInitTween(tween, totalTime, force, suppressEvents) {
	  _initTween(tween, totalTime);

	  if (!tween._initted) {
	    return 1;
	  }

	  if (!force && tween._pt && (tween._dur && tween.vars.lazy !== false || !tween._dur && tween.vars.lazy) && _lastRenderedFrame !== _ticker.frame) {
	    _lazyTweens.push(tween);

	    tween._lazy = [totalTime, suppressEvents];
	    return 1;
	  }
	},
	    _parentPlayheadIsBeforeStart = function _parentPlayheadIsBeforeStart(_ref) {
	  var parent = _ref.parent;
	  return parent && parent._ts && parent._initted && !parent._lock && (parent.rawTime() < 0 || _parentPlayheadIsBeforeStart(parent));
	},
	    // check parent's _lock because when a timeline repeats/yoyos and does its artificial wrapping, we shouldn't force the ratio back to 0
	_isFromOrFromStart = function _isFromOrFromStart(_ref2) {
	  var data = _ref2.data;
	  return data === "isFromStart" || data === "isStart";
	},
	    _renderZeroDurationTween = function _renderZeroDurationTween(tween, totalTime, suppressEvents, force) {
	  var prevRatio = tween.ratio,
	      ratio = totalTime < 0 || !totalTime && (!tween._start && _parentPlayheadIsBeforeStart(tween) && !(!tween._initted && _isFromOrFromStart(tween)) || (tween._ts < 0 || tween._dp._ts < 0) && !_isFromOrFromStart(tween)) ? 0 : 1,
	      // if the tween or its parent is reversed and the totalTime is 0, we should go to a ratio of 0. Edge case: if a from() or fromTo() stagger tween is placed later in a timeline, the "startAt" zero-duration tween could initially render at a time when the parent timeline's playhead is technically BEFORE where this tween is, so make sure that any "from" and "fromTo" startAt tweens are rendered the first time at a ratio of 1.
	  repeatDelay = tween._rDelay,
	      tTime = 0,
	      pt,
	      iteration,
	      prevIteration;

	  if (repeatDelay && tween._repeat) {
	    // in case there's a zero-duration tween that has a repeat with a repeatDelay
	    tTime = _clamp(0, tween._tDur, totalTime);
	    iteration = _animationCycle(tTime, repeatDelay);
	    tween._yoyo && iteration & 1 && (ratio = 1 - ratio);

	    if (iteration !== _animationCycle(tween._tTime, repeatDelay)) {
	      // if iteration changed
	      prevRatio = 1 - ratio;
	      tween.vars.repeatRefresh && tween._initted && tween.invalidate();
	    }
	  }

	  if (ratio !== prevRatio || force || tween._zTime === _tinyNum || !totalTime && tween._zTime) {
	    if (!tween._initted && _attemptInitTween(tween, totalTime, force, suppressEvents)) {
	      // if we render the very beginning (time == 0) of a fromTo(), we must force the render (normal tweens wouldn't need to render at a time of 0 when the prevTime was also 0). This is also mandatory to make sure overwriting kicks in immediately.
	      return;
	    }

	    prevIteration = tween._zTime;
	    tween._zTime = totalTime || (suppressEvents ? _tinyNum : 0); // when the playhead arrives at EXACTLY time 0 (right on top) of a zero-duration tween, we need to discern if events are suppressed so that when the playhead moves again (next time), it'll trigger the callback. If events are NOT suppressed, obviously the callback would be triggered in this render. Basically, the callback should fire either when the playhead ARRIVES or LEAVES this exact spot, not both. Imagine doing a timeline.seek(0) and there's a callback that sits at 0. Since events are suppressed on that seek() by default, nothing will fire, but when the playhead moves off of that position, the callback should fire. This behavior is what people intuitively expect.

	    suppressEvents || (suppressEvents = totalTime && !prevIteration); // if it was rendered previously at exactly 0 (_zTime) and now the playhead is moving away, DON'T fire callbacks otherwise they'll seem like duplicates.

	    tween.ratio = ratio;
	    tween._from && (ratio = 1 - ratio);
	    tween._time = 0;
	    tween._tTime = tTime;
	    pt = tween._pt;

	    while (pt) {
	      pt.r(ratio, pt.d);
	      pt = pt._next;
	    }

	    tween._startAt && totalTime < 0 && tween._startAt.render(totalTime, true, true);
	    tween._onUpdate && !suppressEvents && _callback(tween, "onUpdate");
	    tTime && tween._repeat && !suppressEvents && tween.parent && _callback(tween, "onRepeat");

	    if ((totalTime >= tween._tDur || totalTime < 0) && tween.ratio === ratio) {
	      ratio && _removeFromParent(tween, 1);

	      if (!suppressEvents) {
	        _callback(tween, ratio ? "onComplete" : "onReverseComplete", true);

	        tween._prom && tween._prom();
	      }
	    }
	  } else if (!tween._zTime) {
	    tween._zTime = totalTime;
	  }
	},
	    _findNextPauseTween = function _findNextPauseTween(animation, prevTime, time) {
	  var child;

	  if (time > prevTime) {
	    child = animation._first;

	    while (child && child._start <= time) {
	      if (child.data === "isPause" && child._start > prevTime) {
	        return child;
	      }

	      child = child._next;
	    }
	  } else {
	    child = animation._last;

	    while (child && child._start >= time) {
	      if (child.data === "isPause" && child._start < prevTime) {
	        return child;
	      }

	      child = child._prev;
	    }
	  }
	},
	    _setDuration = function _setDuration(animation, duration, skipUncache, leavePlayhead) {
	  var repeat = animation._repeat,
	      dur = _roundPrecise(duration) || 0,
	      totalProgress = animation._tTime / animation._tDur;
	  totalProgress && !leavePlayhead && (animation._time *= dur / animation._dur);
	  animation._dur = dur;
	  animation._tDur = !repeat ? dur : repeat < 0 ? 1e10 : _roundPrecise(dur * (repeat + 1) + animation._rDelay * repeat);
	  totalProgress > 0 && !leavePlayhead ? _alignPlayhead(animation, animation._tTime = animation._tDur * totalProgress) : animation.parent && _setEnd(animation);
	  skipUncache || _uncache(animation.parent, animation);
	  return animation;
	},
	    _onUpdateTotalDuration = function _onUpdateTotalDuration(animation) {
	  return animation instanceof Timeline ? _uncache(animation) : _setDuration(animation, animation._dur);
	},
	    _zeroPosition = {
	  _start: 0,
	  endTime: _emptyFunc,
	  totalDuration: _emptyFunc
	},
	    _parsePosition = function _parsePosition(animation, position, percentAnimation) {
	  var labels = animation.labels,
	      recent = animation._recent || _zeroPosition,
	      clippedDuration = animation.duration() >= _bigNum$1 ? recent.endTime(false) : animation._dur,
	      //in case there's a child that infinitely repeats, users almost never intend for the insertion point of a new child to be based on a SUPER long value like that so we clip it and assume the most recently-added child's endTime should be used instead.
	  i,
	      offset,
	      isPercent;

	  if (_isString(position) && (isNaN(position) || position in labels)) {
	    //if the string is a number like "1", check to see if there's a label with that name, otherwise interpret it as a number (absolute value).
	    offset = position.charAt(0);
	    isPercent = position.substr(-1) === "%";
	    i = position.indexOf("=");

	    if (offset === "<" || offset === ">") {
	      i >= 0 && (position = position.replace(/=/, ""));
	      return (offset === "<" ? recent._start : recent.endTime(recent._repeat >= 0)) + (parseFloat(position.substr(1)) || 0) * (isPercent ? (i < 0 ? recent : percentAnimation).totalDuration() / 100 : 1);
	    }

	    if (i < 0) {
	      position in labels || (labels[position] = clippedDuration);
	      return labels[position];
	    }

	    offset = parseFloat(position.charAt(i - 1) + position.substr(i + 1));

	    if (isPercent && percentAnimation) {
	      offset = offset / 100 * (_isArray(percentAnimation) ? percentAnimation[0] : percentAnimation).totalDuration();
	    }

	    return i > 1 ? _parsePosition(animation, position.substr(0, i - 1), percentAnimation) + offset : clippedDuration + offset;
	  }

	  return position == null ? clippedDuration : +position;
	},
	    _createTweenType = function _createTweenType(type, params, timeline) {
	  var isLegacy = _isNumber(params[1]),
	      varsIndex = (isLegacy ? 2 : 1) + (type < 2 ? 0 : 1),
	      vars = params[varsIndex],
	      irVars,
	      parent;

	  isLegacy && (vars.duration = params[1]);
	  vars.parent = timeline;

	  if (type) {
	    irVars = vars;
	    parent = timeline;

	    while (parent && !("immediateRender" in irVars)) {
	      // inheritance hasn't happened yet, but someone may have set a default in an ancestor timeline. We could do vars.immediateRender = _isNotFalse(_inheritDefaults(vars).immediateRender) but that'd exact a slight performance penalty because _inheritDefaults() also runs in the Tween constructor. We're paying a small kb price here to gain speed.
	      irVars = parent.vars.defaults || {};
	      parent = _isNotFalse(parent.vars.inherit) && parent.parent;
	    }

	    vars.immediateRender = _isNotFalse(irVars.immediateRender);
	    type < 2 ? vars.runBackwards = 1 : vars.startAt = params[varsIndex - 1]; // "from" vars
	  }

	  return new Tween(params[0], vars, params[varsIndex + 1]);
	},
	    _conditionalReturn = function _conditionalReturn(value, func) {
	  return value || value === 0 ? func(value) : func;
	},
	    _clamp = function _clamp(min, max, value) {
	  return value < min ? min : value > max ? max : value;
	},
	    getUnit = function getUnit(value, v) {
	  return !_isString(value) || !(v = _unitExp.exec(value)) ? "" : v[1];
	},
	    // note: protect against padded numbers as strings, like "100.100". That shouldn't return "00" as the unit. If it's numeric, return no unit.
	clamp = function clamp(min, max, value) {
	  return _conditionalReturn(value, function (v) {
	    return _clamp(min, max, v);
	  });
	},
	    _slice = [].slice,
	    _isArrayLike = function _isArrayLike(value, nonEmpty) {
	  return value && _isObject(value) && "length" in value && (!nonEmpty && !value.length || value.length - 1 in value && _isObject(value[0])) && !value.nodeType && value !== _win$1;
	},
	    _flatten = function _flatten(ar, leaveStrings, accumulator) {
	  if (accumulator === void 0) {
	    accumulator = [];
	  }

	  return ar.forEach(function (value) {
	    var _accumulator;

	    return _isString(value) && !leaveStrings || _isArrayLike(value, 1) ? (_accumulator = accumulator).push.apply(_accumulator, toArray(value)) : accumulator.push(value);
	  }) || accumulator;
	},
	    //takes any value and returns an array. If it's a string (and leaveStrings isn't true), it'll use document.querySelectorAll() and convert that to an array. It'll also accept iterables like jQuery objects.
	toArray = function toArray(value, scope, leaveStrings) {
	  return _isString(value) && !leaveStrings && (_coreInitted || !_wake()) ? _slice.call((scope || _doc$1).querySelectorAll(value), 0) : _isArray(value) ? _flatten(value, leaveStrings) : _isArrayLike(value) ? _slice.call(value, 0) : value ? [value] : [];
	},
	    selector = function selector(value) {
	  value = toArray(value)[0] || _warn("Invalid scope") || {};
	  return function (v) {
	    var el = value.current || value.nativeElement || value;
	    return toArray(v, el.querySelectorAll ? el : el === value ? _warn("Invalid scope") || _doc$1.createElement("div") : value);
	  };
	},
	    shuffle = function shuffle(a) {
	  return a.sort(function () {
	    return .5 - Math.random();
	  });
	},
	    // alternative that's a bit faster and more reliably diverse but bigger:   for (let j, v, i = a.length; i; j = Math.floor(Math.random() * i), v = a[--i], a[i] = a[j], a[j] = v); return a;
	//for distributing values across an array. Can accept a number, a function or (most commonly) a function which can contain the following properties: {base, amount, from, ease, grid, axis, length, each}. Returns a function that expects the following parameters: index, target, array. Recognizes the following
	distribute = function distribute(v) {
	  if (_isFunction(v)) {
	    return v;
	  }

	  var vars = _isObject(v) ? v : {
	    each: v
	  },
	      //n:1 is just to indicate v was a number; we leverage that later to set v according to the length we get. If a number is passed in, we treat it like the old stagger value where 0.1, for example, would mean that things would be distributed with 0.1 between each element in the array rather than a total "amount" that's chunked out among them all.
	  ease = _parseEase(vars.ease),
	      from = vars.from || 0,
	      base = parseFloat(vars.base) || 0,
	      cache = {},
	      isDecimal = from > 0 && from < 1,
	      ratios = isNaN(from) || isDecimal,
	      axis = vars.axis,
	      ratioX = from,
	      ratioY = from;

	  if (_isString(from)) {
	    ratioX = ratioY = {
	      center: .5,
	      edges: .5,
	      end: 1
	    }[from] || 0;
	  } else if (!isDecimal && ratios) {
	    ratioX = from[0];
	    ratioY = from[1];
	  }

	  return function (i, target, a) {
	    var l = (a || vars).length,
	        distances = cache[l],
	        originX,
	        originY,
	        x,
	        y,
	        d,
	        j,
	        max,
	        min,
	        wrapAt;

	    if (!distances) {
	      wrapAt = vars.grid === "auto" ? 0 : (vars.grid || [1, _bigNum$1])[1];

	      if (!wrapAt) {
	        max = -_bigNum$1;

	        while (max < (max = a[wrapAt++].getBoundingClientRect().left) && wrapAt < l) {}

	        wrapAt--;
	      }

	      distances = cache[l] = [];
	      originX = ratios ? Math.min(wrapAt, l) * ratioX - .5 : from % wrapAt;
	      originY = wrapAt === _bigNum$1 ? 0 : ratios ? l * ratioY / wrapAt - .5 : from / wrapAt | 0;
	      max = 0;
	      min = _bigNum$1;

	      for (j = 0; j < l; j++) {
	        x = j % wrapAt - originX;
	        y = originY - (j / wrapAt | 0);
	        distances[j] = d = !axis ? _sqrt(x * x + y * y) : Math.abs(axis === "y" ? y : x);
	        d > max && (max = d);
	        d < min && (min = d);
	      }

	      from === "random" && shuffle(distances);
	      distances.max = max - min;
	      distances.min = min;
	      distances.v = l = (parseFloat(vars.amount) || parseFloat(vars.each) * (wrapAt > l ? l - 1 : !axis ? Math.max(wrapAt, l / wrapAt) : axis === "y" ? l / wrapAt : wrapAt) || 0) * (from === "edges" ? -1 : 1);
	      distances.b = l < 0 ? base - l : base;
	      distances.u = getUnit(vars.amount || vars.each) || 0; //unit

	      ease = ease && l < 0 ? _invertEase(ease) : ease;
	    }

	    l = (distances[i] - distances.min) / distances.max || 0;
	    return _roundPrecise(distances.b + (ease ? ease(l) : l) * distances.v) + distances.u; //round in order to work around floating point errors
	  };
	},
	    _roundModifier = function _roundModifier(v) {
	  //pass in 0.1 get a function that'll round to the nearest tenth, or 5 to round to the closest 5, or 0.001 to the closest 1000th, etc.
	  var p = Math.pow(10, ((v + "").split(".")[1] || "").length); //to avoid floating point math errors (like 24 * 0.1 == 2.4000000000000004), we chop off at a specific number of decimal places (much faster than toFixed())

	  return function (raw) {
	    var n = Math.round(parseFloat(raw) / v) * v * p;
	    return (n - n % 1) / p + (_isNumber(raw) ? 0 : getUnit(raw)); // n - n % 1 replaces Math.floor() in order to handle negative values properly. For example, Math.floor(-150.00000000000003) is 151!
	  };
	},
	    snap = function snap(snapTo, value) {
	  var isArray = _isArray(snapTo),
	      radius,
	      is2D;

	  if (!isArray && _isObject(snapTo)) {
	    radius = isArray = snapTo.radius || _bigNum$1;

	    if (snapTo.values) {
	      snapTo = toArray(snapTo.values);

	      if (is2D = !_isNumber(snapTo[0])) {
	        radius *= radius; //performance optimization so we don't have to Math.sqrt() in the loop.
	      }
	    } else {
	      snapTo = _roundModifier(snapTo.increment);
	    }
	  }

	  return _conditionalReturn(value, !isArray ? _roundModifier(snapTo) : _isFunction(snapTo) ? function (raw) {
	    is2D = snapTo(raw);
	    return Math.abs(is2D - raw) <= radius ? is2D : raw;
	  } : function (raw) {
	    var x = parseFloat(is2D ? raw.x : raw),
	        y = parseFloat(is2D ? raw.y : 0),
	        min = _bigNum$1,
	        closest = 0,
	        i = snapTo.length,
	        dx,
	        dy;

	    while (i--) {
	      if (is2D) {
	        dx = snapTo[i].x - x;
	        dy = snapTo[i].y - y;
	        dx = dx * dx + dy * dy;
	      } else {
	        dx = Math.abs(snapTo[i] - x);
	      }

	      if (dx < min) {
	        min = dx;
	        closest = i;
	      }
	    }

	    closest = !radius || min <= radius ? snapTo[closest] : raw;
	    return is2D || closest === raw || _isNumber(raw) ? closest : closest + getUnit(raw);
	  });
	},
	    random = function random(min, max, roundingIncrement, returnFunction) {
	  return _conditionalReturn(_isArray(min) ? !max : roundingIncrement === true ? !!(roundingIncrement = 0) : !returnFunction, function () {
	    return _isArray(min) ? min[~~(Math.random() * min.length)] : (roundingIncrement = roundingIncrement || 1e-5) && (returnFunction = roundingIncrement < 1 ? Math.pow(10, (roundingIncrement + "").length - 2) : 1) && Math.floor(Math.round((min - roundingIncrement / 2 + Math.random() * (max - min + roundingIncrement * .99)) / roundingIncrement) * roundingIncrement * returnFunction) / returnFunction;
	  });
	},
	    pipe = function pipe() {
	  for (var _len = arguments.length, functions = new Array(_len), _key = 0; _key < _len; _key++) {
	    functions[_key] = arguments[_key];
	  }

	  return function (value) {
	    return functions.reduce(function (v, f) {
	      return f(v);
	    }, value);
	  };
	},
	    unitize = function unitize(func, unit) {
	  return function (value) {
	    return func(parseFloat(value)) + (unit || getUnit(value));
	  };
	},
	    normalize = function normalize(min, max, value) {
	  return mapRange(min, max, 0, 1, value);
	},
	    _wrapArray = function _wrapArray(a, wrapper, value) {
	  return _conditionalReturn(value, function (index) {
	    return a[~~wrapper(index)];
	  });
	},
	    wrap = function wrap(min, max, value) {
	  // NOTE: wrap() CANNOT be an arrow function! A very odd compiling bug causes problems (unrelated to GSAP).
	  var range = max - min;
	  return _isArray(min) ? _wrapArray(min, wrap(0, min.length), max) : _conditionalReturn(value, function (value) {
	    return (range + (value - min) % range) % range + min;
	  });
	},
	    wrapYoyo = function wrapYoyo(min, max, value) {
	  var range = max - min,
	      total = range * 2;
	  return _isArray(min) ? _wrapArray(min, wrapYoyo(0, min.length - 1), max) : _conditionalReturn(value, function (value) {
	    value = (total + (value - min) % total) % total || 0;
	    return min + (value > range ? total - value : value);
	  });
	},
	    _replaceRandom = function _replaceRandom(value) {
	  //replaces all occurrences of random(...) in a string with the calculated random value. can be a range like random(-100, 100, 5) or an array like random([0, 100, 500])
	  var prev = 0,
	      s = "",
	      i,
	      nums,
	      end,
	      isArray;

	  while (~(i = value.indexOf("random(", prev))) {
	    end = value.indexOf(")", i);
	    isArray = value.charAt(i + 7) === "[";
	    nums = value.substr(i + 7, end - i - 7).match(isArray ? _delimitedValueExp : _strictNumExp);
	    s += value.substr(prev, i - prev) + random(isArray ? nums : +nums[0], isArray ? 0 : +nums[1], +nums[2] || 1e-5);
	    prev = end + 1;
	  }

	  return s + value.substr(prev, value.length - prev);
	},
	    mapRange = function mapRange(inMin, inMax, outMin, outMax, value) {
	  var inRange = inMax - inMin,
	      outRange = outMax - outMin;
	  return _conditionalReturn(value, function (value) {
	    return outMin + ((value - inMin) / inRange * outRange || 0);
	  });
	},
	    interpolate = function interpolate(start, end, progress, mutate) {
	  var func = isNaN(start + end) ? 0 : function (p) {
	    return (1 - p) * start + p * end;
	  };

	  if (!func) {
	    var isString = _isString(start),
	        master = {},
	        p,
	        i,
	        interpolators,
	        l,
	        il;

	    progress === true && (mutate = 1) && (progress = null);

	    if (isString) {
	      start = {
	        p: start
	      };
	      end = {
	        p: end
	      };
	    } else if (_isArray(start) && !_isArray(end)) {
	      interpolators = [];
	      l = start.length;
	      il = l - 2;

	      for (i = 1; i < l; i++) {
	        interpolators.push(interpolate(start[i - 1], start[i])); //build the interpolators up front as a performance optimization so that when the function is called many times, it can just reuse them.
	      }

	      l--;

	      func = function func(p) {
	        p *= l;
	        var i = Math.min(il, ~~p);
	        return interpolators[i](p - i);
	      };

	      progress = end;
	    } else if (!mutate) {
	      start = _merge(_isArray(start) ? [] : {}, start);
	    }

	    if (!interpolators) {
	      for (p in end) {
	        _addPropTween.call(master, start, p, "get", end[p]);
	      }

	      func = function func(p) {
	        return _renderPropTweens(p, master) || (isString ? start.p : start);
	      };
	    }
	  }

	  return _conditionalReturn(progress, func);
	},
	    _getLabelInDirection = function _getLabelInDirection(timeline, fromTime, backward) {
	  //used for nextLabel() and previousLabel()
	  var labels = timeline.labels,
	      min = _bigNum$1,
	      p,
	      distance,
	      label;

	  for (p in labels) {
	    distance = labels[p] - fromTime;

	    if (distance < 0 === !!backward && distance && min > (distance = Math.abs(distance))) {
	      label = p;
	      min = distance;
	    }
	  }

	  return label;
	},
	    _callback = function _callback(animation, type, executeLazyFirst) {
	  var v = animation.vars,
	      callback = v[type],
	      params,
	      scope;

	  if (!callback) {
	    return;
	  }

	  params = v[type + "Params"];
	  scope = v.callbackScope || animation;
	  executeLazyFirst && _lazyTweens.length && _lazyRender(); //in case rendering caused any tweens to lazy-init, we should render them because typically when a timeline finishes, users expect things to have rendered fully. Imagine an onUpdate on a timeline that reports/checks tweened values.

	  return params ? callback.apply(scope, params) : callback.call(scope);
	},
	    _interrupt = function _interrupt(animation) {
	  _removeFromParent(animation);

	  animation.scrollTrigger && animation.scrollTrigger.kill(false);
	  animation.progress() < 1 && _callback(animation, "onInterrupt");
	  return animation;
	},
	    _quickTween,
	    _createPlugin = function _createPlugin(config) {
	  config = !config.name && config["default"] || config; //UMD packaging wraps things oddly, so for example MotionPathHelper becomes {MotionPathHelper:MotionPathHelper, default:MotionPathHelper}.

	  var name = config.name,
	      isFunc = _isFunction(config),
	      Plugin = name && !isFunc && config.init ? function () {
	    this._props = [];
	  } : config,
	      //in case someone passes in an object that's not a plugin, like CustomEase
	  instanceDefaults = {
	    init: _emptyFunc,
	    render: _renderPropTweens,
	    add: _addPropTween,
	    kill: _killPropTweensOf,
	    modifier: _addPluginModifier,
	    rawVars: 0
	  },
	      statics = {
	    targetTest: 0,
	    get: 0,
	    getSetter: _getSetter,
	    aliases: {},
	    register: 0
	  };

	  _wake();

	  if (config !== Plugin) {
	    if (_plugins[name]) {
	      return;
	    }

	    _setDefaults(Plugin, _setDefaults(_copyExcluding(config, instanceDefaults), statics)); //static methods


	    _merge(Plugin.prototype, _merge(instanceDefaults, _copyExcluding(config, statics))); //instance methods


	    _plugins[Plugin.prop = name] = Plugin;

	    if (config.targetTest) {
	      _harnessPlugins.push(Plugin);

	      _reservedProps[name] = 1;
	    }

	    name = (name === "css" ? "CSS" : name.charAt(0).toUpperCase() + name.substr(1)) + "Plugin"; //for the global name. "motionPath" should become MotionPathPlugin
	  }

	  _addGlobal(name, Plugin);

	  config.register && config.register(gsap, Plugin, PropTween);
	},

	/*
	 * --------------------------------------------------------------------------------------
	 * COLORS
	 * --------------------------------------------------------------------------------------
	 */
	_255 = 255,
	    _colorLookup = {
	  aqua: [0, _255, _255],
	  lime: [0, _255, 0],
	  silver: [192, 192, 192],
	  black: [0, 0, 0],
	  maroon: [128, 0, 0],
	  teal: [0, 128, 128],
	  blue: [0, 0, _255],
	  navy: [0, 0, 128],
	  white: [_255, _255, _255],
	  olive: [128, 128, 0],
	  yellow: [_255, _255, 0],
	  orange: [_255, 165, 0],
	  gray: [128, 128, 128],
	  purple: [128, 0, 128],
	  green: [0, 128, 0],
	  red: [_255, 0, 0],
	  pink: [_255, 192, 203],
	  cyan: [0, _255, _255],
	  transparent: [_255, _255, _255, 0]
	},
	    // possible future idea to replace the hard-coded color name values - put this in the ticker.wake() where we set the _doc:
	// let ctx = _doc.createElement("canvas").getContext("2d");
	// _forEachName("aqua,lime,silver,black,maroon,teal,blue,navy,white,olive,yellow,orange,gray,purple,green,red,pink,cyan", color => {ctx.fillStyle = color; _colorLookup[color] = splitColor(ctx.fillStyle)});
	_hue = function _hue(h, m1, m2) {
	  h += h < 0 ? 1 : h > 1 ? -1 : 0;
	  return (h * 6 < 1 ? m1 + (m2 - m1) * h * 6 : h < .5 ? m2 : h * 3 < 2 ? m1 + (m2 - m1) * (2 / 3 - h) * 6 : m1) * _255 + .5 | 0;
	},
	    splitColor = function splitColor(v, toHSL, forceAlpha) {
	  var a = !v ? _colorLookup.black : _isNumber(v) ? [v >> 16, v >> 8 & _255, v & _255] : 0,
	      r,
	      g,
	      b,
	      h,
	      s,
	      l,
	      max,
	      min,
	      d,
	      wasHSL;

	  if (!a) {
	    if (v.substr(-1) === ",") {
	      //sometimes a trailing comma is included and we should chop it off (typically from a comma-delimited list of values like a textShadow:"2px 2px 2px blue, 5px 5px 5px rgb(255,0,0)" - in this example "blue," has a trailing comma. We could strip it out inside parseComplex() but we'd need to do it to the beginning and ending values plus it wouldn't provide protection from other potential scenarios like if the user passes in a similar value.
	      v = v.substr(0, v.length - 1);
	    }

	    if (_colorLookup[v]) {
	      a = _colorLookup[v];
	    } else if (v.charAt(0) === "#") {
	      if (v.length < 6) {
	        //for shorthand like #9F0 or #9F0F (could have alpha)
	        r = v.charAt(1);
	        g = v.charAt(2);
	        b = v.charAt(3);
	        v = "#" + r + r + g + g + b + b + (v.length === 5 ? v.charAt(4) + v.charAt(4) : "");
	      }

	      if (v.length === 9) {
	        // hex with alpha, like #fd5e53ff
	        a = parseInt(v.substr(1, 6), 16);
	        return [a >> 16, a >> 8 & _255, a & _255, parseInt(v.substr(7), 16) / 255];
	      }

	      v = parseInt(v.substr(1), 16);
	      a = [v >> 16, v >> 8 & _255, v & _255];
	    } else if (v.substr(0, 3) === "hsl") {
	      a = wasHSL = v.match(_strictNumExp);

	      if (!toHSL) {
	        h = +a[0] % 360 / 360;
	        s = +a[1] / 100;
	        l = +a[2] / 100;
	        g = l <= .5 ? l * (s + 1) : l + s - l * s;
	        r = l * 2 - g;
	        a.length > 3 && (a[3] *= 1); //cast as number

	        a[0] = _hue(h + 1 / 3, r, g);
	        a[1] = _hue(h, r, g);
	        a[2] = _hue(h - 1 / 3, r, g);
	      } else if (~v.indexOf("=")) {
	        //if relative values are found, just return the raw strings with the relative prefixes in place.
	        a = v.match(_numExp);
	        forceAlpha && a.length < 4 && (a[3] = 1);
	        return a;
	      }
	    } else {
	      a = v.match(_strictNumExp) || _colorLookup.transparent;
	    }

	    a = a.map(Number);
	  }

	  if (toHSL && !wasHSL) {
	    r = a[0] / _255;
	    g = a[1] / _255;
	    b = a[2] / _255;
	    max = Math.max(r, g, b);
	    min = Math.min(r, g, b);
	    l = (max + min) / 2;

	    if (max === min) {
	      h = s = 0;
	    } else {
	      d = max - min;
	      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
	      h = max === r ? (g - b) / d + (g < b ? 6 : 0) : max === g ? (b - r) / d + 2 : (r - g) / d + 4;
	      h *= 60;
	    }

	    a[0] = ~~(h + .5);
	    a[1] = ~~(s * 100 + .5);
	    a[2] = ~~(l * 100 + .5);
	  }

	  forceAlpha && a.length < 4 && (a[3] = 1);
	  return a;
	},
	    _colorOrderData = function _colorOrderData(v) {
	  // strips out the colors from the string, finds all the numeric slots (with units) and returns an array of those. The Array also has a "c" property which is an Array of the index values where the colors belong. This is to help work around issues where there's a mis-matched order of color/numeric data like drop-shadow(#f00 0px 1px 2px) and drop-shadow(0x 1px 2px #f00). This is basically a helper function used in _formatColors()
	  var values = [],
	      c = [],
	      i = -1;
	  v.split(_colorExp).forEach(function (v) {
	    var a = v.match(_numWithUnitExp) || [];
	    values.push.apply(values, a);
	    c.push(i += a.length + 1);
	  });
	  values.c = c;
	  return values;
	},
	    _formatColors = function _formatColors(s, toHSL, orderMatchData) {
	  var result = "",
	      colors = (s + result).match(_colorExp),
	      type = toHSL ? "hsla(" : "rgba(",
	      i = 0,
	      c,
	      shell,
	      d,
	      l;

	  if (!colors) {
	    return s;
	  }

	  colors = colors.map(function (color) {
	    return (color = splitColor(color, toHSL, 1)) && type + (toHSL ? color[0] + "," + color[1] + "%," + color[2] + "%," + color[3] : color.join(",")) + ")";
	  });

	  if (orderMatchData) {
	    d = _colorOrderData(s);
	    c = orderMatchData.c;

	    if (c.join(result) !== d.c.join(result)) {
	      shell = s.replace(_colorExp, "1").split(_numWithUnitExp);
	      l = shell.length - 1;

	      for (; i < l; i++) {
	        result += shell[i] + (~c.indexOf(i) ? colors.shift() || type + "0,0,0,0)" : (d.length ? d : colors.length ? colors : orderMatchData).shift());
	      }
	    }
	  }

	  if (!shell) {
	    shell = s.split(_colorExp);
	    l = shell.length - 1;

	    for (; i < l; i++) {
	      result += shell[i] + colors[i];
	    }
	  }

	  return result + shell[l];
	},
	    _colorExp = function () {
	  var s = "(?:\\b(?:(?:rgb|rgba|hsl|hsla)\\(.+?\\))|\\B#(?:[0-9a-f]{3,4}){1,2}\\b",
	      //we'll dynamically build this Regular Expression to conserve file size. After building it, it will be able to find rgb(), rgba(), # (hexadecimal), and named color values like red, blue, purple, etc.,
	  p;

	  for (p in _colorLookup) {
	    s += "|" + p + "\\b";
	  }

	  return new RegExp(s + ")", "gi");
	}(),
	    _hslExp = /hsl[a]?\(/,
	    _colorStringFilter = function _colorStringFilter(a) {
	  var combined = a.join(" "),
	      toHSL;
	  _colorExp.lastIndex = 0;

	  if (_colorExp.test(combined)) {
	    toHSL = _hslExp.test(combined);
	    a[1] = _formatColors(a[1], toHSL);
	    a[0] = _formatColors(a[0], toHSL, _colorOrderData(a[1])); // make sure the order of numbers/colors match with the END value.

	    return true;
	  }
	},

	/*
	 * --------------------------------------------------------------------------------------
	 * TICKER
	 * --------------------------------------------------------------------------------------
	 */
	_tickerActive,
	    _ticker = function () {
	  var _getTime = Date.now,
	      _lagThreshold = 500,
	      _adjustedLag = 33,
	      _startTime = _getTime(),
	      _lastUpdate = _startTime,
	      _gap = 1000 / 240,
	      _nextTime = _gap,
	      _listeners = [],
	      _id,
	      _req,
	      _raf,
	      _self,
	      _delta,
	      _i,
	      _tick = function _tick(v) {
	    var elapsed = _getTime() - _lastUpdate,
	        manual = v === true,
	        overlap,
	        dispatch,
	        time,
	        frame;

	    elapsed > _lagThreshold && (_startTime += elapsed - _adjustedLag);
	    _lastUpdate += elapsed;
	    time = _lastUpdate - _startTime;
	    overlap = time - _nextTime;

	    if (overlap > 0 || manual) {
	      frame = ++_self.frame;
	      _delta = time - _self.time * 1000;
	      _self.time = time = time / 1000;
	      _nextTime += overlap + (overlap >= _gap ? 4 : _gap - overlap);
	      dispatch = 1;
	    }

	    manual || (_id = _req(_tick)); //make sure the request is made before we dispatch the "tick" event so that timing is maintained. Otherwise, if processing the "tick" requires a bunch of time (like 15ms) and we're using a setTimeout() that's based on 16.7ms, it'd technically take 31.7ms between frames otherwise.

	    if (dispatch) {
	      for (_i = 0; _i < _listeners.length; _i++) {
	        // use _i and check _listeners.length instead of a variable because a listener could get removed during the loop, and if that happens to an element less than the current index, it'd throw things off in the loop.
	        _listeners[_i](time, _delta, frame, v);
	      }
	    }
	  };

	  _self = {
	    time: 0,
	    frame: 0,
	    tick: function tick() {
	      _tick(true);
	    },
	    deltaRatio: function deltaRatio(fps) {
	      return _delta / (1000 / (fps || 60));
	    },
	    wake: function wake() {
	      if (_coreReady) {
	        if (!_coreInitted && _windowExists$1()) {
	          _win$1 = _coreInitted = window;
	          _doc$1 = _win$1.document || {};
	          _globals.gsap = gsap;
	          (_win$1.gsapVersions || (_win$1.gsapVersions = [])).push(gsap.version);

	          _install(_installScope || _win$1.GreenSockGlobals || !_win$1.gsap && _win$1 || {});

	          _raf = _win$1.requestAnimationFrame;
	        }

	        _id && _self.sleep();

	        _req = _raf || function (f) {
	          return setTimeout(f, _nextTime - _self.time * 1000 + 1 | 0);
	        };

	        _tickerActive = 1;

	        _tick(2);
	      }
	    },
	    sleep: function sleep() {
	      (_raf ? _win$1.cancelAnimationFrame : clearTimeout)(_id);
	      _tickerActive = 0;
	      _req = _emptyFunc;
	    },
	    lagSmoothing: function lagSmoothing(threshold, adjustedLag) {
	      _lagThreshold = threshold || 1 / _tinyNum; //zero should be interpreted as basically unlimited

	      _adjustedLag = Math.min(adjustedLag, _lagThreshold, 0);
	    },
	    fps: function fps(_fps) {
	      _gap = 1000 / (_fps || 240);
	      _nextTime = _self.time * 1000 + _gap;
	    },
	    add: function add(callback, once, prioritize) {
	      var func = once ? function (t, d, f, v) {
	        callback(t, d, f, v);

	        _self.remove(func);
	      } : callback;

	      _self.remove(callback);

	      _listeners[prioritize ? "unshift" : "push"](func);

	      _wake();

	      return func;
	    },
	    remove: function remove(callback, i) {
	      ~(i = _listeners.indexOf(callback)) && _listeners.splice(i, 1) && _i >= i && _i--;
	    },
	    _listeners: _listeners
	  };
	  return _self;
	}(),
	    _wake = function _wake() {
	  return !_tickerActive && _ticker.wake();
	},
	    //also ensures the core classes are initialized.

	/*
	* -------------------------------------------------
	* EASING
	* -------------------------------------------------
	*/
	_easeMap = {},
	    _customEaseExp = /^[\d.\-M][\d.\-,\s]/,
	    _quotesExp = /["']/g,
	    _parseObjectInString = function _parseObjectInString(value) {
	  //takes a string like "{wiggles:10, type:anticipate})" and turns it into a real object. Notice it ends in ")" and includes the {} wrappers. This is because we only use this function for parsing ease configs and prioritized optimization rather than reusability.
	  var obj = {},
	      split = value.substr(1, value.length - 3).split(":"),
	      key = split[0],
	      i = 1,
	      l = split.length,
	      index,
	      val,
	      parsedVal;

	  for (; i < l; i++) {
	    val = split[i];
	    index = i !== l - 1 ? val.lastIndexOf(",") : val.length;
	    parsedVal = val.substr(0, index);
	    obj[key] = isNaN(parsedVal) ? parsedVal.replace(_quotesExp, "").trim() : +parsedVal;
	    key = val.substr(index + 1).trim();
	  }

	  return obj;
	},
	    _valueInParentheses = function _valueInParentheses(value) {
	  var open = value.indexOf("(") + 1,
	      close = value.indexOf(")"),
	      nested = value.indexOf("(", open);
	  return value.substring(open, ~nested && nested < close ? value.indexOf(")", close + 1) : close);
	},
	    _configEaseFromString = function _configEaseFromString(name) {
	  //name can be a string like "elastic.out(1,0.5)", and pass in _easeMap as obj and it'll parse it out and call the actual function like _easeMap.Elastic.easeOut.config(1,0.5). It will also parse custom ease strings as long as CustomEase is loaded and registered (internally as _easeMap._CE).
	  var split = (name + "").split("("),
	      ease = _easeMap[split[0]];
	  return ease && split.length > 1 && ease.config ? ease.config.apply(null, ~name.indexOf("{") ? [_parseObjectInString(split[1])] : _valueInParentheses(name).split(",").map(_numericIfPossible)) : _easeMap._CE && _customEaseExp.test(name) ? _easeMap._CE("", name) : ease;
	},
	    _invertEase = function _invertEase(ease) {
	  return function (p) {
	    return 1 - ease(1 - p);
	  };
	},
	    // allow yoyoEase to be set in children and have those affected when the parent/ancestor timeline yoyos.
	_propagateYoyoEase = function _propagateYoyoEase(timeline, isYoyo) {
	  var child = timeline._first,
	      ease;

	  while (child) {
	    if (child instanceof Timeline) {
	      _propagateYoyoEase(child, isYoyo);
	    } else if (child.vars.yoyoEase && (!child._yoyo || !child._repeat) && child._yoyo !== isYoyo) {
	      if (child.timeline) {
	        _propagateYoyoEase(child.timeline, isYoyo);
	      } else {
	        ease = child._ease;
	        child._ease = child._yEase;
	        child._yEase = ease;
	        child._yoyo = isYoyo;
	      }
	    }

	    child = child._next;
	  }
	},
	    _parseEase = function _parseEase(ease, defaultEase) {
	  return !ease ? defaultEase : (_isFunction(ease) ? ease : _easeMap[ease] || _configEaseFromString(ease)) || defaultEase;
	},
	    _insertEase = function _insertEase(names, easeIn, easeOut, easeInOut) {
	  if (easeOut === void 0) {
	    easeOut = function easeOut(p) {
	      return 1 - easeIn(1 - p);
	    };
	  }

	  if (easeInOut === void 0) {
	    easeInOut = function easeInOut(p) {
	      return p < .5 ? easeIn(p * 2) / 2 : 1 - easeIn((1 - p) * 2) / 2;
	    };
	  }

	  var ease = {
	    easeIn: easeIn,
	    easeOut: easeOut,
	    easeInOut: easeInOut
	  },
	      lowercaseName;

	  _forEachName(names, function (name) {
	    _easeMap[name] = _globals[name] = ease;
	    _easeMap[lowercaseName = name.toLowerCase()] = easeOut;

	    for (var p in ease) {
	      _easeMap[lowercaseName + (p === "easeIn" ? ".in" : p === "easeOut" ? ".out" : ".inOut")] = _easeMap[name + "." + p] = ease[p];
	    }
	  });

	  return ease;
	},
	    _easeInOutFromOut = function _easeInOutFromOut(easeOut) {
	  return function (p) {
	    return p < .5 ? (1 - easeOut(1 - p * 2)) / 2 : .5 + easeOut((p - .5) * 2) / 2;
	  };
	},
	    _configElastic = function _configElastic(type, amplitude, period) {
	  var p1 = amplitude >= 1 ? amplitude : 1,
	      //note: if amplitude is < 1, we simply adjust the period for a more natural feel. Otherwise the math doesn't work right and the curve starts at 1.
	  p2 = (period || (type ? .3 : .45)) / (amplitude < 1 ? amplitude : 1),
	      p3 = p2 / _2PI * (Math.asin(1 / p1) || 0),
	      easeOut = function easeOut(p) {
	    return p === 1 ? 1 : p1 * Math.pow(2, -10 * p) * _sin((p - p3) * p2) + 1;
	  },
	      ease = type === "out" ? easeOut : type === "in" ? function (p) {
	    return 1 - easeOut(1 - p);
	  } : _easeInOutFromOut(easeOut);

	  p2 = _2PI / p2; //precalculate to optimize

	  ease.config = function (amplitude, period) {
	    return _configElastic(type, amplitude, period);
	  };

	  return ease;
	},
	    _configBack = function _configBack(type, overshoot) {
	  if (overshoot === void 0) {
	    overshoot = 1.70158;
	  }

	  var easeOut = function easeOut(p) {
	    return p ? --p * p * ((overshoot + 1) * p + overshoot) + 1 : 0;
	  },
	      ease = type === "out" ? easeOut : type === "in" ? function (p) {
	    return 1 - easeOut(1 - p);
	  } : _easeInOutFromOut(easeOut);

	  ease.config = function (overshoot) {
	    return _configBack(type, overshoot);
	  };

	  return ease;
	}; // a cheaper (kb and cpu) but more mild way to get a parameterized weighted ease by feeding in a value between -1 (easeIn) and 1 (easeOut) where 0 is linear.
	// _weightedEase = ratio => {
	// 	let y = 0.5 + ratio / 2;
	// 	return p => (2 * (1 - p) * p * y + p * p);
	// },
	// a stronger (but more expensive kb/cpu) parameterized weighted ease that lets you feed in a value between -1 (easeIn) and 1 (easeOut) where 0 is linear.
	// _weightedEaseStrong = ratio => {
	// 	ratio = .5 + ratio / 2;
	// 	let o = 1 / 3 * (ratio < .5 ? ratio : 1 - ratio),
	// 		b = ratio - o,
	// 		c = ratio + o;
	// 	return p => p === 1 ? p : 3 * b * (1 - p) * (1 - p) * p + 3 * c * (1 - p) * p * p + p * p * p;
	// };


	_forEachName("Linear,Quad,Cubic,Quart,Quint,Strong", function (name, i) {
	  var power = i < 5 ? i + 1 : i;

	  _insertEase(name + ",Power" + (power - 1), i ? function (p) {
	    return Math.pow(p, power);
	  } : function (p) {
	    return p;
	  }, function (p) {
	    return 1 - Math.pow(1 - p, power);
	  }, function (p) {
	    return p < .5 ? Math.pow(p * 2, power) / 2 : 1 - Math.pow((1 - p) * 2, power) / 2;
	  });
	});

	_easeMap.Linear.easeNone = _easeMap.none = _easeMap.Linear.easeIn;

	_insertEase("Elastic", _configElastic("in"), _configElastic("out"), _configElastic());

	(function (n, c) {
	  var n1 = 1 / c,
	      n2 = 2 * n1,
	      n3 = 2.5 * n1,
	      easeOut = function easeOut(p) {
	    return p < n1 ? n * p * p : p < n2 ? n * Math.pow(p - 1.5 / c, 2) + .75 : p < n3 ? n * (p -= 2.25 / c) * p + .9375 : n * Math.pow(p - 2.625 / c, 2) + .984375;
	  };

	  _insertEase("Bounce", function (p) {
	    return 1 - easeOut(1 - p);
	  }, easeOut);
	})(7.5625, 2.75);

	_insertEase("Expo", function (p) {
	  return p ? Math.pow(2, 10 * (p - 1)) : 0;
	});

	_insertEase("Circ", function (p) {
	  return -(_sqrt(1 - p * p) - 1);
	});

	_insertEase("Sine", function (p) {
	  return p === 1 ? 1 : -_cos(p * _HALF_PI) + 1;
	});

	_insertEase("Back", _configBack("in"), _configBack("out"), _configBack());

	_easeMap.SteppedEase = _easeMap.steps = _globals.SteppedEase = {
	  config: function config(steps, immediateStart) {
	    if (steps === void 0) {
	      steps = 1;
	    }

	    var p1 = 1 / steps,
	        p2 = steps + (immediateStart ? 0 : 1),
	        p3 = immediateStart ? 1 : 0,
	        max = 1 - _tinyNum;
	    return function (p) {
	      return ((p2 * _clamp(0, max, p) | 0) + p3) * p1;
	    };
	  }
	};
	_defaults.ease = _easeMap["quad.out"];

	_forEachName("onComplete,onUpdate,onStart,onRepeat,onReverseComplete,onInterrupt", function (name) {
	  return _callbackNames += name + "," + name + "Params,";
	});
	/*
	 * --------------------------------------------------------------------------------------
	 * CACHE
	 * --------------------------------------------------------------------------------------
	 */


	var GSCache = function GSCache(target, harness) {
	  this.id = _gsID++;
	  target._gsap = this;
	  this.target = target;
	  this.harness = harness;
	  this.get = harness ? harness.get : _getProperty;
	  this.set = harness ? harness.getSetter : _getSetter;
	};
	/*
	 * --------------------------------------------------------------------------------------
	 * ANIMATION
	 * --------------------------------------------------------------------------------------
	 */

	var Animation = /*#__PURE__*/function () {
	  function Animation(vars) {
	    this.vars = vars;
	    this._delay = +vars.delay || 0;

	    if (this._repeat = vars.repeat === Infinity ? -2 : vars.repeat || 0) {
	      // TODO: repeat: Infinity on a timeline's children must flag that timeline internally and affect its totalDuration, otherwise it'll stop in the negative direction when reaching the start.
	      this._rDelay = vars.repeatDelay || 0;
	      this._yoyo = !!vars.yoyo || !!vars.yoyoEase;
	    }

	    this._ts = 1;

	    _setDuration(this, +vars.duration, 1, 1);

	    this.data = vars.data;
	    _tickerActive || _ticker.wake();
	  }

	  var _proto = Animation.prototype;

	  _proto.delay = function delay(value) {
	    if (value || value === 0) {
	      this.parent && this.parent.smoothChildTiming && this.startTime(this._start + value - this._delay);
	      this._delay = value;
	      return this;
	    }

	    return this._delay;
	  };

	  _proto.duration = function duration(value) {
	    return arguments.length ? this.totalDuration(this._repeat > 0 ? value + (value + this._rDelay) * this._repeat : value) : this.totalDuration() && this._dur;
	  };

	  _proto.totalDuration = function totalDuration(value) {
	    if (!arguments.length) {
	      return this._tDur;
	    }

	    this._dirty = 0;
	    return _setDuration(this, this._repeat < 0 ? value : (value - this._repeat * this._rDelay) / (this._repeat + 1));
	  };

	  _proto.totalTime = function totalTime(_totalTime, suppressEvents) {
	    _wake();

	    if (!arguments.length) {
	      return this._tTime;
	    }

	    var parent = this._dp;

	    if (parent && parent.smoothChildTiming && this._ts) {
	      _alignPlayhead(this, _totalTime);

	      !parent._dp || parent.parent || _postAddChecks(parent, this); // edge case: if this is a child of a timeline that already completed, for example, we must re-activate the parent.
	      //in case any of the ancestor timelines had completed but should now be enabled, we should reset their totalTime() which will also ensure that they're lined up properly and enabled. Skip for animations that are on the root (wasteful). Example: a TimelineLite.exportRoot() is performed when there's a paused tween on the root, the export will not complete until that tween is unpaused, but imagine a child gets restarted later, after all [unpaused] tweens have completed. The start of that child would get pushed out, but one of the ancestors may have completed.

	      while (parent && parent.parent) {
	        if (parent.parent._time !== parent._start + (parent._ts >= 0 ? parent._tTime / parent._ts : (parent.totalDuration() - parent._tTime) / -parent._ts)) {
	          parent.totalTime(parent._tTime, true);
	        }

	        parent = parent.parent;
	      }

	      if (!this.parent && this._dp.autoRemoveChildren && (this._ts > 0 && _totalTime < this._tDur || this._ts < 0 && _totalTime > 0 || !this._tDur && !_totalTime)) {
	        //if the animation doesn't have a parent, put it back into its last parent (recorded as _dp for exactly cases like this). Limit to parents with autoRemoveChildren (like globalTimeline) so that if the user manually removes an animation from a timeline and then alters its playhead, it doesn't get added back in.
	        _addToTimeline(this._dp, this, this._start - this._delay);
	      }
	    }

	    if (this._tTime !== _totalTime || !this._dur && !suppressEvents || this._initted && Math.abs(this._zTime) === _tinyNum || !_totalTime && !this._initted && (this.add || this._ptLookup)) {
	      // check for _ptLookup on a Tween instance to ensure it has actually finished being instantiated, otherwise if this.reverse() gets called in the Animation constructor, it could trigger a render() here even though the _targets weren't populated, thus when _init() is called there won't be any PropTweens (it'll act like the tween is non-functional)
	      this._ts || (this._pTime = _totalTime); // otherwise, if an animation is paused, then the playhead is moved back to zero, then resumed, it'd revert back to the original time at the pause
	      //if (!this._lock) { // avoid endless recursion (not sure we need this yet or if it's worth the performance hit)
	      //   this._lock = 1;

	      _lazySafeRender(this, _totalTime, suppressEvents); //   this._lock = 0;
	      //}

	    }

	    return this;
	  };

	  _proto.time = function time(value, suppressEvents) {
	    return arguments.length ? this.totalTime(Math.min(this.totalDuration(), value + _elapsedCycleDuration(this)) % (this._dur + this._rDelay) || (value ? this._dur : 0), suppressEvents) : this._time; // note: if the modulus results in 0, the playhead could be exactly at the end or the beginning, and we always defer to the END with a non-zero value, otherwise if you set the time() to the very end (duration()), it would render at the START!
	  };

	  _proto.totalProgress = function totalProgress(value, suppressEvents) {
	    return arguments.length ? this.totalTime(this.totalDuration() * value, suppressEvents) : this.totalDuration() ? Math.min(1, this._tTime / this._tDur) : this.ratio;
	  };

	  _proto.progress = function progress(value, suppressEvents) {
	    return arguments.length ? this.totalTime(this.duration() * (this._yoyo && !(this.iteration() & 1) ? 1 - value : value) + _elapsedCycleDuration(this), suppressEvents) : this.duration() ? Math.min(1, this._time / this._dur) : this.ratio;
	  };

	  _proto.iteration = function iteration(value, suppressEvents) {
	    var cycleDuration = this.duration() + this._rDelay;

	    return arguments.length ? this.totalTime(this._time + (value - 1) * cycleDuration, suppressEvents) : this._repeat ? _animationCycle(this._tTime, cycleDuration) + 1 : 1;
	  } // potential future addition:
	  // isPlayingBackwards() {
	  // 	let animation = this,
	  // 		orientation = 1; // 1 = forward, -1 = backward
	  // 	while (animation) {
	  // 		orientation *= animation.reversed() || (animation.repeat() && !(animation.iteration() & 1)) ? -1 : 1;
	  // 		animation = animation.parent;
	  // 	}
	  // 	return orientation < 0;
	  // }
	  ;

	  _proto.timeScale = function timeScale(value) {
	    if (!arguments.length) {
	      return this._rts === -_tinyNum ? 0 : this._rts; // recorded timeScale. Special case: if someone calls reverse() on an animation with timeScale of 0, we assign it -_tinyNum to remember it's reversed.
	    }

	    if (this._rts === value) {
	      return this;
	    }

	    var tTime = this.parent && this._ts ? _parentToChildTotalTime(this.parent._time, this) : this._tTime; // make sure to do the parentToChildTotalTime() BEFORE setting the new _ts because the old one must be used in that calculation.
	    // future addition? Up side: fast and minimal file size. Down side: only works on this animation; if a timeline is reversed, for example, its childrens' onReverse wouldn't get called.
	    //(+value < 0 && this._rts >= 0) && _callback(this, "onReverse", true);
	    // prioritize rendering where the parent's playhead lines up instead of this._tTime because there could be a tween that's animating another tween's timeScale in the same rendering loop (same parent), thus if the timeScale tween renders first, it would alter _start BEFORE _tTime was set on that tick (in the rendering loop), effectively freezing it until the timeScale tween finishes.

	    this._rts = +value || 0;
	    this._ts = this._ps || value === -_tinyNum ? 0 : this._rts; // _ts is the functional timeScale which would be 0 if the animation is paused.

	    this.totalTime(_clamp(-this._delay, this._tDur, tTime), true);

	    _setEnd(this); // if parent.smoothChildTiming was false, the end time didn't get updated in the _alignPlayhead() method, so do it here.


	    return _recacheAncestors(this);
	  };

	  _proto.paused = function paused(value) {
	    if (!arguments.length) {
	      return this._ps;
	    }

	    if (this._ps !== value) {
	      this._ps = value;

	      if (value) {
	        this._pTime = this._tTime || Math.max(-this._delay, this.rawTime()); // if the pause occurs during the delay phase, make sure that's factored in when resuming.

	        this._ts = this._act = 0; // _ts is the functional timeScale, so a paused tween would effectively have a timeScale of 0. We record the "real" timeScale as _rts (recorded time scale)
	      } else {
	        _wake();

	        this._ts = this._rts; //only defer to _pTime (pauseTime) if tTime is zero. Remember, someone could pause() an animation, then scrub the playhead and resume(). If the parent doesn't have smoothChildTiming, we render at the rawTime() because the startTime won't get updated.

	        this.totalTime(this.parent && !this.parent.smoothChildTiming ? this.rawTime() : this._tTime || this._pTime, this.progress() === 1 && Math.abs(this._zTime) !== _tinyNum && (this._tTime -= _tinyNum)); // edge case: animation.progress(1).pause().play() wouldn't render again because the playhead is already at the end, but the call to totalTime() below will add it back to its parent...and not remove it again (since removing only happens upon rendering at a new time). Offsetting the _tTime slightly is done simply to cause the final render in totalTime() that'll pop it off its timeline (if autoRemoveChildren is true, of course). Check to make sure _zTime isn't -_tinyNum to avoid an edge case where the playhead is pushed to the end but INSIDE a tween/callback, the timeline itself is paused thus halting rendering and leaving a few unrendered. When resuming, it wouldn't render those otherwise.
	      }
	    }

	    return this;
	  };

	  _proto.startTime = function startTime(value) {
	    if (arguments.length) {
	      this._start = value;
	      var parent = this.parent || this._dp;
	      parent && (parent._sort || !this.parent) && _addToTimeline(parent, this, value - this._delay);
	      return this;
	    }

	    return this._start;
	  };

	  _proto.endTime = function endTime(includeRepeats) {
	    return this._start + (_isNotFalse(includeRepeats) ? this.totalDuration() : this.duration()) / Math.abs(this._ts || 1);
	  };

	  _proto.rawTime = function rawTime(wrapRepeats) {
	    var parent = this.parent || this._dp; // _dp = detached parent

	    return !parent ? this._tTime : wrapRepeats && (!this._ts || this._repeat && this._time && this.totalProgress() < 1) ? this._tTime % (this._dur + this._rDelay) : !this._ts ? this._tTime : _parentToChildTotalTime(parent.rawTime(wrapRepeats), this);
	  };

	  _proto.globalTime = function globalTime(rawTime) {
	    var animation = this,
	        time = arguments.length ? rawTime : animation.rawTime();

	    while (animation) {
	      time = animation._start + time / (animation._ts || 1);
	      animation = animation._dp;
	    }

	    return time;
	  };

	  _proto.repeat = function repeat(value) {
	    if (arguments.length) {
	      this._repeat = value === Infinity ? -2 : value;
	      return _onUpdateTotalDuration(this);
	    }

	    return this._repeat === -2 ? Infinity : this._repeat;
	  };

	  _proto.repeatDelay = function repeatDelay(value) {
	    if (arguments.length) {
	      var time = this._time;
	      this._rDelay = value;

	      _onUpdateTotalDuration(this);

	      return time ? this.time(time) : this;
	    }

	    return this._rDelay;
	  };

	  _proto.yoyo = function yoyo(value) {
	    if (arguments.length) {
	      this._yoyo = value;
	      return this;
	    }

	    return this._yoyo;
	  };

	  _proto.seek = function seek(position, suppressEvents) {
	    return this.totalTime(_parsePosition(this, position), _isNotFalse(suppressEvents));
	  };

	  _proto.restart = function restart(includeDelay, suppressEvents) {
	    return this.play().totalTime(includeDelay ? -this._delay : 0, _isNotFalse(suppressEvents));
	  };

	  _proto.play = function play(from, suppressEvents) {
	    from != null && this.seek(from, suppressEvents);
	    return this.reversed(false).paused(false);
	  };

	  _proto.reverse = function reverse(from, suppressEvents) {
	    from != null && this.seek(from || this.totalDuration(), suppressEvents);
	    return this.reversed(true).paused(false);
	  };

	  _proto.pause = function pause(atTime, suppressEvents) {
	    atTime != null && this.seek(atTime, suppressEvents);
	    return this.paused(true);
	  };

	  _proto.resume = function resume() {
	    return this.paused(false);
	  };

	  _proto.reversed = function reversed(value) {
	    if (arguments.length) {
	      !!value !== this.reversed() && this.timeScale(-this._rts || (value ? -_tinyNum : 0)); // in case timeScale is zero, reversing would have no effect so we use _tinyNum.

	      return this;
	    }

	    return this._rts < 0;
	  };

	  _proto.invalidate = function invalidate() {
	    this._initted = this._act = 0;
	    this._zTime = -_tinyNum;
	    return this;
	  };

	  _proto.isActive = function isActive() {
	    var parent = this.parent || this._dp,
	        start = this._start,
	        rawTime;
	    return !!(!parent || this._ts && this._initted && parent.isActive() && (rawTime = parent.rawTime(true)) >= start && rawTime < this.endTime(true) - _tinyNum);
	  };

	  _proto.eventCallback = function eventCallback(type, callback, params) {
	    var vars = this.vars;

	    if (arguments.length > 1) {
	      if (!callback) {
	        delete vars[type];
	      } else {
	        vars[type] = callback;
	        params && (vars[type + "Params"] = params);
	        type === "onUpdate" && (this._onUpdate = callback);
	      }

	      return this;
	    }

	    return vars[type];
	  };

	  _proto.then = function then(onFulfilled) {
	    var self = this;
	    return new Promise(function (resolve) {
	      var f = _isFunction(onFulfilled) ? onFulfilled : _passThrough,
	          _resolve = function _resolve() {
	        var _then = self.then;
	        self.then = null; // temporarily null the then() method to avoid an infinite loop (see https://github.com/greensock/GSAP/issues/322)

	        _isFunction(f) && (f = f(self)) && (f.then || f === self) && (self.then = _then);
	        resolve(f);
	        self.then = _then;
	      };

	      if (self._initted && self.totalProgress() === 1 && self._ts >= 0 || !self._tTime && self._ts < 0) {
	        _resolve();
	      } else {
	        self._prom = _resolve;
	      }
	    });
	  };

	  _proto.kill = function kill() {
	    _interrupt(this);
	  };

	  return Animation;
	}();

	_setDefaults(Animation.prototype, {
	  _time: 0,
	  _start: 0,
	  _end: 0,
	  _tTime: 0,
	  _tDur: 0,
	  _dirty: 0,
	  _repeat: 0,
	  _yoyo: false,
	  parent: null,
	  _initted: false,
	  _rDelay: 0,
	  _ts: 1,
	  _dp: 0,
	  ratio: 0,
	  _zTime: -_tinyNum,
	  _prom: 0,
	  _ps: false,
	  _rts: 1
	});
	/*
	 * -------------------------------------------------
	 * TIMELINE
	 * -------------------------------------------------
	 */


	var Timeline = /*#__PURE__*/function (_Animation) {
	  _inheritsLoose(Timeline, _Animation);

	  function Timeline(vars, position) {
	    var _this;

	    if (vars === void 0) {
	      vars = {};
	    }

	    _this = _Animation.call(this, vars) || this;
	    _this.labels = {};
	    _this.smoothChildTiming = !!vars.smoothChildTiming;
	    _this.autoRemoveChildren = !!vars.autoRemoveChildren;
	    _this._sort = _isNotFalse(vars.sortChildren);
	    _globalTimeline && _addToTimeline(vars.parent || _globalTimeline, _assertThisInitialized(_this), position);
	    vars.reversed && _this.reverse();
	    vars.paused && _this.paused(true);
	    vars.scrollTrigger && _scrollTrigger(_assertThisInitialized(_this), vars.scrollTrigger);
	    return _this;
	  }

	  var _proto2 = Timeline.prototype;

	  _proto2.to = function to(targets, vars, position) {
	    _createTweenType(0, arguments, this);

	    return this;
	  };

	  _proto2.from = function from(targets, vars, position) {
	    _createTweenType(1, arguments, this);

	    return this;
	  };

	  _proto2.fromTo = function fromTo(targets, fromVars, toVars, position) {
	    _createTweenType(2, arguments, this);

	    return this;
	  };

	  _proto2.set = function set(targets, vars, position) {
	    vars.duration = 0;
	    vars.parent = this;
	    _inheritDefaults(vars).repeatDelay || (vars.repeat = 0);
	    vars.immediateRender = !!vars.immediateRender;
	    new Tween(targets, vars, _parsePosition(this, position), 1);
	    return this;
	  };

	  _proto2.call = function call(callback, params, position) {
	    return _addToTimeline(this, Tween.delayedCall(0, callback, params), position);
	  } //ONLY for backward compatibility! Maybe delete?
	  ;

	  _proto2.staggerTo = function staggerTo(targets, duration, vars, stagger, position, onCompleteAll, onCompleteAllParams) {
	    vars.duration = duration;
	    vars.stagger = vars.stagger || stagger;
	    vars.onComplete = onCompleteAll;
	    vars.onCompleteParams = onCompleteAllParams;
	    vars.parent = this;
	    new Tween(targets, vars, _parsePosition(this, position));
	    return this;
	  };

	  _proto2.staggerFrom = function staggerFrom(targets, duration, vars, stagger, position, onCompleteAll, onCompleteAllParams) {
	    vars.runBackwards = 1;
	    _inheritDefaults(vars).immediateRender = _isNotFalse(vars.immediateRender);
	    return this.staggerTo(targets, duration, vars, stagger, position, onCompleteAll, onCompleteAllParams);
	  };

	  _proto2.staggerFromTo = function staggerFromTo(targets, duration, fromVars, toVars, stagger, position, onCompleteAll, onCompleteAllParams) {
	    toVars.startAt = fromVars;
	    _inheritDefaults(toVars).immediateRender = _isNotFalse(toVars.immediateRender);
	    return this.staggerTo(targets, duration, toVars, stagger, position, onCompleteAll, onCompleteAllParams);
	  };

	  _proto2.render = function render(totalTime, suppressEvents, force) {
	    var prevTime = this._time,
	        tDur = this._dirty ? this.totalDuration() : this._tDur,
	        dur = this._dur,
	        tTime = totalTime <= 0 ? 0 : _roundPrecise(totalTime),
	        // if a paused timeline is resumed (or its _start is updated for another reason...which rounds it), that could result in the playhead shifting a **tiny** amount and a zero-duration child at that spot may get rendered at a different ratio, like its totalTime in render() may be 1e-17 instead of 0, for example.
	    crossingStart = this._zTime < 0 !== totalTime < 0 && (this._initted || !dur),
	        time,
	        child,
	        next,
	        iteration,
	        cycleDuration,
	        prevPaused,
	        pauseTween,
	        timeScale,
	        prevStart,
	        prevIteration,
	        yoyo,
	        isYoyo;
	    this !== _globalTimeline && tTime > tDur && totalTime >= 0 && (tTime = tDur);

	    if (tTime !== this._tTime || force || crossingStart) {
	      if (prevTime !== this._time && dur) {
	        //if totalDuration() finds a child with a negative startTime and smoothChildTiming is true, things get shifted around internally so we need to adjust the time accordingly. For example, if a tween starts at -30 we must shift EVERYTHING forward 30 seconds and move this timeline's startTime backward by 30 seconds so that things align with the playhead (no jump).
	        tTime += this._time - prevTime;
	        totalTime += this._time - prevTime;
	      }

	      time = tTime;
	      prevStart = this._start;
	      timeScale = this._ts;
	      prevPaused = !timeScale;

	      if (crossingStart) {
	        dur || (prevTime = this._zTime); //when the playhead arrives at EXACTLY time 0 (right on top) of a zero-duration timeline, we need to discern if events are suppressed so that when the playhead moves again (next time), it'll trigger the callback. If events are NOT suppressed, obviously the callback would be triggered in this render. Basically, the callback should fire either when the playhead ARRIVES or LEAVES this exact spot, not both. Imagine doing a timeline.seek(0) and there's a callback that sits at 0. Since events are suppressed on that seek() by default, nothing will fire, but when the playhead moves off of that position, the callback should fire. This behavior is what people intuitively expect.

	        (totalTime || !suppressEvents) && (this._zTime = totalTime);
	      }

	      if (this._repeat) {
	        //adjust the time for repeats and yoyos
	        yoyo = this._yoyo;
	        cycleDuration = dur + this._rDelay;

	        if (this._repeat < -1 && totalTime < 0) {
	          return this.totalTime(cycleDuration * 100 + totalTime, suppressEvents, force);
	        }

	        time = _roundPrecise(tTime % cycleDuration); //round to avoid floating point errors. (4 % 0.8 should be 0 but some browsers report it as 0.79999999!)

	        if (tTime === tDur) {
	          // the tDur === tTime is for edge cases where there's a lengthy decimal on the duration and it may reach the very end but the time is rendered as not-quite-there (remember, tDur is rounded to 4 decimals whereas dur isn't)
	          iteration = this._repeat;
	          time = dur;
	        } else {
	          iteration = ~~(tTime / cycleDuration);

	          if (iteration && iteration === tTime / cycleDuration) {
	            time = dur;
	            iteration--;
	          }

	          time > dur && (time = dur);
	        }

	        prevIteration = _animationCycle(this._tTime, cycleDuration);
	        !prevTime && this._tTime && prevIteration !== iteration && (prevIteration = iteration); // edge case - if someone does addPause() at the very beginning of a repeating timeline, that pause is technically at the same spot as the end which causes this._time to get set to 0 when the totalTime would normally place the playhead at the end. See https://greensock.com/forums/topic/23823-closing-nav-animation-not-working-on-ie-and-iphone-6-maybe-other-older-browser/?tab=comments#comment-113005

	        if (yoyo && iteration & 1) {
	          time = dur - time;
	          isYoyo = 1;
	        }
	        /*
	        make sure children at the end/beginning of the timeline are rendered properly. If, for example,
	        a 3-second long timeline rendered at 2.9 seconds previously, and now renders at 3.2 seconds (which
	        would get translated to 2.8 seconds if the timeline yoyos or 0.2 seconds if it just repeats), there
	        could be a callback or a short tween that's at 2.95 or 3 seconds in which wouldn't render. So
	        we need to push the timeline to the end (and/or beginning depending on its yoyo value). Also we must
	        ensure that zero-duration tweens at the very beginning or end of the Timeline work.
	        */


	        if (iteration !== prevIteration && !this._lock) {
	          var rewinding = yoyo && prevIteration & 1,
	              doesWrap = rewinding === (yoyo && iteration & 1);
	          iteration < prevIteration && (rewinding = !rewinding);
	          prevTime = rewinding ? 0 : dur;
	          this._lock = 1;
	          this.render(prevTime || (isYoyo ? 0 : _roundPrecise(iteration * cycleDuration)), suppressEvents, !dur)._lock = 0;
	          this._tTime = tTime; // if a user gets the iteration() inside the onRepeat, for example, it should be accurate.

	          !suppressEvents && this.parent && _callback(this, "onRepeat");
	          this.vars.repeatRefresh && !isYoyo && (this.invalidate()._lock = 1);

	          if (prevTime && prevTime !== this._time || prevPaused !== !this._ts || this.vars.onRepeat && !this.parent && !this._act) {
	            // if prevTime is 0 and we render at the very end, _time will be the end, thus won't match. So in this edge case, prevTime won't match _time but that's okay. If it gets killed in the onRepeat, eject as well.
	            return this;
	          }

	          dur = this._dur; // in case the duration changed in the onRepeat

	          tDur = this._tDur;

	          if (doesWrap) {
	            this._lock = 2;
	            prevTime = rewinding ? dur : -0.0001;
	            this.render(prevTime, true);
	            this.vars.repeatRefresh && !isYoyo && this.invalidate();
	          }

	          this._lock = 0;

	          if (!this._ts && !prevPaused) {
	            return this;
	          } //in order for yoyoEase to work properly when there's a stagger, we must swap out the ease in each sub-tween.


	          _propagateYoyoEase(this, isYoyo);
	        }
	      }

	      if (this._hasPause && !this._forcing && this._lock < 2) {
	        pauseTween = _findNextPauseTween(this, _roundPrecise(prevTime), _roundPrecise(time));

	        if (pauseTween) {
	          tTime -= time - (time = pauseTween._start);
	        }
	      }

	      this._tTime = tTime;
	      this._time = time;
	      this._act = !timeScale; //as long as it's not paused, force it to be active so that if the user renders independent of the parent timeline, it'll be forced to re-render on the next tick.

	      if (!this._initted) {
	        this._onUpdate = this.vars.onUpdate;
	        this._initted = 1;
	        this._zTime = totalTime;
	        prevTime = 0; // upon init, the playhead should always go forward; someone could invalidate() a completed timeline and then if they restart(), that would make child tweens render in reverse order which could lock in the wrong starting values if they build on each other, like tl.to(obj, {x: 100}).to(obj, {x: 0}).
	      }

	      if (!prevTime && time && !suppressEvents) {
	        _callback(this, "onStart");

	        if (this._tTime !== tTime) {
	          // in case the onStart triggered a render at a different spot, eject. Like if someone did animation.pause(0.5) or something inside the onStart.
	          return this;
	        }
	      }

	      if (time >= prevTime && totalTime >= 0) {
	        child = this._first;

	        while (child) {
	          next = child._next;

	          if ((child._act || time >= child._start) && child._ts && pauseTween !== child) {
	            if (child.parent !== this) {
	              // an extreme edge case - the child's render could do something like kill() the "next" one in the linked list, or reparent it. In that case we must re-initiate the whole render to be safe.
	              return this.render(totalTime, suppressEvents, force);
	            }

	            child.render(child._ts > 0 ? (time - child._start) * child._ts : (child._dirty ? child.totalDuration() : child._tDur) + (time - child._start) * child._ts, suppressEvents, force);

	            if (time !== this._time || !this._ts && !prevPaused) {
	              //in case a tween pauses or seeks the timeline when rendering, like inside of an onUpdate/onComplete
	              pauseTween = 0;
	              next && (tTime += this._zTime = -_tinyNum); // it didn't finish rendering, so flag zTime as negative so that so that the next time render() is called it'll be forced (to render any remaining children)

	              break;
	            }
	          }

	          child = next;
	        }
	      } else {
	        child = this._last;
	        var adjustedTime = totalTime < 0 ? totalTime : time; //when the playhead goes backward beyond the start of this timeline, we must pass that information down to the child animations so that zero-duration tweens know whether to render their starting or ending values.

	        while (child) {
	          next = child._prev;

	          if ((child._act || adjustedTime <= child._end) && child._ts && pauseTween !== child) {
	            if (child.parent !== this) {
	              // an extreme edge case - the child's render could do something like kill() the "next" one in the linked list, or reparent it. In that case we must re-initiate the whole render to be safe.
	              return this.render(totalTime, suppressEvents, force);
	            }

	            child.render(child._ts > 0 ? (adjustedTime - child._start) * child._ts : (child._dirty ? child.totalDuration() : child._tDur) + (adjustedTime - child._start) * child._ts, suppressEvents, force);

	            if (time !== this._time || !this._ts && !prevPaused) {
	              //in case a tween pauses or seeks the timeline when rendering, like inside of an onUpdate/onComplete
	              pauseTween = 0;
	              next && (tTime += this._zTime = adjustedTime ? -_tinyNum : _tinyNum); // it didn't finish rendering, so adjust zTime so that so that the next time render() is called it'll be forced (to render any remaining children)

	              break;
	            }
	          }

	          child = next;
	        }
	      }

	      if (pauseTween && !suppressEvents) {
	        this.pause();
	        pauseTween.render(time >= prevTime ? 0 : -_tinyNum)._zTime = time >= prevTime ? 1 : -1;

	        if (this._ts) {
	          //the callback resumed playback! So since we may have held back the playhead due to where the pause is positioned, go ahead and jump to where it's SUPPOSED to be (if no pause happened).
	          this._start = prevStart; //if the pause was at an earlier time and the user resumed in the callback, it could reposition the timeline (changing its startTime), throwing things off slightly, so we make sure the _start doesn't shift.

	          _setEnd(this);

	          return this.render(totalTime, suppressEvents, force);
	        }
	      }

	      this._onUpdate && !suppressEvents && _callback(this, "onUpdate", true);
	      if (tTime === tDur && this._tTime >= this.totalDuration() || !tTime && prevTime) if (prevStart === this._start || Math.abs(timeScale) !== Math.abs(this._ts)) if (!this._lock) {
	        // remember, a child's callback may alter this timeline's playhead or timeScale which is why we need to add some of these checks.
	        (totalTime || !dur) && (tTime === tDur && this._ts > 0 || !tTime && this._ts < 0) && _removeFromParent(this, 1); // don't remove if the timeline is reversed and the playhead isn't at 0, otherwise tl.progress(1).reverse() won't work. Only remove if the playhead is at the end and timeScale is positive, or if the playhead is at 0 and the timeScale is negative.

	        if (!suppressEvents && !(totalTime < 0 && !prevTime) && (tTime || prevTime || !tDur)) {
	          _callback(this, tTime === tDur && totalTime >= 0 ? "onComplete" : "onReverseComplete", true);

	          this._prom && !(tTime < tDur && this.timeScale() > 0) && this._prom();
	        }
	      }
	    }

	    return this;
	  };

	  _proto2.add = function add(child, position) {
	    var _this2 = this;

	    _isNumber(position) || (position = _parsePosition(this, position, child));

	    if (!(child instanceof Animation)) {
	      if (_isArray(child)) {
	        child.forEach(function (obj) {
	          return _this2.add(obj, position);
	        });
	        return this;
	      }

	      if (_isString(child)) {
	        return this.addLabel(child, position);
	      }

	      if (_isFunction(child)) {
	        child = Tween.delayedCall(0, child);
	      } else {
	        return this;
	      }
	    }

	    return this !== child ? _addToTimeline(this, child, position) : this; //don't allow a timeline to be added to itself as a child!
	  };

	  _proto2.getChildren = function getChildren(nested, tweens, timelines, ignoreBeforeTime) {
	    if (nested === void 0) {
	      nested = true;
	    }

	    if (tweens === void 0) {
	      tweens = true;
	    }

	    if (timelines === void 0) {
	      timelines = true;
	    }

	    if (ignoreBeforeTime === void 0) {
	      ignoreBeforeTime = -_bigNum$1;
	    }

	    var a = [],
	        child = this._first;

	    while (child) {
	      if (child._start >= ignoreBeforeTime) {
	        if (child instanceof Tween) {
	          tweens && a.push(child);
	        } else {
	          timelines && a.push(child);
	          nested && a.push.apply(a, child.getChildren(true, tweens, timelines));
	        }
	      }

	      child = child._next;
	    }

	    return a;
	  };

	  _proto2.getById = function getById(id) {
	    var animations = this.getChildren(1, 1, 1),
	        i = animations.length;

	    while (i--) {
	      if (animations[i].vars.id === id) {
	        return animations[i];
	      }
	    }
	  };

	  _proto2.remove = function remove(child) {
	    if (_isString(child)) {
	      return this.removeLabel(child);
	    }

	    if (_isFunction(child)) {
	      return this.killTweensOf(child);
	    }

	    _removeLinkedListItem(this, child);

	    if (child === this._recent) {
	      this._recent = this._last;
	    }

	    return _uncache(this);
	  };

	  _proto2.totalTime = function totalTime(_totalTime2, suppressEvents) {
	    if (!arguments.length) {
	      return this._tTime;
	    }

	    this._forcing = 1;

	    if (!this._dp && this._ts) {
	      //special case for the global timeline (or any other that has no parent or detached parent).
	      this._start = _roundPrecise(_ticker.time - (this._ts > 0 ? _totalTime2 / this._ts : (this.totalDuration() - _totalTime2) / -this._ts));
	    }

	    _Animation.prototype.totalTime.call(this, _totalTime2, suppressEvents);

	    this._forcing = 0;
	    return this;
	  };

	  _proto2.addLabel = function addLabel(label, position) {
	    this.labels[label] = _parsePosition(this, position);
	    return this;
	  };

	  _proto2.removeLabel = function removeLabel(label) {
	    delete this.labels[label];
	    return this;
	  };

	  _proto2.addPause = function addPause(position, callback, params) {
	    var t = Tween.delayedCall(0, callback || _emptyFunc, params);
	    t.data = "isPause";
	    this._hasPause = 1;
	    return _addToTimeline(this, t, _parsePosition(this, position));
	  };

	  _proto2.removePause = function removePause(position) {
	    var child = this._first;
	    position = _parsePosition(this, position);

	    while (child) {
	      if (child._start === position && child.data === "isPause") {
	        _removeFromParent(child);
	      }

	      child = child._next;
	    }
	  };

	  _proto2.killTweensOf = function killTweensOf(targets, props, onlyActive) {
	    var tweens = this.getTweensOf(targets, onlyActive),
	        i = tweens.length;

	    while (i--) {
	      _overwritingTween !== tweens[i] && tweens[i].kill(targets, props);
	    }

	    return this;
	  };

	  _proto2.getTweensOf = function getTweensOf(targets, onlyActive) {
	    var a = [],
	        parsedTargets = toArray(targets),
	        child = this._first,
	        isGlobalTime = _isNumber(onlyActive),
	        // a number is interpreted as a global time. If the animation spans
	    children;

	    while (child) {
	      if (child instanceof Tween) {
	        if (_arrayContainsAny(child._targets, parsedTargets) && (isGlobalTime ? (!_overwritingTween || child._initted && child._ts) && child.globalTime(0) <= onlyActive && child.globalTime(child.totalDuration()) > onlyActive : !onlyActive || child.isActive())) {
	          // note: if this is for overwriting, it should only be for tweens that aren't paused and are initted.
	          a.push(child);
	        }
	      } else if ((children = child.getTweensOf(parsedTargets, onlyActive)).length) {
	        a.push.apply(a, children);
	      }

	      child = child._next;
	    }

	    return a;
	  } // potential future feature - targets() on timelines
	  // targets() {
	  // 	let result = [];
	  // 	this.getChildren(true, true, false).forEach(t => result.push(...t.targets()));
	  // 	return result.filter((v, i) => result.indexOf(v) === i);
	  // }
	  ;

	  _proto2.tweenTo = function tweenTo(position, vars) {
	    vars = vars || {};

	    var tl = this,
	        endTime = _parsePosition(tl, position),
	        _vars = vars,
	        startAt = _vars.startAt,
	        _onStart = _vars.onStart,
	        onStartParams = _vars.onStartParams,
	        immediateRender = _vars.immediateRender,
	        initted,
	        tween = Tween.to(tl, _setDefaults({
	      ease: vars.ease || "none",
	      lazy: false,
	      immediateRender: false,
	      time: endTime,
	      overwrite: "auto",
	      duration: vars.duration || Math.abs((endTime - (startAt && "time" in startAt ? startAt.time : tl._time)) / tl.timeScale()) || _tinyNum,
	      onStart: function onStart() {
	        tl.pause();

	        if (!initted) {
	          var duration = vars.duration || Math.abs((endTime - (startAt && "time" in startAt ? startAt.time : tl._time)) / tl.timeScale());
	          tween._dur !== duration && _setDuration(tween, duration, 0, 1).render(tween._time, true, true);
	          initted = 1;
	        }

	        _onStart && _onStart.apply(tween, onStartParams || []); //in case the user had an onStart in the vars - we don't want to overwrite it.
	      }
	    }, vars));

	    return immediateRender ? tween.render(0) : tween;
	  };

	  _proto2.tweenFromTo = function tweenFromTo(fromPosition, toPosition, vars) {
	    return this.tweenTo(toPosition, _setDefaults({
	      startAt: {
	        time: _parsePosition(this, fromPosition)
	      }
	    }, vars));
	  };

	  _proto2.recent = function recent() {
	    return this._recent;
	  };

	  _proto2.nextLabel = function nextLabel(afterTime) {
	    if (afterTime === void 0) {
	      afterTime = this._time;
	    }

	    return _getLabelInDirection(this, _parsePosition(this, afterTime));
	  };

	  _proto2.previousLabel = function previousLabel(beforeTime) {
	    if (beforeTime === void 0) {
	      beforeTime = this._time;
	    }

	    return _getLabelInDirection(this, _parsePosition(this, beforeTime), 1);
	  };

	  _proto2.currentLabel = function currentLabel(value) {
	    return arguments.length ? this.seek(value, true) : this.previousLabel(this._time + _tinyNum);
	  };

	  _proto2.shiftChildren = function shiftChildren(amount, adjustLabels, ignoreBeforeTime) {
	    if (ignoreBeforeTime === void 0) {
	      ignoreBeforeTime = 0;
	    }

	    var child = this._first,
	        labels = this.labels,
	        p;

	    while (child) {
	      if (child._start >= ignoreBeforeTime) {
	        child._start += amount;
	        child._end += amount;
	      }

	      child = child._next;
	    }

	    if (adjustLabels) {
	      for (p in labels) {
	        if (labels[p] >= ignoreBeforeTime) {
	          labels[p] += amount;
	        }
	      }
	    }

	    return _uncache(this);
	  };

	  _proto2.invalidate = function invalidate() {
	    var child = this._first;
	    this._lock = 0;

	    while (child) {
	      child.invalidate();
	      child = child._next;
	    }

	    return _Animation.prototype.invalidate.call(this);
	  };

	  _proto2.clear = function clear(includeLabels) {
	    if (includeLabels === void 0) {
	      includeLabels = true;
	    }

	    var child = this._first,
	        next;

	    while (child) {
	      next = child._next;
	      this.remove(child);
	      child = next;
	    }

	    this._dp && (this._time = this._tTime = this._pTime = 0);
	    includeLabels && (this.labels = {});
	    return _uncache(this);
	  };

	  _proto2.totalDuration = function totalDuration(value) {
	    var max = 0,
	        self = this,
	        child = self._last,
	        prevStart = _bigNum$1,
	        prev,
	        start,
	        parent;

	    if (arguments.length) {
	      return self.timeScale((self._repeat < 0 ? self.duration() : self.totalDuration()) / (self.reversed() ? -value : value));
	    }

	    if (self._dirty) {
	      parent = self.parent;

	      while (child) {
	        prev = child._prev; //record it here in case the tween changes position in the sequence...

	        child._dirty && child.totalDuration(); //could change the tween._startTime, so make sure the animation's cache is clean before analyzing it.

	        start = child._start;

	        if (start > prevStart && self._sort && child._ts && !self._lock) {
	          //in case one of the tweens shifted out of order, it needs to be re-inserted into the correct position in the sequence
	          self._lock = 1; //prevent endless recursive calls - there are methods that get triggered that check duration/totalDuration when we add().

	          _addToTimeline(self, child, start - child._delay, 1)._lock = 0;
	        } else {
	          prevStart = start;
	        }

	        if (start < 0 && child._ts) {
	          //children aren't allowed to have negative startTimes unless smoothChildTiming is true, so adjust here if one is found.
	          max -= start;

	          if (!parent && !self._dp || parent && parent.smoothChildTiming) {
	            self._start += start / self._ts;
	            self._time -= start;
	            self._tTime -= start;
	          }

	          self.shiftChildren(-start, false, -1e999);
	          prevStart = 0;
	        }

	        child._end > max && child._ts && (max = child._end);
	        child = prev;
	      }

	      _setDuration(self, self === _globalTimeline && self._time > max ? self._time : max, 1, 1);

	      self._dirty = 0;
	    }

	    return self._tDur;
	  };

	  Timeline.updateRoot = function updateRoot(time) {
	    if (_globalTimeline._ts) {
	      _lazySafeRender(_globalTimeline, _parentToChildTotalTime(time, _globalTimeline));

	      _lastRenderedFrame = _ticker.frame;
	    }

	    if (_ticker.frame >= _nextGCFrame) {
	      _nextGCFrame += _config.autoSleep || 120;
	      var child = _globalTimeline._first;
	      if (!child || !child._ts) if (_config.autoSleep && _ticker._listeners.length < 2) {
	        while (child && !child._ts) {
	          child = child._next;
	        }

	        child || _ticker.sleep();
	      }
	    }
	  };

	  return Timeline;
	}(Animation);

	_setDefaults(Timeline.prototype, {
	  _lock: 0,
	  _hasPause: 0,
	  _forcing: 0
	});

	var _addComplexStringPropTween = function _addComplexStringPropTween(target, prop, start, end, setter, stringFilter, funcParam) {
	  //note: we call _addComplexStringPropTween.call(tweenInstance...) to ensure that it's scoped properly. We may call it from within a plugin too, thus "this" would refer to the plugin.
	  var pt = new PropTween(this._pt, target, prop, 0, 1, _renderComplexString, null, setter),
	      index = 0,
	      matchIndex = 0,
	      result,
	      startNums,
	      color,
	      endNum,
	      chunk,
	      startNum,
	      hasRandom,
	      a;
	  pt.b = start;
	  pt.e = end;
	  start += ""; //ensure values are strings

	  end += "";

	  if (hasRandom = ~end.indexOf("random(")) {
	    end = _replaceRandom(end);
	  }

	  if (stringFilter) {
	    a = [start, end];
	    stringFilter(a, target, prop); //pass an array with the starting and ending values and let the filter do whatever it needs to the values.

	    start = a[0];
	    end = a[1];
	  }

	  startNums = start.match(_complexStringNumExp) || [];

	  while (result = _complexStringNumExp.exec(end)) {
	    endNum = result[0];
	    chunk = end.substring(index, result.index);

	    if (color) {
	      color = (color + 1) % 5;
	    } else if (chunk.substr(-5) === "rgba(") {
	      color = 1;
	    }

	    if (endNum !== startNums[matchIndex++]) {
	      startNum = parseFloat(startNums[matchIndex - 1]) || 0; //these nested PropTweens are handled in a special way - we'll never actually call a render or setter method on them. We'll just loop through them in the parent complex string PropTween's render method.

	      pt._pt = {
	        _next: pt._pt,
	        p: chunk || matchIndex === 1 ? chunk : ",",
	        //note: SVG spec allows omission of comma/space when a negative sign is wedged between two numbers, like 2.5-5.3 instead of 2.5,-5.3 but when tweening, the negative value may switch to positive, so we insert the comma just in case.
	        s: startNum,
	        c: endNum.charAt(1) === "=" ? _parseRelative(startNum, endNum) - startNum : parseFloat(endNum) - startNum,
	        m: color && color < 4 ? Math.round : 0
	      };
	      index = _complexStringNumExp.lastIndex;
	    }
	  }

	  pt.c = index < end.length ? end.substring(index, end.length) : ""; //we use the "c" of the PropTween to store the final part of the string (after the last number)

	  pt.fp = funcParam;

	  if (_relExp.test(end) || hasRandom) {
	    pt.e = 0; //if the end string contains relative values or dynamic random(...) values, delete the end it so that on the final render we don't actually set it to the string with += or -= characters (forces it to use the calculated value).
	  }

	  this._pt = pt; //start the linked list with this new PropTween. Remember, we call _addComplexStringPropTween.call(tweenInstance...) to ensure that it's scoped properly. We may call it from within a plugin too, thus "this" would refer to the plugin.

	  return pt;
	},
	    _addPropTween = function _addPropTween(target, prop, start, end, index, targets, modifier, stringFilter, funcParam) {
	  _isFunction(end) && (end = end(index || 0, target, targets));
	  var currentValue = target[prop],
	      parsedStart = start !== "get" ? start : !_isFunction(currentValue) ? currentValue : funcParam ? target[prop.indexOf("set") || !_isFunction(target["get" + prop.substr(3)]) ? prop : "get" + prop.substr(3)](funcParam) : target[prop](),
	      setter = !_isFunction(currentValue) ? _setterPlain : funcParam ? _setterFuncWithParam : _setterFunc,
	      pt;

	  if (_isString(end)) {
	    if (~end.indexOf("random(")) {
	      end = _replaceRandom(end);
	    }

	    if (end.charAt(1) === "=") {
	      pt = _parseRelative(parsedStart, end) + (getUnit(parsedStart) || 0);

	      if (pt || pt === 0) {
	        // to avoid isNaN, like if someone passes in a value like "!= whatever"
	        end = pt;
	      }
	    }
	  }

	  if (parsedStart !== end || _forceAllPropTweens) {
	    if (!isNaN(parsedStart * end) && end !== "") {
	      // fun fact: any number multiplied by "" is evaluated as the number 0!
	      pt = new PropTween(this._pt, target, prop, +parsedStart || 0, end - (parsedStart || 0), typeof currentValue === "boolean" ? _renderBoolean : _renderPlain, 0, setter);
	      funcParam && (pt.fp = funcParam);
	      modifier && pt.modifier(modifier, this, target);
	      return this._pt = pt;
	    }

	    !currentValue && !(prop in target) && _missingPlugin(prop, end);
	    return _addComplexStringPropTween.call(this, target, prop, parsedStart, end, setter, stringFilter || _config.stringFilter, funcParam);
	  }
	},
	    //creates a copy of the vars object and processes any function-based values (putting the resulting values directly into the copy) as well as strings with "random()" in them. It does NOT process relative values.
	_processVars = function _processVars(vars, index, target, targets, tween) {
	  _isFunction(vars) && (vars = _parseFuncOrString(vars, tween, index, target, targets));

	  if (!_isObject(vars) || vars.style && vars.nodeType || _isArray(vars) || _isTypedArray(vars)) {
	    return _isString(vars) ? _parseFuncOrString(vars, tween, index, target, targets) : vars;
	  }

	  var copy = {},
	      p;

	  for (p in vars) {
	    copy[p] = _parseFuncOrString(vars[p], tween, index, target, targets);
	  }

	  return copy;
	},
	    _checkPlugin = function _checkPlugin(property, vars, tween, index, target, targets) {
	  var plugin, pt, ptLookup, i;

	  if (_plugins[property] && (plugin = new _plugins[property]()).init(target, plugin.rawVars ? vars[property] : _processVars(vars[property], index, target, targets, tween), tween, index, targets) !== false) {
	    tween._pt = pt = new PropTween(tween._pt, target, property, 0, 1, plugin.render, plugin, 0, plugin.priority);

	    if (tween !== _quickTween) {
	      ptLookup = tween._ptLookup[tween._targets.indexOf(target)]; //note: we can't use tween._ptLookup[index] because for staggered tweens, the index from the fullTargets array won't match what it is in each individual tween that spawns from the stagger.

	      i = plugin._props.length;

	      while (i--) {
	        ptLookup[plugin._props[i]] = pt;
	      }
	    }
	  }

	  return plugin;
	},
	    _overwritingTween,
	    //store a reference temporarily so we can avoid overwriting itself.
	_forceAllPropTweens,
	    _initTween = function _initTween(tween, time) {
	  var vars = tween.vars,
	      ease = vars.ease,
	      startAt = vars.startAt,
	      immediateRender = vars.immediateRender,
	      lazy = vars.lazy,
	      onUpdate = vars.onUpdate,
	      onUpdateParams = vars.onUpdateParams,
	      callbackScope = vars.callbackScope,
	      runBackwards = vars.runBackwards,
	      yoyoEase = vars.yoyoEase,
	      keyframes = vars.keyframes,
	      autoRevert = vars.autoRevert,
	      dur = tween._dur,
	      prevStartAt = tween._startAt,
	      targets = tween._targets,
	      parent = tween.parent,
	      fullTargets = parent && parent.data === "nested" ? parent.parent._targets : targets,
	      autoOverwrite = tween._overwrite === "auto" && !_suppressOverwrites,
	      tl = tween.timeline,
	      cleanVars,
	      i,
	      p,
	      pt,
	      target,
	      hasPriority,
	      gsData,
	      harness,
	      plugin,
	      ptLookup,
	      index,
	      harnessVars,
	      overwritten;
	  tl && (!keyframes || !ease) && (ease = "none");
	  tween._ease = _parseEase(ease, _defaults.ease);
	  tween._yEase = yoyoEase ? _invertEase(_parseEase(yoyoEase === true ? ease : yoyoEase, _defaults.ease)) : 0;

	  if (yoyoEase && tween._yoyo && !tween._repeat) {
	    //there must have been a parent timeline with yoyo:true that is currently in its yoyo phase, so flip the eases.
	    yoyoEase = tween._yEase;
	    tween._yEase = tween._ease;
	    tween._ease = yoyoEase;
	  }

	  tween._from = !tl && !!vars.runBackwards; //nested timelines should never run backwards - the backwards-ness is in the child tweens.

	  if (!tl || keyframes && !vars.stagger) {
	    //if there's an internal timeline, skip all the parsing because we passed that task down the chain.
	    harness = targets[0] ? _getCache(targets[0]).harness : 0;
	    harnessVars = harness && vars[harness.prop]; //someone may need to specify CSS-specific values AND non-CSS values, like if the element has an "x" property plus it's a standard DOM element. We allow people to distinguish by wrapping plugin-specific stuff in a css:{} object for example.

	    cleanVars = _copyExcluding(vars, _reservedProps);

	    if (prevStartAt) {
	      _removeFromParent(prevStartAt.render(-1, true));

	      prevStartAt._lazy = 0;
	    }

	    if (startAt) {
	      _removeFromParent(tween._startAt = Tween.set(targets, _setDefaults({
	        data: "isStart",
	        overwrite: false,
	        parent: parent,
	        immediateRender: true,
	        lazy: _isNotFalse(lazy),
	        startAt: null,
	        delay: 0,
	        onUpdate: onUpdate,
	        onUpdateParams: onUpdateParams,
	        callbackScope: callbackScope,
	        stagger: 0
	      }, startAt))); //copy the properties/values into a new object to avoid collisions, like var to = {x:0}, from = {x:500}; timeline.fromTo(e, from, to).fromTo(e, to, from);


	      time < 0 && !immediateRender && !autoRevert && tween._startAt.render(-1, true); // rare edge case, like if a render is forced in the negative direction of a non-initted tween.

	      if (immediateRender) {
	        time > 0 && !autoRevert && (tween._startAt = 0); //tweens that render immediately (like most from() and fromTo() tweens) shouldn't revert when their parent timeline's playhead goes backward past the startTime because the initial render could have happened anytime and it shouldn't be directly correlated to this tween's startTime. Imagine setting up a complex animation where the beginning states of various objects are rendered immediately but the tween doesn't happen for quite some time - if we revert to the starting values as soon as the playhead goes backward past the tween's startTime, it will throw things off visually. Reversion should only happen in Timeline instances where immediateRender was false or when autoRevert is explicitly set to true.

	        if (dur && time <= 0) {
	          time && (tween._zTime = time);
	          return; //we skip initialization here so that overwriting doesn't occur until the tween actually begins. Otherwise, if you create several immediateRender:true tweens of the same target/properties to drop into a Timeline, the last one created would overwrite the first ones because they didn't get placed into the timeline yet before the first render occurs and kicks in overwriting.
	        } // if (time > 0) {
	        // 	autoRevert || (tween._startAt = 0); //tweens that render immediately (like most from() and fromTo() tweens) shouldn't revert when their parent timeline's playhead goes backward past the startTime because the initial render could have happened anytime and it shouldn't be directly correlated to this tween's startTime. Imagine setting up a complex animation where the beginning states of various objects are rendered immediately but the tween doesn't happen for quite some time - if we revert to the starting values as soon as the playhead goes backward past the tween's startTime, it will throw things off visually. Reversion should only happen in Timeline instances where immediateRender was false or when autoRevert is explicitly set to true.
	        // } else if (dur && !(time < 0 && prevStartAt)) {
	        // 	time && (tween._zTime = time);
	        // 	return; //we skip initialization here so that overwriting doesn't occur until the tween actually begins. Otherwise, if you create several immediateRender:true tweens of the same target/properties to drop into a Timeline, the last one created would overwrite the first ones because they didn't get placed into the timeline yet before the first render occurs and kicks in overwriting.
	        // }

	      } else if (autoRevert === false) {
	        tween._startAt = 0;
	      }
	    } else if (runBackwards && dur) {
	      //from() tweens must be handled uniquely: their beginning values must be rendered but we don't want overwriting to occur yet (when time is still 0). Wait until the tween actually begins before doing all the routines like overwriting. At that time, we should render at the END of the tween to ensure that things initialize correctly (remember, from() tweens go backwards)
	      if (prevStartAt) {
	        !autoRevert && (tween._startAt = 0);
	      } else {
	        time && (immediateRender = false); //in rare cases (like if a from() tween runs and then is invalidate()-ed), immediateRender could be true but the initial forced-render gets skipped, so there's no need to force the render in this context when the _time is greater than 0

	        p = _setDefaults({
	          overwrite: false,
	          data: "isFromStart",
	          //we tag the tween with as "isFromStart" so that if [inside a plugin] we need to only do something at the very END of a tween, we have a way of identifying this tween as merely the one that's setting the beginning values for a "from()" tween. For example, clearProps in CSSPlugin should only get applied at the very END of a tween and without this tag, from(...{height:100, clearProps:"height", delay:1}) would wipe the height at the beginning of the tween and after 1 second, it'd kick back in.
	          lazy: immediateRender && _isNotFalse(lazy),
	          immediateRender: immediateRender,
	          //zero-duration tweens render immediately by default, but if we're not specifically instructed to render this tween immediately, we should skip this and merely _init() to record the starting values (rendering them immediately would push them to completion which is wasteful in that case - we'd have to render(-1) immediately after)
	          stagger: 0,
	          parent: parent //ensures that nested tweens that had a stagger are handled properly, like gsap.from(".class", {y:gsap.utils.wrap([-100,100])})

	        }, cleanVars);
	        harnessVars && (p[harness.prop] = harnessVars); // in case someone does something like .from(..., {css:{}})

	        _removeFromParent(tween._startAt = Tween.set(targets, p));

	        time < 0 && tween._startAt.render(-1, true); // rare edge case, like if a render is forced in the negative direction of a non-initted from() tween.

	        tween._zTime = time;

	        if (!immediateRender) {
	          _initTween(tween._startAt, _tinyNum); //ensures that the initial values are recorded

	        } else if (!time) {
	          return;
	        }
	      }
	    }

	    tween._pt = tween._ptCache = 0;
	    lazy = dur && _isNotFalse(lazy) || lazy && !dur;

	    for (i = 0; i < targets.length; i++) {
	      target = targets[i];
	      gsData = target._gsap || _harness(targets)[i]._gsap;
	      tween._ptLookup[i] = ptLookup = {};
	      _lazyLookup[gsData.id] && _lazyTweens.length && _lazyRender(); //if other tweens of the same target have recently initted but haven't rendered yet, we've got to force the render so that the starting values are correct (imagine populating a timeline with a bunch of sequential tweens and then jumping to the end)

	      index = fullTargets === targets ? i : fullTargets.indexOf(target);

	      if (harness && (plugin = new harness()).init(target, harnessVars || cleanVars, tween, index, fullTargets) !== false) {
	        tween._pt = pt = new PropTween(tween._pt, target, plugin.name, 0, 1, plugin.render, plugin, 0, plugin.priority);

	        plugin._props.forEach(function (name) {
	          ptLookup[name] = pt;
	        });

	        plugin.priority && (hasPriority = 1);
	      }

	      if (!harness || harnessVars) {
	        for (p in cleanVars) {
	          if (_plugins[p] && (plugin = _checkPlugin(p, cleanVars, tween, index, target, fullTargets))) {
	            plugin.priority && (hasPriority = 1);
	          } else {
	            ptLookup[p] = pt = _addPropTween.call(tween, target, p, "get", cleanVars[p], index, fullTargets, 0, vars.stringFilter);
	          }
	        }
	      }

	      tween._op && tween._op[i] && tween.kill(target, tween._op[i]);

	      if (autoOverwrite && tween._pt) {
	        _overwritingTween = tween;

	        _globalTimeline.killTweensOf(target, ptLookup, tween.globalTime(time)); // make sure the overwriting doesn't overwrite THIS tween!!!


	        overwritten = !tween.parent;
	        _overwritingTween = 0;
	      }

	      tween._pt && lazy && (_lazyLookup[gsData.id] = 1);
	    }

	    hasPriority && _sortPropTweensByPriority(tween);
	    tween._onInit && tween._onInit(tween); //plugins like RoundProps must wait until ALL of the PropTweens are instantiated. In the plugin's init() function, it sets the _onInit on the tween instance. May not be pretty/intuitive, but it's fast and keeps file size down.
	  }

	  tween._onUpdate = onUpdate;
	  tween._initted = (!tween._op || tween._pt) && !overwritten; // if overwrittenProps resulted in the entire tween being killed, do NOT flag it as initted or else it may render for one tick.

	  keyframes && time <= 0 && tl.render(_bigNum$1, true, true); // if there's a 0% keyframe, it'll render in the "before" state for any staggered/delayed animations thus when the following tween initializes, it'll use the "before" state instead of the "after" state as the initial values.
	},
	    _updatePropTweens = function _updatePropTweens(tween, property, value, start, startIsRelative, ratio, time) {
	  var ptCache = (tween._pt && tween._ptCache || (tween._ptCache = {}))[property],
	      pt,
	      lookup,
	      i;

	  if (!ptCache) {
	    ptCache = tween._ptCache[property] = [];
	    lookup = tween._ptLookup;
	    i = tween._targets.length;

	    while (i--) {
	      pt = lookup[i][property];

	      if (pt && pt.d && pt.d._pt) {
	        // it's a plugin, so find the nested PropTween
	        pt = pt.d._pt;

	        while (pt && pt.p !== property) {
	          pt = pt._next;
	        }
	      }

	      if (!pt) {
	        // there is no PropTween associated with that property, so we must FORCE one to be created and ditch out of this
	        // if the tween has other properties that already rendered at new positions, we'd normally have to rewind to put them back like tween.render(0, true) before forcing an _initTween(), but that can create another edge case like tweening a timeline's progress would trigger onUpdates to fire which could move other things around. It's better to just inform users that .resetTo() should ONLY be used for tweens that already have that property. For example, you can't gsap.to(...{ y: 0 }) and then tween.restTo("x", 200) for example.
	        _forceAllPropTweens = 1; // otherwise, when we _addPropTween() and it finds no change between the start and end values, it skips creating a PropTween (for efficiency...why tween when there's no difference?) but in this case we NEED that PropTween created so we can edit it.

	        tween.vars[property] = "+=0";

	        _initTween(tween, time);

	        _forceAllPropTweens = 0;
	        return 1;
	      }

	      ptCache.push(pt);
	    }
	  }

	  i = ptCache.length;

	  while (i--) {
	    pt = ptCache[i];
	    pt.s = (start || start === 0) && !startIsRelative ? start : pt.s + (start || 0) + ratio * pt.c;
	    pt.c = value - pt.s;
	    pt.e && (pt.e = _round(value) + getUnit(pt.e)); // mainly for CSSPlugin (end value)

	    pt.b && (pt.b = pt.s + getUnit(pt.b)); // (beginning value)
	  }
	},
	    _addAliasesToVars = function _addAliasesToVars(targets, vars) {
	  var harness = targets[0] ? _getCache(targets[0]).harness : 0,
	      propertyAliases = harness && harness.aliases,
	      copy,
	      p,
	      i,
	      aliases;

	  if (!propertyAliases) {
	    return vars;
	  }

	  copy = _merge({}, vars);

	  for (p in propertyAliases) {
	    if (p in copy) {
	      aliases = propertyAliases[p].split(",");
	      i = aliases.length;

	      while (i--) {
	        copy[aliases[i]] = copy[p];
	      }
	    }
	  }

	  return copy;
	},
	    // parses multiple formats, like {"0%": {x: 100}, {"50%": {x: -20}} and { x: {"0%": 100, "50%": -20} }, and an "ease" can be set on any object. We populate an "allProps" object with an Array for each property, like {x: [{}, {}], y:[{}, {}]} with data for each property tween. The objects have a "t" (time), "v", (value), and "e" (ease) property. This allows us to piece together a timeline later.
	_parseKeyframe = function _parseKeyframe(prop, obj, allProps, easeEach) {
	  var ease = obj.ease || easeEach || "power1.inOut",
	      p,
	      a;

	  if (_isArray(obj)) {
	    a = allProps[prop] || (allProps[prop] = []); // t = time (out of 100), v = value, e = ease

	    obj.forEach(function (value, i) {
	      return a.push({
	        t: i / (obj.length - 1) * 100,
	        v: value,
	        e: ease
	      });
	    });
	  } else {
	    for (p in obj) {
	      a = allProps[p] || (allProps[p] = []);
	      p === "ease" || a.push({
	        t: parseFloat(prop),
	        v: obj[p],
	        e: ease
	      });
	    }
	  }
	},
	    _parseFuncOrString = function _parseFuncOrString(value, tween, i, target, targets) {
	  return _isFunction(value) ? value.call(tween, i, target, targets) : _isString(value) && ~value.indexOf("random(") ? _replaceRandom(value) : value;
	},
	    _staggerTweenProps = _callbackNames + "repeat,repeatDelay,yoyo,repeatRefresh,yoyoEase,autoRevert",
	    _staggerPropsToSkip = {};

	_forEachName(_staggerTweenProps + ",id,stagger,delay,duration,paused,scrollTrigger", function (name) {
	  return _staggerPropsToSkip[name] = 1;
	});
	/*
	 * --------------------------------------------------------------------------------------
	 * TWEEN
	 * --------------------------------------------------------------------------------------
	 */


	var Tween = /*#__PURE__*/function (_Animation2) {
	  _inheritsLoose(Tween, _Animation2);

	  function Tween(targets, vars, position, skipInherit) {
	    var _this3;

	    if (typeof vars === "number") {
	      position.duration = vars;
	      vars = position;
	      position = null;
	    }

	    _this3 = _Animation2.call(this, skipInherit ? vars : _inheritDefaults(vars)) || this;
	    var _this3$vars = _this3.vars,
	        duration = _this3$vars.duration,
	        delay = _this3$vars.delay,
	        immediateRender = _this3$vars.immediateRender,
	        stagger = _this3$vars.stagger,
	        overwrite = _this3$vars.overwrite,
	        keyframes = _this3$vars.keyframes,
	        defaults = _this3$vars.defaults,
	        scrollTrigger = _this3$vars.scrollTrigger,
	        yoyoEase = _this3$vars.yoyoEase,
	        parent = vars.parent || _globalTimeline,
	        parsedTargets = (_isArray(targets) || _isTypedArray(targets) ? _isNumber(targets[0]) : "length" in vars) ? [targets] : toArray(targets),
	        tl,
	        i,
	        copy,
	        l,
	        p,
	        curTarget,
	        staggerFunc,
	        staggerVarsToMerge;
	    _this3._targets = parsedTargets.length ? _harness(parsedTargets) : _warn("GSAP target " + targets + " not found. https://greensock.com", !_config.nullTargetWarn) || [];
	    _this3._ptLookup = []; //PropTween lookup. An array containing an object for each target, having keys for each tweening property

	    _this3._overwrite = overwrite;

	    if (keyframes || stagger || _isFuncOrString(duration) || _isFuncOrString(delay)) {
	      vars = _this3.vars;
	      tl = _this3.timeline = new Timeline({
	        data: "nested",
	        defaults: defaults || {}
	      });
	      tl.kill();
	      tl.parent = tl._dp = _assertThisInitialized(_this3);
	      tl._start = 0;

	      if (stagger || _isFuncOrString(duration) || _isFuncOrString(delay)) {
	        l = parsedTargets.length;
	        staggerFunc = stagger && distribute(stagger);

	        if (_isObject(stagger)) {
	          //users can pass in callbacks like onStart/onComplete in the stagger object. These should fire with each individual tween.
	          for (p in stagger) {
	            if (~_staggerTweenProps.indexOf(p)) {
	              staggerVarsToMerge || (staggerVarsToMerge = {});
	              staggerVarsToMerge[p] = stagger[p];
	            }
	          }
	        }

	        for (i = 0; i < l; i++) {
	          copy = _copyExcluding(vars, _staggerPropsToSkip);
	          copy.stagger = 0;
	          yoyoEase && (copy.yoyoEase = yoyoEase);
	          staggerVarsToMerge && _merge(copy, staggerVarsToMerge);
	          curTarget = parsedTargets[i]; //don't just copy duration or delay because if they're a string or function, we'd end up in an infinite loop because _isFuncOrString() would evaluate as true in the child tweens, entering this loop, etc. So we parse the value straight from vars and default to 0.

	          copy.duration = +_parseFuncOrString(duration, _assertThisInitialized(_this3), i, curTarget, parsedTargets);
	          copy.delay = (+_parseFuncOrString(delay, _assertThisInitialized(_this3), i, curTarget, parsedTargets) || 0) - _this3._delay;

	          if (!stagger && l === 1 && copy.delay) {
	            // if someone does delay:"random(1, 5)", repeat:-1, for example, the delay shouldn't be inside the repeat.
	            _this3._delay = delay = copy.delay;
	            _this3._start += delay;
	            copy.delay = 0;
	          }

	          tl.to(curTarget, copy, staggerFunc ? staggerFunc(i, curTarget, parsedTargets) : 0);
	          tl._ease = _easeMap.none;
	        }

	        tl.duration() ? duration = delay = 0 : _this3.timeline = 0; // if the timeline's duration is 0, we don't need a timeline internally!
	      } else if (keyframes) {
	        _inheritDefaults(_setDefaults(tl.vars.defaults, {
	          ease: "none"
	        }));

	        tl._ease = _parseEase(keyframes.ease || vars.ease || "none");
	        var time = 0,
	            a,
	            kf,
	            v;

	        if (_isArray(keyframes)) {
	          keyframes.forEach(function (frame) {
	            return tl.to(parsedTargets, frame, ">");
	          });
	        } else {
	          copy = {};

	          for (p in keyframes) {
	            p === "ease" || p === "easeEach" || _parseKeyframe(p, keyframes[p], copy, keyframes.easeEach);
	          }

	          for (p in copy) {
	            a = copy[p].sort(function (a, b) {
	              return a.t - b.t;
	            });
	            time = 0;

	            for (i = 0; i < a.length; i++) {
	              kf = a[i];
	              v = {
	                ease: kf.e,
	                duration: (kf.t - (i ? a[i - 1].t : 0)) / 100 * duration
	              };
	              v[p] = kf.v;
	              tl.to(parsedTargets, v, time);
	              time += v.duration;
	            }
	          }

	          tl.duration() < duration && tl.to({}, {
	            duration: duration - tl.duration()
	          }); // in case keyframes didn't go to 100%
	        }
	      }

	      duration || _this3.duration(duration = tl.duration());
	    } else {
	      _this3.timeline = 0; //speed optimization, faster lookups (no going up the prototype chain)
	    }

	    if (overwrite === true && !_suppressOverwrites) {
	      _overwritingTween = _assertThisInitialized(_this3);

	      _globalTimeline.killTweensOf(parsedTargets);

	      _overwritingTween = 0;
	    }

	    _addToTimeline(parent, _assertThisInitialized(_this3), position);

	    vars.reversed && _this3.reverse();
	    vars.paused && _this3.paused(true);

	    if (immediateRender || !duration && !keyframes && _this3._start === _roundPrecise(parent._time) && _isNotFalse(immediateRender) && _hasNoPausedAncestors(_assertThisInitialized(_this3)) && parent.data !== "nested") {
	      _this3._tTime = -_tinyNum; //forces a render without having to set the render() "force" parameter to true because we want to allow lazying by default (using the "force" parameter always forces an immediate full render)

	      _this3.render(Math.max(0, -delay)); //in case delay is negative

	    }

	    scrollTrigger && _scrollTrigger(_assertThisInitialized(_this3), scrollTrigger);
	    return _this3;
	  }

	  var _proto3 = Tween.prototype;

	  _proto3.render = function render(totalTime, suppressEvents, force) {
	    var prevTime = this._time,
	        tDur = this._tDur,
	        dur = this._dur,
	        tTime = totalTime > tDur - _tinyNum && totalTime >= 0 ? tDur : totalTime < _tinyNum ? 0 : totalTime,
	        time,
	        pt,
	        iteration,
	        cycleDuration,
	        prevIteration,
	        isYoyo,
	        ratio,
	        timeline,
	        yoyoEase;

	    if (!dur) {
	      _renderZeroDurationTween(this, totalTime, suppressEvents, force);
	    } else if (tTime !== this._tTime || !totalTime || force || !this._initted && this._tTime || this._startAt && this._zTime < 0 !== totalTime < 0) {
	      //this senses if we're crossing over the start time, in which case we must record _zTime and force the render, but we do it in this lengthy conditional way for performance reasons (usually we can skip the calculations): this._initted && (this._zTime < 0) !== (totalTime < 0)
	      time = tTime;
	      timeline = this.timeline;

	      if (this._repeat) {
	        //adjust the time for repeats and yoyos
	        cycleDuration = dur + this._rDelay;

	        if (this._repeat < -1 && totalTime < 0) {
	          return this.totalTime(cycleDuration * 100 + totalTime, suppressEvents, force);
	        }

	        time = _roundPrecise(tTime % cycleDuration); //round to avoid floating point errors. (4 % 0.8 should be 0 but some browsers report it as 0.79999999!)

	        if (tTime === tDur) {
	          // the tDur === tTime is for edge cases where there's a lengthy decimal on the duration and it may reach the very end but the time is rendered as not-quite-there (remember, tDur is rounded to 4 decimals whereas dur isn't)
	          iteration = this._repeat;
	          time = dur;
	        } else {
	          iteration = ~~(tTime / cycleDuration);

	          if (iteration && iteration === tTime / cycleDuration) {
	            time = dur;
	            iteration--;
	          }

	          time > dur && (time = dur);
	        }

	        isYoyo = this._yoyo && iteration & 1;

	        if (isYoyo) {
	          yoyoEase = this._yEase;
	          time = dur - time;
	        }

	        prevIteration = _animationCycle(this._tTime, cycleDuration);

	        if (time === prevTime && !force && this._initted) {
	          //could be during the repeatDelay part. No need to render and fire callbacks.
	          this._tTime = tTime;
	          return this;
	        }

	        if (iteration !== prevIteration) {
	          timeline && this._yEase && _propagateYoyoEase(timeline, isYoyo); //repeatRefresh functionality

	          if (this.vars.repeatRefresh && !isYoyo && !this._lock) {
	            this._lock = force = 1; //force, otherwise if lazy is true, the _attemptInitTween() will return and we'll jump out and get caught bouncing on each tick.

	            this.render(_roundPrecise(cycleDuration * iteration), true).invalidate()._lock = 0;
	          }
	        }
	      }

	      if (!this._initted) {
	        if (_attemptInitTween(this, totalTime < 0 ? totalTime : time, force, suppressEvents)) {
	          this._tTime = 0; // in constructor if immediateRender is true, we set _tTime to -_tinyNum to have the playhead cross the starting point but we can't leave _tTime as a negative number.

	          return this;
	        }

	        if (prevTime !== this._time) {
	          // rare edge case - during initialization, an onUpdate in the _startAt (.fromTo()) might force this tween to render at a different spot in which case we should ditch this render() call so that it doesn't revert the values.
	          return this;
	        }

	        if (dur !== this._dur) {
	          // while initting, a plugin like InertiaPlugin might alter the duration, so rerun from the start to ensure everything renders as it should.
	          return this.render(totalTime, suppressEvents, force);
	        }
	      }

	      this._tTime = tTime;
	      this._time = time;

	      if (!this._act && this._ts) {
	        this._act = 1; //as long as it's not paused, force it to be active so that if the user renders independent of the parent timeline, it'll be forced to re-render on the next tick.

	        this._lazy = 0;
	      }

	      this.ratio = ratio = (yoyoEase || this._ease)(time / dur);

	      if (this._from) {
	        this.ratio = ratio = 1 - ratio;
	      }

	      if (time && !prevTime && !suppressEvents) {
	        _callback(this, "onStart");

	        if (this._tTime !== tTime) {
	          // in case the onStart triggered a render at a different spot, eject. Like if someone did animation.pause(0.5) or something inside the onStart.
	          return this;
	        }
	      }

	      pt = this._pt;

	      while (pt) {
	        pt.r(ratio, pt.d);
	        pt = pt._next;
	      }

	      timeline && timeline.render(totalTime < 0 ? totalTime : !time && isYoyo ? -_tinyNum : timeline._dur * timeline._ease(time / this._dur), suppressEvents, force) || this._startAt && (this._zTime = totalTime);

	      if (this._onUpdate && !suppressEvents) {
	        totalTime < 0 && this._startAt && this._startAt.render(totalTime, true, force); //note: for performance reasons, we tuck this conditional logic inside less traveled areas (most tweens don't have an onUpdate). We'd just have it at the end before the onComplete, but the values should be updated before any onUpdate is called, so we ALSO put it here and then if it's not called, we do so later near the onComplete.

	        _callback(this, "onUpdate");
	      }

	      this._repeat && iteration !== prevIteration && this.vars.onRepeat && !suppressEvents && this.parent && _callback(this, "onRepeat");

	      if ((tTime === this._tDur || !tTime) && this._tTime === tTime) {
	        totalTime < 0 && this._startAt && !this._onUpdate && this._startAt.render(totalTime, true, true);
	        (totalTime || !dur) && (tTime === this._tDur && this._ts > 0 || !tTime && this._ts < 0) && _removeFromParent(this, 1); // don't remove if we're rendering at exactly a time of 0, as there could be autoRevert values that should get set on the next tick (if the playhead goes backward beyond the startTime, negative totalTime). Don't remove if the timeline is reversed and the playhead isn't at 0, otherwise tl.progress(1).reverse() won't work. Only remove if the playhead is at the end and timeScale is positive, or if the playhead is at 0 and the timeScale is negative.

	        if (!suppressEvents && !(totalTime < 0 && !prevTime) && (tTime || prevTime)) {
	          // if prevTime and tTime are zero, we shouldn't fire the onReverseComplete. This could happen if you gsap.to(... {paused:true}).play();
	          _callback(this, tTime === tDur ? "onComplete" : "onReverseComplete", true);

	          this._prom && !(tTime < tDur && this.timeScale() > 0) && this._prom();
	        }
	      }
	    }

	    return this;
	  };

	  _proto3.targets = function targets() {
	    return this._targets;
	  };

	  _proto3.invalidate = function invalidate() {
	    this._pt = this._op = this._startAt = this._onUpdate = this._lazy = this.ratio = 0;
	    this._ptLookup = [];
	    this.timeline && this.timeline.invalidate();
	    return _Animation2.prototype.invalidate.call(this);
	  };

	  _proto3.resetTo = function resetTo(property, value, start, startIsRelative) {
	    _tickerActive || _ticker.wake();
	    this._ts || this.play();
	    var time = Math.min(this._dur, (this._dp._time - this._start) * this._ts),
	        ratio;
	    this._initted || _initTween(this, time);
	    ratio = this._ease(time / this._dur); // don't just get tween.ratio because it may not have rendered yet.
	    // possible future addition to allow an object with multiple values to update, like tween.resetTo({x: 100, y: 200}); At this point, it doesn't seem worth the added kb given the fact that most users will likely opt for the convenient gsap.quickTo() way of interacting with this method.
	    // if (_isObject(property)) { // performance optimization
	    // 	for (p in property) {
	    // 		if (_updatePropTweens(this, p, property[p], value ? value[p] : null, start, ratio, time)) {
	    // 			return this.resetTo(property, value, start, startIsRelative); // if a PropTween wasn't found for the property, it'll get forced with a re-initialization so we need to jump out and start over again.
	    // 		}
	    // 	}
	    // } else {

	    if (_updatePropTweens(this, property, value, start, startIsRelative, ratio, time)) {
	      return this.resetTo(property, value, start, startIsRelative); // if a PropTween wasn't found for the property, it'll get forced with a re-initialization so we need to jump out and start over again.
	    } //}


	    _alignPlayhead(this, 0);

	    this.parent || _addLinkedListItem(this._dp, this, "_first", "_last", this._dp._sort ? "_start" : 0);
	    return this.render(0);
	  };

	  _proto3.kill = function kill(targets, vars) {
	    if (vars === void 0) {
	      vars = "all";
	    }

	    if (!targets && (!vars || vars === "all")) {
	      this._lazy = this._pt = 0;
	      return this.parent ? _interrupt(this) : this;
	    }

	    if (this.timeline) {
	      var tDur = this.timeline.totalDuration();
	      this.timeline.killTweensOf(targets, vars, _overwritingTween && _overwritingTween.vars.overwrite !== true)._first || _interrupt(this); // if nothing is left tweening, interrupt.

	      this.parent && tDur !== this.timeline.totalDuration() && _setDuration(this, this._dur * this.timeline._tDur / tDur, 0, 1); // if a nested tween is killed that changes the duration, it should affect this tween's duration. We must use the ratio, though, because sometimes the internal timeline is stretched like for keyframes where they don't all add up to whatever the parent tween's duration was set to.

	      return this;
	    }

	    var parsedTargets = this._targets,
	        killingTargets = targets ? toArray(targets) : parsedTargets,
	        propTweenLookup = this._ptLookup,
	        firstPT = this._pt,
	        overwrittenProps,
	        curLookup,
	        curOverwriteProps,
	        props,
	        p,
	        pt,
	        i;

	    if ((!vars || vars === "all") && _arraysMatch(parsedTargets, killingTargets)) {
	      vars === "all" && (this._pt = 0);
	      return _interrupt(this);
	    }

	    overwrittenProps = this._op = this._op || [];

	    if (vars !== "all") {
	      //so people can pass in a comma-delimited list of property names
	      if (_isString(vars)) {
	        p = {};

	        _forEachName(vars, function (name) {
	          return p[name] = 1;
	        });

	        vars = p;
	      }

	      vars = _addAliasesToVars(parsedTargets, vars);
	    }

	    i = parsedTargets.length;

	    while (i--) {
	      if (~killingTargets.indexOf(parsedTargets[i])) {
	        curLookup = propTweenLookup[i];

	        if (vars === "all") {
	          overwrittenProps[i] = vars;
	          props = curLookup;
	          curOverwriteProps = {};
	        } else {
	          curOverwriteProps = overwrittenProps[i] = overwrittenProps[i] || {};
	          props = vars;
	        }

	        for (p in props) {
	          pt = curLookup && curLookup[p];

	          if (pt) {
	            if (!("kill" in pt.d) || pt.d.kill(p) === true) {
	              _removeLinkedListItem(this, pt, "_pt");
	            }

	            delete curLookup[p];
	          }

	          if (curOverwriteProps !== "all") {
	            curOverwriteProps[p] = 1;
	          }
	        }
	      }
	    }

	    this._initted && !this._pt && firstPT && _interrupt(this); //if all tweening properties are killed, kill the tween. Without this line, if there's a tween with multiple targets and then you killTweensOf() each target individually, the tween would technically still remain active and fire its onComplete even though there aren't any more properties tweening.

	    return this;
	  };

	  Tween.to = function to(targets, vars) {
	    return new Tween(targets, vars, arguments[2]);
	  };

	  Tween.from = function from(targets, vars) {
	    return _createTweenType(1, arguments);
	  };

	  Tween.delayedCall = function delayedCall(delay, callback, params, scope) {
	    return new Tween(callback, 0, {
	      immediateRender: false,
	      lazy: false,
	      overwrite: false,
	      delay: delay,
	      onComplete: callback,
	      onReverseComplete: callback,
	      onCompleteParams: params,
	      onReverseCompleteParams: params,
	      callbackScope: scope
	    });
	  };

	  Tween.fromTo = function fromTo(targets, fromVars, toVars) {
	    return _createTweenType(2, arguments);
	  };

	  Tween.set = function set(targets, vars) {
	    vars.duration = 0;
	    vars.repeatDelay || (vars.repeat = 0);
	    return new Tween(targets, vars);
	  };

	  Tween.killTweensOf = function killTweensOf(targets, props, onlyActive) {
	    return _globalTimeline.killTweensOf(targets, props, onlyActive);
	  };

	  return Tween;
	}(Animation);

	_setDefaults(Tween.prototype, {
	  _targets: [],
	  _lazy: 0,
	  _startAt: 0,
	  _op: 0,
	  _onInit: 0
	}); //add the pertinent timeline methods to Tween instances so that users can chain conveniently and create a timeline automatically. (removed due to concerns that it'd ultimately add to more confusion especially for beginners)
	// _forEachName("to,from,fromTo,set,call,add,addLabel,addPause", name => {
	// 	Tween.prototype[name] = function() {
	// 		let tl = new Timeline();
	// 		return _addToTimeline(tl, this)[name].apply(tl, toArray(arguments));
	// 	}
	// });
	//for backward compatibility. Leverage the timeline calls.


	_forEachName("staggerTo,staggerFrom,staggerFromTo", function (name) {
	  Tween[name] = function () {
	    var tl = new Timeline(),
	        params = _slice.call(arguments, 0);

	    params.splice(name === "staggerFromTo" ? 5 : 4, 0, 0);
	    return tl[name].apply(tl, params);
	  };
	});
	/*
	 * --------------------------------------------------------------------------------------
	 * PROPTWEEN
	 * --------------------------------------------------------------------------------------
	 */


	var _setterPlain = function _setterPlain(target, property, value) {
	  return target[property] = value;
	},
	    _setterFunc = function _setterFunc(target, property, value) {
	  return target[property](value);
	},
	    _setterFuncWithParam = function _setterFuncWithParam(target, property, value, data) {
	  return target[property](data.fp, value);
	},
	    _setterAttribute = function _setterAttribute(target, property, value) {
	  return target.setAttribute(property, value);
	},
	    _getSetter = function _getSetter(target, property) {
	  return _isFunction(target[property]) ? _setterFunc : _isUndefined(target[property]) && target.setAttribute ? _setterAttribute : _setterPlain;
	},
	    _renderPlain = function _renderPlain(ratio, data) {
	  return data.set(data.t, data.p, Math.round((data.s + data.c * ratio) * 1000000) / 1000000, data);
	},
	    _renderBoolean = function _renderBoolean(ratio, data) {
	  return data.set(data.t, data.p, !!(data.s + data.c * ratio), data);
	},
	    _renderComplexString = function _renderComplexString(ratio, data) {
	  var pt = data._pt,
	      s = "";

	  if (!ratio && data.b) {
	    //b = beginning string
	    s = data.b;
	  } else if (ratio === 1 && data.e) {
	    //e = ending string
	    s = data.e;
	  } else {
	    while (pt) {
	      s = pt.p + (pt.m ? pt.m(pt.s + pt.c * ratio) : Math.round((pt.s + pt.c * ratio) * 10000) / 10000) + s; //we use the "p" property for the text inbetween (like a suffix). And in the context of a complex string, the modifier (m) is typically just Math.round(), like for RGB colors.

	      pt = pt._next;
	    }

	    s += data.c; //we use the "c" of the PropTween to store the final chunk of non-numeric text.
	  }

	  data.set(data.t, data.p, s, data);
	},
	    _renderPropTweens = function _renderPropTweens(ratio, data) {
	  var pt = data._pt;

	  while (pt) {
	    pt.r(ratio, pt.d);
	    pt = pt._next;
	  }
	},
	    _addPluginModifier = function _addPluginModifier(modifier, tween, target, property) {
	  var pt = this._pt,
	      next;

	  while (pt) {
	    next = pt._next;
	    pt.p === property && pt.modifier(modifier, tween, target);
	    pt = next;
	  }
	},
	    _killPropTweensOf = function _killPropTweensOf(property) {
	  var pt = this._pt,
	      hasNonDependentRemaining,
	      next;

	  while (pt) {
	    next = pt._next;

	    if (pt.p === property && !pt.op || pt.op === property) {
	      _removeLinkedListItem(this, pt, "_pt");
	    } else if (!pt.dep) {
	      hasNonDependentRemaining = 1;
	    }

	    pt = next;
	  }

	  return !hasNonDependentRemaining;
	},
	    _setterWithModifier = function _setterWithModifier(target, property, value, data) {
	  data.mSet(target, property, data.m.call(data.tween, value, data.mt), data);
	},
	    _sortPropTweensByPriority = function _sortPropTweensByPriority(parent) {
	  var pt = parent._pt,
	      next,
	      pt2,
	      first,
	      last; //sorts the PropTween linked list in order of priority because some plugins need to do their work after ALL of the PropTweens were created (like RoundPropsPlugin and ModifiersPlugin)

	  while (pt) {
	    next = pt._next;
	    pt2 = first;

	    while (pt2 && pt2.pr > pt.pr) {
	      pt2 = pt2._next;
	    }

	    if (pt._prev = pt2 ? pt2._prev : last) {
	      pt._prev._next = pt;
	    } else {
	      first = pt;
	    }

	    if (pt._next = pt2) {
	      pt2._prev = pt;
	    } else {
	      last = pt;
	    }

	    pt = next;
	  }

	  parent._pt = first;
	}; //PropTween key: t = target, p = prop, r = renderer, d = data, s = start, c = change, op = overwriteProperty (ONLY populated when it's different than p), pr = priority, _next/_prev for the linked list siblings, set = setter, m = modifier, mSet = modifierSetter (the original setter, before a modifier was added)


	var PropTween = /*#__PURE__*/function () {
	  function PropTween(next, target, prop, start, change, renderer, data, setter, priority) {
	    this.t = target;
	    this.s = start;
	    this.c = change;
	    this.p = prop;
	    this.r = renderer || _renderPlain;
	    this.d = data || this;
	    this.set = setter || _setterPlain;
	    this.pr = priority || 0;
	    this._next = next;

	    if (next) {
	      next._prev = this;
	    }
	  }

	  var _proto4 = PropTween.prototype;

	  _proto4.modifier = function modifier(func, tween, target) {
	    this.mSet = this.mSet || this.set; //in case it was already set (a PropTween can only have one modifier)

	    this.set = _setterWithModifier;
	    this.m = func;
	    this.mt = target; //modifier target

	    this.tween = tween;
	  };

	  return PropTween;
	}(); //Initialization tasks

	_forEachName(_callbackNames + "parent,duration,ease,delay,overwrite,runBackwards,startAt,yoyo,immediateRender,repeat,repeatDelay,data,paused,reversed,lazy,callbackScope,stringFilter,id,yoyoEase,stagger,inherit,repeatRefresh,keyframes,autoRevert,scrollTrigger", function (name) {
	  return _reservedProps[name] = 1;
	});

	_globals.TweenMax = _globals.TweenLite = Tween;
	_globals.TimelineLite = _globals.TimelineMax = Timeline;
	_globalTimeline = new Timeline({
	  sortChildren: false,
	  defaults: _defaults,
	  autoRemoveChildren: true,
	  id: "root",
	  smoothChildTiming: true
	});
	_config.stringFilter = _colorStringFilter;
	/*
	 * --------------------------------------------------------------------------------------
	 * GSAP
	 * --------------------------------------------------------------------------------------
	 */

	var _gsap = {
	  registerPlugin: function registerPlugin() {
	    for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
	      args[_key2] = arguments[_key2];
	    }

	    args.forEach(function (config) {
	      return _createPlugin(config);
	    });
	  },
	  timeline: function timeline(vars) {
	    return new Timeline(vars);
	  },
	  getTweensOf: function getTweensOf(targets, onlyActive) {
	    return _globalTimeline.getTweensOf(targets, onlyActive);
	  },
	  getProperty: function getProperty(target, property, unit, uncache) {
	    _isString(target) && (target = toArray(target)[0]); //in case selector text or an array is passed in

	    var getter = _getCache(target || {}).get,
	        format = unit ? _passThrough : _numericIfPossible;

	    unit === "native" && (unit = "");
	    return !target ? target : !property ? function (property, unit, uncache) {
	      return format((_plugins[property] && _plugins[property].get || getter)(target, property, unit, uncache));
	    } : format((_plugins[property] && _plugins[property].get || getter)(target, property, unit, uncache));
	  },
	  quickSetter: function quickSetter(target, property, unit) {
	    target = toArray(target);

	    if (target.length > 1) {
	      var setters = target.map(function (t) {
	        return gsap.quickSetter(t, property, unit);
	      }),
	          l = setters.length;
	      return function (value) {
	        var i = l;

	        while (i--) {
	          setters[i](value);
	        }
	      };
	    }

	    target = target[0] || {};

	    var Plugin = _plugins[property],
	        cache = _getCache(target),
	        p = cache.harness && (cache.harness.aliases || {})[property] || property,
	        // in case it's an alias, like "rotate" for "rotation".
	    setter = Plugin ? function (value) {
	      var p = new Plugin();
	      _quickTween._pt = 0;
	      p.init(target, unit ? value + unit : value, _quickTween, 0, [target]);
	      p.render(1, p);
	      _quickTween._pt && _renderPropTweens(1, _quickTween);
	    } : cache.set(target, p);

	    return Plugin ? setter : function (value) {
	      return setter(target, p, unit ? value + unit : value, cache, 1);
	    };
	  },
	  quickTo: function quickTo(target, property, vars) {
	    var _merge2;

	    var tween = gsap.to(target, _merge((_merge2 = {}, _merge2[property] = "+=0.1", _merge2.paused = true, _merge2), vars || {})),
	        func = function func(value, start, startIsRelative) {
	      return tween.resetTo(property, value, start, startIsRelative);
	    };

	    func.tween = tween;
	    return func;
	  },
	  isTweening: function isTweening(targets) {
	    return _globalTimeline.getTweensOf(targets, true).length > 0;
	  },
	  defaults: function defaults(value) {
	    value && value.ease && (value.ease = _parseEase(value.ease, _defaults.ease));
	    return _mergeDeep(_defaults, value || {});
	  },
	  config: function config(value) {
	    return _mergeDeep(_config, value || {});
	  },
	  registerEffect: function registerEffect(_ref3) {
	    var name = _ref3.name,
	        effect = _ref3.effect,
	        plugins = _ref3.plugins,
	        defaults = _ref3.defaults,
	        extendTimeline = _ref3.extendTimeline;
	    (plugins || "").split(",").forEach(function (pluginName) {
	      return pluginName && !_plugins[pluginName] && !_globals[pluginName] && _warn(name + " effect requires " + pluginName + " plugin.");
	    });

	    _effects[name] = function (targets, vars, tl) {
	      return effect(toArray(targets), _setDefaults(vars || {}, defaults), tl);
	    };

	    if (extendTimeline) {
	      Timeline.prototype[name] = function (targets, vars, position) {
	        return this.add(_effects[name](targets, _isObject(vars) ? vars : (position = vars) && {}, this), position);
	      };
	    }
	  },
	  registerEase: function registerEase(name, ease) {
	    _easeMap[name] = _parseEase(ease);
	  },
	  parseEase: function parseEase(ease, defaultEase) {
	    return arguments.length ? _parseEase(ease, defaultEase) : _easeMap;
	  },
	  getById: function getById(id) {
	    return _globalTimeline.getById(id);
	  },
	  exportRoot: function exportRoot(vars, includeDelayedCalls) {
	    if (vars === void 0) {
	      vars = {};
	    }

	    var tl = new Timeline(vars),
	        child,
	        next;
	    tl.smoothChildTiming = _isNotFalse(vars.smoothChildTiming);

	    _globalTimeline.remove(tl);

	    tl._dp = 0; //otherwise it'll get re-activated when adding children and be re-introduced into _globalTimeline's linked list (then added to itself).

	    tl._time = tl._tTime = _globalTimeline._time;
	    child = _globalTimeline._first;

	    while (child) {
	      next = child._next;

	      if (includeDelayedCalls || !(!child._dur && child instanceof Tween && child.vars.onComplete === child._targets[0])) {
	        _addToTimeline(tl, child, child._start - child._delay);
	      }

	      child = next;
	    }

	    _addToTimeline(_globalTimeline, tl, 0);

	    return tl;
	  },
	  utils: {
	    wrap: wrap,
	    wrapYoyo: wrapYoyo,
	    distribute: distribute,
	    random: random,
	    snap: snap,
	    normalize: normalize,
	    getUnit: getUnit,
	    clamp: clamp,
	    splitColor: splitColor,
	    toArray: toArray,
	    selector: selector,
	    mapRange: mapRange,
	    pipe: pipe,
	    unitize: unitize,
	    interpolate: interpolate,
	    shuffle: shuffle
	  },
	  install: _install,
	  effects: _effects,
	  ticker: _ticker,
	  updateRoot: Timeline.updateRoot,
	  plugins: _plugins,
	  globalTimeline: _globalTimeline,
	  core: {
	    PropTween: PropTween,
	    globals: _addGlobal,
	    Tween: Tween,
	    Timeline: Timeline,
	    Animation: Animation,
	    getCache: _getCache,
	    _removeLinkedListItem: _removeLinkedListItem,
	    suppressOverwrites: function suppressOverwrites(value) {
	      return _suppressOverwrites = value;
	    }
	  }
	};

	_forEachName("to,from,fromTo,delayedCall,set,killTweensOf", function (name) {
	  return _gsap[name] = Tween[name];
	});

	_ticker.add(Timeline.updateRoot);

	_quickTween = _gsap.to({}, {
	  duration: 0
	}); // ---- EXTRA PLUGINS --------------------------------------------------------

	var _getPluginPropTween = function _getPluginPropTween(plugin, prop) {
	  var pt = plugin._pt;

	  while (pt && pt.p !== prop && pt.op !== prop && pt.fp !== prop) {
	    pt = pt._next;
	  }

	  return pt;
	},
	    _addModifiers = function _addModifiers(tween, modifiers) {
	  var targets = tween._targets,
	      p,
	      i,
	      pt;

	  for (p in modifiers) {
	    i = targets.length;

	    while (i--) {
	      pt = tween._ptLookup[i][p];

	      if (pt && (pt = pt.d)) {
	        if (pt._pt) {
	          // is a plugin
	          pt = _getPluginPropTween(pt, p);
	        }

	        pt && pt.modifier && pt.modifier(modifiers[p], tween, targets[i], p);
	      }
	    }
	  }
	},
	    _buildModifierPlugin = function _buildModifierPlugin(name, modifier) {
	  return {
	    name: name,
	    rawVars: 1,
	    //don't pre-process function-based values or "random()" strings.
	    init: function init(target, vars, tween) {
	      tween._onInit = function (tween) {
	        var temp, p;

	        if (_isString(vars)) {
	          temp = {};

	          _forEachName(vars, function (name) {
	            return temp[name] = 1;
	          }); //if the user passes in a comma-delimited list of property names to roundProps, like "x,y", we round to whole numbers.


	          vars = temp;
	        }

	        if (modifier) {
	          temp = {};

	          for (p in vars) {
	            temp[p] = modifier(vars[p]);
	          }

	          vars = temp;
	        }

	        _addModifiers(tween, vars);
	      };
	    }
	  };
	}; //register core plugins


	var gsap = _gsap.registerPlugin({
	  name: "attr",
	  init: function init(target, vars, tween, index, targets) {
	    var p, pt;

	    for (p in vars) {
	      pt = this.add(target, "setAttribute", (target.getAttribute(p) || 0) + "", vars[p], index, targets, 0, 0, p);
	      pt && (pt.op = p);

	      this._props.push(p);
	    }
	  }
	}, {
	  name: "endArray",
	  init: function init(target, value) {
	    var i = value.length;

	    while (i--) {
	      this.add(target, i, target[i] || 0, value[i]);
	    }
	  }
	}, _buildModifierPlugin("roundProps", _roundModifier), _buildModifierPlugin("modifiers"), _buildModifierPlugin("snap", snap)) || _gsap; //to prevent the core plugins from being dropped via aggressive tree shaking, we must include them in the variable declaration in this way.

	Tween.version = Timeline.version = gsap.version = "3.10.4";
	_coreReady = 1;
	_windowExists$1() && _wake();
	_easeMap.Power0;
	    _easeMap.Power1;
	    _easeMap.Power2;
	    _easeMap.Power3;
	    _easeMap.Power4;
	    _easeMap.Linear;
	    _easeMap.Quad;
	    _easeMap.Cubic;
	    _easeMap.Quart;
	    _easeMap.Quint;
	    _easeMap.Strong;
	    _easeMap.Elastic;
	    _easeMap.Back;
	    _easeMap.SteppedEase;
	    _easeMap.Bounce;
	    _easeMap.Sine;
	    _easeMap.Expo;
	    _easeMap.Circ;

	/*!
	 * CSSPlugin 3.10.4
	 * https://greensock.com
	 *
	 * Copyright 2008-2022, GreenSock. All rights reserved.
	 * Subject to the terms at https://greensock.com/standard-license or for
	 * Club GreenSock members, the agreement issued with that membership.
	 * @author: Jack Doyle, jack@greensock.com
	*/

	var _win,
	    _doc,
	    _docElement,
	    _pluginInitted,
	    _tempDiv,
	    _recentSetterPlugin,
	    _windowExists = function _windowExists() {
	  return typeof window !== "undefined";
	},
	    _transformProps = {},
	    _RAD2DEG = 180 / Math.PI,
	    _DEG2RAD = Math.PI / 180,
	    _atan2 = Math.atan2,
	    _bigNum = 1e8,
	    _capsExp = /([A-Z])/g,
	    _horizontalExp = /(left|right|width|margin|padding|x)/i,
	    _complexExp = /[\s,\(]\S/,
	    _propertyAliases = {
	  autoAlpha: "opacity,visibility",
	  scale: "scaleX,scaleY",
	  alpha: "opacity"
	},
	    _renderCSSProp = function _renderCSSProp(ratio, data) {
	  return data.set(data.t, data.p, Math.round((data.s + data.c * ratio) * 10000) / 10000 + data.u, data);
	},
	    _renderPropWithEnd = function _renderPropWithEnd(ratio, data) {
	  return data.set(data.t, data.p, ratio === 1 ? data.e : Math.round((data.s + data.c * ratio) * 10000) / 10000 + data.u, data);
	},
	    _renderCSSPropWithBeginning = function _renderCSSPropWithBeginning(ratio, data) {
	  return data.set(data.t, data.p, ratio ? Math.round((data.s + data.c * ratio) * 10000) / 10000 + data.u : data.b, data);
	},
	    //if units change, we need a way to render the original unit/value when the tween goes all the way back to the beginning (ratio:0)
	_renderRoundedCSSProp = function _renderRoundedCSSProp(ratio, data) {
	  var value = data.s + data.c * ratio;
	  data.set(data.t, data.p, ~~(value + (value < 0 ? -.5 : .5)) + data.u, data);
	},
	    _renderNonTweeningValue = function _renderNonTweeningValue(ratio, data) {
	  return data.set(data.t, data.p, ratio ? data.e : data.b, data);
	},
	    _renderNonTweeningValueOnlyAtEnd = function _renderNonTweeningValueOnlyAtEnd(ratio, data) {
	  return data.set(data.t, data.p, ratio !== 1 ? data.b : data.e, data);
	},
	    _setterCSSStyle = function _setterCSSStyle(target, property, value) {
	  return target.style[property] = value;
	},
	    _setterCSSProp = function _setterCSSProp(target, property, value) {
	  return target.style.setProperty(property, value);
	},
	    _setterTransform = function _setterTransform(target, property, value) {
	  return target._gsap[property] = value;
	},
	    _setterScale = function _setterScale(target, property, value) {
	  return target._gsap.scaleX = target._gsap.scaleY = value;
	},
	    _setterScaleWithRender = function _setterScaleWithRender(target, property, value, data, ratio) {
	  var cache = target._gsap;
	  cache.scaleX = cache.scaleY = value;
	  cache.renderTransform(ratio, cache);
	},
	    _setterTransformWithRender = function _setterTransformWithRender(target, property, value, data, ratio) {
	  var cache = target._gsap;
	  cache[property] = value;
	  cache.renderTransform(ratio, cache);
	},
	    _transformProp = "transform",
	    _transformOriginProp = _transformProp + "Origin",
	    _supports3D,
	    _createElement = function _createElement(type, ns) {
	  var e = _doc.createElementNS ? _doc.createElementNS((ns || "http://www.w3.org/1999/xhtml").replace(/^https/, "http"), type) : _doc.createElement(type); //some servers swap in https for http in the namespace which can break things, making "style" inaccessible.

	  return e.style ? e : _doc.createElement(type); //some environments won't allow access to the element's style when created with a namespace in which case we default to the standard createElement() to work around the issue. Also note that when GSAP is embedded directly inside an SVG file, createElement() won't allow access to the style object in Firefox (see https://greensock.com/forums/topic/20215-problem-using-tweenmax-in-standalone-self-containing-svg-file-err-cannot-set-property-csstext-of-undefined/).
	},
	    _getComputedProperty = function _getComputedProperty(target, property, skipPrefixFallback) {
	  var cs = getComputedStyle(target);
	  return cs[property] || cs.getPropertyValue(property.replace(_capsExp, "-$1").toLowerCase()) || cs.getPropertyValue(property) || !skipPrefixFallback && _getComputedProperty(target, _checkPropPrefix(property) || property, 1) || ""; //css variables may not need caps swapped out for dashes and lowercase.
	},
	    _prefixes = "O,Moz,ms,Ms,Webkit".split(","),
	    _checkPropPrefix = function _checkPropPrefix(property, element, preferPrefix) {
	  var e = element || _tempDiv,
	      s = e.style,
	      i = 5;

	  if (property in s && !preferPrefix) {
	    return property;
	  }

	  property = property.charAt(0).toUpperCase() + property.substr(1);

	  while (i-- && !(_prefixes[i] + property in s)) {}

	  return i < 0 ? null : (i === 3 ? "ms" : i >= 0 ? _prefixes[i] : "") + property;
	},
	    _initCore = function _initCore() {
	  if (_windowExists() && window.document) {
	    _win = window;
	    _doc = _win.document;
	    _docElement = _doc.documentElement;
	    _tempDiv = _createElement("div") || {
	      style: {}
	    };
	    _createElement("div");
	    _transformProp = _checkPropPrefix(_transformProp);
	    _transformOriginProp = _transformProp + "Origin";
	    _tempDiv.style.cssText = "border-width:0;line-height:0;position:absolute;padding:0"; //make sure to override certain properties that may contaminate measurements, in case the user has overreaching style sheets.

	    _supports3D = !!_checkPropPrefix("perspective");
	    _pluginInitted = 1;
	  }
	},
	    _getBBoxHack = function _getBBoxHack(swapIfPossible) {
	  //works around issues in some browsers (like Firefox) that don't correctly report getBBox() on SVG elements inside a <defs> element and/or <mask>. We try creating an SVG, adding it to the documentElement and toss the element in there so that it's definitely part of the rendering tree, then grab the bbox and if it works, we actually swap out the original getBBox() method for our own that does these extra steps whenever getBBox is needed. This helps ensure that performance is optimal (only do all these extra steps when absolutely necessary...most elements don't need it).
	  var svg = _createElement("svg", this.ownerSVGElement && this.ownerSVGElement.getAttribute("xmlns") || "http://www.w3.org/2000/svg"),
	      oldParent = this.parentNode,
	      oldSibling = this.nextSibling,
	      oldCSS = this.style.cssText,
	      bbox;

	  _docElement.appendChild(svg);

	  svg.appendChild(this);
	  this.style.display = "block";

	  if (swapIfPossible) {
	    try {
	      bbox = this.getBBox();
	      this._gsapBBox = this.getBBox; //store the original

	      this.getBBox = _getBBoxHack;
	    } catch (e) {}
	  } else if (this._gsapBBox) {
	    bbox = this._gsapBBox();
	  }

	  if (oldParent) {
	    if (oldSibling) {
	      oldParent.insertBefore(this, oldSibling);
	    } else {
	      oldParent.appendChild(this);
	    }
	  }

	  _docElement.removeChild(svg);

	  this.style.cssText = oldCSS;
	  return bbox;
	},
	    _getAttributeFallbacks = function _getAttributeFallbacks(target, attributesArray) {
	  var i = attributesArray.length;

	  while (i--) {
	    if (target.hasAttribute(attributesArray[i])) {
	      return target.getAttribute(attributesArray[i]);
	    }
	  }
	},
	    _getBBox = function _getBBox(target) {
	  var bounds;

	  try {
	    bounds = target.getBBox(); //Firefox throws errors if you try calling getBBox() on an SVG element that's not rendered (like in a <symbol> or <defs>). https://bugzilla.mozilla.org/show_bug.cgi?id=612118
	  } catch (error) {
	    bounds = _getBBoxHack.call(target, true);
	  }

	  bounds && (bounds.width || bounds.height) || target.getBBox === _getBBoxHack || (bounds = _getBBoxHack.call(target, true)); //some browsers (like Firefox) misreport the bounds if the element has zero width and height (it just assumes it's at x:0, y:0), thus we need to manually grab the position in that case.

	  return bounds && !bounds.width && !bounds.x && !bounds.y ? {
	    x: +_getAttributeFallbacks(target, ["x", "cx", "x1"]) || 0,
	    y: +_getAttributeFallbacks(target, ["y", "cy", "y1"]) || 0,
	    width: 0,
	    height: 0
	  } : bounds;
	},
	    _isSVG = function _isSVG(e) {
	  return !!(e.getCTM && (!e.parentNode || e.ownerSVGElement) && _getBBox(e));
	},
	    //reports if the element is an SVG on which getBBox() actually works
	_removeProperty = function _removeProperty(target, property) {
	  if (property) {
	    var style = target.style;

	    if (property in _transformProps && property !== _transformOriginProp) {
	      property = _transformProp;
	    }

	    if (style.removeProperty) {
	      if (property.substr(0, 2) === "ms" || property.substr(0, 6) === "webkit") {
	        //Microsoft and some Webkit browsers don't conform to the standard of capitalizing the first prefix character, so we adjust so that when we prefix the caps with a dash, it's correct (otherwise it'd be "ms-transform" instead of "-ms-transform" for IE9, for example)
	        property = "-" + property;
	      }

	      style.removeProperty(property.replace(_capsExp, "-$1").toLowerCase());
	    } else {
	      //note: old versions of IE use "removeAttribute()" instead of "removeProperty()"
	      style.removeAttribute(property);
	    }
	  }
	},
	    _addNonTweeningPT = function _addNonTweeningPT(plugin, target, property, beginning, end, onlySetAtEnd) {
	  var pt = new PropTween(plugin._pt, target, property, 0, 1, onlySetAtEnd ? _renderNonTweeningValueOnlyAtEnd : _renderNonTweeningValue);
	  plugin._pt = pt;
	  pt.b = beginning;
	  pt.e = end;

	  plugin._props.push(property);

	  return pt;
	},
	    _nonConvertibleUnits = {
	  deg: 1,
	  rad: 1,
	  turn: 1
	},
	    //takes a single value like 20px and converts it to the unit specified, like "%", returning only the numeric amount.
	_convertToUnit = function _convertToUnit(target, property, value, unit) {
	  var curValue = parseFloat(value) || 0,
	      curUnit = (value + "").trim().substr((curValue + "").length) || "px",
	      // some browsers leave extra whitespace at the beginning of CSS variables, hence the need to trim()
	  style = _tempDiv.style,
	      horizontal = _horizontalExp.test(property),
	      isRootSVG = target.tagName.toLowerCase() === "svg",
	      measureProperty = (isRootSVG ? "client" : "offset") + (horizontal ? "Width" : "Height"),
	      amount = 100,
	      toPixels = unit === "px",
	      toPercent = unit === "%",
	      px,
	      parent,
	      cache,
	      isSVG;

	  if (unit === curUnit || !curValue || _nonConvertibleUnits[unit] || _nonConvertibleUnits[curUnit]) {
	    return curValue;
	  }

	  curUnit !== "px" && !toPixels && (curValue = _convertToUnit(target, property, value, "px"));
	  isSVG = target.getCTM && _isSVG(target);

	  if ((toPercent || curUnit === "%") && (_transformProps[property] || ~property.indexOf("adius"))) {
	    px = isSVG ? target.getBBox()[horizontal ? "width" : "height"] : target[measureProperty];
	    return _round(toPercent ? curValue / px * amount : curValue / 100 * px);
	  }

	  style[horizontal ? "width" : "height"] = amount + (toPixels ? curUnit : unit);
	  parent = ~property.indexOf("adius") || unit === "em" && target.appendChild && !isRootSVG ? target : target.parentNode;

	  if (isSVG) {
	    parent = (target.ownerSVGElement || {}).parentNode;
	  }

	  if (!parent || parent === _doc || !parent.appendChild) {
	    parent = _doc.body;
	  }

	  cache = parent._gsap;

	  if (cache && toPercent && cache.width && horizontal && cache.time === _ticker.time) {
	    return _round(curValue / cache.width * amount);
	  } else {
	    (toPercent || curUnit === "%") && (style.position = _getComputedProperty(target, "position"));
	    parent === target && (style.position = "static"); // like for borderRadius, if it's a % we must have it relative to the target itself but that may not have position: relative or position: absolute in which case it'd go up the chain until it finds its offsetParent (bad). position: static protects against that.

	    parent.appendChild(_tempDiv);
	    px = _tempDiv[measureProperty];
	    parent.removeChild(_tempDiv);
	    style.position = "absolute";

	    if (horizontal && toPercent) {
	      cache = _getCache(parent);
	      cache.time = _ticker.time;
	      cache.width = parent[measureProperty];
	    }
	  }

	  return _round(toPixels ? px * curValue / amount : px && curValue ? amount / px * curValue : 0);
	},
	    _get = function _get(target, property, unit, uncache) {
	  var value;
	  _pluginInitted || _initCore();

	  if (property in _propertyAliases && property !== "transform") {
	    property = _propertyAliases[property];

	    if (~property.indexOf(",")) {
	      property = property.split(",")[0];
	    }
	  }

	  if (_transformProps[property] && property !== "transform") {
	    value = _parseTransform(target, uncache);
	    value = property !== "transformOrigin" ? value[property] : value.svg ? value.origin : _firstTwoOnly(_getComputedProperty(target, _transformOriginProp)) + " " + value.zOrigin + "px";
	  } else {
	    value = target.style[property];

	    if (!value || value === "auto" || uncache || ~(value + "").indexOf("calc(")) {
	      value = _specialProps[property] && _specialProps[property](target, property, unit) || _getComputedProperty(target, property) || _getProperty(target, property) || (property === "opacity" ? 1 : 0); // note: some browsers, like Firefox, don't report borderRadius correctly! Instead, it only reports every corner like  borderTopLeftRadius
	    }
	  }

	  return unit && !~(value + "").trim().indexOf(" ") ? _convertToUnit(target, property, value, unit) + unit : value;
	},
	    _tweenComplexCSSString = function _tweenComplexCSSString(target, prop, start, end) {
	  // note: we call _tweenComplexCSSString.call(pluginInstance...) to ensure that it's scoped properly. We may call it from within a plugin too, thus "this" would refer to the plugin.
	  if (!start || start === "none") {
	    // some browsers like Safari actually PREFER the prefixed property and mis-report the unprefixed value like clipPath (BUG). In other words, even though clipPath exists in the style ("clipPath" in target.style) and it's set in the CSS properly (along with -webkit-clip-path), Safari reports clipPath as "none" whereas WebkitClipPath reports accurately like "ellipse(100% 0% at 50% 0%)", so in this case we must SWITCH to using the prefixed property instead. See https://greensock.com/forums/topic/18310-clippath-doesnt-work-on-ios/
	    var p = _checkPropPrefix(prop, target, 1),
	        s = p && _getComputedProperty(target, p, 1);

	    if (s && s !== start) {
	      prop = p;
	      start = s;
	    } else if (prop === "borderColor") {
	      start = _getComputedProperty(target, "borderTopColor"); // Firefox bug: always reports "borderColor" as "", so we must fall back to borderTopColor. See https://greensock.com/forums/topic/24583-how-to-return-colors-that-i-had-after-reverse/
	    }
	  }

	  var pt = new PropTween(this._pt, target.style, prop, 0, 1, _renderComplexString),
	      index = 0,
	      matchIndex = 0,
	      a,
	      result,
	      startValues,
	      startNum,
	      color,
	      startValue,
	      endValue,
	      endNum,
	      chunk,
	      endUnit,
	      startUnit,
	      endValues;
	  pt.b = start;
	  pt.e = end;
	  start += ""; // ensure values are strings

	  end += "";

	  if (end === "auto") {
	    target.style[prop] = end;
	    end = _getComputedProperty(target, prop) || end;
	    target.style[prop] = start;
	  }

	  a = [start, end];

	  _colorStringFilter(a); // pass an array with the starting and ending values and let the filter do whatever it needs to the values. If colors are found, it returns true and then we must match where the color shows up order-wise because for things like boxShadow, sometimes the browser provides the computed values with the color FIRST, but the user provides it with the color LAST, so flip them if necessary. Same for drop-shadow().


	  start = a[0];
	  end = a[1];
	  startValues = start.match(_numWithUnitExp) || [];
	  endValues = end.match(_numWithUnitExp) || [];

	  if (endValues.length) {
	    while (result = _numWithUnitExp.exec(end)) {
	      endValue = result[0];
	      chunk = end.substring(index, result.index);

	      if (color) {
	        color = (color + 1) % 5;
	      } else if (chunk.substr(-5) === "rgba(" || chunk.substr(-5) === "hsla(") {
	        color = 1;
	      }

	      if (endValue !== (startValue = startValues[matchIndex++] || "")) {
	        startNum = parseFloat(startValue) || 0;
	        startUnit = startValue.substr((startNum + "").length);
	        endValue.charAt(1) === "=" && (endValue = _parseRelative(startNum, endValue) + startUnit);
	        endNum = parseFloat(endValue);
	        endUnit = endValue.substr((endNum + "").length);
	        index = _numWithUnitExp.lastIndex - endUnit.length;

	        if (!endUnit) {
	          //if something like "perspective:300" is passed in and we must add a unit to the end
	          endUnit = endUnit || _config.units[prop] || startUnit;

	          if (index === end.length) {
	            end += endUnit;
	            pt.e += endUnit;
	          }
	        }

	        if (startUnit !== endUnit) {
	          startNum = _convertToUnit(target, prop, startValue, endUnit) || 0;
	        } // these nested PropTweens are handled in a special way - we'll never actually call a render or setter method on them. We'll just loop through them in the parent complex string PropTween's render method.


	        pt._pt = {
	          _next: pt._pt,
	          p: chunk || matchIndex === 1 ? chunk : ",",
	          //note: SVG spec allows omission of comma/space when a negative sign is wedged between two numbers, like 2.5-5.3 instead of 2.5,-5.3 but when tweening, the negative value may switch to positive, so we insert the comma just in case.
	          s: startNum,
	          c: endNum - startNum,
	          m: color && color < 4 || prop === "zIndex" ? Math.round : 0
	        };
	      }
	    }

	    pt.c = index < end.length ? end.substring(index, end.length) : ""; //we use the "c" of the PropTween to store the final part of the string (after the last number)
	  } else {
	    pt.r = prop === "display" && end === "none" ? _renderNonTweeningValueOnlyAtEnd : _renderNonTweeningValue;
	  }

	  _relExp.test(end) && (pt.e = 0); //if the end string contains relative values or dynamic random(...) values, delete the end it so that on the final render we don't actually set it to the string with += or -= characters (forces it to use the calculated value).

	  this._pt = pt; //start the linked list with this new PropTween. Remember, we call _tweenComplexCSSString.call(pluginInstance...) to ensure that it's scoped properly. We may call it from within another plugin too, thus "this" would refer to the plugin.

	  return pt;
	},
	    _keywordToPercent = {
	  top: "0%",
	  bottom: "100%",
	  left: "0%",
	  right: "100%",
	  center: "50%"
	},
	    _convertKeywordsToPercentages = function _convertKeywordsToPercentages(value) {
	  var split = value.split(" "),
	      x = split[0],
	      y = split[1] || "50%";

	  if (x === "top" || x === "bottom" || y === "left" || y === "right") {
	    //the user provided them in the wrong order, so flip them
	    value = x;
	    x = y;
	    y = value;
	  }

	  split[0] = _keywordToPercent[x] || x;
	  split[1] = _keywordToPercent[y] || y;
	  return split.join(" ");
	},
	    _renderClearProps = function _renderClearProps(ratio, data) {
	  if (data.tween && data.tween._time === data.tween._dur) {
	    var target = data.t,
	        style = target.style,
	        props = data.u,
	        cache = target._gsap,
	        prop,
	        clearTransforms,
	        i;

	    if (props === "all" || props === true) {
	      style.cssText = "";
	      clearTransforms = 1;
	    } else {
	      props = props.split(",");
	      i = props.length;

	      while (--i > -1) {
	        prop = props[i];

	        if (_transformProps[prop]) {
	          clearTransforms = 1;
	          prop = prop === "transformOrigin" ? _transformOriginProp : _transformProp;
	        }

	        _removeProperty(target, prop);
	      }
	    }

	    if (clearTransforms) {
	      _removeProperty(target, _transformProp);

	      if (cache) {
	        cache.svg && target.removeAttribute("transform");

	        _parseTransform(target, 1); // force all the cached values back to "normal"/identity, otherwise if there's another tween that's already set to render transforms on this element, it could display the wrong values.


	        cache.uncache = 1;
	      }
	    }
	  }
	},
	    // note: specialProps should return 1 if (and only if) they have a non-zero priority. It indicates we need to sort the linked list.
	_specialProps = {
	  clearProps: function clearProps(plugin, target, property, endValue, tween) {
	    if (tween.data !== "isFromStart") {
	      var pt = plugin._pt = new PropTween(plugin._pt, target, property, 0, 0, _renderClearProps);
	      pt.u = endValue;
	      pt.pr = -10;
	      pt.tween = tween;

	      plugin._props.push(property);

	      return 1;
	    }
	  }
	  /* className feature (about 0.4kb gzipped).
	  , className(plugin, target, property, endValue, tween) {
	  	let _renderClassName = (ratio, data) => {
	  			data.css.render(ratio, data.css);
	  			if (!ratio || ratio === 1) {
	  				let inline = data.rmv,
	  					target = data.t,
	  					p;
	  				target.setAttribute("class", ratio ? data.e : data.b);
	  				for (p in inline) {
	  					_removeProperty(target, p);
	  				}
	  			}
	  		},
	  		_getAllStyles = (target) => {
	  			let styles = {},
	  				computed = getComputedStyle(target),
	  				p;
	  			for (p in computed) {
	  				if (isNaN(p) && p !== "cssText" && p !== "length") {
	  					styles[p] = computed[p];
	  				}
	  			}
	  			_setDefaults(styles, _parseTransform(target, 1));
	  			return styles;
	  		},
	  		startClassList = target.getAttribute("class"),
	  		style = target.style,
	  		cssText = style.cssText,
	  		cache = target._gsap,
	  		classPT = cache.classPT,
	  		inlineToRemoveAtEnd = {},
	  		data = {t:target, plugin:plugin, rmv:inlineToRemoveAtEnd, b:startClassList, e:(endValue.charAt(1) !== "=") ? endValue : startClassList.replace(new RegExp("(?:\\s|^)" + endValue.substr(2) + "(?![\\w-])"), "") + ((endValue.charAt(0) === "+") ? " " + endValue.substr(2) : "")},
	  		changingVars = {},
	  		startVars = _getAllStyles(target),
	  		transformRelated = /(transform|perspective)/i,
	  		endVars, p;
	  	if (classPT) {
	  		classPT.r(1, classPT.d);
	  		_removeLinkedListItem(classPT.d.plugin, classPT, "_pt");
	  	}
	  	target.setAttribute("class", data.e);
	  	endVars = _getAllStyles(target, true);
	  	target.setAttribute("class", startClassList);
	  	for (p in endVars) {
	  		if (endVars[p] !== startVars[p] && !transformRelated.test(p)) {
	  			changingVars[p] = endVars[p];
	  			if (!style[p] && style[p] !== "0") {
	  				inlineToRemoveAtEnd[p] = 1;
	  			}
	  		}
	  	}
	  	cache.classPT = plugin._pt = new PropTween(plugin._pt, target, "className", 0, 0, _renderClassName, data, 0, -11);
	  	if (style.cssText !== cssText) { //only apply if things change. Otherwise, in cases like a background-image that's pulled dynamically, it could cause a refresh. See https://greensock.com/forums/topic/20368-possible-gsap-bug-switching-classnames-in-chrome/.
	  		style.cssText = cssText; //we recorded cssText before we swapped classes and ran _getAllStyles() because in cases when a className tween is overwritten, we remove all the related tweening properties from that class change (otherwise class-specific stuff can't override properties we've directly set on the target's style object due to specificity).
	  	}
	  	_parseTransform(target, true); //to clear the caching of transforms
	  	data.css = new gsap.plugins.css();
	  	data.css.init(target, changingVars, tween);
	  	plugin._props.push(...data.css._props);
	  	return 1;
	  }
	  */

	},

	/*
	 * --------------------------------------------------------------------------------------
	 * TRANSFORMS
	 * --------------------------------------------------------------------------------------
	 */
	_identity2DMatrix = [1, 0, 0, 1, 0, 0],
	    _rotationalProperties = {},
	    _isNullTransform = function _isNullTransform(value) {
	  return value === "matrix(1, 0, 0, 1, 0, 0)" || value === "none" || !value;
	},
	    _getComputedTransformMatrixAsArray = function _getComputedTransformMatrixAsArray(target) {
	  var matrixString = _getComputedProperty(target, _transformProp);

	  return _isNullTransform(matrixString) ? _identity2DMatrix : matrixString.substr(7).match(_numExp).map(_round);
	},
	    _getMatrix = function _getMatrix(target, force2D) {
	  var cache = target._gsap || _getCache(target),
	      style = target.style,
	      matrix = _getComputedTransformMatrixAsArray(target),
	      parent,
	      nextSibling,
	      temp,
	      addedToDOM;

	  if (cache.svg && target.getAttribute("transform")) {
	    temp = target.transform.baseVal.consolidate().matrix; //ensures that even complex values like "translate(50,60) rotate(135,0,0)" are parsed because it mashes it into a matrix.

	    matrix = [temp.a, temp.b, temp.c, temp.d, temp.e, temp.f];
	    return matrix.join(",") === "1,0,0,1,0,0" ? _identity2DMatrix : matrix;
	  } else if (matrix === _identity2DMatrix && !target.offsetParent && target !== _docElement && !cache.svg) {
	    //note: if offsetParent is null, that means the element isn't in the normal document flow, like if it has display:none or one of its ancestors has display:none). Firefox returns null for getComputedStyle() if the element is in an iframe that has display:none. https://bugzilla.mozilla.org/show_bug.cgi?id=548397
	    //browsers don't report transforms accurately unless the element is in the DOM and has a display value that's not "none". Firefox and Microsoft browsers have a partial bug where they'll report transforms even if display:none BUT not any percentage-based values like translate(-50%, 8px) will be reported as if it's translate(0, 8px).
	    temp = style.display;
	    style.display = "block";
	    parent = target.parentNode;

	    if (!parent || !target.offsetParent) {
	      // note: in 3.3.0 we switched target.offsetParent to _doc.body.contains(target) to avoid [sometimes unnecessary] MutationObserver calls but that wasn't adequate because there are edge cases where nested position: fixed elements need to get reparented to accurately sense transforms. See https://github.com/greensock/GSAP/issues/388 and https://github.com/greensock/GSAP/issues/375
	      addedToDOM = 1; //flag

	      nextSibling = target.nextSibling;

	      _docElement.appendChild(target); //we must add it to the DOM in order to get values properly

	    }

	    matrix = _getComputedTransformMatrixAsArray(target);
	    temp ? style.display = temp : _removeProperty(target, "display");

	    if (addedToDOM) {
	      nextSibling ? parent.insertBefore(target, nextSibling) : parent ? parent.appendChild(target) : _docElement.removeChild(target);
	    }
	  }

	  return force2D && matrix.length > 6 ? [matrix[0], matrix[1], matrix[4], matrix[5], matrix[12], matrix[13]] : matrix;
	},
	    _applySVGOrigin = function _applySVGOrigin(target, origin, originIsAbsolute, smooth, matrixArray, pluginToAddPropTweensTo) {
	  var cache = target._gsap,
	      matrix = matrixArray || _getMatrix(target, true),
	      xOriginOld = cache.xOrigin || 0,
	      yOriginOld = cache.yOrigin || 0,
	      xOffsetOld = cache.xOffset || 0,
	      yOffsetOld = cache.yOffset || 0,
	      a = matrix[0],
	      b = matrix[1],
	      c = matrix[2],
	      d = matrix[3],
	      tx = matrix[4],
	      ty = matrix[5],
	      originSplit = origin.split(" "),
	      xOrigin = parseFloat(originSplit[0]) || 0,
	      yOrigin = parseFloat(originSplit[1]) || 0,
	      bounds,
	      determinant,
	      x,
	      y;

	  if (!originIsAbsolute) {
	    bounds = _getBBox(target);
	    xOrigin = bounds.x + (~originSplit[0].indexOf("%") ? xOrigin / 100 * bounds.width : xOrigin);
	    yOrigin = bounds.y + (~(originSplit[1] || originSplit[0]).indexOf("%") ? yOrigin / 100 * bounds.height : yOrigin);
	  } else if (matrix !== _identity2DMatrix && (determinant = a * d - b * c)) {
	    //if it's zero (like if scaleX and scaleY are zero), skip it to avoid errors with dividing by zero.
	    x = xOrigin * (d / determinant) + yOrigin * (-c / determinant) + (c * ty - d * tx) / determinant;
	    y = xOrigin * (-b / determinant) + yOrigin * (a / determinant) - (a * ty - b * tx) / determinant;
	    xOrigin = x;
	    yOrigin = y;
	  }

	  if (smooth || smooth !== false && cache.smooth) {
	    tx = xOrigin - xOriginOld;
	    ty = yOrigin - yOriginOld;
	    cache.xOffset = xOffsetOld + (tx * a + ty * c) - tx;
	    cache.yOffset = yOffsetOld + (tx * b + ty * d) - ty;
	  } else {
	    cache.xOffset = cache.yOffset = 0;
	  }

	  cache.xOrigin = xOrigin;
	  cache.yOrigin = yOrigin;
	  cache.smooth = !!smooth;
	  cache.origin = origin;
	  cache.originIsAbsolute = !!originIsAbsolute;
	  target.style[_transformOriginProp] = "0px 0px"; //otherwise, if someone sets  an origin via CSS, it will likely interfere with the SVG transform attribute ones (because remember, we're baking the origin into the matrix() value).

	  if (pluginToAddPropTweensTo) {
	    _addNonTweeningPT(pluginToAddPropTweensTo, cache, "xOrigin", xOriginOld, xOrigin);

	    _addNonTweeningPT(pluginToAddPropTweensTo, cache, "yOrigin", yOriginOld, yOrigin);

	    _addNonTweeningPT(pluginToAddPropTweensTo, cache, "xOffset", xOffsetOld, cache.xOffset);

	    _addNonTweeningPT(pluginToAddPropTweensTo, cache, "yOffset", yOffsetOld, cache.yOffset);
	  }

	  target.setAttribute("data-svg-origin", xOrigin + " " + yOrigin);
	},
	    _parseTransform = function _parseTransform(target, uncache) {
	  var cache = target._gsap || new GSCache(target);

	  if ("x" in cache && !uncache && !cache.uncache) {
	    return cache;
	  }

	  var style = target.style,
	      invertedScaleX = cache.scaleX < 0,
	      px = "px",
	      deg = "deg",
	      origin = _getComputedProperty(target, _transformOriginProp) || "0",
	      x,
	      y,
	      z,
	      scaleX,
	      scaleY,
	      rotation,
	      rotationX,
	      rotationY,
	      skewX,
	      skewY,
	      perspective,
	      xOrigin,
	      yOrigin,
	      matrix,
	      angle,
	      cos,
	      sin,
	      a,
	      b,
	      c,
	      d,
	      a12,
	      a22,
	      t1,
	      t2,
	      t3,
	      a13,
	      a23,
	      a33,
	      a42,
	      a43,
	      a32;
	  x = y = z = rotation = rotationX = rotationY = skewX = skewY = perspective = 0;
	  scaleX = scaleY = 1;
	  cache.svg = !!(target.getCTM && _isSVG(target));
	  matrix = _getMatrix(target, cache.svg);

	  if (cache.svg) {
	    t1 = (!cache.uncache || origin === "0px 0px") && !uncache && target.getAttribute("data-svg-origin"); // if origin is 0,0 and cache.uncache is true, let the recorded data-svg-origin stay. Otherwise, whenever we set cache.uncache to true, we'd need to set element.style.transformOrigin = (cache.xOrigin - bbox.x) + "px " + (cache.yOrigin - bbox.y) + "px". Remember, to work around browser inconsistencies we always force SVG elements' transformOrigin to 0,0 and offset the translation accordingly.

	    _applySVGOrigin(target, t1 || origin, !!t1 || cache.originIsAbsolute, cache.smooth !== false, matrix);
	  }

	  xOrigin = cache.xOrigin || 0;
	  yOrigin = cache.yOrigin || 0;

	  if (matrix !== _identity2DMatrix) {
	    a = matrix[0]; //a11

	    b = matrix[1]; //a21

	    c = matrix[2]; //a31

	    d = matrix[3]; //a41

	    x = a12 = matrix[4];
	    y = a22 = matrix[5]; //2D matrix

	    if (matrix.length === 6) {
	      scaleX = Math.sqrt(a * a + b * b);
	      scaleY = Math.sqrt(d * d + c * c);
	      rotation = a || b ? _atan2(b, a) * _RAD2DEG : 0; //note: if scaleX is 0, we cannot accurately measure rotation. Same for skewX with a scaleY of 0. Therefore, we default to the previously recorded value (or zero if that doesn't exist).

	      skewX = c || d ? _atan2(c, d) * _RAD2DEG + rotation : 0;
	      skewX && (scaleY *= Math.abs(Math.cos(skewX * _DEG2RAD)));

	      if (cache.svg) {
	        x -= xOrigin - (xOrigin * a + yOrigin * c);
	        y -= yOrigin - (xOrigin * b + yOrigin * d);
	      } //3D matrix

	    } else {
	      a32 = matrix[6];
	      a42 = matrix[7];
	      a13 = matrix[8];
	      a23 = matrix[9];
	      a33 = matrix[10];
	      a43 = matrix[11];
	      x = matrix[12];
	      y = matrix[13];
	      z = matrix[14];
	      angle = _atan2(a32, a33);
	      rotationX = angle * _RAD2DEG; //rotationX

	      if (angle) {
	        cos = Math.cos(-angle);
	        sin = Math.sin(-angle);
	        t1 = a12 * cos + a13 * sin;
	        t2 = a22 * cos + a23 * sin;
	        t3 = a32 * cos + a33 * sin;
	        a13 = a12 * -sin + a13 * cos;
	        a23 = a22 * -sin + a23 * cos;
	        a33 = a32 * -sin + a33 * cos;
	        a43 = a42 * -sin + a43 * cos;
	        a12 = t1;
	        a22 = t2;
	        a32 = t3;
	      } //rotationY


	      angle = _atan2(-c, a33);
	      rotationY = angle * _RAD2DEG;

	      if (angle) {
	        cos = Math.cos(-angle);
	        sin = Math.sin(-angle);
	        t1 = a * cos - a13 * sin;
	        t2 = b * cos - a23 * sin;
	        t3 = c * cos - a33 * sin;
	        a43 = d * sin + a43 * cos;
	        a = t1;
	        b = t2;
	        c = t3;
	      } //rotationZ


	      angle = _atan2(b, a);
	      rotation = angle * _RAD2DEG;

	      if (angle) {
	        cos = Math.cos(angle);
	        sin = Math.sin(angle);
	        t1 = a * cos + b * sin;
	        t2 = a12 * cos + a22 * sin;
	        b = b * cos - a * sin;
	        a22 = a22 * cos - a12 * sin;
	        a = t1;
	        a12 = t2;
	      }

	      if (rotationX && Math.abs(rotationX) + Math.abs(rotation) > 359.9) {
	        //when rotationY is set, it will often be parsed as 180 degrees different than it should be, and rotationX and rotation both being 180 (it looks the same), so we adjust for that here.
	        rotationX = rotation = 0;
	        rotationY = 180 - rotationY;
	      }

	      scaleX = _round(Math.sqrt(a * a + b * b + c * c));
	      scaleY = _round(Math.sqrt(a22 * a22 + a32 * a32));
	      angle = _atan2(a12, a22);
	      skewX = Math.abs(angle) > 0.0002 ? angle * _RAD2DEG : 0;
	      perspective = a43 ? 1 / (a43 < 0 ? -a43 : a43) : 0;
	    }

	    if (cache.svg) {
	      //sense if there are CSS transforms applied on an SVG element in which case we must overwrite them when rendering. The transform attribute is more reliable cross-browser, but we can't just remove the CSS ones because they may be applied in a CSS rule somewhere (not just inline).
	      t1 = target.getAttribute("transform");
	      cache.forceCSS = target.setAttribute("transform", "") || !_isNullTransform(_getComputedProperty(target, _transformProp));
	      t1 && target.setAttribute("transform", t1);
	    }
	  }

	  if (Math.abs(skewX) > 90 && Math.abs(skewX) < 270) {
	    if (invertedScaleX) {
	      scaleX *= -1;
	      skewX += rotation <= 0 ? 180 : -180;
	      rotation += rotation <= 0 ? 180 : -180;
	    } else {
	      scaleY *= -1;
	      skewX += skewX <= 0 ? 180 : -180;
	    }
	  }

	  uncache = uncache || cache.uncache;
	  cache.x = x - ((cache.xPercent = x && (!uncache && cache.xPercent || (Math.round(target.offsetWidth / 2) === Math.round(-x) ? -50 : 0))) ? target.offsetWidth * cache.xPercent / 100 : 0) + px;
	  cache.y = y - ((cache.yPercent = y && (!uncache && cache.yPercent || (Math.round(target.offsetHeight / 2) === Math.round(-y) ? -50 : 0))) ? target.offsetHeight * cache.yPercent / 100 : 0) + px;
	  cache.z = z + px;
	  cache.scaleX = _round(scaleX);
	  cache.scaleY = _round(scaleY);
	  cache.rotation = _round(rotation) + deg;
	  cache.rotationX = _round(rotationX) + deg;
	  cache.rotationY = _round(rotationY) + deg;
	  cache.skewX = skewX + deg;
	  cache.skewY = skewY + deg;
	  cache.transformPerspective = perspective + px;

	  if (cache.zOrigin = parseFloat(origin.split(" ")[2]) || 0) {
	    style[_transformOriginProp] = _firstTwoOnly(origin);
	  }

	  cache.xOffset = cache.yOffset = 0;
	  cache.force3D = _config.force3D;
	  cache.renderTransform = cache.svg ? _renderSVGTransforms : _supports3D ? _renderCSSTransforms : _renderNon3DTransforms;
	  cache.uncache = 0;
	  return cache;
	},
	    _firstTwoOnly = function _firstTwoOnly(value) {
	  return (value = value.split(" "))[0] + " " + value[1];
	},
	    //for handling transformOrigin values, stripping out the 3rd dimension
	_addPxTranslate = function _addPxTranslate(target, start, value) {
	  var unit = getUnit(start);
	  return _round(parseFloat(start) + parseFloat(_convertToUnit(target, "x", value + "px", unit))) + unit;
	},
	    _renderNon3DTransforms = function _renderNon3DTransforms(ratio, cache) {
	  cache.z = "0px";
	  cache.rotationY = cache.rotationX = "0deg";
	  cache.force3D = 0;

	  _renderCSSTransforms(ratio, cache);
	},
	    _zeroDeg = "0deg",
	    _zeroPx = "0px",
	    _endParenthesis = ") ",
	    _renderCSSTransforms = function _renderCSSTransforms(ratio, cache) {
	  var _ref = cache || this,
	      xPercent = _ref.xPercent,
	      yPercent = _ref.yPercent,
	      x = _ref.x,
	      y = _ref.y,
	      z = _ref.z,
	      rotation = _ref.rotation,
	      rotationY = _ref.rotationY,
	      rotationX = _ref.rotationX,
	      skewX = _ref.skewX,
	      skewY = _ref.skewY,
	      scaleX = _ref.scaleX,
	      scaleY = _ref.scaleY,
	      transformPerspective = _ref.transformPerspective,
	      force3D = _ref.force3D,
	      target = _ref.target,
	      zOrigin = _ref.zOrigin,
	      transforms = "",
	      use3D = force3D === "auto" && ratio && ratio !== 1 || force3D === true; // Safari has a bug that causes it not to render 3D transform-origin values properly, so we force the z origin to 0, record it in the cache, and then do the math here to offset the translate values accordingly (basically do the 3D transform-origin part manually)


	  if (zOrigin && (rotationX !== _zeroDeg || rotationY !== _zeroDeg)) {
	    var angle = parseFloat(rotationY) * _DEG2RAD,
	        a13 = Math.sin(angle),
	        a33 = Math.cos(angle),
	        cos;

	    angle = parseFloat(rotationX) * _DEG2RAD;
	    cos = Math.cos(angle);
	    x = _addPxTranslate(target, x, a13 * cos * -zOrigin);
	    y = _addPxTranslate(target, y, -Math.sin(angle) * -zOrigin);
	    z = _addPxTranslate(target, z, a33 * cos * -zOrigin + zOrigin);
	  }

	  if (transformPerspective !== _zeroPx) {
	    transforms += "perspective(" + transformPerspective + _endParenthesis;
	  }

	  if (xPercent || yPercent) {
	    transforms += "translate(" + xPercent + "%, " + yPercent + "%) ";
	  }

	  if (use3D || x !== _zeroPx || y !== _zeroPx || z !== _zeroPx) {
	    transforms += z !== _zeroPx || use3D ? "translate3d(" + x + ", " + y + ", " + z + ") " : "translate(" + x + ", " + y + _endParenthesis;
	  }

	  if (rotation !== _zeroDeg) {
	    transforms += "rotate(" + rotation + _endParenthesis;
	  }

	  if (rotationY !== _zeroDeg) {
	    transforms += "rotateY(" + rotationY + _endParenthesis;
	  }

	  if (rotationX !== _zeroDeg) {
	    transforms += "rotateX(" + rotationX + _endParenthesis;
	  }

	  if (skewX !== _zeroDeg || skewY !== _zeroDeg) {
	    transforms += "skew(" + skewX + ", " + skewY + _endParenthesis;
	  }

	  if (scaleX !== 1 || scaleY !== 1) {
	    transforms += "scale(" + scaleX + ", " + scaleY + _endParenthesis;
	  }

	  target.style[_transformProp] = transforms || "translate(0, 0)";
	},
	    _renderSVGTransforms = function _renderSVGTransforms(ratio, cache) {
	  var _ref2 = cache || this,
	      xPercent = _ref2.xPercent,
	      yPercent = _ref2.yPercent,
	      x = _ref2.x,
	      y = _ref2.y,
	      rotation = _ref2.rotation,
	      skewX = _ref2.skewX,
	      skewY = _ref2.skewY,
	      scaleX = _ref2.scaleX,
	      scaleY = _ref2.scaleY,
	      target = _ref2.target,
	      xOrigin = _ref2.xOrigin,
	      yOrigin = _ref2.yOrigin,
	      xOffset = _ref2.xOffset,
	      yOffset = _ref2.yOffset,
	      forceCSS = _ref2.forceCSS,
	      tx = parseFloat(x),
	      ty = parseFloat(y),
	      a11,
	      a21,
	      a12,
	      a22,
	      temp;

	  rotation = parseFloat(rotation);
	  skewX = parseFloat(skewX);
	  skewY = parseFloat(skewY);

	  if (skewY) {
	    //for performance reasons, we combine all skewing into the skewX and rotation values. Remember, a skewY of 10 degrees looks the same as a rotation of 10 degrees plus a skewX of 10 degrees.
	    skewY = parseFloat(skewY);
	    skewX += skewY;
	    rotation += skewY;
	  }

	  if (rotation || skewX) {
	    rotation *= _DEG2RAD;
	    skewX *= _DEG2RAD;
	    a11 = Math.cos(rotation) * scaleX;
	    a21 = Math.sin(rotation) * scaleX;
	    a12 = Math.sin(rotation - skewX) * -scaleY;
	    a22 = Math.cos(rotation - skewX) * scaleY;

	    if (skewX) {
	      skewY *= _DEG2RAD;
	      temp = Math.tan(skewX - skewY);
	      temp = Math.sqrt(1 + temp * temp);
	      a12 *= temp;
	      a22 *= temp;

	      if (skewY) {
	        temp = Math.tan(skewY);
	        temp = Math.sqrt(1 + temp * temp);
	        a11 *= temp;
	        a21 *= temp;
	      }
	    }

	    a11 = _round(a11);
	    a21 = _round(a21);
	    a12 = _round(a12);
	    a22 = _round(a22);
	  } else {
	    a11 = scaleX;
	    a22 = scaleY;
	    a21 = a12 = 0;
	  }

	  if (tx && !~(x + "").indexOf("px") || ty && !~(y + "").indexOf("px")) {
	    tx = _convertToUnit(target, "x", x, "px");
	    ty = _convertToUnit(target, "y", y, "px");
	  }

	  if (xOrigin || yOrigin || xOffset || yOffset) {
	    tx = _round(tx + xOrigin - (xOrigin * a11 + yOrigin * a12) + xOffset);
	    ty = _round(ty + yOrigin - (xOrigin * a21 + yOrigin * a22) + yOffset);
	  }

	  if (xPercent || yPercent) {
	    //The SVG spec doesn't support percentage-based translation in the "transform" attribute, so we merge it into the translation to simulate it.
	    temp = target.getBBox();
	    tx = _round(tx + xPercent / 100 * temp.width);
	    ty = _round(ty + yPercent / 100 * temp.height);
	  }

	  temp = "matrix(" + a11 + "," + a21 + "," + a12 + "," + a22 + "," + tx + "," + ty + ")";
	  target.setAttribute("transform", temp);
	  forceCSS && (target.style[_transformProp] = temp); //some browsers prioritize CSS transforms over the transform attribute. When we sense that the user has CSS transforms applied, we must overwrite them this way (otherwise some browser simply won't render the  transform attribute changes!)
	},
	    _addRotationalPropTween = function _addRotationalPropTween(plugin, target, property, startNum, endValue) {
	  var cap = 360,
	      isString = _isString(endValue),
	      endNum = parseFloat(endValue) * (isString && ~endValue.indexOf("rad") ? _RAD2DEG : 1),
	      change = endNum - startNum,
	      finalValue = startNum + change + "deg",
	      direction,
	      pt;

	  if (isString) {
	    direction = endValue.split("_")[1];

	    if (direction === "short") {
	      change %= cap;

	      if (change !== change % (cap / 2)) {
	        change += change < 0 ? cap : -cap;
	      }
	    }

	    if (direction === "cw" && change < 0) {
	      change = (change + cap * _bigNum) % cap - ~~(change / cap) * cap;
	    } else if (direction === "ccw" && change > 0) {
	      change = (change - cap * _bigNum) % cap - ~~(change / cap) * cap;
	    }
	  }

	  plugin._pt = pt = new PropTween(plugin._pt, target, property, startNum, change, _renderPropWithEnd);
	  pt.e = finalValue;
	  pt.u = "deg";

	  plugin._props.push(property);

	  return pt;
	},
	    _assign = function _assign(target, source) {
	  // Internet Explorer doesn't have Object.assign(), so we recreate it here.
	  for (var p in source) {
	    target[p] = source[p];
	  }

	  return target;
	},
	    _addRawTransformPTs = function _addRawTransformPTs(plugin, transforms, target) {
	  //for handling cases where someone passes in a whole transform string, like transform: "scale(2, 3) rotate(20deg) translateY(30em)"
	  var startCache = _assign({}, target._gsap),
	      exclude = "perspective,force3D,transformOrigin,svgOrigin",
	      style = target.style,
	      endCache,
	      p,
	      startValue,
	      endValue,
	      startNum,
	      endNum,
	      startUnit,
	      endUnit;

	  if (startCache.svg) {
	    startValue = target.getAttribute("transform");
	    target.setAttribute("transform", "");
	    style[_transformProp] = transforms;
	    endCache = _parseTransform(target, 1);

	    _removeProperty(target, _transformProp);

	    target.setAttribute("transform", startValue);
	  } else {
	    startValue = getComputedStyle(target)[_transformProp];
	    style[_transformProp] = transforms;
	    endCache = _parseTransform(target, 1);
	    style[_transformProp] = startValue;
	  }

	  for (p in _transformProps) {
	    startValue = startCache[p];
	    endValue = endCache[p];

	    if (startValue !== endValue && exclude.indexOf(p) < 0) {
	      //tweening to no perspective gives very unintuitive results - just keep the same perspective in that case.
	      startUnit = getUnit(startValue);
	      endUnit = getUnit(endValue);
	      startNum = startUnit !== endUnit ? _convertToUnit(target, p, startValue, endUnit) : parseFloat(startValue);
	      endNum = parseFloat(endValue);
	      plugin._pt = new PropTween(plugin._pt, endCache, p, startNum, endNum - startNum, _renderCSSProp);
	      plugin._pt.u = endUnit || 0;

	      plugin._props.push(p);
	    }
	  }

	  _assign(endCache, startCache);
	}; // handle splitting apart padding, margin, borderWidth, and borderRadius into their 4 components. Firefox, for example, won't report borderRadius correctly - it will only do borderTopLeftRadius and the other corners. We also want to handle paddingTop, marginLeft, borderRightWidth, etc.


	_forEachName("padding,margin,Width,Radius", function (name, index) {
	  var t = "Top",
	      r = "Right",
	      b = "Bottom",
	      l = "Left",
	      props = (index < 3 ? [t, r, b, l] : [t + l, t + r, b + r, b + l]).map(function (side) {
	    return index < 2 ? name + side : "border" + side + name;
	  });

	  _specialProps[index > 1 ? "border" + name : name] = function (plugin, target, property, endValue, tween) {
	    var a, vars;

	    if (arguments.length < 4) {
	      // getter, passed target, property, and unit (from _get())
	      a = props.map(function (prop) {
	        return _get(plugin, prop, property);
	      });
	      vars = a.join(" ");
	      return vars.split(a[0]).length === 5 ? a[0] : vars;
	    }

	    a = (endValue + "").split(" ");
	    vars = {};
	    props.forEach(function (prop, i) {
	      return vars[prop] = a[i] = a[i] || a[(i - 1) / 2 | 0];
	    });
	    plugin.init(target, vars, tween);
	  };
	});

	var CSSPlugin = {
	  name: "css",
	  register: _initCore,
	  targetTest: function targetTest(target) {
	    return target.style && target.nodeType;
	  },
	  init: function init(target, vars, tween, index, targets) {
	    var props = this._props,
	        style = target.style,
	        startAt = tween.vars.startAt,
	        startValue,
	        endValue,
	        endNum,
	        startNum,
	        type,
	        specialProp,
	        p,
	        startUnit,
	        endUnit,
	        relative,
	        isTransformRelated,
	        transformPropTween,
	        cache,
	        smooth,
	        hasPriority;
	    _pluginInitted || _initCore();

	    for (p in vars) {
	      if (p === "autoRound") {
	        continue;
	      }

	      endValue = vars[p];

	      if (_plugins[p] && _checkPlugin(p, vars, tween, index, target, targets)) {
	        // plugins
	        continue;
	      }

	      type = typeof endValue;
	      specialProp = _specialProps[p];

	      if (type === "function") {
	        endValue = endValue.call(tween, index, target, targets);
	        type = typeof endValue;
	      }

	      if (type === "string" && ~endValue.indexOf("random(")) {
	        endValue = _replaceRandom(endValue);
	      }

	      if (specialProp) {
	        specialProp(this, target, p, endValue, tween) && (hasPriority = 1);
	      } else if (p.substr(0, 2) === "--") {
	        //CSS variable
	        startValue = (getComputedStyle(target).getPropertyValue(p) + "").trim();
	        endValue += "";
	        _colorExp.lastIndex = 0;

	        if (!_colorExp.test(startValue)) {
	          // colors don't have units
	          startUnit = getUnit(startValue);
	          endUnit = getUnit(endValue);
	        }

	        endUnit ? startUnit !== endUnit && (startValue = _convertToUnit(target, p, startValue, endUnit) + endUnit) : startUnit && (endValue += startUnit);
	        this.add(style, "setProperty", startValue, endValue, index, targets, 0, 0, p);
	        props.push(p);
	      } else if (type !== "undefined") {
	        if (startAt && p in startAt) {
	          // in case someone hard-codes a complex value as the start, like top: "calc(2vh / 2)". Without this, it'd use the computed value (always in px)
	          startValue = typeof startAt[p] === "function" ? startAt[p].call(tween, index, target, targets) : startAt[p];
	          _isString(startValue) && ~startValue.indexOf("random(") && (startValue = _replaceRandom(startValue));
	          getUnit(startValue + "") || (startValue += _config.units[p] || getUnit(_get(target, p)) || ""); // for cases when someone passes in a unitless value like {x: 100}; if we try setting translate(100, 0px) it won't work.

	          (startValue + "").charAt(1) === "=" && (startValue = _get(target, p)); // can't work with relative values
	        } else {
	          startValue = _get(target, p);
	        }

	        startNum = parseFloat(startValue);
	        relative = type === "string" && endValue.charAt(1) === "=" && endValue.substr(0, 2);
	        relative && (endValue = endValue.substr(2));
	        endNum = parseFloat(endValue);

	        if (p in _propertyAliases) {
	          if (p === "autoAlpha") {
	            //special case where we control the visibility along with opacity. We still allow the opacity value to pass through and get tweened.
	            if (startNum === 1 && _get(target, "visibility") === "hidden" && endNum) {
	              //if visibility is initially set to "hidden", we should interpret that as intent to make opacity 0 (a convenience)
	              startNum = 0;
	            }

	            _addNonTweeningPT(this, style, "visibility", startNum ? "inherit" : "hidden", endNum ? "inherit" : "hidden", !endNum);
	          }

	          if (p !== "scale" && p !== "transform") {
	            p = _propertyAliases[p];
	            ~p.indexOf(",") && (p = p.split(",")[0]);
	          }
	        }

	        isTransformRelated = p in _transformProps; //--- TRANSFORM-RELATED ---

	        if (isTransformRelated) {
	          if (!transformPropTween) {
	            cache = target._gsap;
	            cache.renderTransform && !vars.parseTransform || _parseTransform(target, vars.parseTransform); // if, for example, gsap.set(... {transform:"translateX(50vw)"}), the _get() call doesn't parse the transform, thus cache.renderTransform won't be set yet so force the parsing of the transform here.

	            smooth = vars.smoothOrigin !== false && cache.smooth;
	            transformPropTween = this._pt = new PropTween(this._pt, style, _transformProp, 0, 1, cache.renderTransform, cache, 0, -1); //the first time through, create the rendering PropTween so that it runs LAST (in the linked list, we keep adding to the beginning)

	            transformPropTween.dep = 1; //flag it as dependent so that if things get killed/overwritten and this is the only PropTween left, we can safely kill the whole tween.
	          }

	          if (p === "scale") {
	            this._pt = new PropTween(this._pt, cache, "scaleY", cache.scaleY, (relative ? _parseRelative(cache.scaleY, relative + endNum) : endNum) - cache.scaleY || 0);
	            props.push("scaleY", p);
	            p += "X";
	          } else if (p === "transformOrigin") {
	            endValue = _convertKeywordsToPercentages(endValue); //in case something like "left top" or "bottom right" is passed in. Convert to percentages.

	            if (cache.svg) {
	              _applySVGOrigin(target, endValue, 0, smooth, 0, this);
	            } else {
	              endUnit = parseFloat(endValue.split(" ")[2]) || 0; //handle the zOrigin separately!

	              endUnit !== cache.zOrigin && _addNonTweeningPT(this, cache, "zOrigin", cache.zOrigin, endUnit);

	              _addNonTweeningPT(this, style, p, _firstTwoOnly(startValue), _firstTwoOnly(endValue));
	            }

	            continue;
	          } else if (p === "svgOrigin") {
	            _applySVGOrigin(target, endValue, 1, smooth, 0, this);

	            continue;
	          } else if (p in _rotationalProperties) {
	            _addRotationalPropTween(this, cache, p, startNum, relative ? _parseRelative(startNum, relative + endValue) : endValue);

	            continue;
	          } else if (p === "smoothOrigin") {
	            _addNonTweeningPT(this, cache, "smooth", cache.smooth, endValue);

	            continue;
	          } else if (p === "force3D") {
	            cache[p] = endValue;
	            continue;
	          } else if (p === "transform") {
	            _addRawTransformPTs(this, endValue, target);

	            continue;
	          }
	        } else if (!(p in style)) {
	          p = _checkPropPrefix(p) || p;
	        }

	        if (isTransformRelated || (endNum || endNum === 0) && (startNum || startNum === 0) && !_complexExp.test(endValue) && p in style) {
	          startUnit = (startValue + "").substr((startNum + "").length);
	          endNum || (endNum = 0); // protect against NaN

	          endUnit = getUnit(endValue) || (p in _config.units ? _config.units[p] : startUnit);
	          startUnit !== endUnit && (startNum = _convertToUnit(target, p, startValue, endUnit));
	          this._pt = new PropTween(this._pt, isTransformRelated ? cache : style, p, startNum, (relative ? _parseRelative(startNum, relative + endNum) : endNum) - startNum, !isTransformRelated && (endUnit === "px" || p === "zIndex") && vars.autoRound !== false ? _renderRoundedCSSProp : _renderCSSProp);
	          this._pt.u = endUnit || 0;

	          if (startUnit !== endUnit && endUnit !== "%") {
	            //when the tween goes all the way back to the beginning, we need to revert it to the OLD/ORIGINAL value (with those units). We record that as a "b" (beginning) property and point to a render method that handles that. (performance optimization)
	            this._pt.b = startValue;
	            this._pt.r = _renderCSSPropWithBeginning;
	          }
	        } else if (!(p in style)) {
	          if (p in target) {
	            //maybe it's not a style - it could be a property added directly to an element in which case we'll try to animate that.
	            this.add(target, p, startValue || target[p], relative ? relative + endValue : endValue, index, targets);
	          } else {
	            _missingPlugin(p, endValue);

	            continue;
	          }
	        } else {
	          _tweenComplexCSSString.call(this, target, p, startValue, relative ? relative + endValue : endValue);
	        }

	        props.push(p);
	      }
	    }

	    hasPriority && _sortPropTweensByPriority(this);
	  },
	  get: _get,
	  aliases: _propertyAliases,
	  getSetter: function getSetter(target, property, plugin) {
	    //returns a setter function that accepts target, property, value and applies it accordingly. Remember, properties like "x" aren't as simple as target.style.property = value because they've got to be applied to a proxy object and then merged into a transform string in a renderer.
	    var p = _propertyAliases[property];
	    p && p.indexOf(",") < 0 && (property = p);
	    return property in _transformProps && property !== _transformOriginProp && (target._gsap.x || _get(target, "x")) ? plugin && _recentSetterPlugin === plugin ? property === "scale" ? _setterScale : _setterTransform : (_recentSetterPlugin = plugin || {}) && (property === "scale" ? _setterScaleWithRender : _setterTransformWithRender) : target.style && !_isUndefined(target.style[property]) ? _setterCSSStyle : ~property.indexOf("-") ? _setterCSSProp : _getSetter(target, property);
	  },
	  core: {
	    _removeProperty: _removeProperty,
	    _getMatrix: _getMatrix
	  }
	};
	gsap.utils.checkPrefix = _checkPropPrefix;

	(function (positionAndScale, rotation, others, aliases) {
	  var all = _forEachName(positionAndScale + "," + rotation + "," + others, function (name) {
	    _transformProps[name] = 1;
	  });

	  _forEachName(rotation, function (name) {
	    _config.units[name] = "deg";
	    _rotationalProperties[name] = 1;
	  });

	  _propertyAliases[all[13]] = positionAndScale + "," + rotation;

	  _forEachName(aliases, function (name) {
	    var split = name.split(":");
	    _propertyAliases[split[1]] = all[split[0]];
	  });
	})("x,y,z,scale,scaleX,scaleY,xPercent,yPercent", "rotation,rotationX,rotationY,skewX,skewY", "transform,transformOrigin,svgOrigin,force3D,smoothOrigin,transformPerspective", "0:translateX,1:translateY,2:translateZ,8:rotate,8:rotationZ,8:rotateZ,9:rotateX,10:rotateY");

	_forEachName("x,y,z,top,right,bottom,left,width,height,fontSize,padding,margin,perspective", function (name) {
	  _config.units[name] = "px";
	});

	gsap.registerPlugin(CSSPlugin);

	var gsapWithCSS = gsap.registerPlugin(CSSPlugin) || gsap;
	    // to protect from tree shaking
	gsapWithCSS.core.Tween;

	// Add your custom JS here.
	var console$1 = window.console;

	(function ($) {
	  $('#loadingPage').addClass('animate__animated animate__fadeOut');
	  setTimeout(function () {
	    $('#loadingPage').fadeOut();
	  }, 2000);
	  const logoAnimated = $('.logo-animated');
	  $(window).scroll(function () {
	    console$1.log($(window).scrollTop());

	    if ($(window).scrollTop() >= 100) {
	      // alert('scrolltop')
	      logoAnimated.addClass('scrolled');
	    } else {
	      logoAnimated.removeClass('scrolled');
	    }
	  });
	  let marquee = document.querySelectorAll('.clipped-text');
	  marquee.forEach(el => {
	    let rate = 200;
	    let distance = el.clientWidth;
	    let style = window.getComputedStyle(el);
	    let marginRight = parseInt(style.marginRight) || 0;
	    let totalDistance = distance + marginRight;
	    let time = totalDistance / rate;
	    let container = el.parentElement;
	    gsapWithCSS.to(container, time, {
	      repeat: -1,
	      x: '-' + totalDistance,
	      ease: 'linear'
	    });
	  });
	  $('.btn-collapse').click(function () {
	    const $this = $(this);
	    const iconWrapper = $this.children('.collapse-icon');

	    if ($this.hasClass('collapsed')) {
	      iconWrapper.html('<i class="fa-solid fa-plus"></i>');
	    } else {
	      iconWrapper.html('<i class="fa-solid fa-minus"></i>');
	    }
	  });
	  $('#langSelector').on('change', function () {
	    let url = $(this).val(); // get selected value

	    if (url) {
	      // require a URL
	      alert(url); // log it

	      window.location = url; // redirect
	    }

	    return false;
	  });
	})(jQuery);

	exports.Alert = alert$1;
	exports.Button = button;
	exports.Carousel = carousel;
	exports.Collapse = collapse;
	exports.Dropdown = dropdown;
	exports.Modal = modal;
	exports.Offcanvas = offcanvas;
	exports.Popover = popover;
	exports.Scrollspy = scrollspy;
	exports.Tab = tab;
	exports.Toast = toast;
	exports.Tooltip = tooltip;

	Object.defineProperty(exports, '__esModule', { value: true });

}));
//# sourceMappingURL=child-theme.js.map

'use strict';Object.defineProperty(exports,'__esModule',{value:true});function _slicedToArray(arr, i) {
  return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
}

function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}

function _iterableToArrayLimit(arr, i) {
  if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return;
  var _arr = [];
  var _n = true;
  var _d = false;
  var _e = undefined;

  try {
    for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
      _arr.push(_s.value);

      if (i && _arr.length === i) break;
    }
  } catch (err) {
    _d = true;
    _e = err;
  } finally {
    try {
      if (!_n && _i["return"] != null) _i["return"]();
    } finally {
      if (_d) throw _e;
    }
  }

  return _arr;
}

function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}

function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;

  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];

  return arr2;
}

function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/* eslint-disable */
var script = {
  name: "DraggableCards",
  props: {
    title: String,
    subtitle: String,
    text: String,
    image: String,
    randomTilt: Boolean,
    randomMax: {
      type: Number,
      default: 15
    },
    randomMin: {
      type: Number,
      default: 10
    }
  },
  mounted: function mounted() {
    if (this.randomTilt) this.rotate = Math.floor(Math.random() * (this.randomMax - this.randomMin)) + this.randomMin;
  },
  data: function data() {
    return {
      imageShadow: false,
      imagePosition: false,
      pos1: 0,
      pos2: 0,
      pos3: 0,
      pos4: 0,
      rotate: 0
    };
  },
  methods: {
    dragMouseDown: function dragMouseDown(e) {
      e = e || window.event;
      e.preventDefault(); // get the mouse cursor position at startup:

      this.pos3 = e.clientX;
      this.pos4 = e.clientY; // call a function whenever the cursor moves:

      document.onmousemove = this.elementDrag;
      this.imageShadow = true;
      this.$refs.eCard.style.cursor = "grabbing";
      this.$refs.eCard.style.zIndex = 50;
      this.imagePosition = true;
    },
    elementDrag: function elementDrag(e) {
      e = e || window.event;
      e.preventDefault(); // calculate the new cursor position:

      this.pos1 = this.pos3 - e.clientX;
      this.pos2 = this.pos4 - e.clientY;
      this.pos3 = e.clientX;
      this.pos4 = e.clientY; // set the element's new position:

      this.$refs.eCard.style.margin = 0;
      this.$refs.eCard.style.top = this.$refs.eCard.offsetTop - this.pos2 + "px";
      this.$refs.eCard.style.left = this.$refs.eCard.offsetLeft - this.pos1 + "px";
      this.$emit('drag', e);
    },
    closeDragElement: function closeDragElement() {
      // stop moving when mouse button is released:
      document.onmouseup = null;
      document.onmousemove = null;
      this.$refs.eCard.style.zIndex = 1;
      this.imageShadow = false;
    }
  }
};function normalizeComponent(template, style, script, scopeId, isFunctionalTemplate, moduleIdentifier /* server only */, shadowMode, createInjector, createInjectorSSR, createInjectorShadow) {
    if (typeof shadowMode !== 'boolean') {
        createInjectorSSR = createInjector;
        createInjector = shadowMode;
        shadowMode = false;
    }
    // Vue.extend constructor export interop.
    const options = typeof script === 'function' ? script.options : script;
    // render functions
    if (template && template.render) {
        options.render = template.render;
        options.staticRenderFns = template.staticRenderFns;
        options._compiled = true;
        // functional template
        if (isFunctionalTemplate) {
            options.functional = true;
        }
    }
    // scopedId
    if (scopeId) {
        options._scopeId = scopeId;
    }
    let hook;
    if (moduleIdentifier) {
        // server build
        hook = function (context) {
            // 2.3 injection
            context =
                context || // cached call
                    (this.$vnode && this.$vnode.ssrContext) || // stateful
                    (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext); // functional
            // 2.2 with runInNewContext: true
            if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
                context = __VUE_SSR_CONTEXT__;
            }
            // inject component styles
            if (style) {
                style.call(this, createInjectorSSR(context));
            }
            // register component module identifier for async chunk inference
            if (context && context._registeredComponents) {
                context._registeredComponents.add(moduleIdentifier);
            }
        };
        // used by ssr in case component is cached and beforeCreate
        // never gets called
        options._ssrRegister = hook;
    }
    else if (style) {
        hook = shadowMode
            ? function (context) {
                style.call(this, createInjectorShadow(context, this.$root.$options.shadowRoot));
            }
            : function (context) {
                style.call(this, createInjector(context));
            };
    }
    if (hook) {
        if (options.functional) {
            // register for functional component in vue file
            const originalRender = options.render;
            options.render = function renderWithStyleInjection(h, context) {
                hook.call(context);
                return originalRender(h, context);
            };
        }
        else {
            // inject component registration as beforeCreate hook
            const existing = options.beforeCreate;
            options.beforeCreate = existing ? [].concat(existing, hook) : [hook];
        }
    }
    return script;
}function createInjectorSSR(context) {
    if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__;
    }
    if (!context)
        return () => { };
    if (!('styles' in context)) {
        context._styles = context._styles || {};
        Object.defineProperty(context, 'styles', {
            enumerable: true,
            get: () => context._renderStyles(context._styles)
        });
        context._renderStyles = context._renderStyles || renderStyles;
    }
    return (id, style) => addStyle(id, style, context);
}
function addStyle(id, css, context) {
    const group =  css.media || 'default' ;
    const style = context._styles[group] || (context._styles[group] = { ids: [], css: '' });
    if (!style.ids.includes(id)) {
        style.media = css.media;
        style.ids.push(id);
        let code = css.source;
        style.css += code + '\n';
    }
}
function renderStyles(styles) {
    let css = '';
    for (const key in styles) {
        const style = styles[key];
        css +=
            '<style data-vue-ssr-id="' +
                Array.from(style.ids).join(' ') +
                '"' +
                (style.media ? ' media="' + style.media + '"' : '') +
                '>' +
                style.css +
                '</style>';
    }
    return css;
}/* script */
var __vue_script__ = script;
/* template */

var __vue_render__ = function __vue_render__() {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c('div', {
    ref: "eCard",
    staticClass: "event-cards eCard",
    class: {
      'enlarge-cards': _vm.imageShadow
    },
    style: {
      transform: _vm.imageShadow ? 'rotate(0deg)' : "rotate(" + _vm.rotate + "deg)"
    },
    attrs: {
      "hover": "",
      "elevation": _vm.imageShadow ? 10 : 1
    },
    on: {
      "mousedown": _vm.dragMouseDown,
      "mouseup": _vm.closeDragElement
    }
  }, [_vm._t("content", [_c('img', {
    staticClass: "pa-5",
    attrs: {
      "src": _vm.image
    }
  }), _vm._v(" "), _c('h1', [_vm._v(_vm._s(_vm.title))]), _vm._v(" "), _c('h2', [_vm._v(_vm._s(_vm.subtitle))]), _vm._v(" "), _vm.imageShadow ? _c('p', [_vm._v(_vm._s(_vm.text))]) : _vm._e()])], 2);
};

var __vue_staticRenderFns__ = [];
/* style */

var __vue_inject_styles__ = function __vue_inject_styles__(inject) {
  if (!inject) return;
  inject("data-v-4e036967_0", {
    source: ".event-cards{transition:transform .2s ease-in-out 0s,box-shadow .2s ease-in-out!important;position:absolute!important;z-index:2;cursor:grab!important;box-shadow:5px 4px 11px 0 rgba(0,0,0,.44);-webkit-box-shadow:5px 4px 11px 0 rgba(0,0,0,.44);-moz-box-shadow:5px 4px 11px 0 rgba(0,0,0,.44);padding:4rem}.event-cards:active{box-shadow:10px 10px 26px -2px rgba(0,0,0,.4);-webkit-box-shadow:10px 10px 26px -2px rgba(0,0,0,.4);-moz-box-shadow:10px 10px 26px -2px rgba(0,0,0,.4)}.enlarge-cards{transform:scale(1.1)}",
    map: undefined,
    media: undefined
  });
};
/* scoped */


var __vue_scope_id__ = undefined;
/* module identifier */

var __vue_module_identifier__ = "data-v-4e036967";
/* functional template */

var __vue_is_functional_template__ = false;
/* style inject shadow dom */

var __vue_component__ = /*#__PURE__*/normalizeComponent({
  render: __vue_render__,
  staticRenderFns: __vue_staticRenderFns__
}, __vue_inject_styles__, __vue_script__, __vue_scope_id__, __vue_is_functional_template__, __vue_module_identifier__, false, undefined, createInjectorSSR, undefined);/* eslint-disable import/prefer-default-export */var components=/*#__PURE__*/Object.freeze({__proto__:null,VueDraggableCard: __vue_component__});var install = function installVueDraggableCard(Vue) {
  if (install.installed) return;
  install.installed = true;
  Object.entries(components).forEach(function (_ref) {
    var _ref2 = _slicedToArray(_ref, 2),
        componentName = _ref2[0],
        component = _ref2[1];

    Vue.component(componentName, component);
  });
}; // Create module definition for Vue.use()


var plugin = {
  install: install
}; // To auto-install on non-es builds, when vue is found
// eslint-disable-next-line no-redeclare

/* global window, global */

{
  var GlobalVue = null;

  if (typeof window !== 'undefined') {
    GlobalVue = window.Vue;
  } else if (typeof global !== 'undefined') {
    GlobalVue = global.Vue;
  }

  if (GlobalVue) {
    GlobalVue.use(plugin);
  }
} // Default export is library as a whole, registered via Vue.use()
exports.VueDraggableCard=__vue_component__;exports.default=plugin;
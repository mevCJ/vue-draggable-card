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

  mounted() {
    if (this.randomTilt) this.rotate = Math.floor(Math.random() * (this.randomMax - this.randomMin)) + this.randomMin;
  },

  data: () => ({
    imageShadow: false,
    imagePosition: false,
    pos1: 0,
    pos2: 0,
    pos3: 0,
    pos4: 0,
    rotate: 0
  }),
  methods: {
    dragMouseDown(e) {
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

    elementDrag(e) {
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

    closeDragElement() {
      // stop moving when mouse button is released:
      document.onmouseup = null;
      document.onmousemove = null;
      this.$refs.eCard.style.zIndex = 1;
      this.imageShadow = false;
    }

  }
};

function normalizeComponent(template, style, script, scopeId, isFunctionalTemplate, moduleIdentifier /* server only */, shadowMode, createInjector, createInjectorSSR, createInjectorShadow) {
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
}

const isOldIE = typeof navigator !== 'undefined' &&
    /msie [6-9]\\b/.test(navigator.userAgent.toLowerCase());
function createInjector(context) {
    return (id, style) => addStyle(id, style);
}
let HEAD;
const styles = {};
function addStyle(id, css) {
    const group = isOldIE ? css.media || 'default' : id;
    const style = styles[group] || (styles[group] = { ids: new Set(), styles: [] });
    if (!style.ids.has(id)) {
        style.ids.add(id);
        let code = css.source;
        if (css.map) {
            // https://developer.chrome.com/devtools/docs/javascript-debugging
            // this makes source maps inside style tags work properly in Chrome
            code += '\n/*# sourceURL=' + css.map.sources[0] + ' */';
            // http://stackoverflow.com/a/26603875
            code +=
                '\n/*# sourceMappingURL=data:application/json;base64,' +
                    btoa(unescape(encodeURIComponent(JSON.stringify(css.map)))) +
                    ' */';
        }
        if (!style.element) {
            style.element = document.createElement('style');
            style.element.type = 'text/css';
            if (css.media)
                style.element.setAttribute('media', css.media);
            if (HEAD === undefined) {
                HEAD = document.head || document.getElementsByTagName('head')[0];
            }
            HEAD.appendChild(style.element);
        }
        if ('styleSheet' in style.element) {
            style.styles.push(code);
            style.element.styleSheet.cssText = style.styles
                .filter(Boolean)
                .join('\n');
        }
        else {
            const index = style.ids.size - 1;
            const textNode = document.createTextNode(code);
            const nodes = style.element.childNodes;
            if (nodes[index])
                style.element.removeChild(nodes[index]);
            if (nodes.length)
                style.element.insertBefore(textNode, nodes[index]);
            else
                style.element.appendChild(textNode);
        }
    }
}

/* script */
const __vue_script__ = script;
/* template */

var __vue_render__ = function () {
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

const __vue_inject_styles__ = function (inject) {
  if (!inject) return;
  inject("data-v-4e036967_0", {
    source: ".event-cards{transition:transform .2s ease-in-out 0s,box-shadow .2s ease-in-out!important;position:absolute!important;z-index:2;cursor:grab!important;box-shadow:5px 4px 11px 0 rgba(0,0,0,.44);-webkit-box-shadow:5px 4px 11px 0 rgba(0,0,0,.44);-moz-box-shadow:5px 4px 11px 0 rgba(0,0,0,.44);padding:4rem}.event-cards:active{box-shadow:10px 10px 26px -2px rgba(0,0,0,.4);-webkit-box-shadow:10px 10px 26px -2px rgba(0,0,0,.4);-moz-box-shadow:10px 10px 26px -2px rgba(0,0,0,.4)}.enlarge-cards{transform:scale(1.1)}",
    map: undefined,
    media: undefined
  });
};
/* scoped */


const __vue_scope_id__ = undefined;
/* module identifier */

const __vue_module_identifier__ = undefined;
/* functional template */

const __vue_is_functional_template__ = false;
/* style inject SSR */

/* style inject shadow dom */

const __vue_component__ = /*#__PURE__*/normalizeComponent({
  render: __vue_render__,
  staticRenderFns: __vue_staticRenderFns__
}, __vue_inject_styles__, __vue_script__, __vue_scope_id__, __vue_is_functional_template__, __vue_module_identifier__, false, createInjector, undefined, undefined);

/* eslint-disable import/prefer-default-export */

var components = /*#__PURE__*/Object.freeze({
  __proto__: null,
  VueDraggableCard: __vue_component__
});

// Import vue components

const install = function installVueDraggableCard(Vue) {
  if (install.installed) return;
  install.installed = true;
  Object.entries(components).forEach(([componentName, component]) => {
    Vue.component(componentName, component);
  });
}; // Create module definition for Vue.use()


const plugin = {
  install
}; // To auto-install on non-es builds, when vue is found

export default plugin;
export { __vue_component__ as VueDraggableCard };

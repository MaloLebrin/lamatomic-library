import Vue from 'vue';
import MultiSelect from 'vue-multiselect';
import VCalendar from 'v-calendar';
import { VueAgile } from 'vue-agile';
import VueTypedJs from 'vue-typed-js';

var script = Vue.extend({
  name: 'AButton',
  props: {
    /** ID attribute */
    id: {
      type: String,
      default: null
    },

    /** Href HTML attribute for link as button - renders an <a> component */
    href: {
      type: String,
      default: null
    },

    /** "to" prop for vue-router - renders a <a> */
    to: {
      type: [Object, String],
      default: null
    },

    /** Type HTML attribute - button, reset, submit */
    type: {
      type: String,
      default: null,
      required: false,

      validator(value) {
        return ['button', 'reset', 'submit'].includes(value);
      }

    },

    /** Target HTML attribute - _blank, _self, _top */
    target: {
      type: String,
      default: null,

      validator(value) {
        return ['_blank', '_self', '_top'].includes(value);
      }

    },

    /** Title HTML attribute */
    title: {
      type: String,
      default: null
    },

    /** "state" prop - success, warning or error */
    state: {
      type: String,
      default: null,
      required: false,

      validator(value) {
        return ['success', 'warning', 'error'].includes(value);
      }

    },

    /** "styles" prop - white, light or dark */
    styles: {
      type: String,
      default: null,
      required: false,

      validator(value) {
        return ['white', 'light', 'dark'].includes(value);
      }

    },

    /** Disabled mode */
    disabled: {
      type: Boolean,
      default: false
    },
    customTag: {
      type: String,
      default: null
    }
  },
  computed: {
    computedTarget() {
      if (this.to) {
        return null;
      }

      return this.target || (this.href ? '_blank' : null);
    },

    computedTitle() {
      let title = this.title;

      if (this.href) {
        title = "Se rendre à l'adresse " + this.href;
      }

      if (this.to) {
        title = 'Se rendre à la page ' + this.to;
      }

      if (this.type === 'submit') {
        title = 'Envoyer le formulaire';
      }

      return title;
    },

    tag() {
      if (this.customTag) return this.customTag;
      if (this.href || this.to) return 'a';
      return 'button';
    },

    getState() {
      return this.state;
    },

    getStyles() {
      return this.styles;
    }

  },
  methods: {
    handleClick(event) {
      /**
       * Click event
       * @type {Event}
       */
      this.$emit('click', event);
    }

  }
});

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

  return _c(_vm.tag, {
    tag: "component",
    staticClass: "a-button",
    class: [{
      disabled: _vm.disabled
    }, _vm.getState, _vm.getStyles],
    attrs: {
      "id": _vm.id,
      "href": _vm.href,
      "to": _vm.to,
      "target": _vm.computedTarget,
      "title": _vm.computedTitle,
      "type": _vm.type,
      "disabled": _vm.disabled
    },
    on: {
      "click": _vm.handleClick
    }
  }, [_vm._t("default")], 2);
};

var __vue_staticRenderFns__ = [];
/* style */

const __vue_inject_styles__ = function (inject) {
  if (!inject) return;
  inject("data-v-aefe090c_0", {
    source: ".a-button{animation:1s appear;background-color:#009cde;border:2px solid #009cde;border-radius:5px;color:#fff;cursor:pointer;display:inline-block;fill:#fff;font-size:.8rem;font-size:1.2rem;font-weight:500;letter-spacing:1.5px;line-height:1;margin:auto;padding:10px;padding:10px 30px;text-decoration:none;text-transform:none;transition:.3s all ease}.a-button.success{background-color:#3ac47d;border-color:#3ac47d}.a-button.success:focus,.a-button.success:hover{color:#3ac47d}.a-button.error{background-color:#d92550;border-color:#d92550}.a-button.error:focus,.a-button.error:hover{color:#d92550}.a-button.warning{background-color:#ffce00;border-color:#ffce00}.a-button.warning:focus,.a-button.warning:hover{color:#ffce00}.a-button.white{background-color:#fff;border-color:#fff;color:#009cde}.a-button.white:focus,.a-button.white:hover{background-color:#009cde;color:#fff}.a-button.light{background-color:#fff;border-color:#fff;color:#2b2b2b}.a-button.light:focus,.a-button.light:hover{background-color:#2b2b2b;color:#fff}.a-button.dark{background-color:#2b2b2b;border-color:#2b2b2b;color:#fff}.a-button.dark:focus,.a-button.dark:hover{background-color:#fff;color:#2b2b2b}.a-button.color-black{color:#2b2b2b}.a-button.color-black:focus,.a-button.color-black:hover{background-color:#2b2b2b;color:#fff}.a-button.color-white{color:#fff}.a-button.no-border{border:0}.a-button.border-black{border:solid 1px #2b2b2b}.a-button:focus,.a-button:hover{background-color:#fff;color:#009cde;text-decoration:none}.a-button.disabled,.a-button.disabled:focus,.a-button.disabled:hover{background-color:#929292;border-color:#929292;color:#e1e1e1;cursor:not-allowed;display:inline-block;text-decoration:none}",
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

var script$1 = Vue.extend({
  name: 'AText',
  props: {
    align: {
      type: String,
      default: null,

      validator(value) {
        return ['left', 'right', 'center', 'justify'].includes(value);
      }

    },
    weight: {
      type: String,
      default: null,

      validator(value) {
        return ['thin', 'normal', 'bold', 'bolder'].includes(value);
      }

    },
    decoration: {
      type: String,
      default: null,

      validator(value) {
        return ['no-decoration', 'blink', 'dashed', 'dotted', 'double', 'underline'].includes(value);
      }

    },
    italic: {
      type: Boolean,
      default: false
    },
    span: {
      type: Boolean,
      default: false
    },
    tag: {
      type: String,
      default: null
    }
  },
  computed: {
    computedTag() {
      if (this.tag) return this.tag;
      if (this.span) return 'span';
      return 'p';
    }

  }
});

/* script */
const __vue_script__$1 = script$1;
/* template */

var __vue_render__$1 = function () {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c(_vm.computedTag, {
    tag: "component",
    staticClass: "a-text",
    class: [_vm.align, _vm.weight, _vm.decoration, {
      italic: _vm.italic
    }]
  }, [_vm._t("default")], 2);
};

var __vue_staticRenderFns__$1 = [];
/* style */

const __vue_inject_styles__$1 = function (inject) {
  if (!inject) return;
  inject("data-v-227ca21e_0", {
    source: ".a-text.left{text-align:left}.a-text.center{text-align:center}.a-text.right{text-align:right}.a-text.justify{text-align:justify}.a-text.no-style{font-style:none!important}.a-text.italic{font-style:italic}.a-text.thin{font-weight:100}.a-text.normal{font-weight:300}.a-text.bold{font-weight:600}.a-text.bolder{font-weight:900}.a-text.no-decoration{text-decoration:none!important}.a-text.blink{text-decoration:blink}.a-text.dashed{text-decoration:dashed}.a-text.dotted{text-decoration:dotted}.a-text.double{text-decoration:double}.a-text.underline{text-decoration:underline}.a-text.no-transform{text-transform:none!important}.a-text.capitalize{text-transform:capitalize}.a-text.lowercase{text-transform:lowercase}.a-text.uppercase{text-transform:uppercase}",
    map: undefined,
    media: undefined
  });
};
/* scoped */


const __vue_scope_id__$1 = undefined;
/* module identifier */

const __vue_module_identifier__$1 = undefined;
/* functional template */

const __vue_is_functional_template__$1 = false;
/* style inject SSR */

/* style inject shadow dom */

const __vue_component__$1 = /*#__PURE__*/normalizeComponent({
  render: __vue_render__$1,
  staticRenderFns: __vue_staticRenderFns__$1
}, __vue_inject_styles__$1, __vue_script__$1, __vue_scope_id__$1, __vue_is_functional_template__$1, __vue_module_identifier__$1, false, createInjector, undefined, undefined);

var script$2 = Vue.extend({
  name: 'AHamburger',
  components: {
    AButton: __vue_component__,
    AText: __vue_component__$1
  },
  props: {
    isOpen: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    getMenuText() {
      if (this.isOpen) return 'Fermer le menu';
      return 'Menu';
    }

  }
});

/* script */
const __vue_script__$2 = script$2;
/* template */

var __vue_render__$2 = function () {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c('AButton', {
    staticClass: "a-hamburger",
    class: {
      'a-hamburger--is-open': _vm.isOpen
    },
    on: {
      "click": function ($event) {
        return _vm.$emit('click');
      }
    }
  }, [_c('span', {
    staticClass: "a-hamburger-bar"
  }), _vm._v(" "), _c('AText', {
    attrs: {
      "align": "left"
    }
  }, [_vm._v(" " + _vm._s(_vm.getMenuText) + " ")])], 1);
};

var __vue_staticRenderFns__$2 = [];
/* style */

const __vue_inject_styles__$2 = function (inject) {
  if (!inject) return;
  inject("data-v-4c9aab90_0", {
    source: ".a-hamburger{border:0;border-radius:0;box-shadow:none;cursor:pointer;display:block;height:1.3rem;margin:0;padding:0;position:relative;transition:background .3s;width:1.2rem}.a-hamburger.a-button{background-color:transparent}.a-hamburger.a-button .a-text{color:#000;display:block;font-size:1.2rem;left:calc(1.2rem + 1rem);margin:0;position:absolute;top:calc(1.3rem * (.01))}.a-hamburger:hover{background-color:transparent}.a-hamburger:focus{outline:0}.a-hamburger-bar{background:#000;display:block;height:.2rem;left:0;position:absolute;right:0;top:.55rem;transition:background 0s .3s}.a-hamburger-bar,.a-hamburger-bar::after,.a-hamburger-bar::before{border-radius:.15rem}.a-hamburger-bar::after,.a-hamburger-bar::before{background:#000;content:\"\";display:block;height:.2rem;left:0;position:absolute;width:100%}.a-hamburger-bar::before{top:-.35rem;transition:top .3s .3s,transform .3s 0s,background .3s 0s}.a-hamburger-bar::after{bottom:-.35rem;transition:bottom .3s .3s,transform .3s 0s,background .3s 0s}.a-hamburger--is-open.a-button .a-text{width:10rem}.a-hamburger--is-open .a-hamburger-bar{background:0 0}.a-hamburger--is-open .a-hamburger-bar::after,.a-hamburger--is-open .a-hamburger-bar::before{background-color:#000}.a-hamburger--is-open .a-hamburger-bar::before{top:0;transform:rotate(45deg);transition:top .3s 0s,transform .3s .3s,background .3s 0s}.a-hamburger--is-open .a-hamburger-bar::after{bottom:0;transform:rotate(-45deg);transition:bottom .3s 0s,transform .3s .3s,background .3s 0s}",
    map: undefined,
    media: undefined
  });
};
/* scoped */


const __vue_scope_id__$2 = undefined;
/* module identifier */

const __vue_module_identifier__$2 = undefined;
/* functional template */

const __vue_is_functional_template__$2 = false;
/* style inject SSR */

/* style inject shadow dom */

const __vue_component__$2 = /*#__PURE__*/normalizeComponent({
  render: __vue_render__$2,
  staticRenderFns: __vue_staticRenderFns__$2
}, __vue_inject_styles__$2, __vue_script__$2, __vue_scope_id__$2, __vue_is_functional_template__$2, __vue_module_identifier__$2, false, createInjector, undefined, undefined);

var script$3 = Vue.extend({
  name: 'AHeading',
  components: {
    AText: __vue_component__$1
  },
  inheritAttrs: false,
  props: {
    id: {
      type: String,
      default: null
    },
    level: {
      type: [Number, String],

      validator(value) {
        return [1, 2, 3, 4, 5, 6].includes(Number(value));
      },

      default: 3
    }
  },
  computed: {
    tag() {
      return 'h' + this.level;
    }

  }
});

/* script */
const __vue_script__$3 = script$3;
/* template */

var __vue_render__$3 = function () {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c('AText', _vm._b({
    staticClass: "a-heading",
    class: _vm.tag,
    attrs: {
      "id": _vm.id,
      "tag": _vm.tag
    }
  }, 'AText', _vm.$attrs, false), [_vm._t("default")], 2);
};

var __vue_staticRenderFns__$3 = [];
/* style */

const __vue_inject_styles__$3 = function (inject) {
  if (!inject) return;
  inject("data-v-1312a139_0", {
    source: ".a-heading.h1{font-size:2.8rem;font-weight:500;letter-spacing:.125rem;line-height:1.4em;text-transform:none}.a-heading.h2{font-size:1.8rem}.a-heading.h3{font-size:1.5rem}.a-heading.h4{font-size:1.2rem}.a-heading.h5{font-size:1rem}.a-heading.h6{font-size:.8rem}@media screen and (min-width:1200px){.a-heading.h1{font-size:3.5rem}.a-heading.h2{font-size:2rem}.a-heading.h3{font-size:2rem}.a-heading.h4{font-size:2rem}.a-heading.h5{font-size:2rem}.a-heading.h6{font-size:2rem}}",
    map: undefined,
    media: undefined
  });
};
/* scoped */


const __vue_scope_id__$3 = undefined;
/* module identifier */

const __vue_module_identifier__$3 = undefined;
/* functional template */

const __vue_is_functional_template__$3 = false;
/* style inject SSR */

/* style inject shadow dom */

const __vue_component__$3 = /*#__PURE__*/normalizeComponent({
  render: __vue_render__$3,
  staticRenderFns: __vue_staticRenderFns__$3
}, __vue_inject_styles__$3, __vue_script__$3, __vue_scope_id__$3, __vue_is_functional_template__$3, __vue_module_identifier__$3, false, createInjector, undefined, undefined);

var script$4 = Vue.extend({
  name: 'AIcon',
  props: {
    iconName: {
      type: String,
      default: 'lama'
    },
    width: {
      type: [Number, String],
      default: 18
    },
    height: {
      type: [Number, String],
      default: 18
    },
    iconColor: {
      type: String,
      default: 'currentColor'
    },
    sizeX: {
      type: Number,
      default: 512
    },
    sizeY: {
      type: Number,
      default: 512
    }
  },
  computed: {
    getViewBox() {
      return "0 0 " + this.sizeX + " " + this.sizeY;
    }

  }
});

/* script */
const __vue_script__$4 = script$4;
/* template */

var __vue_render__$4 = function () {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c('svg', {
    staticClass: "a-icon",
    attrs: {
      "xmlns": "http://www.w3.org/2000/svg",
      "width": _vm.width,
      "height": _vm.height,
      "viewBox": _vm.getViewBox,
      "aria-labelledby": _vm.iconName,
      "role": "presentation"
    }
  }, [_c('title', {
    attrs: {
      "id": _vm.iconName,
      "lang": "en"
    }
  }, [_vm._v("\n        " + _vm._s(_vm.iconName) + " icon\n    ")]), _vm._v(" "), _c('g', {
    attrs: {
      "fill": _vm.iconColor
    }
  }, [_vm._t("default")], 2)]);
};

var __vue_staticRenderFns__$4 = [];
/* style */

const __vue_inject_styles__$4 = function (inject) {
  if (!inject) return;
  inject("data-v-e7a16734_0", {
    source: ".a-icon{animation:1s appear;text-decoration:none}",
    map: undefined,
    media: undefined
  });
};
/* scoped */


const __vue_scope_id__$4 = undefined;
/* module identifier */

const __vue_module_identifier__$4 = undefined;
/* functional template */

const __vue_is_functional_template__$4 = false;
/* style inject SSR */

/* style inject shadow dom */

const __vue_component__$4 = /*#__PURE__*/normalizeComponent({
  render: __vue_render__$4,
  staticRenderFns: __vue_staticRenderFns__$4
}, __vue_inject_styles__$4, __vue_script__$4, __vue_scope_id__$4, __vue_is_functional_template__$4, __vue_module_identifier__$4, false, createInjector, undefined, undefined);

var script$5 = Vue.extend({
  name: 'AImage',
  props: {
    src: {
      type: String,
      default: "https://placehold.it/350x150"
    },
    alt: {
      type: String,
      default: null
    },
    title: {
      type: String,
      default: null
    }
  }
});

/* script */
const __vue_script__$5 = script$5;
/* template */

var __vue_render__$5 = function () {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c('img', {
    staticClass: "a-image",
    attrs: {
      "src": _vm.src,
      "alt": _vm.alt,
      "title": _vm.title
    }
  });
};

var __vue_staticRenderFns__$5 = [];
/* style */

const __vue_inject_styles__$5 = function (inject) {
  if (!inject) return;
  inject("data-v-02773232_0", {
    source: ".a-image{animation:1s appear;text-decoration:none}",
    map: undefined,
    media: undefined
  });
};
/* scoped */


const __vue_scope_id__$5 = undefined;
/* module identifier */

const __vue_module_identifier__$5 = undefined;
/* functional template */

const __vue_is_functional_template__$5 = false;
/* style inject SSR */

/* style inject shadow dom */

const __vue_component__$5 = /*#__PURE__*/normalizeComponent({
  render: __vue_render__$5,
  staticRenderFns: __vue_staticRenderFns__$5
}, __vue_inject_styles__$5, __vue_script__$5, __vue_scope_id__$5, __vue_is_functional_template__$5, __vue_module_identifier__$5, false, createInjector, undefined, undefined);

var script$6 = Vue.extend({
  name: 'ALink',
  props: {
    href: {
      type: String,
      default: null
    },
    tel: {
      type: Boolean,
      default: false
    },
    mail: {
      type: Boolean,
      default: false
    },

    /** "to" prop for vue-router */
    to: {
      type: [Object, String],
      default: null
    },

    /** target attribute _self, _blank... */
    target: {
      type: String,
      default: null
    },
    title: {
      type: String,
      default: null
    },

    /** rel attribute: , ... */
    rel: {
      type: String,
      default: null
    },

    /** Ajoute un indicateur indiquant qu'on sort du site */
    external: {
      type: Boolean,
      default: false
    },
    noLine: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    computedTarget() {
      if (this.to) {
        return null;
      }

      return this.target || (this.href ? '_blank' : null);
    },

    computedTitle() {
      let title = this.title;

      if (this.href) {
        title = "Se rendre à l'adresse " + this.href;
      }

      if (this.to) {
        title = 'Se rendre à la page ' + this.to;
      }

      if (this.tel) {
        title = 'Appeler le ' + this.href;
      }

      if (this.mail) {
        title = 'Ecrire un mail à ' + this.href;
      }

      return title;
    },

    computedHref() {
      const href = this.href;

      if (this.tel) {
        if (ValidTel(href)) {
          return 'tel:' + href;
        }
      } else if (this.mail) {
        if (ValidMail(href)) {
          return 'mailto:' + href;
        }
      } else if (this.to != null) {
        return null;
      }

      return href;
    },

    computedUnderlined() {
      return !this.noLine;
    }

  }
});

const ValidTel = function (portableTest) {
  const regex = new RegExp(/^((\+)33+ ?|0)[1-9]( ?(\d{2})){4}$/gi);

  if (regex.test(portableTest)) {
    return true;
  }

  return false;
};

const ValidMail = function (emailTest) {
  const regex = new RegExp('^[a-z0-9]+([_|.|-]{1}[a-z0-9]+)*@[a-z0-9]+([_|.|-]{1}[a-z0-9]+)*[.]{1}[a-z]{2,6}$', 'i');

  if (regex.test(emailTest)) {
    return true;
  }

  return false;
};

/* script */
const __vue_script__$6 = script$6;
/* template */

var __vue_render__$6 = function () {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c('a', {
    staticClass: "a-link",
    class: {
      tel: _vm.tel,
      mail: _vm.mail,
      rel: _vm.rel,
      external: _vm.external,
      underlined: _vm.computedUnderlined,
      'underlined--thin': _vm.computedUnderlined
    },
    attrs: {
      "href": _vm.computedHref,
      "to": _vm.to,
      "target": _vm.computedTarget,
      "title": _vm.computedTitle,
      "rel": _vm.rel
    }
  }, [_vm._t("default")], 2);
};

var __vue_staticRenderFns__$6 = [];
/* style */

const __vue_inject_styles__$6 = function (inject) {
  if (!inject) return;
  inject("data-v-51d0f99a_0", {
    source: ".a-link{animation:1s appear;color:#009cde;cursor:pointer;font-weight:700;text-decoration:none}.a-link:hover{text-decoration:none}.a-link.underlined{background-image:linear-gradient(to right,#ffce00 0,#ffce00 100%);background-position:0 1.2em;background-repeat:no-repeat;background-size:0 100%;text-decoration:none;transition:background .5s}.a-link.underlined:focus,.a-link.underlined:hover{background-size:100% 100%}.a-link.underlined--thin{background-image:linear-gradient(to right,#009cde 0,#009cde 100%);padding-bottom:4px}.a-link.underlined--thick{background-position:0 -.1em}.a-link.underlined--offset{background-position:0 .2em;box-shadow:inset 0 -.5em 0 0 #fff}.a-link.underlined--gradient{background-image:linear-gradient(to right,#ffce00 0,#002252 100%);background-position:0 -.1em}.a-link.underlined--reverse{background-image:linear-gradient(to right,#ffce00 0,#ffce00 100%);background-position:100% -.1em;transition:background 1s}",
    map: undefined,
    media: undefined
  });
};
/* scoped */


const __vue_scope_id__$6 = undefined;
/* module identifier */

const __vue_module_identifier__$6 = undefined;
/* functional template */

const __vue_is_functional_template__$6 = false;
/* style inject SSR */

/* style inject shadow dom */

const __vue_component__$6 = /*#__PURE__*/normalizeComponent({
  render: __vue_render__$6,
  staticRenderFns: __vue_staticRenderFns__$6
}, __vue_inject_styles__$6, __vue_script__$6, __vue_scope_id__$6, __vue_is_functional_template__$6, __vue_module_identifier__$6, false, createInjector, undefined, undefined);

var script$7 = Vue.extend({
  name: 'AList',
  props: {
    type: {
      type: String,
      default: 'ul'
    },
    withoutChips: {
      type: Boolean,
      default: false
    },
    noPadding: {
      type: Boolean,
      default: false
    },
    horizontal: {
      type: Boolean,
      default: false
    }
  }
});

/* script */
const __vue_script__$7 = script$7;
/* template */

var __vue_render__$7 = function () {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c(_vm.type, {
    tag: "component",
    staticClass: "a-list",
    class: {
      'without-chips': _vm.withoutChips,
      'no-padding': _vm.noPadding,
      horizontal: _vm.horizontal
    }
  }, [_vm._t("default")], 2);
};

var __vue_staticRenderFns__$7 = [];
/* style */

const __vue_inject_styles__$7 = function (inject) {
  if (!inject) return;
  inject("data-v-75a19c55_0", {
    source: ".a-list{padding-left:2rem}.a-list.no-padding{padding-left:0}.a-list.without-chips{list-style:none}.a-list.horizontal{align-items:center;display:flex;flex-wrap:wrap}.a-list.horizontal>.a-list-item{margin:.5rem}.a-list.horizontal>.a-list-item:first-child{margin-left:0}.a-list.horizontal>.a-list-item:last-child{margin-right:0}",
    map: undefined,
    media: undefined
  });
};
/* scoped */


const __vue_scope_id__$7 = undefined;
/* module identifier */

const __vue_module_identifier__$7 = undefined;
/* functional template */

const __vue_is_functional_template__$7 = false;
/* style inject SSR */

/* style inject shadow dom */

const __vue_component__$7 = /*#__PURE__*/normalizeComponent({
  render: __vue_render__$7,
  staticRenderFns: __vue_staticRenderFns__$7
}, __vue_inject_styles__$7, __vue_script__$7, __vue_scope_id__$7, __vue_is_functional_template__$7, __vue_module_identifier__$7, false, createInjector, undefined, undefined);

var script$8 = Vue.extend({
  name: 'AListItem'
});

/* script */
const __vue_script__$8 = script$8;
/* template */

var __vue_render__$8 = function () {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c('li', {
    staticClass: "a-list-item"
  }, [_vm._t("default")], 2);
};

var __vue_staticRenderFns__$8 = [];
/* style */

const __vue_inject_styles__$8 = undefined;
/* scoped */

const __vue_scope_id__$8 = undefined;
/* module identifier */

const __vue_module_identifier__$8 = undefined;
/* functional template */

const __vue_is_functional_template__$8 = false;
/* style inject */

/* style inject SSR */

/* style inject shadow dom */

const __vue_component__$8 = /*#__PURE__*/normalizeComponent({
  render: __vue_render__$8,
  staticRenderFns: __vue_staticRenderFns__$8
}, __vue_inject_styles__$8, __vue_script__$8, __vue_scope_id__$8, __vue_is_functional_template__$8, __vue_module_identifier__$8, false, undefined, undefined, undefined);

var script$9 = Vue.extend({
  name: 'ALabel',
  props: {
    htmlFor: {
      type: String,
      default: null
    },
    required: {
      type: Boolean,
      default: false
    }
  }
});

/* script */
const __vue_script__$9 = script$9;
/* template */

var __vue_render__$9 = function () {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c('label', {
    staticClass: "a-label",
    attrs: {
      "for": _vm.htmlFor
    }
  }, [_vm._t("default"), _vm._v(" "), _vm.required ? _c('span', {
    staticClass: "required-indicator"
  }, [_vm._v("*")]) : _vm._e()], 2);
};

var __vue_staticRenderFns__$9 = [];
/* style */

const __vue_inject_styles__$9 = function (inject) {
  if (!inject) return;
  inject("data-v-6650f85e_0", {
    source: ".a-label{font-size:inherit;user-select:none}.a-label.error{color:#d92550}.a-label.success{color:#3ac47d}.a-label .required-indicator{color:#d92550}",
    map: undefined,
    media: undefined
  });
};
/* scoped */


const __vue_scope_id__$9 = undefined;
/* module identifier */

const __vue_module_identifier__$9 = undefined;
/* functional template */

const __vue_is_functional_template__$9 = false;
/* style inject SSR */

/* style inject shadow dom */

const __vue_component__$9 = /*#__PURE__*/normalizeComponent({
  render: __vue_render__$9,
  staticRenderFns: __vue_staticRenderFns__$9
}, __vue_inject_styles__$9, __vue_script__$9, __vue_scope_id__$9, __vue_is_functional_template__$9, __vue_module_identifier__$9, false, createInjector, undefined, undefined);

var script$a = Vue.extend({
  name: 'AFormGroup',
  components: {
    ALabel: __vue_component__$9
  },
  props: {
    id: {
      type: String,
      default: null
    },
    label: {
      type: String,
      default: null
    },
    required: {
      type: Boolean,
      default: false
    }
  }
});

/* script */
const __vue_script__$a = script$a;
/* template */

var __vue_render__$a = function () {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c('div', {
    staticClass: "a-form-group"
  }, [_c('ALabel', {
    attrs: {
      "required": _vm.required
    }
  }, [_vm._v(" " + _vm._s(_vm.label))]), _vm._v(" "), _vm._t("default")], 2);
};

var __vue_staticRenderFns__$a = [];
/* style */

const __vue_inject_styles__$a = undefined;
/* scoped */

const __vue_scope_id__$a = undefined;
/* module identifier */

const __vue_module_identifier__$a = undefined;
/* functional template */

const __vue_is_functional_template__$a = false;
/* style inject */

/* style inject SSR */

/* style inject shadow dom */

const __vue_component__$a = /*#__PURE__*/normalizeComponent({
  render: __vue_render__$a,
  staticRenderFns: __vue_staticRenderFns__$a
}, __vue_inject_styles__$a, __vue_script__$a, __vue_scope_id__$a, __vue_is_functional_template__$a, __vue_module_identifier__$a, false, undefined, undefined, undefined);

var script$b = Vue.extend({
  name: 'ASelect',
  model: {
    prop: 'value',
    event: 'change'
  },
  props: {
    options: {
      type: Array,
      required: true // default: (): Array<any> => []

    },
    value: {
      type: String,
      default: ''
    },
    disabled: {
      type: Boolean,
      default: false
    },
    id: {
      type: String,
      default: null
    },
    name: {
      type: String,
      default: null
    },
    emptyValueLabel: {
      type: String,
      default: 'Please select one'
    },
    placeholder: {
      type: String,
      default: 'Selectionner'
    },
    withArrow: {
      type: Boolean,
      default: false
    }
  },

  data() {
    return {
      localValue: this.value
    };
  }

});

/* script */
const __vue_script__$b = script$b;
/* template */

var __vue_render__$b = function () {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c('div', {
    staticClass: "a-select"
  }, [_c('select', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: _vm.localValue,
      expression: "localValue"
    }],
    staticClass: "a-select-input",
    attrs: {
      "id": _vm.id,
      "name": _vm.name,
      "disabled": _vm.disabled,
      "placeholder": _vm.placeholder
    },
    on: {
      "change": [function ($event) {
        var $$selectedVal = Array.prototype.filter.call($event.target.options, function (o) {
          return o.selected;
        }).map(function (o) {
          var val = "_value" in o ? o._value : o.value;
          return val;
        });
        _vm.localValue = $event.target.multiple ? $$selectedVal : $$selectedVal[0];
      }, function ($event) {
        return _vm.$emit('change', $event.target.value);
      }]
    }
  }, [_c('option', {
    attrs: {
      "disabled": "",
      "value": ""
    }
  }, [_vm._v(_vm._s(_vm.emptyValueLabel))]), _vm._v(" "), _vm._l(_vm.options, function (option) {
    return _c('option', {
      key: option.value,
      attrs: {
        "disabled": _vm.disabled ? _vm.disabled : option.disabled
      },
      domProps: {
        "value": option.value,
        "selected": option.selected
      }
    }, [_vm._v(_vm._s(option.label))]);
  })], 2), _vm._v(" "), _vm.withArrow ? _c('svg', {
    staticClass: "a-select-arrow",
    attrs: {
      "xmlns": "http://www.w3.org/2000/svg",
      "viewBox": "0 0 284.929 284.929"
    }
  }, [_c('path', {
    attrs: {
      "d": "M282.082 76.511l-14.274-14.273c-1.902-1.906-4.093-2.856-6.57-2.856-2.471 0-4.661.95-6.563 2.856L142.466 174.441 30.262 62.241c-1.903-1.906-4.093-2.856-6.567-2.856-2.475 0-4.665.95-6.567 2.856L2.856 76.515C.95 78.417 0 80.607 0 83.082c0 2.473.953 4.663 2.856 6.565l133.043 133.046c1.902 1.903 4.093 2.854 6.567 2.854s4.661-.951 6.562-2.854L282.082 89.647c1.902-1.903 2.847-4.093 2.847-6.565 0-2.475-.945-4.665-2.847-6.571z"
    }
  })]) : _vm._e()]);
};

var __vue_staticRenderFns__$b = [];
/* style */

const __vue_inject_styles__$b = function (inject) {
  if (!inject) return;
  inject("data-v-d2531f76_0", {
    source: ".a-select{border:.1rem solid #e1e1e1;border-radius:.3rem;display:inline-flex;position:relative}.a-select-input{background:inherit;border:0;color:inherit;display:block;font-size:inherit;padding:.8rem 1.2rem;padding-right:5rem;width:100%}.a-select-input:focus{box-shadow:0 0 .6rem rgba(43,43,43,.4)}.a-select-arrow{bottom:0;fill:#e1e1e1;height:1.5rem;margin:auto;position:absolute;right:1rem;top:0;width:1.5rem}",
    map: undefined,
    media: undefined
  });
};
/* scoped */


const __vue_scope_id__$b = undefined;
/* module identifier */

const __vue_module_identifier__$b = undefined;
/* functional template */

const __vue_is_functional_template__$b = false;
/* style inject SSR */

/* style inject shadow dom */

const __vue_component__$b = /*#__PURE__*/normalizeComponent({
  render: __vue_render__$b,
  staticRenderFns: __vue_staticRenderFns__$b
}, __vue_inject_styles__$b, __vue_script__$b, __vue_scope_id__$b, __vue_is_functional_template__$b, __vue_module_identifier__$b, false, createInjector, undefined, undefined);

var script$c = Vue.extend({
  name: 'ASelectPlus',
  components: {
    MultiSelect
  },
  props: {
    options: {
      type: Array,
      required: true
    },
    placeholder: {
      type: String,
      default: 'Sélectionner une option'
    },
    searchable: {
      type: Boolean,
      default: false
    },
    closeOnSelect: {
      type: Boolean,
      default: true
    },
    showLabels: {
      type: Boolean,
      default: false
    }
  },

  data() {
    return {
      value: ''
    };
  }

});

/* script */
const __vue_script__$c = script$c;
/* template */

var __vue_render__$c = function () {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c('div', {
    staticClass: "a-select-plus"
  }, [_vm._t("top-slot"), _vm._v(" "), _c('MultiSelect', {
    attrs: {
      "options": _vm.options,
      "searchable": _vm.searchable,
      "close-on-select": _vm.closeOnSelect,
      "show-labels": _vm.showLabels,
      "placeholder": _vm.placeholder
    },
    model: {
      value: _vm.value,
      callback: function ($$v) {
        _vm.value = $$v;
      },
      expression: "value"
    }
  }, [_vm._t("default")], 2), _vm._v(" "), _vm._t("bottom-slot")], 2);
};

var __vue_staticRenderFns__$c = [];
/* style */

const __vue_inject_styles__$c = function (inject) {
  if (!inject) return;
  inject("data-v-6fdc3fb4_0", {
    source: ".a-select-plus{cursor:pointer}.a-select-plus .multiselect,.a-select-plus .multiselect__input,.a-select-plus .multiselect__single{font-family:inherit;font-size:16px;touch-action:manipulation}.a-select-plus .multiselect__input,.a-select-plus .multiselect__single{background:#fff;border:0;border-image:none;border-radius:5px;box-sizing:border-box;display:inline-block;line-height:20px;min-height:20px;outline:0;position:relative;transition:border .1s ease;vertical-align:top;width:100%}.a-select-plus .multiselect{box-sizing:content-box;display:block;min-height:40px;outline:0;position:relative;text-align:left;width:100%}.a-select-plus .multiselect .multiselect__select{box-sizing:border-box;cursor:pointer;display:block;font-size:1.4rem;height:100%;line-height:16px;margin:0;padding:4px 8px;position:absolute;right:1px;text-align:center;text-decoration:none;top:1px;transition:transform .2s ease;width:40px}.a-select-plus .multiselect .multiselect__select::before{border-color:#2b2b2b transparent transparent;border-style:solid;border-width:5px 5px 0;color:#2b2b2b;content:\"\";margin-top:4px;position:relative;right:0;top:65%}.a-select-plus .multiselect--active{z-index:50}.a-select-plus .multiselect--active .multiselect__select{transform:rotateZ(180deg)}.a-select-plus .multiselect__tags{align-items:center;background:#fff;border:1px solid #e8e8e8;border-radius:5px;display:flex;font-size:14px;min-height:40px;padding:0 40px 0 8px}.a-select-plus .multiselect__tags .multiselect__single{background:#fff;border:0;border-radius:5px;box-sizing:border-box;display:inline-block;line-height:20px;min-height:20px;padding:0 0 0 5px;position:relative;transition:border .1s ease;width:100%}.a-select-plus .multiselect__content-wrapper{background:#fff;border:1px solid #e8e8e8;border-bottom-left-radius:5px;border-bottom-right-radius:5px;border-top:0;display:block;max-height:240px;overflow:auto;position:absolute;width:100%;z-index:50}.a-select-plus .multiselect__content{display:inline-block;list-style:none;margin:0;min-width:100%;padding:0}.a-select-plus .multiselect__option{display:flex;line-height:16px;min-height:40px;padding:12px;position:relative;text-decoration:none;text-transform:none;vertical-align:middle;white-space:nowrap}.a-select-plus .multiselect__option::after{font-size:1.3rem;line-height:40px;padding-left:20px;padding-right:12px;position:absolute;right:0;top:0}.a-select-plus .multiselect__option--highlight{background:#009cde;color:#fff;outline:0}.a-select-plus .multiselect__option--highlight::after{background:#009cde;color:#fff;content:attr(data-select)}.a-select-plus .multiselect__option--selected{background:#009cde;color:#fff;font-weight:700}.a-select-plus .multiselect__option--selected::after{color:silver;content:attr(data-selected)}",
    map: undefined,
    media: undefined
  });
};
/* scoped */


const __vue_scope_id__$c = undefined;
/* module identifier */

const __vue_module_identifier__$c = undefined;
/* functional template */

const __vue_is_functional_template__$c = false;
/* style inject SSR */

/* style inject shadow dom */

const __vue_component__$c = /*#__PURE__*/normalizeComponent({
  render: __vue_render__$c,
  staticRenderFns: __vue_staticRenderFns__$c
}, __vue_inject_styles__$c, __vue_script__$c, __vue_scope_id__$c, __vue_is_functional_template__$c, __vue_module_identifier__$c, false, createInjector, undefined, undefined);

//
var script$d = Vue.extend({
  name: 'ASelectPlusImage',
  components: {
    Multiselect: MultiSelect
  },
  props: {
    options: {
      type: Array,
      default: null
    },
    placeholder: {
      type: String,
      default: 'selectionne ton image'
    }
  },
  computed: {
    allBindings() {
      // Need to proxify both props and attrs, for example for showLabels
      return { ...this.$props,
        ...this.$attrs
      };
    }

  }
});

/* script */
const __vue_script__$d = script$d;
/* template */

var __vue_render__$d = function () {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c('div', {
    staticClass: "a-select-plus a-select-plus-image"
  }, [_vm._t("topSlot"), _vm._v(" "), _c('multiselect', _vm._g(_vm._b({
    attrs: {
      "options": _vm.options,
      "placeholder": _vm.placeholder
    },
    scopedSlots: _vm._u([{
      key: "singleLabel",
      fn: function (ref) {
        var option = ref.option;
        return [_c('img', {
          staticClass: "option__image",
          attrs: {
            "src": option.uri,
            "alt": "img to select"
          }
        }), _vm._v(" "), _c('span', {
          staticClass: "option__desc"
        }, [_c('span', {
          staticClass: "option__title"
        }, [_vm._v(_vm._s(option.title))])])];
      }
    }, {
      key: "option",
      fn: function (ref) {
        var option = ref.option;
        return [_c('img', {
          staticClass: "option__image",
          attrs: {
            "src": option.uri,
            "alt": "img to select"
          }
        }), _vm._v(" "), _c('span', {
          staticClass: "option__desc"
        }, [_c('span', {
          staticClass: "option__title"
        }, [_vm._v(_vm._s(option.title))]), _vm._v(" "), _c('span', {
          staticClass: "option__small"
        }, [_vm._v(_vm._s(option.desc))])])];
      }
    }])
  }, 'multiselect', _vm.allBindings, false), _vm.$listeners)), _vm._v(" "), _vm._t("bottomSlot")], 2);
};

var __vue_staticRenderFns__$d = [];
/* style */

const __vue_inject_styles__$d = function (inject) {
  if (!inject) return;
  inject("data-v-18421f77_0", {
    source: ".a-select-plus-image .multiselect input{display:none;width:100%!important}.a-select-plus-image .multiselect .option__desc,.a-select-plus-image .multiselect .option__image{display:inline-block;list-style:none;vertical-align:middle}.a-select-plus-image .multiselect .multiselect__content{display:flex!important}.a-select-plus-image .multiselect .multiselect__option,.a-select-plus-image .multiselect .multiselect__option--highlight{display:inline-grid}",
    map: undefined,
    media: undefined
  });
};
/* scoped */


const __vue_scope_id__$d = undefined;
/* module identifier */

const __vue_module_identifier__$d = undefined;
/* functional template */

const __vue_is_functional_template__$d = false;
/* style inject SSR */

/* style inject shadow dom */

const __vue_component__$d = /*#__PURE__*/normalizeComponent({
  render: __vue_render__$d,
  staticRenderFns: __vue_staticRenderFns__$d
}, __vue_inject_styles__$d, __vue_script__$d, __vue_scope_id__$d, __vue_is_functional_template__$d, __vue_module_identifier__$d, false, createInjector, undefined, undefined);

var script$e = Vue.extend({
  name: 'Textarea',
  props: {
    id: {
      type: String,
      default: null
    },
    placeholder: {
      type: String,
      default: 'Ecrivez votre Lamatexte ici'
    },
    required: {
      type: Boolean,
      default: false
    },
    rows: {
      type: Number,
      default: 2
    },
    cols: {
      type: Number,
      default: 1
    }
  }
});

/* script */
const __vue_script__$e = script$e;
/* template */

var __vue_render__$e = function () {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c('textarea', _vm._g({
    staticClass: "a-textarea",
    attrs: {
      "id": _vm.id,
      "placeholder": _vm.placeholder,
      "required": _vm.required,
      "rows": _vm.rows,
      "cols": _vm.cols
    }
  }, _vm.$listeners));
};

var __vue_staticRenderFns__$e = [];
/* style */

const __vue_inject_styles__$e = function (inject) {
  if (!inject) return;
  inject("data-v-2e73d091_0", {
    source: ".a-textarea{border:.1rem solid #009cde;height:120px;overflow:hidden;padding:5px;resize:auto;width:600px}",
    map: undefined,
    media: undefined
  });
};
/* scoped */


const __vue_scope_id__$e = undefined;
/* module identifier */

const __vue_module_identifier__$e = undefined;
/* functional template */

const __vue_is_functional_template__$e = false;
/* style inject SSR */

/* style inject shadow dom */

const __vue_component__$e = /*#__PURE__*/normalizeComponent({
  render: __vue_render__$e,
  staticRenderFns: __vue_staticRenderFns__$e
}, __vue_inject_styles__$e, __vue_script__$e, __vue_scope_id__$e, __vue_is_functional_template__$e, __vue_module_identifier__$e, false, createInjector, undefined, undefined);

var script$f = Vue.extend({
  name: 'AInputGroup',
  computed: {
    hasSlotPrepend() {
      return !!this.$slots.prepend && !!this.$slots.prepend[0];
    },

    hasSlotAppend() {
      return !!this.$slots.append && !!this.$slots.append[0];
    }

  }
});

/* script */
const __vue_script__$f = script$f;
/* template */

var __vue_render__$f = function () {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c('div', {
    staticClass: "a-input-group"
  }, [_vm.hasSlotPrepend ? _c('div', {
    staticClass: "prepend"
  }, [_vm._t("prepend")], 2) : _vm._e(), _vm._v(" "), _vm._t("default"), _vm._v(" "), _vm.hasSlotAppend ? _c('div', {
    staticClass: "append"
  }, [_vm._t("append")], 2) : _vm._e()], 2);
};

var __vue_staticRenderFns__$f = [];
/* style */

const __vue_inject_styles__$f = function (inject) {
  if (!inject) return;
  inject("data-v-4c4f9dd6_0", {
    source: ".a-input-group{display:inline-block;position:relative}.a-input-group .append,.a-input-group .prepend{margin:auto;padding:6px;position:absolute}.a-input-group .append{right:0;top:0}.a-input-group .a-input{padding:0 1.5rem}",
    map: undefined,
    media: undefined
  });
};
/* scoped */


const __vue_scope_id__$f = undefined;
/* module identifier */

const __vue_module_identifier__$f = undefined;
/* functional template */

const __vue_is_functional_template__$f = false;
/* style inject SSR */

/* style inject shadow dom */

const __vue_component__$f = /*#__PURE__*/normalizeComponent({
  render: __vue_render__$f,
  staticRenderFns: __vue_staticRenderFns__$f
}, __vue_inject_styles__$f, __vue_script__$f, __vue_scope_id__$f, __vue_is_functional_template__$f, __vue_module_identifier__$f, false, createInjector, undefined, undefined);

var script$g = Vue.extend({
  name: 'AInput',
  props: {
    id: {
      type: String,
      default: null
    },
    name: {
      type: String,
      default: null
    },
    value: {
      type: [String, Boolean, Object, Array, Function],
      default: null
    },
    type: {
      type: String,
      default: null
    },
    placeholder: {
      type: String,
      default: null
    },
    required: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    inputListeners() {
      const vm = this;
      return Object.assign({}, // We add parent listeners
      this.$listeners, // Then we add custom listeners
      {
        // To be sure v-model works
        input(event) {
          vm.$emit('input', event.target.value);
        }

      });
    }

  }
});

/* script */
const __vue_script__$g = script$g;
/* template */

var __vue_render__$g = function () {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c('input', _vm._g(_vm._b({
    staticClass: "a-input",
    attrs: {
      "id": _vm.id,
      "type": _vm.type,
      "placeholder": _vm.placeholder,
      "name": _vm.name,
      "required": _vm.required,
      "disabled": _vm.disabled
    },
    domProps: {
      "value": _vm.value
    }
  }, 'input', _vm.$attrs, false), _vm.inputListeners));
};

var __vue_staticRenderFns__$g = [];
/* style */

const __vue_inject_styles__$g = function (inject) {
  if (!inject) return;
  inject("data-v-a864b780_0", {
    source: ".a-input{background-color:transparent;border-color:#009cde;border-radius:.1875rem;border-style:solid;border-width:.1rem;box-sizing:border-box;color:#2b2b2b;cursor:text;display:inline-block;font-size:.875rem;line-height:1.5rem;margin:0;min-height:2rem;outline:0;padding:.25rem .5rem;text-align:start;text-shadow:none;vertical-align:middle}.a-input.success{border:.1rem solid #3ac47d}.a-input.error{border:.1rem solid #d92550}",
    map: undefined,
    media: undefined
  });
};
/* scoped */


const __vue_scope_id__$g = undefined;
/* module identifier */

const __vue_module_identifier__$g = undefined;
/* functional template */

const __vue_is_functional_template__$g = false;
/* style inject SSR */

/* style inject shadow dom */

const __vue_component__$g = /*#__PURE__*/normalizeComponent({
  render: __vue_render__$g,
  staticRenderFns: __vue_staticRenderFns__$g
}, __vue_inject_styles__$g, __vue_script__$g, __vue_scope_id__$g, __vue_is_functional_template__$g, __vue_module_identifier__$g, false, createInjector, undefined, undefined);

var script$h = Vue.extend({
  name: 'AInputCheckbox',
  components: {
    AInput: __vue_component__$g
  },
  model: {
    prop: 'modelValue',
    event: 'input'
  },
  props: {
    /** Value of checkbox */
    value: {
      type: [String, Boolean],
      required: true
    },

    /** Whether the checkbox is checked. Can also be checked programatically using v-bind. */
    checked: {
      type: Boolean,
      default: false
    },

    /** This is a necessary prop for using v-model with this component. Should NOT be set */
    modelValue: {
      type: [String, Array, Boolean],
      default: undefined
    }
  },
  computed: {
    shouldBeChecked() {
      if (this.modelValue === undefined) {
        return this.checked;
      }

      if (Array.isArray(this.modelValue)) {
        return this.modelValue.includes(this.value);
      }

      return !!this.modelValue;
    }

  },
  watch: {
    checked(newValue) {
      if (newValue !== this.shouldBeChecked) {
        this.toggle();
      }
    }

  },

  mounted() {
    if (this.checked && !this.shouldBeChecked) {
      this.toggle();
    }
  },

  methods: {
    toggle() {
      let value;

      if (Array.isArray(this.modelValue)) {
        value = [...this.modelValue];

        if (this.shouldBeChecked) {
          value.splice(value.indexOf(this.value), 1);
        } else {
          value.push(this.value);
        }
      } else {
        value = !this.shouldBeChecked;
      }

      this.$emit('input', value);
    }

  }
});

/* script */
const __vue_script__$h = script$h;
/* template */

var __vue_render__$h = function () {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c('div', {
    staticClass: "a-input-checkbox-wrapper"
  }, [_c('AInput', _vm._g({
    staticClass: "a-input-checkbox",
    attrs: {
      "type": "checkbox",
      "value": _vm.value,
      "checked": _vm.shouldBeChecked
    },
    on: {
      "change": _vm.toggle
    }
  }, _vm.$listeners)), _vm._v(" "), _c('div', {
    staticClass: "checkbox-box"
  }, [_c('svg', {
    attrs: {
      "viewBox": "0 0 21 21"
    }
  }, [_c('path', {
    attrs: {
      "d": "M5,10.75 L8.5,14.25 L19.4,2.3 C18.8333333,1.43333333 18.0333333,1 17,1 L4,1 C2.35,1 1,2.35 1,4\n            L1,17 C1,18.65 2.35,20 4,20 L17,20 C18.65,20 20,18.65 20,17 L20,7.99769186"
    }
  })])])], 1);
};

var __vue_staticRenderFns__$h = [];
/* style */

const __vue_inject_styles__$h = function (inject) {
  if (!inject) return;
  inject("data-v-7ba1a5fe_0", {
    source: ".a-input-checkbox-wrapper{display:inline-block;position:relative}.a-input-checkbox-wrapper .checkbox-box{background:#fff;border-radius:.3rem;box-shadow:inset 0 0 0 var(--s,1px) var(--b,#d1d6ee);cursor:pointer;height:1.2rem;margin-right:.3rem;position:relative;top:.2rem;transition:all .6s;width:1.2rem}.a-input-checkbox-wrapper .checkbox-box:focus,.a-input-checkbox-wrapper .checkbox-box:hover{--b:var(--border-active, #009cde)}.a-input-checkbox-wrapper .checkbox-box>svg{display:block;fill:none;height:1.2rem;left:0;pointer-events:none;position:absolute;stroke:var(--stroke,#009cde);stroke-dasharray:var(--a,86.12);stroke-dashoffset:var(--o,86.12);stroke-linecap:round;stroke-linejoin:round;stroke-width:2px;top:0;transform:scale(var(--scale,1)) translateZ(0);transition:stroke-dasharray .6s,stroke-dashoffset .6s;width:1.2rem}.a-input-checkbox-wrapper .a-input.a-input-checkbox{display:none}.a-input-checkbox-wrapper .a-input.a-input-checkbox:checked+.checkbox-box{--b:var(--border-active, #009cde);--s:2px;transition-delay:.1s}.a-input-checkbox-wrapper .a-input.a-input-checkbox:checked+.checkbox-box svg{--a:16.1 86.12;--o:102.22}",
    map: undefined,
    media: undefined
  });
};
/* scoped */


const __vue_scope_id__$h = undefined;
/* module identifier */

const __vue_module_identifier__$h = undefined;
/* functional template */

const __vue_is_functional_template__$h = false;
/* style inject SSR */

/* style inject shadow dom */

const __vue_component__$h = /*#__PURE__*/normalizeComponent({
  render: __vue_render__$h,
  staticRenderFns: __vue_staticRenderFns__$h
}, __vue_inject_styles__$h, __vue_script__$h, __vue_scope_id__$h, __vue_is_functional_template__$h, __vue_module_identifier__$h, false, createInjector, undefined, undefined);

Vue.use(VCalendar);
var script$i = Vue.extend({
  name: 'AInputDate',
  props: {
    mode: {
      type: String,
      default: 'single',

      validator(value) {
        return ['single', 'multiple', 'range'].includes(value);
      }

    },
    isDark: {
      type: Boolean,
      default: false
    },
    color: {
      type: String,
      default: 'blue',

      validator(value) {
        return ['gray', 'red', 'orange', 'yellow', 'green', 'teal', 'blue', 'indigo', 'purple', 'pink'].includes(value);
      }

    }
  },

  data() {
    return {
      date: new Date()
    };
  }

});

/* script */
const __vue_script__$i = script$i;
/* template */

var __vue_render__$i = function () {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c('v-date-picker', _vm._g({
    staticClass: "a-input a-input-date",
    attrs: {
      "mode": _vm.mode,
      "color": _vm.color,
      "is-dark": _vm.isDark
    },
    model: {
      value: _vm.date,
      callback: function ($$v) {
        _vm.date = $$v;
      },
      expression: "date"
    }
  }, _vm.$listeners));
};

var __vue_staticRenderFns__$i = [];
/* style */

const __vue_inject_styles__$i = function (inject) {
  if (!inject) return;
  inject("data-v-e4911ede_0", {
    source: ".a-input.a-input-date{border-style:none;position:absolute}",
    map: undefined,
    media: undefined
  });
};
/* scoped */


const __vue_scope_id__$i = undefined;
/* module identifier */

const __vue_module_identifier__$i = undefined;
/* functional template */

const __vue_is_functional_template__$i = false;
/* style inject SSR */

/* style inject shadow dom */

const __vue_component__$i = /*#__PURE__*/normalizeComponent({
  render: __vue_render__$i,
  staticRenderFns: __vue_staticRenderFns__$i
}, __vue_inject_styles__$i, __vue_script__$i, __vue_scope_id__$i, __vue_is_functional_template__$i, __vue_module_identifier__$i, false, createInjector, undefined, undefined);

var script$j = Vue.extend({
  name: 'AInputMail',
  components: {
    AInput: __vue_component__$g,
    AText: __vue_component__$1
  },
  inheritAttrs: false,
  props: {
    placeholder: {
      type: String,
      default: 'lama@lamacompta.co'
    },
    checkValidity: {
      type: Boolean,
      default: false
    }
  },

  data() {
    return {
      email: '',
      REGEX_MAIL: new RegExp(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)
    };
  },

  computed: {
    isEmailValid() {
      return this.checkEmail(this.email);
    }

  },
  methods: {
    checkEmail(value) {
      return this.REGEX_MAIL.test(value);
    }

  }
});

/* script */
const __vue_script__$j = script$j;
/* template */

var __vue_render__$j = function () {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c('div', {
    staticClass: "a-input-email-wrapper"
  }, [_c('AInput', _vm._g(_vm._b({
    staticClass: "a-input-email",
    class: [_vm.checkValidity && _vm.email.length > 0 ? {
      success: _vm.isEmailValid,
      error: !_vm.isEmailValid
    } : ''],
    attrs: {
      "type": "email",
      "placeholder": _vm.placeholder
    },
    model: {
      value: _vm.email,
      callback: function ($$v) {
        _vm.email = $$v;
      },
      expression: "email"
    }
  }, 'AInput', _vm.$attrs, false), _vm.$listeners)), _vm._v(" "), _vm.checkValidity && _vm.email.length > 0 ? _c('div', [_c('AText', {
    staticClass: "email-validity-message",
    class: {
      success: _vm.isEmailValid,
      error: !_vm.isEmailValid
    }
  }, [_vm.isEmailValid ? _c('AText', {
    attrs: {
      "span": ""
    }
  }, [_vm._v("Votre adresse email est valide.")]) : _vm._e(), _vm._v(" "), !_vm.isEmailValid ? _c('AText', {
    attrs: {
      "span": ""
    }
  }, [_vm._v("Votre adresse email est incorrecte.")]) : _vm._e()], 1)], 1) : _vm._e()], 1);
};

var __vue_staticRenderFns__$j = [];
/* style */

const __vue_inject_styles__$j = function (inject) {
  if (!inject) return;
  inject("data-v-0d9d1f75_0", {
    source: ".a-input-email-wrapper .email-validity-message{border-radius:.3rem;display:inline-block;font-size:.9rem;padding:.4rem}.a-input-email-wrapper .email-validity-message.success{background-color:rgba(176,231,203,.3);color:#3ac47d}.a-input-email-wrapper .email-validity-message.error{background-color:rgba(240,167,184,.3);color:#d92550}",
    map: undefined,
    media: undefined
  });
};
/* scoped */


const __vue_scope_id__$j = undefined;
/* module identifier */

const __vue_module_identifier__$j = undefined;
/* functional template */

const __vue_is_functional_template__$j = false;
/* style inject SSR */

/* style inject shadow dom */

const __vue_component__$j = /*#__PURE__*/normalizeComponent({
  render: __vue_render__$j,
  staticRenderFns: __vue_staticRenderFns__$j
}, __vue_inject_styles__$j, __vue_script__$j, __vue_scope_id__$j, __vue_is_functional_template__$j, __vue_module_identifier__$j, false, createInjector, undefined, undefined);

var script$k = Vue.extend({
  name: 'AInputNumber',
  components: {
    AInput: __vue_component__$g
  },
  props: {
    placeholder: {
      type: String,
      default: 'Ecrivez ici'
    },
    min: {
      type: Number,
      default: null
    },
    max: {
      type: Number,
      default: null
    },
    value: {
      type: Number,
      default: null
    },
    checkValidity: {
      type: Boolean,
      default: false
    }
  },

  data() {
    return {
      number: '',
      REGEX_NUMBER: new RegExp(/^[0-9]+$/)
    };
  },

  computed: {
    isNumberValid() {
      return this.checkNumber(this.number);
    }

  },
  methods: {
    checkNumber(value) {
      return this.REGEX_NUMBER.test(value);
    }

  }
});

/* script */
const __vue_script__$k = script$k;
/* template */

var __vue_render__$k = function () {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c('div', {
    staticClass: "a-input-number-wrapper"
  }, [_c('AInput', _vm._g({
    staticClass: "a-input-number",
    attrs: {
      "type": "number",
      "placeholder": _vm.placeholder,
      "min": _vm.min,
      "max": _vm.max,
      "value": _vm.value
    },
    model: {
      value: _vm.number,
      callback: function ($$v) {
        _vm.number = $$v;
      },
      expression: "number"
    }
  }, _vm.$listeners)), _vm._v(" "), _vm.checkValidity && _vm.number.length > 0 ? _c('div', [_c('AText', {
    staticClass: "number-validity-message",
    class: {
      success: _vm.isNumberValid,
      error: !_vm.isNumberValid
    }
  }, [_vm.isNumberValid ? _c('AText', {
    attrs: {
      "span": ""
    }
  }, [_vm._v("Votre nombre est valide.")]) : _vm._e(), _vm._v(" "), !_vm.isNumberValid ? _c('AText', {
    attrs: {
      "span": ""
    }
  }, [_vm._v("Votre nombre est incorrecte.")]) : _vm._e()], 1)], 1) : _vm._e()], 1);
};

var __vue_staticRenderFns__$k = [];
/* style */

const __vue_inject_styles__$k = function (inject) {
  if (!inject) return;
  inject("data-v-27208438_0", {
    source: ".a-input-number-wrapper .number-validity-message{border-radius:.3rem;display:inline-block;font-size:.9rem;padding:.4rem}.a-input-number-wrapper .number-validity-message.success{background-color:rgba(176,231,203,.3);color:#3ac47d}.a-input-number-wrapper .number-validity-message.error{background-color:rgba(240,167,184,.3);color:#d92550}",
    map: undefined,
    media: undefined
  });
};
/* scoped */


const __vue_scope_id__$k = undefined;
/* module identifier */

const __vue_module_identifier__$k = undefined;
/* functional template */

const __vue_is_functional_template__$k = false;
/* style inject SSR */

/* style inject shadow dom */

const __vue_component__$k = /*#__PURE__*/normalizeComponent({
  render: __vue_render__$k,
  staticRenderFns: __vue_staticRenderFns__$k
}, __vue_inject_styles__$k, __vue_script__$k, __vue_scope_id__$k, __vue_is_functional_template__$k, __vue_module_identifier__$k, false, createInjector, undefined, undefined);

var script$l = Vue.extend({
  name: 'AInputFile',
  components: {
    AInput: __vue_component__$g,
    ALabel: __vue_component__$9,
    AButton: __vue_component__,
    AText: __vue_component__$1
  },
  props: {
    id: {
      type: String,
      default: null
    },
    name: {
      type: String,
      default: null
    },
    disabled: {
      type: Boolean,
      default: false
    },
    multiple: {
      type: Boolean,
      default: false
    },
    placeholder: {
      type: String,
      default: 'Choisir un fichier'
    }
  },

  data() {
    return {
      value: {
        type: Object,
        default: null
      }
    };
  },

  methods: {
    handleFileChange(e) {
      this.$emit('input', e.target.files[0]);
      this.value = e.target.files[0];
    }

  }
});

/* script */
const __vue_script__$l = script$l;
/* template */

var __vue_render__$l = function () {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c('ALabel', {
    staticClass: "a-input-file-wrapper",
    attrs: {
      "html-for": _vm.id
    }
  }, [_c('AButton', {
    staticClass: "a-select-button",
    attrs: {
      "custom-tag": "div"
    }
  }, [_vm.value && _vm.value.name ? _c('AText', {
    attrs: {
      "span": ""
    }
  }, [_vm._v("Fichier sélectionné : " + _vm._s(_vm.value.name))]) : _c('AText', {
    attrs: {
      "span": ""
    }
  }, [_vm._v(_vm._s(_vm.placeholder))])], 1), _vm._v(" "), _c('AInput', _vm._g({
    staticClass: "a-input-file",
    attrs: {
      "id": _vm.id,
      "type": "file",
      "name": _vm.name,
      "disabled": _vm.disabled,
      "multiple": _vm.multiple,
      "tabindex": "-1"
    },
    on: {
      "change": _vm.handleFileChange
    }
  }, _vm.$listeners))], 1);
};

var __vue_staticRenderFns__$l = [];
/* style */

const __vue_inject_styles__$l = function (inject) {
  if (!inject) return;
  inject("data-v-0bc6907e_0", {
    source: ".a-input-file-wrapper .a-input.a-input-file{display:none}",
    map: undefined,
    media: undefined
  });
};
/* scoped */


const __vue_scope_id__$l = undefined;
/* module identifier */

const __vue_module_identifier__$l = undefined;
/* functional template */

const __vue_is_functional_template__$l = false;
/* style inject SSR */

/* style inject shadow dom */

const __vue_component__$l = /*#__PURE__*/normalizeComponent({
  render: __vue_render__$l,
  staticRenderFns: __vue_staticRenderFns__$l
}, __vue_inject_styles__$l, __vue_script__$l, __vue_scope_id__$l, __vue_is_functional_template__$l, __vue_module_identifier__$l, false, createInjector, undefined, undefined);

var script$m = Vue.extend({
  name: 'AInputHidden',
  components: {
    AInput: __vue_component__$g
  }
});

/* script */
const __vue_script__$m = script$m;
/* template */

var __vue_render__$m = function () {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c('AInput', _vm._g({
    staticClass: "a-input-hidden",
    attrs: {
      "type": "hidden"
    }
  }, _vm.$listeners));
};

var __vue_staticRenderFns__$m = [];
/* style */

const __vue_inject_styles__$m = undefined;
/* scoped */

const __vue_scope_id__$m = undefined;
/* module identifier */

const __vue_module_identifier__$m = undefined;
/* functional template */

const __vue_is_functional_template__$m = false;
/* style inject */

/* style inject SSR */

/* style inject shadow dom */

const __vue_component__$m = /*#__PURE__*/normalizeComponent({
  render: __vue_render__$m,
  staticRenderFns: __vue_staticRenderFns__$m
}, __vue_inject_styles__$m, __vue_script__$m, __vue_scope_id__$m, __vue_is_functional_template__$m, __vue_module_identifier__$m, false, undefined, undefined, undefined);

const visibleIcon = 'data:image/svg+xml;base64,PHN2ZyBhcmlhLWhpZGRlbj0idHJ1ZSIgZm9jdXNhYmxlPSJmYWxzZSIgZGF0YS1wcmVmaXg9ImZhcyIgZGF0YS1pY29uPSJleWUiIGNsYXNzPSJzdmctaW5saW5lLS1mYSBmYS1leWUgZmEtdy0xOCIgcm9sZT0iaW1nIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA1NzYgNTEyIj48cGF0aCBmaWxsPSJjdXJyZW50Q29sb3IiIGQ9Ik01NzIuNTIgMjQxLjRDNTE4LjI5IDEzNS41OSA0MTAuOTMgNjQgMjg4IDY0UzU3LjY4IDEzNS42NCAzLjQ4IDI0MS40MWEzMi4zNSAzMi4zNSAwIDAgMCAwIDI5LjE5QzU3LjcxIDM3Ni40MSAxNjUuMDcgNDQ4IDI4OCA0NDhzMjMwLjMyLTcxLjY0IDI4NC41Mi0xNzcuNDFhMzIuMzUgMzIuMzUgMCAwIDAgMC0yOS4xOXpNMjg4IDQwMGExNDQgMTQ0IDAgMSAxIDE0NC0xNDQgMTQzLjkzIDE0My45MyAwIDAgMS0xNDQgMTQ0em0wLTI0MGE5NS4zMSA5NS4zMSAwIDAgMC0yNS4zMSAzLjc5IDQ3Ljg1IDQ3Ljg1IDAgMCAxLTY2LjkgNjYuOUE5NS43OCA5NS43OCAwIDEgMCAyODggMTYweiI+PC9wYXRoPjwvc3ZnPg==';
const invisibleIcon = 'data:image/svg+xml;base64,PHN2ZyBhcmlhLWhpZGRlbj0idHJ1ZSIgZm9jdXNhYmxlPSJmYWxzZSIgZGF0YS1wcmVmaXg9ImZhcyIgZGF0YS1pY29uPSJleWUtc2xhc2giIGNsYXNzPSJzdmctaW5saW5lLS1mYSBmYS1leWUtc2xhc2ggZmEtdy0yMCIgcm9sZT0iaW1nIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA2NDAgNTEyIj48cGF0aCBmaWxsPSJjdXJyZW50Q29sb3IiIGQ9Ik0zMjAgNDAwYy03NS44NSAwLTEzNy4yNS01OC43MS0xNDIuOS0xMzMuMTFMNzIuMiAxODUuODJjLTEzLjc5IDE3LjMtMjYuNDggMzUuNTktMzYuNzIgNTUuNTlhMzIuMzUgMzIuMzUgMCAwIDAgMCAyOS4xOUM4OS43MSAzNzYuNDEgMTk3LjA3IDQ0OCAzMjAgNDQ4YzI2LjkxIDAgNTIuODctNCA3Ny44OS0xMC40NkwzNDYgMzk3LjM5YTE0NC4xMyAxNDQuMTMgMCAwIDEtMjYgMi42MXptMzEzLjgyIDU4LjFsLTExMC41NS04NS40NGEzMzEuMjUgMzMxLjI1IDAgMCAwIDgxLjI1LTEwMi4wNyAzMi4zNSAzMi4zNSAwIDAgMCAwLTI5LjE5QzU1MC4yOSAxMzUuNTkgNDQyLjkzIDY0IDMyMCA2NGEzMDguMTUgMzA4LjE1IDAgMCAwLTE0Ny4zMiAzNy43TDQ1LjQ2IDMuMzdBMTYgMTYgMCAwIDAgMjMgNi4xOEwzLjM3IDMxLjQ1QTE2IDE2IDAgMCAwIDYuMTggNTMuOWw1ODguMzYgNDU0LjczYTE2IDE2IDAgMCAwIDIyLjQ2LTIuODFsMTkuNjQtMjUuMjdhMTYgMTYgMCAwIDAtMi44Mi0yMi40NXptLTE4My43Mi0xNDJsLTM5LjMtMzAuMzhBOTQuNzUgOTQuNzUgMCAwIDAgNDE2IDI1NmE5NC43NiA5NC43NiAwIDAgMC0xMjEuMzEtOTIuMjFBNDcuNjUgNDcuNjUgMCAwIDEgMzA0IDE5MmE0Ni42NCA0Ni42NCAwIDAgMS0xLjU0IDEwbC03My42MS01Ni44OUExNDIuMzEgMTQyLjMxIDAgMCAxIDMyMCAxMTJhMTQzLjkyIDE0My45MiAwIDAgMSAxNDQgMTQ0YzAgMjEuNjMtNS4yOSA0MS43OS0xMy45IDYwLjExeiI+PC9wYXRoPjwvc3ZnPg==';
var script$n = Vue.extend({
  name: 'AInputPassword',
  components: {
    AInput: __vue_component__$g,
    AText: __vue_component__$1,
    AImage: __vue_component__$5
  },
  inheritAttrs: false,
  props: {
    placeholder: {
      type: String,
      default: 'Votre mot de passe'
    },
    required: {
      type: Boolean,
      default: true
    },
    strongVerif: {
      type: Boolean,
      default: false
    }
  },

  data() {
    return {
      password: '',
      hidePassword: true,
      REGEX_PASSWORD: new RegExp(/^.*(?=.{8,})(?=.*[a-zA-Z])(?=.*\d)(?=.*[!#$%&?]).*$/g)
    };
  },

  computed: {
    isPasswordValid() {
      return this.password.length > 0 && this.checkPassword(this.password);
    },

    passwordType() {
      return this.hidePassword ? 'password' : 'text';
    },

    hiddenIcon() {
      return this.hidePassword ? visibleIcon : invisibleIcon;
    }

  },
  methods: {
    checkPassword(value) {
      return this.REGEX_PASSWORD.test(value); // Minimum of 8 characters, at least 1 uppercase letter, 1 lowercase letter,
      // 1 special character (!#$%&?) and 1 number without space.
    }

  }
});

/* script */
const __vue_script__$n = script$n;
/* template */

var __vue_render__$n = function () {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c('div', {
    staticClass: "a-input-password-wrapper"
  }, [_c('div', {
    staticClass: "a-input-group"
  }, [_c('AInput', _vm._g(_vm._b({
    staticClass: "a-input-password",
    class: [_vm.strongVerif && _vm.password.length > 0 ? {
      success: _vm.isPasswordValid,
      error: !_vm.isPasswordValid
    } : ''],
    attrs: {
      "type": _vm.passwordType,
      "placeholder": _vm.placeholder,
      "required": _vm.required
    },
    model: {
      value: _vm.password,
      callback: function ($$v) {
        _vm.password = $$v;
      },
      expression: "password"
    }
  }, 'AInput', _vm.$attrs, false), _vm.$listeners)), _vm._v(" "), _c('AImage', {
    staticClass: "icon-password",
    attrs: {
      "src": _vm.hiddenIcon,
      "type": "icon",
      "title": _vm.hidePassword ? 'Afficher le mot de passe' : 'Masquer le mot de passe'
    },
    nativeOn: {
      "click": function ($event) {
        _vm.hidePassword = !_vm.hidePassword;
      }
    }
  })], 1), _vm._v(" "), _vm.strongVerif && _vm.password.length > 0 ? _c('div', [_c('AText', {
    staticClass: "password-validity-message",
    class: {
      success: _vm.isPasswordValid,
      error: !_vm.isPasswordValid
    }
  }, [_vm.isPasswordValid ? _c('AText', {
    attrs: {
      "span": ""
    }
  }, [_vm._v("\n                Votre mot de passe est valide.\n            ")]) : _vm._e(), _vm._v(" "), !_vm.isPasswordValid ? _c('AText', {
    attrs: {
      "span": ""
    }
  }, [_vm._v("\n                Votre mot de passe est incorrect. Celui-ci doit contenir au moins 8 caractères dont :\n                1 majuscule, 1 minuscule, 1 chiffre et 1 caractère spécial (!, #, $, %, & ou ?)\n            ")]) : _vm._e()], 1)], 1) : _vm._e()]);
};

var __vue_staticRenderFns__$n = [];
/* style */

const __vue_inject_styles__$n = function (inject) {
  if (!inject) return;
  inject("data-v-34a9f0ac_0", {
    source: ".a-input-password-wrapper .a-input-group{display:inline-block;position:relative}.a-input-password-wrapper .a-input-group .a-input.a-input-password+.icon-password{border-radius:50px;bottom:0;cursor:pointer;margin:auto;opacity:35%;padding:3px 6px;position:absolute;right:1px;top:0;width:20px}.a-input-password-wrapper .password-validity-message{border-radius:.3rem;display:inline-block;font-size:.9rem;margin-top:.5rem;padding:.4rem}.a-input-password-wrapper .password-validity-message.success{background-color:rgba(176,231,203,.3);color:#3ac47d}.a-input-password-wrapper .password-validity-message.error{background-color:rgba(240,167,184,.3);color:#d92550}",
    map: undefined,
    media: undefined
  });
};
/* scoped */


const __vue_scope_id__$n = undefined;
/* module identifier */

const __vue_module_identifier__$n = undefined;
/* functional template */

const __vue_is_functional_template__$n = false;
/* style inject SSR */

/* style inject shadow dom */

const __vue_component__$n = /*#__PURE__*/normalizeComponent({
  render: __vue_render__$n,
  staticRenderFns: __vue_staticRenderFns__$n
}, __vue_inject_styles__$n, __vue_script__$n, __vue_scope_id__$n, __vue_is_functional_template__$n, __vue_module_identifier__$n, false, createInjector, undefined, undefined);

var script$o = Vue.extend({
  name: 'AInputRadio',
  components: {
    AInput: __vue_component__$g
  },
  model: {
    prop: 'modelValue',
    event: 'change'
  },
  props: {
    value: {
      type: [String, Boolean],
      required: true
    },

    /** Whether the radio is checked. Can also be checked programatically using v-bind. */
    checked: {
      type: Boolean,
      default: false
    },

    /** This is a necessary prop for using v-model with this component. Should NOT be set */
    modelValue: {
      type: String,
      default: undefined
    },
    name: {
      type: String,
      default: null
    }
  },
  computed: {
    shouldBeChecked() {
      if (this.modelValue == null) {
        return this.checked;
      }

      return this.modelValue === this.value;
    }

  },
  watch: {
    checked() {
      if (this.checked) {
        this.toggle();
      }
    }

  },

  mounted() {
    if (this.checked) {
      this.toggle();
    }
  },

  methods: {
    toggle() {
      this.$emit('change', this.value);
    }

  }
});

/* script */
const __vue_script__$o = script$o;
/* template */

var __vue_render__$o = function () {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c('div', {
    staticClass: "a-input-radio-wrapper"
  }, [_c('AInput', _vm._g({
    staticClass: "a-input-radio",
    attrs: {
      "id": _vm.id,
      "type": "radio",
      "value": _vm.value,
      "checked": _vm.shouldBeChecked,
      "name": _vm.name
    },
    on: {
      "change": _vm.toggle
    }
  }, _vm.$listeners)), _vm._v(" "), _c('span', {
    staticClass: "radio-circle"
  })], 1);
};

var __vue_staticRenderFns__$o = [];
/* style */

const __vue_inject_styles__$o = function (inject) {
  if (!inject) return;
  inject("data-v-99423f8a_0", {
    source: ".a-input-radio-wrapper{display:inline-flex}.a-input-radio-wrapper .radio-circle{align-items:center;background:#009cde;border-radius:50%;cursor:pointer;display:flex;font-size:2rem;height:1.2rem;justify-content:center;width:1.2rem}.a-input-radio-wrapper .radio-circle::before{background:#fff;border-radius:50%;content:\"\";height:.5rem;opacity:0;transition:opacity .2s;width:.5rem}.a-input-radio-wrapper:focus{box-shadow:0 0 .6rem rgba(43,43,43,.4)}.a-input-radio-wrapper .a-input.a-input-radio{display:none}.a-input-radio-wrapper .a-input.a-input-radio:checked+.radio-circle::before{opacity:1}",
    map: undefined,
    media: undefined
  });
};
/* scoped */


const __vue_scope_id__$o = undefined;
/* module identifier */

const __vue_module_identifier__$o = undefined;
/* functional template */

const __vue_is_functional_template__$o = false;
/* style inject SSR */

/* style inject shadow dom */

const __vue_component__$o = /*#__PURE__*/normalizeComponent({
  render: __vue_render__$o,
  staticRenderFns: __vue_staticRenderFns__$o
}, __vue_inject_styles__$o, __vue_script__$o, __vue_scope_id__$o, __vue_is_functional_template__$o, __vue_module_identifier__$o, false, createInjector, undefined, undefined);

var script$p = Vue.extend({
  name: 'AInputSearch',
  components: {
    AInput: __vue_component__$g
  },
  props: {
    placeholder: {
      type: String,
      default: 'Votre recherche'
    }
  }
});

/* script */
const __vue_script__$p = script$p;
/* template */

var __vue_render__$p = function () {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c('AInput', _vm._g({
    staticClass: "a-input-search",
    attrs: {
      "type": "search",
      "placeholder": _vm.placeholder
    }
  }, _vm.$listeners));
};

var __vue_staticRenderFns__$p = [];
/* style */

const __vue_inject_styles__$p = function (inject) {
  if (!inject) return;
  inject("data-v-0b4b073e_0", {
    source: ".a-input.a-input-search{resize:horizontal}",
    map: undefined,
    media: undefined
  });
};
/* scoped */


const __vue_scope_id__$p = undefined;
/* module identifier */

const __vue_module_identifier__$p = undefined;
/* functional template */

const __vue_is_functional_template__$p = false;
/* style inject SSR */

/* style inject shadow dom */

const __vue_component__$p = /*#__PURE__*/normalizeComponent({
  render: __vue_render__$p,
  staticRenderFns: __vue_staticRenderFns__$p
}, __vue_inject_styles__$p, __vue_script__$p, __vue_scope_id__$p, __vue_is_functional_template__$p, __vue_module_identifier__$p, false, createInjector, undefined, undefined);

var script$q = Vue.extend({
  name: 'AInputTel',
  components: {
    AInput: __vue_component__$g,
    AText: __vue_component__$1
  },
  inheritAttrs: false,
  props: {
    placeholder: {
      type: String,
      default: 'Votre numéro de téléphone'
    },
    checkValidity: {
      type: Boolean,
      default: false
    }
  },

  data() {
    return {
      telNumber: '',
      REGEX_TEL: new RegExp(/^((\+)33+ ?|0)[1-9]( ?(\d{2})){4}$/gi)
    };
  },

  computed: {
    isTelValid() {
      return this.checkTel(this.telNumber);
    }

  },
  methods: {
    checkTel(value) {
      return this.REGEX_TEL.test(value);
    }

  }
});

/* script */
const __vue_script__$q = script$q;
/* template */

var __vue_render__$q = function () {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c('div', {
    staticClass: "a-input-tel-wrapper"
  }, [_c('AInput', _vm._g(_vm._b({
    staticClass: "a-input-tel",
    class: [_vm.checkValidity && _vm.telNumber.length > 0 ? {
      success: _vm.isTelValid,
      error: !_vm.isTelValid
    } : ''],
    attrs: {
      "type": "tel",
      "placeholder": _vm.placeholder
    },
    model: {
      value: _vm.telNumber,
      callback: function ($$v) {
        _vm.telNumber = $$v;
      },
      expression: "telNumber"
    }
  }, 'AInput', _vm.$attrs, false), _vm.$listeners)), _vm._v(" "), _vm.checkValidity && _vm.telNumber.length > 0 ? _c('div', [_c('AText', {
    staticClass: "tel-validity-message",
    class: {
      success: _vm.isTelValid,
      error: !_vm.isTelValid
    }
  }, [_vm.isTelValid ? _c('AText', {
    attrs: {
      "span": ""
    }
  }, [_vm._v("\n                Votre numéro de téléphone est valide.\n            ")]) : _vm._e(), _vm._v(" "), !_vm.isTelValid ? _c('AText', {
    attrs: {
      "span": ""
    }
  }, [_vm._v("\n                Votre numéro de téléphone est invalide.\n            ")]) : _vm._e()], 1)], 1) : _vm._e()], 1);
};

var __vue_staticRenderFns__$q = [];
/* style */

const __vue_inject_styles__$q = function (inject) {
  if (!inject) return;
  inject("data-v-23ba2c3a_0", {
    source: ".a-input-tel-wrapper .tel-validity-message{border-radius:.3rem;display:inline-block;font-size:.9rem;margin-top:.5rem;padding:.4rem}.a-input-tel-wrapper .tel-validity-message.success{background-color:rgba(176,231,203,.3);color:#3ac47d}.a-input-tel-wrapper .tel-validity-message.error{background-color:rgba(240,167,184,.3);color:#d92550}",
    map: undefined,
    media: undefined
  });
};
/* scoped */


const __vue_scope_id__$q = undefined;
/* module identifier */

const __vue_module_identifier__$q = undefined;
/* functional template */

const __vue_is_functional_template__$q = false;
/* style inject SSR */

/* style inject shadow dom */

const __vue_component__$q = /*#__PURE__*/normalizeComponent({
  render: __vue_render__$q,
  staticRenderFns: __vue_staticRenderFns__$q
}, __vue_inject_styles__$q, __vue_script__$q, __vue_scope_id__$q, __vue_is_functional_template__$q, __vue_module_identifier__$q, false, createInjector, undefined, undefined);

var script$r = Vue.extend({
  name: 'AInputText',
  components: {
    AInput: __vue_component__$g
  },
  props: {
    placeholder: {
      type: String,
      default: 'Ecrivez ici'
    },
    editable: {
      type: Boolean,
      default: true
    }
  }
});

/* script */
const __vue_script__$r = script$r;
/* template */

var __vue_render__$r = function () {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c('AInput', _vm._g(_vm._b({
    staticClass: "a-input-text",
    attrs: {
      "type": "text",
      "placeholder": _vm.placeholder,
      "contenteditable": _vm.editable
    }
  }, 'AInput', _vm.$attrs, false), _vm.$listeners));
};

var __vue_staticRenderFns__$r = [];
/* style */

const __vue_inject_styles__$r = function (inject) {
  if (!inject) return;
  inject("data-v-56bbb8b7_0", {
    source: ".a-input.a-input-text{overflow:hidden;resize:auto}",
    map: undefined,
    media: undefined
  });
};
/* scoped */


const __vue_scope_id__$r = undefined;
/* module identifier */

const __vue_module_identifier__$r = undefined;
/* functional template */

const __vue_is_functional_template__$r = false;
/* style inject SSR */

/* style inject shadow dom */

const __vue_component__$r = /*#__PURE__*/normalizeComponent({
  render: __vue_render__$r,
  staticRenderFns: __vue_staticRenderFns__$r
}, __vue_inject_styles__$r, __vue_script__$r, __vue_scope_id__$r, __vue_is_functional_template__$r, __vue_module_identifier__$r, false, createInjector, undefined, undefined);

var script$s = Vue.extend({
  name: 'AInputUrl',
  components: {
    AInput: __vue_component__$g,
    AText: __vue_component__$1
  },
  inheritAttrs: false,
  props: {
    placeholder: {
      type: String,
      default: 'Entrez votre URL'
    },
    checkValidity: {
      type: Boolean,
      default: false
    }
  },

  data() {
    return {
      url: '',
      REGEX_URL: new RegExp(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)/gi)
    };
  },

  computed: {
    isUrlValid() {
      return this.checkUrl(this.url);
    }

  },
  methods: {
    checkUrl(value) {
      return this.REGEX_URL.test(value);
    }

  }
});

/* script */
const __vue_script__$s = script$s;
/* template */

var __vue_render__$s = function () {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c('div', {
    staticClass: "a-input-url-wrapper"
  }, [_c('AInput', _vm._g(_vm._b({
    staticClass: "a-input-url",
    class: [_vm.checkValidity && _vm.url.length > 0 ? {
      success: _vm.isUrlValid,
      error: !_vm.isUrlValid
    } : ''],
    attrs: {
      "type": "url",
      "placeholder": _vm.placeholder
    },
    model: {
      value: _vm.url,
      callback: function ($$v) {
        _vm.url = $$v;
      },
      expression: "url"
    }
  }, 'AInput', _vm.$attrs, false), _vm.$listeners)), _vm._v(" "), _vm.checkValidity && _vm.url.length > 0 ? _c('div', [_c('AText', {
    staticClass: "url-validity-message",
    class: {
      success: _vm.isUrlValid,
      error: !_vm.isUrlValid
    }
  }, [_vm.isUrlValid ? _c('AText', {
    attrs: {
      "span": ""
    }
  }, [_vm._v("Votre URL est valide.")]) : _vm._e(), _vm._v(" "), !_vm.isUrlValid ? _c('AText', {
    attrs: {
      "span": ""
    }
  }, [_vm._v("Votre URL est invalide.")]) : _vm._e()], 1)], 1) : _vm._e()], 1);
};

var __vue_staticRenderFns__$s = [];
/* style */

const __vue_inject_styles__$s = function (inject) {
  if (!inject) return;
  inject("data-v-8b278c50_0", {
    source: ".a-input-url-wrapper .url-validity-message{border-radius:.3rem;display:inline-block;font-size:.9rem;margin-top:.5rem;padding:.4rem}.a-input-url-wrapper .url-validity-message.success{background-color:rgba(176,231,203,.3);color:#3ac47d}.a-input-url-wrapper .url-validity-message.error{background-color:rgba(240,167,184,.3);color:#d92550}",
    map: undefined,
    media: undefined
  });
};
/* scoped */


const __vue_scope_id__$s = undefined;
/* module identifier */

const __vue_module_identifier__$s = undefined;
/* functional template */

const __vue_is_functional_template__$s = false;
/* style inject SSR */

/* style inject shadow dom */

const __vue_component__$s = /*#__PURE__*/normalizeComponent({
  render: __vue_render__$s,
  staticRenderFns: __vue_staticRenderFns__$s
}, __vue_inject_styles__$s, __vue_script__$s, __vue_scope_id__$s, __vue_is_functional_template__$s, __vue_module_identifier__$s, false, createInjector, undefined, undefined);

var script$t = Vue.extend({
  name: "MBadge",
  components: {
    AText: __vue_component__$1,
    AImage: __vue_component__$5
  },
  props: {
    label: {
      type: String,
      default: null
    },
    withoutText: {
      type: Boolean,
      default: false
    },
    horizontal: {
      type: Boolean,
      default: false
    },
    src: {
      type: String,
      default: "https://placehold.it/350x150"
    }
  }
});

/* script */
const __vue_script__$t = script$t;
/* template */

var __vue_render__$t = function () {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c('div', {
    staticClass: "m-badge",
    class: {
      'horizontal': _vm.horizontal
    }
  }, [_c('AImage', {
    class: {
      'horizontal': _vm.horizontal
    },
    attrs: {
      "src": _vm.src
    }
  }), _vm._v(" "), _c('AText', {
    class: {
      'without-text': _vm.withoutText,
      'horizontal': _vm.horizontal
    }
  }, [_vm._v(_vm._s(_vm.label))])], 1);
};

var __vue_staticRenderFns__$t = [];
/* style */

const __vue_inject_styles__$t = function (inject) {
  if (!inject) return;
  inject("data-v-da71a174_0", {
    source: ".m-badge{display:inline-block;position:relative;text-align:center}.m-badge .a-image{animation:1s appear;border:.5px solid #000;border-radius:100%;display:block;padding:5px;width:4rem}.m-badge .a-text.without-text{display:none}.m-badge .a-text.horizontal{margin-left:1rem}.m-badge.horizontal{align-items:center;display:flex;flex-direction:row}.m-badge.horizontal.a-image{width:20rem}",
    map: undefined,
    media: undefined
  });
};
/* scoped */


const __vue_scope_id__$t = undefined;
/* module identifier */

const __vue_module_identifier__$t = undefined;
/* functional template */

const __vue_is_functional_template__$t = false;
/* style inject SSR */

/* style inject shadow dom */

const __vue_component__$t = /*#__PURE__*/normalizeComponent({
  render: __vue_render__$t,
  staticRenderFns: __vue_staticRenderFns__$t
}, __vue_inject_styles__$t, __vue_script__$t, __vue_scope_id__$t, __vue_is_functional_template__$t, __vue_module_identifier__$t, false, createInjector, undefined, undefined);

var script$u = Vue.extend({
  name: 'MCard',
  components: {
    ALink: __vue_component__$6
  },
  props: {
    /** "to" prop for vue-router - renders a <a> */
    href: {
      type: String,
      default: null
    },
    to: {
      type: String,
      default: null
    },
    isLink: {
      type: Boolean,
      default: false
    },
    noAnim: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    tag() {
      if (this.isLink) return 'ALink';
      return 'div';
    }

  }
});

/* script */
const __vue_script__$u = script$u;
/* template */

var __vue_render__$u = function () {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c(_vm.tag, {
    tag: "component",
    staticClass: "m-card",
    class: {
      'is-link': _vm.isLink,
      'no-anim': _vm.noAnim
    },
    attrs: {
      "to": _vm.to,
      "href": _vm.href,
      "no-line": _vm.isLink
    }
  }, [_vm._t("default")], 2);
};

var __vue_staticRenderFns__$u = [];
/* style */

const __vue_inject_styles__$u = function (inject) {
  if (!inject) return;
  inject("data-v-1ac6f7f8_0", {
    source: ".m-card{background-color:#fff;border-radius:1rem;box-shadow:0 2px 4px rgba(0,0,0,.25);display:block;margin-bottom:2rem;overflow:hidden;padding:2rem;transition:all .3s ease-in-out}.m-card.is-link:hover{cursor:pointer}.m-card.is-link:hover a{color:#009cde}.m-card:not(.no-anim):hover{box-shadow:0 4px 8px rgba(0,0,0,.25)}",
    map: undefined,
    media: undefined
  });
};
/* scoped */


const __vue_scope_id__$u = undefined;
/* module identifier */

const __vue_module_identifier__$u = undefined;
/* functional template */

const __vue_is_functional_template__$u = false;
/* style inject SSR */

/* style inject shadow dom */

const __vue_component__$u = /*#__PURE__*/normalizeComponent({
  render: __vue_render__$u,
  staticRenderFns: __vue_staticRenderFns__$u
}, __vue_inject_styles__$u, __vue_script__$u, __vue_scope_id__$u, __vue_is_functional_template__$u, __vue_module_identifier__$u, false, createInjector, undefined, undefined);

var script$v = Vue.extend({
  name: 'MCarousel',
  components: {
    VueAgile
  },
  inheritAttrs: false,
  props: {
    slides: {
      type: Array,
      default: () => []
    },
    navButtons: {
      type: Boolean,
      default: false
    },
    dots: {
      type: Boolean,
      default: false
    }
  }
});

/* script */
const __vue_script__$v = script$v;
/* template */

var __vue_render__$v = function () {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c('div', {
    staticClass: "m-carousel"
  }, [_c('VueAgile', _vm._b({
    attrs: {
      "nav-buttons": _vm.navButtons,
      "dots": _vm.dots
    }
  }, 'VueAgile', _vm.$attrs, false), [_vm._l(_vm.slides, function (slide) {
    return _c('div', {
      key: slide,
      staticClass: "slide",
      domProps: {
        "innerHTML": _vm._s(slide)
      }
    });
  }), _vm._v(" "), _c('template', {
    slot: "prevButton"
  }, [_c('span', {
    attrs: {
      "title": "Précédent"
    }
  }, [_vm._v("<")])]), _vm._v(" "), _c('template', {
    slot: "nextButton"
  }, [_c('span', {
    attrs: {
      "title": "Suivant"
    }
  }, [_vm._v(">")])])], 2)], 1);
};

var __vue_staticRenderFns__$v = [];
/* style */

const __vue_inject_styles__$v = function (inject) {
  if (!inject) return;
  inject("data-v-3194d958_0", {
    source: ".m-carousel .agile__actions{margin-top:1rem}.m-carousel .agile__nav-button{background:0 0;border:0;color:rgba(255,255,255,.8);cursor:pointer;font-size:2.4rem;height:100%;position:absolute;text-shadow:0 2px 3px rgba(0,0,0,.25);top:0;transition-duration:.3s;width:4rem}.m-carousel .agile__nav-button:hover{color:#888;text-shadow:0 2px 5px rgba(0,0,0,.25)}.m-carousel .agile__nav-button--prev{left:0}.m-carousel .agile__nav-button--next{right:0}.m-carousel .agile__dot{margin:0 1rem}.m-carousel .agile__dot button{background-color:#eee;border:0;border-radius:50%;cursor:pointer;display:block;font-size:0;height:.5rem;line-height:0;margin:0;padding:0;transition-duration:.3s;width:.5rem}.m-carousel .agile__dot--current button,.m-carousel .agile__dot:hover button{background-color:#888}.m-carousel .agile .slide{align-items:center;display:flex;justify-content:center;min-height:400px}.m-carousel .agile .slide .a-image{height:100%;object-fit:cover;position:absolute;width:100%}.m-carousel .agile .slide .caption{font-size:3.2rem;font-weight:300}",
    map: undefined,
    media: undefined
  });
};
/* scoped */


const __vue_scope_id__$v = undefined;
/* module identifier */

const __vue_module_identifier__$v = undefined;
/* functional template */

const __vue_is_functional_template__$v = false;
/* style inject SSR */

/* style inject shadow dom */

const __vue_component__$v = /*#__PURE__*/normalizeComponent({
  render: __vue_render__$v,
  staticRenderFns: __vue_staticRenderFns__$v
}, __vue_inject_styles__$v, __vue_script__$v, __vue_scope_id__$v, __vue_is_functional_template__$v, __vue_module_identifier__$v, false, createInjector, undefined, undefined);

var script$w = Vue.extend({
  name: 'MLogo',
  components: {
    AImage: __vue_component__$5,
    ALink: __vue_component__$6
  },
  props: {
    src: {
      type: String,
      default: "http://www.institutfrance.si/modules/uploader/uploads/news/pictures_news/AF_Slovenie_Logo_site_2.jpg"
    }
  }
});

/* script */
const __vue_script__$w = script$w;
/* template */

var __vue_render__$w = function () {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c('ALink', {
    staticClass: "m-logo",
    attrs: {
      "to": "/",
      "title": "Me rendre à la page d'accueil",
      "no-line": ""
    }
  }, [_c('AImage', {
    attrs: {
      "src": _vm.src
    }
  })], 1);
};

var __vue_staticRenderFns__$w = [];
/* style */

const __vue_inject_styles__$w = function (inject) {
  if (!inject) return;
  inject("data-v-bb8ae842_0", {
    source: ".m-logo{animation:1s appear;margin:auto}",
    map: undefined,
    media: undefined
  });
};
/* scoped */


const __vue_scope_id__$w = undefined;
/* module identifier */

const __vue_module_identifier__$w = undefined;
/* functional template */

const __vue_is_functional_template__$w = false;
/* style inject SSR */

/* style inject shadow dom */

const __vue_component__$w = /*#__PURE__*/normalizeComponent({
  render: __vue_render__$w,
  staticRenderFns: __vue_staticRenderFns__$w
}, __vue_inject_styles__$w, __vue_script__$w, __vue_scope_id__$w, __vue_is_functional_template__$w, __vue_module_identifier__$w, false, createInjector, undefined, undefined);

var script$x = Vue.extend({
  name: 'MNavbar',
  components: {
    AList: __vue_component__$7
  },
  props: {
    horizontal: {
      type: Boolean,
      default: true
    }
  }
});

/* script */
const __vue_script__$x = script$x;
/* template */

var __vue_render__$x = function () {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c('nav', {
    staticClass: "m-navbar"
  }, [_c('AList', {
    attrs: {
      "horizontal": _vm.horizontal,
      "without-chips": ""
    }
  }, [_vm._t("default")], 2)], 1);
};

var __vue_staticRenderFns__$x = [];
/* style */

const __vue_inject_styles__$x = function (inject) {
  if (!inject) return;
  inject("data-v-23f0fa43_0", {
    source: ".m-navbar>.a-list{padding-left:0}.m-navbar .a-list-item{margin-bottom:1.5rem}",
    map: undefined,
    media: undefined
  });
};
/* scoped */


const __vue_scope_id__$x = undefined;
/* module identifier */

const __vue_module_identifier__$x = undefined;
/* functional template */

const __vue_is_functional_template__$x = false;
/* style inject SSR */

/* style inject shadow dom */

const __vue_component__$x = /*#__PURE__*/normalizeComponent({
  render: __vue_render__$x,
  staticRenderFns: __vue_staticRenderFns__$x
}, __vue_inject_styles__$x, __vue_script__$x, __vue_scope_id__$x, __vue_is_functional_template__$x, __vue_module_identifier__$x, false, createInjector, undefined, undefined);

var script$y = Vue.extend({
  name: 'MNavItem',
  components: {
    AListItem: __vue_component__$8
  }
});

/* script */
const __vue_script__$y = script$y;
/* template */

var __vue_render__$y = function () {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c('AListItem', {
    staticClass: "m-nav-item"
  }, [_vm._t("default")], 2);
};

var __vue_staticRenderFns__$y = [];
/* style */

const __vue_inject_styles__$y = undefined;
/* scoped */

const __vue_scope_id__$y = undefined;
/* module identifier */

const __vue_module_identifier__$y = undefined;
/* functional template */

const __vue_is_functional_template__$y = false;
/* style inject */

/* style inject SSR */

/* style inject shadow dom */

const __vue_component__$y = /*#__PURE__*/normalizeComponent({
  render: __vue_render__$y,
  staticRenderFns: __vue_staticRenderFns__$y
}, __vue_inject_styles__$y, __vue_script__$y, __vue_scope_id__$y, __vue_is_functional_template__$y, __vue_module_identifier__$y, false, undefined, undefined, undefined);

var script$z = Vue.extend({
  name: 'MPartner',
  components: {
    AImage: __vue_component__$5,
    ALink: __vue_component__$6
  },
  props: {
    type: {
      type: String,
      default: 'default'
    },
    src: {
      type: String,
      default: null
    },
    alt: {
      type: String,
      default: "Partner's logo"
    },
    href: {
      type: String,
      default: null
    },
    title: {
      type: String,
      default: "Partner's logo"
    }
  }
});

/* script */
const __vue_script__$z = script$z;
/* template */

var __vue_render__$z = function () {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c('ALink', {
    staticClass: "m-partner",
    attrs: {
      "href": _vm.href,
      "title": _vm.title,
      "no-line": ""
    }
  }, [_c('AImage', {
    staticClass: "img-partner",
    attrs: {
      "src": _vm.src,
      "alt": _vm.alt
    }
  })], 1);
};

var __vue_staticRenderFns__$z = [];
/* style */

const __vue_inject_styles__$z = function (inject) {
  if (!inject) return;
  inject("data-v-2e2d916f_0", {
    source: ".m-partner{animation:1s appear;margin:auto}",
    map: undefined,
    media: undefined
  });
};
/* scoped */


const __vue_scope_id__$z = undefined;
/* module identifier */

const __vue_module_identifier__$z = undefined;
/* functional template */

const __vue_is_functional_template__$z = false;
/* style inject SSR */

/* style inject shadow dom */

const __vue_component__$z = /*#__PURE__*/normalizeComponent({
  render: __vue_render__$z,
  staticRenderFns: __vue_staticRenderFns__$z
}, __vue_inject_styles__$z, __vue_script__$z, __vue_scope_id__$z, __vue_is_functional_template__$z, __vue_module_identifier__$z, false, createInjector, undefined, undefined);

const scrollTop = (el, from = 0, to, duration = 500) => {
  if (!window.requestAnimationFrame) {
    window.requestAnimationFrame = window.webkitRequestAnimationFrame || function (callback) {
      return window.setTimeout(callback, 1000 / 60);
    };
  }

  const difference = Math.abs(from - to);
  const scale = 1 / (1 - Math.pow(10 / difference, 1 / (60 * duration / 1000 - 10)));

  function scrollEase(start, end) {
    if (start === end) return;
    const stepNum = Math.ceil(Math.abs(start - end) / scale);
    let d = Math.min(end, start + stepNum);

    if (start > end) {
      d = Math.max(end, start - stepNum);
    }

    if (el === window) {
      window.scrollTo(d, d);
    } else {
      el.scrollTop = d;
    }

    window.requestAnimationFrame(() => scrollEase(d, end));
  }

  scrollEase(from, to);
};
var script$A = Vue.extend({
  name: 'MScrollToTop',
  components: {
    AButton: __vue_component__
  },
  props: {
    title: {
      type: String,
      default: 'Revenir en haut de la page'
    },
    duration: {
      type: Number,
      default: 1000
    },
    // dark or light
    styles: {
      type: String,
      default: 'light',

      validator(value) {
        return ['light', 'dark'].includes(value);
      }

    }
  },
  methods: {
    scrollToTop() {
      const sTop = document.documentElement.scrollTop || document.body.scrollTop;
      scrollTop(window, sTop, 0, this.duration);
      this.$emit('click');
    }

  }
});

/* script */
const __vue_script__$A = script$A;
/* template */

var __vue_render__$A = function () {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c('AButton', {
    staticClass: "m-scroll-to-top",
    attrs: {
      "styles": _vm.styles,
      "title": _vm.title
    },
    on: {
      "click": _vm.scrollToTop
    }
  }, [_vm._v("\n    ^\n")]);
};

var __vue_staticRenderFns__$A = [];
/* style */

const __vue_inject_styles__$A = function (inject) {
  if (!inject) return;
  inject("data-v-5d246d7e_0", {
    source: ".m-scroll-to-top.a-button{box-shadow:0 -1px 5px #fff;font-size:2rem;padding:1rem;padding-bottom:0;padding-top:.5rem;text-align:center}",
    map: undefined,
    media: undefined
  });
};
/* scoped */


const __vue_scope_id__$A = undefined;
/* module identifier */

const __vue_module_identifier__$A = undefined;
/* functional template */

const __vue_is_functional_template__$A = false;
/* style inject SSR */

/* style inject shadow dom */

const __vue_component__$A = /*#__PURE__*/normalizeComponent({
  render: __vue_render__$A,
  staticRenderFns: __vue_staticRenderFns__$A
}, __vue_inject_styles__$A, __vue_script__$A, __vue_scope_id__$A, __vue_is_functional_template__$A, __vue_module_identifier__$A, false, createInjector, undefined, undefined);

var script$B = Vue.extend({
  name: 'MSocialButton',
  components: {
    AImage: __vue_component__$5,
    AButton: __vue_component__
  },
  props: {
    title: {
      type: String,
      default: 'Accéder à cette page'
    },
    src: {
      type: [String, Object],
      default: null
    },
    href: {
      type: String,
      default: null
    }
  }
});

/* script */
const __vue_script__$B = script$B;
/* template */

var __vue_render__$B = function () {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c('AButton', {
    staticClass: "m-social-button",
    attrs: {
      "title": _vm.title,
      "href": _vm.href,
      "target": "_blank"
    }
  }, [_c('AImage', {
    attrs: {
      "src": _vm.src,
      "alt": _vm.title
    }
  })], 1);
};

var __vue_staticRenderFns__$B = [];
/* style */

const __vue_inject_styles__$B = function (inject) {
  if (!inject) return;
  inject("data-v-2ef47120_0", {
    source: ".m-social-button.a-button{border-radius:100%;display:block;height:30px;padding:5px;width:30px}.m-social-button.a-button .a-image{height:100%;width:100%}.m-social-button.a-button:hover .a-image{filter:invert(47%) sepia(95%) saturate(2181%) hue-rotate(166deg) brightness(91%) contrast(104%)}",
    map: undefined,
    media: undefined
  });
};
/* scoped */


const __vue_scope_id__$B = undefined;
/* module identifier */

const __vue_module_identifier__$B = undefined;
/* functional template */

const __vue_is_functional_template__$B = false;
/* style inject SSR */

/* style inject shadow dom */

const __vue_component__$B = /*#__PURE__*/normalizeComponent({
  render: __vue_render__$B,
  staticRenderFns: __vue_staticRenderFns__$B
}, __vue_inject_styles__$B, __vue_script__$B, __vue_scope_id__$B, __vue_is_functional_template__$B, __vue_module_identifier__$B, false, createInjector, undefined, undefined);

var script$C = Vue.extend({
  name: 'MSocialButtonFacebook',
  components: {
    MSocialButton: __vue_component__$B
  },
  props: {
    href: {
      type: String,
      default: 'https://www.facebook.com'
    },
    title: {
      type: String,
      default: 'Accéder à la page Facebook'
    }
  }
});

const img = "data:image/svg+xml,%3csvg aria-hidden='true' focusable='false' data-prefix='fab' data-icon='facebook' class='svg-inline--fa fa-facebook fa-w-10' role='img' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 320 512'%3e %3cg color='white'%3e %3cpath fill='currentColor' d='M279.14 288l14.22-92.66h-88.91v-60.13c0-25.35 12.42-50.06 52.24-50.06h40.42V6.26S260.43 0 225.36 0c-73.22 0-121.08 44.38-121.08 124.72v70.62H22.89V288h81.39v224h100.17V288z'%3e %3c/path%3e %3c/g%3e%3c/svg%3e";

/* script */
const __vue_script__$C = script$C;

var __vue_render__$C = function () {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c('MSocialButton', {
    staticClass: "m-social-button-facebook",
    attrs: {
      "src": img,
      "href": _vm.href,
      "title": _vm.title
    }
  });
};

var __vue_staticRenderFns__$C = [];
/* style */

const __vue_inject_styles__$C = undefined;
/* scoped */

const __vue_scope_id__$C = undefined;
/* module identifier */

const __vue_module_identifier__$C = undefined;
/* functional template */

const __vue_is_functional_template__$C = false;
/* style inject */

/* style inject SSR */

/* style inject shadow dom */

const __vue_component__$C = /*#__PURE__*/normalizeComponent({
  render: __vue_render__$C,
  staticRenderFns: __vue_staticRenderFns__$C
}, __vue_inject_styles__$C, __vue_script__$C, __vue_scope_id__$C, __vue_is_functional_template__$C, __vue_module_identifier__$C, false, undefined, undefined, undefined);

var script$D = Vue.extend({
  name: 'MSocialButtonTwitter',
  components: {
    MSocialButton: __vue_component__$B
  },
  props: {
    href: {
      type: String,
      default: 'https://www.twitter.com'
    },
    title: {
      type: String,
      default: 'Accéder à la page Twitter'
    }
  }
});

const img$1 = "data:image/svg+xml,%3csvg aria-hidden='true' focusable='false' data-prefix='fab' data-icon='twitter' class='svg-inline--fa fa-twitter fa-w-16' role='img' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 512 512'%3e %3cg color='white'%3e %3cpath fill='currentColor' d='M459.37 151.716c.325 4.548.325 9.097.325 13.645 0 138.72-105.583 298.558-298.558 298.558-59.452 0-114.68-17.219-161.137-47.106 8.447.974 16.568 1.299 25.34 1.299 49.055 0 94.213-16.568 130.274-44.832-46.132-.975-84.792-31.188-98.112-72.772 6.498.974 12.995 1.624 19.818 1.624 9.421 0 18.843-1.3 27.614-3.573-48.081-9.747-84.143-51.98-84.143-102.985v-1.299c13.969 7.797 30.214 12.67 47.431 13.319-28.264-18.843-46.781-51.005-46.781-87.391 0-19.492 5.197-37.36 14.294-52.954 51.655 63.675 129.3 105.258 216.365 109.807-1.624-7.797-2.599-15.918-2.599-24.04 0-57.828 46.782-104.934 104.934-104.934 30.213 0 57.502 12.67 76.67 33.137 23.715-4.548 46.456-13.32 66.599-25.34-7.798 24.366-24.366 44.833-46.132 57.827 21.117-2.273 41.584-8.122 60.426-16.243-14.292 20.791-32.161 39.308-52.628 54.253z'%3e %3c/path%3e %3c/g%3e%3c/svg%3e";

/* script */
const __vue_script__$D = script$D;

var __vue_render__$D = function () {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c('MSocialButton', {
    staticClass: "m-social-button-twitter",
    attrs: {
      "src": img$1,
      "href": _vm.href,
      "title": _vm.title
    }
  });
};

var __vue_staticRenderFns__$D = [];
/* style */

const __vue_inject_styles__$D = undefined;
/* scoped */

const __vue_scope_id__$D = undefined;
/* module identifier */

const __vue_module_identifier__$D = undefined;
/* functional template */

const __vue_is_functional_template__$D = false;
/* style inject */

/* style inject SSR */

/* style inject shadow dom */

const __vue_component__$D = /*#__PURE__*/normalizeComponent({
  render: __vue_render__$D,
  staticRenderFns: __vue_staticRenderFns__$D
}, __vue_inject_styles__$D, __vue_script__$D, __vue_scope_id__$D, __vue_is_functional_template__$D, __vue_module_identifier__$D, false, undefined, undefined, undefined);

var script$E = Vue.extend({
  name: 'MSocialButtonInstagram',
  components: {
    MSocialButton: __vue_component__$B
  },
  props: {
    href: {
      type: String,
      default: 'https://www.instagram.com'
    },
    title: {
      type: String,
      default: 'Accéder à la page Instagram'
    }
  }
});

const img$2 = "data:image/svg+xml,%3csvg aria-hidden='true' focusable='false' data-prefix='fab' data-icon='instagram' class='svg-inline--fa fa-instagram fa-w-14' role='img' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 448 512'%3e %3cg color='white'%3e %3cpath fill='currentColor' d='M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z'%3e %3c/path%3e %3c/g%3e%3c/svg%3e";

/* script */
const __vue_script__$E = script$E;

var __vue_render__$E = function () {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c('MSocialButton', {
    staticClass: "m-social-button-instagram",
    attrs: {
      "src": img$2,
      "href": _vm.href,
      "title": _vm.title
    }
  });
};

var __vue_staticRenderFns__$E = [];
/* style */

const __vue_inject_styles__$E = undefined;
/* scoped */

const __vue_scope_id__$E = undefined;
/* module identifier */

const __vue_module_identifier__$E = undefined;
/* functional template */

const __vue_is_functional_template__$E = false;
/* style inject */

/* style inject SSR */

/* style inject shadow dom */

const __vue_component__$E = /*#__PURE__*/normalizeComponent({
  render: __vue_render__$E,
  staticRenderFns: __vue_staticRenderFns__$E
}, __vue_inject_styles__$E, __vue_script__$E, __vue_scope_id__$E, __vue_is_functional_template__$E, __vue_module_identifier__$E, false, undefined, undefined, undefined);

var script$F = Vue.extend({
  name: 'MSocialButtonLinkedin',
  components: {
    MSocialButton: __vue_component__$B
  },
  props: {
    href: {
      type: String,
      default: 'https://www.linkedin.com'
    },
    title: {
      type: String,
      default: 'Accéder à la page LinkedIn'
    }
  }
});

const img$3 = "data:image/svg+xml,%3csvg aria-hidden='true' focusable='false' data-prefix='fab' data-icon='linkedin' class='svg-inline--fa fa-linkedin fa-w-14' role='img' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 448 512'%3e %3cg color='white'%3e %3cpath fill='currentColor' d='M100.28 448H7.4V148.9h92.88zM53.79 108.1C24.09 108.1 0 83.5 0 53.8a53.79 53.79 0 0 1 107.58 0c0 29.7-24.1 54.3-53.79 54.3zM447.9 448h-92.68V302.4c0-34.7-.7-79.2-48.29-79.2-48.29 0-55.69 37.7-55.69 76.7V448h-92.78V148.9h89.08v40.8h1.3c12.4-23.5 42.69-48.3 87.88-48.3 94 0 111.28 61.9 111.28 142.3V448z'%3e %3c/path%3e %3c/g%3e%3c/svg%3e";

/* script */
const __vue_script__$F = script$F;

var __vue_render__$F = function () {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c('MSocialButton', {
    staticClass: "m-social-button-linkedin",
    attrs: {
      "src": img$3,
      "href": _vm.href,
      "title": _vm.title
    }
  });
};

var __vue_staticRenderFns__$F = [];
/* style */

const __vue_inject_styles__$F = undefined;
/* scoped */

const __vue_scope_id__$F = undefined;
/* module identifier */

const __vue_module_identifier__$F = undefined;
/* functional template */

const __vue_is_functional_template__$F = false;
/* style inject */

/* style inject SSR */

/* style inject shadow dom */

const __vue_component__$F = /*#__PURE__*/normalizeComponent({
  render: __vue_render__$F,
  staticRenderFns: __vue_staticRenderFns__$F
}, __vue_inject_styles__$F, __vue_script__$F, __vue_scope_id__$F, __vue_is_functional_template__$F, __vue_module_identifier__$F, false, undefined, undefined, undefined);

//
Vue.use(VueTypedJs);
var script$G = {
  name: 'MTyper',
  props: {
    loop: {
      type: Boolean,
      default: true
    },
    backSpeed: {
      type: Number,
      default: 10
    },
    strings: {
      type: Array,
      default: () => []
    }
  }
};

/* script */
const __vue_script__$G = script$G;
/* template */

var __vue_render__$G = function () {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c('vue-typed-js', {
    staticClass: "m-typer",
    attrs: {
      "strings": _vm.strings,
      "loop": _vm.loop,
      "back-speed": _vm.backSpeed
    }
  }, [_c('span', {
    staticClass: "typing"
  })]);
};

var __vue_staticRenderFns__$G = [];
/* style */

const __vue_inject_styles__$G = function (inject) {
  if (!inject) return;
  inject("data-v-191bad6d_0", {
    source: ".typed-element{align-items:center;display:flex}.typed-element .typed-cursor{animation:typerBlink .7s infinite;margin-left:3px;opacity:1;position:relative;top:-1px}@keyframes typerBlink{50%{opacity:0}}",
    map: undefined,
    media: undefined
  });
};
/* scoped */


const __vue_scope_id__$G = undefined;
/* module identifier */

const __vue_module_identifier__$G = undefined;
/* functional template */

const __vue_is_functional_template__$G = false;
/* style inject SSR */

/* style inject shadow dom */

const __vue_component__$G = /*#__PURE__*/normalizeComponent({
  render: __vue_render__$G,
  staticRenderFns: __vue_staticRenderFns__$G
}, __vue_inject_styles__$G, __vue_script__$G, __vue_scope_id__$G, __vue_is_functional_template__$G, __vue_module_identifier__$G, false, createInjector, undefined, undefined);

var script$H = Vue.extend({
  name: 'MLogo',
  components: {
    MScrollToTop: __vue_component__$A
  },
  props: {
    withoutScrollToTop: {
      type: Boolean,
      default: false
    },
    styleScrollToTop: {
      type: String,
      default: 'dark'
    },
    customColsClasses: {
      type: String,
      default: null
    },
    customColClasses: {
      type: String,
      default: null
    }
  },
  computed: {
    computedColsClasses() {
      return this.customColsClasses ? this.customColsClasses : 'default';
    },

    computedColClasses() {
      return this.customColClasses ? this.customColClasses : 'default';
    }

  }
});

/* script */
const __vue_script__$H = script$H;
/* template */

var __vue_render__$H = function () {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c('footer', {
    staticClass: "o-footer"
  }, [!_vm.withoutScrollToTop ? _c('MScrollToTop', {
    attrs: {
      "styles": _vm.styleScrollToTop
    }
  }) : _vm._e(), _vm._v(" "), _c('div', {
    staticClass: "o-footer-cols",
    class: _vm.computedColsClasses
  }, [_c('div', {
    staticClass: "o-footer-col o-footer-col-1",
    class: _vm.computedColClasses
  }, [_vm._t("col-1")], 2), _vm._v(" "), _c('div', {
    staticClass: "o-footer-col o-footer-col-2",
    class: _vm.computedColClasses
  }, [_vm._t("col-2")], 2), _vm._v(" "), _c('div', {
    staticClass: "o-footer-col o-footer-col-3",
    class: _vm.computedColClasses
  }, [_vm._t("col-3")], 2)])], 1);
};

var __vue_staticRenderFns__$H = [];
/* style */

const __vue_inject_styles__$H = function (inject) {
  if (!inject) return;
  inject("data-v-154d05b8_0", {
    source: ".o-footer{animation:1s appear;background-color:#2b2b2b;color:#fff;margin:auto;padding:3rem;transition:all .1s;width:100%}.o-footer .m-scroll-to-top{display:block;margin:auto}.o-footer .o-footer-cols.default{display:flex;flex:1 1 auto;flex-direction:column}@media screen and (min-width:576px){.o-footer .o-footer-cols.default{flex-direction:row}}.o-footer .o-footer-cols>.o-footer-col.default{margin:auto;text-align:center}.o-footer .a-list{flex-wrap:nowrap;justify-content:space-around}",
    map: undefined,
    media: undefined
  });
};
/* scoped */


const __vue_scope_id__$H = undefined;
/* module identifier */

const __vue_module_identifier__$H = undefined;
/* functional template */

const __vue_is_functional_template__$H = false;
/* style inject SSR */

/* style inject shadow dom */

const __vue_component__$H = /*#__PURE__*/normalizeComponent({
  render: __vue_render__$H,
  staticRenderFns: __vue_staticRenderFns__$H
}, __vue_inject_styles__$H, __vue_script__$H, __vue_scope_id__$H, __vue_is_functional_template__$H, __vue_module_identifier__$H, false, createInjector, undefined, undefined);

var script$I = Vue.extend({
  name: 'OHeader',
  components: {
    MLogo: __vue_component__$w,
    MNavbar: __vue_component__$x,
    AHamburger: __vue_component__$2
  },
  props: {
    srcLogo: {
      type: String,
      default: null
    }
  },

  data() {
    return {
      menuIsOpen: false
    };
  },

  methods: {
    toggleMenu() {
      this.menuIsOpen = !this.menuIsOpen;
    }

  }
});

/* script */
const __vue_script__$I = script$I;
/* template */

var __vue_render__$I = function () {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c('header', {
    staticClass: "o-header",
    class: {
      'o-header--is-open': _vm.menuIsOpen
    }
  }, [_c('MLogo', {
    attrs: {
      "src": _vm.srcLogo
    }
  }), _vm._v(" "), _c('MNavbar', {
    staticClass: "m-navbar-desktop",
    on: {
      "click": _vm.toggleMenu
    }
  }, [_vm._t("navBarItems")], 2), _vm._v(" "), _c('AHamburger', {
    staticClass: "o-header-hamburger",
    attrs: {
      "is-open": _vm.menuIsOpen
    },
    on: {
      "click": _vm.toggleMenu
    }
  }), _vm._v(" "), _c('MNavbar', {
    staticClass: "o-header-menu m-navbar-mobile",
    class: {
      'menu-open': _vm.menuIsOpen
    },
    attrs: {
      "horizontal": false
    },
    on: {
      "click": _vm.toggleMenu
    }
  }, [_vm._t("navBarItemsMobile")], 2)], 1);
};

var __vue_staticRenderFns__$I = [];
/* style */

const __vue_inject_styles__$I = function (inject) {
  if (!inject) return;
  inject("data-v-70870302_0", {
    source: ".o-header{align-items:center;display:flex;flex-direction:row;position:relative}.o-header .m-navbar-desktop{display:none}.o-header .m-logo{flex-basis:10%;margin-left:15px}.o-header .m-logo .a-image{width:80px}.o-header .m-navbar{max-width:calc(100vw - 40px);overflow:hidden}.o-header-menu{display:flex;flex-direction:column;left:100%;min-height:100vh;opacity:0;padding-top:5rem;position:absolute;top:0;transition:all .8s ease-in-out;transition-timing-function:cubic-bezier(.37,.96,.22,1.01);visibility:hidden;width:20rem;z-index:1}.o-header-menu.menu-open{opacity:1;right:0}.o-header--is-open .o-header-menu{background-color:#f8f8f8;transform:translate3d(-100%,0,0);visibility:visible}.o-header-hamburger{margin-right:5rem;position:relative;z-index:2}.o-header-hamburger.a-hamburger--is-open{margin-right:15rem;transition:margin cubic-bezier(.37,.96,.22,1.01) ease-in-out}@media screen and (min-width:992px){.o-header .m-logo .a-image{width:120px}.o-header .m-navbar-desktop{display:block}.o-header .m-navbar-mobile,.o-header .o-header-hamburger{display:none}}",
    map: undefined,
    media: undefined
  });
};
/* scoped */


const __vue_scope_id__$I = undefined;
/* module identifier */

const __vue_module_identifier__$I = undefined;
/* functional template */

const __vue_is_functional_template__$I = false;
/* style inject SSR */

/* style inject shadow dom */

const __vue_component__$I = /*#__PURE__*/normalizeComponent({
  render: __vue_render__$I,
  staticRenderFns: __vue_staticRenderFns__$I
}, __vue_inject_styles__$I, __vue_script__$I, __vue_scope_id__$I, __vue_is_functional_template__$I, __vue_module_identifier__$I, false, createInjector, undefined, undefined);

var script$J = Vue.extend({
  name: 'ONewsletterForm',
  components: {
    AInputEmail: __vue_component__$j,
    AImage: __vue_component__$5,
    AHeading: __vue_component__$3,
    AButton: __vue_component__,
    AText: __vue_component__$1
  },
  props: {
    withoutImage: {
      type: Boolean,
      default: false
    },
    withoutTitle: {
      type: Boolean,
      default: false
    }
  },

  data() {
    return {
      heading: "Cassez les codes de la compta avec nous",
      text: "Inscrivez-vous à la newsletter et recevez nos offres d’emploi et actus 💪"
    };
  }

});

/* script */
const __vue_script__$J = script$J;
/* template */

var __vue_render__$J = function () {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c('div', {
    staticClass: "o-form-newsletter"
  }, [_c('AHeading', {
    class: {
      'without-title': _vm.withoutTitle
    },
    attrs: {
      "level": "2",
      "align": "center"
    }
  }, [_vm._v(" " + _vm._s(_vm.heading))]), _vm._v(" "), _c('div', {
    staticClass: "newletter-2-col row"
  }, [_c('AImage', {
    class: {
      'without-image': _vm.withoutImage
    }
  }), _vm._v(" "), _c('div', {
    staticClass: "newsletter-content"
  }, [_c('AText', {
    attrs: {
      "align": _vm.left
    }
  }, [_vm._v(_vm._s(_vm.text))]), _vm._v(" "), _c('div', {
    staticClass: "newsletter-form"
  }, [_c('AInputEmail', {
    attrs: {
      "verif-validity": ""
    }
  }), _vm._v(" "), _c('AButton', {
    attrs: {
      "type": "submit"
    }
  }, [_vm._v("Envoyer")])], 1)], 1)], 1)], 1);
};

var __vue_staticRenderFns__$J = [];
/* style */

const __vue_inject_styles__$J = function (inject) {
  if (!inject) return;
  inject("data-v-0da4cf90_0", {
    source: ".o-form-newsletter{display:block}.o-form-newsletter .row{display:flex;flex-direction:row;flex-wrap:wrap;margin:auto}.o-form-newsletter .a-image{margin:auto}.o-form-newsletter .a-image.without-image{display:none}.o-form-newsletter .newsletter-content{margin:auto;padding-left:15px}.o-form-newsletter .a-button{margin-left:10px}.o-form-newsletter .a-heading.without-title{display:none}",
    map: undefined,
    media: undefined
  });
};
/* scoped */


const __vue_scope_id__$J = undefined;
/* module identifier */

const __vue_module_identifier__$J = undefined;
/* functional template */

const __vue_is_functional_template__$J = false;
/* style inject SSR */

/* style inject shadow dom */

const __vue_component__$J = /*#__PURE__*/normalizeComponent({
  render: __vue_render__$J,
  staticRenderFns: __vue_staticRenderFns__$J
}, __vue_inject_styles__$J, __vue_script__$J, __vue_scope_id__$J, __vue_is_functional_template__$J, __vue_module_identifier__$J, false, createInjector, undefined, undefined);

var script$K = Vue.extend({
  name: 'OPartners',
  components: {
    AList: __vue_component__$7
  },
  props: {
    horizontal: {
      type: Boolean,
      default: true
    }
  }
});

/* script */
const __vue_script__$K = script$K;
/* template */

var __vue_render__$K = function () {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c('div', {
    staticClass: "o-partners"
  }, [_c('AList', {
    attrs: {
      "horizontal": _vm.horizontal,
      "without-chips": ""
    }
  }, [_vm._t("default")], 2)], 1);
};

var __vue_staticRenderFns__$K = [];
/* style */

const __vue_inject_styles__$K = function (inject) {
  if (!inject) return;
  inject("data-v-47fdbc38_0", {
    source: ".o-partners{display:flex;flex-direction:row;flex-wrap:wrap}.o-partners .a-list{flex-basis:auto}.o-partners .a-list .a-list-item{box-shadow:0 3px 6px 0 rgba(140,152,164,.25);height:100%;padding:1rem;vertical-align:middle;width:100%}.o-partners .a-list .a-list-item .img-partner{height:210px;width:290px}",
    map: undefined,
    media: undefined
  });
};
/* scoped */


const __vue_scope_id__$K = undefined;
/* module identifier */

const __vue_module_identifier__$K = undefined;
/* functional template */

const __vue_is_functional_template__$K = false;
/* style inject SSR */

/* style inject shadow dom */

const __vue_component__$K = /*#__PURE__*/normalizeComponent({
  render: __vue_render__$K,
  staticRenderFns: __vue_staticRenderFns__$K
}, __vue_inject_styles__$K, __vue_script__$K, __vue_scope_id__$K, __vue_is_functional_template__$K, __vue_module_identifier__$K, false, createInjector, undefined, undefined);

/* eslint-disable import/prefer-default-export */

var components = /*#__PURE__*/Object.freeze({
    __proto__: null,
    AButton: __vue_component__,
    AHamburger: __vue_component__$2,
    AHeading: __vue_component__$3,
    AIcon: __vue_component__$4,
    AImage: __vue_component__$5,
    ALink: __vue_component__$6,
    AList: __vue_component__$7,
    AListItem: __vue_component__$8,
    AText: __vue_component__$1,
    AFormGroup: __vue_component__$a,
    ALabel: __vue_component__$9,
    ASelect: __vue_component__$b,
    ASelectPlus: __vue_component__$c,
    ASelectPlusImage: __vue_component__$d,
    ATextarea: __vue_component__$e,
    AInputGroup: __vue_component__$f,
    AInputCheckbox: __vue_component__$h,
    AInputDate: __vue_component__$i,
    AInputEmail: __vue_component__$j,
    AInputNumber: __vue_component__$k,
    AInputFile: __vue_component__$l,
    AInputHidden: __vue_component__$m,
    AInputPassword: __vue_component__$n,
    AInputRadio: __vue_component__$o,
    AInputSearch: __vue_component__$p,
    AInputTel: __vue_component__$q,
    AInputText: __vue_component__$r,
    AInputUrl: __vue_component__$s,
    MBadge: __vue_component__$t,
    MCard: __vue_component__$u,
    MCarousel: __vue_component__$v,
    MLogo: __vue_component__$w,
    MNavbar: __vue_component__$x,
    MNavItem: __vue_component__$y,
    MPartner: __vue_component__$z,
    MScrollToTop: __vue_component__$A,
    MSocialButton: __vue_component__$B,
    MSocialButtonFacebook: __vue_component__$C,
    MSocialButtonTwitter: __vue_component__$D,
    MSocialButtonInstagram: __vue_component__$E,
    MSocialButtonLinkedin: __vue_component__$F,
    MTyper: __vue_component__$G,
    OFooter: __vue_component__$H,
    OHeader: __vue_component__$I,
    ONewsletterForm: __vue_component__$J,
    OPartners: __vue_component__$K
});

// Import vue components
// eslint-disable-next-line @typescript-eslint/no-explicit-any

// install function executed by Vue.use()
const install = function installLamatomic(Vue) {
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
export { __vue_component__ as AButton, __vue_component__$a as AFormGroup, __vue_component__$2 as AHamburger, __vue_component__$3 as AHeading, __vue_component__$4 as AIcon, __vue_component__$5 as AImage, __vue_component__$h as AInputCheckbox, __vue_component__$i as AInputDate, __vue_component__$j as AInputEmail, __vue_component__$l as AInputFile, __vue_component__$f as AInputGroup, __vue_component__$m as AInputHidden, __vue_component__$k as AInputNumber, __vue_component__$n as AInputPassword, __vue_component__$o as AInputRadio, __vue_component__$p as AInputSearch, __vue_component__$q as AInputTel, __vue_component__$r as AInputText, __vue_component__$s as AInputUrl, __vue_component__$9 as ALabel, __vue_component__$6 as ALink, __vue_component__$7 as AList, __vue_component__$8 as AListItem, __vue_component__$b as ASelect, __vue_component__$c as ASelectPlus, __vue_component__$d as ASelectPlusImage, __vue_component__$1 as AText, __vue_component__$e as ATextarea, __vue_component__$t as MBadge, __vue_component__$u as MCard, __vue_component__$v as MCarousel, __vue_component__$w as MLogo, __vue_component__$y as MNavItem, __vue_component__$x as MNavbar, __vue_component__$z as MPartner, __vue_component__$A as MScrollToTop, __vue_component__$B as MSocialButton, __vue_component__$C as MSocialButtonFacebook, __vue_component__$E as MSocialButtonInstagram, __vue_component__$F as MSocialButtonLinkedin, __vue_component__$D as MSocialButtonTwitter, __vue_component__$G as MTyper, __vue_component__$H as OFooter, __vue_component__$I as OHeader, __vue_component__$J as ONewsletterForm, __vue_component__$K as OPartners };

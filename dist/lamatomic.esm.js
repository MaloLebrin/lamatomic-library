import Vue from 'vue';
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

    /** "styles" prop - dark or light */
    styles: {
      type: String,
      default: null,
      required: false,

      validator(value) {
        return ['light', 'dark'].includes(value);
      }

    },

    /** Disabled mode */
    disabled: {
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

      if (this.type === 'submit') {
        title = 'Envoyer le formulaire';
      }

      return title;
    },

    tag() {
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
    staticClass: "button",
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
  inject("data-v-06b1c8f6_0", {
    source: ".button,button{margin:auto;font-weight:500;font-size:1.2rem;text-transform:none;text-decoration:none;letter-spacing:1.5px;fill:#fff;color:#fff;background-color:#009cde;border:2px solid #009cde;border-radius:5px;padding:10px 30px 10px 30px;cursor:pointer;transition:.3s all ease;animation:1s appear}.button.success,button.success{background-color:#3ac47d;border-color:#3ac47d}.button.success:focus,.button.success:hover,button.success:focus,button.success:hover{color:#3ac47d}.button.error,button.error{background-color:#d92550;border-color:#d92550}.button.error:focus,.button.error:hover,button.error:focus,button.error:hover{color:#d92550}.button.warning,button.warning{background-color:#ffce00;border-color:#ffce00}.button.warning:focus,.button.warning:hover,button.warning:focus,button.warning:hover{color:#ffce00}.button.light,button.light{background-color:#fff;color:#009cde;border-color:#fff}.button.light:focus,.button.light:hover,button.light:focus,button.light:hover{background-color:#009cde;color:#fff}.button.dark,button.dark{background-color:#2b2b2b;color:#fff;border-color:#2b2b2b}.button.dark:focus,.button.dark:hover,button.dark:focus,button.dark:hover{background-color:#fff;color:#2b2b2b}.button.color-black,button.color-black{color:#2b2b2b}.button.color-black:focus,.button.color-black:hover,button.color-black:focus,button.color-black:hover{background-color:#2b2b2b;color:#fff}.button.color-white,button.color-white{color:#fff}.button.no-border,button.no-border{border:none}.button.border-black,button.border-black{border:solid 1px #2b2b2b}.button:focus,.button:hover,button:focus,button:hover{background-color:#fff;color:#009cde;text-decoration:none}.button.bg-dark-grey,button.bg-dark-grey{border:none}.button.disabled,.button.disabled:focus,.button.disabled:hover,button.disabled,button.disabled:focus,button.disabled:hover{display:inline-block;color:#e1e1e1;cursor:not-allowed;text-decoration:none;background-color:#929292;border-color:#929292}",
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
  name: 'AHeading',
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

      default: 2
    }
  },
  computed: {
    tag() {
      return 'h' + this.level;
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

  return _c(_vm.tag, {
    tag: "component",
    staticClass: "heading",
    class: _vm.tag,
    attrs: {
      "id": _vm.id
    }
  }, [_vm._t("default")], 2);
};

var __vue_staticRenderFns__$1 = [];
/* style */

const __vue_inject_styles__$1 = function (inject) {
  if (!inject) return;
  inject("data-v-bb55fb0a_0", {
    source: ".heading.h1{font-size:2.8rem;font-weight:500;text-transform:none;line-height:1.4em;letter-spacing:.125rem}.heading.h2{font-size:1.8rem;padding-left:20px}.heading.h3{font-size:1.5rem;padding-left:40px}.heading.h4{font-size:1.2rem;padding-left:60px}.heading.h5{font-size:1rem}.heading.h6{font-size:.8rem;font-weight:900}@media screen and (min-width:1200px){.heading.h1{font-size:3.5rem}.heading.h2{font-size:2rem;padding-left:20px}.heading.h3{font-size:2rem;padding-left:40px}.heading.h4{font-size:2rem;padding-left:60px}.heading.h5{font-size:2rem}.heading.h6{font-size:2rem;font-weight:900}}",
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
  name: 'AImage',
  props: {
    src: {
      type: String,
      default: null
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
const __vue_script__$2 = script$2;
/* template */

var __vue_render__$2 = function () {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c('img', {
    staticClass: "image",
    attrs: {
      "src": _vm.src,
      "alt": _vm.alt,
      "title": _vm.title
    }
  });
};

var __vue_staticRenderFns__$2 = [];
/* style */

const __vue_inject_styles__$2 = function (inject) {
  if (!inject) return;
  inject("data-v-3039cd53_0", {
    source: ".image{text-decoration:none;animation:1s appear}",
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
const __vue_script__$3 = script$3;
/* template */

var __vue_render__$3 = function () {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c('a', {
    staticClass: "link",
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
      "tel": _vm.tel,
      "mail": _vm.mail,
      "rel": _vm.rel,
      "external": _vm.external,
      "no-line": _vm.noLine
    }
  }, [_vm._t("default")], 2);
};

var __vue_staticRenderFns__$3 = [];
/* style */

const __vue_inject_styles__$3 = function (inject) {
  if (!inject) return;
  inject("data-v-76ae986b_0", {
    source: ".link{color:#009cde;font-weight:700;text-decoration:none;cursor:pointer;animation:1s appear}.link.underlined{text-decoration:none;background-image:linear-gradient(to right,#ffce00 0,#ffce00 100%);background-position:0 1.2em;background-size:0 100%;background-repeat:no-repeat;transition:background .5s}.link.underlined:focus,.link.underlined:hover{background-size:100% 100%}.link.underlined--thin{background-image:linear-gradient(to right,#009cde 0,#009cde 100%);padding-bottom:4px}.link.underlined--thick{background-position:0 -.1em}.link.underlined--offset{background-position:0 .2em;box-shadow:inset 0 -.5em 0 0 #fff}.link.underlined--gradient{background-position:0 -.1em;background-image:linear-gradient(to right,#ffce00 0,#002252 100%)}.link.underlined--reverse{background-position:100% -.1em;transition:background 1s;background-image:linear-gradient(to right,#ffce00 0,#ffce00 100%)}",
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
  name: 'AList',
  props: {
    type: {
      type: String,
      default: 'ul'
    },
    items: {
      type: Array,
      default: () => []
    },
    withoutChips: {
      type: Boolean,
      default: true
    },
    horizontal: {
      type: Boolean,
      default: false
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

  return _c(_vm.type, {
    tag: "component",
    class: {
      list: 1,
      withoutChips: _vm.withoutChips,
      horizontal: _vm.horizontal
    }
  }, _vm._l(_vm.items, function (item) {
    return _c('li', {
      key: item
    }, [_vm._v(_vm._s(item))]);
  }), 0);
};

var __vue_staticRenderFns__$4 = [];
/* style */

const __vue_inject_styles__$4 = function (inject) {
  if (!inject) return;
  inject("data-v-3d1575bc_0", {
    source: ".list{padding-left:2rem}.list:not(.withoutChips){list-style:none}.list.horizontal{display:flex;flex-wrap:wrap}.list.horizontal li{margin:2rem}.list.horizontal:last-child{margin-right:0}",
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
  name: 'MLogo'
});

const img = "data:image/svg+xml,%3c%3fxml version='1.0' encoding='UTF-8'%3f%3e%3csvg id='Calque_1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' x='0px' y='0px' viewBox='0 0 815.8 656.3' style='enable-background:new 0 0 815.8 656.3%3b' xml:space='preserve' class='logo-lamacompta'%3e %3cstyle type='text/css'%3e .st0 %7b fill: none%3b %7d .st1 %7b fill: white%3b %7d .st2 %7b fill: %23009cde%3b %7d .st3 %7b fill: %23c8e2e8%3b %7d .st4 %7b display: none%3b fill: white%3b %7d .st5 %7b fill: url(%23SVGID_1_)%3b %7d .st6 %7b fill: url(%23SVGID_2_)%3b %7d .st7 %7b fill: url(%23SVGID_3_)%3b %7d .st8 %7b display: none%3b %7d .st9 %7b display: inline%3b fill: %23e8f6f9%3b %7d .st10 %7b display: inline%3b fill: %23b0b2bf%3b %7d .st11 %7b display: inline%3b fill: %23d8ecf3%3b %7d .st12 %7b display: inline%3b fill: %23d9ecf3%3b %7d .st13 %7b display: inline%3b opacity: 9e-2%3b fill: %23636363%3b %7d .st14 %7b display: inline%3b fill: white%3b stroke: black%3b stroke-miterlimit: 10%3b %7d .st15 %7b display: inline%3b fill: %23aae4e5%3b %7d .st16 %7b display: inline%3b fill: %238cd0d6%3b %7d .st17 %7b display: inline%3b opacity: 0.1%3b fill: %236d6d6d%3b %7d .st18 %7b display: inline%3b %7d .st19 %7b fill: none%3b stroke: %236d6d6d%3b stroke-miterlimit: 10%3b %7d .st20 %7b fill: none%3b stroke: %236d6d6d%3b stroke-miterlimit: 10%3b stroke-dasharray: 5.9969%2c 5.9969%3b %7d .st21 %7b display: inline%3b fill: none%3b stroke: %236d6d6d%3b stroke-miterlimit: 10%3b stroke-dasharray: 6%3b %7d %3c/style%3e %3cpattern id='Nouvelle_nuance_de_motif_3' x='-1062.7' y='500.2' width='80.7' height='102.7' patternUnits='userSpaceOnUse' viewBox='0 -102.7 80.7 102.7' style='overflow:visible%3b' %3e %3cg%3e %3crect x='0' y='-102.7' class='st0' width='80.7' height='102.7' /%3e %3cg id='Lama_6_'%3e %3cpath class='st1' d='M29-75c0.6%2c1.2%2c1%2c2.8%2c1%2c4.5c0%2c2.4-0.7%2c4.6-1.9%2c5.8v4.4c0%2c1.3-1%2c2.3-2.3%2c2.3h-0.5c-1.3%2c0-2.3-1-2.3-2.3v-4.4 c-0.1-0.1-0.3-0.3-0.4-0.5c-0.1%2c0.2-0.2%2c0.3-0.4%2c0.5v4.4c0%2c1.3-1%2c2.3-2.3%2c2.3h-0.5c-1.3%2c0-2.3-1-2.3-2.3v-4.4 c-0.6-0.7-1.1-1.5-1.4-2.6h-0.1c-0.3%2c1-0.8%2c1.9-1.4%2c2.6v4.4c0%2c1.3-1%2c2.3-2.3%2c2.3h-0.5c-1.3%2c0-2.3-1-2.3-2.3v-4.4 C9.2-64.7%2c9.1-64.8%2c9-65c-0.1%2c0.1-0.2%2c0.3-0.3%2c0.4v4.4c0%2c1.3-1%2c2.3-2.3%2c2.3H5.9c-1.3%2c0-2.3-1-2.3-2.3v-4.4 c-1.2-1.3-1.9-3.4-1.9-5.8c-1-0.6-1.7-1.7-1.7-3c0-0.8%2c0.3-1.6%2c0.8-2.2C0.3-76.2%2c0-76.9%2c0-77.7c0-1.1%2c0.5-2.1%2c1.4-2.8 C1.2-81%2c1.1-81.5%2c1.1-82c0-0.7%2c0.2-1.4%2c0.6-2c-0.4-0.6-0.6-1.2-0.6-2c0-0.8%2c0.2-1.5%2c0.7-2.1c-1-1.1-1.5-2.5-1.5-3.9 c0-1.3%2c0.4-2.5%2c1.1-3.5c-0.2-0.7-0.2-1.4-0.2-2.2c0-2.5%2c0.9-5.1%2c2.8-5.1c1.7%2c0%2c2.6%2c2.2%2c2.8%2c4.4c0.2%2c0%2c0.3%2c0%2c0.5%2c0 c0.2%2c0%2c0.3%2c0%2c0.5%2c0c0.2-2.2%2c1-4.4%2c2.8-4.4c1.9%2c0%2c2.8%2c2.7%2c2.8%2c5.1c0%2c0.7-0.1%2c1.5-0.2%2c2.2c0.7%2c1%2c1.1%2c2.2%2c1.1%2c3.5 c0%2c1.3-0.4%2c2.5-1.1%2c3.5c0.7%2c0.6%2c1.1%2c1.6%2c1.1%2c2.5c0%2c0.7-0.2%2c1.4-0.6%2c2c0.4%2c0.6%2c0.6%2c1.2%2c0.6%2c2c0%2c0.3%2c0%2c0.6-0.1%2c0.8h7.9 c1.2%2c0%2c2.3%2c0.3%2c3.2%2c0.9c0.7-0.5%2c1.6-0.8%2c2.5-0.8c2.1%2c0%2c3.8%2c1.4%2c3.8%2c3.1C31.4-76.6%2c30.4-75.4%2c29-75z M9.8-97.8 c0.5%2c0.2%2c0.9%2c0.4%2c1.4%2c0.7c0-0.1%2c0-0.3%2c0-0.4c0-1.6-0.4-2.6-0.7-2.9C10.2-100.2%2c9.8-99.2%2c9.8-97.8z M3.3-97.5c0%2c0.1%2c0%2c0.3%2c0%2c0.4 c0.4-0.3%2c0.9-0.5%2c1.4-0.7c0-1.4-0.4-2.4-0.7-2.7C3.7-100.2%2c3.3-99.1%2c3.3-97.5z M7.4-66.3H6.9c-0.8%2c0-1.6-0.2-2.3-0.6 c0.2%2c0.5%2c0.5%2c0.9%2c0.8%2c1.1l0.4%2c0.3v5.3c0%2c0.1%2c0.1%2c0.2%2c0.2%2c0.2h0.5c0.1%2c0%2c0.2-0.1%2c0.2-0.2v-5.3l0.4-0.3C7.1-66%2c7.2-66.1%2c7.4-66.3z M21.5-67.2h-3.4c0.3%2c0.6%2c0.6%2c1%2c0.9%2c1.3l0.4%2c0.3v5.3c0%2c0.1%2c0.1%2c0.2%2c0.2%2c0.2H20c0.1%2c0%2c0.2-0.1%2c0.2-0.2v-5.3l0.4-0.3 C20.9-66.1%2c21.2-66.6%2c21.5-67.2z M27.9-70.4c0-2.5-0.9-4.2-1.8-4.8c-0.2-0.2-0.4-0.4-0.5-0.7c-0.3-1.8-1.9-3.1-3.8-3.1h-9.7 c-0.4%2c0-0.8-0.3-1-0.7c-0.2-0.4%2c0-0.9%2c0.3-1.2c0.3-0.3%2c0.5-0.7%2c0.5-1.1c0-0.4-0.2-0.8-0.6-1.1c-0.3-0.2-0.4-0.5-0.4-0.8 c0-0.3%2c0.2-0.6%2c0.4-0.8c0.4-0.3%2c0.6-0.7%2c0.6-1.1c0-0.6-0.4-1.1-0.9-1.3c-0.3-0.1-0.6-0.4-0.7-0.8c-0.1-0.4%2c0-0.7%2c0.3-1 c0.9-0.8%2c1.3-1.8%2c1.3-2.9c0-2.3-2.2-4.3-4.8-4.3c-2.7%2c0-4.8%2c1.9-4.8%2c4.3c0%2c1.2%2c0.6%2c2.3%2c1.6%2c3.1c0.3%2c0.2%2c0.4%2c0.5%2c0.4%2c0.9 c0%2c0.3-0.2%2c0.6-0.5%2c0.8c-0.4%2c0.3-0.7%2c0.7-0.7%2c1.2c0%2c0.4%2c0.2%2c0.8%2c0.6%2c1.1c0.3%2c0.2%2c0.4%2c0.5%2c0.4%2c0.8c0%2c0.3-0.2%2c0.6-0.4%2c0.8 c-0.4%2c0.3-0.6%2c0.7-0.6%2c1.1c0%2c0.4%2c0.2%2c0.8%2c0.5%2c1C4-80.7%2c4.1-80.3%2c4-79.9c-0.1%2c0.4-0.4%2c0.7-0.8%2c0.8c-0.6%2c0.1-1.1%2c0.7-1.1%2c1.4 c0%2c0.5%2c0.3%2c1%2c0.7%2c1.2c0.3%2c0.2%2c0.6%2c0.5%2c0.6%2c0.9c0%2c0.4-0.2%2c0.8-0.6%2c0.9c-0.5%2c0.2-0.7%2c0.7-0.7%2c1.2c0%2c0.7%2c0.6%2c1.3%2c1.3%2c1.4 c0.5%2c0%2c1%2c0.5%2c1%2c1.1c0%2c0.7%2c0.3%2c1.3%2c0.7%2c1.8c0.5%2c0.5%2c1.1%2c0.7%2c1.8%2c0.7h2.1c0.5%2c0%2c0.9%2c0.3%2c1%2c0.7c0.3%2c0.8%2c0.7%2c1.5%2c1.1%2c1.9 c0.2%2c0.2%2c0.4%2c0.5%2c0.4%2c0.8v4.8c0%2c0.1%2c0.1%2c0.2%2c0.2%2c0.2h0.5c0.1%2c0%2c0.2-0.1%2c0.2-0.2V-65c0-0.3%2c0.1-0.6%2c0.4-0.8 c0.6-0.5%2c1.1-1.5%2c1.3-2.6c0.1-0.5%2c0.5-0.8%2c1-0.8h7.5c0.5%2c0%2c0.9%2c0.3%2c1%2c0.8c0.3%2c1.2%2c0.7%2c2.1%2c1.3%2c2.6c0.2%2c0.2%2c0.4%2c0.5%2c0.4%2c0.8v4.8 c0%2c0.1%2c0.1%2c0.2%2c0.2%2c0.2h0.5c0.1%2c0%2c0.2-0.1%2c0.2-0.2V-65c0-0.3%2c0.1-0.6%2c0.4-0.8C27.1-66.5%2c27.9-68.2%2c27.9-70.4z M29.3-77.9 c0-0.5-0.7-1-1.7-1c-0.4%2c0-0.7%2c0.1-1%2c0.2c0.4%2c0.6%2c0.7%2c1.2%2c0.9%2c1.9h0C28.6-76.9%2c29.3-77.4%2c29.3-77.9z' /%3e %3cpath class='st1' d='M5-94.3c-0.5%2c0-0.9%2c0.4-0.9%2c0.9c0%2c0.5%2c0.4%2c0.9%2c0.9%2c0.9s0.9-0.4%2c0.9-0.9C5.9-93.9%2c5.5-94.3%2c5-94.3z' /%3e %3cpath class='st1' d='M9.5-94.3c-0.5%2c0-0.9%2c0.4-0.9%2c0.9c0%2c0.5%2c0.4%2c0.9%2c0.9%2c0.9c0.5%2c0%2c0.9-0.4%2c0.9-0.9C10.4-93.9%2c10-94.3%2c9.5-94.3z ' /%3e %3cpath class='st1' d='M6.8-91.7h1c0.4%2c0%2c0.8%2c0.3%2c0.8%2c0.8c0%2c0.3-0.2%2c0.6-0.5%2c0.7c0.1%2c0.3%2c0.4%2c0.6%2c0.7%2c0.6c0.4%2c0%2c0.8%2c0.3%2c0.8%2c0.8 c0%2c0.4-0.3%2c0.8-0.8%2c0.8c-0.6%2c0-1.1-0.2-1.5-0.6c-0.4%2c0.4-0.9%2c0.6-1.5%2c0.6C5.4-88.2%2c5-88.5%2c5-89c0-0.4%2c0.3-0.8%2c0.8-0.8 c0.4%2c0%2c0.6-0.2%2c0.7-0.6C6.2-90.4%2c6-90.7%2c6-91C6-91.4%2c6.4-91.7%2c6.8-91.7z' /%3e %3c/g%3e %3cg id='Lama_5_'%3e %3cpath class='st1' d='M78.3-17c0.6%2c1.2%2c1%2c2.8%2c1%2c4.5c0%2c2.4-0.7%2c4.6-1.9%2c5.8v4.4c0%2c1.3-1%2c2.3-2.3%2c2.3h-0.5c-1.3%2c0-2.3-1-2.3-2.3 v-4.4c-0.1-0.1-0.3-0.3-0.4-0.5c-0.1%2c0.2-0.2%2c0.3-0.4%2c0.5v4.4c0%2c1.3-1%2c2.3-2.3%2c2.3h-0.5c-1.3%2c0-2.3-1-2.3-2.3v-4.4 c-0.6-0.7-1.1-1.5-1.4-2.6H65c-0.3%2c1-0.8%2c1.9-1.4%2c2.6v4.4c0%2c1.3-1%2c2.3-2.3%2c2.3h-0.5c-1.3%2c0-2.3-1-2.3-2.3v-4.4 c-0.1-0.1-0.2-0.2-0.3-0.4c-0.1%2c0.1-0.2%2c0.3-0.3%2c0.4v4.4c0%2c1.3-1%2c2.3-2.3%2c2.3h-0.5c-1.3%2c0-2.3-1-2.3-2.3v-4.4 c-1.2-1.3-1.9-3.4-1.9-5.8c-1-0.6-1.7-1.7-1.7-3c0-0.8%2c0.3-1.6%2c0.8-2.2c-0.5-0.6-0.8-1.4-0.8-2.2c0-1.1%2c0.5-2.1%2c1.4-2.8 c-0.2-0.4-0.3-0.9-0.3-1.4c0-0.7%2c0.2-1.4%2c0.6-2c-0.4-0.6-0.6-1.2-0.6-2c0-0.8%2c0.2-1.5%2c0.7-2.1c-1-1.1-1.5-2.5-1.5-3.9 c0-1.3%2c0.4-2.5%2c1.1-3.5c-0.2-0.7-0.2-1.4-0.2-2.2c0-2.5%2c0.9-5.1%2c2.8-5.1c1.7%2c0%2c2.6%2c2.2%2c2.8%2c4.4c0.2%2c0%2c0.3%2c0%2c0.5%2c0 c0.2%2c0%2c0.3%2c0%2c0.5%2c0c0.2-2.2%2c1-4.4%2c2.8-4.4c1.9%2c0%2c2.8%2c2.7%2c2.8%2c5.1c0%2c0.7-0.1%2c1.5-0.2%2c2.2c0.7%2c1%2c1.1%2c2.2%2c1.1%2c3.5 c0%2c1.3-0.4%2c2.5-1.1%2c3.5c0.7%2c0.6%2c1.1%2c1.6%2c1.1%2c2.5c0%2c0.7-0.2%2c1.4-0.6%2c2c0.4%2c0.6%2c0.6%2c1.2%2c0.6%2c2c0%2c0.3%2c0%2c0.6-0.1%2c0.8h7.9 c1.2%2c0%2c2.3%2c0.3%2c3.2%2c0.9c0.7-0.5%2c1.6-0.8%2c2.5-0.8c2.1%2c0%2c3.8%2c1.4%2c3.8%2c3.1C80.7-18.6%2c79.7-17.5%2c78.3-17z M59.1-39.9 c0.5%2c0.2%2c0.9%2c0.4%2c1.4%2c0.7c0-0.1%2c0-0.3%2c0-0.4c0-1.6-0.4-2.6-0.7-2.9C59.5-42.2%2c59.1-41.3%2c59.1-39.9z M52.6-39.6c0%2c0.1%2c0%2c0.3%2c0%2c0.4 c0.4-0.3%2c0.9-0.5%2c1.4-0.7c0-1.4-0.4-2.4-0.7-2.7C53-42.2%2c52.6-41.2%2c52.6-39.6z M56.6-8.4h-0.5c-0.8%2c0-1.6-0.2-2.3-0.6 c0.2%2c0.5%2c0.5%2c0.9%2c0.8%2c1.1L55-7.6v5.3c0%2c0.1%2c0.1%2c0.2%2c0.2%2c0.2h0.5c0.1%2c0%2c0.2-0.1%2c0.2-0.2v-5.3l0.4-0.3C56.4-8%2c56.5-8.2%2c56.6-8.4z M70.7-9.2h-3.4c0.3%2c0.6%2c0.6%2c1%2c0.9%2c1.3l0.4%2c0.3v5.3c0%2c0.1%2c0.1%2c0.2%2c0.2%2c0.2h0.5c0.1%2c0%2c0.2-0.1%2c0.2-0.2v-5.3l0.4-0.3 C70.2-8.2%2c70.5-8.6%2c70.7-9.2z M77.2-12.5c0-2.5-0.9-4.2-1.8-4.8c-0.2-0.2-0.4-0.4-0.5-0.7c-0.3-1.8-1.9-3.1-3.8-3.1h-9.7 c-0.4%2c0-0.8-0.3-1-0.7c-0.2-0.4%2c0-0.9%2c0.3-1.2c0.3-0.3%2c0.5-0.7%2c0.5-1.1c0-0.4-0.2-0.8-0.6-1.1c-0.3-0.2-0.4-0.5-0.4-0.8 s0.2-0.6%2c0.4-0.8c0.4-0.3%2c0.6-0.7%2c0.6-1.1c0-0.6-0.4-1.1-0.9-1.3c-0.3-0.1-0.6-0.4-0.7-0.8c-0.1-0.4%2c0-0.7%2c0.3-1 c0.9-0.8%2c1.3-1.8%2c1.3-2.9c0-2.3-2.2-4.3-4.8-4.3c-2.7%2c0-4.8%2c1.9-4.8%2c4.3c0%2c1.2%2c0.6%2c2.3%2c1.6%2c3.1c0.3%2c0.2%2c0.4%2c0.5%2c0.4%2c0.9 c0%2c0.3-0.2%2c0.6-0.5%2c0.8c-0.4%2c0.3-0.7%2c0.7-0.7%2c1.2c0%2c0.4%2c0.2%2c0.8%2c0.6%2c1.1c0.3%2c0.2%2c0.4%2c0.5%2c0.4%2c0.8s-0.2%2c0.6-0.4%2c0.8 c-0.4%2c0.3-0.6%2c0.7-0.6%2c1.1c0%2c0.4%2c0.2%2c0.8%2c0.5%2c1c0.3%2c0.3%2c0.4%2c0.7%2c0.3%2c1.1c-0.1%2c0.4-0.4%2c0.7-0.8%2c0.8c-0.6%2c0.1-1.1%2c0.7-1.1%2c1.4 c0%2c0.5%2c0.3%2c1%2c0.7%2c1.2c0.3%2c0.2%2c0.6%2c0.5%2c0.6%2c0.9c0%2c0.4-0.2%2c0.8-0.6%2c0.9c-0.5%2c0.2-0.7%2c0.7-0.7%2c1.2c0%2c0.7%2c0.6%2c1.3%2c1.3%2c1.4 c0.5%2c0%2c1%2c0.5%2c1%2c1.1c0%2c0.7%2c0.3%2c1.3%2c0.7%2c1.8c0.5%2c0.5%2c1.1%2c0.7%2c1.8%2c0.7h2.1c0.5%2c0%2c0.9%2c0.3%2c1%2c0.7c0.3%2c0.8%2c0.7%2c1.5%2c1.1%2c1.9 c0.2%2c0.2%2c0.4%2c0.5%2c0.4%2c0.8v4.8c0%2c0.1%2c0.1%2c0.2%2c0.2%2c0.2h0.5c0.1%2c0%2c0.2-0.1%2c0.2-0.2v-4.8c0-0.3%2c0.1-0.6%2c0.4-0.8 c0.6-0.5%2c1.1-1.5%2c1.3-2.6c0.1-0.5%2c0.5-0.8%2c1-0.8h7.5c0.5%2c0%2c0.9%2c0.3%2c1%2c0.8c0.3%2c1.2%2c0.7%2c2.1%2c1.3%2c2.6c0.2%2c0.2%2c0.4%2c0.5%2c0.4%2c0.8v4.8 c0%2c0.1%2c0.1%2c0.2%2c0.2%2c0.2h0.5c0.1%2c0%2c0.2-0.1%2c0.2-0.2v-4.8c0-0.3%2c0.1-0.6%2c0.4-0.8C76.4-8.5%2c77.2-10.2%2c77.2-12.5z M78.6-19.9 c0-0.5-0.7-1-1.7-1c-0.4%2c0-0.7%2c0.1-1%2c0.2c0.4%2c0.6%2c0.7%2c1.2%2c0.9%2c1.9h0C77.9-18.9%2c78.6-19.4%2c78.6-19.9z' /%3e %3cpath class='st1' d='M54.2-36.3c-0.5%2c0-0.9%2c0.4-0.9%2c0.9c0%2c0.5%2c0.4%2c0.9%2c0.9%2c0.9c0.5%2c0%2c0.9-0.4%2c0.9-0.9 C55.1-35.9%2c54.7-36.3%2c54.2-36.3z' /%3e %3cpath class='st1' d='M58.7-36.3c-0.5%2c0-0.9%2c0.4-0.9%2c0.9c0%2c0.5%2c0.4%2c0.9%2c0.9%2c0.9c0.5%2c0%2c0.9-0.4%2c0.9-0.9 C59.7-35.9%2c59.2-36.3%2c58.7-36.3z' /%3e %3cpath class='st1' d='M56.1-33.8h1c0.4%2c0%2c0.8%2c0.3%2c0.8%2c0.8c0%2c0.3-0.2%2c0.6-0.5%2c0.7c0.1%2c0.3%2c0.4%2c0.6%2c0.7%2c0.6c0.4%2c0%2c0.8%2c0.3%2c0.8%2c0.8 c0%2c0.4-0.3%2c0.8-0.8%2c0.8c-0.6%2c0-1.1-0.2-1.5-0.6c-0.4%2c0.4-0.9%2c0.6-1.5%2c0.6c-0.4%2c0-0.8-0.3-0.8-0.8c0-0.4%2c0.3-0.8%2c0.8-0.8 c0.4%2c0%2c0.6-0.2%2c0.7-0.6c-0.3-0.1-0.5-0.4-0.5-0.7C55.3-33.4%2c55.6-33.8%2c56.1-33.8z' /%3e %3c/g%3e %3c/g%3e %3c/pattern%3e %3cg id='Calque_2_1_'%3e %3cg id='logos'%3e %3ccircle class='st2' cx='407.9' cy='249.6' r='249.6' /%3e %3cpath class='st1' d='M506.8%2c163.3l33.1-33.1c11.5-11.5%2c11.5-30.2%2c0-41.7l-0.4-0.4c-11.5-11.5-30.2-11.5-41.7%2c0l-33.7%2c33.7 c-16.4-9-34.8-13.7-53.4-13.6h-2.3c-18.7%2c0-37.1%2c4.7-53.4%2c13.7l-33.5-33.4c-11.5-11.5-30.2-11.5-41.7%2c0c0%2c0%2c0%2c0%2c0%2c0l-0.4%2c0.4 c-11.5%2c11.5-11.5%2c30.2%2c0%2c41.7c0%2c0%2c0%2c0%2c0%2c0l32.9%2c32.9c-9.9%2c17-15.2%2c36.4-15.1%2c56.1v254.9c71%2c35.1%2c154.4%2c34.5%2c224.8-1.6V219.4 C522%2c199.7%2c516.8%2c180.3%2c506.8%2c163.3z' /%3e %3cpath class='st2' d='M497.1%2c109.6l7.9-8c5.3-5.3%2c13.8-5.4%2c19.2-0.1l0.2%2c0.2c5.3%2c5.3%2c5.4%2c13.8%2c0.1%2c19.2L497.5%2c148l-0.2-0.2 C486.7%2c137.3%2c486.6%2c120.2%2c497.1%2c109.6z' /%3e %3cpath class='st2' d='M319.6%2c109.6l-7.9-8c-5.3-5.3-13.8-5.4-19.2-0.1l-0.2%2c0.2c-5.3%2c5.3-5.4%2c13.8-0.1%2c19.1c0%2c0%2c0%2c0%2c0%2c0l26.9%2c27.2 l0.2-0.2C330%2c137.3%2c330.1%2c120.2%2c319.6%2c109.6z' /%3e %3cpath class='st2' d='M367%2c389c-0.5%2c0-1%2c0-1.5-0.1c-6.1-1-9-7.5-10.9-11.9c-0.3-0.6-0.5-1.2-0.8-1.7l-0.6-1.2 c-0.6-1.3-1.3-2.9-1.7-3s-2.1%2c0.6-3.9%2c1.3l-1.6%2c0.7c-8.9%2c3.8-14.5%2c4-17.2%2c0.8c-5.5-6.4%2c5.2-24.4%2c6.5-26.4c0.4-0.7%2c1.4-0.9%2c2.1-0.5 c0.7%2c0.4%2c0.9%2c1.4%2c0.5%2c2.1l0%2c0c-4.3%2c6.9-9.9%2c19.2-6.8%2c22.9c1.7%2c2%2c6.6%2c1.4%2c13.8-1.7l1.6-0.7c6.3-2.6%2c7-2%2c9.4%2c3.1l0.5%2c1.2 c0.3%2c0.5%2c0.5%2c1.1%2c0.8%2c1.8c1.6%2c3.7%2c4.1%2c9.4%2c8.6%2c10.1c4.2%2c0.7%2c9.7-2.8%2c16.4-10.3c0.5-0.6%2c1.5-0.7%2c2.1-0.2c0.6%2c0.5%2c0.7%2c1.5%2c0.2%2c2.1 c0%2c0-0.1%2c0.1-0.1%2c0.1C377.7%2c385.3%2c372%2c389%2c367%2c389z' /%3e %3cpath class='st2' d='M470.4%2c427.6H470c-7.4-0.3-13-6.8-14.7-10.9c-0.9-2.3-2.7-4.1-5.1-4.8c-2.7-0.7-5.9%2c0.1-9%2c2.4 c-4.9%2c3.9-9.7%2c5.1-14.2%2c3.7c-10.5-3.5-15.4-20.6-15.5-21.3c-0.2-0.8%2c0.3-1.6%2c1.1-1.8c0.8-0.2%2c1.6%2c0.3%2c1.8%2c1 c0.1%2c0.2%2c4.6%2c16.3%2c13.6%2c19.3c3.5%2c1.1%2c7.4%2c0.1%2c11.5-3.2c3.9-2.9%2c8-3.9%2c11.6-2.9c3.2%2c0.9%2c5.9%2c3.3%2c7.1%2c6.5c1.6%2c3.7%2c6.4%2c8.9%2c12.1%2c9.1 c5.9%2c0.2%2c11.7-4.9%2c16.9-14.9c0.4-0.7%2c1.3-1%2c2-0.6c0.7%2c0.4%2c1%2c1.3%2c0.6%2c2C483.9%2c422.1%2c477.5%2c427.6%2c470.4%2c427.6z' /%3e %3cpath class='st2' d='M352.2%2c470.8h-0.3c-9.2-0.3-15.4-13.8-15.7-14.4c-0.3-0.8%2c0-1.6%2c0.8-2c0.7-0.3%2c1.6%2c0%2c1.9%2c0.7 c0.1%2c0.1%2c5.7%2c12.4%2c13%2c12.6h0.2c4%2c0%2c8-3.7%2c11.8-11c1.4-3.3%2c4.3-5.7%2c7.7-6.6c4-1%2c8.3-0.1%2c11.6%2c2.4c2.5%2c1.8%2c8.1%2c3.4%2c11.9%2c0.9 c4.6-3%2c5.7-11.1%2c3.1-23.5c-0.2-0.8%2c0.4-1.6%2c1.2-1.8s1.6%2c0.4%2c1.8%2c1.2c2.9%2c13.9%2c1.4%2c22.8-4.4%2c26.6c-5%2c3.3-11.9%2c1.4-15.2-1 c-2.6-2-5.9-2.7-9.1-1.9c-2.6%2c0.7-4.7%2c2.5-5.8%2c5C362.3%2c466.5%2c357.4%2c470.8%2c352.2%2c470.8z' /%3e %3cpath class='st2' d='M451.3%2c365.9c-2.4%2c0-8.4-1-15.5-10.1c-0.5-0.6-0.4-1.6%2c0.2-2.1s1.6-0.4%2c2.1%2c0.2c0%2c0%2c0%2c0%2c0.1%2c0.1 c2.2%2c2.8%2c8.9%2c9.8%2c13.6%2c8.9c2.1-0.4%2c3.8-2.5%2c5-6.2c1.4-4.6%2c4.6-7.1%2c8.3-6.6h0.1c2.7%2c0.4%2c7.3%2c1%2c9.3-1.5c1.4-1.8%2c2.3-6-1.6-16.2 c-0.3-0.8%2c0.2-1.6%2c0.9-1.9c0.7-0.2%2c1.5%2c0.1%2c1.9%2c0.8c3.6%2c9.4%2c4%2c15.7%2c1.2%2c19.2c-3.1%2c3.8-8.7%2c3-12.1%2c2.5h-0.1c-2.2-0.3-4%2c1.4-5%2c4.5 c-1.5%2c4.9-4%2c7.7-7.4%2c8.3C451.9%2c365.9%2c451.6%2c365.9%2c451.3%2c365.9z' /%3e %3cpath class='st3' d='M333.7%2c259.3c0%2c42.1%2c32.5%2c75.1%2c74.5%2c75.1s74.5-35.2%2c74.5-77.2v-28.7L424%2c216.3l-16.9-5.5l-15.8%2c4.9 l-58.3%2c12.9L333.7%2c259.3z' /%3e %3cpath class='st2' d='M407.7%2c247.3h0.6c15.4%2c0%2c27.9%2c12.5%2c27.9%2c27.9v20.5c0%2c15.4-12.5%2c27.9-27.9%2c27.9h-0.6 c-15.4%2c0-27.9-12.5-27.9-27.9v-20.5C379.8%2c259.8%2c392.3%2c247.3%2c407.7%2c247.3z' /%3e %3cpath d='M423.2%2c294.2c-1%2c0-1.9%2c0.8-1.9%2c1.9v0c0%2c5.3-3.2%2c10-8%2c12.1l0%2c0l-0.7%2c0.3c-2.5%2c0.8-2.7-1.2-2.7-1.7v-24.7l0%2c0 c0%2c0-0.1-1.7%2c1.3-2l0%2c0c4.6-1.2%2c8.1-5%2c8.9-9.8c0.1-0.5%2c0.2-0.9%2c0.2-1.4c0-0.1%2c0-0.2%2c0-0.3s0-0.2%2c0-0.3l0%2c0c-0.1-1.7-1-3.3-2.4-4.3 l0%2c0l-0.3-0.2l-0.2-0.1c-5.7-3.7-13-3.7-18.6%2c0.1l0%2c0c-2.2%2c1.5-3.3%2c4.2-2.5%2c6.8c0.9%2c4.7%2c4.5%2c8.4%2c9.1%2c9.5l0%2c0c0.6%2c0.3%2c1%2c0.9%2c1%2c1.6 v24.9c0%2c0.4-0.1%2c2.5-2.7%2c1.8c-0.2-0.1-0.5-0.2-0.7-0.3h0c-4.8-2.1-8-6.8-8-12.1c-0.1-1-1-1.8-2-1.8c-0.9%2c0.1-1.7%2c0.8-1.8%2c1.8 c0%2c9.4%2c7.6%2c17%2c17%2c17c9.4%2c0%2c17-7.6%2c17-17C425.1%2c295.1%2c424.3%2c294.2%2c423.2%2c294.2C423.2%2c294.2%2c423.2%2c294.2%2c423.2%2c294.2z' /%3e %3cg id='Lamasque'%3e %3cpolygon class='st3' points='484.3%2c270.4 522%2c260.9 522%2c254.8 482.9%2c264.8 ' /%3e %3cpolygon class='st3' points='482.8%2c303.9 522%2c313.2 522.3%2c307.3 484.2%2c298.2 ' /%3e %3cpolygon class='st3' points='334.8%2c270.4 297.2%2c260.9 297.2%2c254.8 336.3%2c264.8 ' /%3e %3cpolygon class='st3' points='336.3%2c303.9 297.2%2c313.2 296.8%2c307.3 334.9%2c298.2 ' /%3e %3cpath class='st4' d='M409.7%2c237.8c-61.2-1.4-78.8%2c3.7-78.8%2c3.7v84.3c0%2c27.6%2c78.8%2c28.1%2c78.8%2c28.1s78.8-0.5%2c78.8-28.1v-84.3 C488.4%2c241.5%2c470.8%2c236.3%2c409.7%2c237.8z' /%3e %3cpath class='st2' d='M484.7%2c252.1c0-6-3.2-11.5-8.4-14.4c-9.6-5.5-28.9-12.4-64.1-11.7c-1.6%2c0-2.5-0.1-2.5-0.1s-0.4%2c0-1.2%2c0 c-34.7-0.4-54.7%2c6.6-65%2c12c-5.5%2c2.9-8.9%2c8.5-8.9%2c14.7v0v71.6v0.6c0%2c6%2c3.2%2c11.5%2c8.4%2c14.4c9.6%2c5.5%2c28.9%2c12.4%2c64.1%2c11.7 c1.6%2c0%2c2.5%2c0.1%2c2.5%2c0.1s0.4%2c0%2c1.2%2c0c34.7%2c0.4%2c54.7-6.6%2c65-12c5.5-2.9%2c8.9-8.5%2c8.9-14.7l0%2c0c0%2c0%2c0%2c0%2c0%2c0V252.1z' /%3e %3cpattern id='SVGID_1_' xlink:href='%23Nouvelle_nuance_de_motif_3' patternTransform='matrix(1 0 0 1 1223.6129 0)' %3e%3c/pattern%3e %3cpath class='st5' d='M407.9%2c226c-31.6-0.7-50.5%2c4.7-61.1%2c9.7c-7.5%2c3.6-12.1%2c11.2-12.1%2c19.4v69.2c-2.6%2c29%2c75%2c26.8%2c75%2c26.8 s77%2c0%2c75-26.8v-68.5c0-8.4-4.8-16.1-12.4-19.6C460.9%2c231%2c440.7%2c225.2%2c407.9%2c226z' /%3e %3c/g%3e %3cg id='Lunettes'%3e %3cpath d='M424.1%2c219.1c-9.2-7.9-22.7-8.4-32.5-1.1l-2.4-3.2c11.3-8.4%2c26.8-7.9%2c37.5%2c1.3L424.1%2c219.1z' /%3e %3clinearGradient id='SVGID_2_' gradientUnits='userSpaceOnUse' x1='422.72' y1='275.96' x2='495.74' y2='275.96' gradientTransform='matrix(1 0 0 -1 0 502)' %3e %3cstop offset='0' style='stop-color:%23009CDE' /%3e %3cstop offset='0.12' style='stop-color:%2319A5DF' /%3e %3cstop offset='0.73' style='stop-color:%2396D1E6' /%3e %3cstop offset='1' style='stop-color:%23C8E2E8' /%3e %3c/linearGradient%3e %3ccircle class='st6' cx='459.2' cy='226' r='36.5' /%3e %3cpath d='M459.2%2c264.5c-21.3%2c0-38.5-17.2-38.5-38.5c0-21.3%2c17.2-38.5%2c38.5-38.5c21.3%2c0%2c38.5%2c17.2%2c38.5%2c38.5 C497.7%2c247.3%2c480.5%2c264.5%2c459.2%2c264.5z M459.2%2c191.5c-19.1%2c0-34.5%2c15.5-34.5%2c34.5c0%2c19.1%2c15.5%2c34.5%2c34.5%2c34.5 c19.1%2c0%2c34.5-15.5%2c34.5-34.5c0%2c0%2c0%2c0%2c0-0.1C493.7%2c207%2c478.3%2c191.6%2c459.2%2c191.5L459.2%2c191.5z' /%3e %3clinearGradient id='SVGID_3_' gradientUnits='userSpaceOnUse' x1='319.9' y1='275.96' x2='392.92' y2='275.96' gradientTransform='matrix(1 0 0 -1 0 502)' %3e %3cstop offset='0' style='stop-color:%23009CDE' /%3e %3cstop offset='0.12' style='stop-color:%2319A5DF' /%3e %3cstop offset='0.73' style='stop-color:%2396D1E6' /%3e %3cstop offset='1' style='stop-color:%23C8E2E8' /%3e %3c/linearGradient%3e %3ccircle class='st7' cx='356.4' cy='226' r='36.5' /%3e %3cpath d='M356.4%2c264.5c-21.3%2c0-38.5-17.2-38.5-38.5c0-21.3%2c17.2-38.5%2c38.5-38.5c21.3%2c0%2c38.5%2c17.2%2c38.5%2c38.5 C394.9%2c247.3%2c377.7%2c264.5%2c356.4%2c264.5z M356.4%2c191.5c-19.1%2c0-34.5%2c15.5-34.5%2c34.5s15.5%2c34.5%2c34.5%2c34.5s34.5-15.5%2c34.5-34.5 c0%2c0%2c0%2c0%2c0-0.1C390.9%2c207%2c375.4%2c191.6%2c356.4%2c191.5L356.4%2c191.5z' /%3e %3c/g%3e %3c/g%3e %3c/g%3e %3cg id='Calque_2_5_'%3e %3cg id='logos_4_'%3e %3cg id='Lamasque_8_' class='st8'%3e %3cpath class='st9' d='M-211%2c403c-0.2%2c0-0.4%2c0.1-0.6%2c0.1C-211.4%2c403-211.2%2c403-211%2c403z' /%3e %3cpath class='st9' d='M-213.3%2c403.3c-0.2%2c0-0.3%2c0-0.5%2c0.1C-213.6%2c403.3-213.5%2c403.3-213.3%2c403.3z' /%3e %3cpath class='st9' d='M-214%2c403.3c-0.2%2c0-0.3%2c0-0.5%2c0.1C-214.3%2c403.4-214.1%2c403.3-214%2c403.3z' /%3e %3cpath class='st9' d='M-188.2%2c396.7c-0.3%2c0.1-0.6%2c0.3-0.9%2c0.4C-188.8%2c397-188.5%2c396.8-188.2%2c396.7z' /%3e %3cpath class='st9' d='M-189.5%2c397.2c-0.3%2c0.1-0.5%2c0.2-0.8%2c0.3C-190%2c397.4-189.7%2c397.3-189.5%2c397.2z' /%3e %3cpath class='st9' d='M-190.5%2c397.6c-0.3%2c0.1-0.7%2c0.3-1%2c0.4C-191.2%2c397.9-190.8%2c397.7-190.5%2c397.6z' /%3e %3cpath class='st9' d='M-215.3%2c403.4c-0.1%2c0-0.3%2c0-0.4%2c0C-215.6%2c403.5-215.5%2c403.5-215.3%2c403.4z' /%3e %3cpath class='st9' d='M-211.8%2c403.1c-0.2%2c0-0.4%2c0-0.5%2c0.1C-212.2%2c403.1-212%2c403.1-211.8%2c403.1z' /%3e %3cpath class='st9' d='M-212.5%2c403.2c-0.2%2c0-0.4%2c0.1-0.7%2c0.1C-212.9%2c403.2-212.7%2c403.2-212.5%2c403.2z' /%3e %3cpath class='st9' d='M-214.6%2c403.4c-0.2%2c0-0.4%2c0-0.6%2c0.1C-215%2c403.4-214.8%2c403.4-214.6%2c403.4z' /%3e %3cpath class='st9' d='M-217.7%2c403.6c-0.2%2c0-0.3%2c0-0.5%2c0C-218%2c403.6-217.8%2c403.6-217.7%2c403.6z' /%3e %3cpath class='st9' d='M-184.7%2c395.1c-0.3%2c0.2-0.7%2c0.3-1%2c0.5C-185.3%2c395.4-185%2c395.3-184.7%2c395.1z' /%3e %3cpath class='st9' d='M-218.2%2c403.6c-0.1%2c0-0.3%2c0-0.4%2c0C-218.5%2c403.6-218.3%2c403.6-218.2%2c403.6z' /%3e %3cpath class='st9' d='M-218.7%2c403.6c-0.1%2c0-0.2%2c0-0.3%2c0C-219%2c403.6-218.9%2c403.6-218.7%2c403.6z' /%3e %3cpath class='st9' d='M-215.9%2c403.5c-0.2%2c0-0.3%2c0-0.5%2c0C-216.3%2c403.5-216.1%2c403.5-215.9%2c403.5z' /%3e %3cpath class='st9' d='M-216.5%2c403.5c-0.2%2c0-0.4%2c0-0.5%2c0C-216.8%2c403.6-216.7%2c403.5-216.5%2c403.5z' /%3e %3cpath class='st9' d='M-187.1%2c396.2c-0.3%2c0.1-0.7%2c0.3-1%2c0.4C-187.8%2c396.5-187.4%2c396.4-187.1%2c396.2z' /%3e %3cpath class='st9' d='M-186%2c395.7c-0.3%2c0.1-0.5%2c0.2-0.8%2c0.3C-186.5%2c396-186.3%2c395.9-186%2c395.7z' /%3e %3cpath class='st9' d='M-217.2%2c403.6c-0.1%2c0-0.3%2c0-0.4%2c0C-217.4%2c403.6-217.3%2c403.6-217.2%2c403.6z' /%3e %3cpath class='st9' d='M-208.6%2c402.6c-0.2%2c0-0.4%2c0.1-0.6%2c0.1C-209%2c402.7-208.8%2c402.6-208.6%2c402.6z' /%3e %3cpath class='st9' d='M-196.1%2c399.6c-0.3%2c0.1-0.5%2c0.2-0.8%2c0.2C-196.6%2c399.7-196.3%2c399.7-196.1%2c399.6z' /%3e %3cpath class='st9' d='M-203%2c401.5c-0.3%2c0.1-0.6%2c0.1-0.9%2c0.2C-203.6%2c401.6-203.3%2c401.6-203%2c401.5z' /%3e %3cpath class='st9' d='M-202.2%2c401.3c-0.3%2c0.1-0.6%2c0.1-0.8%2c0.2C-202.7%2c401.4-202.4%2c401.3-202.2%2c401.3z' /%3e %3cpath class='st9' d='M-204.1%2c401.7c-0.2%2c0-0.4%2c0.1-0.6%2c0.1C-204.5%2c401.8-204.3%2c401.8-204.1%2c401.7z' /%3e %3cpath class='st9' d='M-201.2%2c401c-0.2%2c0.1-0.4%2c0.1-0.7%2c0.2C-201.7%2c401.2-201.5%2c401.1-201.2%2c401z' /%3e %3cpath class='st9' d='M-200.1%2c400.8c-0.3%2c0.1-0.6%2c0.2-0.9%2c0.2C-200.7%2c400.9-200.4%2c400.8-200.1%2c400.8z' /%3e %3cpath class='st9' d='M-199.2%2c400.5c-0.3%2c0.1-0.5%2c0.1-0.8%2c0.2C-199.7%2c400.6-199.4%2c400.6-199.2%2c400.5z' /%3e %3cpath class='st9' d='M-195%2c399.2c-0.3%2c0.1-0.5%2c0.2-0.8%2c0.2C-195.5%2c399.4-195.3%2c399.3-195%2c399.2z' /%3e %3cpath class='st9' d='M-197%2c399.9c-0.3%2c0.1-0.6%2c0.2-0.9%2c0.3C-197.6%2c400.1-197.3%2c400-197%2c399.9z' /%3e %3cpath class='st9' d='M-193.8%2c398.8c-0.3%2c0.1-0.7%2c0.2-1%2c0.3C-194.5%2c399-194.1%2c398.9-193.8%2c398.8z' /%3e %3cpath class='st9' d='M-183.6%2c394.6c-0.4%2c0.2-0.7%2c0.3-1.1%2c0.5C-184.3%2c395-183.9%2c394.8-183.6%2c394.6z' /%3e %3cpath class='st9' d='M-209.4%2c402.7c-0.2%2c0-0.4%2c0.1-0.6%2c0.1C-209.8%2c402.8-209.6%2c402.8-209.4%2c402.7z' /%3e %3cpath class='st9' d='M-192.8%2c398.5c-0.3%2c0.1-0.5%2c0.2-0.8%2c0.3C-193.3%2c398.7-193.1%2c398.6-192.8%2c398.5z' /%3e %3cpath class='st9' d='M-191.7%2c398.1c-0.3%2c0.1-0.6%2c0.2-0.8%2c0.3C-192.2%2c398.3-192%2c398.2-191.7%2c398.1z' /%3e %3cpath class='st9' d='M-206.9%2c402.3c-0.2%2c0-0.4%2c0.1-0.6%2c0.1C-207.3%2c402.4-207.1%2c402.3-206.9%2c402.3z' /%3e %3cpath class='st9' d='M-207.7%2c402.4c-0.3%2c0-0.5%2c0.1-0.8%2c0.1C-208.2%2c402.5-207.9%2c402.5-207.7%2c402.4z' /%3e %3cpath class='st9' d='M-198.2%2c400.2c-0.2%2c0.1-0.5%2c0.1-0.7%2c0.2C-198.7%2c400.4-198.4%2c400.3-198.2%2c400.2z' /%3e %3cpath class='st9' d='M-210.2%2c402.9c-0.2%2c0-0.5%2c0.1-0.7%2c0.1C-210.6%2c402.9-210.4%2c402.9-210.2%2c402.9z' /%3e %3cpath class='st9' d='M-205%2c401.9c-0.3%2c0.1-0.5%2c0.1-0.8%2c0.2C-205.5%2c402-205.3%2c402-205%2c401.9z' /%3e %3cpath class='st9' d='M-205.9%2c402.1c-0.2%2c0-0.5%2c0.1-0.7%2c0.1C-206.4%2c402.2-206.1%2c402.2-205.9%2c402.1z' /%3e %3cpath class='st9' d='M-176.3%2c390.8c-0.3%2c0.2-0.6%2c0.4-0.9%2c0.5C-177%2c391.1-176.6%2c391-176.3%2c390.8z' /%3e %3cpath class='st9' d='M-222.4%2c403.6c0%2c0-0.1%2c0-0.1%2c0C-222.5%2c403.6-222.4%2c403.6-222.4%2c403.6z' /%3e %3cpath class='st9' d='M-222.2%2c403.6c-0.1%2c0-0.1%2c0-0.2%2c0C-222.3%2c403.6-222.3%2c403.6-222.2%2c403.6z' /%3e %3cpath class='st9' d='M-222.5%2c403.6C-222.6%2c403.6-222.6%2c403.6-222.5%2c403.6C-222.6%2c403.6-222.6%2c403.6-222.5%2c403.6z' /%3e %3cpath class='st9' d='M-177.4%2c391.4c-0.4%2c0.2-0.7%2c0.4-1.1%2c0.6C-178.2%2c391.8-177.8%2c391.6-177.4%2c391.4z' /%3e %3cpath class='st9' d='M-222%2c403.6c-0.1%2c0-0.1%2c0-0.2%2c0C-222.1%2c403.6-222.1%2c403.6-222%2c403.6z' /%3e %3cpath class='st9' d='M-221.8%2c403.7c-0.1%2c0-0.1%2c0-0.2%2c0C-221.9%2c403.7-221.8%2c403.7-221.8%2c403.7z' /%3e %3cpath class='st9' d='M-221.5%2c403.7c-0.1%2c0-0.2%2c0-0.2%2c0C-221.6%2c403.7-221.5%2c403.7-221.5%2c403.7z' /%3e %3cpath class='st9' d='M-178.8%2c392.2c-0.3%2c0.2-0.6%2c0.3-0.8%2c0.4C-179.4%2c392.5-179.1%2c392.3-178.8%2c392.2z' /%3e %3cpath class='st9' d='M-172.6%2c388.5c-0.3%2c0.2-0.6%2c0.4-0.9%2c0.6C-173.2%2c388.9-172.9%2c388.7-172.6%2c388.5z' /%3e %3cpath class='st9' d='M-173.8%2c389.2c-0.4%2c0.2-0.7%2c0.5-1.1%2c0.7C-174.5%2c389.7-174.1%2c389.5-173.8%2c389.2z' /%3e %3cpath class='st9' d='M-118.3%2c261.7c0%2c0-15.8%2c3.8-52.5-37.2c0%2c0-6.6-5.9-8.1-5.9c0%2c0-15-11.6-43.9-11.6s-43.9%2c11.6-43.9%2c11.6 s-1.9%2c7.8-3.3%2c20.1c3.7-2.6%2c7.7-5.3%2c10.9-7.6c6.9-4.9%2c15-8%2c23.1-10.4c4.5-1.3%2c9.2-2.3%2c13.2-2.3c4%2c0%2c8.7%2c1%2c13.2%2c2.3 c8.2%2c2.4%2c16.2%2c5.5%2c23.1%2c10.4c7.7%2c5.5%2c19.6%2c13.6%2c22.9%2c15.9c0.8%2c0.5%2c1.3%2c1.5%2c1.2%2c2.4c-0.1%2c1-0.8%2c1.5-1.5%2c1.7c-1%2c0.3-2.1%2c0-2.9-0.6 l-20.2-14.5c-15.6-12.2-35.8-13.4-35.8-13.4s-20.2%2c1.2-35.8%2c13.4l-12%2c8.6c-1.1%2c12.6-1.5%2c28.6%2c0.8%2c45.3c11.9%2c3.4%2c25.8%2c6%2c39.6%2c5.9 c4.9%2c0%2c9.8%2c0%2c14.8%2c0c32.3%2c0.3%2c64.7-14.5%2c72.3-18.2c1.5-0.7%2c3.1-1.1%2c4.7-1c3.9%2c0.2%2c5%2c2.2%2c5.1%2c4.2c0.2%2c2.3-0.9%2c4.5-2.8%2c5.8 c-7.1%2c5.1-19.9%2c9.2-33.6%2c12.3c-32.3%2c7.4-65.8%2c7.9-98.3%2c1.7c1.7%2c8.1%2c4%2c16.2%2c7.3%2c24.1c9.6%2c2.2%2c20%2c3.6%2c30.5%2c3.5c4.9%2c0%2c9.8%2c0%2c14.8%2c0 c32.3%2c0.3%2c64.7-14.5%2c72.3-18.2c1.5-0.7%2c3.1-1.1%2c4.7-1c3.9%2c0.2%2c5%2c2.2%2c5.1%2c4.2c0.2%2c2.3-0.9%2c4.5-2.8%2c5.8 c-7.1%2c5.1-19.9%2c9.2-33.6%2c12.3c-28.3%2c6.5-57.5%2c7.7-86.1%2c3.7c5.2%2c9.7%2c12.1%2c18.7%2c20.9%2c26.6c2.8%2c0.2%2c5.7%2c0.3%2c8.6%2c0.3 c2.3%2c0%2c4.6%2c0%2c6.9%2c0c25.4%2c0.2%2c49.5-10.1%2c55.4-12.8c1.4-0.6%2c2.9-1.1%2c4.4-1.2c5-0.5%2c6%2c2%2c5.9%2c4.6c-0.2%2c2.9-1.9%2c5.4-4.5%2c6.7 c-5.5%2c2.7-12.7%2c4.9-20.3%2c6.8c-14.4%2c3.4-29%2c5.2-43.7%2c5.2c13%2c8.2%2c29.4%2c14.4%2c49.8%2c17.3c12.8-8.2%2c26.2-20.8%2c37.9-40.1 c0.4-0.7%2c0.9-1.5%2c1.2-2.3c2.8-5.5%2c15.1-29.9%2c21.6-36.4C-111.7%2c309.6-117%2c262.7-118.3%2c261.7z M-182.9%2c266.2c-3.1%2c2-8%2c3.6-13.3%2c4.9 c-17.2%2c4.2-35.2%2c4.2-52.4%2c0.2c-5.6-1.3-10.8-3-14.1-5c-2.3-1.4-3.6-4.1-3.3-6.8c0.3-2%2c1.4-3.9%2c4.8-4.1c1.6-0.1%2c3.1%2c0.3%2c4.5%2c1 c4%2c2%2c16.7%2c7.7%2c34%2c7.2c17.3%2c0.4%2c29.9-5.2%2c34-7.3c1.5-0.7%2c3.1-1.1%2c4.8-1c3.2%2c0.3%2c4.2%2c2.1%2c4.5%2c4 C-179.2%2c262.1-180.6%2c264.7-182.9%2c266.2z' /%3e %3cpath class='st9' d='M-222.7%2c403.6C-222.7%2c403.6-222.8%2c403.6-222.7%2c403.6C-222.8%2c403.6-222.7%2c403.6-222.7%2c403.6z' /%3e %3cpath class='st9' d='M-222.8%2c403.6C-222.8%2c403.6-222.8%2c403.6-222.8%2c403.6C-222.8%2c403.6-222.8%2c403.6-222.8%2c403.6z' /%3e %3cpath class='st9' d='M-222.6%2c403.6C-222.7%2c403.6-222.7%2c403.6-222.6%2c403.6C-222.7%2c403.6-222.7%2c403.6-222.6%2c403.6z' /%3e %3cpath class='st9' d='M-175.1%2c390.1c-0.3%2c0.2-0.6%2c0.3-0.9%2c0.5C-175.7%2c390.4-175.4%2c390.2-175.1%2c390.1z' /%3e %3cpath class='st9' d='M-181.1%2c393.4c-0.4%2c0.2-0.7%2c0.4-1.1%2c0.5C-181.8%2c393.7-181.4%2c393.6-181.1%2c393.4z' /%3e %3cpath class='st9' d='M-219.2%2c403.7c-0.1%2c0-0.3%2c0-0.4%2c0C-219.5%2c403.7-219.3%2c403.7-219.2%2c403.7z' /%3e %3cpath class='st9' d='M-219.6%2c403.7c-0.1%2c0-0.2%2c0-0.3%2c0C-219.9%2c403.7-219.8%2c403.7-219.6%2c403.7z' /%3e %3cpath class='st9' d='M-220.1%2c403.7c-0.1%2c0-0.2%2c0-0.3%2c0C-220.3%2c403.7-220.2%2c403.7-220.1%2c403.7z' /%3e %3cpath class='st9' d='M-220.5%2c403.7c-0.1%2c0-0.2%2c0-0.3%2c0C-220.7%2c403.7-220.6%2c403.7-220.5%2c403.7z' /%3e %3cpath class='st9' d='M-220.8%2c403.7c-0.1%2c0-0.2%2c0-0.2%2c0C-221%2c403.7-220.9%2c403.7-220.8%2c403.7z' /%3e %3cpath class='st9' d='M-182.4%2c394.1c-0.3%2c0.1-0.5%2c0.3-0.8%2c0.4C-183%2c394.3-182.7%2c394.2-182.4%2c394.1z' /%3e %3cpath class='st9' d='M-180%2c392.8c-0.3%2c0.2-0.7%2c0.3-1%2c0.5C-180.6%2c393.2-180.3%2c393-180%2c392.8z' /%3e %3cpath class='st9' d='M-221.2%2c403.7c-0.1%2c0-0.1%2c0-0.2%2c0C-221.3%2c403.7-221.3%2c403.7-221.2%2c403.7z' /%3e %3cpath class='st10' d='M-258.6%2c236.1c15.6-12.2%2c35.8-13.4%2c35.8-13.4s20.2%2c1.2%2c35.8%2c13.4l20.2%2c14.5c0.8%2c0.6%2c1.9%2c0.8%2c2.9%2c0.6 c0.7-0.2%2c1.4-0.7%2c1.5-1.7c0.1-1-0.4-1.9-1.2-2.4c-3.3-2.3-15.2-10.4-22.9-15.9c-6.9-4.9-15-8-23.1-10.4 c-4.5-1.3-9.2-2.3-13.2-2.3c-4%2c0-8.7%2c1-13.2%2c2.3c-8.2%2c2.4-16.2%2c5.5-23.1%2c10.4c-3.2%2c2.3-7.1%2c5-10.9%2c7.6c-0.2%2c1.9-0.4%2c3.9-0.6%2c5.9 L-258.6%2c236.1z' /%3e %3cpath class='st11' d='M-184.1%2c255.4c-1.6-0.1-3.3%2c0.2-4.8%2c1c-4%2c2-16.7%2c7.7-34%2c7.3c-17.2%2c0.4-29.9-5.2-34-7.2 c-1.4-0.7-2.9-1.1-4.5-1c-3.4%2c0.2-4.5%2c2.1-4.8%2c4.1c-0.4%2c2.7%2c1%2c5.3%2c3.3%2c6.8c3.3%2c2%2c8.5%2c3.7%2c14.1%2c5c17.2%2c4.1%2c35.2%2c4%2c52.4-0.2 c5.3-1.3%2c10.2-2.9%2c13.3-4.9c2.3-1.4%2c3.6-4.1%2c3.3-6.8C-179.8%2c257.5-180.9%2c255.6-184.1%2c255.4z' /%3e %3cpath class='st11' d='M-169.7%2c299c13.7-3.1%2c26.5-7.2%2c33.6-12.3c1.9-1.3%2c3-3.5%2c2.8-5.8c-0.2-2-1.3-4-5.1-4.2 c-1.6-0.1-3.2%2c0.3-4.7%2c1c-7.6%2c3.7-40%2c18.5-72.3%2c18.2c-4.9%2c0-9.8%2c0-14.8%2c0c-13.8%2c0.1-27.7-2.5-39.6-5.9c0.5%2c3.5%2c1.1%2c7.1%2c1.8%2c10.6 C-235.5%2c306.9-202%2c306.3-169.7%2c299z' /%3e %3cpath class='st12' d='M-169.7%2c331.3c13.7-3.1%2c26.5-7.2%2c33.6-12.3c1.9-1.3%2c3-3.5%2c2.8-5.8c-0.2-2-1.3-4-5.1-4.2 c-1.6-0.1-3.2%2c0.3-4.7%2c1c-7.6%2c3.7-40%2c18.5-72.3%2c18.2c-4.9%2c0-9.8%2c0-14.8%2c0c-10.4%2c0.1-20.9-1.4-30.5-3.5c1.5%2c3.5%2c3.1%2c6.9%2c4.9%2c10.3 C-227.1%2c339-197.9%2c337.8-169.7%2c331.3z' /%3e %3cpath class='st12' d='M-178.5%2c365.9c7.6-1.8%2c14.8-4%2c20.3-6.8c2.6-1.3%2c4.3-3.8%2c4.5-6.7c0.2-2.6-0.9-5.1-5.9-4.6 c-1.5%2c0.2-3%2c0.6-4.4%2c1.2c-6%2c2.7-30%2c13-55.4%2c12.8c-2.3%2c0-4.6%2c0-6.9%2c0c-2.9%2c0-5.8-0.1-8.6-0.3c3.8%2c3.4%2c8%2c6.6%2c12.6%2c9.5 C-207.5%2c371.1-192.9%2c369.4-178.5%2c365.9z' /%3e %3cpath class='st13' d='M-183.3%2c394.5c-0.1%2c0-0.2%2c0.1-0.3%2c0.1C-183.5%2c394.6-183.4%2c394.5-183.3%2c394.5z' /%3e %3cpath class='st13' d='M-194.8%2c399.2c-0.1%2c0-0.1%2c0-0.2%2c0.1C-194.9%2c399.2-194.9%2c399.2-194.8%2c399.2z' /%3e %3cpath class='st13' d='M-172.5%2c388.4C-172.5%2c388.4-172.5%2c388.4-172.5%2c388.4c-0.1%2c0-0.1%2c0.1-0.2%2c0.1 C-172.6%2c388.5-172.5%2c388.4-172.5%2c388.4z' /%3e %3cpath class='st13' d='M-195.8%2c399.5c-0.1%2c0-0.2%2c0.1-0.3%2c0.1C-196%2c399.5-195.9%2c399.5-195.8%2c399.5z' /%3e %3cpath class='st13' d='M-184.6%2c395.1C-184.6%2c395.1-184.6%2c395.1-184.6%2c395.1C-184.6%2c395.1-184.6%2c395.1-184.6%2c395.1z' /%3e %3cpath class='st13' d='M-196.8%2c399.8c-0.1%2c0-0.1%2c0-0.2%2c0.1C-197%2c399.8-196.9%2c399.8-196.8%2c399.8z' /%3e %3cpath class='st13' d='M-198%2c400.1c-0.1%2c0-0.2%2c0-0.2%2c0.1C-198.1%2c400.2-198%2c400.2-198%2c400.1z' /%3e %3cpath class='st13' d='M-174.9%2c389.9c-0.1%2c0.1-0.2%2c0.1-0.3%2c0.2C-175%2c390-175%2c390-174.9%2c389.9z' /%3e %3cpath class='st13' d='M-185.7%2c395.6c-0.1%2c0-0.2%2c0.1-0.3%2c0.1C-185.9%2c395.7-185.8%2c395.6-185.7%2c395.6z' /%3e %3cpath class='st13' d='M-190.2%2c397.5c-0.1%2c0-0.2%2c0.1-0.3%2c0.1C-190.4%2c397.6-190.3%2c397.5-190.2%2c397.5z' /%3e %3cpath class='st13' d='M-178.5%2c392c-0.1%2c0.1-0.2%2c0.1-0.3%2c0.2C-178.7%2c392.1-178.6%2c392.1-178.5%2c392z' /%3e %3cpath class='st13' d='M-181%2c393.3C-181%2c393.3-181%2c393.4-181%2c393.3C-181%2c393.4-181%2c393.3-181%2c393.3z' /%3e %3cpath class='st13' d='M-188.1%2c396.7c0%2c0-0.1%2c0-0.1%2c0.1C-188.2%2c396.7-188.2%2c396.7-188.1%2c396.7z' /%3e %3cpath class='st13' d='M-179.7%2c392.6c-0.1%2c0.1-0.2%2c0.1-0.3%2c0.2C-179.9%2c392.8-179.8%2c392.7-179.7%2c392.6z' /%3e %3cpath class='st13' d='M-189.1%2c397.1c-0.1%2c0-0.2%2c0.1-0.3%2c0.1C-189.4%2c397.2-189.3%2c397.1-189.1%2c397.1z' /%3e %3cpath class='st13' d='M-191.5%2c398c-0.1%2c0-0.1%2c0-0.2%2c0.1C-191.6%2c398-191.6%2c398-191.5%2c398z' /%3e %3cpath class='st13' d='M-186.8%2c396.1c-0.1%2c0-0.2%2c0.1-0.3%2c0.1C-187%2c396.2-186.9%2c396.1-186.8%2c396.1z' /%3e %3cpath class='st13' d='M-176%2c390.6c-0.1%2c0.1-0.2%2c0.1-0.3%2c0.2C-176.2%2c390.7-176.1%2c390.6-176%2c390.6z' /%3e %3cpath class='st13' d='M-193.6%2c398.7c-0.1%2c0-0.1%2c0.1-0.2%2c0.1C-193.7%2c398.8-193.7%2c398.8-193.6%2c398.7z' /%3e %3cpath class='st13' d='M-182.1%2c393.9c-0.1%2c0-0.2%2c0.1-0.3%2c0.1C-182.3%2c394-182.3%2c394-182.1%2c393.9z' /%3e %3cpath class='st13' d='M-177.3%2c391.3c-0.1%2c0-0.1%2c0.1-0.2%2c0.1C-177.4%2c391.4-177.3%2c391.3-177.3%2c391.3z' /%3e %3cpath class='st13' d='M-192.5%2c398.4c-0.1%2c0-0.2%2c0.1-0.3%2c0.1C-192.7%2c398.4-192.6%2c398.4-192.5%2c398.4z' /%3e %3cpath class='st13' d='M-173.5%2c389.1c-0.1%2c0-0.2%2c0.1-0.2%2c0.1C-173.7%2c389.2-173.6%2c389.1-173.5%2c389.1z' /%3e %3cpath class='st13' d='M-219.1%2c403.7c0%2c0-0.1%2c0-0.1%2c0C-219.1%2c403.7-219.1%2c403.7-219.1%2c403.7z' /%3e %3cpath class='st13' d='M-198.9%2c400.4c-0.1%2c0-0.2%2c0.1-0.3%2c0.1C-199.1%2c400.5-199%2c400.4-198.9%2c400.4z' /%3e %3cpath class='st13' d='M-221.1%2c403.7C-221.1%2c403.7-221.2%2c403.7-221.1%2c403.7C-221.1%2c403.7-221.1%2c403.7-221.1%2c403.7z' /%3e %3cpath class='st13' d='M-220.4%2c403.7C-220.4%2c403.7-220.4%2c403.7-220.4%2c403.7C-220.4%2c403.7-220.4%2c403.7-220.4%2c403.7z' /%3e %3cpath class='st13' d='M-220.8%2c403.7C-220.8%2c403.7-220.8%2c403.7-220.8%2c403.7C-220.8%2c403.7-220.8%2c403.7-220.8%2c403.7z' /%3e %3cpath class='st13' d='M-220%2c403.7c0%2c0-0.1%2c0-0.1%2c0C-220.1%2c403.7-220%2c403.7-220%2c403.7z' /%3e %3cpath class='st13' d='M-217.5%2c403.6c0%2c0-0.1%2c0-0.1%2c0C-217.6%2c403.6-217.6%2c403.6-217.5%2c403.6z' /%3e %3cpath class='st13' d='M-217%2c403.6c0%2c0-0.1%2c0-0.1%2c0C-217.1%2c403.6-217.1%2c403.6-217%2c403.6z' /%3e %3cpath class='st13' d='M-218.2%2c403.6C-218.2%2c403.6-218.2%2c403.6-218.2%2c403.6C-218.2%2c403.6-218.2%2c403.6-218.2%2c403.6z' /%3e %3cpath class='st13' d='M-218.6%2c403.6c0%2c0-0.1%2c0-0.1%2c0C-218.7%2c403.6-218.7%2c403.6-218.6%2c403.6z' /%3e %3cpath class='st13' d='M-222.6%2c403.6C-222.6%2c403.6-222.6%2c403.6-222.6%2c403.6C-222.6%2c403.6-222.6%2c403.6-222.6%2c403.6z' /%3e %3cpath class='st13' d='M-222.7%2c403.6C-222.7%2c403.6-222.7%2c403.6-222.7%2c403.6C-222.7%2c403.6-222.7%2c403.6-222.7%2c403.6z' /%3e %3cpath class='st13' d='M-222.5%2c403.6C-222.5%2c403.6-222.5%2c403.6-222.5%2c403.6C-222.5%2c403.6-222.5%2c403.6-222.5%2c403.6z' /%3e %3cpath class='st13' d='M-221.4%2c403.7C-221.4%2c403.7-221.4%2c403.7-221.4%2c403.7C-221.4%2c403.7-221.4%2c403.7-221.4%2c403.7z' /%3e %3cpath class='st13' d='M-222.8%2c403.6C-222.8%2c403.6-222.8%2c403.6-222.8%2c403.6C-222.8%2c403.6-222.8%2c403.6-222.8%2c403.6z' /%3e %3cpath class='st13' d='M-216.4%2c403.5C-216.5%2c403.5-216.5%2c403.5-216.4%2c403.5C-216.5%2c403.5-216.5%2c403.5-216.4%2c403.5z' /%3e %3cpath class='st13' d='M-221.9%2c403.6C-222%2c403.6-222%2c403.6-221.9%2c403.6C-222%2c403.6-222%2c403.6-221.9%2c403.6z' /%3e %3cpath class='st13' d='M-221.7%2c403.7C-221.7%2c403.7-221.7%2c403.7-221.7%2c403.7C-221.7%2c403.7-221.7%2c403.7-221.7%2c403.7z' /%3e %3cpath class='st13' d='M-222.2%2c403.6C-222.2%2c403.6-222.2%2c403.6-222.2%2c403.6C-222.2%2c403.6-222.2%2c403.6-222.2%2c403.6z' /%3e %3cpath class='st13' d='M-222.4%2c403.6C-222.4%2c403.6-222.4%2c403.6-222.4%2c403.6C-222.4%2c403.6-222.4%2c403.6-222.4%2c403.6z' /%3e %3cpath class='st13' d='M-219.6%2c403.7C-219.6%2c403.7-219.6%2c403.7-219.6%2c403.7C-219.6%2c403.7-219.6%2c403.7-219.6%2c403.7z' /%3e %3cpath class='st13' d='M-215.8%2c403.5c-0.1%2c0-0.1%2c0-0.2%2c0C-215.9%2c403.5-215.8%2c403.5-215.8%2c403.5z' /%3e %3cpath class='st13' d='M-205.8%2c402.1C-205.8%2c402.1-205.9%2c402.1-205.8%2c402.1C-205.9%2c402.1-205.8%2c402.1-205.8%2c402.1z' /%3e %3cpath class='st13' d='M-203.9%2c401.7c-0.1%2c0-0.2%2c0-0.2%2c0.1C-204%2c401.7-204%2c401.7-203.9%2c401.7z' /%3e %3cpath class='st13' d='M-206.6%2c402.3c-0.1%2c0-0.2%2c0-0.2%2c0C-206.8%2c402.3-206.7%2c402.3-206.6%2c402.3z' /%3e %3cpath class='st13' d='M-207.5%2c402.4c-0.1%2c0-0.1%2c0-0.2%2c0C-207.6%2c402.4-207.5%2c402.4-207.5%2c402.4z' /%3e %3cpath class='st13' d='M-201.9%2c401.2c-0.1%2c0-0.2%2c0-0.3%2c0.1C-202.1%2c401.3-202%2c401.2-201.9%2c401.2z' /%3e %3cpath class='st13' d='M-200%2c400.7c0%2c0-0.1%2c0-0.1%2c0C-200.1%2c400.7-200%2c400.7-200%2c400.7z' /%3e %3cpath class='st13' d='M-201%2c401c-0.1%2c0-0.2%2c0-0.2%2c0.1C-201.2%2c401-201.1%2c401-201%2c401z' /%3e %3cpath class='st13' d='M-208.4%2c402.6c0%2c0-0.1%2c0-0.1%2c0C-208.5%2c402.6-208.5%2c402.6-208.4%2c402.6z' /%3e %3cpath class='st13' d='M-203%2c401.5C-203%2c401.5-203%2c401.5-203%2c401.5C-203%2c401.5-203%2c401.5-203%2c401.5z' /%3e %3cpath class='st13' d='M-204.8%2c401.9c-0.1%2c0-0.2%2c0-0.2%2c0C-204.9%2c401.9-204.8%2c401.9-204.8%2c401.9z' /%3e %3cpath class='st13' d='M-214.5%2c403.4C-214.5%2c403.4-214.6%2c403.4-214.5%2c403.4C-214.6%2c403.4-214.5%2c403.4-214.5%2c403.4z' /%3e %3cpath class='st13' d='M-213.8%2c403.3c-0.1%2c0-0.1%2c0-0.2%2c0C-213.9%2c403.3-213.8%2c403.3-213.8%2c403.3z' /%3e %3cpath class='st13' d='M-213.1%2c403.2c-0.1%2c0-0.1%2c0-0.2%2c0C-213.2%2c403.2-213.2%2c403.2-213.1%2c403.2z' /%3e %3cpath class='st13' d='M-215.2%2c403.4c-0.1%2c0-0.1%2c0-0.2%2c0C-215.3%2c403.4-215.2%2c403.4-215.2%2c403.4z' /%3e %3cpath class='st13' d='M-209.2%2c402.7c-0.1%2c0-0.1%2c0-0.2%2c0C-209.3%2c402.7-209.3%2c402.7-209.2%2c402.7z' /%3e %3cpath class='st13' d='M-210%2c402.8c-0.1%2c0-0.1%2c0-0.2%2c0C-210.1%2c402.8-210%2c402.8-210%2c402.8z' /%3e %3cpath class='st13' d='M-212.3%2c403.1c0%2c0-0.1%2c0-0.1%2c0C-212.4%2c403.2-212.4%2c403.1-212.3%2c403.1z' /%3e %3cpath class='st13' d='M-210.9%2c403c-0.1%2c0-0.1%2c0-0.2%2c0C-211%2c403-210.9%2c403-210.9%2c403z' /%3e %3cpath class='st13' d='M-211.6%2c403c-0.1%2c0-0.1%2c0-0.2%2c0C-211.7%2c403.1-211.6%2c403.1-211.6%2c403z' /%3e %3cpath class='st9' d='M-267.1%2c365.9c-7.6-1.8-14.8-4-20.3-6.7c-2.7-1.3-4.5-4-4.6-6.9c-0.1-2.5%2c1.1-4.8%2c5.9-4.3 c1.5%2c0.2%2c3%2c0.6%2c4.4%2c1.2c5.3%2c2.4%2c24.8%2c10.8%2c46.8%2c12.5c-8.9-7.9-15.7-17-20.9-26.6c-6.8-0.9-13.5-2.2-20.2-3.7 c-13.7-3.1-26.5-7.2-33.6-12.3c-1.9-1.3-3-3.5-2.8-5.8c0.2-2%2c1.3-4%2c5.1-4.2c1.6-0.1%2c3.2%2c0.3%2c4.7%2c1c5.1%2c2.5%2c21.6%2c10.1%2c41.8%2c14.7 c-3.3-7.9-5.6-16-7.3-24.1c-2.7-0.5-5.3-1.1-8-1.7c-13.7-3.1-26.5-7.2-33.6-12.3c-1.9-1.3-3-3.5-2.8-5.8c0.2-2%2c1.3-4%2c5.1-4.2 c1.6-0.1%2c3.2%2c0.3%2c4.7%2c1c4.3%2c2.1%2c16.8%2c7.9%2c32.7%2c12.3c-2.3-16.7-1.9-32.7-0.8-45.3l-8.2%2c5.9c-0.8%2c0.6-1.9%2c0.8-2.9%2c0.6 c-0.7-0.2-1.4-0.7-1.5-1.7c-0.1-0.9%2c0.4-1.9%2c1.2-2.4c1.9-1.3%2c6.8-4.6%2c12-8.3c1.4-12.3%2c3.3-20.1%2c3.3-20.1c-1.5%2c0-8.1%2c5.9-8.1%2c5.9 c-36.7%2c41-52.5%2c37.2-52.5%2c37.2c-1.3%2c1-6.6%2c47.9-6.6%2c47.9c6.5%2c6.5%2c18.8%2c30.8%2c21.6%2c36.4c0.4%2c0.8%2c0.8%2c1.5%2c1.2%2c2.3 c36.3%2c59.6%2c88.3%2c55.4%2c88.3%2c55.4s0%2c0%2c0%2c0c0%2c0%2c0%2c0%2c0%2c0c0%2c0%2c0%2c0%2c0%2c0c0%2c0%2c0%2c0%2c0%2c0c0%2c0%2c0%2c0%2c0.1%2c0c0%2c0%2c0%2c0%2c0%2c0c0%2c0%2c0.1%2c0%2c0.1%2c0 c0%2c0%2c0%2c0%2c0%2c0c0%2c0%2c0.1%2c0%2c0.1%2c0c0%2c0%2c0%2c0%2c0%2c0c0.1%2c0%2c0.1%2c0%2c0.2%2c0c0%2c0%2c0%2c0%2c0%2c0c0%2c0%2c0.1%2c0%2c0.2%2c0c0%2c0%2c0%2c0%2c0.1%2c0c0.1%2c0%2c0.1%2c0%2c0.2%2c0 c0%2c0%2c0%2c0%2c0.1%2c0c0.1%2c0%2c0.2%2c0%2c0.2%2c0c0%2c0%2c0%2c0%2c0.1%2c0c0.1%2c0%2c0.1%2c0%2c0.2%2c0c0%2c0%2c0.1%2c0%2c0.1%2c0c0.1%2c0%2c0.2%2c0%2c0.2%2c0c0%2c0%2c0%2c0%2c0.1%2c0 c0.1%2c0%2c0.2%2c0%2c0.3%2c0c0%2c0%2c0.1%2c0%2c0.1%2c0c0.1%2c0%2c0.2%2c0%2c0.3%2c0c0%2c0%2c0.1%2c0%2c0.1%2c0c0.1%2c0%2c0.2%2c0%2c0.3%2c0c0%2c0%2c0%2c0%2c0.1%2c0c0.1%2c0%2c0.3%2c0%2c0.4%2c0 c0%2c0%2c0.1%2c0%2c0.1%2c0c0.1%2c0%2c0.2%2c0%2c0.3%2c0c0%2c0%2c0.1%2c0%2c0.1%2c0c0.1%2c0%2c0.3%2c0%2c0.4%2c0c0%2c0%2c0%2c0%2c0%2c0c0.2%2c0%2c0.3%2c0%2c0.5%2c0c0%2c0%2c0.1%2c0%2c0.1%2c0 c0.1%2c0%2c0.3%2c0%2c0.4%2c0c0%2c0%2c0.1%2c0%2c0.1%2c0c0.2%2c0%2c0.3%2c0%2c0.5%2c0c0%2c0%2c0%2c0%2c0%2c0c0.2%2c0%2c0.3%2c0%2c0.5%2c0c0.1%2c0%2c0.1%2c0%2c0.2%2c0c0.1%2c0%2c0.3%2c0%2c0.4%2c0 c0.1%2c0%2c0.1%2c0%2c0.2%2c0c0.2%2c0%2c0.4%2c0%2c0.6-0.1c0%2c0%2c0.1%2c0%2c0.1%2c0c0.2%2c0%2c0.3%2c0%2c0.5-0.1c0.1%2c0%2c0.1%2c0%2c0.2%2c0c0.2%2c0%2c0.3%2c0%2c0.5-0.1 c0.1%2c0%2c0.1%2c0%2c0.2%2c0c0.2%2c0%2c0.4%2c0%2c0.7-0.1c0%2c0%2c0.1%2c0%2c0.1%2c0c0.2%2c0%2c0.4%2c0%2c0.5-0.1c0.1%2c0%2c0.1%2c0%2c0.2%2c0c0.2%2c0%2c0.4%2c0%2c0.6-0.1 c0.1%2c0%2c0.1%2c0%2c0.2%2c0c0.2%2c0%2c0.5-0.1%2c0.7-0.1c0.1%2c0%2c0.1%2c0%2c0.2%2c0c0.2%2c0%2c0.4-0.1%2c0.6-0.1c0.1%2c0%2c0.1%2c0%2c0.2%2c0c0.2%2c0%2c0.4-0.1%2c0.6-0.1 c0%2c0%2c0.1%2c0%2c0.1%2c0c0.3%2c0%2c0.5-0.1%2c0.8-0.1c0.1%2c0%2c0.1%2c0%2c0.2%2c0c0.2%2c0%2c0.4-0.1%2c0.6-0.1c0.1%2c0%2c0.2%2c0%2c0.2%2c0c0.2%2c0%2c0.5-0.1%2c0.7-0.1 c0%2c0%2c0%2c0%2c0.1%2c0c0.3-0.1%2c0.5-0.1%2c0.8-0.2c0.1%2c0%2c0.2%2c0%2c0.2%2c0c0.2%2c0%2c0.4-0.1%2c0.6-0.1c0.1%2c0%2c0.2%2c0%2c0.2-0.1c0.3-0.1%2c0.6-0.1%2c0.9-0.2 c0%2c0%2c0%2c0%2c0%2c0c0.3-0.1%2c0.6-0.1%2c0.8-0.2c0.1%2c0%2c0.2%2c0%2c0.3-0.1c0.2-0.1%2c0.4-0.1%2c0.7-0.2c0.1%2c0%2c0.2%2c0%2c0.2-0.1c0.3-0.1%2c0.6-0.2%2c0.9-0.2 c0%2c0%2c0.1%2c0%2c0.1%2c0c0.3-0.1%2c0.5-0.1%2c0.8-0.2c0.1%2c0%2c0.2-0.1%2c0.3-0.1c0.2-0.1%2c0.5-0.1%2c0.7-0.2c0.1%2c0%2c0.2%2c0%2c0.2-0.1 c0.3-0.1%2c0.6-0.2%2c0.9-0.3c0.1%2c0%2c0.1%2c0%2c0.2-0.1c0.3-0.1%2c0.5-0.2%2c0.8-0.2c0.1%2c0%2c0.2-0.1%2c0.3-0.1c0.3-0.1%2c0.5-0.2%2c0.8-0.2 c0.1%2c0%2c0.1%2c0%2c0.2-0.1c0.3-0.1%2c0.6-0.2%2c1-0.3c0.1%2c0%2c0.1-0.1%2c0.2-0.1c0.3-0.1%2c0.5-0.2%2c0.8-0.3c0.1%2c0%2c0.2-0.1%2c0.3-0.1 c0.3-0.1%2c0.5-0.2%2c0.8-0.3c0.1%2c0%2c0.1%2c0%2c0.2-0.1c0.3-0.1%2c0.7-0.3%2c1-0.4c0.1%2c0%2c0.2-0.1%2c0.3-0.1c0.3-0.1%2c0.5-0.2%2c0.8-0.3 c0.1%2c0%2c0.2-0.1%2c0.3-0.1c0.3-0.1%2c0.6-0.2%2c0.9-0.4c0%2c0%2c0.1%2c0%2c0.1-0.1c0.3-0.1%2c0.7-0.3%2c1-0.4c0.1%2c0%2c0.2-0.1%2c0.3-0.1 c0.3-0.1%2c0.5-0.2%2c0.8-0.3c0.1%2c0%2c0.2-0.1%2c0.3-0.1c0.3-0.2%2c0.7-0.3%2c1-0.5c0%2c0%2c0%2c0%2c0%2c0c0.4-0.2%2c0.7-0.3%2c1.1-0.5 c0.1%2c0%2c0.2-0.1%2c0.3-0.1c0.3-0.1%2c0.5-0.3%2c0.8-0.4c0.1%2c0%2c0.2-0.1%2c0.3-0.1c0.4-0.2%2c0.7-0.4%2c1.1-0.5c0%2c0%2c0.1%2c0%2c0.1-0.1 c0.3-0.2%2c0.7-0.3%2c1-0.5c0.1-0.1%2c0.2-0.1%2c0.3-0.2c0.3-0.1%2c0.6-0.3%2c0.8-0.4c0.1-0.1%2c0.2-0.1%2c0.3-0.2c0.4-0.2%2c0.7-0.4%2c1.1-0.6 c0.1%2c0%2c0.1-0.1%2c0.2-0.1c0.3-0.2%2c0.6-0.4%2c0.9-0.5c0.1-0.1%2c0.2-0.1%2c0.3-0.2c0.3-0.2%2c0.6-0.3%2c0.9-0.5c0.1-0.1%2c0.2-0.1%2c0.3-0.2 c0.4-0.2%2c0.7-0.5%2c1.1-0.7c0.1%2c0%2c0.2-0.1%2c0.2-0.1c0.3-0.2%2c0.6-0.4%2c0.9-0.6c0.1%2c0%2c0.1-0.1%2c0.2-0.1c-20.4-2.9-36.7-9-49.8-17.3 C-237.3%2c371.2-252.3%2c369.4-267.1%2c365.9z' /%3e %3cpath class='st13' d='M-267.1%2c365.9c-7.6-1.8-14.8-4-20.3-6.7c-2.7-1.3-4.5-4-4.6-6.9c-0.1-2.5%2c1.1-4.8%2c5.9-4.3 c1.5%2c0.2%2c3%2c0.6%2c4.4%2c1.2c5.3%2c2.4%2c24.8%2c10.8%2c46.8%2c12.5c-8.9-7.9-15.7-17-20.9-26.6c-6.8-0.9-13.5-2.2-20.2-3.7 c-13.7-3.1-26.5-7.2-33.6-12.3c-1.9-1.3-3-3.5-2.8-5.8c0.2-2%2c1.3-4%2c5.1-4.2c1.6-0.1%2c3.2%2c0.3%2c4.7%2c1c5.1%2c2.5%2c21.6%2c10.1%2c41.8%2c14.7 c-3.3-7.9-5.6-16-7.3-24.1c-2.7-0.5-5.3-1.1-8-1.7c-13.7-3.1-26.5-7.2-33.6-12.3c-1.9-1.3-3-3.5-2.8-5.8c0.2-2%2c1.3-4%2c5.1-4.2 c1.6-0.1%2c3.2%2c0.3%2c4.7%2c1c4.3%2c2.1%2c16.8%2c7.9%2c32.7%2c12.3c-2.3-16.7-1.9-32.7-0.8-45.3l-8.2%2c5.9c-0.8%2c0.6-1.9%2c0.8-2.9%2c0.6 c-0.7-0.2-1.4-0.7-1.5-1.7c-0.1-0.9%2c0.4-1.9%2c1.2-2.4c1.9-1.3%2c6.8-4.6%2c12-8.3c1.4-12.3%2c3.3-20.1%2c3.3-20.1c-1.5%2c0-8.1%2c5.9-8.1%2c5.9 c-36.7%2c41-52.5%2c37.2-52.5%2c37.2c-1.3%2c1-6.6%2c47.9-6.6%2c47.9c6.5%2c6.5%2c18.8%2c30.8%2c21.6%2c36.4c0.4%2c0.8%2c0.8%2c1.5%2c1.2%2c2.3 c36.3%2c59.6%2c88.3%2c55.4%2c88.3%2c55.4s0%2c0%2c0%2c0c0%2c0%2c0%2c0%2c0%2c0c0%2c0%2c0%2c0%2c0%2c0c0%2c0%2c0%2c0%2c0%2c0c0%2c0%2c0%2c0%2c0.1%2c0c0%2c0%2c0%2c0%2c0%2c0c0%2c0%2c0.1%2c0%2c0.1%2c0 c0%2c0%2c0%2c0%2c0%2c0c0%2c0%2c0.1%2c0%2c0.1%2c0c0%2c0%2c0%2c0%2c0%2c0c0.1%2c0%2c0.1%2c0%2c0.2%2c0c0%2c0%2c0%2c0%2c0%2c0c0%2c0%2c0.1%2c0%2c0.2%2c0c0%2c0%2c0%2c0%2c0.1%2c0c0.1%2c0%2c0.1%2c0%2c0.2%2c0 c0%2c0%2c0%2c0%2c0.1%2c0c0.1%2c0%2c0.2%2c0%2c0.2%2c0c0%2c0%2c0%2c0%2c0.1%2c0c0.1%2c0%2c0.1%2c0%2c0.2%2c0c0%2c0%2c0.1%2c0%2c0.1%2c0c0.1%2c0%2c0.2%2c0%2c0.2%2c0c0%2c0%2c0%2c0%2c0.1%2c0 c0.1%2c0%2c0.2%2c0%2c0.3%2c0c0%2c0%2c0.1%2c0%2c0.1%2c0c0.1%2c0%2c0.2%2c0%2c0.3%2c0c0%2c0%2c0.1%2c0%2c0.1%2c0c0.1%2c0%2c0.2%2c0%2c0.3%2c0c0%2c0%2c0%2c0%2c0.1%2c0c0.1%2c0%2c0.3%2c0%2c0.4%2c0 c0%2c0%2c0.1%2c0%2c0.1%2c0c0.1%2c0%2c0.2%2c0%2c0.3%2c0c0%2c0%2c0.1%2c0%2c0.1%2c0c0.1%2c0%2c0.3%2c0%2c0.4%2c0c0%2c0%2c0%2c0%2c0%2c0c0.2%2c0%2c0.3%2c0%2c0.5%2c0c0%2c0%2c0.1%2c0%2c0.1%2c0 c0.1%2c0%2c0.3%2c0%2c0.4%2c0c0%2c0%2c0.1%2c0%2c0.1%2c0c0.2%2c0%2c0.3%2c0%2c0.5%2c0c0%2c0%2c0%2c0%2c0%2c0c0.2%2c0%2c0.3%2c0%2c0.5%2c0c0.1%2c0%2c0.1%2c0%2c0.2%2c0c0.1%2c0%2c0.3%2c0%2c0.4%2c0 c0.1%2c0%2c0.1%2c0%2c0.2%2c0c0.2%2c0%2c0.4%2c0%2c0.6-0.1c0%2c0%2c0.1%2c0%2c0.1%2c0c0.2%2c0%2c0.3%2c0%2c0.5-0.1c0.1%2c0%2c0.1%2c0%2c0.2%2c0c0.2%2c0%2c0.3%2c0%2c0.5-0.1 c0.1%2c0%2c0.1%2c0%2c0.2%2c0c0.2%2c0%2c0.4%2c0%2c0.7-0.1c0%2c0%2c0.1%2c0%2c0.1%2c0c0.2%2c0%2c0.4%2c0%2c0.5-0.1c0.1%2c0%2c0.1%2c0%2c0.2%2c0c0.2%2c0%2c0.4%2c0%2c0.6-0.1 c0.1%2c0%2c0.1%2c0%2c0.2%2c0c0.2%2c0%2c0.5-0.1%2c0.7-0.1c0.1%2c0%2c0.1%2c0%2c0.2%2c0c0.2%2c0%2c0.4-0.1%2c0.6-0.1c0.1%2c0%2c0.1%2c0%2c0.2%2c0c0.2%2c0%2c0.4-0.1%2c0.6-0.1 c0%2c0%2c0.1%2c0%2c0.1%2c0c0.3%2c0%2c0.5-0.1%2c0.8-0.1c0.1%2c0%2c0.1%2c0%2c0.2%2c0c0.2%2c0%2c0.4-0.1%2c0.6-0.1c0.1%2c0%2c0.2%2c0%2c0.2%2c0c0.2%2c0%2c0.5-0.1%2c0.7-0.1 c0%2c0%2c0%2c0%2c0.1%2c0c0.3-0.1%2c0.5-0.1%2c0.8-0.2c0.1%2c0%2c0.2%2c0%2c0.2%2c0c0.2%2c0%2c0.4-0.1%2c0.6-0.1c0.1%2c0%2c0.2%2c0%2c0.2-0.1c0.3-0.1%2c0.6-0.1%2c0.9-0.2 c0%2c0%2c0%2c0%2c0%2c0c0.3-0.1%2c0.6-0.1%2c0.8-0.2c0.1%2c0%2c0.2%2c0%2c0.3-0.1c0.2-0.1%2c0.4-0.1%2c0.7-0.2c0.1%2c0%2c0.2%2c0%2c0.2-0.1c0.3-0.1%2c0.6-0.2%2c0.9-0.2 c0%2c0%2c0.1%2c0%2c0.1%2c0c0.3-0.1%2c0.5-0.1%2c0.8-0.2c0.1%2c0%2c0.2-0.1%2c0.3-0.1c0.2-0.1%2c0.5-0.1%2c0.7-0.2c0.1%2c0%2c0.2%2c0%2c0.2-0.1 c0.3-0.1%2c0.6-0.2%2c0.9-0.3c0.1%2c0%2c0.1%2c0%2c0.2-0.1c0.3-0.1%2c0.5-0.2%2c0.8-0.2c0.1%2c0%2c0.2-0.1%2c0.3-0.1c0.3-0.1%2c0.5-0.2%2c0.8-0.2 c0.1%2c0%2c0.1%2c0%2c0.2-0.1c0.3-0.1%2c0.6-0.2%2c1-0.3c0.1%2c0%2c0.1-0.1%2c0.2-0.1c0.3-0.1%2c0.5-0.2%2c0.8-0.3c0.1%2c0%2c0.2-0.1%2c0.3-0.1 c0.3-0.1%2c0.5-0.2%2c0.8-0.3c0.1%2c0%2c0.1%2c0%2c0.2-0.1c0.3-0.1%2c0.7-0.3%2c1-0.4c0.1%2c0%2c0.2-0.1%2c0.3-0.1c0.3-0.1%2c0.5-0.2%2c0.8-0.3 c0.1%2c0%2c0.2-0.1%2c0.3-0.1c0.3-0.1%2c0.6-0.2%2c0.9-0.4c0%2c0%2c0.1%2c0%2c0.1-0.1c0.3-0.1%2c0.7-0.3%2c1-0.4c0.1%2c0%2c0.2-0.1%2c0.3-0.1 c0.3-0.1%2c0.5-0.2%2c0.8-0.3c0.1%2c0%2c0.2-0.1%2c0.3-0.1c0.3-0.2%2c0.7-0.3%2c1-0.5c0%2c0%2c0%2c0%2c0%2c0c0.4-0.2%2c0.7-0.3%2c1.1-0.5 c0.1%2c0%2c0.2-0.1%2c0.3-0.1c0.3-0.1%2c0.5-0.3%2c0.8-0.4c0.1%2c0%2c0.2-0.1%2c0.3-0.1c0.4-0.2%2c0.7-0.4%2c1.1-0.5c0%2c0%2c0.1%2c0%2c0.1-0.1 c0.3-0.2%2c0.7-0.3%2c1-0.5c0.1-0.1%2c0.2-0.1%2c0.3-0.2c0.3-0.1%2c0.6-0.3%2c0.8-0.4c0.1-0.1%2c0.2-0.1%2c0.3-0.2c0.4-0.2%2c0.7-0.4%2c1.1-0.6 c0.1%2c0%2c0.1-0.1%2c0.2-0.1c0.3-0.2%2c0.6-0.4%2c0.9-0.5c0.1-0.1%2c0.2-0.1%2c0.3-0.2c0.3-0.2%2c0.6-0.3%2c0.9-0.5c0.1-0.1%2c0.2-0.1%2c0.3-0.2 c0.4-0.2%2c0.7-0.5%2c1.1-0.7c0.1%2c0%2c0.2-0.1%2c0.2-0.1c0.3-0.2%2c0.6-0.4%2c0.9-0.6c0.1%2c0%2c0.1-0.1%2c0.2-0.1c-20.4-2.9-36.7-9-49.8-17.3 C-237.3%2c371.2-252.3%2c369.4-267.1%2c365.9z' /%3e %3cpath class='st10' d='M-283.2%2c249.4c0.1%2c1%2c0.8%2c1.5%2c1.5%2c1.7c1%2c0.3%2c2.1%2c0%2c2.9-0.6l8.2-5.9c0.2-2.1%2c0.4-4.1%2c0.6-5.9 c-5.2%2c3.6-10.1%2c6.9-12%2c8.3C-282.8%2c247.6-283.3%2c248.5-283.2%2c249.4z' /%3e %3cpath class='st13' d='M-283.2%2c249.4c0.1%2c1%2c0.8%2c1.5%2c1.5%2c1.7c1%2c0.3%2c2.1%2c0%2c2.9-0.6l8.2-5.9c0.2-2.1%2c0.4-4.1%2c0.6-5.9 c-5.2%2c3.6-10.1%2c6.9-12%2c8.3C-282.8%2c247.6-283.3%2c248.5-283.2%2c249.4z' /%3e %3cpath class='st11' d='M-307.2%2c276.7c-3.9%2c0.2-5%2c2.2-5.1%2c4.2c-0.2%2c2.3%2c0.9%2c4.5%2c2.8%2c5.8c7.1%2c5.1%2c19.9%2c9.2%2c33.6%2c12.3 c2.6%2c0.6%2c5.3%2c1.2%2c8%2c1.7c-0.7-3.6-1.3-7.1-1.8-10.6c-15.9-4.5-28.3-10.2-32.7-12.3C-303.9%2c277-305.5%2c276.6-307.2%2c276.7z' /%3e %3cpath class='st13' d='M-307.2%2c276.7c-3.9%2c0.2-5%2c2.2-5.1%2c4.2c-0.2%2c2.3%2c0.9%2c4.5%2c2.8%2c5.8c7.1%2c5.1%2c19.9%2c9.2%2c33.6%2c12.3 c2.6%2c0.6%2c5.3%2c1.2%2c8%2c1.7c-0.7-3.6-1.3-7.1-1.8-10.6c-15.9-4.5-28.3-10.2-32.7-12.3C-303.9%2c277-305.5%2c276.6-307.2%2c276.7z' /%3e %3cpath class='st12' d='M-307.2%2c309c-3.9%2c0.2-5%2c2.2-5.1%2c4.2c-0.2%2c2.3%2c0.9%2c4.5%2c2.8%2c5.8c7.1%2c5.1%2c19.9%2c9.2%2c33.6%2c12.3 c6.7%2c1.5%2c13.4%2c2.8%2c20.2%2c3.7c-1.8-3.4-3.5-6.8-4.9-10.3c-20.2-4.5-36.7-12.2-41.8-14.7C-303.9%2c309.3-305.5%2c309-307.2%2c309z' /%3e %3cpath class='st13' d='M-307.2%2c309c-3.9%2c0.2-5%2c2.2-5.1%2c4.2c-0.2%2c2.3%2c0.9%2c4.5%2c2.8%2c5.8c7.1%2c5.1%2c19.9%2c9.2%2c33.6%2c12.3 c6.7%2c1.5%2c13.4%2c2.8%2c20.2%2c3.7c-1.8-3.4-3.5-6.8-4.9-10.3c-20.2-4.5-36.7-12.2-41.8-14.7C-303.9%2c309.3-305.5%2c309-307.2%2c309z' /%3e %3cpath class='st12' d='M-286.1%2c347.9c-4.8-0.5-5.9%2c1.8-5.9%2c4.3c0.1%2c3%2c1.9%2c5.6%2c4.6%2c6.9c5.5%2c2.7%2c12.7%2c4.9%2c20.3%2c6.7 c14.7%2c3.5%2c29.8%2c5.3%2c44.9%2c5.2c-4.6-2.9-8.8-6.1-12.6-9.5c-22.1-1.8-41.5-10.1-46.8-12.5C-283.1%2c348.5-284.6%2c348.1-286.1%2c347.9z' /%3e %3cpath class='st13' d='M-286.1%2c347.9c-4.8-0.5-5.9%2c1.8-5.9%2c4.3c0.1%2c3%2c1.9%2c5.6%2c4.6%2c6.9c5.5%2c2.7%2c12.7%2c4.9%2c20.3%2c6.7 c14.7%2c3.5%2c29.8%2c5.3%2c44.9%2c5.2c-4.6-2.9-8.8-6.1-12.6-9.5c-22.1-1.8-41.5-10.1-46.8-12.5C-283.1%2c348.5-284.6%2c348.1-286.1%2c347.9z' /%3e %3cpolyline class='st9' points='-327.3%2c261.7 -335.1%2c258.2 -335.1%2c263 -328.1%2c264.8 ' /%3e %3cpolygon class='st9' points='-333.9%2c309.6 -335.1%2c309 -335.1%2c304.9 -333.5%2c306 ' /%3e %3cpolygon class='st13' points='-333.9%2c309.6 -335.1%2c309 -335.1%2c304.9 -333.5%2c306 ' /%3e %3cpolygon class='st9' points='-111.7%2c309.6 -110.3%2c309 -110.3%2c304.9 -112.1%2c306.1 ' /%3e %3cpolyline class='st13' points='-327.3%2c261.7 -335.1%2c258.2 -335.1%2c263 -328.1%2c264.8 ' /%3e %3cpolyline class='st9' points='-118.3%2c261.7 -110.3%2c258.2 -110.3%2c263 -117.4%2c264.8 ' /%3e %3c/g%3e %3cg id='Masque_4_' class='st8'%3e %3cpath class='st14' d='M-110.3%2c257.3c0%2c0-35.6-14-60-16.4c-5.6-0.5-11.1-1.8-16.4-3.6c-12.1-4.2-32-10.7-35.9-9.8 c-3.8-0.9-23.8%2c5.6-35.9%2c9.8c-5.3%2c1.8-10.8%2c3.1-16.4%2c3.6c-24.4%2c2.4-60%2c16.4-60%2c16.4c11.5%2c72.4%2c1.4%2c107.5%2c1.4%2c107.5 c17.2%2c5.6%2c30.9%2c13%2c30.9%2c13c2%2c1.5%2c30.2%2c33.1%2c30.2%2c33.1c10.7%2c11.5%2c32.9%2c12.4%2c43.6%2c12.1c4.1-0.1%2c8.2-0.1%2c12.3%2c0 c10.8%2c0.3%2c32.9-0.7%2c43.6-12.1c0%2c0%2c28.2-31.7%2c30.2-33.1c0%2c0%2c13.8-7.4%2c30.9-13C-111.7%2c364.8-121.7%2c329.6-110.3%2c257.3z' /%3e %3cpath class='st15' d='M-126.6%2c274.3c0%2c0-36.7-16.7-51.7-14.7c0%2c0-23.2-3.3-27.8-6.9c0%2c0-11.5-4.9-16.4-4.3 c-4.9-0.7-16.4%2c4.3-16.4%2c4.3c-4.6%2c3.6-27.8%2c6.9-27.8%2c6.9c-15.1-2-51.7%2c14.7-51.7%2c14.7c7.5%2c20.3-1.6%2c84.5-1.6%2c84.5 c18.9%2c4.2%2c28.6%2c20.6%2c32.1%2c28.2c1%2c2.1%2c2.6%2c3.9%2c4.6%2c5.1c5.6%2c3.3%2c16.6%2c12.7%2c20.9%2c16.3c1.4%2c1.2%2c3.1%2c2%2c4.9%2c2.4 c9.7%2c1.9%2c35.1%2c3.4%2c35.1%2c3.4s25.4-1.5%2c35.1-3.4c1.8-0.4%2c3.5-1.2%2c4.9-2.4c4.2-3.7%2c15.2-13%2c20.9-16.3c2-1.2%2c3.6-3%2c4.6-5.1 c3.5-7.6%2c13.2-23.9%2c32.1-28.2C-125%2c358.8-134.1%2c294.6-126.6%2c274.3z' /%3e %3cpath class='st16' d='M-286.7%2c291.3c0%2c0%2c36.7%2c5.6%2c49.1-26.5c0%2c0%2c0.7-10.1-12.4%2c3.9C-250.1%2c268.8-268.1%2c285.8-286.7%2c291.3z' /%3e %3cpath class='st16' d='M-164.3%2c286.4c0%2c0-15.4-12.8-23.6-13.1c0%2c0-16.7-12.3-19.6-12.1c0%2c0-7.5%2c4.6%2c0%2c15.2c0%2c0%2c13.4%2c0.4%2c15.7%2c2.4 C-191.8%2c278.9-175.1%2c291-164.3%2c286.4z' /%3e %3cpath class='st16' d='M-314.9%2c318.2c0%2c0%2c67.8-27.5%2c92.3-24.6c0%2c0%2c43.2%2c1.6%2c92%2c24.6c0%2c0-27.5%2c7.5-50.1-9.5c0%2c0-36.3-8.5-41.9-12.8 c0%2c0-26.2%2c19.3-38%2c18.7C-260.5%2c314.6-293.6%2c322.4-314.9%2c318.2z' /%3e %3cpath class='st16' d='M-130.6%2c340.5c0%2c0-65.5%2c2-89.1%2c11.5c0%2c0-42.6-10.5-95.3-11.5c0%2c0%2c24.6%2c16.7%2c43.9%2c15.1 c0%2c0%2c21.9%2c9.2%2c24.9%2c15.1c0%2c0%2c28.2%2c10.8%2c40.6-2.3c0%2c0%2c27.5-9.2%2c29.5-13.8C-176.1%2c354.5-133.2%2c348.6-130.6%2c340.5z' /%3e %3cpath class='st16' d='M-155.1%2c368.6c0%2c0-11.8%2c28.2-67.6%2c28.2s-67.3-28.2-67.3-28.2s9.2%2c38.3%2c67.4%2c38.3S-155.1%2c368.6-155.1%2c368.6z ' /%3e %3cpath class='st17' d='M-243.2%2c295.6c0%2c0-29.6%2c6.1-66.5%2c20.3c0%2c0%2c24.6-3.6%2c26.2-4.6C-283.5%2c311.3-253.7%2c310.7-243.2%2c295.6z' /%3e %3cpath class='st17' d='M-144.3%2c312.3c0%2c0-10.1%2c3.3-24.9-5.2c0%2c0-40.6-6.2-53.4-13.4c0%2c0%2c28.3%2c2.4%2c39.1%2c6.1 c1.9%2c0.7%2c6.5%2c1.8%2c8.3%2c2.4C-166.5%2c304.9-148.7%2c310-144.3%2c312.3z' /%3e %3cpath class='st17' d='M-180.6%2c356.7c-0.2%2c0%2c3.2-2.8%2c3.2-3.4c0%2c0-14.5%2c2.6-23.7%2c7.8c0%2c0-7.7%2c0.9-5.9-1.6c0%2c0%2c14-4.1%2c15.7-6.2 c0%2c0%2c9.3-5.8%2c29.3-5.3c0%2c0%2c12.7-5.1%2c13-6.1l19.1-1.3c0%2c0-3.6%2c8.4-46.1%2c14C-176.1%2c354.5-178.5%2c356.2-180.6%2c356.7z' /%3e %3cpath class='st17' d='M-237.6%2c348.2c0%2c0-40.1-6.8-58.5-7c0%2c0-17.9-0.4-18.9-0.8c0%2c0%2c15.9%2c8.7%2c51.2%2c9.3c0%2c0%2c17.6%2c8.7%2c23.2%2c7.4 c0%2c0-10.8-6.1-9.6-7.4C-250.1%2c349.8-238.2%2c349.5-237.6%2c348.2z' /%3e %3cpath class='st17' d='M-182.9%2c390.5c0%2c0-10.3%2c4.7-10.3%2c6c0%2c0-77.4%2c16.1-96.7-27.8c0%2c0%2c6.7%2c16.5%2c35.1%2c24.4 C-254.9%2c393-218.1%2c403.1-182.9%2c390.5z' /%3e %3cg class='st18'%3e %3cg%3e %3cpath class='st19' d='M-322.1%2c256.3c0%2c0%2c0.1%2c1.1%2c0.2%2c3' /%3e %3cpath class='st20' d='M-321.4%2c265.3c1.4%2c20.8%2c4.1%2c72.2-0.7%2c92.8' /%3e %3cpath class='st19' d='M-322.9%2c360.9c-0.3%2c1.1-0.7%2c2-1.1%2c2.8' /%3e %3c/g%3e %3c/g%3e %3cpath class='st21' d='M-328.6%2c259.3c0%2c0%2c6.2%2c72%2c1.3%2c98.3' /%3e %3cpath class='st21' d='M-123.7%2c256.3c0%2c0-7.2%2c87.4%2c2.3%2c107.4' /%3e %3cpath class='st21' d='M-116.5%2c359.1c0%2c0-6.9-64.5%2c0-99.9' /%3e %3cpath class='st21' d='M-126.3%2c259.3c0%2c0-34.1-13.5-52.1-10.9c0%2c0-32.1-14-44.4-13.4c0%2c0-19.2%2c1.9-41.4%2c12.1 c0%2c0-35.7%2c2.5-52.4%2c12.1' /%3e %3cpath class='st21' d='M-312.6%2c265.2c0%2c0%2c25.5-10.8%2c53.4-11.5c0%2c0%2c37.3-20.6%2c64.2-3.6c0%2c0%2c20.6%2c7.2%2c28.2%2c6.2 c0%2c0%2c31.7%2c4.3%2c36.9%2c10.1' /%3e %3cpath class='st21' d='M-126.3%2c365c0%2c0-26.8%2c11.5-29.1%2c24.2c0%2c0-18%2c21.6-35.4%2c28.5c0%2c0-57.6%2c2.9-62.9%2c0c0%2c0-28.5-15.4-38.6-33.7 c0%2c0-16.6-18-27.1-19' /%3e %3cpath class='st17' d='M-222.6%2c414.1c0%2c0-25.4-1.5-35.1-3.4c-1.8-0.4-3.5-1.2-4.9-2.4c-4.2-3.7-15.2-13-20.9-16.3 c-2-1.2-3.6-3-4.6-5.1c-3.5-7.6-13.2-23.9-32.1-28.2c0%2c0%2c9.1-64.2%2c1.6-84.5c0%2c0%2c36.7-16.7%2c51.7-14.7c0%2c0%2c23.2-3.3%2c27.8-6.9 c0%2c0%2c3.2-1.4%2c7-2.6c0%2c0%2c3.5%2c16%2c3.5%2c18c0%2c0%2c0%2c25.5%2c0.5%2c38.4c0.1%2c4.1%2c1.1%2c8.2%2c2.8%2c11.9c4.4%2c9.6%2c12.8%2c30.3%2c3.7%2c31.4 c-3.3%2c0.4-6.3%2c2.4-7.3%2c5.6c-0.9%2c2.8-0.9%2c6.7%2c2.2%2c11.7c1.4%2c2.3%2c2.6%2c4.7%2c3.6%2c7.2c2.5%2c6.7%2c5.3%2c18-1.8%2c22.1c-0.9%2c0.5-2%2c0.8-3%2c1 C-229.4%2c397.7-232.6%2c399.9-222.6%2c414.1z' /%3e %3c/g%3e %3c/g%3e %3c/g%3e %3cg id='Calque_2_4_'%3e %3cg id='logos_3_'%3e %3cg id='Lamasque_6_' class='st8'%3e %3cpath class='st9' d='M-799.8%2c403c-0.2%2c0-0.4%2c0.1-0.6%2c0.1C-800.2%2c403-800%2c403-799.8%2c403z' /%3e %3cpath class='st9' d='M-802.1%2c403.3c-0.2%2c0-0.3%2c0-0.5%2c0.1C-802.4%2c403.3-802.2%2c403.3-802.1%2c403.3z' /%3e %3cpath class='st9' d='M-802.7%2c403.3c-0.2%2c0-0.3%2c0-0.5%2c0.1C-803.1%2c403.4-802.9%2c403.3-802.7%2c403.3z' /%3e %3cpath class='st9' d='M-777%2c396.7c-0.3%2c0.1-0.6%2c0.3-0.9%2c0.4C-777.6%2c397-777.3%2c396.8-777%2c396.7z' /%3e %3cpath class='st9' d='M-778.2%2c397.2c-0.3%2c0.1-0.5%2c0.2-0.8%2c0.3C-778.8%2c397.4-778.5%2c397.3-778.2%2c397.2z' /%3e %3cpath class='st9' d='M-779.3%2c397.6c-0.3%2c0.1-0.7%2c0.3-1%2c0.4C-779.9%2c397.9-779.6%2c397.7-779.3%2c397.6z' /%3e %3cpath class='st9' d='M-804.1%2c403.4c-0.1%2c0-0.3%2c0-0.4%2c0C-804.4%2c403.5-804.3%2c403.5-804.1%2c403.4z' /%3e %3cpath class='st9' d='M-800.6%2c403.1c-0.2%2c0-0.4%2c0-0.5%2c0.1C-800.9%2c403.1-800.7%2c403.1-800.6%2c403.1z' /%3e %3cpath class='st9' d='M-801.2%2c403.2c-0.2%2c0-0.4%2c0.1-0.7%2c0.1C-801.7%2c403.2-801.5%2c403.2-801.2%2c403.2z' /%3e %3cpath class='st9' d='M-803.4%2c403.4c-0.2%2c0-0.4%2c0-0.6%2c0.1C-803.8%2c403.4-803.6%2c403.4-803.4%2c403.4z' /%3e %3cpath class='st9' d='M-806.5%2c403.6c-0.2%2c0-0.3%2c0-0.5%2c0C-806.8%2c403.6-806.6%2c403.6-806.5%2c403.6z' /%3e %3cpath class='st9' d='M-773.4%2c395.1c-0.3%2c0.2-0.7%2c0.3-1%2c0.5C-774.1%2c395.4-773.8%2c395.3-773.4%2c395.1z' /%3e %3cpath class='st9' d='M-806.9%2c403.6c-0.1%2c0-0.3%2c0-0.4%2c0C-807.2%2c403.6-807.1%2c403.6-806.9%2c403.6z' /%3e %3cpath class='st9' d='M-807.5%2c403.6c-0.1%2c0-0.2%2c0-0.3%2c0C-807.7%2c403.6-807.6%2c403.6-807.5%2c403.6z' /%3e %3cpath class='st9' d='M-804.7%2c403.5c-0.2%2c0-0.3%2c0-0.5%2c0C-805%2c403.5-804.9%2c403.5-804.7%2c403.5z' /%3e %3cpath class='st9' d='M-805.3%2c403.5c-0.2%2c0-0.4%2c0-0.5%2c0C-805.6%2c403.6-805.4%2c403.5-805.3%2c403.5z' /%3e %3cpath class='st9' d='M-775.9%2c396.2c-0.3%2c0.1-0.7%2c0.3-1%2c0.4C-776.5%2c396.5-776.2%2c396.4-775.9%2c396.2z' /%3e %3cpath class='st9' d='M-774.8%2c395.7c-0.3%2c0.1-0.5%2c0.2-0.8%2c0.3C-775.3%2c396-775%2c395.9-774.8%2c395.7z' /%3e %3cpath class='st9' d='M-805.9%2c403.6c-0.1%2c0-0.3%2c0-0.4%2c0C-806.2%2c403.6-806.1%2c403.6-805.9%2c403.6z' /%3e %3cpath class='st9' d='M-797.3%2c402.6c-0.2%2c0-0.4%2c0.1-0.6%2c0.1C-797.8%2c402.7-797.5%2c402.6-797.3%2c402.6z' /%3e %3cpath class='st9' d='M-784.8%2c399.6c-0.3%2c0.1-0.5%2c0.2-0.8%2c0.2C-785.4%2c399.7-785.1%2c399.7-784.8%2c399.6z' /%3e %3cpath class='st9' d='M-791.8%2c401.5c-0.3%2c0.1-0.6%2c0.1-0.9%2c0.2C-792.4%2c401.6-792.1%2c401.6-791.8%2c401.5z' /%3e %3cpath class='st9' d='M-790.9%2c401.3c-0.3%2c0.1-0.6%2c0.1-0.8%2c0.2C-791.5%2c401.4-791.2%2c401.3-790.9%2c401.3z' /%3e %3cpath class='st9' d='M-792.9%2c401.7c-0.2%2c0-0.4%2c0.1-0.6%2c0.1C-793.3%2c401.8-793.1%2c401.8-792.9%2c401.7z' /%3e %3cpath class='st9' d='M-790%2c401c-0.2%2c0.1-0.4%2c0.1-0.7%2c0.2C-790.5%2c401.2-790.2%2c401.1-790%2c401z' /%3e %3cpath class='st9' d='M-788.9%2c400.8c-0.3%2c0.1-0.6%2c0.2-0.9%2c0.2C-789.5%2c400.9-789.2%2c400.8-788.9%2c400.8z' /%3e %3cpath class='st9' d='M-788%2c400.5c-0.3%2c0.1-0.5%2c0.1-0.8%2c0.2C-788.5%2c400.6-788.2%2c400.6-788%2c400.5z' /%3e %3cpath class='st9' d='M-783.8%2c399.2c-0.3%2c0.1-0.5%2c0.2-0.8%2c0.2C-784.3%2c399.4-784%2c399.3-783.8%2c399.2z' /%3e %3cpath class='st9' d='M-785.8%2c399.9c-0.3%2c0.1-0.6%2c0.2-0.9%2c0.3C-786.4%2c400.1-786.1%2c400-785.8%2c399.9z' /%3e %3cpath class='st9' d='M-782.6%2c398.8c-0.3%2c0.1-0.7%2c0.2-1%2c0.3C-783.2%2c399-782.9%2c398.9-782.6%2c398.8z' /%3e %3cpath class='st9' d='M-772.3%2c394.6c-0.4%2c0.2-0.7%2c0.3-1.1%2c0.5C-773.1%2c395-772.7%2c394.8-772.3%2c394.6z' /%3e %3cpath class='st9' d='M-798.2%2c402.7c-0.2%2c0-0.4%2c0.1-0.6%2c0.1C-798.6%2c402.8-798.4%2c402.8-798.2%2c402.7z' /%3e %3cpath class='st9' d='M-781.6%2c398.5c-0.3%2c0.1-0.5%2c0.2-0.8%2c0.3C-782.1%2c398.7-781.8%2c398.6-781.6%2c398.5z' /%3e %3cpath class='st9' d='M-780.5%2c398.1c-0.3%2c0.1-0.6%2c0.2-0.8%2c0.3C-781%2c398.3-780.7%2c398.2-780.5%2c398.1z' /%3e %3cpath class='st9' d='M-795.6%2c402.3c-0.2%2c0-0.4%2c0.1-0.6%2c0.1C-796%2c402.4-795.8%2c402.3-795.6%2c402.3z' /%3e %3cpath class='st9' d='M-796.4%2c402.4c-0.3%2c0-0.5%2c0.1-0.8%2c0.1C-797%2c402.5-796.7%2c402.5-796.4%2c402.4z' /%3e %3cpath class='st9' d='M-787%2c400.2c-0.2%2c0.1-0.5%2c0.1-0.7%2c0.2C-787.4%2c400.4-787.2%2c400.3-787%2c400.2z' /%3e %3cpath class='st9' d='M-798.9%2c402.9c-0.2%2c0-0.5%2c0.1-0.7%2c0.1C-799.4%2c402.9-799.2%2c402.9-798.9%2c402.9z' /%3e %3cpath class='st9' d='M-793.8%2c401.9c-0.3%2c0.1-0.5%2c0.1-0.8%2c0.2C-794.3%2c402-794%2c402-793.8%2c401.9z' /%3e %3cpath class='st9' d='M-794.7%2c402.1c-0.2%2c0-0.5%2c0.1-0.7%2c0.1C-795.2%2c402.2-794.9%2c402.2-794.7%2c402.1z' /%3e %3cpath class='st9' d='M-765.1%2c390.8c-0.3%2c0.2-0.6%2c0.4-0.9%2c0.5C-765.7%2c391.1-765.4%2c391-765.1%2c390.8z' /%3e %3cpath class='st9' d='M-811.2%2c403.6c0%2c0-0.1%2c0-0.1%2c0C-811.2%2c403.6-811.2%2c403.6-811.2%2c403.6z' /%3e %3cpath class='st9' d='M-811%2c403.6c-0.1%2c0-0.1%2c0-0.2%2c0C-811.1%2c403.6-811%2c403.6-811%2c403.6z' /%3e %3cpath class='st9' d='M-811.3%2c403.6C-811.3%2c403.6-811.4%2c403.6-811.3%2c403.6C-811.4%2c403.6-811.3%2c403.6-811.3%2c403.6z' /%3e %3cpath class='st9' d='M-766.2%2c391.4c-0.4%2c0.2-0.7%2c0.4-1.1%2c0.6C-766.9%2c391.8-766.6%2c391.6-766.2%2c391.4z' /%3e %3cpath class='st9' d='M-810.8%2c403.6c-0.1%2c0-0.1%2c0-0.2%2c0C-810.9%2c403.6-810.8%2c403.6-810.8%2c403.6z' /%3e %3cpath class='st9' d='M-810.5%2c403.7c-0.1%2c0-0.1%2c0-0.2%2c0C-810.7%2c403.7-810.6%2c403.7-810.5%2c403.7z' /%3e %3cpath class='st9' d='M-810.2%2c403.7c-0.1%2c0-0.2%2c0-0.2%2c0C-810.4%2c403.7-810.3%2c403.7-810.2%2c403.7z' /%3e %3cpath class='st9' d='M-767.6%2c392.2c-0.3%2c0.2-0.6%2c0.3-0.8%2c0.4C-768.2%2c392.5-767.9%2c392.3-767.6%2c392.2z' /%3e %3cpath class='st9' d='M-761.4%2c388.5c-0.3%2c0.2-0.6%2c0.4-0.9%2c0.6C-762%2c388.9-761.7%2c388.7-761.4%2c388.5z' /%3e %3cpath class='st9' d='M-762.5%2c389.2c-0.4%2c0.2-0.7%2c0.5-1.1%2c0.7C-763.3%2c389.7-762.9%2c389.5-762.5%2c389.2z' /%3e %3cpath class='st9' d='M-707.1%2c261.7c0%2c0-15.8%2c3.8-52.5-37.2c0%2c0-6.6-5.9-8.1-5.9c0%2c0-15-11.6-43.9-11.6s-43.9%2c11.6-43.9%2c11.6 s-1.9%2c7.8-3.3%2c20.1c3.7-2.6%2c7.7-5.3%2c10.9-7.6c6.9-4.9%2c15-8%2c23.1-10.4c4.5-1.3%2c9.2-2.3%2c13.2-2.3s8.7%2c1%2c13.2%2c2.3 c8.2%2c2.4%2c16.2%2c5.5%2c23.1%2c10.4c7.7%2c5.5%2c19.6%2c13.6%2c22.9%2c15.9c0.8%2c0.5%2c1.3%2c1.5%2c1.2%2c2.4c-0.1%2c1-0.8%2c1.5-1.5%2c1.7c-1%2c0.3-2.1%2c0-2.9-0.6 l-20.2-14.5c-15.6-12.2-35.8-13.4-35.8-13.4s-20.2%2c1.2-35.8%2c13.4l-12%2c8.6c-1.1%2c12.6-1.5%2c28.6%2c0.8%2c45.3c11.9%2c3.4%2c25.8%2c6%2c39.6%2c5.9 c4.9%2c0%2c9.8%2c0%2c14.8%2c0c32.3%2c0.3%2c64.7-14.5%2c72.3-18.2c1.5-0.7%2c3.1-1.1%2c4.7-1c3.9%2c0.2%2c5%2c2.2%2c5.1%2c4.2c0.2%2c2.3-0.9%2c4.5-2.8%2c5.8 c-7.1%2c5.1-19.9%2c9.2-33.6%2c12.3c-32.3%2c7.4-65.8%2c7.9-98.3%2c1.7c1.7%2c8.1%2c4%2c16.2%2c7.3%2c24.1c9.6%2c2.2%2c20%2c3.6%2c30.5%2c3.5c4.9%2c0%2c9.8%2c0%2c14.8%2c0 c32.3%2c0.3%2c64.7-14.5%2c72.3-18.2c1.5-0.7%2c3.1-1.1%2c4.7-1c3.9%2c0.2%2c5%2c2.2%2c5.1%2c4.2c0.2%2c2.3-0.9%2c4.5-2.8%2c5.8 c-7.1%2c5.1-19.9%2c9.2-33.6%2c12.3c-28.3%2c6.5-57.5%2c7.7-86.1%2c3.7c5.2%2c9.7%2c12.1%2c18.7%2c20.9%2c26.6c2.8%2c0.2%2c5.7%2c0.3%2c8.6%2c0.3 c2.3%2c0%2c4.6%2c0%2c6.9%2c0c25.4%2c0.2%2c49.5-10.1%2c55.4-12.8c1.4-0.6%2c2.9-1.1%2c4.4-1.2c5-0.5%2c6%2c2%2c5.9%2c4.6c-0.2%2c2.9-1.9%2c5.4-4.5%2c6.7 c-5.5%2c2.7-12.7%2c4.9-20.3%2c6.8c-14.4%2c3.4-29%2c5.2-43.7%2c5.2c13%2c8.2%2c29.4%2c14.4%2c49.8%2c17.3c12.8-8.2%2c26.2-20.8%2c37.9-40.1 c0.4-0.7%2c0.9-1.5%2c1.2-2.3c2.8-5.5%2c15.1-29.9%2c21.6-36.4C-700.5%2c309.6-705.8%2c262.7-707.1%2c261.7z M-771.6%2c266.2 c-3.1%2c2-8%2c3.6-13.3%2c4.9c-17.2%2c4.2-35.2%2c4.2-52.4%2c0.2c-5.6-1.3-10.8-3-14.1-5c-2.3-1.4-3.6-4.1-3.3-6.8c0.3-2%2c1.4-3.9%2c4.8-4.1 c1.6-0.1%2c3.1%2c0.3%2c4.5%2c1c4%2c2%2c16.7%2c7.7%2c34%2c7.2c17.3%2c0.4%2c29.9-5.2%2c34-7.3c1.5-0.7%2c3.1-1.1%2c4.8-1c3.2%2c0.3%2c4.2%2c2.1%2c4.5%2c4 C-768%2c262.1-769.3%2c264.7-771.6%2c266.2z' /%3e %3cpath class='st9' d='M-811.5%2c403.6C-811.5%2c403.6-811.5%2c403.6-811.5%2c403.6C-811.5%2c403.6-811.5%2c403.6-811.5%2c403.6z' /%3e %3cpath class='st9' d='M-811.6%2c403.6C-811.6%2c403.6-811.6%2c403.6-811.6%2c403.6C-811.6%2c403.6-811.6%2c403.6-811.6%2c403.6z' /%3e %3cpath class='st9' d='M-811.4%2c403.6C-811.4%2c403.6-811.5%2c403.6-811.4%2c403.6C-811.5%2c403.6-811.4%2c403.6-811.4%2c403.6z' /%3e %3cpath class='st9' d='M-763.9%2c390.1c-0.3%2c0.2-0.6%2c0.3-0.9%2c0.5C-764.5%2c390.4-764.2%2c390.2-763.9%2c390.1z' /%3e %3cpath class='st9' d='M-769.8%2c393.4c-0.4%2c0.2-0.7%2c0.4-1.1%2c0.5C-770.6%2c393.7-770.2%2c393.6-769.8%2c393.4z' /%3e %3cpath class='st9' d='M-808%2c403.7c-0.1%2c0-0.3%2c0-0.4%2c0C-808.2%2c403.7-808.1%2c403.7-808%2c403.7z' /%3e %3cpath class='st9' d='M-808.4%2c403.7c-0.1%2c0-0.2%2c0-0.3%2c0C-808.6%2c403.7-808.5%2c403.7-808.4%2c403.7z' /%3e %3cpath class='st9' d='M-808.9%2c403.7c-0.1%2c0-0.2%2c0-0.3%2c0C-809.1%2c403.7-809%2c403.7-808.9%2c403.7z' /%3e %3cpath class='st9' d='M-809.2%2c403.7c-0.1%2c0-0.2%2c0-0.3%2c0C-809.4%2c403.7-809.3%2c403.7-809.2%2c403.7z' /%3e %3cpath class='st9' d='M-809.6%2c403.7c-0.1%2c0-0.2%2c0-0.2%2c0C-809.8%2c403.7-809.7%2c403.7-809.6%2c403.7z' /%3e %3cpath class='st9' d='M-771.2%2c394.1c-0.3%2c0.1-0.5%2c0.3-0.8%2c0.4C-771.8%2c394.3-771.5%2c394.2-771.2%2c394.1z' /%3e %3cpath class='st9' d='M-768.8%2c392.8c-0.3%2c0.2-0.7%2c0.3-1%2c0.5C-769.4%2c393.2-769.1%2c393-768.8%2c392.8z' /%3e %3cpath class='st9' d='M-810%2c403.7c-0.1%2c0-0.1%2c0-0.2%2c0C-810.1%2c403.7-810%2c403.7-810%2c403.7z' /%3e %3cpath class='st10' d='M-847.4%2c236.1c15.6-12.2%2c35.8-13.4%2c35.8-13.4s20.2%2c1.2%2c35.8%2c13.4l20.2%2c14.5c0.8%2c0.6%2c1.9%2c0.8%2c2.9%2c0.6 c0.7-0.2%2c1.4-0.7%2c1.5-1.7c0.1-1-0.4-1.9-1.2-2.4c-3.3-2.3-15.2-10.4-22.9-15.9c-6.9-4.9-15-8-23.1-10.4 c-4.5-1.3-9.2-2.3-13.2-2.3s-8.7%2c1-13.2%2c2.3c-8.2%2c2.4-16.2%2c5.5-23.1%2c10.4c-3.2%2c2.3-7.1%2c5-10.9%2c7.6c-0.2%2c1.9-0.4%2c3.9-0.6%2c5.9 L-847.4%2c236.1z' /%3e %3cpath class='st11' d='M-772.8%2c255.4c-1.6-0.1-3.3%2c0.2-4.8%2c1c-4%2c2-16.7%2c7.7-34%2c7.3c-17.2%2c0.4-29.9-5.2-34-7.2 c-1.4-0.7-2.9-1.1-4.5-1c-3.4%2c0.2-4.5%2c2.1-4.8%2c4.1c-0.4%2c2.7%2c1%2c5.3%2c3.3%2c6.8c3.3%2c2%2c8.5%2c3.7%2c14.1%2c5c17.2%2c4.1%2c35.2%2c4%2c52.4-0.2 c5.3-1.3%2c10.2-2.9%2c13.3-4.9c2.3-1.4%2c3.6-4.1%2c3.3-6.8C-768.6%2c257.5-769.7%2c255.6-772.8%2c255.4z' /%3e %3cpath class='st11' d='M-758.4%2c299c13.7-3.1%2c26.5-7.2%2c33.6-12.3c1.9-1.3%2c3-3.5%2c2.8-5.8c-0.2-2-1.3-4-5.1-4.2 c-1.6-0.1-3.2%2c0.3-4.7%2c1c-7.6%2c3.7-40%2c18.5-72.3%2c18.2c-4.9%2c0-9.8%2c0-14.8%2c0c-13.8%2c0.1-27.7-2.5-39.6-5.9c0.5%2c3.5%2c1.1%2c7.1%2c1.8%2c10.6 C-824.2%2c306.9-790.7%2c306.3-758.4%2c299z' /%3e %3cpath class='st12' d='M-758.4%2c331.3c13.7-3.1%2c26.5-7.2%2c33.6-12.3c1.9-1.3%2c3-3.5%2c2.8-5.8c-0.2-2-1.3-4-5.1-4.2 c-1.6-0.1-3.2%2c0.3-4.7%2c1c-7.6%2c3.7-40%2c18.5-72.3%2c18.2c-4.9%2c0-9.8%2c0-14.8%2c0c-10.4%2c0.1-20.9-1.4-30.5-3.5c1.5%2c3.5%2c3.1%2c6.9%2c4.9%2c10.3 C-815.9%2c339-786.7%2c337.8-758.4%2c331.3z' /%3e %3cpath class='st12' d='M-767.3%2c365.9c7.6-1.8%2c14.8-4%2c20.3-6.8c2.6-1.3%2c4.3-3.8%2c4.5-6.7c0.2-2.6-0.9-5.1-5.9-4.6 c-1.5%2c0.2-3%2c0.6-4.4%2c1.2c-6%2c2.7-30%2c13-55.4%2c12.8c-2.3%2c0-4.6%2c0-6.9%2c0c-2.9%2c0-5.8-0.1-8.6-0.3c3.8%2c3.4%2c8%2c6.6%2c12.6%2c9.5 C-796.3%2c371.1-781.6%2c369.4-767.3%2c365.9z' /%3e %3cpath class='st13' d='M-772%2c394.5c-0.1%2c0-0.2%2c0.1-0.3%2c0.1C-772.2%2c394.6-772.1%2c394.5-772%2c394.5z' /%3e %3cpath class='st13' d='M-783.6%2c399.2c-0.1%2c0-0.1%2c0-0.2%2c0.1C-783.7%2c399.2-783.6%2c399.2-783.6%2c399.2z' /%3e %3cpath class='st13' d='M-761.2%2c388.4C-761.2%2c388.4-761.2%2c388.4-761.2%2c388.4c-0.1%2c0-0.1%2c0.1-0.2%2c0.1 C-761.3%2c388.5-761.3%2c388.4-761.2%2c388.4z' /%3e %3cpath class='st13' d='M-784.5%2c399.5c-0.1%2c0-0.2%2c0.1-0.3%2c0.1C-784.7%2c399.5-784.6%2c399.5-784.5%2c399.5z' /%3e %3cpath class='st13' d='M-773.4%2c395.1C-773.4%2c395.1-773.4%2c395.1-773.4%2c395.1C-773.4%2c395.1-773.4%2c395.1-773.4%2c395.1z' /%3e %3cpath class='st13' d='M-785.6%2c399.8c-0.1%2c0-0.1%2c0-0.2%2c0.1C-785.7%2c399.8-785.7%2c399.8-785.6%2c399.8z' /%3e %3cpath class='st13' d='M-786.7%2c400.1c-0.1%2c0-0.2%2c0-0.2%2c0.1C-786.9%2c400.2-786.8%2c400.2-786.7%2c400.1z' /%3e %3cpath class='st13' d='M-763.6%2c389.9c-0.1%2c0.1-0.2%2c0.1-0.3%2c0.2C-763.8%2c390-763.7%2c390-763.6%2c389.9z' /%3e %3cpath class='st13' d='M-774.5%2c395.6c-0.1%2c0-0.2%2c0.1-0.3%2c0.1C-774.7%2c395.7-774.6%2c395.6-774.5%2c395.6z' /%3e %3cpath class='st13' d='M-779%2c397.5c-0.1%2c0-0.2%2c0.1-0.3%2c0.1C-779.2%2c397.6-779.1%2c397.5-779%2c397.5z' /%3e %3cpath class='st13' d='M-767.3%2c392c-0.1%2c0.1-0.2%2c0.1-0.3%2c0.2C-767.5%2c392.1-767.4%2c392.1-767.3%2c392z' /%3e %3cpath class='st13' d='M-769.7%2c393.3C-769.8%2c393.3-769.8%2c393.4-769.7%2c393.3C-769.8%2c393.4-769.8%2c393.3-769.7%2c393.3z' /%3e %3cpath class='st13' d='M-776.9%2c396.7c0%2c0-0.1%2c0-0.1%2c0.1C-777%2c396.7-776.9%2c396.7-776.9%2c396.7z' /%3e %3cpath class='st13' d='M-768.4%2c392.6c-0.1%2c0.1-0.2%2c0.1-0.3%2c0.2C-768.6%2c392.8-768.5%2c392.7-768.4%2c392.6z' /%3e %3cpath class='st13' d='M-777.9%2c397.1c-0.1%2c0-0.2%2c0.1-0.3%2c0.1C-778.1%2c397.2-778%2c397.1-777.9%2c397.1z' /%3e %3cpath class='st13' d='M-780.3%2c398c-0.1%2c0-0.1%2c0-0.2%2c0.1C-780.4%2c398-780.3%2c398-780.3%2c398z' /%3e %3cpath class='st13' d='M-775.6%2c396.1c-0.1%2c0-0.2%2c0.1-0.3%2c0.1C-775.8%2c396.2-775.7%2c396.1-775.6%2c396.1z' /%3e %3cpath class='st13' d='M-764.8%2c390.6c-0.1%2c0.1-0.2%2c0.1-0.3%2c0.2C-765%2c390.7-764.9%2c390.6-764.8%2c390.6z' /%3e %3cpath class='st13' d='M-782.4%2c398.7c-0.1%2c0-0.1%2c0.1-0.2%2c0.1C-782.5%2c398.8-782.4%2c398.8-782.4%2c398.7z' /%3e %3cpath class='st13' d='M-770.9%2c393.9c-0.1%2c0-0.2%2c0.1-0.3%2c0.1C-771.1%2c394-771%2c394-770.9%2c393.9z' /%3e %3cpath class='st13' d='M-766%2c391.3c-0.1%2c0-0.1%2c0.1-0.2%2c0.1C-766.2%2c391.4-766.1%2c391.3-766%2c391.3z' /%3e %3cpath class='st13' d='M-781.3%2c398.4c-0.1%2c0-0.2%2c0.1-0.3%2c0.1C-781.5%2c398.4-781.4%2c398.4-781.3%2c398.4z' /%3e %3cpath class='st13' d='M-762.3%2c389.1c-0.1%2c0-0.2%2c0.1-0.2%2c0.1C-762.5%2c389.2-762.4%2c389.1-762.3%2c389.1z' /%3e %3cpath class='st13' d='M-807.8%2c403.7c0%2c0-0.1%2c0-0.1%2c0C-807.9%2c403.7-807.9%2c403.7-807.8%2c403.7z' /%3e %3cpath class='st13' d='M-787.7%2c400.4c-0.1%2c0-0.2%2c0.1-0.3%2c0.1C-787.9%2c400.5-787.8%2c400.4-787.7%2c400.4z' /%3e %3cpath class='st13' d='M-809.9%2c403.7C-809.9%2c403.7-809.9%2c403.7-809.9%2c403.7C-809.9%2c403.7-809.9%2c403.7-809.9%2c403.7z' /%3e %3cpath class='st13' d='M-809.1%2c403.7C-809.2%2c403.7-809.2%2c403.7-809.1%2c403.7C-809.2%2c403.7-809.2%2c403.7-809.1%2c403.7z' /%3e %3cpath class='st13' d='M-809.6%2c403.7C-809.6%2c403.7-809.6%2c403.7-809.6%2c403.7C-809.6%2c403.7-809.6%2c403.7-809.6%2c403.7z' /%3e %3cpath class='st13' d='M-808.8%2c403.7c0%2c0-0.1%2c0-0.1%2c0C-808.8%2c403.7-808.8%2c403.7-808.8%2c403.7z' /%3e %3cpath class='st13' d='M-806.3%2c403.6c0%2c0-0.1%2c0-0.1%2c0C-806.4%2c403.6-806.4%2c403.6-806.3%2c403.6z' /%3e %3cpath class='st13' d='M-805.8%2c403.6c0%2c0-0.1%2c0-0.1%2c0C-805.9%2c403.6-805.8%2c403.6-805.8%2c403.6z' /%3e %3cpath class='st13' d='M-806.9%2c403.6C-806.9%2c403.6-806.9%2c403.6-806.9%2c403.6C-806.9%2c403.6-806.9%2c403.6-806.9%2c403.6z' /%3e %3cpath class='st13' d='M-807.4%2c403.6c0%2c0-0.1%2c0-0.1%2c0C-807.5%2c403.6-807.4%2c403.6-807.4%2c403.6z' /%3e %3cpath class='st13' d='M-811.4%2c403.6C-811.4%2c403.6-811.4%2c403.6-811.4%2c403.6C-811.4%2c403.6-811.4%2c403.6-811.4%2c403.6z' /%3e %3cpath class='st13' d='M-811.5%2c403.6C-811.5%2c403.6-811.5%2c403.6-811.5%2c403.6C-811.5%2c403.6-811.5%2c403.6-811.5%2c403.6z' /%3e %3cpath class='st13' d='M-811.3%2c403.6C-811.3%2c403.6-811.3%2c403.6-811.3%2c403.6C-811.3%2c403.6-811.3%2c403.6-811.3%2c403.6z' /%3e %3cpath class='st13' d='M-810.2%2c403.7C-810.2%2c403.7-810.2%2c403.7-810.2%2c403.7C-810.2%2c403.7-810.2%2c403.7-810.2%2c403.7z' /%3e %3cpath class='st13' d='M-811.5%2c403.6C-811.5%2c403.6-811.5%2c403.6-811.5%2c403.6C-811.5%2c403.6-811.5%2c403.6-811.5%2c403.6z' /%3e %3cpath class='st13' d='M-805.2%2c403.5C-805.2%2c403.5-805.2%2c403.5-805.2%2c403.5C-805.2%2c403.5-805.2%2c403.5-805.2%2c403.5z' /%3e %3cpath class='st13' d='M-810.7%2c403.6C-810.7%2c403.6-810.8%2c403.6-810.7%2c403.6C-810.8%2c403.6-810.7%2c403.6-810.7%2c403.6z' /%3e %3cpath class='st13' d='M-810.5%2c403.7C-810.5%2c403.7-810.5%2c403.7-810.5%2c403.7C-810.5%2c403.7-810.5%2c403.7-810.5%2c403.7z' /%3e %3cpath class='st13' d='M-810.9%2c403.6C-810.9%2c403.6-811%2c403.6-810.9%2c403.6C-811%2c403.6-810.9%2c403.6-810.9%2c403.6z' /%3e %3cpath class='st13' d='M-811.1%2c403.6C-811.1%2c403.6-811.2%2c403.6-811.1%2c403.6C-811.2%2c403.6-811.1%2c403.6-811.1%2c403.6z' /%3e %3cpath class='st13' d='M-808.4%2c403.7C-808.4%2c403.7-808.4%2c403.7-808.4%2c403.7C-808.4%2c403.7-808.4%2c403.7-808.4%2c403.7z' /%3e %3cpath class='st13' d='M-804.5%2c403.5c-0.1%2c0-0.1%2c0-0.2%2c0C-804.7%2c403.5-804.6%2c403.5-804.5%2c403.5z' /%3e %3cpath class='st13' d='M-794.6%2c402.1C-794.6%2c402.1-794.6%2c402.1-794.6%2c402.1C-794.6%2c402.1-794.6%2c402.1-794.6%2c402.1z' /%3e %3cpath class='st13' d='M-792.7%2c401.7c-0.1%2c0-0.2%2c0-0.2%2c0.1C-792.8%2c401.7-792.7%2c401.7-792.7%2c401.7z' /%3e %3cpath class='st13' d='M-795.4%2c402.3c-0.1%2c0-0.2%2c0-0.2%2c0C-795.6%2c402.3-795.5%2c402.3-795.4%2c402.3z' /%3e %3cpath class='st13' d='M-796.2%2c402.4c-0.1%2c0-0.1%2c0-0.2%2c0C-796.4%2c402.4-796.3%2c402.4-796.2%2c402.4z' /%3e %3cpath class='st13' d='M-790.7%2c401.2c-0.1%2c0-0.2%2c0-0.3%2c0.1C-790.8%2c401.3-790.8%2c401.2-790.7%2c401.2z' /%3e %3cpath class='st13' d='M-788.8%2c400.7c0%2c0-0.1%2c0-0.1%2c0C-788.8%2c400.7-788.8%2c400.7-788.8%2c400.7z' /%3e %3cpath class='st13' d='M-789.8%2c401c-0.1%2c0-0.2%2c0-0.2%2c0.1C-789.9%2c401-789.8%2c401-789.8%2c401z' /%3e %3cpath class='st13' d='M-797.2%2c402.6c0%2c0-0.1%2c0-0.1%2c0C-797.3%2c402.6-797.2%2c402.6-797.2%2c402.6z' /%3e %3cpath class='st13' d='M-791.8%2c401.5C-791.8%2c401.5-791.8%2c401.5-791.8%2c401.5C-791.8%2c401.5-791.8%2c401.5-791.8%2c401.5z' /%3e %3cpath class='st13' d='M-793.5%2c401.9c-0.1%2c0-0.2%2c0-0.2%2c0C-793.7%2c401.9-793.6%2c401.9-793.5%2c401.9z' /%3e %3cpath class='st13' d='M-803.3%2c403.4C-803.3%2c403.4-803.3%2c403.4-803.3%2c403.4C-803.3%2c403.4-803.3%2c403.4-803.3%2c403.4z' /%3e %3cpath class='st13' d='M-802.5%2c403.3c-0.1%2c0-0.1%2c0-0.2%2c0C-802.7%2c403.3-802.6%2c403.3-802.5%2c403.3z' /%3e %3cpath class='st13' d='M-801.9%2c403.2c-0.1%2c0-0.1%2c0-0.2%2c0C-802%2c403.2-802%2c403.2-801.9%2c403.2z' /%3e %3cpath class='st13' d='M-803.9%2c403.4c-0.1%2c0-0.1%2c0-0.2%2c0C-804.1%2c403.4-804%2c403.4-803.9%2c403.4z' /%3e %3cpath class='st13' d='M-798%2c402.7c-0.1%2c0-0.1%2c0-0.2%2c0C-798.1%2c402.7-798%2c402.7-798%2c402.7z' /%3e %3cpath class='st13' d='M-798.8%2c402.8c-0.1%2c0-0.1%2c0-0.2%2c0C-798.9%2c402.8-798.8%2c402.8-798.8%2c402.8z' /%3e %3cpath class='st13' d='M-801.1%2c403.1c0%2c0-0.1%2c0-0.1%2c0C-801.2%2c403.2-801.2%2c403.1-801.1%2c403.1z' /%3e %3cpath class='st13' d='M-799.6%2c403c-0.1%2c0-0.1%2c0-0.2%2c0C-799.7%2c403-799.7%2c403-799.6%2c403z' /%3e %3cpath class='st13' d='M-800.4%2c403c-0.1%2c0-0.1%2c0-0.2%2c0C-800.5%2c403.1-800.4%2c403.1-800.4%2c403z' /%3e %3cpath class='st9' d='M-855.9%2c365.9c-7.6-1.8-14.8-4-20.3-6.7c-2.7-1.3-4.5-4-4.6-6.9c-0.1-2.5%2c1.1-4.8%2c5.9-4.3 c1.5%2c0.2%2c3%2c0.6%2c4.4%2c1.2c5.3%2c2.4%2c24.8%2c10.8%2c46.8%2c12.5c-8.9-7.9-15.7-17-20.9-26.6c-6.8-0.9-13.5-2.2-20.2-3.7 c-13.7-3.1-26.5-7.2-33.6-12.3c-1.9-1.3-3-3.5-2.8-5.8c0.2-2%2c1.3-4%2c5.1-4.2c1.6-0.1%2c3.2%2c0.3%2c4.7%2c1c5.1%2c2.5%2c21.6%2c10.1%2c41.8%2c14.7 c-3.3-7.9-5.6-16-7.3-24.1c-2.7-0.5-5.3-1.1-8-1.7c-13.7-3.1-26.5-7.2-33.6-12.3c-1.9-1.3-3-3.5-2.8-5.8c0.2-2%2c1.3-4%2c5.1-4.2 c1.6-0.1%2c3.2%2c0.3%2c4.7%2c1c4.3%2c2.1%2c16.8%2c7.9%2c32.7%2c12.3c-2.3-16.7-1.9-32.7-0.8-45.3l-8.2%2c5.9c-0.8%2c0.6-1.9%2c0.8-2.9%2c0.6 c-0.7-0.2-1.4-0.7-1.5-1.7c-0.1-0.9%2c0.4-1.9%2c1.2-2.4c1.9-1.3%2c6.8-4.6%2c12-8.3c1.4-12.3%2c3.3-20.1%2c3.3-20.1c-1.5%2c0-8.1%2c5.9-8.1%2c5.9 c-36.7%2c41-52.5%2c37.2-52.5%2c37.2c-1.3%2c1-6.6%2c47.9-6.6%2c47.9c6.5%2c6.5%2c18.8%2c30.8%2c21.6%2c36.4c0.4%2c0.8%2c0.8%2c1.5%2c1.2%2c2.3 c36.3%2c59.6%2c88.3%2c55.4%2c88.3%2c55.4s0%2c0%2c0%2c0c0%2c0%2c0%2c0%2c0%2c0c0%2c0%2c0%2c0%2c0%2c0c0%2c0%2c0%2c0%2c0%2c0c0%2c0%2c0%2c0%2c0.1%2c0c0%2c0%2c0%2c0%2c0%2c0c0%2c0%2c0.1%2c0%2c0.1%2c0 c0%2c0%2c0%2c0%2c0%2c0c0%2c0%2c0.1%2c0%2c0.1%2c0c0%2c0%2c0%2c0%2c0%2c0c0.1%2c0%2c0.1%2c0%2c0.2%2c0c0%2c0%2c0%2c0%2c0%2c0c0%2c0%2c0.1%2c0%2c0.2%2c0c0%2c0%2c0%2c0%2c0.1%2c0c0.1%2c0%2c0.1%2c0%2c0.2%2c0 c0%2c0%2c0%2c0%2c0.1%2c0c0.1%2c0%2c0.2%2c0%2c0.2%2c0c0%2c0%2c0%2c0%2c0.1%2c0c0.1%2c0%2c0.1%2c0%2c0.2%2c0c0%2c0%2c0.1%2c0%2c0.1%2c0c0.1%2c0%2c0.2%2c0%2c0.2%2c0c0%2c0%2c0%2c0%2c0.1%2c0 c0.1%2c0%2c0.2%2c0%2c0.3%2c0c0%2c0%2c0.1%2c0%2c0.1%2c0c0.1%2c0%2c0.2%2c0%2c0.3%2c0c0%2c0%2c0.1%2c0%2c0.1%2c0c0.1%2c0%2c0.2%2c0%2c0.3%2c0c0%2c0%2c0%2c0%2c0.1%2c0c0.1%2c0%2c0.3%2c0%2c0.4%2c0 c0%2c0%2c0.1%2c0%2c0.1%2c0c0.1%2c0%2c0.2%2c0%2c0.3%2c0c0%2c0%2c0.1%2c0%2c0.1%2c0c0.1%2c0%2c0.3%2c0%2c0.4%2c0c0%2c0%2c0%2c0%2c0%2c0c0.2%2c0%2c0.3%2c0%2c0.5%2c0c0%2c0%2c0.1%2c0%2c0.1%2c0 c0.1%2c0%2c0.3%2c0%2c0.4%2c0c0%2c0%2c0.1%2c0%2c0.1%2c0c0.2%2c0%2c0.3%2c0%2c0.5%2c0c0%2c0%2c0%2c0%2c0%2c0c0.2%2c0%2c0.3%2c0%2c0.5%2c0c0.1%2c0%2c0.1%2c0%2c0.2%2c0c0.1%2c0%2c0.3%2c0%2c0.4%2c0 c0.1%2c0%2c0.1%2c0%2c0.2%2c0c0.2%2c0%2c0.4%2c0%2c0.6-0.1c0%2c0%2c0.1%2c0%2c0.1%2c0c0.2%2c0%2c0.3%2c0%2c0.5-0.1c0.1%2c0%2c0.1%2c0%2c0.2%2c0c0.2%2c0%2c0.3%2c0%2c0.5-0.1 c0.1%2c0%2c0.1%2c0%2c0.2%2c0c0.2%2c0%2c0.4%2c0%2c0.7-0.1c0%2c0%2c0.1%2c0%2c0.1%2c0c0.2%2c0%2c0.4%2c0%2c0.5-0.1c0.1%2c0%2c0.1%2c0%2c0.2%2c0c0.2%2c0%2c0.4%2c0%2c0.6-0.1 c0.1%2c0%2c0.1%2c0%2c0.2%2c0c0.2%2c0%2c0.5-0.1%2c0.7-0.1c0.1%2c0%2c0.1%2c0%2c0.2%2c0c0.2%2c0%2c0.4-0.1%2c0.6-0.1c0.1%2c0%2c0.1%2c0%2c0.2%2c0c0.2%2c0%2c0.4-0.1%2c0.6-0.1 c0%2c0%2c0.1%2c0%2c0.1%2c0c0.3%2c0%2c0.5-0.1%2c0.8-0.1c0.1%2c0%2c0.1%2c0%2c0.2%2c0c0.2%2c0%2c0.4-0.1%2c0.6-0.1c0.1%2c0%2c0.2%2c0%2c0.2%2c0c0.2%2c0%2c0.5-0.1%2c0.7-0.1 c0%2c0%2c0%2c0%2c0.1%2c0c0.3-0.1%2c0.5-0.1%2c0.8-0.2c0.1%2c0%2c0.2%2c0%2c0.2%2c0c0.2%2c0%2c0.4-0.1%2c0.6-0.1c0.1%2c0%2c0.2%2c0%2c0.2-0.1c0.3-0.1%2c0.6-0.1%2c0.9-0.2 c0%2c0%2c0%2c0%2c0%2c0c0.3-0.1%2c0.6-0.1%2c0.8-0.2c0.1%2c0%2c0.2%2c0%2c0.3-0.1c0.2-0.1%2c0.4-0.1%2c0.7-0.2c0.1%2c0%2c0.2%2c0%2c0.2-0.1c0.3-0.1%2c0.6-0.2%2c0.9-0.2 c0%2c0%2c0.1%2c0%2c0.1%2c0c0.3-0.1%2c0.5-0.1%2c0.8-0.2c0.1%2c0%2c0.2-0.1%2c0.3-0.1c0.2-0.1%2c0.5-0.1%2c0.7-0.2c0.1%2c0%2c0.2%2c0%2c0.2-0.1 c0.3-0.1%2c0.6-0.2%2c0.9-0.3c0.1%2c0%2c0.1%2c0%2c0.2-0.1c0.3-0.1%2c0.5-0.2%2c0.8-0.2c0.1%2c0%2c0.2-0.1%2c0.3-0.1c0.3-0.1%2c0.5-0.2%2c0.8-0.2 c0.1%2c0%2c0.1%2c0%2c0.2-0.1c0.3-0.1%2c0.6-0.2%2c1-0.3c0.1%2c0%2c0.1-0.1%2c0.2-0.1c0.3-0.1%2c0.5-0.2%2c0.8-0.3c0.1%2c0%2c0.2-0.1%2c0.3-0.1 c0.3-0.1%2c0.5-0.2%2c0.8-0.3c0.1%2c0%2c0.1%2c0%2c0.2-0.1c0.3-0.1%2c0.7-0.3%2c1-0.4c0.1%2c0%2c0.2-0.1%2c0.3-0.1c0.3-0.1%2c0.5-0.2%2c0.8-0.3 c0.1%2c0%2c0.2-0.1%2c0.3-0.1c0.3-0.1%2c0.6-0.2%2c0.9-0.4c0%2c0%2c0.1%2c0%2c0.1-0.1c0.3-0.1%2c0.7-0.3%2c1-0.4c0.1%2c0%2c0.2-0.1%2c0.3-0.1 c0.3-0.1%2c0.5-0.2%2c0.8-0.3c0.1%2c0%2c0.2-0.1%2c0.3-0.1c0.3-0.2%2c0.7-0.3%2c1-0.5c0%2c0%2c0%2c0%2c0%2c0c0.4-0.2%2c0.7-0.3%2c1.1-0.5 c0.1%2c0%2c0.2-0.1%2c0.3-0.1c0.3-0.1%2c0.5-0.3%2c0.8-0.4c0.1%2c0%2c0.2-0.1%2c0.3-0.1c0.4-0.2%2c0.7-0.4%2c1.1-0.5c0%2c0%2c0.1%2c0%2c0.1-0.1 c0.3-0.2%2c0.7-0.3%2c1-0.5c0.1-0.1%2c0.2-0.1%2c0.3-0.2c0.3-0.1%2c0.6-0.3%2c0.8-0.4c0.1-0.1%2c0.2-0.1%2c0.3-0.2c0.4-0.2%2c0.7-0.4%2c1.1-0.6 c0.1%2c0%2c0.1-0.1%2c0.2-0.1c0.3-0.2%2c0.6-0.4%2c0.9-0.5c0.1-0.1%2c0.2-0.1%2c0.3-0.2c0.3-0.2%2c0.6-0.3%2c0.9-0.5c0.1-0.1%2c0.2-0.1%2c0.3-0.2 c0.4-0.2%2c0.7-0.5%2c1.1-0.7c0.1%2c0%2c0.2-0.1%2c0.2-0.1c0.3-0.2%2c0.6-0.4%2c0.9-0.6c0.1%2c0%2c0.1-0.1%2c0.2-0.1c-20.4-2.9-36.7-9-49.8-17.3 C-826.1%2c371.2-841.1%2c369.4-855.9%2c365.9z' /%3e %3cpath class='st13' d='M-855.9%2c365.9c-7.6-1.8-14.8-4-20.3-6.7c-2.7-1.3-4.5-4-4.6-6.9c-0.1-2.5%2c1.1-4.8%2c5.9-4.3 c1.5%2c0.2%2c3%2c0.6%2c4.4%2c1.2c5.3%2c2.4%2c24.8%2c10.8%2c46.8%2c12.5c-8.9-7.9-15.7-17-20.9-26.6c-6.8-0.9-13.5-2.2-20.2-3.7 c-13.7-3.1-26.5-7.2-33.6-12.3c-1.9-1.3-3-3.5-2.8-5.8c0.2-2%2c1.3-4%2c5.1-4.2c1.6-0.1%2c3.2%2c0.3%2c4.7%2c1c5.1%2c2.5%2c21.6%2c10.1%2c41.8%2c14.7 c-3.3-7.9-5.6-16-7.3-24.1c-2.7-0.5-5.3-1.1-8-1.7c-13.7-3.1-26.5-7.2-33.6-12.3c-1.9-1.3-3-3.5-2.8-5.8c0.2-2%2c1.3-4%2c5.1-4.2 c1.6-0.1%2c3.2%2c0.3%2c4.7%2c1c4.3%2c2.1%2c16.8%2c7.9%2c32.7%2c12.3c-2.3-16.7-1.9-32.7-0.8-45.3l-8.2%2c5.9c-0.8%2c0.6-1.9%2c0.8-2.9%2c0.6 c-0.7-0.2-1.4-0.7-1.5-1.7c-0.1-0.9%2c0.4-1.9%2c1.2-2.4c1.9-1.3%2c6.8-4.6%2c12-8.3c1.4-12.3%2c3.3-20.1%2c3.3-20.1c-1.5%2c0-8.1%2c5.9-8.1%2c5.9 c-36.7%2c41-52.5%2c37.2-52.5%2c37.2c-1.3%2c1-6.6%2c47.9-6.6%2c47.9c6.5%2c6.5%2c18.8%2c30.8%2c21.6%2c36.4c0.4%2c0.8%2c0.8%2c1.5%2c1.2%2c2.3 c36.3%2c59.6%2c88.3%2c55.4%2c88.3%2c55.4s0%2c0%2c0%2c0c0%2c0%2c0%2c0%2c0%2c0c0%2c0%2c0%2c0%2c0%2c0c0%2c0%2c0%2c0%2c0%2c0c0%2c0%2c0%2c0%2c0.1%2c0c0%2c0%2c0%2c0%2c0%2c0c0%2c0%2c0.1%2c0%2c0.1%2c0 c0%2c0%2c0%2c0%2c0%2c0c0%2c0%2c0.1%2c0%2c0.1%2c0c0%2c0%2c0%2c0%2c0%2c0c0.1%2c0%2c0.1%2c0%2c0.2%2c0c0%2c0%2c0%2c0%2c0%2c0c0%2c0%2c0.1%2c0%2c0.2%2c0c0%2c0%2c0%2c0%2c0.1%2c0c0.1%2c0%2c0.1%2c0%2c0.2%2c0 c0%2c0%2c0%2c0%2c0.1%2c0c0.1%2c0%2c0.2%2c0%2c0.2%2c0c0%2c0%2c0%2c0%2c0.1%2c0c0.1%2c0%2c0.1%2c0%2c0.2%2c0c0%2c0%2c0.1%2c0%2c0.1%2c0c0.1%2c0%2c0.2%2c0%2c0.2%2c0c0%2c0%2c0%2c0%2c0.1%2c0 c0.1%2c0%2c0.2%2c0%2c0.3%2c0c0%2c0%2c0.1%2c0%2c0.1%2c0c0.1%2c0%2c0.2%2c0%2c0.3%2c0c0%2c0%2c0.1%2c0%2c0.1%2c0c0.1%2c0%2c0.2%2c0%2c0.3%2c0c0%2c0%2c0%2c0%2c0.1%2c0c0.1%2c0%2c0.3%2c0%2c0.4%2c0 c0%2c0%2c0.1%2c0%2c0.1%2c0c0.1%2c0%2c0.2%2c0%2c0.3%2c0c0%2c0%2c0.1%2c0%2c0.1%2c0c0.1%2c0%2c0.3%2c0%2c0.4%2c0c0%2c0%2c0%2c0%2c0%2c0c0.2%2c0%2c0.3%2c0%2c0.5%2c0c0%2c0%2c0.1%2c0%2c0.1%2c0 c0.1%2c0%2c0.3%2c0%2c0.4%2c0c0%2c0%2c0.1%2c0%2c0.1%2c0c0.2%2c0%2c0.3%2c0%2c0.5%2c0c0%2c0%2c0%2c0%2c0%2c0c0.2%2c0%2c0.3%2c0%2c0.5%2c0c0.1%2c0%2c0.1%2c0%2c0.2%2c0c0.1%2c0%2c0.3%2c0%2c0.4%2c0 c0.1%2c0%2c0.1%2c0%2c0.2%2c0c0.2%2c0%2c0.4%2c0%2c0.6-0.1c0%2c0%2c0.1%2c0%2c0.1%2c0c0.2%2c0%2c0.3%2c0%2c0.5-0.1c0.1%2c0%2c0.1%2c0%2c0.2%2c0c0.2%2c0%2c0.3%2c0%2c0.5-0.1 c0.1%2c0%2c0.1%2c0%2c0.2%2c0c0.2%2c0%2c0.4%2c0%2c0.7-0.1c0%2c0%2c0.1%2c0%2c0.1%2c0c0.2%2c0%2c0.4%2c0%2c0.5-0.1c0.1%2c0%2c0.1%2c0%2c0.2%2c0c0.2%2c0%2c0.4%2c0%2c0.6-0.1 c0.1%2c0%2c0.1%2c0%2c0.2%2c0c0.2%2c0%2c0.5-0.1%2c0.7-0.1c0.1%2c0%2c0.1%2c0%2c0.2%2c0c0.2%2c0%2c0.4-0.1%2c0.6-0.1c0.1%2c0%2c0.1%2c0%2c0.2%2c0c0.2%2c0%2c0.4-0.1%2c0.6-0.1 c0%2c0%2c0.1%2c0%2c0.1%2c0c0.3%2c0%2c0.5-0.1%2c0.8-0.1c0.1%2c0%2c0.1%2c0%2c0.2%2c0c0.2%2c0%2c0.4-0.1%2c0.6-0.1c0.1%2c0%2c0.2%2c0%2c0.2%2c0c0.2%2c0%2c0.5-0.1%2c0.7-0.1 c0%2c0%2c0%2c0%2c0.1%2c0c0.3-0.1%2c0.5-0.1%2c0.8-0.2c0.1%2c0%2c0.2%2c0%2c0.2%2c0c0.2%2c0%2c0.4-0.1%2c0.6-0.1c0.1%2c0%2c0.2%2c0%2c0.2-0.1c0.3-0.1%2c0.6-0.1%2c0.9-0.2 c0%2c0%2c0%2c0%2c0%2c0c0.3-0.1%2c0.6-0.1%2c0.8-0.2c0.1%2c0%2c0.2%2c0%2c0.3-0.1c0.2-0.1%2c0.4-0.1%2c0.7-0.2c0.1%2c0%2c0.2%2c0%2c0.2-0.1c0.3-0.1%2c0.6-0.2%2c0.9-0.2 c0%2c0%2c0.1%2c0%2c0.1%2c0c0.3-0.1%2c0.5-0.1%2c0.8-0.2c0.1%2c0%2c0.2-0.1%2c0.3-0.1c0.2-0.1%2c0.5-0.1%2c0.7-0.2c0.1%2c0%2c0.2%2c0%2c0.2-0.1 c0.3-0.1%2c0.6-0.2%2c0.9-0.3c0.1%2c0%2c0.1%2c0%2c0.2-0.1c0.3-0.1%2c0.5-0.2%2c0.8-0.2c0.1%2c0%2c0.2-0.1%2c0.3-0.1c0.3-0.1%2c0.5-0.2%2c0.8-0.2 c0.1%2c0%2c0.1%2c0%2c0.2-0.1c0.3-0.1%2c0.6-0.2%2c1-0.3c0.1%2c0%2c0.1-0.1%2c0.2-0.1c0.3-0.1%2c0.5-0.2%2c0.8-0.3c0.1%2c0%2c0.2-0.1%2c0.3-0.1 c0.3-0.1%2c0.5-0.2%2c0.8-0.3c0.1%2c0%2c0.1%2c0%2c0.2-0.1c0.3-0.1%2c0.7-0.3%2c1-0.4c0.1%2c0%2c0.2-0.1%2c0.3-0.1c0.3-0.1%2c0.5-0.2%2c0.8-0.3 c0.1%2c0%2c0.2-0.1%2c0.3-0.1c0.3-0.1%2c0.6-0.2%2c0.9-0.4c0%2c0%2c0.1%2c0%2c0.1-0.1c0.3-0.1%2c0.7-0.3%2c1-0.4c0.1%2c0%2c0.2-0.1%2c0.3-0.1 c0.3-0.1%2c0.5-0.2%2c0.8-0.3c0.1%2c0%2c0.2-0.1%2c0.3-0.1c0.3-0.2%2c0.7-0.3%2c1-0.5c0%2c0%2c0%2c0%2c0%2c0c0.4-0.2%2c0.7-0.3%2c1.1-0.5 c0.1%2c0%2c0.2-0.1%2c0.3-0.1c0.3-0.1%2c0.5-0.3%2c0.8-0.4c0.1%2c0%2c0.2-0.1%2c0.3-0.1c0.4-0.2%2c0.7-0.4%2c1.1-0.5c0%2c0%2c0.1%2c0%2c0.1-0.1 c0.3-0.2%2c0.7-0.3%2c1-0.5c0.1-0.1%2c0.2-0.1%2c0.3-0.2c0.3-0.1%2c0.6-0.3%2c0.8-0.4c0.1-0.1%2c0.2-0.1%2c0.3-0.2c0.4-0.2%2c0.7-0.4%2c1.1-0.6 c0.1%2c0%2c0.1-0.1%2c0.2-0.1c0.3-0.2%2c0.6-0.4%2c0.9-0.5c0.1-0.1%2c0.2-0.1%2c0.3-0.2c0.3-0.2%2c0.6-0.3%2c0.9-0.5c0.1-0.1%2c0.2-0.1%2c0.3-0.2 c0.4-0.2%2c0.7-0.5%2c1.1-0.7c0.1%2c0%2c0.2-0.1%2c0.2-0.1c0.3-0.2%2c0.6-0.4%2c0.9-0.6c0.1%2c0%2c0.1-0.1%2c0.2-0.1c-20.4-2.9-36.7-9-49.8-17.3 C-826.1%2c371.2-841.1%2c369.4-855.9%2c365.9z' /%3e %3cpath class='st10' d='M-872%2c249.4c0.1%2c1%2c0.8%2c1.5%2c1.5%2c1.7c1%2c0.3%2c2.1%2c0%2c2.9-0.6l8.2-5.9c0.2-2.1%2c0.4-4.1%2c0.6-5.9 c-5.2%2c3.6-10.1%2c6.9-12%2c8.3C-871.6%2c247.6-872%2c248.5-872%2c249.4z' /%3e %3cpath class='st13' d='M-872%2c249.4c0.1%2c1%2c0.8%2c1.5%2c1.5%2c1.7c1%2c0.3%2c2.1%2c0%2c2.9-0.6l8.2-5.9c0.2-2.1%2c0.4-4.1%2c0.6-5.9 c-5.2%2c3.6-10.1%2c6.9-12%2c8.3C-871.6%2c247.6-872%2c248.5-872%2c249.4z' /%3e %3cpath class='st11' d='M-895.9%2c276.7c-3.9%2c0.2-5%2c2.2-5.1%2c4.2c-0.2%2c2.3%2c0.9%2c4.5%2c2.8%2c5.8c7.1%2c5.1%2c19.9%2c9.2%2c33.6%2c12.3 c2.6%2c0.6%2c5.3%2c1.2%2c8%2c1.7c-0.7-3.6-1.3-7.1-1.8-10.6c-15.9-4.5-28.3-10.2-32.7-12.3C-892.7%2c277-894.3%2c276.6-895.9%2c276.7z' /%3e %3cpath class='st13' d='M-895.9%2c276.7c-3.9%2c0.2-5%2c2.2-5.1%2c4.2c-0.2%2c2.3%2c0.9%2c4.5%2c2.8%2c5.8c7.1%2c5.1%2c19.9%2c9.2%2c33.6%2c12.3 c2.6%2c0.6%2c5.3%2c1.2%2c8%2c1.7c-0.7-3.6-1.3-7.1-1.8-10.6c-15.9-4.5-28.3-10.2-32.7-12.3C-892.7%2c277-894.3%2c276.6-895.9%2c276.7z' /%3e %3cpath class='st12' d='M-895.9%2c309c-3.9%2c0.2-5%2c2.2-5.1%2c4.2c-0.2%2c2.3%2c0.9%2c4.5%2c2.8%2c5.8c7.1%2c5.1%2c19.9%2c9.2%2c33.6%2c12.3 c6.7%2c1.5%2c13.4%2c2.8%2c20.2%2c3.7c-1.8-3.4-3.5-6.8-4.9-10.3c-20.2-4.5-36.7-12.2-41.8-14.7C-892.7%2c309.3-894.3%2c309-895.9%2c309z' /%3e %3cpath class='st13' d='M-895.9%2c309c-3.9%2c0.2-5%2c2.2-5.1%2c4.2c-0.2%2c2.3%2c0.9%2c4.5%2c2.8%2c5.8c7.1%2c5.1%2c19.9%2c9.2%2c33.6%2c12.3 c6.7%2c1.5%2c13.4%2c2.8%2c20.2%2c3.7c-1.8-3.4-3.5-6.8-4.9-10.3c-20.2-4.5-36.7-12.2-41.8-14.7C-892.7%2c309.3-894.3%2c309-895.9%2c309z' /%3e %3cpath class='st12' d='M-874.9%2c347.9c-4.8-0.5-5.9%2c1.8-5.9%2c4.3c0.1%2c3%2c1.9%2c5.6%2c4.6%2c6.9c5.5%2c2.7%2c12.7%2c4.9%2c20.3%2c6.7 c14.7%2c3.5%2c29.8%2c5.3%2c44.9%2c5.2c-4.6-2.9-8.8-6.1-12.6-9.5c-22.1-1.8-41.5-10.1-46.8-12.5C-871.8%2c348.5-873.3%2c348.1-874.9%2c347.9z' /%3e %3cpath class='st13' d='M-874.9%2c347.9c-4.8-0.5-5.9%2c1.8-5.9%2c4.3c0.1%2c3%2c1.9%2c5.6%2c4.6%2c6.9c5.5%2c2.7%2c12.7%2c4.9%2c20.3%2c6.7 c14.7%2c3.5%2c29.8%2c5.3%2c44.9%2c5.2c-4.6-2.9-8.8-6.1-12.6-9.5c-22.1-1.8-41.5-10.1-46.8-12.5C-871.8%2c348.5-873.3%2c348.1-874.9%2c347.9z' /%3e %3cpolyline class='st9' points='-916.1%2c261.7 -923.9%2c258.2 -923.9%2c263 -916.8%2c264.8 ' /%3e %3cpolygon class='st9' points='-922.7%2c309.6 -923.9%2c309 -923.9%2c304.9 -922.3%2c306 ' /%3e %3cpolygon class='st13' points='-922.7%2c309.6 -923.9%2c309 -923.9%2c304.9 -922.3%2c306 ' /%3e %3cpolygon class='st9' points='-700.5%2c309.6 -699%2c309 -699%2c304.9 -700.9%2c306.1 ' /%3e %3cpolyline class='st13' points='-916.1%2c261.7 -923.9%2c258.2 -923.9%2c263 -916.8%2c264.8 ' /%3e %3cpolyline class='st9' points='-707.1%2c261.7 -699.1%2c258.2 -699.1%2c263 -706.1%2c264.8 ' /%3e %3c/g%3e %3cg id='Masque_3_' class='st8'%3e %3cpath class='st14' d='M-699%2c257.3c0%2c0-35.6-14-60-16.4c-5.6-0.5-11.1-1.8-16.4-3.6c-12.1-4.2-32-10.7-35.9-9.8 c-3.8-0.9-23.8%2c5.6-35.9%2c9.8c-5.3%2c1.8-10.8%2c3.1-16.4%2c3.6c-24.4%2c2.4-60%2c16.4-60%2c16.4c11.5%2c72.4%2c1.4%2c107.5%2c1.4%2c107.5 c17.2%2c5.6%2c30.9%2c13%2c30.9%2c13c2%2c1.5%2c30.2%2c33.1%2c30.2%2c33.1c10.7%2c11.5%2c32.9%2c12.4%2c43.6%2c12.1c4.1-0.1%2c8.2-0.1%2c12.3%2c0 c10.8%2c0.3%2c32.9-0.7%2c43.6-12.1c0%2c0%2c28.2-31.7%2c30.2-33.1c0%2c0%2c13.8-7.4%2c30.9-13C-700.4%2c364.8-710.5%2c329.6-699%2c257.3z' /%3e %3cpath class='st15' d='M-715.4%2c274.3c0%2c0-36.7-16.7-51.7-14.7c0%2c0-23.2-3.3-27.8-6.9c0%2c0-11.5-4.9-16.4-4.3 c-4.9-0.7-16.4%2c4.3-16.4%2c4.3c-4.6%2c3.6-27.8%2c6.9-27.8%2c6.9c-15.1-2-51.7%2c14.7-51.7%2c14.7c7.5%2c20.3-1.6%2c84.5-1.6%2c84.5 c18.9%2c4.2%2c28.6%2c20.6%2c32.1%2c28.2c1%2c2.1%2c2.6%2c3.9%2c4.6%2c5.1c5.6%2c3.3%2c16.6%2c12.7%2c20.9%2c16.3c1.4%2c1.2%2c3.1%2c2%2c4.9%2c2.4 c9.7%2c1.9%2c35.1%2c3.4%2c35.1%2c3.4s25.4-1.5%2c35.1-3.4c1.8-0.4%2c3.5-1.2%2c4.9-2.4c4.2-3.7%2c15.2-13%2c20.9-16.3c2-1.2%2c3.6-3%2c4.6-5.1 c3.5-7.6%2c13.2-23.9%2c32.1-28.2C-713.8%2c358.8-722.9%2c294.6-715.4%2c274.3z' /%3e %3cpath class='st16' d='M-875.5%2c291.3c0%2c0%2c36.7%2c5.6%2c49.1-26.5c0%2c0%2c0.7-10.1-12.4%2c3.9C-838.8%2c268.8-856.8%2c285.8-875.5%2c291.3z' /%3e %3cpath class='st16' d='M-753.1%2c286.4c0%2c0-15.4-12.8-23.6-13.1c0%2c0-16.7-12.3-19.6-12.1c0%2c0-7.5%2c4.6%2c0%2c15.2c0%2c0%2c13.4%2c0.4%2c15.7%2c2.4 C-780.6%2c278.9-763.9%2c291-753.1%2c286.4z' /%3e %3cpath class='st16' d='M-903.7%2c318.2c0%2c0%2c67.8-27.5%2c92.3-24.6c0%2c0%2c43.2%2c1.6%2c92%2c24.6c0%2c0-27.5%2c7.5-50.1-9.5c0%2c0-36.3-8.5-41.9-12.8 c0%2c0-26.2%2c19.3-38%2c18.7C-849.3%2c314.6-882.4%2c322.4-903.7%2c318.2z' /%3e %3cpath class='st16' d='M-719.3%2c340.5c0%2c0-65.5%2c2-89.1%2c11.5c0%2c0-42.6-10.5-95.3-11.5c0%2c0%2c24.6%2c16.7%2c43.9%2c15.1 c0%2c0%2c21.9%2c9.2%2c24.9%2c15.1c0%2c0%2c28.2%2c10.8%2c40.6-2.3c0%2c0%2c27.5-9.2%2c29.5-13.8C-764.8%2c354.5-722%2c348.6-719.3%2c340.5z' /%3e %3cpath class='st16' d='M-743.9%2c368.6c0%2c0-11.8%2c28.2-67.6%2c28.2c-55.8%2c0-67.3-28.2-67.3-28.2s9.2%2c38.3%2c67.4%2c38.3 S-743.9%2c368.6-743.9%2c368.6z' /%3e %3cpath class='st17' d='M-832%2c295.6c0%2c0-29.6%2c6.1-66.5%2c20.3c0%2c0%2c24.6-3.6%2c26.2-4.6C-872.2%2c311.3-842.4%2c310.7-832%2c295.6z' /%3e %3cpath class='st17' d='M-733.1%2c312.3c0%2c0-10.1%2c3.3-24.9-5.2c0%2c0-40.6-6.2-53.4-13.4c0%2c0%2c28.3%2c2.4%2c39.1%2c6.1 c1.9%2c0.7%2c6.5%2c1.8%2c8.3%2c2.4C-755.2%2c304.9-737.4%2c310-733.1%2c312.3z' /%3e %3cpath class='st17' d='M-769.4%2c356.7c-0.2%2c0%2c3.2-2.8%2c3.2-3.4c0%2c0-14.5%2c2.6-23.7%2c7.8c0%2c0-7.7%2c0.9-5.9-1.6c0%2c0%2c14-4.1%2c15.7-6.2 c0%2c0%2c9.3-5.8%2c29.3-5.3c0%2c0%2c12.7-5.1%2c13-6.1l19.1-1.3c0%2c0-3.6%2c8.4-46.1%2c14C-764.8%2c354.5-767.3%2c356.2-769.4%2c356.7z' /%3e %3cpath class='st17' d='M-826.4%2c348.2c0%2c0-40.1-6.8-58.5-7c0%2c0-17.9-0.4-18.9-0.8c0%2c0%2c15.9%2c8.7%2c51.2%2c9.3c0%2c0%2c17.6%2c8.7%2c23.2%2c7.4 c0%2c0-10.8-6.1-9.6-7.4C-838.9%2c349.8-827%2c349.5-826.4%2c348.2z' /%3e %3cpath class='st17' d='M-771.7%2c390.5c0%2c0-10.3%2c4.7-10.3%2c6c0%2c0-77.4%2c16.1-96.7-27.8c0%2c0%2c6.7%2c16.5%2c35.1%2c24.4 C-843.7%2c393-806.9%2c403.1-771.7%2c390.5z' /%3e %3cg class='st18'%3e %3cg%3e %3cpath class='st19' d='M-910.9%2c256.3c0%2c0%2c0.1%2c1.1%2c0.2%2c3' /%3e %3cpath class='st20' d='M-910.2%2c265.3c1.4%2c20.8%2c4.1%2c72.2-0.7%2c92.8' /%3e %3cpath class='st19' d='M-911.7%2c360.9c-0.3%2c1.1-0.7%2c2-1.1%2c2.8' /%3e %3c/g%3e %3c/g%3e %3cpath class='st21' d='M-917.4%2c259.3c0%2c0%2c6.2%2c72%2c1.3%2c98.3' /%3e %3cpath class='st21' d='M-712.5%2c256.3c0%2c0-7.2%2c87.4%2c2.3%2c107.4' /%3e %3cpath class='st21' d='M-705.3%2c359.1c0%2c0-6.9-64.5%2c0-99.9' /%3e %3cpath class='st21' d='M-715.1%2c259.3c0%2c0-34.1-13.5-52.1-10.9c0%2c0-32.1-14-44.4-13.4c0%2c0-19.2%2c1.9-41.4%2c12.1 c0%2c0-35.7%2c2.5-52.4%2c12.1' /%3e %3cpath class='st21' d='M-901.4%2c265.2c0%2c0%2c25.5-10.8%2c53.4-11.5c0%2c0%2c37.3-20.6%2c64.2-3.6c0%2c0%2c20.6%2c7.2%2c28.2%2c6.2 c0%2c0%2c31.7%2c4.3%2c36.9%2c10.1' /%3e %3cpath class='st21' d='M-715.1%2c365c0%2c0-26.8%2c11.5-29.1%2c24.2c0%2c0-18%2c21.6-35.4%2c28.5c0%2c0-57.6%2c2.9-62.9%2c0c0%2c0-28.5-15.4-38.6-33.7 c0%2c0-16.6-18-27.1-19' /%3e %3cpath class='st17' d='M-811.3%2c414.1c0%2c0-25.4-1.5-35.1-3.4c-1.8-0.4-3.5-1.2-4.9-2.4c-4.2-3.7-15.2-13-20.9-16.3 c-2-1.2-3.6-3-4.6-5.1c-3.5-7.6-13.2-23.9-32.1-28.2c0%2c0%2c9.1-64.2%2c1.6-84.5c0%2c0%2c36.7-16.7%2c51.7-14.7c0%2c0%2c23.2-3.3%2c27.8-6.9 c0%2c0%2c3.2-1.4%2c7-2.6c0%2c0%2c3.5%2c16%2c3.5%2c18c0%2c0%2c0%2c25.5%2c0.5%2c38.4c0.1%2c4.1%2c1.1%2c8.2%2c2.8%2c11.9c4.4%2c9.6%2c12.8%2c30.3%2c3.7%2c31.4 c-3.3%2c0.4-6.3%2c2.4-7.3%2c5.6c-0.9%2c2.8-0.9%2c6.7%2c2.2%2c11.7c1.4%2c2.3%2c2.6%2c4.7%2c3.6%2c7.2c2.5%2c6.7%2c5.3%2c18-1.8%2c22.1c-0.9%2c0.5-2%2c0.8-3%2c1 C-818.2%2c397.7-821.4%2c399.9-811.3%2c414.1z' /%3e %3c/g%3e %3c/g%3e %3c/g%3e %3cg%3e %3cpath d='M444.3%2c556.9c-9.6-0.1-18.9%2c3.7-25.6%2c10.6c-6.8%2c6.5-10.7%2c15.6-10.6%2c25c0%2c9.5%2c3.7%2c18.6%2c10.5%2c25.3c6.5%2c7%2c15.6%2c11%2c25.1%2c10.9 h1.3c9.5%2c0.1%2c18.7-3.8%2c25.1-10.8c6.7-6.7%2c10.4-15.8%2c10.3-25.3c0.1-9.5-3.7-18.5-10.6-25.1C463.2%2c560.6%2c453.9%2c556.8%2c444.3%2c556.9z M472.8%2c592.9c0.1%2c7.6-2.9%2c14.9-8.3%2c20.2c-5.2%2c5.5-12.4%2c8.6-20%2c8.5c-15.8-0.2-28.5-12.9-28.8-28.7c0-7.6%2c3.1-15%2c8.5-20.3 c5.2-5.6%2c12.5-8.7%2c20.1-8.7c7.6-0.1%2c14.8%2c3.1%2c20%2c8.6C469.8%2c578%2c472.8%2c585.3%2c472.8%2c592.9L472.8%2c592.9z' /%3e %3cpath d='M393.9%2c612.7c-1.5-1.5-3.9-1.5-5.4%2c0c-2.1%2c2.2-4.5%2c4.1-7.1%2c5.6c-11%2c6.4-25%2c4.4-33.8-4.8c-11.2-11-11.4-29-0.4-40.2 c0.1-0.1%2c0.3-0.3%2c0.4-0.4c8.8-9.2%2c22.8-11.2%2c33.8-4.8c2.6%2c1.5%2c5%2c3.3%2c7.1%2c5.5c1.5%2c1.4%2c3.9%2c1.4%2c5.4%2c0c1.4-1.4%2c1.5-3.7%2c0.1-5.3 c-6.7-7.1-16.1-11.1-25.8-11c-9.8-0.2-19.2%2c3.6-26.2%2c10.5c-6.9%2c6.5-10.7%2c15.6-10.6%2c25.1c-0.1%2c9.5%2c3.7%2c18.6%2c10.5%2c25.3 c6.5%2c7%2c15.6%2c10.9%2c25.2%2c10.8h1.3c9.9%2c0.1%2c19.3-4%2c25.9-11.3l0.1-0.2c0.4-0.6%2c0.6-1.2%2c0.7-1.9v-0.7 C394.9%2c614.2%2c394.5%2c613.3%2c393.9%2c612.7z' /%3e %3cpath d='M727.6%2c565.8c1.9%2c0%2c3.5-1.5%2c3.5-3.5v-0.2c-0.1-1.9-1.6-3.4-3.5-3.4H711v-23c-0.1-1.9-1.6-3.4-3.5-3.5H707 c-2%2c0.1-3.6%2c1.8-3.6%2c3.8v65.9c0%2c7.6%2c2.6%2c13.9%2c7.8%2c18.8c4.4%2c4.3%2c10.2%2c6.8%2c16.4%2c7.2h0.2c1.9-0.1%2c3.3-1.7%2c3.3-3.5 c0.1-1.9-1.4-3.5-3.3-3.6c-4.3-0.4-8.3-2.2-11.3-5.3c-3.7-3.6-5.6-8.5-5.5-13.7v-36.1L727.6%2c565.8L727.6%2c565.8z' /%3e %3cpath d='M812%2c558.6h-0.3c-2%2c0.1-3.6%2c1.8-3.7%2c3.8v8.3c-2.6-3.5-5.8-6.5-9.6-8.6c-5.6-3.4-12.1-5.1-18.6-5.2 c-9.6-0.1-18.8%2c3.7-25.5%2c10.6c-14%2c13.7-14.2%2c36.2-0.5%2c50.2c0.2%2c0.2%2c0.3%2c0.3%2c0.5%2c0.5c6.7%2c6.9%2c15.9%2c10.7%2c25.5%2c10.6 c6.4%2c0%2c12.7-1.7%2c18.3-5c3.9-2.3%2c7.3-5.3%2c10-9v8.6c0.1%2c2.1%2c1.8%2c3.8%2c4%2c3.7c2-0.1%2c3.6-1.6%2c3.7-3.6v-61.1 C815.7%2c560.3%2c814.1%2c558.6%2c812%2c558.6z M808.3%2c592.9c0.1%2c7.6-2.9%2c14.9-8.3%2c20.2c-5.2%2c5.5-12.4%2c8.6-20%2c8.5 c-15.8-0.2-28.5-12.9-28.8-28.7c0-7.6%2c3-15%2c8.5-20.3c5.2-5.6%2c12.6-8.7%2c20.2-8.7c7.6-0.1%2c14.8%2c3.1%2c20%2c8.6 C805.4%2c578%2c808.4%2c585.3%2c808.3%2c592.9z' /%3e %3cpath class='st2' d='M25%2c620.8c-4.2-0.3-8.2-2.2-11.1-5.2c-3.5-3.5-5.5-8.3-5.3-13.3v-83.7c0-2.4-1.9-4.3-4.3-4.3S0%2c516.2%2c0%2c518.6 v83.7c0%2c7.7%2c2.7%2c14.2%2c7.9%2c19.1c4.6%2c4.4%2c10.6%2c7%2c17%2c7.4H25c2.1-0.1%2c3.8-1.9%2c3.8-4C28.8%2c622.7%2c27.1%2c620.9%2c25%2c620.8z' /%3e %3cpath class='st2' d='M103.2%2c558.1L103.2%2c558.1c-2.4%2c0.1-4.3%2c2-4.3%2c4.3v6.9c-2.5-3.1-5.5-5.7-8.9-7.6c-5.7-3.4-12.2-5.2-18.8-5.2 c-9.7-0.1-19.1%2c3.7-25.9%2c10.7c-14.2%2c13.9-14.4%2c36.6-0.5%2c50.8c0.2%2c0.2%2c0.4%2c0.4%2c0.5%2c0.5c6.8%2c7%2c16.1%2c10.8%2c25.9%2c10.7 c6.5%2c0%2c12.9-1.7%2c18.5-5.1c3.6-2.1%2c6.7-4.8%2c9.3-8v7.2c0%2c2.3%2c1.9%2c4.2%2c4.2%2c4.3h0.2c2.3%2c0%2c4.2-1.9%2c4.2-4.3v-61 C107.4%2c560%2c105.5%2c558.1%2c103.2%2c558.1z M99.1%2c592.9c0.1%2c7.5-2.9%2c14.7-8.2%2c19.9c-5.1%2c5.4-12.2%2c8.5-19.7%2c8.4c-7.5%2c0.1-14.7-3-19.9-8.4 c-5.4-5.2-8.4-12.3-8.4-19.8s3-14.8%2c8.4-20c5.1-5.5%2c12.3-8.6%2c19.8-8.5c7.4-0.1%2c14.6%2c3%2c19.7%2c8.4C96.2%2c578.2%2c99.2%2c585.4%2c99.1%2c592.9z' /%3e %3cpath class='st2' d='M199.2%2c556.5c-5.7-0.2-11.4%2c1.4-16.2%2c4.6c-3.1%2c2.1-5.6%2c4.8-7.4%2c8.1c-1.8-3.1-4.2-5.8-7-8 c-3.7-3-8.3-4.6-13.1-4.7c-4.5%2c0-9%2c1.2-12.9%2c3.5c-2.1%2c1.1-4%2c2.5-5.8%2c4.1v-1.7c0-2.3-1.8-4.2-4.2-4.3h-0.3c-2.3%2c0.1-4.1%2c2-4.1%2c4.3 v61c0.1%2c2.3%2c1.9%2c4.1%2c4.2%2c4.2h0.3c2.3-0.1%2c4.1-2%2c4.1-4.3v-41.4c0-4.6%2c1.9-9%2c5.3-12.2c3.2-3.4%2c7.7-5.3%2c12.3-5.3 c4.5-0.1%2c8.9%2c1.8%2c12%2c5.2c3.2%2c3.3%2c5%2c7.7%2c5%2c12.3v41.5c0%2c2.1%2c1.6%2c3.9%2c3.7%2c4.2h1h0.2c2.1-0.3%2c3.6-2.1%2c3.6-4.2v-41.5c0-4.6%2c2-9%2c5.4-12.2 c3.3-3.4%2c7.8-5.3%2c12.5-5.3c4.5-0.1%2c8.8%2c1.8%2c11.9%2c5c3.3%2c3.4%2c5.1%2c8%2c5%2c12.7v41.1c0%2c2.4%2c1.9%2c4.3%2c4.3%2c4.3c2.4%2c0%2c4.3-1.9%2c4.3-4.3v-41.1 c0-7.8-2.5-14.1-7.3-18.8C211.6%2c559%2c205.5%2c556.5%2c199.2%2c556.5z' /%3e %3cpath class='st2' d='M309.5%2c558.1h-0.2c-2.3%2c0.1-4.2%2c2-4.1%2c4.3v7c-2.5-3.1-5.5-5.7-8.9-7.6c-5.7-3.4-12.2-5.2-18.8-5.2 c-9.7-0.1-19.1%2c3.7-25.9%2c10.7c-14.2%2c13.9-14.4%2c36.6-0.5%2c50.8c0.2%2c0.2%2c0.3%2c0.3%2c0.5%2c0.5c6.8%2c7%2c16.1%2c10.8%2c25.9%2c10.7 c6.5%2c0%2c12.9-1.7%2c18.5-5.1c3.6-2.1%2c6.7-4.8%2c9.3-8v7.2c0%2c2.3%2c1.9%2c4.2%2c4.2%2c4.3h0.3c2.3-0.1%2c4.1-2%2c4.1-4.3v-61 C313.7%2c560.1%2c311.8%2c558.1%2c309.5%2c558.1z M305.4%2c592.9c0.1%2c7.5-2.9%2c14.7-8.2%2c19.9c-5.1%2c5.4-12.2%2c8.5-19.7%2c8.4 c-15.5-0.2-28.1-12.7-28.3-28.2c0-7.5%2c3-14.7%2c8.4-20c5.1-5.5%2c12.3-8.6%2c19.8-8.5c7.4-0.1%2c14.6%2c3%2c19.7%2c8.4 C302.5%2c578.2%2c305.5%2c585.4%2c305.4%2c592.9z' /%3e %3cpath d='M569%2c556.9c-5.6-0.2-11.2%2c1.4-15.9%2c4.5c-3.3%2c2.2-5.9%2c5.1-7.6%2c8.7c-1.8-3.3-4.3-6.3-7.3-8.5c-3.6-2.9-8.1-4.5-12.8-4.6 c-4.4%2c0-8.8%2c1.2-12.7%2c3.4c-2.4%2c1.3-4.5%2c2.9-6.5%2c4.8v-3c-0.1-1.8-1.5-3.3-3.3-3.5h-1c-1.9%2c0.3-3.3%2c1.9-3.3%2c3.8v61 c0%2c1.9%2c1.5%2c3.6%2c3.4%2c3.8h0.9c1.8-0.2%2c3.2-1.7%2c3.4-3.5v-41.7c0.3-9.8%2c8.2-17.7%2c18-17.9c4.7-0.1%2c9.2%2c1.9%2c12.3%2c5.3 c3.3%2c3.3%2c5.2%2c7.9%2c5.1%2c12.6v41.3c0%2c2%2c1.7%2c3.7%2c3.7%2c3.8h0.3c2-0.1%2c3.5-1.7%2c3.6-3.7v-41.6c0-4.8%2c2.1-9.3%2c5.6-12.5 c3.4-3.5%2c8-5.4%2c12.8-5.4c4.6-0.1%2c9.1%2c1.8%2c12.3%2c5.2c3.4%2c3.4%2c5.3%2c8.1%2c5.1%2c13v41.4c0.2%2c1.9%2c1.7%2c3.4%2c3.7%2c3.5h0.3c2-0.1%2c3.6-1.8%2c3.6-3.8 v-41.1c0-7.7-2.4-13.9-7.2-18.4C581.3%2c559.4%2c575.2%2c556.9%2c569%2c556.9z' /%3e %3cpath d='M650.5%2c556.9c-6.4%2c0-12.7%2c1.8-18.2%2c5c-3.9%2c2.2-7.4%2c5.2-10.1%2c8.8v-8.3c0-2.1-1.6-3.7-3.7-3.8h-0.4c-2%2c0.1-3.6%2c1.8-3.6%2c3.8 v90.1c0%2c2%2c1.6%2c3.6%2c3.5%2c3.8h0.6c1.9-0.1%2c3.4-1.6%2c3.5-3.5v-38c2.8%2c3.7%2c6.4%2c6.7%2c10.4%2c9c5.4%2c3.2%2c11.5%2c4.9%2c17.8%2c4.9 c19.8%2c0%2c35.9-16.1%2c35.9-35.9C686.4%2c573%2c670.4%2c557%2c650.5%2c556.9L650.5%2c556.9L650.5%2c556.9z M679.1%2c592.9c0.1%2c7.6-2.9%2c14.9-8.3%2c20.2 c-5.2%2c5.5-12.4%2c8.6-20%2c8.5c-15.8-0.2-28.5-12.9-28.7-28.7c0-7.6%2c3-15%2c8.5-20.3c5.2-5.6%2c12.5-8.7%2c20.1-8.7c7.6-0.1%2c14.8%2c3.1%2c20%2c8.6 C676.1%2c578%2c679.1%2c585.3%2c679.1%2c592.9L679.1%2c592.9z' /%3e %3c/g%3e%3c/svg%3e";

/* script */
const __vue_script__$5 = script$5;

var __vue_render__$5 = function () {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c('ALink', {
    staticClass: "logo-lamacompta",
    attrs: {
      "to": "accueil",
      "title": "Logo Lamacompta",
      "external": "",
      "rel": "sidebar",
      "no-line": ""
    }
  }, [_c('AImage', {
    attrs: {
      "src": img,
      "title": "Le super Lamalogo",
      "alt": "Logo Lamacompta"
    }
  })], 1);
};

var __vue_staticRenderFns__$5 = [];
/* style */

const __vue_inject_styles__$5 = function (inject) {
  if (!inject) return;
  inject("data-v-2e5dddbc_0", {
    source: ".logo-lamacompta{margin:auto;animation:1s appear}",
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

//
Vue.use(VueTypedJs);
var script$6 = {
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
const __vue_script__$6 = script$6;
/* template */

var __vue_render__$6 = function () {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c('vue-typed-js', {
    attrs: {
      "strings": _vm.strings,
      "loop": _vm.loop,
      "back-speed": _vm.backSpeed
    }
  }, [_c('span', {
    staticClass: "typing"
  })]);
};

var __vue_staticRenderFns__$6 = [];
/* style */

const __vue_inject_styles__$6 = function (inject) {
  if (!inject) return;
  inject("data-v-81d4f250_0", {
    source: ".typed-element{display:flex;align-items:center}.typed-element .typed-cursor{position:relative;top:-1px;margin-left:3px;opacity:1;animation:typerBlink .7s infinite}@keyframes typerBlink{50%{opacity:0}}",
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

/* eslint-disable import/prefer-default-export */

var components = /*#__PURE__*/Object.freeze({
    __proto__: null,
    AButton: __vue_component__,
    AHeading: __vue_component__$1,
    AImage: __vue_component__$2,
    ALink: __vue_component__$3,
    AList: __vue_component__$4,
    MLogo: __vue_component__$5,
    MTyper: __vue_component__$6
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
export { __vue_component__ as AButton, __vue_component__$1 as AHeading, __vue_component__$2 as AImage, __vue_component__$3 as ALink, __vue_component__$4 as AList, __vue_component__$5 as MLogo, __vue_component__$6 as MTyper };
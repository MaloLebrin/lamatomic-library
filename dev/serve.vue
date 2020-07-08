<template>
  <div id="app">
    <MNavbar :items="items" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { AButton, MNavbar, ALink } from '@/entry';
const LinkCmp = Vue.extend(ALink)
const BtnCmp = Vue.extend(AButton)

const link1 = new LinkCmp({ 
  propsData: {
    href: '#'
  }
})
const slotlink1 = link1.$createElement('div', ['Lien n°1']);
link1.$slots.default= [slotlink1]

const link2 = new LinkCmp({ 
  propsData: {
    href: '#'
  }
})
const slotlink2 = link2.$createElement('div', ['Lien n°2']);
link2.$slots.default= [slotlink2]

const link3 = new LinkCmp({ 
  propsData: {
    href: '#'
  }
})
const slotlink3 = link3.$createElement('div', ['Lien n°3']);
link3.$slots.default= [slotlink3]

const btn = new BtnCmp({
    propsData: {
      state: 'success'
    }
})
const slotbtn = btn.$createElement('div', ['boutton success']);
btn.$slots.default= [slotbtn]

const btn2 = new BtnCmp({
  propsData: {
    styles: 'light'
  }
})
const slot = btn2.$createElement('div', ['Hello']);
btn2.$slots.default = [slot];

export default Vue.extend({
  name: 'ServeDev',
  components: {
    MNavbar,
  },
  data() {
    return {
      items: [link1.$mount().$el.outerHTML,link2.$mount().$el.outerHTML,link3.$mount().$el.outerHTML, btn.$mount().$el.outerHTML, btn2.$mount().$el.outerHTML ]
    }
  }
})
</script>

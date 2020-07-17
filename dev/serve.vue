<template>
  <div id="app">
    <OHeader :items="items" />
  </div>
</template>

<script lang="ts">

import Vue from 'vue';
import { OHeader, ALink, AButton } from '@/entry';
import { getMountedComponent } from '@/utils'
const link1 = getMountedComponent(
    ALink,
    { href: 'https://bananas.com/' },
    { default: 'Im a great link' }
)
const btn1 = getMountedComponent(AButton, { state: 'success' }, { default: 'Buy now!😏'})
const btn2 = getMountedComponent(AButton, { state: 'warning' }, { default: 'Join ours bananas 🍌'})

const items = [link1, btn1, btn2]

export default Vue.extend({
  name: 'ServeDev',
  components: {
    OHeader
  },
  data() {
    return {
      items
    }
  },

});

</script>

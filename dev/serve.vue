<template>
  <div id="app">
    <AText align="right" weight="bold" italic>Oh yeah!</AText>
    <AButton>Yeah</AButton>
    <AHeading>Gros titre de fou</AHeading>
    <AHamburger />
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { AButton, AHeading, AHamburger, AText } from '@/entry';

export default Vue.extend({
  name: 'ServeDev',
  components: {
    AButton,
    AHeading,
    AHamburger,
    AText
  }
});
</script>


<template>
  <div id="app">
    <AText align="right" weight="bold" italic>Oh yeah!</AText>
    <AButton>Yeah</AButton>
    <AHeading>Gros titre de fou</AHeading>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { AButton, AHeading, AText } from '@/entry';

export default Vue.extend({
  name: 'ServeDev',
  components: {
    AButton,
    AHeading,
    AText
  }
});
</script>



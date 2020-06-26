<script lang="ts">
import Vue from 'vue';
import { AButton, AHeading, MLogo } from '@/entry';

export default Vue.extend({
  name: 'ServeDev',
  components: {
    AButton,
    AHeading,
    MLogo
  }
});
</script>

<template>
  <div id="app">
    <AButton>Yeah</AButton>
    <AHeading>Gros titre de fou</AHeading>
    <MLogo />
  </div>
</template>

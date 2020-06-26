<script lang="ts">
import Vue from 'vue';
import { AButton, AHeading, AImage, ALink, AList, MLogo, MTyper } from '@/entry';

export default Vue.extend({
  name: 'ServeDev',
  components: {
    AButton,
    AHeading,
    AImage,
    ALink,
    AList,
    MLogo,
    MTyper
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

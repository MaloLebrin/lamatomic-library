<template>
  <div id="app">
    <MNavbar :footer="true" :horizontal="false" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { MNavbar } from '@/entry';

export default Vue.extend({
  name: 'ServeDev',
  components: {
    MNavbar,
  }
});
</script>


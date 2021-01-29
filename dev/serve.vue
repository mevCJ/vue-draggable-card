<script>
import Vue from 'vue';
import { VueDraggableCard } from '@/entry';

export default Vue.extend({
  name: 'ServeDev',
  components: {
    VueDraggableCard,
  }
});
</script>

<template>
  <div id="app">
    <VueDraggableCard />
  </div>
</template>

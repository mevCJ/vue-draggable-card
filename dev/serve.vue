<script>
import Vue from 'vue';
import { DraggableCards } from '@/entry';

export default Vue.extend({
  name: 'ServeDev',
  components: {
    DraggableCards,
  }
});
</script>

<template>
  <div id="app">
    <DraggableCards />
  </div>
</template>

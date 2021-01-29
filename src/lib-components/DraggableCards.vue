<template>
  <div
    ref="eCard"
    class="event-cards eCard"
    :class="{ 'enlarge-cards': imageShadow }"
    :style="{
      transform: imageShadow ? 'rotate(0deg)' : `rotate(${rotate}deg)`,
    }"
    @mousedown="dragMouseDown"
    @mouseup="closeDragElement"
    hover
    :elevation="imageShadow ? 10 : 1"
  >
    <slot name="content">
      <img class="pa-5" :src="image">
      <h1>{{ title }}</h1>
      <h2>{{ subtitle }}</h2>
      <p v-if="imageShadow">{{ text }}</p>
    </slot>
  </div>
</template>

<script>
/* eslint-disable */
export default {
  name: "DraggableCards",
  props: {
    title: String,
    subtitle: String,
    text: String,
    image: String,
    randomTilt: Boolean,
    randomMax: {
      type: Number,
      default: 15,
    },
    randomMin: {
      type: Number,
      default: 10,
    },
  },
  mounted() {
    if (this.randomTilt)
      this.rotate =
        Math.floor(Math.random() * (this.randomMax - this.randomMin)) +
        this.randomMin;
  },
  data: () => ({
    imageShadow: false,
    imagePosition: false,
    pos1: 0,
    pos2: 0,
    pos3: 0,
    pos4: 0,
    rotate: 0,
  }),
  methods: {
    dragMouseDown(e) {
      e = e || window.event;
      e.preventDefault();
      // get the mouse cursor position at startup:
      this.pos3 = e.clientX;
      this.pos4 = e.clientY;
      // call a function whenever the cursor moves:
      document.onmousemove = this.elementDrag;
      this.imageShadow = true;
      this.$refs.eCard.style.cursor = "grabbing";
      this.$refs.eCard.style.zIndex = 50;
      this.imagePosition = true;
    },

    elementDrag(e) {
      e = e || window.event;
      e.preventDefault();
      // calculate the new cursor position:
      this.pos1 = this.pos3 - e.clientX;
      this.pos2 = this.pos4 - e.clientY;
      this.pos3 = e.clientX;
      this.pos4 = e.clientY;
      // set the element's new position:
      this.$refs.eCard.style.margin = 0;
      this.$refs.eCard.style.top =
        this.$refs.eCard.offsetTop - this.pos2 + "px";
      this.$refs.eCard.style.left =
        this.$refs.eCard.offsetLeft - this.pos1 + "px";
      this.$emit('drag',e);
    },

    closeDragElement() {
      // stop moving when mouse button is released:
      document.onmouseup = null;
      document.onmousemove = null;
      this.$refs.eCard.style.zIndex = 1;
      this.imageShadow = false;
    },
  },
};
</script>

<style>
.event-cards {
  transition: transform 0.2s ease-in-out 0s, box-shadow 0.2s ease-in-out !important;
  position: absolute !important;
  z-index: 2;
  cursor: grab !important;
box-shadow: 5px 4px 11px 0px rgba(0,0,0,0.44);
-webkit-box-shadow: 5px 4px 11px 0px rgba(0,0,0,0.44);
-moz-box-shadow: 5px 4px 11px 0px rgba(0,0,0,0.44);
  padding: 4rem;
}

.event-cards:active {
  box-shadow: 10px 10px 26px -2px rgba(0,0,0,0.4);
-webkit-box-shadow: 10px 10px 26px -2px rgba(0,0,0,0.4);
-moz-box-shadow: 10px 10px 26px -2px rgba(0,0,0,0.4);
}

.enlarge-cards {
  transform: scale(1.1);
}
</style>


# vue-draggable-card

<p align="center">
  <a href="https://github.com/mevCJ/vue-draggable-card" target="_blank">
<img src="https://github.com/mevCJ/vue-draggable-card/raw/main/logo.png" width="50%">
</a>
</p>

## Install

```bash
npm i vue-draggable-card
```

## Usage

```js
import Vue from "vue";
import { VueDraggableCard } from "vue-draggable-card";

export default {
  components: {
    VueDraggableCard,
  },
};
```

```html
<vue-draggable-card>
  <template v-slot:content>
    <h1> Your Title </h1>
  </template>
</vue-draggable-card>
```

## API

### Props

| Name                  | Type              |             Default             | Description                                                                                        |
| :-------------------- | :---------------- | :-----------------------------: | :------------------------------------------------------------------------------------------------- |
| **title** | `string` | null | Title of the card |
| **subtitle** | `string` | null | Subtitle of the card |
| **text** | `string` | null | Text content of the card |
| **image** | `string` | null | Source of the card image |
| **randomTilt** | `Boolean` | false | Enable random card rotation |
| **randomMax** | `Number` | 15 | Maximum rotation in degree |
| **randomMin** | `Number` | 10 | Minimum rotation in degree |



### Events

| Name     | Attributes | Listen to | Description                                                                                                                                                                                              |
| :------- | :--------- | :-------: | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **drag** | `event`  |  `@drag`  | Emitted as card position changes. |

### Slots

| Name     | Description                                                                                                                                                                                                                        |
| :------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **content** | Slot for inner content of the card |                                                      

## Examples

https://codepen.io/mevcj/pen/VwmwLwR

## License

MIT
<template>
  <div class="root">
    <div class="root__row">
      <PreviewWindow />
      <InventoryWindow />
    </div>
    <BottomSheet />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import InventoryWindow from './components/InventoryWindow.vue'
import PreviewWindow from './components/PreviewWindow.vue'
import BottomSheet from './components/BottomSheet.vue'

export default defineComponent({
  name: 'App',
  components: {
    InventoryWindow,
    PreviewWindow,
    BottomSheet
  }
})
</script>

<style lang="scss">
* {
  margin: 0px;
  padding: 0px;
}
body {
  height: 100%;
  background-color: #262626;
}
.root {
  display: flex;
  flex-direction: column;
  &__row {
    display: flex;
    justify-content: space-between;
  }
}
</style>

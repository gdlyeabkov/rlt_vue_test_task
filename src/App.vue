<template>
  <div></div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'App',
  components: {
  }
});
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

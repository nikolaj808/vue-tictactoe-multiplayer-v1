<template>
  <div class="container">
      <div class="flex-row">
          <Square v-bind:spot="1" />
          <Square v-bind:spot="2" />
          <Square v-bind:spot="3" />
      </div>
      <div class="flex-row">
          <Square v-bind:spot="4" />
          <Square v-bind:spot="5" />
          <Square v-bind:spot="6" />
      </div>
      <div class="flex-row">
          <Square v-bind:spot="7" />
          <Square v-bind:spot="8" />
          <Square v-bind:spot="9" />
      </div>
  </div>
</template>

<script>
import Square from './Square.vue'

export default {
    name: 'Board',
    components: {
        Square
    }
}
</script>

<style scoped>
    .flex-row {
        display: flex;
    }
</style>
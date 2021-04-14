<template>
  <div id="app" >
    <home></home>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Home from './views/home/index.vue'
export default defineComponent({
  components: { Home }
})
</script>

<template>
  <div class="enum-edit-warp">
    <a-card title="Default size card" class="enum-item" v-for="i in 5" :key="i" size="small">
      <template #extra><a href="#">more</a></template>
      <p>card content</p>
      <p>card content</p>
      <p>card content</p>
      <p>{{i}}</p>
    </a-card>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'EnumEdit'
})
</script>

<style scoped lang="less">

.enum-edit-warp {
  display: flex;
  flex-flow: wrap;
  .enum-item {
    flex-shrink: 0;
    width: 300px;
    margin-left: 10px;
    margin-bottom: 10px;
  }
}
</style>

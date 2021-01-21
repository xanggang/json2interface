<template>
  <a-layout-header class="layer-header-warp">
    <div class="collapsed-tag">
      <menu-unfold-outlined
          v-if="collapsed"
          class="trigger"
          @click="$emit('change-collapsed')"
      />
      <menu-fold-outlined v-else class="trigger" @click="$emit('change-collapsed')" />
    </div>
  </a-layout-header>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  UserOutlined
} from '@ant-design/icons-vue'

export default defineComponent({
  name: '头部容器',
  components: {
    MenuUnfoldOutlined,
    MenuFoldOutlined
  },
  props: {
    collapsed: Boolean
  }
})
</script>

<style scoped lang="less">
.layer-header-warp {
  display: flex;
  justify-content: space-between;
  background: #fff;
  padding: 0;

  .collapsed-tag {

  }

  .info {
    line-height: 60px;

    .icon {
      display: inline-block;
      width: 18px;
      height: 18px;
      margin-right: 5px;
      line-height: 1;
      vertical-align: middle;
      //background: url("~assets/image/icon/icon-user.png") no-repeat center;
      background-size: contain;
    }

    .split {
      padding: 0 10px;
    }

    span.text {
      font-size: 14px;
      color: #333;
    }
  }

}
</style>

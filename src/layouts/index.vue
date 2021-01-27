<template>
  <a-layout id="global-layout">
    <a-layout-sider
        v-model:collapsed="collapsed"
        :trigger="null"
        collapsible
        class="global-layout-sider"
        style="min-height: 100vh"
    >
      <div :class="['logo', {'logo-collapsed': !collapsed}]">
        <router-link to="/" class="logo-lint">
<!--          <img :src="himoLogo">-->
          <span style="color: #fff;">json 转 interface 工具</span>
        </router-link>
      </div>
      <a-menu theme="dark" class="menu-content" mode="inline" v-model:selectedKeys="selectedKeys">
        <a-menu-item key="1">
          <user-outlined />
          <span>nav 1</span>
        </a-menu-item>
        <a-menu-item key="2">
          <video-camera-outlined />
          <span>nav 2</span>
        </a-menu-item>
        <a-menu-item key="3">
          <upload-outlined />
          <span>nav 3</span>
        </a-menu-item>
      </a-menu>
    </a-layout-sider>

    <a-layout>
      <layer-header :collapsed="collapsed" @change-collapsed="handleChangCollapsed"></layer-header>
      <a-layout-content
          :style="{ margin: '24px 16px', padding: '24px', background: '#fff', minHeight: '280px' }"
      >
        <router-view />
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>
<script lang="ts">
import {
  UserOutlined,
  VideoCameraOutlined,
  UploadOutlined
} from '@ant-design/icons-vue'
import { defineComponent, ref, computed } from 'vue'
import LayerHeader from './LayerHeader.vue'

import LogoSmall from '@/assets/system-images/himo-logo-small.png'
import LogoNormal from '@/assets/system-images/himo-logo.png'

export default defineComponent({
  components: {
    UserOutlined,
    VideoCameraOutlined,
    UploadOutlined,
    LayerHeader
  },
  setup () {
    const collapsed = ref(false)
    const selectedKeys = ref([1, 2])
    const himoLogo = computed(() => collapsed.value ? LogoSmall : LogoNormal)
    function handleChangCollapsed () {
      collapsed.value = !collapsed.value
    }
    return {
      collapsed,
      selectedKeys,
      himoLogo,
      handleChangCollapsed
    }
  }
})
</script>

<style lang="less">
#global-layout {
  .global-layout-sider {
    position: relative;
    width: 64px;
  }

  .trigger {
    font-size: 18px;
    line-height: 64px;
    padding: 0 24px;
    cursor: pointer;
    transition: color 0.3s;

    &:hover {
      color: #1890ff;
    }
  }

  .logo {
    display: flex;
    align-items: center;
    justify-items: center;
    box-sizing: border-box;
    width: 80px;
    height: 64px;
    overflow: hidden;
    line-height: 64px;
    text-overflow: clip;
    white-space: nowrap;
    animation: all 0.3s;

    .logo-lint {
      width: 100%;
      height: 100%;
    }

    &.logo-collapsed {
      width: 200px;
      height: 64px;
    }

    h1 {
      display: inline-block;
      height: 32px;
      margin: 0 0 0 12px;
      font-family: "Myriad Pro", "Helvetica Neue", Arial, Helvetica, sans-serif;
      font-size: 20px;
      font-weight: 600;
      line-height: 32px;
      color: #fff;
      vertical-align: middle;
    }

    img {
      display: inline-block;
      width: auto;
      height: 100%;
      vertical-align: middle;

      @media screen and (min-width: 1920px) {
        width: auto;
        height: 100%;
      }
    }
  }

  .menu-content {
    margin-top: 10px;
  }
}
</style>

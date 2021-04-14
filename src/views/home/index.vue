<template>
  <div class="home-page-warp">
    <div class="title">Json生成interface工具</div>
    <div id="jsoneditor">
      <a-button @click="setData">生成接口类型</a-button>
      <a-button @click="clear" class="ml-10">清楚json</a-button>
      <a-button @click="foldJson" class="ml-10">格式化json</a-button>
      <a-button @click="openConfig" class="ml-10">选项配置</a-button>
      <h5 class="mt-10 error-container" v-if="isErrorJson">JSON数据有误， 请确认</h5>
      <div class="editor-wrap mt-10">
        <div class="editor-item" :class="{'error': isErrorJson}">
          <textarea name="" id="JSON-EDITOR" style="width: 100%;height: 100%;" cols="200" rows="500"></textarea>
        </div>
        <div class="editor-item ml-10">
          <textarea name="" id="CODE-EDITOR" cols="500" rows="200"></textarea>
        </div>
      </div>

      <a-modal v-model:visible="isShowConfig" title="选项配置" @ok="closeConfig">
        <a-form >
          <a-form-item label="导出接口名称">
            <a-input v-model:value="globalName" />
          </a-form-item>
          <a-form-item label="接口成员后面是否有冒号">
            <a-switch v-model:checked="memberAfterSemicolon" />
          </a-form-item>
          <a-form-item label="接口后面是否有冒号">
            <a-switch v-model:checked="interfaceAfterSemicolon" />
          </a-form-item>
          <a-form-item label="是否导出所有类型">
            <a-switch v-model:checked="isExportAll" />
          </a-form-item>
          <a-form-item label="接口前缀">
            <a-input v-model:value="interfacePrefix" />
          </a-form-item>
        </a-form>
      </a-modal>
    </div>
  </div>

</template>

<script lang="ts">
import { defineComponent, toRefs, ref, onMounted, h } from 'vue'
import UseCodeEditor from './UseCodeEditor'
import UseJsonEditor from './UseJsonEditor'
import { notification } from 'ant-design-vue'

export default defineComponent({
  name: '首页',
  setup () {
    const {
      isErrorJson,
      foldJson,
      getJsonEditorValue,
      jsonOption,
      changeConfig
    } = UseJsonEditor('JSON-EDITOR')

    const isShowConfig = ref(false)

    const { setCode, clearCode } = UseCodeEditor('CODE-EDITOR')

    const setData = () => {
      const jsonStr = getJsonEditorValue()
      setCode(jsonStr)
    }

    const clear = () => {
      setCode('')
    }

    const openConfig = () => {
      isShowConfig.value = true
    }

    const closeConfig = () => {
      isShowConfig.value = false
      changeConfig()
    }

    onMounted(() => {
      const props = {
        href: 'http://blog.lynn.cool/',
        target: '_blank'
      }
      notification.open({
        message: 'tips',
        description: h('a', props, '前往http://blog.lynn.cool/查看更多小工具'),
        placement: 'topRight',
        duration: 2
      })
    })

    return {
      isErrorJson,
      setData,
      foldJson,
      clear,
      clearCode,
      isShowConfig,
      changeConfig,
      openConfig,
      ...toRefs(jsonOption),
      closeConfig
    }
  }
})
</script>

<style scoped lang="less">
.home-page-warp {
  height: 100%;
  padding: 20px;

  .title {
    font-size: 16px;
    font-weight: 400;
    color: red;
    margin-bottom: 10px;
  }

  .error-container {
    display: flex;
    align-items: center;
    height: 30px;
    width: 300px;
    border-radius: 1px;
    border: 1px solid #dbb2b2;
    padding: 10px;
    background: #ffecf1;
    font-size: 14px;
    color: #b4465c;
  }
  .editor-wrap {
    display: flex;

    .editor-item {
      height: 80vh;
      width: 50%;
      //flex-shrink: 1;
      flex-grow: 0;
      border: 1px solid #ececec;

      &.error {
        border-color: orangered;
      }

      #JSON-EDITOR, #CODE-EDITOR {

      }
    }
  }
}
</style>

<style>
  .CodeMirror {
    width: 100%;
    height: 100%;
  }
</style>

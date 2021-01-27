<template>
  <div class="home-page-warp" id="jsoneditor">
    <a-button @click="setData">生成接口类型</a-button>
    <a-button @click="clear" class="ml-10">清楚json</a-button>
    <a-button @click="foldJson" class="ml-10">格式化json</a-button>
    <h5 class="mt-10" v-if="isErrorJson">JSON数据有误， 请确认</h5>
    <div class="editor-wrap mt-10">
      <div class="editor-item error">
        <textarea name="" id="JSON-EDITOR" style="width: 100%;height: 100%;" cols="200" rows="500"></textarea>
      </div>
      <div class="editor-item ml-10">
        <textarea name="" id="CODE-EDITOR" cols="500" rows="200"></textarea>
      </div>
    </div>
    <enumEdit style="margin-top: 20px;"></enumEdit>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import enumEdit from './enumEdit.vue'
import UseCodeEditor from './UseCodeEditor'
import UseJsonEditor from './UseJsonEditor'

export default defineComponent({
  name: '首页',
  components: {
    enumEdit
  },
  setup () {
    const {
      isErrorJson,
      foldJson,
      getJsonEditorValue
    } = UseJsonEditor('JSON-EDITOR')

    const { setCode, clearCode } = UseCodeEditor('CODE-EDITOR')

    const setData = () => {
      const jsonStr = getJsonEditorValue()
      setCode(jsonStr)
    }

    const clear = () => {
      setCode('')
    }

    return {
      isErrorJson,
      setData,
      foldJson,
      clear,
      clearCode
    }
  }
})
</script>

<style scoped lang="less">
.home-page-warp {
  height: 100%;

  .editor-wrap {
    display: flex;

    .editor-item {
      height: 60vh;
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

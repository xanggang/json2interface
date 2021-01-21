<template>
  <div class="home-page-worp" id="jsoneditor">

    <a-row>
      <a-col :span="12">
        <div id="JSON-EDITOR"></div>
      </a-col>
      <a-col :span="12">
        <textarea name="" id="CODE-EDITOR" cols="200" rows="200"></textarea>
      </a-col>
    </a-row>

    <a-button @click="setData">setData</a-button>
    <a-button @click="clear">clear</a-button>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, toRaw, reactive, onMounted } from 'vue'
import interfaceDefinition from './util'
// 基础
import CodeMirror, { Editor as codeEditor } from 'codemirror'
import 'codemirror/lib/codemirror.css'
// 主题
import 'codemirror/theme/eclipse.css'
// 代码高亮
import 'codemirror/mode/javascript/javascript.js'
// 绑定Vim
import 'codemirror/keymap/vim.js'
import 'codemirror/addon/dialog/dialog.js'
// 支持代码折叠
import 'codemirror/addon/fold/foldgutter.css'
import 'codemirror/addon/fold/foldgutter.js'
import 'codemirror/addon/fold/brace-fold.js'
import 'codemirror/addon/fold/comment-fold.js'
// 括号匹配
import 'codemirror/addon/edit/matchbrackets.js'
// 行注释
import 'codemirror/addon/comment/comment.js'
// 格式化
// import 'codemirror/addon/format/format.js'

import JSONEditor from 'jsoneditor'
import 'jsoneditor/dist/jsoneditor.css'

const data = {
  number: 1,
  string: 'string',
  boolean: true,
  null: null,
  symbol: Symbol('symbol'),
  stringArray: ['a', 'b', 'c'],
  numberArray: [1, 2, 3],
  objectArray: [
    {
      c: 1,
      d: 1
    }
  ],
  object: {
    a: 1,
    b: 2
  },
  arrayObject: {
    a: [1, 2, 3]
  }
}

const resString = interfaceDefinition(JSON.stringify(data))

let editJs!: codeEditor
let jsonEditor: any = null

export default defineComponent({
  name: '首页',
  setup () {
    onMounted(() => {
      const dom = document.getElementById('CODE-EDITOR') as HTMLTextAreaElement
      editJs = CodeMirror.fromTextArea(dom, {
        value: 'const a = 1',
        mode: 'application/json',
        theme: 'eclipse',
        tabSize: 2,
        smartIndent: true, // 是否智能缩进
        keyMap: 'vim',
        lineWrapping: true,
        foldGutter: true,
        gutters: ['CodeMirror-linenumbers', 'CodeMirror-foldgutter', 'CodeMirror-lint-markers'],
        matchBrackets: true
      })
    })

    onMounted(() => {
      const container = document.getElementById('JSON-EDITOR')
      jsonEditor = new JSONEditor(container, {
        theme: 'bootstrap2'
      })
      const initialJson = {
        Array: [1, 2, 3],
        Boolean: true,
        Null: null,
        Number: 123,
        Object: { a: 'b', c: 'd' },
        String: 'Hello World'
      }
      jsonEditor.set(initialJson)
    })

    function setData () {
      const data = jsonEditor.get()
      const resString = interfaceDefinition(JSON.stringify(data))
      editJs.setValue(resString)
    }

    function clear () {
      editJs.setValue('')
    }

    return {
      setData,
      clear
    }
  }
})
</script>

<style scoped lang="less">
.home-page-worp {
  height: 100%;
}

.b {
  background: #42b983;
  margin-left: 10px;
  margin-top: 10px;
  flex-shrink: 0;
  color: #fff;
  font-size: 50px;
  text-align: center;
}
</style>

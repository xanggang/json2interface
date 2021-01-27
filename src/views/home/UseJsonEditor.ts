import CodeMirror from './import'
import { Editor as CodeEditorType } from 'codemirror'
import { onMounted, ref, Ref } from 'vue'
import interfaceDefinition from '@/views/home/util'
import humps from 'humps'

interface IUseJsonEditorType {
  jsonEditor: CodeEditorType | null;
  isErrorJson: Ref<boolean>;
  foldJson(): void;
  getJsonEditorValue(): string;
  setJson(): void;
}

function getJson (value: string): object {
  let jsonString: object = {}
  try {
    jsonString = JSON.parse(value)
  } catch (parseErr) {
    try {
      // eslint-disable-next-line no-eval
      jsonString = eval('(' + value + ')')
    } catch (evalErr) {
      jsonString = evalErr.message
    }
  }
  return jsonString
}

function checkJson (value: string) {
  try {
    JSON.parse(value)
    return false
  } catch (parseErr) {
    try {
      // eslint-disable-next-line no-eval
      eval('(' + value + ')')
      return false
    } catch (evalErr) {
      return true
    }
  }
}

export default function (id: string): IUseJsonEditorType {
  let jsonEditor!: CodeEditorType
  const isErrorJson = ref(false)
  onMounted(() => {
    const dom = document.getElementById(id) as HTMLTextAreaElement
    jsonEditor = CodeMirror.fromTextArea(dom, {
      value: 'const a = 1',
      mode: 'application/json',
      lineNumbers: true,
      theme: 'eclipse',
      tabSize: 2,
      smartIndent: true, // 是否智能缩进
      // keyMap: 'vim',
      lineWrapping: true,
      foldGutter: true,
      gutters: ['CodeMirror-linenumbers', 'CodeMirror-foldgutter', 'CodeMirror-lint-markers'],
      matchBrackets: true
    })
    jsonEditor.on('blur', (e: CodeEditorType) => {
      const value = e.getValue()
      isErrorJson.value = checkJson(value)
    })
  })

  const getValue = () => {
    return jsonEditor.getValue()
  }

  const getJsonEditorValue = () => {
    const value = jsonEditor.getValue()
    const json = getJson(value)
    return interfaceDefinition(JSON.stringify(humps.camelizeKeys(json)))
  }

  const foldJson = () => {
    const valueString = getValue()
    const json = getJson(valueString)
    const dataString = JSON.stringify(json, null, 2)
    jsonEditor.setValue(dataString)
  }

  const setJson = () => {
    jsonEditor.setValue('')
  }

  return {
    jsonEditor,
    isErrorJson,
    foldJson,
    getJsonEditorValue,
    setJson
  }
}

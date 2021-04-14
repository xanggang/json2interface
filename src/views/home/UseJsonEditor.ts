import CodeMirror from './import'
import { Editor as CodeEditorType } from 'codemirror'
import { onMounted, ref, Ref, reactive, toRaw } from 'vue'
import Json2inter, { IOption } from './json2inter'
import { checkJson, getJson, getConfig, setConfig } from './utils'

interface IUseJsonEditorType {
  jsonEditor: CodeEditorType | null;
  isErrorJson: Ref<boolean>;
  foldJson(): void;
  getJsonEditorValue(): string;
  setJson(): void;
  jsonOption: IOption;
  changeConfig(): void;
}

export default function (id: string): IUseJsonEditorType {
  let jsonEditor!: CodeEditorType
  const isErrorJson = ref(false)

  const jsonOption = reactive(getConfig())

  const json2interConst = new Json2inter(toRaw(jsonOption))

  onMounted(() => {
    const dom = document.getElementById(id) as HTMLTextAreaElement
    jsonEditor = CodeMirror.fromTextArea(dom, {
      value: '',
      mode: 'application/json',
      // lineNumbers: true,
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
    return json2interConst.interfaceDefinition(json)
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

  const changeConfig = () => {
    json2interConst.memberAfterSemicolon = jsonOption.memberAfterSemicolon ? ';' : ''
    json2interConst.interfaceAfterSemicolon = jsonOption.interfaceAfterSemicolon ? ';' : ''
    json2interConst.interfacePrefix = jsonOption.interfacePrefix
    json2interConst.globalName = jsonOption.globalName
    json2interConst.isExportAll = jsonOption.isExportAll
    setConfig(jsonOption)
  }

  return {
    jsonEditor,
    isErrorJson,
    foldJson,
    getJsonEditorValue,
    setJson,
    jsonOption,
    changeConfig
  }
}

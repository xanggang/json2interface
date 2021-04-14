import CodeMirror from './import'
import { Editor as CodeEditorType } from 'codemirror'
import { onMounted } from 'vue'

interface IUseCodeEditorType {
  codeEditor?: CodeEditorType | null;
  setCode(s: string): void;
  clearCode(): void;
}

export default function (id: string): IUseCodeEditorType {
  let codeEditor!: CodeEditorType
  onMounted(() => {
    const dom = document.getElementById(id) as HTMLTextAreaElement
    codeEditor = CodeMirror.fromTextArea(dom, {
      mode: 'application/json',
      lineNumbers: true,
      // theme: 'eclipse',
      tabSize: 2,
      smartIndent: true, // 是否智能缩进
      // keyMap: 'vim',
      lineWrapping: true,
      foldGutter: true,
      gutters: ['CodeMirror-linenumbers', 'CodeMirror-foldgutter', 'CodeMirror-lint-markers'],
      matchBrackets: true
    })
  })

  const setCode = (codeString: string) => {
    codeEditor.setValue(codeString)
  }

  const clearCode = () => {
    codeEditor.setValue('')
  }

  return {
    setCode,
    clearCode
  }
}

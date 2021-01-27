import CodeMirror, { Editor as CodeEditorType } from 'codemirror'
import 'codemirror/lib/codemirror.css'
// 主题
import 'codemirror/theme/eclipse.css'
// 代码高亮
import 'codemirror/mode/javascript/javascript.js'
// 绑定Vim
// import 'codemirror/keymap/vim.js'
// import 'codemirror/addon/dialog/dialog.js'
// 支持代码折叠
import 'codemirror/addon/fold/foldgutter.css'
import 'codemirror/addon/fold/foldgutter.js'
import 'codemirror/addon/fold/brace-fold.js'
import 'codemirror/addon/fold/comment-fold.js'
import 'codemirror/addon/fold/foldcode.js'
// 括号匹配
import 'codemirror/addon/edit/matchbrackets.js'
// 行注释
import 'codemirror/addon/comment/comment.js'

export default CodeMirror

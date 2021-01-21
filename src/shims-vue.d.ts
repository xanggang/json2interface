/* eslint-disable */
declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}

// declare module '@vue/runtime-core' {
//   import { ComponentCustomProperties } from 'vue'
//   import { Store } from 'vuex'
//   interface State {
//     [key: string]: any
//   }
//
//   interface ComponentCustomProperties {
//     $store: Store<State>
//   }
// }

// declare module 'codemirror' {
//   import * as codemirror from 'codemirror'
//   const res: typeof codemirror
//   export default res
// }

declare module '*.png'
declare module 'js-base64'
// declare module 'jsoneditor'
declare module 'dingtalk-jsapi/index'
declare module 'dingtalk-javascript-env'

// declare module 'CodeMirror' {
//   import * as codemirror from 'codemirror'
//   return codemirror
// }

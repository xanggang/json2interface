import { createApp } from 'vue'
import App from './App.vue'
import './style/index.less'
import Button from 'ant-design-vue/lib/button'
import Modal from 'ant-design-vue/lib/modal'
import Switch from 'ant-design-vue/lib/switch'
import Input from 'ant-design-vue/lib/input'
import Form from 'ant-design-vue/lib/form'
import Notification from 'ant-design-vue/lib/notification'

import 'ant-design-vue/dist/antd.css'
const app = createApp(App)
app.use(Button)
app.use(Modal)
app.use(Switch)
app.use(Input)
app.use(Form)
app.use(Notification)
app.mount('#app')

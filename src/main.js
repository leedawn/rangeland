import Vue from 'vue'
import App from './App.vue'
import router from './router' // ？不确定为什么会获取到 index.js 文件
import store from './store'
import axios from 'axios'
import '@/util/veevalidate'
import Alert from './components/modules/alert'
import Pop from './components/modules/pop'

Vue.use(Alert) // 使用插件
Vue.use(Pop)
Vue.config.productionTip = false // 阻止 vue 在启动时产生生产提示。

axios.defaults.baseURL = process.env.NODE_ENV !== 'production' ? 'http://localhost:3000' : '' //  node 提供的全局变量

new Vue({
  router,
  store,
  render: h => h(App) // render:渲染一个试图； h: createElement, 生成 html dom 元素
}).$mount('#app') // 挂载到 app 上面

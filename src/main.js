//main.js将会作为我们应用的入口文件
// App.vue 会作为我们应用的初始化组件
import Vue from 'vue'
import FastClick from 'fastclick'
import VueRouter from 'vue-router'
import App from './App'
import routes from './router/index'
import axios from 'axios'
Vue.prototype.$http = axios

import Vuex from 'vuex'
import store from './vuex/store'

import VCharts from 'v-charts'
Vue.use(VCharts)


Vue.use(Vuex)

import { ConfirmPlugin,LoadingPlugin,AlertPlugin,ToastPlugin } from 'vux'

Vue.use(AlertPlugin)
Vue.use(ConfirmPlugin)
Vue.use(ToastPlugin)
Vue.use(LoadingPlugin)


Vue.use(VueRouter)

// 3. 创建 router 实例，然后传 `routes` 配置
const router = new VueRouter({
  mode: 'history', // 'hash',
  scrollBehavior: () => ({
    y: 0
  }), // 滚动条滚动的行为
  routes
})

FastClick.attach(document.body)

router.beforeEach((to, from, next) => {　 // to: 即将要进入的路由对象
  　 // from: 当前正要离开的路由对象
  　 // next: 进行下一状态，切记，一定要在结束业务逻辑后调用 next 函数，不然钩子函数就不会被 resolved
  let user = store.state.user.userInfo[0];
  if (!user && to.path != '/login') {
    next({
      path: '/login'
    })
  } else {
    next();
  }
})

Vue.config.productionTip = false

//4. 创建和挂载根实例。
/* eslint-disable no-new */
new Vue({
  router,
  store,
  render: h => h(App) //Render函数使用虚拟dom来渲染节点提升性能，因为它是基于JavaScript计算,使用createElement(h)来创建dom节点
}).$mount('#app-box')

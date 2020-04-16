import Vue from 'vue'
import VueRouter from 'vue-router'
import moment from 'dayjs'

import Game from '../views/practice/Game.vue'
import Demo from '../views/practice/Demo.vue'
import BlogHome from '../views/practice/BlogHome'
import BlogPost from '../views/practice/BlogPost'
import Fever from '../views/practice/Fever'
import Ulikecam from '../views/practice/Ulikecam'
import SemanticHomePage from '../views/practice/SemanticHomePage'

import Index from '../views/channels/Index'
import Template from '../views/channels/Template'
import Login from '../views/Login'
import Home from '../views/Home'
import Register from '../views/Register'
import Forget from '../views/Forget'
// import Reset from '../views/Reset'

import Center from '../views/Center'
import UserCenter from '../components/user/Center'
import Msg from '../components/user/Msg'
import Others from '../components/user/Others'
import Posts from '../components/user/Posts'
import Setting from '../components/user/Setting.vue'
import Add from '../components/contents/Add.vue'
import Edit from '../components/contents/Edit.vue'
import Detail from '../components/contents/Detail'

import MyInfo from '../components/user/common/MyInfo'
import PictureUpload from '../components/user/common/PictureUpload'
import ChangePassword from '../components/user/common/ChangePassword'
import AccountBinding from '../components/user/common/AccountBinding'
import MyPost from '../components/user/common/MyPost'
import MyCollect from '../components/user/common/MyCollect'

import NotFound from '../views/NotFound'

import store from '../store/index'

const Reset = () => import(/* webpackChunkName:'reset‘ */ '../views/Reset')

Vue.use(VueRouter)

const myRoutes = [
  // {
  //   path: '/home',
  //   name: 'home',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited. 适合打包后 js 文件特别大的情况
  //   component: () => import(/* webpackChunkName: "about" */ '../views/Home.vue')
  // },
  {
    path: '/', // 嵌套路由需要两级router-view
    name: 'home',
    component: Home,
    children: [
      {
        path: '',
        name: 'index',
        component: Index
      },
      {
        path: '/index/:catalog',
        name: 'catalog',
        component: Template
      },
      {
        path: '/login',
        name: 'login',
        component: Login
      },
      {
        path: '/register',
        name: 'register',
        component: Register,
        beforeEnter: (to, from, next) => {
          console.log(from)
          if (from.path === '/login') { // 将 from 的值打印出来，就可以分析那个值是需要的
            next()
          } else {
            next('/login')
          }
        }
      },
      {
        path: '/forget',
        name: 'forget',
        component: Forget
      },
      {
        path: '/reset',
        name: 'reset',
        component: Reset
      },
      {
        path: '/add',
        name: 'add',
        component: Add
      },
      {
        path: '/edit/:tid',
        name: 'edit',
        props: true,
        component: Edit
      },
      {
        path: '/detail/:tid',
        name: 'detail',
        props: true,
        component: Detail
      },
      {
        path: '/center',
        name: 'center',
        component: Center,
        meta: { requiresAuth: true }, // 路由元信息
        linkActiveClass: 'semantic-this',
        children: [
          // {
          //   path: '',
          //   name: 'center',
          //   component: Center
          // },
          {
            path: 'center',
            name: 'userCenter',
            component: UserCenter
          },
          {
            path: 'msg',
            name: 'msg',
            component: Msg,
            alias: '/test' // 设置别名之后，还需要修改路由跳转的地址。
          },
          {
            path: 'others',
            name: 'others',
            component: Others
          },
          {
            path: 'posts',
            name: 'posts',
            component: Posts,
            redirect: { name: 'myPost' },
            children: [
              {
                path: 'myPost',
                name: 'myPost',
                component: MyPost
              },
              {
                path: 'myCollect',
                name: 'myCollect',
                component: MyCollect
              }
            ]
          },
          {
            path: 'setting',
            name: 'setting',
            component: Setting,
            redirect: { name: 'myInfo' },
            linkActiveClass: 'active',
            children: [
              {
                path: 'myInfo',
                name: 'myInfo',
                component: MyInfo
              },
              {
                path: 'pictureUpload',
                name: 'pictureUpload',
                component: PictureUpload
              },
              {
                path: 'changePassword',
                name: 'changePassword',
                component: ChangePassword
              },
              {
                path: 'accountBinding',
                name: 'accountBinding',
                component: AccountBinding
              }
            ]
          }
        ]
      }
    ]
  },
  // my demo
  {
    path: '/demo',
    name: 'demo',
    component: Demo
  },
  {
    path: '/game',
    name: 'game',
    component: Game
  },
  {
    path: '/ulikecam',
    name: 'ulikecam',
    component: Ulikecam
  },
  {
    path: '/semantic',
    name: 'semantic',
    component: SemanticHomePage
  },
  {
    path: '/blog',
    name: 'blog-home',
    component: BlogHome
  },
  {
    path: '/blog/:slug',
    name: 'blog-post',
    component: BlogPost
  },
  {
    path: '/fever',
    name: 'fever',
    component: Fever
  },
  {
    path: '/404',
    component: NotFound
  },
  {
    path: '*',
    redirect: '/404'
  }
]

const router = new VueRouter({
  linkExactActiveClass: 'active', // 激活路由后的类名
  routes: myRoutes
})

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token')
  const userInfo = JSON.parse(localStorage.getItem('userInfo'))
  if (token !== '' && token !== null) {
    const payload = JSON.parse(atob(token.split('.')[1]))
    console.log('payload', payload)
    if (moment().isBefore(moment(payload.exp * 1000))) {
      store.commit('setToken', token)
      store.commit('setUserInfo', userInfo)
      store.commit('setIsLogin', true)
      if (!store.state.ws) {
        store.commit('initWebSocket', {})
      }
    } else {
      localStorage.clear()
    }
  }
  if (to.matched.some(record => record.meta.requiresAuth)) {
    const isLogin = store.state.isLogin
    if (isLogin) {
      next()
    } else {
      next('/login')
    }
  } else {
    next()
  }
})

export default router

import Vue from 'vue'
import VueRouter from 'vue-router'
import moment from 'dayjs'

import Home from '../views/Home.vue'
import Demo from '../views/Demo.vue'
import BlogHome from '../views/BlogHome'
import BlogPost from '../views/BlogPost'
import Fever from '../views/Fever'
import ImoocIndex from '../views/channels/Index'
import ImoocLogin from '../views/ImoocLogin'
import Imooc from '../views/Imooc'
import ImoocRegister from '../views/ImoocRegister'
import ImoocForget from '../views/ImoocForget'
import Reset from '../views/Reset'
import Ulikecam from '../views/Ulikecam'
import SemanticHomePage from '../views/SemanticHomePage'

import Center from '../views/Center'
import UserCenter from '../components/user/Center'
import Msg from '../components/user/Msg'
import Others from '../components/user/Others'
import Posts from '../components/user/Posts'
import Setting from '../components/user/Setting.vue'
import Add from '../components/contents/Add.vue'
import Detail from '../components/contents/Detail'

import MyInfo from '../components/user/common/MyInfo'
import PictureUpload from '../components/user/common/PictureUpload'
import ChangePassword from '../components/user/common/ChangePassword'
import AccountBinding from '../components/user/common/AccountBinding'

import NotFound from '../views/NotFound'

import store from '../store/index'

Vue.use(VueRouter)

const myRoutes = [
  {
    path: '/home',
    name: 'home',
    component: Home
  },
  // {
  //   path: '/imooc',
  //   name: 'imooc',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/Imooc.vue')
  // },
  {
    path: '/', // 嵌套路由需要两级router-view
    name: 'imooc',
    component: Imooc,
    children: [
      {
        path: '',
        name: 'index',
        component: ImoocIndex
      },
      {
        path: 'login',
        name: 'login',
        component: ImoocLogin
      },
      {
        path: 'regin',
        name: 'regin',
        component: ImoocRegister,
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
        path: 'forget',
        name: 'forget',
        component: ImoocForget
      },
      {
        path: 'reset',
        name: 'reset',
        component: Reset
      },
      {
        path: '/add',
        name: 'add',
        component: Add
      },
      {
        path: '/detail/:tid',
        name: 'detail',
        props: true,
        component: Detail
      }
    ]
  },
  {
    path: '/demo',
    name: 'demo',
    component: Demo
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
    path: '/center',
    name: 'center',
    component: Center,
    meta: { requiresAuth: true },
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
        component: Msg
      },
      {
        path: 'others',
        name: 'others',
        component: Others
      },
      {
        path: 'posts',
        name: 'posts',
        component: Posts
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
  linkExactActiveClass: 'semantic-this',
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
    } else {
      debugger
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

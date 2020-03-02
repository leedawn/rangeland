import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Demo from '../views/Demo.vue'
import BlogHome from '../views/BlogHome'
import BlogPost from '../views/BlogPost'
import Fever from '../views/Fever'
import ImoocIndex from '../views/ImoocIndex'
import ImoocLogin from '../views/ImoocLogin'
import Imooc from '../views/Imooc'
import ImoocRegister from '../views/ImoocRegister'
import ImoocForgetPassword from '../views/ImoocForgetPassword'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
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
    path: '/imooc', // 嵌套路由需要两级router-view
    component: Imooc,
    children: [
      {
        path: '',
        name: 'index',
        component: ImoocIndex
      },
      {
        path: 'login',
        component: ImoocLogin
      },
      {
        path: 'reg',
        name: 'reg',
        component: ImoocRegister,
        beforeEnter: (to, from, next) => {
          console.log(from)
          if (from.path === '/imooc/login') { // 将 from 的值打印出来，就可以分析那个值是需要的
            next()
          } else {
            next('/imooc/login')
          }
        }
      },
      {
        path: 'forget',
        component: ImoocForgetPassword
      }
    ]
  },
  {
    path: '/demo',
    name: 'demo',
    component: Demo
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
  }
]

const router = new VueRouter({
  routes
})

export default router

import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Profile from '../views/Profile'
import Subprofile from '../views/Subprofile'
import CreateSubprofile from '../views/CreateSubprofile'
import Login from '../views/Login'
import Register from '../views/Register'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path:'/profile',
    name:"Profile",
    component:Profile
  },
  {
    path:'/subprofile/:id',
    name:"Subprofile",
    component:Subprofile
  },
  {
    path:'/createsubprofile',
    name:"CreateSubprofile",
    component:CreateSubprofile
  },
  {
    path:'/login',
    name:"Login",
    component:Login,
  },
  {
    path:'/register',
    name:"Register",
    component:Register
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router

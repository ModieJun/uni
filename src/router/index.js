import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Profile from '../views/Profile'
import Subprofile from '../views/Subprofile'
import CreateSubprofile from '../views/CreateSubprofile'
import Login from '../views/Login'
import Register from '../views/Register'
import store from '../store/index'

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
    path: '/profile',
    name: "Profile",
    component: Profile,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/subprofile/:id',
    name: "Subprofile",
    component: Subprofile,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/createsubprofile',
    name: "CreateSubprofile",
    component: CreateSubprofile,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/login',
    name: "Login",
    component: Login,
    meta: {
      hideForAuth: true
    },
  },
  {
    path: '/register',
    name: "Register",
    component: Register,
    meta: {
      hideForAuth: true
    },
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})


router.beforeEach((to, from, next) => {
  //if require auth 
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!store.getters.user) {
      next(({ path: '/login' }));
    } else {
      next();
    }
  }

  //no auth required
  if (to.matched.some(record => record.meta.hideForAuth)) {
    if (store.getters.user) {
      //redirect to home 
      next(({ path: '/' }));
    } else {
      next();
    }
  } else {
    next();
  }
})

export default router

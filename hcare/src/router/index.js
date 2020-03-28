import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Booking from '../views/Booking.vue'
import Dashboard from '../views/admin/Dashboard.vue'
import Register from '../views/Register.vue'
import Login from '../views/Login.vue'
import NotFound from '../views/404.vue'
import Admin from '../views/admin/Admin.vue'

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
    path: '/booking',
    name: 'Booking',
    component: Booking
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/register',
    name: 'Register',
    component: Register
  }, 
  {
    path: '/admin',
    name: 'Admin',
    component: Admin
  }, 
  {
    path: '/admin/dashboard',
    name: 'Dashboard',
    component: Dashboard
  },
  { 
    path: '*', 
    component: NotFound 
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router

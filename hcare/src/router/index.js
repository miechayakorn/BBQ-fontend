import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Booking from '../views/Booking.vue'
import ManageBooking from '../views/ManageBooking.vue'
import BookingUseComponent from '../views/BookingUseComponent.vue'
import Register from '../views/Register.vue'
import Login from '../views/Login.vue'


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
    path: '/Login',
    name: 'Login',
    component: Login
  },
  {
    path: '/ManageBooking',
    name: 'ManageBooking',
    component: ManageBooking
  },
  {
    path: '/Register',
    name: 'Register',
    component: Register
  },
  {
    path: '/bookingUseComponent',
    name: 'BookingUseComponent',
    component: BookingUseComponent
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router

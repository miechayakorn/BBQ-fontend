import Vue from "vue";
import VueRouter from "vue-router";
import store from "@/store";

import NotFound from "../views/404.vue";
Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: () =>
      import(/* webpackChunkName: "hcare-default" */ "../views/Home.vue")
  },
  {
    path: "/about",
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "user" */ "../views/About.vue"),
    meta: { requiresAuth: true }
  },
  {
    path: "/booking",
    name: "Booking",
    component: () =>
      import(/* webpackChunkName: "hcare-default" */ "../views/Booking.vue"),
    meta: { requiresAuth: true }
  },
  {
    path: "/bookings/confirm",
    name: "BookingConfirm",
    component: () =>
      import(/* webpackChunkName: "hcare-default" */ "../views/BookingConfirm.vue")
  },
  {
    path: "/bookings/emailcancel",
    name: "BookingCancelByEmail",
    component: () =>
      import(/* webpackChunkName: "hcare-default" */ "../views/BookingCancelByEmail.vue")
  },
  {
    path: "/login",
    name: "Login",
    component: () =>
      import(/* webpackChunkName: "hcare-default" */ "../views/Login.vue")
  },
  {
    path: "/login/confirm",
    name: "LoginConfirm",
    component: () =>
      import(/* webpackChunkName: "hcare-default" */ "../views/LoginConfirm.vue")
  },
  {
    path: "/logout",
    name: "Logout",
    component: () =>
      import(/* webpackChunkName: "hcare-default" */ "../views/Logout.vue"),
    meta: { requiresAuth: true }
  },
  {
    path: "/register",
    name: "Register",
    component: () =>
      import(/* webpackChunkName: "hcare-default" */ "../views/Register.vue")
  },
  {
    path: "/register/confirm",
    name: "RegisterConfirm",
    component: () =>
      import(/* webpackChunkName: "hcare-default" */ "../views/RegisterConfirm.vue")
  },
  {
    path: "/appointment",
    name: "Appointment",
    component: () =>
      import(/* webpackChunkName: "hcare-default" */ "../views/Appointment.vue"),
    meta: { requiresAuth: true }
  },
  {
    path: "/appointment/detail/:id",
    name: "AppointmentDetail",
    component: () =>
      import(/* webpackChunkName: "hcare-default" */ "../views/AppointmentDetail.vue"),
    meta: { requiresAuth: true }
  },
  {
    path: "/history",
    name: "History",
    component: () =>
      import(/* webpackChunkName: "hcare-default" */ "../views/History.vue"),
    meta: { requiresAuth: true }
  },
  {
    path: "/history/detail/:id",
    name: "HistoryDetailed",
    component: () =>
      import(/* webpackChunkName: "hcare-default" */ "../views/HistoryDetailed.vue"),
    meta: { requiresAuth: true }
  },

  //======================== Admin =============================

  {
    path: "/admin",
    name: "Admin",
    component: () =>
      import(/* webpackChunkName: "hcare-admin" */ "../views/admin/Admin.vue"),
    meta: { requiresAuth: true }
  },
  {
    path: "/admin/login",
    name: "AdminLogin",
    component: () =>
      import(/* webpackChunkName: "hcare-admin" */ "../views/admin/AdminLogin.vue"),
  },
  {
    path: "/admin/register/confirm",
    name: "AdminRegister",
    component: () =>
      import(/* webpackChunkName: "hcare-admin" */ "../views/admin/AdminRegister.vue"),
  },
  {
    path: "/admin/dashboard",
    name: "Dashboard",
    component: () =>
      import(/* webpackChunkName: "hcare-admin" */ "../views/admin/Dashboard.vue"),
    meta: { requiresAuth: true }
  },
  {
    path: "/admin/dashboard/history/:id",
    name: "HistoryUser",
    component: () =>
      import(/* webpackChunkName: "hcare-admin" */ "../views/admin/HistoryUser.vue"),
    meta: { requiresAuth: true }
  },
  {
    path: "/admin/dashboard/timetable",
    name: "TimeTable",
    component: () =>
      import(/* webpackChunkName: "hcare-admin" */ "../views/admin/TimeTable.vue"),
    meta: { requiresAuth: true }
  },
  {
    path: "/admin/dashboard/service",
    name: "Service",
    component: () =>
      import(/* webpackChunkName: "hcare-admin" */ "../views/admin/Service.vue"),
    meta: { requiresAuth: true }
  },
  {
    path: "/admin/dashboard/manageEmployee",
    name: "ManageEmp",
    component: () =>
      import(/* webpackChunkName: "hcare-admin" */ "../views/admin/ManageEmp.vue"),
    meta: { requiresAuth: true }
  },
  {
    path: "/admin/dashboard/manageEmployee/edit/:id",
    name: "EditEmpProfile",
    component: () =>
      import(/* webpackChunkName: "hcare-admin" */ "../views/admin/EditEmpProfile.vue"),
    meta: { requiresAuth: true }
  },
  {
    path: "*",
    component: NotFound
  }
];


const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    // this route requires auth, check if logged in
    // if not, redirect to login page.


    if (store.state.token == null) {
      next({
        path: '/login',
        query: { redirect: to.fullPath }
      })
    } else {
      next()
    }



  } else {
    console.log("make sure to always call next()!")
    next() // make sure to always call next()!
  }
})

export default router;

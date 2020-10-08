import Vue from "vue";
import VueRouter from "vue-router";
import CryptoJS from "crypto-js";
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
    path: "/booking",
    name: "Booking",
    // route level code-splitting
    // this generates a separate chunk (booking.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
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
    path: "/login/oauth",
    name: "LoginOAuth",
    component: () =>
      import(/* webpackChunkName: "hcare-default" */ "../views/OAuth.vue")
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
      import(/* webpackChunkName: "hcare-default" */ "../views/Logout.vue")
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
    path: "/admin",
    name: "Admin",
    redirect: "/admin/dashboard",
    component: () =>
      import(/* webpackChunkName: "hcare-admin" */ "../views/admin/Admin.vue"),
    beforeEnter: (to, from, next) => {
      if (store.state.role == "ADMIN" || store.state.role == "STAFF") {
        next()
      } else {
        next({
          path: '/admin/login',
          query: { redirect: to.fullPath }
        })
      }
    },
    children: [
      {
        path: "dashboard",
        name: "Dashboard",
        component: () =>
          import(/* webpackChunkName: "hcare-admin" */ "../views/admin/Dashboard.vue"),
        meta: { requiresAuth: true }
      },
      {
        path: "dashboard/history/:id",
        name: "HistoryUser",
        component: () =>
          import(/* webpackChunkName: "hcare-admin" */ "../views/admin/HistoryUser.vue"),
        meta: { requiresAuth: true }
      },
      {
        path: "dashboard/timetable",
        name: "TimeTable",
        component: () =>
          import(/* webpackChunkName: "hcare-admin" */ "../views/admin/TimeTable.vue"),
        meta: { requiresAuth: true }
      },
      {
        path: "dashboard/service",
        name: "Service",
        component: () =>
          import(/* webpackChunkName: "hcare-admin" */ "../views/admin/Service.vue"),
        meta: { requiresAuth: true }
      },
      {
        path: "dashboard/manageEmployee",
        name: "ManageEmp",
        component: () =>
          import(/* webpackChunkName: "hcare-admin" */ "../views/admin/ManageEmp.vue"),
        meta: { requiresAuth: true }
      },
      {
        path: "dashboard/manageEmployee/edit/:id",
        name: "EditEmpProfile",
        component: () =>
          import(/* webpackChunkName: "hcare-admin" */ "../views/admin/EditEmpProfile.vue"),
        meta: { requiresAuth: true }
      },],
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
  if (store.state.token == null && localStorage.getItem("user")) {
    let user = JSON.parse(localStorage.getItem("user"));
    if (user && user.first_name && user.last_name && user.role && user.token) {
      //decrypt
      user.first_name = CryptoJS.AES.decrypt(
        user.first_name,
        "hcare6018"
      ).toString(CryptoJS.enc.Utf8);

      user.last_name = CryptoJS.AES.decrypt(
        user.last_name,
        "hcare6018"
      ).toString(CryptoJS.enc.Utf8);

      user.role = CryptoJS.AES.decrypt(user.role, "hcare6018").toString(
        CryptoJS.enc.Utf8
      );

      store.state.token = user.token;
      store.state.role = user.role;
      store.state.user = {
        first_name: user.first_name,
        last_name: user.last_name,
      };
    }
  }

  if (to.matched.some(record => record.meta.requiresAuth)) {
    // this route requires auth, check if logged in
    // if not, redirect to login page.
    if (store.state.token || to.matched[0].name == "Admin") {
      next()
    } else {
      next({
        path: '/login',
        query: { redirect: to.fullPath }
      })
    }
  } else {
    next() // make sure to always call next()!
  }
})

export default router;

import Vue from "vue";
import VueRouter from "vue-router";
//User
import Home from "../views/Home.vue";
import Appointment from "../views/Appointment.vue";
import AppointmentDetail from "../views/AppointmentDetail.vue";
import Booking from "../views/Booking.vue";
import BookingConfirm from "../views/BookingConfirm.vue";
import BookingCancelByEmail from "../views/BookingCancelByEmail.vue";
import Login from "../views/Login.vue";
import LoginConfirm from "../views/LoginConfirm.vue";
import Logout from "../views/Logout.vue";
import Register from "../views/Register.vue";
import RegisterConfirm from "../views/RegisterConfirm.vue";
//Admin
import Admin from "../views/admin/Admin.vue";
import Dashboard from "../views/admin/Dashboard.vue";
import TimeTable from "../views/admin/TimeTable.vue";
import Service from "../views/admin/Service.vue";
import AdminLogin from "../views/admin/AdminLogin.vue";
import ManageEmp from "../views/admin/ManageEmp.vue";
//Service
import NotFound from "../views/404.vue";
Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/about",
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue")
  },
  {
    path: "/booking",
    name: "Booking",
    component: Booking
  },
  {
    path: "/bookings/confirm",
    name: "BookingConfirm",
    component: BookingConfirm
  },
  {
    path: "/bookings/emailcancel",
    name: "BookingCancelByEmail",
    component: BookingCancelByEmail
  },
  {
    path: "/login",
    name: "Login",
    component: Login
  },
  {
    path: "/login/confirm",
    name: "LoginConfirm",
    component: LoginConfirm
  },
  {
    path: "/logout",
    name: "Logout",
    component: Logout
  },
  {
    path: "/register",
    name: "Register",
    component: Register
  },
  {
    path: "/register/confirm",
    name: "RegisterConfirm",
    component: RegisterConfirm
  },
  {
    path: "/admin",
    name: "Admin",
    component: Admin
  },
  {
    path: "/admin/dashboard",
    name: "Dashboard",
    component: Dashboard
  },
  {
    path: "/admin/dashboard/timetable",
    name: "TimeTable",
    component: TimeTable
  },
  {
    path: "/admin/dashboard/service",
    name: "Service",
    component: Service
  },
  {
    path: "/admin/login",
    name: "AdminLogin",
    component: AdminLogin
  },
  {
    path: "/admin/dashboard/manageEmployee",
    name: "manageEmp",
    component: ManageEmp
  },
  {
    path: "/appointment",
    name: "appointment",
    component: Appointment
  },
  {
    path: "/appointment/detail/:id",
    name: "AppointmentDetail",
    component: AppointmentDetail
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

export default router;

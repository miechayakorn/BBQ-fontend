import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Booking from "../views/Booking.vue";
import Dashboard from "../views/admin/Dashboard.vue";
import DashAppointment from "../views/admin/DashAppointment.vue";
import Register from "../views/Register.vue";
import RegisterConfirm from "../views/RegisterConfirm.vue";
import Login from "../views/Login.vue";
import Logout from "../views/Logout.vue";
import NotFound from "../views/404.vue";
import Admin from "../views/admin/Admin.vue";
import Test from "../views/test.vue";
import Appointment from "../views/Appointment.vue";
import AppointmentDetail from "../views/AppointmentDetail.vue";
import BookingConfirm from "../views/BookingConfirm.vue";
import BookingCancelByEmail from "../views/BookingCancelByEmail.vue";

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
    path: "/admin/dashboard/appointment/:id",
    name: "DashAppointment",
    component: DashAppointment
  },
  {
    path: "/test",
    name: "test",
    component: Test
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

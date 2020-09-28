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
import AdminLogin from "../views/admin/AdminLogin.vue";
import AdminRegister from "../views/admin/AdminRegister.vue";
import Dashboard from "../views/admin/Dashboard.vue";
import TimeTable from "../views/admin/TimeTable.vue";
import Service from "../views/admin/Service.vue";
import ManageEmp from "../views/admin/ManageEmp.vue";
import EditEmpProfile from "../views/admin/EditEmpProfile.vue";
import HistoryUser from "../views/admin/HistoryUser.vue";
import History from "../views/History.vue";
import HistoryDetailed from "../views/HistoryDetailed.vue";
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
    redirect: "/admin/dashboard"
  },
  {
    path: "/admin/login",
    name: "AdminLogin",
    component: AdminLogin
  },
  {
    path: "/admin/register/confirm",
    name: "AdminRegister",
    component: AdminRegister
  },
  {
    path: "/admin/dashboard",
    name: "Dashboard",
    component: Dashboard
  },
  {
    path: "/admin/dashboard/history/:id",
    name: "HistoryUser",
    component: HistoryUser
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
    path: "/admin/dashboard/manageEmployee",
    name: "ManageEmp",
    component: ManageEmp
  },
  {
    path: "/admin/dashboard/manageEmployee/edit/:id",
    name: "EditEmpProfile",
    component: EditEmpProfile
  },
  {
    path: "/appointment",
    name: "Appointment",
    component: Appointment
  },
  {
    path: "/history",
    name: "History",
    component: History
  },
  {
    path: "/history/detail/:id",
    name: "HistoryDetailed",
    component: HistoryDetailed
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

<template>
  <nav class="navbar fixed-top bg-white bd-navbar site-header sticky-top">
    <router-link to="/">
      <logoHeaderMini style="width: 55px; height: 17px; margin-top:0px;" />
    </router-link>
    <button
      class="navbar-toggler toggler-example"
      type="button"
      data-toggle="collapse"
      data-target="#navbarCollapse"
      aria-controls="navbarCollapse"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span style="color:#99A3FF">
        <i class="fas fa-bars fa-1x"></i>
      </span>
    </button>

    <div class="collapse navbar-collapse bg-white text-left text-md-center" id="navbarCollapse">
      <ul class="navbar-nav mr-auto"></ul>
      <ul class="navbar-nav mt-2 mt-md-0 blackTextMenu">
        <li class="nav-item">
          <div class="float-right">V 1.0</div>
          <img
            src="https://www.w3schools.com/bootstrap4/paris.jpg"
            style="margin-top:24px; width: 56px; height: 56px;"
            class="rounded-circle centerImg"
            alt
          />
          <p
            class="d-flex justify-content-center mb-0 mt-2"
          >{{ user.first_name }} {{ user.last_name }}</p>
        </li>
        <hr class="lineHr" />
        <li
          class="nav-item"
          data-toggle="collapse"
          data-target="#navbarCollapse"
          aria-expanded="false"
        >
          <router-link class="nav-link blackTextMenu" to="/">
            <iconHome style="margin-right:14px;" />Home
          </router-link>
        </li>
        <li class="nav-item">
          <router-link
            data-toggle="collapse"
            data-target="#navbarCollapse"
            aria-expanded="false"
            class="nav-link blackTextMenu"
            to="/booking"
          >
            <iconNote style="margin-right:14px;" />ทำนัด
          </router-link>
        </li>
        <li class="nav-item">
          <router-link
            data-toggle="collapse"
            data-target="#navbarCollapse"
            aria-expanded="false"
            class="nav-link blackTextMenu"
            to="/queue"
          >
            <iconPaper style="margin-right:14px;" />กดคิว
          </router-link>
        </li>
        <li class="nav-item">
          <router-link
            data-toggle="collapse"
            data-target="#navbarCollapse"
            aria-expanded="false"
            class="nav-link blackTextMenu"
            to="#"
          >
            <iconClock style="margin-right:14px;" />ตารางให้บริการ
          </router-link>
        </li>
        <hr class="lineHr" />
        <li class="nav-item">
          <router-link
            data-toggle="collapse"
            data-target="#navbarCollapse"
            aria-expanded="false"
            class="nav-link blackTextMenu"
            to="/appointment"
          >
            <iconCalendar style="margin-right:14px;" />นัดของฉัน
          </router-link>
        </li>
        <li class="nav-item">
          <router-link
            data-toggle="collapse"
            data-target="#navbarCollapse"
            aria-expanded="false"
            class="nav-link blackTextMenu"
            to="#"
          >
            <iconNoti style="margin-right:14px;" />Notification
          </router-link>
        </li>
        <li class="nav-item">
          <router-link
            data-toggle="collapse"
            data-target="#navbarCollapse"
            aria-expanded="false"
            class="nav-link blackTextMenu"
            to="#"
          >
            <iconTime style="margin-right:14px;" />History
          </router-link>
        </li>
        <hr class="lineHr" />
        <router-link v-if="log" to="/logout">
          <button
            data-toggle="collapse"
            data-target="#navbarCollapse"
            aria-expanded="false"
            class="btn btnLogout mx-auto d-flex justify-content-center"
          >
            <span style="font-weight:900">ออกจากระบบ</span>
          </button>
        </router-link>
        <router-link v-else to="/login">
          <button
            data-toggle="collapse"
            data-target="#navbarCollapse"
            aria-expanded="false"
            class="btn btnLogout mx-auto"
          >
            <span style="font-weight:900">เข้าสู่ระบบ</span>
          </button>
        </router-link>
      </ul>
    </div>
  </nav>
</template>
<script>
import logoHeaderMini from "@/components/svg/logoHeaderMini.vue";
import iconCalendar from "@/components/svg/icon/iconCalendar.vue";
import iconClock from "@/components/svg/icon/iconClock.vue";
import iconHome from "@/components/svg/icon/iconHome.vue";
import iconNote from "@/components/svg/icon/iconNote.vue";
import iconNoti from "@/components/svg/icon/iconNoti.vue";
import iconPaper from "@/components/svg/icon/iconPaper.vue";
import iconTime from "@/components/svg/icon/iconTime.vue";

export default {
  data() {
    return {
      user: {
        first_name: "",
        last_name: ""
      },
      log: false
    };
  },
  mounted() {
    if (this.$store.state.user.first_name && this.$store.state.user.last_name) {
      this.user.first_name = this.$store.state.user.first_name;
      this.user.last_name = this.$store.state.user.last_name;
      this.log = true;
    } else {
      this.user.first_name = "กรุณา";
      this.user.last_name = "เข้าสู่ระบบ";
    }
  },
  components: {
    logoHeaderMini,
    iconCalendar,
    iconClock,
    iconHome,
    iconNote,
    iconNoti,
    iconPaper,
    iconTime
  }
};
</script>
<style>
@media (max-width: 992px) {
  .navbar-collapse {
    position: absolute;
    top: 45px;
    /* left: 100%; */
    margin-left: 20%;
    padding-left: 15px;
    padding-right: 15px;
    padding-bottom: 15px;
    width: 80%;
    transition: all 0.4s ease;
    display: block;
  }
  .navbar-collapse.collapsing {
    height: auto !important;
    margin-left: 50%;
    left: 50%;
    transition: all 0.2s ease;
  }
  .navbar-collapse.show {
    left: 0;
  }
}
.blackTextMenu {
  color: #555555;
}
.centerImg {
  display: block;
  margin-left: auto;
  margin-right: auto;
  width: 50%;
}
.lineHr {
  width: 242px;
  height: 0px;
  border: 1px solid #efefef;
}
.btnLogout {
  background-color: #f26262;
  height: 34px;
  width: 242px;
  color: #ffffff;
  border-radius: 15px;
}
</style>

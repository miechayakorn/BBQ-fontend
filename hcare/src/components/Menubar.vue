<template>
  <nav class="navbar fixed-top bg-white bd-navbar site-header sticky-top">
    <router-link to="/">
      <logoHeaderMini class="mt-1" />
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
      <span style="color: #99a3ff">
        <i class="fas fa-bars fa-1x"></i>
      </span>
    </button>

    <div
      class="collapse navbar-collapse bg-white text-left text-md-center"
      id="navbarCollapse"
    >
      <ul class="navbar-nav mr-auto"></ul>
      <ul class="navbar-nav blackTextMenu">
        <div class="col-12">
          <div class="float-right">
            <select v-model="selectLang" class="form-control">
              <option
                v-for="(lang, i) in langs"
                :key="`Lang${i}`"
                :value="lang"
              >
                {{ lang }}
              </option>
            </select>
          </div>
        </div>
        <li class="nav-item" style="margin-top: -50px">
          <router-link
            data-toggle="collapse"
            data-target="#navbarCollapse"
            aria-expanded="false"
            to="/profile"
          >
            <div v-if="this.$store.state.user.profile_picture == null">
              <logoAdmin
                v-if="this.$store.state.role == 'ADMIN'"
                class="centerImg"
              />
              <logoStaff
                v-else-if="this.$store.state.role == 'STAFF'"
                class="centerImg"
              />
              <logoUser v-else class="centerImg" />
            </div>
            <div v-else-if="this.$store.state.user.profile_picture">
              <img
                class="rounded-circle centerImg"
                width="56"
                height="56"
                :src="this.$store.state.user.profile_picture"
              />
            </div>
          </router-link>
          <p
            v-if="this.$store.state.token"
            class="d-flex justify-content-center mb-0 mt-2"
          >
            {{ this.$store.state.user.first_name }}
            {{ this.$store.state.user.last_name }}
          </p>
          <router-link
            data-toggle="collapse"
            data-target="#navbarCollapse"
            aria-expanded="false"
            v-if="this.$store.state.token == null"
            to="/login"
          >
            <p class="d-flex justify-content-center mb-0 mt-2">
              {{ $t("loginMessage") }}
            </p>
          </router-link>
        </li>
        <hr class="lineHr" />
        <div class="mb-3" v-if="this.$store.state.token">
          <li
            class="nav-item"
            data-toggle="collapse"
            data-target="#navbarCollapse"
            aria-expanded="false"
          >
            <router-link class="nav-link blackTextMenu" to="/">
              <iconHome style="margin-right: 14px" />Home
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
              <iconNote style="margin-right: 14px" />{{ $t("appointment") }}
            </router-link>
          </li>
          <li class="nav-item">
            <router-link
              data-toggle="collapse"
              data-target="#navbarCollapse"
              aria-expanded="false"
              class="nav-link blackTextMenu"
              to="/appointment"
            >
              <iconCalendar style="margin-right: 14px" />{{
                $t("myappointment")
              }}
            </router-link>
          </li>
          <li class="nav-item">
            <router-link
              data-toggle="collapse"
              data-target="#navbarCollapse"
              aria-expanded="false"
              class="nav-link blackTextMenu"
              to="/schedule"
            >
              <iconClock style="margin-right: 14px" />{{
                $t("serviceschedule")
              }}
            </router-link>
          </li>
          <li class="nav-item">
            <router-link
              data-toggle="collapse"
              data-target="#navbarCollapse"
              aria-expanded="false"
              class="nav-link blackTextMenu"
              to="/history"
            >
              <iconTime style="margin-right: 14px" />{{ $t("history") }}
            </router-link>
          </li>
          <hr class="lineHr" />
          <li
            class="nav-item"
            data-toggle="collapse"
            data-target="#navbarCollapse"
            aria-expanded="false"
          >
            <router-link class="nav-link blackTextMenu" to="/profile">
              <i class="far fa-user" style="margin-right: 14px"></i
              >ข้อมูลส่วนตัว
            </router-link>
          </li>
          <router-link
            v-if="
              this.$store.state.role == 'ADMIN' ||
                this.$store.state.role == 'STAFF'
            "
            data-toggle="collapse"
            data-target="#navbarCollapse"
            aria-expanded="false"
            class="nav-link blackTextMenu"
            to="/admin/dashboard"
          >
            <iconHome style="margin-right: 14px" />Admin Dashboard
          </router-link>
          <hr class="lineHr" />
          <router-link v-if="this.$store.state.token" to="/logout">
            <button
              data-toggle="collapse"
              data-target="#navbarCollapse"
              aria-expanded="false"
              class="btn btnLogout mx-auto d-flex justify-content-center"
            >
              <span style="font-weight: 900">{{ $t("logout") }}</span>
            </button>
          </router-link>
          <router-link v-else to="/login">
            <button
              data-toggle="collapse"
              data-target="#navbarCollapse"
              aria-expanded="false"
              class="btn btnLogout mx-auto"
            >
              <span style="font-weight: 900">{{ $t("loginMessage") }}</span>
            </button>
          </router-link>
        </div>
      </ul>
    </div>
  </nav>
</template>
<script>
import logoHeaderMini from "@/components/svg/logoHeaderMini.vue";
import logoUser from "@/components/svg/logoUser.vue";
import logoStaff from "@/components/svg/logoStaff.vue";
import logoAdmin from "@/components/svg/logoAdmin.vue";
import iconCalendar from "@/components/svg/icon/iconCalendar.vue";
import iconClock from "@/components/svg/icon/iconClock.vue";
import iconHome from "@/components/svg/icon/iconHome.vue";
import iconNote from "@/components/svg/icon/iconNote.vue";
import iconPaper from "@/components/svg/icon/iconPaper.vue";
import iconTime from "@/components/svg/icon/iconTime.vue";

export default {
  data() {
    return { selectLang: "", langs: ["th", "en"] };
  },
  mounted() {
    this.selectLang = localStorage.getItem("locale") || "th";
  },
  watch: {
    selectLang: {
      handler: async function(val, oldCal) {
        if (val) {
          this.$i18n.locale = val;
          localStorage.setItem("locale", val);
        }
      }
    }
  },
  components: {
    logoHeaderMini,
    iconCalendar,
    iconClock,
    iconHome,
    iconNote,
    iconPaper,
    iconTime,
    logoUser,
    logoStaff,
    logoAdmin
  }
};
</script>
<style>
.navbar-collapse {
  position: absolute;
  background: #99a3ff;
  top: 52.5px;
  width: 35%;
  margin-left: 65%;
  padding-left: 15px;
  padding-right: 15px;
  padding-bottom: 15px;
  transition: all 0.4s ease;
  display: block;
  box-shadow: 0 10px 10px rgba(0, 0, 0, 0.15);
}

@media (max-width: 992px) {
  .navbar-collapse {
    margin-left: 0;
    width: 100%;
  }
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
.blackTextMenu {
  color: #555555;
}
.centerImg {
  display: block;
  margin: auto;
  margin-top: 24px;
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

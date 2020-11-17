<template>
  <div class="home">
    <div v-if="loading" class="container">
      <VclFacebook />
      <VclList class="mt-2" />
      <VclList class="mt-2" />
    </div>
    <div v-if="!loading" class="container home-screen">
      <div class="row">
        <div class="col-6 col-md-3 p-1">
          <router-link to="/booking">
            <div class="btnHomeActive m-1">
              <div
                class="text-center"
                style="margin-top: 32px; margin-bottom: 32px"
              >
                <iconNote2 :color="'white'" />
                <p style="color: #ffffff; margin-top: 8px">
                  {{ $t("appointment") }}
                </p>
              </div>
            </div>
          </router-link>
        </div>
        <div class="col-6 col-md-3 p-1">
          <router-link to="/appointment">
            <div class="btnHomeCalendar m-1">
              <div
                class="text-center"
                style="margin-top: 32px; margin-bottom: 32px"
              >
                <iconCalendar2 />
                <p style="color: #ffffff; margin-top: 8px">
                  {{ $t("myappointment") }}
                </p>
              </div>
            </div>
          </router-link>
        </div>
        <div class="col-6 col-md-3 p-1">
          <router-link to="/schedule">
            <div class="btnHomeSchedule m-1">
              <div
                class="text-center"
                style="margin-top: 32px; margin-bottom: 32px"
              >
                <iconClock2 />
                <p style="color: #ffffff; margin-top: 8px">
                  {{ $t("serviceschedule") }}
                </p>
              </div>
            </div>
          </router-link>
        </div>
        <div class="col-6 col-md-3 p-1">
          <router-link to="/history">
            <div class="btnHomeHistory m-1">
              <div
                class="text-center"
                style="margin-top: 32px; margin-bottom: 32px"
              >
                <iconMedicine />
                <p style="color: #ffffff; margin-top: 8px">
                  {{ $t("history") }}
                </p>
              </div>
            </div>
          </router-link>
        </div>
        <div class="col-12 mt-3">
          <div class="card btnHome" style="max-width: 500px">
            <div class="row no-gutters">
              <div class="col-5">
                <woman class="card-img-bottom h-100" />
              </div>
              <div v-if="this.$store.state.token == null" class="col-7">
                <h6 class="card-title text-center title-card-app">
                  {{ $t("loginMessage") }}
                </h6>
                <router-link
                  to="/login"
                  class="btn btn-primary btn-comming link-meeting text-white"
                >
                  <span class="px-4">Login</span>
                </router-link>
              </div>
              <div
                v-if="this.$store.state.token && checkAppointment"
                class="col-7"
              >
                <h6 class="card-title text-md-center text-left title-card-app">
                  คุณยังไม่มีนัดหมาย
                </h6>
                <h6 class="card-title text-md-center text-left title-card-app">
                  หรือยังไม่ได้กดยืนยันที่ Email
                </h6>
              </div>
              <div class="col-7">
                <div
                  v-if="this.$store.state.token && checkAppointment == false"
                  class="ml-3"
                >
                  <h6
                    class="card-title text-md-center text-left title-card-app"
                  >
                    {{ $t("upcoming") }}
                  </h6>
                  <p
                    class="text-md-center text-left"
                    style="font-size: 12px; line-height: 18px; color: #444444"
                  >
                    <span
                      class="text-primary font-weight-bold"
                      style="font-size: 14px; line-height: 21px; color: #99a3ff"
                    >
                      {{ dataFetch.type_name }}
                      <br />
                    </span>
                    {{ dataFetch.dateformat }}
                    <br />
                    เวลา {{ dataFetch.time_in.slice(0, 5) }} น.
                  </p>
                  <a
                    v-if="dataFetch.link_meeting"
                    :href="dataFetch.link_meeting"
                    class="btn btn-primary btn-comming link-meeting"
                  >
                    <span class="px-4">Join Meeting</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
        <hr
          v-if="announcements.length != 0"
          style="width: 85%; border: 2px solid #f1efef"
        />
        <div
          class="col-12 col-md-6 mt-2"
          v-for="(item, index) in announcements"
          :key="index"
        >
          <div class="card btnHome">
            <div class="row">
              <div class="col-12 mt-3"><iconAnnouncement /></div>
              <div class="col-12 mt-3 mb-3">
                <h5 style="font-weight: bold; color: #5e65a1">
                  ประกาศปิดบริการ : {{ item.type_name }}
                </h5>
                <div class="col-12 text-center">
                  <span>
                    <small>{{ item.announcement }}</small>
                  </span>
                </div>
                <span style="font-size: 8px; color: #6c757d"
                  >ประกาศวันที่: {{ item.date }}</span
                >
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import HelloWorld from "@/components/HelloWorld.vue";
import iconNote2 from "@/components/svg/icon/iconNote-2.vue";
import iconMedicine from "@/components/svg/icon/iconMedicine.vue";
import iconClock2 from "@/components/svg/icon/iconClock-2.vue";
import iconCalendar2 from "@/components/svg/icon/iconCalendar-2.vue";
import iconAnnouncement from "@/components/svg/icon/iconAnnouncement.vue";
import woman from "@/components/svg/woman.vue";
import { VclFacebook, VclList } from "vue-content-loading";

export default {
  name: "Home",
  components: {
    HelloWorld,
    iconNote2,
    iconMedicine,
    iconClock2,
    iconCalendar2,
    woman,
    VclFacebook,
    VclList,
    iconAnnouncement,
  },
  data() {
    return {
      loading: false,
      user: {
        account_id: "",
        hn_number: "",
        first_name: "",
        last_name: "",
        verify: null,
        gender: null,
        date_of_birth: null,
        email: "",
        telephone: null,
      },
      dataFetch: {
        time_in: "",
      },
      checkAppointment: false,
      announcements: [],
    };
  },
  async mounted() {
    this.loading = true;
    if (this.$store.state.token) {
      await axios
        .get(`${process.env.VUE_APP_BACKEND_URL}/myappointment`, {
          headers: { Authorization: `Bearer ${this.$store.state.token}` },
        })
        .then((res) => {
          if (res.status == 204) {
            this.checkAppointment = true;
          }
          this.dataFetch = res.data[0];
        });
    }
    this.fetchAnnouncements();
    this.loading = false;
  },
  methods: {
    async fetchAnnouncements() {
      await axios
        .get(`${process.env.VUE_APP_BACKEND_URL}/announcement`, {
          headers: { Authorization: `Bearer ${this.$store.state.token}` },
        })
        .then((res) => {
          this.announcements = res.data;
        });
    },
  },
};
</script>
<style>
.home-screen {
  padding-left: 24px;
  padding-right: 24px;
  margin-bottom: 32px;
}
.btnHome {
  background-color: #ffffff;
  border: 2px solid #ffffff;
  border-radius: 8px;
  box-shadow: 0px 4px 8px #f2f4ff;
}
.btnHomeCalendar {
  background-color: #ffe592;
  border: 2px solid #ffe592;
  border-radius: 8px;
  box-shadow: 0px 4px 8px #f2f4ff;
}
.btnHomeActive {
  background-color: #99a3ff;
  border: 2px solid #99a3ff;
  border-radius: 8px;
  box-shadow: 0px 4px 8px #f2f4ff;
}
.btnHomeHistory {
  background-color: #ffa78b;
  border: 2px solid #ffa78b;
  border-radius: 8px;
  box-shadow: 0px 4px 8px #f2f4ff;
}
.btnHomeSchedule {
  background-color: #7dd6b8;
  border: 2px solid #7dd6b8;
  border-radius: 8px;
  box-shadow: 0px 4px 8px #f2f4ff;
}
.btn-comming {
  border-radius: 31px;
}
.title-card-app {
  margin-top: 16px;
  font-style: normal;
  font-weight: bold;
  font-size: 14px;
  line-height: 21px;
}
.link-meeting {
  margin-bottom: 16px;
  font-style: normal;
  font-weight: bold;
  font-size: 12px;
  line-height: 18px;
}
</style>

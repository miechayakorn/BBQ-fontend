<template>
  <div class="home">
    <div class="container">
      <div class="row">
        <div class="col-6 col-md-3 mt-1">
          <router-link to="/booking">
            <div class="col-12 btnHomeActive">
              <div class="text-center" style="margin-top: 36px;">
                <iconNote2 :color="'white'" />
                <p style="color: #FFFFFF; margin-top: 8px;">ทำนัด</p>
              </div>
            </div>
          </router-link>
        </div>
        <div class="col-6 col-md-3 mt-1">
          <router-link to="/appointment">
            <div class="col-12 btnHomeCalendar">
              <div class="text-center" style="margin-top: 36px;">
                <iconCalendar2 />
                <p style="color: #FFFFFF; margin-top: 8px;">นัดของฉัน</p>
              </div>
            </div>
          </router-link>
        </div>
        <div class="col-6 col-md-3 mt-3 mt-md-1">
          <!-- <router-link to="#"> -->
          <div class="col-12 btnHome">
            <div class="text-center" style="margin-top: 36px;">
              <iconClock2 />
              <p style="color: #D8D8D8; margin-top: 8px;">
                ตารางให้บริการ
                <br />
                <span style="color: #D8D8D8; font-size: 12px; margin-bottom 1px;">coming soon</span>
              </p>
            </div>
          </div>
          <!-- </router-link> -->
        </div>
        <div class="col-6 col-md-3 mt-3 mt-md-1">
          <router-link to="/history">
            <div class="col-12 btnHomeHistory">
              <div class="text-center" style="margin-top: 36px;">
                <iconMedicine />
                <p style="color: #FFFFFF; margin-top: 8px;">ประวัติรับบริการ</p>
              </div>
            </div>
          </router-link>
        </div>
      </div>
      <div class="row">
        <div class="col-12 mt-3">
          <div class="card btnHome" style="max-width: 500px;">
            <div class="row no-gutters">
              <div class="col-5">
                <woman class="card-img-bottom h-100" />
              </div>
              <div v-if="this.$store.state.token == null" class="col-7">
                <h6 class="card-title text-md-center text-left title-card-app">กรุณา เข้าสู่ระบบ</h6>
              </div>
              <div v-if="this.$store.state.token && checkAppointment" class="col-7">
                <h6 class="card-title text-md-center text-left title-card-app">คุณยังไม่มีนัดหมาย</h6>
                <h6
                  class="card-title text-md-center text-left title-card-app"
                >หรือยังไม่ได้กดยืนยันที่ Email</h6>
              </div>
              <div class="col-7">
                <div
                  v-if="this.$store.state.token && checkAppointment == false"
                  class="card-body ml-3"
                >
                  <h6
                    class="card-title text-md-center text-left title-card-app"
                  >นัดของคุณที่กำลังจะมาถึง</h6>
                  <p
                    class="text-md-center text-left"
                    style="
                            font-style: normal;
                            font-weight: normal;
                            font-size: 12px;
                            line-height: 18px;
                            color: #444444;"
                  >
                    <span
                      class="text-primary"
                      style="font-style: normal; font-weight: bold; font-size: 14px; line-height: 21px;  color: #99A3FF;"
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
                    class="btn btn-primary btn-comming"
                    style="margin-bottom:16px; font-style: normal; font-weight: bold; font-size: 12px; line-height: 18px;"
                  >
                    <span class="px-4">Meeting</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import HelloWorld from "@/components/HelloWorld.vue";
import iconNote2 from "@/components/svg/icon/iconNote-2.vue";
import iconMedicine from "@/components/svg/icon/iconMedicine.vue";
import iconClock2 from "@/components/svg/icon/iconClock-2.vue";
import iconCalendar2 from "@/components/svg/icon/iconCalendar-2.vue";
import woman from "@/components/svg/woman.vue";
import axios from "axios";

export default {
  name: "Home",
  components: {
    HelloWorld,
    iconNote2,
    iconMedicine,
    iconClock2,
    iconCalendar2,
    woman,
  },
  data() {
    return {
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
    };
  },
  async mounted() {
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
  },
};
</script>
<style>
.btnHome {
  background-color: #ffffff;
  border: 2px solid #ffffff;
  border-radius: 8px;
  height: 100%;
  box-shadow: 0px 4px 8px #f2f4ff;
}
.btnHomeCalendar {
  background-color: #ffe592;
  border: 2px solid #ffe592;
  border-radius: 8px;
  height: 100%;
  box-shadow: 0px 4px 8px #f2f4ff;
}
.btnHomeActive {
  background-color: #99a3ff;
  border: 2px solid #99a3ff;
  border-radius: 8px;
  height: 100%;
  box-shadow: 0px 4px 8px #dfe2ff;
}
.btnHomeHistory {
  background-color: #ffa78b;
  border: 2px solid #ffa78b;
  border-radius: 8px;
  height: 100%;
  box-shadow: 0px 4px 8px #dfe2ff;
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
</style>

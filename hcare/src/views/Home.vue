<template>
  <div class="home">
    <div class="container">
      <div class="row">
        <div class="col-6 col-md-3 mt-1">
          <router-link to="/booking">
            <div class="col-12 btnHomeActive" style="cursor: pointer;">
              <div class="text-center" style="margin-top: 36px;">
                <iconNote2 :color="'white'" />
                <p style="color: #FFFFFF; margin-top: 8px;">ทำนัด</p>
              </div>
            </div>
          </router-link>
        </div>
        <div class="col-6 col-md-3 mt-1">
          <router-link to="#">
            <div class="col-12 btnHome" style="cursor: pointer;">
              <div class="text-center" style="margin-top: 36px;">
                <iconBill :color="'#99A3FF'" />
                <p style="color: #555555; margin-top: 8px;">กดคิว</p>
              </div>
            </div>
          </router-link>
        </div>
        <div class="col-6 col-md-3 mt-3 mt-md-1">
          <router-link to="#">
            <div class="col-12 btnHome" style="cursor: pointer;">
              <div class="text-center" style="margin-top: 36px;">
                <iconClock2 />
                <p style="color: #555555; margin-top: 8px;">ตารางให้บริการ</p>
              </div>
            </div>
          </router-link>
        </div>
        <div class="col-6 col-md-3 mt-3 mt-md-1">
          <router-link to="/appointment">
            <div class="col-12 btnHome" style="cursor: pointer;">
              <div class="text-center" style="margin-top: 36px;">
                <iconCalendar2 />
                <p style="color: #555555; margin-top: 8px;">นัดของฉัน</p>
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
              <div v-if="checkAppointment" class="col-7">
                <h6 class="card-title text-md-center text-left title-card-app">
                  คุณยังไม่มีนัดหมาย
                </h6>
                <h6 class="card-title text-md-center text-left title-card-app">
                  หรือยังไม่ได้กดยืนยันที่ Email
                </h6>
              </div>
              <div class="col-7">
                <div v-if="checkAppointment == false" class="card-body ml-3">
                  <h6
                    class="card-title text-md-center text-left title-card-app"
                  >
                    นัดของคุณที่กำลังจะมาถึง
                  </h6>
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
      <div class="row">
        <div class="col-12 mt-3" style="margin-bottom:200px;">
          <div class="card btnHome mb-5">Dash Board</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import HelloWorld from "@/components/HelloWorld.vue";
import iconNote2 from "@/components/svg/icon/iconNote-2.vue";
import iconBill from "@/components/svg/icon/iconBill.vue";
import iconClock2 from "@/components/svg/icon/iconClock-2.vue";
import iconCalendar2 from "@/components/svg/icon/iconCalendar-2.vue";
import woman from "@/components/svg/woman.vue";
import axios from "axios";

export default {
  name: "Home",
  components: {
    HelloWorld,
    iconNote2,
    iconBill,
    iconClock2,
    iconCalendar2,
    woman
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
        telephone: null
      },
      dataFetch: {
        time_in: ""
      },
      checkAppointment: false
    };
  },
  async mounted() {
    if (localStorage.getItem("user")) {
      const user = JSON.parse(localStorage.getItem("user"));
      this.user = user;
      await axios
        .post(`${process.env.VUE_APP_BACKEND_URL}/myappointment`, {
          account_id: this.user.account_id
        })
        .then(res => {
          if (res.status == 204) {
            this.checkAppointment = true;
          } else {
            this.dataFetch = res.data[0];
            console.log(this.dataFetch);
          }
        });
    } else {
      this.$swal({
        title: "คำเตือน",
        text: "กรุณาเข้าสู่ระบบ",
        icon: "warning"
      }).then(this.$router.push("login"));
    }
  }
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
.btnHomeActive {
  background-color: #99a3ff;
  border: 2px solid #99a3ff;
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

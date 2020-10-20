<template>
  <div class="container fixed-container mb-3">
    <div v-if="loading">
      <VclFacebook />
      <VclList class="mt-2" />
      <VclList class="mt-2" />
    </div>
    <div v-if="!loading">
      <div class="form-group text-left">
        <label class="font-weight-bold mb-4">นัดของฉัน</label>
        <div class="form">
          <div class="container">
            <AppointmentCard v-if="!checkAppointment" :data="dataFetch" />
            <div class v-else-if="checkAppointment">
              <div class="row">
                <div class="col-12">
                  <span class="announcement d-flex justify-content-center mt-3"
                    >คุณยังไม่มีนัดหมาย</span
                  >
                  <span class="d-flex justify-content-center mt-3"
                    >กรุณาตรวจสอบและกดยืนยันที่ Email</span
                  >
                </div>
                <div class="fix-buttom-man">
                  <man />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="row mt-5" style="text-align: center">
        <div class="col-12" @click="$router.go(-1)">
          <button
            class="btn btnBlock btn-primary fixed-button mb-2"
            style="border-radius: 10px"
          >
            <span style="font-weight: 900; color: white">ย้อนกลับ</span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import AppointmentCard from "@/components/AppointmentCard.vue";
import man from "@/components/svg/man.vue";
import { VclFacebook, VclList } from "vue-content-loading";

export default {
  data() {
    return {
      loading: false,
      dataFetch: [],
      checkAppointment: false,
      interval: undefined,
    };
  },
  components: {
    AppointmentCard,
    man,
    VclFacebook,
    VclList,
  },
  async mounted() {
    this.loading = true;
    await axios
      .get(`${process.env.VUE_APP_BACKEND_URL}/myappointment`, {
        headers: { Authorization: `Bearer ${this.$store.state.token}` },
      })
      .then((res) => {
        if (res.status == 204) {
          this.checkAppointment = true;
        } else {
          this.checkAppointment = false;
          this.dataFetch = res.data;
        }
      });
    this.loading = false;
    this.interval = setInterval(() => {
      this.fetchAppointment();
    }, 10000);
  },
  beforeDestroy() {
    clearInterval(this.interval);
  },
  methods: {
    async fetchAppointment() {
      await axios
        .get(`${process.env.VUE_APP_BACKEND_URL}/myappointment`, {
          headers: { Authorization: `Bearer ${this.$store.state.token}` },
        })
        .then((res) => {
          if (res.status == 204) {
            this.checkAppointment = true;
          } else {
            this.checkAppointment = false;
            this.dataFetch = res.data;
          }
        });
    },
  },
};
</script>

<style scoped>
@media (min-width: 768px) {
  .fixed-container {
    width: 720px;
  }
}
.card {
  border: 0px solid rgba(255, 255, 255);
  border-radius: 0.625rem;
  padding-bottom: 24px;
}
.announcement {
  font-size: 20px;
}
.fix-buttom-man {
  position: absolute;
  left: 0;
  top: 50%;
  width: 100%;
  text-align: center;
  font-size: 18px;
}
</style>

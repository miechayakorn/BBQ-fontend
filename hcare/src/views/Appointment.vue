<template>
  <div>
    <div class="container fixed-container mb-3">
      <div class="form-group text-left">
        <label class="font-weight-bold mb-4">My Appointment</label>
        <div class="form">
          <div class="container">
            <AppointmentCard v-if="!checkAppointment" :data="dataFetch" />
            <div class v-if="checkAppointment">
              <div class="row">
                <div class="col-12">
                  <span class="announcement d-flex justify-content-center mt-3">คุณยังไม่มีนัดหมาย</span>
                  <span
                    class="announcement d-flex justify-content-center mt-3"
                  >หรือยังไม่ได้กดยืนยันที่ Email</span>
                </div>
                <div class="fix-buttom-man">
                  <man />
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
import axios from "axios";
import AppointmentCard from "@/components/AppointmentCard.vue";
import man from "@/components/svg/man.vue";

export default {
  data() {
    return {
      dataFetch: [],
      checkAppointment: false
    };
  },
  components: {
    AppointmentCard,
    man
  },
  async mounted() {
    await axios
      .get(`${process.env.VUE_APP_BACKEND_URL}/myappointment`, {
        headers: { Authorization: `Bearer ${this.$store.state.token}` }
      })
      .then(res => {
        if (res.status == 204) {
          this.checkAppointment = true;
        } else {
          this.dataFetch = res.data;
        }
      });
  }
};
</script>

<style scoped>
@media (min-width: 900px) {
  .fixed-container {
    width: 720px;
  }
}
.card-text {
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 21px;
}
.card {
  border: 0px solid rgba(255, 255, 255);
  border-radius: 0.625rem;
  padding-bottom: 24px;
}
.announcement {
  font-family: Poppins;
  font-style: normal;
  font-weight: bold;
  font-size: 16px;
  line-height: 24px;
  display: flex;
  align-items: center;
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

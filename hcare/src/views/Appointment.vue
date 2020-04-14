<template>
  <div>
    <logoHeader />
    <div class="container fixed-container mb-3">
      <div class="form-group text-left">
        <label class="font-weight-bold mb-4">My Appointment</label>
        <div class="form">
          <div class="container">
            <!-- {{checkAppointment}} -->
            <AppointmentCard v-if="!checkAppointment" :data="dataFetch" />
            <div
              class="d-flex justify-content-center my-5"
              v-if="checkAppointment"
            >
              <div class="row">
                <div class="col-12 d-flex justify-content-center">
                  <man />
                </div>
                <div class="col-12">
                  <p class="announcement d-flex justify-content-center my-3">
                    คุณยังไม่มีนัดหมาย
                  </p>
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
import logoHeader from "@/components/svg/logoHeader.vue";
import man from "@/components/svg/man.vue";

export default {
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
      dataFetch: [
        {
          account_id: null,
          hn_number: null,
          first_name: "",
          last_name: "",
          booking_id: null,
          type_id: null,
          type_name: "",
          date: "",
          time_in: ""
        }
      ],
      checkAppointment: false
    };
  },
  components: {
    AppointmentCard,
    logoHeader,
    man,
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
            this.dataFetch = res.data;
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
/* .padStyle{
  padding-bottom: 24px
} */
</style>

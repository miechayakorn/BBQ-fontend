<template>
  <div class="mt-5">
    <div class="container fixed-container mb-3">
      <div class="form-group text-left">
        <label class="font-weight-bold mb-4">My Appointment</label>
        <div class="form">
          <div class="container">
            <AppointmentCard :data="dataFetch.appointmentCard" />
            <div class="row">
              <div class="col-12">
                <span class="font-weight-bold">
                  ชื่อแพทย์
                  <br />
                </span>
                <span>
                  {{ dataFetch.doctor_firstname }}
                  {{ dataFetch.doctor_lastname }}
                </span>
              </div>
            </div>
            <div class="row">
              <div class="col-12">
                <span class="font-weight-bold">
                  โปรดอ่าน
                  <br />
                </span>
                <span>ควรเข้า Join Meeting ก่อนเวลาประมาณ 5 นาที</span>
              </div>
            </div>
            <div class="row mt-5" style="text-align: center;">
              <div class="col-12">
                <a :href="dataFetch.link_meeting">
                  <button
                    v-if="dataFetch.link_meeting"
                    class="btn btn-primary btnBlock btnConfirm fixed-button mb-2"
                  >
                    <span style="font-weight: 900; color:white;">Join Meeting</span>
                  </button>
                  <button
                    v-if="dataFetch.link_meeting == null"
                    class="btn btn-secondary btnBlock btnConfirm fixed-button mb-2 disabled"
                    :disabled="true"
                  >
                    <span style="font-weight: 900; color:white;">ท่านยังไม่ได้รับลิงค์</span>
                  </button>
                </a>
              </div>
              <div class="col-12">
                <button
                  class="btn btnBlock btnConfirm btnCancel fixed-button mb-2"
                  @click="cancelAppointment"
                >
                  <span style="font-weight: 900; color:white;">ยกเลิกนัด</span>
                </button>
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
import { errorSWAL } from "@/utility/swal.js";

export default {
  data() {
    return {
      dataFetch: {
        appointmentCard: [
          {
            account_id: null,
            hn_number: null,
            first_name: "",
            last_name: "",
            booking_id: null,
            type_id: null,
            type_name: "",
            date: "",
            time_in: "",
            dateformat: ""
          }
        ],
        link_meeting: "",
        doctor_id: null,
        doctor_firstname: "",
        doctor_lastname: ""
      }
    };
  },
  components: {
    AppointmentCard
  },
  async mounted() {
    await axios
      .get(
        `${process.env.VUE_APP_BACKEND_URL}/appointment/detail/${this.$route.params.id}`,
        {
          headers: { Authorization: `Bearer ${this.$store.state.token}` }
        }
      )
      .then(res => {
        if (res.data.account_id) {
          this.dataFetch.appointmentCard[0].account_id = res.data.account_id;
          this.dataFetch.appointmentCard[0].hn_number = res.data.hn_number;
          this.dataFetch.appointmentCard[0].first_name = res.data.first_name;
          this.dataFetch.appointmentCard[0].last_name = res.data.last_name;
          this.dataFetch.appointmentCard[0].booking_id = res.data.booking_id;
          this.dataFetch.appointmentCard[0].type_id = res.data.type_id;
          this.dataFetch.appointmentCard[0].type_name = res.data.type_name;
          this.dataFetch.appointmentCard[0].date = res.data.date;
          this.dataFetch.appointmentCard[0].time_in = res.data.time_in;
          this.dataFetch.appointmentCard[0].dateformat = res.data.dateformat;
          this.dataFetch.link_meeting = res.data.link_meeting;
          this.dataFetch.doctor_id = res.data.doctor_id;
          this.dataFetch.doctor_firstname = res.data.doctor_firstname;
          this.dataFetch.doctor_lastname = res.data.doctor_lastname;
        } else {
          this.$router.push("/");
        }
      })
      .catch(err => {
        console.log("===== Backend-error ======");
        console.error(error.response);
      });
  },
  methods: {
    cancelAppointment() {
      this.$swal({
        title: "คำเตือน",
        text: "ยกเลิกการนัด",
        icon: "warning",
        showCloseButton: true,
        confirmButtonColor: "#FF4F5B",
        confirmButtonText: "ยืนยัน",
        footer: "ระบบจะไม่สามารถคืนการนัดได้"
      }).then(result => {
        if (result.value) {
          axios
            .post(
              `${process.env.VUE_APP_BACKEND_URL}/appointment/cancel`,
              {
                booking_id: this.dataFetch.appointmentCard[0].booking_id
              },
              {
                headers: { Authorization: `Bearer ${this.$store.state.token}` }
              }
            )
            .then(res => {
              this.$swal({
                toast: true,
                position: "top-end",
                showConfirmButton: false,
                timer: 3000,
                icon: "success",
                title: "ยกเลิกการนัดสำเร็จ"
              });
              this.$router.push("/appointment");
            })
            .catch(error => {
              console.log("===== Backend-error ======");
              console.error(error.response);
              this.$swal({ ...errorSWAL });
            });
        }
      });
    }
  }
};
</script>

<style>
.btnCancel {
  background-color: #ff4f5b;
}
</style>

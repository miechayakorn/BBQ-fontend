<template>
  <div>
    <div v-if="loading" class="container fixed-container mb-3">
      <VclFacebook />
      <VclList class="mt-2" />
      <VclList class="mt-2" />
    </div>
    <div v-if="!loading" class="container fixed-container mt-5 mb-3">
      <div class="form-group text-left">
        <label class="font-weight-bold mb-4">รายละเอียดการนัดของฉัน</label>
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
            <div class="row" v-show="dataFetch.link_meeting != null">
              <div class="col-12">
                <span class="font-weight-bold">
                  โปรดอ่าน
                  <br />
                </span>
                <span>ควรเข้า Join Meeting ก่อนเวลาประมาณ 5 นาที</span>
              </div>
            </div>
            <div class="row mt-5" style="text-align: center">
              <div class="col-12" v-show="dataFetch.link_meeting != null">
                <a :href="dataFetch.link_meeting">
                  <button
                    v-if="dataFetch.link_meeting"
                    class="btn btn-primary btnBlock btnConfirm fixed-button mb-2"
                  >
                    <span style="font-weight: 900; color: white"
                      >Join Meeting</span
                    >
                  </button>
                  <button
                    v-if="dataFetch.link_meeting == null"
                    class="btn btn-secondary btnBlock btnCancel fixed-button mb-2 disabled"
                    :disabled="true"
                  >
                    <span style="font-weight: 900; color: white"
                      >ท่านยังไม่ได้รับลิงค์</span
                    >
                  </button>
                </a>
              </div>
              <div v-show="dataFetch.link_meeting == null" class="col-12">
                <button
                  class="btn btnBlock btnCancel fixed-button mb-2"
                  @click="cancelAppointment"
                >
                  <span style="font-weight: 900; color: white">ยกเลิกนัด</span>
                </button>
              </div>
            </div>
            <div class="row" style="text-align: center">
              <div class="col-12" @click="$router.go(-1)">
                <button
                  class="btn btnBlock btn-primary btn-back fixed-button mb-2"
                  style="border-radius: 31px"
                >
                  <span style="font-weight: 900">ย้อนกลับ</span>
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
import { VclFacebook, VclList } from "vue-content-loading";
import { errorSWAL } from "@/utility/swal.js";

export default {
  data() {
    return {
      loading: false,
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
            dateformat: "",
          },
        ],
        link_meeting: "",
        doctor_id: null,
        doctor_firstname: "",
        doctor_lastname: "",
      },
    };
  },
  components: {
    AppointmentCard,
    VclFacebook,
    VclList,
  },
  async mounted() {
    this.loading = true;
    await axios
      .get(
        `${process.env.VUE_APP_BACKEND_URL}/appointment/detail/${this.$route.params.id}`,
        {
          headers: { Authorization: `Bearer ${this.$store.state.token}` },
        }
      )
      .then((res) => {
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
      .catch((error) => {
        console.log("===== Backend-error ======");
        console.error(error.response);
        this.$router.push("/appointment");
      });
    this.loading = false;
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
        footer: "ระบบจะไม่สามารถคืนการนัดได้",
      }).then((result) => {
        if (result.value) {
          this.$swal({
            title: "กรุณารอสักครู่",
            allowEscapeKey: false,
            allowOutsideClick: false,
            onOpen: () => {
              this.$swal.showLoading();
            },
          });
          axios
            .post(
              `${process.env.VUE_APP_BACKEND_URL}/appointment/cancel`,
              {
                booking_id: this.dataFetch.appointmentCard[0].booking_id,
              },
              {
                headers: { Authorization: `Bearer ${this.$store.state.token}` },
              }
            )
            .then((res) => {
              this.$swal({
                toast: true,
                position: "top-end",
                showConfirmButton: false,
                timer: 3000,
                icon: "success",
                title: "ยกเลิกการนัดสำเร็จ",
              });
              this.$router.push("/appointment");
            })
            .catch((error) => {
              console.log("===== Backend-error ======");
              console.error(error.response);
              this.$swal({ ...errorSWAL });
            });
        }
      });
    },
  },
};
</script>

<style>
.btn-back {
  background: #ffffff;
  border: 2px solid #99a3ff;
  color: #99a3ff;
}
.btnCancel {
  box-shadow: 0px 3px 8px #a4a7aa;
  background-color: #ff4f5b;
  border-radius: 31px;
}
</style>

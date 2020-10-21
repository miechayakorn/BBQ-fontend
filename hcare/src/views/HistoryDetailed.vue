<template>
  <div>
    <div v-if="loading" class="container fixed-container mb-3">
      <VclFacebook />
      <VclList class="mt-2" />
      <VclList class="mt-2" />
    </div>
    <div v-if="!loading" class="container fixed-container mt-5 mb-3">
      <div class="form-group text-left">
        <label class="font-weight-bold mb-4"
          >รายละเอียดประวัติการเข้าใช้บริการ</label
        >
        <div class="form">
          <div class="container">
            <HistoryCard :data="dataFetch.appointmentCard" />
            <div class="row">
              <div class="col-12">
                <span class="font-weight-bold">
                  ชื่อแพทย์
                  <br />
                </span>
                <span
                  >{{ dataFetch.prefix }}&nbsp;{{ dataFetch.doctor_name }}</span
                >
              </div>
            </div>
            <div class="row">
              <div class="col-12 mt-3">
                <span class="font-weight-bold">
                  อาการเบื้องต้น
                  <br />
                </span>
                <span v-if="dataFetch.symptom">{{ dataFetch.symptom }}</span>
                <span v-else>-</span>
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
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import HistoryCard from "@/components/HistoryCard.vue";
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
            name: "",
            booking_id: null,
            type_id: null,
            type_name: "",
            date: "",
            time_in: "",
          },
        ],
        link_meeting: "",
        doctor_id: null,
        doctor_name: "",
        prefix: "",
        symptom: "",
      },
    };
  },
  components: {
    HistoryCard,
    VclFacebook,
    VclList,
  },
  async mounted() {
    this.loading = true;
    await axios
      .get(
        `${process.env.VUE_APP_BACKEND_URL}/history/detail/${this.$route.params.id}`,
        {
          headers: { Authorization: `Bearer ${this.$store.state.token}` },
        }
      )
      .then((res) => {
        if (res.data.account_id) {
          this.dataFetch.appointmentCard[0] = res.data;
          this.dataFetch.doctor_id = res.data.doctor_id;
          this.dataFetch.prefix = res.data.prefix;
          this.dataFetch.doctor_name = res.data.doctor_name;
          this.dataFetch.symptom = res.data.symptom;
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
.btnCancel {
  box-shadow: 0px 3px 8px #a4a7aa;
  background-color: #ff4f5b;
  border-radius: 31px;
}
</style>
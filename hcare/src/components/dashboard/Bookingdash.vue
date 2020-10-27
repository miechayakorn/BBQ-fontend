<template>
  <div class="container mt-3 col-12 col-md-6">
    <div class="form-group text-left" style="margin-top: 48px">
      <div class="col-12">
        <label for="InputEmail">อีเมลผู้ป่วย</label>
        <div>
          <VueBootstrapTypeahead
            class="mb-2"
            v-if="selectedUser == null"
            v-model="query"
            :data="users"
            :serializer="(item) => item.email"
            @hit="selectedUser = $event"
            placeholder="ค้นหาอีเมลผู้ป่วยในระบบ"
          />
          <select
            v-else-if="selectedUser"
            class="form-control mb-2 col-12 col-md-12"
            disabled
          >
            <option value disabled selected>{{ selectedUser.email }}</option>
          </select>
          <button
            @click="selectedUser = null"
            class="btn div-showTag text-white text-left m-1"
            v-if="selectedUser"
          >
            <span class="mt-4 mb-4 p-2"> {{ selectedUser.name }}</span><i class="fas fa-times-circle"></i>
          </button>

          <div
            v-else-if="users.length == 0 && query.length >= 4"
            class="alert p-3 alert-warning"
          >
            ไม่พบอีเมลในระบบ กรุณาสมัครสมาชิกก่อนใช้งาน
          </div>
        </div>
      </div>
      <div class="col-12 mt-3">
        <label>เลือกสถานที่</label>
        <div class="col-12 text-center text-md-left">
          <div
            class="form-check form-check-inline"
            v-for="(item, index) in dataFetch.dataLocation"
            :key="index"
          >
            <input
              class="form-check-input"
              type="radio"
              name="location_id"
              :id="item.location_id"
              :value="item.location_id"
              v-model="location_id"
            />
            <label
              style="cursor: pointer"
              class="form-check-label"
              :for="item.location_id"
              >{{ item.location_name }}</label
            >
          </div>
        </div>
      </div>
      <div class="col-12 mt-2">
        <label for="serviceType">เลือกบริการ</label>
        <select
          id="serviceType"
          class="form-control col-12 col-md-12"
          v-model="type_id"
        >
          <option value disabled selected>-- กรุณาเลือกบริการ --</option>
          <option
            v-for="(data, index) in dataFetch.dataTypes"
            :key="index"
            :value="data.type_id"
          >
            {{ data.type_name }}
          </option>
        </select>
      </div>
      <div class="col-12 mt-3">
        <h6 class="text-left">วันที่</h6>
        <ServiceDateBox
          :dataDates="dataFetch.dataDates"
          v-on:selectedDate="fetchTime"
        />
      </div>
      <div class="col-12 mt-3">
        <label for="selectTime" class="d-flex justify-content-start"
          >เลือกเวลา</label
        >
        <ServiceTimeBox
          :dataTimes="dataFetch.dataTimes"
          :activeTime="dataShow.activeBtnTime"
          v-on:booking="onChangeTime"
        />
      </div>
      <div class="col-12 mt-3">
        <label for="exampleInputPassword1" class="d-flex justify-content-start"
          >อาการ</label
        >
        <textarea
          rows="3"
          class="form-control"
          v-model="dataPrepareSend.symptom"
          :disabled="dataShow.disableSymptom"
        ></textarea>
      </div>
      <div class="col-12 mt-3 text-center">
        <button
          @click="sendToBackend"
          class="btn btn-primary btnBlock btnConfirm mt-5 fixed-button mb-2"
        >
          Confirm
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { errorSWAL } from "@/utility/swal.js";
import VueBootstrapTypeahead from "vue-bootstrap-typeahead";
import ServiceTypeBox from "@/components/ServiceTypeBox.vue";
import ServiceDateBox from "@/components/ServiceDateBox.vue";
import ServiceTimeBox from "@/components/ServiceTimeBox.vue";
import man2 from "@/components/svg/man2.vue";

export default {
  data() {
    return {
      query: "",
      selectedUser: null,
      users: [],
      location_id: 1,
      type_id: "",
      email: null,
      dataPrepareSend: {
        booking_id: null,
        // account_id: null,
        symptom: null,
      },
      dataFetch: {
        dataLocation: [],
        dataTypes: null,
        dataDates: null,
        dataTimes: null,
      },
      dataShow: {
        type: "จิตแพทย์",
        date: "",
        time: null,
        activeBtnTime: "",
        disableSymptom: true,
      },
    };
  },
  methods: {
    async clearDataShow() {
      this.dataShow.type = "จิตแพทย์";
      this.dataShow.date = "";
      this.dataShow.time = null;
      this.dataShow.activeBtnTime = "";
      this.dataShow.disableSymptom = true;
      this.email = null;
      this.dataPrepareSend.booking_id = null;
      this.dataPrepareSend.symptom = null;
      this.dataFetch.dataTimes = null;
      await axios
        .get(`${process.env.VUE_APP_BACKEND_URL}/ServiceTypesStaff`, {
          headers: {
            Authorization: `Bearer ${this.$store.state.token}`,
          },
        })
        .then((res) => {
          this.dataFetch.dataTypes = res.data;
        });
      this.fetchDate({
        type_id: 1,
      });
    },
    clearData() {
      this.dataPrepareSend.booking_id = null;
      this.dataShow.date = "";
      this.dataShow.time = null;
      this.dataShow.disableSymptom = true;
    },

    async fetchDate(serviceDataType) {
      await axios
        .get(
          `${process.env.VUE_APP_BACKEND_URL}/ServiceDate/${serviceDataType}`,
          {
            headers: {
              Authorization: `Bearer ${this.$store.state.token}`,
            },
          }
        )
        .then((res) => {
          this.dataFetch.dataDates = res.data;
        });
    },

    async fetchTime(selectedDate) {
      this.clearData();
      //เคลียสีปุ่ม
      this.dataShow.activeBtnTime = "";

      //เก็บข้อมูล วันที่ เอาไว้ตอนสรุปก่อนกดยืนยัน
      this.dataShow.date = selectedDate.dateformat;

      await axios
        .get(
          `${process.env.VUE_APP_BACKEND_URL}/ServiceTime/${selectedDate.type_id}?time=${selectedDate.datevalue}`,
          {
            headers: {
              Authorization: `Bearer ${this.$store.state.token}`,
            },
          }
        )
        .then((res) => {
          this.dataFetch.dataTimes = res.data;
          this.$swal.close();
        });
    },

    onChangeTime(booking) {
      this.dataPrepareSend.booking_id = booking.booking_id;
      this.dataShow.time = booking.time;

      //================ เก็บไว้ใน ตัวแปร
      this.dataShow.activeBtnTime = booking.activeBtnTime;

      //ให้กรอกอาการได้
      this.dataShow.disableSymptom = false;
    },

    sendToBackend() {
      if (this.dataPrepareSend.booking_id != null && this.email != null) {
        this.$swal({
          title: "การจอง " + this.dataShow.type,
          text: this.dataShow.date + " เวลา: " + this.dataShow.time,
          icon: "info",
          showCancelButton: true,
          reverseButtons: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Confirm",
          cancelButtonText: "No",
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
                `${process.env.VUE_APP_BACKEND_URL}/booking/healthcare`,
                {
                  booking_id: this.dataPrepareSend.booking_id,
                  email: this.email,
                  symptom: this.dataPrepareSend.symptom,
                },
                {
                  headers: {
                    Authorization: `Bearer ${this.$store.state.token}`,
                  },
                }
              )
              .then((res) => {
                if (res.status == 200) {
                  this.$swal({
                    toast: true,
                    position: "top-end",
                    showConfirmButton: false,
                    timer: 3000,
                    icon: "success",
                    title: "การจองสำเร็จ",
                  });
                  this.clearDataShow();
                } else {
                  this.$swal({
                    icon: "warning",
                    title: "คำเตือน",
                    text: "ไม่พบ อีเมลผู้ป่วย ในระบบ",
                  });
                }
              })
              .catch((error) => {
                if (error.response.status == 403) {
                  this.$swal({
                    icon: "warning",
                    title: "คำเตือน",
                    text: "ไม่พบ อีเมลผู้ป่วย ในระบบ",
                  });
                } else {
                  console.log("===== Backend-error ======");
                  console.error(error.response);
                  this.$swal({
                    ...errorSWAL,
                  });
                }
              });
          }
        });
      } else {
        this.$swal({
          icon: "warning",
          title: "คำเตือน",
          text: "กรุณาเลือกเวลาที่ต้องการจอง และอีเมลผู้ป่วย",
        });
      }
    },
  },
  components: {
    man2,
    ServiceTypeBox,
    ServiceDateBox,
    ServiceTimeBox,
    VueBootstrapTypeahead,
  },
  watch: {
    location_id: {
      handler: async function (val, oldCal) {
        await axios
          .get(`${process.env.VUE_APP_BACKEND_URL}/ServiceTypes/${val}`)
          .then((res) => {
            this.dataFetch.dataTypes = res.data;
          });
      },
    },
    type_id: {
      handler: async function (val, oldVal) {
        this.fetchDate(val);
      },
    },
    query(newQuery) {
      if (newQuery.length >= 4) {
        axios
          .get(`${process.env.VUE_APP_BACKEND_URL}/search/email?q=${newQuery}`)
          .then((res) => {
            this.users = res.data;
          });
      }
    },
  },
  async mounted() {
    await axios
      .get(`${process.env.VUE_APP_BACKEND_URL}/location`)
      .then((res) => {
        this.dataFetch.dataLocation = res.data;
        this.location_id = this.dataFetch.dataLocation[0].location_id;
      });
    //เรียกข้อมูล Default
    //Type
  },
};
</script>
<style scoped>
.div-showTag {
  color: white;
  background-color: #5e65a1;
  border-radius: 20px;
}
</style>
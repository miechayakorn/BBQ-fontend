<template>
  <!-- ========= ทดสอบการใช้ Component ให้โค้ดดูง่าย และแยกเป็นส่วนๆ ============== -->
  <div>
    <logoHeader />
    <div class="container fixed-container mb-3">
      <div class="form-group text-left">
        <label>เลือกบริการ</label>
        <div class="form">
          <div class="container">
            <ServiceTypeBox :dataTypes="dataFetch.dataTypes" v-on:serviceDataType="fetchDate" />
          </div>
        </div>
      </div>
      <div class="row">
        <div class="form-group text-left w-100">
          <div class="col-12">
            <label for="selectDate">เลือกวัน</label>
          </div>
          <ServiceDateBox :dataDates="dataFetch.dataDates" v-on:selectedDate="fetchTime" />
        </div>
      </div>
      <div class="row">
        <div class="form-group">
          <div class="col-12">
            <label for="exampleInputPassword1" class="d-flex justify-content-start">เลือกเวลา</label>
          </div>
          <ServiceTimeBox
            :dataTimes="dataFetch.dataTimes"
            :activeTime="dataShow.activeBtnTime"
            v-on:booking="onChangeTime"
          />
        </div>
      </div>
      <div class="form-group">
        <label for="exampleInputPassword1" class="d-flex justify-content-start">อาการ</label>
        <textarea
          rows="3"
          class="form-control"
          v-model="dataPrepareSend.symptom"
          :disabled="dataShow.disableSymptom"
        ></textarea>
      </div>
      <div class="row" style="text-align: center;">
        <div class="col-12">
          <button
            @click="sendToBackend"
            class="btn btn-primary btnBlock btnConfirm mt-5 fixed-button mb-2"
          >Confirm</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import ServiceTypeBox from "@/components/ServiceTypeBox.vue";
import ServiceDateBox from "@/components/ServiceDateBox.vue";
import ServiceTimeBox from "@/components/ServiceTimeBox.vue";
import logoHeader from "@/components/svg/logoHeader.vue";
import { waiting, errorSWAL } from "@/utility/swal.js";

export default {
  data() {
    return {
      //ข้อมูลเตรียมส่งไป Backend
      dataPrepareSend: {
        booking_id: null,
        user_id: null,
        symptom: null
      },
      //ข้อมูลที่ได้จาก Backend
      dataFetch: {
        dataTypes: null,
        dataDates: null,
        dataTimes: null
      },
      //ข้อมูลที่เอาไว้โชว์ Fontend
      dataShow: {
        type: "จิตแพทย์",
        date: "",
        time: null,
        activeBtnTime: "",
        disableSymptom: true,
        oldTypeService: 1
      }
    };
  },
  components: {
    ServiceTypeBox,
    ServiceDateBox,
    ServiceTimeBox,
    logoHeader
  },
  async mounted() {
    if (localStorage.getItem("user")) {
      // this.$swal.showLoading();
      this.$swal({
        title: "กรุณารอสักครู่",
        allowEscapeKey: false,
        allowOutsideClick: false,
        onOpen: () => {
          this.$swal.showLoading();
        }
      });

      //เรียกข้อมูล Default
      //Type
      await axios
        .get(`${process.env.VUE_APP_BACKEND_URL}/ServiceTypes`)
        .then(res => {
          this.dataFetch.dataTypes = res.data;
        });
      //Date
      await axios
        .get(`${process.env.VUE_APP_BACKEND_URL}/ServiceDate/1`)
        .then(res => {
          this.dataFetch.dataDates = res.data;
          this.$swal.close();
        });
      //Time

      // this.dataFetch.dataTimes
    } else {
      this.$router.push("login");
    }
  },
  methods: {
    clearData() {
      this.dataPrepareSend.booking_id = null;
      this.dataShow.date = "";
      this.dataShow.time = null;
      this.dataShow.disableSymptom = true;
    },
    async fetchDate(serviceDataType) {
      //เช็ค
      if (this.dataShow.oldTypeService !== serviceDataType.type_id) {
        this.clearData();
        this.dataFetch.dataTimes = null;
        this.dataPrepareSend.symptom = null;

        this.$swal({
          ...waiting,
          onOpen: () => {
            this.$swal.showLoading();
          }
        });

        //เก็บชื่อประเภทไว้โชว์ตอนสรุปก่อนยืนยัน
        this.dataShow.type = serviceDataType.type_name;
        console.log("oldservice = " + this.dataShow.oldTypeService);

        this.dataShow.activeBtnTime = "";
        // this.dataPrepareSend.symptom = null;
        // this.dataFetch.dataTimes = null;
        // this.selectedDate = null;
        await axios
          .get(
            `${process.env.VUE_APP_BACKEND_URL}/ServiceDate/${serviceDataType.type_id}`
          )
          .then(res => {
            this.dataFetch.dataDates = res.data;
            console.log(this.dataFetch.dataDates);
            this.dataShow.oldTypeService = serviceDataType.type_id;
            this.$swal.close();
          });
      }
    },
    async fetchTime(selectedDate) {
      this.clearData();
      //เคลียสีปุ่ม
      this.dataShow.activeBtnTime = "";

      //เก็บข้อมูล วันที่ เอาไว้ตอนสรุปก่อนกดยืนยัน
      this.dataShow.date = selectedDate.dateformat;
      console.log("selectedDate is " + this.dataShow.date);

      await axios
        .get(
          `${process.env.VUE_APP_BACKEND_URL}/ServiceTime/${selectedDate.type_id}?time=${selectedDate.datevalue}`
        )
        .then(res => {
          this.dataFetch.dataTimes = res.data;
          console.log("Axios fetch time :");
          console.log(this.dataFetch.dataTimes);

          this.$swal.close();
        });
    },
    onChangeTime(booking) {
      console.log("------booking");
      console.log(booking);
      // console.log(this.dataShow.activeBtnTime)

      this.dataPrepareSend.booking_id = booking.booking_id;
      this.dataShow.time = booking.time;

      //================ เก็บไว้ใน ตัวแปร
      this.dataShow.activeBtnTime = booking.activeBtnTime;

      //ให้กรอกอาการได้
      this.dataShow.disableSymptom = false;
    },
    sendToBackend() {
      if (this.dataPrepareSend.booking_id != null) {
        console.log("Backend----" + this.dataShow.date);
        this.$swal({
          title: "การจอง " + this.dataShow.type,
          text:
            " วันที่: " + this.dataShow.date + " เวลา: " + this.dataShow.time,
          icon: "info",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Yes",
          cancelButtonText: "Cancel",
          footer: "กรุณามาก่อนเวลา 15 นาที"
        }).then(result => {
          if (result.value) {
            this.$swal({
              title: "กรุณารอสักครู่",
              allowEscapeKey: false,
              allowOutsideClick: false,
              onOpen: () => {
                this.$swal.showLoading();
              }
            });

            axios
              .post(`${process.env.VUE_APP_BACKEND_URL}/Booking`, {
                booking_id: this.dataPrepareSend.booking_id,
                //Edit account_id เป็นของ account_id คนนั้นๆ

                account_id: 1,

                symptom: this.dataPrepareSend.symptom
              })
              .then(res => {
                console.log(res.data);

                this.$swal({
                  toast: true,
                  position: "top-end",
                  showConfirmButton: false,
                  timer: 3000,
                  icon: "success",
                  title: "การจองสำเร็จ"
                  // text: "จองสำเร็จ"
                });
                // Set Local Storage

                this.$router.push("Appointment");
              })
              .catch(error => {
                console.log("===== Backend-error ======");
                console.error(error.response);
                this.$swal({ ...errorSWAL });
              });
          }
        });
      } else {
        this.$swal({
          icon: "warning",
          title: "คำเตือน",
          text: "กรุณาเลือกเวลาที่ต้องการจอง"
        });
      }
    }
  }
};
</script>

<style scoped>
@media (max-width: 776px) {
  .fixed-button {
    width: 100%;
    height: 48px;
  }
}
@media (min-width: 776px) {
  .fixed-button {
    width: 320px;
    text-align: center;
    position: relative;
    height: 48px;
  }
}
@media (min-width: 900px) {
  .fixed-container {
    width: 720px;
  }
}

button {
  border-radius: 8px;
}
.btnConfirm {
  border-radius: 31px;
}
</style>

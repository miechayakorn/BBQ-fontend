<template>
  <div class="container ml-2">
    <div class="row bg-blueMan2">
      <div class="col-4">
        <man2 />
      </div>
      <div class="col-8">
        <div class="form-group text-left" style="margin-top:48px;">
          <label for="InputName">กรอกรหัสนักศึกษา</label>
          <input
            type="text"
            v-model="hn_number"
            class="form-control"
            placeholder="รหัสนักศึกษา"
            required
          />
        </div>
      </div>
    </div>
    <div class="row mt-3">
      <div class="col-6">
        <div class="row">
          <div class="col-12">
            <h6 class="text-left">บริการ</h6>
            <ServiceTypeBox :dataTypes="dataFetch.dataTypes" v-on:serviceDataType="fetchDate" />
          </div>
          <div class="col-12 mt-3">
            <h6 class="text-left">วันที่</h6>
            <ServiceDateBox :dataDates="dataFetch.dataDates" v-on:selectedDate="fetchTime" />
          </div>
        </div>
      </div>
      <div class="col-6">
        <div class="col-12">
          <label for="exampleInputPassword1" class="d-flex justify-content-start">เลือกเวลา</label>
          <ServiceTimeBox
            :dataTimes="dataFetch.dataTimes"
            :activeTime="dataShow.activeBtnTime"
            v-on:booking="onChangeTime"
          />
          <div class="form-group">
            <label for="exampleInputPassword1" class="d-flex justify-content-start">อาการ</label>
            <textarea
              rows="3"
              class="form-control"
              v-model="dataPrepareSend.symptom"
              :disabled="dataShow.disableSymptom"
            ></textarea>
          </div>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-12">
        <button
          @click="sendToBackend"
          class="btn btn-primary btnBlock btnConfirm mt-5 fixed-button mb-2"
        >Confirm</button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import ServiceTypeBox from "@/components/ServiceTypeBox.vue";
import ServiceDateBox from "@/components/ServiceDateBox.vue";
import ServiceTimeBox from "@/components/ServiceTimeBox.vue";
import man2 from "@/components/svg/man2.vue";

export default {
  data() {
    return {
      hn_number: null,
      dataPrepareSend: {
        booking_id: null,
        // account_id: null,
        symptom: null
      },
      dataFetch: {
        dataTypes: null,
        dataDates: null,
        dataTimes: null
      },
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
  methods: {
    async clearDataShow() {
      this.dataShow.type = "จิตแพทย์";
      this.dataShow.date = "";
      this.dataShow.time = null;
      this.dataShow.activeBtnTime = "";
      this.dataShow.disableSymptom = true;
      this.dataShow.oldTypeService = 1;
      this.hn_number = null;
      this.dataPrepareSend.booking_id = null;
      this.dataPrepareSend.symptom = null;
      this.dataFetch.dataTimes = null;
      await axios
        .get(`${process.env.VUE_APP_BACKEND_URL}/ServiceTypes`)
        .then(res => {
          this.dataFetch.dataTypes = res.data;
        });
      this.fetchDate(this.dataShow.oldTypeService);
    },
    clearData() {
      this.dataPrepareSend.booking_id = null;
      this.dataShow.date = "";
      this.dataShow.time = null;
      this.dataShow.disableSymptom = true;
    },

    async fetchDate(serviceDataType) {
      this.dataPrepareSend.type_id = serviceDataType.type_id;
      await axios
        .get(
          `${process.env.VUE_APP_BACKEND_URL}/ServiceDate/${serviceDataType.type_id}`
        )
        .then(res => {
          this.dataFetch.dataDates = res.data;
          console.log(this.dataFetch.dataDates);
        });
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
        console.log("booking_id = " + this.dataPrepareSend.booking_id);
        console.log("hn_number = " + this.hn_number);
        console.log("symptom = " + this.dataPrepareSend.symptom);
        this.$swal({
          title: "การจอง " + this.dataShow.type,
          text:
            " วันที่: " + this.dataShow.date + " เวลา: " + this.dataShow.time,
          icon: "info",
          showCancelButton: true,
          reverseButtons: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Confirm",
          cancelButtonText: "No",
          footer: "กรุณาบอก ผู้ให้รับบริการ ให้กดยืนยันการจองที่ email"
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
              .post(`${process.env.VUE_APP_BACKEND_URL}/booking/healthcare`, {
                booking_id: this.dataPrepareSend.booking_id,
                // account_id: this.dataPrepareSend.account_id,
                hn_number: this.hn_number,
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
                });
                this.clearDataShow();
                this.$router.push("/admin/Dashboard");
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
  },
  components: {
    man2,
    ServiceTypeBox,
    ServiceDateBox,
    ServiceTimeBox
  },
  async mounted() {
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
      });
  }
};
</script>

<style scoped>
.bg-blueMan2 {
  background-color: #e0e3ff;
}
</style>

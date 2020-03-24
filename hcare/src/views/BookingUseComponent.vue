<template>
  <!-- ========= ทดสอบการใช้ Component ให้โค้ดดูง่าย และแยกเป็นส่วนๆ ============== -->
  <div>
    
    <svg
        width="149"
        height="30"
        viewBox="0 0 149 30"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style="margin-top: 60px"
        class="mb-3"
      >
        <path
          d="M24.3234 0.919999V29H17.4834V17.44H6.84344V29H0.00343761V0.919999H6.84344V11.92H17.4834V0.919999H24.3234ZM32.1012 14.92C32.1012 12.1467 32.7013 9.68 33.9013 7.52C35.1013 5.33333 36.7679 3.64 38.9013 2.44C41.0613 1.21333 43.5013 0.599998 46.2213 0.599998C49.5546 0.599998 52.4079 1.48 54.7813 3.24C57.1546 5 58.7413 7.4 59.5413 10.44H52.0213C51.4613 9.26667 50.6613 8.37333 49.6213 7.76C48.6079 7.14667 47.4479 6.84 46.1413 6.84C44.0346 6.84 42.3279 7.57333 41.0213 9.04C39.7146 10.5067 39.0613 12.4667 39.0613 14.92C39.0613 17.3733 39.7146 19.3333 41.0213 20.8C42.3279 22.2667 44.0346 23 46.1413 23C47.4479 23 48.6079 22.6933 49.6213 22.08C50.6613 21.4667 51.4613 20.5733 52.0213 19.4H59.5413C58.7413 22.44 57.1546 24.84 54.7813 26.6C52.4079 28.3333 49.5546 29.2 46.2213 29.2C43.5013 29.2 41.0613 28.6 38.9013 27.4C36.7679 26.1733 35.1013 24.48 33.9013 22.32C32.7013 20.16 32.1012 17.6933 32.1012 14.92Z"
          fill="#99A3FF"
        />
        <path
          d="M85.21 24.04H74.73L73.05 29H65.89L76.05 0.919999H83.97L94.13 29H86.89L85.21 24.04ZM83.45 18.76L79.97 8.48L76.53 18.76H83.45ZM115.542 29L109.702 18.4H108.062V29H101.222V0.919999H112.702C114.916 0.919999 116.796 1.30667 118.342 2.08C119.916 2.85333 121.089 3.92 121.862 5.28C122.636 6.61333 123.022 8.10667 123.022 9.76C123.022 11.6267 122.489 13.2933 121.422 14.76C120.382 16.2267 118.836 17.2667 116.782 17.88L123.262 29H115.542ZM108.062 13.56H112.302C113.556 13.56 114.489 13.2533 115.102 12.64C115.742 12.0267 116.062 11.16 116.062 10.04C116.062 8.97333 115.742 8.13333 115.102 7.52C114.489 6.90667 113.556 6.6 112.302 6.6H108.062V13.56ZM138.156 6.4V12.08H147.316V17.36H138.156V23.52H148.516V29H131.316V0.919999H148.516V6.4H138.156Z"
          fill="#CCD1FF"
        />
      </svg>
      
  <div class="container fixed-container mb-3">
    <div class="form-group text-left">
      <label>เลือกบริการ</label>
      <div class="form">
        <div class="container">
          <ServiceTypeBox
            :dataTypes="dataFetch.dataTypes"
            v-on:serviceDataType="fetchDate"
          />
        </div>
      </div>
    </div>
    <div class="row">
      <div class="form-group text-left w-100">
        <div class="col-12">
          <label for="selectDate">เลือกวัน</label>
        </div>
        <ServiceDateBox
          :dataDates="dataFetch.dataDates"
          v-on:selectedDate="fetchTime"
        />
      </div>
    </div>
    <div class="row">
      <div class="form-group">
        <div class="col-12">
          <label
            for="exampleInputPassword1"
            class="d-flex justify-content-start"
            >เลือกเวลา</label
          >
        </div>
        <ServiceTimeBox
          :dataTimes="dataFetch.dataTimes"
          :activeTime="dataShow.activeBtnTime"
          v-on:booking="onChangeTime"
        />
      </div>
    </div>
    <div class="form-group">
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
    <div class="row" style="text-align: center;">
      <div class="col-12">
        <button
          @click="sendToBackend"
          class="btn btn-primary btnBlock btnConfirm mt-5 fixed-button mb-2"
        >
          Confirm
        </button>
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
    ServiceTimeBox
  },
  async mounted() {
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
    await axios.get("http://127.0.0.1:3333/ServiceTypes").then(res => {
      this.dataFetch.dataTypes = res.data;
    });
    //Date
    await axios.get("http://127.0.0.1:3333/ServiceDate/" + 1).then(res => {
      this.dataFetch.dataDates = res.data;
      this.$swal.close();
    });
    //Time

    // this.dataFetch.dataTimes
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
          .get("http://127.0.0.1:3333/ServiceDate/" + serviceDataType.type_id)
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
      this.dataShow.date = selectedDate.date;
      console.log("selectedDate is " + this.dataShow.date);

      await axios
        .get(
          "http://127.0.0.1:3333/ServiceTime/" +
            selectedDate.type_id +
            "?time=" +
            selectedDate.date
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
              .post("http://127.0.0.1:3333/Booking", {
                booking_id: this.dataPrepareSend.booking_id,
                //Edit hn_number เป็นของ hn_number คนนั้นๆ

                hn_number: 60130500017,

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

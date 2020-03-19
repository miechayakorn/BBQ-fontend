<template>
  <!-- ========= ทดสอบการใช้ Component ให้โค้ดดูง่าย และแยกเป็นส่วนๆ ============== -->

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
        <!-- ใช้  v-model="selectedDate"     @change="fetchTime()" -->
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import ServiceTypeBox from "@/components/ServiceTypeBox.vue";
import ServiceDateBox from "@/components/ServiceDateBox.vue";

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
        type: "",
        date: "",
        time: null,
        activeBtnType: "btn0",
        activeBtnTime: "",
        dataDate: 1,
        oldTypeService: null
      }
    };
  },
  components: {
    ServiceTypeBox,
    ServiceDateBox
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
    });
    //Time
    await axios
      .get(
        "http://127.0.0.1:3333/ServiceTime/" +
          1 +
          "?time=" +
          this.dataFetch.dataDates[0].date
      )
      .then(res => {
        this.dataFetch.dataTimes = res.data;
        console.log(this.dataFetch.dataTimes);
        this.$swal.close();
      });
  },
  methods: {
    clearData() {
      this.dataPrepareSend.booking_id = null;
      this.dataShow.date = "";
      this.dataShow.time = null;
    },
    async fetchDate(serviceDataType) {
      this.clearData();
      this.$swal({
        title: "กรุณารอสักครู่",
        allowEscapeKey: false,
        allowOutsideClick: false,
        onOpen: () => {
          this.$swal.showLoading();
        }
      });

      //เก็บชื่อประเภทไว้โชว์ตอนสรุปก่อนยืนยัน
      this.dataShow.type = serviceDataType.type_name;
      console.log("oldservice = " + this.dataShow.oldTypeService);

      //เช็ค
      if (this.dataShow.oldTypeService !== serviceDataType.type_id) {
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
          });
      }

      //ทุกครั้งทีมีการกดให้ไปดึงวันที่แรกของช่องเลือกวัน
      await axios
        .get(
          "http://127.0.0.1:3333/ServiceTime/" +
            serviceDataType.type_id +
            "?time=" +
            this.dataFetch.dataDates[0].date
        )
        .then(res => {
          this.dataFetch.dataTimes = res.data;
          console.log(this.dataFetch.dataTimes);
          this.$swal.close();
        });
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
    }
  }
};
</script>

<style scoped>
/* @media (max-width: 776px) {
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
} */
@media (min-width: 900px) {
  .fixed-container {
    width: 720px;
  }
}

.btnTime {
  height: 48px;
  width: 72px;
}

button {
  border-radius: 8px;
}
.btnConfirm {
  border-radius: 31px;
}
.btnDisabled {
  cursor: default;
}
.btnDisabled:active {
  outline: none;
}
</style>

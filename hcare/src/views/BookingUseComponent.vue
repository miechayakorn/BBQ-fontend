<template>
  <!-- ========= ทดสอบการใช้ Component ให้โค้ดดูง่าย และแยกเป็นส่วนๆ ============== -->

  <div class="container fixed-container mb-3">
    <div class="form-group text-left">
      <label>เลือกบริการ</label>
      <div class="form">
        <div class="container">
          <ServiceTypeBox
            :dataTypes="dataFetch.dataTypes"
            v-on:type_id="fetchDate"
          />

        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import ServiceTypeBox from "@/components/ServiceTypeBox.vue";

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
    ServiceTypeBox
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
          this.selectFirstDate
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
    async fetchDate(type_id) {
      this.clearData();
      this.$swal({
        title: "กรุณารอสักครู่",
        allowEscapeKey: false,
        allowOutsideClick: false,
        onOpen: () => {
          this.$swal.showLoading();
        }
      });

      console.log("oldservice = " + this.oldTypeService);
      if (this.oldTypeService !== type_id) {
        this.activeBtnTime = "";
        // this.dataPrepareSend.symptom = null;
        // this.dataFetch.dataTimes = null;
        // this.selectedDate = null;
        await axios
          .get("http://127.0.0.1:3333/ServiceDate/" + type_id)
          .then(res => {
            this.dataFetch.dataDates = res.data;
            console.log(this.dataFetch.dataDates);
            this.oldTypeService = type_id;
          });
      }

      //ทุกครั้งทีมีการกดให้ไปดึงวันที่แรกของช่องเลือกวัน
      await axios
        .get(
          "http://127.0.0.1:3333/ServiceTime/" +
            type_id +
            "?time=" +
            this.selectFirstDate
        )
        .then(res => {
          this.dataFetch.dataTimes = res.data;
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

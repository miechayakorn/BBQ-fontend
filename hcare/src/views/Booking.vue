<template>
  <div>
    <div class="container fixed-container mb-3" v-if="loading">
      <VclFacebook />
      <VclList class="mt-2" />
      <VclList class="mt-2" />
    </div>
    <div v-if="!loading" class="container fixed-container mb-3">
      <div class="form-group text-left">
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
              style="cursor: pointer;"
              class="form-check-label"
              :for="item.location_id"
            >{{item.location_name}}</label>
          </div>
        </div>
      </div>
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
        <label for="exampleInputPassword1" class="d-flex justify-content-start">
          อาการ หรือ ประเด็นที่ปรึกษา
          <span style="color:red">*</span>
        </label>
        <textarea
          rows="3"
          :class="[
            'form-control',
            totalcharacter > limitChar ? 'is-invalid' : ''
          ]"
          placeholder="กรุณากรอกข้อมูล"
          v-model="dataPrepareSend.symptom"
          @input="evt=>dataPrepareSend.symptom=evt.target.value"
          :disabled="dataShow.disableSymptom"
          @keyup="countText()"
        ></textarea>
        <p
          class="text-right"
          :style="totalcharacter > limitChar ? 'color: red' : ''"
        >{{ totalcharacter }}/{{ limitChar }} ตัวอักษร</p>
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
import { VclFacebook, VclList } from "vue-content-loading";

export default {
  data() {
    return {
      loading: false,
      limitChar: 100,
      totalcharacter: 0,
      location_id: 1,

      //ข้อมูลเตรียมส่งไป Backend
      dataPrepareSend: {
        booking_id: null,
        symptom: null,
      },
      //ข้อมูลที่ได้จาก Backend
      dataFetch: {
        dataTypes: null,
        dataDates: null,
        dataTimes: null,
        dataLocation: null,
      },
      //ข้อมูลที่เอาไว้โชว์ Fontend
      dataShow: {
        type: "จิตแพทย์",
        date: "",
        time: null,
        activeBtnTime: "",
        disableSymptom: true,
        oldTypeService: 1,
      },
    };
  },
  components: {
    ServiceTypeBox,
    ServiceDateBox,
    ServiceTimeBox,
    logoHeader,
    VclFacebook,
    VclList,
  },
  async mounted() {
    this.loading = true;

    await axios
      .get(`${process.env.VUE_APP_BACKEND_URL}/location`)
      .then((res) => {
        this.dataFetch.dataLocation = res.data;
      });

    //เรียกข้อมูล Default
    //Type

    await axios
      .get(
        `${process.env.VUE_APP_BACKEND_URL}/ServiceTypes/${this.dataFetch.dataLocation[0].location_id}`,
        {
          // headers: { Authorization: `Bearer ${this.$store.state.token}` }
        }
      )
      .then((res) => {
        this.dataFetch.dataTypes = res.data;
      });

    //Date
    await axios
      .get(`${process.env.VUE_APP_BACKEND_URL}/ServiceDate/1`, {
        // headers: { Authorization: `Bearer ${this.$store.state.token}` }
      })
      .then((res) => {
        this.dataFetch.dataDates = res.data;
        this.$swal.close();
      });
    this.loading = false;
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
  },

  methods: {
    clearData() {
      this.dataPrepareSend.booking_id = null;
      this.dataShow.date = "";
      this.dataShow.time = null;
      this.dataShow.disableSymptom = true;
    },
    countText() {
      this.totalcharacter = this.dataPrepareSend.symptom.length;
    },
    async fetchDate(serviceDataType) {
      //เช็ค
      if (this.dataShow.oldTypeService !== serviceDataType.type_id) {
        this.clearData();
        this.dataFetch.dataTimes = null;
        this.dataPrepareSend.symptom = null;
        this.totalcharacter = 0;

        this.$swal({
          ...waiting,
          onOpen: () => {
            this.$swal.showLoading();
          },
        });

        //เก็บชื่อประเภทไว้โชว์ตอนสรุปก่อนยืนยัน
        this.dataShow.type = serviceDataType.type_name;
        console.log("oldservice = " + this.dataShow.oldTypeService);

        this.dataShow.activeBtnTime = "";
        await axios
          .get(
            `${process.env.VUE_APP_BACKEND_URL}/ServiceDate/${serviceDataType.type_id}`
            // {
            //   headers: { Authorization: `Bearer ${this.$store.state.token}` }
            // }
          )
          .then((res) => {
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
          // {
          //   headers: { Authorization: `Bearer ${this.$store.state.token}` }
          // }
        )
        .then((res) => {
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
        if (this.totalcharacter != 0) {
          if (this.totalcharacter <= this.limitChar) {
            console.log("Backend----" + this.dataShow.date);
            this.$swal({
              title: "การจอง " + this.dataShow.type,
              // text:
              //   " วันที่: " +
              //   this.dataShow.date +
              //   " เวลา: " +
              //   this.dataShow.time,
              // text: "กรุณากดยืนยันการจองที่ email",
              html:
                `${this.dataShow.date} , ` +
                "<br/>" +
                `เวลา:  ${this.dataShow.time}` +
                "<br/>" +
                "<hr/>" +
                '<span class="" style="font-size: 18px; text-decoration: underline; color:#FA3D3D"> กรุณากดยืนยันการจองที่ email </span>',
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
                    `${process.env.VUE_APP_BACKEND_URL}/Booking`,
                    {
                      booking_id: this.dataPrepareSend.booking_id,
                      symptom: this.dataPrepareSend.symptom,
                    },
                    {
                      headers: {
                        Authorization: `Bearer ${this.$store.state.token}`,
                      },
                    }
                  )
                  .then((res) => {
                    console.log(res.data);
                    if (res.data.message == "Please verrify account") {
                      this.$swal({
                        icon: "warning",
                        title: "กรุณา Activate บัญชี",
                        text:
                          "ไม่สามารถจองตารางนัดหมายได้ กรุณาตรวจสอบอีเมล เพื่อทำการยืนยันตัวตน",
                      });
                    } else {
                      this.$swal({
                        toast: true,
                        position: "top-end",
                        showConfirmButton: false,
                        timer: 3000,
                        icon: "success",
                        title: "การจองสำเร็จ",
                      });
                      this.$router.push("/appointment");
                    }
                  })
                  .catch((error) => {
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
              text: "กรอกอาการ ตัวอักษรเกินลิมิต",
            });
          }
        } else {
          this.$swal({
            icon: "warning",
            title: "คำเตือน",
            text: "กรุณากรอกอาการ",
          });
        }
      } else {
        this.$swal({
          icon: "warning",
          title: "คำเตือน",
          text: "กรุณาเลือกเวลาที่ต้องการจอง",
        });
      }
    },
  },
  async getService() {
    await axios
      .get(
        `${process.env.VUE_APP_BACKEND_URL}/ServiceTypes/${this.location_id}`,
        {}
      )
      .then((res) => {
        this.dataFetch.dataTypes = res.data;
      });
  },
};
</script>

<style scoped>
@media (max-width: 768px) {
  .fixed-button {
    width: 100%;
    height: 48px;
  }
}
@media (min-width: 768px) {
  .fixed-button {
    width: 320px;
    text-align: center;
    position: relative;
    height: 48px;
  }
}
@media (min-width: 768px) {
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

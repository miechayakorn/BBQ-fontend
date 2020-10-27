<template>
  <div style="margin-top: 25px" class="container fixed-container mb-3">
    <div v-if="loading">
      <VclFacebook />
      <VclList class="mt-2" />
      <VclList class="mt-2" />
    </div>
    <div v-if="!loading">
      <div class="form-group text-left">
        <label class="font-weight-bold">อีเมลผู้ป่วย</label>
        <div>
          <VueBootstrapTypeahead
            inputClass="mb-2 select-date"
            v-if="selectedUser == null"
            v-model="query"
            :data="users"
            :serializer="(item) => item.email"
            @hit="selectedUser = $event"
            placeholder="ค้นหาอีเมลผู้ป่วยในระบบ"
          />
          <select
            v-else-if="selectedUser"
            class="form-control select-date mb-2 col-12 col-md-12"
            disabled
          >
            <option value disabled selected>{{ selectedUser.email }}</option>
          </select>
          <button
            @click="(selectedUser = null), (query = '')"
            class="btn div-showTag text-white text-left m-1"
            v-if="selectedUser"
          >
            <span class="mt-4 mb-4 p-2"> {{ selectedUser.name }}</span
            ><i class="fas fa-times-circle"></i>
          </button>

          <div
            v-else-if="users.length == 0 && query.length >= 4"
            class="alert p-3 alert-warning"
          >
            ไม่พบอีเมลในระบบ กรุณาสมัครสมาชิกก่อนใช้งาน
          </div>
        </div>
      </div>
      <div class="form-group text-left">
        <label class="font-weight-bold">เลือกวิทยาเขต</label>
        <div class="col-12 text-left">
          <div
            class="custom-control custom-radio custom-control-inline"
            v-for="(item, index) in dataFetch.dataLocation"
            :key="index"
          >
            <input
              class="custom-control-input"
              type="radio"
              name="locationSelected"
              :id="item.location_id"
              :value="item"
              v-model="locationSelected"
            />
            <label
              style="cursor: pointer"
              class="custom-control-label"
              :for="item.location_id"
              >{{ item.location_name }}</label
            >
          </div>
        </div>
      </div>
      <div class="form-group text-left">
        <label class="font-weight-bold">เลือกบริการ</label>
        <select
          class="form-control select-date"
          style="cursor: pointer"
          v-model="selectedService"
          id="selectDate"
        >
          <option value="" disabled selected="selected">
            กรุณาเลือกบริการ
          </option>
          <option
            v-for="(data, index) in dataFetch.dataTypes"
            :key="index"
            :value="data"
          >
            {{ data.type_name }}
          </option>
        </select>
      </div>
      <div class="row">
        <div class="form-group text-left w-100">
          <div class="col-12">
            <label class="font-weight-bold">เลือกวัน</label>
          </div>
          <ServiceDateBox
            :dataDates="dataFetch.dataDates"
            v-on:selectedDate="fetchDocter"
          />
        </div>
      </div>
      <div class="row">
        <div class="form-group text-left w-100">
          <div class="col-12">
            <label class="font-weight-bold">เลือกแพทย์</label>
            <select
              v-if="dataFetch.dataDocter.length != 0"
              class="form-control select-date"
              style="cursor: pointer"
              v-model="selectedDocter"
              id="selectDate"
            >
              <option value="" disabled selected="selected">
                กรุณาเลือกแพทย์
              </option>
              <option
                v-for="(dataDocter, index) in dataFetch.dataDocter"
                :key="index"
                :value="dataDocter"
              >
                {{ dataDocter.doctor_name }}
              </option>
            </select>
            <div v-if="dataFetch.dataDocter.length == 0">
              <div class="alert p-3 alert-warning">
                กรุณาเลือกวันให้เรียบร้อย
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="form-group">
          <div class="col-12">
            <label class="d-flex justify-content-start font-weight-bold"
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
        <label
          for="symptom"
          class="d-flex justify-content-start font-weight-bold"
        >
          อาการ หรือ ประเด็นที่ปรึกษา
          <span style="color: red">*</span>
        </label>
        <textarea
          id="symptom"
          :class="[
            'form-control div-symptom',
            totalcharacter > limitChar ? 'is-invalid' : '',
          ]"
          placeholder="กรุณากรอกอาการ..."
          v-model="dataPrepareSend.symptom"
          @input="(evt) => (dataPrepareSend.symptom = evt.target.value)"
          :disabled="dataShow.disableSymptom"
          @keyup="countText()"
        ></textarea>
        <p
          class="text-right mt-1"
          :style="totalcharacter > limitChar ? 'color: red' : ''"
        >
          {{ totalcharacter }}/{{ limitChar }} ตัวอักษร
        </p>
      </div>
      <div class="row" style="text-align: center">
        <div class="col-12">
          <button
            @click="sendToBackend"
            class="btn btn-primary btnBlock btnConfirm mt-2 fixed-button"
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
import logoEmotion from "@/components/svg/logoEmotion.vue";
import VueBootstrapTypeahead from "vue-bootstrap-typeahead";
import ServiceTypeBox from "@/components/ServiceTypeBox.vue";
import ServiceDateBox from "@/components/ServiceDateBox.vue";
import ServiceTimeBox from "@/components/ServiceTimeBox.vue";
import logoHeader from "@/components/svg/logoHeader.vue";
import logoStaff from "@/components/svg/logoStaff.vue";
import { waiting, errorSWAL } from "@/utility/swal.js";
import { VclFacebook, VclList } from "vue-content-loading";

export default {
  data() {
    return {
      query: "",
      selectedUser: null,
      users: [],
      loading: false,
      limitChar: 100,
      totalcharacter: 0,
      locationSelected: null,
      selectedDate: "",
      selectedDocter: "",
      selectedService: "",

      //ข้อมูลเตรียมส่งไป Backend
      dataPrepareSend: {
        booking_id: null,
        symptom: null,
      },
      //ข้อมูลที่ได้จาก Backend
      dataFetch: {
        dataTypes: [],
        dataDates: [],
        dataDocter: [],
        dataTimes: null,
        dataLocation: null,
      },
      //ข้อมูลที่เอาไว้โชว์ Fontend
      dataShow: {
        type: "",
        date: "",
        time: null,
        activeBtnTime: "",
        disableSymptom: true,
      },
    };
  },
  components: {
    logoEmotion,
    logoStaff,
    ServiceTypeBox,
    ServiceDateBox,
    ServiceTimeBox,
    logoHeader,
    VclFacebook,
    VclList,
    VueBootstrapTypeahead,
  },
  async mounted() {
    this.loading = true;

    await axios
      .get(`${process.env.VUE_APP_BACKEND_URL}/location`)
      .then((res) => {
        this.dataFetch.dataLocation = res.data;
        this.locationSelected = this.dataFetch.dataLocation[0];
      });

    this.loading = false;
  },
  watch: {
    locationSelected: {
      handler: async function (val, oldCal) {
        this.dataFetch.dataDates = [];
        this.dataFetch.dataTimes = null;

        await axios
          .get(
            `${process.env.VUE_APP_BACKEND_URL}/ServiceTypes/${val.location_id}`
          )
          .then((res) => {
            this.dataFetch.dataTypes = res.data;
          });
      },
    },
    selectedDocter: {
      handler: async function (val, oldCal) {
        if (this.selectedDocter) {
          this.fetchTime();
        }
      },
    },
    selectedService: {
      handler: async function (val, oldCal) {
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

      if (serviceDataType.type_id) {
        this.clearData();
        this.dataFetch.dataTimes = null;
        this.dataPrepareSend.symptom = null;
        this.totalcharacter = 0;

        this.dataShow.type = serviceDataType.type_name;

        this.dataShow.activeBtnTime = "";
        await axios
          .get(
            `${process.env.VUE_APP_BACKEND_URL}/ServiceDate/${serviceDataType.type_id}`
          )
          .then((res) => {
            this.dataFetch.dataDates = res.data;
            if (this.dataFetch.dataDates.length == 0) {
              this.$swal({
                icon: "warning",
                title: "คำเตือน",
                text: "ไม่พบวันให้บริการ",
              });
            }
          });
      }
    },
    async fetchDocter(selectedDate) {
      this.clearData();
      //เคลียสีปุ่ม
      this.dataShow.activeBtnTime = "";

      //เก็บข้อมูล วันที่ เอาไว้ตอนสรุปก่อนกดยืนยัน
      this.dataShow.date = selectedDate.dateformat;
      this.selectedDate = selectedDate.datevalue;

      await axios
        .get(
          `${process.env.VUE_APP_BACKEND_URL}/servicedoctor/?type_id=${selectedDate.type_id}&date=${selectedDate.datevalue}`
        )
        .then((res) => {
          this.dataFetch.dataDocter = res.data;
          if ((this.dataFetch.dataDocter.length = 1)) {
            this.selectedDocter = res.data[0];
          }
        });
    },
    async fetchTime() {
      this.dataShow.activeBtnTime = "";

      await axios
        .get(
          `${process.env.VUE_APP_BACKEND_URL}/ServiceTime/?time=${this.selectedDate}&working_id=${this.selectedDocter.working_id}`
        )
        .then((res) => {
          this.dataFetch.dataTimes = res.data;
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
      if (
        this.dataPrepareSend.booking_id != null &&
        this.selectedUser != null
      ) {
        if (this.totalcharacter != 0) {
          if (this.totalcharacter <= this.limitChar) {
            console.log("Backend----" + this.dataShow.date);
            this.$swal({
              title: "การจอง " + this.dataShow.type,
              html:
                `${this.dataShow.date} , ` +
                "<br/>" +
                `เวลา:  ${this.dataShow.time}`,
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
                      email: this.selectedUser.email,
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
                        icon: "success",
                        title: "การจองสำเร็จ",
                      }).then((result) => {
                        this.$router.go();
                      });
                    } else {
                      this.$swal({
                        icon: "warning",
                        title: "คำเตือน",
                        text: "ไม่พบ อีเมลผู้ป่วย ในระบบ",
                      });
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
};
</script>

<style>
input[type="radio"] {
  width: 16px;
  height: 16px;
}

.div-patient {
  font-size: 16px;
  line-height: 21px;
  color: #ffffff;
  padding: 16px;
  padding-right: 24px;
  padding-left: 24px;
  min-height: 200px;
  width: 335px;
  margin-bottom: 24px;
  background: #5b629e;
  box-shadow: 0px 4px 8px #cdd2ff;
  border-radius: 20px;
}

@media (min-width: 768px) {
  .div-patient {
    width: 500px;
  }
}

.custom-control-input:checked ~ .custom-control-label::before {
  border-color: #555555;
  background-color: #555555;
}

.div-service {
  background: #ffffff;
  box-shadow: 0px 4px 8px #ebedff;
  border-radius: 10px;
  padding: 10px;
  color: #99a3ff;
  font-weight: 500;
  height: 40px;
  font-size: 14px;
}

.div-service-edit {
  border: 1px solid #99a3ff;
}

.div-symptom {
  box-shadow: 0px 4px 8px #ebedff;
  border-radius: 10px;
  height: 144px;
}

.btnBooking {
  height: 144px;
  width: 152px;
  margin-bottom: 15px;
  box-shadow: 0px 4px 8px #ebedff;
  -webkit-box-shadow: 0px 4px 8px #ebedff;
}

@media (min-width: 768px) {
  .btnBooking {
    width: 200px;
  }
}

.select-date {
  -webkit-appearance: none;
  background: #ffffff;
  box-shadow: 0px 4px 8px #ebedff;
  border-radius: 10px;
  border: none;
  width: 100%;
  height: 48px;
}

.div-showTag {
  color: white;
  background-color: #5e65a1;
  border-radius: 20px;
}
</style>
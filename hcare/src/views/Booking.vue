<template>
  <div style="margin-top: 25px" class="container fixed-container mb-3">
    <div v-if="loading">
      <VclFacebook />
      <VclList class="mt-2" />
      <VclList class="mt-2" />
    </div>
    <div v-if="!loading">
      <div class="form-group text-left">
        <label class="font-weight-bold">{{ $t("location") }}</label>
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
        <label class="font-weight-bold">{{ $t("service") }}</label>
        <div class="row justify-content-center">
          <div
            class="btnType btn-outline-primary active btnBooking"
            v-if="this.$store.state.booking.serviceDataType.type_id"
          >
            <div class="text-center" style="margin-top: 32px">
              <logoEmotion :color="'white'" />
              <p style="color: #ffffff; margin-top: 8px">
                {{ this.$store.state.booking.serviceDataType.type_name }}
              </p>
            </div>
          </div>
        </div>
        <router-link to="/booking/service">
          <div
            v-if="this.$store.state.booking.serviceDataType.type_id"
            class="div-service div-service-edit text-center"
            style="cursor: pointer"
          >
            <span>{{ $t("changeservice") }}</span>
          </div>
          <div v-else class="div-service text-center" style="cursor: pointer">
            <span>{{ $t("chooseservice") }}</span>
          </div>
        </router-link>
      </div>
      <div class="row">
        <div class="form-group text-left w-100">
          <div class="col-12">
            <label class="font-weight-bold">{{ $t("date") }}</label>
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
            <label class="font-weight-bold">{{ $t("doctor") }}</label>
            <select
              v-if="dataFetch.dataDocter.length != 0"
              class="form-control select-date"
              style="cursor: pointer"
              v-model="selectedDocter"
              id="selectDate"
            >
              <option value="" disabled selected="selected">
                {{ $t("dropdowndoctor") }}
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
                {{ $t("alertdate") }}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="row" v-if="dataFetch.dataDocter.length != 0">
        <div class="form-group">
          <div class="col-12">
            <label class="d-flex justify-content-start font-weight-bold">
              {{ $t("pickslot") }}
            </label>
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
          {{ $t("symptoms") }}
          <span style="color: red">*</span>
        </label>
        <textarea
          id="symptom"
          :class="[
            'form-control div-symptom',
            totalcharacter > limitChar ? 'is-invalid' : '',
          ]"
          :placeholder="$t('alertsymptoms')"
          v-model="dataPrepareSend.symptom"
          @input="(evt) => (dataPrepareSend.symptom = evt.target.value)"
          :disabled="dataShow.disableSymptom"
          @keyup="countText()"
        ></textarea>
        <p
          class="text-right mt-1"
          :style="totalcharacter > limitChar ? 'color: red' : ''"
        >
          {{ totalcharacter }}/{{ limitChar }} {{ $t("text") }}
        </p>
      </div>
      <div class="row">
        <div class="col-12">
          <div class="row justify-content-center">
            <div class="div-patient text-left">
              <logoStaff v-if="!this.selectedDocter.doctor_profile_picture" />
              <img
                v-if="this.selectedDocter.doctor_profile_picture"
                class="rounded-circle"
                width="56"
                height="56"
                :src="this.selectedDocter.doctor_profile_picture"
              />
              <div class="float-right title-patient">
                {{ $t("patientcard") }}
              </div>
              <div class="row mt-3">
                <div class="col-4 head-row">{{ $t("servicecard") }}</div>
                <div class="col-8">{{ this.dataShow.type }}</div>
              </div>
              <div class="row">
                <div class="col-4 head-row">{{ $t("doctorcard") }}</div>
                <div class="col-8">{{ this.selectedDocter.doctor_name }}</div>
              </div>
              <div class="row">
                <div class="col-4 head-row">{{ $t("timecard") }}</div>
                <div class="col-8">
                  {{ this.dataShow.date }} <br /><span v-if="this.dataShow.time"
                    >เวลา</span
                  >
                  {{ this.dataShow.time }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="row" style="text-align: center">
        <div class="col-12">
          <button
            :disabled="this.$store.state.token ? false : true"
            @click="sendToBackend"
            class="btn btn-primary btnBlock btnConfirm mt-2 fixed-button"
          >
            {{ this.$store.state.token ? "Confirm" : $t("loginMessage") }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import logoEmotion from "@/components/svg/logoEmotion.vue";
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
      loading: false,
      interval: undefined,
      limitChar: 100,
      totalcharacter: 0,
      locationSelected: null,
      selectedDate: "",
      selectedDocter: "",
      dataPrepareSend: {
        booking_id: null,
        symptom: null,
      },
      dataFetch: {
        dataDates: [],
        dataDocter: [],
        dataTimes: null,
        dataLocation: null,
      },
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
  },

  beforeDestroy() {
    clearInterval(this.interval);
  },

  async mounted() {
    this.loading = true;

    await axios
      .get(`${process.env.VUE_APP_BACKEND_URL}/location`)
      .then((res) => {
        this.dataFetch.dataLocation = res.data;
      });

    if (this.$store.state.booking.location.location_id) {
      this.locationSelected = this.$store.state.booking.location;
    } else {
      this.locationSelected = this.dataFetch.dataLocation[0];
    }

    if (this.$store.state.booking.serviceDataType.type_id) {
      this.fetchDate(this.$store.state.booking.serviceDataType);
    }

    this.loading = false;
  },
  watch: {
    locationSelected: {
      handler: async function (val, oldCal) {
        this.dataFetch.dataDates = [];
        this.dataFetch.dataTimes = null;

        if (
          oldCal != null &&
          this.$store.state.booking.serviceDataType.type_id
        ) {
          this.$store.state.booking.serviceDataType = {
            type_id: "",
            type_name: "",
          };
        }
        this.$store.state.booking.location = val;
      },
    },
    selectedDocter: {
      handler: async function (val, oldCal) {
        if (this.selectedDocter) {
          this.dataShow.activeBtnTime = "";
          this.dataPrepareSend.booking_id = null;
          this.dataShow.time = null;
          this.fetchTime();
        }
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
      this.dataShow.activeBtnTime = "";
      this.dataFetch.dataTimes = null;
      if (this.interval) {
        clearInterval(this.interval);
      }

      this.dataShow.date = selectedDate.dateformat;
      this.selectedDate = selectedDate.datevalue;

      await axios
        .get(
          `${process.env.VUE_APP_BACKEND_URL}/servicedoctor/?type_id=${selectedDate.type_id}&date=${selectedDate.datevalue}`
        )
        .then((res) => {
          this.dataFetch.dataDocter = res.data;
          if (this.dataFetch.dataDocter.length == 1) {
            this.selectedDocter = res.data[0];
          } else {
            this.selectedDocter = "";
          }
        });
    },
    async fetchTime() {
      if (this.interval) {
        clearInterval(this.interval);
      }

      await axios
        .get(
          `${process.env.VUE_APP_BACKEND_URL}/ServiceTime/?time=${this.selectedDate}&working_id=${this.selectedDocter.working_id}`
        )
        .then((res) => {
          this.dataFetch.dataTimes = res.data;
        });

      this.interval = setInterval(() => {
        this.fetchTime();
      }, 5000);
    },
    onChangeTime(booking) {
      this.dataPrepareSend.booking_id = booking.booking_id;
      this.dataShow.time = booking.time;
      this.dataShow.activeBtnTime = booking.activeBtnTime;
      this.dataShow.disableSymptom = false;
    },
    sendToBackend() {
      if (this.dataPrepareSend.booking_id != null) {
        if (this.totalcharacter != 0) {
          if (this.totalcharacter <= this.limitChar) {
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
                    if (res.data.message == "Please verrify account") {
                      this.$swal({
                        icon: "warning",
                        title: "กรุณา Activate บัญชี",
                        text:
                          "ไม่สามารถจองตารางนัดหมายได้ กรุณาตรวจสอบอีเมล เพื่อทำการยืนยันตัวตน",
                      });
                    } else if (res.status == 203) {
                      this.$swal({
                        icon: "warning",
                        title: "คำเตือน",
                        text: res.data,
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
};
</script>

<style scoped>
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

.title-patient {
  color: #99a3ff;
  font-weight: bold;
  font-size: 24px;
  line-height: 36px;
}

.head-row {
  line-height: 21px;
  color: #ccd1ff;
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
</style>

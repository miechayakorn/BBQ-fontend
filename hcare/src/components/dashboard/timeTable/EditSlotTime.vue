<template>
  <div class="container mb-4">
    <div class="text-left font-weight-bold" style="margin-top: 32px">
      <span>ส่วนที่ 1 : เลือกวันที่และบริการ</span>
    </div>
    <div class="mt-3 div-card">
      <div class="row box-01">
        <div class="col-4">
          <man2 class="d-none d-md-block mt-3" />
        </div>
        <div class="col-12 col-md-8">
          <div class="row">
            <div class="col-12 col-md-6">
              <div class="form-group text-left" style="margin-top: 48px">
                <label for="serviceType">เลือกบริการ</label>
                <select id="serviceType" class="form-control" v-model="service">
                  <option :value="null" disabled selected="selected">
                    -- กรุณาเลือกบริการ --
                  </option>
                  <option
                    v-for="(type, index) in dataFetch.dataTypes"
                    :key="index"
                    :value="type.type_id + '-' + type.doctor_id"
                  >
                    {{ type.type_name }}
                  </option>
                </select>
              </div>
            </div>
            <div class="col-12 col-md-6">
              <div class="form-group text-left" style="margin-top: 48px">
                <div><label for="InputName">เลือกวันที่</label></div>
                <select id="serviceDate" class="form-control" v-model="date">
                  <option :value="null" disabled selected="selected">
                    -- กรุณาเลือกวันที่ --
                  </option>
                  <option
                    v-for="(dateService, index) in dataFetch.dataDateService"
                    :key="index"
                    :value="dateService.date"
                  >
                    {{ dateService.dateTH }}
                  </option>
                </select>
              </div>
            </div>
          </div>
          <div class="col-12 mt-4 mb-4">
            <button
              class="btn btn-primary btnBlock btnConfirm fixed-button mb-2"
              @click="fetchSlot"
            >
              ตกลง
            </button>
          </div>
        </div>
      </div>
    </div>
    <VclFacebook v-if="loading" class="mt-3" />
    <div class="row mt-2" v-show="visibleState">
      <div class="col-12 text-left font-weight-bold" style="margin-top: 32px">
        <span>ส่วนที่ 2 : เลือก slot เวลาให้บริการ</span>
      </div>
      <div class="col-12 mt-3 div-card">
        <div class="row box-02" v-if="noContent == false">
          <div
            class="col-12 col-md-3"
            style="border-right: 3px solid rgba(224, 224, 224, 0.28)"
          >
            <div class="col-12 h75 dis-pc mt-4">
              <div>
                <div class="col-12">
                  <i class="far fa-clock"></i>
                  {{ dataFetch.dateText }}
                </div>
                <div class="col-12 mt-2">
                  <toggle-button
                    class="mr-2"
                    :width="45"
                    :height="25"
                    :font-size="14"
                    :sync="true"
                    :value="toggleControlAll"
                    color="#99a3ff"
                    @change="sendToBackendAllToggle($event.value)"
                  />
                </div>
              </div>
            </div>
          </div>
          <div class="col-12 col-md-9" style="display: block">
            <div class="row mt-4 mb-4">
              <div
                class="col-6 col-md-4 col-lg-3"
                v-for="(time, index) in dataFetch.dataSlotTime"
                :key="index"
              >
                <div class="col-12">
                  <span style="text-align: center">{{
                    time.time_in.substring(0, 5)
                  }}</span>
                </div>
                <div class="col-12" v-if="time.status == null">
                  <toggle-button
                    class="mr-2"
                    :width="45"
                    :height="25"
                    :font-size="14"
                    :sync="true"
                    :value="time.toggle"
                    color="#99a3ff"
                    @change="onChangeEventHandler(time, $event.value)"
                  />
                </div>
                <div
                  style="font-weight: bold"
                  class="col-12 text-primary"
                  v-if="time.status != null"
                >
                  {{ time.status }}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="row box-02" v-else-if="noContent == true">
          <div class="col-12 col-md-3 p-4">ไม่มีบริการในวันที่เลือก</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import man2 from "@/components/svg/man2.vue";
import { errorSWAL } from "@/utility/swal.js";
import VclFacebook from "vue-content-loading";
import formatDate from "@/utility/formatDate";

export default {
  data() {
    return {
      loading: false,
      noContent: false,
      visibleState: false,
      toggleControlAll: true,
      service: null,
      dataFetch: {
        dataDateService: null,
        dataTypes: null,
        dataDates: null,
        dataSlotTime: [],
        dateText: null,
        toggle: null,
      },
      date: null,
      dataPrepareSend: {
        slot: [],
      },
    };
  },
  components: {
    man2,
    VclFacebook,
  },
  watch: {
    service: {
      handler: async function (val, oldCal) {
        this.visibleState = false;
        this.date = null;
        this.fetchDateEditSlotTime(val);
      },
    },
    date: {
      handler: async function (val, oldCal) {
        this.visibleState = false;
      },
    },
  },
  methods: {
    showSwalToast() {
      this.$swal({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timerProgressBar: true,
        onOpen: (toast) => {
          toast.addEventListener("mouseenter", this.$swal.stopTimer);
          toast.addEventListener("mouseleave", this.$swal.resumeTimer);
        },
        timer: 3000,
        icon: "success",
        title: "บันทึกสำเร็จ",
      });
    },
    async fetchDateEditSlotTime(service) {
      try {
        await axios
          .post(
            `${process.env.VUE_APP_BACKEND_URL}/admin/dashboard/timetable/EditSlotTime/checkdate`,
            {
              type_id: service.split("-")[0],
              doctor_id: service.split("-")[1],
            },
            {
              headers: {
                Authorization: `Bearer ${this.$store.state.token}`,
              },
            }
          )
          .then((res) => {
            this.dataFetch.dataDateService = res.data;
          });
      } catch (error) {
        console.log(error);
        this.$swal({
          ...errorSWAL,
        });
      }
    },
    logicStatusToggleAll() {
      // เช็คว่าถ้าทั้งหมดเป็น false ให้ toggleControlAll เป็นปิดtoggle
      let toggleCheck = null;
      this.dataFetch.dataSlotTime.forEach((time) => {
        if (time.toggle == true && time.status == null) {
          toggleCheck = "haveTrue";
        }
      });
      if (toggleCheck == null) {
        this.toggleControlAll = false;
      } else {
        this.toggleControlAll = true;
      }
    },
    async onChangeEventHandler(time, statusButton) {
      if (statusButton == true) {
        try {
          await axios
            .patch(
              `${process.env.VUE_APP_BACKEND_URL}/admin/dashboard/timetable/EditSlotTime/oneslotsave`,
              {
                booking_id: time.booking_id,
                availability: "AVAILABLE",
              },
              {
                headers: {
                  Authorization: `Bearer ${this.$store.state.token}`,
                },
              }
            )
            .then((res) => {
              this.fetchSlot();
              this.showSwalToast();
            });
        } catch (error) {
          console.log(error);
          this.$swal({
            ...errorSWAL,
          });
        }
      } else if (statusButton == false) {
        try {
          await axios
            .patch(
              `${process.env.VUE_APP_BACKEND_URL}/admin/dashboard/timetable/EditSlotTime/oneslotsave`,
              {
                booking_id: time.booking_id,
                availability: "UNAVAILABLE",
              },
              {
                headers: {
                  Authorization: `Bearer ${this.$store.state.token}`,
                },
              }
            )
            .then((res) => {
              this.fetchSlot();
              this.showSwalToast();
            });
        } catch (error) {
          console.log(error);
          this.$swal({
            ...errorSWAL,
          });
        }
      }
      this.visibleState = true;
    },
    async sendToBackendAllToggle(statusButton) {
      let arrayTime = [];
      this.dataFetch.dataSlotTime.forEach((time) => {
        if (time.status == null) {
          arrayTime.push(time.booking_id);
        }
      });
      this.toggleControlAll = statusButton;
      if (statusButton == true) {
        try {
          await axios
            .put(
              `${process.env.VUE_APP_BACKEND_URL}/admin/dashboard/timetable/EditSlotTime/allslotsave`,
              {
                array_booking_id: arrayTime,
                availability: "AVAILABLE",
              },
              {
                headers: {
                  Authorization: `Bearer ${this.$store.state.token}`,
                },
              }
            )
            .then((res) => {
              this.fetchSlot();
              this.showSwalToast();
            });
        } catch (error) {
          console.log(error);
          this.$swal({
            ...errorSWAL,
          });
        }
      } else if (statusButton == false) {
        try {
          await axios
            .put(
              `${process.env.VUE_APP_BACKEND_URL}/admin/dashboard/timetable/EditSlotTime/allslotsave`,
              {
                array_booking_id: arrayTime,
                availability: "UNAVAILABLE",
              },
              {
                headers: {
                  Authorization: `Bearer ${this.$store.state.token}`,
                },
              }
            )
            .then((res) => {
              this.fetchSlot();
              this.showSwalToast();
            });
        } catch (error) {
          console.log(error);
          this.$swal({
            ...errorSWAL,
          });
        }
      }
      this.visibleState = true;
      //Send DATA
    },
    async fetchSlot() {
      if (this.service && this.date) {
        this.loading = true;
        try {
          await axios
            .post(
              `${process.env.VUE_APP_BACKEND_URL}/admin/dashboard/timetable/EditSlotTime/checkslot`,
              {
                type_id: this.service.split("-")[0],
                date: formatDate.format(this.date),
                doctor_id: this.service.split("-")[1],
              },
              {
                headers: {
                  Authorization: `Bearer ${this.$store.state.token}`,
                },
              }
            )
            .then((res) => {
              if (res.status == 204) {
                this.noContent = true;
                this.dataFetch.dataSlotTime = [];
                this.$swal({
                  icon: "warning",
                  title: "คำเตือน",
                  text: "ไม่มีวันให้บริการ สำหรับประเภทบริการที่คุณเลือก",
                });
              } else if (res.data == "Empty Slot") {
                this.noContent = true;
                this.dataFetch.dataSlotTime = null;

                this.$swal({
                  icon: "warning",
                  title: "คำเตือน",
                  text: "ยังไม่มีตารางให้บริการนี้อยู่",
                });
              } else {
                this.noContent = false;
                this.dataFetch.dataSlotTime = res.data.timeArray;
                this.dataFetch.dateText = res.data.date_use;
                this.logicStatusToggleAll();
              }
              this.visibleState = true;
            });
        } catch (error) {
          console.log(error);
          this.$swal({
            ...errorSWAL,
          });
        }
        this.loading = false;
      } else {
        this.$swal({
          icon: "warning",
          title: "คำเตือน",
          text: "กรุณาเลือกบริการ และวันที่",
        });
      }
    },
  },
  async mounted() {
    //เรียกข้อมูล Default Type
    await axios
      .get(`${process.env.VUE_APP_BACKEND_URL}/ServiceTypesStaff`, {
        headers: {
          Authorization: `Bearer ${this.$store.state.token}`,
        },
      })
      .then((res) => {
        this.dataFetch.dataTypes = res.data;
      });
  },
};
</script>

<style>
.box-01 {
  background: #ffeaa6;
  box-shadow: 0px 4px 8px #ffe6c8;
}

.box-02 {
  background: #ffffff;
  box-shadow: 0px 4px 8px #e9ebfb;
}

@media (min-width: 768px) {
  .dis-pc {
    position: absolute;
    top: 35%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
}
</style>

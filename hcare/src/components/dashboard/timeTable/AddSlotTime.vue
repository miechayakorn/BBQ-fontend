<template>
  <div class="container mb-4">
    <div class="text-left font-weight-bold" style="margin-top: 32px">
      <span>ส่วนที่ 1 : เลือกวันที่และบริการ</span>
    </div>
    <div class="mt-3 div-card">
      <div class="row bg-blueMan2">
        <div class="col-4">
          <man2 class="d-none d-md-block mt-3" />
        </div>
        <div class="col-12 col-md-8">
          <div class="row">
            <div class="col-12 col-md-6">
              <div class="form-group text-left" style="margin-top: 48px">
                <label for="serviceType">เลือกบริการ</label>
                <select id="serviceType" class="form-control" v-model="type_id">
                  <option value disabled selected>
                    -- กรุณาเลือกบริการ --
                  </option>
                  <option
                    v-for="(data, index) in dataFetch.dataTypes"
                    :key="index"
                    :value="data.type_id + '-' + data.doctor_id"
                  >
                    {{ data.type_name }}
                  </option>
                </select>
              </div>
            </div>
            <div class="col-12 col-md-6">
              <div class="form-group text-left" style="margin-top: 48px">
                <div>
                  <label for="InputDate">เลือกวันที่</label>
                </div>
                <v-date-picker
                  locale="th"
                  color="indigo"
                  :available-dates="{ weekdays: dataFetch.availableDates }"
                  :popover="{ placement: 'top', visibility: 'click' }"
                  v-model="date"
                  :input-props="{
                    class: 'form-control',
                    placeholder: 'กรุณาเลือกวัน',
                  }"
                />
              </div>
            </div>
            <div class="col-12 mt-4 mb-4">
              <button
                @click="fetchSlot"
                class="btn btn-primary btnBlock btnConfirm fixed-button mb-3"
              >
                ตกลง
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <VclFacebook v-if="loading" class="mt-3" />
    <div class="mt-3" v-show="visibleState">
      <div class="text-left font-weight-bold mb-3" style="margin-top: 32px">
        <span>ส่วนที่ 2 : เลือก slot เวลาให้บริการ</span>
      </div>
      <div class="row box-02" v-if="noContent == false">
        <div
          class="col-12 col-md-3"
          style="border-right: 3px solid rgba(224, 224, 224, 0.28)"
        >
          <div class="col-12 h75 dis-pc">
            <div>
              <div class="col-12 mt-4">
                <i class="far fa-clock"></i>
                {{ this.dataFetch.dateText }}
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
                  time.slot.substring(0, 5)
                }}</span>
              </div>
              <div v-if="time.status == 'available'" class="col-12">
                <toggle-button
                  class="mr-2"
                  :width="45"
                  :height="25"
                  :font-size="14"
                  :value="time.toggle"
                  color="#99a3ff"
                  @change="onChangeEventHandler(time, $event.value)"
                />
              </div>
              <div
                v-if="time.status == 'unavailable'"
                style="font-weight: bold"
                class="col-12 text-primary"
              >
                <i class="fas fa-check-circle"></i> สร้างเรียบร้อยแล้ว
              </div>
            </div>
          </div>
          <div class="row" v-show="dataPrepareSend.slot_time.length != 0">
            <div class="col-12 mt-3 mb-3">
              <button
                @click="sendToBackend"
                class="btn btn-primary btnBlock btnConfirm fixed-button mb-2"
              >
                ยืนยัน
              </button>
            </div>
          </div>
        </div>
      </div>
      <div class="row box-02" v-if="noContent == true">
        <div class="col-12 col-md-3 p-4">ไม่มีบริการในวันที่เลือก</div>
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
      type_id: "",
      date: "",
      dataFetch: {
        availableDates: [],
        dataTypes: null,
        dataSlotTime: [],
        dateText: "",
      },
      dataPrepareSend: {
        type_id: "",
        date: "",
        slot_time: [],
        doctor_id: "",
      },
    };
  },
  components: {
    man2,
    VclFacebook,
  },
  watch: {
    type_id: {
      handler: async function (val, oldCal) {
        this.date = "";
        const dataArr = this.type_id.split("-");
        let type_id = dataArr[0];
        let doctor_id = dataArr[1];

        await axios
          .post(
            `${process.env.VUE_APP_BACKEND_URL}/admin/dashboard/timetable/managetable/checkdate`,
            {
              type_id: type_id,
              doctor_id: doctor_id,
            },
            {
              headers: {
                Authorization: `Bearer ${this.$store.state.token}`,
              },
            }
          )
          .then((res) => {
            this.dataFetch.availableDates = res.data;
          });
      },
    },
  },
  methods: {
    onChangeEventHandler(time, statusButton) {
      if (statusButton == true) {
        // Adding  Array element
        this.dataPrepareSend.slot_time.push(time.slot);
      } else if (statusButton == false) {
        this.dataPrepareSend.slot_time = Object.values(
          // Removing Array element
          Object.fromEntries(
            Object.entries(this.dataPrepareSend.slot_time).filter(
              ([key, val]) => val !== time.slot
            )
          )
        );
      }
    },
    async fetchSlot() {
      if (this.type_id != "" && this.date != "") {
        //Clear Toggle bug
        if (this.dataPrepareSend.slot_time.length != 0) {
          this.noContent = true;
          this.dataPrepareSend.slot_time = [];
        }
        this.loading = true;
        const dataArr = this.type_id.split("-");
        this.dataPrepareSend.doctor_id = dataArr[1];
        try {
          await axios
            .post(
              `${process.env.VUE_APP_BACKEND_URL}/admin/dashboard/timetable/managetable/checktimeslot`,
              {
                type_id: this.type_id.split("-")[0],
                date: formatDate.format(this.date),
                doctor_id: this.dataPrepareSend.doctor_id,
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
              } else if (res.status == 200) {
                this.noContent = false;
                this.dataFetch.dataSlotTime = res.data.timeArray;
                // Use data from fetch to sendSubmit
                this.dataFetch.type_id = res.data.type_id;
                this.dataFetch.date = res.data.date;
                this.dataFetch.dateText = res.data.date_use;
              }
              this.visibleState = true;
            });
        } catch (error) {
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
    sendToBackend() {
      this.$swal({
        title: "การเพิ่ม slot เวลา",
        text: this.dataPrepareSend.slot_time,
        footer: this.dataFetch.dateText,
        icon: "info",
        showCancelButton: true,
        reverseButtons: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Confirm",
        cancelButtonText: "No",
      }).then((result) => {
        if (result.value) {
          try {
            axios
              .post(
                `${process.env.VUE_APP_BACKEND_URL}/admin/dashboard/timetable/managetable/savetimeslot`,
                {
                  // Use data from fetch to sendSubmit
                  type_id: this.dataFetch.type_id.split("-")[0],
                  date: formatDate.format(this.dataFetch.date),
                  time_slot: this.dataPrepareSend.slot_time,
                  doctor_id: this.dataPrepareSend.doctor_id,
                },
                {
                  headers: {
                    Authorization: `Bearer ${this.$store.state.token}`,
                  },
                }
              )
              .then((res) => {
                this.dataFetch.dataSlotTime = res.data;
                this.dataPrepareSend.slot_time = [];
                this.fetchSlot();

                this.$swal({
                  toast: true,
                  position: "top-end",
                  showConfirmButton: false,
                  timerProgressBar: true,
                  onOpen: (toast) => {
                    toast.addEventListener("mouseenter", this.$swal.stopTimer);
                    toast.addEventListener(
                      "mouseleave",
                      this.$swal.resumeTimer
                    );
                  },
                  timer: 3000,
                  icon: "success",
                  title: "บันทึกสำเร็จ",
                });
              });
          } catch (error) {
            this.$swal({
              ...errorSWAL,
            });
          }
        }
      });
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
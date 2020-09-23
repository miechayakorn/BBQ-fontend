<template>
  <div class="container mb-4">
    <div class="text-left font-weight-bold" style="margin-top:32px">
      <span>ส่วนที่ 1 : เลือกบริการ</span>
    </div>
    <div class="row mt-3 bg-blueMan2">
      <div class="col-6 row">
        <doctor3
          class="d-none d-md-block"
          style="margin: 0; position: absolute; top: 50%; left: 50%; -ms-transform: translate(-50%, -50%); transform: translate(-50%, -50%);"
        />
      </div>
      <div class="col-12 col-md-6">
        <div class="row">
          <div class="col-12">
            <div class="form-group text-left" style="margin-top:48px;">
              <label for="InputDate">เลือกสถานที่สำหรับบริการ</label>
              <div class="col-12">
                <div
                  class="form-check form-check-inline"
                  v-for="(item, index) in dataFetch.dataLocation"
                  :key="index"
                >
                  <input
                    class="form-check-input"
                    type="radio"
                    name="location_id"
                    style="cursor: pointer;"
                    :id="item.location_id"
                    :value="item.location_id"
                    v-model="location_id"
                  />
                  <label
                    style="cursor: pointer;"
                    class="form-check-label"
                    :for="item.location_id"
                  >{{ item.location_name }}</label>
                </div>
              </div>
            </div>
          </div>
          <div class="col-12">
            <div class="form-group text-left">
              <label for="serviceType">เลือกบริการ</label>
              <select id="serviceType" class="form-control col-12 col-md-6" v-model="type_id">
                <option value disabled selected>-- กรุณาเลือกบริการ --</option>
                <option
                  v-for="(data, index) in dataFetch.dataService"
                  :key="index"
                  :value="data.type_id"
                >{{ data.type_name }}</option>
              </select>
            </div>
          </div>
          <div class="col-12" v-if="this.$store.state.role == 'ADMIN'">
            <div class="form-group text-left">
              <label for="serviceType">เลือกผู้รับผิดชอบบริการ</label>
              <select
                id="serviceType"
                class="form-control col-12 col-md-6"
                v-model="responsibleMan"
              >
                <option value disabled selected>-- กรุณาเลือกผู้รับผิดชอบ --</option>
                <option
                  v-for="(data, index) in dataFetch.dataEmployee"
                  :key="index"
                  :value="data.account_id"
                >{{ data.prefix }} {{ data.name }}</option>
              </select>
            </div>
          </div>
          <div class="col-12 mt-4 mb-4" v-if="this.$store.state.role == 'STAFF'">
            <button
              @click="fetchWorkTime"
              class="btn btn-primary btnBlock btnConfirm fixed-button col-12 col-md-6 float-left"
            >ตกลง</button>
          </div>
          <div class="col-12 mt-4 mb-4" v-else-if="this.$store.state.role == 'ADMIN'">
            <button
              @click="fetchWorkTimeAdmin"
              class="btn btn-primary btnBlock btnConfirm fixed-button col-12 col-md-6 float-left"
            >ตกลง</button>
          </div>
        </div>
      </div>
    </div>
    <VclFacebook v-if="loading" class="mt-3" />
    <div v-if="visibleState1 && loading == false" class="mt-3 text-left font-weight-bold">
      <div class="mb-3" style="margin-top:32px">
        <span>ส่วนที่ 2 : เลือกวันให้บริการ และแก้ไข</span>
      </div>
      <div class="row">
        <div class="col-12 col-md-4 pt-4 pb-3 pl-5 pr-5 div-card">
          <div class="row mt-2">
            <div class="col-12 mt-4">
              <div class="row">
                <label for="InputStartTime">เลือกวันให้บริการ</label>
                <div
                  v-for="(data, index) in dataFetch.dataWorkTime"
                  :key="index"
                  @click="changeCardColor(index , data.working_id)"
                  :class="[
                'col-12 mt-2 pt-4 pb-3 pl-4 text-left text-white',
                colorCard == index ? 'div-card-click' : 'div-card-unclick'
              ]"
                >
                  <div class="row">
                    <div class="col-10 align-self-center">
                      <h6 class="font-weight-bold">วัน{{data.วันที่}}</h6>
                    </div>
                    <div class="col-2">
                      <iconArrow :color="colorCard == index ? 'white' : '#E9EBFB'" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div v-if="visibleState2" class="col-12 col-md-8 pt-4 pb-3 pl-5 pr-5 div-card">
          <div class="float-right">
            <toggle-button
              class="mr-2"
              :width="45"
              :height="25"
              :font-size="14"
              :value="dataFetch.dataWorkTimeDetail.status"
              color="#99a3ff"
              @change="statusService(time,$event.value)"
            />
            <button @click="deleteBooking()" type="button" class="btn">
              <i class="fas fa-trash fa-lg" style="color: #e34724;"></i>
            </button>
          </div>
          <h6 class="text-left">
            <span class="font-weight-bold">วัน{{dataFetch.dataWorkTimeDetail.วันที่}}&nbsp;:&nbsp;</span>
            {{dataFetch.dataWorkTimeDetail.prefix}} {{dataFetch.dataWorkTimeDetail.first_name}} {{dataFetch.dataWorkTimeDetail.last_name}}
          </h6>
          <h6 class="text-left">
            <span class="font-weight-bold">บริการ&nbsp;:&nbsp;</span>
            {{dataFetch.dataWorkTimeDetail.type_name}}
          </h6>
          <div class="row mt-5">
            <div class="col-6 form-group text-left mt-2">
              <label for="InputStartTime">เวลาเริ่มบริการ</label>
              <input
                type="time"
                id="InputStartTime"
                class="form-control"
                v-model="dataFetch.dataWorkTimeDetail.start_time"
              />
            </div>
            <div class="col-6 form-group text-left mt-2">
              <label for="InputEndTime">เวลาเลิกบริการ</label>
              <input
                type="time"
                id="InputEndTime"
                class="form-control"
                v-model="dataFetch.dataWorkTimeDetail.end_time"
              />
            </div>
            <div class="col-6 form-group text-left mt-2">
              <label for="InputEndTime">เวลาให้บริการต่อ 1 slot</label>
              <select
                v-model="dataFetch.dataWorkTimeDetail.time_slot"
                id="Input1Slot"
                class="form-control"
              >
                <option value disabled selected>-- กรุณาเลือกเวลา --</option>
                <option value="15">15 นาที</option>
                <option value="30">30 นาที</option>
                <option value="45">45 นาที</option>
                <option value="60">1 ชั่วโมง</option>
                <option value="75">1 ชั่วโมง 15 นาที</option>
              </select>
            </div>
          </div>
          <div class="col-12 text-center">
            <button
              @click="sendEditWorkTimeDetail"
              class="btn btn-primary btnBlock btnConfirm fixed-button col-md-6 mt-5 mb-3"
            >บันทึก</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { errorSWAL } from "@/utility/swal.js";
import ServiceTypeBox from "@/components/ServiceTypeBox.vue";
import manHome from "@/components/svg/manHome.vue";
import iconArrow from "@/components/svg/icon/iconArrow.vue";
import VclFacebook from "vue-content-loading";
import doctor3 from "@/components/svg/doctor3.vue";

export default {
  data() {
    return {
      loading: false,
      visibleState1: false,
      visibleState2: false,
      colorCard: null,

      location_id: 1,
      type_id: "",
      responsibleMan: "",
      dataFetch: {
        dataLocation: [],
        dataService: [],
        dataEmployee: [],
        dataWorkTime: [],
        dataWorkTimeDetail: {
          day: "",
          doctor_id: "",
          end_time: "",
          first_name: "",
          last_name: "",
          location_id: "",
          location_name: "",
          prefix: "",
          start_time: "",
          status: "",
          time_slot: "",
          type_id: "",
          type_name: "",
          working_id: "",
        },
      },
    };
  },
  components: {
    ServiceTypeBox,
    manHome,
    iconArrow,
    doctor3,
    VclFacebook,
  },
  watch: {
    location_id: {
      handler: async function (val, oldCal) {
        this.type_id = "";
        this.responsibleMan = "";
        this.getService();
      },
    },
    type_id: {
      handler: async function (val, oldCal) {
        if (this.$store.state.role == "ADMIN") {
          this.getEmployee(val);
        }
      },
    },
  },
  methods: {
    statusService() {},
    async changeCardColor(nameCard, working_id) {
      this.colorCard = nameCard;
      this.visibleState2 = true;
      this.getWorktimesDetail(working_id);
    },
    async getService() {
      await axios
        .get(
          `${process.env.VUE_APP_BACKEND_URL}/editservice/getservice?location_id=${this.location_id}`,
          {
            headers: {
              Authorization: `Bearer ${this.$store.state.token}`,
            },
          }
        )
        .then((res) => {
          this.dataFetch.dataService = res.data;
        });
    },
    async getEmployee(type_id) {
      await axios
        .get(
          `${process.env.VUE_APP_BACKEND_URL}/editservice/admingetemployee?type_id=${type_id}`,
          {
            headers: {
              Authorization: `Bearer ${this.$store.state.token}`,
            },
          }
        )
        .then((res) => {
          this.dataFetch.dataEmployee = res.data;
        });
    },

    async getWorktimesDetail(working_id) {
      await axios
        .get(
          `${process.env.VUE_APP_BACKEND_URL}/editservice/getworktimes/detail?working_id=${working_id}`,
          {
            headers: {
              Authorization: `Bearer ${this.$store.state.token}`,
            },
          }
        )
        .then((res) => {
          this.dataFetch.dataWorkTimeDetail = res.data;
        });
    },

    async fetchWorkTime() {
      if (this.type_id != "") {
        this.loading = true;
        try {
          await axios
            .post(
              `${process.env.VUE_APP_BACKEND_URL}/editservice/getworktimes`,
              {
                type_id: this.type_id,
                account_id: this.dataFetch.dataService[0].account_id,
              },
              {
                headers: {
                  Authorization: `Bearer ${this.$store.state.token}`,
                },
              }
            )
            .then((res) => {
              if (res.status == 204) {
                this.dataFetch.dataSlotTime = [];
                this.$swal({
                  icon: "warning",
                  title: "คำเตือน",
                  text: "ไม่มีวันในบริการที่คุณเลือก",
                });
              } else if (res.status == 200) {
                this.dataFetch.dataWorkTime = res.data;
              }
              this.visibleState1 = true;
              this.visibleState2 = false;
              this.colorCard = null;
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
          text: "กรุณากรอกข้อมูลให้ครบ",
        });
      }
    },

    async fetchWorkTimeAdmin() {
      if (this.type_id != "" && this.responsibleMan != "") {
        this.loading = true;
        try {
          await axios
            .post(
              `${process.env.VUE_APP_BACKEND_URL}/editservice/getworktimes`,
              {
                type_id: this.type_id,
                account_id: this.responsibleMan,
              },
              {
                headers: {
                  Authorization: `Bearer ${this.$store.state.token}`,
                },
              }
            )
            .then((res) => {
              if (res.status == 204) {
                this.dataFetch.dataSlotTime = [];
                this.$swal({
                  icon: "warning",
                  title: "คำเตือน",
                  text: "ไม่มีวันในบริการที่คุณเลือก",
                });
              } else if (res.status == 200) {
                this.dataFetch.dataWorkTime = res.data;
              }
              this.visibleState1 = true;
              this.visibleState2 = false;
              this.colorCard = null;
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
          text: "กรุณากรอกข้อมูลให้ครบ",
        });
      }
    },
    async sendEditWorkTimeDetail() {
      if (this.type_id != "" && this.responsibleMan != "") {
        this.loading = true;
        try {
          await axios
            .patch(
              `${process.env.VUE_APP_BACKEND_URL}/editservice/getworktimes`,
              {
                working_id: 9,
                start_time: "08:00:00",
                end_time: "17:00:00",
                time_slot: 60,
                account_id: 41,
              },
              {
                headers: {
                  Authorization: `Bearer ${this.$store.state.token}`,
                },
              }
            )
            .then((res) => {
              if (res.status == 204) {
                this.dataFetch.dataSlotTime = [];
                this.$swal({
                  icon: "warning",
                  title: "คำเตือน",
                  text: "ไม่มีวันในบริการที่คุณเลือก",
                });
              } else if (res.status == 200) {
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
                  title: "สร้างบริการสำเร็จ",
                });
              }
              this.visibleState1 = true;
              this.visibleState2 = false;
              this.colorCard = null;
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
          text: "กรุณากรอกข้อมูลให้ครบ",
        });
      }
    },
  },
  async mounted() {
    await axios
      .get(`${process.env.VUE_APP_BACKEND_URL}/location`)
      .then((res) => {
        this.dataFetch.dataLocation = res.data;
      });
    this.getService();
  },
};
</script>

<style>
.div-card-unclick {
  border-radius: 8px;
  background-color: #5e65a1;
  box-shadow: 0px 4px 8px #f2f2f2;
  cursor: pointer;
}
.div-card-click {
  border-radius: 8px;
  background-color: #a6acde;
  box-shadow: 0px 2px 8px rgba(54, 58, 99, 0.2);
  cursor: pointer;
}
</style>

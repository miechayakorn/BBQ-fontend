<template>
  <div class="container mb-4">
    <div class="row mt-3 bg-blueMan2" v-if="this.$store.state.role == 'ADMIN'">
      <div class="col-6">
        <manHome class="d-none d-md-block mx-auto mt-4" />
      </div>
      <div class="col-12 col-md-6">
        <div class="col-12 col-md-7">
          <div class="form-group text-left" style="margin-top: 48px">
            <label for="serviceType">เพิ่มบริการใหม่</label>
            <input
              type="text"
              id="serviceType"
              class="form-control col-12"
              placeholder="กรุณาพิมพ์ชื่อบริการ"
              v-model="dataPrepareSend.serviceName"
            />
          </div>
        </div>
        <div class="col-12">
          <div class="form-group text-left">
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
                  :id="item.location_id"
                  :value="item.location_id"
                  v-model="dataPrepareSend.location_id"
                />
                <label class="form-check-label" :for="item.location_id">
                  {{ item.location_name }}
                </label>
              </div>
            </div>
          </div>
        </div>
        <div class="col-12">
          <button
            @click="sendCreateService"
            class="btn btn-primary mt-4 mb-4 mb-md-0 btnBlock btnConfirm fixed-button col-12 col-md-7 float-left"
          >
            เพิ่ม
          </button>
        </div>
      </div>
    </div>
    <VclFacebook v-if="loading" class="mt-3" />
    <div class="mt-3 text-left font-weight-bold">
      <div class="mb-3" style="margin-top: 32px">
        <span>ส่วนที่ 1 : เลือกบริการ</span>
      </div>
      <div class="row div-card">
        <div
          class="col-12"
          style="padding-left: 40px; padding-right: 40px"
          v-for="(item, index) in dataFetch.dataService"
          :key="index"
        >
          <p style="margin-top:33px;">{{ item.location_name }}</p>
          <div class="row">
            <div
              class="col-12 col-md-3"
              v-for="(service, index) in item.service"
              :key="index"
            >
              <div>
                <div
                  @click="
                    changeCardColor(
                      service.type_id,
                      service.type_name,
                      item.location_name
                    )
                  "
                  :class="[
                    'col-12 mt-2 pt-4 pb-3 pl-4 text-center text-white',
                    colorCard == service.type_id
                      ? 'div-card-click'
                      : 'div-card-unclick',
                  ]"
                >
                  <h6 class="text-white font-weight-bold">{{ service.type_name }}</h6>
                </div>
              </div>
            </div>
            <div class="col-12 m-3" v-show="item.service.length == 0">
              <div class="alert p-3 alert-warning">ไม่พบบริการในสถานที่นี้</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-show="selectedService != ''" class="mt-3 text-left font-weight-bold">
      <div class="mb-3" style="margin-top: 32px">
        <span>ส่วนที่ 2 : เพิ่มรายละเอียดบริการ</span>
      </div>
      <div class="row div-card" style="padding-top: 50px; padding-bottom: 50px">
        <div class="col-12 ml-5">
          <span style="font-size: 20px">บริการ : {{ selectedService }}</span>
        </div>
        <div class="col-12">
          <div class="row pl-5 pr-5 p-2">
            <div class="col-12 pl-md-5 pr-md-5 mt-3">
              <div class="row">
                <div class="col-12 col-md-6">
                  <label for="InputDay">เพิ่มวันให้บริการ</label>
                  <select
                    v-model="dataPrepareSend.worktime.day"
                    id="InputDay"
                    class="form-control"
                  >
                    <option value disabled selected>-- กรุณาเลือกวัน --</option>
                    <option value="MONDAY">วันจันทร์</option>
                    <option value="TUESDAY">วันอังคาร</option>
                    <option value="WEDNESDAY">วันพุธ</option>
                    <option value="THURSDAY">วันพฤหัสบดี</option>
                    <option value="FRIDAY">วันศุกร์</option>
                    <option value="SATURDAY">วันเสาร์</option>
                    <option value="SUNDAY">วันอาทิตย์</option>
                  </select>
                </div>
                <div class="col-12 col-md-6">
                  <label for="InputMan">ผู้ให้บริการ</label>
                  <select
                    v-if="this.$store.state.role == 'ADMIN'"
                    v-model="dataPrepareSend.worktime.account_id"
                    id="InputMan"
                    class="form-control"
                  >
                    <option value disabled selected>
                      -- กรุณาผู้ให้บริการ --
                    </option>
                    <option
                      :value="item.account_id"
                      v-for="(item, index) in dataFetch.dataEmployee"
                      :key="index"
                    >
                      {{ item.prefix }} {{ item.first_name }}
                      {{ item.last_name }}
                    </option>
                  </select>
                  <select
                    v-else-if="this.$store.state.role == 'STAFF'"
                    disabled
                    id="InputMan"
                    class="form-control"
                  >
                    <option
                      :value="
                        (dataPrepareSend.worktime.account_id =
                          dataFetch.dataEmployee[0].account_id)
                      "
                      selected
                    >
                      {{ dataFetch.dataEmployee[0].prefix }}
                      {{ dataFetch.dataEmployee[0].first_name }}
                      {{ dataFetch.dataEmployee[0].last_name }}
                    </option>
                  </select>
                </div>
                <div class="col-12 col-md-6 mt-2">
                  <label for="InputStartTime">เวลาเริ่มบริการ</label>
                  <input
                    v-model="dataPrepareSend.worktime.start_time"
                    class="form-control"
                    type="time"
                    id="InputStartTime"
                  />
                </div>
                <div class="col-12 col-md-6 mt-2">
                  <label for="InputEndTime">เวลาเลิกบริการ</label>
                  <input
                    v-model="dataPrepareSend.worktime.end_time"
                    class="form-control"
                    type="time"
                    id="InputEndTime"
                  />
                </div>
                <div class="col-12 col-md-6 mt-2">
                  <label for="Input1Slot">เวลาให้บริการต่อ 1 slot</label>
                  <select
                    v-model="dataPrepareSend.worktime.time_slot"
                    id="Input1Slot"
                    class="form-control"
                  >
                    <option value disabled selected>
                      -- กรุณาเลือกเวลา --
                    </option>
                    <option value="15">15 นาที</option>
                    <option value="30">30 นาที</option>
                    <option value="45">45 นาที</option>
                    <option value="60">1 ชั่วโมง</option>
                    <option value="75">1 ชั่วโมง 15 นาที</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="col-12 text-center mt-4">
        <button
          @click="sendWorktime"
          class="btn btn-primary btnBlock btnConfirm fixed-button text-center"
        >
          บันทึก
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { errorSWAL } from "@/utility/swal.js";
import ServiceTypeBox from "@/components/ServiceTypeBox.vue";
import manHome from "@/components/svg/manHome.vue";
import VclFacebook from "vue-content-loading";

export default {
  data() {
    return {
      loading: false,
      colorCard: "",
      selectedService: "",
      dataFetch: {
        dataLocation: [],
        dataService: [],
        dataEmployee: [],
      },
      dataPrepareSend: {
        serviceName: "",
        location_id: "",
        worktime: {
          type_id: "",
          day: "",
          account_id: "",
          start_time: "",
          end_time: "",
          time_slot: "",
        },
      },
    };
  },
  components: {
    ServiceTypeBox,
    manHome,
    VclFacebook,
  },
  methods: {
    changeCardColor(type_id, type_name, location_name) {
      this.colorCard = type_id;
      this.dataPrepareSend.worktime.type_id = type_id;
      this.selectedService = type_name + " (" + location_name + ")";
    },
    async getEmployee() {
      await axios
        .get(`${process.env.VUE_APP_BACKEND_URL}/getemployee`, {
          headers: {
            Authorization: `Bearer ${this.$store.state.token}`,
          },
        })
        .then((res) => {
          this.dataFetch.dataEmployee = res.data;
        });
    },
    async getService() {
      await axios
        .get(`${process.env.VUE_APP_BACKEND_URL}/getservice`, {
          headers: {
            Authorization: `Bearer ${this.$store.state.token}`,
          },
        })
        .then((res) => {
          this.dataFetch.dataService = res.data;
        });
    },
    async sendCreateService() {
      if (
        this.dataPrepareSend.serviceName != "" &&
        this.dataPrepareSend.location_id != ""
      ) {
        await axios
          .post(
            `${process.env.VUE_APP_BACKEND_URL}/addservice`,
            {
              service_name: this.dataPrepareSend.serviceName,
              location_id: this.dataPrepareSend.location_id,
            },
            {
              headers: {
                Authorization: `Bearer ${this.$store.state.token}`,
              },
            }
          )
          .then((res) => {
            if (res.status == 201) {
              this.dataPrepareSend.serviceName = "";
              this.dataPrepareSend.location_id = "";
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
                title: "สร้างบริการสำเร็จ",
              });
              this.getService();
            } else {
              console.log("===== Backend-error ======");
              console.error(res.data);
              this.$swal({
                icon: "warning",
                title: "คำเตือน",
                text: res.data,
              });
            }
          })
          .catch((res) => {
            console.log("===== Backend-error ======");
            console.error(res);
            this.$swal({ ...errorSWAL });
          });
      } else {
        this.$swal({
          icon: "warning",
          title: "คำเตือน",
          text: "กรุณากรอกข้อมูลให้ครบ",
        });
      }
    },
    async sendWorktime() {
      if (
        this.dataPrepareSend.worktime.type_id != "" &&
        this.dataPrepareSend.worktime.day != "" &&
        this.dataPrepareSend.worktime.account_id != "" &&
        this.dataPrepareSend.worktime.start_time != "" &&
        this.dataPrepareSend.worktime.end_time != "" &&
        this.dataPrepareSend.worktime.time_slot != ""
      ) {
        if (
          this.dataPrepareSend.worktime.end_time >
          this.dataPrepareSend.worktime.start_time
        ) {
          await axios
            .post(
              `${process.env.VUE_APP_BACKEND_URL}/addworktime`,
              {
                type_id: this.dataPrepareSend.worktime.type_id,
                day: this.dataPrepareSend.worktime.day,
                account_id: this.dataPrepareSend.worktime.account_id,
                start_time: this.dataPrepareSend.worktime.start_time + ":00",
                end_time: this.dataPrepareSend.worktime.end_time + ":00",
                time_slot: this.dataPrepareSend.worktime.time_slot,
              },
              {
                headers: {
                  Authorization: `Bearer ${this.$store.state.token}`,
                },
              }
            )
            .then((res) => {
              if (res.status == 201) {
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
                  title: "เพิ่มบริการสำเร็จ",
                });

                this.dataPrepareSend.worktime.day = "";
                this.dataPrepareSend.worktime.account_id = "";
                this.dataPrepareSend.worktime.start_time = "";
                this.dataPrepareSend.worktime.end_time = "";
                this.dataPrepareSend.worktime.time_slot = "";
              } else {
                console.log("===== Backend-error ======");
                console.error(res.data);
                this.$swal({
                  icon: "warning",
                  title: "คำเตือน",
                  text: res.data,
                });
              }
            })
            .catch((res) => {
              console.log("===== Backend-error ======");
              console.error(res);
              this.$swal({ ...errorSWAL });
            });
        } else {
          this.$swal({
            icon: "warning",
            title: "คำเตือน",
            text: "กรุณาตรวจสอบเวลาเริ่มบริการ",
          });
        }
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
    this.getEmployee();
  },
};
</script>

<style></style>

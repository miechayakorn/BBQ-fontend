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
                  v-for="(data, index) in dataFetch.dataServiceLocation"
                  :key="index"
                  :value="data.type_id"
                >{{ data.type_name }}</option>
              </select>
            </div>
          </div>
          <div class="col-12">
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
          <div class="col-12 mt-4 mb-4">
            <button
              @click="fetchWorkTime"
              class="btn btn-primary btnBlock btnConfirm fixed-button col-12 col-md-6 float-left"
            >ตกลง</button>
          </div>
        </div>
      </div>
    </div>
    <VclFacebook v-if="loading" class="mt-3" />
    <div class="mt-3 text-left font-weight-bold">
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
                  @click="changeCardColor('card1')"
                  :class="[
                'col-12 mt-2 pt-4 pb-3 pl-4 text-left text-white',
                colorCard == 'card1' ? 'div-card-click' : 'div-card-unclick'
              ]"
                >
                  <div class="row">
                    <div class="col-10 align-self-center">
                      <h6 class="font-weight-bold">วันอังคาร</h6>
                    </div>
                    <div class="col-2">
                      <iconArrow :color="colorCard == 'card1' ? 'white' : '#E9EBFB'" />
                    </div>
                  </div>
                </div>
                <div
                  @click="changeCardColor('card2')"
                  :class="[
                'col-12 mt-2 pt-4 pb-3 pl-4 text-left text-white',
                colorCard == 'card2' ? 'div-card-click' : 'div-card-unclick'
              ]"
                >
                  <div class="row">
                    <div class="col-10 align-self-center">
                      <h6 class="font-weight-bold">วันพุธ</h6>
                    </div>
                    <div class="col-2">
                      <iconArrow :color="colorCard == 'card2' ? 'white' : '#E9EBFB'" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-12 col-md-8 pt-4 pb-3 pl-5 pr-5 div-card">
          <div class="float-right">
            <toggle-button
              class="mr-2"
              :width="45"
              :height="25"
              :font-size="14"
              value
              color="#99a3ff"
              @change="statusService(time,$event.value)"
            />
            <button @click="deleteBooking()" type="button" class="btn">
              <i class="fas fa-trash fa-lg" style="color: #e34724;"></i>
            </button>
          </div>
          <h6 class="text-left">
            <span class="font-weight-bold">วันอังคาร&nbsp;:&nbsp;</span>นายแพทย์ชยากร มโนธรรมปกรณ์
          </h6>
          <h6 class="text-left">
            <span class="font-weight-bold">บริการ&nbsp;:&nbsp;</span>ฝังเข็ม
          </h6>
          <div class="row mt-5">
            <div class="col-6 form-group text-left mt-2">
              <label for="InputStartTime">เวลาเริ่มบริการ</label>
              <input
                type="time"
                id="InputStartTime"
                class="form-control"
                v-model="dataPrepareSend.service.startTime"
              />
            </div>
            <div class="col-6 form-group text-left mt-2">
              <label for="InputEndTime">เวลาเลิกบริการ</label>
              <input
                type="time"
                id="InputEndTime"
                class="form-control"
                v-model="dataPrepareSend.service.endTime"
              />
            </div>
            <div class="col-6 form-group text-left mt-2">
              <label for="InputEndTime">เวลาให้บริการต่อ 1 slot</label>
              <div class="col-12">
                <div class="form-check form-check-inline">
                  <input
                    class="form-check-input"
                    type="radio"
                    name="inlineRadioOptions"
                    id="inlineRadio1"
                    value="option1"
                  />
                  <label class="form-check-label" for="inlineRadio1">30 นาที</label>
                </div>
                <div class="form-check form-check-inline">
                  <input
                    class="form-check-input"
                    type="radio"
                    name="inlineRadioOptions"
                    id="inlineRadio2"
                    value="option2"
                  />
                  <label class="form-check-label" for="inlineRadio2">60 นาที</label>
                </div>
              </div>
            </div>
          </div>
          <div class="col-12 text-center">
            <button
              @click="sendTimeServiceToBackend"
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
      colorCard: "",
      location_id: 1,
      type_id: "",
      responsibleMan: "",
      dataFetch: {
        dataLocation: [],
        dataService: [],
        dataServiceLocation: [],
        dataEmployee: [],
      },
      dataPrepareSend: {
        service: {
          day: "",
          startTime: "",
          endTime: "",
          docter: "",
          slot: "",
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
        this.dataFetch.dataService.forEach((item) => {
          if (item.location_id == val) {
            this.dataFetch.dataServiceLocation = item.service;
          }
        });
      },
    },
    type_id: {
      handler: async function (val, oldCal) {
        console.log("axios get staff");
        this.getEmployee(val);
      },
    },
  },
  methods: {
    statusService() {},
    changeCardColor(nameCard) {
      this.colorCard = nameCard;
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
          this.dataFetch.dataServiceLocation = this.dataFetch.dataService[0].service;
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

    async fetchWorkTime() {
      if (this.type_id == "" && this.responsibleMan == "") {
        this.loading = true;
        try {
          await axios
            .post(
              `${process.env.VUE_APP_BACKEND_URL}/editservice/getworktimes`,
              {
                type_id: this.type_id,
                date: this.responsibleMan,
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
                  text: "ไม่มีวันในบริการที่คุณเลือก",
                });
              } else if (res.status == 200) {
                
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
    async sendTimeServiceToBackend() {
      console.log("sendTimeServiceToBackend");
      //Send DATA
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

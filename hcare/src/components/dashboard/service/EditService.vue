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
          <div class="col-12 col-md-12">
            <div class="form-group text-left" style="margin-top:48px;">
              <label for="serviceType">เลือกบริการ</label>
              <select
                id="serviceType"
                class="form-control col-12 col-md-6"
                v-model="dataPrepareSend.type_id"
              >
                <option value disabled selected>-- กรุณาเลือกบริการ --</option>
                <option
                  v-for="(data, index) in dataFetch.dataTypes"
                  :key="index"
                  :value="data.type_id"
                >{{ data.type_name }}</option>
              </select>
            </div>
          </div>
          <div class="col-12 mt-4 mb-4">
            <button
              @click="sendToBackend"
              class="btn btn-primary btnBlock btnConfirm fixed-button col-12 col-md-6 float-left"
            >ตกลง</button>
          </div>
        </div>
      </div>
    </div>
    <VclFacebook v-if="loading" class="mt-3" />
    <div class="mt-3 text-left font-weight-bold">
      <div class="mb-3" style="margin-top:32px">
        <span>ส่วนที่ 2 : เลือกวันให้บริการ</span>
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
                <div
                  @click="changeCardColor('card3')"
                  :class="[
                'col-12 mt-2 pt-4 pb-3 pl-4 text-left text-white',
                colorCard == 'card3' ? 'div-card-click' : 'div-card-unclick'
              ]"
                >
                  <div class="row">
                    <div class="col-10 align-self-center">
                      <h6 class="font-weight-bold">วันพุธ</h6>
                    </div>
                    <div class="col-2">
                      <iconArrow :color="colorCard == 'card3' ? 'white' : '#E9EBFB'" />
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
              @click="sendToBackend"
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
import ServiceTypeBox from "@/components/ServiceTypeBox.vue";
import manHome from "@/components/svg/manHome.vue";
import iconArrow from "@/components/svg/icon/iconArrow.vue";
import VclFacebook from "vue-content-loading";
import doctor3 from "@/components/svg/doctor3.vue";

export default {
  data() {
    return {
      loading: false,
      colorCard: "card1",
      dataFetch: {
        dataTypes: null,
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
  methods: {
    sendToBackend() {},
    statusService() {},
    changeCardColor(nameCard) {
      console.log(nameCard);
      this.colorCard = nameCard;
    },
    async fetchService(serviceDataType) {
      serviceDataType.type_id;
      // await axios
      //   .get(
      //     `${process.env.VUE_APP_BACKEND_URL}/ServiceDate/${serviceDataType.type_id}`,
      //     {
      //       headers: { Authorization: `Bearer ${this.$store.state.token}` }
      //     }
      //   )
      //   .then(res => {
      //     this.dataFetch.dataDates = res.data;
      //     console.log(this.dataFetch.dataDates);
      //   });
    },
    async fetchTimeSlot() {},
    async sendServiceToBackend() {
      console.log("sendServiceToBackend");
      //Send DATA
    },
    async sendTimeServiceToBackend() {
      console.log("sendTimeServiceToBackend");
      //Send DATA
    },
  },
  async mounted() {
    //เรียกข้อมูล Default
    //Type
    await axios
      .get(`${process.env.VUE_APP_BACKEND_URL}/ServiceTypes`, {
        headers: { Authorization: `Bearer ${this.$store.state.token}` },
      })
      .then((res) => {
        this.dataFetch.dataTypes = res.data;
      });
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

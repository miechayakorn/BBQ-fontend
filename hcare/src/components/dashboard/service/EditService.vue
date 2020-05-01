<template>
  <div>
    <div class="container mt-3 div-card">
      <div class="row p-3 pt-4">
        <div class="col-12">
          <h6 class="text-left">เลือกบริการ</h6>
          <ServiceTypeBox :dataTypes="dataFetch.dataTypes" v-on:serviceDataType="fetchService" />
        </div>
      </div>
    </div>
    <div class="container mb-5">
      <div class="row p-3 pt-4 bg-light">
        <div class="col-12">
          <h6 class="text-left">จิตแพทย์</h6>
        </div>
      </div>
      <div class="row">
        <div class="col-4 mr-5">
          <div class="row">
            <div
              @click="changeCardColor('card1')"
              :class="[
                'col-12 mt-2 pt-4 pb-3 pl-4 text-left',
                colorCard == 'card1' ? 'div-card-click' : 'div-card-unclick'
              ]"
            >
              <div class="row">
                <div class="col-9">
                  <h6 class="font-weight-bold">วันอังคาร</h6>
                  <p>นายแพทย์ยักษ์ใหญ่ ไล่ยักษ์เล็ก</p>
                </div>
                <div class="col-3">
                  <iconArrow :color="colorCard == 'card1' ? 'white' : '#E9EBFB'" />
                </div>
              </div>
            </div>
            <div
              @click="changeCardColor('card2')"
              :class="[
                'col-12 mt-2 pt-4 pb-3 pl-4 text-left',
                colorCard == 'card2' ? 'div-card-click' : 'div-card-unclick'
              ]"
            >
              <div class="row">
                <div class="col-9">
                  <h6 class="font-weight-bold">วันพุธ</h6>
                  <p>นายแพทย์ยักษ์ใหญ่ ไล่ยักษ์เล็ก</p>
                </div>
                <div class="col-3">
                  <iconArrow :color="colorCard == 'card2' ? 'white' : '#E9EBFB'" />
                </div>
              </div>
            </div>
            <div
              @click="changeCardColor('card3')"
              :class="[
                'col-12 mt-2 pt-4 pb-3 pl-4 text-left',
                colorCard == 'card3' ? 'div-card-click' : 'div-card-unclick'
              ]"
            >
              <div class="row">
                <div class="col-9">
                  <h6 class="font-weight-bold">วันศุกร์</h6>
                  <p>นายแพทย์ยักษ์ใหญ่ ไล่ยักษ์เล็ก</p>
                </div>
                <div class="col-3">
                  <iconArrow :color="colorCard == 'card3' ? 'white' : '#E9EBFB'" />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-7 pt-4 pb-3 pl-5 pr-5 div-card">
          <div class="float-right">
            <button @click="deleteBooking()" type="button" class="btn">
              <i class="fas fa-trash" style="color: #e34724;"></i>
            </button>
          </div>
          <h6 class="text-left font-weight-bold">รายละเอียดเวลาการให้บริการ</h6>
          <div class="row">
            <div class="col-12 form-group text-left mt-2">
              <label for="InputDay">วัน</label>
              <select id="InputDay" v-model="dataPrepareSend.service.day" class="form-control">
                <option value disabled selected>-- กรุณาเลือกวันที่ --</option>
                <option value="MONDAY">วันจันทร์</option>
                <option value="TUESDAY">วันอังคาร</option>
                <option value="WEDNESDAY">วันพุธ</option>
                <option value="THURSDAY">วันพฤหัสบดี</option>
                <option value="FRIDAY">วันศุกร์</option>
                <option value="SATURDAY">วันเสาร์</option>
                <option value="SUNDAY">วันอาทิตย์</option>
              </select>
              <!--<input
                type="date"
                id="InputDay"
                class="form-control"
                v-model="dataPrepareSend.service.day"
              />-->
            </div>
            <div class="col-6 form-group text-left mt-2">
              <label for="InputStartTime">เวลาเริ่มบริการ</label>
              <input
                type="text"
                id="InputStartTime"
                class="form-control"
                v-model="dataPrepareSend.service.startTime"
              />
            </div>
            <div class="col-6 form-group text-left mt-2">
              <label for="InputEndTime">เวลาเลิกบริการ</label>
              <input
                type="text"
                id="InputEndTime"
                class="form-control"
                v-model="dataPrepareSend.service.endTime"
              />
            </div>
            <div class="col-6 form-group text-left mt-2">
              <label for="InputSlot">เวลาให้บริการต่อ 1 slot</label>
              <input
                type="text"
                id="InputSlot"
                class="form-control"
                v-model="dataPrepareSend.service.slot"
              />
            </div>
            <div class="col-6 form-group text-left mt-2">
              <label for="InputDocter">แพทย์ผู้รับผิดชอบ</label>
              <input
                type="text"
                id="InputDocter"
                class="form-control"
                v-model="dataPrepareSend.service.docter"
              />
            </div>
            <div class="col-12">
              <button @click="sendTimeServiceToBackend" class="btn text-primary">ยืนยันการแก้ไข</button>
            </div>
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

export default {
  data() {
    return {
      colorCard: "card1",
      dataFetch: {
        dataTypes: null
      },
      dataPrepareSend: {
        service: {
          day: "",
          startTime: "",
          endTime: "",
          docter: "",
          slot: ""
        }
      }
    };
  },
  components: {
    ServiceTypeBox,
    manHome,
    iconArrow
  },
  methods: {
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
    }
  },
  async mounted() {
    //เรียกข้อมูล Default
    //Type
    await axios
      .get(`${process.env.VUE_APP_BACKEND_URL}/ServiceTypes`, {
        headers: { Authorization: `Bearer ${this.$store.state.token}` }
      })
      .then(res => {
        this.dataFetch.dataTypes = res.data;
      });
  }
};
</script>

<style scoped>
.div-card-unclick {
  background-color: #ffffff;
  box-shadow: 0px 4px 8px #e9ebfb;
  cursor: pointer;
}
.div-card-click {
  background-color: #e9ebfb;
  box-shadow: 0px 4px 8px #e9ebfb;
  cursor: pointer;
}
</style>

<template>
  <div>
    <div class="container mt-3 div-card">
      <div class="row p-3 pt-4 bg-light">
        <div class="col-12">
          <h6 class="text-left">เพิ่มบริการใหม่ในระบบ</h6>
        </div>
      </div>
      <div class="row p-3 pt-4">
        <div class="col-3">
          <manHome />
        </div>
        <div class="col-9">
          <p class="mt-4">ชื่อบริการ</p>
          <input class="form-control col-5 mx-auto" />
          <button @click="sendServiceToBackend" class="btn text-primary">
            ยืนยัน
          </button>
        </div>
      </div>
    </div>
    <div class="container mt-3 div-card">
      <div class="row p-3 pt-4 bg-light">
        <div class="col-12">
          <h6 class="text-left">แก้ไขรายละเอียดบริการ</h6>
        </div>
      </div>
      <div class="row p-3 pt-4">
        <div class="col-12">
          <h6 class="text-left">เลือกบริการ</h6>
          <ServiceTypeBox
            :dataTypes="dataFetch.dataTypes"
            v-on:serviceDataType="fetchDate"
          />
        </div>
      </div>
    </div>
    <div class="container mb-5">
      <div class="row pt-4">
        <div class="col-4 pt-4 pb-3 pl-5 pr-5 div-card">
          <h6>รายละเอียดเวลาการให้บริการ</h6>
          <div class="form-group text-left mt-2">
            <label for="InputDay">วัน</label>
            <input
              type="date"
              id="InputDay"
              class="form-control"
              v-model="dataPrepareSend.service.day"
            />
          </div>
          <div class="form-group text-left mt-2">
            <label for="InputStartTime">เวลาเริ่มบริการ</label>
            <input
              type="text"
              id="InputStartTime"
              class="form-control"
              v-model="dataPrepareSend.service.startTime"
            />
          </div>
          <div class="form-group text-left mt-2">
            <label for="InputEndTime">เวลาเลิกบริการ</label>
            <input
              type="text"
              id="InputEndTime"
              class="form-control"
              v-model="dataPrepareSend.service.endTime"
            />
          </div>
          <div class="form-group text-left mt-2">
            <label for="InputDocter">แพทย์ผู้รับผิดชอบ</label>
            <input
              type="text"
              id="InputDocter"
              class="form-control"
              v-model="dataPrepareSend.service.docter"
            />
          </div>
          <div class="form-group text-left mt-2">
            <label for="InputSlot">เวลาให้บริการต่อ 1 slot</label>
            <input
              type="text"
              id="InputSlot"
              class="form-control"
              v-model="dataPrepareSend.service.slot"
            />
          </div>
          <button @click="sendTimeServiceToBackend" class="btn text-primary">
            ยืนยันข้อมูล
          </button>
        </div>
        <div class="col-8 pt-4 pb-3 pl-5 pr-5 div-card">
          <h6 class="text-left">จิตแพทย์</h6>
          <div class="row">
            <div class="col-12 mt-5 text-left">
              <p class="font-weight-bold">วันอังคาร</p>
              <div class="mt-3">
                <table class="table table-borderless">
                  <tbody>
                    <tr>
                      <td>เวลาเริ่มบริการ</td>
                      <td>8:30</td>
                      <td>AM</td>
                    </tr>
                    <tr>
                      <td>เวลาเลิกบริการ</td>
                      <td>16:30</td>
                      <td>PM</td>
                    </tr>
                    <tr>
                      <td>ช่วงในการให้บริการ</td>
                      <td>60</td>
                      <td>นาที</td>
                    </tr>
                  </tbody>
                </table>
                <p>นายแพทย์ยักษ์ใหญ่ ไล่ยักษ์เล็ก</p>
              </div>
            </div>
            <div class="col-12 mt-5 text-left">
              <p class="font-weight-bold">วันพุธ</p>
              <div class="mt-3">
                <table class="table table-borderless">
                  <tbody>
                    <tr>
                      <td>เวลาเริ่มบริการ</td>
                      <td>8:30</td>
                      <td>AM</td>
                    </tr>
                    <tr>
                      <td>เวลาเลิกบริการ</td>
                      <td>16:30</td>
                      <td>PM</td>
                    </tr>
                    <tr>
                      <td>ช่วงในการให้บริการ</td>
                      <td>60</td>
                      <td>นาที</td>
                    </tr>
                  </tbody>
                </table>
                <p>นายแพทย์ยักษ์ใหญ่ ไล่ยักษ์เล็ก</p>
              </div>
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

export default {
  data() {
    return {
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
        },
        type_id: 1,
        date: null
      }
    };
  },
  components: {
    ServiceTypeBox,
    manHome
  },
  methods: {
    async fetchDate(serviceDataType) {
      this.dataPrepareSend.type_id = serviceDataType.type_id;
      await axios
        .get(
          `${process.env.VUE_APP_BACKEND_URL}/ServiceDate/${serviceDataType.type_id}`,
          {
            headers: { Authorization: `Bearer ${this.$store.state.token}` }
          }
        )
        .then(res => {
          this.dataFetch.dataDates = res.data;
          console.log(this.dataFetch.dataDates);
        });
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

<style></style>

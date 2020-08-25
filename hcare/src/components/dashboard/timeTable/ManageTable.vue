<template>
  <div>
    <div class="container mt-3 div-card">
      <div class="row p-3 pt-4">
        <div class="col-12">
          <h6 class="text-left">ส่วนที่ 1 : เลือกบริการ</h6>
          <ServiceTypeBox
            :dataTypes="dataFetch.dataTypes"
            v-on:serviceDataType="fetchDate"
          />
        </div>
      </div>
    </div>
    <div class="container mt-3 div-card">
      <div class="row p-3 pt-4">
        <div class="col-12 col-md-8">
          <h6 class="text-left">ส่วนที่ 2 : เลือกวันที่ให้บริการ</h6>
          <input
            type="text"
            id="InputDay"
            class="form-control col-12 col-lg-6 text-center mx-auto mt-4"
            placeholder="กรุณาเลือกวัน"
            v-model="dataPrepareSend.date"
            onfocus="(this.type='date')"
          />
          <button
            @click="fetchTimeSlot"
            class="btn btnType-sm text-primary mt-4"
          >
            <span class="p-3">ตกลง</span>
          </button>
        </div>
        <div class="col-12 col-md-4">
          <groupDocter class="d-none d-md-block" />
        </div>
      </div>
    </div>
    <div class="container mt-3 div-card">
      <div class="row p-3 pt-4">
        <div class="col-12">
          <h6 class="text-left">ส่วนที่ 2 : เลือกวันที่ให้บริการ</h6>
            <button
              @click="fetchTimeSlot"
              class="btn btnType-sm text-primary mr-1 mb-1"
            >
              <span class="p-1">8.30</span>
            </button>
            <button
              @click="fetchTimeSlot"
              class="btn btnType-sm text-primary mr-1 mb-1"
            >
              <span class="p-1">8.30</span>
            </button><button
              @click="fetchTimeSlot"
              class="btn btnType-sm text-primary mr-1 mb-1"
            >
              <span class="p-1">8.30</span>
            </button>
        </div>
        <div class="col-12">
          <button
            @click="sendToBackend"
            class="btn btn-primary btnBlock btnConfirm mt-5 fixed-button mb-2"
          >
            <span style="font-weight:900">บันทึก</span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import ServiceTypeBox from "@/components/ServiceTypeBox.vue";
import groupDocter from "@/components/svg/groupDocter.vue";

export default {
  data() {
    return {
      dataFetch: {
        dataTypes: null
      },
      dataPrepareSend: {
        type_id: 1,
        date: null
      }
    };
  },
  components: {
    ServiceTypeBox,
    groupDocter
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
    async fetchTimeSlot() {
      this.dataPrepareSend;
    },
    async sendToBackend() {
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

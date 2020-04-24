<template>
  <div class="container mt-3 bg-white">
    <div class="row p-3 pt-4">
      <div class="col-12">
        <h6 class="text-left">บริการ</h6>
        <ServiceTypeBox
          :dataTypes="dataFetch.dataTypes"
          v-on:serviceDataType="fetchDate"
        />
      </div>
      <div class="col-12 mt-3">
        <h6 class="text-left">วันที่</h6>
        <ServiceDateBox
          :dataDates="dataFetch.dataDates"
          v-on:selectedDate="fetchTime"
        />
      </div>
      <div class="col-12 mt-3">
        <h6 class="text-left">นัดหมายแพทย์ทั้งหมด</h6>
        <div class="row mt-6">
          <DashboardTable :dataBookingTable="userBookings" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import ServiceTypeBox from "@/components/ServiceTypeBox.vue";
import ServiceDateBox from "@/components/ServiceDateBox.vue";
import DashboardTable from "@/components/DashboardTable.vue";

export default {
  data() {
    return {
      dataFetch: {
        dataTypes: null,
        dataDates: null,
        dataTimes: null
      },
      userBookings: [],
      dataPrepareSend: {
        type_id: 1,
        date: null
      },
      dataShow: {
        type: "จิตแพทย์",
        date: "",
        time: null,
        activeBtnTime: "",
        disableSymptom: true,
        oldTypeService: 1
      }
    };
  },
  components: {
    ServiceTypeBox,
    ServiceDateBox,
    DashboardTable
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
    //Date
    await axios
      .get(`${process.env.VUE_APP_BACKEND_URL}/ServiceDate/1`, {
        headers: { Authorization: `Bearer ${this.$store.state.token}` }
      })
      .then(res => {
        this.dataFetch.dataDates = res.data;
      });
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

    async fetchTime(selectedDate) {
      this.dataPrepareSend.date = selectedDate.datevalue;
      this.sendToBackend();
    },

    async sendToBackend() {
      console.log(process.env.VUE_APP_BACKEND_URL);
      await axios
        .get(
          `${process.env.VUE_APP_BACKEND_URL}/showbooking/${this.dataPrepareSend.type_id}/${this.dataPrepareSend.date}`,
          {
            headers: { Authorization: `Bearer ${this.$store.state.token}` }
          }
        )
        .then(res => {
          console.log(res.data);
          this.userBookings = res.data;
        })
        .catch(error => {
          console.log("===== Backend-error ======");
          console.error(error.response);
        });
    }
  }
};
</script>

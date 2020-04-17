<template>
  <div class="d-flex" id="wrapper">
    <!-- Sidebar -->
    <div
      class=" border-right bg-primary col-md-1"
      id="navbarCollapseMenu-toggle"
    >
      <div class="sidebar-heading">
        <img
          src="https://www.w3schools.com/bootstrap4/paris.jpg"
          style="margin-top:24px; width: 56px; height: 56px;"
          class="rounded-circle mb-3"
        />
      </div>
      <div class="list-group menu">
        <router-link to="#" class="p-2 bg-primary">
          <iconAppointment />
          <p class="menu-list">นัดหมาย</p>
        </router-link>
        <a href="#" class="p-2 bg-primary">
          <iconTimeTable />
          <p class="menu-list">ตารางเวลา</p>
        </a>
        <a href="#" class="p-2 bg-primary">
          <iconQueue />
          <p class="menu-list">คิว</p>
        </a>
        <div class="list-group">
          <a href="#" class="p-2 bg-primary" style="margin-top:300px">
            <iconSetting />
          </a>
          <a href="#" class="p-2 bg-primary" style="margin-bottom:75px">
            <iconLogout />
          </a>
        </div>
      </div>
    </div>
    <div class="border-right bg-white col-md-3" id="navbarCollapseMenu-toggle">
      <h5 class="qText" style="margin-top: 22px;">คิวปัจจุบัน</h5>
      <span class="current-queue-text textBold">A 0001</span>
      <br />
      <br />
      <h5 class="qText" style="margin-top: 22px;">คิวถัดไป</h5>
      <ul class="queue-list-next">
        <li>
          <span class="queue-text textBold">A 0002</span>
        </li>
        <li>
          <span class="queue-text textBold">A 0003</span>
        </li>
        <li>
          <span class="queue-text textBold">A 0004</span>
        </li>
      </ul>
    </div>
    <!-- /#sidebar-wrapper -->

    <!-- Page Content -->
    <div class="container" id="page-content-wrapper">
      <nav class="navbar navbar-expand-lg navbar-light bg-light border-bottom">
        <button
          class="btn btn-primary"
          data-toggle="collapse"
          data-target="#navbarCollapseMenu-toggle"
          id="menu-toggle"
        >
          <span><</span>
        </button>
      </nav>
      <div class="container mt-3 ml-2">
        <div class="row">
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
            <button
              @click="sendToBackend"
              class="btn btn-primary mt-3 px-md-4 py-md-2"
            >
              ค้นหา
            </button>
          </div>
          <div class="col-12 mt-3">
            <h6 class="text-left">นัดหมายแพทย์ทั้งหมด</h6>
            <div class="row mt-6">
              <DashboardTable :dataBookingTable="userBookings" />
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- /#page-content-wrapper -->
  </div>
</template>

<script>
import axios from "axios";
import ServiceTypeBox from "@/components/ServiceTypeBox.vue";
import ServiceDateBox from "@/components/ServiceDateBox.vue";
import SideandNavbar from "@/components/SideandNavbar.vue";
import DashboardTable from "@/components/DashboardTable.vue";
import iconAppointment from "@/components/svg/icon/iconAppointment.vue";
import iconTimeTable from "@/components/svg/icon/iconTimeTable.vue";
import iconQueue from "@/components/svg/icon/iconQueue.vue";
import iconSetting from "@/components/svg/icon/iconSetting.vue";
import iconLogout from "@/components/svg/icon/iconLogout.vue";

export default {
  data() {
    return {
      //ข้อมูลที่ได้จาก Backend
      dataFetch: {
        dataTypes: null,
        dataDates: null,
        dataTimes: null
      },
      dataShow: {
        type: "จิตแพทย์",
        date: "",
        time: null,
        activeBtnTime: "",
        disableSymptom: true,
        oldTypeService: 1
      },
      userBookings: [],
      dataPrepareSend: {
        type_id: 1,
        date: null
      },

      //----------------------------------------
      doctors: [0],
      messageToComponents: [
        { type_id: 1, type_name: "จิตแพทย์" },
        { type_id: 2, type_name: "จิตวิทยา" },
        { type_id: 2, type_name: "จิตวิทยา" },
        { type_id: 2, type_name: "จิตวิทยา" },
        { type_id: 2, type_name: "จิตวิทยา" },
        { type_id: 2, type_name: "จิตวิทยา" }
      ],
      dataDates: [
        {
          type_id: 1,
          date: "2020-03-13"
        },
        {
          type_id: 1,
          date: "2020-03-14"
        }
      ]
    };
  },
  async mounted() {
    //เรียกข้อมูล Default
    //Type
    await axios
      .get(`${process.env.VUE_APP_BACKEND_URL}/ServiceTypes`)
      .then(res => {
        this.dataFetch.dataTypes = res.data;
      });
    //Date
    await axios
      .get(`${process.env.VUE_APP_BACKEND_URL}/ServiceDate/1`)
      .then(res => {
        this.dataFetch.dataDates = res.data;
        // this.$swal.close();
      });

    // await axios
    //   .get(`${process.env.VUE_APP_BACKEND_URL}/showbooking/1/2020-04-27`)
    //   .then(res => {
    //     this.userBookings = res.data;
    //     this.$swal.close();
    //   });
  },
  methods: {
    async fetchDate(serviceDataType) {
      this.dataPrepareSend.type_id = serviceDataType.type_id;
      await axios
        .get(
          `${process.env.VUE_APP_BACKEND_URL}/ServiceDate/${serviceDataType.type_id}`
        )
        .then(res => {
          this.dataFetch.dataDates = res.data;
          console.log(this.dataFetch.dataDates);
          // this.dataShow.oldTypeService = serviceDataType.type_id;
          // this.$swal.close();
        });
    },

    async fetchTime(selectedDate) {
      this.dataPrepareSend.date = selectedDate.datevalue;
    },

    async sendToBackend() {
      console.log(process.env.VUE_APP_BACKEND_URL);
      await axios
        .get(
          `${process.env.VUE_APP_BACKEND_URL}/showbooking/${this.dataPrepareSend.type_id}/${this.dataPrepareSend.date}`
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
  },
  components: {
    ServiceTypeBox,
    ServiceDateBox,
    SideandNavbar,
    DashboardTable,
    iconAppointment,
    iconTimeTable,
    iconQueue,
    iconSetting,
    iconLogout
  }
};
</script>

<style scoped>
.menu-list {
  font-style: normal;
  font-weight: bold;
  font-size: 14px;
  line-height: 21px;
  color: #f9f9fc;
}
.qText {
  font-size: 18px;
  font-weight: 300;
  font-family: "Mitr";
  color: #444444;
}
.current-queue-text {
  color: #99a3ff;
  font-style: bold;
  font-size: 2em;
}
.textBold {
  font-size: 36px;
  font-weight: 900;
  font-family: "Poppins";
}
.queue-text {
  font-style: bold;
  font-size: 2em;
  color: #b6b6b6;
}
.queue-list-next {
  list-style: none;
  padding: 0;
  margin: 0;
  text-align: center;
}
.navbar-fixed-left {
  position: fixed;
  border-radius: 0;
  height: 100%;
}
.navbar-fixed-left .navbar-nav > li {
  float: none; /* Cancel default li float: left */
  width: 139px;
}

.navbar-fixed-left + .container {
  padding-left: 160px;
}
</style>

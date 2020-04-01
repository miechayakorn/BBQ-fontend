<template>
  <div class="h-100">
    <div class="row Myrow1"></div>
    <div class="row justify-content-center h-100">
      <div class="col.p-0-1 menu-background">
        <ul class="menu">
          <li :class="{ active: this.getRoutePath == '/admin/booking' }">
            <router-link to="/admin/booking">
              <i class="fas fa-calendar-check"></i>
              <br />นัดหมาย
            </router-link>
          </li>
          <li :class="{ active: this.getRoutePath == '/calendar' }">
            <router-link to="/calendar">
              <i class="fas fa-calendar-alt"></i>
              <br />ตารางเวลา
            </router-link>
          </li>
          <li :class="{ active: this.getRoutePath == '/queue' }">
            <router-link to="/queue">
              <i class="fas fa-hourglass-start"></i>
              <br />คิว
            </router-link>
          </li>
        </ul>
      </div>
      <div class="col-2 mr-4 text-center p-4 queue-bg">
        <h5 class="queueMar qText">คิวปัจจุบัน</h5>
        <span class="current-queue-text textBold">A 0001</span>
        <br />
        <br />
        <h5 class="queueMar qText">คิวถัดไป</h5>
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
      <div class="col-9 content-background p-5">
        <div class="container m-0">
          <div class="row">
            <h6>บริการ</h6>
          </div>

          <ServiceTypeBox
            :dataTypes="dataFetch.dataTypes"
            v-on:serviceDataType="fetchDate"
            @click="changeType"
          />

          <div class="row mt-4">
            <h6>วันที่</h6>
          </div>
          <div class="row mb-4">
            <ServiceDateBox :dataDates="dataFetch.dataDates" v-on:selectedDate="fetchTime" />
          </div>
          <div class="row mb-4 d-flex justify-content-center">
            <button @click="sendToBackend" class="btn btn-primary px-md-4 py-md-2">ค้นหา</button>
          </div>
          <div class="row">
            <h6>นัดหมายแพทย์ทั้งหมด</h6>
          </div>
          <div class="row mt-6">
            <table class="table table-hover list-doctor">
              <thead>
                <tr>
                  <th scope="col">วันที่</th>
                  <th scope="col">เวลา</th>
                  <th scope="col">HN number</th>
                  <th scope="col">ชื่อ</th>
                </tr>
              </thead>
              <tbody v-for="(user, index) in userBookings" :key="index">
                <tr>
                  <th scope="row">{{user.date}}</th>
                  <td>{{user.time_in}}</td>
                  <td>{{user.hn_number}}</td>
                  <td>{{user.first_name}} {{user.last_name}}</td>
                </tr>
              </tbody>
            </table>
            <DashboardTable :dataBookingTable="userBookings" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import ServiceTypeBox from "@/components/ServiceTypeBox.vue";
import ServiceDateBox from "@/components/ServiceDateBox.vue";
import SideandNavbar from "@/components/SideandNavbar.vue";
import DashboardTable from "@/components/DashboardTable.vue"

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
        type_id: null,
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
    // await axios
    //   .get(`${process.env.VUE_APP_BACKEND_URL}/ServiceDate/1`)
    //   .then(res => {
    //     this.dataFetch.dataDates = res.data;
    //     // this.$swal.close();
    //   });

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
      this.dataPrepareSend.date = selectedDate.date;
    },

    async sendToBackend() {
      await axios
        .get(
          `${process.env.VUE_APP_BACKEND_URL}/showbooking/${this.dataPrepareSend.type_id}/${this.dataPrepareSend.date}`
        )
        .then(res => {
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
    DashboardTable
  }
};
</script>

<style scoped>
@media (max-width: 776px) {
  .fixed-button {
    width: 100%;
    height: 48px;
  }
}
@media (min-width: 776px) {
  .fixed-button {
    width: 320px;
    text-align: center;
    position: relative;
    height: 48px;
  }
}
@media (min-width: 900px) {
  .fixed-container {
    width: 720px;
  }
}
.Myrow1 {
  height: 48px;
  background-color: #ccd1ff;
}

.btnTime {
  height: 48px;
  width: 72px;
}
.queueMar {
  margin-top: 22px;
}
.button {
  border-radius: 8px;
}
.btnConfirm {
  border-radius: 31px;
}
.btnDisabled {
  cursor: default;
}
.btnDisabled:active {
  outline: none;
}
.textBold {
  font-size: 36px;
  font-weight: 900;
  font-family: "Poppins";
}
.qText {
  font-size: 18px;
  font-weight: 300;
  font-family: "Mitr";
  color: #444444;
}
.tableSize {
  width: 100%;
}
/*
.btn-outline-primary,
.btn-outline-primary:active {
  color: #99a3ff;
  background-color: #ffffff;
  border: 1px solid #99a3ff;
  border-radius: 8px;
}
.btn-outline-primary:hover,
.btn-outline-primary:visited {
  color: #ffffff;
  background-color: #99a3ff;
  border: 1px solid #99a3ff;
  border-radius: 8px;
}
.btn-block {
  color: #ffffff;
  background-color: #99a3ff;
  border: 1px solid #99a3ff;
  border-radius: 31px;
}*/

html,
body {
  height: 100%;
}

.menu-background {
  padding: 0;
  background-color: #99a3ff;
  height: 800;
}

.content-background {
  background-color: #f9f9fc;
}

.menu {
  list-style: none;
  padding: 5px;
  margin-top: 40px;
  text-align: center;
  height: 940px;
}

.queue-bg {
  background-color: white;
}

.menu > li {
  color: #ffffff;
  padding: 0.5em;
  margin-bottom: 32px;
}

.menu > li.active {
  background-color: #a5bbe7;
}

.menu > li > a {
  text-decoration: none;
  color: #ffffff !important;
}

.current-queue-text {
  color: #99a3ff;
  font-style: bold;
  font-size: 2em;
}

.queue-list-next {
  list-style: none;
  padding: 0;
  margin: 0;
  text-align: center;
}

.queue-text {
  font-style: bold;
  font-size: 2em;
  color: #b6b6b6;
}

.service-menu {
  list-style: none;
  padding: 0;
  margin: 0;
  text-align: center;
}

.service-menu > li {
  float: left;
  padding: 2em;
  margin-right: 0.5em;
  border: 0.05em #99a3ff solid;
  border-radius: 0.4em;
  background-color: #ffffff;
}

.service-menu > li.active {
  background-color: #99a3ff;
  color: #ffffff;
}

.list-doctor > thead {
  background-color: #99a3ff;
  color: #ffffff;
}

.list-doctor > tbody > tr {
  background-color: #ffffff;
}
</style>

<template>
  <div class="h-100">
    <div class="row justify-content-center h-100">
      <div class="col.p-0-1 menu-background">
        <ul class="menu">
          <li :class="{ active: this.getRoutePath == '/' }">
            <router-link to="/">
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
      <div class="col-2 mr-4 text-center p-4 queue-bg ">
        <h5>คิวปัจจุบัน</h5>
        <span class="current-queue-text btnBold">A 0001</span>
        <br />
        <br />
        <h6>คิวถัดไป</h6>
        <ul class="queue-list-next">
          <li>
            <span class="queue-text">A 0002</span>
          </li>
          <li>
            <span class="queue-text">A 0003</span>
          </li>
          <li>
            <span class="queue-text">A 0004</span>
          </li>
        </ul>
      </div>
      <div class="col-9 content-background p-5">
        <div class="container m-0">
          <div>
            <div class="row">
              <h6>บริการ</h6>
            </div>
            <div class="row mb-4">
              <ul class="service-menu">
                <li class="active">
                  <i class="fas fa-user-md fa-3x"></i>
                  <br />จิตแพทย์
                </li>
                <li>
                  <i class="fas fa-user-md fa-3x"></i>
                  <br />จิตแพทย์
                </li>
                <li>
                  <i class="fas fa-user-md fa-3x"></i>
                  <br />จิตแพทย์
                </li>
              </ul>
            </div>
            <div class="row">
              <h6>วันที่</h6>
            </div>
            <div class="row mb-4">
              <input type="text" />
            </div>
            <div class="row">
              <h6>นัดหมายแพทย์ทั้งหมด</h6>
            </div>
            <div class="row">
              <table class="table list-doctor">
                <thead>
                  <tr>
                    <th scope="col">HN numbers</th>
                    <th scope="col">ชื่อ - นามสกุล</th>
                    <th scope="col">เวลาที่จอง</th>
                    <th scope="col">สถานะ</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th scope="row">1</th>
                    <td>Mark</td>
                    <td>Otto</td>
                    <td>@mdo</td>
                  </tr>
                  <tr>
                    <th scope="row">2</th>
                    <td>Jacob</td>
                    <td>Thornton</td>
                    <td>@fat</td>
                  </tr>
                  <tr>
                    <th scope="row">3</th>
                    <td>Larry</td>
                    <td>the Bird</td>
                    <td>@twitter</td>
                  </tr>
                  <tr>
                    <th scope="row">3</th>
                    <td>Larry</td>
                    <td>the Bird</td>
                    <td>@twitter</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ServiceTypeBox from "@/components/ServiceTypeBox.vue";
import ServiceDateBox from "@/components/ServiceDateBox.vue";
import SideandNavbar from "@/components/SideandNavbar.vue";

export default {
  data() {
    return {
      doctors: [
        {
          id: 1,
          hnNumber: "6011",
          name: "นายมาลี สันดี",
          time: "9.30"
        },
        {
          id: 2,
          hnNumber: "6012",
          name: "นางมา สันดี",
          time: "10.30"
        }
      ],
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
  methods: {},
  components: {
    ServiceTypeBox,
    ServiceDateBox,
    SideandNavbar
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

.btnTime {
  height: 48px;
  width: 72px;
}

button {
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
.btnBold {
  font-weight: bold;
  font-size: 36px;
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
  padding: 0;
  margin-top: 40px;
  text-align: center;
  height: 940px;
}

.queue-bg {
  background-color: white;
}
.queue-pad {
  margin-top: 40px;
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

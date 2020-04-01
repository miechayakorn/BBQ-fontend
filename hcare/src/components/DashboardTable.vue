<template>
  <div class="col-12">
    <table class="table table-hover list-doctor">
      <thead>
        <tr>
          <th scope="col">วันที่</th>
          <th scope="col">เวลา</th>
          <th scope="col">HN number</th>
          <th scope="col">ชื่อ</th>
        </tr>
      </thead>
      <tbody v-for="(user, index) in dataBookingTable" :key="index">
        <tr>
          <th scope="row">{{user.date}}</th>
          <td>{{user.time_in}}</td>
          <td>{{user.hn_number}}</td>
          <td>{{user.first_name}} {{user.last_name}}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: "DashboardTable",
  data() {
    return {};
  },
  props: {
    dataBookingTable: Array
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
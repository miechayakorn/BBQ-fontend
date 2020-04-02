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
          <th scope="row">{{ user.date }}</th>
          <td>{{ user.time_in }}</td>
          <td>{{ user.hn_number }}</td>
          <td>{{ user.first_name }} {{ user.last_name }}</td>
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

<style>
.list-doctor > thead {
  background-color: #99a3ff;
  color: #ffffff;
}

.list-doctor > tbody > tr {
  background-color: #ffffff;
}
</style>

<template>
  <div class="col-12">
    <table class="table table-hover list-doctor">
      <thead>
        <tr>
          <th scope="col">เวลา</th>
          <th scope="col">HN number</th>
          <th scope="col">ชื่อ</th>
          <th scope="col">action</th>
        </tr>
      </thead>
      <tbody v-for="(user, index) in dataBookingTable" :key="index">
        <tr>
          <td>{{ user.time_in }}</td>
          <td>{{ user.hn_number }}</td>
          <td>{{ user.first_name }} {{ user.last_name }}</td>
          <td>
            <button
              @click="editBooking(user.booking_id)"
              type="button"
              class="btn"
            >
              <i class="fas fa-pen edit" style="color: #ffc107;"></i>
            </button>
            <button
              @click="deleteBooking(user.booking_id)"
              type="button"
              class="btn"
            >
              <i class="fas fa-trash" style="color: #e34724;"></i>
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "DashboardTable",
  data() {
    return {};
  },
  methods: {
    editBooking(booking_id) {
      this.$swal({
        width: "678px",
        html:
          "เพิ่มลิงค์สำหรับการ Meeting" +
          '<input id="link-input" placeholder="ใส่ลิงค์" class="swal2-input">' +
          "บันทึกเพิ่มเติม" +
          '<textarea id="note" class="swal2-input" style="height: 122px;">',
        inputAttributes: {
          autocapitalize: "off",
        },
        showCloseButton: true,
        confirmButtonText: "ยืนยัน",
        confirmButtonColor: "#99A3FF",
        showLoaderOnConfirm: true,
        preConfirm: () => {
          let linkInput = document.getElementById("link-input").value;
          let note = document.getElementById("note").value;

          return alert(note);
        },
      });
    },
    deleteBooking(booking_id) {
      this.$swal({
        width: "678px",
        title: "ยกเลิกการจอง",
        inputAttributes: {
          autocapitalize: "off",
        },
        showCloseButton: true,
        confirmButtonText: "ยืนยัน",
        confirmButtonColor: "#99A3FF",
        showLoaderOnConfirm: true,
        preConfirm: () => {
          return alert(booking_id);
        },
      });
    },
  },
  props: {
    dataBookingTable: Array,
  },
};
</script>

<style>
.swal2-confirm {
  width: 327px;
  border-radius: 31px !important;
}
.list-doctor > thead {
  background-color: #99a3ff;
  color: #ffffff;
}

.list-doctor > tbody > tr {
  background-color: #ffffff;
}
</style>

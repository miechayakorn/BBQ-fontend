<template>
  <div class="col-12">
    <form id="search" class="d-flex justify-content-end pb-3" v-if="dataUserTable.length != 0">
      <label class="col-1 col-form-label">Search:</label>
      <input name="query" v-model="searchQuery" class="form-control col-3" />
    </form>
    <div class="col-12 mt-3 p-3 div-card" v-if="dataUserTable.length == 0">
      <h5>ไม่มีข้อมูลพนักงาน</h5>
    </div>
    <data-table
      class="table table-hover list-doctor"
      :data="dataUserTable"
      :columns-to-display="gridColumns"
      :filter-key="searchQuery"
      :columns-to-not-sort="['action']"
      v-if="dataUserTable.length != 0"
    >
      <template slot="รหัสพนักงาน" scope="props">
        <b>{{ props.entry.รหัสพนักงาน }}</b>
      </template>
      <template slot="ชื่อนามสกุล" scope="props">{{ props.entry.ชื่อนามสกุล }}</template>
      <template slot="บริการ" scope="props">{{ props.entry.บริการ }}</template>
      <template slot="action" scope="props">
        <router-link
          target="_blank"
          :to="'/admin/dashboard/manageEmployee/edit/' + props.entry.account_id"
        >
          <button type="button" class="btn">
            <i class="fas fa-pen edit" style="color: #ffc107;"></i>
          </button>
        </router-link>
        <button @click="deleteBooking(props.entry.รหัสพนักงาน)" type="button" class="btn">
          <i class="fas fa-trash" style="color: #e34724;"></i>
        </button>
      </template>
    </data-table>
  </div>
</template>

<script>
import axios from "axios";
import { errorSWAL } from "@/utility/swal.js";

export default {
  name: "DashboardTable",
  data() {
    return {
      searchQuery: "",
      gridColumns: ["รหัสพนักงาน", "ชื่อนามสกุล", "บริการ", "action"],
    };
  },

  methods: {
    editBooking(userId) {},
    deleteBooking(userId) {
      this.$swal({
        icon: "warning",
        title: "ลบบัญชีผู้ใช้งาน",
        showCloseButton: true,
        confirmButtonText: "ยืนยันการลบ",
        confirmButtonColor: "#d33",
        showLoaderOnConfirm: true,
        preConfirm: () => {
          axios
            .post(
              `${process.env.VUE_APP_BACKEND_URL}/cancel`,
              {
                userId: userId,
              },
              {
                headers: { Authorization: `Bearer ${this.$store.state.token}` },
              }
            )
            .then((res) => {
              this.$swal({
                toast: true,
                position: "top-end",
                showConfirmButton: false,
                timer: 3000,
                icon: "success",
                title: "ยกเลิกสำเร็จ",
              });
              this.$router.go();
            })
            .catch((error) => {
              console.log("===== Backend-error ======");
              console.error(error.response); //สามารถเช็ค status ได้ถา้ใช้ error.response.status
              this.$swal({ ...errorSWAL });
            });
        },
      });
    },
  },
  props: {
    dataUserTable: Array,
  },
};
</script>
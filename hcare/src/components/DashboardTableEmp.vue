<template>
  <div class="col-12">
    <form id="search" class="d-flex justify-content-end pb-3" v-if="dataUserTable.length != 0">
      <label class="col-1 col-form-label">Search:</label>
      <input name="query" v-model="searchQuery" class="form-control col-3" />
    </form>
    <div class="col-12 mt-3" v-if="dataUserTable.length == 0">
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
      <template slot="ตำแหน่ง" scope="props">{{ props.entry.ตำแหน่ง }}</template>
      <template slot="action" scope="props">
        <button
          @click="
            editBooking(
              props.entry.รหัสพนักงาน
            )
          "
          type="button"
          class="btn"
        >
          <i class="fas fa-pen edit" style="color: #ffc107;"></i>
        </button>
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
      gridColumns: ["รหัสพนักงาน", "ชื่อนามสกุล", "ตำแหน่ง", "action"],
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

<style>
.dropdown {
  cursor: pointer;
  position: relative;
  display: inline-block;
}

.dropdown-content {
  padding: 20px;
  border: 0px solid #99a3ff;
  box-shadow: 0px 4px 8px #d9d9d9;
  display: none;
  position: absolute;
  background-color: #ffffff;
  min-width: 252px;
  z-index: 1;
}

.dropdown:hover .dropdown-content {
  display: block;
}

.list-doctor > thead {
  background-color: #99a3ff;
  color: #ffffff;
}

.list-doctor > tbody > tr {
  background-color: #ffffff;
}

th:hover {
  cursor: pointer;
}

th.active .arrow.asc {
  border-bottom: 4px solid #4d4d4d;
}

th.active .arrow.dsc {
  border-top: 4px solid #4d4d4d;
}

.arrow {
  display: inline-block;
  vertical-align: middle;
  width: 0;
  height: 0;
  margin-left: 5px;
}

.arrow.asc {
  border-left: 4px solid transparent;
  border-right: 4px solid transparent;
  border-bottom: 4px solid #cdc;
}

.arrow.dsc {
  border-left: 4px solid transparent;
  border-right: 4px solid transparent;
  border-top: 4px solid #cdc;
}

.previousPage {
  position: relative;
}

.previousPage:before {
  content: "\f104";
  font-family: FontAwesome;
  position: absolute;
}

.nextPage {
  position: relative;
}

.nextPage:before {
  content: "\f105";
  font-family: FontAwesome;
  position: absolute;
  left: 5px;
}
.detail {
  font-family: Poppins;
  font-style: normal;
  font-weight: normal;
  font-size: 10px;
  line-height: 15px;
  /* identical to box height */

  display: flex;
  align-items: center;

  color: #000000;
}
</style>

<template>
  <div class="col-12">
    <form
      id="search"
      class="d-flex justify-content-end pb-3"
      v-if="dataUserTable.length != 0"
    >
      <label class="col-6 col-md-1 col-form-label">Search:</label>
      <input
        name="query"
        v-model="searchQuery"
        class="col-6 col-md-3 form-control"
      />
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
      <template slot="ชื่อนามสกุล" scope="props">{{
        props.entry.ชื่อนามสกุล
      }}</template>
      <template slot="บริการ" scope="props">{{ props.entry.บริการ }}</template>
      <template slot="action" scope="props">
        <router-link
          v-if="props.entry.รหัสพนักงาน != 1"
          target="_blank"
          :to="'/admin/dashboard/manageEmployee/edit/' + props.entry.account_id"
        >
          <button type="button" class="btn">
            <i class="fas fa-pen edit" style="color: #ffc107"></i>
          </button>
        </router-link>
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
  props: {
    dataUserTable: Array,
  },
};
</script>
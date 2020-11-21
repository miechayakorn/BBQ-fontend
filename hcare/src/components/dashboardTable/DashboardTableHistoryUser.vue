<template>
  <div class="col-12">
    <form
      id="search"
      class="d-flex justify-content-end pb-3"
      v-if="dataHistory.length != 0"
    >
      <label class="col-6 col-md-1 col-form-label">Search:</label>
      <input
        name="query"
        v-model="searchQuery"
        class="col-6 col-md-3 form-control"
      />
    </form>
    <div class="col-12 mt-3 p-3 div-card" v-if="dataHistory.length == 0">
      <h5>ไม่มีข้อมูลประวัติการเข้าใช้บริการ</h5>
    </div>
    <data-table
      class="table table-hover list-doctor"
      :data="dataHistory"
      :columns-to-display="gridColumns"
      :filter-key="searchQuery"
      :columns-to-not-sort="gridColumns"
      v-if="dataHistory.length != 0"
    >
      <template slot="วันที่นัด" scope="props">{{ props.entry.date }}</template>
      <template slot="เวลานัด" scope="props"
        >{{ props.entry.time_in.substring(0, 5) }} - {{ props.entry.time_out.substring(0, 5) }}</template
      >
      <template slot="บริการ" scope="props">{{
        props.entry.type_name
      }}</template>
      <template slot="อาการเบื้องต้น" scope="props">{{
        props.entry.symptom
      }}</template>
      <template slot="บันทึกเพิ่มเติม" scope="props">{{
        props.entry.comment_from_staff
      }}</template>
      <template slot="หมายเหตุ" scope="props"
        ><span v-if="props.entry.is_active == 0">ยกเลิกแล้ว</span></template
      >
    </data-table>
  </div>
</template>

<script>
import axios from "axios";
import { errorSWAL } from "@/utility/swal.js";

export default {
  data() {
    return {
      searchQuery: "",
      gridColumns: [
        "วันที่นัด",
        "เวลานัด",
        "บริการ",
        "อาการเบื้องต้น",
        "บันทึกเพิ่มเติม",
        "หมายเหตุ",
      ],
    };
  },

  props: {
    dataHistory: Array,
  },
};
</script>
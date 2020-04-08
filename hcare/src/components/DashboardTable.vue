<template>
  <div class="col-12">
    <form id="search">
      Search
      <input name="query" v-model="searchQuery" />
    </form>
    <data-table
      class="table table-hover list-doctor"
      :data="dataBookingTable"
      :columns-to-display="gridColumns"
      :filter-key="searchQuery"
      :columns-to-not-sort="['action']"
    >
      <template slot="time_in" scope="props">
        <b>{{ props.entry.time_in }}</b>
      </template>
      <template slot="action" scope="props">
        <button
          @click="editBooking(props.entry.booking_id)"
          type="button"
          class="btn"
        >
          <i class="fas fa-pen edit" style="color: #ffc107;"></i>
        </button>
        <button
          @click="deleteBooking(props.entry.booking_id)"
          type="button"
          class="btn"
        >
          <i class="fas fa-trash" style="color: #e34724;"></i>
        </button>
      </template>
    </data-table>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "DashboardTable",
  data() {
    return {
      searchQuery: "",
      gridColumns: ["time_in", "hn_number", "first_name", "action"]
    };
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
          autocapitalize: "off"
        },
        showCloseButton: true,
        confirmButtonText: "ยืนยัน",
        confirmButtonColor: "#99A3FF",
        showLoaderOnConfirm: true,
        preConfirm: () => {
          let linkInput = document.getElementById("link-input").value;
          let note = document.getElementById("note").value;

          return alert(note);
        }
      });
    },
    deleteBooking(booking_id) {
      this.$swal({
        width: "678px",
        title: "ยกเลิกการจอง",
        inputAttributes: {
          autocapitalize: "off"
        },
        showCloseButton: true,
        confirmButtonText: "ยืนยัน",
        confirmButtonColor: "#99A3FF",
        showLoaderOnConfirm: true,
        preConfirm: () => {
          return alert(booking_id);
        }
      });
    }
  },
  props: {
    dataBookingTable: Array
  }
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
</style>

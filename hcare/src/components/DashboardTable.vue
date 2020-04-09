<template>
  <div class="col-12">
    <form id="search" class="d-flex justify-content-end pb-3">
      <label class="col-1 col-form-label">Search:</label>
      <input name="query" v-model="searchQuery" class="form-control col-3" />
    </form>
    <data-table
      class="table table-hover list-doctor"
      :data="dataBookingTable"
      :columns-to-display="gridColumns"
      :filter-key="searchQuery"
      :columns-to-not-sort="['action']"
    >
      <template slot="ชื่อ" scope="props">
        <div class="dropdown">
          <a class="ui inverted button"
            >{{ props.entry.ชื่อ }} {{ props.entry.นามสกุล }}</a
          >
          <div class="dropdown-content ">
            <div class="container">
              <h6
                style="font-family: Poppins; font-style: normal; font-weight: bold; font-size: 14px; line-height: 21px; align-items: center; color: #444444;"
              >
                {{ props.entry.ชื่อ }} {{ props.entry.นามสกุล }}
                <hr style="border: 1px solid #B6B6B6;" />
                <span class="d-flex justify-content-start detail">
                  {{ props.entry.telephone }} {{ props.entry.email }}
                </span>
              </h6>
              <div class="row" style="text-align: center;">
                <div class="col-12">
                  <button
                    style="width: 140px; height: 32px;"
                    class="btn btn-primary btnBlock btnConfirm fixed-button"
                  >
                    <span>ดูเพิ่มเติม</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </template>
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
      gridColumns: ["เวลานัด", "HNnumber", "ชื่อ", "action"]
      // gridColumns: ["time_in", "hn_number", "first_name", "action"],
      // displayNames: {
      //   'time_in': "เวลานัด",
      //   'hn_number': "HN number",
      //   'first_name': "ชื่อ"
      // }
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
  background-color: #FFFFFF;
  min-width: 252px;
  z-index: 1;
}

.dropdown:hover .dropdown-content {
  display: block;
}

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

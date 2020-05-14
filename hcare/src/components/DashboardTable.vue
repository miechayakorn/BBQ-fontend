<template>
  <div class="col-12">
    <form id="search" class="d-flex justify-content-end pb-3" v-if="dataBookingTable.length != 0">
      <label class="col-1 col-form-label">Search:</label>
      <input name="query" v-model="searchQuery" class="form-control col-3" />
    </form>
    <div class="col-12 mt-3" v-if="dataBookingTable.length == 0">
      <h5>ไม่มีผู้นัดหมาย</h5>
    </div>
    <data-table
      class="table table-hover list-doctor"
      :data="dataBookingTable"
      :columns-to-display="gridColumns"
      :filter-key="searchQuery"
      :columns-to-not-sort="['action']"
      v-if="dataBookingTable.length != 0"
    >
      <template slot="ชื่อ" scope="props">
        <div class="dropdown">
          <a class="ui inverted button">{{ props.entry.ชื่อ }} {{ props.entry.นามสกุล }}</a>
          <div class="dropdown-content">
            <div class="container">
              <h6
                style="font-family: Poppins; font-style: normal; font-weight: bold; font-size: 14px; line-height: 21px; align-items: center; color: #444444;"
              >
                {{ props.entry.ชื่อ }} {{ props.entry.นามสกุล }}
                <hr style="border: 1px solid #B6B6B6;" />
                <span
                  class="d-flex justify-content-start detail"
                  style="font-size: 14px;"
                >{{ props.entry.telephone }} {{ props.entry.email }}</span>
              </h6>
            </div>
          </div>
        </div>
      </template>
      <template slot="เวลานัด" scope="props">
        <b>{{ props.entry.เวลานัด }}</b>
      </template>
      <template slot="action" scope="props">
        <button
          @click="
            editBooking(
              props.entry.booking_id,
              props.entry.link_meeting,
              props.entry.comment_from_staff
            )
          "
          type="button"
          class="btn"
        >
          <i class="fas fa-pen edit" style="color: #ffc107;"></i>
        </button>
        <button @click="deleteBooking(props.entry.booking_id)" type="button" class="btn">
          <i class="fas fa-trash" style="color: #e34724;"></i>
        </button>
        <button
          @click="
            viewBooking(
              (user = {
                fname: props.entry.ชื่อ,
                lname: props.entry.นามสกุล,
                email: props.entry.email,
                tel: props.entry.telephone,
                symptom: props.entry.symptom
              })
            )
          "
          type="button"
          class="btn"
        >
          <i class="fas fa-ellipsis-h" style="color: #7d7d7d;"></i>
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
      gridColumns: ["เวลานัด", "HNnumber", "ชื่อ", "action"]
    };
  },

  methods: {
    viewBooking(user) {
      console.log(user);
      this.$swal({
        width: "678px",
        html:
          "ชื่อ" +
          `<input class="swal2-input disabled" disabled value="${user.fname +
            " " +
            user.lname}">` +
          "อีเมล" +
          `<input class="swal2-input disabled" disabled value="${user.email}">` +
          "เบอร์โทร" +
          `<input class="swal2-input disabled" disabled value="${user.tel}">` +
          "อาการหรือประเด็นที่ปรึกษา ของคนไข้" +
          `<textarea id="note" class="swal2-input disabled" disabled style="height: 122px;">${user.symptom}</textarea>`,
        showConfirmButton: false,
        showCloseButton: true
      });
    },
    editBooking(booking_id, link_meeting, comment_from_staff) {
      this.$swal({
        width: "678px",
        html:
          "เพิ่มลิงค์สำหรับการ Meeting" +
          `<input id="link-input" placeholder="ใส่ลิงค์" class="swal2-input" ${
            link_meeting == null ? "" : "value=" + link_meeting
          }>` +
          "บันทึกเพิ่มเติม" +
          `<textarea id="note" class="swal2-input" style="height: 122px;">${
            comment_from_staff == null ? "" : comment_from_staff
          }</textarea>`,
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

          axios
            .post(
              `${process.env.VUE_APP_BACKEND_URL}/patientbooking/edit`,
              {
                booking_id: booking_id,
                link: linkInput,
                note: note
              },
              {
                headers: { Authorization: `Bearer ${this.$store.state.token}` }
              }
            )
            .then(res => {
              this.$swal({
                toast: true,
                position: "top-end",
                showConfirmButton: false,
                timer: 3000,
                icon: "success",
                title: "บันทึกสำเร็จ"
              });
              this.$router.go();
            })
            .catch(error => {
              console.log("===== Backend-error ======");
              console.error(error.response);
              this.$swal({ ...errorSWAL });
            });
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
        confirmButtonColor: "#d33",
        showLoaderOnConfirm: true,
        preConfirm: () => {
          axios
            .post(
              `${process.env.VUE_APP_BACKEND_URL}/cancel`,
              {
                booking_id: booking_id
              },
              {
                headers: { Authorization: `Bearer ${this.$store.state.token}` }
              }
            )
            .then(res => {
              this.$swal({
                toast: true,
                position: "top-end",
                showConfirmButton: false,
                timer: 3000,
                icon: "success",
                title: "ยกเลิกสำเร็จ"
              });
              this.$router.go();
            })
            .catch(error => {
              console.log("===== Backend-error ======");
              console.error(error.response); //สามารถเช็ค status ได้ถา้ใช้ error.response.status
              this.$swal({ ...errorSWAL });
            });
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

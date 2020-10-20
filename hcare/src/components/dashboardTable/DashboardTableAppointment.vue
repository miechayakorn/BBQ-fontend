<template>
  <div class="col-12">
    <form
      id="search"
      class="d-flex justify-content-end pb-3"
      v-if="dataBookingTable.length != 0"
    >
      <label class="col-6 col-md-1 col-form-label">Search:</label>
      <input
        name="query"
        v-model="searchQuery"
        class="col-6 col-md-3 form-control"
      />
    </form>
    <div class="col-12 mt-3 p-3 div-card" v-if="dataBookingTable.length == 0">
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
          <a class="ui inverted button"
            >{{ props.entry.ชื่อ }} {{ props.entry.นามสกุล }}</a
          >
          <div class="dropdown-content">
            <div class="row">
              <div class="col-12">
                <span class="text-center text-white font-weight-bold"
                  >{{ props.entry.ชื่อ }} {{ props.entry.นามสกุล }}</span
                >
                <div class="row mt-4 text-left">
                  <div class="col-1">
                    <i class="fas fa-phone-alt"></i>
                  </div>
                  <div class="col-11">{{ props.entry.telephone }}</div>
                  <div class="col-1">
                    <i class="fas fa-envelope"></i>
                  </div>
                  <div class="col-11" style="word-break: break-word">
                    {{ props.entry.email }}
                  </div>
                </div>
                <hr style="border: 1px solid white; width: 100px" />
                <div class="row text-left" v-show="props.entry.symptom">
                  <div class="col-12">
                    <span class="font-weight-bold" style="color: #99a3ff"
                      >อาการเบื้องต้น</span
                    >
                  </div>
                  <div class="col-12">
                    <span style="font-size: 14px; word-break: break-word">{{
                      props.entry.symptom
                    }}</span>
                  </div>
                </div>
                <router-link
                  target="_blank"
                  :to="'/admin/dashboard/history/' + props.entry.account_id"
                >
                  <div class="row d-flex justify-content-center mt-4">
                    <button
                      class="btn btn-primary btnBlock btnConfirm w-75"
                      style="
                        font-size: 14px;
                        box-shadow: none;
                        webkit-box-shadow: none;
                      "
                    >
                      ดูประวัติการเข้าใช้บริการ
                    </button>
                  </div>
                </router-link>
              </div>
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
          <i class="fas fa-pen edit" style="color: #ffc107"></i>
        </button>
        <button
          @click="deleteBooking(props.entry.booking_id)"
          type="button"
          class="btn"
        >
          <i class="fas fa-trash" style="color: #e34724"></i>
        </button>
        <button
          @click="
            viewBooking(
              (user = {
                fname: props.entry.ชื่อ,
                lname: props.entry.นามสกุล,
                email: props.entry.email,
                tel: props.entry.telephone,
                symptom: props.entry.symptom,
              })
            )
          "
          type="button"
          class="btn"
        >
          <i class="fas fa-ellipsis-h" style="color: #7d7d7d"></i>
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
      gridColumns: ["เวลานัด", "HNnumber", "ชื่อ", "action"],
    };
  },

  methods: {
    viewBooking(user) {
      console.log(user);
      this.$swal({
        width: "678px",
        html:
          "ชื่อ" +
          `<input class="swal2-input disabled" disabled value="${
            user.fname + " " + user.lname
          }">` +
          "อีเมล" +
          `<input class="swal2-input disabled" disabled value="${user.email}">` +
          "เบอร์โทร" +
          `<input class="swal2-input disabled" disabled value="${user.tel}">` +
          "อาการหรือประเด็นที่ปรึกษา ของคนไข้" +
          `<textarea id="note" class="swal2-input disabled" disabled style="height: 122px;">${user.symptom}</textarea>`,
        showConfirmButton: false,
        showCloseButton: true,
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
          autocapitalize: "off",
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
                note: note,
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
                title: "บันทึกสำเร็จ",
              });
              this.$router.go();
            })
            .catch((error) => {
              console.log("===== Backend-error ======");
              console.error(error.response);
              this.$swal({ ...errorSWAL });
            });
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
        confirmButtonColor: "#d33",
        showLoaderOnConfirm: true,
        preConfirm: () => {
          axios
            .post(
              `${process.env.VUE_APP_BACKEND_URL}/cancel`,
              {
                booking_id: booking_id,
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
    dataBookingTable: Array,
  },
};
</script>
<template>
  <div class="container mb-4">
    <div class="row mt-3">
      <div
        class="col-12 col-md-4"
        v-for="(item, index) in dataService"
        :key="index"
      >
        <div class="row m-3">
          <div class="col-12 p-4 div-card">
            <div class="row">
              <div class="col-12">
                <div class="float-right">
                  <toggle-button
                    class="mr-2"
                    :width="45"
                    :height="25"
                    :font-size="14"
                    :sync="true"
                    :value="item.status"
                    color="#99a3ff"
                    @change="
                      statusService(item.type_name, item.type_id, $event.value)
                    "
                  />
                </div>
              </div>
              <div class="col-12">
                <h6
                  class="font-weight-bold mb-2"
                  style="font-size: 20px; color: #5e65a1"
                >
                  {{ item.type_name }}
                </h6>
                <p style="color: #b6b6b6">วิทยาเขต: {{ item.location_name }}</p>
                <div
                  class="alert p-2 alert-warning"
                  v-show="item.staff_list.length == 0"
                >
                  ไม่พบเจ้าหน้าที่ที่รับผิดชอบบริการนี้
                </div>
                <div
                  v-show="item.staff_list.length != 0"
                  class="dropdown"
                  v-for="(staff, index) in item.staff_list"
                  :key="index"
                  @click="fetchWorkTimePerson(item.type_id, staff.account_id)"
                >
                  <img
                    v-if="staff.profile_picture"
                    class="rounded-circle m-2"
                    width="56"
                    height="56"
                    :src="staff.profile_picture"
                  />
                  <logoAdmin
                    v-else-if="
                      staff.profile_picture == null && staff.role == 'ADMIN'
                    "
                    class="rounded-circle m-2"
                  />
                  <logoStaff
                    v-else-if="
                      staff.profile_picture == null && staff.role == 'STAFF'
                    "
                    class="rounded-circle m-2"
                  />
                  <br />
                  <i style="color: #5e65a1" class="fas fa-clock"></i>
                </div>
              </div>
              <div class="col-12 mt-4">
                <button
                  type="button"
                  @click="removeService(item.type_id, item.type_name)"
                  class="btn"
                >
                  <i
                    class="fas fa-trash fa-lg"
                    style="color: rgb(227, 71, 36)"
                  ></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="col-12">
        <div class="alert p-2 alert-warning" v-show="dataService.length == 0">
          ไม่พบบริการที่รับผิดชอบ
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { errorSWAL } from "@/utility/swal.js";
import logoStaff from "@/components/svg/logoStaff.vue";
import logoAdmin from "@/components/svg/logoAdmin.vue";
import VclFacebook from "vue-content-loading";

export default {
  data() {
    return {
      loading: false,
      dataService: [
        {
          type_id: "",
          type_name: " ",
          location_id: "",
          availability: "",
          status: "",
          staff_list: [
            {
              account_id: "",
              prefix: ".",
              first_name: "",
              last_name: "",
              type_id: "",
            },
          ],
        },
      ],
    };
  },
  components: {
    VclFacebook,
    logoStaff,
    logoAdmin,
  },
  methods: {
    async fetchWorkTimePerson(type_id, account_id) {
      await axios
        .get(
          `${process.env.VUE_APP_BACKEND_URL}/service/worktimeperson?account_id=${account_id}&type_id=${type_id}`,
          {
            headers: { Authorization: `Bearer ${this.$store.state.token}` },
          }
        )
        .then((res) => {
          let worktimeperson = res.data;
          this.$swal({
            width: "600px",
            html:
              '<div class="text-left p-2">' +
              `<b>ชื่อบริการ :</b> ${worktimeperson.type_name} <br/>` +
              `<b>ผู้รับผิดชอบ :</b> ${worktimeperson.doctor} <br/>` +
              '<div class="mt-2">' +
              `<b>วันและเวลาที่ให้บริการ : </b> <br/>` +
              worktimeperson.worktime
                .map(
                  (item) =>
                    `<div class="row"><div class="col-4">วัน${item.day}</div><div class="col-6 text-left">${item.time}</div></div>`
                )
                .join("") +
              "</div>" +
              "</div>",
            showConfirmButton: false,
            showCloseButton: true,
          });
        });
    },
    async fetchService() {
      await axios
        .get(`${process.env.VUE_APP_BACKEND_URL}/service`, {
          headers: { Authorization: `Bearer ${this.$store.state.token}` },
        })
        .then((res) => {
          this.dataService = res.data;
        });
    },
    statusService(type_name, type_id, status) {
      if (status == false) {
        this.$swal({
          html: `<h3>กรุณากรอกเหตุผลการปิดบริการ ${type_name} </h3> <span> *เพื่อประกาศให้ผู้เข้าใช้บริการทราบ </span> <textarea id="announcement_text" class="swal2-input" style="height: 122px;"> </textarea>`,
          inputAttributes: {
            autocapitalize: "off",
          },
          width: "678px",
          showCloseButton: true,
          confirmButtonText: "ยืนยัน",
          confirmButtonColor: "#99A3FF",
          showLoaderOnConfirm: true,
          preConfirm: () => {
            let announcement = document.getElementById("announcement_text")
              .value;
            axios
              .patch(
                `${process.env.VUE_APP_BACKEND_URL}/service/updatestatus`,
                {
                  type_id: type_id,
                  status: status,
                  announcement: announcement,
                },
                {
                  headers: {
                    Authorization: `Bearer ${this.$store.state.token}`,
                  },
                }
              )
              .then((res) => {
                if (res.status == 201) {
                  this.$swal({
                    toast: true,
                    position: "top-end",
                    showConfirmButton: false,
                    timerProgressBar: true,
                    onOpen: (toast) => {
                      toast.addEventListener(
                        "mouseenter",
                        this.$swal.stopTimer
                      );
                      toast.addEventListener(
                        "mouseleave",
                        this.$swal.resumeTimer
                      );
                    },
                    timer: 3000,
                    icon: "success",
                    title: "บันทึกสำเร็จ",
                  });
                  this.fetchService();
                } else {
                  console.log("===== Backend-error ======");
                  console.error(res.data);
                  this.$swal({
                    icon: "warning",
                    title: "คำเตือน",
                    text: res.data,
                  });
                }
              })
              .catch((res) => {
                console.log("===== Backend-error ======");
                console.error(res);
                this.$swal({ ...errorSWAL });
              });
          },
        });
      } else {
        axios
          .patch(
            `${process.env.VUE_APP_BACKEND_URL}/service/updatestatus`,
            {
              type_id: type_id,
              status: status,
              announcement: null,
            },
            {
              headers: {
                Authorization: `Bearer ${this.$store.state.token}`,
              },
            }
          )
          .then((res) => {
            if (res.status == 201) {
              this.$swal({
                toast: true,
                position: "top-end",
                showConfirmButton: false,
                timerProgressBar: true,
                onOpen: (toast) => {
                  toast.addEventListener("mouseenter", this.$swal.stopTimer);
                  toast.addEventListener("mouseleave", this.$swal.resumeTimer);
                },
                timer: 3000,
                icon: "success",
                title: "บันทึกสำเร็จ",
              });
              this.fetchService();
            } else {
              console.log("===== Backend-error ======");
              console.error(res.data);
              this.$swal({
                icon: "warning",
                title: "คำเตือน",
                text: res.data,
              });
            }
          })
          .catch((res) => {
            console.log("===== Backend-error ======");
            console.error(res);
            this.$swal({ ...errorSWAL });
          });
      }
    },
    async removeService(type_id, type_name) {
      this.$swal({
        icon: "warning",
        title: "ลบบริการ " + type_name,
        showCloseButton: true,
        confirmButtonText: "ยืนยันการลบ",
        confirmButtonColor: "#d33",
        showLoaderOnConfirm: true,
        preConfirm: () => {
          axios
            .get(
              `${process.env.VUE_APP_BACKEND_URL}/delete/service/${type_id}`,
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
                title: "ลบบริการสำเร็จ",
              });
              this.fetchService();
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
  mounted() {
    this.fetchService();
  },
};
</script>

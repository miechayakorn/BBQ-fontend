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
                  class="font-weight-bold mb-3"
                  style="font-size: 20px; color: #5e65a1"
                >
                  {{ item.type_name }}
                </h6>
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
                >
                  <!-- <img
                    class="rounded-circle m-2"
                    width="56"
                    height="56"
                    src="data:image/png;base64,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"
                  /> -->
                  <logoAdmin
                    v-if="staff.role == 'ADMIN'"
                    class="rounded-circle m-2"
                  />
                  <logoStaff
                    v-else-if="staff.role == 'STAFF'"
                    class="rounded-circle m-2"
                  />
                  <div class="dropdown-content-location">
                    <div class="row">
                      <div class="col-12">
                        {{ staff.prefix }}&nbsp;{{ staff.first_name }}&nbsp;{{
                          staff.last_name
                        }}
                      </div>
                    </div>
                  </div>
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
      this.$swal({
        icon: "warning",
        title: status ? "เปิดบริการ " + type_name : "ปิดบริการ " + type_name,
        showCloseButton: true,
        confirmButtonText: "ยืนยัน",
        showLoaderOnConfirm: true,
        preConfirm: () => {
          axios
            .patch(
              `${process.env.VUE_APP_BACKEND_URL}/service/updatestatus`,
              {
                type_id: type_id,
                status: status,
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

<style scoped>
.dropdown-content-location {
  background-color: #5e65a2;
  color: white;
  border-radius: 20px;
  padding: 10px;
  padding-left: 20px;
  padding-right: 20px;
  display: none;
  position: fixed;
  z-index: 1;
}
.dropdown:hover .dropdown-content-location {
  display: block;
}
</style>

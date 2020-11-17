<template>
  <div class="container mb-4">
    <div class="text-left font-weight-bold" style="margin-top: 32px">
      <span>ส่วนที่ 1 : เพิ่มเจ้าหน้าที่กลุ่มงานฯ ใหม่</span>
    </div>
    <div class="mt-3 div-card">
      <div class="row bg-lightblue">
        <div class="col-7 d-none d-xl-block">
          <manageEmpPic />
        </div>
        <div class="col-12 col-xl-5">
          <div class="row">
            <div class="col-12">
              <div class="form-group" style="margin-top: 48px">
                <div class="text-left mb-2">
                  <div class="mt-6">
                    <label for="firstName">ชื่อจริงเจ้าหน้าที่</label>
                    <input
                      v-model="dataPrepareSend.first_name"
                      type="text"
                      class="form-control"
                      id="firstName"
                      placeholder="ชื่อจริง"
                    />
                  </div>
                  <div class="mt-3">
                    <label for="lastNameInput">นามสกุลเจ้าหน้าที่</label>
                    <input
                      v-model="dataPrepareSend.last_name"
                      type="text"
                      class="form-control"
                      id="lastNameInput"
                      placeholder="นามสกุล"
                    />
                  </div>
                  <div class="mt-3">
                    <label for="hnInput">รหัสเจ้าหน้าที่</label>
                    <input
                      v-model="dataPrepareSend.hn_number"
                      type="text"
                      class="form-control"
                      id="hnInput"
                      placeholder="XXXXXXXX"
                    />
                  </div>
                  <div class="mt-3">
                    <label for="inputEmail">อีเมล</label>
                    <input
                      v-model="dataPrepareSend.email"
                      type="email"
                      :class="
                        checkEmail()
                          ? 'form-control'
                          : 'form-control is-invalid'
                      "
                      id="inputEmail"
                      placeholder="example@mail.kmutt.ac.th"
                    />
                    <div class="invalid-feedback">
                      {{ $t("suggestemail") }}
                    </div>
                  </div>
                </div>
                <button
                  @click="sendToBackend"
                  class="btn btn-primary btnBlock btnConfirm fixed-button text-center mt-4 mb-4"
                >
                  เพิ่มเจ้าหน้าที่กลุ่มงานฯ
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <VclFacebook v-if="loading" class="mt-3" />
    <div class="mt-3">
      <div class="text-left font-weight-bold mb-3" style="margin-top: 32px">
        <span>ส่วนที่ 2 : รายชื่อเจ้าหน้าที่ทั้งหมด</span>
      </div>
      <div class="row">
        <DashboardTableEmp :dataUserTable="userEmployee" />
      </div>
    </div>
    <div style="margin-top: -32px">
      <div class="text-left font-weight-bold mb-3">
        <span>ส่วนที่ 3 : ลบบัญชีผู้ใช้งานในระบบ</span>
      </div>
      <div class="row" style="margin-bottom: 100px">
        <div class="col-12">
          <div class="form-group text-left">
            <label class="font-weight-bold">อีเมลผู้ใช้งาน</label>
            <div>
              <VueBootstrapTypeahead
                inputClass="mb-2 select-date col-12 col-md-7"
                v-model="query"
                :data="users"
                :serializer="item => item.email"
                @hit="selectedUser = $event"
                placeholder="ค้นหาอีเมลผู้ใช้งานในระบบ"
              />
              <div
                v-if="
                  users.length == 0 && selectedUser == null && query.length >= 4
                "
                class="alert p-3 alert-warning"
              >
                ไม่พบอีเมลในระบบ กรุณาสมัครสมาชิกก่อนใช้งาน
              </div>
              <div
                v-if="selectedUser && query != ''"
                class="mt-4 col-12 p-5 div-card"
              >
                <div class="row">
                  <div class="col-1 col-form-label">
                    {{ selectedUser.account_id }}
                  </div>
                  <div class="col-5 col-form-label">
                    {{ selectedUser.name }}
                  </div>
                  <div class="col-5 col-form-label">
                    {{ selectedUser.email }}
                  </div>
                  <div class="col-1" v-if="selectedUser.account_id != 1">
                    <button
                      @click="showRemoveUser = !showRemoveUser"
                      type="button"
                      class="btn"
                    >
                      <i class="fas fa-trash" style="color: #e34724"></i>
                    </button>
                  </div>
                </div>
              </div>
              <div
                v-if="selectedUser && query != '' && showRemoveUser"
                class="mt-4"
              >
                <div class="row justify-content-center">
                  <label class="font-weight-bold col-form-label mr-2"
                    >กรุณากรอกอีเมลเพื่อยืนยันการลบผู้ใช้งาน</label
                  >
                  <input
                    v-model="email"
                    type="text"
                    class="form-control col-12 col-md-4 mb-2"
                    id="lastNameInput"
                    placeholder="ยืนยันอีเมล"
                  />
                  <button
                    @click="removeUser"
                    class="btn btnRemove"
                    :disabled="!showRemoveUserButton"
                  >
                    <span style="font-weight: 900; color: white">ลบบัญชี</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { errorSWAL } from "@/utility/swal.js";
import manageEmpPic from "@/components/svg/manageEmpPic.vue";
import VueBootstrapTypeahead from "vue-bootstrap-typeahead";
import VclFacebook from "vue-content-loading";
import DashboardTableEmp from "@/components/dashboardTable/DashboardTableEmp.vue";

export default {
  data() {
    return {
      loading: false,
      interval: undefined,
      query: "",
      selectedUser: null,
      showRemoveUser: false,
      showRemoveUserButton: false,
      email: "",
      users: [],
      dataPrepareSend: {
        first_name: "",
        last_name: "",
        email: "",
        hn_number: ""
      },
      userEmployee: []
    };
  },
  watch: {
    email: {
      handler: async function(val, oldCal) {
        if (this.email == this.query) {
          this.showRemoveUserButton = true;
        } else {
          this.showRemoveUserButton = false;
        }
      }
    },
    async query(newQuery) {
      if (newQuery.length >= 4) {
        await axios
          .get(`${process.env.VUE_APP_BACKEND_URL}/search/email?q=${newQuery}`)
          .then(res => {
            this.email = "";
            this.showRemoveUser = false;
            this.showRemoveUserButton = false;
            this.users = res.data;
          });
      }
    }
  },
  mounted() {
    this.fetchEmp();
    this.interval = setInterval(() => {
      this.fetchEmp();
    }, 5000);
  },
  beforeDestroy() {
    clearInterval(this.interval);
  },
  methods: {
    checkEmail() {
      if (this.dataPrepareSend.email.length == 0) {
        return true;
      }
      let email = this.dataPrepareSend.email;
      let emailKmutt = "@mail.kmutt.ac.th";
      let emailKmuttAnother = "@kmutt.ac.th";
      let emailSub = this.dataPrepareSend.email.slice(
        email.length - 17,
        email.length
      );
      let emailSubAnother = this.dataPrepareSend.email.slice(
        email.length - 12,
        email.length
      );

      if (emailSub == emailKmutt || emailSubAnother == emailKmuttAnother) {
        return true;
      } else {
        return false;
      }
    },
    async fetchEmp() {
      await axios
        .get(
          `${process.env.VUE_APP_BACKEND_URL}/admin/dashboard/manageemployee/getemployee`,
          {
            headers: { Authorization: `Bearer ${this.$store.state.token}` }
          }
        )
        .then(res => {
          this.userEmployee = res.data;
        });
    },
    clearDataRemoveUser() {
      this.query = "";
      this.email = "";
      this.users = [];
      this.selectedUser = null;
      this.showRemoveUser = false;
      this.showRemoveUserButton = false;
    },
    removeUser() {
      if (this.selectedUser) {
        this.$swal({
          icon: "warning",
          title: "ลบบัญชีผู้ใช้งาน",
          text: this.selectedUser.email,
          showCloseButton: true,
          confirmButtonText: "ยืนยันการลบ",
          confirmButtonColor: "#d33",
          showLoaderOnConfirm: true,
          preConfirm: () => {
            this.$swal({
              title: "กรุณารอสักครู่",
              allowEscapeKey: false,
              allowOutsideClick: false,
              onOpen: () => {
                this.$swal.showLoading();
              }
            });
            axios
              .post(
                `${process.env.VUE_APP_BACKEND_URL}/admin/deleteemployee`,
                {
                  account_id: this.selectedUser.account_id,
                  email: this.selectedUser.email
                },
                {
                  headers: {
                    Authorization: `Bearer ${this.$store.state.token}`
                  }
                }
              )
              .then(res => {
                if (res.status == 200) {
                  this.$swal({
                    toast: true,
                    position: "top-end",
                    showConfirmButton: false,
                    timer: 3000,
                    icon: "success",
                    title: "ลบบัญชีสำเร็จ"
                  });
                  this.clearDataRemoveUser();
                } else if (res.status == 203) {
                  this.$swal({
                    icon: "warning",
                    title: "คำเตือน",
                    text: res.data
                  });
                } else {
                  this.$swal({
                    icon: "warning",
                    title: "คำเตือน",
                    text: res.data
                  });
                }
              })
              .catch(error => {
                console.log("===== Backend-error ======");
                console.error(error.response);
                this.$swal({ ...errorSWAL });
              });
          }
        });
      }
    },
    async sendToBackend() {
      if (
        this.dataPrepareSend.first_name != "" &&
        this.dataPrepareSend.last_name != "" &&
        this.dataPrepareSend.email != "" &&
        this.dataPrepareSend.hn_number != ""
      ) {
        if (this.checkEmail()) {
          try {
            this.$swal({
              title: "กรุณารอสักครู่",
              allowEscapeKey: false,
              allowOutsideClick: false,
              onOpen: () => {
                this.$swal.showLoading();
              }
            });
            await axios
              .post(
                `${process.env.VUE_APP_BACKEND_URL}/admin/dashboard/manageemployee/create`,
                {
                  first_name: this.dataPrepareSend.first_name,
                  last_name: this.dataPrepareSend.last_name,
                  email: this.dataPrepareSend.email,
                  hn_number: this.dataPrepareSend.hn_number
                },
                {
                  headers: {
                    Authorization: `Bearer ${this.$store.state.token}`
                  }
                }
              )
              .then(res => {
                if (res.status == 201) {
                  this.dataPrepareSend.first_name = "";
                  this.dataPrepareSend.last_name = "";
                  this.dataPrepareSend.email = "";
                  this.dataPrepareSend.hn_number = "";

                  this.$swal({
                    confirmButtonText: "ตกลง",
                    timer: 10000,
                    icon: "success",
                    title: "เพิ่มพนักงานสำเร็จ",
                    html:
                      "<hr/>" +
                      '<span style="font-size: 18px; text-decoration: underline; color:#FA3D3D"> กรุณากดยืนยันที่ email ของ บัญชีที่สร้าง</span>'
                  });
                } else if (res.status == 203) {
                  this.$swal({
                    icon: "warning",
                    title: "คำเตือน",
                    text: res.data
                  });
                } else {
                  this.$swal({
                    icon: "warning",
                    title: "คำเตือน",
                    text: res.data
                  });
                }
              });
          } catch (error) {
            console.log("===== Backend-error ======");
            console.error(error.response);
            this.$swal({ ...errorSWAL });
          }
        } else {
          this.$swal({
            icon: "warning",
            title: "คำเตือน",
            text: `กรุณากรอก @mail.kmutt.ac.th หรือ @kmutt.ac.th เท่านั้น`
          });
        }
      } else {
        this.$swal({
          icon: "warning",
          title: "คำเตือน",
          text: "กรุณากรอกข้อมูลให้ครบ"
        });
      }
    }
  },
  components: {
    manageEmpPic,
    VclFacebook,
    DashboardTableEmp,
    VueBootstrapTypeahead
  }
};
</script>

<style>
.btnRemove {
  margin-left: 10px;
  border-radius: 20px;
  background-color: #ee6b7f;
}
</style>

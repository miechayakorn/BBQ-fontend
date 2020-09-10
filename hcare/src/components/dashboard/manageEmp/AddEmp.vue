<template>
  <div class="container mb-4">
    <div class="text-left font-weight-bold" style="margin-top:32px">
      <span>ส่วนที่ 1 : เพิ่มเจ้าหน้าที่กลุ่มงานฯ ใหม่</span>
    </div>
    <div class="mt-3 div-card">
      <div class="row bg-lightblue">
        <div class="col-7">
          <manageEmpPic class="d-none d-md-block" />
        </div>
        <div class="col-12 col-md-5">
          <div class="row">
            <div class="col-12">
              <div class="form-group" style="margin-top:48px;">
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
                    <label for="inputEmail">อีเมล</label>
                    <input
                      v-model="dataPrepareSend.email"
                      type="email"
                      class="form-control"
                      id="inputEmail"
                      placeholder="example@kmutt.ac.th"
                    />
                  </div>
                </div>
                <button
                  @click="sendToBackend"
                  class="btn btn-primary btnBlock btnConfirm fixed-button text-center mt-4 mb-4"
                >เพิ่มเจ้าหน้าที่กลุ่มงานฯ</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <VclFacebook v-if="loading" class="mt-3" />
    <div class="mt-3">
      <div class="text-left font-weight-bold mb-3" style="margin-top:32px">
        <span>ส่วนที่ 2 : รายชื่อเจ้าหน้าที่ทั้งหมด</span>
      </div>
      <div class="row">
        <DashboardTableEmp :dataUserTable="userEmployee" />
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import manageEmpPic from "@/components/svg/manageEmpPic.vue";
import VclFacebook from "vue-content-loading";
import { errorSWAL } from "@/utility/swal.js";
import DashboardTableEmp from "@/components/table/DashboardTableEmp.vue";

export default {
  data() {
    return {
      loading: false,
      //ข้อมูลเตรียมส่งไป Backend
      dataPrepareSend: {
        first_name: "",
        last_name: "",
        email: "",
      },
      userEmployee: [],
    };
  },

  async mounted() {
    //เรียกข้อมูล Default
    //Type
    await axios
      .get(`${process.env.VUE_APP_BACKEND_URL}/admin/dashboard/manageemployee/getemployee`, {
        headers: { Authorization: `Bearer ${this.$store.state.token}` },
      })
      .then((res) => {
        this.userEmployee = res.data;
      });
  },
  methods: {
    async sendToBackend() {
      if (
        this.dataPrepareSend.first_name != "" &&
        this.dataPrepareSend.last_name != "" &&
        this.dataPrepareSend.email != ""
      ) {
        try {
          this.$swal({
            title: "กรุณารอสักครู่",
            allowEscapeKey: false,
            allowOutsideClick: false,
            onOpen: () => {
              this.$swal.showLoading();
            },
          });
          await axios
            .post(
              `${process.env.VUE_APP_BACKEND_URL}/admin/dashboard/manageemployee/create`,
              {
                first_name: this.dataPrepareSend.first_name,
                last_name: this.dataPrepareSend.last_name,
                email: this.dataPrepareSend.email,
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
                  confirmButtonText: "ตกลง",
                  timer: 10000,
                  icon: "success",
                  title: "เพิ่มพนักงานสำเร็จ",
                  html:
                    "<hr/>" +
                    '<span style="font-size: 18px; text-decoration: underline; color:#FA3D3D"> กรุณากดยืนยันที่ email ของ บัญชีที่สร้าง</span>',
                });
              } else {
                this.$swal({
                  icon: "warning",
                  title: "คำเตือน",
                  text: res.data,
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
          text: "กรุณากรอกข้อมูลให้ครบ",
        });
      }
    },
  },
  components: {
    manageEmpPic,
    VclFacebook,
    DashboardTableEmp,
  },
};
</script>

<style>
</style>
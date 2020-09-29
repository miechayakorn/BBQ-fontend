<template>
  <div>
    <div class="container fixed-container mb-3" v-if="loading">
      <VclFacebook />
      <VclList class="mt-2" />
      <VclList class="mt-2" />
    </div>
    <div class="container mb-3 bg">
      <div class="row">
        <div class="col-12 col-md-5">
          <div class="row text-white">
            <div class="col-12 mt-4">
              <div class="div-showInfoUser">
                <div class="d-flex justify-content-center pt-5">
                  <iconUser />
                </div>
                <label style="color: white" for="files" class="btn">
                  แก้ไขรูปภาพ
                  <i class="fas fa-pen" />
                </label>
                <input
                  id="files"
                  style="visibility: hidden"
                  type="file"
                  accept="image/*"
                />
                <div class="p-4 text-left" style="margin-top: 40px">
                  <p>สิทธิ์และการแก้ไข</p>
                  <div class="form-check form-check-inline">
                    <input
                      class="form-check-input"
                      type="radio"
                      name="role"
                      id="radioStaff"
                      value="STAFF"
                      v-model="dataFetch.role"
                    />
                    <label class="form-check-label" for="radioStaff"
                      >Staff</label
                    >
                  </div>
                  <div class="form-check form-check-inline">
                    <input
                      class="form-check-input"
                      type="radio"
                      name="role"
                      id="radioAdmin"
                      value="ADMIN"
                      v-model="dataFetch.role"
                    />
                    <label class="form-check-label" for="radioAdmin"
                      >Admin</label
                    >
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-12 col-md-7">
          <div class="row mt-4 div-card div-info-emp">
            <div class="col-12 mb-5">
              <div class="form-group mt-5">
                <div class="text-left mb-2">
                  <div class="row">
                    <div class="col-12">
                      <label for="firstPrefix">คำนำหน้าชื่อ</label>
                      <input
                        v-model="dataFetch.prefix"
                        type="text"
                        class="form-control"
                        id="firstPrefix"
                      />
                    </div>
                    <div class="col-12 col-md-6 mt-3">
                      <label for="firstName">ชื่อจริง</label>
                      <input
                        v-model="dataFetch.first_name"
                        type="text"
                        class="form-control"
                        id="firstName"
                      />
                    </div>
                    <div class="col-12 col-md-6 mt-3">
                      <label for="lastName">นามสกุล</label>
                      <input
                        type="text"
                        class="form-control"
                        id="lastName"
                        v-model="dataFetch.last_name"
                      />
                    </div>
                    <div class="col-12 mt-3">
                      <label for="inputEmail">อีเมล</label>
                      <input
                        type="email"
                        class="form-control"
                        id="inputEmail"
                        readonly
                        :value="dataFetch.email"
                      />
                    </div>

                    <div class="col-12 col-md-6 mt-3">
                      <label for="inputTel">เบอร์โทรศัพท์</label>
                      <input
                        type="tel"
                        class="form-control"
                        id="inputTel"
                        v-model="dataFetch.telephone"
                      />
                    </div>
                    <div class="col-12 col-md-6 mt-3">
                      <label for="inputHNNumber">หมายเลขบุคลากร มจธ.</label>
                      <input
                        v-model="dataFetch.hn_number"
                        type="number"
                        class="form-control"
                        id="inputHNNumber"
                      />
                    </div>
                    <div class="col-12 mt-3">
                      <p>บริการที่รับผิดชอบ</p>
                      <button
                        v-for="(data, index) in dataFetch.service_type"
                        :key="index"
                        class="btn div-showTag text-white text-left m-1"
                      >
                        <span class="mt-4 mb-4 p-2">#{{ data.type_name }}</span>
                      </button>
                      <div class="alert p-2 alert-warning" v-show="dataFetch.service_type.length == 0">
                        ไม่มีบริการที่รับผิดชอบ
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="row mt-4 mb-4">
            <div class="col-12">
              <button
                @click="close()"
                class="col-5 btn btn-primary btnBlock btnBack fixed-button text-center mr-4"
              >
                <svg
                  width="19"
                  height="13"
                  viewBox="0 0 19 13"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M18.9785 5.14307H4.80852L8.38852 1.55307L6.97852 0.143066L0.978516 6.14307L6.97852 12.1431L8.38852 10.7331L4.80852 7.14307H18.9785V5.14307Z"
                    fill="#99A3FF"
                  />
                </svg>
                ย้อนกลับ
              </button>
              <button
                @click="sendToBackend"
                class="col-5 btn btn-primary btnBlock btnConfirm fixed-button text-center"
              >
                เสร็จสิ้น
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import iconUser from "@/components/svg/icon/iconUser.vue";
import { errorSWAL } from "@/utility/swal.js";
import { VclFacebook, VclList } from "vue-content-loading";

export default {
  data() {
    return {
      loading: false,
      dataFetch: {
        image: "",
        account_id: "",
        prefix: "",
        first_name: "",
        last_name: "",
        email: "",
        telephone: "",
        hn_number: "",
        role: "",
        service_type: [],
      },
    };
  },
  async mounted() {
    this.loading = true;
    await axios
      .get(
        `${process.env.VUE_APP_BACKEND_URL}/admin/dashboard/manageemployee/getemployeeforedit?account_id=${this.$route.params.id}`,
        {
          headers: { Authorization: `Bearer ${this.$store.state.token}` },
        }
      )
      .then((res) => {
        this.dataFetch = res.data;
      })
      .catch((res) => {
        console.log("===== Backend-error ======");
        console.error(res);
        this.$swal({ ...errorSWAL });
        close();
      });
    this.loading = false;
  },
  methods: {
    close() {
      close();
    },
    async sendToBackend() {
      if (
        this.dataFetch.account_id != "" &&
        this.dataFetch.prefix != "" &&
        this.dataFetch.first_name != "" &&
        this.dataFetch.last_name != "" &&
        this.dataFetch.email != "" &&
        this.dataFetch.telephone != "" &&
        this.dataFetch.hn_number != "" &&
        this.dataFetch.role != ""
      ) {
        await axios
          .patch(
            `${process.env.VUE_APP_BACKEND_URL}/admin/dashboard/manageemployee/editemployee`,
            {
              account_id: this.dataFetch.account_id,
              prefix: this.dataFetch.prefix,
              first_name: this.dataFetch.first_name,
              last_name: this.dataFetch.last_name,
              email: this.dataFetch.email,
              telephone: this.dataFetch.telephone,
              hn_number: this.dataFetch.hn_number,
              role: this.dataFetch.role,
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
    iconUser,
    VclFacebook,
    VclList,
  },
};
</script>

<style scope>
.div-card-profile {
  background: #5e65a1;
  border-radius: 30px;
}
.btnBack {
  background: #ffffff;
  border: 2px solid #99a3ff;
  box-sizing: border-box;
  border-radius: 20px;
  color: #99a3ff;
}
@media (min-width: 768px) {
  .div-info-emp {
    padding-right: 60px;
    padding-left: 60px;
    border-radius: 30px;
  }
}
input[type="radio"] {
  width: 18px;
  height: 18px;
}
</style>
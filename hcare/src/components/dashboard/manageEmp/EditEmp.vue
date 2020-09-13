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
                <label style="color:white;" for="files" class="btn">
                  แก้ไขรูปภาพ
                  <i class="fas fa-pen" />
                </label>
                <input id="files" style="visibility:hidden;" type="file" accept="image/*" />
                <div class="p-4 text-left" style="margin-top:40px;">
                  <p>สิทธิ์และการแก้ไข</p>
                  <div class="custom-control custom-radio custom-control-inline">
                    <input type="radio" id="radioStaff" name="role" class="custom-control-input" />
                    <label class="custom-control-label" for="radioStaff">Staff</label>
                  </div>
                  <div class="custom-control custom-radio custom-control-inline">
                    <input type="radio" id="radioAdmin" name="role" class="custom-control-input" />
                    <label class="custom-control-label" for="radioAdmin">admin</label>
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
                        v-model="dataPrepareSend.prefix"
                        type="text"
                        class="form-control"
                        id="firstPrefix"
                        placeholder="คำนำหน้า"
                      />
                    </div>
                    <div class="col-12 col-md-6 mt-3">
                      <label for="firstName">ชื่อจริง</label>
                      <input
                        v-model="dataPrepareSend.first_name"
                        type="text"
                        class="form-control"
                        id="firstName"
                        placeholder="ชื่อจริง"
                      />
                    </div>
                    <div class="col-12 col-md-6 mt-3">
                      <label for="lastName">นามสกุล</label>
                      <input
                        type="text"
                        class="form-control"
                        id="lastName"
                        v-model="dataPrepareSend.last_name"
                        placeholder="นามสกุล"
                      />
                    </div>
                    <div class="col-12 mt-3">
                      <label for="inputEmail">อีเมล</label>
                      <input
                        type="email"
                        class="form-control"
                        id="inputEmail"
                        readonly
                        :value="dataPrepareSend.email"
                      />
                    </div>

                    <div class="col-12 col-md-6 mt-3">
                      <label for="inputTel">เบอร์โทรศัพท์</label>
                      <input
                        type="tel"
                        class="form-control"
                        id="inputTel"
                        placeholder="เบอร์โทรศัพท์"
                        v-model="dataPrepareSend.telephone"
                      />
                    </div>
                    <div class="col-12 col-md-6 mt-3">
                      <label for="inputHNNumber">หมายเลขบุคลากร มจธ.</label>
                      <input
                        v-model="dataPrepareSend.hn_number"
                        type="number"
                        class="form-control"
                        placeholder="หมายเลข"
                        id="inputHNNumber"
                      />
                    </div>
                    <div class="col-12 mt-3">
                      <p>บริการที่รับผิดชอบ</p>
                      <button class="btn div-showTag text-white text-left m-1">
                        <span class="mt-4 mb-4 p-2">ฝังเข็ม</span>
                      </button>
                      <button class="btn div-showTag text-white text-left m-1">
                        <span class="mt-4 mb-4 p-2">หูตาจมูก</span>
                      </button>
                      <button class="btn div-showTag text-white text-left m-1">
                        <span class="mt-4 mb-4 p-2">หูตาจมูก</span>
                      </button>
                      <button class="btn div-showTag text-white text-left m-1">
                        <span class="mt-4 mb-4 p-2">หูตาจมูก</span>
                      </button>
                      <button class="btn div-showTag text-white text-left m-1">
                        <span class="mt-4 mb-4 p-2">หูตาจมูก</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="row mt-4 mb-4">
            <div class="col-12">
              <router-link to="/admin/dashboard/manageEmployee?p=addEmp">
                <button
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
              </router-link>
              <button
                @click="sendToBackend"
                class="col-5 btn btn-primary btnBlock btnConfirm fixed-button text-center"
              >เสร็จสิ้น</button>
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
      dataPrepareSend: [],
      dataFetch: {
        dataTypes: [],
      },
    };
  },
  async mounted() {
    this.loading = true;
    await axios
      .get(`${process.env.VUE_APP_BACKEND_URL}/ServiceTypes`, {
        headers: { Authorization: `Bearer ${this.$store.state.token}` },
      })
      .then((res) => {
        this.dataFetch.dataTypes = res.data;
      })
      .catch((res) => {
        console.log("===== Backend-error ======");
        console.error(res);
        this.$swal({ ...errorSWAL });
        this.$router.push("/admin/dashboard/manageemployee/");
      });
    this.loading = false;
  },
  methods: {
    sendToBackend() {},
  },
  components: {
    iconUser,
    VclFacebook,
    VclList,
  },
};
</script>

<style>
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
</style>
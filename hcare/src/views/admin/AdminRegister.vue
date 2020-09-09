<template>
  <div>
    <div class="container fixed-container mb-3" v-if="loading">
      <VclFacebook />
      <VclList class="mt-2" />
      <VclList class="mt-2" />
    </div>
    <div class="container mb-3 bg" v-if="!loading">
      <div class="row">
        <div class="col-12 col-md-6 d-none d-md-block">
          <div class="row">
            <div class="col-12">
              <div class="text-left text-title">
                <logoHeader />
                <br />Manage Your Patients Easily !
                <br />Paper Less
              </div>
              <div class="col-12"></div>
            </div>
            <div class="col-12 col-md-10 mt-4">
              <div class="div-showInfoUser">
                <div class="d-flex justify-content-center pt-5">
                  <iconUser />
                </div>
                <div class="p-4 text-left">
                  <table class="table table-borderless text-white">
                    <td>ชื่อ</td>
                    <td
                      style="text-align: left"
                    >{{dataPrepareSend.first_name}} {{dataPrepareSend.last_name}}</td>
                    <tr>
                      <td>เบอร์ติดต่อ</td>
                      <td style="text-align: left">{{dataPrepareSend.telephone}}</td>
                    </tr>
                    <tr>
                      <td>ตำแหน่ง</td>
                      <td style="text-align: left">
                        <span
                          v-for="(role, index) in dataPrepareSend.hc_role"
                          :key="index"
                        >{{role.role_name}}&#32;</span>
                      </td>
                    </tr>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-12 col-md-6">
          <div class="row mt-5">
            <div class="col-12 text-header">กรอกข้อมูลส่วนตัว</div>
            <div class="col-12">
              <div class="form-group" style="margin-top:48px;">
                <div class="text-left mb-2">
                  <div class="row">
                    <div class="col-12 col-md-6">
                      <label for="firstName">ชื่อจริง</label>
                      <input
                        v-model="dataPrepareSend.first_name"
                        type="text"
                        class="form-control"
                        id="firstName"
                        placeholder="ชื่อจริง"
                      />
                    </div>
                    <div class="col-12 col-md-6">
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
                        placeholder="0800000000"
                        v-model="dataPrepareSend.telephone"
                      />
                    </div>
                    <div class="col-12 col-md-6 mt-3">
                      <label for="inputHNNumber">เลขบัตรประชาชน / เลขบุคคลากร</label>
                      <input
                        v-model="dataPrepareSend.hn_number"
                        type="number"
                        class="form-control"
                        id="inputHNNumber"
                      />
                    </div>
                    <div class="col-12 col-md-6 mt-3">
                      <label for="inputPassword">รหัสผ่าน</label>
                      <input
                        v-model="dataPrepareSend.password"
                        type="password"
                        class="form-control"
                        id="inputPassword"
                      />
                    </div>
                    <div class="col-12 col-md-6 mt-3">
                      <label for="inputConfirmPassword">ยืนยันรหัสผ่าน</label>
                      <input type="password" class="form-control" id="inputConfirmPassword" />
                    </div>
                    <div class="col-12 mt-3">
                      <label for="inputRole">ตำแหน่ง</label>
                      <div class="input-group">
                        <select
                          v-model="selectDropDown"
                          class="custom-select"
                          id="inputGroupSelect04"
                        >
                          <option value selected disabled>-- กรุณาเลือกตำแหน่ง --</option>
                          <option
                            v-for="(role, index) in dataFetch.hc_role"
                            :key="index"
                            :value="role"
                          >{{role.role_name}}</option>
                        </select>
                        <div class="input-group-append">
                          <button
                            @click="addRole()"
                            class="btn btn-primary font-weight-bold"
                            type="button"
                          >เพิ่ม +</button>
                        </div>
                      </div>
                    </div>
                    <div class="col-12 mt-3" v-if="alertHcRole()">
                      <div
                        role="alert"
                        class="alert alert-warning text-center"
                      >กรุณาเลือกตำแหน่งให้เรียบร้อย</div>
                    </div>
                    <div class="col-12 mt-3">
                      <button
                        v-for="(selectRole, index) in dataPrepareSend.hc_role"
                        :key="index"
                        @click="removeRole(selectRole)"
                        class="btn div-showTag text-white text-left m-1"
                      >
                        <span class="mt-4 mb-4">
                          {{selectRole.role_name}}
                          <i class="fas fa-times-circle ml-3"></i>
                        </span>
                      </button>
                    </div>
                  </div>
                  {{dataPrepareSend}}
                </div>
                <button
                  @click="sendToBackend"
                  class="btn btn-primary btnBlock btnConfirm fixed-button text-center mt-4 mb-4"
                >เสร็จสิ้น</button>
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
import logoHeader from "@/components/svg/logoHeader.vue";
import iconUser from "@/components/svg/icon/iconUser.vue";
import { errorSWAL } from "@/utility/swal.js";
import { VclFacebook, VclList } from "vue-content-loading";

export default {
  data() {
    return {
      loading: false,
      selectDropDown: null,
      dataPrepareSend: {
        account_id: "",
        first_name: "",
        last_name: "",
        hn_number: "",
        email: "",
        telephone: "",
        password: "",
        hc_role: [],
      },
      dataFetch: {
        hc_role: [],
      },
    };
  },

  async mounted() {
    this.loading = true;
    try {
      await axios
        .get(
          `${process.env.VUE_APP_BACKEND_URL}/admin/register/getnewemployee?account_id=${this.$route.query.account_id}&token=${this.$route.query.token}`
        )
        .then((res) => {
          this.dataPrepareSend.account_id = res.data.account_id;
          this.dataPrepareSend.first_name = res.data.first_name;
          this.dataPrepareSend.last_name = res.data.last_name;
          this.dataPrepareSend.email = res.data.email;
          this.dataFetch.hc_role = res.data.hc_role;
          this.loading = false;
        });
    } catch (error) {
      console.log("===== Backend-error ======");
      console.error(error.response);
      this.$swal({ ...errorSWAL });
    }
  },

  methods: {
    sendToBackend() {
      if (
        this.dataPrepareSend.account_id != "" &&
        this.dataPrepareSend.first_name != "" &&
        this.dataPrepareSend.last_name != "" &&
        this.dataPrepareSend.hn_number != "" &&
        this.dataPrepareSend.email != "" &&
        this.dataPrepareSend.telephone != "" &&
        this.dataPrepareSend.password != "" &&
        this.dataPrepareSend.hc_role.length != 0
      ) {
        let arrayRoleId = [];
        this.dataPrepareSend.hc_role.forEach((role) => {
          arrayRoleId.push(role.rn_id);
        });
        alert(arrayRoleId);







        
      } else {
        this.$swal({
          icon: "warning",
          title: "คำเตือน",
          text: "กรุณากรอกข้อมูลให้ครบ",
        });
      }
    },
    addRole() {
      if (this.selectDropDown != null) {
        this.dataPrepareSend.hc_role.push(this.selectDropDown);
        this.dataFetch.hc_role = Object.values(
          Object.fromEntries(
            Object.entries(this.dataFetch.hc_role).filter(
              ([key, val]) => val.rn_id !== this.selectDropDown.rn_id
            )
          )
        );
        this.selectDropDown = null;
      }
    },
    removeRole(selectRole) {
      this.dataPrepareSend.hc_role = Object.values(
        Object.fromEntries(
          Object.entries(this.dataPrepareSend.hc_role).filter(
            ([key, val]) => val.rn_id !== selectRole.rn_id
          )
        )
      );
      this.dataFetch.hc_role.push(selectRole);
    },
    alertHcRole() {
      if (this.dataPrepareSend.hc_role.length != 0) {
        return false;
      }
      return true;
    },
  },
  components: {
    logoHeader,
    iconUser,
    VclFacebook,
    VclList,
  },
};
</script>

<style scoped>
.text-header {
  font-weight: bold;
  font-size: 30px;
  line-height: 54px;
  color: #5e65a1;
}
.text-title {
  font-weight: bold;
  font-size: 18px;
  line-height: 27px;
  color: #444444;
}
.iconCenter {
  padding-top: 67px;
}
.div-showInfoUser {
  background: #5e65a1;
  box-shadow: 0px 4px 8px #e4e7ff;
  border-radius: 30px;
  font-weight: bold;
  font-size: 18px;
}
.div-showTag {
  background: #5e65a1;
  border-radius: 20px;
}
</style>
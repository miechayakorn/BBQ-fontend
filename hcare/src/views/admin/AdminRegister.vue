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
                <br />Manage Your Patients Easily ! <br />Paper Less
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
                    <td style="text-align: left">
                      {{ dataPrepareSend.prefix }}
                      {{ dataPrepareSend.first_name }}
                      {{ dataPrepareSend.last_name }}
                    </td>
                    <tr>
                      <td>เบอร์ติดต่อ</td>
                      <td style="text-align: left">
                        {{ dataPrepareSend.telephone }}
                      </td>
                    </tr>
                    <tr>
                      <td>เลขบุคลากร</td>
                      <td style="text-align: left">
                        {{ dataPrepareSend.hn_number }}
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
              <div class="form-group" style="margin-top: 48px">
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
                    <div class="col-12 col-md-6 mt-3">
                      <label for="inputPassword">รหัสผ่าน</label>
                      <input
                        type="password"
                        id="inputPassword"
                        v-model="dataPrepareSend.password"
                        :class="
                          checkPasswordMatch()
                            ? 'form-control'
                            : 'form-control is-invalid'
                        "
                        placeholder="รหัสผ่าน"
                        required
                      />
                      <div class="invalid-feedback">
                        กรุณากรอกรหัสผ่านให้ตรงกัน
                      </div>
                    </div>
                    <div class="col-12 col-md-6 mt-3">
                      <label for="inputConfirmPassword">ยืนยันรหัสผ่าน</label>
                      <input
                        type="password"
                        placeholder="ยืนยันรหัสผ่าน"
                        v-model="confirmpassword"
                        :class="
                          checkPasswordMatch()
                            ? 'form-control'
                            : 'form-control is-invalid'
                        "
                        id="inputConfirmPassword"
                      />
                      <div class="invalid-feedback">
                        กรุณากรอกรหัสผ่านให้ตรงกัน
                      </div>
                    </div>
                  </div>
                </div>
                <button
                  @click="sendToBackend"
                  class="btn btn-primary btnBlock btnConfirm fixed-button text-center mt-4 mb-4"
                >
                  เสร็จสิ้น
                </button>
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
      confirmpassword: "",
      dataPrepareSend: {
        prefix: "",
        account_id: "",
        first_name: "",
        last_name: "",
        hn_number: "",
        email: "",
        telephone: "",
        password: ""
      }
    };
  },

  async mounted() {
    this.loading = true;
    try {
      await axios
        .get(
          `${process.env.VUE_APP_BACKEND_URL}/admin/register/getnewemployee?account_id=${this.$route.query.account_id}&token=${this.$route.query.token}`
        )
        .then(res => {
          if (res.status == 200) {
            this.dataPrepareSend.account_id = res.data.account_id;
            this.dataPrepareSend.first_name = res.data.first_name;
            this.dataPrepareSend.last_name = res.data.last_name;
            this.dataPrepareSend.email = res.data.email;
            this.loading = false;
          } else if (res.status == 202) {
            this.$swal({
              icon: "warning",
              title: "คำเตือน",
              text: "ระบบได้สร้างข้อมูลของท่านเรียบร้อยแล้ว"
            }).then(result => {
              this.$router.push("/admin/dashboard");
            });
          }
        });
    } catch (error) {
      console.log("===== Backend-error ======");
      console.error(error.response);
      this.$swal({ ...errorSWAL }).then(result => {
        this.$router.push("/");
      });
    }
  },

  methods: {
    checkPasswordMatch() {
      if (this.dataPrepareSend.password == "" || this.confirmpassword == "") {
        return true;
      } else if (this.dataPrepareSend.password == this.confirmpassword) {
        return true;
      } else {
        return false;
      }
    },
    async sendToBackend() {
      if (this.dataPrepareSend.password != "" && this.confirmpassword != "") {
        if (
          this.dataPrepareSend.account_id != "" &&
          this.dataPrepareSend.prefix != "" &&
          this.dataPrepareSend.first_name != "" &&
          this.dataPrepareSend.last_name != "" &&
          this.dataPrepareSend.hn_number != "" &&
          this.dataPrepareSend.email != "" &&
          this.dataPrepareSend.telephone.length >= 9 &&
          this.dataPrepareSend.password != "" &&
          this.checkPasswordMatch()
        ) {
          try {
            await axios
              .post(
                `${process.env.VUE_APP_BACKEND_URL}/admin/register/savenewemployee`,
                {
                  account_id: this.dataPrepareSend.account_id,
                  prefix: this.dataPrepareSend.prefix,
                  first_name: this.dataPrepareSend.first_name,
                  last_name: this.dataPrepareSend.last_name,
                  hn_number: this.dataPrepareSend.hn_number,
                  email: this.dataPrepareSend.email,
                  telephone: this.dataPrepareSend.telephone,
                  password: this.dataPrepareSend.password
                },
                {
                  headers: {
                    Authorization: `Bearer ${this.$route.query.token}`
                  }
                }
              )
              .then(res => {
                if (res.status == 201) {
                  this.$swal({
                    confirmButtonText: "ตกลง",
                    timer: 7000,
                    icon: "success",
                    title: "การสร้างบัญชีสำเร็จ"
                  }).then(result => {
                    this.$router.push({
                      name: "AdminLogin",
                      query: {
                        email: this.dataPrepareSend.email
                      }
                    });
                  });
                } else if (res.status == 203) {
                  this.$swal({
                    icon: "warning",
                    title: "คำเตือน",
                    text: res.data
                  });
                } else {
                  console.log("===== Backend-error ======");
                  console.error(res.data[0]);
                  this.$swal({
                    icon: "warning",
                    title: "คำเตือน",
                    text: res.data[0].message
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
            text: "กรุณากรอกข้อมูลให้ครบ"
          });
        }
      } else {
        this.$swal({
          icon: "warning",
          title: "คำเตือน",
          text: "กรุณากรอกรหัสผ่าน"
        });
      }
    }
  },
  components: {
    logoHeader,
    iconUser,
    VclFacebook,
    VclList
  }
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

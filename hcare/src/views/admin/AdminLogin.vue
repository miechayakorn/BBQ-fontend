<template>
  <div>
    <div v-if="!visibleState">
      <logoHeader />
      <div class="container fixed-container mb-3 bg" style="margin-top: 40px">
        <div class="form-group text-left">
          <div class="col-xs-12" style="margin-top: 28px">
            <label for="InputName"> {{ $t("email") }}</label>
            <div class="input-group mb-3">
              <input
                type="text"
                id="InputName"
                class="form-control"
                v-model="email"
                :placeholder="$t('emailkmutt')"
                :class="
                  checkEmail() ? 'form-control' : 'form-control is-invalid'
                "
              />
              <div class="input-group-append">
                <span class="input-group-text">@mail.kmutt.ac.th</span>
              </div>
              <div class="invalid-feedback">
                {{ $t("noemail") }}
              </div>
            </div>
            <div class="form-group">
              <label for="InputPasswordAdmin"> {{ $t("password") }}</label>
              <div class="inner-addon left-addon">
                <i class="fas fa-key"></i>
                <input
                  type="password"
                  id="InputPasswordAdmin"
                  v-model="password"
                  class="form-control"
                  :placeholder="$t('password')"
                />
              </div>
            </div>
            <div class="text-right text-link" @click="visibleState = true">
              {{ $t("forgotpassword") }}
            </div>
            <div class="row" style="text-align: center">
              <div class="col-12">
                <button
                  @click="sendToBackend"
                  class="btn btn-primary btnBlock btnConfirm mt-5 fixed-button mb-2"
                >
                  <span style="font-weight: 900">Log In</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-else-if="visibleState">
      <div>
        <p
          style="
            font-weight: bold;
            font-size: 40px;
            line-height: 60px;
            text-align: center;
            color: #99a3ff;
            margin-top: 56px;
          "
        >
          {{ $t("resetpassword") }}
        </p>
        <div class="container fixed-container mb-3 bg" style="margin-top: 40px">
          <div class="form-group text-left">
            <label for="InputName">{{ $t("email") }}</label>
            <div class="input-group mb-3">
              <input
                type="text"
                id="InputName"
                class="form-control"
                v-model="forgetPassword.email"
                :placeholder="$t('emailkmutt')"
                :class="
                  checkEmailForget()
                    ? 'form-control'
                    : 'form-control is-invalid'
                "
              />
              <div class="input-group-append">
                <span class="input-group-text">@mail.kmutt.ac.th</span>
              </div>
              <div class="invalid-feedback">
                {{ $t("noemail") }}
              </div>
            </div>
          </div>
          <div class="row" style="text-align: center">
            <div class="col-12">
              <button
                @click="sendToBackendForgot"
                class="btn btn-primary btnBlock btnConfirm mt-5 fixed-button mb-2"
              >
                <span style="font-weight: 900"> {{ $t("sendemail") }}</span>
              </button>

              <div class="text-link" @click="visibleState = false">
                &#60; {{ $t("goback") }}
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
import CryptoJS from "crypto-js";
import logoHeader from "@/components/svg/logoHeader.vue";
import { waiting, errorSWAL, successSWAL } from "@/utility/swal.js";

export default {
  data() {
    return {
      visibleState: false,
      email: "",
      lastname_email: "@mail.kmutt.ac.th",
      password: "",
      forgetPassword: {
        email: "",
        lastname_email: "@mail.kmutt.ac.th",
      },
    };
  },
  mounted() {
    if (this.$route.query.email) {
      let emailKmutt = "@mail.kmutt.ac.th";
      let emailSub = this.$route.query.email.slice(
        this.$route.query.email.length - 17,
        this.$route.query.email.length
      );
      if (emailSub == emailKmutt) {
        this.email = this.$route.query.email.slice(
          0,
          this.$route.query.email.length - 17
        );
        this.lastname_email = emailKmutt;
      }
    }
  },
  methods: {
    checkEmailForgot() {
      if (this.forgetPassword.email == "") {
        return true;
      }
      let emailCheck = this.forgetPassword.email;
      let emailKmutt = "@mail.kmutt.ac.th";
      let emailSub = this.forgetPassword.email.slice(
        emailCheck.length - 17,
        emailCheck.length
      );
      if (emailSub == emailKmutt) {
        return false;
      }
      return true;
    },
    checkEmail() {
      if (this.email == "") {
        return true;
      }
      let emailCheck = this.email;
      let emailKmutt = "@mail.kmutt.ac.th";
      let emailSub = this.email.slice(
        emailCheck.length - 17,
        emailCheck.length
      );
      if (emailSub == emailKmutt) {
        return false;
      }
      return true;
    },
    checkEmailForget() {
      if (this.forgetPassword.email == "") {
        return true;
      }
      let emailCheck = this.forgetPassword.email;
      let emailKmutt = "@mail.kmutt.ac.th";
      let emailSub = this.forgetPassword.email.slice(
        emailCheck.length - 17,
        emailCheck.length
      );
      if (emailSub == emailKmutt) {
        return false;
      }
      return true;
    },
    async sendToBackend() {
      if (this.email != "" && this.password != "") {
        if (this.checkEmail()) {
          this.$swal({
            ...waiting,
            onOpen: () => {
              this.$swal.showLoading();
            },
          });
          this.email = this.email.split(" ").join("");

          await axios
            .post(`${process.env.VUE_APP_BACKEND_URL}/staff/login`, {
              email: `${this.email}${this.lastname_email}`,
              password: this.password,
            })
            .then((res) => {
              this.$store.state.token = res.data.token;
              this.$store.state.role = res.data.role;
              this.$store.state.user = {
                account_id: res.data.account_id,
                first_name: res.data.first_name,
                last_name: res.data.last_name,
                profile_picture: res.data.profile_picture,
              };

              //encrypt dataSetLocal
              let dataSetLocal = res.data;
              dataSetLocal.first_name = CryptoJS.AES.encrypt(
                dataSetLocal.first_name,
                process.env.VUE_APP_SECRET_KEY
              ).toString();
              dataSetLocal.last_name = CryptoJS.AES.encrypt(
                dataSetLocal.last_name,
                process.env.VUE_APP_SECRET_KEY
              ).toString();
              dataSetLocal.role = CryptoJS.AES.encrypt(
                dataSetLocal.role,
                process.env.VUE_APP_SECRET_KEY
              ).toString();
              if (dataSetLocal.profile_picture) {
                dataSetLocal.profile_picture = CryptoJS.AES.encrypt(
                  dataSetLocal.profile_picture,
                  process.env.VUE_APP_SECRET_KEY
                ).toString();
              }
              dataSetLocal.account_id = CryptoJS.AES.encrypt(
                dataSetLocal.account_id + "",
                process.env.VUE_APP_SECRET_KEY
              ).toString();

              localStorage.setItem("user", JSON.stringify(dataSetLocal));

              const redirectPath =
                this.$route.query.redirect || "/admin/dashboard";
              this.$router.push(redirectPath);
              this.$swal.close();
            })
            .catch((error) => {
              console.log("===== Backend-error ======");
              console.error(error);
              this.$swal({
                title: "คำเตือน",
                text: "รหัสผ่านไม่ถูกต้อง",
                icon: "warning",
              });
            });
        } else {
          this.email = "";
          this.$swal({
            icon: "warning",
            title: "คำเตือน",
            text: "ไม่ต้องกรอก @mail.kmutt.ac.th",
          });
        }
      } else {
        this.$swal({
          icon: "warning",
          title: "คำเตือน",
          text: "กรุณากรอกข้อมูลให้ครบ",
        });
      }
    },
    async sendToBackendForgot() {
      if (this.checkEmailForgot() == true) {
        if (this.forgetPassword.email != "") {
          this.$swal({
            ...waiting,
            onOpen: () => {
              this.$swal.showLoading();
            },
          });
          this.email = this.email.split(" ").join("");

          await axios
            .post(`${process.env.VUE_APP_BACKEND_URL}/admin/forgetpassword`, {
              email: `${this.forgetPassword.email}${this.forgetPassword.lastname_email}`,
            })
            .then((res) => {
              if (res.status == 200) {
                this.$swal({
                  icon: "success",
                  title: "รีเซ็ตรหัสผ่าน สำเร็จ!",
                  text:
                    "กรุณาตรวจสอบอีเมลของท่าน เพื่อทำการเปลี่ยนรหัสผ่านใหม่",
                });
              } else if (res.status == 202) {
                this.$swal({
                  icon: "warning",
                  title: "คำเตือน",
                  text: res.data,
                });
              }
            })
            .catch((error) => {
              console.log("===== Backend-error ======");
              console.error(error);
              this.$swal({
                ...errorSWAL,
              });
            });
        } else {
          this.$swal({
            icon: "warning",
            title: "คำเตือน",
            text: "กรุณากรอกข้อมูล",
          });
        }
      } else {
        this.forgetPassword.email = "";
        this.$swal({
          icon: "warning",
          title: "คำเตือน",
          text: "ไม่ต้องกรอก @mail.kmutt.ac.th",
        });
      }
    },
  },
  components: {
    logoHeader,
  },
};
</script>

<style>
.text-link {
  color: #99a3ff;
  cursor: pointer;
}

.inner-addon {
  position: relative;
}
.inner-addon .fas {
  position: absolute;
  padding: 10px;
  pointer-events: none;
}
.left-addon .fas {
  left: 0px;
}
.right-addon .fas {
  right: 0px;
}
.left-addon input {
  padding-left: 30px;
}
.right-addon input {
  padding-right: 30px;
}
</style>

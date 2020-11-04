<template>
  <div>
    <div v-if="!visibleState">
      <logoHeader />
      <div class="container fixed-container mb-3 bg" style="margin-top: 40px">
        <div class="form-group text-left">
          <div class="col-xs-12" style="margin-top: 28px">
            <div class="form-group text-left">
              <label for="InputName">Email</label>
              <div class="inner-addon left-addon">
                <i class="fas fa-user"></i>
                <input
                  type="text"
                  id="InputName"
                  v-model="email"
                  placeholder="อีเมล มหาวิทยาลัย"
                  :class="
                    checkEmail() ? 'form-control' : 'form-control is-invalid'
                  "
                />
                <div class="invalid-feedback">
                  ไม่กรอก @mail.kmutt.ac.th หรือ @kmutt.ac.th
                </div>
              </div>
            </div>
            <div class="form-group text-left">
              <div class="inner-addon left-addon">
                <select
                  v-model="lastname_email"
                  class="form-control"
                  style="font-weight: 500; font-size: 14px"
                >
                  <option value="@mail.kmutt.ac.th">@mail.kmutt.ac.th</option>
                  <option value="@kmutt.ac.th">@kmutt.ac.th</option>
                </select>
              </div>
            </div>
            <div class="form-group">
              <label for="InputName">Password</label>
              <div class="inner-addon left-addon">
                <i class="fas fa-key"></i>
                <input
                  type="password"
                  v-model="password"
                  class="form-control"
                  placeholder="รหัสผ่าน"
                />
              </div>
            </div>
            <div class="text-right text-link" @click="visibleState = true">
              Forgot your password?
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
          Forgot your password?
        </p>
        <div class="container fixed-container mb-3 bg" style="margin-top: 40px">
          <div class="form-group text-left">
            <label for="InputName">Email</label>
            <div class="inner-addon left-addon">
              <i class="fas fa-user"></i>
              <input
                type="text"
                id="InputName"
                v-model="forgetPassword.email"
                placeholder="อีเมล มหาวิทยาลัย"
                :class="
                  checkEmailForgot() ? 'form-control' : 'form-control is-invalid'
                "
              />
              <div class="invalid-feedback">
                ไม่กรอก @mail.kmutt.ac.th หรือ @kmutt.ac.th
              </div>
            </div>
          </div>
          <div class="form-group text-left">
            <div class="inner-addon left-addon">
              <select
                v-model="forgetPassword.lastname_email"
                class="form-control"
                style="font-weight: 500; font-size: 14px"
              >
                <option value="@mail.kmutt.ac.th">@mail.kmutt.ac.th</option>
                <option value="@kmutt.ac.th">@kmutt.ac.th</option>
              </select>
            </div>
          </div>
          <div class="row" style="text-align: center">
            <div class="col-12">
              <button
                @click="sendToBackendForgot"
                class="btn btn-primary btnBlock btnConfirm mt-5 fixed-button mb-2"
              >
                <span style="font-weight: 900">Send Email</span>
              </button>

              <div class="text-link" @click="visibleState = false">
                &#60; Go back to log in page
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
      let emailKmutt2 = "@kmutt.ac.th";
      let emailSub = this.$route.query.email.slice(
        this.$route.query.email.length - 17,
        this.$route.query.email.length
      );
      let emailSub2 = this.$route.query.email.slice(
        this.$route.query.email.length - 12,
        this.$route.query.email.length
      );
      if (emailSub == emailKmutt) {
        this.email = this.$route.query.email.slice(
          0,
          this.$route.query.email.length - 17
        );
        this.lastname_email = emailKmutt;
      } else if (emailSub2 == emailKmutt2) {
        this.email = this.$route.query.email.slice(
          0,
          this.$route.query.email.length - 12
        );
        this.lastname_email = emailKmutt2;
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
      let emailKmutt2 = "@kmutt.ac.th";
      let emailSub = this.forgetPassword.email.slice(
        emailCheck.length - 17,
        emailCheck.length
      );
      let emailSub2 = this.forgetPassword.email.slice(
        emailCheck.length - 12,
        emailCheck.length
      );
      if (emailSub == emailKmutt || emailSub2 == emailKmutt2) {
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
      let emailKmutt2 = "@kmutt.ac.th";
      let emailSub = this.email.slice(
        emailCheck.length - 17,
        emailCheck.length
      );
      let emailSub2 = this.email.slice(
        emailCheck.length - 12,
        emailCheck.length
      );
      if (emailSub == emailKmutt || emailSub2 == emailKmutt2) {
        return false;
      }
      return true;
    },
    async sendToBackend() {
      if (
        this.checkEmail() == true &&
        this.email != "" &&
        this.password != ""
      ) {
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
          text: "ไม่ต้องกรอก @mail.kmutt.ac.th หรือ @kmutt.ac.th",
        });
      }
    },
    async sendToBackendForgot(){
      
    }
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

/* enable absolute positioning */
.inner-addon {
  position: relative;
}

/* style icon */
.inner-addon .fas {
  position: absolute;
  padding: 10px;
  pointer-events: none;
}

/* align icon */
.left-addon .fas {
  left: 0px;
}
.right-addon .fas {
  right: 0px;
}

/* add padding  */
.left-addon input {
  padding-left: 30px;
}
.right-addon input {
  padding-right: 30px;
}
</style>

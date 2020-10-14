<template>
  <div class="form-group">
    <p class="font-weight-bold">{{ email }}</p>
    <p>
      <span style="font-weight: lighter; color: #888888"
        >กรุณานำ OTP ที่ได้รับจากอีเมลมากรอก</span
      >
    </p>
    <div class="col-12" style="margin-top: 28px">
      <div class="form-group text-left mt-2">
        <label for="InputOTP">OTP</label>
        <div class="inner-addon left-addon">
          <i class="fas fa-user"></i>
          <input
            type="number"
            pattern="[0-9]{1,4}"
            maxlength="4"
            id="InputOTP"
            class="form-control"
            placeholder="OTP"
            aria-describedby="otpSend"
            v-model="password"
          />
          <small
            @click="sendMailAgain"
            v-if="status == '401'"
            id="otpSend"
            class="form-text text-right"
            style="cursor: pointer"
            >Send OTP Again?</small
          >
        </div>
      </div>
      <div class="row">
        <div class="col-12">
          <button
            @click="sendToBackend"
            class="btn btn-primary btnBlock btnConfirm mt-5 fixed-button mb-2"
          >
            <span style="font-weight: 900">Confirm</span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import CryptoJS from "crypto-js";
import { waiting, errorSWAL } from "@/utility/swal.js";

export default {
  data() {
    return {
      password: "",
      status: "",
    };
  },
  props: {
    email: String,
  },
  methods: {
    sendMailAgain() {
      if (this.email != "") {
        this.$swal({
          ...waiting,
          onOpen: () => {
            this.$swal.showLoading();
          },
        });

        axios
          .post(`${process.env.VUE_APP_BACKEND_URL}/login`, {
            email: this.email,
          })
          .then((res) => {
            this.$emit("email", this.email);
            this.$swal.close();
          })
          .catch((error) => {
            console.log("===== Backend-error ======");
            console.error(error.response);
            this.$swal({
              title: "คำเตือน",
              text: "กรุณาลงทะเบียนเพื่อใช้งาน",
              icon: "warning",
            });
          });
      } else {
        this.$swal({ ...errorSWAL });
      }
    },
    sendToBackend() {
      if (this.email && this.password) {
        axios
          .post(`${process.env.VUE_APP_BACKEND_URL}/login/confirm`, {
            email: this.email,
            password: this.password,
          })
          .then((res) => {
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
          })
          .catch((error) => {
            console.log("===== Backend-error ======");
            console.error(error.response);
            this.status = error.response.status;
            this.$swal({
              icon: "warning",
              title: "OTP ไม่ถูกต้อง",
            });
          });
      } else {
        this.$router.push("/");
      }
    },
  },
};
</script>

<style></style>

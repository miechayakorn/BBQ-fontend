<template>
  <div class="form-group">
    {{ email }}
    <div class="col-12" style="margin-top:28px">
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
            style="cursor: pointer;"
          >
            Send OTP Again?
          </small>
        </div>
      </div>
      <div class="row">
        <div class="col-12">
          <button
            @click="sendToBackend"
            class="btn btn-primary btnBlock btnConfirm mt-5 fixed-button mb-2"
          >
            <span style="font-weight:900">Confirm</span>
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
      status: ""
    };
  },
  props: {
    email: String
  },
  methods: {
    sendMailAgain() {
      if (this.email != "") {
        this.$swal({
          ...waiting,
          onOpen: () => {
            this.$swal.showLoading();
          }
        });

        axios
          .post(`${process.env.VUE_APP_BACKEND_URL}/login`, {
            email: this.email
          })
          .then(res => {
            this.$emit("email", this.email);
            this.$swal.close();
          })
          .catch(error => {
            console.log("===== Backend-error ======");
            console.error(error.response);
            this.$swal({
              title: "คำเตือน",
              text: "กรุณาลงละเบียนเพื่อใช้งาน",
              icon: "warning"
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
            password: this.password
          })
          .then(res => {
            //encrypt dataSetLocal
            let dataSetLocal = res.data;
            dataSetLocal.first_name = CryptoJS.AES.encrypt(
              dataSetLocal.first_name,
              "hcare6018"
            ).toString();
            dataSetLocal.last_name = CryptoJS.AES.encrypt(
              dataSetLocal.last_name,
              "hcare6018"
            ).toString();
            localStorage.setItem("user", JSON.stringify(dataSetLocal));

            this.$router.push("/");
            this.$router.go();
          })
          .catch(error => {
            console.log("===== Backend-error ======");
            console.error(error.response);
            this.status = error.response.status;
            this.$swal({
              icon: "warning",
              title: "OTP ไม่ถูกต้อง"
            });
          });
      } else {
        this.$router.push("/");
      }
    }
  }
};
</script>

<style></style>

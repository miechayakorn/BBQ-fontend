<template>
  <div class="form-group">
    <div class="col-12" style="margin-top: 28px">
      <div class="form-group text-left">
        <label for="InputName">Email</label>
        <div class="input-group mb-3">
          <input
            type="text"
            class="form-control"
            v-model="email"
            :placeholder="$t('KMUTTEmail')"
            :class="checkEmail() ? 'form-control' : 'form-control is-invalid'"
          />
          <div class="input-group-append">
            <span class="input-group-text"
              >@mail.kmutt.ac.th</span
            >
          </div>
          <div class="invalid-feedback">
            {{ $t("noemail") }}
          </div>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-12">
        <button
          @click="sendToBackend"
          class="btn btn-primary btnBlock btnConfirm mt-4 fixed-button"
        >
          <span style="font-weight: 900">Send OTP</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { waiting, errorSWAL } from "@/utility/swal.js";

export default {
  data() {
    return {
      email: "",
      lastname_email: "@mail.kmutt.ac.th"
    };
  },
  methods: {
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
    sendToBackend() {
      if (this.checkEmail() == true && this.email != "") {
        this.$swal({
          ...waiting,
          onOpen: () => {
            this.$swal.showLoading();
          }
        });

        this.email = this.email.split(" ").join("");

        axios
          .post(`${process.env.VUE_APP_BACKEND_URL}/login`, {
            email: `${this.email.split(" ").join("")}${this.lastname_email}`
          })
          .then(res => {
            console.log(res);
            if (res.status == 200) {
              let email2 = this.email + this.lastname_email;
              this.$emit("email", email2);
              this.$swal.close();
            }
          })
          .catch(error => {
            console.log("===== Backend-error ======");
            console.error(error.response);
            if (error.response.status == 403) {
              this.$swal({
                title: "คำเตือน",
                text: "กรุณาเข้าสู่ระบบสำหรับบุคลากร Healthcare",
                icon: "warning"
              }).then(result => {
                if (result.value) {
                  this.$router.push({
                    name: "AdminLogin",
                    query: {
                      email: `${this.email.split(" ").join("")}${
                        this.lastname_email
                      }`,
                      redirect: this.$route.query.redirect
                    }
                  });
                }
              });
            } else {
              this.$swal({
                title: "คำเตือน",
                text: "กรุณาลงทะเบียนเพื่อใช้งาน",
                icon: "warning"
              });
            }
          });
      } else {
        this.email = "";
        this.$swal({
          icon: "warning",
          title: "คำเตือน",
          text: "ไม่ต้องกรอก @mail.kmutt.ac.th"
        });
      }
    }
  }
};
</script>

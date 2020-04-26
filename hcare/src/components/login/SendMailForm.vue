<template>
  <div class="form-group">
    <div class="col-12" style="margin-top:28px">
      <div class="form-group text-left">
        <label for="InputName">Email</label>
        <div class="inner-addon left-addon">
          <i class="fas fa-user"></i>
          <input
            type="text"
            id="InputName"
            v-model="email"
            :class="
                  checkEmail() ? 'form-control' : 'form-control is-invalid'
                "
            placeholder="อีเมล มหาวิทยาลัย"
          />
          <div class="invalid-feedback">กรุณากรอก email ลงท้าย @mail.kmutt.ac.th</div>
        </div>
      </div>
    </div>
      <div class="row">
        <div class="col-12">
          <button
            @click="sendToBackend"
            class="btn btn-primary btnBlock btnConfirm mt-5 fixed-button mb-2"
          >
            <span style="font-weight:900">Send OTP</span>
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
      email: ""
      // ,password: ""
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
      if (emailSub != emailKmutt) {
        return false;
      }
      return true;
    },
    sendToBackend() {
      if (
        this.checkEmail() == true &&
        this.email != ""
      ) {
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
            this.$swal.close()
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
        this.email = "";
        this.$swal({
          icon: "warning",
          title: "คำเตือน",
          text: "กรุณากรอกอีเมล มหาวิทยาลัย"
        });
      }
    }
  },
  
};
</script>

<style>
</style>
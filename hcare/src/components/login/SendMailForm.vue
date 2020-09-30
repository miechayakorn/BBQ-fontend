<template>
  <div class="form-group">
    <div class="col-12" style="margin-top: 28px">
      <div class="form-group text-left">
        <label for="InputName">Email</label>
        <div class="inner-addon left-addon">
          <i class="fas fa-user"></i>
          <input
            type="text"
            id="InputName"
            v-model="email"
            placeholder="อีเมล มหาวิทยาลัย"
            :class="checkEmail() ? 'form-control' : 'form-control is-invalid'"
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
    </div>
    <div class="row">
      <div class="col-12">
        <button
          @click="sendToBackend"
          class="btn btn-primary btnBlock btnConfirm mt-5 fixed-button mb-2"
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
      lastname_email: "@mail.kmutt.ac.th",
    };
  },
  methods: {
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
    sendToBackend() {
      if (this.checkEmail() == true && this.email != "") {
        this.$swal({
          ...waiting,
          onOpen: () => {
            this.$swal.showLoading();
          },
        });

        this.email = this.email.split(" ").join("");

        axios
          .post(`${process.env.VUE_APP_BACKEND_URL}/login`, {
            email: `${this.email.split(" ").join("")}${this.lastname_email}`,
          })
          .then((res) => {
            console.log(res);
            if (res.status == 200) {
              let email2 = this.email + this.lastname_email;
              this.$emit("email", email2);
              this.$swal.close();
            }
          })
          .catch((error) => {
            console.log("===== Backend-error ======");
            console.error(error.response);
            if (error.response.status == 403) {
              this.$swal({
                title: "คำเตือน",
                text: "กรุณาเข้าสู่ระบบสำหรับบุคลากร Healthcare",
                icon: "warning",
              }).then((result) => {
                if (result.value) {
                  this.$router.push({
                    name: "AdminLogin",
                    query: {
                      email: `${this.email.split(" ").join("")}${
                        this.lastname_email
                      }`,
                      redirect: this.$route.query.redirect,
                    },
                  });
                }
              });
            } else {
              this.$swal({
                title: "คำเตือน",
                text: "กรุณาลงทะเบียนเพื่อใช้งาน",
                icon: "warning",
              });
            }
          });
      } else {
        this.email = "";
        this.$swal({
          icon: "warning",
          title: "คำเตือน",
          text: "ไม่ต้องกรอก @mail.kmutt.ac.th หรือ @kmutt.ac.th ในช่องอีเมล",
        });
      }
    },
  },
};
</script>

<style>
</style>

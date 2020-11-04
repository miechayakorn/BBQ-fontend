<template>
  <div class="container fixed-container mb-3" style="margin-top: 40px">
    <div class="form-group text-left">
      <h1 style="font-size: 28px; font-weight: 900">{{ $t("register") }}</h1>
      <form>
        <div class="col-xs-12" style="margin-top: 28px">
          <div class="form-group">
            <label for="InputFirstName">ชื่อ</label>
            <input
              type="text"
              id="InputFirstName"
              v-model="dataUserInfo.first_name"
              class="form-control"
              placeholder="ชื่อ"
              required
            />
          </div>
          <div class="form-group">
            <label for="InputLastName">นามสกุล</label>
            <input
              type="text"
              id="InputLastName"
              v-model="dataUserInfo.last_name"
              class="form-control"
              placeholder="นามสกุล"
              required
            />
          </div>
          <div class="form-group">
            <label for="InputHN">รหัสนักคึกษา / หมายเลขบุคลากร มจธ.</label>
            <input
              type="text"
              id="InputHN"
              v-model="dataUserInfo.hn_number"
              class="form-control"
              placeholder="รหัส / หมายเลข"
              required
            />
          </div>
          <div class="form-group">
            <label for="InputEmail">อีเมล</label>
            <input
              v-if="this.$route.query.email"
              type="email"
              v-model="dataUserInfo.email"
              id="InputEmail"
              disabled
              class="form-control"
              placeholder="example@mail.kmutt.ac.th"
              required
            />
            <input
              v-else
              type="email"
              v-model="dataUserInfo.email"
              id="InputEmail"
              :class="checkEmail() ? 'form-control' : 'form-control is-invalid'"
              placeholder="example@mail.kmutt.ac.th"
              required
            />
            <div class="invalid-feedback">
              กรุณากรอก email ลงท้าย @mail.kmutt.ac.th หรือ @kmutt.ac.th
            </div>
          </div>
          <div class="form-group">
            <label for="InputTel">เบอร์โทรศัพท์</label>
            <input
              type="tel"
              id="InputTel"
              v-model="dataUserInfo.telephone"
              class="form-control"
              placeholder="เบอร์โทรศัพท์"
              required
            />
          </div>
          <div class="form-group form-check">
            <input
              type="checkbox"
              :class="
                checkTermsofservice()
                  ? 'form-check-input'
                  : 'form-check-input is-invalid'
              "
              id="termsofservice"
              v-model="termsofservice"
            />
            <label class="form-check-label" for="termsofservice"
              >ข้อตกลงการให้บริการ
              <router-link to="/terms-of-service"
                >terms of service</router-link
              ></label
            >
            <div class="invalid-feedback">กรุณากดยอมรับ</div>
          </div>
          <div class="row">
            <div class="col-12 text-center">
              <button
                @click="sendToBackend"
                class="btn btn-primary btnBlock btnConfirm mt-5 fixed-button mb-2"
                style="font-weight: 900"
              >
                {{ $t("register") }}
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { waiting, errorSWAL } from "@/utility/swal.js";

export default {
  data() {
    return {
      termsofservice: true,
      dataUserInfo: {
        first_name: "",
        last_name: "",
        email: "",
        telephone: "",
        hn_number: "",
      },
    };
  },
  mounted() {
    if (this.$route.query.email) {
      this.dataUserInfo.email = this.$route.query.email;
    }
  },
  methods: {
    checkEmail() {
      if (this.dataUserInfo.email.length == 0) {
        return true;
      }
      let email = this.dataUserInfo.email;
      let emailKmutt = "@mail.kmutt.ac.th";
      let emailKmuttAnother = "@kmutt.ac.th";
      let emailSub = this.dataUserInfo.email.slice(
        email.length - 17,
        email.length
      );
      let emailSubAnother = this.dataUserInfo.email.slice(
        email.length - 12,
        email.length
      );
      if (emailSub == emailKmutt || emailSubAnother == emailKmuttAnother) {
        return true;
      }

      return false;
    },
    checkForm() {
      if (this.dataUserInfo.first_name.length < 3) {
        return false;
      } else if (this.dataUserInfo.last_name.length < 3) {
        return false;
      } else if (this.dataUserInfo.email.length < 3) {
        return false;
      } else if (this.dataUserInfo.telephone.length < 9) {
        return false;
      } else if (this.dataUserInfo.hn_number.length < 5) {
        return false;
      }
      if (this.checkEmail()) {
        return true;
      } else {
        return false;
      }
    },
    checkTermsofservice() {
      return this.termsofservice;
    },
    async sendToBackend() {
      if (this.checkTermsofservice()) {
        if (this.dataUserInfo.email.length != 0 && this.checkForm()) {
          this.$swal({
            ...waiting,
            onOpen: () => {
              this.$swal.showLoading();
            },
          });

          await axios
            .post(`${process.env.VUE_APP_BACKEND_URL}/register`, {
              first_name: this.dataUserInfo.first_name.split(" ").join(""),
              last_name: this.dataUserInfo.last_name.split(" ").join(""),
              email: this.dataUserInfo.email.split(" ").join(""),
              telephone: this.dataUserInfo.telephone.split(" ").join(""),
              hn_number: this.dataUserInfo.hn_number.split(" ").join(""),
            })
            .then((res) => {
              this.$swal({
                icon: "success",
                title: "ลงทะเบียนสำเร็จ",
                html:
                  "<hr/>" +
                  '<span style="font-size: 18px; text-decoration: underline; color:#FA3D3D"> กรุณาตรวจสอบอีเมล เพื่อทำการยืนยันตัวตน </span>',
              }).then((result) => {
                if (result.value) {
                  this.$router.push("/");
                }
              });
            })
            .catch((error) => {
              console.log("===== Backend-error ======");
              console.error(error.response);
              this.$swal({ ...errorSWAL });
            });
        } else {
          this.$swal({
            icon: "warning",
            title: "คำเตือน",
            text: "กรุณากรอกข้อมูลให้ถูกต้อง",
          });
        }
      } else {
        this.$swal({
          icon: "warning",
          title: "คำเตือน",
          text: "กรุณากดยอมรับ ข้อตกลงการให้บริการ terms of service",
        });
      }
    },
  },
};
</script>
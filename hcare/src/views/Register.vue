<template>
  <div class="container fixed-container mb-3 bg" style="margin-top:40px">
    <div class="form-group text-left">
      <h1 style="font-size: 28px; font-weight: 900;">Register</h1>
      <form>
        <div class="col-xs-12" style="margin-top:28px">
          <div class="form-group">
            <label for="InputName">ชื่อ</label>
            <input
              type="text"
              id="InputName"
              v-model="dataUserInfo.first_name"
              class="form-control"
              placeholder="ชื่อ"
              required
            />
          </div>
          <div class="form-group">
            <label for="InputName">นามสกุล</label>
            <input
              type="text"
              v-model="dataUserInfo.last_name"
              class="form-control"
              placeholder="นามสกุล"
              required
            />
          </div>
          <div class="form-group">
            <label for="InputName">รหัสนักคึกษา / หมายเลขบุคลากร มจธ.</label>
            <input
              type="text"
              v-model="dataUserInfo.hn_number"
              class="form-control"
              placeholder="รหัส / หมายเลข"
              required
            />
          </div>
          <div class="form-group">
            <label for="InputEmail">อีเมล</label>
            <input
              type="email"
              v-model="dataUserInfo.email"
              id="InputEmail"
              :class="checkEmail() ? 'form-control' : 'form-control is-invalid'"
              placeholder="example@mail.kmutt.ac.th"
              required
            />
            <div class="invalid-feedback">กรุณากรอก email ลงท้าย @mail.kmutt.ac.th หรือ @kmutt.ac.th</div>
          </div>
          <div class="form-group">
            <label for="InputTel">เบอร์โทรศัพท์</label>
            <input
              type="tel"
              v-model="dataUserInfo.telephone"
              class="form-control"
              placeholder="เบอร์โทรศัพท์"
              required
            />
          </div>
          <div class="row" style="text-align: center;">
            <div class="col-12">
              <button
                @click="sendToBackend"
                type="button"
                class="btn btn-primary btnBlock btnConfirm mt-5 fixed-button mb-2"
                style="font-weight:900"
              >Register</button>
            </div>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { waiting, errorSWAL, successSWAL } from "@/utility/swal.js";

export default {
  data() {
    return {
      dataUserInfo: {
        first_name: "",
        last_name: "",
        email: "",
        telephone: "",
        hn_number: "",
      },
    };
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
      if (this.dataUserInfo.first_name.length > 3) {
        return false;
      } else if (this.dataUserInfo.last_name.length > 3) {
        return false;
      } else if (this.dataUserInfo.email.length > 3) {
        return false;
      } else if (this.dataUserInfo.telephone.length > 9) {
        return false;
      } else if (this.dataUserInfo.hn_number.length > 5) {
        return false;
      }
      if (this.checkEmail()) {
        return true;
      } else {
        return false;
      }
    },
    sendToBackend() {
      if (this.checkForm()) {
        this.$swal({
          ...waiting,
          onOpen: () => {
            this.$swal.showLoading();
          },
        });

        axios
          .post(`${process.env.VUE_APP_BACKEND_URL}/register`, {
            first_name: this.dataUserInfo.first_name,
            last_name: this.dataUserInfo.last_name,
            email: this.dataUserInfo.email,
            telephone: this.dataUserInfo.telephone,
            hn_number: this.dataUserInfo.hn_number,
          })
          .then((res) => {
            this.$swal({
              icon: "success",
              title: "ลงทะเบียนสำเร็จ",
              text: "กรุณาตรวจสอบอีเมล เพื่อทำการยืนยันตัวตน",
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
    },
  },
};
</script>

<style>
@media (max-width: 776px) {
  .fixed-button {
    width: 100%;
    height: 48px;
  }
}
@media (min-width: 776px) {
  .fixed-button {
    width: 320px;
    text-align: center;
    position: relative;
    height: 48px;
  }
}
@media (min-width: 900px) {
  .fixed-container {
    width: 720px;
  }
}
.bg {
  background-color: #f9f9fc;
}
::placeholder {
  font-size: 16px;
  font-weight: 100;
}
.btnConfirm {
  border: 1px solid #99a3ff;
  box-shadow: 0px 3px 8px #b6bdfe;
  border-radius: 31px;
}
</style>

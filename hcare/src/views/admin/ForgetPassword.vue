<template>
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
        <label for="InputPass">New password</label>
        <input
          type="password"
          id="InputPass"
          v-model="password"
          placeholder="กรุณาพิมพ์รหัสผ่าน"
          :class="
            checkPasswordEqual() ? 'form-control' : 'form-control is-invalid'
          "
        />
        <div class="invalid-feedback">รหัสผ่านไม่ตรงกัน</div>
      </div>
      <div class="form-group text-left">
        <label for="InputPassNew">Confirm password</label>
        <input
          type="password"
          id="InputPassNew"
          v-model="confirmPassword"
          placeholder="กรุณาพิมพ์รหัสผ่านอีกครั้ง"
          :class="
            checkPasswordEqual() ? 'form-control' : 'form-control is-invalid'
          "
        />
        <div class="invalid-feedback">รหัสผ่านไม่ตรงกัน</div>
      </div>
      <div class="row" style="text-align: center">
        <div class="col-12">
          <button
            @click="sendTobackend"
            class="btn btn-primary btnBlock btnConfirm mt-2 fixed-button"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      password: "",
      confirmPassword: "",
    };
  },
  mounted() {
    if (this.$route.query.token) {
    } else {
      this.$router.push("/");
    }
  },
  methods: {
    checkPasswordEqual() {
      if (this.password == "" || this.confirmPassword == "") {
        return true;
      } else if (this.password == this.confirmPassword) {
        return true;
      } else {
        return false;
      }
    },
    async sendTobackend() {
      if (this.password.length >= 6 && this.confirmPassword.length >= 6) {
        if (this.checkPasswordEqual() == true) {
          this.$swal({
            title: "กรุณารอสักครู่",
            allowEscapeKey: false,
            allowOutsideClick: false,
            onOpen: () => {
              this.$swal.showLoading();
            },
          });

          await axios
            .post(
              `${process.env.VUE_APP_BACKEND_URL}/admin/forgetpassword/confirm`,
              {
                token: this.$route.query.token,
                password: this.password,
              }
            )
            .then((res) => {
              if (res.status == 200) {
                this.$swal({
                  icon: "success",
                  title: "เปลี่ยนรหัสผ่าน สำเร็จ!",
                }).then((result) => {
                  this.$router.push("/admin/login");
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
            text: "กรุณากรอกรหัสผ่านให้ตรงกัน",
          });
        }
      } else {
        this.$swal({
          icon: "warning",
          title: "คำเตือน",
          text: "รหัสผ่านต้องมี 6 ตัว ขึ้นไป",
        });
      }
    },
  },
};
</script>
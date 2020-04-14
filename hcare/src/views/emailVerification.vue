<template>
  <div class="container">
    <div class="row" style="text-align: center;">
      <div class="mt-5 col-12">
        {{ status }}
      </div>
      <div class="col-12">
        <button
          @click="confirm"
          class="btn btn-primary btnBlock btnConfirm mt-5 fixed-button mb-2"
        >
          <span style="font-weight:900">confirm email</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      status: "สถานะ"
    };
  },
  methods: {
    confirm() {
      axios
        //===================== ยังไม่รู้ backend ==============================
        .post(`${process.env.VUE_APP_BACKEND_URL}/booking===`, {
          //   hn_number: this.username,
          //   password: this.password
        })
        .then(res => {
          this.$swal({
            toast: true,
            position: "top-end",
            showConfirmButton: false,
            timer: 3000,
            icon: "success",
            title: "ยืนยัน email สำเร็จ"
          });
          this.$router.push("/");
        })
        .catch(error => {
          console.log("===== Backend-error ======");
          console.error(error.response);
          this.status = error.response.data.error.message
        });
    }
  }
};
</script>

<style></style>

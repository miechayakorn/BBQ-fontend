<template>
  <div>
    <logoHeader />
    <div class="container">
      <div class="row" style="text-align: center;">
        <div class="mt-5 col-12">
          <div v-if="status == 401" class="alert alert-danger" role="alert">
            {{ message }}
          </div>
          <!--<div
            v-if="status == 304"
            class="alert alert-warning"
            role="alert"
          >This token is not available.</div>-->
          <div v-if="status == 200" class="alert alert-success" role="alert">
            {{ message }}
          </div>
          <!-- <router-link :to="'/login'">
            <button class="col-10 btn btn-primary btnBlock btnConfirm mt-3 fixed-button mb-2">
              <span style="font-weight: 900; color:white; ">Login</span>
            </button>
          </router-link>-->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import CryptoJS from "crypto-js";
import logoHeader from "@/components/svg/logoHeader.vue";

export default {
  data() {
    return {
      status: "",
      message: ""
    };
  },
  components: {
    logoHeader
  },
  mounted() {
    if (this.$route.query.email && this.$route.query.otp) {
      axios
        .post(`${process.env.VUE_APP_BACKEND_URL}/login/confirm`, {
          email: this.$route.query.email,
          otp: this.$route.query.otp
        })
        .then(res => {
          console.log(res);
          this.message = res.data.message;
          this.status = res.status;

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

          localStorage.setItem("user", JSON.stringify(dataSetLocal));
          this.$router.push("/");
        })
        .catch(error => {
          console.log("===== Backend-error ======");
          console.error(error.response);
          this.message = error.response.data;
          this.status = error.response.status;
        });
    } else {
      this.$router.push("/");
    }
  }
};
</script>

<style></style>

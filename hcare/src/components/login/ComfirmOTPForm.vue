<template>
  <div class="form-group">
    <div class="col-12" style="margin-top:28px">
      {{email}}
      <div class="form-group text-left mt-2">
        <form>
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
            <small id="otpSend" class="form-text text-left">Send OTP Again?</small>
          </div>
        </form>
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

export default {
  data() {
    return {
      password: ""
    };
  },
  props: {
    email: String
  },
  methods: {
    sendToBackend() {
      if (this.email && this.password) {
        axios
          .post(`${process.env.VUE_APP_BACKEND_URL}/login/confirm`, {
            email: this.email,
            password: this.password
          })
          .then(res => {
            console.log(res);
            this.message = res.data.message;
            this.status = res.status;
            localStorage.setItem("user", JSON.stringify(res.data));
            this.$router.push("/");
            this.$router.go();
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
  }
};
</script>

<style>
</style>
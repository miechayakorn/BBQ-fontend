<template>
  <div>
    <logoHeader />
    <div class="container">
      <div class="row" style="text-align: center;">
        <div class="mt-5 col-12">
          <div v-if="status == 500" class="alert alert-danger" role="alert">{{ message }}</div>
          <div
            v-if="status == 304"
            class="alert alert-warning"
            role="alert"
          >This booking id have cancel already.</div>
          <div v-if="status == 200" class="alert alert-success" role="alert">{{ message }}</div>
          <router-link :to="'/appointment'">
            <button class="col-10 btn btn-primary btnBlock btnConfirm mt-3 fixed-button mb-2">
              <span style="font-weight: 900; color:white; ">Appointment</span>
            </button>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
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
  async mounted() {
    if (this.$route.query.booking_id) {
      console.log("booking=" + this.$route.query.booking_id);
      await axios
        .post(`${process.env.VUE_APP_BACKEND_URL}/cancel`, {
          booking_id: this.$route.query.booking_id
        })
        .then(res => {
          console.log(res);
          this.message = res.data.message;
          this.status = res.status;
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

<style>
</style>
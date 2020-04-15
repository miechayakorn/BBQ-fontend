<template>
  <div>
    <logoHeader />
    <div class="container">
      <div class="row" style="text-align: center;">
        <div class="mt-5 col-12">
          <div v-if="status == 500" class="alert alert-danger" role="alert">
            {{ message }}
          </div>
          <div v-if="status == 304" class="alert alert-warning" role="alert">
            This booking has been confirmed
          </div>
          <div v-if="status == 200" class="alert alert-success" role="alert">
            {{ message }}
          </div>
        </div>
        <!-- <div class="col-12">
          <button
            @click="confirm"
            class="btn btn-primary btnBlock btnConfirm mt-5 fixed-button mb-2"
          ></button>
        </div> -->
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
  mounted() {
    if (this.$route.query.token) {
      axios
        .get(
          `${process.env.VUE_APP_BACKEND_URL}/bookings/confirm?token=${this.$route.query.token}`
        )
        .then(res => {
          this.$swal({
            toast: true,
            position: "top-end",
            showConfirmButton: false,
            timer: 3000,
            icon: "success",
            title: "ยืนยัน email สำเร็จ"
          });
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
    }else{
      this.$router.push("/")
    }
  }
};
</script>

<style></style>

<template>
  <div>
    <logoHeader />
    <div class="container fixed-container mb-3 bg" style="margin-top:40px">
      <SendMailForm v-if="!email" v-on:email="getEmail" />
      <ComfirmOTPForm v-else-if="email" :email="email"/>
    </div>
  </div>
</template>

<script>
import logoHeader from "@/components/svg/logoHeader.vue";
import SendMailForm from "@/components/login/SendMailForm.vue";
import ComfirmOTPForm from "@/components/login/ComfirmOTPForm";
import { waiting, errorSWAL, successSWAL } from "@/utility/swal.js";

export default {
  data() {
    return {
      email: null
    };
  },
  methods: {
    getEmail(email) {
      this.email = email;
    }
  },
  mounted() {
    if (localStorage.getItem("user")) {
      this.$router.push("/");
    }
  },
  components: {
    logoHeader,
    SendMailForm,
    ComfirmOTPForm
  }
};
</script>

<style>
/* enable absolute positioning */
.inner-addon {
  position: relative;
}

/* style icon */
.inner-addon .fas {
  position: absolute;
  padding: 10px;
  pointer-events: none;
}

/* align icon */
.left-addon .fas {
  left: 0px;
}
.right-addon .fas {
  right: 0px;
}

/* add padding  */
.left-addon input {
  padding-left: 30px;
}
.right-addon input {
  padding-right: 30px;
}
</style>

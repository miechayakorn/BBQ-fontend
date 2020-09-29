<template>
  <div id="app">
    <Menubar />
    <div style="margin-top: 0.625rem">
      <router-view />
    </div>
  </div>
</template>
<script>
import Menubar from "@/components/Menubar.vue";
import axios from "axios";
import CryptoJS from "crypto-js";

export default {
  methods: {
    checkRouteAuth() {
      // if (this.$ {
      //   return true;
      // } else if (this.$router.) {
      //   return true;
      // } else if (this.$router.curren") {
      //   return true;
      // } else if (this.$router.cm") {
      //   return true;
      // } else if (this.$router.currentRoute.pal") {
      //   return true;
      // } else if (this.$router.{
      //   return true;
      // } else if (this.$router.currentRo) {
      //   return true;
      // } else if (this.$router.currentRoute.") {
      //   return true;
      // } else if (this.$router.currentRoute.pan") {
      //   return true;
      // }
      // return false;
    },
  },
  async beforeUpdate() {
    // Check Token every action
    if (this.$store.state.token) {
      console.log("check token");
      await axios
        .get(`${process.env.VUE_APP_BACKEND_URL}/checktoken`, {
          headers: {
            Authorization: `Bearer ${this.$store.state.token}`,
          },
        })
        .catch((error) => {
          if (error.response.status == 401) {
            console.log("------------ push login");
            if (
              this.$store.state.role == "STAFF" ||
              this.$store.state.role == "ADMIN"
            ) {
              this.$router.push("/admin/login");
            } else {
              this.$router.push("/login");
            }
            //Clear data in store
            this.$store.state.token = null;
            this.$store.state.role = null;
            this.$store.state.user = {
              first_name: null,
              last_name: null,
            };
            //Clear local
            localStorage.removeItem("user");
          } else {
            console.log("===== Backend-error ======");
            console.error(error.response);
          }
        });
      // } else if (this.checkRouteAuth()) {
      //   console.log("pass");
      // } else if (this.$router.currentRoute.path.slice(0, 6) == "/admin") {
      //   this.$router.push("/admin/login");
      // } else {
      //   console.log("Login");
      //   this.$router.push("/login");
    }
  },
  components: {
    Menubar,
  },
};
</script>
<style>
body {
  font-family: "Poppins", "Mitr", sans-serif;
  background-color: #f9f9fc;
  text-align: center;
  color: #2c3e50;
}
.fixed-button {
  width: 320px;
  text-align: center;
  position: relative;
  height: 48px;
}

@media (max-width: 768px) {
  .fixed-button {
    width: 100%;
  }
}
@media (min-width: 768px) {
  .fixed-container {
    width: 720px;
  }
}
.btnConfirm {
  border: 1px solid #99a3ff;
  box-shadow: 0px 3px 8px #b6bdfe;
  border-radius: 31px;
}
</style>

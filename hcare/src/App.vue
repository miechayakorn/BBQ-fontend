<template>
  <div id="app">
    <Menubar />
    <!-- <router-link to="/">Home</router-link> | -->
    <!-- <router-link to="/about">About</router-link> -->
    <div style="margin-top:0.625rem">
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
      if (this.$router.currentRoute.path == "/register") {
        return true;
      } else if (this.$router.currentRoute.path == "/register/confirm") {
        return true;
      } else if (this.$router.currentRoute.path == "/bookings/confirm") {
        return true;
      } else if (this.$router.currentRoute.path == "/bookings/emailcancel") {
        return true;
      } else if (this.$router.currentRoute.path == "/login") {
        return true;
      } else if (this.$router.currentRoute.path == "/login/confirm") {
        return true;
      }
      return false;
    }
  },
  async created() {
    if (localStorage.getItem("user")) {
      let user = JSON.parse(localStorage.getItem("user"));
      if (user.first_name && user.last_name && user.token) {
        //decrypt
        user.first_name = CryptoJS.AES.decrypt(
          user.first_name,
          "hcare6018"
        ).toString(CryptoJS.enc.Utf8);

        user.last_name = CryptoJS.AES.decrypt(
          user.last_name,
          "hcare6018"
        ).toString(CryptoJS.enc.Utf8);

        this.$store.state.token = user.token;
        this.$store.state.role = user.role;
        this.$store.state.user = {
          first_name: user.first_name,
          last_name: user.last_name
        };

        await axios
          .get(`${process.env.VUE_APP_BACKEND_URL}/checktoken`, {
            headers: {
              Authorization: `Bearer ${user.token}`
            }
          })
          .then(res => {})
          .catch(error => {
            if (error.response.status == 401) {
              console.log("------------ push login");
              //Clear data in store
              this.$store.state.token = null;
              this.$store.state.role = null;
              this.$store.state.user = {
                first_name: null,
                last_name: null
              };
              //Clear local
              localStorage.removeItem("user");

              this.$router.push("/login");
            } else {
              console.log("===== Backend-error ======");
              console.error(error.response);
            }
          });
      } else {
        this.$router.push("/login");
      }
    } else if (this.checkRouteAuth()) {
      console.log("pass");
    } else {
      this.$router.push("/login");
    }
  },
  async beforeUpdate() {
    // Check Token every action
    if (this.$store.state.token) {
      console.log("check token");
      await axios
        .get(`${process.env.VUE_APP_BACKEND_URL}/checktoken`, {
          headers: {
            Authorization: `Bearer ${this.$store.state.token}`
          }
        })
        .catch(error => {
          if (error.response.status == 401) {
            console.log("------------ push login");
            //Clear data in store
            this.$store.state.token = null;
            this.$store.state.role = null;
            this.$store.state.user = {
              first_name: null,
              last_name: null
            };
            //Clear local
            localStorage.removeItem("user");
            
            this.$router.push("/login");
          } else {
            console.log("===== Backend-error ======");
            console.error(error.response);
          }
        });
    } else if (this.checkRouteAuth()) {
      console.log("pass");
    } else {
      console.log("Login");
      this.$router.push("/login");
    }
  },
  components: {
    Menubar
  }
};
</script>
<style>
body {
  font-family: "Poppins", "Mitr", sans-serif;
  background-color: #f9f9fc;
}
#app {
  font-family: "Poppins", "Mitr", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>

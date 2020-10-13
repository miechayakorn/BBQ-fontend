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
import CryptoJS from "crypto-js";
import axios from "axios";

export default {
  async beforeUpdate() {
    // Check Token every action
    if (this.$store.state.token) {
      await axios
        .get(`${process.env.VUE_APP_BACKEND_URL}/checktoken`, {
          headers: {
            Authorization: `Bearer ${this.$store.state.token}`,
          },
        })
        .then((res) => {
          let role = CryptoJS.AES.decrypt(
            res.data.role,
            process.env.VUE_APP_SECRET_KEY
          ).toString(CryptoJS.enc.Utf8);
          if (this.$store.state.role != role) {
            this.$store.state.role = role;

            let user = JSON.parse(localStorage.getItem("user"));
            user.role = CryptoJS.AES.encrypt(
              role,
              process.env.VUE_APP_SECRET_KEY
            ).toString();
            localStorage.setItem("user", JSON.stringify(user));
          }
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
  color: #555555;
}
.font-weight-bold {
  color: #444444;
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

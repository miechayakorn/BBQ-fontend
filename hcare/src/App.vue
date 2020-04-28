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
  created() {
    if (localStorage.getItem("user")) {
      let user = JSON.parse(localStorage.getItem("user"));
      this.$store.state.token = user.token;
      this.$store.state.user = {
        first_name: user.first_name,
        last_name: user.last_name
      };
    } else if (this.checkRouteAuth()) {
      console.log("pass");
    } else {
      this.$router.push("/login");
    }
  },
  beforeUpdate() {
    // Check Token every action
    if (this.$store.state.token) {
      console.log("check token");
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

.Myrow1 {
  height: 48px;
  background-color: #ccd1ff;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>

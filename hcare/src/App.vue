<template>
  <div id="app">
    <nav v-if="role == 'admin'" class="navbar navbar-primary Myrow1">
        <a class="navbar-brand" href="#">
          <img
            src="/docs/4.0/assets/brand/bootstrap-solid.svg"
            width="30"
            height="30"
            class="d-inline-block align-top"
            alt=""
          />
          Bootstrap
        </a>
      </nav>

    <!-- <router-link to="/">Home</router-link> | -->
    <!-- <router-link to="/about">About</router-link> -->

    <router-view />
  </div>
</template>
<script>
export default {
  data() {
    return {
      role: ""
    };
  },
  mounted() {
    if (localStorage.getItem("role")) {
      let dataRole = localStorage.getItem("role");
      this.role = dataRole
    } else {
      
    }
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

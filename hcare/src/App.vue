<template>
  <div id="app">
    <Menubar/>
    <!-- <router-link to="/">Home</router-link> | -->
    <!-- <router-link to="/about">About</router-link> -->
    <div style="margin-top:60px;">
      <router-view />
    </div>
  </div>
</template>
<script>
import Menubar from "@/components/Menubar.vue";

export default {
components: {
    Menubar,
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

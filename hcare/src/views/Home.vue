<template>
  <div class="home">
    <logoHeader />
    <HelloWorld msg="Welcome to Your Vue.js App" />
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";
import logoHeader from "@/components/svg/logoHeader.vue";

export default {
  name: "Home",
  components: {
    HelloWorld,
    logoHeader
  }
};
</script>

<template>
  <div class="home">
    
      <Menubar/>
  
    <div class="container">

    <HelloWorld msg="Welcome to Your Vue.js App" />
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";
import Menubar from "@/components/Menubar.vue";

export default {
  name: "Home",
  components: {
    HelloWorld,
    Menubar,
  }
};
</script>

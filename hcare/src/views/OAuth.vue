<template>
  <div>
    <logoHeader />
    <div class="container fixed-container mb-3">
      <VclFacebook />
      <VclList class="mt-2" />
      <VclList class="mt-2" />
    </div>
  </div>
</template>

<script>
import logoHeader from "@/components/svg/logoHeader.vue";
import authentication from "@/utility/authentication";
import { VclFacebook, VclList } from "vue-content-loading";

export default {
  data() {
    return {
      name: null,
    };
  },
  mounted() {
    authentication.initialize();
    this.name = authentication.getUserProfile().name;
    if (localStorage.getItem("adal.idtoken")) {
      this.$router.push("/login");
    }
  },
  components: {
    logoHeader,
    VclFacebook,
    VclList,
  },
};
</script>

<style>
</style>
<template>
  <div>
    <logoHeader />
    <p class="mt-5" style="font-sixe: 30px; color: black">Wellcome back, {{ name }}</p>
  </div>
</template>

<script>
import logoHeader from "@/components/svg/logoHeader.vue";
import authentication from "@/utility/authentication";

export default {
  data() {
    return {
      name: null,
    };
  },
  mounted() {
    authentication.initialize();
    this.name = authentication.getUserProfile().name;

    //Set DataHcare in LocalStorage
  },
  components: {
    logoHeader,
  },
};
</script>

<style>
</style>
<template>
  <div class="container">
    <ServiceTypeBox :messageToComponents=messageToComponents />
  </div>
</template>

<script>
import ServiceTypeBox from "@/components/ServiceTypeBox.vue";

export default {
  data() {
    return {
      messageToComponents: [
        { type_id: 1, type_name: "จิตแพทย์" },
        { type_id: 2, type_name: "จิตวิทยา" }
      ]
    };
  },
  methods: {},
  components: {
    ServiceTypeBox
  }
};
</script>

<style>
  


</style>

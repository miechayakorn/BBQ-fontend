<template>
  <div class="d-flex">
    <MenuMobile />
    <Menudash />
    <div class="container bg-light">
      <EditEmp />
    </div>
  </div>
</template>
<script>
import Menudash from "@/components/dashboard/Menudash.vue";
import MenuMobile from "@/components/MenuMobile.vue";
import EditEmp from "@/components/dashboard/manageEmp/EditEmp.vue";

export default {
  components: {
    Menudash,
    MenuMobile,
    EditEmp,
  },
};
</script>
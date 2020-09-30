<template>
  <div class="row">
    <div class="col-3 col-md-2">
      <Menudash style="position: fixed" />
    </div>
    <div class="col-9 col-md-9">
      <div class="bg-light">
        <EditEmp />
      </div>
    </div>
  </div>
</template>
<script>
import Menudash from "@/components/dashboard/Menudash.vue";
import EditEmp from "@/components/dashboard/manageEmp/EditEmp.vue";

export default {
  components: {
    Menudash,
    EditEmp,
  },
};
</script>
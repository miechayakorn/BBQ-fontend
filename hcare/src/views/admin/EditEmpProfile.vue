<template>
  <div class="d-flex">
    <MenuMobile />
    <Menudash />
    <div class="container bg-light">
      <nav class="navbar-expand navbar-light bg-white pl-3 pt-3 border-bottom">
        <ul class="navbar-nav nav-underlined">
          <li class="active" style="margin-left: 63px;">
            <router-link
              to="/admin/dashboard/manageEmployee?p=addEmp"
              class="disText activeText"
            >เพิ่มและจัดการเจ้าหน้าที่</router-link>
          </li>
        </ul>
      </nav>
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
<template>
  <div class="d-flex">
    <MenuMobile />
    <Menudash />
    <div class="container bg-light">
      <nav class="navbar-expand navbar-light bg-white pl-3 pt-3 border-bottom">
        <ul class="navbar-nav nav-underlined">
          <li
            :class="{ active: this.$route.query.p === 'addEmp' || this.$route.query.p == undefined }"
            style="margin-left: 63px;"
          >
            <router-link
              to="?p=addEmp"
              :class="[
                'disText',
                { activeText: this.$route.query.p === 'addEmp' || this.$route.query.p == undefined }
              ]"
            >เพิ่มและจัดการเจ้าหน้าที่</router-link>
          </li>
        </ul>
      </nav>
      <AddEmp v-if="this.$route.query.p == 'addEmp' || this.$route.query.p == undefined" />
    </div>
  </div>
</template>

<script>
import Menudash from "@/components/dashboard/Menudash.vue";
import Bookingdash from "@/components/dashboard/Bookingdash.vue";
import MenuMobile from "@/components/MenuMobile.vue";
import AddEmp from "@/components/dashboard/manageEmp/AddEmp.vue";

export default {
  components: {
    Menudash,
    MenuMobile,
    AddEmp,
  },
};
</script>

<style>
.bg-lightblue {
  background-color: #e1f2ff;
}
</style>

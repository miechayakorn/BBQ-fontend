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
            >เพิ่มพนักงาน</router-link>
          </li>
          <li :class="{ active: this.$route.query.p === 'editRole' }" style="margin-left: 63px;">
            <router-link
              to="?p=editRole"
              :class="[
                'disText',
                { activeText: this.$route.query.p === 'editRole' }
              ]"
            >จัดการตำแหน่ง</router-link>
          </li>
        </ul>
      </nav>
      <AddEmp v-if="this.$route.query.p == 'addEmp' || this.$route.query.p == undefined" />
      <EditRole v-if="this.$route.query.p == 'editRole'" />
    </div>
  </div>
</template>

<script>
import Menudash from "@/components/dashboard/Menudash.vue";
import Bookingdash from "@/components/dashboard/Bookingdash.vue";
import MenuMobile from "@/components/MenuMobile.vue";
import AddEmp from "@/components/dashboard/manageEmp/AddEmp.vue";
import EditRole from "@/components/dashboard/manageEmp/EditRole.vue";

export default {
  components: {
    Menudash,
    MenuMobile,
    AddEmp,
    EditRole,
  },
};
</script>

<style>
.bg-lightblue {
  background-color: #e1f2ff;
}
</style>

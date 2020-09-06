<template>
  <div class="d-flex">
    <MenuMobile />
    <Menudash />
    <div class="container bg-light">
      <nav class="navbar-expand navbar-light bg-white pl-3 pt-3 border-bottom">
        <ul class="navbar-nav nav-underlined">
          <li
            :class="{ active: activeBtnNav === 'addEmp' }"
            style="margin-left: 63px;"
            @click="activeBtnNav = 'addEmp'"
          >
            <router-link
              to="#addEmp"
              :class="[
                'disText',
                { activeText: activeBtnNav === 'addEmp' }
              ]"
            >เพิ่มพนักงาน</router-link>
          </li>
          <li
            :class="{ active: activeBtnNav === 'editRole' }"
            style="margin-left: 63px;"
            @click="activeBtnNav = 'editRole'"
          >
            <router-link
              to="#editRole"
              :class="[
                'disText',
                { activeText: activeBtnNav === 'editRole' }
              ]"
            >จัดการตำแหน่ง</router-link>
          </li>
        </ul>
      </nav>
      <AddEmp v-if="activeBtnNav == 'addEmp'" />
      <EditRole v-if="activeBtnNav == 'editRole'" />
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
  data() {
    return {
      activeBtnNav: "addEmp",
    };
  },
  components: {
    Menudash,
    MenuMobile,
    AddEmp,
    EditRole,
  },
};
</script>

<style>
@media (min-width: 776px) {
  .dis-pc-me {
    margin-top: 48px;
    width: 75%;
  }
}
@media (max-width: 420px) {
  .dis-pc-me {
    margin-top: 48px;
  }
}

.bg-lightblue {
  background-color: #e1f2ff;
}
</style>

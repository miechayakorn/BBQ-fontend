<template>
  <div class="d-flex">
    <MenuMobile />
    <Menudash />
    <div class="container bg-light">
      <nav class="navbar-expand navbar-light bg-white pl-3 pt-3 border-bottom">
        <ul class="navbar-nav nav-underlined">
          <li
            :class="{ active: activeBtnNav === 'manageEmp' }"
            style="margin-left: 63px;"
            @click="activeBtnNav = 'manageEmp'"
          >
            <router-link
              to="#manageEmp"
              :class="[
                'disText',
                { activeText: activeBtnNav === 'manageEmp' }
              ]"
            >เพิ่มพนักงาน</router-link>
          </li>
        </ul>
      </nav>
      <AddEmp/>
    </div>
  </div>
</template>

<script>
import Menudash from "@/components/dashboard/Menudash.vue";
import Bookingdash from "@/components/dashboard/Bookingdash.vue";
import MenuMobile from "@/components/MenuMobile.vue";
import AddEmp from "@/components/dashboard/manageEmp/AddEmp.vue";

export default {
  data() {
    return {
      activeBtnNav: "manageEmp",
    };
  },
  components: {
    Menudash,
    MenuMobile,
    AddEmp,
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

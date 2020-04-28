<template>
  <div class="d-flex">
    <Menudash />
    <Queuedash />
    <div class="container bg-light">
      <nav class="navbar navbar-expand navbar-light bg-white border-bottom">
        <button
          class="btn btn-primary"
          data-toggle="collapse"
          data-target="#navbarCollapseMenu-toggle"
          id="menu-toggle"
        >
          <span>&#60;</span>
        </button>
        <ul class="nav navbar-nav nav-underlined">
          <li
            :class="{ active: activeBtnNav === 'ServiceTable' }"
            style="margin-left: 63px;"
            @click="activeBtnNav = 'ServiceTable'"
          >
            <router-link
              to="#ServiceTable"
              :class="[
                'disText',
                { activeText: activeBtnNav === 'ServiceTable' }
              ]"
              >ตารางการให้บริการ</router-link
            >
          </li>
          <li
            :class="{ active: activeBtnNav === 'ManageTable' }"
            style="margin-left: 63px;"
            @click="activeBtnNav = 'ManageTable'"
          >
            <router-link
              to="#ManageTable"
              :class="[
                'disText',
                { activeText: activeBtnNav === 'ManageTable' }
              ]"
              >จัดการตารางให้บริการ</router-link
            >
          </li>
        </ul>
      </nav>
      <ServiceTable v-if="activeBtnNav == 'ServiceTable'" />
      <ManageTable v-if="activeBtnNav == 'ManageTable'" />
    </div>
  </div>
</template>

<script>
import Menudash from "@/components/dashboard/Menudash.vue";
import Queuedash from "@/components/dashboard/Queuedash.vue";
import ServiceTable from "@/components/dashboard/timeTable/ServiceTable.vue";
import ManageTable from "@/components/dashboard/timeTable/ManageTable.vue";

export default {
  data() {
    return {
      activeBtnNav: "ServiceTable"
    };
  },
  components: {
    Menudash,
    Queuedash,
    ServiceTable,
    ManageTable
  }
};
</script>

<style scoped>
.nav-item-underlined:after,
.nav-underlined > li:after {
  display: block;
  content: " ";
  bottom: 10px;
  border-bottom: 3px solid transparent;
  width: 0;
  width: auto;
}
.disText {
  color: #b6b6b6;
}
.activeText {
  color: #555555;
}

.underlined-active:after,
.nav-underlined:hover > li:hover:after,
.nav-underlined:active > li:hover:after,
.nav-underlined:hover > li.active:hover:after,
.nav-underlined:active > li.active:hover:after,
.nav-underlined > li.active:after,
.nav-underlined > li:hover:after {
  border-color: #99a3ff;
}
</style>

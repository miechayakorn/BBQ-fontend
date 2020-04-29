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
            :class="{ active: activeBtnNav === 'AddService' }"
            style="margin-left: 63px;"
            @click="activeBtnNav = 'AddService'"
          >
            <router-link
              to="#AddService"
              :class="[
                'disText',
                { activeText: activeBtnNav === 'AddService' }
              ]"
              >เพิ่มบริการ</router-link
            >
          </li>
          <li
            :class="{ active: activeBtnNav === 'EditService' }"
            style="margin-left: 63px;"
            @click="activeBtnNav = 'EditService'"
          >
            <router-link
              to="#EditService"
              :class="[
                'disText',
                { activeText: activeBtnNav === 'EditService' }
              ]"
              >แก้ไขบริการ</router-link
            >
          </li>
        </ul>
      </nav>
      <AddService v-if="activeBtnNav == 'AddService'" />
      <EditService v-if="activeBtnNav == 'EditService'" />
    </div>
  </div>
</template>

<script>
import Menudash from "@/components/dashboard/Menudash.vue";
import Queuedash from "@/components/dashboard/Queuedash.vue";
import AddService from "@/components/dashboard/service/AddService.vue";
import EditService from "@/components/dashboard/service/EditService.vue";

export default {
  data() {
    return {
      activeBtnNav: "AddService"
    };
  },
  components: {
    Menudash,
    Queuedash,
    AddService,
    EditService,
  }
};
</script>

<style></style>

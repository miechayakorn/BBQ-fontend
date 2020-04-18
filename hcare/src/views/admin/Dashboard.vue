<template>
  <div class="d-flex">
    <Menudash />
    <Queuedash />
    <!-- Page Content -->
    <div class="container bg-white">
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
          <!-- Appointmentdash -->
          <li
            :class="{ active: activeBtnNav === 'Appointmentdash' }"
            style="margin-left: 63px;"
            @click="activeBtnNav = 'Appointmentdash'"
          >
            <router-link
              to="#Appointmentdash"
              :class="[
                'disText',
                { activeText: activeBtnNav === 'Appointmentdash' }
              ]"
              >ตารางนัดคนไข้</router-link
            >
          </li>
          <!-- #Appointmentdash -->

          <!-- Bookingdash -->
          <li
            :class="{ active: activeBtnNav === 'Bookingdash' }"
            style="margin-left: 63px;"
            @click="activeBtnNav = 'Bookingdash'"
          >
            <router-link
              to="#Bookingdash"
              :class="[
                'disText',
                { activeText: activeBtnNav === 'Bookingdash' }
              ]"
              >ทำนัดหมาย</router-link
            >
          </li>
          <!-- #Bookingdash -->
        </ul>
      </nav>
      <Appointmentdash v-if="activeBtnNav == 'Appointmentdash'" />
      <Bookingdash v-if="activeBtnNav == 'Bookingdash'" />
    </div>
    <!-- #Page Content -->
  </div>
</template>

<script>
import Menudash from "@/components/dashboard/Menudash.vue";
import Queuedash from "@/components/dashboard/Queuedash.vue";
import Appointmentdash from "@/components/dashboard/Appointmentdash.vue";
import Bookingdash from "@/components/dashboard/Bookingdash.vue";

export default {
  data() {
    return {
      activeBtnNav: "Appointmentdash"
    };
  },
  components: {
    Menudash,
    Queuedash,
    Appointmentdash,
    Bookingdash
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

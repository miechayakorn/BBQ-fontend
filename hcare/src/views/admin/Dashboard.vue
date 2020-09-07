<template>
  <div class="d-flex">
    <MenuMobile />
    <Menudash />
    <div class="container bg-light">
      <nav class="navbar-expand navbar-light bg-white pl-3 pt-3 border-bottom">
        <ul class="navbar-nav nav-underlined">
          <li
            :class="{ active: this.$route.query.p === 'Appointmentdash' || this.$route.query.p == undefined }"
            style="margin-left: 63px;"
          >
            <router-link
              to="?p=Appointmentdash"
              :class="[
                'disText',
                { activeText: this.$route.query.p === 'Appointmentdash' || this.$route.query.p == undefined }
              ]"
            >ตารางนัดคนไข้</router-link>
          </li>
          <li :class="{ active: this.$route.query.p === 'Bookingdash' }" style="margin-left: 63px;">
            <router-link
              to="?p=Bookingdash"
              :class="[
                'disText',
                { activeText: this.$route.query.p === 'Bookingdash' }
              ]"
            >ทำนัดหมาย</router-link>
          </li>
        </ul>
      </nav>
      <Appointmentdash
        v-if="this.$route.query.p == 'Appointmentdash' || this.$route.query.p == undefined"
      />
      <Bookingdash v-if="this.$route.query.p == 'Bookingdash'" />
    </div>
  </div>
</template>

<script>
import Menudash from "@/components/dashboard/Menudash.vue";
import Appointmentdash from "@/components/dashboard/Appointmentdash.vue";
import Bookingdash from "@/components/dashboard/Bookingdash.vue";
import MenuMobile from "@/components/MenuMobile.vue";

export default {
  components: {
    Menudash,
    Appointmentdash,
    Bookingdash,
    MenuMobile,
  },
};
</script>

<style>
.nav-item-underlined:after,
.nav-underlined > li:after {
  display: block;
  content: "";
  padding-bottom: 15px;
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

.bg-blueMan2 {
  background-color: #e0e3ff;
}

.div-card {
  background-color: #ffffff;
  box-shadow: 0px 4px 8px #e9ebfb;
}
</style>

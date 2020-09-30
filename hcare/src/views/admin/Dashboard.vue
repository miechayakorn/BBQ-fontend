<template>
  <div class="row">
    <div class="col-3 col-md-2">
      <Menudash style="position: fixed" />
    </div>
    <div class="col-9 col-md-9">
      <div class="bg-light">
        <nav
          class="navbar-expand navbar-light bg-white pl-3 pt-3 border-bottom"
        >
          <ul class="navbar-nav nav-underlined">
            <li
              :class="{
                active:
                  this.$route.query.p === 'Appointmentdash' ||
                  this.$route.query.p == undefined,
              }"
              style="margin-left: 63px"
            >
              <router-link
                to="?p=Appointmentdash"
                :class="[
                  'disText',
                  {
                    activeText:
                      this.$route.query.p === 'Appointmentdash' ||
                      this.$route.query.p == undefined,
                  },
                ]"
                >ตารางนัดคนไข้</router-link
              >
            </li>
            <li
              :class="{ active: this.$route.query.p === 'Bookingdash' }"
              style="margin-left: 63px"
            >
              <router-link
                to="?p=Bookingdash"
                :class="[
                  'disText',
                  { activeText: this.$route.query.p === 'Bookingdash' },
                ]"
                >ทำนัดหมาย</router-link
              >
            </li>
          </ul>
        </nav>
        <Appointmentdash
          v-if="
            this.$route.query.p == 'Appointmentdash' ||
            this.$route.query.p == undefined
          "
        />
        <Bookingdash v-if="this.$route.query.p == 'Bookingdash'" />
      </div>
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

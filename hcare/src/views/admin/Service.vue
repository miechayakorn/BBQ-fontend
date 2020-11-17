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
                  this.$route.query.p === 'TotalService' ||
                  this.$route.query.p == undefined,
              }"
              style="margin-left: 63px"
            >
              <router-link
                to="?p=TotalService"
                :class="[
                  'disText',
                  {
                    activeText:
                      this.$route.query.p === 'TotalService' ||
                      this.$route.query.p == undefined,
                  },
                ]"
                >บริการทั้งหมด</router-link
              >
            </li>
            <li
              :class="{ active: this.$route.query.p === 'AddService' }"
              style="margin-left: 63px"
            >
              <router-link
                to="?p=AddService"
                :class="[
                  'disText',
                  { activeText: this.$route.query.p === 'AddService' },
                ]"
                >เพิ่มบริการ</router-link
              >
            </li>
            <li
              v-if="this.$store.state.role == 'ADMIN'"
              :class="{ active: this.$route.query.p === 'LocationService' }"
              style="margin-left: 63px"
            >
              <router-link
                to="?p=LocationService"
                :class="[
                  'disText',
                  { activeText: this.$route.query.p === 'LocationService' },
                ]"
                >เพิ่มสถานที่ให้บริการ</router-link
              >
            </li>
          </ul>
        </nav>
        <TotalService
          v-if="
            this.$route.query.p == 'TotalService' ||
            this.$route.query.p == undefined
          "
        />
        <AddService v-if="this.$route.query.p == 'AddService'" />
        <LocationService v-if="this.$route.query.p == 'LocationService'" />
      </div>
    </div>
  </div>
</template>

<script>
import Menudash from "@/components/dashboard/Menudash.vue";
import TotalService from "@/components/dashboard/service/TotalService.vue";
import AddService from "@/components/dashboard/service/AddService.vue";
import LocationService from "@/components/dashboard/service/LocationService.vue";

export default {
  components: {
    Menudash,
    TotalService,
    AddService,
    LocationService,
  },
};
</script>

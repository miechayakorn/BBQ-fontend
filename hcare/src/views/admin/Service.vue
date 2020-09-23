<template>
  <div class="d-flex">
    <MenuMobile />
    <Menudash />
    <div class="container bg-light">
      <nav class="navbar-expand navbar-light bg-white pl-3 pt-3 border-bottom">
        <ul class="navbar-nav nav-underlined">
          <li
            :class="{ active: this.$route.query.p === 'TotalService' || this.$route.query.p == undefined }"
            style="margin-left: 63px;"
          >
            <router-link
              to="?p=TotalService"
              :class="[
                'disText',
                { activeText: this.$route.query.p === 'TotalService' || this.$route.query.p == undefined }
              ]"
            >บริการทั้งหมด</router-link>
          </li>
          <li
            :class="{ active: this.$route.query.p === 'AddService' }"
            style="margin-left: 63px;"
          >
            <router-link
              to="?p=AddService"
              :class="[
                'disText',
                { activeText: this.$route.query.p === 'AddService'  }
              ]"
            >เพิ่มบริการ</router-link>
          </li>
          <li :class="{ active: this.$route.query.p === 'EditService' }" style="margin-left: 63px;">
            <router-link
              to="?p=EditService"
              :class="[
                'disText',
                { activeText: this.$route.query.p === 'EditService' }
              ]"
            >แก้ไขบริการ</router-link>
          </li>
          <li v-if="this.$store.state.role == 'ADMIN'" :class="{ active: this.$route.query.p === 'LocationService' }" style="margin-left: 63px;">
            <router-link
              to="?p=LocationService"
              :class="[
                'disText',
                { activeText: this.$route.query.p === 'LocationService' }
              ]"
            >เพิ่มสถานที่ให้บริการ</router-link>
          </li>
        </ul>
      </nav>
      <TotalService  v-if="this.$route.query.p == 'TotalService'  || this.$route.query.p == undefined" />
      <AddService v-if="this.$route.query.p == 'AddService'" />
      <EditService v-if="this.$route.query.p == 'EditService'" />
      <LocationService v-if="this.$route.query.p == 'LocationService'" />
    </div>
  </div>
</template>

<script>
import Menudash from "@/components/dashboard/Menudash.vue";
import TotalService from "@/components/dashboard/service/TotalService.vue";
import AddService from "@/components/dashboard/service/AddService.vue";
import EditService from "@/components/dashboard/service/EditService.vue";
import LocationService from "@/components/dashboard/service/LocationService.vue";
import MenuMobile from "@/components/MenuMobile.vue";

export default {
  components: {
    Menudash,
    TotalService,
    AddService,
    EditService,LocationService,
    MenuMobile,
  },
};
</script>

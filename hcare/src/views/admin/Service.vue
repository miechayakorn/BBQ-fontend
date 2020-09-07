<template>
  <div class="d-flex">
    <MenuMobile />
    <Menudash />
    <div class="container bg-light">
      <nav class="navbar-expand navbar-light bg-white pl-3 pt-3 border-bottom">
        <ul class="navbar-nav nav-underlined">
          <li
            :class="{ active: this.$route.query.p === 'AddService' || this.$route.query.p == undefined }"
            style="margin-left: 63px;"
          >
            <router-link
              to="?p=AddService"
              :class="[
                'disText',
                { activeText: this.$route.query.p === 'AddService' || this.$route.query.p == undefined }
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
        </ul>
      </nav>
      <AddService v-if="this.$route.query.p == 'AddService'  || this.$route.query.p == undefined" />
      <EditService v-if="this.$route.query.p == 'EditService'" />
    </div>
  </div>
</template>

<script>
import Menudash from "@/components/dashboard/Menudash.vue";
import AddService from "@/components/dashboard/service/AddService.vue";
import EditService from "@/components/dashboard/service/EditService.vue";
import MenuMobile from "@/components/MenuMobile.vue";

export default {
  components: {
    Menudash,
    AddService,
    EditService,
    MenuMobile,
  },
};
</script>

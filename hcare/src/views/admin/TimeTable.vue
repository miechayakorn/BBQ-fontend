<template>
  <div class="d-flex">
    <MenuMobile />
    <Menudash />
    <div class="container bg-light">
      <nav class="navbar-expand navbar-light bg-white pl-3 pt-3 border-bottom">
        <ul class="navbar-nav nav-underlined">
          <li
            :class="{ active: this.$route.query.p === 'AddSlotTime' || this.$route.query.p == undefined }"
            style="margin-left: 63px;"
          >
            <router-link
              to="?p=AddSlotTime"
              :class="[
                'disText',
                { activeText: this.$route.query.p === 'AddSlotTime' || this.$route.query.p == undefined }
              ]"
            >เพิ่ม slot เวลา</router-link>
          </li>
          <li
            :class="{ active: this.$route.query.p === 'EditSlotTime' }"
            style="margin-left: 63px;"
          >
            <router-link
              to="?p=EditSlotTime"
              :class="[
                'disText',
                { activeText: this.$route.query.p === 'EditSlotTime' }
              ]"
            >แก้ไขตารางการให้บริการ</router-link>
          </li>
        </ul>
      </nav>
      <AddSlotTime v-if="this.$route.query.p == 'AddSlotTime' || this.$route.query.p == undefined" />
      <EditSlotTime v-if="this.$route.query.p == 'EditSlotTime'" />
    </div>
  </div>
</template>

<script>
import Menudash from "@/components/dashboard/Menudash.vue";
import AddSlotTime from "@/components/dashboard/timeTable/AddSlotTime.vue";
import EditSlotTime from "@/components/dashboard/timeTable/EditSlotTime.vue";
import MenuMobile from "@/components/MenuMobile.vue";

export default {
  components: {
    Menudash,
    AddSlotTime,
    EditSlotTime,
    MenuMobile,
  },
};
</script>

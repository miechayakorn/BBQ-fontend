<template>
  <div
    class="border-right bg-primary col-custom collapse show"
    id="navbarCollapseMenu-toggle"
    :style="{ minHeight: windowHeight + 'px', minWidth: '110px' }"
  >
    <div class="list-group menu mt-4">
      <div class="p-2 bg-primary" style="margin-top: 1rem !important">
        <router-link to="/admin/dashboard/">
          <iconAppointment
            :color="this.$route.name == 'Dashboard' ? '#5E65A1' : 'white'"
          />
          <p
            :class="
              this.$route.name == 'Dashboard' ? 'menu-list-click' : 'menu-list'
            "
          >
            นัดหมาย
          </p>
        </router-link>
      </div>
      <div class="p-2 bg-primary">
        <router-link to="/admin/dashboard/timetable">
          <iconTimeTable
            :color="this.$route.name == 'TimeTable' ? '#5E65A1' : 'white'"
          />
          <p
            :class="
              this.$route.name == 'TimeTable' ? 'menu-list-click' : 'menu-list'
            "
          >
            ตารางเวลา
          </p>
        </router-link>
      </div>
      <div class="p-2 bg-primary">
        <routerLink to="/admin/dashboard/service">
          <iconService
            :color="this.$route.name == 'Service' ? '#5E65A1' : 'white'"
          />
          <p
            :class="
              this.$route.name == 'Service' ? 'menu-list-click' : 'menu-list'
            "
          >
            บริการ
          </p>
        </routerLink>
      </div>

      <div class="p-2 bg-primary" v-if="this.$store.state.role == 'ADMIN'">
        <routerLink to="/admin/dashboard/manageEmployee">
          <iconEmp
            :color="this.$route.name == 'ManageEmp' ? '#5E65A1' : 'white'"
          />
          <p
            :class="
              this.$route.name == 'ManageEmp' ? 'menu-list-click' : 'menu-list'
            "
          >
            จัดการเจ้าหน้าที่
          </p>
        </routerLink>
      </div>
    </div>
  </div>
</template>
<script>
import iconAppointment from "@/components/svg/icon/iconAppointment.vue";
import iconTimeTable from "@/components/svg/icon/iconTimeTable.vue";
import iconEmp from "@/components/svg/icon/iconEmp.vue";
import iconSetting from "@/components/svg/icon/iconSetting.vue";
import iconLogout from "@/components/svg/icon/iconLogout.vue";
import iconService from "@/components/svg/icon/iconService.vue";

export default {
  components: {
    iconAppointment,
    iconTimeTable,
    iconEmp,
    iconSetting,
    iconLogout,
    iconService,
  },
  data() {
    return {
      windowHeight: window.innerHeight,
    };
  },
  mounted() {
    this.$nextTick(() => {
      window.addEventListener("resize", this.onResize);
    });
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.onResize);
  },
  methods: {
    onResize() {
      this.windowHeight = window.innerHeight;
    },
  },
};
</script>
<style scoped>
@media only screen and (min-width: 768px) {
  .col-custom {
    flex: 0 0 6%;
  }
}
.menu-list {
  font-style: normal;
  font-weight: bold;
  font-size: 14px;
  line-height: 21px;
  color: #f9f9fc;
}
.menu-list-click {
  font-style: normal;
  font-weight: bold;
  font-size: 14px;
  line-height: 21px;
  color: #5e65a1;
}
</style>

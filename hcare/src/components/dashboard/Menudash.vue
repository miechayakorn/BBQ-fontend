<template>
  <div class=" border-right bg-primary col-md-1" id="navbarCollapseMenu-toggle">
    <div class="list-group menu mt-4">
      <div @click="changeColorIcon('iconAppointment')" class="p-2 bg-primary">
        <router-link to="/admin/dashboard/">
          <iconAppointment
            :color="
              this.$store.state.dashboard.colorIconNav == 'iconAppointment'
                ? '#5E65A1'
                : 'white'
            "
          />
          <p
            :class="
              this.$store.state.dashboard.colorIconNav == 'iconAppointment'
                ? 'menu-list-click'
                : 'menu-list'
            "
          >
            นัดหมาย
          </p>
        </router-link>
      </div>
      <div @click="changeColorIcon('iconTimeTable')" class="p-2 bg-primary">
        <router-link to="/admin/dashboard/timetable">
          <iconTimeTable
            :color="
              this.$store.state.dashboard.colorIconNav == 'iconTimeTable'
                ? '#5E65A1'
                : 'white'
            "
          />
          <p
            :class="
              this.$store.state.dashboard.colorIconNav == 'iconTimeTable'
                ? 'menu-list-click'
                : 'menu-list'
            "
          >
            ตารางเวลา
          </p>
        </router-link>
      </div>
      <div @click="changeColorIcon('iconQueue')" class="p-2 bg-primary">
        <a href="#">
          <iconQueue
            :color="
              this.$store.state.dashboard.colorIconNav == 'iconQueue'
                ? '#5E65A1'
                : 'white'
            "
          />
          <p
            :class="
              this.$store.state.dashboard.colorIconNav == 'iconQueue'
                ? 'menu-list-click'
                : 'menu-list'
            "
          >
            คิว
          </p>
        </a>
      </div>
      <div @click="changeColorIcon('iconService')" class="p-2 bg-primary">
        <routerLink to="/admin/dashboard/service">
          <iconService
            :color="
              this.$store.state.dashboard.colorIconNav == 'iconService'
                ? '#5E65A1'
                : 'white'
            "
          />
          <p
            :class="
              this.$store.state.dashboard.colorIconNav == 'iconService'
                ? 'menu-list-click'
                : 'menu-list'
            "
          >
            บริการ
          </p>
        </routerLink>
      </div>
      <div class="list-group">
        <div
          @click="changeColorIcon('iconSetting')"
          class="p-2 bg-primary"
          style="margin-top:300px"
        >
          <a href="#">
            <iconSetting
              :color="
                this.$store.state.dashboard.colorIconNav == 'iconSetting'
                  ? '#5E65A1'
                  : 'white'
              "
            />
          </a>
        </div>
        <a href="#" class="p-2 bg-primary" style="margin-bottom:75px">
          <iconLogout />
        </a>
      </div>
    </div>
  </div>
</template>
<script>
import iconAppointment from "@/components/svg/icon/iconAppointment.vue";
import iconTimeTable from "@/components/svg/icon/iconTimeTable.vue";
import iconQueue from "@/components/svg/icon/iconQueue.vue";
import iconSetting from "@/components/svg/icon/iconSetting.vue";
import iconLogout from "@/components/svg/icon/iconLogout.vue";
import iconService from "@/components/svg/icon/iconService.vue";

export default {
  components: {
    iconAppointment,
    iconTimeTable,
    iconQueue,
    iconSetting,
    iconLogout,
    iconService
  },
  beforeDestroy() {
    this.$store.state.dashboard.colorIconNav = "iconAppointment";
  },
  methods: {
    changeColorIcon(nameIcon) {
      this.$store.state.dashboard.colorIconNav = nameIcon;
    }
  }
};
</script>
<style>
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
.qText {
  font-size: 18px;
  font-weight: 300;
  font-family: "Mitr";
  color: #444444;
}
.current-queue-text {
  color: #99a3ff;
  font-style: bold;
  font-size: 2em;
}
.textBold {
  font-size: 36px;
  font-weight: 900;
  font-family: "Poppins";
}
</style>

<template>
  <div class=" border-right bg-primary col-md-1" id="navbarCollapseMenu-toggle">
    <div class="sidebar-heading">
      <img
        src="https://www.w3schools.com/bootstrap4/paris.jpg"
        style="margin-top:24px; width: 56px; height: 56px;"
        class="rounded-circle mb-3"
      />
    </div>
    <div class="list-group menu">
      <router-link to="/admin/dashboard/" class="p-2 bg-primary">
        <iconAppointment />
        <p class="menu-list">นัดหมาย</p>
      </router-link>
      <router-link to="/admin/dashboard/timetable" class="p-2 bg-primary">
        <iconTimeTable />
        <p class="menu-list">ตารางเวลา</p>
      </router-link>
      <a href="#" class="p-2 bg-primary">
        <iconQueue />
        <p class="menu-list">คิว</p>
      </a>
      <a href="#" class="p-2 bg-primary">
        <iconService />
        <p class="menu-list">บริการ</p>
      </a>
      <div class="list-group">
        <a href="#" class="p-2 bg-primary" style="margin-top:300px">
          <iconSetting />
        </a>
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
    iconAppointment ,
    iconTimeTable,
    iconQueue,
    iconSetting,
    iconLogout,
    iconService,
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

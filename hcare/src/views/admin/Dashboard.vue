<template>
  <div class="d-flex">
    <Menudash />
    <Queuedash />
    <!-- Page Content -->
    <div class="container bg-white">
      <nav class="navbar navbar-expand-lg navbar-light bg-white border-bottom">
        <button
          class="btn btn-primary"
          data-toggle="collapse"
          data-target="#navbarCollapseMenu-toggle"
          id="menu-toggle"
        >
          <span>&#60;</span>
        </button>
        <ul class="nav navbar-nav nav-underlined">
          <li class="active" style="margin-left: 63px; color: #555555;">
            <a href="#" style="color: #555555;">ตารางนัดคนไข้</a>
          </li>
          <li style="margin-left: 63px;">
            <a href="#" style="color: #B6B6B6;">ทำนัดหมาย</a>
          </li>
        </ul>
      </nav>
      <Appointmentdash />
    </div>
    <!-- #Page Content -->
  </div>
</template>

<script>
import SideandNavbar from "@/components/SideandNavbar.vue";
import Menudash from "@/components/dashboard/Menudash.vue";
import Queuedash from "@/components/dashboard/Queuedash.vue";
import Appointmentdash from "@/components/dashboard/Appointmentdash.vue";

export default {
  data() {
    return {
      //ข้อมูลที่ได้จาก Backend
      //----------------------------------------
    };
  },
  components: {
    SideandNavbar,
    Menudash,
    Queuedash,
    Appointmentdash
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

<template>
  <div class="d-flex">
    <MenuMobile />
    <Menudash />
    <div class="container bg-light">
      <nav class="navbar-expand navbar-light bg-white pl-3 pt-3 border-bottom">
        <ul class="navbar-nav nav-underlined">
          <li
            :class="{ active: activeBtnNav === 'manageEmp' }"
            style="margin-left: 63px;"
            @click="activeBtnNav = 'manageEmp'"
          >
            <router-link
              to="#manageEmp"
              :class="[
                'disText',
                { activeText: activeBtnNav === 'manageEmp' }
              ]"
              >เพิ่มพนักงาน</router-link
            >
          </li>
        </ul>
      </nav>
      <div class="text-left font-weight-bold" style="margin-top:32px">
        <span>ส่วนที่ 1 : เพิ่มพนักงานใหม่</span>
        <div class="mt-3 div-card">
          <div class="row bg-lightblue">
            <div class="col-7">
              <manageEmpPic class="d-none d-md-block" />
            </div>
            <div class="col-12 col-md-5">
              <div class="row1">
                <div class="col-12">
                  <div class="form-group " style="margin-top:48px; width:75%">
                    <label for="firstName">ชื่อจริงพนักงาน</label>
                    <input
                      type="text"
                      class="form-control"
                      id="firstName"
                      placeholder="ชื่อจริง"
                    />
                  </div>
                   <div class="form-group " style="margin-top:24px; width:75%">
                    <label for="lastNameInput">นามสกุลพนักงาน</label>
                      <input
                        type="text"
                        class="form-control"
                        id="lastNameInput"
                        placeholder="นามสกุล"
                      />
                  </div> <div class="form-group " style="margin-top:24px; width:75%">
                   <label for="inputEmail">อีเมล</label>
                      <input
                        type="email"
                        class="form-control"
                        id="inputEmail"
                        placeholder="example@kmutt.ac.th"
                      />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Menudash from "@/components/dashboard/Menudash.vue";
import Bookingdash from "@/components/dashboard/Bookingdash.vue";
import MenuMobile from "@/components/MenuMobile.vue";
import manageEmpPic from "@/components/svg/manageEmpPic.vue";

export default {
  data() {
    return {
      activeBtnNav: "manageEmp"
    };
  },
  components: {
    Menudash,
    MenuMobile,
    manageEmpPic
  }
};
</script>

<style>
.nav-item-underlined:after,
.nav-underlined > li:after {
  display: block;
  content: " ";
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
.bg-lightblue {
  background-color: #e1f2ff;
}

.div-card {
  background-color: #ffffff;
  box-shadow: 0px 4px 8px #e9ebfb;
}

label{
  margin-bottom: 0.2rem;
}
</style>

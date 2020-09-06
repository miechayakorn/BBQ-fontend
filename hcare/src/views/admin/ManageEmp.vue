<template>
  <div class="d-flex">
    <MenuMobile />
    <Menudash />
    <!-- <Queuedash /> -->
    <div class="container bg-light">
      <nav class="navbar-expand navbar-light bg-white pl-3 pt-3 border-bottom">
        <ul class="navbar-nav nav-underlined">
          <li
            :class="{ active: activeBtnNav === 'Appointmentdash' }"
            style="margin-left: 63px;"
            @click="activeBtnNav = 'Appointmentdash'"
          >
            <router-link
              to="#Appointmentdash"
              :class="[
                'disText',
                { activeText: activeBtnNav === 'Appointmentdash' }
              ]"
              >ตารางนัดคนไข้</router-link
            >
          </li>
          <li
            :class="{ active: activeBtnNav === 'Bookingdash' }"
            style="margin-left: 63px;"
            @click="activeBtnNav = 'Bookingdash'"
          >
            <router-link
              to="#Bookingdash"
              :class="[
                'disText',
                { activeText: activeBtnNav === 'Bookingdash' }
              ]"
              >ทำนัดหมาย</router-link
            >
          </li>
        </ul>
      </nav>
      <div class=" font-weight-bold" style="margin-top:32px">
        <div class="col-12 col-md-12 text-xs-center text-md-left text-lg-left">
          <span>ส่วนที่ 1 : เพิ่มพนักงานใหม่</span>
        </div>
        <div class="mt-3 div-card">
          <div class="row bg-lightblue">
            <div class="col-7">
              <manageEmpPic class="d-none d-md-block" />
            </div>
            <div class="col-12 col-md-5">
              <div class="row">
                <div class="col-12">
                  <div class="form-group dis-pc-me" >
                    <div class="text-left mb-2">
                      <div class="mt-6">
                        <label for="firstName">ชื่อจริงพนักงาน</label>
                        <input
                          type="text"
                          class="form-control"
                          id="firstName"
                          placeholder="ชื่อจริง"
                        />
                      </div>
                      <div class="mt-3">
                        <label for="lastNameInput">นามสกุลพนักงาน</label>
                        <input
                          type="text"
                          class="form-control"
                          id="lastNameInput"
                          placeholder="นามสกุลพนักงาน"
                        />
                      </div>
                      <div class="mt-3">
                        <label for="inputEmail">อีเมล</label>
                        <input
                          type="email"
                          class="form-control"
                          id="inputEmail"
                          placeholder="example@kmutt.ac.th"
                        />
                      </div>
                    </div>
                    <button
                      @click="fetchSlot"
                      class="btn btn-primary btnBlock btnConfirm fixed-button text-center mt-4 mb-4"
                    >
                      ตกลง
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Appointmentdash v-if="activeBtnNav == 'Appointmentdash'" />
      <Bookingdash v-if="activeBtnNav == 'Bookingdash'" />
    </div>
  </div>
</template>

<script>
import Menudash from "@/components/dashboard/Menudash.vue";
import Queuedash from "@/components/dashboard/Queuedash.vue";
import Appointmentdash from "@/components/dashboard/Appointmentdash.vue";
import Bookingdash from "@/components/dashboard/Bookingdash.vue";
import MenuMobile from "@/components/MenuMobile.vue";
import manageEmpPic from "@/components/svg/manageEmpPic.vue";

export default {
  data() {
    return {
      activeBtnNav: "Appointmentdash"
    };
  },
  components: {
    Menudash,
    Queuedash,
    MenuMobile,
    manageEmpPic
  }
};
</script>

<style>
@media (min-width: 776px) {
  .dis-pc-me {
    margin-top: 48px;
    width: 75%;
  }
}
@media (max-width: 420px){
  .dis-pc-me {
    margin-top: 48px;
  }
}
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

label {
  margin-bottom: 0.2rem;
}
.fixed-button {
  height: 35px;
  width: 75%;
}
</style>

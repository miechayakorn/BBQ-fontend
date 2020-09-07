<template>
  <div class="container mb-4">
    <div class="text-left font-weight-bold" style="margin-top:32px">
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
              <div class="form-group" style="margin-top:48px;">
                <div class="text-left mb-2">
                  <div class="mt-6">
                    <label for="firstName">ชื่อจริงพนักงาน</label>
                    <input type="text" class="form-control" id="firstName" placeholder="ชื่อจริง" />
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
                  @click="sendToBackend"
                  class="btn btn-primary btnBlock btnConfirm fixed-button text-center mt-4 mb-4"
                >เพิ่มพนักงาน</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <VclFacebook v-if="loading" class="mt-3" />
    <div class="mt-3">
      <div class="text-left font-weight-bold mb-3" style="margin-top:32px">
        <span>ส่วนที่ 2 : รายชื่อพนักงานทั้งหมด</span>
      </div>
      <div class="row">
        <DashboardTableEmp :dataUserTable="userEmployee" />
      </div>
    </div>
  </div>
</template>

<script>
import manageEmpPic from "@/components/svg/manageEmpPic.vue";
import VclFacebook from "vue-content-loading";
import DashboardTableEmp from "@/components/table/DashboardTableEmp.vue";

export default {
  data() {
    return {
      loading: false,
      userEmployee: [
        {
          รหัสพนักงาน: "60130500001",
          ชื่อนามสกุล: "หมี หมี",
          ตำแหน่ง: "หมอหมา",
        },
        {
          รหัสพนักงาน: "60130500002",
          ชื่อนามสกุล: "หมี หมี2",
          ตำแหน่ง: "หมอหมี",
        },
        {
          รหัสพนักงาน: "60130500003",
          ชื่อนามสกุล: "หมี หมี3",
          ตำแหน่ง: "หมอหมู",
        },
        {
          รหัสพนักงาน: "60130500004",
          ชื่อนามสกุล: "หมี หมี4",
          ตำแหน่ง: "หมอไก่",
        },
        {
          รหัสพนักงาน: "60130500005",
          ชื่อนามสกุล: "หมี หมี5",
          ตำแหน่ง: "หมอตา",
        },
      ],
    };
  },
  methods: {
    sendToBackend() {},
  },
  components: {
    manageEmpPic,
    VclFacebook,
    DashboardTableEmp,
  },
};
</script>

<style>
</style>
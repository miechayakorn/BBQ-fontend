<template>
  <div class="container mb-4">
    <div class="text-left font-weight-bold" style="margin-top:32px">
      <span>ส่วนที่ 1 : เลือกวันที่และบริการ</span>
    </div>
    <div class="mt-3 div-card">
      <div class="row bg-lightblue">
        <div class="col-7">
          <manageEmpPic class="d-none d-md-block" />
        </div>
        <div class="col-12 col-md-5">
          <div class="row">
            <div class="col-12">
              <div class="form-group dis-pc-me" style="margin-top:48px;">
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
        <span>ส่วนที่ 2 : เลือก slot เวลาให้บริการ</span>
      </div>
      <div class="row">
        <div class="col-12">tes</div>
      </div>
    </div>
  </div>
</template>

<script>
import manageEmpPic from "@/components/svg/manageEmpPic.vue";
import VclFacebook from "vue-content-loading";
export default {
  data() {
    return {
      loading: false,
    };
  },
  methods: {
    sendToBackend() {},
  },
  components: {
    manageEmpPic,
    VclFacebook,
  },
};
</script>

<style>
</style>
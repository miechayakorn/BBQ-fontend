<template>
  <div class="container mb-4">
    <VclFacebook v-if="loading" class="mt-3" />
    <VclList v-if="loading" class="mt-2" />
    <div class="text-left font-weight-bold" style="margin-top:32px">
      <span>ส่วนที่ 1 : พนักงาน {{this.$route.params.id}}</span>
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
    <!-- <div class="mt-3">
      <div class="text-left font-weight-bold mb-3" style="margin-top:32px">
        <span>ส่วนที่ 2 : รายชื่อพนักงานทั้งหมด</span>
      </div>
      <div class="row"></div>
    </div>-->
  </div>
</template>

<script>
import axios from "axios";
import manageEmpPic from "@/components/svg/manageEmpPic.vue";
import { errorSWAL } from "@/utility/swal.js";
import { VclFacebook, VclList } from "vue-content-loading";

export default {
  data() {
    return {
      loading: false,
      dataFetch: {
        dataTypes: [],
      },
    };
  },
  async mounted() {
    this.loading = true;
    await axios
      .get(`${process.env.VUE_APP_BACKEND_URL}/ServiceTypes`, {
        headers: { Authorization: `Bearer ${this.$store.state.token}` },
      })
      .then((res) => {
        this.dataFetch.dataTypes = res.data;
      })
      .catch((res) => {
        console.log("===== Backend-error ======");
        console.error(res);
        this.$swal({ ...errorSWAL });
        this.$router.push("/admin/dashboard/manageemployee/");
      });
    this.loading = false;
  },
  methods: {
    sendToBackend() {},
  },
  components: {
    manageEmpPic,
    VclFacebook,
    VclList,
  },
};
</script>

<style>
</style>
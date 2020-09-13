<template>
  <div class="container mb-4">
    
    <VclFacebook v-if="loading" class="mt-3" />
    <VclList v-if="loading" class="mt-2" />
    <div class="text-left font-weight-bold" style="margin-top:32px">
      <span>ส่วนที่ 1 : พนักงาน {{this.$route.params.id}}</span>
      
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
import Menudash from "@/components/dashboard/Menudash.vue";
import MenuMobile from "@/components/MenuMobile.vue";

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
     Menudash,
    MenuMobile
  },
};
</script>

<style>
</style>
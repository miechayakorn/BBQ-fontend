<template>
  <div class="d-flex">
    <MenuMobile />
    <Menudash />
    <div class="container bg-light mb-4">
      <div class="text-left" style="margin-top: 32px; font-size: 18px">
        <span class="font-weight-bold">ดูประวัติการเข้าใช้บริการ : </span
        ><span>{{ dataHistory[0].name }}</span>
      </div>
      <div class="row">
        <DashboardTableHistoryUser :dataHistory="dataHistory" />
        <div class="col-12">
          <button
            @click="close()"
            class="col-5 btn btn-primary btnBlock btnBack fixed-button text-center"
          >
            <svg
              width="19"
              height="13"
              viewBox="0 0 19 13"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M18.9785 5.14307H4.80852L8.38852 1.55307L6.97852 0.143066L0.978516 6.14307L6.97852 12.1431L8.38852 10.7331L4.80852 7.14307H18.9785V5.14307Z"
                fill="#99A3FF"
              />
            </svg>
            ย้อนกลับ
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Menudash from "@/components/dashboard/Menudash.vue";
import Bookingdash from "@/components/dashboard/Bookingdash.vue";
import DashboardTableHistoryUser from "@/components/dashboardTable/DashboardTableHistoryUser.vue";
import MenuMobile from "@/components/MenuMobile.vue";
import { errorSWAL } from "@/utility/swal.js";
import { VclFacebook, VclList } from "vue-content-loading";

export default {
  data() {
    return {
      dataHistory: [{ name: "" }],
    };
  },
  components: {
    Menudash,
    MenuMobile,
    DashboardTableHistoryUser,
  },
  methods: {
    close() {
      close();
    },
  },
  async mounted() {
    this.loading = true;
    await axios
      .get(
        `${process.env.VUE_APP_BACKEND_URL}/admin/history?account_id=${this.$route.params.id}`,
        {
          headers: { Authorization: `Bearer ${this.$store.state.token}` },
        }
      )
      .then((res) => {
        this.dataHistory = res.data;
      })
      .catch((res) => {
        console.log("===== Backend-error ======");
        console.error(res);
        this.$swal({ ...errorSWAL });
        this.$router.push("/admin/dashboard/");
      });
    this.loading = false;
  },
};
</script>
<style scoped>
.btnBack {
  background: #ffffff;
  border: 2px solid #99a3ff;
  box-sizing: border-box;
  border-radius: 20px;
  color: #99a3ff;
}

.btnBack:hover {
  color: #fff;
  background-color: #0069d9;
  border-color: #0062cc;
}
</style>

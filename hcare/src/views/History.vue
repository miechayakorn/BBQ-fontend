<template>
  <div>
    <div class="container fixed-container mb-3">
      <div class="form-group text-left">
        <label class="font-weight-bold mb-4">ประวัติการเข้ารับบริการ</label>
        <div class="form">
          <div class="container">
            <HistoryCard v-if="!checkAppointment" :data="dataFetch" />
            <div class v-else-if="checkAppointment">
              <div class="row">
                <div class="col-12">
                  <span class="announcement d-flex justify-content-center mt-3"
                    >คุณไม่มีประวัติการเข้าใช้บริการ</span
                  >
                </div>
                <div class="fix-buttom-man">
                  <man />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- {{dataFetch}} -->
  </div>
</template>

<script>
import axios from "axios";
import HistoryCard from "@/components/HistoryCard.vue";
import man from "@/components/svg/man.vue";

export default {
  data() {
    return {
      dataFetch: [],
      checkAppointment: false,
    };
  },
  components: {
    man,
    HistoryCard,
  },
  async mounted() {
    await axios
      .get(`${process.env.VUE_APP_BACKEND_URL}/history`, {
        headers: { Authorization: `Bearer ${this.$store.state.token}` },
      })
      .then((res) => {
        if (res.data.length != 0) {
          this.checkAppointment = false;
          this.dataFetch = res.data;
        } else {
          this.checkAppointment = true;
          this.dataFetch = res.data;
        }
      });
  },
};
</script>

<style scoped>
@media (min-width: 900px) {
  .fixed-container {
    width: 720px;
  }
}
.card {
  border: 0px solid rgba(255, 255, 255);
  border-radius: 0.625rem;
  padding-bottom: 24px;
}
.announcement {
  font-size: 20px;
}
.fix-buttom-man {
  position: absolute;
  left: 0;
  top: 50%;
  width: 100%;
  text-align: center;
  font-size: 18px;
}
</style>

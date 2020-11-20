<template>
  <div class="container fixed-container mb-3">
    <div v-if="loading">
      <VclFacebook />
      <VclList class="mt-2" />
      <VclList class="mt-2" />
    </div>
    <div v-if="!loading">
      <div class="form-group text-left">
        <label class="font-weight-bold mb-4">{{ $t("history") }}</label>
        <div class="form">
          <div class="container">
            <HistoryCard v-if="!checkAppointment" :data="dataFetch" />
            <div class v-else-if="checkAppointment">
              <div class="row justify-content-center">
                <span class="announcement mt-3"
                  >{{ $t("Nohistory") }}</span
                >
                <man class="d-flex justify-content-center" />
              </div>
            </div>
          </div>
        </div>
        <div class="row mt-5" style="text-align: center">
          <div class="col-12" @click="$router.go(-1)">
            <button
              class="btn btnBlock btn-primary fixed-button mb-2"
              style="border-radius: 10px"
            >
              <span style="font-weight: 900; color: white">{{
                $t("back")
              }}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import HistoryCard from "@/components/HistoryCard.vue";
import man from "@/components/svg/man.vue";
import { VclFacebook, VclList } from "vue-content-loading";

export default {
  data() {
    return {
      loading: false,
      dataFetch: [],
      checkAppointment: false,
    };
  },
  components: {
    man,
    HistoryCard,
    VclFacebook,
    VclList,
  },
  async mounted() {
    this.loading = true;
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
    this.loading = false;
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
</style>

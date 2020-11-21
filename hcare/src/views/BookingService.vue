<template>
  <div class="form">
    <div class="container fixed-container mb-3" v-if="loading">
      <VclFacebook />
      <VclList class="mt-2" />
      <VclList class="mt-2" />
    </div>
    <div class="container" v-if="!loading">
      <p class="text-left font-weight-bold">
        {{ $t("service") }} : {{ this.$store.state.booking.location.location_name }}
      </p>

      <ServiceTypeBox
        v-if="haveData"
        :dataTypes="dataFetch.dataTypes"
        v-on:serviceDataType="fetchDate"
      />

      <div v-else class="row" style="text-align: center">
        <div class="col-12">
          <div class="alert alert-warning text-center" role="alert">
            ไม่พบบริการ ณ สถานที่นี้
          </div>
        </div>
        <div class="col-12" @click="$router.go(-1)" style="margin-top: 250px">
          <button
            class="btn btnBlock btn-primary fixed-button mb-2"
            style="border-radius: 10px"
          >
            <span style="font-weight: 900; color: white">{{ $t("back") }}</span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import ServiceTypeBox from "@/components/ServiceTypeBox.vue";
import { VclFacebook, VclList } from "vue-content-loading";

export default {
  data() {
    return {
      loading: false,
      haveData: false,
      dataFetch: {
        dataTypes: null,
      },
    };
  },
  components: {
    ServiceTypeBox,
    VclFacebook,
    VclList,
  },

  async mounted() {
    this.loading = true;
    if (this.$store.state.booking.location.location_id) {
      await axios
        .get(
          `${process.env.VUE_APP_BACKEND_URL}/ServiceTypes/${this.$store.state.booking.location.location_id}`
        )
        .then((res) => {
          this.dataFetch.dataTypes = res.data;
          this.haveData = this.dataFetch.dataTypes.length != 0;
        });
    } else {
      this.$router.push("/booking");
    }

    this.loading = false;
  },

  methods: {
    fetchDate(serviceDataType) {
      this.$store.state.booking.serviceDataType = serviceDataType;
      window.history.go(-1);
    },
  },
};
</script>

<style>
</style>
<template>
  <div class="form">
    <div class="container fixed-container mb-3" v-if="loading">
      <VclFacebook />
      <VclList class="mt-2" />
      <VclList class="mt-2" />
    </div>
    <div class="container" v-if="!loading">
      {{ this.$store.state.booking.location_id }}
      <ServiceTypeBox
        :dataTypes="dataFetch.dataTypes"
        v-on:serviceDataType="fetchDate"
      />
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

    if (this.$store.state.booking.location_id) {
      await axios
        .get(
          `${process.env.VUE_APP_BACKEND_URL}/ServiceTypes/${this.$store.state.booking.location_id}`
        )
        .then((res) => {
          this.dataFetch.dataTypes = res.data;
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
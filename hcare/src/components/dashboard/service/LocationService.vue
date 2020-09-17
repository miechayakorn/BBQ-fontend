<template>
  <div class="container mb-4">
    <div class="row mt-3 div-card">
      <div class="col-6">
        <docterLocation class="d-none d-md-block mx-auto mt-4 mb-4" />
      </div>
      <div class="col-12 col-md-6">
        <div class="col-12 col-md-7">
          <div class="form-group text-left" style="margin-top:48px;">
            <label for="location_name">เพิ่มสถานที่ให้บริการ</label>
            <input
              type="text"
              id="location_name"
              class="form-control col-12"
              placeholder="กรุณาพิมพ์ชื่อสถานที่"
              v-model="dataPrepareSend.location_name"
            />
          </div>
        </div>
        <div class="col-12">
          <button
            @click="sendCreateService"
            class="btn btn-primary mt-4 mb-4 mb-md-0 btnBlock btnConfirm fixed-button col-12 col-md-7 float-left"
          >
            เพิ่มสถานที่
            <i class="fas fa-map-marker-alt ml-2"></i>
          </button>
        </div>
      </div>
    </div>
    <VclFacebook v-if="loading" class="mt-3" />
    <div class="row mt-3">
      <div v-for="(item, index) in dataFetch.dataLocation" :key="index" class="col-12 col-md-3">
        <div class="m-1">
          <div class="col-12 div-card-location p-4">
            <iconLocation />
            <div class="col-12 mt-2">{{item.location_name }}</div>
            <toggle-button
              class="mt-2"
              :width="45"
              :height="25"
              :font-size="14"
              value
              color="#99a3ff"
              @change="statusService(time,$event.value)"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import docterLocation from "@/components/svg/docterLocation.vue";
import iconLocation from "@/components/svg/icon/iconLocation.vue";
import VclFacebook from "vue-content-loading";

export default {
  data() {
    return {
      loading: false,
      dataFetch: { dataLocation: [] },
      dataPrepareSend: {},
    };
  },
  components: {
    VclFacebook,
    docterLocation,
    iconLocation,
  },
  methods: {
    sendCreateService() {},
    statusService() {},
  },
  async mounted() {
    await axios
      .get(`${process.env.VUE_APP_BACKEND_URL}/location`)
      .then((res) => {
        this.dataFetch.dataLocation = res.data;
      });
  },
};
</script>

<style scoped>
.div-card-location {
  background: #6d75be;
  box-shadow: 0px 4px 8px #e6e8ff;
  border-radius: 10px;
  color: #ffffff;
  font-weight: bold;
  font-size: 18px;
}
</style>

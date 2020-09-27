<template>
  <div class="container mb-4">
    <div class="row mt-3 div-card">
      <div class="col-6">
        <docterLocation class="d-none d-md-block mx-auto mt-4 mb-4" />
      </div>
      <div class="col-12 col-md-6">
        <div class="col-12 col-md-7">
          <div class="form-group text-left" style="margin-top: 48px">
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
      <div
        v-for="(item, index) in dataFetch.dataLocation"
        :key="index"
        class="col-12 col-md-3"
      >
        <div class="m-1">
          <div class="col-12 div-card-location p-4">
            <iconLocation />
            <div class="col-12 mt-2">{{ item.location_name }}</div>
            <toggle-button
              class="mt-2"
              :width="45"
              :height="25"
              :font-size="14"
              :value="item.is_active"
              color="#99a3ff"
              @change="statusService(item.location_id, $event.value)"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { errorSWAL } from "@/utility/swal.js";
import docterLocation from "@/components/svg/docterLocation.vue";
import iconLocation from "@/components/svg/icon/iconLocation.vue";
import VclFacebook from "vue-content-loading";

export default {
  data() {
    return {
      loading: false,
      dataFetch: { dataLocation: [] },
      dataPrepareSend: { location_name: "" },
    };
  },
  components: {
    VclFacebook,
    docterLocation,
    iconLocation,
  },
  methods: {
    async sendCreateService() {
      if (this.dataPrepareSend.location_name != "") {
        await axios
          .post(
            `${process.env.VUE_APP_BACKEND_URL}/addlocation`,
            {
              location_name: this.dataPrepareSend.location_name,
            },
            {
              headers: { Authorization: `Bearer ${this.$store.state.token}` },
            }
          )
          .then((res) => {
            if (res.status == 201) {
              this.dataPrepareSend.location_name = "";
              this.$swal({
                toast: true,
                position: "top-end",
                showConfirmButton: false,
                timerProgressBar: true,
                onOpen: (toast) => {
                  toast.addEventListener("mouseenter", this.$swal.stopTimer);
                  toast.addEventListener("mouseleave", this.$swal.resumeTimer);
                },
                timer: 3000,
                icon: "success",
                title: "สร้างสถานที่สำเร็จ",
              });
              this.getLocation();
            } else {
              console.log("===== Backend-error ======");
              console.error(res.data);
              this.$swal({
                icon: "warning",
                title: "คำเตือน",
                text: res.data,
              });
            }
          })
          .catch((res) => {
            console.log("===== Backend-error ======");
            console.error(res);
            this.$swal({ ...errorSWAL });
          });
      } else {
        this.$swal({
          icon: "warning",
          title: "คำเตือน",
          text: "กรุณากรอกข้อมูลให้ครบ",
        });
      }
    },
    async statusService(location_id, status) {
      await axios
        .patch(
          `${process.env.VUE_APP_BACKEND_URL}/updatelocationstatus`,
          {
            location_id: location_id,
            status: status,
          },
          {
            headers: { Authorization: `Bearer ${this.$store.state.token}` },
          }
        )
        .then((res) => {
          if (res.status == 201) {
            this.dataPrepareSend.location_name = "";
            this.$swal({
              toast: true,
              position: "top-end",
              showConfirmButton: false,
              timerProgressBar: true,
              onOpen: (toast) => {
                toast.addEventListener("mouseenter", this.$swal.stopTimer);
                toast.addEventListener("mouseleave", this.$swal.resumeTimer);
              },
              timer: 3000,
              icon: "success",
              title: "แก้ไขสถานที่สำเร็จ",
            });
            this.getLocation();
          } else {
            console.log("===== Backend-error ======");
            console.error(res.data);
            this.$swal({
              icon: "warning",
              title: "คำเตือน",
              text: res.data,
            });
          }
        })
        .catch((res) => {
          console.log("===== Backend-error ======");
          console.error(res);
          this.$swal({ ...errorSWAL });
        });
    },
    async getLocation() {
      await axios
        .get(`${process.env.VUE_APP_BACKEND_URL}/getlocations`, {
          headers: { Authorization: `Bearer ${this.$store.state.token}` },
        })
        .then((res) => {
          this.dataFetch.dataLocation = res.data;
        });
    },
  },
  mounted() {
    this.getLocation();
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

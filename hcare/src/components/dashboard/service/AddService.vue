<template>
  <div class="container mb-4">
    <div class="text-left font-weight-bold" style="margin-top:32px">
      <span>เพิ่มบริการ</span>
    </div>
    <div class="row mt-3 div-card">
      <div class="col-6">
        <manHome class="d-none d-md-block" />
      </div>
      <div class="col-12 col-md-6">
        <div class="col-12 col-md-7">
          <div class="form-group text-left" style="margin-top:48px;">
            <label for="serviceType">ชื่อบริการ</label>
            <input
              type="text"
              id="InputDate"
              class="form-control col-12"
              placeholder="กรุณาพิมพ์ชื่อบริการ"
              v-model="dataPrepareSend.date"
            />
          </div>
        </div>
        <div class="col-12 col-md-7">
          <div class="form-group text-left">
            <label for="InputDate">ผู้รับผิดชอบ</label>

            <select id="serviceType" class="form-control" v-model="dataPrepareSend.type_id">
              <option value disabled selected>-- กรุณาเลือกบริการ --</option>
              <option
                v-for="(data, index) in dataFetch.dataTypes"
                :key="index"
                :value="data.type_id"
              >{{ data.type_name }}</option>
            </select>
          </div>
        </div>
        <div class="col-12">
          <button
            class="btn btn-primary mt-4 mb-4 mb-md-0 btnBlock btnConfirm fixed-button col-12 col-md-7 float-left"
          >ตกลง</button>
        </div>
      </div>
    </div>
    <VclFacebook v-if="loading" class="mt-3" />
  </div>
</template>

<script>
import axios from "axios";
import ServiceTypeBox from "@/components/ServiceTypeBox.vue";
import manHome from "@/components/svg/manHome.vue";
import VclFacebook from "vue-content-loading";

export default {
  data() {
    return {
      loading: false,
      dataFetch: {
        dataTypes: null,
      },
      dataPrepareSend: {
        service: {
          day: "",
          startTime: "",
          endTime: "",
          docter: "",
          slot: "",
        },
        type_id: 1,
        date: null,
      },
      newservce: null,
    };
  },
  components: {
    ServiceTypeBox,
    manHome,
    VclFacebook,
  },
  methods: {
    async fetchService() {},
    async fetchDate(serviceDataType) {
      this.dataPrepareSend.type_id = serviceDataType.type_id;
      await axios
        .get(
          `${process.env.VUE_APP_BACKEND_URL}/ServiceDate/${serviceDataType.type_id}`,
          {
            headers: { Authorization: `Bearer ${this.$store.state.token}` },
          }
        )
        .then((res) => {
          this.dataFetch.dataDates = res.data;
          console.log(this.dataFetch.dataDates);
        });
    },
    async fetchTimeSlot() {},
    async sendServiceToBackend() {
      console.log("sendServiceToBackend");
      await axios
        .post(
          `${process.env.VUE_APP_BACKEND_URL}/servicetype/create`,
          {
            type_name: this.newservce,
          },
          {
            headers: {
              Authorization: `Bearer ${this.$store.state.token}`,
            },
          }
        )
        .then((res) => {
          this.$swal({
            toast: true,
            position: "top-end",
            showConfirmButton: false,
            timer: 3000,
            icon: "success",
            title: "การเพิ่มประเภทการให้บริการสำเร็จ",
          });
          this.newservce = null;
        });
    },
    async sendTimeServiceToBackend() {
      console.log("sendTimeServiceToBackend");
      //Send DATA
    },
  },
  async mounted() {
    //เรียกข้อมูล Default
    //Type
    await axios
      .get(`${process.env.VUE_APP_BACKEND_URL}/ServiceTypes`, {
        headers: { Authorization: `Bearer ${this.$store.state.token}` },
      })
      .then((res) => {
        this.dataFetch.dataTypes = res.data;
      });
  },
};
</script>

<style></style>

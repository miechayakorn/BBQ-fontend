<template>
  <div>
    <div class="container mt-3 bg-white">
      <div class="row p-3 pt-4">
        <div class="col-12">
          <h6 class="text-left">ตารางให้บริการ</h6>
          <ServiceTypeBox
            :dataTypes="dataFetch.dataTypes"
            v-on:serviceDataType="fetchDate"
          />
        </div>
      </div>
    </div>
    <div class="container mt-3 bg-white">
      <div class="row p-3 pt-4 bg-light">
        <div class="col-12">
          <h6 class="text-left">จิตแพทย์</h6>
        </div>
      </div>
      <div class="row p-3 pt-4">
        <div class="col-2 text-center">
          <h6>วันจันทร์</h6>
          <p>14 DEC 2020</p>
        </div>
        <div class="col-10">
          <div class="row">
            <div class="col-2 mt-1">
              <div class="btnType btn-outline-primary p-1">
                <span style="color: rgb(85, 85, 85);">8.30</span>
              </div>
            </div>
            <div class="col-2 mt-1">
              <div class="btnType btn-outline-primary p-1">
                <span style="color: rgb(85, 85, 85);">8.30</span>
              </div>
            </div>
            <div class="col-2 mt-1">
              <div class="btnType btn-outline-primary p-1">
                <span style="color: rgb(85, 85, 85);">8.30</span>
              </div>
            </div>
            <div class="col-2 mt-1">
              <div class="btnType btn-outline-primary p-1">
                <span style="color: rgb(85, 85, 85);">8.30</span>
              </div>
            </div>
            <div class="col-2 mt-1">
              <div class="btnType btn-outline-primary p-1">
                <span style="color: rgb(85, 85, 85);">8.30</span>
              </div>
            </div>
            <div class="col-2 mt-1">
              <div class="btnType btn-outline-primary p-1">
                <span style="color: rgb(85, 85, 85);">8.30</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import ServiceTypeBox from "@/components/ServiceTypeBox.vue";

export default {
  data() {
    return {
      dataFetch: {
        dataTypes: null
      },
      dataPrepareSend: {
        type_id: 1,
        date: null
      }
    };
  },
  components: {
    ServiceTypeBox
  },
  async mounted() {
    //เรียกข้อมูล Default
    //Type
    await axios
      .get(`${process.env.VUE_APP_BACKEND_URL}/ServiceTypes`)
      .then(res => {
        this.dataFetch.dataTypes = res.data;
      });
  }
};
</script>

<style></style>

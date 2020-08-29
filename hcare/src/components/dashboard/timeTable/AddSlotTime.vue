<template>
  <div class="container">
    <div class="mt-3">
      <div class="text-left font-weight-bold" style="margin-top:32px">
        <span>ส่วนที่ 1 : เลือกวันที่และบริการ</span>
      </div>
      <div class="mt-3 div-card">
        <div class="row bg-blueMan2">
          <div class="col-4">
            <man2 class="d-none d-md-block" />
          </div>
          <div class="col-12 col-md-8">
            <div class="row">
              <div class="col-12 col-md-6">
                <div class="form-group text-left" style="margin-top:48px;">
                  <label for="serviceType">เลือกบริการ</label>
                  <select
                    id="serviceType"
                    v-model="dataPrepareSend.serviceType"
                    class="form-control"
                  >
                    <option value disabled selected
                      >-- กรุณาเลือกบริการ --</option
                    >
                    <option
                      v-for="(data, index) in dataFetch.dataTypes"
                      :key="index"
                      :value="data.type_id"
                      >{{ data.type_name }}</option
                    >
                  </select>
                </div>
              </div>
              <div class="col-12 col-md-6">
                <div class="form-group text-left" style="margin-top:48px;">
                  <label for="InputDate">เลือกวันที่</label>
                  <input
                    type="text"
                    id="InputDate"
                    class="form-control col-12"
                    placeholder="กรุณาเลือกวัน"
                    v-model="dataPrepareSend.date"
                    onfocus="(this.type='date')"
                  />
                </div>
              </div>
              <div class="col-12 mt-4 mb-4">
                <button
                  @click="fetchSlot"
                  class="btn btn-primary btnBlock btnConfirm fixed-button mb-3"
                >
                  ตกลง
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="mt-3" v-show="visibleState">
      <div class="text-left font-weight-bold" style="margin-top:32px">
        <span>ส่วนที่ 2 : เลือก slot เวลาให้บริการ</span>
      </div>
      <div class="row p-3 mt-3 div-card">
        <div class="col-12 text-left">
          <div class="row">
            <div class="col-12 col-md-4 mt-4">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12 0C5.38332 0 0 5.38332 0 12C0 18.6167 5.38332 24 12 24C18.6167 24 24 18.6167 24 12C24 5.38332 18.6167 0 12 0ZM12 22.5C6.2102 22.5 1.50001 17.7898 1.50001 12C1.50001 6.2102 6.2102 1.50001 12 1.50001C17.7898 1.50001 22.5 6.2102 22.5 12C22.5 17.7898 17.7898 22.5 12 22.5Z"
                  fill="#555555"
                />
                <path
                  d="M12.75 4.49994H11.25V12.3105L15.9697 17.0302L17.0303 15.9696L12.75 11.6894V4.49994Z"
                  fill="#555555"
                />
              </svg>
              <span class="ml-4">
                วันที่ 24 กุมภาพันธ์ 2563
              </span>
            </div>
            <div class="col-8">
              <div class="row">
                <div class="form-group">
                  <label
                    class="col-md-1 checkbox-inline m-3"
                    v-for="(time, index) in dataFetch.dataSlotTime"
                    :key="index"
                  >
                    <span class="text-center">
                      {{ time.slot.substring(0, 5) }}
                    </span>
                    <input
                      type="checkbox"
                      :value="time"
                      v-model="dataPrepareSend.slot_time"
                    />
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-12">
          <button
            @click="sendToBackend"
            class="btn btn-primary btnBlock btnConfirm mt-4 fixed-button mb-2"
          >
            <span>ยืนยันการแก้ไข</span>
          </button>
        </div>
      </div>
    </div>
    dataPrepareSend : {{ dataPrepareSend }}
    <br />
    <br />
    dataFetch : {{ dataFetch }} <br />
  </div>
</template>

<script>
import axios from "axios";
import ServiceTypeBox from "@/components/ServiceTypeBox.vue";
import man2 from "@/components/svg/man2.vue";
import { errorSWAL } from "@/utility/swal.js";

export default {
  data() {
    return {
      visibleState: false,
      dataFetch: {
        dataTypes: null,
        dataSlotTime: []
      },
      dataPrepareSend: {
        serviceType: "",
        date: "",
        slot_time: []
      }
    };
  },
  components: {
    man2,
    ServiceTypeBox
  },
  methods: {
    async fetchSlot() {
      if (
        this.dataPrepareSend.serviceType != "" &&
        this.dataPrepareSend.date != ""
      ) {
        try {
          await axios
            .post(
              `${process.env.VUE_APP_BACKEND_URL}/admin/dashboard/timetable/managetable/checktimeslot`,
              {
                type_id: this.dataPrepareSend.serviceType,
                date: this.dataPrepareSend.date
              },
              {
                headers: {
                  Authorization: `Bearer ${this.$store.state.token}`
                }
              }
            )
            .then(res => {
              this.dataFetch.dataSlotTime = res.data.timeArray;
              this.visibleState = true;
            });
        } catch (error) {
          this.$swal({ ...errorSWAL });
        }
      } else {
        this.$swal({
          icon: "warning",
          title: "คำเตือน",
          text: "กรุณาเลือกบริการ และวันที่"
        });
      }
    },
    async sendToBackend() {
      try {
        await axios
          .post(
            `${process.env.VUE_APP_BACKEND_URL}/admin/dashboard/timetable/managetable/savetimeslot`,
            {
              type_id: this.dataPrepareSend.serviceType,
              date: this.dataPrepareSend.date
            },
            {
              headers: {
                Authorization: `Bearer ${this.$store.state.token}`
              }
            }
          )
          .then(res => {
            this.dataFetch.dataSlotTime = res.data;
            this.visibleState = true;
          });
      } catch (error) {
        this.$swal({ ...errorSWAL });
      }
    }
  },
  async mounted() {
    await axios
      .get(`${process.env.VUE_APP_BACKEND_URL}/ServiceTypes`, {
        headers: {
          Authorization: `Bearer ${this.$store.state.token}`
        }
      })
      .then(res => {
        this.dataFetch.dataTypes = res.data;
      });
  }
};
</script>

<style></style>

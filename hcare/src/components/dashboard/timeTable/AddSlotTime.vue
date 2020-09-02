<template>
  <div class="container">
    <div class="text-left font-weight-bold" style="margin-top:32px">
      <span>ส่วนที่ 1 : เลือกวันที่และบริการ</span>
    </div>
    <div class="mt-3 div-card">
      <div class="row bg-blueMan2">
        <div class="col-4">
          <man2 class="d-none d-md-block mt-3" />
        </div>
        <div class="col-12 col-md-8">
          <div class="row">
            <div class="col-12 col-md-6">
              <div class="form-group text-left" style="margin-top:48px;">
                <label for="serviceType">เลือกบริการ</label>
                <select id="serviceType" v-model="dataPrepareSend.serviceType" class="form-control">
                  <option value disabled selected>-- กรุณาเลือกบริการ --</option>
                  <option
                    v-for="(data, index) in dataFetch.dataTypes"
                    :key="index"
                    :value="data.type_id"
                  >{{ data.type_name }}</option>
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
              >ตกลง</button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="mt-3" v-show="visibleState">
      <div class="text-left font-weight-bold mb-3" style="margin-top:32px">
        <span>ส่วนที่ 2 : เลือก slot เวลาให้บริการ</span>
      </div>
      <div class="row box-02" v-if="noContent == false">
        <div class="col-12 col-md-3" style="border-right: 3px solid rgba(224, 224, 224, 0.28);">
          <div class="col-12 h75 dis-pc">
            <div>
              <div class="col-12">
                <svg
                  class="mr-1"
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
                {{this.dataFetch.dateText}}
              </div>
            </div>
          </div>
        </div>
        <div class="col-12 col-md-9" style=" display:block;">
          <div class="row mt-4 mb-4">
            <div
              class="col-6 col-md-4 col-lg-3"
              v-for="(time, index) in dataFetch.dataSlotTime"
              :key="index"
            >
              <div class="col-12">
                <span style="text-align: center;">{{ time.slot.substring(0, 5) }}</span>
              </div>
              <div v-if="time.status == 'available'" class="col-12">
                <toggle-button
                  class="mr-2"
                  :width="45"
                  :height="25"
                  :font-size="14"
                  :value="false"
                  color="#99a3ff"
                  @change="onChangeEventHandler(time,$event.value)"
                />
              </div>
              <div
                v-if="time.status == 'unavailable'"
                style="font-weight: bold;"
                class="col-12 text-primary"
              >
                <i class="fas fa-check-circle"></i> สร้างเรียบร้อยแล้ว
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-12 mt-3 mb-3">
              <button @click="sendToBackend" class="btn btn-primary btnBlock btnConfirm fixed-button mb-2">ยืนยันการแก้ไข</button>
            </div>
          </div>
        </div>
      </div>

      <div class="row box-02" v-if="noContent == true">
        <div class="col-12 col-md-3 p-4">ไม่มีบริการในวันที่เลือก</div>
      </div>
    </div>
    <br />
    <br />
    <br />
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
      noContent: false,
      visibleState: false,
      dataFetch: {
        dataTypes: null,
        dataSlotTime: [],
        dateText: "",
      },
      dataPrepareSend: {
        serviceType: "",
        date: "",
        slot_time: [],
      },
    };
  },
  components: {
    man2,
    ServiceTypeBox,
  },
  methods: {
    onChangeEventHandler(time, statusButton) {
      if (statusButton == true) {
        console.log(time);
        // Adding  Array element
        this.dataPrepareSend.slot_time.push(time.slot);
      } else if (statusButton == false) {
        this.dataPrepareSend.slot_time = Object.values(
          // Removing Array element
          Object.fromEntries(
            Object.entries(this.dataPrepareSend.slot_time).filter(
              ([key, val]) => val !== time.slot
            )
          )
        );
      }
    },
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
                date: this.dataPrepareSend.date,
              },
              {
                headers: {
                  Authorization: `Bearer ${this.$store.state.token}`,
                },
              }
            )
            .then((res) => {
              if (res.status == 204) {
                this.noContent = true;
              } else if (res.status == 200) {
                this.noContent = false;
                this.dataFetch.dataSlotTime = res.data.timeArray;
                this.dataFetch.dateText = res.data.date;
              }
              this.visibleState = true;
            });
        } catch (error) {
          this.$swal({
            ...errorSWAL,
          });
        }
      } else {
        this.$swal({
          icon: "warning",
          title: "คำเตือน",
          text: "กรุณาเลือกบริการ และวันที่",
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
              date: this.dataPrepareSend.date,
              time_slot: this.dataPrepareSend.slot_time
            },
            {
              headers: {
                Authorization: `Bearer ${this.$store.state.token}`,
              },
            }
          )
          .then((res) => {
            this.dataFetch.dataSlotTime = res.data;
            this.visibleState = true;
          });
      } catch (error) {
        this.$swal({
          ...errorSWAL,
        });
      }
    },
  },
  async mounted() {
    await axios
      .get(`${process.env.VUE_APP_BACKEND_URL}/ServiceTypes`, {
        headers: {
          Authorization: `Bearer ${this.$store.state.token}`,
        },
      })
      .then((res) => {
        this.dataFetch.dataTypes = res.data;
      });
  },
};
</script>

<style></style>

<template>
  <div class="container mb-4">
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
    <VclFacebook v-if="loading" class="mt-3"/>
    <div class="mt-3" v-show="visibleState">
      <div class="text-left font-weight-bold mb-3" style="margin-top:32px">
        <span>ส่วนที่ 2 : เลือก slot เวลาให้บริการ</span>
      </div>
      <div class="row box-02" v-if="noContent == false">
        <div class="col-12 col-md-3" style="border-right: 3px solid rgba(224, 224, 224, 0.28);">
          <div class="col-12 h75 dis-pc">
            <div>
              <div class="col-12 mt-4">
                <i class="far fa-clock"></i>
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
          <div class="row" v-show="dataPrepareSend.slot_time.length != 0">
            <div class="col-12 mt-3 mb-3">
              <button
                @click="sendToBackend"
                class="btn btn-primary btnBlock btnConfirm fixed-button mb-2"
              >ยืนยันการแก้ไข</button>
            </div>
          </div>
        </div>
      </div>
      <div class="row box-02" v-if="noContent == true">
        <div class="col-12 col-md-3 p-4">ไม่มีบริการในวันที่เลือก</div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import man2 from "@/components/svg/man2.vue";
import { errorSWAL } from "@/utility/swal.js";
import VclFacebook from "vue-content-loading";

export default {
  data() {
    return {
      loading: false,
      noContent: false,
      visibleState: false,
      dataFetch: {
        dataTypes: null,
        dataSlotTime: [],
        dateText: "",
      },
      dataPrepareSend: {
        type_id: "",
        date: "",
        slot_time: [],
      },
    };
  },
  components: {
    man2,
    VclFacebook,
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
        this.dataPrepareSend.type_id != "" &&
        this.dataPrepareSend.date != ""
      ) {
        this.loading = true
        try {
          await axios
            .post(
              `${process.env.VUE_APP_BACKEND_URL}/admin/dashboard/timetable/managetable/checktimeslot`,
              {
                type_id: this.dataPrepareSend.type_id,
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
                this.dataFetch.dataSlotTime = [];
                this.$swal({
                  icon: "warning",
                  title: "คำเตือน",
                  text: "ไม่มีวันให้บริการ สำหรับประเภทบริการที่คุณเลือก",
                });
              } else if (res.status == 200) {
                this.noContent = false;
                this.dataFetch.dataSlotTime = res.data.timeArray;
                this.dataFetch.dateText = res.data.date_use;
              }
              this.visibleState = true;
            });
        } catch (error) {
          this.$swal({
            ...errorSWAL,
          });
        }
        this.loading = false
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
              type_id: this.dataPrepareSend.type_id,
              date: this.dataPrepareSend.date,
              time_slot: this.dataPrepareSend.slot_time,
            },
            {
              headers: {
                Authorization: `Bearer ${this.$store.state.token}`,
              },
            }
          )
          .then((res) => {
            this.dataFetch.dataSlotTime = res.data;
            this.dataPrepareSend.slot_time = [];
            this.fetchSlot();
          });
      } catch (error) {
        this.$swal({
          ...errorSWAL,
        });
      }
    },
  },
  async mounted() {
    //เรียกข้อมูล Default Type
    await axios
      .get(`${process.env.VUE_APP_BACKEND_URL}/ServiceTypesStaff`, {
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
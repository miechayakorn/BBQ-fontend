<template>
  <div class="container">
    <div class="text-left font-weight-bold" style="margin-top:32px">
      <span>ส่วนที่ 1 : เลือกวันที่และบริการ</span>
    </div>
    <div class="mt-3 div-card">
      <div class="row box-01">
        <div class="col-4">
          <man2 class="d-none d-md-block mt-3" />
        </div>
        <div class="col-12 col-md-8">
          <div class="row">
            <div class="col-12 col-md-6">
              <div class="form-group text-left" style="margin-top:48px;">
                <label for="InputName">เลือกบริการ</label>
                <select class="form-control" v-model="dataPrepareSend.type_id">
                  <option :value="null" disabled selected="selected">-- กรุณาเลือกบริการ --</option>
                  <option
                    v-for="(type, index) in dataFetch.dataTypes"
                    :key="index"
                    :value="type.type_id"
                  >{{ type.type_name }}</option>
                </select>
              </div>
            </div>
            <div class="col-12 col-md-6">
              <div class="form-group text-left" style="margin-top:48px;">
                <label for="InputName">เลือกวันที่</label>
                <input
                  type="text"
                  id="InputDay"
                  class="form-control col-12 col-lg-12 text-left mx-auto"
                  placeholder="กรุณาเลือกวัน"
                  v-model="dataPrepareSend.date"
                  onfocus="(this.type='date')"
                />
              </div>
            </div>
          </div>
          <div class="col-12 mt-4 mb-4">
            <button
              class="btn btn-primary btnBlock btnConfirm fixed-button mb-2"
              @click="fetchSlot"
            >ตกลง</button>
          </div>
        </div>
      </div>
    </div>
    <div class="row mt-2">
      <div class="col-12 text-left font-weight-bold" style="margin-top:32px">
        <span>ส่วนที่ 2 : เลือก slot เวลาให้บริการ</span>
      </div>
      <div class="col-12 mt-3 div-card">
        <div class="row box-02">
          <div class="col-12 col-md-3" style="border-right: 3px solid rgba(224, 224, 224, 0.28);">
            <div class="col-12 h75 dis-pc">
              <div>
                <div class="col-12">{{dataFetch.dataDateUse}}</div>
                <div class="col-12 mt-2">
                  <toggle-button
                    class="mr-2"
                    :width="45"
                    :height="25"
                    :font-size="14"
                    :value="true"
                    color="#99a3ff"
                  />
                </div>
              </div>
            </div>
          </div>
          <div class="col-12 col-md-9" style=" display:block;">
            <div class="row mt-4 mb-4">
              <div
                class="col-6 col-md-4 col-lg-3"
                v-for="(time, index) in dataFetch.dataSlot"
                :key="index"
              >
                <div class="col-12">
                  <span style="text-align: center;">{{time.time_in}}</span>
                </div>
                <div class="col-12">
                  <toggle-button
                    class="mr-2"
                    :width="45"
                    :height="25"
                    :font-size="14"
                    :value="true"
                    color="#99a3ff"
                  />
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-12 mt-3 mb-3">
                <button class="btn btn-primary btnBlock btnConfirm fixed-button mb-2">ยืนยันการแก้ไข</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    {{dataPrepareSend}}
    {{dataFetch.dataSlot}}
  </div>
</template>

<script>
import axios from "axios";
import man2 from "@/components/svg/man2.vue";
import { errorSWAL } from "@/utility/swal.js";

export default {
  data() {
    return {
      dataFetch: {
        dataTypes: null,
        dataDates: null,
        dataSlot: [],
        dataDateUse: null,
      },
      dataPrepareSend: {
        type_id: null,
        date: null,
        slot: [],
      },
    };
  },
  components: {
    man2,
  },
  methods: {
    async fetchSlot() {
      if (this.dataPrepareSend.type_id && this.dataPrepareSend.date) {
        try {
          await axios
            .post(
              `${process.env.VUE_APP_BACKEND_URL}/admin/dashboard/timetable/EditSlotTime/checkslot`,
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
                this.dataPrepareSend.type_id = null;
                this.dataPrepareSend.date = null;
                this.dataFetch.dataSlot = null;
                this.$swal({
                  icon: "warning",
                  title: "คำเตือน",
                  text: "ไม่มีวันให้บริการ สำหรับประเภทบริการที่คุณเลือก",
                });
              } else if (res.data == "Empty Slot") {
                this.dataPrepareSend.type_id = null;
                this.dataPrepareSend.date = null;
                this.dataFetch.dataSlot = null;

                this.$swal({
                  icon: "warning",
                  title: "คำเตือน",
                  text: "ยังไม่มีตารางให้บริการนี้อยู่",
                });
              } else {
                this.dataFetch.dataSlot = res.data.timeArray;
                this.dataFetch.dataDateUse = res.data.date_use;
              }
            });
        } catch (error) {
          console.log(error);
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
      //Send DATA
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

<style>
.box-01 {
  background: #ffeaa6;
  box-shadow: 0px 4px 8px #ffe6c8;
}

.box-02 {
  background: #ffffff;
  box-shadow: 0px 4px 8px #e9ebfb;
}

@media (min-width: 776px) {
  .dis-pc {
    position: absolute;
    top: 35%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
}
</style>

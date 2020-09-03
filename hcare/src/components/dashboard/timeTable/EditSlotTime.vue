<template>
  <div class="container mb-4">
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
                <label for="serviceType">เลือกบริการ</label>
                <select id="serviceType" class="form-control" v-model="dataPrepareSend.type_id">
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
    <div class="row mt-2" v-show="visibleState">
      <div class="col-12 text-left font-weight-bold" style="margin-top:32px">
        <span>ส่วนที่ 2 : เลือก slot เวลาให้บริการ</span>
      </div>
      <div class="col-12 mt-3 div-card">
        <div class="row box-02" v-if="noContent == false">
          <div class="col-12 col-md-3" style="border-right: 3px solid rgba(224, 224, 224, 0.28);">
            <div class="col-12 h75 dis-pc">
              <div>
                <div class="col-12">{{dataFetch.dateText}}</div>
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
                v-for="(time, index) in dataFetch.dataSlotTime"
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
          </div>
        </div>
        <div class="row box-02" v-if="noContent == true">
          <div class="col-12 col-md-3 p-4">ไม่มีบริการในวันที่เลือก</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import man2 from "@/components/svg/man2.vue";
import { errorSWAL } from "@/utility/swal.js";

export default {
  data() {
    return {
      noContent: false,
      visibleState: false,
      dataFetch: {
        dataTypes: null,
        dataDates: null,
        dataSlotTime: [],
        dateText: null,
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
    async sendToBackendOpenTogle() {
      this.visibleState = true;
      //Send DATA
    },
    async sendToBackendCloseToggle() {
      this.visibleState = true;
      //Send DATA
    },
    async sendToBackendRemoveCloseAllToggle() {
      this.visibleState = true;
      //Send DATA
    },
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
                this.noContent = true;
                this.dataFetch.dataSlotTime = [];
                this.$swal({
                  icon: "warning",
                  title: "คำเตือน",
                  text: "ไม่มีวันให้บริการ สำหรับประเภทบริการที่คุณเลือก",
                });
              } else if (res.data == "Empty Slot") {
                this.noContent = true;
                this.dataPrepareSend.type_id = null;
                this.dataPrepareSend.date = null;
                this.dataFetch.dataSlotTime = null;

                this.$swal({
                  icon: "warning",
                  title: "คำเตือน",
                  text: "ยังไม่มีตารางให้บริการนี้อยู่",
                });
              } else {
                this.noContent = false;
                this.dataFetch.dataSlotTime = res.data.timeArray;
                this.dataFetch.dateText = res.data.date_use;
              }
              this.visibleState = true;
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

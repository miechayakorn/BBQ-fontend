<template>
  <div class="container">
    <div class="text-left font-weight-bold" style="margin-top:32px">
      <span>ส่วนที่ 1 : เลือกวันที่และบริการ</span>
    </div>
    <div class="mt-3 div-card">
      <div class="row box-01">
        <div class="col-4">
          <man2 class="d-none d-md-block" />
        </div>
        <div class="col-12 col-md-8">
          <div class="row">
            <div class="col-12 col-md-6">
              <div class="form-group text-left" style="margin-top:48px;">
                <label for="InputName">เลือกบริการ</label>
                <select class="form-control">
                  <option :value="null" disabled selected="selected"
                    >-- กรุณาเลือกบริการ --</option
                  >
                  <option
                    v-for="(type, index) in dataFetch.dataTypes"
                    :key="index"
                    :value="type.type_id"
                    >{{ type.type_name }}</option
                  >
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
            >
              ตกลง
            </button>
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
          <div
            class="col-12 col-md-3"
            style="border-right: 3px solid rgba(224, 224, 224, 0.28);"
          >
            <div
              class="col-12 h75"
              style="position: absolute; top: 35%; left: 50%; transform: translate(-50%, -50%);"
            >
              <div>
                <div class="col-12">14 ธันวาคม 2563</div>
                <div class="col-12 mt-2">
                  <toggle-button
                    class="mr-2"
                    :width="45"
                    :height="25"
                    :font-size="14"
                    :value="true"
                    color="#99a3ff"
                    @change="onChangeEventHandler"
                    :labels="{ checked: '', unchecked: '' }"
                  />
                </div>
              </div>
            </div>
          </div>
          <div class="col-12 col-md-9" style=" display:block;">
            <div class="row mt-4 mb-4">
              <div class="col-6 col-md-4 col-lg-3">
                <div class="col-12">
                  <span style="text-align: center;">08.00</span>
                </div>
                <div class="col-12">
                  <toggle-button
                    class="mr-2"
                    :width="45"
                    :height="25"
                    :font-size="14"
                    :value="true"
                    color="#99a3ff"
                    @change="onChangeEventHandler"
                    :labels="{ checked: '', unchecked: '' }"
                  />
                </div>
              </div>
              <div class="col-6 col-md-4 col-lg-3">
                <div class="col-12">
                  <span style="text-align: center;">09.00</span>
                </div>
                <div class="col-12">
                  <toggle-button
                    class="mr-2"
                    :width="45"
                    :height="25"
                    :font-size="14"
                    :value="true"
                    color="#99a3ff"
                    @change="onChangeEventHandler"
                    :labels="{ checked: '', unchecked: '' }"
                  />
                </div>
              </div>
              <div class="col-6 col-md-4 col-lg-3">
                <div class="col-12">
                  <span style="text-align: center;">10.00</span>
                </div>
                <div class="col-12">
                  <toggle-button
                    class="mr-2"
                    :width="45"
                    :height="25"
                    :font-size="14"
                    :value="true"
                    color="#99a3ff"
                    @change="onChangeEventHandler"
                    :labels="{ checked: '', unchecked: '' }"
                  />
                </div>
              </div>
              <div class="col-6 col-md-4 col-lg-3">
                <div class="col-12">
                  <span style="text-align: center;">11.00</span>
                </div>
                <div class="col-12">
                  <toggle-button
                    class="mr-2"
                    :width="45"
                    :height="25"
                    :font-size="14"
                    :value="true"
                    color="#99a3ff"
                    @change="onChangeEventHandler"
                    :labels="{ checked: '', unchecked: '' }"
                  />
                </div>
              </div>
              <div class="col-6 col-md-4 col-lg-3">
                <div class="col-12">
                  <span style="text-align: center;">12.00</span>
                </div>
                <div class="col-12">
                  <toggle-button
                    class="mr-2"
                    :width="45"
                    :height="25"
                    :font-size="14"
                    :value="true"
                    color="#99a3ff"
                    @change="onChangeEventHandler"
                    :labels="{ checked: '', unchecked: '' }"
                  />
                </div>
              </div>
              <div class="col-6 col-md-4 col-lg-3">
                <div class="col-12">
                  <span style="text-align: center;">13.00</span>
                </div>
                <div class="col-12">
                  <toggle-button
                    class="mr-2"
                    :width="45"
                    :height="25"
                    :font-size="14"
                    :value="true"
                    color="#99a3ff"
                    @change="onChangeEventHandler"
                    :labels="{ checked: '', unchecked: '' }"
                  />
                </div>
              </div>
              <div class="col-6 col-md-4 col-lg-3">
                <div class="col-12">
                  <span style="text-align: center;">14.00</span>
                </div>
                <div class="col-12">
                  <toggle-button
                    class="mr-2"
                    :width="45"
                    :height="25"
                    :font-size="14"
                    :value="true"
                    color="#99a3ff"
                    @change="onChangeEventHandler"
                    :labels="{ checked: '', unchecked: '' }"
                  />
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-12 mt-3 mb-3">
                <button
                  class="btn btn-primary btnBlock btnConfirm fixed-button mb-2"
                >
                  ยืนยันการแก้ไข
                </button>
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
import groupDocter from "@/components/svg/groupDocter.vue";
import man2 from "@/components/svg/man2.vue";

export default {
  data() {
    return {
      dataFetch: {
        dataTypes: null,
        dataDates: null
      },
      dataPrepareSend: {
        type_id: 1,
        date: null,
        slot: []
      }
    };
  },
  components: {
    man2,
    ServiceTypeBox,
    groupDocter
  },
  methods: {
    onChangeEventHandler() {},
    async fetchDate(serviceDataType) {
      this.dataPrepareSend.type_id = serviceDataType.type_id;
      await axios
        .get(
          `${process.env.VUE_APP_BACKEND_URL}/ServiceDate/${serviceDataType.type_id}`,
          {
            headers: {
              Authorization: `Bearer ${this.$store.state.token}`
            }
          }
        )
        .then(res => {
          console.log(res.data);
        });
    },
    async fetchTimeSlot() {
      this.dataPrepareSend;
      if (
        this.dataPrepareSend.type_id != null &&
        this.dataPrepareSend.date != null
      ) {
        this.dataFetch.dataDates = null;
        await axios
          .post(
            `${process.env.VUE_APP_BACKEND_URL}/admin/dashboard/timetable/EditSlotTime/checktimeslot`,
            {
              type_id: this.dataPrepareSend.type_id,
              date: this.dataPrepareSend.date
            },
            {
              headers: {
                Authorization: `Bearer ${this.$store.state.token}`
              }
            }
          )
          .then(res => {
            if (res.status == 204) {
              this.dataPrepareSend.date = null;
              this.$swal({
                icon: "warning",
                title: "คำเตือน",
                text: "ไม่มีเวลาให้บริการสำหรับบริการที่ท่านเลือก"
              });
            } else {
              this.dataFetch.dataDates = res.data.timeArray;
              this.dataPrepareSend.date = res.data.date;
              console.log(this.dataFetch.dataDates);
              console.log(this.dataPrepareSend.date);
            }
          })
          .catch(err => {
            console.log("===== Backend-error ======");
            console.error(error.response);
            this.$swal({
              ...errorSWAL
            });
          });
      } else {
        this.$swal({
          icon: "warning",
          title: "คำเตือน",
          text: "กรุณาเลือกประเภทการให้บริการ และวันที่"
        });
      }
    },
    async sendToBackend() {
      //Send DATA
    },
    async slotActive() {
      console.log(this.$refs["toggle-button"].focus());
    }
  },
  async mounted() {
    //เรียกข้อมูล Default Type
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

<style>
.box-01 {
  background: #ffeaa6;
  box-shadow: 0px 4px 8px #ffe6c8;
}

.box-02 {
  background: #ffffff;
  box-shadow: 0px 4px 8px #e9ebfb;
}
</style>

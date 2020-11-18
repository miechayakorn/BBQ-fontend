<template>
  <div class="container">
    <div class="row" style="margin-top: 30px">
      <div class="col-12 div-card p-4 text-left">
        <div class="row pl-5 pr-5 p-2">
          <span style="font-size: 20px" class="font-weight-bold">
            {{ this.$route.query.t }}
          </span>
          <div class="col-12 pl-md-5 pr-md-5 mt-3">
            <div class="row">
              <div class="col-12 col-md-6">
                <label for="InputDay">เพิ่มวันให้บริการ</label>
                <select
                  v-model="dataPrepareSend.worktime.day"
                  id="InputDay"
                  class="form-control"
                >
                  <option value disabled selected>-- กรุณาเลือกวัน --</option>
                  <option value="MONDAY">วันจันทร์</option>
                  <option value="TUESDAY">วันอังคาร</option>
                  <option value="WEDNESDAY">วันพุธ</option>
                  <option value="THURSDAY">วันพฤหัสบดี</option>
                  <option value="FRIDAY">วันศุกร์</option>
                  <option value="SATURDAY">วันเสาร์</option>
                  <option value="SUNDAY">วันอาทิตย์</option>
                </select>
              </div>
              <div class="col-12 col-md-6">
                <label for="InputMan">ผู้ให้บริการ</label>
                <select
                  v-if="this.$store.state.role == 'ADMIN'"
                  v-model="dataPrepareSend.worktime.account_id"
                  id="InputMan"
                  class="form-control"
                >
                  <option value disabled selected>
                    -- กรุณาผู้ให้บริการ --
                  </option>
                  <option
                    :value="item.account_id"
                    v-for="(item, index) in dataFetch.dataEmployee"
                    :key="index"
                  >
                    {{ item.prefix }} {{ item.first_name }}
                    {{ item.last_name }}
                  </option>
                </select>
                <select
                  v-else-if="this.$store.state.role == 'STAFF'"
                  disabled
                  id="InputMan"
                  class="form-control"
                >
                  <option
                    :value="
                      (dataPrepareSend.worktime.account_id =
                        dataFetch.dataEmployee[0].account_id)
                    "
                    selected
                  >
                    {{ dataFetch.dataEmployee[0].prefix }}
                    {{ dataFetch.dataEmployee[0].first_name }}
                    {{ dataFetch.dataEmployee[0].last_name }}
                  </option>
                </select>
              </div>
              <div class="col-12 col-md-6 mt-2">
                <label for="InputStartTime">เวลาเริ่มบริการ</label>
                <input
                  v-model="dataPrepareSend.worktime.start_time"
                  class="form-control"
                  type="time"
                  id="InputStartTime"
                />
              </div>
              <div class="col-12 col-md-6 mt-2">
                <label for="InputEndTime">เวลาเลิกบริการ</label>
                <input
                  v-model="dataPrepareSend.worktime.end_time"
                  class="form-control"
                  type="time"
                  id="InputEndTime"
                />
              </div>
              <div class="col-12 col-md-6 mt-2">
                <label for="Input1Slot">เวลาให้บริการต่อ 1 slot</label>
                <select
                  v-model="dataPrepareSend.worktime.time_slot"
                  id="Input1Slot"
                  class="form-control"
                >
                  <option value disabled selected>-- กรุณาเลือกเวลา --</option>
                  <option value="15">15 นาที</option>
                  <option value="30">30 นาที</option>
                  <option value="45">45 นาที</option>
                  <option value="60">1 ชั่วโมง</option>
                  <option value="75">1 ชั่วโมง 15 นาที</option>
                </select>
              </div>
            </div>
          </div>
        </div>
        <div class="row mb-4" style="margin-top: 80px">
          <div class="col-12 text-center">
            <button
              @click="close()"
              class="btn btnBlock btnCancel fixed-button mr-4"
            >
              <span style="font-weight: 900; color: white">ยกเลิก</span>
            </button>
            <button
              @click="sendWorktime"
              class="col-5 btn btn-primary btnBlock btnConfirm fixed-button text-center"
            >
              เสร็จสิ้น
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      dataFetch: {
        dataEmployee: [],
      },
      dataPrepareSend: {
        worktime: {
          day: "",
          account_id: "",
          start_time: "",
          end_time: "",
          time_slot: "",
        },
      },
    };
  },
  methods: {
    close() {
      close();
    },
    async sendWorktime() {
      if (
        this.$route.params.id != "" &&
        this.dataPrepareSend.worktime.day != "" &&
        this.dataPrepareSend.worktime.account_id != "" &&
        this.dataPrepareSend.worktime.start_time != "" &&
        this.dataPrepareSend.worktime.end_time != "" &&
        this.dataPrepareSend.worktime.time_slot != ""
      ) {
        //start time
        let t1 = this.dataPrepareSend.worktime.start_time;
        var r1 =
          Number(t1.split(":")[0]) * 3600000 + Number(t1.split(":")[1]) * 60000;

        //end time
        let t2 = this.dataPrepareSend.worktime.end_time;
        var r2 =
          Number(t2.split(":")[0]) * 3600000 + Number(t2.split(":")[1]) * 60000;

        //time_slot
        let r3 = this.dataPrepareSend.worktime.time_slot * 60000;

        if ((r2 - r1) % r3 == 0) {
          await axios
            .post(
              `${process.env.VUE_APP_BACKEND_URL}/addworktime`,
              {
                type_id: this.$route.params.id,
                day: this.dataPrepareSend.worktime.day,
                account_id: this.dataPrepareSend.worktime.account_id,
                start_time: this.dataPrepareSend.worktime.start_time + ":00",
                end_time: this.dataPrepareSend.worktime.end_time + ":00",
                time_slot: this.dataPrepareSend.worktime.time_slot,
              },
              {
                headers: {
                  Authorization: `Bearer ${this.$store.state.token}`,
                },
              }
            )
            .then((res) => {
              if (res.status == 201) {
                this.$swal({
                  toast: true,
                  position: "top-end",
                  showConfirmButton: false,
                  timerProgressBar: true,
                  onOpen: (toast) => {
                    toast.addEventListener("mouseenter", this.$swal.stopTimer);
                    toast.addEventListener(
                      "mouseleave",
                      this.$swal.resumeTimer
                    );
                  },
                  timer: 3000,
                  icon: "success",
                  title: "เพิ่มบริการสำเร็จ",
                });

                this.dataPrepareSend.worktime.day = "";
                this.dataPrepareSend.worktime.account_id = "";
                this.dataPrepareSend.worktime.start_time = "";
                this.dataPrepareSend.worktime.end_time = "";
                this.dataPrepareSend.worktime.time_slot = "";
                this.close();
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
            text: "กรุณาตรวจสอบเวลาการให้บริการ",
          });
        }
      } else {
        this.$swal({
          icon: "warning",
          title: "คำเตือน",
          text: "กรุณากรอกข้อมูลให้ครบ",
        });
      }
    },
    async getEmployee() {
      await axios
        .get(`${process.env.VUE_APP_BACKEND_URL}/getemployee`, {
          headers: {
            Authorization: `Bearer ${this.$store.state.token}`,
          },
        })
        .then((res) => {
          this.dataFetch.dataEmployee = res.data;
        });
    },
  },
  async mounted() {
    await this.getEmployee();
  },
};
</script>

<style scoped>
.btnCancel {
  background-color: #ff4f5b;
  border-radius: 31px;
}
</style>
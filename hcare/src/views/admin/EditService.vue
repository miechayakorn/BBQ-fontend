<template>
  <div class="container mt-4">
    <p class="text-left">แก้ไขรายละเอียดเวลาให้บริการ</p>
    <div class="mt-3 div-card">
      <div class="row bg-blueMan2">
        <div class="col-6 row">
          <doctor3
            class="d-none d-md-block"
            style="
              position: absolute;
              top: 50%;
              left: 50%;
              -ms-transform: translate(-50%, -50%);
              transform: translate(-50%, -50%);
            "
          />
        </div>
        <div class="col-12 col-md-6">
          <div class="row">
            <div class="col-12" style="margin-top: 48px">
              <div class="float-right">
                <toggle-button
                  class="mr-2"
                  :width="45"
                  :height="25"
                  :font-size="14"
                  :sync="true"
                  :value="dataFetch.dataWorkTimeDetail.status"
                  color="#99a3ff"
                  @change="
                    statusService(
                      dataFetch.dataWorkTimeDetail.working_id,
                      $event.value
                    )
                  "
                />
                <button
                  @click="
                    removeWorkTime(dataFetch.dataWorkTimeDetail.working_id)
                  "
                  type="button"
                  class="btn"
                >
                  <i class="fas fa-trash fa-lg" style="color: #e34724"></i>
                </button>
              </div>
              <h6 class="text-left">
                <span class="font-weight-bold"
                  >วัน{{
                    dataFetch.dataWorkTimeDetail.วันที่
                  }}&nbsp;:&nbsp;</span
                >
                {{ dataFetch.dataWorkTimeDetail.prefix }}
                {{ dataFetch.dataWorkTimeDetail.first_name }}
                {{ dataFetch.dataWorkTimeDetail.last_name }}
              </h6>
              <h6 class="text-left">
                <span class="font-weight-bold">บริการ&nbsp;:&nbsp;</span>
                {{ dataFetch.dataWorkTimeDetail.type_name }}
              </h6>
            </div>
            <div class="col-12">
              <div class="form-group text-left mt-3">
                <label for="InputStartTime">เวลาเริ่มบริการ</label>
                <input
                  type="time"
                  id="InputStartTime"
                  class="form-control col-12 col-md-6"
                  v-model="dataFetch.dataWorkTimeDetail.start_time"
                />
              </div>
            </div>
            <div class="col-12 form-group text-left mt-1">
              <label for="InputEndTime">เวลาเลิกบริการ</label>
              <input
                type="time"
                id="InputEndTime"
                class="form-control col-12 col-md-6"
                v-model="dataFetch.dataWorkTimeDetail.end_time"
              />
            </div>
            <div
              class="col-12 form-group text-left mt-1"
              style="margin-bottom: 48px"
            >
              <label for="Input1Slot">เวลาให้บริการต่อ 1 slot</label>
              <select
                v-model="dataFetch.dataWorkTimeDetail.time_slot"
                id="Input1Slot"
                class="form-control col-12 col-md-6"
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
    </div>
    <div class="row mt-4 mb-4">
      <div class="col-12">
        <button
          @click="close()"
          class="col-5 btn btn-primary btnBlock btnBack fixed-button text-center mr-4"
        >
          <svg
            width="19"
            height="13"
            viewBox="0 0 19 13"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M18.9785 5.14307H4.80852L8.38852 1.55307L6.97852 0.143066L0.978516 6.14307L6.97852 12.1431L8.38852 10.7331L4.80852 7.14307H18.9785V5.14307Z"
              fill="#99A3FF"
            />
          </svg>
          ย้อนกลับ
        </button>
        <button
          @click="sendEditWorkTimeDetail"
          class="col-5 btn btn-primary btnBlock btnConfirm fixed-button text-center"
        >
          บันทึก
        </button>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import { errorSWAL } from "@/utility/swal.js";
import doctor3 from "@/components/svg/doctor3.vue";

export default {
  components: {
    doctor3,
  },
  data() {
    return {
      dataFetch: {
        dataWorkTimeDetail: {
          working_id: "",
          start_time: "",
          end_time: "",
          time_slot: "",
          doctor_id: "",
        },
      },
      dataPrepareSend: {},
    };
  },
  mounted() {
    this.getWorktimesDetail();
  },
  methods: {
    close() {
      close();
    },
    async getWorktimesDetail() {
      await axios
        .get(
          `${process.env.VUE_APP_BACKEND_URL}/editservice/getworktimes/detail?working_id=${this.$route.params.id}`,
          {
            headers: {
              Authorization: `Bearer ${this.$store.state.token}`,
            },
          }
        )
        .then((res) => {
          this.dataFetch.dataWorkTimeDetail = res.data;
        });
    },
    statusService(working_id, status) {
      this.$swal({
        icon: "warning",
        title: status ? "เปิดเวลาให้บริการ?" : "ปิดเวลาให้บริการ?",
        showCloseButton: true,
        confirmButtonText: status ? "ยืนยันการเปิด" : "ยืนยันการปิด",
        showLoaderOnConfirm: true,
        preConfirm: () => {
          axios
            .patch(
              `${process.env.VUE_APP_BACKEND_URL}/editservice/updatestatus`,
              {
                working_id: working_id,
                status: status,
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
                  title: "บันทึกสำเร็จ",
                });
                this.getWorktimesDetail(working_id);
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
      });
    },
    async removeWorkTime(working_id) {
      this.$swal({
        icon: "warning",
        title: "ลบเวลาให้บริการ",
        showCloseButton: true,
        confirmButtonText: "ยืนยันการลบ",
        confirmButtonColor: "#d33",
        showLoaderOnConfirm: true,
        preConfirm: () => {
          axios
            .get(
              `${process.env.VUE_APP_BACKEND_URL}/delete/worktimes/${working_id}`,
              {
                headers: { Authorization: `Bearer ${this.$store.state.token}` },
              }
            )
            .then((res) => {
              this.$swal({
                icon: "success",
                title: "ลบเวลาให้บริการสำเร็จ",
              }).then((result) => {
                this.close();
              });
            })
            .catch((error) => {
              console.log("===== Backend-error ======");
              console.error(error.response);
              this.$swal({ ...errorSWAL });
            });
        },
      });
    },
    async sendEditWorkTimeDetail() {
      if (
        this.dataFetch.dataWorkTimeDetail.working_id != "" &&
        this.dataFetch.dataWorkTimeDetail.time_slot != "" &&
        this.dataFetch.dataWorkTimeDetail.doctor_id != "" &&
        this.dataFetch.dataWorkTimeDetail.start_time != "" &&
        this.dataFetch.dataWorkTimeDetail.end_time != ""
      ) {
        //start time
        let t1 = this.dataFetch.dataWorkTimeDetail.start_time;
        var r1 =
          Number(t1.split(":")[0]) * 3600000 + Number(t1.split(":")[1]) * 60000;

        //end time
        let t2 = this.dataFetch.dataWorkTimeDetail.end_time;
        var r2 =
          Number(t2.split(":")[0]) * 3600000 + Number(t2.split(":")[1]) * 60000;

        //time_slot
        let r3 = this.dataFetch.dataWorkTimeDetail.time_slot * 60000;

        if (t2 > t1 && (r2 - r1) % r3 == 0) {
          try {
            await axios
              .patch(
                `${process.env.VUE_APP_BACKEND_URL}/editservice/update`,
                {
                  working_id: this.dataFetch.dataWorkTimeDetail.working_id,
                  start_time: this.dataFetch.dataWorkTimeDetail.start_time,
                  end_time: this.dataFetch.dataWorkTimeDetail.end_time,
                  time_slot: this.dataFetch.dataWorkTimeDetail.time_slot,
                  account_id: this.dataFetch.dataWorkTimeDetail.doctor_id,
                },
                {
                  headers: {
                    Authorization: `Bearer ${this.$store.state.token}`,
                  },
                }
              )
              .then((res) => {
                if (res.status == 200) {
                  this.$swal({
                    icon: "warning",
                    title: "คำเตือน",
                    text: "ไม่พบตารางเวลาที่คุณเลือก",
                  });
                } else if (res.status == 201) {
                  this.$swal({
                    toast: true,
                    position: "top-end",
                    showConfirmButton: false,
                    timerProgressBar: true,
                    onOpen: (toast) => {
                      toast.addEventListener(
                        "mouseenter",
                        this.$swal.stopTimer
                      );
                      toast.addEventListener(
                        "mouseleave",
                        this.$swal.resumeTimer
                      );
                    },
                    timer: 3000,
                    icon: "success",
                    title: "แก้ไขบริการสำเร็จ",
                  });
                  this.getWorktimesDetail();
                }
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
  },
};
</script>
<style scoped>
.btnBack {
  background: #ffffff;
  border: 2px solid #99a3ff;
  box-sizing: border-box;
  border-radius: 20px;
  color: #99a3ff;
}
</style>
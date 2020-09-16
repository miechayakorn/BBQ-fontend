<template>
  <div class="container mb-4">
    <div class="row mt-3 bg-blueMan2">
      <div class="col-6">
        <manHome class="d-none d-md-block mx-auto mt-4" />
      </div>
      <div class="col-12 col-md-6">
        <div class="col-12 col-md-7">
          <div class="form-group text-left" style="margin-top:48px;">
            <label for="serviceType">เพิ่มบริการใหม่</label>
            <input
              type="text"
              id="serviceType"
              class="form-control col-12"
              placeholder="กรุณาพิมพ์ชื่อบริการ"
              v-model="dataPrepareSend.serviceName"
            />
          </div>
        </div>
        <div class="col-12">
          <div class="form-group text-left">
            <label for="InputDate">เลือกสถานที่สำหรับบริการ</label>
            <div class="col-12">
              <div
                class="form-check form-check-inline"
                v-for="(item, index) in dataFetch.dataLocation"
                :key="index"
              >
                <input
                  class="form-check-input"
                  type="radio"
                  name="location_id"
                  :id="item.location_id"
                  :value="item.location_id"
                  v-model="dataPrepareSend.location_id"
                />
                <label class="form-check-label" :for="item.location_id">{{
                  item.location_name
                }}</label>
              </div>
            </div>
          </div>
        </div>
        <div class="col-12">
          <button
            @click="sendCreateService"
            class="btn btn-primary mt-4 mb-4 mb-md-0 btnBlock btnConfirm fixed-button col-12 col-md-7 float-left"
          >
            เพิ่ม
          </button>
        </div>
      </div>
    </div>
    <VclFacebook v-if="loading" class="mt-3" />

    <div class="mt-3 text-left font-weight-bold">
      <div class="mb-3" style="margin-top:32px">
        <span>ส่วนที่ 1 : เลือกบริการ</span>
      </div>
      <div class="row div-card" style="padding-top:50px; padding-bottom:50px;">
        <div class="col-12" style="padding-left: 40px; padding-right: 40px;">
          วิทยาเขต : บางมด
          <div class="row">
            <div class="col-12 col-md-3">
              <div class="m-3">
                <div
                  @click="changeCardColor('card1')"
                  :class="[
                    'col-12 mt-2 pt-4 pb-3 pl-4 text-center text-white',
                    colorCard == 'card1' ? 'div-card-click' : 'div-card-unclick'
                  ]"
                >
                  <h6 class="font-weight-bold">ฝังเข็ม</h6>
                </div>
              </div>
            </div>
            <div class="col-12 col-md-3">
              <div class="m-3">
                <div
                  @click="changeCardColor('card2')"
                  :class="[
                    'col-12 mt-2 pt-4 pb-3 pl-4 text-center text-white',
                    colorCard == 'card2' ? 'div-card-click' : 'div-card-unclick'
                  ]"
                >
                  <h6 class="font-weight-bold">จิตแพทย์/นักจิตวิทยา</h6>
                </div>
              </div>
            </div>
            <div class="col-12 col-md-3">
              <div class="m-3">
                <div
                  @click="changeCardColor('card3')"
                  :class="[
                    'col-12 mt-2 pt-4 pb-3 pl-4 text-center text-white',
                    colorCard == 'card3' ? 'div-card-click' : 'div-card-unclick'
                  ]"
                >
                  <h6 class="font-weight-bold">หู คอ จมูก</h6>
                </div>
              </div>
            </div>
            <div class="col-12 col-md-3">
              <div class="m-3">
                <div
                  @click="changeCardColor('card4')"
                  :class="[
                    'col-12 mt-2 pt-4 pb-3 pl-4 text-center text-white',
                    colorCard == 'card4' ? 'div-card-click' : 'div-card-unclick'
                  ]"
                >
                  <h6 class="font-weight-bold">โครงการเรารักษ์สุขภาพฯ</h6>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-12" style="padding-left: 40px; padding-right: 40px;">
          วิทยาเขต : บางขุนเทียน
          <div class="row">
            <div class="col-12 col-md-3">
              <div class="m-3">
                <div
                  @click="changeCardColor('card1')"
                  :class="[
                    'col-12 mt-2 pt-4 pb-3 pl-4 text-center text-white',
                    colorCard == 'card1' ? 'div-card-click' : 'div-card-unclick'
                  ]"
                >
                  <h6 class="font-weight-bold">ฝังเข็ม</h6>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="mt-3 text-left font-weight-bold">
      <div class="mb-3" style="margin-top:32px">
        <span>ส่วนที่ 2 : เพิ่มรายละเอียดบริการ</span>
      </div>
      <div class="row div-card" style="padding-top:50px; padding-bottom:50px;">
        <div class="col-12 ml-5">
          <span>บริการ</span>
        </div>
        <div class="col-12">
          <div class="row pl-5 pr-5 p-2">
            <div class="col-12 pl-5 pr-5 mt-3">
              <div class="row">
                <div class="col-6">
                  <label for="InputDay">เพิ่มวันให้บริการ</label>
                  <select id="InputDay" class="form-control">
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
                <div class="col-6">
                  <label for="InputMan">ผู้ให้บริการ</label>
                  <input class="form-control" type="text" id="InputMan" />
                </div>
                <div class="col-6">
                  <label for="InputStartTime">เวลาเริ่มบริการ</label>
                  <input class="form-control" type="time" id="InputStartTime" />
                </div>
                <div class="col-6">
                  <label for="InputEndTime">เวลาเลิกบริการ</label>
                  <input class="form-control" type="time" id="InputEndTime" />
                </div>
                <div class="col-6">
                  <label for="Input1Slot">เวลาให้บริการต่อ 1 slot</label>
                  <select id="Input1Slot" class="form-control">
                    <option value disabled selected
                      >-- กรุณาเลือกเวลา --</option
                    >
                    <option value="15">15 นาที</option>
                    <option value="30">30 นาที</option>
                    <option value="45">45 นาที</option>
                    <option value="60">60 นาที</option>
                    <option value="75">75 นาที</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="col-12 text-center mt-4">
        <button
          class="btn btn-primary btnBlock btnConfirm fixed-button text-center"
        >
          บันทึก
        </button>
      </div>
    </div>
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
      colorCard: "",
      dataFetch: {
        dataLocation: []
      },
      dataPrepareSend: {
        serviceName: "",
        location_id: ""
      }
    };
  },
  components: {
    ServiceTypeBox,
    manHome,
    VclFacebook
  },
  methods: {
    changeCardColor(nameCard) {
      console.log(nameCard);
      this.colorCard = nameCard;
    },
    async sendCreateService() {
      if (
        this.dataPrepareSend.serviceName != "" &&
        this.dataPrepareSend.location_id != ""
      ) {
        // await axios
        //   .post(
        //     `${process.env.VUE_APP_BACKEND_URL}/admin/dashboard/createService`,
        //     {
        //       serviceName: this.dataPrepareSend.serviceName,
        //       location_id: this.dataPrepareSend.location_id,
        //     },
        //     {
        //       headers: {
        //         Authorization: `Bearer ${this.$store.state.token}`,
        //       },
        //     }
        //   )
        //   .then((res) => {
        //     if (res.status == 201) {
        this.dataPrepareSend.serviceName = "";
        this.dataPrepareSend.location_id = "";
        this.$swal({
          toast: true,
          position: "top-end",
          showConfirmButton: false,
          timerProgressBar: true,
          onOpen: toast => {
            toast.addEventListener("mouseenter", this.$swal.stopTimer);
            toast.addEventListener("mouseleave", this.$swal.resumeTimer);
          },
          timer: 3000,
          icon: "success",
          title: "สร้างบริการสำเร็จ"
        });
        //   } else {
        //     console.log("===== Backend-error ======");
        //     console.error(res.data);
        //     this.$swal({
        //       icon: "warning",
        //       title: "คำเตือน",
        //       text: res.data,
        //     });
        //   }
        // })
        // .catch((res) => {
        //   console.log("===== Backend-error ======");
        //   console.error(res);
        //   this.$swal({ ...errorSWAL });
        // });
      } else {
        this.$swal({
          icon: "warning",
          title: "คำเตือน",
          text: "กรุณากรอกข้อมูลให้ครบ"
        });
      }
    },

    async sendTimeServiceToBackend() {
      console.log("sendTimeServiceToBackend");
      //Send DATA
    }
  },
  async mounted() {
    await axios.get(`${process.env.VUE_APP_BACKEND_URL}/location`).then(res => {
      this.dataFetch.dataLocation = res.data;
    });
  }
};
</script>

<style></style>

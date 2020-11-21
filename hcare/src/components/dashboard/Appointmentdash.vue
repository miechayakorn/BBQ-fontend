<template>
  <div class="container mt-3">
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
            <div class="col-12 col-md-12">
              <div class="form-group text-left" style="margin-top: 48px">
                <label for="serviceType">เลือกบริการ</label>
                <select
                  id="serviceType"
                  class="form-control col-12 col-md-6"
                  v-model="dataPrepareSend.type_id"
                >
                  <option value disabled selected>
                    -- กรุณาเลือกบริการ --
                  </option>
                  <option
                    v-for="(data, index) in dataFetch.dataTypes"
                    :key="index"
                    :value="data.type_id"
                  >
                    {{ data.type_name }}
                  </option>
                </select>
              </div>
            </div>
            <div class="col-12 col-md-6">
              <div class="form-group text-left">
                <label for="InputDate">เลือกวันที่</label>
                <v-date-picker
                  locale="th"
                  color="indigo"
                  :popover="{ visibility: 'click' }"
                  v-model="dataPrepareSend.date"
                  :input-props="{
                    class: 'form-control',
                    placeholder: 'กรุณาเลือกวัน',
                  }"
                />
              </div>
            </div>
            <div class="col-12 mt-4 mb-4">
              <button
                @click="sendToBackend"
                class="btn btn-primary btnBlock btnConfirm fixed-button col-12 col-md-6 float-left"
              >
                ตกลง
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-if="visibleState">
      <div class="row">
        <div class="text-left" style="margin-top: 32px">
          <h6>
            <b>นัดหมายแพทย์ทั้งหมด</b>
          </h6>
        </div>
      </div>
      <div class="mt-2">
        <div class="row mt-6">
          <DashboardTable
            :dataBookingTable="userBookings"
            v-on:fetchAppointmentAgain="fetchAppointment($event)"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import ServiceTypeBox from "@/components/ServiceTypeBox.vue";
import ServiceDateBox from "@/components/ServiceDateBox.vue";
import DashboardTable from "@/components/dashboardTable/DashboardTableAppointment.vue";
import doctor3 from "@/components/svg/doctor3.vue";
import formatDate from "@/utility/formatDate";

export default {
  data() {
    return {
      visibleState: false,
      dataFetch: {
        dataTypes: null,
        dataDates: null,
        dataTimes: null,
      },
      userBookings: [],
      dataPrepareSend: {
        type_id: "",
        date: null,
      },
      dataShow: {
        type: "จิตแพทย์",
        date: "",
        time: null,
        activeBtnTime: "",
        disableSymptom: true,
        oldTypeService: 1,
      },
    };
  },
  components: {
    ServiceTypeBox,
    ServiceDateBox,
    DashboardTable,
    doctor3,
  },
  async mounted() {
    await axios
      .get(`${process.env.VUE_APP_BACKEND_URL}/ServiceTypesStaff`, {
        headers: { Authorization: `Bearer ${this.$store.state.token}` },
      })
      .then((res) => {
        this.dataFetch.dataTypes = res.data;
        this.dataPrepareSend.type_id = this.dataFetch.dataTypes[0].type_id;
      });
  },
  methods: {
    fetchAppointment(fetchAppointmentAgain) {
      if (fetchAppointmentAgain) {
        this.sendToBackend();
      }
    },

    async sendToBackend() {
      if (this.dataPrepareSend.type_id && this.dataPrepareSend.date) {
        await axios
          .get(
            `${process.env.VUE_APP_BACKEND_URL}/showbooking/${
              this.dataPrepareSend.type_id
            }/${formatDate.format(this.dataPrepareSend.date)}`,
            {
              headers: { Authorization: `Bearer ${this.$store.state.token}` },
            }
          )
          .then((res) => {
            this.userBookings = res.data;
            this.visibleState = true;
          })
          .catch((error) => {
            console.log("===== Backend-error ======");
            console.error(error.response);
          });
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

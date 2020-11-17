<template>
  <div class="container mb-4">
    <div class="row mt-3 bg-blueMan2" v-if="this.$store.state.role == 'ADMIN'">
      <div class="col-6">
        <manHome class="d-none d-md-block mx-auto mt-4" />
      </div>
      <div class="col-12 col-md-6">
        <div class="col-12 col-md-7">
          <div class="form-group text-left" style="margin-top: 48px">
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
                <label class="form-check-label" :for="item.location_id">
                  {{ item.location_name }}
                </label>
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
      <div class="mb-3" style="margin-top: 32px">
        <span>ส่วนที่ 1 : เลือกบริการ</span>
      </div>
      <div class="row div-card" style="padding-bottom: 40px">
        <div
          class="col-12"
          style="padding-left: 40px; padding-right: 40px"
          v-for="(item, index) in dataFetch.dataService"
          :key="index"
        >
          <p style="margin-top: 33px">{{ item.location_name }}</p>
          <div class="row">
            <div
              class="col-12 col-md-3"
              v-for="(service, index) in item.service"
              :key="index"
            >
              <div>
                <div
                  @click="
                    changeCardColor(
                      service.type_id,
                      service.type_name,
                      item.location_name
                    )
                  "
                  :class="[
                    'col-12 mt-2 pt-4 pb-3 pl-4 text-center text-white',
                    colorCard == service.type_id
                      ? 'div-card-click'
                      : 'div-card-unclick',
                  ]"
                >
                  <h6 class="text-white font-weight-bold">
                    {{ service.type_name }}
                  </h6>
                </div>
              </div>
            </div>
            <div class="col-12 m-3" v-show="item.service.length == 0">
              <div class="alert p-3 alert-warning">ไม่พบบริการในสถานที่นี้</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-show="selectedService != ''" class="mt-3 text-left">
      <div class="mb-3 font-weight-bold" style="margin-top: 32px">
        <span style="font-size: 20px">{{ selectedService }}</span>
      </div>
      <div class="row">
        <div class="col-12">
          <form
            id="search"
            class="d-flex justify-content-end pb-3"
            v-if="dataFetch.dataWorkTime.length != 0"
          >
            <label class="col-6 col-md-1 col-form-label">Search:</label>
            <input
              name="query"
              v-model="searchQuery"
              class="col-6 col-md-3 form-control"
            />
          </form>
          <data-table
            class="table table-hover list-doctor"
            :data="dataFetch.dataWorkTime"
            :columns-to-not-sort="['action']"
            :columns-to-display="gridColumns"
            :filter-key="searchQuery"
            v-if="dataFetch.dataWorkTime.length != 0"
          >
            <template slot="วันที่ให้บริการ" scope="props">
              {{ props.entry.วันที่ให้บริการ }}
            </template>
            <template slot="เวลาให้บริการ" scope="props">{{
              props.entry.เวลาให้บริการ
            }}</template>
            <template slot="ผู้รับผิดชอบ" scope="props">{{
              props.entry.ผู้รับผิดชอบ
            }}</template>
            <template slot="action" scope="props">
              <router-link
                target="_blank"
                :to="
                  '/admin/dashboard/service/edit/' + props.entry.working_id
                "
              >
                <button type="button" class="btn">
                  <i class="fas fa-pen edit" style="color: #ffc107"></i>
                </button>
              </router-link>
            </template>
          </data-table>
          <div
            v-if="dataFetch.dataWorkTime.length == 0"
            class="alert p-3 alert-warning"
          >
            ไม่พบวันให้บริการ
          </div>
        </div>
      </div>

      <div class="col-12 text-center mt-4">
        <router-link
          target="_blank"
          :to="
            '/admin/dashboard/service/add/' +
            dataPrepareSend.worktime.type_id +
            '?t=' +
            selectedService
          "
        >
          <button
            class="btn btn-primary btnBlock btnConfirm fixed-button text-center"
          >
            + เพิ่มวันให้บริการ
          </button>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { errorSWAL } from "@/utility/swal.js";
import ServiceTypeBox from "@/components/ServiceTypeBox.vue";
import manHome from "@/components/svg/manHome.vue";
import VclFacebook from "vue-content-loading";

export default {
  data() {
    return {
      loading: false,
      interval: undefined,
      searchQuery: "",
      gridColumns: [
        "วันที่ให้บริการ",
        "เวลาให้บริการ",
        "ผู้รับผิดชอบ",
        "action",
      ],
      colorCard: "",
      selectedService: "",
      dataFetch: {
        dataLocation: [],
        dataService: [],
        dataWorkTime: [],
      },
      dataPrepareSend: {
        serviceName: "",
        location_id: "",
        worktime: {
          type_id: "",
          day: "",
          account_id: "",
          start_time: "",
          end_time: "",
          time_slot: "",
        },
      },
    };
  },
  components: {
    ServiceTypeBox,
    manHome,
    VclFacebook,
  },
  methods: {
    changeCardColor(type_id, type_name, location_name) {
      this.colorCard = type_id;
      this.fetchWorkTime(type_id);
      if (this.interval) {
        clearInterval(this.interval);
      }
      this.interval = setInterval(() => {
        this.fetchWorkTime(type_id);
      }, 5000);
      this.dataPrepareSend.worktime.type_id = type_id;
      this.selectedService = type_name + " (" + location_name + ")";
    },
    async fetchWorkTime(type_id) {
      await axios
        .get(
          `${process.env.VUE_APP_BACKEND_URL}/getserviceresposibleperson?type_id=${type_id}`,
          {
            headers: { Authorization: `Bearer ${this.$store.state.token}` },
          }
        )
        .then((res) => {
          this.dataFetch.dataWorkTime = res.data;
        });
    },
    async getService() {
      await axios
        .get(`${process.env.VUE_APP_BACKEND_URL}/getservice`, {
          headers: {
            Authorization: `Bearer ${this.$store.state.token}`,
          },
        })
        .then((res) => {
          this.dataFetch.dataService = res.data;
        });
    },
    async sendCreateService() {
      if (
        this.dataPrepareSend.serviceName != "" &&
        this.dataPrepareSend.location_id != ""
      ) {
        await axios
          .post(
            `${process.env.VUE_APP_BACKEND_URL}/addservice`,
            {
              service_name: this.dataPrepareSend.serviceName,
              location_id: this.dataPrepareSend.location_id,
            },
            {
              headers: {
                Authorization: `Bearer ${this.$store.state.token}`,
              },
            }
          )
          .then((res) => {
            if (res.status == 201) {
              this.dataPrepareSend.serviceName = "";
              this.dataPrepareSend.location_id = "";
              this.$swal({
                toast: true,
                position: "top-end",
                showConfirmButton: false,
                timerProgressBar: true,
                onOpen: (toast) => {
                  toast.addEventListener("mouseenter", this.$swal.stopTimer);
                  toast.addEventListener("mouseleave", this.$swal.resumeTimer);
                },
                timer: 3000,
                icon: "success",
                title: "สร้างบริการสำเร็จ",
              });
              this.getService();
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
          text: "กรุณากรอกข้อมูลให้ครบ",
        });
      }
    },
  },
  beforeDestroy() {
    clearInterval(this.interval);
  },
  async mounted() {
    await axios
      .get(`${process.env.VUE_APP_BACKEND_URL}/location`)
      .then((res) => {
        this.dataFetch.dataLocation = res.data;
      });
    this.getService();
  },
};
</script>

<style>
.div-card-unclick {
  border-radius: 8px;
  background-color: #5e65a1;
  box-shadow: 0px 4px 8px #f2f2f2;
  cursor: pointer;
}
.div-card-click {
  border-radius: 8px;
  background-color: #a6acde;
  box-shadow: 0px 2px 8px rgba(54, 58, 99, 0.2);
  cursor: pointer;
}
</style>

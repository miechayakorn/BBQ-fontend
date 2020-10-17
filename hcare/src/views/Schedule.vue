<template>
  <div class="container fixed-container mb-3" style="margin-top: 20px">
    <div v-if="loading">
      <VclFacebook />
      <VclList class="mt-2" />
      <VclList class="mt-2" />
    </div>
    <div v-if="!loading">
      <div class="form-group text-left">
        <label class="font-weight-bold">เลือกวิทยาเขต</label>
        <div class="col-12 text-left">
          <div
            class="custom-control custom-radio custom-control-inline"
            v-for="(item, index) in dataFetch.dataLocation"
            :key="index"
          >
            <input
              class="custom-control-input"
              type="radio"
              name="locationSelected"
              :id="item.location_id"
              :value="item.location_id"
              v-model="locationSelected"
            />
            <label
              style="cursor: pointer"
              class="custom-control-label"
              :for="item.location_id"
              >{{ item.location_name }}</label
            >
          </div>
        </div>
      </div>
      <div class="row justify-content-center mt-4">
        <v-date-picker
          locale="th"
          color="indigo"
          :min-date="firstDayofMonth"
          :max-date="lastDayofMonth"
          :attributes="dataFetch.dotCalendar"
          v-model="dateSelected"
          is-inline
        />
        <div class="col-12">
          {{ dataFetch.dotDetail }}
        </div>
      </div>
    </div>
    <div class="row mt-3">
      <div class="col-12">
        <div class="div-schedule">
          <div class="div-schedule-title" style="background: #ff7b7b">
            <div class="d-flex">
              หู คอ จมูก
              <div href="#" class="ml-auto">
                8.30 - 12.30 <i class="far fa-clock ml-2"></i>
              </div>
            </div>
          </div>
          <div class="div-schedule-content">
            <div class="row">
              <div class="col-12">
                <logoStaff
                  v-if="this.$store.state.user.profile_picture == null"
                />
                <img
                  v-else-if="this.$store.state.user.profile_picture"
                  class="rounded-circle"
                  width="56"
                  height="56"
                  :src="this.$store.state.user.profile_picture"
                />
                <span class="ml-3"> นายแพทย์ มะโนธรรม พงษ์อำไพ </span>
              </div>
            </div>
          </div>
        </div>

        <div class="row mt-5" style="text-align: center">
          <div class="col-12" @click="$router.go(-1)">
            <button
              class="btn btnBlock btn-primary fixed-button mb-2"
              style="border-radius: 10px"
            >
              <span style="font-weight: 900; color: white">ย้อนกลับ</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import logoStaff from "@/components/svg/logoStaff.vue";
import formatDate from "@/utility/formatDate";
import { errorSWAL } from "@/utility/swal.js";
import { VclFacebook, VclList } from "vue-content-loading";

export default {
  data() {
    return {
      loading: false,
      firstDayofMonth: "",
      lastDayofMonth: "",
      dateSelected: "",
      locationSelected: "",
      dataFetch: {
        dataLocation: [],
        dotCalendar: [],
        dotDetail: [],
      },
    };
  },
  watch: {
    locationSelected: {
      handler: async function (locationSelected, oldCal) {
        this.fetchDotCalendar();
      },
    },
    dateSelected: {
      handler: async function (dateSelected, oldCal) {
        if (dateSelected) {
          this.fetchDotDetail(formatDate.format(dateSelected));
        }
      },
    },
  },
  async mounted() {
    this.loading = true;
    let date = new Date();
    this.firstDayofMonth = new Date(date.getFullYear(), date.getMonth(), 1);
    this.lastDayofMonth = new Date(date.getFullYear(), date.getMonth() + 2, 0);
    await axios
      .get(`${process.env.VUE_APP_BACKEND_URL}/location`)
      .then((res) => {
        this.dataFetch.dataLocation = res.data;
        this.locationSelected = this.dataFetch.dataLocation[0].location_id;
      });
    this.fetchDotCalendar();

    this.loading = false;
  },
  methods: {
    async fetchDotCalendar() {
      await axios
        .post(`${process.env.VUE_APP_BACKEND_URL}/serviceschedule/getservice`, {
          location_id: this.locationSelected,
        })
        .then((res) => {
          this.dataFetch.dotCalendar = res.data;
        })
        .catch((error) => {
          console.log("===== Backend-error ======");
          console.error(error);
          this.$swal({ ...errorSWAL });
        });
    },
    async fetchDotDetail(date) {
      await axios
        .post(
          `${process.env.VUE_APP_BACKEND_URL}/serviceschedule/getservicedetail`,
          {
            location_id: this.locationSelected,
            date: date,
          }
        )
        .then((res) => {
          this.dataFetch.dotDetail = res.data;
        })
        .catch((error) => {
          console.log("===== Backend-error ======");
          console.error(error);
          this.$swal({ ...errorSWAL });
        });
    },
  },
  components: {
    VclFacebook,
    VclList,
    logoStaff,
  },
};
</script>

<style scoped>
input[type="radio"] {
  width: 16px;
  height: 16px;
}

.custom-control-input:checked ~ .custom-control-label::before {
  border-color: #555555;
  background-color: #555555;
}

.div-schedule {
  background: #ffffff;
  box-shadow: 0px 4px 8px #f5f5f5;
  border-radius: 5px;
  margin-bottom: 16px;
}

.div-schedule-title {
  border-radius: 5px 5px 0px 0px;
  color: #ffffff;
  padding: 12px;
  padding-left: 32px;
  padding-right: 32px;
}

.div-schedule-content {
  padding: 16px;
  color: #555555;
}
</style>
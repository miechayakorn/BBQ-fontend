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
  </div>
</template>

<script>
import axios from "axios";
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
</style>
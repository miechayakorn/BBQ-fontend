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
        <div class="col-12 text-center text-md-left">
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
              :value="item"
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
          :attributes="attributes"
          v-model="dateSelected"
          is-inline
        />
        <div class="col-12">
          {{ dateSelected }}
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
      dateSelected: "",
      locationSelected: "",
      dataFetch: {
        dataLocation: [],
      },
      attributes: [
        {
          dot: {
            backgroundColor: "#ADFF2F",
          },
          dates: {
            weekdays: [1, 7],
          },
        },
        {
          dot: {
            backgroundColor: "#800000",
          },
          dates: {
            weekdays: [2, 7],
          },
        },
        {
          dot: {
            backgroundColor: "#FF6347",
          },
          dates: {
            weekdays: [5, 7],
          },
        },
      ],
    };
  },
  watch: {
    dateSelected: {
      handler: async function (dateSelected, oldCal) {
        if (dateSelected) {
          console.log(formatDate.format(dateSelected));
        }
        // await axios
        //   .post(
        //     `${process.env.VUE_APP_BACKEND_URL}/serviceschedule/getservice/`,
        //     {
        //       location_id: "location_id",
        //       date: formatDate.format(this.dateSelected),
        //     }
        //   )
        //   .then((res) => {
        //     this.dataFetch.dataTypes = res.data;
        //   })
        //   .catch((error) => {
        //     console.log("===== Backend-error ======");
        //     console.error(error);
        //     this.$swal({ ...errorSWAL });
        //   });
      },
    },
  },
  async mounted() {
    this.loading = true;
    let date = new Date();
    this.firstDayofMonth = new Date(date.getFullYear(), date.getMonth(), 1);
    await axios
      .get(`${process.env.VUE_APP_BACKEND_URL}/location`)
      .then((res) => {
        this.dataFetch.dataLocation = res.data;
        this.locationSelected = this.dataFetch.dataLocation[0];
      });
    this.loading = false;
  },
  methods: {},
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
<template>
  <div class="container fixed-container mb-3" style="margin-top: 40px">
    <div class="row justify-content-center">
      <DatePicker
        locale="th"
        color="indigo"
        :min-date="firstDayofMonth"
        :attributes="attributes"
        v-model="dateSelect"
        is-inline
      />
      <div class="col-12">
        {{ dateSelect }}
      </div>
    </div>
  </div>
</template>

<script>
import DatePicker from "v-calendar/lib/components/date-picker.umd";
import formatDate from "@/utility/formatDate";
import { errorSWAL } from "@/utility/swal.js";

export default {
  data() {
    return {
      firstDayofMonth: "",
      dateSelect: "",
      attributes: [
        {
          dot: {
            color: "red",
            class: "my-dot-class",
          },
          dates: [
            new Date("2020-10-14"), // Jan 1st
            new Date("2020-10-10"), // Jan 10th
            new Date("2020-10-22"), // Jan 22nd
          ],
        },
        {
          dot: "green",
          dates: [
            new Date("2020-10-14"), // Jan 4th
            new Date("2020-10-14"), // Jan 10th
            new Date("2020-10-14"), // Jan 15th
          ],
        },
        {
          dot: "purple",
          dates: [
            new Date("2020-10-14"), // Jan 12th
            new Date("2020-10-15"), // Jan 26th
            new Date("2020-10-16"), // Jan 15th
          ],
        },
      ],
    };
  },
  watch: {
    dateSelect: {
      handler: async function (dateSelect, oldCal) {
        if (dateSelect) {
          console.log(formatDate.format(dateSelect));
        }
        // await axios
        //   .post(
        //     `${process.env.VUE_APP_BACKEND_URL}/serviceschedule/getservice/`,
        //     {
        //       location_id: "location_id",
        //       date: formatDate.format(this.dateSelect),
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
    let date = new Date();
    this.firstDayofMonth = new Date(date.getFullYear(), date.getMonth(), 1);
  },
  methods: {
    selectDate() {},
  },
  components: {
    DatePicker,
  },
};
</script>

<style>
</style>
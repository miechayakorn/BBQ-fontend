<template>
  <div>
    <span>{{ new Date() | moment("dddd, MMMM Do YYYY") }}</span>
    <div>
      <input type="text" v-model="timeStart" />
      <input type="text" v-model="timeEnd" />
      <input type="text" v-model="slot" placeholder="minute" />
      <button @click="getTimeStops">Gen</button>
    </div>
    {{ timeLoop }}
    <div class="bg-primary p-5">
      <p>Show Date</p>
      <datetime
        input-class="my-class"
        class="theme-lavender"
        placeholder="Select date"
        format="dd-MM-yyyy"
        v-model="date"
      >
      </datetime>
    </div>
    <div>
      <p>Set minDate and maxDate</p>
      <datetime
        type="date"
        v-model="minDate"
        zone="Asia/Bangkok"
        placeholder="start"
      ></datetime>
      <p>{{ minDate }}</p>
      <datetime
        type="date"
        v-model="maxDate"
        zone="Asia/Bangkok"
        placeholder="end"
      ></datetime>
      <p>{{ maxDate }}</p>
      <datetime
        input-class="input"
        :min-datetime="minDate"
        :max-datetime="maxDate"
        value-zone="local"
        zone="local"
      ></datetime>
      <!-- var d = new Date();
        var n = d.toISOString(); -->
    </div>
  </div>
</template>
<script>
import moment from "moment";

export default {
  data() {
    return {
      timeStart: "",
      timeEnd: "",
      slot: "",
      minDate: "",
      maxDate: "",
      timeLoop: []
    };
  },
  methods: {
    getTimeStops() {
      let startTime = moment(this.timeStart, "HH:mm:ss");
      let endTime = moment(this.timeEnd, "HH:mm:ss");

      if (endTime.isBefore(startTime)) {
        endTime.add(1, "day");
      }

      var timeStops = [];

      while (startTime <= endTime) {
        timeStops.push(moment(startTime).format("HH:mm:ss"));
        startTime.add(this.slot, "minutes");
      }
      this.timeLoop = timeStops;
    }
  }
};
</script>
<style scope>
.theme-orange .vdatetime-popup__header,
.theme-orange .vdatetime-calendar__month__day--selected > span > span,
.theme-orange .vdatetime-calendar__month__day--selected:hover > span > span {
  background: #ff9800;
}

.theme-orange .vdatetime-year-picker__item--selected,
.theme-orange .vdatetime-time-picker__item--selected,
.theme-orange .vdatetime-popup__actions__button {
  color: #ff9800;
}
</style>

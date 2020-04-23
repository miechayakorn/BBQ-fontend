<template>
  <div>
    <span>{{ new Date() | moment("dddd, MMMM Do YYYY") }}</span>
    <div>
      <input type="text" v-model="start" placeholder="start" />
      <input type="text" v-model="end" placeholder="end" />
      <input type="text" v-model="slot" placeholder="minute" />
      <button @click="getTimeStops">Gen</button>
    </div>
    {{ timeLoop }}
  </div>
</template>
<script>
import moment from "moment";

export default {
  data() {
    return {
      start: "",
      end: "",
      slot: "",
      timeLoop: []
    };
  },
  methods: {
    getTimeStops() {
      let startTime = moment(this.start, "HH:mm:ss");
      let endTime = moment(this.end, "HH:mm:ss");

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

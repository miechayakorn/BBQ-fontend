<template>
  <div class="col-12">
    <select
      class="form-control"
      v-model="selectedDate"
      @change="fetchTime()"
      id="selectDate"
      style="width:100%;"
    >
      <option :value="null" disabled selected="selected">กรุณาเลือกวัน</option>
      <option
        v-for="(dataDate, index) in dataDates"
        :key="index"
        :value="dataDate"
        >{{ dataDate.date }}</option
      >
    </select>
  </div>
</template>
<script>
export default {
  data() {
    return {
      selectedDate: []
    };
  },
  methods: {
    fetchTime() {
      this.$emit("selectedDate", this.selectedDate);
    }
  },
  props: {
    dataDates: Array
  }
};
</script>
<style></style>

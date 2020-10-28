<template>
  <div class="col-12">
    <select
      class="form-control select-date"
      style="cursor: pointer"
      v-model="selected"
      @change="fetchTime()"
      id="selectDate"
    >
      <option value="" disabled selected="selected">{{ $t("dropdowndate" )}}</option>
      <option
        v-for="(dataDate, index) in dataDates"
        :key="index"
        :value="dataDate"
      >
        {{ dataDate.dateformat }}
      </option>
    </select>
  </div>
</template>

<script>
export default {
  data() {
    return {
      selected: "",
    };
  },
  methods: {
    fetchTime() {
      this.$emit("selectedDate", this.selected);
    },
  },
  props: {
    dataDates: Array,
  },
};
</script>

<style scoped>
.select-date {
  -webkit-appearance: none;
  background: #ffffff;
  box-shadow: 0px 4px 8px #ebedff;
  border-radius: 10px;
  border: none;
  width: 100%;
  height: 48px;
}
</style>

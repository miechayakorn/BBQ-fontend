<template>
  <div class="col-12">
    <select
      v-if="dataDocters.length != 0"
      class="form-control select-date"
      style="cursor: pointer"
      v-model="selected"
      @change="fetchTime()"
      id="selectDate"
    >
      <option value="" disabled selected="selected">กรุณาเลือกแพทย์</option>
      <option
        v-for="(dataDocter, index) in dataDocters"
        :key="index"
        :value="dataDocter"
      >
        {{ dataDocter.doctor_name }}
      </option>
    </select>
    <div v-else-if="dataDocters.length == 0">
      <div class="alert p-3 alert-warning">
        ไม่พบแพทย์
      </div>
    </div>
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
      this.$emit("selectedDocter", this.selected);
    },
  },
  props: {
    dataDocters: Array,
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

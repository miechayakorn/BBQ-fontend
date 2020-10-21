<template>
  <div class="col-12">
    <div class="container">
      <div class="row" v-if="dataTimes == null">
        <div class="col-12">
          <div class="alert alert-warning text-center" role="alert">
            กรุณาเลือกแพทย์ให้เรียบร้อย
          </div>
        </div>
      </div>
      <div class="row" v-if="dataTimes != null">
        <div
          v-for="(timeLoop, index) in dataTimes"
          :key="index"
          class="col-xs-3 text-center"
        >
          <button
            href="#"
            :class="[
              checkButtonStatus(timeLoop.availability, timeLoop.status)
                ? 'btn btn-outline-primary mr-2 mb-2 btnTime'
                : 'btn btn-secondary mr-2 mb-2 disable btnTime btnDisabled',

              { active: activeTime === 'btn' + index },
            ]"
            @click="
              [
                timeLoop.status == null
                  ? onChangeTime(
                      timeLoop.booking_id,
                      timeLoop.time_in.slice(0, 5),
                      (activeTime = 'btn' + index)
                    )
                  : '',
              ]
            "
            :disabled="
              checkButtonStatus(timeLoop.availability, timeLoop.status) == false
            "
          >
            {{ timeLoop.time_in.slice(0, 5) }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    checkButtonStatus(availability, status) {
      if (availability == "AVAILABLE" && status == null) {
        return true;
      } else {
        return false;
      }
    },
    onChangeTime(booking_id, time_in, activeTime) {
      let booking = {
        booking_id: booking_id,
        time: time_in,
        activeBtnTime: activeTime,
      };
      this.$emit("booking", booking);
    },
  },
  props: {
    dataTimes: Array,
    activeTime: String,
  },
};
</script>

<style scope>
.btnTime {
  height: 48px;
  width: 72px;
  background-color: #ffffff;
}
.btnDisabled {
  cursor: default;
  background-color: #e7e7e7 !important;
  border-color: #e7e7e7 !important;
}
.btnDisabled:active {
  outline: none;
}
</style>

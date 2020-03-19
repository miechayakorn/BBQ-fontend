<template>
  <div class="col-12">
    <div class="container">
      <div class="row">
        <div
          v-for="(timeLoop, index) in dataTimes"
          :key="index"
          class="col-xs-3 text-center"
        >
          <button
            href="#"
            :class="[
              timeLoop.status == 0
                ? 'btn btn-outline-primary mr-2 mb-2 btnTime'
                : 'btn btn-secondary mr-2 mb-2 disable btnTime btnDisabled',

              { active: activeBtnTime === 'btn' + index }
            ]"
            @click="
              [
                timeLoop.status == 0
                  ? onChangeTime(
                      timeLoop.booking_id,
                      timeLoop.time_in.slice(0, 5)
                    )
                  : '',
                (activeBtnTime = 'btn' + index)
              ]
            "
            :disabled="timeLoop.status == 1 ? true : false"
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
  data() {
    return {
      activeBtnTime: ""
    };
  },
  methods: {
    onChangeTime(booking_id, time_in) {
      let booking = {
        booking_id: booking_id,
        time: time_in
      };
      this.$emit("booking", booking);
    }
  },
  props: {
    dataTimes: Array
  }
};
</script>

<style scope>
.btnTime {
  height: 48px;
  width: 72px;
}
.btnDisabled {
  cursor: default;
}
.btnDisabled:active {
  outline: none;
}
</style>

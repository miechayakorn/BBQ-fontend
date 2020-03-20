<template>
  <div class="col-12">
    <div class="container">
      <div class="row" v-if="dataTimes == null">
        <div class="col-12">
          <div class="alert alert-warning text-center" role="alert">
            กรุณาเลือกวันให้เรียบร้อย
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
              timeLoop.status == null
                ? 'btn btn-outline-primary mr-2 mb-2 btnTime'
                : 'btn btn-secondary mr-2 mb-2 disable btnTime btnDisabled',

              { active: activeTime === 'btn' + index }
            ]"
            @click="
              [
                timeLoop.status == null
                  ? onChangeTime(
                      timeLoop.booking_id,
                      timeLoop.time_in.slice(0, 5),
                      (activeTime = 'btn' + index)
                    )
                  : ''
              ]
            "
            :disabled="timeLoop.status != null ? true : false"
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
      // activeBtnTime: ""
    };
  },
  methods: {
    onChangeTime(booking_id, time_in, activeTime) {
      let booking = {
        booking_id: booking_id,
        time: time_in,
        activeBtnTime: activeTime
      };
      //console.log("prop activeBtnTime")
      // console.log("prop activeBtnTime" +  this.props.activeBtnTime)

      this.$emit("booking", booking);
    }
  },
  props: {
    dataTimes: Array,
    activeTime: String
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

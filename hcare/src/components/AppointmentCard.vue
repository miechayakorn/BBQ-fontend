<template>
  <div class="row">
    <div class="w-100 pb-3" v-for="(item, index) in data" :key="index">
      <router-link :to="'/appointment/detail/' + item.booking_id">
        <div class="card" style="border-radius: 10px;">
          <div class="col-xs-12">
            <div
              class="col-xs-3 w-35 float-left"
              style="background-color: #99a3ff; border-radius: 10px 0 0 10px;"
            >
              <div class="h-100" style="margin: 40px 24px 40px 24px;">
                <div class="text-center" style>
                  <logoEmotion/>
                  <p style="color: rgb(255, 255, 255);">{{ item.type_name }}</p>
                </div>
              </div>
            </div>
            <div class="col-xs-8 float-right w-65 pb-1 card-body">
              <p class="card-text">
                <span class="font-weight-bold text-primary">เวลานัดหมาย</span>
                <br />
                <span style="color: #444444;">
                  <!--item.date.slice(0, 10)-->
                  {{ item.dateformat }}
                </span>
                <br />
                <span
                  class="font-weight-bold"
                  style="color: #444444;"
                >{{ item.time_in.slice(0, 5) }} น.</span>
                <br /><br />
                <span v-if="item.link_meeting" style="font-weight: 900; color:#60CD4F;">ได้รับลิงค์แล้ว</span>
              </p>
            </div>
          </div>
        </div>
      </router-link>
    </div>
  </div>
</template>

<script>
import logoEmotion from "@/components/svg/logoEmotion.vue"
export default {
  props: {
    data: Array
  },
  components: {
    logoEmotion
  },
};
</script>

<style scope>
.w-35 {
  width: 35% !important;
}
.w-65 {
  width: 65% !important;
}
.card-text {
  margin-top: 16px;
  margin-left: 32px;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 21px;
}
.card-body {
  flex: 1 1 auto;
  min-height: 1px;
  padding: 0rem;
}
.card {
  border: none;
}
</style>

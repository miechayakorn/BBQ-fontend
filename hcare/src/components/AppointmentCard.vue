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
                  <logoEmotion :color="'white'" />
                  <p style="color: rgb(255, 255, 255);">{{ item.type_name }}</p>
                </div>
              </div>
            </div>
            <div class="col-xs-8 float-right w-65 pb-1 card-body">
              <div class="card-text">
                <div>
                  <span class="font-weight-bold text-primary">HN&nbsp;</span>
                  <span style="color: #555555;">{{item.hn_number}}</span>
                  <br />
                  <span style="color: #555555;">{{item.first_name}} {{item.last_name}}</span>
                </div>
                <div class="mt-2">
                  <span class="font-weight-bold text-primary" style="color: #555555; ">เวลานัดหมาย</span>
                  <br />
                  <span style="color: #555555;">{{ item.dateformat }}</span>
                  <br />
                  <span
                    class="font-weight-bold"
                    style="color: #444444;"
                  >{{ item.time_in.slice(0, 5) }} น.</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </router-link>
    </div>
  </div>
</template>

<script>
import logoEmotion from "@/components/svg/logoEmotion.vue";
export default {
  props: {
    data: Array,
  },
  components: {
    logoEmotion,
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
  box-shadow: 0px 4px 8px #E6E8FF;
  -webkit-box-shadow: 0px 4px 8px #E6E8FF;
}
</style>

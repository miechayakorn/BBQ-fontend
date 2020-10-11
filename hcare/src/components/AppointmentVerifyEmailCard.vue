<template>
  <div class="row">
    <div class="w-100 pb-3" v-for="(item, index) in data" :key="index">
      <div class="card" style="border-radius: 10px">
        <div class="col-xs-12">
          <div
            class="col-xs-3 w-35 float-left"
            style="background-color: #e0e0e0; border-radius: 10px 0 0 10px"
          >
            <div class="h-100" style="margin: 40px 24px 40px 24px">
              <div class="text-center" style>
                <logoEmotion :color="'white'" />
                <p style="color: rgb(255, 255, 255)">{{ item.type_name }}</p>
              </div>
            </div>
          </div>
          <div class="col-xs-8 float-right w-65 pb-1 card-body">
            <div class="card-text">
              <div class="mt-2">
                <p class="font-weight-bold" style="color: #555555"
                  >เวลานัดหมาย</p
                >
                <span style="color: #555555;">{{ item.dateformat }}</span>
                <br />
                <span class="font-weight-bold" style="color: #444444"
                  >{{ item.time_in.slice(0, 5) }} น.</span
                >
              </div>
              <button
                class="btn btn-primary btn-verify mt-2"
                style="
                  font-weight: bold;
                  font-size: 12px;
                  line-height: 18px;
                "
              >
                <span class="px-4"
                  ><i class="fas fa-envelope mr-2" />ส่งอีเมลอีกครั้ง</span
                >
              </button>
            </div>
          </div>
        </div>
      </div>
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
}
.btn-verify {
  background: #ff6060;
  border: none;
  border-radius: 10px;
}
</style>

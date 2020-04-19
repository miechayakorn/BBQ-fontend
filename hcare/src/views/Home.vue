<template>
  <div class="home">
    <div class="container">
      <div class="row">
        <div class="col-6 col-md-3 mt-1">
          <div class="col-12 btnHomeActive" style="cursor: pointer;">
            <div class="text-center" style="margin-top: 36px;">
              <iconNote2 :color="'white'" />
              <p style="color: #FFFFFF; margin-top: 8px;">
                ทำนัด
              </p>
            </div>
          </div>
        </div>
        <div class="col-6 col-md-3 mt-1">
          <div class="col-12 btnHome" style="cursor: pointer;">
            <div class="text-center" style="margin-top: 36px;">
              <iconBill :color="'#99A3FF'" />
              <p style="color: #555555; margin-top: 8px;">
                กดคิว
              </p>
            </div>
          </div>
        </div>
        <div class="col-6 col-md-3 mt-3">
          <div class="col-12 btnHome" style="cursor: pointer;">
            <div class="text-center" style="margin-top: 36px;">
              <iconClock2 />
              <p style="color: #555555; margin-top: 8px;">
                ตารางให้บริการ
              </p>
            </div>
          </div>
        </div>
        <div class="col-6 col-md-3 mt-3">
          <div class="col-12 btnHome" style="cursor: pointer;">
            <div class="text-center" style="margin-top: 36px;">
              <iconCalendar2 />
              <p style="color: #555555; margin-top: 8px;">
                นัดของฉัน
              </p>
            </div>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-12">

        </div>
      </div>
    </div>
  </div>
</template>

<script>
import HelloWorld from "@/components/HelloWorld.vue";
import iconNote2 from "@/components/svg/icon/iconNote-2.vue";
import iconBill from "@/components/svg/icon/iconBill.vue";
import iconClock2 from "@/components/svg/icon/iconClock-2.vue";
import iconCalendar2 from "@/components/svg/icon/iconCalendar-2.vue";

export default {
  name: "Home",
  components: {
    HelloWorld,
    iconNote2,
    iconBill,
    iconClock2,
    iconCalendar2,
  }
};
</script>
<style>
.btnHome {
  background-color: #ffffff;
  border: 2px solid #ffffff;
  border-radius: 8px;
  height: 100%;
  box-shadow: 0px 4px 8px #f2f4ff;
}
.btnHomeActive {
  background-color: #99a3ff;
  border: 2px solid #99a3ff;
  border-radius: 8px;
  height: 100%;
  box-shadow: 0px 4px 8px #dfe2ff;
}
</style>

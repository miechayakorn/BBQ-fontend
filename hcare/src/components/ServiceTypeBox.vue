<template>
  <div class="row">
    <div
      v-for="(serviceDataType, index) in dataTypes"
      :key="index"
      v-on:click="fetchDate(serviceDataType)"
      class="col-6 col-md-3 mt-1"
    >
      <div
        :class="[
          'btnType btn-outline-primary',
          { active: activeBtnType === 'btn' + index }
        ]"
        @click="activeBtnType = 'btn' + index"
      >
        <div class="text-center" style="margin-top: 32px;">
          <logoEmotion :color="'white'" v-if="'btn' + index == activeBtnType" />
          <logoEmotion
            :color="'#5E65A1'"
            v-if="'btn' + index != activeBtnType"
          />
          <p v-if="'btn' + index == activeBtnType" style="color: #FFFFFF">
            {{ serviceDataType.type_name }}
          </p>
          <p v-if="'btn' + index != activeBtnType" style="color: #5E65A1">
            {{ serviceDataType.type_name }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import logoEmotion from "@/components/svg/logoEmotion.vue";
export default {
  data() {
    return {
      activeBtnType: ""
    };
  },
  components: {
    logoEmotion
  },
  methods: {
    fetchDate(serviceDataType) {
      this.$emit("serviceDataType", serviceDataType);
    }
  },
  props: {
    dataTypes: Array
  }
};
</script>

<style scope>
.btnType {
  cursor: pointer;
  background-color: #ffffff;
  border: 1px solid #5E65A1;
  box-shadow:0px 3px 8px #dfe2ff;
  border-radius: 8px;
}
.btnType:hover,
.btnType:active,
.btnType:focus,
.btnType.active {
  background: #99a3ff;
  color: #ffffff!important;
  border-color: #99a3ff;
}
.btnType-sm {
  cursor: pointer;
  background-color: #ffffff;
  border: 1px solid #99a3ff;
  border-radius: 18px;
}
.btnType-sm:hover,
.btnType-sm:active,
.btnType-sm:focus,
.btnType-sm.active {
  background: #99a3ff;
  color: #ffffff!important;
  border-color: #99a3ff;
}
</style>

<template>
  <div class="container">
    <div class="row">
      <div
        v-for="(serviceDataType, index) in dataTypes"
        :key="index"
        class="col-6 col-md-3 p-1"
      >
        <div
          v-if="serviceDataType.checknull == true"
          :class="[
            'btnType btn-outline-primary m-1',
            { active: activeBtnType === 'btn' + index },
          ]"
          @click="(activeBtnType = 'btn' + index), fetchDate(serviceDataType)"
        >
          <div class="text-center" style="margin-top: 32px">
            <logoEmotion
              :color="'white'"
              v-if="'btn' + index == activeBtnType"
            />
            <logoEmotion
              :color="'#99A3FF'"
              v-if="'btn' + index != activeBtnType"
            />
            <p
              v-if="'btn' + index == activeBtnType"
              style="color: #ffffff; margin-top: 8px"
            >
              {{ serviceDataType.type_name }}
            </p>
            <p
              v-if="'btn' + index != activeBtnType"
              style="color: #555555; margin-top: 8px"
            >
              {{ serviceDataType.type_name }}
            </p>
          </div>
        </div>
        <div
          v-else-if="serviceDataType.checknull == false"
          :class="['btnTypeDisabled m-1 disabled']"
        >
          <div class="text-center" style="margin-top: 32px">
            <logoEmotion
              :color="'white'"
              v-if="'btn' + index == activeBtnType"
            />
            <logoEmotion
              :color="'#E0E0E0'"
              v-if="'btn' + index != activeBtnType"
            />
            <p style="color: #e0e0e0; margin-top: 8px">
              {{ serviceDataType.type_name }}
            </p>
          </div>
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
      activeBtnType: "",
    };
  },
  components: {
    logoEmotion,
  },
  methods: {
    fetchDate(serviceDataType) {
      this.$emit("serviceDataType", serviceDataType);
    },
  },
  props: {
    dataTypes: Array,
  },
};
</script>

<style scope>
.btnType {
  height: 144px;
  cursor: pointer;
  background: #ffffff;
  border: 1px solid #99a3ff;
  box-sizing: border-box;
  border-radius: 8px;
}
.btnTypeDisabled {
  height: 144px;
  background: #ffffff;
  border: 1px solid #e0e0e0;
  box-sizing: border-box;
  border-radius: 8px;
}

@media (min-width: 768px) {
  .btnType {
    width: 200px;
  }
  .btnTypeDisabled {
    width: 200px;
  }
}
.btnType:hover,
.btnType:active,
.btnType:focus,
.btnType.active {
  background: white;
  color: #ffffff !important;
  border: 1px solid #99a3ff;
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
  background: white;
  color: #ffffff !important;
  border-color: #99a3ff;
}
</style>

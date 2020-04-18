<template>
  <div class="row">
    <div
      v-for="(serviceDataType, index) in dataTypes"
      :key="index"
      v-on:click="fetchDate(serviceDataType)"
      class="col-6 col-md-4 mt-1"
    >
      <div
        :class="[
          'col-12 btnType btn-outline-primary',
          { active: activeBtnType === 'btn' + index }
        ]"
        @click="activeBtnType = 'btn' + index"
        style="cursor: pointer"
      >
        <div class="text-center" style="margin-top: 32px;">
          <logoEmotion :color="'white'" v-if="'btn' + index == activeBtnType" />
          <logoEmotion
            :color="'#99A3FF'"
            v-if="'btn' + index != activeBtnType"
          />
          <p v-if="'btn' + index == activeBtnType" style="color: #FFFFFF">
            {{ serviceDataType.type_name }}
          </p>
          <p v-if="'btn' + index != activeBtnType" style="color: #555555">
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
      activeBtnType: "btn0"
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
  background-color: #ffffff;
  border: 2px solid #99a3ff;
  border-radius: 8px;
  height: 100%;
}
</style>

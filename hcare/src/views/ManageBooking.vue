<template>
  <div>
    <nav class="navbar navbar-primary bg-primary">
      <a class="navbar-brand" href="#">
        <img
          src="/docs/4.0/assets/brand/bootstrap-solid.svg"
          width="30"
          height="30"
          class="d-inline-block align-top"
          alt=""
        />
        Bootstrap
      </a>
    </nav>
    <div class="container fixed-container mb-3">
      <div class="form-group text-left">
        <label>เลือกบริการ</label>
        <div class="form">
          <div class="container">
            <ServiceTypeBox :messageToComponents="messageToComponents" />
          </div>
        </div>
      </div>
      <div class="row">
        <div class="form-group text-left w-100">
          <div class="col-12">
            <label for="selectDate">เลือกวัน</label>
          </div>
          <ServiceDateBox :dataDates="dataDates" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ServiceTypeBox from "@/components/ServiceTypeBox.vue";
import ServiceDateBox from "@/components/ServiceDateBox.vue";

export default {
  data() {
    return {
      messageToComponents: [
        { type_id: 1, type_name: "จิตแพทย์" },
        { type_id: 2, type_name: "จิตวิทยา" },
        { type_id: 2, type_name: "จิตวิทยา" },
        { type_id: 2, type_name: "จิตวิทยา" },
        { type_id: 2, type_name: "จิตวิทยา" },
        { type_id: 2, type_name: "จิตวิทยา" }
      ],
      dataDates: [
        {
          type_id: 1,
          date: "2020-03-13"
        },
        {
          type_id: 1,
          date: "2020-03-14"
        }
      ]
    };
  },
  methods: {},
  components: {
    ServiceTypeBox,
    ServiceDateBox
  }
};
</script>

<style scoped>
@media (max-width: 776px) {
  .fixed-button {
    width: 100%;
    height: 48px;
  }
}
@media (min-width: 776px) {
  .fixed-button {
    width: 320px;
    text-align: center;
    position: relative;
    height: 48px;
  }
}
@media (min-width: 900px) {
  .fixed-container {
    width: 720px;
  }
}

.btnTime {
  height: 48px;
  width: 72px;
}

button {
  border-radius: 8px;
}
.btnConfirm {
  border-radius: 31px;
}
.btnDisabled {
  cursor: default;
}
.btnDisabled:active {
  outline: none;
}
/*
.btn-outline-primary,
.btn-outline-primary:active {
  color: #99a3ff;
  background-color: #ffffff;
  border: 1px solid #99a3ff;
  border-radius: 8px;
}
.btn-outline-primary:hover,
.btn-outline-primary:visited {
  color: #ffffff;
  background-color: #99a3ff;
  border: 1px solid #99a3ff;
  border-radius: 8px;
}
.btn-block {
  color: #ffffff;
  background-color: #99a3ff;
  border: 1px solid #99a3ff;
  border-radius: 31px;
}*/
</style>

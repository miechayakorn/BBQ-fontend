<template>
  <div>
    <div>
          <SideandNavbar/>
        </div>
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
    <div class="container col-9">
      <div>
        <table class="table table-hover tableSize ">
          <thead>
            <tr>
              <th scope="col">HN numbers</th>
              <th scope="col">ชื่อ - นามสกุล</th>
              <th scope="col">เวลาที่จอง</th>
              <th scope="col">สถานะ</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row">1</th>
              <td>Mark</td>
              <td>Otto</td>
              <td>@mdo</td>
            </tr>
            <tr>
              <th scope="row">2</th>
              <td>Jacob</td>
              <td>Thornton</td>
              <td>@fat</td>
            </tr>
            <tr>
              <th scope="row">3</th>
              <td>Larry</td>
              <td>the Bird</td>
              <td>@twitter</td>
            </tr>
            <tr>
              <th scope="row">3</th>
              <td>Larry</td>
              <td>the Bird</td>
              <td>@twitter</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import ServiceTypeBox from "@/components/ServiceTypeBox.vue";
import ServiceDateBox from "@/components/ServiceDateBox.vue";
import SideandNavbar from "@/components/SideandNavbar.vue"

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
    ServiceDateBox,
    SideandNavbar
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
.tableSize {
  width: 100%;
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

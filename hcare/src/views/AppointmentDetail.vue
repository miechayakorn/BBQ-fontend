<template>
  <div class="mt-5">
    <div class="container fixed-container mb-3">
      <div class="form-group text-left">
        <label class="font-weight-bold mb-4">My Appointment</label>
        <div class="form">
          <div class="container">
            <AppointmentCard :data="dataFetch" />
            <div class="row">
              <div class="col-12">
                <span class="font-weight-bold">ชื่อแพทย์ <br /></span>
                <span> นายกฤตาหมี อาสาฬหบูชา</span>
              </div>
            </div>
            <div class="row">
              <div class="col-12">
                <span class="font-weight-bold">โปรดอ่าน <br /></span>
                <span> ควรเข้า Join Meeting ก่อนเวลาประมาณ 5 นาที</span>
              </div>
            </div>
            <div class="row" style="text-align: center;">
              <div class="col-12">
                <button
                  class="btn btn-primary btnBlock btnConfirm mt-5 fixed-button mb-2"
                >
                  <span style="font-weight: 900;">Join Meeting</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import AppointmentCard from "@/components/AppointmentCard.vue";

export default {
  data() {
    return {
      dataFetch: [
        {
          account_id: null,
          hn_number: null,
          first_name: "",
          last_name: "",
          booking_id: null,
          type_id: null,
          type_name: "",
          date: "",
          time_in: "",
        },
      ],
    };
  },
  components: {
    AppointmentCard,
  },
  async mounted() {
    await axios
      .post(`${process.env.VUE_APP_BACKEND_URL}/myappointment/detail`, {
        booking_id: this.$route.params.id,
      })
      .then((res) => {
        this.dataFetch = res.data;
      });
  },
};
</script>

<style></style>

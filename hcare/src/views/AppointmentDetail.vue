<template>
  <div class="mt-5">
    <div class="container fixed-container mb-3">
      <div class="form-group text-left">
        <label class="font-weight-bold mb-4">My Appointment</label>
        <div class="form">
          <div class="container">
            <AppointmentCard :data="dataFetch.appointmentCard" />
            <div class="row">
              <div class="col-12">
                <span class="font-weight-bold">
                  ชื่อแพทย์
                  <br />
                </span>
                <span>{{dataFetch.doctor_firstname}} {{dataFetch.doctor_lastname}}</span>
              </div>
            </div>
            <div class="row">
              <div class="col-12">
                <span class="font-weight-bold">
                  โปรดอ่าน
                  <br />
                </span>
                <span>ควรเข้า Join Meeting ก่อนเวลาประมาณ 5 นาที</span>
              </div>
            </div>
            <div class="row" style="text-align: center;">
              <div class="col-12">
                <button class="btn btn-primary btnBlock btnConfirm mt-5 fixed-button mb-2">
                  <a :href="'http://'+dataFetch.link_meeting">
                    <span style="font-weight: 900; color:white;">Join Meeting</span>
                  </a>
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
      dataFetch: {
        appointmentCard: [
          {
            account_id: null,
            hn_number: null,
            first_name: "",
            last_name: "",
            booking_id: null,
            type_id: null,
            type_name: "",
            date: "",
            time_in: ""
          }
        ],
        link_meeting: "",
        doctor_id: null,
        doctor_firstname: "",
        doctor_lastname: ""
      }
    };
  },
  components: {
    AppointmentCard
  },
  async mounted() {
    console.log();
    await axios
      .get(
        `${process.env.VUE_APP_BACKEND_URL}/appointment/detail/${this.$route.params.id}`
      )
      .then(res => {

        this.dataFetch.appointmentCard[0].account_id = res.data.account_id;
        this.dataFetch.appointmentCard[0].hn_number = res.data.hn_number;
        this.dataFetch.appointmentCard[0].first_name = res.data.first_name;
        this.dataFetch.appointmentCard[0].last_name = res.data.last_name;
        this.dataFetch.appointmentCard[0].booking_id = res.data.booking_id;
        this.dataFetch.appointmentCard[0].type_id = res.data.type_id;
        this.dataFetch.appointmentCard[0].type_name = res.data.type_name;
        this.dataFetch.appointmentCard[0].date = res.data.date;
        this.dataFetch.appointmentCard[0].time_in = res.data.time_in;
        this.dataFetch.link_meeting = res.data.link_meeting;
        this.dataFetch.doctor_id = res.data.doctor_id
        this.dataFetch.doctor_firstname = res.data.doctor_firstname
        this.dataFetch.doctor_lastname = res.data.doctor_lastname
      });
  }
};
</script>

<style></style>

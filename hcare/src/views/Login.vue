<template>
  <div>
    <logoHeader />
    <div class="container fixed-container mb-3 bg" style="margin-top:40px">
      <div class="form-group text-left">
        <div class="col-xs-12" style="margin-top:28px">
          <div class="form-group">
            <label for="InputName">Username</label>
            <div class="inner-addon left-addon">
              <i class="fas fa-user"></i>
              <input
                type="text"
                id="InputName"
                v-model="username"
                class="form-control"
                placeholder="username"
              />
            </div>
          </div>
          <div class="form-group">
            <label for="InputName">Password</label>

            <div class="inner-addon left-addon">
              <i class="fas fa-key"></i>
              <input
                type="password"
                v-model="password"
                class="form-control"
                placeholder="password"
              />
            </div>
          </div>

          <div class="row" style="text-align: center;">
            <div class="col-12">
              <button
                @click="sendToBackend"
                class="btn btn-primary btnBlock btnConfirm mt-5 fixed-button mb-2"
              >
                <span style="font-weight:900">Log In</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import logoHeader from "@/components/svg/logoHeader.vue";
import { waiting, errorSWAL, successSWAL } from "@/utility/swal.js";

export default {
  data() {
    return {
      username: "",
      password: ""
    };
  },
  methods: {
    sendToBackend() {
      this.$swal({
        ...waiting,
        onOpen: () => {
          this.$swal.showLoading();
        }
      });

      axios
        .post(`${process.env.VUE_APP_BACKEND_URL}/login`, {
          //process.env.VUE_APP_BACKEND_URL อันนี้มาจากไฟล์ .env ของ VUE จะบังคับให้ขึ้นต้นด้วยชื่อ VUE_APP_
          hn_number: this.username,
          password: this.password
        })
        .then(res => {
          localStorage.setItem("user", JSON.stringify(res.data));
          this.$router.push("Booking"); //อันนี้คือที่จะให้ไปห้าต่อไป
        })
        .catch(error => {
          console.log("===== Backend-error ======");
          console.error(error.response); //สามารถเช็ค status ได้ถา้ใช้ error.response.status
          this.$swal({
            title: "คำเตือน",
            text: "รหัสผ่านไม่ถูกต้อง",
            icon: "warning"
          });
        });
    }
  },
  components: {
    logoHeader
  }
};
</script>

<style>
/* enable absolute positioning */
.inner-addon {
  position: relative;
}

/* style icon */
.inner-addon .fas {
  position: absolute;
  padding: 10px;
  pointer-events: none;
}

/* align icon */
.left-addon .fas {
  left: 0px;
}
.right-addon .fas {
  right: 0px;
}

/* add padding  */
.left-addon input {
  padding-left: 30px;
}
.right-addon input {
  padding-right: 30px;
}
</style>

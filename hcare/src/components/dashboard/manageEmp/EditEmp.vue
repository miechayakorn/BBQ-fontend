<template>
  <div>
    <div class="container fixed-container mb-3" v-if="loading">
      <VclFacebook />
      <VclList class="mt-2" />
      <VclList class="mt-2" />
    </div>
    <div class="container mb-3 bg" v-else-if="!loading">
      <div class="row">
        <div class="col-12 col-md-5">
          <div class="row text-white">
            <div class="col-12 mt-4">
              <div class="div-showInfoUser">
                <div v-if="editComponent == false">
                  <div
                    v-if="dataFetch.profile_picture == null"
                    class="d-flex justify-content-center pt-5"
                  >
                    <logoAdmin
                      v-if="dataFetch.role == 'ADMIN'"
                      class="centerImg"
                    />
                    <logoStaff
                      v-else-if="dataFetch.role == 'STAFF'"
                      class="centerImg"
                    />
                  </div>
                  <div
                    v-else-if="dataFetch.profile_picture"
                    class="d-flex justify-content-center pt-5"
                  >
                    <img
                      class="rounded-circle m-2 centerImg"
                      width="56"
                      height="56"
                      :src="dataFetch.profile_picture"
                    />
                  </div>
                  <label
                    style="color: white"
                    class="btn"
                    @click="editComponent = true"
                  >
                    <i class="fas fa-pen" />
                  </label>
                  <label style="color: white" class="btn" @click="removePic">
                    <i class="fas fa-trash"></i>
                  </label>
                </div>

                <div v-else-if="editComponent">
                  <vue-avatar
                    class="pt-5"
                    :width="60"
                    :height="60"
                    :borderRadius="60"
                    :border="0"
                    :color="[94, 101, 161]"
                    :placeholderSvg="svg"
                    ref="vueavatar"
                  >
                  </vue-avatar>
                  <button class="btn btn-danger" @click="editComponent = false">
                    ยกเลิก
                  </button>
                  <button class="btn btn-primary ml-1" @click="saveClicked">
                    ตกลง
                  </button>
                </div>
                <div class="p-4 text-left" style="margin-top: 40px">
                  <div v-if="this.$store.state.role == 'ADMIN'">
                    <p>สิทธิ์และการแก้ไข</p>
                    <div class="form-check form-check-inline">
                      <input
                        class="form-check-input"
                        type="radio"
                        name="role"
                        id="radioStaff"
                        value="STAFF"
                        v-model="dataFetch.role"
                      />
                      <label class="form-check-label" for="radioStaff"
                        >Staff</label
                      >
                    </div>
                    <div class="form-check form-check-inline">
                      <input
                        class="form-check-input"
                        type="radio"
                        name="role"
                        id="radioAdmin"
                        value="ADMIN"
                        v-model="dataFetch.role"
                      />
                      <label class="form-check-label" for="radioAdmin"
                        >Admin</label
                      >
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-12 col-md-7">
          <div class="row mt-4 div-card div-info-emp">
            <div class="col-12 mb-5">
              <div class="form-group mt-5">
                <div class="text-left mb-2">
                  <div class="row">
                    <div class="col-12">
                      <label for="firstPrefix">คำนำหน้าชื่อ</label>
                      <input
                        v-model="dataFetch.prefix"
                        type="text"
                        class="form-control"
                        id="firstPrefix"
                      />
                    </div>
                    <div class="col-12 col-md-6 mt-3">
                      <label for="firstName">ชื่อจริง</label>
                      <input
                        v-model="dataFetch.first_name"
                        type="text"
                        class="form-control"
                        id="firstName"
                      />
                    </div>
                    <div class="col-12 col-md-6 mt-3">
                      <label for="lastName">นามสกุล</label>
                      <input
                        type="text"
                        class="form-control"
                        id="lastName"
                        v-model="dataFetch.last_name"
                      />
                    </div>
                    <div class="col-12 mt-3">
                      <label for="inputEmail">อีเมล</label>
                      <input
                        type="email"
                        class="form-control"
                        id="inputEmail"
                        disabled
                        :value="dataFetch.email"
                      />
                    </div>

                    <div class="col-12 col-md-6 mt-3">
                      <label for="inputTel">เบอร์โทรศัพท์</label>
                      <input
                        type="tel"
                        class="form-control"
                        id="inputTel"
                        v-model="dataFetch.telephone"
                      />
                    </div>
                    <div class="col-12 col-md-6 mt-3">
                      <label for="inputHNNumber">หมายเลขบุคลากร มจธ.</label>
                      <input
                        v-model="dataFetch.hn_number"
                        type="number"
                        class="form-control"
                        id="inputHNNumber"
                      />
                    </div>
                    <div class="col-12 mt-3">
                      <p>บริการที่รับผิดชอบ</p>
                      <button
                        v-for="(data, index) in dataFetch.service_type"
                        :key="index"
                        class="btn div-showTag text-white text-left m-1"
                      >
                        <span class="mt-4 mb-4 p-2">#{{ data.type_name }}</span>
                      </button>
                      <div
                        class="alert p-2 alert-warning"
                        v-show="dataFetch.service_type.length == 0"
                      >
                        ไม่มีบริการที่รับผิดชอบ
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="row mt-4 mb-4">
            <div class="col-12">
              <button
                @click="close()"
                class="col-5 btn btn-primary btnBlock btnBack fixed-button text-center mr-4"
              >
                <svg
                  width="19"
                  height="13"
                  viewBox="0 0 19 13"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M18.9785 5.14307H4.80852L8.38852 1.55307L6.97852 0.143066L0.978516 6.14307L6.97852 12.1431L8.38852 10.7331L4.80852 7.14307H18.9785V5.14307Z"
                    fill="#99A3FF"
                  />
                </svg>
                ย้อนกลับ
              </button>
              <button
                @click="sendToBackend"
                class="col-5 btn btn-primary btnBlock btnConfirm fixed-button text-center"
              >
                เสร็จสิ้น
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
import CryptoJS from "crypto-js";
import logoAdmin from "@/components/svg/logoAdmin.vue";
import logoStaff from "@/components/svg/logoStaff.vue";
import { errorSWAL } from "@/utility/swal.js";
import { VueAvatar } from "vue-avatar-editor-improved";
import { VclFacebook, VclList } from "vue-content-loading";

export default {
  data() {
    return {
      loading: false,
      editComponent: false,
      svg: `<svg width="62" height="39" viewBox="0 0 62 39" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M2.75 36.1C2.03 36.1 1.49 35.9133 1.13 35.54C0.776667 35.16 0.6 34.5667 0.6 33.76C0.6 33.6267 0.603333 33.4833 0.61 33.33C0.623333 33.17 0.636667 33.0133 0.65 32.86H2.75V33.56H1.49V33.76C1.49 34.18 1.53667 34.51 1.63 34.75C1.72333 34.9833 1.86 35.1467 2.04 35.24C2.22667 35.3333 2.45667 35.38 2.73 35.38C3.03 35.38 3.29 35.3233 3.51 35.21C3.73 35.0967 3.9 34.89 4.02 34.59C4.14 34.29 4.2 33.86 4.2 33.3C4.2 32.5667 4.07333 32.0267 3.82 31.68C3.57333 31.3333 3.14333 31.16 2.53 31.16C2.21 31.16 1.90333 31.2033 1.61 31.29C1.32333 31.37 1.04667 31.4867 0.78 31.64V30.81C0.98 30.7033 1.24333 30.6133 1.57 30.54C1.89667 30.46 2.25333 30.42 2.64 30.42C3.22667 30.42 3.7 30.54 4.06 30.78C4.42667 31.0133 4.69333 31.3467 4.86 31.78C5.02667 32.2067 5.11 32.7133 5.11 33.3C5.11 33.8867 5.03333 34.39 4.88 34.81C4.72667 35.23 4.47667 35.55 4.13 35.77C3.79 35.99 3.33 36.1 2.75 36.1ZM3.48453 29.65C3.06453 29.65 2.76786 29.5667 2.59453 29.4C2.4212 29.2267 2.33453 29.0333 2.33453 28.82C2.33453 28.72 2.3512 28.6133 2.38453 28.5C2.4112 28.38 2.44786 28.2833 2.49453 28.21L3.24453 28.34C3.20453 28.42 3.18453 28.5233 3.18453 28.65C3.18453 28.7367 3.2112 28.8133 3.26453 28.88C3.31786 28.94 3.40786 28.97 3.53453 28.97H6.06453V29.65H3.48453ZM7.14219 36L6.15219 30.52H7.06219L7.45219 32.9C7.48552 33.0933 7.51885 33.3433 7.55219 33.65C7.58552 33.9567 7.62552 34.32 7.67219 34.74H7.70219C7.78885 34.3133 7.87219 33.9467 7.95219 33.64C8.03885 33.3333 8.11219 33.0767 8.17219 32.87L8.84219 30.52H9.57219L10.2522 32.87C10.3122 33.0767 10.3822 33.3333 10.4622 33.64C10.5489 33.9467 10.6355 34.3133 10.7222 34.74H10.7622C10.8022 34.32 10.8389 33.9567 10.8722 33.65C10.9055 33.3433 10.9389 33.0933 10.9722 32.9L11.3722 30.52H12.2822L11.2922 36H10.4222L9.50219 33.02C9.45552 32.8533 9.40885 32.68 9.36219 32.5C9.32219 32.32 9.28219 32.0833 9.24219 31.79H9.20219C9.15552 32.0833 9.10885 32.3233 9.06219 32.51C9.01552 32.69 8.96552 32.86 8.91219 33.02L8.01219 36H7.14219ZM14.8853 36.1C14.7053 36.1 14.532 36.07 14.3653 36.01C14.1986 35.95 14.062 35.8433 13.9553 35.69C13.8486 35.5367 13.7953 35.3233 13.7953 35.05V29.56C13.7953 29.16 13.6986 28.8733 13.5053 28.7C13.3186 28.5267 13.0786 28.44 12.7853 28.44V28.06L13.5253 27.74H16.1953V28.44H14.1653L14.1553 28.48C14.302 28.58 14.4253 28.7333 14.5253 28.94C14.632 29.14 14.6853 29.4033 14.6853 29.73V34.94C14.6853 35.0933 14.7186 35.2033 14.7853 35.27C14.852 35.3367 14.9586 35.37 15.1053 35.37C15.1653 35.37 15.2286 35.3633 15.2953 35.35C15.362 35.3367 15.4253 35.32 15.4853 35.3L15.6053 35.95C15.4786 36.01 15.3553 36.05 15.2353 36.07C15.1153 36.09 14.9986 36.1 14.8853 36.1ZM16.6615 36V30.52H17.5515V32.89H17.5815L19.8615 30.52H20.9015V30.55L19.2915 32.18C19.8315 32.2267 20.2415 32.4167 20.5215 32.75C20.8082 33.0767 20.9515 33.51 20.9515 34.05V36H20.0615V34.07C20.0615 33.6967 19.9515 33.4 19.7315 33.18C19.5182 32.96 19.1582 32.84 18.6515 32.82L17.5515 33.94V36H16.6615ZM23.9406 36.1C23.354 36.1 22.904 35.9667 22.5906 35.7C22.284 35.4267 22.1306 35.0367 22.1306 34.53C22.1306 33.9767 22.3306 33.55 22.7306 33.25C23.1373 32.95 23.794 32.7733 24.7006 32.72L25.6606 32.66V32.35C25.6606 31.9167 25.5606 31.61 25.3606 31.43C25.1673 31.2433 24.8406 31.15 24.3806 31.15C24.0473 31.15 23.7273 31.1967 23.4206 31.29C23.1206 31.3767 22.834 31.5 22.5606 31.66V30.83C22.754 30.73 23.014 30.6367 23.3406 30.55C23.674 30.4633 24.0473 30.42 24.4606 30.42C25.1606 30.42 25.6806 30.5733 26.0206 30.88C26.3673 31.18 26.5406 31.6533 26.5406 32.3V36H25.6606V33.4L24.8206 33.46C24.1406 33.5067 23.6706 33.6133 23.4106 33.78C23.1573 33.9467 23.0306 34.19 23.0306 34.51C23.0306 34.81 23.124 35.03 23.3106 35.17C23.504 35.31 23.7706 35.38 24.1106 35.38C24.3306 35.38 24.524 35.35 24.6906 35.29L24.8306 35.96C24.704 36.0067 24.564 36.04 24.4106 36.06C24.264 36.0867 24.1073 36.1 23.9406 36.1ZM30.0335 36.1C29.5002 36.1 29.0802 35.9767 28.7735 35.73C28.4735 35.4767 28.2602 35.1367 28.1335 34.71C28.0135 34.2833 27.9535 33.8133 27.9535 33.3C27.9535 32.5467 28.0568 31.9633 28.2635 31.55C28.4702 31.13 28.7568 30.8367 29.1235 30.67C29.4968 30.5033 29.9268 30.42 30.4135 30.42C31.2135 30.42 31.7935 30.5933 32.1535 30.94C32.5202 31.2867 32.7035 31.7567 32.7035 32.35V36H31.8235V32.43C31.8235 32.0167 31.7202 31.7033 31.5135 31.49C31.3068 31.27 30.9502 31.16 30.4435 31.16C30.1368 31.16 29.8602 31.2167 29.6135 31.33C29.3735 31.4433 29.1835 31.6533 29.0435 31.96C28.9102 32.2667 28.8435 32.7167 28.8435 33.31C28.8435 33.6967 28.8802 34.0467 28.9535 34.36C29.0335 34.6667 29.1702 34.91 29.3635 35.09C29.5568 35.27 29.8268 35.36 30.1735 35.36C30.2735 35.36 30.3668 35.3533 30.4535 35.34C30.5402 35.3267 30.6235 35.3067 30.7035 35.28L30.7935 35.97C30.6868 36.0167 30.5635 36.05 30.4235 36.07C30.2902 36.09 30.1602 36.1 30.0335 36.1ZM35.8656 36.1C35.4723 36.1 35.1056 36.0633 34.7656 35.99C34.4323 35.91 34.149 35.8167 33.9156 35.71L34.1756 34.99C34.389 35.0767 34.6423 35.16 34.9356 35.24C35.2356 35.32 35.5523 35.36 35.8856 35.36C36.239 35.36 36.5323 35.2933 36.7656 35.16C36.999 35.0267 37.1156 34.8333 37.1156 34.58C37.1156 34.3533 37.0223 34.1667 36.8356 34.02C36.649 33.8733 36.349 33.7367 35.9356 33.61C35.5156 33.4767 35.159 33.3367 34.8656 33.19C34.579 33.0367 34.359 32.8567 34.2056 32.65C34.059 32.4367 33.9856 32.1733 33.9856 31.86C33.9856 31.4467 34.1556 31.1033 34.4956 30.83C34.8356 30.5567 35.379 30.42 36.1256 30.42C36.4456 30.42 36.7456 30.45 37.0256 30.51C37.3123 30.5633 37.5356 30.64 37.6956 30.74V31.49C37.529 31.41 37.299 31.3333 37.0056 31.26C36.7123 31.1867 36.409 31.15 36.0956 31.15C35.649 31.15 35.3323 31.22 35.1456 31.36C34.9656 31.4933 34.8756 31.6467 34.8756 31.82C34.8756 31.9667 34.9156 32.09 34.9956 32.19C35.0823 32.29 35.2256 32.3867 35.4256 32.48C35.6323 32.5733 35.909 32.68 36.2556 32.8C36.5756 32.9067 36.869 33.03 37.1356 33.17C37.4023 33.31 37.6123 33.4867 37.7656 33.7C37.9256 33.9067 38.0056 34.1733 38.0056 34.5C38.0056 34.78 37.9356 35.0433 37.7956 35.29C37.6623 35.53 37.439 35.7267 37.1256 35.88C36.8123 36.0267 36.3923 36.1 35.8656 36.1ZM36.2084 38.65C35.7818 38.65 35.4584 38.5633 35.2384 38.39C35.0118 38.2233 34.8984 37.9833 34.8984 37.67V37.5C34.8984 37.3867 34.8718 37.3167 34.8184 37.29C34.7584 37.27 34.6784 37.2733 34.5784 37.3L34.5184 36.7C34.6118 36.6733 34.7051 36.6567 34.7984 36.65C34.8851 36.6433 34.9518 36.64 34.9984 36.64C35.2384 36.64 35.4118 36.6933 35.5184 36.8C35.6184 36.9067 35.6684 37.0567 35.6684 37.25V37.59C35.6684 37.7167 35.7084 37.8233 35.7884 37.91C35.8684 37.9967 36.0051 38.04 36.1984 38.04C36.3984 38.04 36.5384 37.9967 36.6184 37.91C36.6918 37.8233 36.7284 37.7167 36.7284 37.59V36.67H37.5084V37.64C37.5084 38.3133 37.0751 38.65 36.2084 38.65ZM41.4084 36.1C40.6218 36.1 40.0584 35.92 39.7184 35.56C39.3784 35.2 39.2084 34.6867 39.2084 34.02V30.52H40.0984V34.03C40.0984 34.9167 40.5351 35.36 41.4084 35.36C41.8618 35.36 42.1951 35.25 42.4084 35.03C42.6284 34.81 42.7384 34.4767 42.7384 34.03V28.55H43.6284V34.02C43.6284 34.6867 43.4551 35.2 43.1084 35.56C42.7684 35.92 42.2018 36.1 41.4084 36.1ZM45.3331 36.1C45.2131 36.1 45.0965 36.0867 44.9831 36.06C44.8698 36.04 44.7565 36.0033 44.6431 35.95L44.7431 35.33C44.7898 35.3433 44.8431 35.3567 44.9031 35.37C44.9631 35.3833 45.0198 35.39 45.0731 35.39C45.2731 35.39 45.3731 35.2567 45.3731 34.99V34.06C45.3731 33.6467 45.4498 33.35 45.6031 33.17C45.7565 32.9833 45.9765 32.8567 46.2631 32.79L46.2731 32.76L45.1231 32.34V32.01C45.1231 31.7367 45.2098 31.48 45.3831 31.24C45.5631 30.9933 45.8231 30.7967 46.1631 30.65C46.5031 30.4967 46.9098 30.42 47.3831 30.42C47.7965 30.42 48.1765 30.4867 48.5231 30.62C48.8698 30.7467 49.1465 30.95 49.3531 31.23C49.5665 31.5033 49.6731 31.8633 49.6731 32.31V36H48.7831V32.4C48.7831 31.9533 48.6465 31.6367 48.3731 31.45C48.0998 31.2567 47.7665 31.16 47.3731 31.16C46.9598 31.16 46.6331 31.2467 46.3931 31.42C46.1531 31.5867 46.0331 31.8 46.0331 32.06L47.1731 32.6L47.0931 33.08C46.8465 33.08 46.6465 33.16 46.4931 33.32C46.3398 33.48 46.2631 33.7367 46.2631 34.09V35.06C46.2631 35.4667 46.1731 35.7433 45.9931 35.89C45.8131 36.03 45.5931 36.1 45.3331 36.1ZM52.8385 36V32.11C52.8385 31.7833 52.7618 31.5433 52.6085 31.39C52.4618 31.2367 52.2118 31.16 51.8585 31.16C51.6185 31.16 51.3918 31.1933 51.1785 31.26C50.9718 31.32 50.7718 31.4067 50.5785 31.52V30.72C50.7118 30.6533 50.9018 30.5867 51.1485 30.52C51.3952 30.4533 51.6885 30.42 52.0285 30.42C52.5485 30.42 52.9618 30.5367 53.2685 30.77C53.5752 31.0033 53.7285 31.4067 53.7285 31.98V36H52.8385ZM55.941 36L54.951 30.52H55.861L56.251 32.9C56.2843 33.0933 56.3177 33.3433 56.351 33.65C56.3843 33.9567 56.4243 34.32 56.471 34.74H56.501C56.5877 34.3133 56.671 33.9467 56.751 33.64C56.8377 33.3333 56.911 33.0767 56.971 32.87L57.641 30.52H58.371L59.051 32.87C59.111 33.0767 59.181 33.3333 59.261 33.64C59.3477 33.9467 59.4343 34.3133 59.521 34.74H59.561C59.601 34.32 59.6377 33.9567 59.671 33.65C59.7043 33.3433 59.7377 33.0933 59.771 32.9L60.171 30.52H61.081L60.091 36H59.221L58.301 33.02C58.2543 32.8533 58.2077 32.68 58.161 32.5C58.121 32.32 58.081 32.0833 58.041 31.79H58.001C57.9543 32.0833 57.9077 32.3233 57.861 32.51C57.8143 32.69 57.7643 32.86 57.711 33.02L56.811 36H55.941Z" fill="white"/>
<path d="M43 6.75V20.25C43 21.4922 41.9922 22.5 40.75 22.5H21.25C20.0078 22.5 19 21.4922 19 20.25V6.75C19 5.50781 20.0078 4.5 21.25 4.5H25.375L25.9516 2.95781C26.2797 2.08125 27.1187 1.5 28.0562 1.5H33.9391C34.8766 1.5 35.7156 2.08125 36.0438 2.95781L36.625 4.5H40.75C41.9922 4.5 43 5.50781 43 6.75ZM36.625 13.5C36.625 10.3969 34.1031 7.875 31 7.875C27.8969 7.875 25.375 10.3969 25.375 13.5C25.375 16.6031 27.8969 19.125 31 19.125C34.1031 19.125 36.625 16.6031 36.625 13.5ZM35.125 13.5C35.125 15.7734 33.2734 17.625 31 17.625C28.7266 17.625 26.875 15.7734 26.875 13.5C26.875 11.2266 28.7266 9.375 31 9.375C33.2734 9.375 35.125 11.2266 35.125 13.5Z" fill="white"/>
</svg>
`,
      dataFetch: {
        account_id: "",
        prefix: "",
        first_name: "",
        last_name: "",
        email: "",
        telephone: "",
        hn_number: "",
        profile_picture: "",
        role: "",
        service_type: [],
      },
    };
  },
  async mounted() {
    this.loading = true;
    this.loadPage();
    this.loading = false;
  },
  methods: {
    async loadPage() {
      await axios
        .get(
          `${process.env.VUE_APP_BACKEND_URL}/admin/dashboard/manageemployee/getemployeeforedit?account_id=${this.$route.params.id}`,
          {
            headers: { Authorization: `Bearer ${this.$store.state.token}` },
          }
        )
        .then((res) => {
          this.dataFetch = res.data;
        })
        .catch((res) => {
          console.log("===== Backend-error ======");
          console.error(res);
          this.$swal({ ...errorSWAL });
          close();
        });
    },
    close() {
      close();
    },
    removePic() {
      this.dataFetch.profile_picture = null;
    },
    async saveClicked() {
      let img = this.$refs.vueavatar.getImageScaled();
      this.dataFetch.profile_picture = img.toDataURL();
      this.editComponent = false;
    },
    async sendToBackend() {
      if (
        this.dataFetch.account_id != "" &&
        this.dataFetch.prefix != "" &&
        this.dataFetch.first_name != "" &&
        this.dataFetch.last_name != "" &&
        this.dataFetch.email != "" &&
        this.dataFetch.telephone != "" &&
        this.dataFetch.hn_number != "" &&
        this.dataFetch.role != ""
      ) {
        await axios
          .patch(
            `${process.env.VUE_APP_BACKEND_URL}/admin/dashboard/manageemployee/editemployee`,
            {
              account_id: this.dataFetch.account_id,
              prefix: this.dataFetch.prefix,
              first_name: this.dataFetch.first_name,
              last_name: this.dataFetch.last_name,
              email: this.dataFetch.email,
              telephone: this.dataFetch.telephone,
              hn_number: this.dataFetch.hn_number,
              role: this.dataFetch.role,
              profile_picture: this.dataFetch.profile_picture,
            },
            {
              headers: {
                Authorization: `Bearer ${this.$store.state.token}`,
              },
            }
          )
          .then((res) => {
            if (res.status == 201) {
              if (
                this.$store.state.user.account_id == this.dataFetch.account_id
              ) {
                this.$store.state.user.profile_picture = this.dataFetch.profile_picture;

                let user = JSON.parse(localStorage.getItem("user"));
                if (this.dataFetch.profile_picture) {
                  user.profile_picture = CryptoJS.AES.encrypt(
                    this.dataFetch.profile_picture,
                    process.env.VUE_APP_SECRET_KEY
                  ).toString();
                } else {
                  user.profile_picture = null;
                }
                localStorage.setItem("user", JSON.stringify(user));
              }
              this.$swal({
                toast: true,
                position: "top-end",
                showConfirmButton: false,
                timerProgressBar: true,
                onOpen: (toast) => {
                  toast.addEventListener("mouseenter", this.$swal.stopTimer);
                  toast.addEventListener("mouseleave", this.$swal.resumeTimer);
                },
                timer: 3000,
                icon: "success",
                title: "บันทึกสำเร็จ",
              });
            } else if (res.status == 204) {
              this.$swal({
                icon: "warning",
                title: "ไม่สามารถเปลี่ยนสิทธิ์ได้",
                text: "เนื่องจากระบบจะต้องมีผู้ที่เป็น ADMIN อย่างน้อย 1 คน",
              });
              this.loadPage();
            } else {
              console.log("===== Backend-error ======");
              console.error(res.data);
              this.$swal({
                icon: "warning",
                title: "คำเตือน",
                text: res.data,
              });
            }
          })
          .catch((res) => {
            console.log("===== Backend-error ======");
            console.error(res);
            this.$swal({ ...errorSWAL });
          });
      } else {
        this.$swal({
          icon: "warning",
          title: "คำเตือน",
          text: "กรุณากรอกข้อมูลให้ครบ",
        });
      }
    },
  },
  components: {
    logoAdmin,
    logoStaff,
    VclFacebook,
    VclList,
    VueAvatar,
  },
};
</script>

<style scope>
.div-card-profile {
  background: #5e65a1;
  border-radius: 30px;
}
.div-showInfoUser {
  background: #5e65a1;
  box-shadow: 0px 4px 8px #e4e7ff;
  border-radius: 30px;
  font-weight: bold;
  font-size: 18px;
}
.div-showTag {
  background: #5e65a1;
  border-radius: 20px;
}
.btnBack {
  background: #ffffff;
  border: 2px solid #99a3ff;
  box-sizing: border-box;
  border-radius: 20px;
  color: #99a3ff;
}
@media (min-width: 768px) {
  .div-info-emp {
    padding-right: 60px;
    padding-left: 60px;
    border-radius: 30px;
  }
}
</style>
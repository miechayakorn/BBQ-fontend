<template>
  <div class="container">
    <div class="row justify-content-center">
      <div class="div-login mt-3">
        <logoHeader />
        <div class="container fixed-container mb-3">
          <groupDocter2 class="media-height-docter" />
          <div v-if="!visibleState" class="col-12">
            <button @click="adal" class="btn fixed-button btnAuth mb-2 mt-2">
              <span style="font-weight: 900; color: white">{{
                $t("Loginwithkmutt")
              }}</span>
            </button>
            <div class="mb-3">
              <span class="text-link" @click="visibleState = true">
                {{ $t("cannotlogin") }}</span
              >
            </div>
          </div>
          <div v-if="visibleState">
            <SendMailForm v-if="!email" v-on:email="getEmail" />
            <ComfirmOTPForm v-else-if="email" :email="email" />
            <div class="text-link" @click="visibleState = false">
              &#60; {{ $t("goback") }}
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
import groupDocter2 from "@/components/svg/groupDocter2.vue";
import CryptoJS from "crypto-js";
import SendMailForm from "@/components/login/SendMailForm.vue";
import ComfirmOTPForm from "@/components/login/ComfirmOTPForm";
import { waiting, errorSWAL, successSWAL } from "@/utility/swal.js";
import authentication from "@/utility/authentication";

export default {
  data() {
    return {
      email: null,
      visibleState: false,
    };
  },
  async mounted() {
    //Redirect when Login OAuth success
    if (localStorage.getItem("adal.idtoken")) {
      authentication.initialize();
      let email = authentication.getUserProfile().upn;
      let firstname = authentication.getUserProfile().name.split(" ")[0];
      let lastname = authentication.getUserProfile().name.split(" ")[1];

      await axios
        .post(`${process.env.VUE_APP_BACKEND_URL}/login/oauth`, {
          hash: CryptoJS.AES.encrypt(
            email,
            process.env.VUE_APP_SECRET_KEY
          ).toString(),
        })
        .then((res) => {
          if (res.status == 200) {
            this.$store.state.token = res.data.token;
            this.$store.state.role = res.data.role;
            this.$store.state.user = {
              account_id: res.data.account_id,
              first_name: res.data.first_name,
              last_name: res.data.last_name,
              profile_picture: res.data.profile_picture,
            };

            let dataSetLocal = res.data;
            dataSetLocal.first_name = CryptoJS.AES.encrypt(
              dataSetLocal.first_name,
              process.env.VUE_APP_SECRET_KEY
            ).toString();
            dataSetLocal.last_name = CryptoJS.AES.encrypt(
              dataSetLocal.last_name,
              process.env.VUE_APP_SECRET_KEY
            ).toString();
            dataSetLocal.role = CryptoJS.AES.encrypt(
              dataSetLocal.role,
              process.env.VUE_APP_SECRET_KEY
            ).toString();
            if (dataSetLocal.profile_picture) {
              dataSetLocal.profile_picture = CryptoJS.AES.encrypt(
                dataSetLocal.profile_picture,
                process.env.VUE_APP_SECRET_KEY
              ).toString();
            }
            dataSetLocal.account_id = CryptoJS.AES.encrypt(
              dataSetLocal.account_id + "",
              process.env.VUE_APP_SECRET_KEY
            ).toString();

            localStorage.setItem("user", JSON.stringify(dataSetLocal));

            const redirectPath = this.$route.query.redirect || "/";
            this.$router.push(redirectPath);
          } else if (res.status == 202) {
            this.$swal({
              toast: true,
              position: "top-end",
              showConfirmButton: false,
              timer: 3000,
              icon: "info",
              title: "กรุณา ลงทะเบียนก่อนใช้งาน!",
            });

            this.$router.push({
              name: "Register",
              query: {
                email: email,
                firstname: firstname,
                lastname: lastname,
                redirect: this.$route.query.redirect || "/",
              },
            });
          }
        })
        .catch((error) => {
          console.log("===== Backend-error ======");
          console.error(error.response);
          this.$swal({
            ...errorSWAL,
          });
        });
    }
  },
  methods: {
    async adal() {
      await authentication.initialize();
    },
    getEmail(email) {
      this.email = email;
    },
  },
  components: {
    logoHeader,
    groupDocter2,
    SendMailForm,
    ComfirmOTPForm,
  },
};
</script>

<style>
.div-login {
  background: #f9f9fc;
}

@media (min-width: 768px) {
  .div-login {
    background: #e9ebfb;
    box-shadow: 0px 4px 8px #ececec;
    border-radius: 30px;
  }
}

.media-height-docter {
  height: 150px;
  margin-bottom: 30px;
}

@media (max-width: 768px) {
  .media-height-docter {
    height: 150px;
    margin-bottom: 20px;
  }
}

.text-link {
  color: #99a3ff;
  cursor: pointer;
}
.inner-addon {
  position: relative;
}

.inner-addon .fas {
  position: absolute;
  padding: 10px;
  pointer-events: none;
}

.left-addon .fas {
  left: 0px;
}
.right-addon .fas {
  right: 0px;
}

.left-addon input {
  padding-left: 30px;
}
.right-addon input {
  padding-right: 30px;
}
.btnAuth {
  background-color: #5e65a1;
  border-radius: 31px;
}
</style>

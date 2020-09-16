<template>
  <div class="container mb-4">
    <div class="row mt-3">
      <div class="col-12 col-md-4">
        <div class="row m-3">
          <div class="col-12 p-4 div-card">
            <div class="row">
              <div class="col-12">
                <div class="float-right">
                  <toggle-button
                    class="mr-2"
                    :width="45"
                    :height="25"
                    :font-size="14"
                    value
                    color="#99a3ff"
                    @change="statusService(time,$event.value)"
                  />
                </div>
              </div>
              <div class="col-12">
                <h6
                  class="font-weight-bold mb-3"
                  style="font-size: 20px; color: #5E65A1;"
                >หู คอ จมูก</h6>
                <img
                  src="https://picsum.photos/200"
                  class="rounded-circle m-2"
                  alt="Cinque Terre"
                  width="65"
                  height="65"
                />
                <img
                  src="https://picsum.photos/200"
                  class="rounded-circle m-2"
                  alt="Cinque Terre"
                  width="65"
                  height="65"
                />
                <img
                  src="https://picsum.photos/200"
                  class="rounded-circle m-2"
                  alt="Cinque Terre"
                  width="65"
                  height="65"
                />
                <img
                  src="https://picsum.photos/200"
                  class="rounded-circle m-2"
                  alt="Cinque Terre"
                  width="65"
                  height="65"
                />
                <img
                  src="https://picsum.photos/200"
                  class="rounded-circle m-2"
                  alt="Cinque Terre"
                  width="65"
                  height="65"
                />
              </div>
              <div class="col-12 mt-4">
                <button type="button" @click="removeService()" class="btn">
                  <i class="fas fa-trash fa-lg" style="color: rgb(227, 71, 36);"></i>
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
import VclFacebook from "vue-content-loading";

export default {
  data() {
    return {
      loading: false,
      serviceArray: [
        { ชื่อบริการ: "service 1", ชื่อผู้รับผิดชอบ: "man 1" },
        { ชื่อบริการ: "service 2", ชื่อผู้รับผิดชอบ: "man 1" },
        { ชื่อบริการ: "service 3", ชื่อผู้รับผิดชอบ: "man 2" },
        { ชื่อบริการ: "service 4", ชื่อผู้รับผิดชอบ: "man 1" },
        { ชื่อบริการ: "service 5", ชื่อผู้รับผิดชอบ: "man 3" },
      ],
    };
  },
  components: {
    VclFacebook,
  },
  methods: {
    async statusService() {},
    async removeService() {},
  },
  async mounted() {},
};
</script>

<style></style>

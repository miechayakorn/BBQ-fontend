<template>
  <div style="margin-top: -0.625rem; margin-right: 15px">
    <div class="row">
      <div
        v-if="windowWidth < 769"
        class="alert alert-warning alert-dismissible fade show"
        role="alert"
      >
        <strong>คำแนะนำ</strong> เพื่อการใช้งานที่ราบลื่น
        โปรดเข้าใช้งานผ่านคอมพิวเตอร์ หรือท่านสามารถทำตามคำแนะนำ ดังนี้
        <br />
        <button
          type="button"
          class="btn btn-primary"
          data-toggle="modal"
          data-target="#modalInfo"
        >
          ดูเพิ่มเติม
        </button>
        <div
          class="modal fade"
          id="modalInfo"
          tabindex="-1"
          role="dialog"
          aria-labelledby="modalInfo"
          aria-hidden="true"
          style="color: black"
        >
          <div class="modal-dialog" role="document">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="modalInfo">
                  วิธีเปลี่ยนโหมด Desktop site
                </h5>
                <button
                  type="button"
                  class="close"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div class="modal-body">
                หากเข้าใช้งานผ่านโปรแกรม Google Chrome
                <br/>
                <img
                  :width="windowWidth - 100"
                  src="https://support.gpsgate.com/hc/article_attachments/360033260533/mceclip4.png"
                />
                <br/>
                หรือ หากเข้าใช้งานผ่านโปรแกรม Safari
                <br/>
                <img
                  :width="windowWidth - 100"
                  src="https://support.gpsgate.com/hc/article_attachments/360033260533/mceclip4.png"
                />
              </div>
              <div class="modal-footer">
                <button
                  type="button"
                  class="btn btn-secondary"
                  data-dismiss="modal"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
        <button
          type="button"
          class="close"
          data-dismiss="alert"
          aria-label="Close"
        >
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
    </div>
    <router-view></router-view>
  </div>
</template>
<script>
export default {
  data() {
    return {
      windowWidth: window.innerWidth,
    };
  },
  mounted() {
    this.$nextTick(() => {
      window.addEventListener("resize", this.onResize);
    });
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.onResize);
  },
  methods: {
    onResize() {
      this.windowWidth = window.innerWidth;
    },
  },
};
</script>
<style>
.dropdown {
  cursor: pointer;
  position: relative;
  display: inline-block;
}

.dropdown-content {
  background-color: #5e65a2;
  color: white;
  border-radius: 20px;
  padding: 30px;
  display: none;
  position: absolute;
  min-width: 400px;
  z-index: 1;
  margin-top: 1px;
  bottom: 100%;
}

.dropdown:hover .dropdown-content {
  display: block;
}

.list-doctor > thead {
  background-color: #99a3ff;
  color: #ffffff;
}

.list-doctor > tbody > tr {
  background-color: #ffffff;
}

th:hover {
  cursor: pointer;
}

th.active .arrow.asc {
  border-bottom: 4px solid #4d4d4d;
}

th.active .arrow.dsc {
  border-top: 4px solid #4d4d4d;
}

.arrow {
  display: inline-block;
  vertical-align: middle;
  width: 0;
  height: 0;
  margin-left: 5px;
}

.arrow.asc {
  border-left: 4px solid transparent;
  border-right: 4px solid transparent;
  border-bottom: 4px solid #cdc;
}

.arrow.dsc {
  border-left: 4px solid transparent;
  border-right: 4px solid transparent;
  border-top: 4px solid #cdc;
}

.nav-item-underlined:after,
.nav-underlined > li:after {
  display: block;
  content: "";
  padding-bottom: 15px;
  border-bottom: 3px solid transparent;
  width: 0;
  width: auto;
}

.disText {
  color: #b6b6b6;
}

.activeText {
  color: #555555;
}

.underlined-active:after,
.nav-underlined:hover > li:hover:after,
.nav-underlined:active > li:hover:after,
.nav-underlined:hover > li.active:hover:after,
.nav-underlined:active > li.active:hover:after,
.nav-underlined > li.active:after,
.nav-underlined > li:hover:after {
  border-color: #99a3ff;
}

.bg-blueMan2 {
  background-color: #e0e3ff;
  box-shadow: 0px 4px 8px #e9ebfb;
}

.div-card {
  background-color: #ffffff;
  box-shadow: 0px 4px 8px #e9ebfb;
}

input[type="radio"] {
  width: 18px;
  height: 18px;
}
</style>

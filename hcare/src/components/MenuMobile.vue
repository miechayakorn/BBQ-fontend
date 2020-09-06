<template>
  <div>
    <div
      style="
    position:fixed;
	top:60px;
	left:10px;
	text-align:center;"
      @click="hide"
      v-show="visibleState"
    >
      <button
        class="btn btn-primary d-block d-sm-none"
        data-toggle="collapse"
        data-target="#navbarCollapseMenu-toggle"
        id="menu-toggle"
      >
        <span>&#60;&#60;</span>
      </button>
    </div>
    <div
      style="
    position:fixed;
	top:60px;
	left:10px;
	text-align:center;"
      @click="show"
      v-show="visibleState == false"
    >
      <button
        class="btn btn-primary d-block d-sm-none"
        data-toggle="collapse"
        data-target="#navbarCollapseMenu-toggle"
        id="menu-toggle"
      >
        <span>&#62;&#62;</span>
      </button>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      visibleState: true
    };
  },

  methods: {
    hide() {
      this.visibleState = false;
    },
    show() {
      this.visibleState = true;
    }
  }
};
</script>
<style></style>

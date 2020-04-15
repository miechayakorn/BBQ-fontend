<template>
  <nav class="navbar navbar-expand-lg fixed-top bg-white">
    <a class="navbar-brand" href="">
      <logoHeader style="width: 55px; height: 17px; margin-top:0px;" />
    </a>
    <button
      class="navbar-toggler toggler-example"
      type="button"
      data-toggle="collapse"
      data-target="#navbarCollapse"
      aria-controls="navbarCollapse"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span style="color:#99A3FF"><i class="fas fa-bars fa-1x"></i></span>
    </button>
    <div
      class="collapse navbar-collapse bg-white text-left"
      id="navbarCollapse"
    >
      <ul class="navbar-nav mr-auto">
        <li class="nav-item active">
          <a class="nav-link" href="#">Home</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#">ทำนัด</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#">กดคิว</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#">ตารางให้บริการ</a>
        </li>
      </ul>
      <form class="form-inline mt-2 mt-md-0">
        <input class="form-control mr-sm-2" type="text" placeholder="Search" />
        <button class="btn btn-outline-success my-2 my-sm-0" type="submit">
          Search
        </button>
      </form>
    </div>
  </nav>
</template>
<script>
import logoHeader from "@/components/svg/logoHeader.vue";
export default {
  components: { logoHeader }
};
</script>
<style>
@media (max-width: 992px) {
  .navbar-collapse {
    position: absolute;
    top: 54px;
    /* left: 100%; */
    margin-left: 20%;
    padding-left: 15px;
    padding-right: 15px;
    padding-bottom: 15px;
    width: 80%;
    transition: all 0.4s ease;
    display: block;
  }
  .navbar-collapse.collapsing {
    height: auto !important;
    margin-left: 50%;
    left: 50%;
    transition: all 0.2s ease;
  }
  .navbar-collapse.show {
    left: 0;
  }
}
</style>

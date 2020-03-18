<template>
  <div class="container-fluids">
    <div class="col.p-0-1 menu-background">
      <div class="col myCol">nav</div>
    </div>
    <div class="row myRow">
      <div class="col-1 myCol1 col1Style">
        <ul class="menu">
          <li>
            <router-link to="/..">
              <i class="fas fa-address-book"></i>
              <br>นัดหมาย
            </router-link>
          </li>
          <li>
            <router-link to="/..">
              <i class="far fa-calendar-alt"></i>
              <br>ตารางเวลา
            </router-link>
          </li>
          <li>
            <router-link to="/..">
              <i class="fas fa-hourglass-half"></i>
              <br>คิว
            </router-link>
          </li>
        </ul>
      </div>
      <div class="col-2 myCol1">queue</div>
      <div class="col-9 myCol1">spacework</div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style>
.menu{
  list-style: none;
  padding: 0;
  margin: 0;
  text-align: center;
}
.menu > li {
  color: #ffffff;
  padding: 1em;
}
.menu-background {
  padding: 0;
  background-color: #ccd1ff;
}
.col1Style {
  padding: 0;
  background-color: #99a3ff;
}
.ul {
  padding: 1em;
}
.myCol {
  border: 1px solid;
  height: 60px;
}
.myCol1 {
  border: 1px solid;
  height: 800px;
}
.myRow {
  border: 1px solid;
}
</style>

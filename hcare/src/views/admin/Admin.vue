<template>
  <div style="margin-top: -0.625rem; margin-right: 15px;">
    <router-view></router-view>
  </div>
</template>

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

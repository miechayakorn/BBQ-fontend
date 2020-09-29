<template>
  <router-view></router-view>
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
</style>

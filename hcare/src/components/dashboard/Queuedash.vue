<template>
  <div class="border-right bg-white col-md-2 collapse show" id="navbarCollapseMenu-toggle">
    <h5 class="qText" style="margin-top: 22px;">คิวปัจจุบัน</h5>
    <span class="current-queue-text textBold">A 0001</span>
    <br />
    <br />
    <h5 class="qText" style="margin-top: 22px;">คิวถัดไป</h5>
    <ul class="queue-list-next">
      <li>
        <span class="queue-text textBold">A 0002</span>
      </li>
      <li>
        <span class="queue-text textBold">A 0003</span>
      </li>
      <li>
        <span class="queue-text textBold">A 0004</span>
      </li>
    </ul>
  </div>
</template>

<script>
export default {

}
</script>

<style>
.queue-text {
  font-style: bold;
  font-size: 2em;
  color: #b6b6b6;
}
.queue-list-next {
  list-style: none;
  padding: 0;
  margin: 0;
  text-align: center;
}
</style>

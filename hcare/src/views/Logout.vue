<template> </template>

<script>
export default {
  mounted() {
    if (localStorage.getItem("user")) {
      localStorage.removeItem("user");
      this.$router.go();
      this.$swal({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000,
        icon: "info",
        title: "ออกจากระบบเรียบร้อยแล้ว",
      });
    } else {
      this.$router.push("/");
    }
  }
};
</script>

<style></style>

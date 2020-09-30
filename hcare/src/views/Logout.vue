<template></template>

<script>
export default {
  mounted() {
    if (localStorage.getItem("user")) {
      localStorage.removeItem("user");
      //Clear data in store
      this.$store.state.token = null;
      this.$store.state.role = null;
      this.$store.state.user = {
        first_name: null,
        last_name: null,
      };
      this.$swal({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000,
        icon: "info",
        title: "ออกจากระบบ สำเร็จ!",
      });
      this.$router.push("/");
    } else {
      this.$router.push("/");
    }
  },
};
</script>

<style></style>

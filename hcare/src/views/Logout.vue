<template></template>

<script>
import authentication from "@/utility/authentication";

export default {
  async mounted() {
    if (localStorage.getItem("user")) {
      localStorage.removeItem("user");
      this.$store.state.token = null;
      this.$store.state.role = null;
      this.$store.state.user = {
        first_name: null,
        last_name: null,
      };
    }
    this.$swal({
      toast: true,
      position: "top-end",
      showConfirmButton: false,
      timer: 3000,
      icon: "info",
      title: "ออกจากระบบ สำเร็จ!",
    });
    this.$router.push("/");
  },
};
</script>

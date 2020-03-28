<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <p>
      For a guide and recipes on how to configure / customize this project,<br>
      check out the
      <a href="https://cli.vuejs.org" target="_blank" rel="noopener">vue-cli documentation</a>.
    </p>
    <h3>Pages</h3>
    <ul>
      <li><a href="/booking" target="_blank">Booking</a></li>
      <li><a href="/register" target="_blank">Register</a></li>
      <li><a href="/login" target="_blank">Login</a></li>
    </ul>
    <h3>Admin Pages</h3>
    <ul>
      <li><a href="/admin/dashboard" target="_blank">Dashboard</a></li>
    </ul>
    <h3>Essential Links</h3>
    
    <button @click="onClick">
        Submit
    </button>


  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  methods: {
    onClick() {
     alert("Passss !!")
    }
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #99a3ff;
  font-size: 25px;
}
</style>

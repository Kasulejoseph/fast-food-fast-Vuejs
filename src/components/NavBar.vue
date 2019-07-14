<template>
  <nav class="navbar navbar-expand-lg mb-3 navbar-dark bg-dark">
    <a class="navbar-brand" href="/">FAST FOODS</a>
    <button
      class="navbar-toggler"
      type="button"
      data-toggle="collapse"
      data-target="#navbarNavAltMarkup"
      aria-controls="navbarNavAltMarkup"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
      <div class="navbar-nav">
        <a class="nav-item nav-link active">
          <router-link to="/">Home</router-link>
          <span class="sr-only">(current)</span>
        </a>
        <a class="nav-item nav-link">
          <router-link to="/about">About</router-link>
        </a>
        <a class="nav-item nav-link">
          <router-link to="/menu">Menu</router-link>
        </a>
        <a class="nav-item nav-link disabled">
          <router-link to="/anything">Disabled</router-link>
        </a>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: "navbar",
  props: {
    msg: String
  }
};
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
  color: #42b983;
}
</style>

<template>
  <div id="app">
    <div id="nav">
      <NavView />
    </div>
    <router-view />
  </div>
</template>

<script>
import NavView from "./views/NavView.vue";

export default {
  name: "navbar",
  components: {
    NavView
  }
};
</script>

<style>
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-left: 5%;
  margin-right: 5%;
}
</style>

<template>
  <div class="home">
    <Home msg="Welcome to fast food fast" />
  </div>
</template>

<script>
// @ is an alias to /src
import Home from "@/components/Home.vue";

export default {
  name: "home",
  components: {
    Home
  }
};
</script>

<style>
.home {
  font-family: "Comfortaa-Bold", "Avenir", Helvetica, Arial, sans-serif;
  background-image: url("../assets/Uganda-Chicken.jpg");
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  background-attachment: fixed;
  min-height: 90vh;
  width: 100%;
  height: 100%;
  min-width: 100%;
  position: relative;
  opacity: 0.8;
}
.home {
  color: #fff;
}
</style>

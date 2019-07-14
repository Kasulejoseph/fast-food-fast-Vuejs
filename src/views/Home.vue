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

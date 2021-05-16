<template>
  <div id="app">
    <Nav />
    <div class="container mx-auto p-5 md:p-10 ">
      <router-view />
    </div>
  </div>
</template>

<script>
import Nav from "@/components/Nav";
export default {
  name: "App",
  components: {
    Nav,
  },
};
</script>

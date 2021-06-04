<template>
  <div class="">
    <nav class="w-full h-16">
      <div
        class="container mx-auto h-full p-2 md:px-10 justify-around flex flex-row items-center"
      >
        <router-link to="/">Home</router-link>
        <router-link to="/profile">Profile</router-link>
        <router-link to="/about">About</router-link>
        <div class="flex" v-if="this.user">
          <button
            @click.prevent="logout"
            class="bg-red-500 hover:bg-red-400 btn"
          >
            Logout
          </button>
        </div>
        <div class="flex flex-row space-x-2" v-else>
          <router-link to="/login" class="bg-green-500 hover:green-blue-400 btn"
            >Login</router-link
          >
          <router-link
            to="/register"
            class="bg-blue-500 hover:bg-blue-400 btn"
            >Register</router-link
          >
        </div>
      </div>
    </nav>
  </div>
</template>

<script>
export default {
  props: ["user"],
  methods: {
    logout: function () {
      this.$store.dispatch("logout");
      if (this.$route.name !== "Home") {
        this.$router.push("/");
      } else {
        this.$router.go();
      }
    },
  },
};
</script>

<style>
</style>
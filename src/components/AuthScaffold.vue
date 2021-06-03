<template>
  <div class="max-w-md w-full shadow-lg rounded-sm p-5 flex flex-col space-y-5">
    <div class="text-center font-bold text-2xl">
      <slot></slot>
    </div>
    <div
      v-if="error"
      class="text-center text-sm bg-red-400 py-1 px-2 rounded-md shadow-md"
    >
      <!-- if there is a error show it here  -->
      !! {{ error }}
    </div>
    <div class="flex flex-col">
      <label for="email">Email</label>
      <input required v-model="email" type="email" name="email" id="email" />
      <label for="password">Password</label>
      <input
        required
        v-model="password"
        type="password"
        name="password"
        id="password"
      />
    </div>
    <!-- Buttons -->
    <div class="contents" v-if="this.login">
      <button
        class="bg-green-500 hover:bg-green-400 btn my-2"
        :disabled="this.loading"
        @click.prevent="loginUser"
        v-text="this.loading ? 'Loading...' : 'Login'"
      ></button>
    </div>
    <div class="contents" v-else>
      <div class="flex flex-col">
        <label for="confirmPassword">Confirm Password</label>
        <input
          required
          v-model="confirmPassword"
          type="password"
          name="confirmPassword"
          id="confirmPassword"
        />
        <p v-if="!passwordEqual" class="text-red-500 text-sm"> !! Password does not match</p>
        <button
          type="submit"
          class="bg-blue-400 hover:bg-blue-300 btn my-2"
          @click.prevent="registerUser"
          :disabled="this.loading"
          v-text="this.loading ? 'Loading...' : 'Register'"
        ></button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "AuthScaffold",
  props: ["login", "loading", "error"],
  data: function () {
    return {
      email: "",
      password: "",
      confirmPassword: "",
    };
  },
  computed: {
    passwordEqual: function () {
      return this.password != null && this.password === this.confirmPassword;
    },
  },
  methods: {
    loginUser: function () {
      let user = { email: this.email, password: this.password };
      this.$emit("loginUser", user);
    },
    registerUser: function () {
      if (this.passwordEqual) {
        let newUser = { email: this.email, password: this.password };
        this.$emit("registerUser", newUser);
      }
    },
  },
};
</script>

<style>
</style>
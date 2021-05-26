<template>
  <div class="container mx-auto shadow-lg p-5 rounded-lg bg-blue-100">
    <!-- Login Page TODO -->
    <div v-cloak v-if="!user">
      <h2>Login</h2>
      <vue-form-generator :model="model" :schema="loginSchema">
      </vue-form-generator>
      <button
        type="submit"
        @click.prevent="login"
        class="px-5 py-2 rounded-lg bg-green-400 shadow-lg hover:bg-green-300 max-w-20 w-full"
      >
        Login
      </button>
      <div>
        <vue-form-generator
          :model="model"
          :schema="registerSchema"
        ></vue-form-generator>
        <button
          type="submit"
          @click.prevent="register"
          class="px-5 py-2 rounded-lg bg-blue-400 shadow-lg hover:bg-blue-300 max-w-20 w-full"
        >
          Register
        </button>
      </div>
    </div>
    <div id="logout" v-else>
      <button
        class="rounded-lg px-10 py-2 bg-red-500 hover:bg-red-400"
        @click.prevent="logout"
      >
        Logout
      </button>
    </div>
  </div>
</template>

<script>
import VueFormGenerator from "vue-form-generator";
export default {
  name: "Login",
  props: ["user"],
  components: {
    "vue-form-generator": VueFormGenerator.component,
  },
  computed: {
    passwordEqual: function () {
      return this.model.password === this.model.passwordConfirm;
    },
  },
  data: function () {
    return {
      error: "",
      model: {
        email: "",
        password: "",
        passwordConfirm: "",
      },
      loginSchema: {
        fields: [
          {
            type: "input",
            inputType: "email",
            label: "Email",
            model: "email",
            required: true,
            validator: VueFormGenerator.validators.string,
          },
          {
            type: "input",
            inputType: "password",
            label: "Password",
            model: "password",
            min: 6,
            hint: "Min 6 Characters",
            required: true,
            validator: VueFormGenerator.validators.string,
          },
        ],
      },
      registerSchema: {
        fields: [
          {
            type: "input",
            inputType: "email",
            label: "Register Email",
            model: "Email",
            required: true,
            validator: VueFormGenerator.validators.string,
          },
          {
            type: "input",
            inputType: "password",
            label: "Register Password",
            model: "password",
            min: 6,
            hint: "Min 6 Characters",
            required: true,
            validator: VueFormGenerator.validators.string,
          },
          {
            type: "input",
            inputType: "password",
            label: "Confirm Password",
            model: "passwordConfirm",
            min: 6,
            required: true,
            validator: VueFormGenerator.validators.string,
          },
        ],
      },
    };
  },
  methods: {
    login: function () {
      console.log(this.model.email + " " + this.model.password);
      this.$store
        .dispatch("loginWithEmail", {
          email: this.model.email,
          password: this.model.password,
        });
    },
    register: function () {
      console.log(this.model.email + " " + this.model.password);
      if (this.passwordEqual) {
        this.$store.dispatch("registerWithEmail", {
          email: this.model.email,
          password: this.model.email,
        });
      }
    },
    logout: function () {
      console.log("Logout");
      this.$store.dispatch("logout");
      this.$router.go()
    },
  },
};
</script>


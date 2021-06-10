<template>
  <div class="my-5 flex justify-center">
    <auth-scaffold @registerUser="register" :error="error" :loading="isLoading">
        <h2>Register</h2>
    </auth-scaffold>
  </div>
</template>

<script>
import AuthScaffold from "../components/AuthScaffold";
export default {
  name: "Register",
  components:{
      AuthScaffold
  },
  data:function(){
      return {
          error:null,
          loading:false
      }
  },
  computed:{
        isLoading:function(){
            return this.loading;
        }
    },
  methods:{
      register: async function(newUser){
        this.loading=true;
        let result = await this.$store.dispatch("registerWithEmail",newUser);
        this.loading = false;
        if (result.success==true){
            this.$emit("register")
            this.$router.replace("/");
        }else{
            this.error = result.error;
        }
      }
  }
};
</script>

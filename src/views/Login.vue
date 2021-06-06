<template>
    <div class="my-5 flex justify-center">
        <auth-scaffold login="true" @loginUser="login" :error="error" :loading="isLoading">
            <h2>Login</h2>
        </auth-scaffold>
    </div>
</template>

<script>
import AuthScaffold from '../components/AuthScaffold'
export default {
    name:"Login",
    data:function(){
        return {
            error:null,
            loading:false,
        }
    },
    computed:{
        isLoading:function(){
            return this.loading;
        }
    },
    components:{
        "auth-scaffold":AuthScaffold
    },
    methods:{
        login: async function(user){
            //user should be informat {email:string, password:string}
            this.loading = true;
            let result =  await this.$store.dispatch("loginWithEmail",user); 
            this.loading = false;
            if(result.success == true){
                this.$emit('login');
                this.$router.replace("/");
            }else{
                this.error = result.error
            }
        }
    }
}
</script>
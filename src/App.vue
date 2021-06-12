<template>
  <div id="app">
    <Nav :user="authedUser" />
    <div class="container mx-auto w-full">
      <router-view :user="authedUser" @login="login" @register="register"/>
    </div>
  </div>
</template>

<script>
import Nav from "./components/Nav";
import store from './store/index'
import {mapGetters} from 'vuex'
export default {
  name: "App",
  store:store,
  components: {
    Nav,
  },
  mounted(){
    if (this.authedUser || this.isLoading){
      this.$store.dispatch("bindProfileModule",this.authedUser); 
    }
  },
  computed:{
    isLoading(){
      return this.authedUser!==null&&this.subprofiles===null
    },
    ...mapGetters({
      authedUser: 'user',
      subprofiles: "subprofiles",
  })
  },
  data: function () {
    return {
    };
  },
  methods:{
     login(){
        //bind to the profile after loggin in 
        this.$store.dispatch('bindProfileModule',this.authedUser)
      },
      register(){
        console.log("Register")
        // this.$store.dispatch('bindProfileModule',this.authedUser)
      },
      logout:function(){
        // this.$store.dispatch("unbindUserProfileAndSubprofiles");
      }
  }
};
</script>

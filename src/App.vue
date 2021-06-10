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
  computed:{
    ...mapGetters({
      authedUser: 'user',
  })
  },
  data: function () {
    return {
    };
  },
  methods:{
     login:function(){
        //login user awit success 
        
        //set other profile and subprofile bindings with firestoer
        this.$store.dispatch('bindProfileModule',this.authedUser)
      },
      register:function(){
        this.$store.dispatch('bindProfileModule',this.authedUser)
      },
      logout:function(){
        this.$store.dispatch("unbindUserProfileAndSubprofiles");
      }
  }
};
</script>

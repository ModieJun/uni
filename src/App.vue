<template>
  <div id="app">
    <Nav :user="authedUser" />
    <div class="container mx-auto w-full">
      <router-view :user="authedUser"/>
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
  mounted() {
    //no need to listen to state changes async - use vuex to store the returned user object - reduce the need for extra calls
    // Firebase.auth().onAuthStateChanged((user) => {
    //   if (user) {
    //     this.user = user;
    //     //Read all the meetings information for this user
    //     // set the state to be the user. 
    //   }
    // });
  },
  data: function () {
    return {
    };
  },
};
</script>

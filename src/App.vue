<template>
  <div id="app">
    <Nav :user="user" />
    <div class="container mx-auto w-full">
      <router-view :user="user"/>
    </div>
  </div>
</template>

<script>
import Nav from "./components/Nav";
import {Firebase} from './firebase_conf'
import store from './store/index'
export default {
  name: "App",
  store:store,
  components: {
    Nav,
  },
  mounted() {
    Firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.user = user;
        //Read all the meetings information for this user
        // set the state to be the user. 
      }
    });
  },
  data: function () {
    return {
      user: null,
    };
  },
};
</script>

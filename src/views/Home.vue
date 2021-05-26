<template>
  <div>
      <h2>Home</h2>
      <div class="py-5" v-cloak v-if="user">
        User: {{this.user.uid}} , {{this.user.email}}
      </div>
        <Login :user="user" />
  </div>
</template>

<script>
import Login from '../components/Login'
export default {
  name: 'Home',
  props:['user'],
  components:{
    Login
  }
}
</script>

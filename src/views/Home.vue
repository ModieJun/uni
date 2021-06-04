<template>
  <div>
      <h2>Home</h2>
      <div class="py-5" v-cloak v-if="user">
        User: {{this.user.uid}} , {{this.user.email}}
      </div>
  </div>
</template>

<script>
export default {
  name: 'Home',
  props:['user'],
}
</script>

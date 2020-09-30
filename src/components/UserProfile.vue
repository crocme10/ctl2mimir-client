<template>
  <div class='mt-8 mx-auto md:w-1/2 lg:w-1/3 xl:w-1/4'>
    <h3 class='font-header font-bold text-xl text-center'> {{user.username}} </h3>
    <p class='mt-8'>
      <strong>Email:</strong>
      {{user.email}}
    </p>
    <strong>Authorities:</strong>
    <ul>
      <li v-for="(role,index) in user.roles" :key="index">{{role}}</li>
    </ul>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Profile',
  computed: {
    ...mapGetters({
      user: 'auth/user'
    })
  },
  mounted () {
    if (!this.user) {
      this.$router.push('/login')
    }
  }
}
</script>

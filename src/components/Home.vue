<template>
  <p class="font-text text-xl text-center mt-16">{{content}}</p>
</template>

<script>
import UserService from '@/services/user.service'

export default {
  name: 'Home',
  data () {
    return {
      content: ''
    }
  },
  mounted () {
    UserService.getPublicContent().then(
      response => {
        console.log('response: ' + response)
        this.content = response.data.data.contentForAll.content
      },
      error => {
        this.content =
          (error.response && error.response.data) ||
          error.message ||
          error.toString()
      }
    )
  }
}
</script>

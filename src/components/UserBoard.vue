<template>
  <p class="font-text text-xl text-center mt-16">{{content}}</p>
</template>

<script>
import UserService from '@/services/user.service'

export default {
  name: 'UserBoard',
  data () {
    return {
      content: ''
    }
  },
  mounted () {
    UserService.getUserContent().then(
      response => {
        console.log('response: ' + response)
        this.content = response.data.data.contentForUser.content
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

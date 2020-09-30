<template>
  <div class='mt-8 mx-auto md:w-1/2 lg:w-1/3 xl:w-1/4'>
    <p class='font-header text-xl text-center'>Signin</p>
    <ValidationObserver v-slot='{ handleSubmit }' class='px-8 pt-6 pb-8 mb-4 font-header' ref='form'>
      <form v-on:submit.prevent='handleSubmit(handleLogin)'>
        <ValidationProvider rules='required' v-slot='{ errors }'>
          <div class='mb-6'>
            <label class='block text-gray-700 text-sm font-bold mb-2' for='username'>
              Username
            </label>
            <input v-model='username' name='username' class='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 font-code leading-tight focus:outline-none focus:shadow-outline' id='username' type='text' placeholder='Username' />
            <span class='text-red-500 text-xs italic'>{{ errors[0] }}</span>
          </div>
        </ValidationProvider>
        <ValidationProvider rules='required' v-slot='{ errors }'>
          <div class='mb-6'>
            <label class='block text-gray-700 text-sm font-bold mb-2' for='email'>
              Password
            </label>
            <input v-model='password' name='password' class='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 font-code leading-tight focus:outline-none focus:shadow-outline' id='email' type='password' placeholder='Password' />
            <span class='text-red-500 text-xs italic'>{{ errors[0] }}</span>
          </div>
        </ValidationProvider>
        <input class='w-3/4 bg-gray-500 hover:bg-gray-600 text-white font-bold w-full py-3 mt-4 cursor-pointer' type='submit' value='Signup' />
      </form>
    </ValidationObserver>
    <div v-if="message" class="alert" :class="successful ? 'alert-success' : 'alert-danger'">{{message}}</div>
  </div>
</template>

<script>
import { ValidationProvider, ValidationObserver, extend } from 'vee-validate'
import { required } from 'vee-validate/dist/rules'
import { mapGetters } from 'vuex'
import AuthService from '@/services/auth.service'

export default {
  name: 'UserLogin',
  data () {
    return {
      loading: false, // indicate if the registration has been submitted.
      username: '',
      password: '',
      message: ''
    }
  },
  components: {
    ValidationObserver,
    ValidationProvider
  },
  computed: {
    ...mapGetters({
      loggedIn: 'auth/loggedIn'
    })
  },
  mounted () {
    if (this.loggedIn) {
      this.$router.push('/profile')
    } else {
      AuthService.logout()
    }
  },
  methods: {
    async handleLogin () {
      this.loading = true
      const success = await this.$refs.form.validate()
      if (!success) {
        this.loading = false
        return
      }
      const payload = { username: this.username, password: this.password }
      this.$store.dispatch('auth/login', payload).then(
        () => {
          this.$router.push('/profile')
        },
        error => {
          this.loading = false
          this.message = (error.response && error.response.data) ||
          error.message ||
          error.toString()
        }
      )
    }
  },
  async created () {
    extend('required', required)
  }
}
</script>

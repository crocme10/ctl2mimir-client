<template>
  <div class='mt-8 mx-auto md:w-1/2 lg:w-1/3 xl:w-1/4'>
    <p class='font-header text-xl text-center'>Signup</p>
    <ValidationObserver v-slot='{ handleSubmit }' class='px-8 pt-6 pb-8 mb-4 font-header' ref='form'>
      <form v-on:submit.prevent='handleSubmit(handleRegister)'>
        <div v-if='!successful'>
          <ValidationProvider rules='required' v-slot='{ errors }'>
            <div class='mb-6'>
              <label class='block text-gray-700 text-sm font-bold mb-2' for='username'>
                Username
              </label>
              <input v-model='username' name='username' class='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 font-code leading-tight focus:outline-none focus:shadow-outline' id='username' type='text' placeholder='Username' />
              <span class='text-red-500 text-xs italic'>{{ errors[0] }}</span>
            </div>
          </ValidationProvider>
          <ValidationProvider rules='required|email' v-slot='{ errors }'>
            <div class='mb-6'>
              <label class='block text-gray-700 text-sm font-bold mb-2' for='email'>
                Email
              </label>
              <input v-model='email' name='email' class='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 font-code leading-tight focus:outline-none focus:shadow-outline' id='email' type='text' placeholder='Email' />
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
          <input class='bg-gray-500 hover:bg-gray-600 text-white font-bold w-full py-3 mt-4 cursor-pointer' type='submit' value='Signup' />
        </div> <!-- !successful -->
      </form>
    </ValidationObserver>
    <div v-if="message" class="alert" :class="successful ? 'alert-success' : 'alert-danger'">{{message}}</div>
  </div>
</template>

<script>
import { ValidationProvider, ValidationObserver, extend } from 'vee-validate'
import { required, email } from 'vee-validate/dist/rules'

export default {
  name: 'UserRegister',
  data () {
    return {
      submitted: false, // indicate if the registration has been submitted.
      successful: false, // indicate if form validation is successfull
      username: '',
      email: '',
      password: '',
      message: ''
    }
  },
  components: {
    ValidationObserver,
    ValidationProvider
  },
  computed: {
    loggedIn () {
      return this.$store.state.auth.status.loggedIn
    }
  },
  mounted () {
    if (this.loggedIn) {
      this.$router.push('/profile')
    }
  },
  methods: {
    async handleRegister () {
      this.submitted = true
      const success = await this.$refs.form.validate()
      if (!success) {
        return
      }
      const payload = { username: this.username, email: this.email, password: this.password }
      this.$store.dispatch('auth/register', payload).then(
        data => {
          this.message = 'User Registered Successfully!'
          this.successful = true
        },
        error => {
          this.message = (error.response && error.response.data) ||
          error.message || error.toString()
          this.successful = false
        }
      )
    }
  },
  async created () {
    extend('required', required)
    extend('email', email)
  }
}
</script>

<style>
  .alert-success {
    @apply relative px-3 py-3 mb-4 border rounded text-gray-800 border-gray-800 bg-green-300 text-center;
  }
  .alert-danger {
    @apply relative px-3 py-3 mb-4 border rounded text-gray-800 border-gray-800 bg-red-300 text-center;
  }
</style>

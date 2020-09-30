<template>
  <div class='mt-8 w-full'>
    <ValidationObserver v-slot='{ handleSubmit }' class='px-8 pt-6 pb-8 mb-4 font-header' ref='form'>
      <form v-on:submit.prevent='handleSubmit(onSubmit)'>
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
        <input class='w-3/4 bg-gray-500 hover:bg-gray-600 text-white font-bold w-full py-3 mt-4' type='submit' value='Submit' />
      </form>
    </ValidationObserver>
  </div>
</template>

<script>
import { ValidationProvider, ValidationObserver, extend } from 'vee-validate'
import { required, email } from 'vee-validate/dist/rules'
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'Users',
  data () {
    return {
      loaded: false,
      username: '',
      email: ''
    }
  },
  components: {
    ValidationObserver,
    ValidationProvider
  },
  computed: {
    ...mapGetters({
      users: 'users/users'
    })
  },
  methods: {
    ...mapActions({
      loadUsers: 'users/loadUsers',
      addUser: 'users/addUser'
    }),
    async onSubmit () {
      const success = await this.$refs.form.validate()
      if (!success) {
        return
      }
      const payload = { username: this.username, email: this.email }
      this.addUser(payload)
      // this.$nextTick(() => {
      //   this.$refs.form.reset()
      // })
    }
  },
  async created () {
    extend('required', required)
    extend('email', email)
    await this.loadUsers()
    this.loaded = true
  }
}
</script>

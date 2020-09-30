<template>
  <div v-if="loaded">
    <ul class="m-6">
      <li v-for="user in users" :key="user.id" class="font-text">
        {{ user.id }} - {{ user.username }}
      </li>
    </ul>
  </div>
  <div v-else>
    <p>Loading</p>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'Users',
  data () {
    return {
      loaded: false
    }
  },
  computed: {
    ...mapGetters({
      users: 'users/users'
    })
  },
  methods: {
    ...mapActions({
      loadUsers: 'users/loadUsers'
    })
  },
  async created () {
    await this.loadUsers()
    this.loaded = true
  }
}
</script>

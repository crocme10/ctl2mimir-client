<template>
  <div v-if="loaded">
    <ul class="m-6">
      <li v-for="index in indexes" :key="index.id" class="font-text">
        {{ index.region }} - {{ index.status }}
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
  name: 'Indexes',
  data () {
    return {
      loaded: false
    }
  },
  computed: {
    ...mapGetters({
      indexes: 'indexes/indexes'
    })
  },
  methods: {
    ...mapActions({
      loadIndexes: 'indexes/loadIndexes'
    })
  },
  async created () {
    await this.loadIndexes()
    this.loaded = true
  }
}
</script>

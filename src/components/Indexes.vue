<template>
  <div v-if="loaded">
    <h3 class="text-center mt-8">Indexes</h3>
    <table class="w-10/12 mx-auto mt-8 table-fixed border-collapse border-2 border-gray-500">
      <thead>
        <tr>
          <th class="w-1/4 px-4 py-2 border border-gray-400">Index Type</th>
          <th class="w-1/4 px-4 py-2 border border-gray-400">Data Source</th>
          <th class="w-1/4 px-4 py-2 border border-gray-400">Region</th>
          <th class="w-1/4 px-4 py-2 border border-gray-400">Status</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="index in indexes" :key="index.id" class="font-text">
          <td class="border px-4 py-2 border border-gray-400 text-center">{{ index.indexType }}</td>
          <td class="border px-4 py-2 border border-gray-400 text-center">{{ index.dataSource }}</td>
          <td class="border px-4 py-2 border border-gray-400 text-center">{{ index.region }}</td>
          <td class="border px-4 py-2 border border-gray-400 text-center">{{ index.status.type }}</td>
        </tr>
      </tbody>
    </table>
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

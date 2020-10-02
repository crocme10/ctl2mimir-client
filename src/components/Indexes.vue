<template>
  <div v-if="loaded">
    <h3 class="text-center mt-8 font-header">Indexes</h3>
    <table class="w-10/12 mx-auto mt-8 table-fixed border-collapse border-2 border-gray-500">
      <thead class="font-header">
        <tr class="bg-gray-300">
          <th class="w-2/12 px-4 py-2 border border-gray-400">Index Type</th>
          <th class="w-3/12 px-4 py-2 border border-gray-400">Data Source</th>
          <th class="w-3/12 px-4 py-2 border border-gray-400">Region</th>
          <th class="w-3/12 px-4 py-2 border border-gray-400">Status</th>
          <th class="w-1/12 px-4 py-2 border border-gray-400">
          </th>
        </tr>
      </thead>
      <tbody class="font-text">
        <tr v-for="index in indexes" :key="index.id" class="font-text">
          <td class="border px-4 py-2 border border-gray-400 text-center">{{ index.indexType }}</td>
          <td class="border px-4 py-2 border border-gray-400 text-center">{{ index.dataSource }}</td>
          <td class="border px-4 py-2 border border-gray-400 text-center">{{ index.region }}</td>
          <td class="border px-4 py-2 border border-gray-400 text-center">{{ index.status.type }}</td>
          <td class="border px-4 py-2 border border-gray-400 text-center">
            <button>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="h-6 w-6">
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM7 9a1 1 0 000 2h6a1 1 0 100-2H7z" clip-rule="evenodd" />
              </svg>
            </button>
          </td>
        </tr>
        <tr class="font-text bg-gray-300">
          <td class="border px-4 py-2 border border-gray-400 text-center"></td>
          <td class="border px-4 py-2 border border-gray-400 text-center"></td>
          <td class="border px-4 py-2 border border-gray-400 text-center"></td>
          <td class="border px-4 py-2 border border-gray-400 text-center"></td>
          <td class="border px-4 py-2 border border-gray-400 text-center">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="h-6 w-6">
              <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z"
                clip-rule="evenodd" />
            </svg>
          </td>
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

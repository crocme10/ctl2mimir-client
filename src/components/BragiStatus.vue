<template>
  <div v-if="loaded">
    <div class="mt-12 flex justify-center align-center">
      <button class="bg-transparent hover:bg-gray-500 text-gray-700 font-semibold hover:text-white py-2 px-4 border border-gray-500 hover:border-transparent rounded" @click.prevent="loadBragiStatus">Bragi Status</button>
    </div>
    <table class="w-10/12 mx-auto mt-8 table-fixed border-collapse border-2 border-gray-500">
      <thead class="font-header">
        <tr class="bg-gray-300">
          <th class="w-2/12 px-4 py-2 border border-gray-400"></th>
          <th class="w-3/12 px-4 py-2 border border-gray-400">URL</th>
          <th class="w-3/12 px-4 py-2 border border-gray-400">Version</th>
          <th class="w-3/12 px-4 py-2 border border-gray-400">Status</th>
        </tr>
      </thead>
      <tbody class="font-text">
        <tr class="font-text">
          <td class="border px-4 py-2 border border-gray-400 bg-gray-300 text-center">Bragi</td>
          <td class="border px-4 py-2 border border-gray-400 text-center">{{ bragi.url }}</td>
          <td class="border px-4 py-2 border border-gray-400 text-center">{{ bragi.version }}</td>
          <td class="border px-4 py-2 border border-gray-400 text-center">{{ bragi.status }}</td>
        </tr>
        <tr class="font-text">
          <td class="border px-4 py-2 border border-gray-400 bg-gray-300 text-center">Elastic</td>
          <td class="border px-4 py-2 border border-gray-400 text-center">{{ bragi.elastic.url }}</td>
          <td class="border px-4 py-2 border border-gray-400 text-center">{{ bragi.elastic.version }}</td>
          <td class="border px-4 py-2 border border-gray-400 text-center">{{ bragi.elastic.status }}</td>
        </tr>
      </tbody>
    </table>
    <table class="w-10/12 mx-auto mt-8 table-fixed border-collapse border-2 border-gray-500">
      <thead class="font-header">
        <tr class="bg-gray-300">
          <th class="w-2/12 px-4 py-2 border border-gray-400">Place Type</th>
          <th class="w-3/12 px-4 py-2 border border-gray-400">Label</th>
          <th class="w-3/12 px-4 py-2 border border-gray-400">Count</th>
          <th class="w-3/12 px-4 py-2 border border-gray-400">Updated At</th>
        </tr>
      </thead>
      <tbody class="font-text">
        <tr v-for="index in bragi.elastic.indices" :key="index.label" class="font-text">
          <td class="border px-4 py-2 border border-gray-400 text-center">{{ index.placeType }}</td>
          <td class="border px-4 py-2 border border-gray-400 text-center">{{ index.label.slice(0, getPosition(index.label, '_', 3)) }}</td>
          <td class="border px-4 py-2 border border-gray-400 text-center">{{ index.count }}</td>
          <td class="border px-4 py-2 border border-gray-400 text-center">{{ moment(index.updatedAt).fromNow() }}</td>
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
  name: 'BragiStatus',
  data () {
    return {
      loaded: false
    }
  },
  computed: {
    ...mapGetters({
      bragi: 'bragi/bragi'
    })
  },
  methods: {
    ...mapActions({
      loadBragiStatus: 'bragi/loadBragiStatus'
    }),
    getPosition (string, subString, index) {
      return string.split(subString, index).join(subString).length
    }
  },
  async created () {
    await this.loadBragiStatus()
    this.loaded = true
  }
}
</script>

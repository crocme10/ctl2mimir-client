<template>
  <div>
    <h3 class="text-center mt-8 font-header">Autocomplete</h3>
    <div class="mt-8 flex align-center justify-center">
      <div class="relative w-1/2">
        <input v-model="query" type="search" @input="handleAutocomplete" class="bg-purple-white shadow rounded border-0 p-3 w-full" placeholder="Search places..." />
        <div class="absolute right-0 top-0 mt-4 mr-4 text-purple-lighter">
          <svg version="1.1" class="h-4 text-dark" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
            viewBox="0 0 52.966 52.966" style="enable-background:new 0 0 52.966 52.966;" xml:space="preserve">
            <path d="M51.704,51.273L36.845,35.82c3.79-3.801,6.138-9.041,6.138-14.82c0-11.58-9.42-21-21-21s-21,9.42-21,21s9.42,21,21,21
            c5.083,0,9.748-1.817,13.384-4.832l14.895,15.491c0.196,0.205,0.458,0.307,0.721,0.307c0.25,0,0.499-0.093,0.693-0.279
            C52.074,52.304,52.086,51.671,51.704,51.273z M21.983,40c-10.477,0-19-8.523-19-19s8.523-19,19-19s19,8.523,19,19
            S32.459,40,21.983,40z"/>
          </svg>
        </div>
      </div>
    </div>
    <div class="mt-8 flex align-center justify-center">
      <table class="w-10/12 mx-auto mt-8 table-fixed border-collapse border-2 border-gray-500">
        <thead class="font-header">
          <tr class="bg-gray-300">
            <th class="w-2/12 px-4 py-2 border border-gray-400">Label</th>
            <th class="w-3/12 px-4 py-2 border border-gray-400">Type</th>
          </tr>
        </thead>
        <tbody class="font-text">
          <tr v-for="feature in autocomplete.features" :key="feature.properties.geocoding.id" class="font-text">
            <td class="border px-4 py-2 border border-gray-400 text-center">{{ feature.properties.geocoding.label }}</td>
            <td class="border px-4 py-2 border border-gray-400 text-center">{{ feature.properties.geocoding.type }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'BragiAutocomplete',
  data () {
    return {
      successful: true,
      query: ''
    }
  },
  computed: {
    ...mapGetters({
      autocomplete: 'bragi/autocomplete'
    })
  },
  methods: {
    async handleAutocomplete () {
      const payload = { query: this.query }
      console.log(payload)
      this.$store.dispatch('bragi/search', payload).then(
        data => {
          this.successful = true
        },
        error => {
          console.log('error: ' + error)
          this.successful = false
        }
      )
    }
  }
}
</script>

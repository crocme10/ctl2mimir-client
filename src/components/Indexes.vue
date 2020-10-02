<template>
  <div v-if="loaded">
    <h3 class="text-center mt-8 font-header">Indexes</h3>
    <ValidationObserver v-slot='{ handleSubmit }' ref='form'>
      <form v-on:submit.prevent='handleSubmit(handleNewIndex)'>
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
              <td class="border px-4 py-2 border border-gray-400 flex justify-center items-center">
                <button>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="h-6 w-6">
                    <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM7 9a1 1 0 000 2h6a1 1 0 100-2H7z" clip-rule="evenodd" />
                  </svg>
                </button>
              </td>
            </tr>
            <tr v-if='editing' class="font-text bg-gray-300">
              <td class="border px-4 py-2 border border-gray-400 text-center">
                <ValidationProvider rules='required' v-slot='{errors}'>
                  <select v-model="indexType" name='indexType' id='indexType'>
                    <option v-for="option in indexTypeOptions" :value="option.value" :key="option.value">
                        {{ option.value }}
                    </option>
                  </select>
                  <span class='text-red-500 text-xs italic'>{{ errors[0] }}</span>
                </ValidationProvider>
              </td>
              <td class="border px-4 py-2 border border-gray-400 text-center">
                <ValidationProvider rules='required' v-slot='{errors}'>
                  <select v-model="dataSource" name='dataSource' id='dataSource'>
                    <option v-for="option in dataSourceOptions" :value="option.value" :key="option.value">
                        {{ option.value }}
                    </option>
                  </select>
                  <span class='text-red-500 text-xs italic'>{{ errors[0] }}</span>
                </ValidationProvider>
              </td>
              <td class="border px-4 py-2 border border-gray-400 text-center">
                <ValidationProvider rules='required' v-slot='{errors}'>
                  <input v-model='region' name='region' id='region' type='text' placeholder='region' size='10'/>
                  <span class='text-red-500 text-xs italic'>{{ errors[0] }}</span>
                </ValidationProvider>
              </td>
              <td class="border px-4 py-2 border border-gray-400 text-center"></td>
              <td class="border px-4 py-2 border border-gray-400 flex justify-center items-center">
                <button>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class='h-6 w-6'>
                    <path fill-rule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM6.293 6.707a1 1 0 010-1.414l3-3a1 1 0 011.414 0l3 3a1 1 0 01-1.414 1.414L11 5.414V13a1 1 0 11-2 0V5.414L7.707 6.707a1 1 0 01-1.414 0z" clip-rule="evenodd" />
                  </svg>
                </button>
              </td>
            </tr>
            <tr class="font-text bg-gray-300">
              <td class="border px-4 py-2 border border-gray-400 text-center"></td>
              <td class="border px-4 py-2 border border-gray-400 text-center"></td>
              <td class="border px-4 py-2 border border-gray-400 text-center"></td>
              <td class="border px-4 py-2 border border-gray-400 text-center"></td>
              <td class="border px-4 py-2 border border-gray-400 flex justify-center items-center">
                <button @click.prevent='editing = true' class='mx-auto'>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="h-6 w-6">
                    <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z"
                      clip-rule="evenodd" />
                  </svg>
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </form>
    </ValidationObserver>
  </div>
  <div v-else>
    <p>Loading</p>
  </div>
</template>

<script>
import { ValidationProvider, ValidationObserver, extend } from 'vee-validate'
import { required } from 'vee-validate/dist/rules'
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'Indexes',
  data () {
    return {
      loaded: false,
      editing: false,
      submitted: false,
      successful: false,
      indexType: '',
      dataSource: '',
      region: '',
      indexTypeOptions: [
        { value: 'admins' },
        { value: 'streets' },
        { value: 'pois' },
        { value: 'addresses' }
      ],
      dataSourceOptions: [
        { value: 'bano' },
        { value: 'osm' },
        { value: 'cosmogony' },
        { value: 'ntfs' }
      ]
    }
  },
  components: {
    ValidationObserver,
    ValidationProvider
  },
  computed: {
    ...mapGetters({
      indexes: 'indexes/indexes'
    })
  },
  methods: {
    ...mapActions({
      loadIndexes: 'indexes/loadIndexes',
      createIndex: 'indexes/createIndex'
    }),
    async handleNewIndex () {
      this.submitted = true
      const success = await this.$refs.form.validate()
      if (!success) {
        return
      }
      this.editing = false
      const payload = { indexType: this.indexType, dataSource: this.dataSource, region: this.region }
      this.$store.dispatch('indexes/createIndex', payload).then(
        data => {
          this.successful = true
        },
        error => {
          console.log('error: ' + error)
          this.successful = false
        }
      )
    },
    handleEditing () {
      this.editing = true
    }
  },
  async created () {
    extend('required', required)
    await this.loadIndexes()
    this.loaded = true
  }
}
</script>

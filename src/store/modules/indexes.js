import IndexService from '@/services/index.service'

const state = {
  indexes: []
}

const getters = {
  indexes: state => state.indexes,
  user: state => (id) => {
    const i = state.indexes.findIndex(obj => obj.id === id)
    return state.indexes[i]
  }
}

const mutations = {
  updateIndexes: (state, indexes) => { state.indexes = indexes },
  appendIndex: (state, index) => { state.indexes.push(index) },
  updateIndexStatus: (state, { id, status }) => {
    const i = state.indexes.findIndex(obj => obj.indexId === id)
    if (i === -1) {
      console.log('Cannot find index with id ' + id)
    } else {
      state.indexes[i].status = status
    }
  }
}

const actions = {
  loadIndexes: async ({ dispatch, commit }) => {
    return IndexService.getIndexList().then(
      response => {
        if (response.data.errors) {
          const errmsg = response.data.errors[0].message + ': ' + response.data.errors[0].extensions.internal_error
          console.log('Server error listing indexes: ' + errmsg)
          dispatch('notifications/addNotification',
            {
              title: 'Server Error listing indexes',
              message: errmsg,
              theme: 'error',
              timeout: 5000
            },
            { root: true }
          )
          // commit('registerFailure')
          return Promise.reject(response.data.errors[0])
        } else {
          const indexes = response.data.data.indexes.indexes
          // Before storing the index, we have to do a turnwoopy
          // to transmogrify the status, which is a serialized json object,
          // into an actual object
          indexes.map(index => {
            console.log(index.status)
            const status = JSON.parse(index.status)
            index.status = status
            return index
          })
          commit('updateIndexes', indexes)
          return Promise.resolve(indexes)
        }
      },
      error => {
        console.log('Server error listing indexes: ' + error)
        return Promise.reject(error)
      }
    )
  },
  createIndex: async ({ dispatch, commit }, { indexType, dataSource, region }) => {
    // console.log('VUE APP: ' + process.env.VUE_APP_BASE_URL)
    return IndexService.createIndex({ indexType, dataSource, region }).then(
      response => {
        if (response.data.errors) {
          const errmsg = response.data.errors[0].message + ': ' + response.data.errors[0].extensions.internal_error
          console.log('Server error creating index: ' + errmsg)
          dispatch('notifications/addNotification',
            {
              title: 'Server Error creating index',
              message: errmsg,
              theme: 'error',
              timeout: 5000
            },
            { root: true }
          )
          return Promise.reject(response.data.errors[0])
        } else {
          const index = response.data.data.createIndex.index
          commit('appendIndex', index)
          return Promise.resolve(index)
        }
      },
      error => {
        console.log('Server error creating index: ' + error)
        return Promise.reject(error)
      }
    )
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}

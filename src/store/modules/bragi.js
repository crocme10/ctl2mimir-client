import BragiService from '@/services/bragi.service'

const state = {
  bragi: {}
}

const getters = {
  bragi: state => state.bragi
}

const mutations = {
  updateBragi: (state, bragi) => { state.bragi = bragi }
}

const actions = {
  loadBragiStatus: async ({ dispatch, commit }) => {
    return BragiService.getStatus().then(
      response => {
        if (response.data.errors) {
          const errmsg = response.data.errors[0].message + ': ' + response.data.errors[0].extensions.internal_error
          console.log('Server error getting bragi status: ' + errmsg)
          dispatch('notifications/addNotification',
            {
              title: 'Server Error getting bragi status',
              message: errmsg,
              theme: 'error',
              timeout: 5000
            },
            { root: true }
          )
          // commit('registerFailure')
          return Promise.reject(response.data.errors[0])
        } else {
          const info = response.data.data.status.info
          commit('updateBragi', info)
          return Promise.resolve(info)
        }
      },
      error => {
        console.log('Server error getting bragi status: ' + error)
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

import AuthService from '@/services/auth.service'

const user = JSON.parse(localStorage.getItem('user'))

const initialState = user
  ? { status: { loggedIn: true }, user }
  : { status: { loggedIn: false }, user: null }

// const initialState = { status: { loggedIn: false }, user: null }

const getters = {
  user: state => state.user,
  loggedIn: state => state.status.loggedIn
}

const mutations = {
  loginSuccess (state, user) {
    state.status.loggedIn = true
    state.user = user
  },
  loginFailure (state) {
    state.status.loggedIn = false
    state.user = null
  },
  logout (state) {
    state.status.loggedIn = false
    state.user = null
  },
  registerSuccess (state) {
    state.status.loggedIn = false
  },
  registerFailure (state) {
    state.status.loggedIn = false
  }
}

const actions = {
  login ({ commit }, user) {
    return AuthService.login(user).then(
      user => {
        console.log(user)
        commit('loginSuccess', user.user)
        return Promise.resolve(user)
      },
      error => {
        commit('loginFailure')
        return Promise.reject(error)
      }
    )
  },

  logout ({ commit }) {
    AuthService.logout()
    commit('logout')
  },

  register ({ commit, dispatch }, user) {
    return AuthService.register(user).then(
      response => {
        if (response.data.errors) {
          const errmsg = response.data.errors[0].message + ': ' + response.data.errors[0].extensions.internal_error
          console.log('Server error registering user: ' + errmsg)
          dispatch('notifications/addNotification',
            {
              title: 'Server Error registering user',
              message: errmsg,
              theme: 'error',
              timeout: 5000
            },
            { root: true }
          )
          commit('registerFailure')
          return Promise.reject(response.data.errors[0])
        } else {
          commit('registerSuccess')
          return Promise.resolve(response.data)
        }
      },
      error => {
        commit('registerFailure')
        return Promise.reject(error)
      }
    )
  }

}

export default {
  namespaced: true,
  state: initialState,
  getters,
  actions,
  mutations
}

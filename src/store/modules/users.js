import axios from 'axios'
import ApiRoutes from '@/api/apiRoutes'

const state = {
  users: []
}

const getters = {
  users: state => state.users,
  user: state => (id) => {
    const i = state.users.findIndex(obj => obj.id === id)
    return state.users[i]
  }
}

const mutations = {
  updateUsers: (state, users) => { state.users = users },
  addUser: (state, user) => { state.users.push(user) }
}

const actions = {
  loadUsers: async ({ dispatch, commit }) => {
    // console.log('VUE APP: ' + process.env.VUE_APP_BASE_URL)
    const query = `{
      users {
        users {
          id,
          username
        },
        usersCount
      }
    }`

    try {
      await axios({
        method: 'post',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        url: ApiRoutes.GraphQL,
        data: JSON.stringify({
          query: query
        })
      }).then(response => {
        if (response.data.errors) {
          const errmsg = response.data.errors[0].message + ': ' + response.data.errors[0].extensions.internal_error
          // console.log('Server error retrieving users: ' + errmsg)
          dispatch('notifications/addNotification',
            {
              title: 'Server Error retrieving users',
              message: errmsg,
              theme: 'error',
              timeout: 5000
            },
            { root: true }
          )
        }
        const users = response.data.data.users.users
        commit('updateUsers', users)
      })
    } catch (err) {
      // console.log('Client error retrieving users: ' + err)
      dispatch('notifications/addNotification',
        {
          title: 'Server Error retrieving users',
          message: err,
          theme: 'error',
          timeout: 5000
        },
        { root: true }
      )
    }
  },

  addUser: async ({ dispatch, commit }, { username, email }) => {
    const variables = {
      user: {
        username,
        email
      }
    }
    const query = `mutation addUser($user: UserRequestBody!) {
      addUser(user: $user) {
        user {
          id,
          username,
          email,
          active,
          createdAt,
          updatedAt
        }
      }
    }`

    try {
      await axios({
        method: 'post',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        url: ApiRoutes.GraphQL,
        data: JSON.stringify({
          query: query,
          variables: variables
        })
      }).then(response => {
        if (response.data.errors) {
          const errmsg = response.data.errors[0].message + ': ' + response.data.errors[0].extensions.internal_error
          console.log('Server error retrieving users: ' + errmsg)
          dispatch('notifications/addNotification',
            {
              title: 'Server Error adding user',
              message: errmsg,
              theme: 'error',
              timeout: 5000
            },
            { root: true }
          )
        }
        const user = response.data.data.addUser.user
        commit('addUser', user)
      })
    } catch (err) {
      // console.log('Client error retrieving users: ' + err)
      dispatch('notifications/addNotification',
        {
          title: 'Server Error retrieving users',
          message: err,
          theme: 'error',
          timeout: 5000
        },
        { root: true }
      )
    }
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}

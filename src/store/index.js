import Vue from 'vue'
import Vuex from 'vuex'

import Auth from './modules/auth'
import Users from './modules/users'
import Notifications from './modules/notifications'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    auth: Auth,
    notifications: Notifications,
    users: Users
  }
})

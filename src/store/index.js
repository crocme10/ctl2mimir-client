import Vue from 'vue'
import Vuex from 'vuex'

import Indexes from './modules/indexes'
import Notifications from './modules/notifications'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    notifications: Notifications,
    indexes: Indexes
  }
})

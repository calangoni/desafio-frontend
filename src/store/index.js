import Vue from 'vue'
import Vuex from 'vuex'

import candidates from './module-candidates'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    candidates
  }
})

export default store

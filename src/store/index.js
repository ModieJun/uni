import Vue from 'vue'
import Vuex from 'vuex'
import authentication from './authentication'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

const persistedStates = createPersistedState({
  paths:['auth'], //paths should be the same as the key for the module // use key.STATE to only persist certain data 
})

export default new Vuex.Store({
  modules: {
    auth:authentication,
  },
  plugins:[persistedStates]
})

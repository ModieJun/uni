import Vue from 'vue'
import Vuex from 'vuex'
import { createLogger } from 'vuex'
import authentication from './authentication'
import createPersistedState from 'vuex-persistedstate'
import profileStore from './profileStore'

Vue.use(Vuex)

const persistedStates = createPersistedState({
  paths: ['auth'], //paths should be the same as the key for the module // use key.STATE to only persist certain data 
})

export default new Vuex.Store({
  strict: process.env.NODE_ENV !== 'production',
  modules: {
    auth: authentication,
    profile: profileStore
  },
  plugins: process.env.NODE_ENV !== 'production'
    ? [persistedStates, createLogger()]
    : [persistedStates]
})

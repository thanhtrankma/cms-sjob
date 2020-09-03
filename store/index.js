import Vuex from 'vuex'

import app from './modules/app'
import auth from './modules/auth'

const debug = process.env.NODE_ENV !== 'production'

const store = () => {
  return new Vuex.Store({
    namespaced: true,
    modules: {
      app,
      auth,
    },
    strict: debug,
  })
}

export default store

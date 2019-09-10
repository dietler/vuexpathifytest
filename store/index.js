import Vuex from 'vuex'
import pathify from 'vuex-pathify'

import counter from './modules/counter'
import schools from './modules/schools'

console.log('STORE FILE LOADED!')

const createStore = () => {
  console.log('CREATE STORE!')

  return new Vuex.Store({
    plugins: [pathify.plugin],

    modules: {
      schools,
      counter
    },

    actions: {
      nuxtServerInit(context, value) {
        console.log('NUXT_SERVER_INIT!')
      }
    }
  })
}

export default createStore

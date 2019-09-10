import { make } from 'vuex-pathify'

function state() {
  return {
    list: []
  }
}

const mutations = {
  // create SET_VALUE automatically
  ...make.mutations(state),

  // add manual mutation
  INCREMENT(state) {
    state.value++
  },

  SET_ADD(state, school) {
    state.list.push(school[0])
  }
}

export default {
  namespaced: true,
  state,
  mutations
}

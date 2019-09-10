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
  }
}

export default {
  namespaced: true,
  state,
  mutations
}

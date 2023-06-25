import { createStore } from 'vuex'

export default createStore({
  state: {
    selectedItem: -1
  },
  getters: {
  },
  mutations: {
    SELECT (state, {
      index
    }) {
      state.selectedItem = index
    },
    RESET_SELECTION (state) {
      state.selectedItem = -1
    }
  },
  actions: {
  },
  modules: {
  }
})
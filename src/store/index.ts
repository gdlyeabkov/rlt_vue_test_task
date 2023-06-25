import { createStore } from 'vuex'

export interface State {
  selectedItem: number
}

export default createStore<State>({
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
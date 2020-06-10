import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    config: {
      category: "20",
      qty: 10
    },
    quizJson: {}
  },
  getters: {},
  mutations: {
    setQty(state, payload) {
      state.qty = payload.qty;
    }
  },
  actions: {},
  modules: {}
});

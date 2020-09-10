import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    token: null,
    role: null,
    user: {
      first_name: null,
      last_name: null,
      role: null,
    },
  },
  mutations: {},
  actions: {},
  modules: {}
});

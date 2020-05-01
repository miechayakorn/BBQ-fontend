import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    token: null,
    role: null,
    user: {
      first_name: null,
      last_name: null
    },
    dashboard: {
      colorIconNav: "iconAppointment"
    }
  },
  mutations: {},
  actions: {},
  modules: {}
});

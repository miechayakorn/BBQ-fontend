import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    token: null,
    role: null,
    user: {
      account_id: null,
      first_name: null,
      last_name: null,
      profile_picture: null,
    },
    booking: {
      location: {
        location_id: "",
        location_name: "",
      },
      location_id: null,
      serviceDataType: {
        type_id: "",
        type_name: "",
      },
    }
  },
  mutations: {},
  actions: {},
  modules: {}
});

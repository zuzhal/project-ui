import { Experiments } from "../../data-models/models";


const API_URL = "http://localhost:1337/";

export default {
  namespaced: true,
  state() {
    return {
      experiments: {} as Experiments,
    };
  },

  mutations: {
    setExperiments(state, payload) {
      state.experiments = payload;
    },
  },
  actions: {
    async loadExperiments({ commit }) {
      const response = await fetch(
        API_URL + "experiments"
      );

      const responseData = await response.json();
      // console.log(responseData);
      if (!response.ok) {
        // handle errors
      }

      commit("setExperiments", responseData);
    },
  },
  getters: {
    experiments(state) {
      return state.experiments;
    }
  },
};

import { Experiments } from "../../data-models/models";
import axios from 'axios';

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
      try {
        const response = await axios.get(API_URL + "experiments");
        commit("setExperiments", response.data);
      } catch (error) {
        alert(error);
        console.error(error);
      }
    },
  },
  getters: {
    experiments(state) {
      return state.experiments;
    },
  },
};

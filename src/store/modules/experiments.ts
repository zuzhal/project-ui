import axios from "axios";
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
      try {
        const response = await axios.get(API_URL + "experiments");
        commit("setExperiments", response.data);
      } catch (error) {
        alert(error);
        console.error(error);
      }
    },

    async setStatus(context, { active, id }) {
      try {
        const response = await axios.put(`${API_URL}experiments/${id}`, {
          active,
        });
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

import axios from "axios";
import { Experiments } from "../../data-models/models";

const API_URL = "http://localhost:1337/";

export default {
  namespaced: true,
  state() {
    return {
      experiments: {} as Experiments,
      experiment: {} as any,
      experimentsWithLogs: {} as any,
      guid: "",
    };
  },

  mutations: {
    setExperiments(state, payload) {
      state.experiments = payload;
    },
    setExperiment(state, payload) {
      state.experiment = payload.data[0];
    },
    setExperimentsWithLogs(state, payload) {
      state.experimentsWithLogs = payload.data.data.generalLogsConnection.groupBy.experiment;
    },
    setGuid(state) {
      // set at the beggining of an experiment
      state.guid = Math.random().toString(36).substring(2, 9);
    },
  },
  actions: {
    async loadExperiments({ commit }) {
      try {
        const response = await axios.get(API_URL + "experiments");
        commit("setExperiments", response.data);
      } catch (error) {
        alert(error.message);
        console.error(error);
      }
    },
    loadExperiment(context, experimentLink) {
      return axios
        .get(`${API_URL}experiments?[experimentLink]$eq=${experimentLink}`)
        .catch((error) => {
          alert(error.message);
          console.error(error);
        })
        .then((resp) => {
          context.commit("setExperiment", resp);
        });
    },
    async setStatus(context, { active, id }) {
      try {
        const response = await axios.put(`${API_URL}experiments/${id}`, {
          active,
        });
        context.commit("setExperimentsWithLogs", response);
      } catch (error) {
        alert(error.message);
        console.error(error);
      }
    },
    async getGroupedGuidByExperiment(context) {
      try {
        const response = await axios({
          url: `${API_URL}graphql`,
          method: "post",
          data: { // generalLogsConnection(where: { experiment: "${name}" })
            query: `
              query getGroupedGuidByExperiment {
                generalLogsConnection { 
                  groupBy {
                    experiment {
                      key
                      connection {
                        groupBy {
                          guid {
                            key
                          }
                        }
                      }
                    }
                  }
                }
              }`,
          },
        })
        context.commit("setExperimentsWithLogs", response);
      } catch (error) {
        alert(error.message);
        console.error(error);
      }
    },
  },
  getters: {
    experiments(state) {
      return state.experiments;
    },
    experiment(state) {
      return state.experiment;
    },
    guid(state) {
      return state.guid;
    },
    experimentsWithLogs(state) {
      return state.experimentsWithLogs;
    }
  },
};

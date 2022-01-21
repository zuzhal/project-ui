import axios from "axios";
import { Experiments } from "../../data-models/models";
const jsonToTxt = require("json-to-txt");
const API_URL = "http://localhost:1337/";

export default {
  namespaced: true,
  state() {
    return {
      experiments: {} as Experiments,
      experiment: {} as any,
      experimentsWithLogs: {} as any,
      guid: "",
      subject: "",
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
      state.experimentsWithLogs =
        payload.data.data.experimentSubjectListsConnection.groupBy.experiment;
    },
    setGuid(state) {
      // set at the beggining of an experiment
      state.guid = Math.random().toString(36).substring(2, 9);
    },
    setSubject(state, payload) {
      state.subject = payload;
    },
  },
  actions: {
    async loadExperiments({ commit }) {
      try {
        const response = await axios.get(API_URL + "experiments");
        commit("setExperiments", response.data);
      } catch (error) {
        console.error(error);
        alert(error.message);
      }
    },
    async loadExperimentLogs(commit, { name, guid, subject }) {
      try {
        const response = await axios({
          url: `${API_URL}graphql`,
          method: "post",
          data: {
            query: `query getLogs {
              generalLogs(
                where: { experiment: "${name}", guid: "${guid}", subject: "${subject}" },
                sort :"dateTime"
              ) {
                data
              }
            }`,
          },
        });
        if (response.data.data.generalLogs.length == 0) {
          throw new Error("Empty logs for this experiment run");
        }
        const dataInString = jsonToTxt({
          data: response.data.data.generalLogs,
        });
        const blob = new Blob([dataInString], { type: "text/plain" });
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = `${name}_${subject}_${guid}_logs.txt`;
        link.click();
        URL.revokeObjectURL(link.href);
      } catch (error) {
        console.error(error);
        alert(error);
      }
    },
    loadExperiment(context, experimentLink) {
      return axios
        .get(`${API_URL}experiments?[experimentLink]$eq=${experimentLink}`)
        .catch((error) => {
          console.error(error);
          alert(error.message);
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
      } catch (error) {
        console.error(error);
        alert(error.message);
      }
    },
    async getExperimentSubjectList(context) {
      try {
        const response = await axios({
          url: `${API_URL}graphql`,
          method: "post",
          data: {
            // generalLogsConnection(where: { experiment: "${name}" })
            query: `query getExperimentSubjectList {
              experimentSubjectListsConnection {
                groupBy {
                  experiment {
                    key,
                    connection {
                      values {
                        guid,
                        dateTime,
                        subject
                      }
                    }
                  }
                }
              }
            }`,
          },
        });
        context.commit("setExperimentsWithLogs", response);
      } catch (error) {
        console.error(error);
        alert(error.message);
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
    },
    subject(state) {
      return state.subject;
    },
  },
};

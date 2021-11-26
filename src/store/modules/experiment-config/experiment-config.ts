import { PropType } from "vue";
import {
  ExpEnvSettings,
  ExperimentSettings,
  Instructions,
} from "../../../data-models/models";
import { flattenObject } from "../../../helpers";

const API_URL = "http://localhost:1337/";

export default {
  namespaced: true,
  state() {
    return {
      // settingsDialog: {} as ExperimentInfoDialog,
      experimentName: "",
      instructionsSettings: Object as PropType<Instructions>,
      experimentSettings: Object as PropType<ExperimentSettings>
        // expEnvSettings: Object as PropType<ExpEnvSettings>,
    };
  },
  mutations: {
    setExperimentSettings(state, payload) {
      state.experimentSettings = payload[0];
    },
    setExperimentEnvSettings(state, payload) {
      // backgroundColor etc...
      state.expEnvSettings = payload;
    },
    setSettingsDialog(state, payload) {
      state.settingsDialog = flattenObject(payload[0].settingsDialog[0]);
    },
    setExperimentName(state, payload) {
      state.experimentName = payload;
    },
    setInstructionsSettings(state, payload) {
      state.instructionsSettings = {
        title: payload[0].expEnvSettings.title,
        titleColor: payload[0].expEnvSettings.titleColor,
        instructions: payload[0].expEnvSettings.instructions,
        instructionsColor: payload[0].expEnvSettings.instructionsColor,
        background: payload[0].expEnvSettings.background,
      };
    },
  },
  actions: {
    async loadExpSettings({ commit, getters }) {
      const response = await fetch(
        API_URL + "experiment-settings?experimentName=" + getters.experimentName
      );

      const responseData = await response.json().then();
      // console.log(responseData);
      if (!response.ok) {
        // handle errors
      }

      commit("setExperimentSettings", responseData);
      commit("setInstructionsSettings", responseData);
    },

    async loadSettingsDialog({ commit, getters }) {
      const response = await fetch(
        API_URL + "settings-dialog?experimentName=" + getters.experimentName
      );

      const responseData = await response.json();
      if (!response.ok) {
        // handle errors
      }

      commit("setSettingsDialog", responseData);
    },
  },
  getters: {
    experimentSettings(state) {
      return state.experimentSettings;
    },
    hasExpConfig(state) {
      return state.experimentSettings && state.experimentSettings.length > 0;
    },
    experimentEnvSettings(state) {
      return state.experimentSettings.expEnvSettings;
    },
    settingsDialog(state) {
      return state.settingsDialog;
    },
    experimentName(state) {
      return state.experimentName;
    },
    instructionsSettings(state) {
      return state.instructionsSettings;
    },
  },
};

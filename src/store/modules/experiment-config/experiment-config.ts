import axios from "axios";
import {
  ExperimentSettings,
  FixationSettings,
  Instructions,
  ReportSettings,
  StimulusSettings,
} from "../../../data-models/models";
import { flattenObject } from "../../../utils/helpers";

const API_URL = "http://localhost:1337/";

export default {
  namespaced: true,
  state() {
    return {
      // settingsDialog: {} as ExperimentInfoDialog,
      experimentName: "",
      instructionsSettings: {} as Instructions,
      experimentSettings: {} as ExperimentSettings,
      fixationSettings: {} as FixationSettings,
      stimuliSettings: {} as StimulusSettings,
      stimuliSet: Array<[String, String, String, String]>(),
      reportSettings: {} as ReportSettings,
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
        // background: payload[0].expEnvSettings.background,
      };
    },
    setFixationSettings(state, payload) {
      state.fixationSettings = {
        fixationColorRest: payload[0].expEnvSettings.fixationColorRest,
        fixationColorTask: payload[0].expEnvSettings.fixationColorTask,
        fixationRadius: payload[0].expEnvSettings.fixationRadius,
      };
    },
    setStimuliSettings(state, payload) {
      state.stimulusSettings = {
        // stimuliSet: payload[0].expEnvSettings.stimuliSet,
        stimulusColor: payload[0].expEnvSettings.stimulusColor,
        stimulusHeight: payload[0].expEnvSettings.stimulusHeight,
      };
    },
    setStimuliSet(state, payload) {
      state.stimuliSet = payload[0].expEnvSettings.stimuliSet.set;
    },
    setReportSettings(state, payload) {
      state.reportSettings = {
        // stimuliSet: payload[0].expEnvSettings.stimuliSet,
        reportColor: payload[0].expEnvSettings.reportColor,
        report: payload[0].expEnvSettings.report,
        reportFontSize: payload[0].expEnvSettings.reportFontSize,
      };
    },
  },
  actions: {
    async loadExpSettings({ commit, getters }) {
      try {
        const response = await axios.get(
          API_URL +
            "experiment-settings?experimentName=" +
            getters.experimentName
        );
        const responseData = response.data;
        commit("setExperimentSettings", responseData);
        commit("setInstructionsSettings", responseData);
        commit("setFixationSettings", responseData);
        commit("setStimuliSettings", responseData);
        commit("setStimuliSet", responseData);
        commit("setReportSettings", responseData);
      } catch (error) {
        alert(error);
        console.error(error);
      }
    },

    async loadSettingsDialog({ commit, getters }) {
      try {
        const response = await axios.get(
          API_URL + "settings-dialog?experimentName=" + getters.experimentName
        );

        commit("setSettingsDialog", response.data);
      } catch (error) {
        alert(error);
        console.error(error);
      }
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
    fixationSettings(state) {
      return state.fixationSettings;
    },
    stimulusSettings(state) {
      return state.stimulusSettings;
    },
    stimuliSet(state) {
      return state.stimuliSet;
    },
    reportSettings(state) {
      return state.reportSettings;
    },
  },
};

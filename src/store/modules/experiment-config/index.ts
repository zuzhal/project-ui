import { flattenObject } from "../../../helpers";

const API_URL = 'http://localhost:1337/';

export default {
    namespaced: true,
    state() {
        return {
            settingsDialog: {},
            experimentName: 'flanker_fmri',
            experimentSettings: {
                expEnvSettings: {},
            }
        }
    },
    mutations: {
        setExperimentSettings(state, payload) {
            state.experimentSettings = payload;
        },
        setExperimentEnvSettings(state, payload) { // backgroundColor etc...
            state.expEnvSettings = payload;
        },
        setSettingsDialog(state, payload) {
            state.settingsDialog = flattenObject(payload[0].settingsDialog[0]);
        },
        setExperimentName(state, payload = 'flanker_fmri') {
            state.experimentName = payload;
        }
    },
    actions: {
        async loadExpConfig({ commit, getters }) {
            const response = await fetch(API_URL + 'experiment-settings?experimentName=' + getters.experimentName);

            const responseData = await response.json();
            console.log(responseData);
            if (!response.ok) {
                // handle errors
            }

            commit('setExperimentSettings', responseData);
        },

        async loadSettingsDialog({ commit, getters }) {
            const response = await fetch(API_URL + 'settings-dialog?experimentName=' + getters.experimentName);

            const responseData = await response.json();
            console.log(responseData);
            if (!response.ok) {
                // handle errors
            }

            commit('setSettingsDialog', responseData);
        }
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
        }
    },
}
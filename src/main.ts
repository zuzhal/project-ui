import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import "./index.css";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faSignOutAlt, faAt, faUser, faCheckCircle, faTimesCircle } from "@fortawesome/free-solid-svg-icons";

import BaseCard from "./components/ui/BaseCard.vue";
import BaseInstructions from "./components/ui/BaseInstructions.vue";
import BaseFixation from "./components/ui/BaseFixation.vue";
import BaseStimulus from "./components/ui/BaseStimulus.vue";

import FlankerFmri from "./components/experiments/FlankerFmri.vue";

import ElementPlus from "element-plus";
import "element-plus/dist/index.css";

import store from "./store/index";
import VueFullscreen from "vue-fullscreen";

import axios from "axios";

library.add(faSignOutAlt, faUser, faAt, faCheckCircle, faTimesCircle);

const app = createApp(App);
app.config.globalProperties.axios = axios;

axios.interceptors.request.use(
  (config) => {
    store.dispatch("loader/pending");
    return config;
  },
  (error) => {
    store.dispatch("loader/done");
    return Promise.reject(error);
  }
);
axios.interceptors.response.use(
  (response) => {
    store.dispatch("loader/done");
    return response;
  },
  (error) => {
    const response = error.response;
    store.dispatch("loader/done");
    return Promise.reject(error);
  }
);

app.use(store);
app.use(ElementPlus);
app.use(VueFullscreen);
app.use(router);

app.component("font-awesome-icon", FontAwesomeIcon);
app.component("base-card", BaseCard);
app.component("base-instructions", BaseInstructions);
app.component("base-fixation", BaseFixation);
app.component("base-stimulus", BaseStimulus);

// -- Experiments
app.component("flanker-fmri", FlankerFmri);

app.mount("#app");

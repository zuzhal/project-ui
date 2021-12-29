import { createRouter, createWebHashHistory } from "vue-router";
import Home from "./components/views/Home.vue";
import NotFound from "./components/views/NotFound.vue";
import StartExperiment from "./components/ui/StartExperiment.vue";
import Login from "./components/views/Login.vue";
import store from "./store/index";


const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    { path: "/", redirect: "/admin-home" },
    { path: "/login", component: Login },
    { path: "/admin-home", component: Home }, // TODO Guards
    {
      path: "/experiment/:id/:link",
      name: "startExperiment",
      component: StartExperiment,
      beforeEnter: (to, from, next) => {
        console.log(to.params);
        if(to.params.status == "true") {
          store.commit('experimentConfig/setExperimentName', to.params.link);
          next();
        } else {
          alert("Experiment is inactive");
        }
      }
    },
    { path: "/:notFound(.*)", component: NotFound },
  ],
});

export default router;
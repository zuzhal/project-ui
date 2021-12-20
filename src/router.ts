import { createRouter, createWebHashHistory } from "vue-router";
import Home from "./components/views/Home.vue";
import NotFound from "./components/views/NotFound.vue";
import StartExperiment from "./components/ui/StartExperiment.vue";
import store from "./store/index";


const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    { path: "/", redirect: "/admin-home" },
    { path: "/admin-home", component: Home }, // TODO Guards
    {
      path: "/experiment/:id/:link",
      component: StartExperiment,
      beforeEnter: (to, from, next) => {
        store.commit('experimentConfig/setExperimentName', to.params.link);
        next();
      }
    },
    { path: "/:notFound(.*)", component: NotFound },
  ],
});

export default router;

import { createRouter, createWebHashHistory } from "vue-router";
import Home from "./components/views/Home.vue";
import NotFound from "./components/views/NotFound.vue";
import ExperimentEnded from "./components/views/ExperimentEnded.vue";
import BaseExperiment from "./components/ui/BaseExperiment.vue";

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    { path: "/", redirect: "/admin-home" },
    { path: "/admin-home", component: Home }, // TODO Guards
    {
      path: "/experiment/:id/:link",
      component: BaseExperiment,
    },
    { path: "/:notFound(.*)", component: NotFound },
    { path: "/end", component: ExperimentEnded },
  ],
});

export default router;

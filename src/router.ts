import { createRouter, createWebHashHistory } from "vue-router";
import Home from "./components/views/Home.vue";
import FlankerTask from "./components/experiments/FlankerTask.vue";
import NotFound from "./components/views/NotFound.vue";

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    { path: "/", redirect: "/home" },
    { path: "/home", component: Home },
    { path: "/flanker-fmri", component: FlankerTask },
    { path: "/:notFound(.*)", component: NotFound },
  ],
});

export default router;

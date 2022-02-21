import { createRouter, createWebHashHistory } from "vue-router";
import Home from "./components/views/Home.vue";
import NotFound from "./components/views/NotFound.vue";
import StartExperiment from "./components/views/StartExperiment.vue";
import Login from "./components/views/Login.vue";
import store from "./store/index";

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    { path: "/", redirect: "/admin-home" },
    { path: "/login", component: Login },
    {
      path: "/admin-home",
      component: Home,
      meta: {
        auth: true, // protected route
      },
      beforeEnter: (to, from, next) => { // router guard loading necessary data before entering the route
        store
          .dispatch("experiments/loadExperiments", to.params.link)
          .then(() => {
            store
              .dispatch("experiments/getExperimentSubjectList")
              .then(() => next());
          });
      },
    },
    {
      path: "/experiment/:id/:link",
      name: "startExperiment",
      component: StartExperiment,
      beforeEnter: (to, from, next) => {
        store
          .dispatch("experiments/loadExperiment", to.params.link)
          .then(() => {
            const exp = store.getters["experiments/experiment"];
            if (exp.active) {
              localStorage.clear();
              store.commit("experiments/setGuid");
              store.commit(
                "experimentConfig/setExperimentName",
                to.params.link
              );
              loadExperimentConfig(next);
            } else {
              alert("Experiment is inactive");
            }
          });
      },
    },
    { path: "/:notFound(.*)", component: NotFound },
  ],
});

router.beforeEach((to, from, next) => { // global router guard
  const isLoggedIn = store.getters["authentication/isAuthenticated"];
  if (to.meta.auth && !isLoggedIn) {
    next("/login");
  } else {
    next();
  }
});

function loadExperimentConfig(next) {
  store
    .dispatch("experimentConfig/loadExpSettings")
    .then(() => next())
    .catch((error) => {
      console.log(error);
      alert(error);
    });
}

export default router;

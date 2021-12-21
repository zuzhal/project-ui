import router from "../../router";

const API_URL = "http://localhost:1337/";

export default {
  namespaced: true,
  state() {
    return {
      loggedUser: {},
    };
  },

  mutations: {
    setLoggedUser(state, payload) {
      state.loggedUser = {
        jwt: JSON.stringify(payload.jwt),
        user: payload.user,
      };
    },
  },
  actions: {
    async login(context, { email, password }) {
      try {
        const requestOptions = {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            identifier: email,
            password: password,
          }),
        };
        const response = await fetch(
          "http://localhost:1337/auth/local",
          requestOptions
        );
        const responseData = await response.json();
        if (!response.ok) {
          alert(response.statusText);
          console.log(response);
          throw new Error(response.statusText);
        }
        const { jwt, user } = responseData;
        context.commit("setLoggedUser", { user, jwt });
        router.push("/admin-home");
      } catch (e) {
        console.error(e);
      }
    },
  },
  getters: {
    loggedUser(state) {
      return state.loggedUser;
    },
  },
};

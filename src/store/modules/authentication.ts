import axios from "axios";
import router from "../../router";
// import axios from 'axios';

const API_URL = "http://localhost:1337/";

export default {
  namespaced: true,
  state() {
    return {
      loggedUser: {},
      isAuthenticated: false,
    };
  },

  mutations: {
    setLoggedUser(state, payload) {
      if (payload.jwt) {
        state.loggedUser = {
          jwt: JSON.stringify(payload.jwt),
          user: payload.user,
        };
        state.isAuthenticated = true;
      } else {
        state.loggedUser = payload;
      }
    },
  },
  actions: {
    async login(context, { username, password }) {
      try {
        const requestOptions = {
          identifier: username,
          password: password,
        };
        const response = await axios.post(
          API_URL + "auth/local",
          requestOptions
        );
        const { jwt, user } = response.data;
        context.commit("setLoggedUser", { user, jwt });
        router.push("/admin-home");
      } catch (e) {
        console.error(e);
        alert(e.message);
      }
    },
  },
  getters: {
    loggedUser(state) {
      return state.loggedUser.user;
    },
    isAuthenticated(state) {
      return state.isAuthenticated;
    },
  },
};

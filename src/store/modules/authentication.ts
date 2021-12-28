import axios from "axios";
import router from "../../router";
// import axios from 'axios';

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
            identifier: email,
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
        alert(e);
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

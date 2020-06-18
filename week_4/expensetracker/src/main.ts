import Vue from "vue";
import "./plugins/fontawesome";
import App from "./App.vue";
import router from "./router";
import store from "./store";

// Import firebase to manage login

Vue.config.productionTip = false;

import firebase from "firebase/app";
import axios from "axios";
import "./assets/tailwind.css";

Vue.config.productionTip = false;
Vue.prototype.$axios = axios;

const firebaseConfig = {
  apiKey: "***",
  authDomain: "****",
  databaseURL: "***",
  projectId: "***",
  storageBucket: "***m",
  messagingSenderId: "***8",
  appId: "****",
};

firebase.initializeApp(firebaseConfig);

let app: Vue;

firebase.auth().onAuthStateChanged((user) => {
  //console.log("user", user);
  if (!app) {
    app = new Vue({
      router,
      store,
      render: (h) => h(App),
    }).$mount("#app");
  }
});

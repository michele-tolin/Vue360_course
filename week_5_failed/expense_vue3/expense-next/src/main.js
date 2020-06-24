import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./assets/tailwind.css";

import firebase from "firebase/app";
//import axios from "axios";
import "./assets/tailwind.css";

const firebaseConfig = {
  apiKey: "AIzaSyCH6b7nf5GnznQD2PQliszX-xlnQIIihjI",
  authDomain: "xpence-vue.firebaseapp.com",
  databaseURL: "https://xpence-vue.firebaseio.com",
  projectId: "xpence-vue",
  storageBucket: "xpence-vue.appspot.com",
  messagingSenderId: "1001066676608",
  appId: "1:1001066676608:web:7e2b56962002e8d767c165"
};

firebase.initializeApp(firebaseConfig);

let app;

//firebase.auth().onAuthStateChanged(() => {
//console.log("user", user);
if (!app) {
  app = createApp(App)
    .use(router)
    .use(store)

    .mount("#app");
}
//});

<template>
  <div class="w-64 shadow mx-auto p-6 m-6">
    <template v-if="!logged">
      <label for="Login">Email</label>
      <input type="text" placeholder="Insert your username" v-model="email" />
      <label for="Login">Password</label>
      <input type="password" placeholder="Insert your username" v-model="password" />
      <button @click="doLogin">Login</button>
      <div v-if="error">Error!!!!</div>
    </template>
    <template v-else>
      <div>
        <div>Welcome back {{ email }}</div>

        <button @click="doLogout">Exit</button>
      </div>
    </template>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import * as firebase from "firebase/app";
import "firebase/auth";

export default Vue.extend({
  data() {
    return {
      email: "" as string,
      password: "" as string,
      logged: false as boolean,
      error: false as boolean
    };
  },
  mounted() {
    this.setupFirebase();
  },
  methods: {
    setupFirebase() {
      firebase.auth().onAuthStateChanged(user => {
        if (user) {
          console.log(user);
          // User is signed in.
          console.log("signed in");
          this.logged = true;
          this.email = user.email;
        } else {
          // No user is signed in.
          this.logged = false;
          console.log("signed out", this.logged);
        }
      });
    },
    doLogin() {
      firebase
        .auth()
        .signInWithEmailAndPassword(this.email, this.password)
        .then(data => {
          console.log(data);
          this.logged = true;
          this.$router.replace({ name: "Directory" });
        })
        .catch(error => {
          this.error = error;
        });
    },
    doLogout() {
      firebase
        .auth()
        .signOut()
        .then(() => {
          this.$router.replace({ name: "Home" });
          this.logged = false;
        });
    }
  }
});
</script>

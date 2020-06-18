<template>
  <div class="w-64 shadow mx-auto p-6 m-6 text-left">
    <template v-if="!logged">
      <label class="pt-3 text-left" for="Login">Email</label>
      <input
        class="py-2 px-3 shadow"
        type="text"
        placeholder="Insert your username"
        v-model="email"
      />
      <label class="pt-3 text-left" for="Login">Password</label>
      <input
        class="py-2 px-3 shadow"
        type="password"
        placeholder="Insert your username"
        v-model="password"
      />

      <div class="text-right">
        <ErrorInline v-if="error" @dismiss="error = false">
          Login failed!
        </ErrorInline>

        <CustomButton class="mt-6" @click.native="doLogin">Login</CustomButton>
      </div>
    </template>
    <template v-else>
      <div>
        <div>Welcome back {{ email }} !</div>

        <CustomButton @click.native="doLogout">Exit</CustomButton>
      </div>
    </template>
  </div>
</template>

<script lang="ts">
  import Vue from "vue";
  import * as firebase from "firebase/app";
  import "firebase/auth";

  import CustomButton from "@/components/CustomButton.vue";
  import ErrorInline from "@/components/ErrorInline.vue";

  export default Vue.extend({
    components: {
      CustomButton,
      ErrorInline,
    },

    data() {
      return {
        email: "" as string,
        password: "" as string,
        logged: false as boolean,
        error: false as boolean,
      };
    },
    mounted() {
      this.setupFirebase();
    },
    methods: {
      setupFirebase() {
        firebase.auth().onAuthStateChanged((user) => {
          if (user) {
            //console.log(user);
            // User is signed in.
            console.log("signed in");
            this.logged = true;
            if (user.email) {
              this.email = user.email;
            }
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
          .then((data) => {
            //console.log(data);
            this.logged = true;
            this.$router.replace({ name: "Dashboard" });
          })
          .catch((error) => {
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
      },
    },
  });
</script>

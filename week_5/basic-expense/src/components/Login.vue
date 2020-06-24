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
        <ErrorInline v-if="error" @dismiss="resetError">Login failed!</ErrorInline>

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

<script>
//import * as firebase from "firebase/app";
//import "firebase/auth";

import CustomButton from "./CustomButton.vue";
import ErrorInline from "./ErrorInline.vue";

import { loginData } from "@/composition/loginDataLogic";
import { reactive, toRefs, watch, onMounted } from "@vue/composition-api";

export default {
  setup(_, ctx) {
    /** Data object - user fields */

    //let s = loginData();

    //how can i destructure it? -> throws error...
    let udata = reactive(loginData());

    const w = watch(
      () => udata.logged,
      current => {
        if (current) {
          console.log("should go to dashboard...");
          ctx.root.$router.replace({ name: "Dashboard" });
        } else {
          console.log("should go home...");
          ctx.root.$router.replace({ name: "Home" });
        }
      }
    );

    onMounted(() => {
      console.log("mounted login");
      udata.setupFirebase();
    });

    return {
      ...toRefs(udata),
      w
    };
  },

  components: {
    CustomButton,
    ErrorInline
  }
  //mounted() {
  //setupFirebase();
  //}
  //methods: {
  /*setupFirebase() {
      firebase.auth().onAuthStateChanged(user => {
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
        .then(() => {
          //console.log(data);
          this.logged = true;
          this.$router.replace({ name: "Dashboard" });
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
    }*/
  //}
};
</script>

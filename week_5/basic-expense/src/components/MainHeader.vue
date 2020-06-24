<template>
  <div class="shadow relative" v-if="logged">
    <Menu ref="menu" class="absolute" @logout="doLogout" />

    <div class="flex w-full justify-between items-center p-3">
      <button
        class="text-gray-500 bg-transparent border border-solid border-gray-500 hover:bg-gray-500 hover:text-white active:bg-gray-600 font-bold uppercase text-xs px-4 py-2 rounded outline-none focus:outline-none mr-1 mb-1"
        type="button"
        style="transition: all .15s ease"
        @click="$refs.menu.isOpen = !$refs.menu.isOpen || false"
      >Menu</button>
      <div>{{ email }}</div>

      <!-- <button @click="doLogout">Exit</button> -->
    </div>
  </div>
</template>
<script>
//import * as firebase from "firebase/app";
//import "firebase/auth";

import Menu from "../components/Menu.vue";

import { loginData } from "@/composition/loginDataLogic";
import { reactive, toRefs, watch, onMounted } from "@vue/composition-api";

export default {
  components: {
    Menu
  },

  setup(_, ctx) {
    //let partialData = ({ doLogout, logged, email } = loginData());
    //let udata = reactive(partialData);

    let udata = reactive(loginData());

    const w = watch(
      () => udata.logged,
      current => {
        if (!current) {
          console.log("should go home...");
          ctx.root.$router.replace({ name: "Home" });
        }
      }
    );

    onMounted(() => {
      console.log("mounted header");
      udata.setupFirebase();
    });

    return {
      ...toRefs(udata),
      w
    };
  }
  /*
  data() {
    return {
      isLogged: false,
      email: ""
    };
  },
  mounted() {
    this.setupFirebase();
  },
  methods: {
    setupFirebase() {
      firebase.auth().onAuthStateChanged(user => {
        if (user) {
          //console.log(user);
          // User is signed in.
          //console.log("signed in");
          this.isLogged = true;
          this.email = user.email || "";
        } else {
          // No user is signed in.
          this.isLogged = false;
          console.log("signed out", this.isLogged);
        }
      });
    },
    doLogout() {
      firebase
        .auth()
        .signOut()
        .then(() => {
          this.$router.replace({ name: "Home" });
          this.isLogged = false;
        });
    }
  }
  */
};
</script>

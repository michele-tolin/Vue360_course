<template>
  <div class="shadow relative" v-if="isLogged">
    <Menu ref="menu" class="absolute" @logout="doLogout" />

    <div class="flex w-full justify-between items-center p-3">
      <button
        class="text-gray-500 bg-transparent border border-solid border-gray-500 hover:bg-gray-500 hover:text-white active:bg-gray-600 font-bold uppercase text-xs px-4 py-2 rounded outline-none focus:outline-none mr-1 mb-1"
        type="button"
        style="transition: all .15s ease"
        @click="$refs.menu.isOpen = !$refs.menu.isOpen || false"
      >
        Menu
      </button>
      <div>{{ email }}</div>

      <!-- <button @click="doLogout">Exit</button> -->
    </div>
  </div>
</template>
<script lang="ts">
  import Vue from "vue";
  import * as firebase from "firebase/app";
  import "firebase/auth";
  import Menu from "@/components/Menu.vue";
  export default Vue.extend({
    components: {
      Menu,
    },

    data() {
      return {
        isLogged: false as boolean,
        email: "" as string,
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
      },
    },
  });
</script>

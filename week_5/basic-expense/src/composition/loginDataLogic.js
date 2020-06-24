import { reactive, toRefs, computed } from "@vue/composition-api";
import * as firebase from "firebase/app";
import "firebase/auth";

export function loginData() {
  //let email = ref("");
  //let password = ref("");
  //let logged = ref(false);

  let f = reactive({
    email: "",
    password: "",
    logged: false,
    errorData: {},

    error: computed(() => {

      return Object.prototype.hasOwnProperty.call(f.errorData, 'code');

    }),

    resetError: () => {
      f.errorData = {};
    },

    setupFirebase: () => {
      firebase.auth().onAuthStateChanged(user => {
        if (user) {
          //console.log(user);
          // User is signed in.
          console.log("signed in");
          f.logged = true;
          if (user.email) {
            f.email = user.email;
          }
        } else {
          // No user is signed in.
          f.logged = false;
          console.log("signed out", f.logged);
        }
      });
    },

    doLogin: () => {
      f.setupFirebase();
      firebase
        .auth()
        .signInWithEmailAndPassword(f.email, f.password)
        .then(() => {
          //console.log(data);
          //f.logged = true;
          //f.errorData = {};
          //$router.replace({ name: "Dashboard" });
        })
        .catch(error => {
          f.errorData = error;
        });
    },

    doLogout: () => {
      firebase
        .auth()
        .signOut()
        .then(() => {
          //$router.replace({ name: "Home" });
          //f.logged = false;
        });
    }
  });

  return {
    ...toRefs(f)
  };
}

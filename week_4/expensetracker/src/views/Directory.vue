<template>
  <div>
    <div
      class="mx-auto w-full sm:w-4/5 md:w-3/5 xl:w-2/5 xxl: w-1/5 overflow-x-hidden"
    >
      <div class="p-6 shadow m-6">
        <h1>There are {{ getTotItems }} items in your expence list...</h1>
        <h2>Total output: {{ getTotalOutputs.tot.toFixed(2) }} €</h2>
      </div>
      <transition name="entrance">
        <router-view />
      </transition>
    </div>
    <AddData />
  </div>
</template>

<script>
  import Vue from "vue";
  import AddData from "@/components/AddData.vue";

  //import * as firebase from "firebase/app";
  //import "firebase/firestore";
  import { mapActions, mapGetters } from "vuex";

  export default Vue.extend({
    components: {
      AddData,
    },

    data() {
      return {
        db: {},
        itemList: [],
      };
    },

    created() {
      this.init();

      // Old version -> sent to the store
      //this.db = firebase.firestore();
      //this.listenForUpdates();
    },

    computed: {
      ...mapGetters(["getExpenceList", "getTotalOutputs"]),
      getTotItems() {
        return this.getExpenceList.length;
      },
    },

    methods: {
      ...mapActions(["init"]),

      // Old version -> sent to the store
      /*getList() {
  const collection = this.db.collection("spese");

  collection.get().then(snapshot => {
    this.itemList = [];
    snapshot.forEach(doc => {
      console.log("currentList", doc.data());
      this.itemList.push(doc.data());
    });
  });
},

listenForUpdates() {
  const doc = this.db.collection("spese");

  const observer = doc.onSnapshot(
    docSnapshot => {
      console.log(`Received doc snapshot: ${docSnapshot}`);
      this.getList();
      // ...
    },
    err => {
      console.log(`Encountered error: ${err}`);
    }
  );
}*/
    },
  });
</script>

<style scoped>
  /*** animation */
  .entrance-enter-active {
    backface-visibility: visible !important;
    animation: backInRight 0.5s;
  }
  .entrance-leave-active {
    backface-visibility: visible !important;
    animation: backOutLeft 0.2s;
    position: absolute;
  }

  @-webkit-keyframes backInRight {
    0% {
      -webkit-transform: translateX(2000px) scale(0.7);
      transform: translateX(2000px) scale(0.7);
      opacity: 0.7;
    }

    80% {
      -webkit-transform: translateX(0) scale(0.7);
      transform: translateX(0) scale(0.7);
      opacity: 0.7;
    }

    to {
      -webkit-transform: scale(1);
      transform: scale(1);
      opacity: 1;
    }
  }

  @keyframes backInRight {
    0% {
      -webkit-transform: translateX(2000px) scale(0.7);
      transform: translateX(2000px) scale(0.7);
      opacity: 0.7;
    }

    80% {
      -webkit-transform: translateX(0) scale(0.7);
      transform: translateX(0) scale(0.7);
      opacity: 0.7;
    }

    to {
      -webkit-transform: scale(1);
      transform: scale(1);
      opacity: 1;
    }
  }
  @-webkit-keyframes backOutLeft {
    0% {
      -webkit-transform: scale(1);
      transform: scale(1);
      opacity: 1;
    }

    20% {
      -webkit-transform: translateX(0) scale(0.7);
      transform: translateX(0) scale(0.7);
      opacity: 0.7;
    }

    to {
      -webkit-transform: translateX(-2000px) scale(0.7);
      transform: translateX(-2000px) scale(0.7);
      opacity: 0.7;
    }
  }

  @keyframes backOutLeft {
    0% {
      -webkit-transform: scale(1);
      transform: scale(1);
      opacity: 1;
    }

    20% {
      -webkit-transform: translateX(0) scale(0.7);
      transform: translateX(0) scale(0.7);
      opacity: 0.7;
    }

    to {
      -webkit-transform: translateX(-2000px) scale(0.7);
      transform: translateX(-2000px) scale(0.7);
      opacity: 0.7;
    }
  }
</style>

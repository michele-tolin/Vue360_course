<template>
  <div>
    Tot: {{itemList.length}}
    <router-view />
    <AddData />
  </div>
</template>

<script>
import Vue from "vue";
import AddData from "@/components/AddData.vue";

import * as firebase from "firebase/app";
import "firebase/firestore";

export default Vue.extend({
  components: {
    AddData
  },

  data() {
    return {
      db: {},
      itemList: []
    };
  },

  created() {
    console.log("created");

    this.db = firebase.firestore();

    this.listenForUpdates();
    /*const doc = db.collection("spese");

    const observer = doc.onSnapshot(
      docSnapshot => {
        console.log(`Received doc snapshot: ${docSnapshot}`);
        // ...
      },
      err => {
        console.log(`Encountered error: ${err}`);
      }
    );*/

    /* collection.add({
      category: "cancelleria",
      euro: 0.01,
      item: "test automatico",
      data: firebase.firestore.Timestamp.fromDate(new Date())
    }); */
  },

  methods: {
    getList() {
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
    }
  }
});
</script>

<style lang="scss" scoped></style>

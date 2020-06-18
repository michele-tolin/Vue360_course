import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

import * as firebase from "firebase/app";
import "firebase/firestore";

export default new Vuex.Store({
  state: {
    db: {},
    expenceList: [],
  },
  getters: {
    getExpenceList: (state) => state.expenceList,
    getTotalOutputs: (state) => {
      const outcome: any = { tot: 0 };
      for (const expence of state.expenceList) {
        /*

export class Listing {
[key: string]: any
itemId!: string
id: string
url: string 

*/

        // Ts caos... ask Erik....
        if (!outcome[expence["category"]]) {
          outcome[expence["category"]] = 0.0;
        }
        const money: number =
          Math.round(parseFloat(expence["euro"]) * 100) / 100;
        outcome[expence["category"]] += money;
        outcome["tot"] += money;
      }
      return outcome;
    },
  },
  mutations: {
    setExpence: (state, value) => (state.expenceList = value),
  },
  actions: {
    init: (state) => {
      const db = firebase.firestore();
      const docColl = db.collection("spese");
      //listener on changes on db
      docColl.onSnapshot(
        //function that recalculate the whole...
        function docSnapshot() {
          console.log(`Received doc snapshot: ${docSnapshot}`);

          docColl.get().then(
            (snapshot) => {
              const itemList: Array<any> = [];
              snapshot.forEach((doc) => {
                console.log("currentList", doc.data());
                itemList.push(doc.data());
              });
              state.commit("setExpence", itemList);
              // ...
            },
            (err) => {
              console.log(`Encountered error: ${err}`);
            }
          );
        }
      );
      /*listenForUpdates: (state, value) => {
        const doc = state.db.collection("spese");
  
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
      },*/
      /*fetchList: (state, value) => {
        const collection = this.db.collection("spese");
  
  
        collection.get().then(snapshot => {
          let itemList = [];
          snapshot.forEach(doc => {
            console.log("currentList", doc.data());
            itemList.push(doc.data());
          });
  
        });*/
    },
  },
  modules: {},
});

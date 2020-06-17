<template>
  <div class="absolute bottom-0">
    <div class="relative">plus</div>
    <div>
      <ul>
        <li @click="showAdd= true">Expense</li>
      </ul>
    </div>
    <div
      v-show="showAdd"
      class="fixed h-full w-full flex items-center justify-center bg-gray-600 opacity-75 rounded top-0"
    >
      <div class="p-6 bg-gray-200 flex flex-col shadow">
        <label for="cat">cat</label>
        <input type="text" name="cat" v-model="item.cat" />
        <label for="euro">euro</label>
        <input type="text" name="euro" v-model="item.euro" />
        <label for="item">item</label>
        <input type="text" name="item" v-model="item.item" />
        <button @click="addItem">Add</button>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import Vue from "vue";
import * as firebase from "firebase/app";
import "firebase/firestore";

export default Vue.extend({
  data() {
    return {
      item: {
        cat: "" as string,
        euro: 0.0 as number,
        item: "" as string
      } as object,
      showAdd: false as boolean
    };
  },
  methods: {
    addItem() {
      const db = firebase.firestore();

      const collection = db.collection("spese");

      collection.add({
        category: this.item.cat,
        euro: this.item.euro,
        item: this.item.item,
        data: firebase.firestore.Timestamp.fromDate(new Date())
      });

      this.showAdd = false;
    }
  }
});
</script>
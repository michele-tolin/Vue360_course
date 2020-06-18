<template>
  <div class="fixed bottom-0">
    <CustomButton @click.native="showAdd = true">Expense</CustomButton>
    <div
      v-show="showAdd"
      class="fixed h-full w-full flex items-center justify-center bg-gray-900  rounded top-0"
    >
      <div
        class="p-6 bg-gray-200 flex flex-col shadow w-full sm:w-4/5 md:w-3/5 xl:w-2/5 xxl: w-1/5 overflow-x-hidden"
      >
        <label class="pt-3 text-left" for="cat">Category</label>
        <input
          class="py-2 px-3 shadow"
          type="text"
          name="cat"
          v-model="item.cat"
        />
        <label class="pt-3 text-left" for="euro">euro</label>
        <input
          class="py-2 px-3 shadow"
          type="number"
          name="euro"
          v-model.number="item.euro"
        />
        <label class="pt-3 text-left" for="item">item</label>
        <input
          class="py-2 px-3 shadow"
          type="text"
          name="item"
          v-model="item.item"
        />

        <ErrorInline v-if="showAlert" @dismiss="showAlert = false">
          Error! fields are mandatory...
        </ErrorInline>

        <div class="mt-3 flex justify-end">
          <CustomButton @click.native="addItem">Add</CustomButton>
          <CustomButton @click.native="showAdd = false" :type="'secondary'"
            >Cancel</CustomButton
          >
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
  import Vue from "vue";
  import * as firebase from "firebase/app";
  import "firebase/firestore";

  import CustomButton from "@/components/CustomButton.vue";
  import ErrorInline from "@/components/ErrorInline.vue";

  interface ItemObj {
    cat?: string;
    euro?: number;
    item?: string;
  }

  export default Vue.extend({
    components: {
      CustomButton,
      ErrorInline,
    },

    data() {
      return {
        item: {
          cat: "" as string,
          euro: 0.0 as number,
          item: "" as string,
        } as ItemObj,
        showAdd: false as boolean,
        showAlert: false as boolean,
      };
    },
    methods: {
      addItem() {
        if (!this.item.cat || !this.item.euro || !this.item.item) {
          this.showAlert = true;
          return;
        } else {
          this.showAlert = false;
        }

        const db = firebase.firestore();

        const collection = db.collection("spese");

        collection.add({
          category: this.item.cat,
          euro: this.item.euro,
          item: this.item.item,
          data: firebase.firestore.Timestamp.fromDate(new Date()),
        });

        this.showAdd = false;
      },
    },
  });
</script>

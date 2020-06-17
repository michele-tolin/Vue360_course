<template>
  <div>
    <template v-if="isOpen">
      <aside
        class="absolute bg-gray-900 opacity-75 text-gray-100 p-3 w-64 shadow flex flex-col jsutify-between items-start"
      >
        <button @click="isOpen = false">Close [x]</button>
        <ul class="w-full text-center mr-10">
          <li>
            <a @click="gotoMenu({name: 'Dashboard'})">Dashboard</a>
          </li>
          <li>
            <a @click="gotoMenu({name: 'Details'})">Details</a>
          </li>
          <li>
            <a @click="gotoMenu({name: 'About'})">About</a>
          </li>
        </ul>
      </aside>
    </template>
  </div>
</template>
<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  data() {
    return {
      isOpen: false as boolean
    };
  },
  methods: {
    gotoMenu(payload) {
      this.isOpen = false;
      //avoid message of redundancy
      if (this.$route.name !== payload.name) {
        //console.log(this.$route.name, payload.name);
        this.$router.replace(payload);
      }
    }
  }
});
</script>
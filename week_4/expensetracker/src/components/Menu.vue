<template>
  <div class="w-full z-10">
    <transition name="slide">
      <template v-if="isOpen">
        <div>
          <div class="fixed h-screen w-screen bg-gray-900 opacity-75 "></div>
          <aside
            class="fixed bg-gray-800 text-gray-100 w-3/4 shadow flex flex-col jsutify-between items-start z-10"
          >
            <button class="m-3" @click="isOpen = false">Close [x]</button>
            <ul class="w-full text-center mr-10">
              <li class="p-3 cursor-pointer shadow">
                <a @click="gotoMenu({ name: 'Dashboard' })">Dashboard</a>
              </li>
              <li class="p-3 cursor-pointer shadow">
                <a @click="gotoMenu({ name: 'Details' })">Details</a>
              </li>
              <li class="p-3 cursor-pointer shadow">
                <a @click="gotoMenu({ name: 'About' })">About</a>
              </li>
              <li class="p-3 cursor-pointer mt-6 shadow">
                <a @click="$emit('logout')">Logout</a>
              </li>
            </ul>
          </aside>
        </div>
      </template>
    </transition>
  </div>
</template>
<script lang="ts">
  import Vue from "vue";

  interface MenuObj {
    name?: string;
  }

  export default Vue.extend({
    data() {
      return {
        isOpen: false as boolean,
      };
    },
    methods: {
      gotoMenu(payload: MenuObj) {
        this.isOpen = false;
        //avoid message of redundancy
        if (this.$route.name !== payload.name) {
          //console.log(this.$route.name, payload.name);
          this.$router.replace(payload);
        }
      },
    },
  });
</script>
<style scoped>
  /*** animation */
  .slide-enter-active,
  .slide-leave-active {
    transition: opacity 300ms;
    transition: transform 300ms;
  }
  .slide-enter,
  .slide-leave-to {
    opacity: 0;

    transform: translateX(-100%);
  }

  .slide-enter-to,
  .slide-leave {
    opacity: 1;

    transform: translateX(0%);
  }
</style>

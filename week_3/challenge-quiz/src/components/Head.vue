<template>
  <div class="w-full px-6 py-2 bg-gray-900 text-orange-400 flex flex-col justify-center">
    <div class="text-bold uppercase text-2xl mb-2">The age of mythology</div>
    <div class="flex justify-between border-t border-orange-500 pt-2" v-if="getStats.started">
      <div>{{getName}} vs Encyclopedia</div>
      <transition name="slither">
        <div v-if="getStats.errors">Errors: {{getStats.errors}}</div>
      </transition>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters(["getStats", "getName"])
  }
};
</script>

<style scoped>
/** Transitions */
.slither-enter-active,
.slither-leave-active {
  transition: transform 1s;
}

.slither-enter,
.slither-leave-to {
  transform: translateX(100%);
}

.slither-enter-to,
.slither-leave {
  transform: translateX(0);
}
</style>
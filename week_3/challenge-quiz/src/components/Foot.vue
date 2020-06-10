<template>
  <div
    class="w-full px-6 bg-gray-900 text-orange-400 h-16 flex justify-between items-center fixed bottom-0"
  >
    <router-link v-if="getStats.started && getSteps.total" to="/">Change Settings</router-link>
    <transition name="slither">
      <div
        v-if="getSteps.total && getSteps.current"
      >You are at {{ getSteps.current }} of {{ getSteps.total }}</div>
    </transition>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters(["getSteps", "getStats"])
  }
};
</script>

<style scoped>
/** Transitions */
.slither-enter-active,
.slither-leave-active {
  transition: transform 0.5s;
}

.slither-enter,
.slither-leave-to {
  transform: translateX(-1000%);
}

.slither-enter-to,
.slither-leave {
  transform: translateX(0);
}
</style>
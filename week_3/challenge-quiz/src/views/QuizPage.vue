<template>
  <div style="min-height: 350px;">
    <transition name="fade">
      <QuizStep v-if="!isFetching" />
    </transition>
  </div>
</template>

<script>
import QuizStep from "../components/QuizStep";
import { mapGetters } from "vuex";
export default {
  components: {
    QuizStep
  },

  computed: {
    ...mapGetters(["isFetching"])
  }
};
</script>

<style  scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 1.5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>

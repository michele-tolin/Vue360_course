<template>
  <div class="about">
    <CentralBody>
      <template slot="victory">
        <div v-if="getSteps.total == getSteps.current && getStats.started" class="py-2">
          <div class="p-6 text-5xl">You succeded!!!</div>
          <div v-if="getStats.errors">Errors so far: {{getStats.errors}}</div>
          <div v-else>With NO errors at all!!!</div>
          <div>Rating: {{ rating }} %</div>
        </div>
        <div v-else class="py-2">
          Ade has made some mess...
          <router-link
            to="/"
            tag="button"
            class="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
          >Restart</router-link>
        </div>
      </template>
    </CentralBody>
  </div>
</template>
<script>
import CentralBody from "../components/CentralBody";
import { mapGetters } from "vuex";
export default {
  components: {
    CentralBody
  },

  computed: {
    ...mapGetters(["getSteps", "getStats"]),
    rating: function() {
      return Math.round(
        (this.getSteps.total / (this.getStats.errors + this.getSteps.total)) *
          100
      );
    }
  }
};
</script>

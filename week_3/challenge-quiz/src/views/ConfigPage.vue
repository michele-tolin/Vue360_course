<template>
  <div class="flex flex-col">
    <label class="py-2 px-3" for="nickName">What is your Ancient Name</label>
    <input
      class="transition-colors duration-100 ease-in-out focus:outline-0 border border-transparent focus:bg-white focus:border-gray-300 placeholder-gray-600 rounded-lg bg-gray-200 py-2 px-3 block appearance-none leading-normal ds-input m-3"
      type="text"
      name="nickName"
      v-model="nickName"
    />
    <label class="py-2 px-3" for="qSize">How many tests do you want to face?</label>
    <input
      class="transition-colors duration-100 ease-in-out focus:outline-0 border border-transparent focus:bg-white focus:border-gray-300 placeholder-gray-600 rounded-lg bg-gray-200 py-2 px-3 block appearance-none leading-normal ds-input m-3"
      :class="{
        'border-red-800': !isValidNumber,
      }"
      type="number"
      name="qSize"
      v-model.number="qSize"
    />
    <div v-if="!isValidNumber" class="px-3">
      <div class="w-full py-2 px-3 bg-red-200 text-red-600">Invalid value!!!</div>
    </div>

    <div class="p-3">
      <CustomButton :class="{
          'opacity-25 cursor-not-allowed': !canSubmit,
        }">
        <div @click="setAndStartQuiz">Start your journey</div>
      </CustomButton>
    </div>
  </div>
</template>

<script>
import { mapMutations, mapActions, mapGetters } from "vuex";
import CustomButton from "../components/CustomButton";

export default {
  name: "Config",

  components: {
    CustomButton
  },

  data() {
    return {
      nickName: "",
      qSize: 10
    };
  },

  created() {
    this.nickName = this.getName;
    this.setQuiz({});
  },

  computed: {
    ...mapGetters(["getName", "isFetching"]),

    isValidNumber: function() {
      return this.qSize != "";
    },
    canSubmit: function() {
      return this.isValidNumber && this.nickName !== "";
    }
  },

  watch: {
    isFetching(prevFetching, afterFetching) {
      //if we came from fetching pending to finshed
      if (prevFetching && !afterFetching) {
        this.$router.push({ name: "Quiz" });
      }
    }
  },

  methods: {
    // ask Erik
    //setAndStartQuiz: () => this.$store.commit('setQty',this.qSize)
    ...mapMutations({
      setQty: "setQty",
      setNik: "setNik",
      setQuiz: "setQuiz"
    }),
    ...mapActions({
      fetch: "fetchData"
    }),
    setAndStartQuiz: function() {
      if (this.canSubmit) {
        this.setQty(this.qSize);
        this.setNik(this.nickName);
        this.fetch();
        ///this.$router.push({ name: "Quiz" });
      }
    }
  }
};
</script>

<style lang="scss" scoped></style>

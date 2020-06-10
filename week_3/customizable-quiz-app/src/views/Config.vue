<template>
  <div class="flex flex-col">
    <label class="py-2 px-3" for="nickName">Your nickname</label>
    <input
      class="transition-colors duration-100 ease-in-out focus:outline-0 border border-transparent focus:bg-white focus:border-gray-300 placeholder-gray-600 rounded-lg bg-gray-200 py-2 px-3 block appearance-none leading-normal ds-input m-3"
      type="text"
      name="nickName"
      v-model="nickName"
    />
    <label class="py-2 px-3" for="qSize">Your qSize</label>
    <input
      class="transition-colors duration-100 ease-in-out focus:outline-0 border border-transparent focus:bg-white focus:border-gray-300 placeholder-gray-600 rounded-lg bg-gray-200 py-2 px-3 block appearance-none leading-normal ds-input m-3"
      type="number"
      name="qSize"
      v-model="qSize"
    />

    <div class="p-3">
      <button
        @click="setAndStartQuiz"
        class="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
      >
        Start quiz
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: "Config",
  data() {
    return {
      nickName: "",
      qSize: 10
    };
  },

  methods: {
    setAndStartQuiz: () => {}
  }
};
</script>

<style lang="scss" scoped></style>

<template>
  <div class="w-full flex flex-row justify-center">
    <div
      v-for="cat in categoryList"
      :key="cat.id"
      class="m-6 p-6 w-1/4 shadow hover:shadow-lg cursor-pointer"
      @click="goto(cat.id)"
    >
      {{ cat.name }}
    </div>
  </div>
</template>

<script>
export default {
  name: "Types",

  props: {
    categoryList: {
      type: Array,
      default: () => []
    }
  },

  methods: {
    goto: function(destination) {
      this.$router.push({
        name: "ProductList",
        params: { filter: destination }
      });
    }
  }
};
</script>

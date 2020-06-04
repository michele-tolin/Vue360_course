<template>
  <div class="home">
    What are you interested of?
    <Types :categoryList="categories"></Types>
  </div>
</template>

<script>
// @ is an alias to /src
import Types from "@/components/Types.vue";

export default {
  name: "Home",
  props: {
    categories: {
      type: Array,
      default: () => []
    }
  },
  components: {
    Types
  }
};
</script>

<template>
  <div
    class="rounded w-full flex flex-col shadow justify-center px-3 py-2 cursor-pointer bg-orange-200 text-gray-700 hover:bg-orange-600 hover:text-orange-100"
  >
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "Answer"
};
</script>

<style lang="scss" scoped>
</style>
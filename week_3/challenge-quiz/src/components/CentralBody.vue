<template>
  <div class="p-6 m-6">
    <slot name="form"></slot>
    <div class="shadow bg-gray-400 flex flex-col justify-between">
      <slot name="card"></slot>
    </div>
    <div class="shadow bg-gray-900 flex flex-col justify-between border text-orange-400">
      <slot name="victory"></slot>
    </div>
  </div>
</template>

<style lang="scss" scoped>
</style>
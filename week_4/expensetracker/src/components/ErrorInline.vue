<template>
  <div
    class="text-white px-6 py-4 mt-6  border-0 rounded relative mb-4 bg-red-500"
  >
    <span class="text-xl inline-block mr-5 align-middle">
      <slot name="icon"></slot>
    </span>
    <span class="inline-block align-middle mr-8">
      <b class="capitalize"><slot></slot></b>
    </span>
    <button
      @click="$emit('dismiss')"
      class="absolute bg-transparent text-2xl font-semibold leading-none right-0 top-0 mt-4 mr-6 outline-none focus:outline-none"
    >
      <span>×</span>
    </button>
  </div>
</template>

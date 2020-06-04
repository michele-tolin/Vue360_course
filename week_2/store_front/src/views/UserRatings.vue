<template>
  <div>
    <div v-if="history.length" >
      <div v-for="(rate,key) in history" :key="key" class="mt-6 py-2 px-3 shadow flex justify-between">
          Rated: {{rate.val}} <div class="w-32"><font-awesome-icon v-for="n in rate.val" icon="star" :key="n"></font-awesome-icon></div> by {{rate.author}} @ {{rate.date}}
      </div>
    </div>
    <div v-else>
      No rating yet, be the first!
    </div>
  </div>
</template>

<script>
    export default {
        name: "UserRatings",
        props: {
            history: {
                type: Array,
                default: () => []
            }
        }
    }
</script>

<style scoped>

</style>
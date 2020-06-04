<template>
  <div class="about">
    <h1>This is the product full view</h1>

    <full-product></full-product>

    <router-link :to="$route.path+'/history'">View rating hisotry</router-link>
    <router-view></router-view>
  </div>
</template>
<script>
  import fullProduct from "../components/fullProduct";
  export default {

      components: {
          fullProduct
      }
  }
</script>

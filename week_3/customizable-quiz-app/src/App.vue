<template>
  <div id="app">
    <Head />
    <div style="width: 350px;" class="max-w-full p-6 my-6 mx-auto">
      <router-view class="shadow w-full" />
    </div>
    <Foot />
  </div>
</template>

<script>
import store from "./store";
import Head from "./components/Head.vue";
import Foot from "./components/Foot.vue";

export default {
  name: "App",

  store,

  components: {
    Head,
    Foot
  }
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>

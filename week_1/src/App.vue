<template>
  <div id="app">
    <h1 class="font-bold text-5xl ">Twitter Box Client</h1>
    <main-box></main-box>
  </div>
</template>

<script>
import MainBox from "./components/MainBox.vue";

export default {
  name: "App",
  components: {
    MainBox
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

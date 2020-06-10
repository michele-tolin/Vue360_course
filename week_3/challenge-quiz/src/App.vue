<template>
  <div id="app" class="h-full relative bg-gray-600 text-orange-400 relative overflow-x-hidden">
    <Head></Head>

    <transition name="flip">
      <router-view />
    </transition>

    <Foot></Foot>
  </div>
</template>
<script>
import Head from "./components/Head";
import Foot from "./components/Foot";

export default {
  name: "App",
  components: {
    Head,
    Foot
    //CentralBody
  }
};
</script>
<style>
body {
  height: 100vh;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}

/*** animation */
.flip-enter-active {
  backface-visibility: visible !important;
  animation: flipInX 0.5s;
}
.flip-leave-active {
  backface-visibility: visible !important;
  animation: flipInX 0.2s reverse;
}

@-webkit-keyframes flipInX {
  0% {
    -webkit-transform: perspective(400px) rotateX(90deg);
    transform: perspective(400px) rotateX(90deg);
    -webkit-animation-timing-function: ease-in;
    animation-timing-function: ease-in;
    opacity: 0;
  }

  40% {
    -webkit-transform: perspective(400px) rotateX(-20deg);
    transform: perspective(400px) rotateX(-20deg);
    -webkit-animation-timing-function: ease-in;
    animation-timing-function: ease-in;
  }

  60% {
    -webkit-transform: perspective(400px) rotateX(10deg);
    transform: perspective(400px) rotateX(10deg);
    opacity: 1;
  }

  80% {
    -webkit-transform: perspective(400px) rotateX(-5deg);
    transform: perspective(400px) rotateX(-5deg);
  }

  to {
    -webkit-transform: perspective(400px);
    transform: perspective(400px);
  }
}

@keyframes flipInX {
  0% {
    -webkit-transform: perspective(400px) rotateX(90deg);
    transform: perspective(400px) rotateX(90deg);
    -webkit-animation-timing-function: ease-in;
    animation-timing-function: ease-in;
    opacity: 0;
  }

  40% {
    -webkit-transform: perspective(400px) rotateX(-20deg);
    transform: perspective(400px) rotateX(-20deg);
    -webkit-animation-timing-function: ease-in;
    animation-timing-function: ease-in;
  }

  60% {
    -webkit-transform: perspective(400px) rotateX(10deg);
    transform: perspective(400px) rotateX(10deg);
    opacity: 1;
  }

  80% {
    -webkit-transform: perspective(400px) rotateX(-5deg);
    transform: perspective(400px) rotateX(-5deg);
  }

  to {
    -webkit-transform: perspective(400px);
    transform: perspective(400px);
  }
}
</style>

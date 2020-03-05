<template>
  <div id="app">
    <h1>here is fraction circle</h1>
    <FractionCircle></FractionCircle>
    <HelloWorld msg="Welcome to Your Vue.js App"/>

  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'
import FractionCircle from './components/FractionCircle';

export default {
  name: 'App',
  components: {
    HelloWorld,
    FractionCircle,
  }
}
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

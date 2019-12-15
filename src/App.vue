<template>
  <div id="app">
    <Registration/>
  </div>
</template>

<script>
import Registration from './components/Registration.vue'

export default {
  name: 'app',
  components: {
    Registration
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin-top: 20px;
}
div{
  overflow-wrap: break-word;
}
</style>

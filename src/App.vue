<template>
  <div id="app">
    <Registration v-show="showRegisterPage"/>
    <Login v-show="showLoginPage"/>
  </div>
</template>

<script>
import Registration from './components/Registration.vue'
import Login from './components/Login.vue'

export default {
  name: 'app',
  data () {
    return {
      showRegisterPage: true,
      showLoginPage:false
    }
  },
  components: {
    Registration,
    Login
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

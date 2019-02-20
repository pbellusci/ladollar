<template>
  <div id="app">
    <Cotizacion/>
  </div>
</template>

<script>
import Cotizacion from './components/Cotizacion.vue'

export default {
  name: 'app',
  components: {
    Cotizacion
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>

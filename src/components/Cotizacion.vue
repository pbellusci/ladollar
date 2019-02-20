<template>
  <div id="cotizador">
    <div v-if="cotizador">
      <h1 class="banco"> Banco {{banco}} </h1>
      <h2 class="cotizacion"> 
        <span class="green">{{ venta }}</span> / 
        <span class="blue">{{ compra }}</span> 
      </h2>
      <h2 class="variacion" :class="(variacion_positiva == true) ? 'limegreen' : 'red'">{{variacion_total}} </h2>
      <h2> <u>Ultima Cotizacion</u><br/> <i>{{ compra_old }} / {{venta_old}} @ {{hora_old}}</i> </h2>
      <button v-on:click="stopCotizacion"> Apagar Cotizador </button>  
    </div>
    <div v-else>
      <button v-on:click="startCotizacion('bbva')"> Cotizar BBVA </button>
      <br/>
      <button v-on:click="startCotizacion('galicia')"> Cotizar Galicia </button>
      <br/>
      <button v-on:click="startCotizacion('nacion')"> Cotizar Nacion </button>  
    </div>
    
  </div>
</template>

<script>
const axios = require('axios')
export default {
  name: 'Cotizacion',
  data() { 
      return {
        cotizador: false,
        banco: '',
        compra: 0,
        venta: 0,
        variacion_total: '0%',
        variacion_positiva: true,
        compra_old: 0,
        venta_old: 0,
        hora_old: '00:40',
        cotizacionInterval: null
    }
  },
    methods: {
      stopCotizacion() {
        this.cotizador = false
        this.banco = '';
        this.compra = 0;
        this.venta = 0;
        clearInterval(this.cotizacionInterval)
      },
      startCotizacion(banco) {
        this.cotizador = true
        this.banco = this.getTitleBanco(banco)
        this.cotizacionInterval = setInterval(this.updateCotizacion.bind(this, banco), 3000)
      },
      getTitleBanco(banco) {
        let str = '';
        switch(banco){
          case 'bbva':
            str = 'BBVA Frances';
            break;
          case 'galicia':
            str = 'Galicia';
            break;
          case 'nacion':
            str = 'Nacion';
            break;
        }
        return str;
      },
      async updateCotizacion (banco) {
        console.log('cotizando...')
        var _self = this;
        await axios.get('http://localhost:3000/cotizar/' + banco).then(response => {
          _self.compra = response.data.compra;
          _self.venta = response.data.venta;
        }).catch( er => {
          console.log(er)
        })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
.cotizacion {
  font-size:90px;
  margin-top: 0;
  margin-bottom: 0
}
.variacion {
  font-size: 70px;
  margin-top: 0;
}
.green {
  color:green
}
.limegreen {
  color:limegreen
}
.red {
  color:red;
}
.banco {
  font-size:60px;
}
.blue {
  color:blue;
}
</style>

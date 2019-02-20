const BBVA = require('./libraries/bbva');
const Galicia = require('./libraries/galicia');
const Nacion = require('./libraries/nacion');
const express = require('express');
const app = express();
const cors = require('cors');

app.get('/', function(req, res){
  res.send('Empezamos');
})

app.get('/cotizar/:banco', async function(req, res){
  let banco = req.params.banco.toLowerCase();
  let cotizacion = [];
  try {
    switch(banco) {
      case 'bbva':
        cotizacion = await BBVA.cotizar();
        break;
      case 'galicia':
        cotizacion = await Galicia.cotizar();
        break;
      case 'nacion':
        cotizacion = await Nacion.cotizar();
      break;
    }
    res.header("Access-Control-Allow-Origin", "*");
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify(cotizacion));
  } catch(e) {
    console.log(e.message);
  }
})

app.use(cors());
app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
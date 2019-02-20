var _URL = 'http://www.bna.com.ar/Personas';
var cheerio  = require('cheerio')
const axios = require('axios')
module.exports = {
  cotizar() {
    return axios.get(_URL).
      then(response => {
        const $ = cheerio.load(response.data)
        var compra = $('#billetes').find('td').eq(1).text();
        var venta = $('#billetes').find('td').eq(2).text();
        return {'compra': compra, 'venta': venta}
      }).
      catch(error => {
        console.log(error.message)
        return {'compra': null, 'venta': null}
      })
  }
};
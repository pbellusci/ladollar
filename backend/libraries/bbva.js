var _URL = 'https://hb.bbv.com.ar/fnet/mod/inversiones/NL-dolareuro.jsp';
var cheerio  = require('cheerio')
const axios = require('axios')
module.exports = {
  cotizar() {
    return axios.get(_URL).
      then(response => {
        const $ = cheerio.load(response.data)
        var trDolar = $('tr').eq('1');
        var compra = trDolar.find('td').eq('1').text();
        var venta = trDolar.find('td').eq('2').text();
        return {'compra': compra, 'venta': venta}
      }).
      catch(error => {
        console.log(error.message)
        return {'compra': null, 'venta': null}
      })
  }
};
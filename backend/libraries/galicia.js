var _URL = 'https://www.bancogalicia.com/cotizacion/cotizar?currencyId=02&quoteType=SU&quoteId=999';
const axios = require('axios')
module.exports = {
  cotizar() {
    return axios.get(_URL).
      then(response => {
        var compra = response.data.buy;
        var venta = response.data.sell;
        return {'compra': parseFloat(compra).toFixed(2), 'venta': parseFloat(venta).toFixed(2)}
      }).
      catch(error => {
        return {'compra': null, 'venta': null}
      })
  }
};
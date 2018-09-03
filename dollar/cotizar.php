<?php
class Cotizar
{
    const SOURCE = "https://hb.bbv.com.ar/fnet/mod/inversiones/NL-dolareuro.jsp";
    const LOG = "cotizacion_historica.txt";

    public $_compra;
    public function __construct($valorCompra = 0)
    {
        $this->_compra = $valorCompra;
    }

    public function start()
    {
        list($compra, $venta) = $this->_readData();
        $date = date('d-m-Y H:i:s');
        if($this->_compra > 0) {
            $profit = $this->_calculate($compra);
            print "Variacion: $profit || Compra: $compra || Venta $venta || $date".PHP_EOL;
            $log = "$compra||$venta||$date||$profit";
        } else {
            print "Compra: $compra || Venta $venta || $date";
            $log = "$compra||$venta||$date";
        }

        $this->_logData($log);
    }

    private function _calculate($compra)
    {
        $amount = $this->_compra;
        $percentChange = (1 - $amount / $compra) * 100;
        return number_format($percentChange, 2);
    }

    private function _logData($text)
    {
        file_put_contents(self::LOG, $text.PHP_EOL , FILE_APPEND | LOCK_EX);
    }

    private function _readData()
    {
        $data = file_get_contents(self::SOURCE);
        $dom = new DOMDocument();
        $dom->loadHTML($data);
        $dom->preserveWhiteSpace = false;
        //discard white space
        $dom->preserveWhiteSpace = false;

        //the table by its tag name
        $tables = $dom->getElementsByTagName('table');

        //get all rows from the table
        $rows = $tables->item(0)->getElementsByTagName('tr');
        $dollarRow = $rows->item(1)->getElementsByTagName("td");

        $compra = $dollarRow->item(1)->nodeValue;
        $venta = $dollarRow->item(2)->nodeValue;

        return[$compra, $venta];
    }
}
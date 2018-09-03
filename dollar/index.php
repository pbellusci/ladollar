<?php
require_once "cotizar.php";
$amount = isset($argv[1]) ? $argv[1] : 0;
$data = new Cotizar($amount);
$data->start();

<?php
require_once "colors.php";
require_once "cotizar.php";

$amount = isset($argv[1]) ? $argv[1] : 0;
$data = new Cotizar($amount);
while (1==1) {
    $data->start();
    $sleep = rand(30,180);
    sleep($sleep);
}
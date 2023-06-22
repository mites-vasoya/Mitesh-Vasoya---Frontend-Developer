<?php
require_once 'vendor/autoload.php';
use GuzzleHttp\Client;

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

//Query Data...
$searchQuery = $_POST['searchQuery'];
$searchBy = $_POST['searchBy'];

$baseUrl = 'https://api.spacexdata.com/v3/capsules';

$client = new Client([
    'verify' => false
]);
$response = $client->request('GET', $baseUrl."?".$searchBy."=".$searchQuery);
$body = $response->getBody();

//Send Response to the Client...
echo $body;
?>
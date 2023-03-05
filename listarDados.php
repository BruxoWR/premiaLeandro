<?php
date_default_timezone_set('America/Sao_Paulo');

if ($_SERVER['REQUEST_METHOD'] == 'GET') {
 
      $data = file_get_contents("listagemGeral.json");

      // Decodificar o JSON recebido
      $listagemGeral = json_decode($data, true);

      echo json_encode($listagemGeral);

} else {

     echo 'Nenhum dado recebido pelo PHP';

}
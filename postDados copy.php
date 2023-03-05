<?php
date_default_timezone_set('America/Sao_Paulo');

if ($_SERVER['REQUEST_METHOD'] == 'GET') {

// Define a data e hora atual
$dataAtual = new DateTime();
// Extrai os componentes de data e hora
$dia = $dataAtual->format('d');
$mes = $dataAtual->format('m');
$ano = $dataAtual->format('Y');
$hora = $dataAtual->format('H');
$minuto = $dataAtual->format('i');
$segundo = $dataAtual->format('s');

// Fazer a requisição ao servidor localhost:3000 para obter os dados
//$data = file_get_contents("data.json");

// Fazer a requisição ao servidor localhost:3000 para obter os dados
$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, 'http://localhost:3000/fluxo');
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
$data = curl_exec($ch);
curl_close($ch);

// Decodificar o JSON recebido
$data = json_decode($data, true);

if(count($data) >= 1) {

        $pagos = array();
        $pendentes  = array();

        foreach (array_reverse($data) as $subLista) {
                $id = $subLista[0];
                $sorteio = $subLista[1];
                $nome = $subLista[2];
                $telefone = $subLista[3];
                $status = $subLista[4];
                if ($sorteio == "PARATI GLS VIUVA NEGRA") {
                  $categoria = "CARRO";
                } else if ($sorteio == "2º HONDA FAN 160 2023 0km Ou 15MIL NO PIX") {
                  $categoria = "MOTO";
                } else {
                  $categoria = "OUTROS";
                }
                $novaCompra = array(
                  'Id' => $id,
                  'Sorteio' => $sorteio,
                  'Nome' => $nome,
                  //'Telefone' => "+5561995317722",
                  'Telefone' => "+55".$telefone,  
                  'Categoria' => $categoria
                );
                if ($status == "Pago") {
                      // Enviar os dados processados para a API
                      $url = 'https://conectawebhook.com.br/api/v1/webhooks-automation/catch/25144/SxU28AE22cXB/';
                      $ch = curl_init($url);
                      curl_setopt($ch, CURLOPT_POST, true);
                      curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($novaCompra));
                      curl_setopt($ch, CURLOPT_HTTPHEADER, array('Content-Type: application/json'));
                      curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
                      $result = curl_exec($ch);
                      // Verifica se a solicitação POST foi bem sucedida
                      if ($result !== false) {                              
                                  $novaCompra['status'] = $status;
                                  $pagos[] = $novaCompra;
                                //echo 'POST realizado com sucesso!';
                      } else {
                                          //echo 'Post mal sucedido para o IDT: '.$id;
                                          //echo "<br>";
                                          //echo curl_error($ch);
                                          //echo "<br>";
                      }
                      curl_close($ch);
                      sleep(0);
                } else if ($status == "Pendente") {
                      $pendentes[] = $novaCompra;            
                }
        }

        // Define o tamanho do array e formata em uma string com 3 dígitos
        $tamanhoDoArrayPagos = count($pagos);
        $tamanhoDoArrayPendentes = count($pendentes);
        $tamanhoPagos = str_pad($tamanhoDoArrayPagos, 3, '0', STR_PAD_LEFT);
        $tamanhoPendentes = str_pad($tamanhoDoArrayPendentes, 3, '0', STR_PAD_LEFT);
        $enviadosJson = "arquivos/enviados".sprintf('%s%s%s %s%s%s%s.json', $ano, $mes, $dia, $hora, $minuto, $segundo, $tamanhoPagos);
        $pendentesJson = "arquivos/pendentes".sprintf('%s%s%s %s%s%s%s.json', $ano, $mes, $dia, $hora, $minuto, $segundo, $tamanhoPendentes);

        $contentsPagos = json_encode($pagos);
        file_put_contents($enviadosJson, $contentsPagos);

        $contentsPendentes = json_encode($pendentes);
        file_put_contents($pendentesJson, $contentsPendentes);

        echo json_encode($data);
} else if(count($data) == 0) {
      echo json_encode('Retornado array vazio');
}

}
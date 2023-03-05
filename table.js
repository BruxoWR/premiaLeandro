// Fazer uma requisição para buscar o arquivo JSON
const request = new XMLHttpRequest();
request.open('GET', 'data.json');
request.responseType = 'json';
request.send();

request.onload = function() {
  const json = request.response;
  const tableBody = document.querySelector('#data-table tbody');

  // Percorrer o array de dados do JSON e criar uma linha na tabela para cada um
  let rowNumber = 1; // Inicia o número da primeira linha em 1
  json.forEach(data => {
    const row = document.createElement('tr');
    const numberCell = document.createElement('td');    
    const idCell = document.createElement('td');
    const sorteioCell = document.createElement('td');
    const tipoCell = document.createElement('td');
    const nomeCell = document.createElement('td');
    const telefoneCell = document.createElement('td');
    const statusCell = document.createElement('td');
   
    //const categoriaCell = document.createElement('td');
    numberCell.textContent = rowNumber++;
    idCell.textContent = data[0];
    sorteioCell.textContent = data[1];
    if(sorteioCell.textContent == "PARATI GLS VIUVA NEGRA"){
      tipo = "CARRO";
    } else if(sorteioCell.textContent == "2º HONDA FAN 160 2023 0km Ou 15MIL NO PIX") {
      tipo = "MOTO";
    } else {
      tipo = "OUTROS";
    }



    tipoCell.textContent = tipo;
    nomeCell.textContent = data[2];
    telefoneCell.textContent = data[3];
    statusCell.textContent = data[4];
    //categoriaCell.textContent = data[4];

    row.appendChild(numberCell);
    row.appendChild(idCell);
    row.appendChild(sorteioCell);
    row.appendChild(tipoCell);
    row.appendChild(nomeCell);
    row.appendChild(telefoneCell);
    row.appendChild(statusCell);
    //row.appendChild(categoriaCell);

    tableBody.appendChild(row);
  });

};

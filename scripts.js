function testeFunction() {
    alert('Estou na função');
}      

function enviarDados() {
  //alert("Vou chamar o fetch");
  fetch('postDados.php')
    .then(response => response.json())
    .then(json => {
      //alert("Recebi o jason");
      //alert(json);
      const tableBody = document.querySelector('#enviados-table tbody');
      tableBody.innerHTML = ''; // Limpar a tabela antes de adicionar os novos dados
      //alert("Passei pela limpeza do tableBody");
      // Percorrer o array de dados do JSON e criar uma linha na tabela para cada um
      let rowNumber = 1; // Inicia o número da primeira linha em 1

      json.forEach(data => {
        //alert("Entrei no foreach")
        const row = document.createElement('tr');

        const numberCell = document.createElement('td');
        const idCell = document.createElement('td');
        const sorteioCell = document.createElement('td');
        const tipoCell = document.createElement('td');
        const nomeCell = document.createElement('td');
        const telefoneCell = document.createElement('td');
        const statusCell = document.createElement('td');

        numberCell.textContent = rowNumber++;
        idCell.textContent = data[0];
        sorteioCell.textContent = data[1];
        tipoCell.textContent = data[6];
        nomeCell.textContent = data[2];
        telefoneCell.textContent = data[3];
        statusCell.textContent = data[4];

        row.appendChild(numberCell);
        row.appendChild(idCell);
        row.appendChild(sorteioCell);
        row.appendChild(tipoCell);
        row.appendChild(nomeCell);
        row.appendChild(telefoneCell);
        row.appendChild(statusCell);

        tableBody.appendChild(row);

              console.log('Agora são: ' + new Date().toLocaleDateString('pt-BR') + ' ' + new Date().toLocaleTimeString('pt-BR'));

              // Incrementa uma variável de contagem de execuções
              if (typeof enviarDados.count === 'undefined') {
                enviarDados.count = 0;
              }
              enviarDados.count++;

              // Escreve uma mensagem com o número da execução na página web
              var mensagem = "fui executada a " + enviarDados.count + "ª vez";
              document.getElementById("mensagem").innerHTML = mensagem;

      });

    })
    .catch(error => console.error(error));
}

function dadosGerais() {
        fetch('listarDados.php')
          .then(response => response.json())
          .then(json => {



            const tableBody = document.querySelector('#data-table tbody');
            tableBody.innerHTML = ''; // Limpar a tabela antes de adicionar os novos dados


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

              numberCell.textContent = rowNumber++;
              idCell.textContent = data[0];
              sorteioCell.textContent = data[1];
              tipoCell.textContent = data[6];
              nomeCell.textContent = data[2];
              telefoneCell.textContent = data[3];
              statusCell.textContent = data[4];

              row.appendChild(numberCell);
              row.appendChild(idCell);
              row.appendChild(sorteioCell);
              row.appendChild(tipoCell);
              row.appendChild(nomeCell);
              row.appendChild(telefoneCell);
              row.appendChild(statusCell);

              tableBody.appendChild(row);

            });
          })
          .catch(error => console.error(error));
      }

/*
function deprecada buscarDados() {
        fetch('getDadosPostDados.php')
          .then(response => response.json())
          .then(json => {
            const tableBody = document.querySelector('#data-table tbody');
            tableBody.innerHTML = ''; // Limpar a tabela antes de adicionar os novos dados

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

              numberCell.textContent = rowNumber++;
              idCell.textContent = data.Id;
              sorteioCell.textContent = data.Sorteio;
              tipoCell.textContent = data.Categoria;
              nomeCell.textContent = data.Nome;
              telefoneCell.textContent = data.Telefone;
              statusCell.textContent = data.status;

              row.appendChild(numberCell);
              row.appendChild(idCell);
              row.appendChild(sorteioCell);
              row.appendChild(tipoCell);
              row.appendChild(nomeCell);
              row.appendChild(telefoneCell);
              row.appendChild(statusCell);

              tableBody.appendChild(row);

                    console.log('Agora são: ' + new Date().toLocaleDateString('pt-BR') + ' ' + new Date().toLocaleTimeString('pt-BR'));

                    // Incrementa uma variável de contagem de execuções
                    if (typeof buscarDados.count === 'undefined') {
                      buscarDados.count = 0;
                    }
                    buscarDados.count++;

                    // Escreve uma mensagem com o número da execução na página web
                    var mensagem = "fui executada a " + buscarDados.count + "ª vez";
                    document.getElementById("mensagem").innerHTML = mensagem;

            });
          })
          .catch(error => console.error(error));
      }
*/
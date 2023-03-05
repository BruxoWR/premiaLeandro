const puppeteer = require('puppeteer');
const fs = require('fs');

// Cria um objeto Date com a data e hora atuais
const data2 = new Date();
// Extrai os componentes de data e hora do objeto Date
const dia = String(data2.getDate()).padStart(2, '0');
const mes = String(data2.getMonth() + 1).padStart(2, '0');
const ano = data2.getFullYear();
const hora = String(data2.getHours()).padStart(2, '0');
const minuto = String(data2.getMinutes()).padStart(2, '0');
const segundo = String(data2.getSeconds()).padStart(2, '0');

let conditionMet = false;

(async () => {
  try {
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();

    console.log("\nAcionada a RASPAGEM DE DADOS:\n " + data2);

    await page.goto('https://premiaonline.com.br/dashboard');

    await page.type('#email', 'premiaonline@adgency.com.br');
    await page.type('#password', 'CgkGpD564E2097@');
    await page.click('[class="btn btn-lg btn-primary btn-block"]');

    //Verifica se está no dashboard, antes de tudo, não estando index.js novamente
    //ou clicar na clsse "icon ni ni-list-index-fill", agora que está mais sabido    
    //await page.click('[class=""icon ni ni-list-index-fill""]');

    await page.goto('https://premiaonline.com.br/dashboard/requests/list?perPage=50');

    const data = [];
    let ultimoId;
    let counter = 1;
    
    while (counter < 3 && !conditionMet) { // altere o número de iterações desejadas // altere o número de iterações desejadas
          console.log("Iniciada raspagem na página: " + counter)          
          const pageData = await scrapePage(page);

      
          data.push(...pageData);


          //console.log(conditionMet);
          if (conditionMet == true) {
              console.log('escapar do while');
              //console.log("\n")
              break;
          }  
          //Se nao devolver ninguém no array, foi porque não raspou adequadamente,
          //não obteve êxito na conexão ou não conseguiu seguir para próxima
          //bem como, pode ser porque já tinha raspado o mais recente, tem que
          //trabalhar os tipos de erros, e também, talvez seja prematuro o IF abaixo
          if (data.length > 0) {

                  const nextButton = await page.$('li.page-item > a.page-link');
                  const nextUrl = await nextButton.getProperty('href');
                  const url = await nextUrl.jsonValue();

                  await page.goto(url);
                  await page.waitForTimeout(3000); // aguarda 3 segundos
          }

          counter++;

    }
    const tamanhoDoArray = data.length;
    if (tamanhoDoArray > 0 && data[0].length > 0) {
            ultimoIdGerado = data[0][0];
            ultimoIdGerado = ultimoIdGerado.replace(/#/g, '');
            fs.writeFile('ultimoId.txt', ultimoIdGerado, (err) => {
                  if (err) throw err;
                  console.log('Registrado o ultimo ID raspado: ' + ultimoIdGerado);
            });


    } else {
            console.error('O array "data" está vazio ou não contém valores válidos.');
    }

            // Gravar os dados em um arquivo JSON
            fs.writeFile('data.json', JSON.stringify(data), (err) => {
                  if (err) throw err;
                  console.log('Dados gravados em data.json');
            });

            const tamanhoDoArrayGravado = String(tamanhoDoArray).padStart(3, '0');

            // Cria uma string com o nome do arquivo no formato "data_hora_minuto_segundo.txt"
            const nomeDoArquivo = `arquivos/jsonRedundancia${ano}${mes}${dia} ${hora}${minuto}${segundo}${tamanhoDoArrayGravado}.json`;
            
            // Grava o texto em um arquivo com o nome gerado
            fs.writeFile(nomeDoArquivo, JSON.stringify(data), (err) => {
                  if (err) throw err;
                  console.log(`Os registros foram capturados, gravados em ${nomeDoArquivo}`);
            });

    await browser.close();

  } catch (error) {
    console.error(error);
  }
})();

async function scrapePage(page) {
      const rows = await page.$$('.nk-tb-item:not(.nk-tb-head)');
      const data = [];

      for (const row of rows) {
            const values = [];
            const ids = await row.$$('.nk-tb-col.tb-col-mb > span');
            const status = await row.$$('.nk-tb-col.tb-col-mb > span.tb-status');
            const whatsApp = await row.$$('span span[data-client-phone]');
            const concursos = await row.$$('span span[data-raffle-title]');
            const nome = await row.$$('span span[data-client-name]');

            const textId = await ids[0].evaluate(node => node.innerText.trim());
            const textStatus = await status[0].evaluate(node => node.innerText.trim());
            const textWhatsapp = await whatsApp[0].evaluate(node => node.getAttribute('data-client-phone'));
            const textConcursos = await concursos[0].evaluate(node => node.getAttribute('data-raffle-title'));
            const textNome = await nome[0].evaluate(node => node.getAttribute('data-client-name'));

            // Supondo que o conteúdo do arquivo de texto seja "A1234"
            let idAtual = Number(textId.substring(1)); // Retorna 1234
            
            const fs = require('fs');

            const idTxt = fs.readFileSync('ultimoId.txt', 'utf8');
            ultimoId = Number(idTxt);
            
            //bbreak

            if (idAtual == ultimoId) {
              conditionMet = true;
              //console.log('escapeiFor', conditionMet);
              console.log(`Escapando da gravação, ultimo ID da raspagem anterior: ${ultimoId}`);
              break;
            }
            console.log(idAtual);
            values.push(textId, textConcursos, textNome, textWhatsapp, textStatus);
            data.push(values);       
      }
      return data;
}

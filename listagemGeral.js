const puppeteer = require('puppeteer');
const fs = require('fs');

let conditionMet = false;

// Cria um objeto Date com a data e hora atuais
const data2 = new Date();
// Extrai os componentes de data e hora do objeto Date
const dia = String(data2.getDate()).padStart(2, '0');
const mes = String(data2.getMonth() + 1).padStart(2, '0');
const ano = data2.getFullYear();
const hora = String(data2.getHours()).padStart(2, '0');
const minuto = String(data2.getMinutes()).padStart(2, '0');
const segundo = String(data2.getSeconds()).padStart(2, '0');


(async () => {
  try {
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();

    await page.goto('https://premiaonline.com.br/dashboard');

    await page.type('#email', 'premiaonline@adgency.com.br');
    await page.type('#password', 'CgkGpD564E2097@');
    await page.click('[class="btn btn-lg btn-primary btn-block"]');

    await page.goto('https://premiaonline.com.br/dashboard/requests/list?perPage=50');

    const data = [];
    let ultimoId;
    let counter = 0;

    while (counter < 2 && !conditionMet) { // altere o número de iterações desejadas // altere o número de iterações desejadas
   
          const pageData = await scrapePage(page);

      
          data.push(...pageData);
          //console.log(conditionMet);

          const nextButton = await page.$('li.page-item > a.page-link');
          const nextUrl = await nextButton.getProperty('href');
          const url = await nextUrl.jsonValue();

          await page.goto(url);
          await page.waitForTimeout(3000); // aguarda 3 segundos

          counter++;

    }
 
   const tamanhoDoArray = data.length;
   tamanhoDoArrayGravado = String(tamanhoDoArray).padStart(3, '0'); 
   const nomeDoArquivoJson = `listagemGeral${ano}${mes}${dia} ${hora}${minuto}${segundo}${tamanhoDoArrayGravado}.json`;
   //console.log(nomeDoArquivoJson)
    // Gravar os dados em um arquivo JSON
    fs.writeFile(nomeDoArquivoJson, JSON.stringify(data), (err) => {
          if (err) throw err;
          console.log('Dados gravados em :' + nomeDoArquivoJson);
    });


    // Cria uma string com o nome do arquivo no formato "data_hora_minuto_segundo.txt"
    const nomeDoArquivo = `listagemGeral${ano}${mes}${dia} ${hora}${minuto}${segundo}${tamanhoDoArrayGravado}.txt`;
    
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

            values.push(textId, textConcursos, textNome, textWhatsapp, textStatus);
            data.push(values);
            
      }

      return data;
}

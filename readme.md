230221 0107
Enfretamos problemas eu e o funcionário chatGpt, mas conseguidos
Criamos um servidos app.js que aciona index.js

O erro estava ocorrendo, não se sabe exatamente os detalhes mas na linha abaixo, que foi substituida:

const nextButton = await page.$('li.page-item > a.page-link');

no lugar da linha abaixo (">"):

const nextButton = await page.$('li.page-item a.page-link');

230223 1749
Tem que fazer o getPost trabalhar


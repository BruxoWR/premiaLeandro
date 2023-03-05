const express = require('express');
const { fork } = require('child_process');

const app = express();

// Rota principal
app.get('/', (req, res) => {
  res.sendFile('index.html', { root: __dirname });
});

// Rota /fluxo
app.get('/fluxo', (req, res) => {
  const child = fork('index.js');

  child.on('exit', () => {
    res.sendFile('data.json', { root: __dirname });
  });
});

app.listen(3000, () => {
  console.log('Servidor iniciado em http://localhost:3000');
});

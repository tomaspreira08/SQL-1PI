const express = require('express');
const bodyParser = require('body-parser');
const sqlite3 = require('sqlite3').verbose();

const app = express();
const PORT = process.env.PORT || 40006;

app.use(express.static(__dirname));
app.use(bodyParser.json());

// Conexão com o banco de dados SQLite
const db = new sqlite3.Database('alunos.db');

// Rota para buscar alunos por nome
app.get('/alunos', (req, res) => {
  const { nome } = req.query;

  if (!nome) {
    return res.status(400).json({ error: 'Nome do aluno não fornecido.' });
  }

  const query = SELECT * FROM Alunos WHERE Nome LIKE '%${nome}%';

  db.all(query, (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.json(rows);
    }
  });
});

// Iniciar o servidor
app.listen(PORT, () => {
  console.log(Servidor rodando em http://localhost:${PORT});
});
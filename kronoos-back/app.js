const express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer');
const cors = require('cors'); // Importa o middleware cors
const dataRoutes = require('./routes/dataRoutes');

const app = express();
const port = 3001;

// Configuração do multer para o upload de arquivos
const upload = multer({ storage: multer.memoryStorage() });

// Configura o middleware cors para permitir todas as origens
app.use(cors());

// Configura o middleware para processar JSON
app.use(bodyParser.json());

// Configura a rota de processamento de dados
app.use('/api/data', upload.single('csvData'), dataRoutes);

app.listen(port, () => {
  
});

const dataService = require('../services/dataServices.js');

exports.processCSV = async (req, res) => {
  try {
    const csvData = req.file.buffer.toString(); // Ler o arquivo CSV em memória
    const processedData = await dataService.processData(csvData);
    res.json(processedData);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao processar os dados' });
  }
};

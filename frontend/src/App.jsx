import { useState, useEffect } from 'react';
import api from './services/api';

function App() {
  const [tab, setTab] = useState('list');
  const [items, setItems] = useState([]);
  const [file, setFile] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(30);



  async function getFinances(page, limit) {
    try {
      const response = await api.get(`/finances?page=${page}&limit=${limit}`);
      setItems(response.data);
    } catch (error) {
      console.error('Erro ao buscar dados do Banco de Dados:', error);
    }
  }

  const nextPage = () => {
    setPage(page + 1);
    getFinances(page + 1, limit);
  };
  const previousPage = () => {
    if (page > 1) {
      setPage(page - 1);
      getFinances(page - 1, limit);
    }
  }


  useEffect(() => {
    getFinances(page, limit);
  }, []);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleFileUpload = () => {
    const formData = new FormData();
    formData.append('file', file);

    api.post('/upload', formData, {
      onUploadProgress: (progressEvent) => {
        const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
        setUploadProgress(percentCompleted);
      }
    });
  };


  return (
    <>
      <button onClick={() => setTab('list')}>Listar </button>
      <button onClick={() => setTab('upload')}>Upload CSV</button>

      {tab === 'list' && (
        <>
          <table>
            <thead>
              <tr>
                <th>INST</th>
                <th>Agencia</th>
                <th>Cliente</th>
                <th>Cpf|Cnpj</th>
                <th>n* Contrato</th>
                <th>Prestacoes</th>
                <th>Total</th>
                <th>Produto</th>
                <th>Carteira</th>
                <th>Carteira</th>
                <th>status</th>
              </tr>
            </thead>
            <tbody>
              {items.map(item => (
                <tr key={item.id}>
                  <td>{item.nrInst}</td>
                  <td>{item.nrAgencia}</td>
                  <td>{item.cdClient}</td>
                  <td>{item.nrCpfCnpj}</td>
                  <td>{item.nrContrato}</td>
                  <td>{item.qtPrestacoes}</td>
                  <td>{item.vlTotal}</td>
                  <td>{item.dsProduto}</td>
                  <td>{item.cdCarteira}</td>
                  <td>{item.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div>
            <button onClick={previousPage}>Anterior</button>
        
            <button onClick={nextPage}>Próximo</button>
          </div>
        </>
      )}

      {tab === 'upload' && (
        <div>
          <input type="file" onChange={handleFileChange} />
          <button onClick={handleFileUpload}>Upload</button>
          <progress value={uploadProgress} max="100" />
        </div>
      )}
    </>
  );
}

export default App;
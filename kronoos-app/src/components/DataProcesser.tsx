import React, { useState } from "react";
import axios from "axios";
import { ResultDisplay } from "./ResultDisplay";

const API_URL = 'http://localhost:3001/api/data/process'; // URL do back-end

export function DataProcessor() {
  const [data, setData] = useState<any[]>([]);
  const [processing, setProcessing] = useState(false);

  const processFile = async (file: File) => {
    setProcessing(true);

    const formData = new FormData();
    formData.append('csvData', file);

    try {
      const response = await axios.post(API_URL, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      setData(response.data);
    } catch (error) {
      console.error('Erro ao processar o arquivo:', error);
    } finally {
      setProcessing(false);
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      processFile(event.target.files[0]);
    }
  };

  return (
    <div className="w-full flex items-center flex-col">
      <div className="flex justify-center items-center mt-4">
        <label className="w-[260px] h-20 bg-green-500 text-white rounded-lg cursor-pointer flex justify-center items-center text-xl font-medium relative">
          Importar CSV
          <input
            type="file"
            accept=".csv"
            className="absolute inset-0 opacity-0 cursor-pointer"
            onChange={handleFileChange}
          />
        </label>
      </div>
      {processing && <p>Processando dados...</p>}
      <div className="w-full p-2"></div>
      <ResultDisplay data={data} loading={false} />
    </div>
  );
}

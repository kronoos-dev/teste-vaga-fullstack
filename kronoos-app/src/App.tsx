import logo from "./assets/logo-kronoos.jpeg";
import { DataProcessor } from "./components/DataProcesser";

export function App() {
  return (
    <div className="w-full">
      <div className="p-2 bg-green-800" />
      <header className="p-4 flex flex-col items-center justify-center border border-b-slate-300">
        <img src={logo} alt="logo Kronoos" />
      </header>
      <div className="flex flex-col w-full items-center p-2">
        <div className="text-3xl font-semibold text-green-700 mt-8">
          Processador de dados CSV
        </div>
        <div className="text-lg text-center font-normal text-slate-700 mt-2">
          Carregue dados de um arquivo CSV, 
          <br/>
          nosso preocessaodr fará tratamento necessário previsto
        </div>
      </div>

      <div className="flex mt-12">
        <DataProcessor />
      </div>
    </div>
  );
}

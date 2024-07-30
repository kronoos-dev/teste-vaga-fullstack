import { useState, useEffect } from "react";
import logo from "./assets/logo.svg";
import { axiosPrivate } from "./service/service";
import Button from "./components/button";
import Table from "./components/table";
import Info from "./components/info";

const INITIAL_INFO = {
  currentPage: 0,
  results: [],
  totalPages: 0,
  totalResults: 0,
};

const INITIAL_PAGE = 1;
const INITIAL_LIMIT = 10;

function App() {
  const [info, setInfo] = useState(INITIAL_INFO);
  const [page, setPage] = useState(INITIAL_PAGE);
  const [limit, setLimit] = useState(INITIAL_LIMIT);
  const [file, setFile] = useState<File | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0] || null;
    setFile(selectedFile);
  };

  const getInfo = async () => {
    if (!file) return;

    const formData = new FormData();
    formData.append("csvfile", file);

    try {
      const response = await axiosPrivate.post(
        `/convert?page=${page}&limit=${limit}`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
      setInfo(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getInfo();
  }, [page, limit]);

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  const handleLimitChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setLimit(Number(e.target.value));
    setPage(INITIAL_PAGE);
  };

  return (
    <>
      <header className="p-4 flex flex-col items-center justify-center">
        <img src={logo} alt="logo Kronoos" />
      </header>
      <section>
        <h2>Enviar arquivo .csv</h2>
        <div className="flex gap-3">
          <input type="file" accept=".csv" onChange={handleFileChange} />
          <Button
            classname="text-white font-bold border-4 border-solid rounded-3xl ease-in-out duration-500 transition-all px-3 bg-main cursor-pointer hover:bg-white hover:text-main border-main"
            click={getInfo}
          />
        </div>
      </section>
      <section className="max-w-[100%] flex overflow-x-auto scrollbar-thin scrollbar-thumb-main scrollbar-track-white">
        <Table info={info.results} />
      </section>
      {info.results.length > 0 ? (
        <section className="flex flex-col justify-between items-center">
          <div>
            <label htmlFor="limit">Items por page: </label>
            <select
              className="border-2 border-main rounded-e-3xl px-2 bg-main text-white"
              id="limit"
              value={limit}
              onChange={handleLimitChange}
            >
              <option value={10}>10</option>
              <option value={20}>20</option>
              <option value={30}>30</option>
              <option value={50}>50</option>
            </select>
          </div>
          <div className="w-full flex items-center justify-center gap-10">
            {page > 1 && (
              <button
                className=" cursor-pointer border-2 border-main rounded-l-3xl px-2 bg-main text-white w-32"
                onClick={() => handlePageChange(page - 1)}
                disabled={page <= 1}
              >
                Anterior
              </button>
            )}
            <span>{` Page ${page} of ${info.totalPages} `}</span>
            {page <= info.totalPages && (
              <button
                className=" cursor-pointer border-2 border-main rounded-e-3xl px-2 bg-main text-white w-32"
                onClick={() => handlePageChange(page + 1)}
                disabled={page >= info.totalPages}
              >
                Next
              </button>
            )}
          </div>
        </section>
      ) : (
        ""
      )}
      <Info />
    </>
  );
}

export default App;

import { useEffect, useState } from 'react'
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { api } from './services';
import { formatCnpj, formatCpf } from './utils/formatDocument';
import moment from 'moment';
import IContract from './types/contranct';
import { Button, CircularProgress, Typography } from '@mui/material';

function App() {
  const [loading, setLoading] = useState(true)
  const [data, setData] = useState<IContract[]>([])
  const [paginate, setPaginate] = useState<any>({})
  const [paginationModel, setPaginationModel] = useState({
    pageSize: 10,
    page: 0,
  });

  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'nmClient', headerName: 'Nome Cliente', width: 200 },
    {
      field: 'nrCpfCnpj',
      headerName: 'Documento',
      width: 200,
      valueGetter: (value, row) => `${row.nrCpfCnpj.length !== 11 ? formatCnpj(row.nrCpfCnpj) : formatCpf(row.nrCpfCnpj)}`
    },
    {
      field: 'dtContrato',
      headerName: 'Data do Contrato',
      width: 200,
      valueGetter: (value, row) => `${moment(row.dtContrato).format("DD/MM/YYYY")}`
    },
    {
      field: 'vlMovimento',
      headerName: 'Contrato Atrasado',
      width: 200,
      valueGetter: (value, row) => `${row.vlMovimento ? "Sim" : "Não"}`
    },
    { field: 'vlPresta', headerName: 'Valor Prestação', width: 200 },
    { field: 'vlMora', headerName: 'Valor Mora', width: 200 },
    { field: 'vlTotal', headerName: 'Valor Total', width: 200 },
  ];

  const hadleSafe = async () => {
    if (Number(paginationModel.page - 1) !== paginate.currentPage) {
      setLoading(true)
      const response = await api.get(`contract?page=${Number(paginationModel.page + 1)}`)
      setData(old => ([...old, ...response.data.data]))
      setPaginate(response.data.meta)
      setPaginationModel({ page: Number(response.data.meta.currentPage - 1), pageSize: 10 })
      setLoading(false)
    }
  }

  const handleFileCsv = async () => {
    try {
      setLoading(true)
      await api.post(`/file/csv`)
      await hadleSafe()
    }
    catch (err) {
      console.log(err)
    }
    finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    hadleSafe()
  }, [paginationModel.page])

  if (loading) return (
    <div style={{ height: '100vh', width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <CircularProgress />
    </div>
  )

  return (
    <>
      <div style={{ height: '90%', width: '100%' }}>
        {data.length === 0 ? (
          <div style={{ display: 'flex', justifyContent: 'center', width: '100%', padding: 20 }}>
            <Button variant="contained" onClick={handleFileCsv}>
              Carrregar arquivo CSV
            </Button>
          </div>
        ) : (
          <Typography variant="h3" gutterBottom textAlign="center">
            Contratos
          </Typography>
        )}

        <DataGrid
          rows={data}
          columns={columns}
          paginationModel={paginationModel}
          onPaginationModelChange={setPaginationModel}
          pageSizeOptions={[10]}
          rowCount={paginate.total}
        />
      </div>
    </>
  )
}

export default App

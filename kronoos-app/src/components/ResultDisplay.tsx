
interface ResultDisplayProps {
  data: any[];
  loading: boolean; // Propriedade para verificar se os dados estão carregando
}

export function ResultDisplay({ data, }: ResultDisplayProps) {
  return (
    <div className="overflow-x-auto">
      {data.length > 0 ? (
        <table className="min-w-full border-collapse block md:table">
          <thead className="block md:table-header-group">
            <tr className="border border-gray-300 md:border-none block md:table-row">
              <th className="bg-gray-200 p-2 text-gray-600 font-bold md:border md:border-gray-300 text-left block md:table-cell">
                CPF/CNPJ
              </th>
              <th className="bg-gray-200 p-2 text-gray-600 font-bold md:border md:border-gray-300 text-left block md:table-cell">
                Nome Cliente
              </th>
              <th className="bg-gray-200 p-2 text-gray-600 font-bold md:border md:border-gray-300 text-left block md:table-cell">
                Valor Total
              </th>
              <th className="bg-gray-200 p-2 text-gray-600 font-bold md:border md:border-gray-300 text-left block md:table-cell">
                Valor Prestação
              </th>
              <th className="bg-gray-200 p-2 text-gray-600 font-bold md:border md:border-gray-300 text-left block md:table-cell">
                CPF/CNPJ Válido
              </th>
              <th className="bg-gray-200 p-2 text-gray-600 font-bold md:border md:border-gray-300 text-left block md:table-cell">
                Valores Conferem
              </th>
              <th className="bg-gray-200 p-2 text-gray-600 font-bold md:border md:border-gray-300 text-left block md:table-cell">
                Data Contrato
              </th>
              <th className="bg-gray-200 p-2 text-gray-600 font-bold md:border md:border-gray-300 text-left block md:table-cell">
                Situação
              </th>
            </tr>
          </thead>
          <tbody className="block md:table-row-group">
            {data.map((item, index) => (
              <tr
                key={index}
                className="bg-white border border-gray-300 md:border-none block md:table-row"
              >
                <td className="p-2 md:border md:border-gray-300 text-left block md:table-cell">
                  {item.nrCpfCnpj}
                </td>
                <td className="p-2 md:border md:border-gray-300 text-left block md:table-cell">
                  {item.nmClient}
                </td>
                <td className="p-2 md:border md:border-gray-300 text-left block md:table-cell">
                  {item.vlTotal}
                </td>
                <td className="p-2 md:border md:border-gray-300 text-left block md:table-cell">
                  {item.vlPresta}
                </td>
                <td className="p-2 md:border md:border-gray-300 text-left block md:table-cell">
                  {item.isValidCpfCnpj ? "Válido" : "Inválido"}
                </td>
                <td className="p-2 md:border md:border-gray-300 text-left block md:table-cell">
                  {item.isValidValues ? "Sim" : "Não"}
                </td>
                <td className="p-2 md:border md:border-gray-300 text-left block md:table-cell">
                  {item.dtContrato}
                </td>
                <td className="p-2 md:border md:border-gray-300 text-left block md:table-cell">
                  {item.idSituac}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>Clique no botão para adicionar um arquivo.</p>
      )}
    </div>
  );
}

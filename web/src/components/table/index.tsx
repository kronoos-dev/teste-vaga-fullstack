import { useEffect } from "react";
import { verifyCNPJ, verifyCPF } from "../../utils/functions";

export default function Table({ info }: { info: any }) {
  const th = [
    "nrInst",
    "nrAgencia",
    "cdClient",
    "nmClient",
    "nrCpfCnpj",
    "nrContrato",
    "dtContrato",
    "qtPrestacoes",
    "vlTotal",
    "cdProduto",
    "dsProduto",
    "cdCarteira",
    "dsCarteira",
    "nrProposta",
    "nrPresta",
    "tpPresta",
    "nrSeqPre",
    "dtVctPre",
    "vlPresta",
    "vlMora",
    "vlMulta",
    "vlOutAcr",
    "vlIof",
    "vlDescon",
    "vlAtual",
    "idSituac",
    "idSitVen",
  ];

  useEffect(() => {}, [info]);

  return (
    <table className="w-full">
      <thead className="border-2 border-main">
        <tr className="flex">
          {th.map((header, index) => (
            <th
              key={index}
              className={`p-2 w-40 bg-main text-white ${
                index !== th.length - 1 ? "border-r-2 border-white" : ""
              }`}
            >
              {header}
            </th>
          ))}
        </tr>
      </thead>
      {info.length > 0 ? (
        <tbody className="border-2 border-main">
          {info.map((result: any, key: number) => {
            const isCPF = result.nrCpfCnpj && result.nrCpfCnpj.length <= 11;
            const isValid = isCPF
              ? verifyCPF(result.nrCpfCnpj)
              : verifyCNPJ(result.nrCpfCnpj);
            const rowClass = isValid ? "bg-green-500" : "bg-red-800 text-white";

            return (
              <tr
                className={`${
                  key !== info.length - 1
                    ? "border-dotted border-b-2 border-main"
                    : ""
                } flex h-16 w-full`}
                key={key}
              >
                {th.map((header, index) => (
                  <td
                    key={index}
                    className={`flex items-center justify-center w-40 h-full px-2 text-center ${
                      index !== th.length - 1
                        ? "border-r-2 border-dotted border-main"
                        : ""
                    } ${header === "nrCpfCnpj" && rowClass}`}
                  >
                    {result[header]}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      ) : (
        <tbody>
          <tr>
            <td colSpan={th.length} className="p-2">
              Sem dados para serem mostrados
            </td>
          </tr>
        </tbody>
      )}
    </table>
  );
}

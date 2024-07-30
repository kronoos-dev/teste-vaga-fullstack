import { Request, Response } from "express";
import {
  formatValue,
  processCsvFile,
  verifyCNPJ,
  verifyCPF,
} from "../utils/functions";

export async function convertToJson(req: Request, res: Response) {
  return processCsvFile(req, res, (data) => {
    data.vlTotal = formatValue(Number(data.vlTotal));
    data.vlPresta = formatValue(Number(data.vlPresta));
    data.vlMora = formatValue(Number(data.vlMora));
    data.vlMulta = formatValue(Number(data.vlMulta));
    data.vlOutAcr = formatValue(Number(data.vlOutAcr));
    data.vlIof = formatValue(Number(data.vlIof));
    data.vlDescon = formatValue(Number(data.vlDescon));
    data.vlAtual = formatValue(Number(data.vlAtual));
    return data;
  });
}

export async function verifyDocumet(req: Request, res: Response) {
  return processCsvFile(req, res, (data) => {
    const nrCpfCnpj = data.nrCpfCnpj;
    const validate =
      nrCpfCnpj.length <= 11 ? verifyCPF(nrCpfCnpj) : verifyCNPJ(nrCpfCnpj);
    return {
      cdClient: data.cdClient,
      document: data.nrCpfCnpj,
      validate,
    };
  });
}

export async function verifyInstallments(req: Request, res: Response) {
  return processCsvFile(req, res, (data) => {
    const totalValue = Number(data.vlTotal);
    const qtyInstalments = Number(data.qtPrestacoes);
    const valueInstalment = Number(data.vlPresta);

    const validate =
      (totalValue / qtyInstalments).toFixed(2) === String(valueInstalment);

    return {
      cdClient: data.cdClient,
      validate,
    };
  });
}

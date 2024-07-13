import { TCSVProcessingParams } from "./types";

export const csvReportHeaders = ["lineNumber", "header", "errorCode", "errorMessage"];

export const csvOutputHeaders = [
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

export const defaultProcessingParams: TCSVProcessingParams = {
    debug: false,
    statistics: true,
};

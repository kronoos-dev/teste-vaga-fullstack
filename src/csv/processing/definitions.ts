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

export type TCSVLineFieldValidationError = {
    header: string;
    code: string;
    message: string;
};

export type TCSVLineData = {
    [header: string]: string | number;
};

export type TCSVLine = {
    lineNumber: number;
    errors?: (TCSVLineFieldValidationError | never)[];
    data?: TCSVLineData;
};

export type TCSVFilePaths = {
    input: string;
    output: string;
    report: string;
};

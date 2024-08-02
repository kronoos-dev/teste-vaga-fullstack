export interface Data {
    nrCpfCnpj: string;
    vlTotal: string;
    qtPrestacoes: string;
    vlPresta: string;
    vlMora: string;
}

export interface ProcessedData {
    nrCpfCnpj: string;
    isCpfCnpjValid: boolean;
    vlTotal: string;
    qtPrestacoes: string;
    vlPresta: string;
    vlMora: string;
    isValueValid: boolean;
}
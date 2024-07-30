type DocumentConstructorProps = {
    vlIof: string;
    nrCpfCnpj: string;
    vlTotal: string;
    vlPresta: string;
    vlMora: string;
    vlMulta: string;
    vlOutAcr: string;
    vlDescon: string;
    vlAtual: string;
    qtPrestacoes: string;
}

export class Document {
    private readonly _nrCpfCnpj: string;
    private _vlTotal: string;
    private _vlPresta: string;
    private _vlMora: string;
    private _vlMulta: string;
    private _vlOutAcr: string;
    private _vlIof: string;
    private _vlDescon: string;
    private _vlAtual: string;
    private _qtPrestacoes: string;
    private _documentIsValid: boolean;

    constructor(props: DocumentConstructorProps) {
        this._nrCpfCnpj = props.nrCpfCnpj;
        this._vlTotal = props.vlTotal;
        this._vlPresta = props.vlPresta;
        this._vlMora = props.vlMora;
        this._vlMulta = props.vlMulta;
        this._vlOutAcr = props.vlOutAcr;
        this._vlIof = props.vlIof;
        this._vlDescon = props.vlDescon;
        this._vlAtual = props.vlAtual;
        this._qtPrestacoes = props.qtPrestacoes;
        this._documentIsValid = true;
    }

    public get nrCpfCnpj(){ return this._nrCpfCnpj;}
    public get vlTotal(){ return this._vlTotal;}
    public get vlPresta(){ return this._vlPresta;}
    public get vlMora(){ return this._vlMora;}
    public get vlMulta(){ return this._vlMulta;}
    public get vlOutAcr(){ return this._vlOutAcr;}
    public get vlIof(){ return this._vlIof;}
    public get vlDescon(){ return this._vlDescon;}
    public get vlAtual(){ return this._vlAtual;}
    public get qtPrestacoes(){ return this._qtPrestacoes;}
    public get documentIsValid(){ return !!this._documentIsValid;}

    public set vlTotal(value: string) { this._vlTotal = value; }
    public set vlPresta(value: string) { this._vlPresta = value; }
    public set vlMora(value: string) { this._vlMora = value; }
    public set vlMulta(value: string) { this._vlMulta = value; }
    public set vlOutAcr(value: string) { this._vlOutAcr = value; }
    public set vlIof(value: string) { this._vlIof = value; }
    public set vlDescon(value: string) { this._vlDescon = value; }
    public set vlAtual(value: string) { this._vlAtual = value; }
    public set qtPrestacoes(value: string) { this._qtPrestacoes = value; }
    public set documentIsValid(value: boolean) { this.documentIsValid = value; }
}

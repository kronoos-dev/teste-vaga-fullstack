import mongoose from "mongoose";

const financeSchema = new mongoose.Schema({
  nrInst: { type: Number, required: true },
  nrAgencia: { type: Number, required: true },
  cdClient: { type: String, required: true },
  nmClient: { type: String, required: true },
  nrCpfCnpj: { type: String, required: true },
  nrContrato: { type: String, required: true },
  dtContrato: { type: Date, required: true },
  qtPrestacoes: { type: Number, required: true },
  vlTotal: { type: Number, required: true },
  cdProduto: { type: String, required: true },
  dsProduto: { type: String, required: true },
  cdCarteira: { type: String, required: true },
  dsCarteira: { type: String, required: true },
  nrProposta: { type: Number, required: true },
  nrPresta: { type: Number, required: true },
  tpPresta: { type: String, required: true },
  nrSeqPre: { type: Number, required: true },
  dtVctPre: { type: Date, required: true },
  vlPresta: { type: Number, required: true },
  vlMora: { type: Number, required: true },
  vlMulta: { type: Number, required: true },
  vlOutAcr: { type: Number, required: true },
  vlIof: { type: Number, required: true },
  vlDescon: { type: Number, required: true },
  vlAtual: { type: Number, required: true },
  idSituac: { type: String, required: true },
  idSitVen: { type: String, required: true },
  status: { type: String, required: false },
});

const FinanceModel = mongoose.model("Finance", financeSchema);

export default FinanceModel;

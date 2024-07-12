import { z } from "zod";

import { transformCpfCnpj, transformDateString } from "./validators";

export const csvLineSchema = z.object({
    nrInst: z.coerce.number().int("Deve ser um número inteiro").positive("Deve ser positivo"),
    nrAgencia: z.coerce.number().int("Deve ser um número inteiro").positive("Deve ser positivo"),
    cdClient: z.coerce.number().int("Deve ser um número inteiro").positive("Deve ser positivo"),
    nmClient: z.coerce.string({ message: "Deve ser campo de texto" }),
    nrCpfCnpj: z.coerce.string().transform(transformCpfCnpj),
    nrContrato: z.coerce.number().int("Deve ser um número inteiro").positive("Deve ser positivo"),
    dtContrato: z.coerce.string().transform(transformDateString),
    qtPrestacoes: z.coerce.number().int("Deve ser um número inteiro").gte(0, "Deve ser não-negativo"),
    vlTotal: z.coerce.number({ message: "Deve ser um valor numérico" }).gte(0, "Deve ser não-negativo"),
    cdProduto: z.coerce.number().int("Deve ser um número inteiro").positive("Deve ser positivo"),
    dsProduto: z.coerce.string({ message: "Deve ser campo de texto" }),
    cdCarteira: z.coerce.number().int("Deve ser um número inteiro").positive("Deve ser positivo"),
    dsCarteira: z.coerce.string({ message: "Deve ser campo de texto" }),
    nrProposta: z.coerce.number().int("Deve ser um número inteiro").positive("Deve ser positivo"),
    nrPresta: z.coerce.number().int("Deve ser um número inteiro").positive("Deve ser positivo"),
    tpPresta: z.coerce.string({ message: "Deve ser campo de texto" }),
    nrSeqPre: z.coerce.number().int("Deve ser um valor numérico").gte(0, "Deve ser não-negativo"),
    dtVctPre: z.coerce.string().transform(transformDateString),
    vlPresta: z.coerce.number({ message: "Deve ser um valor numérico" }).gte(0, "Deve ser não-negativo"),
    vlMora: z.coerce.number({ message: "Deve ser um valor numérico" }).gte(0, "Deve ser não-negativo"),
    vlMulta: z.coerce.number({ message: "Deve ser um valor numérico" }).gte(0, "Deve ser não-negativo"),
    vlOutAcr: z.coerce.number({ message: "Deve ser um valor numérico" }).gte(0, "Deve ser não-negativo"),
    vlIof: z.coerce.number({ message: "Deve ser um valor numérico" }).gte(0, "Deve ser não-negativo"),
    vlDescon: z.coerce.number({ message: "Deve ser um valor numérico" }).gte(0, "Deve ser não-negativo"),
    vlAtual: z.coerce.number({ message: "Deve ser um valor numérico" }).gte(0, "Deve ser não-negativo"),
    idSituac: z.coerce.string({ message: "Deve ser campo de texto" }),
    idSitVen: z.coerce.string({ message: "Deve ser campo de texto" }),
});

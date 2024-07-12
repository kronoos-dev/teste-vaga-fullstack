import { z } from "zod";

import { CPF, CNPJ } from "@sdk/validation";
import { parseDateString } from "@sdk/parsing";

export function transformCpfCnpj(value: string, ctx: z.RefinementCtx): string | undefined {
    const isCpf = CPF.isValid(value);
    const isCnpj = CNPJ.isValid(value);

    if (!(isCnpj || isCpf))
        ctx.addIssue({
            code: "custom",
            message: "CNPJ ou CPF inválido",
        });

    if (isCnpj) return CNPJ.applyMask(value);
    if (isCpf) return CPF.applyMask(value);
}

export function transformDateString(dateString: string, ctx: z.RefinementCtx): string {
    const parsed = parseDateString(dateString);

    if (parsed.toDateString() === "Invalid Date") {
        ctx.addIssue({
            code: z.ZodIssueCode.invalid_date,
            message: "Data em formato inválido",
        });
    }

    return dateString;
}

import { z } from "zod";

import { CPF, CNPJ } from "@sdk/validation";
import { parseDateString } from "@sdk/parsing";
import { Rounding } from "@src/sdk/numeric";

export function transformCpfCnpj(value: string, ctx: z.RefinementCtx): string | undefined {
    const isCpf = CPF.isValid(value);
    const isCnpj = CNPJ.isValid(value);

    if (!(isCnpj || isCpf))
        ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "CNPJ ou CPF inválido",
        });

    return value;
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

export function transformCurrencyValue(value: number): string {
    const formatter = new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
    });

    return `"${formatter.format(value)}"`;
}

export function validateInstallmentValue(
    qtyInstallments: number,
    installmentValue: number,
    totalValue: number,
): boolean {
    const calculatedInstallment = totalValue / qtyInstallments;
    const truncatedCalcInstallment = Rounding.truncate(calculatedInstallment, 0);
    const truncatedInstallment = Rounding.truncate(installmentValue, 0);

    return truncatedInstallment === truncatedCalcInstallment;
}

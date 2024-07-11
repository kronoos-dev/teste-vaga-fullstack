import { Numeric } from "@sdk/numeric";

export type TYearValidatorInput = {
    year: number | string;
    size?: number;
    lowerLimit?: number;
    upperLimit?: number;
};

export function validateYear({
    year,
    size = 4,
    lowerLimit = 1900,
    upperLimit = new Date().getFullYear(),
}: TYearValidatorInput): boolean {
    const value = (typeof year === "number" ? String(year) : year).trim().replace(/\s+/g, "");
    const isNonNegative = value.length === size && Numeric.isNonNegativeInteger(value);
    const isWithinRange = lowerLimit <= parseInt(value) && parseInt(value) <= upperLimit;

    return isNonNegative && isWithinRange;
}

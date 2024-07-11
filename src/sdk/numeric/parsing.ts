import { TNumericSeparator, EOperator, OPERATOR_MAP, TRoundingMethod, ERoundingMethod } from "./definitions";
import Rounding from "./rounding";

class Numeric {
    public static SIGNED_NUMBER_REGEX = /^(?<sign>[-,+])?(?<number>\d*)/gi;

    public static parseFloatFromString(
        value: string,
        coerce: boolean = false,
        decimalDigits: number = 2,
        toNumber: boolean = true,
        roundingMethod: TRoundingMethod = ERoundingMethod.TRUNCATE,
    ): string | number {
        const fixDecimals = (num: number, precision: number): string => {
            return String(Rounding.applyRoundingMethod(num, precision, roundingMethod));
        };

        const castResult = (input: string | number): string | number => (toNumber ? Number(input) : input);

        value = String(value).trim();

        if (value === "") {
            return value;
        }

        // Check if the string can be converted to float as it is
        const parsed = parseFloat(value);

        if (String(parsed) === value) {
            return castResult(fixDecimals(parsed, decimalDigits));
        }

        // Replace Arabic numbers by Latin
        value = value
            .replace(/[\u0660-\u0669]/g, (matched: string): string => {
                return String(matched.charCodeAt(0) - 1632); // Arabic
            })
            .replace(/[\u06F0-\u06F9]/g, (matched: string): string => {
                return String(matched.charCodeAt(0) - 1776); // Persian
            });

        // Remove all non-digit characters
        const split = value.split(/[^\dE-]+/);

        if (1 === split.length) {
            // There's no decimal part
            return castResult(fixDecimals(parseFloat(value), decimalDigits));
        }

        for (let i = 0; i < split.length; i++) {
            if ("" === split[i]) {
                return coerce ? castResult(fixDecimals(parseFloat("0"), decimalDigits)) : NaN;
            }
        }

        // Use the last part as decimal
        const decimal = split.pop();

        // Reconstruct the number using dot as decimal separator
        const reconstructed = fixDecimals(parseFloat(split.join("") + "." + decimal), decimalDigits);

        return castResult(reconstructed);
    }

    public static checkLengthDecimalPart(value: string | number, minLength: number, maxLength: number): boolean {
        const parsed = typeof value === "string" ? String(Numeric.parseFloatFromString(value)) : String(value);
        const [integerPart, decimalPart] = parsed.split(".");
        const zeroCondition = parsed === "0" || parsed === "0.0";
        const noDecimalPartCondition = decimalPart === undefined && Numeric.isInteger(integerPart);

        if (zeroCondition || noDecimalPartCondition) return true;

        return (
            Numeric.isNonNegative(minLength) &&
            Numeric.isNonNegative(maxLength) &&
            Numeric.isInteger(integerPart) &&
            (OPERATOR_MAP.CLOSED_RANGE(decimalPart.length, minLength, maxLength) as boolean)
        );
    }

    public static isNumeric(value: unknown): boolean {
        return !isNaN(parseFloat(String(value))) && isFinite(Number(value));
    }

    public static isInteger(value: string): boolean {
        const number = Number(value);

        return Number.isInteger(number);
    }

    public static isPositive(value: string): boolean {
        const gt = OPERATOR_MAP[EOperator.GT] as (x: number, y: number) => boolean;

        return Numeric.isNumeric(value) && gt(Number(value), 0);
    }

    public static isNegative(value: string): boolean {
        const lt = OPERATOR_MAP[EOperator.LT] as (x: number, y: number) => boolean;

        return Numeric.isNumeric(value) && lt(Number(value), 0);
    }

    public static isNonPositive(value: string): boolean {
        const lte = OPERATOR_MAP[EOperator.LTE] as (x: number, y: number) => boolean;

        return Numeric.isNumeric(value) && lte(Number(value), 0);
    }

    public static isNonNegative(value: string | number): boolean {
        const numeric = Number(value);
        const gte = OPERATOR_MAP[EOperator.GTE] as (x: number, y: number) => boolean;

        return Numeric.isNumeric(value) && gte(numeric, 0);
    }

    public static isPositiveInteger(value: string): boolean {
        return Numeric.isInteger(value) && Numeric.isPositive(value);
    }

    public static isNonNegativeInteger(value: string): boolean {
        return Numeric.isInteger(value) && Numeric.isNonNegative(value);
    }

    public static isNegativeInteger(value: string): boolean {
        return Numeric.isInteger(value) && Numeric.isNegative(value);
    }

    public static isNonPositiventeger(value: string): boolean {
        return Numeric.isInteger(value) && Numeric.isNonPositive(value);
    }
}

export default Numeric;
export { EOperator, TNumericSeparator, OPERATOR_MAP };

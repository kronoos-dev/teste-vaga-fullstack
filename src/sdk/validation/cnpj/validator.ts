import { CNPJDigitIndex, CNPJLength, CNPJ_MASK, FORBIDDEN_CNPJS } from "./definitions";

export default class CNPJ {
    static chunkVerificationArray(array: Array<number>, chunkSize = 8): Array<Array<number>> {
        const chunks = [];

        while (array.length) {
            chunks.push(array.splice(0, chunkSize));
        }

        return chunks;
    }

    static extractNumericSequence(cpfWithMask: string): string {
        const numberPattern = /[0-9]+/g;
        const rawCnpj = cpfWithMask.match(numberPattern)?.join("");

        // If the resulting numeric string does not have
        // the same length as a raw CNPJ (without mask),
        // it's of no use to us
        return rawCnpj?.length === CNPJLength.RAW ? rawCnpj : "";
    }

    static applyMask(cnpjWithoutMask: string | number): string {
        const cnpj = typeof cnpjWithoutMask === "number" ? cnpjWithoutMask.toString() : cnpjWithoutMask;

        // If already has a mask, do nothing
        if (CNPJ_MASK.test(cnpj) && CNPJ.isValid(cnpj)) {
            return cnpj;
        }

        // e.g. 59.541.264/0001-03
        return CNPJ.isValid(cnpj)
            ? cnpj.slice(0, CNPJLength.MINOR_BLOCK) +
                  "." +
                  cnpj.slice(CNPJLength.MINOR_BLOCK, CNPJLength.MINOR_BLOCK + 3) +
                  "." +
                  cnpj.slice(CNPJLength.MINOR_BLOCK + 3, CNPJLength.MINOR_BLOCK + 6) +
                  "/" +
                  cnpj.slice(CNPJLength.MINOR_BLOCK + 6, CNPJDigitIndex.FIRST) +
                  "-" +
                  cnpj.slice(CNPJDigitIndex.FIRST, CNPJDigitIndex.FIRST + 2)
            : "";
    }

    static parseCnpjToArray(cnpj: string): Array<number> {
        const cnpjWithoutMask = CNPJ.extractNumericSequence(cnpj);
        const cnpjArray = [...cnpjWithoutMask].map((digit: string): number => parseInt(digit.trim(), 10));
        return cnpjArray;
    }

    static isForbidden(cnpj: string): boolean {
        return FORBIDDEN_CNPJS.some((i) => i === CNPJ.extractNumericSequence(cnpj));
    }

    static hasRightSize(cnpj: string): boolean {
        return cnpj.length === CNPJLength.RAW || cnpj.length === CNPJLength.WITH_MASK;
    }

    static isDigitValid(cnpjArray: Array<number>, digitIndex: CNPJDigitIndex): boolean {
        // Algorithm adapted to TypeScript
        // Documentation and examples: https://www.geradorcnpj.com/algoritmo_do_cnpj.htm

        const verificationDigit: number = cnpjArray[digitIndex];
        const verificationArray: Array<number> = cnpjArray.slice(0, digitIndex).reverse();

        // Slice the verificationArray into chunks of size 8,
        // in order to apply the weight pattern (from 2 to 9)
        const verificationChunks: Array<Array<number>> = CNPJ.chunkVerificationArray(verificationArray);

        // Weighted sum of all chunks
        let weightedSum = 0;
        verificationChunks.forEach((chunk: Array<number>): void => {
            // Evaluate the weightedSum for each chunk
            weightedSum += chunk.reduce((acc, current, index) => {
                return acc + current * (index + 2);
            }, 0);
        });

        const remainder: number = weightedSum % 11;
        const difference: number = remainder >= 2 ? 11 - remainder : 0;

        return difference === verificationDigit;
    }

    static isValid(target: string | number): boolean {
        const cnpj = typeof target === "number" ? target.toString() : target;

        if (CNPJ.hasRightSize(cnpj)) {
            const cnpjArray: Array<number> = CNPJ.parseCnpjToArray(cnpj);
            return (
                !CNPJ.isForbidden(cnpj) &&
                CNPJ.isDigitValid(cnpjArray, CNPJDigitIndex.FIRST) &&
                CNPJ.isDigitValid(cnpjArray, CNPJDigitIndex.SECOND)
            );
        }
        return false;
    }
}
